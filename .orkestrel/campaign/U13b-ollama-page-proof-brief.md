# Unit U13b — `@orkestrel/ollama`: a real model drives an agent inside a real Chromium page




## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/ollama` checkout while this unit runs. This unit runs natively
because a bench exec can neither launch Chromium as a grandchild nor reach the daemon.

## Objective

Land the proof the D3 design round ruled (`.orkestrel/campaign/plan.md` § Re-baseline 3, D3):
in ollama's existing Node `service` project, `tests/service/page.test.ts` launches a real Chrome or
Edge through `@orkestrel/browser`, serves a page from a `127.0.0.1` fixture on the relay's own
origin, and proves that an `Agent` holding a page-defined DOM-mutating `Tool` completes a two-turn
loop against the live daemon over `createRelayProvider` → `createRelay` → `OllamaProvider`, with
the page's requests recorded; a second, narrower case drives `createOllama` in the page directly
against the daemon behind its own preflight gate.

## Context

**Design record.** `.orkestrel/campaign/D3-design-planner.md` (the shape: placement, dependency,
import map, `createPageFixture`, gates, retries) and `D3-design-astra.md` (the observation and
receipt requirements, isolation, test names); `plan.md` § Re-baseline 3 D3 table (the rulings
that pick between them: import map over installed built entries; `page.network.start()` plus
events; DOM receipt cross-checked against the relay wire; direct case gated by
`requireDaemonOrigin`; file name `page.test.ts`). `G8b-browser-test-layouts-distillate.md` (the
fleet's conventions). Read every one.

**The code today** (ollama at checkpoint `24ee110` plus the U13a manifest change):
`tests/setupService.ts` (`isOllamaReady`, `warmOllama`, the module-load throw, `TOOL_LOOP_OPTIONS`,
`OLLAMA_HOST`, `OLLAMA_MODEL`), `tests/setupServer.ts` (`createRecordingTransport`,
`createRelayServer` with `{ url, requests, stop }`, the bearer), `tests/service/relay.test.ts`
and `tests/service/tools.test.ts` (the bounded `retryUntil` pattern, `RETRY_BUDGET`),
`vite.config.ts` (the `service` project: Node, 120 s timeouts, no file parallelism),
`package.json` (`test:service` in `prepublishOnly`; `@orkestrel/browser ^0.0.16` now declared).
`@orkestrel/browser` 0.0.16 is installed: read `node_modules/@orkestrel/browser/dist/src/server/index.d.ts`
(`createBrowser`, `findSystemBrowser`, launch options: headless, profile, `cdp.discover`) and
`dist/src/core/index.d.ts` (`BrowserPage`: `navigate`, `evaluate`, `network.start()` and its
`request`/`failure`/`finish` events, `emitter` `error`/`console`; `BrowserRequest { url, method,
post, headers }`). `@orkestrel/browser`'s own live proof is the pattern:
`C:/Users/mikes/WebstormProjects/browser/tests/service/browser.test.ts` and `tests/setupService.ts`
(`requireSystemBrowser`), `tests/setupServer.ts` (ephemeral CDP port).

**Installed primitives you must reuse.** `@orkestrel/test` 0.0.14: `retryUntil`, `waitForCondition`,
`waitForEvent`, `waitForAbort`, `createRecorder`, `createRecorders`, `createTeardown`, `requireValue`,
`collect`; `@orkestrel/test/server`: `createLoopback`, `createScratch`; `@orkestrel/contract`
0.0.17 guards and combinators. Read `scaffold/guides/test.md` § Surface and `guides/contract.md`
§ Surface before declaring any helper; a helper whose job an export does is a defect.

**The campaign artifacts the page composes.** `node_modules/@orkestrel/tool` and
`node_modules/@orkestrel/agent` are the campaign tarballs installed `--no-save` (tool from
`tmp/tarballs/orkestrel-tool-0.0.14.tgz` repacked after U8c, receipt `U0f-receipt.md`; agent `orkestrel-agent-0.0.22.tgz`, receipt `U0e-repack-agent-receipt.md`; both restaged by U0f). The page's import map resolves `@orkestrel/agent`, `@orkestrel/tool`, and their
runtime closure from those installed entries; the direct case additionally maps
`@orkestrel/ollama` to this checkout's own `dist/src/core/index.js` (build first).

**Law.** scaffold `AGENTS.md`; `.claude/rules/{tests,workspace,portability,typescript,architecture,
names,patterns,documentation,writing,quality}.md` (`tests.md` § Expensive proofs, § Cross-cutting
proofs, § Shared test infrastructure, § Condition; `portability.md` for `127.0.0.1` and
`pathToFileURL`); skill `orkestrel-harden-package` (hardening lane); `guides/ollama.md`.

**Host.** Windows 11, Git Bash. The Ollama daemon answers on `http://localhost:11434` with the
default model pulled; Chrome or Edge is installed (`findSystemBrowser` resolves it). No network
beyond loopback and the daemon is needed. Do not run tree-wide `format`, `lint --fix`; scoped
`oxfmt --write` over owned files is permitted; `npm run build` is permitted (you are the sole
writer).

**Measurements.** Before editing: `npm run check`, `npm run test:setup`, and `npm run test:service`
once (record the readings and the service suite's duration).

## Unknowns (settle them first, in this order, each as a throwaway probe under `tmp/probe/`)

1. Whether `@orkestrel/browser` 0.0.16 can load an ES-module page with an import map served on
   `127.0.0.1`, report one `request` event, and return one `evaluate` result (D3 planner risk 2).
   Stop and report if it cannot; that is a finding for the browser package.
2. Whether `page.evaluate` resolves a promise parked on `globalThis` by an inline module.
3. Whether the daemon answers a preflight for an ephemeral `http://127.0.0.1:<port>` origin
   (`requireDaemonOrigin`'s reading); the direct case throws with the fix (`OLLAMA_ORIGINS`) when
   it does not.

## Scope

**Owned.** `tests/setup.ts` (`PAGE_TOOL`), `tests/setupServer.ts` (`buildImportMap`,
`createPageFixture`, `PAGE_DOCUMENT`, the shared dispatcher the relay route and the page fixture
compose), `tests/setupService.ts` (`requirePageBrowser`, `requireBuild`, `requireDaemonOrigin`,
resolved on call, never at module load), `tests/setupServer.test.ts`, `tests/setupService.test.ts`,
`tests/service/page.test.ts` (new), `tests/fixtures/**` (new page assets if any), `guides/ollama.md`
(contract 13, `### Running in the browser`, `### Relaying through your own server`, `## Tests`),
`tmp/probe/**` (delete before you return). **Off-limits.** `src/**`, `package.json`,
`package-lock.json`, the `scaffold repair` set, `dist/**` (built, not edited), `guides/agent.md`
and `guides/tool.md` (mirrors).

## The proof to land

Tests named for what they prove (the analyst's names, plus the planner's cases):

- `evaluates the published agent closure in a real page from an import map` — the page loads with
  no agent run; `error` and `console` are empty of failures (D3 planner risk 1, first).
- `executes a page tool through an agent over a live Ollama relay and feeds its result into the
  next model turn` — the receipt: the model's recorded call, the agent's `tool` result, the DOM
  read through `evaluate`, the receipt inside the next `/inference` and `/api/chat` requests,
  completion with `partial: false`; exactly one page `POST /inference` per turn and zero page
  requests during tool execution; `retryUntil` at most 3 attempts, request accounting asserted
  on every attempt.
- `records a deliberate page request outside the agent operation` — the positive control: the
  CDP log, the Resource Timing drain, and the fixture's `/control` record all report it.
- `rejects a page relay credential before contacting Ollama` — a wrong bearer is refused by the
  relay with no daemon request recorded.
- `drives the daemon directly from the page behind its origin gate` — `createOllama` in the
  page, one settled generation, a `POST /api/chat` on the daemon origin present (filter, never
  count; the preflight is its own request).

Every precondition is a hard throw naming its fix; nothing skips. Fresh owned profile,
`cdp.discover: false`, ephemeral CDP port, teardown registered as resources are acquired
(`createTeardown`), browser destroyed in `finally`.

## Output

Final message: touched files with one-line summaries; `git diff --stat`; `git status --porcelain`;
the baseline readings and durations; the three Unknowns' readings; for each test its title, its
red reading where one exists, and the receipt (browser executable and version, model and host,
installed artifact identities, exact command, exit code, duration, page requests, relay requests,
daemon requests, DOM receipt, feedback message, positive-control reading); the per-helper reuse
ruling table; deviation state. No process diary.

## Deviation contract

Stop and report on: Unknown 1 failing; a `src/**` change you need; a missing browser or daemon
(report the throw, do not skip); the installed browser API lacking a member the design names.
Decide, record, carry on for page markup, fixture route names, and retry wording.

## Acceptance criteria

1. `npm run lint:check`, `npm run format:check`, `npm run check` exit 0.
2. `npm run test:setup` exit 0 with the new setup exports proven and no new load-time throw.
3. `npm run test:guides` exit 0 with contract 13 stating the gated reading and `## Tests` naming
   `tests/service/page.test.ts` and its cases.
4. `npm run build` exit 0.
5. `tmp/probe/` holds no file.
6. Only owned files changed beyond the U13a manifest and lockfile.

**Observations, not criteria.** `npm run test:service` — the full output with per-case timings
(the Orchestrator takes the authoritative run on the host after you exit).
