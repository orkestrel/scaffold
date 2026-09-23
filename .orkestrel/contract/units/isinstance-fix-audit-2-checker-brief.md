# ISINSTANCE-FIX audit round 2 — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The ISINSTANCE-FIX unit's rounds 1 and 2 as one uncommitted edit set in `C:/Users/mikes/WebstormProjects/contract`. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-2.diff` and status `isinstance-fix-2-status.txt`; the briefs `isinstance-fix-brief-2.md` and `isinstance-fix-brief.md`; the report `isinstance-fix-report-2.md`; the checkout's `src/core/validators.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/combinators.test.ts`, `guides/contract.md`, `package.json`; the Orchestrator's own run `isinstance-fix-2-gates.log.txt`.

## Claims

Rule on claims 3 (its mechanical clauses: the assertions present, each beside a runtime assertion; the red diagnostics' lines) and 4 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-audit-claims-2.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the three owned files and no off-limits file; the body of `isInstance` is byte-identical to the published body (the two lines `const target: unknown = ctor` and `return holds(() => isFunction(target) && value instanceof target)`); the signature line equals round 1's; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a default export, or an overload signature; every added test case carries at least one runtime `expect` beside its compile-time assertion; the `instanceOf` import in `validators.test.ts` resolves to the combinators module and the `AnyConstructor` type import to the core types; the Orchestrator's log shows every gate green, the emitted declaration line, the mutation's two `TS2344` pairs, and the restore line; no term the scaffold's `writing.md` § Substitutions bans unconditionally appears in the added prose; the report records the stop and the Orchestrator's ruling. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/contract/AGENTS.md` and the rules it links; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 3 and 4 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
