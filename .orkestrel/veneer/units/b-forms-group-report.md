# Unit B-FORMS-GROUP — report

Executor: `opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bfg`,
baseline `2c10329`, under `tmp/units/b-forms-group-brief-2.md` (successor to
`tmp/units/b-forms-group-brief.md`). Nothing committed.

## Outcome

The `input-group`, `valid-feedback`, `valid-tooltip`, `invalid-feedback`, and `invalid-tooltip`
keys ship. Every recorded `input-group` selector except the `.dropdown-toggle` corner rules is in the
built cascade, the new keys are in `listed`, and the conformance ledger, deferral, and tag gates
pass. The remaining reds sit in files I may not edit:

- `tests/setupServer.test.ts`: the shipped-key Set literal. The brief assigns this edit to you.
- `tests/src/styles/components/validation.test.ts`: off-limits. The patch is in § Patches.

These deviations from the brief's anchors are recorded under § Deviations:

- The barrel line sits before `@use 'components/validation'`, not after `form-range`. A failing
  test shows the brief's anchor ships a Bootstrap mismatch.
- `.btn-toolbar .input-group` is appended to `BUTTON_GROUP_SELECTORS`.
- The partial carries no `@use '../tokens'` line (D18).

## Touched files

- `src/styles/components/_input-group.scss` (new, owned): the partial. It opens `@layer components`
  with no `@use` line.
- `tests/src/styles/components/input-group.test.ts` (new, owned): the browser proof.
- `app/browser/sections/InputGroupSection.ts` (new, owned): the section, in the `FormRangeSection.ts`
  shape.
- `tests/app/browser/sections/InputGroupSection.test.ts` (new, owned): the section proof.
- `src/styles/index.scss`: adds `@use 'components/input-group';` directly before
  `@use 'components/validation';`. This is Deviation D1.
- `app/browser/constants.ts`: appends `INPUT_GROUP_COPY` and `INPUT_GROUP_SPECIMENS`.
- `app/browser/Showcase.ts`: adds the import in its sorted position and appends the construction
  after `CloseSection`.
- `app/browser/index.ts`: appends the re-export.
- `tests/setup.ts`: makes these additions:
  - the `CaptureSubject` members;
  - the resting `CASCADE_KEYS` rows, appended at the end;
  - `INPUT_GROUP_KEYS` after `CLOSE_KEYS`;
  - the matching `CAPTURE_KEYS` spread member.
- `tests/setup.test.ts`: adds the import, the export-literal row, and the spread.
- `tests/setupStyles.ts`: appends `INPUT_GROUP_CASES`, `INPUT_GROUP_DEFERRED`, `INPUT_GROUP_MARKUP`,
  and `INPUT_GROUP_ROUNDING` at the end. It also appends `'.btn-toolbar .input-group'` to
  `BUTTON_GROUP_SELECTORS` (Deviation D2).
- `tests/setupStyles.test.ts`: adds the imports and the export-literal rows, and appends the
  `input group case tables` describe block.
- `tests/app/browser/Showcase.test.ts`: adds the region, the import, and the specimen spread.
- `tests/app/browser/index.test.ts`: adds the export rows in sorted position.
- `tests/app/browser/integration.test.ts`: adds the import, the portfolio declaration entry, and
  the focus journey case, appended after the close case.
- `tests/conformance.test.ts`: adds the new keys to `listed` in sorted position.
- `guides/veneer.md`: makes these changes:
  - adds `### Input group classes` after `### Form range classes`;
  - adds the § Files row and the § Tests link;
  - adds a § Compatibility selector row per new key;
  - strikes the `Forms` deferral rows this unit retires and adds the `Disclosure` dropdown-toggle rows;
  - appends the `btn` ledger rows for the sized group buttons;
  - adds the `#### input-group`, `valid-feedback`, `valid-tooltip`, `invalid-feedback`, and
    `invalid-tooltip` departure tables after `#### btn-close`.

Diffstat for the tracked files: `13 files changed, 727 insertions(+), 174 deletions(-)`. The new
files hold 122, 500, 20, and 90 lines (`wc -l`). Every deletion except the struck deferral rows is
an `oxfmt` realignment. It realigns every row of the § Compatibility table, because the
`invalid-feedback` component cell is wider than the old column. It realigns every row of the
§ Deferred selectors table, because the dropdown-toggle names are wider than the old column.

`git status --porcelain` lists the preceding files only.

