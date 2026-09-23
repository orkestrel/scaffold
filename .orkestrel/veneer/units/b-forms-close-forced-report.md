# B-FORMS-CLOSE-FORCED (`bff`) report

`opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-bff` (detached at
`ccb10a7`). Nothing committed. Deviation state: **none**. No stop condition fired. The button
compile is byte-identical, no forms Node case reddened, and no criterion needed a file outside
Owned.

## Diff summary

`git status --porcelain` output:

```text
 M guides/veneer.md
 M src/styles/_mixins.scss
 M src/styles/components/_form-check.scss
 M src/styles/components/_form-control.scss
 M src/styles/components/_form-range.scss
 M src/styles/components/_form-select.scss
 M src/styles/components/_validation.scss
 M tests/src/styles/components/form-check.test.ts
 M tests/src/styles/components/form-control.test.ts
 M tests/src/styles/components/form-range.test.ts
 M tests/src/styles/components/form-select.test.ts
 M tests/src/styles/components/validation.test.ts
 M tests/src/styles/mixins.test.ts
```

`git diff --stat` output:

```text
 guides/veneer.md                                 | 391 ++++++++++++-----------
 src/styles/_mixins.scss                          |  14 +-
 src/styles/components/_form-check.scss           |   4 +-
 src/styles/components/_form-control.scss         |   4 +-
 src/styles/components/_form-range.scss           |   3 +
 src/styles/components/_form-select.scss          |   4 +-
 src/styles/components/_validation.scss           |   5 +-
 tests/src/styles/components/form-check.test.ts   |  18 ++
 tests/src/styles/components/form-control.test.ts |  30 ++
 tests/src/styles/components/form-range.test.ts   |  19 ++
 tests/src/styles/components/form-select.test.ts  |  18 ++
 tests/src/styles/components/validation.test.ts   |  74 ++++-
 tests/src/styles/mixins.test.ts                  |  10 +-
 13 files changed, 397 insertions(+), 197 deletions(-)
```

Most of the `guides/veneer.md` line count is formatter realignment. `oxfmt` realigned the whole
§ Additions table because `` `form-control` `` is wider than the Component column's previous
width. Every realigned row keeps its cell text.

Per file:

- `src/styles/_mixins.scss`: adds `forced-ring($width: var(--vn-focus-width), $highlight: var(--vn-focus-highlight))`, which emits `@include forced-colors { outline: $width solid $highlight; @content; }`. `focus-ring` includes `forced-ring($width, $highlight) { box-shadow: $reset; }` in place of its inline forced branch.
- `_form-control.scss`, `_form-select.scss`, `_form-check.scss`: the `:focus` rule keeps `outline: 0` and its shadow and adds `@include forced-ring;`. Each comment gains one sentence naming the forced-colors outline.
- `_form-range.scss`: `.form-range:focus` keeps `outline: 0` and adds `@include forced-ring;`, with a comment. The thumb's shadow rule is unchanged. `.form-control-plaintext:focus` is unchanged. No forms rule authors a shadow reset.
- `_validation.scss`: the four validated colour selectors write `width: calc(var(--vn-space-24) + calc(1.5em + 0.75rem))`, with a comment.
- `form-control.test.ts`, `form-select.test.ts`, `form-check.test.ts`, `form-range.test.ts`: each adds one forced-colours outline case (titles follow).
- `validation.test.ts`: adds the forced-outline case on a focused validated control (both states), adds the density and override case (both states), makes the scoped case reach the `:invalid` swatch rule through `setCustomValidity`, and rewrites both `81` comments to name `--vn-space-24`.
- `mixins.test.ts`: the forced case stages through `stageMedia({ forced: true })` and `releaseMedia()`. The "no forced-colors axis" comment and the `sendProtocol` import are gone.
- `guides/veneer.md`: updates the four width ledger cells, the § Validation classes bullet, the § Form control classes width sentence, and the `focus-ring` paragraph. Adds a forced-colours sentence and a proof clause to each forms section, the plaintext limit, four § Additions rows, and the § Compatibility sentence.

## Acceptance criteria

