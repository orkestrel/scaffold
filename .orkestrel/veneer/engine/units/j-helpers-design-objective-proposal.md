# J-HELPERS design — the objective lane's proposal (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d326-7bb1-7913-b903-bda1345b4d7c`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-helpers-design.jsonl` (launch copy under `tmp/codex/`); 55 commands; 737 s; usage {"input_tokens":2279224,"cached_input_tokens":2109312,"cache_write_input_tokens":0,"output_tokens":21774,"reasoning_output_tokens":7121}. Retained verbatim from the exec's last message.

---

1. **Leaf list**

Propose extraction into Veneer’s existing `src/browser/helpers.ts`, preserving each caller’s selection order, containment, and narrowing. This is a source-review proposal, not an executed behavioral verdict. Paths below are relative to `C:/Users/mikes/WebstormProjects/veneer` unless another project is named.

The governing distinction is independently testable reading versus entity orchestration; extracting a leaf must remove its forwarding method and update every consumer. ([architecture.md:155](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md:155), [architecture.md:178](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md:178), [centralization.md:22](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-harden-package/references/centralization.md:22))

| Candidate | Ruling and reason | Source |
|---|---|---|
| `Delegate.#closest` | **Extract** as `scanClosest` and remove the method, because selector lookup plus HTML narrowing and optional containment is a reusable leaf. | `src/browser/Delegate.ts:517` |
| `Delegate.#locate` | **Extract** as `readDismissHost`, because disabled refusal, target precedence, ancestor fallback, and final containment form one independently testable host reading. | `src/browser/Delegate.ts:594` |
| `Delegate.#locateToggle` | **Keep the method**, routing its sibling search through `scanSiblings`, because its own-trigger refusal and menu-to-toggle composition remain dropdown routing behavior. | `src/browser/Delegate.ts:707` |
| `Delegate.#slideControl` | **Keep the method**, using `scanClosest`, because it composes the carousel vocabulary with the interpretation of a slide command. | `src/browser/Delegate.ts:760` |
| `Delegate.#slideHost` | **Keep the method**, using bounded `readTarget`, because it adds the carousel’s host-token requirement to target resolution. | `src/browser/Delegate.ts:770` |
| `Delegate.#readModal` | **Fold** into its consumers through bounded `readTarget`, because its entire behavior becomes that helper’s contract. | `src/browser/Delegate.ts:814` |
| `Delegate.#routeTabKey` | **Keep the method**, replacing only its guarded list lookup with unbounded `scanClosest`, because key handling, focus, marking, and construction are orchestration. | `src/browser/Delegate.ts:624` |
| `Delegate.#routeModal` shown-modal query | **Keep inline**, because `querySelector` followed by a guard does not justify a modal-specific query wrapper. | `src/browser/Delegate.ts:795` |
| `Tab.#list` | **Fold** into its consumers through unbounded `scanClosest`, because retaining it would leave a forwarding method. | `src/browser/Tab.ts:255` |
| `Tab.#wrapper` | **Extract** as `readTabWrapper`, because the declared selector-table composition and control fallback add a real contract. | `src/browser/Tab.ts:272`; `src/browser/types.ts:1016` |
| `Tab.#sibling` | **Keep the method**, composing list lookup, `readControls`, host exclusion, and `scanActive`, because it chooses a peer within this tab’s current list. | `src/browser/Tab.ts:262` |
| `Tab.#dropdown` | **Keep the method**, using `readTabWrapper`, because it composes the wrapper, dropdown token, and separate first-match toggle/menu readings. | `src/browser/Tab.ts:279` |
| `Tab.#absent` | **Extract** as `matchesUnwrittenAttribute`, because it reads only its arguments and enforces first-planned-write precedence. | `src/browser/Tab.ts:324`; `src/browser/types.ts:1048` |
| `Tab.#planInitial` | **Keep the method**, because it defines the tab’s initial accessibility-write plan. | `src/browser/Tab.ts:293` |
| `Collapse.#triggers` | **Extract** as `scanTriggers`, because reverse target lookup is a standalone document-wide reading using already-declared maps. | `src/browser/Collapse.ts:322`; `src/browser/types.ts:729` |
| `Collapse.#siblings` | **Keep the method**, using `scanOutermost`, because optional parent state, open-panel selection, and own-host exclusion belong to accordion composition. | `src/browser/Collapse.ts:331` |
| `Collapse.#transitioning` | **Extract** as `matchesTransition`, because the existential token reading uses only the supplied panels and declared class map. | `src/browser/Collapse.ts:288`; `src/browser/types.ts:707` |
| `Collapse.#dimension` | **Keep the method**, because it selects this host’s transition axis from instance vocabulary and state. | `src/browser/Collapse.ts:317` |
| `ScrollSpy.#section` | **Extract** as `readSection`, adopting `isDisabled`, because fragment interpretation and visible-section lookup are independently testable. | `src/browser/ScrollSpy.ts:239` |
| `ScrollSpy.#parents` | **Keep the method**, using `scanSibling` for preceding-link search, because dropdown activation and nested-list activation are this engine’s compositional ancestry algorithm. | `src/browser/ScrollSpy.ts:311` |
| ScrollSpy active-link clearing query | **Keep inline**, because selector construction followed by `querySelectorAll` is part of the activation write sequence. | `src/browser/ScrollSpy.ts:293` |
| `Carousel.#items` | **Fold** into its consumers through `scanOutermost`, because its only additional work is constructing the nesting selector. | `src/browser/Carousel.ts:556` |
| `Carousel.#active` | **Extract** as `scanActive`, also serving Tab’s active-peer reading, because ordered token selection has no carousel-specific state. | `src/browser/Carousel.ts:565`; `src/browser/Tab.ts:265` |
| `Carousel.#indicators` | **Extract** as `readIndicators`, because first-container selection followed by HTML descendant collection is a standalone reading. | `src/browser/Carousel.ts:571` |
| `Carousel.#period` | **Keep the method**, because it composes current entries, active-entry selection, attribute parsing, and the instance’s interval fallback. | `src/browser/Carousel.ts:645` |
| `Dropdown.#locate` | **Fold** through `scanSiblings`, subject to the parent-fallback wording disagreement below, because no class-specific behavior remains after the search. | `src/browser/Dropdown.ts:363` |
| `Dropdown.#resolveReference` | **Extract** as `resolveDropdownReference`, because its declared attribute map, default, parent requirement, and error boundary are self-contained. | `src/browser/Dropdown.ts:382`; `src/browser/types.ts:841` |
| `Dropdown.#position` | **Keep the method**, because it composes this toggle’s parent vocabulary and this menu’s computed alignment into placement policy. | `src/browser/Dropdown.ts:398` |
| `Modal.#adjust` | **Keep the method**, extracting only `readScrollbar`, because padding writes and overflow interpretation are modal behavior. | `src/browser/Modal.ts:413` |
| `ScrollLock` construction | **Keep the constructor**, calling `readScrollbar` at each existing measurement point, because lock ownership, writes, and abort checks are lifecycle work. | `src/browser/ScrollLock.ts:70` |
| `Isolation` ancestor collection | **Extract** as `collectAncestors`, leaving claims and observation in the constructor, because collecting the chain is independent of isolation ownership. | `src/browser/Isolation.ts:70` |

