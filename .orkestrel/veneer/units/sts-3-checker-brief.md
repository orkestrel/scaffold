# STATES round 3 — checker read

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only. Perform the read directly and spawn nothing. Read
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{tests,writing}.md`. No skill applies.

## Objective

Rule whether round 3 applied Items 1 and 2 of `/home/user/scaffold/.orkestrel/veneer/units/states-brief-3.md` exactly,
and nothing else.

## Evidence

All under `/home/user/scaffold/.orkestrel/veneer/units/`: the brief `states-brief-3.md`; the report
`states-report-3.md`; the round-3 diff `sts-3.diff` (`git diff 2376710` in `/home/user/veneer-sts`) and
`sts-3-status.txt`; the round-2 diff `sts-2.diff`; and the logs under `sts-instruments/r3/`. The worktree
`/home/user/veneer-sts` holds the change uncommitted; read its files and never edit them.

## Claims

1. **Item 1.** § Form range classes in `guides/veneer.md` holds Item 1's sentence verbatim, and the replaced sentence
   is gone.
2. **Item 2.** The producer in the case `runs the thumb fill transition with motion allowed and lands each fill at once
   under reduced motion` returns `started`, then `held`, then `frame`, with the same expressions as before, and
   nothing else in the case changed.
3. **Scope.** Between `sts-2.diff` and `sts-3.diff`, only `guides/veneer.md` and
   `tests/src/styles/components/form-range.test.ts` change, and only at the Items' sites.
4. **Gates.** The logs under `sts-instruments/r3/` read exit 0 for check, lint, the oxfmt check, the styles build, the
   form-range file, guides, and policy.

## Output

A numbered verdict per claim (CONFIRMED, BROKEN, or NOT-EVIDENCED) with the `file:line` or log line behind it, findings
outside the claims to the same standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>`.
