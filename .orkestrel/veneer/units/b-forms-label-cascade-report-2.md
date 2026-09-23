# B-FORMS-LABEL-CASCADE (`bfl`) round 2 report

Every criterion is met. The unsized `.col-form-label` reads `var(--vn-size-3)`. The level case ran
red before the binding changed and green after it. The `#### col` table carries the departure row
the conformance drift reported. The listed prose sites carry the brief's text, and the label proof
splits selectors through the `splitTopLevelList` helper. Unit: `opus` on Opus 5.5, native, sole
writer in `/home/user/veneer-bfl` over `a56ca7e` with round 1 kept in place. No deviation.

## Diff against round 1

Round 1 is uncommitted, so this diff compares the working tree with a scratch index built from
`a56ca7e` plus the retained round-1 diff. The real index was not touched:

```text
GIT_INDEX_FILE=<scratch>/bfl2-r1.index git read-tree a56ca7e
GIT_INDEX_FILE=<scratch>/bfl2-r1.index git apply --cached /home/user/scaffold/.orkestrel/veneer/units/bfl.diff
GIT_INDEX_FILE=<scratch>/bfl2-r1.index git diff --stat

 guides/veneer.md                               | 29 ++++++++++++++------------
 src/styles/components/_form-label.scss         | 10 ++++-----
 tests/conformance.test.ts                      |  6 +++---
 tests/setupServer.test.ts                      |  4 ++--
 tests/setupServer.ts                           | 26 ++++++++++++-----------
 tests/setupStyles.test.ts                      |  2 +-
 tests/setupStyles.ts                           |  8 ++++---
 tests/src/styles/components/form-label.test.ts | 29 ++++++++++++++------------
 8 files changed, 62 insertions(+), 52 deletions(-)
```

The following output is `git diff --stat a56ca7e` over the whole unit, round 1 plus round 2:

```text
 guides/veneer.md                                  | 979 ++++++++++++----------
 src/styles/components/_form-label.scss            |  41 +
 src/styles/index.scss                             |   1 +
 tests/conformance.test.ts                         |  34 +-
 tests/setupServer.test.ts                         | 121 ++-
 tests/setupServer.ts                              |  82 +-
 tests/setupStyles.test.ts                         | 114 ++-
 tests/setupStyles.ts                              | 223 ++++-
 tests/src/styles/components/form-floating.test.ts |  30 +-
 tests/src/styles/components/form-label.test.ts    | 167 ++++
 10 files changed, 1202 insertions(+), 590 deletions(-)
```

The following output is `git status --short`:

```text
 M guides/veneer.md
 A src/styles/components/_form-label.scss
 M src/styles/index.scss
 M tests/conformance.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/components/form-floating.test.ts
 A tests/src/styles/components/form-label.test.ts
```

Round 2 changed no file outside Owned. `src/styles/index.scss` and `form-floating.test.ts` are
byte-identical to round 1. `tmp/units/` also holds untracked files: round 1's probe and report, and
this report.

## Touched files

- `src/styles/components/_form-label.scss`: `.col-form-label` writes `font-size: var(--vn-size-3)`.
  The comment names the control's type step, and its `legend` site reads "On a `legend` element it
  also clears".
- `tests/setupStyles.ts`: the `.col-form-label` row's `reads` binds `font-size` to `--vn-size-3`.
  The remarks read "so the `component` field names the table" and drop the `inherit` size from the
  literals list.
- `tests/setupStyles.test.ts`: the markup case's title reads "the stacked label, control, and help
  text".
- `tests/src/styles/components/form-label.test.ts`: the following proof changes landed.
  - The level case compares every label's font size with its control's, with the ternary removed.
  - The legend case reads the group control's type step.
  - The components-layer case splits selectors through the `splitTopLevelList` helper.
  - The retune comment carries the brief's text.
- `tests/setupServer.ts`: the `matchSelectorKey` summary, `@param`, and `@returns` carry the
  brief's text. The `attributeSelector` remarks read "through the {@link matchSelectorKey}
  helper" at each site the brief names. The `FORM_PARTIALS` remarks read "The
  `tests/conformance.test.ts` file maps".
- `tests/setupServer.test.ts`: the tier plant's comment carries the brief's text.
- `tests/conformance.test.ts`: the barrel-order comment has no count and reads "the
  `FORM_PARTIALS` record maps each".
