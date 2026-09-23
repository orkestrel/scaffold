# B-MODAL … B-CAROUSEL design proposal: subjective lane (`planner` on Opus 5.5)

Lane held: **subjective** (`planner` on Opus 5.5, native, clean context). I read the brief, the B-MODAL terrain, the disclosure verdict and family record, D22 and D41, ROADMAP.md, the guide, and the tree. I found no dispatch defect. Paths are relative to `/home/user/veneer/` unless a path says otherwise.

## Units

These rulings bind every unit: M1 to M17 in § Family rulings, plus the disclosure record's rulings 13 and 14 as extended by M1.

- **Writer:** `opus` on Opus 5 (the alias serves `claude-opus-5`).
- **Audit:**
  - Objective lane: `analyst` on GPT-6 Astra if the Codex bench round-trips at dispatch. Otherwise `reviewer` on Opus 5.5, told it holds the objective lane, with the substitution recorded.
  - Subjective lane: `reviewer` on Opus 5.5.
  - Proof matrix: `checker` on Sonnet, per R19.
- **Shared and report-only for every writer** (return exact patches):
  - `src/styles/index.scss`.
  - `src/styles/_mixins.scss`, with the M11 append exception.
  - `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`.
  - `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`.
  - `tests/conformance.test.ts`, `tests/setupServer.test.ts`.
  - `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`.
  - `guides/veneer.md`, `ROADMAP.md`.
- **Off-limits for every writer:**
  - Every other unit's owned files.
  - `src/browser/**`, `src/core/**`, `tests/src/browser/**`.
  - `tests/setupServer.ts`, `tests/fixtures/**`.
  - `app/browser/styles/**`. The shell and its `.viewport` frame belong to UTIL-PLACEMENT.
  - `src/styles/_tokens.scss`, `src/styles/_theme.scss`, and every partial the unit does not own.
  - `configs/**`, `package.json`, `package-lock.json`, `README.md`.
  - `tests/setupPolicy.ts` and `tests/policy.test.ts`. `scaffold repair` restores both.
- **Common criteria, cheap first** (record ruling 14):
  1. Scoped `oxfmt`, `format:check`, `lint:check`, `check`, `build:src`, and `test:setup`.
  2. The owned styles and section proofs.
  3. `test:conformance`, `test:guides`, and `test:policy`.
  4. The report carries the R19 proof matrix and the ledger rows the comparison yields.
  5. The journey, `CAPTURE=1`, and `test:service` are the Orchestrator's observations.

### ALERT (`al`) — wave 1

- **Keys:** `alert`, plus the `.alert-dismissible .btn-close` combinator. The ladder files that combinator under `btn-close` (M6).
- **Route:** `opus` on Opus 5, with the family audit.
- **Owned:** `src/styles/components/_alert.scss`, `tests/src/styles/components/alert.test.ts`, `app/browser/sections/AlertSection.ts`, `tests/app/browser/sections/AlertSection.test.ts`.
- **Order:** starts from the commit on which the disclosure family has landed. Runs in parallel with CAROUSEL. Needs no utility.
- **Specimens:**
  - The role ramp: `Primary alert` through `Dark alert`.
  - `Linked alert`, with `.alert-heading` and `.alert-link`.
  - `Dismissible alert`, whose close control is named by `aria-label`.
  - No specimen writes `fade` or `show` (M12).
- **Acceptance** (after the common gates):
  - The `@use 'components/alert'` line is inserted between `badge` and `progress`.
  - The conformance order case's release set and expected list are extended. If the case title still says "passive", it is renamed for what it proves.
  - `alert` is added to the `listed` literal.
  - The `CLOSE_DEFERRED` entry moves to `CLOSE_SELECTORS`, and the `Overlays` row for `.alert-dismissible .btn-close` is deleted.
  - The `### Close classes` sentence takes the M6 interim form.
  - `### Alert classes`, the `### Files` row, the § Compatibility selector and variable rows, and the Alert `plugin` row naming J-ENGINE (M13) are added.
  - Resting rows exist for every specimen. No driven row.
