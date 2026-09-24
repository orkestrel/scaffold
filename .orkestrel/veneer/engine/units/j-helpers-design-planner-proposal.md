# J-HELPERS design — the subjective lane's proposal (`planner` on Opus 5.5, native subagent, retained verbatim 2026-09-24)

Brief: `j-helpers-design-brief.md`. Blind to the objective lane.

---

# J-HELPERS design proposal: subjective lane (`planner` on Opus 5.5)

## 1. The leaf list

These three tests decide every ruling in this section:

- **Instance state.** A member that reads `#` state stays a method (`.claude/rules/architecture.md:180`).
- **Vocabulary tables.** A helper that takes a vocabulary table is extracted only when the table is a declared type and a second class reads the same thing. `readControls` sets that precedent (`src/browser/helpers.ts:343`, called from `Tab` and `Delegate`).
- **Narrowed platform calls.** A platform call narrowed by the declared `isInstance` or `instanceOf` guard is not a helper (`.claude/rules/patterns.md:20`, `.claude/rules/architecture.md:159`).

A private method whose body shrinks to one helper call stays when several sites use the entity binding it fixes, because folding it would repeat that binding (`.claude/rules/architecture.md:298`).

| Member | Ruling | Evidence | Reason |
| --- | --- | --- | --- |
| `Delegate.#closest` | Keep as a method | `Delegate.ts:517-520`; `#root` at `Delegate.ts:183` | Its only invariant is the delegate's own root, and no other class holds a root. |
| `Delegate.#locate` | Keep | `Delegate.ts:594-602` | It applies the root bound after the `??`, so a target outside the root never falls back to the closest host. That order is route semantics, and a helper would hide it. |
| `Delegate.#locateToggle` | Keep; its sibling walks route through `readSiblings` | `Delegate.ts:707-736` | Bootstrap's toggle lookup order is the route's policy. The walk is mechanism. |
| `Delegate.#slideControl`, `#slideHost`, `#readModal` | Keep | `Delegate.ts:760-767`, `770-774`, `814-817` | Each composes a target read with the root and the carousel or modal vocabulary. |
| `#routeTabKey` list read, `#routeModal` shown-modal read | Keep inline | `Delegate.ts:631-632`, `795-796` | Each is a platform query plus the declared guard. |
| `Tab.#list`, `#sibling`, `#wrapper`, `#dropdown`, `#absent` | Keep | `Tab.ts:255-258`, `262-268`, `272-275`, `279-289`, `324-329` | Only `Tab` reads them. `#wrapper` also adds a fallback to the control itself. |
| `Collapse.#triggers` | Keep | `Collapse.ts:322-326` | The search is document-wide by design (Bootstrap's reading), and only `Collapse` uses it. |
| `Collapse.#siblings` | Keep; its nesting exclusion routes through `readOutermost` | `Collapse.ts:331-342` | The shown-or-transition filter and the host exclusion are collapse policy. |
| `Collapse.#transitioning`, `#dimension` | Keep | `Collapse.ts:288`, `317` | These are single-class token reads. |
| `ScrollSpy.#section` | Keep; its disabled read routes through the shared reading (section 3) | `ScrollSpy.ts:239-260` | Only this method decodes a fragment. |
| `ScrollSpy.#parents` | Keep; its preceding-sibling walk routes through `readSiblings` | `ScrollSpy.ts:327-330` | The list walk bounded to `#target` is scrollspy policy. |
| `Carousel.#items` | Keep; its body becomes `readOutermost(this.#host, this.#selectors.entry)` | `Carousel.ts:556-562`; callers at `227`, `245`, `283`, `306`, `320`, `526`, `646` | Folding it would repeat the item definition at every caller. |
| `Carousel.#active`, `#indicators` | Keep | `Carousel.ts:565`, `571-575` | These are single-class reads. |
| `Dropdown.#locate` | Keep; routes through `readSiblings` | `Dropdown.ts:363-378` | Next, then previous, then the parent is the dropdown's own lookup order. |
| `Dropdown.#resolveReference` | Keep | `Dropdown.ts:382-394` | This is option coercion that throws, not traversal. |
| Scrollbar width | Extract as `readScrollbarWidth` | `Modal.ts:417`; `ScrollLock.ts:74`, `81` | The same computation, including the null-view case, appears in `Modal` and `ScrollLock`. |
| `Isolation` ancestor chain | Keep inline | `Isolation.ts:70-76` | It is a plain parent loop with one use (`.claude/rules/architecture.md:62`). |
| `readTargets`, `readTarget`, `readControls`, `computeNeighbor`, `reflow`, `readTag`, `matchesReducedMotion` | Keep as they are | `helpers.ts:147`, `182`, `343`, `314`, `124`, `289`, `392` | These are already exported pure leaves with tests. |

## 2. The shapes and their names

Every live-DOM read in `helpers.ts` takes the `read*` prefix (`.claude/rules/names.md:97`). That includes list reads, because the published list helpers already use it (`readTargets`, `readControls`). Using `collect*` would give one concept a second term.

The fleet-name check found none of the proposed names claimed:

- A search for `readSiblings|readOutermost|readScrollbarWidth` over `C:/Users/mikes/WebstormProjects/*/guides/*.md` returned no claim.
- The same names are absent from every installed `@orkestrel/*` `.d.ts` file under `veneer/node_modules`.
- As a control, the same glob does find `findClosest` in `elements/guides/traversals.md`, so the search reaches those folders.

**2.1 `readSiblings`**

```ts
export function readSiblings(element: Element, selector: string, forward: boolean): readonly Element[]
```

- **Contract.** It returns the element's siblings that the selector matches on one side, nearest first. `forward` set to `true` reads the siblings after the element, and `false` reads the siblings before it, the same meaning `forward` has in `computeNeighbor` (`helpers.ts:317`).
- **Exclusions and bounds.** It excludes the element itself and applies no root bound, because siblings share the caller's parent.
- **Return type.** It returns `Element`, not `HTMLElement`. `Delegate.#locateToggle` stops at the nearest matching sibling even when that sibling is not an HTML element (`#closest` then returns `undefined`, `Delegate.ts:719-720`), and `ScrollSpy.#parents` pushes nothing in that case (`ScrollSpy.ts:331`). Filtering inside the helper would change both routes.
- **Throws.** It throws the platform's `SyntaxError` when a sibling is tested against an invalid selector.
- **Wrapper test.** It wraps no single platform call, because the platform has no query for the siblings a selector matches.

Three sites route through it:

- **`Dropdown.#locate`:** `[...readSiblings(host, menu, true), ...readSiblings(host, menu, false), ...(host.parentElement?.querySelectorAll(menu) ?? [])].find(instanceOf(HTMLElement))`
- **`Delegate.#locateToggle`:** the same spread in the order `false`, then `true`, then the parent, then `.find((element) => !isDisabled(element, disabled))`, and one `#closest(found, trigger)`. This equals the original's three early returns.
- **`ScrollSpy.#parents`:** `readSiblings(holder, parent, false)[0]` in place of the inner loop.

I rejected a composite helper that reads both sides and then the parent. Its `forward` would mean "which side first" while `readSiblings` uses it for "which side", giving one parameter name two meanings. The parent fallback is also one platform call, and the order is each entity's Bootstrap policy.

**2.2 `readOutermost`**

```ts
export function readOutermost(root: ParentNode, selector: string): readonly HTMLElement[]
```

- **Contract.** It returns the HTML elements inside the root that the selector matches and that sit inside no other match within the root, in document order. The root itself is excluded.
- **Nesting.** Nesting is judged against every match, HTML or not, through `:scope :is(S) :is(S)`. The helper writes the `:is()` wrapper itself, so a selector list nests correctly.
- **Throws.** It throws `SyntaxError` for an invalid selector.
- **Wrapper test.** It is a composed set difference, not one platform call.

Two sites route through it:

- **`Carousel.#items`:** the method body becomes the helper call.
- **`Collapse.#siblings`:** `readOutermost(parent, `${host}, ${transition}`).filter((element) => element !== this.#host && element.matches(`${host}${shown}, ${transition}`))`. The candidates are a subset of the panels, so this equals the original candidates minus the nested set (`Collapse.ts:337-341`).

**2.3 `readScrollbarWidth`**

```ts
export function readScrollbarWidth(element: Element): number
```

- **Contract.** It reads the width of the vertical scrollbar in the view of the element's document as `Math.abs(view.innerWidth - documentElement.clientWidth)`, and returns `0` when the document has no view. This is Bootstrap's `ScrollBarHelper.getWidth`.
- **Parameter.** It takes an element to match its sibling helper `matchesReducedMotion` (`helpers.ts:392-397`), including that helper's null-view clause.
- **Sites.** `Modal.#adjust` passes `host`. `ScrollLock` passes `body` at `ScrollLock.ts:74` and at `81`.

**2.4 Rejected as platform wrappers**

- **`readClosest`** would wrap `Element.closest` plus `isInstance` (`Tab.ts:256`, `273`; `Delegate.ts:518`, `600`, `631`).
- **A narrowed first-match read** would wrap `ParentNode.querySelector` plus `isInstance` (`Tab.ts:282-283`, `Carousel.ts:572`, `Delegate.ts:795`).
- **A visibility read** would wrap `Element.checkVisibility({ visibilityProperty: true })` (`Delegate.ts:698`, `ScrollSpy.ts:257`, `Carousel.ts:617`).
- **A root-containment helper** would wrap `Node.contains`.
- **`readAncestors`** and **`readFragment`** each have one site (`Isolation.ts:70-76`, `ScrollSpy.ts:250-256`).

## 3. The disabled reading

| Site | Ruling | Evidence | Reason |
| --- | --- | --- | --- |
| `ScrollSpy.#section` | Route through `isDisabled(link, this.#classes.disabled)` | `ScrollSpy.ts:240-247` | Nothing changes. `:disabled` matches no anchor or area, and every other element already returns at `hash === ''`. Bootstrap's scrollspy calls its own `isDisabled` on the anchor. |
| `Dropdown.#refused` | Route through `isDisabled(this.#host, this.#classes.disabled)` | `Dropdown.ts:261-267` (`.disabled, :disabled` only); the delegate reads the same toggle through `isDisabled` at `Delegate.ts:659` | This is a defect. A directly constructed `<a disabled>` toggle shows today while the delegate refuses it. Bootstrap's `show` and `hide` read `isDisabled`. The existing proof pins only the token and `<button disabled>` (`tests/src/browser/Dropdown.test.ts:309-313`). |
| `Delegate.#routeDropdownKey` entry selector | Keep it separate | `Delegate.ts:691-698`; `types.ts:864`; `_dropdown.scss:256-257` | The entry reading follows the cascade (`.dropdown-item.disabled, .dropdown-item:disabled`) and Bootstrap's `SELECTOR_VISIBLE_ITEMS`. An `<a class="dropdown-item" disabled>` is painted and clicks as enabled, so the arrow keys must still reach it. |
| Button, collapse, carousel, and modal toggle routes | Unchanged | guide `veneer.md:745-747` | They read no disabled state, as Bootstrap's data API does. |

**Naming finding.** Rename `isDisabled` to `matchesDisabled`:

- The `is*` form is a total `Guard<T>` (`.claude/rules/names.md:187`), and a new name is bound by that form (`names.md:186`).
- `isDisabled(element, token)` takes two arguments and narrows nothing.
- `.claude/rules/architecture.md:67-70` keeps `isVacant` by name. It does not open the `is*` form to other predicates.
- `matches*` is the registered predicate prefix (`names.md:95`), and its sibling `matchesReducedMotion` already uses it. E9 puts Orkestrel naming ahead of Bootstrap's names.

This conflicts with the wording of the E16 amendment (`decisions.md:75`), so the Orchestrator rules on it. The semantics stay E16's.

## 4. The cross-package position

- **(a) Veneer's own `helpers.ts`.** Cost: none beyond the extraction itself. No dependency is added, and the leaves keep Veneer's selector-based, `undefined`-returning contracts.
- **(b) Adopting the `elements` traversals.** No such fleet package exists:
  - The checkout's `package.json` names an unscoped `elements` at `0.0.1` (`elements/package.json:2-3`) with the runtime dependency `@vue/reactivity` (`:59-61`).
  - `mailbox` is unscoped as well (`mailbox/package.json:2-3`), and the catalog in `.claude/agents/orkestrel.md` lists neither package.
  - Its traversals take predicates and return `null` (`traversals.ts:141`, `154`, `310`), which breaks the absence law.
  - It has no counterpart to `readTargets`, `readControls`, or the `:scope` exclusion.
  - Adopting it needs a dependency the user hasn't authorized, plus a translation wrapper at every site.
- **(c) A new fleet DOM package.** Cost: a new package, its guide, a release sequence, and the user's ruling. Only `readSiblings`, `readOutermost`, and `readScrollbarWidth` are generic. `readTargets` (Bootstrap's `getSelector`) and `readControls` (`_getChildren`) are product policy and stay in Veneer. `.claude/rules/names.md:136` allows a shared package only after an interchangeability proof and an authorized dependency.

