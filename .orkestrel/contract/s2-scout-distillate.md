**Question**
Where remaining per-call work sits on `@orkestrel/contract` 0.0.15 compiled families (`is` / `parse` / `audit` / `explain` / `generate`) after the 2026-09-01 campaign, with `file:line` pointers into `/home/user/contract/src/core` and `/home/user/contract/tests/src/core`.

**Evidence**

1. Medium is a closed five-key object (`name` string min 1, `age` integer 0..150, `active` boolean, `tags` array of strings max 16, `role` three-literal). That width is under `PRESENCE_MASK_LIMIT` 31 at `constants.ts:378`, so every object family takes the mask branch (`required.length <= PRESENCE_MASK_LIMIT` at `ContractCompiler.ts:955`; parser/auditor/reporter use `entries.length` at `1213`, `1544`, `1854`).

2. Guard object plan still starts with `isRecord` (`ContractCompiler.ts:967`) then `enumerableKeys` (`968`) then `attempt` around the walk (`973`). `isRecord` is `holds(() => matchesRecordBrand(value))` (`validators.ts:542-543`). `holds` is `attempt` plus a boolean test (`helpers.ts:896-898`). `attempt` always allocates a `{ success, value }` or `{ success, error }` result (`helpers.ts:727-732`).

3. Same-realm `{}` brand: `matchesRecordBrand` calls `INTRINSICS.array` and `INTRINSICS.prototype` and returns at `prototype === INTRINSICS.base` (`helpers.ts:967-969`). The seven-descriptor loop (`helpers.ts:971-994`) does not run.

4. `enumerableKeys` always does `attempt(() => INTRINSICS.freeze(INTRINSICS.keys(value)))` (`helpers.ts:1163-1171`). There is no mask bypass. `Object.keys` allocates a fresh string array; `Object.freeze` freezes that same array. Guide names this as the package-wide key view (`guides/contract.md:219`).

5. In-width presence ORs bits with `INTRINSICS.own(positions, key)` (`ContractCompiler.ts:974-983`). `collectMembers` is only the `else` at `985-990`. Extra/undeclared keys use `INTRINSICS.own(map, key)` (`995`), not a per-call `Set`.

6. `holds` / `isRecord` / `attempt` / `enumerableKeys` freeze still run on the masked object path. `collectMembers` does not. The input is never frozen. Guard totality (never throw) is `guides/contract.md:15` and `guides/contract.md:269`.

7. Repeating nodes (`array` / `object` / `union` / `optional` / `nullable`) wrap the plan in `#trackGuard` (`ContractCompiler.ts:587-591`, `857`). Per call the wrapper opens a scope (`599-604`), resets the slot when `filled !== scope` (`607-612`), and on the first object stores `slot`/`kept` with no `WeakMap` (`619-621`). `INTRINSICS.apply(recall/retain)` and `new WeakMap` run only on a second distinct object (`614-627`).

8. Array guard is `whereOf(arrayOf(item), length)` when `max` is set (`ContractCompiler.ts:906-910`). `arrayOf` is `holds` + `isArray` + `readArrayEntries` + per-index item guards (`combinators.ts:76-86`). `whereOf` is another `holds` (`combinators.ts:858-859`). `isArray` is itself `holds(() => INTRINSICS.array(value))` (`validators.ts:604-605`). Nested `holds` therefore nest `attempt` results.

9. `readArrayEntries` (`helpers.ts:1023-1070`) always allocates: `attempt` result; `collected: number[]`; `keys: string[]`; `INTRINSICS.members(value)` (`Reflect.ownKeys`); `new INTRINSICS.list(length)`; `INTRINSICS.freeze(entries)` and `INTRINSICS.freeze({ entries, dense })`. Sort via `sortValues` (`1055`, `helpers.ts:198-206`) runs only when own keys arrive out of order (`1045-1046`). An ordinary dense array still pays the snapshot; it skips `sortValues`.