- **Proofs and the mutation each distinguishes:**
  - Each role modifier resolves color, background, border colour, and link colour from its own `--bs-{role}-text-emphasis`, `-bg-subtle`, and `-border-subtle` aliases, in light and inside a dark island. Mutation: one loop entry reads another role's alias, or writes a literal.
  - `.alert-link` resolves weight 700 and `--bs-alert-link-color`. Mutation: rule dropped, so it inherits.
  - `.alert-heading` resolves `color: inherit`. Mutation: rule dropped, so the heading colour paints.
  - The dismissible end padding holds, and the close control's box sits at the alert's top-right corner at `z-index: 2`. Mutation: `right: 0` becomes `left: 0`, or `position` is dropped so the control flows.
  - A wrapper override of `--bs-alert-padding-x` moves the padding. Mutation: a literal padding.
- **Risks:** the role loop must copy the per-role loop pattern `_list-group.scss` already ships, or a hand-repeated block trips D30.

### CAROUSEL (`ca`) — wave 1

- **Key:** `carousel`.
- **Route:** `opus` on Opus 5, with the family audit.
- **Owned:** `src/styles/components/_carousel.scss`, `tests/src/styles/components/carousel.test.ts`, `app/browser/sections/CarouselSection.ts`, `tests/app/browser/sections/CarouselSection.test.ts`.
- **Order:** wave 1, parallel with ALERT. Needs no utility.
- **Specimens:**
  - `Captioned carousel`: `.active` slide, indicators with `data-bs-target` and `aria-current`, controls named by `aria-label`, captions.
  - `Fading carousel`: `.carousel-fade`.
  - `Dark carousel`: `.carousel-dark` over light pictures.
  - `Advancing carousel`: `.active.carousel-item-start` beside `.carousel-item-next.carousel-item-start`, so the incoming slide paints.
  - Each slide is an `img.img-fluid` whose source is an inline SVG document. Each picture is distinct and paints its own surface.
  - No specimen writes `slide` (M12).
- **Driven rows:** `carousel-control-hover` and `carousel-control-focus`.
- **Acceptance** (after the common gates):
  - The `@use` line is inserted between `popover` and `spinner` in the release's order.
  - The order-case and `listed` patches are returned.
  - The icon values ship the release's data URIs byte for byte, less the `/*rtl:*/` comment (D5). If the inventory value carries the comment, a departure row records it.
  - The M8 guide rewrites land.
  - `### Carousel classes` and the Carousel `plugin` row, whose obligation cell names the `Swipe` utility with owner J-ENGINE, are added.
- **Proofs and the mutation each distinguishes:**
  - At rest, only `.active`, `-next`, and `-prev` display. Mutation: `.carousel-item` is `display: block`.
  - Each phase transform resolves as recorded. Mutation: a `:not(.carousel-item-start)` is dropped, so the incoming slide stays offset.
  - The fade variant's opacity, `z-index`, and `transform: none` resolve as recorded, with the `opacity 0s 0.6s` delay. Mutation: the delay is dropped.
  - The item, control, and indicator transitions resolve to `none` under `stageMedia(REDUCED_MOTION)`. Mutation: a bare `transition` replaces the mixin.
  - The control geometry holds, opacity moves from 0.5 to 0.9 on hover and focus, and the filter reads the variable. Mutation: a literal filter.
  - The prev icon is the left chevron. Mutation: the icons are swapped.
  - The indicator has a content box with transparent borders, and `.active` has opacity 1. Mutation: `box-sizing: border-box`.
  - The caption insets and colour variable resolve as recorded. Mutation: a literal white.
  - `.carousel-dark` and a dark island each retune all three variables, and a light island inside a dark one restores them. Mutation: `.carousel-dark` omits one of them.
  - `.pointer-event` resolves `touch-action: pan-y`. Mutation: the rule is dropped.
- **Risks:** an inline `img` leaves a baseline gap under the slide. The unit reads the gap and reports it; it does not patch it with a utility.

### TIP (`tp`) — wave 2

- **Keys:** `tooltip` and `popover`, plus the `reset-text` mixin (M11). The name is the release's own term for the element it builds (`this.tip`).
- **Route:** `opus` on Opus 5, with the family audit.
- **Owned:** `src/styles/components/_tooltip.scss`, `src/styles/components/_popover.scss`, `tests/src/styles/components/tooltip.test.ts`, `tests/src/styles/components/popover.test.ts`, `app/browser/sections/TooltipSection.ts`, `app/browser/sections/PopoverSection.ts`, and their section proofs.
- **Order:** after UTIL-PLACEMENT lands. Parallel with TOAST and OVERLAY.
- **Specimens** (M9):
  - `Top tooltip`, `End tooltip`, `Bottom tooltip`, and `Start tooltip`: `.tooltip.show.bs-tooltip-{side}` with `position-relative`. The arrow takes `position-absolute` plus `start-50 translate-middle-x`, or `top-50 translate-middle-y`.
  - `Top popover` through `Start popover`, each with a header and a body, placed the same way.
  - `Headerless popover`, with an empty `.popover-header`.
  - Each tip carries `role="tooltip"` and an `id`.
