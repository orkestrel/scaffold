# Audit round 2 — FRAME-HELPERS (`fh`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on claims 3, 5, and 6 of the claims file by reading alone: the status and diff file lists, the patches' file sets against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `fh-audit-2-claims.md`; `fh-2.diff` and `fh-2-status.txt` (both rounds against `5afa37b`), `fh-shared.patch`, `b-frame-helpers-report-2.md`, `b-frame-helpers-brief-2.md`, `fh-instruments/` (the round-2 records: `fh2-p1.sh`, `fh2-p1-red.log.txt`, `fh2-p1-green.log.txt`, `fh2-gates-2.sh`, the `fh2-*-2.log.txt` gate logs, the first-pass `fh2-*.log.txt` logs, and the `fh2-press-*` logs), round 1's `fh.diff` and `b-frame-helpers-report.md`, and the round-1 verdict `fh-audit-verdict.md` and its lane verdicts; the worktree `/home/user/veneer-fh` (the owned files over `5afa37b`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 3, 5, and 6 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
