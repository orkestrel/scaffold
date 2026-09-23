# J-ENGINE-TERRAIN — distillate (returned by `grok` on Cursor Grok 4.7, `grok-4.7-high`, read-only; retained verbatim from the journal's result event)

Journal: `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/j-engine-terrain.jsonl` (launch copy under `tmp/cursor/`); session id `70dd1223-fe3c-4bcd-ac51-3206c11e139a`; duration 447544 ms; is_error false.

---
I'll read the brief and follow it exactly, then return only the distillate it specifies.The brief is a read-only terrain distillate. I'll read the three reports and the governing sections first, then the Elements and Mailbox engines.The reports index the factories. Next I’ll read the shared helpers and each obligation’s factory so the distillate can cite the mechanisms themselves.Shared helpers differ in a few places. I’ll read each obligation factory next so the per-plugin rows cite the actual sequences.## A. Shared mechanisms

The `dispatch` helper is the same in Elements and Mailbox. The `emit` helper is the same. The `runTransition` helper is the same. `lockBodyScroll` differs. `createFocus` differs. `focusableItems` differs. `rove` is the same. `areaForPopoverPlacement` writes the same `position-area` strings. `resolvePopoverSide` is the same. `selfsForPopoverPlacement` and `hasTransitionDuration` are present in Elements only. `applyPopoverClasses` is present in Mailbox only.

No factory in either repository calls `getAnimations`, `transitioncancel`, or `animationend`. Every completion wait goes through `runTransition`, which listens for `transitionend` and also arms `setTimeout`. Some call sites skip that helper and emit immediately. Those sites are named in the `runTransition` row.

### Event dispatch

`dispatch` at `C:/Users/mikes/WebstormProjects/elements/src/browser/helpers.ts:1519` (`elements/src/browser/helpers.ts:1519`) and `C:/Users/mikes/WebstormProjects/mailbox/src/browser/helpers.ts:188` (`mailbox/src/browser/helpers.ts:188`).

The function builds `new CustomEvent(name, { bubbles: true, cancelable: true, detail })`, calls `dispatchEvent`, and returns `!event.defaultPrevented`. `detail` is typed `unknown`. A listener that calls `preventDefault()` makes the return value `false`, and each factory returns before it mutates the host. `emit` (`elements/src/browser/helpers.ts:1530`, `mailbox/src/browser/helpers.ts:199`) uses `bubbles: true` and `cancelable: false`, and returns nothing. Names follow `elements:{source}:{verb}` (`elements/src/browser/constants.ts:368`) or `mailbox:{source}:{verb}`. The pre-change names are `show`, `hide`, and `slide`. The completed names are `open`, `close`, and `change`. The comment at `elements/src/browser/helpers.ts:1508` says consumers cancel through `addEventListener`, the same pattern as `show.bs.modal`.

### Transition completion

`runTransition` at `elements/src/browser/helpers.ts:1592` and `mailbox/src/browser/helpers.ts:150`.

The function adds a `transitionend` listener. The listener calls `finish` only when `event.target === el`. `finish` removes that listener, clears the timer, and runs `callback` unless the returned cancel function has set `cancelled`. The timer is `setTimeout(finish, fallbackMs)` with `fallbackMs` defaulting to `TRANSITION_FALLBACK_MS`, which is `400` (`elements/src/browser/constants.ts:62`, `mailbox/src/browser/constants.ts:26`). Cancel sets `cancelled` and then calls `finish`, so a `destroy` that invokes the returned function drops the callback. The comment at `elements/src/browser/helpers.ts:1588` says the timeout exists in case the transition never fires.

`hasTransitionDuration` (`elements/src/browser/helpers.ts:1634`) reads `getComputedStyle(el).transitionDuration` and treats any comma-separated entry whose `parseFloat` is greater than `0` as a real transition. Mailbox has no twin. Elements `createPopover` and `createTooltip` call it and emit `open` or `close` immediately when it returns false (`elements/src/browser/factories/createPopover.ts:167`, `elements/src/browser/factories/createTooltip.ts:133`). Mailbox `createPopover` and `createTooltip` emit immediately when the panel lacks the class `fade` (`mailbox/src/browser/factories/createPopover.ts:183`, `mailbox/src/browser/factories/createTooltip.ts:133`). Mailbox `createTab` calls `runTransition` only when the pane has `fade` (`mailbox/src/browser/factories/createTab.ts:60`). Elements `createTabs` never calls it (`elements/src/browser/factories/createTabs.ts:21`). Elements `createAside` never calls it (`elements/src/browser/factories/createAside.ts:40`). `createDetails` in each repository never calls it. `createCollapse`, `createDialog`, `createModal`, `createOffcanvas`, `createAlert`, `createToast`, and `createCarousel` always call `runTransition`.

### Focus trap

`createFocus` at `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createFocus.ts:31` and `C:/Users/mikes/WebstormProjects/mailbox/src/browser/factories/createFocus.ts:31`.

Each factory queries `element.querySelectorAll(FOCUSABLE_SELECTOR)` and drops nodes that have a `disabled` attribute (`createFocus.ts:44`). The selector is the same string in `elements/src/browser/constants.ts:154` and `mailbox/src/browser/constants.ts:112`: `[autofocus]`, enabled `input`, `button`, `select`, `textarea`, `a[href]`, and `[tabindex]` other than `"-1"`. Construction installs one `document` `keydown` listener (`createFocus.ts:66`). While `active` is true and the key is `Tab`, Shift on the first item focuses the last, and Tab on the last focuses the first, each after `preventDefault`. Any other key returns. An empty list returns before wrap (`createFocus.ts:55`). `activate` stores `document.activeElement`, then focuses `options.initial` (element or function) or the first item (`createFocus.ts:68`). `options.restore` defaults to `true` (`elements/src/browser/types.ts:1982`). `deactivate` focuses `previousFocus` when it is an `HTMLElement`. Mailbox also requires `document.contains(previousFocus)` (`mailbox/src/browser/factories/createFocus.ts:81`). Elements emits `elements:focus:activate` and `elements:focus:deactivate` (`elements/src/browser/factories/createFocus.ts:76`). Mailbox emits neither. `destroy` removes the document listener and then calls `deactivate` (`createFocus.ts:88`). The comment at `createFocus.ts:23` says an empty host makes `activate()` a no-op. The function still sets `active` to true, and the Elements factory still emits.

