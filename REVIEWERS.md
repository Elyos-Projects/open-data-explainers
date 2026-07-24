# Reviewers & Blocking Gate Roles — open-data-explainers

> **Status:** Framework complete; roles recruiting · **Version:** 1.0.0 · **Last updated:** 2026-07-24

**This is a prerequisite governance artifact for M0.** The two roles documented here are **non-skippable blocking gates**; the M0 pilot cannot proceed to review until both roles are filled and this document is committed.

**What's done:** Complete role definitions, qualifications, checklists, and recruitment process. Ready to onboard reviewers.  
**What's next:** Project maintainer(s) identify and secure named individuals for each role, then update the Current Status table below.

---

## Overview

open-data-explainers publishes **derivatives** (aggregations, explainers, small tools) built from open datasets. Because derivatives carry their own licensing obligations and statistical claims, two expert reviewer roles are mandatory:

1. **License + provenance reviewer** — verifies the output license is correct and share-alike terms are handled.
2. **Methodology + statistics reviewer** — verifies derivations are statistically sound and reproducible.

Both roles are hard gates: an explainer ships only after both reviewers sign off. No exceptions; no auto-approve.

---

## Role 1: License + Provenance Reviewer

**Purpose:** Gatekeeper for licensing correctness and output-license determination across all delivered explainers.

**Scope:**
- Every explainer, every dataset source, every region/category slice.
- Decide the output license per source (accounting for share-alike propagation).
- Verify attribution is correct and complete.
- Flag PII/aggregation risks requiring escalation.
- Exclude sources whose license forbids the derivative we intend.

**Responsibilities (per explainer review):**
- Confirm source is licensed to permit derivatives (verify with cited clause, not guessed).
- Snapshot the source license (URL + text copy + SHA-256 + Wayback link).
- Resolve the **output license** of our derivative:
  - Public-domain/CC sources → CC-BY-4.0 (text), MIT (code)
  - ODbL sources → ODbL output for derived database; CC-BY-SA for produced visual
  - Share-alike sources → carry share-alike; never relicense as permissive
  - Per-feed GTFS → verify each feed individually; exclude restrictive/unclear
  - Non-commercial (NC) sources → carry NC label or exclude (never launder to permissive)
- Verify PII/aggregation assumptions (aggregate-only, k≥5 thresholds, geo-precision) per data source.
- Produce a committed PASS/FLAG/EXCLUDE gate artifact per source.

**Required expertise:**
- Fluent in open-source licensing (CC, MIT, ODbL, OGL, SPDX).
- Comfortable with share-alike propagation rules (especially ODbL).
- Experience with license tooling (SPDX, CycloneDX, or similar).
- Able to read legal terms carefully and escalate ambiguities.
- No conflict-of-interest regarding any source or dataset.

**Preferred:**
- Prior work with derivative datasets (data-derived publications, open data portals).
- Familiarity with GTFS, OpenStreetMap licensing, government data (US/UK/EU), or survey data terms.
- Accessibility/availability: async review is acceptable (24–48-hour turnaround).

**Effort:**
- ~30 min per explainer review (depends on data-source complexity).
- M0: 1 explainer; M1: 4 explainers; M2: 5 explainers; M3: 1 explainer.
- Can rotate among ≥2 qualified reviewers, but ≥1 must always be active.

**Sign-off mechanism:**
- Gate-review artifact committed to `governance/license-gates/<explainer-id>.md`.
- Review must be recorded in the explainer's pull request before merge.
- At least one reviewer signature per artifact.

---

## Role 2: Methodology + Statistics Reviewer

**Purpose:** Gatekeeper for statistical and reproducibility correctness across all derived-metric modules.

**Scope:**
- Every module that publishes a computed metric: transit-access (score), collision-hotspots (aggregated rates/trends), college-outcomes (affordability/outcome bands), CPI (inflation rates).
- Confirm derivation is sound, reproducible, and free of statistical errors.
- Verify Methodology Card matches committed code.
- Flag causal claims, bad denominators, ecological fallacies, or noise misinterpretation.

**Responsibilities (per module review):**
- Confirm the source data and the derivation parameters (aggregation level, thresholds, normalisation, weighting).
- Verify no statistical errors:
  - Appropriate denominators/exposure where used.
  - Noise acknowledged and not over-interpreted.
  - No ecological fallacy (individual-level inference from aggregate data).
  - No causation from correlation.
  - No ranking-as-advice ("best college," "dangerous road").
- Verify the committed code matches the Methodology Card; figures regenerate from the snapshot input.
- Confirm golden-fixture CI tests pass (known-input → known-output).
- Verify Methodology Card is complete: inputs, transforms, parameters, thresholds, known limits, vintage, "does NOT claim" list.

