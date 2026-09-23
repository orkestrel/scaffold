# J-BINDER audit round 8 — the checker's brief (the prose round on the round-7 findings)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line. This round's audit is the checker plus the Orchestrator's gates and replay; the objective and subjective lanes are not run for this round, for the reason `j-binder-audit-7-verdict.md` § Carrier records (prose edits with the lanes' exact wording and one strengthened assertion already bound by three mutation rows).

## Subject

The J-BINDER unit's round 8 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, `main` merged as `cea3359`), rounds 2 to 8 uncommitted. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-8.diff` and status `j-binder-8-status.txt`, and the round-7 diff `j-binder-7.diff` for the delta; the brief `j-binder-brief-8.md` (H1 to H4); the report `j-binder-report-8.md`; the round-7 verdicts `j-binder-audit-7-verdict.md`, `j-binder-audit-7-subjective-verdict.md` (the exact wording of claims 3 and 4), and `j-binder-audit-7-objective-verdict.md` (the bound on the overlap assertion); the worktree's `src/browser/HostSnapshot.ts`, `src/browser/types.ts`, `tests/src/browser/HostSnapshot.test.ts`, and `guides/veneer.md`; the Orchestrator's own run `j-binder-gates-8.log.txt`; the retained instruments `j-binder8-mutations.json` and `j-binder8-mutation-results.json`.

## Claims

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-8.md` (1 to 4) and on these mechanical items, one piece of evidence each (`file:line` or the grep): the round-8 delta over `j-binder-7.diff` touches only `guides/veneer.md`, `src/browser/HostSnapshot.ts`, and `tests/src/browser/HostSnapshot.test.ts`; the guide's rule paragraph carries the subjective lane's claim-3 wording verbatim in substance (the third door, the every-door parenthesis, the two stop conditions, the subsection sentence) and the synchronous stop sentence before it is unchanged from round 7; the `#publish` comment carries the subjective lane's claim-4 wording; your own sweep `restoration[a-z ]* owns|restoration[a-z ]* own ` over the three named files returns no hit, and a second sweep of the same files for `restoration` near `own` across a line break (read the `#publish`, `#take`, and `#pending` comments and the guide paragraph whole) finds no restoration named as the owner; the overlap case's tail writes `live` before the later save and asserts `toBe('live')`; the three G2 rows in `j-binder8-mutations.json` each have a result naming the overlap case; the Orchestrator's log shows every gate green, the sweeps, the apply checks, and the tree-wide check red on the three app files alone; no term `writing.md` § Substitutions bans unconditionally appears in the added prose. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `documentation.md`, `writing.md`; E6 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 1 to 4, the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
