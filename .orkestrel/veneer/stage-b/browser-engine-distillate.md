# Bootstrap 5.3.8 JavaScript engine: the compatibility contract

## Shared mechanics

`BaseComponent` stores one instance per element under `bs.${NAME}`, dispatches namespaced events, and merges config in a fixed order. The helpers in this slice supply transitions, selectors, backdrops, focus, scrollbars, swipes, and templates. Line ranges cite `node_modules/bootstrap/js/src/`.

### Instance registry

`Data` keeps an element-to-map `Map` (`node_modules/bootstrap/js/src/dom/data.js:12`). `set` creates the inner map, and when that map already holds a different key it `console.error`s `Bootstrap doesn't allow more than one instance per element. Bound instance: ${key}.` and returns; the same key is stored (`node_modules/bootstrap/js/src/dom/data.js:15-30`). `get` returns the instance or `null` (`node_modules/bootstrap/js/src/dom/data.js:33-38`). `remove` deletes the key and drops the element when the inner map is empty (`node_modules/bootstrap/js/src/dom/data.js:41-53`).

The constructor runs `getElement` and returns with no registration when that is missing; otherwise it saves `_element`, `_getConfig`, and `Data.set` under `DATA_KEY` (`node_modules/bootstrap/js/src/base-component.js:27-35`). `DATA_KEY` is `` `bs.${NAME}` ``, `EVENT_KEY` is `` `.${DATA_KEY}` ``, `eventName` appends `EVENT_KEY` to the verb, and `VERSION` is `5.3.8` (`node_modules/bootstrap/js/src/base-component.js:17`, `node_modules/bootstrap/js/src/base-component.js:69-83`). `NAME` values are `alert` (`node_modules/bootstrap/js/src/alert.js:17`), `button` (`node_modules/bootstrap/js/src/button.js:16`), `carousel` (`node_modules/bootstrap/js/src/carousel.js:26`), `collapse` (`node_modules/bootstrap/js/src/collapse.js:21`), `dropdown` (`node_modules/bootstrap/js/src/dropdown.js:29`), `modal` (`node_modules/bootstrap/js/src/modal.js:23`), `offcanvas` (`node_modules/bootstrap/js/src/offcanvas.js:25`), `popover` (`node_modules/bootstrap/js/src/popover.js:15`), `scrollspy` (`node_modules/bootstrap/js/src/scrollspy.js:19`), `tab` (`node_modules/bootstrap/js/src/tab.js:17`), `toast` (`node_modules/bootstrap/js/src/toast.js:17`), `tooltip` (`node_modules/bootstrap/js/src/tooltip.js:22`). Matching `bs.` constants are declared beside those `NAME` lines except `tooltip` and `popover`, which use the getter.

`getInstance` is `Data.get` of the resolved element (`node_modules/bootstrap/js/src/base-component.js:61-63`). `getOrCreateInstance` returns that instance or constructs one, passing `null` when config is not an object (`node_modules/bootstrap/js/src/base-component.js:65-67`). `dispose` removes the data key, calls `EventHandler.off` with `EVENT_KEY`, and assigns `null` to every own property (`node_modules/bootstrap/js/src/base-component.js:39-46`).

### Events

`eventName` yields `<verb>.bs.<name>`, as in `close.bs.alert` (`node_modules/bootstrap/js/src/alert.js:21`, `node_modules/bootstrap/js/src/base-component.js:81-83`). `DATA_API_KEY` is `.data-api` (`node_modules/bootstrap/js/src/button.js:19`, `node_modules/bootstrap/js/src/carousel.js:29`, `node_modules/bootstrap/js/src/collapse.js:24`, `node_modules/bootstrap/js/src/dropdown.js:32`, `node_modules/bootstrap/js/src/modal.js:26`, `node_modules/bootstrap/js/src/offcanvas.js:28`, `node_modules/bootstrap/js/src/scrollspy.js:22`). Tab's data-api strings are `click.bs.tab` and `load.bs.tab` (`node_modules/bootstrap/js/src/tab.js:25-27`).

`trigger` returns `null` unless the type is a string and the element exists (`node_modules/bootstrap/js/src/dom/event-handler.js:259-262`). `getjQuery` returns `window.jQuery` when present and `document.body` has no `data-bs-no-jquery`, otherwise `null` (`node_modules/bootstrap/js/src/util/index.js:179-184`). A namespaced type with jQuery builds `$.Event`, runs `$(element).trigger`, sets `bubbles` from the negation of `isPropagationStopped`, skips native dispatch when `isImmediatePropagationStopped`, and records `isDefaultPrevented` (`node_modules/bootstrap/js/src/dom/event-handler.js:264-280`). The native event is always `cancelable: true`; `bubbles` stays `true` when that jQuery branch is skipped (`node_modules/bootstrap/js/src/dom/event-handler.js:269-282`). A jQuery-prevented event is `preventDefault`ed before `dispatchEvent`; a native `defaultPrevented` result is copied back onto the jQuery event; `trigger` returns the native event (`node_modules/bootstrap/js/src/dom/event-handler.js:284-296`). `hydrateObj` copies each meta property, or defines a configurable getter when assignment throws (`node_modules/bootstrap/js/src/dom/event-handler.js:300-314`).

A direct handler sets `delegateTarget` to the bound element and removes a `oneOff` listener before the callback (`node_modules/bootstrap/js/src/dom/event-handler.js:90-98`). A string handler is a selector: the listener walks `parentNode` from `event.target`, sets `delegateTarget` on a match, and calls the function with that target as `this` (`node_modules/bootstrap/js/src/dom/event-handler.js:102-120`). The delegated flag is the third `addEventListener` argument, so delegated listeners use the capture phase (`node_modules/bootstrap/js/src/dom/event-handler.js:184`). `mouseenter` is `mouseover` and `mouseleave` is `mouseout` (`node_modules/bootstrap/js/src/dom/event-handler.js:19-22`); the wrapper returns when `relatedTarget` is the `delegateTarget` or lies inside it (`node_modules/bootstrap/js/src/dom/event-handler.js:149-160`). `getTypeEvent` strips from the first dot and applies that map (`node_modules/bootstrap/js/src/dom/event-handler.js:208-211`). A stripped name outside `nativeEvents` keeps the original string (`node_modules/bootstrap/js/src/dom/event-handler.js:135-137`). That set is `click`, `dblclick`, `mouseup`, `mousedown`, `contextmenu`, `mousewheel`, `DOMMouseScroll`, `mouseover`, `mouseout`, `mousemove`, `selectstart`, `selectend`, `keydown`, `keypress`, `keyup`, `orientationchange`, `touchstart`, `touchmove`, `touchend`, `touchcancel`, `pointerdown`, `pointermove`, `pointerup`, `pointerleave`, `pointercancel`, `gesturestart`, `gesturechange`, `gestureend`, `focus`, `blur`, `change`, `reset`, `select`, `submit`, `focusin`, `focusout`, `load`, `unload`, `beforeunload`, `resize`, `move`, `DOMContentLoaded`, `readystatechange`, `error`, `abort`, `scroll` (`node_modules/bootstrap/js/src/dom/event-handler.js:24-71`).

`enableDismissTrigger` listens on `document` for `click.dismiss` plus `EVENT_KEY`, selector `[data-bs-dismiss="${NAME}"]` (`node_modules/bootstrap/js/src/util/component-functions.js:13-16`). `A` and `AREA` call `preventDefault`; a disabled element returns; the target is `getElementFromSelector` or `closest('.' + NAME)`; the instance method runs (`node_modules/bootstrap/js/src/util/component-functions.js:17-29`). Callers are `Alert` with `close` (`node_modules/bootstrap/js/src/alert.js:79`), `Toast` (`node_modules/bootstrap/js/src/toast.js:216`), `Modal` (`node_modules/bootstrap/js/src/modal.js:370`), and `Offcanvas` (`node_modules/bootstrap/js/src/offcanvas.js:274`). Further `document` listeners at load: `click.bs.button.data-api` on `[data-bs-toggle="button"]` (`node_modules/bootstrap/js/src/button.js:57`); `click.bs.collapse.data-api` on `[data-bs-toggle="collapse"]` (`node_modules/bootstrap/js/src/collapse.js:280`); dropdown `keydown` on the toggle and `.dropdown-menu`, `click` and `keyup` for `clearMenus`, and `click` on the toggle (`node_modules/bootstrap/js/src/dropdown.js:440-446`); `click.bs.modal.data-api` (`node_modules/bootstrap/js/src/modal.js:339`); `click.bs.offcanvas.data-api` (`node_modules/bootstrap/js/src/offcanvas.js:232`); `click.bs.tab` (`node_modules/bootstrap/js/src/tab.js:289`); `click.bs.carousel.data-api` on `[data-bs-slide], [data-bs-slide-to]` (`node_modules/bootstrap/js/src/carousel.js:432`). `clearMenus` is registered with no selector (`node_modules/bootstrap/js/src/dropdown.js:442-443`). `activate` on `FocusTrap` listens on `document` for `focusin.bs.focustrap` and `keydown.tab.bs.focustrap` (`node_modules/bootstrap/js/src/util/focustrap.js:19-20`, `node_modules/bootstrap/js/src/util/focustrap.js:72-73`).

`defineJQueryPlugin` on `DOMContentLoaded` sets `$.fn[NAME]` to `jQueryInterface`, sets `Constructor`, and stores `noConflict` (`node_modules/bootstrap/js/src/util/index.js:208-222`). Each plugin calls it (`node_modules/bootstrap/js/src/alert.js:85`, `node_modules/bootstrap/js/src/button.js:70`, `node_modules/bootstrap/js/src/carousel.js:472`, `node_modules/bootstrap/js/src/collapse.js:295`, `node_modules/bootstrap/js/src/dropdown.js:453`, `node_modules/bootstrap/js/src/modal.js:376`, `node_modules/bootstrap/js/src/offcanvas.js:280`, `node_modules/bootstrap/js/src/popover.js:95`, `node_modules/bootstrap/js/src/scrollspy.js:294`, `node_modules/bootstrap/js/src/tab.js:313`, `node_modules/bootstrap/js/src/toast.js:222`, `node_modules/bootstrap/js/src/tooltip.js:631`).

### Config

`_mergeConfigObj` spreads `Default`, then `data-bs-config` when that value's `typeof` is `object`, then `getDataAttributes` when the second argument is an element, then the constructor value when its `typeof` is `object` (`node_modules/bootstrap/js/src/util/config.js:40-48`). The JSON attribute is `getDataAttribute(element, 'config')` (`node_modules/bootstrap/js/src/util/config.js:41`, `node_modules/bootstrap/js/src/dom/manipulator.js:66-68`). `getDataAttributes` keeps `dataset` keys that start with `bs`, drops keys that start with `bsConfig`, strips `bs`, and lowercases the next character (`node_modules/bootstrap/js/src/dom/manipulator.js:49-63`). `BaseComponent._getConfig` passes the element, then `_configAfterMerge`, then `_typeCheckConfig` (`node_modules/bootstrap/js/src/base-component.js:53-57`). `Config._getConfig` merges with no element (`node_modules/bootstrap/js/src/util/config.js:29-33`). The default `_configAfterMerge` returns its argument (`node_modules/bootstrap/js/src/util/config.js:36-38`).

`normalizeData` maps string `true` and `false` to booleans, a string equal to `Number(value).toString()` to that number, `''` and `'null'` to `null`, a non-string to itself, and any other string through `JSON.parse(decodeURIComponent(value))`, keeping the string when parsing throws (`node_modules/bootstrap/js/src/dom/manipulator.js:8-33`). `normalizeDataKey` hyphenates capitals (`node_modules/bootstrap/js/src/dom/manipulator.js:36-38`). Attribute names are `data-bs-` plus that key (`node_modules/bootstrap/js/src/dom/manipulator.js:41-47`).

`_typeCheckConfig` types an element as `element` and everything else with `toType` (`node_modules/bootstrap/js/src/util/config.js:51-54`). `toType` returns `null` or `undefined` for those values, otherwise the lowercased `toString` tag (`node_modules/bootstrap/js/src/util/index.js:27-32`). A failing `new RegExp(expectedTypes).test(valueType)` throws `TypeError` `` `${NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".` `` (`node_modules/bootstrap/js/src/util/config.js:56-60`). An unimplemented `NAME` throws `Error` `You have to implement the static method "NAME", for each component!` (`node_modules/bootstrap/js/src/util/config.js:25-27`).

### Timing

`executeAfterTransition` runs the callback immediately when the third argument is false (`node_modules/bootstrap/js/src/util/index.js:229-233`). Otherwise the wait is `getTransitionDurationFromElement` plus `5` (`node_modules/bootstrap/js/src/util/index.js:235-236`). The listener is `transitionend` on that element and returns when `target` is not the element (`node_modules/bootstrap/js/src/util/index.js:240-248`). After the padded delay, an uncalled wait dispatches `transitionend` on the element (`node_modules/bootstrap/js/src/util/index.js:10`, `node_modules/bootstrap/js/src/util/index.js:70-72`, `node_modules/bootstrap/js/src/util/index.js:251-255`). The duration helper returns `0` for a missing element (`node_modules/bootstrap/js/src/util/index.js:47-50`). It reads `transitionDuration` and `transitionDelay` from `getComputedStyle`; the host supplies those strings (`node_modules/bootstrap/js/src/util/index.js:53`). When `parseFloat` of both full strings is falsy it returns `0`; otherwise it adds the index-`0` comma segments and multiplies by `1000` (`node_modules/bootstrap/js/src/util/index.js:8`, `node_modules/bootstrap/js/src/util/index.js:55-67`). `.fade` sets `transition: opacity 0.15s linear`, and `prefers-reduced-motion: reduce` sets `transition: none` (`node_modules/bootstrap/dist/css/bootstrap.css:3342-3348`). `.fade:not(.show)` sets `opacity: 0` (`node_modules/bootstrap/dist/css/bootstrap.css:3350-3352`).

`reflow` reads `offsetHeight` (`node_modules/bootstrap/js/src/util/index.js:175-177`) at backdrop show (`node_modules/bootstrap/js/src/util/backdrop.js:74-76`), collapse `hide` (`node_modules/bootstrap/js/src/collapse.js:180`), toast `show` (`node_modules/bootstrap/js/src/toast.js:96`), modal `_showElement` (`node_modules/bootstrap/js/src/modal.js:188`), and carousel `_slide` (`node_modules/bootstrap/js/src/carousel.js:349`). `_queueCallback` forwards to `executeAfterTransition` with default animated flag `true` (`node_modules/bootstrap/js/src/base-component.js:49-51`).

The animated flag and waited element are: Alert, class `fade` on the alert, the alert (`node_modules/bootstrap/js/src/alert.js:46-47`); Carousel, class `slide` on the carousel, the active item (`node_modules/bootstrap/js/src/carousel.js:365`, `node_modules/bootstrap/js/src/carousel.js:372-373`); Collapse `show` and `hide`, literal `true`, the collapse element (`node_modules/bootstrap/js/src/collapse.js:162`, `node_modules/bootstrap/js/src/collapse.js:204`); Modal `hide`, class `fade` on the modal, the modal (`node_modules/bootstrap/js/src/modal.js:140`, `node_modules/bootstrap/js/src/modal.js:260-261`); Modal show completion, that same flag, `.modal-dialog` (`node_modules/bootstrap/js/src/modal.js:46`, `node_modules/bootstrap/js/src/modal.js:203`); Offcanvas `show` and `hide`, literal `true`, the offcanvas (`node_modules/bootstrap/js/src/offcanvas.js:125`, `node_modules/bootstrap/js/src/offcanvas.js:157`); Tab, class `fade` on the element passed in, that element (`node_modules/bootstrap/js/src/tab.js:127`, `node_modules/bootstrap/js/src/tab.js:152`); Toast, `_config.animation`, the toast (`node_modules/bootstrap/js/src/toast.js:99`, `node_modules/bootstrap/js/src/toast.js:120`); Tooltip, `_config.animation` or class `fade` on the tip, the tip (`node_modules/bootstrap/js/src/tooltip.js:239`, `node_modules/bootstrap/js/src/tooltip.js:281`, `node_modules/bootstrap/js/src/tooltip.js:365-366`); Popover inherits Tooltip (`node_modules/bootstrap/js/src/popover.js:42`); Backdrop, `isAnimated`, the backdrop element (`node_modules/bootstrap/js/src/util/backdrop.js:146-148`). Button, Dropdown, and ScrollSpy do not call `_queueCallback`.

Guards: Collapse `_isTransitioning` starts `false`; `show` returns when it is set or `_isShown` is set; `_isShown` is class `show`; a parent sibling with `_isTransitioning` also returns; the flag brackets the queued callback (`node_modules/bootstrap/js/src/collapse.js:63`, `node_modules/bootstrap/js/src/collapse.js:112-114`, `node_modules/bootstrap/js/src/collapse.js:125-127`, `node_modules/bootstrap/js/src/collapse.js:146-149`, `node_modules/bootstrap/js/src/collapse.js:193-196`, `node_modules/bootstrap/js/src/collapse.js:208-210`). Modal booleans start `false`; `show` returns when either is set and then sets both; `hide` returns unless shown and idle, then clears shown and sets transitioning; the shown callback and `_hideModal` clear transitioning (`node_modules/bootstrap/js/src/modal.js:73-74`, `node_modules/bootstrap/js/src/modal.js:99-101`, `node_modules/bootstrap/js/src/modal.js:111-112`, `node_modules/bootstrap/js/src/modal.js:124-126`, `node_modules/bootstrap/js/src/modal.js:134-135`, `node_modules/bootstrap/js/src/modal.js:197`, `node_modules/bootstrap/js/src/modal.js:250`). Offcanvas guards on boolean `_isShown`, set `true` in `show` and `false` in `hide` (`node_modules/bootstrap/js/src/offcanvas.js:69`, `node_modules/bootstrap/js/src/offcanvas.js:94-96`, `node_modules/bootstrap/js/src/offcanvas.js:104`, `node_modules/bootstrap/js/src/offcanvas.js:129-131`, `node_modules/bootstrap/js/src/offcanvas.js:141`). Dropdown `_isShown` is class `show` on the menu; `show` and `hide` return when the toggle is disabled or the menu state already matches (`node_modules/bootstrap/js/src/dropdown.js:125-127`, `node_modules/bootstrap/js/src/dropdown.js:160-162`, `node_modules/bootstrap/js/src/dropdown.js:244-246`). Tooltip `_isShown` is a tip with class `show`; `_isHovered` starts `null`, and show completion calls `_leave` when it is `false` (`node_modules/bootstrap/js/src/tooltip.js:116`, `node_modules/bootstrap/js/src/tooltip.js:232-236`, `node_modules/bootstrap/js/src/tooltip.js:369-371`). Carousel `_isSliding` starts `false`, `_slide` returns while it is set, and completion clears it (`node_modules/bootstrap/js/src/carousel.js:98`, `node_modules/bootstrap/js/src/carousel.js:301-303`, `node_modules/bootstrap/js/src/carousel.js:339`, `node_modules/bootstrap/js/src/carousel.js:360`). Toast `hide` returns unless class `show` is present (`node_modules/bootstrap/js/src/toast.js:103-105`, `node_modules/bootstrap/js/src/toast.js:133-135`). Alert `close` returns when `close` is `defaultPrevented` (`node_modules/bootstrap/js/src/alert.js:37-42`).

### Selectors

`getSelector` reads `data-bs-target`. An empty value or `#` falls through to `href`. An `href` with neither `#` nor a leading `.` yields `null`. An `href` that contains `#` and does not start with `#` becomes `#` plus `split('#')[1]`. The result is trimmed, `#` becomes `null`, and a comma list is `parseSelector` on each piece (`node_modules/bootstrap/js/src/dom/selector-engine.js:10-32`, `node_modules/bootstrap/js/src/util/index.js:17-23`). `getSelectorFromElement` returns that selector when `findOne` matches, else `null` (`node_modules/bootstrap/js/src/dom/selector-engine.js:103-110`). `getElementFromSelector` returns `findOne` or `null` (`node_modules/bootstrap/js/src/dom/selector-engine.js:113-116`). `getMultipleElementsFromSelector` returns `find` or `[]` (`node_modules/bootstrap/js/src/dom/selector-engine.js:119-122`). `find` and `findOne` default the root to `document.documentElement` (`node_modules/bootstrap/js/src/dom/selector-engine.js:36-41`). `children` filters `element.children` with `matches` (`node_modules/bootstrap/js/src/dom/selector-engine.js:44-46`). `parents` walks `parentNode.closest` (`node_modules/bootstrap/js/src/dom/selector-engine.js:48-57`). `prev` and `next` return the nearest matching sibling in a one-item array, or `[]` (`node_modules/bootstrap/js/src/dom/selector-engine.js:60-85`). `focusableChildren` queries `a`, `button`, `input`, `textarea`, `select`, `details`, `[tabindex]`, and `[contenteditable="true"]`, each with `:not([tabindex^="-"])`, then keeps nodes that are enabled and visible (`node_modules/bootstrap/js/src/dom/selector-engine.js:88-100`).

### Visibility, disability, direction, ids, shadow, cycling

