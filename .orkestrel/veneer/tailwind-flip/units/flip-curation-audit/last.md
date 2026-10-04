**Hold the fold of the unmodified flip4 table.** The recorded zero `preflight` residual does not establish that the copies preserve Bootstrap components. The `resolved` filter hides individual departures, and the scoped selectors outrank the table variant and divider rules.

This report reads `/home/user/veneer/tmp/probes/flip4/out/p3.json` and `curation.json` as first-run evidence. **Byte identity remains pending**, as recorded in [report.md:13](/home/user/veneer/tmp/probes/flip4/report.md:13). “Final condition” below means iteration 2 of that run.

For compact evidence references:

- **P** = [out/p3.json](/home/user/veneer/tmp/probes/flip4/out/p3.json).
- **C[n]** = zero-based `$.rows[n]` in [curation.json](/home/user/veneer/tmp/probes/flip4/curation.json).
- **Recipe** = [recipe.i2.css](/home/user/veneer/tmp/probes/flip4/sheets/recipe.i2.css).
- **Served JS** = [index-bztTK_f2.js](/home/user/veneer/dist/app/browser/assets/index-bztTK_f2.js).

**Hold — copy-induced departures hidden by `resolved`.** P contains the count `$.iterations[2].results[0].counts.resolved = 646`, but contains **no individual `resolved` records**. Consequently, the requested exhaustive grouping and measured classification into (a), (b), and (c) cannot be recovered. The following copy hazards are established by the emitted declarations; their final computed A/F pairs are absent.

| Copy and affected component | Overlapping longhands the copy wins | Evidence and ruling |
|---|---|---|
| `.table tbody` against `.table-group-divider` on the measured `tbody` | `border-top-width`, `border-top-style`, `border-top-color`; corresponding logical aliases | Copy specificity `(0,1,1)` exceeds component `(0,1,0)`. Copy writes `0`, `solid`, `inherit`; component writes `calc(var(--bs-border-width) * 2) solid currentcolor`. **Hold.** Recipe:1993, 3290; Served JS:21364. |
| `.table tr` against `.table-primary` | All physical border colors and corresponding logical aliases | `(0,1,1)` exceeds `(0,1,0)`; `inherit` beats the variant’s `var(--bs-table-border-color)`. **Hold.** Recipe:2015, 3327; C[19–20]. |
| `.table tr` against `.table-secondary` | Same | **Hold.** Recipe:2015, 3340; C[21–22]. |
| `.table tr` against `.table-success` | Same | **Hold.** Recipe:2015, 3353; C[23–24]. |
| `.table tr` against `.table-danger` | Same | **Hold.** Recipe:2015, 3392; C[25–26]. |
| `.table tr` against `.table-warning` | Same | **Hold.** Recipe:2015, 3379; C[27–28]. |
| `.table tr` against `.table-info` | Same | **Hold.** Recipe:2015, 3366; C[29–30]. |
| `.table tr` against `.table-light` | Same | **Hold.** Recipe:2015, 3405; C[31–32]. |
| `.table tr` against `.table-dark` | Same | **Hold.** Recipe:2015, 3418; C[33–34]. |

The variant cells inherit through those rows. Their `.table th|td` and `.table-VARIANT th|td` copies therefore propagate the row’s overridden border color. This is a copy-induced cascade consequence, not evidence of an R1 utility change. Its membership and multiplicity within the 646 remain **hold** because the measurements were discarded.

**Drop — the proposed late-copy explanation for ordinary table-cell bottom borders.** The copies precede the component rule. `.table td` and `.table > :not(caption) > * > *` both have specificity `(0,1,1)`; the later component rule wins `border-bottom-width`. Recipe:1998 versus 3277. Moving the existing copies earlier cannot fix the higher-specificity hazards in the table.

**Keep — the measured accordion descendant repair.** The heading repair introduces `font-weight: 500` through preflight inheritance on buttons whose Bootstrap-alone weight is `400`. P `$.iterations[1].results[0].departures` records this on eight buttons. C[80] restores their weight. This departure is recorded as `preflight`, and the final iteration removes it; it is not an identified member of the final 646.

