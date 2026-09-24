# B-MODAL wave-2 terrain report (Cursor Grok, `grok-4.7-high`, read-only)

The `grok` lane's final answer to `b-modal-w2-terrain-brief.md`, verbatim below the rule. Journal `tmp/cursor/b-modal-w2-terrain.jsonl` (swept at acceptance), session `08b4a394-c2bf-405e-99c7-a16c3e4ac057`, launched 2026-09-24 00:10:11 UTC by `cursor-queue.sh`, exit 0 at 00:17:53 UTC; `git status --porcelain` in `/home/user/veneer` empty before and after, HEAD `2a3f223`.

---

I'll start by reading the brief and the repository's agent contracts so I follow the right process.HEAD is `2a3f223` and the worktree is clean. I’ll re-measure only what the wave-1 and utility landings could have moved, starting with the four units’ files and the shared registers.Porcelain was empty before and after. HEAD stayed `2a3f223`.

## 1. What the tree carries per unit

### MODAL

`src/styles/components/` has no `_modal.scss`. `src/styles/index.scss` has no `@use` of `modal` (the barrel runs `close` at about `73`, `carousel` at about `74`). `src/styles/_mixins.scss` defines no `overlay-backdrop` mixin (the mixin list begins at `alias-gutters`, about `6`). `src/styles/components/_close.scss` writes `.btn-close` and its states (about `14`) and does not write `.modal-header .btn-close`.

`CLOSE_DEFERRED` in `tests/setupStyles.ts` (about `4578`) still lists `.modal-header .btn-close`. `CLOSE_SELECTORS` (about `4567`) lists the shipped control plus `.alert-dismissible .btn-close` only. `tests/setup.ts` `CaptureSubject` (about `81`), `CASCADE_KEYS` (about `486`), and `DRIVEN_KEYS` (about `1672`) name no modal specimen. `tests/conformance.test.ts` `listed` (about `98`) and the order case `passiveNames` (about `415`) do not name `modal`.

`tests/fixtures/oracle/inventory.json` counts object, key `modal` (about `113289`): selectors `56`, properties `24`, media `0`. The component object opens at about `68640` on `.modal` with `--bs-modal-zindex` `1055`.

`guides/veneer.md` `### Deferred selectors` (about `2958`) still has `| .modal-header .btn-close | Overlays |`. There is no `### Modal classes`, no `#### modal` ledger, and no Modal `plugin` row. The stacking table (about `3306`) still gives `--vn-stack-dialog-backdrop`, `-dialog-base` the Alias cell `none`. The paragraph under `#### Motion, focus, validation, breakpoints, and stacking` (about `3317`) still says each rung answers no `--bs-*` alias. The Dropdown binding that paragraph does not yet record is `--bs-dropdown-zindex: var(--vn-stack-dropdown)` on `.dropdown-menu` in `src/styles/components/_dropdown.scss` (about `123`), the `### Dropdown classes` sentence (about `1852`), and the `#### dropdown` ledger row (about `4876`).

### OFFCANVAS

`src/styles/components/` has no `_offcanvas.scss`, and `index.scss` does not `@use` it. The same missing `overlay-backdrop` mixin applies. `_close.scss` does not write `.offcanvas-header .btn-close`. `CLOSE_DEFERRED` (about `4581`) still lists that combinator. `CaptureSubject`, `CASCADE_KEYS`, and `DRIVEN_KEYS` name no offcanvas specimen. `listed` and `passiveNames` do not name `offcanvas`.

Inventory counts, key `offcanvas` (about `113219`): selectors `112`, properties `12`, media `0`. The component object (about `53554`) opens on `.navbar-expand-sm .offcanvas`, not on `.offcanvas`. The same expand combinators are also inside the `navbar` object (about `50779`).

