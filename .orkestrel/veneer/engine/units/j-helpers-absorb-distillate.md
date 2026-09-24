# J-HELPERS absorption — the Grok distillate (retained 2026-09-24)

Lane: `grok` on Cursor Grok (`grok-4.7-high`, print mode, `--mode=ask`). Journal: `tmp/cursor/j-helpers-absorb.jsonl` (swept at acceptance; the launch copy of the brief sat at `tmp/cursor/j-helpers-absorb-brief.md`, retained beside this file as `j-helpers-absorb-brief.md`). Session id: `8db34862-953e-4ef8-b836-f3ee23b4ba96`. Duration: 373027 ms. Launch deviation, the Orchestrator's: the launch argument named the brief at `.orkestrel/veneer/engine/units/j-helpers-absorb-brief.md`, a path that did not exist, and the lane located the brief under `tmp/cursor/` by search and executed it; the working directory was the scaffold checkout rather than the projects root, and every scoped absolute path read.

I'll read the brief first and follow its return shape exactly.The path in the request is missing. The same brief is under `tmp/cursor`, so I’ll read that and follow it.The brief is an absorption pass over Veneer’s DOM-reading leaves and the fleet’s matching exports. I’ll load the leaf test, then inventory those members.Grep stays inside this checkout, so I’ll read the Veneer engine files directly and classify each private member.The leaf inventory is in hand. Next I’ll match those shapes to the elements, mailbox, and test exports, and to the fleet surface names.Question: Which Veneer browser-engine private members and `helpers.ts` exports are pure DOM traversal or reading leaves, and which `@orkestrel/elements`, `@orkestrel/mailbox`, or `@orkestrel/test` export already has the same, a wider, or a narrower contract?

Evidence:

Leaf test used: `.claude/rules/architecture.md:178-183`. (a) arguments in, value out, no `#` field except a vocabulary table. (b) a composition of those reads that also reads other `#` state or calls a sibling. (c) defining spine, counted only.

**(a) `src/browser/helpers.ts`**

| Member | Signature | `#` fields | Callers |
| --- | --- | --- | --- |
| `reflow` `helpers.ts:124` | `(element: Element): void` — `getBoundingClientRect()` | none | `Alert.ts:129`, `Collapse.ts:228`, `Modal.ts:271`, `Carousel.ts:426` |
| `readTargets` `helpers.ts:147` | `(trigger: Element, attributes: AttributeMap<'target'>): readonly HTMLElement[]` | none | `Collapse.ts:237`, `Collapse.ts:325`, `Delegate.ts:495` |
| `readControls` `helpers.ts:343` | `(list: HTMLElement, selectors: Pick<TabSelectorMap, 'link' \| 'entry' \| 'toggle' \| 'trigger'>): readonly HTMLElement[]` | none | `Tab.ts:265`, `Tab.ts:300`, `Delegate.ts:635` |
| `isDisabled` `helpers.ts:369` | `(element: Element, token: string): boolean` | none | `Delegate.ts:500`, `Delegate.ts:599`, `Delegate.ts:614`, `Delegate.ts:636`, `Delegate.ts:659`, `Delegate.ts:711`, `Delegate.ts:719`, `Delegate.ts:727`, `Delegate.ts:733` |
| `matchesReducedMotion` `helpers.ts:392` | `(element: Element): boolean` | none | `Carousel.ts:603` |
| `readTag` `helpers.ts:289` | `(value: unknown): string \| undefined` — `tagName` | none | `Button.ts:43`, `Alert.ts:67`, `Isolation.ts:64`, `Swipe.ts:49`, `Collapse.ts:88`, `Placement.ts:70`, `Modal.ts:112`, `Dropdown.ts:90`, `Tab.ts:84` |

`readTarget` `helpers.ts:182` `(trigger: Element, attributes: AttributeMap<'target'>): HTMLElement \| undefined` calls `readTargets` and returns `[0]`. Callers: `Tab.ts:106`, `Tab.ts:170`, `Tab.ts:311`, `Delegate.ts:771`, `Delegate.ts:815`. Classed (b) because it calls a sibling.

