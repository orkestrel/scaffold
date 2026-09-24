# Audit round 3 — AP-TYPE (`apt`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, whether each new proof is named for what it proves, the guide prose's truth and voice against the shipped code, design fit with the ruling, and the rendered surface. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). The ruling the unit implements: `/home/user/scaffold/.orkestrel/veneer/units/appearance-design-verdict.md`, with the round-2 brief `ap-type-brief-2.md` and the round-3 brief `ap-type-brief-3.md`. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `apt-audit-3-claims.md`; `apt-3.diff`, `apt-shared-3.patch`, `apt-3-status.txt`, `ap-type-report-3.md`, with round 2's `apt-2.diff`, `apt-shared-2.patch`, `apt-audit-2-verdict.md`, and its three lane verdicts; the round-3 logs under `apt-instruments-3/` and the round-2 logs and scripts under `apt-instruments-2/`. The worktree `/home/user/veneer-apt` holds the change uncommitted over `712ae72`: read its files, never edit them. The round-1 capture portfolio is `/home/user/veneer-apt/tmp/capture/states/`, and the Orchestrator's type capture is `appearance-instruments/apt-type--<mode>-<width>.png`; round 2 changes no rule, so read frames only where a claim needs them. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Disregard any user-facing question; your final message is the Output.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2, 3, 4, and 6 (the titles and labels, the guide sentences' truth and voice); rule every other claim too, and rule the Orchestrator's claims wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
