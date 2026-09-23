Lane held: **subjective** (`planner` on Opus 5.5, native, clean context, read-only). The dispatch names Opus 5; the engine that ran this lane is Opus 5.5.

**Where the terrain and the tree disagree (the tree wins in each case):**
- **The pinned inventory does carry the family's keys.** `tests/fixtures/oracle/inventory.json` has keys for `dropdown` (around line 41033), `transition` (around 47961: `.fade`, `.modal.fade …`, `.offcanvas-backdrop.fade`), `collapse` (around 48114), `collapsing` (around 48199), `nav` (around 48387), `navbar` (around 49918) and `accordion` (around 63992). It has no `scrollspy` key. The terrain listed this as unresolved.
- **The container combinators belong to `container`, not `navbar`.** The inventory records `.navbar > .container*` inside the `container` key (around line 7021), so those rules already ship from `_container.scss`. The `[data-bs-theme=dark] .navbar-toggler-icon` rule is recorded under `theme` (around line 2666). The `.navbar-expand-* .offcanvas*` rules are recorded under `navbar` (around lines 50735 to 51431).
- **The combinators' carrier row moved.** At `87ff1d0`, `ROADMAP.md` § Carriers says "the J-ENGINE Collapse unit closes their behaviour". The terrain, read at `402c033`, quoted the older Navbar-unit wording.
- **The guide still names the old generalizer.** `guides/veneer.md` § Surface (around lines 64 to 68) says B-COLLAPSE generalizes `emitEvent`, `bindEventMap`, and `Delegate`. That became false under D41.
- **The brief names the wrong table for ledger rows.** `### Departures from the workspace rows` is a bullet list about the workspace config. Ledger rows go under `### Departures`, in the `#### <key>` tables.
- **The showcase is not built in barrel order.** `Showcase.ts` constructs the forms sections after `SpinnerSection` and `InputGroupSection` last.
- **`$assets` is already there.** It maps `toggler-icon`, `accordion-icon`, and `accordion-active-icon` in `src/styles/_tokens.scss` (around line 163), and `_theme.scss` walks it in the dark scope. The guide (around lines 2188 to 2192) says "the component unit that owns each one closes that."
- **The compatibility reader has no deferred status.** `CompatibilityRow.status` is `'accepted' | 'shipped'`, and the reader throws on anything else (`tests/setupServer.ts`, around lines 50 and 1038).

## Units

Every cascade unit is routed to `opus` on Opus 5.5, native. The Chromium journeys and the Tailwind service proof rule out the bench sandbox. Each unit is audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`. ASSETS goes to `builder` on Sonnet.

All units share the same report-only files, the same off-limits list, and the same gate order:
- **Report-only shared files (serial integration, append at the anchor, or delete a whole row):** `src/styles/index.scss`, `src/styles/_tokens.scss` (only for ACCORDION and NAVBAR), `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `guides/veneer.md`.
- **Off-limits for every unit:** the files B-PASSIVE family ruling 13 names; every other unit's owned files; `src/browser/**` and `src/core/**` (no engine code); `tests/setupPolicy.ts` and `tests/policy.test.ts` (vendored, restored by `scaffold repair`); `tests/setupServer.ts`; `ROADMAP.md` (report-only to the Orchestrator).
- **Gates, cheap first:** scoped `oxfmt`, `format:check`, `lint:check`, `check`, `build:src`, `test:setup`, `test:src:styles`, `test:app`, `test:conformance`, `test:guides`, `test:policy`, `test:journey`, then `CAPTURE=1 test:journey`. The whole-chain `npm test` is an observation, not a criterion.

**Order.** COLLAPSE and DROPDOWN start in parallel from the tree after CLOSE-GUIDE lands. NAV, ACCORDION, and TOGGLES start in parallel after both have landed. NAVBAR starts after NAV and ACCORDION land. ASSETS follows NAVBAR. Shared-file patches integrate in landing order.