- **Acceptance** (after the common gates):
  - The `@use` lines for `tooltip` and `popover` are inserted after `modal`.
  - The appended `reset-text` block is returned verbatim.
  - The stack rows `-popover` and `-hint` take their Alias cells (M7).
  - `### Tooltip classes` and `### Popover classes` each state the stand-in sentence (M3).
  - The Tooltip `plugin` row is added. It names placement, the `Sanitizer` and `TemplateFactory` utilities, and J-ENGINE as owner. The Popover `plugin` row is added.
  - The `### Outside the ledger` sentences on the hint surface and the popover asymmetry are restated, so they no longer name overlay units as their owner.
- **Proofs and the mutation each distinguishes:**
  - `.tooltip` has opacity 0 at rest and `--bs-tooltip-opacity` with `.show`. Mutation: the `.show` rule is dropped.
  - Each side's arrow offset, `::before` border widths, and coloured side resolve as recorded. Mutation: two sides' rules are swapped.
  - Each `.bs-tooltip-auto[data-popper-placement^=X]` and `.bs-popover-auto` form resolves the X side's readings. Mutation: `right` maps to the start side.
  - The `reset-text` run holds inside a parent writing `white-space: nowrap`, `font-style: italic`, and `text-align: right`. Mutation: one declaration is dropped from the mixin.
  - The popover's `::before` reads `--bs-popover-arrow-border` and its `::after` reads `--bs-popover-bg`, per side. Mutation: the two are swapped.
  - `.bs-popover-bottom .popover-header::before` resolves as recorded. Mutation: the rule is dropped.
  - `.popover-header:empty` resolves `display: none`. Mutation: the rule is dropped.
  - Wrapper retunes of `--vn-stack-hint` and `--vn-stack-popover` move `z-index`. Mutation: a literal 1080 or 1070.
  - The tooltip inverts in a dark island. Mutation: a literal background.
- **Risks:**
  - The stand-in `translate-middle-*` classes write `transform` with `!important`, which is what the engine writes inline.
  - No resting row may hang (M3), or the journey's hanging-key list reddens.

### TOAST (`to`) — wave 2

- **Keys:** `toast`, plus the `.toast-header .btn-close` combinator.
- **Route:** `opus` on Opus 5, with the family audit.
- **Owned:** `src/styles/components/_toast.scss` (the release file is `_toasts.scss`), `tests/src/styles/components/toast.test.ts`, `app/browser/sections/ToastSection.ts`, `tests/app/browser/sections/ToastSection.test.ts`.
- **Order:** after UTIL-PLACEMENT lands. Parallel with TIP and OVERLAY.
- **Specimens:**
  - `Shown toast`: header, title, `small`, close control, body.
  - `Stacked toasts`: a `.toast-container` inside `.viewport`, holding two shown toasts.
- **Acceptance** (after the common gates):
  - The `@use` line is inserted after `close`, and the order case's stem map gains `toasts: 'toast'`.
  - The `CLOSE_DEFERRED` entry moves to `CLOSE_SELECTORS`, and its `Overlays` row is deleted.
  - The stack row `-toast` takes its Alias cell.
  - `### Toast classes` and the Toast `plugin` row are added.
- **Proofs and the mutation each distinguishes:**
  - `.toast:not(.show)` resolves `display: none`. Mutation: the selector is inverted.
  - `.toast.showing` resolves opacity 0. Mutation: the rule is dropped.
  - The container is absolute, and its `z-index` reads the `--bs-toast-zindex` the container redeclares, bound to `--vn-stack-toast`. Mutation: a literal 1090.
  - `> :not(:last-child)` takes `--bs-toast-spacing`. Mutation: the spacing lands on the last child.
  - The header's close margins resolve as recorded. Mutation: `margin-left` is dropped.
  - The toast background is translucent. Mutation: an opaque `--bs-body-bg`.
  - The toast retunes in a dark island.
- **Risks:** the container's static position inside `.viewport` depends on that frame's containment (M3).

### OVERLAY (`ov`) — wave 2

