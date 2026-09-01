## Question

Where do the nanoseconds go on every compiled `is` / `parse` / `audit` / `explain` / `generate` call — dispatch, allocation, intrinsic layers versus the data walk — with `file:line` traces a designer can attribute cost against?

## Evidence

### 1. Compiled `is` on a valid flat object

After compilation, `contract.is` is the compiled guard itself (`ContractCompiler.ts:2064-2066`). There is no `contain` wrapper on this family.

**Entry.** The root is an `object` node, so `#repeats` is true (`ContractCompiler.ts:583-586`) and the published function is `#trackGuard` (`ContractCompiler.ts:589-613`, installed at `818`).

Per call, for an object value:

- `isObject` (`validators.ts:516-517`) — `typeof` only.
- If `ContractCompiler.#scope === 0`, bump `#visits` and open a call scope (`594-597`). Nested tracked nodes reuse that scope.
- If `memo` is missing or `filled !== scope`, **`new WeakMap()` per tracked node per call** (`601-603`). The constructor is the captured `WeakMap` (`ContractCompiler.ts:127`), not `INTRINSICS.weakMap`. Test pin: `tests/src/core/ContractCompiler.test.ts:443-509` — compile constructs no tracking maps; each `is` call constructs one map per tracked node visited; `tests/src/core/ContractCompiler.test.ts:430-440` — a mutated record is re-read on the next call (scope ends at `611`, so the map is discarded next time).
- `Reflect.apply(WeakMap.prototype.get, memo, [value])` (`605`) — args array `[value]` allocated here.
- Miss: run `plan(value)`, then `Reflect.apply(WeakMap.prototype.set, memo, [value, answer])` (`607-608`).
- `try`/`finally` only (no `catch`) to close `#scope` (`599-612`).

**Object plan** (`ContractCompiler.ts:909-945`), compile-time closure over `map` / `required` / `closed`:

| Step | What runs | Allocates / indirects |
|---|---|---|
| Brand | `isRecord` → `holds` → `matchesRecordBrand` (`validators.ts:542-543`, `helpers.ts:896-898`, `966-969`) | `attempt` Result `{ success, value }` (`helpers.ts:727-729`). Ordinary `{}`: `INTRINSICS.array` + `INTRINSICS.prototype`; equality with `INTRINSICS.base` returns immediately — no mandated-member walk. |
| Keys | `enumerableKeys` (`helpers.ts:1151-1159`) | `attempt`; `Object.keys` fresh array; `Object.freeze` of that array. Hostile enum → `undefined` → `false`. |
| Walk | `attempt(() => { … })` (`916-944`) | Another Result object. Success is `outcome.success && outcome.value` (`944`). |
| Presence | `collectMembers(keys)` (`917`, `helpers.ts:240-245`) | `new Set`; per key `Reflect.apply(Set.prototype.add, set, [key])` with a fresh args array. |
| Required | `matchesMember(present, key)` (`921`, `helpers.ts:261-262`) | `Reflect.apply(Set.prototype.has, …)` per required key. |
| Declared | `INTRINSICS.own(map, key)` then `guard(value[key])` (`926-928`) | `Object.hasOwn` on the compile-time null-prototype map. Bracket read of the caller value — not `Reflect.get`. |

**Unrefined leaves** (what a “handful of leaves” object pays next):

- `stringOf` with no min/max/pattern returns bare `isString` (`combinators.ts:1044-1045`, `validators.ts:84-85`) — `typeof` only.
- Unbounded number returns `isFiniteNumber` / `isInteger` (`ContractCompiler.ts:848-849`) — `typeof` + `Number.isFinite` / `Number.isInteger` (`validators.ts:114-127`). No `attempt`.

`contain` is not on this path. `compileGuard`’s `contain` (`compilers.ts:142`) is compile-time only.

**Deep extras on `is`.** Each `array` / `object` / `union` / `optional` / `nullable` node is wrapped in its own `#trackGuard` (new WeakMap per such node per call). `arrayOf` (`combinators.ts:77-86`) wraps the walk in `holds` → `isArray` (another `holds` around `Array.isArray`, `validators.ts:604-605`) → `readArrayEntries` (`helpers.ts:1023-1058`): `attempt`; `Reflect.ownKeys`; index parse via `Number`/`String`; `sortValues` copies then `Reflect.apply(Array.prototype.sort, owned, [compareValues])` (`helpers.ts:198-206`); `new Array(length)`; **freeze entries and freeze the snapshot**. Length bounds add `whereOf` → yet another `holds` (`combinators.ts:859`, `ContractCompiler.ts:871`). `anyOf` unions are `unionOf` (`combinators.ts:789-795`): per-variant `holds(() => guard(value))`, short-circuit on first true. `oneOf` is a compiled loop that must visit every variant (`ContractCompiler.ts:959-966`) with no `holds`. `INTRINSICS.apply(unionOf, undefined, guards)` at `970` is **compile-time** (iterator-free spread), not per-call.

