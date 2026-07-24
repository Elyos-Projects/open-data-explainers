# Region-Selection Rubric & Harm-Scan Checklist

**License:** CC-BY-4.0  
**Version:** 1.0  
**Last updated:** 2026-07-24

## Overview

This document provides a principled rubric for selecting regions (counties, metros, neighborhoods, or other geographic areas) for per-region explainer tasks, and a mandatory harm-scan checklist for place-level modules. Together, they prevent cherry-picking bias, geographic cherry-picking, and unintended stigmatization of communities.

**Who uses this:** Every contributor selecting a region for a new per-region explainer task must apply this rubric and checklist before opening a task. Region selection is **not optional**; it is a prerequisite for defining the scope of any per-region explainer.

---

## Part 1: Region-Selection Rubric

When choosing a region for a new explainer task, the selection must satisfy **all three criteria** below. Deviation requires explicit written justification.

### Criterion 1: Data Availability

**The region must have verified, publicly-available, openly-licensed data for the module in question.**

- [ ] **Source data exists and is accessible** — The dataset (GTFS feed, STATS19 release, OSM coverage, NASS county data, etc.) covers this region and is available without proprietary access, licensing restrictions, or barriers to verification.
- [ ] **License permits derivative use** — The source is governed by an open license (public domain, CC-BY, OGL, ODbL) or is permissive after gate review; restrictive or non-commercial terms are flagged and excluded (see gate-003).
- [ ] **Data is current and documented** — The vintage (retrieval date, dataset version, release number) is recorded; stale data is not used without explicit staleness justification.
- [ ] **No synthetic or re-hosted data** — The data comes from the original publisher or an official mirror; we snapshot inputs we used, not full re-hosted copies.

**Example:** Selecting a metro for transit-access means verifying that the transit agency publishes a GTFS feed, the feed's license permits our derivative (checked via gate-003), and we have the specific feed version/date we will use.

---

### Criterion 2: Community Need or Coverage

**The region must be chosen for demonstrated need, underserved coverage, or data gaps — not because it supports a particular narrative.**

- [ ] **Rationale is explicit and defensible** — Document *why* this region was chosen: "This county has no prior transit access analysis," "This neighborhood is under-represented in civic data," "This area requested targeted information," or "This region fills a geographic gap in current coverage."
- [ ] **Not cherry-picked for narrative advantage** — The region is not selected because it will produce a particular story outcome (e.g., "choose the neighborhood with the worst transit to create a headline," or "skip areas with good outcomes"). If a region's data would contradict the intended message, it is still included if it meets the rubric.
- [ ] **Diverse representation across work** — If multiple regions are being analyzed as part of a batch (e.g., county-ag profiles), ensure diversity: do not cluster selection around a single outcome or demographic. Document any intentional stratification (e.g., "one urban, one rural, one mid-size metro" for comparable transit analysis).
- [ ] **Stated beneficiary or documented gap** — Either a named partner/community has requested coverage of this region, or there is a documented gap in existing public data or analysis.

**Example:** "This county was selected because (1) it has NASS data and (2) local agricultural extension services requested a crop profile for outreach to farmers. It is not selected because it produces a particular crop story." ✓

**Counter-example:** "This county is selected because it has the largest corn crop in the state (and we want to write a story about Big Ag)." ✗ — This is cherry-picking for narrative.

---

### Criterion 3: Prohibition on Cherry-Picking to Support a Pre-Determined Story

**The region selection process must not be driven by a desired conclusion.**

- [ ] **Selection precedes analysis** — Regions are chosen *before* looking at the data. Once a region is selected by criteria 1 and 2, the explainer reports what the data shows — even if it contradicts an initial hypothesis.
- [ ] **No exclusion based on outcome** — Regions are not dropped because their data contradicts the intended narrative. If a region meets criteria 1 and 2, it is included even if its figures are "boring" or unexpected.
- [ ] **Scope boundaries are geographic, not outcome-based** — Decisions like "include urban metros" or "cover all UK counties" are OK; decisions like "include only areas with high transit access" or "skip low-outcome colleges" are not (those are outcome-based exclusions, which constitute cherry-picking).
- [ ] **Cross-reviewer check** — If a region's selection rationale seems outcome-driven (e.g., the justification mentions expected figures or a desired finding), flag it for review before proceeding.