- **Keys:** `modal` and `offcanvas`.
  - The `.modal-header .btn-close` and `.offcanvas-header .btn-close` combinators.
  - The D22 forms `.modal.fade .modal-dialog` with its reduced-motion twin, `.modal-backdrop.fade`, and `.offcanvas-backdrop.fade` (M5).
  - The `overlay-backdrop` mixin (M11).
  - The Navbar offcanvas specimen carried by R10.
- **Route:** `opus` on Opus 5, with the family audit.
- **Owned:**
  - `src/styles/components/_modal.scss`, `src/styles/components/_offcanvas.scss`, and their mirrored proofs.
  - `app/browser/sections/ModalSection.ts`, `app/browser/sections/OffcanvasSection.ts`, and their section proofs.
  - `tests/app/browser/sections/NavbarSection.test.ts`, for the carried specimen only (the R12 precedent).
- **Order:** after UTIL-DISPLAY and UTIL-PLACEMENT land and NAVBAR has landed. Parallel with TIP and TOAST.
- **Specimens:** every one sits in `.viewport`, and every modal is `modal fade show d-block`.
  - `Shown modal`, with a `.modal-backdrop.fade.show` sibling.
  - `Static modal`, `Centered modal`, `Scrollable modal`.
  - `Small modal`, `Large modal`, `Extra large modal`.
  - `Fullscreen modal`, then `Fullscreen modal sm` through `Fullscreen modal xxl`.
  - `Start offcanvas`, with an `.offcanvas-backdrop.show` sibling. Then `End offcanvas`, `Top offcanvas`, and `Bottom offcanvas`.
  - `Responsive offcanvas sm` through `Responsive offcanvas xxl`, each with `.show`.
  - `Navbar with offcanvas`, appended to the Navbar specimens.
- **Acceptance** (after the common gates):
  - The `@use` lines go in at the release's positions: `modal` after `toast`, and `offcanvas` between `spinner` and `placeholder`.
  - The appended `overlay-backdrop` block is returned verbatim, with both backdrops routed through it.
  - Both combinator entries move to `CLOSE_SELECTORS`, and their `Overlays` rows are deleted.
  - The stack paragraph and the Alias cells for `-dialog-*`, `-drawer-*`, and `-dropdown` land (M7).
  - `### Modal classes` and `### Offcanvas classes` land with the stand-in sentence, the `modal-open` sentence (M12), and the `xxl` frame limit (R16).
  - The `### Navbar classes` sentence that says the offcanvas rules are proved without a specimen is rewritten.
  - The Modal and Offcanvas `plugin` rows each name the `Backdrop`, `FocusTrap`, and `ScrollBarHelper` utilities with owner J-ENGINE.
- **Proofs and the mutation each distinguishes:**
  - The dialog transform is `translate(0, -50px)` under `.fade`, `none` under `.show`, and `scale(1.02)` under `.modal-static`. It resolves `none` under reduced motion. Mutation: the static transform is dropped, or the fade transform equals the shown one.
  - Through `visitBreakpoint` at each boundary and one pixel below:
    - `--bs-modal-margin` and the dialog cap at `sm`, `.modal-sm` at `sm`, `-lg` and `-xl` at `lg`, and `-xl` at `xl`. Mutation: a condition on the wrong boundary.
    - Each `-fullscreen-{bp}-down` applies below its boundary and not at it. Mutation: `down` written as `up`.
  - The centered dialog resolves its `min-height` and alignment. Mutation: `min-height` is dropped.
  - The scrollable body overflows and scrolls. Mutation: the body overflow is `visible`.
  - The footer gap and `> *` margins resolve as recorded.
  - The header close control takes `margin-left: auto`. Mutation: `auto` is dropped, so the control leaves the header's end.
  - The modal backdrop resolves black at 0.5 with `.show` and 0 with `.fade`. Mutation: the `.show` opacity is dropped.
  - The backdrop stacks under the dialog, read against the two rungs and a wrapper retune. Mutation: the rungs are swapped, or a literal 1055.
  - Each offcanvas placement resolves `visibility: hidden` and its `translate` at rest. Mutation: `end` uses `-100%`.
  - `.showing` and `.show:not(.hiding)` resolve `transform: none`, and `.hiding` keeps the offset. Mutation: `:not(.hiding)` is dropped.
  - `.show`, `.showing`, and `.hiding` each resolve `visible`.
  - For each responsive infix, the panel is fixed below the boundary. At and above it the panel is static, its header hidden, its body `flex`, and its background transparent `!important`. Mutations: a wrong boundary, or the priority dropped (D39a).
  - The drawer rungs move `z-index`. Mutation: a literal 1045 or 1040.
  - The `overlay-backdrop` routing compiles `.modal-backdrop` byte-identical to the unit's own pre-extraction compile (the D40 method).
