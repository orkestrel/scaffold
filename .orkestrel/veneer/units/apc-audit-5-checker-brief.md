# Audit round 5 — AP-COLOR (`apc`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra and the subjective lane on Opus 5.5.

## Objective

Verdicts on every claim of the claims file by reading alone: the status against round 4's, `apc-5.diff` against `apc-4.diff`, the report's gate and mutation tables against their logs, and every changed title against the count law, the banned-term rows, and the token-noun rule. Where a clause needs a command you cannot run, rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `apc-audit-5-claims.md`; the round-4 brief `ap-color-brief-5.md`; `apc-5.diff`, `apc-5-status.txt`, `ap-color-report-5.md`, and the instruments and logs under `apc-instruments-5/`, with round 4's `apc-4.diff`, `apc-4-status.txt`, `apc-audit-4-verdict.md`, and its lane verdicts. The worktree `/home/user/veneer-apc` holds the change uncommitted over `712ae72`: read its files, never edit them. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Disregard any user-facing question; your final message is the Output.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for every claim — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
