# J-HELPERS round 3 — the writer's returned report (retained verbatim 2026-09-24)

Writer: `opus` on Opus 5.5, native subagent `a2b8ce9a0785041b6`, resumed in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/helpers`. Brief: `j-helpers-brief-3.md`. Instrument: `j-helpers-mutations-3.py` with its log `j-helpers-mutations-3.log.txt`, the chain `j-helpers-acceptance-3.sh`, and the red and green logs `j-helpers-a-red.log.txt`, `j-helpers-a-green.log.txt`, `j-helpers-b-red.log.txt`, `j-helpers-b-green.log.txt`, retained beside this file. The mutation table the report quotes is the retained log, row for row.

---

# J-HELPERS round 3 — report (`opus` on Opus 5.5, worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/helpers`)

Items A to E are all closed. A and B went red before their fixes. Every acceptance step exits 0 on Chromium 153.0.8010.12, including the tree-wide `npm run check`. The instrument reddens every row, including the new A and B rows, and its receipt reads `restored byte for byte`. There is no stop.

One side effect: the § Surface table's diff is large (+315/−299) because the mandated `readClosest` Summary is wider than the column, so `oxfmt` re-pads every row. Most of that is padding: ignoring whitespace (`git diff -w --stat`), the guide's diff is +62/−46. This round made no `prove` call.

## Files touched this round

- `src/browser/helpers.ts` (A, D):
  - `readOutermost` now decides nesting from the matches themselves (`other !== match && other.contains(match)`). The `:scope`/`:is()` query is gone, and the remark is rewritten for the new rule.
  - The `readClosest` description uses the ruled text, and its remark says "can lie" instead of "may lie".
  - The `matchesDisabled` summary states the three reads, and its remark keeps the fieldset difference from Bootstrap.
  - The `readScrollbarWidth` remark names the caller as the one that reads `0`.
- `src/browser/Dropdown.ts` (B):
  - `#refused(shown, guarded)` and `#conceal(click, guarded)` take a boolean that decides whether the disabled reading applies.
  - `show` passes `true` at both refusal reads, and so does `hide`, which `toggle` calls. `#lightDismiss` passes `false`, as Bootstrap's `clearMenus` does.
- `src/browser/ScrollSpy.ts` (C): `#scrollTo` reads `readClosest(origin, '[href]')` behind the existing `isInstance(origin, Element)` check.
- `src/browser/Delegate.ts` (C): the fallback in `#locate` reads `readClosest(trigger, '.' + CSS.escape(classes.host))` after the unbounded `readTarget`, then applies the root containment as before.
- `tests/src/browser/helpers.test.ts` (A): two cases, one with a `Document` root and one with a `DocumentFragment` root.
- `tests/src/browser/Dropdown.test.ts` (B): one light-dismissal case.
- `guides/veneer.md` (B, D): the § Surface rows for `readClosest` and `matchesDisabled`, the `#### Dropdown` refusal sentence, and one sentence added to the light-dismissal paragraph.
- `tmp/j-helpers/mutations.py` (E): rows re-anchored and new rows added. The scripts `round3_tests.py`, `round3_source.py`, `round3_guide.py`, and `round3_instrument.py` apply this round's edits.

## A. `readOutermost` over its declared domain

**Red before the fix**, from `npm run test:src:browser -- tests/src/browser/helpers.test.ts` (log `tmp/j-helpers/a-red.log.txt`):
```
 FAIL  |src:browser (chromium)| tests/src/browser/helpers.test.ts:837:2 > readOutermost > judges nesting under a document root, where the document element nests the body
AssertionError: expected [ …(2) ] to deeply equal [ …(1) ]
 FAIL  |src:browser (chromium)| tests/src/browser/helpers.test.ts:844:2 > readOutermost > judges nesting under a fragment root
AssertionError: expected [ …(3) ] to deeply equal [ …(2) ]
 Test Files  1 failed (1)
      Tests  2 failed | 55 passed (57)
```
**Green after the fix**, same command (log `a-green.log.txt`):
```
 Test Files  1 passed (1)
      Tests  57 passed (57)
```
- The document-root case builds a fresh HTML document whose document element and body both carry the class. It expects `[owner.documentElement]`.
- The fragment-root case holds an outer match with a nested match, plus a lone match. It expects `[outer, lone]`.
- Every existing `readOutermost` case stays green, and so do the Carousel and Collapse suites (the full browser run shows 22 files, 642 tests).

## B. Dropdown light dismissal

