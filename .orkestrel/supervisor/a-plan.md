# Alignment + fixes — the reconciled plan, 2026-08-15

Two blind lanes (planner: subjective; Sol analyst: objective, journal `a-design-sol` archived
beside this) proposed against the complete evidence pack: both Grok sweeps (five compile-break
packages — workflow, mcp, guide, contract, terminal — every break named with its replacement),
the failing-launch probe (a fast launch failure lands in `TaskSnapshot.result` within 30ms), and
the E1 report.

## Reconciliation rulings

1. **Sol's staging adopted** over the planner's bundled raise: raise (deliberately red) →
   source migrations → test/guide migrations → adoption, each independently attributable, one
   writer at a time. The diagnostics from the raise ARE the red proofs the migrations bind to.
2. **Direct imports at consumers for the test adoption** (planner's shape) — no re-export shim
   in `tests/setup.ts`; the F1/F2 fleet pass set the pattern and the no-re-export law governs.
3. **Viewer freshness merges both lanes**: refresh once on current-generation clean stream end
   via one authoritative `inspect`; derive `terminal` from the snapshot; roster is never
   snapshot authority (both lanes independently). The `ApplicationTail.terminal` deletion is
   attempted inside the unit; if the ripple exceeds the owned list the writer stop-reports and
   the field stays with the redundancy recorded (planner's fallback).
4. **Settlement splits in two**: the freshness unit makes the durable result available (Sol's
   root cause: the card refreshes before `unit.settle` and never after EOF); a separate voice
   unit owns the three sentences and the bounded value render (planner's).
5. **Failed-launch voice is browser-first** (probe evidence: the fast failure already reaches
   the snapshot). Sol's core-diagnostics unit (four red-first transport cases in `src/core`) is
   GATED on a pre-probe of the slow-timeout path — the E1 film showed the 120s abort NOT
   landing as a failed task, which contradicts the fast-fail probe and is an open behavioral
   question; and on whether supervisor's `src/` is a published surface.
6. **Middleware prep runs now; the publish is a user checkpoint; nothing else waits on it.**
   The raise holds middleware at ^0.0.9 (installable: 0.0.9 peers are ranges — Sol verified),
   and the post-publish raise is its own two-line unit. Fleet alignment's exit item stays open
   until 0.0.12 or a recorded deferral.
7. **`ApplicationPolicy.agent` regrouping confirmed by both lanes**: `{ model, timeout, keep }`.
8. **`createScratch` NOT adopted** (both lanes): sync/async lifecycle mismatch defeats the
   reuse gate; recorded, not deferred.

## Units and routing ledger

| Unit | Subject | Role / Engine | Depends |
| --- | --- | --- | --- |
| A1 | Middleware 0.0.12 prep (peer ^0.0.9, gates green) | builder / Sonnet | — (parallel, own repo) |
| — | PUBLISH CHECKPOINT: user approves middleware 0.0.12 | Orchestrator + user | A1 |
| A2 | Supervisor pin raise (middleware held ^0.0.9), install, lock | builder / Sonnet | — |
| A3 | Source migrations: mcp JSONRPC split, workflow, contract Result audit, terminal AnswerResult | sol / GPT-5.6 Sol | A2 |
| A4 | Test/guide migrations (fences, recovery, MCP fixtures, mirrors) | builder / Sonnet, stop-on-divergence | A3 |
| A5 | @orkestrel/test adoption (recorder + delay, direct imports, hand-rolls deleted) | builder / Sonnet | A4 |
| A6 | Viewer freshness: refresh on clean EOF, terminal derived, tail-field ruling | implementer / Opus 5, Sol audits | A5 |
| A7 | Settlement voice: three sentences, bounded value | implementer / Opus 5 | A6 |
| A8 | Failed-launch voice (browser); pre-probe gates the core-diagnostics unit | implementer / Opus 5 (probe: Orchestrator) | A6 |
| A9 | Transcript progressive disclosure (verbatim retained, a11y criteria) | implementer / Opus 5 | A7 (FeedItem serialization) |
| A10 | Agent deadline: ApplicationPolicy.agent{model,timeout,keep}, cold-load proof | sol / GPT-5.6 Sol | A2 (+after A8 for proof binding) |
| A2b | Middleware raise in supervisor post-publish | builder / Sonnet | A1 + publish + A2 |
| A11 | Integrated acceptance: real-stream journeys, captures, verifier gates both repos, four-lane re-film | implementer (journeys) + verifier + Orchestrator (film) | all |

## Exit criterion (fixed now)

1. Middleware 0.0.12 published with database peer ^0.0.9, or the deferral recorded as the
   user's decision.
2. Supervisor's pins and lock resolve the complete target fleet with no invalid peers.
3. The five compile-break migrations landed with no `as`, no suppression, no shim.
4. `@orkestrel/test` supplies recorder + delay; hand-rolls deleted; scratch exclusion recorded.
5. A real cold ollama agent run completes past the former 120s boundary.
6. Every post-intent failure that the gated probe shows vanishing gains a bounded diagnostic;
   the fast-fail path renders its failure in the open viewer.
7. A self-completing open run converges to terminal snapshot truth; `Run finished` renders.
8. Structured provider transcript is compact by default, verbatim on demand.
9. Settlement cards state real outcomes in all three cases; "result is not available" is gone.
10. Gates green in both repos from one independent verifier; portfolio frames for 6-9; the
    four-lane re-film shows each E1 finding closed.

## Three highest risks (both lanes reconciled)

1. The slow-timeout behavioral contradiction (fast-fail lands, 120s abort didn't) — probed
   before A8's brief is written.
2. Terminal event ordering: the final inspect must run after the server's closure barrier; a
   still-running answer there is a stop-and-report, never a retry loop.
3. Real-service timing: cold loads and CLIs are slower than fixtures; caps sized from observed
   high marks with stated slack.

## Process lesson — the out-of-lifecycle A3 landing (2026-08-15T16:53Z)

A killed `codex exec` is not dead until its process TREE is dead: the `codex-code-mode-host`
child survives a parent kill under a different name, keeps executing with its journal pipe
severed, and the journal frozen at its header reads as a launch that never started. Two rules
bind from here: kill a codex exec by walking its children (`ps --ppid`) and confirming
`code-mode-host` is gone; and before dispatching a substitute writer, check the owned files'
mtimes against the baseline — a foreign write there means the "dark" unit is executing. The
substitute Opus writer's deviation-stop (wrote nothing, reported the foreign edits with
timestamps and the live PID) is the behavior that contained this; A3's product was verified
against its own criteria and adopted at 156c808 with two findings carried.
