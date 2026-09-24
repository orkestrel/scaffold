# J-HELPERS round 2 — the writer's returned report (retained verbatim 2026-09-24)

Writer: `opus` on Opus 5.5, native subagent `a2b8ce9a0785041b6`, resumed in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/helpers`. Brief: `j-helpers-brief-2.md`. Instrument: `j-helpers-mutations-2.py` with its log `j-helpers-mutations-2.log.txt`, the chain `j-helpers-acceptance-2.sh`, and the row-restoring script `j-helpers-restore-row.py`, retained beside this file. The Orchestrator accepts the typed pair table over the brief's named guards: it removes the inference that caused the three errors, and the element reads keep their `requireValue` narrowing.

---

Round 2 is done: A, B, and C are closed, and every acceptance step exits 0, including the tree-wide `npm run check`. The instrument reddens every row again and its receipt reads `restored byte for byte`.

One deviation you should review: for B I typed the case table instead of narrowing each value with `requireValue` or `isInstance`, which is what the brief named. Details are under B and in the deviation state.

## Files touched this round

All paths are in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/helpers`.

- `tests/src/browser/Delegate.test.ts`: in the case "prefers the toggle before the menu to the one after it, and falls back to the first toggle inside the menu parent", the pair list is now a typed `pairs` table.
- `guides/veneer.md`: the § Compatibility `util/index.js` row is back to `main`'s text.
- `tmp/j-helpers/acceptance.sh`: the `grep-retired` step excludes that one row, and a `check-tree` step runs `npm run check`.
- `tmp/j-helpers/restore_row.py` (new): the script that restored the row.

## A. The row

`tmp/j-helpers/restore_row.py` copied the `main` row byte for byte:
```
restored line 7901
row-identical
```
`git diff guides/veneer.md` no longer mentions `util/index.js`. `main` is `a9cbeec`, and the row is identical at the base `e8251cf` (`same-at-base`). Every other guide edit from round 1 stands. The ungrepped search now finds the retired name only in that row:
```
guides/veneer.md:7901:| engine           | method         | util/index.js: `getUID`, `getElement`, `isElement`, `isVisible`, `isDisabled`, `isRTL`, `toType`, `noop`, `parseSelector`, `reflow`, `execute`, `findShadowRoot`, `getNextActiveElement` exported as shared utilities  …  | —  | accepted |
```

## B. The tree-wide typecheck

The three errors came from an untyped array literal: TypeScript inferred `string[][]`, so each destructured value read as `string | undefined`. The fix declares the table the way the sibling case "finds the toggle for a key inside a menu among the menu siblings" already does:
```ts
		const pairs: ReadonlyArray<readonly [string, string]> = [
			['#between', '#before'],
			['#orphan', '#deep'],
		]
		for (const [entry, toggle] of pairs) {
```
The element reads were already narrowed by `requireValue`. The code has no `!` and no `as`. `npm run check` exits 0 (`check-tree exit=0`).

## C. The acceptance grep

The `grep-retired` step now reads:
```bash
retired() {
	grep -rn "isDisabled" src tests
	grep -n "isDisabled" guides/veneer.md | grep -v "| engine           | method         | util/index.js"
}
step grep-retired retired
```
Its output is empty, so it matches nothing. The step's exit code is the trailing `grep -v`'s and is 1 on empty input; the empty output is the pass signal.

## Mutation table (verbatim from `tmp/j-helpers/mutations-2.log.txt`)

The source files are unchanged since round 1, so no row needed re-anchoring. The table equals the round-1 table in `j-helpers-report.md` row for row (the same digests before and after, the same twenty-two mutation rows each `EXACT` or `JOINED`, the four `GREEN?` rows at 0 failed of 55, 120, 34, and 27, and `receipt: restored byte for byte`); the retained log `j-helpers-mutations-2.log.txt` is the source.

## Acceptance (`bash tmp/j-helpers/acceptance.sh`, log `tmp/j-helpers/acceptance-2.log.txt`)

These are the step exit codes, in chain order:
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
The two grep steps that exit 1 matched nothing, which is their pass condition. Each step's output, from `tmp/j-helpers/acceptance-<step>.log.txt`:

