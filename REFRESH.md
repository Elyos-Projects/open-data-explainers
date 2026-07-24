# REFRESH — Staleness, data-currency, and refresh strategy

> Version: 1.0.0 · Status: Published · Last updated: 2026-07-24 · License: CC-BY-4.0

## Overview

Open datasets are updated periodically. Without explicit staleness tracking and refresh processes, published explainers silently show outdated figures, eroding reader trust and potentially misleading decisions. This document defines:

1. **Data Vintage Recording** — how each explainer captures the source retrieval date, version, and refresh cadence.
2. **Data-Currency Badge** — how the vintage is surfaced to readers (design, placement, and implementation).
3. **Drift Detection** — how to automatically detect when underlying sources have changed and open a maintenance refresh task.
4. **Reproducibility Verification** — how to ensure published figures can be regenerated from committed code and a pinned source snapshot.

**Core principle:** Every published figure is timestamped and reproducible. When a source is updated, the explainer author, maintainer, or an automated detector flags it; a structured `maintenance` task is opened; and the figure is refreshed or marked as needing review.

---

## 1. Data Vintage Recording

### 1.1 What is a data vintage?

A **data vintage** is a precise record of *when* and *what* source data an explainer used. It includes:

- **Source retrieval date** (ISO 8601 timestamp, e.g., `2026-07-24T14:30:00Z`) — when the data was downloaded or queried.
- **Dataset version/release** (e.g., `SDSS DR17`, `GTFS feed version 2.1.2`, `College Scorecard 2025-06-15`, `BLS CPI April 2026`) — the exact release, edition, or snapshot identifier.
- **Source snapshot record** (committed, with SHA-256 hash and Wayback save URL) — reproducibility proof.

### 1.2 Refresh cadence

A **refresh cadence** is the intended frequency for checking and potentially updating an explainer:

- **Annual** (e.g., BLS CPI, USDA NASS Quick Stats, College Scorecard annual release).
- **Quarterly** (e.g., College Scorecard rolling updates).
- **Monthly** (e.g., BLS CPI monthly series updates).
- **On-demand** (e.g., GTFS feeds vary by agency; some update frequently, others rarely; set per feed).
- **As-needed** (e.g., STATS19 annual extracts; refresh only when DfT releases a new year).

The cadence is a *target*, not a guarantee: if a source hasn't been updated, no refresh is needed; if a source updates outside the cadence, a refresh is flagged.

### 1.3 Recording vintage: the `explainer-metadata.json` structure

Each explainer commits a `explainer-metadata.json` file in its deliverable (or within the main explainer artifact) that records:

```json
{
  "id": "county-ag-profiles-2026-ne",
  "title": "Nebraska County Agriculture Profiles 2025",
  "dataVintage": {
    "retrievalDate": "2026-06-15T10:30:00Z",
    "datasetVersion": "USDA NASS Quick Stats, 2025 Survey Year",
    "sourceUrl": "https://quickstats.nass.usda.gov/",
    "sourcePublisher": "United States Department of Agriculture, National Agricultural Statistics Service",
    "sourceSnapshot": {
      "sha256": "abc123def456...",
      "waybackUrl": "https://web.archive.org/web/20260615103000*/quickstats.nass.usda.gov/",
      "committedPath": "data/sources/usda-nass-2025-snapshot.json"
    },
    "license": "public-domain",
    "licenseUrl": "https://www.usda.gov/copyright-and-citations",
    "attribution": "U.S. Department of Agriculture, National Agricultural Statistics Service (NASS)"
  },
  "refreshCadence": "annual",
  "nextCheckDate": "2027-06-15",
  "lastRefreshedDate": "2026-06-15"
}
```

