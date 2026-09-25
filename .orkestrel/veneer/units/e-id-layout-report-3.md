# E-ID-LAYOUT round 3 report — `opus` on Opus 5.5, worktree `/home/user/veneer-eil`, baseline `ca83afb`

Every default is back on its tag. Bootstrap's classes write the layout that Bootstrap's patterns need. The horizontal
description list, the class-built quotation, the attributed quotation, and the `.figure` pattern read as Bootstrap's in
Chromium. A `dl`, `blockquote`, or `figure` that is bare or carries a utility class keeps Veneer's look. Every gate the
brief names exits 0. One addition goes beyond the brief's list, `.figure-caption { margin-top: 0 }`. The brief's
Unknown settled it (see § Unknown settled).

## Changes

- `src/styles/elements/_dl.scss`: the grid is back on `dl`, with no `gap`. `dt` carries `padding-right: var(--vn-space-8)`
  as the column spacing. The `grid-column` pairing, the `dd` margins (`margin-bottom: var(--vn-space-4)`,
  `margin-left: 0`), the term weight, and the muted color stay.
- `src/styles/elements/_blockquote.scss`: restored to its `ca83afb` text, so the bar, the inset, and the italics sit on
  `blockquote`. The file is byte-identical to the base and does not appear in the status.
- `src/styles/components/_quote.scss`: `.blockquote` writes `padding-left: 0`, `border-left: 0`, and `font-style: normal`.
- `src/styles/elements/_figure.scss`: `figure` keeps `display: flex` and `flex-direction: column`, and drops the `gap`
  and the `:has()` selector. `figcaption` takes `margin-top: var(--vn-space-4)`.
- `src/styles/components/_image.scss`: `.figure-caption` writes `margin-top: 0`.
- `tests/src/styles/elements/dl.test.ts`: the text treatment reads the term's 16px end padding. The specimens widen
  from 520px to 528px, so the tracks divide evenly at 176px and 352px; at 520px Chromium reports 173.328px.
  The horizontal list proof also reads the 12px column gutter on the term. Added:
  `keeps the grid on a list that carries a utility class`. The multi-term proof reads every description at 176px.
- `tests/src/styles/elements/blockquote.test.ts`: added
  `keeps the bar, the inset, and the italics on a quotation that carries a utility class`.
- `tests/src/styles/components/quote.test.ts`: the `.blockquote` proof keeps its assertions and is retitled
  `clears the bar, the inset, and the italics the tag gives a quotation`.
- `tests/src/styles/elements/figure.test.ts`: the calibrated case reads `gap: normal` and a caption margin of
  `8px 0px 0px`. The attributed quotation proofs drop the `display: block` reading. Added:
  `spaces the caption 8px under its image inside $holder`, for a bare figure and for a figure that `d-block` turns to block.
- `tests/src/styles/components/image.test.ts`: the paint case drops the `.figure` residue `gap` reading. Added:
  `lays the figure class pattern out as the release does` and
  `puts the classed caption on the edge of a box that carries no image class`.
- `tests/setupStyles.ts` (shared): `TEXT_DL_CASES` reads `'grid-template-columns': '176px 352px'` and `gap: 'normal'`.
- `guides/veneer.md` (shared): the addition rows match the shipped cascade. See § Shared-file hunks.

Selectors in the owned partials: none reads a tag's context or the presence of a class. A search for `:not(`, `:has(`,
`>`, `+`, and `~` in `_dl.scss`, `_blockquote.scss`, `_figure.scss`, `_quote.scss`, and `_image.scss` returns only
`.blockquote > :last-child`. That rule is Bootstrap's own, and it is scoped by the component class, not by a tag.

## Unknown settled

The `.figure-img` class needs no declaration. The `.figure-caption` class needs `margin-top: 0`. Readings from
`/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-probe.log.txt` at 390 and 1280 pixels:

