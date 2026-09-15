# Unit O6 — the ollama guide made true where audit round O4-R1 broke it

The Orchestrator fills § Measurements at dispatch, after the agent guide rounds close and the
agent tarball is repacked into this checkout.

## Role and engine

`implementer` on Claude Opus 5, native, with Read, Grep, Glob, Edit, Write, and Bash. Perform the
assignment directly and spawn nothing. You are the sole writer in
`C:\Users\mikes\WebstormProjects\ollama` for the life of this unit. The auditor is the Astra
`analyst` (objective lane, executed probes) plus a `checker`.

## Objective

Close claims 3, 4, 7, and 10 of audit round O4-R1 (`o4-audit-objective.md`, with the reviewer's
verdict `o4-audit-subjective.md` where it adds to them) so every fence a consumer copies runs as
written, every sentence a consumer acts on states what the code does, and the mirrored agent guide
carries the contract this guide delegates to.

## Context

**Record.** `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\o4-audit-objective.md`,
`o4-audit-subjective.md`, `o4-audit-mechanical.md`, `design-reconciliation.md` § "Audit round
O4-R1". Product truth: `src/core/**` at HEAD, its tests, `b2-receipt.md`, and the installed
`@orkestrel/agent` (repacked from agent commit `610a567`).

**Law.** `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md` (§ Writing);
`C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\documentation.md` (parity; a vendored
dependency guide is a mirror refreshed from fetched bytes, never rewritten; "falsify a prose
claim"), `writing.md`, `tests.md` § Cross-cutting proofs.

**Host.** Windows 11, Git Bash. Never `npm install`, `git add`, `commit`, `stash`, `checkout`,
`restore`, `reset`, `clean`, or `git mv`.

**Measurements.** The ollama HEAD is `655ebec` (the mirror refresh committed 2026-09-14 over the
cleanup `2178171`), tree clean apart from `node_modules`, where the tarball packed from agent
`610a567` is installed (`--no-save`; `../scaffold/.orkestrel/campaign/a4-2-receipt.md`).
`guides/agent.md` was refreshed before dispatch as a byte copy of the agent checkout's guide at
`610a567` (`o6-mirror-receipt.md`): it carries the base, the relay, and the two titled relay
halves under "Mounting the relay on your server" and "Reaching the relay from the browser".
Gates at `2178171` (`o5-gates.log.txt`, `v2-verdict-1.md`): every project green; `test:guides`
32 tests; `test:src:core` 4 files / 99 tests; `test:setup` 96 tests.

## Items

**M1 — the mirrored agent guide (claim 3).** The Orchestrator refreshes `guides/agent.md` from the
agent checkout's `guides/agent.md` at `610a567` as a byte copy before dispatch (the scaffold's
`mirror` verb fetches the same file from the repository once those commits are pushed). Verify
the mirror carries `AgentProvider`, `AgentProviderInterface`, `ProviderOptions`,
`ProviderError`, `RelayProvider`, and `createRelay`, and that every pointer this guide makes into
it (the base-ownership clause, the relay pattern) resolves to a heading that exists; fix the
pointers, never the mirror.

**M2 — the streaming fences (claim 4).** In the guide's driven-stream fence and the README's
streaming sample, and in their transcription in `tests/guides.test.ts`, make the settled result
authoritative: the fences no longer claim that joined content deltas equal the final content;
they say the settled `content` is the answer and the deltas are what arrived. Add to the
transcription the reclassification case the analyst executed (records `reasoning` then
`</think>answer` fold to content `answer` and thinking `reasoning`, so the joined deltas differ)
beside the plain case, asserting both.

**M3 — counts (claim 7).** Rewrite "one entry" in the guide's contract prose and "two content
spans, one reasoning span" in `tests/guides.test.ts` so no growable set is counted; name the
members instead.

