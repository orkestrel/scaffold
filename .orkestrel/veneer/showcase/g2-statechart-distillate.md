## 1. Live families

A specimen is live when a control matches an engine route (`src/browser/constants.ts:87-228`) or the toast show path (`app/browser/Showcase.ts:137-151`). `main.ts:4-5` boots that engine on the document. The Interactions group is the `live-components` section (`app/browser/constants.ts:82-83`, `524-528`). Frozen specimens carry engine classes and no `data-bs-*` (`tests/setupBrowser.ts:254-259`). Header Stylesheets and Color mode are live toggles driven by `Showcase.#select` (`app/browser/Showcase.ts:163-185`), not by those routes, and already have tables (`tests/setupBrowser.ts:875-920`, `935-964`).

**Live components** (`app/browser/sections/live-components.html`), region inside `#engine-demo`:

| Specimen | Controls | Targets |
| --- | --- | --- |
| Scrollspy | `#engine-demo` `[data-bs-spy="scroll"][data-bs-target="#example-navigation"]` (`14-16`); links `Feedback`, `Disclosure`, `Overlays`, `Motion` (`1-4`) | `#feedback`, `#disclosure`, `#overlays`, `#motion` (`19`, `78`, `147`, `189`) |
| Alert | `[data-bs-dismiss="alert"]` “Dismiss notice” (`23-28`) | `#example-alert.alert.show` (`21-22`) |
| Button | `#example-button[data-bs-toggle="button"]` “Toggle selection”, `aria-pressed="false"` (`31-39`) | itself |
| Toast | `#show-notification[aria-controls="example-toast"]` “Show notification” (`40-47`); `[data-bs-dismiss="toast"]` “Dismiss notification” (`60-65`) | `#example-toast` `data-bs-autohide="false"` `data-bs-animation="false"` (`49-57`) |
| Tabs | `#details-tab`, `#notes-tab` `[data-bs-toggle="tab"]` (`81-104`) | `#details-pane`, `#notes-pane` (`107-138`) |
| Collapse | `[data-bs-toggle="collapse"][data-bs-target="#example-collapse"]` “Expand details”, `aria-expanded="false"` (`114-123`) | `#example-collapse.collapse` (`124-128`) |
| Modal | “Open dialog” `[data-bs-toggle="modal"][data-bs-target="#example-modal"]` (`150-157`); “Close dialog”, “Done” `[data-bs-dismiss="modal"]` (`240-245`, `278`) | `#example-modal` (`229-235`) |
| Dropdown inside that dialog | `#example-dropdown[data-bs-toggle="dropdown"]` “Example menu” (`251-259`) | following `.dropdown-menu` (`260-262`) |
| Tooltip inside that dialog | `#example-tooltip[data-bs-toggle="tooltip"][data-bs-trigger="hover focus click"]` “Show hint” (`264-274`) | tip from `data-bs-title` |
| Offcanvas | “Open side panel” `[data-bs-target="#example-offcanvas"]` (`158-166`); “Close side panel” (`291-296`) | `#example-offcanvas.offcanvas-end` (`283-288`) |
| Popover | `#example-popover[data-bs-toggle="popover"]` “More context”, `data-bs-animation="false"` (`167-177`) | tip from `data-bs-title` / `data-bs-content` |
| Carousel | “Previous slide” / “Next slide” `[data-bs-target="#example-carousel"][data-bs-slide]` (`203-218`) | `#example-carousel` `.carousel-item` (`191-200`); first item starts `active` |

**Component sections** (same routes):