10. Refined string guard is `stringOf` → `whereOf(isString, boundsOf)` (`combinators.ts:1044-1052`, `ContractCompiler.ts:881-885`). `boundsOf` is another `whereOf(isFiniteNumber, …)` (`combinators.ts:960-964`). Integer-with-bounds is `intersectionOf(isInteger, boundsOf)` (`ContractCompiler.ts:891-893`, `combinators.ts:816-829`). Literal is `holds(() => matchesMember(allowed, value))` (`combinators.ts:222`), and `matchesMember` is `INTRINSICS.apply(INTRINSICS.member, members, [value])` (`helpers.ts:261-262`) — the `[value]` list is allocated per call.

11. Parser object: `isRecord` + `enumerableKeys` + `attempt` (`ContractCompiler.ts:1237-1244`). Masked presence uses `seen` bits (`1247-1254`); `collectMembers(keys)` only when `!maskable` (`1245`). Result is always `INTRINSICS.create(null)` (`1259`) plus per-declared-key assignment (`1278`). Closed objects skip the extra-key copy (`1280` is `if (open)`). No object/array identity fast path: a guard-valid input is rebuilt (`ContractCompiler.ts:1256-1294`, `1154-1165`). Leaf primitives that are already the right type return by identity (`parsers.ts:83-84`, `107-109`, `165-166`; `ContractCompiler.ts:1123`). Union anyOf returns the raw value when a variant guard matches (`1345-1348`).

12. Array parser, when `isObject(value)` (arrays included), always `readValue(() => INTRINSICS.array(value), 'compileParser', …)` (`ContractCompiler.ts:1136-1140`), then `isArray`, then `readArrayEntries`, then a fresh `result: unknown[]`. Failure of the snapshot is rethrown through `readValue` (`1144-1151`).

13. `readValue` on every successful read still builds diagnostics inside `attempt` (`helpers.ts:759-827`): owned four-field projection, optional context object, `{ reader, subject, code, context }`, then a second `attempt` around the callback.

14. Auditor/reporter roots are `#exposeAudit` / `#exposeReport`: `contain(() => plan(value, path), …)` (`ContractCompiler.ts:1398-1399`, `1719-1720`). `contain` is `attempt` plus passthrough (`helpers.ts:874-882`). Default `path = []` allocates a new array when the caller omits it. Repeating diagnostic nodes wrap `#trackFaults` (`1384`, `1709`): first clean object fills the slot; `WeakMap` only on a second distinct clean object (`667-681`); a faulted first value keeps `kept === undefined` so later arrivals re-walk (`673-675`).

15. Auditor object, valid path `readValue` sites: if `isObject`, `readValue(() => INTRINSICS.parent(value), 'compileAuditor', { subject: 'object', context: { path, shape: 'object' } })` (`ContractCompiler.ts:1554-1558`); then `isRecord`; then `readValue(() => INTRINSICS.freeze(INTRINSICS.keys(record)), …)` (`1564-1568`). Reporter uses `enumerableKeys` instead (`1868`) and has no parent probe.

16. Auditor/reporter object walk still `attempt`s (`1575`, `1878`). Masked: `present` is `undefined`, bits in `seen` (`1576-1586`, `1879-1889`). Hoisted vocabulary is `declared` / `known` from compile-time `attempt(() => collectMembers(…))` (`1542-1543`, `1852-1853`); per-call `collectMembers(declaredKeys)` only if that hoist failed (`1577`, `1880`). Extra-key scan: auditor always `matchesMember(vocabulary, key)` (`1612`); reporter only if `open` (`1931`). Closed valid medium therefore still pays auditor `matchesMember` once per enumerable key, and not on explain.

17. `pathOf(path, entry.key)` runs per declared field on both diagnostic object walks (`1600`, `1606`, `1907`, `1918`, `1924`). `pathOf` always allocates a fresh `string[]` (`helpers.ts:70-85`). Array diagnostic nodes do `pathOf(path, INTRINSICS.text(entryIndex))` per index (`1498`, `1802`).

