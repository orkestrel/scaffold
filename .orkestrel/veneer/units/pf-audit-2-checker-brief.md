# Audit round 2 — PAGE-FRAME (`pf`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on claims 1, 5, 7, and 8 of the claims file by reading alone: the status and diff file lists, the patches' file sets against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `pf-audit-2-claims.md`; `pf-2.diff`, `pf-2-status.txt`, `pf-shared-2.patch`, `b-cross-pf-report-2.md`, `b-cross-pf-brief-2.md`, `pf-instruments/` (the round-2 records, each name carrying `-2`: `pf-mutations-2.log.txt`, `pf-mutations-2.sh`, `pf-mutate-2.py`, the `pf-mutation-2-*` logs, `pf-2-red-setup-browser.log.txt`, `pf-2-green-setup-browser.log.txt`, `pf-2-gates.sh` and the `pf-2-gate-*` logs, `pf-2-guides.log.txt`, `pf-2-capture.sh`, `pf-2-capture-light-1280.log.txt`, `pf-2-frames-light-1280.log.txt`, and the two `pf-2-*-primary-hover-column.txt` readings), round 1's `pf.diff`, `pf-shared.patch`, `b-cross-pf-report.md`, and `b-cross-pf-brief.md`, and the round-1 verdict `pf-audit-verdict.md` and its lane verdicts; the design verdict `pf-design-verdict.md`; the frames under `/home/user/veneer-pf/tmp/capture/states/` from the round-2 `light-1280` run; the worktree `/home/user/veneer-pf` (the owned files over `dc92a09`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 5, 7, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
