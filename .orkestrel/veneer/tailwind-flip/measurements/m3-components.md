# M3 component departures under the flip

Every one of the 4882 elements in the 61 documents departs C-vs-A and D-vs-A in at least `tab-size` (8 to 4), so no fragment is free of component-class departures; the 3 fragments with the fewest are listed in item 6. Chromium 141.0.7390.37 (`browser.version()`; the probe launched the Playwright default, which resolved). Repository /home/user/veneer at 4929856.

## Method

- Probe `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` reads every element under `main` in document order under A, D, C, and 2 controls (Dt, Ct: the same as D and C with the `.text.css` alternates of the minus-shared sheets). It writes `departures.json`, `elements.json`, `declared.json`, `control-text.json`, and `run.json`; its log is `probe.log`.
- Analysis `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` writes `summary.md`, `curation-candidates.md`, `functional.md`, `shared-utility-census.md`, `analysis.json`, and this report.
- Sheets: `/home/user/veneer/tmp/probes/flip/sheets/` per its manifest.json; each as an inline `<style>` in condition order, the Tailwind compile first.
- Class sets: shared 209; shared ∩ utilities 192; shared ∩ components 17 (caption-top, col-1, col-10, col-11, col-12, col-2, col-3, col-4, col-5, col-6, col-7, col-8, col-9, col-auto, collapse, container, table). Every one of the 192 shared utilities has at least one exact `.NAME` rule in bootstrap-lifted.css. tailwind-flipped.css carries 206 class tokens, 14 of them outside the shared set (bg-sky-500, divide-y, grid, grid-cols-3, md:flex, mt-[1rem], px-8, ring-2, ring-sky-500, rounded-full, shadow-xl, size-12, space-y-2, tracking-wide).
- Read: every enumerable non-custom computed longhand (406 names; the probe checked the population equal across all elements and conditions), the 5 pseudo-elements with the collectPseudos gates (`::before`/`::after` when `content` is not none/normal and `display` is not none; `::placeholder` when `:placeholder-shown`; `::file-selector-button` on a file input; `::marker` when `display` includes list-item), a `(present)` row per pseudo, and the bounding box (x, y relative to main; width, height; `none` without client rects). Running animations paused at time 0. No script ran.
- 55 fragment files exist under app/browser/sections/ (the brief named 56). 6 fragments also read at 390x844, so 61 documents.

## Totals

The following table gives the totals; per-document rows are in summary.md.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/elements.json`, `/home/user/veneer/tmp/probes/flip/m3-components/departures.json`, `/home/user/veneer/tmp/probes/flip/m3-components/summary.md`.

| label | elements | D-vs-A pairs | C-vs-A pairs |
| --- | --- | --- | --- |
| component-class | 3197 | 33985 | 36598 |
| shared-utility | 530 | 7638 | 8397 |
| bootstrap-other | 573 | 5781 | 7289 |
| bare | 582 | 4095 | 6932 |
| all | 4882 | 51499 | 59216 |

departures.json holds 59241 rows (a row departs in D, C, or both). Pairs where D differs from C, by label: component-class 4568, shared-utility 943, bootstrap-other 1988, bare 2985.

The following table gives the 30 most frequent C-vs-A (longhand, A, C) values over all labels.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/departures.json`.

| property | A | C | pairs |
| --- | --- | --- | --- |
| tab-size | 8 | 4 | 4882 |
| border-inline-start-style | none | solid | 3438 |
| border-left-style | none | solid | 3438 |
| border-inline-end-style | none | solid | 3431 |
| border-right-style | none | solid | 3431 |
| border-block-end-style | none | solid | 3376 |
| border-bottom-style | none | solid | 3376 |
| border-block-start-style | none | solid | 3152 |
| border-top-style | none | solid | 3152 |
| font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | 357 |
| font-size | 12.25px | 14px | 355 |
| line-height | 18.375px | 21px | 355 |
| inline-size | 582px | 400px | 314 |
| width | 582px | 400px | 314 |
| box width | 582 | 400 | 314 |
| box height | 14 | 16 | 304 |
| column-gap | 16px | 12px | 245 |
| row-gap | 16px | 12px | 245 |
| ::marker tab-size | 8 | 4 | 200 |
| border-block-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 199 |
| border-bottom-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 199 |
| border-inline-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 199 |
| border-inline-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 199 |
| border-left-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 199 |
| border-right-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 199 |
| border-block-end-color | rgb(222, 226, 230) | rgb(0, 0, 0) | 199 |
| border-bottom-color | rgb(222, 226, 230) | rgb(0, 0, 0) | 199 |
| border-inline-end-color | rgb(222, 226, 230) | rgb(0, 0, 0) | 199 |
| border-inline-start-color | rgb(222, 226, 230) | rgb(0, 0, 0) | 199 |
| border-left-color | rgb(222, 226, 230) | rgb(0, 0, 0) | 199 |