- **Alert.** `app/browser/sections/alerts.html:138-146`. Control `[data-bs-dismiss="alert"]` “Close”. Target `.alert.alert-warning.alert-dismissible.fade.show` (“Unsaved changes.”).
- **Button.** `app/browser/sections/buttons.html:158-173`. “Email updates” (`active`, `aria-pressed="true"`) and “Desktop alerts” (`aria-pressed="false"`), both `[data-bs-toggle="button"]`. Target is the button.
- **Collapse.** `app/browser/sections/collapse.html`. “Depot hours” → `#collapse-shown-panel.collapse.show` (`6-15`). “Delivery details” → `#collapse-hidden-panel.collapse` (`32-42`). “Order filters” → `#collapse-horizontal-panel.collapse.collapse-horizontal.show` (`62-72`).
- **Accordion** (collapse plus `data-bs-parent`). Default `#accordion-default` (`5-75`): “Shipping and delivery” → `#accordion-default-shipping.show`, “Returns and exchanges” → `#accordion-default-returns`, “Warranty coverage” → `#accordion-default-warranty`. Flush `#accordion-flush` (`96-163`): “Billing cycle”, “Adding seats” (starts open), “Cancelling a plan”.
- **Navbar collapse.** Togglers `aria-label="Toggle navigation"` with `[data-bs-toggle="collapse"]`: `#navbar-full-menu` (`23-34`, starts collapsed, `navbar-expand-lg`), `#navbar-open-menu` (`76-87`, starts `.show`). Expand set (`187-330`): `#navbar-expand-all-menu`, `-sm-`, `-md-`, `-lg-`, `-xl-`, `-xxl-`, each `aria-expanded="false"`. Dark-bar togglers at `navbar.html:136-160` have no `data-bs-toggle`.
- **Navbar dropdown.** “Notebooks” `[data-bs-toggle="dropdown"]` (`94-100`) → `.dropdown-menu` items “Birds”, “Wildflowers”.
- **Dropdowns.** `app/browser/sections/dropdowns.html`. Each toggle `aria-expanded="false"`; target is the following `.dropdown-menu`. “Export” (`57-69`) items CSV file, Excel workbook, PDF summary. Split “More publishing options” (`91-103`). “Status” dropup (`122-134`). “Move to” dropend (`151-163`). “Assign” dropstart (`180-192`). “Sort” / “Zoom” (`209-235`). “Columns” / “Density” (`253-284`). Static `.dropdown-menu.show.position-static` blocks (`5-13`, `28-39`) have no toggle.
- **Tabs.** Panes: “Shipment” → `#navs-tabs-panes-details.show.active`, “History” → `#navs-tabs-panes-history` (`175-221`). Pills: “Route” → `#navs-tabs-pills-route`, “Customs” → `#navs-tabs-pills-customs` (`238-278`). List: “Stock”, “Inbound”, “Outbound” `[data-bs-toggle="list"]` → `#list-group-tabs-stock|inbound|outbound` (`app/browser/sections/list-group.html:276-341`).
- **Modal.** `app/browser/sections/modal.html:5-167`. “Open the archive dialog” → `#modal-live-archive`; dismiss “Close”, “Keep the project”, “Archive the project”. “Open the static dialog” → `#modal-live-static` (`data-bs-backdrop="static"` `data-bs-keyboard="false"`, `80-81`); dismiss “Save the changes” only. “Open the centered dialog” → `#modal-live-centered`; “Close”, “Stay signed in to the workspace”. “Open the scrollable dialog” → `#modal-live-scrollable`; “Close”, “Accept the terms”.
- **Offcanvas.** Edge panels (`app/browser/sections/offcanvas.html:5-120`): “Open the start|end|top|bottom panel” → `#offcanvas-live-start|end|top|bottom`; each dismiss is `aria-label="Close"`. Responsive drawers (`306-507`): “Open the sm|md|lg|xl|xxl drawer” (`d-sm-none` … `d-xxl-none`) → `#offcanvas-sm-panel` … `#offcanvas-xxl-panel`, class `offcanvas-{breakpoint}`. Frames that say they are frozen (`291-292`) have no toggle.
- **Carousel.** No `data-bs-ride` anywhere under `app/browser/sections/`. `#carousel-slides` (`carousel.html:5-80`): indicators “Route 1|2|3” `[data-bs-slide-to]`, “Previous route” / “Next route”. `#carousel-fade` (`101-136`): “Previous photo” / “Next photo”. `#carousel-dark` (`147-198`): “Sketch 1|2”, “Previous sketch” / “Next sketch”. `#example-carousel` as above.
- **Toast.** Shown, dismiss only, all `aria-label="Close"`: Build pipeline (`toasts.html:5-28`), “Invoice INV-2048 sent…” (`44-67`), Mira Patel (`85-110`), Calendar (`112-140`). Hidden, with a show control: “Show the upload toast” `[aria-controls="toasts-live-toast"]` and “Close the upload toast” (`156-178`, `data-bs-autohide="false"`). Live example as above. Show is `Showcase.#notify`, because the data API has no show route (`app/browser/Showcase.ts:20-22`, `137-151`).
- **Tooltip.** “Hint above|to the right|below|to the left” `[data-bs-toggle="tooltip"]` titles “Tooltip on top|the right|below|the left” (`tooltips.html:5-40`). Default trigger is hover focus (`src/browser/types.ts:2061-2064`). The in-dialog “Show hint” adds click.
- **Popover.** “Customs status”, “Delivery status”, “Billing status” `[data-bs-toggle="popover"]` (`popovers.html:5-34`). Default trigger is click (`src/browser/types.ts:2072`). “More context” adds `data-bs-animation="false"`.

