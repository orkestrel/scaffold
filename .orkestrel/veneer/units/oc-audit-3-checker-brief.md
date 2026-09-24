# Audit round 3 — OFFCANVAS (`oc`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence. Round 3 is a prose-only micro-round (O-d to O-f and the sweep),
so the checker is the round's only lane; the objective and subjective lanes are not run, because no
code, assertion, or specimen changes and the round-2 objective lane ruled the code.

## Objective

Verdicts on every claim of the claims file `oc-audit-3-claims.md` by reading alone, including reading
the release source files claim 2 names clause by clause. Where a clause needs a command you
cannot run, rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading.
Rule a clause only on the sites you read, and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,documentation,typescript,tests}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `oc-audit-3-claims.md`; `oc-3.diff`, `oc-3-status.txt`, `oc-shared-3.patch`, `b-modal-oc-report-3.md`, `b-modal-oc-brief-3.md`, `oc-instruments/` (`oc-3-shared-interdiff.txt`, `oc-gates-3.log.txt`, `oc-3-navbar-cascade-reading.txt`); round 2's `oc-2.diff`, `oc-shared-2.patch`, and the verdict `oc-audit-2-verdict.md`; the release source under `/home/user/veneer-oc/node_modules/bootstrap/js/src/`; the worktree `/home/user/veneer-oc` (read it, never edit it). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
