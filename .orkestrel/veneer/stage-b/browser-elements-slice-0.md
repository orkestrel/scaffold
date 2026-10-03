I'll read the brief and follow it exactly, then return only the document it specifies.The brief makes this session’s first message SLICE 0. I’ll read the writing rules, the guides, and the shared browser sources before drafting it.The convention sections are in the guides. Next I’ll read the shared helpers, constants, and option types those conventions rest on.Citations have to match the checker’s path form. I’ll confirm that form, then write SLICE 0.## Conventions

### Factory ownership

The `create*` factory is the whole logic, and the adapter is plumbing (`guides/composables.md:142`). The factory owns the DOM listeners, the attribute lifecycle, the ARIA wiring, the event emission, and the `destroy` method (`guides/composables.md:138`).

### Reactivity

The factory's Vue import is the `@vue/reactivity` package (`guides/composables.md:97`, `src/browser/factories/createDialog.ts:2`). Returned state is a `readonly` ref: the caller reads it, and the factory writes it (`src/browser/factories/createDialog.ts:188`, `guides/composables.md:383`). Construction opens an `effectScope` scope, and the `destroy` method calls `stop` on that scope (`src/browser/factories/createDialog.ts:42`, `src/browser/factories/createDialog.ts:172`). A plain-JS engine takes the readonly-state idea and the `effectScope` disposal idea. The `@vue/reactivity` package stays an elements dependency. The theme factory imports the `readonly` wrapper alone; its `destroy` method drops per-caller listeners, and the shared theme state survives (`src/browser/factories/createTheme.ts:2`, `src/browser/factories/createTheme.ts:21`).

### Option shape

Public option keys are single words (`guides/composables.md:3`). Related keys share one object.

The `dismiss` object carries `backdrop` and `escape` on a dialog, and `backdrop` accepts `true`, `false`, or `'static'` (`src/browser/types.ts:1444`). On a popover it carries `outside` and `escape` (`src/browser/types.ts:1376`). On a tooltip it carries `escape` (`src/browser/types.ts:1578`). On a menu it carries `outside`, `escape`, and `inside` (`src/browser/types.ts:1639`). The `delay` object carries `show` and `hide` (`src/browser/types.ts:1372`). The `trigger` object carries `hover`, `focus`, and `click` (`src/browser/types.ts:1367`). The `scroll` object carries `lock` (`src/browser/types.ts:1449`). The `autoplay` object carries `interval`, `pause`, and `ride` (`src/browser/types.ts:2179`). The `intersection` object carries `offset`, `margin`, and `threshold` (`src/browser/types.ts:2136`). The same grouping appears as `submit` and `validate` on a form (`src/browser/types.ts:2251`) and as `autohide` and `swipe` on a toast (`src/browser/types.ts:1819`, `src/browser/types.ts:1830`).

The `on` option is a partial map of event hooks (`src/browser/types.ts:1380`). The `bindEventMap` function listens for each key that map shares with the factory's event-name map and returns a single teardown (`src/browser/helpers.ts:1553`, `src/browser/helpers.ts:1558`). An absent `on` map yields an empty teardown (`src/browser/helpers.ts:1563`).

The `initial` option seeds mount state. It is a boolean on details, on an alert, and on tabs (`src/browser/types.ts:1487`, `src/browser/types.ts:2044`, `src/browser/types.ts:2092`). It is a theme setting on the theme factory (`src/browser/types.ts:1285`). It is a focus target, an element or a function, on the focus factory (`src/browser/types.ts:1979`).

### Instance shape

An open/close instance returns readonly state plus the `show` method, the `hide` method, the `toggle` method, and the `destroy` method (`src/browser/types.ts:1456`). A floating instance adds the `update` method (`src/browser/types.ts:1390`). The nav instance returns `active` state and the `refresh` method (`src/browser/types.ts:2146`). State names differ by factory: the `visible` ref on a dialog (`src/browser/types.ts:1457`), the `active` ref on a button (`src/browser/types.ts:2014`), and the `index` ref and the `cycling` ref on a carousel (`src/browser/types.ts:2191`). Each of those is a `readonly` ref.

Calling the `destroy` method twice is safe, and the `assertCleanDispose` check is the factory-test assertion that listeners, observers, and timers reverse (`guides/composables.md:103`). The anatomy returns on the second call (`guides/composables.md:322`). The aside factory does the same (`src/browser/factories/createAside.ts:134`). The dialog factory guards listener removal and `scope.stop` with that flag, then still runs the release steps (`src/browser/factories/createDialog.ts:167`).

### Event model

Every name is `elements:{source}:{verb}`, dispatched as a `CustomEvent` on the bound element (`guides/composables.md:49`, `src/browser/events.ts:7`, `src/browser/helpers.ts:1508`). The `{source}` segment is the element name when the factory binds to one element, and the composable noun otherwise (`guides/composables.md:64`, `src/browser/constants.ts:29`). The maps in `constants.ts` are the authority (`src/browser/events.ts:30`).

