Lane held: **subjective**, run as `planner` on Opus 5.5 in a clean context. I did not see the objective lane. The dispatch has no defects: it names no report path and assigns no command.

## Design

Every panel moves on Elements' motion pair. Geometry and size run on `--vn-motion-panel` with `--vn-ease-panel`, and opacity runs on `--vn-ease-out`. Every floating surface enters with Elements' scale-in. Bootstrap's classes, markup, and state-class sequence stay the same. Veneer changes values, and it adds geometry only on selectors the state classes already match. A row is `tokenized` where the declaration reads a token, following the `h1` `font-size` rows (`guides/veneer.md:8397`). A row is `declared` where the geometry changes.

**1. Collapse and accordion**
- `.collapsing` takes `height var(--vn-motion-panel) var(--vn-ease-panel)`, and the horizontal panel takes the same value on `width`. This is Elements' pair from `elements/_details.scss:81`. The geometry stays Bootstrap's: size only. Rewrite the rationale comment at `_collapse.scss:9`.
- Opacity is not added. The panel carries the same `.collapsing` class set while opening and while closing (`guides/veneer.md:1029`–`1036`), so the cascade cannot tell which end the opacity is heading to. Elements' `::details-content` fade cannot apply here.
- Root `interpolate-size` is refused. E27 chose `calc-size()` because it needs no declaration outside the engine (`engine/decisions.md:195`), and a root keyword would retime every consumer's keyword-size transition. J-COLLAPSE-SIZE changes what the engine writes, not this rule's timing, so this unit does not wait on it.
- The chevron takes `--bs-accordion-btn-icon-transition: transform var(--vn-motion-panel) var(--vn-ease-panel)`, so it finishes with the panel. `rotate(-180deg)` stays: Bootstrap's glyph points down, and Elements' `90deg` suits a side marker (`elements/_summary.scss:122`).

**2. Modal**
- The dialog takes `.modal.fade .modal-dialog { transform: scale(0.96) }` in place of `translate(0, -50px)` (a `declared` row). Its transition becomes `transform var(--vn-motion-panel) var(--vn-ease-panel)` (a `tokenized` row). This follows Elements at `elements/_dialog.scss:108` and `:238`. The `scale(1.02)` of `.modal-static` stays.
- The host `.modal.fade` takes `opacity var(--vn-motion-panel) var(--vn-ease-out)`, so the fade and the scale end together. Show settles the dialog and hide settles the host (`Modal.ts:325`, `:374`). With equal durations, each wait covers the whole motion.
- The backdrop rule goes in the `overlay-backdrop` mixin (`_mixins.scss:603`): `&.fade` gets `opacity var(--vn-motion-panel) var(--vn-ease-out)` through the `transition` mixin. The modal and offcanvas backdrops share this one decision, so it counts as a pattern under D46. Elements' `blur(2px)` (`surfaces/_backdrop.scss:116`) is appearance, not motion. It is not taken and is listed for the user.
- Veneer needs no `@starting-style` here. The engine writes `display`, calls `reflow`, then adds `.show` (`guides/veneer.md:1010`), and that sequence supplies the starting frame. Hiding `display` only after the animations settle does the job `allow-discrete` does in Elements.

**3. Offcanvas**
- `--bs-offcanvas-transition` becomes `transform var(--vn-motion-panel) var(--vn-ease-panel), opacity var(--vn-motion-panel) var(--vn-ease-out)`.
- Bootstrap's `translate(±100%)` stays; Elements uses the same (`components/_aside.scss:656`).
- Elements' opacity is added: `$panel` gets `opacity: 0`, and the `'&.showing, &.show:not(.hiding)'` entry gets `opacity: 1` (`_offcanvas.scss:9`, `:54`). A responsive panel at and past its boundary never emits `$panel`, so it keeps full opacity.
- `.showing` and `.hiding` keep the panel visible while it moves (`_offcanvas.scss:57`), which does the job `allow-discrete` does in Elements.

**4. Carousel**
- Add the token `--vn-motion-slide: calc(600ms * var(--vn-factor-motion))`.
- The slide takes `transform var(--vn-motion-slide) var(--vn-ease-panel)`. Elements keeps `0.6s` on the stiff curve (`composables/_carousel.scss:50`). The geometry stays.
- In the fade variant, the outgoing slide takes `opacity 0s var(--vn-motion-slide)`, so its delay follows the incoming slide the engine waits on (`Carousel.ts:457`). `.carousel-fade .carousel-item` adds `transition-timing-function: var(--vn-ease-out)`. This value is Veneer's own, because Elements has no fade variant.
- The controls move from `--vn-ease-standard` to `--vn-ease-out` (Elements `:202`).
- The indicators take `opacity var(--vn-motion-feedback) var(--vn-ease-out)`, Elements' timing from `:322`. Bootstrap's opacity pip stays. Elements' widening pip is an appearance change and is listed for the user.

