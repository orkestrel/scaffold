# J-TAB round 4 (the landing round's amendment) — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, resumed in the tab worktree on the Orchestrator's message of 2026-09-24 that amended E16: `isDisabled` moves from `validators.ts` to `helpers.ts` per `.claude/rules/architecture.md` § Kind purity; retained verbatim; the instrument is `j-tab-mutations-4.py` with `j-tab-mutations-4.log.txt`, the gates `j-tab-acceptance-4.log.txt`, the status `j-tab-4-status.txt`, the move script `j-tab-r4-move-disabled.py`)

## J-TAB round 4 report

`isDisabled` now lives in `src/browser/helpers.ts`, and every gate you listed exits 0. Its signature, TSDoc and behaviour are unchanged, the merge is still open, and nothing is committed or aborted.

### Moved sites
- **Source:** the function and its TSDoc moved from `src/browser/validators.ts` to the end of `src/browser/helpers.ts` unchanged. `validators.ts` no longer declares it.
- **Import:** `Delegate.ts` now imports `isDisabled` from `./helpers.js` and no longer from `./validators.js`. The three call sites are unchanged: the alert's `#locate`, `#routeTab`, and the `#routeTabKey` filter.
- **Tests:** the `describe('isDisabled')` block and its two cases moved from `validators.test.ts` to the end of `helpers.test.ts`. The import moved with it.
- **Guide:** the § Surface row now sits at the end of the helpers rows, after `readControls` and before `isClassToken`.
- **Export list:** `index.test.ts` still lists `isDisabled`; the barrel exports both files, so it needed no change.

### Gate exits (`tmp/j-tab/acceptance-4.log.txt`)
| Command | Exit | Summary |
|---|---|---|
| `npm run check:src:browser` | 0 | no diagnostic |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | no output |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | `All matched files use the correct format.` |
| `npm run test:src:browser` | 0 | `Test Files  12 passed (12)` / `Tests  300 passed (300)`; the expected `HostSnapshot` `SyntaxError` diagnostic printed |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` (the vendored `denylist currency` skip) |

### Instrument rows naming `isDisabled`
The run used `tmp/j-tab/mutations-4.py`, logging to `tmp/j-tab/mutations-4.log.txt`. The three rows that mutate the function body are re-anchored to `helpers.ts`. The two unit-level rows now run `helpers.test.ts` instead of `validators.test.ts`. All 88 anchors still match.

Every row reddened its named case, and the receipt reads `restored byte for byte`:
- **the delegate drives a disabled control:** JOINED, 2 of 62 failed, including the named disabled-click case.
- **the disabled attribute is not read** (`helpers.ts`): JOINED, 2 of 62, including the arrow-key case.
- **the keys pass no disabled control over:** JOINED, 2 of 62, including the arrow-key case.
- **the disabled reading ignores a false attribute value** (`helpers.ts`): EXACT, 1 of 62, the disabled-click case.
- **the disabled reading ignores the platform state** (`helpers.ts`, `helpers.test.ts`): JOINED, 2 of 38, including the disabled-fieldset case.
- **the disabled reading ignores the token** (`helpers.ts`, `helpers.test.ts`): EXACT, 1 of 38.
- **the alert route reads no disabled trigger:** JOINED, 2 of 62, including the Alert unit's skip case.

### `git status --short`
The changed files are staged and `git diff --name-only --diff-filter=U` reads empty. The 83 entries are the 16 in scope plus 67 from main's merge side: `ROADMAP.md`, `app/**`, `src/styles/**`, and app, setup, and styles tests. The full list is in `tmp/j-tab/r4-status.txt`.
```
M  guides/veneer.md
A  src/browser/Alert.ts
M  src/browser/Button.ts
M  src/browser/Collapse.ts
M  src/browser/Delegate.ts
M  src/browser/constants.ts
M  src/browser/helpers.ts
M  src/browser/index.ts
M  src/browser/parsers.ts
M  src/browser/types.ts
M  src/browser/validators.ts
A  tests/src/browser/Alert.test.ts
M  tests/src/browser/Delegate.test.ts
M  tests/src/browser/helpers.test.ts
M  tests/src/browser/index.test.ts
M  tests/src/browser/validators.test.ts
```

### Deviation state
None. No `prove` call was made; the MCP server is not reachable from this subagent. No install, commit, merge abort, or discarding git command was run. The move script is `tmp/j-tab/r4-move-disabled.py` in the worktree.