**Recommendation: (a).** It changes to (c) only if the user brings `elements` or `mailbox` into the fleet as `@orkestrel` packages with the same selector-based, `undefined`-returning contracts, or if another fleet package grows a sibling walk or an outermost read. That extraction would then run under the align-packages skill.

## 5. The test-side ledger

| `tests/setupBrowser.ts` export | Installed export with a similar job | Ruling | Evidence |
| --- | --- | --- | --- |
| `readButton`, `readSpecimen`, `readSubject`, `readOracleButton` | `resolveAccessible`, `resolveRendered`, `resolveAccessibleWithin` | Keep. The installed resolvers refuse unreachable targets, and a refusal journey has to hold a disabled host. | `setupBrowser.ts:302-306`; test `index.d.ts:2752-2753`, `2811-2812` |
| `visitBreakpoint` | `stagePane` and `releasePane` | Keep. The installed pair is reserved for capture staging, and journeys resize through `page.viewport`. | test `index.d.ts:2647-2650`, `2901-2904`; `setupBrowser.ts:210-230` |
| `pressOracleKeys`, `holdOraclePointer` | `pressKeys`, `holdAccessible` | Keep. They add the unreachability-blind oracle lookup. | `setupBrowser.ts:767`, `782` |
| `SceneManager`, `scene`, and the `mount*` fixtures | `mount`, `render` | Keep. The installed exports keep no record of mounted nodes. It could move upstream only after a second workspace shows the same job. | `setupBrowser.ts:1107-1111`, `1215`, `1634`, `1658`, `1685`, `1712` |
| `readCascadeSheet`, `collectLayer`, `collectLayerRules`, `collectNestedRules`, `collectSheetRules` | `readRules` | Keep. `readRules` is flat and names neither the sheet nor the layer. | test `index.d.ts:2500`; `setupBrowser.ts:1253`, `1400` |
| `collectPainted`, `recordEvents`, `recordCalls` | Compose `readStates` and `createRecorder` | Keep. They compose the installed exports rather than repeat them. | `setupBrowser.ts:681-685`, `948`, `1031` |