`isVisible` is false when the value is not an element or `getClientRects().length` is `0` (`node_modules/bootstrap/js/src/util/index.js:99-102`). It then requires computed `visibility` equal to `visible` (`node_modules/bootstrap/js/src/util/index.js:104`). Inside a closed `details`, a node other than that `details` is visible when it is the `summary` of that `details`; the host supplies rects and computed visibility (`node_modules/bootstrap/js/src/util/index.js:106-123`). `isDisabled` is true for a missing node or a non-element, for class `disabled`, for a truthy `disabled` property, and for a `disabled` attribute whose value is not `false` (`node_modules/bootstrap/js/src/util/index.js:126-139`). `isRTL` is `document.documentElement.dir === 'rtl'` (`node_modules/bootstrap/js/src/util/index.js:206`). Dropdown placement constants and tooltip `AttachmentMap` call it while the module evaluates (`node_modules/bootstrap/js/src/dropdown.js:62-67`, `node_modules/bootstrap/js/src/tooltip.js:50-55`). Carousel and modal call it when they run (`node_modules/bootstrap/js/src/carousel.js:392`, `node_modules/bootstrap/js/src/modal.js:302`). `getUID` appends `Math.floor(Math.random() * 1000000)` until `getElementById` misses (`node_modules/bootstrap/js/src/util/index.js:8`, `node_modules/bootstrap/js/src/util/index.js:39-44`). `findShadowRoot` returns `null` when `attachShadow` is absent; `getRootNode` returns the root when it is a `ShadowRoot` and `null` otherwise; a `ShadowRoot` argument is returned; a parentless node returns `null`; otherwise the walk continues at `parentNode` (`node_modules/bootstrap/js/src/util/index.js:142-162`). `getNextActiveElement` adds `1` or `-1` from the third argument. An `indexOf` of `-1` returns `list[listLength - 1]` when the third argument is false and cycling is true, and returns `list[0]` in the other missing-element case. Cycling wraps with modulo; the index is clamped to the list (`node_modules/bootstrap/js/src/util/index.js:267-283`).

### Backdrop, focus trap, scrollbar, swipe, template, dismiss

Backdrop `Default` is `className` `modal-backdrop`, `clickCallback` `null`, `isAnimated` `false`, `isVisible` `true`, `rootElement` `'body'` (`node_modules/bootstrap/js/src/util/backdrop.js:23-29`). Types are `string`, `(function|null)`, `boolean`, `boolean`, `(element|string)` (`node_modules/bootstrap/js/src/util/backdrop.js:31-37`). `_configAfterMerge` replaces `rootElement` with `getElement` (`node_modules/bootstrap/js/src/util/backdrop.js:125-128`). `show` and `hide` run the callback with no DOM work when `isVisible` is false (`node_modules/bootstrap/js/src/util/backdrop.js:66-68`, `node_modules/bootstrap/js/src/util/backdrop.js:86-88`). Visible `show` appends, `reflow`s when animated, adds class `show`, then runs the callback after the transition (`node_modules/bootstrap/js/src/util/backdrop.js:71-82`). `hide` removes `show`, then `dispose`s and runs the callback (`node_modules/bootstrap/js/src/util/backdrop.js:91-96`). The element is a `div` whose `className` is `className`, plus class `fade` when animated (`node_modules/bootstrap/js/src/util/backdrop.js:111-119`). Append targets `rootElement` and listens for `mousedown.bs.backdrop`, which runs `clickCallback` (`node_modules/bootstrap/js/src/util/backdrop.js:21`, `node_modules/bootstrap/js/src/util/backdrop.js:131-143`). `dispose` removes that listener and the node (`node_modules/bootstrap/js/src/util/backdrop.js:99-107`). `.modal-backdrop` is fixed and full-viewport; `.modal-backdrop.fade` sets `opacity: 0`; `.modal-backdrop.show` sets `opacity` to `--bs-backdrop-opacity` (`node_modules/bootstrap/dist/css/bootstrap.css:5542-5558`). `.offcanvas-backdrop.fade` sets `opacity: 0` and `.offcanvas-backdrop.show` sets `opacity: 0.5` (`node_modules/bootstrap/dist/css/bootstrap.css:6746-6750`).

`FocusTrap` `Default` is `autofocus` `true` and `trapElement` `null`; types are `boolean` and `element` (`node_modules/bootstrap/js/src/util/focustrap.js:26-34`). `activate` returns when `_isActive`, focuses `trapElement` when `autofocus`, clears `.bs.focustrap` on `document`, and listens for `focusin` and `keydown.tab` (`node_modules/bootstrap/js/src/util/focustrap.js:17-20`, `node_modules/bootstrap/js/src/util/focustrap.js:62-75`). `deactivate` clears that namespace (`node_modules/bootstrap/js/src/util/focustrap.js:78-85`). `_handleFocusin` returns when the target is `document`, `trapElement`, or inside `trapElement`. With no focusable child it focuses `trapElement`. Direction `backward` focuses `elements[elements.length - 1]`; any other direction focuses `elements[0]` (`node_modules/bootstrap/js/src/util/focustrap.js:88-103`). Tab stores `backward` when `shiftKey` is set and `forward` otherwise, and calls neither `preventDefault` nor `stopPropagation` (`node_modules/bootstrap/js/src/util/focustrap.js:22-24`, `node_modules/bootstrap/js/src/util/focustrap.js:106-112`).

`ScrollBarHelper` binds `document.body` (`node_modules/bootstrap/js/src/util/scrollbar.js:26-28`). `getWidth` is `Math.abs(window.innerWidth - document.documentElement.clientWidth)`; the host supplies both widths (`node_modules/bootstrap/js/src/util/scrollbar.js:31-35`). `hide` saves and sets body `overflow` to `hidden`, adds `getWidth` to `padding-right` on the body and on `.fixed-top, .fixed-bottom, .is-fixed, .sticky-top`, and subtracts it from `margin-right` on `.sticky-top` (`node_modules/bootstrap/js/src/util/scrollbar.js:16-19`, `node_modules/bootstrap/js/src/util/scrollbar.js:37-44`, `node_modules/bootstrap/js/src/util/scrollbar.js:59-62`). A non-body element is skipped when `window.innerWidth > element.clientWidth + scrollbarWidth` (`node_modules/bootstrap/js/src/util/scrollbar.js:64-68`). The inline value is saved with `setDataAttribute` when it is non-empty, so the names are `data-bs-overflow`, `data-bs-padding-right`, and `data-bs-margin-right` (`node_modules/bootstrap/js/src/util/scrollbar.js:79-83`, `node_modules/bootstrap/js/src/dom/manipulator.js:41-43`). The written value is `parseFloat` of the computed property, passed through the callback, plus `px` (`node_modules/bootstrap/js/src/util/scrollbar.js:71-73`). `reset` restores `overflow`, body `padding-right`, the fixed-selector padding, and sticky `margin-right`; a `null` saved value removes the property (`node_modules/bootstrap/js/src/util/scrollbar.js:47-52`, `node_modules/bootstrap/js/src/util/scrollbar.js:86-96`). `isOverflowing` is `getWidth() > 0` (`node_modules/bootstrap/js/src/util/scrollbar.js:54-56`).

`Swipe.isSupported` is `'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0`; the host supplies both (`node_modules/bootstrap/js/src/util/swipe.js:141-143`). An unsupported element returns before listeners (`node_modules/bootstrap/js/src/util/swipe.js:49-51`). `window.PointerEvent` selects `pointerdown` and `pointerup` and adds class `pointer-event`; the touch path listens to `touchstart`, `touchmove`, and `touchend` (`node_modules/bootstrap/js/src/util/swipe.js:55`, `node_modules/bootstrap/js/src/util/swipe.js:123-132`). `.carousel.pointer-event` sets `touch-action: pan-y` (`node_modules/bootstrap/dist/css/bootstrap.css:6011-6013`). Pointer updates run for `pointerType` `pen` or `touch` (`node_modules/bootstrap/js/src/util/swipe.js:136-138`). `_handleSwipe` returns when `Math.abs(deltaX) <= 40` (`node_modules/bootstrap/js/src/util/swipe.js:26`, `node_modules/bootstrap/js/src/util/swipe.js:105-110`). A positive `absDeltaX / deltaX` runs `rightCallback`; a negative value runs `leftCallback` (`node_modules/bootstrap/js/src/util/swipe.js:112-120`). `_end` then runs `endCallback` (`node_modules/bootstrap/js/src/util/swipe.js:90-97`). More than one touch sets the delta to `0` (`node_modules/bootstrap/js/src/util/swipe.js:99-102`). `dispose` removes `.bs.swipe` (`node_modules/bootstrap/js/src/util/swipe.js:16`, `node_modules/bootstrap/js/src/util/swipe.js:73-75`). Defaults are `endCallback`, `leftCallback`, and `rightCallback` `null`, each typed `(function|null)` (`node_modules/bootstrap/js/src/util/swipe.js:28-38`).

`TemplateFactory` defaults are `allowList` `DefaultAllowlist`, `content` `{}`, `extraClass` `''`, `html` `false`, `sanitize` `true`, `sanitizeFn` `null`, `template` `'<div></div>'` (`node_modules/bootstrap/js/src/util/template-factory.js:19-27`). `toHtml` sanitizes the template when `sanitize` is set, fills each `content` selector, and adds `extraClass` split on spaces (`node_modules/bootstrap/js/src/util/template-factory.js:84-99`). A resolved empty entry removes the matched node (`node_modules/bootstrap/js/src/util/template-factory.js:121-126`). An element with `html` is appended after the slot's `innerHTML` is cleared; an element with `html` false copies `textContent` (`node_modules/bootstrap/js/src/util/template-factory.js:128-130`, `node_modules/bootstrap/js/src/util/template-factory.js:149-156`). A string with `html` is sanitized `innerHTML`; a string with `html` false is `textContent` (`node_modules/bootstrap/js/src/util/template-factory.js:133-138`). `sanitizeHtml` returns a custom `sanitizeFn` result when that argument is a function (`node_modules/bootstrap/js/src/util/sanitizer.js:84-91`). Otherwise `DOMParser` parses `text/html`, drops tags absent from the allowlist, and drops attributes the allowlist rejects (`node_modules/bootstrap/js/src/util/sanitizer.js:93-115`). `DefaultAllowlist` allows `class`, `dir`, `id`, `lang`, `role`, and `/^aria-[\w-]*$/i` on every listed tag; `a` also allows `target`, `href`, `title`, `rel`; `img` also allows `src`, `srcset`, `alt`, `title`, `width`, `height`; `area`, `b`, `br`, `col`, `code`, `dd`, `div`, `dl`, `dt`, `em`, `hr`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `i`, `li`, `ol`, `p`, `pre`, `s`, `small`, `span`, `sub`, `sup`, `strong`, `u`, and `ul` add no extra attributes (`node_modules/bootstrap/js/src/util/sanitizer.js:9-46`). URI attributes `background`, `cite`, `href`, `itemtype`, `longdesc`, `poster`, `src`, and `xlink:href` must match `/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i` (`node_modules/bootstrap/js/src/util/sanitizer.js:49-66`, `node_modules/bootstrap/js/src/util/sanitizer.js:68-76`).

`execute` calls a function with `call` and the supplied argument list, and returns a non-function unchanged (`node_modules/bootstrap/js/src/util/index.js:225-227`). Template resolution calls it as `call(undefined, factory)` (`node_modules/bootstrap/js/src/util/template-factory.js:145-147`).

### Ancillary choices

Sections follow the brief order: registry, events, config, timing, selectors, visibility helpers, then backdrop, focus, scrollbar, swipe, template, and dismiss. Each plugin's animated flag sits in one sentence under Timing so the `fade` read and the waited element stay paired. Document listeners at module load sit under Events; per-instance window listeners stay with the plugin slices. CSS citations name the selector a written class matches, and the computed transition length stays the host value from `getComputedStyle`.

## Alert and Button

### Alert

`NAME` is `alert`, the data key is `bs.alert`, and the event namespace is `.bs.alert` (`node_modules/bootstrap/js/src/alert.js:17-19`).

The markup hooks are:

| Hook | Value |
| --- | --- |
| Dismiss selector | `[data-bs-dismiss="alert"]` (`node_modules/bootstrap/js/src/util/component-functions.js:13-16`, `node_modules/bootstrap/js/src/alert.js:79`) |
| Target | `getElementFromSelector` on the dismiss control, reading `data-bs-target`, then `href`, otherwise `closest('.alert')` (`node_modules/bootstrap/js/src/util/component-functions.js:25`, `node_modules/bootstrap/js/src/dom/selector-engine.js:10-32`, `node_modules/bootstrap/js/src/dom/selector-engine.js:113-116`) |
| Class read | `fade` on the alert (`node_modules/bootstrap/js/src/alert.js:23`, `node_modules/bootstrap/js/src/alert.js:46`) |
| Class removed | `show` (`node_modules/bootstrap/js/src/alert.js:24`, `node_modules/bootstrap/js/src/alert.js:44`) |
| Tag check | `A` and `AREA` on the dismiss control (`node_modules/bootstrap/js/src/util/component-functions.js:17-19`) |

The instance is stored on the resolved alert (`node_modules/bootstrap/js/src/util/component-functions.js:25-26`, `node_modules/bootstrap/js/src/base-component.js:32-35`). `.fade` sets `transition: opacity 0.15s linear`, and `prefers-reduced-motion: reduce` sets `transition: none` (`node_modules/bootstrap/dist/css/bootstrap.css:3342-3348`). `.fade:not(.show)` sets `opacity: 0` (`node_modules/bootstrap/dist/css/bootstrap.css:3350-3352`). `.alert` sets the alert box (`node_modules/bootstrap/dist/css/bootstrap.css:4836-4853`).

The option keys are:

| Key | Default | DefaultType | `data-bs-*` | Effect |
| --- | --- | --- | --- | --- |
| None declared | `{}` | `{}` | None | `close` does not read `_config` |

Alert declares no `Default` and no `DefaultType` (`node_modules/bootstrap/js/src/alert.js:30-72`). The inherited objects are empty (`node_modules/bootstrap/js/src/util/config.js:17-23`). Construction still merges `Default`, `data-bs-config`, `data-bs-*` attributes, and the constructor object, then runs the inherited `_configAfterMerge`, which returns that object (`node_modules/bootstrap/js/src/base-component.js:33-34`, `node_modules/bootstrap/js/src/base-component.js:53-57`, `node_modules/bootstrap/js/src/util/config.js:36-48`).

`close` writes the DOM in this order after `close.bs.alert` is not `defaultPrevented`:

| Step | Write | Element |
| --- | --- | --- |
| 1 | `classList.remove('show')` | The alert (`node_modules/bootstrap/js/src/alert.js:44`) |
| 2 | `remove()` the node, after the transition callback | The alert (`node_modules/bootstrap/js/src/alert.js:47`, `node_modules/bootstrap/js/src/alert.js:52`) |
| 3 | `dispose`: `Data.remove` of `bs.alert`, `EventHandler.off` of `.bs.alert`, every own property set to `null` | The alert (`node_modules/bootstrap/js/src/alert.js:54`, `node_modules/bootstrap/js/src/base-component.js:39-45`) |

`close` creates no node, sets no attribute, and writes no inline style (`node_modules/bootstrap/js/src/alert.js:37-54`). A direct `dispose` performs step 3 (`node_modules/bootstrap/js/src/base-component.js:39-45`).

The events are:

| Path | Name | When | `preventDefault` effect | Properties |
| --- | --- | --- | --- | --- |
| `close` | `close.bs.alert` | Before any class change (`node_modules/bootstrap/js/src/alert.js:21`, `node_modules/bootstrap/js/src/alert.js:38`) | `defaultPrevented` returns, so `show` stays and `closed.bs.alert` is not triggered (`node_modules/bootstrap/js/src/alert.js:40-42`) | No third argument (`node_modules/bootstrap/js/src/alert.js:38`) |
| `_destroyElement` | `closed.bs.alert` | After `remove()`, before `dispose` (`node_modules/bootstrap/js/src/alert.js:22`, `node_modules/bootstrap/js/src/alert.js:52-54`) | The return value is discarded (`node_modules/bootstrap/js/src/alert.js:53`) | No third argument (`node_modules/bootstrap/js/src/alert.js:53`) |
| Document click | `click.dismiss.bs.alert` on `[data-bs-dismiss="alert"]` | Module load (`node_modules/bootstrap/js/src/util/component-functions.js:13-16`, `node_modules/bootstrap/js/src/alert.js:79`) | `A` and `AREA` call `preventDefault`, then the handler continues (`node_modules/bootstrap/js/src/util/component-functions.js:17-29`) | Native click |

Both triggered events are `cancelable: true` (`node_modules/bootstrap/js/src/dom/event-handler.js:282`). The names this class triggers are `close.bs.alert` and `closed.bs.alert` (`node_modules/bootstrap/js/src/alert.js:21-22`). jQuery calls `getOrCreateInstance`, returns when `config` is not a string, throws `TypeError` `` `No method named "${config}"` `` when the property is missing, the name starts with `_`, or the name is `constructor`, and otherwise calls `data[config](this)` (`node_modules/bootstrap/js/src/alert.js:58-70`). The jQuery method name is `alert` (`node_modules/bootstrap/js/src/alert.js:17`, `node_modules/bootstrap/js/src/alert.js:85`, `node_modules/bootstrap/js/src/util/index.js:213-216`).

The dismiss listener sits on `document` in the capture phase, because the handler argument is a selector string (`node_modules/bootstrap/js/src/util/component-functions.js:16`, `node_modules/bootstrap/js/src/dom/event-handler.js:130-137`, `node_modules/bootstrap/js/src/dom/event-handler.js:184`). The native type is `click` (`node_modules/bootstrap/js/src/dom/event-handler.js:25`, `node_modules/bootstrap/js/src/dom/event-handler.js:208-211`). `isDisabled` on the dismiss control returns before `close` (`node_modules/bootstrap/js/src/util/component-functions.js:21-23`, `node_modules/bootstrap/js/src/util/index.js:126-139`). `close` calls neither `focus` nor `stopPropagation` (`node_modules/bootstrap/js/src/alert.js:37-54`).

Completion waits on the alert element when it has class `fade`; the callback is `_destroyElement` (`node_modules/bootstrap/js/src/alert.js:46-47`, `node_modules/bootstrap/js/src/base-component.js:49-51`). The wait is `transitionend` on that element, or the emulated `transitionend` after the computed `transition-duration` plus `transition-delay` of the index-`0` comma segments, plus `5` (`node_modules/bootstrap/js/src/util/index.js:229-255`, `node_modules/bootstrap/js/src/util/index.js:47-67`). The host supplies the computed strings. A missing `fade` class runs the callback immediately (`node_modules/bootstrap/js/src/util/index.js:229-233`). `close` has no `_isTransitioning` field and no `setTimeout` of its own (`node_modules/bootstrap/js/src/alert.js:37-54`).

Alert's link to other plugins is `enableDismissTrigger`, also called for Modal, Offcanvas, and Toast (`node_modules/bootstrap/js/src/alert.js:79`, `node_modules/bootstrap/js/src/modal.js:370`, `node_modules/bootstrap/js/src/offcanvas.js:274`, `node_modules/bootstrap/js/src/toast.js:216`).

The imports are `BaseComponent`, `EventHandler`, `enableDismissTrigger`, and `defineJQueryPlugin` (`node_modules/bootstrap/js/src/alert.js:8-11`).

### Button

`NAME` is `button`, the data key is `bs.button`, and the event namespace is `.bs.button` (`node_modules/bootstrap/js/src/button.js:16-18`).

The markup hooks are:

| Hook | Value |
| --- | --- |
| Data API selector | `[data-bs-toggle="button"]` (`node_modules/bootstrap/js/src/button.js:22`, `node_modules/bootstrap/js/src/button.js:57`) |
| Resolved element | `event.target.closest('[data-bs-toggle="button"]')` (`node_modules/bootstrap/js/src/button.js:60`) |
| Class toggled | `active` (`node_modules/bootstrap/js/src/button.js:21`, `node_modules/bootstrap/js/src/button.js:38`) |
| Attribute written | `aria-pressed`, set to the boolean `classList.toggle` returns (`node_modules/bootstrap/js/src/button.js:38`) |

The instance is stored on that toggle (`node_modules/bootstrap/js/src/button.js:61`, `node_modules/bootstrap/js/src/base-component.js:32-35`). `.btn.active` sets the active color, background, and border, in the same rule as `.btn.show` and the checked and `:active` companions (`node_modules/bootstrap/dist/css/bootstrap.css:3015-3018`).

The option keys are:

| Key | Default | DefaultType | `data-bs-*` | Effect |
| --- | --- | --- | --- | --- |
| None declared | `{}` | `{}` | None | `toggle` does not read `_config` |

Button declares no `Default` and no `DefaultType` (`node_modules/bootstrap/js/src/button.js:29-50`). Construction uses the same inherited merge and identity `_configAfterMerge` as Alert (`node_modules/bootstrap/js/src/base-component.js:53-57`, `node_modules/bootstrap/js/src/util/config.js:17-23`, `node_modules/bootstrap/js/src/util/config.js:36-48`).

`toggle` writes the DOM in one statement: `classList.toggle('active')`, then `setAttribute('aria-pressed', that result)` (`node_modules/bootstrap/js/src/button.js:36-38`). `dispose` removes `bs.button`, removes `.bs.button` listeners, and nulls own properties (`node_modules/bootstrap/js/src/base-component.js:39-45`).

The data-api path is a `document` listener for `click.bs.button.data-api` (`node_modules/bootstrap/js/src/button.js:19`, `node_modules/bootstrap/js/src/button.js:23`, `node_modules/bootstrap/js/src/button.js:57`). `preventDefault` runs, then `closest`, then `toggle` (`node_modules/bootstrap/js/src/button.js:58-63`). `toggle` calls no `EventHandler.trigger` (`node_modules/bootstrap/js/src/button.js:36-38`). The listener is delegated `click` in the capture phase (`node_modules/bootstrap/js/src/dom/event-handler.js:130-137`, `node_modules/bootstrap/js/src/dom/event-handler.js:184`, `node_modules/bootstrap/js/src/dom/event-handler.js:208-211`). jQuery calls `getOrCreateInstance`, and calls `toggle()` when `config === 'toggle'` (`node_modules/bootstrap/js/src/button.js:42-48`). The jQuery method name is `button` (`node_modules/bootstrap/js/src/button.js:16`, `node_modules/bootstrap/js/src/button.js:70`, `node_modules/bootstrap/js/src/util/index.js:213-216`).

The click handler is the pointer entry. It calls `preventDefault` and does not call `stopPropagation` or `focus` (`node_modules/bootstrap/js/src/button.js:57-63`). `toggle` is synchronous: no transition wait, no `_isTransitioning`, no `setTimeout`, and no `reflow` (`node_modules/bootstrap/js/src/button.js:36-38`).