- **Risks:**
  - This is the largest unit.
  - The `.viewport` height and overflow (N10).
  - Many frames lengthen the page and the capture run.

### CLOSE-OUT (`cl`) — wave 3

- **Scope:** retire the emptied `CLOSE_DEFERRED` and the `Overlays` owner. This unit is fully specified and has no taste in it.
- **Route:** `builder` on Sonnet, audited by `checker` on Sonnet and the objective lane.
- **Owned:** `tests/src/styles/components/close.test.ts`.
- **Shared** (report-only patches): `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `guides/veneer.md`.
- **Order:** after ALERT, TOAST, and OVERLAY land.
- **Acceptance:**
  - `CLOSE_DEFERRED` is deleted from `tests/setupStyles.ts`, along with its export-name entry, its frozen-table entry, the `Overlays` deferral assertions in `tests/setupStyles.test.ts`, and the absence line and import in `close.test.ts`.
  - The set-equality case reads `CLOSE_SELECTORS` alone against `oracle.components['btn-close'].selectors`. Mutation: removing one combinator from `CLOSE_SELECTORS` reddens it.
  - The `### Close classes` sentence takes its final form (M6).

### VERIFY — per landing and at the close

- **Route:** `verifier` on Sonnet.
- **Scope:** the landing chain at each landing, plus `test:service` once. After CLOSE-OUT, one capture-portfolio verdict round through the polish skill.

## Family rulings

**M1 Reused unchanged.** The disclosure record's rulings 1, 3, 4, 5, 8, 11, 13, and 14 apply as written. So do disclosure verdict rulings R8, R13, R15, R16, R17, R18, and R19, and B-PASSIVE-CLOSE R6 (no barrel-neighbour sentence in a section).
- Ruling 5 covers the stack bindings, `var(--vn-palette-black-base)` and `var(--vn-palette-white-base)` for the literal black and white, and `--vn-motion-feedback` for the controls' `0.15s`. Every other duration stays literal.
- Ruling 13 is extended by the lists in § Units.
- R3 applies in its reading: no key here writes a component-selector dark rule. The carousel's dark values sit at theme scope in the release itself (M8).
- Option: restate them in the family record. Cost: a second copy that drifts. Recommendation: point at them.

**M2 States at rest.** This amends R1.
- A class a developer writes (`show`, `active`, sides, sizes, variants, `carousel-dark`, `alert-dismissible`) renders in a registered specimen.
- A class only the engine writes during a transition renders a specimen only where its resting paint is neither empty nor identical to a registered frame. That covers `showing`, `hiding`, `modal-static`, the `carousel-item-*` phases, `pointer-event`, the backdrop's `fade` without `show`, `toast.showing`, and the `data-popper-placement` forms. Two qualify: `Static modal` and `Advancing carousel`.
- Every other engine-written class is proved by a declared-and-resolved reading with no frame, and the reason is recorded. The reason follows D17 and the page-frame duplication paragraph in `tests/setup.ts`.
- Option: render every one. Cost: blank frames, which D17 declines, and duplicate frames. Recommendation: amend.

**M3 The overlay frame and stand-ins.**
- No specimen carries an inline style. The tree refuses one: `extractStyles(mounted.host)` must be empty (`tests/app/browser/integration.test.ts`, the "mounted class and style populations" case), and every section proof asserts `[style]` null.
- Fixed and absolute overlays render inside UTIL-PLACEMENT's shell `.viewport` frame (`contain: layout paint`, bounded). This family adds no second frame.
- Where the engine writes placement or visibility inline, the release's documented static idiom stands in with shipped utilities: `d-block` for modal display, and `position-*`, `start-50`, `top-50`, and `translate-middle-*` for tip placement.
- Each section says this in one sentence, for example: "The showcase renders a shown modal with the `d-block` utility in place of the inline `display` the engine writes; a page that opens a modal through the engine writes neither."
- Option: a family-owned shell frame. Cost: a second term for one concept. Option: a shell rule that sets `display` on `.modal`. Cost: the shell paints a specimen, which its own comment refuses. Recommendation: reuse `.viewport` and the utilities.

