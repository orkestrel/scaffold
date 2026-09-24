# J-TAB round 3 (the landing round) — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the tab worktree, briefed by `j-tab-brief-3.md`; retained verbatim from the subagent's return; the merge of Veneer `main` `41ba3b7` was left open and uncommitted for the Orchestrator to commit; the instrument is `j-tab-mutations-3.py` with `j-tab-mutations-3.log.txt`, the gates `j-tab-acceptance-3.log.txt`, the status `j-tab-3-status.txt`)

## J-TAB round 3 report (landing round)

The merge is fully resolved in the tab worktree, with Alert and Tab carried together through one delegate, and every gate in the brief's order exits 0. Nothing is committed and the merge is still open (`MERGE_HEAD` is `41ba3b7`). `git diff --name-only --diff-filter=U` reads empty and no file under `src`, `tests` or `guides` holds a conflict marker.

### Conflict resolution per file
- **`src/browser/constants.ts`:** main's `ALERT_*` tables are kept, followed by the `TAB_*` tables.
- **`src/browser/types.ts`:** `AlertVocabulary` is kept, followed by `TabVocabulary`.
- **`src/browser/index.ts`:** the barrel exports `Alert.js`, then `Tab.js`, then `Delegate.js`.
- **`src/browser/validators.ts`:** the type import now carries both `AlertEventMap` and `TabEventMap`. E16's `isDisabled` is added.
- **`tests/src/browser/validators.test.ts`:** main's file is kept with its `isAlertEvent` cases, then the `isTabEvent` cases. Both guards are imported, and the new `isDisabled` cases are added.
- **`tests/src/browser/Delegate.test.ts`:** main's file (the Alert cases) is kept, then all tab cases after it. The imports are merged, and the listener-count case is yours, expecting `[root, root]`.
- **`src/browser/Delegate.ts`:** one delegate, rewritten whole; see the next section.
- **`guides/veneer.md`:**
  - § Surface: `AlertVocabulary`, then `TabVocabulary`, then the `Delegate` row with the "click and key listeners" summary.
  - § Examples: the Alert fence, then the Tab fence.
  - § Components: `#### Alert`, then `#### Tab`.
  - Compatibility: `j-w2-resolve-guide.py tab Tab` reported "resolved 1 conflict blocks; Tab plugin row re-applied: True". The Tab row reads `tests/src/browser/Tab.test.ts | shipped` and the Alert row reads `tests/src/browser/Alert.test.ts | shipped`.
  - § Delegation already carried both of your sentence corrections ("clicks and keys", "the listeners") after the merge.

I resolved the guide's first three blocks by hand before running the resolver script. The script takes main's side for table blocks and your side for prose blocks, so run blindly it would have dropped `TabVocabulary` and the Alert prose.

### The delegate fold
**Kept:**
- `#driven`, `#owned`, `#acquire` and `#mark` over `Button | Collapse | Alert | Tab`.
- `#discard` reading all four registries.
- One `#conflicts`: a `Set` over the button host, the unowned collapse panels, the alert `#locate` resolves, and the tab control.
- One `#closest`.
- `#activate`, which runs `#conflicts`, then `#routeButton`, `#routeCollapse`, `#routeAlert`, `#routeTab`.
- `#press` and `#routeTabKey`, with the `keydown` listener.
- The Alert unit's `#reach` and `#locate`.
- `#release` and `destroy` in the reverse of acquisition.
- One `#construct(engine)`, now used by all four routes. It acquires the engine, or destroys it when a reaction during construction destroyed the delegate. For the button, collapse and alert, whose constructors write nothing, the read after construction always passes; I kept one path rather than two.
- One set of class remarks, in paragraphs: listeners and the disabled reading, then the four click routes, the refusal, the key route, and release and reverse-order destruction.

**Deleted:** `#contends` and `#disabled`, and the old `#construct(control)` that could only build tabs. The four per-route "find or acquire directly" lines now go through `#construct` (E6).

### E16 helper
`isDisabled(element: Element, token: string): boolean` is in `validators.ts`. It reads the token, then `:disabled`, then a `disabled` attribute whose value is not `false`.
- It has TSDoc and a § Surface row. The row's summary had to avoid naming the symbol to pass `policy/no-malformed-summary`: "Checks whether an element is disabled by its token, its platform state, or its attribute, as Bootstrap reads it."
- It is in `index.test.ts`'s export list, and `validators.test.ts` has two cases for it, including a disabled fieldset.
- **Call sites:** `#routeTab`, the `#routeTabKey` filter, and the alert's `#locate`.
- **Guide:** § Delegation states the reading once, beside the refusal sentence. The Tab route paragraph and the Alert route sentence now name `isDisabled`. The Tab departure ("a `disabled` attribute disables … whatever its value") and the matching Alert departure are deleted.
- **Tests:** no case asserted that `disabled="false"` disables. The tab click case now adds an anchor with `disabled="false"` and asserts that it activates.

