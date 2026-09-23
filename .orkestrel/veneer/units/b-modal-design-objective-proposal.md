# Proposal: B-MODAL … B-CAROUSEL, objective lane (`reviewer` on Opus 5.5, substituted for `analyst` on Astra: Codex bench dark on quota)

Lane held: objective. Role and engine: `reviewer` on Opus 5.5, substituting for `analyst` on GPT-6 Astra (the Codex bench is dark).

## Units

Four units write in parallel worktrees in wave 1, starting from the commit where B-COLLAPSE … B-SCROLLSPY closes (NAVBAR landed). Three units write in wave 2, starting from the commit where wave 1 lands. The shared-file patches integrate serially at each landing.

The shared report-only set for every unit is the one in family-record rule 13: `src/styles/index.scss`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `guides/veneer.md`, and `ROADMAP.md`.

The off-limits set for every unit is also the one in rule 13: every other unit's owned files, `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/setupServer.ts` (CONDITIONS excepted), `tests/fixtures/**`, the manifests and lockfile, `README.md`, and the files `scaffold repair` restores (`tests/setupPolicy.ts`, `tests/policy.test.ts`). `src/styles/_tokens.scss` is off-limits too: units read the stack and palette tokens and write none.

Every acceptance list below runs cheap first. Each list begins with the rule-14 gates, scoped: `oxfmt`, `format:check`, `lint:check`, `check`, `build:src`, `test:setup`, the unit's own styles and section proofs, `test:conformance`, `test:guides`, and `test:policy`. The journey, `CAPTURE=1`, and `test:service` are observations the Orchestrator's chain takes.

### CONDITIONS (`cn`), wave 1

- **Keys:** none. This unit changes accounting machinery that OFFCANVAS needs.
- **Route:** `builder` on Sonnet. The change is fully specified and carries no taste.
- **Owned:** `tests/setupServer.ts`, limited to the `normalizeMediaCondition` helper and its TSDoc. This is an explicit grant against rule 13.
- **Shared report-only:** the normalizer case in `tests/setupServer.test.ts` (around line 2108).
- **Order:** runs parallel to MODAL, ALERT, and CAROUSEL. It is a prerequisite of OFFCANVAS.
- **Acceptance:**
  - After the scoped gates, the helper rewrites every `min-width` and `max-width` feature inside an `and` conjunction to its range form. It leaves every other feature and the feature order unchanged.
  - `test:conformance` stays green with no ledger row changed.
- **Proof and mutation:** One case asserts that `@media (max-width: 575.98px) and (prefers-reduced-motion: reduce)` normalizes equal to `@media (width < 576px) and (prefers-reduced-motion: reduce)`. A reversed-order twin, with the width feature placed second, asserts the same.
  - The helper as it stands (a whole-text single-feature regex) returns the conjunction raw, so the equality case reddens.
  - A rewrite that reaches only a leading width feature reddens the reversed twin.
  - The existing `@supports (display: grid)` case is the control that must keep passing.
- **Risk:** a pattern loose enough to rewrite `min-width` text inside a non-media at-rule. The `@supports` control catches it.

### MODAL (`md`), wave 1

- **Keys:** `modal`. This includes `.modal.fade .modal-dialog`, its reduced-motion twin, and `.modal-backdrop.fade`, which the D22 ladder keeps on `modal` after `transition` ships. MODAL also closes the `.modal-header .btn-close` row whose owner is `Overlays`.
- **Route:** `opus` on Opus 5.5.
- **Owned:**
  - `src/styles/components/_modal.scss`
  - `app/browser/sections/ModalSection.ts`
  - `tests/src/styles/components/modal.test.ts`
  - `tests/app/browser/sections/ModalSection.test.ts`
  - `src/styles/_mixins.scss`, for the backdrop mixin only (Rulings needed, N12)
  - `tests/src/styles/mixins.test.ts`, only where the mixin takes a case of its own
  - `app/browser/styles/_shell.scss`, for the stage rule only (N2)
