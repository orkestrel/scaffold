# Engine audit verdict: veneer browser engine against Bootstrap 5.3.8

The 2026-10-07 audit pins 1028 Bootstrap 5.3.8 behaviors across 13 families of the `@orkestrel/veneer` browser engine: 594 have a proof, 78 are recorded departures, 185 fall outside the contract, and 171 are open claims. The refuters rule on 174 claims, the 171 open claims plus 3 findings outside them (2 in dropdown and 1 in shared): they uphold 162 (31 defects, 129 gaps, and 2 nits), overturn 9, and send 3 to a probe. The upheld claims form 15 fix units, F1 through F15, and 7 questions for you decide the contract wherever a unit can either repair the engine or record a departure. Every count comes from the per-family reader and refuter results of that audit. Engine, test, app, and guide paths are relative to /home/user/veneer; Bootstrap paths are relative to the bootstrap-5.3.8 source tree the readers cite.

Severities are the refuters' grades. A defect is an unrecorded difference from Bootstrap that a page can observe, a gap is a behavior that no proof pins or a difference that the guide states only in prose, and a nit is a difference that no supported runtime or page reaches.

## Totals by family

The following table counts each family's behaviors by reader status and each ruled claim by refuter outcome. The nits column counts upheld nits; an overturned claim counts as overturned whatever its residual grade.

| Family    | Pinned | Covered | Departure | Out of contract | Open | Upheld defects | Upheld gaps | Nits | Overturned | Needs probe |
| --------- | -----: | ------: | --------: | --------------: | ---: | -------------: | ----------: | ---: | ---------: | ----------: |
| alert     |     36 |      18 |         4 |               9 |    5 |              1 |           3 |    0 |          1 |           0 |
| button    |     31 |      16 |         3 |               9 |    3 |              0 |           2 |    0 |          1 |           0 |
| carousel  |     94 |      65 |         1 |               7 |   21 |              3 |          18 |    0 |          0 |           0 |
| collapse  |     60 |      31 |         4 |               8 |   17 |              2 |          13 |    0 |          1 |           1 |
| dropdown  |    106 |      60 |         8 |              11 |   27 |              5 |          21 |    1 |          1 |           1 |
| modal     |    113 |      73 |         7 |              10 |   23 |              3 |          19 |    0 |          1 |           0 |
| offcanvas |     70 |      46 |         7 |              10 |    7 |              3 |           4 |    0 |          0 |           0 |
| popover   |     46 |      29 |         8 |               8 |    1 |              0 |           1 |    0 |          0 |           0 |
| tooltip   |    139 |      78 |        17 |              24 |   20 |              3 |          16 |    0 |          1 |           0 |
| scrollspy |     58 |      39 |         2 |              10 |    7 |              4 |           2 |    1 |          0 |           0 |
| tab       |     57 |      37 |         2 |               7 |   11 |              1 |           7 |    0 |          3 |           0 |
| toast     |     50 |      24 |         7 |               8 |   11 |              1 |          10 |    0 |          0 |           0 |
| shared    |    168 |      78 |         8 |              64 |   18 |              5 |          13 |    0 |          0 |           1 |
| Total     |   1028 |     594 |        78 |             185 |  171 |             31 |         129 |    2 |          9 |           3 |

The dropdown and shared rows each carry rulings on findings outside the open claims: dropdown adds 1 upheld nit and 1 needs-probe finding, and shared adds 1 needs-probe finding.

## Upheld claims by family

Each family section lists every upheld claim with its Bootstrap citation, the engine citation, the refuter's evidence, and the severity.

### Alert

The refuter upholds 4 of the 5 open alert claims; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| The `close` method after completion or destroy does nothing where Bootstrap throws | js/src/alert.js:37-40 after js/src/base-component.js:43-45 | src/browser/Alert.ts:50 | `EventHandler.trigger(null)` returns null (js/src/dom/event-handler.js:259-261), so Bootstrap throws a TypeError at js/src/alert.js:40. tests/src/browser/Alert.test.ts:190 runs only the engine realm and asserts nothing after the call, and no row in guides/veneer.md:722-988 records the error. | gap |
| A second close during the fade queues a second callback that throws in Bootstrap | js/src/alert.js:37-47, js/src/util/index.js:240-250 | src/browser/Alert.ts:51, :54-56, :64, :72 | Both realms dispatch two close.bs.alert events. Bootstrap's second transitionend handler calls `remove` on the nulled host, while the engine's destroy aborts the second wait. No case in tests/src/browser/Alert.test.ts:82-343 clicks twice inside the fade. | gap |
| A close.bs.alert listener that destroys the alert | js/src/alert.js:38-44 | src/browser/Alert.ts:51 | Bootstrap throws at the `classList` read on js/src/alert.js:44 and keeps `show`; the engine returns quietly and keeps `show`. Deleting the destroyed clause at Alert.ts:51 fails no case. | gap |
| An orphan or unresolvable dismiss trigger | js/src/util/component-functions.js:25-29, js/src/dom/selector-engine.js:113-116 | src/browser/helpers.ts:184-188, :715-723; src/browser/plugins.ts:43-44 | (a) With `data-bs-target="["` inside an `.alert` element, Bootstrap throws a SyntaxError and keeps the alert, while the engine falls back to the ancestor and removes it. (b) With no target and no ancestor, Bootstrap throws a TypeError and the engine does nothing. tests/src/browser/helpers.test.ts:377-402 covers neither case. | defect |

### Button

The refuter upholds 2 of the 3 open button claims; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| The `toggle` method after destroy does nothing where Bootstrap throws | js/src/base-component.js:43-45, js/src/button.js:38 | src/browser/Button.ts:45 | Bootstrap throws a TypeError at the `setAttribute` call on the nulled element. tests/src/browser/Button.test.ts:194-202 pins the engine side alone, and the table at guides/veneer.md:718 has no row for a method called after destroy in any family. | gap |
| Only the innermost toggle of nested toggles changes | js/src/dom/event-handler.js:106-118, js/src/button.js:60 | src/browser/Veneer.ts:194 | The engine matches Bootstrap by source, but no fixture nests same-selector triggers, so an outermost-match mutation at Veneer.ts:194 fails no case. | gap |

### Carousel

The refuter upholds all 21 open carousel and swipe claims; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| `data-bs-keyboard="false"` ignores arrow keys | js/tests/unit/carousel.spec.js:114 | src/browser/Carousel.ts:72 | No carousel fixture sets the keyboard option; ignoring it at Carousel.ts:72 fails no case. | gap |
| A non-arrow key stays unprevented | js/tests/unit/carousel.spec.js:180 | src/browser/Carousel.ts:77-78 | The keyboard case at tests/src/browser/Carousel.test.ts:478-483 sends only arrows and editable-target keys; moving the prevention ahead of the key check fails no case. | gap |
| An arrow key during a slide dispatches nothing | js/tests/unit/carousel.spec.js:261 | src/browser/Carousel.ts:238 | Both arrow steps wait for slid (Carousel.test.ts:479-480); dropping the sliding guard fails no case. | gap |
| `data-bs-touch="false"` binds no swipe | js/tests/unit/carousel.spec.js:351 | src/browser/Carousel.ts:90-94 | No fixture under tests or app sets the touch option; ignoring it at Carousel.ts:91 fails no case. | gap |
| A touch-event swipe right goes to the previous item | js/tests/unit/carousel.spec.js:493 | src/browser/Swipe.ts:48-65 | Chromium always exposes PointerEvent, so every case takes the pointer path and the touch-event branch never runs. | gap |
| A touch-event swipe left goes to the next item | js/tests/unit/carousel.spec.js:534 | src/browser/Swipe.ts:48-65 | No touch-event dispatch exists in tests/src/browser/Swipe.test.ts or Carousel.test.ts. | gap |
| A swipe during a slide dispatches nothing | js/tests/unit/carousel.spec.js:576 | src/browser/Carousel.ts:100-101, :238 | Every swipe scenario waits for slid before the next gesture (Carousel.test.ts:388, :580-581). | gap |
| A two-touch move slides nothing | js/tests/unit/carousel.spec.js:621 | src/browser/Swipe.ts:59-60 | No touchmove appears under tests. | gap |
| The `next` method during a slide dispatches nothing | js/tests/unit/carousel.spec.js:688 | src/browser/Carousel.ts:142, :238 | Every method step waits for slid (Carousel.test.ts:449-462); removing both guards fails no case. | gap |
| A restart during a pending slide takes the incoming item's interval | js/tests/unit/carousel.spec.js:804 | src/browser/Carousel.ts:168-169, :296 | The interval scenario sets the attribute on the active item alone and pauses at the first slid (Carousel.test.ts:514-520, :599-601); dropping the pending lookup fails no case. | gap |
| A slide started while cycling keeps cycling | js/tests/unit/carousel.spec.js:824 | src/browser/Carousel.ts:296 | Every cycling path pauses at the first slid; deleting the restart fails no case. | gap |
| A carousel inside a hidden ancestor does not advance | js/tests/unit/carousel.spec.js:912 | src/browser/Carousel.ts:178 | Only the `document.hidden` branch has a proof (Carousel.test.ts:531-540, :593-597). | gap |
| The `prev` method during a slide dispatches nothing | js/tests/unit/carousel.spec.js:931 | src/browser/Carousel.ts:146, :238 | The prev step waits for slid (Carousel.test.ts:451). | gap |
| A second `start` call replaces the interval | js/tests/unit/carousel.spec.js:1000 | src/browser/Carousel.ts:167 | No path starts while a timer is live; removing the clear fails no case. | gap |
| Swipe ignores a pinch | js/tests/unit/util/swipe.spec.js:160 | src/browser/Swipe.ts:59-60 | tests/src/browser/Swipe.test.ts:7-86 dispatches pointer events alone. | gap |
| An `ontouchstart` handler alone marks touch support | js/tests/unit/util/swipe.spec.js:272 | src/browser/Swipe.ts:23, src/browser/Carousel.ts:92 | CDP emulation sets both operands (Swipe.test.ts:49); dropping the `ontouchstart` operand fails no case. | gap |
| The touch end callback does nothing when pause is not hover | js/src/carousel.js:225-227 | src/browser/Carousel.ts:103 | The swipe scenarios never cycle (Carousel.test.ts:512-513, :567-581); deleting the guard fails no case. | gap |
| Swipe disposal leaves the `pointer-event` class in Bootstrap | js/src/util/swipe.js:73-75, :128 | src/browser/Swipe.ts:46-47, :78-82 | The engine removes the class; guides/veneer.md:345 and :662 state it in prose and no row records it; the pins at Carousel.test.ts:252 and Swipe.test.ts:24, :62 are engine-only. | defect |
| Disposal leaves the image dragstart listeners in Bootstrap | js/src/carousel.js:220-222, js/src/base-component.js:41 | src/browser/Carousel.ts:98, :198 | Bootstrap's `off` reaches only the host's handler registry; the engine aborts the listeners; the pins at Carousel.test.ts:226, :253 are engine-only and no row exists at guides/veneer.md:904-942. | defect |
| Disposal leaves the touch timeout live in Bootstrap, which then throws | js/src/carousel.js:157, :242 | src/browser/Carousel.ts:187, :200 | The timeout reads `_config.ride` on null; the engine clears it; the proof at Carousel.test.ts:228-252 is engine-only, and row transition-abort at guides/veneer.md:744 covers transitions alone. | defect |
| A completion after disposal throws in Bootstrap and no row records the error | js/src/carousel.js:315-322, :354-363, :381 | src/browser/Carousel.ts (completion aborted on destroy, guides/veneer.md:656) | Carousel.test.ts:267-271 and :349 assert the oracle's error count but feed no `$::errors` reading into the transcript, unlike alert-destroy (guides/veneer.md:747) and dropdown:focus-destroy (:737). | gap |

