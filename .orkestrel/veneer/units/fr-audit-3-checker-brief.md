# Audit round 3 — FORMS-FRAMES (`fr`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on claims 1, 3, and 4 of the claims file by reading alone: the status and diff file lists, the patches' file sets against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `fr-audit-3-claims.md`; `fr-3.diff` and `fr-3-status.txt` (all rounds against `e4a6d7c`), `fr-shared-3.patch`, `b-forms-frames-report-3.md`, `b-forms-frames-brief-3.md`, `fr-instruments/` (the round-3 records: `fr-mutations-3.log.txt`, `fr3-mutate.sh`, the `fr3-mutate-*` logs, `fr3-plant-check.log.txt`, the `fr3-gate-*` logs, and `fr3-capture-light-1280-filtered.log.txt`), round 2's `fr-2.diff`, `fr-shared-2.patch`, and `b-forms-frames-report-2.md`, and the round-2 verdict `fr-audit-2-verdict.md` and its lane verdicts; the worktree `/home/user/veneer-fr` (the owned files over `e4a6d7c`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 3, and 4 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
