<!-- U4f — implementer (Opus 5, native), mcp fix round after A4b and the bridge follows the registry. Retained from the completion notification, 2026-09-15 (1879 s, 138 tool uses). The unit's red and green logs are retained verbatim beside this file as U4f-red.log.txt and U4f-green.log.txt (the unit deleted its tmp/probe/ copies). -->

All carriers closed; every gate green. Report follows.

## Touched files (U4f)

| File | Change |
| --- | --- |
| `src/core/MCPClient.ts` | `#checkSession` became `#refuse`, a refusal **builder** called at `#request` (`:585`) and at the subscription's generator entry (`:470`); `server/discover` exempt (`:558`) |
| `src/browser/ModelContext.ts` | `publish` arms a subscription on `tools.emitter` (`:141`); `#follow`/`#unfollow`/`#added`/`#removed`/`#cleared` (`:177`–`:232`); the per-name reconciliation extracted to `#reconcile` (`:247`) with the destroyed re-read between release and replacement (`:274`); `destroy` unfollows (`:161`) |
| `src/browser/helpers.ts` | New pure leaf `describeWebMCPTool` (`:172`) — the manager's advertised definition for one name, projected |
| `src/browser/types.ts` | `ModelContextInterface` remarks now state per-name registration identity; `publish` and `destroy` TSDoc carry the follow |
| `src/browser/factories.ts` | `createPageServer` inertness covers every session-bound request; `createModelContext` ownership prose corrected |
| `guides/mcp.md` | Client refusal paragraph (`:3666`), page-server inertness (`:4025`), the `publish` follow prose (`:4055`, `:4063`), ownership (`:4083`), the two parity rows (`:4811`, `:4822`), the `describeWebMCPTool` helper row (`:3288`), Methods summaries |
| `tests/fixtures/modelContext.ts` | The double gained `suspend()` (`:238`) holding `registerTool` at its entry and `holding()` (`:246`) reporting how many are held — registry members unchanged |
| `tests/setupBrowser.ts` | New `traceRegistrations` (`:387`) recording the registry's contents at each `toolchange` |
| `tests/src/browser/ModelContext.test.ts` | Follow suite, replacement-destroy test, restated snapshot tests, mutation-proof `is inert on a repeat` and adoption test |
| `tests/src/browser/factories.test.ts` | `rejects task requests after page stop` (`:1209`), `rejects a subscription started after page stop` (`:1233`) |
| `tests/src/browser/helpers.test.ts` | `describeWebMCPTool` suite |
| `tests/src/core/MCPClient.test.ts` | `rejects a task request on a client that is not connected` (`:1665`), `rejects a subscription opened on a client that is not connected` (`:1686`) |

## Carriers