- **Order:** wave 1. Prerequisite of OFFCANVAS, TIPS, and TOAST, which consume the stage and the backdrop mixin.
- **Acceptance:**
  1. The scoped gates pass.
  2. The `@use 'components/modal'` line sits between `close` and `spinner`, after `toast` (N19).
  3. The row for `.modal-header .btn-close` whose owner is `Overlays` is deleted in the same landing, so `defers no name the built cascade ships` stays green. The entry moves from `CLOSE_DEFERRED` to `CLOSE_SELECTORS`.
  4. `modal` joins the `listed` array.
  5. The `Modal` plugin row is added. The `Backdrop`, `FocusTrap`, and `ScrollBarHelper` utility rows are added, each naming J-ENGINE.
  6. The dialog stack rungs are bound (N7).
  7. Every modal selector and condition appears in the R19 matrix.
- **Proofs and mutations:**
  - **Inline allowance:** the section proof asserts that the set of `[style]` elements equals the declared set of engine-written declarations (N1). Adding an inline style to any other element reddens it.
  - **Stage containment:** the `.modal` bounding rect lies inside the stage rect. Removing the containment puts the rect at the viewport and reddens the case.
  - **Dialog transforms:** a `.modal.fade.show` dialog reads `none`, `.modal.fade` reads `matrix(1, 0, 0, 1, 0, -50)`, and `.modal.modal-static` reads a `1.02` scale. Writing the `.fade` rule after the `.show` rule turns the shown reading to `-50px` and reddens the case.
  - **Reduced motion:** under `stageMedia(REDUCED_MOTION)`, `.modal.fade .modal-dialog` reads `none`. Dropping the `transition` mixin include reddens the case.
  - **Breakpoints:** `visitBreakpoint` reads each boundary and one pixel below it:
    - 576: `--bs-modal-margin` and the `.modal-sm` cap
    - 992: `.modal-lg`
    - 1200: `.modal-xl`
    - each `.modal-fullscreen-{sm…xxl}-down` step

    Shifting an infix by one breakpoint reddens that step's boundary pair. `.modal-fullscreen` has no condition. Writing it through `breakpoint-down(xs)`, which emits nothing, reddens the presence gate.
  - **Stack:** `.modal` resolves `z-index` 1055 and `.modal-backdrop` resolves 1050. Overriding `--vn-stack-dialog-base` on the stage moves the modal. A literal `1055` keeps its reading under the override and reddens.
  - **Header combinator:** the header's `.btn-close` resolves the recorded negative margins. A control `.btn-close` outside `.modal-header` reads `0`. Writing the rule as `.modal .btn-close` reddens the control.
  - **Backdrop:** `.modal-backdrop.fade.show` reads opacity `0.5` and `.modal-backdrop.fade` reads `0`.
- **Risks:**
  - A static `aria-modal="true"` might prune the accessibility tree outside the dialog (N13).
  - The stage needs an explicit height, because `.modal`, `-scrollable`, and `-centered` resolve `100%` against it.
  - The stack paragraph also changes when DROPDOWN lands (N7).
  - The `.modal-header .btn-close` ledger rows attribute to `btn-close` (N11).

### ALERT (`al`), wave 1

- **Keys:** `alert`. ALERT closes the `.alert-dismissible .btn-close` row whose owner is `Overlays`.
- **Route:** `opus` on Opus 5.5.
- **Owned:** `src/styles/components/_alert.scss`, `app/browser/sections/AlertSection.ts`, `tests/src/styles/components/alert.test.ts`, and `tests/app/browser/sections/AlertSection.test.ts`.
- **Order:** wave 1. ALERT has no dependency inside the family.
- **Acceptance:**
  1. The scoped gates pass.
  2. `@use 'components/alert'` sits between `badge` and `progress`.
  3. The row for `.alert-dismissible .btn-close` whose owner is `Overlays` is deleted and the entry moves to `CLOSE_SELECTORS`.
  4. The variant loop iterates `tokens.$aliased` (N14).
  5. The `Alert` plugin row is added.
  6. The `### Close classes` sentence is rewritten (N6).
