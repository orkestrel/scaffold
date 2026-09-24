# Audit claims — OFFCANVAS (`oc`), round 1

Subject: `oc.diff` (the worktree `/home/user/veneer-oc` against `2a3f223`: tracked changes as
`git diff 2a3f223`, each untracked owned file as `git diff --no-index /dev/null <path>`) and
`oc-status.txt`, the shared-file patch `oc-shared.patch` (one unified diff against `2a3f223`), the
unit's report `b-modal-oc-report.md`, and its retained instruments and logs under `oc-instruments/`
(`oc-mutations.log.txt`, `oc-mutate.py.txt`, `oc-gates.log.txt`, `oc-cascade.log.txt`,
`oc-cascade-probe.cjs.txt`, `oc-tailwind.log.txt`, `oc-sass-async-probe.mjs.txt`,
`oc-first-styles-run.log.txt`, `oc-journey-observation.log.txt`), against the effective brief
`b-modal-oc-brief.md`, the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`
(M1 to M20, § Family record), the wave-2 terrain `b-modal-w2-terrain-report.md` (§ OFFCANVAS), the
first terrain `b-modal-terrain-report.md`, and the mid-campaign notes `w2-w3-note-1.md` and
`w2-w3-note-2.md`. The unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules
CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim about a proof names the
mutation that would make the proof fail and whether its assertions distinguish that mutation from the
passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the brief's
fixed rulings stand (the drawer rung bindings, the `overlay-backdrop` block verbatim per M11, the
barrel and showcase orders, the plugin row's shape); the validation copy was deleted before the
report, as the brief requires, so a lane rules the gate and mutation claims from the code's assertions
and the retained logs, and names which it read; the `test:setup` and `test:policy` failures the report
says it cannot name, and the timeouts under load, are the Orchestrator's reading.

1. **Scope and delta.** `oc-status.txt` lists only the brief's Owned paths (the modified
   `NavbarSection.test.ts` and `navbar.test.ts`, and the four added offcanvas files); `oc.diff` carries
   those files and no other; `oc-shared.patch` touches only files the brief lists as Shared, applies
   with `git apply --check` to a fresh extract of `2a3f223`, adds no line to a vendored file, an
   off-limits file, a sibling unit's file, `src/browser/**`, `src/core/**`, `tests/setupServer.ts`,
   `tests/fixtures/**`, `package.json`, or `README.md`, and leaves the MODAL, TIP, and TOAST entries,
   the barrel, and the showcase as the base has them; its § Compatibility rows fit the table's
   existing column widths, so the table is not re-padded.
2. **The partial against the oracle.** `_offcanvas.scss` writes, in the components layer, exactly the
   selectors and conditions the inventory records under `offcanvas` (`oc-cascade.log.txt` reports no
   missing and no extra site) with the recorded declarations, departing only where a `#### offcanvas`
   row records the departure; each panel class reads its `--bs-offcanvas-zindex` from
   `var(--vn-stack-drawer-base)` and the backdrop its `z-index` from `var(--vn-stack-drawer-backdrop)`;
   the backdrop is written through the `overlay-backdrop` mixin; no literal colour, black, or white is
   written; no transition outside the `transition` mixin; the release's important clear fills on the
   responsive panel at and above its boundary are kept.
3. **The two emission sites.** Writing the panel's declarations once in the `$panel` and `$nested` maps
   and emitting them from the bare rule and from the ramp walk is the only way the tree's mixins emit
   both (the `breakpoint-down` mixin emits nothing at zero, and Vite's asynchronous Sass refuses the
   `meta.apply` form, `oc-sass-async-probe.mjs.txt`), trips no duplication gate, and reads as clearly
   as the shape MODAL chose for its fullscreen rule set; or a lane names the shared mechanism, such as
   a `_mixins.scss` mixin that emits unwrapped content where no boundary exists, that retires both
   units' second site.
4. **The priority gate refinement.** The refined priority case in `tests/conformance.test.ts` compares
   each sheet's set of priorities for a selector and property; the old case reported the release's own
   shape (the responsive panel's `background-color` normal below the boundary and important at and
   above it) as a mismatch; the refined case still reddens on every priority departure the old case
   caught, including a dropped `!important` (`body-fill-important-dropped`) and an added one, and a
   lane names any priority mutation the refined case no longer distinguishes; the refinement is a
   change the unit's result forced in a Shared file rather than a widening of the gate's scope.
5. **The proofs distinguish their mutations.** Each mutation the R19 matrix and the failing-first
   record name has a retained entry in `oc-mutations.log.txt` recording its site, command, exits,
   summary, and failing cases, and the named case's assertions distinguish it from the passing case:
   the literal rungs, the backdrop without the mixin (with and without its states, and as a full copy
   the duplication gate catches), the swapped start and end transforms, the dropped `show` rule, the
   down and up names shifted apart, the widened combinator, the literal colours, the transition without
   the mixin, the literal insets, the dropped title reset, the dropped ramp rules, the navbar's expanded
   flags, the table bindings, and the section mutations. A lane names, per mutation, whether the
   assertion distinguishes it.
6. **The section, the specimens, and the navbar.** `OffcanvasSection` extends `SpecimenSection` over
   `OFFCANVAS_COPY` and `OFFCANVAS_SPECIMENS`; no specimen writes an inline style or an unshipped class;
   each panel specimen sits inside a `.viewport` frame; the backdrop sits beside the `Start offcanvas`
   panel alone; no dialog carries `aria-modal`; the `Navbar with offcanvas` specimen follows the
   release's markup (no `aria-expanded` and no `collapsed` class on its toggler) and its proof asserts
   that; the navbar proof's below-boundary reading moves because the shipped panel rules apply, and its
   case keeps its name and its inline hidden state; the section proofs' populations derive from the
   specimen and setup tables (note 1).
7. **Registries and orders.** `CaptureSubject` gains the specimen subjects and `CASCADE_KEYS` one
   resting row per specimen whose selector and property read a value an offcanvas rule sets; no
   `DRIVEN_KEYS` row; the decline paragraph covers the `showing`, `hiding`, fade-alone, and
   `.offcanvas-xxl` inline frames; `listed`, the order case (after `spinner`), the dash-proof component
   set, the `Showcase.ts` construction after `AccordionSection`, `app/browser/index.ts`, and the
   `Showcase.test.ts` and `index.test.ts` lists agree with each other, with the barrel, and with M14;
   the offcanvas case tables sit in `tests/setupStyles.ts`, are frozen and exported, and are bound to
   the inventory by derivation.
8. **The guide.** `guides/veneer.md` gains the `_offcanvas.scss` § Files row, `### Offcanvas classes`
   between `### Spinner classes` and `### Placeholder classes`, a `#### offcanvas` table whose rows
   equal the rows the report says the gate measured, the selector and variable rows and the Offcanvas
   `plugin` row ending "Owner: J-ENGINE." in § Compatibility, the drawer Alias cell, the deleted
   `Overlays` deferral row, and the rewritten `### Navbar classes` sentences; the plugin row's
   obligations match `node_modules/bootstrap/js/src/offcanvas.js` at the worktree; every sentence the
   patch adds is true of what ships, names the rule that applies each value (note 1), follows every
   code token with a noun, and states the `.offcanvas-xxl` limit and the declined frames.
9. **Law and report.** The owned files and the patch add no `any`, no `as` beyond a const assertion,
   no `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; no new helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export;
   added comments, TSDoc, guide text, and the report follow the writing rule; the report records each
   gate's command with its result line; a lane lists every count the report states as a finding
   outside the claims for the record.