### Collapse

The refuter upholds 15 of the 17 open collapse claims; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| A typed element `parent` option drives sibling selection | js/tests/unit/collapse.spec.js:69 | src/browser/helpers.ts:346, src/browser/Collapse.ts:178 | No `createCollapse` call passes a `parent` option; deleting the option read at helpers.ts:346 fails no case. | gap |
| A shown sibling without `data-bs-parent` hides | js/tests/unit/collapse.spec.js:137 | src/browser/Collapse.ts:106-108 | Every fixture sibling carries `data-bs-parent` (tests/setupBrowser.ts:4296; app/browser/sections/accordion.html:22, :46, :69). | gap |
| The `show` method on a settled shown panel dispatches nothing | js/tests/unit/collapse.spec.js:190 | src/browser/Collapse.ts:103 | The data API calls only `toggle` (src/browser/plugins.ts:123); dropping the visible clause fails no case. | gap |
| A parentless show leaves other open panels alone | js/tests/unit/collapse.spec.js:249 | src/browser/Collapse.ts:178-179 | tests/setupBrowser.test.ts:760-776 never has a settled open panel beside the one it shows. | gap |
| A nested accordion scopes its deeper-children filter | js/tests/unit/collapse.spec.js:276 | src/browser/Collapse.ts:182 | The fixture accordion has no `.collapse` ancestor, so removing `:scope` survives tests/src/browser/Collapse.test.ts:339. | gap |
| The `hide` method on a settled hidden panel dispatches nothing | js/tests/unit/collapse.spec.js:434 | src/browser/Collapse.ts:136 | Collapse.test.ts:261 and :289 call `hide` on the oracle alone, and :529 calls it after destroy. | gap |
| A click inside an anchor trigger is prevented | js/tests/unit/collapse.spec.js:516 | src/browser/plugins.ts:120-121 | The target-tag branch decides every shape in Collapse.test.ts:137-171; deleting the trigger-tag clause fails no case. | gap |
| A multi-target trigger shows every target | js/tests/unit/collapse.spec.js:541 | src/browser/plugins.ts:122 | Collapse.test.ts:108-136 builds the shared trigger and never clicks it. | gap |
| A multi-target trigger hides every target | js/tests/unit/collapse.spec.js:565 | src/browser/Collapse.ts:148-152 | No click over shown multi-target panels exists. | gap |
| A multi-target trigger inside an accordion | js/tests/unit/collapse.spec.js:747 | src/browser/Collapse.ts:106-119 | No accordion fixture has a class-selector trigger. | gap |
| A trigger turns collapsed only when its first target hides | js/tests/unit/collapse.spec.js:886 | src/browser/Collapse.ts:148-152 | Collapse.test.ts:172-211 uses single-target triggers; replacing the first-target check fails no case. | gap |
| Markup `toggle` coercion follows `Boolean()` | js/src/collapse.js:212-214, js/src/dom/manipulator.js:17-22 | src/browser/helpers.ts:269-272, :349 | With `data-bs-toggle="0"`, `""`, or `"null"`, `createCollapse` opens the panel where Bootstrap's constructor keeps it closed; guides/veneer.md:638 and :739 cover only leaves that throw a TypeError. | defect |
| A malformed trigger selector throws in Bootstrap | js/src/dom/selector-engine.js:32, :107, :122; js/src/collapse.js:66-76, :286 | src/browser/helpers.ts:715-723 | One `href="."` toggle makes every Bootstrap Collapse construction on the page throw; the engine swallows the error; tests/src/browser/helpers.test.ts:967-968 pins the empty result with no row. | defect |
| A second sibling activated while the first is collapsing opens both | js/src/collapse.js:120-127 | src/browser/Collapse.ts:107, :116, :122-123 | Only the oracle side is recorded (tests/setupBrowser.test.ts:863-929). | gap |
| Every trigger of one panel updates | js/src/collapse.js:66-76 | src/browser/Collapse.ts:55-59 | The only two-trigger fixture (Collapse.test.ts:141) compares `defaultPrevented` alone; a first-match mutation fails no case. | gap |

### Dropdown

The refuter upholds 26 of the 27 open dropdown claims and 1 finding outside them; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| A menu that is its own host opens | js/tests/unit/dropdown.spec.js:62 | src/browser/Dropdown.ts:54-57, src/browser/Placement.ts:206-211 | Every fixture derives from buildDropdown (tests/setupBrowser.ts:4379-4395), which puts the toggle first. | gap |
| An element `reference` option places the menu | js/tests/unit/dropdown.spec.js:485 | src/browser/Dropdown.ts:120-121 | The only element-reference proof constructs Placement directly (tests/src/browser/Placement.test.ts:298-303, :434). | gap |
| A virtual-element reference falls back to the toggle silently | js/tests/unit/dropdown.spec.js:537 | src/browser/types.ts:93, :952; src/browser/Dropdown.ts:120-124 | guides/veneer.md:638 and rows :740-741 refuse only callbacks; no line names a virtual element. | gap |
| The `toggle` method refuses a disabled-attribute host | js/tests/unit/dropdown.spec.js:592 | src/browser/Dropdown.ts:87 | Routing filters the host (src/browser/constants.ts:187, src/browser/plugins.ts:177), so deleting the disabled check fails no case. | gap |
| The `toggle` method refuses a `.disabled` host | js/tests/unit/dropdown.spec.js:619 | src/browser/Dropdown.ts:87 | tests/src/browser/Dropdown.test.ts:189-211 reaches the `dismiss` method alone. | gap |
| The `show` method refuses a disabled-attribute host | js/tests/unit/dropdown.spec.js:729 | src/browser/Dropdown.ts:87 | No case calls `show` on a disabled host. | gap |
| The `show` method refuses a `.disabled` host | js/tests/unit/dropdown.spec.js:756 | src/browser/Dropdown.ts:87 | Dropdown.test.ts:201 adds the class for `dismiss` alone. | gap |
| The `hide` method refuses a disabled-attribute host | js/tests/unit/dropdown.spec.js:896 | src/browser/Dropdown.ts:147 | No case disables an open toggle and calls `hide`. | gap |
| The `hide` method refuses a `.disabled` host | js/tests/unit/dropdown.spec.js:924 | src/browser/Dropdown.ts:147 | Dropdown.test.ts:189-211 proves the refusal in `dismiss` alone. | gap |
| The `hide` method on a closed menu dispatches nothing | js/tests/unit/dropdown.spec.js:952 | src/browser/Dropdown.ts:147 | Every `hide` call runs on an open menu (Dropdown.test.ts:444, :852; tests/src/browser/integration.test.ts:70). | gap |
| The `update` method repositions an open menu | js/tests/unit/dropdown.spec.js:1102 | src/browser/Dropdown.ts:179-181 | No test calls the dropdown's `update` method. | gap |
| A click on a select or option keeps the menu open | js/tests/unit/dropdown.spec.js:1221 | src/browser/Dropdown.ts:168 | The form menu has an input alone (Dropdown.test.ts:688-689). | gap |
| Two dropdowns in one parent resolve their own menus | js/tests/unit/dropdown.spec.js:1489 | src/browser/Dropdown.ts:46-53 | tests/src/browser/Veneer.test.ts:952 gives each dropdown its own parent. | gap |
| Two dropdowns in one parent show the proper menu | js/tests/unit/dropdown.spec.js:1522 | src/browser/Dropdown.ts:46-53, src/browser/plugins.ts:182-191 | Veneer.test.ts:948-999 covers separate parents alone. | gap |
| Keyboard navigation filters items with Bootstrap's selector | js/tests/unit/dropdown.spec.js:1658, js/src/dropdown.js:60, :328 | src/browser/helpers.ts:218, :1332-1341 | The engine skips `<a class="dropdown-item" disabled>`, which Bootstrap focuses, and selects a `.dropdown-item` button inside `<fieldset disabled>`, which Bootstrap skips. | defect |
| Keyboard navigation skips hidden items | js/tests/unit/dropdown.spec.js:1689 | src/browser/helpers.ts:218, :1311-1323 | No menu fixture holds a hidden item. | gap |
| A click on a textarea keeps the menu open | js/tests/unit/dropdown.spec.js:1850 | src/browser/Dropdown.ts:168 | No dropdown fixture holds a textarea. | gap |
| A toggle placed after its menu finds that menu | js/tests/unit/dropdown.spec.js:2200 | src/browser/Dropdown.ts:46, :55 | Every fixture puts the toggle first, and isolating the previous-sibling walk needs a `[menuA, menuB, toggle]` order. | gap |
| The keydown route prevents ArrowUp, ArrowDown, and Escape | js/src/dropdown.js:410 | src/browser/plugins.ts:157 | The key step at tests/setupBrowser.ts:5012-5016 records no prevented reading, unlike the click step at :4994-4998. | gap |
| Arrow keydown stops propagation | js/src/dropdown.js:422 | src/browser/plugins.ts:166 | Only Escape has a proof (Veneer.test.ts:848-892). | gap |
| Offset, reference, boundary, and config reach Placement | js/src/dropdown.js:225-242, :281-325 | src/browser/Dropdown.ts:117-128 | Dropdown.test.ts:631-635 drops every style reading, and every geometry proof constructs Placement directly; guides/veneer.md:654 claims a data-API comparison. | gap |
| `data-popper-placement` appears before shown.bs.dropdown | js/src/dropdown.js:139-156, :241 | src/browser/Dropdown.ts:142-143, src/browser/Placement.ts:125, :243-255 | A shown listener reads null in Bootstrap, whose first Popper update is a microtask (js/tests/unit/dropdown.spec.js:573), and a side in the engine. | defect |
| Outside clearing selects open toggles with Bootstrap's selector | js/src/dropdown.js:55-56, :361, :390 | src/browser/plugins.ts:187-188, src/browser/Dropdown.ts:157 | An open `<a data-bs-toggle="dropdown" disabled>` stays open in the engine and closes in Bootstrap; an open button toggle inside `<fieldset disabled>` closes in the engine and stays open in Bootstrap. | defect |
| The touch workaround skips `.navbar-nav` | js/src/dropdown.js:145 | src/browser/Dropdown.ts:131-132 | Both touch cases use markup outside `.navbar-nav` (Dropdown.test.ts:29-30, integration.test.ts:40). | gap |
| Navbar detection is fixed at construction | js/src/dropdown.js:103, :180, :313 | src/browser/Dropdown.ts:97 | A toggle moved into a `.navbar` element after construction goes static in the engine and stays dynamic in Bootstrap. | defect |
| A `popperConfig` with modifiers positions a static menu | js/src/dropdown.js:313-324 | src/browser/Dropdown.ts:96-100, src/browser/helpers.ts:500 | Bootstrap's spread replaces the disabled applyStyles list; the engine never positions a static menu. | defect |
| A toggle with no menu throws a different error (outside the claims) | js/src/dropdown.js:100-102, :121, :245 | src/browser/Dropdown.ts:89, src/browser/Veneer.ts:203 | Bootstrap throws a TypeError, the engine a `VeneerError` with code DROPDOWN_MENU; guides/veneer.md:634 states the engine side, and no row exists. | nit |