Repeated names a later table has to scope by region: “Toggle navigation”, “Close”, “Sections”, and “Export” (toggle at `dropdowns.html:63` and a static item at `32`).

## 2. States and transitions

Settled states are what the interface announces. Transitional classes and wire events are the Bootstrap readings. Events are the names in `src/browser/constants.ts:24-80`, documented on the maps in `src/browser/types.ts:250-458`.

**Button.** States `pressed=false` and `pressed=true` (`aria-pressed` plus `.active`). Click toggles both (`node_modules/bootstrap/js/src/button.js:36-38`). Bootstrap fires no event; the engine fires `toggle.vn.button` after the write (`src/browser/types.ts:260-270`). Same-state door: Escape on the focused button. The page has no disabled `[data-bs-toggle="button"]`. The button route does not guard `disabled` (`src/browser/types.ts:2102`, `src/browser/constants.ts:120-126`); a `disabled` button still does not fire a click.

**Alert.** `shown` (`.show`, text present) → `hidden` (node removed). Doors: click, Enter, Space on `[data-bs-dismiss="alert"]`. Events `close.bs.alert`, then `closed.bs.alert` on the detached node (`src/browser/types.ts:250-254`; `node_modules/bootstrap/js/src/alert.js:44-53`). Escape leaves `shown`. Refusal: a disabled dismiss control returns before `close` (`node_modules/bootstrap/js/src/util/component-functions.js:21-23`). No show door exists.

**Collapse.** `hidden` (no `.show`, trigger `aria-expanded="false"` and `.collapsed`) and `shown` (`.show`, `aria-expanded="true"`). During the move the panel swaps `.collapse` for `.collapsing` (`app/browser/constants.ts:1266-1269`). Doors: click, Enter, Space on the trigger, each direction. Escape leaves the state. Events `show.bs.collapse`, `shown.bs.collapse`, `hide.bs.collapse`, `hidden.bs.collapse` on the panel (`src/browser/types.ts:297-304`). Refusal: `show` while `_isTransitioning` or already shown, `hide` while transitioning or hidden, and a parent show whose open sibling is transitioning (`node_modules/bootstrap/js/src/collapse.js:112-127`, `167-169`). Horizontal is the same chart; the animated axis is width (`collapse.html:79`).

**Accordion.** State is the expanded header name, or `none`. Same collapse doors and events. `data-bs-parent` hides the open sibling when another opens (`accordion.html:86-88`). Refusal rows are the collapse ones, including the sibling-in-transition return.

**Navbar collapse.** Same collapse chart. Above the `navbar-expand-*` breakpoint the collapse is shown by CSS and the toggler is not rendered (`navbar.html:65-66`), so those rows exist only at a width where the toggler is reachable. “Toggle navigation” is ambiguous across bars (`navbar.html:30`, `83`, `191` and the expand set).

**Dropdown.** `hidden` (`aria-expanded="false"`, menu without `.show`) and `shown` (toggle and menu `.show`, `aria-expanded="true"`). Events on the toggle: `show.bs.dropdown`, `shown.bs.dropdown`, `hide.bs.dropdown`, `hidden.bs.dropdown` (`src/browser/types.ts:316-323`). Doors into `shown`: click, ArrowDown or ArrowUp (`node_modules/bootstrap/js/src/dropdown.js:421-425`). Doors back to `hidden`: second click, Escape (only if shown, `428-432`), a document click outside (`442`), choosing an item. ArrowDown while shown stays `shown` and moves the item. Escape while hidden stays `hidden`. Refusal: `show` when disabled or already shown, `hide` when disabled or hidden (`dropdown.js:125-127`, `160-162`). Selector excludes `.disabled` and `:disabled` (`src/browser/constants.ts:83-84`).

