# Audit claims — MODAL (`md`), round 1

Subject: `md.diff` (the worktree `/home/user/veneer-md` against `2a3f223`: each untracked owned file as
`git diff --no-index /dev/null <path>`) and `md-status.txt`, the shared-file patch `md-shared.patch`
(one unified diff against `2a3f223`), the unit's report `b-modal-md-report.md`, and its retained logs
under `md-instruments/` (`md-failfirst.log.txt`, `md-mutations.log.txt`, `md-gates/`, `md-gates.txt`),
against the effective brief `b-modal-md-brief.md`, the design verdict
`/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (M1 to M20, § Family record), the
wave-2 terrain `b-modal-w2-terrain-report.md` (§ 5 MODAL), the first terrain `b-modal-terrain-report.md`,
and the mid-campaign note `w2-w3-note-1.md`. The unit was written by `opus` on Opus 5.5. Each claim is
falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim
about a proof names the mutation that would make the proof fail and whether its assertions distinguish
that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the brief's
fixed rulings stand (the dialog rung bindings, the `overlay-backdrop` block verbatim per M11, the
barrel and showcase orders, the stacking paragraph's sentence, the plugin row's shape); the fixture
class in `tests/src/styles/fixtures/mixins.scss` is a file the brief's grant of the mixin case makes
necessary, so the Orchestrator grants it retroactively as the brief's scope gap, not the unit's
deviation; the re-padded § Compatibility table is formatter output and integrates by re-running the
formatter over the landed rows; the validation copy was deleted before the report, as the brief
requires, so a lane rules the gate and mutation claims from the code's assertions and the retained
logs, and names which it read; the `test:setup` timeout the report records under load is the
Orchestrator's reading.

1. **Scope and delta.** `md-status.txt` lists exactly the four owned paths
   (`src/styles/components/_modal.scss`, `tests/src/styles/components/modal.test.ts`,
   `app/browser/sections/ModalSection.ts`, `tests/app/browser/sections/ModalSection.test.ts`) and
   nothing else; `md.diff` carries those files and no other; `md-shared.patch` touches only files the
   brief lists as Shared plus the granted fixture file, applies with `git apply --check` to a fresh
   extract of `2a3f223`, adds no line to a vendored file, an off-limits file, a sibling unit's file,
   `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, or `README.md`, and leaves the
   OFFCANVAS, TIP, and TOAST entries in `CLOSE_DEFERRED`, the barrel, and the showcase as the base has
   them; apart from the formatter's re-padding, the § Compatibility hunks change only modal rows.
2. **The partial against the oracle.** `_modal.scss` writes, in the components layer, exactly the
   selectors the inventory records under `modal` (the report's list by condition) with the recorded
   declarations, departing only where a `#### modal` row records the departure; `.modal` reads its
   `--bs-modal-zindex` from `var(--vn-stack-dialog-base)` and `.modal-backdrop` its
   `--bs-backdrop-zindex` from `var(--vn-stack-dialog-backdrop)`; the backdrop is written through the
   `overlay-backdrop` mixin; no literal colour, black, or white is written; no `!important`; no
   transition outside the `transition` mixin; the fullscreen rule set written for the unconditioned
   `.modal-fullscreen` class and again inside the `breakpoint-down` walk is the only way the tree's
   mixins can emit both (the report's reason: `breakpoint-down` emits nothing at zero) and does not
   trip `findDuplication`, or a lane names the shape that writes it once.
3. **The proofs distinguish their mutations.** Each mutation the report's table names has a retained
   entry in `md-mutations.log.txt` or `md-failfirst.log.txt` recording its site, command, exits,
   summary, and failing cases, and the named case's assertions distinguish it from the passing case:
   the literal `1055` and `1050` against the rung bindings (a wrapper retune must move the computed
   `z-index`), the mixin's `&.show` block and one declaration dropped, a boundary shifted, the
   fullscreen ramp gated up, the centered alignment and the scrollable height dropped, the transition
   written without the mixin, the static rule dropped, the combinator written on the modal, a literal
   content colour, a density literal, and the section mutations; the failing-first run (the barrel
   `@use` removed) reds every modal case. A lane names, per mutation, whether the assertion
   distinguishes it.
4. **The mixin and the close combinator.** The `overlay-backdrop` block in `src/styles/_mixins.scss`
   equals the block the brief fixes, byte for byte, appended after the `utility-variable` mixin; its
   case in `tests/src/styles/mixins.test.ts` reads every declaration the block writes, the `fade`
   state, and the `show` state; the patch moves `.modal-header .btn-close` from `CLOSE_DEFERRED` to
   `CLOSE_SELECTORS`, deletes its `Overlays` row from § Deferred selectors, and leaves the partition
   case unchanged in shape; the header control's proof reads the header inset and a control outside
   the header reading no margin.
5. **The section and its specimens.** `ModalSection` extends `SpecimenSection` over `MODAL_COPY` and
   `MODAL_SPECIMENS`; no specimen writes an inline style (the `d-block` class stands in for the
   engine's inline `display`, and the guide says so in one sentence); the backdrop appears only in
   `Shown modal`; each dialog carries `role="dialog"` and no `aria-modal`, backed by the recorded
   accessibility-tree probe (M15); each close control carries its `aria-label`; no specimen carries
   `modal-open`; every specimen sits inside a `.viewport` frame and every content box and close
   control lies inside it at 390 and 1280; the section proof's case populations derive from the
   specimen and setup tables (note 1); no specimen writes a class the built cascade at `2a3f223` does
   not ship.
6. **Registries and orders.** `CaptureSubject` gains the specimen subjects and `CASCADE_KEYS` one
   resting row per specimen whose selector and property read a value a modal rule sets on an element
   inside its own modal, so the journey's hanging branch does not fire; no `DRIVEN_KEYS` row;
   `listed`, the order case, the dash-proof component set, the `Showcase.ts` construction after
   `AccordionSection`, the `app/browser/index.ts` row, and the `Showcase.test.ts` and `index.test.ts`
   lists agree with each other, with the barrel's `@use` after `components/close`, and with M14; the
   modal case tables sit in `tests/setupStyles.ts`, are frozen and exported, and are bound to the
   inventory by derivation in `tests/setupStyles.test.ts`.
7. **The guide.** `guides/veneer.md` gains the `_modal.scss` § Files row, `### Modal classes` in barrel
   position, a `#### modal` table whose rows equal the rows the report says the gate measured, the
   `modal` selector and variable rows and the Modal `plugin` row ending "Owner: J-ENGINE." in
   § Compatibility, the dialog and dropdown Alias cells, and the stacking paragraph as the brief
   fixes it; the plugin row's obligations match `node_modules/bootstrap/js/src/modal.js` at the
   worktree (the `Backdrop`, `FocusTrap`, and `ScrollBarHelper` utilities among them); every sentence
   the patch adds is true of what ships and states only which rule applies each value (note 1),
   claiming nothing for the declared-but-unapplied `--bs-modal-box-shadow` property.
8. **Law and report.** The owned files and the patch add no `any`, no `as` beyond a const assertion,
   no `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; no new helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export;
   the added comments, TSDoc, guide text, and the report follow the writing rule (no banned term, no
   count of a growable set, no list item named by its position, each code token followed by a noun
   outside the verbatim mixin comment, no temporal `new`, `now`, or `currently`, no cross-reference
   `above` or `below`); the report records each gate's command with its result line; a lane lists
   every count the report states as a finding outside the claims for the record.
