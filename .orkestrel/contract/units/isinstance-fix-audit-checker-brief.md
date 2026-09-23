# ISINSTANCE-FIX audit — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The ISINSTANCE-FIX unit's uncommitted edit set in `C:/Users/mikes/WebstormProjects/contract`. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix.diff` and status `isinstance-fix-status.txt`; the brief `isinstance-fix-brief.md` (F1 to F3, § Scope, § Acceptance criteria); the report `isinstance-fix-report.md`; the checkout's `src/core/validators.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/combinators.test.ts`, `guides/contract.md`, `package.json`; the Orchestrator's own run `isinstance-fix-gates.log.txt`.

## Claims

Rule on claims 3 and 5 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-audit-claims.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the three owned files and no off-limits file (`package.json`, `package-lock.json`, `README.md`, `guides/contract.md`, the vendored `tests/policy.test.ts` and `tests/setupPolicy.ts`); the body of `isInstance` is byte-identical before and after (the two lines `const target: unknown = ctor` and `return holds(() => isFunction(target) && value instanceof target)` appear unchanged in the diff's context); the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a default export, or an overload signature; every added test case carries at least one runtime `expect` beside its compile-time assertion; the `AnyConstructor` import in `validators.ts` still has a consumer (`isConstructor`) after the change; the report's red-first reading quotes diagnostics naming the test file lines the diff adds; the Orchestrator's log shows every gate green and the emitted declaration line; no term the scaffold's `writing.md` § Substitutions bans unconditionally appears in the added prose. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/contract/AGENTS.md` and the rules it links; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 3 and 5 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
