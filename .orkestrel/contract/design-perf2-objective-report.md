# Unit design-perf2 — objective lane report (Opus 5 through the planner role file, substituting the excluded Sol analyst; clean context)

I held the **objective** lane: correctness, constraints, and what the code, the tests, and the documented contracts permit. I ran nothing; every behavioural claim below names the probe that settles it.

# 1. Rulings

## A1 packed-array fast path — ADOPT, subject to the 6-process reading

Surviving mechanism: inside `readArrayEntries` (`helpers.ts:1023`), after the single `length` read and the single `INTRINSICS.members(value)` read, test whether that key list is exactly the canonical ascending indices followed by `length`; on a hit, fill `new INTRINSICS.list(length)` by indexed assignment with the `INTRINSICS.own(value, key)` corroboration retained per index, and freeze as today. Every other view falls to the existing walk unchanged.

Owned files: `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, `guides/contract.md`.

Tests to add, named for what they prove: "a packed array and a reordered view of the same members produce equal entries and equal `dense`"; "an array carrying an extra own string key still snapshots through the corroborated walk"; "an array carrying an own symbol key still snapshots identically"; "an index-string table hit and a table miss at the table's edge produce the same entries".

Bounding contracts and constraints the mechanism must not break: guide line 216 fixes single capture of `length` and of the reflected population, `Object.hasOwn` corroboration, ascending read order, one native sparse array of the captured length, and `dense` as reflected-count-equals-length. Three code constraints bind the fast path and none is optional. The copy must be an indexed write into `INTRINSICS.list`, never spread, `slice`, or `Array.from` — those dispatch through `Array.prototype[Symbol.iterator]`, which guide line 214 and the `appendEntries` and `limitEntries` rows name as the exact defect class this module removed everywhere else. The interned index table must be consulted only as a substitute for `INTRINSICS.text(index)` in the canonicality test at `helpers.ts:1042`, so the compared value stays the same string; above 1024 the fast path declines. The membership read at `helpers.ts:1061` must still run per index, or the split-membership pin goes false.

Pins that a wrong mechanism makes false: `helpers.test.ts:676` (reordered view equals ordinary copy, and observed descriptor probes are `['0','1','2']`), `helpers.test.ts:715` (equal-cardinality split membership refuses), `helpers.test.ts:728` (canonical index outside advertised length refuses), `helpers.test.ts:738` (unreflected descriptor-only index stays a hole), `helpers.test.ts:646` (frozen snapshot, sparse hole semantics, `Reflect.ownKeys(entries)`), `helpers.test.ts:754` (`4294967295` is metadata). Guide moves only if the row gains the interning bound; the documented semantics do not move.

Probe first: the 6-process reading on `is` and `parse`, plus a differential over a corpus that includes a Proxy array whose `ownKeys` returns the canonical list while `getOwnPropertyDescriptor` disagrees.

## A2 lean `readValue` projection — TRANSFORM

The row as written is refused, and the transformed form is stronger than the row.

Refusal ground: four unqualified named reads (`source.path` and its siblings) resolve through `Object.prototype` when the field is absent. `helpers.test.ts:573` pollutes `Object.prototype` with each of `path`, `shape`, `limit`, and `received` in turn and asserts the published context keys carry only the own field; every one of those four cases goes red. Guide line 215 states the same rule as published behaviour: "The copy reads OWN fields only… so no refusal this module authors carries — or retains by identity — a value its caller never supplied." `helpers.test.ts:603` pins the sharper half at a public door.

Surviving mechanism, and it is a different one: keep the reads eager and make the OBJECTS lazy. `readValue` (`helpers.ts:759`) computes the whole diagnostic before `attempt(callback)` and discards it on every successful read — that is where audit-medium 0.789 comes from, not from the projection shape. Inside the existing eager `attempt`, read `options?.context`, `options?.code`, `options?.subject`, the four context fields each guarded by `INTRINSICS.own(source, name)`, and the remaining own enumerable keys of `source`, into local variables. Construct the `owned` literal, the four conditional spreads, and the `context` object only in the failure branch. Every read that can throw still runs at the same point, so `readValue: options could not be read` is published for exactly the inputs that publish it today, and the success path allocates none of the diagnostic objects.

The extra-own-key sweep is load-bearing, not defensive: today `...source` invokes a throwing getter on a fifth own enumerable key and refuses. `ContractErrorContext` is structurally typed, so a variable carrying extra own properties reaches this door through the published API without an assertion. Dropping that read alters a published throw, which the Orchestrator's ruling forbids.

Owned files: `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, `guides/contract.md` (line 215 gains the read-then-build ordering).

