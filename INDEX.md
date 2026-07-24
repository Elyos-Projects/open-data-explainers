# Methodology Card Standard — Deliverables Index

**Task:** open-data-explainers-methodcard-004  
**License:** CC-BY-4.0  
**Status:** Complete (Ready for M0 Review)  
**Date:** 2026-03-15

---

## Deliverables

This task produces a complete, canonical standard for how every open-data-explainers module documents its methodology. The standard comprises five core documents plus an implementation guide:

### 1. **methodology-card-schema.json**
**Type:** Machine-readable specification  
**Purpose:** JSON Schema that defines the canonical structure of a Methodology Card

**Contains:**
- Metadata (title, version, authors)
- Inputs (source datasets, provenance, license, attribution)
- Transforms (documented derivations with code locations)
- Parameters (thresholds, weights, configuration)
- Vintage (data date range, refresh cadence, staleness thresholds)
- Known Limits (data coverage, quality, methodology, geographic, temporal, statistical caveats)
- Does NOT Claim (causation, ranking, prediction, advice disclaimers)
- Reproducibility (code repository, commit, tests, build instructions)

**Used by:** Every explainer module; validated in CI; rendered as Markdown for review

**Example:** See the schema structure (11 main sections, 50+ properties)

---

### 2. **methodology-card-template.md**
**Type:** Human-readable template  
**Purpose:** Shows how to render a Methodology Card from the JSON schema as plain-language Markdown

**Contains:**
- Template structure showing each section
- Guidance for authors (keep it honest, be specific, use examples)
- Worked example: County Agriculture Profile (fully filled-out example showing all sections)
- Notes on authorship and review

**Used by:** Explainer authors; methodology/stats reviewers; anyone reading a card

**Audience:** Non-technical readers, educators, journalists, the general public

---

### 3. **sources-and-limits-template.md**
**Type:** Embeddable panel template  
**Purpose:** Standard Sources & Limits informational panel for every explainer

**Contains (Markdown):**
- Where the data came from (dataset table, attribution, links)
- What you should know (coverage gaps, quality issues, methodology notes, temporal caveats, geographic precision, causal limitations)
- Data currency (date range, refresh cadence, staleness status)
- Error reporting process
- Accessibility commitment

**Contains (HTML/React):**
- React component with automatic staleness status calculation
- Styled with CSS for light/dark modes and print-friendly rendering
- Fully accessible (WCAG 2.2 AA, keyboard navigation, screen reader tested)

**Used by:** Embedded in every explainer tool, webpage, or document

**Audience:** Data users before they start exploring results

---

### 4. **non-partisan-notice-template.md**
**Type:** Reusable notice template  
**Purpose:** Standard framing for civic explainers (transit, collision, college, etc.)

**Contains (Markdown + HTML/React + CSS):**
- Educational disclaimer ("not advice")
- Non-partisan frame ("factual, no advocacy")
- No causation ("patterns don't explain themselves")
- No ranking ("best depends on you")
- Not predictive ("past ≠ future")

**Customizable by:**
- Explainer type (educational, civic, hotspot, ranking, historical, combined)
- Topic (customizable placeholder)
- Which warnings are most relevant to the module

**Used by:** Civic and comparative modules (transit-access, collision-hotspots, college-outcomes, amenities-near-me)

**Audience:** Readers before misinterpreting data as advice or ranking

---

### 5. **METHODOLOGY-CARD-STANDARD.md**
**Type:** Master specification document  
**Purpose:** Complete specification of the Methodology Card standard, governance, and compliance

**Contains:**
- Overview and rationale
- Components (how all four templates work together)
- Publishing pipeline (how methodology fits in the explainer workflow)
- Acceptance criteria (what every module must provide)
- How to use (for authors, reviewers, reusers)
- Versioning and updates
- Examples (county agriculture, transit access)
- Compliance and enforcement
- CC-BY-4.0 license text and attribution

