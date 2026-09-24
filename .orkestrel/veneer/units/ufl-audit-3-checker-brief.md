# Audit round 3 — UTIL-FLOW (`ufl`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence. Round 3 is a prose-only micro-round (U6, a
comment and TSDoc sweep), so the checker is the round's only lane; the objective and subjective lanes
are not run, because no code, assertion, or guide sentence changes and the round-2 verdict ruled the
code.

## Objective

Verdicts on every claim of the claims file `ufl-audit-3-claims.md` by reading alone. Where a clause
needs a command you cannot run (an apply check or a byte comparison), rule the sub-clause UNRESOLVED
and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read,
and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,documentation,typescript,tests}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `ufl-audit-3-claims.md`; `ufl-3.diff`, `ufl-3-status.txt`, `ufl-shared-3.patch`, `ufl-routeb-3.patch`, `b-utilities-ufl-report-3.md`, `b-utilities-ufl-brief-3.md`, `ufl-instruments/` (`ufl-sweep-3.py`, `ufl-sweep-3.txt`, `ufl-sweep-3-after.txt`, `ufl-3-shared-interdiff.txt`, `ufl-3-*.log.txt`); round 2's `ufl-2.diff`, `ufl-shared-2.patch`, `ufl-routeb-2.patch`, and the verdict `ufl-audit-2-verdict.md`; `w2-w3-note-1.md`; the worktree `/home/user/veneer-ufl` (the owned files over `2a3f223`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