**Red before the fix**, from `npm run test:src:browser -- tests/src/browser/Dropdown.test.ts` (log `b-red.log.txt`):
```
 FAIL  |src:browser (chromium)| tests/src/browser/Dropdown.test.ts:540:2 > Dropdown > closes the open menu of a toggle that reads as disabled on a click outside and on a Tab release that leaves it, while hide refuses it
Error: Condition "the outside click closes the menu" did not hold within 1000ms (waited 1009.7000000029802ms)
 ❯ tests/src/browser/Dropdown.test.ts:567:2
 Test Files  1 failed (1)
      Tests  1 failed | 34 passed (35)
```
**Green after the fix**, same command (log `b-green.log.txt`):
```
 Test Files  1 passed (1)
      Tests  35 passed (35)
```
The case opens two menus, each through the engine, and writes `disabled` onto each anchor toggle only after its menu is open.
- For the first menu, `hide()` and `toggle()` resolve `false` while the menu stays open. An outside click then closes it.
- For the second menu, a trusted `{Tab}` release from its last item moves focus to `#after` and closes the menu. After that, `show()` resolves `false`.

The guide now says the `show` and `hide` methods refuse by the shared reading. Bootstrap's `show` and `hide` apply the same reading, except that Veneer's `:disabled` match also reads a toggle inside a disabled `fieldset` as disabled, the difference § Delegation records. No call closes a disabled toggle's open menu, but light dismissal still does. The light-dismissal paragraph adds: "Light dismissal reads no disabled state, so it closes the open menu of a toggle the `matchesDisabled` function reads as disabled, as Bootstrap's `clearMenus` function closes it."

## C. The two remaining `closest` reads

The diff for both sites:
```
-		const link = isInstance(origin, Element) ? origin.closest('[href]') : null
-		const section = isInstance(link, HTMLElement) ? this.#sections.get(link) : undefined
+		const link = isInstance(origin, Element) ? readClosest(origin, '[href]') : undefined
+		const section = link === undefined ? undefined : this.#sections.get(link)
```
```
-		const host = readTarget(trigger, attributes) ?? trigger.closest(`.${CSS.escape(classes.host)}`)
-		return isInstance(host, HTMLElement) && this.#root.contains(host) ? host : undefined
+			readTarget(trigger, attributes) ?? readClosest(trigger, `.${CSS.escape(classes.host)}`)
+		return host !== undefined && this.#root.contains(host) ? host : undefined
```
No behaviour changes. The ScrollSpy (27 tests) and Delegate (120 tests) suites stay green.

## D. Wording

- **`readClosest`** description and § Surface Summary: "Returns the closest element a selector matches from an element, the element itself included, when that element is an HTML element and the optional root contains it." The remark reads "can lie".
- **`matchesDisabled`** description and § Surface Summary: "Checks whether an element carries a disabled token, matches the platform's `:disabled` state, or carries a `disabled` attribute whose value is not `false`." The remark keeps "…and so does one inside a disabled fieldset, which Bootstrap's read of the element's own `disabled` property does not…".
- **`readScrollbarWidth`** remark: "A caller reads `0` from a view whose scrollbars overlay the page."
- **`#### Dropdown`**: the refusal and light-dismissal sentences quoted under B.
- **`types.ts`**: the patch at the end, reworded as ruled.

`npm run test:guides` shows 19 of 19 passing.

## E. Mutation table

The row changes this round:
- **Re-anchored:** the `readOutermost` rows now mutate the matches-based body. The Dropdown refusal row now mutates the `(guarded && …)` line.
- **Replaced:** the `:is()`-wrapper row. The wrapper no longer exists; a comment in the instrument records why. Its place goes to "judges nesting by the last part of a selector list alone", the hazard the wrapper guarded.
- **Added:** the three rows the brief names.

The Dropdown refusal row now also reddens B's case, because that case calls `hide`/`toggle` on the disabled anchor. The table is the retained `j-helpers-mutations-3.log.txt`: twenty-six mutation rows each `EXACT` or `JOINED`, the four `GREEN?` rows at 0 failed of 57, 120, 35, and 27, the digests before and after equal, and `receipt: restored byte for byte`.

## E. Acceptance (`bash tmp/j-helpers/acceptance.sh`, log `tmp/j-helpers/acceptance-3.log.txt`)

