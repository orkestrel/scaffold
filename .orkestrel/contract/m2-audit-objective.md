# Unit m2-audit — objective lane return

## Lane and evidence basis

I held the **objective lane** (correctness, constraints, reachability, write paths, interleavings) on the harness engine (Opus 5), substituting for the dark Sol bench. Tools were `Read`, `Grep`, `Glob` only — **I executed nothing**, so every behavioural verdict below is source analysis plus the supplied diff, status, and run counts, labelled as such per `.claude/rules/quality.md` § Rounds and verdicts.

Instrument coverage: full read of `/home/user/contract/src/core/ContractCompiler.ts` (both pages, 2078 lines); regex `this\.#(stack|nodes|order|schemas|guards|parsers|audits|reports|seeds|index)` over that file; regex `#discover|#schedule|#prepare\(\)|#release\(\)|#collect\(\)|#fail\(` over that file; regex `#index|#empty` over `/home/user/contract`; explicit `dist/` sweeps; suppression/assertion sweep over that file; `peer|preconstructed|node index|released` over `/home/user/contract/guides`; `ContractCompiler` static-reflection sweep over `/home/user/contract/tests`. Control on the "no matches" readings: the `#empty` sweep did return the `SchemaCloner`/`ShapeCloner` per-instance peers, and the `dist` sweep did return `#emptyStack` while returning nothing for `emptyIndex` — so both patterns reached their populations rather than silently skipping them.

## 1. No write path reaches a shared sentinel — CONFIRMED

Writers enumerated from source, not from the comment:

- `#stack`: `ContractCompiler.ts:431`, `441` (`length` assignment), `455` (all in `#discover`); `465`, `469`, `475`, `482`, `490` (all in `#schedule`).
- `#nodes`: `453` (`#discover`).
- `#order`: `444` (`#discover`).
- `#schemas`: `654` (`#buildSchema`); `#guards`: `812` (`#buildGuard`); `#parsers`: `985` (`#buildParser`); `#audits`: `1281` (`#buildAuditor`); `#reports`: `1548` (`#buildReporter`); `#seeds`: `1809` (`#buildGenerator`).
- No write reaches a sentinel through the class reference: the only `ContractCompiler.#empty*` occurrences are the declarations (`144-159`), the freezes (`165-173`), and the `#release` assignments (`381-390`).
- Only two aliases of a collection exist in the whole file — `known` (`424`, `508`, always the live `WeakMap`, never a sentinel) and `frame` (`440`, read-only) — so the `this.#…` regex is not under-reaching through an aliased receiver.

`#schedule` is called only from `456` (inside `#discover`); `#discover` only from `414` (inside `#prepare`); `#prepare` only from the six `#buildX` at `650, 807, 980, 1276, 1542, 1804`. `#release` is called only from `#fail` (`361`) and `#collect` (`372`).

Attacks tried that failed:

- **Post-release build.** For a `#buildX` loop to write into a sentinel it needs its ready root `undefined` and `#prepare()` not to throw. After a `#collect` release all six roots are defined (`369-371` gate it), so every `#buildX` returns at its `ready` check. After a `#fail` release the phase is `failed` (`360` precedes `361`), so `#enter` (`324`) throws before any build is entered.
- **`#prepare`'s silent early return.** `396` returns without refusing when `#nodes.length > 0`. Post-release `#nodes` is `#emptyNodes`, frozen and empty, so `length` is 0 permanently and control reaches the `#source === undefined` refusal at `398-403`. The induction closes without relying on the freeze: `#emptyNodes` is empty at the first release, so `#prepare` refuses, so no write occurs, so it is empty at every later release.
- **Release mid-build.** `#collect` runs only from `#leave:355`, after `attempt(build)` has already returned; `#buildContract` (`2047-2068`) calls `#buildSchema`…`#buildGenerator` directly rather than through `#enter`, so no `#collect` fires between them.
- **Reentrancy through the declaration's `pattern` accessor.** A nested getter read hits `#enter:325-328`, is poisoned, and release is deferred to `#leave:342` → `#fail` after the outer walk returns. A hostile accessor that swallows the poison still cannot cause a write to a sentinel, because the outer walk is writing the instance's own arrays and `#release` has not run.
- **A second compiler releasing while a first is mid-`#discover`.** Release assigns a reference; it performs no write into any array. The first compiler's `#stack`/`#nodes` are its own constructor-allocated arrays (`223-232`).

