# TASKS — open-data-explainers

> Status: Draft · Version: 0.1.0 · Last updated: 2026-06-28 · Owner: TBD (maintainer) · Lane: donated

## How these tasks map to Elyos

Each task below becomes an Elyos **Task JSON** validated against `packages/schema/src/schemas.ts`.
Field mapping:

- `id` — stable slug from the tables (e.g. `open-data-explainers-toolkit-001`).
- `title` — the table's Title.
- `project` — `open-data-explainers`.
- `type` — `code | research | writing | data | design-spec | maintenance` (per table).
- `lane` — `donated` for all tasks here. A compute-heavy batch would be `funded` and require
  `fundedBudgetUsd` (hard per-task cap) — none scheduled.
- `priority` — `high | medium | low`.
- `domain` — array, e.g. `["public-data","civic","education"]`.
- `riskTier` — `low | medium | high`. Derived-metric / share-alike / aggregation / place-level
  modules are `medium`; PD low-risk modules are `low`. No `high` as scoped.
- `urgent` — boolean; `false` for all current tasks.
- `deliverable` — `pr | dataset | document | translation`. Tooling/code → `pr`; explainers, cards,
  policies, lessons → `document`; translations → `translation`. We never deliver `dataset` (we
  publish derivatives as explainers/tools, not re-hosted datasets).
- `tokenEstimate` — `small | medium | large` (Size column).
- `status` — `open | in-progress | review | delivered | done`; all start `open`.
- `context`, `objective`, `acceptanceCriteria[]`, `resources[]`, `output` — per task.
- `requestor` — **TO BE SECURED** until a named beneficiary is confirmed.
- `verifiedNeed` — **`false`** until a named school/newsroom/civic group/portal agrees to host/use a
  specific explainer (general need is real; per-task delivery need is unproven).
- `outputLicense` — **decided at the gate per source**: explainer text/lessons `CC-BY-4.0`; code
  `MIT`; **OSM-derived database `ODbL-1.0`** (share-alike); per-feed GTFS/sky-survey may force
  share-alike or NC, recorded per task.

---

## Milestone M0 — Foundation & cold-start

| ID | Title | Type | Size | Risk | Deliverable | Depends on | Reviewer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| open-data-explainers-reviewers-001 | Name/secure the License and Methodology+Stats reviewers (blocking gate roles) | research | small | low | document | — | Maintainer |
| open-data-explainers-toolkit-002 | Shared explainer toolkit (adapter interface, derivation pipeline, static tool scaffold, golden-fixture harness) | code | medium | low | pr | — | Technical |
| open-data-explainers-gate-003 | License + provenance + output-license + PII/aggregation gate checklist | design-spec | small | medium | document | — | License |
| open-data-explainers-methodcard-004 | Methodology Card schema + Sources-&-limits + non-partisan/"not advice" template | design-spec | small | low | document | — | Methodology+Stats |
| open-data-explainers-a11y-005 | Accessibility + plain-language standard (WCAG 2.2 AA, reading grade ≤ 8) | design-spec | small | low | document | — | Accessibility |
| open-data-explainers-regionrubric-006 | Region-selection rubric + harm-scan checklist | design-spec | small | low | document | — | Maintainer |
| open-data-explainers-outreach-007 | Beneficiary/distribution outreach + pilot acceptance-path | research | small | low | document | — | Steward |
| open-data-explainers-pilot-008 | Pilot: one county-ag profile explainer end-to-end (USDA NASS) | data | medium | low | document | toolkit-002, gate-003, methodcard-004, a11y-005, outreach-007, reviewers-001 | License, Methodology+Stats, Accessibility |

**Acceptance criteria — key tasks**

- **toolkit-002 (shared explainer toolkit)**
  - [ ] Defines the shared explainer contract: `fetch(sourceSnapshot) → derive(params) →
        render(explainerArtifact)` with a committed `methodology.json` per explainer.
  - [ ] Reproducibility: a **golden-fixture harness** runs known-input→known-output tests for derived
        metrics in CI; published figures must regenerate within tolerance.
  - [ ] Static-first tool scaffold (client-side, no backend, no end-user tracking/PII); emits an
        embeddable, accessible artifact.
  - [ ] Content/data separation so translation is a downstream task (strings vs data).
  - [ ] Code MIT; `pnpm build && pnpm test && pnpm lint` green; commit DCO signed-off.

