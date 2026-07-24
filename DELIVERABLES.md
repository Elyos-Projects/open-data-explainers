# Task Deliverables: Methodology Card Standard

**Task ID:** open-data-explainers-methodcard-004  
**Deliverable Type:** Design Specification + Schema + Templates  
**License:** CC-BY-4.0  
**Status:** Complete and Ready for Use  
**Date:** 2026-03-15  

---

## 🎯 Required Output

**Declared Output:** A committed Methodology Card schema (methodology-card-schema.json or equivalent) plus a Sources-&-limits + non-partisan notice template document (e.g. methodology-card-template.md), ready for use by every downstream explainer task.

**Status:** ✅ **PRODUCED AND COMMITTED**

---

## 📦 Deliverables (All Committed)

### 1. Canonical Methodology Card Schema
- **File:** `methodology-card-schema.json`
- **Type:** Machine-readable JSON Schema
- **Status:** ✅ Committed, licensed CC-BY-4.0
- **Usage:** Validates Methodology Card structure; used by CI validation and rendering tools
- **Ready for Use:** Yes — use immediately with JSON Schema validators or custom tools

**Contains (per acceptance criteria):**
- ✅ Inputs (source datasets, provenance, retrieval date, license, attribution)
- ✅ Source snapshot references (retrievalDate field)
- ✅ Transforms (documented derivations with code locations)
- ✅ Parameters (thresholds, weights, configuration)
- ✅ Vintage (data date range, refresh cadence, staleness tracking)
- ✅ Known Limits (data coverage, quality, methodology, geographic, temporal, statistical)
- ✅ Does NOT Claim (explicit disclaimers: no causation, no ranking-as-advice, no prediction, not advice)

---

### 2. Methodology Card Markdown Template
- **File:** `methodology-card-template.md`
- **Type:** Human-readable template + worked example
- **Status:** ✅ Committed, licensed CC-BY-4.0
- **Usage:** Shows how to render a Methodology Card from the JSON schema for readers; guides authors in documentation
- **Ready for Use:** Yes — authors copy this structure and fill in their module's data

**Includes:**
- Template structure for all sections (header, data sources, transforms, parameters, vintage, limits, disclaimers, reproducibility)
- Worked example: County Agriculture Profile (fully filled-out instance showing all sections)
- Guidance notes for authors

---

### 3. Sources & Limits Panel Template
- **File:** `sources-and-limits-template.md`
- **Type:** Embeddable panel template (3 formats: Markdown, HTML/React, CSS)
- **Status:** ✅ Committed, licensed CC-BY-4.0
- **Usage:** Embedded in every explainer tool, webpage, or document
- **Ready for Use:** Yes — copy-paste into your module immediately

**Includes:**
- Markdown version for documentation
- HTML/React component for web embedding (production-ready)
- Complete CSS styling (light mode, dark mode, print-friendly)
- Automatic staleness calculation based on retrieval date
- Accessibility features (WCAG 2.2 AA compliant)
- Example for county agriculture profile

---

### 4. Non-Partisan & "Not Advice" Notice Template
- **File:** `non-partisan-notice-template.md`
- **Type:** Reusable notice template (3 formats: Markdown, HTML/React, CSS)
- **Status:** ✅ Committed, licensed CC-BY-4.0
- **Usage:** Civic explainers use to frame data without advocacy or misinterpretation
- **Ready for Use:** Yes — select relevant notices for your module type and customize

**Includes:**
- Five standard notices (educational, non-partisan, no-causation, no-ranking, not-predictive)
- Markdown versions for documentation
- HTML/React components for web embedding (production-ready)
- Complete CSS styling (light mode, dark mode, print-friendly)
- Accessibility features (WCAG 2.2 AA)
- Examples for 4 explainer types (county agriculture, transit, collisions, college outcomes)
- Customization guide for authors

---

## 📋 Supporting Documentation (All Committed)

### 5. Master Specification Document
- **File:** `METHODOLOGY-CARD-STANDARD.md`
- **Type:** Complete specification and governance guide
- **Usage:** Reference for all stakeholders (authors, reviewers, reusers)
- **Includes:** Overview, components, publishing pipeline, acceptance criteria, versioning, compliance, full CC-BY-4.0 license text

### 6. Implementation Guide
- **File:** `QUICK-START.md`
- **Type:** Step-by-step workflow for module authors
- **Usage:** Guides first-time authors through creating their first Methodology Card
- **Includes:** 12-step workflow, code examples, checklists, validation tools, common mistakes, examples

### 7. Deliverables Index
- **File:** `INDEX.md`
- **Type:** Deliverables summary and usage guide
- **Usage:** Quick overview of what was produced and how to use each item
- **Includes:** File manifest, acceptance criteria verification, downstream usage patterns, QA notes

---

## ✅ Acceptance Criteria (All Met)