What the tree already ships for this key is the navbar expand ramp in `src/styles/components/_navbar.scss` (about `186`): `.navbar-expand#{$infix} .offcanvas`, `.offcanvas-header`, and `.offcanvas-body`, inside `breakpoint-each`. `NAVBAR_SELECTORS` in `tests/setupStyles.ts` (about `6896`) lists those three per infix. `### Navbar classes` (about `2065`) says those rules ship ahead of the panel's own partial and that the Navbar region renders no offcanvas panel. `NAVBAR_SPECIMENS` (about `2488`) says the same. The deferral row is `### Deferred selectors` (about `2959`). The stacking Alias cell for `--vn-stack-drawer-backdrop`, `-drawer-base` is still `none` (about `3305`). `#### navbar` (about `4920`) has no `.navbar-expand-* .offcanvas*` departure rows. The `navbar` compatibility selector row (about `5493`) already claims the expanded offcanvas panel as shipped navbar vocabulary. There is no Offcanvas `plugin` row.

### TIP

`src/styles/components/` has no `_tooltip.scss` and no `_popover.scss`. `index.scss` does not `@use` either. `src/styles/_mixins.scss` defines no `reset-text` mixin. `CaptureSubject` names `Input group valid tooltip` and `Input group invalid tooltip` (about `97` and `101`), which are the forms keys, and names no `.tooltip` or `.popover` specimen. `CASCADE_KEYS` rows for those forms keys sit at about `998`. `listed` contains `invalid-tooltip` and `valid-tooltip` (about `150` and `184`) and does not contain `tooltip` or `popover`.

Inventory counts: `tooltip` (about `113296`) selectors `21`, properties `12`, media `0`, object opening at about `70913` on `.tooltip` with `--bs-tooltip-zindex` `1080`; `popover` (about `113303`) selectors `49`, properties `20`, media `0`, object opening at about `71979` on `.popover` with `--bs-popover-zindex` `1070`.

`### Outside the ledger` (about `5282`) still says the hint surface and the component-scoped tokens wait on the components that paint them, and (about `5290`) that Elements' popover asymmetry belongs to the overlay units. The stacking Alias cell for `--vn-stack-popover`, `-hint`, `-toast` is still `none` (about `3307`); the hint rung is this unit's. The compatibility closing paragraph (about `5543`) still says the sanitizer allowlist and sanitizer overrides remain in scope for the overlay unit. The engine `accessibility` row (about `5511`) already names the Sanitizer allowlist on Tooltip/Popover content. There is no Tooltip or Popover `plugin` row. Shipped overlap that is not this key: `.#{$state}-tooltip` in `src/styles/components/_validation.scss` (about `21`) and the exclusion in `src/styles/components/_input-group.scss` (about `111`).

### TOAST

`src/styles/components/` has no `_toast.scss` and no `_toasts.scss`. `index.scss` does not `@use` `toast`. `_close.scss` does not write `.toast-header .btn-close`. `CLOSE_DEFERRED` (about `4579`) still lists that combinator first. `CaptureSubject`, `CASCADE_KEYS`, and `DRIVEN_KEYS` name no toast specimen. `listed` and `passiveNames` do not name `toast`. The order case `stems` map (about `410`) is only `transitions: 'collapse'`, `spinners: 'spinner'`, `placeholders: 'placeholder'`.

Inventory counts, key `toast` (about `113282`): selectors `8`, properties `15`, media `0`. The component object (about `68015`) opens on `.toast` with `--bs-toast-zindex` `1090`. The deferral row is `### Deferred selectors` (about `2957`). The toast rung shares the Alias cell `none` at about `3307`. There is no Toast `plugin` row. `### Close classes` (about `2494`) already says each overlay partial writes the combinator that fits the control, and a combinator whose partial has not landed stays under `### Deferred selectors`.

## 2. The sibling pattern to copy

### ALERT

`src/styles/components/_alert.scss` opens with `@use '../tokens'` and `@layer components`. Symbols: `.alert`, `.alert-heading`, `.alert-link`, `.alert-dismissible`, `.alert-dismissible .btn-close` (about `49`), and `@each $role in tokens.$aliased` (about `61`). The barrel `@use` is `components/alert` at about `70`, between `badge` and `progress`.

