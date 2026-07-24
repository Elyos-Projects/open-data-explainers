# Methodology Card Template

**License:** CC-BY-4.0

This template shows how to render a Methodology Card from the canonical schema as human-readable Markdown. Every open-data-explainers module uses this structure so reviewers, reusers, and the public can audit how each figure was computed.

---

## Template

### Header

**Title:** [metadata.title]  
**Module:** [metadata.moduleName]  
**Version:** [metadata.version]  
**Last Updated:** [metadata.lastUpdated]  
**Authors:** [metadata.authors, comma-separated]

---

### What This Explainer Computes

[metadata.description]

---

### Data Sources

| Source | Publisher | Retrieved | Version | License |
| --- | --- | --- | --- | --- |
| [inputs[0].name] | [inputs[0].publisher] | [inputs[0].retrievalDate] | [inputs[0].datasetVersion] | [inputs[0].license] |
| [inputs[n].name] | [inputs[n].publisher] | [inputs[n].retrievalDate] | [inputs[n].datasetVersion] | [inputs[n].license] |

**Attribution:** [inputs.attribution, joined with "; "]

**Source Snapshots:** Each input was snapshotted on its retrieval date; the specific versions used are recorded above. Links to the original sources:
- [inputs[0].name]: [inputs[0].sourceUrl]
- [inputs[n].name]: [inputs[n].sourceUrl]

**License Details:** [For each input, if non-standard] [inputs[n].license]: [inputs[n].licenseUrl]

---

### How We Computed It

#### Transformations

[For each transforms[i]:]

**[transforms[i].name]**  
[transforms[i].description]

- **Input fields:** [transforms[i].inputFields, comma-separated]
- **Output fields:** [transforms[i].outputFields, comma-separated]
- **Normalisation:** [transforms[i].normalisation]
- **Code:** [transforms[i].codeLocation]

---

#### Parameters & Thresholds

The following choices and thresholds were applied:

[For each parameters entry:]

| Parameter | Value | Unit | Rationale |
| --- | --- | --- | --- |
| [parameter name] | [value] | [unit] | [rationale] |

---

### Data Coverage

- **Time period:** [vintage.dataStartDate] to [vintage.dataEndDate]
- **Currency:** [vintage.currency]
- **Refresh cadence:** [vintage.refreshCadence]
- **Staleness alert:** Data is flagged as stale [vintage.staleness.staleAfterDays] days after the end date; outdated after [vintage.staleness.outdatedAfterDays] days.

---

### Known Limits & Caveats

Every dataset and derivation has limits. Here are ours:

[For each knownLimits[i]:]

**[knownLimits[i].category]:** [knownLimits[i].description]

- **Impact:** [knownLimits[i].impact]
- **Mitigation:** [knownLimits[i].mitigation]

---

### What This Explainer Does NOT Claim

**No Causation:** [doesNotClaim.causation]

**No Ranking as Advice:** [doesNotClaim.ranking]

**No Predictions:** [doesNotClaim.prediction]

**Not Personal Advice:** [doesNotClaim.advice]

[If doesNotClaim.other is present:]

**Other Disclaimers:**
- [doesNotClaim.other[0]]
- [doesNotClaim.other[n]]

---

### Reproducibility

To verify these results:

- **Code repository:** [reproducibility.codeRepository]
- **Commit:** [reproducibility.codeCommit]
- **Golden-fixture tests:** [reproducibility.testHarness]
- **Build:** [reproducibility.buildInstructions]

---

## Example: County Agriculture Profiles

### Header

**Title:** County Agriculture Profile — [County]  
**Module:** county-ag-profiles  
**Version:** 1.0.0  
**Last Updated:** 2026-03-15T18:30:00Z  
**Authors:** Hee-Lee Oss Explainers Team

---

### What This Explainer Computes

A plain-language profile of agricultural activity in [County] using USDA NASS QuickStats data: major crops, livestock operations, and trends over the past 5 years. Designed for educators, extension offices, and community groups.

---

### Data Sources

| Source | Publisher | Retrieved | Version | License |
| --- | --- | --- | --- | --- |
| USDA NASS QuickStats | United States Department of Agriculture | 2026-03-01 | 2024 Census + 2023–2025 preliminary | CC0-1.0 (public domain) |

**Attribution:** "Data from the USDA National Agricultural Statistics Service (NASS), QuickStats database."