The following disposition table covers the union of the probe’s rows and U2’s rows. “Both” means the form and class/selector occur in both inventories; it does not mean their recorded longhands agree. **Keep** corresponds to fold; **trim** names the retained longhands; **hold** names the missing measurement or mechanism correction.

| Form and row | Inventory | Disposition and evidence |
|---|---|---|
| restore `svg:where(.bi)` | Both | **Trim** to `display`; border-color expansion **hold** for computed widths. C[0]. |
| scoped `.table thead` | Probe | **Hold** for lower-specificity emission and measured A/F. C[1]. |
| scoped `.table th` | Probe | **Hold** for corrected table inheritance and measured A/F. C[2]. |
| scoped `.table tbody` | Probe | **Hold** for divider specificity correction and measured A/F. C[3]. |
| scoped `.table td` | Probe | **Hold** for corrected table inheritance and measured A/F. C[4]. |
| reboot `lead` | Probe | **Keep — fold.** Margin `16px → 0px`. C[5]. |
| reboot `display-1` | Probe | **Keep — fold.** Margin `16px → 0px`. C[6]. |
| reboot `display-2` | Probe | **Keep — fold.** Margin `16px → 0px`. C[7]. |
| reboot `display-3` | Probe | **Keep — fold.** Margin `16px → 0px`. C[8]. |
| reboot `display-4` | Probe | **Keep — fold.** Margin `16px → 0px`. C[9]. |
| reboot `display-5` | Probe | **Keep — fold.** Margin `16px → 0px`. C[10]. |
| reboot `list-unstyled` | Probe | **Keep — fold.** Margin `16px → 0px`. C[11]. |
| reboot `table-group-divider` | Probe | **Drop as redundant** with corrected `.table tbody` coverage on measured markup. C[12]. |
| scoped `.table-group-divider th` | Probe | **Drop as redundant** with `.table th`. C[13]. |
| scoped `.table-group-divider td` | Probe | **Drop as redundant** with `.table td`. C[14]. |
| scoped `.table tr` | Probe | **Hold** for variant specificity correction and measured A/F. C[15]. |
| reboot `table-active` | Probe | **Drop as redundant** with corrected `.table tr` coverage on measured markup. C[16]. |
| scoped `.table-active th` | Probe | **Drop as redundant** with `.table th`. C[17]. |
| scoped `.table-active td` | Probe | **Drop as redundant** with `.table td`. C[18]. |
| scoped `.table-primary th` | Probe | **Drop as redundant** with `.table th`. C[19]. |
| scoped `.table-primary td` | Probe | **Drop as redundant** with `.table td`. C[20]. |
| scoped `.table-secondary th` | Probe | **Drop as redundant** with `.table th`. C[21]. |
| scoped `.table-secondary td` | Probe | **Drop as redundant** with `.table td`. C[22]. |
| scoped `.table-success th` | Probe | **Drop as redundant** with `.table th`. C[23]. |
| scoped `.table-success td` | Probe | **Drop as redundant** with `.table td`. C[24]. |
| scoped `.table-danger th` | Probe | **Drop as redundant** with `.table th`. C[25]. |
| scoped `.table-danger td` | Probe | **Drop as redundant** with `.table td`. C[26]. |
| scoped `.table-warning th` | Probe | **Drop as redundant** with `.table th`. C[27]. |
| scoped `.table-warning td` | Probe | **Drop as redundant** with `.table td`. C[28]. |
| scoped `.table-info th` | Probe | **Drop as redundant** with `.table th`. C[29]. |
| scoped `.table-info td` | Probe | **Drop as redundant** with `.table td`. C[30]. |
| scoped `.table-light th` | Probe | **Drop as redundant** with `.table th`. C[31]. |
| scoped `.table-light td` | Probe | **Drop as redundant** with `.table td`. C[32]. |
| scoped `.table-dark th` | Probe | **Drop as redundant** with `.table th`. C[33]. |
| scoped `.table-dark td` | Probe | **Drop as redundant** with `.table td`. C[34]. |
| restore `img:where(.figure-img)` | Both | **Keep — fold `display`.** C[35]. |
| restore `img:where(.img-fluid)` | Probe | **Keep — fold `display`.** C[36]. |
| restore `input:where(.form-check-input)` | Both | **Keep — fold `color`.** C[37]. |
| restore `input:where(.btn-check)` | Both | **Trim** to `color`; border-color expansion **hold** for computed widths. C[38]. |
| restore `input:where(.form-range)` | Both | **Trim** to `color`; border-color expansion **hold** for computed widths. C[39]. |
| reboot `accordion-header` | Both | **Keep — fold**, recording both `font-size` and `font-weight`. C[40]. |
| reboot `alert-link` | Both | **Keep — fold.** Underline `underline → none`. C[41]. |
| reboot `link-body-emphasis` | Both | **Keep — fold.** Underline `underline → none`. C[42]. |
| restore `img:where(.card-img-top)` | Probe | **Keep — fold `max-width`.** C[43]. |
| reboot `card-text` | Both | **Keep — fold.** Margin `16px → 0px`. C[44]. |
| restore `a:where(.card-link)` | Probe | **Hold** for border widths; only border colors are recorded. C[45]. |
| reboot `card-link` | Both | **Keep — fold**, recording `color`, `text-decoration-color`, `text-decoration-line`. C[46]. |
| restore `a:where(.icon-link)` | Probe | **Hold** for border widths; only border colors are recorded. C[47]. |
| reboot `icon-link` | Both | **Keep — fold**, recording `color`, `text-decoration-line`. C[48]. |
| restore `img:where(.card-img)` | Probe | **Keep — fold `max-width`.** C[49]. |
| restore `img:where(.card-img-bottom)` | Probe | **Keep — fold `max-width`.** C[50]. |
| scoped `.carousel-indicators button` | Probe | **Drop as invisible** on measured markup. C[51]. |
| reboot `modal-title` | Both | **Keep — fold `font-weight` evidence**; unsuffixed-title size measurement **hold**. C[52]. |
| reboot `pagination` | Both | **Keep — fold.** Margin `16px → 0px`. C[53]. |
| reboot `placeholder-glow` | Both | **Keep — fold.** Margin `16px → 0px`. C[54]. |
| reboot `link-primary` | Both | **Keep — fold.** Underline `underline → none`. C[55]. |
| reboot `link-secondary` | Both | **Keep — fold.** Same departure. C[56]. |
| reboot `link-success` | Both | **Keep — fold.** Same departure. C[57]. |
| reboot `link-danger` | Both | **Keep — fold.** Same departure. C[58]. |
| reboot `link-dark` | Both | **Keep — fold.** Same departure. C[59]. |
| reboot `link-warning` | Both | **Keep — fold.** Same departure. C[60]. |
| reboot `link-info` | Both | **Keep — fold.** Same departure. C[61]. |
| reboot `link-light` | Both | **Keep — fold.** Same departure. C[62]. |
| reboot `focus-ring` | Probe | **Keep — fold.** Visible anchor color departs. C[63]. |
| reboot `focus-ring-primary` | Probe | **Drop as redundant** on measured anchors carrying `focus-ring`. C[64]. |
| reboot `focus-ring-secondary` | Probe | **Drop as redundant** on the same basis. C[65]. |
| reboot `focus-ring-success` | Probe | **Drop as redundant** on the same basis. C[66]. |
| reboot `focus-ring-danger` | Probe | **Drop as redundant** on the same basis. C[67]. |
| reboot `focus-ring-warning` | Probe | **Drop as redundant** on the same basis. C[68]. |
| reboot `focus-ring-info` | Probe | **Drop as redundant** on the same basis. C[69]. |
| reboot `focus-ring-light` | Probe | **Drop as redundant** on the same basis. C[70]. |
| reboot `focus-ring-dark` | Probe | **Drop as redundant** on the same basis. C[71]. |
| restore `a:where(.icon-link-hover)` | Probe | **Hold** for border widths; also overlaps `a:where(.icon-link)` on its witness. C[72]. |
| reboot `icon-link-hover` | Probe | **Drop as redundant** on measured anchors carrying `icon-link`. C[73]. |
| restore `a:where(.stretched-link)` | Probe | **Hold** for border widths; only border colors are recorded. C[74]. |
| reboot `stretched-link` | Both | **Keep — fold**, recording `color` and both decoration longhands. C[75]. |
| reboot `visually-hidden-focusable` | Both | **Keep — fold**, recording `color` and both decoration longhands. C[76]. |
| reboot `card-title` | Both | **Keep — fold.** Size and weight depart. C[77]. |
| reboot `offcanvas-title` | Both | **Keep — fold.** Size and weight depart. C[78]. |
| reboot `popover-header` | Both | **Keep — fold `font-weight`.** C[79]. |
| restore `button:where(.accordion-button)` | Probe | **Keep — fold `font-weight`.** C[80]. |
| reboot `accordion-button` | U2 only | **Hold** for the guide’s `h4.accordion-button` measurement; absent from the probe’s derived rows. Guide:1296. |