Not DOM reads, classed (c): `emitEvent` `helpers.ts:21`, `bindEventMap` `helpers.ts:47`, `settleAnimations` `helpers.ts:85`, `resolveOptions` `helpers.ts:212`, `resolveVocabulary` `helpers.ts:260`, `computeNeighbor` `helpers.ts:314`.

**(a) `#` methods**

| Member | Signature | `#` read | Callers |
| --- | --- | --- | --- |
| `Dropdown.#locate` `Dropdown.ts:363` | `(host: HTMLElement): HTMLElement \| undefined` | `#selectors.menu` | `Dropdown.ts:115` |
| `Dropdown.#resolveReference` `Dropdown.ts:382` | `(host: HTMLElement): HTMLElement` | `#attributes.reference` | `Dropdown.ts:143` |
| `Collapse.#transitioning` `Collapse.ts:288` | `(panels: readonly HTMLElement[]): boolean` | `#classes.transition` | `Collapse.ts:154`, `Collapse.ts:159` |
| `Tab.#wrapper` `Tab.ts:272` | `(control: HTMLElement): HTMLElement` | `#selectors.wrapper`, `#selectors.entry` | `Tab.ts:280`, `Tab.ts:303` |
| `Tab.#absent` `Tab.ts:324` | `(planned, element, name): boolean` — `hasAttribute` | none | `Tab.ts:297`, `Tab.ts:304`, `Tab.ts:308`, `Tab.ts:313`, `Tab.ts:316` |
| `Carousel.#active` `Carousel.ts:565` | `(items: readonly HTMLElement[]): HTMLElement \| undefined` | `#classes.active` | `Carousel.ts:284`, `Carousel.ts:325`, `Carousel.ts:646` |

**(b)**

