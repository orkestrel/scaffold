# Audit round 1 — PAGE-FRAME (`pf`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the harness mechanism, the proofs, the placements, and the prose against the design verdict and the base class it changes, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `pf-audit-claims.md`; `pf.diff`, `pf-status.txt`, `pf-shared.patch`, `b-cross-pf-report.md`, `pf-instruments/` (`pf-mutations.log.txt`, `pf-mutations.sh`, `pf-mutate.py`, the `pf-mutation-*.log.txt` logs, `pf-red-setup-browser.log.txt`, `pf-green-setup-browser.log.txt`, `pf-gates.sh` and `pf-gates.log.txt`, `pf-capture.sh` and the `pf-capture-*.log.txt` logs, `pf-frames.log.txt`, `pf-png.py`, and the `pf-heights-*` readings and probe copies), and the frames under `/home/user/veneer-pf/tmp/capture/states/` (`bottom-offcanvas--light-390.png`, `showcase--light-1280.png`, `primary-hover--light-1280.png`, `page-strip-focus--light-390.png`, `range-focus--light-390.png`, and any other frame a claim names); the design verdict `pf-design-verdict.md` (R1 to R9) and the two design proposals beside it, the brief `b-cross-pf-brief.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-pf` (the owned files over `dc92a09`; read them, never edit them; `git -C /home/user/veneer-pf show dc92a09:<path>` reads any base file, including the base `FrameManager` class in `tests/setupBrowser.ts` and the installed `captureFrame`, `measureContent`, `stagePane`, and `releasePane` functions (`node_modules/@orkestrel/test/dist/src/browser/index.js`); `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 5 (the placements, and whether each frame shows what the scenario claims — open the frames), 6 (the frames the report names), and 7 (every rewritten TSDoc, comment, and guide sentence against what ships, and the writing rule); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
