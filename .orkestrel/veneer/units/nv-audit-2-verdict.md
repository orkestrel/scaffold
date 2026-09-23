# Audit verdict — NAV (`nv`), round 2 (2026-09-23)

Subject: `nv-2.diff`, `nv-2-status.txt`, `nv-shared-2.patch` (against `c3ac297`), the report `b-collapse-nv-report-2.md`; claims `nv-audit-2-claims.md`; effective brief `nv-brief-3.md`. Lanes: the objective lane on `analyst` on GPT-6 Astra (`nv-audit-2-objective-verdict.md`; journal `tmp/codex/nv-audit-2-analyst.jsonl`, thread `01a0cedd-f1ef-73b0-bc7e-943adc0c69a6`, exec 15:24 to 15:30 UTC, the bench live from the 15:18 probe), the auditor engine that did not write the unit; the subjective lane on `reviewer` on Opus 5.5 (`nv-audit-2-subjective-verdict.md`); `checker` on Sonnet (`nv-audit-2-checker-verdict.md`, claims 1, 3, 7, 8, 9); blind on one claims file. The writer was `opus` on Opus 5.5.

| Claim | Objective (Astra) | Subjective | Checker | Reconciled |
| --- | --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | CONFIRMED | CONFIRMED (one sub-clause on the report) | CONFIRMED |
| 2 The specimen and the proof markup | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 3 The partition | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 The mutation matrix | CONFIRMED (every log read) | CONFIRMED | — | CONFIRMED |
| 5 The guide prose | CONFIRMED (no Showcase clause owed at `c3ac297`) | CONFIRMED | — | CONFIRMED; F1 and F2 outside it |
| 6 The comments | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 The gates | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED; the chain's setup timeout is the landing's reading |
| 8 The journey observation | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 9 Law and report | BROKEN (counts, `now`, two patch comments) | BROKEN (counts, a wrong bound, `now`) | CONFIRMED | BROKEN on the report, retained as returned; the two patch comments are the landing's integration edits |

## Rulings

- **Claim 9.** The report's counts, the temporal `now`, and the wrong "added mutations" bound stand on the record. The patch's two comment defects Astra found are carried by the landing's integration edits: `nv-shared-2.patch:673` names the two hover slots by name instead of counting them, and `:730` gives the `tests/setupStyles.test.ts` token its noun ("the `tests/setupStyles.test.ts` proof adds").
- **F1 (the Tab cell's list).** The landing's integration edit writes the subjective lane's punctuation: "writes `role`, `aria-selected`, `tabindex`, and `active`; `show` on the pane; in a dropdown, `active` on the toggle, `show` on the menu, and `aria-expanded` on the item. Owner: J-ENGINE."
- **F2 (ring and outline).** The landing's integration edit writes "…which the release writes so an active neighbour does not paint over the tab's focus ring."
- **R-1 (the cell's completeness).** A `plugin` row records the behavior and the classes and attributes the cascade renders or the plugin toggles on the trigger; `aria-labelledby` on the pane is an attribute no rule reads, so the cell does not list it, and `active` on the pane is the `show`/`active` pane write the cell names. No edit.
- **R-2.** Settled by Astra from `git show c3ac297:guides/veneer.md`: § Showcase at the base enumerates helper placement only; no Nav clause is owed.
- **The dispatch defect both subjective lanes reported.** A read-only lane's brief must hand it the base text rather than a `git show` command; the next lane briefs for a unit whose base has moved carry the base excerpts the lane needs, or the Orchestrator stages them.

## Carriers

The landing's integration edits (verified by the landing checker) carry claim 9's two comment defects, F1, and F2; the report's faults stand on the record. NAV lands after DROPDOWN, dropping DROPDOWN's `Nav` deferral row in the same integration.

VERDICT: FAIL 9; outside the claims: F1, F2 — carried by the landing's integration edits
