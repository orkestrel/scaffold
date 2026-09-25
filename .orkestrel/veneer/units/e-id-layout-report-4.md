# E-ID-LAYOUT round 4 report — `opus` on Opus 5.5, worktree `/home/user/veneer-eil`, baseline `ca83afb`

The `figure` tag is back in block flow. Under Bootstrap's attributed quotation, the figure box ends at the footer's edge
and the content after it starts where Bootstrap's cascade puts it, at 390 and 1280 pixels. A fixed-geometry proof pins
that placement and turns red under a restored `display: flex`. The bare captioned image keeps its 8px caption space.
The `.figure` case carries the verbatim title. The figure case matrices live in `tests/setupStyles.ts`. Every gate the
brief names exits 0.

## Changes

- `src/styles/elements/_figure.scss`: `figure` drops `display: flex` and `flex-direction: column` and keeps `margin: 0`.
  `figcaption` keeps `margin-top: var(--vn-space-4)`.
- `tests/src/styles/elements/figure.test.ts`:
  - The calibrated case reads `display: block` and drops the `flex-direction` and `gap` readings.
  - The quotation and captioned-image cases import their holder matrices from `tests/setupStyles.ts`.
  - Added `ends the figure at the footer edge and starts the next block 16px later inside $holder`. The case runs
    over the bare, `.text-center`, and `.text-end` holders.
- `tests/src/styles/components/image.test.ts`:
  - `lays the figure class pattern out as the release does` is retitled verbatim to
    `shrinks the figure to its content and spaces the caption 8px under the image`.
  - The paint case drops its `flex-direction` residue reading, and its comment now describes the block tag.
- `tests/setupStyles.ts` (shared): adds `FIGURE_QUOTATION_CASES` and `FIGURE_IMAGE_CASES`, frozen and documented with
  TSDoc, after `TEXT_VAR_CASES`.
- `tests/setupStyles.test.ts` (shared): the export inventory lists both constants.
- `guides/veneer.md` (shared): removes the § Additions rows `figure { display }` and `figure { flex-direction }`,
  because the release writes neither.

The added proof uses a fixed-geometry fixture: the quotation text is 30px tall and the footer is 20px tall. The proof
reads the figure height (50) and the paragraph's offset from the figure top (66). Both values are Bootstrap's cascade
readings of the same markup (see § Probe readings).

Selectors in the owned partials: none reads a tag's context or the presence of a class. The pattern
`:not\(|:has\(|>|\+|~|\[class` over `_dl.scss`, `_blockquote.scss`, `_figure.scss`, `_quote.scss`, and `_image.scss`
returns only `.blockquote > :last-child`. That rule is Bootstrap's own, and the component class scopes it.

## Failing-first table

