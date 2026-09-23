# B-FORMS-GROUP — audit claims

## Subject

The B-FORMS-GROUP unit's uncommitted writes in `/home/user/veneer-bfg` (detached at `2c10329`,
Veneer `main` with the passive family, VALIDATION, and RANGE landed), written by `opus` from
`/home/user/veneer-bfg/tmp/units/b-forms-group-brief.md` and finished under its successor
`b-forms-group-brief-2.md` (which added the dispatch template's rows and changed no obligation),
under the design `/home/user/veneer-bfg/tmp/units/b-forms-design-verdict.md` (rulings 1 to 3, 5 to
11; ruling 8 names the deferral rows this unit retires and adds). One round so far: this one.
**Review evidence.** `/home/user/scaffold/.orkestrel/veneer/units/bfg.diff` (the whole diff against `2c10329`,
untracked files as additions), `bfg-status.txt`, the report `/home/user/scaffold/.orkestrel/veneer/units/bfg-report.md`;
the frames sit under `/home/user/veneer-bfg/tmp/capture/states/` (the `input-group*` files) and are
the primary evidence for every rendered claim, the source corroboration.

## What the round decides

Whether B-FORMS-GROUP lands on Veneer `main` as the `input-group`, `valid-feedback`, `valid-tooltip`,
`invalid-feedback`, and `invalid-tooltip` baseline, with the Orchestrator's integration edits (the
shipped-key Set literal; the `validation.test.ts` assertion patch; the two guide patches outside the
unit's anchors), and whether the writer's deviations stand: the barrel line before
`@use 'components/validation'` (the release's order, ruling 3) rather than after `form-range`;
`.btn-toolbar .input-group` appended to `BUTTON_GROUP_SELECTORS`; no `@use '../tokens'` line (D18);
the construction appended after `CloseSection`; no tooltip specimen rendered (re-carried).

## Already established — do not re-run

Verified by the Orchestrator directly: the worktree base `2c10329`; the five `Forms` deferral rows
at `guides/veneer.md` lines 979 to 983 of the baseline; `_validation.scss` lines 118 to 123 emit
the input-group validation stacking rules; `_button-group.scss` emits the `.btn-toolbar` rules and
`BUTTON_GROUP_SELECTORS` in `tests/setupStyles.ts` lists the shipped toolbar selectors; the barrel
at the baseline lists `validation` at line 55 and `form-range` at line 61; `scanForbiddenSource`
reads import specifiers only.

## Unknowns

- Whether any partial that loads after `_input-group.scss` in the barrel writes a property on the
  same element classes at equal specificity (the writer checked by reading, not by running):
  report a conflict if one exists, with the selector pair and the property.
- Whether every rendered claim has a frame the portfolio shows: rule `NOT-EVIDENCED` where it does
  not, naming the missing capture.

## The threshold

A finding is worth more than a clean pass: a defect that lands on `main` here reaches FLOATING,
CONTROL, and SELECT, which build on this partial, and every consumer of the next release.
`CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is
`UNRESOLVED`, not `CONFIRMED`, with what would settle it; do not hedge toward an imagined consensus.

## Numbered falsifiable claims

1. **The partial emits the key as recorded.** `src/styles/components/_input-group.scss` opens
   `@layer components` (no `@use '../tokens'`, because it reads no tokens-module Sass API, D18) and
   emits every selector the inventory records under `input-group` except the two
   `.dropdown-toggle:nth-last-child` rules (deferred under `Disclosure`, ruling 8): the group's
   flex layout, the child `flex` and `min-width` rules, the `:focus` and `:focus-within` `z-index`
   lifts, the `:not(:first-child)` overlap margin `calc(-1 * var(--bs-border-width))`,
   `.input-group-text` (padding `var(--vn-space-3) var(--vn-space-6)`, `font-size` `var(--vn-size-3)`,
   `font-weight` `var(--vn-weight-body)`, `line-height` `var(--vn-line-body)`, the colour,
   background, border, and radius byte for byte), the `-lg` and `-sm` children (padding and
   `font-size` tokenized, the radii byte for byte, the sized select `padding-right`
   `var(--vn-space-24)`), the end-radius and start-radius rules including the `.form-floating`
   inner-field forms, the `has-validation` `nth-last-child(n+3)` counting, the sibling rule with
   its five `:not()` exclusions, `.input-group .btn` and `.btn:focus`, and `.btn-toolbar .input-group`;
   the `z-index` steps, `flex: 1 1 auto`, `width: 1%`, `min-width: 0`, and the zero corners are
   literal; nothing `_validation.scss` already emits is duplicated; the built cascade holds every
   recorded selector but the two deferred ones. Rule by compiling the partial (`npx sass`) and
   comparing against the release's declarations, and by re-taking the report's unique-selector
   lookup over `dist/src/styles/index.css`.
2. **The barrel order is the release's.** `@use 'components/input-group';` sits directly before
   `@use 'components/validation';` (deviation D1): at the brief's anchor after `form-range`,
   `.input-group-lg > .form-control` would load after `.form-control.is-invalid` at equal specificity
   and a failing control in a sized group would lose the `padding-right` its validation mark needs
   (the writer measured `16` against `42` at that anchor and `19 passed` at the release's order);
   ruling 3 fixes the barrel to Bootstrap's `_forms.scss` order (input-group before validation).
   Rule the measurement by reading both partials' selectors and, where the sandbox allows, by
   compiling the barrel in both orders and reading the cascade.
3. **The proof reads what it claims** (`tests/src/styles/components/input-group.test.ts`, 19 cases:
   L1 to L3, O1, O2, C1 to C3, A1 to A3, S1, S2, K1 to K3, and the setup cases N1 to N3 in
   `tests/setupStyles.test.ts`). Each row of the report's coverage matrix names a case that reads the
   selector's treatment; the mutation plants each redden the cases the report's table names
   and nothing else, with the unplanted partial as the negative control (`19 passed`, `86 passed`),
   and `mutate3.py` re-ran the corner mutations after the C2 and C3 rework; the corner cases read
   against `INPUT_GROUP_ROUNDING` (a `@layer elements` radius fixture standing in for the CONTROL
   and SELECT radii, held to the same element's radius outside a group rather than a literal); the
   floating cases read an unstyled wrapper; K3 reads `FOCUS_RING.light` alone. Rule whether the
   assertions distinguish each plant and whether the N2 written-count reading (each rule written as
   often as recorded, each declaration reading the `var()` names its row lists) binds.
4. **The showcase and the registry.** `InputGroupSection.ts` renders the region `Input group` with
   the specimens `Input group plain`, `Input group addons`, `Input group button`, `Input group
   large`, `Input group small`, and `Input group validation` (the invalid feedback rendered; no
   tooltip, deviation D6); `CASCADE_KEYS` gains the six resting rows as element frames over the
   lifted specimen; `INPUT_GROUP_KEYS` carries `input-group-plain-focus` (a page frame by keyboard
   traversal, the control lifted over its addon, read again after the shot); `CaptureSubject` gains
   the names; the construction is appended after `CloseSection` (landing order, deviation D7) with
   the import in sorted position; the four capture runs wrote every `input-group*` frame and
   artifact at every variant; `input-group-large--light-1280` and
   `input-group-validation--dark-390` show their groups.
5. **The accounting.** The five keys sit in `listed` sorted; a § Compatibility selector row per key;
   the departure tables `#### \`input-group\``, `valid-feedback`, `valid-tooltip`, `invalid-feedback`,
   `invalid-tooltip` follow `#### \`btn-close\`` with the `tokenized` rows the report lists, and the
   sized group buttons' rows are appended to `#### \`btn\`` because the ladder attributes
   `.input-group-lg > .btn` to `btn` (the selector's own class); the sibling rule attributes to
   `invalid-feedback` (the longest shipped key it names) and records no departure; the five `Forms`
   deferral rows are struck and the two `Disclosure` rows added in the same change;
   `.btn-toolbar .input-group` is appended to `BUTTON_GROUP_SELECTORS` (deviation D2) because the
   struck row left it in neither the shipped list nor the withheld set. Rule that every attribution
   follows the ladder VALIDATION landed and that no addition row is owed.
6. **The guide.** `### Input group classes` sits directly after `### Form range classes` and states
   the evidence it has and its limits (the deferred dropdown rules named, the barrel order stated);
   the § Files row and the § Tests link exist; the prose follows `.claude/rules/writing.md`; the
   `### Button toolbar classes` sentence and the `btn-toolbar` compatibility row still call the
   combinator withheld (deviation D4), which the Orchestrator's guide patch at landing corrects
   (rule that the patch is exact and complete).
7. **The VALIDATION assertion the release's lift changes** (deviation D3).
   `tests/src/styles/components/validation.test.ts` › `stacks a failing input-group child above a
   passing one` expects a focused `.is-valid` child at `z-index: auto`; with `.input-group >
   .form-control:focus` shipped, the release gives `5`; the writer's patch changes that expectation
   to `'5'` and its comment, and reasons (not runs) that a rule dropping the `:not(:focus)` guard
   would give `3` and still be caught. Rule the release's value by reading the compiled release
   stylesheet, and rule whether the patched assertion still distinguishes the guard-drop mutation.
8. **The law holds.** Across the diff: no `any`, `as`, `!`, or suppression; no nested function
   beyond a callback passed or returned directly; readonly interface members; `{QUALIFIER}_{NOUN}`
   constants (`INPUT_GROUP_CASES`, `INPUT_GROUP_DEFERRED`, `INPUT_GROUP_MARKUP`,
   `INPUT_GROUP_ROUNDING`, `INPUT_GROUP_KEYS`, `INPUT_GROUP_COPY`, `INPUT_GROUP_SPECIMENS`), frozen;
   no helper whose job an installed `@orkestrel/test` export does; no mock or fake; the partial
   writes no literal colour, repeats no per-variant block that one `@each` over a shared list would
   drive (rule on the `-lg` and `-sm` blocks), and declares no `transition`.
9. **Scope is honest.** The status lists the owned files and the shared files at their anchors
   (with the `BUTTON_GROUP_SELECTORS` append and the barrel line's placement as recorded
   deviations) and nothing else; the deletions in the guide are the struck deferral rows and
   `oxfmt` re-padding; `tmp/probe/` is absent; `src/styles/_tokens.scss`, `_theme.scss`,
   `_validation.scss`, `tests/setupServer.ts`, `tests/setupServer.test.ts`,
   `tests/src/styles/components/validation.test.ts`, and the vendored files are untouched.
10. **Gates.** `format:check`, `lint:check`, `check`, `build:src` exit 0; `test:src:styles` `1 failed
    | 652 passed` (the VALIDATION case of claim 7 alone; the owned proof 19 of 19); `test:setup` red
    on the shipped-key Set literal alone; `test:app` `55 passed`; `test:conformance` `17 passed`;
    `test:guides` `18 passed`; `test:policy` `109 passed | 1 skipped`; the four capture journeys `33
    passed` each; `test:journey` `132 passed` (before proof-only edits that touch no served file).
    UNRESOLVED until the Orchestrator's independent chain at the landing; rule `npm run check`
    yourself where the sandbox allows it.
