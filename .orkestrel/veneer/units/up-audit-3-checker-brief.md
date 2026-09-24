# Audit round 3 — UTIL-PAINT (`up`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence. Round 3 is a prose-only micro-round (P-f and its tally sweep),
so the checker is the round's only lane; the objective and subjective lanes are not run, because no
code, assertion, or specimen changes and the round-2 objective lane ruled the code.

## Objective

Verdicts on every claim of the claims file `up-audit-3-claims.md` by reading alone. Where a clause needs a command you
cannot run, rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading.
Rule a clause only on the sites you read, and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,documentation,typescript,tests}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `up-audit-3-claims.md`; `up-3.diff`, `up-3-status.txt`, `up-shared-3.patch`, `up-unscoped-profiles-3.patch`, `b-utilities-up-report-3.md`, `b-utilities-up-brief-3.md`, `up-instruments/` (`up-3-sweep.py`, `up-3-sweep.log.txt`, `up-3-gates.log.txt`, `up-3-apply-check.log.txt`, `up-3-interdiff.txt`); round 2's `up-2.diff`, `up-shared-2.patch`, `up-unscoped-profiles-2.patch`, and the verdict `up-audit-2-verdict.md`; the worktree `/home/user/veneer-up` (read it, never edit it). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
