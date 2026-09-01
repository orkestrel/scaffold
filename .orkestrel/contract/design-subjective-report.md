# Unit design-memoization — subjective lane return

`Lane`: **Subjective** — shape, taste, naming, ergonomics, design fit. I did not hold the objective lane.

## Rulings

**1. Lazy bundle — REJECT.** `createContract` is created once per shape and read many times; the eager multiple the probe measured (2.2x medium, 2.8x deep over guard-only, `probe-baseline-report.md` § What the readings decide) is paid on the path where it matters least, and the per-call path is the standalone `compile*` family, which already builds one family and drops the compiler (`compilers.ts:329`, `compilers.ts:368`). Against that saving the design sells four things a bundle exists to have. Refusal moves off the door: `#buildGenerator`'s `generate`-coded refusal for a raw value source (`ContractCompiler.ts:1975-1979`) fires at `createContract(shape)` today and would fire at first `generate` call instead, far from the declaration. Inspection degrades: `util.inspect` and a debugger print `[Getter]` for every member instead of the artifacts, on the one object in this package a developer eyeballs. Spread silently reverses the saving, because `{ ...contract }` invokes every accessor and compiles everything. And the probe shows memoized getters lose to plain members once every member is touched — 2584.0 B/instance against 72.0 B/instance for plain prototype methods (`probe-baseline-report.md` § Isolated pattern readings) — which is the state a long-lived bundle reaches. I also considered and reject the softer variant, prepare-eager and compile-lazy: it keeps preparation refusals at the door but still moves the `generate` refusal, still prints `[Getter]`, and still inherits the `#collect` retention the probe measured, so it buys the same objections at a smaller discount.

**2. Shared release sentinels — ADOPT, as `static readonly #` fields, not module-scope constants.** The measured 1152 B cold shell (`probe-baseline-report.md`, all three shapes) is the constructor allocating a live collection and an empty release peer for each of `#stack`, `#nodes`, `#index`, `#order`, `#schemas`, `#guards`, `#parsers`, `#audits`, `#reports`, and `#seeds` (`ContractCompiler.ts:192-211`). Module scope is the wrong home: `src/core/index.ts:2` re-exports everything in `constants.ts`, so a sentinel there becomes public API owing a guide parity row for an implementation detail. The class already carries `static readonly #weakMap` (`ContractCompiler.ts:127`) for exactly this reason — capture once, reach it from the instance — so hoisting the empty peers beside it introduces no new vocabulary, no new file, and no reflectable surface.

