# Audit round 3 — FADE (`cf`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence. Round 3 is a one-clause prose round, so the
checker is the round's lane, as for OFFCANVAS's prose round; the objective and subjective lanes are not
run, for that reason.

## Objective

Verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/cf-audit-3-claims.md` by reading
alone. Rule a clause only on the sites you read, and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,writing,typescript}.md`;
the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the verdict shape in
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references. Evidence, read-only,
under `/home/user/scaffold/.orkestrel/veneer/units/`: `cf-audit-3-claims.md`, `b-cross-cf-brief-3.md`,
`cf-audit-2-verdict.md`, `b-cross-cf-report-3.md`, `cf-shared-2.patch`, `cf-shared-3.patch`, and under
`cf-instruments/` the `cf-3-interdiff.txt` file, `cf-3-gates.sh`, `cf-3-gates.log.txt`, and the
`cf-3-gate-*` logs.

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
