# ISINSTANCE-FIX audit round 3 — the checker's verdict (returned 2026-09-23 by `checker` on Sonnet, native subagent, 20 tool uses, 85 s; retained from the subagent's return text, its process preamble dropped)

**Role and lane:** checker on Sonnet, native Claude subagent (Read, Grep, Glob only), mechanical conformance only.

**Verdicts on claims**

Claim 2 (H2, mechanical clauses) — CONFIRMED. `src/core/validators.ts:378` reads "or abstract construct signature returning an object (or `any`). A class with a"; `validators.ts:406` reads "right-hand side return `false` without consulting its `Symbol.hasInstance`" with "own" absent (grep for `"its own "` returned no files); `validators.test.ts:5` imports `instanceOf` as line 5 of the `@src/core` value-import block, which closes with `} from '@src/core'` (confirmed present, grep found the closing line); grep for `combinators.js` across both files returned no files found; the Orchestrator's log (`isinstance-fix-3-gates.log.txt:74`) shows `criterion-6 grep exit=1`.

Claim 3 (H3, the proof) — CONFIRMED. `validators.test.ts:767-783` carries the case titled "preserves a nullable base in the false branch for a subclass with an optional member," with `class Tagged extends Base { readonly tag?: string }` (771-773), `const assignable: Tagged = new Base()` (774) beside `expect(isInstance(assignable, Tagged)).toBe(false)` (775), the `[new Tagged(), new Base(), null].forEach` over `Base | null` with the runtime `.toBe(value instanceof Tagged)` (777), the true branch `expectTypeOf(value).toEqualTypeOf<Tagged>()` (779), and the false branch `expectTypeOf(value).toEqualTypeOf<Base | null>()` (781). The Orchestrator's log confirms the negative control reddens at lines 747 and 781 with `TS2344` (`isinstance-fix-3-gates.log.txt:98-99`) and the mutated-control check exits 2 with restoration confirmed (`:100-102`).

Claim 4 (Scope, gates, declaration, E6) — CONFIRMED. Status lists exactly three files (`isinstance-fix-3-status.txt:1-3`); the Orchestrator's log shows `check exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:src exit=0` (1362 tests), `test:guides exit=0` (48 of 48), `build:src:core exit=0` (`isinstance-fix-3-gates.log.txt:12,15,22,35,48,70`); the emitted declaration at `:72` is byte-identical to round 1's declaration in `isinstance-fix-gates.log.txt:72` (only the line number in `dist/` differs, 2888 vs 2884, which is not part of the claim); the `=> unknown` mutation shows two `TS2344` pairs at lines 795/796 and 802/803 (`:89-92`); the H3 negative control shows two `TS2344` diagnostics at 747 and 781 (`:98-99`); both restore lines appear (`:94-95`, `:101-102`); the three probes exit as specified — consumer probe exit=2 with the one non-constructor diagnostic (`:109-111`), structural probe exit=0 (`:114`), subtype probe exit=0 (`:117`). The diff touches no other file (confirmed by grep against `package.json`, `guides/contract.md`, `README.md`: no matches). Added lines carry no `any`/`as`/`!`/`@ts-`/`eslint-disable`/`public`/`protected`/`private` as code syntax, no default export, no overload (confirmed by targeted grep for code-syntax patterns in the diff's added lines, which returned only prose usages of those words inside comments, not code). Report names journal path and thread id at `isinstance-fix-report-3.md:3`.

**Checklist of mechanical items**

| Item | Met | Evidence |
|---|---|---|
| Diff touches only the three owned files | met | `isinstance-fix-3-status.txt:1-3`; diff header list matches |
| `isInstance` body byte-identical to published body | met | `validators.ts:408-409`: `const target: unknown = ctor` / `return holds(() => isFunction(target) && value instanceof target)` |
| Signature line equals round 1's; emitted declaration matches round-1 log | met | `isinstance-fix-3-gates.log.txt:72` vs `isinstance-fix-gates.log.txt:72`, text identical |
| Report's quoted sentences appear verbatim in `validators.ts` | met | report lines 16-26 match `validators.ts:378-379, 383-386, 405-407` |
| Banned words/import absent from both owned files | met | grep for `"assignable to the instance type"`, `"its own "`, `combinators.js` returned no files in either file |
| `instanceOf` imported once, from `@src/core`, in `validators.test.ts` | met | `validators.test.ts:5`; single occurrence confirmed by grep |
| Added lines carry no forbidden syntax | met | targeted grep on diff's added lines found only prose usages, no code-syntax matches |
| Every added test case carries a runtime `expect` beside compile-time assertion | met | diff lines 88-89, 100-101, 112-113, 118-122, 133-138 (also 147-154), 164-172, 180, 187, 194, 201 each pair `expect(...)` with `expectTypeOf(...)` |
| Orchestrator's log shows every gate green, declaration, criterion-6 grep, mutation diagnostics, negative control, restores, probe exits | met | `isinstance-fix-3-gates.log.txt:12,15,22,35,48,70,72,74,88-95,96-102,109-117` |
| No banned substitution term in added prose | met | grep against the substitution table's forbidden terms over the report returned no matches; the diff's own added-comment prose contains none of the table's banned terms either |
| Report names thread id and journal path | met | `isinstance-fix-report-3.md:3` |

**Referrals:** none. Every item resolved on cited evidence; no judgment call was required.

VERDICT: FAIL none; outside the claims: none
