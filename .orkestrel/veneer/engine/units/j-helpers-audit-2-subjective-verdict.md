# J-HELPERS audit round 2 — the subjective lane's verdict (`reviewer` on Opus 5.5, retained verbatim from the agent's return, 2026-09-24)

Lane: `reviewer` on Opus 5.5, native subagent, read-only, briefed by `j-helpers-audit-2-reviewer-brief.md` over `j-helpers-audit-claims-2.md`. The Orchestrator's rulings are in `j-helpers-audit-2-verdict.md`.

---

Lane: subjective, held in full. Engine: Opus 5.5 (`claude-opus-5-5`), reached natively as `reviewer`. I held no objective lane.

**Dispatch defect D1.** Parts of the brief `j-helpers-audit-2-reviewer-brief.md` were copied from a component unit's brief and not rewritten. Its Role and Subject sections name a `Helpers` class, a `src/browser/Helpers.ts` file, a `#### Helpers` guide subsection, a § Helpers section in `j-w2-terrain-record.md`, and `j-engine-design-verdict.md` as the design verdict.
- No `src/browser/Helpers.ts` exists in the worktree.
- `j-w2-terrain-record.md` has no "Helpers" match.
- I ruled against the subject the dispatch message names and against `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-helpers-design-verdict.md`.

## Numbered verdicts

1. **`readClosest` (H1): CONFIRMED.**
   - The body in `helpers.ts` is platform `closest`, then `isInstance(match, HTMLElement)`, then `root.contains` only when a root is given. It returns `undefined` on any rejection and never passes the search to a farther ancestor.
   - `Delegate.#closest` is gone, and every former call reads `readClosest(target, …, this.#root)`. `#routeTabKey` reads the list unbounded and keeps `!this.#root.contains(next)` (around line 681).
   - `Tab.#list` is gone. `Tab.#wrapper` reads `readClosest(...) ?? control`, which matches `main`.
   - Attacks that failed:
     - Mutation "pass a rejected match to a farther ancestor": the SVG case asserts `toBeUndefined()` with an HTML `.vn-probe-closest` ancestor present, so the mutation returns `outer` and fails.
     - Mutation "containment before the guard": `readClosest(leaf, '.vn-probe-root', root)` must return the root itself, which separates the orderings.
   - Name: `read*` is the registered live-host prefix, and `Closest` echoes the platform name, so a consumer can predict it.
   - The EXACT rows come from the writer's log. The replay belongs to claim 8.
   - See F3 for the Summary's wording.

2. **`readSiblings` (H2): CONFIRMED.**
   - The body returns siblings nearest first, excludes the element, and applies no HTML guard and no root.
   - `forward` means what it means in `computeNeighbor`, so the vocabulary stays one term.
   - `Dropdown.#locate` spreads the following siblings, then the preceding ones, then the parent's matches, and takes `find(instanceOf(HTMLElement))`. On `main` each loop skipped a non-HTML match and continued, so the behaviour is the same.
   - `Delegate.#locateToggle` spreads the preceding siblings, then the following ones, then the parent's matches, takes `find(!matchesDisabled)`, and ends with `readClosest(found, trigger, root)`. On `main` the loops returned `#closest(sibling)` at the first enabled match, so an SVG match still ends in `undefined`. The behaviour is the same.
   - `ScrollSpy.#parents` reads `readSiblings(...)[0]`, which is the same as the `main` loop.
   - The new case titles describe what each case proves.
   - Attacks that failed:
     - Reversing the spread order breaks "prefers the toggle before the menu…", because `#before` and `#after` are both enabled.
     - An eager spread in place of `main`'s lazy loops changes no result, because the selectors are validated at construction.

3. **`readOutermost` (H3): CONFIRMED.**
   - The nesting query is `:scope :is(S) :is(S)`, the root is excluded, and the result is in document order.
   - `Carousel.#items` is byte-equivalent to `main`.
   - `Collapse.#siblings` has the same nested set as `main`. The candidates widen to `host, transition` and are then filtered by `matches(host.shown, transition)` and by excluding the host, so the result equals `main`'s.
   - Attack that failed: removing the `:is()` wrapper makes `.vn-probe-outer, .vn-probe-inner` nest wrongly, and the list case detects it.
   - See B2 for the `root` naming.

4. **`readScrollbarWidth` (H4): CONFIRMED.**
   - `Modal.#adjust` reads it once. The `ScrollLock` constructor reads it before the overflow write and after it, and `defaultView` is still destructured for the null exit.
   - The viewless-document case separates the null-guard mutation from the passing case: without the guard, the null view throws.
   - Treating the live width as an observation, not a pin, is correct.