The chain ran on the final sources. The only later edit was the re-anchor of one instrument row, which is under `tmp/`.
```
chromium exit=0
check exit=0
check-tree exit=0
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
The two grep steps that exit 1 matched nothing, which is their pass condition. The output of each step, taken from `tmp/j-helpers/acceptance-<step>.log.txt`:

- **chromium:** `Chromium 153.0.8010.12`
- **check, check-tree, lint:** each printed only its `npm notice` banners and no diagnostics. `check` ran `check:src:browser`. `check-tree` ran `tsc --noEmit --project tsconfig.json`, then the core, browser, and styles configs, then `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`. `lint` ran `oxlint --deny-warnings`.
- **format:** `All matched files use the correct format.` / `Finished in 6774ms on 48 files using 16 threads.`
- **grep-retired:** no output.
- **grep-walks:** the `:scope ` line is gone.
  ```
  src/browser/helpers.ts:410:		let sibling = forward ? element.nextElementSibling : element.previousElementSibling;
  src/browser/helpers.ts:412:		sibling = forward ? sibling.nextElementSibling : sibling.previousElementSibling
  ```
- **grep-disabled:** `types.ts:868` is expected until the patch lands. `types.ts:874` and `Delegate.ts:732` are the entry selector.
  ```
  src/browser/Delegate.ts:732:				`:is(${this.#dropdown.selectors.entry}):not(.${CSS.escape(disabled)}, :disabled)`,
  src/browser/helpers.ts:465:		(element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false')
  src/browser/types.ts:868:	/** Selects the toggles that open a menu; the engine matches `:is({trigger}):not(.{disabled}, :disabled)`, reading `disabled` from `classes`. Default: `[data-bs-toggle="dropdown"]`. */
  src/browser/types.ts:874:	/** Selects the menu entries the arrow keys move focus between; the engine matches `:is({menu}) :is({entry}):not(.{disabled}, :disabled)`, reading `disabled` from `classes`. Default: `.dropdown-item`. */
  ```
- **grep-removed:** no output.
- **browser:** `Test Files  22 passed (22)` / `Tests  642 passed (642)`
- **guides:** `Test Files  1 passed (1)` / `Tests  19 passed (19)`
- **policy:** `Test Files  1 passed (1)` / `Tests  109 passed | 1 skipped (110)`
- **build-core:** `dist/src/core/index.js  9.78 kB │ gzip: 2.63 kB │ map: 15.17 kB` / `dist/src/core/index.cjs  9.94 kB │ gzip: 2.70 kB │ map: 15.19 kB` / `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`
- **build-styles:** `dist/src/styles/index.css  220.24 kB │ gzip: 28.20 kB` / `dist/src/styles/index.js     0.00 kB │ gzip:  0.02 kB`
- **build-browser:** `dist/src/browser/index.js  213.03 kB │ gzip: 47.35 kB │ map: 392.61 kB`
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
 guides/veneer.md                    | 614 ++++++++++++++++++------------------
 src/browser/Carousel.ts             |   7 +-
 src/browser/Collapse.ts             |   9 +-
 src/browser/Delegate.ts             | 118 +++----
 src/browser/Dropdown.ts             |  58 ++--
 src/browser/Modal.ts                |   7 +-
 src/browser/ScrollLock.ts           |   9 +-
 src/browser/ScrollSpy.ts            |  29 +-
 src/browser/Tab.ts                  |  17 +-
 src/browser/helpers.ts              | 136 +++++++-
 tests/src/browser/Delegate.test.ts  |  59 ++++
 tests/src/browser/Dropdown.test.ts  | 104 ++++++
 tests/src/browser/ScrollSpy.test.ts |  21 ++
 tests/src/browser/helpers.test.ts   | 212 ++++++++++++-
 tests/src/browser/index.test.ts     |   6 +-
 15 files changed, 934 insertions(+), 472 deletions(-)
```

## `types.ts` patch (report-only, reworded as ruled)

```diff
@@ -865,7 +865,7 @@ export interface DropdownAttributeMap {
 
 /** Names the selectors a dropdown and the delegate match with; a dropdown constructed directly matches with `menu` and `navbar` alone. */
 export interface DropdownSelectorMap {
-	/** Selects the toggles that open a menu; the engine matches `:is({trigger}):not(.{disabled}, :disabled)`, reading `disabled` from `classes`. Default: `[data-bs-toggle="dropdown"]`. */
+	/** Selects the toggles that open a menu; a toggle the `matchesDisabled` function reads as disabled with the `disabled` token from `classes` is refused by `show`, `hide`, and `toggle`. Default: `[data-bs-toggle="dropdown"]`. */
 	readonly trigger: string
 	/** Selects the menu a toggle opens. Default: `.dropdown-menu`. */
 	readonly menu: string
```

## Deviation state

No stop. I settled three choices within scope:
1. **B's switch.** Light dismissal skips the disabled reading through a boolean parameter, `guarded`, on the private `#refused` and `#conceal` methods. The design law allows a boolean for a binary behaviour. It keeps one refusal method, and `show` and `hide` still re-read the disabled state after their events dispatch.
2. **The replaced instrument row.** The ":is() wrapper dropped" row can't run because A deleted the wrapper. The "last part of a selector list alone" row replaces it, and a comment in the instrument records why.
3. **The § Surface table re-pad.** The mandated `readClosest` Summary widens the table's summary column, so `oxfmt` re-pads every row of the table. That padding makes up most of the guide's diff.
