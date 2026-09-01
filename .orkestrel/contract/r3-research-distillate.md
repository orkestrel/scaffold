Question
How do Zod 4 / Valibot / ArkType skip issue, path, and result allocation on a clean walk, and which of those moves keep a fresh frozen report array?

Evidence
1. [local] `/home/user/contract/src/core/ContractCompiler.ts` `#auditOf`: “Each clean answer is its own array, because a report’s identity is the caller’s.” Unrefined leaves return a new `[]`; object and array plans always open `const faults: AuditFault[] = []` and return `limitEntries(faults, FAULT_LIMIT)`.
2. [local] `/home/user/contract/src/core/helpers.ts` `createStringFaults` / `createNumberFaults`: “A fresh array of faults.” `/home/user/contract/src/core/types.ts` `ContractInterface.audit` / `explain` and `/home/user/contract/guides/contract.md` Methods require `audit(v).length === 0 ⟺ is(v)` and `explain(v).length === 0 ⟺ parse(v) !== undefined`, pre-order, `FAULT_LIMIT` 64. Those rows do not say the report array is frozen. Frozen returns that do exist: `enumerableKeys` (`INTRINSICS.freeze(INTRINSICS.keys(value))`) and the auditor’s `INTRINSICS.freeze(INTRINSICS.keys(record))`.
3. [memory] Valibot `safeParse` (`https://github.com/fabian-hiller/valibot`, `library/src/methods/safeParse`, schema `dataset` objects): success is `{ typed: true, value }` with `issues` left unset until the first issue push; `abortEarly` / `abortPipeEarly` stop later pushes. Path strings are formatted later (`getDotPath`), not during a clean walk. Abort-early changes the published issue list.

Distillate
- Lazy issue slot (undefined until first push; freeze the array only when publishing). Probe: allocation timeline / heap delta of `contract.audit(valid)` versus `contract.is(valid)` on the medium and deep fixtures; also `Object.is(audit(v), audit(v))` must stay false and, if the campaign keeps freeze, `Object.isFrozen(audit(v))`. Must not break: fresh array identity (`ContractCompiler.ts` comment), `length === 0 ⟺ is` / `parse`, `FAULT_LIMIT`, pre-order. A module-level shared empty array would break identity.
- Path materialized only on push (parent pointer, not `pathOf` per node). Probe: same allocation timeline plus equality of fault `path` arrays on a known miss. Must not break: `pathOf`’s “no caller iterator” rule (`helpers.ts`) and the optional root-path prefix on `AuditorFunction`.
- Boolean pre-pass (`is` / `.allows`) then a traversing diagnostic only on failure. Probe: `audit(valid)` heap matching `is(valid)` plus `audit(invalid)` still returning the full pre-order report up to 64. Must not break: the two soundness laws or `anyOf` first-clean-variant (already applied). A pre-pass that then re-walks on failure doubles dirty-path work; that is a measurement, not an output change.
- On-demand error object (Valibot/Zod: `ValiError` / `ZodError` only when throwing). Probe: `explain(valid)` / `audit(valid)` create no error instance. Must not break: these doors return arrays, they do not throw on honest invalidity; unreadability still throws `ContractError` via `readValue`.
- Abort-early. Probe: `audit` / `explain` of a value with several faults. Changes observable output unless the published contract is first changed from “every fault up to `FAULT_LIMIT`.”

Question
On Node 22 with Maglev off, what is the documented or measured direction of freeze, extra-key detection, prototype checks, index strings, path copies, try/catch, WeakMap construction, and pattern getters?

