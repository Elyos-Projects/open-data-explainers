# Corrections Process · open-data-explainers

> **License:** CC-BY-4.0 · **Status:** Active · **Last updated:** 2026-07-24

When you find an error in an open-data-explainers publication — a wrong figure, stale data, misleading framing, or a broken link — we want to know and fix it. This document describes how to report an error, how we triage it, who fixes it, and how you can track the fix.

## How to report an error

### GitHub Issues (recommended for technical issues)
Open a [GitHub issue](https://github.com/Hee-Lee-Oss-Projects/open-data-explainers/issues) with the label `correction`. Include:
- **Which explainer** (name and link)
- **What's wrong** (the incorrect claim, figure, or data point)
- **Why it's wrong** (cite a source, explain the error)
- **When you noticed it** (date if relevant; helps us spot data-staleness issues)

**Expected response:** We will acknowledge your report within 5 business days. If we need clarification, we'll comment in the issue.

### Email
Email corrections@open-data-explainers.org with the same information above (if this address is not yet live, use the GitHub issue instead).

**Expected response:** Within 5 business days.

### Direct contact
If you know the explainer's domain expert (listed in the explainer's Methodology Card), you can contact them directly. They will log the issue and follow this process.

---

## How we triage corrections

When a correction report arrives, the triage process is:

1. **Acknowledge** (within 1 business day)  
   We confirm receipt and assign a severity level (see below).

2. **Verify the claim** (within 3 business days)  
   We check the source data, the derivation code, and the published explainer against the reported error.  
   - **Confirmed:** The error is real.
   - **Disputed:** We found a different interpretation; we will explain why in the issue.
   - **Unclear:** We need more information from you.

3. **Classify severity** (see table below)

4. **Assign ownership** (within 1 business day)  
   The domain expert for that explainer (named in the Methodology Card) takes ownership.

### Severity levels

| Level | Definition | Example | Fix target |
|-------|-----------|---------|-----------|
| **Critical** | The error materially misleads readers on a high-stakes decision (college choice, health/safety, civic policy). | Wrong graduation rate for a college; a collision hotspot mislabeled by an order of magnitude. | Fix live within 2 business days; publish a correction notice. |
| **High** | The error is factually wrong and undermines trust, but does not create direct harm. | Stale data that is clearly dated; a broken link to a source; a typo in a label. | Fix live within 5 business days; log in changelog. |
| **Medium** | The error is minor, affects comprehension but not action: a small computational mistake (rounding artefact), a confusing label, a missing caveat. | "0.3 km" instead of "300 m"; a category that is underexplained. | Fix on next maintenance cycle (within 30 days); log in changelog. |
| **Low** | The error is cosmetic or a clarification that doesn't change the substance. | A typo in a sentence; a suggestion to reword an explanation. | Consider on next maintenance cycle; log if applied. |

---

## Who fixes it