**Example:** "We will cover transit access in all metros with published GTFS feeds, regardless of their actual access levels." ✓

**Counter-example:** "We will cover transit access only in metros with low car dependency (because we want to show the success story of transit)." ✗ — This is outcome-based filtering.

---

### Region-Selection Checklist

Before opening a per-region task, complete this checklist:

- [ ] **Criterion 1: Data Availability** — Source is identified, licensed, accessible, and versioned.
- [ ] **Criterion 2: Community Need or Coverage** — Rationale is documented; region fills a gap or meets a stated need, not chosen for narrative advantage.
- [ ] **Criterion 3: No Cherry-Picking** — Selection was outcome-neutral; region included regardless of expected figures.
- [ ] **Written justification recorded** — A one-sentence rationale is included in the task's `context` field (see TASKS.md template).
- [ ] **Harm scan checklist (Part 2 below) completed** — If this is a place-level module, the harm-scan checklist is signed off before region selection is finalized.

---

## Part 2: Harm-Scan Checklist

For **place-level modules** (those that break down findings by neighborhood, county, region, or other geographic area), a mandatory harm scan must be completed before region selection and before publication. Place-level modules include:

- **transit-access** — coverage maps by region.
- **collision-hotspots** — road-safety aggregations by area.
- **amenities-near-me** — points-of-interest by neighborhood.
- Other modules that aggregate or rank by geographic area.

**Non-place-level modules** (national/aggregate-only, or organized by category, not place) do not require a harm scan. Examples: CPI explainer (national), college-outcomes-explorer (by institution), county-ag profiles (aggregate county data), astronomy lessons (not place-based).

---

### Harm-Scan Questions

For **each region** in a place-level task, answer all four questions below. If any answer is "yes" or "uncertain," document how the explainer is framed to mitigate the harm.

#### 1. **Could this explainer stigmatize a neighborhood or community?**

**Risk:** Highlighting negative findings (low transit access, high collision rates, few amenities) in a specific area could reinforce stereotypes, discourage investment, or mark a community as "bad."

**Questions to ask:**
- Does the explainer highlight data about a specific neighborhood or demographic area?
- If the figures are unfavorable (high collision hotspots, low transit access, few amenities), how is this framed?
- Could readers misinterpret the data as a ranking ("neighborhood X is dangerous / has poor transit / is a food desert")?
- Is there a risk that the explainer is used to justify disinvestment or stigmatization?

**Mitigation checklist:**
- [ ] Explainer uses **neutral, descriptive language**, not judgmental framing ("5 collisions per year in this intersection" not "this is a dangerous road").
- [ ] **Context is provided** — figures are explained with denominators, trend data, or comparative context (e.g., "collision rate is X; city average is Y").
- [ ] **Limits are explicit** — the Methodology Card states what the data does *not* claim (no causation, no blame, no ranking of places).
- [ ] **Non-partisan framing** — if this is a civic module, the explainer makes no recommendation or value judgment (see the non-partisan/"not advice" template in methodcard-004).
- [ ] **Title and summary avoid loaded language** — headlines do not use terms like "bad," "dangerous," "poor," or "failing" without context.

---

#### 2. **Could this explainer read as redlining-adjacent?**

**Risk:** Historical redlining (discriminatory lending practices that concentrated disinvestment in communities of color) is associated with maps and data that highlight "deficiencies" in specific geographic areas. Modern explainers showing transit gaps, amenity deserts, or high collision rates could unintentionally echo this framing and perpetuate harm.

**Questions to ask:**
- Does this explainer map or rank geographic areas by the *absence* of a resource or service (e.g., "areas without nearby transit," "neighborhoods with few amenities")?
- If so, could the map or ranking be misused to justify further disinvestment or discriminatory targeting?
- Is the framing likely to reinforce the idea that certain neighborhoods "lack" rather than have different characteristics?

**Mitigation checklist:**
- [ ] Explainer frames data as a **baseline or measurement**, not a deficit ("transit within 10 minutes" not "transit-deprived areas").
- [ ] Maps or tables show **absolute coverage or access**, not "gaps" or "deserts" without context.
- [ ] If highlighting underserved areas, this is framed as **a case for investment and access, not blame** (e.g., "These areas could benefit from improved transit connections").
- [ ] Explainer **does not suggest that certain neighborhoods are inherently less desirable** or use data to label areas.
- [ ] Methodology Card explicitly states this is descriptive data, not a basis for lending, investment, or policy decisions.

