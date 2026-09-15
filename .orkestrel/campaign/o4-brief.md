# Unit O4 — `@orkestrel/ollama` guide, README, and parity after the rebuild

Dispatched 2026-09-14 after O2, O3, and O2-fix landed; § Measurements names the commit and the
export list.

## Role and engine

`implementer` on Claude Opus 5, native, with Read, Grep, Glob, Edit, Write, and Bash. Perform the
assignment directly and spawn nothing. You are the sole writer in
`C:\Users\mikes\WebstormProjects\ollama` for the life of this unit.

## Objective

Bring `guides/ollama.md`, `README.md`, `guides/README.md`, and `tests/guides.test.ts` into parity
with the rebuilt package: `OllamaProvider` documented as a concrete `AgentProvider` that supplies
the Ollama wire and nothing else, the removed exports gone from every table and pattern, the
contract clauses rewritten to what the code now does, the browser and relay patterns written and
their flagship fences transcribed, so `npm run test:guides` is green and the guide is true.

## Context

**Design record.** `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\design-reconciliation.md`
("Decisions made on the user's behalf" — the removals and the `stream: true` ruling) and
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\plan.md` § "The ruled contract" →
"Ollama after the rebuild".

**Evidence.** The source you document: `src/core/OllamaProvider.ts`, `src/core/types.ts`,
`src/core/constants.ts`, `src/core/helpers.ts`, `src/core/factories.ts`, `src/core/index.ts`; the
reports `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\o2-report.md` (its
`Removed exports` list) and `o3-report-2.md` (the relay cases) in that folder; the tests
`tests/src/core/**` and `tests/service/**`.
The base's guide, which this guide points at rather than restates:
`C:\Users\mikes\WebstormProjects\agent\guides\agent.md` §§ Contract (the base, the shapes, the
relay) and Patterns ("Writing a provider for a new wire", "Relaying a browser provider through
your own server"). The Orchestrator's Chromium receipt for the browser claim:
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\b1-receipt.md` (taken 2026-09-14
in Chrome 148 against the built `@orkestrel/agent` at `5d288d7`: the core closure loads as ES
modules, and a browser-side `RelayProvider` round-trips, cancels with a partial, and receives a
refused token as `ProviderError` `HTTP` 401).

**The guide as it stands.** `guides/ollama.md`: § Surface (`:14`) and its table (`:60-88`), the
paragraph on the wire leaves (`:88`) and on `id`/`name`/`format` (`:90`); § Methods (`:92`) with
the two-row `OllamaProvider` table; § Contract (`:105`) clauses 1–16 — clause 2 (imports and no
cycle) names the `NDJSONParser`, the `Timeout`, and the guards; clause 3 (the wire protocol) says
`generate` sends `stream: false`; clause 5 (non-stream vs NDJSON) describes two paths; clauses
10–12 (deadline, abort, transport seam) describe mechanics the base now owns; clause 13 (`format`);
clause 15 (live tests); clause 16 (method bijection); § Patterns (`:126`): `createOllama` +
`generate`, bounding with budget + timeout, "Routing through your own server (obfuscated tokens)"
(`:169`, the transparent wire proxy — stays), "Context framing", "Narrowing HTTP errors with
`isOllamaHTTPError`" (`:211`, its subject is removed), Practices; § Tests (`:248`); § See also.
The fences at `:46-47` write to `process.stdout`/`process.stderr`, which a core-face guide cannot
assume. `tests/guides.test.ts` is authored (O1 rewrote its `@src/server` import).

**Law.** `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md` (§ Writing);
`C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\documentation.md`, `writing.md`,
`tests.md` (§ Cross-cutting proofs), `names.md`, `typescript.md` (TSDoc voice). Skill:
`C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-harden-package\SKILL.md` step 10.

**Host.** Windows 11, Git Bash. Never `npm install`, `git add`, `commit`, `stash`, `checkout`,
`restore`, `reset`, `clean`, or `git mv`. Never edit a vendored file. No daemon is assumed.

**Measurements.** The ollama HEAD is `dcb64fe` (O2, O3, and O2-fix committed 2026-09-14),
tracked tree clean; `node_modules/@orkestrel/agent` holds the tarball packed from agent
`5d288d7` (`--no-save`; the declared range `^0.0.21` untouched). Gates at that commit:
`format:check`, `lint:check`, `check`, `build` exit 0; `test:src:core` 4 files; `test:setup`
3 files; `test:conformance` 17 tests; the live `test:service` passed in full with the daemon warm
(`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\o3-service.log.txt`, 12 files,
61 tests). `npm run test:guides` fails on the guide-side drift only: 8 failed, 14 passed at O3
(`o3-gates.log.txt` carries every failing name; re-run it first and record the names). The built
barrel's export names, one per line from `dist/src/core/index.d.ts`, are at
`C:\Users\mikes\WebstormProjects\scaffold\tmp\units\o4-exports.txt`.

**Control identifiers.** None.

**Standing conditions.** The API Extractor notice is not a defect.

## Transformation

1. **Surface.** Remove the rows for every export O2 removed (at least `OllamaResponse`,
   `OllamaHTTPError`, `isOllamaHTTPError`, `OllamaHTTPErrorOptions`, `MAX_ERROR_BODY_LENGTH`,
   `DEFAULT_PROVIDER_TIMEOUT`, `buildResult`, `joinThinking`, `parseBody`); add `OLLAMA_CHAT_PATH`;
   change the `OllamaProvider` class row's `Shape` cell to the interface it implements
   (`AgentProviderInterface`) and its Summary to the class's doc-block paragraph; update the
   `OllamaOptions` row's shape to the members it declares plus the inherited ones as the
   documentation rules render inheritance (read how `agent.md` renders `RelayProviderOptions`,
   which also extends `ProviderOptions`, and match it). Rewrite the wire-leaves paragraph: the
   leaves are `mapMessages` and the `extract*` set; the mechanics live in `@orkestrel/agent`.
2. **Methods.** The `OllamaProvider` table lists exactly the call-signature members of
   `AgentProviderInterface`: `generate`, `stream`, `frame`, `body`, `read`, `finish`, each
   Summary equal to its doc-block paragraph.
3. **Contract.** Rewrite clause 2 (imports: the base, the contract types, and the error from
   `@orkestrel/agent`; `createNDJSONParser` from `@orkestrel/ndjson`; the guards from
   `@orkestrel/contract`; nothing from `@orkestrel/timeout` any longer if O2 dropped it — read the
   manifest and the source); clause 3 (the body: `stream: true` always, `think`, `keep_alive`,
   `options`, `format` from a per-call `schema`, function tools; a non-OK status is the base's
   `ProviderError` with code `HTTP` and the status); clause 5 (one NDJSON path; `finish` recovers
   an unterminated final line); clauses 10–12 become one clause stating what the base owns and
   pointing at `agent.md` for the deadline, the cancellation rule, the transport seam, and the
   bounded error read; clause 13 (`format`) stays; clause 15 (tests) names the moved paths and the
   relay suites; clause 16 (method bijection) names the six members. Add a clause for the
   browser: the package publishes a core face, host independence is proven by the core scope's
   typecheck and the bound `fetch` receiver, and the Chromium receipt the campaign records
   (`b1-receipt.md`, taken against the base this provider extends).
4. **Patterns.** Rewrite the two lead fences at `:22-47` without `process.stdout`; keep "Routing
   through your own server (obfuscated tokens)" as the transparent wire proxy and say what it
   cannot do (hide the vendor, switch vendors); add "Relaying through your own server" — the
   browser fence `createRelayProvider({ url, parser: createNDJSONParser, headers })` from
   `@orkestrel/agent` and `@orkestrel/ndjson`, the server fence `createRelay({ provider: createOllama({ model }), authorize })`
   mounted on an `@orkestrel/router` dispatcher — and "Running in the browser" (the same
   `createOllama` call in a browser module, the `url` pointing at the daemon or the proxy);
   replace "Narrowing HTTP errors with `isOllamaHTTPError`" with a short pattern narrowing with
   `isProviderError` and `error.code`/`error.status` imported from `@orkestrel/agent`. Every fence
   imports through published specifiers.
5. **Tests section.** List every project and file that now exists, including
   `tests/service/relay.test.ts` and the relay cases in `tests/src/core/integration.test.ts`.
6. **`tests/guides.test.ts`.** Transcribe each changed or new flagship fence and assert the
   values its comments claim, against a canned transport for the hermetic ones; keep every
   existing assertion; never weaken the gate.
7. **`README.md` and `guides/README.md`.** The pitch equals the tagline (rewrite the tagline if
   the package's one-line description changed — it is a core-face provider on the shared base);
   the concept index and the toolchain paragraph name the runtime dependencies as they now stand.
8. Run `npm run format:check`, `npm run lint:check`, `npm run test:guides`, and
   `npm run test:src:core` (read-only), and fix only what the guide work broke.
9. **Stale TSDoc in `src/core/helpers.ts` (audit O2-R1, finding F1).** Five doc lines describe
   the deleted non-stream path: four `@param record` lines read "One parsed `/api/chat` record —
   a non-stream body or an NDJSON line", and the `@remarks` on `extractUsage` names "the
   non-stream body and the stream's `done: true` line". Rewrite each to the NDJSON record alone
   (`@param record - One parsed `/api/chat` NDJSON record`; the remark names the `done: true`
   line only). These lines ship in the package declaration, so the guide's Summary cells that
   quote a description paragraph must still equal the source after the edit.

## Unknowns

- None the Orchestrator knows of; the Chromium receipt exists (see Evidence) and the browser
  clause names it.

## Scope

**Owned.** `guides/ollama.md`, `guides/README.md`, `README.md`, `tests/guides.test.ts`, the five
TSDoc lines in `src/core/helpers.ts` that step 9 names, and TSDoc description paragraphs in
`src/core/**` only where a Summary cell cannot otherwise satisfy both parity and the writing rules
(report each such edit).

**Shared (report-only).** None.

**Off-limits.** Every other `src/**` and `tests/**` file, `package.json`, `package-lock.json`,
configuration, the vendored set, `AGENTS.md`, `CLAUDE.md`, `.claude/**`, `scripts/**`, `dist/**`,
`node_modules/**`, the mirrored dependency guides under `guides/` other than `README.md`, and every
file in the `agent` checkout.

**What asserts the state this change ends.** `tests/guides.test.ts` (yours).

**Tools and limits.** Bash for the read-only scripts in step 8 and `test:probe`; never `lint`,
`format`, `build`, `test`, or `test:service`; never install, commit, or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\o4-report.md` and return
the same text: `Touched files` with `git diff --stat`; `Parity` (failing names before, the green
run after, counts); `Clauses`; `Fences`; `Observations`; `Deviation`; `Status`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when a
fence's claimed value does not match what the code returns, when a Summary cannot satisfy both
parity and the writing rules, or when the guide must claim something the tests do not pin. Decide,
record, and carry on from clause numbering, headings, and row order.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run test:guides` exits 0.
3. No removed export is named anywhere in `guides/ollama.md` or `README.md`
   (`grep -n "OllamaHTTPError\|isOllamaHTTPError\|OllamaResponse\|parseBody\|buildResult\|joinThinking\|MAX_ERROR_BODY_LENGTH\|DEFAULT_PROVIDER_TIMEOUT" guides/ollama.md README.md`
   returns nothing); `process.stdout` and `process.stderr` appear in no fence.
4. The Methods table names exactly `generate`, `stream`, `frame`, `body`, `read`, `finish`.
5. `npm run test:src:core` exits 0 at its prior count.
6. No banned term from `writing.md` § Substitutions and no count of a growable set in the touched
   prose.

**Observations, not criteria.** `build`, the whole `test` chain, `test:service`.

## Review evidence

A document and a code change: `git diff --stat` and `git status --porcelain`; the auditor reads
the guide as a consumer would.
