<!-- U13c — implementer (Opus 5, native), ollama page-proof fix round after A13. Retained from the completion notification, 2026-09-15 (1233 s, 112 tool uses). -->

All carriers are closed and every gate is green.

## Touched files

| File | Change |
| --- | --- |
| `tests/setupServer.ts` | `PAGE_BOUNDS` replaces the two loose page deadlines; `createPageSession` releases through `createTeardown`; `readPage`→`readOutcome` over a narrowed `evaluate` boundary; `readPath`→`rootToPath`; new `scanPageOperations`; page script gains `fault` and the dispatched `turn`, and drops its `null` sentinels; `PageTool.turn` and the de-nulled `isPageOutcome` |
| `tests/setupService.ts` | `PAGE_OPTIONS` sampling table for the direct daemon turn; `rootToPath` import |
| `tests/setupServer.test.ts` | New proofs for `scanPageOperations`, `readOutcome`, `PAGE_BOUNDS`, and the page session release order; `PAGE_DOCUMENT` now asserts the scanned operation set; guard proof extended for `turn` and for refused `null` |
| `tests/setupService.test.ts` | `PAGE_OPTIONS` registered in the sampling-table matrix |
| `tests/service/page.test.ts` | Attempt observations retained before any read can throw; faults escape the retry; feedback pinned to the next request's `role: 'tool'` message on both wires; `ProviderError` asserted; direct case sends and asserts a prompt; fault control added |
| `guides/ollama.md` | Contract 13 rewritten; the `page.test.ts`, `setupServer.test.ts`, and `setupService.test.ts` bullets state what each proves instead of transcribing case titles |

```
 guides/ollama.md           |  13 +-
 tests/setup.ts             |  26 ++
 tests/setupServer.test.ts  | 488 +++++++++++++++++++++++++++++-
 tests/setupServer.ts       | 734 ++++++++++++++++++++++++++++++++++++++++++---
 tests/setupService.test.ts |  96 ++++++
 tests/setupService.ts      | 118 +++++++-
 6 files changed, 1428 insertions(+), 47 deletions(-)
```

`git status --porcelain`:

```
 M guides/ollama.md
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupService.test.ts
 M tests/setupService.ts
?? tests/service/page.test.ts
```

`tests/setup.ts` and its diffstat row are U13b's `PAGE_TOOL` addition, unchanged by this round. `git diff --check` exits 0. `tmp/probe/` is removed; `ollama/tmp/` holds only the Orchestrator's `codex` directory.

## Carrier closures

| Carrier | Closing site |
| --- | --- |
| 1 — attempts retained before a read can throw; faults escape the retry; feedback pinned to the next request's tool message | `tests/service/page.test.ts:147` (short-circuit), `:169-193` (catch, then retain), `:216` (`expect(attempt.fault).toBeUndefined()`), `:262-283` (turn-indexed relay and daemon pins) |
| 2 — cleanup registered as acquired, through `createTeardown` | `tests/setupServer.ts:999,1004,1014,1039,1062`; proof at `tests/setupServer.test.ts:746` |
| 3 — `readPage` → `readOutcome`, with a hermetic proof | `tests/setupServer.ts:1162`; proof at `tests/setupServer.test.ts:596` |
| 4 — contract 13 and the `## Tests` bullet | `guides/ollama.md:124`, `:368`; `ProviderError` assertion at `tests/service/page.test.ts:373` |
| 5 — the direct case sends and asserts a prompt | `tests/service/page.test.ts:66` (`CAPITAL`), `:411` (content property), `:427` (outgoing body) |
| 6 — no `null` sentinels | `tests/setupServer.ts:763-764` (page), `:1110-1111` (guard) |
| 7 — error and console recorders certified | `tests/setupServer.ts:772` (`fault`), `tests/service/page.test.ts:329-341` |
| 8 — `Attempt.relay` filtered at assignment, guard dropped | `tests/service/page.test.ts:89-90`, `:189`, `:228` |
| 9 — `readPath` → `rootToPath` | `tests/setupServer.ts:685` |
| 10 — bound coherence | `tests/setupServer.ts:610`; ordering proof at `tests/setupServer.test.ts:631` |
| 11 — the page-document proof binds | `tests/setupServer.ts:1191` (`scanPageOperations`); `tests/setupServer.test.ts:552`, `:563` |
| 12, 13 | Not this unit's; `guides/agent.md` untouched |

### Carrier 9 deviation from the named rename, decided and carried

The audit named `resolvePath`. That name is taken: `node_modules/@orkestrel/guide/dist/src/core/index.d.ts:2263` declares `export declare function resolvePath(directory: string, target: string): string`, and `@orkestrel/guide` is installed here, so adopting it would have replaced one collision with another. The helper is a coercion from a whole (`URL | string` anchor) to a derived view (its host path), so it takes the `{noun}To{Noun}` form `.claude/rules/names.md` § Fixed derivation/construction forms fixes: `rootToPath`.

## Bound ordering set