| Member | Signature | `#` or sibling | Callers |
| --- | --- | --- | --- |
| `Collapse.#dimension` `Collapse.ts:317` | `(): 'width' \| 'height'` | `#host`, `#classes.horizontal` | `Collapse.ts:169`, `Collapse.ts:219` |
| `Collapse.#triggers` `Collapse.ts:322` | `(): readonly HTMLElement[]` | `#host`, `#selectors`, `#attributes`; calls `readTargets` | `Collapse.ts:170`, `Collapse.ts:220` |
| `Collapse.#siblings` `Collapse.ts:331` | `(): readonly HTMLElement[]` | `#parent`, `#host`, `#classes` | `Collapse.ts:154`, `Collapse.ts:158` |
| `Dropdown.#position` `Dropdown.ts:398` | `(): PlacementPosition` | `#host`, `#menu`, `#classes`; `getComputedStyle` `--bs-position` | `Dropdown.ts:294` |
| `Tab.#list` `Tab.ts:255` | `(): HTMLElement \| undefined` | `#host.closest(#selectors.list)` | `Tab.ts:263`, `Tab.ts:294` |
| `Tab.#sibling` `Tab.ts:262` | `(): HTMLElement \| undefined` | calls `#list`, `readControls` | `Tab.ts:151`, `Tab.ts:162`, `Tab.ts:235` |
| `Tab.#dropdown` `Tab.ts:279` | `(control: HTMLElement): TabDropdown \| undefined` | calls `#wrapper`; `#classes`, `#selectors` | `Tab.ts:355`, `Tab.ts:391` |
| `Tab.#planInitial` `Tab.ts:293` | `(): readonly TabInitialWrite[]` | calls `#list`, `#absent`, `readControls`, `readTarget` | `Tab.ts:108` |
| `ScrollSpy.#section` `ScrollSpy.ts:239` | `(link: HTMLElement): HTMLElement \| undefined` | `#host`, `#classes.disabled` | `ScrollSpy.ts:205` |
| `ScrollSpy.#parents` `ScrollSpy.ts:311` | `(link: HTMLElement): readonly HTMLElement[]` | `#target`, `#selectors`, `#classes.entry` | `ScrollSpy.ts:302` |
| `Carousel.#items` `Carousel.ts:556` | `(): readonly HTMLElement[]` | `#host`, `#selectors.entry` | `Carousel.ts:283`, `Carousel.ts:306`, `Carousel.ts:526` |
| `Carousel.#indicators` `Carousel.ts:571` | `(selector: string): readonly HTMLElement[]` | `#host`, `#selectors.indicators` | `Carousel.ts:342`, `Carousel.ts:344` |
| `Carousel.#period` `Carousel.ts:645` | `(): number` | calls `#active`/`#items`; `#attributes.interval` | `Carousel.ts:607`, `Carousel.ts:674` |
| `Delegate.#closest` `Delegate.ts:517` | `(target: Element, selector: string): HTMLElement \| undefined` | `#root.contains` | `Delegate.ts:469`, `Delegate.ts:470`, `Delegate.ts:471`, `Delegate.ts:476`, `Delegate.ts:477`, `Delegate.ts:480`, `Delegate.ts:481`, `Delegate.ts:524`, `Delegate.ts:535`, `Delegate.ts:553`, `Delegate.ts:579`, `Delegate.ts:607`, `Delegate.ts:629`, `Delegate.ts:658`, `Delegate.ts:710`, `Delegate.ts:720`, `Delegate.ts:727`, `Delegate.ts:735`, `Delegate.ts:762`, `Delegate.ts:783` |
| `Delegate.#locate` `Delegate.ts:594` | `(trigger, classes, attributes): HTMLElement \| undefined` | `#root`; calls `isDisabled`, `readTarget` | `Delegate.ts:475`, `Delegate.ts:488`, `Delegate.ts:583` |
| `Delegate.#locateToggle` `Delegate.ts:707` | `(target: Element): HTMLElement \| undefined` | `#dropdown` selectors/classes; calls `#closest`, `isDisabled` | `Delegate.ts:675` |
| `Delegate.#slideControl` `Delegate.ts:760` | `(target: Element): HTMLElement \| undefined` | `#carousel.attributes`; calls `#closest` | `Delegate.ts:478`, `Delegate.ts:742` |
| `Delegate.#slideHost` `Delegate.ts:770` | `(control: HTMLElement): HTMLElement \| undefined` | `#root`, `#carousel`; calls `readTarget` | `Delegate.ts:479`, `Delegate.ts:743` |
| `Delegate.#readModal` `Delegate.ts:814` | `(trigger: HTMLElement): HTMLElement \| undefined` | `#root`; calls `readTarget` | `Delegate.ts:485`, `Delegate.ts:790` |

**(c) spine counts.** Button 0. Alert 4 (`#refused`, `#holds`, `#apply`, `#release`). ColorMode 0. HostSnapshot 5. Registry 0. Isolation 2. Backdrop 0. ScrollLock 0. Swipe 3. Collapse 8. Placement 3. Modal 11. Dropdown 7. Tab 6. ScrollSpy 5. Carousel 15. Delegate 21.

**Repeated shapes among (a) and (b)**

- Closest match, then keep it only inside a root. `Delegate.#closest` `Delegate.ts:517`: `target.closest(selector)`, `HTMLElement`, `#root.contains`, else `undefined`. Includes self. `Tab.#list` `Tab.ts:255`: `#host.closest(list selector)`, `HTMLElement` or `undefined`, no separate root test. `Tab.#wrapper` `Tab.ts:272`: `closest(:is(wrapper, entry))`, else the control itself. `Delegate.#locate` `Delegate.ts:600`: `closest(.hostToken)` only after `readTarget` misses.
- Sibling in one direction, then the other, then the parent's first match. `Dropdown.#locate` `Dropdown.ts:363`: next, then previous, `matches(menu)`, `HTMLElement`; then `parentElement.querySelectorAll` and the first `HTMLElement`. `Delegate.#locateToggle` `Delegate.ts:707`: previous, then next (opposite order), skip `isDisabled`, then parent `querySelectorAll`, then `#closest`.
- Outermost matches by excluding `:scope S S`. `Collapse.#siblings` `Collapse.ts:338`: nested set is `:scope ${panel} ${panel}` where `panel` is `:is(host, transition)`; keep `${host}${shown}, ${transition}` except self and the nested set. `Carousel.#items` `Carousel.ts:557`: nested set is `:scope ${entry} ${entry}`; keep `entry` except the nested set; self is not removed.
- Trigger target or `href` fragment, else a token ancestor. `readTargets` `helpers.ts:151`: `attributes.target`, else `href` when it contains `#` or starts with `.`, comma-split, `CSS.escape` on ids, `ownerDocument.querySelectorAll`, `HTMLElement`s; empty when the attribute is null, `''`, or `#`. No closest fallback. `readTarget` is the first of that list. `Delegate.#locate` `Delegate.ts:599`: `isDisabled` first, then `readTarget ?? closest(.hostToken)`, then `#root.contains`.
- Disabled token, `:disabled`, or attribute. `isDisabled` `helpers.ts:370`: token, or `:disabled`, or `disabled` attribute whose value is not `false`. `ScrollSpy.#section` `ScrollSpy.ts:242`: token or attribute not `false`; no `:disabled`; a hit returns `undefined` rather than a boolean.