`AlertSection` (`app/browser/sections/AlertSection.ts`, about `12`) extends `SpecimenSection` and passes `ALERT_COPY` and `ALERT_SPECIMENS`. Those constants live in `app/browser/constants.ts` (about `1477` and `1494`). Specimen names: `Role alerts`, `Linked alert`, `Dismissible alert`. `Showcase` (`app/browser/Showcase.ts`, about `132`) constructs `new AlertSection` after `NavSection` and before `CarouselSection`. `app/browser/index.ts` re-exports the section at about `33`.

Style proof: `tests/src/styles/components/alert.test.ts`, describes `alert box`, `alert content`, `contextual alert roles`, `dismissible alert`, reading `ALERT_SELECTORS`, `ALERT_ROLES`, `ALERT_SPACE_CASES`, and `ALERT_DISMISSIBLE_GEOMETRY` from `tests/setupStyles.ts` (about `4520`). Section proof: `tests/app/browser/sections/AlertSection.test.ts`, describe `AlertSection`, with `region.querySelector('[style]')` absent (about `15`).

Capture: `CaptureSubject` members `Dismissible alert`, `Linked alert`, `Role alerts` (about `122`, `134`, `200`). `CASCADE_KEYS` rows `role-alerts`, `linked-alert`, `dismissible-alert` (about `1334`). No `DRIVEN_KEYS` row. The journey's resting case walks `CASCADE_KEYS` (`tests/app/browser/integration.test.ts`, about `645`); there is no alert-specific `it`.

Guide: `### Files` row for `_alert.scss` (about `681`); `### Alert classes` (about `2354`); `#### alert` (about `5001`); the combinator row under `#### btn-close` (about `5040`); compatibility `alert` selector and variable rows (about `5468`); the Alert `plugin` row ending `Owner: J-ENGINE.` (about `5520`); `## Tests` link to `AlertSection.test.ts` (about `5616`).

### CAROUSEL

`src/styles/components/_carousel.scss` opens with `@use 'sass:map'`, `@use '../tokens'`, `@use '../mixins' as *`, and `@layer components`. The file comment (about `6`) says no rule reads `slide`. Selectors include `.carousel`, `.carousel.pointer-event`, the item and fade combinators, the controls, `.carousel-indicators`, `.carousel-caption`, and `.carousel-dark`. `@include transition(...)` sits on the item (about `42`), the fade outgoing item (about `81`), the controls (about `106`), and the indicators (about `182`). The barrel `@use` is `components/carousel` at about `74`, between `close` and `spinner`.

`CarouselSection` (`app/browser/sections/CarouselSection.ts`, about `12`) takes `CAROUSEL_COPY` and `CAROUSEL_SPECIMENS` (`app/browser/constants.ts`, about `2070` and `2097`). Specimen names: `Captioned carousel`, `Fading carousel`, `Inverted carousel`, `Advancing carousel`. `Showcase` constructs it at about `133`, after `AlertSection` and before `AccordionSection`. The barrel re-exports it at about `34`.

Style proof: `tests/src/styles/components/carousel.test.ts`, reading `CAROUSEL_SELECTORS`, `CAROUSEL_MARKS`, and `CAROUSEL_INVERSION`. `CAROUSEL_SELECTORS` is `tests/setupStyles.ts` about `4616`. Section proof: `tests/app/browser/sections/CarouselSection.test.ts`, describe `CarouselSection`, `[style]` absent at about `43`.

Capture: `CaptureSubject` members at about `230`. `CASCADE_KEYS` rows `captioned-carousel`, `fading-carousel`, `inverted-carousel`, `advancing-carousel` (about `1352`). `DRIVEN_KEYS` rows `captioned-carousel-hover` and `captioned-carousel-focus` (about `1700`). The decline comment above `CASCADE_KEYS` (about `468`) names the lone incoming slide and the swipe class. The journey's dedicated case is `it('drives a carousel control to hover and to focus and photographs each state')` (about `1474`), calling `FRAMES.place` for those two scenarios.

Guide: `### Files` (about `683`); `### Carousel classes` (about `2527`); `#### carousel` (about `5042`); compatibility rows (about `5470`); the Carousel `plugin` row (about `5521`); `## Showcase` decline paragraph (about `5599`); `## Tests` link (about `5621`). `### Bootstrap variables Veneer retains` (about `3400`) and `### Outside the ledger` (about `5272`) now say the theme-scope `--bs-carousel-*` declarations belong to `theme`, and `.carousel-dark` measures them on the `carousel` key. The mixin that writes them is `theme-tokens` in `src/styles/_mixins.scss` (about `349`).