---

#### 3. **Could this explainer enable targeting or profiling of people or communities?**

**Risk:** Data broken down by neighborhood could be misused to identify, profile, or target individuals for surveillance, discrimination, predatory lending, or other harms.

**Questions to ask:**
- Does this explainer use person-level or re-identifiable data (even if aggregated)?
- Could the data be combined with other datasets to identify or profile specific individuals or vulnerable populations?
- Is there a risk of the explainer being used for surveillance, targeting, or discriminatory decision-making?

**Mitigation checklist:**
- [ ] Explainer uses **aggregate-only data** (no person-level rows, no sub-threshold geographic bins that could identify individuals).
- [ ] **Minimum cell-count threshold** is enforced (e.g., k ≥ 5 events per geographic/temporal bin for collision data; no geographic area shown with fewer than N events or persons).
- [ ] **Geo-precision is limited** (fine-grained address-level or block-level data is not published; aggregation is to census tract or neighborhood level or coarser).
- [ ] Privacy statement is clear: "This explainer uses only aggregate data and does not identify individuals."
- [ ] No cross-linking with other datasets is implied or encouraged (no "combine with voter file," "combine with arrest records," etc.).

---

#### 4. **Could this explainer be mistaken for a recommendation, ranking, or advice?**

**Risk:** Readers may interpret exploratory data as a ranking or recommendation ("which neighborhood is best for transit," "which college is best," "which roads are most dangerous to avoid"). This can be misleading and oversimplifies complex decisions.

**Questions to ask:**
- Could readers misinterpret the data as a recommendation or ranking?
- Is there a risk that the explainer will be used to make decisions (where to live, which college to attend, which road to avoid) when it is meant only to show data?
- Does the interface or language unintentionally invite ranking or comparison?

**Mitigation checklist:**
- [ ] Explainer **explicitly states it is not advice or a ranking** — a standard notice appears prominently (see non-partisan/"not advice" template in methodcard-004).
- [ ] **No single composite score or ranking** — if multiple factors are shown (transit access, amenities, collision rates), they are presented separately, not combined into a "best neighborhood" ranking.
- [ ] **No causal claims** — the explainer does not claim that transit access *causes* better outcomes or that high collision rates are *caused by* neighborhood characteristics (only observational data is presented).
- [ ] **Interface design discourages ranking** — tables/maps do not sort by a single "best/worst" metric; multiple dimensions are presented side-by-side without a hierarchy.
- [ ] Title and summary do not include comparative framing ("best transit access," "safest roads") without a clear disclaimer.

---

### Harm-Scan Checklist Template

For each place-level region task, document the harm scan as follows:

```
## Harm Scan — [Region name] — [Module name]

**Question 1: Could this explainer stigmatize a neighborhood or community?**
- Answer: [Yes / No / Uncertain]
- Mitigation: [If yes/uncertain, describe how framing mitigates harm]
- Signed off by: [Reviewer name]

**Question 2: Could this explainer read as redlining-adjacent?**
- Answer: [Yes / No / Uncertain]
- Mitigation: [If yes/uncertain, describe how framing mitigates harm]
- Signed off by: [Reviewer name]

**Question 3: Could this explainer enable targeting or profiling?**
- Answer: [Yes / No / Uncertain]
- Mitigation: [If yes/uncertain, describe aggregate-only + geo-precision measures]
- Signed off by: [Reviewer name]

**Question 4: Could this explainer be mistaken for a recommendation/ranking/advice?**
- Answer: [Yes / No / Uncertain]
- Mitigation: [If yes/uncertain, describe "not advice" framing and interface design]
- Signed off by: [Reviewer name]

**Overall:** [PASS / FLAG / ESCALATE]
- If PASS: region is approved for selection.
- If FLAG: mitigations are required before approval.
- If ESCALATE: domain reviewer or steward consultation required; region selection deferred.
```

---

### Harm-Scan Roles & Sign-Off