- **gate-003 (license + output-license + PII/aggregation gate)**
  - [ ] Records per source: license id + URL + committed text snapshot (copy + SHA-256 + Wayback),
        `permitsDerivative:true` with cited clause, and the **resolved output license** of our
        derivative. Missing/unparseable = FLAG/EXCLUDE (no default-allow).
  - [ ] Encodes share-alike propagation (ODbL→ODbL derived database; OSM attribution) and **per-feed**
        GTFS gating (exclude restrictive/no-derivative/unclear feeds) and SDSS/Gaia NC handling.
  - [ ] PII/aggregation rule: only aggregate or already-de-identified data; for person-derived sources
        (STATS19) require **aggregate-only output**, a **minimum cell count k ≥ 5** per geo/temporal
        bin, and a geo-precision limit; never person-level output; never de-anonymise.
  - [ ] Produces a committed, reviewable PASS/FLAG/EXCLUDE artifact per source/region.

- **methodcard-004 (Methodology Card + framing template)**
  - [ ] Canonical Methodology-Card schema: inputs, source snapshot ref, transforms, parameters,
        thresholds, vintage, known limits, and an explicit **"does NOT claim"** list (no causation,
        no ranking-as-advice).
  - [ ] Standard Sources-&-limits panel + civic **non-partisan / "not advice"** notice template.
  - [ ] Output licensed CC-BY-4.0.

- **pilot-008 (county-ag pilot, end-to-end)**
  - [ ] Module = county-ag-profiles for **one county** (USDA NASS Quick Stats: US-gov public domain,
        no PII) — chosen as lowest-risk proof of the per-region pattern.
  - [ ] Passed gate-003 (PD source; output explainer text CC-BY-4.0; no PII) with artifact committed.
  - [ ] Plain-language profile + small static tool built on the toolkit; Methodology Card + Sources-&-
        limits + vintage badge present; figures reproduce in CI from committed code + snapshot.
  - [ ] Accessibility pass (WCAG 2.2 AA, reading grade ≤ 8) signed off.
  - [ ] **Adopted** via an informal channel (a teacher/extension office/portal agrees to use/host) or
        self-serve+external-use — with the Steward's `outcomes/<explainer-id>.json` recorded — or, if
        none materialises, **delivered-pending** with the blocker surfaced.

**M0 Definition of Done:** License and Methodology+Stats reviewers named (blocking roles filled before
pilot review); toolkit + golden-fixture harness green in CI; license/output-license/PII gate +
Methodology-Card schema + accessibility standard + region rubric/harm-scan published; one county-ag
explainer built end-to-end (reproducible, accessible, license-verified) and **adopted** (evidence
recorded) — or delivered-pending with the blocker surfaced; ≥ 1 outreach thread opened.

---

## Milestone M1 — Low-risk modules at small scale + gates hardened + first adoptions

| ID | Title | Type | Size | Risk | Deliverable | Depends on | Reviewer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| open-data-explainers-cpi-009 | CPI inflation-by-category explainer (national, BLS) | data | medium | low | document | toolkit-002, gate-003, methodcard-004 | License, Methodology+Stats, Accessibility |
| open-data-explainers-college-010 | College-outcomes-explorer (College Scorecard) — not a ranking, not advice | data | medium | low | document | toolkit-002, gate-003, methodcard-004 | License, Methodology+Stats, Domain, Accessibility |
| open-data-explainers-countyag-011 | County-ag profiles batch (N counties via the pilot template) | data | large | low | document | pilot-008 | License, Methodology+Stats, Accessibility |
| open-data-explainers-corrections-012 | Public corrections process + changelog convention | design-spec | small | low | document | toolkit-002 | Maintainer |
| open-data-explainers-partner-013 | Secure first confirmed distribution partner | research | small | low | document | outreach-007 | Steward |

**Acceptance criteria — key tasks**

- **cpi-009 (CPI explainer)**
  - [ ] Gate-003 PASS (BLS = public domain; output text CC-BY-4.0; no PII).
  - [ ] Plain-language inflation-by-category explainer; correct base/reference period; **no advice**
        ("not financial advice"); Methodology Card states series, base, and limits.
  - [ ] Figures reproduce from committed code + BLS source snapshot in CI; accessibility pass.

- **college-010 (college-outcomes-explorer)**
  - [ ] Gate-003 PASS (College Scorecard = public domain; output CC-BY-4.0; institution-level, no
        person-level data).
  - [ ] Presents affordability + outcomes **without a single composite "best" ranking** and **without
        causal claims** (earnings ≠ caused by the college); explicit "not advice" + limits.
  - [ ] Methodology+Stats and Domain (college-access practitioner) sign-off; accessibility pass;
        figures reproduce in CI.

- **partner-013 (first confirmed partner)**
  - [ ] A named beneficiary (school/OER network, newsroom, civic group, or portal) confirms they will
        host/use a specific explainer.
  - [ ] Channel + acceptance evidence defined; affected tasks updated to `verifiedNeed:true` with
        `requestor` set.

