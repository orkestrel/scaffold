# Audit round 2 — BCF (`bcf`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on claims 1, 4, 7, and 8 of the claims file by reading alone: the status and diff file lists, the patches' file sets against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `bcf-audit-2-claims.md`; `bcf-3.diff` and `bcf-3-status.txt` (rounds 2 and 3 together against `f4e5693`), `bcf-2.diff`, `bcf-2-status.txt`, `bcf-shared-2.patch`, `b-collapse-bcf-report-2.md`, `b-collapse-bcf-report-3.md`, `b-collapse-bcf-brief-2.md`, `b-collapse-bcf-brief-3.md`, `bcf-instruments/` (the round-2 records: `bcf-mutations-2.log.txt`, `bcf-mutate-2.py`, the `bcf-mutation-2-*` logs, `bcf-gates-2.sh` and the `bcf-gates-2*` logs, `bcf-2-stem-prefix.log.txt`, `bcf-test-guides-2.log.txt`, `bcf-2-baseline-sections.log.txt`; the round-3 records: `bcf-mutations-3.log.txt`, `bcf-mutate-3.py`, the `bcf-mutation-3-*` logs, `bcf-3-red-before-fix.log.txt`, `bcf-3-cascade.log.txt`, `bcf-3-resting-dark-390.log.txt`, `bcf-gates-3.sh` and the `bcf-gates-3*` logs), round 1's `bcf.diff`, `bcf-shared.patch`, `b-collapse-bcf-report.md`, `b-collapse-bcf-brief.md`, and the round-1 verdict `bcf-audit-verdict.md` and its lane verdicts; `pf-design-verdict.md`; the worktree `/home/user/veneer-bcf` (the owned files over `f4e5693`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 4, 7, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