**M4 — the relay server fence (claim 10).** Rewrite "Relaying through your own server" as a server
half that runs: `createServer` from `@orkestrel/server` in front of the `@orkestrel/router`
dispatcher that mounts `createRelay` over `createOllama({ model })`, started with `start` and
stopped with `stop`, its `url` the value the browser half dials; the browser half is
`createRelayProvider({ url, parser: createNDJSONParser, headers })` with real `fetch`. State
in prose what the runtime adapter does (turns the runtime's request into a `Request`, hands the
dispatcher's `Response` back, aborts the inbound signal on disconnect) and that `@orkestrel/server`
supplies it. Transcribe both halves: the server half through the real server fixture the setup
module already provides, the browser half against it.

**M5 — the rest of the touched prose.** Review the paragraphs O4 touched against `writing.md`
once more, as the analyst directs, and fix what you find, naming each fix.

**M6 — possessivized tokens (reviewer, claim 7).** At the two sites the reviewer cites (clause 11
and § Context framing), write "the `AgentContext` build cascade", never a possessive on a token.

**M7 — the browser clause's receipt (reviewer F1, F2).** Replace the sentence citing "the
campaign's Chromium receipt" with this package's own reading, checkable by date: on 2026-09-14
in Chrome 148, the built `@orkestrel/ollama` core entry and its `@orkestrel` closure loaded as ES
modules; `OllamaProvider` drove the local daemon directly for a settled answer with usage counts
and a mid-stream cancel returning `ProviderAbortError` with its partial; and the same browser
reached the daemon through a `createRelay` server, a wrong bearer arriving as `ProviderError`
`HTTP` 401. Cite no campaign and no file the reader cannot open.

**M8 — the Tests bullets (reviewer F3, F4).** Restate the `tests/setup.test.ts` bullet from that
file's own header (it also proves the transports, the scripted agent stream, the driver, and
`env` from `tests/setupServer.ts`, and `tests/setup.ts` exports no guard); restate the
`tests/setupServer.test.ts` bullet so "real loopback sockets" covers the proxy and the relay
server only, the transport fixtures drive in-memory responses, and the shared wire tables are
named.

**M9 — present tense (reviewer F5).** Remove "any more" and "after the rebuild" from the timeout
sentences in clause 2 and `guides/README.md`; state the present fact only.

**M10 — the inherited option keys (reviewer F6).** Under the Surface table, one sentence naming
what `ProviderOptions` contributes to `OllamaOptions` (`timeout`, `fetch`, `headers`, `format`)
with the `agent.md` link.

**M11 — undeclared identifiers (reviewer F7).** In the relay browser fence and the routing fence,
declare `messages` and `abort` or mark their omission with a comment in the sample's language.

**M12 — the `tool_calls` condition (reviewer F9).** Clause 3 says `tool_calls` is added on a turn
that replays them, without "assistant" — `mapMessages` keys on `calls`, never on `role`.

**M13 — the imports clause (reviewer F10).** Split clause 2 so the import list names only what
`src/core` imports, and a second sentence says the provider errors and `ToolDefinition` are
owned by their packages and reached through the base.

**M14 — the README fence's claim (reviewer F12).** After M2, the README streaming sample carries
no `// true` equality claim; where it keeps a value comment, `tests/guides.test.ts` guards the
README line beside the guide's.

## Scope

**Owned.** `guides/ollama.md`, `README.md`, `guides/README.md` (M9 only), `tests/guides.test.ts`,
and `tests/setup.ts` or `tests/setupServer.ts` for additions only if a transcription needs a
fixture the files lack (report it). `guides/agent.md` is the Orchestrator's refreshed mirror:
read it, never edit it.

**Off-limits.** Everything else, including `src/**`, every other `tests/**` file, `guides/README.md`,
`package.json`, `package-lock.json`, configuration, the vendored set, `node_modules/**`, and every
file in the `agent` checkout.

**Tools and limits.** `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run test:guides`, `npm run test:src:core`, `npm run test:setup`, `npm run test:probe`
(read-only); never `lint`, `format`, `build`, `test`, or `test:service`; never install, commit,
or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\o6-report.md` and return
the same text: `Touched files` with `git diff --stat`; per item M1–M5, the change in one line;
`Fences` (each transcription and the assertion it carries); `Scoped validation` with counts;
`Observations`; `Deviation`; `Status` (`git status --porcelain` verbatim).

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when a
fence's claimed value does not match what the code returns, when a pointer into the mirror has no
heading to resolve to, or when a file outside Owned must change. Decide, record, and carry on from
wording and sub-heading names.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:guides` exits 0; `npm run test:src:core` and `npm run test:setup` stay at their
   prior counts.
3. M2: `grep -n "equal\|equals" guides/ollama.md README.md` shows no sentence claiming joined
   deltas equal the settled content; the reclassification case is transcribed and asserted.
4. M4: the server fence names `createServer`, `start`, and `stop`; both halves are transcribed.
5. M3 and M5 by inspection; no banned term and no count of a growable set in the touched prose.