The `dispatch` function builds a bubbling, cancelable event and returns false when a listener calls `preventDefault` (`src/browser/helpers.ts:1519`). The `show` verb and the `hide` verb use that function (`src/browser/events.ts:17`, `src/browser/factories/createDialog.ts:57`, `guides/composables.md:381`). The `emit` function builds a bubbling event with `cancelable` set false (`src/browser/helpers.ts:1530`). The informational verbs `open`, `close`, `place`, `prevent`, `activate`, and `deactivate` go through the `emit` function. The dialog factory emits `prevent` (`src/browser/factories/createDialog.ts:113`). The popover factory emits `place` on the anchor, and it dispatches `show` and `hide` on that same anchor (`src/browser/factories/createPopover.ts:192`, `src/browser/factories/createPopover.ts:220`). The nav factory emits `activate` (`src/browser/factories/createNav.ts:52`). The focus factory emits `activate` and `deactivate` (`src/browser/factories/createFocus.ts:76`, `src/browser/factories/createFocus.ts:84`). The aside factory also emits `show` and `hide`; its comment states those two are informational because native `beforetoggle` is not cancellable (`src/browser/factories/createAside.ts:26`).

The constants comment lists `show`, `hide`, `slide`, and `prevent` as names that honour `preventDefault` (`src/browser/constants.ts:369`). The `emit` function sets `cancelable` false, so a listener on the `prevent` verb cannot cancel that event (`src/browser/helpers.ts:1531`).

The comment pairs the core verbs this way (`src/browser/events.ts:16-28`). The `show` verb and the `hide` verb are cancellable and fire before the transition. The `open` verb and the `close` verb fire after it. The `start` verb and the `stop` verb bound a long-running operation. The `pause` verb and the `resume` verb suspend one. The `abort` verb cancels with a signal. The `destroy` verb tears the instance down. The `select` verb and the `deselect` verb change a selection. The `activate` verb advances a focus or scroll target. The `focus` verb and the `blur` verb mark a focus transition. The `change` verb and the `input` verb mark a data change. The `slide` verb and the `place` verb mark a positional transition. The `toggle` verb flips two states.

The parity registry's closed set is show, open, hide, close, prevent, start, stop, pause, resume, abort, destroy, toggle, select, deselect, clear, focus, blur, activate, deactivate, change, input, create, formdata, invalid, reset, submit, validate, dirty, slide, place, tap, over, enter, leave, drop, end, reorder, expand, collapse, move, sort, paginate, light, dark, system, and name (`guides/composables.md:100`). The four theme verbs name the post-transition state (`guides/composables.md:100`). Extending the set means editing `events.ts` and the parity test together (`guides/composables.md:62`).

### State attributes

Every framework data attribute is `data-{name}-{…}`, with `{name}` the factory stem and every segment in kebab-case (`guides/composables.md:68`). The guide numbers the kinds from 1 (`guides/composables.md:70`). Settled state uses an adjective, and an in-flight transition uses a gerund. The open marker `data-{name}-open` flips on at the start of the `show` method, and the closing marker `data-{name}-closing` flips on at the start of the `hide` method and stays through the close transition (`guides/composables.md:76`). Structural hooks and consumer opt-in markers use a noun role (`guides/composables.md:78`, `guides/composables.md:80`). Floating factories write resolved config such as `data-popover-side` (`guides/composables.md:83`).

The allow-list is the set of attributes without a factory stem. The guide names `data-theme`, `data-mode`, and `data-elements-scroll-locked` as framework-global, and `data-open`, `data-hidden`, `data-key`, `data-level`, `data-value`, and `data-id` as native or content generics (`guides/composables.md:86`, `guides/composables.md:87`). The contract also lists `data-no-select` on that generic allow-list (`guides/composables.md:104`).

The guide's closed-state rule is the `inert` attribute. Its claim is that `aria-hidden="true"` while a descendant still has focus produces a Chrome console warning, and that `inert` blurs descendants, removes them from the accessibility tree, and blocks pointer events (`guides/composables.md:252`). That sentence also claims the `createAside` factory uses `inert`. The factory comment says that auto-wiring was removed (`src/browser/factories/createAside.ts:43`). The alert factory sets `aria-hidden` after the close transition so the live region stops announcing (`src/browser/factories/createAlert.ts:77`, `guides/composables.md:415`). The Chrome warning is the guide's claim; the guide records no browser version and no measurement.

### Transition coordination

Three parties meet on open and close. The user-agent stylesheet supplies `display: none` for a closed popover, dialog, or details element. Author CSS paints and declares transitions. The factory flips attributes and calls the native API (`guides/composables.md:148`). A missed handoff leaves a closed element rendered at the wrong position (`guides/composables.md:152`).

The `runTransition` function runs its callback on `transitionend` when `event.target` is the element, and otherwise on a timeout (`src/browser/helpers.ts:1592`, `src/browser/helpers.ts:1607`). The `TRANSITION_FALLBACK_MS` constant is 400 (`src/browser/constants.ts:62`). The returned function cancels the callback (`src/browser/helpers.ts:1612`). The guide claims `hidePopover()` fires no `transitionend` when no transitioning property changes, so that timeout is what completes the close (`guides/composables.md:251`).

