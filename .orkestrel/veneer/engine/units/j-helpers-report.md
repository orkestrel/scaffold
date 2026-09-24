# J-HELPERS round 1 — the writer's returned report (retained verbatim 2026-09-24)

Writer: `opus` on Opus 5.5, native subagent `a2b8ce9a0785041b6`, in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/helpers` (branch `unit/helpers` cut from `main` `e8251cf`). Brief: `j-helpers-brief.md`. Instrument: `j-helpers-mutations.py` with its log `j-helpers-mutations.log.txt`, the chain `j-helpers-acceptance.sh`, and the before-routing probe `j-helpers-before.py`, retained beside this file (the launch copies sat under the worktree's `tmp/j-helpers/`). The Orchestrator's rulings on the three items the writer raised are in `j-helpers-audit-claims.md`.

---

The unit is complete: all six helpers are extracted and routed, and every acceptance command exits 0 on Chromium 153.0.8010.12. Every H8 mutation reddens its named case, and the instrument's receipt reads `restored byte for byte`. I made no `prove` call, because that MCP server can't be reached from a subagent. Nothing is committed.

Three things need your ruling:

1. **`types.ts` line 868 is still stale.** The file is report-only, so I didn't edit it. The patch under "Shared-file patches" rewrites that TSDoc. Until it lands, the `, :disabled` grep still hits that line.
2. **The `@example` blocks are untitled.** Brief § Law and verdict § 6 ask for "titled" examples. I matched the untitled form that all 132 other `@example` blocks in `src` use; I counted them with `grep -rn "@example" src`. A titled block with no matching guide heading would pair with nothing. If you want titles, it is a one-line change per helper.
3. **I edited a guide row outside H7's named list.** The § Compatibility row listing Bootstrap's `util/index.js` exports quoted `isDisabled`. That quote blocks acceptance criterion 2 and E6. It now reads "and the disabled check the `matchesDisabled` function mirrors".

## Files touched

All paths are in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/helpers`.

- `src/browser/helpers.ts`: adds `readClosest`, `readSiblings`, `readOutermost`, and `readScrollbarWidth`, gives `readTarget` its optional `root`, and renames `isDisabled` to `matchesDisabled`. Each export has a doc block and an `@example`.
- `src/browser/Delegate.ts`: deletes `#closest` and `#readModal`. Every former `#closest` call is now `readClosest(…, this.#root)`. The `#routeTabKey` list read uses `readClosest` without a root. `#locateToggle` walks through `readSiblings` (before the menu, after it, then the parent) and filters with `matchesDisabled`. `#routeModal`, the modal conflict entry, and `#slideHost` use the bounded `readTarget`. The rename runs through the file, TSDoc included.
- `src/browser/Tab.ts`: deletes `#list`; both callers and `#wrapper` use `readClosest` without a root.
- `src/browser/Dropdown.ts`: `#refused` uses `matchesDisabled`. `#locate` spreads the siblings after the toggle, then before it, then the parent's matches, and takes the first HTML element.
- `src/browser/ScrollSpy.ts`: `#section` uses `matchesDisabled`. `#parents` uses `readSiblings(holder, parent, false)[0]`.
- `src/browser/Collapse.ts`: `#siblings` is `readOutermost(parent, host + ', ' + transition)`, filtered to exclude the host and keep shown or transitioning panels.
- `src/browser/Carousel.ts`: the body of `#items` is `readOutermost(this.#host, this.#selectors.entry)`. The method stays because seven callers use it.
- `src/browser/Modal.ts`, `src/browser/ScrollLock.ts`: each scrollbar measurement uses `readScrollbarWidth`, in the same place relative to the writes.
- `tests/src/browser/helpers.test.ts`: renamed cases, plus new describes for `readClosest`, `readSiblings`, `readOutermost`, and `readScrollbarWidth`, and a bounded `readTarget` case.
- `tests/src/browser/Delegate.test.ts`: two toggle-location cases.
- `tests/src/browser/Dropdown.test.ts`: the disabled-anchor case (H6) and one menu-location case.
- `tests/src/browser/ScrollSpy.test.ts`: the `disabled="false"` observation case.
- `tests/src/browser/index.test.ts`: `isDisabled` leaves the export list; the five new names join it.
- `guides/veneer.md`: the H7 rows and sentences, the § Compatibility row, and the edited paragraphs rewrapped at 100 columns.
- `tmp/j-helpers/**` (ignored by git): the instrument `mutations.py`, `acceptance.sh`, `chromium.ts`, `before.py`, and every log.

