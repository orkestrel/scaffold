# Audit round 3 — T5 TEST-FRAME (`t5`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra and the subjective lane on Opus 5.5.

## Objective

Verdicts on claims 1, 6, and 8 of the claims file by reading alone: the status and diff file lists, the report's gate table against its own logs, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `t5-audit-3-claims.md`; `t5-3.diff`, `t5-3-status.txt`, `t5-test-frame-report-3.md` (its findings, proofs, mutation table, and gate table), the logs and instruments under `t5-instruments-3/` (the red, green, mutation, gate, and probe logs, `t5-3-run.sh`, `t5-3-gates.sh`, the retained mutation files under `t5-3-mutations/`, the digest `t5-3-test-final.sha256.txt`, and the round-2 source copies), the round-2 reconciliation `t5-audit-2-verdict.md` with its three lane verdicts, and the round-2 consumer probe `t5-instruments-2/t5-veneer-probe-2.log.txt`; the worktree `/home/user/test-tf` (the round-3 owned files over `80c419e`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 6, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
