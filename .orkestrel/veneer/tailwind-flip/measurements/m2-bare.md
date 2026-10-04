# M2 bare: the reboot in reset on bare elements

Chromium 141.0.7390.37, viewport 1280x720 (the iframe size `createPreflightFrame` in tests/setupStyles.ts sets), sheets as inline <style> elements in condition order through `page.setContent`. Every non-custom enumerable computed longhand (406 names) read per subject. Subjects: each of the 61 preflight.json elements, mounted bare and alone in body (svg in the SVG namespace), plus each pseudo-element of the 20 that `isExposed` passes under condition A; the same subject set is reused under B, C, and D. Exposure recomputed independently under B, C, and D differs from A for 0 conditions.

Shared set sizes from CLASS_NAMES.bootstrap and comparison.json: shared utilities 192, shared components 17 (caption-top, col-1, col-10, col-11, col-12, col-2, col-3, col-4, col-5, col-6, col-7, col-8, col-9, col-auto, collapse, container, table).

The following list gives each condition's sheets in <style> order and the CSSOM top-level rule count per sheet.

- A: bootstrap-lifted.css; top-level rules 1880.
- B: tailwind-unexcluded.css then bootstrap-lifted.css; top-level rules 25, 1880.
- C: tailwind-flipped.css then bootstrap-reboot-reset.css; top-level rules 25, 1876.
- D: tailwind-flipped.css then bootstrap-lifted.css; top-level rules 25, 1880.

Exposed pseudo-elements under A: every one of the 61 elements exposes exactly ::after, ::backdrop, and ::before (true); the other 17 preflight pseudos are not exposed on any bare element. Subjects read: 244.

## 1. Rows differing from A

rows.json holds 2792 (subject, longhand) rows where B, C, or D differs from A, with all four values.

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/rows.json`.

## 2. Moved longhands per condition against A

The following table gives the totals.

| Condition | Moved rows | Elements with a move |
| --- | --- | --- |
| B | 2594 | 61 |
| C | 2792 | 61 |
| D | 2594 | 61 |

Cross-checks: rows where B differs from D: 0. Rows moved under both C and D: 2594; of those, C differs from D in 0. Rows moved under C only: 198. Rows moved under D only: 0.

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/rows.json`.

### Condition B per element

The following table gives condition B's moved longhand count per element and subject.

