# Audit round 1 — UTIL-PLACEMENT (`upl`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, in addition to the two lanes, never in place of one.

## Objective

Verdicts on claims 1, 5, 7, and 8 of the claims file by reading alone: file lists and status, the patches' file sets and removals, the registry rows and subjects against the specimens, the report's commands and result lines against the retained logs, the count law, the banned-term rows, and the token nouns.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `upl-audit-claims.md`; `upl.diff`, `upl-status.txt`, `upl-shared.patch`, `upl-consumer.patch`, `upl-shared-index.patch`, `b-utilities-upl-report.md`, `b-utilities-upl-brief.md`, `b-utilities-family.md`, the UTIL-SPACER precedent `b-utilities-us-report-3.md` and `us-shared-3.patch`, and `upl-instruments/`; the design verdicts `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md` and `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (M3, M4); the worktree `/home/user/veneer-upl` (the owned files over `e4e6a40`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-upl show e4e6a40:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `e4e6a40`, so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 5, 7, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