5. **Bounded `readTarget` (H5): CONFIRMED.**
   - The root bounds the first match only.
   - `#readModal` is gone. `#routeModal`, the `#conflicts` modal entry, and `#slideHost` pass the root. `Delegate.#locate` stays unbounded (around line 637).
   - The guide sentence in § Delegation (around lines 800–806) names exactly the modal trigger route and the carousel slide route.
   - The test separates "return an inside later match": the `vn-probe-bound` pair puts the outside match first and asserts `undefined`.

6. **`matchesDisabled` (H6): CONFIRMED.**
   - `matches*` is the registered predicate prefix, as in its sibling `matchesReducedMotion`. The predicate narrows no type, so dropping `is*` follows `names.md` § Fixed derivation/construction forms.
   - The body is unchanged.
   - `ScrollSpy.#section` adds only `:disabled`, which no anchor or area matches. The earlier `hash === ''` exit covers every other element.
   - `Dropdown.#refused` routes through the predicate. The entry filter keeps `:not(.{disabled}, :disabled)` (around line 731).
   - Reverting `#refused` to `.disabled, :disabled` makes `refused.show()` resolve `true`, and the new case asserts `false`.
   - The "red first" count rests on the writer's report and log. Claim 8's replay settles it.
   - See F1 for a behaviour change this routing makes that the design did not name.

7. **Guide and declarations (H7): CONFIRMED.**
   - § Surface has five new rows, the `isDisabled` row is gone, and one `computeNeighbor` row remains.
   - Each Summary equals its doc description, and `test:guides` reports 19 passed in `j-helpers-gates-2.log.txt`.
   - The § Delegation, `#### Dropdown`, and `#### ScrollSpy` sentences are present. `index.test.ts` drops `isDisabled` and adds the five names.
   - The `types.ts` patch is report-only.
   - What these sentences assert is ruled in F1 and F3.

8. **Gates, instrument, and scope: UNRESOLVED.**
   - The Orchestrator's replay log `j-helpers-mutations-2-orchestrator.log.txt` is absent by design. The replay settles this claim.
   - The rest holds:
     - The status lists the 15 owned files.
     - Every scoped gate and the tree-wide `check` exit 0.
     - The instrument log carries the rows the claim names, the `GREEN?` rows read 0 failed of 55, 120, 34, and 27, and the receipt reads `restored byte for byte`.
     - A grep of the diff for `as T`, `any`, `!.`, `@ts-`, `eslint-disable`, access modifiers, `export default`, and `.bs.` found only prose ("as Bootstrap's").
     - The reports record no `prove` call and no commit.

## Findings fitting no claim

**F1: the `disabled` refusal now also blocks light dismissal. This departs from Bootstrap, is not recorded, and is not tested.**
- **Where:** `guides/veneer.md` `#### Dropdown`, around lines 1460–1465, and the departure list around lines 1606–1637. The code path is `src/browser/Dropdown.ts`: `#lightDismiss` → `#conceal` → `#refused`.
- **What is wrong:** `#lightDismiss` hides through `#conceal`, which calls `#refused(false)`, and `#refused` now calls `matchesDisabled`.
  - On `main`, an open menu whose toggle is `<a disabled>` closed on an outside click or a Tab release.
  - After this unit it stays open.
  - Bootstrap 5.3.8's `clearMenus` closes it through `_completeHide` without reading `isDisabled` (`node_modules/bootstrap/js/src/dropdown.js`, around lines 356–391; only `show` and `hide` read it, around lines 124–169).
  - The guide sentence says this is "the reading … Bootstrap's `show` and `hide` methods apply, so … neither opens nor closes its menu, whether a click or a call asks". A consumer reads that as Bootstrap's behaviour. The departure list has no bullet for it.
  - The design verdict's risk line says the widened refusal "matches Bootstrap". That is true of `show` and `hide` and false of light dismissal.
  - No case pins light dismissal on a disabled toggle.
- **Why it matters:** an open menu whose toggle becomes disabled can no longer be closed by any click, key, or call. Only `destroy` closes it. The unit extended this state from token and `:disabled` toggles to anchor toggles, and the guide presents it as parity.
- **What right looks like:** the Orchestrator rules one of these (see R1):
  - Let `#lightDismiss` bypass the disabled reading, as `clearMenus` does, and add a case that proves it.
  - Or keep the refusal, and add a departure bullet naming `clearMenus` and `_completeHide`, plus a case pinning an anchor toggle's open menu across an outside click.

