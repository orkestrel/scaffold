# Unit U13e — `@orkestrel/ollama`: fix round after audit A13b (the page proof)

Successor to U13c (`tmp/units/U13c-ollama-page-fix-brief.md`; read it, U13b's brief, and the U13c
report `.orkestrel/campaign/U13c-ollama-page-fix-report.md` first). This file carries the findings
A13b reconciled and the Orchestrator's rulings, and wins over any sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/ollama` checkout while this unit runs. Your engine wrote U13b and
U13c; GPT-6 Astra audits this round. You run on the host: Edge and the Ollama daemon
(`http://localhost:11434`, model `qwen3.5:2b-q4_K_M`) are reachable, so the page suite is yours to
run scoped (`npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project service
tests/service/page.test.ts`); the Orchestrator takes the authoritative whole-service run after you
exit.

## What A13b found

Analyst (Astra, `.orkestrel/campaign/A13b-audit-analyst.md`): `FAIL 1, 2, 5, 6, 10, 11, 14`, each
with an executed control in the setup project or a source reading; checker (Sonnet,
`A13b-audit-checker.md`): `PASS` with 6 referred. Read both before editing.

## Carriers (close every one; each names its ruling)

1. **Only a sampling miss retries (analyst 1).** The installed `retryUntil` catches the producer's
   exceptions (`node_modules/@orkestrel/test/dist/src/core/index.js:259` — read the declaration
   and the source), so a fault guard that throws inside the producer is retried, and a serialized
   `PageOutcome.failure` (an HTTP 500 from the relay, a fixture fault) reads as the model not
   selecting the tool. Ruling: the attempt producer never throws — it retains every observation and
   the classified failure on the attempt; the PREDICATE (whose exceptions escape `retryUntil`)
   throws for an acquisition, teardown, evaluate, or outcome failure on the first attempt and
   answers `false` only for the one retry-worthy reading, the model answering without dispatching
   the tool. Put the classification in an exported `tests/setupServer.ts` helper over the attempt
   record (name it `{verb}{Noun}` for what it decides; confirm no installed export by that name)
   and prove it hermetically in `tests/setupServer.test.ts` with inert attempt records: a 500
   outcome escapes, a fixture fault escapes, an evaluate rejection escapes, a sampling miss
   retries, a dispatched tool passes. Red first with the analyst's control (an HTTP 500 outcome
   followed by success passes today).
2. **The receipt pins hold on both wires (analyst 2).** `tests/service/page.test.ts` near `:262-288`:
   assert the receipt is ABSENT from daemon request 0 as it already is for the relay's, and pin
   `dispatched.turn === 0`. Red first with the analyst's control (a receipt already present in
   daemon request 0 passes today).
3. **One lifecycle bound (analyst 5).** `tests/setupServer.ts` near `:1015,1024,1026` gives
   connection, navigation, and readiness separate allowances whose admissible sum
   (29 000 + 29 000 + 44 000 ms) exceeds the 90 000 ms case bound while each stays within its own,
   and the `PAGE_BOUNDS` proof (`tests/setupServer.test.ts:631-640`) counts one `launch`. Ruling:
   bound the whole acquisition-and-observation lifecycle of one attempt under a single allowance
   the case bound contains, derive each inner allowance from it (or run them under one deadline
   signal), and make the ordering proof enumerate every allowance an attempt can spend so the
   arithmetic it asserts is the arithmetic the code runs. Red first: the proof must fail against
   the current table.
4. **The operation table is proven at runtime, not scanned (analyst 6, 10).** `scanPageOperations`
   (`tests/setupServer.ts:1191`) is a second source analyzer (`AGENTS.md` § Project model), and the
   analyst's control showed it missing an operation moved into a template literal. Ruling: delete
   it and its tests; the page suite asserts the served page's runtime operation table in the real
   browser (`readOutcome` over an evaluate that lists the table's own keys) against the expected
   set, and the hermetic `PAGE_DOCUMENT` proof keeps only an honest presence guard, worded as a
   presence guard.
5. **The guide sentence names the right recorders (analyst 11).** `guides/ollama.md:368`: the
   browser log, the Resource Timing drain, and the fixture record report the request; the page
   error recorder and the console recorder report the fault. Say that, and nothing the tests do
   not assert.

## Rulings that stand from A13b

`createTeardown`, `readOutcome`, `rootToPath`, `PAGE_OPTIONS`, the `null` removal, the recorder
certification, the direct prompt, contract 13's `ProviderError` clause, and the cancellation
attribution are closed. The checker's citation note (`:1039,:1062`) needs no change.

## Context, law, host, and bench

As U13c. Installed primitives: `@orkestrel/test` (`retryUntil`, `createTeardown`, `waitForCondition`,
`waitForEvent`, `requireValue`, `captureError`), `@orkestrel/browser` 0.0.16, `@orkestrel/contract`;
read each surface before declaring a helper.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/service/page.test.ts`,
`guides/ollama.md`. **Off-limits.** `tests/setup.ts`, `tests/setupService.ts`,
`tests/setupService.test.ts`, `src/**`, `package.json`, `package-lock.json`, the `scaffold repair`
set, `guides/agent.md`, `dist/**`, every other file.

## Acceptance criteria

1. `npm run lint:check`, `check`, `format:check` exit 0.
2. `npm run test:setup` exit 0 with the carrier 1, 3, and 4 pins red first.
3. `npm run test:guides` exit 0.
4. The page suite green on the host with the carrier 2 pins red first; per-case timings reported.
5. Only owned files changed.

## Output

U13c's Output shape: touched files with `file:line`; per-carrier closure; the red and green logs
verbatim; the receipt of the page run; `git status --porcelain` and `git diff --stat HEAD`;
deviation state.