Elements `isFocusable` (`elements/src/browser/helpers.ts:2170`) rejects a disabled form control, rejects `tabIndex < 0`, and accepts `input`, `textarea`, `select`, `button`, an `a` with `href`, any `tabindex`, or `isContentEditable`. `findFocusableElements` walks descendants with that predicate (`helpers.ts:2205`). `createFocus` does not call those functions. `focusableItems` in Elements filters with `isFocusable` (`helpers.ts:2252`). Mailbox `focusableItems` returns the raw `querySelectorAll` (`mailbox/src/browser/helpers.ts:882`). The Elements comment at `helpers.ts:2236` says a raw query returns the `li` before the `button`, and `.focus()` on the `li` is a silent no-op. `rove` (`elements/src/browser/helpers.ts:2266`, `mailbox/src/browser/helpers.ts:896`) maps `Home` to `0`, `End` to the last index, and `ArrowDown` or `ArrowUp` with wrap. An empty list returns `0`.

### Body scroll lock

`lockBodyScroll` at `elements/src/browser/helpers.ts:1672` and `mailbox/src/browser/helpers.ts:237`.

Each function increments a module counter. The first call saves `document.body.style.paddingRight`, and when `window.innerWidth - document.documentElement.clientWidth` is greater than `0` it writes that width as `paddingRight`. A later lock returns after the increment. `unlockBodyScroll` decrements and clamps at `0`, and restores `paddingRight` only at zero. Elements sets and removes the attribute `data-elements-scroll-locked` (`elements/src/browser/constants.ts:74`, `helpers.ts:1679`). Mailbox adds and removes the class `modal-open` (`mailbox/src/browser/helpers.ts:244`). Neither function writes `overflow`. The Elements comment at `helpers.ts:1657` says `useDialog` and `useAside` share the counter. `createAside` does not call the helper (`elements/src/browser/factories/createAside.ts:46`). The Mailbox comment at `helpers.ts:222` says `useModal` and `useOffcanvas` share it. `createModal` and `createOffcanvas` call it.

### Anchoring and placement

`areaForPopoverPlacement` at `elements/src/browser/helpers.ts:2116` and `mailbox/src/browser/helpers.ts:739`.

The map is `PLACEMENT_AREAS` (`elements/src/browser/constants.ts:662`, inlined at `mailbox/src/browser/helpers.ts:701`). `top` and `bottom` stay those keywords. `start` and `end` become `left` and `right`. Aligned values use `span-right`, `span-left`, `span-bottom`, or `span-top`. An unknown placement falls back to `bottom`. The comment at `elements/src/browser/constants.ts:660` says Chromium's `position-area` parser accepts only the physical keywords. Elements also writes `align-self` and `justify-self` from `PLACEMENT_SELFS` (`constants.ts:686`, `createPopover.ts:132`) and `dataset.popoverSide`, `dataset.popoverStrategy`, and `dataset.popoverOffset` (`createPopover.ts:135`). Mailbox `applyPopoverClasses` (`mailbox/src/browser/helpers.ts:801`) adds `{component}-native`, `{component}-{placement}`, `{component}-{strategy}`, and `{component}-offset-{n}`, and returns a remover. It does not write `position-area` inline. `resolvePopoverSide` (`elements/src/browser/helpers.ts:2132`, `mailbox/src/browser/helpers.ts:831`) compares `getBoundingClientRect` and returns `top`, `bottom`, `start`, `end`, or `bottom` when the boxes overlap. Popover and tooltip schedule that read on the next animation frame, and again on `document` `scroll` in the capture phase and on `window` `resize` (`elements/src/browser/factories/createPopover.ts:307`). Those listeners do not move the panel. They rewrite the resolved-side dataset or the side class.

### Ownership and restore

`createPopover` snapshots `anchor.style.anchorName`, `panel.style.positionAnchor`, `aria-haspopup`, `aria-controls`, `aria-expanded`, and `panel.id`, and `destroy` writes those back or removes them (`elements/src/browser/factories/createPopover.ts:270`, `:340`; `mailbox/src/browser/factories/createPopover.ts:37`, `:356`). `createMenu` snapshots `--set-menu-flip`, `maxBlockSize`, and `positionTryFallbacks` (`elements/src/browser/factories/createMenu.ts:72`) and restores them (`:183`). It then removes `aria-expanded` and `aria-haspopup` without a prior snapshot (`:188`). `createDropdown` snapshots `--bs-dropdown-flip`, `maxBlockSize`, `positionTryFallbacks`, and `aria-haspopup` (`mailbox/src/browser/factories/createDropdown.ts:59`) and restores them (`:174`). It then removes the class `show` and sets `aria-expanded` to `false` (`:183`). `createAside` snapshots `element.popover` and writes it back (`elements/src/browser/factories/createAside.ts:65`, `:140`). Mailbox `createAlert` snapshots `role` and restores it (`mailbox/src/browser/factories/createAlert.ts:30`, `:104`). Elements `createAlert` `destroy` removes `data-alert-open` and sets `aria-hidden` (`elements/src/browser/factories/createAlert.ts:101`). `createModal` and `createOffcanvas` `destroy` clear the class `show` and write the closed ARIA set. They do not restore the attributes found at construction (`mailbox/src/browser/factories/createModal.ts:255`). `createDetails` `destroy` removes listeners and leaves `[open]` (`elements/src/browser/factories/createDetails.ts:149`). `createFocus` snapshots focus at `activate`, not at construction.

### Delegation