Retain `readTargets`, singular `readTarget`, `readControls`, `readTag`, `isDisabled`, `matchesReducedMotion`, and `computeNeighbor`: each adds selection, composition, normalization of absence, or a documented boundary beyond a platform rename. Calling another exported helper does not make `readTarget` instance orchestration. (`src/browser/helpers.ts:147`, `:182`, `:289`, `:314`, `:343`, `:369`, `:392`)

**Fold `reflow` into its callers as `element.getBoundingClientRect()`.** Its implementation adds no operation or invariant to that platform call; preserve the call’s timing while removing the export, imports, and guide row. The callers include Alert, Backdrop, Carousel, Collapse, Modal, and Tab. (`src/browser/helpers.ts:124`; `Alert.ts:129`; `Backdrop.ts:67`; `Carousel.ts:426`; `Collapse.ts:228`; `Modal.ts:271`; `Tab.ts:197`; [architecture.md:159](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md:159))

2. **Shapes, names, contracts, and consumers**

Use `scan*` for traversal, `collect*` for collection, `read*` for live DOM readings, `resolve*` for effective-value selection, and `matches*` for predicates; add no `find*` exports. Declare the reusable callback type in `types.ts` before implementation. ([names.md:83](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:83), [names.md:184](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:184))

The proposed names produced no matches in the guide populations inspected: `scaffold/guides`, `elements/guides`, `mailbox/guides`, and `veneer/guides`. This is a bounded name check, not a claim about unhosted fleet packages; Elements explicitly claims `findClosest`, `findNextSibling`, and `findPreviousSibling`. Recheck the current fleet surface gate at implementation. (`elements/guides/traversals.md:24`, `:32`; [names.md:124](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:124))