Evidence
1. [memory] V8 elements-kinds and fast properties (`https://v8.dev/blog/elements-kinds`, `https://v8.dev/blog/fast-properties`): `Object.freeze` on a packed array is a map transition to a frozen map; later indexed reads of a packed frozen array stay on the packed fast path; freeze does not by itself force dictionary elements. Direction: freeze costs a transition on the writer; later reads of a small packed frozen array are not the slow path. That matches the campaign’s 47 ns/call freeze cost and the refusal to drop documented frozen returns.
2. [memory] V8 Maglev (`https://v8.dev/blog/maglev`) and TurboFan try/catch history (`https://bugs.chromium.org/p/v8/issues/detail?id=3491`, later TurboFan inlining of try): with Maglev off, the pipeline is Ignition + TurboFan; a try around a non-throwing body is a deopt/handler boundary, cheaper than Crankshaft-era deopt, still not free. The campaign already measured inline try/catch versus `attempt` as a tie, so direction here is “not a large isolated win.” `new WeakMap()` allocates an ephemeron table; a hidden-class slot write does not.
3. [local] The 0.0.15 tree already pays several of these per diagnostic call: auditor `INTRINSICS.freeze(INTRINSICS.keys(record))` and `enumerableKeys` freeze; extras via that key list plus a compile-time declared vocabulary / presence mask (`PRESENCE_MASK_LIMIT` 31, `guides/contract.md`); `INTRINSICS.parent` (`Reflect.getPrototypeOf`) per object in `#auditOf` object plans, and `matchesRecordBrand` uses `INTRINSICS.prototype` plus seven descriptor reads (`helpers.ts`); `pathOf` copies every segment on every child (`helpers.ts`); cycle ledger is one slot, `WeakMap` only on the second object (`ContractCompiler.ts` “Call-scoped value ledger”); `ShapeCloner` `#captureString` `get pattern()` builds a fresh frozen `RegExp` per read, and `createStringFaults` reads `shape.pattern` (and `readPattern` / `readPatternFlags`) at call time. CPU profile named `get pattern` + `readPatternFlags` at 4.8%.

Distillate
- Keep freeze on published snapshots; probe whether the *report* array is in that set (`Object.isFrozen(audit(v))` on a clean walk). Contract not to break: documented frozen snapshots (`enumerableKeys`, schema, cloned shapes). Campaign already refused dropping freeze on measurement.
- Extra keys: compare `Object.keys` + `Set` against declared-key `Object.hasOwn` plus `keys.length` versus declared count (closed object). Probe: medium object `audit` / `is` with no extras, Maglev off, paired harness. Must not break: closed-object `'extra'` faults, open-object additional-properties recursion, unreadability of a throwing keys trap.
- `Reflect.getPrototypeOf` per call versus a compile-time captured `Object.prototype` identity plus the existing seven-member brand. Probe: `isRecord` / object `audit` on same-realm plain objects. Must not break: foreign-realm records (`matchesRecordBrand` in `guides/contract.md`).
- `INTRINSICS.text(index)` per array slot versus a compile-time interned index-string table sized to a bound. Probe: deep array `audit` allocation count. Must not break: `path` segments as strings, `FAULT_LIMIT`.
- Parent-pointer path versus `pathOf`. Probe: clean versus dirty deep `audit` ns/op and heap. Must not break: path prefix, no `Symbol.iterator` on published paths.
- `try/catch` around a non-throwing body: already measured as a tie versus `attempt`. Further probe only if the body is shown to deopt (TurboFan `--trace-deopt`). Must not break: totality of guards; `readValue` still throws coded unreadability.
- Slot write versus `new WeakMap()`: already applied (promote on second object). Probe remains: first-object-only graphs allocate no `WeakMap`. Must not break: per-call scope (answers must not survive into the next call).
- Capture `source`/`flags` once in the string plan versus `get pattern` per call. Probe: `stringShape({ pattern })` `audit`/`is` of a matching string; heap must not show a new `RegExp` per call. Must not break: “fresh frozen zero-state `RegExp` on every `pattern` read” for the *shape* accessor (`shapers.ts` / `ShapeCloner.ts`); that contract is on reading the shape, not on the compiled hot path.

Question
What do mitata, tinybench, Google Benchmark, and the V8 team recommend for pinning, GC noise, steady-state, and a paired test that can admit a move below 4%?

