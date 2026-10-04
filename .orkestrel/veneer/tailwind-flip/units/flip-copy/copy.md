# Tailwind flip: showcase copy

This document fixes every user-visible string the Tailwind flip changes in the veneer showcase: face labels, the group title, the section lead and introduction, captions, specimen order, the 390 px header, the vocabulary, and the test titles. U5b (`flip-showcase`) applies it verbatim, U6 (`flip-journeys`) takes the test titles of § 8, and U7 (`flip-guide`) aligns `guides/veneer.md` to it. Each ruling carries one reason and its source. The following short names cite sources:

- `verdict`: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`.
- `measurements`: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements.md`.
- `P4`, `P5`: the sections of that name in `/home/user/veneer/tmp/probes/flip2/report.md`, run on 2026-10-04 with Chromium 141.0.7390.37 (the excerpt in `units/flip-probe/report-excerpt.md` carries the same P5 rows).
- `fragment`: `/home/user/veneer/app/browser/sections/tailwindcss.html` at veneer `bae9a1b`.
- `guide`: `/home/user/veneer/guides/veneer.md` at veneer `bae9a1b`.

A string in this document is exact. A caption string holds HTML: each `<code>` element in it stays a `<code>` element, and `<strong>` stays `<strong>`. A triple lists the readings under `bootstrap`, `unexcluded`, and `tailwindcss`, in that order.

## 1. Face labels and the toggle

The following table rules the toggle:

| Id | Item | Ruling | Reason | Source |
| --- | --- | --- | --- | --- |
| 1.1 | Face identifiers | `bootstrap`, `unexcluded`, `tailwindcss` | The `Face` type, the `TAILWIND_READINGS` keys, and the `unexcluded` field of `app/browser/recipe.json` already use these three values. | verdict R7; `tests/setupBrowser.ts:145`; guide § Tailwind record |
| 1.2 | Label of `bootstrap` | `Bootstrap only` | The label is in use, names the sheet set exactly, and P4 measured it at 90.25 px wide at 390 px. | `app/browser/constants.ts:32`; P4 |
| 1.3 | Label of `unexcluded` | `Tailwind without the layer` | It forms a minimal pair with 1.4 that names the one difference between the two Tailwind faces, and P4 measured it at 144.97 px wide at 390 px with no overflow. | verdict § 5, § 10 item 2; P4 |
| 1.4 | Label of `tailwindcss` | `Tailwind with the layer` | The verdict default is kept over `Bootstrap with Tailwind`, which names no difference from the `unexcluded` face, and over `Bootstrap for Tailwind`, which reads as an anagram of a face label beside `Tailwind without the layer`; the collision of "layer" with CSS cascade layers is closed by rule 7.1. | verdict § 5, R6, § 10 item 2 |
| 1.5 | Toggle order | `bootstrap`, `unexcluded`, `tailwindcss` | The order matches the caption form "Bootstrap only: … Without the layer: … With the layer: …", so a reader scans buttons and captions in one order. | verdict § 5 |
| 1.6 | Group accessible name | `Stylesheets`, with no visible group title | The name tells a page visitor what the buttons change, the header has no width for a visible title at 390 px, and `readShowcaseChrome` and `applyFace` find the group by this name. | `app/browser/factories.ts:786`; `tests/setupBrowser.ts:944` |
| 1.7 | Default face on load | `bootstrap` | `Showcase.start` mounts under the Bootstrap face, and every departure is read against it. | `app/browser/Showcase.ts:57-81`; verdict R5 |
| 1.8 | State carrier | None: no URL fragment, no query, no storage; a reload returns to `bootstrap` | The face lives only in the connected `style` elements and the pressed buttons, and the color mode follows the same rule. | `app/browser/Showcase.ts:165-187`; `app/browser/main.ts` |
| 1.9 | Status sentence | `LABEL, THEME color mode`, where `LABEL` is the face label and `THEME` is `light` or `dark`; for example `Tailwind without the layer, dark color mode` | `describeState` keeps its form and reads the label from `FACES`, so the third face needs no other string. | `app/browser/helpers.ts:115-129` |
| 1.10 | Where the face descriptions show | In the Tailwind section's introduction (rulings 2.5 to 2.7), one paragraph per face in toggle order, never in the header | The header has no width for three description lines at 390 px, and the descriptions explain the specimens that follow them. | P4; verdict § 5 |
| 1.11 | Description of `bootstrap` | `<strong>Bootstrap only</strong> holds the built <code>./bootstrap</code> sheet alone, the baseline every departure is read against.` | The face proves the baseline that the partition reads every departure against. | verdict R5, R7 |
| 1.12 | Description of `unexcluded` | `<strong>Tailwind without the layer</strong> holds the compile of the following recipe without its <code>@orkestrel/veneer/tailwindcss</code> import, before that same <code>./bootstrap</code> sheet: Tailwind's <code>collapse</code> and <code>container</code> utilities reach Bootstrap's components, and Bootstrap's important utilities outrank Tailwind's on every name both declare.` | The face is the failing control that shows what the layer prevents, with the two witnesses P5 reads. | verdict R7, § 5; P5 rows `.collapse` and `.container` |
| 1.13 | Description of `tailwindcss` | `<strong>Tailwind with the layer</strong> holds the compile of the whole recipe alone, whose <code>@orkestrel/veneer/tailwindcss</code> import is the layer, Bootstrap for Tailwind: Tailwind wins at every conflict, and Bootstrap's components keep their look.` | The sentence defines "the layer" on the page and states the tenet the partition proves. | verdict R6, R9 |
| 1.14 | Guide § Faces table (U7) | Columns `Face`, `Sheets in the document`, `What the face proves`; rows: `Bootstrap only` / `` `style#veneer-bootstrap`, the built `./bootstrap` sheet `` / `The baseline every departure is read against`; `Tailwind without the layer` / ``the recipe compile without the `@orkestrel/veneer/tailwindcss` import, directly before `style#veneer-bootstrap` `` / ``Tailwind's `collapse` and `container` utilities reach Bootstrap's components, and Bootstrap's important utilities outrank Tailwind's on every shared utility name``; `Tailwind with the layer` / `the recipe compile alone, which embeds Bootstrap for Tailwind` / `Tailwind wins at every conflict, and Bootstrap's components keep their look` | The guide repeats the page's three descriptions so the two never disagree. | guide § Faces; verdict § 7 |

