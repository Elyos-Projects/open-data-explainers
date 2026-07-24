# Methodology Card Template

**License:** CC-BY-4.0

This is the **complete, unified template** for documenting open-data-explainers modules. It combines three components:
1. **Methodology Card** — how the data was computed
2. **Sources & Limits Panel** — where the data came from and what limits apply
3. **Non-Partisan/"Not Advice" Notice** — how to correctly interpret and use the data

Every open-data-explainers module uses this structure so reviewers, reusers, and the public can audit how each figure was computed and understand its scope.

---

## Full Template (Combined Structure)

### Part 1: Non-Partisan / "Not Advice" Notice

Place this **at the very top** of the explainer so users understand its frame before engaging with any data.

#### Notice 1: Educational, Not Advice (Use for all explainers)

```markdown
## ⓘ This is educational information, not advice

This explainer presents factual, sourced data about [TOPIC: e.g., transit service, college costs, agricultural activity]. It is designed for **learning, research, and public understanding**.

**It is not:**
- Financial advice
- Career advice
- Housing or relocation advice
- Medical or health advice
- Legal advice
- Policy recommendations

**You are responsible for:** making decisions based on your own circumstances, values, and expert advice from qualified professionals (financial advisors, counselors, lawyers, medical professionals, etc.).

If you are making an important life decision (where to live, which college to attend, what to invest in, career planning), please consult with a qualified professional in addition to reading this data.
```

#### Notice 2: Non-Partisan Frame (Use for civic/policy-related explainers)

```markdown
## ⚖️ This is non-partisan, factual information

This explainer presents **verified, sourced data** about [TOPIC] in a **non-partisan frame**. It is not advocating for or against any political position, policy, party, or candidate.

**What we do:**
- Present data from authoritative, independent sources (government agencies, academic research, open datasets)
- Show what the data says, honestly, including what we don't know
- Acknowledge limitations and caveats
- Use plain language so you can understand and verify the facts

**What we don't do:**
- Make policy recommendations ("the government should...")
- Rank places or institutions as "best" or "worst"
- Advocate for a particular position
- Present correlations as causation ("X causes Y")
- Frame data to support a political argument

**How to use it:** This information is a **starting point for your own thinking**. You may draw different conclusions depending on your values, priorities, and what other information you consider. That's healthy democratic disagreement—it's not a flaw in the data.
```

#### Notice 3: Correlation ≠ Causation (Use for pattern/hotspot analyses)

```markdown
## 📊 Correlation is not causation. Patterns don't explain themselves

This explainer shows **what the data reveal: patterns, trends, and geographic concentrations**. It does **not explain why** those patterns exist.

**For example:**
- If we show that a particular area has more [incidents/gaps/outcomes], we are **not saying** the area is at fault or deficient.
- If we show a trend, we are **not claiming** it will continue or that any single factor caused it.
- If we show an association (A and B vary together), we are **not claiming** A caused B or vice versa.

**Why?** Real-world patterns have complex causes: policy decisions, funding, historical factors, reporting practices, and many things we can't measure. A pattern in data is a starting point for *investigation*, not an answer.

**Your role:** If you see a pattern that interests you, ask: "Why might this be?" and seek expert perspectives and deeper research before drawing conclusions.
```

#### Notice 4: Not A Ranking (Use for comparative explainers)

```markdown
## ★ This is not a ranking. There is no "best"

This explainer lets you **explore and compare** data about [TOPIC]. It is **not a ranking** of better or worse.

**Why not?** Because "best" depends on what matters to *you*:
- For colleges: lowest cost, highest grad rate, best for your major, best student life, best financial aid—only you know your priorities.
- For transit: fastest, most frequent, most accessible, cheapest, or most reliable—your needs are unique.
- For neighborhoods: most walkable, safest, most affordable, most diverse, best schools, closest to work—your definition matters.

**How to use it:** Use the data to explore what fits *your* situation. Don't use it to argue that one place is objectively "best."
```

#### Notice 5: Historical Data, Not Predictions (Use for trend-based explainers)

```markdown
## ⏱ These data show the past, not the future

This explainer presents **historical data and trends**. It does **not predict** what will happen next.

**Important:**
- Trends can continue, plateau, reverse, or accelerate unexpectedly
- Historical patterns don't guarantee future patterns
- Major events (policy changes, economic shifts, disasters) can break a trend overnight

**Do not use as a forecast.** If you need to predict the future, consult forecasting expertise, not just historical trends.
```

---

### Part 2: Methodology Card (Data & Computation)

#### Header

**Title:** [metadata.title]  
**Module:** [metadata.moduleName]  
**Version:** [metadata.version]  
**Last Updated:** [metadata.lastUpdated]  
**Authors:** [metadata.authors, comma-separated]

