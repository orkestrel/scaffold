<!-- U4c — implementer (Opus 5, native), mcp reuse fix and browser finish (successor of U4, U4b). Retained verbatim from the completion notification, 2026-09-15 (1665 s, 157 tool uses). -->

Unit U4c complete. All owned work landed; the full gate chain is green.

## Touched files

| File | Change |
| --- | --- |
| `tests/setupBrowser.ts` | Deleted the duplicate `waitForCondition`; rebuilt both parked helpers on `waitForAbort`; took in `createBridge`, `createDescribedTools`, and `readOne` from the test file |
| `tests/setup.ts` | `createAbortTools` and the task double's `#aborted` now park through `waitForAbort` |
| `tests/fixtures/modelContext.ts` | `executeTool` composes the caller's signal with `AbortSignal.any`; doc-voice corrections |
| `src/core/validators.ts` | `isMCPToolAnnotations` rebuilt on `objectOf(..., true)` |
| `src/browser/validators.ts` | Both WebMCP guards rebuilt on `objectOf` + `isFunction`; `try/catch` wrappers dropped |
| `src/browser/constants.ts` | Removed `WEBMCP_REGISTRY_MEMBERS`; the guard shape is now the sole list |
| `src/browser/types.ts` | Doc-voice corrections in the WebMCP and `ModelContext` blocks |
| `guides/mcp.md` | Browser-face `Surface` rows for every new export, the browser `Helpers` table, and the `document.modelContext` conformance-gap entry |
| `tests/src/browser/ModelContext.test.ts` | Imports the moved helpers; `waitForEvent` + `createRecorders` for `change`; `requireValue`; abort proofs assert resolution |
| `tests/src/browser/factories.test.ts` | `requireValue`; `waitForEvent` for the initial hook; `toThrow` messages; `['_meta']` access; type-only `ModelContext` import |
| `tests/src/browser/validators.test.ts` | IDL-spelled member list instead of the source constant; `createHostileValues()` sweeps; a non-callable-member case |
| `tests/src/browser/helpers.test.ts` | `captureError` replaces the `try/catch` refusal assertion; `readOne` replaces a presence throw |
| `tests/src/core/validators.test.ts` | `createHostileValues()` totality sweep for `isMCPToolAnnotations` |
| `tests/src/core/MCPClient.test.ts` | `requireValue` for the `wait` tool lookup |
| `tests/src/core/MCPServer.test.ts` | `waitForAbort` replaces the abort deferred in the custom `execution` handler |
| `src/browser/{ModelContext,factories,helpers,index}.ts` | U4's files, formatter-converged only |

## Diffstat and status

`git diff HEAD --stat`: 19 files changed, 2368 insertions(+), 49 deletions(-).

`git status --porcelain`:

```
 M guides/mcp.md
AM src/browser/ModelContext.ts
 M src/browser/constants.ts
 M src/browser/factories.ts
AM src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/types.ts
AM src/browser/validators.ts
 M src/core/validators.ts
AM tests/fixtures/modelContext.ts
 M tests/setup.ts
 M tests/setupBrowser.ts
AM tests/src/browser/ModelContext.test.ts
 M tests/src/browser/factories.test.ts
AM tests/src/browser/helpers.test.ts
AM tests/src/browser/validators.test.ts
 M tests/src/core/MCPClient.test.ts
 M tests/src/core/MCPServer.test.ts
 M tests/src/core/validators.test.ts
```

## Baseline readings (taken on the dirty tree at launch, before editing)

| Command | Reading |
| --- | --- |
| `npm run check` | exit 0 |
| `npm run test:src:browser` | exit 0 — 6 files, 112 tests passed |
| `npm run test:guides` | **exit 1 — 1 failed \| 177 passed**; `documents every barrel export` listed 30 undocumented browser symbols |
| `npm run lint:check` | exit 1 — the diagnostics were in U4's files; the `-` side of the diff shows each pre-existed my edits (`rejects.toThrow()` with no message, dotted `._meta`, the value-only `ModelContext` import, the conditional `expect` in `helpers.test.ts`, and the `MODEL_CONTEXT_ORIGIN` summary opener) |

## Acceptance commands, after