1. **Format, lint, check.** All four exit 0.
   - `npx oxfmt --check <the 13 owned files>`: exit 0, "All matched files use the correct format."
   - `npm run format:check`: exit 0, "Finished in 7037ms on 287 files".
   - `npm run lint:check`: exit 0.
   - `npm run check`: exit 0.
2. **Mixin and button compile.** Met. `_mixins.scss` declares `forced-ring` with the signature and body the criterion names, and `focus-ring` includes it with `box-shadow: $reset` as content. The evidence is in `tmp/units/bff-button-compile.log.txt`:
   - Extraction alone: after editing only `_mixins.scss`, `npm run build:src` exited 0 and `cmp tmp/units/bff-baseline/index.css dist/src/styles/index.css` exited 0. The whole compiled file was byte-identical.
   - Final tree: `node tmp/probe/bff-button-compile.mjs tmp/units/bff-baseline/index.css dist/src/styles/index.css` reports "baseline blocks: 68 / built blocks: 68 / differing blocks: 0" and exits 0. It compares every rule whose selector names `.btn` or the `button` element, with its enclosing at-rules, extracted through the installed `postcss` parser.
3. **Forms `:focus` rules.** Met, checked against the compiled blocks.
   - `.form-control:focus`, `.form-select:focus`, and `.form-check-input:focus` keep their shadow and `outline:0` unconditionally. `.form-range:focus` keeps `outline:0`.
   - Each of the four gains `@media (forced-colors:active) { outline: var(--vn-focus-width) solid var(--vn-focus-highlight) }`.
   - `.form-control-plaintext:focus{outline:0}` is unchanged.
   - `node tmp/probe/bff-compile-delta.mjs` lists these four forced blocks and the two width rules as the whole shipped delta.
4. **Validated width.** Met. `_validation.scss` writes `width: calc(var(--vn-space-24) + calc(1.5em + 0.75rem))` in the `@each` that emits the four selectors.
5. **`npm run test:setup`.** Exit 0: "Test Files 4 passed (4) / Tests 247 passed (247)".
6. **Scoped styles run.** Exit 0: "Test Files 6 passed (6) / Tests 106 passed (106)". The command was `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache` over the six named files. A verbose rerun filtered to the new and changed titles shows each one collected and passing.
7. **Guide.** Met.
   - The four width cells read `calc(var(--vn-space-24) + 1.5em + 0.75rem)` with departure `tokenized`.
   - The bullet in § Validation classes is retitled "The color control's width reads the space token". The § Form control classes sentence now states that the resting and validated widths retune together.
   - The `focus-ring` paragraph names `forced-ring` and its four forms callers.
   - Each of § Form check, select, control, and range classes carries a forced-colours sentence that points at § Additions, and each proof paragraph names the forced reading.
   - § Additions carries four `declaration` rows under `@media (forced-colors: active)`: `.form-control:focus { outline }`, `.form-select:focus { outline }`, `.form-check-input:focus { outline }`, and `.form-range:focus { outline }`. The control, select, and check rows use the `btn` rows' Reason text verbatim. The range row reads "Under forced colors the ring is drawn as a system-color outline on the host, because the shadow the thumb wears elsewhere is not painted there."
   - The plaintext limit is stated in § Form control classes.
   - § Compatibility states that the installed `MediaOptions` contract stages forced colours through its `forced` axis, that the forms proofs read the outline under it, and that Button's own reading is B-PASSIVE-CLOSE-B's.
8. **Conformance and guides.** Both exit 0.
   - `npm run test:conformance`: "Test Files 1 passed (1) / Tests 20 passed (20)".
   - `npm run test:guides`: "Test Files 1 passed (1) / Tests 18 passed (18)".
9. **`npm run test:policy`.** Exit 0: "Tests 109 passed | 1 skipped (110)". The skip is the existing `it.skipIf(!isPolicyFile(...))` case "registers every substitution-table term as either matched or judged" in `tests/policy.test.ts`, which is off-limits and untouched.

Before the guide edit, `npm run test:conformance` was red on the measured change, as the brief
predicted. It reported 4 failed and 16 passed:

- The four width rows came back as unrecorded `tokenized` and stale `declared`.
- The four forced `outline` additions came back unrecorded.
- The planted-literal case also listed the four forced additions beside its `letter-spacing` line.

