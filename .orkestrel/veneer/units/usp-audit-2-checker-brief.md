# Audit round 2 — UTIL-SPACING (`usp`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on claims 1, 4, 5, 6, and 7 of the claims file by reading alone: the status and diff file lists, the patches' file sets against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `usp-audit-2-claims.md`; `usp-2.diff`, `usp-2-status.txt`, `usp-shared-2.patch`, `b-utilities-usp-report-2.md`, `b-utilities-usp-brief-2.md`, `usp-instruments/` (the round-2 records: `usp-mutations-2.log.txt`, `usp-mutate-2.sh`, `usp-cascade-2.mjs`, `usp-cascade-controls-2.sh`, `usp-gates-2.sh`, `usp-gates-2.log.txt`, `usp-guides-2.log.txt`, `usp-service-2.sh`, `usp-service-2.log.txt`, `usp-2-owned-interdiff.txt`, and `usp-2-shared-interdiff.txt`), round 1's `usp.diff`, `usp-shared.patch`, and `b-utilities-usp-report.md`, and the round-1 verdict `usp-audit-verdict.md` and its lane verdicts; `w2-w3-note-1.md` to `w2-w3-note-5.md` and the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`; the worktree `/home/user/veneer-usp` (the owned files over `2a3f223`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 4, 5, 6, and 7 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
