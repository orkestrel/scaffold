# Audit verdict — DROPDOWN (`dd`), round 2 (2026-09-23)

Subject: `dd-2.diff`, `dd-2-status.txt`, `dd-shared-2.patch` (against `c3ac297`), the report `b-collapse-dd-report-2.md`; claims `dd-audit-2-claims.md`; effective brief `dd-brief-3.md`. Lanes: the objective lane on `analyst` on GPT-6 Astra (`dd-audit-2-objective-verdict.md`; journal `tmp/codex/dd-audit-2-analyst.jsonl`, thread `01a0cee3-e6fc-70d3-93e2-ab32fe8cfbe4`, exec 15:30 to 15:38 UTC), the auditor engine that did not write the unit; the subjective lane on `reviewer` on Opus 5.5 (`dd-audit-2-subjective-verdict.md`); `checker` on Sonnet (`dd-audit-2-checker-verdict.md`, claims 1, 4, 7, 8); blind on one claims file. The writer was `opus` on Opus 5.5.

| Claim | Objective (Astra) | Subjective | Checker | Reconciled |
| --- | --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED (hunks reconstructed against `c3ac297`) | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The mutations | CONFIRMED (every log read) | CONFIRMED | — | CONFIRMED |
| 3 The containment case | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 The partition and the polarity | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 The guide | CONFIRMED | CONFIRMED (F1 outside) | — | CONFIRMED; F1 outside it |
| 6 Nouns, the dark-mode case, the copy, the polarity | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 The gates and the journey | UNRESOLVED (the copy's tree hash) | UNRESOLVED (same) | CONFIRMED | CONFIRMED on the logged results; the tree-hash clause is settled by the landing's own fresh archive, whose `rev-parse` lines the landing retains |
| 8 Law and report | BROKEN (report counts; two comment tallies; a malformed path in the retained report) | BROKEN (one comment tally) | CONFIRMED | BROKEN on the report, retained as returned; the two comment tallies are the landing's integration edits; the malformed path was the Orchestrator's retention rewrite, corrected |

## Rulings

- **Claim 7.** The validation copy is gone; the landing builds its own fresh archive of the base and records `git rev-parse c3ac297^{tree}` beside the copy's `HEAD^{tree}` in the landing measurements, which settles the clause for the record.
- **Claim 8 and the comment tallies.** The landing's integration edits replace the `DropdownSection.test.ts` comment with the subjective lane's sentence ("The journey photographs each specimen at 390 and at 1280 pixels, and the grid columns that seat each toggle reflow between those widths, so the room each menu keeps is read at each of them.") and rewrite "those two populations" (`dd-shared-2.patch:850`) to name the populations.
- **F1 (the actor's terms).** The landing's integration edits write "a dropdown engine writes" for "a placement engine writes" (`dd-shared-2.patch:43`, `:227`) and "The Dropdown `plugin` row in § Compatibility records the behavior J-ENGINE owns." (`:228`); the R7 and R9 sentences stay verbatim.
- **The retained report's path.** The retention rewrite of `tmp/units/` paths produced a doubled path in one command transcription (`b-collapse-dd-report-2.md:288`); corrected at this reconciliation.
- **COLLAPSE's R8 sentence** (`co-shared-2.patch:199`) drops at COLLAPSE's integration behind DROPDOWN's NAV-worded sentence, as round 1 ruled.

## Carriers

The landing's integration edits (verified by the landing checker) carry claim 8's comment tallies and F1; the landing measurements carry claim 7's tree-hash reading; the report's counts stand on the record.

VERDICT: FAIL 7, 8; outside the claims: F1 — carried by the landing's integration edits and measurements
