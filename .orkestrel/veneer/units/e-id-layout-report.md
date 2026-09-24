# E-ID-LAYOUT report — `opus` on Opus 5.5, worktree `/home/user/veneer-eil`, branch `unit/eil`, baseline `ca83afb`

Bootstrap's class-built description list and attributed quotation now lay out as Bootstrap lays them out, and the bare
`dl` and `blockquote` keep Veneer's look. One ancillary item is held and returned as an unapplied patch, because it
needs an off-limits file: the Horizontal description list specimen. See § Deviation state.

## Changes

- `src/styles/elements/_dl.scss`: the grid moves to `dl:not([class])` with `column-gap` alone (no `row-gap`); `dt`
  takes `grid-column: 1` and `dd` takes `grid-column: 2`; `dd` writes `margin-bottom: var(--vn-space-4)` and
  `margin-left: 0` in place of `margin: 0`. The term weight, the muted description color, and `dl { margin: 0 }` stay.
- `src/styles/elements/_blockquote.scss`: the bar, the inset, and the italics move to `blockquote:not([class])`; the
  `blockquote` margin stays on the bare selector.
- `src/styles/elements/_figure.scss`: `figure { margin: 0 }` stays; the column layout moves to
  `figure:not(:has(> .blockquote))`. This is the first `:has()` in the cascade.
- `tests/src/styles/elements/dl.test.ts`: the bare-list pin reads `dd` margin `0px 0px 8px`; the proofs of the
  horizontal description list and the multi-term bare list are added.
- `tests/src/styles/components/quote.test.ts`: the proof that `.blockquote` reads a 0px left border, a 0px left
  padding, and normal style, beside a bare `blockquote` that keeps 4px, 16px, and italic.
- `tests/src/styles/elements/figure.test.ts`: the proof that the attributed quotation's footer starts at the
  quotation's bottom edge in a bare, a `.text-center`, and a `.text-end` figure, and that the figure reads `block`.
- `tests/setupStyles.ts` (shared): the `TEXT_DL_CASES` values replace `gap: '8px 16px'` with `'row-gap': 'normal'` and
  `'column-gap': '16px'`.
- `guides/veneer.md` (shared): the `dd` departure rows and the `dl`, `dd`, `blockquote`, and `figure` addition rows.

Diffstat against `ca83afb`: 8 files changed, 118 insertions(+), 19 deletions(-). Diff: `tmp/units/eil.diff`. Status:
`tmp/units/eil-status.txt`.

## Unknowns settled

- **Test viewport.** The styles project opens at `innerWidth` 414 and `innerHeight` 896 (root font 16px, body 14px),
  read from a throwaway assertion in `dl.test.ts` that was removed afterwards. The width is under the 576px `sm` bound,
  so the horizontal proof visits 576px through the `visitBreakpoint` helper and asserts `innerWidth` 576 there.
- **Figure selector.** `figure:not(:has(> .blockquote))`. The `classless-figure` mutation
  (`figure:not([class])`) reddens the bare-figure case (footer top 38 against the quotation bottom 30), so a class test
  cannot reach Bootstrap's attributed quotation in a bare `figure`; only a test on the figure's content can. The
  captioned-image control in the probe keeps Veneer's column layout (`display: flex`, `gap: 8px`), and the existing
  bare-figure pin in `figure.test.ts` still passes.

## Failing-first table

| Command | Before the change | After the change |
| --- | --- | --- |
| `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/eil-test.sh tests/src/styles/elements/dl.test.ts tests/src/styles/elements/blockquote.test.ts tests/src/styles/elements/figure.test.ts tests/src/styles/components/quote.test.ts` (builds `build:src:styles`, then `npx vitest run --config configs/src/vite.styles.config.ts --no-cache <files>`) | `Tests  8 failed \| 8 passed (16)` — `tmp/units/eil-red.log.txt` | `Tests  16 passed (16)` — `tmp/units/eil-green.log.txt`, re-run at the end in `tmp/units/eil-owned.log.txt` |
| `npm run test:conformance` (after the cascade change, before the guide rows) | `Tests  6 failed \| 20 passed (26)` — `tmp/units/eil-conformance-1.log.txt` | `Tests  26 passed (26)` — `tmp/units/eil-test-conformance.log.txt` |

The failing tests before the change: both `resolves the dl values in … mode` cases, `lays a horizontal description
list out beside its terms from the sm breakpoint` (`dd` top 29 against `dt` top 0), `keeps every term in the term
column and every description in the description column` (`[0, 184, 184]` against `[0, 0, 0]`), `leaves the bare
quotation bar, inset, and italics off the quotation class` (`4px` against `0px`), and each `starts the footer at the
quotation edge inside …` case (38 against 30).

## Mutation table

Instrument: `tmp/units/eil-mutate.py` (summary `tmp/units/eil-mutations.log.txt`). Each mutation edits one partial,
rebuilds the cascade, runs the owned test files, copies the saved partial back, and compares the bytes with `filecmp`.

