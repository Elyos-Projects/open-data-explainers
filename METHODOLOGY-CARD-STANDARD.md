# Methodology Card Standard
## for open-data-explainers

**License:** CC-BY-4.0  
**Version:** 1.0.0  
**Status:** Published (M0 Foundation)  
**Date:** 2026-03-15  
**Maintainer:** Hee-Lee Oss Explainers Project

---

## ⓘ IMPORTANT: License & Attribution

All deliverables in this standard are licensed under **Creative Commons Attribution 4.0 International (CC-BY-4.0)**.

You are free to:
- **Share** this standard (copy and redistribute in any medium or format)
- **Adapt** this standard (remix, transform, and build upon it)
- **Use commercially** or for any purpose

You must:
- **Attribute** the original work: cite "Hee-Lee Oss Explainers Project" and link to the original repository.
- **Include a copy of the license** or link to it (https://creativecommons.org/licenses/by/4.0/).
- **Indicate if you made changes** to the standard.

For more details, see the full license text at the end of this document.

---

## Overview

The **Methodology Card Standard** defines how every open-data-explainers module documents the computation, data sources, parameters, and limits of its derived metrics. This standard ensures:

- **Transparency:** Every number is traceable to documented inputs and code.
- **Auditability:** Reviewers, reusers, and the public can verify the methodology.
- **Reproducibility:** Figures can be regenerated from committed source snapshots and transform code.
- **Consistency:** All modules use the same schema, making them comparable.
- **Honesty:** Explicit disclaimers prevent misinterpretation of what the data do and don't claim.

---

## Components of the Standard

This standard comprises four coordinated documents:

### 1. **methodology-card-schema.json**
A machine-readable JSON Schema that defines the canonical structure of a Methodology Card. Every explainer fills out this schema, which can be validated by tools and rendered as human-readable Markdown.

**Key sections:**
- `metadata`: title, module name, version, authors
- `inputs`: source datasets, provenance, license, attribution
- `transforms`: documented derivations (aggregations, normalizations, bins, indexing)
- `parameters`: thresholds, weights, configurable choices and their rationale
- `vintage`: data currency and temporal scope
- `knownLimits`: caveats, assumptions, data quality notes
- `doesNotClaim`: explicit disclaimers (no causation, no ranking-as-advice, no prediction)
- `reproducibility`: repository, commit, test harness, build instructions

**Use:** Every explainer module must provide a Methodology Card that conforms to this schema.

### 2. **methodology-card-template.md**
A human-readable Markdown template showing how to render the JSON schema. It includes:

- A structured layout for presenting methodology in plain language
- Sections for inputs, transforms, parameters, vintage, limits, and disclaimers
- A worked example (county agriculture profile) showing how to fill it out
- Guidance for authors on keeping methodology transparent and scannable

**Use:** Authors use this template to write their Methodology Card in Markdown, which is generated from the JSON schema or hand-authored to match the schema structure.

### 3. **sources-and-limits-template.md**
A standard template for the "Sources & Limits" informational panel that appears in every explainer. It includes:

- Where the data came from and when
- Required attribution and license information
- Known gaps, quality caveats, and limitations
- Data currency and refresh cadence
- A process for reporting errors
- Accessibility and language accessibility commitments

Provided in:
- **Markdown** for documentation
- **HTML/React** for web embedding
- **CSS** for styling (light & dark modes, print-friendly)

**Use:** Every explainer embeds this panel prominently so readers know the data's provenance and limits before using it.

### 4. **non-partisan-notice-template.md**
Standard notices that frame civic explainers correctly. They establish that the explainer is:

- **Educational, not advice** (no personal recommendations)
- **Non-partisan** (not advocating for a political position)
- **Not causal** (shows patterns, not explanations)
- **Not a ranking** (no "best"; data support individual judgment)
- **Historical, not predictive** (past patterns ≠ future)

Provided in:
- **Markdown** for documentation
- **HTML/React** for web embedding
- **CSS** for styling
- **Customizable** by explainer type (agricultural, transit, collision, college, etc.)

**Use:** Civic and comparative explainers include the relevant notices prominently.

---

## How They Work Together

### The Publishing Pipeline

Every explainer module follows this pipeline:

```
1. Source snapshot
   ↓
   [License gate + provenance check + output-license resolution]
   ↓
2. Derivation code
   ↓
   [Compute metrics from source; apply parameters & transforms]
   ↓
3. Methodology Card (JSON)
   ↓
   [Validate schema; render as Markdown for review]
   ↓
4. Plain-language copy + data visualization
   ↓
   [Author the explainer; review copy for plain language]
   ↓
5. Assemble the artifact
   ├─ Explainer content
   ├─ Methodology Card (rendered Markdown)
   ├─ Sources & Limits panel
   ├─ Non-partisan notice(s)
   ├─ Data-currency badge
   └─ Golden-fixture tests
   ↓
   [License gate + methodology/stats review + accessibility review + domain review]
   ↓
6. Publish to beneficiary
   ↓
   [Record adoption evidence]
```

### Why This Matters

**For reviewers:**
- License reviewers check the `inputs` section and `doesNotClaim.causation` to verify share-alike propagation and causal claims.
- Methodology/stats reviewers audit the `transforms`, `parameters`, and `knownLimits` against the code, verify reproducibility, and sign off that the card matches the derivation.
- Accessibility reviewers ensure the Methodology Card and notices are WCAG 2.2 AA and grade-8 readable.
- Domain reviewers check that the `doesNotClaim` section and notices prevent misinterpretation in domain-specific contexts (transit access isn't "good transit design," collision hotspots don't blame communities, college outcomes aren't advice).

**For reusers:**
- Organizations reusing the explainer (embedding, adapting, citing) can understand the data's scope, limits, and proper attribution.
- Journalists using the data for a story can verify the methodology before publishing.
- Educators adapting the tool for a classroom have the information needed to explain it to students.

**For the public:**
- Readers can understand where the data came from, what limits apply, and what the explainer does and doesn't claim.
- Users can report corrections and have a clear process for updates.

---

## Acceptance Criteria (Methodology Card Tasks)

Every explainer module must:

1. ✅ **Provide a canonical Methodology Card** conforming to `methodology-card-schema.json`, including:
   - Inputs (source datasets with provenance, license, attribution)
   - Source snapshot reference (URL, retrieval date, version)
   - Transforms (documented derivations; code locations)
   - Parameters (thresholds, weights, rationale for each)
   - Vintage (data date range, refresh cadence)
   - Known limits (data coverage, quality, methodology, geographic, temporal, statistical caveats)
   - "Does NOT claim" list (no causation, no ranking-as-advice, no prediction; module-specific disclaimers)

2. ✅ **Render the card as human-readable Markdown** following `methodology-card-template.md`:
   - Structured sections for each component
   - Plain-language explanations with examples
   - Scannable, accessible layout

3. ✅ **Include a Sources & Limits panel** conforming to `sources-and-limits-template.md`:
   - Data provenance and attribution
   - Plain-language limitations and caveats
   - Data currency with staleness alerts
   - Error reporting process

4. ✅ **Include non-partisan/"not advice" notices** from `non-partisan-notice-template.md`:
   - (Required for civic modules: transit, collision, college outcomes, amenities)
   - (Optional for others, but recommended for any comparative/place-level explainer)

5. ✅ **License all deliverables CC-BY-4.0**:
   - Include license declaration in each document/tool
   - Provide a clear attribution requirement for reusers

6. ✅ **Ensure reproducibility**:
   - Record code repository, commit hash, and golden-fixture tests
   - Verify that figures regenerate from committed code + source snapshot in CI

---

## Using This Standard

### For Explainer Authors

1. **Fill the JSON schema:** Create a `methodology.json` file conforming to `methodology-card-schema.json` for your module. Include all required fields.

2. **Render as Markdown:** Generate or hand-author a `METHODOLOGY.md` that follows `methodology-card-template.md`, populating sections from your JSON.

3. **Embed the panel:** Include the Sources & Limits panel (use the React component, static HTML, or Markdown, as fits your tool).

4. **Add notices:** If your module is civic or comparative, include the relevant non-partisan and "not advice" notices from the template. Customize the `[TOPIC]` placeholder for your module.

5. **Test readability:** Ensure the Methodology Card and notices are at grade 8 reading level. Use tools like Flesch-Kincaid to verify.

6. **Review & iterate:** Have the methodology/stats reviewer audit the card against the code. Revise until the card matches the implementation exactly.

7. **Commit & version:** Commit the `methodology.json` and `METHODOLOGY.md` alongside your code. Update the version in metadata when the methodology changes.

### For Reviewers

1. **Methodology & Statistics reviewer:**
   - Audit the `transforms` against the committed code. Do they match?
   - Verify that `parameters` are correctly documented and justified.
   - Check the `knownLimits` for completeness (data coverage, quality, methodology, geography, temporal, statistical).
   - Ensure the `doesNotClaim` section is truthful and comprehensive.
   - Confirm that figures can be regenerated from the source snapshot + code in CI.
   - Sign off only when the card, code, and tests are in alignment.

2. **License reviewer:**
   - Verify that each `inputs[i]` has a full license record: id, URL, committed text snapshot, and `permitsDerivative: true`.
   - Check that `doesNotClaim.causation` and the non-partisan notice prevent misuse in domain contexts.
   - Confirm the output license is correctly resolved per source (share-alike propagated if needed).
   - Flag any causation claims, "best/worst" rankings, or advice-like language.

3. **Accessibility reviewer:**
   - Verify the Methodology Card and notices are WCAG 2.2 AA (contrast, keyboard, alt text, color-blind-safe).
   - Test with screen readers.
   - Run readability checks; confirm grade 8 or below.

### For Reusers & Adapters

1. **Before embedding or citing:** Read the Sources & Limits panel and the "Does NOT Claim" section to understand the scope.

2. **In your own work:** Cite the attribution string from the Methodology Card's `inputs[].attribution` field. Include a link to the original explainer.

3. **If adapting:** If you modify the explainer or derivation, update the Methodology Card to reflect your changes and re-run the golden-fixture tests to verify reproducibility.

4. **Share back:** If you find an error or limitation not listed, please report it via the error-reporting process so the original maintainers can update the card.

---

## Versioning & Updates

- **Methodology Card version:** Follows the explainer module's version (e.g., `county-ag-profiles v2.1.0` includes `methodology.json` at v2.1.0).
- **Methodology Card Standard version:** This document is versioned independently (currently v1.0.0). Updates to the standard are released as new versions and announced to all module maintainers.
- **Backward compatibility:** The standard may evolve (e.g., adding new optional fields to the schema). New fields are added as *optional*; existing modules don't need to re-validate unless they adopt the new fields.

---

## Examples

### Example 1: County Agriculture Profile

**Inputs:**
- USDA NASS QuickStats (public domain)

**Transforms:**
- Filter by county and state
- Aggregate by commodity
- Compute 5-year trend

**Parameters:**
- Trend window: 5 years
- Minimum acreage for display: 50 acres

**Vintage:**
- Data: 2019–2025 (preliminary)
- Refresh: Annual

**Known Limits:**
- Coverage limited to farms above NASS reporting threshold
- Preliminary years subject to revision
- Aggregated by county only; no sub-county granularity

**Does NOT Claim:**
- No causation (we show trends, not explanations for why they occurred)
- No advice (farmers and extension must decide policy)
- No prediction (historical trends ≠ future)

---

### Example 2: Transit Access Explainer

**Inputs:**
- GTFS feed (transit agency, per-feed license gated)
- Street network (OpenStreetMap, ODbL)

**Transforms:**
- Load GTFS stops and route information
- Build walkability network from OSM
- For each geographic area, compute stops within 800m walk distance
- Aggregate by stop and route frequency

**Parameters:**
- Walk-distance threshold: 800 meters (half-mile)
- Minimum frequency: ≥3 trips per week for inclusion

**Vintage:**
- GTFS snapshot: [agency-specific date]
- Refresh: [per-agency update schedule]

**Known Limits:**
- Coverage limited to areas where the transit agency publishes GTFS
- Rural, tribal, or private transit (if not in GTFS) won't show
- Pedestrian barriers (rivers, highways, fences) not accounted for; 800m walk distance is straight-line approximation
- Does not account for frequency (a stop with one bus per day and one with ten per day both show as "accessible")
- GTFS is static; real-time disruptions not shown

**Does NOT Claim:**
- No causation (good transit access doesn't cause anything; it's one of many factors in a place)
- No ranking (we don't say area X has "good" transit and area Y has "bad"; we show access patterns)
- No advice (this is not a housing recommendation or a policy endorsement)
- No blame (areas without transit access are not "bad"; transit is a policy choice and funding question)

---

## Compliance & Enforcement

All open-data-explainers modules must comply with this standard before publication:

1. **Automated compliance:** The module's CI/CD pipeline validates the Methodology Card JSON schema.
2. **Reviewer compliance:** The methodology/stats reviewer signs off that the card matches the code and tests.
3. **Publication gate:** A module cannot be published until both the automated and manual compliance checks pass.

---

## Attribution & License Text

This standard is licensed under CC-BY-4.0. If you reuse or adapt it, please include:

**Attribution:** "Methodology Card Standard for open-data-explainers, created by the Hee-Lee Oss Explainers Project."

**Link:** https://github.com/hee-lee-oss/open-data-explainers

**License:** https://creativecommons.org/licenses/by/4.0/

---

## CC-BY-4.0 License Summary

**You are free to:**
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material
- for any purpose, even commercially.

**Under the following terms:**
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **No additional restrictions** — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

**Full legal text:** https://creativecommons.org/licenses/by/4.0/legalcode

---

## Questions & Feedback

For questions about this standard or feedback on how to improve it:

1. **Open an issue** on the GitHub repository: https://github.com/hee-lee-oss/open-data-explainers/issues
2. **Email** the maintainers: [contact@example.org]
3. **Comment on pull requests** that use or update the standard.

---

## Related Documents

- **PLAN.md** — Full project plan, including architecture and success metrics
- **TASKS.md** — Task breakdown, including M0–M3 milestones and acceptance criteria
- **License & Provenance Gate (gate-003)** — Checklist for licensing decisions per source
- **Accessibility Standard (a11y-005)** — WCAG 2.2 AA + plain-language requirements
- **Region-Selection Rubric (regionrubric-006)** — How to choose regions to avoid bias

---

**Version:** 1.0.0  
**Published:** 2026-03-15  
**Status:** Active (Foundation phase, M0)
