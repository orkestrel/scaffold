# J-DROPDOWN round 1 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, native subagent, 171 tool uses, 3309 s; retained from the subagent's return text with the mutation table replaced by a pointer to the retained log `j-dropdown-mutations.log.txt`, which carries it row for row; the tree is the worktree `veneer/tmp/worktrees/dropdown` on `unit/dropdown` from `e24e2c3`, uncommitted)

I've built the unit. Every acceptance command exits 0 on Chromium 153.0.8010.12. The instrument's log ends `receipt: restored byte for byte`, and every one of its mutations reddens its named case. There are deviations to rule on. The largest is that light dismissal lives in the `Dropdown` engine, not the delegate (D1 at the end). I made no call to the `prove` MCP server because a subagent cannot reach it.

## Files touched (all under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown`)

| File | Change |
|---|---|
| `src/browser/Dropdown.ts` (new) | The `Dropdown` engine: finds the menu, resolves options, show/hide/toggle/update/destroy with a door read after each write, and light dismissal. |
| `src/browser/Placement.ts` (new) | The `Placement` mechanism: `popover` promotion, UA reset, anchor properties, `position: fixed`, offset margins, fallbacks, static mode, side measurement, restore. |
| `src/browser/constants.ts` | `DROPDOWN_EVENTS`, `DROPDOWN_CLASSES`, `DROPDOWN_ATTRIBUTES`, `DROPDOWN_SELECTORS`, `DROPDOWN_DEFAULTS`, `PLACEMENT_ATTRIBUTES`, `PLACEMENT_DEFAULTS`, `PLACEMENT_AREAS`, `POPOVER_PROPERTIES`. |
| `src/browser/validators.ts` | `isDropdownEvent`. |
| `src/browser/parsers.ts` | `parseDismiss`, `parseOffset`, `parseStatic`. |
| `src/browser/helpers.ts` | `computeNeighbor` (D2: an off-limits file). |
| `src/browser/Delegate.ts` | The dropdown click route, the `keydown` route (arrows and Escape), the dropdown vocabulary, a generalized `#conflicts`, and `#discard` covering dropdowns. |
| `src/browser/index.ts` | Barrels `Placement.js` and `Dropdown.js`. |
| `tests/src/browser/Dropdown.test.ts` (new) | 27 cases. |
| `tests/src/browser/Placement.test.ts` (new) | 13 cases. |
| `tests/src/browser/Delegate.test.ts` | 10 dropdown cases; the listener case now expects `[root, root]`. |
| `tests/src/browser/validators.test.ts`, `parsers.test.ts`, `helpers.test.ts`, `index.test.ts` | Rows for the new exports and the grown export list. |
| `guides/veneer.md` | § Surface rows, the Dropdown fence in § Examples, `#### Dropdown`, and the `plugin` row set to `shipped` with Proof `tests/src/browser/Dropdown.test.ts` (Obligation cell unchanged). |

## Obligations

**Red reading, taken before any implementation.** Command: `npm run test:src:browser -- tests/src/browser/Dropdown.test.ts tests/src/browser/Placement.test.ts tests/src/browser/Delegate.test.ts tests/src/browser/validators.test.ts tests/src/browser/parsers.test.ts tests/src/browser/helpers.test.ts tests/src/browser/index.test.ts` — `SyntaxError: The requested module '/src/browser/index.ts' does not provide an export named 'DROPDOWN_SELECTORS'` (and the same for `DROPDOWN_ATTRIBUTES`, `computeNeighbor`, `parseDismiss`, `PLACEMENT_AREAS`, `isDropdownEvent`); `Test Files  7 failed (7)` / `Tests  1 failed | 2 passed (3)`. This red is at load level. The mutation table binds each case to its behaviour one mutation at a time (retained as `j-dropdown-red.log.txt`).