### COLLAPSE — keys `collapse`, `collapsing`
- **Owned files:** `src/styles/components/_collapse.scss`, `tests/src/styles/components/collapse.test.ts`, `app/browser/sections/CollapseSection.ts`, `tests/app/browser/sections/CollapseSection.test.ts`, `tests/setup.css`, `tests/fixtures/tailwind/consumer.css`, `tests/fixtures/tailwind/preflight.css`. It also owns the `tests/service/tailwind/**` file that lists the shared names, if one exists; find it by grepping for `caption-bottom caption-top`.
- **Work:**
  - Specimens `Collapse shown`, `Collapse hidden` (framed on its host), `Collapsing height` (inline `height` shorter than the content), and `Collapsing width` (`.collapse-horizontal`, inline `width`).
  - A resting row in `CASCADE_KEYS` for each specimen. No driven rows.
  - One `### Collapse classes` heading covering both keys.
  - Compatibility `selector` rows for `collapse` and `collapsing`; neither key gets a `variable` row, because both property maps are empty.
  - The Collapse plugin row (FR8).
  - The § Surface sentence rewritten (FR12).
  - `collapse` added to the `@source not inline` line and to the guide's Tailwind recipe fences (FR11).
- **Acceptance:**
  - The gates pass, cheap first.
  - `collapse` and `collapsing` are in the `listed` literal.
  - The ledger and deferral gates are green.
  - The Tailwind service proof is green, with `.collapse.show` visible in the consumer profile.
  - The capture run writes every registered frame.
- **Proofs and the mutation each one distinguishes:**
  - `display` on `.collapse` against `.collapse.show`. Mutation: the selector loses `:not(.show)`, so the shown panel reads `none`.
  - `.collapsing` clips to its inline height: `overflow: hidden`, the host's rect height, and `readPixels` below the host's bottom edge reading the page floor. Mutation: `overflow` is dropped, and the child paints past the edge.
  - Without an inline height, the rect is 0. Mutation: `height: 0` is dropped.
  - The horizontal compound sets width 0 and height auto. Mutation: the compound is written as a descendant selector.
  - The transition reads 0.35s, and 0s under `stageMedia(REDUCED_MOTION)`. Mutation: a bare `transition:` without the mixin.
  - The mode reading in a dark island.
  - Tailwind: the consumer-profile `visibility`. Mutation: `collapse` is missing from the line, so the panel reads `collapse`.
  - The section proof reads each specimen's state class. Mutation: a specimen drops `show`.
- **Risks:**
  - A `Collapse hidden` frame could read as blank. The host needs visible text (D21).
  - `Collapsing height` depends on an inline `style`. Confirm the showcase shell admits it; the progress specimens are the precedent.

### DROPDOWN — key `dropdown`
- **Owned files:** `src/styles/components/_dropdown.scss`, `tests/src/styles/components/dropdown.test.ts`, `app/browser/sections/DropdownSection.ts`, `tests/app/browser/sections/DropdownSection.test.ts`.
- **Specimens:** every menu is `.show` with `data-bs-popper="static"`, inside a wrapper that reserves the menu's room (FR4).
  - `Dropdown closed`.
  - `Dropdown menu`: header, item, `.active` item, `.disabled` item, divider, and item text.
  - `Dropdown menu end`, `Dropup`, `Dropend`, `Dropstart`, `Dropdown center`, `Dropup center`, `Dropdown menu dark`.
  - An alignment ramp, `Dropdown align sm` through `Dropdown align xxl`, derived from the ramp names with one `.map`. Each carries one `dropdown-menu-end dropdown-menu-{bp}-start` menu and one `dropdown-menu-{bp}-end` menu.
- **Driven rows:** `dropdown-menu-hover` and `dropdown-menu-focus`, on an item.
- **Also:**
  - `--bs-dropdown-zindex: var(--vn-stack-dropdown)`.
  - The caret, written inline (FR6).
  - `--bs-position`, shipped as recorded, with the guide sentence (FR7).
  - The Dropdown plugin row (FR8).
  - Deferral rows, owner `Disclosure`, for any `dropdown`-key name the release writes in `_button-group.scss` or `_input-group.scss` (FR9).
