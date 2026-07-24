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

## 8. Integration: How Downstream Explainer Tasks Use This Standard

This accessibility standard is a **blocking dependency** for all published open-data-explainers. Every explainer task must reference this document and include accessibility review before publishing.

**How to reference this standard:** In your task, PR description, or submission, include:
```
Accessibility reviewed against [ACCESSIBILITY.md](./ACCESSIBILITY.md) — WCAG 2.2 AA + reading grade ≤ 8.
Used [Accessibility Reviewer Sign-Off Checklist](#10-accessibility-reviewer-sign-off-checklist) for verification.
```

### For Explainer Developers

When building an explainer (e.g., county-ag profiles, CPI inflation, transit-access, college-outcomes):

1. **Before development:** Read sections 1–7 of this standard to understand the requirements and baseline expectations for all published explainers.

2. **During development — test incrementally:**
   - **Contrast (section 2):** As you design, test color pairs with WebAIM Contrast Checker or Chrome DevTools. Aim for 4.5:1 for normal text, 3:1 for large text and UI components. Do not wait until the end—contrast is part of the design, not a post-hoc fix.
   - **Keyboard navigation (section 3):** Implement tab order and focus indicators from the start. Test with keyboard alone (no mouse). Common issues: missing skip links, hidden focus indicators, tabs trapped in widgets. Retrofit is 3× harder than building accessible.
   - **Alt text (section 4):** Write alt text as you add images. Describe what the image shows and its purpose, not "image of chart" or "logo." For charts/graphs, include key insight or provide a data table alternative.
   - **Color palette (section 5):** Use an accessible palette (blue/orange/grey or teal/gold/grey). Never rely on color alone to convey information. Test with Coblis or Sim Daltonism for red/green colorblindness.
   - **Data tables (section 6):** If using tables, use semantic HTML (`<thead>`, `<th scope="col">`, `<caption>`). Simple tables are more accessible than complex ones—consider splitting large tables.
   - **Reading grade (section 7):** Use short sentences (15–20 words), short paragraphs, active voice, and common words. Test with Hemingway Editor or Readable.com after each major section. Record the final score and include it in your PR.

3. **Before submitting for review:** Self-check using the Accessibility Reviewer Sign-Off Checklist (section 10). Mark which items you've verified. This catches 80% of issues early.

4. **In your PR or submission:**
   ```
   ## Accessibility
   - [ACCESSIBILITY.md](./ACCESSIBILITY.md) — WCAG 2.2 AA standard applied
   - Reading grade: Flesch-Kincaid **7.2** (target ≤ 8) ✓
   - Keyboard navigation: Tab order tested, all elements reachable ✓
   - Contrast: Verified 4.5:1 on primary text, 3:1 on interactive elements ✓
   - Alt text: All non-decorative images described; charts include data table fallback ✓
   - Color palette: Tested with Coblis (red/green blindness) ✓
   
   **Evidence attached:** contrast-checker.png, hemingway-score.png, keyboard-test-log.txt
   
   **Sign-off requested from:** Accessibility reviewer
   ```
   - Attach screenshots of contrast checker, reading-grade tool output, and color-blindness simulator tests
   - Request explicit sign-off from an Accessibility reviewer before merge

### For Accessibility Reviewers

When approving an explainer for publication:

1. **Copy the Accessibility Reviewer Sign-Off Checklist** (section 10) into your review PR comment or create a review checklist document
2. **Perform hands-on testing:**
   - Test keyboard navigation yourself using Tab, Shift+Tab, Enter, and arrow keys — mark this item on the checklist
   - Test with a screen reader (NVDA, JAWS, or Apple VoiceOver) on at least one major feature — mark this item
3. **Verify readability:** Check the reading grade score is ≤ 8 using an automated tool (Hemingway, Readable, or Word/Docs) — include the final score in your review
4. **Review visual design:**
   - Confirm all alt text is descriptive and accurate; check that decorative images are correctly marked
   - Verify color palette is accessible using a color-blindness simulator (Coblis or Sim Daltonism)
   - Validate contrast ratios using WebAIM or Chrome DevTools
