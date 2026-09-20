# U4a-obligations report (Grok, session df7e1e1c-0b2f-47c1-b37b-d555a2985f95, 233022 ms)

I'll read the brief and the required orchestration files first, then execute it exactly as specified.The brief is a read-only source sweep of Bootstrap 5.3.8. I’ll pull the listed files next and extract the obligation rows from them.Next I’ll read the shared utilities and confirm the ESM export list.Question
For each Bootstrap 5.3.8 JavaScript component, what behavior does the official source commit to: data attributes, option keys with defaults and types, static and instance methods, event names with cancelability, keyboard handling, dismissal rules, initialization forms, and the shared utilities each one depends on?

Evidence

Installed version `"5.3.8"` at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/package.json:4`. ESM banner `Bootstrap v5.3.8` at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/dist/js/bootstrap.esm.js:2`. Named exports `Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, Tooltip` at `bootstrap.esm.js:4446`. Paths below are under `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/`.

### BaseComponent
1. Identity. No `NAME`. `VERSION` `'5.3.8'` `js/src/base-component.js:17`. `DATA_KEY` `` `bs.${this.NAME}` `` `:73-75`. `EVENT_KEY` `` `.${this.DATA_KEY}` `` `:77-79`. `eventName(name)` `` `${name}${this.EVENT_KEY}` `` `:81-83`. `Default`/`DefaultType` inherited empty from Config `js/src/util/config.js:17-23`.
2. Data attributes. Constructor `_getConfig` → `_mergeConfigObj(config, this._element)` `base-component.js:53-57` which reads `data-bs-config` then all `data-bs-*` except `data-bs-config` via Manipulator `config.js:40-48`.
3. Methods. `constructor(element, config)` no-op if `getElement(element)` falsy `:24-30`. `dispose()` `:39-46`. `_queueCallback` → `executeAfterTransition` `:49-51`. static `getInstance` `:61-63`. static `getOrCreateInstance(element, config = {})` `:65-67`. static `VERSION` `:69-71`.
4–7. None of its own.
9. Initialization. `constructor(element, config)` `:24`; `Data.set(this._element, this.constructor.DATA_KEY, this)` `:35`.

### Alert
1. Identity. `NAME` `'alert'` `js/src/alert.js:17`. `DATA_KEY` `'bs.alert'` `:18`. `EVENT_KEY` `` `.${DATA_KEY}` `` → `.bs.alert` `:19`. No component `Default`/`DefaultType`.
2. Data attributes. `enableDismissTrigger(Alert, 'close')` `:79` binds document `click.dismiss.bs.alert` on `[data-bs-dismiss="alert"]` `js/src/util/component-functions.js:12-16`. Target via `data-bs-target`/`href` or `.alert` closest `:25-26`.
3. Methods. `close()` `:37-48`; no-op if `close.bs.alert` `defaultPrevented` `:40-42`. `_destroyElement()` `:51-55`. static `jQueryInterface` `:58-72` throws if missing/`_`/`constructor`. Inherited `getInstance`/`getOrCreateInstance`/`dispose`.
4. Events. `close.bs.alert` then if not prevented remove `show` then after transition `closed.bs.alert`. `close` checks `defaultPrevented` `:38-42`. `closed` does not `:53`. Payload none.
5. Keyboard. None.
6. Dismissal. Dismiss click on `[data-bs-dismiss="alert"]`; disabled trigger returns `component-functions.js:21-23`. `<a>`/`<area>` `preventDefault` `:17-19`. No click-outside, Escape, backdrop, autohide, or focus trap.
7. Transitions. `_queueCallback` → `executeAfterTransition` `alert.js:47` + `base-component.js:49-51`. Removes `show` `:44`. Animated iff `fade` `:46`. Then `_destroyElement` removes node. `TRANSITION_END` emulation in `executeAfterTransition` `js/src/util/index.js:229-255` (`transitionend` `:10`, padding `5` ms `:235`, `triggerTransitionEnd` `:70-72,:251-254`).
9. Initialization. `constructor` via BaseComponent. `enableDismissTrigger(Alert, 'close')` `alert.js:79`. `defineJQueryPlugin(Alert)` `:85`. No load auto-init.

### Button
1. Identity. `NAME` `'button'` `js/src/button.js:16`. `DATA_KEY` `'bs.button'` `:17`. `EVENT_KEY` `.bs.button` `:18`. No `Default`/`DefaultType`.
2. Data attributes. `SELECTOR_DATA_TOGGLE` `[data-bs-toggle="button"]` `:22`. Document `click.bs.button.data-api` `:23,:57-64`.
3. Methods. `toggle()` `:36-39` no no-op guard. static `jQueryInterface` only runs when `config === 'toggle'` `:42-50`.
4. Events. None triggered.
5. Keyboard. None.
6. Dismissal. None.
7. Transitions. None. Toggles class `active` and `aria-pressed` `:38`.
9. Initialization. Data-api `getOrCreateInstance` + `toggle()` on click `:60-63` with `event.preventDefault` `:58`. `defineJQueryPlugin(Button)` `:70`.

