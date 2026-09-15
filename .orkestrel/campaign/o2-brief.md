# Unit O2 — `OllamaProvider` rebuilt on `AgentProvider`

Dispatched 2026-09-14 after A1–A4 landed; § Landed contract and § Measurements describe the
installed base at dispatch. Everything else is fixed by the reconciled design.

## Role and engine

`sol` route (the `implementer` work class) on GPT 6 Astra (`gpt-6-astra`), reached through
`codex exec --sandbox workspace-write` rooted at `C:/Users/mikes/WebstormProjects/ollama`. You are
the bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. You are the sole writer in this checkout for the life of this unit.

## Objective

Rebuild `OllamaProvider` as a concrete `AgentProvider` that supplies only the Ollama wire — the
`/api/chat` path, the NDJSON parser, the request body, the record extraction, and the end-of-input
flush — and remove every mechanic and every export the base now owns, with the hermetic and
conformance suites green and the observable wire behaviour unchanged except for the ruled
`stream: true` on `generate`.

## Context

**Design record.** `../scaffold/.orkestrel/campaign/design-reconciliation.md` (rows 1–5, 15 and
"Decisions made on the user's behalf") and `../scaffold/.orkestrel/campaign/plan.md`
§ "The ruled contract" → "Ollama after the rebuild". That paragraph is restated under
§ Transformation and is what you implement; where they disagree, stop and report.

**Landed contract.** `@orkestrel/agent` reaches this checkout as an installed packed tarball
(unit A4); read the installed declaration at
`node_modules/@orkestrel/agent/dist/src/core/index.d.ts` for `AgentProvider`,
`AgentProviderInput`, `AgentProviderInterface`, `ProviderOptions`, `ProviderRequest`,
`ProviderIncrement`, `ProviderParserInterface`, `ProviderError`, `isProviderError`,
`buildProviderResult`, `DEFAULT_PROVIDER_TIMEOUT`, and `MAX_ERROR_BODY_LENGTH`. The agent
checkout beside you (`../agent/src/core/AgentProvider.ts`, `../agent/guides/agent.md`) is the
same code with its guide; read it, never write it.

**Evidence.**

- The class as it stands after the environment move: `src/core/OllamaProvider.ts` (444 lines,
  byte-identical to the pre-move file). The distillate of its wire/generic split, method by
  method: `../scaffold/.orkestrel/campaign/absorb-provider-report.md` item 4 — the rows marked
  Ollama-wire stay; the rows marked provider-generic leave.
- Support files: `src/core/types.ts` (`OllamaResponse` at `:18-22` leaves; `WireChatRequest`
  `:37-69` stays unchanged; `OllamaOptions` `:88-147` is reshaped; `OllamaHTTPErrorOptions`
  `:158-160` leaves), `src/core/helpers.ts` (`mapMessages`, `extract*` stay; `buildResult`
  `:65-81` and `joinThinking` `:136-140` leave), `src/core/parsers.ts` (`parseBody` leaves; delete
  the file when empty), `src/core/errors.ts` (`OllamaHTTPError`, `isOllamaHTTPError` leave; delete
  the file when empty), `src/core/constants.ts` (`DEFAULT_PROVIDER_TIMEOUT` and
  `MAX_ERROR_BODY_LENGTH` leave; `OLLAMA_CHAT_PATH = '/api/chat'` arrives), `src/core/factories.ts`
  (`createOllama` stays), `src/core/index.ts`.
- Tests that pin the old shape (derive the full set by running the suite):
  `tests/src/core/OllamaProvider.test.ts` (the `stream: false` request-shape assertion for
  `generate`, the `OllamaHTTPError` expectations, the transport-seam and deadline cases, the canned
  NDJSON fold), `tests/src/core/errors.test.ts` and `tests/src/core/parsers.test.ts` (deleted with
  their subjects), `tests/src/core/helpers.test.ts` (`buildResult`, `joinThinking` cases leave),
  `tests/src/core/factories.test.ts`, `tests/src/core/integration.test.ts`,
  `tests/service/OllamaProvider.test.ts` and any other `tests/service/*.test.ts` that names
  `isOllamaHTTPError` (grep; rewrite to `isProviderError` and `code === 'HTTP'`).
