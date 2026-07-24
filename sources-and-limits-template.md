# Sources & Limits Panel Template

**License:** CC-BY-4.0

This is a standard template for the Sources & Limits informational panel that appears in every open-data-explainers module. It is designed to be embeddable in an HTML tool, displayed on a webpage, or rendered as part of documentation.

---

## Purpose

The Sources & Limits panel serves a critical function:
- **Transparency:** It tells users exactly where the data came from and when.
- **Attribution:** It gives proper credit to data publishers and licenses.
- **Honesty:** It lists the real constraints and caveats that affect how the data should (and shouldn't) be used.
- **Currency:** It flags when data is stale or due for an update.

---

## Template (Markdown)

```markdown
## Sources & Limits

### Where This Data Comes From

[EXPLAINER_NAME] is computed from the following open datasets:

| Dataset | Publisher | Retrieved | License |
| --- | --- | --- | --- |
| [SOURCE_NAME] | [PUBLISHER] | [DATE] | [LICENSE_ID] |

**How to cite:** [CITATION_STRING]

**Original source:** [SOURCE_URL]

**Note:** We use a snapshot of the data from [RETRIEVAL_DATE]. If the original source has been updated since then, our figures won't reflect those changes until we refresh (typically [REFRESH_CADENCE]).

---

### What You Should Know Before Using These Figures

This explainer has real limits. Please read these before sharing or acting on any findings.

**Missing data:** [COVERAGE_LIMITATION]

Example: "GTFS feeds are published by transit agencies; we can only show you places where an agency publishes. Rural transit systems that don't publish GTFS won't appear."

**Data quality:** [QUALITY_LIMITATION]

Example: "STATS19 records come from police incident reports. Some collisions are not reported, and reporting practices vary by jurisdiction."

**How we processed it:** [METHODOLOGY_LIMITATION]

Example: "We aggregated data by county. Figures are county-level only; we don't show results for cities, neighborhoods, or smaller areas."

**Timing & trends:** [TEMPORAL_LIMITATION]

Example: "These are one-year snapshots. A single year's figures can be noisy; we recommend looking at multi-year trends."

**Geographic precision:** [GEOGRAPHIC_LIMITATION]

Example: "Data are aggregated to the county level to prevent identification of individuals. We do not publish street-level or site-specific results."

**What these figures don't explain:** [CAUSAL_LIMITATION]

Example: "Transit access shows which areas have stops within walking distance. It doesn't explain why some areas have better service—that's a result of planning decisions, funding, and agency capacity, which vary widely."

---

### Data Currency

**Data date:** [START_DATE] to [END_DATE]  
**Retrieved on:** [RETRIEVAL_DATE]  
**Refresh cadence:** [CADENCE] (e.g., "Annual, typically each March")  
**Status:** [FRESH | AGING | STALE]

If this data becomes [X] days old without a refresh, we'll flag it as stale so you know it might not reflect recent changes.

---

### Have You Found an Error?

If you believe there's a mistake in these figures or in the methodology, please report it:

1. Email [CONTACT_EMAIL]
2. Open an issue at [GITHUB_URL]
3. Comment on the original source (feedback to [PUBLISHER_NAME])

We review corrections carefully and update the explainer when warranted.

---

### Accessibility & Equity

This explainer is designed to be accessible (WCAG 2.2 AA) and written in plain language (grade 8). If you find it's not working for you—text too small, terms too technical, not available in your language—let us know.

---
```

## Template (HTML/React)

For embedding in a web tool:

```jsx
export function SourcesAndLimitsPanel({
  explainerName,
  sources,
  coverage,
  quality,
  methodology,
  temporal,
  geographic,
  causal,
  dataStartDate,
  dataEndDate,
  retrievalDate,
  refreshCadence,
  contactEmail,
  githubUrl,
  citationString,
  sourceUrl,
}) {
  const today = new Date();
  const retrievedDate = new Date(retrievalDate);
  const daysOld = Math.floor((today - retrievedDate) / (1000 * 60 * 60 * 24));
  
  let status = 'FRESH';
  if (daysOld > 365) status = 'STALE';
  else if (daysOld > 180) status = 'AGING';

  return (
    <aside className="sources-and-limits">
      <h2>Sources & Limits</h2>

      <section>
        <h3>Where This Data Comes From</h3>
        <p>
          <em>{explainerName}</em> is computed from the following open datasets:
        </p>
        
        <table>
          <thead>
            <tr>
              <th>Dataset</th>
              <th>Publisher</th>
              <th>Retrieved</th>
              <th>License</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((source) => (
              <tr key={source.id}>
                <td>{source.name}</td>
                <td>{source.publisher}</td>
                <td>{source.retrievalDate}</td>
                <td>
                  <a href={source.licenseUrl}>{source.license}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          <strong>How to cite:</strong> {citationString}
        </p>
        <p>
          <strong>Original source:</strong>{' '}
          <a href={sourceUrl}>{sourceUrl}</a>
        </p>
      </section>

      <section>
        <h3>What You Should Know Before Using These Figures</h3>
        
        <div className="limitation">
          <h4>Missing data</h4>
          <p>{coverage}</p>
        </div>

        <div className="limitation">
          <h4>Data quality</h4>
          <p>{quality}</p>
        </div>

        <div className="limitation">
          <h4>How we processed it</h4>
          <p>{methodology}</p>
        </div>

        <div className="limitation">
          <h4>Timing & trends</h4>
          <p>{temporal}</p>
        </div>

        <div className="limitation">
          <h4>Geographic precision</h4>
          <p>{geographic}</p>
        </div>

        <div className="limitation">
          <h4>What these figures don't explain</h4>
          <p>{causal}</p>
        </div>
      </section>

      <section>
        <h3>Data Currency</h3>
        <dl>
          <dt>Data date:</dt>
          <dd>{dataStartDate} to {dataEndDate}</dd>
          
          <dt>Retrieved on:</dt>
          <dd>{retrievalDate}</dd>
          
          <dt>Refresh cadence:</dt>
          <dd>{refreshCadence}</dd>
          
          <dt>Status:</dt>
          <dd className={`status-${status.toLowerCase()}`}>
            {status} ({daysOld} days old)
          </dd>
        </dl>
      </section>

      <section>
        <h3>Report an Error</h3>
        <p>If you believe there's a mistake in these figures or methodology:</p>
        <ul>
          <li>Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
          <li>Open an issue: <a href={githubUrl}>GitHub</a></li>
        </ul>
      </section>

      <section>
        <h3>Accessibility</h3>
        <p>
          This explainer is designed to meet WCAG 2.2 AA standards and uses plain language. 
          If you encounter barriers, please let us know at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </section>
    </aside>
  );
}
```

## CSS Styling (Optional)

```css
.sources-and-limits {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  background-color: #f9f9f9;
  font-size: 0.9rem;
  line-height: 1.6;
}

.sources-and-limits h2 {
  font-size: 1.5rem;
  margin-top: 0;
  border-bottom: 2px solid #0066cc;
  padding-bottom: 0.5rem;
}

.sources-and-limits h3 {
  font-size: 1.1rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #333;
}

.sources-and-limits h4 {
  font-size: 1rem;
  margin: 0.5rem 0;
  color: #555;
}

.sources-and-limits table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.85rem;
}

.sources-and-limits table th,
.sources-and-limits table td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}

.sources-and-limits table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.sources-and-limits dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  margin: 1rem 0;
}

.sources-and-limits dt {
  font-weight: bold;
  color: #333;
}

.sources-and-limits dd {
  margin: 0;
  color: #555;
}

.sources-and-limits .limitation {
  margin: 1rem 0;
  padding: 0.75rem;
  border-left: 4px solid #ff9500;
  background-color: #fffbf0;
}

.sources-and-limits .status-fresh {
  color: #28a745;
  font-weight: bold;
}

.sources-and-limits .status-aging {
  color: #ff9500;
  font-weight: bold;
}

.sources-and-limits .status-stale {
  color: #dc3545;
  font-weight: bold;
}

.sources-and-limits a {
  color: #0066cc;
  text-decoration: none;
  border-bottom: 1px dotted #0066cc;
}

.sources-and-limits a:hover {
  text-decoration: underline;
}

@media (prefers-color-scheme: dark) {
  .sources-and-limits {
    background-color: #1a1a1a;
    border-color: #444;
    color: #e0e0e0;
  }

  .sources-and-limits h2,
  .sources-and-limits h3,
  .sources-and-limits h4 {
    color: #e0e0e0;
  }

  .sources-and-limits dt,
  .sources-and-limits dd {
    color: #d0d0d0;
  }

  .sources-and-limits .limitation {
    background-color: #2a2015;
    border-left-color: #ff9500;
  }

  .sources-and-limits table th {
    background-color: #333;
  }

  .sources-and-limits table {
    border-color: #444;
  }

  .sources-and-limits table th,
  .sources-and-limits table td {
    border-color: #444;
  }
}
```

---

## Example: County Agriculture Profile

```markdown
## Sources & Limits

### Where This Data Comes From

This county agriculture profile is computed from the United States Department of Agriculture (USDA) National Agricultural Statistics Service (NASS) QuickStats database.

| Dataset | Publisher | Retrieved | License |
| --- | --- | --- | --- |
| NASS QuickStats | USDA NASS | 2026-03-01 | CC0-1.0 (public domain) |

**How to cite:** "Data from the USDA National Agricultural Statistics Service (NASS), QuickStats database. Accessed 2026-03-01."

**Original source:** https://quickstats.nass.usda.gov

**Note:** We use a snapshot of the data from March 1, 2026. NASS typically releases new annual data each March; if you're viewing this after March, the data may be one year old.

---

### What You Should Know Before Using These Figures

**Missing data:** NASS QuickStats includes data from farms above a certain reporting threshold. Very small household farms or specialty operations may not be included.

Example: If your county has a large community-garden or urban-agriculture movement, those won't show in these figures.

**Data quality:** NASS data come from USDA surveys and administrative records. Coverage varies by county and year; some smaller operations may be under-counted.

Example: Preliminary-year data (2024–2025) are published with suppression flags where cell counts are too small. We omit those records so our trends aren't skewed by tiny numbers.

**How we processed it:** We aggregated QuickStats records by commodity and year at the county level. All acreage and production figures are county-level totals; we don't publish farm-level or site-level data.

Example: You see "corn: 120,000 acres" as a county total, not which fields or farms that includes.

**Timing & trends:** These are one-year snapshots. A single year's figures can be noisy due to weather, market conditions, and counting variations.

Example: If corn acreage jumped or dropped in one year, look at the 5-year trend to see if it's part of a pattern or an anomaly.

**Geographic precision:** We show county-level data only, not city, township, or farm-level data.

**What these figures don't explain:** The trends show acreage and production over time, but they don't explain *why* (market prices, regulations, soil, farmer preference, acquisition by urban development, or just that a large farm changed crops). This is a factual profile, not an explanation of agricultural policy or outcomes.

---

### Data Currency

**Data date:** 2019-01-01 to 2025-12-31  
**Retrieved on:** 2026-03-01  
**Refresh cadence:** Annual (typically each March)  
**Status:** FRESH (3 days old)

---

### Have You Found an Error?

If you believe there's a mistake in these figures or methodology:

1. Email [contact@example.org](mailto:contact@example.org)
2. Open an issue at [GitHub Issues](https://github.com/hee-lee-oss/open-data-explainers/issues)

We review corrections carefully and update the profile when warranted. Any changes are noted in a public changelog.

---

### Accessibility & Equity

This profile is designed to be accessible (WCAG 2.2 AA) and written in plain language (grade 8 reading level). If you find it's not working for you—text too small, terms too technical, not available in your language—let us know.

```

---

## Notes for Authors

1. **Keep it honest:** Don't hide limits. Readers need to know what these figures can and can't tell them.
2. **Be specific:** "Data quality issues" is vague. "Some counties don't report for small operations, and preliminary years are subject to revision" is useful.
3. **Use examples:** "Geographic precision: county-level only" is clearer with an example: "You see 'corn: 120,000 acres' as a county total, not which farms that includes."
4. **Make it scannable:** Use headings, lists, and tables so readers can find what they're looking for.
5. **Link to originals:** Always link to the original source and license so users can verify and read the full documentation.
6. **Update on refresh:** When the data is updated, bump the "Retrieved on" date and the status.
7. **Currency badge:** If you embed this in HTML/React, calculate the status color automatically so it's always accurate.