**F2: some `closest`-plus-guard reads still don't route through `readClosest`.**
- **Where:**
  - `src/browser/ScrollSpy.ts` `#scrollTo`, around line 372: `origin.closest('[href]')`, then `isInstance(link, HTMLElement)`. This is exactly `readClosest(origin, '[href]')`.
  - `src/browser/Delegate.ts` `#locate`, around line 637: `trigger.closest(.host)`, then the HTML guard, then containment. This equals `readTarget(...) ?? readClosest(trigger, hostSelector)` followed by the existing `this.#root.contains` check.
- **What is wrong:** the design's rule is that "every duplicate routes through it", and it routed the identical composition in `Tab.#wrapper` and in the `#routeTabKey` list read.
- **Why it matters:** E6 requires no duplicate path. The unit owns both files.
- **What right looks like:**
  - `const link = isInstance(origin, Element) ? readClosest(origin, '[href]') : undefined`
  - `const host = readTarget(trigger, attributes) ?? readClosest(trigger, \`.${CSS.escape(classes.host)}\`); return host !== undefined && this.#root.contains(host) ? host : undefined`
  - `#locate` keeps its unbounded target read, so the design's invariant stands.

**F3: the `readClosest` Summary misstates the contract on its natural reading.**
- **Where:** the `readClosest` row in `guides/veneer.md` § Surface (around line 73) and the doc description in `helpers.ts` (around line 359).
- **What is wrong:** "Returns the closest HTML element a selector matches from an element" reads as "the nearest matching element that is HTML". For `<div class="x"><svg class="x"><rect>`, that reading predicts the `div`. The code returns `undefined`, and the case at `helpers.test.ts` (the SVG case) pins `undefined`. The remark corrects this, but the § Surface row carries only the Summary.
- **What right looks like:** use this text in both places, because the parity gate compares them:

  > Returns the closest element a selector matches from an element, the element itself included, when that element is an HTML element and the optional root contains it.

## Attacked and held

- **Choosing the list shape for `readSiblings` over a first-match helper.** Every consumer takes the first qualifying sibling, but each qualifies differently: HTML-only, not disabled, or nearest. A list with the caller's `find` is the smallest shape that serves all of them. A combined both-sides-then-parent helper would give `forward` two meanings, as the design says.
- **The asymmetric return types (`Element[]` for `readSiblings`, `HTMLElement` for the others).** The asymmetry is justified: it keeps the toggle route's "an SVG sibling ends the search" and the menu route's "skip it". Both are pinned.
- **The `Carousel.#items` one-call body.** The design permits it because the method names a concept that seven sites share. It is not a 1:1 forwarding wrapper.
- **The "titled `@example`" line in the design's acceptance.** None of the six examples is titled. Their untitled siblings `computeNeighbor` and `readControls` show this is the file's pattern. The claims don't assert titles, and `documentation.md` compares titled examples only.
- **The `matchesDisabled` remark "Every delegate route that refuses…".** The dropdown entry filter passes over entries rather than refusing a trigger or a control, so the remark stays true.
- **The § ScrollSpy sentence "because no link matches the platform's `:disabled` state".** Only anchors and areas reach the disabled check, and neither matches `:disabled`.

## Referrals (to the objective lane, Astra)

- **R1.** Rule whether Dropdown light dismissal must bypass the `disabled` refusal, as Bootstrap's `clearMenus` → `_completeHide` does. Confirm the stuck-open state with a case: an anchor toggle carrying `disabled="disabled"` whose menu carries `show`, followed by an outside click.
- **R2.** The EXACT and JOINED rows cited in claims 1–6 rest on the writer's run until the Orchestrator's replay. Rule whether each named case separates its mutation. I checked this by reading the assertions for the H1, H3, H4, H5, and H6 rows.

## Bounds (no action this round)

- **B1.** § Delegation (around line 766) says "the reading of Bootstrap's own disabled check". The guide's usual form is "Bootstrap's `X` function" (`getNextActiveElement`, `_getChildren`, `ScrollBarHelper`). The acceptance grep treats Bootstrap's `isDisabled` function the same as Veneer's retired identifier.
- **B2.** `root` means an inclusive containment bound in `readClosest` and `readTarget`, but an exclusive search scope in `readOutermost`. The `@param` text disambiguates it.
- **B3.** `#### Dropdown` has two phrases with different readings. "carries the `disabled` token or is disabled" (the delegate click route, around line 1589) means the `matchesDisabled` reading. "carries no `disabled` token, is not disabled" (entries, around line 1595) means `:disabled` only. Both sit beside the unit's `matchesDisabled` sentence.
- **B4.** In the `readClosest` remark, "may lie" should be "can lie". In the `readScrollbarWidth` remark, "A view … reads `0`" makes the view the actor.
- **B5.** The report-only `types.ts` patch for `DropdownSelectorMap.trigger` repeats F1's "neither opens nor closes" wording.

VERDICT: FAIL 8; outside the claims: F1, F2, F3
