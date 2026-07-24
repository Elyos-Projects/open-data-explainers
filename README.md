# open-data-explainers

> Plain-language explainers & lightweight tools built from verified open datasets; each module decomposes into per-region tasks.  ·  **Risk tier:** low-med  ·  **Status:** planning

Vast amounts of public, openly-licensed data exist — transit timetables, road-collision records, college costs and outcomes, mapped amenities, inflation by category, county agriculture, sky surveys — but ordinary people, teachers, journalists, and community groups cannot read it. The data is "open" but unintelligible: it lives in zipped GTFS feeds, multi-gigabyte STATS19 extracts, and column-coded survey tables. **open-data-explainers** is an umbrella that turns verified open datasets into **plain-language explainers and small, accountable tools** people can actually use — a map of "which homes are within a short walk of transit," an aggregated road-safety hotspot view, an affordable-colleges-by-outcome explorer, a derived amenities set, an inflation-by-category explainer, county crop/livestock profiles, and classroom astronomy lessons. The umbrella decomposes into **per-region (or per-category) tasks** sized for a single donated AI session plus human review.

**Definition of shipped:** Explainers/tools adopted by a partner/community, accurate and source-cited.

This is a **Hee-Lee Oss** good-deed project. Contributors pull a task, do it with their own coding agent, and open a PR. Get started: https://github.com/Hee-Lee-Oss-Projects/hee-lee-oss-downloads

## Plan
- [PLAN.md](./PLAN.md) — robust enterprise plan (vision, architecture, roadmap, risks; includes an applied-improvements appendix + review sign-off)
- [TASKS.md](./TASKS.md) — schema-mapped task backlog
- [tasks/](./tasks/) — ready-to-pull task JSON(s)

## Contribute
```bash
hee-lee-oss browse
hee-lee-oss next --repo Hee-Lee-Oss-Projects/open-data-explainers --no-fork
```

### Found an error?
If you spot an incorrect figure, stale data, or misleading claim in an explainer, please report it. See our [corrections process](./CORRECTIONS.md) for how to report, how we triage, and how fixes are tracked.

## Licensing & review
- Code MIT; content CC-BY; per-dataset license verified.
- Risk tier **low-med** — deeds are *delivered, not merged*; a domain reviewer (and expert sign-off for any high-stakes content) must approve before merge.

> Planning stage; no adopting partner secured yet (`verifiedNeed: false` on delivery-dependent tasks).