## 3. Frames and prerequisites

`.viewport` in `app/browser/styles/_shell.scss` (about `51`) sets `height: 24rem`, `overflow: clip`, and `contain: layout paint`. The comment above it (about `39`) says the frame is the containing block of every fixed and absolute descendant, that a viewport-sized backdrop raises no scrollbar, and that the height leaves room for a default dialog at the narrowest variant. `[data-specimen]:has(> .viewport)` (about `62`) adds `padding-bottom: var(--vn-space-4)` on the specimen, not on the frame. `.scroller` (about `68`) is the inner scroll box. `## Showcase` (about `5565`) repeats that contract and names the Position specimens plus the Sizing `Height steps`, `Maximum sizes`, and `Viewport sizes` specimens as the current users. `PositionSection.test.ts` (about `74`) mounts a fixed `vw-100`/`vh-100` backdrop and a fixed wrapper with a `320px` dialog stand-in inside `[data-specimen="Fixed bars"] .viewport`, and records that both are fixtures of that case, not specimens.

UTIL-DISPLAY: `src/styles/utilities/_display.scss` (about `4`) walks `breakpoint-each` and calls `utility(d, display, …)` over a list that includes `block`, so the class is `d-block`, plus the responsive and `print` infixes. The barrel `@use` is `utilities/display` at about `84`.

UTIL-PLACEMENT: `src/styles/utilities/_position.scss` (about `12`) emits `position-*` (`static`, `relative`, `absolute`, `fixed`, `sticky`), `top-*` / `bottom-*` / `start-*` / `end-*` from edges `0`, `50`, `100`, and `translate-middle`, `translate-middle-x`, `translate-middle-y`. `start` writes `left` and `end` writes `right` (about `16`). The barrel `@use` is `utilities/position` at about `85`. `PositionSection` specimens in `app/browser/constants.ts` (about `2328`) already place `position-fixed`, `start-50`, `top-50`, and `translate-middle` inside `.viewport`.

NAVBAR rules already in the tree that the offcanvas key's inventory also records: `.navbar-expand#{$infix} .offcanvas`, `.navbar-expand#{$infix} .offcanvas .offcanvas-header`, and `.navbar-expand#{$infix} .offcanvas .offcanvas-body` (`_navbar.scss`, about `186`). `navbar.test.ts` (about `318`) proves them with `visitBreakpoint` against an inline hidden panel, and reads `collectMediaConditions` on `.navbar-expand-lg .offcanvas` (about `378`). DROPDOWN rules the stack paragraph has not yet absorbed: `.dropdown-menu` sets `--bs-dropdown-zindex: var(--vn-stack-dropdown)` and `z-index: var(--bs-dropdown-zindex)` (`_dropdown.scss`, about `123` and `150`), and `.dropdown-menu[data-bs-popper]` plus the direction and alignment rules (about `167`). Fixed and sticky helpers already read `--vn-stack-fixed` and `--vn-stack-sticky` (`src/styles/components/_position.scss`, about `11`). No shipped rule reads `--vn-stack-dialog-*`, `--vn-stack-drawer-*`, `--vn-stack-popover`, `--vn-stack-hint`, or `--vn-stack-toast`.

`normalizeMediaCondition` is `tests/setupServer.ts` (about `1314`). It strips the at-rule, splits on `and`, and rewrites each `min-width` / `max-width` feature to a range comparison, leaving every other feature and the feature order as written. Its proof is `tests/setupServer.test.ts` (about `2192`). Veneer's own `breakpoint-down` (`src/styles/_mixins.scss`, about `173`) emits `@media (width < …)` and emits nothing at the zero boundary. `breakpoint-up` (about `144`) emits `@media (width >= …)` and emits its content unwrapped at zero. `breakpoint-each` (about `156`) walks that up-pair. The navbar expand-offcanvas rules are inside `breakpoint-each`, so they meet the helper as range conditions, not as `max-width`. The offcanvas partial's own `offcanvas-{breakpoint}` loop is not in the tree. `visitBreakpoint` is `tests/setupBrowser.ts` (about `210`).