Proposed signatures:

```ts
// types.ts
export type TraversalPredicate = (element: Element) => boolean

// helpers.ts
export function scanClosest(
	element: Element,
	selector: string,
	root?: ParentNode,
): HTMLElement | undefined

export function scanSibling(
	element: Element,
	selector: string,
	forward: boolean,
	accept?: TraversalPredicate,
): Element | undefined

export function scanSiblings(
	element: Element,
	selector: string,
	forward: boolean,
	accept: TraversalPredicate,
): Element | undefined

export function scanOutermost(
	root: ParentNode,
	selector: string,
	nesting?: string,
): readonly HTMLElement[]

export function collectAncestors(
	element: Element,
	boundary: Element,
): readonly Element[]

export function readScrollbar(document: Document): number

export function readTarget(
	trigger: Element,
	attributes: AttributeMap<'target'>,
	root?: ParentNode,
): HTMLElement | undefined

export function readDismissHost(
	trigger: HTMLElement,
	classes: Pick<AlertClassMap, 'host' | 'disabled'>,
	attributes: AttributeMap<'target'>,
	root: ParentNode,
): HTMLElement | undefined

export function readSection(
	link: HTMLElement,
	root: HTMLElement,
	classes: Pick<ScrollSpyClassMap, 'disabled'>,
): HTMLElement | undefined

export function readTabWrapper(
	control: HTMLElement,
	selectors: Pick<TabSelectorMap, 'wrapper' | 'entry'>,
): HTMLElement

export function matchesUnwrittenAttribute(
	planned: readonly TabInitialWrite[],
	element: HTMLElement,
	name: string,
): boolean

export function scanTriggers(
	host: HTMLElement,
	selectors: CollapseSelectorMap,
	attributes: AttributeMap<'target'>,
): readonly HTMLElement[]

export function matchesTransition(
	panels: readonly HTMLElement[],
	classes: Pick<CollapseClassMap, 'transition'>,
): boolean

export function scanActive(
	elements: readonly HTMLElement[],
	token: string,
	excluded?: HTMLElement,
): HTMLElement | undefined

export function readIndicators(
	host: HTMLElement,
	selectors: Pick<CarouselSelectorMap, 'indicators'>,
	selector: string,
): readonly HTMLElement[]

export function resolveDropdownReference(
	host: HTMLElement,
	attributes: Pick<DropdownAttributeMap, 'reference'>,
): HTMLElement
```