---

### 2. Compiled `parse` on a valid value

Published parser is the plan with **no** `#trackGuard` / `#trackFaults` and **no** `#expose*` `contain` (`ContractCompiler.ts:991`, `2067`). `cloners.ts` / `JSONCloner` do not run.

**Object** (`ContractCompiler.ts:1145-1208`):

- `isRecord` — same `holds`/`matchesRecordBrand` as `is`.
- `enumerableKeys` — same freeze+keys.
- `attempt` around the walk (`1161`).
- `collectMembers(keys)` — new Set + `apply(add)` per key.
- **`INTRINSICS.create(null)` result record every call** (`1166`) — owned copy of declared (and, if open, extra) keys. Not identity. Not a JSON clone.
- Per declared key: `matchesMember`, `record[entry.key]`, `entry.parse(raw)`, assign onto the null-prototype result (`1170-1181`).
- Closed object **drops** undeclared keys without reading them (`1099-1107`, `1183`).
- Host throw that is not `ContractError` is re-thrown through `readValue` (`1201-1207`); `ContractError` rethrows as-is (`1200`).

**Leaf coercion** (`parsers.ts`):

- `parseString`: identity for strings; `String(number)` via `INTRINSICS.text` for finite numbers (`83-86`).
- `parseNumber`: identity for finite numbers; else `attempt` around `trim` + `Number` + `Number.isFinite` (`107-122`).
- `parseInteger`: `parseNumber` then `Number.isInteger` (`141-144`).
- `parseBoolean`: equality tests, no `attempt` (`165-169`).
- Refined string/number: coerce, then re-run `stringOf` / `boundsOf` (`ContractCompiler.ts:1024-1037`).

**Array** (`1066-1097`): optional `readValue(() => Array.isArray)` if the value is an object (`1067-1071`); `isArray`; `readArrayEntries` (same freeze/sort/`apply` cost as `is`); **new result array**; per-index `item(...)`; length via `boundsOf` if bounded. Failure of `readArrayEntries` is a coded refusal, not `undefined`.

**Union anyOf** (`1244-1262`): identity pass — if any variant **guard** accepts the raw value, return that value unchanged; else parse-then-guard, first win. `oneOf` (`1229-1242`): count guard matches on the raw value; exactly one then that variant’s parser.

Optional/nullable: identity branches, then inner parser (`1264-1270`). `raw` returns the value (`1273`). `json` is `parseJSONValue` (`contain` + `readValue` + `matchesJSONValue` with a new `WeakSet`, `parsers.ts:274-281`).

---

### 3. Compiled `audit` and `explain` on a small valid value

Published roots wrap the plan in **`contain` every call**:

- `audit`: `#exposeAudit` → `contain(() => plan(value, path), 'compileAuditor')` (`ContractCompiler.ts:1298-1302`)
- `explain`: `#exposeReport` → `contain(() => plan(value, path), 'compileReporter')` (`1561-1565`)

`contain` is `attempt` plus `isContractError` (`helpers.ts:874-882`) — Result object, then return or wrap.

Container nodes also get `#trackFaults` (`622-647`, installed at `1287` / `1554`). Same per-call WeakMap refresh as `#trackGuard`. Difference: **only a clean (`length === 0`) report is retained** (`643`); a faulted node is re-walked at the new path (`tests/src/core/ContractCompiler.test.ts:512-517`).

**`audit` object** (`1422-1490`):

- If object: `readValue(() => Reflect.getPrototypeOf(value), …)` (`1423-1427`) — `readValue` itself does **two** `attempt`s plus a diagnostic object with spreads (`helpers.ts:759-827`) even when the read succeeds.
- `isRecord` / `holds`.
- Keys via `readValue(() => Object.freeze(Object.keys(record)))` (`1433-1437`) — not `enumerableKeys`; another pair of `attempt`s + freeze.
- `faults: AuditFault[] = []` (`1438`).
- `attempt` walk (`1442`): **two** Sets (`collectMembers(keys)` and `collectMembers(declaredKeys)`).
- Per declared key: `pathOf(path, key)` allocates a **new path array** (`helpers.ts:70-86`); `entry.audit(...)`; `appendEntries` copies by index (`108-116`).
- Closed extras: `{ reason: 'extra', path: pathOf(...) }` (`1466-1468`) — not on a valid exact object.
- `limitEntries(faults, 64)` (`1489`, `helpers.ts:137-138`) — returns the same array when already within `FAULT_LIMIT`.