## Curation candidates (item 3)

The population is 36598 C-vs-A occurrences on component-class elements in 11743 distinct rows; curation-candidates.md lists every row. Strict attribution applies the brief's rules literally. Extended attribution leaves strict non-unknown results as they are and, for a strict unknown, adds 4 readings: a tag outside the 61-element preflight.json census (for example `li`, `figcaption`) takes the `div` row of the same pseudo and longhand (the universal `*` and inherited `html` rows); a logical longhand maps to its physical one for horizontal-tb ltr; width, height, inline-size, block-size, perspective-origin, and transform-origin count as layout-resolved like box fields; and a box or layout-resolved departure on an element carrying a shared utility counts as shared-utility-self.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/departures.json`, `/home/user/veneer/tmp/probes/flip/m3-components/curation-candidates.md`.

| attribution | strict occurrences (first match) | strict occurrences (any match) | extended occurrences (first match) |
| --- | --- | --- | --- |
| preflight | 21904 | 21904 | 25238 |
| shared-utility-self | 1643 | 1803 | 4836 |
| shared-utility-ancestor | 2712 | 4092 | 4210 |
| unexcluded-tailwind | 2 | 21 | 2 |
| unknown | 10337 | 10337 | 2312 |

Of the 11743 distinct rows, 2943 are `tab-size` or `border-*-style` (none to solid with a 0 width where no border is declared). The following table lists the 40 most frequent remaining rows.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/departures.json`, `/home/user/veneer/tmp/probes/flip/m3-components/curation-candidates.md`.

| component classes carried | tag | longhand | A | C | occurrences | strict | extended |
| --- | --- | --- | --- | --- | --- | --- | --- |
| card-body | div | column-gap | 16px | 12px | 225 | shared-utility-self 225 | shared-utility-self 225 |
| card-body | div | row-gap | 16px | 12px | 225 | shared-utility-self 225 | shared-utility-self 225 |
| card-footer small | figcaption | block-size | 59.375px | 60px | 107 | preflight 107 | preflight 107 |
| card-footer small | figcaption | box height | 59.375 | 60 | 107 | preflight 107 | preflight 107 |
| card-footer small | figcaption | height | 59.375px | 60px | 107 | preflight 107 | preflight 107 |
| card-footer small | figcaption | perspective-origin | 307px 29.6875px | 307px 30px | 97 | preflight 97 | preflight 97 |
| card-footer small | figcaption | transform-origin | 307px 29.6875px | 307px 30px | 97 | preflight 97 | preflight 97 |
| card-footer small | figcaption | block-size | 84.375px | 85px | 50 | preflight 50 | preflight 50 |
| card-footer small | figcaption | box height | 84.375 | 85 | 50 | preflight 50 | preflight 50 |
| card-footer small | figcaption | height | 84.375px | 85px | 50 | preflight 50 | preflight 50 |
| card-footer small | figcaption | perspective-origin | 307px 42.1875px | 307px 42.5px | 35 | preflight 35 | preflight 35 |
| card-footer small | figcaption | transform-origin | 307px 42.1875px | 307px 42.5px | 35 | preflight 35 | preflight 35 |
| modal-title | h4 | font-weight | 500 | 400 | 35 | preflight 35 | preflight 35 |
| offcanvas-title h5 | h4 | font-size | 20px | 16px | 29 | preflight 29 | preflight 29 |
| offcanvas-title h5 | h4 | font-weight | 500 | 400 | 29 | preflight 29 | preflight 29 |
| offcanvas-title h5 | h4 | line-height | 30px | 24px | 29 | preflight 29 | preflight 29 |
| list-group-item | li | list-style-type | disc | none | 25 | shared-utility-ancestor 25 | shared-utility-ancestor 25 |
| offcanvas-header | div | block-size | 62px | 56px | 25 | preflight 25 | preflight 25 |
| offcanvas-header | div | box height | 62 | 56 | 25 | preflight 25 | preflight 25 |
| offcanvas-header | div | height | 62px | 56px | 25 | preflight 25 | preflight 25 |
| offcanvas-title h5 | h4 | block-size | 30px | 24px | 25 | preflight 25 | preflight 25 |
| offcanvas-title h5 | h4 | box height | 30 | 24 | 25 | preflight 25 | preflight 25 |
| offcanvas-title h5 | h4 | height | 30px | 24px | 25 | preflight 25 | preflight 25 |
| nav-item | li | box y | 102 | 96 | 18 | preflight 18 | preflight 18 |
| nav-link | a | box y | 102 | 96 | 18 | preflight 18 | preflight 18 |
| ratio ratio-4x3 | div | border-block-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 18 | unknown 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-block-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 18 | unknown 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-bottom-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 18 | shared-utility-self 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-bottom-left-radius | 6px | 4px | 18 | shared-utility-self 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-bottom-right-radius | 6px | 4px | 18 | shared-utility-self 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-end-end-radius | 6px | 4px | 18 | unknown 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-end-start-radius | 6px | 4px | 18 | unknown 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-inline-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 18 | unknown 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-inline-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 18 | unknown 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-left-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 18 | shared-utility-self 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-right-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 18 | shared-utility-self 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-start-end-radius | 6px | 4px | 18 | unknown 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-start-start-radius | 6px | 4px | 18 | unknown 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-top-color | rgb(222, 226, 230) | rgb(33, 37, 41) | 18 | shared-utility-self 18 | shared-utility-self 18 |
| ratio ratio-4x3 | div | border-top-left-radius | 6px | 4px | 18 | shared-utility-self 18 | shared-utility-self 18 |

## Functional candidates (item 4)

functional.md holds 4474 rows: 7 in the listed longhands and 4467 box fields moving by more than 1px. No component-class element departs in visibility, opacity, pointer-events, position, overflow-x, overflow-y, or z-index. The following table lists the 7 longhand rows.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/departures.json`, `/home/user/veneer/tmp/probes/flip/m3-components/functional.md`.

