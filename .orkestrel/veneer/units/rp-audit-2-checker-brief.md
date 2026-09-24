# Audit round 2 — RP (Veneer re-pin: the staging case and the padding prose): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra and the subjective lane on Opus 5.5.

## Objective

Verdicts on claims 1, 2, 5, and 6 of the claims file by reading alone: the status and diff file lists, the report's gate table against its own logs, the grep the brief's acceptance criteria name, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Rule a clause only on the sites you read, and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `rp-audit-2-claims.md`; the briefs `rp-repin-brief.md` and `rp-repin-brief-2.md`; `rp-2.diff`, `rp-2-status.txt`, `rp-report-2.md`; the round-1 reconciliation `rp-audit-verdict.md` with its three lane verdicts; the logs and instruments under `rp-instruments/` (the round-2 `rp2-*` gate, red, and green logs, and the Orchestrator's control `rp-control-4.sh` with `rp-control-4.log.txt` and its two journey logs); `t5-instruments-park2/park2-readings.md`; the ruling `t5-park-ruling-verdict.md` and the sweep `unhover-sweep-report.md`; the worktree `/home/user/veneer-rp` (the changed files over `1ee0faf`; read them, never edit them; `git -C /home/user/veneer-rp show 1ee0faf:<path>` reads any base file; `node_modules/@orkestrel/test/dist/src/browser/` there is the round-5 build). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. For claims 1, 2, 5, and 6 only.

## Acceptance criteria

Each named claim carries a verdict with evidence; the terminal line is present.