On the production side:

- **`isDisabled`** stays separate from `readStates` and `isReachable` (test `index.d.ts:2522`, `1531`). They read announced state and reachability, not Bootstrap's token-or-attribute reading.
- **`checkVisibility`** at the call sites stays separate from `isRendered` (`index.d.ts:1564`), which also reads `aria-hidden`.
- **All production leaves** stay separate from the test package, because `src/` never imports `@orkestrel/test`. None of them has an upstream home.

## 6. The unit plan

**Precondition.** J-TOAST lands on `main` first, because it edits `Delegate.ts`. Each unit runs in `tmp/worktrees/<unit>`, one writer at a time.

**J-HELPERS-EXTRACT** (`sol` on GPT-6 Astra; a semantics-preserving refactor with precise equivalence)

- **Owned files:** `src/browser/helpers.ts`, `Delegate.ts`, `Dropdown.ts`, `ScrollSpy.ts`, `Collapse.ts`, `Carousel.ts`, `Modal.ts`, `ScrollLock.ts`, `tests/src/browser/helpers.test.ts`, `tests/src/browser/Delegate.test.ts`, and `guides/veneer.md` (the Surface rows plus any prose describing a changed lookup).
- **Off-limits:** `types.ts` and `tests/setupBrowser.ts`.
- **Tests added:**
  - `describe('readSiblings')`: order after and before, nearest first, the element itself excluded, a non-HTML sibling returned, and an element with no parent returning `[]`.
  - `describe('readOutermost')`: a nested match excluded, the root excluded, a selector list `'.a, .b'` with `.b` inside `.a`, and nesting through a non-HTML match.
  - `describe('readScrollbarWidth')`: a document from `createHTMLDocument` returns `0`.