| Command | Exit | Counts |
| --- | --- | --- |
| `npm run format:check` | 0 | 133 files correct |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` (root + `check:src:{core,browser,server}`) | 0 | — |
| `npm run test:src:browser` | 0 | 6 files, 115 tests |
| `npm run test:src:core` | 0 | 17 files, 932 tests |
| `npm run test:src` | 0 | 35 files, 1421 tests |
| `npm run test:policy` | 0 | 90 passed, 1 skipped |
| `npm run test:config` | 0 | 172 passed, 1 skipped |
| `npm run test:setup` | 0 | 86 passed |
| `npm run test:guides` | 0 | 178 passed |
| `npm run test:conformance` | 0 | 47 passed |
| `npm run test:integration` | 0 | 4 passed |
| `npm test` (observation) | 0 | every project green |
| `cmp guides/tool.md <tool tip>` | 0 | byte-identical to the tool checkout's committed tip `8f2ad5d`; unmodified here |

Failing-first evidence: `npm run test:guides` was **exit 1, 1 failed** (`documents every barrel export`) before the guide work and **exit 0, 178 passed** after it.

## G6 rows closed

| Row | Closing edit |
| --- | --- |
| 1 — the duplicate `waitForCondition` | deleted from `tests/setupBrowser.ts`; imported at `tests/src/browser/factories.test.ts:58` (`options.budget` form already in use) |
| 2 — parked handlers | `tests/setupBrowser.ts:219`, `:223`, `:262`, `:266`; assertions at `tests/src/browser/ModelContext.test.ts:178`, `:213`, `tests/src/browser/factories.test.ts:1196` |
| 3 — `createAbortTools` | `tests/setup.ts:1013`, `:1024`; the task double at `tests/setup.ts:1540`; `AbortToolsInterface` unchanged, so no call site moved |
| 4 (G6 row 7) — the change counter | `tests/src/browser/ModelContext.test.ts:236-237`, `:256`; `tests/src/browser/factories.test.ts:1238` |
| 5 (G6 rows 8, 9, 10) — guards through `objectOf` | `src/core/validators.ts:703`; `src/browser/validators.ts:33`, `:60`; hostile-read cases at `tests/src/browser/validators.test.ts:71`, `:100` and `tests/src/core/validators.test.ts:2586` |
| 6 (G6 row 11) — `requireValue` | `tests/src/browser/factories.test.ts:1186`, `tests/setupBrowser.ts:306` (was `ModelContext.test.ts:28`), `tests/src/browser/helpers.test.ts:63` (through `readOne`), `tests/src/core/MCPClient.test.ts:2926` |
| 7 (G6 row 12) — placement | `tests/setupBrowser.ts:303` `createBridge`, `:330` `createDescribedTools`, `:364` `readOne` |
| 9 — finish U4 | `guides/mcp.md` gap entry, `Surface` rows, `Helpers` table; parity green |

## Per-helper ruling

| Helper | Export considered | Ruling |
| --- | --- | --- |
| `waitForCondition` (setup) | `@orkestrel/test` `waitForCondition` | **Deleted.** Same job, same shape; the export takes `options.budget`. |
| `createParkedTool`, `createParkedRegistration` | `waitForAbort`, `createSignal` | **Kept, abort arm replaced.** `waitForAbort` owns the wait; `createSignal` instruments a signal the test owns, and here the handler receives the signal. The `entered` latch has no export. |
| `createAbortTools` | `waitForAbort` | **Kept, abort arm replaced.** `entered` and `release` are directly resolved latches, not event observations. |
| `createBridge` | none | **Kept, moved to setup.** Project-specific arrangement of a fresh `Document`, the double, and the real factory. |
| `createDescribedTools` | none | **Kept, moved to setup.** Scenario data for this package's tool shape. |
| `readOne` | `requireValue` | **Kept, built on it.** `requireValue` covers presence; the surplus check is what it adds. |
| `recordPort` | `createRecorder` | **Kept.** `createRecorder` records calls to a handler it supplies; this taps a live `MessagePort` and decodes JSON-RPC frames off it. |
| `recordRequests` | `createRecorder` | **Kept.** Reads the browser's own Resource Timing log; no export touches it. |
| `createScopeCarrier` | none | **Kept.** Wires two real project transports to each other. |
| `drainRecorded` | `collect`, `collectStream` | **Kept.** Reads recorded frames back over HTTP from the Node fixture; the collectors take an iterable or a stream. |
| `installModelContext`, `ModelContextRegistry` | none | **Kept.** Protocol-faithful double of the WebMCP WebIDL, the permitted foreign-surface substitution. |
| `isWebMCPRegistry`, `isWebMCPDocument` | `objectOf`, `isFunction` | **Rebuilt on them.** The `try/catch`, the read loop, and `WEBMCP_REGISTRY_MEMBERS` are gone. |
| `isMCPToolAnnotations` | `objectOf`, `isBoolean` | **Rebuilt on them.** `optional: true` is the optional-member mode; `holds` is the hostile-read guarantee. |
| `toolAnnotationsToWebMCP`, `webMCPAnnotationsToTool`, `toolToWebMCP`, `webMCPToTool`, `buildWebMCPDescriptors` | `@orkestrel/contract` combinators | **Kept.** Each is a domain projection between two declared shapes, not a guard, parser, or outcome. |
| `MODEL_CONTEXT_ORIGIN`, `WEBMCP_CHANGE_EVENT` | none | **Kept.** Named external values. |

## Criteria greps

- **C1 — no export name collides with an installed `@orkestrel/test` or `@orkestrel/contract` export.** A probe over 469 installed declaration names against every `export function|const|class` in `src/**` and `tests/**` returns none. Control: the same probe over a planted `export async function waitForCondition` and `export const isRecord` in the scratchpad reports both and ignores `notInAnyPackage`.
- **C2 — `grep -rn "Promise.withResolvers\|addEventListener('abort'" tests src/browser`.** Every remaining hit in an owned file is ruled: `tests/fixtures/modelContext.ts:68` is the IDL's own unregistration path in the double (not a wait); `tests/guides.test.ts:1324` is a transcribed guide fence, which `tests.md` § Condition exempts; `tests/setup.ts:1005-1006`, `tests/setupBrowser.ts:212`, `:255`, and `tests/src/core/MCPClient.test.ts:473-475` are latches resolved directly rather than from an abort or an event.
- **C3 — `grep -rn "performance.now()" tests`.** No deadline read remains in an owned file. The owned hits (`tests/setup.ts:1284`, `tests/setup.test.ts:394`, `:397`) are elapsed-interval measurements, which `tests.md` § Test contract mandates.

## Unknown's reading

Real Chromium exposes **no** `document.modelContext`. Pinned by `records that this real Chromium page exposes no WebMCP registry` (`tests/src/browser/factories.test.ts`), which asserts `'modelContext' in document` is `false` and `createModelContext()` returns `undefined`. Every bridge scenario therefore runs against the IDL double, and the guide's new conformance-gap entry states that bound.

## Test titles pinning each behaviour

- **`createPageServer`:** `completes connect, tools/list, and tools/call with no request leaving the page` (with the `fetch` positive control) · `hosts the scope server identity defaults, readable from the client over the channel` · `hosts the identity the options named instead of the defaults` · `forwards the client option group to the client it builds` · `hands back a client that is bound but not yet connected` · `leaves the client disconnected after destroy, and a repeat destroys nothing further` · `aborts the hosted handler when the wrapped tool context signal aborts mid-call`
- **Feature detection:** `reports undefined for a document exposing no registry` · `records that this real Chromium page exposes no WebMCP registry` · `builds a live bridge for a document that does expose one` · `wires the initial emitter hooks the options carry`
- **`publish`:** `registers each advertised tool with its title, schema, and projected annotations` · `forwards the origins option as WebMCP exposedTo` · `omits exposedTo when no origins were asked for` · `refuses the whole call, registering nothing, when a tool advertises no description` · `reports the refusal as a coded MCP error rather than a bare throw` · `adds the names a second call brought and aborts the ones the registry lost` · `leaves a name it already registered alone on a second call` · `registers nothing after the handle is destroyed`
- **A published tool run by the registry:** `runs the local handler and answers with the value it returned, unchanged` · `surfaces a failing local handler as a rejection carrying its message` · `carries the registry execution signal into the local handler context signal`
- **`adopt`:** `reads each registered tool as a tool advertising the inverse projection` · `executes an adopted tool through the registry and answers unchanged` · `carries the local context signal onto the foreign handler through executeTool` · `forwards the origins option as WebMCP fromOrigins`
- **`change`:** `emits exactly one change when the page registers a tool this handle never published` · `emits nothing more after the handle is destroyed`
- **`destroy`:** `unregisters this handle tools and leaves another handle registrations standing` · `leaves a page registration this handle never made standing` · `is inert on a repeat`
- **Guards:** `accepts a class instance whose operations arrive through its prototype` · `refuses a registry missing any one operation it would go on to call` · `refuses a value carrying a registry operation that is not callable` · `stays total against a value whose member read throws` · `refuses every adversarial value without throwing` (both guards) · `answers every adversarial value with a boolean instead of throwing` (`isMCPToolAnnotations`)
- **Barrel contract:** `publishes the page pair and the WebMCP bridge with their declared contracts`

## Shared-file patch (report-only — `tests/setupBrowser.test.ts` is in neither scope list)

Its header claims the setup proof reaches every export of `tests/setupBrowser.ts`. That was already false for `recordRequests` and the parked helpers, and `createBridge` reads a `Document`. Exact replacement for the second paragraph:

```diff
-// The `setup` project runs in Node with the browser disabled, and every export of the module
-// is host-independent, so this proof reaches all of them: `createScopeCarrier` wires two real
-// `createScopeTransport` halves and never touches a document, `recordPort` taps a real
-// `MessagePort` (Node's is the same `EventTarget` contract the page's is), and `drainRecorded`
-// reads frames back over a real socket from the real Node fixture. The module holds no
-// DOM-driving helper, because the browser face this workspace ships carries no element surface
-// for one to drive.
+// The `setup` project runs in Node with the browser disabled, so this proof reaches the
+// module's host-independent exports: `createScopeCarrier` wires two real
+// `createScopeTransport` halves and never touches a document, `recordPort` taps a real
+// `MessagePort` (Node's is the same `EventTarget` contract the page's is), and `drainRecorded`
+// reads frames back over a real socket from the real Node fixture. `createBridge` and
+// `recordRequests` read a `Document` and the page's Resource Timing log, so
+// `tests/src/browser` drives those inside Chromium instead.
```

## Findings for the mcp owner (outside this unit)

1. **Pre-campaign sibling guards in `src/core/validators.ts` hand-roll what `objectOf` provides.** Each wraps its member reads in `try/catch` and spells the optional-member check by hand: `isMCPProgress:415`, `isMCPAnnotations:437`, `isMCPIcon:467`, `isMCPIdentity:487`, `isMCPClientCapabilities:511`, `isMCPServerCapabilities:559`, `isMCPTextResource:613`, `isMCPBlobResource:638`, `isMCPResource:663`, `isMCPResourceTemplate:716`, `isMCPContent:995`, `isMCPCallResult:1094`, `isMCPTaskResult:1134`, `isMCPTaskDetail:1211`, `isMCPElicitFieldSchema:1494`, `isMCPElicitSchema:1602`, `isMCPElicitForm:1636`, `isMCPElicitURL:1660`, `isMCPElicitRequest:1685`, `isMCPInputRequest:1708`, `isMCPInputRequestMap:1733`, `isMCPElicitResult:1754`, `isElicitContent:1818`, `isMCPRoot:1928`, `isMCPRootResult:1959`, `isMCPSampleContent:1994`, `isMCPSampleResult:2046`, `isMCPInputResponse:2088`, `isMCPInputResult:2117`. Not edited, per the brief.
2. **Abort deferreds outside the granted test files.** `tests/src/core/MCPLegacy.test.ts:532`, `:569`; `tests/src/core/MCPStreamController.test.ts:55`; `tests/src/core/MCPTextStreamController.test.ts:43`; `tests/src/server/handlers.test.ts:52`, `:633`. Each is the exact shape `waitForAbort` closes.
3. **Deadline reads outside the granted test files.** `tests/setupServer.test.ts:228-229`, `:237-238`; `tests/src/core/MCPTaskClient.test.ts:83-84`; `tests/src/server/transports/StdioClientTransport.test.ts:725-726`. Each is the poll `waitForCondition` or `retryUntil` owns.

## Deviation state

No deviation stopped the unit. Two conditions to record:

- **The tool checkout has uncommitted in-flight work.** `C:\Users\mikes\WebstormProjects\tool` is dirty, and its working-tree `guides/tool.md` adds `ToolManagerEventMap`, `ToolManagerOptions`, `emitter`, and `destroy` — the R4 emitter adoption U4b recorded as excluded. I compared against the **committed tip** `8f2ad5d`, which the installed `@orkestrel/tool` 0.0.14 tarball matches; `cmp` is exit 0 there. The mirror needs a refresh after that work lands and mcp re-installs.
- **Criterion breadth exceeded the grant.** C2 and C3 are worded over all of `tests`, while Scope grants only `tests/setup.ts` and the named core test files beyond U4's list. I closed every hit in an owned file and reported the rest above rather than editing unowned files, following the brief's own rule for pre-campaign siblings.