| Element | host | ::after | ::backdrop | ::before | total |
| --- | --- | --- | --- | --- | --- |
| a | 9 | 9 | 10 | 9 | 37 |
| abbr | 9 | 9 | 10 | 9 | 37 |
| address | 9 | 9 | 10 | 9 | 37 |
| audio | 10 | 9 | 10 | 9 | 38 |
| b | 9 | 9 | 10 | 9 | 37 |
| blockquote | 9 | 9 | 10 | 9 | 37 |
| body | 9 | 9 | 10 | 9 | 37 |
| button | 48 | 25 | 26 | 25 | 124 |
| canvas | 11 | 9 | 10 | 9 | 39 |
| caption | 9 | 9 | 10 | 9 | 37 |
| code | 9 | 9 | 10 | 9 | 37 |
| dd | 9 | 9 | 10 | 9 | 37 |
| div | 9 | 9 | 10 | 9 | 37 |
| dl | 9 | 9 | 10 | 9 | 37 |
| dt | 9 | 9 | 10 | 9 | 37 |
| embed | 11 | 9 | 10 | 9 | 39 |
| fieldset | 1 | 9 | 10 | 9 | 29 |
| figure | 9 | 9 | 10 | 9 | 37 |
| h1 | 9 | 9 | 10 | 9 | 37 |
| h2 | 9 | 9 | 10 | 9 | 37 |
| h3 | 9 | 9 | 10 | 9 | 37 |
| h4 | 9 | 9 | 10 | 9 | 37 |
| h5 | 9 | 9 | 10 | 9 | 37 |
| h6 | 9 | 9 | 10 | 9 | 37 |
| hr | 1 | 9 | 10 | 9 | 29 |
| html | 10 | 10 | 11 | 10 | 41 |
| iframe | 3 | 9 | 10 | 9 | 31 |
| img | 12 | 9 | 10 | 9 | 40 |
| input | 48 | 25 | 26 | 25 | 124 |
| kbd | 9 | 9 | 10 | 9 | 37 |
| label | 9 | 9 | 10 | 9 | 37 |
| legend | 9 | 9 | 10 | 9 | 37 |
| mark | 9 | 9 | 10 | 9 | 37 |
| menu | 16 | 10 | 11 | 10 | 47 |
| object | 11 | 9 | 10 | 9 | 39 |
| ol | 10 | 10 | 11 | 10 | 41 |
| optgroup | 10 | 10 | 11 | 10 | 41 |
| option | 15 | 9 | 10 | 9 | 43 |
| output | 9 | 9 | 10 | 9 | 37 |
| p | 9 | 9 | 10 | 9 | 37 |
| pre | 9 | 9 | 10 | 9 | 37 |
| progress | 9 | 9 | 10 | 9 | 37 |
| samp | 9 | 9 | 10 | 9 | 37 |
| select | 32 | 25 | 26 | 25 | 108 |
| small | 9 | 9 | 10 | 9 | 37 |
| span | 9 | 9 | 10 | 9 | 37 |
| strong | 9 | 9 | 10 | 9 | 37 |
| sub | 9 | 9 | 10 | 9 | 37 |
| summary | 9 | 9 | 10 | 9 | 37 |
| sup | 9 | 9 | 10 | 9 | 37 |
| svg | 10 | 9 | 10 | 9 | 38 |
| table | 17 | 9 | 10 | 9 | 45 |
| tbody | 1 | 9 | 10 | 9 | 29 |
| td | 15 | 9 | 10 | 9 | 43 |
| textarea | 40 | 25 | 26 | 25 | 116 |
| tfoot | 1 | 9 | 10 | 9 | 29 |
| th | 15 | 9 | 10 | 9 | 43 |
| thead | 1 | 9 | 10 | 9 | 29 |
| tr | 1 | 9 | 10 | 9 | 29 |
| ul | 10 | 10 | 11 | 10 | 41 |
| video | 13 | 9 | 10 | 9 | 41 |

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/rows.json`.

### Condition C per element

The following table gives condition C's moved longhand count per element and subject.

| Element | host | ::after | ::backdrop | ::before | total |
| --- | --- | --- | --- | --- | --- |
| a | 9 | 9 | 10 | 9 | 37 |
| abbr | 9 | 9 | 10 | 9 | 37 |
| address | 11 | 9 | 10 | 9 | 39 |
| audio | 10 | 9 | 10 | 9 | 38 |
| b | 9 | 9 | 10 | 9 | 37 |
| blockquote | 11 | 9 | 10 | 9 | 39 |
| body | 9 | 9 | 10 | 9 | 37 |
| button | 48 | 25 | 26 | 25 | 124 |
| canvas | 11 | 9 | 10 | 9 | 39 |
| caption | 17 | 9 | 10 | 9 | 45 |
| code | 12 | 12 | 13 | 12 | 49 |
| dd | 11 | 9 | 10 | 9 | 39 |
| div | 9 | 9 | 10 | 9 | 37 |
| dl | 11 | 9 | 10 | 9 | 39 |
| dt | 9 | 9 | 10 | 9 | 37 |
| embed | 11 | 9 | 10 | 9 | 39 |
| fieldset | 9 | 9 | 10 | 9 | 37 |
| figure | 11 | 9 | 10 | 9 | 39 |
| h1 | 14 | 12 | 13 | 12 | 51 |
| h2 | 14 | 12 | 13 | 12 | 51 |
| h3 | 14 | 12 | 13 | 12 | 51 |
| h4 | 14 | 12 | 13 | 12 | 51 |
| h5 | 14 | 12 | 13 | 12 | 51 |
| h6 | 12 | 10 | 11 | 10 | 43 |
| hr | 11 | 9 | 10 | 9 | 39 |
| html | 10 | 10 | 11 | 10 | 41 |
| iframe | 11 | 9 | 10 | 9 | 39 |
| img | 12 | 9 | 10 | 9 | 40 |
| input | 48 | 25 | 26 | 25 | 124 |
| kbd | 20 | 12 | 13 | 12 | 57 |
| label | 9 | 9 | 10 | 9 | 37 |
| legend | 11 | 9 | 10 | 9 | 39 |
| mark | 17 | 9 | 10 | 9 | 45 |
| menu | 16 | 10 | 11 | 10 | 47 |
| object | 11 | 9 | 10 | 9 | 39 |
| ol | 14 | 10 | 11 | 10 | 45 |
| optgroup | 10 | 10 | 11 | 10 | 41 |
| option | 15 | 9 | 10 | 9 | 43 |
| output | 9 | 9 | 10 | 9 | 37 |
| p | 11 | 9 | 10 | 9 | 39 |
| pre | 14 | 12 | 13 | 12 | 51 |
| progress | 9 | 9 | 10 | 9 | 37 |
| samp | 10 | 10 | 11 | 10 | 41 |
| select | 32 | 25 | 26 | 25 | 108 |
| small | 11 | 11 | 12 | 11 | 45 |
| span | 9 | 9 | 10 | 9 | 37 |
| strong | 9 | 9 | 10 | 9 | 37 |
| sub | 9 | 9 | 10 | 9 | 37 |
| summary | 9 | 9 | 10 | 9 | 37 |
| sup | 9 | 9 | 10 | 9 | 37 |
| svg | 10 | 9 | 10 | 9 | 38 |
| table | 17 | 9 | 10 | 9 | 45 |
| tbody | 1 | 9 | 10 | 9 | 29 |
| td | 15 | 9 | 10 | 9 | 43 |
| textarea | 40 | 25 | 26 | 25 | 116 |
| tfoot | 1 | 9 | 10 | 9 | 29 |
| th | 15 | 9 | 10 | 9 | 43 |
| thead | 1 | 9 | 10 | 9 | 29 |
| tr | 1 | 9 | 10 | 9 | 29 |
| ul | 14 | 10 | 11 | 10 | 45 |
| video | 13 | 9 | 10 | 9 | 41 |

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/rows.json`.

### Condition D per element

The following table gives condition D's moved longhand count per element and subject.