### Carousel
1. Identity. `NAME` `'carousel'` `js/src/carousel.js:26`. `DATA_KEY` `'bs.carousel'` `:27`. `EVENT_KEY` `.bs.carousel` `:28`. `Default` `{ interval: 5000, keyboard: true, pause: 'hover', ride: false, touch: true, wrap: true }` `:70-77`. `DefaultType` `{ interval: '(number|boolean)', keyboard: 'boolean', pause: '(string|boolean)', ride: '(boolean|string)', touch: 'boolean', wrap: 'boolean' }` `:79-86`.
2. Data attributes. Options via Config `data-bs-*` / `data-bs-config`. `data-bs-interval` on item `getAttribute` `:295`. `[data-bs-slide], [data-bs-slide-to]` `:62`; document `click.bs.carousel.data-api` `:47,:432-458`; `Manipulator.getDataAttribute(this, 'slide')` `:450`. `[data-bs-ride="carousel"]` `:63`; window `load.bs.carousel.data-api` `:46,:460-466`. Indicator `[data-bs-slide-to="${index}"]` `:280`.
3. Methods. `constructor` cycles if `ride === 'carousel'` `:105-107`. `next()` `:124-126`. `nextWhenVisible` no-op if `document.hidden` or not `isVisible` `:128-135`. `prev()` `:137-139`. `pause()` `:141-147`. `cycle()` `:149-154`. `to(index)` no-op if out of range `:171-173`, defers if `_isSliding` `:175-178`, no-op if same index `:181-183`. `dispose()` `:190-196`. `_slide` no-op if `_isSliding` `:301-303` or `nextElement === activeElement` `:309-311`. static `jQueryInterface` number → `to`, string method `:408-425`.
4. Events. `slide.bs.carousel` then `slid.bs.carousel` (after transition). `slide` checks `defaultPrevented` `:324-328`. `slid` does not `:362`. Payload `{ relatedTarget, direction, from, to }` `:316-321`. Listens `keydown`/`mouseenter`/`mouseleave`/`dragstart` internally; does not trigger them.
5. Keyboard. If `keyboard: true` `:205-207`. `ArrowLeft` → direction `right`, `ArrowRight` → `left` `:31-32,:65-68,:254-263`. Ignored in `input|textarea` `:255-257`. `preventDefault` then `_slide`. No Escape/Home/End/Tab/Space.
6. Dismissal. None. `pause: 'hover'` pauses on mouseenter, `_maybeEnableCycle` on mouseleave `:209-212`. Touch end pauses then restarts after `500 + interval` if pause hover `:224-243`.
7. Transitions. `_queueCallback(completeCallBack, activeElement, this._isAnimated())` `:365`. Animated iff class `slide` `:372-374`. Order: add `carousel-item-next` or `carousel-item-prev` on next `:347`; `reflow` `:349`; add `carousel-item-start` or `carousel-item-end` on active and next `:351-352`; on complete remove directional/order classes, add `active` on next, remove `active`/order/directional on old `:355-358`. `pause` while sliding calls `triggerTransitionEnd` `:142-144`. Uses `executeAfterTransition` via `_queueCallback`.
8. Constructs `Swipe` when `touch && Swipe.isSupported()` `:214-216,:251`.
9. Initialization. `constructor(element, config)` `:93`. Click data-api `getOrCreateInstance` then `to`/`next`/`prev` + `_maybeEnableCycle` `:441-457`. Load: every `[data-bs-ride="carousel"]` `getOrCreateInstance` `:460-466`. `defineJQueryPlugin(Carousel)` `:472`.

### Collapse
1. Identity. `NAME` `'collapse'` `js/src/collapse.js:21`. `DATA_KEY` `'bs.collapse'` `:22`. `EVENT_KEY` `.bs.collapse` `:23`. `Default` `{ parent: null, toggle: true }` `:45-48`. `DefaultType` `{ parent: '(null|element)', toggle: 'boolean' }` `:50-53`.
2. Data attributes. Options via Config. `[data-bs-toggle="collapse"]` `:43`. Document `click.bs.collapse.data-api` `:30,:280-289`. Target via `SelectorEngine.getMultipleElementsFromSelector` (`data-bs-target`/`href`) `:286`. Constructor scans all `[data-bs-toggle="collapse"]` for triggers pointing at this element `:66-76`.
3. Methods. `constructor` calls `toggle()` if `config.toggle` `:84-86`. `toggle()` show vs hide by `_isShown()` `:103-108`. `show()` no-op if `_isTransitioning || _isShown()` `:112-114` or first active child `_isTransitioning` `:125-127`. `hide()` no-op if `_isTransitioning || !_isShown()` `:167-169`. `_isShown` class `show` `:208-210`. static `jQueryInterface` forces `toggle: false` for `'show'|'hide'` strings `:256-273`.
4. Events. Show path: `show.bs.collapse` (checks `defaultPrevented` `:129-132`) then `shown.bs.collapse` `:156`. Hide path: `hide.bs.collapse` (checks `:171-174`) then `hidden.bs.collapse` `:199`. Payload none.
5. Keyboard. None.
6. Dismissal. None. Accordion: `parent` hides sibling first-level `.collapse.show, .collapse.collapsing` `:119-136`.
7. Transitions. Always `_queueCallback(..., true)` `:162,:204`. Show: remove `collapse`, add `collapsing`, `style[dimension]=0` `:140-143`; complete: remove `collapsing`, add `collapse`+`show`, clear style `:151-154`. Hide: set size from `getBoundingClientRect`, `reflow` `:178-180`; add `collapsing`, remove `collapse`+`show` `:182-183`; complete: remove `collapsing`, add `collapse` `:197-198`. Horizontal: class `collapse-horizontal` uses `width` else `height` `:218-220`. Also toggles trigger `collapsed` + `aria-expanded` `:244-252`.
9. Initialization. `constructor(element, config)` `:60`. Click: `getOrCreateInstance(element, { toggle: false }).toggle()` `:287`. `preventDefault` for `A` `:282-284`. `defineJQueryPlugin(Collapse)` `:295`.

### Dropdown
1. Identity. `NAME` `'dropdown'` `js/src/dropdown.js:29`. `DATA_KEY` `'bs.dropdown'` `:30`. `EVENT_KEY` `.bs.dropdown` `:31`. `Default` `{ autoClose: true, boundary: 'clippingParents', display: 'dynamic', offset: [0, 2], popperConfig: null, reference: 'toggle' }` `:71-78`. `DefaultType` `{ autoClose: '(boolean|string)', boundary: '(string|element)', display: 'string', offset: '(array|string|function)', popperConfig: '(null|object|function)', reference: '(string|element|object)' }` `:80-87`.
2. Data attributes. Options via Config. `[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)` `:55`. Document `click.bs.dropdown.data-api` on that selector `:44,:444-447`. Document `click` and `keyup` call `clearMenus` `:442-443`. Document `keydown` on toggle and `.dropdown-menu` `:440-441`. Writes `data-bs-popper="static"` on menu when navbar or `display==='static'` `:314`. Reads `--bs-position` CSS not data-attr `:268`.
3. Methods. `toggle()` `:120-122`. `show()` no-op if `isDisabled` or `_isShown()` `:125-127`. `hide()` no-op if `isDisabled` or not shown `:160-162`. `dispose()` destroys popper `:171-177`. `update()` `:179-184`. static `clearMenus` `:356-392`. static `dataApiKeydownHandler` `:394-433`. static `jQueryInterface` `:340-354`. `_isShown` menu has `show` `:244-246`.
4. Events. `show.bs.dropdown` (checks `defaultPrevented` `:133-137`, payload `{ relatedTarget }` `:129-131`) then `shown.bs.dropdown` same payload `:156`. Hide: `hide.bs.dropdown` (checks `:188-191`) then `hidden.bs.dropdown` `:209`. `clearMenus` may add `clickEvent` on click `:386-388`.
5. Keyboard. `Escape` / `ArrowUp` / `ArrowDown` on toggle or menu `:394-433`. Up/Down: `preventDefault`+`stopPropagation`, `show()`, `_selectMenuItem` `:421-425`. Escape if shown: `stopPropagation`, `hide()`, focus toggle `:428-431`. `Tab` in `clearMenus`: keyup only proceeds for Tab `:357`; Tab inside menu does not close `:379-381`. Ignored in input/textarea except Escape `:398-408`. Right mouse button ignored `:357`.
6. Dismissal. `autoClose: true` (default) closes on outside click/keyup via `clearMenus` `:365-376`. `false` skips. `'inside'` skips if click not in menu. `'outside'` skips if click in menu. Click on toggle itself skipped `:372`. Escape hides `:428-431`. No backdrop. `show` focuses toggle `:151`.
7. Transitions. None. Adds/removes `show` on menu and toggle immediately `:154-155,:205-206`.
9. Initialization. `constructor(element, config)` `:94`. Click toggle: `preventDefault` + `getOrCreateInstance(this).toggle()` `:444-447`. `defineJQueryPlugin(Dropdown)` `:453`. Popper required at `show`/`_createPopper` `:226-228`.

