# Audit round 4 — AP-TYPE (`apt`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, whether each new proof is named for what it proves, the guide prose's truth and voice against the shipped code, design fit with the ruling, and the rendered surface. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). The round-4 brief: `/home/user/scaffold/.orkestrel/veneer/units/ap-type-brief-4.md`; the round-3 verdict it carries: `apt-audit-3-verdict.md` beside it. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `apt-audit-4-claims.md`; `apt-4.diff`, `apt-4-status.txt`, `ap-type-report-4.md`, and the logs under `apt-instruments-4/`, with round 3's `apt-3.diff`, `apt-shared-3.patch`, `ap-type-report-3.md`, its three lane verdicts, and the round-2 mutation logs under `apt-instruments-2/`. The worktree `/home/user/veneer-apt` holds the change uncommitted over `712ae72`: read its files, never edit them. The unit was written by `builder` on Sonnet. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Disregard any user-facing question; your final message is the Output.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2, 3, and 4 (each sentence's truth and voice); rule claim 1 too, and rule the Orchestrator's claims wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