**Valid string/number leaf** still runs `createStringFaults` / `createNumberFaults` (`ContractCompiler.ts:1327`, `1337`). Those always `readValue` the shape and allocate a `faults: Fault[]` even when every bound is absent (`helpers.ts:1852-1895`, `1921-1963`). Boolean/null/literal success returns a **new** `[]` (`1341-1348`, `1357-1360`).

**`explain` object** (`1676-1745`): same `contain` + `#trackFaults`; **no** `getPrototypeOf` probe; keys via `enumerableKeys`; walk uses `parseString`/`parseNumber`/… on leaves (`1585-1606`) so a coercible value is clean; closed extras are **not** read (`1724-1728`). Presence treats own `undefined` as missing, matching parse (`1711-1720`).

**Union (both families).** `audit` always runs **every** variant plan, stores each report in `perVariant`, counts empty reports, then either returns `[]` or prepends a summary and `selectClosestFaults` (`1501-1524`). Successful `anyOf` still pays every variant. `explain` anyOf also reports every variant first (`1759-1786`); `oneOf` additionally re-runs every compiled **guard** (`1767-1772`). `pathOf(..., String(index))` on every array slot (`1390`, `1641`).

**Array diagnostics:** `readArrayEntries` (same freeze/sort/`apply` as `is`/`parse`); grow `faults`; `createArrayFaults` via `readValue` (`helpers.ts:1990-2022`); `limitEntries`.

---

### 4. Compiled `generate`

`#exposeSeed` (`ContractCompiler.ts:1828-1832`):

```text
contain(() => plan(random ?? seededRandom(INTRINSICS.now())), 'compileGenerator')
```

Every call: `contain`/`attempt`. If `random` is omitted: `Date.now` via `INTRINSICS.now`, then **`seededRandom` allocates a new closure** (`helpers.ts:1532-1546`) whose body uses `Math.imul` (`1543-1544`).

**No** call-scoped WeakMap. **No** value memo.

**Object** (`1956-1989`): `const result = {}` (ordinary prototype); per declared key `Object.defineProperty` via `INTRINSICS.define` (`1966-1971`); optional keys may skip after `drawRandom` (`1965`). Open tail: more `define` + `Object.hasOwn` (`1976-1986`).

**`drawRandom`** (`helpers.ts:1263-1281`) per sample: `contain` → `attempt(random)` → `isFiniteNumber` range check. Unconstrained string default length is `8` (`ContractCompiler.ts:1850-1858`) — **one `drawRandom` (hence `contain`+`attempt`) per character**, plus `Math.floor`. Number: one `drawRandom` + `ceil`/`floor` (`1877-1886`). Boolean: one draw (`1890`). Array: one draw for length, then per-element seed (`1925-1931`) into a new array.

**Union** (`2002-2029`): `drawRandom` for start index; up to `max(GENERATION_ATTEMPT_LIMIT, count)` (`32` vs variant count, `constants.ts:396`, `ContractCompiler.ts:2001`) tries; each try is `attempt(() => plan(random))` then **`guard(outcome.value)`** — the full compiled `is` path, including `#trackGuard` WeakMaps. Pattern string: generate then `matchOf(pattern)(value)` (`1860`) — `matchOf`’s `contain` is compile-time; the per-call check is `whereOf`/`holds`/`matchesPattern` → `Reflect.apply(RegExp.prototype.exec, …)` (`helpers.ts:590-591`).

`raw` throws (`2039-2046`). `json` picks a form with several draws and may allocate `{ value: n }` (`1894-1907`).

---

### 5. Cross-cutting

**`#trackGuard` / `#trackFaults`.** WeakMap is **per call, per tracked node**, not per compile. First object handed to that node in this scope creates it; later paths in the same call `recall` it. Scope clock is static (`ContractCompiler.ts:134-135`, `552-577`). Leaves are not tracked (`583-586`). Parser and generator do not use this ledger.

**`contain` / `attempt` on entry.**