**Required fields:**
- `retrievalDate` — ISO 8601 timestamp.
- `datasetVersion` — human-readable version/release identifier.
- `sourceUrl` — the original data source URL.
- `sourcePublisher` — organization that publishes the data.
- `sourceSnapshot` — SHA-256 hash, Wayback Archive save URL, and committed path.
- `license` — SPDX identifier or license name.
- `attribution` — attribution string (as required by the license).
- `refreshCadence` — one of: `annual`, `quarterly`, `monthly`, `on-demand`, `as-needed`.
- `nextCheckDate` — ISO 8601 date when the next refresh check is due.
- `lastRefreshedDate` — ISO 8601 date of the most recent actual refresh or content update.

**Storage location:** Committed to the repo alongside the explainer deliverable (in the explainer's directory or in a structured metadata folder). For example:
```
explainers/
  county-ag-ne-2026/
    index.html              (or README.md for the explainer)
    methodology.json        (Methodology Card)
    explainer-metadata.json (data vintage + refresh cadence)
    data/
      snapshot.json         (pinned source snapshot)
    src/
      derive.ts             (reproducible derivation code)
```

---

## 2. Data-Currency Badge

### 2.1 Purpose

The **data-currency badge** is a prominent, persistent indicator on every delivered explainer artifact that shows:
- The **data retrieval/vintage date** (e.g., "Data as of June 2026").
- Whether the data is **current** (within the cadence) or **stale** (refresh due).
- A link to the **Methodology Card** and **Sources & limits** for full provenance.

### 2.2 Design principles

- **Prominent but not intrusive:** Placed near the top or at the end of the artifact, visible without scrolling (for web artifacts) or in the visual hierarchy.
- **Honest about currency:** The date is always shown; "stale" status is never hidden.
- **Accessible:** Sufficient color contrast; not color-alone for status (uses icon + text); works in light and dark themes.
- **Consistent:** Every explainer displays the badge in the same style and location.
- **Actionable:** Includes a link to report an error or request a refresh.

### 2.3 Badge design spec

**Visual template:**

```
┌─────────────────────────────────────┐
│ 📅 Data as of June 15, 2026         │
│                                     │
│ 🔄 Refresh cadence: Annual          │
│ ✓ Current (next check: June 2027)   │
│                                     │
│ [View Sources & Limits] [Methodology]
└─────────────────────────────────────┘
```

**HTML/React implementation:**

```tsx
interface DataCurrencyBadgeProps {
  retrievalDate: string;           // ISO 8601, e.g., "2026-06-15"
  refreshCadence: string;          // "annual", "quarterly", etc.
  nextCheckDate: string;           // ISO 8601
  isStale?: boolean;               // true if now > nextCheckDate
  methodologyUrl: string;          // link to Methodology Card
  sourcesLimitsUrl: string;        // link to Sources & Limits
}

function DataCurrencyBadge({
  retrievalDate,
  refreshCadence,
  nextCheckDate,
  isStale = false,
  methodologyUrl,
  sourcesLimitsUrl,
}: DataCurrencyBadgeProps) {
  const displayDate = new Date(retrievalDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const nextCheck = new Date(nextCheckDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const statusIcon = isStale ? "⚠️" : "✓";
  const statusText = isStale
    ? `Stale (refresh needed; last checked ${nextCheckDate})`
    : `Current (next check: ${nextCheck})`;

  return (
    <aside
      className="data-currency-badge"
      role="complementary"
      aria-label="Data currency information"
    >
      <h3>📅 Data Vintage</h3>
      <p>Data as of <strong>{displayDate}</strong></p>
      <p>Refresh cadence: <strong>{refreshCadence}</strong></p>
      <p>{statusIcon} {statusText}</p>
      <ul>
        <li>
          <a href={methodologyUrl}>View Methodology Card</a>
        </li>
        <li>
          <a href={sourcesLimitsUrl}>Sources & Limits</a>
        </li>
      </ul>
    </aside>
  );
}
```

**CSS baseline (light & dark mode):**

```css
.data-currency-badge {
  border: 1px solid var(--color-border-subtle);
  background: var(--color-bg-subtle);
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  margin: 1.5rem 0;
}

.data-currency-badge h3 {
  margin-top: 0;
  font-size: 1rem;
}

.data-currency-badge p {
  margin: 0.5rem 0;
}

.data-currency-badge ul {
  list-style: none;
  padding: 0;
  margin-top: 0.75rem;
}

.data-currency-badge a {
  color: var(--color-link);
  text-decoration: underline;
}

@media (prefers-color-scheme: dark) {
  .data-currency-badge {
    background: var(--color-bg-dark-subtle);
    border-color: var(--color-border-dark-subtle);
  }
}
```

**Placement recommendations:**
- **Primary location:** Near the top of the main explainer, after the title and before the main content (or in a sidebar if layout allows).
- **Secondary location:** Footer or "About this explainer" section, if space is constrained.
- **Tool artifacts:** Prominently displayed in the tool UI (e.g., a small widget in the top-right or a collapsible panel).

---

## 3. Drift Detection

### 3.1 What is drift?

**Drift** is a change in an upstream data source that makes the current snapshot outdated. Examples:
- A new GTFS feed version is released by a transit agency.
- USDA NASS publishes a new Quick Stats survey year.
- BLS releases updated CPI data for the current or previous month.
- A new SDSS or Gaia Data Release is announced.
- OpenStreetMap planet file has changed (new extract date available).

**Drift detection** is the automated (or semi-automated) process of checking whether a source has been updated since the explainer's data vintage.

### 3.2 Drift detection approaches

#### A. Manual check (human-initiated)

The simplest approach: a human checks the source periodically and reports drift. Not reliable for large numbers of explainers, but can be part of a process.

**Responsibility:** Maintainer or steward, on a schedule aligned with refresh cadence.

**Trigger:** A calendar reminder or a periodic task runner (e.g., monthly check of GTFS feeds).

---

#### B. API polling (automated, where APIs exist)

Many data sources expose APIs or headers that reveal the current version or release date. Polling these can detect drift without downloading the full dataset.

**Examples:**

- **BLS CPI API:** Query the `/timeseries/{series_id}` endpoint to get the latest data date. Compare to the recorded vintage.
  ```bash
  curl -s "https://api.bls.gov/publicAPI/v2/timeseries/CUUR0000SA0/data" \
    -H "Content-Type: application/json" \
    -d '{"registrationKey": "YOUR_KEY", "startyear": 2026, "endyear": 2026}' \
  | jq '.Results.series[0].data[0].period'
  ```
  
- **USDA NASS Quick Stats:** Query the metadata endpoint to retrieve the latest survey year.
  ```bash
  curl -s "https://quickstats.nass.usda.gov/api/get_param_values?key=YOUR_KEY&param=year"
  ```

- **GTFS feeds:** Check the `feed.txt` file in the GTFS archive for `feed_version` and `feed_publisher_url`. Some agencies publish version metadata in HTTP headers or a README.

- **College Scorecard:** The dataset is updated annually; check the published release schedule or query the API for the latest available data date.

- **OSM planet files:** Check the planet dump directory listing at https://planet.openstreetmap.org/ to see the latest available date.

**Drift detection logic:**

```pseudocode
function detectDrift(sourceId, recordedVintage, refreshCadence) {
  currentVersion = querySourceAPI(sourceId)
  recordedVersion = recordedVintage.datasetVersion
  
  if currentVersion != recordedVersion {
    return {
      hasDrift: true,
      currentVersion,
      recordedVersion,
      reason: "version mismatch"
    }
  }
  
  currentDate = querySourceLatestDate(sourceId)
  recordedDate = parseISO8601(recordedVintage.retrievalDate)
  daysSinceRefresh = (now - recordedDate).days
  
  expectedRefreshInterval = getCadenceInDays(refreshCadence)
  
  if daysSinceRefresh > expectedRefreshInterval {
    // Source may have updated; a refresh check is due
    return {
      hasDrift: mayBe,
      reason: "refresh cadence exceeded; manual check advised"
    }
  }
  
  return { hasDrift: false }
}
```

---

#### C. File hash checking (for snapshot-based sources)

For sources that publish snapshots with checksums (e.g., STATS19 annual extracts with SHA-256):

1. Periodically download or query the source's current release.
2. Compute its checksum.
3. Compare to the recorded `sourceSnapshot.sha256`.

**Example:**
```bash
CURRENT_SHA=$(curl -s "https://data.dft.gov.uk/road-accidents-safety-data/stats19.zip" \
  | sha256sum | awk '{print $1}')
RECORDED_SHA=$(jq -r '.dataVintage.sourceSnapshot.sha256' explainer-metadata.json)

if [ "$CURRENT_SHA" != "$RECORDED_SHA" ]; then
  echo "Drift detected: SHA mismatch"
  # Open a refresh task
fi
```

---

#### D. Scheduled CI/CD job (drift detection at scale)

For projects with many explainers, automate drift detection in CI:

```yaml
name: Drift Detection
on:
  schedule:
    - cron: "0 9 1 * *"  # First day of each month at 9 AM UTC

jobs:
  detect-drift:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: pnpm install
      - name: Run drift detection
        run: |
          pnpm run detect-drift --output drift-report.json
      - name: Create issues for drift
        if: steps.detect-drift.outcome == 'failure'
        run: |
          pnpm run create-refresh-tasks drift-report.json
      - name: Upload report
        uses: actions/upload-artifact@v3
        with:
          name: drift-report
          path: drift-report.json
```

**Drift detection script (TypeScript example):**

```typescript
import fs from "fs";
import { querySourceAPI } from "./source-adapters";

interface DriftReport {
  explainerId: string;
  hasDrift: boolean;
  reason?: string;
  currentVersion?: string;
  recordedVersion?: string;
  checkDate: string;
}

async function detectDriftForExplainer(
  explainerMetadata: ExplainerMetadata
): Promise<DriftReport> {
  const { id, dataVintage, refreshCadence } = explainerMetadata;
  const sourceId = new URL(dataVintage.sourceUrl).hostname;

  try {
    const currentData = await querySourceAPI(sourceId);
    const recordedVersion = dataVintage.datasetVersion;
    const currentVersion = currentData.version;

    if (currentVersion !== recordedVersion) {
      return {
        explainerId: id,
        hasDrift: true,
        reason: "version mismatch",
        currentVersion,
        recordedVersion,
        checkDate: new Date().toISOString(),
      };
    }

    const daysSinceRefresh = daysBetween(
      new Date(dataVintage.retrievalDate),
      new Date()
    );
    const cadenceInDays = getCadenceInDays(refreshCadence);

    if (daysSinceRefresh > cadenceInDays) {
      return {
        explainerId: id,
        hasDrift: true,
        reason: "refresh cadence exceeded",
        checkDate: new Date().toISOString(),
      };
    }

    return {
      explainerId: id,
      hasDrift: false,
      checkDate: new Date().toISOString(),
    };
  } catch (error) {
    return {
      explainerId: id,
      hasDrift: true,
      reason: `drift check failed: ${error.message}`,
      checkDate: new Date().toISOString(),
    };
  }
}

async function main() {
  const explainers = loadAllExplainers();
  const reports = await Promise.all(
    explainers.map(detectDriftForExplainer)
  );

  const hasDrift = reports.filter((r) => r.hasDrift);
  fs.writeFileSync("drift-report.json", JSON.stringify(reports, null, 2));

  if (hasDrift.length > 0) {
    console.log(
      `Drift detected in ${hasDrift.length} explainer(s):`
    );
    hasDrift.forEach((r) => {
      console.log(`  - ${r.explainerId}: ${r.reason}`);
    });
    process.exit(1);
  }
}

main();
```

---

### 3.3 Integration with the shared toolkit (toolkit-002)

The drift detection logic should be integrated into the shared toolkit as:

1. **A `detectDrift()` function** in the core toolkit library that:
   - Accepts an explainer-metadata.json path.
   - Returns a DriftReport (hasDrift: boolean, reason: string, currentVersion?: string).
   - Supports pluggable source adapters (one per data source type).

2. **Source adapters** (pluggable modules) for each data source:
   - `adapters/bls-cpi.ts` — BLS CPI API polling.
   - `adapters/usda-nass.ts` — NASS Quick Stats API.
   - `adapters/gtfs.ts` — GTFS feed version checking.
   - `adapters/osm.ts` — OSM planet file date checking.
   - `adapters/college-scorecard.ts` — College Scorecard release schedule.
   - etc.

3. **A drift detection CLI** or GitHub Action that runs on a schedule or on-demand:
   ```bash
   pnpm run detect-drift [--output report.json] [--create-issues]
   ```

**Toolkit documentation (DRIFT-DETECTION.md or similar) should cover:**
- How to run drift detection locally.
- How to add a new source adapter.
- How to interpret the drift report.
- How to manually trigger a refresh if needed.

---

## 4. Reproducibility Verification

### 4.1 The reproducibility guarantee

Every published figure is generated from committed code + a pinned source snapshot. To verify reproducibility end-to-end:

1. **Check out the commit** that published the explainer.
2. **Run the derivation code** with the pinned source snapshot.
3. **Compare the output** to the published figures (within tolerance).

### 4.2 Golden-fixture tests

The shared toolkit includes a golden-fixture test harness. For each explainer:

```typescript
import { describe, it, expect } from "vitest";
import { deriveCountyAg } from "../src/derive";
import * as snapshot from "../data/golden-fixtures/usda-nass-2025.json";

describe("county-ag derivation reproducibility", () => {
  it("regenerates county-ag figures from pinned snapshot", async () => {
    const result = await deriveCountyAg(snapshot, { county: "31055" });
    
    expect(result.totalCropAcres).toBeCloseTo(45230, { tolerance: 1 }); // ±1 acre
    expect(result.cornAcres).toBeCloseTo(12450, { tolerance: 2 });
    expect(result.wheatAcres).toBeCloseTo(3210, { tolerance: 1 });
  });

  it("produces the same aggregates across runs", async () => {
    const run1 = await deriveCountyAg(snapshot, { county: "31055" });
    const run2 = await deriveCountyAg(snapshot, { county: "31055" });
    expect(run1).toEqual(run2);
  });
});
```

**Tolerance guidance:**
- Exact (integer counts, geographic coordinates): 0 tolerance (unless rounding is documented).
- Floating-point (percentages, rates, sums of floats): ±0.1%.
- Statistical aggregates (means, medians): ±1% or domain-specific threshold.

### 4.3 CI reproducibility assertion

In CI (e.g., GitHub Actions), after every commit:

```yaml
- name: Build and test reproducibility
  run: |
    pnpm install
    pnpm run build          # Regenerate figures from code + snapshot
    pnpm run test           # Golden-fixture tests
    pnpm run reproducibility-check  # Verify published figures match regenerated output
```

If the check fails, the commit is blocked (not published) and an error is logged.

---

## 5. Refresh Task Process

### 5.1 Refresh task structure

When drift is detected (manually or automatically), a **refresh task** is opened. The task is structured as a Hee-Lee Oss `maintenance` task with these fields:

```json
{
  "id": "county-ag-ne-2026-refresh-002",
  "title": "Refresh: Nebraska County Agriculture Profiles 2025 → 2026 data",
  "project": "open-data-explainers",
  "type": "maintenance",
  "lane": "donated",
  "priority": "medium",
  "domain": ["public-data", "maintenance"],
  "riskTier": "low",
  "urgent": false,
  "deliverable": "document",
  "tokenEstimate": "small",
  "status": "open",
  "context": "Drift detected: USDA NASS has released 2026 survey data (version 2026-06-01). The existing explainer used 2025 data (vintage 2026-06-15). A refresh is needed to update figures.",
  "objective": "Update the Nebraska county-ag explainer figures to use the 2026 NASS data.",
  "acceptanceCriteria": [
    "Source snapshot updated to the 2026 NASS release (new retrieval date, version, and SHA-256 hash).",
    "Derivation code re-run; figures regenerated from the new snapshot.",
    "Golden-fixture tests updated if thresholds have changed; reproducibility verified in CI.",
    "Data vintage badge updated with new retrieval date and next-check date.",
    "Methodology Card reviewed for any changes to derivation parameters or caveats.",
    "Explainer republished with updated figures and badge."
  ],
  "resources": [
    "Original task: county-ag-ne-2026 (open-data-explainers-countyag-011)",
    "Drift report: drift-2026-07-01.json",
    "REFRESH.md — this document"
  ],
  "output": "Updated explainer artifact with 2026 data, committed source snapshot, and refreshed data-currency badge.",
  "requestor": "TO BE SECURED",
  "verifiedNeed": false,
  "outputLicense": "CC-BY-4.0",
  "linkedTasks": ["county-ag-ne-2026"],
  "refreshMetadata": {
    "originalExplainerId": "county-ag-ne-2026",
    "driftReason": "version mismatch (2025 → 2026)",
    "driftDetectionDate": "2026-07-01T09:30:00Z",
    "newDatasetVersion": "USDA NASS 2026 Survey Year",
    "newRetrievalDate": "2026-07-01T12:00:00Z"
  }
}
```

### 5.2 Refresh task workflow

1. **Drift detected** (manually or automatically via CI).
2. **Refresh task opened** with context about what changed.
3. **Author (or volunteer) claims the task** and updates the explainer:
   - Downloads the new source snapshot.
   - Runs the derivation code with the new snapshot.
   - Verifies reproducibility (golden-fixture tests pass).
   - Updates `explainer-metadata.json` with the new vintage.
   - Updates the data-currency badge.
4. **Methodology reviewer** (re-)signs off on the derivation.
5. **Explainer republished** with the new figures.
6. **Refresh task marked done.**

### 5.3 Refresh task creation (automated)

When drift is detected automatically, create the refresh task programmatically:

```typescript
async function createRefreshTask(
  driftReport: DriftReport,
  explainerMetadata: ExplainerMetadata
): Promise<void> {
  const refreshTask = {
    id: `${explainerMetadata.id}-refresh-${Date.now()}`,
    title: `Refresh: ${explainerMetadata.title} (${driftReport.reason})`,
    type: "maintenance",
    priority: "medium",
    linkedTasks: [explainerMetadata.id],
    refreshMetadata: {
      originalExplainerId: explainerMetadata.id,
      driftReason: driftReport.reason,
      driftDetectionDate: driftReport.checkDate,
      newDatasetVersion: driftReport.currentVersion,
    },
    // ... other fields ...
  };

  // Write to tasks/ directory or create a GitHub issue
  fs.writeFileSync(
    `tasks/${refreshTask.id}.json`,
    JSON.stringify(refreshTask, null, 2)
  );

  console.log(`Refresh task created: ${refreshTask.id}`);
}
```

---

## 6. Implementation Checklist for Authors

When creating or updating an explainer, follow this checklist:

- [ ] **Data vintage recorded:** `explainer-metadata.json` committed with source URL, version, retrieval date, and SHA-256 hash.
- [ ] **Refresh cadence set:** cadence reflects the source's update schedule (annual, monthly, on-demand, etc.).
- [ ] **Source snapshot committed:** A copy of (or pointer to) the source data snapshot is committed, with hash verification.
- [ ] **Derivation code reproducible:** Running `pnpm run derive --source snapshot.json` regenerates the figures.
- [ ] **Golden-fixture tests pass:** `pnpm run test` confirms figures match expected output (within tolerance).
- [ ] **Data-currency badge implemented:** The badge appears on the artifact, showing the vintage date and cadence.
- [ ] **Methodology Card current:** Links in the badge point to the Methodology Card and Sources & Limits.
- [ ] **Drift detection script tested:** Manually run `pnpm run detect-drift` to confirm the source adapter works.

---

## 7. Maintenance & Responsibility

### 7.1 Maintainer responsibilities

- **Maintain source adapters:** If a source API changes, update the corresponding adapter in the toolkit.
- **Run periodic drift checks:** Schedule and execute drift detection (manually or via CI) at least monthly.
- **Coordinate refresh tasks:** Triage drift reports, open refresh tasks, and assign them to authors.
- **Publicize updates:** Notify readers/partners when explainers are updated (if applicable).

### 7.2 Author responsibilities

- **Record and commit vintage:** Ensure `explainer-metadata.json` is always up-to-date.
- **Respond to refresh tasks:** When a refresh task is assigned, update the explainer within a reasonable timeframe (e.g., within 2–4 weeks for annual cadence).
- **Verify reproducibility:** Before republishing, confirm that figures regenerate from the new snapshot and pass golden-fixture tests.
- **Update the badge:** Always refresh the data-currency badge when republishing.

### 7.3 Reader / partner feedback

Readers can report:
1. **Suspected staleness** ("This data looks old; has it been updated?").
2. **Errors in derivation** ("The math doesn't match my hand calculation").
3. **Change requests** ("The refresh cadence should be quarterly, not annual").

These are directed to the maintainer or project issue tracker, and become potential refresh tasks.

---

## 8. Examples

### Example 1: County Agriculture Profile Refresh

**Original explainer (2026-06-15):**
- Data vintage: USDA NASS 2025 Survey Year, retrieved 2026-06-15.
- Refresh cadence: Annual (next check: 2027-06-15).
- Badge: "Data as of June 15, 2026 · Refresh cadence: Annual · ✓ Current".

**Drift detected (2026-07-01):**
- CI job detects new NASS release: 2026 Survey Year.
- Drift report: `{ hasDrift: true, reason: "version mismatch", currentVersion: "2026 Survey", recordedVersion: "2025 Survey" }`.
- Refresh task opened.

**Refresh workflow:**
1. Author downloads 2026 NASS snapshot.
2. Runs `pnpm run derive --source usda-nass-2026-snapshot.json`.
3. Compares output to golden fixture (within tolerance).
4. Updates `explainer-metadata.json`:
   ```json
   {
     "dataVintage": {
       "retrievalDate": "2026-07-01T12:00:00Z",
       "datasetVersion": "USDA NASS Quick Stats, 2026 Survey Year"
     },
     "nextCheckDate": "2027-07-01"
   }
   ```
5. Commits and republishes.
6. Badge now shows: "Data as of July 1, 2026 · ✓ Current (next check: July 2027)".

---

### Example 2: Transit-Access Explainer (Per-Feed GTFS Refresh)

**Explainer: Transit-access for Metro Area X**

GTFS feeds are refreshed by agencies on varying schedules (some weekly, some monthly, some quarterly). The refresh process is more granular:

1. **Metadata per feed:**
   ```json
   {
     "feeds": [
       {
         "agencyName": "Metro Transit",
         "feedUrl": "https://agency.gov/static/gtfs.zip",
         "retrievalDate": "2026-06-15T10:00:00Z",
         "datasetVersion": "GTFS-2026-06-15-v2.1",
         "sha256": "feed1sha256...",
         "refreshCadence": "monthly"
       },
       {
         "agencyName": "Regional Bus Co.",
         "feedUrl": "https://busgov.net/static/schedules.zip",
         "retrievalDate": "2026-06-10T14:30:00Z",
         "datasetVersion": "GTFS-2026-06-10",
         "sha256": "feed2sha256...",
         "refreshCadence": "quarterly"
       }
     ]
   }
   ```

2. **Drift detection:**
   - Check each feed URL for a new `feed_version` or HTTP `Last-Modified` header.
   - Report drift per feed (e.g., "Metro Transit feed has a new version").

3. **Refresh task:**
   - Specifies which feed(s) need updating.
   - Author downloads the new feed(s).
   - Reruns derivation with the new feed(s).
   - Verifies reproducibility (routes, stop counts, access scores).
   - Updates metadata and republishes.

---

## 9. FAQ

**Q: What if I can't regenerate a figure exactly due to rounding or float precision?**

A: Document the tolerance in your golden-fixture test (e.g., `tolerance: 0.01%`) and in the Methodology Card. Reproducibility doesn't require bit-for-bit identical output; it requires *mathematically equivalent* output within documented tolerances.

**Q: What if the source's API changes and my drift detection breaks?**

A: Update the source adapter in the toolkit. If the adapter breaks, drift detection fails gracefully (logged as an error), and a maintenance task is opened to fix the adapter. This is still better than silent staleness.

**Q: Should I refresh an explainer if the source hasn't changed, just because the refresh cadence is due?**

A: No. The cadence is a *check* schedule, not a refresh mandate. If drift detection shows no changes, skip the refresh. Only refresh if the source has actually changed or if you discover an error in the derivation.

**Q: Can I have a different refresh cadence for different parts of the explainer?**

A: Yes, if derived from different sources. Record the cadence per source in `explainer-metadata.json`. For example, a college-outcomes explainer might combine College Scorecard (annual) and graduation-rate data (biennial) — refresh when either source changes.

**Q: What's the difference between a refresh task and a corrections task?**

A: **Refresh tasks** update figures because the underlying source changed. **Corrections tasks** fix errors in the derivation logic or copy (without a source change). Both are `maintenance` type, but refresh tasks are triggered by drift; corrections are user-reported or author-initiated.

---

## 10. License & Attribution

This document is licensed **CC-BY-4.0**. When referencing or adapting this staleness/refresh process, please attribute:

> "Staleness, Refresh, and Data-Currency Process." open-data-explainers. Hee-Lee Oss. Licensed CC-BY-4.0.

---

## Appendix A: Source Adapters

Template for adding a new source adapter to the toolkit:

```typescript
// adapters/my-source.ts
export interface SourceAdapterConfig {
  sourceId: string;
  sourceUrl: string;
  apiKey?: string;
}

export interface VersionCheckResult {
  currentVersion: string;
  currentDate: string;
  changed: boolean;
}

export async function checkSourceVersion(
  config: SourceAdapterConfig
): Promise<VersionCheckResult> {
  // Implementation: query the source API or check file headers
  // Return the current version and date
  // Throw an error if the source is unreachable
  throw new Error("Implement in subclass");
}

export async function downloadSourceSnapshot(
  config: SourceAdapterConfig,
  outputPath: string
): Promise<void> {
  // Implementation: download the latest source snapshot
  // Write to outputPath
  // Compute and log SHA-256 hash
  throw new Error("Implement in subclass");
}
```

Example implementations:
- `adapters/bls-cpi.ts`
- `adapters/usda-nass.ts`
- `adapters/gtfs.ts`
- `adapters/osm.ts`
- etc.

---

## Appendix B: Methodology Card Refresh Field

The **Methodology Card** should include a `refreshMetadata` section:

```json
{
  "id": "county-ag-ne-2026",
  "title": "Nebraska County Agriculture Profiles",
  "version": "1.2.0",
  "dataVintage": {
    "retrievalDate": "2026-06-15T10:30:00Z",
    "datasetVersion": "USDA NASS 2025 Survey Year",
    "sourceUrl": "https://quickstats.nass.usda.gov/"
  },
  "derivation": { ... },
  "refreshMetadata": {
    "cadence": "annual",
    "lastRefreshedDate": "2026-06-15",
    "nextCheckDate": "2027-06-15",
    "changeLog": [
      {
        "date": "2026-06-15",
        "version": "1.2.0",
        "changes": "Initial release"
      }
    ]
  }
}
```

---

**End of document.**