The imports are `BaseComponent`, `EventHandler`, and `defineJQueryPlugin` (`node_modules/bootstrap/js/src/button.js:8-10`).

## Collapse

`NAME` is `collapse`, the data key is `bs.collapse`, and the event namespace is `.bs.collapse` (`node_modules/bootstrap/js/src/collapse.js:21-23`).

### Markup hooks

The markup hooks are:

| Hook | Value |
| --- | --- |
| Toggle selector | `[data-bs-toggle="collapse"]` (`node_modules/bootstrap/js/src/collapse.js:43`, `node_modules/bootstrap/js/src/collapse.js:280`) |
| Click target | `getMultipleElementsFromSelector` on the toggle: `data-bs-target`, then `href` (`node_modules/bootstrap/js/src/collapse.js:286`, `node_modules/bootstrap/js/src/dom/selector-engine.js:10-32`, `node_modules/bootstrap/js/src/dom/selector-engine.js:119-122`) |
| Instance element | Each matched panel (`node_modules/bootstrap/js/src/collapse.js:286-288`) |
| Trigger list | Every document toggle whose `getSelectorFromElement` result is not `null` and whose `find` list contains this panel (`node_modules/bootstrap/js/src/collapse.js:66-75`, `node_modules/bootstrap/js/src/dom/selector-engine.js:36-37`, `node_modules/bootstrap/js/src/dom/selector-engine.js:103-110`) |
| Parent | Config `parent`, searched with `.collapse.show, .collapse.collapsing` and with `[data-bs-toggle="collapse"]` (`node_modules/bootstrap/js/src/collapse.js:42-43`, `node_modules/bootstrap/js/src/collapse.js:119-122`, `node_modules/bootstrap/js/src/collapse.js:227`) |
| Nested panels | `:scope .collapse .collapse` inside `parent` are dropped from those searches (`node_modules/bootstrap/js/src/collapse.js:36`, `node_modules/bootstrap/js/src/collapse.js:238-241`) |
| Horizontal | Class `collapse-horizontal` on the panel selects `width`; otherwise the dimension is `height` (`node_modules/bootstrap/js/src/collapse.js:37-40`, `node_modules/bootstrap/js/src/collapse.js:218-219`) |
| Shown test | Class `show` (`node_modules/bootstrap/js/src/collapse.js:32`, `node_modules/bootstrap/js/src/collapse.js:208-209`) |
| Anchor click | `preventDefault` when `event.target` or `event.delegateTarget` has tag `A` (`node_modules/bootstrap/js/src/collapse.js:282-284`) |

`.collapse:not(.show)` sets `display: none` (`node_modules/bootstrap/dist/css/bootstrap.css:3354-3356`). `.collapsing` sets `height: 0`, `overflow: hidden`, and `transition: height 0.35s ease`; under `prefers-reduced-motion: reduce` that transition is `none` (`node_modules/bootstrap/dist/css/bootstrap.css:3358-3366`). `.collapsing.collapse-horizontal` sets `width: 0`, `height: auto`, and `transition: width 0.35s ease`, and the same media condition sets `transition: none` (`node_modules/bootstrap/dist/css/bootstrap.css:3368-3376`). `.accordion-button:not(.collapsed)` sets the open accordion-button face (`node_modules/bootstrap/dist/css/bootstrap.css:4590-4594`).

### Options

The option keys are:

| Key | Default | DefaultType | `data-bs-*` | Effect |
| --- | --- | --- | --- | --- |
| `parent` | `null` | `(null\|element)` | `data-bs-parent` | `_configAfterMerge` assigns `getElement(config.parent)` (`node_modules/bootstrap/js/src/collapse.js:45-52`, `node_modules/bootstrap/js/src/collapse.js:212-215`). A set parent makes `show` hide active first-level siblings (`node_modules/bootstrap/js/src/collapse.js:119-136`) |
| `toggle` | `true` | `boolean` | `data-bs-toggle` | `_configAfterMerge` assigns `Boolean(config.toggle)` (`node_modules/bootstrap/js/src/collapse.js:213`). The constructor calls `toggle()` when the result is true (`node_modules/bootstrap/js/src/collapse.js:84-86`) |

The merge runs before that rewrite, then `_typeCheckConfig` (`node_modules/bootstrap/js/src/base-component.js:53-57`). The data-api and sibling constructors pass `{ toggle: false }`, which overrides Default `true` (`node_modules/bootstrap/js/src/collapse.js:122`, `node_modules/bootstrap/js/src/collapse.js:287`, `node_modules/bootstrap/js/src/util/config.js:43-48`). jQuery sets `toggle` false when `/show|hide/.test(config)` (`node_modules/bootstrap/js/src/collapse.js:257-260`). An existing instance keeps its original config (`node_modules/bootstrap/js/src/base-component.js:65-67`).

### DOM writes

The constructor writes trigger state. With no parent, each collected trigger gets class `collapsed` forced off when the panel has `show`, and `aria-expanded` set to that shown boolean (`node_modules/bootstrap/js/src/collapse.js:80-82`, `node_modules/bootstrap/js/src/collapse.js:244-252`). With a parent, each remaining first-level toggle gets the same pair from its `getElementFromSelector` target (`node_modules/bootstrap/js/src/collapse.js:222-234`).

`toggle` calls `hide` when the panel has `show`, and `show` otherwise (`node_modules/bootstrap/js/src/collapse.js:103-108`).

`show`, after the guards and the `show` event, writes in this order:

| Step | Write |
| --- | --- |
| 1 | `hide()` on each active sibling instance (`node_modules/bootstrap/js/src/collapse.js:134-136`) |
| 2 | Remove `collapse`, add `collapsing` (`node_modules/bootstrap/js/src/collapse.js:140-141`) |
| 3 | Set inline `height` or `width` to `0` (`node_modules/bootstrap/js/src/collapse.js:143`) |
| 4 | Force `collapsed` off and set `aria-expanded` true on `_triggerArray` (`node_modules/bootstrap/js/src/collapse.js:145`, `node_modules/bootstrap/js/src/collapse.js:250-251`) |
| 5 | Set the inline size to `` `${scrollHeight}` `` or `` `${scrollWidth}px` `` after the callback is queued (`node_modules/bootstrap/js/src/collapse.js:159-163`) |
| 6 | On completion: remove `collapsing`, add `collapse` and `show`, clear the inline size (`node_modules/bootstrap/js/src/collapse.js:148-154`) |

`hide`, after the `hide` event, writes in this order:

| Step | Write |
| --- | --- |
| 1 | Set inline `height` or `width` to `` `${getBoundingClientRect()[dimension]}px` `` (`node_modules/bootstrap/js/src/collapse.js:176-178`) |
| 2 | `reflow` (`node_modules/bootstrap/js/src/collapse.js:180`) |
| 3 | Add `collapsing`, remove `collapse` and `show` (`node_modules/bootstrap/js/src/collapse.js:182-183`) |
| 4 | For each trigger, when `getElementFromSelector` yields an element without `show`, force `collapsed` on and set `aria-expanded` false (`node_modules/bootstrap/js/src/collapse.js:185-190`, `node_modules/bootstrap/js/src/collapse.js:250-251`) |
| 5 | Clear the inline size (`node_modules/bootstrap/js/src/collapse.js:202`) |
| 6 | On completion: remove `collapsing`, add `collapse` (`node_modules/bootstrap/js/src/collapse.js:195-198`) |

`dispose` removes `bs.collapse`, removes `.bs.collapse` listeners, and nulls own properties (`node_modules/bootstrap/js/src/base-component.js:39-45`). `show` and `hide` call no `focus` (`node_modules/bootstrap/js/src/collapse.js:111-205`).

### Events

The event names are `show.bs.collapse`, `shown.bs.collapse`, `hide.bs.collapse`, `hidden.bs.collapse`, and `click.bs.collapse.data-api` (`node_modules/bootstrap/js/src/collapse.js:26-30`). `trigger` makes them `cancelable: true` and copies no extra properties (`node_modules/bootstrap/js/src/dom/event-handler.js:282`, `node_modules/bootstrap/js/src/collapse.js:129`, `node_modules/bootstrap/js/src/collapse.js:156`, `node_modules/bootstrap/js/src/collapse.js:171`, `node_modules/bootstrap/js/src/collapse.js:199`).

| Path | Order |
| --- | --- |
| `show` | Return when `_isTransitioning` or class `show` is set (`node_modules/bootstrap/js/src/collapse.js:112-114`). Return when `activeChildren[0]._isTransitioning` is set (`node_modules/bootstrap/js/src/collapse.js:125-127`). Trigger `show` on the panel; `defaultPrevented` returns before sibling `hide` calls and before the class writes (`node_modules/bootstrap/js/src/collapse.js:129-136`). `shown` fires in the completion callback (`node_modules/bootstrap/js/src/collapse.js:156`) |
| `hide` | Return when `_isTransitioning` is set or class `show` is absent (`node_modules/bootstrap/js/src/collapse.js:167-169`). Trigger `hide`; `defaultPrevented` returns before the style write (`node_modules/bootstrap/js/src/collapse.js:171-174`). `hidden` fires in the completion callback (`node_modules/bootstrap/js/src/collapse.js:199`) |
| Data API | `click.bs.collapse.data-api` on `document` (`node_modules/bootstrap/js/src/collapse.js:280`). `preventDefault` for an `A` target or `A` delegateTarget, then `toggle` on every matched panel (`node_modules/bootstrap/js/src/collapse.js:282-288`) |
| jQuery | `getOrCreateInstance`, then when `config` is a string call it, or throw `TypeError` `` `No method named "${config}"` `` when the property is `undefined` (`node_modules/bootstrap/js/src/collapse.js:262-270`). The jQuery name is `collapse` (`node_modules/bootstrap/js/src/collapse.js:21`, `node_modules/bootstrap/js/src/collapse.js:295`, `node_modules/bootstrap/js/src/util/index.js:213-216`) |

### Keyboard, pointer, and focus

The data-api listener is delegated `click` on `document`, so it uses the capture phase (`node_modules/bootstrap/js/src/collapse.js:280`, `node_modules/bootstrap/js/src/dom/event-handler.js:130-137`, `node_modules/bootstrap/js/src/dom/event-handler.js:184`, `node_modules/bootstrap/js/src/dom/event-handler.js:208-211`). The handler's calls are the `A` `preventDefault` and `toggle` (`node_modules/bootstrap/js/src/collapse.js:282-288`).

### Timing

The queued flag is `true` for `show` and `hide`, and the waited element is the panel (`node_modules/bootstrap/js/src/collapse.js:162`, `node_modules/bootstrap/js/src/collapse.js:204`, `node_modules/bootstrap/js/src/base-component.js:49-51`). Completion is `transitionend` on that element, or the emulated `transitionend` after the computed `transition-duration` plus `transition-delay` of the index-`0` comma segments, plus `5` (`node_modules/bootstrap/js/src/util/index.js:229-255`, `node_modules/bootstrap/js/src/util/index.js:47-67`). The host supplies those computed strings. `_isTransitioning` starts `false`, is set `true` before the wait, and is cleared at the start of each completion (`node_modules/bootstrap/js/src/collapse.js:63`, `node_modules/bootstrap/js/src/collapse.js:146`, `node_modules/bootstrap/js/src/collapse.js:149`, `node_modules/bootstrap/js/src/collapse.js:193`, `node_modules/bootstrap/js/src/collapse.js:196`). The `reflow` site is `hide` (`node_modules/bootstrap/js/src/collapse.js:180`, `node_modules/bootstrap/js/src/util/index.js:175-177`).

### Cross-plugin coupling

With a parent, `show` builds sibling `Collapse` instances through `getOrCreateInstance(element, { toggle: false })` and calls `hide()` on each (`node_modules/bootstrap/js/src/collapse.js:119-136`). The imports are `BaseComponent`, `EventHandler`, `SelectorEngine`, `defineJQueryPlugin`, `getElement`, and `reflow` (`node_modules/bootstrap/js/src/collapse.js:8-15`).

### Popper

The import list is the same six modules (`node_modules/bootstrap/js/src/collapse.js:8-15`).

## Dropdown

`NAME` is `dropdown`, the data key is `bs.dropdown`, and the event namespace is `.bs.dropdown` (`node_modules/bootstrap/js/src/dropdown.js:29-31`).

### Markup hooks

The markup hooks are:

| Hook | Value |
| --- | --- |
| Toggle selector | `[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)` (`node_modules/bootstrap/js/src/dropdown.js:55`) |
| Open toggles | That selector plus `.show` (`node_modules/bootstrap/js/src/dropdown.js:48`, `node_modules/bootstrap/js/src/dropdown.js:56`) |
| Menu | `.dropdown-menu`, taken from the next match, else the previous match, else `findOne` inside `parentNode` (`node_modules/bootstrap/js/src/dropdown.js:57`, `node_modules/bootstrap/js/src/dropdown.js:98-102`, `node_modules/bootstrap/js/src/dom/selector-engine.js:60-85`) |
| Parent | `parentNode` (`node_modules/bootstrap/js/src/dropdown.js:98`) |
| Items | `.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)`, then `isVisible` (`node_modules/bootstrap/js/src/dropdown.js:60`, `node_modules/bootstrap/js/src/dropdown.js:328`, `node_modules/bootstrap/js/src/util/index.js:99-104`) |
| Navbar | `.navbar` on the toggle; `.navbar-nav` around the parent (`node_modules/bootstrap/js/src/dropdown.js:58-59`, `node_modules/bootstrap/js/src/dropdown.js:145`, `node_modules/bootstrap/js/src/dropdown.js:277-279`) |
| Placement classes | On `parentNode`: `dropup`, `dropend`, `dropstart`, `dropup-center`, `dropdown-center` (`node_modules/bootstrap/js/src/dropdown.js:49-53`, `node_modules/bootstrap/js/src/dropdown.js:248-265`) |
| End alignment | Computed `--bs-position` on the menu, trimmed, compared with `end` (`node_modules/bootstrap/js/src/dropdown.js:267-274`) |
| Shown test | Class `show` on the menu (`node_modules/bootstrap/js/src/dropdown.js:244-246`) |

`.dropdown-menu` is `display: none`; `.dropdown-menu.show` is `display: block` (`node_modules/bootstrap/dist/css/bootstrap.css:3432-3434`, `node_modules/bootstrap/dist/css/bootstrap.css:3662-3664`). `.dropdown-menu[data-bs-popper]` sets `top: 100%`, `left: 0`, and `margin-top` (`node_modules/bootstrap/dist/css/bootstrap.css:3447-3451`). The `dropup`, `dropend`, and `dropstart` overrides move that menu (`node_modules/bootstrap/dist/css/bootstrap.css:3549-3553`, `node_modules/bootstrap/dist/css/bootstrap.css:3569-3574`, `node_modules/bootstrap/dist/css/bootstrap.css:3593-3598`). `.dropdown-menu-start` sets `--bs-position: start` and `.dropdown-menu-end` sets `--bs-position: end`; the `sm` through `xxl` blocks repeat those assignments (`node_modules/bootstrap/dist/css/bootstrap.css:3453-3547`). The host supplies the computed value. `.navbar-nav .dropdown-menu` is `position: static`; `.navbar-expand .navbar-nav .dropdown-menu` is `position: absolute` (`node_modules/bootstrap/dist/css/bootstrap.css:4001-4003`, `node_modules/bootstrap/dist/css/bootstrap.css:4304-4306`). `.dropup`, `.dropend`, `.dropdown`, `.dropstart`, `.dropup-center`, and `.dropdown-center` are `position: relative` (`node_modules/bootstrap/dist/css/bootstrap.css:3379-3386`).

### Options

The option keys are:

| Key | Default | DefaultType | `data-bs-*` | Effect |
| --- | --- | --- | --- | --- |
| `autoClose` | `true` | `(boolean\|string)` | `data-bs-auto-close` | `false` skips `clearMenus` for that instance. `inside` skips hiding when the menu is absent from `composedPath`. `outside` skips hiding when the menu is in `composedPath` (`node_modules/bootstrap/js/src/dropdown.js:71-81`, `node_modules/bootstrap/js/src/dropdown.js:365-377`) |
| `boundary` | `'clippingParents'` | `(string\|element)` | `data-bs-boundary` | `preventOverflow` option `boundary` (`node_modules/bootstrap/js/src/dropdown.js:73`, `node_modules/bootstrap/js/src/dropdown.js:82`, `node_modules/bootstrap/js/src/dropdown.js:298-302`) |
| `display` | `'dynamic'` | `string` | `data-bs-display` | `'static'` selects the static Popper path (`node_modules/bootstrap/js/src/dropdown.js:74`, `node_modules/bootstrap/js/src/dropdown.js:313-318`) |
| `offset` | `[0, 2]` | `(array\|string\|function)` | `data-bs-offset` | A string is `split(',')` and `parseInt` base `10`. A function is called as `(popperData, toggle)` (`node_modules/bootstrap/js/src/dropdown.js:75`, `node_modules/bootstrap/js/src/dropdown.js:281-292`) |
| `popperConfig` | `null` | `(null\|object\|function)` | `data-bs-popper-config` | Spread after the default Popper object (`node_modules/bootstrap/js/src/dropdown.js:76`, `node_modules/bootstrap/js/src/dropdown.js:321-324`, `node_modules/bootstrap/js/src/util/index.js:225-227`) |
| `reference` | `'toggle'` | `(string\|element\|object)` | `data-bs-reference` | `'parent'` uses `parentNode`. An element uses `getElement`. An object is passed through when it has `getBoundingClientRect` (`node_modules/bootstrap/js/src/dropdown.js:77`, `node_modules/bootstrap/js/src/dropdown.js:230-238`) |

`_getConfig` calls `super._getConfig`, so the merge order is `Default`, `data-bs-config`, `data-bs-*`, then the constructor object, and the inherited `_configAfterMerge` returns that object (`node_modules/bootstrap/js/src/dropdown.js:212-213`, `node_modules/bootstrap/js/src/base-component.js:53-57`, `node_modules/bootstrap/js/src/util/config.js:36-48`). An object `reference` with no `getBoundingClientRect` throws `TypeError` `` `DROPDOWN: Option "reference" provided type "object" without a required "getBoundingClientRect" method.` `` (`node_modules/bootstrap/js/src/dropdown.js:215-220`).

### DOM writes

`toggle` calls `hide` when the menu has `show`, and `show` otherwise (`node_modules/bootstrap/js/src/dropdown.js:120-122`). `show` returns when `isDisabled` is true or the menu has `show` (`node_modules/bootstrap/js/src/dropdown.js:125-127`, `node_modules/bootstrap/js/src/util/index.js:126-139`). After `show` is accepted, the writes are: create the Popper instance (`node_modules/bootstrap/js/src/dropdown.js:139`); when `'ontouchstart' in document.documentElement` and the parent is outside `.navbar-nav`, `mouseover` `noop` on each `document.body` child (`node_modules/bootstrap/js/src/dropdown.js:145-148`, `node_modules/bootstrap/js/src/util/index.js:165`); `focus()` on the toggle (`node_modules/bootstrap/js/src/dropdown.js:151`); `aria-expanded` `true` (`node_modules/bootstrap/js/src/dropdown.js:152`); class `show` on the menu, then on the toggle (`node_modules/bootstrap/js/src/dropdown.js:154-155`). The host supplies `ontouchstart`.

`hide` uses the same disabled and shown guards, then `_completeHide` (`node_modules/bootstrap/js/src/dropdown.js:159-168`). After `hide` is accepted, the writes are: remove those `mouseover` listeners when `ontouchstart` is present (`node_modules/bootstrap/js/src/dropdown.js:195-198`); `popper.destroy()` when a Popper instance exists (`node_modules/bootstrap/js/src/dropdown.js:201-203`); remove `show` from the menu, then from the toggle (`node_modules/bootstrap/js/src/dropdown.js:205-206`); set `aria-expanded` to `'false'` (`node_modules/bootstrap/js/src/dropdown.js:207`); remove `data-bs-popper` (`node_modules/bootstrap/js/src/dropdown.js:208`, `node_modules/bootstrap/js/src/dom/manipulator.js:45-47`).

On the static path, `_getPopperConfig` sets `data-bs-popper="static"` before Popper creation (`node_modules/bootstrap/js/src/dropdown.js:313-314`, `node_modules/bootstrap/js/src/dom/manipulator.js:41-43`). `update` refreshes `_inNavbar` and calls `popper.update()` when a Popper instance exists (`node_modules/bootstrap/js/src/dropdown.js:179-183`). `dispose` calls `popper.destroy()` when a Popper instance exists, then the base `dispose` (`node_modules/bootstrap/js/src/dropdown.js:171-176`, `node_modules/bootstrap/js/src/base-component.js:39-45`).

### Events

The names are `show.bs.dropdown`, `shown.bs.dropdown`, `hide.bs.dropdown`, and `hidden.bs.dropdown` (`node_modules/bootstrap/js/src/dropdown.js:40-43`). `trigger` makes them `cancelable: true` (`node_modules/bootstrap/js/src/dom/event-handler.js:282`).

| Path | Order |
| --- | --- |
| `show` | `show` with `{ relatedTarget: toggle }` (`node_modules/bootstrap/js/src/dropdown.js:129-133`). `defaultPrevented` returns before Popper creation (`node_modules/bootstrap/js/src/dropdown.js:135-139`). `shown` carries the same object after the class writes (`node_modules/bootstrap/js/src/dropdown.js:156`) |
| `hide` | `hide` with `{ relatedTarget: toggle }` (`node_modules/bootstrap/js/src/dropdown.js:164-168`, `node_modules/bootstrap/js/src/dropdown.js:187-190`). `defaultPrevented` returns before the class removals (`node_modules/bootstrap/js/src/dropdown.js:189-205`). `hidden` carries the same object after `data-bs-popper` is removed (`node_modules/bootstrap/js/src/dropdown.js:209`) |
| `clearMenus` | The hide object also gets `clickEvent` when `event.type === 'click'` (`node_modules/bootstrap/js/src/dropdown.js:384-390`) |
| Data API | `click.bs.dropdown.data-api` and `keyup.bs.dropdown.data-api` call `clearMenus` with no selector. `keydown.bs.dropdown.data-api` is delegated on the toggle selector and on `.dropdown-menu`. A second `click.bs.dropdown.data-api` is delegated on the toggle selector, calls `preventDefault`, and calls `toggle` (`node_modules/bootstrap/js/src/dropdown.js:44-46`, `node_modules/bootstrap/js/src/dropdown.js:440-447`) |