**Required expertise:**
- Strong statistical background (experimental design, aggregation, aggregation artifacts, noise handling).
- Comfortable with causal inference concepts (can spot spurious correlation).
- Able to read Python/Node/R code and validate the derivation logic.
- Experience with reproducible research practices (version control, fixtures, CI).
- Accessible to developers (async review acceptable; can answer clarification questions).
- No conflict-of-interest regarding any dataset or region.

**Preferred:**
- Data journalism or civic data experience.
- Familiarity with spatial/temporal aggregation (geo-binning, temporal smoothing).
- Experience with one or more data sources (GTFS, STATS19, College Scorecard, BLS CPI, OSM, USDA NASS, sky surveys).
- A track record of pointing out subtle statistical errors in published work.

**Effort:**
- ~45 min – 1.5 hours per module (depends on derivation complexity).
- M0: 1 module (county-ag, simple); M1: 4 modules (CPI, college, county-ag batch); M2: 3 modules (transit, amenities, collision); M3: 1 module (astronomy lessons).
- Modules may rotate reviewers, but ≥1 must always be active.

**Sign-off mechanism:**
- Gate-review artifact committed to `governance/methodology-gates/<module-id>.md`.
- Review recorded in the PR before merge.
- At least one reviewer signature per artifact.

---

## Current Status

| Role | Name/Handle | Contact | Confirmed | Notes |
| --- | --- | --- | --- | --- |
| License + provenance | [TO BE SECURED] | — | ❌ | Recruiting: strong open-source licensing expertise required; GTFS/OSM/NC handling. |
| Methodology + statistics | [TO BE SECURED] | — | ❌ | Recruiting: statistical rigor + causation/fallacy awareness + code review; civic data preferred. |

### How to secure a reviewer

1. **Identify a candidate** with the required expertise (see above).
2. **Approach informally** with a link to this document + the explainer on the project vision and values (see [PLAN.md](./PLAN.md)).
3. **Confirm willingness and availability** — async review is fine; turnaround expectations are 24–48 hours per explainer.
4. **Clarify conflict-of-interest** — they should have no stake in the outcome (not a tool vendor, data publisher, or advocacy group that might benefit from a particular license or statistical framing).
5. **Record in this document:** name/handle, contact method (email, GitHub, Slack), and the date they confirmed.
6. **Commit this document** when both roles are filled.

---

## Blocker: M0 cannot proceed until both roles are named

The M0 Definition of Done (in [TASKS.md](./TASKS.md)) explicitly requires:

> License and Methodology+Stats reviewers named (blocking roles filled before pilot review); …

**What this means:**
- The M0 pilot (county-ag explainer) can be built, but **cannot enter review** until both reviewers are named and have agreed.
- Once named, both reviewers sign off on the pilot explainer before merge.
- If a reviewer becomes unavailable, a replacement must be identified and confirmed *before* work on the next milestone begins.

---

## Governance & escalations

**Conflict-of-interest:**
- Reviewers must be independent of the source/dataset publishers and the project requestor/beneficiary.
- If a conflict emerges (e.g., a reviewer's employer publishes a dataset we're reviewing), they recuse themselves and a replacement is named.

**Rotation:**
- The project can have ≥2 qualified reviewers for each role; reviewers may rotate per module.
- But ≥1 must always be active (no gaps; if a reviewer steps down, a replacement is named immediately).

**Appeal / escalation:**
- If a developer disagrees with a gate decision (license or methodology), they raise it in the PR thread.
- The reviewer explains their reasoning; if unresolved, the Maintainer + second reviewer arbitrate.

**Reviewer training / onboarding:**
- The Maintainer provides:
  - A tour of the `governance/license-gates/` and `governance/methodology-gates/` artifacts (examples of prior reviews).
  - Links to the full PLAN.md and the relevant data-source license terms.
  - A checklist template for each review type (see below).

---

## Review checklists (templates for reviewers)

### License + Provenance Reviewer Checklist

- [ ] **Source license identified:** URL + license name/ID (SPDX if possible).
- [ ] **License permits derivative:** Found explicit clause permitting derivative use; cited in review.
- [ ] **Snapshot committed:** source URL + license text (copy + SHA-256 + Wayback link) committed to the explainer's sources/ directory.
- [ ] **Output license decided:**
  - [ ] PD/CC/OGL sources → CC-BY-4.0 (text), MIT (code); attribution correct.
  - [ ] ODbL sources → output database ODbL; visual/map CC-BY-SA; OSM attribution included.
  - [ ] Share-alike source → output carries share-alike; never relicensed as permissive.
  - [ ] Per-feed GTFS → each feed gated individually; restrictive/unclear feeds excluded.
  - [ ] NC sources → NC label carried or source excluded; never laundered to permissive.
