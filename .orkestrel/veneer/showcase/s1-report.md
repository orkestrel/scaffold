Stopped at group **(f), toast**, as the brief’s deviation contract requires. Groups **(a)–(e)** are committed: eight tables, **485 scenario rows**, with scoped green runs. S1 remains incomplete.

Expected: each live toast dismiss control is reachable by region, role, and accessible name. Found: four buttons named “Close” share the “Toasts” region; the stacked toasts have no independently named regions. The diagnostic failed before activation:

> `Interactive target "Close" is ambiguous across 4 elements inside "Toasts"`

Evidence: [toast controls](/home/user/.wave/veneer-wt-sc/app/browser/sections/toasts.html:26), [stacked specimens](/home/user/.wave/veneer-wt-sc/app/browser/sections/toasts.html:85). Resolving these controls requires a page naming change outside the authorized files. The diagnostic was removed; the working tree is clean.

The implemented tables use the Bootstrap face. Each red-first excerpt below identifies the deliberately broken row reported in `expected [ … ] to deeply equal []`; expectations were restored before the green run and commit.

| Family | States and doors proved | Unchanged/refusal rows | Rows / variant | Red-first failing row |
|---|---|---|---|---|
| Button | Pressed false/true; click, Enter, Space | Escape | 24 / light-390 | `Email updates false through click` |
| Alert | Shown → removed; click, Enter, Space | Escape stays shown | 8 / dark-390 | `Close through click` |
| Collapse | Hidden/shown; click, Enter, Space | Escape; repeated Enter during transition | 40 / light-1280 | `Depot hours hidden through click` |
| Accordion | Expanded header or none; click, Enter, Space; sibling closes | Escape; repeated Enter during transition | 120 / dark-1280 | `none through Shipping and delivery click` |
| Tab, pill, list | Selected name; four arrows, Home, End, selected click | Selected click and Escape preserve selection | 72 / light-1280 | `Navs and tabs Shipment through {ArrowRight}` |
| Dropdown | Hidden/shown; click, Enter, arrows, Escape, outside click, every menu item | Hidden Escape; shown arrows retain expansion and move focus | 165 / light-390 | `Export false through click` |
| Tooltip | Hidden/shown; hover, focus, leave, blur | Shown Escape and repeated hover | 24 / dark-390 | `Hint above through hover` |
| Popover | Hidden/shown; click, Enter, Space toggle | Escape | 32 / dark-390 | `Customs status false through click` |
| Toast | Not implemented; dismiss accessibility blocker | Not proved | Unassigned | Diagnostic failure quoted above; not a red-first control |
| Carousel | Not implemented | Current indicator, sliding refusal and queued selection unproved | Unassigned | Not run |
| Offcanvas | Not implemented | Already shown/hidden refusals unproved | Unassigned | Not run |
| Modal, including static and nested controls | Not implemented | Static Escape/backdrop and transition refusals unproved | Unassigned | Not run |
| Navbar collapse | Not implemented | Viewport-dependent reachability unproved | 390/1280 required | Not run |
| Responsive drawers | Not implemented | Viewport-dependent reachability unproved | 390/1280 required | Not run |
| Scrollspy | Not implemented | Unchanged activation/refusals unproved | 390/1280 required | Not run |

Scoped validation completed:

| Check | Exit | Result |
|---|---:|---|
| `npm run build` | 0 | Build completed |
| Root TypeScript check | 0 | No diagnostics |
| Lint on the three changed files | 0 | No diagnostics |
| Targeted setup tests, after group (a) | 0 | 2 passed, 70 filtered |
| Button + alert journeys | 0 | 4 passed, 24 filtered; 32.39 s |
| Collapse + accordion journeys | 0 | 4 passed, 28 filtered; 174.74 s |
| Tab journey | 0 | 1 passed, 16 filtered; 65.36 s |
| Dropdown journey | 0 | 1 passed, 17 filtered; 85.54 s |
| Tooltip + popover journeys | 0 | 2 passed, 18 filtered; 56.92 s |
| Toast accessibility diagnostic | 1 | 1 failed, 20 filtered; 12.87 s |
| Final `git diff --check` | 0 | Clean |

The two-project scoped runs count table tests whose bodies return on the other assigned variant; each actual table executes once. Every journey ran under the required lock.

The mandatory final gates were not reached because work stopped before the last group:

| Gate | Exit code / counts |
|---|---|
| `npm run format:check` | Not run |
| `npm run lint:check` | Not run |
| `npm run check` | Not run |
| `npm run test:app:browser` | Not run |
| `npm run test:setup:browser` | Not run |
| Locked `npm run test:journey` | Not run |
| `npm run test:policy` | Not run |

Per-project journey wall times, using the J0b JSON baseline:

| Project | Before | After |
|---|---:|---|
| light-1280 | 151.810 s | Not measured |
| dark-1280 | 156.295 s | Not measured |
| light-390 | 169.966 s | Not measured |
| dark-390 | 176.488 s | Not measured |

Five commits were created in the requested order, each with both required trailers:

| Group | Commit |
|---|---|
| Button + alert | `301fb50814d829ef9cfed51ec811252b01dc4baa` |
| Collapse + accordion | `fd1e7eb9e3672cdbe03672a04189a621f35470e5` |
| Tab, pill, list | `25afed5102c71af671da326ce4cb2678bf1040ac` |
| Dropdown | `7ea655be28b4ab165ba303f6a2ae99d579fcd315` |
| Tooltip + popover | `ba41d9751f092b15bda652f0a29c0ad947bcb308` |

Other deviations and coverage limits:

- G2’s disabled-control refusals lack live specimens: button, alert dismiss, dropdown toggle, tab click/keyboard skipping, modal trigger/dismiss, offcanvas toggle, toast dismiss, disabled tooltip, and disabled scrollspy link.
- Alert has no show control. The four initially shown toasts have only dismiss controls. Both showable toasts disable autohide, and no carousel enables automatic riding.
- Collapse controls expose toggling, not separate already-shown `show()` or already-hidden `hide()` doors. Repeated activation is covered; the accordion sibling-in-transition refusal remains unproved.
- Unselected tabs have `tabindex="-1"`; tables reach them through arrows, as instructed.
- Nested modal dropdown and tooltip coverage remains deferred. Navbar togglers and responsive drawer buttons disappear above their breakpoints; dark navbar examples have no live toggle attribute.
- Later families were not exhaustively assessed after the stop. No claim is made that their remaining doors are covered or unavailable.
- The accordion table exceeded the initial timeout; the harness now derives its timeout from table size. Final variant balancing remains unverified without the full journey run.

No page or engine files were edited. No agents were spawned, packages installed, external network used, or commits pushed.