Evidence
1. [memory] Google Benchmark user guide (`https://github.com/google/benchmark/blob/main/docs/user_guide.md`): pin to one CPU; `--benchmark_repetitions` and report CV; raise repetitions when CV is high; compare with non-parametric tests (Mann–Whitney appears in benchmark compare tooling). Pinning: `taskset -c 0` (Linux).
2. [memory] V8 / Node benchmark practice (`https://v8.dev/blog/maglev`, Node CLI: `--predictable`, `--predictable-gc-schedule`, `--expose-gc`, `--max-semi-space-size`, `--single-threaded-gc`): force a young-gen / full GC between rounds or size the young generation so a scavenge does not land inside a round; `--predictable` cuts timer and GC-schedule noise; Maglev off is already this campaign’s Node 22 default.
3. [memory] mitata (`https://github.com/evanwashere/mitata`) and tinybench (`https://github.com/tinylibs/tinybench`): warmup until the engine is in steady state; `do_not_optimize` / prevent DCE; tinybench `warmupIterations` / `warmupTime`. Neither publishes an admission threshold. Wilcoxon signed-rank is the paired test for per-round (A, B) times; Mann–Whitney U is unpaired. Bootstrap (BCa) CI on the median of per-round B/A ratios is the usual ratio interval. The current identity control is 0.96–1.03 idle and 0.81–0.99 under load, so a 4% bar sits inside today’s idle noise and inside today’s load bias.

Distillate
- Recipe to probe, not to adopt: `taskset -c 0` (and only CPU 0); Node `--no-maglev --predictable --predictable-gc-schedule --single-threaded-gc --expose-gc`; `--max-semi-space-size` large enough that a round does not scavenge, or `gc()` between rounds, not both as unseparated knobs; keep loading two dist copies in one process and alternate A/B order (current harness).
- Steady-state: after warmup, a rolling window of round-ratios with CV below the idle identity width (the 0.96–1.03 band is the current instrument’s floor). Probe: identity control must contain 1.0 in a 95% bootstrap CI on median(B/A); a planted 5% slowdown must exclude 1.0.
- Paired test: Wilcoxon signed-rank on the 49 paired (A, B) times, plus BCa bootstrap CI on median(B/A). A defensible sub-4% admission is: identity CI contains 1.0, and a candidate’s CI lies entirely below 0.96 (or above 1.04) *and* Wilcoxon rejects equality. Mann–Whitney U is the wrong test for paired rounds. Must not break: the identity control still passing after the recipe change; the 0.81–0.99 under-load band must be closed before any 4% claim under load.

Question
Which compile-tier techniques cut retained bytes per compiled contract without adding per-call work?

Evidence
1. [local] `/home/user/contract/guides/contract.md` `ContractCompiler`: seven lazy getters; a getter builds its own family; `createContract` / `#buildContract` still builds schema, guard, parser, auditor, reporter, and generator before freezing the bundle. Medium full contract 13681 B, deep 59257 B (brief). After all six roots exist, the owned graph and family plan arrays are released.
2. [memory] ArkType (`https://github.com/arktypeio/arktype`, `https://arktype.io`): definition-string intern cache; `.allows` is a compiled boolean function with no error objects; invocation compiles a traversing apply. typia AOT-generates one function per type (no runtime plan heap). AJV compiles one `validate` that both checks and fills `errors` (`https://github.com/ajv-validator/ajv`).
3. [memory] Valibot is an interpreter over schema objects (no per-node compiled closures; unused `parse` / `is` / `safeParse` entry points tree-shake). TypeBox `Value.Check` interprets; `TypeCompiler.Compile` emits closures (`https://github.com/sinclairzx81/typebox`). Zod 4 JIT-fills `_zod.parse` on first parse (`https://zod.dev/v4`, `https://colinhacks.com/blog/zod-4`) and does not intern equal leaf schemas by structural identity.