- **Bootstrap's `.figure` markup** (`img.figure-img` then `figcaption.figure-caption`): the caption top is 88 in both
  cascades, 8px under the image, both before and after the reset. In the inline-block figure, the image's end margin
  and the caption's start margin collapse to one 8px space.
- **A `.figure` holding a box without the image class** (the showcase swatch markup in `renderSwatches` in
  `app/browser/helpers.ts`, `figure.figure.w-100 > div.ratio + figcaption.figure-caption`): Bootstrap puts the caption
  at y=150, on the swatch's edge. Without the reset, the caption margin puts it at y=158. With the reset it reads
  y=150 again. The class that composes Bootstrap's figure therefore clears the tag's caption margin, the same way
  `.blockquote` clears the quotation bar.

## Failing-first table

Command: `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-test.sh tests/src/styles/elements/dl.test.ts tests/src/styles/elements/blockquote.test.ts tests/src/styles/elements/figure.test.ts tests/src/styles/components/quote.test.ts tests/src/styles/components/image.test.ts`.
The script runs `npm run build:src:styles` and then `npx vitest run --config configs/src/vite.styles.config.ts --no-cache <files>`.

| State | Result | Log |
| --- | --- | --- |
| Before: the round-2 partials, plus `_quote.scss` and `_image.scss` at `ca83afb`, with the final tests | exit 1, `Tests  8 failed \| 18 passed (26)` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-red.log.txt` |
| After: the final partials | exit 0, `Tests  26 passed (26)` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-owned.log.txt` |
| Intermediate: the caption margin shipped without the `.figure-caption` reset, image test | `Tests  1 failed \| 25 passed (26)`: `puts the classed caption on the edge…` (158 against 150) | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutation-no-caption-reset.log.txt` |

For the before state, the round-2 partials were rebuilt from `/home/user/scaffold/.orkestrel/veneer/units/eil-2.diff`: `patch` applied it to the base,
and `cmp` matched each result. The final partials were then copied back, and `cmp` confirmed them byte-identical. The
original red log of the intermediate step was removed. The `no-caption-reset` mutation reproduces the same state.

Red before its change: the utility-classed `dl`; the utility-classed `blockquote`; the `d-block` captioned image
(0 against 8); the calibrated `figure` case; both `TEXT_DL_CASES` cases; the multi-term description column
(186.66 against 176); and the caption-class edge (the intermediate state).

Green before by design, because the pre-change cascade already renders them this way: the horizontal list and
`.blockquote` proofs (retained from earlier rounds), the attributed quotation proofs, the bare captioned image
(the dropped `gap` gave the same 8px), and `lays the figure class pattern out as the release does`. That last proof
guards the added caption margin. Each of them is red under the mutation the following table names.

## Mutation table

Instrument: `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutate.py`, with its summary in `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutations.log.txt`. Each mutation edits
one partial, runs the preceding command, and copies the saved partial back. `filecmp` then checks the bytes. After the
table ran, `npm run build:src:styles` rebuilt the final cascade (`/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-build-src-styles.log.txt`).

| Mutation | Assertion it reddens | Reading | Log | Byte-identical restore |
| --- | --- | --- | --- | --- |
| `classless-grid`: the grid moves to `dl:not([class])` | `keeps the grid on a list that carries a utility class` | `block` against `grid` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutation-classless-grid.log.txt` | True |
| `restored-gap`: `gap: var(--vn-space-4) var(--vn-space-8)` on `dl` | horizontal list `description 0 top`; utility-classed list; multi-term; both dl cases | `dd` top 29 against 0; description left 186.66 against 176 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutation-restored-gap.log.txt` | True |
| `no-term-padding`: drop `dt { padding-right }` | both dl cases | `0px` against `16px` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutation-no-term-padding.log.txt` | True |
| `classless-blockquote`: the bar, inset, and italics move to `blockquote:not([class])` | `keeps the bar, the inset, and the italics on a quotation that carries a utility class` | `0px` against `4px` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutation-classless-blockquote.log.txt` | True |
| `no-quote-resets`: drop the `.blockquote` resets | `clears the bar, the inset, and the italics the tag gives a quotation` | `4px` against `0px` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutation-no-quote-resets.log.txt` | True |
| `restored-figure-gap`: `gap: var(--vn-space-4)` on `figure` | every attributed quotation case; bare captioned image; calibrated case | footer 38 against 30; caption space 16 against 8; `8px` against `normal` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutation-restored-figure-gap.log.txt` | True |
| `no-caption-margin`: drop `figcaption { margin-top }` | both captioned image cases; calibrated case | space 0 against 8; `0px` against `8px 0px 0px` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutation-no-caption-margin.log.txt` | True |
| `no-figure-display`: drop `.figure { display: inline-block }` | `lays the figure class pattern out as the release does`; paint case | width 320 against less than 320; `flex` against `inline-block` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutation-no-figure-display.log.txt` | True |
| `no-caption-reset`: drop `.figure-caption { margin-top: 0 }` | `puts the classed caption on the edge of a box that carries no image class` | 158 against 150 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-mutation-no-caption-reset.log.txt` | True |

