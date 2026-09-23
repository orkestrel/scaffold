# Audit round 2 — NAV (`nv`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, in addition to the two lanes, never in place of one.

## Objective

Verdicts on claims 1, 3, 7, 8, and 9 of the claims file by reading alone: file lists and status, the patch's file set, the report's commands and result lines against the retained logs, the journey result lines, the count law, the banned-term rows, and the token nouns.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `nv-audit-2-claims.md`; `nv-2.diff`, `nv-2-status.txt`, `nv-shared-2.patch`, `b-collapse-nv-report-2.md`, `nv-brief-3.md`, `nv-audit-verdict.md` (round 1's reconciliation, with its lane verdicts beside it), round 1's `b-collapse-nv-report.md` and `nv-shared.patch`, and `nv-instruments-2/`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md`; the family record `b-collapse-family.md`; the worktree `/home/user/veneer-nv` (the owned files over `87ff1d0`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-nv show c3ac297:<path>` reads any landing-base file); Veneer `main` at `/home/user/veneer` has moved past `c3ac297`, so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 3, 7, 8, and 9 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
