# Audit round 2 — CLOSE-OUT (`xo`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on claims 1, 3, and 5 of the claims file by reading alone: the status and diff file lists, the patches' file sets against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `xo-audit-2-claims.md`; `xo-2.diff`, `xo-2-status.txt`, `xo-shared-2.patch`, `xo-unscoped.patch`, `b-close-out-report-2.md`, `b-close-out-brief-2.md`, `xo-instruments/` (the round-2 records: `xo-mutations-2.log.txt`, `xo-mutate-2.sh`, `xo-mutate-py-2.sh`, `xo-plant-carousel-2.py`, the `xo-mutation-*` logs of round 2, and the `xo-2-scratch-*` logs), round 1's `xo.diff`, `xo-shared.patch`, and `b-close-out-report.md`, and the round-1 verdict `xo-audit-verdict.md` and its lane verdicts; the worktree `/home/user/veneer-xo` (the owned files over `ec98064`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 3, and 5 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
