# Unit U13g — `@orkestrel/ollama`: the attempt deadline bounds completion (fix round after audit A13d)

Successor to U13f (`tmp/units/U13f-ollama-page-fix-brief.md`; read it, the U13f report
`.orkestrel/campaign/U13f-ollama-page-fix-report.md`, and the chain first). This file carries the
A13d findings and the Orchestrator's rulings, and wins over any sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/ollama` checkout while this unit runs. Your engine wrote the
chain; GPT-6 Astra audits this round. You run on the host (Edge, the daemon at
`http://localhost:11434`, `qwen3.5:2b-q4_K_M`); run the page suite scoped; the Orchestrator takes
the authoritative whole-service run after you exit.

## What A13d found (`.orkestrel/campaign/A13d-audit-analyst.md`; the checker passed)

- **2 (executed against the installed `BrowserContext`/`CDPClient` with inert frames):** the race
  rejects at expiry, but `boundPageAttempt` then AWAITS the acquisition that lost (`setupServer.ts`
  near `:1163`) and awaits the release outside the race (`:1157`), so expiry does not bound
  completion — with a 50 ms deadline the acquisition kept issuing CDP commands and settled at
  284.6 ms. A second interleaving: the observation completes before expiry, the release crosses
  expiry, and the helper returns success without reading the expired signal.
- **3:** the `PAGE_BOUNDS` proof's inequalities do not describe an enforced bound while 2 holds.
- **4:** U13f's declaration table read only the CORE entry. The installed browser's SERVER entry
  declares `BrowserOptions.signal` (`node_modules/@orkestrel/browser/dist/src/server/index.d.ts:431`;
  the implementation combines it with internal cancellation at `dist/src/server/index.js:1083`):
  an already-aborted signal makes `connect()` reject with `Connection aborted` and launches no
  process. Page-command interfaces still carry no signal.
- **5, 9, 10:** the prose over-promises; the chain stays open until completion is bounded.

## Carriers (close every one; each names its ruling)

1. **The connection is cancelled through the supported signal (A13d 4).** `createPageSession`
   passes the attempt signal as `BrowserOptions.signal` to `createBrowser` (read the server
   declaration and its remarks first), so an expiry during launch or connect cancels the
   acquisition at the dependency rather than abandoning it. Correct the (a)/(b) ruling in the
   page-proof header and the report: the connection observes the signal; page commands are raced.
2. **Completion is bounded on every path (A13d 2, 3).** Ruling: an attempt ends within
   `attempt + release`, where `release` is a new named share. After expiry, never await an
   unbounded acquisition or release: race the losing acquisition's settlement and the
   `session.destroy()` release against the `release` share, and when either outlasts it, reject
   with the attempt error naming the stranded resource (the browser is then the Orchestrator's
   residue reading, not a hang). On the success path, read the signal after the observation and
   after the release: an attempt whose release crossed expiry is a failure that names the release,
   not a success. `PAGE_BOUNDS` gains `release`; `attempt + release ≤ case`;
   `attempts × (attempt + release) ≤ budget ≤ retry`.
3. **The proofs bind elapsed completion (A13d 2, 3, 9).** Hermetic (`tests/setupServer.test.ts`):
   drive `boundPageAttempt` with an acquisition that parks (an acquire function that never
   resolves, or a loopback listener that accepts TCP and never speaks CDP — the analyst's harness
   shape) and assert the rejection arrives within `allowance + release` with the attempt error,
   and that the release ran; a release that parks past its share rejects naming the release;
   an observation that completes with the release crossing expiry rejects rather than resolving.
   Live (`tests/service/page.test.ts`): extend `ends an over-long attempt on its own allowance and
   leaves no browser behind` (or add beside it) to assert the elapsed time of the whole call
   against `allowance + release`, with the delayed-acquisition and the expiry-during-release
   interleavings each recorded red under a mutation (record both readings verbatim).
4. **The prose states the measured guarantee (A13d 5).** `guides/ollama.md:124` (contract 13):
   the attempt ends within `attempt + release`; the connection observes the signal; page commands
   are raced; a release that outlasts its share is reported, never awaited. `:359` (the bounds
   bullet) and `:368` (the control) say what the proofs now assert.

## Rulings that stand

`acceptPageAttempt`'s classification (A13d 1), the collision readings and `expirePageAttempt`'s
translation over `waitForAbort` (A13d 6), the scope (A13d 7), `AbortSignal.timeout` for the
one-shot deadline (A13d 4 agrees).

## Context, law, host, and bench

As U13f. Installed: `@orkestrel/browser` 0.0.16 — READ BOTH ENTRIES (`dist/src/core/index.d.ts`
and `dist/src/server/index.d.ts`) before writing; `@orkestrel/test` (`waitForAbort`,
`waitForCondition`, `createTeardown`, `retryUntil`, `createLoopback`, `reservePort`); the
Orchestrator's residue reading is `.orkestrel/campaign/K-edge-residue.txt`.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/service/page.test.ts`,
`guides/ollama.md`. **Off-limits.** Everything else.

## Acceptance criteria

1. `npm run lint:check`, `check`, `format:check` exit 0.
2. `npm run test:setup` exit 0 with carrier 3's hermetic pins red first.
3. `npm run test:guides` exit 0.
4. The page suite green on the host with carrier 3's live readings recorded red under the named
   mutations; per-case timings reported; no headless Edge left (`Get-CimInstance Win32_Process
   -Filter "Name='msedge.exe'" | Where-Object { $_.CommandLine -like '*--headless*' }` — report it).
5. Only owned files changed.

## Output

U13f's Output shape, plus the corrected declaration table (both entries) and the elapsed-time
readings of the live control.