## Obligations

- **H1 `readClosest`.** Its cases cover: returning the element itself, an SVG closest match returning undefined, root containment including the root itself, a read with no root, and a selector syntax error propagating. The instrument rows for H1 ("applies the containment before the guard", "widens the guard to Element", and "passes a rejected match to a farther ancestor") each read EXACT. I took "containment before the guard" to mean the containment check reads the starting element instead of the match.
- **H2 `readSiblings`.** Cases cover each direction nearest first, the element itself excluded, an SVG sibling returned, and no parent returning `[]`. No existing case pinned the site proof: before I added cases, the row "the toggle search takes a disabled toggle" read `MISSED exit=0 | … | 0 failed of 118`. My case "passes over a disabled toggle before the menu to the toggle after it, and over a toggle nested in a sibling" makes it read `EXACT exit=1 | … | 1 failed of 120`. The case is green in the final run.
- **H3 `readOutermost`.** Cases cover a nested match excluded, the root left out and nesting nothing, the list `.vn-probe-outer, .vn-probe-inner` with the inner inside the outer, and nesting through an SVG `g`.
- **H4 `readScrollbarWidth`.** The case "returns 0 for a document with no view" uses `createHTMLDocument('')`.
- **H5 bounded `readTarget`.** The case "bounds the first match alone by a root, returning undefined for an outside first match with an inside later one" also checks that the read with no root still returns the outside match.
- **H6 `matchesDisabled`.** The red reading came before the fix, from `npm run test:src:browser -- tests/src/browser/Dropdown.test.ts`:
  ```
  FAIL  |src:browser (chromium)| tests/src/browser/Dropdown.test.ts:350:2 > Dropdown > refuses to show, toggle, or hide an anchor toggle whose disabled attribute is not false, and shows one whose value is false
  AssertionError: expected true to be false // Object.is equality
   ❯ tests/src/browser/Dropdown.test.ts:381:31
   Test Files  1 failed (1)
        Tests  1 failed | 32 passed (33)
  ```
  The same command after the fix:
  ```
   Test Files  1 passed (1)
        Tests  34 passed (34)
  ```
  The count rose from 33 to 34 because the H2 menu-location case was added in between.

  The ScrollSpy disabled pins were green before the routing (`tmp/j-helpers/before.py` ran the `main` copy of `ScrollSpy.ts`):
  ```
  ✓ … ScrollSpy > observes a link whose disabled attribute reads false 11ms
  ✓ … ScrollSpy > observes no link without a fragment, no disabled link, and no hidden section, and re-reads the links at refresh 92ms
   Test Files  1 passed (1)
        Tests  27 passed (27)
  exit=0
  receipt: restored byte for byte
  ```
  Both are green after the routing too, in the full browser run. The dropdown-entry keyboard filter keeps its declared selector (`Delegate.ts:731`).
- **H7 guide.** § Surface gains rows for `readClosest`, `readSiblings`, `readOutermost`, `matchesDisabled`, and `readScrollbarWidth`; each Summary equals its doc block. The duplicate `computeNeighbor` row is gone. § Delegation names `matchesDisabled` and states that the dropdown's `show`/`hide` and the scrollspy share it. It also has one added sentence on the bounded `readTarget`. The `#### Dropdown` sentence now says `show`/`hide` refuse by the same reading as Bootstrap, so a disabled anchor toggle neither opens nor closes. The `#### ScrollSpy` sentence names the shared reading. Every `####` sentence that named `isDisabled` now names `matchesDisabled`.
- **H8 instrument.** `tmp/j-helpers/mutations.py`; the table follows.