## 2. A write that did reach a shared array sentinel fails loudly — CONFIRMED

Attack tried: **the published CommonJS bundle is not strict.** `package.json:27,36-39` ships `./dist/src/core/index.cjs`, and that file begins at `Object.defineProperty(exports, Symbol.toStringTag, …)` with no `"use strict"` anywhere in it (count: 0). In sloppy mode an assignment to a frozen array's index fails *silently*, which is exactly the mechanism the claim invites.

The attack fails: every enumerated writer sits inside a `ContractCompiler` method or a closure created inside one, and ECMAScript makes all parts of a class definition strict mode code regardless of the surrounding module's mode. So a reaching write is a `TypeError` in both emitted formats. `Object.freeze` also makes the empty array non-extensible, so the new-index writes at `431`, `444`, `453`, `455`, and the plan-array writes all fail rather than being dropped. The `length` assignment at `441` is never reached, because `while (this.#stack.length > 0)` at `432` is false on an empty sentinel.

`INTRINSICS.freeze` is the genuine `Object.freeze` captured at module evaluation (`src/core/constants.ts:83-85`), and `constants.ts` has exactly one import, `import type { JSONSchemaType }` (`constants.ts:1`), so there is no cycle that could leave `INTRINSICS` in TDZ when the static block at `161-174` runs at class definition. Static fields initialise in declaration order, so all nine sentinels exist when that block executes.

Two residuals, stated rather than hidden:

- The freeze inherits the capture limit `constants.ts:26` and `ContractCompiler.ts:121-126` already document: a consumer module ordered earlier that replaces `Object.freeze` with identity leaves the sentinels unfrozen, and then a reaching write would leak silently. Reachability still bounds it — no such write exists — and the limit is documented on the interface that owns it, which is what `.claude/rules/quality.md` § Rounds and verdicts prescribes.
- The sentinels are declared with mutable element types (`144-159`) so they stay assignable to the working fields, so the compiler cannot catch a future write to one; only the runtime freeze can, on a path no test can reach. The writer flagged this; no run available through the public surface settles it, so naming a run would be dishonest rather than useful.

## 3. The `#index` absence design is sound — CONFIRMED

Every dispatch on the index is narrowed ahead of it: `#discover` narrows at `424-430` before `recall` at `451` and `retain` at `454`; `#locate` narrows at `508-514` before `recall` at `515`. Grep for `this.#index` returns exactly `195` (declaration), `225` (constructor), `383` (`#release`), `424`, `508` — no third dispatch site. The other `recall`/`retain` dispatches in the file (`599`, `602`, `634`, `637`) take `memo`, the call-scoped ledger, narrowed at `595` and `630`.

Reachability attacked directly — I tried to construct the state that reads the index after release:

- **`#discover`'s refusal.** `#prepare` is its only caller and clears `#source` only at `415`, *after* `#discover` returns, so the state `#source !== undefined && #index === undefined` is never produced; `#release:380,383` clears both together. The refusal is unreachable.
- **`#locate`'s refusal.** `#locate` is called only from `#schemaAt:662`, `#guardAt:820`, `#parserAt:993`, `#auditAt:1302`, `#reportAt:1563`, `#seedAt:1830`. I checked every call site of those six: each sits in build-time code, never inside a returned closure — including the ones most likely to escape, `#seedOf`'s union `this.#guardAt(owned)` at `1994`, `#guardOf`'s array `this.#guardAt(owned.items)` at `862`, `#parserOf`'s array at `1057`, and the auditor/reporter item bindings at `1358`/`1621`, all of which bind outside the returned function. So no handed-out artifact re-enters `#locate` at call time.
- **The released-then-`contract` vector**, which is the one that would have broken this: read the six getters individually so `#collect` releases, then read `contract`. `#buildContract:2052-2057` re-enters each `#buildX`, but every one returns at its `ready` check, so `#prepare`, `#node(0)`, and `#locate` are never reached. Confirmed against `2047-2068`.