Tests to add: "a throwing getter on an unadvertised own context field still refuses the read"; "a polluted `Object.prototype` field stays out of the published context for each advertised field" (extend the existing case to cover the guarded read); "a successful read whose options carry a throwing getter still refuses"; "a successful read builds no context object" through an allocation observation on a hostile-free path.

Probe first: the 6-process reading on `audit`, `parse`, and `explain` with the lazy-construction form rather than the named-read form, because the probed patch measured a different mechanism.

## A3b compile-time pattern capture — ADOPT

Surviving mechanism: `#auditOf` and `#reportOf` already read `owned.min`, `owned.max`, and `owned.pattern` at compile time to compute `refined` (`ContractCompiler.ts:1428`). Capture `readPattern(owned.pattern)` at that same point, inside the compiler's existing read boundary, and pass it as an additive trailing parameter to `createStringFaults`, which uses it in place of `readPattern(shape.pattern)` and reads `readPatternSource` from the captured pattern for the `limit` field.

Why this changes no published answer, stated as the constraint rather than as a hope: `owned` is the compiler's own clone from `ownShape(source)` (`ContractCompiler.ts:421`), and `ShapeCloner.#captureString` builds `get pattern()` over captured `sourceText` and `flags` (`ShapeCloner.ts:443`). Every read of that accessor yields a fresh frozen `RegExp` with identical `source` and identical `flags`, so a compile-time capture and a call-time read are value-identical, and `readPattern` preserves `source` exactly while stripping only `g` and `y`. The caller's own shape object is never read on the compiled path at all, so a mutating caller shape cannot be observed differently. The shape accessor's freshness contract (guide lines 391, 395, 700) is on the accessor and is untouched.

Two constraints bind the unit. The capture must sit inside a `readValue` at compile time, because `readPattern` throws when source or flags cannot be read and the compiler must not publish a raw host error; the `attempt` TSDoc names the "nothing inside it can throw" argument as the one that already cost this package a containment. And `createStringFaults` must keep reading `shape.min` and `shape.max` at call time, because the helper stays the published single source for a hand-rolled shape that arrives without a compiler.