**Green readings** (verbatim from the instrument's log): Dropdown 0 failed of 27, Placement 0 of 13, Delegate 0 of 44, validators 0 of 12, parsers 0 of 9, helpers 0 of 34, index 0 of 3.

The cases that pin each obligation (rows numbered by log line):
- **DROPDOWN1 (the engine).** "opens the menu in the top layer below the start of its toggle…" (rows 2–8); "takes the side and edge from the wrapper direction tokens…" (9–10); "leaves the menu in flow with the static popper attribute…" (11); "offsets the menu from the offset attribute and anchors it to the reference…" (12–13); "refuses to show or hide a disabled toggle…" (21); "leaves the toggle and the menu untouched when a listener prevents…" (22); "dispatches bubbling events on the toggle…" (23–24); "writes, tests, reads, and matches only the replacing values…" (25–27); "refuses a group value… a declared attribute… a toggle without a menu…" (28–29); "finds the menu after the toggle, then before it, then inside its parent" (30); "refuses an invalid host and a second owner…" (31); "binds its hooks, the document listeners, and the signal…" (32); "closes the open menu without events on destruction…" (33); the door cases (35–40); "measures and rewrites the side of the open menu at an update".
- **DROPDOWN2 (`Placement`).** All 13 cases in `Placement.test.ts` (rows 41–55), plus the Dropdown case "reads the same border, padding, background, color, and overflow on the promoted menu…".
- **DROPDOWN3 (delegate keyboard and click route, light dismissal).** Delegate cases, rows 56–70: click route, replaced selector, trusted arrow keys with no wrap among entries, Escape, text-field exception, disabled toggle, toggle found from inside a menu, nested roots, same-host refusal against the button route, observer release, group validation. Light-dismissal cases in `Dropdown.test.ts`, rows 14–20 (see D1): outside click, trusted inside click, and trusted Tab carrying `click`; toggle, secondary-button, form-control, and non-Tab exceptions; the auto-close matrix from the attribute and the constructor.
- **DROPDOWN4 (guard, tables, parsers, barrel).** The frozen-tables case (row 34), `isDropdownEvent` (71–72), the parsers (73–77), `computeNeighbor` (78–80), and the barrel (81).

## Unknowns
1. **`reference`:** the `parent` value resolves to `toggle.parentElement`, Bootstrap's `_parent`; a parent that is not an HTMLElement throws `DROPDOWN_OPTION_INVALID`. A constructor element anchors through the same mechanism: `Placement` adds its generated name to that element's `anchor-name` list. Pinned by "offsets the menu … anchors it to the reference the attribute or the constructor names": the menu's top sits at the span's bottom plus 5, and the anchor name is gone after destroy.
2. **Anchor properties:** yes. `Placement` writes `anchor-name` on the reference (appended to any existing names); `position-anchor`, `position-area`, `position-try-order: normal`, an `auto` inset, and the offset as margins; `position-try-fallbacks`: `flip-block` above and below, `flip-inline` beside, a listed fallback as its area keyword, `none` for `[]`; `position: fixed` (D4). Direction mapping: default → `bottom span-right`; with `--bs-position: end` → `bottom span-left`; `up` → `top span-right` or `top span-left`; `end` → `right span-bottom`; `start` → `left span-bottom`; `center.down` → `bottom`; `center.up` → `top`. The proofs read geometry, not serialization, because Chromium serializes `bottom span-right` as `span-right bottom`.
3. **Guard reading:** `isInstance(value, CustomEvent)` typechecks (`npm run check:src:browser` exit 0). It narrows to `CustomEvent<any>`, and the guard reads `detail` into an `unknown` binding.

## Mutation table
Retained verbatim as `j-dropdown-mutations.log.txt` (81 `EXACT` or `JOINED` rows, seven `GREEN?` rows at 0 failed, identical digests, `receipt: restored byte for byte`). An earlier full run (retained as `j-dropdown-mutations-first-run.log.txt`) had three MISSED rows: the menu token door at hide, the element keeping its own position, and a key inside a menu looking after the menu alone. I strengthened those proofs and the final run reddens all three.

## Acceptance commands (full logs in `tmp/j-dropdown/acceptance/*.log.txt`)
```
check        npm run check:src:browser → tsc --noEmit -p configs/src/tsconfig.browser.json → exit=0
lint         npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser → exit=0
format       npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md → All matched files use the correct format. / Finished in 7511ms on 28 files using 16 threads. exit=0
browser      npm run test:src:browser → Test Files  12 passed (12) / Tests  266 passed (266) exit=0
guides       npm run test:guides → Test Files  1 passed (1) / Tests  19 passed (19) exit=0
policy       npm run test:policy → Test Files  1 passed (1) / Tests  109 passed | 1 skipped (110) exit=0
build-core   npm run build:src:core → ✓ built in 91ms exit=0
build-styles npm run build:src:styles → ✓ built in 1.09s exit=0
build-browser npm run build:src:browser → ✓ built in 227ms exit=0
conformance  npm run test:conformance → Test Files  1 passed (1) / Tests  22 passed (22) exit=0
setup        npm run test:setup → Test Files  4 passed (4) / Tests  267 passed (267) exit=0
```
- The browser run prints the standing `SyntaxError: Failed to execute 'toggle' on 'DOMTokenList': The token provided must not be empty.` diagnostic and passes.
- The only managed browser under `%LOCALAPPDATA%/ms-playwright` is `chromium-1243`, whose manifest reads `153.0.8010.12`.
- I also ran the tree typecheck read-only: `npx tsc --noEmit --project tsconfig.json` exits 0.

## Status and diffstat
```
 M guides/veneer.md
 M src/browser/Delegate.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/Dropdown.ts
?? src/browser/Placement.ts
?? tests/src/browser/Dropdown.test.ts
?? tests/src/browser/Placement.test.ts
```
```
 guides/veneer.md                     | 214 +++++++++++++++++++++-
 src/browser/Delegate.ts              | 206 +++++++++++++++++++---
 src/browser/constants.ts             | 109 ++++++++++++
 src/browser/helpers.ts               |  26 +++
 src/browser/index.ts                 |   2 +
 src/browser/parsers.ts               |  73 +++++++-
 src/browser/validators.ts            |  34 +++-
 tests/src/browser/Delegate.test.ts   | 331 ++++++++++++++++++++++++++++++++++-
 tests/src/browser/helpers.test.ts    |  32 ++++
 tests/src/browser/index.test.ts      |  16 ++
 tests/src/browser/parsers.test.ts    |  66 ++++++-
 tests/src/browser/validators.test.ts |  51 ++++++
 12 files changed, 1126 insertions(+), 34 deletions(-)
```
Line counts of the new files: `Dropdown.ts` 403, `Placement.ts` 180, `Dropdown.test.ts` 1119, `Placement.test.ts` 461.

## Shared-file patches (not applied; retained as `j-dropdown-patches/j-dropdown-shared.diff`)
The `types.ts` hunks change only summary and `@returns` sentences the implementation makes false (`DelegateOptions.root` "clicks and key presses", `DelegateInterface.destroy` "click and key listeners", the `DropdownInterface` `show` and `hide` `@returns` sentences adding the in-flight refusal and the `shown`-token takeover). The guide hunks sit outside my owned guide parts: the `DelegateInterface` Methods row, the § Delegation paragraph (rewrapped to 100 columns, adding "clicks and key presses" and the `dropdown` option sentence), and the Compatibility closing paragraph, whose "Popper pass-through … accepted wire keys" sentence the R9 amendment contradicts (replaced by the exclusion of Popper's `boundary` and `popperConfig` options, with platform anchoring in the top layer replacing Popper).

## Deviation state
- **D1, open for your ruling.** Light dismissal is in `Dropdown` (a document `click` and `keyup` listener for the dropdown's lifetime), not in the delegate. DROPDOWN3 as briefed cannot be met through the contract: `DropdownInterface` exposes no `dismiss` member, so a delegate cannot read a constructed engine's rules; `hide()` takes no argument, so a delegate cannot pass `detail.click`; R9 says the menu "implement[s] Bootstrap's autoClose matrix themselves". The arrow, Escape, and click routes stay on the delegate, and the dismissal proofs sit in `Dropdown.test.ts`. The alternative needs a `types.ts` change: `hide(click?: MouseEvent)` plus a readable `dismiss`.
- **D2.** `computeNeighbor` is in `helpers.ts`, an off-limits file, with rows in `helpers.test.ts`. DROPDOWN3 says to declare it in the unit when J-TAB has not landed, and `helpers.ts` is the only file of its kind. It duplicates J-TAB's export, and the landing must reconcile the two. Signature: `computeNeighbor<T>(list: readonly T[], current: T | undefined, forward: boolean, wrap: boolean): T | undefined`.
- **D3, shared route code for the merge.** `#conflicts` now treats the button host, the named collapse panels, and the dropdown toggle as one set of hosts the routes would build on; the existing cases stay green. The delegate listener case now expects `[root, root]` because of the added `keydown` listener. The existing `instanceOf(HTMLElement)(…)` calls inside `#conflicts` became `isInstance` through `#within`, which overlaps J-ISINSTANCE.
- **D4.** `Placement` writes `position: fixed`, which R9's list does not name. Probe reading on Chromium 153: an `absolute` menu on a scrollable page did not flip (`flipped? toggle 836,866 menu 868,968 vh=896 scrollH=1732`), and a `fixed` one did (`fixed flipped? menu 734,834`). Pinned by row 43.
- **D5.** `PlacementOptions` has no `signal`, so the placement's own writes and its `beforetoggle` dispatch run to completion. `Dropdown` reads its door after the placement returns and destroys it if the dropdown was destroyed meanwhile. The guide states this, and row 38 pins it. A per-write door inside `Placement` would need a `signal` added to `PlacementOptions`.
- **Rulings I made and recorded:** Escape is handled only by the delegate's key route; `update()` rewrites only the side, and the navbar is read at each show; a `dismiss` group from the constructor replaces the attribute's reading, while `placement` layers key by key; a toggle with no menu throws `DROPDOWN_MENU_MISSING`; `data-bs-display` accepts only `static` and `dynamic`.

Instruments are in `tmp/j-dropdown/`: `mutations.py`, `acceptance.sh`, `red.log.txt`, and `mutations.log.txt`. The worktree has no commits and nothing staged.

---

The Orchestrator's retention note: the instrument, its two logs, the red log, the acceptance script, and the shared patch are retained beside this report as `j-dropdown-mutations.py`, `j-dropdown-mutations.log.txt`, `j-dropdown-mutations-first-run.log.txt`, `j-dropdown-red.log.txt`, `j-dropdown-acceptance.sh`, and `j-dropdown-patches/j-dropdown-shared.diff`; the review evidence is `j-dropdown.diff` and `j-dropdown-status.txt`, captured by `w2-gates.sh dropdown`, whose log is `j-dropdown-gates.log.txt`.