18. Clean object-level report: `const faults: AuditFault[] = []` / `Fault[] = []` (`1569`, `1872`) returned through `limitEntries(faults, FAULT_LIMIT)` (`1636`, `1947`). `limitEntries` returns the same array when `length <= limit` (`helpers.ts:137-138`). No per-field fault objects on a clean walk.

19. Clean leaf arrays: unrefined string/boolean/null/literal return `[]` (`ContractCompiler.ts:1434`, `1451`, `1467`, `1749`, `1768`, `1783`). Refined string/number call `createStringFaults` / `createNumberFaults` (`1434`, `1445`, `1749`, `1761`), which `readValue` a fresh `faults: []` (`helpers.ts:1864-1907`, `1933-1975`). Array nodes always `createArrayFaults` (`1501`, `1805`) — there is no compile-time refined gate on array bounds. `preview` is only on type-fault branches and inside those helpers when a constraint fails; a clean walk does not call `preview`.

20. Union anyOf audit/report returns at the first empty variant plan (`ContractCompiler.ts:1655-1663`, `1967-1972`) without later variant plans. `oneOf` runs every variant plan (`1662-1664`, `1970-1973`). Reporter `oneOf` then re-runs every variant **guard** to tally `matched` (`1976-1981`). Auditor `oneOf` tallies empty reports, not a second guard pass (`1654-1670`). Deep’s tagged union is `anyOf`, so the first-clean stop applies.

21. Generator door: `contain(() => plan(random ?? seededRandom(INTRINSICS.now())), 'compileGenerator')` (`ContractCompiler.ts:2035-2038`). Omitted `random` allocates a `seededRandom` closure (`helpers.ts:1544-1558`). `drawRandom` is `contain` around `attempt(random)` (`helpers.ts:1275-1293`). String seed draws once per character (`ContractCompiler.ts:2063-2064`). Object fields use `INTRINSICS.define` with a `{ value, enumerable, configurable, writable }` descriptor (`2172-2177`), never assignment. Union candidates: `attempt(() => plan(random))` then `guard(outcome.value)` (`2219-2227`) — the compiled union guard re-runs on every successful candidate, bounded by `GENERATION_ATTEMPT_LIMIT` (`2207`).

22. Compile-time object node, all families: null-prototype `positions` (`956`, `1214`, `1545`, `1855`); bitmask `full` on the guard (`957-964`); hoisted `collectMembers` vocabulary on parser (`1192-1200`), auditor (`1542-1543`), reporter (`1852-1853`); per-family closures; `#trackGuard` / `#trackFaults` wrappers for repeating nodes (`857`, `1384`, `1709`). Schema object: `INTRINSICS.create(null)` properties plus `INTRINSICS.freeze` of schema/properties/required (`787-810`). Bundle freeze is compile-once (`2270`).

23. `ShapeValidator.validate` calls `#clear` before and after the walk (`ShapeValidator.ts:162`, `166`). `#clear` (`181-200`) allocates `{ phase: 'idle' }`, empty arrays for stack/path/captures/post/height/reach/via/counts/children, `new WeakSet`, two `new WeakMap`. Field initializers already allocated the same shapes once at construction (`50-105`); each `validate` drops and replaces them twice.

24. `ShapeCloner` constructor allocates working maps and `#empty*` peers (`ShapeCloner.ts:111-125`). `#settle` rebinds onto the empty peers (`953-959`) and does not allocate new empties. `SchemaCloner` matches (`SchemaCloner.ts:78-85`, `252-254`). Fresh cloners are constructed per `cloneShape` / `ownShape` / `cloneSchema` call (`cloners.ts:150-153`, `180-189`, `106-108`).

