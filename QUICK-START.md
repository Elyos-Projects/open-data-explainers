# Quick-Start Guide: Using the Methodology Card Standard

**License:** CC-BY-4.0  
**For:** Explainer authors and module maintainers  
**Time to read:** 5 minutes

---

## TL;DR

1. Create a `methodology.json` file following the schema in `methodology-card-schema.json`.
2. Generate a `METHODOLOGY.md` rendering it as human-readable text (use the template in `methodology-card-template.md` as a guide).
3. Embed the Sources & Limits panel (copy HTML/React from `sources-and-limits-template.md`) prominently in your explainer.
4. Include non-partisan notices (if your module is civic; see `non-partisan-notice-template.md`).
5. Have the methodology/stats reviewer verify the card matches your code.
6. Commit both JSON and Markdown alongside your code.
7. Include the CC-BY-4.0 license in your output.

---

## Step-by-Step Workflow

### Step 1: Identify Your Inputs

List every dataset you use:

```json
"inputs": [
  {
    "name": "USDA NASS QuickStats",
    "publisher": "United States Department of Agriculture",
    "sourceUrl": "https://quickstats.nass.usda.gov",
    "retrievalDate": "2026-03-01",
    "datasetVersion": "2024 Census + 2023-2025 preliminary",
    "license": "CC0-1.0",
    "licenseUrl": "https://www.usda.gov/",
    "attribution": "Data from the USDA National Agricultural Statistics Service (NASS), QuickStats database."
  }
]
```