jQuery calls `getOrCreateInstance`, returns when `config` is not a string, throws `TypeError` `` `No method named "${config}"` `` when the property is `undefined`, and otherwise calls `data[config]()` (`node_modules/bootstrap/js/src/dropdown.js:340-351`). The jQuery name is `dropdown` (`node_modules/bootstrap/js/src/dropdown.js:29`, `node_modules/bootstrap/js/src/dropdown.js:453`, `node_modules/bootstrap/js/src/util/index.js:213-216`).

### Keyboard, pointer, and focus

`clearMenus` returns when `event.button === 2`, and when `event.type === 'keyup'` and `event.key !== 'Tab'` (`node_modules/bootstrap/js/src/dropdown.js:38`, `node_modules/bootstrap/js/src/dropdown.js:356-358`). It skips a missing instance and `autoClose === false` (`node_modules/bootstrap/js/src/dropdown.js:364-367`). It skips when `composedPath` includes the toggle, when `autoClose === 'inside'` and the path misses the menu, or when `autoClose === 'outside'` and the path includes the menu (`node_modules/bootstrap/js/src/dropdown.js:369-377`). It skips when the menu contains `event.target` and the event is a Tab `keyup` or the target tag matches `/input|select|option|textarea|form/i` (`node_modules/bootstrap/js/src/dropdown.js:380-382`).

The keydown handler returns unless the key is `ArrowUp`, `ArrowDown`, or `Escape` (`node_modules/bootstrap/js/src/dropdown.js:34-37`, `node_modules/bootstrap/js/src/dropdown.js:397-404`). On `input` or `textarea`, a key other than `Escape` returns (`node_modules/bootstrap/js/src/dropdown.js:398-408`). Otherwise it calls `preventDefault` (`node_modules/bootstrap/js/src/dropdown.js:410`). The toggle is `this` when it matches the toggle selector; otherwise `prev`, else `next`, else `findOne` in `delegateTarget.parentNode` (`node_modules/bootstrap/js/src/dropdown.js:413-417`). `ArrowUp` or `ArrowDown` calls `stopPropagation`, `show`, and `_selectMenuItem` (`node_modules/bootstrap/js/src/dropdown.js:421-425`). `_selectMenuItem` focuses `getNextActiveElement` with the third argument true for `ArrowDown`, and with cycling when the event target is absent from the item list (`node_modules/bootstrap/js/src/dropdown.js:327-336`, `node_modules/bootstrap/js/src/util/index.js:267-283`). `Escape` on a shown menu calls `stopPropagation`, `hide`, and `focus()` on the toggle (`node_modules/bootstrap/js/src/dropdown.js:428-431`). Delegated listeners use the capture phase (`node_modules/bootstrap/js/src/dom/event-handler.js:130-137`, `node_modules/bootstrap/js/src/dom/event-handler.js:184`). `isVisible` depends on client rects and computed `visibility` (`node_modules/bootstrap/js/src/util/index.js:99-104`).

### Timing

`show` triggers `shown` in the same call, after the class writes (`node_modules/bootstrap/js/src/dropdown.js:154-156`). `_completeHide` triggers `hidden` in the same call, after the class removals (`node_modules/bootstrap/js/src/dropdown.js:205-209`). The guards are `isDisabled` and `_isShown` (`node_modules/bootstrap/js/src/dropdown.js:125-127`, `node_modules/bootstrap/js/src/dropdown.js:160-162`, `node_modules/bootstrap/js/src/dropdown.js:244-246`).

### Cross-plugin coupling

The menu lookup and the item walk use `SelectorEngine` (`node_modules/bootstrap/js/src/dropdown.js:100-102`, `node_modules/bootstrap/js/src/dropdown.js:328`). Placement constants call `isRTL()` while the module evaluates (`node_modules/bootstrap/js/src/dropdown.js:62-69`, `node_modules/bootstrap/js/src/util/index.js:206`). The touch path adds and removes `mouseover` `noop` listeners on `document.body` children (`node_modules/bootstrap/js/src/dropdown.js:145-148`, `node_modules/bootstrap/js/src/dropdown.js:195-198`).

### Popper

`import * as Popper from '@popperjs/core'` (`node_modules/bootstrap/js/src/dropdown.js:8`). A missing `Popper` throws `TypeError` `Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)` (`node_modules/bootstrap/js/src/dropdown.js:226-228`). `Popper.createPopper` receives the reference, the menu, and `_getPopperConfig()` (`node_modules/bootstrap/js/src/dropdown.js:240-241`).

The placement check order on `parentNode` is `dropend`, `dropstart`, `dropup-center`, `dropdown-center`, then `dropup`, then the bottom pair (`node_modules/bootstrap/js/src/dropdown.js:251-274`). Those constants are `right-start` or `left-start`, `top`, `bottom`, and the `top-start`, `top-end`, `bottom-start`, and `bottom-end` pairs. `isRTL()` at module evaluation swaps each start/end pair and swaps `dropend` with `dropstart` (`node_modules/bootstrap/js/src/dropdown.js:62-69`). `--bs-position` is read on each placement call (`node_modules/bootstrap/js/src/dropdown.js:268`).

The default modifiers are `preventOverflow` with `boundary`, then `offset` with the resolved offset (`node_modules/bootstrap/js/src/dropdown.js:296-309`). Inside `.navbar`, or when `display === 'static'`, the menu gets `data-bs-popper="static"` and the modifiers become `applyStyles` with `enabled: false` (`node_modules/bootstrap/js/src/dropdown.js:312-318`). `popperConfig` is spread after that object (`node_modules/bootstrap/js/src/dropdown.js:321-324`).

## Modal

`NAME` is `modal`, the data key is `bs.modal`, and the event namespace is `.bs.modal` (`node_modules/bootstrap/js/src/modal.js:23-25`).

### Markup hooks

The markup hooks are:

| Hook | Value |
| --- | --- |
| Toggle | `[data-bs-toggle="modal"]` (`node_modules/bootstrap/js/src/modal.js:48`, `node_modules/bootstrap/js/src/modal.js:339`) |
| Dismiss | `[data-bs-dismiss="modal"]` (`node_modules/bootstrap/js/src/util/component-functions.js:13-16`, `node_modules/bootstrap/js/src/modal.js:370`) |
| Target | `getElementFromSelector` on the toggle: `data-bs-target`, then `href` (`node_modules/bootstrap/js/src/modal.js:340`, `node_modules/bootstrap/js/src/dom/selector-engine.js:10-32`, `node_modules/bootstrap/js/src/dom/selector-engine.js:113-116`) |
| Dismiss target | That selector, else `closest('.modal')` (`node_modules/bootstrap/js/src/util/component-functions.js:25`) |
| Dialog | `.modal-dialog` (`node_modules/bootstrap/js/src/modal.js:46`, `node_modules/bootstrap/js/src/modal.js:70`) |
| Body | `.modal-body` inside the dialog (`node_modules/bootstrap/js/src/modal.js:47`, `node_modules/bootstrap/js/src/modal.js:183`) |
| Already open | `.modal.show` (`node_modules/bootstrap/js/src/modal.js:45`, `node_modules/bootstrap/js/src/modal.js:360`) |
| Animated | Class `fade` on the modal (`node_modules/bootstrap/js/src/modal.js:41`, `node_modules/bootstrap/js/src/modal.js:260-262`) |
| Tags | `A` and `AREA` on the toggle (`node_modules/bootstrap/js/src/modal.js:342-344`) |

`.modal` is fixed, full-size, and `display: none` (`node_modules/bootstrap/dist/css/bootstrap.css:5477-5481`). `.modal.fade .modal-dialog` sets `transform: translate(0, -50px)` and `transition: transform 0.3s ease-out`; `prefers-reduced-motion: reduce` sets that transition to `none` (`node_modules/bootstrap/dist/css/bootstrap.css:5495-5502`). `.modal.show .modal-dialog` sets `transform: none` (`node_modules/bootstrap/dist/css/bootstrap.css:5504-5506`). `.modal.modal-static .modal-dialog` sets `transform: scale(1.02)` (`node_modules/bootstrap/dist/css/bootstrap.css:5507-5509`). The backdrop rules are `.modal-backdrop`, `.modal-backdrop.fade`, and `.modal-backdrop.show` (`node_modules/bootstrap/dist/css/bootstrap.css:5542-5558`).

### Options

The option keys are:

| Key | Default | DefaultType | `data-bs-*` | Effect |
| --- | --- | --- | --- | --- |
| `backdrop` | `true` | `(boolean\|string)` | `data-bs-backdrop` | `Boolean(backdrop)` is the backdrop's `isVisible` (`node_modules/bootstrap/js/src/modal.js:51`, `node_modules/bootstrap/js/src/modal.js:57`, `node_modules/bootstrap/js/src/modal.js:158-161`). `'static'` runs `_triggerBackdropTransition` (`node_modules/bootstrap/js/src/modal.js:233-235`). Any truthy value on a modal-element click calls `hide` (`node_modules/bootstrap/js/src/modal.js:238-240`) |
| `focus` | `true` | `boolean` | `data-bs-focus` | After the show wait, a truthy value calls `focustrap.activate()` (`node_modules/bootstrap/js/src/modal.js:52`, `node_modules/bootstrap/js/src/modal.js:193-195`) |
| `keyboard` | `true` | `boolean` | `data-bs-keyboard` | `Escape` calls `hide` when true, and `_triggerBackdropTransition` when false (`node_modules/bootstrap/js/src/modal.js:53`, `node_modules/bootstrap/js/src/modal.js:212-217`) |

Construction uses the shared merge and the inherited `_configAfterMerge`, which returns its object (`node_modules/bootstrap/js/src/base-component.js:53-57`, `node_modules/bootstrap/js/src/util/config.js:36-48`). The backdrop is built with `isAnimated` from class `fade` and with no `clickCallback` (`node_modules/bootstrap/js/src/modal.js:158-162`, `node_modules/bootstrap/js/src/util/backdrop.js:23-29`). The focus trap's `trapElement` is the modal; `autofocus` stays `true` (`node_modules/bootstrap/js/src/modal.js:165-168`, `node_modules/bootstrap/js/src/util/focustrap.js:26-28`).

### DOM writes

`toggle` calls `hide` when `_isShown` is true, and `show(relatedTarget)` otherwise (`node_modules/bootstrap/js/src/modal.js:94-96`).

`show` returns when `_isShown` or `_isTransitioning` is set (`node_modules/bootstrap/js/src/modal.js:99-101`). After `show` is accepted, the writes are: both flags set true (`node_modules/bootstrap/js/src/modal.js:111-112`); `ScrollBarHelper.hide` (`node_modules/bootstrap/js/src/modal.js:114`, `node_modules/bootstrap/js/src/util/scrollbar.js:37-44`); class `modal-open` on `document.body` (`node_modules/bootstrap/js/src/modal.js:40`, `node_modules/bootstrap/js/src/modal.js:116`); `_adjustDialog` (`node_modules/bootstrap/js/src/modal.js:118`); `backdrop.show` (`node_modules/bootstrap/js/src/modal.js:120`). `_showElement` appends the modal to `document.body` when it is outside the body (`node_modules/bootstrap/js/src/modal.js:173-175`); sets `display` to `block` (`node_modules/bootstrap/js/src/modal.js:177`); removes `aria-hidden`; sets `aria-modal` true and `role` `dialog` (`node_modules/bootstrap/js/src/modal.js:178-180`); sets `scrollTop` to `0` on the modal and, when present, on `.modal-body` (`node_modules/bootstrap/js/src/modal.js:181-186`); `reflow`s the modal (`node_modules/bootstrap/js/src/modal.js:188`); adds class `show` (`node_modules/bootstrap/js/src/modal.js:190`).

`_adjustDialog` reads `scrollHeight > documentElement.clientHeight` and `scrollBar.getWidth() > 0` (`node_modules/bootstrap/js/src/modal.js:297-299`). Body overflow with a modal that fits sets `paddingLeft` in RTL and `paddingRight` otherwise, to `` `${scrollbarWidth}px` `` (`node_modules/bootstrap/js/src/modal.js:301-304`, `node_modules/bootstrap/js/src/util/index.js:206`). A modal that overflows while the body fits sets the opposite property (`node_modules/bootstrap/js/src/modal.js:306-309`). The widths come from the host.

`hide` returns unless `_isShown` is true and `_isTransitioning` is false (`node_modules/bootstrap/js/src/modal.js:124-126`). After `hide` is accepted: `_isShown` false, `_isTransitioning` true, trap `deactivate`, remove class `show` (`node_modules/bootstrap/js/src/modal.js:134-138`). `_hideModal` sets `display` `none`, sets `aria-hidden` true, removes `aria-modal` and `role`, and sets `_isTransitioning` false (`node_modules/bootstrap/js/src/modal.js:245-250`). The backdrop hide callback removes `modal-open`, clears `paddingLeft` and `paddingRight`, and calls `ScrollBarHelper.reset` (`node_modules/bootstrap/js/src/modal.js:252-255`, `node_modules/bootstrap/js/src/modal.js:312-315`).

`_triggerBackdropTransition`, after `hidePrevented` is accepted, returns when inline `overflowY` is `'hidden'` or class `modal-static` is present (`node_modules/bootstrap/js/src/modal.js:270-275`). Otherwise, when the modal fits the viewport, it sets `overflowY` to `hidden` (`node_modules/bootstrap/js/src/modal.js:277-279`); adds `modal-static` (`node_modules/bootstrap/js/src/modal.js:281`); queues removal of `modal-static`, then queues restoration of the saved `overflowY`, both on `.modal-dialog` (`node_modules/bootstrap/js/src/modal.js:282-287`); calls `focus()` on the modal (`node_modules/bootstrap/js/src/modal.js:289`). `handleUpdate` calls `_adjustDialog` (`node_modules/bootstrap/js/src/modal.js:153-155`). `dispose` removes `.bs.modal` listeners on `window` and on the dialog, disposes the backdrop, deactivates the trap, and runs the base `dispose` (`node_modules/bootstrap/js/src/modal.js:143-150`, `node_modules/bootstrap/js/src/base-component.js:39-45`).

### Events

`trigger` makes these `cancelable: true` (`node_modules/bootstrap/js/src/dom/event-handler.js:282`).

| Path | Order |
| --- | --- |
| `show` | `show.bs.modal` with `{ relatedTarget }` (`node_modules/bootstrap/js/src/modal.js:32`, `node_modules/bootstrap/js/src/modal.js:103-105`). `defaultPrevented` returns before the flags and the scrollbar write (`node_modules/bootstrap/js/src/modal.js:107-114`). `shown.bs.modal` carries the same object after the dialog wait (`node_modules/bootstrap/js/src/modal.js:33`, `node_modules/bootstrap/js/src/modal.js:198-200`) |
| `hide` | `hide.bs.modal` with no property object (`node_modules/bootstrap/js/src/modal.js:29`, `node_modules/bootstrap/js/src/modal.js:128`). `defaultPrevented` returns before the trap deactivates (`node_modules/bootstrap/js/src/modal.js:130-136`). `hidden.bs.modal` fires in the backdrop callback (`node_modules/bootstrap/js/src/modal.js:31`, `node_modules/bootstrap/js/src/modal.js:256`) |
| Static path | `hidePrevented.bs.modal` (`node_modules/bootstrap/js/src/modal.js:30`, `node_modules/bootstrap/js/src/modal.js:265`). `defaultPrevented` returns before the `modal-static` class (`node_modules/bootstrap/js/src/modal.js:266-281`) |
| Data API | `click.bs.modal.data-api` (`node_modules/bootstrap/js/src/modal.js:38`, `node_modules/bootstrap/js/src/modal.js:339`). `A` and `AREA` call `preventDefault`, then the handler registers the focus restorer, hides `.modal.show` through `getInstance`, and calls `toggle(this)` (`node_modules/bootstrap/js/src/modal.js:342-367`) |
| Dismiss | `click.dismiss.bs.modal` on `[data-bs-dismiss="modal"]` calls `hide` (`node_modules/bootstrap/js/src/util/component-functions.js:13-29`, `node_modules/bootstrap/js/src/modal.js:370`) |

The focus restorer is `one` on `show.bs.modal`: a prevented show skips it; otherwise `one` on `hidden.bs.modal` calls `focus()` on the toggle when `isVisible(this)` (`node_modules/bootstrap/js/src/modal.js:346-356`, `node_modules/bootstrap/js/src/util/index.js:99-104`). jQuery calls `getOrCreateInstance`, returns when `config` is not a string, throws `TypeError` `` `No method named "${config}"` `` when the property is `undefined`, and otherwise calls `data[config](relatedTarget)` (`node_modules/bootstrap/js/src/modal.js:318-330`). The jQuery name is `modal` (`node_modules/bootstrap/js/src/modal.js:23`, `node_modules/bootstrap/js/src/modal.js:376`, `node_modules/bootstrap/js/src/util/index.js:213-216`).

### Keyboard, pointer, and focus

`keydown.dismiss.bs.modal` sits on the modal (`node_modules/bootstrap/js/src/modal.js:37`, `node_modules/bootstrap/js/src/modal.js:207`). The key it handles is `Escape` (`node_modules/bootstrap/js/src/modal.js:27`, `node_modules/bootstrap/js/src/modal.js:208-217`). `resize.bs.modal` sits on `window` and calls `_adjustDialog` when shown and idle (`node_modules/bootstrap/js/src/modal.js:34`, `node_modules/bootstrap/js/src/modal.js:220-224`). `mousedown.dismiss.bs.modal` on the modal arms `one` `click.dismiss.bs.modal` (`node_modules/bootstrap/js/src/modal.js:35-36`, `node_modules/bootstrap/js/src/modal.js:226-228`). The click proceeds when both the mousedown target and the click target are the modal element (`node_modules/bootstrap/js/src/modal.js:229-231`). The data-api click listener is delegated, so it uses the capture phase (`node_modules/bootstrap/js/src/modal.js:339`, `node_modules/bootstrap/js/src/dom/event-handler.js:184`).

With `config.focus`, activation focuses the modal because `autofocus` is `true`, then listens on `document` for `focusin.bs.focustrap` and `keydown.tab.bs.focustrap` (`node_modules/bootstrap/js/src/util/focustrap.js:19-20`, `node_modules/bootstrap/js/src/util/focustrap.js:62-75`). `Tab` records `backward` when `shiftKey` is set and `forward` otherwise (`node_modules/bootstrap/js/src/util/focustrap.js:106-112`). `hide` deactivates the trap before removing `show` (`node_modules/bootstrap/js/src/modal.js:136-138`).

### Timing

`show` queues its completion on `.modal-dialog` (`node_modules/bootstrap/js/src/modal.js:203`). `hide` queues `_hideModal` on the modal element (`node_modules/bootstrap/js/src/modal.js:140`). Both pass `_isAnimated()`. The static queues omit that argument, so they use the default `true`, and both wait on `.modal-dialog` (`node_modules/bootstrap/js/src/modal.js:282-287`, `node_modules/bootstrap/js/src/base-component.js:49-51`). The wait is `transitionend` on that element, or the emulated event after the computed duration plus `5` (`node_modules/bootstrap/js/src/util/index.js:229-255`). The host supplies the computed strings. `_isShown` and `_isTransitioning` start `false` (`node_modules/bootstrap/js/src/modal.js:73-74`). The shown callback clears `_isTransitioning` (`node_modules/bootstrap/js/src/modal.js:197`). `_hideModal` clears it before `backdrop.hide` (`node_modules/bootstrap/js/src/modal.js:250-252`). The `reflow` in this file is on the modal inside `_showElement` (`node_modules/bootstrap/js/src/modal.js:188`).

### Cross-plugin coupling

The helpers are `Backdrop`, `FocusTrap`, and `ScrollBarHelper` (`node_modules/bootstrap/js/src/modal.js:11-17`, `node_modules/bootstrap/js/src/modal.js:70-75`). The data API hides an open `.modal.show` before `toggle` (`node_modules/bootstrap/js/src/modal.js:359-367`). Dismiss uses `enableDismissTrigger` (`node_modules/bootstrap/js/src/modal.js:370`). Tooltip listens for `hide.bs.modal` on the closest `.modal` and calls `hide` (`node_modules/bootstrap/js/src/tooltip.js:26-32`, `node_modules/bootstrap/js/src/tooltip.js:477-483`).

### Popper

The imports are `BaseComponent`, `EventHandler`, `SelectorEngine`, `Backdrop`, `enableDismissTrigger`, `FocusTrap`, `defineJQueryPlugin`, `isRTL`, `isVisible`, `reflow`, and `ScrollBarHelper` (`node_modules/bootstrap/js/src/modal.js:8-17`).

## Offcanvas

`NAME` is `offcanvas`, the data key is `bs.offcanvas`, and the event namespace is `.bs.offcanvas` (`node_modules/bootstrap/js/src/offcanvas.js:25-27`).

### Markup hooks

The markup hooks are:

