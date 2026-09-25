# J-ORACLE census, first reading — the Orchestrator's triage (2026-09-25)

**Source.** J-ORACLE-RECORD's census of Veneer at `0865c67` against the Bootstrap 5.3.8 fixtures it recorded on Chromium 153. The census is `units/j-oracle-record-report.md` § Census table, with the raw readings in `units/j-oracle-record-census/`.

E28 puts the authoritative census after the engines units land. This reading is preliminary: each row gets a carrier now, so no finding waits on a later reading. The census runs again when J-SAMEWAY-ENGINES-A and -B have landed.

Collapse, Alert, Tab, and ScrollSpy show no departure.

## Rulings

| Plugin | Difference | Ruling | Evidence | Carrier |
| --- | --- | --- | --- | --- |
| Dropdown | `data-popper-placement` reads `bottom` where Bootstrap writes `bottom-start` | **Defect.** Bootstrap writes the full placement, side and alignment, and a consumer selector on the full value misses Veneer's menu. | `Placement` writes the resolved side alone. | J-ORACLE-FIX-PLACEMENT, after J-SAMEWAY-ENGINES-B, serialized with J-PLACEMENT-141's fix |
| Dropdown, Tooltip, Popover | the `popover` attribute (`manual` or `hint`) on the menu or the tip | **Intentional departure.** The native top-layer promotion is the ruled placement mechanism (the design verdict's R9, and `Placement`). | `Placement.ts` promotes with the HTML `popover` attribute. | a `### Departures` row at J-ORACLE-GATE |
| Carousel | the `pointer-event` class on a device without touch | **Defect.** Bootstrap adds it only where `Swipe.isSupported()` reads true (`'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0`, `util/swipe.js` around line 141, gated at `carousel.js` around line 214). Veneer's `Swipe` adds it whenever `touch` is true. | the census; `util/swipe.js` | J-TOAST-SWIPE, which grows `Swipe` (E33, amended). The toast takes the same gate. |
| Modal, Offcanvas | the `inert` attribute on the page outside the overlay | **Intentional departure.** `Isolation`'s native-first isolation (D41) replaces Bootstrap's focus trap. | `Isolation` | a `### Departures` row at J-ORACLE-GATE |
| Offcanvas | after a backdrop press under reduced motion, focus reads `body` where Bootstrap's reads the trigger | **Defect.** Both engines close on the backdrop's `mousedown`. Bootstrap completes the hide after its transition timer, so the press's own focus change comes first and focus then returns to the trigger. Veneer's reduced-motion hide completes inside the `mousedown` listener, returns focus, and then the press's default action moves focus to `body`. | `Offcanvas.ts` listens for the backdrop's `mousedown`; the census step `offcanvas.reduced.point.backdrop` | J-ORACLE-FIX-OFFCANVAS, after J-MOTION-PROOFS-A lands. It reads Modal's backdrop path for the same order. |
| Toast | no `hide` class after a hide | **Intentional departure.** Bootstrap marks the class `@deprecated - kept here only for backwards compatibility` (`toast.js` around line 31). | `toast.js` | a `### Departures` row at J-ORACLE-GATE |
| Tooltip | no `data-bs-original-title` on the trigger | **Intentional departure.** Bootstrap writes it with the comment `DO NOT USE IT. Is only for backwards compatibility` (`tooltip.js` around line 497). | `tooltip.js` | a `### Departures` row at J-ORACLE-GATE |

## Coverage limits the unit recorded

- The ScrollSpy scenario cannot tell the activation's clearing from the leave path's clearing, because each section leaves before the next activates. J-ORACLE-GATE adds a scenario in which a section enters while the previous one is still in view.
- ScrollSpy's offset comparison across offset parents (`units/j-concerns-a-audit-objective-verdict.md`, outside the claims) follows Bootstrap's own `offsetTop` comparison (`scrollspy.js` around lines 166 to 194), so it is parity, not a Veneer defect. J-ORACLE-GATE adds that witness as a scenario. A difference between the engines there would be a departure to rule. Matching end states are parity.
- The fixtures were recorded on Chromium 153. The styles session is asked for a Chromium 141 run before the gate.

## The second reading (J-ORACLE-RECORD round 2, 2026-09-25)

The reader's added facets, which are text, parent, and scroll (E28 amended), read the census again at Veneer `9ea360d` (`units/j-oracle-record-report-2.md` § Census table). Every earlier row stands, and no text or parent departure appears in any plugin. One row is added:

| Plugin | Difference | Ruling | Evidence | Carrier |
| --- | --- | --- | --- | --- |
| ScrollSpy | after a smooth-scroll click, the spy scrolls to `600` where Bootstrap's scrolls to `544` | **Intentional departure.** Bootstrap computes the destination as `observableSection.offsetTop - this._element.offsetTop` (`scrollspy.js` around line 140). A section's `offsetTop` is already measured from the spy when the spy is positioned, as Bootstrap's own documentation requires, so subtracting the spy's own offset leaves the scroll short of the section. Veneer measures the section's box and lands on the section the link names. | the census step `scrollspy.click.third`; `ScrollSpy.ts`, `#scrollTo` | a `### Departures` row at J-ORACLE-GATE |
