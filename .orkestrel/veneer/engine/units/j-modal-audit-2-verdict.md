# J-MODAL audit — the Orchestrator's reconciled verdict (round 2, 2026-09-24)

Subject: the J-MODAL unit's round 2 in `veneer/tmp/worktrees/modal`, claims `j-modal-audit-claims-2.md`. Lanes: objective `analyst` on GPT-6 Astra (`j-modal-audit-2-objective-verdict.md`, thread `01a0d21f-b59f-7fc1-b097-657e3b568074`, journal `scaffold/tmp/codex/j-modal-audit-2.jsonl`, 22 commands, 481 s) and `checker` on Sonnet (`j-modal-audit-2-checker-verdict.md`, `UNRESOLVED` on the two evidence clauses the Orchestrator's note settles). The subjective lane was not run for this round: the round-1 reviewer's findings (F1 to F3, F5) were closed as named and the checker verified each mechanically, and the mechanism changes are the objective lane's subject; the deviation is recorded here. Opus 5.5 wrote the unit and its round 2; the objective lane is the engine that did not.

Orchestrator evidence: none this round beyond the gate run `j-modal-gates-2.log.txt`; the replay runs on the landing round's instrument before the fast-forward (claim 8).

## Rulings per claim

1. **The isolation under the modal's signal — CONFIRMED.**
2. **The bounce — CONFIRMED on the mechanism, BROKEN on one attribution in the report.** The original red of "bounces without moving focus when focus is false" failed in the harness's `pressKeys` because nothing was focused, so Escape never reached the modal; that failure does not bind the bounce's focus behaviour, and the report lists it as a red-first proof. The current proof binds (the `EXACT` row "the bounce focuses under focus false" distinguishes an unconditional focus), and the other two bounce proofs bind their doors. Ruling: the writer corrects the attribution in its round-3 report (the case is bound by its mutation row, not by a red-first reading); no code change. Item C of `j-modal-brief-3.md`.
3. **Every isolation claims its chain — CONFIRMED.**
4. **The delegate's lifetime and the focus return — CONFIRMED**, the `#driven` lookup included (the lane: a vetoed hide remaining shown is exactly why the early lookup matters).
5. **Sentences the source makes false — BROKEN on three.** (i) The Bootstrap coercion departure says every other string becomes a dismissible backdrop, but Bootstrap normalizes the attribute first (`data-bs-backdrop="[]"` parses to an array and fails the type check): describe normalization then validation, and restrict the accepted-string statement to values that stay strings after normalization. (ii) The `static` sentence says the token "always applies" where the prevent-hook hide case proves the lifetime and state guards still apply: say cancellation does not veto the bounce while the guards apply. (iii) The `@returns` of `show` and `hide` promise `false` when another write changed the `shown` token "while the call ran", but a synchronous `shown` hook can complete a hide and the show still resolves `true` because the final return reads destruction alone: limit the token-takeover condition to the doors read before the completed event dispatches, preserving completed-event re-entry, in `types.ts` and the guide. Item B of `j-modal-brief-3.md`.
6. **Instrument controls and the identity conjunct — CONFIRMED**, the E6 removal included.
7. **The lock's selectors through the modal — CONFIRMED.**
8. **Scope, gates, the instrument, and the added lines — CONFIRMED except the replay clause**, which the Orchestrator runs on the landing round's instrument before the fast-forward; the `prove` clause is the writer's self-report and is accepted as such.

## Findings outside the claims

- **O1 — destruction during `ScrollLock` construction leaks the document lock (objective lane).** `Modal.show` constructs the lock before assigning `#lock`; the lock registers its holder, hides the body's overflow, and writes each compensated element's padding through `setProperty`, which runs custom-element reactions before it returns; a reaction that calls `modal.destroy()` finds `#lock` undefined and releases nothing; the construction resumes, compensates further elements, and returns the lock into a destroyed modal, whose lifetime door then returns `false` and whose second destroy returns at once, so the body's overflow and the registered holder stay. The same class as the Isolation, Placement, and Swipe findings: a mechanism constructed inside a show writing after its owner was destroyed. Ruling: the lock acquisition participates in the modal's lifetime before its first reaction-capable write (a `signal` on `ScrollLockOptions` in the Isolation and Placement shape), stops compensating after destruction, and releases the partially acquired holder, preserving the first holder's selectors and the shared reference count; a red-first proof with the custom-element fixture the lane describes. Item A of `j-modal-brief-3.md`. Source-derived; the round-3 red-first case is the reproduction the brief requires.

## Lanes and checker

Objective lane: ran (Astra). Checker: ran (Sonnet). Subjective lane: not run, for the reason in the head. Nothing was substituted.

VERDICT: FAIL 2, 5, 8; outside the claims: O1 — carried to round 3 through `j-modal-brief-3.md` (items A to D); the replay to the landing round