- **Acceptance:** the gates pass, `dropdown` is shipped, and the frames are written.
- **Proofs and the mutation each one distinguishes:**
  - `display` at rest and with `.show`. Mutation: the `.show` rule is missing.
  - Placement against the toggle's rect in each direction, with a gap of `--bs-dropdown-spacer`. Mutation: the dropup copies `top: 100%`, or the spacer is dropped.
  - The caret's border sides on `::after` for each host, and dropstart's `::before` with `::after` hidden. Mutation: two carets on dropstart.
  - The caret on an `:empty` toggle has margin 0. Mutation: that rule is dropped.
  - The `-end` right edge, and `-{bp}-start` and `-{bp}-end` through `visitBreakpoint` at the boundary and one pixel below it. Mutation: a condition on the wrong boundary.
  - `--bs-position` reads `start` and `end`. Mutation: the property is omitted.
  - Hover and focus paint the item's hover background, and a wrapper override of `--bs-dropdown-link-hover-bg` moves it. Mutation: a literal background.
  - The `.active` and `.disabled` paints.
  - The dark class retunes each `--bs-dropdown-*` variable. Mutation: the block lands on `.dropdown-menu`.
  - Overriding `--vn-stack-dropdown` moves `z-index`. Mutation: a literal `1000`.
  - The mode reading.
- **Risks:**
  - The center specimens paint start-aligned, because Popper does the centering (RN7).
  - The button group's `Row menu` toggle gains a caret, so the Button group frames change. This is an observation, not a criterion.

### TOGGLES — the Disclosure deferral rows
- **Owned files:** `src/styles/components/_button-group.scss`, `src/styles/components/_input-group.scss`, `tests/src/styles/components/button-group.test.ts`, `tests/src/styles/components/input-group.test.ts`, `tests/app/browser/sections/ButtonGroupSection.test.ts`, `tests/app/browser/sections/InputGroupSection.test.ts`.
- **Work:**
  - Ship `.btn-group > .btn.dropdown-toggle-split:first-child`, `.btn-sm + .dropdown-toggle-split`, `.btn-group-sm > .btn + .dropdown-toggle-split`, `.btn-lg + .dropdown-toggle-split`, and `.btn-group-lg > .btn + .dropdown-toggle-split` in `_button-group.scss`.
  - Add `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)` and `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)` to the existing selector lists in `_input-group.scss`.
  - Ship any rows DROPDOWN deferred under FR9.
  - Delete every row it ships from § Deferred selectors.
  - Each rule gets a specimen in the region of the partial that writes it (FR5). Button group region: `Split button`, `Split button small` (both the group-sized and the button-sized form), `Split button large`, `Split dropstart`. Input group region: `Input group dropdown`, `Input group dropdown validated`.
  - Rewrite the partial comments that say Disclosure withholds these rules, and the matching guide and constants sentences.
- **Depends on:** DROPDOWN.
- **Acceptance:** the gates pass, no Disclosure row is left, and the frames are written.
- **Proofs and the mutation each one distinguishes:**
  - The split toggle's inline padding for each size form. Mutation: the rule is omitted, so the toggle reads the base button padding.
  - The first-child split keeps its trailing corners. Mutation: the selector is dropped.
  - The input-group toggle's trailing corners are squared when it is not last, with and without `.has-validation`. Mutation: the selector is left out of the list.
- **Risk:** the case that reads the excluded toggle's geometry in `button-group.test.ts` might move with the caret. Run it first.

### NAV — key `nav`
- **Owned files:** `src/styles/components/_nav.scss`, `tests/src/styles/components/nav.test.ts`, `app/browser/sections/NavSection.ts`, `tests/app/browser/sections/NavSection.test.ts`, `tests/app/browser/sections/CardSection.test.ts` (RN10).
- **Specimens:**
  - `Nav base`, with a disabled link.
  - `Nav tabs`: an active link, a disabled link, and a `.nav-item.dropdown.show` holding a `.dropdown-menu.show`, with room reserved for the menu.
  - `Nav pills` and `Nav underline`, each with an active link and a `.show > .nav-link`.
  - `Nav fill`, `Nav justified`.
  - `Tab panes`: an active pane and a hidden one.
