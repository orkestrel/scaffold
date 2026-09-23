# Audit round 2 — UTIL-SPACER (`us`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, ergonomics, specimen and section design, guide voice, and design fit against the design verdict and the family record.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,writing,documentation,typescript,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only: the claims file `/home/user/scaffold/.orkestrel/veneer/units/us-audit-2-claims.md`; beside it `us-2.diff`, `us-2-status.txt`, `us-shared-2.patch`, `b-utilities-us-report-2.md`, `us-brief-3.md`, `us-audit-verdict.md` (round 1, with its three lane verdicts `us-audit-{objective,subjective,checker}-verdict.md`), `us-2-measurements.txt`, and `us-instruments/`; the worktree `/home/user/veneer-us` (uncommitted over `87ff1d0`; read its files, never edit them); Veneer `main` at `/home/user/veneer` (`c3ac297`); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`; the family record `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-family.md`; Bootstrap 5.3.8 under `/home/user/veneer-us/node_modules/bootstrap/`. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under claim 7; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

As stated under Context. Focus: claims 2 and 3 (the mixins' contract shape and the header comment), 5 (the specimens' shape and the deviation's design fit), 6 (the guide prose: one term, the § Styles placement of the mixin contract, the compatibility rows, the § Tailwind sentences), and 7 (voice, nouns, counts); rule 1 and 4 too.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
