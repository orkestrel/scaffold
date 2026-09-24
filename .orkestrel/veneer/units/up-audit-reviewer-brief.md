# Audit round 1 — UTIL-PAINT (`up`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the family record, and the landed UTIL-DISPLAY and UTIL-PLACEMENT precedent. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `up-audit-claims.md`; `up.diff`, `up-status.txt`, `up-shared.patch`, `up-unscoped-profiles.patch`, `b-utilities-up-report.md`, `b-utilities-up-brief.md`, `up-instruments/` (the per-file split, the mutation instruments and logs, the negative controls, the cascade count, the Tailwind longhand and profile-layer readings, and every copy gate log); `b-utilities-family.md`, `b-utilities-w3-terrain-report.md`, `b-utilities-terrain-report.md`, `w2-w3-note-1.md`, `w2-w3-note-2.md`, and the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`; the worktree `/home/user/veneer-up` (the owned files over `2a3f223`; read them, never edit them; `git -C /home/user/veneer-up show 2a3f223:<path>` reads any base file, including the landed `src/styles/utilities/_display.scss` and `_position.scss`, `app/browser/sections/DisplaySection.ts` and `PositionSection.ts`, and their proofs, the precedent this unit copies; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2 (the rounded entries beside the border entries, and the guarded opacity entries), 4 (whether the profiles patch keeps each case's intent), 6 (specimen names, the captioned swatches, the region copy), and 7 (every added guide sentence against what ships, note 1, and the writing rule); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