**Tab** (`tab`, `pill`, and `list` share one route, `src/browser/constants.ts:156-163`). State is the selected tab’s name. Reading: `aria-selected`, `.active` on the tab, `.active.show` on its pane; the other pane loses `.show`. Unselected tabs get `tabindex="-1"` (`node_modules/bootstrap/js/src/tab.js:146-147`), which is why J8 uses arrows (`tests/app/browser/integration.test.ts:401-402`). Doors: click a tab; ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Home, End from the focused tab (`tab.js:155-176`). Clicking the selected tab returns immediately (`tab.js:82-84`) and stays. Events `hide.bs.tab` / `show.bs.tab` then `hidden.bs.tab` / `shown.bs.tab` (`src/browser/types.ts:411-418`). Refusal: a disabled tab’s click returns (`tab.js:294-296`); keyboard skips disabled children (`tab.js:163`).

**Modal.** `hidden` (no presented `dialog`, `aria-hidden="true"`, no body `.modal-open`, no window `.modal-backdrop`) and `shown` (`role="dialog"`, `.show`, `aria-modal`, body `.modal-open`, one backdrop). Fade specimens pass through `_isTransitioning` (`node_modules/bootstrap/js/src/modal.js:99-112`, `123-135`). Events `show.bs.modal`, `shown.bs.modal`, `hide.bs.modal`, `hidden.bs.modal` (`src/browser/types.ts:335-342`). Doors to `shown`: click, Enter, Space on the trigger. Doors to `hidden`: Escape when `keyboard` is true (`modal.js:207-214`), `[data-bs-dismiss="modal"]`, backdrop click when backdrop is not `static` (`226-239`). Tab while shown stays shown and moves inside the trap. Focus returns to the trigger on `hidden` (journey comment at `integration.test.ts:383`). Static specimen `#modal-live-static`: Escape and backdrop stay `shown` and fire `hidePrevented.bs.modal` (`src/browser/types.ts:343`; `modal.html:80-91`). Refusal: `show` while shown or transitioning, `hide` while hidden or transitioning (`modal.js:99-100`, `124-125`). Disabled dismiss is refused (`component-functions.js:21-23`). The modal toggle route does not guard a disabled trigger (`src/browser/types.ts:2102`); no such trigger is on the page.

**Offcanvas.** `hidden` and `shown` (`role="dialog"` and `aria-modal` are set on show, `node_modules/bootstrap/js/src/offcanvas.js:111-112`). Transitional classes `.showing` and `.hiding` (`offcanvas.js:113`, `142`; `app/browser/constants.ts:1286-1287`). Backdrop `.offcanvas-backdrop`. Events `show.bs.offcanvas`, `shown.bs.offcanvas`, `hide.bs.offcanvas`, `hidden.bs.offcanvas` (`src/browser/types.ts:356-363`). Doors match the modal click/Enter/Space/Escape/Close/backdrop set (`offcanvas.html:127-129`). `show` returns when already `_isShown`, which is set before the slide finishes (`offcanvas.js:94-96`, `104`). `hide` returns when not `_isShown` (`129-131`). A disabled toggle returns (`239-241`). Responsive drawers use this chart only while their `d-*-none` button is rendered.

**Toast.** `hidden` (no `.show`; a `role="status"` that is not presented) and `shown` (`.show`, status presented). `.showing` during the fade; `.hide` is the deprecated hidden class (`node_modules/bootstrap/js/src/toast.js:95`, `114`). Events `show.bs.toast`, `shown.bs.toast`, `hide.bs.toast`, `hidden.bs.toast` (`src/browser/types.ts:430-437`). Show door is the `aria-controls` button, not a data attribute (`Showcase.ts:137-151`). Dismiss door is `[data-bs-dismiss="toast"]`. Both live toasts set `data-bs-autohide="false"`, so no timer. `hide` returns when not shown (`toast.js:103-105`). `show` does not return when already shown (`toast.js:75-99`), so a second show stays `shown` and fires `show` again. Disabled dismiss is refused (`component-functions.js:21-23`). The four `fade show` toasts have only the dismiss door.

**Tooltip.** `hidden` and `shown`. Shown reading: trigger state `described` and one `tooltip` whose name is `data-bs-title` (`integration.test.ts:433-437` is the same reading). Events `show.bs.tooltip`, `inserted.bs.tooltip`, `shown.bs.tooltip`, `hide.bs.tooltip`, `hidden.bs.tooltip` (`src/browser/types.ts:449-458`). Section buttons: hover or focus shows, pointer leave or blur hides; click is not a trigger. “Show hint” also toggles on click (`live-components.html:269`). `toggle` returns when the tip is disabled (`node_modules/bootstrap/js/src/tooltip.js:159-161`). A modal `hide` hides a tip anchored inside it (`src/browser/Tip.ts:83`).