`createFocus` listens on `document` for `keydown` until `destroy`. `createPopover` and `createTooltip` listen on `document` for `pointerdown`, `keydown`, and capture-phase `scroll`, and on `window` for `resize`, until `destroy` (`createPopover.ts:307`, `:330`). `createModal` and `createOffcanvas` listen on `document` for `keydown` until `destroy` (`mailbox/src/browser/factories/createModal.ts:221`, `createOffcanvas.ts:131`). No factory in this set installs a `MutationObserver` or drops a listener because the host left the tree. A removed host keeps the document listener until `destroy`.

### Reduced-motion reads

Mailbox `createCarousel` `start` returns without starting the interval when `matchMedia('(prefers-reduced-motion: reduce)')` matches (`mailbox/src/browser/factories/createCarousel.ts:179`). It reads the query again on each `start`. Mailbox `createDrag` skips edge autoscroll on the same query (`mailbox/src/browser/factories/createDrag.ts:321`). Elements `createCarousel` has no `matchMedia` call. `createCollapse`, `createDetails`, `createMenu`, `createDropdown`, `createTabs`, `createTab`, `createNav`, `createScrollSpy`, `createDialog`, `createModal`, `createAside`, `createOffcanvas`, `createTooltip`, `createPopover`, `createAlert`, and `createToast` do not read `prefers-reduced-motion`.

## B. Per obligation

### Collapse

Elements factory: `createDetails` (`elements/src/browser/factories/createDetails.ts:25`). Mailbox factory: `createCollapse` (`mailbox/src/browser/factories/createCollapse.ts:23`). Mailbox also has `createDetails` (`mailbox/src/browser/factories/createDetails.ts:25`), the same `<details>` pipeline with `mailbox:details:*` names.

Elements `show` returns when already open or when `dispatch` of `elements:details:show` is prevented, then sets `element.open`, sets `visible`, emits `deactivate` on open siblings inside `accordion`, and emits `open` (`createDetails.ts:86`). `hide` is the same shape with `hide` and `close` (`:95`). A summary click dispatches the same pre-change event and calls `preventDefault` on the click when that event is prevented (`:111`). The `toggle` event re-syncs `visible` when an outside write changes `open` (`:75`). There is no focus move and no scripted height. The comment says CSS may use `interpolate-size` and `transition: height` on `details::details-content` (`:12`). `destroy` unbinds and does not clear `[open]` (`:149`). Options: `initial` defaults to absent, `accordion` optional (`elements/src/browser/types.ts:1485`).

Mailbox `createCollapse` seeds `visible` from the class `show` (`createCollapse.ts:30`). `show` returns when visible, when `transitioning`, or when `mailbox:collapse:show` is prevented (`:42`). It emits `mailbox:collapse:deactivate` on `.collapse.show` siblings, removes `collapse` and `show`, adds `collapsing`, sets `height` to `0`, reads `offsetHeight`, sets `height` to `scrollHeight`, and waits with `runTransition` (`:52`). The callback removes `collapsing`, adds `collapse` and `show`, clears inline `height`, and emits `open` (`:60`). `hide` sets `height` to `scrollHeight`, forces reflow, adds `collapsing`, removes `collapse` and `show`, sets `height` to `0`, and on completion adds `collapse` and clears `height` (`:71`). A prevented `hide` returns before that write. `destroy` cancels the transition, removes `collapsing` and `show`, and clears `height` (`:104`, `mailbox/src/browser/constants.ts:33`). Options: `initial` default `false`, `accordion` optional (`mailbox/src/browser/types.ts:250`). No keyboard map. No `matchMedia`.

### Dropdown

Elements factory: `createMenu` (`elements/src/browser/factories/createMenu.ts:43`). Mailbox factory: `createDropdown` (`mailbox/src/browser/factories/createDropdown.ts:37`).

Each composes `createPopover` with `trigger: {}` so the popover does not bind its own click. The menu click calls `preventDefault` and `popover.toggle()` (`createMenu.ts:118`, `createDropdown.ts:114`). Popover `show` and `hide` hooks dispatch `elements:menu:show` or `mailbox:dropdown:show`, and `hide`, and call `preventDefault` on the popover event when that dispatch is prevented (`createMenu.ts:92`). Elements sets `aria-expanded` in those hooks and sets `aria-haspopup="menu"` at construction (`:162`). Mailbox also adds and removes the class `show` on the toggle (`createDropdown.ts:91`, `:105`). ArrowUp and ArrowDown call `preventDefault`, open the menu if closed, and `.focus()` the `rove` result (`createMenu.ts:137`). Home and End do that only when the menu is open (`:153`). Elements items use `MENU_ITEM_SELECTOR` filtered by `isFocusable`. Mailbox items use `.dropdown-item:not(.disabled):not(:disabled)` (`mailbox/src/browser/constants.ts:99`) with no focusability filter. An item click emits `elements:menu:select` with `{ item, value }` before hide (`createMenu.ts:132`). Mailbox item click only hides, and only when `dismiss.inside` is true (`createDropdown.ts:119`).

Placement: Elements writes inline `max-block-size` of `flip * 2.25rem` and `--set-menu-flip`, or when `flip` is `0` writes `max-block-size: none` and `position-try-fallbacks: flip-inline` (`createMenu.ts:75`). The comment says the inline style is required because the surface layer's `max-block-size` beats a component-layer override (`:61`). Mailbox writes `--bs-dropdown-flip` for a positive `flip`, and the same `none` plus `flip-inline` opt-out (`createDropdown.ts:67`). It does not write `max-block-size` when `flip` is positive. The factory comment says the stylesheet pairs that property with `position-try-order: most-block-size` (`createDropdown.ts:23`). The stylesheet comment says `position-try-order` stays at `normal` (`mailbox/src/styles/_dropdown.scss:221`). Options: `placement` default `bottom-start`, `strategy` default `absolute`, `offset` default `2`, `flip` default `5` (`elements/src/browser/constants.ts:43`, `mailbox/src/browser/constants.ts:15`), `dismiss.outside`, `dismiss.escape`, and `dismiss.inside` each default `true`. Mailbox attaches the toggle click and keydown only when the toggle has the class `dropdown-toggle` (`createDropdown.ts:152`). Platform: `popover="manual"` and `showPopover({ source })` through `createPopover`. No `matchMedia`.

