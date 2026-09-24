# J-SCROLLSPY round 3 (the landing round) — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the scrollspy worktree, briefed by `j-scrollspy-brief-3.md`; 35 tool uses, 397 s; retained verbatim from the subagent's return; the merge of Veneer `main` `f377579` into `unit/scrollspy` was left open for the Orchestrator to commit; the instrument is `j-scrollspy-mutations-3.py` with `j-scrollspy-mutations-3.log.txt`, the gates `j-scrollspy-acceptance-3.log.txt`. The Orchestrator's ruling on the one departure: `#driven` stays without `ScrollSpy`, because no route marks a scrollspy and the union member would be dead (E6).)

The merge is resolved and every file carries both units, with one delegate for Button, Collapse, Alert, Tab and ScrollSpy. The full chain exits 0 on every command. Nothing is committed. Every resolved file is staged, so `git diff --name-only --diff-filter=U` returns nothing. I made no `prove` call; that server is not reachable from a subagent.

## Conflict resolution per file
- **`src/browser/index.ts`:** the barrel now reads Collapse, Alert, Tab, ScrollSpy, Delegate.
- **`src/browser/parsers.ts`:** the import is the union of both sides: `boundsOf, instanceOf, isInstance, parseArray, parseJSON, parseNumber`.
- **`src/browser/validators.ts`:** the type import is the sorted union: Alert, Button, Collapse, ColorMode, ScrollSpy, Tab.
- **`src/browser/constants.ts`:** the import is the union, and main's Alert and Tab tables come before the `SCROLL_SPY_*` tables.
- **`tests/src/browser/validators.test.ts`:** main's file, plus `isScrollSpyEvent` in the import and its `describe` block appended (16 cases).
- **`tests/src/browser/index.test.ts`:** main's file, with the nine ScrollSpy names added to the sorted export list.
- **`tests/src/browser/Delegate.test.ts`:** main's 62 cases plus my 5 scan cases (67), with `ScrollSpy` and `SCROLL_SPY_SELECTORS` added to the import.
- **`src/browser/Delegate.ts`:** main's file with the scan folded in (next section).
- **`guides/veneer.md`, § Surface:** main's rows, with the `Delegate` row carrying the merged summary.
- **`guides/veneer.md`, examples:** main's Alert and Tab fences, then the ScrollSpy fence.
- **`guides/veneer.md`, § Delegation:** main's paragraph ("listeners"), with the reinsertion sentence scoped to hosts a click route serves and a scanned host staying released.
- **`guides/veneer.md`, sections:** `#### Alert`, then `#### Tab`, then `#### ScrollSpy`.
- **`guides/veneer.md`, Compatibility table:** re-padded by `oxfmt --write` only. The Alert, Tab and ScrollSpy `plugin` rows read `shipped` with their test-file Proof paths.
- **`src/browser/types.ts`:** the `DelegateInterface.destroy` sentence, with its Methods row in the guide.

To build the three test files I rebuilt each from main's side and appended my cases from the round-2 commit. I did not hand-merge the interleaved hunks.

## Delegate fold
- **The scan method:** it is named `#scan(group: DelegateOptions['scrollspy'])` and sits after `destroy`, just before `#activate`. The constructor calls it after `#root` is set and before the click and `keydown` listeners install.
  - It resolves the scrollspy vocabulary itself, so no new type was needed.
  - It then acquires a scrollspy for every unowned HTML element that matches the host selector.
  - If one refuses its options, it destroys every engine and rethrows.
- **Members widened:** `#owned` and `#acquire` now carry all five engine types, and `#discard` reads all five registries.
- **Members kept as main has them:** `#conflicts`, `#activate`, `#press`, the one `#closest`, the one `#construct`, `#mark`, `#reach`, `#locate` and the tab routes.
- **Members deleted:** my inline scan in the constructor and my round-2 `#discard` with three registries. The file was rebuilt from main, so no second copy of any member exists.

**Your decision:** I did not add ScrollSpy to the `#driven` union, although item B lists it. `#driven` records the click and key marks per route. No route marks a scrollspy, so the extra type would be dead code under E6. If you want it for symmetry, it is a one-line change to the union.