## 2. Group title, section, and introduction

The following table rules the Tailwind group and its section:

| Id | Item | Ruling | Reason | Source |
| --- | --- | --- | --- | --- |
| 2.1 | Group title (`GROUPS`, id `tailwindcss`) | `Tailwind` | The title matches the one-noun titles of the other groups and retires `Bootstrap with Tailwind`, the retired face label (rule 7.12). | `app/browser/constants.ts:75-85` |
| 2.2 | Section count | One section, id `tailwindcss` | The section census admits `TAILWIND_CLASSES` and the `hidden` attribute for this one id, and J4 places the portfolio frame on this one region. | `tests/app/browser/sections/integration.test.ts:18`; `tests/app/browser/integration.test.ts:336` |
| 2.3 | Section title | `Tailwind on Bootstrap markup` (kept) | The title stays true under three faces and is the region name J4 reads. | `app/browser/constants.ts:531` |
| 2.4 | Section lead | `Bootstrap markup and Tailwind utilities under the three faces, from bare elements through curated components to the utility names both systems declare.` | `Section.lead` is one sentence, and this one names the walk of § 4. | `app/browser/types.ts:115-132`; § 4 |
| 2.5 | Introduction, opening paragraph (replaces the alert text at fragment lines 1-5) | `The Stylesheets buttons in the header switch the whole page between three faces, and the specimens in this section show where the faces differ.` | The reader learns that the toggle reaches every section and that this section is the comparison. | verdict R7; P4 |
| 2.6 | Introduction, face paragraphs | Rulings 1.11, 1.12, and 1.13, in that order, after 2.5 | The descriptions sit beside the recipe they cite. | ruling 1.10 |
| 2.7 | Introduction, what to look for (after the face paragraphs) | `Switch faces and compare: an element that carries a utility name both systems declare, such as the <code>mt-3</code> class, reads Bootstrap's value without the layer and Tailwind's with it; a component name both declare, such as the <code>collapse</code> class, keeps Bootstrap's rule alone with the layer; a heading, paragraph, or link that carries a component class keeps Bootstrap's reboot through a curated copy; and a bare element reads Tailwind's preflight.` | The sentence names the departures a reader can see, in the order of § 4. | verdict R1, R2, R4, R5; P5 |
| 2.8 | Counts on the page | The page states no count of shared utility names or shared component names; the guide states 192 and 17 beside the case that pins each | A page count goes stale without a failing case, and `AGENTS.md` § Writing admits a number only as a measurement with its run. | `/home/user/scaffold/AGENTS.md` § Writing; verdict R1, R2 |
| 2.9 | Introduction paragraph spacing | Each introduction paragraph carries `mb-2` and the last one `mb-0` | A bare `p` inside the alert reads preflight's 0 px margin under the `tailwindcss` face, and the `mb-2` class reads 8 px on both scales. | verdict R5 (a bare element inside a component is Tailwind's); measurements M5 (`.mt-3` is `calc(var(--spacing) * 3)`) |
| 2.10 | Recipe hint (fragment line 6) | `Scroll sideways to read the complete recipe.` (kept) | The hint stays true; the recipe keeps its three lines. | verdict § 3 |
| 2.11 | Recipe region name (fragment line 11) | `Tailwind recipe` (kept), and the recipe text at fragment lines 12-14 kept | The recipe is unchanged by the flip. | verdict § 3 |

## 3. Captions

Ruling 3.0: every caption takes one of the following five forms, chosen by which faces agree:

| Faces that agree | Form |
| --- | --- |
| None | `Bootstrap only: … Without the layer: … With the layer: …` |
| `bootstrap` and `unexcluded` | `Bootstrap only and without the layer: … With the layer: …` |
| `unexcluded` and `tailwindcss` | `Bootstrap only: … Both Tailwind faces: …` |
| `bootstrap` and `tailwindcss` | `Bootstrap only and with the layer: … Without the layer: …` |
| All three | `Every face: …` |

Reason for 3.0: the verdict prescribes the three-face form and the collapse of agreeing faces, and these five phrasings are the only collapses (verdict § 5).

### Existing captions in the fragment

Only the fragment names Tailwind, the mirror, the recipe, exemptions, or `revert-layer`; `grep -i` over `app/browser/sections/*.html`, `constants.ts`, `factories.ts`, `helpers.ts`, `templates.ts`, `Showcase.ts`, and `types.ts` finds no caption elsewhere. The following list rules each fragment specimen; the id `T` means the caption title span, `C` the `<code>` class list, `B` the specimen's own text, and `X` the explanatory caption span.