- **Site proof:** in `Delegate.test.ts`, a menu whose preceding toggle is disabled and whose following toggle is enabled takes the following one.
- **Acceptance criteria:**
  - The three signatures in section 2 are exported with doc blocks and an `@example` each.
  - Under `src/browser`, no `previousElementSibling`, `nextElementSibling`, `:scope `, or `innerWidth - documentElement.clientWidth` remains outside `helpers.ts`.
  - Each named mutation turns a test red: direction reversed, farthest-first order, the `:is()` wrapper dropped, the nested set not excluded, and the null-view guard removed.
  - The Dropdown, ScrollSpy, Collapse, Carousel, Modal, ScrollLock, and Delegate suites stay green without edits.
  - `npm run test:guides` is green.
  - No stale imports remain.

**J-HELPERS-DISABLED** (`opus` on Opus 5.5; it carries the name ruling and the voice of the guide and TSDoc text)

- **Owned files:** `ScrollSpy.ts`, `Dropdown.ts`, `types.ts` (the `DropdownSelectorMap.trigger` TSDoc at around line 858 only), `tests/src/browser/Dropdown.test.ts`, `tests/src/browser/ScrollSpy.test.ts`, and `guides/veneer.md`. If the rename is ruled, it also owns `helpers.ts`, `Delegate.ts`, and `helpers.test.ts`.
- **Acceptance criteria:**
  - Red first: a directly constructed `<a href="#" data-bs-toggle="dropdown" disabled>` has `show()` resolve `false`. Record the failing command and its count before the fix.
  - ScrollSpy pins, green both before and after: a `disabled="false"` link is observed, and a `disabled` link is skipped.
  - Under `src/browser`, `getAttribute('disabled')` and `, :disabled` remain only in `helpers.ts` and the kept entry selector.
  - The ScrollSpy guide sentence (`veneer.md:1251-1252`), the Dropdown guide sentence (`:1422-1423`), and the trigger TSDoc name the shared reading.
  - If the rename is ruled, the guide's backticked "Bootstrap's `isDisabled`" (`veneer.md:743`) is reworded so every backticked name still resolves to an export.