| Family | Per-call door `contain` | Inner `attempt`/`holds` on a valid flat object |
|---|---|---|
| `is` | No | `holds` (`isRecord`), `attempt` (`enumerableKeys`), `attempt` (object walk) |
| `parse` | No | Same brand/keys/walk `attempt`s; Result record via `Object.create(null)` |
| `audit` | Yes (`#exposeAudit`) | Door `contain` + `#trackFaults` + `readValue(getPrototypeOf)` + `holds` + `readValue(freeze(keys))` + walk `attempt` + per-leaf `readValue` in `create*Faults` |
| `explain` | Yes (`#exposeReport`) | Door `contain` + `#trackFaults` + `holds` + `enumerableKeys` `attempt` + walk `attempt` + leaf parsers / `create*Faults` |
| `generate` | Yes (`#exposeSeed`) | Door `contain` + **`drawRandom`’s own `contain` per sample** |

`attempt` always allocates `{ success: true, value }` (`helpers.ts:727-729`). `readValue` always runs a diagnostic `attempt` **before** the real read (`759-816`).

**`INTRINSICS` table** (`constants.ts:83-218`). On these per-call paths the hot rows are: `apply` (the `Reflect.apply` funnel), `recall`/`retain` (WeakMap get/set), `admit`/`member` (Set add/has), `keys`/`freeze`/`own`/`array`/`prototype`/`parent`/`members`/`create`/`define`/`finite`/`integer`/`safe`/`text`/`numeric`/`list`/`order`/`floor`/`ceil`/`max`/`min`/`now`/`imul`/`captures`. Compile-time only (not on a compiled call): schema `freeze`/`create`, shape-index WeakMap at `#discover` (`457-460`), `apply(unionOf, …)` (`970`), `pinMembers`, cloners. `weakSet`/`tracked`/`track`/`untrack` sit on `isJSONValue` / `parseJSONValue` / `matchesJSONValue`, not on a plain object-of-leaves contract.

**`try`/`catch`.** Every `attempt`/`holds`/`contain`/`readValue`. `#trackGuard`/`#trackFaults` use `try`/`finally` only. `lazyOf` is not on the compiled object/array/union plans.

**`Object.freeze` per call.** `enumerableKeys` (`helpers.ts:1158`); audit object keys (`ContractCompiler.ts:1434`); `readArrayEntries` snapshot and entries (`helpers.ts:1054-1056`). The caller’s value is never frozen. Parser result is not frozen. Generator result is not frozen.

**`Object.defineProperty` per call.** Generator object properties (`ContractCompiler.ts:1966`). Parser uses assignment onto `Object.create(null)`.

---

### 6. `Reflect.apply` sites and per-call fresh closures/arrays

Every `INTRINSICS.apply` is `Reflect.apply` (`constants.ts:123`). **Per-call** sites (not compile):

| Site | Call | Args array allocated at the call |
|---|---|---|
| `ContractCompiler.ts:605` | `WeakMap.get` | `[value]` |
| `ContractCompiler.ts:608` | `WeakMap.set` | `[value, answer]` |
| `ContractCompiler.ts:640` | `WeakMap.get` (faults) | `[value]` |
| `ContractCompiler.ts:643` | `WeakMap.set` (clean faults only) | `[value, answer]` |
| `helpers.ts:243` | `Set.add` in `collectMembers` | `[values[index]]` per key |
| `helpers.ts:262` | `Set.has` in `matchesMember` | `[value]` per lookup |
| `helpers.ts:279` | `Set.add` in `admitMember` (explain “known” set) | `[value]` |
| `helpers.ts:205` | `Array.sort` in `sortValues` (array snapshots) | `[compareValues]` |
| `helpers.ts:306,321,336` | WeakSet has/add/delete (`matchesJSONValue`) | `[value]` |
| `helpers.ts:591` | `RegExp.exec` (`matchesPattern`) | `[value]` |
| `helpers.ts:545,564` | pattern `source`/`flags` getters | `[]` |

`ContractCompiler.ts:970` `apply(unionOf, undefined, guards)` is compile-time.

**Fresh per CALL (not per compile):** WeakMap per tracked node (`is`/`audit`/`explain`); `attempt`/`contain`/`holds` Result objects; `enumerableKeys` keys array + freeze; `collectMembers` Set; `pathOf` path arrays (`audit`/`explain`); parser `Object.create(null)` and/or new arrays; diagnostic `faults: []` and leaf `[]`; `readArrayEntries` index list, `new Array(length)`, frozen snapshot; `sortValues` owned copy; generator `{}` / arrays / `seededRandom` closure; **every `apply` argument list**. Compiled plans themselves are compile-time closures.

---

## Distillate

Per-family attribution for a **valid** value after compilation. “Medium” ≈ closed object of unrefined leaves; “deep” adds nested objects, arrays (`readArrayEntries` + extra tracked nodes), and unions (variant fan-out).

