# J-BINDER-PRECEDENCE audit round 5 — the checker's brief (the prose-and-cases round)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line. This round's audit is the checker plus the Orchestrator's gates and replay; the objective and subjective lanes are not run for this round, for the reason `j-binder-precedence-audit-3-verdict.md` § Carrier records (two sentences in the objective lane's exact wording and two cases whose traces that lane wrote; no mechanism changes).

## Subject

The J-BINDER-PRECEDENCE unit's rounds 1 to 5 in the worktree `C:/Users/mikes/WebstormProjects/veneer-precedence` on `unit/precedence` (from Veneer `main` `1395361`), uncommitted. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-precedence-5.diff` and status `j-binder-precedence-5-status.txt`, and the round-3 diff `j-binder-precedence-3.diff` for the delta; the brief `j-binder-precedence-brief-5.md`; the report `j-binder-precedence-report-5.md`; the round-3 verdicts `j-binder-precedence-audit-3-verdict.md` and `j-binder-precedence-audit-3-objective-verdict.md` (the exact wording of claim 1's fix and F1's); the worktree's `src/browser/HostSnapshot.ts`, `src/browser/types.ts`, `src/browser/helpers.ts`, `tests/src/browser/HostSnapshot.test.ts`, `tests/src/browser/helpers.test.ts`, and `guides/veneer.md`; the Orchestrator's own run `j-binder-precedence-gates-5.log.txt`.

## Claims

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-precedence-audit-claims-5.md` (1 to 3) and on these mechanical items, one piece of evidence each (`file:line` or the grep): the round-5 delta over `j-binder-precedence-3.diff` touches only the six files claim 3 names; the two sentences appear verbatim at each named site (the "unless a write throws" clause at three sites, the withdrawn-earliest sentence at four); "always restored" is absent from the three files; `readTag`'s `@returns` is verbatim; the two case titles are present; the throwing case records the reported error through a `window` error listener it removes after the test; no source line outside comments changed in `HostSnapshot.ts`, `types.ts`, or `helpers.ts` in the round-5 delta; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; the guide paragraph's lines fit the paragraph's wrap; no term `writing.md` § Substitutions bans unconditionally appears in the added prose; the report names its thread id, journal path, and the refused `prove` calls. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `documentation.md`, `writing.md`, `tests.md`; E6 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 1 to 3, the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