**Key fields:**
- `retrievalDate`: When you downloaded / accessed the data (YYYY-MM-DD).
- `license`: SPDX identifier (e.g., `CC0-1.0`, `OGL-3.0`, `ODbL-1.0`). See [spdx.org/licenses](https://spdx.org/licenses).
- `attribution`: The exact string you must include whenever publishing this data.

### Step 2: Document Your Transforms

For each major processing step, record:

```json
"transforms": [
  {
    "name": "Filter by county",
    "description": "Selected all NASS QuickStats records for the target county and state.",
    "codeLocation": "src/derive.ts#L42-L68",
    "inputFields": ["State", "County", "CropName"],
    "outputFields": ["CropName", "Acres", "Production"]
  },
  {
    "name": "Aggregate by commodity",
    "description": "Grouped crops into commodity categories (grains, vegetables, etc.) and summed acreage and production by year.",
    "codeLocation": "src/derive.ts#L70-L120",
    "inputFields": ["CropName", "Acres", "Production", "Year"],
    "outputFields": ["Commodity", "TotalAcres", "TotalProduction", "Year"],
    "normalisation": "County totals (not per-capita)"
  }
]
```

**Key fields:**
- `codeLocation`: Exact file path(s) and line numbers in your repo.
- `normalisation`: How you're expressing the data (per-capita, rate-per-100k, percentage, totals, etc.).

### Step 3: List Your Parameters

Record every threshold and configuration choice:

```json
"parameters": {
  "trendWindow": {
    "value": 5,
    "unit": "years",
    "description": "Number of years to compute the linear trend over.",
    "rationale": "Balances short-term fluctuation and long-term signal; aligns with USDA reporting intervals."
  },
  "minimumAcreageForDisplay": {
    "value": 50,
    "unit": "acres",
    "description": "Smallest acreage we report; smaller operations omitted.",
    "rationale": "Reduces spurious noise from very small farms; commonly used threshold in agricultural statistics."
  }
}
```

**Include everything that a reader needs to understand to trust the results.**

### Step 4: Set the Data Vintage

Record when your data start and end:

```json
"vintage": {
  "dataStartDate": "2019-01-01",
  "dataEndDate": "2025-12-31",
  "currency": "Preliminary data for 2024–2025; final data for 2019–2023",
  "refreshCadence": "Annual (typically each March)",
  "staleness": {
    "staleAfterDays": 365,
    "outdatedAfterDays": 540
  }
}
```

**Staleness thresholds:** Help tools automatically flag when your explainer needs updating.

### Step 5: List Known Limits

Be exhaustively honest about what can go wrong:

```json
"knownLimits": [
  {
    "category": "data-coverage",
    "description": "NASS QuickStats only includes farms above a certain acreage threshold.",
    "impact": "Small household farms, community gardens, and hobby operations are not captured.",
    "mitigation": "We clearly state that figures represent commercial agriculture; community groups are encouraged to provide supplementary data."
  },
  {
    "category": "data-quality",
    "description": "Some categories are published with suppression flags ('S') where cell counts are too small.",
    "impact": "Trend lines may be incomplete for small commodities; we cannot compute trends from suppressed data.",
    "mitigation": "We flag all suppressed records in the output; users can see which commodities are affected."
  },
  {
    "category": "temporal",
    "description": "Most recent year's data are preliminary and subject to revision.",
    "impact": "Year-over-year figures for the most recent year may change when final data are published.",
    "mitigation": "We display a vintage badge showing preliminary vs. final; we re-compute annually."
  }
]
```

**Tip:** Think like a critic: what could mislead someone using this data?

### Step 6: Write the "Does NOT Claim" Section

Explicitly state what you're *not* claiming:

```json
"doesNotClaim": {
  "causation": "These are observational data showing trends over time. We show correlation (acreage changing), not causation (why it changed). Agricultural trends result from market prices, policy, weather, soil, farmer decisions, and many other factors we are not measuring.",
  "ranking": "We do not rank crops or livestock as 'better' or 'worse.' We do not recommend which farming practices the county should adopt.",
  "prediction": "We show historical trends (2019–2025), not forecasts. A multi-year trend does not mean it will continue; agriculture is driven by many factors outside our data.",
  "advice": "This is educational information about agricultural patterns. Farmers, extension offices, and policymakers use these figures as background; decisions must be made by people with local expertise and full knowledge of their circumstances."
}
```

**This is not apology—it's precision.** You're saying exactly what you are *not* attempting, so readers use the data appropriately.

### Step 7: Render as Markdown

Use the template in `methodology-card-template.md` to create a human-readable `METHODOLOGY.md`:

```markdown
# Methodology Card — County Agriculture Profile

**Title:** County Agriculture Profile  
**Module:** county-ag-profiles  
**Version:** 1.0.0  
**Last Updated:** 2026-03-15  
**Authors:** Hee-Lee Oss Explainers Team

## What This Explainer Computes

A plain-language profile of agricultural activity in a county, using USDA NASS QuickStats data. Shows major crops, livestock, and trends over 5 years.

## Data Sources

| Source | Publisher | Retrieved | License |
| --- | --- | --- | --- |
| NASS QuickStats | USDA | 2026-03-01 | CC0-1.0 |

**Attribution:** Data from the USDA National Agricultural Statistics Service (NASS), QuickStats database.

[... continue with template sections ...]
```

### Step 8: Create the Golden-Fixture Test

Write a test that verifies reproducibility:

```typescript
// test/golden.test.ts
import { derive } from '../src/derive';
import { sourceSnapshot } from '../test/fixtures/nass-snapshot-2026-03-01.json';

test('county-ag-profiles computes expected figures from source snapshot', async () => {
  const result = await derive(sourceSnapshot, {
    trendWindow: 5,
    minimumAcreageForDisplay: 50,
  });

  expect(result.commodities).toHaveLength(12);
  expect(result.commodities[0]).toEqual({
    name: 'Corn',
    acres2024: 45230,
    acres2025: 44998,
    trend: -232, // acres/year (downward)
  });
});
```

**This test verifies:** If someone runs the same code on the same source snapshot, they get the same numbers.

### Step 9: Embed Sources & Limits

Copy the panel template into your explainer (HTML, React, or Markdown):

```jsx
<SourcesAndLimitsPanel
  explainerName="County Agriculture Profile"
  sources={[{
    name: "NASS QuickStats",
    publisher: "USDA",
    retrievalDate: "2026-03-01",
    license: "CC0-1.0"
  }]}
  coverage="NASS data are limited to farms above the agency's reporting threshold..."
  quality="Some categories are suppressed where cell counts are small..."
  methodology="Data are aggregated to the county level; we do not show sub-county results..."
  temporal="Most recent years are preliminary and subject to revision..."
  geographic="County-level aggregation only..."
  causal="Trends show acreage changing over time, but don't explain why..."
  dataStartDate="2019-01-01"
  dataEndDate="2025-12-31"
  retrievalDate="2026-03-01"
  refreshCadence="Annual (March)"
  contactEmail="contact@example.org"
  githubUrl="https://github.com/example/issues"
/>
```

### Step 10: Add Non-Partisan Notices (If Civic)

If your module is civic (transit, collision, college, amenities), add notices:

```jsx
<NonPartisanNotice
  explainerType="educational"
  topic="agricultural activity in the county"
  showAdviceWarning={true}
  showHistoricalWarning={true}
/>
```

This adds an "educational, not advice" notice and a "historical, not predictive" notice. See `non-partisan-notice-template.md` for customization.

### Step 11: Commit

Commit your methodology and code together:

```bash
git add src/derive.ts methodology.json METHODOLOGY.md test/golden.test.ts
git commit -m "feat: county-ag-profiles with Methodology Card

- Implement NASS QuickStats derivation (filter, aggregate, trend)
- Define Methodology Card (schema conforming, JSON + rendered Markdown)
- Add golden-fixture tests; figures reproducible in CI
- Include Sources & Limits and non-partisan notices
- Output licensed CC-BY-4.0

Signed-off-by: Author Name <email@example.org>"
```

### Step 12: Request Review

Create a PR and request review from:

1. **Methodology + Statistics reviewer:** Verify the card matches the code and tests.
2. **License reviewer:** Confirm output license is correct and attribution is present.
3. **Accessibility reviewer:** Check the Methodology Card and notices for WCAG 2.2 AA + grade 8 readability.

---

## Checklists

### Author Checklist

- [ ] `methodology.json` conforms to the schema (validate: `npx ajv validate -s methodology-card-schema.json -d methodology.json`)
- [ ] `METHODOLOGY.md` renders the JSON in plain language following the template
- [ ] Every parameter in the code is documented in `parameters`
- [ ] Every transformation step is documented in `transforms` with code locations
- [ ] `knownLimits` includes data coverage, quality, methodology, geographic, temporal, and statistical caveats
- [ ] `doesNotClaim` is comprehensive and truthful
- [ ] `reproducibility` section has code repository, commit hash, and test harness
- [ ] Sources & Limits panel is embedded and populated
- [ ] Non-partisan notices (if civic) are included and customized for your topic
- [ ] All text is grade 8 reading level (test with Flesch-Kincaid or similar)
- [ ] `retrievalDate` is accurate (don't guess)
- [ ] `attribution` string is exactly what the license requires
- [ ] Golden-fixture tests pass in CI

### Reviewer Checklist

**Methodology + Statistics Reviewer:**
- [ ] The card's `transforms` match the committed code exactly
- [ ] Every `parameters` value is justified and appears in the code
- [ ] `knownLimits` are comprehensive and honest
- [ ] `doesNotClaim` is truthful and comprehensive
- [ ] Golden-fixture test passes; figures regenerate within tolerance
- [ ] No causation claims; no "best/worst" rankings; no predictions

**License Reviewer:**
- [ ] Each `inputs[i]` has a complete license record (id, URL, attribution)
- [ ] Output license is correctly resolved (share-alike propagated if needed)
- [ ] Attribution strings are present and accurate
- [ ] No causation or advice language; non-partisan notices present (if civic)

**Accessibility Reviewer:**
- [ ] Methodology Card and notices are WCAG 2.2 AA (color, contrast, keyboard, alt text)
- [ ] Flesch-Kincaid score ≤ 8 (or pass manual grade 8 readability check)
- [ ] Tested with screen reader

---

## Validation & Tools

### JSON Schema Validation

Validate your `methodology.json` against the schema:

```bash
npm install ajv-cli

ajv validate \
  -s methodology-card-schema.json \
  -d methodology.json
```

Or use an online validator: [ajv.js.org](https://ajv.js.org/)

### Readability Check

Check your Markdown for grade-level:

```bash
# Using flesch-kincaid CLI (if installed)
flesch-kincaid METHODOLOGY.md

# Or use an online tool: https://readability-score.com/
```

### Schema Visualization

If you want to inspect the schema visually, use:
- [JSON Schema Viewer](https://json-schema.org/understanding-json-schema/)
- [Schema Visualizer](https://github.com/mohsen1/json-schema-viewer)

---

## Examples & Templates

- **County agriculture:** See `methodology-card-template.md` for a complete worked example.
- **Sources & Limits:** Copy from `sources-and-limits-template.md` (Markdown, HTML, or React).
- **Non-partisan notices:** Customize from `non-partisan-notice-template.md` by module type.

---

## Common Mistakes (Avoid These)

❌ **Vague limits:** "Data quality varies" → ✅ "NASS suppresses counts below 50; we omit suppressed records."

❌ **Implicit parameters:** "We filtered the data" → ✅ "Minimum acreage threshold: 50 acres (line 45 of src/derive.ts)"

❌ **Claiming causation:** "Areas with transit gaps have lower walkability" → ✅ "These areas show lower transit access as measured by [metric]"

❌ **Advice language:** "You should move to a place with good transit" → ✅ "This tool shows which areas have transit stops within walking distance"

❌ **Hiding disclaimers:** Putting them in a footnote → ✅ Including them prominently in the Sources & Limits panel and non-partisan notice

❌ **Stale data without flagging:** Showing 2024 data in 2026 → ✅ Including a currency badge showing the data date and refresh cadence

---

## Getting Help

- **Questions about the schema?** See `METHODOLOGY-CARD-STANDARD.md`.
- **How to render the template?** See `methodology-card-template.md`.
- **Need the panel code?** Copy from `sources-and-limits-template.md` or `non-partisan-notice-template.md`.
- **Report issues or feedback:** Open a GitHub issue or email the project.

---

**Version:** 1.0.0  
**Status:** Ready for use  
**License:** CC-BY-4.0