`PAGE_BOUNDS` at `tests/setupServer.ts:610`, in milliseconds: `run` 45_000 < `evaluate` 60_000 ≤ `case` 90_000; `attempts` 3 × (`launch` 30_000 + `run` 45_000) = 225_000 ≤ `budget` 240_000 ≤ `retry` 300_000. The innermost bound fires first: the in-page deadline, then the evaluate around it, then the case. The retry ends on its attempt count, never on an expired budget. The page proof no longer reads the shared `RETRY_BUDGET`, so `tests/service/relay.test.ts` and `tests/service/tools.test.ts` keep the constant they were sized against and `setupService.test.ts`'s `RETRY_BUDGET === testTimeout` assertion stands.

## Unknowns settled this round

`browser.destroy()` before `connect()` resolves and is idempotent. The installed declaration states it "Releases local resources… A merely attached browser is detached locally and nothing more. Idempotent." A throwaway probe confirmed it: a `createBrowser` pointed at `C:/nonexistent/never-launched.exe` resolved `destroy()` twice with `connection === undefined`. Pinned in the `createPageSession` remark at `tests/setupServer.ts:986-993`.

## Gate evidence

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format (66 files) |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | Root, `check:src`, `check:src:core` |
| `npm run test:setup` | 0 | 118 passed (baseline 113), 816 ms |
| `npm run test:guides` | 0 | 34 passed, 714 ms |
| `npm run build` | 0 | Built, declarations copied |
| `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project service tests/service/page.test.ts` | 0 | 5 passed, 5.77 s |

Baseline before editing: `npm run check` exit 0; `npm run test:setup` 113 passed, 815 ms.

### Per-case timings (observation; the authoritative run is the Orchestrator's)

```
 ✓ evaluates the published agent closure in a real page from an import map 649ms
 ✓ executes a page tool through an agent over a live Ollama relay and feeds its result into the next model turn 1950ms
 ✓ records a deliberate page request and a deliberate page fault outside the agent operation 634ms
 ✓ rejects a page relay credential before contacting Ollama 627ms
 ✓ drives the daemon directly from the page behind its origin gate 803ms
```

## Red-first log, verbatim

Command for every reading: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupServer.test.ts`. Each revert reddened exactly one test and left the other 33 green.

```
=== RED: carrier 2 — the release order: createPageSession's U13b sequential release, at the proof's own site ===
 × the page session release order > stops a real fixture through the teardown registry when the release before it rejects 28ms
AssertionError: expected [ 'browser' ] to deeply equal [ 'browser', 'fixture' ]
      Tests  1 failed | 33 passed (34)
exit code: 1

=== RED: carrier 3 — the evaluate boundary: the reader coerces instead of refusing a non-string reading ===
 × readOutcome > narrows a JSON string across the evaluate boundary and refuses every other reading 8ms
AssertionError: expected [Function] to throw error including 'the page expression absent returned u…' but got 'the page expression absent returned a…'
      Tests  1 failed | 33 passed (34)
exit code: 1

=== RED: carrier 10 — the bounds: the U13b evaluate bound (180_000) and retry budget (120_000) ===
 × PAGE_BOUNDS > orders every page deadline so the innermost bound is the one that fires 3ms
AssertionError: expected 180000 to be less than or equal to 90000
      Tests  1 failed | 33 passed (34)
exit code: 1

=== RED: carrier 11 — the page document: an operation left as a comment, which the U13b substring guard accepts ===
 × PAGE_DOCUMENT > carries the shared tool definition and the operations the page proof evaluates 7ms
AssertionError: expected [ 'run', 'control', 'fault', …(2) ] to deeply equal [ 'run', 'control', 'fault', …(3) ]
      Tests  1 failed | 33 passed (34)
exit code: 1

=== GREEN: every carrier fixed ===
 ✓ PAGE_DOCUMENT > carries the shared tool definition and the operations the page proof evaluates 1ms
 ✓ scanPageOperations > reads declared operations and refuses a commented one, a nested call, and a missing table 0ms
 ✓ readOutcome > narrows a JSON string across the evaluate boundary and refuses every other reading 1ms
 ✓ PAGE_BOUNDS > orders every page deadline so the innermost bound is the one that fires 0ms
 ✓ the page session release order > stops a real fixture through the teardown registry when the release before it rejects 12ms
 ✓ the page session release order > releases a real fixture when the acquisition registered after it rejects 5ms
      Tests  34 passed (34)
exit code: 0
```

Carrier 2's revert is applied at the proof's own site rather than at `createPageSession`, because the setup project runs no browser and so never reaches that composition. The permanent test carries the same evidence as an executed control that needs no revert: it starts a real fixture, runs the U13b sequential release against it, and asserts the listener is still answering `200` — the stranded port the registry closes.

## Mutation controls, recorded red

Each ran `npx.cmd vitest run … --project service tests/service/page.test.ts -t "<case>"`, exit 1.

```
carrier 1a — an attempt issues traffic and then rejects during observation
  → attempt 0: expected 'BrowserError: TypeError: page.absent is not a function' to be undefined