### Tab

Elements factory: `createTabs` (`elements/src/browser/factories/createTabs.ts:33`). Mailbox factory: `createTab` (`mailbox/src/browser/factories/createTab.ts:16`).

Elements `show` returns when active, when the trigger is `disabled`, or when `elements:tabs:show` is prevented (`:78`). It writes `--set-tabs-indicator-x`, `y`, `width`, and `height` from bounding rects (`:55`), sets the previous trigger to `aria-selected="false"` and `tabindex="-1"`, emits `deactivate`, sets this trigger to `aria-selected="true"` and removes `tabindex`, sets `[hidden]` on the previous pane, removes `[hidden]` on this pane, and emits `open` immediately (`:97`). The comment says it stopped waiting for `transitionend` because the tab chrome declares no transition, so the wait was a dead `400` ms (`:21`). `hide` dispatches `elements:tabs:hide`, writes the inactive ARIA, sets `[hidden]`, and emits `close` (`:108`). Click calls `preventDefault` and `show` (`:122`). There is no key listener. Construction adds `role="tablist"`, `role="tab"`, and `role="tabpanel"` when absent, and `aria-controls` (`:39`, `:140`). Option: `initial` (`elements/src/browser/types.ts:2092`). `destroy` removes the click listener and does not restore ARIA (`:152`).

Mailbox seeds `active` from the class `active` (`createTab.ts:23`). `show` dispatches `mailbox:tab:show`, paints `--bs-nav-indicator-*` (`:47`), swaps `.active`, `aria-selected`, and `tabindex` immediately, then fades the pane when it has `fade` through `runTransition` (`:58`). Without `fade`, `open` is synchronous. Keys: vertical `aria-orientation` uses ArrowDown and ArrowRight as next and ArrowUp and ArrowLeft as previous. The horizontal map swaps those pairs. Home and End jump. The handler calls `target.click()` then `target.focus()` (`:164`). Option surface is `on` only (`mailbox/src/browser/types.ts:1216`). `destroy` cancels in-flight transitions (`:235`).

### ScrollSpy

Elements factory: `createNav` (`elements/src/browser/factories/createNav.ts:24`). Mailbox factory: `createScrollSpy` (`mailbox/src/browser/factories/createScrollSpy.ts:22`).

Each builds an `IntersectionObserver`. `root` is the container when `scrollHeight > clientHeight`, otherwise `null` (`createNav.ts:58`). `rootMargin` is `options.intersection.margin` or `` `-${offset}px 0px 0px 0px` ``. `offset` defaults to `10` and `threshold` defaults to `0.1` (`elements/src/browser/constants.ts:60`, `mailbox/src/browser/constants.ts:24`). Sections are `[id]` (`elements/src/browser/constants.ts:158`, `mailbox/src/browser/constants.ts:114`). The callback keeps a set of intersecting ids and activates the first section in DOM order that is in that set (`createNav.ts:74`). There is no cancelable pre-change event. Elements writes `aria-current="location"` on `a` links whose `href` is `#id` or `id`, and removes it from the others (`:45`). Mailbox also toggles the class `active` (`createScrollSpy.ts:45`). `destroy` disconnects the observer. Elements removes `aria-current` (`createNav.ts:96`). Mailbox also removes `active` (`createScrollSpy.ts:100`). Elements requires a supplied `nav` to be a `nav` element (`:29`). Mailbox leaves a TODO and does not assert the tag (`:27`). No keyboard. No `matchMedia`. Options: `intersection.offset`, `intersection.margin`, `intersection.threshold`, `on`.

### Modal

Elements factory: `createDialog` (`elements/src/browser/factories/createDialog.ts:31`). Mailbox factory: `createModal` (`mailbox/src/browser/factories/createModal.ts:21`). Mailbox also has `createDialog` (`mailbox/src/browser/factories/createDialog.ts:30`), which inlines the `<dialog>` tag check (`:34`) and uses the same `showModal` / `close` / `runTransition` / non-modal `lockBodyScroll` shape (`:65`).

Elements `show` returns when `element.open` is already mirrored, or when `elements:dialog:show` is prevented (`createDialog.ts:55`). `modal` defaults to `true` and calls `showModal()`. `modal: false` calls `show()`, and calls `lockBodyScroll` only when `scroll.lock` is true (`:62`). The comment says `showModal()` locks document scroll and that the platform owns the trap and `::backdrop` (`:20`). Completion always uses `runTransition`, then emits `open` (`:73`). `hide` dispatches `elements:dialog:hide`, sets a suppress flag, calls `close()`, unlocks if this instance locked, and emits `close` after `runTransition` (`:79`). Escape arrives as `cancel`. When `dismiss.escape` is false the handler calls `preventDefault`, and when `dismiss.backdrop` is `'static'` it also emits `prevent` (`:109`). A backdrop click is `event.target === element` and the pointer outside `getBoundingClientRect` (`:145`). Inside the rect, the click is ignored. `true` calls `hide`. `'static'` emits `prevent`. `false` ignores the click. Defaults: `dismiss.backdrop` `true`, `dismiss.escape` `true`, `scroll.lock` `false`, `modal` `true` (`:37`). `destroy` cancels the transition, unlocks, and `close()`s if `element.open` (`:167`). The factory writes no `aria-modal` and no `role`.