## Unknowns

1. **Branch pins.** Unpinned before this unit, per `mutations-branches-before.log.txt`:
   - `Delegate.#locateToggle`: skipping the siblings after the menu, reading those siblings first, skipping the parent fallback, and taking a disabled toggle.
   - `Dropdown.#locate`: skipping the siblings before the toggle, and taking a non-HTML menu.

   Already pinned, by an existing case other than the one I first named: the toggle search skipping the siblings before the menu; the menu search skipping the siblings after the toggle, reading the before-siblings first, or skipping the parent; and both `ScrollSpy.#parents` rows. After my cases, every branch row reads EXACT or JOINED.
2. **Scrollbar.** Headless Chromium on this host draws no classic scrollbar. A temporary probe, deleted afterwards, printed `{"live":0,"styled":0,"forced":0,"inner":414,"client":414}`. The readings were a live `readScrollbarWidth(document)`, an iframe with `::-webkit-scrollbar { width: 12px }`, and `html { overflow-y: scroll }`. So only the viewless `0` is pinned.

## Mutation table (verbatim from `tmp/j-helpers/mutations.log.txt`)

```
digest before: {"src/browser/helpers.ts": "4acd0a9d69b457fe19ad13abc9ad10c2ea9951380f4f255f690f198ce623479c", "src/browser/Delegate.ts": "1853f94f67fb53e1eea39f74a7edf1e8dbed209a1ec62c8bcc6449be2478f0ab", "src/browser/Dropdown.ts": "3b0f9ea566ca6c38bf26dcf36790efc01b2af65a901d5dbfbd4a4518199a5757", "src/browser/ScrollSpy.ts": "f56d944dbd4bd7420253592f1198809415db5ecfdb26973954062a7e6f6d7034"}
JOINED exit=1 | the direction is reversed in readSiblings | tests/src/browser/helpers.test.ts | 2 failed of 55 | named: ['returns the matching siblings after or before the element, nearest first, leaving the element out'] | joined: ['returns a matching sibling that is not an HTML element']
EXACT exit=1 | readSiblings returns the farthest first | tests/src/browser/helpers.test.ts | 1 failed of 55 | named: ['returns the matching siblings after or before the element, nearest first, leaving the element out'] | joined: []
EXACT exit=1 | readOutermost drops the :is() wrapper | tests/src/browser/helpers.test.ts | 1 failed of 55 | named: ['nests a selector list as one selector, whichever part each match takes'] | joined: []
JOINED exit=1 | readOutermost excludes no nested match | tests/src/browser/helpers.test.ts | 3 failed of 55 | named: ['returns the matches no other match inside the root holds, in document order'] | joined: ['nests a selector list as one selector, whichever part each match takes', 'lets a match that is not an HTML element nest the matches inside it, and leaves it out']
EXACT exit=1 | readScrollbarWidth drops the null-view guard | tests/src/browser/helpers.test.ts | 1 failed of 55 | named: ['returns 0 for a document with no view'] | joined: []
EXACT exit=1 | readClosest applies the containment before the guard, to the starting element | tests/src/browser/helpers.test.ts | 1 failed of 55 | named: ['returns a match the root contains, the root itself included, and undefined for a match outside it'] | joined: []
EXACT exit=1 | readClosest widens the guard to Element | tests/src/browser/helpers.test.ts | 1 failed of 55 | named: ['returns undefined when the closest match is not an HTML element, passing the search to no farther ancestor'] | joined: []
EXACT exit=1 | readClosest passes a rejected match to a farther ancestor | tests/src/browser/helpers.test.ts | 1 failed of 55 | named: ['returns undefined when the closest match is not an HTML element, passing the search to no farther ancestor'] | joined: []
EXACT exit=1 | the bounded readTarget returns an inside later match | tests/src/browser/helpers.test.ts | 1 failed of 55 | named: ['bounds the first match alone by a root, returning undefined for an outside first match with an inside later one'] | joined: []
EXACT exit=1 | Dropdown refuses by the token and the platform state alone | tests/src/browser/Dropdown.test.ts | 1 failed of 34 | named: ['refuses to show, toggle, or hide an anchor toggle whose disabled attribute is not false, and shows one whose value is false'] | joined: []
EXACT exit=1 | ScrollSpy reads a disabled attribute of false as disabled | tests/src/browser/ScrollSpy.test.ts | 1 failed of 27 | named: ['observes a link whose disabled attribute reads false'] | joined: []
JOINED exit=1 | branch: the toggle search skips the siblings before the menu | tests/src/browser/Delegate.test.ts | 2 failed of 120 | named: ['finds the toggle for a key inside a menu among the menu siblings, before it and then after it'] | joined: ['prefers the toggle before the menu to the one after it, and falls back to the first toggle inside the menu parent']
EXACT exit=1 | branch: the toggle search skips the siblings after the menu | tests/src/browser/Delegate.test.ts | 1 failed of 120 | named: ['passes over a disabled toggle before the menu to the toggle after it, and over a toggle nested in a sibling'] | joined: []
EXACT exit=1 | branch: the toggle search reads the siblings after the menu first | tests/src/browser/Delegate.test.ts | 1 failed of 120 | named: ['prefers the toggle before the menu to the one after it, and falls back to the first toggle inside the menu parent'] | joined: []
EXACT exit=1 | branch: the toggle search skips the menu parent | tests/src/browser/Delegate.test.ts | 1 failed of 120 | named: ['prefers the toggle before the menu to the one after it, and falls back to the first toggle inside the menu parent'] | joined: []
EXACT exit=1 | branch: the toggle search takes a disabled toggle | tests/src/browser/Delegate.test.ts | 1 failed of 120 | named: ['passes over a disabled toggle before the menu to the toggle after it, and over a toggle nested in a sibling'] | joined: []
EXACT exit=1 | branch: the menu search skips the siblings after the toggle | tests/src/browser/Dropdown.test.ts | 1 failed of 34 | named: ['finds the menu after the toggle, then before it, then inside its parent'] | joined: []
EXACT exit=1 | branch: the menu search skips the siblings before the toggle | tests/src/browser/Dropdown.test.ts | 1 failed of 34 | named: ['takes the nearest menu before the toggle over the first one in its parent, and passes over a nearer menu that is not HTML'] | joined: []
EXACT exit=1 | branch: the menu search reads the siblings before the toggle first | tests/src/browser/Dropdown.test.ts | 1 failed of 34 | named: ['finds the menu after the toggle, then before it, then inside its parent'] | joined: []
EXACT exit=1 | branch: the menu search skips the toggle parent | tests/src/browser/Dropdown.test.ts | 1 failed of 34 | named: ['finds the menu after the toggle, then before it, then inside its parent'] | joined: []
EXACT exit=1 | branch: the menu search takes a menu that is not HTML | tests/src/browser/Dropdown.test.ts | 1 failed of 34 | named: ['takes the nearest menu before the toggle over the first one in its parent, and passes over a nearer menu that is not HTML'] | joined: []
EXACT exit=1 | branch: the scrollspy parent is the farthest preceding one | tests/src/browser/ScrollSpy.test.ts | 1 failed of 27 | named: ['stops activating when a reaction to its parent write destroys it, dispatching nothing and restoring every link'] | joined: []
JOINED exit=1 | branch: the scrollspy reads no preceding parent | tests/src/browser/ScrollSpy.test.ts | 3 failed of 27 | named: ['activates the links that lead to the active one, a nested list parent or a dropdown toggle, and clears them at the next activation'] | joined: ['writes, tests, reads, and matches only the replacing values when every group is replaced', 'stops activating when a reaction to its parent write destroys it, dispatching nothing and restoring every link']
GREEN? exit=0 | tests/src/browser/helpers.test.ts | 0 failed of 55 | []
GREEN? exit=0 | tests/src/browser/Delegate.test.ts | 0 failed of 120 | []
GREEN? exit=0 | tests/src/browser/Dropdown.test.ts | 0 failed of 34 | []
GREEN? exit=0 | tests/src/browser/ScrollSpy.test.ts | 0 failed of 27 | []
digest after: {"src/browser/helpers.ts": "4acd0a9d69b457fe19ad13abc9ad10c2ea9951380f4f255f690f198ce623479c", "src/browser/Delegate.ts": "1853f94f67fb53e1eea39f74a7edf1e8dbed209a1ec62c8bcc6449be2478f0ab", "src/browser/Dropdown.ts": "3b0f9ea566ca6c38bf26dcf36790efc01b2af65a901d5dbfbd4a4518199a5757", "src/browser/ScrollSpy.ts": "f56d944dbd4bd7420253592f1198809415db5ecfdb26973954062a7e6f6d7034"}
receipt: restored byte for byte
```

