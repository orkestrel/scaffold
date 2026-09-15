<!-- U4g — implementer (Opus 5, native), mcp fix round after A4c. Retained from the completion notification, 2026-09-15 (827 s, 84 tool uses). -->

Unit U4g complete. All carriers closed, all gates green.

## Touched files

Seven owned files; no unowned file changed.

| File | Change |
| --- | --- |
| `src/core/MCPClient.ts` | `#refuse` at `:567` exempts only the current negotiation (carrier 1); its comment block at `:546`–`:556` states the rule |
| `src/browser/ModelContext.ts` | `#follows` at `:213`; the guard at `:226`, `:238`, `:251`; `#cleared` takes the event's payload at `:250`; `#releaseEach` at `:314`; `#followed.clear` retyped at `:106`; class remarks at `:43` and `:48` |
| `src/browser/types.ts` | `publish` remarks at `:471`, `:474`, `:479` |
| `guides/mcp.md` | refusal prose at `:3675`; clear payload at `:4063`; the new clear paragraph at `:4066`; follow/skip prose at `:4073`, `:4079` |
| `tests/src/core/MCPClient.test.ts` | `rejects requests issued after transport loss inside a connect listener` at `:1704` |
| `tests/src/browser/factories.test.ts` | `rejects requests issued after stop inside a connect listener` at `:1233` |
| `tests/src/browser/ModelContext.test.ts` | `a queued publication does not see a tool added after its call` at `:224`; `ignores a manager a re-entrant publish replaced` at `:327`; `preserves an addition made by an earlier clear listener` at `:349` |

No fixture or `tests/setupBrowser.ts` member was needed.

## Per-carrier closure

**1 — the refusal holds across a stop issued from a `connect` listener.** `#refuse` now reads `#connected`, then exempts an in-flight attempt only when `inflight.generation === this.#generation` — the same reading `connect` and `#negotiate` already take to tell a joinable attempt from a superseded one. `#loseTransport` and `#closeConnection` each bump the generation, so a stop issued from a `connect` listener invalidates the attempt still published behind it. Discovery stays exempt. Red first in both suites; both green.

**2 — a replaced subscription's events reach nothing.** `#added`, `#removed`, and `#cleared` each open with `if (!this.#follows(tools)) return`, a manager-identity reading. Red `['lookup','subtract']` → green `['lookup']`.

**3 — a clear releases what it cleared.** `#cleared(tools, cleared)` takes `ToolManagerEventMap.clear`'s `readonly [tools: readonly ToolInterface[]]` payload, maps it to names, and queues `#releaseEach`, which routes each name through the existing manager-bound `#release`. `#releaseAll` is gone. Red `[]` → green `['fresh']`; `aborts every registration when the registry clears` stays green.

**4 — the queued-snapshot test distinguishes a run-time projection.** Recorded both readings. Against the rival implementation (a `#running` counter making a *queued* publication call `buildWebMCPDescriptors(tools)` when its turn comes, the first call keeping its snapshot): the two restated snapshot tests **passed** and the new pin **failed** — `promise rejected "MCPError: WebMCP requires a description f…" instead of resolving`. Against the shipped implementation all three pass. The mutation was reverted from a file copy and `grep -n "running" src/browser/ModelContext.ts` returns nothing.

**5 — the skip emits no `change`.** One sentence in `guides/mcp.md:4079` and `src/browser/types.ts:479`: the skip emits no `change` because nothing reached the document registry; compare the manager's `definitions()` with what `adopt()` returns, and `describeWebMCPTool` names an advertised tool the projection cannot carry.

## Decisions recorded

