# Audit claims — TOAST (`to`), round 1

Subject: `to.diff` (the worktree `/home/user/veneer-to` against `2a3f223`: each untracked owned file as
`git diff --no-index /dev/null <path>`) and `to-status.txt`, the shared-file patch `to-shared.patch`
(one unified diff against `2a3f223`), the unit's report `b-modal-to-report.md`, and its retained
instruments and gate logs under `to-instruments/`, against the effective brief `b-modal-to-brief.md`,
the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (M1 to M20,
§ Family record), the wave-2 terrain `b-modal-w2-terrain-report.md`, and the first terrain
`b-modal-terrain-report.md` (§ A the `toast` oracle surface, § B the Toast plugin obligations). The
unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN
with `file:line` evidence, and before confirming a claim about a proof names the mutation that would
make the proof fail and whether its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the brief's
fixed rulings stand (the `--bs-toast-zindex` binding on `.toast` and `.toast-container`, the shared
Alias cell joined at integration, the `toasts` stem, the barrel and showcase orders, the plugin row's
shape); the paragraph under the stacking table stays as the base has it, because MODAL rewrites it;
the validation copy was deleted before the report, as the brief requires, so a lane rules the gate
and mutation claims from the code's assertions, the retained scripts, and the retained gate logs, and
names which it read.

1. **Scope and delta.** `to-status.txt` lists exactly the four owned paths
   (`src/styles/components/_toast.scss`, `tests/src/styles/components/toast.test.ts`,
   `app/browser/sections/ToastSection.ts`, `tests/app/browser/sections/ToastSection.test.ts`) and
   nothing else; `to.diff` carries those files and no other; `to-shared.patch` touches only files the
   brief lists as Shared, applies with `git apply --check` to a fresh extract of `2a3f223`, adds no
   line to a vendored file, an off-limits file, a sibling unit's file, `src/browser/**`,
   `src/core/**`, `tests/fixtures/**`, `package.json`, or `README.md`, and leaves the MODAL,
   OFFCANVAS, and TIP entries in `CLOSE_DEFERRED`, the stacking table, the barrel, and the showcase
   as the base has them.
2. **The partial against the oracle.** `_toast.scss` writes, in the components layer, exactly the
   selectors the inventory records under `toast` (`.toast`, `.toast.showing`, `.toast:not(.show)`,
   `.toast-container`, `.toast-container > :not(:last-child)`, `.toast-header`,
   `.toast-header .btn-close`, `.toast-body`) with the recorded declarations, departing only where a
   `#### toast` row records the departure; `--bs-toast-zindex` reads `var(--vn-stack-toast)` on both
   `.toast` and `.toast-container`; `--bs-toast-spacing` reads `var(--vn-gutter-x)` and that
   derivation matches the release's `$toast-spacing` source; no literal colour, black, or white is
   written (M1 ruling 5); no `!important`, and no transition outside the `transition` mixin.
3. **The style proof distinguishes its mutations.** Each row of the report's R19 matrix names a case
   in `tests/src/styles/components/toast.test.ts` whose assertions distinguish the named mutation
   from the passing case: the literal `1090` against the rung binding (a wrapper retune must move the
   computed `z-index`), the slot dropped from `.toast`, the `:not(.show)` and `.showing` rules
   dropped, the `:not(:last-child)` qualifier dropped, the header corners at the full radius, the
   combinator written as `.toast .btn-close`, a literal `--bs-toast-bg`, the body padding reordered,
   and the gap written as `var(--vn-space-12)`; the failing-first run (the barrel `@use` removed)
   reds every case. A lane names, per row, whether the assertion distinguishes the mutation.
4. **The close combinator's move.** The patch moves `.toast-header .btn-close` from `CLOSE_DEFERRED`
   to `CLOSE_SELECTORS` in `tests/setupStyles.ts`, deletes its `Overlays` row from § Deferred
   selectors in `guides/veneer.md`, and leaves the partition case in `tests/setupStyles.test.ts`
   unchanged in shape; `tests/src/styles/components/close.test.ts` needs no edit, because its
   no-rule assertion reads the table; the geometry proof uses a close control outside the header
   that reads no margin (M6).
5. **The section and its specimens.** `ToastSection` extends `SpecimenSection` over `TOAST_COPY` and
   `TOAST_SPECIMENS`; no specimen writes an inline style; every toast carries `show`; each toast
   carries the release's accessible attribute set and each close control its `aria-label`; each
   container specimen sits inside a `.viewport` frame, placed with shipped utilities only, and the
   section states that in one sentence (M3); no specimen writes a class the built cascade at
   `2a3f223` does not ship, and the `me-auto` substitution and the missing coloured toasts are
   recorded in the TSDoc and the guide; the `showing` frame is declined with its reason recorded
   (M2); the section proof's assertions distinguish the specimen mutations the report lists.
6. **Registries and orders.** `CaptureSubject` gains the three subjects, and `CASCADE_KEYS` gains one
   resting row per specimen whose selector and property read a value the toast rules set; no
   `DRIVEN_KEYS` row is added; `listed`, the order case's `toasts: 'toast'` stem, `passiveNames`,
   and the expected order in `tests/conformance.test.ts` agree with the barrel's `@use` after
   `components/close`; the dash-proof component set in `tests/setupServer.test.ts`, the
   `Showcase.ts` construction after `AccordionSection`, the `app/browser/index.ts` row, and the
   `Showcase.test.ts` and `index.test.ts` lists agree with each other and with M14.
7. **The guide.** `guides/veneer.md` gains the `_toast.scss` § Files row, `### Toast classes`, a
   `#### toast` table whose rows equal the rows the report says the gate measured (the width rows
   recorded as `declared`), the toast entry in the popover, hint, and toast row's Alias cell, the
   `toast` selector and variable rows in § Compatibility, and a Toast `plugin` row in the landed
   Alert row's shape ending "Owner: J-ENGINE."; the plugin row's obligations match
   `node_modules/bootstrap/js/src/toast.js` at the worktree (the report records that the release
   also pauses on `mouseover` and `mouseout`); every sentence the patch adds is true of what ships.
8. **Law and report.** The owned files and the patch add no `any`, no `as` beyond a const assertion,
   no `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; every case table sits in `tests/setupStyles.ts`, is frozen, and is exported and bound in
   `tests/setupStyles.test.ts`; no new helper duplicates an installed `@orkestrel/test` or
   `@orkestrel/contract` export; the added comments, TSDoc, guide text, and the report follow the
   writing rule (no banned term, no count of a growable set, no list item named by its position,
   each code token followed by a noun, no temporal `new`, `now`, or `currently`, no cross-reference
   `above` or `below`); the report records each gate's command with its result line; a lane lists
   every count the report states as a finding outside the claims for the record.