## Coverage matrix

The proof cases have short names in the following table:

- L1: `input group layout > lays the group out as a wrapping flex row whose controls take the free space`
- L2: `… > lets a select and a floating wrapper take the free space the way a control does`
- L3: `… > sizes a group inside a toolbar to its content rather than to the toolbar`
- O1: `input group overlap > pulls every child after the first back over its neighbour by one border width`
- O2: `… > leaves the {valid,invalid} feedback and tooltip in place with their own corners inside a group reporting validation`
- C1: `input group corners > squares every inner corner and keeps the outer ones on the addon, the control, and the button`
- C2: `… > counts one child further from the end in a group reporting validation`
- C3: `… > squares the control or select inside a floating wrapper on the side its neighbour sits`
- A1: `input group addon > paints the addon from the compatibility variables and reads its lengths from the scale`
- A2: `… > rescales the addon with the density and radius factors and follows a direct override`
- A3: `… > repaints the addon with the color mode`
- S1: `input group sizes > sizes the text, control, select, and button children of an {lg,sm} group`
- S2: `… > leaves a validation mark its room on a control in an {lg,sm} group`
- K1: `input group stacking > lifts a focused control and a focused button over their neighbours after keyboard focus`
- K2: `… > lifts a focused child, select, and floating wrapper over the stacking a validation state gives a child`
- K3: `… > keeps a grouped button its own trailing radius and the ring it paints outside a group`
- N1 to N3: `tests/setupStyles.test.ts > input group case tables > …` (partition, written-count and token reads, freeze)
- J: `journey > reaches the plain input group control through the keyboard and lifts it over its addon`

"Resolved" means `readStyle` or `readPixels` read the value in Chromium. "Written" means N2 compares
the compiled cascade against the inventory: each rule is written as often as recorded, and each
declaration reads the `var()` names its row lists. Every row in the following table is also covered
by N2.

| Inventory selector (`input-group` key) | Proof case | Specimen | Scenario | Evidence and ladder path |
| --- | --- | --- | --- | --- |
| `.input-group` | L1, L3 | every specimen | `input-group-plain` (`display`) | resolved |
| `.input-group > .form-control` | L1 | `Input group plain` and others | — | resolved |
| `.input-group > .form-select` | L2 | none (no select specimen) | — | resolved |
| `.input-group > .form-floating` | L2 | none | — | resolved on an unstyled floating wrapper; no rendered floating label is needed, because the rule targets the wrapper box |
| `.input-group > .form-control:focus` | K1, K2 | `Input group plain` | `input-group-plain-focus` (page frame) | resolved after `traverseAccessible` |
| `.input-group > .form-select:focus` | K2 | none | — | resolved after `traverseAccessible` |
| `.input-group > .form-floating:focus-within` | K2 | none | — | resolved after `traverseAccessible` into the inner control |
| `.input-group .btn` | K1 | `Input group button` | `input-group-button` (`z-index`) | resolved |
| `.input-group .btn:focus` | K1, K3 | `Input group button` | — | resolved after traversal; K3 reads the ring |
| `.input-group-text` | A1, A2, A3, C1 | `Input group addons` | `input-group-addons` (`background-color`) | resolved, with `readToken` and `matchesColor` |
| `.input-group-lg > .form-control`, `.form-select`, `.input-group-text`, `.btn` | S1 (lg), S2 (lg) | `Input group large` | `input-group-large` (`font-size`) | resolved |
| `.input-group-sm > …` (the same children) | S1 (sm), S2 (sm) | `Input group small` | `input-group-small` (`font-size`) | resolved |
| `.input-group-lg > .form-select`, `.input-group-sm > .form-select` (`padding-right`) | S1 | none | — | resolved (48 px) |
| `.input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating)` | C1, C2 | `Input group addons` and others | resting frames | resolved against a layered radius fixture (see § Limits) |
| `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)` | N1, N2 (written never) | — | — | deferred: `Disclosure` row |
| `.input-group:not(.has-validation) > .form-floating:not(:last-child) > .form-control` and `> .form-select` | C3 | none | — | resolved on the inner field |
| `.input-group.has-validation > :nth-last-child(n+3):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating)` | C2 | `Input group validation` | `input-group-validation` (`display` of the feedback) | resolved |
| `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)` | N1, N2 | — | — | deferred: `Disclosure` row |
| `.input-group.has-validation > .form-floating:nth-last-child(n+3) > .form-control` and `> .form-select` | C3 | none | — | resolved on the inner field |
| `.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback)` | O1, O2, C1 | `Input group validation` and others | resting frames | resolved: margin, the tooltip's kept radius, and the feedback left in place |
| `.input-group > .form-floating:not(:first-child) > .form-control` and `> .form-select` | C3 | none | — | resolved |
| The validation stacking rules (`.was-validated .input-group > … :valid`, `.input-group > … .is-valid`, and their invalid twins) | K2 (rest 3 and 4, focus 5); `validation.test.ts` | none | — | emitted once by `_validation.scss`; N2 reads a single written rule each |
| `.btn-toolbar .input-group` | L3 | none | — | resolved |