- **Domain reviewer** (transport/road-safety for transit/collision, etc.) completes the harm scan as part of their module review (see PLAN.md).
- **Methodology + statistics reviewer** confirms that aggregate-only + k≥5 + geo-precision gates are met (question 3).
- **License reviewer** confirms PII/aggregation gate checklist (see gate-003) aligns with question 3 findings.
- **Maintainer** coordinates sign-off across all reviewers; region selection is finalized only after all four questions are cleared.

If any question yields "ESCALATE," the region is deferred pending consultation with the Steward or a community/governance panel (TBD).

---

## Applying the Rubric: Worked Examples

### Example 1: County-Ag Profile (Not Place-Level)

**Task:** Create a county-agriculture profile for [County X].

**Region-Selection Rubric:**
1. ✓ **Data availability:** USDA NASS Quick Stats has county-level crop/livestock data for [County X], public domain.
2. ✓ **Community need:** County extension office requested this profile for farmer outreach; no prior public profile exists.
3. ✓ **No cherry-picking:** Region chosen by extension request, not because it produces a particular crop story.

**Harm-Scan:** *Not required.* County-ag profiles aggregate county-level statistics and do not break down findings by neighborhood or demographic area. No stigmatization or place-level ranking risk.

---

### Example 2: Transit-Access in [Metro] (Place-Level)

**Task:** Create a transit-access explainer for [Metro].

**Region-Selection Rubric:**
1. ✓ **Data availability:** Transit agency publishes GTFS (feed version XYZ), licensed permissively, gate-003 PASS.
2. ✓ **Community need:** [Metro] has no public transit-access map; transit advocacy group requested it.
3. ✓ **No cherry-picking:** All published GTFS feeds in [state/region] will be covered (outcome-neutral scope); [Metro]'s figures will be reported regardless of access levels.

**Harm-Scan** (Signed by Domain Reviewer — Transport):

**Question 1: Stigmatization?**
- Answer: Uncertain. The metro has several neighborhoods with low transit access (by walk-distance).
- Mitigation: Explainer uses neutral language ("Within a 10-min walk" not "transit desert"). Map shows absolute access coverage, not gaps. Title: "[Metro] Transit Coverage Map" not "[Metro's] Transit Gaps." Limits stated in Methodology Card: "This map shows walk-distance coverage; it does not evaluate neighborhood quality or recommend/rank places. High transit access does not guarantee other amenities or safety; low access does not indicate deficiency."
- Signed off by: [Domain reviewer name]

**Question 2: Redlining-adjacent?**
- Answer: No. Explainer presents access data as a baseline for infrastructure planning, not as a neighborhood ranking or deficit.
- Mitigation: Map uses consistent color scale (all neighborhoods shown equally); framing emphasizes "areas that could benefit from improved connections" rather than "transit-deprived areas." No suggestion that low-access neighborhoods are less desirable.
- Signed off by: [Domain reviewer name]

**Question 3: Enabling targeting/profiling?**
- Answer: No. Data is aggregate (walkable stops within radius), no person-level info, no geographic precision below census-tract level.
- Mitigation: Gate-003 confirmed: aggregate-only, geo-precision limited to station/stop buffer; no PII. Snapshot includes GTFS version and retrieval date, not real-time user data.
- Signed off by: [License reviewer name]

**Question 4: Mistaken for ranking/advice?**
- Answer: Yes, this is a risk. Transit access is often interpreted as a neighborhood ranking ("best neighborhoods for transit").
- Mitigation: Explainer includes "Not a ranking, not advice" notice: "This map shows transit-stop proximity. It does not rank neighborhoods or recommend where to live. Other factors (cost, safety, schools, employment) matter for that decision." No single "transit score" that enables ranking; instead, separate metrics (walk time to nearest stop, stop density, frequency) shown side-by-side. Interface does not sort by transit access.
- Signed off by: [Domain reviewer name]

**Overall:** PASS — Region approved for transit-access task.

---

### Example 3: Collision Hotspots in [Area] (Place-Level, Aggregate-Only)

**Task:** Create a collision-hotspots explainer for [Area] (intersections with aggregated casualty counts).

**Region-Selection Rubric:**
1. ✓ **Data availability:** STATS19 (UK) covers [Area], OGL v3, gate-003 PASS, aggregate-only k≥5 threshold verified.
2. ✓ **Community need:** Local road-safety advocacy group requested data on high-collision intersections for infrastructure investment decisions.
3. ✓ **No cherry-picking:** Region chosen by advocacy request; all intersections in [Area] above k≥5 threshold are shown (outcome-neutral).

