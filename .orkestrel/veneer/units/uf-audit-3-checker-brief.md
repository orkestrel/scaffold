# Audit round 3 — UTIL-FONT (`uf`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence. Round 3 is a prose-only micro-round (F-d and its count sweep),
so the checker is the round's only lane; the objective and subjective lanes are not run, because no
code, assertion, or specimen changes and the round-2 objective lane ruled the code.

## Objective

Verdicts on every claim of the claims file `uf-audit-3-claims.md` by reading alone. Where a clause needs a command you
cannot run, rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading.
Rule a clause only on the sites you read, and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,documentation,typescript,tests}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `uf-audit-3-claims.md`; `uf-3.diff`, `uf-3-status.txt`, `uf-shared-3.patch`, `b-utilities-uf-report-3.md`, `b-utilities-uf-brief-3.md`, `uf-instruments/` (`uf-fd.py`, `uf-gates-3.sh`, `uf-gates-3.log.txt`, `uf-3-shared-interdiff.txt`); round 2's `uf-2.diff`, `uf-shared-2.patch`, and the verdict `uf-audit-2-verdict.md`; the worktree `/home/user/veneer-uf` (read it, never edit it). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
