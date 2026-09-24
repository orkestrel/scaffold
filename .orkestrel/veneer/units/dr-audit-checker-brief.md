# Audit round 1 — RESIDUE (`dr`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on every claim of the claims file `dr-audit-claims.md` by reading alone. Where a clause needs a
command you cannot run, rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that
reading. Rule a clause only on the sites you read, and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,writing}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `dr-audit-claims.md`; `dr.diff`, `dr-status.txt`, `b-cross-dr-report.md`, `b-cross-dr-brief.md`, `dr-instruments/`; the ruling X9 in `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md`; the worktree `/home/user/veneer-dr` (read it, never edit it). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
