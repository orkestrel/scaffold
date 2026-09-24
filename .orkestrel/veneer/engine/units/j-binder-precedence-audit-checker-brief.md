# J-BINDER-PRECEDENCE audit round 1 — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-BINDER-PRECEDENCE unit in the worktree `C:/Users/mikes/WebstormProjects/veneer-precedence` on `unit/precedence` (from Veneer `main` `1395361`), uncommitted. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-precedence.diff` and status `j-binder-precedence-status.txt`; the brief `j-binder-precedence-brief.md` (§ Scope, § Acceptance criteria); the report `j-binder-precedence-report.md`; the worktree's `src/browser/*.ts`, `tests/src/browser/*.ts`, and `guides/veneer.md`; the Orchestrator's own run `j-binder-precedence-gates.log.txt`.

## Claims

Rule on claims 4, 5, and 7 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-precedence-audit-claims.md` and on claims 1, 2, 3, and 6's mechanical clauses (the case titles present, the sentence present at each named site, `started first writes` absent from the three files, `CustomEvent<undefined>` absent from `types.ts`, the TSDoc changed where the claim names it), and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the eight owned files and no shared or off-limits file; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; every added interface property is `readonly` (`CollapseVocabulary`, the `stamp` fields); `readTag` and `CollapseVocabulary` have § Surface rows whose Summary equals the description paragraph; the five event-map summaries say null detail in the guide and the TSDoc alike; `tests/src/browser/index.test.ts` asserts `readTag` and the barrel exports it; `Button.ts` no longer carries a try/catch reading `tagName`; no term `writing.md` § Substitutions bans unconditionally appears in the added prose; the report names its thread id and journal path and the refused `prove` call. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6 and E10 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on the claims named, the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