**M1 Definition of Done:** license + methodology/stats gates codified and applied to every delivered
explainer; cpi-explainer + college-outcomes + a county-ag batch delivered (reproducible, accessible,
license-verified); ≥ 3 explainers adopted (evidence recorded); ≥ 1 confirmed partner; corrections
process live.

---

## Milestone M2 — Medium-risk modules (behind methodology/stats + domain review)

| ID | Title | Type | Size | Risk | Deliverable | Depends on | Reviewer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| open-data-explainers-transit-method-014 | Transit-access score definition + methodology (walk threshold, network, frequency) | design-spec | small | medium | document | methodcard-004 | Methodology+Stats, Domain |
| open-data-explainers-transit-015 | Transit-access explainer for ≥ 1 metro (GTFS, per-feed license verified) | data | large | medium | document | transit-method-014, toolkit-002, gate-003 | License, Methodology+Stats, Domain, Accessibility |
| open-data-explainers-osmkit-016 | OSM ODbL share-alike output kit (derived-DB vs produced-work, attribution) | code | medium | medium | pr | toolkit-002, gate-003 | License, Technical |
| open-data-explainers-amenities-017 | Amenities-near-me derived POI set for ≥ 1 area (OSM, ODbL output) | data | large | medium | document | osmkit-016, gate-003 | License, Methodology+Stats, Accessibility |
| open-data-explainers-collision-018 | Collision-hotspots explainer for ≥ 1 area (STATS19, aggregate-only) | data | large | medium | document | toolkit-002, gate-003, regionrubric-006 | License, Methodology+Stats, Domain, Accessibility |

**Acceptance criteria — key tasks**

- **transit-015 (transit-access explainer)**
  - [ ] **Each GTFS feed used is license-gated individually** (gate-003): only feeds whose license
        permits the derivative are used; restrictive/no-derivative/unclear feeds excluded; per-feed
        attribution + resolved output license recorded (share-alike carried if the feed requires it).
  - [ ] Access score follows the locked `transit-method-014` definition; Methodology Card documents
        walk threshold, network vs straight-line, and frequency weighting; **no "good/bad place"
        judgement** (harm scan passed).
  - [ ] Figures reproduce in CI; accessibility + domain (transport) sign-off.

- **amenities-017 (OSM amenities)**
  - [ ] Gate-003 PASS with **output license = ODbL-1.0** for any derived database and **"© OpenStreetMap
        contributors"** attribution; produced map/visual licensed CC-BY-SA; share-alike **not**
        relicensed as permissive (license reviewer verifies).
  - [ ] Derivation reproducible from a pinned OSM extract date; harm scan (no "amenity desert"
        stigmatisation) passed; accessibility pass.

- **collision-018 (collision-hotspots)**
  - [ ] Gate-003 PASS (STATS19 OGL v3; OGL attribution; output text CC-BY-4.0): **aggregate-only**,
        **k ≥ 5 minimum cell count** per geo/temporal bin, geo-precision limit; **no person-level
        rows**, no re-identification.
  - [ ] Methodology Card: appropriate denominators/exposure where used, noise acknowledged, **no
        causation and no "dangerous road" labelling**; explicit "not advice / non-partisan".
  - [ ] Harm scan passed (no blame/stigma); domain (road-safety) + stats + accessibility sign-off;
        figures reproduce in CI.

**M2 Definition of Done:** transit-access (≥ 1 metro, per-feed licenses verified) + amenities (≥ 1
area, correct ODbL output) + collision-hotspots (≥ 1 area, aggregate-only k≥5, stats+domain reviewed,
harm-scanned) delivered; ≥ 6 explainers adopted cumulatively; **0 license/share-alike violations** and
**0 statistical-error findings** across delivered work.

---

## Milestone M3 — Astronomy lessons, reuse outcomes & sustainability

| ID | Title | Type | Size | Risk | Deliverable | Depends on | Reviewer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| open-data-explainers-astro-019 | Astronomy lesson from sky-survey data (SDSS/Gaia, educator-reviewed) | writing | medium | medium | document | toolkit-002, gate-003, methodcard-004 | License, Domain (astronomy/educator), Accessibility |
| open-data-explainers-reuse-020 | Track and verify external reuse/usage outcomes | research | small | low | document | partner-013 | Steward |
| open-data-explainers-refresh-021 | Staleness/refresh process + data-currency badges + drift detection | maintenance | small | low | document | toolkit-002 | Maintainer |

**Acceptance criteria — key tasks**

