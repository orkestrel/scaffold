# Audit round 2 — THEME (`ct`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on claims 1, 5, and 6 of the claims file by reading alone: the status and diff file lists, the patches' file sets against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `ct-audit-2-claims.md`; `ct2.diff`, `ct2-status.txt`, `ct2-shared.patch` (all against `ac74459`, which carries round 1 as `595ac02`), `b-cross-ct-report-2.md`, `b-cross-ct-brief-3.md`, `ct2-instruments/` (`ct2-mutations.log.txt`, `ct2-mutate.py`, the `ct2-mutation-*` logs, `ct2-gates.sh`, `ct2-gates.log.txt` and the `ct2-gate-*` logs, `ct2-oracle-alone.log.txt`, `ct2-r1-green.log.txt`, and `ct2-lint-plant.log.txt`), round 1's `ct.diff`, `ct-shared.patch`, `ct-unscoped.patch`, and `b-cross-ct-report.md`, the round-1 verdict `ct-audit-verdict.md` and its lane verdicts, and the design verdict `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` (X3 and X8); the worktree `/home/user/veneer-ct2` (the owned files over `ac74459`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 5, and 6 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