| Mutation | Assertion it reddens | Reading | Log | Byte-identical restore |
| --- | --- | --- | --- | --- |
| `unscoped-grid`: `dl { display: grid; grid-template-columns: 1fr 2fr; gap: var(--vn-space-4) var(--vn-space-8) }` in place of the scoped rule | horizontal list `description 0 top`; bare-list `values` | `dd` top 29 against `dt` top 0 | `tmp/units/eil-mutation-unscoped-grid.log.txt` | True |
| `zero-dd-margin`: `dd { margin-bottom: 0 }` | horizontal list term step; bare-list `dd` margin | step 21 against 29 (`dd` height 21 + 8); `0px` against `0px 0px 8px` | `tmp/units/eil-mutation-zero-dd-margin.log.txt` | True |
| `no-dt-column`: drop `dt { grid-column: 1 }` | multi-term term column | `[0, 184, 0]` against `[0, 0, 0]` | `tmp/units/eil-mutation-no-dt-column.log.txt` | True |
| `no-dd-column`: drop `dd { grid-column: 2 }` | multi-term description column | `[184, 184, 0]` against `[184, 184, 184]` | `tmp/units/eil-mutation-no-dd-column.log.txt` | True |
| `unscoped-blockquote`: `blockquote { … }` in place of `blockquote:not([class]) { … }` | `.blockquote` `border-left-width` | `4px` against `0px` | `tmp/units/eil-mutation-unscoped-blockquote.log.txt` | True |
| `unscoped-figure`: `figure { … }` in place of `figure:not(:has(> .blockquote)) { … }` | footer top, all alignment cases | 38 against 30 | `tmp/units/eil-mutation-unscoped-figure.log.txt` | True |
| `classless-figure`: `figure:not([class]) { … }` | footer top, bare-figure case only | 38 against 30 | `tmp/units/eil-mutation-classless-figure.log.txt` | True |

Every mutation reddens only the proofs named in its row; the other owned proofs stay green in each log.

## Probe readings against Bootstrap 5.3.8

Instruments copied to this worktree and pointed at its `dist/src/styles/index.css`, `node_modules/bootstrap`, and
`node_modules/playwright`: `tmp/units/eil-dl-row-probe.mjs` (also read at 576 and 575) and
`tmp/units/eil-breakage-probe.mjs` (the list and quotation fixtures, plus the bare-figure quotation, the class-free
quotation, the multi-term list, and a captioned-image control). Logs: `tmp/units/eil-dl-row-probe.log.txt` and
`tmp/units/eil-breakage-probe.log.txt`.

| Fixture | Veneer | Bootstrap | Reading |
| --- | --- | --- | --- |
| `dl.row` at 1280 | `dt x=70 y=0`, `dd x=355 y=0`, `dt y=29`, `dd x=355 y=29` | `dt x=70 y=0`, `dd x=355 y=0`, `dt y=32`, `dd x=355 y=32` | Columns and pairing match (the design-round reading was `dd x=70 y=29`). Each step is the `dd` height plus 8px on both sides; the 21px against 24px line comes from the 14px body size. |
| `dl.row` at 576 | `dd x=153 y=0`, step 29 | `dd x=153 y=0`, step 32 | Same as at 1280. |
| `dl.row` at 575 | stacked: `dd x=0 y=21`, `dt y=50` | stacked: `dd x=0 y=24`, `dt y=56` | Stacks below `sm` in both. |
| Nested horizontal list, 390 and 1280 | no `x` or `w` difference | — | Only heights differ: line height, and the dropped `dl` end margin. |
| Multi-term bare list | every `dt x=0`, every `dd x=141` (390) and `x=437` (1280) | flow content | Each child holds its column. |
| Repeated definitions | each `dd` in the description column | flow content | Veneer's bare look, kept by ruling. |
| `.blockquote` alone | no difference beyond the following `p` | — | The bar, inset, and italics no longer reach it. |
| Bare `blockquote` | 4px bar, 16px inset, italic | none | Veneer's bare look, kept by ruling. |
| Attributed quotation in a bare, `.text-center`, and `.text-end` figure | no `y` difference on the footer; figure `block` | same | The footer starts at the quotation edge (design round: `y=38` against `y=30`). Remaining differences: footer height 17 against 21, figure margin `0px` against `0px 0px 16px`. |
| Captioned-image figure (control) | `display: flex`, `gap: 8px` | `block` | The bare figure keeps its column layout. |

## Gate table

| Gate | Exit | Log |
| --- | --- | --- |
| `npm run format:check` | 0 | `tmp/units/eil-format-check.log.txt` |
| `npm run lint:check` | 0 | `tmp/units/eil-lint-check.log.txt` |
| `npm run check` | 0 | `tmp/units/eil-check.log.txt` |
| Owned test files (command in § Failing-first table) | 0, `Tests  16 passed (16)` | `tmp/units/eil-owned.log.txt` |
| `npm run test:src:styles` | 0, `Tests  1438 passed (1438)` | `tmp/units/eil-test-src-styles.log.txt` |
| `npm run test:setup` | 1, `Tests  1 failed \| 306 passed \| 12 skipped (319)`; re-run: 1, `Tests  4 failed \| 303 passed \| 12 skipped (319)` | `tmp/units/eil-test-setup.log.txt`, `tmp/units/eil-test-setup-rerun.log.txt` |
| `npm run test:conformance` | 0, `Tests  26 passed (26)` | `tmp/units/eil-test-conformance.log.txt` |
| `npm run test:guides` | 0 | `tmp/units/eil-test-guides.log.txt` |