- `tests/conformance.test.ts` asserts `WireChatRequest` against the official `ollama` client
  types and is unaffected because `WireChatRequest` does not change.
- `tests/setupServer.ts` keeps `createRecordingProxy` and the Node fixtures; its
  `createStreamingTransport` and `createRefusingTransport` now also exist in
  `@orkestrel/agent`'s `tests/setup.ts` — that is test infrastructure of another package, not
  an export, so keep ollama's own copies.

**Law.** `../scaffold/AGENTS.md`; `../scaffold/.claude/rules/names.md`, `typescript.md`,
`architecture.md`, `patterns.md`, `tests.md`, `workspace.md`, `documentation.md` (TSDoc voice),
`portability.md`, `quality.md`, `writing.md`. Skill:
`../scaffold/.agents/skills/orkestrel-harden-package/SKILL.md` with `references/contract.md` and
`references/centralization.md`. Governing guide: `guides/ollama.md` (read; unit O4 rewrites it).

**Host.** Windows 11, PowerShell through the Codex CLI, network denied (never install), `.git`
read-only (only `git status`, `git diff`, `git log`; rename with the shell's move), writes only
under this checkout, probes under `tmp/probe/`. No Ollama daemon is running; `test:service` is not
yours — the Orchestrator runs it after O3 with the daemon warm.

**Measurements.** The ollama HEAD is `e92a327` (after O1) and the tracked tree is clean.
`node_modules/@orkestrel/agent` holds the packed tarball built from agent commit `5d288d7`
(version `0.0.21`, the same number the registry serves; the installed declaration carries
`UPSTREAM_RELAY_STATUS`, which the registry copy lacks — see
`../scaffold/.orkestrel/campaign/a4-receipt.md`). The declared range `^0.0.21` in `package.json`
and the lockfile are untouched (`npm install --no-save`). Baseline counts after O1: `src:core`
6 files / 98 tests; `setup` 91; `guides` 22; `conformance` 17.

**Control identifiers.** None.

**Standing conditions.** `tests/guides.test.ts` goes red the moment the surface changes; it is
O4's, report it as an observation. Vitest worker forks may fail to spawn in the sandbox (record
verbatim, do not diagnose). The API Extractor notice is not a defect.

## Transformation

1. `OllamaOptions extends ProviderOptions` with `model` (required), `url?`, `keepAlive?`,
   `options?`, `think?`; `timeout`, `fetch`, `headers`, `format` are inherited with their TSDoc
   moved to the base. Every option a caller sets today keeps its name and default.
2. `export class OllamaProvider extends AgentProvider implements AgentProviderInterface` with
   `readonly name = 'ollama'`, `#model`, `#keepAlive`, `#think`, `#options`; the constructor
   passes `super({ url: options.url ?? DEFAULT_OLLAMA_URL, path: OLLAMA_CHAT_PATH, ...only the
   ProviderOptions keys that are present })` — spread conditionally so
   `exactOptionalPropertyTypes` holds — then sets its own fields. No `generate`, no `stream`, no
   `#fetch`, no `#requestHeaders`, no `#deltas`, no `Timeout`, no `AbortSignal.any`, no
   `TextDecoder`, no `createThinkSplitter`, no `ProviderAbortError` in this file.
3. `frame()` returns `createNDJSONParser()`.
4. `body(request)` returns the `WireChatRequest`: `model`, `messages: mapMessages(request.messages)`,
   `stream: true`, `keep_alive`, `think: request.options?.think ?? this.#think`, `options` when
   configured, `format: request.options.schema` when supplied, `tools` mapped to the function form
   when `request.tools` is non-empty — the same body as today with `stream` always `true`.
5. `read(record)` returns `{ content: extractContent(record), thinking: extractThinking(record), tools: extractTools(record) }`
   plus `usage: extractUsage(record)` only when the record's `done` is `true` and the counts are
   present (a delta line contributes no `usage` key at all).
6. `finish(parser)` returns `parser.parse('\n')`, which recovers a final unterminated line exactly
   as the current post-loop tail flush does.
7. Remove `OllamaResponse`, `OllamaHTTPError`, `isOllamaHTTPError`, `OllamaHTTPErrorOptions`,
   `MAX_ERROR_BODY_LENGTH`, `DEFAULT_PROVIDER_TIMEOUT`, `buildResult`, `joinThinking`, and
   `parseBody`; delete `src/core/errors.ts` and `src/core/parsers.ts` when nothing remains; add
   `OLLAMA_CHAT_PATH`; update the barrel. Never re-export an agent symbol from this package.
