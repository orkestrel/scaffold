# tokens-t3 — review repairs complete; journey failures confined to the Host-bound set

The 2026-10-05 ruling is implemented: findings 1–5, 8–11, and 13–19 are repaired, with 6, 7, and 12 explicitly handed to T4 below. Existing uncommitted work is retained. The inherited set now has 115 members; table alignment follows only an inheriting cell or row's immediate parent; the partition's unmapped control now exercises shared container signatures. All prescribed setup proofs and four mutation probes have run. Nothing is committed.

The carried count, contrast, and header tables were compared with fresh evidence: [comparison receipt](table-comparison-6.json). The full-run counts also match the focused proofs: [full comparison](full-count-comparison-6.json).

The static checks, 156 setup browser tests, 239 app browser tests, both builds, two byte-identical P4 runs, and both focused style proofs pass. The single full journey run exits 1 with **86 passed, 4 failed, and 6 skipped (96)** in **858.59 s**. All four failures match the named Host-bound set. No token-reading failure remains. The Orchestrator retains acceptance and commit authority.

## Caption strings

Exact description strings with whitespace normalized; each title identifies its figure. These are the seven changed/new Tailwind figures and two other captions whose width claims the map moves. [Extracted strings](captions-6.json).

**Link in a Bootstrap alert** (`tailwindcss.html`)

> Every face: the link keeps its underline. With the layer, a curated copy of the reboot's link rule holds it against preflight, which removes the underline from a bare link. Bootstrap only and without the layer: alert text on fill is #055160 on #cff4fc in light mode and #6edff6 on #032830 in dark mode. With the layer: #005f78 on #cefafe in light mode and #53eafd on #053345 in dark mode.

**Bootstrap table with bare cells** (`tailwindcss.html`)

> Every face: each cell's bottom border takes the table's border color. With the layer, a scoped copy of the reboot's cell rule holds it against preflight, which gives a bare cell's border the text color. Bootstrap only and without the layer: #dee2e6 in light mode and #495057 in dark mode. With the layer: #d1d5dc in light mode and #4a5565 in dark mode.

**Container, a name both systems declare** (`tailwindcss.html`)

> Every face: 12 px inline padding and no maximum width at 390 px. Bootstrap only: a 1140 px maximum width in a 1280 px viewport. Both Tailwind faces: 1280 px; without the layer Tailwind's container utility wins, and with the layer Bootstrap's container class takes the mapped width.

**Primary button, page link, and focus ring** (`tailwindcss.html`)

> Bootstrap only and without the layer: the button uses #0d6efd; the link uses #0d6efd in light mode and #6ea8fe in dark mode; the focus halo uses rgba(13, 110, 253, 0.25). With the layer: #155dfc, #155dfc / #8ec5ff, and rgba(21, 93, 252, 0.25). Every face: Tab from the button to the link to see its 4 px halo.

**Primary table colors** (`tailwindcss.html`)

> Bootstrap only and without the layer: the cells use #cfe2ff. With the layer: #dbeafe. Every face: black cell text in both color modes.

**Radius and shadow scales** (`tailwindcss.html`)

> Every face: a 16 px corner radius. Bootstrap only and without the layer: a shadow offset 8 px down with 16 px blur at 15% black; the font stack starts with system-ui. With the layer: shadows offset 4 px and 2 px down, with 6 px and 4 px blur, -1 px and -2 px spread, at 10% black; the font stack starts with -apple-system.

**Mapped sm breakpoint** (`tailwindcss.html`)

> Bootstrap only and without the layer: left-aligned from 576 px. With the layer: left-aligned from 640 px. Every face: centered at 390 px and left-aligned at 1280 px.

**Container widths** (`containers.html`)

> Bootstrap only: each line's widths. Without the layer: the container class takes Tailwind's maximum width where Tailwind declares one, 1280 px in a 1280 px viewport. With the layer: every container caps at its aligned breakpoint, 640, 768, 1024, 1280, and 1536 px.

**Breakpoint scroll wrappers** (`tables.html`)

> Bootstrap only and without the layer: the labels state each scrolling threshold. With the layer: sm, md, lg, xl, and xxl switch at 640, 768, 1024, 1280, and 1536 px.

