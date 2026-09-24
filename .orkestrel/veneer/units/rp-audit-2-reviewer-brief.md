# Audit round 2 — RP (Veneer re-pin: the staging case and the padding prose): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: whether the case is named for what it proves and shaped like its sibling journey cases now that it stages the pane rather than placing a frame, and the comment and guide prose. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `rp-audit-2-claims.md`; the briefs `rp-repin-brief.md` and `rp-repin-brief-2.md`; `rp-2.diff`, `rp-2-status.txt`, `rp-report-2.md`; the round-1 reconciliation `rp-audit-verdict.md` with its three lane verdicts; the logs and instruments under `rp-instruments/` (the round-2 `rp2-*` gate, red, and green logs, and the Orchestrator's control `rp-control-4.sh` with `rp-control-4.log.txt` and its two journey logs); `t5-instruments-park2/park2-readings.md`; the ruling `t5-park-ruling-verdict.md` and the sweep `unhover-sweep-report.md`; the worktree `/home/user/veneer-rp` (the changed files over `1ee0faf`; read them, never edit them; `git -C /home/user/veneer-rp show 1ee0faf:<path>` reads any base file; `node_modules/@orkestrel/test/dist/src/browser/` there is the round-5 build). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 3, 4, and 5; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; the terminal line is present.