| fragment | viewport | path | tag | classes | within | property | A | D | C | strict | extended |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| breadcrumb.html | 1280x800 | main>div:nth-of-type(1)>div:nth-of-type(2)>figure:nth-of-type(1)>div:nth-of-type(1)>nav:nth-of-type(1)>ol:nth-of-type(1)>li:nth-of-type(1)>a:nth-of-type(1)>svg:nth-of-type(1) | svg | bi bi-house | link-body-emphasis | display | inline | block | block | preflight | preflight |
| buttons.html | 1280x800 | main>div:nth-of-type(1)>div:nth-of-type(4)>figure:nth-of-type(1)>div:nth-of-type(1)>button:nth-of-type(3)>svg:nth-of-type(1) | svg | bi bi-gear | btn btn-outline-secondary text-body-emphasis | display | inline | block | block | preflight | preflight |
| figures.html | 1280x800 | main>div:nth-of-type(1)>div:nth-of-type(1)>figure:nth-of-type(1)>div:nth-of-type(1)>figure:nth-of-type(1)>img:nth-of-type(1) | img | figure-img img-fluid rounded | figure mb-0 | display | inline | block | block | preflight | preflight |
| figures.html | 1280x800 | main>div:nth-of-type(1)>div:nth-of-type(2)>figure:nth-of-type(1)>div:nth-of-type(1)>figure:nth-of-type(1)>img:nth-of-type(1) | img | figure-img img-fluid rounded | figure mb-0 | display | inline | block | block | preflight | preflight |
| tailwindcss.html | 1280x800 | main>div:nth-of-type(2)>div:nth-of-type(6)>figure:nth-of-type(1)>div:nth-of-type(1)>div:nth-of-type(1)>div:nth-of-type(1) | div | card-body grid grid-cols-3 gap-3 text-center | card w-100 | display | block | grid | grid | unexcluded-tailwind | unexcluded-tailwind |
| visually-hidden.html | 1280x800 | main>div:nth-of-type(1)>div:nth-of-type(1)>figure:nth-of-type(1)>div:nth-of-type(1)>button:nth-of-type(1)>svg:nth-of-type(1) | svg | bi bi-gear | btn btn-outline-secondary text-body-emphasis | display | inline | block | block | preflight | preflight |
| visually-hidden.html | 1280x800 | main>div:nth-of-type(1)>div:nth-of-type(1)>figure:nth-of-type(1)>div:nth-of-type(1)>button:nth-of-type(2)>svg:nth-of-type(1) | svg | bi bi-download | btn btn-outline-secondary text-body-emphasis | display | inline | block | block | preflight | preflight |