The feedback and tooltip keys' remaining selectors are emitted by `_validation.scss`:
`.valid-feedback`, `.valid-tooltip`, the `.was-validated :valid ~ …` and `.is-valid ~ …` reveals,
`.form-check-inline .form-check-input ~ .valid-feedback`, and their invalid twins.
`tests/src/styles/components/validation.test.ts` proves them, including the override and factor
readings. O2 reads the `.is-{state} ~` reveal inside a group. `Input group validation` renders the
invalid feedback. No tooltip is rendered in the showcase (Deviation D6).

## Mutations and the negative control

The `prove` tool is unavailable, so I ran the mutation-with-exact-revert fallback. The instrument is
`mutate-named.py` in the scratchpad. For each mutation it plants one edit in
`_input-group.scss`, runs `npm run build:src:styles`, then runs
`npx vitest run --config configs/src/vite.styles.config.ts --reporter=verbose tests/src/styles/components/input-group.test.ts`
and
`npx vitest run --config vite.config.ts --reporter=verbose --project setup tests/setupStyles.test.ts`.
It then restores the file byte for byte, which the script asserts.

The negative control is the unplanted partial: 19 passed of 19 in the browser and 86 passed of 86
in Node.

| Mutation | Browser cases that fail | Node |
| --- | --- | --- |
| Wrong group corner: drops `border-top-right-radius: 0` from the end-squaring rule | C1, C2, C3 | green (declarations are not value-checked) |
| `has-validation` counts `n + 2` | C2 | N2 |
| Dropped overlap margin | O1, O2 valid, O2 invalid | N2 |
| Lost focus lift (control) | K1, K2 | N2 |
| Lost select focus lift | K2 | N2 |
| Lost button lift (`z-index: 2` on `.btn:focus`) | K1 | green |
| Wrong addon paint (`--bs-secondary-bg`) | A1, A2, A3 | N2 |
| Missing size rule (`.input-group-lg > .input-group-text`) | S1 lg | N2 |
| Sibling rule reaches the feedback (drops `:not(.invalid-tooltip)`) | O2 invalid | N2 |
| Literal addon padding (`0.375rem 0.75rem`) | A2 | N2 |
| Dropped toolbar rule | L3 | N2 |
| Dropped floating start squaring (control) | C3 | N2 |

A second instrument, `mutate3.py`, re-ran the corner mutations after the final C2 and C3 rework.
It also ran further floating mutations: the select end squaring and the validated floating
squaring. C1, C2, and C3 each failed as expected.