**Item 1 — hold the exhaustive `resolved` classification.** The missing evidence is structural, not a failed file read. [browser.ts:173](/home/user/veneer/tmp/probes/flip4/browser.ts:173) assigns `resolved` whenever a matching Bootstrap-layer or unlayered rule declares an alias of the longhand. [browser.ts:182](/home/user/veneer/tmp/probes/flip4/browser.ts:182) saves only `preflight`, `unattributed`, and `admitted` records. Baseline value dictionaries remain in `window.flipBaseline`; [browser.ts:63](/home/user/veneer/tmp/probes/flip4/browser.ts:63) returns only baseline counts.

Thus all 646 lack the requested saved `(classes, tag, pseudo, longhand, A, F)` tuples. The recorded absorption totals, `390 preflight + 256 unattributed`, cannot distinguish genuine resolved-value changes from copy defects. The same omission affects the matrix’s `12,418` resolved departures recorded in `summary.json:$.total.resolved`.

The table hazards have these measured **baseline cell colors**, from C’s derivation readings. Their final F values are absent:

| Variant | Measured A border color | Final F |
|---|---|---|
| primary | `rgb(166, 181, 204)` | Absent |
| secondary | `rgb(181, 182, 183)` | Absent |
| success | `rgb(167, 185, 177)` | Absent |
| danger | `rgb(198, 172, 174)` | Absent |
| warning | `rgb(204, 194, 164)` | Absent |
| info | `rgb(166, 195, 202)` | Absent |
| light | `rgb(198, 199, 200)` | Absent |
| dark | `rgb(77, 81, 84)` | Absent |