### Modal
1. Identity. `NAME` `'modal'` `js/src/modal.js:23`. `DATA_KEY` `'bs.modal'` `:24`. `EVENT_KEY` `.bs.modal` `:25`. `Default` `{ backdrop: true, focus: true, keyboard: true }` `:50-54`. `DefaultType` `{ backdrop: '(boolean|string)', focus: 'boolean', keyboard: 'boolean' }` `:56-60`.
2. Data attributes. Options via Config. `[data-bs-toggle="modal"]` `:48`. Document `click.bs.modal.data-api` `:38,:339-368`. Target `getElementFromSelector` (`data-bs-target`/`href`) `:340`. `enableDismissTrigger(Modal)` → `[data-bs-dismiss="modal"]` `:370` + `component-functions.js:16` method `hide`.
3. Methods. `toggle(relatedTarget)` `:94-96`. `show` no-op if `_isShown || _isTransitioning` `:99-101`. `hide` no-op if `!_isShown || _isTransitioning` `:124-126`. `dispose()` `:143-151`. `handleUpdate()` `:153-155`. static `jQueryInterface(config, relatedTarget)` `:318-332`.
4. Events. `show.bs.modal` (checks `defaultPrevented` `:103-109`, `{ relatedTarget }` `:103-105`) → after dialog transition `shown.bs.modal` `{ relatedTarget }` `:198-200`. `hide.bs.modal` (checks `:128-132`) → after hide/backdrop `hidden.bs.modal` `:256`. Static/backdrop-escape: `hidePrevented.bs.modal` (checks `defaultPrevented` `:265-268`). Listens `resize` internally `:220`.
5. Keyboard. `Escape` on `keydown.dismiss` `:207-218`. If `keyboard: true`, `hide()` `:212-214`. Else `_triggerBackdropTransition` `:217`. FocusTrap handles `Tab` (see focustrap).
6. Dismissal. Backdrop click (mousedown+click both on `_element`): `backdrop === 'static'` → `_triggerBackdropTransition`; else if `backdrop` truthy `hide()` `:226-241`. `backdrop` false: no element, Backdrop `isVisible: false` `:159-162`. `keyboard` as above. `focus: true` activates FocusTrap after shown `:193-195`. Data-api restores focus to trigger on `hidden` if visible `:352-356`. Opening one hides already-open `.modal.show` `:360-363`. Adds `modal-open` on body `:116`.
7. Transitions. Animated iff `fade` on element `:260-262`. Show: Backdrop.show then display/aria, `reflow`, add `show` `:188-190`; `_queueCallback` on `_dialog` `:203`. Hide: remove `show` `:138`; `_queueCallback` `_hideModal` `:140`; backdrop hide then `hidden`. Static: add `modal-static`, queue remove `:281-287`. `executeAfterTransition` via `_queueCallback` and Backdrop.
8. Constructs Backdrop `:71,:159`, FocusTrap `:72,:166` (`trapElement: this._element`), ScrollBarHelper `:75,:114,:255`.
9. Initialization. `constructor(element, config)` `:67`. Click `[data-bs-toggle="modal"]` `toggle(this)` `:365-367`. `enableDismissTrigger(Modal)` `:370`. `defineJQueryPlugin(Modal)` `:376`.

### Offcanvas
1. Identity. `NAME` `'offcanvas'` `js/src/offcanvas.js:25`. `DATA_KEY` `'bs.offcanvas'` `:26`. `EVENT_KEY` `.bs.offcanvas` `:27`. `Default` `{ backdrop: true, keyboard: true, scroll: false }` `:49-53`. `DefaultType` `{ backdrop: '(boolean|string)', keyboard: 'boolean', scroll: 'boolean' }` `:55-59`.
2. Data attributes. Options via Config. `[data-bs-toggle="offcanvas"]` `:47`. Document `click.bs.offcanvas.data-api` `:44,:232-258`. Window `load.bs.offcanvas.data-api` on `.offcanvas.show` `:29,:260-264`. Resize hides non-`fixed` `[aria-modal][class*=show][class*=offcanvas-]` `:266-272`. `enableDismissTrigger(Offcanvas)` `[data-bs-dismiss="offcanvas"]` `:274`.
3. Methods. `toggle(relatedTarget)` `:89-91`. `show` no-op if `_isShown` `:94-96`. `hide` no-op if `!_isShown` `:129-131`. `dispose()` `:160-164`. static `jQueryInterface` throws on `_`/`constructor`/missing `:211-225`.
4. Events. `show.bs.offcanvas` `{ relatedTarget }` checks `defaultPrevented` `:98-102` → `shown.bs.offcanvas` `{ relatedTarget }` `:122`. `hide.bs.offcanvas` checks `:133-137` → `hidden.bs.offcanvas` `:154`. Static backdrop / Escape-when-`keyboard:false`: `hidePrevented.bs.offcanvas` **does not** check `defaultPrevented` `:170,:206`.
5. Keyboard. `Escape` `keydown.dismiss` `:196-207`. If `keyboard`, `hide()`; else trigger `hidePrevented`. FocusTrap `Tab`.
6. Dismissal. Backdrop clickCallback: `backdrop === 'static'` → `hidePrevented`; else `hide()` `:168-175`. `keyboard` as above. `scroll: false` hides scrollbar `:107-109` and (with backdrop) activates FocusTrap `:116-118`. Trigger focus restore on `hidden` `:243-248`. Another open offcanvas is hidden first `:251-254`.
7. Transitions. Always `_queueCallback(..., true)` `:125,:157`. Show: add `showing` `:113`; complete add `show` remove `showing` `:120-121`. Hide: add `hiding` `:142`; complete remove `show`+`hiding` `:146`.
8. Backdrop with `className: 'offcanvas-backdrop'`, `isAnimated: true`, `rootElement: parentNode` `:180-186`. FocusTrap `:190-192`. `new ScrollBarHelper()` when `!scroll` `:108,:151`.
9. Initialization. `constructor(element, config)` `:66`. Click toggle. Load: `getOrCreateInstance(selector).show()` for `.offcanvas.show` `:260-264`. `enableDismissTrigger(Offcanvas)` `:274`. `defineJQueryPlugin(Offcanvas)` `:280`. Disabled trigger returns `:239-241`.