Mailbox `createModal` takes `{ modal, backdrop }`. Defaults: `dismiss.backdrop` `true`, `dismiss.escape` `true`, `focus.trap` `true`, `scroll.lock` `true` (`createModal.ts:26`). `show` dispatches `mailbox:modal:show`, calls `lockBodyScroll` when `lock` is true, adds `show` on the backdrop when `backdropMode !== false`, removes `aria-hidden`, sets `aria-modal="true"` and `role="dialog"`, adds `show` on the modal, and after `runTransition` calls `createFocus.activate()` or `modal.focus()` (`:67`). `hide` dispatches `mailbox:modal:hide`, removes `show`, and after `runTransition` writes `aria-hidden="true"`, removes `aria-modal` and `role`, unlocks, deactivates the trap, and emits `close` (`:93`). Escape on `document` calls `hide` when `escape` is true, or emits `prevent` when the backdrop mode is `'static'` (`:206`). The native `cancel` listener calls `hide()` and does not call `preventDefault` (`:182`). A prevented `hide` therefore returns before `visible` changes, and the native dialog close can still run. Backdrop click uses the modal rect and the `.modal-dialog` rect (`:149`). Construction removes inline `display` on the modal and the backdrop (`:235`). The factory does not call `showModal`.

### Offcanvas

Elements factory: `createAside` (`elements/src/browser/factories/createAside.ts:55`). Mailbox factory: `createOffcanvas` (`mailbox/src/browser/factories/createOffcanvas.ts:25`).

Elements sets `popover` to `options.popover` or `'auto'`, unless the option is `false` (`:66`). `show` calls `showPopover`, sets `visible`, and emits `elements:aside:show` and `open` through `emit`, which is not cancelable (`:109`). `hide` calls `hidePopover` and emits `hide` and `close` (`:118`). Native `beforetoggle` and `toggle` are bridged the same way when the suppress counters are zero (`:81`). The comment says `beforetoggle` is not cancelable and the factory does not wire `aria-modal`, `role`, `inert`, or body scroll lock, and does not reimplement light dismiss (`:25`, `:43`). There is no `runTransition`. `destroy` calls `hidePopover` if open and restores `popover` (`:132`). Option: `popover` default `'auto'` (`elements/src/browser/types.ts:1525`).

Mailbox defaults: `dismiss.backdrop` `true`, `dismiss.escape` `true`, `scroll.lock` `true`, `focus.trap` `true` (`createOffcanvas.ts:30`, `:44`). `show` dispatches `mailbox:offcanvas:show`, locks, adds `show` on the backdrop, sets `aria-modal` and `role="dialog"`, removes `aria-hidden`, adds `show`, and after `runTransition` activates `createFocus` (`:68`). The comment says visibility stays CSS-driven through `.offcanvas.show { visibility: visible }` so the slide can run (`:54`). `hide` dispatches `hide`, removes `show`, and after the transition writes closed ARIA, unlocks, deactivates the trap, and emits `close` (`:93`). Escape matches the modal key path (`:123`). There is no `showPopover`. Construction removes inline `display` and `visibility` (`:146`). `destroy` cancels, unlocks, clears `show`, and writes closed ARIA (`:151`).

### Tooltip

Elements factory: `createTooltip` (`elements/src/browser/factories/createTooltip.ts:39`). Mailbox factory: `createTooltip` (`mailbox/src/browser/factories/createTooltip.ts:37`).

Hover and focus are always on. `show` and `hide` honor `delay.show` and `delay.hide`, default `0`. `doShow` returns when `elements:tooltip:show` or `mailbox:tooltip:show` is prevented, then calls `showPopover({ source: anchor })` (`elements/src/browser/factories/createTooltip.ts:160`, `mailbox/src/browser/factories/createTooltip.ts:162`). `doHide` hides after a prevented check fails to return, and calls `hidePopover` when `:popover-open` matches. Elements writes `position-area`, `align-self`, and `justify-self`, and sets `popover` to `manual` (`createTooltip.ts:89`, `:230`). It waits only when `hasTransitionDuration` is true. Mailbox toggles `.show` and side classes, waits only when `fade` is present, and the comment says that avoids a transition that never starts (`mailbox/src/browser/factories/createTooltip.ts:127`). Placement default `bottom`. `strategy` default `absolute`. `offset` default `8` (`elements/src/browser/constants.ts:42`). `dismiss.escape` default `true`. Escape calls `preventDefault` and `hide`. No focus trap. Scroll and resize reschedule the resolved side. `placement: false` skips placement writes.

### Popover

Elements factory: `createPopover` (`elements/src/browser/factories/createPopover.ts:59`). Mailbox factory: `createPopover` (`mailbox/src/browser/factories/createPopover.ts:77`).

`trigger` defaults to `{ click: true }` (`createPopover.ts:66`, `:84`). `delay.show` and `delay.hide` default `0`. `dismiss.outside` and `dismiss.escape` default `true`. Mailbox `dismiss.inside` defaults `false` (`:87`). Elements has no `inside` option. `show` dispatches `*:popover:show` on the anchor and returns when prevented, sets `aria-expanded="true"`, calls `update`, calls `panel.showPopover({ source: anchor })`, and finishes open (`elements` `:189`, `mailbox` `:205`). Mailbox also adds the class `show` (`:213`). `hide` dispatches `hide`, sets `aria-expanded="false"`, calls `hidePopover`, and finishes close. A document `pointerdown` inside the touch guard of `50` ms is ignored (`elements/src/browser/constants.ts:59`). Outside the anchor and panel, `hide` runs when `dismiss.outside` is true. Mailbox hides on an inside hit when `dismiss.inside` is true (`mailbox` `:267`). Escape prevents default and hides. Elements placement writes `positionArea`, `alignSelf`, `justifySelf`, and datasets (`:118`). Mailbox placement calls `applyPopoverClasses` and side classes `bs-popover-{side}` (`:138`). Both set `panel.popover = 'manual'` and an explicit `anchor-name` / `position-anchor` pair (`elements` `:261`, `mailbox` `:285`). The Elements comment says a toast is outside the anchor stylesheet because it carries `role="status"` (`:28`). The factory itself does not test that role. `destroy` remains callable and the comment says `show` and `hide` still mutate the DOM after listeners are gone (`elements` `:54`).