### Modal

The refuter upholds 22 of the 23 open modal, backdrop, scrollbar, and focus-trap claims; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| The `show` method appends a detached host | js/tests/unit/modal.spec.js:136 | src/browser/Modal.ts:196 | Every fixture appends the host before show. | gap |
| A fade modal shows after a vetoed first show | js/tests/unit/modal.spec.js:212 | src/browser/Modal.ts:118-120 | No case calls `show` again after a veto. | gap |
| The `show` method resets the host's scroll position | js/tests/unit/modal.spec.js:321 | src/browser/Modal.ts:201 | The recorder reads non-zero scroll alone (tests/setupBrowser.ts:4777-4781), and no case scrolls the host. | gap |
| The `show` method resets `.modal-body` scroll | js/tests/unit/modal.spec.js:341 | src/browser/Modal.ts:202-203 | buildModal (tests/setupBrowser.ts:4259-4275) has no `.modal-body` element. | gap |
| A resize adjusts a shown dialog | js/tests/unit/modal.spec.js:436 | src/browser/Modal.ts:79-85 | No modal case dispatches resize. | gap |
| A host click with `backdrop: false` keeps the modal | js/tests/unit/modal.spec.js:496 | src/browser/Modal.ts:71-72 | tests/src/browser/factories.test.ts:187-213 never clicks the host. | gap |
| Escape hides a static modal with keyboard on | js/tests/unit/modal.spec.js:553 | src/browser/Modal.ts:58-60 | The Escape-refused scenario sets keyboard off (tests/src/browser/Modal.test.ts:314-317). | gap |
| A second refused dismissal during the bounce starts no bounce | js/tests/unit/modal.spec.js:635 | src/browser/Modal.ts:236-240 | Each case sends one refused dismissal. | gap |
| A click on a removed descendant keeps the modal | js/tests/unit/modal.spec.js:739 | src/browser/Modal.ts:70 | The down-target branch returns first in every case. | gap |
| The `hide` method on a hidden modal dispatches nothing | js/tests/unit/modal.spec.js:769 | src/browser/Modal.ts:129 | tests/src/browser/plugins.test.ts:61-66 asserts registry presence alone. | gap |
| The `hide` method releases the trap when the hide starts | js/tests/unit/modal.spec.js:823 | src/browser/Modal.ts:132 | Every focus reading follows `display: none`, where a stale trap's focus call does nothing. | gap |
| A toggle click on an open modal hides and toggles it | js/tests/unit/modal.spec.js:882 | src/browser/plugins.ts:212-218, src/browser/helpers.ts:840-841 | No case clicks the toggle of an open modal. | gap |
| A prevented show disarms focus restoration | js/tests/unit/modal.spec.js:1112 | src/browser/helpers.ts:831-838 | tests/src/browser/helpers.test.ts:1344 dispatches a non-cancelable event. | gap |
| Backdrop hide resolves with a detached root | js/tests/unit/util/backdrop.spec.js:145 | src/browser/Backdrop.ts:65-76 | tests/src/browser/Backdrop.test.ts:9-71 never detaches the root, and Offcanvas roots its backdrop at the panel's parent (src/browser/Offcanvas.ts:49). | gap |
| Stylesheet body padding adds the width with no saved attribute | js/tests/unit/util/scrollbar.spec.js:291 | src/browser/Lock.ts:75, :117 | Every lock fixture sets padding inline. | gap |
| A fractional scaled-display difference adds no padding | js/tests/unit/util/scrollbar.spec.js:341 | src/browser/Lock.ts:30-37 | No case sets a fractional root padding. | gap |
| A trap with `autofocus: false` leaves focus alone | js/tests/unit/util/focustrap.spec.js:31 | src/browser/Trap.ts:45 | tests/src/browser/Trap.test.ts:114-117 never reads the focused element. | gap |
| Dialog compensation uses a width measured after the lock | js/src/modal.js:114, :118, :296-310 | src/browser/Modal.ts:147-157, src/browser/Lock.ts:30-33 | On a page with a classic scrollbar, the engine writes `paddingRight` on a short modal where Bootstrap writes none; every fixture empties the body (Modal.test.ts:430-438). | defect |
| RTL swaps the compensation side | js/src/modal.js:302, :307 | src/browser/Modal.ts:152-156 | No modal case sets a direction. | gap |
| A prevented hidePrevented event skips the bounce | js/src/modal.js:264-268 | src/browser/Modal.ts:233 | Modal.test.ts:87-109 destroys from the listener and never prevents. | gap |
| A `show` call during the backdrop fade-out | js/src/modal.js:98-100, :245-257 | src/browser/Modal.ts:117, :228 | Bootstrap clears its transition flag before the backdrop fade and emits show.bs.modal; the engine refuses until hidden; no row exists. | defect |
| The full-width test for fixed and sticky content uses the post-lock width | js/src/util/scrollbar.js:64-69 | src/browser/Lock.ts:59, :69, :80 | The engine compensates an element whose `clientWidth` lies within one scrollbar width of the viewport, which Bootstrap skips. | defect |

### Offcanvas

The refuter upholds all 7 open offcanvas claims; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| Escape closes a panel with a static backdrop | js/tests/unit/offcanvas.spec.js:79 | src/browser/Offcanvas.ts:66-68 | The static scenario only clicks the backdrop (tests/src/browser/Offcanvas.test.ts:251-256). | gap |
| The `hide` method on a never-shown panel dispatches nothing | js/tests/unit/offcanvas.spec.js:521 | src/browser/Offcanvas.ts:133 | The statechart door moves focus outside the panel before Escape (tests/setupBrowser.ts:2855-2862), so `hide` never runs. | gap |
| Hide and destroy release the trap | js/tests/unit/offcanvas.spec.js:584 | src/browser/Offcanvas.ts:135, :156 | Every single-panel case leaves the panel hidden, where a stale trap's focus call does nothing. | gap |
| A checkbox trigger stays unprevented | js/tests/unit/offcanvas.spec.js:627 | src/browser/plugins.ts:244-259, src/browser/helpers.ts:94-98 | No input trigger exists, and the native click is absent from ORACLE_EVENTS (tests/setupBrowser.ts:4110-4185). | gap |
| A show during a pending hide keeps the panel open and locked | js/src/offcanvas.js:93-158, js/src/util/scrollbar.js:60, :79-96 | src/browser/Offcanvas.ts:94-101, :116, :180-188; src/browser/Lock.ts:46; src/browser/Backdrop.ts:38 | The engine ends with `show`, no `aria-modal`, an unlocked body, and a live backdrop that nothing dismisses; Bootstrap keeps the panel open and the body locked. | defect |
| A server-rendered `.offcanvas.show` with `aria-modal` opens at load | js/src/offcanvas.js:69, :94, :260-264 | src/browser/Offcanvas.ts:94-101, :116; src/browser/plugins.ts:269 | Boot's `show` call returns early, which contradicts guides/veneer.md:1779. | defect |
| A toggle while an instance-less panel is shown | js/src/offcanvas.js:251-257 | src/browser/plugins.ts:254-258, src/browser/helpers.ts:840-841, src/browser/Registry.ts:56 | Bootstrap throws a TypeError and toggles nothing; the engine opens the target; no row exists. | defect |

### Popover

The refuter upholds the 1 open popover claim; the following table lists it.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| A mouseout after a click-open keeps a `hover click` popover | js/tests/unit/popover.spec.js:319 | src/browser/Tip.ts:340, :374, :384 | No case runs a click and then a mouseout under a trigger set with both; tests/src/browser/Tip.test.ts:2589-2593 uses `hover focus`. | gap |

### Tooltip

