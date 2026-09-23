# Audit round 1 — ALERT (`al`): objective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **objective** lane in place of `analyst` on Astra (the Codex bench is dark on quota; the substitution is recorded for this round). You argue correctness, constraints, and what the code and the contracts permit: the emitted CSS against the inventory, the assertions, the executed mutations, the registry rows, the ledger. The writer was `opus` on the same engine family, so attack the writer's claims harder for it.

## Objective

Per-claim verdicts on every claim in the claims file, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only: the claims file `/home/user/scaffold/.orkestrel/veneer/units/al-audit-claims.md`; beside it `al.diff`, `al-status.txt`, `al-shared.patch`, `b-modal-al-report.md`, `b-modal-al-brief.md`, `al-instruments/` (with `logs/` and `mutations/`), `b-modal-terrain-report.md`, and `dd-audit-verdict.md` (the R8 sentence ruling); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`; the worktree `/home/user/veneer-al` (the owned files over `c3ac297`; read them, never edit them; its `node_modules/bootstrap/` is Bootstrap 5.3.8, and `git -C /home/user/veneer-al show c3ac297:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `c3ac297` (the UTIL-SPACER and CONDITIONS landings), so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under claim 8; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

As stated under Context. Focus: claims 2, 3, 5, and 6 (the cascade against the inventory, the proof and its executed mutations, the registry rows, the tables and the ledger); rule 1, 4, 7, and 8 too.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