Distillate
- Lazy family behind a getter: already the `ContractCompiler` getter rule; `createContract` is the eager exception. Probe: retained heap of `new ContractCompiler(shape).guard` versus `.contract` on the medium and deep shapes. Must not break: `createContract` lockstep (six artifacts from one owned snapshot) and getter replay-by-identity.
- Share per-node plan tables across families (one compact record; families close over the same child index). Probe: heap of a full contract versus five parallel plan arrays (`#guards`, `#parsers`, `#audits`, `#reports`, `#seeds`). Must not break: `is` versus `parse` domain split, `anyOf` first-clean stop, refinement gate (unrefined leaves build no fault helper).
- Shared interpreter over a compact plan record (Valibot / TypeBox `Value.Check` / AJV). Probe: `is` ns/op on medium/deep versus today’s closures; heap of the compiled contract. Must not add per-call work: if `is` regresses past the paired 4% gate, the technique has failed the “without adding per-call work” bound.
- Intern repeated leaf plans by shape identity (ArkType definition cache; not Zod 4). Probe: `createContract` heap of 1000 identical `stringShape()` nodes versus one `stringShape()` aliased 1000 times (the latter is already identity-indexed). Must not break: `pattern` accessor freshness on the *shape*, node identity for cycles, and `COMPILE_NODE_LIMIT` counting expansion of the value/schema trees.

Question
What did Zod 4.x after 4.0 change for parse-path speed, issue construction, and memoization of compiled schemas?

Evidence
1. [memory] Zod 4.0 (`https://zod.dev/v4`, `https://colinhacks.com/blog/zod-4`): first-use JIT into `_zod.parse`; `safeParse` success is `{ success: true, data }` with no `ZodError`; issues live on the parse payload and are pushed on failure. Documented speedup versus Zod 3 is in that 4.0 write-up (string/object/array parse), not in a later 4.5 note.
2. [memory] Zod 4.1 codecs (`https://zod.dev/codecs`) and later 4.x locale / JSON-Schema / Standard Schema work are feature releases. This run could not fetch `https://registry.npmjs.org/zod/latest` or GitHub releases, so a named 4.5 performance changelog line is not evidenced here.
3. [memory] Zod 4 still allocates a parse payload (value + `issues` array) on every `parse` / `safeParse` in the 4.0 architecture; whether 4.5 delayed `issues: []` until first push is unverified without the releases page.

Distillate
- Candidate to probe against 0.0.15: delay the issues array until first push (Zod 4.0 still allocated it; 4.5 unknown). Probe: heap of `explain(valid)` / `audit(valid)`. Contract: fresh frozen-or-fresh array identity, soundness laws.
- Candidate: JIT memo of the compiled function on the schema object (Zod 4 `_zod.parse` on first use). Probe: second `compileAuditor(shape)` versus `compiler.auditor` replay-by-identity (already same function). Must not break: `ContractCompiler` replay-by-identity and one-ownership lockstep.
- No 4.5-specific parse-path delta is available to turn into a probe until the registry or `https://github.com/colinhacks/zod/releases` is read live.

Unknowns
- Live Zod version and the 4.5 (or later) changelog: `https://registry.npmjs.org/zod/latest` and GitHub releases were not fetched (harness rejected the request; no HTTP status).
- Whether Valibot’s current `dataset` still leaves `issues` undefined on success, and whether ArkType’s current `Traversal` still splits `.allows` from apply: recalled from those trees’ last-known layout, not read this run.
- Whether `audit` / `explain` report arrays are frozen in tests or only typed `readonly`: not visible in the allowed files; the compiler returns unfrozen `[]` / `faults`.
- V8 on this Node 22.22.2: whether freeze of a *new empty* array stays packed after freeze, and whether `String(smi)` intern-caches, need a local probe; blogs give direction, not this binary’s numbers.
- A 4% admission threshold that survives the under-load identity band 0.81–0.99 is not documented by mitata, tinybench, Google Benchmark, or V8; it is a property of this harness after GC/pinning changes.

Deviation
- `git -C /home/user/contract status --porcelain` was rejected before and after (no porcelain output). No files were edited. Shell, WebSearch, and WebFetch were rejected, so every external claim is `[memory]`, never `[fetched]`. No processes were spawned, nothing was installed. Allowed local reads only: `src/core/*.ts`, `guides/contract.md`, `package.json`.