| Hook | Value |
| --- | --- |
| Toggle | `[data-bs-toggle="offcanvas"]` (`node_modules/bootstrap/js/src/offcanvas.js:47`, `node_modules/bootstrap/js/src/offcanvas.js:232`) |
| Dismiss | `[data-bs-dismiss="offcanvas"]` (`node_modules/bootstrap/js/src/util/component-functions.js:13-16`, `node_modules/bootstrap/js/src/offcanvas.js:274`) |
| Target | `getElementFromSelector` on the toggle: `data-bs-target`, then `href` (`node_modules/bootstrap/js/src/offcanvas.js:233`, `node_modules/bootstrap/js/src/dom/selector-engine.js:10-32`, `node_modules/bootstrap/js/src/dom/selector-engine.js:113-116`) |
| Dismiss target | That selector, else `closest('.offcanvas')` (`node_modules/bootstrap/js/src/util/component-functions.js:25`) |
| Already open | `.offcanvas.show` (`node_modules/bootstrap/js/src/offcanvas.js:36`, `node_modules/bootstrap/js/src/offcanvas.js:251`) |
| Load set | Every `.offcanvas.show` (`node_modules/bootstrap/js/src/offcanvas.js:260-263`) |
| Resize set | `[aria-modal][class*=show][class*=offcanvas-]` (`node_modules/bootstrap/js/src/offcanvas.js:267`) |
| Backdrop parent | `parentNode` (`node_modules/bootstrap/js/src/offcanvas.js:184`) |
| Tags | `A` and `AREA` on the toggle (`node_modules/bootstrap/js/src/offcanvas.js:235-237`) |

`.offcanvas` is `position: fixed`, `visibility: hidden`, and `transition: var(--bs-offcanvas-transition)` (`node_modules/bootstrap/dist/css/bootstrap.css:6680-6692`). That variable is `transform 0.3s ease-in-out` (`node_modules/bootstrap/dist/css/bootstrap.css:6286`). `prefers-reduced-motion: reduce` sets `.offcanvas` to `transition: none` (`node_modules/bootstrap/dist/css/bootstrap.css:6694-6697`). `.offcanvas-start`, `.offcanvas-end`, `.offcanvas-top`, and `.offcanvas-bottom` set the off-screen `transform` (`node_modules/bootstrap/dist/css/bootstrap.css:6699-6728`). `.offcanvas.showing` and `.offcanvas.show:not(.hiding)` set `transform: none` (`node_modules/bootstrap/dist/css/bootstrap.css:6730-6732`). `.showing`, `.hiding`, and `.show` set `visibility: visible` (`node_modules/bootstrap/dist/css/bootstrap.css:6733-6735`). Inside `max-width: 575.98px`, `.offcanvas-sm` is `position: fixed` with the same visibility and transform pairing (`node_modules/bootstrap/dist/css/bootstrap.css:6290-6348`). The backdrop rules are `.offcanvas-backdrop`, `.offcanvas-backdrop.fade` (`opacity: 0`), and `.offcanvas-backdrop.show` (`opacity: 0.5`) (`node_modules/bootstrap/dist/css/bootstrap.css:6737-6750`).

### Options

The option keys are:

| Key | Default | DefaultType | `data-bs-*` | Effect |
| --- | --- | --- | --- | --- |
| `backdrop` | `true` | `(boolean\|string)` | `data-bs-backdrop` | `Boolean(backdrop)` is the backdrop `isVisible`. A visible backdrop gets `clickCallback`. `'static'` triggers `hidePrevented` from that callback (`node_modules/bootstrap/js/src/offcanvas.js:50`, `node_modules/bootstrap/js/src/offcanvas.js:55`, `node_modules/bootstrap/js/src/offcanvas.js:167-186`) |
| `keyboard` | `true` | `boolean` | `data-bs-keyboard` | `Escape` calls `hide` when true, and triggers `hidePrevented` when false (`node_modules/bootstrap/js/src/offcanvas.js:51`, `node_modules/bootstrap/js/src/offcanvas.js:201-206`) |
| `scroll` | `false` | `boolean` | `data-bs-scroll` | A false value calls `ScrollBarHelper.hide` in `show` and `ScrollBarHelper.reset` in the hide completion (`node_modules/bootstrap/js/src/offcanvas.js:52`, `node_modules/bootstrap/js/src/offcanvas.js:107-109`, `node_modules/bootstrap/js/src/offcanvas.js:150-152`) |

The trap activates when `scroll` is false or `backdrop` is truthy (`node_modules/bootstrap/js/src/offcanvas.js:116-118`). Construction uses the shared merge and the inherited `_configAfterMerge`, which returns its object (`node_modules/bootstrap/js/src/base-component.js:53-57`, `node_modules/bootstrap/js/src/util/config.js:36-48`). The backdrop object sets `className` to `offcanvas-backdrop`, `isAnimated` to `true`, and `rootElement` to `parentNode` (`node_modules/bootstrap/js/src/offcanvas.js:35`, `node_modules/bootstrap/js/src/offcanvas.js:180-186`). The trap's `trapElement` is the offcanvas; `autofocus` stays `true` (`node_modules/bootstrap/js/src/offcanvas.js:189-192`, `node_modules/bootstrap/js/src/util/focustrap.js:26-28`).

### DOM writes

`toggle` calls `hide` when `_isShown` is true, and `show(relatedTarget)` otherwise (`node_modules/bootstrap/js/src/offcanvas.js:89-91`).

`show` returns when `_isShown` is true (`node_modules/bootstrap/js/src/offcanvas.js:94-96`). After `show` is accepted: `_isShown` is set true (`node_modules/bootstrap/js/src/offcanvas.js:104`); `backdrop.show()` runs (`node_modules/bootstrap/js/src/offcanvas.js:105`); a false `scroll` calls `hide()` on a `ScrollBarHelper` (`node_modules/bootstrap/js/src/offcanvas.js:107-109`, `node_modules/bootstrap/js/src/util/scrollbar.js:37-44`); `aria-modal` is set true and `role` is set to `dialog` (`node_modules/bootstrap/js/src/offcanvas.js:111-112`); class `showing` is added (`node_modules/bootstrap/js/src/offcanvas.js:113`). The completion adds `show`, removes `showing`, and, under the trap condition, calls `focustrap.activate()` (`node_modules/bootstrap/js/src/offcanvas.js:115-121`).

`hide` returns when `_isShown` is false (`node_modules/bootstrap/js/src/offcanvas.js:129-131`). After `hide` is accepted: the trap deactivates (`node_modules/bootstrap/js/src/offcanvas.js:139`); `blur()` runs (`node_modules/bootstrap/js/src/offcanvas.js:140`); `_isShown` is set false (`node_modules/bootstrap/js/src/offcanvas.js:141`); class `hiding` is added (`node_modules/bootstrap/js/src/offcanvas.js:142`); `backdrop.hide()` runs (`node_modules/bootstrap/js/src/offcanvas.js:143`). The completion removes `show` and `hiding`, removes `aria-modal` and `role`, and a false `scroll` calls `reset()` on a `ScrollBarHelper` (`node_modules/bootstrap/js/src/offcanvas.js:145-152`, `node_modules/bootstrap/js/src/util/scrollbar.js:47-52`).

`dispose` disposes the backdrop, deactivates the trap, and runs the base `dispose` (`node_modules/bootstrap/js/src/offcanvas.js:160-163`, `node_modules/bootstrap/js/src/base-component.js:39-45`).

### Events

`trigger` makes these `cancelable: true` (`node_modules/bootstrap/js/src/dom/event-handler.js:282`).

| Path | Order |
| --- | --- |
| `show` | `show.bs.offcanvas` with `{ relatedTarget }` (`node_modules/bootstrap/js/src/offcanvas.js:38`, `node_modules/bootstrap/js/src/offcanvas.js:98`). `defaultPrevented` returns before `_isShown` is set (`node_modules/bootstrap/js/src/offcanvas.js:100-104`). `shown.bs.offcanvas` carries the same object after `showing` is removed (`node_modules/bootstrap/js/src/offcanvas.js:39`, `node_modules/bootstrap/js/src/offcanvas.js:122`) |
| `hide` | `hide.bs.offcanvas` with no property object (`node_modules/bootstrap/js/src/offcanvas.js:40`, `node_modules/bootstrap/js/src/offcanvas.js:133`). `defaultPrevented` returns before `blur` (`node_modules/bootstrap/js/src/offcanvas.js:135-140`). `hidden.bs.offcanvas` fires in the completion (`node_modules/bootstrap/js/src/offcanvas.js:42`, `node_modules/bootstrap/js/src/offcanvas.js:154`) |
| Static backdrop | The backdrop callback triggers `hidePrevented.bs.offcanvas` when `backdrop === 'static'` (`node_modules/bootstrap/js/src/offcanvas.js:41`, `node_modules/bootstrap/js/src/offcanvas.js:168-171`) |
| `Escape` | A false `keyboard` triggers `hidePrevented.bs.offcanvas` (`node_modules/bootstrap/js/src/offcanvas.js:206`) |
| Data API | `click.bs.offcanvas.data-api` (`node_modules/bootstrap/js/src/offcanvas.js:44`, `node_modules/bootstrap/js/src/offcanvas.js:232`). `A` and `AREA` call `preventDefault`. `isDisabled` returns. Otherwise `one` on `hidden.bs.offcanvas` focuses the toggle when `isVisible(this)`, a different `.offcanvas.show` is hidden through `getInstance`, and `toggle(this)` runs (`node_modules/bootstrap/js/src/offcanvas.js:235-257`, `node_modules/bootstrap/js/src/util/index.js:99-104`, `node_modules/bootstrap/js/src/util/index.js:126-139`) |
| Load | `load.bs.offcanvas.data-api` on `window` calls `show` for each `.offcanvas.show` (`node_modules/bootstrap/js/src/offcanvas.js:29`, `node_modules/bootstrap/js/src/offcanvas.js:260-263`) |
| Resize | `resize.bs.offcanvas` on `window` calls `hide` when computed `position` is not `fixed` (`node_modules/bootstrap/js/src/offcanvas.js:43`, `node_modules/bootstrap/js/src/offcanvas.js:266-270`). The host supplies that value |
| Dismiss | `click.dismiss.bs.offcanvas` calls `hide` (`node_modules/bootstrap/js/src/util/component-functions.js:13-29`, `node_modules/bootstrap/js/src/offcanvas.js:274`) |

jQuery calls `getOrCreateInstance`, returns when `config` is not a string, throws `TypeError` `` `No method named "${config}"` `` when the property is `undefined`, the name starts with `_`, or the name is `constructor`, and otherwise calls `data[config](this)` (`node_modules/bootstrap/js/src/offcanvas.js:211-223`). The jQuery name is `offcanvas` (`node_modules/bootstrap/js/src/offcanvas.js:25`, `node_modules/bootstrap/js/src/offcanvas.js:280`, `node_modules/bootstrap/js/src/util/index.js:213-216`).

### Keyboard, pointer, and focus

`keydown.dismiss.bs.offcanvas` sits on the offcanvas. The key it handles is `Escape` (`node_modules/bootstrap/js/src/offcanvas.js:30`, `node_modules/bootstrap/js/src/offcanvas.js:45`, `node_modules/bootstrap/js/src/offcanvas.js:196-206`). The backdrop listens for `mousedown.bs.backdrop` and runs `clickCallback` (`node_modules/bootstrap/js/src/util/backdrop.js:21`, `node_modules/bootstrap/js/src/util/backdrop.js:139-141`). The data-api click listener is delegated, so it uses the capture phase (`node_modules/bootstrap/js/src/offcanvas.js:232`, `node_modules/bootstrap/js/src/dom/event-handler.js:184`). Trap activation focuses the offcanvas because `autofocus` is `true`, then listens on `document` for `focusin.bs.focustrap` and `keydown.tab.bs.focustrap` (`node_modules/bootstrap/js/src/util/focustrap.js:62-75`). `Tab` records `backward` when `shiftKey` is set and `forward` otherwise (`node_modules/bootstrap/js/src/util/focustrap.js:106-112`). `hide` calls `blur()` and deactivates the trap before the `hiding` class (`node_modules/bootstrap/js/src/offcanvas.js:139-142`).

### Timing

`show` and `hide` queue on the offcanvas element with the literal `true` (`node_modules/bootstrap/js/src/offcanvas.js:125`, `node_modules/bootstrap/js/src/offcanvas.js:157`, `node_modules/bootstrap/js/src/base-component.js:49-51`). The wait is `transitionend` on that element, or the emulated event after the computed duration plus `5` (`node_modules/bootstrap/js/src/util/index.js:229-255`). The host supplies the computed strings. The backdrop uses `isAnimated: true`, so its own wait is on the backdrop element (`node_modules/bootstrap/js/src/offcanvas.js:183`, `node_modules/bootstrap/js/src/util/backdrop.js:146-148`). `_isShown` starts `false`, becomes `true` before class `showing`, and becomes `false` before class `hiding` (`node_modules/bootstrap/js/src/offcanvas.js:69`, `node_modules/bootstrap/js/src/offcanvas.js:104`, `node_modules/bootstrap/js/src/offcanvas.js:141`). `backdrop.show()` and the element queue start in the same `show` call (`node_modules/bootstrap/js/src/offcanvas.js:105-125`). `backdrop.hide()` and the element queue start in the same `hide` call (`node_modules/bootstrap/js/src/offcanvas.js:143-157`).

### Cross-plugin coupling

The helpers are `Backdrop`, `FocusTrap`, and `ScrollBarHelper` (`node_modules/bootstrap/js/src/offcanvas.js:11-19`). The data API hides a different `.offcanvas.show` before `toggle` (`node_modules/bootstrap/js/src/offcanvas.js:250-254`). Dismiss uses `enableDismissTrigger` (`node_modules/bootstrap/js/src/offcanvas.js:274`).

### Popper

The imports are `BaseComponent`, `EventHandler`, `SelectorEngine`, `Backdrop`, `enableDismissTrigger`, `FocusTrap`, `defineJQueryPlugin`, `isDisabled`, `isVisible`, and `ScrollBarHelper` (`node_modules/bootstrap/js/src/offcanvas.js:8-19`).

## Tooltip and Popover

### Tooltip

`NAME` is `tooltip`, so the data key is `bs.tooltip` and the event namespace is `.bs.tooltip` (`node_modules/bootstrap/js/src/tooltip.js:22`, `node_modules/bootstrap/js/src/base-component.js:73-83`).

The markup hooks are:

| Hook | Value |
| --- | --- |
| Template | `div.tooltip` with `role="tooltip"`, `.tooltip-arrow`, and `.tooltip-inner` (`node_modules/bootstrap/js/src/tooltip.js:73-76`) |
| Tip classes | `bs-tooltip-auto`; `fade` when animated; `show` while shown (`node_modules/bootstrap/js/src/tooltip.js:311-320`, `node_modules/bootstrap/js/src/tooltip.js:217`) |
| Trigger title | A `title` attribute moves to `data-bs-original-title` and is removed. An element with no `aria-label` and no trimmed text gets `aria-label` (`node_modules/bootstrap/js/src/tooltip.js:486-498`) |
| Described by | `aria-describedby` on the trigger is the tip `id` from `getUID` (`node_modules/bootstrap/js/src/tooltip.js:206`, `node_modules/bootstrap/js/src/tooltip.js:315-317`) |
| Delegation | A string `selector` listens on the trigger and builds the instance on `delegateTarget` (`node_modules/bootstrap/js/src/tooltip.js:361-363`, `node_modules/bootstrap/js/src/tooltip.js:449`) |
| Modal | `closest('.modal')` (`node_modules/bootstrap/js/src/tooltip.js:26-32`, `node_modules/bootstrap/js/src/tooltip.js:483`) |

`.tooltip` is `opacity: 0`; `.tooltip.show` sets `opacity` to `--bs-tooltip-opacity` (`node_modules/bootstrap/dist/css/bootstrap.css:5781-5785`). `.bs-tooltip-auto[data-popper-placement^=top]`, `right`, `bottom`, and `left` position `.tooltip-arrow` (`node_modules/bootstrap/dist/css/bootstrap.css:5798-5835`). `.fade` sets the opacity transition; `.fade:not(.show)` sets `opacity: 0` (`node_modules/bootstrap/dist/css/bootstrap.css:3342-3352`).

The option keys are:

| Key | Default | DefaultType | `data-bs-*` | Effect |
| --- | --- | --- | --- | --- |
| `animation` | `true` | `boolean` | `data-bs-animation` | Adds `fade` and gates the tip wait (`node_modules/bootstrap/js/src/tooltip.js:60`, `node_modules/bootstrap/js/src/tooltip.js:319-320`, `node_modules/bootstrap/js/src/tooltip.js:365-367`) |
| `boundary` | `'clippingParents'` | `(string\|element)` | `data-bs-boundary` | `preventOverflow` (`node_modules/bootstrap/js/src/tooltip.js:62`, `node_modules/bootstrap/js/src/tooltip.js:415-418`) |
| `container` | `false` | `(string\|element\|boolean)` | `data-bs-container` | `false` becomes `document.body`; otherwise `getElement` (`node_modules/bootstrap/js/src/tooltip.js:63`, `node_modules/bootstrap/js/src/tooltip.js:559`) |
| `customClass` | `''` | `(string\|function)` | `data-bs-custom-class` | Passed as `extraClass` (`node_modules/bootstrap/js/src/tooltip.js:64`, `node_modules/bootstrap/js/src/tooltip.js:343`) |
| `delay` | `0` | `(number\|object)` | `data-bs-delay` | A number becomes `{ show, hide }` with that number (`node_modules/bootstrap/js/src/tooltip.js:65`, `node_modules/bootstrap/js/src/tooltip.js:561-566`) |
| `fallbackPlacements` | `['top', 'right', 'bottom', 'left']` | `array` | `data-bs-fallback-placements` | `flip` (`node_modules/bootstrap/js/src/tooltip.js:66`, `node_modules/bootstrap/js/src/tooltip.js:402-405`) |
| `html` | `false` | `boolean` | `data-bs-html` | Template `html` flag (`node_modules/bootstrap/js/src/tooltip.js:67`, `node_modules/bootstrap/js/src/tooltip.js:338-344`) |
| `offset` | `[0, 6]` | `(array\|string\|function)` | `data-bs-offset` | String: `split(',')` and `parseInt` base `10`. Function: `(popperData, trigger)` (`node_modules/bootstrap/js/src/tooltip.js:68`, `node_modules/bootstrap/js/src/tooltip.js:379-390`) |
| `placement` | `'top'` | `(string\|function)` | `data-bs-placement` | `execute(placement, [this, tip, trigger])`, then `AttachmentMap` (`node_modules/bootstrap/js/src/tooltip.js:69`, `node_modules/bootstrap/js/src/tooltip.js:374-376`) |
| `popperConfig` | `null` | `(null\|object\|function)` | `data-bs-popper-config` | Spread after the default Popper object (`node_modules/bootstrap/js/src/tooltip.js:70`, `node_modules/bootstrap/js/src/tooltip.js:438-441`) |
| `selector` | `false` | `(string\|boolean)` | `data-bs-selector` | A string delegates. The delegate config forces `selector` `false` and `trigger` `'manual'` (`node_modules/bootstrap/js/src/tooltip.js:72`, `node_modules/bootstrap/js/src/tooltip.js:579-589`) |
| `template` | The tooltip markup | `string` | `data-bs-template` | Sanitized template (`node_modules/bootstrap/js/src/tooltip.js:73-76`) |
| `title` | `''` | `(string\|element\|function)` | `data-bs-title` | A number becomes a string. Resolved title or `data-bs-original-title` fills `.tooltip-inner` (`node_modules/bootstrap/js/src/tooltip.js:77`, `node_modules/bootstrap/js/src/tooltip.js:350-358`, `node_modules/bootstrap/js/src/tooltip.js:568-570`) |
| `trigger` | `'hover focus'` | `string` | `data-bs-trigger` | Split on spaces: `click`, `hover`, `focus`, `manual` (`node_modules/bootstrap/js/src/tooltip.js:34-37`, `node_modules/bootstrap/js/src/tooltip.js:78`, `node_modules/bootstrap/js/src/tooltip.js:445-474`) |
| `allowList` | `DefaultAllowlist` | `object` | stripped | Removed from data attributes before the merge (`node_modules/bootstrap/js/src/tooltip.js:23`, `node_modules/bootstrap/js/src/tooltip.js:59`, `node_modules/bootstrap/js/src/tooltip.js:539-546`) |
| `sanitize` | `true` | `boolean` | stripped | Same removal (`node_modules/bootstrap/js/src/tooltip.js:71`, `node_modules/bootstrap/js/src/tooltip.js:542-545`) |
| `sanitizeFn` | `null` | `(null\|function)` | stripped | Same removal (`node_modules/bootstrap/js/src/tooltip.js:71`, `node_modules/bootstrap/js/src/tooltip.js:542-545`) |

`sanitizeFn` default is `null` and its type is `(null|function)` (`node_modules/bootstrap/js/src/tooltip.js:71`, `node_modules/bootstrap/js/src/tooltip.js:94`). `_getConfig` builds data attributes, drops those three keys, overlays the constructor object, then calls `_mergeConfigObj` with no element, so `data-bs-config` is not read (`node_modules/bootstrap/js/src/tooltip.js:539-552`, `node_modules/bootstrap/js/src/util/config.js:40-48`). `_configAfterMerge` rewrites `container`, numeric `delay`, numeric `title`, and numeric `content` (`node_modules/bootstrap/js/src/tooltip.js:558-576`).

`show` throws `Error` `` `Please use show on visible elements` `` when `style.display === 'none'` (`node_modules/bootstrap/js/src/tooltip.js:185-187`). It returns unless there is a title and `_isEnabled` is true (`node_modules/bootstrap/js/src/tooltip.js:189-191`). After `show` is accepted and the trigger is in its shadow root or `documentElement` (`node_modules/bootstrap/js/src/tooltip.js:193-198`, `node_modules/bootstrap/js/src/util/index.js:142-162`), the writes are: dispose the previous tip (`node_modules/bootstrap/js/src/tooltip.js:202`); create the tip and set `aria-describedby` (`node_modules/bootstrap/js/src/tooltip.js:204-206`); append it to `container` when it is outside `documentElement` (`node_modules/bootstrap/js/src/tooltip.js:210-212`); create Popper (`node_modules/bootstrap/js/src/tooltip.js:215`); add `show` (`node_modules/bootstrap/js/src/tooltip.js:217`). `hide` removes `show`, clears the `click`, `focus`, and `hover` trigger flags, and sets `_isHovered` to `null` (`node_modules/bootstrap/js/src/tooltip.js:252-266`). Its completion removes the tip when no trigger remains and `_isHovered` is null, and removes `aria-describedby` (`node_modules/bootstrap/js/src/tooltip.js:268-278`, `node_modules/bootstrap/js/src/tooltip.js:597-606`). `setContent` stores `_newContent` and, when shown, disposes the tip and calls `show` (`node_modules/bootstrap/js/src/tooltip.js:326-331`). `dispose` clears `_timeout`, restores `title` from `data-bs-original-title`, and disposes the tip (`node_modules/bootstrap/js/src/tooltip.js:171-181`). `enable`, `disable`, and `toggleEnabled` write `_isEnabled` (`node_modules/bootstrap/js/src/tooltip.js:146-156`).

