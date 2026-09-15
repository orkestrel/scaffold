<!-- U13e — implementer (Opus 5, native), ollama fix round after A13b. Retained from the completion notification, 2026-09-15 (1211 s, 94 tool uses). -->

All carriers closed and every gate green.

## Touched files

| File | Change |
| --- | --- |
| `tests/setupServer.ts` | `PAGE_BOUNDS` rebuilt as one attempt allowance with derived inner deadlines (`:617`); `createPageSession` spends them (`:1035,:1047,:1052`); `readOutcome` takes its caller's deadline (`:1191`); `scanPageOperations` deleted; `PageAttempt` (`:1209`) and `acceptPageAttempt` (`:1246`) added |
| `tests/setupServer.test.ts` | `PAGE_DOCUMENT` narrowed to presence guards (`:543`); new `acceptPageAttempt` proof over inert records (`:554`); `readOutcome` proof pins the forwarded deadline (`:623`); `PAGE_BOUNDS` proof enumerates every allowance (`:665`); `scanPageOperations` block deleted |
| `tests/service/page.test.ts` | Producer never throws (`:203,:209-210,:229`), `acceptPageAttempt` is the predicate (`:232`); daemon absence pin (`:315`) and `dispatched.turn === 0` (`:296`); runtime operation table read in the real browser (`:85,:122`) |
| `guides/ollama.md` | Contract 13's retry rule (`:124`); the `setupServer.test.ts` bullet (`:359`); the `page.test.ts` bullet's recorder sentence and operation-table clause (`:368`) |

```
 guides/ollama.md           |  13 +-
 tests/setup.ts             |  26 ++
 tests/setupServer.test.ts  | 532 +++++++++++++++++++++++++++++-
 tests/setupServer.ts       | 788 ++++++++++++++++++++++++++++++++++++++++++---
 tests/setupService.test.ts |  96 ++++++
 tests/setupService.ts      | 118 ++++++-
 6 files changed, 1526 insertions(+), 47 deletions(-)
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

`tests/setup.ts` (26), `tests/setupService.test.ts` (96), and `tests/setupService.ts` (118) carry U13c's numbers unchanged — this unit did not open them. `git diff --check` exits 0. `tmp/probe/` is removed; `ollama/tmp/` holds only the Orchestrator's `codex` directory.

## Carrier closures

**1 — only a sampling miss retries.** The producer retains the acquisition, every read, and the release as the attempt's `fault` and returns the record (`page.test.ts:203,:209-210,:229`). `acceptPageAttempt` (`setupServer.ts:1246`) is the predicate `retryUntil` rethrows from: it throws for a fault, for a retained record with neither reading, and for a serialized `PageOutcome.failure`, and answers `false` only for a model that answered without dispatching the tool. Proven hermetically at `setupServer.test.ts:554` with inert records — a 500 outcome, a fixture fault, an evaluate rejection, a sampling miss, a dispatched tool.

**2 — the receipt pins hold on both wires.** `page.test.ts:296` pins `dispatched.turn === 0`; `:315` pins the receipt absent from the daemon request of the dispatching turn, beside the relay's existing absence pin and the two next-turn `role: 'tool'` pins.

**3 — one lifecycle bound.** `PAGE_BOUNDS.attempt` (95 000 ms) is the whole acquisition-and-observation allowance, and every inner deadline is a named share of it: `commands × command + ready + reads × read + evaluate`. `createPageSession` spends `command` on each browser command and `ready` on the readiness wait with `read` on its probe; `readOutcome` spends the deadline its caller names. `setupServer.test.ts:665` asserts the sum, `attempt ≤ case`, `run < evaluate`, `read < evaluate`, `attempts × attempt ≤ budget ≤ retry`.

**4 — the operation table is proven at runtime.** `scanPageOperations` and its tests are gone. `page.test.ts:122` reads `Object.keys(globalThis.page)` out of the running browser and compares it whole against `OPERATIONS` (`:85`). `setupServer.test.ts:543` keeps a presence guard, worded as one.

**5 — the guide sentence names the right recorders.** `guides/ollama.md:368` now separates the request recorders (browser log, Resource Timing drain, fixture record) from the fault recorders (page error recorder, console recorder).

## Bounds set

In milliseconds: `command` 10 000 × `commands` 4 + `ready` 5 000 + `read` 5 000 × `reads` 3 + `evaluate` 35 000 = `attempt` 95 000 ≤ `case` 110 000. `run` 30 000 < `evaluate`. `attempts` 3 × `attempt` = 285 000 ≤ `budget` 290 000 ≤ `retry` 300 000. `reads` counts the readiness probe, because `waitForCondition` awaits each probe before re-reading its budget and can overrun `ready` by that probe's own deadline.

## Red-first logs, verbatim

Setup project. Command: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupServer.test.ts`. The new proofs were written against the U13c allowances and the U13c predicate semantics, and each named its own carrier:

