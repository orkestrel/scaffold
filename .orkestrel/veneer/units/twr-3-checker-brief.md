# TAILWIND-RECIPE round 3 — checker read

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only. Perform the read directly and spawn nothing. Read
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{names,typescript,tests,writing}.md`. No skill
applies.

## Objective

Rule claims 2, 3, and 5 of `/home/user/scaffold/.orkestrel/veneer/units/twr-audit-3-claims.md`: whether round 3 applied
the Items of `tailwind-recipe-brief-3.md` exactly, and nothing else. `analyst` on GPT-6 Astra rules claims 1 and 4
beside you.

## Evidence

All under `/home/user/scaffold/.orkestrel/veneer/units/`: the brief; the claims file; the report
`tailwind-recipe-report-3.md`; `twr-3.diff`, `twr-3-status.txt`, and the round-2 diff `twr-2.diff`; and
`twr-instruments/r3/`. The worktree `/home/user/veneer-twr` holds the change uncommitted; read its files and never edit
them.

## Output

A numbered verdict for claims 2, 3, and 5 (CONFIRMED, BROKEN, or NOT-EVIDENCED) with the `file:line` or diff line behind
it, findings outside the claims to the same standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>`.
