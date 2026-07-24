# Accessibility + Plain-Language Standard

**Status:** v1.0 — Governance document  
**Scope:** All published open-data-explainers  
**License:** CC-BY-4.0

---

## Purpose

The open-data-explainers project serves the general public, teachers, journalists, and community groups—many of whom rely on assistive technologies or have lower reading levels. Accessibility is not optional: it is core to our mission.

Every explainer must meet **WCAG 2.2 AA** and maintain a reading grade of **8 or below** before publication. This standard ensures that our content is usable by people with disabilities and understandable to diverse audiences.

---

## 1. Accessibility Standard: WCAG 2.2 AA

### Minimum Compliance Level

All published explainers must meet **WCAG 2.2 Level AA** conformance. This is the baseline required by most government and educational institutions.

Refer to [WCAG 2.2 Standards](https://www.w3.org/TR/WCAG22/) for full specifications. The sections below highlight requirements most relevant to data explainers.

---

## 2. Contrast Requirements

### Color Contrast Ratios

All text and interactive elements must meet these minimum contrast ratios:

- **Large text** (18pt+ or 14pt bold+): **3:1** contrast ratio minimum
- **Normal text** (<18pt or <14pt bold): **4.5:1** contrast ratio minimum
- **UI components & graphical elements:** **3:1** contrast ratio minimum

### Testing & Measurement

- Use browser-based tools: WebAIM Contrast Checker, Chrome DevTools color picker
- Test both light and dark modes if both are supported
- Include contrast ratios in code comments for non-standard color pairs
- Verify contrast at actual size on screen, not just in design mockups

### Exception

Logos, decorative images, and incidental text (e.g., text in a screenshot) are exempt from contrast requirements.

---

## 3. Keyboard Navigation & Focus Management

Every interactive element must be operable via keyboard alone. Users should never need a mouse.

### Requirements

- **Tab order:** Tab sequence follows a logical, intuitive order (usually top-to-bottom, left-to-right)
- **Focus visible:** All interactive elements show a clear focus indicator (outline, border, or background change). Do not remove or hide browser focus indicators
- **No keyboard trap:** Users can navigate out of any element using the keyboard alone
- **Keyboard shortcuts:** Optional shortcuts (e.g., arrow keys in sliders) must work consistently and be documented
- **Skip links:** Include a "Skip to main content" link for all pages
- **Focus management:** When opening modals or popovers, move focus to the first focusable element; restore focus when closing

### Testing

1. Navigate the entire explainer using only Tab, Shift+Tab, Enter, and arrow keys
2. Verify focus is always visible
3. Confirm you can reach all interactive elements and inputs

---

## 4. Images & Alt Text

### Alt Text Requirements

All non-decorative images must include descriptive alt text.

- **Chart/graph:** Describe the data shown, key trends, and main insight
  - Example: "Bar chart showing CO2 emissions by country. China leads at 10 gigatons, followed by the US at 5 gigatons."
- **Illustration/diagram:** Describe what the image depicts and any labels
  - Example: "Diagram of water cycle showing evaporation from ocean, condensation in clouds, and precipitation."
- **Photograph:** Describe people, objects, actions, and context
  - Example: "Community volunteers planting tree seedlings in an urban garden."
- **Icon/symbol:** Describe its meaning in context
  - Example: "Green checkmark icon indicating completion status."

### Decorative Images

If an image is purely decorative and conveys no information:
- Omit alt text entirely (`alt=""`)
- Or use `role="presentation"` + `aria-hidden="true"` in HTML

### Implementation

- In Markdown: Always include `![alt text](image.jpg)`
- In HTML: Always include `alt="..."` on all `<img>` tags
- In SVGs: Use `<title>` and `<desc>` elements or ARIA labels
- In interactive charts: Include a data table as an alternative

---

## 5. Colour-Blind-Safe Palettes

Approximately 8% of men and 0.5% of women have color blindness. Explainers must be usable by all readers.

### Design Requirements

- **Do not rely on color alone** to convey information. Use color + pattern, color + text label, or color + shape
- **Use accessible color combinations:**
  - Red-green contrast: Use blue/yellow instead; if red/green are essential, add patterns or textures
  - Blue-yellow contrast: Accessible to most; verify 4.5:1 contrast ratio
  - Avoid light red + light green; avoid orange + red; avoid brown + green
- **Test with simulation tools:** Use Coblis or Sim Daltonism to preview how your palette appears to people with different types of color blindness
- **Recommended palettes:** 
  - Blue, orange, grey
  - Teal, gold, grey
  - Purple, yellow, grey

### Example Accessible Color Palette

| Color | Hex | Use |
|-------|-----|-----|
| Blue | #0173B2 | Primary data series |
| Orange | #DE8F05 | Secondary data series |
| Red | #CC78BC | Tertiary or alert |
| Yellow | #CA9161 | Highlights |
| Grey | #808080 | Neutral/background |

---

## 6. Accessible Data Tables

Data tables must be structured correctly so screen readers can interpret them.

### Table Markup

- **Use semantic `<table>` element** with `<thead>`, `<tbody>`, `<tfoot>` sections
- **Header row:** Use `<th>` for all header cells with `scope="col"` attribute
- **Row headers:** Use `<th scope="row">` for the first cell in each row if applicable
- **Caption:** Include a `<caption>` element at the start of the table describing its content
- **Summary:** If complex, add a brief summary above or below the table

### Example

```html
<table>
  <caption>Annual CO2 Emissions (Gigatons) by Region, 2020</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">2015</th>
      <th scope="col">2020</th>
      <th scope="col">% Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Asia</th>
      <td>14.2</td>
      <td>15.8</td>
      <td>+11%</td>
    </tr>
  </tbody>
</table>
```

### Readability

- Keep tables simple; split large tables into smaller ones
- Avoid empty cells; use "N/A" or "—" instead
- Use consistent alignment (e.g., numbers right-aligned, text left-aligned)
- For complex data, provide a downloadable CSV or export option

---

## 7. Plain Language & Reading Grade

Clear, simple language is essential for accessibility.

### Target Reading Grade

All published explainers must achieve a **reading grade of 8 or below** using the Flesch-Kincaid Grade Level formula.

This corresponds to readable content for:
- 13- to 14-year-old native English speakers
- General audiences without subject-matter expertise
- Non-native English speakers

### Writing Guidelines

- **Use short sentences** (15–20 words average)
- **Use short paragraphs** (3–4 sentences each)
- **Prefer common words** over jargon; define technical terms when first used
- **Active voice** over passive: "We collected data" not "Data was collected"
- **Concrete examples** over abstract explanations
- **Lists** instead of dense paragraphs
- **Headings** to break up content

### Automated Checking

**Recommended tools:**
- [Hemingway Editor](https://www.hemingwayapp.com/) — Highlights difficult sentences, suggests simplifications (free web app)
- [Readable.com](https://readable.com/) — Flesch-Kincaid score + suggestions
- [Pro Writing Aid](https://prowritingaid.com/) — Comprehensive readability analysis (paid)
- **Microsoft Word:** Built-in readability stats (File → Options → Proofing)
- **Google Docs:** Grammarly extension with readability scores

**Workflow:**
1. Write your explainer
2. Run text through Hemingway Editor or Readable.com
3. Revise sentences flagged as "hard to read"
4. Verify final reading grade ≤ 8
5. Include the final score in your submission

---

## 8. Multimedia & Interactive Elements

### Video & Audio

- **Captions:** All video must include synchronized captions for dialogue and sound effects
- **Transcripts:** Provide a full transcript for audio and video content
- **Audio descriptions:** For videos where visual details are critical, include an audio description track

### Animations & Motion

- **Pause/play controls:** Users must be able to pause animations
- **No auto-play:** Never auto-play audio or video with sound
- **Avoid excessive flashing:** No content flashes more than 3 times per second
- **Respect prefers-reduced-motion:** Support the CSS media query for users with vestibular disorders

---

## 9. Signpost Checklist for Accessibility Reviewer

Use this checklist before approving an explainer for publication.

### WCAG 2.2 AA Compliance

- [ ] **Contrast:** All text meets 4.5:1 (normal) or 3:1 (large) ratio; interactive elements meet 3:1
- [ ] **Keyboard navigation:** Tab order is logical; all interactive elements are reachable via keyboard; focus is always visible
- [ ] **No keyboard traps:** User can exit any element using keyboard alone
- [ ] **Links & buttons:** All links have descriptive text; buttons have visible labels or aria-labels
- [ ] **Skip link:** Page includes "Skip to main content" link if navigation is present

### Images & Visual Content

- [ ] **Alt text:** All non-decorative images have descriptive alt text
- [ ] **Decorative images:** Marked as decorative (`alt=""` or `role="presentation"`)
- [ ] **Charts:** Complex charts include a data table or text description as alternative

### Color & Visual Design

- [ ] **Color contrast:** Verified with WCAG checker or DevTools
- [ ] **Colour-blind safe:** Palette tested with Coblis/Sim Daltonism
- [ ] **No color alone:** Information is not conveyed by color alone; patterns or text labels reinforce meaning

### Data Tables

- [ ] **Semantic markup:** Tables use `<thead>`, `<tbody>`, `<th>`, and `scope` attributes
- [ ] **Caption & summary:** Table has a descriptive caption or surrounding text
- [ ] **Readable:** Table is not overly complex; consider splitting if needed

### Plain Language

- [ ] **Reading grade ≤ 8:** Verified using Hemingway Editor, Readable.com, or equivalent tool (include score in PR)
- [ ] **Short sentences & paragraphs:** Average sentence length is 15–20 words
- [ ] **Headings used:** Content is broken into scannable sections
- [ ] **Jargon minimized:** Technical terms are defined on first use
- [ ] **Active voice:** Prefers active over passive construction

### Multimedia

- [ ] **Captions & transcripts:** All video includes captions; audio content includes transcripts
- [ ] **No auto-play:** Audio/video does not auto-play with sound
- [ ] **Animations:** Any animations can be paused; no content flashes >3 times/second

### General Accessibility

- [ ] **Mobile responsive:** Explainer is usable on mobile devices (touch-friendly, readable text)
- [ ] **Page title:** Browser tab title is descriptive
- [ ] **Semantic HTML:** Uses `<header>`, `<main>`, `<article>`, `<nav>` where appropriate
- [ ] **Error messages:** Any form inputs have clear error messages and recovery options

### Approval

- [ ] I have tested this explainer with keyboard navigation only
- [ ] I have tested with a screen reader (e.g., NVDA, JAWS, or Apple VoiceOver)
- [ ] I have verified reading grade using an automated tool and documented the score
- [ ] I have reviewed all alt text for accuracy and clarity

**Reviewer name:** ________________  
**Approval date:** ________________  
**Notes/exceptions:** 

---

## 10. Resources & Tools

### Standards & References

- [WCAG 2.2 Standards](https://www.w3.org/TR/WCAG22/) — Official W3C guidelines
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — How to implement ARIA attributes
- [WebAIM Articles](https://webaim.org/articles/) — Practical accessibility guidance

### Testing Tools

| Tool | Purpose | Cost |
|------|---------|------|
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Verify color contrast | Free |
| [WAVE Browser Extension](https://wave.webaim.org/extension/) | Scan for accessibility errors | Free |
| [Hemingway Editor](https://www.hemingwayapp.com/) | Simplify text; check readability | Free web app |
| [Readable.com](https://readable.com/) | Flesch-Kincaid scores | Free for basic report |
| [Coblis](https://www.color-blindness.com/coblis-color-blindness-simulator/) | Simulate color-blindness | Free |
| [NVDA Screen Reader](https://www.nvaccess.org/) | Test with screen reader | Free (Windows/Linux) |
| [Accessibility Insights](https://accessibilityinsights.io/) | Automated + manual testing | Free |

### Screen Readers for Testing

- **Windows:** NVDA (free), JAWS (paid)
- **Mac:** VoiceOver (built-in)
- **iOS:** VoiceOver (built-in)
- **Android:** TalkBack (built-in)

---

## 11. Frequently Asked Questions

**Q: What if an image is a screenshot or contains text that's part of the image?**  
A: Describe the screenshot's purpose and include the visible text in alt text. If the text is essential, also include it in the surrounding content.

**Q: Can I use emoji in explainers?**  
A: Yes, but sparingly and with purpose. Emoji can aid readability but can clutter. If used, ensure the emoji's meaning is clear in context. Use alt text if an emoji conveys information.

**Q: What if my data is very complex and hard to simplify?**  
A: Break it into smaller, focused visualizations. Provide a downloadable data file. Include a written summary. Simplify the language around the data, even if the data itself is complex.

**Q: What if I can't meet reading grade 8 due to specialized terminology?**  
A: Define all specialized terms clearly. Use analogies and examples. If grade 8 is still impossible, flag this in your PR and discuss with reviewers. Some technical content may justify exceptions, but they must be deliberate and approved.

**Q: Is WCAG AA enough, or should we aim for AAA?**  
A: AA is our baseline. We welcome AAA enhancements (e.g., 7:1 contrast, audio descriptions), but they are not required.

---

## 12. Exceptions & Appeals

The accessibility standard is mandatory. However, genuine exceptions may exist. If you believe an exception is justified:

1. Document why the standard cannot be met (technical limitation, risk, cost, etc.)
2. Propose a workaround or alternative that meets the spirit of accessibility
3. Raise this with the Accessibility reviewer before submission
4. Include the exception discussion in your PR review

All exceptions must be approved by the Accessibility reviewer and documented in the PR.

---

## 13. License

This document is licensed under the **Creative Commons Attribution 4.0 International (CC-BY-4.0)** license.

You are free to:
- Share, copy, and redistribute this work
- Adapt and build upon it for any purpose, including commercial

You must:
- Give appropriate credit to the original author/source
- Include a link to the license
- Indicate if changes were made

For more details, see [CC-BY-4.0 Legal Text](https://creativecommons.org/licenses/by/4.0/legalcode).

---

**Document version:** 1.0  
**Last updated:** July 24, 2026  
**Maintained by:** open-data-explainers accessibility team

Questions? Feedback? Open an issue in the project repository.