The refuter upholds 19 of the 20 open tooltip, template, and sanitizer claims; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| A hover on a child shows a tooltip | js/tests/unit/tooltip.spec.js:469 | src/browser/Tip.ts:86-95, :370-387 | Every hover dispatches on the trigger itself. | gap |
| The `show` method after an external panel removal renders a fresh panel | js/tests/unit/tooltip.spec.js:538 | src/browser/Tip.ts:166, :204, :287 | Only the connected re-show has a proof (tests/src/browser/Tip.test.ts:1205-1224). | gap |
| A mouseout to a node inside the trigger keeps the tooltip | js/tests/unit/tooltip.spec.js:784 | src/browser/Tip.ts:382 | No tip case sets an inside `relatedTarget`. | gap |
| A reentry during the hide transition keeps a fresh panel | js/tests/unit/tooltip.spec.js:817 | src/browser/Tip.ts:285, :302, :319 | Fixtures turn animation off (tests/setupBrowser.ts:4409). | gap |
| The `update` method corrects a shown panel | js/tests/unit/tooltip.spec.js:1072 | src/browser/Tip.ts:254 | Tip.test.ts:1212 asserts no effect. | gap |
| The `update` method on a never-shown tip does nothing | js/tests/unit/tooltip.spec.js:1092 | src/browser/Tip.ts:254 | No case calls `update` on a live, never-shown tip. | gap |
| The `write` method on a hidden tip shows nothing | js/tests/unit/tooltip.spec.js:1185 | src/browser/Tip.ts:262 | Every write-first case calls `show` afterward and records no events. | gap |
| Whitespace-only trigger text receives an `aria-label` attribute | js/tests/unit/tooltip.spec.js:1414 | src/browser/Tip.ts:102 | The empty-trigger scenario uses an empty string (Tip.test.ts:2102). | gap |
| An author `aria-label` attribute survives | js/tests/unit/tooltip.spec.js:1433 | src/browser/Tip.ts:102 | No tip host carries an author `aria-label` attribute. | gap |
| A template without the slot stays unchanged | js/tests/unit/util/template-factory.spec.js:135 | src/browser/helpers.ts:234-235 | Only the empty-template path has a proof (Tip.test.ts:494-537). | gap |
| Empty markup sanitizes to empty without a transform call | js/tests/unit/util/sanitizer.spec.js:5 | src/browser/helpers.ts:965 | No case passes empty markup. | gap |
| Every allowed URL scheme keeps its `href` attribute | js/tests/unit/util/sanitizer.spec.js:13 | src/browser/constants.ts:246 | Relative, fragment, and https values have proofs; narrowing the scheme branch to http and https survives. | gap |
| Every encoded `javascript:` variant loses its `href` attribute | js/tests/unit/util/sanitizer.spec.js:51 | src/browser/constants.ts:246, src/browser/helpers.ts:979 | Only plain `javascript:` has a proof (tests/src/browser/helpers.test.ts:1390). | gap |
| Several allowlist regexes each admit attributes | js/tests/unit/util/sanitizer.spec.js:84 | src/browser/helpers.ts:975-980 | The default allowlist carries one regex, and testing the first alone survives. | gap |
| The `write` method on a shown tip releases the panel before a refused show | js/src/tooltip.js:326-332, :597-607 | src/browser/Tip.ts:152-166, :259-265 | After `disable`, a write leaves the old panel shown in the engine, while Bootstrap removes the tip; guides/veneer.md:435 and :448 record no refusal. | defect |
| An SVG `relatedTarget` or target inside the trigger | js/src/dom/event-handler.js:106, :151-157 | src/browser/Tip.ts:351, :378-382; src/browser/validators.ts:11-24 | Moving from an anchor onto its inline SVG hides the engine tooltip and keeps Bootstrap's shown, and a delegated child entered over its icon opens nothing. | defect |
| A leave during the show transition still emits shown | js/src/tooltip.js:229-237, js/src/util/index.js:229-256 | src/browser/Tip.ts:227-236, :302, :307, :315 | With a hide delay shorter than the fade, Bootstrap emits show, inserted, hide, shown, and hidden, while the engine omits shown. | defect |
| The generated panel ID starts with the profile name | js/src/tooltip.js:315-317 | src/browser/Tip.ts:189-193 | The recorder rewrites IDs to tokens (tests/setupBrowser.ts:4895-4912). | gap |
| A destroyed delegator stops resolving children | js/src/base-component.js:41 with js/src/tooltip.js:181 | src/browser/Tip.ts:79-95, :361-366 | No case dispatches on a child after its delegator is destroyed. | gap |

### Scrollspy

The refuter upholds all 7 open scrollspy claims; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| Clearing touches only target links, and an unresolved target falls back to the body | js/tests/unit/scrollspy.spec.js:219 | src/browser/Scrollspy.ts:45, :170-174; src/browser/helpers.ts:546 | buildScrollspy (tests/setupBrowser.ts:4317-4330) always resolves the target, and no fixture holds an `.active` element without `href`. | gap |
| A smooth click on a link without an observed section stays unprevented | js/tests/unit/scrollspy.spec.js:878 | src/browser/Scrollspy.ts:179-180 | The smooth cases click links with sections alone (tests/src/browser/Scrollspy.test.ts:600-602). | gap |
| Disposal leaves Bootstrap's smooth handler, which throws on the next click | js/src/scrollspy.js:135-136, js/src/base-component.js:41-45 | src/browser/Scrollspy.ts:109 | guides/veneer.md:658 states the engine side, and :738 is the only scrollspy row. | defect |
| A refresh strips other spies' smooth handlers on a shared target | js/src/scrollspy.js:133, js/src/dom/event-handler.js:173, :250-254 | src/browser/Scrollspy.ts:92-98 | Bootstrap keeps the last-refreshed handler alone, and the engine keeps both. | defect |
| An `<area href>` link inside the target is spied | js/src/scrollspy.js:32, :205-219 | src/browser/Scrollspy.ts:25, :84, :178; src/browser/types.ts:809 | The engine admits anchors alone, while guides/veneer.md:620 and helpers.ts:96 treat AREA as a link elsewhere. | defect |
| A `.dropdown-item` link without a `.dropdown` ancestor | js/src/scrollspy.js:238-241, js/src/dom/selector-engine.js:40-41 | src/browser/Scrollspy.ts:143-147, :167 | Bootstrap throws before activate.bs.scrollspy, the engine dispatches it, and `.btn-group.dropup` markup reaches this path. | defect |
| The `scrollTop` fallback for a root without `scrollTo` | js/src/scrollspy.js:141-147 | src/browser/Scrollspy.ts:182 | No runtime that loads the module lacks `scrollTo` (Scrollspy.ts:72 uses `findLast`), and the guide states no browser floor. | nit |

### Tab

The refuter upholds 8 of the 11 open tab claims; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| The `show` method after a page removes a tab | js/tests/unit/tab.spec.js:373 | src/browser/Tab.ts:94, :115-119 | No case removes a tab or its pane before show. | gap |
| Home skips a disabled first toggle | js/tests/unit/tab.spec.js:769 | src/browser/Tab.ts:203-206 | The disabled toggle sits in the middle (tests/setupBrowser.ts:4309). | gap |
| End skips a disabled last toggle | js/tests/unit/tab.spec.js:799 | src/browser/Tab.ts:207-208 | The last fixture toggle is enabled. | gap |
| A dropdown tab activates nothing in another nav | js/tests/unit/tab.spec.js:977 | src/browser/Tab.ts:182-197 | Every dropdown fixture has one nav. | gap |
| A nested tablist keeps the outer pane active | js/tests/unit/tab.spec.js:1035 | src/browser/Tab.ts:32-34, :115-119 | No fixture nests a tablist inside a pane. | gap |
| Deactivation blurs the outgoing toggle | js/src/tab.js:130-136 | src/browser/Tab.ts:144 | No case focuses the active toggle before show. | gap |
| The `show` method on a toggle with no tablist parent | js/src/tab.js:58-66, :80-87, :179-181; js/src/dom/selector-engine.js:36-37 | src/browser/Tab.ts:37, :92-104, :118, :158-161 | Bootstrap throws before any event; the engine emits show.bs.tab, writes `.active`, and writes `.show` onto the toggle with no shown event; no row exists. | defect |
| A pane whose toggle has no ID gets no `aria-labelledby` attribute | js/src/tab.js:215-227 | src/browser/Tab.ts:48, :66 | Every pane-resolving fixture toggle has an ID. | gap |

### Toast

The refuter upholds all 11 open toast claims; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| A page overrides toast defaults globally | js/tests/unit/toast.spec.js:95 | src/browser/constants.ts:145, src/browser/helpers.ts:421-428 | Bootstrap's `Default` getter returns a mutable object; the engine freezes its defaults, and the guide neither serves nor refuses the override (guides/veneer.md:69, :616). | gap |
| A vetoed show emits no shown event | js/tests/unit/toast.spec.js:164 | src/browser/Toast.ts:65 | tests/src/browser/Toast.test.ts:342 filters the transcript to write readings. | gap |
| A re-show clears the pending timer | js/tests/unit/toast.spec.js:197 | src/browser/Toast.ts:66 | The repeated-show case runs without a timer (Toast.test.ts:215-224). | gap |
| A mouseover clears the pending timer | js/tests/unit/toast.spec.js:226 | src/browser/Toast.ts:148-150 | No mouseover lands while a timer is pending. | gap |
| A focusin clears the pending timer | js/tests/unit/toast.spec.js:257 | src/browser/Toast.ts:149 | The step 3 show at Toast.test.ts:192 masks the deletion. | gap |
| The hide schedules after both interactions leave | js/tests/unit/toast.spec.js:290 | src/browser/Toast.ts:144-156 | No case holds both interaction flags. | gap |
| A focus leave with the pointer inside schedules nothing | js/tests/unit/toast.spec.js:334 | src/browser/Toast.ts:132 | No case combines hover and focus. | gap |
| A pointer leave with focus inside schedules nothing | js/tests/unit/toast.spec.js:373 | src/browser/Toast.ts:132 | No case combines hover and focus. | gap |
| The `hide` method on a never-shown toast dispatches nothing | js/tests/unit/toast.spec.js:440 | src/browser/Toast.ts:83 | tests/src/browser/plugins.test.ts:61-66 asserts registration alone. | gap |
| Animation defaults to on | js/src/toast.js:42 | src/browser/constants.ts:145, src/browser/helpers.ts:424 | Every test fixture writes `data-bs-animation`. | gap |
| An orphan toast dismiss trigger | js/src/util/component-functions.js:25-29, js/src/toast.js:103 | src/browser/helpers.ts:184-189, src/browser/plugins.ts:345-351 | Bootstrap throws a TypeError out of the document listener; the engine stays silent; no row exists. | defect |