The Tailwind lead now says: “wins at every conflict, and Bootstrap’s components use Tailwind’s mapped colors and scales.”

## Token rows

Eleven new rows in `TAILWIND_READINGS`; B = Bootstrap, U = Tailwind without the layer, L = Tailwind + layer. Values apply in both modes and at 390/1280 unless specified. [Exact rows, including complete font stacks](token-rows-5.json); [independent specimen readings](specimen-5.json).

| Specimen / subject | Property | Mode | B | U | L |
| --- | --- | --- | --- | --- | --- |
| Primary button, page link, and focus ring / .btn-primary | background-color | Light/default | rgb(13, 110, 253) | rgb(13, 110, 253) | rgb(21, 93, 252) |
| Primary button, page link, and focus ring / a | color | Light/default | rgb(13, 110, 253) | rgb(13, 110, 253) | rgb(21, 93, 252) |
| Primary button, page link, and focus ring / a | color | Dark | rgb(110, 168, 254) | rgb(110, 168, 254) | rgb(142, 197, 255) |
| Primary button, page link, and focus ring / a | --bs-focus-ring-color | Light/default | rgba(13, 110, 253, 0.25) | rgba(13, 110, 253, 0.25) | rgba(21, 93, 252, 0.25) |
| Link in a Bootstrap alert / .alert | color | Light/default | rgb(5, 81, 96) | rgb(5, 81, 96) | rgb(0, 95, 120) |
| Link in a Bootstrap alert / .alert | color | Dark | rgb(110, 223, 246) | rgb(110, 223, 246) | rgb(83, 234, 253) |
| Link in a Bootstrap alert / .alert | background-color | Light/default | rgb(207, 244, 252) | rgb(207, 244, 252) | rgb(206, 250, 254) |
| Link in a Bootstrap alert / .alert | background-color | Dark | rgb(3, 40, 48) | rgb(3, 40, 48) | rgb(5, 51, 69) |
| Primary table colors / td | background-color | Light/default | rgb(207, 226, 255) | rgb(207, 226, 255) | rgb(219, 234, 254) |
| Primary table colors / td | color | Light/default | rgb(0, 0, 0) | rgb(0, 0, 0) | rgb(0, 0, 0) |
| Radius and shadow scales / .toast | border-top-left-radius | Light/default | 16px | 16px | 16px |
| Radius and shadow scales / .toast | box-shadow | Light/default | rgba(0, 0, 0, 0.15) 0px 8px 16px 0px | rgba(0, 0, 0, 0.15) 0px 8px 16px 0px | rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px |
| Radius and shadow scales / .toast | font-family | Light/default | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" |
| Mapped sm breakpoint / p | text-align | Light/default | left | left | left |

The breakpoint row uses per-face minima B/U = 576 px, L = 640 px; below those minima all read `center`. The browser checks 575, 576, 639, 640, and 1280 explicitly. The focus row reads the variable in the caption matrix; the keyboard check also proves the actual 4 px `box-shadow` appears on Tab and clears on the next Tab under every face/theme.

## Moved expectations and baselines

| Subject | Before | After |
| --- | --- | --- |
| Layer dark body; selection and pair statechart | #212529 | #030712 / rgb(3, 7, 18) |
| Layer container maximum, 1280 px | 1140px | 1280px; B 1140px and U 1280px retained; all none at 390 |
| Layer bare th/td border, light | rgb(222, 226, 230) | rgb(209, 213, 220) |
| Layer bare th/td border, dark | rgb(73, 80, 87) | rgb(74, 85, 101) |
| Partition Bootstrap winner | Unmapped same-element reading | Same-element mapReading, keyed by role and longhand; original values retained outside the map |
| Preservation live baseline and CSSOM attribution | Lifted Bootstrap | Tuned sheet alone |
| Paired engine proof (fourth run → fifth run) | Tuned sheet alone | Selectable Bootstrap face; row label restored to three equal faces |
| Four content contrast subjects in matrix | Whatever face the previous clause left active | Explicitly selects tailwindcss before reading |
| Header neutrality | No differences after old exclusions | Only token colors/scales and their font-related box/position consequences, per appended rulings |