### Alert

Elements factory: `createAlert` (`elements/src/browser/factories/createAlert.ts:18`). Mailbox factory: `createAlert` (`mailbox/src/browser/factories/createAlert.ts:23`).

Elements `initial` defaults to `true` (`createAlert.ts:35`). A missing `role` becomes `alert`. `show` dispatches `elements:alert:show`, removes `aria-hidden`, sets `data-alert-open`, forces reflow, and `runTransition`s to `open` (`:55`). `hide` dispatches `hide`, removes `data-alert-open`, and on completion sets `aria-hidden="true"` (`:69`). A click on `[data-alert-dismiss]` calls `hide`. The comment says the factory does not impose a tag because the role is the contract (`:15`). No popover. No keyboard. Mailbox seeds `initial` from the option or from the class `show` (`mailbox` `:34`), toggles the class `show` and `data-alert-open` `"true"` or `"false"`, and the comment says alerts stay in flow (`:19`). `destroy` clears `show`, sets `aria-hidden`, removes `data-alert-open`, and restores `role` (`:100`).

### Toast

Elements factory: `createToast` (`elements/src/browser/factories/createToast.ts:58`). Mailbox factory: `createToast` (`mailbox/src/browser/factories/createToast.ts:38`).

Each delegates visibility to `createPopover` with `placement: false`, empty triggers, and dismiss outside and escape false (`elements` `:176`, `mailbox` `:159`). The anchor and the panel are the same element. Popover `show` and `hide` re-dispatch `*:toast:show` and `hide`, and prevent the popover event when that dispatch is prevented (`elements` `:184`). `autohide` defaults to on. `delay` defaults to `5000` (`elements/src/browser/constants.ts:38`). The timer starts after `runTransition` emits `open` (`elements` `:227`, `mailbox` `:201`). Pointer hover and focus inside pause it. Elements sets `role="status"` when absent (`:67`). Swipe is on unless `swipe: false`. The threshold defaults to `80` (`elements/src/browser/constants.ts:40`, `mailbox/src/browser/factories/createToast.ts:27`). Pointer movement writes `--set-toast-swipe-offset` and `--set-toast-swipe-opacity`, ignores a hit on `a`, `button`, `input`, `textarea`, `select`, or `[role="button"]`, and commits `hide` when the absolute inline delta reaches the threshold (`elements` `:389`). No `matchMedia`.

### Carousel

Elements factory: `createCarousel` (`elements/src/browser/factories/createCarousel.ts:29`). Mailbox factory: `createCarousel` (`mailbox/src/browser/factories/createCarousel.ts`).

Options default `keyboard` true, `touch` true, `wrap` from the options object (`elements/src/browser/types.ts:2178`). `autoplay.interval` uses `DEFAULT_CAROUSEL_INTERVAL_MS` of `5000`. `pause` is `'hover'` or `false`. `ride` is `'mount'`, `'interaction'`, or `false`. `to` dispatches `*:carousel:slide` with `{ direction, from, to }` and returns when prevented (`elements` `:130` from the earlier dispatch site, `mailbox/src/browser/factories/createCarousel.ts:140`). The incoming item gets `carousel-item-next` or `carousel-item-prev`, then both items get `carousel-item-start` or `carousel-item-end` after `offsetHeight` (`elements` `:104`). `runTransition` on the incoming item then strips those classes and adds `active`. Elements writes `aria-selected` on indicators (`:88`). Mailbox writes `aria-current="true"` and the class `active` (`mailbox` `:102`). Keys ArrowLeft and ArrowRight call `preventDefault` and move (`elements` `:224`). The handlers do not test `input` or `textarea`. Touch uses `touchstart` and `touchend` with `{ passive: true }` and `SWIPE_THRESHOLD_PX` of `40` (`elements/src/browser/constants.ts:63`). A smaller absolute delta returns. Elements `start` always starts the interval (`elements` `:182`). Mailbox `start` returns first when reduced motion matches (`mailbox` `:183`). The comment says keyboard, touch, and `next()` still move the deck (`:173`).

### Backdrop

Dedicated factory: none in Elements. None in Mailbox.

Elements `createDialog` uses the native `::backdrop` and does not append an element (`elements/src/browser/factories/createDialog.ts:20`). Elements `createAside` says the native `::backdrop` is styled in `surfaces/_backdrop.scss` (`createAside.ts:12`). Mailbox `createModal` and `createOffcanvas` add and remove the class `show` on a caller-supplied backdrop element (`createModal.ts:76`, `createOffcanvas.ts:77`). They do not create the node. `backdropMode === false` skips the class. `'static'` emits `prevent` instead of `hide`.

### FocusTrap

Elements factory: `createFocus`. Mailbox factory: `createFocus`. The mechanism is the row in section A. `createModal` and `createOffcanvas` call `activate` after `runTransition` and `deactivate` on hide (`createModal.ts:87`, `:123`). `createDialog` does not call `createFocus`. The comment says the platform traps focus for `showModal()` (`createDialog.ts:20`).

### ScrollBarHelper

Dedicated factory: none. The carrier is `lockBodyScroll` / `unlockBodyScroll`, compared in section A. Callers: Elements `createDialog` when `modal` is false and `scroll.lock` is true (`createDialog.ts:66`). Mailbox `createModal` when `scroll.lock` is true, default true (`createModal.ts:72`). Mailbox `createOffcanvas` the same (`createOffcanvas.ts:73`). Unlock runs in the hide completion callback for the Mailbox overlays, and immediately in `hide` for Elements `createDialog` (`:90`). `destroy` unlocks if that instance still holds the flag.

### Swipe

Dedicated overlay-swipe factory: none.

`createDrag` in each repository is pointer selection and HTML5 drag-and-drop (`elements/src/browser/factories/createDrag.ts:16`). It is not the carousel gesture. Carousel swipe is `touchstart` / `touchend` with threshold `40`, in the Carousel row. Toast swipe is a pointer drag with threshold `80`, in the Toast row. Mailbox `createDrag` is the reduced-motion reader for autoscroll (`createDrag.ts:318`).

