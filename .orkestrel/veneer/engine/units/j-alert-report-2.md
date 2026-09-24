# J-ALERT round 2 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the same worktree, 37 tool uses, 509 s; retained verbatim from the subagent's return; the tree is the worktree `veneer/tmp/worktrees/alert` on `unit/alert` from `e24e2c3`, uncommitted)

Round 2 is done, and all six items (A to F) are closed in the alert worktree. The full acceptance chain exits 0. The round-2 instrument reddens every row's named case and ends `receipt: restored byte for byte`. Nothing was committed or merged, and I made no `prove` MCP call because that server isn't reachable from a subagent.

## Files touched
Worktree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/alert`

- `src/browser/Alert.ts`: the close is marked in flight from its `close.vn.alert` dispatch (E15), and the TSDoc says so.
- `src/browser/Delegate.ts`: `#alert` is now typed `AlertVocabulary`, and the inline type's imports are gone. `#dismiss` is renamed `#reach` and `#dismissed` is renamed `#locate`, with comments describing what each returns. `#routeButton` and `#routeCollapse` now go through `#closest`, and the unused `instanceOf` import is gone.
- `src/browser/types.ts` (items B and F only): adds `AlertVocabulary`. Rewords the `AlertAttributeMap`, `AlertSelectorMap`, `AlertOptions.attributes` and `AlertOptions.selectors` summaries in the `Button` form, and rewords the `close` summary and its `@returns`.
- `tests/src/browser/Alert.test.ts`: the round-1 re-entry case is replaced by the E15 case.
- `tests/src/browser/Delegate.test.ts`: the trusted-click fixture gains a focusable `Elsewhere` button outside the alert, with an assertion that focus does not land on it.
- `guides/veneer.md`: an `AlertVocabulary` § Surface row, and the `AlertAttributeMap` and `AlertSelectorMap` rows. The `AlertInterface` Methods row, the § Examples lead-in with "dismissible" dropped, the re-entry sentence under `#### Alert`, and the end-state departure bullet are rewritten.
- `tmp/j-alert/`: `mutations-2.py` and its log, `gates-2.sh` with its `gates-2/` logs, and the `r2-*` red and green logs.

## Items
Unless stated otherwise, the red and green readings below come from `npm run test:src:browser -- <file>`.

**A (E15).**
- `#closing = true` now runs before the dispatch, inside the `try` whose `finally` clears it. The read after the dispatch is `this.#controller.signal.aborted` alone.
- The new case is "refuses a close that a listener to its close event starts on every dispatch, dispatching close and closed once and resolving the outer call true".
- Red on the round-1 source, `Alert.test.ts`: `AssertionError: expected false to be true` / `Tests  1 failed | 20 passed (21)`.
- Green: `Tests  21 passed (21)`.
- Instrument: "the marker is set after the dispatch" reddens the new case (EXACT). "the marker is not cleared after a prevented close" moves the dispatch before the `try`, and reddens the prevention case (EXACT).

**B (`AlertVocabulary`).**
- Red: `npm run test:guides` → `AssertionError: expected [ 'interface AlertVocabulary' ] to deeply equal []` / `Tests  1 failed | 18 passed (19)`.
- Green after adding the § Surface row: `Tests  19 passed (19)`.

**C (renames) and E (`#closest`).** These change no behaviour, so there is no red reading.
- Scoped run of `Delegate.test.ts`: `Tests  50 passed (50)`.
- A new instrument row, "the closest match ignores the root", reddens "ignores unmatched targets and a closest host outside the root" (EXACT). That shows the shared path pins the button route.

**D (focus control).**
- The row "the dismiss route moves focus outside the alert" read `MISSED ... 0 failed of 50` on the round-1 fixture.
- With the `Elsewhere` control added it reads `EXACT ... named: ['closes an alert through a trusted click on its close control, moving focus nowhere']`.