Events are triggered on the trigger element: `show.bs.tooltip`, `inserted.bs.tooltip`, `shown.bs.tooltip`, `hide.bs.tooltip`, and `hidden.bs.tooltip` (`node_modules/bootstrap/js/src/tooltip.js:39-43`, `node_modules/bootstrap/js/src/tooltip.js:193`, `node_modules/bootstrap/js/src/tooltip.js:212`, `node_modules/bootstrap/js/src/tooltip.js:230`, `node_modules/bootstrap/js/src/tooltip.js:247`, `node_modules/bootstrap/js/src/tooltip.js:278`). `defaultPrevented` on `show` or `hide` returns before the tip writes (`node_modules/bootstrap/js/src/tooltip.js:197-198`, `node_modules/bootstrap/js/src/tooltip.js:248-250`). `inserted` fires after append and before Popper (`node_modules/bootstrap/js/src/tooltip.js:210-215`). A hide completion with an active trigger returns before `hidden` (`node_modules/bootstrap/js/src/tooltip.js:269-271`). No property object is passed. jQuery calls `getOrCreateInstance`, returns when `config` is not a string, throws `TypeError` `` `No method named "${config}"` `` when the property is `undefined`, and otherwise calls `data[config]()` (`node_modules/bootstrap/js/src/tooltip.js:610-622`). The jQuery name is `tooltip` (`node_modules/bootstrap/js/src/tooltip.js:631`, `node_modules/bootstrap/js/src/util/index.js:213-216`).

Listeners sit on the trigger. `click` toggles `_activeTrigger.click` and calls `toggle` (`node_modules/bootstrap/js/src/tooltip.js:448-453`). `hover` uses `mouseenter` and `mouseleave`; `focus` uses `focusin` and `focusout` (`node_modules/bootstrap/js/src/tooltip.js:454-473`). Leave sets the matching flag from `element.contains(relatedTarget)` (`node_modules/bootstrap/js/src/tooltip.js:469-471`). `manual` adds no listener (`node_modules/bootstrap/js/src/tooltip.js:454`). With `'ontouchstart' in document.documentElement`, `show` adds `mouseover` `noop` on each `document.body` child and `hide` removes it (`node_modules/bootstrap/js/src/tooltip.js:223-227`, `node_modules/bootstrap/js/src/tooltip.js:256-260`). The host supplies `ontouchstart`. `toggle` calls `_leave` when the tip has `show`, and `_enter` otherwise (`node_modules/bootstrap/js/src/tooltip.js:158-168`).

The waited element is the tip (`node_modules/bootstrap/js/src/tooltip.js:239`, `node_modules/bootstrap/js/src/tooltip.js:281`). `_isAnimated` is `animation` or class `fade` on the tip (`node_modules/bootstrap/js/src/tooltip.js:365-367`). `_enter` and `_leave` call `setTimeout` for `delay.show` and `delay.hide`; `_setTimeout` clears the previous id (`node_modules/bootstrap/js/src/tooltip.js:501-533`). `_isHovered` starts `null` (`node_modules/bootstrap/js/src/tooltip.js:116`). The shown callback calls `_leave` when `_isHovered === false`, then sets `_isHovered` false (`node_modules/bootstrap/js/src/tooltip.js:229-236`).

`hide.bs.modal` on the closest `.modal` calls `hide` (`node_modules/bootstrap/js/src/tooltip.js:477-483`). The tip is a `TemplateFactory` (`node_modules/bootstrap/js/src/tooltip.js:334-347`).

A missing `Popper` throws `TypeError` `Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)` (`node_modules/bootstrap/js/src/tooltip.js:8`, `node_modules/bootstrap/js/src/tooltip.js:107-109`). `AttachmentMap` is `auto`, `top`, `bottom`, and RTL-swapped `right`/`left`, computed with `isRTL()` at module load (`node_modules/bootstrap/js/src/tooltip.js:50-56`, `node_modules/bootstrap/js/src/util/index.js:206`). Modifiers are `flip`, `offset`, `preventOverflow`, `arrow` with `.tooltip-arrow`, and `preSetPlacement` (`phase` `beforeMain`), which sets `data-popper-placement` (`node_modules/bootstrap/js/src/tooltip.js:397-435`). `popperConfig` is spread after that object (`node_modules/bootstrap/js/src/tooltip.js:438-441`). `createPopper` receives the trigger, the tip, and that config (`node_modules/bootstrap/js/src/tooltip.js:373-376`).

### Popover

`NAME` is `popover`, so the data key is `bs.popover` and events use `.bs.popover` (`node_modules/bootstrap/js/src/popover.js:15`, `node_modules/bootstrap/js/src/popover.js:42`, `node_modules/bootstrap/js/src/base-component.js:73-83`). The template is `div.popover` with `role="tooltip"`, `.popover-arrow`, `h3.popover-header`, and `div.popover-body` (`node_modules/bootstrap/js/src/popover.js:25-29`). The generated class is `bs-popover-auto` and the arrow selector is `.popover-arrow` (`node_modules/bootstrap/js/src/tooltip.js:313`, `node_modules/bootstrap/js/src/tooltip.js:422`). `.bs-popover-auto[data-popper-placement^=top]`, `right`, `bottom`, and `left` position `.popover-arrow` (`node_modules/bootstrap/dist/css/bootstrap.css:5910-5982`). `.popover` is `display: block` (`node_modules/bootstrap/dist/css/bootstrap.css:5872-5873`).

`Default` copies `Tooltip.Default`, then sets `content` `''`, `offset` `[0, 8]`, `placement` `'right'`, the popover template, and `trigger` `'click'` (`node_modules/bootstrap/js/src/popover.js:20-31`). `DefaultType` copies `Tooltip.DefaultType` and sets `content` to `(null|string|element|function)` (`node_modules/bootstrap/js/src/popover.js:33-36`). The inherited `_configAfterMerge` stringifies a numeric `content` (`node_modules/bootstrap/js/src/tooltip.js:572-574`). The content map is `.popover-header` from `_getTitle` and `.popover-body` from `_getContent` (`node_modules/bootstrap/js/src/popover.js:17-18`, `node_modules/bootstrap/js/src/popover.js:62-71`). `_isWithContent` is true when either value is truthy (`node_modules/bootstrap/js/src/popover.js:57-59`). An empty slot is removed by `TemplateFactory` (`node_modules/bootstrap/js/src/util/template-factory.js:123-125`).

`show`, `hide`, `toggle`, `dispose`, `setContent`, `enable`, `disable`, `toggleEnabled`, and `update` are Tooltip's methods (`node_modules/bootstrap/js/src/popover.js:42`, `node_modules/bootstrap/js/src/tooltip.js:146-288`). Event names are `show.bs.popover`, `inserted.bs.popover`, `shown.bs.popover`, `hide.bs.popover`, and `hidden.bs.popover` through `eventName` (`node_modules/bootstrap/js/src/tooltip.js:193`, `node_modules/bootstrap/js/src/base-component.js:81-83`). The default `click` trigger follows Tooltip's click listener (`node_modules/bootstrap/js/src/popover.js:30`, `node_modules/bootstrap/js/src/tooltip.js:448-453`). The tip wait, `delay` timers, and `_isHovered` guard are Tooltip's (`node_modules/bootstrap/js/src/tooltip.js:239`, `node_modules/bootstrap/js/src/tooltip.js:501-533`). The modal listener and `TemplateFactory` are Tooltip's (`node_modules/bootstrap/js/src/tooltip.js:477-483`, `node_modules/bootstrap/js/src/tooltip.js:334-347`). Popper creation is Tooltip's, with popover's `placement`, `offset`, and `.popover-arrow` (`node_modules/bootstrap/js/src/tooltip.js:373-435`, `node_modules/bootstrap/js/src/popover.js:23-29`). jQuery throws the same `TypeError` and the method name is `popover` (`node_modules/bootstrap/js/src/popover.js:74-87`, `node_modules/bootstrap/js/src/popover.js:95`).

## Tab

`NAME` is `tab`, the data key is `bs.tab`, and the event namespace is `.bs.tab` (`node_modules/bootstrap/js/src/tab.js:17-19`).

### Markup hooks

The markup hooks are:

| Hook | Value |
| --- | --- |
| Toggles | `[data-bs-toggle="tab"]`, `[data-bs-toggle="pill"]`, `[data-bs-toggle="list"]` (`node_modules/bootstrap/js/src/tab.js:48`, `node_modules/bootstrap/js/src/tab.js:289`) |
| Parent | `closest('.list-group, .nav, [role="tablist"]')` (`node_modules/bootstrap/js/src/tab.js:45`, `node_modules/bootstrap/js/src/tab.js:60`) |
| Children | `.nav-link`, `.list-group-item`, and `[role="tab"]`, each with `:not(.dropdown-toggle)`, plus the three toggles, searched inside the parent (`node_modules/bootstrap/js/src/tab.js:41-49`, `node_modules/bootstrap/js/src/tab.js:179-181`) |
| Outer | `closest('.nav-item, .list-group-item')`, or the element itself (`node_modules/bootstrap/js/src/tab.js:46`, `node_modules/bootstrap/js/src/tab.js:263-265`) |
| Panel | `getElementFromSelector`: `data-bs-target`, then `href` (`node_modules/bootstrap/js/src/tab.js:111`, `node_modules/bootstrap/js/src/dom/selector-engine.js:10-32`, `node_modules/bootstrap/js/src/dom/selector-engine.js:113-116`) |
| Active | Class `active` (`node_modules/bootstrap/js/src/tab.js:36`, `node_modules/bootstrap/js/src/tab.js:253-255`) |
| Fade | Class `fade` on the element passed to `_activate` or `_deactivate` (`node_modules/bootstrap/js/src/tab.js:37`, `node_modules/bootstrap/js/src/tab.js:127`, `node_modules/bootstrap/js/src/tab.js:152`) |
| Dropdown | Outer class `dropdown`; inner `.dropdown-toggle` and `.dropdown-menu` (`node_modules/bootstrap/js/src/tab.js:39-42`, `node_modules/bootstrap/js/src/tab.js:229-244`) |
| Tags | `A` and `AREA` on the toggle (`node_modules/bootstrap/js/src/tab.js:290-292`) |

The constructor returns when the parent closest is missing (`node_modules/bootstrap/js/src/tab.js:62-65`). `.nav-tabs .nav-link.active` and `.nav-tabs .nav-item.show .nav-link` set the active tab face (`node_modules/bootstrap/dist/css/bootstrap.css:3860-3865`). `.nav-pills .nav-link.active` and `.nav-pills .show > .nav-link` set the pill face (`node_modules/bootstrap/dist/css/bootstrap.css:3880-3884`). `.list-group-item.active` sets the active list face (`node_modules/bootstrap/dist/css/bootstrap.css:5049-5054`). `.tab-content > .tab-pane` is `display: none`; `.tab-content > .active` is `display: block` (`node_modules/bootstrap/dist/css/bootstrap.css:3925-3929`). `.fade:not(.show)` sets `opacity: 0` (`node_modules/bootstrap/dist/css/bootstrap.css:3350-3352`). `.dropdown-menu.show` is `display: block` (`node_modules/bootstrap/dist/css/bootstrap.css:3662-3664`).

### Options

Tab declares no `Default` and no `DefaultType` (`node_modules/bootstrap/js/src/tab.js:57-77`). The constructor calls `super(element)` (`node_modules/bootstrap/js/src/tab.js:59`). The inherited `Default` and `DefaultType` are `{}`, and the inherited `_configAfterMerge` returns its object (`node_modules/bootstrap/js/src/util/config.js:17-23`, `node_modules/bootstrap/js/src/util/config.js:36-38`). `show` does not read `_config` (`node_modules/bootstrap/js/src/tab.js:80-101`).

### DOM writes

When a parent exists, construction sets attributes that are absent: `role` `tablist` on the parent (`node_modules/bootstrap/js/src/tab.js:187-188`); on each inner child, `aria-selected` from class `active`, `role` `tab`, and `tabindex` `-1` when that child lacks `active` (`node_modules/bootstrap/js/src/tab.js:195-209`); `role` `presentation` on an outer element that differs from the inner (`node_modules/bootstrap/js/src/tab.js:201-203`); on the panel, `role` `tabpanel` and, when the child has an `id`, `aria-labelledby` (`node_modules/bootstrap/js/src/tab.js:215-226`). `_setAttributeIfNotExists` writes only when the attribute is absent (`node_modules/bootstrap/js/src/tab.js:247-250`). `aria-selected` is written with `setAttribute` on every child (`node_modules/bootstrap/js/src/tab.js:199`).

`show` returns when the element has `active` (`node_modules/bootstrap/js/src/tab.js:81-84`). After the events are accepted, `_deactivate` then `_activate` run (`node_modules/bootstrap/js/src/tab.js:99-100`).

`_deactivate` removes `active` and calls `blur`, then does the same for `getElementFromSelector` (`node_modules/bootstrap/js/src/tab.js:130-138`). Its callback, when `role` is not `tab`, removes `show` (`node_modules/bootstrap/js/src/tab.js:141-143`). When `role` is `tab`, it sets `aria-selected` false, sets `tabindex` `-1`, and closes the dropdown (`node_modules/bootstrap/js/src/tab.js:146-149`).

`_activate` adds `active`, then does the same for the selector target (`node_modules/bootstrap/js/src/tab.js:109-111`). Its callback, when `role` is not `tab`, adds `show` (`node_modules/bootstrap/js/src/tab.js:114-116`). When `role` is `tab`, it removes `tabindex`, sets `aria-selected` true, and opens the dropdown (`node_modules/bootstrap/js/src/tab.js:119-121`).

`_toggleDropDown` returns unless the outer element has class `dropdown` (`node_modules/bootstrap/js/src/tab.js:229-233`). It toggles `active` on `.dropdown-toggle` and `show` on `.dropdown-menu`, and sets `aria-expanded` to the boolean (`node_modules/bootstrap/js/src/tab.js:235-244`). `dispose` removes `.bs.tab` listeners (`node_modules/bootstrap/js/src/base-component.js:39-41`).

### Events

The names are `hide.bs.tab`, `hidden.bs.tab`, `show.bs.tab`, `shown.bs.tab`, `click.bs.tab`, `keydown.bs.tab`, and `load.bs.tab` (`node_modules/bootstrap/js/src/tab.js:21-27`). `trigger` makes the triggered events `cancelable: true` (`node_modules/bootstrap/js/src/dom/event-handler.js:282`).

| Path | Order |
| --- | --- |
| `show` | When an active child exists, `hide` fires on it with `{ relatedTarget: incoming }` (`node_modules/bootstrap/js/src/tab.js:89-91`). `show` fires on the incoming element with `{ relatedTarget: active }` (`node_modules/bootstrap/js/src/tab.js:93`). `defaultPrevented` on `show`, or on `hide` when that event exists, returns before the class writes (`node_modules/bootstrap/js/src/tab.js:95-97`) |
| Tab callback | `shown` fires on the activated element when its `role` is `tab`, with `{ relatedTarget }` (`node_modules/bootstrap/js/src/tab.js:119-124`). `hidden` fires on the deactivated element when its `role` is `tab` (`node_modules/bootstrap/js/src/tab.js:146-149`) |
| Panel callback | A `role` other than `tab` adds or removes `show` and returns before those events (`node_modules/bootstrap/js/src/tab.js:114-117`, `node_modules/bootstrap/js/src/tab.js:141-144`) |
| Data API | `click.bs.tab` on `document` for the three toggles. `A` and `AREA` call `preventDefault`. `isDisabled` returns. Otherwise `show()` (`node_modules/bootstrap/js/src/tab.js:289-298`, `node_modules/bootstrap/js/src/util/index.js:126-139`) |
| Load | `load.bs.tab` on `window` calls `getOrCreateInstance` for each `.active` toggle (`node_modules/bootstrap/js/src/tab.js:51`, `node_modules/bootstrap/js/src/tab.js:304-307`) |

jQuery calls `getOrCreateInstance`, returns when `config` is not a string, throws `TypeError` `` `No method named "${config}"` `` when the property is `undefined`, the name starts with `_`, or the name is `constructor`, and otherwise calls `data[config]()` (`node_modules/bootstrap/js/src/tab.js:268-280`). The jQuery name is `tab` (`node_modules/bootstrap/js/src/tab.js:17`, `node_modules/bootstrap/js/src/tab.js:313`, `node_modules/bootstrap/js/src/util/index.js:213-216`).

### Keyboard, pointer, and focus

