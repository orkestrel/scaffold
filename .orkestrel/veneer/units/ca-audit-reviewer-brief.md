# Audit round 1 — CAROUSEL (`ca`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the terrain, and the sibling sections (the Close, Badge, and Alert sections are the nearest precedents). The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `ca-audit-claims.md`; `ca.diff`, `ca-status.txt`, `ca-shared.patch`, `b-modal-ca-report.md`, `b-modal-ca-brief.md`, `ca-instruments/`, `b-modal-terrain-report.md`, and `dd-audit-verdict.md` (the R8 sentence ruling); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`; the worktree `/home/user/veneer-ca` (the owned files over `c3ac297`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8); the base text of any shared file is the context of `ca-shared.patch` and, for `guides/veneer.md`, the copy at `/home/user/veneer-ca/guides/veneer.md` (the worktree still sits at `c3ac297`, so its tracked files are the base); Veneer `main` at `/home/user/veneer` has moved past `c3ac297`. Execution: perform the assignment directly and spawn nothing; edit nothing; use absolute paths. Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under claim 8; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. A native subagent in a clean context; run nothing.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

As stated under Context. Focus: claims 4 (the specimens' shape, the rename to `Inverted carousel`, the copy, the names), 7 (the guide section's voice and placement, the M8 rewrites, the R17 test on every sentence, the showcase pointer's home), and 8 (nouns, counts, terms); rule every other claim too.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