### Tooltip
1. Identity. `NAME` `'tooltip'` `js/src/tooltip.js:22`. `DATA_KEY`/`EVENT_KEY` via BaseComponent → `bs.tooltip` / `.bs.tooltip`. `Default` `{ allowList: DefaultAllowlist, animation: true, boundary: 'clippingParents', container: false, customClass: '', delay: 0, fallbackPlacements: ['top', 'right', 'bottom', 'left'], html: false, offset: [0, 6], placement: 'top', popperConfig: null, sanitize: true, sanitizeFn: null, selector: false, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', title: '', trigger: 'hover focus' }` `:58-79`. `DefaultType` `{ allowList: 'object', animation: 'boolean', boundary: '(string|element)', container: '(string|element|boolean)', customClass: '(string|function)', delay: '(number|object)', fallbackPlacements: 'array', html: 'boolean', offset: '(array|string|function)', placement: '(string|function)', popperConfig: '(null|object|function)', sanitize: 'boolean', sanitizeFn: '(null|function)', selector: '(string|boolean)', template: 'string', title: '(string|element|function)', trigger: 'string' }` `:81-99`.
2. Data attributes. `_getConfig` reads `Manipulator.getDataAttributes` then **deletes** `sanitize`, `allowList`, `sanitizeFn` `:540-546` (`DISALLOWED_ATTRIBUTES` `:23`). Remaining `data-bs-*` merge as options. Copies `title` → `data-bs-original-title` and removes `title` `:486-498`. Restores `title` on dispose `:176-178`. Title content from config or `data-bs-original-title` `:357`. No `data-bs-toggle` listener. Hides on closest `.modal` `hide.bs.modal` `:32,:174,:483`.
3. Methods. `constructor` throws if Popper missing `:107-109`. `enable`/`disable`/`toggleEnabled` `:146-156`. `toggle()` no-op if `!_isEnabled` `:159-161`; `_leave` if shown else `_enter`. `dispose` `:171-182`. `show()` throws if `display==='none'` `:185-187`; no-op if `!(_isWithContent() && _isEnabled)` `:189-191`; no-op if `show` prevented or not in DOM `:197-199`. `hide()` no-op if `!_isShown()` `:243-245`; no-op if `hide` prevented `:248-250`. `update()` `:284-288`. `setContent` `:326-332`. static `jQueryInterface` `:610-624`. `_isShown` tip has `show` `:369-371`.
4. Events. Names via `eventName`: `show.bs.tooltip` (checks `defaultPrevented` `:193,:197`) → optional `inserted.bs.tooltip` when tip appended `:212` (not checked) → `shown.bs.tooltip` `:230` (not checked). `hide.bs.tooltip` (checks `:247-250`) → `hidden.bs.tooltip` `:278`. Payload none.
5. Keyboard. None of Escape/arrows/Tab/Space. Focus trigger uses `focusin`/`focusout` `:454-473`.
6. Dismissal. `trigger` tokens `hover|focus|click|manual` `:34-37,:444-475`. Click toggles. Hover/focus enter/leave with `delay.show`/`delay.hide` (number coerced to both `:561-566`). Manual no listeners. Modal hide forces `hide()` `:477-483`. No click-outside closer, no Escape, no backdrop, no autohide timer.
7. Transitions. `_queueCallback(complete, this.tip, this._isAnimated())` `:239,:281`. Animated if `animation` or tip has `fade` `:365-367`. Create: remove `fade`+`show` `:311`, add `fade` if animated `:319-321`. `show` adds `show` `:217`. `hide` removes `show` `:253`.
8. `TemplateFactory` `:338`. `DefaultAllowlist` from sanitizer `:15,:59`. Popper `:216,:376`.
9. Initialization. `constructor(element, config)` `:106`. **No** document/window data-api auto-init. `defineJQueryPlugin(Tooltip)` `:631`. `selector` delegates then creates child instance with `trigger: 'manual'` `:361-363,:579-590`.

### Popover
1. Identity. `NAME` `'popover'` `js/src/popover.js:15`. `DATA_KEY`/`EVENT_KEY` → `bs.popover` / `.bs.popover`. `Default` `{ ...Tooltip.Default, content: '', offset: [0, 8], placement: 'right', template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', trigger: 'click' }` `:20-31`. `DefaultType` `{ ...Tooltip.DefaultType, content: '(null|string|element|function)' }` `:33-36`.
2. Data attributes. Same Tooltip pipeline (including disallowed sanitize keys). No `data-bs-toggle` listener. Template fills `.popover-header` / `.popover-body` `:17-18,:62-66`.
3. Methods. Inherits Tooltip public methods. Overrides `_isWithContent` title or content `:57-59`. `_getContent` `:69-71`. static `jQueryInterface` `:74-88`.
4. Events. Same namespaced as Tooltip but `.bs.popover` via `NAME`. Same cancelability as Tooltip.
5–7. Same as Tooltip (`trigger` default `'click'`).
8. Same TemplateFactory/sanitizer/Popper via Tooltip.
9. Initialization. `defineJQueryPlugin(Popover)` `:95`. **No** data-api auto-init.

