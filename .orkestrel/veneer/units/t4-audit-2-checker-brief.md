# Audit round 2 — T4 TEST-CLIP: checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra; no subjective lane runs on this bounded repair.

## Objective

Verdicts on claims 4 and 5 of the claims file by reading alone: the guide's rows and sentences against the TSDoc and the writing rule, the delta's file set (four owned files this round), the code law, the absence of an inline matrix, and the gate log's exit lines. Where a clause needs a command you cannot run, rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{typescript,tests,browser,documentation,writing,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `t4-audit-claims-2.md`; `t4-2.diff`, `t4-2-status.txt`, `t4-test-clip-brief-2.md`, `t4-2-gates.log.txt`, the round-1 record `t4.diff` and `t4-audit-checker-verdict.md`; the checkout `/home/user/test` (the working tree carries the uncommitted unit; read it, never edit it). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 4 and 5 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the terminal line is present.