The barrel-order failing test: I ran
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/input-group.test.ts`
with the barrel line after `form-range`. The run gave 2 failed and 17 passed: S2 lg read `16` against
`42`, and S2 sm read `8` against `33`. With the line before `validation`, the same command gave 19
passed.

## Token rulings per value

No value was left with neither a token nor a permitted literal.

| Site | Release value | Written | Ruling |
| --- | --- | --- | --- |
| `.input-group-text` padding | `0.375rem 0.75rem` | `var(--vn-space-3) var(--vn-space-6)` | Tokenized: value-equal space tokens. |
| `.input-group-text` font-size | `1rem` | `var(--vn-size-3)` | Tokenized: value-equal. The button's `--vn-size-2` binding for the same `1rem` is refused, following the family ceiling and pagination's `--vn-size-3`. |
| `.input-group-text` font-weight, line-height | `400`, `1.5` | `var(--vn-weight-body)`, `var(--vn-line-body)` | Tokenized: value-equal, as `.btn` binds them. |
| `.input-group-text` color, background, border, radius | `var(--bs-body-color)`, `var(--bs-tertiary-bg)`, `var(--bs-border-width) solid var(--bs-border-color)`, `var(--bs-border-radius)` | the same | Byte for byte; no row. |
| `-lg` padding and font-size | `0.5rem 1rem`, `1.25rem` | `var(--vn-space-4) var(--vn-space-8)`, `var(--vn-size-5)` | Tokenized. |
| `-sm` padding and font-size | `0.25rem 0.5rem`, `0.875rem` | `var(--vn-space-2) var(--vn-space-4)`, `var(--vn-size-2)` | Tokenized. |
| `-lg` and `-sm` radius | `var(--bs-border-radius-lg)`, `var(--bs-border-radius-sm)` | the same | Byte for byte. |
| Sized select `padding-right` | `3rem` | `var(--vn-space-24)` | Tokenized: value-equal space token. Flagged: no shipped partial binds `--vn-space-24` yet, and the release value is padding-x plus indicator padding. |
| Overlap `margin-left` | `calc(-1 * var(--bs-border-width))` | the same | Byte for byte. |
| `z-index` 2 and 5; `flex: 1 1 auto`; `width: 1%`, `100%`, `auto`; `min-width: 0`; the zero corners; the keywords | — | literals | No scale token holds these values. The `--vn-stack-*` tokens start at 1070. |

## Ledger

**Departures** (all `tokenized`; no additions measured):

- `input-group`, on `.input-group-text`: `padding`, `font-size`, `font-weight`, `line-height`.
- `input-group`, on each of `.input-group-lg > .form-control`, `.input-group-lg > .form-select`,
  `.input-group-lg > .input-group-text`, and their `-sm` twins: `padding` and `font-size`.
- `input-group`, on `.input-group-lg > .form-select` and `.input-group-sm > .form-select`:
  `padding-right`.
- `btn`, on `.input-group-lg > .btn` and `.input-group-sm > .btn`: `padding` and `font-size`. The
  ladder attributes these rows to `btn`, because `btn` is the selector's own class and `input-group`
  is not. They are appended to `#### btn`.
- `valid-feedback` and `invalid-feedback`, on their own class: `margin-top`.
- `valid-tooltip` and `invalid-tooltip`, on their own class: `padding`, `font-size`, `color`. These
  rows come from the `_validation.scss` bindings and surface because the keys are now shipped.

The sibling rule attributes to `invalid-feedback`, the longest shipped key it names as a class, and
records no departure.

**Deferral rows struck** (`Forms`): `.input-group .btn`, `.input-group .btn:focus`,
`.input-group-lg > .btn`, `.input-group-sm > .btn`, `.btn-toolbar .input-group`.

**Deferral rows added** (`Disclosure`): `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)`
and `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)`.

## Scenarios, frames, and artifacts

These are the registered scenarios:

- `CASCADE_KEYS` element frames over the lifted specimen: `input-group-plain`,
  `input-group-addons`, `input-group-button`, `input-group-large`, `input-group-small`,
  `input-group-validation`.
- `INPUT_GROUP_KEYS` page frame: `input-group-plain-focus`.

The `CAPTURE=1` runs wrote these files under `tmp/capture/states/` (52 names matching `input-group` in that run):

- `<scenario>--{light,dark}-{1280,390}.png` for every registered scenario;
- `<subject>--{light,dark}-{1280,390}-accessibility.txt` for every registered subject.

I viewed `input-group-large--light-1280.png` and `input-group-validation--dark-390.png`, and each
shows its group. I did not view the other frames.

## Keys the shipped-key Set literal must gain

In `tests/setupServer.test.ts`, the case `skips engine and CSS obligations whose Proof cell is a dash`
needs `'input-group'`, `'invalid-feedback'`, `'invalid-tooltip'`, `'valid-feedback'`, and
`'valid-tooltip'`, each in its sorted position.

## Commands and results

All commands ran from `/home/user/veneer-bfg` on the final tree unless marked.

