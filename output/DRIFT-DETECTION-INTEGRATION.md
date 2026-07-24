# Drift Detection Integration Guide

## Overview

This document describes how to integrate the drift-detection module into the **shared toolkit (toolkit-002)** for the open-data-explainers project. The drift-detection module is provided alongside REFRESH.md and the data-currency badge component to form a complete staleness/refresh solution.

## What's Included

1. **drift-detection.ts** — Core module with:
   - `detectDrift()` — check a single explainer for source updates.
   - `detectDriftBatch()` — check multiple explainers in parallel.
   - `createRefreshTask()` — create a maintenance task when drift is found.
   - SourceAdapter interface for pluggable source implementations.

2. **source-adapters.ts** — Example implementations for:
   - BLS CPI (Bureau of Labor Statistics)
   - USDA NASS Quick Stats
   - GTFS feeds (transit)
   - College Scorecard
   - OpenStreetMap Planet files
   - STATS19 (UK DfT accidents)

3. **data-currency-badge.tsx** & **data-currency-badge.css** — Reusable React component for displaying data vintage on every explainer artifact.

4. **REFRESH.md** — Complete policy document covering data vintage recording, refresh cadences, reproducibility, and the full refresh task workflow.

## Toolkit Integration Points

### 1. Directory Structure

Add these files to the shared toolkit repository under `toolkit/`:

```
toolkit-002/
  ├── src/
  │   ├── drift-detection/
  │   │   ├── index.ts            (export drift-detection.ts)
  │   │   ├── drift-detection.ts   (core module)
  │   │   └── adapters/
  │   │       ├── index.ts         (export DEFAULT_ADAPTERS)
  │   │       └── source-adapters.ts (example implementations)
  │   ├── components/
  │   │   ├── DataCurrencyBadge.tsx (React component)
  │   │   └── data-currency-badge.css (styles)
  │   └── index.ts                (main export)
  ├── docs/
  │   ├── REFRESH.md              (policy document)
  │   └── DRIFT-DETECTION-INTEGRATION.md (this file)
  └── package.json                (update with dependency: "types/node")
```

### 2. Package.json Configuration

Ensure these dependencies and scripts are in the toolkit's package.json:

```json
{
  "name": "@open-data-explainers/toolkit",
  "version": "1.0.0",
  "license": "MIT",
  "exports": {
    "./drift-detection": "./src/drift-detection/index.ts",
    "./components": "./src/components/index.ts"
  },
  "scripts": {
    "detect-drift": "node --experimental-modules src/cli/detect-drift.js",
    "build": "tsc && vite build",
    "test": "vitest",
    "test:drift-detection": "vitest src/drift-detection/**/*.test.ts"
  },
  "devDependencies": {
    "typescript": "^5.0",
    "vitest": "^1.0",
    "react": "^18.0",
    "react-dom": "^18.0"
  }
}
```

### 3. Export Index

Create `src/drift-detection/index.ts`:

```typescript
export {
  type ExplainerMetadata,
  type DriftReport,
  type SourceAdapter,
  detectDrift,
  detectDriftBatch,
  createRefreshTask,
} from "./drift-detection";
export { DEFAULT_ADAPTERS } from "./adapters/source-adapters";
```

Create `src/components/index.ts`:

```typescript
export { DataCurrencyBadge, type DataCurrencyBadgeProps } from "./DataCurrencyBadge";
export "./data-currency-badge.css";
```

## Usage Examples

### Example 1: Using Drift Detection in a Scheduled CI Job

```yaml
# .github/workflows/drift-detection.yml
name: Detect Data Drift

on:
  schedule:
    # First day of each month at 9 AM UTC
    - cron: "0 9 1 * *"

jobs:
  detect-drift:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: pnpm install

      - name: Run drift detection
        env:
          BLS_API_KEY: ${{ secrets.BLS_API_KEY }}
          NASS_API_KEY: ${{ secrets.NASS_API_KEY }}
        run: pnpm run detect-drift --output drift-report.json

      - name: Create issues for drift
        if: success() && hashFiles('drift-report.json') != ''
        run: pnpm run create-refresh-tasks --input drift-report.json

      - name: Upload report
        uses: actions/upload-artifact@v3
        with:
          name: drift-report
          path: drift-report.json
```

### Example 2: Using Drift Detection in TypeScript