**Risks:**

- **Route semantics:** filtering `readSiblings` to HTML elements would change the toggle route. Applying the root bound inside `readTarget` would make `#locate` fall back to the closest host.
- **Guard widening:** in `Dropdown.#refused`, `hide()` and `toggle()` also start refusing an `<a disabled>` toggle, which matches Bootstrap.
- **Name collision:** none found. A renamed `isDisabled` breaks guide parity until every backticked mention is reworded.
- **Measurements not supplied:**
  - Which existing tests pin each branch of `#locateToggle`, `Dropdown.#locate`, and `#parents`. The unit derives this by running the suites.
  - Whether headless Chromium on this host draws a classic scrollbar. If it doesn't, no test can tell `readScrollbarWidth` apart from a constant `0`, and the unit records that as an observation.

**Observations to carry:**

- `guides/veneer.md` has two `computeNeighbor` Surface rows (lines 70 and 148). The line-148 summary differs from the doc block (`helpers.ts:299`). Suggested carrier: J-HELPERS-EXTRACT.
- `readButton`, `readSpecimen`, `readSubject`, and `readOracleButton` repeat one shape inside `setupBrowser.ts` (`tests.md:184`). They need a carrier the Orchestrator names.

## Disagreements with the terrain

1. **`settleAnimations` position.** The terrain puts it after `matchesReducedMotion`. The source has it at `helpers.ts:85`, between `bindEventMap` and `reflow`. The first distillate agrees with the source.
2. **`isDisabled` summary.** The terrain's summary (`j-helpers-terrain.md:10`) leaves out that the attribute's value must not be `false`. That clause is in `helpers.ts:373` and in E16.
3. **Disabled-reading row.** The terrain names only `ScrollSpy.#section` as a hand reading. The source also has `Dropdown.#refused` (`Dropdown.ts:266`) and the entry selector in `Delegate.#routeDropdownKey` (`Delegate.ts:694`).
4. **Sibling-search row.** The terrain names two sites. `ScrollSpy.#parents` runs the same one-direction walk as well (`ScrollSpy.ts:327-330`).
5. **`Carousel.#items` callers.** The first distillate lists callers at `283`, `306`, and `526`. The source also has `227`, `245`, `320`, and `646`.
6. **Prior-art packages.** The brief and terrain call the prior art `@orkestrel/elements` and `@orkestrel/mailbox`. Their `package.json` files name unscoped `elements` and `mailbox` at `0.0.1`, and the fleet catalog lists neither. So option (b) is not an adoptable fleet package, and the `elements` guide's `findClosest` claim is outside fleet name ownership.
7. **E16 amendment.** The amendment (`decisions.md:75`) treats `isVacant` as permission for a two-argument `is*` predicate. `names.md:186-187` binds new `is*` names to `Guard<T>`. Section 3 rules on this, and the Orchestrator decides.