**5. The `.fade` family and the dropdown**
- `.fade` becomes `opacity var(--vn-motion-feedback) var(--vn-ease-out)`, which changes the Veneer cell of the row at `guides/veneer.md:9694`.
- The alert and the tab pane keep opacity only. Elements' collapsing alert is refused: in Bootstrap, an `.alert.fade` without `.show` keeps its box, and collapsing it would change how that markup renders at rest.
- The tooltip, popover, and toast take Elements' popover entry: `scale(0.98)` with opacity over 150ms (`surfaces/_popover.scss:204`).
  - A mixin named `scale-in` in `_mixins.scss` emits `opacity var(--vn-motion-feedback) var(--vn-ease-out), transform var(--vn-motion-feedback) var(--vn-ease-panel)` through the `transition` mixin.
  - It writes `scale(0.98)` on each caller's hidden-state selector: `.fade:not(.show)` for the tooltip and popover, and `.showing` plus `.fade:not(.show)` for the toast.
  - `Placement` anchors through `position-area` and margins (`Placement.ts:30`), so `transform` is free to use.
- The dropdown gets an entry motion only, through `@starting-style`. This is the one place Elements' mechanism fits, because `.show` switches `display` and the engine has no transition phase to drive it.
  - The rule is `@starting-style { .dropdown-menu { opacity: 0; transform: scale(0.98) } }`.
  - It targets the bare selector, one class lower in specificity than `.dropdown-menu.show`. This is Elements' workaround for a Chromium specificity hazard (`surfaces/_popover.scss:220`–`245`).
  - There is no exit motion. `Placement.destroy` hides the popover and restores its inline state at once (`Placement.ts:241`–`261`), so an exit would paint without its anchor.

**6. Reduced motion**
- Every transition goes through the `transition` mixin, including the `scale-in` list and the dropdown's list.
- The placeholder glow and wave each get `@include reduced-motion { animation: none }` (`_placeholder.scss:33`, `:55`), as `styles.md:52` requires. Record them as addition rows.
- The spinner keeps its slowdown (`_spinner.scss:75`), which both Bootstrap and Elements use. Setting `animation: none` would make `.spinner-grow` invisible, because it rests at `opacity: 0` (`_spinner.scss:63`). This keep conflicts with `styles.md:52`; see Tensions.

**Token changes**
- Add `--vn-motion-slide`.
- `--vn-motion-panel`, `--vn-ease-panel`, and `--vn-ease-out` gain consumers.
- Nothing is renamed or retired. The scales stay literals, following Elements, so exit criterion 6 needs no token group for them.

**Rendered proof, per unit**
- The test drives the real change: an engine call or a class write.
- It reads `getAnimations()` on the moving element and asserts the property, the duration equal to the resolved token, and the easing.
- It seeks `currentTime` to 0 and to the midpoint and reads the computed transform, opacity, or size.
- Under the reduced-motion preference, it asserts that no animation runs.
- The helper `sampleTransition` lands in `tests/setupStyles.ts` with its first consumer.

## Alternatives

- **Keep Bootstrap's values and only route them through tokens.** This leaves the motion stock Bootstrap, which the Elements tenet forbids, and exit criterion 8 would then have no motion departures to record. Refuse.
- **Adopt Elements' native mechanisms everywhere** (`@starting-style`, `allow-discrete`, and root `interpolate-size`). This duplicates the engine's reflow and settle sequence and contradicts E27. Refuse, except for the dropdown entry.

## Constraints

## Refusals

## Measurements

## Units

Every unit writes on Veneer `main`. Run them one at a time, because each one edits `guides/veneer.md`.

Every unit owns its partial, its style test, and the guide's departure, addition, token, and styles-prose rows for its component. Every unit treats these as off-limits: `src/browser/**`, `tests/src/browser/**`, the guide's engine sections, `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupPolicy.ts`, and `tests/policy.test.ts`.

The acceptance criteria every unit shares, cheapest first:
1. The styles project is green.
2. The rows the ledger gate prints are exactly the rows the unit added.
3. `test:conformance`, `test:guides`, and `test:policy` are green.
4. The Tailwind proofs are green.
5. The rendered proof turns red when the token reverts to Bootstrap's literal. Prove this with a plant.

Each unit is audited on the engine that did not write it.