### ScrollSpy
1. Identity. `NAME` `'scrollspy'` `js/src/scrollspy.js:19`. `DATA_KEY` `'bs.scrollspy'` `:20`. `EVENT_KEY` `.bs.scrollspy` `:21`. `Default` `{ offset: null, rootMargin: '0px 0px -25%', smoothScroll: false, target: null, threshold: [0.1, 0.5, 1] }` `:41-47`. `DefaultType` `{ offset: '(number|null)', rootMargin: 'string', smoothScroll: 'boolean', target: 'element', threshold: 'array' }` `:49-55`.
2. Data attributes. Options via Config including `data-bs-spy` consumed as option `spy` only if present; auto-init selector `[data-bs-spy="scroll"]` `:31`. Window `load.bs.scrollspy.data-api` `:26,:284-288`. Smooth-scroll listens clicks on `[href]` inside `config.target` `:135`.
3. Methods. `constructor` calls `refresh()` `:75`. `refresh()` `:92-105`. `dispose()` disconnects observer `:107-110`. static `jQueryInterface` `:263-277`.
4. Events. `activate.bs.scrollspy` `{ relatedTarget: target }` `:233`. Does **not** check `defaultPrevented`. Internal `click.bs.scrollspy` for smoothScroll `:25,:133`.
5. Keyboard. None.
6. Dismissal. None.
7. Transitions. None. Toggles class `active` on links and parents `:230,:240,:248,:254-258`.
9. Initialization. `constructor(element, config)` `:62`. Load: `ScrollSpy.getOrCreateInstance(spy)` for each `[data-bs-spy="scroll"]` `:284-288`. `defineJQueryPlugin(ScrollSpy)` `:294`. After merge, `target` defaults to `document.body` `:115`. `offset` if set rewrites `rootMargin` to `` `${offset}px 0px -30%` `` `:118`. String `threshold` split to floats `:120-122`.

### Tab
1. Identity. `NAME` `'tab'` `js/src/tab.js:17`. `DATA_KEY` `'bs.tab'` `:18`. `EVENT_KEY` `.bs.tab` `:19`. No `Default`/`DefaultType`.
2. Data attributes. `[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]` `:48`. Document `click.bs.tab` `:25,:289-299`. Load `load.bs.tab` on `.active[data-bs-toggle="tab"|"pill"|"list"]` `:51,:304-308`. Panel via `data-bs-target`/`href` `SelectorEngine.getElementFromSelector` `:111,:216`.
3. Methods. `constructor(element)` **no config** `:58`; returns early if no parent `.list-group, .nav, [role="tablist"]` `:60-66`. `show()` no-op if already active `:82-84`; no-op if `show` or sibling `hide` `defaultPrevented` `:95-97`. static `jQueryInterface` `:268-282`.
4. Events. On active sibling: `hide.bs.tab` `{ relatedTarget: innerElem }` `:89-91` (checked `:95`). On shown tab: `show.bs.tab` `{ relatedTarget: active }` `:93` (checked). Then `_deactivate`/`_activate`. After transition: `hidden.bs.tab` `{ relatedTarget }` `:149`; `shown.bs.tab` `{ relatedTarget }` `:122-124`. If `role !== 'tab'`, `shown`/`hidden` are **not** fired; only `show` class toggled `:114-116,:141-143`.
5. Keyboard. On the tab element `keydown` `:71`. `ArrowLeft`/`ArrowUp` previous, `ArrowRight`/`ArrowDown` next, `Home` first, `End` last `:155-176`. `stopPropagation`+`preventDefault` `:160-161`. Skips `isDisabled`. Cycles via `getNextActiveElement(..., true)` `:170`. Then `focus({ preventScroll: true })` + `show()` `:174-175`. No Escape/Tab/Space.
6. Dismissal. None. Dropdown tabs: `_toggleDropDown` toggles `active` on `.dropdown-toggle`, `show` on `.dropdown-menu`, `aria-expanded` `:229-245`.
7. Transitions. `_queueCallback(complete, element, element.classList.contains('fade'))` `:127,:152`. Activate: add `active` `:109`; if not role tab add `show`; else aria/tabindex/dropdown then `shown`. Deactivate: remove `active`, `blur`; if not role tab remove `show`; else aria then `hidden`.
9. Initialization. Click: disabled return `:294-296`; `getOrCreateInstance(this).show()` `:298`. Load initializes already-active toggles `:304-308`. `defineJQueryPlugin(Tab)` `:313`. `A`/`AREA` `preventDefault` `:290-292`.

### Toast
1. Identity. `NAME` `'toast'` `js/src/toast.js:17`. `DATA_KEY` `'bs.toast'` `:18`. `EVENT_KEY` `.bs.toast` `:19`. `DefaultType` `{ animation: 'boolean', autohide: 'boolean', delay: 'number' }` `:35-39`. `Default` `{ animation: true, autohide: true, delay: 5000 }` `:41-45`.
2. Data attributes. Options via Config. `enableDismissTrigger(Toast)` `[data-bs-dismiss="toast"]` → `hide` `:216`.
3. Methods. `show()` `:75-100`; no-op if `show` prevented `:78-80`. `hide()` no-op if `!isShown()` `:103-105`; no-op if `hide` prevented `:109-111`. `dispose()` `:123-131`. `isShown()` class `show` `:133-135`. static `jQueryInterface` `:197-209`.
4. Events. `show.bs.toast` (checked `:76-80`) → `shown.bs.toast` `:90`. `hide.bs.toast` (checked `:107-111`) → `hidden.bs.toast` `:116`. Payload none.
5. Keyboard. No key names. `focusin`/`focusout` pause autohide `:161-163,:187-188`.
6. Dismissal. `[data-bs-dismiss="toast"]`. `autohide: true` schedules `hide` after `delay` unless mouse or keyboard interaction `:138-150`. Interaction clears timeout; leaving schedules again unless `relatedTarget` inside `:171-181`. No Escape, click-outside, or backdrop.
7. Transitions. `_queueCallback(complete, this._element, this._config.animation)` `:99,:120`. Show: optional add `fade` `:84-86`; remove deprecated `hide`; `reflow`; add `show`+`showing` `:95-97`; complete remove `showing` `:89`. Hide: add `showing` `:119`; complete add `hide`, remove `showing`+`show` `:114-115`.
9. Initialization. `constructor(element, config)` `:52`. No load/click toggle auto-init. `enableDismissTrigger(Toast)` `:216`. `defineJQueryPlugin(Toast)` `:222`.

### util/backdrop.js
Exported default class `Backdrop`. `NAME` `'backdrop'` `:18`. `Default` `{ className: 'modal-backdrop', clickCallback: null, isAnimated: false, isVisible: true, rootElement: 'body' }` `:23-29`. `DefaultType` `{ className: 'string', clickCallback: '(function|null)', isAnimated: 'boolean', isVisible: 'boolean', rootElement: '(element|string)' }` `:31-37`. Methods `show`/`hide` no-op-execute callback if `!isVisible` `:66-68,:86-88`; `dispose`. Mousedown on element runs `clickCallback` `:139-141`. Adds `fade` if animated `:115-117`; adds/removes `show` `:78,:91`. `_emulateAnimation` → `executeAfterTransition` `:146-148`. Constructed by Modal `js/src/modal.js:159-162` and Offcanvas `js/src/offcanvas.js:180-186`.