| Helper | Contract and routing |
|---|---|
| `scanClosest` | Call native `closest`, including self; narrow **that first match** through `isInstance(..., HTMLElement)`; then require optional root containment, including root equality; return `undefined` without continuing past a rejected match. Route every former `Delegate.#closest` call, `Tab.#list`, Tab wrapper lookup, and `Delegate.#routeTabKey` list lookup through it. The tab-key list lookup remains **unbounded**; its selected control retains the later root check. (`Delegate.ts:517`, `:631`, `:644`; `Tab.ts:255`, `:272`) |
| `scanSibling` | Exclude self; walk next siblings when `forward`, previous siblings otherwise; return the first selector match accepted by the optional predicate; impose no HTML or root restriction. Route ScrollSpy’s preceding-parent search and each directional pass of `scanSiblings` through it, preserving ScrollSpy’s HTML check **after** its first selector match. (`ScrollSpy.ts:327`; `Dropdown.ts:365`; `Delegate.ts:714`) |
| `scanSiblings` | Search the selected direction, then the reverse direction, then the parent’s matching descendants in document order; the final stage can include the starting element because it is the parent’s descendant. Dropdown supplies next-first order and an HTML predicate; Delegate supplies previous-first order and `!isDisabled`, then applies its existing HTML/root rejection to the returned candidate. A rejected final candidate must not restart the search. This contract remains conditional on reconciliation of the terrain’s parent-fallback wording. (`Dropdown.ts:363`; `Delegate.ts:707`) |
| `scanOutermost` | Query descendants only; preserve document order; narrow returned candidates to this realm’s `HTMLElement`; exclude the nested set selected by `:scope :is(nesting) :is(nesting)`, with `nesting` defaulting to `selector`. Collapse passes separate candidate and nesting selectors, because a hidden outer panel still excludes a nested shown panel; Carousel passes its entry selector for each role. (`Collapse.ts:334`; `Carousel.ts:557`) |
| `collectAncestors` | Include the starting element and the boundary if reached; walk `parentElement` nearest-first; stop at the boundary or the end of that chain, without crossing a shadow root or imposing an HTML guard. Isolation constructs its membership `Set` from this result and retains its existing claim-time guards. (`Isolation.ts:70`, `:89`) |
| `readScrollbar` | Return `0` for a document with no view, otherwise `Math.abs(innerWidth - documentElement.clientWidth)`; read afresh on each call. Route Modal’s adjustment and ScrollLock’s pre-overflow and post-overflow measurements through it without moving their positions around writes. (`Modal.ts:416`; `ScrollLock.ts:73`, `:81`) |
| Bounded `readTarget` | Preserve existing target/href interpretation and select the first HTML result **before** optional containment; an out-of-root first result returns `undefined`, even if another result lies inside. Existing unbounded consumers remain unbounded; Delegate’s modal lookup and carousel-host lookup supply the root. (`helpers.ts:147`, `:182`; `Delegate.ts:770`, `:814`) |
| `readDismissHost` | Refuse a disabled trigger; read the target **without a bound**; only an absent target permits closest-host fallback; finally narrow and apply containment. Route `#reach` and conflict preflight through the same helper, including the assumed-landed Toast route, so an outside explicit target never falls back to an inside ancestor. (`Delegate.ts:475`, `:488`, `:583`, `:599`; `tmp/worktrees/toast/src/browser/Delegate.ts:522`, `:625`, `:879`) |
| `readSection` | Accept hash-bearing anchors and areas; use `isDisabled`; preserve `decodeURI`, malformed-decoding absence, escaped ID lookup inside the root, first-match HTML narrowing, and `checkVisibility({ visibilityProperty: true })`. Exclude the root itself and retain the existing distinction from document-wide `readTarget`; route ScrollSpy refresh through it. (`ScrollSpy.ts:202`, `:239`) |
| `readTabWrapper` | Use the declared wrapper/entry selector composition with unbounded `scanClosest`, falling back to the original control; route dropdown projection and initial-write planning through it. (`Tab.ts:272`, `:280`, `:303`) |
| `matchesUnwrittenAttribute` | Return true only when the live attribute is absent and no earlier planned write names that element/attribute pair; route every current `#absent` call through it. (`Tab.ts:297`, `:304`, `:308`, `:313`, `:316`, `:324`) |
| `scanTriggers` | Query the host’s owner document, exclude non-HTML triggers, and retain triggers whose `readTargets` includes the host; do not add delegate-root containment. Route Collapse show/hide trigger readings through it. (`Collapse.ts:170`, `:220`, `:322`) |
| `matchesTransition` | Return whether any supplied panel carries the declared transition token, without writing or changing collection order; replace the readings in Collapse’s sibling-transition checks. (`Collapse.ts:154`, `:159`, `:288`) |
| `scanActive` | Return the first supplied element carrying the token, skipping only the optional excluded identity; route Carousel’s active-entry consumers and Tab’s active-peer lookup through it. (`Carousel.ts:228`, `:246`, `:284`, `:325`, `:646`; `Tab.ts:265`) |
| `readIndicators` | Select the first indicator container as an `Element`, then collect its HTML matching descendants in document order; do not require the container itself to be HTML or skip an earlier non-HTML container. Route Carousel’s indicator readings through it. (`Carousel.ts:342`, `:343`, `:571`) |
| `resolveDropdownReference` | An absent attribute or `toggle` returns the host; `parent` requires an HTML parent; invalid values or unavailable parents retain `DROPDOWN_OPTION_INVALID` with attribute/tag context. Reuse installed `parseEnum` and `isInstance`; this is an effective-value resolver, not a new coercing parser. (`Dropdown.ts:143`, `:382`; installed `@orkestrel/contract/dist/src/core/index.d.ts:4658`, `:2888`) |

Selectors retain platform exception behavior; extraction must not silently catch malformed selectors. HTML filtering must retain the existing realm-sensitive guards rather than substituting `querySelector<HTMLElement>` assertions. (`helpers.ts:134`, `:164`; `validators.ts:88`; `tests/src/browser/helpers.test.ts:374`)

Keep ScrollSpy’s raw ancestor `closest` readings separate from `scanClosest`: its intermediate holders and dropdown containers are `Element` values, whereas `scanClosest` promises HTML results. Imposing an HTML guard there would narrow the existing contract. (`ScrollSpy.ts:315`, `:320`, `:332`)

