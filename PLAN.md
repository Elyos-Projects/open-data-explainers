# PLAN — open-data-explainers

> Status: Draft · Version: 0.1.0 · Last updated: 2026-06-28 · Owner: TBD (maintainer) · Lane: donated

## Executive summary

Vast amounts of public, openly-licensed data exist — transit timetables, road-collision records,
college costs and outcomes, mapped amenities, inflation by category, county agriculture, sky
surveys — but ordinary people, teachers, journalists, and community groups cannot read it. The data
is "open" but unintelligible: it lives in zipped GTFS feeds, multi-gigabyte STATS19 extracts, and
column-coded survey tables. **open-data-explainers** is an umbrella that turns verified open datasets
into **plain-language explainers and small, accountable tools** people can actually use — a map of
"which homes are within a short walk of transit," an aggregated road-safety hotspot view, an
affordable-colleges-by-outcome explorer, a derived amenities set, an inflation-by-category explainer,
county crop/livestock profiles, and classroom astronomy lessons. The umbrella decomposes into
**per-region (or per-category) tasks** sized for a single donated AI session plus human review.

The crucial difference from a documentation project is that **this project creates derivatives** —
we aggregate, compute, summarise, and visualise. That makes two gates central rather than optional.
First, a **license/provenance gate** that — because we publish derivatives — must decide the *output*
license per source (share-alike sources like OpenStreetMap's ODbL force share-alike outputs; some
GTFS feeds and some sky-survey terms forbid the reuse we need and are excluded). Second, a
**methodology & statistics gate**: a plain-language explainer that gets a number, a map bin, or a
causal implication wrong does real harm — it can stigmatise a neighbourhood, mislead a family's
college decision, or imply a road is "dangerous" from noisy counts. Every explainer ships a
**Methodology Card** (how each figure was computed, reproducibly, from a cited source snapshot), a
**Sources & limits** panel, and — for civic content — explicit **non-partisan, "not advice"**
framing.

Risk tier is **low–medium**, set per module. CPI, county-agriculture, and college-outcomes are low
risk; transit-access, amenities, collision-hotspots, and astronomy-lessons are medium (statistical
misinterpretation, share-alike licensing, residual-PII/aggregation judgement, or place-level harm).
The plan front-loads the license gate, the methodology/stats reviewer role, an aggregate-only PII
stance, and accessibility — and sequences low-risk modules first to prove the shared toolkit before
the harder ones. No distribution partner is yet secured, so per-task `verifiedNeed` is **false** and
the requestor is **TO BE SECURED** until a named beneficiary agrees to host/use an explainer.

## Problem & beneficiaries

**Who is helped.**
- **The general public / residents** — people who want to know, in plain words, whether they can
  reach transit on foot, how inflation hits the things *they* buy, or what a college actually costs
  and where its graduates end up.
- **Teachers and students** — county-agriculture profiles and survey-data astronomy lessons turn raw
  public data into ready-to-use, openly-licensed classroom material.
- **Local journalists and community/civic groups** — who need a defensible, sourced, non-partisan
  starting point (aggregated collision hotspots, amenity gaps) without a data-science team.
- **Civic data portals and the publishing agencies themselves** — derivative explainers increase the
  verifiable, attributed reuse of data they already paid to collect.

**The verified need.** That open public data is practically unusable to non-experts is a well-
established, general problem. We treat that *general* need as real. But the **per-explainer,
per-beneficiary need is TO BE SECURED**: we have **not** confirmed a named school, newsroom, civic
group, or portal that has agreed to host or use a specific explainer. Until a named beneficiary
commits, individual tasks carry `verifiedNeed: false`. This honesty is load-bearing: Hee-Lee Oss's bar is
"delivered, not merged," and an explainer no one adopts is not delivered. M0 includes explicit
outreach so the pilot has a real acceptance path before we build it.

**Partner / requestor.** TO BE SECURED. Candidate channels: K-12 teachers and OER networks
(county-ag, astronomy lessons); local newsrooms and civic-tech groups (transit, collision,
amenities); college-access nonprofits and school counsellors (college outcomes); and open-data
portals that would host derivative tools. No partner is assumed; M0 opens outreach threads and
provides a self-serve publishing fallback so M0 can still yield a real *accepted* outcome.

## Goals and non-goals

**Goals**
- Build a **shared explainer toolkit** (a data-adapter interface, a reproducible derivation pipeline,
  a static-first tool/template scaffold, a Methodology-Card generator, an accessibility baseline, and
  a license/PII gate) so each new module and region is cheap and consistent to add.
- For each in-scope dataset slice, deliver a **plain-language explainer + small tool** that is
  source-verified, reproducible, accessible, correctly licensed, and **adopted by a real beneficiary**.
- Make **license/provenance verification and output-license determination** a non-skippable,
  auditable gate (share-alike contamination handled explicitly, not guessed).
- Make **methodology & statistics review** a non-skippable gate for any derived metric, with a
  published Methodology Card and reproducible transform code behind every figure.
- Hold every explainer to an **accessibility + plain-language standard** (WCAG 2.2 AA; target reading
  grade ≈ 8) and a **non-partisan, "not advice"** stance for civic content.