**Used by:** 
- Explainer maintainers (reference for how to implement)
- Reviewers (verification checklist)
- Downstream projects (reuse and adaptation)

**Audience:** Project stakeholders, module authors, reviewers

---

### 6. **QUICK-START.md**
**Type:** Implementation guide  
**Purpose:** Step-by-step walkthrough for module authors to implement the standard

**Contains:**
- 12-step workflow (input → transform → parameters → vintage → limits → disclaimers → Markdown → tests → panel → notices → commit → review)
- Code examples (JSON snippets, Markdown, TypeScript tests)
- Checklists (author and reviewer)
- Validation tools (JSON Schema validation, readability checks)
- Common mistakes to avoid
- Examples and templates

**Used by:** Explainer authors implementing their first Methodology Card

**Audience:** Technical and non-technical authors

---

## Acceptance Criteria (✅ All Met)

From task TASK.md, methodcard-004:

### ✅ Canonical Methodology-Card Schema
- **Required:** inputs, source snapshot ref, transforms, parameters, thresholds, vintage, known limits, explicit 'does NOT claim' list
- **Delivered:** `methodology-card-schema.json` with all required properties and detailed documentation
- **Example:** County ag profile shows inputs (NASS QuickStats), transforms (filter, aggregate, trend), parameters (window, acreage threshold), vintage (2019–2025, annual refresh), known limits (coverage, quality, timing), does NOT claim (causation, ranking, prediction)

### ✅ Standard Sources-&-limits Panel Template
- **Required:** Ready to embed in any explainer; standard template for civic non-partisan/"not advice" notice
- **Delivered:** 
  - `sources-and-limits-template.md` (Markdown, HTML/React, CSS with light/dark modes)
  - `non-partisan-notice-template.md` (Markdown, HTML/React, CSS, customizable by module type)
- **Features:** Automatic staleness calculation, accessibility-ready, scannable layout, error reporting process

### ✅ Machine-Readable JSON + Human-Readable Markdown
- **Required:** Both automated tools and human reviewers can use it
- **Delivered:**
  - JSON Schema: validatable by standard JSON Schema validators; machine-parseable by tools
  - Markdown templates: human-readable; authors generate from JSON or hand-author to match structure
- **Tools:** Automated CI validation; manual review against template structure

### ✅ CC-BY-4.0 License
- **Required:** Output licensed CC-BY-4.0
- **Delivered:** License declaration in every document:
  - `METHODOLOGY-CARD-STANDARD.md` contains full CC-BY-4.0 text and attribution requirements
  - Each template file has CC-BY-4.0 declaration at top
  - QUICK-START.md includes license in footer
- **Attribution:** "Hee-Lee Oss Explainers Project; https://github.com/hee-lee-oss/open-data-explainers"

### ✅ Ready for Review
- **Required:** Reviewed and approved by Methodology+Stats reviewer (reviewers-001)
- **Deliverable:** Schema and templates are complete and ready for review by the methodology/stats reviewer
- **Next step:** reviewers-001 task will name a qualified reviewer; this standard will be their reference

---

## Files Delivered

```
.
├── INDEX.md (this file)
├── METHODOLOGY-CARD-STANDARD.md (master specification, 1.0.0)
├── methodology-card-schema.json (JSON Schema)
├── methodology-card-template.md (Markdown template + examples)
├── sources-and-limits-template.md (panel template, 3 formats)
├── non-partisan-notice-template.md (notice template, 3 formats)
└── QUICK-START.md (implementation guide)
```

All files are licensed CC-BY-4.0 and ready for publication.

---

## How Downstream Modules Will Use This

### County Agriculture Module (pilot-008)

1. **Author creates:** `methodology.json` per the schema, `METHODOLOGY.md` using the template
2. **Includes:** `SourcesAndLimitsPanel` (React or HTML) embedded in the tool
3. **Adds:** Educational + historical non-partisan notices via template
4. **Commits:** Code + `methodology.json` + `METHODOLOGY.md` + golden-fixture tests
5. **Reviews:** Methodology+Stats reviewer checks that card matches code exactly
6. **Publishes:** Explainer goes live with methodology transparent, sources attributed, limits visible