The `hasTransitionDuration` function reads computed `transition-duration` and returns true when any comma-separated entry is greater than 0 (`src/browser/helpers.ts:1634`). The popover factory emits `open` and `close` in the same turn when that reading is false, and waits on `runTransition` when it is true (`src/browser/factories/createPopover.ts:167`, `src/browser/factories/createPopover.ts:179`). The helper comment says this reading replaces a `.fade` class opt-in (`src/browser/helpers.ts:1624`).

The `waitForFrame` function resolves on the next animation frame, or on a timeout of 0 when `requestAnimationFrame` is absent (`src/browser/helpers.ts:1649`). Its comment says the wait keeps a `display` change and an attribute change from collapsing into one paint (`src/browser/helpers.ts:1646`). The alert factory forces that flush with a layout read, `void element.offsetHeight`, before it arms `runTransition` (`src/browser/factories/createAlert.ts:61`).

The popover surface sets `transition-behavior: allow-discrete` and transitions `opacity`, `transform`, `overlay`, and `display`, with `allow-discrete` on `overlay` and `display` (`guides/surfaces.md:67-71`, `guides/surfaces.md:72`). The guide's claim is that without `allow-discrete` the `display` flip skips the transition (`guides/surfaces.md:90`). The `@starting-style` block holds the from-state (`guides/surfaces.md:82`). The surfaces guide asserts that Chrome 148+ leaks a starting-style declaration into the normal cascade when specificities tie, and that the from-state selector sits one specificity step under the open-state selector: bare `[popover]` at (0, 1, 0) under `[popover]:popover-open` at (0, 2, 0) (`guides/surfaces.md:92`). The composables guide asserts the same Chrome 148+ leakage (`guides/composables.md:188`). Neither guide records a measurement.

The guide states four invariants for that lifecycle (`guides/composables.md:230`).

1. The bare element rule stays minimal: tokens, color, border, font size, and padding (`guides/composables.md:232`).
2. The open-state rule gates geometry on the `[data-{name}-open]` attribute together with the `[data-{name}-closing]` attribute, or on `:popover-open`, `:modal`, or `[open]` when the native lifecycle is the gate (`guides/composables.md:233`).
3. The `hide` method sets the closing attribute, and the `runTransition` callback leaves it set. The following `show` method removes it, and the `destroy` method removes it (`guides/composables.md:234`).
4. The `@starting-style` rule targets a selector one specificity step under the open-state rule (`guides/composables.md:235`).

The guide claims the discrete tail lasts ~150 ms after `hidePopover()` before `display: none` lands, and that removing the closing attribute in that window flashes the surface defaults (`guides/composables.md:175`). The aside row of the pattern table says the factory is a thin shim and writes no `[data-aside-*]` lifecycle attribute; `:popover-open` drives the slide (`guides/composables.md:241`). The factory comment matches that strip (`src/browser/factories/createAside.ts:37`) and claims the removed `runTransition` wait was ~400 ms of dead wait (`src/browser/factories/createAside.ts:40`). The redundancy section claims the strip dropped close latency from ~400 ms to ~73 ms (`guides/composables.md:389`). Those timings are the guide's claims and the comment's claims.

### Body-scroll lock

A module-level counter shares one lock across callers (`src/browser/helpers.ts:1660`). The first `lockBodyScroll` call saves `body.style.paddingRight`, sets `paddingRight` to the scrollbar width when `innerWidth` exceeds `clientWidth`, and sets the `data-elements-scroll-locked` attribute on `body` (`src/browser/helpers.ts:1676`, `src/browser/constants.ts:74`). The `unlockBodyScroll` function restores the saved padding and removes the attribute when the counter reaches 0, and a surplus unlock clamps the counter at 0 (`src/browser/helpers.ts:1686`). The dialog factory takes the lock for a non-modal dialog whose `scroll.lock` option is true; the comment states that `showModal` locks scroll on its own (`src/browser/factories/createDialog.ts:60`, `src/browser/factories/createDialog.ts:66`). The aside factory comment says the factory leaves body scroll lock to the caller (`src/browser/factories/createAside.ts:46`).

### Element gating

The `assertElement` function throws a `TypeError` when the host is null or its tag is outside the expected tag or tag list (`src/browser/helpers.ts:1471`). The message names the caller and the received tag (`src/browser/helpers.ts:1486`).

### Slice shape

This slice follows the brief's topic order: ownership, reactivity, options, instance, events, state attributes, transitions, scroll lock, then gating.

Later factory slices use the brief's factory order. Each factory opens with the host and the native mechanism, then the options, the instance, and the events, then the behaviors the brief names, in that order.

The platform-fact table uses the columns Fact, Citation, and Standing, in that order. Standing is measured or asserted. Rows follow the brief's fact order. The Bootstrap mapping table uses the columns Plugin, Factory, Native mechanism, Kept, Dropped, and Citation, in that order. Rows follow the brief's plugin order: alert, button, carousel, collapse, dropdown, modal, offcanvas, popover, scrollspy, tab, toast, tooltip.