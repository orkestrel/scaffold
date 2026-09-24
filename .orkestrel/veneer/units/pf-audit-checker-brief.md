# Audit round 1 — PAGE-FRAME (`pf`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra and the subjective lane on Opus 5.5.

## Objective

Verdicts on claims 1, 7, and 8 of the claims file by reading alone: the status and diff file lists, the patch's file set against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `pf-audit-claims.md`; `pf.diff`, `pf-status.txt`, `pf-shared.patch`, `b-cross-pf-report.md`, `pf-instruments/` (`pf-mutations.log.txt`, `pf-mutations.sh`, `pf-mutate.py`, the `pf-mutation-*.log.txt` logs, `pf-red-setup-browser.log.txt`, `pf-green-setup-browser.log.txt`, `pf-gates.sh` and `pf-gates.log.txt`, `pf-capture.sh` and the `pf-capture-*.log.txt` logs, `pf-frames.log.txt`, `pf-png.py`, and the `pf-heights-*` readings and probe copies), and the frames under `/home/user/veneer-pf/tmp/capture/states/` (`bottom-offcanvas--light-390.png`, `showcase--light-1280.png`, `primary-hover--light-1280.png`, `page-strip-focus--light-390.png`, `range-focus--light-390.png`, and any other frame a claim names); `w2-w3-note-1.md`; the worktree `/home/user/veneer-pf` (the owned files over `dc92a09`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 7, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
