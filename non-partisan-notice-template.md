# Non-Partisan & "Not Advice" Notice Template

**License:** CC-BY-4.0

Every civic open-data-explainers module (transit-access, collision-hotspots, college-outcomes, and similar modules that present data about places, services, or institutions in ways that could be misread as recommendations or judgments) must include this notice. It establishes a clear, standard, non-partisan frame.

---

## Purpose

These notices serve a critical function:
- **Clarity:** They state explicitly what this explainer does and does not do.
- **Non-partisanship:** They prevent the data from being read as advocacy for a particular position or party.
- **Protection:** They signal that findings are presented as **facts**, not as recommendations or value judgments.
- **Honesty:** They acknowledge that data can be misused and that users need to make their own informed decisions.

---

## Standard Notices (Markdown)

### Notice 1: This Is Educational, Not Advice

Use this for explainers that present factual information about places, services, institutions, or policies.

```markdown
## ⓘ This is educational information, not personal advice.

This explainer presents factual, sourced data about [TOPIC: e.g., transit service, college costs and outcomes, agricultural activity]. It is designed for **learning, research, and public understanding**.

**It is not:**
- Financial advice
- Career advice
- Housing or relocation advice
- Medical or health advice
- Legal advice
- Policy recommendations

**You are responsible for:** making decisions based on your own circumstances, values, and expert advice from qualified professionals (financial advisors, counselors, lawyers, medical professionals, etc.).

If you are making an important life decision (where to live, which college to attend, what to invest in, career planning), please consult with a qualified professional in addition to reading this data.

---
```

### Notice 2: Non-Partisan Frame (Civic Explainers)

Use this for explainers that present data about public services, infrastructure, policy outcomes, or civic issues where the data could be misread as supporting a particular political position.

```markdown
## ⚖️ This is non-partisan, factual information.

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

---
```

### Notice 3: No Causation (For Hotspot / Trend Analyses)

Use this for explainers showing patterns, trends, or "hotspots" in data where readers might assume causation or blame.

```markdown
## 📊 Correlation is not causation. Patterns don't explain themselves.

This explainer shows **what the data reveals: patterns, trends, and geographic concentrations**. It does **not explain why** those patterns exist.

**For example:**
- If we show that a particular neighborhood has more [incidents/resource gaps/outcomes], we are **not saying** the neighborhood is at fault, dangerous, or deficient.
- If we show a trend (increasing or decreasing), we are **not claiming** it will continue, or that any single factor caused it.
- If we show an association (A and B vary together), we are **not claiming** A caused B or vice versa.

**Why?** Real-world patterns have complex causes: policy decisions, funding, historical factors, reporting practices, sampling effects, data quality, and many things we can't measure. A pattern in data is a starting point for *investigation*, not an answer to "why."

**Your role:** If you see a pattern that interests you, ask: "Why might this be?" and seek expert perspectives, local knowledge, and deeper research before drawing conclusions.

---
```

### Notice 4: Not A Ranking (For Comparative Explainers)

Use this for explainers that present data about multiple places, institutions, or options (e.g., colleges, transit systems, areas) where readers might rank them as "best" or "worst."

```markdown
## ★ This is not a ranking. There is no "best."

This explainer lets you **explore and compare** data about [TOPIC: e.g., colleges, transit systems, neighborhoods]. It is **not a ranking** of better or worse.

**Why not?** Because "best" depends on what matters to *you*:
- For colleges: best could mean lowest cost, highest grad rate, best for your major, best student life, best for financial aid, best campus culture, best location—and only you know your priorities.
- For transit: best could mean fastest, most frequent, most accessible, cheapest, or most reliable—and your needs are unique.
- For neighborhoods: best could mean most walkable, safest, most affordable, most diverse, best schools, or closest to work—and your definition of livability is personal.

**How to use it:** Use the data to explore what matters to *your* situation. Don't use this to argue that one place is objectively "better"—that's not what the data shows.

---
```

### Notice 5: Data Are Historical (For Trend-Based Explainers)

Use this for explainers that show past patterns or historical trends.

```markdown
## ⏱ These data show the past, not the future.

This explainer presents **historical data and trends**. It does **not predict** what will happen next.

**Important:**
- Trends can continue, plateau, reverse, or accelerate unexpectedly.
- Historical patterns don't guarantee future patterns.
- Major events (policy changes, economic shifts, infrastructure development, disasters) can break a trend overnight.

**Do not use this as a forecast.** If you need to predict the future, you need forecasting expertise, not just historical trends.

---
```

---

## Template (HTML / React)

For embedding in a web tool:

```jsx
export function NonPartisanNotice({ 
  explainerType = 'educational', // 'educational', 'civic', 'hotspot', 'ranking', 'historical', or 'combined'
  topic,
  showAdviceWarning = true,
  showPartisanWarning = true,
  showCausationWarning = false,
  showRankingWarning = false,
  showHistoricalWarning = false,
}) {
  return (
    <aside className="non-partisan-notice" role="note" aria-label="Important information about how to use this data">
      <div className="notice-header">
        <span className="icon">ⓘ</span>
        <h2>How to Understand This Information</h2>
      </div>

      {showAdviceWarning && (
        <section className="notice-section">
          <h3>This is educational, not advice</h3>
          <p>
            This explainer presents factual, sourced data about <strong>{topic}</strong>. 
            It is designed for learning and public understanding—<strong>not</strong> as 
            personal or professional advice.
          </p>
          <p>
            If you are making an important decision, please consult with qualified 
            professionals (advisors, counselors, experts in the relevant field).
          </p>
        </section>
      )}

      {showPartisanWarning && (
        <section className="notice-section">
          <h3>Non-partisan, factual information</h3>
          <p>
            This data is presented in a <strong>non-partisan frame</strong>. We are not 
            advocating for a particular political position, policy, or candidate.
          </p>
          <p>
            The data show what the sources say. You may draw different conclusions based 
            on your values and priorities—that's healthy democratic disagreement.
          </p>
        </section>
      )}

      {showCausationWarning && (
        <section className="notice-section">
          <h3>Patterns don't explain themselves</h3>
          <p>
            We show <strong>what</strong> the data reveal (patterns, trends, correlations). 
            We do <strong>not explain why</strong>. Real-world patterns have complex causes; 
            a pattern in data is a starting point for investigation, not an answer.
          </p>
          <p>
            Correlation is not causation. If you see something interesting, ask: "Why might 
            this be?" and seek expert perspectives and deeper research.
          </p>
        </section>
      )}

      {showRankingWarning && (
        <section className="notice-section">
          <h3>This is not a ranking</h3>
          <p>
            "Best" depends on what matters to <strong>you</strong>. Use this data to explore 
            what fits your situation. Don't use it to argue that one place or institution 
            is objectively "best."
          </p>
        </section>
      )}

      {showHistoricalWarning && (
        <section className="notice-section">
          <h3>Past patterns ≠ future predictions</h3>
          <p>
            This explainer shows historical data and trends. It does <strong>not predict</strong> 
            what will happen next. Trends can continue, plateau, reverse, or break unexpectedly.
          </p>
        </section>
      )}

      <section className="notice-footer">
        <p>
          <strong>Questions or corrections?</strong> See the Sources & Limits section below.
        </p>
      </section>
    </aside>
  );
}
```

### CSS Styling

```css
.non-partisan-notice {
  border: 2px solid #0066cc;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  background-color: #f0f7ff;
  font-size: 0.95rem;
  line-height: 1.7;
}

.non-partisan-notice .notice-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.non-partisan-notice .icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.non-partisan-notice h2 {
  margin: 0;
  font-size: 1.3rem;
  color: #003d99;
}

.non-partisan-notice h3 {
  font-size: 1.1rem;
  margin: 0 0 0.75rem 0;
  color: #003d99;
}

.non-partisan-notice .notice-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-left: 4px solid #0066cc;
  border-radius: 4px;
}

.non-partisan-notice .notice-section:last-child {
  margin-bottom: 0;
}

.non-partisan-notice .notice-section p {
  margin: 0.5rem 0;
}

.non-partisan-notice .notice-section p:first-child {
  margin-top: 0;
}

.non-partisan-notice .notice-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #cce5ff;
  font-size: 0.9rem;
  color: #555;
}

.non-partisan-notice strong {
  color: #003d99;
  font-weight: 600;
}

@media (prefers-color-scheme: dark) {
  .non-partisan-notice {
    background-color: #001a4d;
    border-color: #4d94ff;
    color: #e0e0e0;
  }

  .non-partisan-notice h2,
  .non-partisan-notice h3 {
    color: #7fb3ff;
  }

  .non-partisan-notice .notice-section {
    background-color: rgba(0, 0, 0, 0.3);
    border-left-color: #4d94ff;
  }

  .non-partisan-notice strong {
    color: #7fb3ff;
  }

  .non-partisan-notice .notice-footer {
    border-top-color: #334466;
    color: #aaa;
  }
}

@media print {
  .non-partisan-notice {
    border-color: #000;
    background-color: #f5f5f5;
  }
}
```

---

## Placement & Visibility

### On a Webpage
- **Position:** Near the top, after the headline but before the main data/visualization.
- **Visual prominence:** Use the border and color scheme to make it visually distinct.
- **Mobile:** Ensure it's readable on small screens; consider collapsible sections if space is tight.