Reject proposed `readQuery`, `readMatches`, or `readVisibility` aliases around `querySelector`, `matches`, or `checkVisibility`; none supplies an additional contract. The helpers above survive through bounded selection, filtering, ordered traversal, domain composition, or error translation. ([architecture.md:157](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md:157))

3. **Disabled reading**

Keep `isDisabled(element, token): boolean` in `helpers.ts`; it is a predicate, not a type guard, and E16 explicitly settled that placement. Its contract remains token membership, `:disabled`, or a `disabled` attribute whose value differs from `"false"`. ([decisions.md:71](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:71), `src/browser/helpers.ts:369`)

| Site | Ruling and reason |
|---|---|
| Delegate conflict preflight, dismiss-host lookup, tab click/key filtering, dropdown toggle lookup | **Retain `isDisabled`**, because these sites already share E16’s contract and must remain consistent with actual routing. (`Delegate.ts:500`, `:505`, `:599`, `:614`, `:636`, `:659`, `:711`, `:719`, `:728`, `:733`) |
| Toast dismissal | **Use the same `readDismissHost` path**, because the assumed landing already folds Toast through `#reach` and `#locate`. (`tmp/worktrees/toast/src/browser/Delegate.ts:636`, `:879`) |
| ScrollSpy section lookup | **Replace the handwritten reading with `isDisabled`**, because its accepted hash-bearing elements are anchors/areas and it has no stated need for another disabled policy. (`ScrollSpy.ts:239`; `guides/veneer.md:1250`) |
| Delegate dropdown-entry keyboard filter | **Keep its separate selector semantics**, because the declared entry contract excludes the class token and platform disabled state, while `isDisabled` additionally excludes an anchor carrying `disabled=""`; replacing it would change keyboard eligibility. (`Delegate.ts:691`; `types.ts:864`; `guides/veneer.md:1551`) |
| `Dropdown.#refused` | **Keep its separate reading**, because direct programmatic show/hide currently checks the token and `:disabled`, without the anchor-attribute extension used by delegate triggers. (`Dropdown.ts:261`; `guides/veneer.md:1422`) |
| Button, Collapse, Carousel, modal-toggle routes | **Add no disabled check**, because their documented routing contracts deliberately contain none. (`guides/veneer.md:745`) |

The separate Dropdown readings are explicit semantic exceptions, not alternate implementations of E16’s trigger predicate. Pin an anchor with `disabled=""` as the differentiating case, alongside `disabled="false"` and disabled-fieldset cases already covered for `isDisabled`. (`tests/src/browser/helpers.test.ts:685`)

4. **Cross-package position**

**Recommend Veneer-local helpers for this campaign.** The declared production dependency is `@orkestrel/contract`; Elements and Mailbox are not authorized dependencies, and importing the test package into production is prohibited by the brief. (`package.json:92`; [design brief:Dependencies](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-helpers-design-brief.md))

| Option | Ruling, cost, and reason |
|---|---|
| Veneer’s `src/browser/helpers.ts` | **Adopt now:** it preserves the existing dependency graph and permits exact HTML, `undefined`, vocabulary, and containment contracts; its cost is leaving related traversal mechanisms in other packages. |
| Adopt `@orkestrel/elements` | **Do not adopt in this campaign:** it requires an unauthorized dependency and adaptation of predicate-based, `Element \| null` results; its browser package also has a declared `@vue/reactivity` dependency. (`elements/src/browser/traversals.ts:310`, `:464`, `:509`; `elements/package.json:60`) |
| New small DOM traversal package | **Keep as a cross-package proposal:** it could own proven common mechanisms, but requires an agreed destination contract, dependency authorization, coordinated removal of originals, and releases before consumer adoption. ([integration.md:23](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-align-packages/references/integration.md:23)) |

Elements’ `getAncestors` excludes the starting element and boundary, and `getPathToAncestor` includes the start but excludes the boundary; neither directly carries Isolation’s inclusive contract. Mailbox’s `detectMenu` reads a direct-child menu beneath a chosen parent, not Veneer’s ordered sibling search. (`elements/src/browser/traversals.ts:261`, `:953`; `mailbox/src/browser/helpers.ts:876`)

The scrollbar expressions in Elements and Mailbox live inside stateful locking operations, so adopting them would import lifecycle behavior rather than reuse the proposed reading leaf. (`elements/src/browser/helpers.ts:1672`; `mailbox/src/browser/helpers.ts:237`)