- **Proofs and mutations:**
  - **Role variants:** an `it.each` over the release roles reads `--bs-alert-bg`, `-color`, `-border-color`, and `-link-color` against the palette. Swapping the tokens of two roles reddens the case for each of them.
  - **Additions:** iterating `tokens.$roles` instead emits `.alert-tertiary`, and `records every emitted name the official inventory lacks` reddens.
  - **Dismissible combinator:** a `.btn-close` inside `.alert-dismissible` reads `position: absolute`, `top: 0`, `right: 0`, `z-index: 2`, and the recorded padding. The control is a `.btn-close` inside a plain `.alert`, which reads `position: static`. Writing the rule as `.alert .btn-close` reddens the control.
  - **Variable scope:** a consumer rule scoped to an ancestor, which sets `--bs-alert-bg` on `.alert`, moves the painted background.
- **Risk:** the ledger rows for `.alert-dismissible .btn-close` belong under `#### btn-close`, not `#### alert` (N11).

### CAROUSEL (`ca`), wave 1

- **Keys:** `carousel`.
- **Route:** `opus` on Opus 5.5.
- **Owned:** `src/styles/components/_carousel.scss`, `app/browser/sections/CarouselSection.ts`, `tests/src/styles/components/carousel.test.ts`, and `tests/app/browser/sections/CarouselSection.test.ts`.
- **Order:** wave 1. CAROUSEL has no dependency inside the family.
- **Acceptance:**
  1. The scoped gates pass.
  2. `@use 'components/carousel'` sits between `popover` and `spinner`.
  3. The `Carousel` plugin row and the `Swipe` utility row are added.
  4. The rewrites of `### Bootstrap variables Veneer retains` and `### Outside the ledger` land (N8).
  5. The theme-scope carousel variables stay where `_mixins.scss` emits them.
- **Proofs and mutations:**
  - **Transitional pairs:** in a `.active.carousel-item-start` plus `.carousel-item-next.carousel-item-start` pair, the active item reads `translateX(-100%)` and the next item reads `none`. Dropping the `:not(.carousel-item-start)` guard gives the next item `translateX(100%)` and reddens the case. The mirrored `-prev`/`-end` pair reads the same way.
  - **Fade variant:** under `.carousel-fade`, the active item reads opacity `1` and z-index `1`, and the other items read `0`.
  - **Control icons:** each icon reads the recorded data URI, compared through `normalizeDeclarationValue`. Keeping the `/*rtl:` alternative, or swapping the chevrons, reddens the case.
  - **Dark opt-in:** in a light scope, `.carousel-dark` resolves the same three values the dark theme scope declares. A literal edited on `.carousel-dark` reddens the case.
  - **Pointer:** `.carousel.pointer-event` reads `touch-action: pan-y`.
  - **Reduced motion:** the item, control, and indicator transitions read `none`. Dropping any include reddens its case.
  - **Forced colours:** under `stageMedia({ forced: true })`, a focused control reads opacity `0.9` (N15).
- **Risks:** Slides need painted content with no utility class (B-UTILITIES has not shipped) and no inline style. An inline SVG with presentation attributes gives the frame a paint distinct from its floor (D21).

### OFFCANVAS (`oc`), wave 2

- **Keys:** `offcanvas`. This includes `.offcanvas-backdrop.fade` and, by the D22 ladder, the `.navbar-expand-* .offcanvas*` selectors NAVBAR shipped (N11). OFFCANVAS closes the `.offcanvas-header .btn-close` row whose owner is `Overlays`, and R10's specimen.
- **Route:** `opus` on Opus 5.5.
- **Owned:** `src/styles/components/_offcanvas.scss`, `app/browser/sections/OffcanvasSection.ts`, `tests/src/styles/components/offcanvas.test.ts`, and `tests/app/browser/sections/OffcanvasSection.test.ts`.
- **Read, not written:** `_mixins.scss` and `_shell.scss`.
- **Order:** wave 2, after MODAL, CONDITIONS, and NAVBAR. OFFCANVAS lands after TOAST.
- **Acceptance:**
  1. The scoped gates pass.
  2. `@use 'components/offcanvas'` sits between `spinner` and `placeholder`.
  3. The row for `.offcanvas-header .btn-close` whose owner is `Overlays` is deleted and the entry moves.
  4. NAVBAR's `#### navbar` departure and addition rows for `.navbar-expand-* .offcanvas*` are regrouped under `#### offcanvas`, and the ledger's stale and unrecorded cases stay empty.
  5. The bare `.offcanvas` carries no width condition, and every infix from `-sm` to `-xxl` reads its down and up blocks at the same boundary name (N10).
  6. The drawer stack rungs are bound.
  7. The `Offcanvas` plugin row is added and references MODAL's utility rows.