**Run order:**
1. **E-ID-MOTION-REDUCED** (`sol`, Astra). Owns `_placeholder.scss` and its test, plus the spinner prose if the ruling changes it. Acceptance: under emulated reduced motion, the browser reads `animation: none`.
2. **E-ID-MOTION-COLLAPSE** (`sol`, Astra). Owns `_collapse.scss`, `_accordion.scss`, their tests, and the `sampleTransition` helper in `tests/setupStyles.ts`.
3. **E-ID-MOTION-FADE** (`sol`, Astra). Owns `_fade.scss` and every style pin the suite shows reading `linear`.
4. **E-ID-MOTION-BACKDROP** (`sol`, Astra). Owns the `overlay-backdrop` mixin and the proofs for the modal and offcanvas backdrops.
5. **E-ID-MOTION-MODAL** (`opus`, Opus 5.5). Owns `_modal.scss`.
6. **E-ID-MOTION-OFFCANVAS** (`sol`, Astra). Owns `_offcanvas.scss`.
7. **E-ID-MOTION-CAROUSEL** (`sol`, Astra). Owns `_carousel.scss`, `_tokens.scss` (`--vn-motion-slide`), `tokens.test.ts`, and the guide token row at `:7184`.
8. **E-ID-MOTION-FLOAT** (`opus`, Opus 5.5). Owns the `scale-in` mixin and the tooltip, popover, toast, and dropdown partials and tests.

**Pending shared changes for the engine session.** Record each one in the plan file under § Pending shared changes before its unit lands. Per E26, the pins read the resolved token rather than a literal.
- COLLAPSE: `Collapse.test.ts:57` changes from `0.35s` to the resolved panel duration.
- BACKDROP: the backdrop pins at `Modal.test.ts:105` and `Offcanvas.test.ts:126` change from `0.15s` to the panel duration.
- MODAL: at `Modal.test.ts:105`, the host changes from `0.15s` and the dialog from `0.3s`, each to the panel duration.
- OFFCANVAS: `Offcanvas.test.ts:108` changes from `0.3s` to a panel-duration pair, and the engine prose at `guides/veneer.md:2500` changes to match.
- CAROUSEL: `Carousel.test.ts:105` keeps its duration and changes its easing.
- FLOAT:
  - `Tooltip.test.ts:361`, `Popover.test.ts:208` and `:271`, and `Toast.test.ts:74` and `:167` read a two-entry duration list.
  - Candidate change: defer `Placement.destroy` until the menu settles, which would allow a dropdown exit motion.

## Tensions

- **Spinner against `styles.md:52`.** The rule and the rendered result conflict. The options are to record an exclusion in the guide or to amend the scaffold rule, and amending the rule is the user's call. I recommend surfacing it to the user.
- **Chevron timing.** The chevron runs on the panel pair rather than Elements' 150ms marker.
- **Offcanvas opacity.** It is an addition to the markup contract's appearance.
- **Indicators.** They run on feedback timing rather than slide timing.
- **Dropdown.** The entry motion has no matching exit.
- **Modal entry.** Scale replaces Bootstrap's slide-down, which Bootstrap users will notice.
- **Departure against addition.** For declarations where Bootstrap writes nothing, the ledger gate's printed rows decide which table the row goes in.

## Risks

- **Chromium `@starting-style` hazard.** Run the rendered proof on Chromium 141 and on Chromium 153.
- **Tip placement during the scale.** `Placement` measures rectangles that include transforms, so the side attribute and the arrow might be computed on the tip at `scale(0.98)`. Evidence needed: an arrow-position reading taken during the entry.
- **Toast state classes.** Veneer's Toast engine might not use `.showing` as the transparent state. Read the engine's class sequence before FLOAT is briefed.
- **Carousel feel.** The stiff curve over 600ms leaves a long slow tail. Evidence needed: capture films ruled through the polish skill.
- **Missing reading.** The dispatch did not supply whether reduced-motion emulation is reachable from the styles browser project. Units REDUCED and COLLAPSE need that reading.

Files cited:
- /home/user/scaffold/.orkestrel/veneer/units/e-id-motion-design-brief.md
- /home/user/scaffold/.orkestrel/veneer/units/e-id-motion-terrain-result.md
- /home/user/veneer-probe/src/styles/_mixins.scss
- /home/user/veneer-probe/src/styles/components/_offcanvas.scss
- /home/user/veneer-probe/src/styles/components/_spinner.scss
- /home/user/veneer-probe/src/browser/Placement.ts
- /home/user/elements/src/styles/surfaces/_popover.scss
