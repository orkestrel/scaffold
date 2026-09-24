# Audit round 4 — TIP (`tp`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence. Round 4 is a prose-only micro-round (P7 to P9 and the claim sweep),
so the checker is the round's only lane; the objective and subjective lanes are not run, because no
code, assertion, or specimen changes and the rounds 2 and 3 objective lane ruled the code.

## Objective

Verdicts on every claim of the claims file `tp-audit-4-claims.md` by reading alone, including reading
the assertions and the release source each claim names. Where a clause needs a command you
cannot run, rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading.
Rule a clause only on the sites you read, and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,documentation,typescript,tests}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `tp-audit-4-claims.md`; `tp-4.diff`, `tp-4-status.txt`, `tp-shared-4.patch`, `b-modal-tp-report-4.md`, `b-modal-tp-brief-4.md`, `tp-instruments/` (the round-4 interdiffs, sweep extracts, instruments, and gate and check logs); round 3's `tp-3.diff` and `tp-shared-3.patch`, and the verdict `tp-audit-2-verdict.md`; the release source under `/home/user/veneer-tp/node_modules/bootstrap/js/src/`; the worktree `/home/user/veneer-tp` (read it, never edit it). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