## Probe readings against Bootstrap 5.3.8

Instrument: `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-probe.mjs`, run in Chromium against `dist/src/styles/index.css` and
`node_modules/bootstrap/dist/css/bootstrap.css`. Log: `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-probe.log.txt`.

| Fixture | Veneer | Bootstrap | Reading |
| --- | --- | --- | --- |
| `dl.row` at 1280 | `dt x=70 y=0 w=285`, `dd x=355 y=0`, second pair y=29; term padding `0 12px` | `dt x=70 y=0 w=285`, `dd x=355 y=0`, second pair y=32; term padding `0 12px` | Columns, pairing, and gutter match. The step is the `dd` height plus 8px; the line heights differ (21 against 24). |
| `dl.row` at 576 | `dd x=153 y=0`, step 29 | `dd x=153 y=0`, step 32 | Same as at 1280. |
| `dl.row` at 575 | stacked, `dd y=21`, `dt y=50` | stacked, `dd y=24`, `dt y=56` | Stacks below `sm` in both. |
| Bare multi-term list, 520px | every `dt x=0`, every `dd x=173.33`; term padding-right 16px | flow content | Veneer's bare look. |
| `dl.mb-0`, 520px | `display: grid`, `dd x=173.33 y=0`, margin 0 | flow, margin 0 | The grid stays and the utility takes the margin. |
| Bare `blockquote` | 4px bar, 16px inset, italic | none | Veneer's bare look. |
| `blockquote.mb-0` | 4px bar, 16px inset, italic, margin 0 | none, margin 0 | The bar stays and the utility takes the margin. |
| `.blockquote` | padding 0, border 0, normal, h=30 | padding 0, border 0, normal, h=30 | Identical. |
| Attributed quotation (bare, `.text-center`, `.text-end`), 390 and 1280 | footer y=30 in a `flex` figure | footer y=30 in a `block` figure | The footer starts at the quotation edge. The footer height is 17.14 against 21, from the caption line height. |
| Bare captioned image | caption y=88, figure `flex` | caption y=80 | Veneer's 8px caption space, by design. |
| `.figure` pattern, 390 and 1280 (also with `.text-end` caption) | figure `inline-block` w=148.44; caption y=88 | figure `inline-block` w=169.64; caption y=88 | The layout matches. The width follows the caption text size. |
| `.figure.w-100` around a `.ratio` swatch | caption y=150 | caption y=150 | Matches after the `.figure-caption` reset. |

## Gate table

The gate chain script is `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-gates.sh`, with its exit summary in `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-gates.log.txt`.