- `guides/veneer.md`: `### Form label classes` carries the limit sentence, the closing clause, and
  the attribute and element nouns. The `#### col` table carries the `font-size` row.

## Failing-first evidence

- **Command.** `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/form-label.test.ts`
- **Before the binding.** The test edits had landed and the partial still wrote `inherit`. The run
  exited 1 with `Tests  2 failed | 7 passed (9)`:
  - `form label horizontal alignment > levels a horizontal label's content box with its control's at each size, at a doubled density, and under a border-width and a line-height retune`
    failed on `AssertionError: expected 14 to be close to 16, received difference is 2, but expected 0.0005`.
  - `form label horizontal alignment > clears a legend's own margin and sets it in its control's type when it labels a horizontal group`
    failed on `AssertionError: expected 14 to be 16 // Object.is equality`.
- **After the binding.** The same command exited 0 with `Tests  9 passed (9)`.

## Criteria

1. **Met.** The partial writes `font-size: var(--vn-size-3);` in `.col-form-label`. The `$sizes`
   `@each` rules and `.form-label` are unchanged. The comment's opening sentence names the tokens
   the control's inset and type read, which holds now that the type step is the control's. It reads
   "On a `legend` element it also clears the element's own trailing margin and type size."
2. **Met.** `FORM_LABEL_CASES` binds `'font-size': ['--vn-size-3']` on `.col-form-label`. The label
   Node case is green in `npm run test:setup`. The level case asserts
   `readPixels(label, 'font-size')` close to `readPixels(control, 'font-size')` for every row, and
   it ran red and then green, as the preceding section records. The legend case compares the legend
   and the bare legend with the group's `.form-control`. The components-layer case calls
   `splitTopLevelList(rule.selectorText)`, imported from `../../../setupStyles.js`, the same source
   `form-check.test.ts` uses. `grep -n "split(','" tests/src/styles/components/form-label.test.ts`
   returns nothing.
3. **Met.** The guide changes are listed under § Prose landed, and the departure row under
   § Departure row landed. The headline "The horizontal label reads the control's inset and type
   tokens" stays. The round-2 guide hunks sit only inside `### Form label classes` and the
   `#### col` table.
4. **Met.** Every site carries the brief's text. § Prose landed quotes each one.
5. **Met.** Each command exited 0:
   - `npx oxfmt --check` over the owned files: "All matched files use the correct format."
   - `npm run format:check`: "All matched files use the correct format."
   - `npm run lint:check`
   - `npm run check`
6. **Met.** Each command exited 0:
   - `npm run build:src`
   - `npm run test:setup`: `Tests  250 passed (250)`
   - `npm run test:conformance`: `Tests  21 passed (21)`
   - `npm run test:guides`: `Test Files  1 passed (1)`
   - the scoped styles run over `form-label.test.ts` and `form-floating.test.ts`:
     `Tests  27 passed (27)`
7. **Met.** § Tests is unchanged except for the required style-proof link.

## Departure row landed

After the binding changed and before the row existed, `npm run test:conformance` reddened
`cascade ledger > records every measured value difference in the guide ledger`. It named this
unrecorded row:

```text
col | .col-form-label | font-size | — | inherit | var(--vn-size-3) | tokenized
```

The row sits in the `#### col` table after the `.col-form-label` `padding-bottom` row and before
its `line-height` row, which is the partial's declaration order. It matches the table's column
widths:

```text
| `col`     | `.col-form-label`    | `font-size`      | —         | `inherit`                                 | `var(--vn-size-3)`                                 | tokenized |
```

## Prose landed

The following text landed at each site the brief names, quoted with its line wrapping removed:

- `tests/setupServer.ts`, the `matchSelectorKey` block:
  - summary: "Selects the longest key that one of a selector's classes equals or opens with."
  - `@param classes`: "The selector's classes, as the {@link collectSelectorClasses} helper reads
    them."
  - `@returns`: "The longest key any class equals or opens with, or undefined where no class reaches
    a key, so the `.form-switch .form-check-input` selector answers to the `form-check` key rather
    than to the `form` key."