5. **Check WCAG compliance:** Go through each category of the checklist (WCAG 2.2 AA, Images, Color & Design, Data Tables, Plain Language, Multimedia, General Accessibility) and mark items as pass or fail
6. **Sign off:** Complete the reviewer name and approval date fields, add any notes or approved exceptions (documented in section 13), and submit your approval
7. **Flag issues:** If any criterion fails, request changes before approval. Document any justified exceptions in the PR with reference to section 13

**Example review comment:**
```
Accessibility review for [explainer-name]:
- [x] Tested keyboard navigation — all interactive elements reachable
- [x] Screen reader testing with NVDA — navigable and labeled correctly
- [x] Reading grade verified: Flesch-Kincaid 7.4 (✓ ≤ 8)
- [ ] Color blindness simulation — failing on chart legend, needs redesign
- [ ] Contrast ratio on hover state — 2.8:1, need 4.5:1

*Approved with exception for hover state (alternative high-contrast hover mode implemented).*
```

---

## 9. Multimedia & Interactive Elements

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

## 10. Accessibility Reviewer Sign-Off Checklist

**Instructions:** Copy this entire checklist into your review PR comment or create a separate review checklist document. As you test each category, mark items ✓ (pass), ✗ (fail), or N/A (not applicable). For any failures, note the specific issue and request a fix before approval. Reference section 13 (Exceptions & Appeals) if a justified exception is proposed.

---

### WCAG 2.2 AA Compliance

- [ ] **Contrast ratio — normal text:** All text smaller than 18pt or lighter than bold meets 4.5:1 ratio (test with WebAIM or DevTools)
- [ ] **Contrast ratio — large text:** Text 18pt+ or 14pt+ bold meets 3:1 ratio
- [ ] **Contrast ratio — interactive elements:** Buttons, form inputs, focus indicators, and graphical elements meet 3:1 ratio
- [ ] **Keyboard navigation:** Tab order follows a logical, top-to-bottom left-to-right pattern; all interactive elements are reachable via Tab and Shift+Tab
- [ ] **Focus visible:** All focused elements show a clear, visible indicator (outline, border, or background change); focus indicators are never hidden or removed
- [ ] **No keyboard traps:** User can navigate away from any element (dropdown, modal, widget) using keyboard alone without getting stuck
- [ ] **Links & buttons:** Every link has descriptive link text (not "click here"); every button has a visible label or aria-label; purpose is clear without context
- [ ] **Skip link:** Page includes a "Skip to main content" link if navigation menu is present (test that it works)
- [ ] **Form accessibility:** Any form inputs have associated labels; error messages are clear and linked to fields; recovery options are provided

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

### Reviewer Attestation & Approval

By checking these boxes and signing below, you attest that this explainer meets the WCAG 2.2 AA standard and plain-language requirements, and is ready for publication:

- [ ] I have tested keyboard navigation end-to-end using only Tab, Shift+Tab, Enter, and arrow keys — all interactive elements work
- [ ] I have tested with a screen reader (NVDA, JAWS, or Apple VoiceOver) on at least one major feature — navigation and content are clear
- [ ] I have verified reading grade using an automated tool (Hemingway, Readable.com, or Word/Docs) and confirmed ≤ 8 — final score documented
- [ ] I have reviewed all alt text for descriptiveness and accuracy; verified that decorative images are correctly marked
- [ ] I have checked the color palette with a color-blindness simulator; confirmed information is not conveyed by color alone
- [ ] I have verified all acceptance criteria above are marked pass or documented as approved exceptions

**Accessibility Reviewer Name:** ________________  
**Approval Date:** ________________ (YYYY-MM-DD)  
**Approved?** ☐ Yes, ready for publication   ☐ No, changes required (see Notes below)  

**Notes/exceptions/required changes:** 

---

## 11. Resources & Tools

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

## 12. Frequently Asked Questions

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

## 13. Exceptions & Appeals

The accessibility standard is mandatory. However, genuine exceptions may exist. If you believe an exception is justified:

1. Document why the standard cannot be met (technical limitation, risk, cost, etc.)
2. Propose a workaround or alternative that meets the spirit of accessibility
3. Raise this with the Accessibility reviewer before submission
4. Include the exception discussion in your PR review

All exceptions must be approved by the Accessibility reviewer and documented in the PR.

---

## 14. License

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