After the guide edit, all 20 pass.

## Compile comparison

The log is `tmp/units/bff-button-compile.log.txt`.

- The shipped `.btn*` and `button` block comparison exits **0**.
- The expanded Sass comparison exits **0**. It compiles `src/styles/index.scss` with `sass` in `expanded` style from the `HEAD` source (`git archive HEAD src/styles` into `tmp/probe/bff-head`) and from the working tree. The instrument is `tmp/probe/bff-button-expanded.mjs`.
- The whole-file `cmp` after the extraction alone exits **0**.

Instrument controls, each planted in `_mixins.scss` and restored with `cmp` confirming the
restore:

| Plant | Shipped comparison | Expanded comparison |
| --- | --- | --- |
| Emit the button's reset in a second media block | differing blocks: 0, exit 0 | differing blocks: 66, exit 1 |
| Draw the forced outline `dashed` | differing blocks: 3, exit 1 | differing blocks: 3, exit 1 |

## Width readings

These were taken in Chromium before the assertions were written. The measuring case was put in
`validation.test.ts`, run, and removed; the restore was confirmed by `git diff --stat tests/`
showing no change. The swatches carry `.form-control .form-control-color`, whose type is 16px.

| Condition | Resting `.form-control-color` | Validated `.form-control-color.is-invalid` | Difference |
| --- | --- | --- | --- |
| Density 1 | 48px | 84px | 36px |
| `--vn-factor-density: 2` | 96px | 132px | 36px |
| `--vn-space-24: 4rem` | 64px | 100px | 36px |

The existing `81` readings, on a swatch without `.form-control` against the 14px body type, still
pass. Under the `3rem` literal mutation the density-2 difference reads −12px, which is 84 − 96.

Forced-outline reading on a focused `.form-control.is-invalid`, from the same measuring case:

- Before staging: `outline-style` `none`, `outline-width` `0px`.
- Under `stageMedia({ forced: true })`: `matchMedia('(forced-colors: active)')` is true, `outline-style` is `solid`, `outline-width` is `3px` (the gauge reads 3px), and `box-shadow` is `none`.
- After `releaseMedia()`: `none` and `0px`.

## Unknowns answered

- **Compiled Veneer value of the width cell.**
  - The ledger's expanded Sass compile reads `calc(var(--vn-space-24) + 1.5em + 0.75rem)`, from the conformance diff before the guide edit. The four cells carry this value.
  - The shipped minified `dist/src/styles/index.css` reads `calc(var(--vn-space-24) + 1.5em + .75rem)`.
  - The baseline shipped value was `calc(3.75rem + 1.5em)`: the minifier folded the two rem terms.
- **Does the range forced block redden a range assertion?** No.
  - `npm run test:setup` passes, including the range Node case under the exclusion B-FORMS-CLOSE-TABLES gave it.
  - `form-range.test.ts` passes 7 of 7 in the scoped run.
  - The existing case "clears the control outline under keyboard focus and leaves the ring to the thumb" reads `outline-style` `none` outside forced colours, as before.
  - `findRule('.form-range:focus::-webkit-slider-thumb')` still resolves the thumb rule, not the forced twin. The new case reads the host's resolved style and uses no `findRule` lookup.

## Mutation evidence

The script is `tmp/probe/bff-mutations.sh` and its log is `tmp/probe/bff-mutations.log.txt`. Each
mutation rebuilt the styles, ran the named proof, and restored the file, with `cmp` confirming
the restore. The final rebuild exited 0.

| Mutation | Result |
| --- | --- |
| Remove `@include forced-ring` from `_form-select.scss` | 1 failed / 13 passed; the select forced case: "expected 'none' to be 'solid'" |
| Remove it from `_form-check.scss` | 1 failed / 23 passed; the check forced case |
| Remove it from `_form-range.scss` | 1 failed / 6 passed; the range forced case |
| Remove it from `_form-control.scss` | 3 failed / 51 passed; the text-control forced case and both validation forced cases |
| Hoist the outline out of the media block in `forced-ring` | 3 failed / 30 passed in `form-control.test.ts`; the forced case: "expected 'solid' to be 'none'" on the resting reading, plus the existing `.form-control:focus` row case and the light-mode ring-ratio case |
| Add `outline: 0` to the validated text control's `:focus` rule | 2 failed / 19 passed; both validation forced cases |
| Revert the validated width to the `3rem` literal | 2 failed / 19 passed; both density cases: "expected -12 to be 36" |
| Emit the button's reset in a second media block | The shipped comparison stays exit 0, because the minifier merges the adjacent identical media blocks and the shipped bytes do not change. The expanded comparison exits 1 (66 differing blocks). |