- **Proofs and mutations:**
  - **Infix boundaries:** `visitBreakpoint` reads each infix at its boundary and one pixel below. Below the boundary the panel reads `position: fixed`. At the boundary it reads `static`, `--bs-offcanvas-height: auto`, and `.offcanvas-header` at `display: none`. Pairing an infix with the next boundary name flips the reading at the wrong width and reddens the case.
  - **Reduced motion:** under `stageMedia(REDUCED_MOTION)` below a boundary, the panel reads `none`. Dropping the include reddens the case. The ledger reads the conjunction only through CONDITIONS.
  - **State classes:** `.show.hiding` reads visibility `visible` with the placement transform kept, while `.show` and `.showing` read `none`. Dropping `:not(.hiding)` gives `.show.hiding` a `none` reading and reddens the case.
  - **Placements:** each placement class reads its own transform and its own border side.
  - **Backdrop:** `.offcanvas-backdrop` resolves `z-index` 1040 through `--vn-stack-drawer-backdrop`. The duplication gate `findDuplication` stays empty. Writing the backdrop declarations inline instead of through MODAL's mixin makes the gate report the pair.
  - **R10 specimen:** at 1280, an `.offcanvas` inside `.navbar-expand-lg` reads `position: static` and visibility `visible`. At 991 it reads `fixed` and `hidden`.
- **Risks:**
  - The regroup rewrites rows NAVBAR owned. The launch brief must quote NAVBAR's landed rows.
  - At 1280, `-xxl` sits in its fixed state, and its inline state has no frame (R16).
  - A NAVBAR proof might assert that R10's specimen is absent. The unit re-derives that with a grep for `navbar-expand` over `tests/**`.

### TIPS (`tp`), wave 2

- **Keys:** `tooltip` and `popover`.
- **Route:** `opus` on Opus 5.5.
- **Owned:**
  - `src/styles/components/_tooltip.scss` and `_popover.scss`
  - `app/browser/sections/TooltipSection.ts` and `PopoverSection.ts`
  - the mirrored style and section proofs of both
  - `src/styles/_mixins.scss`, for the text-reset mixin only (N12). TIPS owns this file in wave 2, after MODAL released it.
  - `tests/src/styles/mixins.test.ts`, only where the mixin takes a case
- **Order:** wave 2, after MODAL.
- **Acceptance:**
  1. The scoped gates pass.
  2. `@use` lines for `tooltip` and `popover` sit after `modal`, before `carousel`.
  3. The `Tooltip` and `Popover` plugin rows are added, with the `Sanitizer` and `TemplateFactory` utility rows naming J-ENGINE.
  4. The sanitizer sentence in the closing paragraph of § Compatibility is rewritten (N16).
  5. The hint and popover rungs are bound.
- **Proofs and mutations:**
  - **Duplication:** `findDuplication` stays empty. Writing the reset run inline in both partials makes the gate report it.
  - **Tooltip opacity:** `.tooltip.show` reads `0.9` and `.tooltip` reads `0`. Moving the opacity onto `.tooltip` reddens the case.
  - **Arrow borders:** each side class and its `-auto` twin read the `::before` border widths and the tip-coloured side. Dropping one twin leaves the auto specimen's coloured side `transparent` and reddens the case.
  - **Prefix match:** a specimen carrying `data-popper-placement="top-start"` reads the top treatment. Writing `=` for `^=` reddens the case.
  - **Popover header:** `.bs-popover-bottom .popover-header::before` reads its bottom border.
  - **Stack:** z-index resolves 1080 and 1070, and a token override moves each.
- **Risks:**
  - The inventory records `[data-popper-placement^=top]` unquoted, while Chromium's CSSOM serializes it quoted. Case tables follow the `.form-check-input[type=checkbox]` precedent.
  - The release's reset run writes `text-align: left` then `text-align: start` on one rule. The unit confirms that the ledger reads both declarations.

### TOAST (`to`), wave 2