**Source:** [https://quickstats.nass.usda.gov](https://quickstats.nass.usda.gov)

**License:** [https://www.usda.gov/](https://www.usda.gov/) — Public domain (US Government work)

---

### How We Computed It

#### Transformations

**Filter by county and state**  
Selected all QuickStats records for [County], [State], across all years in the data.

- **Input fields:** State, County, Data Item, Year, Value
- **Output fields:** Crop, Year, Acres, Quantity
- **Code:** `src/derive.ts#L45-L70`

**Aggregate by commodity**  
Grouped acreage and production by major commodity categories (grains, vegetables, livestock, dairy).

- **Input fields:** Crop, Acres, Quantity, Year
- **Output fields:** Commodity, TotalAcres, AverageProduction
- **Normalisation:** Per-county totals (not per-capita; county is the geographic unit)
- **Code:** `src/derive.ts#L72-L120`

**Compute 5-year trend**  
For each commodity, calculated the trend (linear regression slope) over 2019–2024.

- **Input fields:** Commodity, Year, Acres
- **Output fields:** Commodity, Trend (acres/year)
- **Code:** `src/derive.ts#L122-L145`

---

#### Parameters & Thresholds

| Parameter | Value | Unit | Rationale |
| --- | --- | --- | --- |
| Trend window | 5 years | years | Balances short-term fluctuation and long-term signal |
| Minimum acreage for display | 50 | acres | Suppresses very small operations to avoid spurious noise |
| Commodity grouping | USDA category | — | Uses official classification; easier for farmers to recognise |

---

### Data Coverage

- **Time period:** 2019-01-01 to 2025-12-31
- **Currency:** Preliminary data for 2024–2025; final data for 2019–2023
- **Refresh cadence:** Annual (typically released in March)
- **Staleness alert:** Data is flagged as stale 12 months after the end date; outdated after 18 months.

---

### Known Limits & Caveats

**Data coverage:** NASS QuickStats includes data for farms above a certain acreage threshold. Very small household/hobby farms may not be included.

- **Impact:** If a county has a large community-garden or small-farm movement, it won't show in these figures.
- **Mitigation:** The profile notes that QuickStats is designed for commercial agriculture; community groups are encouraged to add local data via supplementary notes.

**Data quality:** Some categories (especially preliminary years) are published with suppression flags ('S') where cell counts are too small to report.

- **Impact:** We omit 'S' values from our calculations, so trend lines may be incomplete for small commodities.
- **Mitigation:** We flag suppressed records in the output data; users can see which commodities are affected.

**Timing of reporting:** NASS releases annual data in the year following the reporting year, so current-year data are preliminary and may be revised.

- **Impact:** The most recent year's figures are subject to revision.
- **Mitigation:** We show a vintage badge and update annually.

---

### What This Explainer Does NOT Claim

**No Causation:** The trends we show are associations in time, not causes. If corn acreage declined, we don't know why—it could be market prices, weather, soil change, farmer preference, or a data artifact. We're not claiming any causal link.

**No Ranking as Advice:** We don't rank crops or livestock as "better" or "worse" than others, and we don't suggest which farming practices a county should adopt. This is a factual profile, not a recommendation.

**No Predictions:** We show historical trends, not forecasts. A 5-year decline doesn't mean the decline will continue; agriculture is driven by many factors we aren't predicting here.

**Not Personal Advice:** This explainer is educational. It's not financial, agronomic, or business advice. Farmers, extension offices, and policymakers use these figures as background; decisions must be made by those with local expertise and full knowledge of their circumstances.

**Other Disclaimers:**
- We do not make claims about environmental impact, sustainability, or "best practices."
- We do not identify or profile individual farms.

---

### Reproducibility

To verify these results:

- **Code repository:** https://github.com/hee-lee-oss/open-data-explainers
- **Commit:** `a7c4d2e` (main branch, as of 2026-03-15)
- **Golden-fixture tests:** `packages/county-ag/test/golden.test.ts`
- **Build:** `pnpm install && cd packages/county-ag && pnpm build && pnpm test`

---

## Notes for Authors

1. **Plain language:** Use this template to make methodology transparent, not buried. Assume readers have no statistics training.
2. **Traceability:** Every number in the explainer should trace back to a transform in this card.
3. **Limits first:** Don't hide caveats in footnotes. "Known Limits" is a main section.
4. **Disclaimers are not apologies:** The "Does NOT Claim" section isn't saying "this is bad"; it's saying "here's exactly what we're not attempting."
5. **Machine-readable schema:** This template is rendered from the JSON schema above. Tools can parse the JSON and verify that code, parameters, and card match.
6. **Update on change:** If a parameter changes or a new transform is added, update the Methodology Card and commit it alongside the code.