A final inherited default table border color is a cascade inference, not a recorded F measurement. The divider’s final top width/color A/F pairs are likewise absent.

**Item 2 — keep the established emission order; hold the scoped specificity.** The Sass copy emits reboot/curate, then restore, then scope at [_reset.scss:541](/home/user/veneer/tmp/probes/flip4/sass/bootstrap/_reset.scss:541). Its compilation barrel loads `reset` before `components`. The emitted recipe confirms that order:

| Copy/component pair | Copy specificity | Component specificity | Result |
|---|---:|---:|---|
| Scoped `.table th|td` versus table cell rule | `(0,1,1)` | `(0,1,1)` | Later component wins bottom width. Recipe:1998/2003 versus 3277. |
| Scoped `.table tbody` versus divider | `(0,1,1)` | `(0,1,0)` | Copy wins top border despite earlier position. Recipe:1993 versus 3290. |
| Scoped `.table tr` versus each colored variant | `(0,1,1)` | `(0,1,0)` | Copy wins border colors. Recipe:2015 versus 3327–3418. |
| `input:where(.btn-check)` versus `.btn-check` | `(0,0,1)` | `(0,1,0)` | No declared-longhand overlap: restore has color/border colors; component has position, clip, pointer events. Recipe:1916, 3854. |
| `input:where(.form-range)` versus `.form-range` | `(0,0,1)` | `(0,1,0)` | No corresponding color/border-color declaration on the root component rule. Recipe:1927, 3867. |
| `input:where(.form-check-input)` versus `.form-check-input` | `(0,0,1)` | `(0,1,0)` | Restore contains only `color`; component border remains stronger. Recipe:1913, 3760. |
| Curated `a:where(...)` versus `.link-*` | `(0,0,1)` | `(0,1,0)`, important | Component wins color and decoration color. Recipe:1384, 7962 onward. |
| Curated `a:where(...)` versus `.icon-link` | `(0,0,1)` | `(0,1,0)` | Component wins decoration color; curated underline remains where component does not declare it. Recipe:1384, 8074. |

The exact installed Bootstrap sources read for these semantics include:

