# Audit round 2 — PREFLIGHT-HOST (`pl`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on claims 2, 4, and 5 of the claims file by reading alone: the status and diff file lists, the patches' file sets against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `pl-audit-2-claims.md`; `pl-2.diff` and `pl-2-status.txt` (both rounds against `fc3ddfe`), `pl-shared-2.patch` and `pl-shared.patch`, `b-preflight-host-report-2.md`, `b-preflight-host-brief-2.md`, `pl-instruments/` (the round-2 records: `pl-mutations-2.log.txt`, `pl-mutations-2.sh`, `pl-scratch-2.sh`, `pl-r4-round1-base-defaults.log.txt`, and the `pl-*-2.log.txt` gate logs), round 1's `pl.diff` and `b-preflight-host-report.md`, the round-1 verdict `pl-audit-verdict.md` and its lane verdicts, and the patched guide `/home/user/veneer-pl/tmp/probe/pl-guide-patched-2.md`; the worktree `/home/user/veneer-pl` (the owned files over `fc3ddfe`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 2, 4, and 5 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
