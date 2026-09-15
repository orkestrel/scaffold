# Unit U13h — `@orkestrel/ollama`: the A13e findings (the cancellation ruling narrowed, the proofs bound, the prose homed)

Successor to U13g (`tmp/units/U13g-ollama-page-fix-brief.md`; read it, the U13g report
`.orkestrel/campaign/U13g-ollama-page-fix-report.md`, and the chain first). This file carries the
A13e findings and the Orchestrator's rulings, and wins over any sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/ollama` checkout while this unit runs. Your engine wrote the
chain; GPT-6 Astra audits this round. You run on the host (Edge, the daemon); run the page suite
scoped; the Orchestrator takes the authoritative whole-service run after you exit.

## What A13e found

Analyst (`A13e-audit-analyst.md`): claim 1 EXECUTED — `BrowserOptions.signal` does not cancel every
phase inside `connect()`: the dependency races it at discovery, the port-free check, the launch,
and both `client.connect()` sites, but the target listing (`Target.getTargets`,
`node_modules/@orkestrel/browser/dist/src/server/index.js:1398`) is unraced, so a connection held
there resolved 143.6 ms after the abort; the outer race still bounded the composed attempt (claim
2 CONFIRMED: expiry reported and the session released once in 165.7 ms). Claim 3: the hermetic
ceilings (1 000 ms for a 150 ms nominal) admit scheduling slack the prose does not state. Claim 6:
contract 13's "cancels a launch or connect at the dependency" over-claims. Reviewer
(`A13e-audit-reviewer.md`): the shape CONFIRMED; required O1–O3, recommended O4, carry-forward
O5–O6, referrals R1–R2. Checker (`A13e-audit-checker.md`): PASS. The Orchestrator's probe P15
(`P15-timer-probe.md`): an armed `AbortSignal.timeout` is unref'd on Node 24 — nothing to clear.

## Carriers (close every one; each names its ruling)

1. **The cancellation ruling is exact (analyst 1, 6).** Say what the dependency does: the
   connection signal cancels discovery, the port-free check, the launch, and the client connect;
   the target listing inside `connect()` and every page command after it take a per-call `timeout`
   and are bounded by the attempt race, never by the signal. State it in `createPageSession`'s
   remarks (replacing the over-reach), `expirePageAttempt`'s and `boundPageAttempt`'s remarks where
   they describe the route, the page-proof header, and contract 13. Never claim the signal ends the
   whole connection.
2. **The ceilings state their slack (analyst 3).** The hermetic proofs assert elapsed completion
   under a ceiling well above the nominal shares; name the slack as one constant in
   `tests/setupServer.test.ts` (the worker's scheduling allowance) with a sentence saying the
   property proved is timer-bounded completion, not the nominal sum, and assert `nominal ≤ elapsed
   < nominal + slack` where the nominal is known. The live controls' `allowance + release` ceilings
   already state the guarantee; leave them.
3. **The count sentence goes (reviewer O1)**: `tests/setupServer.ts` near `:1043` — delete "It
   reaches three places."; the sentences that follow name the members.
4. **`PAGE_TOOL` is attributed to its module (reviewer O2)**: strike it from the
   `tests/setupServer.test.ts` bullet (`guides/ollama.md` near `:359`), name it in the
   `tests/setup.test.ts` bullet (near `:358`), and move the `describe('PAGE_TOOL')` block from
   `tests/setupServer.test.ts` to `tests/setup.test.ts` (`.claude/rules/tests.md` resolves each
   setup proof against its sibling module).
5. **The completeness claim is honest (reviewer O3)**: `tests/setupServer.ts` near `:1039-1042`
   adds that the fixture start (`createPageFixture`) and the port reservation (`reservePort`) take
   no share of their own and observe no signal; the attempt race is their only bound.
6. **Contract 13 states the invariant once (reviewer O4)**: reduce `guides/ollama.md:124` to the
   guarantee in one or two sentences (each attempt ends within its allowance plus its release
   share; `tests/service/page.test.ts` and `PAGE_BOUNDS` state the mechanism); the mechanism stays
   in the TSDoc and the `:368` bullet.
7. **The cause chain is asserted (reviewer R1)**: the hermetic proofs assert the composed error is
   an `Error` whose `cause` is the attempt failure (parked release) and whose `cause` is the
   signal's reason (crossed release); `describeFailure`'s own proof already covers the message.
8. **The timer ruling is recorded (reviewer R2, P15)**: `expirePageAttempt`'s or
   `boundPageAttempt`'s remarks state that an armed `AbortSignal.timeout` is unref'd on Node and
   holds neither a worker nor the process, so nothing is cleared (the Orchestrator's P15 reading is
   the evidence; cite it as "measured on Node 24").
9. **The carry-forwards (reviewer O5, O6)**: rename `PAGE_BOUNDS.attempts` to `launches` (the
   word contract 13 uses; update every reader and the proof); move the `EXPIRED` matrix from
   `tests/service/page.test.ts` to `tests/setupServer.ts` beside `PAGE_BOUNDS`, renamed for what it
   holds (its members include a delay, not only expiries), exported and proved for its containment
   in the shares it drives.

## Rulings that stand

The helpers' shape and names (reviewer 7; analyst 7), `AbortSignal.timeout`, the bounded release
mechanism (analyst 2), the recorder split, the receipt pins, `acceptPageAttempt`.

## Context, law, host, and bench

As U13g. Installed: `@orkestrel/browser` 0.0.16 (both entries — the analyst's line references),
`@orkestrel/test`, `@orkestrel/contract` (`isError`).

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setup.test.ts` (the moved
`PAGE_TOOL` proof only), `tests/service/page.test.ts`, `guides/ollama.md`. **Off-limits.**
Everything else (`tests/setup.ts` stays as it is).

## Acceptance criteria

1. `npm run lint:check`, `check`, `format:check` exit 0.
2. `npm run test:setup` exit 0 with carriers 2 and 7 red first (record the readings).
3. `npm run test:guides` exit 0.
4. The page suite green on the host; per-case timings reported; no headless Edge left.
5. Only owned files changed.

## Output

U13g's Output shape.