25. Public doors that reach `ShapeValidator.validate` / `#clear`: `validateShapeDepth` (`compilers.ts:77-78`); every `compile*` / `createContract` via `ContractCompiler.#prepare` (`ContractCompiler.ts:421-423`); `cloneShape` via `ShapeCloner.#validateShape` (`935`); `ownShape` fallback (`cloners.ts:189`); builders `stringShape` (`shapers.ts:163`), `numberShape` (`208`, also `integerShape` at `227`), `booleanShape` (`249`), `nullShape` (`272`), `literalShape` (`345`), `arrayShape` (`398`), `objectShape` (`476`), `recordShape` (`517`), `unionShape` (`541`), `oneOfShape` (`587`), `optionalShape` (`605`), `nullableShape` (`625`), `jsonShape` (`658`), `rawShape` (`693`, `695`). `cloneSchema` reaches `SchemaCloner` empty peers (`cloners.ts:106-108`); `rawShape` and raw schema compile also reach it (`shapers.ts:694`, `ContractCompiler.ts:843`).

26. Pinning tests — ledger: `ContractCompiler.test.ts:429` (no answer across calls), `443` (no clean report across calls), `459` (no WeakMap at build; map only when a second distinct object hits a node), `532` (faulted alias re-walked at each path). Mask: `compilers.test.ts:5472` (identical at width and one past), `5525` (far past aliasing width). Order-aware array: `helpers.test.ts:676`. Refined gate / helper: `helpers.test.ts:2892` / `3000` (`createStringFaults` / `createNumberFaults`); parser re-applies refinements `compilers.test.ts:3686`; unrefined vs refined empty `[]` at `ContractCompiler.ts:1426-1434`. First-clean union: `compilers.test.ts:3381`, `3984`. `readValue`: `helpers.test.ts:524`; auditor container context `compilers.test.ts:3420`. Paths: `helpers.test.ts:2407`; missing-key paths `compilers.test.ts:3773`; shared fault paths `ContractCompiler.test.ts:532`. `FAULT_LIMIT`: `helpers.test.ts:2469`; auditor/reporter caps `compilers.test.ts:3435`, `3455`, `4020`, `4095`. Frozen returns: `enumerableKeys` `helpers.test.ts:1020`; `readArrayEntries` `helpers.test.ts:646`; schema/bundle `compilers.test.ts:4678`, `ContractCompiler.test.ts:105`; parse result **not** frozen `compilers.test.ts:5336`. Guard never throws: `guides/contract.md:15`, `guides/contract.md:269`; exotic refusal `guides/contract.md:272`.

**Distillate**

**Guard (`is`) — valid medium**

| Axis | Remaining per call |
| --- | --- |
| Allocations, object node | `#trackGuard` slot only (no `WeakMap` on one object). `holds`/`attempt` result from `isRecord`. `Object.keys` array + `Object.freeze` of it + `attempt` result from `enumerableKeys`. Walk `attempt` result. No `collectMembers`. No freeze of the input. |
| Allocations, array node (`tags`) | `#trackGuard` slot. Outer `whereOf` `holds` result. Inner `arrayOf` `holds` result. Nested `isArray` `holds` result. `readArrayEntries` snapshot: index lists, `Reflect.ownKeys` array, `new Array(length)`, frozen entries, frozen `{ entries, dense }`, `attempt` result. Length `boundsOf`/`whereOf` `holds` result. Item `isString` allocates nothing. |
| Intrinsic indirections, object | `INTRINSICS.array`, `INTRINSICS.prototype` (same-realm fast path). `INTRINSICS.keys`, `INTRINSICS.freeze`. Per enumerable key: `INTRINSICS.own(positions, key)`, `INTRINSICS.own(map, key)`. |
| Intrinsic indirections, array | `INTRINSICS.array` (twice: `isArray` + `arrayOf` path). `INTRINSICS.safe`, `members`, `numeric`/`integer`/`text` per own index, `list`, `own`, `freeze`. `INTRINSICS.finite` on `.length`. `INTRINSICS.apply(order, …)` only if keys arrive out of order. |
| Masked path still runs | `enumerableKeys` yes. `holds`/`isRecord` yes. `attempt` yes. `Object.freeze` yes (keys snapshot). `collectMembers` no. |
| Compile-time | `map` `INTRINSICS.create(null)` (`916`), `positions` (`956`), `full` mask (`957-963`), child guards, `#trackGuard` closure (`593-633`). |
| Pinning | `ContractCompiler.test.ts:429`, `459`; `compilers.test.ts:5472`; `helpers.test.ts:676`, `1020`; `guides/contract.md:15`. |