Command: `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-test.sh tests/src/styles/elements/dl.test.ts tests/src/styles/elements/blockquote.test.ts tests/src/styles/elements/figure.test.ts tests/src/styles/components/quote.test.ts tests/src/styles/components/image.test.ts`.
The script runs `npm run build:src:styles` and then
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache <files>`.

| State | Result | Log |
| --- | --- | --- |
| Before: the round-3 flex `figure`, with the final tests | `exit=1`, `Tests  5 failed \| 24 passed (29)` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-red.log.txt` |
| After: the block `figure` | `exit=0`, `Tests  29 passed (29)` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-green.log.txt` |

Red before the change:

- The calibrated case in both modes: `expected 'flex' to be 'block'`.
- The added proof for every holder: `expected 66 to be close to 50`.

Green before the change by design:

- The retitled `.figure` case. Only its title changed.
- The cases whose matrices moved. Only their data source changed.
- The paint case. It lost a residue reading.
- The bare captioned image. It reads 8px in both flows.

## Mutation table

Instrument: `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-mutate.py`, with its summary in `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-mutations.log.txt`. Each mutation edits
one partial, runs the preceding command, and copies the saved partial back. `filecmp` then compares the bytes. Each
log ends with its `exit=` line and its restore check. After the table ran, `npm run build:src:styles` rebuilt the final
cascade (`/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-build-src-styles.log.txt`, `exit=0`). The gate chain's owned run rebuilt it again.

| Mutation | Assertion it reddens | Reading | Log | Byte-identical restore |
| --- | --- | --- | --- | --- |
| `restored-flex`: `display: flex` and `flex-direction: column` back on `figure` | `ends the figure at the footer edge and starts the next block 16px later inside $holder`, every holder; the calibrated case | height 66 against 50; `flex` against `block` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-mutation-restored-flex.log.txt` | True |
| `no-caption-margin`: drop `figcaption { margin-top }` | `spaces the caption 8px under its image inside $holder`, both holders; the calibrated case | space 0 against 8; `0px` against `8px 0px 0px` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-mutation-no-caption-margin.log.txt` | True |
| `no-figure-display`: drop `.figure { display: inline-block }` | `shrinks the figure to its content and spaces the caption 8px under the image`; the paint case | width 320, not less than 320; `block` against `inline-block` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-mutation-no-figure-display.log.txt` | True |
| `no-caption-reset`: drop `.figure-caption { margin-top: 0 }` | `puts the classed caption on the edge of a box that carries no image class` | 158 against 150 | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-mutation-no-caption-reset.log.txt` | True |

Under `restored-flex`, the added proof's paragraph reading does not separate the two flows. The paragraph sits at 66 in
both, because Veneer's figure margin is 0. The figure height is the assertion that reddens. When `figure` takes
Bootstrap's `0 0 1rem` margin, a block figure still puts the paragraph at 66: Bootstrap's own cascade, which carries
that margin, reads 66 in the probe. No run in this round measured a flex figure carrying that margin.

## Probe readings against Bootstrap 5.3.8

Instrument: `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-probe.mjs`, run in Chromium against `dist/src/styles/index.css` and
`node_modules/bootstrap/dist/css/bootstrap.css`, with every fixture at 390 and 1280 pixels. The horizontal list also
runs at 575 and 576 pixels. Log: `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-probe.log.txt` (`exit=0`).

The negative control is `CONTROL=flex node /home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-probe.mjs`. It adds
`figure { display: flex; flex-direction: column }` to Veneer's page and runs the attributed quotation fixtures. Log:
`/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-probe-control.log.txt` (`exit=0`). It reads a figure box of 63.14 with natural text and 66 with fixed
geometry, where Bootstrap reads 51 and 50, so the instrument reports the flex box when one is present.

| Fixture | Widths | Veneer | Bootstrap | Reading |
| --- | --- | --- | --- | --- |
| `dl.row` | 390 | stacked; `dd y=21`, second `dt y=50` | stacked; `dd y=24`, second `dt y=56` | Stacks below `sm` in both. The step is the `dd` height plus 8px; the line heights differ (21 against 24). |
| `dl.row` | 575 | stacked; `dd y=21`, second `dt y=50` | stacked; `dd y=24`, second `dt y=56` | Same as at 390. |
| `dl.row` | 576 | `dt x=18 w=135`, `dd x=153 y=0`, step 29 | `dt x=18 w=135`, `dd x=153 y=0`, step 32 | Columns and pairing match. The step follows the line height. |
| `dl.row` | 1280 | `dt x=70 w=285`, `dd x=355 y=0`, step 29 | `dt x=70 w=285`, `dd x=355 y=0`, step 32 | Same as at 576. |
| Bare multi-term list, 520px | 390, 1280 | grid; every `dt x=0`, every `dd x=173.33` | flow content | Veneer's bare look. |
| `dl.mb-0`, 520px | 390, 1280 | grid, `dd x=173.33 y=0`, margin 0 | flow, margin 0 | The grid stays and the utility takes the margin. |
| Bare `blockquote` | 390, 1280 | 4px bar, 16px inset (text at x=20), italic | none | Veneer's bare look. |
| `blockquote.mb-0` | 390, 1280 | 4px bar, italic, margin 0 | none, margin 0 | The bar stays and the utility takes the margin. |
| `.blockquote` | 390, 1280 | h=30, padding 0, border 0, normal | h=30, padding 0, border 0, normal | Identical. |
| Attributed quotation, then a `p` (bare, `.text-center`, `.text-end`) | 390, 1280 | figure `block`, h=47.14; footer y=30 h=17.14; `p` y=63.14 | figure `block`, h=51; footer y=30 h=21; `p` y=67 | The figure ends at the footer edge in both, and the `p` sits 16px under it in both. The difference from Bootstrap's 51 and 67 is the footer's line height (17.14 against 21), a typography departure. |
| Fixed-geometry attributed quotation, then a `p` (bare, `.text-center`, `.text-end`) | 390, 1280 | figure h=50; footer y=30 h=20; `p` y=66 | figure h=50; footer y=30 h=20; `p` y=66 | Identical. |
| Captioned image | 390, 1280 | figure `block`; caption y=88 | caption y=80 | Veneer's 8px caption space, by design. |
| Captioned image in a `d-block` figure | 390, 1280 | caption y=88 | caption y=80 | Same as the bare figure. |
| `.figure` pattern (also with a `.text-end` caption) | 390, 1280 | `inline-block`, w=148.44; caption y=88 | `inline-block`, w=169.64; caption y=88 | The layout matches. The width follows Veneer's smaller caption type, a typography departure the caption treatment records. Nothing changed for it. |
| `.figure.w-100` around a `.ratio` swatch | 390, 1280 | caption y=150 | caption y=150 | Identical. |

## Gate table

Gate chain: `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-gates.sh`, with its summary in `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-gates.log.txt`. Each log ends with its
`exit=` line.

| Gate | Exit | Result | Log |
| --- | --- | --- | --- |
| Owned test files (the preceding command) | 0 | `Tests  29 passed (29)` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-owned.log.txt` |
| `npm run format:check` | 0 | — | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-format-check.log.txt` |
| `npm run lint:check` | 0 | — | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-lint-check.log.txt` |
| `npm run check` | 0 | — | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-check.log.txt` |
| `npm run test:src:styles` | 0 | `Tests  1447 passed (1447)` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-test-src-styles.log.txt` |
| `npm run test:setup` | 0 | `Tests  319 passed (319)` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-test-setup.log.txt` |
| `npm run test:conformance` | 0 | `Tests  26 passed (26)` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-test-conformance.log.txt` |
| `npm run test:guides` | 0 | `Tests  20 passed (20)` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-test-guides.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/TypeSection.test.ts` | 0 | `Tests  2 passed (2)` | `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-type-section.log.txt` |

The Unknown is settled. These existing proofs assumed the flex figure:

- The calibrated case. It reddened in the red run, and its fix is the `display: block` reading.
- The paint case's `flex-direction` residue reading. A block `figure` resolves `flex-direction` to its initial `row`
  (the probe reads `row` on every block figure), so the reading was dropped with the change.

The attributed quotation cases, the bare captioned image, the `TEXT_*` rows, and the Type section stayed green. No
timing failure occurred.

## Shared-file hunks

`tests/setupStyles.ts`, after `TEXT_VAR_CASES` (round 3's `TEXT_DL_CASES` hunk stands as reported in
`/home/user/scaffold/.orkestrel/veneer/units/e-id-layout-report-3.md`):

```diff
+/**
+ * Lists the figures that hold Bootstrap's attributed quotation, each with the name a proof title
+ * carries and the attribute text the figure's opening tag carries.
+ *
+ * @remarks
+ * The release documents the quotation bare, centered, and end-aligned, and an alignment class
+ * reaches the figure alone, so each holder is a layout the figure's own flow must leave as the
+ * release lays it out.
+ */
+export const FIGURE_QUOTATION_CASES = Object.freeze([
+	Object.freeze({ holder: 'a bare figure', attribute: '' }),
+	Object.freeze({ holder: 'a centered figure', attribute: ' class="text-center"' }),
+	Object.freeze({ holder: 'an end-aligned figure', attribute: ' class="text-end"' }),
+])
+
+/**
+ * Lists the figures that hold a captioned image, each with the name a proof title carries and the
+ * attribute text the figure's opening tag carries.
+ *
+ * @remarks
+ * The display utility names the class that writes the figure's flow outright, so the caption space
+ * reads the same whether the tag's flow or a utility's decides it.
+ */
+export const FIGURE_IMAGE_CASES = Object.freeze([
+	Object.freeze({ holder: 'a bare figure', attribute: '' }),
+	Object.freeze({
+		holder: 'a figure a display utility turns to block',
+		attribute: ' class="d-block"',
+	}),
+])
```

`tests/setupStyles.test.ts`, in the export inventory of
`exports the cascade and guide readers, the selector grammar the normalizer stands on, the frozen case tables, and the retained value lists`:

```diff
 				'FADE_SELECTORS',