Owned files: `src/core/helpers.ts`, `src/core/ContractCompiler.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/compilers.test.ts`, `guides/contract.md` (the `createStringFaults` row at line 597 moves with the signature; the guide's fault-order row does not).

Tests to add: "a captured pattern and a call-time pattern read produce the same `limit` text and the same fault order"; "`createStringFaults` without the captured argument still rebuilds from the shape"; "a compiled auditor reads the shape's `pattern` accessor a fixed number of times independent of call count".

Probe first: none for admissibility; the 6-process reading on `audit` and `explain` deep families for admission.

## A6 lazy fault paths — TRANSFORM to a probe, not to a unit

The 12% is a ceiling taken with broken paths and it is not the mechanism's number. The auditor materializes `path` into a `readValue` context on every clean object node (`ContractCompiler.ts:1556`), every clean array node (`1477`), and the keys read (`1566`). A parent-pointer form must materialize there on every call, which is where a large part of the saving goes. The reporter has no clean-path container `readValue`, so `explain` is where the mechanism's real number is visible — and the probe reported `explain` unchanged, which is evidence that the probed patch did not exercise the mechanism the row claims.

Constraints any surviving form must meet: `pathOf` (`helpers.ts:70`) skips `undefined` segments in the caller-supplied root path, so a sparse root array is compacted today and must stay compacted; materialization must walk the parent chain by index with no iterator dispatch; and every fault must still carry its own array, per `ContractCompiler.test.ts:532`.

Pins a wrong mechanism makes false: `helpers.test.ts:2407`, `compilers.test.ts:3773` (missing-key paths), `ContractCompiler.test.ts:532` (faulted alias re-walked at each path).

Probe that must run before any unit: the parent-pointer form WITH context materialization, measured on `explain` deep and `audit` deep separately, plus a sparse-root-path parity case.

## A7 mask-based extra scan — ADOPT if the 6-process reading admits it, REFUSE otherwise

Mechanism is sound and answer-identical by construction: the masked presence pass at `ContractCompiler.ts:1576` already reads `INTRINSICS.own(positions, key)` per key, and `positions` covers exactly the declared keys that `collectMembers(declaredKeys)` populates, so a key absent from `positions` is exactly a key `matchesMember(vocabulary, key)` rejects. Recording that during the presence pass and entering the loop at `1608` only then leaves fault order, the `FAULT_LIMIT` early return, and the open-object advertised read at `1620` untouched, because the skip fires only when the loop would produce nothing and read nothing.

The reading of 0.947 sits inside the declared instrument's noise, so the row is refused on measurement unless the 6-process rule admits it: median across replicates at or below 0.95 and every replicate at or below 0.98 on the audit family.

Owned files: `src/core/ContractCompiler.ts`, `tests/src/core/compilers.test.ts`. Guide does not move.

Tests to add: "a closed masked object with one undeclared key reports `extra` in key order"; "an open masked object still performs the advertised read on each undeclared key"; "a masked object at `PRESENCE_MASK_LIMIT` width and one past it report identically" (extend `compilers.test.ts:5472`).

## A10 folded array guard — REFUSE

Fails admission on measurement (0.976, 0.972), and the fold replaces a composition of published combinators with a private closure that re-states `arrayOf` and `whereOf` read order. That second statement is the drift the single-source law exists to prevent, and it buys a reading inside the instrument's noise.

## A11 `preview` fast path — TRANSFORM

The row's condition is circular: the encoded length is not knowable without encoding. Surviving mechanism: apply the fast path only when `quoted` is true and `source.length` is at or below `PREVIEW_LIMIT`, then take `INTRINSICS.stringify(value)` once, and use it only when its length minus the two quotes leaves the same answer the walk produces; otherwise fall to the existing walk. The source-length gate is what keeps the documented promise that "enormous primitive text is not fully traversed" (`helpers.ts:1768`), and the `quoted` gate keeps symbols on the walk, because the symbol branch returns unquoted text that `JSON.stringify` cannot produce.

Owned files: `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`. Guide does not move.

Tests to add: "a string whose escaped form crosses `PREVIEW_LIMIT` renders identically through both paths"; "a lone surrogate renders identically through both paths"; "a symbol renders unquoted"; "a string longer than `PREVIEW_LIMIT` is not fully encoded".

## A8 ledger ceiling — REFUSE

Ceiling under the bar, and the mechanism removes the documented one-visit-per-(node, object) reuse guarantee at guide line 273. Refused on measurement and on contract.

## Lazy fault-array slot — TRANSFORM to a probe

Admissible on identity, which is the objection the brief raises: a per-node slot left `undefined` until the first push, returning a fresh `[]` when nothing pushed, keeps `Object.is(audit(v), audit(v))` false and keeps `limitEntries` identity behaviour. It is not a shared sentinel and the `#auditOf` identity comment does not bar it. No reading exists, so it is a probe on `audit` and `explain` medium and deep, not a unit.

## `oneOf` guard-first tally — REFUSE

Guide line 271 states that where a door must perform a read that can fail, every door that answers about the same value performs it. The reporter's `oneOf` report plans are what perform the container reads; the auditor's `oneOf` runs every variant plan (`ContractCompiler.ts:1651`). A guard-first form returns `[]` for a value whose report plan would have refused, so `explain` stops performing a read `audit` performs. That is a published-throw change and a documented-guarantee change together.

## Compile-tier heap — REFUSE for this campaign

`createContract` is documented as eager lockstep over one owned snapshot, so lazy family compilation is barred at that door. Shared plan tables and interning carry no reading at all and no named byte target. Record as intentionally excluded on evidence, with the reopen condition: a measured retained-bytes target on a family reachable without moving the lockstep row.

# 2. Units

Serial order, one writer at a time from a clean committed baseline.

- **P0 probe set** (Orchestrator-owned, before any writer): the 6-process readings for A1, A2 lazy-construction form, A3b, A7; the A6 mechanism probe with context materialization; the lazy-slot probe. Dependencies: none. Acceptance: each row carries a median across replicates and a per-replicate spread against the declared admission rule, plus differential parity IDENTICAL.
- **U1 `readArrayEntries` packed path** — objective mechanical precision. Owns `src/core/helpers.ts` (the `readArrayEntries` region), `tests/src/core/helpers.test.ts`. Depends on P0. Acceptance: named tests green; `helpers.test.ts` scoped run green; no iterator dispatch introduced.
- **U2 `readValue` lazy diagnostic construction** — objective mechanical precision. Owns `src/core/helpers.ts` (the `readValue` region), `tests/src/core/helpers.test.ts`, the guide line 215 row. Depends on U1 (same file, serialized). Acceptance: the four pollution cases green; the throwing-unadvertised-key test green.
- **U3 compile-time pattern capture** — objective mechanical precision, with a documentation-voice tail. Owns `src/core/helpers.ts` (the `createStringFaults` region), `src/core/ContractCompiler.ts` (string leaves), the two test files, guide line 597. Depends on U2. Acceptance: fault order and `limit` text identical; the helper still self-sufficient without the captured argument.
- **U4 masked extra-scan gate** — objective mechanical precision. Owns `src/core/ContractCompiler.ts` (the masked auditor object plan), `tests/src/core/compilers.test.ts`. Depends on U3. Acceptance: admission met in P0; the three named tests green.
- **U5 `preview` bounded fast path** — objective mechanical precision. Owns `src/core/helpers.ts` (the `preview` region), `tests/src/core/helpers.test.ts`. Depends on U4. Acceptance: the four named tests green; boundary corpus IDENTICAL.
- **U6 guide and parity sweep** — shape and documentation voice. Owns `guides/contract.md`. Depends on U5. Acceptance: parity green; every moved row matches the shipped signature.

Every implementation unit is objective mechanical precision, which routes to Sol where the bench is live and to the Opus `implementer` as a recorded substitution where it is not. U6 is the only shape-and-voice unit.

# 3. Exit criterion draft

The campaign ends when each capability closes as implemented, repaired, retained, or intentionally excluded on evidence:

- array snapshot fast path — implemented under U1, or excluded on the 6-process reading;
- `readValue` success-path diagnostic cost — implemented under U2, with every own-read throw preserved;
- string refinement pattern capture — implemented under U3;
- masked extra-key scan — implemented under U4, or excluded on measurement;
- `preview` bounded fast path — implemented under U5;
- lazy fault path (A6) — excluded on evidence unless the P0 mechanism probe admits it, in which case it becomes a successor brief rather than a unit in this plan;
- lazy fault-array slot — excluded on evidence unless P0 admits it;
- `oneOf` guard-first tally — excluded, on guide line 271;
- folded array guard, ledger ceiling, compile-tier heap — excluded, on measurement and on the documented lockstep;
- guide parity — implemented under U6;
- gates green under one independent `verifier`.

# 4. Risks and missed candidates

- **The instrument is the largest risk.** Every adopted row sits between 0.79 and 0.95, and the declared certification says single-process medians under about 5% carry no evidence. A1, A7, and A10 all land in or near that band. Evidence to settle: the 6-process aggregate with load order swapped, with the identity control re-run in the same session.
- **A2's measured 0.789 belongs to a patch that measured a different mechanism.** The probed patch changed the projection shape; my ruling changes construction timing. The number does not transfer. Evidence: re-probe the lazy-construction form before U2 is briefed.
- **A6's `explain` control contradicts the row's claim.** If `pathOf` were the cost, the reporter would move. Evidence: the mechanism probe measured on `explain` alone.
- **Missed candidate, same frame as A2.** `contain` (`helpers.ts:874`) wraps every diagnostic door and every generator draw and allocates an `attempt` result per call; `holds` and `isRecord` do the same on every guard object node. The campaign has attacked diagnostic construction repeatedly and has not attacked the `Result` object itself, which the first campaign's inline try/catch probe measured at 0.992 in one shape only. Frame: the recurring class is "per-call object allocation on a path that discards it", and every fix so far has relocated it along the same stream. A breadth probe over `attempt`, `holds`, `contain`, and `readValue` in one pass would locate the source rather than deepening one station.
- **Missed candidate, array parser double type test.** The array parser reads `INTRINSICS.array(value)` inside `readValue` at `ContractCompiler.ts:1137` and then again through `isArray`, and the auditor repeats the pattern at `1475`. Unprobed; the second read is redundant only if the first is proven to leave no observable difference on a Proxy whose trap answers inconsistently, which is exactly the case guide line 271 governs.
- **Parity risk on U3.** An additive parameter on a published helper moves a guide row and a TSDoc block together. A unit that changes the signature without owning the prose ships drift; U3 owns both, and U6 verifies rather than repairs.
