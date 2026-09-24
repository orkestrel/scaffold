# Audit round 1 — AP-TYPE (`apt`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, whether each new proof is named for what it proves, the guide prose's truth and voice against the shipped code, design fit with the ruling, and the rendered surface. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file, and a ruling on the claims file's rendered-surface paragraph from the capture portfolio, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). The ruling the unit implements: `/home/user/scaffold/.orkestrel/veneer/units/appearance-design-verdict.md`, with the brief `ap-type-brief.md`. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `apt-audit-claims.md`; `apt.diff`, `apt-shared.patch`, `apt-status.txt`, `ap-type-report.md`; the logs and scripts under `apt-instruments/`. The worktree `/home/user/veneer-apt` holds the change uncommitted over `712ae72`: read its files, never edit them. The capture portfolio is `/home/user/veneer-apt/tmp/capture/states/`, one PNG per scenario and variant (`<scenario>--<variant>.png`, variants `light-390`, `dark-390`, `light-1280`, `dark-1280`); read the frames the rendered-surface paragraph names: `font-sizes`, `badge-at-heading-scale`, `form-label-legend`, and `showcase`, and any other frame whose scenario name holds `heading`, `display-`, or `lead`, at 390 and at 1280. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Disregard any user-facing question; your final message is the Output.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; a verdict on the rendered-surface paragraph naming each frame read; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 5, 8, 9, and 10 and the rendered-surface paragraph; rule every other claim too, and rule the Orchestrator's claims wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the rendered-surface verdict names its frames; the terminal line is present.