- `tests/setupServer.ts`, the `attributeSelector` remarks: "A selector the inventory records
  nowhere is attributed by its classes, through the {@link matchSelectorKey} helper over every
  shipped key." and "then the longest key a class opens with, through the {@link matchSelectorKey}
  helper; then the first recorder in inventory order."
- `tests/setupServer.ts`, the `FORM_PARTIALS` remarks: "The `tests/conformance.test.ts` file maps
  the release's forms sequence through this record and removes the repeat".
- `tests/conformance.test.ts`, the barrel-order comment: "The release splits the label and the help
  text across its own partials that Veneer writes from one, and names its floating partial
  `floating-labels`; the `FORM_PARTIALS` record maps each onto the Veneer partial writing its rules,
  and the repeat the label pair leaves is removed."
- `tests/setupStyles.ts`, the `FORM_LABEL_CASES` remarks: "so the `component` field names the table
  the ledger files the rule's departures in." and "so the help text's `0.875em` size and the
  horizontal label's `0` margin stay literals."
- `tests/setupStyles.test.ts`, the markup case's title: "carries the stacked label, control, and
  help text under a sized parent, a horizontal row at each size, and a labelled group in the label
  markup"
- `tests/setupServer.test.ts`, the tier plant's comment: "Each row pins one tier, and the reading
  with `form` as the only shipped key withholds the specific key so the union key answers."
- `tests/src/styles/components/form-label.test.ts`, the level case's comments:
  - "Each retune is applied on top of the ones before it, so the reading after every retune holds
    the label under all of them at once."
  - "Every label takes its control's type step, and the label and the control read one line height
    token, so the label's line box is as tall as the control's."
- `guides/veneer.md`, `### Form label classes`, the behaviour paragraph: "Name the help text as the
  control's description through the `aria-describedby` attribute, so a screen reader announces the
  help text after the control's name. A horizontal label, or a `legend` element that labels a
  horizontal group, takes the control's own block inset plus the control's border width, and the
  control's line height, so its line box opens level with the control's at each size. A sized
  label takes the sized control's type step. The unsized horizontal label reads `--vn-size-3`, the
  control's type step, so its text sits level with the control's at each size, and the stacked
  `.form-label` keeps inheriting the surrounding type. On a `legend` element it also clears the
  element's own trailing margin and type size, so the legend reads at its control's type step."
- `guides/veneer.md`, the closing clause: "Neither records a departure, and neither does the
  horizontal label's `0` margin, which is the release's own value."

## Decisions recorded

Each of the following decisions sits inside Owned and follows the binding change or the class of
fault the brief names:

- **The legend sentence's result clause.** The clause "so the legend reads at the size of the text
  around it" became false under the binding. It reads "so the legend reads at its control's type
  step."
- **The departure bullet under the headline.** The headline stays. Its body listed the type tokens
  without `--vn-size-3`, so it reads "its type reads `--vn-size-3`, `--vn-size-5`, or
  `--vn-size-2` with `--vn-line-body`, the tokens the control of the same size reads."
- **The style-proof paragraph.** "the legend's cleared margin and inherited size" became false. It
  reads "the legend's cleared margin and its control's type step".
- **The legend case's title.** The case reads the control's step, so its title is "clears a
  legend's own margin and sets it in its control's type when it labels a horizontal group".
- **The `attributeSelector` remarks' tier sentence.** Round 1 wrote bare tokens there, the same
  fault the brief fixes elsewhere. The sentence reads "so the `.form-control-color.is-valid`
  selector answers to the `is-valid` key rather than to the `form-control` key."
- **Rewrapping.** Every rewrapped paragraph stays within 100 columns. `oxfmt` and `format:check`
  pass.

## Observation

- The whole `npm run test:src:styles` run exited 0 with `Test Files  76 passed (76)` and
  `Tests  756 passed (756)`. That run started before a comment-only edit to the level case in
  `form-label.test.ts`. After that edit, the scoped run over `form-label.test.ts` and
  `form-floating.test.ts` exited 0 with `Tests  27 passed (27)`, and `npm run format:check`
  exited 0.

## Flagged

- **The guide's move check.** The moved forms sections outside `### Form label classes` are
  unchanged against round 1, because the round-2 guide hunks sit only in that section and in the
  `#### col` table. This report did not re-run the `--color-moved` check against `a56ca7e`.
