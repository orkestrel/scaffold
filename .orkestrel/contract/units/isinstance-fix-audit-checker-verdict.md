# ISINSTANCE-FIX audit — the checker's verdict (returned 2026-09-23 by `checker` on Sonnet, native subagent, 17 tool uses, 62 s; retained from the subagent's return text, its process preamble dropped)

**Role and lane:** `checker` on Sonnet, native Claude subagent, `Read`/`Grep`/`Glob` only, mechanical conformance only.

## Claims

**Claim 3 (F3, the guide) — CONFIRMED.** `guides/contract.md:126` reads `| isInstance | function | InstanceType<C> | Determines whether a value is an instance of a constructor, contained against a throwing instanceof check. |` — Shape and Summary match the implementation's TSDoc description paragraph at `src/core/validators.ts:362-364`. `README.md` has zero matches for `isInstance` (Grep, no files found), confirming the guide is the sole surface and unchanged. The `test:guides` gate reported 48/48 passed in both the report (`isinstance-fix-report.md:145-160`) and the Orchestrator's independent log (`isinstance-fix-gates.log.txt:36-48`), so this claim rests on independent evidence, not the report alone.

**Claim 5 (Scope, gates, and E6) — CONFIRMED.** `isinstance-fix-status.txt:1-3` lists exactly `src/core/validators.ts`, `tests/src/core/combinators.test.ts`, `tests/src/core/validators.test.ts`. The diff (`isinstance-fix.diff`) touches only these three files. `package.json`, `package-lock.json`, `README.md`, and the vendored policy files appear nowhere in the diff or status. The Orchestrator's own log (`isinstance-fix-gates.log.txt:6-70`) — independent of the report — shows `check exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:src exit=0` (1357 tests, 19 files), `test:guides exit=0` (48 tests), `build:src:core exit=0`, and the emitted declaration line at `dist/src/core/index.d.ts:72` in the log matches the report's claim verbatim: `export declare function isInstance<C extends abstract new (...args: never) => object>(value: unknown, ctor: C): value is InstanceType<C>;`. No `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, or `private` appears on any added line (Grep against the diff, confirmed below). No alias, overload signature, or `@deprecated` tag appears in the diff.

## Checklist (mechanical items)

| Item | Met | Evidence |
|---|---|---|
| Diff touches only the three owned files; no off-limits file | met | `isinstance-fix-status.txt:1-3`; diff header lines 1, 42, 62 name only these three paths; `package.json`, `README.md`, `guides/contract.md`, `package-lock.json`, `tests/policy.test.ts`, `tests/setupPolicy.ts` appear nowhere in the diff |
| `isInstance` executable body byte-identical before/after | met | `isinstance-fix.diff:39-40` (`const target: unknown = ctor` / `return holds(() => isFunction(target) && value instanceof target)`) match `src/core/validators.ts:403-404` exactly; the diff's `@@` hunk shows only the comment above and the signature line changed |
| Added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`/`protected`/`private` (as code), default export, or overload signature | met | Grep for the banned tokens against the diff returns only prose hits at lines 10-12, inside the added TSDoc `@remarks` describing `instanceOf`'s accepted/refused constructor shapes in English, not code syntax; Grep for `!` on added (`^\+`) lines returns no matches |
| Every added test case carries a runtime `expect` beside its compile-time assertion | met | Each `it` block in `isinstance-fix.diff:51-138` (Date, abstract class, required-arg class, Map, nullable base/derived, non-constructor refusal) and the combinators addition at lines 51-58 pairs an `expect(...)` call with an `expectTypeOf(...)` call |
| `AnyConstructor` import still has a consumer (`isConstructor`) | met | `src/core/validators.ts:3` imports it; `src/core/validators.ts:1240` (`export function isConstructor(value: unknown): value is AnyConstructor<object>`) still consumes it |
| Report's red-first reading quotes diagnostics naming the added test-file lines | met | `isinstance-fix-report.md:70-96` quotes ten `TS2344` diagnostics at `tests/src/core/combinators.test.ts(1008,66)` and `tests/src/core/validators.test.ts(698,...)` through `(754,...)`, the lines the diff adds |
| Orchestrator's log shows every gate green and the emitted declaration line | met | `isinstance-fix-gates.log.txt:12,15,22,35,48,70` (`check exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:src exit=0`, `test:guides exit=0`, `build:src:core exit=0`) and line 72 (declaration text) |
| No banned term from `writing.md` § Substitutions in added prose | met | Grep for the substitution-table terms against the diff returns no matches |

## Referrals

None. No item in this brief's scope required a judgment call; every claim and mechanical item resolved on direct evidence.

VERDICT: PASS