- **Driven rows:** `nav-base-hover`, `nav-base-focus`, `nav-tabs-hover`.
- **Also:** the Tab and ScrollSpy plugin rows (FR8), the card sentence around guide line 1546, and the forced-colours ring addition (FR10).
- **Depends on:** DROPDOWN.
- **Acceptance:** the gates pass, `nav` is shipped, and the frames are written.
- **Proofs and the mutation each one distinguishes:**
  - A keyboard-focused link reads the ring and a pointer-held link reads none. Mutation: the ring is on `:focus`.
  - The active tab's background covers the strip line at the seam (`readPixels`). Mutation: the negative `margin-bottom` is dropped.
  - `.nav-item.show .nav-link` reads the active paint. Mutation: it is left out of the list.
  - `.nav-tabs .dropdown-menu` has zero top radii and a negative top margin. Mutation: the rule is dropped.
  - Justified items are equal width, while fill items differ. Mutation: justified written as fill.
  - `display` on a tab pane and on the active pane. Mutation: the rule is dropped.
  - In card markup, `nav-tabs card-header-tabs` reads `border-bottom-width` 0. Mutation: the nav loads after card.
  - A wrapper override of `--bs-nav-link-color`, the mode reading, and the forced-colours outline. Mutation for the outline: `forced-ring` is omitted.

### ACCORDION — key `accordion`
- **Owned files:** `src/styles/components/_accordion.scss`, `tests/src/styles/components/accordion.test.ts`, `app/browser/sections/AccordionSection.ts`, `tests/app/browser/sections/AccordionSection.test.ts`.
- **Work:**
  - Specimens `Accordion items` (the first item expanded; the others `.collapsed` and hidden) and `Accordion flush`.
  - Driven row `accordion-items-focus`.
  - Light icons as `$icons` entries.
  - A component dark rule that reads `tokens.$dark`, and deletion of its own `$assets` rows (FR3).
  - Append its variables to `COMPONENT_DARK_ASSETS`.
  - Remove the accordion names from the guide's retained-variables paragraph.
  - The forced-colours ring addition (FR10).
- **Depends on:** COLLAPSE.
- **Acceptance:** the gates pass, `accordion` is shipped, and the frames are written.
- **Proofs and the mutation each one distinguishes:**
  - The expanded button reads the active colour, background, inset shadow, and a rotated icon; a `.collapsed` button reads none of them. Mutation: the `:not(.collapsed)` condition is inverted.
  - The `::after` `background-image` differs between the two states. Mutation: one icon variable is used for both.
  - First-of-type and last-of-type radii, and the zero top border on later items, read at the seams. Mutation: the rule is dropped.
  - Flush zeroes the borders and radii. Mutation: the rule is dropped.
  - A button inside a dark island reads the dark icon URI, and a plain element there reads empty. Mutation: the value is left at theme scope.
  - Focus reads the shadow and `z-index: 3`. Also the reduced-motion readings on the button and the icon, a wrapper override, and the forced-colours outline.

### NAVBAR — key `navbar`
- **Owned files:** `src/styles/components/_navbar.scss`, `tests/src/styles/components/navbar.test.ts`, `app/browser/sections/NavbarSection.ts`, `tests/app/browser/sections/NavbarSection.test.ts`, `tests/src/styles/theme.test.ts`, `tests/src/styles/components/container.test.ts`.
- **Specimens:**
  - `Navbar expanded` (`.navbar-expand`, brand, nav with active and disabled links, an open dropdown, text).
  - `Navbar collapsed` (a `.collapsed` toggler and a hidden `.navbar-collapse`).
  - `Navbar opened` (`.navbar-collapse.show` with a static menu).
  - `Navbar scroll` (inline `--bs-scroll-height`).
  - `Navbar dark` (`[data-bs-theme=dark]` with inline `background-color: var(--bs-body-bg)`).
  - `Navbar dark class` (`.navbar-dark`, painted the same way).
  - `Navbar expand sm` through `Navbar expand xxl`, derived as a ramp.