### The two sentences
- **`#### Tab` restoration bound.**
  - Before: "A tab acquired by a click on a control that was already active saves nothing at that click;"
  - After: "A tab acquired by a click on a control that was already active saves no swap tokens at that click, though its construction still records the initial attributes it writes;"
- **`readControls` remark in `helpers.ts`.**
  - Before: "so a dropdown toggle is never a control and a trigger always is."
  - After: "so a dropdown toggle is excluded unless it also matches `trigger`, and a trigger always is a control."

### Gates (`tmp/j-tab/acceptance-3.log.txt`)
| Command | Exit | Summary |
|---|---|---|
| `npm run check:src:browser` | 0 | no diagnostic |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | no output |
| `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md` | 0 | `Finished in 6446ms on 1 files` |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | `All matched files use the correct format.` |
| `npm run test:src:browser` | 0 | `Test Files  12 passed (12)` / `Tests  300 passed (300)`, Alert and Tab suites together |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `npm run build:src:core` | 0 | built |
| `npm run build:src:styles` | 0 | built |
| `npm run build:src:browser` | 0 | built |
| `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| `npm run test:setup` | 0 | `Test Files  4 passed (4)` / `Tests  281 passed (281)` |

- The browser run prints the expected `HostSnapshot` `SyntaxError` diagnostic.
- The one skipped policy case is the vendored `denylist currency` case, skipped in earlier rounds too.
- Before I shortened the `isDisabled` summary, the first `oxlint` run failed on it with `policy(no-malformed-summary)`.

### Instrument re-run
I ran the whole instrument, not only the `Delegate.ts` rows (`tmp/j-tab/mutations-3.py`, log `tmp/j-tab/mutations-3.log.txt`).
- **Result:** 88 rows, each EXACT or JOINED, none MISSED, ERR or NOREPORT. The five `GREEN?` rows read 0 failed (Tab 35, Delegate 62, validators 16, helpers 36, index 3). Receipt: `restored byte for byte`.
- **Re-anchored:** seven round-2 rows whose `Delegate.ts` text the merge and E16 moved, with titles and mutations unchanged:
  - "the delegate drops no destroyed tab"
  - "the delegate drives a disabled control"
  - "the disabled attribute is not read" (now mutates `isDisabled`, named case: the arrow-key case)
  - "the keys pass no disabled control over"
  - "the tab click is not marked"
  - "the click route constructs the tab without its group"
  - "the key route constructs the tab without its group"
- **New rows for E16:**
  - "the disabled reading ignores a false attribute value" (EXACT)
  - "the disabled reading ignores the platform state" (JOINED)
  - "the disabled reading ignores the token" (EXACT)
  - "the alert route reads no disabled trigger" (JOINED, on the Alert unit's skip case)

### `git status --short`
- **In scope, all staged:**
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
  M  tests/src/browser/index.test.ts
  M  tests/src/browser/validators.test.ts
  ```
- **The other 67 entries** are main's staged merge changes: `ROADMAP.md`, `app/**`, `src/styles/**`, and `tests/app/**` and styles tests. The full list is in `tmp/j-tab/r3-status.txt`.
- **Off-limits sources:** `Alert.ts`, `Button.ts`, `Collapse.ts` and `parsers.ts` appear only as main's side. My edits leave them byte-identical to the merge's staged content.
- **Staging beyond the brief:** I also staged `src/browser/helpers.ts` and `tests/src/browser/index.test.ts`. They were not conflicted; I staged them so a commit from the index carries them.

### Deviation state
I did not stop. These are the choices I made within the brief:
- `#construct` now covers all four routes.
- The merged class remarks are ordered as described in the delegate fold.
- The disabled tab case gained an enabled `disabled="false"` control.

One tension to know about: `.claude/rules/architecture.md` § Kind purity keeps a predicate that is not a `Guard<T>`, such as `isVacant`, in `helpers.ts`. E16 and the brief place the two-argument `isDisabled` in `validators.ts`. I followed E16, and lint and policy pass.

No `prove` call was made; the MCP server is not reachable from this subagent. No install, commit, merge abort, or discarding git command was run.

Scripts and logs are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab/tmp/j-tab/`.