## 4. Cross-compiler isolation holds under sharing — CONFIRMED, with the miss named

Isolation attacked and held. One compiler's release assigns references; it writes into no array. No released collection is ever published — the getters return `#schema`, the six roots, and the frozen bundle, never `#nodes`, `#order`, or a plan array — so the sharing does not even leak sentinel identity to a consumer. The static state `#visits`/`#scope` (`134-135`) is untouched by the diff.

What the added case (`tests/src/core/ContractCompiler.test.ts:140-170`) would miss, since the brief asks: the contamination the freeze actually exists to prevent is a write that makes `ContractCompiler.#emptyNodes` non-empty, after which **any** released compiler's `#prepare()` would take the `this.#nodes.length > 0` early return at `396` instead of refusing at `398-403`, and then build a family over another compiler's leaked nodes. The case cannot see that, because a released compiler never calls `#prepare` again and no public seam writes the sentinel. Concretely: deleting the whole `static { … }` block at `161-174` leaves that case green.

The case does catch the contamination its own comment names — published-artifact cross-talk — so the claim as worded stands. But bound it on the record: the writer reports both added cases passed against the unedited source (`m2-sentinels-report.md:30`), so neither binds to anything the m2 change introduced. They are preservation guards satisfying brief criteria 5 and 6, not discriminators of the sentinel design, and no test in the repository binds to the freeze.

## 5. Terminal replay is unmoved — CONFIRMED

The diff touches none of `#enter` (`322-338`), `#leave` (`340-357`), or `#fail` (`359-363`). The only interaction is `#release` now setting `#index = undefined` (`383`), and no replay path reads the index: `#enter:324` throws `state.error` before any build is entered. Attack tried: a settled compiler whose replay path re-enters `#prepare` or `#locate` and now meets the new coded refusal instead of the original error — unreachable, because `#enter` throws first at every one of the seven getters (`252-253`, `259-260`, `266-267`, `273-274`, `280-281`, `287-288`, `301-302`).

The added case (`264-282`) pins `reporter` as the settling door; the pre-existing case at `240-262` already pins `schema` as a settling door with the same seven-getter replay. So "whichever getter settled it" is pinned for two doors and structurally guaranteed for the rest by the single `#fail` path, not pinned by the added case alone.

## 6. Diff scope, no assertions, no suppressions, `#emptyIndex` gone — CONFIRMED

The live source matches the supplied post-state exactly at every hunk: `136-174` (sentinel declarations plus the new static block), `186-195` (index comment and field), `220-240` (constructor), `375-391` (`#release`), `418-430` and `448-458` (`#discover`), `499-523` (`#locate`). The class-tail `pinMembers` block (`2070-2076`) is untouched. No other region of the file differs from what the diff implies.

Sweep for `@ts-(ignore|expect-error|nocheck)`, `eslint-disable`, ` as <Type>`, and non-null `!` over the whole file returns only comment prose (`549`, `570`, `678`, `721`, `929`, `1158`, `1466`, `1722`, `1954`) — no suppression, no assertion, no non-null operator.

`#emptyIndex` appears nowhere: `src/`, `tests/`, `guides/`, and `dist/` all return zero. The control on that reading is that the same `dist/` sweep returns `#emptyStack` in `index.js`, `index.cjs`, and both maps, so the path was genuinely searched. (The stale `dist/` still carries the pre-change per-instance `#emptyStack`, as the writer recorded; `prepack` rebuilds it, so nothing ships stale.)