The following table counts the box rows per field.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/departures.json`, `/home/user/veneer/tmp/probes/flip/m3-components/functional.md`.

| field | rows |
| --- | --- |
| box y | 2083 |
| box height | 1233 |
| box width | 668 |
| box x | 483 |

## Shared-utility census (item 5)

At 1280x800, 1482 of 4005 elements carry at least one shared utility, across 74 distinct shared utility names; 118 of the 192 are carried by no fragment element. The per-fragment table is in shared-utility-census.md (Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/elements.json`, `/home/user/veneer/tmp/probes/flip/m3-components/shared-utility-census.md`.).

## Fragments ranked (item 6)

The following table gives the 5 fragments with the most C-vs-A departures on component-class elements (all viewports summed) and the 3 with the fewest. No fragment has none.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/departures.json`, `/home/user/veneer/tmp/probes/flip/m3-components/analysis.json`.

| rank | fragment | C-vs-A pairs, all viewports | C-vs-A pairs, 1280x800 | component-class elements at 1280x800 |
| --- | --- | --- | --- | --- |
| 1 | offcanvas.html | 3963 | 2038 | 165 |
| 2 | modal.html | 2892 | 1616 | 146 |
| 3 | navbar.html | 2318 | 1228 | 129 |
| 4 | card.html | 1297 | 1297 | 89 |
| 5 | list-group.html | 1244 | 1244 | 124 |
| fewest | clearfix.html | 103 | 103 | 8 |
| fewest | close-button.html | 127 | 127 | 15 |
| fewest | images.html | 132 | 132 | 12 |

## Serialization control

Rerunning D and C with the `.text.css` alternates changes 171 (element, property) readings; 171 rows of departures.json are among them. The following table counts the control rows per fragment and class attribute.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/control-text.json`.

| fragment and classes | rows |
| --- | --- |
| spinners.html: visually-hidden | 54 |
| offcanvas.html: placeholder col-10 | 20 |
| spinners.html: spinner-border spinner-border-sm | 16 |
| placeholders.html: placeholder col-4 | 11 |
| spinners.html: spinner-border text-primary | 8 |
| spinners.html: spinner-border text-secondary | 8 |
| spinners.html: spinner-border text-success | 8 |
| spinners.html: spinner-border text-danger | 8 |
| spinners.html: spinner-border text-warning | 8 |
| spinners.html: spinner-border text-info | 8 |
| spinners.html: spinner-border text-body-secondary | 8 |
| spinners.html: spinner-border | 8 |
| placeholders.html: placeholder col-7 | 5 |
| placeholders.html: placeholder col-6 | 1 |

The rows come from 2 CSSOM serialization effects. First, `.spinner-border` loses its `border` shorthand: its border widths read 3px under A and the text alternates and 0px under the CSSOM D and C, and the `visually-hidden` siblings in spinners.html move with it. Second, the CSSOM files round the column percentages (`.col-4 { width: 33.3333% }` in bootstrap-reboot-reset-minus-shared.css against `33.33333333%` in the `.text.css` alternate), so `.placeholder` elements carrying `col-4`, `col-6`, `col-7`, and `col-10` resolve to subpixel-different widths (for example 254.984px under CSSOM D against 255px under Dt). Every one of these 171 readings is a row of departures.json under the CSSOM sheets the brief named.
