# Audit round 1 — T5 TEST-FRAME (`t5`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the lift and compositing mechanism in the runner page, the element-frame staging, the sized refusal, the proofs' shape, and the TSDoc and guide prose, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `t5-audit-claims.md`; `t5.diff`, `t5-status.txt`, and `t5-test-frame-report.md` (its unknowns, proofs, mutations, and gate table); the brief `t5-test-frame-brief.md` and the PAGE-FRAME design verdict `pf-design-verdict.md` (R9, and the bottom-offcanvas evidence at its head); the worktree `/home/user/test-tf` (the owned files over `80c419e`; read them, never edit them; `git -C /home/user/test-tf show 80c419e:<path>` reads any base file, including the base `captureFrame`, `readFrame`, `measureContent`, `stagePane`, and `releasePane` functions in `src/browser/helpers.ts` and the base `guides/test.md` capture paragraphs; `node_modules/@vitest/browser/dist/` there is the installed runner). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 3 (whether writing a rule into the runner page is the right mechanism, and its reliance on the runner's frame attribute), 4 (the hand-back), 7, and 8 (every changed TSDoc and guide sentence against what ships, and the writing rule); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