**Parser (`parse`) — valid value**

| Axis | Remaining per call |
| --- | --- |
| Allocations, object node | Same brand + `enumerableKeys` + walk `attempt` as guard. Always `INTRINSICS.create(null)` result + per-key writes (`1259-1278`). Closed: no extra-key loop, no `matchesMember`. Output not frozen (`compilers.test.ts:5350`). |
| Allocations, array node | `readValue` diagnostics (arrays are objects, `1136-1140`) + `isArray` `holds` + full `readArrayEntries` snapshot + fresh `result: unknown[]` (`1154`). |
| Identity fast path | Leaves already the right primitive: yes (`parseString`/`parseNumber`/`parseBoolean` return the same value; literal `allowed(value)` returns `value`). Object/array: no — always rebuilt (`compilers.test.ts:5336-5366`). Union anyOf: yes, `return value` after variant guard (`1348`). |
| Result record cost | `INTRINSICS.create(null)` once per object node; one assignment per present declared key; no `defineProperty`. |
| Intrinsic indirections | Object: same as guard brand/keys/own(positions). Array: `readValue` → `INTRINSICS.array`; then `isArray` → `INTRINSICS.array` again; `readArrayEntries` rows as in guard. Refined string/number: extra `holds` from `stringOf`/`boundsOf` after coerce (`1093-1106`). Literal: `INTRINSICS.apply(member, allowed, [value])`. |
| Compile-time | `entries[]`, hoisted `known` `Set` via `readValue`/`collectMembers` (`1192`), `positions` (`1214`), parser closure. |
| Pinning | `compilers.test.ts:5336`, `3686`, `5472`; `helpers.test.ts:524`. |

**Auditor (`audit`) — valid path**

| Axis | Remaining per call |
| --- | --- |
| Door | `contain` → `attempt` (`1399`). Optional default `path = []`. `#trackFaults` slot, no map on one clean object. |
| `readValue` on valid medium | Object: `INTRINSICS.parent` (`1555`) then `INTRINSICS.freeze(INTRINSICS.keys(record))` (`1564`). Array (`tags`): `INTRINSICS.array` (`1475`). Refined `name`: `createStringFaults` (`1869`). Refined `age`: `createNumberFaults` (`1938`). Array bounds: `createArrayFaults` (`2007`). Each helper `readValue`s even when it returns `[]`. |
| `pathOf` | Per declared field (`1606`); per array index (`1498`). Fresh `string[]` every time. |
| Fault arrays, clean | Object: one `faults: []` (`1569`), `limitEntries` identity. Leaves: `[]` or helper-empty `[]`. Array node: collector `[]` plus `createArrayFaults` `[]`. Union anyOf first-clean: variant’s empty report then `return []` (`1663`). No `preview`. |
| Extra scan | `matchesMember(vocabulary, key)` per enumerable key (`1612`) even when every key is declared. |
| `oneOf` | Every variant plan; tally of empty reports; no separate guard re-run (`1648-1670`). |
| Compile-time | `entries[]`, hoisted `declared` `Set` (`1542`), `positions`, `#trackFaults`. |
| Pinning | `compilers.test.ts:3381`, `3420`, `3455`, `3480`; `ContractCompiler.test.ts:443`, `459`, `532`; `helpers.test.ts:524`, `2407`, `2469`. |

