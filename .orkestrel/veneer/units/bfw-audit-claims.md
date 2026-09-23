# B-FORMS-LABEL-SHOW (`bfw`) — audit claims

## Subject

The B-FORMS-LABEL-SHOW writes in `/home/user/veneer-bfw` (a worktree detached at `dd855e9`, the
session branch after B-FORMS-CLOSE-SPECIMENS landed, holding rounds 1 and 2 uncommitted), written
by `opus` on Opus 5.5 from `/home/user/veneer-bfw/tmp/units/bfw-brief.md` and `bfw-brief-2.md`
(retained as `b-forms-label-show-brief.md` and `-2.md`) under the label design verdict
`/home/user/scaffold/.orkestrel/veneer/b-forms-label-design-verdict.md` (rulings E and G) and
D35: `FormLabelSection` with the stacked, horizontal, horizontal large, horizontal small, and
legend specimens, registered in `Showcase.ts`, `index.ts`, the showcase and index proofs,
`CaptureSubject`, and `CASCADE_KEYS` as resting frames, `FormControlSection` ahead of
`FormFloatingSection`, and the registry case widened to a class-led selector qualified by an
element. Round 1 stopped on that registry case; round 2 carried the writer's recommended patch
under the Orchestrator's grant. **Review evidence.**
`/home/user/scaffold/.orkestrel/veneer/units/bfw.diff` (the whole diff against `dd855e9`, the new
files rendered through intent-to-add), `bfw-status.txt`, the reports
`b-forms-label-show-report.md` (round 1: the column-split readings, the failing-first and mutation
runs, the keyboard-walk changes) and `-2.md`, and the briefs. The label partial `_form-label.scss`
is B-FORMS-LABEL-CASCADE's and is absent here, so the journey's matrix census case fails on the
five undeclared label classes in every variant; the Orchestrator's integrated run settles it.

## What the round decides

Whether B-FORMS-LABEL-SHOW lands on the session branch as one commit after B-FORMS-CLOSE-FORCED
lands, with the § Showcase sentence and the § Tests stem rows it returns handed to
B-FORMS-LABEL-CASCADE for the guide.

## Already established — do not re-run

The label design verdict's rulings (E fixes the specimens, the region, the copy, the capture rows,
and the Control-before-Floating order); the objective lane's sandbox runs no Vitest project and no
browser (`npm run check` and `node -e` that write nothing are allowed).

## Unknowns

- Whether the `.container-fluid` wrapper on the horizontal and legend rows (the writer's choice
  to keep the row's negative gutter inside the 390-wide page, as the Layout specimens do) is the
  right frame for a forms specimen, or a departure from ruling E to record: the reviewer rules.
- Whether the range journey's traversal start (the legend's date control focused, Tab pressed
  twice, focus asserted still on that control, then the walk) is a sound way past the date
  control's fields, given the installed walk stops at the first element reached twice: the lanes
  rule on the assertions.

## The threshold

`CONFIRMED` requires naming the attack that failed; a claim about a proof names the mutation and
says whether the assertions distinguish it. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The delta is the briefs.** The diff against `dd855e9` touches only
   `app/browser/sections/FormLabelSection.ts` (new), `app/browser/constants.ts` (the new
   `FORM_LABEL_COPY` and `FORM_LABEL_SPECIMENS`), `app/browser/Showcase.ts`, `app/browser/index.ts`,
   `tests/app/browser/sections/FormLabelSection.test.ts` (new), `tests/app/browser/Showcase.test.ts`,
   `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`,
   and `tests/setup.test.ts` (the one check and its comment); the status lists those and nothing
   else; `src/**`, `guides/**`, `tests/setupStyles.ts`, `tests/src/**`, and `tests/fixtures/**` are
   unchanged.
2. **The section and specimens are ruling E's.** `FormLabelSection extends SpecimenSection`, fed
   by `FORM_LABEL_COPY` (region `Form label`; the brief's paragraph verbatim) and
   `FORM_LABEL_SPECIMENS` in the order stacked, horizontal, horizontal large, horizontal small,
   legend, each shaped as the brief's criterion 2 states (the stacked `.form-label` for an email
   control with a `.form-text` the control names through `aria-describedby`; a `.row` with a
   `col-* col-form-label` label beside a `.col-*` control; the two sizes derived from one list with
   `.map`, the label carrying the size class and the control `.form-control-lg` or
   `.form-control-sm`; a `fieldset.row` whose `legend.col-* col-form-label` labels a date control
   with its own `aria-label`); breakpoint-free columns (`col-5`/`col-7`); ids prefixed
   `form-label-`; unique control names; no inline style; the doc block in the sibling sections'
   voice.
3. **Registration and order.** `Showcase.ts` constructs `FormLabelSection` after
   `FormControlSection` and before `FormRangeSection`, with `FormControlSection` ahead of
   `FormFloatingSection` (D35); `index.ts` re-exports the module; `Showcase.test.ts`,
   `index.test.ts`, and `integration.test.ts` carry the region, the export, and the specimen table
   in the new order. Mutation: reverting the Control/Floating order reddens the showcase proof.
4. **The capture rows and the registry check.** `CaptureSubject` carries the five names in
   alphabetical order; `CASCADE_KEYS` ends with `form-label-stacked` (`.form-label`,
   `margin-bottom`), `form-label-horizontal` (`.col-form-label`, `padding-top`),
   `form-label-horizontal-large` (`.col-form-label-lg`, `font-size`), `form-label-horizontal-small`
   (`.col-form-label-sm`, `font-size`), and `form-label-legend` (`legend.col-form-label`,
   `margin-bottom`); no driven scenario; the registry check reads `!/^[a-z]*\./u.test(key.selector)`
   with a comment saying a selector leads with its class, alone or qualified by its element, and a
   bare element selector is refused. Mutation: the legend row's selector as `legend` reddens the
   check (the writer's run); the lanes say whether the check distinguishes it.
5. **The section proof.** `FormLabelSection.test.ts` reads the region name, the paragraph against
   the constant, the specimen order and markup, each control's `readName` against its label text,
   the legend-labelled control's own name, `readStates` including `described` on the stacked
   control with its `aria-describedby` resolving to the `.form-text` element, the legend as the
   fieldset's first child, and the frozen constants; a teardown case copies the siblings'.
   Mutations (the writer's runs): a dropped `for` or a mismatched id reads an empty name; an
   `aria-describedby` naming a missing id resolves to nothing; a reordered list reddens the order
   assertion. The lanes say whether each assertion distinguishes its mutation.
6. **The journey's traversal starts.** `integration.test.ts` starts the floating keyboard walk
   from `Form control readonly` (the date control now precedes the floating field) and the range
   walk from the legend's date control with two Tab presses asserted to leave focus on that
   control before the walk; every journey case other than the matrix census passes in every
   variant (the writer's run; the Orchestrator's integrated run is authoritative).
7. **The returned guide text.** The § Showcase sentence and the § Tests stem rows the round-1
   report returns follow the rendered order (Form control before Form floating, per D35), name the
   regions and stems truly, and follow `writing.md`.
8. **Law and scope.** Across the diff: no `any`, `as` (other than `as const`), `!`, or
   suppression; no nested function beyond a callback passed directly; no helper whose job an
   installed `@orkestrel/test` export does; every changed comment and doc block follows `writing.md`
   (no count, no position name, no banned term, a code token followed by a noun with a CSS token its
   own noun); the off-limits files untouched. Run `npm run check` from the worktree and report its
   exit code as evidence here (the objective lane).