`src/styles` contains no `.fade` selector. `.carousel-fade` is the carousel variant (`_carousel.scss`, about `64`). The journey census `extractStyles(mounted.host)` is `integration.test.ts` (about `2049`).

## 4. The collision map

`src/styles/index.scss`, the `@use` list (about `69`–`76`). Current component order through this span: `badge`, `alert`, `progress`, `list-group`, `close`, `carousel`, `spinner`, `placeholder`. TOAST, MODAL, and TIP (`tooltip`, then `popover`) insert between `close` and `carousel`. OFFCANVAS inserts between `spinner` and `placeholder`. The order case that reads this list is `tests/conformance.test.ts` (about `409`).

`src/styles/_mixins.scss`, the end of the mixin list (the last mixin is `utility-variable`, about `419`). MODAL and OFFCANVAS each append the same `overlay-backdrop` block. TIP appends `reset-text`. TOAST does not append a mixin. `findDuplication` is asserted empty in `tests/setupStyles.test.ts` (about `647`).

`tests/setup.ts`. `CaptureSubject` (about `81`) gains each unit's specimen names. `CASCADE_KEYS` (about `486`) gains resting rows; the alert rows end about `1350` and the carousel rows about `1374`, before the accordion rows. `DRIVEN_KEYS` (about `1672`) gains driven rows; carousel's sit at about `1700`. `CLOSE_DEFERRED` is not in this file. TOAST, MODAL, and OFFCANVAS also meet the close combinators only through `tests/setupStyles.ts`.

`tests/setupStyles.ts`. `CLOSE_DEFERRED` (about `4578`) is TOAST, MODAL, and OFFCANVAS, one selector each. Each unit also adds its own selector table beside `ALERT_SELECTORS` (about `4520`) and `CAROUSEL_SELECTORS` (about `4616`). OFFCANVAS also meets `NAVBAR_SELECTORS` (about `6896`). `tests/setupStyles.test.ts` freezes the export-key list (about `250`); `ALERT_SELECTORS` is about `258`, `CAROUSEL_SELECTORS` about `296`, `CLOSE_DEFERRED` about `297`, `NAVBAR_SELECTORS` about `371`.

`tests/conformance.test.ts`. `listed` (about `98`) is every unit that adds a shipped compatibility component. The order case `stems`, `passiveNames`, and `expect(passive)` (about `410`–`459`) is every unit whose Bootstrap import name joins that set. TOAST is the one whose Bootstrap stem is `toasts`.

`tests/setupServer.test.ts`, the dash-proof component set (about `1382`), same shipped-component population as `listed`, plus `engine`.

`guides/veneer.md`. Shared regions every unit extends: `### Files` (about `662`), `## Showcase` (about `5546`), `## Tests` (about `5604`), `### Additions` (about `5076`), and the compatibility table (the plugin block ends about `5521`, the closing paragraph about `5523`). Per unit inside that file: TOAST, MODAL, and OFFCANVAS each delete one `### Deferred selectors` row (about `2957`–`2959`) and add a `#### btn-close` ledger row beside the alert combinator (about `5040`). MODAL rewrites the stacking paragraph (about `3317`) and fills Alias cells on the dialog rows (about `3306`) and the dropdown row (about `3304`). OFFCANVAS fills the drawer Alias cells (about `3305`) and meets `### Navbar classes` (about `2065`). TIP fills the popover and hint Alias cells (about `3307`), rewrites the hint-surface and popover-asymmetry sentences (about `5282` and `5290`), and rewrites the sanitizer sentence (about `5543`). TOAST fills the toast Alias cell on that same row (about `3307`). Each unit adds `### <Region> classes`, a `#### <key>` table, and a `plugin` row.

`app/browser/constants.ts` gains `<KEY>_COPY` and `<KEY>_SPECIMENS`. The insertion neighborhood is `CAROUSEL_SPECIMENS` (about `2097`) and `NAVBAR_SPECIMENS` (about `2491`). OFFCANVAS also edits the `NAVBAR_SPECIMENS` comment (about `2488`).