**M4 Backdrops.** `Shown modal` and `Start offcanvas` each render their backdrop as a sibling element inside the frame. `contain: paint` clips the backdrop to the frame, so the page frame shows it only inside that specimen. No other specimen carries a backdrop. The backdrop's `fade` state without `show` paints nothing and is proved without a frame (M2).

**M5 The fade split (D22 read against the tree).**
- The ladder files `.modal.fade .modal-dialog` under `modal` (exact class) and `.modal-backdrop.fade` under `modal` (prefix). It files `.offcanvas-backdrop.fade` under `offcanvas`. This holds whether or not `transition` ships. OVERLAY ships them.
- `.fade` and `.fade:not(.show)` are recorded only under `transition` (inventory, around line 47964 and 48080), so they stay B-CROSS's. No specimen depends on `.fade:not(.show)`.

**M6 Close combinators.**
- The inventory records each combinator under `btn-close` too (`tests/setupStyles.test.ts`, the set equality with `CLOSE_DEFERRED`). The ladder files each one's ledger rows under `#### btn-close`.
- Each owning unit writes the rule in its own partial, moves its entry from `CLOSE_DEFERRED` to `CLOSE_SELECTORS`, deletes its row, and proves the geometry in its own proof. CLOSE-OUT retires the emptied list.
- ALERT rewrites the `### Close classes` sentence to: "Each overlay partial writes the combinator that fits the control into its header or its dismissible box; a combinator whose partial has not landed stays listed under § Deferred selectors." CLOSE-OUT removes the second clause.

**M7 The stack ladder.**
- Each component variable binds its rung: `--bs-modal-zindex` to `-dialog-base`, `--bs-backdrop-zindex` to `-dialog-backdrop`, `--bs-offcanvas-zindex` to `-drawer-base`, `.offcanvas-backdrop` `z-index` to `-drawer-backdrop`, `--bs-tooltip-zindex` to `-hint`, `--bs-popover-zindex` to `-popover`, and `--bs-toast-zindex` to `-toast`. The ledger records each as `tokenized`.
- Each unit fills its own rows' Alias cells.
- OVERLAY rewrites the paragraph to a form that is true at every landing: "Bootstrap declares each rung as a variable on its component's rule; a component Veneer ships binds that variable to its rung, and the Alias column names each binding." OVERLAY also fills the `-dropdown` row's Alias cell, because DROPDOWN has landed that binding.

**M8 Carousel icons and dark.**
- The icons ship as recorded data URIs, less the `/*rtl:*/` comment.
- `--bs-carousel-control-icon-filter` carries the dark inversion, as the close control's filter does.
- The light and dark triple stays in the theme emission, the `:root` and `[data-bs-theme]` records under `theme`. `.carousel-dark` ships on the class.
- The `mask-image` forward path is refused for this family, because it departs from the release with no ruling behind it. E-IDENTITY can take it up.
- CAROUSEL rewrites `### Bootstrap variables Veneer retains` and the retained sentence in `### Outside the ledger`, so they state which declarations the `carousel` key measures and drop "no shipped component claims them".

**M9 Tip placement.** Each explicit side has a specimen with the M3 stand-ins. The `-auto[data-popper-placement]` forms render no specimen: they resolve the explicit side's rules through `@extend`, and the proof asserts that equality per side. Each tip renders alone, with no trigger beside it. Placing a tip against its trigger is J-ENGINE's.

**M10 Offcanvas ramp and the Navbar carry.**
- There is one `Responsive offcanvas {bp}` specimen per infix, following the dropdown alignment-ramp precedent. The boundaries are read through `visitBreakpoint`, and the `xxl` inline state has no frame (R16).
- R10's specimen lands in the Navbar region (R5), inside `.viewport`.

**M11 Mixins.**
- TIP appends `reset-text` and OVERLAY appends `overlay-backdrop` to `_mixins.scss`. Both are the release's names (the D40a precedent). Each lands with both of its callers.
- `_mixins.scss` stays shared. The family record fixes each appended block verbatim, each unit writes that block in its own worktree, and integration appends it. This is the D40 precedent and the one named exception to report-only.

**M12 Engine-read classes with no rule.** `slide`, `modal-open`, and `visually-hidden` (the last until UTIL-PLACEMENT ships it) never appear in a specimen, because the census refuses an undeclared class token. Controls take `aria-label`. Each section says in one sentence that the engine reads `slide` or `modal-open` and no Veneer rule does.