### Shared

The refuter upholds all 18 open shared claims; the following table lists them.

| Claim | Spec | Engine | Refuter's evidence | Severity |
| ----- | ---- | ------ | ------------------ | -------- |
| `parseAttributes` ignores keys without the `bs` prefix | js/tests/unit/dom/manipulator.spec.js:63 | src/browser/parsers.ts:35 | The fixture at tests/src/browser/helpers.test.ts:669-685 carries `data-bs-*` keys alone. | gap |
| `findFocusable` admits a, button, input, textarea, select, and details | js/tests/unit/dom/selector-engine.spec.js:163 | src/browser/helpers.ts:758-767 | The fixture at helpers.test.ts:986-1001 holds buttons and inputs alone. | gap |
| `findFocusable` admits a non-negative `tabindex` attribute | js/tests/unit/dom/selector-engine.spec.js:187 | src/browser/helpers.ts:765 | No `tabindex` div appears in the fixture. | gap |
| `findFocusable` admits `contenteditable="true"` | js/tests/unit/dom/selector-engine.spec.js:211 | src/browser/helpers.ts:766 | No `contenteditable` fixture exists under tests. | gap |
| A dot-prefixed `href` value resolves | js/tests/unit/dom/selector-engine.spec.js:248 | src/browser/helpers.ts:710 | No fixture `href` value starts with a dot. | gap |
| An `href` value without an anchor resolves nothing | js/tests/unit/dom/selector-engine.spec.js:270 | src/browser/helpers.ts:710 | Every `href` value in helpers.test.ts:955-977 contains a hash. | gap |
| A single element from a dot-prefixed `href` value | js/tests/unit/dom/selector-engine.spec.js:321 | src/browser/helpers.ts:710 | Same path as the preceding row. | gap |
| Several elements from a dot-prefixed `href` value | js/tests/unit/dom/selector-engine.spec.js:386 | src/browser/helpers.ts:720 | Multi-match has proofs for comma lists alone (helpers.test.ts:958-961). | gap |
| `isVisible` under a `display: none` ancestor | js/tests/unit/util/index.spec.js:142 | src/browser/helpers.ts:1313 | tests/src/browser/validators.test.ts:54-77 styles the element alone. | gap |
| `isVisible` under a `visibility: hidden` ancestor | js/tests/unit/util/index.spec.js:158 | src/browser/helpers.ts:1314 | Same fixture. | gap |
| `isVisible` with a reverted visibility | js/tests/unit/util/index.spec.js:174 | src/browser/helpers.ts:1314 | No case reverts an ancestor's visibility. | gap |
| `isVisible` on a closed details element itself | js/tests/unit/util/index.spec.js:214 | src/browser/helpers.ts:1317 | The case never passes the details element. | gap |
| `isDisabled` on a non-form element with a `disabled` attribute | js/tests/unit/util/index.spec.js:263 | src/browser/helpers.ts:1337 | Only `disabled="false"` has an assertion. | gap |
| An invalid dismiss selector falls back to the ancestor | js/src/dom/selector-engine.js:107, :116, :122; js/src/util/component-functions.js:25 | src/browser/helpers.ts:185-188, :721-723; src/browser/plugins.ts:43, :225, :265, :349 | `<a href="./inbox.html" data-bs-dismiss="alert">` inside an alert closes it in the engine; Bootstrap throws and keeps it. | defect |
| An invalid selector in an element option | js/src/util/index.js:92-94 | src/browser/helpers.ts:283-294, :346, :499, :546, :586, :598 | `<div class="collapse" data-bs-parent="#">` toggles in the engine, while Bootstrap's constructor throws; row mistyped-input (guides/veneer.md:739) covers TypeError leaves alone. | defect |
| Completion fires on the first own transition | js/src/util/index.js:240-250 | src/browser/helpers.ts:933-948 | With `transform 1s, visibility .2s`, Bootstrap completes at about 0.2 s and the engine at about 1 s. | defect |
| A cancelled transition completes on cancellation in the engine | js/src/util/index.js:250-255 | src/browser/helpers.ts:947 | guides/veneer.md:640 states the engine side in prose, and no row records it. | defect |
| A non-HTML delegated trigger routes | js/src/dom/event-handler.js:102-121, js/src/util/index.js:126-139 | src/browser/Veneer.ts:195, src/browser/validators.ts:11-24 | `<svg data-bs-dismiss="toast">` hides the toast in Bootstrap and does nothing in the engine. | defect |

## Overturned claims

The refuters overturn 9 claims; the following table lists each with the evidence that overturns it.

| Family | Claim | Evidence |
| ------ | ----- | -------- |
| alert | Dismiss delegation runs in a different phase | A selector argument sets `isDelegated`, which Bootstrap passes as `useCapture` (js/src/dom/event-handler.js:130, :184), so both realms route in the document capture phase (src/browser/Veneer.ts:70-73). |
| button | A toggle inserted after boot routes | tests/src/browser/Veneer.test.ts:497-523 pins event-time selector resolution on the shared router (src/browser/Veneer.ts:186-204). |
| collapse | An accordion reaches wrapped panels (js/tests/unit/collapse.spec.js:694) | The accordion journey (tests/app/browser/integration.test.ts:1162-1196 over app/browser/sections/accordion.html:5-75) fails under a direct-child mutation at src/browser/Collapse.ts:185. |
| dropdown | An outside input click closes the menu (js/tests/unit/dropdown.spec.js:1878) | The Tab scenario (tests/src/browser/Dropdown.test.ts:708-712) fails when the containment guard at src/browser/Dropdown.ts:167 goes; a residual nit remains for an outside input click. |
| modal | A button dismiss stays unprevented (js/tests/unit/modal.spec.js:1023) | The click step records `$::prevented` (tests/setupBrowser.ts:4994-4998) for the `.btn-close` click at tests/src/browser/Modal.test.ts:221. |
| tooltip | Repeated sanitizing keeps `src` (js/tests/unit/util/sanitizer.spec.js:153) | A global flag on src/browser/constants.ts:246 drops the `#read` link in the second run of tests/src/browser/Tip.test.ts:45-72 and fails :64. |
| tab | Construction without a tablist parent does not throw (js/tests/unit/tab.spec.js:42) | tests/src/browser/plugins.test.ts:84-108 builds a tab on a bare div; deleting src/browser/Tab.ts:37 throws there. |
| tab | A list-group tablist (js/tests/unit/tab.spec.js:157) | The list-group journey (tests/setupBrowser.ts:1910-1917, :1965-1967) drives every key; a residual nit remains for the `.list-group` term at src/browser/Tab.ts:33. |
| tab | The `show` method on the active tab dispatches nothing (js/tests/unit/tab.spec.js:245) | The selected-click rows (tests/setupBrowser.ts:1870-1891) fail when the active clause at src/browser/Tab.ts:93 goes. |

## Claims that need a probe

The refuters send 3 claims to a probe; the following list gives each probe and its ruling rule.

- Collapse, `show` during a hide (js/tests/unit/collapse.spec.js:174, src/browser/Collapse.ts:102): delete the collapsing clause at Collapse.ts:102 and run the "drives the $family table through its controls with motion=$motion" case of tests/app/browser/integration.test.ts for collapse with motion on in the dark-390 project. When the "Depot hours shown through {Enter}{Enter}" row fails, the guard has a proof; when it passes, the claim is upheld as a gap and Collapse.test.ts adds a direct case that calls `show` while the phase is hiding and compares with the oracle.
- Dropdown, markup boundary string (js/src/dropdown.js:73, :82, :298-302; src/browser/helpers.ts:283-294, :499): open a dropdown through `createDropdown` inside a clipping `overflow: auto` wrapper near the right edge, first with `data-bs-boundary="viewport"` and then with `data-bs-boundary="#placement-boundary"`, and compare `readPlacementGeometry` with the oracle to within 1 px. A difference upholds the finding as a defect, because Popper reads `viewport` as the viewport and any other string as the document (node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js:30).
- Shared, selector failure on a toggle trigger (src/browser/helpers.ts:721-723 consumed at src/browser/plugins.ts:89, :211, :248 and src/browser/Tab.ts:135, :145): in both realms, click `<a href="./page.html" data-bs-toggle="modal">` and `<a class="nav-link" href="./x" data-bs-toggle="tab">`, then record `defaultPrevented`, the tab's class and ARIA writes, and the error counts. A difference upholds the finding as a defect, and question 1 decides its repair.

## Fix units

The following units group the 162 upheld claims into 15 units with disjoint owned files under src/browser and tests/src/browser. The alert orphan-trigger claim splits across F1 (the ancestor fallback) and F3 (the error count), so the unit claim lists hold 163 entries. Each unit returns its departure rows as an exact patch to guides/veneer.md and its fixture or harness edits as an exact patch to tests/setupBrowser.ts, because both files are shared; the Orchestrator applies a unit's rows with its cases, because the ledger fails on a row that no case consumes (tests/src/browser/Button.test.ts:235-238). F12 runs after F2, because its SVG fix reuses the element validator that F2 adds to src/browser/validators.ts; the other units are independent. Where a question in the final section decides between a repair and a row, the unit takes the recommended path after your ruling.

### F1: shared helpers for selectors, markup input, focus, sanitizing, and transitions

