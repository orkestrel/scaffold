# Unit O3 — the relay round trips in `@orkestrel/ollama`: hermetic integration and live service proof

Dispatched 2026-09-14 after A2-fix and O2 landed; § Measurements names the commits and the
installed base.

## Role and engine

`sol` route (the `implementer` work class) on GPT 6 Astra (`gpt-6-astra`), reached through
`codex exec --sandbox workspace-write` rooted at `C:/Users/mikes/WebstormProjects/ollama`. You are
the bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. You are the sole writer in this checkout for the life of this unit.

## Objective

Prove, at the highest layer that can compose it for real, that a browser-side `RelayProvider`
drives a server-side `OllamaProvider` through a real `@orkestrel/server` in front of `createRelay`:
hermetically against a canned daemon transport in the `src:core` project, and live against the
warm daemon in the `service` project — content, thinking, tools, and usage crossing the hop, the
custom token observed on the browser→server hop and never on the server→daemon hop, and abort
crossing from the browser to the daemon-facing request.

## Context

**Design record.** `../scaffold/.orkestrel/campaign/design-reconciliation.md` (rows 6–9, 12,
§ "Audit round A2-R1", and the A2-fix landing) and
`../scaffold/.orkestrel/campaign/plan.md` § Units (O3, B1). The relay's contract and semantics
are in the installed `@orkestrel/agent` declaration
(`node_modules/@orkestrel/agent/dist/src/core/index.d.ts`: `createRelay`, `createRelayProvider`,
`RelayProvider`, `RelayStream`, `RelayOptions`, `RelayProviderOptions`, `RelayFrame`,
`relayFrameContract`, `providerRequestContract`, `ProviderError`, `isProviderError`,
`ProviderAbortError`, `isProviderAbortError`) and its guide `../agent/guides/agent.md` § Patterns
"Relaying a browser provider through your own server".

**Evidence.**

- The prior art you extend: `tests/service/transport.test.ts` (browser → own server → live
  daemon over the transparent wire proxy, with `OBFUSCATED` bearer carriage) and
  `tests/setupServer.ts` (`createRecordingProxy` on `createDispatcher` + `createServer`,
  `createStreamingTransport`, `createRefusingTransport`, `RecordedRequest`, `flattenHeaders`,
  `waitForRequest`, `drive`).
- The live setup: `tests/setupService.ts` (`OLLAMA_CONFIG`, `createLiveOllama`, `isOllamaReady`,
  `warmOllama`, `FAST_OPTIONS`, `STREAM_OPTIONS`) and the `service` project in `vite.config.ts`
  (`setupFiles` `setup.ts` + `setupService.ts`, 120 s timeouts, no file parallelism).
- The hermetic composition home: `tests/src/core/integration.test.ts` (the within-environment
  composition scope; the `src:core` project's `setupFiles` is `tests/setup.ts` alone, so import
  `../../setupServer.js` directly as the service suites do).
- The router and server declarations the handler mounts on:
  `node_modules/@orkestrel/router/dist/src/core/index.d.ts` (`createDispatcher`, `RouteHandler`)
  and `node_modules/@orkestrel/server/dist/src/server/index.d.ts` (`createServer`, `start`, `stop`).

**Law.** `../scaffold/AGENTS.md`; `../scaffold/.claude/rules/tests.md` (§ Test contract — real
implementations, fixture servers on `127.0.0.1` with `listen(0)`, cleanup after failure;
§ Live-service tests; § Cross-cutting proofs), `workspace.md` (§ Test project matrix),
`architecture.md`, `names.md`, `typescript.md`, `quality.md` (§ Production hardening — one
representative real client drives the surface), `writing.md`. Skill:
`../scaffold/.agents/skills/orkestrel-align-packages/SKILL.md` with `references/integration.md`
(§ Design round-trip tests) and `../scaffold/.agents/skills/orkestrel-harden-package/references/hardening.md`
(§ Design live-service tests, § Audit security and destructive paths).