### util/focustrap.js
Exported default class `FocusTrap`. `NAME` `'focustrap'` `:16`. `DATA_KEY` `'bs.focustrap'` `:17`. `Default` `{ autofocus: true, trapElement: null }` `:26-29`. `DefaultType` `{ autofocus: 'boolean', trapElement: 'element' }` `:31-34`. `activate` no-op if `_isActive` `:63-65`; focuses `trapElement` if autofocus; listens document `focusin` + `keydown.tab` `:71-73`. `deactivate` no-op if inactive `:79-81`. `_handleKeydown` records Tab direction if `event.key === 'Tab'` `:106-111` (`shiftKey` backward). `_handleFocusin` refocuses first/last `focusableChildren` or trap `:88-104`. Constructed by Modal `modal.js:166-168` and Offcanvas `offcanvas.js:190-192` with `{ trapElement: this._element }` (autofocus default true).

### util/scrollbar.js
Exported default class `ScrollBarHelper`. No Config. `constructor()` uses `document.body` `:26-28`. Public `getWidth()` `:31-35`, `hide()` `:37-45`, `reset()` `:47-52`, `isOverflowing()` `:54-56`. Selectors `.fixed-top, .fixed-bottom, .is-fixed, .sticky-top` `:16` and `.sticky-top` `:17`. Saves overflow/padding/margin via `Manipulator.setDataAttribute`. Constructed by Modal as `this._scrollBar` `modal.js:75` (`hide` `:114`, `reset` `:255`, `getWidth` `:298`). Offcanvas `new ScrollBarHelper().hide()/reset()` when `!scroll` `offcanvas.js:108,:151`.

### util/swipe.js
Exported default class `Swipe`. `NAME` `'swipe'` `:16`. `EVENT_KEY` `.bs.swipe` `:17`. `Default` `{ endCallback: null, leftCallback: null, rightCallback: null }` `:28-32`. `DefaultType` all `'(function|null)'` `:34-38`. `constructor(element, config)` returns if `!element || !Swipe.isSupported()` `:49-51`. `dispose` off `.bs.swipe` `:73-75`. static `isSupported()` `ontouchstart` or `maxTouchPoints > 0` `:141-143`. Threshold `40` `:26`. Pointer or touch; class `pointer-event` when pointer `:128`. Constructed by Carousel `carousel.js:245-251`.

### util/sanitizer.js
Exported `DefaultAllowlist` `:11-46` and `sanitizeHtml(unsafeHtml, allowList, sanitizeFunction)` `:84-116`. URI attrs checked against `SAFE_URL_PATTERN` forbidding `javascript:` `:49-58,:66,:72-73`. If `sanitizeFunction` is a function, it is used instead `:89-91`. Used by TemplateFactory `template-factory.js:10,:142` and Tooltip `Default.allowList` `tooltip.js:15,:59`. No component constructs a class; it is functions + allowlist.

### util/template-factory.js
Exported default class `TemplateFactory`. `NAME` `'TemplateFactory'` `:17`. `Default` `{ allowList: DefaultAllowlist, content: {}, extraClass: '', html: false, sanitize: true, sanitizeFn: null, template: '<div></div>' }` `:19-27`. `DefaultType` matching `:29-37`. Extra `DefaultContentType` `{ entry: '(string|element|function|null)', selector: '(string|element)' }` `:39-42`. Public `getContent`, `hasContent`, `changeContent`, `toHtml`. Constructed by Tooltip `_getTemplateFactory` `tooltip.js:338-344` (Popover inherits).

### util/config.js
Exported default class `Config`. `Default` `{}` `:17-19`. `DefaultType` `{}` `:21-23`. `NAME` getter throws `:25-27`. `_mergeConfigObj`: `Default` then `data-bs-config` JSON then `getDataAttributes` then `config` object `:40-48`. `_typeCheckConfig` regex on `toType` `:51-62`. Extended by BaseComponent (hence every component) and Backdrop, FocusTrap, Swipe, TemplateFactory.

### util/component-functions.js
Exported `enableDismissTrigger(component, method = 'hide')` `:12-31`. Document `click.dismiss${component.EVENT_KEY}` on `[data-bs-dismiss="${component.NAME}"]`. Used by Alert (`'close'`), Modal, Offcanvas, Toast (default `'hide'`).

### util/index.js
`TRANSITION_END` `'transitionend'` `:10`. `getTransitionDurationFromElement` `:47-68`. `triggerTransitionEnd` `:70-72`. `executeAfterTransition` listens `transitionend`, emulates after duration+5ms `:229-256`. `onDOMContentLoaded` `:189-204` used by `defineJQueryPlugin` `:208-223`. `getjQuery` skipped if `document.body` has `data-bs-no-jquery` `:179-185`. `defineJQueryPlugin` registers `$.fn[NAME] = jQueryInterface` after DOM ready. No component file calls `onDOMContentLoaded` except through `defineJQueryPlugin`. Other exports: `execute`, `findShadowRoot`, `getElement`, `getNextActiveElement`, `getUID`, `isDisabled`, `isElement`, `isRTL`, `isVisible`, `noop`, `parseSelector`, `reflow`, `toType`.

### dom/event-handler.js
Exported default `EventHandler` with `on`, `one`, `off`, `trigger` `:214-297`. `trigger` builds `new Event(event, { bubbles, cancelable: true })` `:282` and hydrates payload keys. Used by every component.

### dom/selector-engine.js
Exported default `SelectorEngine`: `find`, `findOne`, `children`, `parents`, `prev`, `next`, `focusableChildren`, `getSelectorFromElement`, `getElementFromSelector`, `getMultipleElementsFromSelector` `:35-123`. `getSelector` reads `data-bs-target` else `href` id/class `:10-32`. Used by collapse/modal/offcanvas/tab/carousel/dropdown/scrollspy/focustrap/scrollbar/template-factory/component-functions.

### dom/data.js
Exported default `{ set, get, remove }` `:14-55`. One instance per element; second key logs error and returns `:24-28`. Used by BaseComponent constructor/dispose/`getInstance`.

### dom/manipulator.js
Exported default `{ setDataAttribute, removeDataAttribute, getDataAttributes, getDataAttribute }` `:40-68`. Prefix `data-bs-` kebab. `getDataAttributes` all `dataset` keys starting `bs` except `bsConfig` `:55`. Used by Config, Carousel click `slide`, Dropdown `popper` attr, Tooltip `_getConfig`, ScrollBarHelper.

Distillate