- **Keys:** `toast`. TOAST closes the `.toast-header .btn-close` row whose owner is `Overlays`.
- **Route:** `opus` on Opus 5.5.
- **Owned:** `src/styles/components/_toast.scss`, `app/browser/sections/ToastSection.ts`, `tests/src/styles/components/toast.test.ts`, and `tests/app/browser/sections/ToastSection.test.ts`.
- **Order:** wave 2, after MODAL. TOAST lands before OFFCANVAS.
- **Acceptance:**
  1. The scoped gates pass.
  2. `@use 'components/toast'` sits after `close` and before `modal`. The passive order case maps `toasts` to `toast`.
  3. The row for `.toast-header .btn-close` whose owner is `Overlays` is deleted and the entry moves.
  4. The `Toast` plugin row is added.
  5. The toast rung is bound on `.toast` and on `.toast-container`.
- **Proofs and mutations:**
  - **Display:** `.toast` without `.show` reads `display: none`, and `.toast.show` reads `block`. Dropping `:not(.show)` reddens the case.
  - **Showing:** `.toast.showing` reads opacity `0`.
  - **Container spacing:** in `.toast-container`, every child except the last reads `--bs-toast-spacing` as its bottom margin. Writing `:not(:first-child)` reddens the case.
  - **Header combinator:** the header `.btn-close` margins read the recorded values against a control outside the header.
- **Risk:** `.toast-container` is `position: absolute`, so the stage must host it.

### FAMILY-CLOSE (`fc`), after wave 2

- **Route:** `builder` on Sonnet.
- **Owned:**
  - `CLOSE_DEFERRED` in `tests/setupStyles.ts`, which is retired
  - the partition case in `tests/setupStyles.test.ts` and its comment
  - the deferred assertion in `tests/src/styles/components/close.test.ts`
  - the remaining clause of `### Close classes`
  - the `btn-close` selector row's clause "the header combinators are listed under § Styles"
  - the family row and queue bullet in `ROADMAP.md`
- **Proof and mutation:** the partition case compares `CLOSE_SELECTORS` alone against the `btn-close` inventory. Deleting an entry reddens it.

### VERIFY

`verifier` on Sonnet runs the landing chain at each landing. The Orchestrator then runs one capture-portfolio verdict round after wave 2.

## Family rulings

M1. **The record carries the tree over the terrain wherever the two disagree.**
- `.fade` and `.fade:not(.show)` are recorded under `transition` alone, in the inventory's `transition` object around line 47961.
- The `-sm` through `-xxl` panels each carry a compound `(max-width: …) and (prefers-reduced-motion: reduce)` condition, around lines 54526–55942. Only the bare panel carries the plain one.
- The bare `.offcanvas` emits under no width condition, because `breakpoint-next(xxl)` is null.
- The stack table's last column is `Alias`.
- The barrel runs past `close` through `spinner`, `placeholder`, `icon-link`, `ratio`, and `vr`, and the passive order case exists.
- `.tooltip` and `.popover` declare no `position`.

Option: adopt these readings. Cost: none. Recommendation: adopt.

M2. **Reuse these rulings unchanged:**
- R1: states at rest, no `CaptureState` member, no engine code
- R8: plugin rows, extended to utility rows
- R11: barrel at the release's position, with the passive order case's `passiveNames` and `stems` extended per unit
- R13: literal colours
- R15: forced colours, reused with no family additions (N15)
- R16: breakpoints at 390 and 1280 only
- R17: guide wording
- R18: names
- R19: proof matrix
- family-record rules 1 to 5, 8, 9, 11 to 16, and host facts

Cost: none. Recommendation: adopt.

M3. **Depart from R3 for the carousel.** The theme-scope carousel variables are recorded under `theme` (B-CROSS), not under `carousel`. Nothing moves. `.carousel-dark` reads `tokens.$dark`. Cost: none. Recommendation: adopt.

M4. **Depart from R5 for R10's specimen.** The specimen sits in the Offcanvas region, because the ladder attributes those selectors to `offcanvas` once `offcanvas` ships (N11). Cost: one recorded exception. Recommendation: adopt.

M5. **Keep the deferral owner word `Overlays` until FAMILY-CLOSE.** The partition case in `tests/setupStyles.test.ts` filters rows with `owner === 'Overlays'`, so a rename midway through the family reddens it. Cost: none. Recommendation: adopt.