**3. Per-family release — ADAPT, and do not oversell it.** Release each plan array when every family that reads it has its root, and keep the graph release (`#source`, `#stack`, `#nodes`, `#index`, `#order`) at the all-families condition, because `#prepare` runs at the head of every build (`ContractCompiler.ts:589`) and throws when the source is gone (`ContractCompiler.ts:376-381`). The adaptation the candidate misses: `#guards` is read across families — `#buildParser`, `#buildReporter`, and `#buildGenerator` each build the guard plan on union presence (`ContractCompiler.ts:920, 1482, 1744`) — so it releases only when `parser`, `reporter`, and `generator` roots all exist. The honest limit: this does not close the small-shape inversion the probe found (guard-only 2324 B against the full bundle's 1951 B). A guard-only consumer has built nothing to release. It helps only a consumer that reads several families and stops.

**4. Retain the current design — ADOPT for the bundle, REJECT as the whole answer.** The bundle stays as it is. But treating the adoption as documentation-only leaves the guide's advice pointing at the leak the probe measured: `guides/contract.md:939-941` says reach for `ContractCompiler` when you want one artifact, and a retained compiler holding one artifact is the 2324 B case. The correction is one line of guidance, not a defence of the status quo.

**Seam the candidates miss — the retention door.** The inversion is not a memoization defect. It is that the object which never releases is the object the guide tells you to keep. Every compiled artifact is self-contained and outlives its compiler — the class states it (`ContractCompiler.ts:103-107`) and a test proves it (`tests/src/core/ContractCompiler.test.ts:112-136`) — so the answer is to hold the artifact and let the compiler go: `const isUser = new ContractCompiler(shape).guard`. That costs no code and closes the case the probe measured. I rule against the alternative door, a `release` member or `Symbol.dispose`: it adds a lifecycle verb to a class whose entire documented behaviour is that reads replay forever, and it invents a use-after-release failure mode for every consumer in the ecosystem report.

**Destructuring, as the brief requires.** Under this proposal the bundle stays a frozen plain object with data properties, so `const { parse, is } = createContract(shape)` keeps working, and `{ ...contract }` keeps working, because the compiled artifacts close over their plans rather than over `this` — the same property `tests/src/core/ContractCompiler.test.ts:112-136` proves when it runs every root after release. No auto-binding is needed, and Zod's auto-bind concern is inert here. That is itself an argument for data properties: they are destructure-safe by construction, where an accessor bundle is destructure-safe only by being invoked.

## Proposal

Four units. Every code unit's delta is entirely behind `#` privates, so `src/core/types.ts` is unchanged throughout and no pin in the terrain report moves. Run them serially; B and C share `ContractCompiler.ts`.

### Unit A — correct the retention guidance (`planner` output → Opus 5 `implementer`)

- **Type-contract delta:** none. `src/core/types.ts` untouched.
- **Seam:** `guides/contract.md:939-941` and the fence at `guides/contract.md:943-954`.
- **Pins moved:** `guides/contract.md:939-941` ("Reach for `ContractCompiler` directly when you want ONE of the six artifacts") becomes advice to hold the artifact rather than the compiler, with the fence showing `new ContractCompiler(shape).guard` bound to a name. `guides/contract.md:952-953` (replay and bundle identity) stays verbatim.
- **Expected effect:** removes the 2324 B guard-only retention (`probe-baseline-report.md` § Contract baseline readings) for a reader who follows the guide, with no code change. Moves no `dist/` bytes, so this unit alone obliges no bump and no cascade.
- **Acceptance criteria:** `guides/contract.md` states that a retained compiler retains its working set until every family exists, and that a compiled artifact outlives its compiler; the added fence executes under `tests/guides.test.ts` per `.claude/rules/documentation.md`; `npm run check` and the guide parity test pass; `git diff --stat` names only `guides/contract.md` and the guide test.

### Unit B — hoist the release peers to static private fields (`analyst`/`implementer` on GPT-5.6 Sol; on a recorded dark bench, Opus 5 `implementer`)

- **Type-contract delta:** none. Every changed member is `#`-private and invisible to `types.ts`, to `src/core/index.ts`, and to reflection.
- **Seam:** field declarations `ContractCompiler.ts:146-175`, constructor `ContractCompiler.ts:192-211`, `#release` `ContractCompiler.ts:357-369`, static block `ContractCompiler.ts:2009-2015`.
- **Shape:** each `readonly #emptyX` instance field becomes `static readonly #emptyX`, declared beside `static readonly #weakMap` (`ContractCompiler.ts:127`); `#release` reads them off the class. Freeze each array peer for effect inside the existing static block through `INTRINSICS.freeze(...)`, discarding the return so the declared mutable type is unchanged and no assertion is needed. The `WeakMap` peer cannot be frozen against `set` and is shared unfrozen — see R1.
- **Pins moved:** none. `tests/src/core/ContractCompiler.test.ts:47-62` enumerates the prototype and its descriptors; static private fields appear on neither.
- **Expected effect:** the cold `new ContractCompiler` reading falls below the measured 1152 B on all three shapes (`probe-baseline-report.md` § Contract baseline readings). Magnitude is a prediction, not a measurement — see R2 and Flagged.
- **Acceptance criteria, cheap first:** `npm run lint:check` and `npm run check` pass; `tests/src/core/ContractCompiler.test.ts` passes unchanged, including the prototype-enumeration and release cases; a case proves two compilers built from distinct declarations, each driven to full release, still answer independently; the retained `contract-baseline.mjs` instrument reports a cold `new ContractCompiler` heap strictly below 1152 B on small, medium, and deep, with CONTROL_BUFFER and CONTROL_ARRAY passing, and the unit records the exact numbers.

### Unit C — release each plan when its readers are satisfied (`analyst`/`implementer` on GPT-5.6 Sol; on a recorded dark bench, Opus 5 `implementer`)

- **Type-contract delta:** none.
- **Seam:** `#collect` `ContractCompiler.ts:347-352` and the comment at `ContractCompiler.ts:344-346`.
- **Shape:** `#collect` releases `#schemas` when `#schema` exists, `#parsers` when `#parser` exists, `#audits` when `#auditor` exists, `#reports` when `#reporter` exists, `#seeds` when `#generator` exists, and `#guards` when `#guard`, `#parser`, `#reporter`, and `#generator` all exist. Every condition is derived from the existing root fields, so no flag is stored and nothing can drift. The graph release stays at the all-families condition and keeps calling `#release`.
- **Pins moved:** the comment at `ContractCompiler.ts:344-346` ("Once all six roots exist nothing can need the graph again") is this unit's prose and is restated to separate plan release from graph release. `tests/src/core/ContractCompiler.test.ts:112-136` keeps passing and gains a sibling case for the partial consumer.
- **Expected effect:** a consumer that reads several families and stops no longer carries the dead plans; against `probe-baseline-report.md` this attacks the medium (5634 B) and deep (18878 B) partial-consumer retention and leaves the small-shape 2324 B guard-only reading substantially unchanged, because a guard-only compiler has built no releasable plan. State that limit in the unit's report rather than claiming the inversion closed.
- **Acceptance criteria, cheap first:** `npm run check` passes; `tests/src/core/ContractCompiler.test.ts` passes, with a case that reads `schema` then `guard` then reads every remaining family and proves each root still answers and replays by identity; a case that reads `guard` on a union-bearing declaration, then `parser`, `reporter`, and `generator`, and proves each answers; the retained `contract-baseline.mjs` instrument reports the medium and deep partial-consumer heap strictly below 5634 B and 18878 B respectively, controls passing, with the exact numbers recorded.

### Unit D — record the lazy-bundle refusal where the next reader looks (Opus 5 `implementer`, folded into whichever of B or C lands last)

- **Type-contract delta:** none.
- **Seam:** the `createContract` TSDoc at `src/core/compilers.ts:349-352` and the `get contract()` TSDoc at `ContractCompiler.ts:270-277`.
- **Pins moved:** `src/core/compilers.ts:349-352` ("All six artifacts are precompiled") keeps its claim and gains the reason it is a choice: the bundle publishes data properties so it destructures, spreads, and inspects, and it refuses at the door. `ContractCompiler.ts:270-277` is unchanged.
- **Acceptance criteria:** `npm run check` and the guide parity test pass; the TSDoc names data properties and door-time refusal as intended behaviour; no backticked API in the changed prose fails parity.

## Risks

**R1 — the shared `WeakMap` release peer turns an unreachable write into a process-global one.** Today a stray write to a released `#index` corrupts one compiler; shared, it would let one compiler's node indices answer another's `#locate` (`ContractCompiler.ts:466`). Realized if a future edit reintroduces a path reaching `#discover` after release, or relaxes the `#source === undefined` throw at `ContractCompiler.ts:376-381`. Settle it with Unit B's independence case and by having the objective lane rule on reachability; the array peers are frozen, so their equivalent write fails loudly instead.

**R2 — the shell reduction lands smaller than the design predicts.** Realized if the instance's private field slots, rather than the empty peers, dominate the measured 1152 B. Settle it with Unit B's instrument run; acceptance asks only for strictly lower, so the unit cannot fail on the prediction.

**R3 — per-family release drops a plan a later family reads.** Realized if a cross-family read exists beyond the guard-plan reads at `ContractCompiler.ts:920, 1482, 1744`. Settle it by having the objective lane enumerate every `#guards`, `#schemas`, `#parsers`, `#audits`, `#reports`, and `#seeds` read site before Unit C is briefed, and by Unit C's union-bearing test case.

**R4 — the bump cascade.** Units B and C move `dist/` materially, so `@orkestrel/contract` bumps and, at the user's release decision, L1 through L6 re-pin and republish in layer order (`absorb-ecosystem-report.md`). `@orkestrel/supervisor`'s `^0.0.11` pin against every other consumer's `^0.0.13` installs duplicate copies during that cascade. Realized the moment the release starts. Settle it by confirming the supervisor pin against its own `package.json` before sequencing, per the ecosystem report's own Unknowns.

**R5 — rejecting the lazy bundle leaves the 2.2x and 2.8x overpay in place.** Realized if a fleet consumer calls `createContract` per request or per row rather than once per shape. Settle it with a fleet sweep for `createContract` call sites inside request, row, or loop bodies; if such a site exists, that consumer's fix is to hoist the contract, not to make the bundle lazy.

**R6 — Unit A's guidance reads as a code fix that never landed.** Realized if the guidance sits in prose no test executes. Settle it with the executed fence `.claude/rules/documentation.md` requires.

## Exit criterion

The campaign ends when each of these is implemented, retained, or intentionally excluded on evidence, and the gates are green:

- **Retention guidance** — the guide directs a caller to hold the artifact rather than the compiler, and an executed fence proves the artifact outlives its compiler. Implemented by Unit A.
- **Per-instance shell cost** — the cold `new ContractCompiler` reading is strictly below 1152 B on small, medium, and deep, measured by the retained instrument with controls passing. Implemented by Unit B.
- **Partial-consumer plan retention** — a compiler that has built some families carries no plan array whose readers are all satisfied, proved by test and by the instrument's medium and deep readings. Implemented by Unit C.
- **Lazy bundle** — intentionally excluded, with the reason recorded in the `createContract` TSDoc. Implemented by Unit D.
- **Small-shape inversion** — intentionally excluded as a code target, on the evidence that it is retention by a caller-held compiler rather than a compiler defect, and closed by the guidance in Unit A.
- **Bump obligation** — the material `dist/` diff is measured after Unit C, and the cascade decision is surfaced to the user rather than taken.

## Flagged

Claims of mine the evidence slice does not ground:

- **No measurement exists of how consumers call `createContract`.** My argument that a bundle is created once per shape and read many times is drawn from the package's own shape — standalone `compile*` is the per-call door (`compilers.ts:329`) and `createContract` the held one (`compilers.ts:368`) — plus the guide's framing at `guides/contract.md:939-941`. It is an argument from the package's guides and tests, as the brief permits, not a reading of consumer source.
- **The predicted post-change shell size.** I expect roughly half of 1152 B, because the live and empty populations are the same. Unmeasured; that is why acceptance asks only for strictly lower.
- **Accessor-bundle semantics.** That `Object.keys` lists own enumerable accessors, that `Object.isFrozen` holds for an accessor-only frozen object, and that a spread forces every getter, are standard JavaScript semantics I did not run. They bear only on the option I reject.
- **That `#guards` is the only cross-family plan read.** Derived from `absorb-terrain-report.md` lines 9, 11, 12 and `ContractCompiler.ts:920, 1482, 1744`. I did not enumerate every `#guardAt` call site. R3 carries it.
- **Whether a TSDoc-only edit is a material `dist/` diff** under the bump rule in `.agents/orchestration.md` § What a bump obliges. I sequenced Unit A as guide-only to avoid depending on the answer, and folded Unit D into a unit that already bumps.
- **The isolated 2584.0 B touched-getter reading is directional for the bundle case, not a measurement of it.** Our bundle's members are already-built shared functions, so the accessor machinery is the only marginal cost, and no probe measured it.
