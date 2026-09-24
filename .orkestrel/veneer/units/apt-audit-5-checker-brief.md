# Audit round 5 — AP-TYPE (`apt`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra and the subjective lane on Opus 5.5.

## Objective

Verdicts on every claim of the claims file by reading alone: the status against round 4's, the round-5 per-file hunks in `apt-5.diff` against the same files' hunks in `apt-4.diff`, the report's gate table against its logs, and every changed sentence against the count law, the banned-term rows, and the token-noun rule. Where a clause needs a command you cannot run, rule the sub-clause UNRESOLVED and name the command. Rule a clause only on the sites you read, and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). The round-4 brief: `/home/user/scaffold/.orkestrel/veneer/units/ap-type-brief-5.md`; the round-3 verdict it carries: `apt-audit-4-verdict.md` beside it. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `apt-audit-5-claims.md`; `apt-5.diff`, `apt-5-status.txt`, `ap-type-report-5.md`, and the logs under `apt-instruments-5/`, with round 4's `apt-4.diff`, `ap-type-report-4.md`, `apt-audit-4-verdict.md`, its lane verdicts, and the round-2 mutation logs under `apt-instruments-2/`. The worktree `/home/user/veneer-apt` holds the change uncommitted over `712ae72`: read its files, never edit them. The unit was written by `builder` on Sonnet. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Disregard any user-facing question; your final message is the Output.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for every claim — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