- Decompose the umbrella into **per-region tasks** with a region-selection rubric that avoids
  cherry-picking and place-level harm.

**Non-goals**
- We do **not** publish raw or near-raw data dumps; the deliverable is the *explainer/tool* (a
  derivative), with sources cited and snapshotted — not a re-hosted copy of the dataset.
- We do **not** make recommendations, rankings-as-advice, or predictions: no "best college," no "move
  here," no "this road is dangerous, avoid it." We present sourced data with its limits.
- We do **not** use controlled-access, person-level, or re-identifiable data, and we do **not**
  de-anonymise; collision and any person-derived data are used **aggregate-only** above a minimum
  cell-count threshold.
- We do **not** use sources whose license forbids the derivative/reuse we need (e.g. a restrictive
  GTFS feed, a non-commercial sky-survey term that would taint reuse) — these are flagged and excluded.
- We do **not** take partisan positions, run advocacy, or optimise for engagement; and we do **not**
  collect personal data from end-users (static, no-tracking tools).
- We do **not** auto-publish; a human reviews and a steward confirms beneficiary acceptance.

## Success metrics (outcomes)

Outcome-based and beneficiary-centric. "Explainers produced" is explicitly **not** a success metric;
adoption and correctness are.

| Metric | Baseline | Target (first 6 months) |
| --- | --- | --- |
| Explainers **adopted by a named beneficiary** (hosted by a partner / deployed in a classroom / embedded by a newsroom) — last-mile delivered | 0 | ≥ 6 adopted |
| Regions/categories covered by a license-verified explainer | 0 | ≥ 15 region/category slices |
| License correctness: derivatives carrying the **correct output license + required attribution** (esp. ODbL share-alike, OGL, per-feed GTFS) | n/a | **100%** (target: 0 license/share-alike violations) |
| Methodology correctness: statistical/factual errors found in review per 10 delivered | n/a | **0** material errors; < 1 minor wording fix / 10 |
| Accessibility: explainers meeting **WCAG 2.2 AA + reading grade ≤ 8** | n/a | **100%** of delivered explainers |
| PII/aggregation safety: explainers using person-derived data that pass the aggregate-only / min-cell gate | n/a | **100%** (0 re-identification findings) |
| Reproducibility: published figures regenerable from committed code + source snapshot | n/a | **100%** reproduce within tolerance in CI |
| Verifiable external reuse/usage events (teacher reuse, civic embed, citation, partner traffic) | 0 | ≥ 3 externally verifiable events |
| Confirmed distribution partners (beneficiaries who host/use explainers) | 0 | ≥ 2 secured |

