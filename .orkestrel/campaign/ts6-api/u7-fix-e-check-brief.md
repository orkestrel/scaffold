# Check brief — U7-fix-e (probe), mechanical closure

## Lane

`checker`, Sonnet, one clean context. Read only this brief and the evidence it names, run no command, edit nothing, and return per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

`/home/user/scaffold/.orkestrel/campaign/ts6-api/u7-fix-e-brief.md` (edits 1 and 2) and its report `u7-fix-e-report.md`. Governing files: `/home/user/scaffold/AGENTS.md` § Writing, `/home/user/scaffold/.claude/rules/tests.md` (probe's checkout carries no `.claude/rules/`).

## Review evidence

The fix-e slice as an interdiff: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u7-fix-e.slice.diff.txt` (`a/`: the tree after fix-d; `b/`: the tree now); the whole U7 change is `u7-fix-e.diff.txt`; the status is `u7-fix-e.status.txt`.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. The guide's `TypeStageInterface` method table's `resolve` row names the mirrored copy with the mirror as the current directory, "against the workspace copy" appears nowhere in the guide, and the slice's guide hunks are that table's rows and padding alone.
2. The serialization case waits 1,000 ms between the two `prove` calls, its comment states the reason the brief fixes, the 20 ms wait before the rewrite is unchanged, and no other line of `tests/src/server/Probe.test.ts` changed.
3. The report's criteria and deviations match the slice, and nothing outside the two owned regions changed.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
