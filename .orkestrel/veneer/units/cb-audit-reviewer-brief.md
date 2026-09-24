# Audit round 1 — BARE-BUTTON (`cb`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the family record, and the base elements partial and the shell it replaces. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `cb-audit-claims.md`; `cb.diff`, `cb-status.txt`, `cb-shared.patch`, `b-cross-cb-report.md`, `b-cross-cb-brief.md`, `cb-instruments/` (`cb-mutate.sh`, `cb-mutations.log.txt`, `cb-red.log.txt`, `cb-green.log.txt`, `cb-matrix.txt`, `cb-forms-probe.ts.txt`, `cb-cascade-before.txt`, `cb-cascade-after.txt`, `cb-conformance-unpatched.log.txt`, `cb-app-unpatched.log.txt`, and the baseline, gate, and scratch logs); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-cross-cb-design-verdict.md`, the planner and analyst proposals `b-cross-cb-design-planner-proposal.md` and `b-cross-cb-design-analyst-proposal.md`, V9 in `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-cb` (the owned files over `a9dff19`; read them, never edit them; `git -C /home/user/veneer-cb show a9dff19:<path>` reads any base file, including the base `src/styles/elements/_button.scss`, `app/browser/styles/_shell.scss`, `app/browser/Showcase.ts`, and `app/browser/constants.ts`; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2 (whether the scope reads as the elements layer's bare-button subject), 3 (the coverage matrix as a design account), 5 (the `data-control` name and hook), and 7 (every added guide sentence against what ships, and the writing rule); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