**Popover.** Same tip chart. Section buttons toggle on click (`popovers.html:39-41`); Enter and Space do too because they activate the button. Escape leaves `shown` (click trigger, not a dismiss key). Second click hides. Events use the `bs.popover` names (`src/browser/types.ts:377-386`).

**Carousel.** State is the indicator `aria-current` / the `.carousel-item.active` index. During a move `_isSliding` is set and the item gains `carousel-item-next|prev` and `carousel-item-start|end` (`node_modules/bootstrap/js/src/carousel.js:339`; `app/browser/constants.ts:1254-1263`). Events `slide.bs.carousel`, `slid.bs.carousel` (`src/browser/types.ts:282-285`). Doors: `[data-bs-slide="next"|"prev"]` wrap, `[data-bs-slide-to]` jumps, and ArrowLeft / ArrowRight when the keydown reaches the carousel (`carousel.js:205-207`, `254-258`). The current indicator stays put (`to` returns when the index is current, `181-183`). Refusal: `_slide` returns while `_isSliding` (`301-303`). `to` during a slide queues on `slid` rather than dropping (`175-177`). No specimen sets `data-bs-ride`. Captions are `d-none d-md-block` (`carousel.html:35`, `91-93`); that is paint, not the slide state.

**Scrollspy.** State is which `#example-navigation` link has `.active`. Event `activate.bs.scrollspy` on `#engine-demo` (`src/browser/types.ts:398`; boot route `src/browser/constants.ts:193-198`). The door is scrolling `#engine-demo` so a section crosses the observer. A disabled link is not activated (`node_modules/bootstrap/js/src/scrollspy.js:209`). `preventDefault` on `activate` changes nothing (`src/browser/types.ts:398`).

## 3. Proved already

The only component statechart on the page is the header face and theme tables, run with `executeScenarios` and a harness (`integration.test.ts:661-686`). J7 (`280-326`) drives fields, checks, a radio, a switch, a range, a `#` link, and a submit with no engine. It proves no component transition.

J8 (`330-472`) creates the engine and proves these section-specimen transitions. Everything else in section 2 is **unproved**, including every live-components specimen, every refusal row, scrollspy, navbar, pills as their own chart, and the static modal.

| Transition | Case |
| --- | --- |
| Arrival paints no window backdrop and no dialog | J8 `333-334` |
| Alerts dismiss click removes “Unsaved changes.” | J8 `336-341` |
| “Desktop alerts” → `pressed=true`; “Email updates” stays `pressed=true` | J8 `343-345` |
| “Next route” makes “Route 2” `current` and “Route 1” not | J8 `347-350` |
| Accordion click opens “Returns and exchanges”, collapses “Shipping and delivery”, paints the returns sentence; second click collapses returns | J8 `352-359` |
| “Export” expands; “CSV file” collapses it and leaves the URL | J8 `361-366` |
| Archive dialog opens, Escape closes, focus returns to the trigger, Close closes a reopen | J8 `368-399` |
| Focused “Shipment” ArrowRight selects “History”; “Route” ArrowRight selects “Customs”; “Stock” ArrowDown selects “Inbound”; History pane text | J8 `401-416` |
| “Show the upload toast” shows the Uploads status; “Close the upload toast” becomes unreachable | J8 `418-431` |
| Hover “Hint above” then “Hint below”: `described` moves | J8 `433-440` |
| Click “Delivery status” shows then hides `described` | J8 `442-446` |
| End panel opens, Escape closes, Close closes a reopen, backdrop count returns to 0 | J8 `448-465` |
| Frozen buttons keep their announced states | refusal `487-502`, not a component chart |

## 4. The partial patch

`/home/user/.wave/statecharts-partial.patch` adds twelve tables — modal, dropdown, collapse, accordion, tab, offcanvas, toast, tooltip, popover, carousel, alert, button — in `tests/setupBrowser.ts`, built by `buildComponent` (mount the showcase, `applyTheme`, `applyFace`, `createEngine`). Shared `arrange` / `act` / `assert` phases, one `StateScenario` per row, region-scoped `clickAccessibleWithin` and `pressKeys`. Each table includes one row whose event leaves the state. A harness `it.each` in `integration.test.ts` reads `STATECHART_ATTRIBUTES` on the object and the root. Alert rows remount when the dismiss control has left the document.