The eleven added rows extend the existing caption reader and its wrong-caption control. No Bootstrap/unexcluded color or component expectation was replaced with a mapped value. Engine output assertions are unchanged. New specimen titles extend the census by four; no coverage was removed.

## Preservation reader

`INHERITED_LONGHANDS` contains **115** frozen, readonly-set entries. Its sole inheritance authority is Chromium 141.0.7390.37’s [property metadata](https://raw.githubusercontent.com/chromium/chromium/141.0.7390.37/third_party/blink/renderer/core/css/css_properties.json5): inherited, computable longhands behind no experimental flag, intersected with the browser’s computed-style enumeration. It includes `user-select`, `text-wrap-mode`, `text-wrap-style`, and `white-space-collapse`; the unenumerated `white-space` shorthand is absent. The derivation is named in the set’s TSDoc.

The logical overflow twins collapse into physical axes under the existing horizontal-tb/ltr premise. [CSS Overflow 3](https://www.w3.org/TR/css-overflow-3/#overflow-properties) supplies the visible-to-auto coupling rule; each dependent departure names its actual anchor in `through`. An axis with its own declaration keeps that direct attribution, avoiding a circular dependency when both axes become auto. Chromium’s user-agent rules give section elements `vertical-align: middle` and only `tr`, `td`, and `th` `vertical-align: inherit`. Attribution now follows only a departing element’s immediate parent; the parent keeps its own cause. A table-only departure and a section-element departure are refused.

| Width | Inherited text-wrap-mode | Inherited vertical-align | Logical overflow twins | Coupled overflow | Total former refusals |
| --- | --- | --- | --- | --- | --- |
| 1280 | 728 | 5 | 34 | 8 | 775 |
| 390 | 728 | 5 | 34 | 8 | 775 |

The copy-set control retains only the former regular expression’s members and recovers 728 text-wrap-mode refusals per width. Disabling coupling recovers eight overflow refusals (five overflow-x and three overflow-y), each visible → auto. Both controls prove the empty-refusal assertion would fail. Stripped curation and a planted preflight word-spacing rule remain negative controls; intact curation remains the positive control. No attribution exemption was added.

Fresh focused and full-run preservation evidence is reported below. The five live cell departures continue through their departing rows.

## Contrast

Fresh readings from the passing app browser suite, rounded to six decimals. Transparent backgrounds are composited by the contrast reader. Full foreground/background pairs and precision: [browser evidence](app-browser-6b-evidence.json).

| Mode | Face | Bootstrap button | No-layer button | Layer button | Light button | Dark button |
| --- | --- | --- | --- | --- | --- | --- |
| Light | Bootstrap | 4.689302 | 21.000000 | 21.000000 | 4.689302 | 21.000000 |
| Light | Tailwind, no layer | 21.000000 | 4.689302 | 21.000000 | 4.689302 | 21.000000 |
| Light | Tailwind + layer | 21.000000 | 21.000000 | 4.836368 | 4.836368 | 21.000000 |
| Dark | Bootstrap | 4.689302 | 15.426285 | 15.426285 | 15.426285 | 4.689302 |
| Dark | Tailwind, no layer | 15.426285 | 4.689302 | 15.426285 | 15.426285 | 4.689302 |
| Dark | Tailwind + layer | 20.134270 | 20.134270 | 4.836368 | 20.134270 | 4.836368 |

| Mode | Face | Veneer heading | Containers lead | Container widths caption | Containers contents link |
| --- | --- | --- | --- | --- | --- |
| Light | Bootstrap | 15.426285 | 6.781063 | 15.426285 | 21.000000 |
| Light | Tailwind, no layer | 15.426285 | 6.781063 | 15.426285 | 21.000000 |
| Light | Tailwind + layer | 20.134270 | 9.585666 | 20.134270 | 21.000000 |
| Dark | Bootstrap | 11.846723 | 7.292024 | 11.846723 | 15.426285 |
| Dark | Tailwind, no layer | 11.846723 | 7.292024 | 11.846723 | 15.426285 |
| Dark | Tailwind + layer | 16.262354 | 9.168423 | 16.262354 | 20.134270 |

All required layer readings exceed 4.5. Header pressed foreground is white on `rgb(106, 114, 130)` under the layer, versus `rgb(108, 117, 125)` under B/U. The case retains both an accepted and a refused contrast fixture.

## Durable header proof

At 390/768/1280 px, all faces in both modes retain five single-line buttons, one face-button row inside the viewport, and the required wide brand/group arrangement. Heights are **116 / 48 / 48 px** on every face. The narrow header occupies 13.744% of the 844 px viewport. Contents headings land within the existing 1 px tolerance of the 8 px gap. No remaining departure is reported.

The durable DOM/pseudo-element reader counts layer token admissions below; B/U have zero. Each mode/width repeats identically when toggled back. These are a different surface population from P4’s plain-element header snapshot, whose counts are recorded separately.

| Width | Mode | Palette | Font | Radius | Shadow | Geometry | Refusals |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 390 | Light | 166 | 30 | 0 | 0 | 50 | 0 |
| 390 | Dark | 167 | 30 | 0 | 0 | 50 | 0 |
| 768 | Light | 166 | 30 | 0 | 0 | 60 | 0 |
| 768 | Dark | 167 | 30 | 0 | 0 | 60 | 0 |
| 1280 | Light | 166 | 30 | 0 | 0 | 60 | 0 |
| 1280 | Dark | 167 | 30 | 0 | 0 | 60 | 0 |

All admitted per-longhand counts, including box, origins, and physical/logical positions, are retained in [browser evidence](app-browser-6b-evidence.json).

## P4 repeatability and T4 handoff

P4 is adapted under this unit’s scratch directory and reads the rebuilt application. The original flip-header probe is unchanged. Both runs and their byte comparison are listed in the acceptance table. Each width has zero remaining chrome departures, and the inverse/forward class control permits only the original replacement mechanics. [First result](out/p4-6a.json), [second result](out/p4-6b.json).

| Width | Palette | Font | Radius | Shadow | Geometry including boxes | Refusals |
| --- | --- | --- | --- | --- | --- | --- |
| 390 | 134 | 16 | 0 | 0 | 50 | 0 |
| 768 | 134 | 16 | 0 | 0 | 60 | 0 |
| 1280 | 134 | 16 | 0 | 0 | 60 | 0 |

Admitted layer longhands (boxes shown separately):

| Longhand | 390 | 768 | 1280 |
| --- | --- | --- | --- |
| -webkit-text-fill-color | 11 | 11 | 11 |
| -webkit-text-stroke-color | 11 | 11 | 11 |
| background-color | 2 | 2 | 2 |
| border-block-end-color | 6 | 6 | 6 |
| border-block-start-color | 5 | 5 | 5 |
| border-bottom-color | 6 | 6 | 6 |
| border-inline-end-color | 5 | 5 | 5 |
| border-inline-start-color | 5 | 5 | 5 |
| border-left-color | 5 | 5 | 5 |
| border-right-color | 5 | 5 | 5 |
| border-top-color | 5 | 5 | 5 |
| caret-color | 11 | 11 | 11 |
| color | 11 | 11 | 11 |
| column-rule-color | 11 | 11 | 11 |
| fill | 2 | 2 | 2 |
| font-family | 16 | 16 | 16 |
| inline-size | 10 | 11 | 11 |
| inset-inline-end | 0 | 1 | 1 |
| inset-inline-start | 0 | 1 | 1 |
| left | 0 | 1 | 1 |
| outline-color | 11 | 11 | 11 |
| perspective-origin | 10 | 11 | 11 |
| right | 0 | 1 | 1 |
| text-decoration-color | 11 | 11 | 11 |
| text-emphasis-color | 11 | 11 | 11 |
| transform-origin | 10 | 11 | 11 |
| width | 10 | 11 | 11 |
| box (separate) | 10 | 12 | 12 |

T4 replacement sentence (no guide edited): “The chrome departs between faces only by the token rows: in the light-mode header, the layered face has 134 palette and 16 font departures at 390, 768, and 1280 px, plus 50 font-related geometry departures at 390 px and 60 at 768 and 1280 px; the unexcluded face has no remaining departure after the existing exclusions.”

## Digests and stamp

The standalone showcase was regenerated only through `npm run build:showcase`. Both stylesheet digests still match launch. [Digest evidence](digests-6.txt), [stamp](stamp-6.txt).

| Artifact | SHA-256 |
| --- | --- |
| showcase/browser.html | ab6472de506d695fa8e583b6da419bce3489cf6c9cbc307746627bbbf1483c48 |
| dist/src/bootstrap/index.css | 7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f |
| dist/src/tailwindcss/index.css | 9a20b9662d0ee44abc317e2fbd31d16e1f81e46de9be4166e865c846b659edeb |

Build stamp: `94aaf778a79583794e34c0ed2e04d18c58c46a6bccb3fc8c883e59ab04a643dd`.

## Preservation and partition counts

The focused preservation and partition proofs read the final specimen set. [Focused evidence](style-proofs-6-evidence.json), [full journey evidence](journey-6-evidence.json).

| Width | Elements | Signatures | Boxes | Utility | Resolved | Inherited | Dependent | Admitted | Preflight | Unattributed | Lost boxes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1280 | 10225 | 1458 | 9704 | 6574 | 75 | 734 | 8 | 3 | 0 | 0 | 0 |
| 390 | 10225 | 1458 | 9526 | 6583 | 28 | 734 | 8 | 3 | 0 | 0 | 0 |

The 218 excluded chrome elements and the three documented description-list margin admissions retain their existing rules. Exclusion counts:

| Width | Layout | Typography | Invisible | Excluded | Position | Grid | Propagated excluded dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1280 | 4574 | 0 | 3234 | 1458 | 0 | 7 | 14 |
| 390 | 4646 | 0 | 3230 | 1458 | 0 | 3 | 14 |

Partition population at each width/face: **8,271 elements, 1,670 signatures, 209 shared names (192 utilities, 17 components)**. The same-element map explains every Bootstrap winner.

| Width | Clause 1 | Clause 2 | Clause 3 | Utility differences | Component differences | Violations |
| --- | --- | --- | --- | --- | --- | --- |
| 1280 | 14403 | 186 | 21946 | 5814 | 36 | 0 |
| 390 | 14420 | 188 | 21963 | 5814 | 36 | 0 |

Partition exclusions in competing / resolved / masked / geometry order:

| Width | Clause 1 | Clause 2 | Clause 3 |
| --- | --- | --- | --- |
| 1280 | 123 / 32 / 12 / 656 | 42 / 254 / 0 / 0 | 1316 / 669 / 12 / 34 |
| 390 | 106 / 32 / 12 / 656 | 32 / 258 / 0 / 0 | 1299 / 669 / 12 / 34 |

The partition itself runs again with `scales: undefined`. At 1280 px it reports exactly two clause-2 `max-width` violations: the `div.container` signature and `div.bg-body-tertiary.border.container.py-2.rounded`, each expecting `1140px` and reading `1280px`. At 390 px it reports none. Both mapped runs report none. This moves the negative control into the shared-name population; `.btn-primary` remains outside that population.

The primary-button mapping demonstration compares `rgb(13, 110, 253)` against `rgb(21, 93, 252)` and proves equality fails; `mapReading` makes it agree. The `.modal-xl` control keeps `1140px` at 1280 and `none` at 390 under both faces, proving a container-role width mapping cannot leak into the modal. The original planted/shared-rule, wrong-face, and curation controls remain in place; their results are retained in the full journal.

## Captured figures

The prior pass produced sixteen supplemental captures, retained here as prior-pass evidence: four new figures at 390 and 1280 px in light and dark mode under the layer. Representative inspected captures: [narrow primary/link](out/token-390-Light-primary.png), [narrow dark radius/shadow](out/token-390-Dark-scale.png), [wide table](out/token-1280-Light-table.png), [wide dark breakpoint](out/token-1280-Dark-breakpoint.png). The captions remain readable inside the figure chrome with no clipping. The durable keyboard test, rather than a screenshot alone, proves the focus halo. [Capture journal](capture-tokens-5.log).

## Review disposition

The 2026-10-05 ruling governs this pass. The implementation follows its prescriptions; findings 6, 7, and 12 remain assigned to T4. The existing uncommitted work is retained. No commit, dependency installation, source stylesheet change, or guide edit was made.

| Findings | Repair and evidence |
| --- | --- |
| 1 | Table alignment attribution reads only the immediate parent of a departing `tr`, `th`, or `td` element. A table-only departure and a section-element departure are refused. The browser premise reads the cell as `middle` under `table { vertical-align: top }`, then `top` after `tbody { vertical-align: inherit }`. |
| 2, 19 | The inherited set includes `user-select`. Its 115 members derive from Chromium 141.0.7390.37 property metadata: inherited, computable longhands behind no experimental flag, intersected with computed-style enumeration. Chromium is the sole inheritance authority; the CSS Property Index attribution and exclusion sentence are removed. |
| 3 | Synthetic maps reach the absent, visible, clip, and unchanged twin guards. A rendered overflow fixture keeps the declared axis `utility` with no `through` field, counts its coupled twin under `dependent`, and refuses the twin with coupling disabled. |
| 4 | Reader comments use titled links and code notation; options document inherited-set overrides and coupling controls, including defaults. |
| 5 | J4 says contending variants “might push” its cycle past the default budget. Its 60-second budget is retained. |
| 8, 9 | Container captions use the exact prescribed face form and code elements for class names. Pinned widths remain Bootstrap 1140 px and both Tailwind faces 1280 px at a 1280 px viewport. |
| 10, 16 | The reading contract documents each face's minimum width, its default, and the narrow-value rule. A setup proof checks 600 px: Bootstrap reads `left`, the layer reads `center`. |
| 11 | Both added Showcase cases capture and restore their entry viewport in `finally`. |
| 13 | The unmapped control runs the partition itself on shared container signatures. The primary button remains a mapping demonstration outside that population. The setup component-color proof fails without the map and passes with it. Explicit `undefined` is admitted by the optional `scales` type for the prescribed control. |
| 14 | The mapping helper documents its dark-context prerequisite. Setup proofs read light `#dee2e6` as `#d1d5dc` and expose the documented dark-dropdown limit: its actual layer color is `#d1d5dc`, while the context-based helper returns `#e5e7eb`. Mapping behavior is unchanged. |
| 15 | Partition documentation states both winner models, the effect of omitted scales, and the absent-longhand failure. |
| 17 | The chrome example uses a result comment and documents index/surface errors. |
| 18 | Rendered setup fixtures admit palette and radius pairs, refuse an off-palette color and unsupported width geometry, check the minimum branch, and compare the token caption rows with record-derived mappings under both themes. The radius fixture uses a 12 px consumer reference against the 6 px Bootstrap literal. |

The prescribed fixes close with mutation probes. Each command collected its named case, failed exactly that case, and restored the original source in `finally`; the subsequent complete setup suite passes. See [mutation driver](mutations-6.ts), [run](mutations-6.log), and [exit](mutations-6.err).

| Mutation | Named case | Result |
| --- | --- | --- |
| Admit the table ancestor beyond the parent | `attributes enumerated inherited longhands and confines table alignment to the inheriting parent` | 1 failed: expected `unattributed`, received `inherited` |
| Remove `user-select` | Same inherited-longhand case | 1 failed: required membership absent |
| Disable declared-axis precedence | `keeps the declared overflow axis direct and attributes its coupled twin as dependent` | 1 failed: declared axis becomes `unattributed` through the other axis |
| Apply partition mapping to the wrong face | `maps a Bootstrap component color winner only when scales are supplied to the partition` | 1 failed: mapped run reports color violations |

These are rendered Chromium proofs, not a Node-stage `prove` receipt. The runner commands and complete diagnostics are retained in `mutation-table-6.log`, `mutation-inherited-6.log`, `mutation-coupling-6.log`, and `mutation-partition-6.log`.

## T4 handoff

The following paths remain unedited, as the ruling requires:

- Finding 6: `guides/veneer.md:1290` and `guides/veneer.md:2005` retain `1140px` in the layer column; replace it with `1280px`. The Faces table at lines 1997–2014 needs the primary button/link/focus, primary table, radius/shadow, and mapped-sm figures, plus alert colors and bare-cell borders. Lines 1993–1995 must name `changes alignment at each mapped sm boundary under every face` and `paints and clears the mapped focus halo through Tab under every face and theme`.
- Finding 7: `ROADMAP.md:144` retains “23 specimens”; the tested census is 27.
- Finding 12: `app/browser/constants.ts:534` ends the section lead before the mapped-token specimens. Extend its ending to “… through curated components and the utility names both systems declare to the tokens the layer maps.”

The Header replacement sentence and its retained measured counts appear in the P4 section of this report.

## Header budget and serial run conditions

The complete app browser suite passes all 239 tests. Its header-neutrality body, including viewport restoration and cleanup, took **59.5945 s** against **60 s**, leaving **0.4055 s**. Under the last ruling and `tests.md` § Expensive proofs, the case now has a **90 s** budget. Its assertions and readings are unchanged. The focused rerun passes in **59.5522 s**, leaving **30.4478 s** against that budget; Vitest took 71.54 s and dispatch took 73.333 s. The focused result is [header-6.log](header-6.log), [exit](header-6.err). The first reading is [app-browser-6b.log](app-browser-6b.log).

J4 retains its 60 s budget, with the prescribed “might push” comment. The paired engine proof remains a comparison of the three selectable faces. It retains 120 s; the preservation and partition proofs retain 300 s. No project configuration or engine timeout changed.

All acceptance commands run serially, with no other heavy job observed on this host. Node is 22.22.2 and Chromium is 141.0.7390.37. npm uses the already installed 11.21.0 binary to satisfy `devEngines`; no dependency or manifest was installed or changed. Multi-minute commands use the built scaffold dispatch launcher. The full journey process cap is 1400 s, carried from the measured prior run; the full journey is launched once in this pass.

## Final journey results and wall times

The single full run took **858.59 s Vitest / 861.184 s dispatch** and exited **1**, with **4 failed | 86 passed | 6 skipped (96)**. [Full journal](journey-6.log), [errors and exit](journey-6.err), [bounded evidence](journey-6-evidence.json). Every failing title and variant is in [lanes.md § Host-bound set](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md:51):

- `FAIL  |journey:light-390 (chromium)| tests/app/browser/integration.test.ts:517:2 > showcase journeys > J8 drives the engine through the component sections and opens nothing on arrival`
- `FAIL  |journey:light-390 (chromium)| tests/app/browser/integration.test.ts:1782:2 > showcase statecharts > drives the 'accordion' table through its controls with motion=false`
- `FAIL  |journey:dark-390 (chromium)| tests/app/browser/integration.test.ts:1782:2 > showcase statecharts > drives the 'tooltip' table through its controls with motion=true`
- `FAIL  |journey:dark-390 (chromium)| tests/app/browser/integration.test.ts:1782:2 > showcase statecharts > drives the 'collapse' table through its controls with motion=false`

J8 reports the upload-toast region is not visible. Accordion and collapse report the named disclosure Enter-burst waits reaching their 5000 ms limits. Tooltip reports a delayed lifecycle event during the Escape refusal. These match the documented Host-bound symptoms; no engine source, engine test, or project configuration was edited. J4, the matrix readings, all four paired engine cases, preservation, partition, header statecharts, and portfolio cases pass. This is not a zero-exit journey gate and was not rerun.

The wall time is **267.59 s** above the recorded 446–591 s range's upper bound, **363.568 s** above T2's 495.022 s, and **96.83 s** above the prior pass's 761.76 s. The increase is reported without a causal attribution.


| Measured body | Variant | Seconds |
| --- | --- | --- |
| Face journey duration | light-1280 | 13.0764 |
| Face journey duration | light-390 | 12.1280 |
| Face journey duration | dark-390 | 14.1570 |
| Face journey duration | dark-1280 | 15.2375 |
| Paired engine duration | dark-390 | 55.1510 |
| Paired engine duration | light-1280 | 90.3293 |
| Paired engine duration | light-390 | 25.4965 |
| Paired engine duration | dark-1280 | 86.5735 |
| Component preservation duration | light-1280 | 148.9911 |
| Partition duration | light-1280 | 143.1611 |

Focused preservation took 95.2441 s and focused partition took 85.7865 s, versus 148.9911 s and 143.1611 s in the full run. These are body times, not estimates of suite wall time. The corrected unmapped partition control repeats a complete partition scan at each width. No ablation was run to assign the wall-time difference to that control or other work.

## Acceptance ledger

The latest ruling's order was followed: check, lint, format, setup browser, app browser, builds, P4 twice, focused style proofs, then the full journey. The extra focused header rerun closes the budget adjustment before the builds. Every command's full output and exit remain under this unit directory.

| Command | Exit | Dispatch seconds | Result / evidence |
| --- | --- | --- | --- |
| npm run check | 0 | 72.013 | Passed ([journal](check-6c.log), [exit](check-6c.err)) |
| npm run lint:check | 0 | 1.698 | Passed ([journal](lint-6b.log), [exit](lint-6b.err)) |
| npm run format:check | 0 | 4.779 | 359 files passed ([journal](format-6b.log), [exit](format-6b.err)) |
| npm run test:setup:browser | 0 | 212.798 | 156 passed; 211.06 s Vitest ([journal](setup-browser-6b.log), [exit](setup-browser-6b.err)) |
| npm run test:app:browser | 0 | 155.020 | 239 passed; 153.47 s Vitest ([journal](app-browser-6b.log), [exit](app-browser-6b.err)) |
| Focused header after budget adjustment | 0 | 73.333 | 1 passed, 20 skipped ([journal](header-6.log), [exit](header-6.err)) |
| npm run build:app:browser | 0 | 2.031 | Passed; standard >500 kB chunk warning ([journal](build-app-6.log), [exit](build-app-6.err)) |
| npm run build:showcase | 0 | 1.564 | Passed ([journal](build-showcase-6.log), [exit](build-showcase-6.err)) |
| Adapted P4 first run | 0 | 58.761 | Zero header refusals at all three widths ([journal](p4-6a.log), [exit](p4-6a.err)) |
| Adapted P4 second run | 0 | 60.045 | Byte-identical result; cmp exit 0 ([journal](p4-6b.log), [exit](p4-6b.err)) |
| Focused preservation and partition | 0 | 196.389 | 2 passed, 20 skipped; 194.99 s Vitest ([journal](style-proofs-6.log), [exit](style-proofs-6.err)) |
| npm run test:journey (single full run) | 1 | 861.184 | 86 passed, 4 Host-bound failures, 6 skipped; 858.59 s Vitest ([journal](journey-6.log), [exit](journey-6.err)) |
| Final lint after the header budget edit | 0 | 1.904 | Passed ([journal](lint-6-final.log), [exit](lint-6-final.err)) |
| Final format after the header budget edit | 0 | 4.463 | 359 files passed ([journal](format-6-final.log), [exit](format-6-final.err)) |

`sha256sum`, `cmp`, `git diff --check`, and `git status --porcelain` all exited 0. The post-journey digests equal the build digests, and the two P4 files still compare equal: [checkout receipt](checkout-6.json), [P4 comparison](p4-cmp-6.json).

Development failures are retained: the initial focused dark-dropdown proof selected an active item; narrowing it to a non-active, enabled item exposed the intended context limit and the rerun passed. The initial check wrapper used the wrong npm shim path; the next check exposed the prescribed explicit `scales: undefined` against `exactOptionalPropertyTypes`, so the optional type now admits explicit `undefined`. Lint found a shadowed callback binding, renamed to `literal`. The clean ordered gate runs above follow those corrections. Mutation failures are intentional and listed separately. No assertion was removed to pass a gate.

## Checkout status

HEAD remains `4333d768c9dc1b9b94efe1bb3008b6cab8a59bac`. No commit, stage, or release action was performed. The final ruling explicitly authorizes the reader and setup-proof corrections. Guide, roadmap, section-lead, engine, stylesheet, manifest, and configuration files remain outside this pass's edits.

```text
 M app/browser/sections/containers.html
 M app/browser/sections/tables.html
 M app/browser/sections/tailwindcss.html
 M showcase/browser.html
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/integration.test.ts
 M tests/app/browser/sections/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```
