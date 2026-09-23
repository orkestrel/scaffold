# CONTRACT-ISINSTANCE round 1 — the Orchestrator's synthesis (2026-09-23)

Sources: the workflow `wf_8c06a9dd-c8d` on `units/isinstance-round-1-brief.md`: the Grok read (`isinstance-round-1-read.md`), the three refuters on Opus 5.5 (`-refute-A.md`, `-refute-B.md`, `-refute-C.md`), the scout sweep (`-sweep.md`); the Orchestrator's probe (`contract-isinstance-probe.ts`).

## What held

- The defect: the published `isInstance` narrows to `object`; its false branch also narrows too far (`Element | null` becomes `null` in the false branch, lens B), so the published predicate is wrong in both directions.
- The candidate constraint, `C extends abstract new (...args: never) => object`, is exactly `instanceOf`'s, and every fleet call site compiles unchanged under it (lens B's probes over explicit predicate wrappers with generic classes, the boolean context, the `URL` ternary, and `instanceOf`'s body; the sweep classifies every site as an explicit predicate wrapper or a boolean context and finds none relying on direct narrowing).
- The guide row already claims `InstanceType<C>`; README names nothing; no existing test pins the narrowing (the read).

## What the refuters found, each ruled

- **Lens A and C: the constraint refuses a private-constructor class, a protected-constructor class, a value typed `Function`, and the bare `AnyConstructor<unknown>` (`new (...args: unknown[]) => unknown`), all of which the published unconstrained signature accepts at the call.** Ruling: accepted as the contract, because `instanceOf` refuses the same set today and the two functions are documented as one mechanism; a private or protected constructor is not assignable to any construct-signature type, so no constraint admits it while narrowing (lens A's own finding), and a caller holding one writes its own predicate. The guide's row states the constraint in words.
- **Lens A: with `Object` (or another constructor whose instance type admits primitives structurally) the else branch is unsound (`string | Date` loses `string`), which `value is InstanceType<C> & object` would repair at the cost of every hover reading `X & object`.** Ruling: declined; `instanceOf` has the same property, `isObject` and `isFunction` are the guards for those two constructors, and the cost is paid at every call site. The TSDoc names the limit and the guards.
- **Lens B: `InstanceType` reads the constructor's last construct signature, so a typed-array or `DataView` constructor narrows to the `ArrayBuffer`-backed view.** Ruling: a doc sentence on the row's remark; inherent to `InstanceType`, shared with `instanceOf`.
- **Lens A: widening the constraint to `=> unknown` would admit the loose constructor.** Ruling: declined; parity with `instanceOf` wins, and `value is unknown` narrows nothing.

## The fix, as briefed

`isInstance<C extends abstract new (...args: never) => object>(value: unknown, ctor: C): value is InstanceType<C>`, the body unchanged (`holds(() => isFunction(target) && value instanceof target)`), the internal comment corrected (its claim that a constraint would reject `instanceOf` is false), the TSDoc stating the narrowing, the constraint, the last-construct-signature reading, and the `Object`/`Function` limit; compile-time proofs beside the runtime ones (`expectTypeOf(...).toEqualTypeOf<...>()` in the true branch, the false branch keeping the declared type, and `Expect<Equal<…>>` over the parameter's constraint refusing a non-constructor); a compile-time proof that `instanceOf(X)` and `isInstance(v, X)` narrow identically; the guide's row and section prose in parity. The version bump and the release are the Orchestrator's.
