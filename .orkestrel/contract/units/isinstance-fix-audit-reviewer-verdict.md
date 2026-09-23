# ISINSTANCE-FIX audit — the objective lane's verdict, held by `reviewer` on Opus 5.5 (returned 2026-09-23, native subagent, 43 tool uses, 332 s; retained from the subagent's return text)

Objective lane, held by `reviewer` on Opus 5.5 (the `opus` alias served claude-opus-5-5). Every citation below points into `C:/Users/mikes/WebstormProjects/contract` unless it names another path.

## Numbered verdicts

**1. BROKEN** — the clause "keeps the true reason for the `isFunction` narrowing inside `holds`" is false. Every other clause of claim 1 held.
- **What is wrong.** `src/core/validators.ts:401-402` now reads: "a generic right-hand side loses TypeScript's `instanceof` leniency inside another generic call."
  - `holds` is not generic. `src/core/helpers.ts:970` declares it as `export function holds(callback: () => boolean): boolean`.
  - The refuter's probe `contract-refute-C-3.ts` (read in the scratchpad, lines 32-34) declares `holds` with that exact signature. Under the shipped constraint, `bodyDirect` is `return holds(() => value instanceof ctor)` with no `isFunction` check. The retained run in `isinstance-round-1-refute-C.md` probe C-3 reports no diagnostic on it.
  - A type parameter constrained to a construct signature is a legal `instanceof` right-hand side. The removed word "unconstrained" was the only thing that made the old sentence true.
- **Why it matters.** The comment gives a type-level reason that no longer exists. A reader who trusts it cannot see why the check must stay. The check is kept for runtime reasons: a non-callable right-hand side with its own `Symbol.hasInstance` answers `false` instead of being consulted.
- **What right looks like.** Keep the body verbatim. Replace the comment with the runtime reason, for example: "Keep the `isFunction` check: a non-callable right-hand side answers `false` instead of consulting its own `Symbol.hasInstance`, which is the published runtime behaviour."
- **Settling probe for the Orchestrator.** In a scratch copy, set the body to `return holds(() => value instanceof ctor)`, run `npm run check:src:core`, and expect exit 0.
- **Clauses that held:**
  - The signature at `src/core/validators.ts:397-400` is exactly as briefed.
  - The body at `src/core/validators.ts:403-404` is verbatim.
  - The runtime proofs at `tests/src/core/validators.test.ts:674-691` are untouched and green, with 1357 tests in `isinstance-fix-gates.log.txt`.
  - The false "would reject `instanceOf`" sentence is gone.
  - The `@remarks` block at `src/core/validators.ts:376-384` contains every element claim 1 lists. Whether each sentence is true is claim 3's question.
  - `dist/src/core/index.d.ts:2884` matches the signature (gate log line 72).

**2. CONFIRMED** — attacked with a mutation of the signature against each proof:

| Proof | Published intersection restored | Constraint dropped (return rewritten to `C extends abstract new (...args: never) => infer R ? R : never`) | Return widened to `object` |
| --- | --- | --- | --- |
| Date, abstract class, required arguments, Map | caught: `InstanceType<C & AnyConstructor<object>>` resolves to `object` (refute-A probe 1, PublishedOrder) | passes | caught |
| `Base \| null` true branch (`Derived`) | caught | passes | caught (gives `Base`) |
| `Base \| null` false branch | caught (over-narrows to `null`, refute-B probe 3 line 53) | passes | caught (gives `null`) |
| Constraint proof `{} extends Parameters<…>[1]` | caught: an unconstrained `C` erases to `unknown` | caught | **passes** |
| Combinators parity case (`Date`) | caught | passes | caught |

- **Proofs that pass under a wrong signature.** Change the constraint to `abstract new (...args: never) => unknown`, which is the alternative the synthesis declined. Every proof and every gate still passes (see finding O1).
- **Unknown 1.** The constraint proof proves only that the parameter type excludes `{}`. Any constraint with a construct signature excludes `{}`, including `=> unknown` and `abstract new (...args: any) => any`. A stronger proof asserts `Expect<Equal<Parameters<typeof isInstance>[1], Parameters<typeof instanceOf>[0]>>`. That pins parity with `instanceOf`, which is the contract the remark states.
- **Red-first evidence.**
  - The claimed count of ten diagnostics rests on the writer's report alone, and nothing depends on it.
  - That each proof fails against the published signature is corroborated independently: refute-A probe 1, refute-B probe 3, the Orchestrator's `TS2740` in `contract-isinstance-probe.ts`, and the derivation above.
  - The green result is the Orchestrator's own `npm run check`, which exited 0.
