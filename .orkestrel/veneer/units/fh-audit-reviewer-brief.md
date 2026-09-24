# Audit round 1 — FRAME-HELPERS (`fh`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the helper's shape and names (`lift`, `focus`, their options, and the readers), the Tab drives, the pointer watcher, the outline comparison, the frames, and the guide prose, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `fh-audit-claims.md`; `fh.diff`, `fh-status.txt`, `fh-shared.patch`, `b-frame-helpers-report.md`, `fh-instruments/` (`fh-mutations.log.txt`, `fh-mutate.py`, `fh-mutation-runs.sh`, the `fh-mutation-*.log.txt` logs, the `fh-journey-*.log.txt` and `fh-baseline-*.log.txt` logs, `fh-compare.py` with `fh-compare-dark-1280.txt` and `fh-compare-light-390.txt`, `fh-setup-browser.log.txt`, `fh-test-setup.log.txt`, `fh-test-guides.log.txt`, `fh-test-policy.log.txt`, and the format, lint, and check logs), and the frames under `/home/user/veneer-fh/tmp/units/fh-final/<variant>/` (the final frames at `dark-1280`, `light-390`, and `dark-390`) and `/home/user/veneer-fh/tmp/units/fh-baseline/` (the base frames); the brief `b-frame-helpers-brief.md`, the FOCUS-FRAME verdicts `ff-audit-verdict.md` and `ff-audit-2-verdict.md` (R-b and R-c), the FORMS-FRAMES verdicts `fr-audit-verdict.md` and `fr-audit-3-verdict.md` (the carried comment), and `pf-design-verdict.md`; the worktree `/home/user/veneer-fh` (the owned files over `5afa37b`; read them, never edit them; `git -C /home/user/veneer-fh show 5afa37b:<path>` reads any base file, including the base `FrameManager` class in `tests/setupBrowser.ts`, the base focus cases in `tests/app/browser/integration.test.ts`, the base readers in `tests/setup.ts`, and the installed `releasePointer`, `captureFrame`, and `readFrame` functions (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`); `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2 (the helper's shape and names against the naming law), 3 (open the dropdown and carousel focus frames), 7 (open the frames the report names and rule whether each shows its scenario), and 8; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
