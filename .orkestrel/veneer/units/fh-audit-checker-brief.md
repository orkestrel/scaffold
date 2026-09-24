# Audit round 1 — FRAME-HELPERS (`fh`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra and the subjective lane on Opus 5.5.

## Objective

Verdicts on claims 1, 2, and 8 of the claims file by reading alone: the status and diff file lists, the patch's file set against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `fh-audit-claims.md`; `fh.diff`, `fh-status.txt`, `fh-shared.patch`, `b-frame-helpers-report.md`, `fh-instruments/` (`fh-mutations.log.txt`, `fh-mutate.py`, `fh-mutation-runs.sh`, the `fh-mutation-*.log.txt` logs, the `fh-journey-*.log.txt` and `fh-baseline-*.log.txt` logs, `fh-compare.py` with `fh-compare-dark-1280.txt` and `fh-compare-light-390.txt`, `fh-setup-browser.log.txt`, `fh-test-setup.log.txt`, `fh-test-guides.log.txt`, `fh-test-policy.log.txt`, and the format, lint, and check logs), and the frames under `/home/user/veneer-fh/tmp/units/fh-final/<variant>/` (the final frames at `dark-1280`, `light-390`, and `dark-390`) and `/home/user/veneer-fh/tmp/units/fh-baseline/` (the base frames); `w2-w3-note-1.md`; the worktree `/home/user/veneer-fh` (the owned files over `5afa37b`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 2, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