| Command | Exit | Counts |
| --- | --- | --- |
| `npm run format:check` | 0 | — |
| `npm run lint:check` | 0 | — |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | — |
| Built-cascade check: a node script collapses whitespace in `dist/src/styles/index.css` and looks up each unique `input-group` selector | — | 42 unique recorded; missing only the `.dropdown-toggle` rules |
| `npm run test:setup` | 1 | 1 failed, 184 passed. The failure is the Set literal case (Observation). |
| `npm run test:src:styles` | 1 | 1 failed, 652 passed, 71 files. The failure is `validation.test.ts > stacks a failing input-group child above a passing one`, which expected `'auto'` and received `'5'` (Deviation D3). The owned proof passes 19 of 19. |
| `npm run test:app` | 0 | 55 passed, 23 files |
| `npm run test:conformance` | 0 | 17 passed |
| `npm run test:guides` | 0 | 18 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped. The skip is the existing `skipIf` on the policy term file. |
| `npm run test:journey` (tree before the last proof-only edits) | 0 | 132 passed, 4 files |
| `CAPTURE=1 npm run test:journey -- --project 'journey:{light-1280,dark-1280,light-390,dark-390}*'` | 0, 0, 0, 0 | 33 passed each |
| `npm test` | not run | Observation only. The chain would stop at `test:src:styles` on the Deviation D3 red. |

The journey and capture runs came before the last edits to `tests/src/styles/components/input-group.test.ts`.
Those edits changed the C2 and C3 references and the floating case table. No file the journey
collects or serves changed after those runs.

## Deviations

1. **D1: The barrel line is before `@use 'components/validation'`, not after `form-range`.**
   - Expected: the anchor directly after `@use 'components/form-range';`.
   - Found: at that anchor, `.input-group-lg > .form-control` loads after
     `.form-control.is-invalid`, and the two have equal specificity. A failing control in a sized
     group then loses the `padding-right` its validation mark needs: 16 px against the release's
     42 px (see the failing test in § Mutations and the negative control).
   - The release loads `_input-group.scss` before `_validation.scss`, and verdict ruling 3 fixes the
     barrel to that order.
   - Done: the line sits before `validation`; S2 proves the order; the guide says so.
   - If you overrule this, move the line. S2 then fails, which it must.
2. **D2: `BUTTON_GROUP_SELECTORS` gains `'.btn-toolbar .input-group'`, appended as its last element in
   `tests/setupStyles.ts`.** Striking the deferral row made the setup case
   `binds the button group selectors, corner resets, and lift states to the inventory` fail: that
   selector was in neither the shipped list nor the withheld set. The list's doc says it holds every
   toolbar selector the cascade ships. This is an append outside the brief's named anchor for that
   file.
3. **D3: `tests/src/styles/components/validation.test.ts` fails and is off-limits.** The case
   `stacks a failing input-group child above a passing one` expects a focused `.is-valid` child at
   `z-index: auto`. The shipped `.input-group > .form-control:focus` gives `5`, as the release does.
   The patch is in § Patches. With the group loaded before `validation`, a rule that drops the
   `:not(:focus)` guard gives the focused child `3`, so the patched assertion still catches that
   mutation. I reasoned this and did not run it.
4. **D4: Guide prose that goes false and sits outside the named anchors.** The `### Button toolbar
   classes` sentence still says the combinator is withheld, and the `btn-toolbar` compatibility row
   still says it is recorded under § Styles. I did not edit either, because each fix rewrites an
   existing line. The patches are in § Patches.
5. **D5: The partial carries no `@use '../tokens'` line.** It reads no tokens-module Sass API, so D18
   (an unread `@use` is a dead load) overrides the brief's opening sentence. The precedent is
   `_button-group.scss`.
