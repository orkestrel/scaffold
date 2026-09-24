# Audit round 1 — RAMP-DOWN (`rd`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the family record, and the base elements partial and the shell it replaces. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `rd-audit-claims.md`; `rd.diff`, `rd-status.txt`, `rd-shared.patch`, `b-modal-rd-report.md`, `b-modal-rd-brief.md`, `rd-instruments/` (`rd-base.css`, `rd-gates.sh`, the `rd-gate-*` logs, `rd-mutation.patch`, `rd-mutation.log.txt`, `rd-mixins-green.log.txt`, `rd-offcanvas-probe.patch`, and `rd-offcanvas-cascade.diff.txt`); the RAMP-DOWN row of `ROADMAP.md` § Carriers in the worktree, the MODAL round-1 verdict it comes from (read with `git -C /home/user/scaffold show 8c46b904~1:.orkestrel/veneer/units/md-audit-verdict.md`), D46 in `decisions-round-2.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-rd` (the owned files over `42fd88e`; read them, never edit them; `git -C /home/user/veneer-rd show 42fd88e:<path>` reads any base file, including the base `src/styles/_mixins.scss` with its `breakpoint-each` and `breakpoint-down` mixins, and the base modal, table, and offcanvas partials; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2 (the twin's name and shape beside its family), 5 (whether keeping the offcanvas walk is the right ruling), and 6 (every added guide sentence against what ships, and the writing rule); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