- **"Nothing sent" is proved in the core mirror, not the browser pin.** `createPageServer` owns its channel, so no recorder reaches the page client's wire. The core test asserts `loopback.sent.length` unchanged across the three requests. The browser pin follows the pattern its siblings already use in that file: a `1_000` ms deadline, so a request that reached the wire reports the deadline instead of `-32600`. The red log confirms the discriminator works — it carries `MCP request 'tasks/get' timed out after 1000ms`.
- **Each reading is awaited and asserted in turn, not collected first.** Before the fix the subscription parks forever; reading it last would have turned an assertion failure into a test timeout and hidden the two requests that did answer.
- **The core mirror drives transport loss, not `disconnect`.** `#teardown` defers through `Promise.resolve().then`, so a `disconnect` issued inside a `connect` listener bumps no generation synchronously and the connection is genuinely still open at that instant. `page.stop()` closes the port synchronously, which is the browser vector; the core mirror emits `close` on the loopback's own transport emitter to reach the same seam.
- **`#follows` reads manager identity alone.** I dropped a `!this.#destroyed` clause I first wrote beside it: `destroy` releases the subscription before aborting anything, so `#followed` is already `undefined` on a destroyed handle and the clause could never change the answer. The comment states that.
- **The guard is uniform across the three handlers, and only `#added` observes it under the re-entrant vector.** For `#removed` and `#cleared` the downstream `#release` is already bound by manager identity, so a stale event there is inert either way. I applied the rule at all three doors per the brief's ruling rather than at the one door a test can see it from. Flagging this for the auditor.

## Baselines

Checkpoint `b9ff0b9`, tree dirty with the U4 chain. `git status --porcelain` names the same 27 paths before and after this unit — no file added or removed.

## Failing-first test names

| Test | Red | Green |
| --- | --- | --- |
| `rejects requests issued after transport loss inside a connect listener` (core) | `1 failed \| 151 skipped (152)`, `AssertionError: expected false to be -32600` at `:1731` | `1 passed \| 151 skipped (152)` |
| `rejects requests issued after stop inside a connect listener` (browser) | `1 failed \| 61 skipped (62)`, `AssertionError: expected false to be -32600` at `:1259`, plus `Error: MCP request 'tasks/get' timed out after 1000ms` | `1 passed \| 61 skipped (62)` |
| `ignores a manager a re-entrant publish replaced` | `expected [ 'lookup', 'subtract' ] to deeply equal [ 'lookup' ]` | passed |
| `preserves an addition made by an earlier clear listener` | `expected [] to deeply equal [ 'fresh' ]` | passed |
| `a queued publication does not see a tool added after its call` | under the run-time-projection mutation: `1 failed \| 2 passed \| 38 skipped (41)`, `promise rejected "MCPError: WebMCP requires a description f…" instead of resolving` | `3 passed \| 38 skipped (41)` with both restated snapshot tests |

## Acceptance readings

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` over 133 files |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | root plus the three scoped projects |
| `npm run test:src:core` | 0 | `Test Files 17 passed (17)`, `Tests 938 passed (938)` |
| `npm run test:src:browser` | 0 | `Test Files 6 passed (6)`, `Tests 144 passed \| 2 skipped (146)` |
| `npm run test:guides` | 0 | `Tests 201 passed (201)` |

Observed beyond the criteria, all exit 0: `test:src:server`, `test:setup`, `test:policy`, `test:config`, `test:conformance`, `test:integration`. The two browser skips are the pre-existing native-registry rows at `ModelContext.test.ts:782` and `:795` — no browser exposes `document.modelContext`.

## Diffstat (this unit's delta against the U4f state)

```
 guides/mcp.md                          | 379 -> 393  (+14)
 src/browser/ModelContext.ts            | 364 -> 385  (+21)
 src/browser/types.ts                   | 384 -> 389  (+5)
 src/core/MCPClient.ts                  |  44 ->  56  (+12)
 tests/src/browser/ModelContext.test.ts | 745 -> 807  (+62)
 tests/src/browser/factories.test.ts    | 321 -> 361  (+40)
 tests/src/core/MCPClient.test.ts       |  85 -> 129  (+44)
```

`git diff --stat HEAD` totals `27 files changed, 4077 insertions(+), 116 deletions(-)` for the whole chain.

## Shared-file patches

None. I checked `src/core/types.ts` (off-limits) for prose the refusal change falsifies: it carries no claim about the refusal or about a `connect` in flight, so no patch is owed. `tmp/probe/` was removed; the repository's `tmp/` holds only the pre-existing `codex` directory.

## Deviation state

No deviation. Every carrier closed; every acceptance criterion met.