### Alert
| Obligation | Kind | Source |
|---|---|---|
| `data-bs-dismiss="alert"` document click → `close()` | attribute | `component-functions.js:16`; `alert.js:79` |
| `close()`; no-op if `close.bs.alert` prevented | method | `alert.js:37-42` |
| `close.bs.alert` cancelable; then `closed.bs.alert` | event | `alert.js:38-42,:53` |
| remove `show`; if `fade`, wait transition; then remove node | transition | `alert.js:44-47,:51-54` |
| `enableDismissTrigger` + `defineJQueryPlugin` | initialization | `alert.js:79,:85` |

### Button
| Obligation | Kind | Source |
|---|---|---|
| `data-bs-toggle="button"` document click, `preventDefault`, `toggle()` | attribute | `button.js:22,:57-64` |
| `toggle()` flips `active` and `aria-pressed` | method | `button.js:36-38` |
| jQuery only `'toggle'` | method | `button.js:46-48` |
| `defineJQueryPlugin` + click data-api | initialization | `button.js:57-70` |

### Carousel
| Obligation | Kind | Source |
|---|---|---|
| `interval` 5000 `(number\|boolean)`; `keyboard` true boolean; `pause` `'hover'` `(string\|boolean)`; `ride` false `(boolean\|string)`; `touch` true boolean; `wrap` true boolean | option | `carousel.js:70-86` |
| `[data-bs-slide], [data-bs-slide-to]` click; `data-bs-slide-to` → `to`; `data-bs-slide="next"` → `next` else `prev` | attribute | `carousel.js:62,:432-458` |
| `[data-bs-ride="carousel"]` window load `getOrCreateInstance` | attribute | `carousel.js:63,:460-466` |
| `data-bs-interval` on item overrides interval | attribute | `carousel.js:295-297` |
| `next`/`prev`/`to`/`cycle`/`pause`/`nextWhenVisible`; `_slide` no-op while `_isSliding` | method | `carousel.js:124-188,:301-303` |
| `slide.bs.carousel` cancelable payload `relatedTarget,direction,from,to`; then `slid.bs.carousel` same | event | `carousel.js:316-328,:362` |
| `ArrowLeft`/`ArrowRight` if `keyboard`, not in input/textarea | keyboard | `carousel.js:205-207,:254-263` |
| `pause:'hover'` mouseenter pause / mouseleave cycle | dismissal | `carousel.js:209-212` |
| class `slide` animates; order next/prev then start/end; complete `active` swap | transition | `carousel.js:344-365,:372-374` |
| `constructor`; load ride; click slide; `defineJQueryPlugin` | initialization | `carousel.js:93,:432-472` |

### Collapse
| Obligation | Kind | Source |
|---|---|---|
| `parent` null `(null\|element)`; `toggle` true boolean | option | `collapse.js:45-53` |
| `[data-bs-toggle="collapse"]` click → `getOrCreateInstance(..., {toggle:false}).toggle()` | attribute | `collapse.js:43,:280-288` |
| `show`/`hide` no-op if `_isTransitioning` or already shown/hidden | method | `collapse.js:111-114,:166-169` |
| `show.bs.collapse`/`hide.bs.collapse` cancelable; then `shown`/`hidden` | event | `collapse.js:129-132,:156,:171-174,:199` |
| remove `collapse` add `collapsing`; complete `collapse`+`show` (show) or `collapse` (hide) | transition | `collapse.js:140-154,:182-199` |
| `constructor` auto-`toggle()` if option; click data-api; `defineJQueryPlugin` | initialization | `collapse.js:60-86,:280-295` |

### Dropdown
| Obligation | Kind | Source |
|---|---|---|
| `autoClose` true `(boolean\|string)`; `boundary` `'clippingParents'` `(string\|element)`; `display` `'dynamic'` string; `offset` `[0,2]` `(array\|string\|function)`; `popperConfig` null `(null\|object\|function)`; `reference` `'toggle'` `(string\|element\|object)` | option | `dropdown.js:71-87` |
| `[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)` click toggle | attribute | `dropdown.js:55,:444-447` |
| `show`/`hide` no-op if disabled or already shown/hidden | method | `dropdown.js:125-127,:160-162` |
| `clearMenus` static outside/inside/false autoClose | method | `dropdown.js:356-392` |
| `show.bs.dropdown`/`hide.bs.dropdown` cancelable `{relatedTarget}`; optional `clickEvent`; then `shown`/`hidden` | event | `dropdown.js:133-156,:187-209,:384-388` |
| `ArrowUp`/`ArrowDown` show+focus item; `Escape` hide+focus toggle; `Tab` keyup may close unless inside menu | keyboard | `dropdown.js:394-433,:357,:379-381` |
| click-outside via `clearMenus`; `autoClose` true/`inside`/`outside`/`false` | dismissal | `dropdown.js:356-392` |
| immediate `show` class, no CSS transition queue | transition | `dropdown.js:154-155,:205-206` |
| `constructor`; document click/keydown/keyup data-api; `defineJQueryPlugin` | initialization | `dropdown.js:94,:440-453` |

### Modal
| Obligation | Kind | Source |
|---|---|---|
| `backdrop` true `(boolean\|string)`; `focus` true boolean; `keyboard` true boolean | option | `modal.js:50-60` |
| `[data-bs-toggle="modal"]` click `toggle`; `[data-bs-dismiss="modal"]` `hide` | attribute | `modal.js:48,:339-370` |
| `show`/`hide` no-op if `_isShown`/`_isTransitioning` mismatch | method | `modal.js:99-101,:124-126` |
| `show.bs.modal`/`hide.bs.modal` cancelable `{relatedTarget}` on show; `shown`/`hidden`; `hidePrevented.bs.modal` cancelable | event | `modal.js:103-109,:128-132,:198-200,:256,:265-268` |
| `Escape` hide if `keyboard` else static transition | keyboard | `modal.js:207-218` |
| backdrop click hide or static; `focus` → FocusTrap; body `modal-open`; hide open modal first | dismissal | `modal.js:226-241,:193-195,:116,:360-363` |
| `fade` animates; add/remove `show`; static class `modal-static` | transition | `modal.js:188-203,:138-140,:260-287` |
| `constructor`; click toggle; `enableDismissTrigger`; `defineJQueryPlugin` | initialization | `modal.js:67,:339-376` |

