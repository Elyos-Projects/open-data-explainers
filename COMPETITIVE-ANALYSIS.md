# Competitive & Improvement Analysis — open-data-explainers

> Analysis date: 2026-06-29 · Reviews PLAN.md v0.1.0 + TASKS.md (Hee-Lee Oss donated lane)

This is a rigorous outside-in review of the Hee-Lee Oss good-deed umbrella **open-data-explainers**:
plain-language explainers + small static tools built from verified open datasets (GTFS transit-access,
STATS19 collision-hotspots, College Scorecard, OSM amenities, BLS CPI, USDA NASS county-ag, SDSS/Gaia
astronomy), each decomposing into per-region tasks. Competitor claims are grounded in cited web sources.

---

## 1. Correctness & completeness review of PLAN.md

The plan is unusually mature: it already front-loads a license/output-license gate, a methodology/stats
gate, aggregate-only PII handling (k≥5), reproducibility-as-a-gate, accessibility, harm scans, and an
honest `verifiedNeed:false` cold-start posture. Appendix A's 25 applied improvements are real and most
land in both PLAN and TASKS. The gaps below are concrete and mostly about *specific factual/statistical
landmines* the generic gates do not yet name.

**Material findings (correctness):**

1. **Gaia is non-commercial — and the plan treats SDSS/Gaia as one "verify NC" bucket.** ESA Gaia data
   is distributed under **CC BY-NC 3.0 IGO** (non-commercial), confirmed by ESA's own license page
   ([cosmos.esa.int/web/gaia-users/license](https://www.cosmos.esa.int/web/gaia-users/license)). This is
   not a "verify per release" maybe — it is a standing fact. NC has a sharp consequence the plan
   under-states: an NC source **cannot** be relicensed CC-BY-4.0 (the plan's default lesson output), and
   NC is **incompatible with the project's own "openly-licensed, freely reusable" framing** and with most
   OER repositories' reuse expectations. SDSS, by contrast, is generally far more permissive. Bundling
   the two as "SDSS/Gaia (verify NC)" risks one being silently treated like the other. Recommendation:
   split the astronomy module per-survey; default to SDSS for openly-reusable lessons; treat Gaia as
   NC-carry-or-exclude with a visible NC label, and confirm the project even *wants* NC content given its
   open-reuse goal.

2. **College Scorecard earnings are a selected sample (Title IV aid recipients only) — the methodology
   gate names "no causation" but not this selection bias.** Scorecard earnings cover **only students who
   received federal Title IV aid** (~55% of undergraduates nationally, varying by sector), per ED's own
   institution data documentation
   ([collegescorecard.ed.gov InstitutionDataDocumentation.pdf](https://collegescorecard.ed.gov/assets/InstitutionDataDocumentation.pdf)).
   An "affordable-by-outcome" explorer that shows earnings without this caveat will systematically
   mislead for institutions with many non-aided (often wealthier, or international) students. This belongs
   as an explicit, named limit in the college Methodology Card and the stats-gate checklist — not just the
   generic "no causal claims" line.

**Gaps / weaknesses (completeness):**

3. **No named beneficiary, and the success metrics depend entirely on adoption.** The plan is honest
   about this (`verifiedNeed:false`, "TO BE SECURED"), but the *entire* success table (≥6 adopted, ≥2
   partners, ≥3 reuse events) is gated on outreach that has not started. M0's "acceptance-path-before-
   build" is good, but there is no fallback success definition if zero partners materialise in 6 months —
   "delivered-pending" is defined but not counted anywhere. Risk: the project can do everything right and
   still score 0 on every headline metric. Add an interim metric (e.g. "explainers passing all gates,
   self-published, awaiting uptake") so engineering progress is visible distinct from adoption.

4. **"0 statistical errors" and "100% license correctness" are unfalsifiable as written.** These targets
   have no defined detection mechanism beyond "the reviewer didn't catch one." Zero-defect targets with no
   independent audit measure reviewer thoroughness, not actual correctness. Add a periodic external spot-
   audit (a second reviewer re-checks a random sample) so the metric measures reality, not process.

5. **The two blocking reviewer roles (License, Methodology+Stats) are unfilled and are single points of
   failure.** The plan makes them non-skippable and says "≥2 qualified reviewers or work halts" — but for
   a *donated* volunteer project, recruiting a qualified statistician and an open-data-licensing expert
   who will gate every deliverable is the hardest, least-glamorous ask, and nothing in M0 de-risks it
   beyond "name them." This is the most likely place the whole plan stalls. Consider a documented
   self-serve gate checklist that a generalist reviewer + Claude can run for low-risk modules, reserving
   expert sign-off for medium-risk ones.

6. **Reading-grade ≤ 8 "in CI where feasible" is hand-wavy and partly in tension with rigor.** Automated
   readability (Flesch-Kincaid) is gameable and culturally narrow; a Methodology Card written to grade 8
   may have to drop necessary caveats (confidence intervals, denominators, NC labels). The plan should
   resolve the tension: plain-language *summary* at grade 8, with a clearly-linked fuller methodology that
   is allowed to be more technical.

7. **Transit-access score is undefined and is the project's highest methodology risk.** The plan correctly
   defers the definition to `transit-method-014`, but "stops within a short walk + a transparent access
   score" silently competes with two patented/established scores (Walk Score Transit Score; CNT
   AllTransit TCI). The methodology task must decide network-distance vs straight-line, frequency
   weighting, and a denominator (population/households) up front, or every metro deliverable will be
   re-litigated. (See §2.)

8. **No data-licensing change-detection.** Licenses and terms *change* (a GTFS feed switches terms; an
   agency adds an attribution clause; a survey DR re-licenses). The plan snapshots the license text at
   intake but has no re-check on refresh — the staleness detector watches data vintage, not license
   drift. Add license-hash re-verification to the refresh task.

9. **Minor:** "WCAG 2.2 AA" + "colour-blind-safe palettes" + "PMTiles/open basemap" is a real engineering
   load for *static, client-side, accessible* interactive maps — interactive choropleths are notoriously
   hard to make keyboard- and screen-reader-accessible. The a11y standard should specify a non-map
   fallback (data table) as mandatory, not implied.

10. **Minor:** STATS19 is **Great Britain** (England/Scotland/Wales), not the UK — Northern Ireland
    reports separately (PSNI). The plan says "UK DfT"; per-region tasks must not imply NI coverage. STATS19
    being OGL v3 is confirmed ([DfT road safety open data](https://www.gov.uk/government/statistical-data-sets/road-safety-open-data)).

**Confirmed-correct claims worth noting:** GTFS "no blanket license, per-feed gating" is right — Transitland
documents per-feed licenses precisely because OpenMobilityData did not
([Interline/Transitland](https://www.interline.io/transitland/compare/openmobilitydata/)). OSM ODbL
share-alike propagation is correctly characterised. STATS19 OGL v3 and BLS/NASS/Scorecard public-domain
postures are correct.

---

## 2. Competitive landscape

No single competitor does "verified-open-dataset → plain-language explainer + small accountable tool, with
a published methodology card and resolved output license, decomposed per region." But every *piece* of that
has strong incumbents. The threat is **substitution** (a beneficiary already uses a good-enough tool), not a
head-to-head clone.

**Our World in Data (OWID)** — scientific online publication that brings global data into one place,
visualises it in interactive Grapher charts, and adds written context; a charity (Global Change Data Lab),
**all content CC-BY, all software open-source**
([ourworldindata.org/about](https://ourworldindata.org/about), [Wikipedia](https://en.wikipedia.org/wiki/Our_World_in_Data)).
*Strengths:* gold-standard for "data + context + open license," huge trust and reach, reusable Grapher.
*Weaknesses/gaps:* global/national topics, not local per-region civic tools; no transit/collision/college
local explorers; not classroom-lesson packaged; doesn't do per-feed license resolution for messy civic data.

**Observable / Observable Plot** — reactive JS notebooks + a visualization library; every cell re-evaluates
on dependency change; aimed at journalists/analysts/developers building interactive narratives
([data viz tools comparison](https://policyviz.com/2022/02/01/the-data-visualization-tools-wars/)).
*Strengths:* powerful, reproducible, developer-friendly, free library. *Weaknesses:* it's a *toolkit*, not
explainers — requires a developer; no methodology/license gating, no plain-language layer, no beneficiary
delivery.

**Datawrapper** (and **Datawrapper River**) — fast, clean, accessible editorial charts/maps/tables; free for
individuals; **River** is a "wire service for charts" where statistics orgs publish reusable charts that any
newsroom can customise and embed
([River blog](https://www.datawrapper.de/blog/river), [academy](https://academy.datawrapper.de/article/130-how-to-use-the-river)).
*Strengths:* best-in-class accessibility/clarity, huge newsroom install base, frictionless embed/reuse — the
River directly overlaps our "newsroom embed" delivery channel. *Weaknesses:* charts not explainers (no
narrative, no methodology card, no license resolution of the *source*); you bring clean data; no derivation
pipeline.

**Flourish** — no-code storytelling viz (bar-chart races, scrollytelling, maps); huge template library; free
tier + ~$69/mo for privacy
([tools comparison](https://policyviz.com/2022/02/01/the-data-visualization-tools-wars/)).
*Strengths:* engaging, fast, popular in media. *Weaknesses:* engagement-optimised (against our non-partisan,
non-engagement stance), proprietary, no provenance/methodology rigor.

**USAFacts** — nonpartisan nonprofit that consolidates data from 90,000+ US government bodies into a
data-driven portrait of government/society, explicitly **no political agenda**
([usafacts.org](https://usafacts.org/)). *Strengths:* exactly our non-partisan posture, well-funded, trusted,
national. *Weaknesses:* US-only, national/state framing, not local per-region tools, not classroom lessons,
not transit/collision-grain.

**Census Reporter** — independent project making US Census data easy for journalists: profiles for every
place, comparison tables/maps, embeddable charts
([censusreporter.org](https://censusreporter.org/)). *Strengths:* the canonical "per-place plain-language
profile" model we're emulating for county-ag; embeddable; journalist-trusted. *Weaknesses:* Census-only;
no transit/collision/college/CPI; aging; no methodology-card discipline.

**ProPublica / Data is Plural** — ProPublica's Data Institute + Data Store represent newsroom-grade data
journalism and a data marketplace; **Data is Plural** (Jeremy Singer-Vine) is a weekly newsletter of
useful/curious datasets ([data-is-plural.com](https://www.data-is-plural.com/)).
*Strengths:* enormous credibility, dataset discovery, methodology transparency (code on GitHub).
*Weaknesses:* discovery/journalism, not reusable per-region explainer tools for non-experts; not a pipeline.

**AllTransit (CNT)** — neighborhood transit performance: connectivity (TCI = bus routes + train stations
within walking distance, scaled by frequency, regression-fit to journey-to-work transit share), jobs reachable
in 30 min, scored 1–10 for cities over 100k
([alltransit.cnt.org/methods](https://alltransit.cnt.org/methods/)). *Strengths:* exactly our transit-access
space, published methodology, national US coverage. *Weaknesses:* US-only, fixed methodology, not embeddable
per-metro tools, not plain-language explainers; **our transit module must differentiate or defer to it.**

**Walk Score / Transit Score** — patented location scores; Transit Score = Σ(route frequency × mode weight ×
distance-decay penalty), normalised 0–100
([Transit Score methodology](https://www.walkscore.com/transit-score-methodology.shtml)). *Strengths:*
ubiquitous, simple, recognised. *Weaknesses:* **patented/proprietary, opaque inputs, commercial** — the
opposite of our open/reproducible/methodology-card stance; this is our clearest differentiation target.

**Transit app / Google Maps / Citymapper** — consumer routing apps over GTFS(-RT). *Strengths:* real-time,
huge UX. *Weaknesses:* routing, not access-equity explainers; closed; not per-region civic artifacts.

**City open-data portals (Socrata/CKAN/ArcGIS Hub)** — host raw datasets + basic viz. *Strengths:* the source
of much of our input and a natural *host* (beneficiary, not competitor). *Weaknesses:* publish raw/near-raw
data that "is open but unintelligible" — precisely the gap the plan names; they need explainers, they don't
make them.

**The Pudding** — visual-essay data journalism; long-shelf-life topics, code on GitHub, data public
([pudding.cool](https://pudding.cool/), [Storybench](https://www.storybench.org/pudding-structures-stories-visual-essays/)).
*Strengths:* gold-standard visual explanation + reproducible methodology. *Weaknesses:* bespoke editorial
essays, not reusable per-region tools or classroom material; not a scalable pipeline.

**Net read:** The market is saturated with (a) *viz tools you must feed clean data into* (Datawrapper,
Flourish, Observable) and (b) *national/global explainer publishers* (OWID, USAFacts, Census Reporter). The
**white space is the messy middle**: doing the license-resolution + derivation + plain-language + per-region
packaging *for the beneficiary*, on civic-local datasets, with an auditable methodology card and a resolved
output license.

---

## 3. Gaps we can fill

1. **License/output-license resolution as a first-class product.** None of the viz tools resolve the
   *source* license or decide the *derivative's* output license (ODbL propagation, per-feed GTFS, NC).
   Datawrapper/Flourish assume you already cleared rights. Our gate is a genuine differentiator and a
   reusable asset (ties to open-data-datasheets).
2. **The "open but unintelligible" last mile for *local* civic data.** OWID/USAFacts stop at
   national/state; portals stop at raw. Per-county/per-metro plain-language tools are underserved.
3. **A published Methodology Card per figure.** Datawrapper charts and most portal viz have no machine- and
   human-readable "how each number was computed + what it does NOT claim." This is our trust moat.
4. **Reproducibility enforced in CI (golden fixtures).** Even The Pudding/OWID publish code but rarely
   *assert in CI that the published number regenerates*. "CI green = the math is right" is rare.
5. **Classroom/OER-ready packaging** of county-ag and astronomy — neither Census Reporter nor AllTransit
   ships lesson artifacts.
6. **Open, transparent, reproducible alternative to patented Walk/Transit Score** — a methodology-carded,
   forkable access score for places those proprietary scores ignore or charge for.
7. **Aggregate-only, harm-scanned local safety data** with an explicit k≥5/no-blame discipline — most
   collision dashboards lack this and risk stigmatising places.

---

## 4. Differentiators to win

1. **Provenance + resolved output license + Methodology Card, per artifact** — auditable trust that no viz
   tool or portal offers. This is the single strongest differentiator.
2. **Reproducible-in-CI numbers** — "regenerable from committed code + source snapshot or it doesn't ship."
3. **Non-partisan / not-advice / no-ranking discipline** — aligns with USAFacts' trust positioning but at
   local grain and with explicit harm scans.
4. **Static, no-backend, no-tracking, embeddable** — durable, privacy-preserving, and *hostable by the
   beneficiary* (portals, newsrooms, classrooms) rather than locking them to a SaaS.
5. **One shared `fetch→derive→render` contract** — per-region scaling is cheap; competitors hand-build each
   piece. This is the multiplier.
6. **Beneficiary-delivery as the definition of done** — "delivered, not merged" means we optimise for
   adoption, not portfolio size; very few open-data efforts measure last-mile uptake at all.

---

## 5. Claude API leverage

**Where Claude clearly helps (with a human gate after):**

1. **Drafting the plain-language explainer + narrative-from-data.** Given the Methodology Card's computed
   figures, Claude turns numbers into grade-8 prose, the Sources-&-limits panel, alt-text for every chart,
   and the "does NOT claim" list. This is the highest-volume, best-fit use. (See `claude-api` skill for
   model/pricing; long context lets a whole methodology card + source dictionary fit in one prompt.)
2. **Per-region scaling via prompt-caching / batch.** The shared contract means the *only* thing that
   changes per region is data + a few strings. Cache the toolkit/methodology/template context and fan out
   hundreds of county-ag / per-metro drafts cheaply; the **Message Batches API** suits the non-interactive
   bulk drafting (and on the funded lane, runs under a hard per-task budget cap per Hee-Lee Oss rules).
3. **Plain-language QA + reading-grade + accessibility lint.** Claude flags jargon, suggests grade-8
   rewrites that *preserve* caveats, checks alt-text completeness and that every figure has a non-map data
   fallback — as an advisory pass before the human a11y reviewer.
4. **Non-partisan / framing review (advisory).** Claude scans copy for advocacy language, causal slippage
   ("dangerous road," "best college"), ranking-as-advice, and stigmatising framing of places — surfacing
   candidates for the harm scan, not deciding them.
5. **License-clause extraction (advisory).** Claude reads a license/terms page and *drafts* the gate fields
   (license id, derivative clause, attribution string, NC flag) for the human license reviewer to verify —
   speeding intake of many GTFS feeds without deciding.
6. **Methodology-Card ↔ code consistency check.** Claude diffs the prose card against the transform code to
   flag mismatches (a threshold in code that the card doesn't mention) for the stats reviewer.
7. **An MCP server** exposing the dataset adapters + methodology cards so any Claude client can answer
   "what's the data vintage / what does this NOT claim" against the verified corpus (see §7).

**Where Claude must NOT be the decider (hard rules):**

- **Factual/statistical correctness of any published figure** — numbers come from committed, reproducible
  transform code asserted in CI, never from Claude's generation. Claude may *describe* a number, never
  *produce* it.
- **License permits-derivative and output-license resolution** — the named license reviewer decides with
  cited clauses; Claude only drafts candidate fields. Especially: Claude must not "decide" Gaia is reusable
  CC-BY when it is CC-BY-NC.
- **Non-partisan framing sign-off** — Claude flags; a human reviewer (and COI/non-partisan check) decides.
- **PII/aggregation adequacy (k≥5, geo-precision, re-identification)** — a human gate; Claude must not
  approve an aggregation as "safe."
- **Beneficiary adoption ("delivered")** — only the Steward records externally-verifiable acceptance.

---

## 6. Ten concrete optimizations

1. **Split the astronomy module by survey.** Default lessons to SDSS (openly reusable); treat **Gaia as
   CC-BY-NC** — carry NC + visible label or exclude — and decide explicitly whether an *openly-licensed*
   project wants NC content at all. (Grounds the plan's vaguest license cell in a hard fact.)
2. **Add the Title IV selection-bias caveat to the college Methodology Card and stats-gate checklist** as a
   named, mandatory limit — not a generic "no causation" line.
3. **Lock the transit-access score in `transit-method-014` against Walk Score / AllTransit explicitly:**
   choose network-distance (not straight-line), state frequency weighting and denominator, and publish a
   one-line "how this differs from Transit Score (which is patented/proprietary)" note as a differentiator.
4. **Add an interim "engineering-delivered, awaiting adoption" metric** so gate-passing work is visible even
   before a partner exists; keep "adopted" as the headline but stop scoring real progress as 0.
5. **Add an independent spot-audit** (second reviewer re-checks a random 10–20% sample each milestone) to
   make "0 statistical errors / 100% license correctness" falsifiable.
6. **De-risk the blocking reviewers in M0:** ship a self-serve gate checklist (Claude-assisted) that a
   generalist can run for *low-risk* modules, reserving scarce expert sign-off for medium-risk ones — so
   the project doesn't halt waiting to recruit a statistician.
7. **Add license-drift detection to the refresh task:** re-hash the license text on every refresh and FLAG
   on change, not just data-vintage drift.
8. **Mandate a non-map data-table fallback for every interactive map** in the a11y standard (interactive
   choropleths are the hardest WCAG 2.2 AA surface; a table is the reliable keyboard/SR path).
9. **Resolve the grade-8 vs caveat tension:** grade-8 *summary* up top; a clearly-linked fuller methodology
   allowed to be technical, so plain-language never forces dropping a necessary caveat.
10. **Publish to Datawrapper River / OER repos as additional delivery channels.** The River is literally a
    "wire service for charts" newsrooms already pull from — meeting beneficiaries where they are turns a
    self-serve fallback into real reuse with measurable uptake.

---

## 7. Parallel & perpendicular spin-offs

- **Shared dataset-to-explainer pipeline as a reusable product.** The `fetch→derive→render` + Methodology
  Card + license gate is generalisable far beyond the seven seed datasets; package it as the durable asset
  and let modules be thin instances.
- **Embeddable widget library / "open Datawrapper River."** Each tool is already static + embeddable; a
  catalog of methodology-carded, openly-licensed civic widgets that any newsroom/portal can drop in.
- **Per-city / per-county "editions."** A bundled local edition (transit-access + amenities + county-ag +
  collision for one place) is a high-value artifact for a single municipal portal or local newsroom.
- **MCP server over the verified corpus.** Expose adapters + methodology cards + provenance so any Claude
  client can answer grounded questions ("vintage? what does this NOT claim? attribution string?") against
  verified data — and so other agents can build on the pipeline without re-deriving.
- **Tie to open-data-datasheets.** The license/provenance gate here and the datasheets project are two
  halves of one provenance discipline; share the SPDX/attribution/snapshot machinery and Methodology-Card ↔
  Datasheet schema lineage.
- **A reproducible, open alternative to patented Walk/Transit Score** as a standalone civic good — a
  methodology-carded access score for places the proprietary scores ignore.
- **"Explain-this-portal-dataset" service for city open-data portals** — portals have raw data and no
  explainer capacity; offer the pipeline as the value-add that increases attributed reuse of data they
  already paid to collect (a named-beneficiary channel the plan already identifies).
- **i18n editions** — content/data separation already makes translation a cheap reviewed task; per-language
  editions multiply reach with a language reviewer.

---

## 8. Open questions for the maintainer

1. Given the project's open-reuse goal, do we want **any NC content at all** (Gaia)? If not, drop Gaia and
   build astronomy on SDSS only — simplifying the messiest license cell.
2. Who realistically **fills the two blocking reviewer roles** (open-data licensing expert; statistician),
   and what's the fallback if neither is recruited in M0 — does low-risk work proceed on a documented
   self-serve gate, or halt?
3. What is the **interim success signal** before any beneficiary exists, so 6 months of correct
   gate-passing work isn't scored as total failure?
4. For transit-access, do we **build our own score or defer to AllTransit/Walk Score** where they already
   cover a metro — i.e., where is our open/reproducible version actually additive vs duplicative?
5. Is the **Datawrapper River / OER-repo channel** an acceptable "adopted" path, and does River's
   chart-reuse model satisfy the "externally verifiable" bar?
6. How is **license drift** (a feed/term changing after intake) detected and re-gated on refresh?
7. For accessible interactive maps under WCAG 2.2 AA, is a **data-table fallback mandatory** (recommended)
   or best-effort?
8. Same as the plan's existing opens (first confirmed partner; exact k/geo-precision per STATS19
   jurisdiction; whether we publish the derived ODbL database or only the produced work) — still unresolved
   and gating M0/M2.

---

### Key sources
- OWID about / license — https://ourworldindata.org/about · https://en.wikipedia.org/wiki/Our_World_in_Data
- Datawrapper River — https://www.datawrapper.de/blog/river · https://academy.datawrapper.de/article/130-how-to-use-the-river
- Viz tools comparison (Datawrapper/Flourish/Observable) — https://policyviz.com/2022/02/01/the-data-visualization-tools-wars/
- USAFacts — https://usafacts.org/ · Census Reporter — https://censusreporter.org/
- AllTransit methods — https://alltransit.cnt.org/methods/ · Walk/Transit Score — https://www.walkscore.com/transit-score-methodology.shtml
- The Pudding — https://pudding.cool/ · Data is Plural — https://www.data-is-plural.com/
- GTFS per-feed licensing (Transitland vs OpenMobilityData) — https://www.interline.io/transitland/compare/openmobilitydata/
- College Scorecard Title IV limitation — https://collegescorecard.ed.gov/assets/InstitutionDataDocumentation.pdf
- STATS19 OGL v3 — https://www.gov.uk/government/statistical-data-sets/road-safety-open-data
- Gaia CC BY-NC 3.0 IGO — https://www.cosmos.esa.int/web/gaia-users/license