Notes. (1) An "adoption" or "reuse" event must be **externally verifiable** (a partner-hosted URL, a
merged embed, a teacher's written confirmation, a citation) — self-reported use does not count.
(2) "Used" is defined concretely per channel in *Quality, review & risk gates → Definition of
Shipped*. (3) Usage is measured with **privacy-preserving, no-PII** analytics only (see Security).

## Scope

**In scope**
- A **shared explainer toolkit**: source-adapter interface, reproducible derivation pipeline,
  static-first tool/template scaffold, Methodology-Card + Sources-&-limits generator, accessibility
  baseline, golden-fixture test harness, and the license/PII gate.
- **Seven explainer modules** (each fans into per-region/per-category tasks):
  - **transit-access** (GTFS) — "stops/lines within a short walk" coverage maps + a transparent
    access score, per metro/agency. *medium.*
  - **collision-hotspots** (STATS19) — **aggregated** road-safety hotspots and trends, per area.
    *medium.*
  - **college-outcomes-explorer** (College Scorecard) — affordable-by-outcome exploration, *not* a
    ranking, *not* advice. *low.*
  - **amenities-near-me** (OpenStreetMap) — derived points-of-interest sets per area; **ODbL
    share-alike** output. *medium.*
  - **cpi-explainer** (BLS CPI) — inflation-by-category, plain-language. *low.*
  - **county-ag-profiles** (USDA NASS) — per-county crop/livestock profiles. *low.*
  - **astronomy-lesson-builder** (SDSS / Gaia) — classroom lessons from sky-survey data;
    license-verified, educator-reviewed. *medium.*
- License, provenance, output-license, PII/aggregation, and accessibility triage per dataset slice.

**Out of scope**
- Re-hosting/mirroring raw datasets; building general-purpose data APIs or warehouses.
- Recommendations, rankings-as-advice, predictions, scoring of individuals, or causal claims.
- Person-level, controlled-access, or re-identifiable data; de-anonymisation; sub-threshold geographic
  bins.
- Sources whose license forbids the needed derivative/reuse (restrictive GTFS feeds; NC terms that
  would taint educational reuse) — flagged and excluded, never best-guessed.
- Partisan/advocacy content; end-user tracking or personal-data collection; unattended auto-publishing.

## Solution approach & architecture

This is a **content + light-software** project: a small toolkit plus many per-region content/tool
deliverables. The toolkit is the leverage; modules are instances of one shared contract.

**The shared explainer contract** (what makes adding module #5, #6, #7 cheap — mirrors a faculty
interface):
```
source (verified, licensed, snapshotted)
  → derive (documented, reproducible transform → metrics/aggregations)
  → explain (plain-language copy + small static tool + Methodology Card + Sources & limits)
  → review (license + methodology/stats + domain + accessibility)
  → publish (static, attributed, correct output license)  → confirm adoption (steward)
```
Every module implements: `fetch(sourceSnapshot) → derive(params) → render(explainerArtifact)` with a
committed `methodology.json` and golden-fixture tests.

**Pipeline (per explainer / per region)**
1. **License + provenance + output-license gate** — identify source, publisher, license, retrieval
   version; decide whether the license permits the derivative we intend **and** what the *output*
   license must be (share-alike propagation). PASS only with cited evidence. PII/aggregation check.
2. **Source snapshot** — record source URL, publisher, retrieval timestamp, dataset version/vintage,
   license id+URL+text snapshot (committed copy + SHA-256 + Wayback save), and the required
   attribution string. We snapshot the *inputs we used*, not a full re-host.
3. **Derivation** — the documented, reproducible transform (aggregation, normalisation, geo-binning,
   indexing). Committed as code; every published figure traces to it. No silent parameters.
4. **Methodology Card** — machine- and human-readable record of *how every number was computed*:
   inputs, transforms, parameters, thresholds, known limits, vintage, and the explicit list of things
   the explainer does **not** claim (no causation, no ranking-as-advice).
5. **Explainer artifact** — plain-language copy + a small **static, client-side** tool/visualisation,
   with the Sources-&-limits panel, attribution, currency badge, and (civic) "not advice / non-
   partisan" notice.
6. **Accessibility pass** — WCAG 2.2 AA + reading-grade check; keyboard/contrast/alt-text/colour-blind-
   safe palettes.
7. **Review & publish** — license reviewer + methodology/stats reviewer + (where required) domain and
   accessibility reviewers sign off; a human publishes to the beneficiary/self-serve channel.

**Key decisions (locked).**
- **Static-first, no-backend, no-tracking.** Explainers are pre-rendered static sites / client-side
  widgets. No server, no database, no user accounts, no end-user PII. This is cheaper, more durable,
  embeddable, and privacy-preserving by construction.
- **Reproducibility is mandatory.** Each published figure is regenerable from committed transform code
  + the source snapshot, asserted by golden-fixture tests in CI. "Trust me" numbers are rejected.
- **Output license is decided at the gate, per source.** Derivatives of ODbL data are ODbL; OGL/CC-BY
  derivatives carry the required attribution; PD-source explainer *text* is CC-BY-4.0; code is MIT.
- **One canonical Methodology Card schema** for all modules, so reviewers and reusers read the same
  shape everywhere.
- **Content/data separation** so internationalisation is a cheap downstream task (strings vs data).

**Tech stack.** TypeScript, ESM, pnpm workspaces (Hee-Lee Oss conventions). Derivation libraries are small
Node packages with minimal dependencies; tools are static HTML/JS (a lightweight, dependency-light
build — e.g. a static-site/island approach) with no runtime services. Geo work uses open formats
(GeoJSON/PMTiles) and open basemap tiles with proper attribution. Content authored in Markdown;
Methodology Cards in JSON + rendered Markdown. Everything runs locally or in CI.

**Pinned input specs / vintages** (recorded per explainer so refresh is deliberate): GTFS (current
spec), GTFS-RT excluded (we use static schedules only), STATS19 published annual extracts, College
Scorecard data dictionary version, OSM planet/extract date, BLS CPI series + reference base, NASS
Quick Stats survey year, SDSS Data Release / Gaia Data Release numbers. Any version bump is an
explicit refresh task, never a silent change.

## Data, licensing & compliance

**This is the critical section. Because we publish derivatives, license rigour is not optional.**

**Per-source license posture and OUTPUT license (the share-alike decision matrix):**

| Source | License | Permits our derivative? | Required attribution | Output license of our derivative |
| --- | --- | --- | --- | --- |
| **BLS CPI** | US Gov work → public domain | Yes | Courtesy cite of BLS | Explainer text **CC-BY-4.0**; code **MIT** |
| **College Scorecard** | US Gov (Dept. of Ed.) → public domain | Yes | Courtesy cite | Explainer text **CC-BY-4.0**; code **MIT** |
| **USDA NASS Quick Stats** | US Gov → public domain | Yes | Courtesy cite of USDA NASS | Explainer text **CC-BY-4.0**; code **MIT** |
| **STATS19 (UK DfT)** | **OGL v3** | Yes (derivatives allowed) | "Contains public sector information licensed under OGL v3" + DfT | Explainer text **CC-BY-4.0** w/ OGL attribution; code **MIT** |
| **OpenStreetMap** | **ODbL 1.0 (share-alike)** | Yes, **but** derived *database* must be ODbL | "© OpenStreetMap contributors" | **Derived database → ODbL 1.0**; produced map/visual → CC-BY-SA; code **MIT** |
| **GTFS feeds** | **Per-feed (varies)** | **Only if that feed's license permits derivatives** | Per-feed attribution | Per feed: CC-BY-4.0 if feed is CC-BY/PD; **carry share-alike** if feed is share-alike; **exclude** restrictive/no-derivative feeds |
| **SDSS / Gaia** | Survey-specific (acknowledgment; **verify NC**) | Verify per release | SDSS/Gaia acknowledgment text | If terms permit educational reuse → lesson **CC-BY-4.0** + acknowledgment; **if genuinely NC → carry NC or exclude** |

**Hard rules.**
- A source enters scope **only** if the gate records (a) the license id + URL + committed text
  snapshot, (b) `permitsDerivative: true` with a cited clause, and (c) the **resolved output
  license** for our derivative. Missing/unparseable evidence = FLAG/EXCLUDE; never default-allow.
- **Share-alike propagates.** ODbL (OSM) derived databases are released ODbL with the OSM attribution
  string; any GTFS feed under a share-alike term forces a share-alike output. We never relicense a
  share-alike derivative as permissive.
- **GTFS is per-feed.** There is no blanket GTFS license. Each agency feed is gated individually; feeds
  that forbid derivatives, require unobtained permission, or have no clear license are **excluded**.
- **SDSS/Gaia NC flag.** The roadmap flags a non-commercial concern. Each survey release's terms are
  verified; if a release's terms are non-commercial, the lesson either carries the NC restriction
  (and is labelled) or the source is excluded — we do not launder NC data into a permissive output.

**Provenance model.** Every explainer records: source URL(s), publisher, retrieval timestamp, dataset
version/vintage, license id + URL + committed text snapshot (copy + SHA-256 + Wayback save), required
attribution string, the derivation code commit, and the Methodology Card. Provenance is part of the
committed deliverable and surfaced in the Sources-&-limits panel.

**Privacy / PII stance.** We use **only aggregate or already-published de-identified data**.
- **Collision-hotspots (STATS19)** contains casualty-level rows (age band, sex, severity, location).
  We use **aggregated** hotspots/trends only — never person-level rows in output — and apply a
  **minimum cell-count threshold** (no geographic/temporal bin with fewer than **k = 5** events is
  shown) plus geo-precision limits, so no individual incident or person is identifiable. We never
  re-identify, link, or publish individual incidents.
- **GTFS / OSM / CPI / NASS / College Scorecard / astronomy** are about places, prices, crops, schools
  (institution-level), and stars — not individuals. We still scan for any inadvertent person-level
  field and exclude it.
- We do **not** download, store, or process controlled-access data and we do **not** de-anonymise.

**Attribution & "describe the source, not re-host it."** Every explainer attributes the publisher per
license, links to the original source, states clearly that the *explainer* (not the data) is our
contribution, and shows the data vintage. We snapshot the specific inputs used for reproducibility;
we do not republish full datasets.

**Non-partisan / not-advice posture (civic modules).** transit-access, collision-hotspots, and
college-outcomes carry a standard notice: this is **education, not advice**, is **non-partisan**, and
makes **no recommendation**. No content advocates policy, ranks places/colleges as "best/worst," or
implies causation from observational data.

## Quality, review & risk gates

**Risk tier: low–medium, set per module.** Low: cpi-explainer, county-ag-profiles, college-outcomes-
explorer. Medium: transit-access, collision-hotspots, amenities-near-me, astronomy-lesson-builder
(statistical misinterpretation, share-alike licensing, residual-PII/aggregation judgement, or place-
level harm). No module is high-stakes/`high` as scoped; any drift toward medical/legal/safety *advice*
moves it out of scope or to `high` with credentialed sign-off.

**Required review before a deed is "done" (gates, by role):**
- **License + provenance reviewer** (mandatory, every explainer): confirms license permits the
  derivative, the **output license is correct** (share-alike resolved), attribution is present, and
  the source snapshot is recorded. *Hard gate.*
- **Methodology + statistics reviewer** (mandatory for any derived metric — transit, collision,
  college, cpi): confirms the derivation is sound, reproducible, free of statistical errors (no
  ecological fallacy, no causation-from-correlation, appropriate denominators/normalisation, noise
  acknowledged), and that the Methodology Card matches the code. *Hard gate for stats modules.*
- **Domain reviewer** (per module where context matters): road-safety/transport context for
  collision and transit; an astronomer/educator for astronomy lessons; a college-access practitioner
  for college-outcomes copy.
- **Accessibility reviewer** (mandatory, every explainer): WCAG 2.2 AA + reading-grade ≤ 8 + colour-
  blind-safe + keyboard/alt-text.
- **Harm scan** (mandatory for place-level modules): could this stigmatise a neighbourhood/community
  or read as redlining-adjacent (transit gaps, amenity deserts, collision "blame")? Framed neutrally,
  with limits, or escalated.

**Reproducibility & CI.** Each module ships golden-fixture tests: known input snapshot → known
derived output, asserted in CI; the published figures must regenerate within tolerance.
`pnpm build && pnpm test && pnpm lint` must pass; commits DCO signed-off. Fixtures use small public/
synthetic samples — never re-hosted bulk data.

**Definition of Shipped.** A plain-language explainer + tool that is **adopted by a named
beneficiary** — defined per channel and recorded by the Steward as an `outcomes/<explainer-id>.json`
artifact (channel, URL/permalink, timestamp, vintage, and the review sign-offs):
- **Partner-hosted / civic portal:** live at the partner's URL (permalink) or written acceptance.
- **Classroom / OER:** an educator's written confirmation of classroom use, or acceptance into an OER
  collection (merge/permalink).
- **Newsroom embed:** a merged embed or published piece using the tool (URL).
- **Self-serve fallback:** published to the project's own openly-licensed site **and** at least one
  external party links/uses it (verifiable). Self-published-with-no-uptake is *delivered-pending*,
  not shipped.
Producing the explainer is **not** shipped; recorded adoption by a beneficiary is.

## Roadmap & milestones

Sequencing principle: **low-risk modules first** to prove the shared toolkit, then the medium-risk
modules behind the methodology/stats + domain gates. Each phase has measurable exit criteria.

**M0 — Foundation & cold-start (thin)**
- Goal: build the shared toolkit + both gates + the Methodology-Card and accessibility standards;
  ship **one** low-risk explainer end-to-end (pilot); open partner outreach with a real acceptance
  path.
- **Cold-start de-risking.** The pilot is gated on a realistic acceptance path *before* building:
  (a) an informal channel — a teacher/newsroom/civic group/portal who has agreed to look at it; or
  failing that (b) a **self-serve fallback** — publish to the project's own openly-licensed site and
  pursue one external link/use. Pilot module = **county-ag-profiles** for one county (USDA NASS:
  public domain, no PII, low risk) — it proves the per-region decomposition with the least risk.
- Exit criteria: (1) shared toolkit (adapter interface, derivation pipeline, static tool scaffold,
  golden-fixture harness) published; (2) license/PII/output-license gate checklist + Methodology-Card
  schema + accessibility standard published; (3) methodology+stats reviewer and license reviewer roles
  **named** (or self-serve gate documented if not yet); (4) one county-ag explainer fully built,
  reproducible in CI, accessible, license-verified, **and adopted** via an informal channel or self-
  serve+external-use — or, if none materialises, **delivered-pending** with the blocker surfaced;
  (5) ≥ 1 outreach thread opened.

**M1 — Low-risk modules at small scale + gates hardened + first adoptions**
- Goal: prove the toolkit across the three low-risk modules and secure the first real beneficiary.
- Exit criteria: (1) license + methodology/stats gates codified as reviewable artifacts and applied to
  every delivered explainer; (2) **cpi-explainer** (national) + **college-outcomes-explorer** + **a
  batch of county-ag profiles** delivered, each reproducible/accessible/license-verified; (3) ≥ 3
  explainers **adopted** (acceptance evidence recorded); (4) ≥ 1 confirmed distribution partner;
  (5) corrections process live (how a reader reports an error and how it's fixed).

**M2 — Medium-risk modules (behind methodology/stats + domain review)**
- Goal: add the harder modules with the stronger review gates and share-alike handling.
- Exit criteria: (1) **transit-access** for ≥ 1 metro (per-feed GTFS license verified; transparent
  score with Methodology Card); (2) **amenities-near-me** for ≥ 1 area with **correct ODbL output**
  (share-alike + OSM attribution) verified by the license reviewer; (3) **collision-hotspots** for
  ≥ 1 area, **aggregate-only** with the k≥5 cell threshold, stats-reviewed, harm-scanned, non-
  partisan/not-advice; (4) ≥ 6 explainers adopted cumulatively; (5) 0 license/share-alike violations
  and 0 statistical-error findings across delivered work.

**M3 — Astronomy lessons, reuse outcomes & sustainability**
- Goal: add educator-reviewed astronomy lessons, demonstrate downstream reuse, and stand up
  maintenance.
- Exit criteria: (1) **astronomy-lesson-builder** delivers ≥ 1 educator-reviewed, license-verified
  lesson (SDSS/Gaia terms confirmed, NC handled); (2) ≥ 3 verifiable external reuse/usage events;
  (3) ≥ 8 explainers adopted cumulatively across ≥ 4 modules; (4) staleness/refresh process +
  data-currency badges live; (5) a steward identified for ongoing beneficiary liaison and outcome
  tracking.

Dependencies: M1 depends on the M0 toolkit + gates; M2's medium-risk modules depend on the M1-hardened
methodology gate and the named stats/domain reviewers; M3 depends on a body of adopted explainers and
the refresh tooling.

## Work breakdown

The itemised, schema-mapped backlog lives in `TASKS.md`, organised by the milestones above, each with
a task table (`ID | Title | Type | Size | Risk | Deliverable | Depends on | Reviewer`), acceptance
criteria for the most important tasks, and a milestone Definition of Done. A backlog of
sized-but-unscheduled tasks and one complete, schema-valid example Task JSON are included there. Each
**per-region/per-module explainer** is its own task that must pass the license + methodology gates
before publish; listing a module here does not pre-approve any specific region or feed.

## Governance, roles & stakeholders

- **Maintainer (Owner):** TBD — owns the toolkit, the gate, the module backlog, and region selection.
- **License + provenance reviewer:** TBD (TO BE SECURED) — **non-skippable** gatekeeper; resolves the
  output license (incl. share-alike) per source. Must be filled before the M0 pilot is reviewed. May
  rotate among ≥ 2 qualified reviewers, but at least one must always exist or work halts.
- **Methodology + statistics reviewer:** TBD (TO BE SECURED) — **non-skippable** for derived-metric
  modules (transit, collision, college, cpi). Confirms statistical soundness + reproducibility +
  Methodology-Card↔code match. Must be named before the first stats module ships.
- **Domain reviewer(s):** engaged per module — transport/road-safety (transit, collision), educator/
  astronomer (astronomy), college-access practitioner (college-outcomes).
- **Accessibility reviewer:** TBD — WCAG 2.2 AA + plain-language sign-off, every explainer.
- **Steward (last-mile owner):** TBD — owns beneficiary relationships, confirms adoption (the
  "delivered" signal), records acceptance evidence and reuse events. Critical: shipped = adoption.
- **Partner / requestor:** TO BE SECURED — named school/newsroom/civic group/portal per module.
- **Conflict-of-interest / non-partisan check:** civic explainers are reviewed against the Hee-Lee Oss
  good-deed COI/non-partisan posture; advocacy or partisan framing is rejected.

## Dependencies & integrations

- **Datasets:** GTFS feeds (per-agency), STATS19 (UK DfT), College Scorecard (US Dept. of Ed.),
  OpenStreetMap, BLS CPI, USDA NASS Quick Stats, SDSS / Gaia. **None assumed in scope** until per-
  source/per-feed gated.
- **External standards/specs (pinned):** GTFS static spec; STATS19 published-extract schema; College
  Scorecard data dictionary; OSM/ODbL + tag schema; BLS CPI series/base; NASS Quick Stats API; SDSS
  Data Release / Gaia Data Release; WCAG 2.2; GeoJSON/PMTiles; SPDX license identifiers.
- **External services:** open basemap tiles (with attribution); dataset download/APIs (read-only,
  snapshotted). No proprietary services; no end-user-tracking analytics services.
- **Hee-Lee Oss pieces:** Task JSON schema (`packages/schema`), donated-lane CLI workspace/PR flow
  (`packages/cli`), good-deed definition + refusal guardrails. **Donated lane** — no funded-lane/
  runner dependency by default (see Security for the funded-batch exception).

## Risks & mitigations

| Risk | Likelihood | Impact | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Statistical misinterpretation (ecological fallacy, causation-from-correlation, bad denominators) misleads readers | Medium | High | Mandatory methodology+stats reviewer; Methodology Card ↔ code match; "not advice/no causation" framing; golden-fixture reproducibility | Methodology+stats reviewer |
| Share-alike contamination — relicensing an ODbL/share-alike derivative as permissive | Medium | High | License gate resolves output license per source; ODbL output kit + OSM attribution; never relicense share-alike | License reviewer |
| Using a GTFS feed (or sky-survey release) whose license forbids the derivative | Medium | High | Per-feed/per-release gate; exclude restrictive/no-derivative/unclear sources; cited evidence required | License reviewer |
| Residual PII / re-identification in collision data | Low | High | Aggregate-only; k≥5 min-cell threshold + geo-precision limit; never person-level output; never de-anonymise | License reviewer |
| Place-level harm — stigmatising a neighbourhood/community (transit gaps, amenity deserts, collision "blame") | Medium | Medium | Mandatory harm scan; neutral framing + limits; no rankings-as-judgement; domain review | Domain reviewer |
| No beneficiary secured → explainers built but never adopted (fails "delivered") | Medium | High | M0 outreach + acceptance-path-before-build; self-serve fallback; steward; `verifiedNeed:false` until secured | Steward |
| Stale data → explainer shows outdated figures | Medium | Medium | Vintage badge; pinned input versions; staleness detection; refresh tasks | Maintainer |
| Accessibility failure (low reading level / not WCAG) excludes the intended audience | Medium | Medium | Accessibility standard + reviewer; reading-grade check in CI where feasible | Accessibility reviewer |
| Spec/feed/API drift breaks derivation | Medium | Low | Pinned specs/vintages; isolated refresh tasks; golden fixtures catch drift | Maintainer |
| Non-reproducible "trust me" figures slip through | Low | High | Reproducibility is a gate; figures regenerated from committed code+snapshot in CI | Methodology+stats reviewer |
| College/transit content read as advice or a ranking | Medium | Medium | "Not advice / not a ranking" template; domain review; no single composite "best" score | Domain reviewer |

## Security & privacy

- **Threat surface is small by design** — static, no-backend, no-database, no-accounts tools. Main
  surfaces are CI and the published artifacts.
- **No end-user PII.** Tools run client-side and collect nothing. Usage measurement, if any, is
  **privacy-preserving and aggregate** (no cookies/identifiers, no personal data) — and never a
  requirement.
- **Upstream PII** is the dominant concern and is handled by the aggregate-only / k≥5 / geo-precision
  gate (collision) and by excluding any person-level field elsewhere. We never download controlled-
  access data, store personal data, or de-anonymise.
- **Secrets.** Derivation/tooling needs no credentials by default. If a dataset API key is ever needed
  for retrieval, the human supplies it locally; it is never written to logs, receipts, or committed
  files (Hee-Lee Oss rule).
- **Abuse/misuse prevention.** Refuse and flag any task that steers an explainer toward surveillance,
  targeting/profiling individuals, de-anonymisation, partisan advocacy, stigmatising a community, or
  laundering a non-open/NC/share-alike source into a permissive output.
- **Funded-lane exception.** Default lane is donated. *If* a compute-heavy batch (e.g. processing many
  GTFS feeds or a large OSM extract) is ever run via `packages/runner`, it must carry a **hard
  per-task budget cap**, a public cost-ledger entry, and never exceed escrow (Hee-Lee Oss funded-lane rule).

## Sustainability & maintenance

- **Post-delivery ownership.** The steward maintains beneficiary relationships and records outcomes;
  the maintainer keeps the toolkit, gate, and Methodology-Card schema current with spec/feed drift.
- **Refresh.** Each explainer records its data vintage and a refresh cadence; staleness detection flags
  when an underlying release has updated, opening a `maintenance` refresh task. Re-running the committed
  derivation regenerates the figures.
- **Corrections.** A public corrections process lets readers report an error; corrections are tracked,
  fixed, and noted with a changelog on the explainer.
- **Outcome tracking.** The steward records adoption and external reuse events against the success
  metrics, reviewed each milestone.

## Open questions

- Which named beneficiary (school/OER network, newsroom, civic group, or portal) will be the **first
  confirmed partner**, and for which module?
- For OSM-derived amenities, is the produced *map/visual* released CC-BY-SA while the derived
  *database* is ODbL — and do we publish the derived database at all, or only the produced work?
  (Default: publish the produced work + ODbL-license any derived database we distribute.)
- What is the exact **transit-access score** definition (walk distance threshold, network vs.
  straight-line, frequency weighting) — locked in the methodology task before any metro ships?
- What minimum cell-count and geo-precision exactly satisfy "no re-identification" for STATS19 across
  jurisdictions (default k≥5; confirm with the license reviewer per area)?
- For SDSS/Gaia, which specific data releases' terms permit the educational reuse we need, and which
  (if any) are NC and must be excluded or labelled?
- What counts as a sufficiently **verifiable adoption/reuse event** per channel (default: external
  permalink / written confirmation / merged embed)?

## References

- Hee-Lee Oss work rules — `C:\code\hee-lee-oss\CLAUDE.md`
- Good Deed Definition + risk tiers — `C:\code\hee-lee-oss\docs\good-deed-definition.md`
- Task JSON schema — `C:\code\hee-lee-oss\packages\schema\src\schemas.ts`
- Proposal — `C:\code\hee-lee-oss\governance\proposals\open-data-explainers.md`
- Portfolio roadmap — `C:\code\hee-lee-oss\planning\ROADMAP.md`
- Sibling plan (conventions) — `C:\code\hee-lee-oss\planning\projects\open-data-datasheets\PLAN.md`
- GTFS specification; STATS19 (UK DfT) under the Open Government Licence v3.0
- College Scorecard (US Dept. of Education) data documentation
- OpenStreetMap / Open Database License (ODbL) 1.0; OSM attribution guidelines
- BLS Consumer Price Index documentation; USDA NASS Quick Stats
- SDSS Data Release documentation; ESA Gaia data release terms
- WCAG 2.2; SPDX license list; Datasheets/Model-Cards/Data-Statements lineage for "Methodology Card"

---

## Appendix A — Improvements applied

This plan was drafted, then deliberately stress-tested against the question *"what would a senior
reviewer say is missing or naive?"* The following **25 specific improvements** were identified and
**applied** to the plan and `TASKS.md` (each notes where it landed). They are kept here so the
revision work is visible.

1. **Output-license decision matrix per source** — because this project (unlike a documentation
   project) *publishes derivatives*, the gate must decide the *output* license, not just verify the
   input. Added the per-source table in *Data, licensing & compliance* and made it a gate field.
2. **Share-alike propagation rule (ODbL/OSM)** — explicit "share-alike propagates; never relicense"
   rule + an ODbL output kit task (`amenities`/backlog). Applied in licensing + risks.
3. **Per-feed GTFS licensing** — there is no blanket GTFS license; each feed is gated individually,
   restrictive feeds excluded. Applied in licensing, transit task acceptance criteria, and risks.
4. **SDSS/Gaia NC handling** — the roadmap's NC flag is honoured: verify each release; carry NC or
   exclude; never launder NC into permissive. Applied in licensing + astronomy task.
5. **Methodology Card requirement** — every explainer ships a canonical Methodology Card (how each
   number was computed) with a machine-readable schema. Added as a foundation task + DoD field.
6. **Methodology + statistics reviewer as a named blocking role** — added to governance and made a
   hard gate for derived-metric modules.
7. **Reproducibility as a gate** — every figure regenerable from committed code + source snapshot,
   asserted by golden-fixture tests in CI. Added to architecture, quality gates, and a toolkit task.
8. **Ecological-fallacy / no-causation guardrails** — explicit "no causation, no ranking-as-advice"
   constraints, especially collision + college. Applied in non-goals, methodology review, risks.
9. **Aggregate-only + k≥5 min-cell threshold + geo-precision limit for STATS19** — concrete,
   checkable PII rule rather than a vibe. Applied in licensing/privacy + collision task.
10. **Accessibility + plain-language standard (WCAG 2.2 AA, reading grade ≤ 8)** — added as a
    foundation standard, a mandatory reviewer, a success metric, and per-task acceptance criteria.
11. **Static-first / no-backend / no-tracking architecture** — locked as a key decision; shrinks the
    threat surface and guarantees no end-user PII. Applied in architecture + security.
12. **Place-level harm scan** — mandatory check that an explainer doesn't stigmatise a community or
    read as redlining-adjacent (transit gaps, amenity deserts, collision "blame"). Added as a gate.
13. **Region-selection rubric** — regions chosen by need/coverage, not cherry-picked to tell a story;
    avoids bias. Added as a foundation task + goal.
14. **Non-partisan / "not advice" template for civic modules** — a standard notice + COI/non-partisan
    governance check. Applied in licensing, governance, and per-task criteria.
15. **Concrete, per-channel definition of "adopted"/"used"** — partner-host / classroom / newsroom-
    embed / self-serve+external-use, each with required evidence. Applied in success metrics + DoS.
16. **Shared explainer contract (interface)** — a single `fetch→derive→render` contract + Methodology
    Card so modules #5–#7 are cheap to add (mirrors a faculty interface). Added to architecture.
17. **Privacy-preserving usage measurement stance** — usage measured aggregate, no PII, never
    required. Applied in success-metric notes + security.
18. **College-outcomes "not a ranking, no single best score" guardrail** — present data with limits;
    no composite "best college." Applied in module scope, non-goals, risks, and the college task.
19. **Data-currency / vintage badge + staleness detection** — every explainer shows its data date;
    drift opens a refresh task. Applied in architecture, sustainability, and a refresh task.
20. **Golden-fixture test harness in the toolkit** — known-input→known-output tests per metric so
    "CI green" means the math is right. Added as a foundation task + acceptance criteria.
21. **Public corrections process** — a defined way for readers to report errors and for fixes to be
    logged. Added to sustainability + an M1 exit criterion.
22. **Internationalisation hook from the start** — content/data separation so translation is a cheap
    reviewed task; added to architecture + a backlog i18n task (medium risk, language reviewer).
23. **Cold-start acceptance-path-before-build** — the M0 pilot requires a real channel (informal or
    self-serve+external-use) before building, so M0 yields a real adoption, not a demo. Applied in M0.
24. **Steward role + per-explainer acceptance-evidence artifact** — mirrors the datasheets rigor; the
    "delivered" signal is recorded, not assumed. Added to governance + DoS.
25. **Funded-lane budget-cap note** — default donated; any compute-heavy GTFS/OSM batch via the runner
    carries a hard per-task budget cap + cost ledger. Added to security + dependencies.

## Review sign-off

A completeness/correctness review was performed against the spec, the Hee-Lee Oss guardrails, and the Task
schema after applying the 25 improvements:

- **Metrics measurable?** Yes — every success metric has a baseline (0/n-a) and a 6-month target, and
  "adopted"/"used"/"reuse" are defined per channel with required external evidence. Vanity metric
  ("explainers produced") is explicitly excluded.
- **Gates enforceable?** Yes — license/output-license, methodology+statistics, accessibility, and
  harm-scan are named blocking roles with concrete pass conditions; reproducibility is enforced by
  golden-fixture CI; share-alike and k≥5 thresholds are objective.
- **Risks owned + mitigated?** Yes — every risk row has a likelihood, impact, concrete mitigation, and
  a named owner role; the headline risks (statistical misinterpretation, share-alike contamination,
  restrictive-feed licensing, residual PII) each map to a specific gate.
- **License / PII / expert-review guardrails present?** Yes — open/PD/CC/OGL-only with a per-source
  output-license matrix; ODbL share-alike propagation; per-feed GTFS gating; NC handling for sky
  surveys; aggregate-only collision data with k≥5; non-partisan/"not advice" framing; domain/educator
  review for medium-risk modules.
- **Sequencing sound?** Yes — toolkit + gates first (M0), low-risk modules to validate (M1), medium-
  risk modules behind the hardened methodology/domain gates (M2), astronomy + reuse + sustainability
  (M3); dependencies are stated and acyclic.
- **Tasks schema-valid?** Yes — `TASKS.md` maps every field to `packages/schema/src/schemas.ts`; the
  example Task JSON includes all required fields with valid enums, `verifiedNeed:false` (no partner),
  `requestor:"TO BE SECURED"`, and a real `outputLicense`.
- **Fixes made during review:** clarified that the pilot module is county-ag (lowest risk) not a
  medium-risk module; made the methodology+stats reviewer a *blocking* (not advisory) role for stats
  modules; added the explicit "delivered-pending vs shipped" distinction to the self-serve fallback;
  and ensured the OSM amenities task's output license is ODbL (not CC-BY) in both PLAN and TASKS.

**Headline gate:** an explainer ships only if it clears the **license/output-license gate** (open/PD/
CC/OGL only; ODbL share-alike propagated; per-feed GTFS and NC sky-survey terms verified or excluded)
**and** the **methodology/statistics gate** (reproducible, no statistical error, no causation/ranking-
as-advice), is accessible, harm-scanned, and **adopted by a named beneficiary**. No partner is yet
secured, so all tasks are `verifiedNeed:false` / `requestor:"TO BE SECURED"`.