1. **Refusal at the shared entry** — `MCPClient.ts:585` (`#request`) and `:470` (`#openSubscription`); `#refuse` at `:557`. Subscription refuses on the first `next()` (recorded: a generator's body does not run until then, so `listen` has no earlier honest moment). Tests: `rejects task requests after page stop`, `rejects a subscription started after page stop`, plus core `rejects a task request on a client that is not connected`, `rejects a subscription opened on a client that is not connected` (each asserts `loopback.sent.length` unchanged). `settles calls across page destruction` re-taken red with `stop` intact and only the refusal disabled.
2. **The bridge follows the registry** — `ModelContext.ts:141`, `:177`–`:232`. Tests: `registers a tool the registry adds after publish` (`:235`), `aborts the registration of a tool the registry removes` (`:250`), `aborts every registration when the registry clears` (`:266`), `follows the later manager after a second publish` (`:282`), `stops following the registry after destroy` (`:307`, reading `tools.emitter.count()`), `leaves a followed tool WebMCP cannot carry unregistered` (`:322`). Guide row `mcp.md:4811` rewritten to **implement**; the "re-publish after changing the registry" sentence is gone from source, types, and guide.
3. **Destroy during replacement unregistration** — `ModelContext.ts:274`. Test `registers nothing when destroy runs during replacement unregistration` (`:633`), red first.
4. **Ownership prose** — `types.ts` interface remarks, `ModelContext.ts` class remarks, `factories.ts` `createModelContext`, `guides/mcp.md:3213` overview, `:4083` identity paragraph, the fence comment. The same-name test stays (`:668`).
5. **The `G5` row** — `guides/mcp.md:4822`: "no WebMCP counterpart was found in the sources reached, and whether WebMCP addresses any of them is recorded as unknown rather than as an absence", matching `G5-webmcp-distillate.md:51`.
6. **Mutation-proof tests** — `is inert on a repeat` (`:607`) now suspends `registerTool` across a double `destroy` and reddens when `#reconcile`'s destroyed read is deleted. The adoption test (`:402`) registers two tools with complementary hint triples, so **every** pairwise projection swap reddens (three booleans cannot be pairwise distinct in one tool).
7. **Red and green logs** — verbatim following; `tmp/probe/` deleted.

## Decisions recorded

- **`emitter.on` returns `void`, not a cleanup.** The brief's Installed-primitives line and carrier 2's "the subscription's cleanup is the function `emitter.on` returns" are false against the installed `@orkestrel/emitter` 0.0.10 (`node_modules/@orkestrel/emitter/dist/src/core/index.d.ts:118`: `on<K extends keyof TMap>(event: K, handler: EmitterHandler<TMap[K]>): void`) and against `scaffold/guides/emitter.md:90` (`| on | void | …`). The cleanup is `emitter.off` handed the same handler references, retained on the `#followed` record (`ModelContext.ts:191`). Ancillary mechanism, carrier objective unchanged, so the unit carried on.
- **`#refuse` builds the error rather than throwing it.** `MCPRequestFunction` (`src/core/types.ts:2766`, off-limits) publishes "it rejects", so `#request` returns `Promise.reject`; the generator entry throws. One reading, two deliveries.
- **The two snapshot tests were restated.** With the registry followed, `publish` then `clear` correctly ends empty, so "registers `['add']` afterwards" is no longer true. Both now assert the `toolchange` trace `[['add'], []]` — which distinguishes a call-time snapshot (registered, then released) from a run-time one (never registered) — and the empty end state.
- **`destroy`'s own early return guards nothing observable.** Executed, not argued: deleting `if (this.#destroyed) return` from `destroy` leaves the whole file green (36 passed | 2 skipped), because every operation it guards is individually idempotent. The property the flag guards is pinned instead, and reddens on `#reconcile`'s read.
- **A followed `add` of a tool with no description is skipped, not refused** — a followed change has no caller a refusal could reach. Documented on `publish` and in the guide, pinned by `leaves a followed tool WebMCP cannot carry unregistered`.
- **Guard duplication removed.** The `#publish` loop's `if (this.#destroyed) return` duplicated `#reconcile`'s entry read and made each individually survivable; the loop's copy is gone (`ModelContext.ts:239`).

## Baselines (taken before editing, 2026-09-15)

```
npm run check            exit 0
npm run test:src:browser exit 0   Test Files 6 passed (6)   Tests 128 passed | 2 skipped (130)
npm run test:src:core    exit 0   Test Files 17 passed (17) Tests 935 passed (935)
```

## Acceptance commands

```
npm run format:check     exit 0
npm run lint:check       exit 0
npm run check            exit 0
npm run test:src:core    exit 0   Test Files 17 passed (17) Tests 937 passed (937)
npm run test:src:browser exit 0   Test Files 6 passed (6)   Tests 140 passed | 2 skipped (142)
npm run test:src:server  exit 0   Test Files 12 passed (12) Tests 374 passed (374)
npm run test:guides      exit 0   Test Files 1 passed (1)   Tests 201 passed (201)
npm run test:setup       exit 0   Tests 86 passed (86)
npm run test:policy      exit 0   Tests 90 passed | 1 skipped (91)
npm run test:config      exit 0   Tests 172 passed | 1 skipped (173)
npm run test:conformance exit 0   Tests 47 passed (47)
npm run test:integration exit 0   Tests 4 passed (4)
npm run build            exit 0
```

Criterion 5 sweeps: installed-export collisions over 355 `@orkestrel/test` + `@orkestrel/contract` export names across `src/**` and `tests/**` — **none**. No `performance.now()` deadline read added. The only `Promise.withResolvers` I added is the fixture's release latch (`tests/fixtures/modelContext.ts:239`), which observes neither an abort nor an event.

## `git status --porcelain` (combined U4 → U4f chain on `b9ff0b9`)

```
 M guides/mcp.md
 M guides/tool.md
AM src/browser/ModelContext.ts
 M src/browser/constants.ts
 M src/browser/factories.ts
AM src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/transports/WebSocketClientTransport.ts
 M src/browser/types.ts
AM src/browser/validators.ts
 M src/core/MCPClient.ts
 M src/core/errors.ts
 M src/core/validators.ts
 M tests/fixtures/browserServer.ts
AM tests/fixtures/modelContext.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
AM tests/src/browser/ModelContext.test.ts
 M tests/src/browser/factories.test.ts
AM tests/src/browser/helpers.test.ts
 M tests/src/browser/transports/WebSocketClientTransport.test.ts
AM tests/src/browser/validators.test.ts
 M tests/src/core/MCPClient.test.ts
 M tests/src/core/MCPServer.test.ts
 M tests/src/core/validators.test.ts
```

`guides/tool.md` is the Orchestrator's U0g mirror refresh; U4f did not write it. No manifest, lockfile, `src/server/**`, `configs/**`, `scaffold repair` file, or `dist/**` path appears.

## `git diff --stat HEAD` (combined chain)

```
 guides/mcp.md                                      | 379 ++++++++++-
 guides/tool.md                                     | 119 +++-
 src/browser/ModelContext.ts                        | 364 ++++++++++
 src/browser/constants.ts                           |   7 +
 src/browser/factories.ts                           | 143 +++-
 src/browser/helpers.ts                             | 221 ++++++
 src/browser/index.ts                               |   3 +
 src/browser/transports/WebSocketClientTransport.ts |  15 +-
 src/browser/types.ts                               | 384 ++++++++++-
 src/browser/validators.ts                          |  61 ++
 src/core/MCPClient.ts                              |  44 +-
 src/core/errors.ts                                 |   9 +-
 src/core/validators.ts                             |  15 +-
 tests/fixtures/browserServer.ts                    |  29 +-
 tests/fixtures/modelContext.ts                     | 250 +++++++
 tests/guides.test.ts                               |  26 +
 tests/setup.ts                                     |  21 +-
 tests/setupBrowser.test.ts                         |  11 +-
 tests/setupBrowser.ts                              | 366 +++++++++-
 tests/src/browser/ModelContext.test.ts             | 745 +++++++++++++++++++++
 tests/src/browser/factories.test.ts                | 321 ++++++++-
 tests/src/browser/helpers.test.ts                  | 241 +++++++
 .../transports/WebSocketClientTransport.test.ts    |   8 +-
 tests/src/browser/validators.test.ts               | 108 +++
 tests/src/core/MCPClient.test.ts                   |  85 ++-
 tests/src/core/MCPServer.test.ts                   |   6 +-
 tests/src/core/validators.test.ts                  |  14 +
 27 files changed, 3879 insertions(+), 116 deletions(-)
```

## Shared-file patches

None. `src/core/types.ts` carries no refusal claim that the move makes false (`MCPRequestFunction`'s doc already says "rejects"), so no patch is owed.

## Subscription-cleanup reading

The installed `@orkestrel/emitter` is **0.0.10**, and its `on` returns `void`:

```ts
// node_modules/@orkestrel/emitter/dist/src/core/index.d.ts:118
on<K extends keyof TMap>(event: K, handler: EmitterHandler<TMap[K]>): void
```

`scaffold/guides/emitter.md:90` agrees (`| on | void | Registers a listener for an event. …`). There is no returned cleanup in this version, so the bridge retains the three handler references on `#followed` and releases through `emitter.off` (`ModelContext.ts:191`). `stops following the registry after destroy` reads `tools.emitter.count()` to prove the release, so the pin does not depend on which mechanism performs it.

## Deviation state

No stop. One recorded deviation, carried on under the U4d deviation contract (ancillary mechanism, primary objective intact): carrier 2's stated cleanup mechanism — "the function `emitter.on` returns" — does not exist in the installed emitter, and `emitter.off` with the retained handler references is used instead. Two further items are recorded rather than deviations: the two snapshot tests were restated because the follow makes their old end state false, and `destroy`'s own early return was measured to guard nothing observable.

Orchestrator note (integration): the U4f-only interdiff against the A4b baseline (`A4c-u4f-only.patch.txt`, 12 files, 712 insertions / 144 deletions) matches the touched-files table; the combined chain is `A4c-diff.patch.txt`.
