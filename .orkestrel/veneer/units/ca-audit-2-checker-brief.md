# Audit round 2 — CAROUSEL (`ca`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, in addition to the two lanes, never in place of one.

## Objective

Verdicts on claims 1, 2, 7, and 8 of the claims file by reading alone: file lists and status, the round delta, the patch's file set and removals, each mutation log's `RUN` line and red cases against the mutation record, the report's commands and result lines against the retained logs, the count law, the banned-term rows, and the token nouns.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `ca-audit-2-claims.md`; `ca-2.diff`, `ca-2-status.txt`, `ca-shared-2.patch`, `b-modal-ca-report-2.md`, `ca-brief-2.md`, `ca-audit-verdict.md` (round 1's reconciliation, with its lane verdicts `ca-audit-objective-verdict.md`, `ca-audit-subjective-verdict.md`, and `ca-audit-checker-verdict.md` beside it), round 1's `b-modal-ca-report.md`, `ca-shared.patch`, and `ca-instruments/`, and `ca-instruments-2/`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`; the terrain `b-modal-terrain-report.md`; the worktree `/home/user/veneer-ca` (the owned files over `c3ac297`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-ca show c3ac297:<path>` reads any landing-base file); Veneer `main` at `/home/user/veneer` has moved past `c3ac297`, so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 2, 7, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
