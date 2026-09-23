I'll start by reading the brief and the repository's agent contracts so I follow the right process.The brief is a read-only platform survey. I'll capture git status, then read the named local sources and the contracts that govern this work.Web search was blocked, so I’ll fetch the specification and Chromium status pages directly and keep reading the local factory and package sources.Web search and page fetch were both rejected, so this distillate uses installed sources only. Primary Chromium shipping pages were not read. `git status --porcelain` was empty before and after. The brief names tip `87ff1d0`; this checkout is `0f4202484bd1d5916896c6c546215d55e6c2a15e` ("Record the Codex bench dark on quota and the Opus lane substitution").

D41 binds J-ENGINE to native browser systems, no runtime dependency outside `@orkestrel/*`, and a ruling on each candidate (`ROADMAP.md:176-180`; `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md:444-459`). The host named for receipts is Chromium `141.0.7390.37` (`ROADMAP.md:221`). The construction paragraph requires explicit construction, opt-in delegation, typed contracts, ownership with restore-on-destroy, abort-driven cleanup, a side-effect-free import, a cancelable pre-change event beside the completed one, a shared focus primitive, native-first disclosure and placement, reduced-motion gating in script, `IntersectionObserver` for Scrollspy, and completion read from the actual transition (`ROADMAP.md:143-151`).

The TypeScript `6.0.3` DOM library at `node_modules/typescript/lib/lib.dom.d.ts` is a compiler declaration, not a Chromium 141 receipt. Author comments that name a Chrome version are cited as those comments, not as a shipping milestone.

## A. Platform features

The table records, for each named feature, the installed specification pointer, the MDN page a declaration or vendored guide names, the Chrome version an installed comment states, and what those sources say the feature gives and withholds.