Engine: astra. Families: shared, alert, collapse, dropdown, and tooltip. Owned files: src/browser/helpers.ts and tests/src/browser/helpers.test.ts. F1 carries 21 claims, all in the helper module; the following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| shared: an invalid dismiss selector falls back to the ancestor (defect, question 1) | In both realms, click `<a href="./inbox.html" data-bs-dismiss="alert">` inside an `.alert` element and compare the host's connection and the error count. |
| alert: orphan trigger, part (a) invalid target with an alert ancestor (defect, question 1) | In both realms, click a dismiss trigger with `data-bs-target="["` inside an `.alert` element and compare the kept alert and `$::errors`. |
| collapse: a malformed trigger selector (defect, question 1) | Beside an `<a data-bs-toggle="collapse" href=".">` toggle, construct a valid collapse in both realms and record the error count against the row question 1 selects. |
| shared: an invalid selector in an element option (defect, question 1) | Construct `<div class="collapse" data-bs-parent="#">` in both realms and compare the construction outcome, the toggle, and the error count. |
| collapse: markup `toggle` coercion follows `Boolean()` (defect) | Resolve `data-bs-toggle` values `"0"`, `""`, `"null"`, and `"false"` beside the oracle's constructed instance and compare the open state. |
| dropdown: keyboard item filter (defect) | On a menu with `<a class="dropdown-item" disabled>` and a `.dropdown-item` button inside `<fieldset disabled>`, compare `focusDropdownItem` with Bootstrap's `:not(.disabled):not(:disabled)` selection. |
| shared: completion on the first own transition (defect, question 5) | Await a host with `transform 1s, visibility .2s` in both realms and compare the completion time. |
| shared: a cancelled transition (defect, question 5) | Cancel the host's transition in both realms and compare the completion time against the row question 5 selects. |
| shared: `parseAttributes` ignores keys without the `bs` prefix (gap) | Add `data-another`, `data-target-bs`, `data-in-bs-out`, and `data-xxkeyboard` to the fixture at helpers.test.ts:669 and assert the exact `bs`-derived key set. |
| shared: `findFocusable` tag names (gap) | Assert the exact document-order result over a, textarea, select, details, div, and span children. |
| shared: `findFocusable` non-negative `tabindex` attribute (gap) | Add divs with a bare `tabindex`, `tabindex="0"`, and `tabindex="10"` and assert they are included. |
| shared: `findFocusable` `contenteditable` (gap) | Add `contenteditable="true"` and `contenteditable="false"` divs and assert only the first is included. |
| shared: dot-prefixed `href` value (gap) | Remove `data-bs-target`, set `href=".target-panel"`, and assert the matching element. |
| shared: `href` value without an anchor (gap) | With a `<main>` element in the document, set `href="main"` and assert an empty result. |
| shared: single element from a dot-prefixed `href` value (gap) | Covered by the dot-prefixed case with one match. |
| shared: several elements from a dot-prefixed `href` value (gap) | Use `href=".target-panel"` with two matches and assert both in document order. |
| tooltip: a template without the slot (gap) | Assert that `renderTip` returns `<div id="slotless"></div>` unchanged for content `{ '#absent': 'Saved' }`. |
| tooltip: empty markup sanitizing (gap) | Assert that `sanitizeMarkup('')` with a recording transform returns an empty string with zero calls. |
| tooltip: allowed URL schemes (gap) | Compare `sanitizeMarkup` with Bootstrap's `sanitizeHtml` on every URL in js/tests/unit/util/sanitizer.spec.js:13-49. |
| tooltip: encoded `javascript:` variants (gap) | Compare `sanitizeMarkup` with Bootstrap's `sanitizeHtml` on each variant in js/tests/unit/util/sanitizer.spec.js:51-82. |
| tooltip: several allowlist regexes (gap) | Assert that an allowlist of `/^aria-/` and `/^data-label/` keeps both `aria-label` and `data-label-text`. |

### F2: element validators and the router for non-HTML triggers

Engine: astra. Family: shared. Owned files: src/browser/validators.ts, src/browser/Veneer.ts, tests/src/browser/validators.test.ts, and tests/src/browser/Veneer.test.ts. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| shared: a non-HTML delegated trigger routes (defect) | Click `<svg data-bs-dismiss="toast">` inside a shown toast in both realms and compare the hidden state; hosts keep the HTML-element check. |
| shared: `isVisible` under a `display: none` ancestor (gap) | Assert false for a div nested inside a `display: none` ancestor. |
| shared: `isVisible` under a `visibility: hidden` ancestor (gap) | Assert false for a descendant of a `visibility: hidden` ancestor. |
| shared: `isVisible` with a reverted visibility (gap) | Assert true for the structure in js/tests/unit/util/index.spec.js:174. |
| shared: `isVisible` on a closed details element (gap) | Assert true for the details element while it is closed. |
| shared: `isDisabled` with a `disabled` attribute on a div (gap) | Assert true for a div with `disabled`, `disabled="disabled"`, and `disabled="true"`. |

### F3: alert error readings

Engine: astra. Family: alert. Owned file: tests/src/browser/Alert.test.ts. Each claim adds an `$::errors` row (Bootstrap 1, engine 0) that the guide patch carries and the case consumes with the delete-row and wrong-value controls of Alert.test.ts:257-259. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| alert: `close` after completion (gap, question 2) | Complete a close in both realms, call `close` on the oracle's stale instance and the engine alert, and record native error counts under row `alert-closed`. |
| alert: a second close during the fade (gap, question 2) | Click the dismiss button twice inside a slowed fade in both realms; compare 2 close.bs.alert events and 1 closed.bs.alert event under row `alert-reclose`. |
| alert: destroy inside the close listener (gap, question 2) | Dispose (Bootstrap) or destroy (engine) inside the close.bs.alert listener; compare the kept `show` class and the absent closed event under row `alert-hook-destroy`. |
| alert: orphan trigger, part (b) no target and no ancestor (defect, question 2) | Click an orphan `[data-bs-dismiss="alert"]` button in both realms and record the error count under row `alert-orphan`. |

### F4: button destroy and nesting

Engine: builder. Family: button. Owned file: tests/src/browser/Button.test.ts. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| button: `toggle` after destroy (gap, question 2) | Call the oracle's `toggle` after `dispose` and the engine's after `destroy`, and record native error counts under row `button-destroyed`. |
| button: nested toggles (gap) | Click the span in `<div data-bs-toggle="button"><span data-bs-toggle="button">Inner</span></div>` and compare the `active` class and `aria-pressed` attribute on both hosts. |

### F5: carousel keyboard, cycling, touch, and teardown

Engine: astra. Family: carousel. Owned file: tests/src/browser/Carousel.test.ts. The following table lists each claim and the oracle case it needs; question 7 can withdraw the 3 touch-event claims.

| Claim | Oracle case |
| ----- | ----------- |
| carousel: keyboard off (gap) | Add a keyboard-off scenario to compareCarousel (Carousel.test.ts:26-95) that sends ArrowRight and expects 0 slide events and matching prevented readings. |
| carousel: non-arrow key unprevented (gap) | Add an ArrowDown key step to the keyboard case at Carousel.test.ts:478-483. |
| carousel: arrow during a slide (gap) | Add a key step without `until` before a second arrow step; both realms record 1 slide event. |
| carousel: touch off (gap) | Add a touch-emulated `data-bs-touch="false"` scenario that swipes -80 px and expects no `pointer-event` class, no slide, and no prevented dragstart. |
| carousel: touch-event swipe right (gap, question 7) | Run both realms in frames without PointerEvent, dispatch touchstart, touchmove, and touchend over +300 px, and compare direction `right`. |
| carousel: touch-event swipe left (gap, question 7) | The -300 px sibling of the preceding case, expecting direction `left`. |
| carousel: swipe during a slide (gap) | Dispatch a second pointerdown and pointerup pair before slid in the swipe-left scenario and compare 1 slide event. |
| carousel: pinch (gap, question 7) | In a frame without PointerEvent, dispatch a two-touch touchmove and touchend and compare the absent slide event. |
| carousel: `next` during a slide (gap) | Add a `next` call without `until` before a second `next` step at Carousel.test.ts:448-465 and expect 1 extra slide event. |
| carousel: incoming item interval (gap) | Give the second item `data-bs-interval` in a cycling scenario and compare the second timer slide's window. |
| carousel: keep cycling (gap) | Add a cycling scenario without a slid pause that waits for 2 timer slides in both realms. |
| carousel: hidden ancestor (gap) | Wrap the host in a `display: none` element, call `cycle`, and record 0 slid events over a bounded window. |
| carousel: `prev` during a slide (gap) | Add a `prev` call right after a pending `next` step and compare the absent second slide event. |
| carousel: double start (gap) | Call `cycle` twice, pause, wait past the interval, and expect 0 slid events. |
| carousel: touch end callback without hover pause (gap) | Add a swipe-cycling scenario with pause off that calls `cycle` before the swipe and expects the timer slide inside the interval window. |
| carousel: `pointer-event` class on disposal (defect, question 2) | Run the carousel-destroy transcript under touch emulation and consume a row `carousel-destroy-touch` on the host class. |
| carousel: image dragstart listeners on disposal (defect, question 2) | Add a `$::dragstart-prevented` reading to the touch-emulated destroy comparison and consume a row (Bootstrap `true`, engine `false`). |
| carousel: touch timeout on disposal (defect, question 2) | End a touch, dispose within 500 ms plus the interval, wait past the timeout, and consume an `$::errors` row (1 against 0). |
| carousel: completion error after disposal (gap, question 2) | Add the `$::errors` reading to the carousel-destroyed checkpoint at Carousel.test.ts:315, add the row, and raise the row count at :322. |

### F6: swipe support and pinch

Engine: astra. Family: carousel. Owned file: tests/src/browser/Swipe.test.ts. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| carousel: swipe ignores a pinch (gap, question 7) | Build the host in a frame without PointerEvent, dispatch touchstart, a two-touch touchmove, and touchend, and expect the calls `[['end']]`. |
| carousel: `ontouchstart` alone marks support (gap) | With emulation off, assign `documentElement.ontouchstart`, construct the Swipe, and expect the `pointer-event` class and an end callback. |

### F7: collapse accordion, triggers, and method guards