| Element | host | ::after | ::backdrop | ::before | total |
| --- | --- | --- | --- | --- | --- |
| a | 9 | 9 | 10 | 9 | 37 |
| abbr | 9 | 9 | 10 | 9 | 37 |
| address | 9 | 9 | 10 | 9 | 37 |
| audio | 10 | 9 | 10 | 9 | 38 |
| b | 9 | 9 | 10 | 9 | 37 |
| blockquote | 9 | 9 | 10 | 9 | 37 |
| body | 9 | 9 | 10 | 9 | 37 |
| button | 48 | 25 | 26 | 25 | 124 |
| canvas | 11 | 9 | 10 | 9 | 39 |
| caption | 9 | 9 | 10 | 9 | 37 |
| code | 9 | 9 | 10 | 9 | 37 |
| dd | 9 | 9 | 10 | 9 | 37 |
| div | 9 | 9 | 10 | 9 | 37 |
| dl | 9 | 9 | 10 | 9 | 37 |
| dt | 9 | 9 | 10 | 9 | 37 |
| embed | 11 | 9 | 10 | 9 | 39 |
| fieldset | 1 | 9 | 10 | 9 | 29 |
| figure | 9 | 9 | 10 | 9 | 37 |
| h1 | 9 | 9 | 10 | 9 | 37 |
| h2 | 9 | 9 | 10 | 9 | 37 |
| h3 | 9 | 9 | 10 | 9 | 37 |
| h4 | 9 | 9 | 10 | 9 | 37 |
| h5 | 9 | 9 | 10 | 9 | 37 |
| h6 | 9 | 9 | 10 | 9 | 37 |
| hr | 1 | 9 | 10 | 9 | 29 |
| html | 10 | 10 | 11 | 10 | 41 |
| iframe | 3 | 9 | 10 | 9 | 31 |
| img | 12 | 9 | 10 | 9 | 40 |
| input | 48 | 25 | 26 | 25 | 124 |
| kbd | 9 | 9 | 10 | 9 | 37 |
| label | 9 | 9 | 10 | 9 | 37 |
| legend | 9 | 9 | 10 | 9 | 37 |
| mark | 9 | 9 | 10 | 9 | 37 |
| menu | 16 | 10 | 11 | 10 | 47 |
| object | 11 | 9 | 10 | 9 | 39 |
| ol | 10 | 10 | 11 | 10 | 41 |
| optgroup | 10 | 10 | 11 | 10 | 41 |
| option | 15 | 9 | 10 | 9 | 43 |
| output | 9 | 9 | 10 | 9 | 37 |
| p | 9 | 9 | 10 | 9 | 37 |
| pre | 9 | 9 | 10 | 9 | 37 |
| progress | 9 | 9 | 10 | 9 | 37 |
| samp | 9 | 9 | 10 | 9 | 37 |
| select | 32 | 25 | 26 | 25 | 108 |
| small | 9 | 9 | 10 | 9 | 37 |
| span | 9 | 9 | 10 | 9 | 37 |
| strong | 9 | 9 | 10 | 9 | 37 |
| sub | 9 | 9 | 10 | 9 | 37 |
| summary | 9 | 9 | 10 | 9 | 37 |
| sup | 9 | 9 | 10 | 9 | 37 |
| svg | 10 | 9 | 10 | 9 | 38 |
| table | 17 | 9 | 10 | 9 | 45 |
| tbody | 1 | 9 | 10 | 9 | 29 |
| td | 15 | 9 | 10 | 9 | 43 |
| textarea | 40 | 25 | 26 | 25 | 116 |
| tfoot | 1 | 9 | 10 | 9 | 29 |
| th | 15 | 9 | 10 | 9 | 43 |
| thead | 1 | 9 | 10 | 9 | 29 |
| tr | 1 | 9 | 10 | 9 | 29 |
| ul | 10 | 10 | 11 | 10 | 41 |
| video | 13 | 9 | 10 | 9 | 41 |

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/rows.json`.

## 3. C-only and D-only sets

C-only (C differs from A, D equals A): 198 rows over 25 elements. D-only (D differs from A, C equals A): 0 rows. Rows that move under both C and D: 2594, with C equal to D in 2594.

The following table lists every C-only row with its values under A (equal to D) and C, and B for reference.

| Element | Pseudo | Longhand | A (= D) | C | B |
| --- | --- | --- | --- | --- | --- |
| address |  | margin-block-end | 16px | 0px | 16px |
| address |  | margin-bottom | 16px | 0px | 16px |
| blockquote |  | margin-block-end | 16px | 0px | 16px |
| blockquote |  | margin-bottom | 16px | 0px | 16px |
| caption |  | block-size | 16px | 0px | 16px |
| caption |  | height | 16px | 0px | 16px |
| caption |  | padding-block-end | 8px | 0px | 8px |
| caption |  | padding-block-start | 8px | 0px | 8px |
| caption |  | padding-bottom | 8px | 0px | 8px |
| caption |  | padding-top | 8px | 0px | 8px |
| caption |  | perspective-origin | 0px 8px | 0px 0px | 0px 8px |
| caption |  | transform-origin | 0px 8px | 0px 0px | 0px 8px |
| code |  | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| code |  | font-size | 14px | 16px | 14px |
| code |  | line-height | 21px | 24px | 21px |
| code | ::after | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| code | ::after | font-size | 14px | 16px | 14px |
| code | ::after | line-height | 21px | 24px | 21px |
| code | ::backdrop | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| code | ::backdrop | font-size | 14px | 16px | 14px |
| code | ::backdrop | line-height | 21px | 24px | 21px |
| code | ::before | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| code | ::before | font-size | 14px | 16px | 14px |
| code | ::before | line-height | 21px | 24px | 21px |
| dd |  | margin-block-end | 8px | 0px | 8px |
| dd |  | margin-bottom | 8px | 0px | 8px |
| dl |  | margin-block-end | 16px | 0px | 16px |
| dl |  | margin-bottom | 16px | 0px | 16px |
| fieldset |  | border-block-end-style | none | solid | none |
| fieldset |  | border-block-start-style | none | solid | none |
| fieldset |  | border-bottom-style | none | solid | none |
| fieldset |  | border-inline-end-style | none | solid | none |
| fieldset |  | border-inline-start-style | none | solid | none |
| fieldset |  | border-left-style | none | solid | none |
| fieldset |  | border-right-style | none | solid | none |
| fieldset |  | border-top-style | none | solid | none |
| figure |  | margin-block-end | 16px | 0px | 16px |
| figure |  | margin-bottom | 16px | 0px | 16px |
| h1 |  | font-size | 40px | 16px | 40px |
| h1 |  | font-weight | 500 | 400 | 500 |
| h1 |  | line-height | 48px | 19.2px | 48px |
| h1 |  | margin-block-end | 8px | 0px | 8px |
| h1 |  | margin-bottom | 8px | 0px | 8px |
| h1 | ::after | font-size | 40px | 16px | 40px |
| h1 | ::after | font-weight | 500 | 400 | 500 |
| h1 | ::after | line-height | 48px | 19.2px | 48px |
| h1 | ::backdrop | font-size | 40px | 16px | 40px |
| h1 | ::backdrop | font-weight | 500 | 400 | 500 |
| h1 | ::backdrop | line-height | 48px | 19.2px | 48px |
| h1 | ::before | font-size | 40px | 16px | 40px |
| h1 | ::before | font-weight | 500 | 400 | 500 |
| h1 | ::before | line-height | 48px | 19.2px | 48px |
| h2 |  | font-size | 32px | 16px | 32px |
| h2 |  | font-weight | 500 | 400 | 500 |
| h2 |  | line-height | 38.4px | 19.2px | 38.4px |
| h2 |  | margin-block-end | 8px | 0px | 8px |
| h2 |  | margin-bottom | 8px | 0px | 8px |
| h2 | ::after | font-size | 32px | 16px | 32px |
| h2 | ::after | font-weight | 500 | 400 | 500 |
| h2 | ::after | line-height | 38.4px | 19.2px | 38.4px |
| h2 | ::backdrop | font-size | 32px | 16px | 32px |
| h2 | ::backdrop | font-weight | 500 | 400 | 500 |
| h2 | ::backdrop | line-height | 38.4px | 19.2px | 38.4px |
| h2 | ::before | font-size | 32px | 16px | 32px |
| h2 | ::before | font-weight | 500 | 400 | 500 |
| h2 | ::before | line-height | 38.4px | 19.2px | 38.4px |
| h3 |  | font-size | 28px | 16px | 28px |
| h3 |  | font-weight | 500 | 400 | 500 |
| h3 |  | line-height | 33.6px | 19.2px | 33.6px |
| h3 |  | margin-block-end | 8px | 0px | 8px |
| h3 |  | margin-bottom | 8px | 0px | 8px |
| h3 | ::after | font-size | 28px | 16px | 28px |
| h3 | ::after | font-weight | 500 | 400 | 500 |
| h3 | ::after | line-height | 33.6px | 19.2px | 33.6px |
| h3 | ::backdrop | font-size | 28px | 16px | 28px |
| h3 | ::backdrop | font-weight | 500 | 400 | 500 |
| h3 | ::backdrop | line-height | 33.6px | 19.2px | 33.6px |
| h3 | ::before | font-size | 28px | 16px | 28px |
| h3 | ::before | font-weight | 500 | 400 | 500 |
| h3 | ::before | line-height | 33.6px | 19.2px | 33.6px |
| h4 |  | font-size | 24px | 16px | 24px |
| h4 |  | font-weight | 500 | 400 | 500 |
| h4 |  | line-height | 28.8px | 19.2px | 28.8px |
| h4 |  | margin-block-end | 8px | 0px | 8px |
| h4 |  | margin-bottom | 8px | 0px | 8px |
| h4 | ::after | font-size | 24px | 16px | 24px |
| h4 | ::after | font-weight | 500 | 400 | 500 |
| h4 | ::after | line-height | 28.8px | 19.2px | 28.8px |
| h4 | ::backdrop | font-size | 24px | 16px | 24px |
| h4 | ::backdrop | font-weight | 500 | 400 | 500 |
| h4 | ::backdrop | line-height | 28.8px | 19.2px | 28.8px |
| h4 | ::before | font-size | 24px | 16px | 24px |
| h4 | ::before | font-weight | 500 | 400 | 500 |
| h4 | ::before | line-height | 28.8px | 19.2px | 28.8px |
| h5 |  | font-size | 20px | 16px | 20px |
| h5 |  | font-weight | 500 | 400 | 500 |
| h5 |  | line-height | 24px | 19.2px | 24px |
| h5 |  | margin-block-end | 8px | 0px | 8px |
| h5 |  | margin-bottom | 8px | 0px | 8px |
| h5 | ::after | font-size | 20px | 16px | 20px |
| h5 | ::after | font-weight | 500 | 400 | 500 |
| h5 | ::after | line-height | 24px | 19.2px | 24px |
| h5 | ::backdrop | font-size | 20px | 16px | 20px |
| h5 | ::backdrop | font-weight | 500 | 400 | 500 |
| h5 | ::backdrop | line-height | 24px | 19.2px | 24px |
| h5 | ::before | font-size | 20px | 16px | 20px |
| h5 | ::before | font-weight | 500 | 400 | 500 |
| h5 | ::before | line-height | 24px | 19.2px | 24px |
| h6 |  | font-weight | 500 | 400 | 500 |
| h6 |  | margin-block-end | 8px | 0px | 8px |
| h6 |  | margin-bottom | 8px | 0px | 8px |
| h6 | ::after | font-weight | 500 | 400 | 500 |
| h6 | ::backdrop | font-weight | 500 | 400 | 500 |
| h6 | ::before | font-weight | 500 | 400 | 500 |
| hr |  | border-block-end-style | none | solid | none |
| hr |  | border-bottom-style | none | solid | none |
| hr |  | border-inline-end-style | none | solid | none |
| hr |  | border-inline-start-style | none | solid | none |
| hr |  | border-left-style | none | solid | none |
| hr |  | border-right-style | none | solid | none |
| hr |  | margin-block-end | 16px | 0px | 16px |
| hr |  | margin-block-start | 16px | 0px | 16px |
| hr |  | margin-bottom | 16px | 0px | 16px |
| hr |  | margin-top | 16px | 0px | 16px |
| iframe |  | border-block-end-style | none | solid | none |
| iframe |  | border-block-start-style | none | solid | none |
| iframe |  | border-bottom-style | none | solid | none |
| iframe |  | border-inline-end-style | none | solid | none |
| iframe |  | border-inline-start-style | none | solid | none |
| iframe |  | border-left-style | none | solid | none |
| iframe |  | border-right-style | none | solid | none |
| iframe |  | border-top-style | none | solid | none |
| kbd |  | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| kbd |  | font-size | 14px | 16px | 14px |
| kbd |  | line-height | 21px | 24px | 21px |
| kbd |  | padding-block-end | 3px | 0px | 3px |
| kbd |  | padding-block-start | 3px | 0px | 3px |
| kbd |  | padding-bottom | 3px | 0px | 3px |
| kbd |  | padding-inline-end | 6px | 0px | 6px |
| kbd |  | padding-inline-start | 6px | 0px | 6px |
| kbd |  | padding-left | 6px | 0px | 6px |
| kbd |  | padding-right | 6px | 0px | 6px |
| kbd |  | padding-top | 3px | 0px | 3px |
| kbd | ::after | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| kbd | ::after | font-size | 14px | 16px | 14px |
| kbd | ::after | line-height | 21px | 24px | 21px |
| kbd | ::backdrop | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| kbd | ::backdrop | font-size | 14px | 16px | 14px |
| kbd | ::backdrop | line-height | 21px | 24px | 21px |
| kbd | ::before | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| kbd | ::before | font-size | 14px | 16px | 14px |
| kbd | ::before | line-height | 21px | 24px | 21px |
| legend |  | margin-block-end | 8px | 0px | 8px |
| legend |  | margin-bottom | 8px | 0px | 8px |
| mark |  | padding-block-end | 3px | 0px | 3px |
| mark |  | padding-block-start | 3px | 0px | 3px |
| mark |  | padding-bottom | 3px | 0px | 3px |
| mark |  | padding-inline-end | 3px | 0px | 3px |
| mark |  | padding-inline-start | 3px | 0px | 3px |
| mark |  | padding-left | 3px | 0px | 3px |
| mark |  | padding-right | 3px | 0px | 3px |
| mark |  | padding-top | 3px | 0px | 3px |
| ol |  | margin-block-end | 16px | 0px | 16px |
| ol |  | margin-bottom | 16px | 0px | 16px |
| ol |  | padding-inline-start | 32px | 0px | 32px |
| ol |  | padding-left | 32px | 0px | 32px |
| p |  | margin-block-end | 16px | 0px | 16px |
| p |  | margin-bottom | 16px | 0px | 16px |
| pre |  | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| pre |  | font-size | 14px | 16px | 14px |
| pre |  | line-height | 21px | 24px | 21px |
| pre |  | margin-block-end | 16px | 0px | 16px |
| pre |  | margin-bottom | 16px | 0px | 16px |
| pre | ::after | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| pre | ::after | font-size | 14px | 16px | 14px |
| pre | ::after | line-height | 21px | 24px | 21px |
| pre | ::backdrop | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| pre | ::backdrop | font-size | 14px | 16px | 14px |
| pre | ::backdrop | line-height | 21px | 24px | 21px |
| pre | ::before | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| pre | ::before | font-size | 14px | 16px | 14px |
| pre | ::before | line-height | 21px | 24px | 21px |
| samp |  | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| samp | ::after | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| samp | ::backdrop | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| samp | ::before | font-family | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |
| small |  | font-size | 14px | 12.8px | 14px |
| small |  | line-height | 21px | 19.2px | 21px |
| small | ::after | font-size | 14px | 12.8px | 14px |
| small | ::after | line-height | 21px | 19.2px | 21px |
| small | ::backdrop | font-size | 14px | 12.8px | 14px |
| small | ::backdrop | line-height | 21px | 19.2px | 21px |
| small | ::before | font-size | 14px | 12.8px | 14px |
| small | ::before | line-height | 21px | 19.2px | 21px |
| ul |  | margin-block-end | 16px | 0px | 16px |
| ul |  | margin-bottom | 16px | 0px | 16px |
| ul |  | padding-inline-start | 32px | 0px | 32px |
| ul |  | padding-left | 32px | 0px | 32px |

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/rows.json`.