| Feature | Specification pointer | MDN pointer in an installed file | Chrome version an installed comment states | Gives | Withholds |
| --- | --- | --- | --- | --- | --- |
| Popover API: `popover`, `popovertarget`, `showPopover`, `hidePopover`, `togglePopover`, `beforetoggle`, `toggle`, `:popover-open`, top layer, light dismiss | Vendored HTML interaction notes name `popovertarget` activation and implicit close watchers on popovers (`/home/user/elements/guides/w3c/interactions.md:457`, `:619-623`). No vendored heading titled as the Popover section was found. | `HTMLElement.showPopover` / `hidePopover` / `togglePopover` comments point at `https://developer.mozilla.org/docs/Web/API/HTMLElement/showPopover`, `.../hidePopover`, and `.../togglePopover` (`lib.dom.d.ts:17869-17885`). `popoverTargetElement` points at `https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/popoverTargetElement` (`lib.dom.d.ts:28548-28551`). | `Chrome 114+` (`/home/user/elements/src/styles/surfaces/_popover.scss:4`) | The declaration types `popover: string \| null`, `showPopover(options?: { source?: HTMLElement })`, `hidePopover()`, and `togglePopover(options?: { source?: HTMLElement; force?: boolean } \| boolean): boolean` (`lib.dom.d.ts:17831`, `:2716-2718`, `:2844-2846`, `:17879-17885`). The popover partial says `[popover]` is `display: none` until opened, the open element is top-layer so `z-index` has no effect, `[popover=auto]` light-dismisses on Escape and outside click, and `[popover=manual]` stays until `hidePopover()` (`_popover.scss:12-19`). `ToggleEvent` carries `oldState` and `newState` (`/home/user/elements/guides/w3c/interactions.md:461`). | The `togglePopover` comment does not say what `true` and `false` mean (`lib.dom.d.ts:17881-17885`). The partial says styling treats `auto` and `manual` the same and does not encode Bootstrap's `autoClose` matrix (`_popover.scss:18-20`). `createAside` records that `beforetoggle` is bridged as informational and that the factory does not reimplement light dismiss (`/home/user/elements/src/browser/factories/createAside.ts:25-51`). |
| `<dialog>` `showModal` and `closedby` | HTML § 4.11.4 The `dialog` element and § 4.11.5 Dialog light dismiss (`/home/user/elements/guides/w3c/elements/interactives.md:411-447`, `:787-799`) | The same file names `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog` and `https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement` (`interactives.md:413-415`) | No installed Chrome version for `showModal` or `closedby` | The interface lists `show()`, `showModal()`, `close()`, `requestClose()`, and `closedBy` (`interactives.md:436-447`). The declaration types `closedBy: string` and `showModal(): void` (`lib.dom.d.ts:17621-17661`). The inspector allowlist is `any`, `closerequest`, `none` (`/home/user/elements/src/browser/schema.ts:1548`). Light dismiss runs only when the computed closed-by state is Any (`interactives.md:787-799`). `::backdrop` is the scrim the dialog surface shares with popover (`/home/user/elements/guides/surfaces.md:156-158`; `/home/user/elements/src/styles/surfaces/_popover.scss:21-22`). | The dialog section read does not state a body `overflow` lock or a scrollbar-width compensation. Focus restoration says the viewport must not be scrolled by that step (`interactives.md:731`). `closedby` light dismiss is the Any state only, not Bootstrap's static backdrop. |
| `inert` | HTML § 6.3 Inert subtrees, § 6.3.1 Modal dialogs and inert subtrees, § 6.3.2 The `inert` attribute (`/home/user/elements/guides/w3c/interactions.md:259-287`) | `https://developer.mozilla.org/docs/Web/API/HTMLElement/inert` (`lib.dom.d.ts:17773-17777`) and `https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert` (`interactions.md:285`) | No installed Chrome version | A modal `dialog` opened with `showModal()` makes every other connected node inert (`interactions.md:275-281`). The attribute makes the element and its flat-tree descendants inert: hit-testing, selection, focus, and accessibility exposure (`interactions.md:263-269`, `:287`). The declaration types `inert: boolean` (`lib.dom.d.ts:17777`). | The attribute does not paint a backdrop, lock scroll, or trap focus by itself. The modal inertness exception is the dialog and its flat-tree descendants (`interactions.md:277`). |
| Invoker commands: `command`, `commandfor`, `CommandEvent` | HTML § 6.5 Activation behavior and § 6.5.2 The `CommandEvent` interface (`interactions.md:455-465`) | `https://developer.mozilla.org/docs/Web/API/CommandEvent` (`lib.dom.d.ts:10813-10815`) | No installed Chrome version | `command` and `commandfor` on a button dispatch `CommandEvent` with `command` and `source`. Examples named: `show-modal` and `toggle-popover` (`interactions.md:457-465`). Declarations: `command: string`, `commandForElement: Element \| null`, `source` (`lib.dom.d.ts:10817-10827`, `:17291-17297`). | The vendored note says an element with `commandfor` also needs `command`, and `popovertarget` must reference a popover (`interactions.md:457`). It does not describe Bootstrap keyboard maps, `autoClose`, or focus return. |
| CSS anchor positioning: `anchor-name`, `position-anchor`, `position-area`, `position-try-fallbacks`, `position-visibility` | No CSS anchor specification section is vendored. The surface comment describes the behavior (`/home/user/elements/src/styles/surfaces/_anchor-position.scss:1-103`). | No MDN page is named in that partial | `Chromium 125+` (`_anchor-position.scss:5`) | A `popovertarget` button creates an implicit anchor, so `anchor-name` and `position-anchor` are optional for that path (`_anchor-position.scss:22-31`). `position-try-fallbacks` tries flip-block, then flip-inline, then both (`_anchor-position.scss:53-58`, `:118-135`). `position-visibility: anchors-visible` hides the popover when the anchor scrolls off screen (`/home/user/elements/guides/surfaces.md:147`). | The same comment says Chromium re-evaluates fallbacks only when the popover's own layout changes, so a flip committed at open stays until close (`_anchor-position.scss:84-94`; `surfaces.md:153`). `position-try-order: most-width` and `most-block-size` are rejected in that comment as too greedy (`_anchor-position.scss:137-140`). The placement map uses physical `left` and `right` because the comment says Chromium's `position-area` parser accepts only physical keywords (`/home/user/elements/src/browser/constants.ts:657-661`). No shift-into-view modifier, arrow modifier, or `popperConfig` object is described. |
| `@starting-style` and `transition-behavior: allow-discrete` on `display` and `overflow` | No CSS transitions specification section is vendored | No MDN page is named | A popover comment describes a Chrome `148+` `@starting-style` leak (`/home/user/elements/guides/surfaces.md:92`; `/home/user/elements/src/styles/elements/_dialog.scss:256-259`). That version is later than the receipt host. | The popover partial says `allow-discrete` plus `@starting-style` is what animates entry from `display: none`; otherwise the element pops in (`_popover.scss:12-15`). `allow-discrete` is applied per property on `overlay` and `display` only (`_popover.scss:103-114`). Details content uses it for `content-visibility` (`/home/user/elements/src/styles/elements/_details.scss:65-70`). | A lone `transition-behavior: allow-discrete` makes continuous properties such as opacity snap (`_popover.scss:107-113`). The partial does not say `overflow` itself transitions. |
| `hidden="until-found"` and `beforematch` | Vendored find-in-page § 6.9.2 (`interactions.md:605-607`). Mailbox cites W3C HTML § 15.3.1 (`/home/user/mailbox/src/styles/_base.scss:988-991`). | `onbeforematch` points at `https://developer.mozilla.org/docs/Web/API/Element/beforematch_event` (`lib.dom.d.ts:16661`, `:16777-16778`) | `Chromium 102+` (`_base.scss:992`) | A find-in-page match fires `beforematch` and removes `hidden` (`interactions.md:607`). The cascade sets `content-visibility: hidden` for that value, distinct from `display: none` (`_base.scss:988-996`). | The ordinary `[hidden]` rule forces `display: none` and would hide the content from find-in-page (`_base.scss:984-986`, `:991`). The comment says Firefox falls through to that rule (`_base.scss:992-994`). |
| `<details name>` and the `toggle` event | HTML § 4.11.1 The `details` element (`interactives.md:24-44`). `ToggleEvent` at § 6.5.1 (`interactions.md:459-461`). | `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details` (`interactives.md:26`) | The details factory says `<details>` shipped in 2020 and that Chromium added `beforetoggle` for `<details>` later than the popover variant (`/home/user/elements/src/browser/factories/createDetails.ts:59-64`). `::details-content` is commented as Chromium `131+` (`_details.scss:60`). Mailbox says accordion `[name]` is baseline since September 2025, Chrome `131+` (`/home/user/mailbox/src/styles/_disclosure.scss:13-14`; the Chrome `131+` phrase is in `_disclosure.scss` near the `::details-content` comment cited by the collapse terrain's sibling file `/home/user/mailbox/src/styles/_disclosure.scss:117` area). | `name` groups mutually exclusive `details` (`interactives.md:42`). `toggle` fires after `[open]` changes and is not cancelable; `preventDefault()` on the summary click aborts the toggle (`createDetails.ts:48-70`). | The factory refuses `beforetoggle` on `<details>` as unreliable across its browser matrix (`createDetails.ts:59-64`). Exclusive `name` is not a height animation. |
| `interpolate-size` and `calc-size()` | `calc-size(auto, ...)` appears only as an example in the vendored rendering notes (`/home/user/elements/guides/w3c/renderings.md:1662-1663`). No specification section title is attached. | No MDN page is named | `Chromium 129+` for `interpolate-size: allow-keywords` (`_details.scss:15-16`) | `allow-keywords` on `html` lets a transition run to and from `auto` (`/home/user/elements/src/styles/elements/_html.scss:6-14`). Details and accordion comments use it for `block-size: 0` to `auto` (`_details.scss:65-66`; `/home/user/mailbox/src/styles/_disclosure.scss:15-18`). | Mailbox gates the animation on `@supports` and says other engines snap open (`_disclosure.scss:15-18`). No installed factory comment says `calc-size()` replaces a `scrollHeight` measurement. |
| `IntersectionObserver` | The declaration comment describes root, root margin, thresholds, `observe`, `disconnect`, and `takeRecords` (`lib.dom.d.ts:23029-23077`) | Those comments name `https://developer.mozilla.org/docs/Web/API/IntersectionObserver/root` and the sibling pages (`lib.dom.d.ts:23033-23069`) | No installed Chrome version | `IntersectionObserverInit` is `root`, `rootMargin`, `scrollMargin`, and `threshold` (`lib.dom.d.ts:1340-1345`). The interface also exposes `scrollMargin` (`lib.dom.d.ts:23043-23047`). | A search of `lib.dom.d.ts` found no `trackVisibility`. The init dictionary has no v2 visibility-delay option. The observer does not scroll, write `active`, or smooth-scroll. |
| `ResizeObserver` | `interface ResizeObserver` at `lib.dom.d.ts:30601` | The surrounding declaration block is the pointer; a dedicated MDN URL was not read from that slice | No installed Chrome version | The interface is declared. | The modal terrain says none of the overlay factories call it (`b-modal-terrain-report.md:55`). The declaration was not read far enough to list callback fields. |
| `scroll-snap`, `scrollend`, `scrollIntoView` options | No scroll-snap specification section is vendored. `scrollend` is an event on `GlobalEventHandlers` (`lib.dom.d.ts:16732`, `:16917-16918`). | `https://developer.mozilla.org/docs/Web/API/Document/scrollend_event` (`lib.dom.d.ts:16917`) and `https://developer.mozilla.org/docs/Web/API/Element/scrollIntoView` (`lib.dom.d.ts:13852-13856`) | No installed Chrome version | `scrollIntoView` accepts `boolean` or `ScrollIntoViewOptions` with `block`, `inline`, and inherited `behavior` (`lib.dom.d.ts:2666-2673`, `:13856`). Mailbox mentions `scroll-padding-block-start` as the offset for anchor jumps and scroll-snap (`/home/user/mailbox/src/styles/_base.scss:11`). | `ScrollIntoViewOptions` in this library has no container option. No installed carousel factory comment says the deck is a scroll-snap container. |
| `CloseWatcher` | HTML § 6.10 Close requests and close watchers, § 6.10.3 The `CloseWatcher` interface (`interactions.md:613-635`) | No MDN URL on that heading | No installed Chrome version | A close request dismisses the topmost open popover, modal dialog, or registered watcher. Dialogs and popovers register watchers implicitly. `new CloseWatcher()` exposes `requestClose()`, `close()`, `destroy()`, and `cancel` / `close`. One free watcher may be created without transient activation (`interactions.md:619-627`). | A search of `lib.dom.d.ts` for `CloseWatcher` found no declaration. The section does not map Bootstrap `keyboard: false` or a static backdrop. |
| `AbortSignal.any` and `AbortSignal.timeout` | The declaration comments are the installed description (`lib.dom.d.ts:3418-3428`) | `https://developer.mozilla.org/docs/Web/API/AbortSignal/any_static` and `.../timeout_static` (`lib.dom.d.ts:3420`, `:3426`) | No installed Chrome version | `any` aborts when any input aborts and keeps the first reason. `timeout(milliseconds)` aborts after a delay (`lib.dom.d.ts:3418-3428`). `@orkestrel/abort` links a parent with `AbortSignal.any` (`node_modules/@orkestrel/abort/dist/src/core/index.d.ts:12-15`). | The comments do not say `timeout` replaces a transition `transitionend` listener. |
| Web Animations: `getAnimations`, `finished`, `commitStyles` | Declaration comments (`lib.dom.d.ts:3557-3558`, `:3590`, `:3658-3662`) | `https://developer.mozilla.org/docs/Web/API/Element/getAnimations` and `https://developer.mozilla.org/docs/Web/API/Animation/commitStyles` (`lib.dom.d.ts:3557`, `:3660`) | No installed Chrome version | `Element.getAnimations` returns `Animation[]`. `finished` is `Promise<Animation>`. `commitStyles()` writes computed animated values into the `style` attribute (`lib.dom.d.ts:3558`, `:3590`, `:3658-3662`). | The comments do not say `finished` hears a CSS `transition`. The collapse and overlay factories that were read wait on `transitionend` plus a timeout, not on `finished`. |
| `Element.setHTML` and the Sanitizer API | `interface Sanitizer` comment (`lib.dom.d.ts:34571-34632`) | `setHTMLUnsafe` points at `https://developer.mozilla.org/docs/Web/API/Element/setHTMLUnsafe` (`lib.dom.d.ts:13889-13893`). Sanitizer methods point at `https://developer.mozilla.org/docs/Web/API/Sanitizer/...` (`lib.dom.d.ts:34576-34626`) | No installed Chrome version | `Sanitizer` is constructable from `SanitizerConfig` and can allow or remove elements and attributes, call `removeUnsafe()`, and set comments and data attributes (`lib.dom.d.ts:34572-34631`). `setHTMLUnsafe(html: string): void` is declared (`lib.dom.d.ts:13893`). | A search for `setHTML(` in `lib.dom.d.ts` found no match. The declared `setHTMLUnsafe` takes only a string, so this library does not type a sanitizer argument on that call. `@orkestrel/html` refuses `javascript:`, `data:`, `vbscript:`, and `file:` URLs and `on*` attributes in its own parser (`node_modules/@orkestrel/html/dist/src/core/index.d.ts:1023-1036`, `:1348-1363`). |
| `scrollbar-gutter: stable` | The scrollbar partial cites CSS Scrollbars Module Level 1 for inheritance (`/home/user/elements/src/styles/surfaces/_scrollbar.scss:13-14`) | No MDN page is named | `Chrome 94+` (`_scrollbar.scss:5`) | `stable` reserves space so layout does not shift when a scrollbar appears. `scrollbar-gutter` does not inherit (`_scrollbar.scss:10-14`). | It does not hide the scrollbar or set `overflow: hidden`. The popover partial turns it back to `auto` on top-layer panels because the reserved strip is empty space when no bar appears (`_popover.scss:116-135`). |
| `overscroll-behavior` | No specification section is vendored. Usage is in the anchor partial (`_anchor-position.scss:272-276`) | No MDN page is named | No installed Chrome version | `contain` stops wheel and touch chaining out of a capped popover, dialog, or drawer (`_anchor-position.scss:272-276`; `/home/user/elements/guides/surfaces.md:145`). | It does not lock the document or compensate a scrollbar. |
| `focus({ focusVisible })` | `interface FocusOptions` (`lib.dom.d.ts:794-797`) | No MDN URL on that interface | No installed Chrome version | Options are `focusVisible?: boolean` and `preventScroll?: boolean` (`lib.dom.d.ts:794-797`). | The interface does not trap Tab or restore the previously focused element. |
| `HTMLElement.togglePopover` return values | Same declaration as the Popover row (`lib.dom.d.ts:17881-17885`) | Same MDN pointer, `.../HTMLElement/togglePopover` | No installed Chrome version for the boolean return | The return type is `boolean`. Options include `force` (`lib.dom.d.ts:2844-2846`, `:17885`). | The comment does not define the boolean. |
| `navigator.userActivation` | Vendored user-activation IDL and § 6.4 area (`interactions.md:430-447`) | `https://developer.mozilla.org/docs/Web/API/Navigator/userActivation` (`lib.dom.d.ts:25849-25853`) and `https://developer.mozilla.org/docs/Web/API/UserActivation` (`lib.dom.d.ts:37574`) | No installed Chrome version | `hasBeenActive` is sticky activation. `isActive` is transient activation (`lib.dom.d.ts:37576-37588`; `interactions.md:439-445`). Close-watcher creation beyond one free watcher needs transient activation (`interactions.md:623`). | The properties do not open a popover or satisfy a Bootstrap trigger list. |
| `matchMedia('(prefers-reduced-motion: reduce)')` | No media-queries specification section is vendored | No MDN page is named in the carousel factory | No installed Chrome version | Mailbox carousel reads `.matches` and skips autoplay when the query matches (`/home/user/mailbox/src/browser/factories/createCarousel.ts:173-181`). Elements styles pair transitions with the preference in CSS (`/home/user/elements/guides/styles.md` rule cited by the collapse terrain at `styles.md:131`). | The disclosure factories do not call `matchMedia` (`b-collapse-terrain-report.md:99`). The query does not cancel an in-flight transition by itself. |

## B. Obligation to candidate systems

Plugin obligations are the ones already distilled in `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-terrain-report.md:33-51` and `/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md:23-51`. Each table names the platform features from the preceding section that can carry a concern, and the gap those features leave against that obligation.

### Collapse

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | `<details>` `[open]` and `toggle` (`createDetails.ts:6-10`) | Bootstrap show and hide are methods on any element, with `show` and `hide` classes, not only `<details>` (`b-collapse-terrain-report.md:41`). |
| Cancellation | `preventDefault()` on the summary click (`createDetails.ts:48-57`) | `beforetoggle` on `<details>` is the event the factory refuses as unreliable (`createDetails.ts:59-64`). |
| Focus | None recorded | The obligation writes `aria-expanded` and does not move focus (`b-collapse-terrain-report.md:44-45`). |
| Motion | `interpolate-size: allow-keywords` and `::details-content` (`_details.scss:15-18`, `:59-70`) | Mailbox still measures `scrollHeight` and waits on `transitionend` plus a timeout (`b-collapse-terrain-report.md:82-86`). The ruling refuses that fixed fallback (`ROADMAP.md:147-148`). `calc-size()` is only an example in the rendering notes (`renderings.md:1662`). |
| Placement | None | The panel stays in flow. |
| Dismissal | Exclusive `<details name>` (`interactives.md:42`; `_disclosure.scss:13-14`) | Bootstrap accordion uses the `parent` option, not `name` (`b-collapse-terrain-report.md:40`). |
| Scroll locking | None | Not part of the obligation. |
| Cleanup | `toggle` resyncs external `[open]` writes (`createDetails.ts:66-74`) | Bootstrap `dispose` is the inherited data-key and event removal (`b-collapse-terrain-report.md:47`). |
| Gap | Native disclosure does not emit `show.bs.collapse` or emulate `transitionend` after the duration plus 5 ms (`b-collapse-terrain-report.md:35`, `:46`). | |

### Dropdown

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | Popover API (`createMenu.ts:26-27`) | `popover="manual"` does not light-dismiss; `auto` does, without Bootstrap's `autoClose` values `true`, `inside`, `outside`, and `false` (`_popover.scss:18-19`; `b-collapse-terrain-report.md:49`). |
| Cancellation | Cancelable show and hide in the Mailbox factory (`b-collapse-terrain-report.md:88`) | The platform `toggle` event is after the flip (`createDetails.ts:66-67` describes `toggle` as not cancelable). |
| Focus | Roving `.focus()` in script (`createMenu.ts:31`) | The platform does not provide Arrow, Home, End, or Escape-to-toggle focus (`b-collapse-terrain-report.md:43-45`). |
| Motion | `@starting-style` and `allow-discrete` (`_popover.scss:12-15`) | Bootstrap dropdown show and hide do not wait for a transition (`b-collapse-terrain-report.md:46`). |
| Placement | `position-area` and `position-try-fallbacks` (`_anchor-position.scss:53-58`; `createDropdown.ts:23-30` in Mailbox) | Popper also shifts with `preventOverflow`, applies an offset modifier, and accepts `popperConfig` (`b-collapse-terrain-report.md:49`). The sticky-flip comment says a nested scroll does not recompute the fallback (`_anchor-position.scss:84-94`). Elements says Chromium accepts only physical `position-area` keywords (`constants.ts:660-661`). |
| Dismissal | `popover="auto"` light dismiss, or script for `manual` (`_popover.scss:18-19`; `createMenu.ts:50-52`) | `autoClose: 'inside'` and `'outside'` are not popover states. Tab inside the menu is a Bootstrap reason not to close (`b-collapse-terrain-report.md:43`, `:49`). |
| Scroll locking | `overscroll-behavior: contain` inside the menu (`_anchor-position.scss:272-276`) | That contains the menu's own scroll. It does not lock the page. |
| Cleanup | Popover hide plus ARIA restore in the factories (`b-collapse-terrain-report.md:87-88`) | Bootstrap also destroys the Popper instance (`b-collapse-terrain-report.md:47`). |
| Gap | `data-bs-popper="static"` and navbar static display turn Popper modifiers off (`b-collapse-terrain-report.md:49`). Anchor positioning has no matching static mode in the surface comment. | |

### Tab

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | Script writes `aria-selected` and `[hidden]` (`/home/user/elements/src/browser/factories/createTabs.ts:11-18`) | No platform widget selects one tabpanel and unselects the others. |
| Cancellation | `preventDefault` on click (`b-collapse-terrain-report.md:91`) | There is no native cancelable `show.bs.tab`. |
| Focus | `focus({ preventScroll: true })` matches the option the DOM library types (`lib.dom.d.ts:794-797`; Bootstrap calls that option at `b-collapse-terrain-report.md:45`) | Arrow, Home, and End roving is script (`b-collapse-terrain-report.md:43`). |
| Motion | Elements tabs do not wait for `transitionend` (`createTabs.ts:21-25`) | Bootstrap waits only when `.fade` is present (`b-collapse-terrain-report.md:46`). |
| Placement | None | Panes are in flow. |
| Dismissal | `[hidden]` removes the pane from layout and the accessibility tree (`createTabs.ts:16-19`) | The vendored find-in-page note says `hidden` is the wrong tool for tab panels because they are an overflow presentation (`interactions.md:124` in the earlier grep of that file). That note and the factory's use of `[hidden]` disagree. |
| Scroll locking | None | Not part of the obligation. |
| Cleanup | Inherited Bootstrap `dispose` only (`b-collapse-terrain-report.md:47`) | The platform keeps no tab instance to release. |
| Gap | `role=tablist`, `role=tab`, and `role=tabpanel` stay author script (`b-collapse-terrain-report.md:44`). | |

### ScrollSpy

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | `IntersectionObserver` (`b-collapse-terrain-report.md:93-96`) | The platform observer does not add `.active` or fire `activate.bs.scrollspy`. |
| Cancellation | None in the obligation | Bootstrap has no cancelable pre-change event (`b-collapse-terrain-report.md:42`). |
| Focus | None | `smoothScroll` uses `scrollTo` or `scrollTop` (`b-collapse-terrain-report.md:45`). `scrollIntoView` options in this DOM library are `behavior`, `block`, and `inline` only (`lib.dom.d.ts:2666-2673`). |
| Motion | `scrollend` is declared (`lib.dom.d.ts:16732`) | No factory comment says activation waits for `scrollend`. |
| Placement | `root` when `overflowY` is not `visible`, otherwise the viewport (`b-collapse-terrain-report.md:51`) | `scrollMargin` exists on the declared observer (`lib.dom.d.ts:1340-1345`) and is not the option Bootstrap sets. Bootstrap's default `rootMargin` is `'0px 0px -25%'` and a numeric `offset` replaces it (`b-collapse-terrain-report.md:40`, `:51`). |
| Dismissal | None | Not part of the obligation. |
| Scroll locking | None | The observer watches scroll. It does not lock it. |
| Cleanup | `disconnect()` (`lib.dom.d.ts:23059`; `b-collapse-terrain-report.md:47`) | — |
| Gap | `trackVisibility` is absent from `IntersectionObserverInit` (`lib.dom.d.ts:1340-1345`), so the v2 option is not in this type library. The ruling still names `IntersectionObserver` for Scrollspy (`ROADMAP.md:146-147`). | |

### Modal

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | `<dialog>` `showModal()` and `close()` (`/home/user/elements/src/browser/factories/createDialog.ts:16-24`) | Bootstrap also has non-modal show, `hidePrevented`, and a data API that returns focus to the trigger (`b-modal-terrain-report.md:32-35`). |
| Cancellation | The factory's own show and hide events (`createDialog.ts:25-27`). `closedby` and the `cancel` event cover Escape and light dismiss (`interactives.md:787-799`). | A static backdrop is not a `closedby` keyword. The allowlist is `any`, `closerequest`, `none` (`schema.ts:1548`). |
| Focus | The factory comment says the platform traps Tab while modal (`createDialog.ts:20-22`). `inert` covers the rest of the document (`interactions.md:275-281`). | `createFocus` is a separate script trap (`/home/user/elements/src/browser/factories/createFocus.ts:6-21`). Mailbox modal uses that trap rather than `showModal` as the body (`b-modal-terrain-report.md:69`). |
| Motion | `@starting-style` on `dialog[open]` (`_dialog.scss:244-265`) | Bootstrap waits on `_queueCallback` only when `.fade` is present (`b-modal-terrain-report.md:37`). |
| Placement | Top layer from `showModal()` (`interactions.md:281`) | Not Popper. Centering is CSS. |
| Dismissal | `closedby=any` light dismiss (`interactives.md:787-789`). `CloseWatcher` is implicit (`interactions.md:623`). | `keyboard: false` and a static backdrop run a scale animation instead of hide (`b-modal-terrain-report.md:33`). |
| Scroll locking | The factory comment says `showModal()` locks document scroll (`createDialog.ts:22-24`). | The dialog section that was read does not say that. `lockBodyScroll` still measures `innerWidth - clientWidth` and sets padding (`/home/user/elements/src/browser/helpers.ts:1672-1679`). Bootstrap's `ScrollBarHelper` also sets `overflow: hidden` and adjusts fixed and sticky elements (`b-modal-terrain-report.md:45`). `scrollbar-gutter: stable` reserves space and does not hide the bar (`_scrollbar.scss:10-11`). |
| Cleanup | Dialog cleanup destroys the close watcher (`interactives.md:777-785`) | Bootstrap also disposes the backdrop element and deactivates `FocusTrap` (`b-modal-terrain-report.md:38`). |
| Gap | The native backdrop is `::backdrop`, not a `div.modal-backdrop` (`_popover.scss:21-22`; `b-modal-terrain-report.md:41`). | |

### Offcanvas

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | `popover` on `<aside>` (`createAside.ts:7-31`) | Bootstrap toggles `.show` and can open from a load listener (`b-modal-terrain-report.md:29`). |
| Cancellation | The factory says `beforetoggle` is not cancelable (`createAside.ts:25-27`) | Bootstrap `show` and `hide` are cancelable (`b-modal-terrain-report.md:32`). The vendored `ToggleEvent` note does not say whether `beforetoggle` is cancelable (`interactions.md:461`). |
| Focus | Not trapped by the factory (`createAside.ts:43-48`) | Bootstrap uses `FocusTrap` when scroll is locked or a backdrop is set (`b-modal-terrain-report.md:35`). |
| Motion | `:popover-open`, `@starting-style`, `allow-discrete` (`createAside.ts:13-15`) | The factory removed a `runTransition` wait because `hidePopover()` is what starts the transition (`createAside.ts:40-42`). |
| Placement | Viewport-fixed drawer CSS, excluded from anchor placement (`_anchor-position.scss:38-51`) | Not Popper. |
| Dismissal | `popover="auto"` light dismiss (`createAside.ts:11`, `:49-51`) | Bootstrap static backdrop and `keyboard: false` fire `hidePrevented` (`b-modal-terrain-report.md:32-33`). |
| Scroll locking | The factory does not lock the body (`createAside.ts:46-48`) | Bootstrap locks unless `scroll: true` (`b-modal-terrain-report.md:45`). |
| Cleanup | Restores the previous `popover` value (`b-modal-terrain-report.md:60`) | Bootstrap disposes backdrop and focus trap (`b-modal-terrain-report.md:38`). |
| Gap | No `aria-modal` or `role="dialog"` is written by the factory (`createAside.ts:43-45`). Bootstrap writes both (`b-modal-terrain-report.md:34`). | |

### Tooltip

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | `popover="manual"` (`b-modal-terrain-report.md:61`) | Bootstrap triggers are `hover focus` by default, plus delay (`b-modal-terrain-report.md:30`). Hover is not a popover light-dismiss mode. |
| Cancellation | Cancelable show and hide in the factory (`b-modal-terrain-report.md:61`) | — |
| Focus | Focus is a show trigger in Bootstrap, not a trap (`b-modal-terrain-report.md:35`) | The platform does not implement the `hover focus` trigger list. |
| Motion | Discrete popover entry (`_popover.scss:12-15`) | Bootstrap waits when `animation` or `.fade` is set (`b-modal-terrain-report.md:37`). |
| Placement | `position-area` (`b-modal-terrain-report.md:61`) | Popper's `flip` fallbacks, `offset`, `preventOverflow`, and the arrow modifier (`b-modal-terrain-report.md:39`) are not the same list as `position-try-fallbacks`. |
| Dismissal | Manual hide, or a delay in script (`b-modal-terrain-report.md:61`) | `popover="auto"` would also close on outside click, which a hover tip does not do (`_popover.scss:18-19`). |
| Scroll locking | None | Not part of the obligation. `position-visibility: anchors-visible` hides the tip when the anchor leaves (`surfaces.md:147`). |
| Cleanup | ARIA restore on destroy (`b-collapse-terrain-report.md:89`) | Bootstrap also restores `title` from `data-bs-original-title` and destroys Popper (`b-modal-terrain-report.md:38`). |
| Gap | Sanitizer allowlist stays a compatibility promise (`guides/veneer.md:3954`, `:3974-3975`). `setHTML` is absent from the DOM library (`lib.dom.d.ts` search). | |

### Popover

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | Same popover pipeline as tooltip, default trigger `click` in Bootstrap (`b-modal-terrain-report.md:30`, `:62`) | The element attribute `popover` and the Bootstrap plugin of the same name are different contracts. |
| Cancellation | Factory show and hide (`b-modal-terrain-report.md:62`) | — |
| Focus | No trap | Bootstrap popover inherits tooltip focus-as-trigger (`b-modal-terrain-report.md:35`). |
| Motion | Same discrete entry | Inherited tooltip wait (`b-modal-terrain-report.md:37`). |
| Placement | `position-area`, and Mailbox also applies Bootstrap placement classes (`b-modal-terrain-report.md:62`, `:72`) | Default placement is `right` and offset `[0, 8]`, with a template that still has `role="tooltip"` (`b-modal-terrain-report.md:30`). |
| Dismissal | Click trigger, not hover (`b-modal-terrain-report.md:30`) | `auto` light dismiss is broader than a click toggle. |
| Scroll locking | None | — |
| Cleanup | Restored `aria-expanded`, `aria-haspopup`, and `aria-controls` (`b-modal-terrain-report.md:62`) | — |
| Gap | Content sanitizer is the same open item as tooltip (`b-modal-terrain-report.md:49-51`). | |

### Alert

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | In-flow element. Elements does not use popover (`b-modal-terrain-report.md:63`) | Bootstrap `close` removes the element (`b-modal-terrain-report.md:38`). |
| Cancellation | Cancelable close (`b-modal-terrain-report.md:32`) | No native alert-dismiss event. |
| Focus | None | — |
| Motion | `.fade` plus `_queueCallback` in Bootstrap (`b-modal-terrain-report.md:37`). Mailbox uses `runTransition` (`b-modal-terrain-report.md:73`) | Elements alert comment says it does not use the popover APIs (`b-modal-terrain-report.md:63`). |
| Placement | In flow | — |
| Dismissal | Click on `[data-bs-dismiss="alert"]` (`b-modal-terrain-report.md:29`) | `enableDismissTrigger` is document delegation (`guides/veneer.md:3952`), not `commandfor`. |
| Scroll locking | None | — |
| Cleanup | `close` removes the node, then `dispose` (`b-modal-terrain-report.md:38`) | — |
| Gap | `hidden` and `content-visibility` are not the close animation. | |

### Toast

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | Elements and Mailbox delegate to the popover factory plus a timer (`b-modal-terrain-report.md:64`, `:74`) | Bootstrap autohide is `setTimeout(hide, delay)` and pause on `focusin` (`b-modal-terrain-report.md:35`, `:37`). |
| Cancellation | Inherited popover show and hide | `AbortSignal.timeout` is declared (`lib.dom.d.ts:3424-3428`) and is not what the factories use. |
| Focus | `focusin` pauses autohide in Bootstrap (`b-modal-terrain-report.md:35`) | A popover does not do that pause. |
| Motion | Popover discrete transition, or Mailbox `transitionend` with a fallback (`b-modal-terrain-report.md` mailbox toast row) | The ruling refuses the fixed fallback (`ROADMAP.md:147-148`). |
| Placement | Viewport corner, excluded from anchor placement (`_anchor-position.scss:38-51`) | Not `position-area`. |
| Dismissal | Timer, and a swipe threshold constant of `80` in Elements (`b-modal-terrain-report.md:64`) | Bootstrap toast has no swipe helper. Carousel does. |
| Scroll locking | None | — |
| Cleanup | Popover destroy plus clearing the timer (`b-modal-terrain-report.md:38`) | — |
| Gap | `role="status"` is the toast discriminator in the anchor comment (`_anchor-position.scss:39-51`). Bootstrap toast writes no ARIA in the obligation table (`b-modal-terrain-report.md:34`). | |

### Carousel

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | Script index, `.active`, and next and prev classes (`b-modal-terrain-report.md:65`) | No platform carousel element. |
| Cancellation | Cancelable `slide` (`b-modal-terrain-report.md:32`) | — |
| Focus | None in the obligation | — |
| Motion | Consumer CSS (`b-modal-terrain-report.md:65`). Mailbox skips autoplay under `prefers-reduced-motion` (`createCarousel.ts:173-181`) | Bootstrap waits on `_queueCallback` only when `.slide` is present (`b-modal-terrain-report.md:37`). `scroll-snap` and `scrollend` are not what the factories use. |
| Placement | Slide classes | Not anchor positioning. |
| Dismissal | `pause: 'hover'` and pointer or touch swipe (`b-modal-terrain-report.md:47`) | `overscroll-behavior` contains a gesture. It does not pick a direction. The Swipe helper's threshold is `40` (`b-modal-terrain-report.md:47`). |
| Scroll locking | None | — |
| Cleanup | `swipeHelper.dispose()` (`b-modal-terrain-report.md:38`) | Pointer and touch listeners are script. |
| Gap | Arrow keys are ignored when the target is `input` or `textarea`, and RTL swaps them (`b-modal-terrain-report.md:33`). No platform feature in the preceding section does that mapping. | |

### Backdrop

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | `::backdrop` on `dialog:modal` and on popover (`surfaces.md:156-158`) | Bootstrap appends a real `div`, adds `.fade` and `.show`, and removes the node (`b-modal-terrain-report.md:41`). |
| Cancellation | Click is light dismiss only for `closedby=any` or `popover=auto` (`interactives.md:787-789`; `_popover.scss:18-19`) | A static backdrop still builds a visible div and does not hide (`b-modal-terrain-report.md:41`). |
| Motion | The backdrop partial animates with the host's discrete overlay transition (`/home/user/elements/src/styles/surfaces/_backdrop.scss:82-83`) | Bootstrap uses `executeAfterTransition` (`b-modal-terrain-report.md:41`). |
| Cleanup | The pseudo-element exists only while the host is in the top layer | There is no node to `dispose`. |

### FocusTrap

| Concern | Candidates | Gap |
| --- | --- | --- |
| Focus | `showModal()` as the factory comment states it (`createDialog.ts:20-22`). Otherwise `createFocus` wraps Tab and restores the previous element (`createFocus.ts:6-21`). | Bootstrap listens on `document` for `focusin` and `Tab` and moves focus to the first or last focusable child (`b-modal-terrain-report.md:43`). `inert` removes outside controls from the tab order (`interactions.md:263-269`) and does not by itself restore the trigger. |
| Cleanup | `deactivate` restores focus (`createFocus.ts:16-17`). Dialog cleanup restores the previously focused element without scrolling (`interactives.md:731`). | `focus({ focusVisible })` only affects the call it is passed to (`lib.dom.d.ts:794-797`). |

### ScrollBarHelper

| Concern | Candidates | Gap |
| --- | --- | --- |
| Scroll locking | `scrollbar-gutter: stable` (`_scrollbar.scss:5-11`). `lockBodyScroll` (`helpers.ts:1672-1679`). The dialog factory's native-lock claim (`createDialog.ts:22-24`). | Bootstrap sets `body` `overflow: hidden`, adds the scrollbar width to `padding-right` on `body` and on fixed and sticky selectors, and subtracts it from `margin-right` on `.sticky-top`, then restores those inline values (`b-modal-terrain-report.md:45`). `scrollbar-gutter` does not write those paddings. `lockBodyScroll` sets one `paddingRight` and a data attribute, and does not touch the fixed and sticky selectors. |

### Swipe

| Concern | Candidates | Gap |
| --- | --- | --- |
| Dismissal | Pointer events and touch events are what Bootstrap's helper listens to (`b-modal-terrain-report.md:47`). `overscroll-behavior-inline: contain` keeps a gesture local (`/home/user/elements/src/styles/components/_div.scss:147`). | The helper's threshold is `40`, it chooses left or right callbacks, and it falls back from `PointerEvent` to touch (`b-modal-terrain-report.md:47`). No platform feature in section A encodes that threshold. Elements toast uses `80` (`b-modal-terrain-report.md:64`). |

### Sanitizer

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | `Sanitizer` in the DOM library (`lib.dom.d.ts:34572-34631`). `sanitizeURL` and `sanitizeAttributes` in `@orkestrel/html` (`html/dist/src/core/index.d.ts:1023-1036`, `:1348-1378`). | Bootstrap parses with `DOMParser`, drops tags outside `DefaultAllowlist`, and rejects `javascript:` URLs (`b-modal-terrain-report.md:49`). `setHTML` is not declared. `setHTMLUnsafe` takes a string and no sanitizer (`lib.dom.d.ts:13893`). The HTML package refuses `javascript:`, `data:`, `vbscript:`, and `file:` and always strips `on*` (`html` index `:1029-1030`, `:1348-1352`), which is a different allowlist from Bootstrap's `aria-*` pattern and `sanitizeFn` override (`b-modal-terrain-report.md:49`; `guides/veneer.md:3954`). |

### TemplateFactory

| Concern | Candidates | Gap |
| --- | --- | --- |
| Lifecycle | `@orkestrel/template` `createTemplate` fills `{{name}}` placeholders (`node_modules/@orkestrel/template/dist/src/core/index.d.ts:8-22`). A search of that declaration file found no `toHtml`, `allowList`, or `sanitize`. | Bootstrap `toHtml` sanitizes a template string, fills `{ selector: text }` slots, and adds `extraClass` (`b-modal-terrain-report.md:51`). The Orkestrel template declaration is a string catalog, not that DOM filler. |

## C. Elements and Mailbox as prior art

The collapse terrain already maps the disclosure factories (`b-collapse-terrain-report.md:77-99`). The modal terrain maps the overlay factories (`b-modal-terrain-report.md:53-77`). The lessons below are the comments those greps land on. Every factory the terrains name imports `@vue/reactivity`, which the construction paragraph refuses (`ROADMAP.md:147`; `b-collapse-terrain-report.md:79`).

| Obligation | Elements factory | Mailbox factory | Platform the comment names | Lesson the comment records |
| --- | --- | --- | --- | --- |
| Collapse | `createDetails` | `createCollapse` | `<details>`, `toggle`, `interpolate-size` | Elements does not run a JS height transition (`createDetails.ts:12-17`). It uses the summary click because `beforetoggle` on `<details>` is treated as unreliable (`createDetails.ts:59-64`). Mailbox cancels an in-flight callback and times out `transitionend` (`/home/user/mailbox/src/browser/helpers.ts:146-173`). |
| Dropdown | `createMenu` | `createDropdown` | Popover plus `position-try-fallbacks` | Elements writes an inline `max-block-size` because the surface layer would beat a component override (`createMenu.ts:57-70`). `flip: 0` drops the block-axis fallback (`createMenu.ts:70`). Mailbox says the browser picks the side before paint (`createDropdown.ts:23-30`). |
| Tab | `createTabs` | `createTab` | `[hidden]`, `aria-selected` | Elements stopped awaiting `transitionend` because the tab chrome declares no transition, so the wait was a dead `400` ms (`createTabs.ts:21-25`). |
| ScrollSpy | `createNav` | `createScrollSpy` | `IntersectionObserver` | The terrain records `aria-current="location"` in Elements and both `.active` and `aria-current` in Mailbox (`b-collapse-terrain-report.md:93-96`). |
| Modal | `createDialog` | `createModal` | `<dialog>` `showModal` in Elements; a backdrop element in Mailbox | Elements says the platform owns the trap and the backdrop, and claims `showModal()` locks scroll (`createDialog.ts:20-24`). Mailbox bridges a native `cancel` only when the host happens to be a `<dialog>` (`b-modal-terrain-report.md:69`). |
| Offcanvas | `createAside` | `createOffcanvas` | Popover API | Elements refuses to wire `aria-modal`, `role`, `inert`, and body scroll lock, and refuses to reimplement light dismiss (`createAside.ts:43-51`). Waiting for `transitionend` before `hidePopover()` waited for a transition that had not started (`createAside.ts:40-42`). |
| Tooltip and Popover | `createTooltip`, `createPopover` | the Mailbox twins | `popover="manual"`, `position-area` | Elements says `position-try-fallbacks` flips placement and the factory never imports `'vue'` (`/home/user/elements/src/browser/factories/createPopover.ts:38-52`). A toast is excluded from anchor placement because it carries `role="status"` (`createPopover.ts:28-36`). |
| Alert | `createAlert` | `createAlert` | None of the listed platform APIs | The terrain says alerts stay in flow (`b-modal-terrain-report.md:63`, `:73`). |
| Toast | `createToast` | `createToast` | Popover | Delegated to the popover factory plus a timer (`b-modal-terrain-report.md:64`, `:74`). |
| Carousel | `createCarousel` | `createCarousel` | `matchMedia` in Mailbox only | Mailbox skips autoplay when `prefers-reduced-motion: reduce` matches, and reads the query again on each `start()` (`createCarousel.ts:173-181`). Elements carousel comment says it does not call `matchMedia` (`b-modal-terrain-report.md:65`). |
| FocusTrap | `createFocus` | `createFocus` | None | The trap is activate and deactivate. An empty host makes `activate()` a no-op (`createFocus.ts:23-26`). |
| ScrollBarHelper | `lockBodyScroll` in `helpers.ts` | Mailbox modal and offcanvas lock in their factories | Width compensation | The Elements helper saves `paddingRight` and sets a data attribute. The comment says `useDialog` and `useAside` share the counter (`helpers.ts:1657-1679`). |
| Swipe | `createDrag` is selection, not an overlay swipe (`b-modal-terrain-report.md:66`) | `createDrag` likewise | Pointer events | Carousel swipe thresholds stay constants, not a platform call (`b-modal-terrain-report.md:65-66`). |

Guide lessons already recorded by the terrains: a disclosure is `<details>` (`/home/user/elements/guides/styles.md` rule 6, cited at `b-collapse-terrain-report.md:107`); a modal is `<dialog>` and a drawer is `<aside popover>` (`b-modal-terrain-report.md:79-83`); `position-visibility: anchors-visible` is named at `surfaces.md:147`.

## D. The Orkestrel surface

`ls node_modules/@orkestrel` lists `abort`, `codec`, `console`, `contract`, `database`, `emitter`, `guide`, `html`, `indexeddb`, `lsp`, `markdown`, `mcp`, `probe`, `process`, `queue`, `router`, `scaffold`, `server`, `sqlite`, `sse`, `template`, `test`, `timeout`, `tool`, and `websocket`.

Primitives an engine can reuse, limited to symbols the declarations export:

| Package | Declaration | Primitives |
| --- | --- | --- |
| `@orkestrel/contract` `0.0.17` | `dist/src/core/index.d.ts` | `Guard` (`:1837`), `attempt` (`:205`), `isInstance` (`:2874`), `literalOf` (`:3828`), `andOf` (`:53`), `whereOf` (`:6643`), `instanceOf` (`:2136`). The file continues with the rest of the guard and shape catalog. |
| `@orkestrel/abort` `0.0.11` | `dist/src/core/index.d.ts` | `Abort` (`:28`), `createAbort` (`:120`). The comment says a parent `signal` is linked with `AbortSignal.any`, the first reason sticks, and the native `AbortSignal` is the observation surface (`:12-19`). |
| `@orkestrel/emitter` `0.0.10` | `dist/src/core/index.d.ts` | `createEmitter` (`:30`), `Emitter` (`:67`), `EmitterInterface` (`:109`). A search of this file found no `Deferred` symbol. |
| `@orkestrel/timeout` `0.0.11` | `dist/src/core/index.d.ts` | `createTimeout` (`:36`), `Timeout` (`:108`). The package description calls it a `setTimeout` wrapper with an `AbortSignal` deadline. A search of this file found no `Deferred` symbol. |
| `@orkestrel/queue` | `dist/src/core/index.d.ts` | `createQueue` (`:115`). `isQueueSignal` narrows `AbortSignal` (`:225`). `QueueCode` includes `'aborted'` and `'timeout'` (`:380`). |
| `@orkestrel/test` `0.0.20` | `dist/src/core/index.d.ts` | `createRecorder` (`:149`), `createRecorders` (`:167`), `createSignal` (`:185`). `SignalInterface` holds a real `AbortController` and a listener tally (`:559-565`). Browser `waitForAnimations` is at `dist/src/browser/index.d.ts:2992`. |
| `@orkestrel/html` | `dist/src/core/index.d.ts` | `isSafeURL` (`:1036`), `sanitizeAttributes` (`:1363`), `sanitizeURL` (`:1379`). The URL floor refuses `javascript:`, `data:`, `vbscript:`, and `file:` (`:1029-1030`). |
| `@orkestrel/template` | `dist/src/core/index.d.ts` | `createTemplate` (`:37`) fills `{{name}}` text. A search found no `toHtml`, `allowList`, or `sanitize`. |
| `@orkestrel/database` | `dist/src/core/index.d.ts` | `checkAbort` (`:117`) takes an optional `AbortSignal`. |
| `@orkestrel/server` `0.0.20` | `dist/src/server/index.d.ts` | `createServer` (`:391`). `ServerInterface` includes `start(signal?: AbortSignal)`, `stop`, and `destroy` (`:1606-1608`). That lifecycle is the HTTP server, not a widget. |

The other installed packages export adjacent tools, not the guard, emitter, abort, or recorder set named above. Entry points read: `@orkestrel/codec` encode and decode functions (`dist/src/core/index.d.ts:21`); `@orkestrel/console` `Logger` (`:1016`); `@orkestrel/guide` is the guides-parity tester described in its `package.json`; `@orkestrel/indexeddb` `createIndexedDBDatabase` (`dist/src/browser/index.d.ts:46`); `@orkestrel/lsp`, `@orkestrel/mcp`, `@orkestrel/markdown` `createMarkdown` (`dist/src/core/index.d.ts:238`), `@orkestrel/probe` `computeReceipt` (`:230`), `@orkestrel/process` `ProcessError` (`dist/src/core/index.d.ts:329`), `@orkestrel/router` `compilePath` (`dist/src/core/index.d.ts:168`), `@orkestrel/scaffold` the scaffold command package, `@orkestrel/sqlite` `createSQLiteDatabase` (`dist/src/server/index.d.ts:41`), `@orkestrel/sse`, `@orkestrel/tool`, and `@orkestrel/websocket` as their `package.json` descriptions state. No declaration read in this pass exports a widget lifecycle or a deferred.

## E. Bootstrap's own compatibility surface

`guides/veneer.md` `## Compatibility` opens with this scope:

> This section is the ledger of what Veneer accepts from Bootstrap 5.3.8. The tests/conformance.test.ts proof reads its rows and compares their named steps with the official Button recording. The Component column carries the inventory key, so later component units extend the same table; engine names the shared official engine and is never shipped as CSS.

The accepted-scope paragraph (`guides/veneer.md:3960-3967`):

> An accepted row records scope; a named Proof step obliges the official recording to agree with the row. A shipped selector or variable row requires its official vocabulary less the deferrals under § Styles to be present in the built cascade; no deferred name may be present, and each must belong to the official inventory of a component with a CSS row. The conformance component list includes a key exactly when its selector and variable rows are shipped. Those CSS rows carry a dash in Proof, as do source and engine obligations the Button interaction recording cannot drive. Transition, dismissal, sanitizer, and selector engine rows record shared engine scope; they do not claim that Button dispatches transition events. The jQuery rows retain the source inventory while the exclusion that follows limits the claim.

The jQuery exclusion and the Popper sentence (`guides/veneer.md:3969-3975`):

> The compatibility claim excludes contextual Reboot selectors that combine bare tags: nested ordered and unordered lists, code inside preformatted text or links, nested keyboard tags, and the sibling after a legend. It also excludes the jQuery interface and plugin registration, the window.bootstrap global and UMD namespace, and Bootstrap's Sass variables, maps, and mixins as a source API. Popper pass-through positioning options remain accepted wire keys with platform anchoring as an accepted difference. The sanitizer allowlist and sanitizer overrides remain in scope for the overlay unit.

Every `engine` row in that table (`guides/veneer.md:3938-3958`), each with Proof `—` and Status `accepted`:

| Kind | Obligation |
| --- | --- |
| identity | `VERSION` `'5.3.8'`; `DATA_KEY` `bs.${NAME}`; `EVENT_KEY` `.${DATA_KEY}`; `eventName(name)` returns `${name}${EVENT_KEY}` |
| option | `Default` / `DefaultType` inherited empty from `Config` unless a component overrides |
| attribute | `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last |
| method | `constructor(element, config)` no-op when `getElement(element)` is falsy; `dispose()`; `_queueCallback` through `executeAfterTransition` |
| method | static `getInstance`, static `getOrCreateInstance(element, config = {})`, static `VERSION` |
| initialization | `Data.set(this._element, DATA_KEY, this)` on construction |
| method | All API methods are asynchronous, return to the caller before the transition ends, and a method call mid-transition is ignored |
| method | `dispose()` must not follow `hide()` immediately; wait for the completion event |
| event | Every plugin fires paired infinitive and past-participle events; `EventHandler.trigger` builds `new Event(event, { bubbles, cancelable: true })` and hydrates the payload |
| event | Infinitive events are cancelable through `event.preventDefault()`; returning `false` from a handler also cancels |
| option | `Config._mergeConfigObj`: `Default`, then `data-bs-config` JSON, then `getDataAttributes`, then the `config` object; `_typeCheckConfig` type-checks against `DefaultType` |
| attribute | `Manipulator.getDataAttributes` reads every `dataset` key starting `bs` except `bsConfig` |
| method | `SelectorEngine.getSelector` reads `data-bs-target` else `href`; plus `find`, `findOne`, `children`, `parents`, `prev`, `next`, `focusableChildren`, `getElementFromSelector`, `getMultipleElementsFromSelector` |
| method | `Data.set` / `get` / `remove`; one instance per element, a second key logs an error and returns |
| attribute | `enableDismissTrigger(component, method = 'hide')` binds document `click.dismiss${EVENT_KEY}` on `[data-bs-dismiss="${NAME}"]` |
| transition | `TRANSITION_END` emulation: listens `transitionend`, emulates after `getTransitionDurationFromElement` plus `5` ms through `executeAfterTransition` |
| accessibility | Sanitizer allowlist and `sanitizeFn` override on Tooltip and Popover content |
| attribute | Native `querySelector` / `querySelectorAll`; a CSS special character in a selector must be escaped |
| option | Base `Config` class; `Default: {}`, `DefaultType: {}`; `NAME` getter throws; extended by `BaseComponent`, `Backdrop`, `FocusTrap`, `Swipe`, `TemplateFactory` |
| method | `getUID`, `getElement`, `isElement`, `isVisible`, `isDisabled`, `isRTL`, `toType`, `noop`, `parseSelector`, `reflow`, `execute`, `findShadowRoot`, `getNextActiveElement` |
| initialization | `getjQuery` skipped when `document.body` carries `data-bs-no-jquery`; `defineJQueryPlugin` registers `$.fn[NAME]` after `onDOMContentLoaded` |

The collapse terrain says no compatibility row names Collapse, Dropdown, Tab, or ScrollSpy (`b-collapse-terrain-report.md:53`).

## Contradictions

- The brief's session tip `87ff1d0` is not this checkout's `HEAD`.
- `createDialog` says `showModal()` locks document scroll (`createDialog.ts:22-24`). The vendored dialog section describes inertness, the top layer, and `::backdrop`, and says focus restoration must not scroll the viewport (`interactives.md:275-281`, `:731`). It does not describe `overflow: hidden` or scrollbar compensation. `lockBodyScroll` still compensates `paddingRight` (`helpers.ts:1672-1679`), and its comment says `useDialog` and `useAside` call it (`helpers.ts:1657-1658`). `createAside` says a consumer who wants a lock uses that helper or `<dialog>` (`createAside.ts:46-48`).
- Elements' anchor comment says Mailbox rejected `position-try-order: most-block-size` as too greedy (`_anchor-position.scss:137-140`). Mailbox `createDropdown` says the stylesheet uses `position-try-order: most-block-size` (`createDropdown.ts:23-26`).
- `createAside` says native `beforetoggle` is not cancelable (`createAside.ts:25-27`). The vendored `ToggleEvent` note does not say whether the event is cancelable (`interactions.md:461`). `createDetails` avoids `beforetoggle` for a different stated reason, reliability (`createDetails.ts:59-64`).
- `createTabs` hides panes with `[hidden]` (`createTabs.ts:16-19`). The vendored `hidden` note says that attribute is the wrong tool for tab panels (`interactions.md:124`).
- Elements comments describe a Chrome `148+` `@starting-style` leak (`surfaces.md:92`; `_dialog.scss:256-259`). The receipt host is Chromium `141` (`ROADMAP.md:221`).
- The DOM library declares `Sanitizer` and `setHTMLUnsafe(html: string)` and does not declare `setHTML` (`lib.dom.d.ts:13893`, `:34572`). The `setHTMLUnsafe` comment talks about filtering elements, and the signature takes no sanitizer.
- The construction paragraph refuses the fixed transition fallback (`ROADMAP.md:147-148`). The compatibility row still accepts `transitionend` emulation after the duration plus `5` ms (`guides/veneer.md:3953`). Mailbox `runTransition` is that fallback (`helpers.ts:146-168`).

## Unresolved inputs

Chromium shipping status was not read for any feature in section A, because the web tools were rejected. The author versions cited above stay unverified against Chromium `141.0.7390.37`.

These features have no installed Chrome version comment at all: `<dialog>` `showModal`, `closedby`, `inert`, `command` / `commandfor` / `CommandEvent`, `ResizeObserver`, `scroll-snap`, `scrollend`, `scrollIntoView` options, `CloseWatcher`, `AbortSignal.any`, `AbortSignal.timeout`, `getAnimations`, `finished`, `commitStyles`, `Element.setHTML`, the Sanitizer API, `overscroll-behavior`, `focus({ focusVisible })`, the `togglePopover` boolean, `navigator.userActivation`, and `matchMedia('(prefers-reduced-motion: reduce)')`.

Also unread: the MDN pages named only as links inside `lib.dom.d.ts` and the vendored guides; the CSS anchor, transitions, scrollbars, and media-queries specification sections; whether `beforetoggle` is cancelable; what the `togglePopover` boolean means; and whether `showModal()` locks scroll in Chromium 141. `CloseWatcher` and `IntersectionObserver` `trackVisibility` are absent from the installed `lib.dom.d.ts`, which does not settle whether Chromium 141 implements them.