### Sanitizer

Elements factory: none. Mailbox factory: none. A search of `src/browser` in each repository found no `DOMParser`, `sanitizeHtml`, `allowList`, `setHTML`, or `innerHTML`.

### TemplateFactory

Elements factory: none. Mailbox factory: none. Tooltip and popover panels are caller-supplied elements. The factories set `popover`, placement, and ARIA. They do not build HTML from a template string.

## C. Lessons

Quotes are the sentences in `src/browser/factories/*.ts`, `src/browser/helpers.ts`, `src/browser/constants.ts`, and the authored `guides/*.md` files that record a mechanism lesson for these obligations. `guides/w3c/**` matches the keyword list as vendored HTML specification prose and is not quoted here.

### Collapse

`elements/src/browser/factories/createDetails.ts:59`: "Why click and not `beforetoggle`: `beforetoggle` for `<details>` is a recent addition (Chromium added the event later than the popover variant) and isn't reliably fired across the supported browser matrix."

`elements/src/browser/factories/createDetails.ts:13`: "The factory does not run a JS height-transition."

`mailbox/src/browser/helpers.ts:147`: "Run `callback` once after the next CSS transition on `el`, with a timeout fallback in case the transition never fires."

### Dropdown and placement

`elements/src/browser/factories/createMenu.ts:61`: "Inline style is required because the surface layer (`surfaces/_anchor-position.scss`) declares its own `max-block-size` … and `@layer surfaces` beats `@layer components` — a layered component-level override would lose."

`elements/src/browser/factories/createMenu.ts:70`: "`flip: 0` opts out — drops the cap and the block-axis fallback."

`elements/src/browser/constants.ts:660`: "Logical `start` / `end` map to physical `left` / `right` because Chromium's `position-area` parser only accepts the physical keywords today."

`mailbox/src/browser/helpers.ts:699`: "Bootstrap's logical `start`/`end` map to physical `left`/`right` because Chromium's `position-area` parser only accepts the physical keywords today."

`mailbox/src/browser/factories/createDropdown.ts:23`: "The decision of which side to open on lives in `_dropdown.scss` (`max-block-size: calc(var(--bs-dropdown-flip) * var(--bs-dropdown-row-height))` paired with `position-try-fallbacks: flip-block, flip-inline; position-try-order: most-block-size`). The browser resolves the side during layout — before any paint."

`elements/guides/surfaces.md:135`: "`position-try-order: normal` (the spec default) means the browser commits to the first fallback that fits in declaration order — `most-width` / `most-block-size` are rejected as too greedy."

`elements/guides/surfaces.md:153`: "Known limitation: in-session sticky flip. Chromium re-evaluates `position-try-fallbacks` only when the popover's own layout changes."

`mailbox/src/styles/_dropdown.scss:221`: "`position-try-order` is left at the spec default (`normal`)… The previous `most-block-size` value was greedier."

`mailbox/src/styles/_mixins.scss:494`: the `.native` rule sets `position-try-order: most-width`.

### Tab

`elements/src/browser/factories/createTabs.ts:21`: "the factory doesn't await any JS-driven transition (the previous version waited for a CSS `transitionend` that the framework's tab chrome doesn't declare — a 400 ms `TRANSITION_FALLBACK_MS` of dead wait on every switch)."

`elements/guides/w3c/interactions.md:124` is vendored spec text: "it is incorrect to use `hidden` to hide panels in a tabbed dialog, because the tabbed interface is merely a kind of overflow presentation." Elements `createTabs` still hides panes with `[hidden]` (`createTabs.ts:16`).

### Offcanvas and dialog

`elements/src/browser/factories/createAside.ts:40`: "`runTransition` wait before `hidePopover()` — caused a ~400 ms dead wait on close (the transition we were waiting for hadn't started yet because `hidePopover()` is what triggers it)."

`elements/src/browser/factories/createAside.ts:43`: "`aria-modal` / `role="dialog"` / `inert` auto-wiring" and "Body scroll lock" are in the removed list. "consumers who want the body locked too compose `useAside` with `lockBodyScroll()` themselves (or use `<dialog>`)."

`elements/src/browser/factories/createAside.ts:25`: "Bridges native `beforetoggle` → `elements:aside:show` / `elements:aside:hide` (informational; not cancellable — the native event isn't either)."

`elements/src/browser/factories/createDialog.ts:22`: "the factory does NOT carry its own backdrop element, focus-trap loop, or scroll-lock for the modal case (`showModal()` locks the document scroll natively)."

`elements/guides/surfaces.md:92`: "Chrome 148+ has a regression where `@starting-style` declarations can leak into the normal cascade tier."

`elements/guides/surfaces.md:188`: "If the transition were declared only on the open-state rule, it would disappear at frame 0 of close… That snap reads to the user as a backdrop flash."

### Tooltip, popover, toast, alert

`elements/src/browser/factories/createPopover.ts:32`: "a toast is excluded because it carries `role="status"` (a `<div role="status" popover>`, NOT an `<output>`)."

`elements/src/browser/factories/createPopover.ts:52`: "the factory never imports `'vue'`."

`elements/src/browser/factories/createPopover.ts:277`: "Mailbox doesn't write these (acknowledged gap in their composable)."

`mailbox/src/browser/factories/createPopover.ts:177`: "Without it, `open` / `close` fire synchronously so consumers don't wait on a transition that never starts."

`mailbox/src/browser/factories/createAlert.ts:19`: "popovers elevate their panel to the browser top layer, alerts must stay in flow."

`mailbox/guides/styles.md:190`: "The composables still fire `open` / `close` events on time because `runTransition` falls back to a `TRANSITION_FALLBACK_MS` (400 ms) timer if `transitionend` never arrives."

