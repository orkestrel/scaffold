# J-TOAST audit — the Orchestrator's reconciled verdict (round 1, 2026-09-24)

Subject: the J-TOAST unit in `veneer/tmp/worktrees/toast` (branch `unit/toast` from `e24e2c3`, uncommitted), claims `j-toast-audit-claims.md`. Lanes: objective `analyst` on GPT-6 Astra (`j-toast-audit-objective-verdict.md`, thread `01a0d1e1-0e98-7883-9143-32d9861ffe9c`, journal `scaffold/tmp/codex/j-toast-audit.jsonl`, 31 commands, 509 s), subjective `reviewer` on Opus 5.5 (`j-toast-audit-subjective-verdict.md`), `checker` on Sonnet (`j-toast-audit-checker-verdict.md`). Every lane ran on the same claims file, blind. Opus 5.5 wrote the unit; the objective lane is the engine that did not write it. The Orchestrator's replay runs before the fix round writes, and the round-2 verdict reads it.

## Rulings per claim

1. **Construction, options, and lifetime — CONFIRMED** by both lanes; the subjective lane's R1 (no row distinguishes release-before-restore) is item E.
2. **The show and hide sequences and their doors — FAIL.** The objective lane: (i) with `animated: false` a guarded `show.vn.toast` listener that calls `show()` again completes the inner call synchronously, which clears `#change` and dispatches `shown`; the outer call then passes `#refused()`, takes a fresh identity, repeats every write, and dispatches a second `shown`, so the guide's "one transition and one `shown`" holds only for the animated case the proof uses; (ii) the fade door reads no `shown` membership, so a reaction to the `fade` write that removes a pre-existing `show` is written over by the next write. Ruling: the call identity is taken before the pre-change dispatch and read after it, so a nested call that completed inside the dispatch leaves the outer call refused (newest call wins; E15's one-direction refusal does not apply, and a `show` on a shown toast stays valid); the fade door carries the expected `shown` membership. Every other door held. Item A.
3. **The delay — CONFIRMED** by both lanes; the one `MISSED` row's equivalence holds from the source (a surviving timer's `hide` refuses on the destroyed engine), and the subjective lane's F2 (`#schedule`) is item C.
4. **The delegate's dismiss route and E12 — FAIL on the lifetime.** The objective lane: `#routeToast` reads no lifetime, so a delegate destroyed by an earlier route still prevents, marks, acquires, restarts observation, and hides, and under nested roots consumes the mark a live outer delegate needed. Ruling: the Tab round-2 shape (`#closest`, the lifetime read first, `#construct`). Item B.
5. **The guard, the tables, and the barrel — CONFIRMED** by every lane; the checker's one not-met item (the anchor and area narrowing) is ruled no deviation in its retained note.
6. **The guide and the returned patch — FAIL.** Both lanes: the re-entry sentence falls with claim 2; the `@returns` sentences omit a later call's takeover as its own reason; the fence's lead promises a hide after the delay the fence never reaches (the subjective lane's B1); the vocabulary summaries say the toast reads or matches names only the delegate's route reads (the subjective lane's F1, the `Button` form the Alert round adopted); the `#activate` comment is false (F3); the in-flight departure understates Bootstrap (B2). Item D.
7. **Scope, gates, and the added lines — CONFIRMED pending the replay**, which the round-2 verdict reads.

## Findings outside the claims

- Subjective F1 (item D), F2 (item C: `#arm`/`#disarm`, the pair the Carousel round adopts), F3 (item D), R1 (item E), R2 (§ Delegation: the additive toast sentence waits for W5; the refusal wording lands at the fold), R3 (the fence's execution: a campaign bound, not this unit's), R4 (the equivalence: held), B3 (`once` in the tests: item D), B5 and B7 (item D where cheap).

## Lanes and checker

Objective lane: ran (Astra). Subjective lane: ran (Opus 5.5). Checker: ran (Sonnet). Nothing was substituted.

VERDICT: FAIL 2, 4, 6; outside the claims: F1, F2, F3 (subjective) — round 2 opened by `j-toast-brief-2.md`