Change the recommendation when real consumer proofs establish interchangeable traversal contracts and the user authorizes the dependency changes. Then define the new package’s browser contracts and guide, move implementations and proofs, release it, and migrate Veneer, Elements, and Mailbox to originating imports without compatibility re-exports. ([names.md:134](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:134), [integration.md:27](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-align-packages/references/integration.md:27))

5. **Test-side ledger**

The installed version is `@orkestrel/test` 0.0.22, confirmed by the package and lockfile; reuse decisions must follow its installed implementation, not the distillates’ name-only comparisons. (`node_modules/@orkestrel/test/package.json:3`; `package-lock.json:778`; [tests.md:173](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:173))

| Local export | Installed capability | Ruling and reason |
|---|---|---|
| `holdOraclePointer` | `driveHold` | **Move the cleanup difference upstream, then reuse:** the installed function already owns held-pointer refusal, scrolling, coordinate conversion, trusted input, marker management, and pressed-state verification; the local function additionally releases on an exception from its frame-wait/check block, so exact replacement needs that difference settled rather than silently discarded. (`tests/setupBrowser.ts:782`; installed browser `index.js:650`, `:678`) |
| `pressOracleKeys` | `pressKeys` | **Keep the composition**, because it resolves and focuses a root-scoped oracle control before using the installed keyboard driver. (`tests/setupBrowser.ts:767`; installed browser `index.d.ts:1902`) |
| `readButton`, `readOracleButton` | `resolveRendered`, `readName`, `isReachable` | **Keep**, because the local contract selects unique `.btn` elements within a supplied root, including non-button roles, then optionally checks reachability; the installed resolver uses accessible role/name resolution. (`tests/setupBrowser.ts:318`, `:753`; installed browser `index.d.ts:2804`) |
| `readSpecimen`, `readSubject` | `resolveRendered` | **Keep**, because specimen attributes and the union of specimen, section, and button identities are Veneer fixture policy. (`tests/setupBrowser.ts:361`, `:402`) |
| `SceneManager`, `scene` | `render`, `mount`, `build` | **Keep**, because they add ownership of mounted nodes and head styles with explicit cleanup; the installed builders do not own that registry. (`tests/setupBrowser.ts:1111`; installed browser `index.js:1423`) |
| `mountShowcase` | `mount`, `build` | **Keep**, because it owns Showcase and Delegate construction and their cleanup. (`tests/setupBrowser.ts:253`) |
| `mountPagination`, `mountBadge`, `mountTrail`, `mountClose`, `mountTraversalStart` | `render`, `build` | **Keep**, because these build named Veneer fixtures or establish the focused traversal start, while already using shared construction beneath them. (`tests/setupBrowser.ts:1215`, `:1634`, `:1658`, `:1685`, `:1712`) |
| `FrameManager` | Portfolio, `stagePane`, `releasePane` | **Keep**, because it records scenario-to-region placement while composing the installed capture lifecycle. (`tests/setupBrowser.ts:509`, `:572`) |
| `measureVariation`, `readRegion` | `readFrame` | **Keep with the measured distinction**, because they compute regional pixel variation and scaled subject coordinates, whereas `readFrame` reports image dimensions and a bottom-row floor. (`tests/setupBrowser.ts:111`, `:176`; installed browser `index.js:3061`) |
| `visitBreakpoint` | `stagePane` | **Keep**, because it executes an action at another viewport and restores the original viewport, including error handling; capture-pane staging is a different lifecycle. (`tests/setupBrowser.ts:210`; installed browser `index.d.ts:2876`) |
| `describeSubject` | `describeTree`, `describeFocus` | **Keep**, because it supplies subject/variant/state context and temporarily includes the subject itself in the description scope. (`tests/setupBrowser.ts:467`) |
| `recordState`, `collectPainted` | `readStates`, `readName` | **Keep**, because they record mutation/default-prevention outcomes or select Veneer button specimens, rather than duplicate the installed accessibility-state reader. (`tests/setupBrowser.ts:612`, `:681`) |
| `recordCalls`, `recordListeners`, `CallRecordingInterface` | `createRecorder` | **Keep the stated difference**, because they observe calls to real existing methods and restore them; they already delegate argument storage to `createRecorder`. (`tests/setupBrowser.ts:928`, `:948`, `:981`; installed core `index.d.ts:149`) |
| `recordEvents`, `EventReading` | `createRecorder`, `waitForEvent` | **Keep**, because they synchronously snapshot dispatch-only fields such as `currentTarget` and `composedPath` over an abort-bound recording lifetime, rather than await one event. (`tests/setupBrowser.ts:994`, `:1031`; installed core `index.d.ts:804`) |
| `collectNestedRules`, `collectSheetRules` | `readRules` | **Keep with explicit scope/order differences**, because they traverse caller-supplied rules/sheets depth-first, whereas installed `readRules` reads document sheets and expands grouping rules breadth-first. (`tests/setupBrowser.ts:1308`, `:1492`; installed browser `index.js:2284`) |
| `readCascadeSheet`, `collectLayer` | `readRules` | **Keep**, because they identify the Veneer sheet by its theme layer and token prefix before selecting a layer. (`tests/setupBrowser.ts:1268`, `:1406`) |
| `collectScopeProperties`, `collectMediaConditions`, `collectLayerRules`, `collectLayerOrder`, `collectCustomProperties` | `readRules`, `readCascade` | **Keep**, because supplied-rule/sheet scope, exact selector matching, layer membership/order, and custom-property extraction are additional contracts. (`tests/setupBrowser.ts:1335`, `:1371`, `:1432`, `:1460`, `:1523`) |
| `applyTheme` | `clickAccessible`, `waitForState`, `waitForAnimations` | **Keep**, because it drives the showcase’s declared theme control and already uses the installed mechanisms. (`tests/setupBrowser.ts:1066`) |