**F (summaries and guide).**
- Red: `npm run test:guides` → drift on `AlertAttributeMap`, `AlertSelectorMap` and `AlertInterface.close` / `Tests  1 failed | 18 passed (19)`.
- Green: `Tests  19 passed (19)`.
- I shortened the `AlertSelectorMap` summary to "the delegate routes dismiss clicks by". The longer version pushed the § Surface Summary column past its width and failed the formatter check.
- The `@returns` now reads: "false when a close is in flight, a listener prevents `close`, the alert is destroyed or already closed, or the `shown` token returns to the alert or the alert returns to the document before the close completes."
- The Methods row holds the `close` summary ("…, and releases it."), not the `@returns`.
- Only the two map interfaces have § Surface rows, so those plus the Methods row are all the parity check compares. The `AlertOptions` members have no row.
- The departure bullet now reads: "A `close` call after a completed close resolves `false`. Bootstrap's `dispose` call removes its instance, and a later `close` call on that instance throws."

**Unknown (the probe's 44-level terminator).** Item A removed the recursion, and the instrument doesn't expose what ended it, so there is no reading.

## Instrument
`tmp/j-alert/mutations-2.py`, with its log in `tmp/j-alert/mutations-2.log.txt`, one full run (retained as `j-alert-mutations-2.py` and `j-alert-mutations-2.log.txt`).
- Every round-1 row is kept. The rows that point at changed source text were updated: the post-dispatch read, and the `#locate` name.
- The new rows are the two marker rows, the focus row, and the closest-inside-root row.
- Result: 60 rows, all EXACT or JOINED, with no MISSED, ERR or NOREPORT rows. The log tail:
```
GREEN? exit=0 | tests/src/browser/Alert.test.ts | 0 failed of 21 | []
GREEN? exit=0 | tests/src/browser/Delegate.test.ts | 0 failed of 50 | []
GREEN? exit=0 | tests/src/browser/validators.test.ts | 0 failed of 12 | []
GREEN? exit=0 | tests/src/browser/index.test.ts | 0 failed of 3 | []
receipt: restored byte for byte
```

## Acceptance chain
Run in the brief's order by `tmp/j-alert/gates-2.sh` (retained as `j-alert-gates-2.sh`), on Chromium 153.0.8010.12:
```
check-src-browser exit=0 | oxlint exit=0 | oxfmt exit=0
test-src-browser exit=0   Test Files  11 passed (11) / Tests  243 passed (243)
test-guides exit=0        Tests  19 passed (19)
test-policy exit=0        Tests  109 passed | 1 skipped (110)
build-src-core exit=0 | build-src-styles exit=0 | build-src-browser exit=0
test-conformance exit=0   Tests  22 passed (22)
test-setup exit=0         Test Files  4 passed (4) / Tests  267 passed (267)
```
- The browser run still prints the known `HostSnapshot` `SyntaxError` diagnostic, and the run passes.
- The skipped policy case is the vendored `it.skipIf`, not something this unit added.

`git status --short`:
```
 M guides/veneer.md
 A src/browser/Alert.ts
 M src/browser/Delegate.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 A tests/src/browser/Alert.test.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
```
`git diff --stat`:
```
 guides/veneer.md                     | 145 ++++++++-
 src/browser/Alert.ts                 | 176 +++++++++++
 src/browser/Delegate.ts              | 203 +++++++++---
 src/browser/constants.ts             |  28 ++
 src/browser/index.ts                 |   1 +
 src/browser/types.ts                 |  22 +-
 src/browser/validators.ts            |  29 +-
 tests/src/browser/Alert.test.ts      | 585 +++++++++++++++++++++++++++++++++++
 tests/src/browser/Delegate.test.ts   | 427 ++++++++++++++++++++++++-
 tests/src/browser/index.test.ts      |   6 +
 tests/src/browser/validators.test.ts |  39 +++
 11 files changed, 1601 insertions(+), 60 deletions(-)
```

## Deviation state
No stop was raised.
- The round-1 patches for `types.ts` and the Methods row are superseded: item F applied them in the tree, reworded.
- While deriving `gates-2.sh` I briefly edited the round-1 `tmp/j-alert/gates.sh`, then put it back to its round-1 text; the diff between the two scripts shows only the paths.
- The `#routeCollapse`, `#routeButton` and `#locate` lines will conflict with J-ISINSTANCE on `main` at landing. The brief says the landing takes this unit's version.

---

The Orchestrator's retention note: the review evidence for this round is `j-alert-2.diff` and `j-alert-2-status.txt`, captured by `w2-gates.sh alert 2`, whose log is `j-alert-gates-2.log.txt`; the round-1 patches under `j-alert-patches/` are superseded by the edits item F made in the tree.