---

#### What This Explainer Computes

[metadata.description]

---

#### Data Sources

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

#### How We Computed It

##### Transformations

[For each transforms[i]:]

**[transforms[i].name]**  
[transforms[i].description]

- **Input fields:** [transforms[i].inputFields, comma-separated]
- **Output fields:** [transforms[i].outputFields, comma-separated]
- **Normalisation:** [transforms[i].normalisation]
- **Code:** [transforms[i].codeLocation]

---

##### Parameters & Thresholds

The following choices and thresholds were applied:

[For each parameters entry:]

| Parameter | Value | Unit | Rationale |
| --- | --- | --- | --- |
| [parameter name] | [value] | [unit] | [rationale] |

---

#### Data Coverage

- **Time period:** [vintage.dataStartDate] to [vintage.dataEndDate]
- **Currency:** [vintage.currency]
- **Refresh cadence:** [vintage.refreshCadence]
- **Staleness alert:** Data is flagged as stale [vintage.staleness.staleAfterDays] days after the end date; outdated after [vintage.staleness.outdatedAfterDays] days.

---

#### Known Limits & Caveats

Every dataset and derivation has limits. Here are ours:

[For each knownLimits[i]:]

**[knownLimits[i].category]:** [knownLimits[i].description]

- **Impact:** [knownLimits[i].impact]
- **Mitigation:** [knownLimits[i].mitigation]

---

#### What This Explainer Does NOT Claim

**No Causation:** [doesNotClaim.causation]

**No Ranking as Advice:** [doesNotClaim.ranking]

**No Predictions:** [doesNotClaim.prediction]

**Not Personal Advice:** [doesNotClaim.advice]

[If doesNotClaim.other is present:]

**Other Disclaimers:**
- [doesNotClaim.other[0]]
- [doesNotClaim.other[n]]

---

#### Reproducibility

To verify these results:

- **Code repository:** [reproducibility.codeRepository]
- **Commit:** [reproducibility.codeCommit]
- **Golden-fixture tests:** [reproducibility.testHarness]
- **Build:** [reproducibility.buildInstructions]

---

### Part 3: Sources & Limits Panel

Place this **after the Methodology Card** so readers understand data provenance and constraints in context.

#### Where This Data Comes From

[EXPLAINER_NAME] is computed from the following open datasets:

| Dataset | Publisher | Retrieved | License |
| --- | --- | --- | --- |
| [SOURCE_NAME] | [PUBLISHER] | [DATE] | [LICENSE_ID] |

**How to cite:** [CITATION_STRING]

**Original source:** [SOURCE_URL]

**Note:** We use a snapshot of the data from [RETRIEVAL_DATE]. If the original source has been updated since then, our figures won't reflect those changes until we refresh (typically [REFRESH_CADENCE]).

---

#### What You Should Know Before Using These Figures

This explainer has real limits. Please read these before sharing or acting on any findings.

**Missing data:** [COVERAGE_LIMITATION]

Example: "GTFS feeds are published by transit agencies; we can only show you places where an agency publishes. Rural transit systems that don't publish GTFS won't appear."

**Data quality:** [QUALITY_LIMITATION]

Example: "Records come from administrative sources. Some incidents are not reported, and reporting practices vary by jurisdiction."

**How we processed it:** [METHODOLOGY_LIMITATION]

Example: "We aggregated data by county. Figures are county-level only; we don't show results for cities, neighborhoods, or smaller areas."

**Timing & trends:** [TEMPORAL_LIMITATION]

Example: "These are one-year snapshots. A single year's figures can be noisy; we recommend looking at multi-year trends."

**Geographic precision:** [GEOGRAPHIC_LIMITATION]

Example: "Data are aggregated to the county level to prevent identification of individuals. We do not publish street-level or site-specific results."

**What these figures don't explain:** [CAUSAL_LIMITATION]

Example: "Transit access shows which areas have stops within walking distance. It doesn't explain why some areas have better service—that's a result of planning decisions, funding, and agency capacity."

---

#### Data Currency

**Data date:** [START_DATE] to [END_DATE]  
**Retrieved on:** [RETRIEVAL_DATE]  
**Refresh cadence:** [CADENCE]  
**Status:** [FRESH | AGING | STALE]

If this data becomes stale without a refresh, we'll flag it so you know it might not reflect recent changes.

---

#### Report an Error or Question

If you believe there's a mistake in these figures or methodology:

1. Email [CONTACT_EMAIL]
2. Open an issue at [GITHUB_URL]
3. Comment on the original source (feedback to [PUBLISHER_NAME])