- **astro-019 (astronomy lesson)**
  - [ ] Gate-003 PASS: SDSS/Gaia **release terms verified** to permit educational reuse; **NC handled**
        (carry NC + label, or exclude) — never laundered into a permissive output; required
        SDSS/Gaia acknowledgment included.
  - [ ] Classroom lesson built from survey data with a Methodology Card and accurate astronomy; an
        **astronomer/educator domain reviewer** signs off; accessibility pass; output CC-BY-4.0 (or
        NC-labelled if a release requires it).

- **reuse-020 (reuse tracking)**
  - [ ] ≥ 3 verifiable external reuse/usage events recorded (partner-hosted traffic, teacher reuse,
        newsroom embed, citation), each with external evidence — no self-reported use.

- **refresh-021 (staleness/refresh)**
  - [ ] Each explainer records data vintage + refresh cadence; drift in an upstream release opens a
        `maintenance` refresh task; re-running committed derivation regenerates figures.

**M3 Definition of Done:** ≥ 1 educator-reviewed, license-verified astronomy lesson; ≥ 3 verifiable
reuse events; ≥ 8 explainers adopted cumulatively across ≥ 4 modules; staleness/refresh + currency
badges live; steward identified for ongoing liaison and outcome tracking.

---

## Backlog / future

| ID | Title | Type | Size | Risk | Deliverable | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| open-data-explainers-i18n-022 | Translate a delivered explainer (domain/language reviewer) | translation | small | medium | translation | Content/data separation makes this cheap; needs a language reviewer |
| open-data-explainers-gtfs-catalog-023 | GTFS multi-feed license catalog + scaling | research | medium | medium | document | Per-feed license triage to scale transit-access across metros |
| open-data-explainers-dash-024 | Outcome/usage dashboard (privacy-preserving, aggregate) | code | medium | low | pr | Reads the outcome ledger; no end-user PII |
| open-data-explainers-collision-trends-025 | Multi-year collision trend explainers (aggregate) | data | medium | medium | document | Extends collision module; same aggregate-only k≥5 gate |
| open-data-explainers-college-region-026 | Regional college-affordability explainers | data | medium | low | document | Per-region slices of the college module |

---

## Example task JSON

```json
{
  "id": "open-data-explainers-toolkit-002",
  "title": "Shared explainer toolkit (adapter interface, derivation pipeline, static tool scaffold, golden-fixture harness)",
  "project": "open-data-explainers",
  "type": "code",
  "lane": "donated",
  "priority": "high",
  "domain": ["public-data", "civic", "education", "open-source"],
  "riskTier": "low",
  "urgent": false,
  "deliverable": "pr",
  "tokenEstimate": "medium",
  "status": "open",
  "context": "open-data-explainers turns verified open datasets into plain-language explainers and small static tools, decomposed into per-region/per-category tasks across seven modules (transit-access, collision-hotspots, college-outcomes, amenities, cpi, county-ag, astronomy). Because the project publishes derivatives, every figure must be reproducible and every module must share one contract so adding modules and regions is cheap and consistent. This task builds the shared toolkit all later tasks depend on.",
  "objective": "Build the shared explainer toolkit: a source-adapter interface, a reproducible derivation pipeline, a static-first (no-backend, no-tracking) tool/template scaffold, and a golden-fixture test harness — implementing the fetch->derive->render contract with a committed methodology.json per explainer.",
  "acceptanceCriteria": [
    "Defines the shared explainer contract fetch(sourceSnapshot) -> derive(params) -> render(explainerArtifact), with a committed methodology.json per explainer.",
    "Golden-fixture harness runs known-input -> known-output tests for derived metrics in CI; published figures regenerate within tolerance from committed code + source snapshot.",
    "Static-first tool scaffold is client-side with no backend, no database, and no end-user tracking or PII; output is embeddable and accessible.",
    "Content and data are separated so internationalisation is a cheap downstream task.",
    "Code is MIT-licensed; pnpm build && pnpm test && pnpm lint pass; commit is DCO signed-off."
  ],
  "resources": [
    "C:\\code\\elyos\\planning\\projects\\open-data-explainers\\PLAN.md",
    "C:\\code\\elyos\\governance\\proposals\\open-data-explainers.md",
    "C:\\code\\elyos\\packages\\schema\\src\\schemas.ts",
    "GTFS specification; OpenStreetMap/ODbL; College Scorecard; BLS CPI; USDA NASS; STATS19; SDSS/Gaia; WCAG 2.2"
  ],
  "output": "A shared explainer toolkit (adapter interface + reproducible derivation pipeline + static tool scaffold + golden-fixture harness) committed to the project repo and ready for reuse by every per-region explainer task.",
  "requestor": "TO BE SECURED",
  "verifiedNeed": false,
  "outputLicense": "MIT"
}
```
