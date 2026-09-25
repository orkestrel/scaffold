# E-ID-BUTTON-CLASSES round 3 — checker read

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only. Perform the read directly and spawn nothing. Read
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{names,typescript,tests,writing}.md`. No skill
applies.

## Objective

Rule claims 3, 4, and 5 of `/home/user/scaffold/.orkestrel/veneer/units/ebcl-audit-3-claims.md`: whether round 3 applied
the rename and the guide sentence of `e-id-button-classes-brief-3.md` (Items 1, 2, 3, and 5) exactly, and nothing else.
`analyst` on GPT-6 Astra rules claims 1, 2, and 6 beside you.

## Evidence

All under `/home/user/scaffold/.orkestrel/veneer/units/`: the brief `e-id-button-classes-brief-3.md`; the claims file;
the report `e-id-button-classes-report-3.md`; the round-3 diff `ebcl-3.diff` and `ebcl-3-status.txt`; the round-2 diff
`ebcl-2.diff`; and `ebcl-instruments/r3/`. The worktree `/home/user/veneer-ebcl` holds the change uncommitted; read its
files and never edit them.

## Output

A numbered verdict for claims 3, 4, and 5 (CONFIRMED, BROKEN, or NOT-EVIDENCED) with the `file:line` or diff line behind
it, findings outside the claims to the same standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>`.