carrier 1b — the receipt moved to a later request than the turn after the call
  → Error: the relay recorded no request for the turn after the call
carrier 1c — the receipt arriving as a non-tool message
  → expected [] to have a length of 1 but got +0
carrier 5 — the direct turn sends no prompt
  → expected 'It seems like your message might be i…' to match /tokyo/i
carrier 7 — the page writes no console error with its uncaught error
  → Condition "the page error and console recorders to report the deliberate fault" did not hold within 45000ms
```

Carrier 5's control reproduces the exact confusion answer the A13 analyst quoted, which is the defect the prompt closes.

## Receipt

Browser `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`, Edge 153.0.4234.32. Daemon Ollama 0.32.15 at `http://localhost:11434`, model `qwen3.5:2b-q4_K_M`. Installed artifacts: `@orkestrel/agent` 0.0.22, `@orkestrel/tool` 0.0.14, `@orkestrel/browser` 0.0.16, `@orkestrel/test` 0.0.14, `@orkestrel/contract` 0.0.17, `@orkestrel/ndjson` 0.0.10.

```json
{"attempts":1,"turns":[0,1],
 "dispatched":{"turn":0,"name":"record","args":{"note":"kyoto"}},
 "receipt":{"note":"kyoto","receipt":"receipt-09eaca11-0437-4884-bf31-d11516fe16ce"},
 "page":["POST /inference","POST /inference"],
 "relay":["POST /inference","POST /inference"],
 "daemon":["POST /api/chat","POST /api/chat"],
 "feedback":["tool: \"receipt-09eaca11-0437-4884-bf31-d11516fe16ce\""],
 "upstream":["tool: \"receipt-09eaca11-0437-4884-bf31-d11516fe16ce\""],
 "answer":"The tool returned the following value: \"receipt-09eaca11-0437-4884-bf31-d11516fe16ce\"",
 "resources":["http://127.0.0.1:64340/inference","http://127.0.0.1:64340/inference"]}
CONTROL {"status":200,"text":"control"}
WINDOW  ["GET /control"]
FAULT   {"errors":["Error: deliberate-page-fault\n    at http://127.0.0.1:60794/:76:11"],
         "console":["error: deliberate-page-fault"]}
DIRECT  {"name":"ollama","content":"Tokyo"}
```

The receipt appears as the `role: 'tool'` message of relay request index 1 and daemon request index 1 — the turn after the call was dispatched at turn 0 — on both wires, and it is absent from request index 0.

## Collision readings

```
$ grep -n 'export declare function readOutcome' node_modules/@orkestrel/*/dist/src/*/index.d.ts
  (no matches, exit 1)
$ grep -rn 'export declare (function|const|class|let|var) (readOutcome|rootToPath|PAGE_BOUNDS|PAGE_OPTIONS|scanPageOperations)\b' node_modules/@orkestrel/
  (no matches, exit 1)
$ grep -rn 'readPage|readPath' tests/
  (no matches, exit 1)
$ grep -rn 'export declare function readPage' node_modules/@orkestrel/*/dist/src/*/index.d.ts
  node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1319:export declare function readPage(): string;
```

The installed `readPage` remains; this workspace no longer declares a second one.

## Per-helper reuse ruling

| Name | Ruling |
| --- | --- |
| `createTeardown` | Reused from `@orkestrel/test`. Its declared contract — newest-first, every handler runs, the single failure rethrown by identity — is exactly the acquisition/release ordering carrier 2 needs. No local list written |
| `readOutcome` | Declared locally. `@orkestrel/test/browser`'s `readPage(): string` reads normalized page text; no installed export crosses `evaluate` and narrows a JSON reading through a caller's guard |
| `scanPageOperations` | Declared locally. No installed export reads a served page's inline module for its declared members. It strips comments and matches only members at the parked table's own indentation — a bounded fixture reader, not a second source analyzer |
| `rootToPath` | Declared locally. `@orkestrel/guide`'s `resolvePath(directory, target)` joins two paths; `@orkestrel/test`'s `resolveRoot(meta)` returns a `URL`. Neither projects an existing `URL \| string` anchor onto a host path |
| `PAGE_BOUNDS`, `PAGE_OPTIONS` | Local tables. Values, not behaviour; no installed export carries this workspace's deadlines or sampling caps |
| `waitForCondition` | Reused from `@orkestrel/test` for the fault-recorder wait. No polling loop and no fixed delay written |
| `requireValue` | Reused from `@orkestrel/test` for every narrowing in the test file |
| `reservePort` | Kept as A13's reviewer ruled: `createLoopback` binds a server the test owns, and a launched browser binds the CDP port itself |

## Deviation state

No deviation stopped the unit. One decision recorded and carried: carrier 9 takes `rootToPath` rather than the audit's `resolvePath`, because `resolvePath` collides with an installed `@orkestrel/guide` export — the reason is stated earlier under the carrier table. Carriers 12 and 13 were assigned elsewhere and `guides/agent.md` was not touched.