Departures from `/home/user/scaffold/.agents/skills/orkestrel-journey/references/statechart.md` and `layer.md`:

- `clickTab`, `hoverButton`, `clickBackdrop`, and `clickHeading` call `userEvent.click` / `userEvent.hover` on a held element. The layer forbids passing an element to a verb and forbids the provider keyboard/pointer from a statechart phase (`layer.md` “What it drives”, “Which helpers take an element”). `hoverAccessible` is the published hover. An unselected tab is not focus-reachable because Bootstrap sets `tabindex="-1"`; the skill says to report that, not to click the node.
- The journey file runs only the harness. `statechart.md` “Run the table” also requires `executeScenarios`. The setup file runs that only for the button table.
- Each harness runs under both stylesheet faces inside every variant. A state reading that does not depend on face or viewport runs once, in the cheapest variant (`SKILL.md` “Read the variant once”).
- State and event are `string`. `statechart.md` types a row on the entity’s unions so a bad state fails to compile, and bars a union invented only to type a table. `VisibilityPhase` is imported from `src/browser/types.ts` for `shown` / `hidden`.
- `buildComponent` reuses one page across rows. The worked table removes the previous fixture in the builder.
- The button negative control expects the sentence `Retry "Buttons reads pressed=false" did not succeed within 5000ms`. `layer.md` says to read the package voice table before asserting a sentence the skill does not list.
- A `PROBE flaky` test swallows errors for tab, offcanvas, and carousel and writes `tmp/probe-flaky.txt`. That is not a declared family.
- Tables omit scrollspy, navbar, list tabs, pills, the static modal, responsive offcanvas, live-components, and the disabled and mid-transition refusals in section 2. Tab covers only Shipment/History. Collapse covers only “Delivery details”. Carousel arrows are on the indicator; Bootstrap listens on the carousel (`carousel.js:205-207`).

Keep: the single table in `tests/setupBrowser.ts`, shared phases, region-scoped clicks, `pressKeys` doors, the unchanged-state row, the harness tally read from the object and from `STATECHART_ATTRIBUTES`, alert remount when the control is gone, and booting the engine the way `main.ts` does. Drop the probe, the `userEvent` element acts, the spelled retry sentence, the both-faces loop, and the engine `VisibilityPhase` import.

## 5. Order and cost

Declared variants are `light-1280`, `dark-1280`, `light-390`, `dark-390` (`configs/app/vite.journey.config.ts:6-11`). One `buildShowcase` is the shared mount. Close every overlay before the next table, and remount after a dismiss that removes a node. Run each chart once in `light-390` on the Bootstrap face, unless the row is viewport-dependent. Skip the body when `inject('variant')` is another name. Header face and theme stay as they are.

1. Button, then alert (remount).
2. Collapse, then accordion (adds `data-bs-parent`), on that same mount.
3. Tab, pill, and list, one table, three specimens.
4. Section dropdowns. The in-dialog “Example menu” waits for the modal chart.
5. Tooltip, then popover.
6. Toast. Show stays the `aria-controls` button.
7. Carousel. Captions depend on `md`; the `aria-current` state does not.
8. Offcanvas edge panels, then modal, including `#modal-live-static` and the live dialog that nests the menu and “Show hint”.
9. Navbar togglers and responsive offcanvas drawers, in every variant whose width shows that button. At 390 the `sm` and wider `d-*-none` buttons and the `navbar-expand-lg` toggler are rendered. At 1280 the `xxl` drawer button and the `navbar-expand-xxl` toggler are rendered; `sm`/`md`/`lg` togglers are not.
10. Scrollspy. The spy box is `ratio-4x3`, so its height follows width. Read it in `light-390` and `light-1280`.

## Unresolved

- Whether any announced component state differs under the Tailwind face. The matrix journey compares resolved styles, not these states.
- Whether scrolling `#engine-demo` changes the active pill at 390 and at 1280. No journey scrolls it.
- The patch is unread by a test run. The flaky probe names tab, offcanvas, and carousel and records no result in the tree.
- No published region-scoped hover was found. Section tooltip names are unique, so `hoverAccessible` is enough there.