The following table counts C-only rows per longhand.

| Longhand | C-only rows |
| --- | --- |
| font-size | 36 |
| line-height | 36 |
| font-weight | 24 |
| margin-block-end | 17 |
| margin-bottom | 17 |
| font-family | 16 |
| padding-inline-start | 4 |
| padding-left | 4 |
| border-block-end-style | 3 |
| border-bottom-style | 3 |
| border-inline-end-style | 3 |
| border-inline-start-style | 3 |
| border-left-style | 3 |
| border-right-style | 3 |
| padding-block-end | 3 |
| padding-block-start | 3 |
| padding-bottom | 3 |
| padding-top | 3 |
| border-block-start-style | 2 |
| border-top-style | 2 |
| padding-inline-end | 2 |
| padding-right | 2 |
| block-size | 1 |
| height | 1 |
| margin-block-start | 1 |
| margin-top | 1 |
| perspective-origin | 1 |
| transform-origin | 1 |

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/rows.json`.

D-only set: 0 rows, so no per-element table. The preflight declarations the reboot never made are, on this reading, the 2594 rows that move identically under C and D; the following table gives them per element with counts and the 5 most frequent longhands.

| Element | Rows (C and D) | Top longhands (count) |
| --- | --- | --- |
| a | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| abbr | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| address | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| audio | 38 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| b | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| blockquote | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| body | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| button | 124 | -webkit-text-fill-color (4), -webkit-text-stroke-color (4), border-block-end-color (4), border-block-end-style (4), border-block-start-color (4) |
| canvas | 39 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| caption | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| code | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| dd | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| div | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| dl | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| dt | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| embed | 39 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| fieldset | 29 | tab-size (4), border-block-end-style (3), border-block-start-style (3), border-bottom-style (3), border-inline-end-style (3) |
| figure | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| h1 | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| h2 | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| h3 | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| h4 | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| h5 | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| h6 | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| hr | 29 | tab-size (4), border-block-end-style (3), border-block-start-style (3), border-bottom-style (3), border-inline-end-style (3) |
| html | 41 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| iframe | 31 | tab-size (4), border-block-end-style (3), border-block-start-style (3), border-bottom-style (3), border-inline-end-style (3) |
| img | 40 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| input | 124 | -webkit-text-fill-color (4), -webkit-text-stroke-color (4), border-block-end-color (4), border-block-end-style (4), border-block-start-color (4) |
| kbd | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| label | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| legend | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| mark | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| menu | 47 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| object | 39 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| ol | 41 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| optgroup | 41 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| option | 43 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| output | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| p | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| pre | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| progress | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| samp | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| select | 108 | -webkit-text-fill-color (4), -webkit-text-stroke-color (4), border-block-end-color (4), border-block-start-color (4), border-bottom-color (4) |
| small | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| span | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| strong | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| sub | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| summary | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| sup | 37 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| svg | 38 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| table | 45 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| tbody | 29 | tab-size (4), border-block-end-style (3), border-block-start-style (3), border-bottom-style (3), border-inline-end-style (3) |
| td | 43 | tab-size (4), border-block-end-style (3), border-block-start-style (3), border-bottom-style (3), border-inline-end-style (3) |
| textarea | 116 | -webkit-text-fill-color (4), -webkit-text-stroke-color (4), border-block-end-color (4), border-block-start-color (4), border-bottom-color (4) |
| tfoot | 29 | tab-size (4), border-block-end-style (3), border-block-start-style (3), border-bottom-style (3), border-inline-end-style (3) |
| th | 43 | tab-size (4), border-block-end-style (3), border-block-start-style (3), border-bottom-style (3), border-inline-end-style (3) |
| thead | 29 | tab-size (4), border-block-end-style (3), border-block-start-style (3), border-bottom-style (3), border-inline-end-style (3) |
| tr | 29 | tab-size (4), border-block-end-style (3), border-block-start-style (3), border-bottom-style (3), border-inline-end-style (3) |
| ul | 41 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |
| video | 41 | border-block-end-style (4), border-block-start-style (4), border-bottom-style (4), border-inline-end-style (4), border-inline-start-style (4) |

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/rows.json`.

