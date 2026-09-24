# J-DROPDOWN audit — the Orchestrator's reconciled verdict (round 2, 2026-09-24)

Subject: the J-DROPDOWN unit's round 2 in `veneer/tmp/worktrees/dropdown`, claims `j-dropdown-audit-claims-2.md`. Lanes: objective `analyst` on GPT-6 Astra (`j-dropdown-audit-2-objective-verdict.md`, thread `01a0d1f2-e9d4-7ec0-9c84-08a16b63ec42`, journal `scaffold/tmp/codex/j-dropdown-audit-2.jsonl`, 40 commands, 766 s) and `checker` on Sonnet (`j-dropdown-audit-2-checker-verdict.md`, `PASS`). The subjective lane was not run for this round: the round-1 reviewer's findings (the summary sentence, the `@returns` voice, the `#reveal` fold, the vocabulary types, the guide sentences) were closed as named and the checker verified each mechanically, and the mechanism changes (the cancelled promotion, the placement signal, the key route) are the objective lane's subject; the deviation is recorded here. Opus 5.5 wrote the unit and its round 2; the objective lane is the engine that did not.

Orchestrator evidence: none this round. The independent replay of `j-dropdown-mutations-2.py` did not run while the lanes read the worktree and is carried to round 3, whose instrument keeps every round-2 row (re-anchored where the round-3 text moves); the Orchestrator's round-3 replay settles claim 7's replay clause for both rounds and is named in `j-dropdown-audit-3-verdict.md`.

## Rulings per claim

1. **A cancelled promotion refuses the show — CONFIRMED.** The objective lane traced the two lifetime reads, the restoration on refusal, the preserved cause, and the dropdown's stop before focus, ARIA, tokens, or `shown`, and named the rows that distinguish each (log lines 82 to 85).
2. **`PlacementOptions.signal` — BROKEN.** The opening-promotion mechanism holds (rows 33, 86, and 87 distinguish the dropped signal and the missing abort listener). The closing side does not: `#conceal` clears `#placement` before `placement.destroy()`; `Placement.destroy` aborts its own controller (which removes its listener on the dropdown's signal), then calls `hidePopover()`, which dispatches the menu's closing `beforetoggle` synchronously; a listener there that calls `dropdown.destroy()` returns after restoring only the dropdown's snapshot, and the placement's `#snapshot.restore()` then writes the menu's attributes after the dropdown's `destroy()` returned. That is a write after destruction, against the design verdict's rule. Carried as item A of `j-dropdown-brief-3.md`. The lane derived the interleaving from source; the round-3 red-first case is the reproduction the brief requires.
3. **The key route — BROKEN on the instrument, CONFIRMED on the mechanism.** The visibility property, the Escape lifetime, the key mark, and the listener registration each bind a named case (rows 88 to 91). The row "the delegate navigates by the default entry selector" discards the whole supplied selector group, so its named case fails at the acquisition assertion before the ArrowDown dispatch; it supplies no evidence about entry navigation. Carried as item C of `j-dropdown-brief-3.md`: mutate only the entry selector at the navigation site so the case fails at the focus assertion.
4. **Sentences the source makes false — CONFIRMED.**
5. **Instrument rows — CONFIRMED.** The lane bounds row 96 (the dropdown signal case detects the missing subscription at its listener assertion before the later abort); that bound does not undo the named failure.
6. **Names and types — CONFIRMED.**
7. **Scope, gates, the instrument, and the added lines — CONFIRMED except the replay clause**, which is carried as stated in the head. The checker records the `prove` clause as the writer's self-report only; the Orchestrator accepts it as such (no `prove` server is reachable from a subagent).

## Findings outside the claims

- **F1 — the arrow route focuses an entry after the delegate is destroyed (objective lane).** In `#routeDropdownKey`'s vertical branch, `engine.show()` dispatches `shown` synchronously; a listener that destroys the delegate (which leaves a dropdown constructed directly alive, because the delegate owns only what it acquired) is followed by the route reading no lifetime and focusing the first entry, replacing whatever the listener focused. The Escape branch reads the lifetime; the arrow branch does not. Carried as item B of `j-dropdown-brief-3.md`.

## Findings the Orchestrator drops

None. Every finding a lane raised has a carrier.

## Lanes and checker

Objective lane: ran (Astra). Checker: ran (Sonnet). Subjective lane: not run, for the reason in the head. Nothing was substituted.

VERDICT: FAIL 2, 3, 7 — carried to round 3 through `j-dropdown-brief-3.md` (items A, B, C, and the Orchestrator's replay); the unit lands after ScrollSpy, through its round-4 landing brief
