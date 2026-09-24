# Audit round 1 — BACKGROUND-SIZE (`bz`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence. The unit is a fully specified builder unit, so
the checker is the round's lane; the objective and subjective lanes are not run, for that reason.

## Objective

Verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/bz-audit-claims.md` by reading
alone. Rule a clause only on the sites you read, and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,names,typescript,writing}.md`;
the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the verdict shape in
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references. Evidence, read-only,
under `/home/user/scaffold/.orkestrel/veneer/units/`: `bz-audit-claims.md`, `b-cross-bz-brief.md`,
`b-cross-bz-report.md`, `bz.diff`, `bz-status.txt`, `bz-instruments/`; the worktree
`/home/user/veneer-bz` (read its files, never edit them; `tests/src/styles/components/close.test.ts`
holds the pattern the brief names); D45 in `decisions-round-2.md`.

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