| Criterion | Status | Proof |
| --- | --- | --- |
| Methodology Card schema with required fields | ✅ | `methodology-card-schema.json` lines 7-14, 59-324 (inputs, transforms, parameters, vintage, knownLimits, doesNotClaim) |
| "Does NOT Claim" disclaimers | ✅ | Schema lines 290-324 (causation, ranking, prediction, advice) |
| Sources-&-limits panel template | ✅ | `sources-and-limits-template.md` (Markdown, HTML/React, CSS) |
| Non-partisan/"not advice" template | ✅ | `non-partisan-notice-template.md` (5 notice types, Markdown, HTML/React, CSS) |
| Machine-readable JSON schema | ✅ | `methodology-card-schema.json` (valid JSON Schema Draft 2020-12) |
| Human-readable Markdown rendering | ✅ | `methodology-card-template.md` (shows how to render schema as Markdown) |
| CC-BY-4.0 license | ✅ | All files include license declaration; full text in `METHODOLOGY-CARD-STANDARD.md` |
| Ready for downstream use | ✅ | See "How Downstream Modules Will Use This" below |

---

## 🚀 How Downstream Modules Will Use These Deliverables

### County Agriculture Profile (pilot-008)
1. Author creates `methodology.json` following the schema structure
2. Renders as `METHODOLOGY.md` using the Markdown template
3. Embeds `SourcesAndLimitsPanel` component (from template) in the tool
4. Adds non-partisan notices (from template) customized for agricultural data
5. Commits code + methodology card + tests
6. Methodology+Stats reviewer verifies card matches code
7. Explainer publishes with transparent, auditable methodology

### Transit Access Module (transit-015)
1. Author creates transit-specific `methodology.json` (GTFS inputs, network-distance transform)
2. Embeds Sources & Limits panel + non-partisan + causation + ranking notices
3. Commits code + card + golden fixtures
4. Multi-reviewer gate (methodology, license, domain) verifies completeness
5. Explainer launches with honest framing

### Pattern Across All Modules
Every module follows the same schema and template structure, making:
- Reviews faster and more consistent
- Comparison across modules easier
- Results trustworthy and auditable
- Public sees the same transparent, honest framing everywhere

---

## 🔐 Licensing & Attribution

All deliverables are licensed **CC-BY-4.0** (Creative Commons Attribution 4.0 International).

**How to use and adapt:**
- You may share, remix, and use commercially
- You must attribute: "Hee-Lee Oss Explainers Project" with link to https://github.com/hee-lee-oss/open-data-explainers
- Include a copy of or link to the license: https://creativecommons.org/licenses/by/4.0/
- Indicate if you modified the work

**Full license text:** See `METHODOLOGY-CARD-STANDARD.md` for complete CC-BY-4.0 legal text.

---

## ✨ Quality Assurance

- **JSON Schema:** Valid against JSON Schema Draft 2020-12 specification
- **Markdown:** Syntactically correct; renders properly as GitHub Markdown
- **HTML/React:** Production-ready components with TypeScript types (where applicable)
- **Accessibility:** WCAG 2.2 AA compliant (contrast, color-blind-safe, screen-reader tested, print-friendly)
- **Readability:** All documentation written at grade 8 level (verified with readability tools)
- **Completeness:** All required schema sections documented with examples

---

## 📊 File Manifest

```
.
├── DELIVERABLES.md (this file) ← Declaration that output was produced
├── INDEX.md ← Detailed summary of all files
├── METHODOLOGY-CARD-STANDARD.md ← Master specification (1.0.0)
├── QUICK-START.md ← Implementation guide for authors
├── methodology-card-schema.json ← JSON Schema (primary deliverable)
├── methodology-card-template.md ← Markdown template + example
├── sources-and-limits-template.md ← Panel template (3 formats)
├── non-partisan-notice-template.md ← Notice template (3 formats)
├── PLAN.md ← Project planning and architecture
├── COMPETITIVE-ANALYSIS.md ← Background research
├── TASKS.md ← Task breakdowns and dependencies
├── README.md ← Project overview
└── review/ ← Review materials directory
```

---

## 🎓 Next Steps

### For Methodology+Stats Reviewer (reviewers-001)
1. Review the schema structure and examples
2. Confirm all sections are present and correct
3. Verify the "Does NOT Claim" disclaimers are strong
4. Approve for use in M0 pilot (county agriculture)

### For Downstream Modules
1. Use `methodology-card-schema.json` as the reference template
2. Copy structure from `methodology-card-template.md` for your METHODOLOGY.md
3. Embed `SourcesAndLimitsPanel` and non-partisan notices from templates
4. Commit alongside your code and tests
5. Ready for methodology review

### For License & Compliance
- All output is CC-BY-4.0 compliant
- Attribution requirements are explicit
- Ready for downstream reuse and adaptation

---

**Status:** ✅ **COMPLETE — READY FOR PUBLICATION**  
**License:** CC-BY-4.0  
**Maintainer:** Hee-Lee Oss Explainers Project  
**Date:** 2026-03-15
