# Audit round 6 — T5 TEST-FRAME (`t5`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, whether each new and renamed proof is named for what it proves, the `computeOffset` TSDoc's statement of the bound, the F1 sentences, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `t5-audit-6-claims.md`; `t5-6.diff`, `t5-6-status.txt`, `t5-test-frame-report-6.md` (its changes by symbol, the new cases with their red and green runs, the mutation series, and the gate table), the logs and instruments under `t5-instruments-6/` (the unit's red, green, mutation, digest, and gate logs across its four mutation series, its run and gate scripts, the retained mutation files under `t5-6-mutations/`, and the round-5 source copies), the round-5 reconciliation `t5-audit-5-verdict.md` with its three lane verdicts, the Orchestrator's offset probe `t5-instruments-5/t5-offset-probe.mjs` with its log, the withdrawn park-2 readings `t5-instruments-park2/park2-readings.md`, and the Orchestrator's consumer probe `t5-instruments-6/t5-veneer-probe-6.log.txt` with the journey and guide logs beside it; the briefs `t5-test-frame-brief.md` to `t5-test-frame-brief-6.md` and `t5-test-frame-brief-2-note.md`; the worktree `/home/user/test-tf` (the round-6 owned files over `80c419e`; read them, never edit them; `git -C /home/user/test-tf show 80c419e:<path>` reads any base file, including the base `captureFrame`, `readFrame`, `measureContent`, `stagePane`, and `releasePane` functions in `src/browser/helpers.ts` and the base `guides/test.md` capture paragraphs; `node_modules/@vitest/browser/dist/` there is the installed runner). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2, 4, and 5; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
