# Check brief — U7-fix-g (probe), mechanical closure

## Lane

`checker`, Sonnet, one clean context. Read only this brief and the evidence it names, run no command, edit nothing, and return per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

`/home/user/scaffold/.orkestrel/campaign/ts6-api/u7-fix-g-brief.md` (edits 1 to 6) and its report `u7-fix-g-report.md`. Governing files: `/home/user/scaffold/AGENTS.md` § Writing and `/home/user/scaffold/.claude/rules/writing.md` (probe's checkout carries no `.claude/rules/`). The measurement behind the rows: `/home/user/scaffold/.orkestrel/campaign/ts6-api/m6-boot.log.txt`.

## Review evidence

The fix-g slice as an interdiff: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u7-fix-g.slice.diff.txt` (`a/`: the tree after fix-f; `b/`: the tree now); the whole U7 change is `u7-fix-g.diff.txt`; the status is `u7-fix-g.status.txt`.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. The § Cost table of `guides/probe.md` carries the answered-`initialize` row at 497 ms to 561 ms over 3 runs, the first-answered-`tools/call` boot row at 16.2 s to 16.8 s over 3 runs, and the warm-`prove` row at 4.2 s to 5.7 s over 3 runs, and each range is what `m6-boot.log.txt` reports (the minimum and the maximum of the three rounds, rounded as the row states).
2. The introductory paragraph under `## Cost` names 2026-09-06 as the date of every reading and names 2026-08-20 nowhere in the section, and no other line of the guide changed: the slice touches only lines between the `## Cost` and `## Tests` headings.
3. The added sentence in the "Boot is dominated by arming" paragraph reads as the brief's edit 5 states, and the section's prose passes `.claude/rules/writing.md`: no banned term from its substitution table, no count stated in prose (a range with its run count in a table row is a measurement, not a count).
4. The report's criteria match the slice: `git diff --stat` names only `guides/probe.md`, `npx oxfmt --check guides/probe.md` exit 0, and `npm run test:guides` exit 0 or a timing observation as the brief permits.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