## 4. Agreement with preflight.json

Record rows: 2598. Rows whose (element, pseudo, longhand) alone equals A and preflight equals B: 2568. Rows that differ: 14. Rows whose longhand this Chromium does not enumerate: 16 (all `row-rule-color`, on button, input, select, and textarea hosts and their ::after, ::backdrop, ::before). Rows that move under B and have no record row: 12.

Longhands in the record and not in this enumeration: row-rule-color. Longhands in this enumeration and in no record row: 347 of 406 (full list in readings.json `enumeratedNotRecord`).

The following table lists the differing rows (14 of 14).

| Element | Pseudo | Longhand | Record alone | A | Record preflight | B |
| --- | --- | --- | --- | --- | --- | --- |
| button |  | background-color | rgb(240, 240, 240) | rgb(239, 239, 239) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) |
| input |  | inline-size | 189px | 208px | 181px | 200px |
| input |  | perspective-origin | 94.5px 15px | 104px 15px | 90.5px 12px | 100px 12px |
| input |  | transform-origin | 94.5px 15px | 104px 15px | 90.5px 12px | 100px 12px |
| input |  | width | 189px | 208px | 181px | 200px |
| select |  | background-color | rgb(255, 255, 255) | rgb(239, 239, 239) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) |
| select |  | block-size | 25px | 23px | 23px | 21px |
| select |  | height | 25px | 23px | 23px | 21px |
| select |  | perspective-origin | 11px 12.5px | 11px 11.5px | 10px 11.5px | 10px 10.5px |
| select |  | transform-origin | 11px 12.5px | 11px 11.5px | 10px 11.5px | 10px 10.5px |
| textarea |  | inline-size | 168px | 184px | 162px | 178px |
| textarea |  | perspective-origin | 84px 27px | 92px 27px | 81px 24px | 89px 24px |
| textarea |  | transform-origin | 84px 27px | 92px 27px | 81px 24px | 89px 24px |
| textarea |  | width | 168px | 184px | 162px | 178px |

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/readings.json`.

The following table lists the B-moved rows that have no record row.

| Element | Pseudo | Longhand | A | B |
| --- | --- | --- | --- | --- |
| html |  | font-family | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" |
| html | ::after | font-family | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" |
| html | ::backdrop | font-family | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" |
| html | ::before | font-family | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" |
| table |  | border-block-end-color | rgb(128, 128, 128) | rgb(33, 37, 41) |
| table |  | border-block-start-color | rgb(128, 128, 128) | rgb(33, 37, 41) |
| table |  | border-bottom-color | rgb(128, 128, 128) | rgb(33, 37, 41) |
| table |  | border-inline-end-color | rgb(128, 128, 128) | rgb(33, 37, 41) |
| table |  | border-inline-start-color | rgb(128, 128, 128) | rgb(33, 37, 41) |
| table |  | border-left-color | rgb(128, 128, 128) | rgb(33, 37, 41) |
| table |  | border-right-color | rgb(128, 128, 128) | rgb(33, 37, 41) |
| table |  | border-top-color | rgb(128, 128, 128) | rgb(33, 37, 41) |

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/rows.json`.