**M13 Compatibility.**
- One `plugin` row per plugin, in the R8 shape.
- Each utility is named in the obligation cell of each plugin row that constructs it, ending with J-ENGINE as owner: `Backdrop`, `FocusTrap`, and `ScrollBarHelper` in the Modal and Offcanvas rows; `Swipe` in the Carousel row; `Sanitizer` and `TemplateFactory` in the Tooltip row.
- Option: a row per utility. Cost: a new Kind whose word collides with "utility" (the utility classes) and "helper" (R5). Recommendation: name them in the plugin rows.

**M14 Names.**
- Regions: `Alert`, `Carousel`, `Modal`, `Offcanvas`, `Tooltip`, `Popover`, `Toast`.
- Sections take `<Region>Section`, and constants take `<KEY>_COPY` and `<KEY>_SPECIMENS`.
- Specimen names put the modifier first and the component second (`Small modal`, `Top tooltip`). A ramp ends on its infix (`Fullscreen modal sm`), and the default state uses the release's word (`Shown modal`, `Shown toast`).
- Region copy is one imperative sentence in the Validation voice ("Compare …").
- Sections are constructed after the disclosure regions and before the first utility region (B-UTILITIES R12).

**M15 Accessible markup.** Close controls take `aria-label="Close"`, tips take `role="tooltip"` and an `id`, and indicators carry `aria-current="true"` where active. No specimen claims `aria-describedby` wiring; the engine writes it.

**M16 Forced colours.** This family ships no shadow focus ring, so R15 adds no row. The carousel control's `outline: 0` ships as recorded, and its focus shows as the opacity change.

**M17 Tailwind.** Each unit runs its class names through the shared-name reading. I expect no shared name, because the stand-ins are B-UTILITIES' own names. `test:service` runs only if the reading finds one.

## Rulings needed

**Where the tree disagrees with the terrain** (ruled on the tree):
- `.fade` and `.fade:not(.show)` are recorded under `transition` only. `.modal-backdrop.fade` is also recorded under `transition`.
- The close combinators sit in the `btn-close` record.
- `.tooltip`, `.popover`, and their arrows declare no `position`; Popper writes it inline (`node_modules/bootstrap/scss/_tooltip.scss`).
- The showcase refuses every inline style and every undeclared class.

**N1 Resting rendering.**
- Option: inline `display: block`. Cost: the census refuses it.
- Option: prove modal, offcanvas, and the tips without any frame. Cost: those keys get no frames, so exit item 7 stays open.
- Recommendation: M2 plus M3.

**N2 Fade.** Recommendation: M5. No ruling is needed beyond recording the ladder reading.

**N3 Backdrops.** Recommendation: M4.

**N4 `Overlays` rows.** Recommendation: M6, with CLOSE-OUT as the single carrier of the retirement.
- Option: the last unit to land retires the list. Cost: that is a condition, not a carrier.

**N5 Stack.** Recommendation: M7.

**N6 Carousel.** Recommendation: M8.
- Option: adopt `mask-image` now. Cost: an unruled departure from the release, plus rows for the dropped `background-image`.

**N7 Tips.** Recommendation: M9.
- Option: specimens without arrows, and the arrow proved with the engine's inline values staged in the test. Cost: a showcase tip that never looks like the release's.

**N8 Offcanvas loop.** Recommendation: M10.
- Option: one representative infix. Cost: consumer-written classes with no demonstration.

**N9 Split and sequencing.**
- Recommendation: ALERT and CAROUSEL in wave 1; TIP, TOAST, and OVERLAY in wave 2; CLOSE-OUT in wave 3.
- This needs a re-sequence: UTIL-DISPLAY and UTIL-PLACEMENT must land before wave 2. ROADMAP.md makes B-UTILITIES depend on B-CAROUSEL; that edge changes.
- Option: keep the roadmap order and carry the positioned specimens to a later SPECIMENS unit, as R10 did. Cost: an extra unit, and exit item 7 closes later.
- Option: separate MODAL and OFFCANVAS units, each writing the mixin D40-style. Cost: two copies to reconcile, and `_modal.scss` touched twice.