`driveOracle`, `buildOracleComparison`, `scanPositionalPairs`, their fixture records, and the exported fixture constants retain their local homes: their bodies encode the oracle comparison or Veneer cascade scenarios rather than a matching installed general export. (`tests/setupBrowser.ts:696`, `:827`, `:861`, `:895`, `:1054`, `:1090`, `:1573`)

For production overlaps:

- **Keep `settleAnimations` separate from `waitForAnimations`.** Production waits on the element’s own animations and resolves on abort; the test function includes descendants, rejects detached subjects, enforces a budget, and throws on abort. (`src/browser/helpers.ts:85`; installed browser `index.js:1322`)
- **Keep `isDisabled` separate from `isReachable` and `readStates`.** E16’s token/attribute contract is not accessibility reachability, which additionally considers geometry, focusability, inertness, and modal containment. (`src/browser/helpers.ts:369`; installed browser `index.d.ts:1484`)
- **Keep `readSection` separate from `isRendered`.** Section lookup uses the existing visibility check; the test reader additionally implements accessibility presentation rules such as `aria-hidden`. (`src/browser/ScrollSpy.ts:256`; installed browser `index.d.ts:1533`)
- **Keep `readControls` separate from `readRows` and `FOCUSABLE_SELECTOR`.** It returns actual tab-control elements selected by entity vocabulary, not textual rows or a generic focusable population. (`src/browser/helpers.ts:343`; installed browser `index.d.ts:1241`, `:2471`)

No production helper imports `@orkestrel/test`; a future shared production mechanism would need the separately authorized browser package described above.

6. **Implementation units and acceptance**

Serialize these units because they share `helpers.ts`, its tests, and the guide; assign one writer per checkout. Each extraction removes the replaced methods and updates consumers in the same unit. ([decisions.md:13](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:13), [decisions.md:25](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:25))