## 5. The two important reboot declarations

Witnesses mounted from markup in a wrapper div appended to body, html carrying data-bs-theme="light". The picker row reports the pseudo display, whether a planted pseudo-only color reaches it (exposed), and the host display.

| Witness | Longhand | A | B | C | D |
| --- | --- | --- | --- | --- | --- |
| div[hidden] | display | none | none | none | none |
| div[hidden].d-flex | display | flex | none | none | none |
| input[list]::-webkit-calendar-picker-indicator | display | inline-block | inline-block | inline-block | inline-block |
| input[list]::-webkit-calendar-picker-indicator | exposed | false | false | false | false |
| input[list]::-webkit-calendar-picker-indicator | hostDisplay | inline-block | inline-block | inline-block | inline-block |

Rule placement read from the sheet text: in bootstrap-lifted.css the two important reboot rules sit outside every @layer block, `[list]:not([type=date]):not([type=datetime-local]):not([type=month]):not([type=week]):not([type=time])::-webkit-calendar-picker-indicator { display: none !important }` at lines 464 to 466 and `[hidden] { display: none !important }` at lines 567 to 569, and `.d-flex { display: flex !important }` is unlayered at lines 7338 to 7340. In reboot-in-reset.css they sit inside @layer reset (lines 328 and 447). tailwind-flipped.css carries `[hidden]:where(:not([hidden="until-found"])) { display: none !important }` and `::-webkit-calendar-picker-indicator { line-height: 1 }` in its base layer (lines 165 and 153). Chromium ${r.chromium} does not expose ::-webkit-calendar-picker-indicator to getComputedStyle on this input (exposed false under every condition): the pseudo reading returns the host display, so the picker display row does not witness the reboot rule.

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/readings.json`.

## 6. Typography witnesses

Same mounting as item 5. Body and html are the page's own elements. Shorthands are read as longhands. B is included for reference.

| Witness | Longhand | A | C | D | B | C differs from A | C differs from D |
| --- | --- | --- | --- | --- | --- | --- | --- |
| h1 | font-size | 40px | 16px | 40px | 40px | yes | yes |
| h1 | font-weight | 500 | 400 | 500 | 500 | yes | yes |
| h1 | margin-top | 0px | 0px | 0px | 0px |  |  |
| h1 | margin-bottom | 8px | 0px | 8px | 8px | yes | yes |
| h1 | line-height | 48px | 19.2px | 48px | 48px | yes | yes |
| h2 | font-size | 32px | 16px | 32px | 32px | yes | yes |
| h2 | font-weight | 500 | 400 | 500 | 500 | yes | yes |
| h2 | margin-top | 0px | 0px | 0px | 0px |  |  |
| h2 | margin-bottom | 8px | 0px | 8px | 8px | yes | yes |
| h2 | line-height | 38.4px | 19.2px | 38.4px | 38.4px | yes | yes |
| h3 | font-size | 28px | 16px | 28px | 28px | yes | yes |
| h3 | font-weight | 500 | 400 | 500 | 500 | yes | yes |
| h3 | margin-top | 0px | 0px | 0px | 0px |  |  |
| h3 | margin-bottom | 8px | 0px | 8px | 8px | yes | yes |
| h3 | line-height | 33.6px | 19.2px | 33.6px | 33.6px | yes | yes |
| h4 | font-size | 24px | 16px | 24px | 24px | yes | yes |
| h4 | font-weight | 500 | 400 | 500 | 500 | yes | yes |
| h4 | margin-top | 0px | 0px | 0px | 0px |  |  |
| h4 | margin-bottom | 8px | 0px | 8px | 8px | yes | yes |
| h4 | line-height | 28.8px | 19.2px | 28.8px | 28.8px | yes | yes |
| h5 | font-size | 20px | 16px | 20px | 20px | yes | yes |
| h5 | font-weight | 500 | 400 | 500 | 500 | yes | yes |
| h5 | margin-top | 0px | 0px | 0px | 0px |  |  |
| h5 | margin-bottom | 8px | 0px | 8px | 8px | yes | yes |
| h5 | line-height | 24px | 19.2px | 24px | 24px | yes | yes |
| h6 | font-size | 16px | 16px | 16px | 16px |  |  |
| h6 | font-weight | 500 | 400 | 500 | 500 | yes | yes |
| h6 | margin-top | 0px | 0px | 0px | 0px |  |  |
| h6 | margin-bottom | 8px | 0px | 8px | 8px | yes | yes |
| h6 | line-height | 19.2px | 19.2px | 19.2px | 19.2px |  |  |
| p | margin-bottom | 16px | 0px | 16px | 16px | yes | yes |
| a[href] | color | rgb(13, 110, 253) | rgb(33, 37, 41) | rgb(13, 110, 253) | rgb(13, 110, 253) | yes | yes |
| a[href] | text-decoration-line | underline | none | underline | underline | yes | yes |
| a[href] | text-decoration-color | rgb(13, 110, 253) | rgb(33, 37, 41) | rgb(13, 110, 253) | rgb(13, 110, 253) | yes | yes |
| img | display | inline | block | block | block | yes |  |
| img | vertical-align | middle | middle | middle | middle |  |  |
| svg | display | inline | block | block | block | yes |  |
| svg | vertical-align | middle | middle | middle | middle |  |  |
| ul | padding-left | 32px | 0px | 32px | 32px | yes | yes |
| ul | margin-bottom | 16px | 0px | 16px | 16px | yes | yes |
| ul | list-style-type | disc | none | none | none | yes |  |
| button | background-color | rgb(239, 239, 239) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | yes |  |
| button | padding-top | 1px | 0px | 0px | 0px | yes |  |
| button | padding-right | 6px | 0px | 0px | 0px | yes |  |
| button | padding-bottom | 1px | 0px | 0px | 0px | yes |  |
| button | padding-left | 6px | 0px | 0px | 0px | yes |  |
| button | border-top-width | 2px | 0px | 0px | 0px | yes |  |
| button | border-right-width | 2px | 0px | 0px | 0px | yes |  |
| button | border-bottom-width | 2px | 0px | 0px | 0px | yes |  |
| button | border-left-width | 2px | 0px | 0px | 0px | yes |  |
| button | border-top-left-radius | 0px | 0px | 0px | 0px |  |  |
| button | border-top-right-radius | 0px | 0px | 0px | 0px |  |  |
| button | border-bottom-right-radius | 0px | 0px | 0px | 0px |  |  |
| button | border-bottom-left-radius | 0px | 0px | 0px | 0px |  |  |
| button | font-size | 16px | 16px | 16px | 16px |  |  |
| input[type=text] | background-color | rgb(255, 255, 255) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | yes |  |
| input[type=text] | border-top-width | 2px | 0px | 0px | 0px | yes |  |
| input[type=text] | border-top-style | inset | solid | solid | solid | yes |  |
| input[type=text] | border-top-color | rgb(118, 118, 118) | rgb(33, 37, 41) | rgb(33, 37, 41) | rgb(33, 37, 41) | yes |  |
| input[type=text] | border-right-width | 2px | 0px | 0px | 0px | yes |  |
| input[type=text] | border-right-style | inset | solid | solid | solid | yes |  |
| input[type=text] | border-right-color | rgb(118, 118, 118) | rgb(33, 37, 41) | rgb(33, 37, 41) | rgb(33, 37, 41) | yes |  |
| input[type=text] | border-bottom-width | 2px | 0px | 0px | 0px | yes |  |
| input[type=text] | border-bottom-style | inset | solid | solid | solid | yes |  |
| input[type=text] | border-bottom-color | rgb(118, 118, 118) | rgb(33, 37, 41) | rgb(33, 37, 41) | rgb(33, 37, 41) | yes |  |
| input[type=text] | border-left-width | 2px | 0px | 0px | 0px | yes |  |
| input[type=text] | border-left-style | inset | solid | solid | solid | yes |  |
| input[type=text] | border-left-color | rgb(118, 118, 118) | rgb(33, 37, 41) | rgb(33, 37, 41) | rgb(33, 37, 41) | yes |  |
| input[type=text] | font-family | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" |  |  |
| input[type=text] | font-size | 16px | 16px | 16px | 16px |  |  |
| input[type=text] | font-weight | 400 | 400 | 400 | 400 |  |  |
| input[type=text] | font-style | normal | normal | normal | normal |  |  |
| input[type=text] | line-height | 24px | 24px | 24px | 24px |  |  |
| small | font-size | 14px | 12.8px | 14px | 14px | yes | yes |
| table | border-collapse | collapse | collapse | collapse | collapse |  |  |
| table | caption-side | bottom | bottom | bottom | bottom |  |  |
| hr | color | rgb(33, 37, 41) | rgb(33, 37, 41) | rgb(33, 37, 41) | rgb(33, 37, 41) |  |  |
| hr | opacity | 0.25 | 0.25 | 0.25 | 0.25 |  |  |
| hr | margin-top | 16px | 0px | 16px | 16px | yes | yes |
| hr | margin-right | 0px | 0px | 0px | 0px |  |  |
| hr | margin-bottom | 16px | 0px | 16px | 16px | yes | yes |
| hr | margin-left | 0px | 0px | 0px | 0px |  |  |
| label | display | inline-block | inline-block | inline-block | inline-block |  |  |
| legend | font-size | 24px | 24px | 24px | 24px |  |  |
| pre | margin-top | 0px | 0px | 0px | 0px |  |  |
| pre | margin-right | 0px | 0px | 0px | 0px |  |  |
| pre | margin-bottom | 16px | 0px | 16px | 16px | yes | yes |
| pre | margin-left | 0px | 0px | 0px | 0px |  |  |
| pre | font-size | 14px | 16px | 14px | 14px | yes | yes |
| code | font-size | 14px | 16px | 14px | 14px | yes | yes |
| code | color | rgb(214, 51, 132) | rgb(214, 51, 132) | rgb(214, 51, 132) | rgb(214, 51, 132) |  |  |
| kbd | background-color | rgb(33, 37, 41) | rgb(33, 37, 41) | rgb(33, 37, 41) | rgb(33, 37, 41) |  |  |
| mark | padding-top | 3px | 0px | 3px | 3px | yes | yes |
| mark | padding-right | 3px | 0px | 3px | 3px | yes | yes |
| mark | padding-bottom | 3px | 0px | 3px | 3px | yes | yes |
| mark | padding-left | 3px | 0px | 3px | 3px | yes | yes |
| mark | background-color | rgb(255, 243, 205) | rgb(255, 243, 205) | rgb(255, 243, 205) | rgb(255, 243, 205) |  |  |
| sup | position | relative | relative | relative | relative |  |  |
| sup | vertical-align | baseline | baseline | baseline | baseline |  |  |
| sup | top | -6px | -6px | -6px | -6px |  |  |
| sup | bottom | 6px | 6px | 6px | 6px |  |  |
| sub | position | relative | relative | relative | relative |  |  |
| sub | vertical-align | baseline | baseline | baseline | baseline |  |  |
| sub | top | 3px | 3px | 3px | 3px |  |  |
| sub | bottom | -3px | -3px | -3px | -3px |  |  |
| figure | margin-top | 0px | 0px | 0px | 0px |  |  |
| figure | margin-right | 0px | 0px | 0px | 0px |  |  |
| figure | margin-bottom | 16px | 0px | 16px | 16px | yes | yes |
| figure | margin-left | 0px | 0px | 0px | 0px |  |  |
| dl | margin-top | 0px | 0px | 0px | 0px |  |  |
| dl | margin-right | 0px | 0px | 0px | 0px |  |  |
| dl | margin-bottom | 16px | 0px | 16px | 16px | yes | yes |
| dl | margin-left | 0px | 0px | 0px | 0px |  |  |
| dt | margin-top | 0px | 0px | 0px | 0px |  |  |
| dt | margin-right | 0px | 0px | 0px | 0px |  |  |
| dt | margin-bottom | 0px | 0px | 0px | 0px |  |  |
| dt | margin-left | 0px | 0px | 0px | 0px |  |  |
| dt | font-weight | 700 | 700 | 700 | 700 |  |  |
| dd | margin-top | 0px | 0px | 0px | 0px |  |  |
| dd | margin-right | 0px | 0px | 0px | 0px |  |  |
| dd | margin-bottom | 8px | 0px | 8px | 8px | yes | yes |
| dd | margin-left | 0px | 0px | 0px | 0px |  |  |
| blockquote | margin-top | 0px | 0px | 0px | 0px |  |  |
| blockquote | margin-right | 0px | 0px | 0px | 0px |  |  |
| blockquote | margin-bottom | 16px | 0px | 16px | 16px | yes | yes |
| blockquote | margin-left | 0px | 0px | 0px | 0px |  |  |
| body | font-family | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" |  |  |
| body | font-size | 16px | 16px | 16px | 16px |  |  |
| body | line-height | 24px | 24px | 24px | 24px |  |  |
| body | color | rgb(33, 37, 41) | rgb(33, 37, 41) | rgb(33, 37, 41) | rgb(33, 37, 41) |  |  |
| body | background-color | rgb(255, 255, 255) | rgb(255, 255, 255) | rgb(255, 255, 255) | rgb(255, 255, 255) |  |  |
| body | margin-top | 0px | 0px | 0px | 0px |  |  |
| body | margin-right | 0px | 0px | 0px | 0px |  |  |
| body | margin-bottom | 0px | 0px | 0px | 0px |  |  |
| body | margin-left | 0px | 0px | 0px | 0px |  |  |
| html | font-family | "Times New Roman" | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | yes |  |
| html | font-size | 16px | 16px | 16px | 16px |  |  |
| html | line-height | normal | 24px | 24px | 24px | yes |  |
| html | color | rgb(0, 0, 0) | rgb(0, 0, 0) | rgb(0, 0, 0) | rgb(0, 0, 0) |  |  |
| html | background-color | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) |  |  |

Probe: `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` then `/home/user/veneer/tmp/probes/flip/m2-bare/analyze.ts`. Output: `/home/user/veneer/tmp/probes/flip/m2-bare/readings.json`.