Engine: astra. Family: collapse. Owned file: tests/src/browser/Collapse.test.ts. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| collapse: typed element `parent` option (gap) | Call `createCollapse(panel, { parent: element, toggle: false })` on the markup of js/tests/unit/collapse.spec.js:69 and compare a show with `oracle.construct` given the same parent. |
| collapse: sibling without `data-bs-parent` (gap) | Use the markup of collapse.spec.js:137 with both panels under a typed parent and compare a show. |
| collapse: `show` on a settled shown panel (gap) | After shown.bs.collapse, call `show` again and compare the absent second show event. |
| collapse: parentless show leaves others (gap) | Use the markup of collapse.spec.js:249 and compare both panels after a show. |
| collapse: nested accordion scope (gap) | Use the markup of collapse.spec.js:276 and click parent, child 1, and child 2 in both realms. |
| collapse: `hide` on a settled hidden panel (gap) | Call `hide` on a hidden panel and compare the absent hide event. |
| collapse: click inside an anchor trigger (gap) | Add a shape that clicks a span inside `<a data-bs-toggle="collapse" href="#panel">` and compare `defaultPrevented`. |
| collapse: multi-target show (gap) | Use the markup of collapse.spec.js:541 and compare through the second shown event. |
| collapse: multi-target hide (gap) | Use the markup of collapse.spec.js:565 and compare the trigger class and `aria-expanded` attribute after both hidden events. |
| collapse: multi-target trigger in an accordion (gap) | Use the markup of collapse.spec.js:747 and click triggerOne and then triggerTwo. |
| collapse: first-target trigger state (gap) | Use the markup of collapse.spec.js:886 and click trigger3, trigger2, and trigger1, comparing each trigger after every hidden event. |
| collapse: rapid sibling activation (gap) | Run the steps of tests/setupBrowser.test.ts:863-929 through `createVeneer` and compare event order and both triggers. |
| collapse: two triggers for one panel (gap) | Use the markup of collapse.spec.js:589 and :613, click link1, and compare both links after shown and after hidden. |

### F8: dropdown guards, positioning inputs, and clearing

Engine: astra. Family: dropdown. Owned files: src/browser/Dropdown.ts, src/browser/plugins.ts, and tests/src/browser/Dropdown.test.ts. The key-step prevented reading comes back as a patch to tests/setupBrowser.ts:5012-5016, and a type change for question 3 comes back as a patch to src/browser/types.ts, which F13 owns. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| dropdown: menu as host (gap) | Use the markup of js/tests/unit/dropdown.spec.js:65-71, call `createDropdown(menu).show()`, and compare the shown count and writes. |
| dropdown: element reference (gap) | Call `createDropdown(toggle, { position: { reference: ELEMENT } })` and compare the menu box with the oracle built with the same reference. |
| dropdown: virtual-element reference (gap, question 3) | Pass a virtual element in both realms and consume the row or refusal question 3 selects. |
| dropdown: `toggle` on a disabled-attribute host (gap) | Call `toggle` on a disabled host and compare events and writes. |
| dropdown: `toggle` on a `.disabled` host (gap) | Add a `.disabled` host to the preceding case. |
| dropdown: `show` on a disabled-attribute host (gap) | Call `show` on a disabled host and compare events and writes. |
| dropdown: `show` on a `.disabled` host (gap) | Add a `.disabled` host to the preceding case. |
| dropdown: `hide` on a disabled-attribute host (gap) | Open the menu, set `disabled`, call `hide`, and compare events and writes. |
| dropdown: `hide` on a `.disabled` host (gap) | Add the `.disabled` class to the preceding case. |
| dropdown: `hide` on a closed menu (gap) | Call `hide` on a closed menu and assert no hide or hidden event. |
| dropdown: `update` (gap) | Move the toggle of an open dynamic menu, call `update`, and compare the settled box. |
| dropdown: select and option clicks (gap) | Add select and option click targets to the form scenario. |
| dropdown: shared parent, identification (gap) | Use the markup of dropdown.spec.js:1490-1500 and compare each toggle's menu. |
| dropdown: shared parent, proper menu (gap) | In the same fixture, click #dropdown1 and then #dropdown2 and compare the `show` class on both menus. |
| dropdown: hidden items (gap) | Add the items of dropdown.spec.js:1700-1703 to a keys variant. |
| dropdown: textarea click (gap) | Add a textarea click target to the form scenario. |
| dropdown: markup order (gap) | Build `[menuA, menuB, toggle]` and compare which menu opens. |
| dropdown: keydown prevention (gap) | Record a prevented reading from the keydown dispatch in the key step and compare the keys scenario. |
| dropdown: arrow stopPropagation (gap) | Add keydown listeners on the parent and an outer element to the keys scenario and compare whether each fires. |
| dropdown: positioning inputs reach Placement (gap) | Compare `readPlacementGeometry` of both menus to within 1 px in the case at Dropdown.test.ts:592. |
| dropdown: placement attribute before shown (defect, question 4) | Read `data-popper-placement` inside a shown listener in both realms. |
| dropdown: outside clearing selector (defect) | Select open toggles with `DROPDOWN_TOGGLE` plus `.show` at plugins.ts:188, drop the disabled check at Dropdown.ts:157, and compare both markups from the claim. |
| dropdown: touch workaround in `.navbar-nav` (gap) | Open a touch-emulated toggle inside `.navbar-nav` and compare `readTouchListeners`. |
| dropdown: navbar detection timing (defect, question 4) | Construct outside a `.navbar` element, move the toggle inside, open, and compare `data-bs-popper`. |
| dropdown: `popperConfig` over a static menu (defect, question 4) | Combine `data-bs-display="static"` with a `data-bs-popper-config` that carries modifiers and consume the row question 4 selects. |
| dropdown: no-menu error (nit, question 2) | Click a toggle without a menu in both realms and consume a row `dropdown:no-menu` on `$::errors`. |

### F9: modal show, dismissal, and compensation

Engine: astra. Family: modal. Owned files: src/browser/Modal.ts and tests/src/browser/Modal.test.ts. A `.modal-body` fixture comes back as a patch to buildModal at tests/setupBrowser.ts:4259-4275. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| modal: detached host (gap) | Call `createModal(el).show()` on a never-appended host and assert the host is in the document at shown in both realms. |
| modal: show after a vetoed fade show (gap) | Veto the first show of a fade modal, show on the next task, and compare shown. |
| modal: host scroll reset (gap) | Open the overflow fixture, scroll the host, hide, reopen, and compare. |
| modal: `.modal-body` scroll reset (gap) | Scroll a `.modal-body` between a hide and a reopen and compare. |
| modal: resize adjustment (gap) | Resize a shown modal through the viewport driver and compare the padding readings. |
| modal: host click without a backdrop (gap) | Click the host of a `data-bs-backdrop="false"` modal and compare the kept state. |
| modal: Escape on a static modal with keyboard on (gap) | Press Escape on a static modal with keyboard on and compare the hide. |
| modal: second refused dismissal (gap) | Send two mousedown and click pairs to a static modal within one bounce and compare the class writes. |
| modal: click on a removed descendant (gap) | Mousedown on the host, click a child whose listener removes it, and compare the kept state. |
| modal: `hide` on a hidden modal (gap) | Call `hide` on a never-shown modal and compare an empty transcript. |
| modal: trap release at hide start (gap) | Hide a fade modal, focus an outside control before hidden, and compare focus. |
| modal: toggle click on an open modal (gap) | Click the toggle of an open modal with fade on and off and compare. |
| modal: prevented show disarms focus restoration (gap) | Click a toggle whose show is prevented, open by another path, hide, and compare focus. |
| modal: dialog compensation width (defect) | Measure the width at call time at Modal.ts:151 and compare a short and a tall modal on a page with tall body content. |
| modal: RTL compensation side (gap) | Run the overflow scenario under `dir="rtl"` in both realms. |
| modal: prevented hidePrevented (gap) | Prevent hidePrevented.bs.modal on a static modal and compare the absent bounce. |
| modal: show during the backdrop fade-out (defect, question 2) | Call `show` after `display: none` and before hidden on a fade modal and consume a departure row on the events. |

### F10: overlay mechanics for lock, backdrop, and trap

Engine: astra. Family: modal. Owned files: src/browser/Lock.ts, tests/src/browser/Lock.test.ts, tests/src/browser/Backdrop.test.ts, and tests/src/browser/Trap.test.ts. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| modal: full-width test after the lock (defect) | Compare against a width measured after the overflow write at Lock.ts:62, and compare a `.fixed-top` element at `calc(100vw - 5px)` on a page with tall body content. |
| modal: stylesheet body padding (gap) | Set body padding from a style rule and assert the locked value, the absent saved attribute, and the cleared release. |
| modal: scaled display (gap) | Set hidden overflow and a fractional root padding, acquire, and assert the body padding is unchanged. |
| modal: backdrop hide with a detached root (gap) | Show an animated backdrop under a wrapper, remove the wrapper, await hide, and assert no rejection and no backdrop left. |
| modal: trap without autofocus (gap) | Assert the focused element after activating a trap with `autofocus: false`. |

### F11: offcanvas open state and dismissal

Engine: astra. Family: offcanvas. Owned files: src/browser/Offcanvas.ts and tests/src/browser/Offcanvas.test.ts. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| offcanvas: Escape with a static backdrop (gap) | Add a static-Escape scenario to Offcanvas.test.ts:193-210 that presses Escape until hidden. |
| offcanvas: `hide` on a never-shown panel (gap) | Add a scenario whose first step calls `hide` and compare an empty transcript. |
| offcanvas: trap release (gap) | Focus #opener after the responsive resize-hide, and compare focus at the second shown of an open, hide, and open sequence. |
| offcanvas: checkbox trigger (gap) | Click `<input type="checkbox" data-bs-toggle="offcanvas">` and compare `checked` and shown. |
| offcanvas: show during a pending hide (defect) | Track the accepted open state so a superseding show cancels the pending close; click the opener, the close button, and the opener before hidden, press Escape, and compare body style, backdrop nodes, and events. |
| offcanvas: server-rendered `aria-modal` at load (defect) | Track the open state in the instance instead of reading markup at Offcanvas.ts:98-100 and add a load scenario with `aria-modal` and `role="dialog"`. |
| offcanvas: toggle with an instance-less shown panel (defect, question 2) | Insert a shown panel after boot, click a toggle for a second panel, and consume a row on `$::errors` and the target's events. |

### F12: tip triggers, writes, and teardown

