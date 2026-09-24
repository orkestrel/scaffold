# J-CAROUSEL audit — the Orchestrator's reconciled verdict (round 3, 2026-09-24)

Subject: the J-CAROUSEL unit's round 3 in `veneer/tmp/worktrees/carousel`, claims `j-carousel-audit-claims-3.md`. Lanes: objective `analyst` on GPT-6 Astra (`j-carousel-audit-3-objective-verdict.md`, thread `01a0d23e-46f7-7510-a47c-59a7db74389d`, journal `scaffold/tmp/codex/j-carousel-audit-3.jsonl`, 51 commands, 597 s) and `checker` on Sonnet (`j-carousel-audit-3-checker-verdict.md`, `FAIL` on one banned-term hit). The subjective lane was not run for this round: the round's items are two mechanism corrections, two sentences, and one fixture, the objective lane's subject, with no API-shape change; the deviation is recorded here. Opus 5.5 wrote the unit and its rounds; the objective lane is the engine that did not.

Orchestrator evidence: a sweep of the worktree's carousel tests, sources, and added guide lines for `once` outside `{ once: true }` finds two temporal titles in `Carousel.test.ts` ("... and cycles again once it is", "holds the timer under the hover once the mouse moves inside the host ..."), the rest being "at once" or "once per click"; the replay runs on the landing round's instrument before the fast-forward.

## Rulings per claim

1. **The pause tally is read before the `slide` dispatch — CONFIRMED.**
2. **The tap exemption ends at genuine mouse activity — BROKEN on one site.** The listeners and `#notice` match the claim, but the reason for omitting `pointerup` does not hold: with a mouse resting over the host, press and hold the mouse, tap the host with touch (the release sets the exemption), then release the mouse without moving; the mouse `pointerup` returns from `#defer`'s mouse branch and reaches no `#notice`, so the touch deferral's expiry arms past the hover. Ruling: route a mouse `pointerup` through `#notice` as well (the `#defer` listener's mouse branch calls it), keeping the touch and pen deferral and the compatibility mouse events from clearing the exemption; a red-first proof over CDP with mouse-down, touch tap, stationary mouse-up, asserting the timer stays clear under the hover, plus a row that drops the release site alone; the trusted-tap guard stays. Carried to the landing round as item A of `j-carousel-brief-4.md`, because the change is one call site and one proof, and the landing round's diff receives an objective lane on that item and the delegate fold before the fast-forward, so the mechanism does not land unaudited. Source-derived; the red-first case is the reproduction.
3. **The two sentences — CONFIRMED**; the hover sentence follows item A's repair (a mouse press or release inside the host ends the exemption too).
4. **One fixture — CONFIRMED.**
5. **The instrument — CONFIRMED except the replay clause**, carried to the landing evidence.
6. **Scope, gates, and the added lines — CONFIRMED**, with the checker's banned-term hit carried: two case titles use a temporal `once` and are renamed with `after` in the landing round (item B of `j-carousel-brief-4.md`); the `prove` clause is the writer's self-report and is accepted as such.

## Findings outside the claims

None.

## Carried to the landing round (`j-carousel-brief-4.md`)

- Item A: the mouse-release invalidation with its proof and row; item B: the two title renames.
- The merge of Veneer `main` `e75608b`, the fold of `#closest`, `#construct`, and `#conflictsCarousel` into the landed delegate with E16's `isDisabled`, and the Orchestrator's replay and objective lane before the fast-forward.

## Lanes and checker

Objective lane: ran (Astra). Checker: ran (Sonnet). Subjective lane: not run, for the reason in the head. Nothing was substituted.

VERDICT: FAIL 2, 5 — carried to the landing round through `j-carousel-brief-4.md`, whose diff receives an objective lane before the fast-forward