- **Driven rows:** `navbar-collapsed-focus` (the toggler) and `navbar-expanded-hover`.
- **Work:**
  - Loop the expand rules with `breakpoint-each`.
  - Ship the `.navbar-expand-* .offcanvas` rules and prove them, without a specimen (RN8).
  - Light toggler icon in `$icons`; a component dark rule; delete its own `$assets` row, leaving the map empty (FR3).
  - Rewrite the theme proof's asset case, because no unlanded asset remains.
  - The forced-colours ring addition (FR10).
  - Author no container combinator (FR2).
- **Depends on:** COLLAPSE, DROPDOWN, NAV, and ACCORDION.
- **Acceptance:** the gates pass, `navbar` is shipped, and the frames are written.
- **Proofs and the mutation each one distinguishes:**
  - At each boundary and one pixel below it (the `GRID_BREAKPOINT_CASES` boundaries): `.navbar-collapse` display, the toggler's display, `.navbar-nav` flex direction, and the menu's `position`. Mutation: `breakpoint-up` with a neighbouring name.
  - `.navbar-expand` is expanded at 375.
  - Both `.navbar[data-bs-theme=dark]` and `.navbar-dark` retune every colour and toggler variable. Mutation: `.navbar-dark` is dropped from the list.
  - A plain element in dark reads an empty toggler asset. Mutation: the asset is left at theme scope.
  - `max-height` falls back to 75vh when `--bs-scroll-height` is absent. Mutation: the fallback is missing.
  - A link inside `.navbar-nav` reads the navbar's colour. Mutation: the `--bs-nav-link-*` reassignment is dropped.
  - Above the boundary, `.offcanvas` is static and its header is hidden. Mutation: the rule is dropped.
  - The toggler's focus ring, its forced-colours outline, and the reduced-motion reading on the toggler.
- **Risk:** the Layout specimens hosted in `<div class="navbar">` gain the navbar's padding and flex, so the Layout frames change. `container.test.ts` might read that host as well. The unit runs that proof before it writes anything.

### ASSETS — the retirement of the emptied `$assets` mechanism
- **Route:** `builder` on Sonnet, audited by `analyst` on Astra and `checker`.
- **Owned files:** `src/styles/_tokens.scss` (the `$assets` map and its doc comment), `src/styles/_theme.scss` (the walk and its `@error`), `tests/setupStyles.test.ts` (the undeclared-key case), and the guide's § Bootstrap variables Veneer retains paragraph.
- **Depends on:** NAVBAR.
- **Acceptance:** the gates pass. The compile is byte-identical before and after, apart from the removed dark-scope declarations, which NAVBAR and ACCORDION had already removed.
- **Proof:** none added. The theme proof NAVBAR rewrote carries the reading. Mutation it distinguishes: a leftover theme-scope declaration.

## Family rulings

The reconciled record carries these, in B-PASSIVE's shape. Every B-PASSIVE ruling still binds unless one of these amends it.

- **FR1 States are classes rendered at rest.**
  - Option: a resting specimen for each state class, with the class in markup (`show`, `collapsed`, `active`, `.nav-item.show`, `.collapsing` with an inline size). Driven rows only for pointer and keyboard pseudo-classes that change the paint.
  - Cost: more resting rows.
  - Recommendation: adopt. No `CaptureState` member is added. A pseudo-class that changes only `z-index` (the accordion button's and the tab link's hover) gets no frame, because that frame would be the resting frame under a second name.
- **FR2 The container combinators stay in `_container.scss`.**
  - Option: move them into `_navbar.scss`.
  - Cost: the move puts them against the inventory's `container` membership.
  - Recommendation: keep them where they are. The Sass placeholder has no Veneer form. The `.navbar > .container*` part of the carrier row is closed; its behaviour half is J-ENGINE's.
