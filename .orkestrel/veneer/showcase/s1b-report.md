Implemented and committed groups (f)–(j). **All requested gates pass, but both runtime budgets remain unmet.** The original 485 rows were reduced to 302; 262 new rows bring the final inventory to **564 component rows**. The working tree is clean.

Final timings below come from the [JSON report](/home/user/.wave/veneer-wt-sc/tmp/codex/s1b-final-journey2.json).

| Table | Before → final rows | Final variant | Time |
|---|---:|---|---:|
| Button | 24 → 16 | dark-1280 | 7.79s |
| Alert | 8 → 6 | light-1280 | 17.59s |
| Collapse | 40 → 28 | dark-390 | 15.02s |
| Accordion | 120 → 86 | light-390 | 34.49s |
| Tab/pill/list | 72 → 48 | dark-1280 | 29.88s |
| Dropdown | 165 → 88 | dark-1280 | 52.72s |
| Tooltip | 24 → 30 | dark-390 | 41.00s |
| Popover | 32 → 20 | light-1280 | 15.63s |
| Toast | 0 → 24 | light-390 | 25.76s |
| Carousel | 0 → 50 | light-1280 | 49.51s |
| Offcanvas edges/live example | 0 → 26 | dark-1280 | 25.10s |
| Modal | 0 → 34 | light-1280 | 35.21s |
| Navbar, 390px | 0 → 34 | dark-390 | 37.70s |
| Navbar, 1280px | 0 → 14 | dark-1280 | 13.22s |
| Responsive drawers, 390px | 0 → 20 | dark-390 | 19.66s |
| Responsive drawers, 1280px | 0 → 4 | dark-1280 | 3.93s |
| Scrollspy, 390px | 0 → 18 | light-390 | 58.00s |
| Scrollspy, 1280px | 0 → 18 | light-1280 | 25.91s |

Dropdown comprises 80 retained rows plus eight nested-dialog rows; tooltip comprises 18 retained rows plus 12 nested-dialog rows. Header face/theme tables remain four rows each, executed in every variant.

The tables prove these states, doors, and refusals:

| Family | States and doors | Refusal or unchanged rows |
|---|---|---|
| Button | Pressed/unpressed; click, Enter, Space | Escape |
| Alert | Shown/removed; dismiss by click, Enter, Space | Escape |
| Collapse | Hidden/shown; pointer and keyboard toggles | Escape; rapid second Enter during transition |
| Accordion | None or selected header; open, close, sibling switch | Escape; rapid second Enter |
| Tab/pill/list | Selected tab; four arrows, Home, End, selected-tab click | Selected click, boundary Home/End, Escape |
| Dropdown | Hidden/shown; click, Enter, arrows, item selection, outside click, Escape | Hidden Escape/outside click; arrows while shown |
| Tooltip | Hidden/shown; hover, focus, leave, blur; nested click latch and dialog dismissal | Repeated hover; section Escape; retained visibility while another trigger remains active |
| Popover | Hidden/shown; click, Enter, Space | Escape |
| Toast | Hidden/shown; `aria-controls` show buttons and named dismiss buttons | Escape; repeated show stays shown and emits show/shown |
| Carousel | Slide index; previous/next, keyboard activation, arrow keys, indicators | Current indicator; Escape |
| Offcanvas | Hidden/shown; pointer/keyboard open and dismiss, Escape, backdrop | Hidden Escape; Tab remains inside |
| Modal | Hidden/shown; opener, every dismiss control, Escape, backdrop | Static Escape/backdrop emit `hidePrevented`; hidden Escape; Tab containment; rapid activation |
| Navbar | Collapsed/expanded at rendered widths; pointer/keyboard toggle | Escape; rapid second Enter |
| Responsive drawers | Hidden/shown at rendered widths; open/close controls | Hidden Escape; Tab containment |
| Scrollspy | Feedback, Disclosure, Overlays, Motion; actual keyboard scrolling | Escape; Home/End at their boundaries |

Every added group had an intentional red expectation before restoration. These excerpts identify the failing rows; each red run exited **1**:

| Group | Red-first excerpt |
|---|---|
| Toast | `Close the upload toast hidden through show:click` |
| Carousel | `Next route slide 0 through next:click` |
| Offcanvas | `Open the start panel through open:click` |
| Modal | `Open the archive dialog through open:click` |
| Nested menu | `Example menu false through click` |
| Nested hint | `Dialog hint through hover` |
| Navbar, both widths | `Field notes hidden through click` |
| Responsive drawers, both widths | `xxl drawer through open:click` |
| Scrollspy, both widths | `Scrollspy Feedback through {End}: Condition "Scrollspy selects Feedback" did not hold within 1000ms` |