```
 × |setup| tests/setupServer.test.ts > acceptPageAttempt > retries only a sampling miss and escapes every failure another launch cannot clear 5ms
   → expected undefined to deeply equal Error: the page run failed: ProviderError…
 × |setup| tests/setupServer.test.ts > PAGE_BOUNDS > spends one attempt allowance the case bound contains, enumerated deadline by deadline 0ms
   → expected 390000 to be less than or equal to 90000

AssertionError: expected undefined to deeply equal Error: the page run failed: ProviderError…
- Expected:
Error {
  "message": "the page run failed: ProviderError: HTTP 500",
}
+ Received:
undefined
 ❯ tests/setupServer.test.ts:598:5

AssertionError: expected 390000 to be less than or equal to 90000
 ❯ tests/setupServer.test.ts:680:31

 Test Files  1 failed (1)
      Tests  2 failed | 32 passed (34)
   Duration  747ms
exit code: 1
```

After the fix, the same command:

```
 ✓ |setup| tests/setupServer.test.ts > PAGE_DOCUMENT > carries the shared tool definition and the readiness flag in its served text 0ms
 ✓ |setup| tests/setupServer.test.ts > acceptPageAttempt > retries only a sampling miss and escapes every failure another launch cannot clear 1ms
 ✓ |setup| tests/setupServer.test.ts > readOutcome > narrows a JSON string across the evaluate boundary and refuses every other reading 2ms
 ✓ |setup| tests/setupServer.test.ts > PAGE_BOUNDS > spends one attempt allowance the case bound contains, enumerated deadline by deadline 1ms

 Test Files  1 passed (1)
      Tests  34 passed (34)
   Duration  736ms
exit code: 0
```

Page suite controls, each `npx.cmd vitest run … --project service tests/service/page.test.ts -t "<case>"`, exit 1:

```
=== RED: carrier 4 — the `receipts` operation moved into a template-literal property ===
 (subject mutation in PAGE_DOCUMENT; the analyst's own control)
- "receipts",
+ "parked",
 ❯ tests/service/page.test.ts:122:7  ).toEqual(OPERATIONS)
      Tests  1 failed | 4 skipped (5)

=== RED: carrier 2a — the page reports the turn after the one the call was dispatched in ===
 (subject mutation: `turn: turns.at(-1) + 1` in the page driver's tool hook)
- 0
+ 1
 ❯ tests/service/page.test.ts:295:28  expect(dispatched.turn).toBe(0)
      Tests  1 failed | 4 skipped (5)

=== RED: carrier 2b — the daemon absence pin aimed at the request that does carry the receipt ===
- false
+ true
 ❯ tests/service/page.test.ts:318:49  expect(asked.text.includes(written.receipt)).toBe(false)
      Tests  1 failed | 4 skipped (5)

=== RED: carrier 1 — a read that throws is retained as the attempt's fault and escapes the retry ===
 (subject mutation: the second read calls `page.absent()`)
+ Received:
"BrowserError: TypeError: page.absent is not a function"
 ❯ tests/service/page.test.ts:246:47  expect(attempt.fault, `attempt ${index}`).toBeUndefined()
      Tests  1 failed | 4 skipped (5)
   Duration  2.94s
```