+				'FIGURE_IMAGE_CASES',
+				'FIGURE_QUOTATION_CASES',
 				'FILL_ONLY_RECIPE',
```

`guides/veneer.md`, § Additions, `reboot`: round 4 removes the following rows. Every other row change stands as
round 3 reported it.

```diff
-| `reboot`       | `figure { display }`                                          | —                                                | declaration | Elements stacks a figure and its caption in a column.                                                                                                                       |
-| `reboot`       | `figure { flex-direction }`                                   | —                                                | declaration | Elements stacks a figure and its caption in a column.                                                                                                                       |
```

`app/browser/constants.ts`: unchanged since round 2. See the hunk in `/home/user/scaffold/.orkestrel/veneer/units/e-id-layout-report-2.md`.

## Diff and status

- Diff: `/home/user/scaffold/.orkestrel/veneer/units/eil-4.diff` (`git diff ca83afb`).
- Status: `/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r4/eil-4-status.txt`. Round 4 adds `tests/setupStyles.test.ts` to the round-3 set.

## Deviation state

None. This unit settled these choices itself:

- The fixed-geometry fixture: a 30px quotation text and a 20px footer, set as inline heights so the readings hold in
  either cascade's type.
- The constant names `FIGURE_QUOTATION_CASES` and `FIGURE_IMAGE_CASES` and their place after `TEXT_VAR_CASES`.
- The negative control added to the probe.
- Dropping the paint case's `flex-direction` residue reading, whose premise (a flex tag) no longer holds.