### In a PDF or Print Explainer
- **Position:** On a title page or first page of content.
- **Visibility:** Ensure it prints clearly (test PDF rendering); use high contrast.

### In an Embedded Tool / Widget
- **Position:** Sidebar or footer, always visible or linked to a "Help" section.
- **Responsiveness:** Adapt to the container; prioritize the most relevant warnings.

### Via Email or Social Sharing
- Include a shortened version in the summary/abstract.
- Link to the full notice on the hosted explainer.

---

## Customization Guide

Each explainer should customize the notice by:

1. **Selecting relevant warnings:** Not every explainer needs all five. A county-agriculture explainer (low-risk, historical) needs educational + historical warnings. A collision-hotspots explainer (civic, medium-risk) needs educational + civic + causation + ranking warnings.

2. **Filling in [TOPIC]:** Replace the placeholder with the specific topic of the explainer.

3. **Adjusting the tone:** Keep it professional but accessible. Avoid being condescending ("don't be dumb") or apologetic ("we're sorry the data are imperfect").

4. **Testing readability:** Make sure it reads at grade 8 level. Use readability tools (e.g., Flesch-Kincaid) to verify.

5. **Reviewing for bias:** Have the non-partisan review check that the notice itself is not slanted.

---

## Examples by Explainer Type

### County Agriculture Profiles

```markdown
## ⓘ This is educational information, not advice

This explainer presents factual data about agricultural activity in [County]. It is designed for learning, research, and public understanding—not as advice.

If you are making a farming or investment decision, please consult with agricultural professionals (extension agents, agronomists, financial advisors).

---

## ⏱ These data show the past, not the future

This explainer presents historical data (2019–2025) and trends. It does not predict what will happen next. Trends can continue, reverse, or break unexpectedly due to policy, markets, or other factors.

---
```

### Transit Access Explainer

```markdown
## ⓘ This is educational information, not advice

This explainer shows which areas have transit stops and lines within a short walk. It is designed to help you understand transit service patterns—not as housing advice or a recommendation to move.

If you are choosing where to live, please consider your own priorities, visit neighborhoods, and consult with local experts.

---

## ⚖️ This is non-partisan, factual information

This data is presented without advocacy. We are not arguing for or against transit funding, policy, or development.

---

## 📊 Patterns don't explain causation

If some areas have better transit access than others, this data show the fact—but not the reason. Reasons include historical decisions, funding, geography, agency capacity, and many other factors. This is a starting point for understanding, not an explanation.

---
```

### Collision Hotspots Explainer

```markdown
## ⓘ This is educational information, not advice

This explainer presents aggregated data about road collisions. It is designed for understanding traffic safety patterns and informing policy discussions—not as a judgment of neighborhoods or residents.

---

## ⚖️ This is non-partisan, factual information

We are presenting data without advocating for a particular policy or blaming any group.

---

## 📊 Patterns don't explain themselves

If some areas show more collisions, we show the fact—but we don't explain why. Reasons include traffic volume, road design, driver behavior, speed limits, vehicle types, and many other factors. High collision counts don't mean a road is "dangerous" or that an area is "unsafe"; they mean something about traffic patterns worth investigating further.

---
```

### College Outcomes Explorer

```markdown
## ⓘ This is educational information, not advice

This explainer shows data about college costs, graduation rates, and outcomes. It is a tool for exploring and comparing—not a ranking or recommendation of which college is "best."

**If you are choosing a college:** Consider your own priorities, visit campuses, talk to students and alumni, and consult with a college counselor.

---

## ★ This is not a ranking. There is no "best"

"Best" depends on what matters to you: cost, graduation rate, your major, campus culture, location, financial aid, or something else entirely. Use this data to explore what fits your situation—don't use it to argue that one college is objectively "best."

---
```

---

## Notes for Authors & Reviewers

1. **Brevity:** Readers will skip long notices. Keep each section to 2–3 sentences; cut anything redundant.

2. **Clarity over caution:** Don't add qualifiers like "allegedly" or "purportedly." If the data are from an official source, say so; readers will understand the limits.

3. **Non-partisan review:** Before publishing, have someone with a different political perspective read this and the explainer to spot any unintended slant.

4. **Placement matters:** A notice buried in a footer is worthless. Put it where readers see it *before* they start exploring the data.

5. **Update on refresh:** When data are updated, bump the language (e.g., "historical data 2019–2026" instead of "2019–2025").

6. **Accessibility:** Make sure the notice meets WCAG 2.2 AA standards (color contrast, readable fonts, no wall of text). Test with screen readers.

7. **Consistency:** Use these exact notices across all open-data-explainers modules so readers see the same frame everywhere.