- **FR3 Dark retunes land on component rules.**
  - Recommendation: `[data-bs-theme='dark'] .accordion-button::after` and `[data-bs-theme='dark'] .navbar-toggler-icon` read `map.get(tokens.$dark, …)`, as the `_form-select.scss` partial does. The `.navbar-dark, .navbar[data-bs-theme='dark']` block ships as recorded, as a component rule outside `theme-tokens`. `.dropdown-menu-dark` stays a class.
  - The ledger's Condition cell is `—`, because the attribute is part of the selector.
  - Each unit deletes its own `$assets` rows in the same patch, so no interim double declaration exists. ASSETS retires the empty map.
  - Cost: `_tokens.scss` becomes a shared file for ACCORDION and NAVBAR.
- **FR4 Room for positioned parts.**
  - Recommendation: a hanging menu specimen reserves its menu's room in its own direction through a wrapper. The registry's hanging-key rule then frames the menu with its host.
  - Cost: specimen markup carries layout the release docs leave to the page.
- **FR5 A rule's specimen lives in its partial's region.**
  - Recommendation: split-toggle specimens go in Button group, and the input-group toggle specimens go in Input group. Each proof mirrors its partial.
  - Cost: TOGGLES owns two section proofs.
- **FR6 The caret stays inline.**
  - Recommendation: one `@each` over a direction map inside `_dropdown.scss`. No `_mixins.scss` mixin, because there is one caller, and no `$enable-caret` switch. `margin-left` is physical under D11. The brief cites D5 for this; D11 is the physical-property ruling.
- **FR7 `--bs-position` ships as recorded.**
  - Recommendation: the guide sentence reads "No Veneer rule reads `--bs-position`; a dropdown engine reads it to choose the menu's placement, as Bootstrap's script does."
- **FR8 Plugin obligations are recorded in § Compatibility.**
  - Recommendation: one row for each of Collapse, Dropdown, Tab, and ScrollSpy. Component `engine`, Kind `plugin`, Proof `—`, Status `accepted`. The Obligation cell comes from terrain § B and ends by naming J-ENGINE as owner.
  - Add one sentence after the table: a `plugin` row records behaviour the engine owns, while the classes it sets ship and render in markup.
  - Cost: `accepted` does not say "deferred" (RN6).
- **FR9 Toggle names follow the release's file.**
  - Recommendation: rules the release writes in `_button-group.scss` or `_input-group.scss` land in those partials, through TOGGLES. DROPDOWN defers any `dropdown`-key name among them, owner `Disclosure`, so its own key is shipped when it lands.
- **FR10 A shadow focus ring gets a forced-colours outline.**
  - Recommendation: nav link, accordion button, and navbar toggler each include `forced-ring` beside the ring. This follows the D37 precedent and the `.page-link` precedent. Each is an `### Additions` row, category `declaration`, condition `@media (forced-colors: active)`.
- **FR11 Tailwind shares the `collapse` name.**
  - Tailwind's `collapse` utility sets `visibility: collapse`. That hides `.collapse.show` in a combined profile.
  - Recommendation: COLLAPSE adds `collapse` to the `@source not inline` line in `tests/setup.css`, in both Tailwind fixtures, and in the guide's recipe fences.
- **FR12 Guide wording and placement.**
  - Recommendation: one `### … classes` heading for each component: Collapse, which covers the `collapsing` key; Dropdown; Nav; Navbar; Accordion.
  - The § Surface sentence reads: "they stay that shape until the first engine component carrying a cancelable pre-change event lands." No unit ID appears in product prose.
  - A section states no script behaviour. It says the classes are set in markup and that § Compatibility records the plugin.
- **FR13 One placement rule.**
  - Recommendation: each barrel line goes immediately before the first present line the release loads after it. That makes the family a contiguous block of `collapse`, `dropdown`, `nav`, `navbar`, and `accordion`, immediately before `pagination`. This keeps `nav` ahead of `card`, which the `.card-header-tabs` border tie needs.
  - The showcase sections are appended after `InputGroupSection` in the same order.
  - Registry rows append in landing order.
