# Audit round 3 — FADE (`cf`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: FADE round 3 (`opus` on Opus 5.5, successor brief `b-cross-cf-brief-3.md`), claims file
`cf-audit-3-claims.md`. The lane that ran: the checker on Sonnet (`cf-audit-3-checker-verdict.md`,
workflow `wf_b8ee4c00-b9d`); the objective and subjective lanes are not run, because round 3 is a
one-clause prose round, as `cf-audit-2-verdict.md` records. The Orchestrator's apply check:
`cf-shared-3.patch` on a fresh `42fd88e` extract, exit 0.

## Per-claim rulings

1. **CONFIRMED**: the interdiff deletes the clause and changes nothing else, and the sentence reads true.
2. **CONFIRMED**: every gate exits 0 in the scratch copy with both patches applied.
3. **BROKEN** on the report (a path token without its noun); the report is the record, accepted on the
   record.

## Acceptance

FADE is accepted: rounds 1 and 2 confirmed the rules, their order, the mutations, the ledger row, and the
tab-pane and modal rows, and round 3 closes the last clause. It lands on the session branch with
`cf-shared-3.patch` and `cf-offlimits.patch`; its `fade-shown` and `fade-hidden` frames are read in the
batch chain after PAGE-FRAME lands.

VERDICT: FAIL 3; outside the claims: none. Accepted: claim 3 rules the report's form, not the code.
