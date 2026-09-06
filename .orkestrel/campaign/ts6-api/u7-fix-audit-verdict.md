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

## Closure over fixes d to g

The checker and the verifier closed each fix round in place of a fresh reviewer round, because every fix adopted the round's prescriptions verbatim (`.claude/rules/quality.md` § Rounds and verdicts); the interdiff slice of each round is the checker's subject, and each verifier ran the whole probe chain beside other work.

- **Fix-d** (`u7-fix-d-checker.md`): VERDICT: PASS over the round-2 claims and the fix-d edits together, with claim 13's letter reading. Verifier (`u7-fix-d-verify-report.md`): GATES: RED on `format:check` (the guide's method table after the widened row) and on the serialization fixture under load; the fixture green alone (`u7-serialization-solo.log.txt`, 26 s); the table carried to fix-e.
- **Fix-e** (`u7-fix-e-checker.md`): PASS on claims 1 and 2; FAIL 3 on the report alone, whose deviation compared the formatter's write against `HEAD` rather than the post-fix-d tree; the slice shows the write scoped as prescribed, and the record carries the refutation. Verifier (`u7-fix-e-verify-report.md`): format, lint, `check`, `build` green; `npm test` red on two `Probe.test.ts` rows of the timing class beside the U4 closure chain, carried to fix-f.
- **Fix-f** (`u7-fix-f-checker.md`): VERDICT: PASS, the two race guards raised beside the budgets they lose to ruled right. Verifier (`u7-fix-f-verify-report.md`): format, lint, `check`, `build` green; `npm test` red on one `RuntimeStage.test.ts` FIFO row at its 60 s budget under U5's load, green alone (`u7-final-solo.log.txt`, 40 passed in 20.3 s); `test:policy`, `test:config`, `test:setup`, and `test:guides` green alone over the same tree.
- **Timing readings** (`orchestrator-measurements.md` § M5 and § M6): a warm `prove` costs 4.2 s to 5.7 s through the built entry and about 4.3 s in process; the first answered `tools/call` lands at 16.2 s to 16.8 s after the spawn; `PROBE_DEADLINE` (30 s) clears both. The guide's stale boot and warm-prove rows are fix-g's subject.
- **Fix-g**: pending its checker and verifier.