- **Case count.** Six cases in `tests/src/core/validators.test.ts:694-757` plus one in `tests/src/core/combinators.test.ts:1002-1009` equals the 1350 → 1357 delta. Each case carries a runtime assertion.

**3. BROKEN** — the sentence at `src/core/validators.ts:382-384` is false for `Function`. The sentence reads: "Constructors whose instance types admit primitives structurally, including `Object` and `Function`, can make the false branch unsound."
- **What is wrong.**
  - `node_modules/typescript/lib/lib.es5.d.ts:273-305` declares `interface Function` with `apply`, `call`, `bind`, `prototype`, `length`, `arguments`, and `caller`.
  - No primitive's apparent type (`String`, `Number`, and so on) carries those members, so no primitive is assignable to `Function`.
  - So `isInstance(v, Function)` over `v: string | Date` keeps `string | Date` in its false branch.
  - Only `Object` was measured unsound, in refute-A probe 3 line 12, where the false branch became `never`. The `Function` half was extrapolated in the synthesis and never probed.
- **Why it matters.** This remark ships in the published declarations of 0.0.18, and it states a type fact the compiler contradicts.
- **What right looks like.** Name only `Object` in that sentence: "Constructors whose instance types admit primitives structurally, such as `Object`, can make the false branch unsound; use `isObject` for that check." If the writer wants to keep the `isFunction` advice, give it a true reason; don't classify `Function` as primitive-admitting.
- **Settling probe.** `declare const v: string | Date; if (!isInstance(v, Function)) expectTypeOf(v).toEqualTypeOf<string | Date>()` compiles. The control is the same line with `Object`, which narrows to `never` (refute-A).
- **Parts that held:**
  - The row at `guides/contract.md:126` reads `InstanceType<C>`.
  - Its Summary equals the description at `src/core/validators.ts:363-364`.
  - Line 113 goes straight into the table, so the section carries no prose.
  - `README.md` contains no `isInstance` (grep count 0).
  - `test:guides` passed 48 of 48 in the Orchestrator's run.
- **Other remark sentences, which held:**
  - "the last construct signature": refute-A probe 1, LastOverload.
  - Same constructors as `instanceOf`: the constraint text is identical at `src/core/validators.ts:397` and `src/core/combinators.ts:260`.
  - A private or protected constructor is refused: refute-A probe 2, lines 14 and 15.
  - A `Function`-typed value is refused: refute-C probe C-1 at (45,52), which matches the declarations (`Function` has no construct signature).
  - The bare `AnyConstructor` is refused: refute-C probe C-1 at (38,52).
  - The false branch keeps the declared type: refute-B probe 4 and the new `Base | null` case.
- **Unknown 2.** The value `Function` (`FunctionConstructor`, `lib.es5.d.ts:307-315`) declares `new (...args: string[]): Function`.
  - Parameters typed `never` are assignable to `string`, and `Function` is assignable to `object`, so the call is accepted and narrows to `Function` (refute-A probe 2).
  - The refusal sentence is therefore true as written.

**4. CONFIRMED** — attacked by widening the sweep and by reading each probe line for its ability to fail.
- **Wider sweep.** I grepped `isInstance\(` across `C:/Users/mikes/WebstormProjects`, excluding `node_modules` and honouring `.gitignore`.
  - The scout's sweep missed call sites in these packages: `workflow`, `workspace`, `terminal`, `websocket`, `template`, `table`, `sqlite`, `sse`, `tool`, `toolbox` (`src/core/errors.ts:72` and `src/server/terminals/TerminalBridge.ts:119`), `veneer`, and `veneer-binder`. Its statement that no package was left unaccounted for is false.
  - Every missed site is an explicit predicate wrapper over a concrete class, or the `toolbox` boolean `if … return new Response(…)`.
  - `TemplateManager#isInstance` is an unrelated private method.
  - A grep for `(private|protected) constructor` over `*/src/**/*.ts` found none in the fleet.
  - So the conclusion holds on the complete set.
