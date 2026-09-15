# Unit U13f — `@orkestrel/ollama`: fix round after audit A13c (the page proof)

Successor to U13e (`tmp/units/U13e-ollama-page-fix-brief.md`; read it, the U13e report
`.orkestrel/campaign/U13e-ollama-page-fix-report.md`, and the chain first). This file carries the
findings A13c reconciled and the Orchestrator's rulings, and wins over any sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/ollama` checkout while this unit runs. Your engine wrote the
chain; GPT-6 Astra audits this round. You run on the host: Edge and the Ollama daemon
(`http://localhost:11434`, `qwen3.5:2b-q4_K_M`) are reachable; run the page suite scoped
(`npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project service
tests/service/page.test.ts`); the Orchestrator takes the authoritative whole-service run after you
exit.

## What A13c found

Analyst (Astra, `.orkestrel/campaign/A13c-audit-analyst.md`): `FAIL 1, 3, 5, 9`, the first two
EXECUTED (the real `Agent → RelayProvider → createRelay → OllamaProvider` chain under a 50 ms
timeout; the installed `BrowserContext` and `CDPClient` against inert protocol frames); checker
(Sonnet, `A13c-audit-checker.md`): `PASS`. Read both before editing.

## Carriers (close every one; each names its ruling)

1. **A partial run never retries (analyst 1).** `acceptPageAttempt` (`tests/setupServer.ts:1256`)
   answers `false` for a run with no tool calls, and a timed-out run (`result.partial === true`,
   `content: "starting"`) has no tool calls — so an interrupted run is retried as a sampling miss,
   and the accounting at `tests/service/page.test.ts:246` accepts it. Ruling: the predicate throws
   for a partial outcome before it tests tool selection (an interrupted run is an infrastructure
   reading another launch cannot clear — the deadline is the attempt's own); only a COMPLETED
   answer without a dispatched tool answers `false`. Extend the hermetic proof over inert records
   with a partial outcome (escapes) and keep the completed-miss case (retries). Red first.
2. **The attempt bound covers the dependency's real operations (analyst 3).** `PAGE_BOUNDS`
   counts `browser.create()` as one `command`, but the installed `BrowserContext` awaits nine
   separately bounded CDP commands during creation (`Target.createTarget`, `Target.attachToTarget`,
   `Page.enable`, `Runtime.enable`, `Page.getFrameTree`, `Target.setAutoAttach`,
   `Page.setInterceptFileChooserDialog`, `Browser.setDownloadBehavior`, `Network.enable` —
   `node_modules/@orkestrel/browser/dist/src/core/index.js` near `:7196-7322`), so an admissible
   schedule reaches 119 000 ms against the 110 000 ms case. Ruling: one attempt deadline governs
   the whole acquisition-and-observation lifecycle. Read the installed `@orkestrel/browser`
   declarations for what a command, a context, and a navigation accept (`timeout` members at
   `dist/src/core/index.d.ts:211,1554,1574,1859,2340,2968,3006`; look for a `signal` member too);
   then either (a) hand every browser operation a deadline derived from ONE attempt signal
   (`AbortSignal.timeout(PAGE_BOUNDS.attempt)`) that the acquisition, the readiness wait, every
   read, and the release observe, so no sum is load-bearing, or (b) if the installed surface
   accepts only per-command `timeout` values, race the whole attempt against that one signal and
   release the session on expiry, with the per-command values as inner shares. Record which, and
   make the `PAGE_BOUNDS` proof assert the property the code now has (the attempt allowance is
   the one bound; `attempt ≤ case`; `attempts × attempt ≤ budget ≤ retry`) instead of a sum over
   operations the dependency does not expose. Add a live control in the page suite recorded red:
   an attempt allowance too small to launch fails with the attempt's own deadline error, not a
   CDP timeout, and the session is released (no stranded browser).
3. **The prose is true (analyst 5).** `guides/ollama.md:124` (contract 13's retry rule: a partial
   run escapes; only a completed miss retries) and `:359` (the bounds sentence: one attempt
   deadline, not "every allowance" summed). Say what the code does after carriers 1 and 2.

## Rulings that stand from A13c

The receipt pins, the runtime operation table, the recorder sentence, `acceptPageAttempt`'s name
and its `PAGE_TOOL.name` reading, and the scope are closed.

## Context, law, host, and bench

As U13e. Installed primitives: `@orkestrel/test` (`retryUntil`, `createTeardown`,
`waitForCondition`, `waitForAbort`, `requireValue`), `@orkestrel/browser` 0.0.16 (read the
declarations before choosing (a) or (b)), `@orkestrel/contract`.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/service/page.test.ts`,
`guides/ollama.md`. **Off-limits.** Everything else.

## Acceptance criteria

1. `npm run lint:check`, `check`, `format:check` exit 0.
2. `npm run test:setup` exit 0 with the carrier 1 and 2 hermetic pins red first.
3. `npm run test:guides` exit 0.
4. The page suite green on the host with the carrier 2 live control recorded red; per-case timings
   reported.
5. Only owned files changed.

## Output

U13e's Output shape, plus the (a)/(b) ruling with the declaration lines read.
