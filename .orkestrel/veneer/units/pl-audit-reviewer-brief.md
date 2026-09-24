# Audit round 1 — PREFLIGHT-HOST (`pl`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the comparison's shape, the tables' and helper's names and placement, the emulation's honesty, and the guide prose, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,styles,typescript,names,architecture,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `pl-audit-claims.md`; `pl.diff`, `pl-status.txt`, `pl-shared.patch`, `b-preflight-host-report.md`, and `pl-instruments/` (`pl-mutations.log.txt`, `pl-mutations.sh`, `pl-scratch.sh`, `pl-mutation-run.log.txt`, `pl-mutations-driver.log.txt`, `pl-mutation-build.log.txt`, `pl-classify-probe.test.ts.txt` and `pl-classify.out.txt`, `pl-red-baseline.log.txt`, `pl-green.log.txt`, `pl-worktree-unpatched.log.txt`, `pl-setup.log.txt`, `pl-test-guides.log.txt`, `pl-test-service.log.txt`, and the `pl-gate-*.log.txt` logs), and the patched guide copy `/home/user/veneer-pl/tmp/probe/pl-guide-patched.md`; the rule D45 in `decisions-round-2.md`, the engine session's reading `/home/user/scaffold/.orkestrel/veneer/engine/units/host-chromium-153-reading.md` (the preflight row), the brief `b-preflight-host-brief.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-pl` (the owned files over `fc3ddfe`; read them, never edit them; `git -C /home/user/veneer-pl show fc3ddfe:<path>` reads any base file, including the base `tests/service/tailwind/preflight.test.ts`, the base `readPreflightDepartures` reader in `tests/setupStyles.ts`, the installed Tailwind preflight `node_modules/tailwindcss/preflight.css`, and the base guide rows in `guides/veneer.md`; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 3 (the case's shape and title), 4 (whether the emulation stands in for the real build as the report says), 6 (the names and placement), and 7 (every guide sentence against what ships, and the writing rule); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
