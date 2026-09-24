# J-HELPERS terrain — the Orchestrator's first-hand readings (2026-09-24)

Subject: Veneer `main` at `7e96cf8` (Alert, Tab, ScrollSpy, Dropdown, Carousel, Modal landed) plus the toast landing in `tmp/worktrees/toast` (its delegate fold adds `#dismissToast` through the shared `#reach`, `#locate`, and `#construct`, and no traversal shape of its own). Line numbers are approximate and name the member; locate each site by its symbol. Where the Grok distillate beside this file (`j-helpers-absorb-distillate.md`, and its successor `j-helpers-absorb-2-distillate.md` when present) disagrees with a reading here, the lane stops and names the disagreement.

## The centralized files

- `src/browser/helpers.ts` exports, in file order: `emitEvent` (around line 21), `bindEventMap` (47), `reflow` (124), `readTargets` (147), `readTarget` (182), `resolveOptions` (212), `resolveVocabulary` (260), `readTag` (289), `computeNeighbor` (314), `readControls` (343), `isDisabled` (369), `matchesReducedMotion` (392), `settleAnimations` (after it).
- `src/browser/validators.ts` exports `isClassToken`, `isAttributeName`, `isSelector`, and one `is{Entity}Event` guard per engine (button, collapse, alert, tab, scrollspy, dropdown, carousel, modal; the toast landing appends `isToastEvent`).
- `src/browser/parsers.ts` exports `parseElement`, `parseRootMargin`, `parseThreshold`, `parseDismiss`, `parseOffset`, `parseStatic`, `parseRide`, `parseBackdrop`.
- `readTarget(trigger, attributes)` reads the trigger's target attribute or `href` fragment and returns the one HTML element it names, `undefined` otherwise; `readTargets` returns every element a selector-valued target names. `readControls(list, selectors)` lists the controls inside a tab list. `isDisabled(element, token)` is the one disabled reading (E16): the token, the `disabled` attribute, or the `:disabled` state. `computeNeighbor` is the wrapping previous/next/first/last index step.

## The DOM traversal and reading members, per class

### Delegate (`src/browser/Delegate.ts`)

- `#closest(target, selector)` (around line 517): `target.closest(selector)`, an `HTMLElement` guard, and `this.#root.contains(element)`; `undefined` otherwise. Every route's trigger read goes through it.
- `#locate(trigger, classes, attributes)` (around 594): `isDisabled(trigger, classes.disabled)` first; then `readTarget(trigger, attributes) ?? trigger.closest('.' + CSS.escape(classes.host))`; then the `HTMLElement` guard and root containment. Shared by the alert, modal-dismiss, and toast-dismiss routes through `#reach`, and by the `#conflicts` entries.
- `#locateToggle(target)` (around 707): the target's own closest trigger inside the root (a disabled one returns `undefined`); else `container = target.closest(menu)`; then the container's previous siblings, then its next siblings, the first matching the trigger selector and not disabled; then the container's parent's first matching descendant not disabled. Each found sibling is re-read through `#closest`, so root containment holds on every branch.
- `#slideControl(target)` (around 760): `#closest` on `[step], [index]` (both attribute names escaped), then the attribute validity read (`parseInteger` of `index`, or `step` equal to `next` or `prev`).
- `#slideHost(control)` (around 770): `readTarget(control, attributes)`, root containment, then the `host` token.
- `#readModal(trigger)` (around 814): `readTarget` plus root containment.
- `#routeTabKey` (around 640): `control.closest(list)` with the `HTMLElement` guard, then `readControls(list, selectors).filter(not isDisabled)` and `computeNeighbor`.
- `#routeModal` reads the first shown modal as `this.#root.querySelector('.host.shown')`.

### Tab (`src/browser/Tab.ts`)

- `#list()` (around 255): `host.closest(selectors.list)` with the guard; `undefined` otherwise.
- `#sibling()` (262): `readControls(list, selectors).find(other than host and carrying the active token)`.
- `#wrapper(control)` (272): `control.closest(':is(wrapper, entry)')`, else the control itself (never `undefined`).
- `#dropdown(control)` (279): the wrapper carrying the `dropdown` token, then `querySelector(toggle)` and `querySelector(menu)` inside it, into a `TabDropdown` record.

### Collapse (`src/browser/Collapse.ts`)

- `#triggers()` (around 322): `ownerDocument.querySelectorAll(selectors.trigger)` filtered to HTML elements whose `readTargets` include the host (document-wide, not root-bounded).
- `#siblings()` (331): inside `#parent`, the panels matching `host.shown, transition` minus the host and minus the nested set `parent.querySelectorAll(':scope P P')` where `P` is `:is(.host, .transition)`.

### ScrollSpy (`src/browser/ScrollSpy.ts`)

- `#section(link)` (around 239): the hash of an anchor or area, else `''`; the disabled reading by hand — the `disabled` token, or a `disabled` attribute whose value is not `'false'` (not through `isDisabled`, and not reading `:disabled`); `decodeURI(hash.slice(1))` inside a `try`; `this.#host.querySelector('#' + CSS.escape(id))`; the guard and `checkVisibility({ visibilityProperty: true })`.
- `#parents(link)` (around 311): a link carrying the `entry` token resolves to its closest `dropdown` inside `#target` and that menu's `toggle`; otherwise a walk: `holder = link.parentElement?.closest(list)` while the holder is inside the target and is not the target, taking the holder's nearest previous sibling matching `parent`, then `holder = holder.parentElement?.closest(list)`.
- `#apply` clears `target.querySelectorAll('[href].' + CSS.escape(active))`.

### Carousel (`src/browser/Carousel.ts`)

