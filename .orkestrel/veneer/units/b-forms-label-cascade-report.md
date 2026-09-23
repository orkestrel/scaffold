# B-FORMS-LABEL-CASCADE (`bfl`) report

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-bfl` at `a56ca7e`. Nothing is
committed. Every acceptance criterion reads green in the worktree. No stop condition fired.

## Ladder measurement (criterion 1, taken before any edit)

The probe is `tmp/units/bfl-ladder-probe.test.ts`. It was run as `tmp/probe/bfl-ladder-probe.test.ts`
through `npm run test:probe`, then moved to `tmp/units/`. It computes the ledger in three ways:

- today's shipped keys;
- `form` appended, under the landed membership ladder;
- `form` appended, under the tiered ladder, which the probe rebuilt from the exported
  `collectSelectorClasses` and `matchShippedKey` helpers.

Totals from the pre-edit run:

- Today: 1058 departures and 161 additions. The design brief measured 157 additions at `e0c901a`;
  `bff` added the rest.
- `form` appended under the membership ladder: 1058 departures and 161 additions, with 43
  departure rows handed to `form`.

These rows change owner between the membership ladder and the tiered ladder, with `form` shipped:

- **`form` → `form-control`, departures.**
  - `.form-control-plaintext`: `padding`, `line-height`.
  - `.form-control-sm` and `.form-control-lg`: `min-height`, `padding`, `font-size`.
  - `.form-control-sm::file-selector-button` and `.form-control-lg::file-selector-button`:
    `padding`, `margin`, `-webkit-margin-end`, `margin-inline-end`.
  - `textarea.form-control-sm` and `textarea.form-control-lg`: `min-height`.
  - `.form-control-color`: `width`, `height`, `padding`.
  - `.form-control-color.form-control-sm` and `.form-control-color.form-control-lg`: `height`.
- **`form` → `form-select`, departures.** `.form-select-sm` and `.form-select-lg`: `padding-top`,
  `padding-bottom`, `padding-left`, `font-size`.
- **`form` → `form-check`, departures.**
  - `.form-check-input`: `-webkit-appearance`, `-moz-appearance`, `-webkit-print-color-adjust`,
    `color-adjust`.
  - `.form-check-input:focus`: `border-color`, `box-shadow`.
  - `.form-check-input:checked`: `background-color`, `border-color`.
  - `.form-check-input[type=checkbox]:indeterminate`: `background-color`, `border-color`.
  - `.form-switch .form-check-input`: `transition`.
  - `.form-check-inline`: `margin-right`.
- **`form` → `form-check`, addition.** `.form-check-input:focus { outline }` under
  `@media (forced-colors: active)`, category `declaration`.
- **`row` → `row-gap`, departures.** The `row-gap` property on `.row-gap-0` through `.row-gap-5`,
  and on each `.row-gap-{sm,md,lg,xl,xxl}-{0..5}` under its `@media (width >= …)` condition.

Compared with today's guide ledger, where `form` is not shipped, the only rows that change owner
are the `.row-gap-*` departures, from `row` to `row-gap`. The forms rows keep the Component cells
they carry today. The `.btn-group-vertical` and `.btn-close-white` rows the analyst named do not
move. `.form-switch` with `padding-left` writes no row, because `2.5em` equals the recorded value.

The same probe ran after the landing, with the shipped list de-duplicated:

- 1069 departures and 161 additions, which is the earlier total plus the 9 `col` rows and the 2
  `form` rows.
- The membership-against-tiered list is empty.
- The landed ledger against the tiered prediction is empty, outside the label partial's own rows.

## Diff summary

`git diff --stat`, taken after the last edit:
`guides/veneer.md | 974`, `src/styles/index.scss | 1`, `tests/conformance.test.ts | 34`,
`tests/setupServer.test.ts | 121`, `tests/setupServer.ts | 78`, `tests/setupStyles.test.ts | 114`,
`tests/setupStyles.ts | 221`, `tests/src/styles/components/form-floating.test.ts | 30`.
The totals are 985 insertions and 588 deletions. The untracked files are
`src/styles/components/_form-label.scss` (41 lines), `tests/src/styles/components/form-label.test.ts`
(164 lines), and `tmp/units/bfl-ladder-probe.test.ts`, which git ignores.

- **`src/styles/components/_form-label.scss` (created).**
  - It declares a local `$sizes` list, large then small.
  - Inside `@layer components` it writes `.form-label`, `.form-text`, `.col-form-label`, and one
    `@each` loop for `-lg` and `-sm`, with ruling D's bindings.
  - A comment says the horizontal label reads the tokens the control's own inset and type read.
  - It uses no `@use`, because the partial includes no mixin.
- **`src/styles/index.scss`.** `@use 'components/form-label';` sits directly before
  `components/form-control`.
- **`tests/setupServer.ts`.**
  - `matchSelectorKey(classes, keys)` is exported. It composes `matchShippedKey` over a selector's
    classes and returns the longest match.
  - `attributeSelector` answers in tiers: the exact class, then `matchSelectorKey` over the
    shipped recorders, then recording order. Its no-recorder fallback is `matchSelectorKey` over
    the shipped keys.
  - The `attributeSelector` TSDoc states the tiered order.
  - The frozen `FORM_PARTIALS` record is added.
  - Both `@param blocks` bare tokens carry their noun.
- **`tests/setupServer.test.ts`.**
  - The plant is rewritten as one inline inventory that pins each tier.
  - A `matchSelectorKey` case is added.
  - The export list gains `FORM_PARTIALS` and `matchSelectorKey`, and `FORM_PARTIALS` is held frozen.
  - The `readCompatibility` set gains `form`.
- **`tests/conformance.test.ts`.**
  - `listed` gains `'form'` in sort position.
  - The barrel-order case maps the release list through `FORM_PARTIALS`, removes the repeat, and
    asserts the barrel's forms subsequence equals that list. It drops `arrayContaining` and the
    release filter.
  - The case is retitled "loads every forms partial in the release order, validation last".
- **`tests/setupStyles.ts`.**
  - `FormLabelCase`, the frozen `FORM_LABEL_CASES`, and `FORM_LABEL_MARKUP` are added.
  - `FormFloatingCase` (`selector`, `rendered`, per-property `reads`) is added, and
    `FORM_FLOATING_CASES` is retyped and frozen with per-property maps.
  - The bare `findRule` token carries its noun.
- **`tests/setupStyles.test.ts`.**
  - The export list gains `FORM_LABEL_CASES` and `FORM_LABEL_MARKUP`.
  - A `form label case table` describe holds the Node binding and a markup case.
  - The floating Node case uses the per-property equality through `collectDeclarationReads` and
    `renderRuleKey`, and no inline `matchAll(/var\(` is left.
- **`tests/src/styles/components/form-floating.test.ts`.** The components-layer case keeps its
  layer reading, drops the joined-string `reads` half, and is retitled "authors every case selector
  in the components layer".
- **`tests/src/styles/components/form-label.test.ts` (created).** The browser proofs for
  criterion 6.
- **`guides/veneer.md`.**
  - § Files: the `_form-label.scss` row, before the `_form-control.scss` row.
  - `### Form label classes`: the opening, behaviour, departure, closing, and proof paragraphs.
  - The forms `###` sections move into release order after Placeholder: Form label, Form control,
    Form select, Form check, Form range, Form floating, Input group, Validation. Validation moves
    out of its place before Pagination.
  - § Deferred selectors: the three `.col-form-label*` rows are deleted.
  - § Compatibility gains the `form` selector row, the `form` variable row, and the `col` label
    row.
  - § Departures:
    - `#### col` sits between `#### btn` and `#### container`.
    - `#### row-gap` follows `#### row` and holds the moved rows.
    - The pooled `#### form-check` table is split at its position into `#### form`,
      `#### form-check`, `#### form-control`, `#### form-floating`, `#### form-select`,
      `#### input-group`, `#### invalid-feedback`, `#### invalid-tooltip`, `#### valid-feedback`,
      and `#### valid-tooltip`, in key sort order.
  - The style-proof paragraph links `form-label.test.ts`.
  - § Showcase carries the `bfw` sentence.
  - § Tests is unchanged.

## Criteria

Every command ran from `/home/user/veneer-bfl` with the brief's `PATH` export.

1. **Ladder measured first.** `npm run test:probe`: `Tests 1 passed (1)` before any edit. The
   measurement is in § Ladder measurement.
2. **Format, lint, and type checks.**
   - The scoped check `npx oxfmt --config .oxfmtrc.json --check` over the owned files and the
     retained probe: "All matched files use the correct format", exit 0.
   - The same check over `_form-label.scss`: exit 0.
   - `npm run format:check`: exit 0. `npm run lint:check`: exit 0. `npm run check`: exit 0.
3. **The ladder.** `matchSelectorKey` is exported, and `attributeSelector` and the fallback route
   through it. The plant pins `.form-control-sm` → `form-control`,
   `.form-switch .form-check-input` → `form-check`, `.form-control-color.is-valid` → `is-valid`,
   `.row-gap-0` → `row-gap`, and `textarea:focus` → `form`. It also keeps
   `.form-control:focus` → `form-control`, and `form` when `form` is the only shipped recorder.
   The failing-first run and the mutations are in the following sections.
4. **The partial and the barrel.**
   - `npm run build:src`: exit 0.
   - A PostCSS walk of `dist/src/styles/index.css` reads `.form-label`, `.form-text`,
     `.col-form-label`, `.col-form-label-lg`, and `.col-form-label-sm`, each `-> components`.
   - The built rules are `.form-label{margin-bottom:var(--vn-space-4)}`,
     `.form-text{margin-top:var(--vn-space-2);color:var(--bs-secondary-color);font-size:.875em}`,
     and `.col-form-label{padding-top:calc(var(--vn-space-3) + var(--bs-border-width));…;font-size:inherit;line-height:var(--vn-line-body);margin-bottom:0}`.
     The `-lg` and `-sm` rules read `--vn-space-4` with `--vn-size-5` and `--vn-space-2` with
     `--vn-size-2`.
5. **The case tables.** `npm run test:setup`: `Tests 250 passed (250)`, exit 0.
6. **The browser proofs.** `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/form-label.test.ts tests/src/styles/components/form-floating.test.ts`:
   `Test Files 2 passed (2)`, `Tests 27 passed (27)`.
7. **Conformance.** `npm run test:conformance`: `Tests 21 passed (21)`, exit 0. This covers the
   ledger equalities, the deferral scan, compatibility presence, the `listed` equality, and the
   barrel order.
8. **The guide.** `npm run test:guides`: `Tests 18 passed (18)`, exit 0. The moved blocks are
   byte-identical: a script compared each moved section of `git show HEAD:guides/veneer.md` with
   the worktree copy and printed `True` for Form control, Form select, Form check, Form range, Form
   floating, Input group, and Validation.
9. **The gate suites.** `npm run test:setup` 250 passed. `npm run test:conformance` 21 passed.
   `npm run test:guides` 18 passed. `npm run test:policy` 109 passed and 1 skipped: the vendored
   case "registers every substitution-table term as either matched or judged", which this unit
   did not touch. Each exits 0.
10. **Bare tokens.** Both `@param blocks` lines read "as the {@link readCascadeBlocks} helper reads
    them". The `FormRangeCase` remarks read "so the `findRule` helper reaches".

Observations, not criteria:

- `npm run test:src:styles` exits 0: `Test Files 76 passed (76)`, `Tests 756 passed (756)`.
- `npm test` and the journey were not run.

## Failing-first evidence

The plant was edited before the ladder changed, and the plant is the proof of the ladder defect.

- Command:
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts -t "attributes a selector two shipped keys"`
- Before the ladder edit: `Tests 1 failed | 95 skipped (96)`. The diff read `.form-control-sm`
  `form`, `.form-switch .form-check-input` `form`, and `.row-gap-0` `row`.
- After the ladder edit, the same command: `Tests 1 passed | 95 skipped (96)`.

## Mutation evidence

The mutation script is `scratchpad/bfl/mutate.py` in the Orchestrator's session scratchpad. Each
mutation was applied to the owned file and run through the named command, and then the file's own
prior bytes were written back. `git status` after the run showed only this unit's changes. Each
mutation reddened these cases:

- **Drop the prefix step** from `attributeSelector` (setup): "attributes a selector two shipped
  keys record to the more specific key".
- **Put the prefix tier before the exact tier** (setup): the same plant.
- **Drop the longest-first sort** in `matchSelectorKey` (setup): the plant, and "selects the
  longest key any class of a selector equals or opens with".
- **Move `--bs-border-width` from `border` onto `padding`** in the `.form-floating > label` row
  (setup): "binds every floating selector to the inventory, to its condition, and each declaration
  to the tokens its row names for that property".
- **Claim `form` for the `.col-form-label` row** (setup): "binds every label selector to the one
  inventory key recording it and each declaration to the tokens its row names for that property".
- **Write the label margin as `0.5rem`**: "spaces a label above its control and help text under it
  from the space scale".
- **Write the help-text margin as `0.25rem`**: the same case.
- **Write the help-text size as `0.875rem`**: "sets help text at 0.875 of the type around it rather
  than of the root".
- **Write the help-text color as `var(--vn-text-secondary)`**: "repaints help text when a wrapper
  retunes the secondary text color, and follows each mode".
- **Write the horizontal inset as a literal `calc(0.375rem + var(--bs-border-width))`**: "levels a
  horizontal label's content box with its control's at each size, at a doubled density, and under
  a border-width and a line-height retune".
- **Drop the border term from the horizontal inset**: the level case, and "clears a legend's own
  margin and type when it labels a horizontal group".
- **Write the border term as a literal `1px`**: the level case.
- **Write the line height as a literal `1.5`**: the level case.
- **Swap large and small in `$sizes`**: the level case, and "reads the large and small type steps
  on the sized labels".
- **Drop `margin-bottom: 0`**: the legend case.
- **Drop `font-size: inherit`**: the legend case.
- **Write the rules in `@layer utilities`**: "authors every label case selector in the components
  layer".
- **Load `form-label` after `form-control`** (conformance): "loads every forms partial in the
  release order, validation last".

After the mutation run the styles were rebuilt with `npm run build:src`, which exited 0.

## Unknowns answered

- **Rows the tiered ladder moves.** § Ladder measurement lists them. Only the `row-gap` table was
  created outside the forms family. `btn-group` and `btn-close` gain no rows.
- **A `condition` field on `FormFloatingCase`.** The field is not needed. The only floating key
  under an at-rule is `.form-floating > label @media (prefers-reduced-motion: reduce)`, and
  `collectDeclarationReads` reads it as `{}`. No selector reads a variable only under a condition.
  The Node case still holds the written key set, twin included, equal to the recorded one.

## Decisions within scope

- **Placement of the forms block.** The block sits where the pooled forms sections sat, after
  Placeholder. Validation moved down from its place before Pagination.
- **The § Showcase sentence.** The guide at `a56ca7e` carries no sentence that names the forms
  regions after the Spinner region, so there was nothing to replace. The `bfw` sentence is added as
  its own paragraph, directly after the Placeholder, Progress, and Spinner paragraph.
- **The `FORM_LABEL_MARKUP` contents.**
  - A `20px` parent wraps the stacked label, email control, and help text. The control names the
    help text through `aria-describedby`.
  - A `.row` pairs a `col-4 col-form-label` with a `col-8` control at each size.
  - A `fieldset.row` has a `legend.col-4.col-form-label` beside a text control with its own
    `aria-label`.
  - A bare `fieldset` and `legend` pair is the reading that shows the elements-layer values the
    class clears.
- **The level case.** It compares font size per row: a sized label against its control, and the
  unsized label against its row. It also compares the line-height ratio. The next finding gives
  the reason.

## Findings and weakest claims

- **An unsized horizontal label is a type step under its control.** This is behaviour, not a
  defect in the ruling. Veneer's body is `--bs-body-font-size: var(--vn-size-2)`, which is 14px.
  `.col-form-label` keeps the release's `font-size: inherit` (ruling D), so an unsized horizontal
  label reads 14px beside an unsized control's 16px. The content boxes still open level. In the
  release the body is `1rem`, so the release's unsized label matches its control. The guide states
  this limit in `### Form label classes`. Rule whether `inherit` stays, or whether the unsized
  label must take the control's `--vn-size-3`.
- **A stale sentence in a moved section.** `### Form select classes` says "The component partial
  loads after the validation partial and before the range partial", and D35 made validation load
  last. The sentence stayed byte-identical because the moved blocks must not change. It needs a
  carrier.
- **Weakest claim: the prose "opens level".** The level case reads content-box tops within 0.5px.
  It does not read glyph baselines, and the guide and the partial comment say "line box opens
  level", which is the claim the case reads.
- **Weakest claim: the stepped retunes.** The level case applies its retunes on top of each other
  and reads every stage. Each retune is shown to reach the rows only on the base control at the
  final stage, through the doubled padding, the `4px` border, and the doubled line height.
- **A standing condition for the barrel case.** The case reads `_forms.scss` from the installed
  release, so a release that adds a forms partial reddens it until `FORM_PARTIALS` or the barrel
  follows.

## Shared-file patches

None. `ROADMAP.md` is untouched. The Orchestrator strikes the `form` key carrier row and the R6
carrier row at landing.

## Deviation state

No stop. The files written outside the Owned list are these, and all sit in git-ignored `tmp/` or
the session scratchpad:

- A second throwaway probe, `tmp/probe/bfl-floating-reads.test.ts`, answered the `condition`
  unknown and the per-key reads. It is deleted.
- The probe outputs were moved to the session scratchpad:
  `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfl/`, which holds
  `bfl-ladder-probe-before.txt`, `bfl-ladder-probe-after.txt`, `bfl-reads.txt`, `mutations.txt`,
  `mutate.py`, and the guide edit scripts `guide_a.py`, `guide_b.py`, and `guide_c.py`.
- When the retained probe runs, it writes `tmp/units/bfl-ladder-probe.txt`.