The restored scopes passed before their group commits. Initial modal diagnostics also exposed backdrop hit-testing failures; the helper now clicks an exposed painted point outside the dialog. Nested controls are inventoried after their dialog opens.

All final gates were read with their exit codes:

| Gate | Exit | Result |
|---|---:|---|
| `format:check` | 0 | 355 files formatted correctly |
| `lint:check` | 0 | No diagnostics |
| `check` | 0 | Root, six src, and three app configurations pass |
| `test:app:browser` | 0 | 218 passed; 8 files |
| `test:setup:browser` | 0 | 78 passed; 2 files |
| Locked `test:journey` | 0 | 66 passed; all 4 variants |
| `test:policy` | 0 | 119 passed, 1 skipped |

The required initial build and toast showcase rebuild also exited **0**.

The final full journey took **330.33s**, compared with **188.79s** for J0b and the requested **235s** limit. An intermediate full run after initial tuning took **292.78s**.

| Variant | J0b project wall | Final project wall | Component tables | Header tables | All statecharts |
|---|---:|---:|---:|---:|---:|
| light-1280 | 151.81s | 312.43s | 143.86s | 20.99s | 164.85s |
| dark-1280 | 156.30s | 315.17s | 132.63s | 24.62s | 157.25s |
| light-390 | 169.97s | 305.95s | 118.25s | 19.25s | 137.50s |
| dark-390 | 176.49s | 303.73s | 113.37s | 21.14s | 134.50s |

The projects finish within **11.44s** of one another. Every project exceeds the 45-second aggregate statechart budget. Dropdown (**52.72s**), carousel (**49.51s**), and narrow scrollspy (**58.00s**) individually exceed it. Their distinct transitions were retained, as directed.

The deviations and unavailable G2 doors are:

- **Moving-sibling refusal:** G2 predicts refusal, but rapid sibling activation produces `show(shipping), show(returns), shown(shipping), shown(returns)`. The installed Bootstrap data API also finishes with both initialized panels expanded. Those proposed refusal rows were omitted. The [retained Bootstrap proof](/home/user/.wave/veneer-wt-sc/tests/setupBrowser.test.ts:146) passes; no Veneer-specific departure was established.
- **Scrollspy assumptions:** Adjacent section order is not a reliable expectation at both widths. Activation depends on viewport geometry, direction, and prior intersections. Rows now restore a consistent boundary and approach before scrolling.
- **Disabled component doors:** No live disabled button toggle, alert dismiss, dropdown toggle/item, tab, modal/offcanvas trigger or dismiss, toast dismiss, tooltip-disable control, or scrollspy link supplies the corresponding G2 refusal. Static disabled/frozen examples remain covered by existing journeys.
- **Imperative idempotence:** Collapse/accordion expose toggles, not separate already-shown `show` or already-hidden `hide` controls. Equivalent dropdown, modal, offcanvas, and hidden-toast API calls are not reachable page controls. Hidden dismiss controls and removed alerts cannot receive user activation.
- **Alert/toast availability:** Alerts have no show door. Four initially shown toasts have dismissal only. The two showable toasts disable autohide, so timer-driven dismissal is unavailable.
- **Carousel transition doors:** Live carousels lack `.slide` and `data-bs-ride`; mid-slide refusal, queued indicators, and autoplay cannot be driven on these specimens.
- **Responsive availability:** At 390px, seven navbar togglers and five drawers render; at 1280px, Field notes, the xxl navbar, and the xxl drawer render. The always-expanded toggler never renders; dark navbar togglers have no engine route.
- **Programmatic controls:** Tooltip enable/disable and event-cancellation hooks, including scrollspy `preventDefault`, have no user-facing controls.

Only the four authorized toast `aria-label` attributes changed in page source, followed by rebuilding `showcase/browser.html`. No installs, network calls, pushes, or unowned source edits were made.

Commits, all carrying the required trailers:

- `c4f29cf6f6dd5a507f040bdddaa8fc0bf83c0faa` — tuning and toast
- `ca3846b76dd55b89b19b4be9047a939afb1c2456` — carousel
- `4fef0d09a64987e0cfc752221b827eed6591d566` — overlays and nested dialog controls
- `18960a2f1d0689ada4f819f46023d18351256bab` — responsive navigation and drawers
- `1c7c7be259686473a25fbe1f92c9248ce3a8cc01` — scrollspy
- `d5814a87d6184e58e9e07b6bffa9c54876230876` — final tuning, balancing, and Bootstrap sibling evidence