### Offcanvas
| Obligation | Kind | Source |
|---|---|---|
| `backdrop` true `(boolean\|string)`; `keyboard` true boolean; `scroll` false boolean | option | `offcanvas.js:49-59` |
| `[data-bs-toggle="offcanvas"]` click; `[data-bs-dismiss="offcanvas"]`; load `.offcanvas.show` | attribute | `offcanvas.js:47,:232-264,:274` |
| `show` no-op if shown; `hide` no-op if not | method | `offcanvas.js:94-96,:129-131` |
| `show`/`hide` cancelable; `shown`/`hidden`; `hidePrevented` not checked | event | `offcanvas.js:98-122,:133-154,:170,:206` |
| `Escape` hide if `keyboard` else `hidePrevented` | keyboard | `offcanvas.js:196-207` |
| backdrop click hide or static; FocusTrap unless `scroll && !backdrop`; hide other open | dismissal | `offcanvas.js:168-175,:116-118,:251-254` |
| `showing`→`show`; hide `hiding` then remove `show`+`hiding` | transition | `offcanvas.js:113-125,:142-157` |
| `constructor`; click; load `.show`; resize hide non-fixed; `enableDismissTrigger`; `defineJQueryPlugin` | initialization | `offcanvas.js:66,:232-280` |

### Tooltip
| Obligation | Kind | Source |
|---|---|---|
| See Evidence Default/DefaultType (`animation`,`title`,`trigger` `'hover focus'`, `placement` `'top'`, `offset` `[0,6]`, `delay` 0, `html` false, `sanitize` true, …) | option | `tooltip.js:58-99` |
| all `data-bs-*` except `data-bs-config` and `sanitize`/`allowList`/`sanitizeFn`; `title` copied to `data-bs-original-title` | attribute | `tooltip.js:23,:540-546,:486-498`; `config.js:40-48` |
| `enable`/`disable`/`toggleEnabled`/`toggle`/`show`/`hide`/`update`/`setContent`; `toggle` no-op if disabled; `show` no-op without content/enabled | method | `tooltip.js:146-332` |
| `show.bs.tooltip` cancelable; `inserted.bs.tooltip`; `shown.bs.tooltip`; `hide.bs.tooltip` cancelable; `hidden.bs.tooltip` | event | `tooltip.js:193-230,:247-278` |
| no Escape/arrows; focus trigger via `focusin`/`focusout` | keyboard | `tooltip.js:444-475` |
| trigger `hover focus click manual`; hide on `hide.bs.modal`; delay show/hide | dismissal | `tooltip.js:444-483,:501-528` |
| `animation`/`fade` then add/remove `show` on tip | transition | `tooltip.js:217,:239,:253,:281,:365-367` |
| `constructor` only; **no** data-api auto-init; `defineJQueryPlugin` | initialization | `tooltip.js:106,:631` |

### Popover
| Obligation | Kind | Source |
|---|---|---|
| Tooltip options plus `content` `''` `(null\|string\|element\|function)`; `offset` `[0,8]`; `placement` `'right'`; `trigger` `'click'`; popover template | option | `popover.js:20-36` |
| same data-attribute pipeline as Tooltip; no toggle data-api | attribute | `popover.js` inherits `tooltip.js:540-546` |
| inherited Tooltip methods; `_isWithContent` title or content | method | `popover.js:57-59,:74-88` |
| same event verbs as Tooltip, namespace `.bs.popover` | event | `popover.js:15` + `tooltip.js:193-278` + `base-component.js:81-83` |
| default click trigger; otherwise Tooltip dismissal | dismissal | `popover.js:30` |
| `defineJQueryPlugin` only; **no** data-api auto-init | initialization | `popover.js:95` |

### ScrollSpy
| Obligation | Kind | Source |
|---|---|---|
| `offset` null `(number\|null)`; `rootMargin` `'0px 0px -25%'` string; `smoothScroll` false boolean; `target` null `element`; `threshold` `[0.1,0.5,1]` array | option | `scrollspy.js:41-55` |
| `[data-bs-spy="scroll"]` window load `getOrCreateInstance` | attribute | `scrollspy.js:31,:284-288` |
| `refresh`/`dispose` | method | `scrollspy.js:92-110` |
| `activate.bs.scrollspy` `{relatedTarget}` not cancel-checked | event | `scrollspy.js:233` |
| `constructor`+`refresh`; load spy; `defineJQueryPlugin` | initialization | `scrollspy.js:62,:284-294` |

### Tab
| Obligation | Kind | Source |
|---|---|---|
| `[data-bs-toggle="tab"|"pill"|"list"]` click `show()`; load initializes `.active` toggles | attribute | `tab.js:48,:51,:289-308` |
| `show()` no-op if active or show/hide prevented | method | `tab.js:80-97` |
| `hide.bs.tab`/`show.bs.tab` cancelable `{relatedTarget}`; then `hidden`/`shown` (role tab only) | event | `tab.js:89-97,:122-124,:149` |
| `ArrowLeft`/`Up` prev; `ArrowRight`/`Down` next; `Home`/`End`; cycle; skip disabled | keyboard | `tab.js:155-176` |
| `fade` waits transition; `active` immediately; `show` class if not role tab | transition | `tab.js:109-152` |
| `constructor(element)` no config; click; load active; `defineJQueryPlugin` | initialization | `tab.js:58,:289-313` |

### Toast
| Obligation | Kind | Source |
|---|---|---|
| `animation` true boolean; `autohide` true boolean; `delay` 5000 number | option | `toast.js:35-45` |
| `[data-bs-dismiss="toast"]` → `hide` | attribute | `toast.js:216`; `component-functions.js:16` |
| `show`/`hide`; `hide` no-op if not shown; `isShown` | method | `toast.js:75-135` |
| `show.bs.toast`/`hide.bs.toast` cancelable; then `shown`/`hidden` | event | `toast.js:76-90,:107-116` |
| `autohide` timer; paused by mouseover/focusin | dismissal | `toast.js:138-188` |
| add `show`+`showing`; complete drop `showing`; hide reverse + deprecated `hide` | transition | `toast.js:84-120` |
| `constructor`; `enableDismissTrigger`; `defineJQueryPlugin`; no toggle data-api | initialization | `toast.js:52,:216-222` |

Unknowns
- Tooltip and Popover have no `data-bs-toggle` auto-initialization in 5.3.8 source (only `defineJQueryPlugin`). The brief asked for that form; the artifact does not provide it.
- Alert, Button, and Tab declare no `Default`/`DefaultType`; they inherit Config empty objects.
- `hidePrevented` on Offcanvas is triggered without reading `defaultPrevented`; Modal's `hidePrevented` does read it.
- Space is not handled by any listed component.
- Journal session id is not present in the bound Bootstrap paths.

Journal
Not in bound paths.

Deviation
None. Bound paths read; no edits; no runs.