`mailbox/guides/styles.md:492`: "`TRANSITION_FALLBACK_MS = 400` is the safety timer in `src/browser/constants.ts`. Any duration longer than 400 ms must rely on `transitionend` (the carousel does); otherwise the composable will fire `open` / `close` early."

`mailbox/guides/styles.md:571`: "Native popover toasts detach from the `.toast-container` flow because the top layer is outside parent layout."

### Carousel and motion

`mailbox/src/browser/factories/createCarousel.ts:173`: "Honour `prefers-reduced-motion: reduce` — autoplay is animation; a user who has asked the platform to reduce motion expects the carousel to NOT auto-advance."

`mailbox/guides/styles.md:936`: "Carousel slide (`--bs-duration-slowest` = 600 ms) is driven by a real `transitionend` event on `.carousel-item-{start,end,next,prev}`, so the composable's fallback timer never fires before the browser dispatches the real one."

### Focus

`elements/src/browser/helpers.ts:2236`: "when BOTH are present (`<menu><li><button>…</button></li>` …) a raw `querySelectorAll` returns `[LI, BUTTON, …]` and roving lands on the `<li>` first. `<li>` has `tabIndex = -1` by default, so `.focus()` is a silent no-op."

`elements/src/browser/factories/createFocus.ts:23`: "The host MUST contain at least one focusable descendant for the trap to function; if not, `activate()` is a no-op."

## D. Contradictions

The research report's § C says Mailbox `createDropdown` uses `position-try-order: most-block-size` (`j-engine-research-report.md:241`, citing `createDropdown.ts:23-26`). That sentence is in the factory comment. `mailbox/src/styles/_dropdown.scss:221` says the property is left at `normal` and that `most-block-size` was the previous, greedier value. `mailbox/src/styles/_mixins.scss:494` sets `position-try-order: most-width` on `.{component}-native`, which is the popover and tooltip class path, not the dropdown comment's claim. Elements `guides/surfaces.md:135` and `src/styles/surfaces/_anchor-position.scss:137` say Mailbox rejected `most-block-size` and `most-width` as too greedy. The dropdown stylesheet agrees with that rejection. The dropdown factory comment does not.

Elements `createPopover.ts:277` says Mailbox does not write `aria-haspopup`, `aria-controls`, and `aria-expanded`. Mailbox `createPopover.ts:37` writes all three and restores them on `destroy`.

`createFocus.ts:23` says an empty host makes `activate()` a no-op. `createFocus.ts:68` sets `active` to true and focuses only when a target exists. The research report's § C repeats the comment (`j-engine-research-report.md:250`).

`createDetails.ts:71` says the summary-click path is handled by `show()` and `hide()` called from the click bridge. `onSummaryClick` (`createDetails.ts:111`) dispatches and may call `preventDefault`. It does not call `show` or `hide`.

Mailbox `types.ts:552` says the dropdown `flip` default is `0`. `constants.ts:15` sets `DEFAULT_DROPDOWN_FLIP` to `5`, and `createDropdown.ts:47` uses that constant.

`createDialog.ts:22` says `showModal()` locks document scroll. The function calls `lockBodyScroll` only for the non-modal opt-in (`createDialog.ts:60`). The research report's § C already records that the vendored dialog section does not describe `overflow` or scrollbar compensation (`j-engine-research-report.md:322`). This reading did not reopen that vendored section.

`guides/surfaces.md:15` excludes `output` from anchor placement. `createPopover.ts:30` names the exclusion as `[role='status']` and says the toast is a `div`, not an `output`. `createToast.ts:29` sets `role="status"` on the bound element.

`createTabs.ts:16` hides inactive panes with `[hidden]`. The vendored sentence at `guides/w3c/interactions.md:124` says `hidden` is the wrong tool for tab panels. The research report's § C already records that pair (`j-engine-research-report.md:324`).

Elements `helpers.ts:1657` says `useDialog` and `useAside` share the scroll-lock counter. `createAside.ts:46` tells the caller to call `lockBodyScroll` and does not call it itself.

The research report's § C says Elements carousel does not call `matchMedia` and Mailbox carousel does (`j-engine-research-report.md:249`). That split still matches the files. Mailbox `createDrag.ts:321` is a second `prefers-reduced-motion` reader, which § C also notes under Swipe.

## E. Unresolved inputs

`guides/w3c/**` in Elements and Mailbox matches the lesson keywords as vendored HTML specification text. Those sentences were not quoted. Authored guide sentences about token names, partial order, and form chrome were not quoted when they do not bear on these obligations.

Whether `HTMLDialogElement.showModal()` itself sets `overflow` on the document is a platform claim in `createDialog.ts:22`. The factory does not write `overflow`. The helper writes `paddingRight` and either an attribute or the class `modal-open`.

Whether `ToggleEvent` for `beforetoggle` is cancelable is a platform claim in `createAside.ts:25`. The factory never calls `preventDefault` on it.

`createCarousel` `destroy` in each repository removes listeners. The search excerpts did not show the lines between the `destroyed` flag and those removals, so this distillate does not say whether `destroy` invokes the in-flight `runTransition` cancel. `apply` does call that cancel before the next slide (`elements/src/browser/factories/createCarousel.ts:97`).

No factory reads completion from `getAnimations` or `transitioncancel`. What the browser does when reduced-motion CSS sets `transition: none` and `runTransition` is still armed is the `400` ms timer. Elements popover and tooltip skip the timer when computed `transition-duration` is `0`. The other always-on callers do not.

Mailbox `createModal` `onNativeCancel` calls `hide()` without `preventDefault` (`createModal.ts:182`). A prevented `mailbox:modal:hide` returns before `visible` is cleared, and a real `<dialog>` can still close. The code does not say which event fires first when a `<dialog>` also receives the document `keydown` Escape handler.

`position-visibility: anchors-visible` appears in `mailbox/src/styles/_mixins.scss:495` and in the Elements surface guide the collapse terrain already cited. Neither popover factory writes that property.