```typescript
import {
  detectDrift,
  createRefreshTask,
  type ExplainerMetadata,
} from "@open-data-explainers/toolkit/drift-detection";
import { DEFAULT_ADAPTERS } from "@open-data-explainers/toolkit/drift-detection/adapters";
import fs from "fs";

async function main() {
  // Load explainer metadata
  const metadata: ExplainerMetadata = JSON.parse(
    fs.readFileSync("explainer-metadata.json", "utf-8")
  );

  // Find the appropriate adapter for this explainer
  const sourceUrl = metadata.dataVintage.sourceUrl;
  const adapter = DEFAULT_ADAPTERS.find((a) =>
    a.sourcePatterns.some((p) => p.test(new URL(sourceUrl).hostname))
  );

  if (!adapter) {
    console.error(`No adapter found for ${sourceUrl}`);
    process.exit(1);
  }

  // Run drift detection
  const report = await detectDrift(metadata, adapter, process.env.API_KEY);

  if (report.hasDrift) {
    console.log(`Drift detected: ${report.reason}`);
    const refreshTask = createRefreshTask(report, metadata);
    console.log("Refresh task:", JSON.stringify(refreshTask, null, 2));
  } else {
    console.log("No drift detected.");
  }
}

main().catch(console.error);
```

### Example 3: Using the Data-Currency Badge in React

```typescript
import { DataCurrencyBadge } from "@open-data-explainers/toolkit/components";
import "@open-data-explainers/toolkit/components/data-currency-badge.css";

export function CountyAgricultureExplainer() {
  return (
    <article>
      <h1>Nebraska County Agriculture Profiles</h1>

      <DataCurrencyBadge
        retrievalDate="2026-06-15"
        refreshCadence="annual"
        nextCheckDate="2027-06-15"
        methodologyUrl="/county-ag/methodology"
        sourcesLimitsUrl="/county-ag/sources"
      />

      {/* Main explainer content */}
    </article>
  );
}
```

## Adding a New Source Adapter

To support a new data source:

1. **Implement the SourceAdapter interface** in `src/drift-detection/adapters/`:

```typescript
export const MyDataSourceAdapter: SourceAdapter = {
  sourcePatterns: [/my-datasource\.org/],

  async getCurrentVersion(sourceUrl: string, apiKey?: string): Promise<string> {
    // Query the API or parse the webpage to get the current version
    // Return a string like "Dataset Version 2026-Q2"
  },

  async getLatestDate(sourceUrl: string, apiKey?: string): Promise<string> {
    // Return ISO 8601 date of the latest available data
  },
};
```

2. **Add it to DEFAULT_ADAPTERS** in `src/drift-detection/adapters/source-adapters.ts`:

```typescript
export const DEFAULT_ADAPTERS: SourceAdapter[] = [
  BlsCpiAdapter,
  UsdaNassAdapter,
  GtfsAdapter,
  CollegeScorecardAdapter,
  OsmPlanetAdapter,
  Stats19Adapter,
  MyDataSourceAdapter, // Add here
];
```

3. **Test it locally**:

```typescript
import { detectDrift } from "./drift-detection";
import { MyDataSourceAdapter } from "./adapters/source-adapters";

const metadata = JSON.parse(fs.readFileSync("explainer-metadata.json"));
const report = await detectDrift(metadata, MyDataSourceAdapter);
console.log(report);
```

## Testing

### Unit Tests for Drift Detection

```typescript
// src/drift-detection/drift-detection.test.ts
import { describe, it, expect, vi } from "vitest";
import { detectDrift, type ExplainerMetadata, type SourceAdapter } from "./drift-detection";

describe("detectDrift", () => {
  const mockAdapter: SourceAdapter = {
    sourcePatterns: [/test\.example/],
    getCurrentVersion: vi.fn().mockResolvedValue("v2.0"),
    getLatestDate: vi.fn().mockResolvedValue("2026-07-01"),
  };

  it("detects version mismatch", async () => {
    const metadata: ExplainerMetadata = {
      id: "test-explainer",
      title: "Test Explainer",
      dataVintage: {
        retrievalDate: "2026-06-01T00:00:00Z",
        datasetVersion: "v1.0", // Differs from current v2.0
        sourceUrl: "https://test.example.org/data",
        sourcePublisher: "Test Publisher",
        sourceSnapshot: {
          sha256: "abc123",
          waybackUrl: "https://web.archive.org/...",
          committedPath: "data/snapshot.json",
        },
        license: "CC-BY-4.0",
        licenseUrl: "https://...",
        attribution: "Test Publisher",
      },
      refreshCadence: "annual",
      nextCheckDate: "2027-06-01",
      lastRefreshedDate: "2026-06-01",
    };

    const report = await detectDrift(metadata, mockAdapter);
    expect(report.hasDrift).toBe(true);
    expect(report.reason).toBe("version mismatch");
    expect(report.currentVersion).toBe("v2.0");
  });

  it("returns no drift when versions match and cadence is not exceeded", async () => {
    const metadata: ExplainerMetadata = {
      // ... (similar structure)
      dataVintage: {
        // ...
        datasetVersion: "v2.0", // Matches current
        retrievalDate: new Date().toISOString(), // Today
      },
      refreshCadence: "annual",
      nextCheckDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const report = await detectDrift(metadata, mockAdapter);
    expect(report.hasDrift).toBe(false);
  });
});
```