**Host.** Windows 11, PowerShell through the Codex CLI (`npm.cmd`), network denied, `.git`
read-only, writes only under this checkout, probes under `tmp/probe/`. The sandbox's loopback:
a bench sandbox may deny a loopback listener with `EPERM`; if `createServer` cannot `listen`
inside the exec, record the exact error under Observations and leave the hermetic run's reading
to the Orchestrator — the tests still land. `test:service` is not yours: the Orchestrator runs it
on the host with the daemon warm and records the reading.

**Measurements.** The ollama HEAD is `4ce25b3` (O2 committed 2026-09-14) and the tracked tree is
clean. `node_modules/@orkestrel/agent` holds the packed tarball built from agent commit `5d288d7`
(version `0.0.21`; its declaration carries `UPSTREAM_RELAY_STATUS`, `createRelay`,
`createRelayProvider`, `RelayProvider`, and `RelayStream`; the declared range and lockfile are
untouched). Host gates at that commit: `format:check`, `lint:check`, `check`, `build` exit 0;
`test:src:core` 4 files / 94 tests; `test:setup` 3 files / 91 tests; `test:conformance` 1 file /
17 tests (`../scaffold/.orkestrel/campaign/o2-gates.log.txt`). `test:guides` is red (8 failed /
14 passed) until O4. After O2, `OllamaProvider` extends the base and `OllamaHTTPError` is gone:
a non-OK daemon status surfaces as the base's `ProviderError` with code `HTTP`; read
`src/core/OllamaProvider.ts` and `tests/setupServer.ts` at HEAD before writing a fixture.

**Control identifiers.** `OBFUSCATED` and `UPSTREAM_KEY` name the two fixture credentials in this
brief; a test is named for what it proves, never for these labels.

**Standing conditions.** `test:guides` is red until O4; the API Extractor notice is not a defect.

## Transformation

1. In `tests/setupServer.ts`, add a relay fixture beside `createRecordingProxy`: `createRelayServer`
   starts a real `createServer` on `127.0.0.1` with a dispatcher that mounts `createRelay` at
   `POST /inference` over a supplied `ProviderInterface` and an `authorize` that admits exactly one
   bearer (`OBFUSCATED`), records every inbound request (method, path, flattened headers, parsed
   body), and exposes `url`, `requests`, and `stop`. Keep the existing proxy untouched.
2. Hermetic composition in `tests/src/core/integration.test.ts`: `createRelayProvider({ url: server.url + '/inference', parser: createNDJSONParser, headers: () => ({ authorization: OBFUSCATED }) })`
   in front of `createRelayServer` over `createOllama({ model, headers: () => ({ authorization: UPSTREAM_KEY }), fetch: cannedDaemonTransport })`
   where the canned transport (built on `createStreamingTransport`) records the request it receives
   and answers a fixed NDJSON stream carrying content deltas, a native `message.thinking` delta, a
   `tool_calls` entry, and a `done` line with counts. Assert: the browser side yields the content
   and thinking deltas in order and returns a result whose `content`, `thinking`, `tools`, and
   `usage` equal what the daemon fixture encoded; the relay server saw `authorization: OBFUSCATED`
   and never `UPSTREAM_KEY`; the daemon transport saw `authorization: UPSTREAM_KEY` and never
   `OBFUSCATED`; a wrong bearer yields a `ProviderError` with code `HTTP`, status `401`, and the
   message `provider error: 401` (no excerpt suffix for an empty refusal body), and the daemon
   transport is never called; `generate` deep-equals the drained `stream`.
