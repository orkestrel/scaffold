# Check brief — U7-fix-f (probe), mechanical closure

## Lane

`checker`, Sonnet, one clean context. Read only this brief and the evidence it names, run no command, edit nothing, and return per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

`/home/user/scaffold/.orkestrel/campaign/ts6-api/u7-fix-f-brief.md` (edits 1 to 5) and its report `u7-fix-f-report.md`. Governing files: `/home/user/scaffold/AGENTS.md` § Writing, `/home/user/scaffold/.claude/rules/tests.md` § Expensive proofs (probe's checkout carries no `.claude/rules/`).

## Review evidence

The fix-f slice as an interdiff: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u7-fix-f.slice.diff.txt` (`a/`: the tree after fix-e; `b/`: the tree now); the whole U7 change is `u7-fix-f.diff.txt`; the status is `u7-fix-f.status.txt`.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. The flagship receipts case's `timeout` is 120,000 ms; the lint-replacement case's `timeout` is 120,000 ms and its `deadline` 15,000 ms with its expiry message updated; the silenced-lint arming case's `deadline` is 15,000 ms with both message assertions and their comment updated; the FIFO teardown case's `timeout` is 120,000 ms and its `deadline` 15,000 ms; each retuned budget carries the contended-host comment.
2. The report's extensions beyond the brief's list — the two race guards raised from 7,000 ms to 16,000 ms so they fire after the retuned 15,000 ms budget — are right: each guard exists to lose the race to the probe's own expiry, so a guard below the budget would redden the case whatever the host, and the change does not alter what either case proves.
3. No budget outside the four cases changed, the fixture-source `timeout` strings inside generated specification text are unchanged, and the report's criteria match the slice.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