We review corrections carefully and update the explainer when warranted.

---

#### Accessibility & Equity

This explainer is designed to be accessible (WCAG 2.2 AA) and written in plain language (grade 8 level). If you find it's not working for you—text too small, terms too technical, not available in your language—let us know.

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

## Complete Example: County Agriculture Profiles

This example shows how to use this entire template for a single module.

### Non-Partisan / Not Advice Notices

#### Educational, Not Advice (all ag explainers)

```markdown
## ⓘ This is educational information, not advice

This explainer presents factual data about agricultural activity in [County]. It is designed for learning, research, and public understanding—not as advice.

If you are making a farming or investment decision, please consult with agricultural professionals (extension agents, agronomists, financial advisors).
```

#### Historical Data, Not Predictions

```markdown
## ⏱ These data show the past, not the future

This explainer presents historical data (2019–2025) and trends. It does not predict what will happen next. Trends can continue, reverse, or break unexpectedly due to policy, markets, or other factors.
```

---

### Methodology Card Header

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

### Sources & Limits Panel

This section appears after the Methodology Card in the published explainer.

#### Where This Data Comes From

This county agriculture profile is computed from the United States Department of Agriculture (USDA) National Agricultural Statistics Service (NASS) QuickStats database.

| Dataset | Publisher | Retrieved | License |
| --- | --- | --- | --- |
| NASS QuickStats | USDA NASS | 2026-03-01 | CC0-1.0 (public domain) |

**How to cite:** "Data from the USDA National Agricultural Statistics Service (NASS), QuickStats database. Accessed 2026-03-01."

**Original source:** https://quickstats.nass.usda.gov

**Note:** We use a snapshot of the data from March 1, 2026. NASS typically releases new annual data each March; if you're viewing this after March, the data may be one year old.

---

#### What You Should Know Before Using These Figures

**Missing data:** NASS QuickStats includes data from farms above a certain reporting threshold. Very small household farms or specialty operations may not be included.

**Data quality:** NASS data come from USDA surveys and administrative records. Coverage varies by county and year; some smaller operations may be under-counted.

**How we processed it:** We aggregated QuickStats records by commodity and year at the county level. All acreage and production figures are county-level totals; we don't publish farm-level or site-level data.

**Timing & trends:** These are one-year snapshots. A single year's figures can be noisy due to weather, market conditions, and counting variations.

**Geographic precision:** We show county-level data only, not city, township, or farm-level data.

**What these figures don't explain:** The trends show acreage and production over time, but they don't explain *why* (market prices, regulations, soil, farmer preference, or acquisition by urban development). This is a factual profile, not an explanation of agricultural policy or outcomes.

---

#### Data Currency

**Data date:** 2019-01-01 to 2025-12-31  
**Retrieved on:** 2026-03-01  
**Refresh cadence:** Annual (typically each March)  
**Status:** FRESH (3 days old)

---

#### Have You Found an Error?

If you believe there's a mistake in these figures or methodology:

1. Email [contact@example.org](mailto:contact@example.org)
2. Open an issue at [GitHub Issues](https://github.com/hee-lee-oss/open-data-explainers/issues)

We review corrections carefully and update the profile when warranted. Any changes are noted in a public changelog.

---

#### Accessibility & Equity

This profile is designed to be accessible (WCAG 2.2 AA) and written in plain language (grade 8 reading level). If you find it's not working for you—text too small, terms too technical, not available in your language—let us know.

---

## Implementation Guidance for Authors

1. **When to use each notice:** Select from the five notice types above based on your explainer's content and risk profile. A county-agriculture module needs educational + historical notices. A collision-hotspots module needs educational + civic + causation + ranking notices.

2. **Plain language:** Use this template to make methodology transparent, not buried. Assume readers have no statistics training.

3. **Traceability:** Every number in the explainer should trace back to a transform in the Methodology Card.

4. **Limits first:** Don't hide caveats in footnotes. "Known Limits" and "What You Should Know" are main sections—place them prominently.

5. **Disclaimers are clarity, not apology:** The "Does NOT Claim" section isn't saying "this is bad"; it's saying "here's exactly what we're not attempting."

6. **Machine-readable schema:** This template is rendered from the JSON schema (`methodology-card-schema.json`). Tools can parse the JSON and verify that code, parameters, and card match.

7. **Update on change:** If a parameter changes or a new transform is added, update the Methodology Card and commit it alongside the code change.

8. **Customization:** Every explainer module fills in the bracketed placeholders [TOPIC], [PUBLISHER], [COVERAGE_LIMITATION], etc., with its own data and context. This is a template framework, not a copy-paste template.