Observation on `test:setup`: every failure is a timeout (`Hook timed out in 10100ms`, `Test timed out in 10100ms`,
`Test timed out in 5000ms`) in `tests/setupServer.test.ts` oracle and compile cases and in `tests/setupStyles.test.ts`
range-rule cases. None of them reads a file this unit changed. During both runs a journey suite from
`/home/user/veneer` (`vitest run --config configs/app/vite.journey.config.ts`, process 22279) was running, and
`uptime` reported a load average of 15.76 on 4 cores. The deciding re-run is the Orchestrator's, on an idle host.

The gate chain script is `tmp/units/eil-gates.sh`, and its exit summary is `tmp/units/eil-gates.log.txt`. `npm run
build:src` ran once (`tmp/units/eil-build-src.log.txt`), because the conformance runtime cases read
`dist/src/core/index.js`.

## Shared-file hunks

`tests/setupStyles.ts`, in `TEXT_DL_CASES`:

```diff
 				margin: '0px',
 				display: 'grid',
 				'grid-template-columns': '168px 336px',
-				gap: '8px 16px',
+				'row-gap': 'normal',
+				'column-gap': '16px',
 			}),
```

`guides/veneer.md`: the full hunks are in `tmp/units/eil.diff`. Each rewritten row keeps its table's padded cell
widths, so the formatter re-pads no other row. The row changes are as follows.

- `#### reboot` departures: the `dd` `margin-bottom` row becomes `` `0.5rem` `` against `` `var(--vn-space-4)` ``,
  `tokenized`; the `dd` `margin-left` row is struck.
- § Additions: the `dl { display }`, `dl { grid-template-columns }`, `dl { gap }`, and `dd { margin }` rows give way to
  `dl:not([class])` (selector), `dt { grid-column }`, and `dd { grid-column }` (declarations).
- § Additions: the `blockquote { padding-left }`, `blockquote { border-left }`, and `blockquote { font-style }` rows
  give way to `blockquote:not([class])` (selector).
- § Additions: the `figure { display }`, `figure { flex-direction }`, and `figure { gap }` rows give way to
  `figure:not(:has(> .blockquote))` (selector).

`app/browser/constants.ts`: unchanged in the worktree. See § Deviation state.

## Deviation state

- **Held: the Horizontal description list specimen.** Adding a specimen to `TYPE_SPECIMENS` in
  `app/browser/constants.ts` makes `tests/app/browser/sections/TypeSection.test.ts` false. That test pins every
  specimen name, every markup string, and every rendered tag, and it is neither owned nor shared. Per § Deviation
  protocol, the specimen is not added. `tmp/units/eil-specimen.patch` holds the unapplied pair: the constants hunk,
  which inserts the `Horizontal description list` specimen
  (`<dl class="row"><dt class="col-sm-3">Term</dt><dd class="col-sm-9">A description beside its term.</dd><dt class="col-sm-3">Second term</dt><dd class="col-sm-9">Another description on the same line as its term.</dd></dl>`)
  between `Inline list` and `Quotation`, and the matching `TypeSection.test.ts` hunks. `git apply --check` accepts
  the patch. The patch has not been run. Hypothesis: the specimen also needs a `container` wrapper, because the
  `.row` class's negative gutters may overflow the Type region. The existing quotation specimens need no edit, because
  the rebuilt cascade renders them as Bootstrap does.
- **Ancillary choices settled here.** The figure selector (§ Unknowns settled). The proof visits 576px, the `sm`
  lower bound, rather than 1280px. The wording of the addition rows' Reason cells.
- **Command note.** The common terms name `npx vitest run --config vite.config.ts --no-cache --project src:styles
  <file>`. The root `vite.config.ts` declares no `src:styles` project. The project lives in
  `configs/src/vite.styles.config.ts`, and this unit used that project.

## Observations outside this unit's scope (no carrier assigned)

- The attributed quotation's footer is 17px tall against Bootstrap's 21px. The bare `figcaption` rule's
  `caption-text` mixin writes `line-height: 1.4`, which reaches `figcaption.blockquote-footer`. Bootstrap's footer
  inherits 1.5. The footer's font size and color come from the component, which overrides the bare rule.
- In a bare grid list, a `dt` beside a `dd` stretches to the row's height, which includes the `dd` end margin
  (`dt h=29` against a text line of 21). The term's text stays top-aligned, so the stretch shows only where a term
  paints a background.
- The `dl`, `figure`, and following-`p` end margins still differ from Bootstrap's. They belong to the dropped
  flow-margin question, which the verdict leaves to the user.