- **3.1 `fragment:17-31`, padding.** T `Tailwind padding on a Bootstrap button` kept; C `btn btn-primary px-8` kept; X (lines 26-29) rewritten to `Bootstrap only: 12 px inline padding. Both Tailwind faces: 32 px, because the <code>px-8</code> class is a Tailwind utility and the <code>btn</code> class keeps Bootstrap's rule.` Reason: the old text names the retired label `Bootstrap with Tailwind`. Source: P5 `button padding-left` (12px, 32px, 32px).
- **3.2 `fragment:33-56`, spacing.** T (line 46) rewritten to `Shared spacing, border, and radius`; C (line 48) rewritten to `d-flex gap-4 mt-3 border rounded`; X (lines 49-53) rewritten to `Bootstrap only and without the layer: the <code>mt-3</code> class reads 16 px, the <code>gap-4</code> class 24 px, the <code>rounded</code> class 6 px, and the <code>border</code> class draws in Bootstrap's border color. With the layer: 12 px, 16 px, and 4 px, and the border takes the text color, because Tailwind owns every utility name both systems declare.` Reason: the old title and text claim that Bootstrap's scale holds through its important rules, which the flip reverses. Source: P5 `.mt-3` (16px, 16px, 12px), `.gap-4` (24px, 24px, 16px), `span.rounded` (6px, 6px, 4px); measurements M3 (`border` color rgb(222, 226, 230) to the text color); verdict R1.
- **3.3 `fragment:57-77`, collapse.** T (line 69) rewritten to `Collapse, a name both systems declare`; C `collapse show` kept; B (lines 62-63) rewritten to `This panel shows wherever Bootstrap's collapse rule applies alone.`; X (line 73) rewritten to `Bootstrap only and with the layer: the open panel shows. Without the layer: Tailwind's <code>collapse</code> utility also applies and sets visibility to collapse, which hides the panel.` Reason: the old title and text claim the panel stays visible under every face, and the `unexcluded` face hides it. Source: P5 `.collapse visibility` (visible, collapse, visible); verdict R2.
- **3.4 `fragment:78-99`, container.** T (line 91) rewritten to `Container, a name both systems declare`; C `container` kept; B (line 84) rewritten to `A Bootstrap container holds this line inside the card.`; X (line 95) rewritten to `Every face: 12 px inline padding. Bootstrap only and with the layer: a 1140 px maximum width in a 1280 px viewport. Without the layer: 1280 px, because Tailwind's <code>container</code> utility also applies.` Reason: the old title and text claim Bootstrap's widths under every face, and the `unexcluded` face reads 1280 px. Source: P5 `.container padding-left` (12px ×3), `max-width` at 1280 (1140px, 1280px, 1140px) and at 390 (none ×3).
- **3.5 `fragment:100-121`, pill radius.** T `Pill radius beside rounded-full` kept; C kept; X (lines 115-118) rewritten to `Every face: Bootstrap's pill radius, because the <code>rounded-pill</code> class keeps Bootstrap's important rule, which outranks Tailwind's <code>rounded-full</code> class under both Tailwind faces.` Reason: the old text inflects a code token (`rounded-pill`'s) and names the retired face term. Source: P5 `button border-top-left-radius` (800px ×3); `rounded-pill` sits in the exclusion statement of `src/tailwindcss/_tokens.scss`.
- **3.6 `fragment:122-152`, grid.** T and C kept; X (line 148) rewritten to `Bootstrap only: the figures stack in a block. Both Tailwind faces: a three-column grid, with a 16 px gap without the layer and a 12 px gap with it, because the <code>gap-3</code> class is a shared utility.` Reason: the gap departs between the two Tailwind faces and the reader sees it. Source: P5 `.grid display` (block, grid, grid); measurements M3 (`gap-3` 16px to 12px); verdict R1.
- **3.7 `fragment:153-173`, md variant.** T and C kept; X (lines 167-170) rewritten to `Bootstrap only: stacked blocks. Both Tailwind faces: a flex row from the md breakpoint and stacked blocks narrower than it, with a 16 px gap without the layer and a 12 px gap with it.` Reason: the old text names the retired label, and the same `gap-3` departure shows here. Source: P5 `.md\:flex display` (block, flex, flex at 1280; block ×3 at 390); measurements M3.
- **3.8 `fragment:174-193`, arbitrary value.** T and C kept; X (line 189) rewritten to `Bootstrap only: 0 px top margin. Both Tailwind faces: 16 px.` Reason: the old text names the retired label. Source: P5 `.mt-\[1rem\]` (0px, 16px, 16px).
- **3.9 `fragment:194-223`, bare image and list.** T `Bare image and list` kept; C `img ul` kept; B (lines 198-207) rewritten to `A bare image` + the image + `sits inline with the text under Bootstrap only.`; B (lines 209-210) rewritten to the two items `A bare list shows bullets` and `under Bootstrap only`; X (lines 217-220) rewritten to `Bootstrap only: the image sits inline and the list shows bullets. Both Tailwind faces: preflight makes the image a block and removes the bullets, because the reboot declares neither property.` Reason: the old text claims the recipe reverts preflight, which the flip removes. Source: P5 `img display` (inline, block, block), `ul list-style-type` (disc, none, none); measurements M2 (rows that move under B, C, and D alike); verdict R4.
- **3.10 `fragment:224-248`, decoration.** T and C kept; X (lines 241-245) rewritten to `Bootstrap only: none of these classes has a rule, so the disc has no size and the name is plain text. Both Tailwind faces: a sky disc with a shadow, and a ringed, letter-spaced name.` Reason: only the retired label changes. Source: `app/browser/constants.ts:1208-1223` (`TAILWIND_CLASSES`).
- **3.11 `fragment:249-275`, dividers and spacing.** T and C kept; X (lines 269-272) rewritten to `Bootstrap only: no lines between the invoices and no space between the steps. Both Tailwind faces: dividing lines between the invoices and space between the steps.` Reason: the old text names the retired label and uses "rules" for drawn lines, which reads as CSS rules. Source: `TAILWIND_CLASSES` (`divide-y`, `space-y-2`).
- **3.12 `fragment:276-302`, hidden attribute.** T `Hidden attribute with a display utility` kept; C kept; B (lines 284-287) rewritten to `The row before this line shows under Bootstrap only and disappears under both Tailwind faces.`; X (lines 295-299) rewritten to `Bootstrap only: display flex, because the important rule of the <code>d-flex</code> class outranks Bootstrap's [hidden] rule. Both Tailwind faces: display none, because preflight's [hidden] rule is an important declaration inside a cascade layer, which outranks every unlayered important declaration.`; the sentence `This is the recipe's named departure.` is deleted. Reason: the exemption table that named this departure is gone, and the departure is one preflight departure among others. Source: P5 `[hidden] display` (flex, none, none); measurements M1; verdict R4, R8.

### Added specimens

The flip adds the following specimens, each with its title, class list, text, and caption. The specimen text uses the page's ferry and harbor data and collides with no accessible name on the page (`grep` over `app/browser` and `tests`).

- **3.13 Card.** T `Bootstrap card on Tailwind's reset`; C `card card-body card-title card-text btn btn-primary p`; B: `h5.card-title` `Coastal ferry`, `p.card-text` `Departs the north pier every 40 minutes.`, a bare `p` `Timetables change on public holidays.`, `button.btn.btn-primary` `View timetable`; X `Every face: the <code>card-title</code> heading keeps weight 500 and the <code>card-text</code> paragraph keeps its 16 px bottom margin. Bootstrap only and without the layer: the bare paragraph keeps 16 px too. With the layer: the bare paragraph reads preflight's 0 px, while curated copies of the reboot hold the title and the text.` Reason: Bootstrap's documented card shows the plainest departure beside the curated copies that prevent it. Source: verdict § 4 named cases, § 5; P5 `.card-title font-weight` (500 ×3), `.card-text margin-bottom` (16px ×3), `#bare-paragraph` (16px, 16px, 0px).
- **3.14 Bare heading.** T `Bare heading beside a heading class`; C `h5 p.h5`; B: `h5` `A bare h5 heading`, `p.h5` `A paragraph with the h5 class`; X `Bootstrap only and without the layer: both read 20 px. With the layer: the bare <code>h5</code> element reads preflight's 16 px, and the <code>h5</code> class keeps Bootstrap's 20 px.` Reason: the reader sees that a class compound keeps the reboot where a bare element does not. Source: verdict R4, § 5; P5 `#bare-heading font-size` (20px, 20px, 16px), `.h5` (20px ×3).
- **3.15 Icon button.** T `Icon in a Bootstrap button`; C `btn btn-primary bi`; B: `button.btn.btn-primary` holding the `calendar-event` icon and `Book a crossing`; X `Bootstrap only and with the layer: the icon sits inline beside the label. Without the layer: preflight makes the <code>svg</code> element a block, which puts the icon on a line of its own.` Reason: the restore row's effect is visible only against the `unexcluded` face. Source: verdict § 4 (`svg:where(.bi)` restore row), § 5; P5 `svg.bi display` (inline, block, inline); `app/browser/templates.ts:41`.
- **3.16 Figure image.** T `Image in a Bootstrap figure`; C `figure figure-img figure-caption`; B: `figure.figure` holding `img.figure-img` (alt `Hills behind the north pier`, no `img-fluid` and no `rounded` class) and `figcaption.figure-caption` `North pier at dusk.`; X `Bootstrap only and with the layer: the image displays inline. Without the layer: preflight makes it a block.` Reason: the class list leaves out `rounded`, a shared utility, so the specimen shows the restore row alone. Source: verdict § 4 (`img:where(.figure-img)` restore row); measurements M3 (the `display` row on `img.figure-img`); guide curation table.
- **3.17 Titles.** T `Bootstrap modal and offcanvas titles`; C `modal-title fs-5 offcanvas-title`; B: `h1.modal-title.fs-5` `Crossing details`, `h5.offcanvas-title` `Crossing filters`; X `Every face: both titles read Bootstrap's heading size at weight 500. With the layer, the <code>fs-5</code> class sets the modal title's size and curated copies of the reboot's heading rules hold the rest.` Reason: Bootstrap documents exactly this title markup, and the verdict adds it to the curation population. Source: verdict § 4 named cases, § 5, § 10 item 7; guide curation rows `modal-title` and `offcanvas-title`.
- **3.18 Alert link.** T `Link in a Bootstrap alert`; C `alert alert-info alert-link`; B: `div.alert.alert-info.mb-0` holding `The 18:40 crossing leaves late. ` and `a.alert-link` `See the revised time`, then `.`; X `Every face: the link keeps its underline. With the layer, a curated copy of the reboot's link rule holds it against preflight, which removes the underline from a bare link.` Reason: the witness shows the link family of curation rows. Source: guide curation row `alert-link` (`text-decoration-line`); measurements M2 (`a[href]` underline to none under C).
- **3.19 Pagination.** T `Bootstrap pagination list`; C `pagination page-item page-link`; B: `nav` named `Timetable pages` holding `ul.pagination` with no `mb-0` class and three `li.page-item > a.page-link` items `Early`, `Midday`, `Late`; X `Every face: the list keeps its 16 px bottom margin. With the layer, a curated copy of the reboot's list rule holds it against preflight's 0 px.` Reason: the Pagination section's `pagination mb-0` markup hides the margin the curated copy keeps, so this witness omits `mb-0`. Source: guide curation row `pagination` (`margin-bottom`); `app/browser/sections/pagination.html:6`.
- **3.20 Table.** T `Bootstrap table with bare cells`; C `table th td`; B: `table.table.mb-0` with header cells `Ferry` and `Departs` and rows `Coastal ferry` / `08:20` and `Island shuttle` / `09:05`; X `Every face: each cell's bottom border takes the table's border color. With the layer, a scoped copy of the reboot's cell rule holds it against preflight, which gives a bare cell's border the text color.` Reason: the cells carry no class, so only the `scoped` row form keeps them, as R5 rules. Source: verdict R5 (`scoped` row `.ROOT TAG`, the `.table` cells' `border-color: inherit`). See open item 1.
- **3.21 Checkbox.** T `Bootstrap checkbox`; C `form-check form-check-input form-check-label`; B: `div.form-check` holding `input.form-check-input` (type `checkbox`) and `label.form-check-label` `Include night crossings`; X `Bootstrap only and with the layer: the checkbox keeps the browser's own text color. Without the layer: preflight makes it inherit the page's text color.` Reason: the caption names the computed difference the restore row repairs, though Bootstrap draws the box from its background and the change shows on no mark. Source: verdict § 4 (`color: revert` restore rows); guide curation row `input:where(.form-check-input)`.
- **3.22 Border width.** T `Border width without a border style`; C `border-1`; B: `div.border-1.bg-body-tertiary.px-2` `Platform edge`; X `Bootstrap only: no line, because the <code>border-1</code> class sets a width and no style. Both Tailwind faces: a 1 px line, because preflight gives every element a solid border style.` Reason: the verdict grafts this reading into `TAILWIND_READINGS`. Source: verdict § 5; P5 `.border-1 border-top-width` (0px, 1px, 1px).
- **3.23 Responsive alignment.** T `Responsive alignment at the md breakpoint`; C `text-center text-md-start`; B: `p.text-center.text-md-start.mb-0` `Boarding closes 10 minutes before departure.`; X `Every face: centered narrower than the md breakpoint and left-aligned from it, because the <code>text-md-start</code> class keeps Bootstrap's important rule, which outranks the <code>text-center</code> class from md even where Tailwind owns it.` Reason: this reading separates withholding from a counter sheet, and P5 reads `left`, so the caption says left-aligned. Source: verdict R1, § 5, § 12; P5 row at 768 px (left, left, left).

## 4. Specimen order

The section walks the specimens in the following order; U5b places them in it, inside the existing `row row-cols-1 row-cols-xl-2 g-4` grid:

1. `Bootstrap card on Tailwind's reset` (3.13)
2. `Bare heading beside a heading class` (3.14)
3. `Bare image and list` (3.9)
4. `Hidden attribute with a display utility` (3.12)
5. `Icon in a Bootstrap button` (3.15)
6. `Image in a Bootstrap figure` (3.16)
7. `Bootstrap modal and offcanvas titles` (3.17)
8. `Link in a Bootstrap alert` (3.18)
9. `Bootstrap pagination list` (3.19)
10. `Bootstrap table with bare cells` (3.20)
11. `Bootstrap checkbox` (3.21)
12. `Collapse, a name both systems declare` (3.3)
13. `Container, a name both systems declare` (3.4)
14. `Tailwind padding on a Bootstrap button` (3.1)
15. `Tailwind grid in a card body` (3.6)
16. `Tailwind variant at the md breakpoint` (3.7)
17. `Arbitrary margin value` (3.8)
18. `Tailwind color, ring, shadow, and size` (3.10)
19. `Tailwind dividers and vertical spacing` (3.11)
20. `Shared spacing, border, and radius` (3.2)
21. `Border width without a border style` (3.22)
22. `Pill radius beside rounded-full` (3.5)
23. `Responsive alignment at the md breakpoint` (3.23)

The following rulings give the reason for each run of that order:

- **4.1 Runs.** Bare elements (1-4), curated copies (5-11), shared component names (12-13), Tailwind's own utilities (14-19), shared utility names (20-23). Reason: the walk follows rule 2.7 and moves from the departure a reader sees first to the conflicts where both systems declare one name. Source: brief of this unit; verdict R1, R2, R4, R5.
- **4.2 Bare elements.** The card opens the walk, because its bare paragraph's margin is the plainest departure and its curated title and text sit beside it; the bare heading follows with a class compound that keeps the reboot; the bare image and list follow because they depart under both Tailwind faces; the `hidden` specimen closes the run as the one departure on an attribute rule. Source: P5; measurements M2.
- **4.3 Curated copies.** The restore rows come first (icon, figure image), because their effect shows against the `unexcluded` face; the reboot rows follow from heading to link to list to table cell; the checkbox closes the run because its difference shows on no mark. Source: verdict § 4; guide curation table.
- **4.4 Shared component names.** Collapse precedes container, because the hidden panel is the larger visible change. Source: P5.
- **4.5 Tailwind's own utilities.** Padding opens the run, because `px-8` is the witness `assertFace` reads beside `mt-3`; the five specimens after it keep their order from the fragment. Source: verdict R7; fragment.
- **4.6 Shared utility names.** Spacing, border, and radius open the run with the largest visible change; `border-1` follows as the border case; the pill radius shows a Bootstrap-only important class beside a Tailwind class; the responsive alignment closes the walk as the reading that proves withholding. Source: verdict R1, § 5; P5.
- **4.7 `d-flex` placement.** The `hidden` specimen sits with the bare elements, never with the shared utility names, because `d-flex` is a Bootstrap-only name in the exclusion statement of `src/tailwindcss/_tokens.scss`, and the departure comes from preflight's `[hidden]` rule. Source: verdict R3, R4; measurements M1.

## 5. The 390 px header

The following table rules the header:

| Id | Item | Ruling | Reason | Source |
| --- | --- | --- | --- | --- |
| 5.1 | Toggle location | The header, in the `Stylesheets` group | A face changes every section, not only the Tailwind section, and the statechart tables, J2, and J4 drive the header buttons. | `app/browser/Showcase.ts:165-187`; `tests/app/browser/integration.test.ts:203`, `:311`, `:1004` |
| 5.2 | Face buttons | `Bootstrap only`, `Tailwind without the layer`, `Tailwind with the layer`, in that order | The labels and order are rulings 1.2 to 1.5. | § 1 |
| 5.3 | What each face button does | `Bootstrap only`: the document holds `style#veneer-bootstrap` alone. `Tailwind without the layer`: the document holds the `unexcluded` compile directly before `style#veneer-bootstrap`. `Tailwind with the layer`: the document holds the recipe compile alone. Each press sets `aria-pressed="true"` on its button, `false` on the other two, and writes the status sentence of 1.9. | The button behavior follows the face definitions. | verdict § 5, R7 |
| 5.4 | Color mode group and status | `Light` and `Dark` in the `Color mode` group, then the status line named `Showcase state`, all kept | The flip changes no color mode copy. | `app/browser/constants.ts:44-47`; `app/browser/factories.ts:777-788` |
| 5.5 | Layout at 390 px | The three face buttons stay on one row inside the 366 px content width, and each label wraps to two lines inside its button; the Color mode group and the status wrap to rows of their own; no label is shortened to avoid the wrap | P4 reads a 52 px button height, no group past the viewport, and no button on a row of its own, and a shorter label loses the minimal pair of 1.3 and 1.4. | P4 (group box 366 px wide, `buttons wrap to separate rows: false`, `group extends past viewport: false`) |
| 5.6 | Check for the final strings | U5b reruns P4 with the label `Tailwind with the layer` in place of the measured `Bootstrap with Tailwind` | P4 measured `Bootstrap with Tailwind` (132.78 px), which has the same 23 characters but not the same glyphs. | verdict § 8 item 6 (U5b acceptance) |

## 6. Chrome replacement copy

The following rulings cover the chrome replacements of verdict § 5:

- **6.1 No visible text changes.** The replacements (`h-100` to `d-flex` on the `.col` plus `flex-fill` on the card, card-body `w-100` to `flex-fill`, `gap-3` to `row-gap-3 column-gap-3`, `rounded` to `rounded-2`, `border` to the four side classes) change `class` attributes only. Reason: no caption `<code>` list, title, lead, or text names a chrome class; the class lists name specimen classes, which keep their classes. Source: `grep` of `h-100`, `w-100`, `gap-3`, `rounded`, and `border` outside `class` attributes in `app/browser/sections/*.html`, `constants.ts`, `factories.ts`, `helpers.ts`, and `templates.ts` finds them only in specimen class lists (`progress.html:50`, `tailwindcss.html:146`, `tailwindcss.html:166`); P4 ("Specimen content keeps its classes").
- **6.2 Guide sentence (U7).** The guide sentence ``Paired specimen cards in one grid row share one height, because each figure carries `card h-100`.`` becomes ``Paired specimen cards in one grid row share one height, because each column carries the `d-flex` class and each figure the `flex-fill` class.`` Reason: the guide states the mechanism that P4 reads. Source: guide § Showcase; verdict § 5.
- **6.3 TSDoc (U5b).** The `createFigure` contract ``A `figure.card.h-100` labelled by its caption title`` becomes ``A `figure.card.flex-fill` labelled by its caption title``, and its remark `The figure fills its grid column` stays. Reason: the contract names the classes the factory writes; it is developer prose, not page text. Source: `app/browser/factories.ts:444-462`.

See open item 2 for the section's alert and recipe block.

## 7. Vocabulary

Every label, caption, guide sentence, and test title uses the following words, each with one meaning:

| Id | Word | Meaning | Where it appears | Source |
| --- | --- | --- | --- | --- |
| 7.1 | the layer | Bootstrap for Tailwind as the recipe's `@orkestrel/veneer/tailwindcss` import brings it; in page copy and face labels only. A cascade layer always appears with its name, such as the `base` layer, and never as bare "layer" in the same text. | Face labels, captions, the introduction | verdict § 5, R6 |
| 7.2 | Bootstrap for Tailwind | What the `./tailwindcss` sheet is. | Introduction (1.13), guide | verdict R6, R9 |
| 7.3 | the `./tailwindcss` sheet | The built export, where the export path matters. | Guide, test titles | verdict § 3 |
| 7.4 | the recipe | The three-line Tailwind entry: the order statement, `@import 'tailwindcss';`, `@import '@orkestrel/veneer/tailwindcss';`. Its output is the recipe compile. | Page, guide, test titles | verdict § 3 |
| 7.5 | Tailwind compatibility sheet | Kept only as the guide heading, whose anchor other pages link; its first sentence names the sheet Bootstrap for Tailwind. Prose never says "compatibility sheet". | Guide heading | verdict R9 |
| 7.6 | tuned | A build-form adjective beside "lifted" and "drop-in", for the derivation of the `./tailwindcss` sheet; never on the page or in a face label. | Guide build sections, `src:tailwindcss` test titles | `tests/src/tailwindcss/index.test.ts:102`; verdict § 3 |
| 7.7 | face | One of the three sheet sets the `Stylesheets` buttons select; the page names a face by its label, the guide and test titles by its identifier. | Page, guide, titles | verdict R7 |
| 7.8 | both Tailwind faces | The `unexcluded` and `tailwindcss` faces together. | Captions, guide, titles | ruling 3.0 |
| 7.9 | departure | A reading under a Tailwind face that differs from the `bootstrap` face on the same element, longhand, and variant. | Introduction, guide, titles | verdict R5 |
| 7.10 | shared utility name | One of the 192 utility class names both Bootstrap's `$utilities` map and Tailwind generate; Tailwind owns it under the layer. The page writes "a utility name both systems declare". | Guide, titles; page by paraphrase | verdict R1 |
| 7.11 | shared component name | One of the 17 component names both systems declare (`collapse`, `container`, `col-*`, `table`, `caption-top`); Bootstrap keeps it. The page writes "a component name both declare". | Guide, titles; page by paraphrase | verdict R2 |
| 7.12 | curated, curated copy | A component class whose elements keep the reboot's declarations; a curated copy is the reboot rule restricted to that class. The guide names the three row forms `reboot`, `restore`, and `scoped`, and the table "the curation table". | Page, guide, titles | verdict R5, § 4 |
| 7.13 | preflight, the reboot | Tailwind's reset in the `base` layer; Bootstrap's reset. | Page, guide | verdict R4 |

The flip retires the following words; each takes its replacement everywhere, the guide and test titles included:

| Id | Retired word | Replacement | Source |
| --- | --- | --- | --- |
| 7.14 | `mirror`, `preflight mirror` | No replacement for the mechanism; for its effect, "the reboot's element rules in the `reset` layer" or "preflight wins" | verdict R4, R8 |
| 7.15 | `exemption`, `exemption table`, `exempt` | "curation", "the curation table", "curated" | verdict R8 |
| 7.16 | `Tailwind bends` and `Bootstrap bends` | "Tailwind wins at every conflict" | verdict R9 |
| 7.17 | `revert-layer` as a user-facing term | Never on the page or in a face label; the guide names `revert` only for a restore row | verdict R1, R5 |
| 7.18 | `stylesheet set`, `both stylesheet sets`, `either stylesheet set` | "face", "the three faces", "each face"; the group's accessible name `Stylesheets` stays | rulings 1.6, 7.7 |
| 7.19 | `Bootstrap with Tailwind` | `Tailwind with the layer` for the face, `Tailwind` for the group | rulings 1.4, 2.1 |
| 7.20 | `the Tailwind face`, `the layer face` | "the `tailwindcss` face" in the guide, "the tailwindcss face" in test titles | ruling 7.7 |
| 7.21 | `unexcluded` on the page | `Tailwind without the layer`; the identifier stays in code, the guide, and test titles | ruling 1.3 |

## 8. Test titles

Titles follow the repository style read in `tests/app/browser/*.test.ts` and `tests/setupBrowser.test.ts`: lower case first word, a present-tense verb whose subject is the describe block, no closing period, journey titles opening with `J` and the number. The following rulings set the titles:

- **8.1 Face statechart rows (`FACE_SCENARIOS`, U6).** Nine rows, one per starting face per button, in toggle order of the starting face, then of the button; each `transition.name` follows the existing pattern `FROM becomes TO through the LABEL button` or `FROM stays FROM through the LABEL button`. Reason: `FACE_SCENARIOS` enumerates starting face × pressed button today (4 rows), not load, toggle, and toggle back. Source: `tests/setupBrowser.ts:1140-1186`; verdict R7. The nine names:
  - `bootstrap stays bootstrap through the Bootstrap only button`
  - `bootstrap becomes unexcluded through the Tailwind without the layer button`
  - `bootstrap becomes tailwindcss through the Tailwind with the layer button`
  - `unexcluded becomes bootstrap through the Bootstrap only button`
  - `unexcluded stays unexcluded through the Tailwind without the layer button`
  - `unexcluded becomes tailwindcss through the Tailwind with the layer button`
  - `tailwindcss becomes bootstrap through the Bootstrap only button`
  - `tailwindcss becomes unexcluded through the Tailwind without the layer button`
  - `tailwindcss stays tailwindcss through the Tailwind with the layer button`
- **8.2 Statechart case.** `drives the $family header table through the header buttons` kept; the pair rows keep the pattern `FACE and THEME through both header buttons` and number 6. Reason: the case title names no face count. Source: `tests/app/browser/integration.test.ts:1022`; `tests/setupBrowser.ts:1287-1308`.
- **8.3 Partition proof (U6).** `reads the resolved values under its declared variant and partitions every departure of the tailwindcss face` replaces `reads the resolved values under its declared variant and both stylesheet sets`. Reason: the case still reads the resolved values per variant, and the partition replaces the equality between two faces; the `unexcluded` face and the stripped-curation copy stay controls inside the case. Source: `tests/app/browser/integration.test.ts:826`; verdict § 5.
- **8.4 J4 (U6).** `J4 compares the three faces through the Stylesheets buttons` replaces `J4 compares the two stylesheet sets through the Stylesheets buttons`; its wait descriptions read `the status names the unexcluded face`, `the status names the tailwindcss face`, and `the status names the bootstrap face`. Reason: J4 presses all three buttons. Source: `tests/app/browser/integration.test.ts:311-353`; verdict § 6.
- **8.5 J2 (U6).** `J2 reaches the skip link, the five header buttons, the contents, and a specimen field by keyboard` replaces `the four header buttons`. Reason: the header holds three face buttons and two color mode buttons. Source: `tests/app/browser/integration.test.ts:203-214`.
- **8.6 J6 (U6).** `J6 speaks no engine vocabulary under each face` replaces `under either stylesheet set`, and J6 visits all three faces. Reason: the status sentence is the one face-dependent text, and it carries each label. Source: `tests/app/browser/integration.test.ts:355-365`.
- **8.7 `assertFace` wait description (U6).** `the status names the selected face` replaces `the status names the selected stylesheet set`. Source: `tests/setupBrowser.ts:1084-1091`.
- **8.8 Showcase cases (U5b).** `holds the recipe compile alone under the tailwindcss face` and `inserts the unexcluded compile directly before the Bootstrap sheet under the unexcluded face` replace `inserts the Tailwind compile directly before the Bootstrap sheet under the Tailwind face`; `mounts the page under the Bootstrap face and the light color mode` is kept. Reason: each face holds a different set of `style` elements, and the kept title stays true. Source: `tests/app/browser/Showcase.test.ts:64`, `:94`; verdict § 5.
- **8.9 Constants case (U5b).** `labels the stylesheet and color-mode buttons and titles the page` is kept. Reason: the `Stylesheets` group keeps its name. Source: `tests/app/browser/constants.test.ts:298`.
- **8.10 Setup cases (U6).** `reads the face and color mode the header buttons announce` replaces `reads the stylesheet set and color mode the header buttons announce`; `refuses a face group that announces two faces or none, and an absent button` replaces `refuses a pair that announces both or neither, and an absent button`; `select a face and a color mode through the header buttons` replaces `select a stylesheet set and a color mode through the header buttons`; `reads every Tailwind reading the caption claims under the three faces` replaces `under both stylesheet sets`; `drives every face and color-mode row through the header buttons` replaces `drives every stylesheet-set and color-mode row through the header buttons`. Reason: rule 7.18. Source: `tests/setupBrowser.test.ts:702`, `:718`, `:762`, `:827`, `:1411`.
- **8.11 `TAILWIND_READINGS` specimen keys (U6).** Each row's `specimen` equals the title of § 3 for its specimen, so the rows of the retitled specimens 3.2, 3.3, and 3.4 take `Shared spacing, border, and radius`, `Collapse, a name both systems declare`, and `Container, a name both systems declare`. Reason: `resolveSpecimen` finds a specimen by its caption title. Source: `tests/setupBrowser.ts:198-300`, `:740-746`.

## Open items

1. open: Does the curation table that `flip-probe-3` derives under `tmp/probes/flip4/` carry a `scoped` row for the `.table` cells' border color, which caption 3.20's with-the-layer clause requires?
2. open: Do the section's alert (`alert alert-secondary mb-4`, fragment line 1) and recipe block (`bg-body-tertiary border rounded p-3 mb-4`, fragment line 8) count as chrome that takes the replacement classes, or as section content that reads Tailwind's scale under the `tailwindcss` face?
3. open: Does the case `compares paired open engine states under both faces and switches a shown popover` keep an equality between the `bootstrap` and `tailwindcss` faces or become a partition over three faces, which decides its title?

## Counts and sweep

This document holds 98 rulings and 3 open items. The rulings by section: § 1 holds 14, § 2 holds 11, § 3 holds 24, § 4 holds 8 (the order and 4.1 to 4.7), § 5 holds 6, § 6 holds 3, § 7 holds 21, and § 8 holds 11; ruling 8.1 counts its 9 statechart names as one ruling, and ruling 3.0 counts its five caption forms as one.

The sweep ran `grep -n -i -w -E` over this file with the alternation of every term in `/home/user/scaffold/.claude/rules/writing.md` § Substitutions, plus `ensure`, `guarantee`, `we`, `our`, and `let's`. Its one hit is this paragraph, which names the swept terms; no other line of the file matches.

## Files read

- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements.md`
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-probe/report-excerpt.md`
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-probe-2/report.md`
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-sheet/brief.md`
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-sheet/last.md`
- `/home/user/veneer/tmp/probes/flip2/report.md` (§ P4, § P5)
- `/home/user/veneer/app/browser/constants.ts`
- `/home/user/veneer/app/browser/types.ts`
- `/home/user/veneer/app/browser/Showcase.ts`
- `/home/user/veneer/app/browser/factories.ts`
- `/home/user/veneer/app/browser/helpers.ts`
- `/home/user/veneer/app/browser/templates.ts`
- `/home/user/veneer/app/browser/main.ts`
- `/home/user/veneer/app/browser/index.html`
- `/home/user/veneer/app/browser/sections/tailwindcss.html`
- `/home/user/veneer/app/browser/sections/*.html` (swept for Tailwind terms, chrome classes, and colliding strings)
- `/home/user/veneer/src/tailwindcss/_tokens.scss`
- `/home/user/veneer/tests/setupBrowser.ts`
- `/home/user/veneer/tests/setupBrowser.test.ts`
- `/home/user/veneer/tests/app/browser/integration.test.ts`
- `/home/user/veneer/tests/app/browser/Showcase.test.ts`
- `/home/user/veneer/tests/app/browser/constants.test.ts`
- `/home/user/veneer/tests/app/browser/factories.test.ts`
- `/home/user/veneer/tests/app/browser/helpers.test.ts`
- `/home/user/veneer/tests/app/browser/sections/integration.test.ts`
- `/home/user/veneer/tests/src/tailwindcss/index.test.ts`
- `/home/user/veneer/guides/veneer.md` (§ Tailwind compatibility sheet, § Showcase, § Faces, § Class coverage, § Tailwind record, § Census limit)
- `/home/user/scaffold/.claude/rules/writing.md`
- `/home/user/scaffold/.claude/rules/names.md`
- `/home/user/scaffold/AGENTS.md` (§ Writing)

## Orchestrator rulings on the open items

- **Open item 2 (the section's alert and recipe block):** chrome. Both carry the explanation, not a specimen, so they take the chrome replacement classes (`border` becomes the four side classes, `rounded` becomes `rounded-2`) and keep `mb-4` and `p-3`, whose Tailwind scale the verdict § 5 accepts on chrome spacing. Their text does not change between faces.
- **Open item 3 (the paired open engine states case):** the case keeps an equality, read over the three faces: the engine's inline styles and placement on a shown popover, dropdown, tooltip, and modal are the same under `bootstrap`, `unexcluded`, and `tailwindcss` (U1 P7 matched Bootstrap under the recipe). Computed styles are not asserted equal in that case; the partition case owns the differences. U6 writes the title in the section 8 shape, naming the three faces.
- **Open item 1 (the `.table` scoped row):** ruled after `flip-probe-3` reports; caption 3.20's with-the-layer clause stands only if the derived table carries the `scoped` row for the `.table` cells' border color, else the caption names the departure.