| Gate | Exit | Log |
| --- | --- | --- |
| Owned test files (the preceding command) | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-owned.log.txt` |
| `npm run format:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-format-check.log.txt` |
| `npm run lint:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-lint-check.log.txt` |
| `npm run check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-check.log.txt` |
| `npm run test:src:styles` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-test-src-styles.log.txt` |
| `npm run test:setup` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-test-setup.log.txt` |
| `npm run test:conformance` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-test-conformance.log.txt` |
| `npm run test:guides` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-test-guides.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/TypeSection.test.ts tests/app/browser/integration.test.ts` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-type-section.log.txt` |

## Shared-file hunks

`tests/setupStyles.ts`, in `TEXT_DL_CASES`:

```diff
 				margin: '0px',
 				display: 'grid',
-				'grid-template-columns': '168px 336px',
-				gap: '8px 16px',
+				'grid-template-columns': '176px 352px',
+				gap: 'normal',
 			}),
```

`guides/veneer.md`: the full hunks are in `/home/user/scaffold/.orkestrel/veneer/units/eil-3.diff`. Each row keeps the padded cell widths of its table.
The row changes against `ca83afb` are as follows.

- `#### reboot` departures: the `dd` `margin-bottom` row becomes `` `0.5rem` `` against `` `var(--vn-space-4)` `` with
  the `tokenized` state. The `dd` `margin-left` row is removed.
- § Additions, `reboot`: the `dl { gap }` and `dd { margin }` rows are removed. The rows
  `dt { grid-column }`, `dt { padding-right }`, and `dd { grid-column }` are added. The `dl { display }` and
  `dl { grid-template-columns }` rows stay as in `ca83afb`.
- § Additions, `reboot`: the `blockquote { padding-left }`, `blockquote { border-left }`, and
  `blockquote { font-style }` rows stay as in `ca83afb`.
- § Additions, `reboot`: the `figure { gap }` row is removed. The `figcaption` row's Reason becomes "Elements spaces a
  figure caption from the content before it and paints it in muted, smaller type, which the release leaves unstyled."
- § Additions, after the `.h6 { margin }` row: `.blockquote { padding-left }`, `.blockquote { border-left }`, and
  `.blockquote { font-style }` under `blockquote`, and `.figure-caption { margin-top }` under `figure`.

`app/browser/constants.ts`: unchanged since round 2. See the hunk in `/home/user/scaffold/.orkestrel/veneer/units/e-id-layout-report-2.md`.

## Diff and status

- Diff: `/home/user/scaffold/.orkestrel/veneer/units/eil-3.diff` (`git diff ca83afb`).
- Status: `/home/user/scaffold/.orkestrel/veneer/units/eil-3-status.txt`. Round 3 adds `src/styles/components/_quote.scss`,
  `src/styles/components/_image.scss`, and `tests/src/styles/components/image.test.ts`, and drops
  `src/styles/elements/_blockquote.scss`, which is back to its base text.

## Observations for E-ID-FLOW (no carrier assigned in this unit)

- In a flex `figure`, a child's margins stay inside the figure rather than collapsing through it. In the attributed
  quotation, the footer's 16px end margin sits inside the figure (figure height 63.14 against Bootstrap's 51). Because the
  figure margin is 0, the content after it lands where Bootstrap's does, less the footer's shorter line (63.14 against
  67). When E-ID-FLOW restores
  `figure { margin: 0 0 1rem }`, the footer margin and the figure margin will add up to 32px where Bootstrap collapses
  them to 16px. Settling reading: the `attributed quotation` fixture of `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-probe.mjs` with a following
  `p`, after the margin lands.
- A `figcaption` written before the image takes its 8px start margin at the top of the figure. This follows from the
  tag-only default.

## Deviation state

None. Ancillary choices settled in this unit:

- `.figure-caption { margin-top: 0 }`, from the Unknown's reading.
- The 528px dl specimen width.
- The `d-block` holder in the captioned-image proof. It makes that proof red before the change, where a bare figure
  alone reads 8px both before and after.
- The wording of the guide Reason cells.
