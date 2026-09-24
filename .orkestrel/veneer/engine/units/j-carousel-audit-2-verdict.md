# J-CAROUSEL audit — the Orchestrator's reconciled verdict (round 2, 2026-09-24)

Subject: the J-CAROUSEL unit's round 2 in `veneer/tmp/worktrees/carousel`, claims `j-carousel-audit-claims-2.md`. Lanes: objective `analyst` on GPT-6 Astra (`j-carousel-audit-2-objective-verdict.md`, thread `01a0d219-e98a-7300-a22e-892c4a0efaa6`, journal `scaffold/tmp/codex/j-carousel-audit-2.jsonl`, 65 commands, 572 s) and `checker` on Sonnet (`j-carousel-audit-2-checker-verdict.md`, `UNRESOLVED` on the judgment clauses it referred and the two evidence clauses the Orchestrator's note settles). The subjective lane was not run for this round: the round-1 reviewer's findings (F1 to F3, R1 to R3) were closed as named and the checker verified each mechanically, and the mechanism changes are the objective lane's subject; the deviation is recorded here. Opus 5.5 wrote the unit and its round 2; the objective lane is the engine that did not.

Orchestrator evidence: none this round beyond the gate run `j-carousel-gates-2.log.txt`; the replay runs on the landing round's instrument before the fast-forward (claim 9).

## Rulings per claim

1. **Destruction inside the swipe's construction — CONFIRMED.**
2. **The slide doors — CONFIRMED**, every door traced with its proof binding its mutation.
3. **The timer under standing conditions — BROKEN on two interleavings.** (i) `#move` captures the pause tally after the `slide` dispatch, so a `pause()` a `slide` listener (not `slid`) makes is inside the captured value; the completion finds the tally unchanged and `start()` resumes an interaction ride the listener paused. Ruling: capture the tally before the pre-change dispatch and keep the completion comparison; a red-first proof with a `slide` listener calling `pause()`. (ii) `#touched` is cleared only by `#leave()`; a mouse release returns before touching it and no mouse-pointer movement clears it, so after a tap the real mouse moving or clicking inside the host without a boundary transition keeps the hover exemption, and `start()` or an interaction completion bypasses hover pausing. The lane rules the flag itself justified (`:hover` alone cannot tell the sticky tap from mouse hover) but its invalidation insufficient. Ruling: keep the touch-delay behaviour and the exemption, invalidate it on genuine mouse-pointer activity inside the host (a `pointer*` event whose `pointerType` is `mouse`, never the compatibility `mouseenter` or `mouseover` a tap fires), and re-apply hover pausing at that moment when `pause` holds; a red-first proof over CDP with a trusted tap followed by a trusted mouse move inside the host. Both carried as items A and B of `j-carousel-brief-3.md`. The lane derived both from source; the round-3 red-first cases are the reproductions the brief requires. Every supplied proof binds its own mutation.
4. **The restoration order and its bound — CONFIRMED.**
5. **The delegate's carousel route and its lifetime — CONFIRMED.**
6. **The `pointer` key and `CarouselVocabulary` — CONFIRMED.**
7. **Sentences the source makes false — BROKEN on two sentences.** The timer paragraph's pause-preservation sentence falls with claim 3 (i) and follows its repair; the sentence that a listener destroying the delegate during a click leaves the carousel unmarked is too broad, because a carousel's own `slide` listener runs after the route marks, so a destruction there leaves the mark and an outer delegate refuses it: qualify it to a destruction in an earlier route, before the carousel is marked. Carried as item C of `j-carousel-brief-3.md`; every other sentence is confirmed.
8. **Instrument controls and the first run — CONFIRMED.**
9. **Scope, gates, the instrument, and the added lines — CONFIRMED except the replay clause**, which the Orchestrator runs on the landing round's instrument before the fast-forward; the `types.ts` restoration hash is the writer's process record and the accepted content is the diff's, as the checker's note reads.

## Findings outside the claims

None. The `as const` in a test fixture the checker noted (`j-carousel-2.diff:3749`) is carried as item D of `j-carousel-brief-3.md`, matching the Dropdown round's ruling for `tests/src/browser`.

## Lanes and checker

Objective lane: ran (Astra). Checker: ran (Sonnet). Subjective lane: not run, for the reason in the head. Nothing was substituted.

VERDICT: FAIL 3, 7, 9 — carried to round 3 through `j-carousel-brief-3.md` (items A to D); the replay to the landing round