### Component Tests for DataCurrencyBadge

```typescript
// src/components/DataCurrencyBadge.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataCurrencyBadge } from "./DataCurrencyBadge";

describe("DataCurrencyBadge", () => {
  it("renders current status when not stale", () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    render(
      <DataCurrencyBadge
        retrievalDate="2026-06-15"
        refreshCadence="annual"
        nextCheckDate={futureDate.toISOString().split("T")[0]}
        methodologyUrl="/methodology"
        sourcesLimitsUrl="/sources"
      />
    );

    expect(screen.getByText(/Current/)).toBeInTheDocument();
    expect(screen.getByText(/✓/)).toBeInTheDocument();
  });

  it("renders stale status when overdue", () => {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);

    render(
      <DataCurrencyBadge
        retrievalDate="2026-06-15"
        refreshCadence="annual"
        nextCheckDate={pastDate.toISOString().split("T")[0]}
        methodologyUrl="/methodology"
        sourcesLimitsUrl="/sources"
      />
    );

    expect(screen.getByText(/Stale/)).toBeInTheDocument();
    expect(screen.getByText(/⚠️/)).toBeInTheDocument();
  });
});
```

## CLI for Drift Detection

Create `src/cli/detect-drift.ts` to enable command-line usage:

```typescript
import fs from "fs";
import path from "path";
import { detectDriftBatch, createRefreshTask } from "../drift-detection";
import { DEFAULT_ADAPTERS } from "../drift-detection/adapters/source-adapters";
import type { ExplainerMetadata } from "../drift-detection";

async function main() {
  const outputPath = process.argv.includes("--output")
    ? process.argv[process.argv.indexOf("--output") + 1]
    : "drift-report.json";

  const createIssues = process.argv.includes("--create-issues");

  // Load all explainers
  const explainersDir = "explainers";
  const metadataFiles = fs
    .readdirSync(explainersDir, { recursive: true })
    .filter((f) => f.toString().endsWith("explainer-metadata.json"));

  const metadata: ExplainerMetadata[] = metadataFiles.map((file) =>
    JSON.parse(fs.readFileSync(path.join(explainersDir, file.toString()), "utf-8"))
  );

  // Detect drift for all explainers
  const reports = await detectDriftBatch(metadata, DEFAULT_ADAPTERS);

  // Write report
  fs.writeFileSync(outputPath, JSON.stringify(reports, null, 2));
  console.log(`Drift report written to ${outputPath}`);

  // Optionally create issues
  if (createIssues) {
    const driftReports = reports.filter((r) => r.hasDrift);
    for (const report of driftReports) {
      const meta = metadata.find((m) => m.id === report.explainerId);
      if (meta) {
        const task = createRefreshTask(report, meta);
        const taskPath = `tasks/${task.id}.json`;
        fs.writeFileSync(taskPath, JSON.stringify(task, null, 2));
        console.log(`Refresh task created: ${taskPath}`);
      }
    }
  }

  // Exit with error if drift found
  const hasDrift = reports.some((r) => r.hasDrift);
  process.exit(hasDrift ? 1 : 0);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
```

## License & Attribution

All drift-detection implementation files (drift-detection.ts, source-adapters.ts, data-currency-badge.tsx, data-currency-badge.css) are licensed **MIT**, compatible with toolkit-002.

The policy document (REFRESH.md) is licensed **CC-BY-4.0** as specified in the acceptance criteria.

---

**Next Steps:**

1. Integrate these files into the toolkit-002 repository.
2. Add source adapters as new data sources are supported.
3. Set up CI/CD drift detection with the provided GitHub Actions workflow.
4. Document the toolkit's data-currency badge in the main toolkit README.
