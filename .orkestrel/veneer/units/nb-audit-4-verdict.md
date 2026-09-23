# Audit verdict — NAVBAR (`nb`), round 4 (the membership round)

Subject: the round-4 claims in `nb-audit-4-claims.md` over the worktree `/home/user/veneer-nb` (the owned files over `a658879`), `nb-4.diff`, `nb-4-status.txt`, `nb-shared-4.patch`, `nb-offlimits-4.patch`, `nb-retirement-4.patch`, `b-collapse-nb-report-4.md`, and `nb-instruments-4/`. The unit was written by `builder` on Sonnet from `nb-brief-4.md`.

## Lanes

| Lane | Role and engine | Verdict file | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst` on GPT-6 Astra (`codex-queue-23.sh`, thread `01a0cff4-6ea1-7a91-aa9c-59877506b5e1`) | `nb-audit-4-objective-verdict.md` | `FAIL 3, 5; outside the claims: REPORT-COUNTS` |
| Checker | `checker` on Sonnet (claims 1, 2, 5) | `nb-audit-4-checker-verdict.md` | `FAIL 5; outside the claims: none` |
| Subjective | not run | — | — |

The subjective lane is not run for this round's own reason: every edit was prescribed verbatim in `nb-brief-4.md`, leaving no shape, naming, or voice choice to the unit. The lanes ran on the one claims file, blind. The checker's command sub-clauses are settled in `nb-audit-4-settling.txt`; the objective lane's claim 3 is settled by the Orchestrator's readings in `nb-audit-4-settling-controls.txt` and `nb-audit-4-settling-logs/`.

## Reconciliation

1. **Delta and scope: CONFIRMED** in every lane. The owned delta from round 3 sits in the section proof's comment alone, the shared delta in `tests/setupStyles.test.ts` alone; the off-limits patch is byte-identical; the retirement patch differs in one index line with its hunk header unchanged (the brief's expectation of a shift was wrong, as both lanes note: the insertion follows the retirement hunk); the shared and off-limits patches apply with exit 0.
2. **The membership assertions: CONFIRMED** in every lane, at the prescribed site, with the existing loops and the closure assertion unchanged. The objective lane's read-only evaluation shows each deletion, each empty initializer, and each changed field failing its assertion, so the round-3 finding EMPTY-TABLE-PROOFS is closed.
3. **The controls: CONFIRMED, with the missing evidence supplied.** The objective lane broke the claim on evidence retention alone: the instrument records each deletion control's exit and summary and discards the assertion diagnostics. The Orchestrator re-ran the three deletions on a rebuilt stage with the complete output kept: `expand-readings-row-deleted` fails at the viewport projection (`expected [ 390 ] to deeply equal [ 390, 1280 ]`, `tests/setupStyles.test.ts` around line 3303), `dark-consumers-row-deleted` at the consumer rows (`expected [ …(2) ] to deeply equal [ …(3) ]`, around line 3319), `paint-moves-row-deleted` at the paint-move rows (three rows against four, around line 3330), and the unmutated case reads green (`nb-audit-4-settling-logs/settling-*.log.txt`). The four round-3 controls read red as in round 3 and the styles run reads green with the round-2 titles (the objective lane, from `mutations.log.txt`).
4. **The comment, the gates log, and the gates: CONFIRMED** by the objective lane: the backticked token, the appended run header, every stage and retirement gate exit 0 as reported, the section and retirement assertions distinguishing their mutations in the retained logs.
5. **Law and report: BROKEN, record-only.** The code law holds in every lane. The report fails the writing rule at the sites both lanes name (temporal `once` and `now`, bare and possessivized tokens, positional references, counts of growable sets, the carried deviations without their four fields) and states one false sentence, corrected here: "every carried mutation reads exit 1" is wrong for the browser row-order control, which reads exit 0 by design because the browser proof reads each spelling independently of row order, as round 3 recorded. The report stays as audited; the landing message and the fold carry no sentence from it.

## Findings outside the claims, ruled

- **REPORT-COUNTS** (the objective lane): the report's tallies of growable sets are record-only; its run measurements are permitted.

## Carriers

No finding is carried to a further round: the code is accepted for landing. The landing (`nb-resolve.py`, `table-merge3.py` for the deferral table, the retirement patch applied plain, `land-seams.py`, `sort-inventories.py`) runs after the UTIL-PLACEMENT push, with `nb-landing-checker-brief.md`, the fast gates, the chain, and the fold.

VERDICT: FAIL 5 (record-only); outside the claims: REPORT-COUNTS (record-only); the code accepted for landing