- **Explainer domain expert:** Owns the diagnosis, fix, and changelog entry. (Named in each explainer's Methodology Card.)
- **Maintainer:** Merges the fix, publishes the update, and ensures the changelog is recorded.
- **License/data-gate reviewer:** If the error involves a licensing or source-data decision, reviews and confirms the fix.

For critical issues, all three may need to coordinate. The domain expert remains the point of contact.

---

## How we fix corrections

1. **Create a branch** from `main` with a name like `corrections/explainer-name-short-description`.
2. **Fix the error** in the explainer's code, data, or documentation.
3. **Rerun tests** to confirm the derivation is still valid and the fix does not break other modules.
4. **Update the changelog** (see *Changelog convention* below).
5. **Open a PR** that references the correction issue (e.g., "Fixes #123").
6. **Domain expert + maintainer review** before merge.
7. **Publish the fix** to the live explainer.

---

## Changelog convention

Each explainer records its correction history in a **CHANGELOG.md** file in its directory. This is a public record of what has changed and why.

### Format

```markdown
# Changelog · [Explainer Name]

> Per-explainer revision history. See [CORRECTIONS.md](../../CORRECTIONS.md) for the public corrections process.

## [Version/Date]

### Corrections
- **[Date]** — [Severity] — [Short description]. [Source/issue link if public].
  - *Reason:* [one sentence on what was wrong and why it matters]
  - *Impact:* [brief note on what changed; e.g., "figures updated," "link fixed," "caveat added"]

### Maintenance & refreshes
- **[Date]** — [Data refresh / methodology update / dependency bump] — [one-line description].
  - *Reason:* [why this was needed]
  - *Impact:* [what changed]

### Notes
- [Any non-operational change worth tracking; e.g., "switched data source from X to Y," "accessibility audit pass"]

---

## Examples

### Simple correction

```markdown
## 2026-07-24

### Corrections
- **2026-07-24** — High — Fixed broken link to GTFS specification.
  - *Reason:* Link pointed to a 404 page after transit agency moved their documentation.
  - *Impact:* Readers can now access the source.

### Maintenance & refreshes
- N/A

### Notes
- None
```

### Critical correction with data impact

```markdown
## 2026-07-15

### Corrections
- **2026-07-15** — Critical — Corrected transit-access percentile calculation for [Region Name].
  - *Reason:* Derivation script was using the wrong distance threshold (3 km instead of 800 m); this overstated accessibility by ~15%.
  - *Impact:* Transit-access percentile values recalculated for all regions in this explainer. See [derivation commit hash] for details.
  - *Verification:* Checked against GTFS feeds for 3 regions manually; recalculation verified by [name].

### Maintenance & refreshes
- N/A

### Notes
- None
```

### Multi-change update

```markdown
## 2026-06-30

### Corrections
- **2026-06-30** — Medium — Added missing caveat about aggregation threshold (k≥5) in the STATS19 collision data.
  - *Reason:* Readers were not aware that very small areas were excluded from analysis.
  - *Impact:* A note now appears in the "Sources & limits" section.

### Maintenance & refreshes
- **2026-06-30** — Refreshed to June 2026 GTFS data.
  - *Reason:* New transit routes added in [Region]; data was 2 months stale.
  - *Impact:* Refresh cycle reset; next refresh due 2026-12-30.

### Notes
- Accessibility audit pass (WCAG 2.2 AA); no changes needed.
```

---

## Transparency and trust

- **All corrections are public.** The changelog is part of the published explainer, visible to anyone.
- **Corrections include reasoning.** We explain *why* something was wrong, not just that it was fixed, so readers can judge severity.
- **Severity is explicit.** A cosmetic fix is not presented the same way as a critical data correction.
- **Fixes are reversible and traceable.** Every correction is in git, linked to a GitHub issue, and citable.
- **We do not retroactively hide errors.** Once published, corrections stay in the changelog with their date and rationale.

---

## For explainer authors and domain experts

When you ship an explainer:

1. **Create a CHANGELOG.md** in your explainer's directory with a header and "Initial release" note (or leave it empty; the first correction entry will create it).
2. **Include the link** to this CORRECTIONS.md process in your explainer's documentation or README.
3. **Publicize how to report** (e.g., in a "Found an error?" section, or in the Methodology Card).
4. **Monitor GitHub issues** and email (once live) for reports.
5. **Keep the changelog current.** Update it as fixes land.

---

## For maintainers

- **Ensure every explainer has a CHANGELOG.md** or a tracking issue if one is missing.
- **Monitor the `correction` label** on GitHub issues.
- **Coordinate with domain experts** on triaging, fixing, and publishing.
- **Check that live explainers match their latest published changelog.**
- **Archive old versions** and their corrections (if a major revision happens) so readers can see what changed.

---

## FAQ

**What if I disagree with a correction report?**  
We'll comment in the issue explaining our interpretation. If you think we're wrong, reply in the issue or ask the domain expert to clarify. This is how we improve.

**How long until my reported error is fixed?**  
Depends on severity (see the table above). Critical issues are fixed within 2 days; high-severity within 5 days; medium within 30 days. We'll update you in the GitHub issue.

**What if I report an error and never hear back?**  
This is a bug in our process. Please ping us again or reach out to the maintainer listed in the README.

**Can I submit corrections via a pull request?**  
Yes! Open an issue first so we can triage it and assign an owner, then open a PR that fixes it. Link the PR to the issue.

**What if a data source itself has an error (not our derivation)?**  
We'll document this in the "Sources & limits" section and note it in the changelog. The source error stays in our changelog as context for readers.

**How do I know if an explainer is outdated?**  
Each explainer includes a "data vintage" date and a refresh cadence (e.g., "refreshed monthly"). Check the explainer's opening section or Methodology Card.

---

## Contacts

- **GitHub issues:** [github.com/Hee-Lee-Oss-Projects/open-data-explainers/issues](https://github.com/Hee-Lee-Oss-Projects/open-data-explainers/issues)
- **Email:** corrections@open-data-explainers.org (when live)
- **Project maintainer:** See [README.md](./README.md) for contact.

---

**This document is licensed CC-BY-4.0.** Feel free to adapt it for your own data projects. Please cite this version and the Hee-Lee Oss project when you do.
