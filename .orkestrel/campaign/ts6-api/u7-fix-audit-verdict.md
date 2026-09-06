# Verdict — U7 probe-typestage, audit round 2 (over fixes a, b, c)

Lanes that ran, each in a clean context on `u7-fix-audit-brief.md`: subjective (`reviewer`, Opus 5) and objective (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench). The `checker` lane died on the session limit (reset 15:30 UTC, 2026-09-06) before returning and is re-run over the fixed tree together with the fix-d edits (`u7-fix-d-check-brief.md`). The `verifier` ran the probe gate chain (`u7-fix-verify-report.md`); the Orchestrator took the idle-host reading of its red row (`u7-fix-probe-solo.log.txt`).

## Per-claim reconciliation

Both reviewer lanes: PASS on every claim, 1 to 13. The subjective lane rules claim 13's converse (no unit wrote what it did not report) undecidable from cumulative diffs and refers it to the checker; the objective lane reconciles every report's file list against the tree diff and the briefs' dispatch-time status lists and rules PASS. Ruling: PASS on 1 to 12; 13 PASS on the objective reconciliation, with the checker's letter reading to come.

## Findings outside the claims

Carried, each to one U7-fix-d edit:

- Subjective F1 (two sentences state the superseded classification rule) → edit 1.
- Subjective F2 (`destroy` `@returns` residue) → edit 2.
- Subjective F3, F4, F5 (ragged and overrun lines) → edits 3 and 5.
- Subjective F6 (`skipIf(!LINKS)` against the suite's `runIf` form) → edit 4.
- Subjective F7 (the overlay remarks name a reader that holds none) → edit 7.
- Subjective F8 (the dangling digest sentence) → edit 6.
- Objective F1 (the drafted-`.json` branch untested) → edit 9.
- Objective F2 (a claim drafting its own project file moves the digest when `TypeStage` is driven directly) → edit 8, ruled: the configuration is read before the drafts land, so the invariant the types state holds at every entry point.
- Objective F5 (the "non-BMP" label on a fixture that carries none) → edit 12.
- Subjective referral, taken up by the Orchestrator: `#check`'s no-diagnostic branch has no case → edit 10, over a protocol-faithful stub compiler.
- The verifier's red row → edit 13 (the expiry budget is the package default, leaving the room a contended host needs).

Recorded, no carrier: subjective E1 and objective F3 (`u7-fix-a.diff.txt` was the cumulative diff at fix-a's exit, not a slice; fix-d's slice is captured as an interdiff, and the label stands corrected here), objective F4 (the fix-a report's `TYPE_MIRROR` import sentence was inaccurate; the diff is the record), objective F6 (gate evidence: the verifier's run is in this round's record), objective F7 (the brief's rules path was wrong; probe's checkout carries no `.claude/rules/`, the checker brief names scaffold's copy). Dropped on the record, unsubstantiated by the other lane: `filterUniqueIssues` arrival order and `matchesLiveProcess` `EPERM` cases, the drafted-`.json`-outside-the-mirror spelling question (edit 9's test drives the in-mirror path, which is the only one a draft can take), and the retuned budgets' host dependence beyond edit 13.

## Gate reading

`u7-fix-verify-report.md`: format, lint, `check`, `build` green; `npm test` red on the expiry row under a saturated host (load average above 4 on four processors), the row green alone twice (`u7-probe-solo.log.txt` 387 s; `u7-fix-probe-solo.log.txt` 379 s). The authoritative reading is the fix-d round's verifier.

VERDICT: PASS on the claims, with the round's findings carried to U7-fix-d; the checker's reading and the fix-d closure decide acceptance
