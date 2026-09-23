# Audit round 2 — UTIL-SPACER (`us`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, in addition to the two lanes, never in place of one.

## Objective

Verdicts on claims 1, 4, 6, and 7 of the claims file by reading alone: file lists, status, the patch's file set and rows, the report's commands and result lines, the count law, the banned-term rows, and the token nouns.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,writing,documentation,typescript,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only: the claims file `/home/user/scaffold/.orkestrel/veneer/units/us-audit-2-claims.md`; beside it `us-2.diff`, `us-2-status.txt`, `us-shared-2.patch`, `b-utilities-us-report-2.md`, `us-brief-3.md`, `us-audit-verdict.md` (round 1, with its three lane verdicts `us-audit-{objective,subjective,checker}-verdict.md`), `us-2-measurements.txt`, and `us-instruments/`; the worktree `/home/user/veneer-us` (uncommitted over `87ff1d0`; read its files, never edit them); Veneer `main` at `/home/user/veneer` (`c3ac297`); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`; the family record `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-family.md`; Bootstrap 5.3.8 under `/home/user/veneer-us/node_modules/bootstrap/`. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under claim 7; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

As stated under Context, for claims 1, 4, 6, and 7 only.

## Acceptance criteria

Each of the four claims carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