| Unit | Owned files, tests, guide changes, and falsifiable acceptance |
|---|---|
| **Traversal primitives** | Own `src/browser/types.ts`, `helpers.ts`, `Delegate.ts`, `Tab.ts`, `Dropdown.ts`, `Collapse.ts`, `Carousel.ts`, `ScrollSpy.ts`, `tests/src/browser/helpers.test.ts`, affected class tests, and `guides/veneer.md`. Add `TraversalPredicate`, `scanClosest`, `scanSibling`, `scanSiblings`, and `scanOutermost` Surface rows. Prove self inclusion/exclusion, sibling direction, detached roots, `DocumentFragment` roots, first rejected SVG matches, parent-fallback order, selector lists, hidden outer panels, and nested entries. Acceptance: no former `#closest` or `#items` forwarding path remains; unbounded tab-list lookup and post-selection delegate containment remain observable. Reconcile the sibling-fallback record before accepting that part. |
| **Domain readings** | Own `helpers.ts`, the affected Delegate/Tab/Collapse/Carousel/Dropdown files, their tests, helper tests, and the guide. Add the domain-helper rows from section 2 and amend `readTarget`’s row for optional containment. Prove an outside first target blocks later inside targets and dismiss fallback; custom vocabulary replaces defaults; Collapse discovers triggers outside a delegate root; indicator containers retain `Element` semantics; absent/planned attributes preserve first-write precedence; reference errors retain their code/context. Acceptance: route and conflict preflight use the same host readings, including Toast, with no compatibility wrappers. |
| **ScrollSpy, geometry, and layout-call cleanup** | Own `helpers.ts`, `ScrollSpy.ts`, `Isolation.ts`, `ScrollLock.ts`, `Modal.ts`, all `reflow` callers, affected tests, and the guide. Add `readSection`, `collectAncestors`, and `readScrollbar` rows; remove `reflow`’s row and describe the native layout read. Helper tests cover malformed fragments, escaped IDs, invisible/non-HTML sections, disabled links, inclusive boundary chains, detached chains, shadow boundaries, and documents without views. Component tests preserve pre/post-overflow measurement timing and transition behavior. Acceptance: no handwritten ScrollSpy disabled predicate remains, no `reflow` export/call survives, and snapshot/restoration bounds remain untouched. |
| **Test-infrastructure reuse** | Own `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, and its actual consumers; production helper tests gain no unrelated infrastructure assertions. Resolve the `driveHold` cleanup difference upstream before removing `holdOraclePointer` and routing oracle actions directly through the installed mechanism. Prove held-pointer refusal precedes resolution, failed presses release correctly, root-scoped resolution remains intact, and CSS collectors preserve their documented scope/order differences. If an upstream release is required, its implementation, tests, guide, release, and downstream dependency update form an explicit prerequisite—not a claimed local completion. |
| **Integration acceptance** | Own guide/parity corrections and any remaining consumer updates. Confirm the existing star export exposes every helper, rather than adding selective exports; run the relevant browser, setup-browser, policy, and guide projects, then the campaign’s required gate chain with its documented baseline exceptions reported. Acceptance: every new helper has direct behavioral coverage, every documented export resolves, every removed symbol has no surviving consumer, and production contains no test-package import. (`src/browser/index.ts:3`; `package.json:63`, `:67`, `:73`, `:74`; [decisions.md:21](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:21)) |

The principal risks are changing **which match wins**, widening a guard from `HTMLElement` to `Element`, narrowing an existing intermediate `Element`, moving a containment check into candidate filtering, changing sibling direction, and claiming a fleet-owned name. Each corresponding helper test must distinguish the proposed contract from that mutation. E12’s same-host refusal and E13’s restoration bounds remain component-level acceptance requirements. ([decisions.md:51](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:51), [decisions.md:59](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:59))

**Disagreements stopped on**

- **Parent fallback:** terrain describes Dropdown’s “parent’s first matching descendant,” while the distillate specifies the first matching **HTMLElement** after querying all descendants; those readings differ when an earlier selector match is SVG, so the unification remains conditional on reconciliation. (`scaffold/.orkestrel/veneer/engine/units/j-helpers-terrain.md:51`; `j-helpers-absorb-distillate.md:66`; `veneer/src/browser/Dropdown.ts:375`)
- **Disabled attribute wording:** terrain’s centralized-helper summary omits the `"false"` exception that the distillate explicitly includes; I do not adopt the broader reading, and the proposal cites E16’s binding contract rather than reconciling those summaries. (`j-helpers-terrain.md:10`; `j-helpers-absorb-distillate.md:69`; `scaffold/.orkestrel/veneer/engine/decisions.md:73`)
- **Export order:** terrain says its helper inventory is in file order and places `settleAnimations` after `matchesReducedMotion`, whereas the distillate places it at line 85; the source also declares it there, so the terrain’s ordering claim remains flagged. (`j-helpers-terrain.md:7`; `j-helpers-absorb-distillate.md:24`; `veneer/src/browser/helpers.ts:85`)
- **Test-overlap assessment:** the successor distillate reports no installed counterpart for `holdOraclePointer`, but installed `driveHold` carries its general driving sequence; the cleanup difference prevents treating that finding as unconditional interchangeability. (`j-helpers-absorb-2-distillate.md:48`; `veneer/tests/setupBrowser.ts:782`; `veneer/node_modules/@orkestrel/test/dist/src/browser/index.js:650`)
- **Call-site inventory:** the distillate’s `reflow` callers omit Backdrop and Tab, and its Carousel active/items callers omit getter readings; the source-reviewed consumer set in this proposal includes them without treating the retained inventory as complete. (`j-helpers-absorb-distillate.md:15`, `:35`, `:51`; `veneer/src/browser/Backdrop.ts:67`; `Tab.ts:197`; `Carousel.ts:227`, `:245`)