3. Abort across the hop, hermetic: a daemon transport whose stream stays open after one delta;
   the browser side reads that delta, then aborts; assert the browser side throws
   `ProviderAbortError` with `partial.content` equal to the delta, the daemon transport's recorded
   request signal is aborted, and the relay server has no open provider iterator (its `stop`
   resolves within the test's own budget). A second case: the server-side provider throws
   `ProviderAbortError` (a scripted provider from `@orkestrel/agent`'s exported fixtures is not
   available here — use a canned transport whose stream errors after a delta so `OllamaProvider`
   surfaces a failure) and assert the browser side sees the `error` frame (`channel` and `message`
   only) as `ProviderError` with code `PROVIDER`, the fixed message, and no daemon text in it.
4. Tool round trip, hermetic: advertise one `ToolDefinition` through the browser side; assert the
   daemon transport's recorded body carries it in the function form; assert a returned
   `tool_calls` entry arrives on the browser side as `result.tools` with a string `id`, the name,
   and the arguments; and that a following `tool` role message with `calls` replayed crosses the
   hop through the compiled request contract unchanged.
5. Live proof in `tests/service/relay.test.ts`, following `transport.test.ts`'s recipe and
   options: `createRelayProvider` → real `createRelayServer` → `createOllama({ model: OLLAMA_CONFIG.model, url: OLLAMA_CONFIG.host, options: FAST_OPTIONS })`
   → the warm daemon; one `generate` proving a real answer arrives through the relay with only
   the obfuscated bearer on the first hop; one `stream` proving deltas join to the settled content
   under `STREAM_OPTIONS`; one abort after the first delta proving `ProviderAbortError` with a
   partial. Structural assertions only, never exact prose.
6. Run `npm.cmd run lint:check`, `npm.cmd run check:src:core`, `npm.cmd run test:src:core`
   (record the loopback reading if the sandbox refuses to listen), `npm.cmd run test:setup`.

## Unknowns

- Whether the exec's sandbox allows a loopback listener; report the reading. The Orchestrator
  takes the hermetic and live runs on the host either way.

## Scope

**Owned.** `tests/src/core/integration.test.ts`, `tests/service/relay.test.ts` (new),
`tests/setupServer.ts`, `tests/setupServer.test.ts` (fixture proofs), `tests/setupService.ts`
(only if a shared live option is needed).

**Shared (report-only).** None.

**Off-limits.** `src/**` (O2 landed it; a needed change is a stop-and-report), `guides/**`,
`README.md`, `tests/guides.test.ts` (O4), `tests/conformance.test.ts`, configuration, the vendored
set, `package.json`, `package-lock.json`, `AGENTS.md`, `CLAUDE.md`, `.claude/**`, `scripts/**`,
`dist/**`, `node_modules/**`, and every file in the `agent` checkout.

**What asserts the state this change ends.** Nothing asserts the relay's absence.

**Tools and limits.** Read-only scripts (`lint:check`, `check:src:core`, `check`, `test:src:core`,
`test:setup`, `test:probe`); never `lint`, `format`, `build`, `test`, or `test:service`; never
install, commit, or read a credential.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## Output

Write the report to `tmp/units/o3-report.md` and return the same text: `Touched files` with
`git diff --stat`; `Cases` (each test name and the seam it pins); `Scoped validation`;
`Observations` (the loopback reading, the `test:service` cases left for the host); `Deviation`;
`Status`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
the installed relay cannot express a case above, when a case needs a `src/**` change, or when the
canned transport cannot produce a daemon shape `OllamaProvider` reads. Decide, record, and carry
on from test naming and fixture placement inside `setupServer.ts`.

## Acceptance criteria

1. `npm.cmd run lint:check` and `npm.cmd run check:src:core` exit 0.
2. `npm.cmd run test:src:core` exits 0 with the new integration cases collected, or the loopback
   refusal is recorded verbatim and the run is left to the Orchestrator.
3. The credential-separation case asserts both hops from recorded headers, never from the absence
   of a header.
4. The abort case asserts the daemon-facing request signal is aborted, not only that the browser
   side threw.
5. `tests/service/relay.test.ts` exists, imports through `@src/core` and `@orkestrel/agent`, uses
   `OLLAMA_CONFIG` and the `FAST_OPTIONS`/`STREAM_OPTIONS` recipes, and skips nothing.

**Observations, not criteria.** `test:service` (the Orchestrator's, daemon warm); `test:guides`.

## Review evidence

A code change: `git diff --stat` and `git status --porcelain` in the report; the Orchestrator takes
the full diff from the tree and the live run's reading.