M6. **No Tailwind change.** No class this family emits is a Tailwind utility name. Each unit reports `test:service` as an observation. Cost: none. Recommendation: adopt.

## Rulings needed

N1. **Engine-written inline declarations in markup.** `.modal` shows only through an inline `display: block`. The arrows of `.tooltip` and `.popover` resolve only under Popper's inline `position: absolute` and offsets. Every shipped section proof asserts `region.querySelector('[style]')` is null.
- Option A: allow exactly the declarations the release's script writes, enumerated per section in a constant. The section proof asserts equality with that set. Cost: a bounded exception, in the same class as R1's inline size on `.collapsing`.
- Option B: override in the shell. Cost: the shell paints a specimen, which its own law refuses, and the proof reads the shell rather than the cascade.
- Option C: withhold the specimens. Cost: this fails D41 and exit item 7.
- Recommendation: A.

N2. **The stage.** Fixed overlays escape their specimen. They cover the showcase, intercept every pointer drive, and paint over the arrival frame.
- Option A: a layout-only shell class (`contain: layout paint` and an explicit height), whose name is a constant in `app/browser/constants.ts`. MODAL lands it. Cost: MODAL gates the wave-2 units.
- Option B: an inline `transform` wrapper. Cost: this widens N1 beyond engine-written declarations.
- Recommendation: A. The subjective lane names the class. The stage is the registered resting subject, so a tip inside the stage never reaches the journey's hanging branch, and R4 is unchanged.

N3. **Mid-transition classes.**
- Every class renders at rest with the class in markup.
- A class registers a frame only where its paint is non-empty and differs from another registered frame.
- These paints are empty and register no frame (D17), with the reason in the remarks: `.toast.showing`, `.offcanvas.hiding`, `.tooltip` without `.show`, a lone `.carousel-item-next`, `.modal-backdrop.fade`, and `.offcanvas-backdrop.fade`.
- The carousel pairs paint the same as `.active` at rest, so their proofs read the computed transform.
- Recommendation: adopt.

N4. **Ownership of `.fade`.**
- Option A: B-CROSS keeps `.fade` and `.fade:not(.show)`. MODAL and OFFCANVAS ship their compound `.fade` selectors, which the ladder keeps on their keys. No registered frame here carries `.fade` without `.show`, because B-CROSS's `.fade:not(.show)` would blank it.
- Option B: MODAL takes `transition`. Cost: a queue re-baseline and a barrel line before `dropdown`.
- Recommendation: A.

N5. **Backdrops.** Render each backdrop as a sibling of its panel inside the stage. The stage clips the `100vw`/`100vh` box. Recommendation: adopt.

N6. **The combinator rows whose owner is `Overlays`.** Each carrier unit deletes its own row and moves its entry. ALERT rewrites `### Close classes` so it stays true as the later units land: "each overlay component ships its header combinator from its own partial, and § Deferred selectors lists those still owed." FAMILY-CLOSE drops the clause about combinators still owed. Recommendation: adopt.

N7. **Stack ladder.** Bind the rungs as follows:
- `--bs-modal-zindex` to `var(--vn-stack-dialog-base)`
- `--bs-backdrop-zindex` to `var(--vn-stack-dialog-backdrop)`
- `--bs-offcanvas-zindex` to `var(--vn-stack-drawer-base)`
- the `z-index` of `.offcanvas-backdrop` to `var(--vn-stack-drawer-backdrop)` (the release writes a Sass literal there, so this rung has no `--bs-*` variable)
- `--bs-tooltip-zindex` to `var(--vn-stack-hint)`
- `--bs-popover-zindex` to `var(--vn-stack-popover)`
- `--bs-toast-zindex` to `var(--vn-stack-toast)`, on `.toast` and on `.toast-container`

Each binding is a `tokenized` departure. Each binding unit writes its rung's `Alias` cell. The clause "answers no `--bs-*` alias" goes false when DROPDOWN lands. MODAL rewrites it generically, after the Orchestrator quotes DROPDOWN's landed text into MODAL's brief. Recommendation: adopt.

N8. **Carousel icons.**
- Ship the recorded data URI without the `/*rtl:` comment (D5). The comparison trims the trailing space the release leaves behind.
- Refuse `mask-image` for the baseline. It is a `background-image` departure that interacts with the filter, and it is E-IDENTITY's question.
- CAROUSEL rewrites `### Bootstrap variables Veneer retains` and the sentence in `### Outside the ledger`.
- Recommendation: adopt.

