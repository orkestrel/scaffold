# ISINSTANCE-FIX audit round 3 — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The ISINSTANCE-FIX unit's rounds 1 to 3 as one uncommitted edit set in `C:/Users/mikes/WebstormProjects/contract`. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-3.diff` and status `isinstance-fix-3-status.txt`; the briefs `isinstance-fix-brief-3.md`, `isinstance-fix-brief-2.md`, and `isinstance-fix-brief.md`; the report `isinstance-fix-report-3.md`; the checkout's `src/core/validators.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/combinators.test.ts`, `guides/contract.md`, `package.json`; the Orchestrator's own run `isinstance-fix-3-gates.log.txt` and the round-1 run `isinstance-fix-gates.log.txt` (for the declaration line).

## Claims

Rule on claims 2, 3 (its mechanical clauses: the case present with the named lines, the runtime assertions beside the compile-time ones, the control's diagnostic in the Orchestrator's log), and 4 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-audit-claims-3.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the three owned files and no off-limits file; the body of `isInstance` is byte-identical to the published body (the two lines `const target: unknown = ctor` and `return holds(() => isFunction(target) && value instanceof target)`); the signature line equals round 1's and the emitted declaration in the Orchestrator's round-3 log equals the one in `isinstance-fix-gates.log.txt`; the exact sentences the report quotes appear verbatim in `src/core/validators.ts`; the words "assignable to the instance type", "its own", and the relative `combinators.js` import are absent from the two owned files; `instanceOf` is imported once, from `@src/core`, in `validators.test.ts`; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a default export, or an overload signature; every added test case carries at least one runtime `expect` beside its compile-time assertion; the Orchestrator's log shows every gate green, the declaration line, the criterion-6 grep with exit 1, the `=> unknown` mutation's `TS2344` pairs (at the parity and `AnyConstructor` assertions' lines, which moved by the `Tagged` case's length), the negative control's two `TS2344` diagnostics (lines 747 and 781, the `Derived` and `Tagged` false branches, because the Orchestrator's control replaces every `toEqualTypeOf<Base | null>()`), both restore lines, and the three probes' exits; no term the scaffold's `writing.md` § Substitutions bans unconditionally appears in the added prose; the report names its thread id and journal path. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/contract/AGENTS.md` and the rules it links; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 2, 3, and 4 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
