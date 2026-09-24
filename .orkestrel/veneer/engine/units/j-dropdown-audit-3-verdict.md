# J-DROPDOWN audit — the Orchestrator's reconciled verdict (round 3, 2026-09-24)

Subject: the J-DROPDOWN unit's round 3 in `veneer/tmp/worktrees/dropdown`, claims `j-dropdown-audit-claims-3.md`. Lanes: objective `analyst` on GPT-6 Astra (`j-dropdown-audit-3-objective-verdict.md`, thread `01a0d214-b34f-7e32-8f1c-31fe088e9be3`, journal `scaffold/tmp/codex/j-dropdown-audit-3.jsonl`, 25 commands, 476 s) and `checker` on Sonnet (`j-dropdown-audit-3-checker-verdict.md`, `FAIL` on one clause the Orchestrator's reading settles, see below). The subjective lane was not run for this round: the round's items are three mechanism corrections and one instrument row, the objective lane's subject, with no API-shape or voice change beyond one qualifier the checker verified; the deviation is recorded here. Opus 5.5 wrote the unit and its rounds; the objective lane is the engine that did not.

Orchestrator evidence: the `types.ts` sections of `j-dropdown-2.diff` and `j-dropdown-3.diff` compared byte-identical (5949 bytes each), settling the checker's referral; the replay is carried as stated under claim 4.

## Rulings per claim

1. **The placement's restoration completes before a destroy returns — CONFIRMED at the tested entry point, BOUNDED beyond it.** The lane confirms the closing-`beforetoggle` repair: the dropdown keeps its placement until the destroy returns, `Placement.destroy` restores on every call, and each proof distinguishes its mutation (the retargeted "destruction leaves the placement" row now binds where its signal-only version did not). The lane's counter-interleaving is one level deeper: `HostSnapshot.restore()` takes its records and empties its collections before writing them back, so a `dropdown.destroy()` called from an attribute reaction to the `popover` restoration itself finds nothing to restore, returns while the side attribute still carries the shown side, and the interrupted restoration writes it after that return. The nested restore restores only the records saved since, by the J-BINDER round-5 ruling that each invocation owns its entries, so no engine-level change can complete the outer invocation's writes. Ruling: this is the shared snapshot's re-entry contract, not the dropdown's, and it is carried to J-SNAPSHOT-SHARED (E13's successor, after W2) as a named bound with the reproduction as that unit's first step; the landing round states the bound in one sentence under `#### Dropdown`'s restoration paragraph and changes no mechanism for it. Source-derived, not reproduced by the lane; the carrier reproduces it.
2. **The arrow route reads the delegate's lifetime after `show()` — CONFIRMED.**
3. **The entry-selector row binds entry navigation — CONFIRMED** (the checker read the independent log; the lane confirms the retarget).
4. **The instrument — CONFIRMED except the replay clause**, which the Orchestrator runs on the landing round's instrument before the fast-forward (the landing writer re-anchors the `Delegate.ts` rows against the merged file and keeps every row); the landing verdict names the log. The lane's attacks on the retained instrument held (no removed row; the runner requires the named title to fail).
5. **Scope, gates, and the added lines — CONFIRMED on every clause but the destruction contract**, which claim 1's bound qualifies: the `destroy` summaries stand as the contract, and the guide sentence names the one path that does not yet meet it. The checker's `Element` guard clause is the checker brief's paraphrase; the claim's letter ("reads `isInstance`") holds, and `#press` narrows to `Element` because the routes resolve to `HTMLElement` through `#closest` and `#locateToggle`.

## Findings outside the claims

None.

## Carried to the landing round (`j-dropdown-brief-4.md`)

- The bound sentence under `#### Dropdown` (claim 1) and the E13 entry in `../decisions.md` (the Orchestrator writes the entry).
- The merge of Veneer `main` `7dd4e17`, the fold of `computeNeighbor`, `#closest`, `#construct`, and one `#press` into the landed delegate, E16's `isDisabled` for the key route's disabled reading, and the Orchestrator's replay before the fast-forward.

## Lanes and checker

Objective lane: ran (Astra). Checker: ran (Sonnet). Subjective lane: not run, for the reason in the head. Nothing was substituted.

VERDICT: PASS with one bound — the unit lands through `j-dropdown-brief-4.md`; claim 1's write-back re-entry is J-SNAPSHOT-SHARED's, recorded under E13