`app/browser/Showcase.ts`, the constructor list (about `132`–`140`): `AlertSection`, `CarouselSection`, `AccordionSection`, then `DisplaySection`. `app/browser/index.ts`, the re-exports (about `33`–`35`), the same neighborhood.

`tests/app/browser/Showcase.test.ts`, the `aria-label` list (about `129`–`132`): `Alert`, `Carousel`, `Accordion`, `Display`. `tests/app/browser/index.test.ts`, the sorted export list (`AlertSection` about `15`, `CarouselSection` about `43`). `tests/app/browser/integration.test.ts`, the `CASCADE_KEYS` loop (about `645`) and the `DRIVEN_KEYS` filters (about `758` and `1061`); carousel's own `it` is about `1474`. OFFCANVAS also meets `tests/app/browser/sections/NavbarSection.test.ts` (the null `.offcanvas` expect is about `76`).

`tests/src/styles/components/close.test.ts` (about `91`) asserts every `CLOSE_DEFERRED` selector has no rule. That is TOAST, MODAL, and OFFCANVAS. TIP does not meet it.

`ROADMAP.md`, the phase row (about `289`) and the queue bullet (about `315`). The carrier row for the navbar offcanvas panel is about `428`.

## 5. Files each unit makes false

### MODAL

`tests/setupStyles.ts` `CLOSE_DEFERRED` contains `.modal-header .btn-close` (about `4580`). `tests/setupStyles.test.ts` (about `2731`) requires `CLOSE_SELECTORS` plus `CLOSE_DEFERRED` to equal `oracle.components['btn-close'].selectors`, and requires `CLOSE_DEFERRED` to equal the guide rows whose owner is `Overlays` (about `2735`). `tests/src/styles/components/close.test.ts` (about `96`) requires every `CLOSE_DEFERRED` selector to have no rule. `guides/veneer.md` `### Deferred selectors` names that selector (about `2958`). `tests/conformance.test.ts` `listed` (about `98`) and `tests/setupServer.test.ts` (about `1382`) are closed sets that do not contain `modal`. `tests/app/browser/Showcase.test.ts` (about `99`) and `tests/app/browser/index.test.ts` (about `9`) are exact lists that do not contain a Modal region or `MODAL_COPY` / `ModalSection`. The stacking Alias cells and paragraph the guide still states are about `3304` and `3317`; `tests/setupStyles.test.ts` `collectRowTokens` (about `2185`) parses those token rows and does not assert the Alias cell.

### OFFCANVAS

The same three close assertions, for `.offcanvas-header .btn-close` (`CLOSE_DEFERRED` about `4581`, deferral row about `2959`). `tests/app/browser/sections/NavbarSection.test.ts` (about `76`) expects `region.querySelector('.offcanvas')` to be null, and the comment at about `38` says the expanded panel is the exception because its partial has not shipped. `NAVBAR_SPECIMENS` (about `2488`) and `### Navbar classes` (about `2068`) state that absence. `tests/setupStyles.test.ts` (about `3859`) binds `NAVBAR_SELECTORS`, including the `.offcanvas` combinators (about `6896`), to `oracle.components.navbar.selectors`. `navbar.test.ts` (about `318`) asserts the expanded-panel geometry against an inline hidden panel. `listed`, the setupServer component set, `Showcase.test.ts`, and `index.test.ts` do not contain `offcanvas`.

### TIP

`listed` (about `150` and `184`) contains `invalid-tooltip` and `valid-tooltip` and does not contain `tooltip` or `popover`. The setupServer set matches that. `tests/app/browser/integration.test.ts` (about `736`) requires the hanging-key set to be exactly the four `input-group-*-tooltip` mode pairs, and (about `745`) requires `reading.hit` to be the string `tooltip`. The branch that records a hang (about `685`) throws unless the specimen contains `.input-group + .input-group > .btn:first-child`. `### Outside the ledger` (about `5282` and `5290`) and the sanitizer sentence (about `5543`) are the guide sentences this unit's keys already appear in. `Showcase.test.ts` and `index.test.ts` do not contain Tooltip or Popover. `CLOSE_DEFERRED` does not name this unit.

