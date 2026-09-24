# Audit round 2 — FOCUS-FRAME (`ff`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on claims 1, 3, and 6 of the claims file by reading alone: the status and diff file lists, the patches' file sets against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `ff-audit-2-claims.md`; `ff-2.diff` and `ff-2-status.txt` (both rounds against `e4a6d7c`), `ff-shared-2.patch`, `b-focus-frame-report-2.md`, `b-focus-frame-brief-2.md`, `ff-instruments/` (the round-2 records: `ff-mutations-2.log.txt`, the `ff-mut2-*` logs and diffs, the `ff-r2-*` and `ff-case-r2-*` logs, the `ff-2-gate-*` logs, the `ff-capture-r2-filtered-*` logs, `ff-final-2/` with its manifests and guard frames, and `ff-probes-2/` with the drive and pointer probes and their outputs), round 1's `ff.diff`, `ff-shared.patch`, and `b-focus-frame-report.md`, and the round-1 verdict `ff-audit-verdict.md` and its lane verdicts; the worktree `/home/user/veneer-ff` (the owned files over `e4a6d7c`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 3, and 6 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