Shapes named in the brief that do not appear twice inside (a) or (b): ancestor chain through `body` (only `Isolation` constructor `Isolation.ts:70`, which includes the host and the body); scrollbar width (only `ScrollLock` constructor `ScrollLock.ts:73` and `Modal.#adjust` `Modal.ts:416`, both `Math.abs(innerWidth - clientWidth)`, `0` when `defaultView` is null; `#adjust` is (c) and also writes padding); fragment id (`ScrollSpy.#section` `ScrollSpy.ts:240` only: `hash`, `decodeURI`, `CSS.escape`, `#host.querySelector`, `checkVisibility({ visibilityProperty: true })`); `closest(list)` then previous sibling (`ScrollSpy.#parents` `ScrollSpy.ts:321` only).

**Prior art**

| Leaf or shape | Export | Contract |
| --- | --- | --- |
| `Delegate.#closest`, `Tab.#list`, `Tab.#wrapper` | `findClosest` `elements/src/browser/traversals.ts:310` `(element: Element, predicate: ElementPredicate): Element \| null` | Narrower: predicate, not a selector; `null` not `undefined`; includes self; no root bound. `findClosestByClass` `traversals.ts:341` is one class token, not a selector. |
| `Dropdown.#locate`, `Delegate.#locateToggle` | `findNextSibling` `traversals.ts:464` and `findPreviousSibling` `traversals.ts:509`, each `(element, predicate): Element \| null` | Narrower: one direction, predicate, `null`, no parent `querySelectorAll`. |
| `:scope S S` exclusion | none in `traversals.ts` through line 949 | — |
| `readTargets` / `readTarget` / `#locate` target-or-href | none in the portions read | — |
| `ScrollSpy.#section` fragment | `getElementById` `traversals.ts:841` `(id: string, doc?: Document): HTMLElement \| null` | Narrower: raw id, document scope, `null`, no decode, no visibility, no disabled skip. |
| `isDisabled` | none with that contract. `isReachable` `test/src/browser/helpers.ts:105` matches `:disabled, [aria-disabled="true"]` and also geometry, focus, and `inert` | Wider and a different job. |
| `reflow`, `readControls`, `readTag`, `matchesReducedMotion`, `Collapse.#siblings`, `Carousel.#items`, `#dimension`, `#parents` | none in the portions read | — |
| ancestor-to-body (not an (a)/(b) member) | `getAncestors` `traversals.ts:261` `(element: Element, boundary?: Element \| null): readonly Element[]` | Excludes the start and the boundary. Isolation includes the host and the body. |

Mailbox `src/browser/helpers.ts:39-64` DOM reads seen: `extractRow` (closest `[data-index]` whose parent is `root`, `null`), `extractRows` (direct `[data-index]` children). Neither matches a Veneer shape.

**Fleet names.** A search of `scaffold/guides/*.md` for the helper, validator, and parser export names and for `readClosest`, `readSibling`, `readOutermost`, `readHost`, `readFragment`, `readScrollbar`, `readChain`, `readParents`, `readSection`, `findClosest`, `findSibling` found no `## Surface` row. Those names are unclaimed there. `guides/browser.md:56` claims `createCDPClient`, not a Veneer helper. `elements/guides/elements.md:5` `## Surface` rows are HTML tags, not these function names. Mailbox guide not read.

