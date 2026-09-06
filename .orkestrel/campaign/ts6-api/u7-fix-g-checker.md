# Checker — U7-fix-g (probe), over `u7-fix-g.slice.diff.txt`

Lane: `checker`, Sonnet, one clean context on `u7-fix-g-check-brief.md`. Returned 2026-09-06 17:41 UTC.

## Claim 1 — the cost table rows match `m6-boot.log.txt`

- `initialize`: the log reports 526 ms, 561 ms, 497 ms; the row reads "497 ms to 561 ms over 3 runs" (`guides/probe.md:1053`). PASS.
- `tools/call` boot: the log reports 16786, 16712, 16154 ms; the row reads "16.2 s to 16.8 s over 3 runs" (`guides/probe.md:1054`). PASS.
- warm `prove`: the log reports 5692, 4509, 4211 ms; the row reads "4.2 s to 5.7 s over 3 runs" (`guides/probe.md:1055`). PASS.

PASS. Evidence: `m6-boot.log.txt:1-6`, `guides/probe.md:1053-1055`.

## Claim 2 — the date clause and the slice's bounds

The introductory paragraph reads "They were taken on 2026-09-06, over this repository..." (`guides/probe.md:1045-1046`) and names no other date; no occurrence of 2026-08-20 between `## Cost` and `## Tests` (`guides/probe.md:1043-1078`). Both hunks of `u7-fix-g.slice.diff.txt:3-32` fall between those headings and the slice carries no other hunk. PASS.

## Claim 3 — the added sentence and the section's prose

The added sentence at `guides/probe.md:1070-1071` matches the brief's edit 5 verbatim (`u7-fix-g-brief.md:36`). A sweep of the section (`guides/probe.md:1043-1078`) for every substitution-table term finds no hit. The prose states no count of a growable set; "one `prove`" and "about one warm call" name a protocol fact and an offset, and the run counts sit in table rows as measurements. PASS.

## Claim 4 — the report's criteria match the slice

CANNOT RULE. The only evidence for the scoped `git diff --stat -- guides/probe.md` result, the `oxfmt --check` exit code, and the `test:guides` exit code is the writer's self-report (`u7-fix-g-report.md:28,32,34`); no independently captured command output was supplied. `u7-fix-g.status.txt:1-21` corroborates only that the tree carries the prior units' dirty files, consistent with the report's account, not the scoped diff-stat result.

VERDICT: FAIL 4

## Orchestrator's reading

Claim 4 was briefed with no independent evidence, which is the brief's defect: the checker runs no command. The interdiff that produced the slice compared the whole `src/` and `tests/` trees against the post-fix-f worktree with `diff -rq` and printed no difference, so the unit's write reached `guides/probe.md` alone; the gate exits are the fix-g verifier's independent run (`u7-fix-g-verify-report.md`). Claim 4 is ruled on those two records.
