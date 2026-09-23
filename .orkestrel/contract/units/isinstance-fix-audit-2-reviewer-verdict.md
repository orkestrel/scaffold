# ISINSTANCE-FIX audit round 2 — the objective lane's verdict, held by `reviewer` on Opus 5.5 (returned 2026-09-23, native subagent, 46 tool uses, 299 s; retained from the subagent's return text)

Objective lane, held by `reviewer` on Opus 5.5 (the `opus` alias served claude-opus-5-5). The subjective lane was not run this round. Paths are relative to `C:/Users/mikes/WebstormProjects/contract` unless another path is named.

## Numbered verdicts

**1. CONFIRMED**
- **The body and signature are unchanged.**
  - The diff (`isinstance-fix-2.diff`, around lines 43–44) keeps `const target: unknown = ctor` and the `holds(() => isFunction(target) && value instanceof target)` line as unchanged context.
  - The emitted declaration text is identical in both rounds: `isinstance-fix-gates.log.txt` line 72 and `isinstance-fix-2-gates.log.txt` line 72.
  - The line number moved from 2884 to 2887. That equals the remark's growth from 9 lines to 12, so no other declaration moved.
- **The comment gives only a runtime reason.** It is at `src/core/validators.ts` around lines 404–406.
- **Unknown 1, answered from the specification.** ECMA-262 `InstanceofOperator(V, target)` runs these steps:
  1. If `target` is not an Object, throw a `TypeError`.
  2. Look up `GetMethod(target, @@hasInstance)`. This finds own and inherited handlers, and runs a getter if there is one.
  3. If a handler is found, return `ToBoolean(Call(handler))`.
  4. Otherwise, if `target` is not callable, throw a `TypeError`.

  So if `isFunction` were removed, a non-callable right-hand side would do one of two things:
  - If it has a `Symbol.hasInstance` handler, the handler runs and can answer `true`.
  - Otherwise it throws a `TypeError`. `holds` contains the throw, so the answer is `false` either way.

  The comment says the check prevents both outcomes, and that is exact. The sentence needs no added word for truth. "its own" means the right-hand side's handler, and the lookup also reaches inherited handlers; that is recorded under Bounds.
- **Attack tried, and it failed.** I looked for a non-callable right-hand side where the check changes the answer outside the `Symbol.hasInstance` path. There is none:
  - A primitive fails step 1 and throws, which `holds` contains.
  - A plain object fails step 4 and throws, which `holds` contains.
  - `Object.create(Function.prototype)` reaches `OrdinaryHasInstance`, which answers `false` without throwing.

**2. BROKEN**: the false-branch sentence ("The false branch drops each member of the declared union that is assignable to the instance type and keeps the rest") overstates what the compiler does.
- **What is wrong.** The compiler drops a union member by subtype, not by assignability. The installed checker is TypeScript 6.0.3 (`node_modules/typescript/lib/typescript.js`, around line 2292).
  - `getNarrowedTypeWorker` (around lines 75948–75985): for a type predicate, `checkDerived` is false. The false branch computes the true-branch type first, then filters it out with `!isTypeSubsetOf(t, trueType)`, which is an identity or union-membership test (around line 74597).
  - The true branch maps each member `t` through `isTypeStrictSubtypeOf(t, c) ? t : isTypeStrictSubtypeOf(c, t) ? c : …`, where `c` is the instance type. So `t` is dropped only when `t` itself is a subtype of the instance type.
  - The subtype relation sets `requireOptionalProperties` for any source that is not an object literal (around line 71505). `getUnmatchedProperties` then treats a missing optional target property as unmatched (around line 73102). The assignability relation does not.
- **Counterexample, derived from that code path and not executed.**

  ```ts
  class Base { readonly base = true }
  class Tagged extends Base { readonly tag?: string }
  declare const value: Base | null
  const assignable: Tagged = new Base() // compiles: Base is assignable to Tagged
  if (!isInstance(value, Tagged)) value // Base | null, not null
  ```

  How the compiler handles it:
  - `Base` is not a subtype of `Tagged` because it lacks `tag`.
  - `Tagged` is a strict subtype of `Base`, so the true branch is `Tagged`.
  - `Base` is not in that set, so `Base` stays in the false branch.

  The remark says `Base` is dropped. An `any`-typed property gives a second case where assignability and subtype differ.
- **Why it matters.** This sentence ships in the published declarations of 0.0.18. It promises narrowing that the compiler does not give when a subclass adds only optional members.
- **What right looks like.** Write "drops each member of the declared union that is a subtype of the instance type and keeps the rest, so a subclass that adds no member narrows its base out as well." That wording fits all four measurements in `contract-isinstance-probe-structural.ts`: `Same` gives `null`, `Derived` keeps `Base | null`, `Function` keeps `string`, and `Object` gives `never`. If you want wording that avoids the word "subtype", name the optional-member exception explicitly instead. Settle the wording with the probe under Referrals.
- **Sentences that held.** For each one I tried to find a case the compiler rejects, and found none.
  - **"reads the constructor's last construct signature"**: `InstanceType` infers through the conditional, and the round-1 LastOverload measurement confirms it.
  - **The constraint in words**: the constraint text is identical at `src/core/validators.ts` around line 400 and `src/core/combinators.ts` around line 260.
  - **Private or protected constructor refused**: `constructorVisibilitiesAreCompatible` only lets a public signature satisfy a public target, and round-1 probe 2 measured the refusal.
  - **Bare `AnyConstructor` refused**: its return type is `unknown`, which is not assignable to `object`. `src/core/types.ts` around line 294 declares it.
  - **A value typed `Function` cannot be passed**: `lib.es5.d.ts` lines 273–305 declare `interface Function` with no construct signature.
  - **The constructor `Function` can be passed**: `FunctionConstructor` declares `new (...args: string[]): Function` at line 312, and test line 792 compiles under the green check.
  - **`Object` alone makes the false branch unsound**: the structural probe's `objectFalseBranch` gives `never`, and `functionFalseBranch` keeps `string`.