Failing-first names are the new cases, each shown red by removing the change it proves:

- `form-control.test.ts` › "outlines the focused control in the system highlight under forced colors, where its shadow ring is not painted"
- `form-select.test.ts` › "outlines the focused select in the system highlight under forced colors, where its shadow ring is not painted"
- `form-check.test.ts` › "outlines the focused box in the system highlight under forced colors, where its shadow ring is not painted"
- `form-range.test.ts` › "outlines the focused host in the system highlight under forced colors, where its thumb ring is not painted"
- `validation.test.ts` › "keeps the system-highlight outline on a focused $state control under forced colors, because the state ring writes no outline"
- `validation.test.ts` › "widens the $state swatch by the same icon room at any density and under a direct space override"

## Observations

- The whole `npm run test:src:styles` run exited 0: "Test Files 75 passed (75) / Tests 747 passed
  (747)". The output is in `tmp/probe/g-styles-all.txt`.
- `npm test` was not run. That tree-wide chain belongs to the Orchestrator's tracked run.

## Shared-file patches

None. `tests/setupStyles.ts`, `tests/setupServer.ts`, `tests/conformance.test.ts`, and
`ROADMAP.md` are untouched. No row is needed in `tests/setupStyles.ts`. The `ROADMAP.md` § Carriers
rows for B-FORMS-CLOSE-FORCED (the forced-colours row, the width row, and the plaintext row) are
the Orchestrator's fold.

## Claims flagged as weakest

- **The brief's second-media-block mutation cannot redden the shipped comparison.** The shipped
  build merges adjacent identical media blocks, so that mutation ships the same bytes. Criterion 2's
  byte identity holds, but on the shipped bytes alone it does not show that `focus-ring` emits one
  media block in source. The expanded comparison is the reading that does. It is a probe under
  `tmp/probe/`, not a committed test.
- **The forced outline's width binding to `--vn-focus-width` is read under a token retune in
  `form-control.test.ts` alone.** The other forms cases compare against a gauge that resolves the
  token. They share the one mixin, so a literal in `forced-ring` reddens the form-control case.
- **The forced reading sequence is written inline in each of the five proof files.** No
  `@orkestrel/test` export covers it, and its home would be `tests/setupStyles.ts`, which is shared.
  The design ruling and the brief place each case in its own proof, as the existing ring cases are.
  A reviewer may call this near-duplicate test code.
- **The `validation.test.ts` forced case reaches the control through `traverseAccessible`.** That
  file's existing ring cases use `focus()` and an arrow key, so this case departs from the file's
  pattern to satisfy the brief's "drives keyboard focus".
- **The guide names B-PASSIVE-CLOSE-B in § Compatibility, as criterion 7 requires.** The guide
  already names a unit label once (B-COLLAPSE, around line 67).
- **`setCustomValidity` in the scoped case follows the design ruling's R2 scoped native-validity
  clause, not a numbered criterion.** The `:invalid` swatch rule was unreachable in the scoped case
  before, because a colour input always holds a value.

## Retained instruments

All are under `/home/user/veneer-bff/tmp/`:

- `probe/bff-button-compile.mjs`
- `probe/bff-button-expanded.mjs`
- `probe/bff-compile-delta.mjs`
- `probe/bff-read-blocks.mjs`
- `probe/bff-compile-controls.sh` and its `.log.txt`
- `probe/bff-mutations.sh` and its `.log.txt`
- `probe/bff-guide-edit.py`
- `probe/bff-head/`, the `HEAD` source used for the expanded comparison
- `units/bff-baseline/index.css`, the baseline compile
- `units/bff-button-compile.log.txt`
- the gate outputs `probe/g-*.txt`