**Reporter (`explain`) — valid path**

| Axis | Remaining per call |
| --- | --- |
| Door | `contain` (`1720`). `#trackFaults` as auditor. |
| vs auditor | No `INTRINSICS.parent` `readValue`. Keys via `enumerableKeys` (`1868`), which `attempt`s rather than throws. Closed extra-key loop absent (`1931`). Leaves coerce through `parseString`/`parseNumber`/`parseBoolean` (`1745-1768`). |
| `readValue` on valid medium | Refined leaves and `createArrayFaults` only. Object/array containers do not `readValue` on the clean path. |
| `pathOf` / clean arrays / `limitEntries` / `preview` | Same shape as auditor. |
| `oneOf` | Every variant **report** plan, then a second pass over every variant **guard** (`1976-1981`). anyOf stops at first clean plan (`1972`) — deep’s union. |
| Compile-time | `entries[]`, `names[]`, hoisted `known` `Set` (`1852`), `positions`, `#trackFaults`. |
| Pinning | `compilers.test.ts:3984`, `3773`, `3803`, `4020`, `4095`; `helpers.test.ts:2407`, `2469`. |

**Generator**

| Axis | Remaining per call |
| --- | --- |
| Door | `contain` + optional `seededRandom(INTRINSICS.now())` (`2035-2038`). |
| `drawRandom` | `contain` + `attempt(random)` per sample (`helpers.ts:1275`). String: once per character (`2064`). Boolean/number/literal/array-length/optional-skip: once each. |
| Object fields | `{}` then `INTRINSICS.define(result, key, { value, enumerable, configurable, writable })` (`2167-2177`) — descriptor object per field. |
| Union | `drawRandom` for start index; per attempt `attempt(() => plan(random))` then compiled `guard(value)` (`2215-2227`). |
| Compile-time | `entries[]`, child seed closures; union also captures `#guardAt` (`2206`). |
| Pinning | `ContractCompiler.test.ts:553`; `compilers.test.ts:4294`, `4581`. |

**Compile tier (object node heap)**

| Family | Allocated at compile |
| --- | --- |
| Guard | `INTRINSICS.create(null)` guard map (`916`); `optionalKeys[]`; `required[]`; `INTRINSICS.keys` twice (`918`, `938`); `positions` (`956`); `full`; plan closure; `#trackGuard` (`593`) with `filled`/`memo`/`slot`/`kept`. |
| Parser | `entries[]`; hoisted `known` `Set` (`1194`); `positions` (`1214`); plan closure. |
| Auditor | `entries[]` with `shapeToKind`; `attempt(collectMembers(declaredKeys))` (`1542`); `positions`; plan + `#trackFaults` (`645`). |
| Reporter | `entries[]` + `names[]`; `attempt(collectMembers(names))` (`1852`); `positions`; plan + `#trackFaults`. |
| Generator | `entries[]`; plan closure; `define` only at sample time. |
| Schema | `INTRINSICS.create(null)` properties (`787`); frozen schema/properties/required (`805-810`). |
| Bundle | `INTRINSICS.freeze({ schema, is, parse, audit, explain, generate })` (`2270`). |
| Pinning | `ContractCompiler.test.ts:459` (no tracking `WeakMap` at assemble), `105` (frozen bundle); `compilers.test.ts:4678`, `5472`. Measured compile-heap rise (medium 11721→13734 B, deep 48476→59322 B) is the campaign’s figure; this pass did not re-measure bytes. |

**Working-state churn**