N9. **Placement specimens.** The four side classes and their four `-auto` twins each render inside the stage, positioned by Popper-form inline declarations. `data-popper-placement` ships as a markup attribute. Recommendation: adopt.

N10. **Offcanvas loop.**
- The bare class is unconditioned.
- Each infix pairs `breakpoint-down(name)` and `breakpoint-up(name)` at one boundary name.
- Specimens: one shown panel per placement, and one shown panel per infix.
- Proofs through `visitBreakpoint`.
- Recommendation: adopt.

N11. **The D22 ladder.** The ladder takes an exact class first. So the header combinators attribute to `btn-close`, not to the overlay key, and `.navbar-expand-* .offcanvas*` flips from `navbar` to `offcanvas` once `offcanvas` ships. Both results contradict D22's stated intent, "the key the release authors it under".
- Option A: the implemented ladder governs. OFFCANVAS regroups the rows, and the header-combinator rows sit under `#### btn-close`.
- Option B: amend the ladder with a map from each selector to the partial that authors it. Cost: this changes D22's landed behaviour and its proof in `tests/setupServer.test.ts`.
- Recommendation: A, recorded as a D22 reading.

N12. **Mixins required by the duplication gate.**
- The modal and offcanvas backdrops share `position`, `top`, `left`, `width`, and `height`. Five of seven declarations is over the relative arm.
- `.tooltip` and `.popover` share the release's text-reset run, which is over the absolute arm.
- Option A: add mixins, following the D40 precedent. Option B: write them inline. Cost of B: `findDuplication` reddens.
- Recommendation: A. The subjective lane names the mixins.

N13. **`aria-modal` in static markup.** Chromium might drop content outside a visible `aria-modal` dialog from the accessibility tree. That would break name-based queries across the showcase. Recommendation: static specimens carry `role="dialog"` and no `aria-modal`. MODAL probes before it writes a specimen: mount the dialog beside a button and resolve the button by name.

N14. **Alert loop.** Iterate `tokens.$aliased`, as `_list-group.scss` and `_table.scss` do, not `tokens.$roles`. Recommendation: adopt.

N15. **Forced colours.** The carousel control's focus is an opacity change, which forced colours keep. No other family member ships a shadow focus ring. Recommendation: add no `forced-ring` rows, and prove the opacity reading.

N16. **The sanitizer sentence.** "The sanitizer allowlist and sanitizer overrides remain in scope for the overlay unit" in the closing paragraph of § Compatibility contradicts D41. TIPS rewrites it to name J-ENGINE. Recommendation: adopt.

N17. **Audit engine while the bench is dark.** Every unit is written and audited on Opus, so no auditor runs on an engine that did not write the work. Record the deviation in every verdict under the 2026-09-23 standing condition, or hold the objective audits for Astra. Recommendation: record the deviation and proceed.

N18. **Media count.** The gates read each selector's `condition` through `normalizeMediaCondition` (around lines 2087, 2144, and 2256). The summary's `media` field is not an input, so the R19 matrix enumerates conditions. Recommendation: adopt.

N19. **Barrel positions.**
- `alert` between `badge` and `progress`.
- `toast`, `modal`, `tooltip`, `popover`, and `carousel` between `close` and `spinner`, in that order.
- `offcanvas` between `spinner` and `placeholder`.

Recommendation: adopt.

## Files the result makes false

Every unit makes these enumerating assertions false, each as a report-only patch:
- the `@use` list in `src/styles/index.scss`
- in `tests/conformance.test.ts`, the `listed` array and the `passiveNames` and `stems` of the passive order case
- the set of rows with a dash in the Proof cell in `tests/setupServer.test.ts` (around line 1337)
- the case tables in `tests/setupStyles.ts` and `tests/setupStyles.test.ts`
- `CaptureSubject`, `CASCADE_KEYS`, and `DRIVEN_KEYS` in `tests/setup.ts`
- the frames in `tests/app/browser/integration.test.ts`
- the section list in `app/browser/Showcase.ts` and the region labels in `tests/app/browser/Showcase.test.ts`
- the exports of `app/browser/index.ts` and `tests/app/browser/index.test.ts`
- `<KEY>_COPY` and `<KEY>_SPECIMENS` in `app/browser/constants.ts`
- in the guide: `### Files`, `## Showcase`, the `### <Region> classes` sections, `#### <key>` under `### Departures`, `### Additions`, and the selector, variable, and plugin rows of § Compatibility