**`tests/setupBrowser.ts` exports reached, against installed `@orkestrel/test`.** `visitBreakpoint` `setupBrowser.ts:210` — no same name in the browser `index.d.ts` head. `mountShowcase` `setupBrowser.ts:253` — app fixture, no installed twin. `FrameManager` `setupBrowser.ts:509` — capture placement; installed names seen in the import are `stagePane` and `releasePane`, not this class. `SceneManager` `setupBrowser.ts:1111` — its own comment at `setupBrowser.ts:1107` says no installed export records mounted nodes; `mount` `setupBrowser.ts:1132` calls installed `render`. `readCascadeSheet` `setupBrowser.ts:1268` and `collectLayer` `setupBrowser.ts:1406` — comments at `setupBrowser.ts:1253` and `setupBrowser.ts:1400` name installed `readRules` as a flat rule list that does not name the sheet. `collectSheetRules` `setupBrowser.ts:1492`. `mountTrail` `setupBrowser.ts:1658`, `mountClose` `setupBrowser.ts:1685`, `mountTraversalStart` `setupBrowser.ts:1712` — markup fixtures; `mountTraversalStart` exists so installed `traverseAccessible` has a focused start (`setupBrowser.ts:1700`). The rest of the export list was not reached.

Distillate: Pure DOM reads already extracted are `reflow`, `readTargets`, `readTarget` (first of `readTargets`), `readControls`, `isDisabled`, `matchesReducedMotion`, and `readTag`. Private reads that only need a vocabulary table are `Dropdown.#locate` (next, then previous, then parent), `Dropdown.#resolveReference`, `Collapse.#transitioning`, `Tab.#wrapper`, `Tab.#absent`, and `Carousel.#active`. The repeated compositions are root-bounded `closest` (`Delegate.#closest`, with `Tab.#list` and `Tab.#wrapper` unbounded), the two-direction sibling walk (`#locate` next-then-previous versus `#locateToggle` previous-then-next, the second skipping disabled), and `:scope S S` outermost exclusion (`#siblings` and `#items`). `readTargets` has no closest fallback; `Delegate.#locate` adds one after a disabled check. `isDisabled` is token or `:disabled` or attribute not `false`; `ScrollSpy.#section` drops `:disabled`. Elements has `findClosest` and one-direction `findNextSibling` / `findPreviousSibling` (predicate, `null`, no root) and `getElementById` (narrower than `#section`). No read export matches `readTargets`, `readControls`, `isDisabled`, the `:scope` exclusion, `reflow`, or `matchesReducedMotion`. Every candidate name and every current helper, validator, and parser export is unclaimed in `scaffold/guides`. Setup duplicates that were reached wrap installed `render` and `readRules` rather than redeclaring their names.

Unknowns: Veneer commit `7e96cf8` was not checked. Unread ranges: `ScrollSpy.ts` lines 81–199, `Carousel.ts` lines 81–249, `Delegate.ts` lines 81–349, `elements/src/browser/traversals.ts` after line 949, `elements/src/browser/helpers.ts` after line 1959 (including `lockBodyScroll`, named in the file header at line 42), `mailbox/src/browser/helpers.ts` after line 150, mailbox `guides/` `## Surface`, `@orkestrel/test` `dist/src/core/index.d.ts`, `dist/src/browser/index.d.ts` after line 80, and `test/src/browser/helpers.ts` after line 200. `setupBrowser.ts` exports between the ones named above were not listed. `readTag` call sites inside the unread `ScrollSpy` and `Carousel` constructors were not confirmed.

Journal: `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/j-helpers-absorb.jsonl`, session `8db34862-953e-4ef8-b836-f3ee23b4ba96`.

Deviation: The brief was not at `.orkestrel/veneer/engine/units/j-helpers-absorb-brief.md`. It was read from `tmp/cursor/j-helpers-absorb-brief.md`. Workspace search does not leave this checkout, so the fleet files were read directly and the unread ranges above were not finished.
