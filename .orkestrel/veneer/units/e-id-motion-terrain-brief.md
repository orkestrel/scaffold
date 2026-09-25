# Unit E-ID-MOTION-TERRAIN — the motion Veneer ships against Bootstrap 5.3.8 and Elements

## Role and engine

`grok` bridge driving Cursor Grok, read-only. The driver carries this brief across unaltered and returns the journal
path, the session id, and Grok's answer. Grok performs the reading itself and spawns nothing.

## Objective

Map every transition and animation Veneer ships, its Bootstrap 5.3.8 source value, and the Elements counterpart, so the
design round can rule which Elements motion Veneer adopts for its panels and interactions (the user's ruling E26 gives
the collapse, modal, offcanvas, and carousel motion to this session; Veneer's exit criterion 8 requires the motion
rulings to land as recorded departures).

## Context

**Evidence.** Veneer checkout `/home/user/veneer-probe` (detached at Veneer `main` `0865c67`): source `src/styles/`
(tokens in `src/styles/_tokens.scss`, the `transition` mixin in `src/styles/_mixins.scss`), guide `guides/veneer.md`
(its `### Departures` and additions tables and its token tables), style tests `tests/src/styles/`, engine tests
`tests/src/browser/`. Bootstrap 5.3.8 at `/home/user/veneer-probe/node_modules/bootstrap/` (`scss/_variables.scss`,
`scss/mixins/_transition.scss`, `scss/_transitions.scss`, `scss/_modal.scss`, `scss/_offcanvas.scss`,
`scss/_carousel.scss`, `scss/_accordion.scss`, `scss/_toasts.scss`, `scss/_tooltip.scss`, `scss/_popover.scss`,
`dist/css/bootstrap.css`, and `js/src/` for any duration the script reads). Elements checkout `/home/user/elements`
(`src/styles/_tokens.scss` lines 85 to 165 hold its motion contract; `src/styles/elements/_dialog.scss`,
`_details.scss`, `_button.scss`, `_summary.scss`; `src/styles/surfaces/_backdrop.scss`, `_view-transition.scss`;
`src/styles/composables/_carousel.scss`, `_toast.scss`; `src/styles/components/_aside.scss`, `_nav.scss`;
`src/browser/` for motion driven from script).

**Law.** Read-only. `/home/user/scaffold/AGENTS.md` § Writing governs the answer's prose.

**Host.** Linux. Read files and run `grep` only. Write nothing.

## Unknowns

None.

## Scope

Read-only. Write nothing.

## Execution

Answer with `file:line` citations and no raw dumps, one section per site.

1. **Tokens.** Each Veneer motion token (`--vn-factor-motion`, `--vn-motion-feedback`, `--vn-motion-panel`,
   `--vn-ease-standard`, `--vn-ease-out`, `--vn-ease-panel`): its declared value, every consumer in `src/styles/`
   (or "no consumer"), the guide row that documents it, and the test that reads it. Each Elements motion token
   (`--set-transition-duration`, `--set-motion-duration`, `--set-motion-timing-function`, `--set-motion-slide-distance`,
   and any other `--set-motion-*` or duration token): its value, its stated purpose, and every consumer.
2. **Panels.** For each of Collapse (`.collapsing`, vertical and horizontal), Accordion (the button and the chevron),
   Modal (`.modal.fade .modal-dialog`, `.modal.show`, the static-backdrop scale, `.modal-backdrop`), Offcanvas (the
   panel slide and its backdrop), and Carousel (the slide, `.carousel-fade`, the controls, the indicators): a table of
   property, Bootstrap 5.3.8 value (Sass variable and compiled), Veneer value, and the Elements counterpart's value (the
   element or composable Elements uses for the same interaction), each with `file:line`. Include entry and exit
   geometry (a translate, a scale, a slide distance), durations, timing functions, the properties transitioned, and
   whether the counterpart uses `@starting-style`, `transition-behavior: allow-discrete`, `interpolate-size`, or
   `calc-size()`.
3. **Fades and feedback.** The same table for `.fade` (and each Bootstrap component that uses it: Alert, Toast,
   Tooltip, Popover, Modal, Tab panes), and for the feedback transitions (button, form control, form select, form
   range, form check, pagination, nav link, icon link, progress bar), with Elements' counterparts.
4. **Reduced motion.** Bootstrap's `$enable-reduced-motion` and `transition` mixin output; Veneer's `transition` mixin
   output; Elements' reduced-motion handling, each with `file:line`; and every place any of the three reads motion
   from script (a duration read, `getAnimations`, `transitionend`).
5. **Records and pins.** Every `guides/veneer.md` row that states a transition, duration, or timing value, and every
   test under `tests/src/styles/` or `tests/src/browser/` that pins one of those values or varies `--vn-factor-motion`,
   each with `file:line` and the value it pins.
6. **Elements interaction animations outside those panels.** Any other transition or keyframe Elements ships on an
   interactive surface (hover, press, focus, open and close, toast entry and exit, dropdown or menu entry), with the
   Bootstrap and Veneer counterpart or "none".

## Output

The sections in order, each a short table with citations. Under 2000 words. No recommendations.
