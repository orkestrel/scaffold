# Audit round 2 — NAVBAR (`nb`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, in addition to the two lanes, never in place of one.

## Objective

Verdicts on claims 1, 2, 7, and 8 of the claims file by reading alone: file lists and status, the three patches' file sets and their round-to-round deltas against the round-1 patches, each retained log against the reading the report states, the report's commands and result lines against the retained logs, the count law, the banned-term rows, and the token nouns. Where a clause needs a command you cannot run (a hash, an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `nb-audit-2-claims.md`; `nb-2.diff`, `nb-2-status.txt`, `nb-shared-2.patch`, `nb-offlimits-2.patch`, `nb-retirement-2.patch`, `b-collapse-nb-report-2.md`, `nb-brief-2.md`, the round-1 record `nb.diff`, `nb-shared.patch`, `b-collapse-nb-report.md`, `nb-audit-verdict.md`, `nb-audit-objective-verdict.md`, `nb-audit-subjective-verdict.md`, `nb-audit-checker-verdict.md`, `b-collapse-family.md`, and `nb-instruments-2/`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md`; the worktree `/home/user/veneer-nb` (the owned files over `a658879`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-nb show a658879:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `a658879`, so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 2, 7, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