The test file's two hunks are pure additions and the diffstat shows no deletions in it; I read the surrounding cases (`44-138`, `172-262`, `284-293`) and they read as unmodified originals. I could not diff against `1cd4ac8` without exec, so this half rests on the supplied diff and diffstat.

## 7. Changed comments state only what the code cannot show; freeze placement — CONFIRMED (objective half)

No changed or added comment states anything the source contradicts. I checked each against the code:

- `136-143`: "an instance allocates one collection per family instead of two" — matches `220-232` against the removed constructor lines. The safety argument is compact but not circular: the base case is that `#emptyNodes` starts empty and `#prepare:396-403` therefore refuses on a released compiler, which closes the induction without the freeze; the freeze is correctly presented as the loud-failure backstop rather than as the ground.
- `186-193`: `Object.freeze` reaching an array's writes and not a `WeakMap`'s is accurate, and it is the correct reason the index takes `undefined` rather than a shared peer.
- `162-164`: freezing in separate statements with the return discarded does keep the declared mutable element type, which is what makes `381-390` assignable.
- `419-423`: "`#prepare` is the only caller" — verified, the sole call is `414`.
- `500-507`: `INTRINSICS.apply` taking its receiver type from the argument, and the unreachability argument, both hold as ruled under claims 2 and 3.
- `375-378`: "nothing here constructs a collection at all" — true of `379-391`.

Placement is objectively sound: the sentinels are `static readonly` fields declared at `144-159`, so they are initialised before the static block at `161` runs, and the class-tail `pinMembers` block at `2070` runs later with no interaction. `pinMembers` pins the prototype only, which is correct — the sentinels are `#` statics and unreachable from outside the class by language rule.

**Referred to the subjective lane:** whether the dedicated block beside the declarations, rather than the class-tail block, is *consistent with the file's existing comment discipline*. That is a taste judgment on comment placement and voice, outside my lane; I rule only that it is factually correct and technically sound.

## 8. The report-only guide finding is correctly scoped — CONFIRMED

`guides/contract.md:491` (the `ContractCompiler` row of the Compilers API table) ends: "the owned graph, the node index, the order and every family plan are released through preconstructed peers". `#release:383` drops the index to `undefined` rather than assigning a peer, so the sentence over-claims for the node index exactly as reported.

I attacked the *scoping* by sweeping `/home/user/contract/guides` for `peer|preconstructed|node index|released`. The only other `contract.md` hits are `334`, `336`, `657`, and `663`, and every one of them describes `SchemaCloner` or `ShapeCloner`, which still hold per-instance peers (`SchemaCloner.ts:59,66,82,84,253,254`; `ShapeCloner.ts:80-125,954-959`) and are untouched by this change. So `491` is the only drift site — the writer's scoping is complete, not merely plausible.

The sentence sits in a table cell under no fence, and it introduces no new backticked identifier, so guide parity is unaffected; the writer's `test:guides` exit 0 is consistent with that. The replacement sentence is accurate against the changed source on every clause: shared frozen class-owned peers for the graph, order, and plans (`381-390`); the index dropped outright (`383`); the reason (freeze does not reach a `WeakMap`'s writes) correct; the surviving state (six roots, optional frozen bundle, terminal state) correct.

One bounded note for the documentation unit, not a defect in this scoping: both the current sentence and the replacement say release happens "after all six roots exist", while `#fail:361` also releases. That imprecision predates m2 and is unchanged by it. Also, `.claude/rules/documentation.md` requires a prose claim about behaviour under no fence to carry the executed assertion that would break if it went false — the replacement's claim about `#index` is about a `#` private and has no such seam, so the documentation unit needs a ruling on how to state it rather than a new gate.

## Findings fitting no claim

None. No substantiated defect outside the numbered claims.

VERDICT: PASS — 8 of 8 confirmed, no findings outside the claims