| Family | Boundary crossings on the hot path | Allocations that dominate a call | Intrinsic indirections that dominate a call |
|---|---|---|---|
| **`is`** | No door `contain`. Nested `holds`/`attempt` at brand, keys, object walk. `#trackGuard` `try`/`finally`. Leaves are bare `typeof` / `Number.isFinite`. | One WeakMap per tracked node; Result objects at brand/keys/walk; frozen `Object.keys` array; one Set of present keys; `[value]` args arrays at WeakMap get/set and every Set add/has. **No result object for the verdict** (boolean). | `Reflect.apply` → WeakMap get/set; Set add/has; `Object.keys`+`freeze`; `Object.getPrototypeOf`+`Array.isArray` for brand; `Object.hasOwn` on the compile-time map. Data walk is bracket reads + leaf `typeof`. |
| **`parse`** | No door `contain`, no ledger. Same brand/keys/walk `attempt`s. Coercion `attempt` only on numeric strings. | Same key/Set/Result tax as `is`, **plus a new null-prototype record (and new arrays) every call** even when every leaf is already the right primitive. Leaves often keep identity (`parseString`/`parseNumber` happy path). **Cloners do not run.** | Same key/Set/`freeze` as `is`. No WeakMap. Union pays compiled **guards** (including their WeakMaps) before parsers. |
| **`audit`** | Door `contain` **and** `#trackFaults` **and** `readValue` around `getPrototypeOf` and around `freeze(keys)` **and** per-leaf `create*Faults` `readValue`. Union does not short-circuit: every variant plan runs. | WeakMap per tracked node; door Result; extra `readValue` diagnostic objects; two Sets (present + declared); `pathOf` array per field; empty `faults` arrays at object and at every string/number leaf even when clean; boolean/null success `[]`. | Same apply/Set/keys as `is`, plus `Reflect.getPrototypeOf` on objects, plus `String` for array indices. Clean path still builds a report structure and then returns emptiness. |
| **`explain`** | Door `contain` + `#trackFaults`. Keys via `enumerableKeys` (one `attempt`, not `readValue`). Leaves go through **parsers** (coercion) then the same `create*Faults`. Union reports every variant; `oneOf` also re-runs every guard. | Same ledger/Sets/`pathOf`/empty-fault tax as `audit`, without the `getPrototypeOf` `readValue`. Closed extras are not read (mirrors parse). | Mix of `is` key-tax and `parse` leaf coercion. Union is a full diagnostic fan-out, then a second guard pass for `oneOf`. |
| **`generate`** | Door `contain`. **Every random sample is another `contain`+`attempt` (`drawRandom`).** Union candidates re-enter the compiled **guard**. | Default RNG: new `seededRandom` closure from `Date.now`. Result `{}` + `defineProperty` per field. String: concatenated chars. No freeze of the product. | `Date.now` / `Math.imul` / `Math.floor|ceil|max|min`; `Object.defineProperty`; `drawRandom` containment per draw. Union: those draws **plus** a full `is` (WeakMaps, Sets, frozen keys) per accepted candidate. |

Against the stated hypothesis: for **medium `is`**, the data walk is a handful of `typeof`s; the rest is ledger WeakMap, brand `holds`, frozen key snapshot, Set presence view, and `Reflect.apply` argument lists. That matches “dispatch / allocation / intrinsic layers dominate the walk.” **`parse`** adds an owned result record on top of that tax. **`audit`/`explain`** add door `contain`, `readValue` diagnostics, path arrays, and empty fault arrays — and on **deep** they add `readArrayEntries` (ownKeys + sort `apply` + double freeze) plus union fan-out, which is why those two families sit well above `is`/`parse` in the 2026-09-01 figures (`audit` 21269 ns deep vs `is` 7611). **`generate`** is dominated by per-sample `contain` (especially per-character string draws) and, for unions, by calling `is` on candidates — not by walking input.

## Unknowns

- The exact medium/deep **shapes and call doors** behind the 2026-09-01 numbers (createContract vs `compileGuard`, refined vs bare leaves, `oneOf` vs `anyOf`, default vs injected `random`) are not in `/home/user/contract/src/core` or the tests read for pins.
- Whether the bench warmed the first-call WeakMap constructor / hidden-class paths; the source always allocates a new WeakMap when `#scope` changes (`ContractCompiler.ts:601-603`).
- Host JIT cost of `try`/`catch` in `attempt` vs the object allocations it returns is not observable from source.

## Deviation

Read-only scouting of `/home/user/contract/src/core/` with test pins only at `tests/src/core/ContractCompiler.test.ts` for ledger lifetime. No edits, no installs, no compile-time remapping of constructor/`#build*`/release. Spawned nothing.