- **chromium:** `Chromium 153.0.8010.12`
- **check** printed only its `npm notice` banner: `tsc --noEmit -p configs/src/tsconfig.browser.json`.
- **check-tree** (`npm run check`) printed only banners: `tsc --noEmit --project tsconfig.json`, then `configs/src/tsconfig.core.json`, `configs/src/tsconfig.browser.json`, and `configs/src/tsconfig.styles.json`, then `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`. No diagnostics.
- **lint** printed only its banner: `oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`.
- **format:** `All matched files use the correct format.` / `Finished in 6611ms on 48 files using 16 threads.`
- **grep-retired:** no output.
- **grep-walks:**
  ```
  src/browser/helpers.ts:410:		let sibling = forward ? element.nextElementSibling : element.previousElementSibling;
  src/browser/helpers.ts:412:		sibling = forward ? sibling.nextElementSibling : sibling.previousElementSibling
  src/browser/helpers.ts:437:	const nested = new Set(root.querySelectorAll(`:scope :is(${selector}) :is(${selector})`))
  ```
- **grep-disabled.** `types.ts:868` is expected until the patch lands. `types.ts:874` and `Delegate.ts:731` are the entry selector's declaration and its use.
  ```
  src/browser/Delegate.ts:731:				`:is(${this.#dropdown.selectors.entry}):not(.${CSS.escape(disabled)}, :disabled)`,
  src/browser/helpers.ts:464:		(element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false')
  src/browser/types.ts:868:	/** Selects the toggles that open a menu; the engine matches `:is({trigger}):not(.{disabled}, :disabled)`, reading `disabled` from `classes`. Default: `[data-bs-toggle="dropdown"]`. */
  src/browser/types.ts:874:	/** Selects the menu entries the arrow keys move focus between; the engine matches `:is({menu}) :is({entry}):not(.{disabled}, :disabled)`, reading `disabled` from `classes`. Default: `.dropdown-item`. */
  ```
- **grep-removed:** no output.
- **browser:** `Test Files  22 passed (22)` / `Tests  639 passed (639)`. The log also carries the console error from the HostSnapshot case that deliberately throws a `DOMTokenList` `SyntaxError` inside a reaction.
- **guides:** `Test Files  1 passed (1)` / `Tests  19 passed (19)`
- **policy:** `Test Files  1 passed (1)` / `Tests  109 passed | 1 skipped (110)`
- **build-core:** `dist/src/core/index.js  9.78 kB …`, `dist/src/core/index.cjs  9.94 kB …`, `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`
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
 guides/veneer.md                    | 100 ++++++++++--------
 src/browser/Carousel.ts             |   7 +-
 src/browser/Collapse.ts             |   9 +-
 src/browser/Delegate.ts             | 113 ++++++++-------------
 src/browser/Dropdown.ts             |  35 +++----
 src/browser/Modal.ts                |   7 +-
 src/browser/ScrollLock.ts           |   9 +-
 src/browser/ScrollSpy.ts            |  24 ++---
 src/browser/Tab.ts                  |  17 ++--
 src/browser/helpers.ts              | 131 ++++++++++++++++++++++--
 tests/src/browser/Delegate.test.ts  |  59 +++++++++++
 tests/src/browser/Dropdown.test.ts  |  67 +++++++++++++
 tests/src/browser/ScrollSpy.test.ts |  21 ++++
 tests/src/browser/helpers.test.ts   | 195 +++++++++++++++++++++++++++++++++---
 tests/src/browser/index.test.ts     |   6 +-
 15 files changed, 599 insertions(+), 201 deletions(-)
```

## `types.ts` patch (unchanged, report-only)

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

## Deviation state

No stop. I settled one choice myself: the brief said to narrow with `requireValue` or `isInstance`, but the three errors came from an inferred type. A typed `ReadonlyArray<readonly [string, string]>` table removes them at the source. It matches the sibling case, and the element reads keep their `requireValue` narrowing.

If you want the literal method instead, wrap `entry` and `toggle` in `requireValue`. That takes a few more lines of test code and changes no behaviour.