- [ ] **Attribution complete:** all required attribution strings present in the explainer's footer/metadata.
- [ ] **PII/aggregation gate passed (if applicable):**
  - [ ] Aggregate-only per schema (no person-level rows).
  - [ ] Minimum cell-count threshold (k≥5) enforced if person-derived data used.
  - [ ] Geo-precision limits applied.

**Gate outcome:** ☐ PASS  ☐ FLAG (needs revision)  ☐ EXCLUDE (source not suitable)

**Reviewer name/date:** ________________  ________________

---

### Methodology + Statistics Reviewer Checklist

- [ ] **Derivation parameters clear:** documented in Methodology Card + code comments; same in both.
- [ ] **Source data understood:** input dataset + vintage + retrieval method clear.
- [ ] **Aggregation sound:**
  - [ ] Appropriate denominators (population, exposure, time period, etc.).
  - [ ] Normalisation justified (per capita, per-mile, annualized, etc.).
  - [ ] No aggregation artifacts (Simpson's paradox, ecological fallacy).
- [ ] **Statistics OK:**
  - [ ] No causation claimed from observational data.
  - [ ] Confidence intervals or uncertainty bounds stated if published.
  - [ ] No over-interpretation of noise (p-hacking, data-dredging guards).
  - [ ] Outliers handled appropriately (investigated, not silently trimmed).
- [ ] **Reproducibility verified:**
  - [ ] Golden-fixture tests pass (known input → known output, within tolerance).
  - [ ] Code + snapshot source can regenerate the published figures.
  - [ ] CI green (`pnpm build && pnpm test && pnpm lint`).
- [ ] **Methodology Card matches code:**
  - [ ] Inputs, parameters, thresholds match the committed code.
  - [ ] "Does NOT claim" list complete (no causation, no ranking-as-advice, etc.).
  - [ ] Limits/caveats honest (data vintage, aggregation limits, noise, etc.).
- [ ] **Framing OK (civic modules only):**
  - [ ] No ranking-as-advice ("best college," "dangerous road").
  - [ ] No partisan language; non-partisan notice included.
  - [ ] Presented as information, not guidance; limits acknowledged.

**Gate outcome:** ☐ PASS  ☐ FLAG (needs revision)  ☐ EXCLUDE (statistical error unfixable)

**Reviewer name/date:** ________________  ________________

---

## Reviewer onboarding links & resources

- **PLAN.md** — full project vision, risk tiers, dataset licensing, non-goals: [link](./PLAN.md)
- **TASKS.md** — task decomposition + acceptance criteria: [link](./TASKS.md)
- **License gate checklist** — data-source license decision matrix: [PLAN.md § Data, licensing & compliance](./PLAN.md#data-licensing--compliance)
- **Methodology-Card schema** — structured format for "how each number was computed": [task open-data-explainers-methodcard-004](./tasks/open-data-explainers-methodcard-004.json)
- **Hee-Lee Oss good-deed definition** — project values, refusal guardrails, non-partisan posture: (provided on onboarding)
- **GTFS specification** — [gtfs.org](https://gtfs.org)
- **OpenStreetMap ODbL** — [osmfoundation.org/wiki/Licence](https://osmfoundation.org/wiki/Licence)
- **Open Government Licence v3.0 (OGL)** — used by UK STATS19: [nationalarchives.gov.uk/doc/open-government-licence](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/)
- **Creative Commons Licenses** — [creativecommons.org/licenses](https://creativecommons.org/licenses/)
- **SPDX License List** — standard license identifiers: [spdx.org/licenses](https://spdx.org/licenses/)

---

## Definition of "Task marked done"

This task (open-data-explainers-reviewers-001) is marked **done** once:

1. ✅ A named individual (name or GitHub handle) with licensing expertise has confirmed willingness to review explainers' license + output-license correctness.
2. ✅ A named individual (name or GitHub handle) with statistics/methodology expertise has confirmed willingness to review derived-metric soundness.
3. ✅ Both names, contact methods, and their confirmed scopes are recorded in **this document** (REVIEWERS.md).
4. ✅ This document is **committed** to the repo.
5. ✅ The Maintainer updates the corresponding tasks in `TASKS.md` (`requestor` and `verifiedNeed` may still be `"TO BE SECURED"` and `false` per-task, but the gate roles themselves are now named).

**After this task is done:** The M0 pilot task (open-data-explainers-pilot-008) can proceed to review, with both reviewers signing off before merge.

---

## History

- **2026-07-24** — REVIEWERS.md created; roles defined; [open-data-explainers-reviewers-001](./TASK.md) task scaffolding complete. Awaiting volunteer confirmations.