## Merged summary and remarks
- **Summary:** "Activates data-attribute hosts through a root's delegated click and key listeners and a scan at construction."
- **Remarks, first sentence:** "Construction validates and copies each entity group, scans the root, then installs its listeners."
- **Remarks, scan paragraph:** added after main's keyboard paragraph. It says the scan runs once before the listeners install, acquires an unowned scrollspy per matched host, leaves a host inserted later alone, and on a refusal throws after destroying every engine it acquired.
- **Remarks, observer sentence:** now ends "a scanned host reinserted after that stays released."
- **`DelegateInterface.destroy` and its Methods row:** "Releases the click and key listeners and destroys every engine it owns, the scrollspies its construction scan acquired included."

## Gates
The chain ran in the brief's order through `tmp/j-scrollspy/acceptance-3.sh`; the log is `acceptance-3.log.txt`.

| Command | Exit | Summary |
|---|---|---|
| `npm run check:src:browser` | 0 | — |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | — |
| `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md` | 0 | — |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | `All matched files use the correct format.` |
| `npm run test:src:browser` | 0 | `Test Files  13 passed (13)` / `Tests  337 passed (337)` |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `npm run build:src:core` | 0 | — |
| `npm run build:src:styles` | 0 | — |
| `npm run build:src:browser` | 0 | — |
| `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| `npm run test:setup` | 0 | `Tests  281 passed (281)` |

`test:src:browser` also printed the expected `SyntaxError` from the HostSnapshot suite. Outside the chain, `npx tsc --noEmit -p tsconfig.json` also exits 0.

## Instrument re-run
The rows are in `tmp/j-scrollspy/mutations-3.py` and the log is `mutations-3.log.txt`.
- **What ran:** the round-2 rows that touch `Delegate.ts`, each over the whole merged `Delegate.test.ts` (67 cases).
- **Re-anchored:** the two vocabulary rows now read `group?.selectors` and `group?.classes`, because that text moved into `#scan`.
- **Added:** one row for the constructor's `#scan` call.

The results, in log order:

| Row | Result |
|---|---|
| the delegate has no scrollspy scan | JOINED, 3 failed of 67 |
| the scan constructs over a consumer scrollspy | EXACT |
| the scanned scrollspy is not acquired | JOINED, 3 failed |
| the discard drops every scrollspy | EXACT |
| the delegate scans by the default host selector | JOINED, 2 failed |
| the delegate ignores the scrollspy classes group | JOINED, 2 failed |
| the constructor never calls the scan (new) | JOINED, 4 failed |
| the delegate does not validate the scrollspy classes | EXACT |
| a scan refusal leaves the acquired scrollspies live | EXACT |

Every row reddened its named case.

The green rows afterwards:

| Test file | Failed |
|---|---|
| ScrollSpy | 0 of 26 |
| Delegate | 0 of 67 |
| validators | 0 of 16 |
| parsers | 0 of 7 |
| index | 0 of 3 |

The log ends `receipt: restored byte for byte`.

## `git status --short`
The tree still has a merge in progress with every entry staged: 46 `A ` and 39 `M ` entries, none `UU`, none unstaged, none untracked. The entries under `src/browser`, `tests/src/browser` and the guide:
```
M  guides/veneer.md
A  src/browser/Alert.ts
M  src/browser/Button.ts
M  src/browser/Collapse.ts
M  src/browser/Delegate.ts
A  src/browser/Tab.ts
M  src/browser/constants.ts
M  src/browser/helpers.ts
M  src/browser/index.ts
M  src/browser/parsers.ts
M  src/browser/types.ts
M  src/browser/validators.ts
A  tests/src/browser/Alert.test.ts
M  tests/src/browser/Delegate.test.ts
A  tests/src/browser/Tab.test.ts
M  tests/src/browser/helpers.test.ts
M  tests/src/browser/index.test.ts
M  tests/src/browser/validators.test.ts
```
The rest are main's app and styles files that merged cleanly. Against HEAD, the staged diff over `src/browser`, `tests/src/browser` and the guide is `18 files changed, 5625 insertions(+), 408 deletions(-)`.

## Deviation state
There was no stop, and no gate outside my items reddened. The one departure from the brief's letter is `#driven`, set out under "Delegate fold". `ScrollSpy.ts` stays as round 2 left it. The resolution scripts are `resolve-3.py`, `resolve-3-tests.py`, `resolve-3-delegate.py` and `resolve-3-guide.py`, all in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/scrollspy/tmp/j-scrollspy/`.