**N10 `.viewport` needs.** Send these to UTIL-PLACEMENT's brief before it dispatches:
- A frame that holds a default modal with header, body, and footer at the 390 variant.
- A fixed `100vw` by `100vh` backdrop inside the frame must produce no scrollbar. The UTIL-PLACEMENT planner proposal gives `.viewport` `overflow: auto`, which the backdrop would scroll.
- Option: `overflow: clip` on `.viewport`, with the sticky demonstration scrolling an inner box. Cost: UTIL-PLACEMENT's sticky specimen changes. Recommendation: adopt it, or have the unit measure first.

**N11 An in-flight contradiction.** The disclosure record's ruling 2 gives the `.collapsing` specimens an inline size, and the census refuses any inline style. Send a ruling to COLLAPSE, which is writing. Recommendation: prove `.collapsing` without a frame (M2).

**N12 Media count.** The terrain leaves open whether the inventory summary's `media: 0` or the per-selector `condition` fields count as media. Recommendation: each unit's matrix enumerates the `condition` fields; the summary count is not an input.

## Files the result makes false

**Every unit:**
- `src/styles/index.scss`.
- `tests/conformance.test.ts`: the `listed` literal and the order case.
- `tests/setupServer.test.ts`: the dash-proof component set.
- `tests/setupStyles.ts` and `tests/setupStyles.test.ts`: case tables, the export-name list, and the frozen-table list.
- `tests/setup.ts`: `CaptureSubject`, `CASCADE_KEYS`, and `DRIVEN_KEYS`.
- `app/browser/Showcase.ts`, `app/browser/index.ts`, `app/browser/constants.ts`.
- `tests/app/browser/Showcase.test.ts` and `tests/app/browser/index.test.ts`.
- In the guide: `### Files`, § Compatibility, `### Departures`, and `### Additions`.
- The ROADMAP.md family row.
- Observation: the journey's hanging-key list must still read only the four input-group keys.

**Per unit:**
- **ALERT:** `CLOSE_DEFERRED` and `CLOSE_SELECTORS`; the `.alert-dismissible .btn-close` deferral row; the `### Close classes` sentence; the order case's title if it says "passive".
- **CAROUSEL:** `### Bootstrap variables Veneer retains`, and the carousel sentence in `### Outside the ledger`. `tests/setupStyles.ts` `BOOTSTRAP_ROOT_VARIABLES` and `BOOTSTRAP_DARK_VARIABLES` stay true, because they list the release's names.
- **TIP:** `_mixins.scss`; the `-popover` and `-hint` stack rows; the hint-surface and popover-asymmetry sentences in `### Outside the ledger`.
- **TOAST:** its `CLOSE_DEFERRED` entry and deferral row; the `-toast` stack row; the order case's stem map.
- **OVERLAY:** `_mixins.scss`; two `CLOSE_DEFERRED` entries and their rows; the stack paragraph and the `-dialog-*`, `-drawer-*`, and `-dropdown` rows; the `### Navbar classes` sentence on the specimen-less offcanvas rules; `NAVBAR_SPECIMENS`; `NavbarSection.test.ts`.
- **CLOSE-OUT:** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/components/close.test.ts`, and the `### Close classes` sentence.

**Search bound:** grep an existing key (`'pagination'`) across `tests/`, `app/`, and `src/`. Each unit re-derives the set at its launch commit.

## Exit criterion

The family ends when every one of these holds on evidence:

- `alert`, `carousel`, `modal`, `offcanvas`, `tooltip`, `popover`, and `toast` ship in `listed`, with the ledger, deferral, priority, and compatibility gates green.
- No `Overlays` row and no `CLOSE_DEFERRED` remains.
- Every developer-written state renders in a registered specimen with frames at every variant. Every engine-written transition class is proved without a frame, with its reason recorded (M2).
- Every stack variable reads its `--vn-stack-*` rung, and the Alias column and paragraph say so.
- The `overlay-backdrop` and `reset-text` mixins each ship with both of their callers.
- The Modal, Offcanvas, Tooltip, Popover, Alert, Toast, and Carousel `plugin` rows name J-ENGINE. The `Backdrop`, `FocusTrap`, `ScrollBarHelper`, `Swipe`, `Sanitizer`, and `TemplateFactory` utilities are named in them with J-ENGINE as owner.
- No unit changed `src/browser/**` or `src/core/**`, and no unit wrote an event, a listener, a focus trap, a scroll lock, or a behavioural proof.
- The guide carries every section, the stand-in and engine-read sentences, the carousel paragraphs, and the close sentence.
- The navbar offcanvas specimen is framed.
- The ROADMAP.md family row records the closure.
- One capture-portfolio verdict round has ruled the frames.
