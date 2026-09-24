# Audit round 1 — JOURNEY-BUDGET (`jb`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence. The unit is a fully specified builder unit, so
the checker is the round's lane; the objective and subjective lanes are not run, for that reason.

## Objective

Verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/jb-audit-claims.md` by reading
alone. Rule a clause only on the sites you read, and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,names,typescript,writing}.md`;
the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the verdict shape in
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references. Evidence, read-only,
under `/home/user/scaffold/.orkestrel/veneer/units/`: `jb-audit-claims.md`, `b-cross-jb-brief.md`,
`b-cross-jb-report.md`, `jb.diff`, `jb-status.txt`, `jb-instruments/`; the worktree
`/home/user/veneer-jb` (read its files, never edit them; `tests/setupServer.ts` and
`tests/setupService.ts` hold `ORACLE_TIMEOUT` and `STAGE_TIMEOUT`).

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing; edit nothing; run nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else: per-claim verdicts with `file:line`; findings
outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each claim carries a verdict with evidence; the terminal line is present.
