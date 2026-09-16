# Campaign registry: fleet `@orkestrel/contract` adoption

## Goal

Adopt `@orkestrel/contract` in every in-scope Orkestrel package except `@orkestrel/supervisor`. Replace overlapping local guards, parsers, outcomes, and safe-exception boundaries with the originating contract symbols. Do not publish. Do not commit unless the parent later asks. Do not bump versions unless a touched repo's own rules require a version field change as part of the source edit.

## Authoritative session

- Orchestrator checkout: `C:\Users\mikes\WebstormProjects\scaffold`
- Engine substitution: the user overrode `.agents/orchestration.md`. This campaign is Grok-only (`cursor-grok-4.6-xhigh-fast`). Codex and Claude MCP servers are not used. Opus, Sol, Composer, Luna, and Sonnet are not selected.
- Date of live inventory: 2026-09-15
- Live evidence: `tmp/campaign-inventory.json`, `tmp/campaign-summary.json`, `tmp/campaign-overlap-scan.json`

## Authority loaded

- `AGENTS.md` and the Rule map files: `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `workspace.md`, `quality.md`, `documentation.md`, `writing.md`
- `.agents/orchestration.md` (engine split recorded as user-overridden)
- `CLAUDE.md` (bridge only)
- Skills: `orkestrel-align-packages` plus `fleet.md` and `integration.md`; `orkestrel-harden-package` plus `contract.md` and `centralization.md`
- Contract checkout: `C:\Users\mikes\WebstormProjects\contract` (`@orkestrel/contract` `0.0.17`, branch `main`, clean)

## Supervisor exclusion

`@orkestrel/supervisor` at `C:\Users\mikes\WebstormProjects\supervisor` is out of write scope. Live read for exclusion only: version `0.0.2`, branch `main`, dirty working tree (README, guides, `tests/guides.test.ts`), declared `@orkestrel/contract` `^0.0.15`, lockfile-resolved `0.0.12`. It is not edited and is not listed on the republish ledger except as this exclusion.

`roughnotes` has no `@orkestrel/*` package name and is not a fleet subject.

`@orkestrel/contract` is the source package. It is absorbed, not rewritten to depend on itself.

## Engine and write rules

- One writer per package checkout.
- Same-layer packages may proceed in parallel only when their write sets do not overlap.
- Lower layers finish types, implementation, and local verify before dependents start.
- Adding or expanding a declared `@orkestrel/contract` dependency is authorized by the user instruction.

## Live layers (runtime plus peer edges)

`^0.0.x` is an exact pin. Declared `@orkestrel/contract` `^0.0.17` resolves to `0.0.17` in every in-scope lockfile that records it.

### L0

| Package | Path | Version | Contract scope | Declared | Resolved |
| --- | --- | --- | --- | --- | --- |
| `@orkestrel/codec` | `C:\Users\mikes\WebstormProjects\codec` | `0.0.3` | runtime (added this campaign) | `^0.0.17` | `0.0.17` |
| `@orkestrel/contract` | `C:\Users\mikes\WebstormProjects\contract` | `0.0.17` | self | — | — |
| `@orkestrel/msg` | `C:\Users\mikes\WebstormProjects\msg` | `0.0.10` | runtime (added this campaign) | `^0.0.17` | `0.0.17` |
| `@orkestrel/sse` | `C:\Users\mikes\WebstormProjects\sse` | `0.0.7` | runtime (promoted this campaign) | `^0.0.17` | `0.0.17` |
| `@orkestrel/test` | `C:\Users\mikes\WebstormProjects\test` | `0.0.14` | runtime (added this campaign) | `^0.0.17` | `0.0.17` |

### L1

`@orkestrel/abort` `0.0.10`, `@orkestrel/budget` `0.0.10`, `@orkestrel/csv` `0.0.7`, `@orkestrel/emitter` `0.0.10`, `@orkestrel/html` `0.0.9`, `@orkestrel/indexeddb` `0.0.11`, `@orkestrel/ndjson` `0.0.10`, `@orkestrel/sqlite` `0.0.11`, `@orkestrel/timeout` `0.0.10`. Each declares runtime `@orkestrel/contract` `^0.0.17` resolved `0.0.17`. All on `main`, clean.

### L2

`@orkestrel/console` `0.0.13`, `@orkestrel/database` `0.0.14`, `@orkestrel/form` `0.0.6`, `@orkestrel/markdown` `0.0.14`, `@orkestrel/pool` `0.0.11` (runtime contract absent; runtime `@orkestrel/emitter` `^0.0.10`), `@orkestrel/process` `0.0.12`, `@orkestrel/reason` `0.0.10`, `@orkestrel/router` `0.0.14`, `@orkestrel/table` `0.0.5`, `@orkestrel/template` `0.0.7`, `@orkestrel/tool` `0.0.15`, `@orkestrel/websocket` `0.0.12` (contract development-only `^0.0.17`; runtime `@orkestrel/emitter` `^0.0.10`). Remaining L2 rows declare runtime contract `^0.0.17` resolved `0.0.17`. All on `main`, clean.

### L3

`@orkestrel/browser` `0.0.16`, `@orkestrel/guide` `0.0.19`, `@orkestrel/interpret` `0.0.13`, `@orkestrel/lsp` `0.0.8`, `@orkestrel/qualifier` `0.0.14`, `@orkestrel/queue` `0.0.13`, `@orkestrel/rater` `0.0.14`, `@orkestrel/relation` `0.0.12`, `@orkestrel/scaffold` `0.0.70`, `@orkestrel/sea` `0.0.16`, `@orkestrel/server` `0.0.19`, `@orkestrel/terminal` `0.0.15`, `@orkestrel/workspace` `0.0.8`. Each declares runtime contract `^0.0.17` resolved `0.0.17`. All on `main`, clean.

### L4

`@orkestrel/brief` `0.0.8`, `@orkestrel/mcp` `0.0.30`, `@orkestrel/middleware` `0.0.20`, `@orkestrel/program` `0.0.13`, `@orkestrel/worker` `0.0.12`, `@orkestrel/workflow` `0.0.18`. Each declares runtime contract `^0.0.17` resolved `0.0.17`. All on `main`, clean.

### L5

`@orkestrel/agent` `0.0.23`, `@orkestrel/probe` `0.0.14`. Each declares runtime contract `^0.0.17` resolved `0.0.17`. `@orkestrel/supervisor` sits in this layer in the live graph and remains excluded.

### L6

`@orkestrel/ollama` `0.0.16`, `@orkestrel/toolbox` `0.0.14`. Each declares runtime contract `^0.0.17` resolved `0.0.17`. All on `main`, clean.

## Dirty-branch and conflicting-session risk

Re-establish live `git status` before editing a repo. `@orkestrel/supervisor` remains excluded and dirty. In-scope trees this campaign has written and not committed: `@orkestrel/abort`, `@orkestrel/budget`, `@orkestrel/browser`, `@orkestrel/codec`, `@orkestrel/console`, `@orkestrel/csv`, `@orkestrel/database`, `@orkestrel/emitter`, `@orkestrel/form`, `@orkestrel/guide`, `@orkestrel/html`, `@orkestrel/indexeddb`, `@orkestrel/interpret`, `@orkestrel/lsp`, `@orkestrel/markdown`, `@orkestrel/msg`, `@orkestrel/ndjson`, `@orkestrel/pool`, `@orkestrel/process`, `@orkestrel/qualifier`, `@orkestrel/queue`, `@orkestrel/rater`, `@orkestrel/reason`, `@orkestrel/router`, `@orkestrel/sqlite`, `@orkestrel/sse`, `@orkestrel/table`, `@orkestrel/template`, `@orkestrel/test`, `@orkestrel/timeout`, `@orkestrel/tool`, `@orkestrel/websocket`. Remaining in-scope checkouts were clean at the last inventory except `@orkestrel/relation` (now dirty from this campaign). Completeness audit 2026-09-16 compared live sibling git status against overlap files and this registry. Live dirty trees that match a closed overlap row: abort, budget, browser, codec, console, csv, database, emitter, form, guide, html, indexeddb, interpret, lsp, markdown, msg, ndjson, pool, process, qualifier, queue, rater, reason, router, sqlite, sse, table, template, test, timeout, tool, websocket. Clean unfinished at that audit: relation (now closed), scaffold, sea, server, terminal, workspace, brief, mcp, middleware, program, worker, workflow, agent, probe, ollama, toolbox. Skipped: contract (absorb), supervisor (excluded, dirty README/guides). Overlap files present through rater; relation overlap written this turn. Do not trust a closed registry row whose live `src` is clean unless the overlap records tests-only.

## Closed L0 (except `@orkestrel/contract`)

Overlap matrices: `.orkestrel/campaign/overlap/codec.md`, `msg.md`, `sse.md`, `test.md`.

| Package | Decision summary | Gates |
| --- | --- | --- |
| `@orkestrel/msg` | Deleted local Result types and local `isRecord`. Imported originating `Result` / `isRecord` / `isString` / `isUint8Array` / `isDate` / `arrayOf` / `isInstance` / `isArrayBuffer` / `isBoolean` / `isNumber` / `isFiniteNumber` / `isNonNegativeInteger` / `attempt`. Kept `success` / `failure` / `isSuccess` / `isFailure`, `createMSG` domain catch, `isEmail*` names, `isNaN(date.getTime())`, attachment loop catch. Tests: `isPolicyRecord` and distribution `isRecord`/`isNames`; deleted `isList`. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0 after the typeof sweep. |
| `@orkestrel/test` | Deleted local Result and unused `JSONValue`. Imported originating `Result` / `attempt` / `holds` / `isArray` / `isDefined` / `isError` / `isFiniteNumber` / `isInteger` / `isNumber` / `isObject` / `isSymbol` / `isString` / `isFunction`. Kept `invokeUnchecked` / `readProperty` `typeof` (Function `any` bridge), async `retryUntil` catch, throwing `JSON.parse`, DOM `instanceof`, `JSONSafe`. Tests: same policy/distribution pattern as msg. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. First `npm test` after adding the runtime dep failed on a Vite optimize reload of `helpers.test.ts`; the rerun passed. |
| `@orkestrel/codec` | Added runtime `@orkestrel/contract` `^0.0.17`. Text guards use `isString`. Byte guards use `isArrayBufferView` then `isUint8Array` then the decoder, so a proxy never reaches `length`. Domain `isBase64` / `isUTF8` / siblings stay. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/sse` | Promoted `@orkestrel/contract` from development to runtime. `isSSEError` body uses `isInstance`. Retained WHATWG `retry` `/^\d+$/`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |

## Closed L1

Overlap matrices: `.orkestrel/campaign/overlap/abort.md`, `budget.md`, `csv.md`, `emitter.md`, `html.md`, `indexeddb.md`, `ndjson.md`, `sqlite.md`, `timeout.md`.

| Package | Decision summary | Gates |
| --- | --- | --- |
| `@orkestrel/abort` | `isAbortSignal` uses `holds` / `isFunction`. `validateAbortOptions` uses `readValue`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/budget` | Signal/usage guards use `holds`. Options and token-charge readers use `readValue`. Kept `isBudgetAmount` (`-0` still accepted). Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/csv` | Retained local `parseInteger` / `parseReal` / `parseBoolean` after live compare with contract `0.0.17`. Adopted `isInteger` / `isString` / `isNumber` / `isBoolean` / `isBigInt` / `isArray` / `isInstance` / `attempt`. Kept `Number.isSafeInteger`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/emitter` | `src` already used `isFunction`. Retained listener-isolation try/catch. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/html` | Adopted `isObject` / `isFiniteNumber` / `isInteger` / `isFunction` / `isString`. Retained `walkNodes` generator try/catch. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/indexeddb` | Adopted `isString` / `isInteger` / `isInstance` for `isIndexedDBError`. Retained host `typeof indexedDB` and native `instanceof DOMException` in `wrapCall` (`isInstance` failed to narrow the platform ctor). Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/ndjson` | `src` already used `parseJSONAs` + `isRecord`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/sqlite` | `isSQLiteError` uses `isInstance`. `wrapError` uses `isSQLiteError` / `isNumber` / `isError` (direct `isInstance` failed to narrow the local class). Retained native sqlite try/catch. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/timeout` | `isTimeoutSignal` uses `holds` / `isFunction` / `isBoolean`. `validateTimeoutOptions` uses `readValue`. Kept `isTimeoutDuration` range composition. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |

## Closed L2

Overlap matrices: `.orkestrel/campaign/overlap/console.md`, `database.md`, `form.md`, `markdown.md`, `pool.md`, `process.md`, `reason.md`, `router.md`, `table.md`, `template.md`, `tool.md`, `websocket.md`.

| Package | Decision summary | Gates |
| --- | --- | --- |
| `@orkestrel/console` | Adopted `isObject` / `isFunction` / `isString` / `isFiniteNumber` / `isNumber` / `isUint8Array` / `isError` / `isInstance`. Retained Node `write` `typeof === 'function'` (control-flow), `instanceof Promise`, circular `JSON.stringify`, sink-tee try/catch, `Object.hasOwn`, `CaptureResult`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/database` | Schema validators use `holds` / `arrayOf` / `isString` / `isBoolean` / `isFiniteNumber` / `isArray`. Drivers and encode/decode use `isNumber` / `isInteger` / `isBigInt` / `isObject` / `isUint8Array` / `isError` / `isDatabaseError`. Retained throwing `JSON.parse` (DRIVER cause), `Number.isNaN`, mutating `Array.isArray` on conformance tags. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/form` | `src` already used `Result` / `attempt` / `isRecord`. `isFormError` uses `isInstance`. Retained `Object.hasOwn`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/markdown` | Constructor and node-value discriminants use `isString`. `parseInteger` already imported. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/pool` | Added runtime `@orkestrel/contract` `^0.0.17`. `isPoolMax` uses `isNumber` plus `Number.isSafeInteger`. `isPoolSignal` uses `holds` / `isFunction`. `isPoolError` / cause use `isInstance` / `isError`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/process` | ESRCH wrap uses `isError`. `ProcessManager.stop` uses `isString`. Retained `isProcessError` cross-copy brand. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/reason` | Reasoners and helpers use `isObject` / `isArray` / `isFiniteNumber` / `isError` / `isString` / `isInstance`. Retained `termToKey` typeof labels. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/router` | `add` / header lists use `isArray`. Handler wrap uses `isError`. Retained `findAnchor` native `instanceof HTMLAnchorElement` (`isInstance` failed to narrow). Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/table` | `isTableError` uses `isInstance`. Managers use `isArray`. Pagination uses `isFiniteNumber`. Retained `Number.isNaN` and `Object.hasOwn`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/template` | `isTemplateError` uses `isInstance`. Ids / paths / duck-type methods use `isString` / `isArray` / `isFunction`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/tool` | Execute isolation uses `isError` inside `attempt`. `src` already used `isArray` / `isInstance`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/websocket` | Promoted `@orkestrel/contract` development → runtime. `isWebSocketError` uses `isInstance`. Opcode / close use `isInteger`. Payload / timeout keep `Number.isSafeInteger` plus `isNumber`. Chunk / payload strings use `isString`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |

## Closed L3

Overlap matrices: `.orkestrel/campaign/overlap/browser.md`, `guide.md`, `interpret.md`, `lsp.md`, `qualifier.md`, `queue.md`, `rater.md`, `relation.md`, `scaffold.md`, `sea.md`, `server.md`, `terminal.md`, `workspace.md`.

| Package | Decision summary | Gates |
| --- | --- | --- |
| `@orkestrel/browser` | `src` already used guards, `attempt`, `parseArray`, `parseEnum`, `parseJSON`, `isInstance`, and `instanceOf`. Adopted `parseArray` for number tables, snapshot strings, and locator text lists; `parseJSONAs` for binding and codegen JSON. Retained domain CDP parsers (`parse*Field` / `objectOf` / `recordOf` would coerce or drop extra keys / range invariants), `Network.json` throwing `JSON.parse` (cause kept), page-script `typeof` / `instanceof`, and `isNonNegative*` (`-0`). Tests: policy/distribution pattern plus fixture `parseJSON` / `isNumber` / `isString` / `isInteger` / `isFunction` / `isObject`. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test:src` 0, `test:config` 0, `test:setup` 0, `test:guides` 0. `npm test` fails on pre-existing `PROPOSAL.md` prose (`easy`, `should`) at HEAD `fdd8037`; that file was not edited. |
| `@orkestrel/guide` | `src` already compiled shapes through `createContract` and combinators. Adopted `parseEnum` / `parseJSONAs` / `isNonEmptyString` on CLI and manifest parsers; `isString` on `GuideModule`; `isError` / `isFiniteNumber` on the command; `isInstance` on `URL`. Tests: policy/distribution pattern plus `isFunction` / `isString` / `isArray`. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/interpret` | `src` already used combinators and `parseJSONAs`. Adopted `isInstance` on `isInterpretError`; `isString` on `remove` overloads and narrator strings; `isError` on stage wrap; `isArray` on field/canonicalize/stage walks; `isFiniteNumber` on extracted numbers. Retained narrator `typeof === 'function'` (formatter return type) and canonicalizer `JSON.stringify`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/lsp` | `src` already used combinators, `parseJSON`, and `isError`. Adopted `isLSPTextDocumentSyncOptions` for open/close; `isNumber` beside `Number.isSafeInteger` on Content-Length. Retained publication `Array.isArray` (`isArray` failed `TS2345`), framing `JSON.stringify`, and the `isLSPError` brand. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/qualifier` | `src` already used combinators and `resolveField`. Adopted `isInstance` on `isQualifierError`; `isArray` on render/empty-set walks; `isError` on engine wrap. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/queue` | `src` already used `Result`, `createContract`, `cloneJSONValue`, and shapes. Adopted `isInstance` on `isQueueError`; `holds` on `isQueueSignal` / `isStoredEntry`; `isError` on abort/store wrap. Retained `Number.isSafeInteger` and `readOption`'s `QueueError` door. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/rater` | `src` already used combinators and `isJSONValue`. Adopted `isInstance` on `isRaterError`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/relation` | `src` already used `isRecord` / `isString` / `isArray` / `isDefined`. Adopted `isInstance` on `isRelationError`; `literalOf` on descriptor `relationship`; `isObject` on `readColumn`; `isBoolean` on nested include. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/scaffold` | `src` already used combinators, `parseJSON` / `parseJSONAs`, `cloneJSONValue`, and `attempt`. Adopted `isInstance` on `isScaffoldError` / `isUsageError`; `isArray` / `isString` on CLI parseArgs; `isString` on manifest-section keys, upstream ranges, and `WriteTransaction` anchors; paired `isNumber` with `Number.isSafeInteger` on `readFileHex`. Retained generated template `typeof` / `isRecord` / `isList` (self-contained consumer text) and vendored `tests/setupPolicy.ts` `isPolicyRecord` (`@orkestrel/contract` is not in `BASE_DEV_DEPENDENCIES`). Tests: distribution JSON walks use `isRecord` / `isString`. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0. `test:src:core` 0, `test:src:bin` 0, `test:config` 0, `test:guides` 0. `npm test` fails on pre-existing HEAD failures: Ollama setup (`executeOllamaHook` timeout, spawn `-4058` vs `127`), `ROADMAP.md` prose `currently`, and `tests/setupServer.test.ts` `resolveTool('bash')` absent. Proven against HEAD `src/server/helpers.ts` for Ollama. |
| `@orkestrel/sea` | `src` already used `isArrayBuffer`. Adopted `isInstance` on `isSEAError` / `isShellError`; `literalOf` on `isExecutableFormat`; `isError` / `isString` on catch cause and errno `code`. Retained `AssetManager.register` `Array.isArray` (`isArray` brands `readonly unknown[]`). Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/server` | `src` already used guards and `parseJSON`. Adopted `isInstance` / `isObject` on `isHTTPError`; `isInstance` on `isServerError` and `ContentTooLargeError`; `parseJSON` on token payload; `isString` / `isNumber` / `isFiniteNumber` / `isInteger` / `isError` on secrets, Accept q, ranges, and EADDRINUSE. Retained `Server.use` `typeof === 'function'` (`isFunction` failed `TS2345`/`TS2488`) and mutating `scrubPrototype` `Array.isArray`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/terminal` | `src` already used combinators, shapes, `parseJSON`, `attempt`, and `Result`. Adopted `isInstance` on `isTerminalError`; `isError` on `isAbortError`; `isObject` / `isFunction` on stream ducks; `isNumber` / `isString` / `isBoolean` on field text. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/workspace` | `src` already used combinators, `holds`, and shapes. Adopted `isInstance` on `isWorkspaceError`. Retained `isText` / `isBinary` property discriminants and `isValidRange` bounds. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |

## Closed L4

Overlap matrices: `.orkestrel/campaign/overlap/brief.md`, `mcp.md`, `middleware.md`, `program.md`, `worker.md`, `workflow.md`.

| Package | Decision summary | Gates |
| --- | --- | --- |
| `@orkestrel/brief` | `src` already used combinators, `createContract`, `parseJSONAs`, `cloneJSONRecord`, `attempt`, and shapes. Adopted `isInstance` on `isBriefError`; `isObject` on freeze/givens; `isError` / `isString` on stage-throw renderer; `isString` on `remove`; `isObject` / `isFunction` / `isArray` on `captureValue`. Retained `` `${typeof error}` `` identity label and the custom function-preserving cloner. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/mcp` | `src` already used combinators, `parseJSON`, cloners, and `attempt`. Adopted `isInstance` on `isMCPError`; `isArray` on protocol collection guards; `isInteger` / `isFiniteNumber` / `isObject` on bounds, TTL, and serialize walks; `parseJSON` on tool-result text; `isError` on client/WS catch. Retained throwing `JSON.parse` on transports that emit the SyntaxError, protocol `JSON.stringify`, Node `instanceof Readable`, and `Number.isSafeInteger`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0. `test:src` 0, `test:config` 0, `test:setup` 0, `test:guides` 0, `test:conformance` 0, `test:integration` 0. `npm test` fails on pre-existing `ROADMAP.md` prose `currently` at HEAD `96da9df`; that file was not edited. |
| `@orkestrel/middleware` | `src` already used `isRecord` / `isString` / `isBoolean` / `isFiniteNumber` / `isFunction`. Adopted `isObject` / `isNumber` / `literalOf` on the `isMultipartError` brand; `isInstance` / `isFunction` on session ducks; `isArray` / `isInteger` / `isError` / `isString` on options, CIDR, and boundary catch; `isUint8Array` on `streamFile`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/program` | `src` already used combinators and `isArray` / `isRecord` / `isFiniteNumber`. Adopted `isInstance` on `isProgramError`; `isObject` on `#seal`; `isArray` / `isString` on `remove`. Retained `Object.hasOwn` on reserved keys. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/worker` | `src` already used `attempt` / `isRecord`. Adopted `isString` on `isReply` and `isError` on Dispatch wrap. Retained `serveWorker` native type tests (thread entry cannot import contract) and native `instanceof Thread` (`isInstance` failed `TS2339`). Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/workflow` | `src` already used combinators, shapes, cloners, `attempt`, and `Result`. Adopted `isInstance` on `isWorkflowError`; `isString` on snapshot descriptions, fail messages, and `matchesDescription`; `isFiniteNumber` on silence/timeout windows; `isError` on `errorToMessage`; `isBoolean` on wait outcomes. Retained diagnostic `` `${typeof signal}` `` labels. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |

## Closed L5

Overlap matrices: `.orkestrel/campaign/overlap/agent.md`, `probe.md`.

| Package | Decision summary | Gates |
| --- | --- | --- |
| `@orkestrel/agent` | `src` already used combinators, shapes, `parseJSONAs`, cloners, and `attempt`. Adopted `isInstance` on every local error brand; `isProviderAbortError` on RelayStream; `isFiniteNumber` on `sanitizeToken`. Retained protocol `JSON.stringify`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/probe` | `src` already used combinators, shapes, `attempt`, `holds`, and `isError`. Adopted `isProbeError` at every `instanceof ProbeError` call site; `isError` / `isString` / `isObject` / `isNumber` / `isArray` on helpers and runtime stacks; `parseJSON` on compiler config text. Retained the `isProbeError` brand, manifest `JSON.parse`+`attempt` (cause), Vitest `typeof === 'function'` (`isFunction` failed `TS2345`), and `Number.isSafeInteger`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |

## Closed L6

Overlap matrices: `.orkestrel/campaign/overlap/ollama.md`, `toolbox.md`.

| Package | Decision summary | Gates |
| --- | --- | --- |
| `@orkestrel/ollama` | `src` already used `isNumber` / `isRecord` / `isString` / `parseJSONAs`. Adopted `isArray` on `extractTools`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |
| `@orkestrel/toolbox` | `src` already used combinators, shapes, `createContract`, `attempt`, and cloners. Adopted `isInstance` on `isToolboxError` and `ContentTooLargeError`; `literalOf` on `isColumnPrimitive`; `isArray` / `isFunction` / `isBoolean` / `isError` / `isString` / `isNumber` / `isObject` / `isFiniteNumber` / `parseJSON`. Retained `Object.hasOwn`, `Number.isSafeInteger`, and token `typeof === 'function'` (`isFunction` failed `TS2322`). Guide parity updated for `isColumnPrimitive` as `const`. Tests: policy/distribution pattern. | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. |

## First-pass overlap (named local decls matching contract symbols)

Replace only when semantics match. A similar name is not proof.

| Package | Local symbol | Contract candidate | Decision |
| --- | --- | --- | --- |
| `@orkestrel/msg` | `isRecord` | `isRecord` | Implemented. Contract's plain-record brand. |
| `@orkestrel/msg` | `Result` / `Success` / `Failure` | `Result` / `Success` / `Failure` | Implemented. Not re-exported. |
| `@orkestrel/test` | `Result` family | `Result` | Implemented. Not re-exported. |
| `@orkestrel/csv` | `parseInteger` | `parseInteger` | Retained. Live contract `0.0.17` still coerces `'007'` and unsafe integer strings. |
| `@orkestrel/scaffold` | `isRecord` hit in `src/core/templates.ts` | `isRecord` | Retained. Generated `tests/distribution.test.ts` text; the emitted proof must not import `@orkestrel/contract`. |
| `@orkestrel/codec` | unnamed `typeof` / view / `instanceof` | `isString` / `isArrayBufferView` / `isUint8Array` | Implemented as recorded in `overlap/codec.md`. |
| `@orkestrel/sse` | `isSSEError` `instanceof` | `isInstance` | Implemented. Promoted contract to runtime. |
| `@orkestrel/pool` | unnamed `typeof` / `instanceof` / signal | `isNumber` / `holds` / `isInstance` | Implemented as recorded in `overlap/pool.md`. |
| `@orkestrel/websocket` | unnamed `typeof` / `instanceof` / integer | `isString` / `isInstance` / `isInteger` | Implemented. Promoted contract to runtime. |

## Acceptance per repository

- Overlap matrix written under `.orkestrel/campaign/overlap/<name>.md` when a package is edited or when leftover overlap is ruled retain/exclude
- In-scope overlap rows closed: implement, retain, or exclude with a semantic reason
- No rename-only wrapper left; no contract re-export from another barrel
- Host-independent core preserved
- Local gates, in order, actually run and read: `npm run format:check` → `npm run lint:check` → `npm run check` → `npm run build` → `npm test`
- Governing guide and parity updated when the public surface or documented behavior changes
- Republish ledger updated when the built artifact meaningfully moves

## Completeness audit (2026-09-16)

Compared live sibling checkouts under `C:\Users\mikes\WebstormProjects` against this registry, `.orkestrel/campaign/overlap/*.md`, and live `git status`. Do not trust a closed row whose live `src` is clean unless the overlap records tests-only.

### Skipped

- `@orkestrel/contract` — absorb; do not rewrite it to depend on itself. Live `6ee71b5`, clean.
- `@orkestrel/supervisor` — excluded. Live `edf80e6`, dirty README/guides/`tests/guides.test.ts`.

### Closed (overlap + matching imports + gates run)

L0: `@orkestrel/msg`, `@orkestrel/test`, `@orkestrel/codec`, `@orkestrel/sse`.
L1: `@orkestrel/abort`, `@orkestrel/budget`, `@orkestrel/csv`, `@orkestrel/emitter` (tests only; distributable not moved), `@orkestrel/html`, `@orkestrel/indexeddb`, `@orkestrel/ndjson` (tests only; distributable not moved), `@orkestrel/sqlite`, `@orkestrel/timeout`.
L2: `@orkestrel/console`, `@orkestrel/database`, `@orkestrel/form`, `@orkestrel/markdown`, `@orkestrel/pool`, `@orkestrel/process`, `@orkestrel/reason`, `@orkestrel/router`, `@orkestrel/table`, `@orkestrel/template`, `@orkestrel/tool`, `@orkestrel/websocket`.
L3: `@orkestrel/browser` (`npm test` fails pre-existing `PROPOSAL.md` prose), `@orkestrel/guide`, `@orkestrel/interpret`, `@orkestrel/lsp`, `@orkestrel/qualifier`, `@orkestrel/queue`, `@orkestrel/rater`, `@orkestrel/relation`, `@orkestrel/scaffold` (`npm test` fails pre-existing Ollama setup, `ROADMAP.md` `currently`, `resolveTool('bash')`), `@orkestrel/sea`, `@orkestrel/server`, `@orkestrel/terminal`, `@orkestrel/workspace`.
L4: `@orkestrel/brief`, `@orkestrel/mcp`, `@orkestrel/middleware`, `@orkestrel/program`, `@orkestrel/worker`, `@orkestrel/workflow`.
L5: `@orkestrel/agent`, `@orkestrel/probe`.
L6: `@orkestrel/ollama`, `@orkestrel/toolbox`.

Live dirty trees match those closed rows. Queue and rater were already closed; not redone.

### Unfinished

Every in-scope package has a recorded decision. Tarball packing is complete. Tarball consumers are closed. No remaining in-scope tarball consumer.

## Tarball round-trip

Packed every distributable-moved artifact with `npm pack --ignore-scripts` (dist already built during campaign gates) into `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\tarballs`. Off this wave (not packed): `@orkestrel/emitter`, `@orkestrel/ndjson`. `@orkestrel/contract` absorbed, not packed.

| Consumer | Installed tarballs | Resolution | Gates | Restore |
| --- | --- | --- | --- | --- |
| `@orkestrel/mcp` | codec `0.0.3`, sse `0.0.7` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/...` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test:src` 0, `test:config` 0, `test:setup` 0, `test:guides` 0, `test:conformance` 0, `test:integration` 0. `npm test` still fails pre-existing `ROADMAP.md` `currently`. | `package.json` / lockfile restored; `npm install` rerun. |
| `@orkestrel/ollama` | agent `0.0.23`, budget `0.0.10`, tool `0.0.15` | lockfile `file:` tarball paths | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/toolbox` | agent, database, form, relation, server, terminal, tool, workflow, workspace | lockfile `file:` tarball paths | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/agent` | abort `0.0.10`, budget `0.0.10`, database `0.0.14`, queue `0.0.13`, timeout `0.0.10`, tool `0.0.15`, workflow `0.0.18`, workspace `0.0.8` (emitter off-wave, skipped) | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-{abort,budget,database,queue,timeout,tool,workflow,workspace}-*.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | `package.json` / lockfile restored; `npm install` rerun. |
| `@orkestrel/database` | indexeddb `0.0.11`, sqlite `0.0.11` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-indexeddb-0.0.11.tgz`, `orkestrel-sqlite-0.0.11.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/markdown` | html `0.0.9` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-html-0.0.9.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/router` | abort `0.0.10` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-abort-0.0.10.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/browser` | html `0.0.9`, websocket `0.0.12` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-html-0.0.9.tgz`, `orkestrel-websocket-0.0.12.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test:src` 0, `test:config` 0, `test:setup` 0, `test:guides` 0. `npm test` still fails pre-existing `PROPOSAL.md` prose `easy`/`should`. | Restored. |
| `@orkestrel/guide` | markdown `0.0.14` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-markdown-0.0.14.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/interpret` | reason `0.0.10`, template `0.0.7` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-reason-0.0.10.tgz`, `orkestrel-template-0.0.7.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/lsp` | process `0.0.12` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-process-0.0.12.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/qualifier` | reason `0.0.10` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-reason-0.0.10.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/queue` | abort `0.0.10`, database `0.0.14`, timeout `0.0.10` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-abort-0.0.10.tgz`, `orkestrel-database-0.0.14.tgz`, `orkestrel-timeout-0.0.10.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/rater` | reason `0.0.10` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-reason-0.0.10.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/relation` | database `0.0.14` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-database-0.0.14.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/scaffold` | console `0.0.13`, markdown `0.0.14`, process `0.0.12`, template `0.0.7` | lockfile `file:.orkestrel/campaign/tarballs/orkestrel-console-0.0.13.tgz`, `orkestrel-markdown-0.0.14.tgz`, `orkestrel-process-0.0.12.tgz`, `orkestrel-template-0.0.7.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test:src:core` 0, `test:src:bin` 0, `test:config` 0, `test:guides` 0. `npm test` fails `ROADMAP.md` prose `currently` and `tests/setupServer.test.ts` `resolveTool('bash')` (pre-existing, unrelated to Ollama). Ollama retry with packed deps: `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server tests/src/server/helpers.test.ts -t "Ollama"` exit 1; `executeOllamaHook` still 5000ms timeout; fixture `executeOllamaSetup` still `failed:true` / empty requests / spawn `-4058` vs `127`. Live daemon did not change those fixture/Windows results. | Restored after first gates and after the Ollama retry. |
| `@orkestrel/sea` | process `0.0.12` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-process-0.0.12.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/server` | abort `0.0.10`, codec `0.0.3`, router `0.0.14`, timeout `0.0.10` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-abort-0.0.10.tgz`, `orkestrel-codec-0.0.3.tgz`, `orkestrel-router-0.0.14.tgz`, `orkestrel-timeout-0.0.10.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/terminal` | console `0.0.13`, database `0.0.14`, form `0.0.6`, sse `0.0.7` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-console-0.0.13.tgz`, `orkestrel-database-0.0.14.tgz`, `orkestrel-form-0.0.6.tgz`, `orkestrel-sse-0.0.7.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/workspace` | database `0.0.14` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-database-0.0.14.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/brief` | interpret `0.0.13`, reason `0.0.10` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-interpret-0.0.13.tgz`, `orkestrel-reason-0.0.10.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/middleware` | abort `0.0.10`, budget `0.0.10`, timeout `0.0.10` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-abort-0.0.10.tgz`, `orkestrel-budget-0.0.10.tgz`, `orkestrel-timeout-0.0.10.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/program` | qualifier `0.0.14`, rater `0.0.14`, reason `0.0.10` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-qualifier-0.0.14.tgz`, `orkestrel-rater-0.0.14.tgz`, `orkestrel-reason-0.0.10.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/worker` | database `0.0.14`, pool `0.0.11`, queue `0.0.13` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-database-0.0.14.tgz`, `orkestrel-pool-0.0.11.tgz`, `orkestrel-queue-0.0.13.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/workflow` | abort `0.0.10`, budget `0.0.10`, database `0.0.14`, queue `0.0.13`, timeout `0.0.10` | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-abort-0.0.10.tgz`, `orkestrel-budget-0.0.10.tgz`, `orkestrel-database-0.0.14.tgz`, `orkestrel-queue-0.0.13.tgz`, `orkestrel-timeout-0.0.10.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |
| `@orkestrel/probe` | lsp `0.0.8`, mcp `0.0.31`, queue `0.0.13`, timeout `0.0.10`, tool `0.0.15` (emitter off-wave, skipped) | lockfile `file:../scaffold/.orkestrel/campaign/tarballs/orkestrel-lsp-0.0.8.tgz`, `orkestrel-mcp-0.0.31.tgz`, `orkestrel-queue-0.0.13.tgz`, `orkestrel-timeout-0.0.10.tgz`, `orkestrel-tool-0.0.15.tgz` | `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0. | Restored. |

Tarball round-trip is complete for every in-scope dependent that consumes a distributable-moved upstream. Skip `@orkestrel/supervisor`. Off-wave: emitter, ndjson. Do not publish.

## Implementation order

Work L0 subjects other than `@orkestrel/contract` first, then L1 through L6. Do not start a dependent until every runtime dependency that this campaign changes has finished local verify.

L0 through L6 in-scope subjects are closed. Tarball packing is complete. Tarball consumers are closed.

Fleet `tests/setupPolicy.ts` `isPolicyRecord` and `tests/distribution.test.ts` `isList` still need the L0 helper treatment when that package is visited. From this turn onward, also sweep shapers, parsers, inferers, compilers, combinators, cloners, and `contain` / `attempt` outcomes.

## Republish ledger

Version bumps stay for the later publish campaign. Do not publish in this campaign.

| Package | Distributable moved | Why | Later publish order |
| --- | --- | --- | --- |
| `@orkestrel/msg` | Yes | New runtime `@orkestrel/contract` `^0.0.17`; Result and guard bodies changed. No fleet runtime dependent. | After `@orkestrel/contract` (already `0.0.17`). |
| `@orkestrel/test` | Yes | New runtime `@orkestrel/contract` `^0.0.17`; helpers and validators changed. Consumed as a development dependency across the fleet. | After `@orkestrel/contract`. |
| `@orkestrel/codec` | Yes | New runtime `@orkestrel/contract` `^0.0.17`; guard bodies changed. Runtime consumer includes `@orkestrel/mcp`. | After `@orkestrel/contract`, before `@orkestrel/mcp`. |
| `@orkestrel/sse` | Yes | Contract promoted development → runtime; `isSSEError` body changed. Runtime consumer includes `@orkestrel/mcp`. | After `@orkestrel/contract`, before `@orkestrel/mcp`. |
| `@orkestrel/abort` | Yes | Guard and options-reader bodies now call `holds` / `readValue`. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/budget` | Yes | Guard and options-reader bodies now call `holds` / `readValue`. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/csv` | Yes | Cell serialization, error brand, and constructor discriminant now call originating guards. Local `parseInteger` retained. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/emitter` | No | Test helpers only. Published `src` unchanged. | Not on this wave. |
| `@orkestrel/html` | Yes | Node/entity/tag/constructor guards now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/indexeddb` | Yes | Path, version, and `isIndexedDBError` bodies now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/ndjson` | No | Test helpers only. Published `src` unchanged. | Not on this wave. |
| `@orkestrel/sqlite` | Yes | `isSQLiteError` and `wrapError` now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/timeout` | Yes | Signal brand and options reader now call `holds` / `readValue`. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/console` | Yes | Stream, chunk, error, and stringify guards now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/database` | Yes | Schema, encode/decode, and driver guards now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/form` | Yes | `isFormError` body now calls `isInstance`. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/markdown` | Yes | Constructor and node-value guards now call `isString`. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/pool` | Yes | New runtime `@orkestrel/contract` `^0.0.17`; signal, max, and error bodies changed. | After `@orkestrel/contract`. |
| `@orkestrel/process` | Yes | ESRCH wrap and stop discriminant now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/reason` | Yes | Reasoner and helper type tests now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/router` | Yes | `add`, header, and error-wrap bodies now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/table` | Yes | Error brand, manager lists, and pagination now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/template` | Yes | Error brand, id/path, and duck-type methods now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/tool` | Yes | Execute isolation now calls `isError`. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/websocket` | Yes | Contract promoted development → runtime; frame, close, and error bodies changed. | After `@orkestrel/contract`. |
| `@orkestrel/browser` | Yes | Number tables, binding/codegen JSON, snapshot strings, and locator text lists now call `parseArray` / `parseJSONAs`. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/guide` | Yes | CLI/manifest parsers, module discriminant, command error/exit, and URL root now call originating parsers and guards. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/interpret` | Yes | Error brand, remove discriminants, narrator strings, stage walks, and number extract now call originating guards. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/lsp` | Yes | Document-sync discriminant and Content-Length type test now call originating guards. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/qualifier` | Yes | Error brand, render/empty-set walks, and engine wrap now call originating guards. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/queue` | Yes | Error brand, signal/entry guards, and abort/store wrap now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/rater` | Yes | `isRaterError` now calls `isInstance`. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/relation` | Yes | Error brand, descriptor literals, column reader, and include discriminant now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/scaffold` | Yes | Error brands, CLI parseArgs, manifest-section keys, upstream ranges, write anchors, and byte-limit pairing now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/sea` | Yes | Error brands, executable-format literals, and catch cause/errno now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/server` | Yes | HTTP/server error brands, token payload `parseJSON`, Accept/range numbers, and EADDRINUSE wrap now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/terminal` | Yes | Error brand, abort brand, stream ducks, and field-value discriminants now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/workspace` | Yes | `isWorkspaceError` now calls `isInstance`. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/brief` | Yes | Error brand, freeze walk, stage-throw renderer, givens, remove discriminant, and captureValue type tests now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/mcp` | Yes | Error brand, protocol collection guards, serialize/TTL integers, tool-result `parseJSON`, and catch wraps now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`, codec, and sse. |
| `@orkestrel/middleware` | Yes | Multipart brand, session ducks, option lists, CIDR integers, boundary catch, and streamFile bytes now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/program` | Yes | Error brand, freeze walk, and remove discriminants now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/worker` | Yes | Reply error field and Dispatch wrap now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/workflow` | Yes | Error brand, snapshot descriptions, silence/timeout windows, fail messages, and wait outcomes now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/agent` | Yes | Error brands, relay abort catch, and token sanitizer now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/probe` | Yes | ProbeError call sites, stack/fault readers, compiler `parseJSON`, and path/bin strings now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/ollama` | Yes | `extractTools` now calls `isArray`. Runtime pin unchanged. | After `@orkestrel/contract`. |
| `@orkestrel/toolbox` | Yes | Error brand, column literals, database/relation lists, terminal parseJSON, and include-tree objects now call originating primitives. Runtime pin unchanged. | After `@orkestrel/contract`. |

Do not republish `@orkestrel/mcp` until codec and sse have published if those L0 artifacts are what mcp should resolve.