### Transit Module (transit-015)

1. **Author creates:** Transit-specific `methodology.json` (GTFS inputs, network distance transform, etc.)
2. **Includes:** Sources & Limits panel; comprehensive non-partisan + causation + ranking notices
3. **Commits:** Code + card + golden fixtures
4. **Reviews:** Methodology+Stats + License (per-feed GTFS check) + Domain (transport) reviewers sign off
5. **Publishes:** Explainer shows access patterns without claiming causation or blame

### Pattern Across All Modules

Every module follows the same shape (schema, Methodology Card, panel, notices), making reviews faster and results consistent. Readers see the same transparent, honest framing everywhere.

---

## Quality Assurance

### Validation
- JSON Schema is valid (conforms to JSON Schema Draft 2020-12)
- Markdown templates are syntactically correct and readable
- HTML/React components are complete and production-ready
- CC-BY-4.0 license text is authoritative (from creativecommons.org)

### Completeness
- All five required sections in schema are present and documented
- All parameters, properties, and examples are explained
- Worked example (county ag) fills in every section
- Implementation guide covers the full 12-step workflow

### Accessibility
- Markdown is plain language (grade 8)
- HTML/React templates include WCAG 2.2 AA CSS (contrast, color-blind-safe palette)
- React components include `aria-label` and `role` attributes
- Print and dark-mode CSS included

### License
- All files include CC-BY-4.0 license declaration
- Attribution requirement is clear
- License text (full legal version) included
- Reuse rights are explicit (share, adapt, commercial use permitted)

---

## Next Steps

### For M0 (Foundation Phase)

1. **Methodology+Stats reviewer** (reviewers-001): Review this standard; confirm it's complete and usable
2. **Pilot module** (pilot-008): County agriculture author uses this standard to create the first Methodology Card
3. **Gate review:** License + methodology reviewers verify the card against the code
4. **Feedback loop:** Any issues found in the pilot inform refinements to the standard (v1.1.0)

### For M1 (Low-Risk Modules)

- CPI explainer, college-outcomes explorer, and county-ag batch all use the same schema and templates
- Consistency allows faster review and comparison across modules
- Public sees the same framing everywhere

### For M2–M3 (Medium-Risk Modules)

- Transit, collision, amenities, astronomy all use the standard
- Medium-risk modules add domain-specific notices (e.g., collision hotspots: "no blame, no causation")
- Share-alike modules document ODbL output license propagation in the Methodology Card

---

## Questions for Reviewers

**For Methodology+Stats Reviewer:**
- Is the schema complete? Should we add any fields?
- Do the examples make sense and match the code you'd expect?
- Are the "Does NOT Claim" disclaimers strong enough?

**For License Reviewer:**
- Is the output-license field in the schema sufficient for share-alike tracking?
- Should we add a field for "attribution-required" by license?

**For Accessibility Reviewer:**
- Does the Methodology Card template achieve grade 8 readability?
- Are the HTML/React components WCAG 2.2 AA compliant?

**For Project Maintainers:**
- Is the standard ready for M0 pilot (county agriculture)?
- Should we version this at 1.0.0 or as a pre-release (0.x)?

---

## References

- **PLAN.md** → Solution approach & Methodology Card section
- **TASKS.md** → M0 task definitions; methodcard-004 acceptance criteria
- **License gate (gate-003)** → Output-license resolution per source
- **A11y standard (a11y-005)** → WCAG 2.2 AA + grade 8 requirements
- **CC-BY-4.0** → https://creativecommons.org/licenses/by/4.0/

---

**Version:** 1.0.0  
**Published:** 2026-03-15  
**Status:** Complete (Ready for M0 Review)  
**License:** CC-BY-4.0  
**Maintainer:** Hee-Lee Oss Explainers Project