- `#items()` (around 556): `host.querySelectorAll(entry)` minus the nested set `host.querySelectorAll(':scope E E')` with `E` as `:is(entry)`; the same shape as `Collapse.#siblings`.
- `#active(items)` (565): the first item carrying the active token.
- `#indicators(selector)` (571): `host.querySelector(indicators)` then `querySelectorAll(selector)` inside it, filtered to HTML elements; empty when the host has no indicator list.

### Dropdown (`src/browser/Dropdown.ts`)

- `#locate(host)` (around 363): the host's next siblings, then its previous siblings, the first matching `selectors.menu`; then the parent's first matching descendant. The mirror of `Delegate.#locateToggle` with the direction order reversed (next then previous), no disabled predicate, and no root containment.
- `#resolveReference(host)` (382): the `reference` attribute parsed as `toggle` or `parent`, throwing `DROPDOWN_OPTION_INVALID` otherwise.

### Modal and ScrollLock

- `Modal.#adjust()` (around 413) and the `ScrollLock` constructor (around lines 73 and 81) each compute the scrollbar width as `Math.abs(defaultView.innerWidth - documentElement.clientWidth)` with `0` for a `null` view; `ScrollLock` computes it twice (before and after hiding the overflow) and pads the body and every `fixed` or `sticky` element whose width reaches the window.

### Isolation

- The constructor (around line 61) collects the ancestor chain from the host to the body into a `Set<Element>` (stopping at the body or at a node with no parent), then claims each HTML element in it.

## The repeated shapes

| Shape | Sites | Differences between the sites |
| --- | --- | --- |
| Closest ancestor matching a selector, bounded to a root | `Delegate.#closest`; `Tab.#list`, `Tab.#wrapper`, `Delegate.#routeTabKey` (unbounded `closest` with the guard); `ScrollSpy.#parents` (bounded to `#target` by `contains`) | Root containment present only in the delegate and the scrollspy walk; the tab wrapper falls back to the control rather than `undefined` |
| Sibling search in one direction then the other, then the parent's descendants | `Delegate.#locateToggle` (previous then next, disabled predicate, root containment through `#closest`); `Dropdown.#locate` (next then previous, no predicate, no root) | Direction order, the predicate, the containment |
| Outermost matches of a selector inside a root (`:scope S S` nested-set exclusion) | `Collapse.#siblings`; `Carousel.#items` | The collapse site also excludes the host and reads a two-token selector |
| The element a trigger names by its target attribute or `href` fragment, else the closest ancestor carrying a token, inside the root | `Delegate.#locate`; `Delegate.#readModal` and `#slideHost` (target only, no closest fallback) | The closest fallback and the disabled predicate are the `#locate` extras; `#slideHost` adds the host-token check |
| The ancestors of an element up to the body | `Isolation` constructor | One site |
| Scrollbar width of a document | `Modal.#adjust`; `ScrollLock` constructor (twice) | None in the expression; the callers differ in what they pad |
| A fragment identifier decoded from a link's hash and looked up by id, visible | `ScrollSpy.#section` | One site; its disabled reading duplicates `isDisabled` by hand |
| A disabled reading | `isDisabled` (helpers) at every delegate route and the tab key route; `ScrollSpy.#section` by hand | The scrollspy site omits `:disabled` and reads the attribute value against `'false'` |

## The prior art read first-hand

- `elements/src/browser/traversals.ts`: predicate-based and selector-based ancestor traversals, closest-with-self, child, sibling, and descendant traversals, `getAncestors(element, boundary)`, `isDescendantOf`, a `delegate` helper, batch DOM operations, and `findByKey`. Its contracts return `null` for absence and take predicates where Veneer takes selectors; none is root-bounded the way `Delegate.#closest` is.
- `elements/src/browser/helpers.ts` (around 2277 lines): `bindEventMap`, `dispatch`, `emit`, `listen`, `isFocusable`, `findFocusableElements`, `rove`, table and form helpers, and a `lockBodyScroll` named in its header.
- `mailbox/src/browser/helpers.ts` (around 907 lines): `bindEventMap`, `runTransition`, `detectMenu`, `rove`, popover helpers.
- `@orkestrel/test` 0.0.22 as installed in Veneer: the browser entry exports `isReachable`, `isRendered`, `readHit`, `resolveRendered`, `readClasses`, `readRows`, `extractOrphans`, `describeTree`, `FOCUSABLE_SELECTOR`, `mount`, `render`, `build`, `readStyle`, `waitForAnimations`, `createPointerEvent`, among others; the core entry exports `createRecorder`, `waitForCondition`, `waitForEvent`, `waitForAbort`, `waitForDelay`, `retryUntil`, `requireValue`, among others. Production source under `src/` never imports it.
- `veneer/tests/setupBrowser.ts`: 42 exports (`scene`, the `mount*`, `read*`, `collect*`, `record*` families, `drive`, `hold`, `pressOracle`, and the rest) with no name collision against the installed `@orkestrel/test` entries; it imports `createRecorder` and `requireValue` from `@orkestrel/test` and more from `@orkestrel/test/browser`.

## Dependencies and names

- Veneer declares `@orkestrel/contract` (used: `isInstance`, `instanceOf`, `parseInteger`, `parseEnum`, `parseBoolean`, `parseNumber`) and `@orkestrel/test` as a development dependency. It declares neither `@orkestrel/elements` nor `@orkestrel/mailbox`, and no dependency enters without the user's ruling.
- The scaffold checkout hosts no elements, mailbox, or veneer guide under `guides/`, so a fleet bare-name claim for those packages is read from each package's own `guides/` folder. `scaffold/host.json` records the pre-existing fleet collisions the names rule tolerates.
- `.claude/rules/names.md` registers the helper prefixes `read*`, `resolve*`, `scan*`, `collect*`, `filter*`, and `matches*`; `find*` is not a registered prefix.
