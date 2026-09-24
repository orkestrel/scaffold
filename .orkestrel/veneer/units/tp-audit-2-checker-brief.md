# Audit rounds 2 and 3 — TIP (`tp`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on claims 1, 7, and 8 of the claims file by reading alone: the status and diff file lists, the patch's file set against the brief's Shared list and the Orchestrator's grants, every clause each named claim states that a reading can settle, and every added or changed sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `tp-audit-2-claims.md`; `tp-2.diff`, `tp-2-status.txt`, `tp-shared-2.patch`, `tp-shared-3.patch`, `b-modal-tp-report-2.md`, `b-modal-tp-report-3.md`, `b-modal-tp-brief-2.md`, `b-modal-tp-brief-3.md`, `tp-instruments/` (the round-2 and round-3 logs, `tp-shared-2-vs-1.diff`, and `tp-guide-3-vs-2.diff`), round 1's `tp.diff` and `tp-shared.patch`, the round-1 verdict `tp-audit-verdict.md`, and `w2-w3-note-1.md`; the worktree `/home/user/veneer-tp` (the owned files over `2a3f223`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 7, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