6. **D6: A ROADMAP carrier is left uncarried: "Validation tooltip specimens → B-FORMS-GROUP adds `Valid
   tooltip` and `Invalid tooltip` inside the positioned `.input-group` ancestor".**
   - Neither brief names it, and the brief requires specimen names that open with `Input group`.
   - An absolutely placed tooltip hangs below its group, outside the specimen box that the element
     frame and its declared region are read on.
   - A tooltip inside a group is proved in O2 but not rendered in the showcase.
   - The patch re-carries the row; you choose the carrier.
7. **D7: The `Showcase.ts` construction is appended after `CloseSection`.** The construction list
   follows landing order, not alphabetical order, so there is no alphabetical position to insert at.
   The import sits in its sorted position.

## Limits of the evidence

- **The corner readings depend on a radius fixture.** No text control or select partial ships a
  radius yet. The corner cases load `INPUT_GROUP_ROUNDING` through `scene.load`: a
  `@layer elements` rule giving `.form-control` and `.form-select` a radius. Every group rule
  outranks it. Kept corners are held to the same element's radius outside a group, not to a literal,
  so the cases survive the CONTROL and SELECT units.
- **The floating cases read an unstyled wrapper.** They read the wrapper box and the inner field,
  not a rendered floating label.
- **The grouped button's ring reads the calibrated `FOCUS_RING.light` ratio in this scene (K3).**
  Only the light mode is read.
- **A default-size `.btn` in a group is smaller than the addon.** It renders at `--vn-size-2`
  (14 px) beside the addon's `--vn-size-3` (16 px). That is the button's existing binding, not this
  partial's.

## Claims flagged unverified

- Equal-specificity conflicts: I measured only the input-group rules against
  `_validation.scss` (the `.form-control.is-*` padding). I did not enumerate conflicts with the
  partials that load later in the barrel (pagination, button-group, card, and the rest). None writes
  a property on the same element classes, which I checked by reading, not by running.
- The patched `validation.test.ts` assertion catching the guard-drop mutation (Deviation D3) is
  reasoned, not run.
- I viewed only the frames named under § Scenarios, frames, and artifacts.

## Patches

### `tests/src/styles/components/validation.test.ts` (off-limits; for you to apply)

```diff
@@ it('stacks a failing input-group child above a passing one'
 		expect(readStyle(requireValue(failing, 'No failing child'), 'z-index')).toBe('4')
-		// The release lifts a child only while it is out of focus, so a rule dropping the guard
-		// would keep the focused child under its neighbour.
+		// The release lifts a child by its state only while it is out of focus, and the group's own
+		// focus rule lifts the focused child above both state steps; a rule dropping the guard would
+		// hold the focused child at its state step instead.
 		expect(readStyle(requireValue(quiet, 'No quiet child'), 'z-index')).toBe('auto')
 		requireValue(passing, 'No passing child').focus()
-		expect(readStyle(requireValue(passing, 'No passing child'), 'z-index')).toBe('auto')
+		expect(readStyle(requireValue(passing, 'No passing child'), 'z-index')).toBe('5')
```

### `guides/veneer.md` (lines outside the named anchors)

```diff
@@ ### Button toolbar classes
-The `.btn-toolbar .input-group` combinator stays withheld, because Forms owns the input group it
-sizes; § Deferred selectors carries its row.
+The `.btn-toolbar .input-group` combinator ships with the input group it sizes, from
+`src/styles/components/_input-group.scss`; § Input group classes describes it.
```

The `btn-toolbar | selector` row in § Compatibility: replace the sentence
"The `.btn-toolbar .input-group` combinator is recorded under § Styles." with
"The `.btn-toolbar .input-group` combinator ships from `src/styles/components/_input-group.scss`,
and `tests/src/styles/components/input-group.test.ts` proves its width." Then run `oxfmt` on the
guide.

### `tests/setupServer.test.ts` (yours)

Add `'input-group'`, `'invalid-feedback'`, `'invalid-tooltip'`, `'valid-feedback'`, and
`'valid-tooltip'` to the Set literal in `skips engine and CSS obligations whose Proof cell is a
dash`, each in its sorted position.

### `ROADMAP.md`

`GROUP_COMMIT` is a placeholder for the landing commit's short hash.

```diff
@@ | B-FORMS |
-… VALIDATION landed as `d4f78e5` and RANGE as `376255a` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, RANGE's fix rounds by `analyst`); GROUP is next …
+… VALIDATION landed as `d4f78e5`, RANGE as `376255a`, and GROUP as `GROUP_COMMIT` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, RANGE's fix rounds by `analyst`); GROUP loads `_input-group.scss` before `_validation.scss`, the release's order; CHECK is next …
@@ carrier table
-| Validation tooltip specimens | B-FORMS-GROUP adds `Valid tooltip` and `Invalid tooltip` inside the positioned `.input-group` ancestor and registers their scenarios |
+| Validation tooltip specimens (a tooltip hangs below its group, outside the specimen box an element frame reads; B-FORMS-GROUP proves a tooltip inside a group in `input-group.test.ts` and renders none) | the Orchestrator names the carrier and the frame shape (a page frame, or a specimen that reserves the tooltip's room) |
+| The `### Button toolbar classes` sentence and the `btn-toolbar` compatibility row still name `.btn-toolbar .input-group` as withheld | the Orchestrator applies B-FORMS-GROUP's guide patch at its landing |
+| The barrel places `form-range` after `validation`, where the release loads the range control first; no equal-specificity conflict is measured between them | B-FORMS-CLOSE orders the forms barrel lines to `_forms.scss` |
```