### TOAST

The same three close assertions, for `.toast-header .btn-close` (`CLOSE_DEFERRED` about `4579`, deferral row about `2957`). `listed`, the setupServer set, `passiveNames`, `stems`, `Showcase.test.ts`, and `index.test.ts` do not contain `toast`. The stacking row that names `-toast` is the guide table at about `3307`.

## Contradictions

The terrain at `87ff1d0` says `src/styles/index.scss` ends at `components/close` and `utilities/gap` and names none of this family, and that `tests/setup.ts` registers no subject by these names. At `2a3f223`, `alert` and `carousel` are `@use`d (about `70` and `74`), and `CASCADE_KEYS` registers the alert and carousel specimens (about `1334` and `1352`). `CLOSE_DEFERRED` is three combinators, not four. The alert combinator is in `CLOSE_SELECTORS` (about `4574`) and in `_alert.scss` (about `49`). `### Close classes` (about `2494`) already has the sentence the verdict's M6 assigns to ALERT.

The terrain says no shipped partial reads the stack tokens. `_dropdown.scss` (about `123`) reads `--vn-stack-dropdown`, and `_position.scss` (about `11`) reads `--vn-stack-fixed` and `--vn-stack-sticky`. The stacking paragraph (about `3317`) still says each rung answers no `--bs-*` alias, and the Alias cell on the dropdown row (about `3304`) is still `none`, while `#### dropdown` (about `4876`) records `--bs-dropdown-zindex` as `var(--vn-stack-dropdown)`, departure `tokenized`.

The terrain's carousel-variable sentence is stale. `### Bootstrap variables Veneer retains` (about `3400`) now says the `carousel` key measures those variables on `.carousel-dark`, and the theme-scope copies stay under `theme`. The mixin lines moved: `theme-tokens` writes them at about `349`, not at `332`.

Inventory selector and property counts for `modal`, `offcanvas`, `tooltip`, `popover`, and `toast` match the terrain's § F table, and each `media` field is still `0`. The `offcanvas` object now visibly opens on `.navbar-expand-sm .offcanvas` (about `53554`). Those selectors are also under `navbar` (about `50779`) and are shipped from `_navbar.scss` (about `186`). The verdict's M10 says the `.navbar-expand-* .offcanvas*` ledger rows regroup under `#### offcanvas`. `#### navbar` (about `4920`) contains no such rows.

The terrain says the journey's hanging branch accepts the string `tooltip` for the forms keys. That expect is still there (`integration.test.ts`, about `736` and `745`).

`src/styles` still has no `.fade` rule. The verdict's M5 leaves `.fade` and `.fade:not(.show)` on B-CROSS. `.modal.fade .modal-dialog` and `.offcanvas-backdrop.fade` are not in the tree either.

## Unresolved inputs

The inventory `media` field is `0` for all four keys. Selector `condition` fields inside the component objects were not re-walked. The terrain's count of those conditions stands unconfirmed at this commit.

D22's assignment for a selector recorded under both `navbar` and `offcanvas` is unresolved, and the tree has now shipped the navbar copies. The same open assignment remains for `.modal.fade .modal-dialog` and `.offcanvas-backdrop.fade` against `transition`, with no `.fade` rule present to read.

The verdict says MODAL fills the dropdown Alias cell from DROPDOWN's landed text. The landed text is the `### Dropdown classes` sentence (about `1852`) and the `#### dropdown` row (about `4876`). The stacking table's own Alias cell for that row is still `none`.

The order case does not yet map `toasts` to `toast`. Whether a tip specimen whose box hangs below its host enters the journey's hanging branch, and then fails the exact `hung` key list, depends on markup that is not in the tree.

The guide's `## Surface` already names `ModalInterface`, `OffcanvasInterface`, `TooltipInterface`, `PopoverInterface`, and `ToastInterface` (about `314`–`374`). Compatibility has `plugin` rows for Alert and Carousel only. Which text a new `plugin` row must match, the Bootstrap obligations in the terrain's § B or these interface rows, is not settled by the cascade tree.