| Site | Per call | Doors |
| --- | --- | --- |
| `ShapeValidator.#clear` `181-200` | Two times per `validate` (`162`, `166`): phase object, nine arrays, one `WeakSet`, two `WeakMap`. | `validateShapeDepth`; all `compile*` / `createContract`; `cloneShape` / `ownShape`; every `*Shape` builder listed in evidence 25. |
| `ShapeCloner.#empty*` `80-125`, settle `953-959` | Constructor allocates working `Map`s/`[]` and empty peers; settle rebinds, no new empties. | `cloneShape`, `ownShape` (and thus compiler `#prepare`). |
| `SchemaCloner.#empty*` `59-85`, settle `252-254` | Same pattern: `Map` + pending `[]` plus empty peers. | `cloneSchema`, `rawShape`, raw compile. |

**`INTRINSICS` per-call sites (valid medium; `apply` third arg is a fresh array)**

| Line | Callee | Allocated argument list |
| --- | --- | --- |
| `helpers.ts:967` | `INTRINSICS.array` | none (direct) |
| `helpers.ts:968` | `INTRINSICS.prototype` | none |
| `helpers.ts:1170` | `INTRINSICS.keys` then `INTRINSICS.freeze` | none |
| `ContractCompiler.ts:979/1251/1583/1886` | `INTRINSICS.own` | none |
| `ContractCompiler.ts:995` | `INTRINSICS.own` (guard map) | none |
| `helpers.ts:262` | `INTRINSICS.apply` → `Set.prototype.has` | `[value]` or `[key]` (literal `role`; auditor extra scan per key) |
| `helpers.ts:1026-1067` | `safe`, `members`, `numeric`, `integer`, `text`, `list`, `own`, `freeze` | none; `apply(order, owned, [compareValues])` only if unsorted (`helpers.ts:205`) |
| `validators.ts:115` / `combinators.ts` bounds | `INTRINSICS.finite` | none |
| `validators.ts:127` | `INTRINSICS.integer` | none |
| `ContractCompiler.ts:1259` | `INTRINSICS.create(null)` | none |
| `ContractCompiler.ts:1137`, `1475` | `INTRINSICS.array` inside `readValue` | none |
| `ContractCompiler.ts:1555` | `INTRINSICS.parent` inside `readValue` | none |
| `ContractCompiler.ts:1565` | `INTRINSICS.keys` + `freeze` inside `readValue` | none |
| `ContractCompiler.ts:1498/1802` | `INTRINSICS.text` (index) | none |
| `ContractCompiler.ts:2036` | `INTRINSICS.now` if no `random` | none |
| `helpers.ts:1555-1556` | `INTRINSICS.imul` inside default seed | none |
| `ContractCompiler.ts:2064` | `INTRINSICS.floor` per string char | none |
| `ContractCompiler.ts:2172` | `INTRINSICS.define` | descriptor object, not an `apply` list |
| `ContractCompiler.ts:615-627` / `669-681` | `apply(recall/retain)` | `[value]`, `[slot, kept]`, `[value, answer]` — **not** on medium (one object per node) |
| `helpers.ts:243` | `apply(admit)` inside `collectMembers` | `[member]` — **not** on in-width per-call presence; auditor/reporter extra/`known` use the hoisted set |

**Unknowns**

- Byte-level share of positions/masks/hoisted sets/closures in the stated 11721→13734 B / 48476→59322 B compile-heap deltas; those figures were not reproduced here.
- Whether the bench omitted `path` (so `audit`/`explain` pay default `[]`) or passed a retained root path.
- Whether the bench’s `tags` array is empty or populated (snapshot cost scales with reflected own indices).
- Engine elision of `attempt` result objects; the source always allocates them.
- `collectMembers` per-call rebuild if compile-time `attempt(() => collectMembers(…))` failed (`declared`/`known` undefined) — not the honest `Set` path.

**Deviation**

`git -C /home/user/contract status --porcelain` was rejected in this ask-mode session, so porcelain could not be snapshotted before or after. No files were edited, no process was spawned for the assignment, and nothing was installed. Scope stayed in `src/core/`, `tests/src/core/`, and `guides/contract.md`.