- **FR14 Region, section, and constant names.**
  - Regions: `Collapse`, `Dropdown`, `Nav`, `Navbar`, `Accordion`.
  - Section classes: `<Region>Section`.
  - Constants: `<KEY>_COPY` and `<KEY>_SPECIMENS`.
  - Specimen names as the units list them. No specimen is named after its region.

## Rulings needed

Each entry gives the option, its cost, and the recommendation.

- **RN1 The state rendering.** Recommend FR1. The cost is a larger resting table.
- **RN2 The combinators and the `@extend`.** Recommend FR2. The Orchestrator re-words the Carriers row "Container and navigation combinators" to record the closed cascade half.
- **RN3 The deferred `.dropdown-toggle` rows.** Recommend a separate TOGGLES unit (FR5, FR9).
  - Alternative: fold the rows into DROPDOWN. Cost: one larger unit with two more partials. A separate unit keeps DROPDOWN's scope to its own key.
- **RN4 The dark retunes.** Recommend FR3.
  - Alternative: leave `$assets` alone until ASSETS. Cost: the theme scope and the component rule both declare each asset for a while, and the ledger reports that double declaration.
- **RN5 Caret, `$enable-caret`, and `--bs-position`.** Recommend FR6 and FR7.
- **RN6 Scrollspy.** It has no inventory key, so it gets no ledger, deferral, or CSS compatibility row. Recommend the ScrollSpy `plugin` row (FR8), with the `ROADMAP.md` J-ENGINE row as owner.
  - Alternative: a `deferred` status. Cost: editing the reader and the type in `tests/setupServer.ts`, which is off-limits, plus a proof.
- **RN7 Center placement.** `.dropdown-center` and `.dropup-center` set only `position: relative`, and Popper does the centering. Recommend rendering the specimens with frames, and naming centering as J-ENGINE placement in the Dropdown plugin row.
  - Alternative: no frame. Cost: exit item 7 then records a variant with no frame.
- **RN8 The navbar offcanvas specimen.** Recommend proving the `.navbar-expand-* .offcanvas` rules in NAVBAR, and carrying the specimen to the Offcanvas unit of B-MODAL … B-CAROUSEL. Until offcanvas ships, the 390 frame would show the panel inline.
  - Cost: an exception to B-PASSIVE ruling 9 ("every selector rendered by a specimen"), with the reason recorded.
- **RN9 Barrel placement.** Recommend FR13.
  - Alternative: land B-PASSIVE-ORDER first, then insert each line at Bootstrap's exact position. Cost: one more `builder` unit ahead of the family, and the Orchestrator has to rescope that row's timing.
- **RN10 The card specimens.** Recommend that NAV rewrites `.card-header-tabs` and `.card-header-pills` into the release's markup (`nav nav-tabs card-header-tabs`). The reduced markup existed only while nav was withheld.
  - Cost: the card frames change, and NAV owns `CardSection.test.ts`.
- **RN11 Literal dark colours.**
  - Option: color-mix over `--vn-palette-white-base`, the way `_tokens.scss` already writes `translucent`. Recorded as `tokenized`.
  - Option: Bootstrap's `rgba` literal. This is family ruling 4's fallback, but the styles rule forbids literal colours outside `_tokens.scss`.
  - Recommend color-mix.
- **RN12 Unit split and waves.** Recommend the order given under § Units. It is sized from terrain § G: the largest units are NAVBAR, from a partial of about 289 lines, and DROPDOWN, from about 250.
- **RN13 The record's additions over B-PASSIVE's.** Recommend FR1 to FR14, plus the host fact that the journey's variants are 390 and 1280. Breakpoint coverage lives in `visitBreakpoint` proofs, not in extra variants.

## Files the result makes false

