# Audit round 6 — T5 TEST-FRAME (`t5`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra and the subjective lane on Opus 5.5.

## Objective

Verdicts on claims 1, 3, 5, and 6 of the claims file by reading alone: the status and diff file lists, the report's gate table against its own logs, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `t5-audit-6-claims.md`; `t5-6.diff`, `t5-6-status.txt`, `t5-test-frame-report-6.md` (its changes by symbol, the new cases with their red and green runs, the mutation series, and the gate table), the logs and instruments under `t5-instruments-6/` (the unit's red, green, mutation, digest, and gate logs across its four mutation series, its run and gate scripts, the retained mutation files under `t5-6-mutations/`, and the round-5 source copies), the round-5 reconciliation `t5-audit-5-verdict.md` with its three lane verdicts, the Orchestrator's offset probe `t5-instruments-5/t5-offset-probe.mjs` with its log, the withdrawn park-2 readings `t5-instruments-park2/park2-readings.md`, and the Orchestrator's consumer probe `t5-instruments-6/t5-veneer-probe-6.log.txt` with the journey and guide logs beside it; the worktree `/home/user/test-tf` (the round-6 owned files over `80c419e`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 3, 5, and 6 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