**Harm-Scan** (Signed by Domain Reviewer — Road-Safety):

**Question 1: Stigmatization?**
- Answer: Yes. Highlighting intersections with high collision counts could label those areas as "dangerous" or "unsafe" neighborhoods.
- Mitigation: Explainer uses neutral language: "5 events per year at this intersection" not "dangerous intersection." Methodology Card: "This shows where collisions occurred, not why. High collision counts may reflect high traffic volume, complex geometry, or other infrastructure factors — not neighborhood character or driver behavior. Data is aggregate and does not identify individuals. This is not advice to avoid certain areas."
- Signed off by: [Domain reviewer name]

**Question 2: Redlining-adjacent?**
- Answer: Uncertain. Collision data, if concentrated in lower-income neighborhoods, could be misused to justify disinvestment or surveillance.
- Mitigation: Map presents data as a basis for *infrastructure investment* ("These intersections are candidates for safety improvements"). Explainer: "High collision counts indicate where road-safety infrastructure could be improved. This data is used by local authorities to prioritize safer street design." No suggestion that neighborhoods with higher counts are less desirable.
- Signed off by: [Domain reviewer name]

**Question 3: Enabling targeting/profiling?**
- Answer: No. Data is strictly aggregate (collision count per intersection/time period), k≥5 minimum, no person-level identifiers, geo-precision limited to intersection/street-segment level.
- Mitigation: Gate-003 gate confirmed: aggregate-only, k≥5 minimum cell count, no age/sex/vehicle-type breakdowns shown at fine geographic scales. Methodology Card: "This uses STATS19 aggregate data; no individuals are identified."
- Signed off by: [License/Stats reviewer name]

**Question 4: Mistaken for ranking/advice?**
- Answer: Yes. "Hotspots" may invite readers to interpret this as a ranking of "most dangerous roads to avoid."
- Mitigation: Explainer includes "Not advice, not a ranking" notice: "This map shows where collisions have been recorded. It is not a ranking of neighborhoods or roads, and not advice about where to travel. Causes of collisions are complex and are not determined by this data alone." Interface does not sort by collision count; instead, map and time-series data presented separately. Title: "[Area] Recorded Collision Locations" not "[Area's] Most Dangerous Roads."
- Signed off by: [Domain reviewer name]

**Overall:** PASS — With mitigations documented, region approved for collision-hotspots task.

---

## Escalation Criteria

A harm-scan answer of "ESCALATE" requires consultation with the Steward or a domain/governance panel before proceeding. Escalation triggers include:

- A question answered "Yes" with no clear mitigation strategy.
- Risk of stigmatization that cannot be fully mitigated by framing (e.g., an explainer that *inherently* ranks neighborhoods by a single negative metric).
- PII or re-identification risk that exceeds the k≥5 / geo-precision gates.
- Potential for the explainer to be misused for surveillance or discriminatory decision-making that framing alone cannot prevent.
- Community concerns (if a named community or beneficiary objects to the framing or scope).

---

## Maintenance & Updates

This rubric and checklist are part of the open-data-explainers toolkit. If a new risk category emerges or a mitigation strategy proves insufficient, the document should be updated and all affected regions re-evaluated. Changes are logged with a version number and date.

---

## License & Attribution

**License:** CC-BY-4.0

This document is licensed under the Creative Commons Attribution 4.0 International (CC-BY-4.0) license. You are free to use, adapt, and share it with attribution to the open-data-explainers project (Hee-Lee Oss).

**How to attribute:** "Region-Selection Rubric & Harm-Scan Checklist from open-data-explainers (Hee-Lee Oss), licensed CC-BY-4.0"

---

## Related Documents

- **PLAN.md** — Full project plan, including goals and non-goals.
- **gate-003 (License + Provenance Gate Checklist)** — Companion gate for verifying source licenses and PII/aggregation compliance.
- **methodcard-004 (Methodology Card Schema)** — Defines how to document methodology and state explicit non-claims.
- **TASKS.md** — Per-region task definitions and region-selection justifications.

---

## Questions & Feedback

For questions about applying this rubric or suggestions for refinement, reach out to the Maintainer or Steward (roles TBD in PLAN.md Governance section).