## Acceptance (`bash tmp/j-helpers/acceptance.sh`)

The step exit codes, in chain order:
```
chromium exit=0
check exit=0
lint exit=0
format exit=0
grep-retired exit=1
grep-walks exit=0
grep-disabled exit=0
grep-removed exit=1
browser exit=0
guides exit=0
policy exit=0
build-core exit=0
build-styles exit=0
build-browser exit=0
conformance exit=0
setup exit=0
```
Both grep steps that exit 1 matched nothing, which is the pass condition. Each full log is `tmp/j-helpers/acceptance-<step>.log.txt`. The result lines, verbatim:

- **chromium:** `Chromium 153.0.8010.12`
- **check** (`npm run check:src:browser`) printed only the `npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json` banner.
- **lint** printed only the `oxlint … --deny-warnings src/browser tests/src/browser` banner.
- **format:** `All matched files use the correct format.` / `Finished in 6397ms on 48 files using 16 threads.`
- **grep-retired** (`isDisabled` over `src tests guides`): no output.
- **grep-walks**, all in `helpers.ts`:
  ```
  src/browser/helpers.ts:410:		let sibling = forward ? element.nextElementSibling : element.previousElementSibling;
  src/browser/helpers.ts:412:		sibling = forward ? sibling.nextElementSibling : sibling.previousElementSibling
  src/browser/helpers.ts:437:	const nested = new Set(root.querySelectorAll(`:scope :is(${selector}) :is(${selector})`))
  ```
