# ISINSTANCE-FIX audit round 2 — the checker's verdict (returned 2026-09-23 by `checker` on Sonnet, native subagent, 20 tool uses, 95 s; retained from the subagent's return text, its process preamble dropped)

**Checker on Sonnet, native Claude subagent, mechanical conformance only.**

## Claim verdicts (numbered per `isinstance-fix-audit-claims-2.md`)

**Claim 3 (mechanical clauses only — assertions present, each beside a runtime assertion; the red diagnostics' lines):** CONFIRMED.
- Parity assertion `Expect<Equal<Parameters<typeof isInstance>[1], Parameters<typeof instanceOf>[0]>>` at `tests/src/core/validators.test.ts:776`, beside runtime `expect(instanceOf(Date)(new Date(0))).toBe(true)` at line 778 (diff lines 162-166).
- Bare `AnyConstructor` refusal assertion at line 783, beside runtime `expect(isInstance(new Date(0), Date)).toBe(true)` at line 785 (diff lines 169-174).
- `Function`-typed refusal assertion at line 790 region, beside runtime `expect(isInstance(Date, Function)).toBe(true)` (diff lines 176-181).
- Structural subclass case (`Same`) at diff lines 140-153, beside runtime `expect(isInstance(value, Same)).toBe(value instanceof Same)`; round-1 `Derived` case retained at diff lines 123-138.
- Red diagnostics: `isinstance-fix-2-gates.log.txt:75-78` and `isinstance-fix-report-2.md:58-61` both cite `tests/src/core/validators.test.ts(776,11)`, `(777,21)`, `(783,11)`, `(784,21)` — matches the file's actual line numbers exactly (`validators.test.ts:776,777,783,784` read directly).

**Claim 4 (scope, parity, gates, E6):** CONFIRMED.
- Status lists exactly three owned files (`isinstance-fix-2-status.txt:1-3`): `src/core/validators.ts`, `tests/src/core/combinators.test.ts`, `tests/src/core/validators.test.ts`.
- Gates: `npm run check` exit=0, scoped oxlint exit=0, oxfmt exit=0, `test:src` 1361/1361, `test:guides` 48/48, `build:src:core` exit=0 (`isinstance-fix-2-gates.log.txt:12,15,22,31,48,70`), all in the Orchestrator's own independent run, not the report's quoted commands.
- Guide row Summary equals the description paragraph verbatim: `guides/contract.md:126` = `src/core/validators.ts:363-364`.
- `package.json`, `package-lock.json`, `README.md`, `guides/contract.md`, vendored files: no hits for those paths in the diff; status shows only the three owned files touched.
- No `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private` (as code), default export, overload, or `@deprecated` in added lines — the sole hits for `protected`/`private` are prose inside the added doc comment (diff line 12), not code syntax; grep for `@deprecated`/`overload` returned nothing.
- Consumer probe compiles every accepted line and refuses the non-constructor once: `isinstance-fix-2-gates.log.txt:84-87` (exit=2, one `TS2345` diagnostic).

## Checklist — mechanical items

| Item | Met | Evidence |
|---|---|---|
| Diff touches only the three owned files | met | `isinstance-fix-2.diff:1,46,66` (only these three file headers); `isinstance-fix-2-status.txt:1-3` |
| `isInstance` body byte-identical to published body | met | `isinstance-fix-2.diff:43-44`: `const target: unknown = ctor` / `return holds(() => isFunction(target) && value instanceof target)` |
| Signature line equals round 1's | met | `src/core/validators.ts:400-403` matches emitted declaration `isinstance-fix-2-gates.log.txt:72` |
| Added lines carry none of `any`/`as `/`!`/`@ts-`/`eslint-disable`/`public`/`protected`/`private`(code)/default export/overload | met | grep over diff returned only a prose occurrence of "protected" inside the doc comment (diff line 12), no code-syntax hits |
| Every added test case has a runtime `expect` beside its type assertion | met | `isinstance-fix-2.diff:84-181` — each `it(...)` block pairs `expectTypeOf`/`Expect<Equal<...>>` with an `expect(...)` call |
| `instanceOf` import resolves to combinators module | met | `tests/src/core/validators.test.ts` diff line: `import { instanceOf } from '../../../src/core/combinators.js'` — resolves from `tests/src/core/` up three levels to repo root, into `src/core/combinators.js` |
| `AnyConstructor` type import resolves to core types | met | diff: `import type { AnyConstructor, ... } from '@src/core'`; alias `@src/core` → `./src/core/index.ts` (`tsconfig.json:24`); `index.ts:1` re-exports `types.js`; `AnyConstructor` defined at `src/core/types.ts:294` |
| Orchestrator's log shows every gate green, emitted declaration, mutation's two `TS2344` pairs, restore line | met | `isinstance-fix-2-gates.log.txt:12,15,22,31,48,70` (gates), `:72` (declaration), `:75-78` (mutation diagnostics), `:80-81` (`OK` / "restored byte for byte") |
| No banned substitution term in added prose | met | grep for the unconditionally-banned rows found no hits inside added (`+`) lines; the lone "via" hit is on an unchanged context line (test title, no `+` prefix) |
| Report records the stop and the Orchestrator's ruling | met | `isinstance-fix-report-2.md:7-9` (stop) and `:119-121` (Orchestrator's ruling) |

## Referrals

None. Every item above resolved on direct file evidence; no judgment call was required within the checker's scope. Claims 1 and 2 (G1 comment truth, G2 remark truth) are out of this brief's scope and are left to the reviewer/analyst lanes as the brief specifies.

**VERDICT: PASS**