Carrier 1's control failed on `attempt 0` after 2.94 s — one launch, not three: the fault ended the retry rather than being retried away, which is the defect A13b named. Carrier 2b is the analyst's inert control run live: the pin is aimed at the daemon request that does carry the receipt, so it proves the assertion reads that wire's actual text.

## Gate evidence

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format (66 files) |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | Root, `check:src`, `check:src:core` |
| `npm run test:setup` | 0 | 118 passed, 856 ms |
| `npm run test:guides` | 0 | 34 passed, 708 ms |
| `npm run build` | 0 | Built, declarations copied |
| `npx.cmd vitest run … --project policy` | 0 | 90 passed, 1 skipped (the pre-existing extractor-availability skip A13b's checker named) |
| `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project service tests/service/page.test.ts` | 0 | 5 passed, 5.18 s |

Per-case timings from the final run (observation; the authoritative run is the Orchestrator's):

```
 ✓ evaluates the published agent closure in a real page from an import map 603ms
 ✓ executes a page tool through an agent over a live Ollama relay and feeds its result into the next model turn 1532ms
 ✓ records a deliberate page request and a deliberate page fault outside the agent operation 581ms
 ✓ rejects a page relay credential before contacting Ollama 592ms
 ✓ drives the daemon directly from the page behind its origin gate 750ms
```

## Receipt of the page run

Captured with a transient `appendFileSync` instrument that was removed before the final run; the file was restored from a byte copy taken before instrumenting and re-run green afterwards.

```json
OPERATIONS ["run","control","fault","direct","receipts","resources"]
RECEIPT {"attempts":1,"turns":[0,1],
 "dispatched":{"turn":0,"name":"record","args":{"note":"kyoto"}},
 "receipt":{"note":"kyoto","receipt":"receipt-2a9f3618-6241-4c27-9f62-e46b34344133"},
 "page":["POST /inference","POST /inference"],
 "relay":["POST /inference","POST /inference"],
 "daemon":["POST /api/chat","POST /api/chat"],
 "absent":{"relay":false,"daemon":false},
 "feedback":["tool: \"receipt-2a9f3618-6241-4c27-9f62-e46b34344133\""],
 "upstream":["tool: \"receipt-2a9f3618-6241-4c27-9f62-e46b34344133\""],
 "answer":"The tool returned the following value: \"receipt-2a9f3618-6241-4c27-9f62-e46b34344133\"",
 "resources":["…/modules/agent/dist/src/core/index.js","…/dist/src/core/index.js","…/inference","…/inference"]}
CONTROL {"control":{"status":200,"text":"control"},"window":["GET /control"],
 "errors":["Error: deliberate-page-fault\n    at http://127.0.0.1:53322/:76:11"],
 "console":["error: deliberate-page-fault"]}
REFUSED {"failure":"ProviderError: provider error: 401","code":"HTTP","status":401}
DIRECT {"name":"ollama","content":"Tokyo"}
```

`absent` reports the receipt's `includes` reading on the dispatching turn's request for each wire: `false` on the relay and `false` on the daemon. Browser `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`; daemon `http://localhost:11434`, model `qwen3.5:2b-q4_K_M`.

## Collision readings

```
$ grep -rnE "export declare (function|const|class|interface|type) (acceptPageAttempt|PageAttempt)\b" node_modules/@orkestrel/
  (no matches, exit 1)
$ grep -rn "scanPageOperations" tests/ src/ guides/
  (no matches, exit 1)
```

## Deviation state

No deviation stopped the unit. Two decisions recorded and carried, both ancillary:

- `acceptPageAttempt` reads `PAGE_TOOL.name` rather than taking the name as a parameter, so the definition the model is advertised and the name the predicate accepts are one declaration, as `PAGE_DOCUMENT` already is.
- Three prose counts in owned files were removed while their sentences were being edited: `guides/ollama.md:124` ("the two recorders"), `:368` ("both error channels"), and the matching comment in `page.test.ts`. Each now names the page error recorder and the console recorder.