**Every cascade unit:**
- `src/styles/index.scss` (the barrel line).
- `tests/conformance.test.ts` (the `listed` literal).
- `tests/setupServer.test.ts` (the compatibility component set, around line 1337).
- `app/browser/Showcase.ts` and `tests/app/browser/Showcase.test.ts` (the regions).
- `app/browser/index.ts` and `tests/app/browser/index.test.ts` (the exports).
- `app/browser/constants.ts`.
- `tests/setup.ts` (the `CaptureSubject` union, `CASCADE_KEYS`, and `DRIVEN_KEYS`).
- `tests/app/browser/integration.test.ts` (the driven cases).
- `guides/veneer.md`: § Files, the section heading, § Compatibility, and the `#### <key>` tables under § Departures and § Additions.

**Not made false:** `src/browser/index.ts` and `tests/src/browser/index.test.ts`, because no engine export changes.

**Per unit, beyond that set:**
- **COLLAPSE:** § Surface (around lines 64 to 68); the § Tailwind recipe fences (around lines 360 and 373); `tests/setup.css`; `tests/fixtures/tailwind/consumer.css`; `tests/fixtures/tailwind/preflight.css`; the shared-name assertions in `tests/setupServer.test.ts` and in any `tests/service/tailwind/**` enumeration.
- **DROPDOWN:** the Button group frames. The caret appears, so this is an observation.
- **TOGGLES:**
  - The Disclosure rows in § Deferred selectors.
  - The `### Button group classes` sentences on the withheld toggle (around lines 851 to 873).
  - The `### Input group classes` sentences (around lines 1406 and 1433).
  - The comments in `_button-group.scss` (around lines 49 and 50) and `_input-group.scss` (around line 86).
  - The button-group doc block in `app/browser/constants.ts` (around lines 880 to 882).
  - The excluded-toggle case in `button-group.test.ts`, and the section proofs.
- **NAV:** the card sentence (around guide line 1546). If RN10 is adopted, also the card specimens, `CardSection.test.ts`, and the card frames.
- **ACCORDION:** `_tokens.scss` (`$icons` and `$assets`); `COMPONENT_DARK_ASSETS` in `tests/setupStyles.ts`; the retained-variables paragraph (around guide lines 2188 to 2192).
- **NAVBAR:** the same three as ACCORDION; the asset case in `tests/src/styles/theme.test.ts` (around lines 135 to 141); the Layout frames; and possibly `container.test.ts` (around line 78) and `LayoutSection.test.ts`.
- **ASSETS:** the `$assets` doc comment in `_tokens.scss`; the walk in `_theme.scss`; the undeclared-key case in `tests/setupStyles.test.ts`; the guide paragraph.
- **The Orchestrator (report-only):** the `ROADMAP.md` family row and the Carriers row for the container combinators.

**Search bound.** Each unit re-derives its set by grepping for an existing member of every enumeration it extends (`'pagination'`, `'Pagination'`, `pagination-sm`, `caption-bottom caption-top`), then by running the suite.

## Exit criterion

The family ends when every item that follows closes, with the `verifier` chain green after integration and the family's capture portfolio ruled in one verdict round:

1. `collapse`, `collapsing`, `dropdown`, `nav`, `navbar`, and `accordion` are shipped. Each is in the `listed` literal, with its `selector` row and, where its property map is non-empty, its `variable` row, and the ledger, deferral, and priority gates are green.
2. No `Disclosure` row is left in § Deferred selectors. Every name in those rows ships from the partial the release writes it in.
3. Every state class renders at rest in a registered specimen, with frames at every variant. The driven hover and focus frames exist for the subjects the units name.
4. Dark retunes live on component rules, and the `$assets` mechanism is gone.
5. The Collapse, Dropdown, Tab, and ScrollSpy plugin rows name J-ENGINE. `scrollspy` has no cascade row, and that is recorded.
6. No unit changed `src/browser/**` or `src/core/**`.
7. The Tailwind service proofs are green, with `collapse` as a shared name.
8. The guide carries the sections, the § Surface sentence, the forced-colours additions, and the `--bs-position` sentence.
9. The `ROADMAP.md` family row and the carrier rows record the closure.