`keydown.bs.tab` sits on the instance element (`node_modules/bootstrap/js/src/tab.js:26`, `node_modules/bootstrap/js/src/tab.js:71`). The keys are `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `Home`, and `End` (`node_modules/bootstrap/js/src/tab.js:29-34`, `node_modules/bootstrap/js/src/tab.js:156-158`). The handler calls `stopPropagation` and `preventDefault` (`node_modules/bootstrap/js/src/tab.js:160-161`). `Home` uses `children[0]` and `End` uses `children[children.length - 1]` after dropping disabled children (`node_modules/bootstrap/js/src/tab.js:163-167`). `ArrowRight` and `ArrowDown` pass `true` to `getNextActiveElement`; `ArrowLeft` and `ArrowUp` pass `false`; the cycle argument is `true` (`node_modules/bootstrap/js/src/tab.js:169-170`, `node_modules/bootstrap/js/src/util/index.js:267-283`). The chosen element receives `focus({ preventScroll: true })` and `show()` (`node_modules/bootstrap/js/src/tab.js:173-175`). The click listener is delegated, so it uses the capture phase (`node_modules/bootstrap/js/src/tab.js:289`, `node_modules/bootstrap/js/src/dom/event-handler.js:184`). `_deactivate` calls `blur` (`node_modules/bootstrap/js/src/tab.js:136`).

### Timing

Each `_activate` and `_deactivate` queues its callback on that same element, with the wait enabled when the element has class `fade` (`node_modules/bootstrap/js/src/tab.js:127`, `node_modules/bootstrap/js/src/tab.js:152`, `node_modules/bootstrap/js/src/base-component.js:49-51`). The wait is `transitionend` on that element, or the emulated event after the computed duration plus `5` (`node_modules/bootstrap/js/src/util/index.js:229-255`). The host supplies the computed strings. A missing `fade` class runs the callback immediately (`node_modules/bootstrap/js/src/util/index.js:229-233`). `show` returns when class `active` is already present (`node_modules/bootstrap/js/src/tab.js:82-84`).

### Cross-plugin coupling

The panel target comes from `SelectorEngine.getElementFromSelector` (`node_modules/bootstrap/js/src/tab.js:111`, `node_modules/bootstrap/js/src/tab.js:138`). An outer `.dropdown` gets `.dropdown-toggle` and `.dropdown-menu` class toggles (`node_modules/bootstrap/js/src/tab.js:229-243`). Keyboard movement uses `getNextActiveElement` and `isDisabled` (`node_modules/bootstrap/js/src/tab.js:163-170`).

### Popper

The imports are `BaseComponent`, `EventHandler`, `SelectorEngine`, `defineJQueryPlugin`, `getNextActiveElement`, and `isDisabled` (`node_modules/bootstrap/js/src/tab.js:8-11`).

## Toast

`NAME` is `toast`, the data key is `bs.toast`, and the event namespace is `.bs.toast` (`node_modules/bootstrap/js/src/toast.js:17-19`).

### Markup hooks

The markup hooks are:

| Hook | Value |
| --- | --- |
| Dismiss | `[data-bs-dismiss="toast"]` (`node_modules/bootstrap/js/src/util/component-functions.js:13-16`, `node_modules/bootstrap/js/src/toast.js:216`) |
| Dismiss target | `getElementFromSelector`, else `closest('.toast')` (`node_modules/bootstrap/js/src/util/component-functions.js:25`, `node_modules/bootstrap/js/src/dom/selector-engine.js:113-116`) |
| Shown test | Class `show` (`node_modules/bootstrap/js/src/toast.js:32`, `node_modules/bootstrap/js/src/toast.js:133-135`) |
| Animation class | `fade`, added when `animation` is true (`node_modules/bootstrap/js/src/toast.js:30`, `node_modules/bootstrap/js/src/toast.js:84-86`) |
| Transition classes | `showing` is added for `show` and `hide`; `hide` is removed in `show` and added in the hide completion (`node_modules/bootstrap/js/src/toast.js:31-33`, `node_modules/bootstrap/js/src/toast.js:95`, `node_modules/bootstrap/js/src/toast.js:97`, `node_modules/bootstrap/js/src/toast.js:114-119`) |
| Tags | `A` and `AREA` on the dismiss control (`node_modules/bootstrap/js/src/util/component-functions.js:17-19`) |

The source comment marks class `hide` as deprecated (`node_modules/bootstrap/js/src/toast.js:31`). `.toast.showing` sets `opacity: 0` (`node_modules/bootstrap/dist/css/bootstrap.css:5413-5415`). `.toast:not(.show)` sets `display: none` (`node_modules/bootstrap/dist/css/bootstrap.css:5416-5418`). `.fade` sets `transition: opacity 0.15s linear`, and `prefers-reduced-motion: reduce` sets `transition: none` (`node_modules/bootstrap/dist/css/bootstrap.css:3342-3348`). `.fade:not(.show)` sets `opacity: 0` (`node_modules/bootstrap/dist/css/bootstrap.css:3350-3352`).

### Options

The option keys are:

| Key | Default | DefaultType | `data-bs-*` | Effect |
| --- | --- | --- | --- | --- |
| `animation` | `true` | `boolean` | `data-bs-animation` | A true value adds `fade` and is the third argument of both queues (`node_modules/bootstrap/js/src/toast.js:36`, `node_modules/bootstrap/js/src/toast.js:42`, `node_modules/bootstrap/js/src/toast.js:84-86`, `node_modules/bootstrap/js/src/toast.js:99`, `node_modules/bootstrap/js/src/toast.js:120`) |
| `autohide` | `true` | `boolean` | `data-bs-autohide` | A true value allows the hide timer after `shown` (`node_modules/bootstrap/js/src/toast.js:37`, `node_modules/bootstrap/js/src/toast.js:43`, `node_modules/bootstrap/js/src/toast.js:138-141`) |
| `delay` | `5000` | `number` | `data-bs-delay` | The `setTimeout` delay passed to `hide` (`node_modules/bootstrap/js/src/toast.js:38`, `node_modules/bootstrap/js/src/toast.js:44`, `node_modules/bootstrap/js/src/toast.js:147-149`) |

Toast declares no `_configAfterMerge`. Construction uses the shared merge, and the inherited method returns its object (`node_modules/bootstrap/js/src/base-component.js:53-57`, `node_modules/bootstrap/js/src/util/config.js:36-48`).

### DOM writes

`show`, after the event is accepted, clears the timer (`node_modules/bootstrap/js/src/toast.js:82`). When `animation` is true it adds `fade` (`node_modules/bootstrap/js/src/toast.js:84-86`). It then removes `hide`, calls `reflow`, and adds `show` and `showing` (`node_modules/bootstrap/js/src/toast.js:95-97`, `node_modules/bootstrap/js/src/util/index.js:175-177`). The completion removes `showing` (`node_modules/bootstrap/js/src/toast.js:88-89`).

`hide` returns when class `show` is absent (`node_modules/bootstrap/js/src/toast.js:102-105`). After the event is accepted it adds `showing` (`node_modules/bootstrap/js/src/toast.js:119`). The completion adds `hide` and removes `showing` and `show` (`node_modules/bootstrap/js/src/toast.js:113-115`).

`dispose` clears the timer, removes `show` when that class is present, and runs the base `dispose` (`node_modules/bootstrap/js/src/toast.js:123-130`, `node_modules/bootstrap/js/src/base-component.js:39-45`). `show` and `hide` set no attribute and call no `focus` (`node_modules/bootstrap/js/src/toast.js:75-121`).

### Events

The names are `show.bs.toast`, `shown.bs.toast`, `hide.bs.toast`, and `hidden.bs.toast` (`node_modules/bootstrap/js/src/toast.js:25-28`). `trigger` makes them `cancelable: true` and copies no extra properties (`node_modules/bootstrap/js/src/dom/event-handler.js:282`, `node_modules/bootstrap/js/src/toast.js:76`, `node_modules/bootstrap/js/src/toast.js:90`, `node_modules/bootstrap/js/src/toast.js:107`, `node_modules/bootstrap/js/src/toast.js:116`).

| Path | Order |
| --- | --- |
| `show` | `show` fires before the class writes (`node_modules/bootstrap/js/src/toast.js:76-80`). `defaultPrevented` returns before the timer clear (`node_modules/bootstrap/js/src/toast.js:78-82`). `shown` fires after `showing` is removed, then `_maybeScheduleHide` runs (`node_modules/bootstrap/js/src/toast.js:88-92`) |
| `hide` | `hide` fires before `showing` is added (`node_modules/bootstrap/js/src/toast.js:107-119`). `defaultPrevented` returns before that class (`node_modules/bootstrap/js/src/toast.js:109-119`). `hidden` fires after `show` is removed (`node_modules/bootstrap/js/src/toast.js:113-116`) |
| Dismiss | `click.dismiss.bs.toast` on `document` calls `hide` (`node_modules/bootstrap/js/src/util/component-functions.js:13-29`, `node_modules/bootstrap/js/src/toast.js:216`) |

`A` and `AREA` call `preventDefault`, and the handler then continues unless `isDisabled` returns (`node_modules/bootstrap/js/src/util/component-functions.js:17-29`). jQuery calls `getOrCreateInstance`, and when `config` is a string throws `TypeError` `` `No method named "${config}"` `` when the property is `undefined`, otherwise `data[config](this)` (`node_modules/bootstrap/js/src/toast.js:197-206`). The jQuery name is `toast` (`node_modules/bootstrap/js/src/toast.js:17`, `node_modules/bootstrap/js/src/toast.js:222`, `node_modules/bootstrap/js/src/util/index.js:213-216`).

### Keyboard, pointer, and focus

The interaction listeners sit on the toast: `mouseover.bs.toast`, `mouseout.bs.toast`, `focusin.bs.toast`, and `focusout.bs.toast` (`node_modules/bootstrap/js/src/toast.js:21-24`, `node_modules/bootstrap/js/src/toast.js:184-189`). `mouseover` and `focusin` pass `true`; `mouseout` and `focusout` pass `false` (`node_modules/bootstrap/js/src/toast.js:185-188`). A true interaction sets `_hasMouseInteraction` or `_hasKeyboardInteraction` and clears the timer (`node_modules/bootstrap/js/src/toast.js:152-173`). A false interaction clears that flag, then returns when `relatedTarget` is the toast or sits inside it, and otherwise calls `_maybeScheduleHide` (`node_modules/bootstrap/js/src/toast.js:176-181`). The dismiss click listener is delegated, so it uses the capture phase (`node_modules/bootstrap/js/src/util/component-functions.js:16`, `node_modules/bootstrap/js/src/dom/event-handler.js:184`).

### Timing

Both queues pass `this._config.animation` and wait on the toast element (`node_modules/bootstrap/js/src/toast.js:99`, `node_modules/bootstrap/js/src/toast.js:120`, `node_modules/bootstrap/js/src/base-component.js:49-51`). The wait is `transitionend` on that element, or the emulated event after the computed duration plus `5` (`node_modules/bootstrap/js/src/util/index.js:229-255`). The host supplies the computed strings. A false `animation` runs the callback immediately (`node_modules/bootstrap/js/src/util/index.js:229-233`). `_maybeScheduleHide` returns when `autohide` is false or either interaction flag is true (`node_modules/bootstrap/js/src/toast.js:138-145`). Otherwise `_timeout` is `setTimeout` of `hide` after `delay` (`node_modules/bootstrap/js/src/toast.js:147-149`). `_clearTimeout` calls `clearTimeout` and sets `_timeout` to `null` (`node_modules/bootstrap/js/src/toast.js:191-194`). The fields start `null`, `false`, and `false` (`node_modules/bootstrap/js/src/toast.js:55-57`). The `reflow` site is `show`, before `show` and `showing` are added (`node_modules/bootstrap/js/src/toast.js:96-97`).

### Cross-plugin coupling

Dismiss uses `enableDismissTrigger`, also called for Alert, Modal, and Offcanvas (`node_modules/bootstrap/js/src/toast.js:216`, `node_modules/bootstrap/js/src/alert.js:79`, `node_modules/bootstrap/js/src/modal.js:370`, `node_modules/bootstrap/js/src/offcanvas.js:274`).

### Popper

The imports are `BaseComponent`, `EventHandler`, `enableDismissTrigger`, `defineJQueryPlugin`, and `reflow` (`node_modules/bootstrap/js/src/toast.js:8-11`).

## Carousel

`NAME` is `carousel`, the data key is `bs.carousel`, and the event namespace is `.bs.carousel` (`node_modules/bootstrap/js/src/carousel.js:26-28`).

### Markup hooks

The markup hooks are:

| Hook | Value |
| --- | --- |
| Controls | `[data-bs-slide], [data-bs-slide-to]` (`node_modules/bootstrap/js/src/carousel.js:62`, `node_modules/bootstrap/js/src/carousel.js:432`) |
| Ride | `[data-bs-ride="carousel"]` (`node_modules/bootstrap/js/src/carousel.js:63`, `node_modules/bootstrap/js/src/carousel.js:460-464`) |
| Target | `getElementFromSelector` on the control, and the target must have class `carousel` (`node_modules/bootstrap/js/src/carousel.js:433-436`, `node_modules/bootstrap/js/src/dom/selector-engine.js:113-116`) |
| Items | `.carousel-item`; the active item is `.active.carousel-item` (`node_modules/bootstrap/js/src/carousel.js:57-59`, `node_modules/bootstrap/js/src/carousel.js:376-382`) |
| Indicators | `.carousel-indicators`, then `[data-bs-slide-to="${index}"]` inside it (`node_modules/bootstrap/js/src/carousel.js:61`, `node_modules/bootstrap/js/src/carousel.js:102`, `node_modules/bootstrap/js/src/carousel.js:280`) |
| Item interval | `data-bs-interval` on the active item (`node_modules/bootstrap/js/src/carousel.js:295`) |
| Images | `.carousel-item img` (`node_modules/bootstrap/js/src/carousel.js:60`, `node_modules/bootstrap/js/src/carousel.js:220`) |
| Animated | Class `slide` on the carousel (`node_modules/bootstrap/js/src/carousel.js:51`, `node_modules/bootstrap/js/src/carousel.js:372-374`) |
| Direction | `isRTL()` at the call (`node_modules/bootstrap/js/src/carousel.js:391-404`, `node_modules/bootstrap/js/src/util/index.js:206`) |

`.carousel-item` is `display: none` with `transition: transform 0.6s ease-in-out`; `prefers-reduced-motion: reduce` sets `transition: none` (`node_modules/bootstrap/dist/css/bootstrap.css:6026-6039`). `.carousel-item.active`, `.carousel-item-next`, and `.carousel-item-prev` are `display: block` (`node_modules/bootstrap/dist/css/bootstrap.css:6042-6046`). `.carousel-item-next:not(.carousel-item-start)` and `.active.carousel-item-end` use `translateX(100%)` (`node_modules/bootstrap/dist/css/bootstrap.css:6048-6051`). `.carousel-item-prev:not(.carousel-item-end)` and `.active.carousel-item-start` use `translateX(-100%)` (`node_modules/bootstrap/dist/css/bootstrap.css:6053-6056`). With `.carousel-fade`, those classes switch to opacity (`node_modules/bootstrap/dist/css/bootstrap.css:6058-6073`). `.carousel.pointer-event` sets `touch-action: pan-y` (`node_modules/bootstrap/dist/css/bootstrap.css:6011-6013`).

### Options

The option keys are:

| Key | Default | DefaultType | `data-bs-*` | Effect |
| --- | --- | --- | --- | --- |
| `interval` | `5000` | `(number\|boolean)` | `data-bs-interval` | `cycle` passes it to `setInterval`. `_configAfterMerge` copies it to `defaultInterval` (`node_modules/bootstrap/js/src/carousel.js:71`, `node_modules/bootstrap/js/src/carousel.js:80`, `node_modules/bootstrap/js/src/carousel.js:153`, `node_modules/bootstrap/js/src/carousel.js:199-201`) |
| `keyboard` | `true` | `boolean` | `data-bs-keyboard` | A true value listens for `keydown` on the carousel (`node_modules/bootstrap/js/src/carousel.js:72`, `node_modules/bootstrap/js/src/carousel.js:205-207`) |
| `pause` | `'hover'` | `(string\|boolean)` | `data-bs-pause` | `'hover'` listens for `mouseenter` and `mouseleave`, and the swipe end path pauses (`node_modules/bootstrap/js/src/carousel.js:73`, `node_modules/bootstrap/js/src/carousel.js:209-212`, `node_modules/bootstrap/js/src/carousel.js:225-227`) |
| `ride` | `false` | `(boolean\|string)` | `data-bs-ride` | The string `'carousel'` calls `cycle` from the constructor. Any truthy value makes `_maybeEnableCycle` call `cycle` (`node_modules/bootstrap/js/src/carousel.js:49`, `node_modules/bootstrap/js/src/carousel.js:74`, `node_modules/bootstrap/js/src/carousel.js:105-107`, `node_modules/bootstrap/js/src/carousel.js:156-166`) |
| `touch` | `true` | `boolean` | `data-bs-touch` | With `Swipe.isSupported()`, touch listeners are added (`node_modules/bootstrap/js/src/carousel.js:75`, `node_modules/bootstrap/js/src/carousel.js:214-216`, `node_modules/bootstrap/js/src/util/swipe.js:141-143`) |
| `wrap` | `true` | `boolean` | `data-bs-wrap` | The cycle flag of `getNextActiveElement` (`node_modules/bootstrap/js/src/carousel.js:76`, `node_modules/bootstrap/js/src/carousel.js:307`) |

`_updateInterval` sets `interval` from `parseInt(data-bs-interval, 10)` on `_activeElement` or the active item, and uses `defaultInterval` when that value is falsy (`node_modules/bootstrap/js/src/carousel.js:288-297`). The host supplies `ontouchstart` and `maxTouchPoints` for `Swipe.isSupported` (`node_modules/bootstrap/js/src/util/swipe.js:141-143`).

### DOM writes

`next` slides `'next'`. `prev` slides `'prev'` (`node_modules/bootstrap/js/src/carousel.js:35-36`, `node_modules/bootstrap/js/src/carousel.js:124-126`, `node_modules/bootstrap/js/src/carousel.js:137-139`). `to` returns when `index` is below `0` or above `items.length - 1`, defers on `slid` while `_isSliding` is true, and returns when the index is already active (`node_modules/bootstrap/js/src/carousel.js:169-183`).

`_slide`, after `slide` is accepted and both items exist, calls `pause`, sets `_isSliding` true, and updates the indicator (`node_modules/bootstrap/js/src/carousel.js:336-341`). The indicator loses `active` and `aria-current`; the `[data-bs-slide-to]` match gains `active` and `aria-current="true"` (`node_modules/bootstrap/js/src/carousel.js:270-285`). For `'next'`, the incoming item gets `carousel-item-next` and both items get `carousel-item-start`. For `'prev'`, those classes are `carousel-item-prev` and `carousel-item-end` (`node_modules/bootstrap/js/src/carousel.js:344-352`). `reflow` runs on the incoming item between those adds (`node_modules/bootstrap/js/src/carousel.js:349`, `node_modules/bootstrap/js/src/util/index.js:175-177`). The completion removes the directional and order classes, adds `active` to the incoming item, removes `active` from the outgoing item, and sets `_isSliding` false (`node_modules/bootstrap/js/src/carousel.js:354-360`).

`pause` calls `triggerTransitionEnd` on the carousel when `_isSliding` is true, then clears `_interval` (`node_modules/bootstrap/js/src/carousel.js:141-146`, `node_modules/bootstrap/js/src/util/index.js:70-72`). The slide listener is on the outgoing item and ignores a `transitionend` whose `target` is not that item (`node_modules/bootstrap/js/src/carousel.js:365`, `node_modules/bootstrap/js/src/util/index.js:240-243`). `cycle` clears the interval, updates it, and calls `setInterval` (`node_modules/bootstrap/js/src/carousel.js:149-153`). `dispose` disposes the `Swipe` when one exists, then the base `dispose` (`node_modules/bootstrap/js/src/carousel.js:190-195`, `node_modules/bootstrap/js/src/base-component.js:39-45`).

### Events

`slide.bs.carousel` fires before the class writes. `slid.bs.carousel` fires in the completion (`node_modules/bootstrap/js/src/carousel.js:40-41`, `node_modules/bootstrap/js/src/carousel.js:315-324`, `node_modules/bootstrap/js/src/carousel.js:362`). Both carry `relatedTarget` (the incoming item), `direction`, `from`, and `to` (`node_modules/bootstrap/js/src/carousel.js:315-322`). `direction` is `_orderToDirection`: `'next'` is `'left'` in LTR and `'right'` in RTL; `'prev'` is the other value (`node_modules/bootstrap/js/src/carousel.js:399-404`). `defaultPrevented` on `slide` returns before `pause` (`node_modules/bootstrap/js/src/carousel.js:326-336`). The empty-item return is after that event (`node_modules/bootstrap/js/src/carousel.js:324-333`). `trigger` makes them `cancelable: true` (`node_modules/bootstrap/js/src/dom/event-handler.js:282`).

`click.bs.carousel.data-api` calls `preventDefault` when the target has class `carousel`. A `data-bs-slide-to` attribute calls `to` then `_maybeEnableCycle`. `data-bs-slide` equal to `'next'` calls `next`; otherwise the handler calls `prev` (`node_modules/bootstrap/js/src/carousel.js:47`, `node_modules/bootstrap/js/src/carousel.js:432-457`, `node_modules/bootstrap/js/src/dom/manipulator.js:66-68`). `load.bs.carousel.data-api` constructs each ride carousel (`node_modules/bootstrap/js/src/carousel.js:46`, `node_modules/bootstrap/js/src/carousel.js:460-464`). While `_isSliding` is true, `_maybeEnableCycle` waits for one `slid` (`node_modules/bootstrap/js/src/carousel.js:161-163`). `to` does the same (`node_modules/bootstrap/js/src/carousel.js:175-177`).

jQuery calls `to` when `config` is a number. A string throws `TypeError` `` `No method named "${config}"` `` when the property is `undefined`, the name starts with `_`, or the name is `constructor` (`node_modules/bootstrap/js/src/carousel.js:408-422`). The jQuery name is `carousel` (`node_modules/bootstrap/js/src/carousel.js:26`, `node_modules/bootstrap/js/src/carousel.js:472`, `node_modules/bootstrap/js/src/util/index.js:213-216`).

### Keyboard, pointer, and focus

`keydown.bs.carousel` sits on the carousel. `input` and `textarea` return (`node_modules/bootstrap/js/src/carousel.js:42`, `node_modules/bootstrap/js/src/carousel.js:254-257`). `ArrowLeft` maps to `'right'` and `ArrowRight` maps to `'left'`; a mapped key calls `preventDefault` and slides `_directionToOrder` (`node_modules/bootstrap/js/src/carousel.js:31-32`, `node_modules/bootstrap/js/src/carousel.js:65-68`, `node_modules/bootstrap/js/src/carousel.js:259-262`, `node_modules/bootstrap/js/src/carousel.js:391-396`). In LTR, `'left'` is `'next'` and `'right'` is `'prev'` (`node_modules/bootstrap/js/src/carousel.js:395`).

`mouseenter` calls `pause` and `mouseleave` calls `_maybeEnableCycle` when `pause` is `'hover'` (`node_modules/bootstrap/js/src/carousel.js:43-44`, `node_modules/bootstrap/js/src/carousel.js:209-212`). Each item image calls `preventDefault` on `dragstart` (`node_modules/bootstrap/js/src/carousel.js:45`, `node_modules/bootstrap/js/src/carousel.js:220-222`). The `Swipe` left callback slides `_directionToOrder('left')` and the right callback slides `_directionToOrder('right')` (`node_modules/bootstrap/js/src/carousel.js:245-248`). A swipe below `40` does not call those callbacks (`node_modules/bootstrap/js/src/util/swipe.js:26`, `node_modules/bootstrap/js/src/util/swipe.js:105-110`). The end callback, when `pause` is `'hover'`, calls `pause` and sets `touchTimeout` to `setTimeout` of `_maybeEnableCycle` after `500` plus `interval` (`node_modules/bootstrap/js/src/carousel.js:33`, `node_modules/bootstrap/js/src/carousel.js:224-242`). `nextWhenVisible` calls `next` when `document.hidden` is false and `isVisible` is true (`node_modules/bootstrap/js/src/carousel.js:128-134`, `node_modules/bootstrap/js/src/util/index.js:99-104`).

### Timing

The queued element is the outgoing item, and the flag is class `slide` on the carousel (`node_modules/bootstrap/js/src/carousel.js:365`, `node_modules/bootstrap/js/src/carousel.js:372-374`). The wait is `transitionend` on that item, or the emulated event after the computed duration plus `5` (`node_modules/bootstrap/js/src/util/index.js:229-255`). The host supplies the computed strings. `_isSliding` starts `false`, is set `true` before the classes, and is cleared in the completion before `slid` (`node_modules/bootstrap/js/src/carousel.js:98`, `node_modules/bootstrap/js/src/carousel.js:301-303`, `node_modules/bootstrap/js/src/carousel.js:339`, `node_modules/bootstrap/js/src/carousel.js:360-362`). When an interval was running, `cycle` starts again in the same `_slide` call, after the callback is queued (`node_modules/bootstrap/js/src/carousel.js:336-369`). The `reflow` site is the incoming item (`node_modules/bootstrap/js/src/carousel.js:349`).

### Cross-plugin coupling

Touch uses `Swipe` (`node_modules/bootstrap/js/src/carousel.js:20`, `node_modules/bootstrap/js/src/carousel.js:251`). Item choice uses `getNextActiveElement` (`node_modules/bootstrap/js/src/carousel.js:307`). Visibility uses `isVisible` (`node_modules/bootstrap/js/src/carousel.js:132`).

### Popper

The imports are `BaseComponent`, `EventHandler`, `Manipulator`, `SelectorEngine`, `defineJQueryPlugin`, `getNextActiveElement`, `isRTL`, `isVisible`, `reflow`, `triggerTransitionEnd`, and `Swipe` (`node_modules/bootstrap/js/src/carousel.js:8-20`).

## Scrollspy

`NAME` is `scrollspy`, the data key is `bs.scrollspy`, and the event namespace is `.bs.scrollspy` (`node_modules/bootstrap/js/src/scrollspy.js:19-21`).

### Markup hooks

The markup hooks are:

| Hook | Value |
| --- | --- |
| Spy | `[data-bs-spy="scroll"]` on the scroll element (`node_modules/bootstrap/js/src/scrollspy.js:31`, `node_modules/bootstrap/js/src/scrollspy.js:284-287`) |
| Target | Config `target`, the wrapper whose `[href]` links are read (`node_modules/bootstrap/js/src/scrollspy.js:32`, `node_modules/bootstrap/js/src/scrollspy.js:45`, `node_modules/bootstrap/js/src/scrollspy.js:205`) |
| Section | `findOne(decodeURI(anchor.hash), spyElement)` (`node_modules/bootstrap/js/src/scrollspy.js:213`) |
| Link map | Key `decodeURI(anchor.hash)` (`node_modules/bootstrap/js/src/scrollspy.js:217`) |
| Section map | Key `anchor.hash` (`node_modules/bootstrap/js/src/scrollspy.js:218`) |
| Observer lookup | `` `#${entry.target.id}` `` in the link map (`node_modules/bootstrap/js/src/scrollspy.js:164`) |
| Parents | `.nav` and `.list-group` (`node_modules/bootstrap/js/src/scrollspy.js:33`, `node_modules/bootstrap/js/src/scrollspy.js:244`) |
| Previous links | `.nav-link`, `.nav-item > .nav-link`, and `.list-group-item` (`node_modules/bootstrap/js/src/scrollspy.js:34-37`, `node_modules/bootstrap/js/src/scrollspy.js:247`) |
| Dropdown | Class `dropdown-item` on the link; `.dropdown-toggle` inside `closest('.dropdown')` (`node_modules/bootstrap/js/src/scrollspy.js:28`, `node_modules/bootstrap/js/src/scrollspy.js:38-39`, `node_modules/bootstrap/js/src/scrollspy.js:238-241`) |
| Skip | An anchor with no `hash`, or `isDisabled`, or a section that fails `isVisible` (`node_modules/bootstrap/js/src/scrollspy.js:209-216`, `node_modules/bootstrap/js/src/util/index.js:99-123`, `node_modules/bootstrap/js/src/util/index.js:126-139`) |