- [scss/_tables.scss:28](/home/user/veneer/node_modules/bootstrap/scss/_tables.scss:28): cell selector and nesting boundary.
- [scss/_tables.scss:51](/home/user/veneer/node_modules/bootstrap/scss/_tables.scss:51): divider.
- [scss/_tables.scss:129](/home/user/veneer/node_modules/bootstrap/scss/_tables.scss:129): active rows/cells.
- [scss/mixins/_table-variants.scss:1](/home/user/veneer/node_modules/bootstrap/scss/mixins/_table-variants.scss:1): variant border colors.
- [scss/_reboot.scss:367](/home/user/veneer/node_modules/bootstrap/scss/_reboot.scss:367): table-section, row, and cell border reset.

**Item 3 — drop redundant variant-scoped rows within the measured population.** The scoped inventory is **25 table rows plus one carousel row**, not 26 table rows.

The served fragment places the divider on `tbody` inside `.table` at Served JS:21353/21364, the active class on a row inside `.table.table-borderless`, and all colored variants on rows inside `.table` at Served JS:21518–21554. Each colored variant’s `th` and `td` is therefore already covered by the corresponding `.table` row. The disposition table rules individually on all 26 scoped rows.

Bootstrap documents tables as opt-in through `.table`, with variants on tables, rows, or cells. Its abbreviated variant snippets omit `.table`, so those snippets alone do not prove arbitrary standalone variant usage. The complete usage contract and rendered showcase support redundancy within this audit’s population. See [Bootstrap table usage](https://getbootstrap.com/docs/5.3/content/tables/).

**Hold `.table tfoot` for measurement; keep it in the structural coverage requirement.** The reboot explicitly includes `tfoot`, and Bootstrap documents table footers. The served JS contains no `<tfoot`, and C has no footer row. No A/F measurement establishes its repair in this probe.

**Item 4 — hold claims of measured zero-width borders.** None of the requested elements has stored computed border-width values in P. Searching the saved departures across all iterations finds no border-width record for `bi`, `card-link`, `icon-link`, `icon-link-hover`, `stretched-link`, `btn-check`, or `form-range`. Absence of a departure is not a saved `0px` measurement.

The eight recorded color longhands are the four physical colors plus block-start/end and inline-start/end colors.

| Restore row | Recorded departure | Ruling |
|---|---|---|
| `a:where(.card-link)` | Light `rgb(13,110,253) → rgb(33,37,41)`; dark `rgb(110,168,254) → rgb(222,226,230)` | **Hold** border-only row for widths. C[45]. |
| `a:where(.icon-link)` | Same | **Hold**. C[47]. |
| `a:where(.icon-link-hover)` | Same | **Hold**. C[72]. |
| `a:where(.stretched-link)` | Same | **Hold**. C[74]. |
| `svg:where(.bi)` | Same color changes; `display: inline → block` | **Trim** to established `display`; **hold** color expansion. C[0]. |
| `input:where(.btn-check)` | Light black → body foreground; dark white → body foreground | **Trim** to established `color`; **hold** color-border expansion. C[38]. |
| `input:where(.form-range)` | Normal `rgb(157,150,142)` and disabled border `rgba(118,118,118,0.3)` → body foreground; disabled foreground A is `rgb(197,197,197)` | **Trim** to established `color`; **hold** border expansion. C[39]. |

The stylesheet predicts nonpainting borders for the ordinary anchor/SVG specimens, but the requested all-widths-zero assertion is unmeasured. The table therefore does not convert that prediction into a measured invisibility ruling.

**Drop `.carousel-indicators button { color }` as invisible on its witness.** C[51] records black → body foreground in light mode and white → body foreground in dark mode. The served buttons are empty, with labels supplied by `aria-label`—Served JS:14966–14985. Their visible indicator uses a background and transparent borders; [_carousel.scss:149](/home/user/veneer/src/bootstrap/components/_carousel.scss:149) sets `text-indent: -999px`.

**Keep the base `focus-ring` anchor color repair.** These are text-bearing `<a>` elements, not empty ring elements. C[63–71] records link blue → body foreground in both themes. Served JS:16556 and following contains visible link text. Every measured modifier witness also carries `focus-ring`, so the individual modifier rows are **drop as redundant**, not drop as invisible.

**Item 5 — keep the measured component repairs with the following limits.** The following A/F values are the derivation readings before the relevant repair, not final unresolved departures.

| Row | Measured A → F | Component ownership and cause |
|---|---|---|
| `lead` | Bottom/block-end margin `16px → 0px` | `.lead` controls typography; paragraph spacing comes from reboot `p`. [_type.scss:4](/home/user/veneer/src/bootstrap/components/_type.scss:4), [_reset.scss:129](/home/user/veneer/src/bootstrap/_reset.scss:129). |
| `display-1` through `display-5` | Each `16px → 0px` on `<p>` | Named display components set size/weight, leaving paragraph margins to reboot. `_type.scss:8,18,28,38,48`; C[6–10]. |
| `list-unstyled` | `16px → 0px` | Component removes padding/markers, not bottom margin. [_type.scss:68](/home/user/veneer/src/bootstrap/components/_type.scss:68); C[11]. |
| `pagination` | `16px → 0px` | Component sets flex display, padding, and list style; reboot supplies list margin. [_pagination.scss:25](/home/user/veneer/src/bootstrap/components/_pagination.scss:25); C[53]. |
| `placeholder-glow` | `16px → 0px` | Component class owns placeholder animation; carrier is a paragraph. [_placeholders.scss:25](/home/user/veneer/src/bootstrap/components/_placeholders.scss:25); C[54]. |
| `card-text` | `16px → 0px` | Non-final paragraph loses reboot margin; `.card-text:last-child` independently removes it and remains stronger. [_card.scss:72](/home/user/veneer/src/bootstrap/components/_card.scss:72); C[44]. |
| `img:where(.img-fluid)` | `display: inline → block` | Component sets `max-width:100%` and `height:auto`, not display. [_images.scss:4](/home/user/veneer/src/bootstrap/components/_images.scss:4); C[36]. |
| `img:where(.card-img-top)` | `max-width: none → 100%` | Component specifies width and corner treatment, not max-width. C[43]. |
| `img:where(.card-img)` | Same | C[49]. |
| `img:where(.card-img-bottom)` | Same | C[50]; [_card.scss:120](/home/user/veneer/src/bootstrap/components/_card.scss:120). |
| `table-group-divider` | Six non-top color longhands: light `rgb(222,226,230) → rgb(33,37,41)`; dark `rgb(73,80,87) → rgb(222,226,230)` | Component owns top border; reboot supplies other border colors. C[12]. Corrected root scope covers its carrier. |
| `table-active` | Eight border colors: same light/dark pairs | Component sets active color/background variables, leaving border inheritance to reboot. [_tables.scss:67](/home/user/veneer/src/bootstrap/components/_tables.scss:67); C[16]. |
| `offcanvas-title` | Size `20px → 16px`; weight `500 → 400` | Present as C[78]. Component sets margin and line height, leaving heading size/weight to reboot. [_offcanvas.scss:509](/home/user/veneer/src/bootstrap/components/_offcanvas.scss:509). |
| `modal-title` | Weight `500 → 400` | C[52] witness carries `fs-5`; component leaves size/weight to heading/utility rules. [_modal.scss:121](/home/user/veneer/src/bootstrap/components/_modal.scss:121). |
| `accordion-header` | Size `24px → 16px`; weight `500 → 400` | Component only removes bottom margin. [_accordion.scss:81](/home/user/veneer/src/bootstrap/components/_accordion.scss:81); C[40]. |
| `button:where(.accordion-button)` | Weight `400 → 500`, iteration 1 | Component specifies size but no weight; repaired header weight reaches button through preflight. C[80]; `_accordion.scss:27`. |
| `popover-header` | Weight `500 → 400` | Present as C[79]. Component explicitly sets font size, but no weight. [_popover.scss:164](/home/user/veneer/src/bootstrap/components/_popover.scss:164). |

These are component carriers with measured departures on properties not handed to a shared utility. They are not bare-element R1 exemptions. The card-image max-width rows establish computed differences; saved box measurements do not establish their visible geometric effect.

**Keep `modal-title`’s weight-only derivation for this population; hold the broader size claim.** The measured title is `<h4 class="modal-title fs-5">`, and the graft is `<h1 class="modal-title fs-5">` at [p3.ts:39](/home/user/veneer/tmp/probes/flip4/p3.ts:39). Recipe:8753 retains `.fs-5 { font-size: 1.25rem !important }`. Therefore font size no longer departs on those witnesses. U2’s guide instead names a plain `<h5 class="modal-title">`; its size claim is not disproved by an `fs-5` specimen.

**Drop the claim that `accordion-header` alone replaces the U2 `accordion-button` row.** The header row repairs the heading carrier. The restore row separately repairs the nested button’s inherited weight. U2’s reboot row names an `h4.accordion-button`, a different carrier absent from the probe’s derived evidence.

**Keep `offcanvas-title` and `popover-header` as derived rows.** Both are present. The report’s “outside seed” label for `offcanvas-title` refers to its literal seed array, not absence from verdict §4’s named cases. C[78–79] and [report.md:15](/home/user/veneer/tmp/probes/flip4/report.md:15) establish that distinction.

**Item 6 — trim the unattributed set by cause, with state-dependent readings held.** The final wide light closed condition contains 18 departures. The complete matrix contains 256, grouped as follows. All have an empty pseudo string.

| Group | Closed count / matrix count | Measured A → F | Cause and ruling |
|---|---:|---|---|
| `div.d-grid.border.rounded.bg-body-tertiary.px-2.small`, `grid-template-columns` | 1 / 14 | `70.5625px → 69px` | Resolved grid-track geometry. **Trim** from breaking inventory under a geometry exclusion; upstream dimensional cause is not saved. |
| Same with `d-sm-grid` | 1 / 14 | Same | Same ruling. |
| Same with `d-md-grid` | 1 / 14 | Same | Same ruling. |
| Same with `d-lg-grid` | 1 / 14 | Same | Same ruling. |
| Same with `d-xl-grid` | 1 / 14 | Same | Same ruling. |
| `div.card-body.grid.grid-cols-3.gap-3.text-center`, `grid-template-rows` | 1 / 14 | `none → 57px` | Tailwind `grid` creates grid layout; the computed track is an R1 consequence. **Trim** from breaking inventory. |
| `a.nav-link`, six color channels | 6 / 84 | White → link blue | Scrollspy/state consequence indicated by the complementary next group. **Hold** for paired active-state evidence. |
| `a.nav-link.active`, same six channels | 6 / 84 | Link blue → white | Same hold. |
| `ul.dropdown-menu.show`, `position-area` | 0 / 4 | `end span-end → start span-end` | Anchor-position fallback changes placement. **Trim** into geometry accounting, retaining placement/box checks. |

The six navigation channels are `caret-color`, `column-rule-color`, `outline-color`, `text-emphasis-color`, `-webkit-text-fill-color`, and `-webkit-text-stroke-color`. Light link blue is `rgb(13,110,253)`; dark link blue is `rgb(110,168,254)`. Each theme/state-value subgroup occurs seven times in P `$.residuals`.

The navigation keys are `14717 a in #example-navigation` and `14719 a in #example-navigation`. The served fragment binds that navigation to `data-bs-spy="scroll"` at Served JS:17773 and following. The inverse white/blue changes support an active-target change after geometry moves; baseline class snapshots are absent, so that cause remains an inference.

**Hold blanket color exclusions.** `-webkit-text-fill-color` can paint visible text: its 28 matrix departures are not invisible by definition. The remaining channels need their paint conditions—outline width/style, stroke width, column rule, text emphasis, editable caret—before an invisibility exclusion. No recorded evidence establishes a separate preflight curation defect in these navigation groups.

The dropdown witnesses retain inline `position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline` and final `data-popper-placement="top-start"` in P. Their `position-area` changes are placement evidence, not a missing reboot row.

**Item 7 — keep the inventory comparison, hold unsupported witness substitutions.** U2’s guide has 28 rows; the probe has 81. Exact `(form, class-or-selector)` comparison gives 27 common rows, 54 probe-only rows, and one U2-only row: reboot `accordion-button`.

The table at the beginning supplies one disposition per union row. U2’s inventory is established by [guides/veneer.md:1290](/home/user/veneer/guides/veneer.md:1290), [_tokens.scss:196](/home/user/veneer/src/tailwindcss/_tokens.scss:196), and its `$defaults` map at line 222. Differences in recorded longhands do not automatically change emitted reboot declarations: a reboot row copies the whole matching reboot rule.

**Item 8 — keep the scope mechanism’s reset boundary; hold its literal selector construction.** The flip4 shape is:

- `$scoped: () !default` in copied tokens and mixins.
- A map from root class to tag list.
- `scope` iterates roots/tags inside `@layer bootstrap`.
- `curate` in scoped mode selects reboot rules whose final compound explicitly names the tag, retains that compound, and emits `.ROOT TAG`.
- Missing reboot declarations use the restored map instead; `.carousel-indicators button` is such a scoped restore.

Evidence: [_mixins.scss:56](/home/user/veneer/tmp/probes/flip4/sass/bootstrap/_mixins.scss:56), [_mixins.scss:75](/home/user/veneer/tmp/probes/flip4/sass/bootstrap/_mixins.scss:75), and [p3.ts:59](/home/user/veneer/tmp/probes/flip4/p3.ts:59).

**Keep emission before component declarations.** In the production tree, that boundary is the end of [src/bootstrap/_reset.scss:541](/home/user/veneer/src/bootstrap/_reset.scss:541), before the barrel loads the component partials. An equivalent table-local boundary precedes `.table` in [components/_tables.scss:4](/home/user/veneer/src/bootstrap/components/_tables.scss:4). Emission after the table component would additionally lose the equal-specificity cell-width tie.

**Hold `.ROOT TAG` as the fold’s selector form.** No source-order position makes `(0,1,1)` lose to the variant and divider rules at `(0,1,0)`. A zero-specificity root, such as `:where(.table) tr`, preserves tag specificity `(0,0,1)` and allows those component rules to win. Its rendered A/F proof is absent from flip4. Descendant scope also extends into nested tables that lack `.table`; the installed Bootstrap cell rule explicitly preserves that nesting boundary. That boundary remains part of the held selector measurement.

**Keep a distinct `scoped` guide form and parser contract.** The guide’s `Form` column needs `scoped`, with the complete root/tag selector in its selector cell. [tests/setup.ts:2077](/home/user/veneer/tests/setup.ts:2077) restricts `CurationRow.form` to `'reboot' | 'restore'`; [tests/setup.ts:2124](/home/user/veneer/tests/setup.ts:2124) rejects any other form. Both require the third form for these rows. The existing duplicate key already includes form plus selector. A scoped restore also needs an explicit mapping to `$defaults`; a root/tag map alone does not represent that case.

**Keep the verified first-run figures; hold repeatability.** Direct JSON aggregation confirms:

| Measurement | First-run value | JSON evidence |
|---|---:|---|
| Final wide light closed preflight | 0 | P `$.iterations[2].results[0].counts.preflight` |
| Final wide light closed unattributed | 18 | Same path, `.unattributed` |
| Final wide light closed resolved | 646 | Same path, `.resolved` |
| Absorbed prior categories | 390 preflight, 256 unattributed | `$.iterations[2].results[0].absorbed` |
| Widened elements | 2872 | `$.iterations[2].results[0].widened` |
| Derived rows | 81: 41 reboot, 26 scoped, 14 restore | P `$.curation`, grouped by `.form` |
| Literal seed / outside seed | 25 / 56 | P `$.curation`, `$.outsideSeed` |
| Curate / scoped copies | 72 / 36 | P `$.iterations[2].copies`, `.scopedCopies` |
| Matrix preflight / unattributed | 0 / 256 | Sum of final iteration condition counts |

`status-final.txt` is readable and empty. `metrics.json` records only run 1: exit `0`, duration `1403.19099801` seconds. The journal’s last inspected events show the repeat entering iteration 1; they do not establish byte identity.

**Hold — unavailable evidence and exact errors.** All required audit files were readable. The missing resolved tuples, baseline class snapshots, computed border widths, and footer measurements were not serialized; there is no file-read error for those omissions.

An ancillary lookup returned exactly:

```text
rg: tests/types.ts: No such file or directory (os error 2)
```

The curation type was located in `tests/setup.ts`. An initial JSON-summary command returned `TypeError: Cannot read properties of undefined (reading 'slice')` on an empty array; subsequent direct JSON reads supplied the measurements reported here. No write, build, install, server, or browser process was run.