Engine: astra. Families: popover and tooltip. Owned files: src/browser/Tip.ts and tests/src/browser/Tip.test.ts. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| popover: `hover click` retention (gap) | Add a scenario that clicks, dispatches mouseout, waits the delay, records retention and the absent hide event, and closes with a second click. |
| tooltip: hover on an SVG child (gap) | Dispatch a bubbling mouseover on an `<svg><rect>` inside a hover trigger in both realms and compare shown. |
| tooltip: show after external removal (gap) | Show, remove the panel, show again, and assert 1 connected panel and a second inserted event. |
| tooltip: inside `relatedTarget` (gap) | Mouseout with a `relatedTarget` inside the trigger and compare the kept tooltip. |
| tooltip: reentry during the hide transition (gap) | With animation on, mouseover during the hide transition and compare the absent hidden event and the panel ID. |
| tooltip: `update` correction (gap) | Move the trigger to the top edge, call `update`, wait a frame, and compare the flipped side. |
| tooltip: `update` on a never-shown tip (gap) | Call `update` before any show and assert no throw, no panel, and no `aria-describedby` attribute. |
| tooltip: `write` on a hidden tip (gap) | Write, then assert visible false, no panel, and 0 events before the later show. |
| tooltip: whitespace trigger text (gap) | Pair a title with whitespace-only text and compare the `aria-label` attribute. |
| tooltip: author `aria-label` attribute (gap) | Keep an author `aria-label` on an empty-text trigger and compare. |
| tooltip: `write` on a shown tip with a refused show (defect) | Release the panel before calling `show` at Tip.ts:262-264; show, disable, and write in both realms and compare the absent panel. |
| tooltip: SVG `relatedTarget` and target (defect) | Accept any realm element through F2's validator at Tip.ts:351 and :378-382; move from an anchor onto its SVG icon and compare. |
| tooltip: leave during the show transition (defect) | With animation on and delay 0, mouseover then mouseout before the fade ends and compare event names. |
| tooltip: panel ID prefix (gap) | Assert the panel ID starts with the profile name. |
| tooltip: destroyed delegator (gap) | Destroy a delegator, mouseover a matching child, and assert no registered child and no tooltip. |

### F13: scrollspy links, smooth scrolling, and teardown rows

Engine: astra. Family: scrollspy. Owned files: src/browser/Scrollspy.ts, src/browser/types.ts, and tests/src/browser/Scrollspy.test.ts. The browser-floor sentence of question 7 comes back as a patch to the Browser entry chapter of guides/veneer.md. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| scrollspy: target-only clearing and body fallback (gap) | Build an `#root.active` wrapper without `href`, use `data-bs-target="ss-target"`, scroll, and compare the kept wrapper class and the active body link. |
| scrollspy: smooth click without a section (gap) | Click #disabled and #hashless with smooth scrolling on and compare prevented false, unchanged scroll, and 0 errors. |
| scrollspy: disposal and the smooth handler (defect, question 2) | Set `data-bs-smooth-scroll="true"` on the disposal case at Scrollspy.test.ts:329, dispose, click #second-link, and consume a row `scrollspy:destroyed` on `$::errors`. |
| scrollspy: shared target (defect, question 2) | Boot two smooth spies on #chapters, click a link to the first spy's section, and consume a row `scrollspy:shared-target` on `$::prevented`. |
| scrollspy: `<area href>` links (defect) | Admit HTMLAreaElement beside HTMLAnchorElement at Scrollspy.ts:25, :84, and :178 and types.ts:809, and add an area inside a map under #chapters to the scenarios at Scrollspy.test.ts:437. |
| scrollspy: dropdown item without a `.dropdown` ancestor (defect, question 2) | Wrap #last-link in `.btn-group.dropup` and consume rows on the activate event and `$::errors`. |
| scrollspy: `scrollTop` fallback (nit, question 7) | No case; the browser-floor sentence closes the claim. |

### F14: tab lists, keys, and orphan toggles

Engine: astra. Family: tab. Owned files: src/browser/Tab.ts and tests/src/browser/Tab.test.ts. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| tab: removed tabs (gap) | Use three tabs with close buttons that remove their item and pane and show #secondNav, and compare through shown. |
| tab: Home skips a disabled first toggle (gap) | Disable the first toggle, press Home on the last, and compare the selection. |
| tab: End skips a disabled last toggle (gap) | Disable the last toggle, press End on the first, and compare the selection. |
| tab: dropdown tab in two navs (gap) | Use the #nav1 and #nav2 markup of js/tests/unit/tab.spec.js:977, click a #nav1 item, and compare #nav2's classes. |
| tab: nested tablists (gap) | Use the markup of tab.spec.js:1035, click #tab1 and #tabNested2, and compare #x-tab1. |
| tab: blur the outgoing toggle (gap) | Focus #first, call `show` on #last, and compare the settled focus. |
| tab: show without a tablist parent (defect) | Refuse with no event and no write at Tab.ts:92-93 when no parent exists, and click an orphan toggle in both realms to compare. |
| tab: no `aria-labelledby` attribute for an ID-less toggle (gap) | Boot an ID-less toggle with a target pane and compare the absent attribute. |

### F15: toast timers, interactions, and orphan dismissal

Engine: astra. Family: toast. Owned file: tests/src/browser/Toast.test.ts. The refusal sentence of question 6 comes back as a patch to guides/veneer.md:616. The following table lists each claim and the oracle case it needs.

| Claim | Oracle case |
| ----- | ----------- |
| toast: global default override (gap, question 6) | No case; the refusal sentence closes the claim. |
| toast: show veto emits no shown event (gap) | Add a show-veto mode to compareToast (Toast.test.ts:47-77) and compare. |
| toast: re-show clears the timer (gap) | With automatic dismissal on, show, re-show inside the delay, record a no-hide reading, and wait for hidden. |
| toast: mouseover clears the timer (gap) | Show, hover inside the delay, record a kept `show` class, mouseout to #outside, and wait for hidden. |
| toast: focusin clears the timer (gap) | Remove the step 3 show from the focus case, or add a variant without it. |
| toast: both interactions leave (gap) | Hover, focus #first, mouseout with no `relatedTarget`, record a no-hide reading, focus #outside, and wait for hidden. |
| toast: focus leaves with the pointer inside (gap) | Hover, focus #first, focus #outside, and record a kept `show` class. |
| toast: pointer leaves with focus inside (gap) | Hover, focus #first, mouseout to #outside, and record a kept `show` class. |
| toast: `hide` on a never-shown toast (gap) | Call `hide` on a never-shown toast and compare an empty transcript. |
| toast: animation on by default (gap) | Omit `data-bs-animation` and compare the fade and showing writes. |
| toast: orphan dismiss (defect, question 2) | Click an orphan `[data-bs-dismiss="toast"]` button in both realms and consume a row `toast:orphan-dismiss` on `$::errors`. |

## Questions for you

Each question decides the contract for the claims it names; the recommended path is the one the units take after your ruling.

1. Selector failures: when a `data-bs-target` attribute, an `href` attribute, or an element option holds a selector that fails to parse, does the engine repair to Bootstrap's outcome or keep its fallback with recorded departures? The recommended path repairs the dismiss fallback, so a parse failure resolves no host and the alert stays (src/browser/helpers.ts:184-188), and records `$::errors` rows for the error-only differences: the collapse construction loop (js/src/collapse.js:66-76) and element options such as `data-bs-parent="#"` (js/src/util/index.js:92-94), where the engine keeps working. The alternative, which reports the error and refuses construction, makes markup that works in the engine fail. This rules F1's 4 selector claims and the needs-probe toggle finding.
2. Error-only and teardown differences: does the engine keep its quieter behavior and record each difference as a departure row, instead of reproducing Bootstrap's throws and leaked listeners? The recommended path records rows for alert (close after completion, a second close during the fade, destroy inside the close listener, and an orphan trigger), button (`toggle` after destroy), carousel (the `pointer-event` class, image dragstart listeners, the touch timeout, and completion errors), dropdown (the no-menu error), modal (a `show` call during the backdrop fade-out, which Bootstrap's stale backdrop callback undoes at js/src/modal.js:252-256), offcanvas (a toggle beside an instance-less shown panel), scrollspy (the disposal smooth handler, a shared smooth target, and a dropup item), and toast (an orphan trigger).
3. Dropdown virtual-element reference (js/tests/unit/dropdown.spec.js:537): CSS anchor positioning needs an element, so the engine cannot serve a `getBoundingClientRect` object. The recommended path refuses it by type and records a row for the silent toggle fallback (src/browser/Dropdown.ts:120-124); the alternative throws a `VeneerError` with a code.
4. Dropdown positioning: the recommended path repairs the placement attribute timing by deferring the first write past shown.bs.dropdown (src/browser/Dropdown.ts:142-143) and repairs navbar detection by caching it at construction and refreshing it in `update` (Dropdown.ts:97), and it refuses positioning a static menu whose `popperConfig` carries modifiers, with a row (js/src/dropdown.js:313-324).
5. Transition completion: the recommended path repairs completion to the first own transition's finish (src/browser/helpers.ts:946-948) and keeps early completion on cancellation, which guides/veneer.md:640 states, with a row recording Bootstrap's padded bound (js/src/util/index.js:250-255).
6. Bootstrap's class API: the recommended path refuses, in one sentence at guides/veneer.md:616, the class statics (VERSION, NAME, DATA_KEY, EVENT_KEY, Default, and DefaultType), mutable global defaults (Toast.Default and Tooltip.Default.allowList), the selector-string constructor, `toggleEnabled`, `isShown`, and the jQuery interface, and it narrows guides/veneer.md:718 to identical markup and the data API so the factory differences stay in prose (markup-built replacement at :622, REGISTRY_CONFLICT at :620, no-op methods after destroy at :634, and `VeneerError` messages). The alternative adds a row for each difference.
7. Browser floor: the recommended path states the floor that CSS anchor positioning, `Array.prototype.findLast`, and signal-bound listeners set in the Browser entry chapter near guides/veneer.md:646, refuses Bootstrap's `scrollTop` fallback (js/src/scrollspy.js:146-147), and refuses the touch-event branch for realms without PointerEvent (src/browser/Swipe.ts:48-65), which every browser that implements anchor positioning never reaches. That path deletes the branch and withdraws 4 claims from F5 and F6 (js/tests/unit/carousel.spec.js:493, :534, and :621, and js/tests/unit/util/swipe.spec.js:160); the alternative keeps the branch and proves it in frames without PointerEvent.
