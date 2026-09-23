# B-FORMS-CLOSE-FORCED (`bff`) report, round 2

`opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-bff` (detached at
`ccb10a7`, holding round 1's uncommitted writes, none discarded). Nothing committed. Deviation
state: **none**. No quoted site was missing, and no criterion needed a file outside Owned. Every
criterion in the brief is met, and every gate named in criteria 5 and 6 exits 0.

One finding sits outside this round's scope and is not fixed: the round-1 validation forced-colours
case fails when it is the first case to run in its file. See § Claims flagged as weakest.

## Diff summary against round 1

Round 1's owned files were copied to `tmp/units/bff-round1/**.orig` before editing. The round-2
delta over them is `tmp/units/bff-round2.diff`, a unified diff of 261 lines. Per file:

- `src/styles/_mixins.scss`: the `forced-ring` doc comment now carries the criterion's text,
  rewrapped at 100 columns. This is a comment change only.
- `form-control.test.ts`, `form-select.test.ts`, `form-check.test.ts`, `form-range.test.ts`: each
  forced-colours case title changes, and nothing else in the file does.
- `validation.test.ts`:
  - The forced-colours case title changes, and its body does not.
  - The density case is retitled `widens the $state swatch by the same icon room at any density and
    under a direct space override, through the state class and the scope`.
  - The density case mounts a `.was-validated` form beside the class pair. The form holds a
    `disabled` resting swatch and a swatch whose validity is set through `setCustomValidity`
    (`'Pick a shade'` for the invalid state, `''` for the valid state).
  - The density case asserts that the scoped resting swatch matches neither `:valid` nor
    `:invalid`, and that the scoped stated swatch matches `:${state}`.
  - The density case reads the room, the density-2 width and room, and the override width and room
    on both pairs. Each reading uses `expect.soft` with a message naming its form (`class` or
    `scope`).
- `tests/setupStyles.test.ts`: adds `normalizeMediaCondition` to the `./setupServer.js` import list
  and one Node case. No other line changed.
- `guides/veneer.md`: four paragraphs change, each rewrapped from its first touched line.
  - § Validation classes proof list.
  - § Form control classes plaintext sentence.
  - The `focus-ring` paragraph.
  - § Compatibility forced-colours sentence.

`git status --porcelain` output (the same set as round 1, plus `tests/setupStyles.test.ts`):

```text
 M guides/veneer.md
 M src/styles/_mixins.scss
 M src/styles/components/_form-check.scss
 M src/styles/components/_form-control.scss
 M src/styles/components/_form-range.scss
 M src/styles/components/_form-select.scss
 M src/styles/components/_validation.scss
 M tests/setupStyles.test.ts
 M tests/src/styles/components/form-check.test.ts
 M tests/src/styles/components/form-control.test.ts
 M tests/src/styles/components/form-range.test.ts
 M tests/src/styles/components/form-select.test.ts
 M tests/src/styles/components/validation.test.ts
 M tests/src/styles/mixins.test.ts
```

`git diff --stat` against `ccb10a7`:

```text
 guides/veneer.md                                 | 399 ++++++++++++-----------
 src/styles/_mixins.scss                          |  14 +-
 src/styles/components/_form-check.scss           |   4 +-
 src/styles/components/_form-control.scss         |   4 +-
 src/styles/components/_form-range.scss           |   3 +
 src/styles/components/_form-select.scss          |   4 +-
 src/styles/components/_validation.scss           |   5 +-
 tests/setupStyles.test.ts                        |  33 ++
 tests/src/styles/components/form-check.test.ts   |  18 +
 tests/src/styles/components/form-control.test.ts |  30 ++
 tests/src/styles/components/form-range.test.ts   |  19 ++
 tests/src/styles/components/form-select.test.ts  |  18 +
 tests/src/styles/components/validation.test.ts   | 111 ++++++-
 tests/src/styles/mixins.test.ts                  |  10 +-
 14 files changed, 472 insertions(+), 200 deletions(-)
```

The partials and `mixins.test.ts` keep round 1's content: `git diff --stat` over
`src/styles/components` and `tests/src/styles/mixins.test.ts` reads 18 insertions and 12
deletions, which is round 1's figure. Both mutation plants were restored from their copies, and
`cmp` confirmed each restore.

## Acceptance criteria

1. **Titles.** Met. Each case keeps its body, and its assertions are unchanged.
   - `outlines the focused control at the focus width under forced colors, where its shadow ring is not painted`
   - `outlines the focused select at the focus width under forced colors, where its shadow ring is not painted`
   - `outlines the focused box at the focus width under forced colors, where its shadow ring is not painted`
   - `outlines the focused host at the focus width under forced colors, where its thumb ring is not painted`
   - `keeps the forced-colors outline on a focused $state control, because the state ring writes no outline`

   A search for `system highlight\|system-highlight` over the five proofs returns nothing. A verbose
   scoped run filtered to `at the focus width|forced-colors outline|icon room` shows each retitled
   case collected.
2. **Scoped density pair.** Met. The failing-first evidence is in § Failing-first evidence.
3. **Node case.** Met. The case is
   `emits one forced-colors block per selector, so the content a caller passes lands beside the forced outline`.
   It sits in `describe('styles setup')` after the range exclusion case.
   - It reads `readCascadeBlocks(compileExpandedCascade())` and keeps the blocks whose
     `normalizeMediaCondition(block.condition)` is `(forced-colors: active)`.
   - It groups those blocks with `Map.groupBy(forced, renderRuleKey)` and asserts that the list of
     keys holding more than one block is `[]`.
   - Its opening comment states that a caller's content shares the mixin's media block.
   - It adds two assertions the criterion does not name. The population must contain the
     `button:focus-visible`, `.btn:focus-visible`, and four forms `:focus` keys, so an empty
     population fails. The `button:focus-visible` and `.btn:focus-visible` blocks must declare
     `outline` then `box-shadow`, which pins the reset inside the outline's block.
4. **Sentences.** Met. Each carries the criterion's exact text, rewrapped at 100 columns. The
   instrument is `tmp/probe/bff2-guide-edit.py`.
   - § Validation classes: the list ends "…the check label's tint, the stacking an input-group child
     takes, the outline a focused validated control keeps under staged forced colors, and the
     validated color control's width against the resting one at a doubled density and under a
     direct `--vn-space-24` override." The following sentence ("It also reads a required empty
     control…") is unchanged.
   - § Form control classes: "The plaintext form's focus rule writes the release's `outline: 0`
     declaration and no ring. The plaintext form therefore draws no focus indicator in any mode, so
     forced colors remove nothing there and the rule includes no outline."
   - The `focus-ring` paragraph: "rules include the `forced-ring` mixin beside the shadow ring they
     keep from the release,".
   - § Compatibility: "the forms proofs read under it the outline's style and width on each focused
     text control, select, check, and range." The Button sentence after it is unchanged.
   - `_mixins.scss`: "Emits the outline a focused control draws in place of its shadow ring under
     forced colors, in the system highlight, because forced colors paint no `box-shadow`. A caller
     includes it beside its shadow. Content passed to it, such as the shadow reset the `focus-ring`
     mixin passes, lands in the same media block after the outline."
5. **Format, lint, check.** All four exit 0.
   - `npx oxfmt --config .oxfmtrc.json --check` over the 8 owned files: exit 0, "All matched files
     use the correct format."
   - `npm run format:check`: exit 0, "Finished in 6322ms on 287 files".
   - `npm run lint:check`: exit 0.
   - `npm run check`: exit 0.
6. **Tests.** All exit 0.
   - `npm run test:setup`: exit 0, "Test Files 4 passed (4) / Tests 248 passed (248)". Round 1
     read 247, and the added case accounts for the difference.
   - `npm run test:guides`: exit 0, "Test Files 1 passed (1) / Tests 18 passed (18)".
   - `npm run test:conformance`: exit 0, "Test Files 1 passed (1) / Tests 20 passed (20)".
   - Scoped styles run: exit 0, "Test Files 5 passed (5) / Tests 99 passed (99)". The command was
     `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache`
     over `validation.test.ts`, `form-control.test.ts`, `form-select.test.ts`,
     `form-check.test.ts`, and `form-range.test.ts`.

Gate outputs are in `tmp/probe/g2-*.txt`.

## Failing-first evidence

### Node case

The instrument is `tmp/probe/bff2-node-mutation.sh`, and its log is
`tmp/probe/bff2-node-mutation.log.txt`.

- **Plant.** In `focus-ring`, the `forced-ring` include with a content block becomes
  `@include forced-ring($width, $highlight);` followed by `@include forced-colors { box-shadow: $reset; }`.
- **Command.** `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupStyles.test.ts`.
- **Mutated result.** Exit 1, "Tests 1 failed | 106 passed (107)". The one failure is the
  added case: "AssertionError: expected [ …(10) ] to deeply equal []". The 10 duplicated keys are
  `button:focus-visible` and the nine `.btn` focus selectors.
- **Restore.** `cmp` exit 0.
- **Restored result.** Exit 0, "Tests 107 passed (107)".

### Density case

The instrument is `tmp/probe/bff2-density-mutation.sh`, and its log is
`tmp/probe/bff2-density-mutation.log.txt`.

- **Plant.** In `_validation.scss`, the rule is split. `.was-validated .form-control-color:#{$state}`
  alone writes `width: calc(3rem + calc(1.5em + 0.75rem))`, and `.form-control-color.is-#{$state}`
  keeps the token.
- **Command.** `npm run build:src:styles` (exit 0), then
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/validation.test.ts -t "icon room"`.
- **Mutated result.** Exit 1, "Tests 2 failed | 19 skipped (21)". Both states fail. The assertion
  errors are only these:
  - "scope doubled room: expected -12 to be 36", which is 84 − 96.
  - "scope overridden room: expected 20 to be 36", which is 84 − 64.

  The soft readings keep running after a failure, so every `class` reading and the `scope` room at
  density 1 ran and held. Density 1 holds because `3rem` equals `--vn-space-24` there.
- **Restore.** `cmp` exit 0, then a rebuild with exit 0.
- **Restored result.** Exit 0, "Tests 2 passed | 19 skipped (21)".

## Observations

- The whole `npm run test:src:styles` run exited 0: "Test Files 75 passed (75) / Tests 747 passed
  (747)". The output is in `tmp/probe/g2-styles-all.txt`.
- `npm run test:policy` exited 0: "Tests 109 passed | 1 skipped (110)". The skip is the existing
  conditional skip in `tests/policy.test.ts`, the same one round 1 reported.
- `npm test` was not run.

## Shared-file patches

None. `tests/setupStyles.ts`, `tests/setupServer.ts`, and `ROADMAP.md` are untouched.

## Claims flagged as weakest

- **The round-1 validation forced-colours case depends on the order its file runs in.** This
  finding is outside this round's scope and is not fixed. Carrier: none named yet.
  - Command:
    `npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/validation.test.ts -t "forced-colors outline"`.
  - Result: exit 1, 3 of 3 runs. The first state to run fails with `Interactive target "Stated entry" is not reachable through forward Tab traversal:` and an empty trail.
  - The case passes in the whole-file run, the scoped five-file run, and the whole styles run. The
    same filtered run over each of the four control proofs passes.
  - The case body is byte-identical to round 1. Only its title changed, so the defect predates
    this round.
  - Hypothesis: when the case runs first, the frame has no focus. `driveTraversal` caps its Tab
    presses at the focusable count × 3 + 10, which is 13 for this mount's single control, and
    focus never enters the frame within that cap. The control proofs mount more focusable elements.
  - Criterion 1 fixes the case's assertions, so the fix belongs to a successor unit: give the
    traversal a focused starting point, or drive focus the way the file's ring cases do.
- **The scoped resting swatch is `disabled`.** A color input always holds a value, so any enabled
  swatch inside `.was-validated` matches `:valid` and takes the validated width. A disabled control
  is barred from constraint validation. The case asserts
  `settled.matches(':valid, :invalid')` is `false` rather than trusting this.
- **`expect.soft` has no earlier use in the tree.** The labelled-message form `expect(value, message)`
  exists in `form-select.test.ts` and `button-group.test.ts`. Soft readings let the mutation run
  show every `class` reading holding. With hard readings, the run would stop at the first `scope`
  failure.
- **The Node case's key list is a literal set of existing members.** It uses
  `expect.arrayContaining`, so a later `forced-ring` caller does not redden it. Removing any of the
  listed forced blocks does.
- **Other guide sentences still say what the cascade writes in the system highlight.** Examples:
  "the focused box also draws an outline in the system highlight", around line 1072, and the
  matching sentences for select, control, and range. These state the source's `outline` colour
  (`var(--vn-focus-highlight)`), not a proof reading. The brief does not list them, and no proof
  paragraph in the guide claims a colour reading.

## Retained instruments

All are under `/home/user/veneer-bff/tmp/`:

- `units/bff-round1/**.orig`: round 1's owned files, as they stood before round 2.
- `units/bff-round2.diff`: the round-2 delta.
- `probe/bff2-forced-blocks.mjs`: the pre-edit listing of forced-colours blocks per selector. Each
  of the 15 selectors held one block.
- `probe/bff2-node-case.py`: inserts the Node case.
- `probe/bff2-density-case.py`: the first draft of the density case, superseded by in-place edits.
- `probe/bff2-guide-edit.py`: the guide edits.
- `probe/bff2-node-mutation.sh` and its `.log.txt`.
- `probe/bff2-density-mutation.sh` and its `.log.txt`.
- `probe/bff2-mixins.scss.copy` and `probe/bff2-validation.scss.copy`: the restore sources.
- `probe/g2-*.txt`: the gate outputs.
