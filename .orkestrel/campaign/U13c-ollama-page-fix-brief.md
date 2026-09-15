# Unit U13c — `@orkestrel/ollama` page proof: fix round after audit A13

Successor to `tmp/units/U13b-ollama-page-proof-brief.md` (read it first; it stays the brief for
the proof). This file carries the findings A13 reconciled and the Orchestrator's rulings, and wins
over any sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/ollama` checkout while this unit runs. Your engine wrote U13b;
GPT-6 Astra audits this round.

## What A13 found

Three blind lanes on one brief: analyst (Astra) `FAIL 2, 6, 8, 9, 11, 12`; reviewer (Opus)
`FAIL 6, 8, 9, 12; F1–F5; R1–R4`; checker (Sonnet) `FAIL 7, 8, 11, 12`. Every lane confirmed the
receipt itself (the model chose the tool, the page minted the receipt during execution, it came
back through the relay and the daemon into a `partial: false` answer, with the window asserted as
an equality). Read `.orkestrel/campaign/A13-audit-analyst.md`, `A13-audit-reviewer.md`,
`A13-audit-checker.md` before editing. The Orchestrator's authoritative service run is
`U13b-ollama-service-full.log.txt` (66 tests, 62.97 s).

## Carriers (close every one; each names its ruling)

1. **Attempts whose reads throw are never asserted (analyst 2; reviewer 11a).** Retain every
   attempt's observations (browser log slice, fixture records, daemon records, turns) BEFORE any
   page read can throw, and make the retry boundary retry only an observed model-selection miss:
   an infrastructure or accounting failure escapes `retryUntil` and fails the case. Pin the
   feedback to the NEXT request's `role: 'tool'` message on both the relay and the daemon wire
   (not any matching request). Red first: an attempt that issues traffic and then rejects during
   observation must fail the case; a receipt moved to a later request or a non-tool message must
   fail.
2. **Cleanup registered as acquired (analyst 6; reviewer R1).** Use the installed `createTeardown`
   from `@orkestrel/test`: register the fixture's stop the moment it starts, the browser's destroy
   the moment it is constructed; a reservation rejection or a rejecting `browser.destroy()` must
   still stop the fixture. Rule on `browser.destroy()` before `connect()` by reading the installed
   `@orkestrel/browser` declaration and pin it. Pin partial acquisition and teardown failure with
   real resources in the setup project (a fixture that starts and a port reservation that is made
   to fail, a browser double is NOT permitted — use the real `createBrowser` only where the
   service project runs, and in the setup project prove the teardown registry's ordering with the
   real fixture alone).
3. **`readPage` → `readOutcome` (analyst 8, reviewer 8, checker 8, P5d).** Rename the local
   JSON-evaluation helper and its callers; re-run the collision reading yourself
   (`grep -n 'export declare function readOutcome' node_modules/@orkestrel/*/dist/src/*/index.d.ts`
   must be empty). Add its hermetic proof in `tests/setupServer.test.ts` (checker 7) against a
   minimal page-like boundary stub exposing `evaluate` — the subject is the narrowing.
4. **Contract 13 and the `## Tests` bullet (analyst 9, reviewer 9).** Assert the `ProviderError`
   clause (`expect(outcome.failure).toContain('ProviderError')`) or strike the type name; write
   "proving such a window can report one"; re-read the per-attempt sentence against carrier 1 and
   keep only what the assertions earn; the `## Tests` bullet states what the file proves and the
   preconditions it hard-throws on, not the case titles.
5. **The direct case sends a prompt (reviewer F1; analyst 11b).** Pass the smallest prompt that
   exercises a turn, assert its outgoing content inside the daemon's `/api/chat` request, and
   assert the answer by a property of an answer, not by non-emptiness; the control removes the
   prompt.
6. **No `null` sentinels (reviewer F2).** Drop `?? null` in the page's outcome and the guard's
   `!== null` branches; absence is `undefined`.
7. **Certify the error and console recorders (reviewer F3).** Add a page operation that calls
   `console.error` and throws once, and assert in the control case that both recorders report it
   — same session, no extra launch.
8. **`Attempt.relay` (reviewer F4).** Rename to `fixture` and document it as every request the
   fixture served, or filter to `INFERENCE_PATH` at assignment and keep the name; drop the guard
   the misnomer forced.
9. **`readPath` → `resolvePath` (reviewer F5).**
10. **Bound coherence (reviewer R2).** Rule which bound fires first: the per-attempt cost
    (launch + run) times the attempts must fit inside the retry budget, and the retry budget inside
    the case's own timeout; the evaluate timeout must not exceed the case timeout. Set the
    constants so that ordering holds and pin it in the setup proof as a comparison of the
    constants (a test that reddens when the ordering breaks).
11. **The page-document proof (analyst 11c; reviewer 11c).** Keep the substring checks as presence
    guards only and add the assertion that binds: parse the served document, extract the inline
    module's source, and assert the operation names against that source with comments stripped
    (or execute the module's exported operation table in Node if the script can be structured so);
    record which and why.
12. **Verbose capture (analyst 1).** Not yours: the Orchestrator's next authoritative run uses
    `--reporter=verbose` for per-case timings.
13. **The agent guide mirror (reviewer R3).** Not yours: `guides/agent.md` in the agent checkout
    still says no browser test project proves the relay; a later agent docs unit refreshes it and
    the mirror here. Do not touch the mirror.

## Installed primitives

As U13b: `@orkestrel/test` (`createTeardown`, `retryUntil`, `waitForCondition`, `createRecorder`,
`requireValue`), `@orkestrel/test/server`, `@orkestrel/contract`, `@orkestrel/browser` — read the
surfaces before declaring anything; a helper whose job an export does is a defect.

## Scope

**Owned.** U13b's Owned list (`tests/setup.ts`, `tests/setupServer.ts`, `tests/setupService.ts`,
`tests/setupServer.test.ts`, `tests/setupService.test.ts`, `tests/service/page.test.ts`,
`guides/ollama.md`, `tmp/probe/**` transient). **Off-limits.** `src/**`, `package.json`,
`package-lock.json`, the `scaffold repair` set, `dist/**` (built, not edited), `guides/agent.md`,
`guides/tool.md`.

**Baseline.** Dirty with U13b on checkpoint `295fecb`; the daemon is up (`/api/tags` answers);
Edge is the discovered browser.

## Acceptance criteria

1. `npm run lint:check`, `format:check`, `check` exit 0.
2. `npm run test:setup` exit 0 with the new proofs (carriers 2, 3, 10, 11) red first (captured to
   `tmp/probe/U13c-red.log.txt` and `U13c-green.log.txt`, copied verbatim into the report, then
   `tmp/probe/` removed).
3. `npm run test:guides` exit 0 with the rewritten contract 13 and `## Tests` bullet.
4. `npm run build` exit 0.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project service
   tests/service/page.test.ts` exit 0 (observation with per-case timings; the Orchestrator takes
   the authoritative run), with the mutation controls of carriers 1, 5, and 7 recorded red.
6. No local declaration collides with an installed `@orkestrel/*` export (re-run the reading for
   every name you introduce or rename).
7. Only owned files changed.

## Output

U13b's Output shape, plus one line per carrier naming the closing `file:line`, the red/green logs
verbatim, and the bound ordering you set.