8. Tests: every removed export's tests go with it; every `OllamaHTTPError` expectation becomes
   `isProviderError(error) && error.code === 'HTTP' && error.status === <n>`; the `generate`
   request-shape assertion pins `stream: true`; keep every transport-seam, deadline, abort, canned
   NDJSON fold, unterminated-tail, tool, usage, and think-separation case, now proving the base
   through this concrete provider; add a case that a record before `done` carries no `usage` and
   that the `done` record's usage lands on the result.

## Unknowns

- Whether the installed `@orkestrel/agent` tarball resolves through the package `exports` map for
  both `import` and `require` in this checkout (A4 records it; confirm with
  `npm run check:src:core` before editing and record the reading).

## Scope

**Owned.** `src/core/OllamaProvider.ts`, `src/core/types.ts`, `src/core/constants.ts`,
`src/core/errors.ts` (delete), `src/core/parsers.ts` (delete), `src/core/helpers.ts`,
`src/core/factories.ts`, `src/core/index.ts`, `tests/src/core/**`, `tests/setup.ts`,
`tests/setupServer.ts`, `tests/setupService.ts`, `tests/service/*.test.ts` (only the
`isOllamaHTTPError` rewrites), `tests/setupServer.test.ts` and `tests/setupService.test.ts` only if
the suite makes them false.

**Shared (report-only).** None.

**Off-limits.** `guides/**`, `README.md`, `tests/guides.test.ts` (O4), `tests/conformance.test.ts`
(must stay green unchanged), `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`,
`configs/**`, the vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`),
`tests/distribution.test.ts`, `AGENTS.md`, `CLAUDE.md`, `.claude/**`, `scripts/**`, `dist/**`,
`node_modules/**`, and every file in the `agent` checkout.

**What asserts the state this change ends.** Every test named under Evidence; `guides/ollama.md`
Surface and Contract rows (O4's).

**Tools and limits.** Read-only scripts: `lint:check`, `check:src:core`, `check`, `test:src:core`,
`test:setup`, `test:conformance`, `test:guides` (observation), `test:probe`. Never `lint`,
`format`, `build`, `test`, or `test:service`; never install, commit, or read a credential.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## Output

Write the report to `tmp/units/o2-report.md` and return the same text as your final message:
`Touched files` with `git diff --stat`; `Removed exports` (the list, each with the test that went
with it); `Red then green` for the `stream: true` pin and the `usage`-only-on-`done` case;
`Scoped validation`; `Observations`; `Deviation`; `Status`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
the installed base cannot express a step above, when `WireChatRequest` would have to change, or
when a file outside Owned must change. Decide, record, and carry on from test naming, ordering,
and TSDoc wording.

## Acceptance criteria

1. `npm run lint:check` exits 0.
2. `npm run check:src:core` and `npm run check` exit 0.
3. `npm run test:src:core`, `npm run test:setup`, and `npm run test:conformance` exit 0 (or the
   worker-spawn standing condition is recorded verbatim), with the removed test files gone and the
   remaining files collected; report the counts.
4. `grep -n "Timeout\|AbortSignal\.any\|TextDecoder\|createThinkSplitter\|ProviderAbortError\|globalThis.fetch\|#fetch\|#deltas" src/core/OllamaProvider.ts`
   returns nothing.
5. The recorded `/api/chat` request body for a fixed input is byte-identical to the pre-change
   recording except `stream: true`; the recording proxy test asserts it.
6. `OllamaOptions` accepts `model`, `url`, `keepAlive`, `timeout`, `options`, `think`, `fetch`,
   `headers`, and `format` with the same defaults, proved by the factory-defaults suite.
7. No `any`, assertion, non-null assertion, suppression, access modifier, or parameter property
   in the diff; the barrel star-exports every remaining kind file and nothing from another package.

**Observations, not criteria.** `npm run test:guides` (red until O4); `build`, the whole `test`
chain, and `test:service` (the Orchestrator's).

## Review evidence

A code change: `git diff --stat` and `git status --porcelain` in the report; the Orchestrator takes
the full diff from the tree.
