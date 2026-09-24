# Audit round 2 — OVERLAY-FRAMES (`fo`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on claims 1, 4, and 5 of the claims file by reading alone: the status and diff file lists, the patches' file sets against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `fo-audit-2-claims.md`; `fo-2.diff` and `fo-2-status.txt` (both rounds against `cf5e447`), `fo-shared-2.patch`, `b-overlay-frames-report-2.md`, `b-overlay-frames-brief-2.md`, `fo-instruments/` (the round-2 records: `fo-mutations-2.log.txt`, `fo-mutate-2.py`, the `fo-chevrons-2-*` readings, and the round-2 gate and capture logs; the round-1 records beside them), round 1's `fo.diff`, `fo-shared.patch`, and `b-overlay-frames-report.md`, the round-1 verdict `fo-audit-verdict.md` and its lane verdicts, and the frames under `/home/user/veneer-fo/tmp/capture/states/` (the `captioned-carousel`, `captioned-carousel-hover`, and `fading-carousel-*` frames at `light-1280` and `dark-390`); the worktree `/home/user/veneer-fo` (the owned files over `cf5e447`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 4, and 5 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