`.nav-tabs .nav-link.active` and `.nav-pills .nav-link.active` set the active link face (`node_modules/bootstrap/dist/css/bootstrap.css:3860-3865`, `node_modules/bootstrap/dist/css/bootstrap.css:3880-3884`). `.navbar-nav .nav-link.active` sets the navbar active color (`node_modules/bootstrap/dist/css/bootstrap.css:3998-4000`). `.list-group-item.active` sets the active list face (`node_modules/bootstrap/dist/css/bootstrap.css:5049-5054`). `.dropdown-item.active` sets the active dropdown-item face (`node_modules/bootstrap/dist/css/bootstrap.css:3651-3655`).

### Options

The option keys are:

| Key | Default | DefaultType | `data-bs-*` | Effect |
| --- | --- | --- | --- | --- |
| `offset` | `null` | `(number\|null)` | `data-bs-offset` | A truthy value replaces `rootMargin` with `` `${offset}px 0px -30%` `` (`node_modules/bootstrap/js/src/scrollspy.js:42`, `node_modules/bootstrap/js/src/scrollspy.js:50`, `node_modules/bootstrap/js/src/scrollspy.js:118`) |
| `rootMargin` | `'0px 0px -25%'` | `string` | `data-bs-root-margin` | Passed to the observer (`node_modules/bootstrap/js/src/scrollspy.js:43`, `node_modules/bootstrap/js/src/scrollspy.js:156`) |
| `smoothScroll` | `false` | `boolean` | `data-bs-smooth-scroll` | A true value binds the click scroller (`node_modules/bootstrap/js/src/scrollspy.js:44`, `node_modules/bootstrap/js/src/scrollspy.js:127-135`) |
| `target` | `null` | `element` | `data-bs-target` | `_configAfterMerge` sets `getElement(target)` or `document.body` (`node_modules/bootstrap/js/src/scrollspy.js:45`, `node_modules/bootstrap/js/src/scrollspy.js:54`, `node_modules/bootstrap/js/src/scrollspy.js:115`) |
| `threshold` | `[0.1, 0.5, 1]` | `array` | `data-bs-threshold` | A string becomes `split(',')` and `parseFloat` (`node_modules/bootstrap/js/src/scrollspy.js:46`, `node_modules/bootstrap/js/src/scrollspy.js:120-122`) |

That rewrite runs after the merge and before the type check (`node_modules/bootstrap/js/src/base-component.js:53-57`, `node_modules/bootstrap/js/src/scrollspy.js:113-124`). The observer root is the spy element when its computed `overflowY` is not `'visible'`, and `null` when it is (`node_modules/bootstrap/js/src/scrollspy.js:68`). The host supplies that value.

### DOM writes

`refresh` rebuilds the maps, rebinds smooth scroll, and observes each section (`node_modules/bootstrap/js/src/scrollspy.js:92-104`). `_process` returns when `target` is already `_activeTarget` (`node_modules/bootstrap/js/src/scrollspy.js:223-226`). Otherwise it clears `active` on `target` and on every `[href].active` inside it, sets `_activeTarget`, and adds `active` to the link (`node_modules/bootstrap/js/src/scrollspy.js:228-231`, `node_modules/bootstrap/js/src/scrollspy.js:253-259`). A `dropdown-item` also adds `active` to the `.dropdown-toggle` and returns (`node_modules/bootstrap/js/src/scrollspy.js:238-242`). Each `.nav` or `.list-group` ancestor adds `active` to the nearest previous link from `SelectorEngine.prev` (`node_modules/bootstrap/js/src/scrollspy.js:244-249`, `node_modules/bootstrap/js/src/dom/selector-engine.js:60-71`). An entry that is not intersecting sets `_activeTarget` to `null` and clears `active` on that link (`node_modules/bootstrap/js/src/scrollspy.js:175-178`).

Smooth scroll calls `preventDefault`, then `scrollTo({ top, behavior: 'smooth' })` on `_rootElement` or `window`. The `top` value is `section.offsetTop - spy.offsetTop`. When `scrollTo` is missing, it assigns `scrollTop` (`node_modules/bootstrap/js/src/scrollspy.js:136-148`). `dispose` calls `observer.disconnect()` and the base `dispose` (`node_modules/bootstrap/js/src/scrollspy.js:107-109`, `node_modules/bootstrap/js/src/base-component.js:39-45`).

### Events

`activate.bs.scrollspy` fires on the spy element with `{ relatedTarget: link }` after the `active` class is added (`node_modules/bootstrap/js/src/scrollspy.js:24`, `node_modules/bootstrap/js/src/scrollspy.js:233`). `trigger` makes it `cancelable: true` (`node_modules/bootstrap/js/src/dom/event-handler.js:282`). The method does not read `defaultPrevented`. `click.bs.scrollspy` is the smooth-scroll listener; `preventDefault` runs when `event.target.hash` is in the section map (`node_modules/bootstrap/js/src/scrollspy.js:25`, `node_modules/bootstrap/js/src/scrollspy.js:135-138`). `load.bs.scrollspy.data-api` on `window` constructs each spy (`node_modules/bootstrap/js/src/scrollspy.js:26`, `node_modules/bootstrap/js/src/scrollspy.js:284-287`).

jQuery calls `getOrCreateInstance`, returns when `config` is not a string, throws `TypeError` `` `No method named "${config}"` `` when the property is `undefined`, the name starts with `_`, or the name is `constructor`, and otherwise calls `data[config]()` (`node_modules/bootstrap/js/src/scrollspy.js:263-274`). The jQuery name is `scrollspy` (`node_modules/bootstrap/js/src/scrollspy.js:19`, `node_modules/bootstrap/js/src/scrollspy.js:294`, `node_modules/bootstrap/js/src/util/index.js:213-216`).

### Keyboard, pointer, and focus

The smooth-scroll listener is delegated `click` on `target` for `[href]`, so it uses the capture phase (`node_modules/bootstrap/js/src/scrollspy.js:132-135`, `node_modules/bootstrap/js/src/dom/event-handler.js:184`). `refresh` calls `EventHandler.off` for `click.bs.scrollspy` before binding it again (`node_modules/bootstrap/js/src/scrollspy.js:133-135`).

### Timing

The observer is an `IntersectionObserver` with `root`, `rootMargin`, and `threshold` (`node_modules/bootstrap/js/src/scrollspy.js:152-159`). `refresh` disconnects an existing observer before observing again (`node_modules/bootstrap/js/src/scrollspy.js:96-104`). Scroll direction compares the current `scrollTop` of `_rootElement` or `document.documentElement` with `_previousScrollData.parentScrollTop` (`node_modules/bootstrap/js/src/scrollspy.js:71-74`, `node_modules/bootstrap/js/src/scrollspy.js:170-172`). Downward movement activates an intersecting entry whose `offsetTop` is greater than or equal to `visibleEntryTop`, and a `parentScrollTop` of `0` returns from the callback (`node_modules/bootstrap/js/src/scrollspy.js:182-190`). Upward movement activates an intersecting entry whose `offsetTop` is lower than `visibleEntryTop` (`node_modules/bootstrap/js/src/scrollspy.js:194-197`). `activate` stores that `offsetTop` before `_process` (`node_modules/bootstrap/js/src/scrollspy.js:165-167`).

### Cross-plugin coupling

Parent activation reads `.dropdown`, `.dropdown-toggle`, `.nav`, `.list-group`, and the link selectors (`node_modules/bootstrap/js/src/scrollspy.js:33-39`, `node_modules/bootstrap/js/src/scrollspy.js:236-249`). Section visibility uses `isVisible`, and anchors use `isDisabled` (`node_modules/bootstrap/js/src/scrollspy.js:209-216`).

### Popper

The imports are `BaseComponent`, `EventHandler`, `SelectorEngine`, `defineJQueryPlugin`, `getElement`, `isDisabled`, and `isVisible` (`node_modules/bootstrap/js/src/scrollspy.js:8-13`).

## Cross-plugin table

Each component that calls `defineJQueryPlugin` has one row. A `no` cell cites the import list or the data-api block that contains the registrations.

| Plugin | Data API selectors | Load init | Popper | Backdrop | Focus trap | Scrollbar | Transition | Module-load listeners | jQuery |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
## Cross-plugin table

Each record names the data-api selectors, whether load creates instances, Popper, backdrop, focus trap, scrollbar compensation, the transition gate, the document and window listeners registered at module load, and the jQuery name.

**Alert.** Selector `[data-bs-dismiss="alert"]` (`node_modules/bootstrap/js/src/util/component-functions.js:16`, `node_modules/bootstrap/js/src/alert.js:79`). Load: no. Popper, backdrop, focus trap, and scrollbar: no (`node_modules/bootstrap/js/src/alert.js:8-11`). Transition: yes, the alert element when it has `fade` (`node_modules/bootstrap/js/src/alert.js:46-47`). Module load: document `click.dismiss.bs.alert`. jQuery `alert` (`node_modules/bootstrap/js/src/alert.js:17`, `node_modules/bootstrap/js/src/alert.js:85`).

**Button.** Selector `[data-bs-toggle="button"]` (`node_modules/bootstrap/js/src/button.js:22`, `node_modules/bootstrap/js/src/button.js:57`). Load: no. Popper, backdrop, focus trap, and scrollbar: no (`node_modules/bootstrap/js/src/button.js:8-10`). Transition: no (`node_modules/bootstrap/js/src/button.js:36-38`). Module load: document `click.bs.button.data-api`. jQuery `button` (`node_modules/bootstrap/js/src/button.js:16`, `node_modules/bootstrap/js/src/button.js:70`).

**Collapse.** Selector `[data-bs-toggle="collapse"]` (`node_modules/bootstrap/js/src/collapse.js:43`, `node_modules/bootstrap/js/src/collapse.js:280`). Load: no. Popper, backdrop, focus trap, and scrollbar: no (`node_modules/bootstrap/js/src/collapse.js:8-15`). Transition: yes, the collapse element, with the queued flag `true` (`node_modules/bootstrap/js/src/collapse.js:162`, `node_modules/bootstrap/js/src/collapse.js:204`). Module load: document `click.bs.collapse.data-api`. jQuery `collapse` (`node_modules/bootstrap/js/src/collapse.js:21`, `node_modules/bootstrap/js/src/collapse.js:295`).

**Dropdown.** Selector `[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)` (`node_modules/bootstrap/js/src/dropdown.js:55`, `node_modules/bootstrap/js/src/dropdown.js:444`). Load: no. Popper: yes, `preventOverflow` and `offset`; inside `.navbar` or with `display` `static`, the modifier is `applyStyles` with `enabled: false` (`node_modules/bootstrap/js/src/dropdown.js:298-318`). Backdrop, focus trap, and scrollbar: no (`node_modules/bootstrap/js/src/dropdown.js:8-23`). Transition: no; `shown` follows the class writes in the same call (`node_modules/bootstrap/js/src/dropdown.js:154-156`). Module load, all on `document`: `keydown.bs.dropdown.data-api` on the toggle and on `.dropdown-menu`, `click.bs.dropdown.data-api` for `clearMenus` and for the toggle, and `keyup.bs.dropdown.data-api` for `clearMenus` (`node_modules/bootstrap/js/src/dropdown.js:440-446`). jQuery `dropdown` (`node_modules/bootstrap/js/src/dropdown.js:29`, `node_modules/bootstrap/js/src/dropdown.js:453`).

**Modal.** Selectors `[data-bs-toggle="modal"]` and `[data-bs-dismiss="modal"]` (`node_modules/bootstrap/js/src/modal.js:48`, `node_modules/bootstrap/js/src/modal.js:339`, `node_modules/bootstrap/js/src/modal.js:370`). Load: no. Popper: no (`node_modules/bootstrap/js/src/modal.js:8-17`). Backdrop: yes (`node_modules/bootstrap/js/src/modal.js:158-162`). Focus trap: yes, activated when `focus` is truthy (`node_modules/bootstrap/js/src/modal.js:165-168`, `node_modules/bootstrap/js/src/modal.js:193-195`). Scrollbar: yes, `ScrollBarHelper.hide` during `show` (`node_modules/bootstrap/js/src/modal.js:114`). Transition: yes when the modal has `fade`; `show` waits on `.modal-dialog` and `hide` waits on the modal (`node_modules/bootstrap/js/src/modal.js:140`, `node_modules/bootstrap/js/src/modal.js:203`, `node_modules/bootstrap/js/src/modal.js:260-262`). Module load: document `click.bs.modal.data-api` and document `click.dismiss.bs.modal` (`node_modules/bootstrap/js/src/util/component-functions.js:16`). The `resize` listener is added per instance (`node_modules/bootstrap/js/src/modal.js:220`). jQuery `modal` (`node_modules/bootstrap/js/src/modal.js:23`, `node_modules/bootstrap/js/src/modal.js:376`).

**Offcanvas.** Selectors `[data-bs-toggle="offcanvas"]` and `[data-bs-dismiss="offcanvas"]` (`node_modules/bootstrap/js/src/offcanvas.js:47`, `node_modules/bootstrap/js/src/offcanvas.js:232`, `node_modules/bootstrap/js/src/offcanvas.js:274`). Load: yes, `window` `load.bs.offcanvas.data-api` calls `show` on each `.offcanvas.show` (`node_modules/bootstrap/js/src/offcanvas.js:260-263`). Popper: no (`node_modules/bootstrap/js/src/offcanvas.js:8-19`). Backdrop: yes (`node_modules/bootstrap/js/src/offcanvas.js:180-186`). Focus trap: yes, activated when `scroll` is false or `backdrop` is truthy (`node_modules/bootstrap/js/src/offcanvas.js:116-118`, `node_modules/bootstrap/js/src/offcanvas.js:189-192`). Scrollbar: yes when `scroll` is false (`node_modules/bootstrap/js/src/offcanvas.js:107-109`). Transition: yes, the offcanvas element, with the queued flag `true` (`node_modules/bootstrap/js/src/offcanvas.js:125`, `node_modules/bootstrap/js/src/offcanvas.js:157`). Module load: document `click.bs.offcanvas.data-api`, document `click.dismiss.bs.offcanvas`, window `load.bs.offcanvas.data-api`, and window `resize.bs.offcanvas` (`node_modules/bootstrap/js/src/offcanvas.js:232`, `node_modules/bootstrap/js/src/offcanvas.js:260`, `node_modules/bootstrap/js/src/offcanvas.js:266`). jQuery `offcanvas` (`node_modules/bootstrap/js/src/offcanvas.js:25`, `node_modules/bootstrap/js/src/offcanvas.js:280`).

**Tooltip.** No document data-api selector. The constructor binds `click`, `hover`, or `focus` from `trigger` (`node_modules/bootstrap/js/src/tooltip.js:125`, `node_modules/bootstrap/js/src/tooltip.js:445-474`). Load: no. Popper: yes, `flip`, `offset`, `preventOverflow`, `arrow` (`.tooltip-arrow`), and `preSetPlacement` (`node_modules/bootstrap/js/src/tooltip.js:400-434`). Backdrop, focus trap, and scrollbar: no (`node_modules/bootstrap/js/src/tooltip.js:8-16`). Transition: yes, the tip (`node_modules/bootstrap/js/src/tooltip.js:239`, `node_modules/bootstrap/js/src/tooltip.js:281`). Module load: no document or window component listener (`node_modules/bootstrap/js/src/tooltip.js:627-631`). jQuery `tooltip` (`node_modules/bootstrap/js/src/tooltip.js:22`, `node_modules/bootstrap/js/src/tooltip.js:631`).

**Popover.** Same listener pattern as Tooltip (`node_modules/bootstrap/js/src/popover.js:42`). Load: no. Popper: yes, Tooltip's modifier list, with the arrow selector `.popover-arrow` (`node_modules/bootstrap/js/src/tooltip.js:422`, `node_modules/bootstrap/js/src/popover.js:15`). Backdrop, focus trap, and scrollbar: no (`node_modules/bootstrap/js/src/popover.js:8-9`). Transition: yes, the tip, through Tooltip's queue (`node_modules/bootstrap/js/src/tooltip.js:239`). Module load: no document or window component listener (`node_modules/bootstrap/js/src/popover.js:91-95`). jQuery `popover` (`node_modules/bootstrap/js/src/popover.js:15`, `node_modules/bootstrap/js/src/popover.js:95`).

**Tab.** Selectors `[data-bs-toggle="tab"]`, `[data-bs-toggle="pill"]`, and `[data-bs-toggle="list"]` (`node_modules/bootstrap/js/src/tab.js:48`, `node_modules/bootstrap/js/src/tab.js:289`). Load: yes, `window` `load.bs.tab` calls `getOrCreateInstance` on each `.active` toggle (`node_modules/bootstrap/js/src/tab.js:51`, `node_modules/bootstrap/js/src/tab.js:304-307`). Popper, backdrop, focus trap, and scrollbar: no (`node_modules/bootstrap/js/src/tab.js:8-11`). Transition: yes, the element passed to `_activate` or `_deactivate`, when that element has `fade` (`node_modules/bootstrap/js/src/tab.js:127`, `node_modules/bootstrap/js/src/tab.js:152`). Module load: document `click.bs.tab` and window `load.bs.tab` (`node_modules/bootstrap/js/src/tab.js:25-27`). jQuery `tab` (`node_modules/bootstrap/js/src/tab.js:17`, `node_modules/bootstrap/js/src/tab.js:313`).

**Toast.** Selector `[data-bs-dismiss="toast"]` (`node_modules/bootstrap/js/src/toast.js:216`, `node_modules/bootstrap/js/src/util/component-functions.js:16`). Load: no. Popper, backdrop, focus trap, and scrollbar: no (`node_modules/bootstrap/js/src/toast.js:8-11`). Transition: yes, the toast element, when `animation` is true (`node_modules/bootstrap/js/src/toast.js:99`, `node_modules/bootstrap/js/src/toast.js:120`). Module load: document `click.dismiss.bs.toast`. jQuery `toast` (`node_modules/bootstrap/js/src/toast.js:17`, `node_modules/bootstrap/js/src/toast.js:222`).

**Carousel.** Selectors `[data-bs-slide]` and `[data-bs-slide-to]` (`node_modules/bootstrap/js/src/carousel.js:62`, `node_modules/bootstrap/js/src/carousel.js:432`). Load: yes, `window` `load.bs.carousel.data-api` constructs each `[data-bs-ride="carousel"]`, and the constructor calls `cycle` when `ride === 'carousel'` (`node_modules/bootstrap/js/src/carousel.js:105-107`, `node_modules/bootstrap/js/src/carousel.js:460-464`). Popper, backdrop, focus trap, and scrollbar: no (`node_modules/bootstrap/js/src/carousel.js:8-20`). Transition: yes, the outgoing item, when the carousel has class `slide` (`node_modules/bootstrap/js/src/carousel.js:365`, `node_modules/bootstrap/js/src/carousel.js:372-374`). Module load: document `click.bs.carousel.data-api` and window `load.bs.carousel.data-api` (`node_modules/bootstrap/js/src/carousel.js:46-47`). jQuery `carousel` (`node_modules/bootstrap/js/src/carousel.js:26`, `node_modules/bootstrap/js/src/carousel.js:472`).

**Scrollspy.** Selector `[data-bs-spy="scroll"]` (`node_modules/bootstrap/js/src/scrollspy.js:31`, `node_modules/bootstrap/js/src/scrollspy.js:284-287`). `refresh` binds `[href]` on `target` for smooth scroll (`node_modules/bootstrap/js/src/scrollspy.js:132-135`). Load: yes, that `load` handler calls `getOrCreateInstance`, and the constructor calls `refresh` (`node_modules/bootstrap/js/src/scrollspy.js:75`). Popper, backdrop, focus trap, and scrollbar: no (`node_modules/bootstrap/js/src/scrollspy.js:8-13`). Transition: no; activation comes from an `IntersectionObserver` (`node_modules/bootstrap/js/src/scrollspy.js:152-159`). Module load: window `load.bs.scrollspy.data-api`. jQuery `scrollspy` (`node_modules/bootstrap/js/src/scrollspy.js:19`, `node_modules/bootstrap/js/src/scrollspy.js:294`).