Units add these:
- **CONDITIONS:** the normalizer case in `tests/setupServer.test.ts`.
- **MODAL:**
  - `CLOSE_DEFERRED` and `CLOSE_SELECTORS`
  - the `.modal-header .btn-close` row whose owner is `Overlays`
  - the `Alias` cells and paragraph of the dialog stack rows
  - the utility rows in § Compatibility
  - `_shell.scss` and `_mixins.scss`
- **ALERT:** the `.alert-dismissible .btn-close` row whose owner is `Overlays`, and the `### Close classes` sentence.
- **CAROUSEL:** `### Bootstrap variables Veneer retains`, and the carousel sentence in `### Outside the ledger`.
- **OFFCANVAS:**
  - the `.navbar-expand-* .offcanvas*` rows under `#### navbar`
  - any NAVBAR proof that asserts R10's specimen is absent, re-derived by a grep for `navbar-expand` over `tests/**`
  - the `.offcanvas-header .btn-close` row whose owner is `Overlays`
  - the drawer `Alias` cell
- **TIPS:** the sanitizer sentence in § Compatibility, the hint and popover `Alias` cells, and `_mixins.scss`.
- **TOAST:** the `.toast-header .btn-close` row whose owner is `Overlays`, and the toast `Alias` cell.
- **FAMILY-CLOSE:**
  - the comment on the partition case in `tests/setupStyles.test.ts`
  - the now-vacuous deferred assertion in `close.test.ts`
  - the `btn-close` compatibility row's clause
  - the family row and queue bullet in `ROADMAP.md`

## Exit criterion

The family ends when every item is implemented or excluded on evidence:

1. `modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`, and `carousel` are in the `listed` array, with their compatibility rows. The ledger, deferral, priority, and duplication gates are green.
2. No row whose owner is `Overlays` remains, and `CLOSE_DEFERRED` is retired.
3. The ledger records the rows that the D22 ladder moves, for NAVBAR's offcanvas selectors and the header combinators.
4. `normalizeMediaCondition` normalizes conjunctions, with its proof.
5. Every state class renders at rest in a registered specimen, inside the stage where the class is fixed or absolute. Frames exist at every variant, with the declined frames recorded under D17.
6. The only inline declarations are the enumerated engine-written ones. No specimen carries `aria-modal`.
7. The stack rungs are bound and their `Alias` cells written.
8. The plugin rows for Modal, Offcanvas, Tooltip, Popover, Alert, Toast, and Carousel are added. The utility rows for `Backdrop`, `FocusTrap`, `ScrollBarHelper`, `Swipe`, `Sanitizer`, and `TemplateFactory` are added. Every one of those rows names J-ENGINE.
9. `.fade` and `.fade:not(.show)` are recorded as owned by B-CROSS.
10. No unit changed `src/browser/**` or `src/core/**`, or wrote engine code.
11. `test:service` is green.
12. The guide's retained-variable, outside-ledger, close, stack, and sanitizer prose matches what shipped.
13. The capture portfolio is ruled in one verdict round.

Files I read and cite:
- `/home/user/veneer/tests/setupServer.ts`
- `/home/user/veneer/tests/fixtures/oracle/inventory.json`
- `/home/user/veneer/tests/setupStyles.ts`
- `/home/user/veneer/tests/setupStyles.test.ts`
- `/home/user/veneer/tests/conformance.test.ts`
- `/home/user/veneer/tests/setup.ts`
- `/home/user/veneer/src/styles/_mixins.scss`
- `/home/user/veneer/src/styles/index.scss`
- `/home/user/veneer/app/browser/styles/_shell.scss`
- `/home/user/veneer/guides/veneer.md`
- `/home/user/veneer/node_modules/bootstrap/scss/_offcanvas.scss`
- `/home/user/veneer/node_modules/bootstrap/scss/_tooltip.scss`