- **Refused edge constructors.** The constraint text is identical to `instanceOf`'s, so the two refuse the same set by construction. The measurements in refute-A probe 2 and refute-C probe C-1 agree.
- **Consumer patterns the probes did not model.** No fleet site uses either one today:
  - A generic wrapper typed `ctor: AnyConstructor<T>` or `new (...args: any[]) => T` with an unconstrained `T` is now refused with `TS2345`, because `T` is not assignable to `object`.
  - Assigning `isInstance` as a value to a type like `(value: unknown, ctor: unknown) => boolean` now fails the parameter check.

**5. CONFIRMED** — attacked through the status, the gate log, and a token read of the added lines.
- **Status and gates.** `isinstance-fix-status.txt` lists exactly the three files. The gate log shows `check`, `oxlint`, `oxfmt`, `test:src`, `test:guides`, and `build:src:core` each exiting 0. `package.json`, `package-lock.json`, `README.md`, and the vendored files are absent from the status.
- **E6.** There is no alias, overload, `@deprecated` tag, or shim.
- **Added lines.** None contains an `any` type, an `as` assertion, a non-null `!`, `@ts-`, `eslint-disable`, or an accessibility modifier.
  - The literal words `as`, `public`, `private`, and `protected` appear only in TSDoc prose (`src/core/validators.ts:377-379`) and in the test title "…same Date type as isInstance".
  - `Reflect.apply` is this suite's established idiom, with 163 occurrences across the tests.

## Findings outside the claims

**O1 — the proofs do not pin the constraint the remark documents.**
- **Where:** `tests/src/core/validators.test.ts:751-756`.
- **The surviving mutation:** `isInstance<C extends abstract new (...args: never) => unknown>(…): value is InstanceType<C>`.
  - This is the declined alternative. It admits the bare `AnyConstructor` and breaks parity with `instanceOf`.
  - It passes every added proof: all the narrowing targets return objects, and `{}` still has no construct signature.
  - It passes every gate: `instanceOf`'s argument `C & AnyConstructor<object>` still satisfies it.
- **Why it matters.** The remark ships "Accepts the same constructors as `instanceOf` … the bare `AnyConstructor` … refused at the call", and no assertion would break if that went false.
- **What right looks like.** In that case, add these assertions (import `instanceOf` and the `AnyConstructor` type):

```ts
Expect<Equal<Parameters<typeof isInstance>[1], Parameters<typeof instanceOf>[0]>>
Expect<Equal<AnyConstructor extends Parameters<typeof isInstance>[1] ? true : false, false>>
Expect<Equal<Function extends Parameters<typeof isInstance>[1] ? true : false, false>>
```

- **Settling probe.** Apply the mutation and run `npm run check`. It exits 0 today and must exit non-zero once these assertions land.

## Attacked and held

- **Non-discriminating probe line.** In `contract-isinstance-probe-fixed.ts:14-17`, the `acceptedFalseBranch` line cannot fail under false-branch over-narrowing: returning `null` into `Element | null` compiles. The claimed fact still holds on refute-B probe 4's `Equal` oracle and the new `Base | null` case at `tests/src/core/validators.test.ts:744-747`.
- **Runtime assertion.** The one at `tests/src/core/validators.test.ts:755` cannot tell whether `isFunction` was removed, because `holds` contains the `TypeError` and still returns `false`. It is a companion assertion only, and nothing claims it binds that check.
- **`instanceOf`'s body.** `isConstructor(ctor) && isInstance(value, ctor)` at `src/core/combinators.ts:270` infers `C & AnyConstructor<object>`, which satisfies the constraint. Its own declared predicate carries the narrowing, so the intersection-order behaviour does not reach it.
- **Test placement.** Local classes inside test callbacks are established in this suite (20 occurrences across 6 files), and no rule forbids them.

## Referrals

None.

## Bounds

- The remark puts "a `Function`-typed value … refused" next to `Function` as a constructor the caller can pass. The sentence is true, but it invites misreading. That is a wording call for the subjective lane.
- The scout's sweep coverage statement is wrong, as recorded under claim 4. The conclusion it supports still holds.

VERDICT: FAIL 1, 3; outside the claims: O1