- **grep-disabled.** `types.ts:868` is the stale TSDoc the shared patch fixes. `types.ts:874` is the entry selector's TSDoc declaration. `Delegate.ts:731` is the declared entry selector.
  ```
  src/browser/Delegate.ts:731:				`:is(${this.#dropdown.selectors.entry}):not(.${CSS.escape(disabled)}, :disabled)`,
  src/browser/helpers.ts:464:		(element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false')
  src/browser/types.ts:868:	/** Selects the toggles that open a menu; the engine matches `:is({trigger}):not(.{disabled}, :disabled)`, reading `disabled` from `classes`. Default: `[data-bs-toggle="dropdown"]`. */
  src/browser/types.ts:874:	/** Selects the menu entries the arrow keys move focus between; the engine matches `:is({menu}) :is({entry}):not(.{disabled}, :disabled)`, reading `disabled` from `classes`. Default: `.dropdown-item`. */
  ```
- **grep-removed:** no output.
- **browser:** `Test Files  22 passed (22)` / `Tests  639 passed (639)`. The log also carries the stderr of a HostSnapshot case, "withdraws an overlapping earliest recording when its restoration throws inside a reaction"; that case expects the uncaught `SyntaxError` it logs.
- **guides:** `Test Files  1 passed (1)` / `Tests  19 passed (19)`
- **policy:** `Test Files  1 passed (1)` / `Tests  109 passed | 1 skipped (110)`
- **build-core:** `dist/src/core/index.cjs  9.94 kB …` / `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`
- **build-styles:** `dist/src/styles/index.css  220.24 kB │ gzip: 28.20 kB`
- **build-browser:** `dist/src/browser/index.js  212.74 kB │ gzip: 47.30 kB │ map: 391.94 kB`
- **conformance:** `Test Files  1 passed (1)` / `Tests  22 passed (22)`
- **setup:** `Test Files  4 passed (4)` / `Tests  281 passed (281)`

## Status and diffstat

```
 M guides/veneer.md
 M src/browser/Carousel.ts
 M src/browser/Collapse.ts
 M src/browser/Delegate.ts
 M src/browser/Dropdown.ts
 M src/browser/Modal.ts
 M src/browser/ScrollLock.ts
 M src/browser/ScrollSpy.ts
 M src/browser/Tab.ts
 M src/browser/helpers.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/Dropdown.test.ts
 M tests/src/browser/ScrollSpy.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
```
```
 guides/veneer.md                    | 102 ++++++++++---------
 src/browser/Carousel.ts             |   7 +-
 src/browser/Collapse.ts             |   9 +-
 src/browser/Delegate.ts             | 113 ++++++++-------------
 src/browser/Dropdown.ts             |  35 +++----
 src/browser/Modal.ts                |   7 +-
 src/browser/ScrollLock.ts           |   9 +-
 src/browser/ScrollSpy.ts            |  24 ++---
 src/browser/Tab.ts                  |  17 ++--
 src/browser/helpers.ts              | 131 ++++++++++++++++++++++--
 tests/src/browser/Delegate.test.ts  |  58 +++++++++++
 tests/src/browser/Dropdown.test.ts  |  67 +++++++++++++
 tests/src/browser/ScrollSpy.test.ts |  21 ++++
 tests/src/browser/helpers.test.ts   | 195 +++++++++++++++++++++++++++++++++---
 tests/src/browser/index.test.ts     |   6 +-
 15 files changed, 599 insertions(+), 202 deletions(-)
```

## Shared-file patches

This `src/browser/types.ts` patch is the only shared-file change the unit needs:
```diff
@@ -865,7 +865,7 @@ export interface DropdownAttributeMap {
 
 /** Names the selectors a dropdown and the delegate match with; a dropdown constructed directly matches with `menu` and `navbar` alone. */
 export interface DropdownSelectorMap {
-	/** Selects the toggles that open a menu; the engine matches `:is({trigger}):not(.{disabled}, :disabled)`, reading `disabled` from `classes`. Default: `[data-bs-toggle="dropdown"]`. */
+	/** Selects the toggles that open a menu; a toggle the `matchesDisabled` function reads as disabled with the `disabled` token from `classes` neither opens nor closes its menu. Default: `[data-bs-toggle="dropdown"]`. */
 	readonly trigger: string
 	/** Selects the menu a toggle opens. Default: `.dropdown-menu`. */
 	readonly menu: string
```
`src/browser/index.ts` already star-exports `./helpers.js`, so it needs no patch. `tests/setupBrowser.ts` and `ROADMAP.md` need none either.

## Deviation state

No stop. Beyond the three decisions at the top, I settled these within scope:
- I rewrapped each guide paragraph I edited at 100 columns; the edited lines are otherwise unchanged.
- In the § Delegation paragraph on target resolution, I added one sentence on the bounded `readTarget` and the routes that pass the root.
- Both `Delegate.test.ts` cases and the `Dropdown.test.ts` menu-location case close the unpinned branches found in unknown 1. H2 asked only for the disabled-toggle case.
