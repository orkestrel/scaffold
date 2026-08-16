# Delta absorb — seven remaining target trees

Versions checked: installed vs fleet-target as stated (budget `0.0.5→0.0.6`, emitter `0.0.5→0.0.6`, sse `0.0.4→0.0.5`, terminal `0.0.5→0.0.8`, router `0.0.8→0.0.9`, sea `0.0.5→0.0.6`, ollama `0.0.8→0.0.9`).

---

## budget `0.0.5` → `0.0.6`

**Consumed:** `TokenUsage` — `app/server/types.ts:28,73`; `app/server/parsers.ts:7,62`; `app/server/providers/CLIProvider.ts:9,134,337`.

**Declaration:** `TokenUsage` `{ prompt; completion; total }` identical at current `:266` and target `:266`.

**no consumed symbol moved.**

**Severity:** none.

---

## emitter `0.0.5` → `0.0.6`

**Consumed:** `Emitter`, `EmitterInterface`, `EmitterHooks`, `EmitterErrorHandler`, `EventMap` — `src/core/Supervisor.ts:1,14`; `src/core/types.ts:2`; `src/core/Run.ts:1`; `src/core/Unit.ts:1`; `app/server/types.ts:26`; `app/server/ApplicationServerRunner.ts:1,11`; `tests/setup.ts:21`; `tests/src/core/Unit.test.ts:1,10`; `tests/src/core/Run.test.ts:17`.

**Declaration:** export names and shapes for those five align (e.g. `EmitterInterface` current/target `:107`; `EventMap` `:130`).

**no consumed symbol moved.**

**Severity:** none.

---

## sse `0.0.4` → `0.0.5`

**Consumed:** `createSSEParser` — `app/browser/services/LiveStream.ts:3`; `tests/app/browser/services/LiveStream.test.ts:3`; `tests/app/browser/integration/setup.ts:16`.

**Declaration:** `createSSEParser(options?: SSEParserOptions): SSEParserInterface` at current/target `:44`; `SSEParserInterface` / `SSEParserOptions` align (`:200`, `:246`).

**no consumed symbol moved.**

**Severity:** none.

---

## terminal `0.0.5` → `0.0.8`

**Consumed (prompt vocabulary + related):**

| Symbol                                                                                       | Sites                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PendingPrompt`                                                                              | `app/core/validators.ts:8`; `app/server/types.ts:33`; `app/server/HumanPrompt.ts:4,36`                                                                                |
| `PromptType` / `PromptValue`                                                                 | `app/core/types.ts:8`; `app/core/validators.ts:8`; `app/core/constants.ts:2`; `app/core/PromptCodec.ts:2`; `app/server/types.ts:34-35`; `app/server/HumanLedger.ts:1` |
| `createPrompt`                                                                               | `app/server/HumanPrompt.ts:9,26`                                                                                                                                      |
| `isPromptType`                                                                               | `app/core/parsers.ts:14`; `app/server/parsers.ts:26`; `app/server/validators.ts:5`                                                                                    |
| `isPendingPrompt`                                                                            | `app/server/validators.ts:5`                                                                                                                                          |
| `OutputStreamInterface` (`@orkestrel/terminal/server`)                                       | `tests/app/setup.ts:13`; `app/server/validators.ts:2`; `app/server/TerminalOutput.ts:1`                                                                               |
| Also imported: `AnswerResult`, `ParkRequest`, `Ticket`, `PromptInterface`, form option types | `app/server/types.ts:31-36,404`; `app/server/HumanPrompt.ts:1-7,40`; `app/core/parsers.ts:15-23,723+`                                                                 |

**Stable (vocabulary named in brief):**

- `PendingPrompt` fields match (current `:828` / target `:942`)
- `PromptType` / `PromptValue` match (`'input'|…|'editor'`; `string|boolean|readonly string[]`) — current `:1192/:1199`, target `:1373/:1380`
- `createPrompt(options?: PromptOptions)` — current `:228`, target `:243`
- `isPromptType` / `isPendingPrompt` — current `:585/:573`, target `:690/:661`
- `OutputStreamInterface` — current/target server `:214` (`write`; optional `isTTY`)

**Broken**

| Symbol         | Sites                                                                                                                                                                                                                                                                     | Target replacement                                                                                                                                                                                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AnswerResult` | import `app/server/types.ts:31`; `app/server/HumanPrompt.ts:2,40`; interface `app/server/types.ts:404`; uses `answered.success` in `HumanPrompt.ts:44`, `HumanExecutor.ts:103-104`; test expects `{ success: true, value }` at `tests/app/server/integration.test.ts:345` | **Removed.** `PromptInterface.answer` now returns `Result<unknown, AnswerError>` (target `:1005`, `:1256`). `AnswerError` remains (`'unknown'\|'rejected'`, target `:18`). Contract `Result` = `Success<T>\|Failure<E>` with same `{ success, value }` / `{ success, error }` shape (target contract `Success` `:6012`, `Failure` `:1697`). |

Form option bags (`InputOptions`, `SelectOptions`, …) gained optional `hint?` / `theme?` only — additive; supervisor constructions in `app/core/parsers.ts:723+` remain assignable.

**Severity:** compile (app + tests).

---

## router `0.0.8` → `0.0.9`

**Consumed:** `createDispatcher`, `DispatcherInterface`, `RouteContext` — `app/server/ApplicationRoutes.ts:3`; `app/server/ApplicationHandlers.ts:8`; `app/server/ApplicationRosterHandlers.ts:7`; `app/server/ApplicationUnitHandlers.ts:2`; `app/server/helpers.ts:12`; `tests/app/server/MCPProjection.test.ts:25`.

**Declaration:** `createDispatcher` `:246`; `DispatcherInterface` `:397`; `RouteContext` `{ params, pattern, url, state }` `:820` — match current vs target.

**no consumed symbol moved.**

**Severity:** none.

---

## sea `0.0.5` → `0.0.6`

**Consumed (sweep dirs):** `isCompressible` — `app/server/middlewares.ts:13`; `openBrowser` — `app/server/ApplicationServerRunner.ts:12,40`.

**Also live outside sweep:** `createSEA`, `isCompressible`, `walkDirectory` — `scripts/sea.ts:1`.

**Declaration:** `createSEA` `:288`; `isCompressible` `:507`; `openBrowser` `:601`; `walkDirectory` `:1120`; `SEAOptions` `:904` — match.

**no consumed symbol moved.**

**Severity:** none.

---

## ollama `0.0.8` → `0.0.9`

**Consumed:** `createOllama` — `app/server/ApplicationRuntime.ts:20,162` (`{ model }`); `tests/service/ollama/AgentExecutor.test.ts:2,31-35` (`{ model, url, options }`).

**`OllamaOptions` (composition fields — not imported today, still exported):** current and target `:160-168` identical:

- `model: string` (required)
- `keepAlive?: string | number`
- `timeout?: number`
- plus unchanged `url?`, `options?`, `think?`, `fetch?`, `headers?`, `format?`

**no consumed symbol moved.** (`OllamaOptions` surface for a future composer is stable on `model` / `timeout` / `keepAlive`.)

**Severity:** none.

---

## Closing table

| package              | break count                                                     | severity |
| -------------------- | --------------------------------------------------------------- | -------- |
| budget               | 0                                                               | none     |
| emitter              | 0                                                               | none     |
| sse                  | 0                                                               | none     |
| terminal             | 1 (`AnswerResult` → `Result<unknown, AnswerError>` on `answer`) | compile  |
| router               | 0                                                               | none     |
| sea                  | 0                                                               | none     |
| ollama               | 0                                                               | none     |
| === delta exit 0 === |