**3. CONFIRMED**
- **The proofs are present.** They are at `tests/src/core/validators.test.ts` lines 752–793, each beside a runtime assertion. The `Equal` helper is the identity form (`tests/setup.ts` around line 3411).
- **Mutations tried, all caught:**

  | Mutation | Caught by |
  | --- | --- |
  | Published `isInstance<C>(…): value is InstanceType<C & AnyConstructor<object>>` | Parity: `Parameters<…>[1]` erases to `unknown`. Also the round-1 narrowing proofs. |
  | Constraint dropped | Parity |
  | Return widened to `object` | The `Derived` case, per the round-1 mutation table. The `Same` case alone does not catch it. |
  | `=> unknown` | Parity and the `AnyConstructor` assertion: two `TS2344` diagnostics each at lines 776/777 and 783/784, from the Orchestrator's own run (`isinstance-fix-2-gates.log.txt` lines 75–79) |
  | `new` instead of `abstract new` | Parity (identity `Equal`) and the abstract `Shape` case |
  | `abstract new (...args: any) => object` | Parity |

- **The `Function` assertion.** It passes under `=> unknown`, as expected. Any constraint without a construct signature (`object`, `Function`, an unconstrained `C`) turns it red, so it pins the construct-signature requirement.
- **Green reading.** 1361 tests in 19 files and `npm run check` exit 0, both from the Orchestrator's run, not from the writer's report.
- **Residual, outside `isInstance`'s own signature.** If `isInstance` and `instanceOf` are both changed to `=> {}`, every proof still passes:
  - Parity holds because both sides change together.
  - `unknown` is not assignable to `{}`, so `AnyConstructor` is still refused.
  - `Function` has no construct signature, so it is still refused.

  The mutation needs an edit to `combinators.ts`. It separates `{}` from `object` only for construct signatures that return a primitive, and no class produces one. I recorded it and did not fail the claim on it.
- **Line numbers check out.** The hunk header `+692` and the offsets put the parity assertion at 776, `AnyConstructor` at 783, and `Function` at 790. The checkout file matches.

**4. CONFIRMED**
- **Status and gates.** `isinstance-fix-2-status.txt` lists exactly the three owned files, so `package.json`, `package-lock.json`, `README.md`, `guides/contract.md`, and the vendored files are untouched. The Orchestrator's run shows `check`, `oxlint`, `oxfmt`, `test:src`, `test:guides` (48 of 48), and `build:src:core` each exiting 0.
- **Parity.** The guide row at `guides/contract.md` line 126 matches the unchanged description at `src/core/validators.ts` around lines 363–364.
- **E6 and banned tokens.** No alias, overload, `@deprecated` tag, or shim was added. In the added lines, `as`, `private`, and `protected` appear only in TSDoc prose and a test title. None contains `any`, a non-null `!`, `@ts-`, or `eslint-disable`.
- **Consumer probe.** It refuses exactly one line, at (42,63), for the `{}` argument (gate log lines 85–87).
- **Attack tried, and it failed.** I checked whether `AnyConstructor` is still used in `validators.ts`. It is, by `isConstructor` around line 1244, so the import is not dead.

## Findings outside the claims

None.

## Attacked and held

- **The `Same` true-branch assertion** (`toEqualTypeOf<Same>()`, line 760) cannot tell `Same` from `Base`, because the two are structurally identical and have no private members. The false-branch `null` assertion is the half that carries the proof, and it goes red if the compiler keeps `Base`.
- **The consumer probe's `acceptedFalseBranch` line** still cannot catch over-narrowing, as round 1 noted. The `Derived` case covers that fact.
- **The runtime companions** at lines 785 and 792 bind nothing at compile time. Line 792 does prove that the constructor `Function` is accepted at the call.

## Referrals

- **To the Orchestrator** (I cannot run a command): run the settling probe for claim 2 against the built declaration. Add `class Tagged extends Base { readonly tag?: string }` to `contract-isinstance-probe-structural.ts`, with `const assignable: Tagged = new Base()` as the assignability control. Then assert the false branch of `isInstance(value, Tagged)` over `value: Base | null` equals `Base | null` with the identity `Equal`, not with a return statement. The claim-2 counterexample predicts it compiles. If the false branch is instead `null`, my claim-2 ruling is wrong and the sentence stands.

## Bounds

- **Comment wording.** In "its own `Symbol.hasInstance`", "own" can be read as "own property", but the lookup also reaches an inherited handler. "its `Symbol.hasInstance`" avoids that reading. The sentence is true as written.
- **Relative import.** `tests/src/core/validators.test.ts` line 4 imports `instanceOf` from `'../../../src/core/combinators.js'`. The same file already imports combinators such as `recordOf` from the `@src/core` barrel, and `combinators.test.ts` imports `instanceOf` from there. No rule forbids the relative path, and the gates pass.
- **"returning an object".** The constraint also accepts a construct signature that returns `any`. The sentence is incomplete there, but it does not claim the accepted set is exclusive.

VERDICT: FAIL 2; outside the claims: none
