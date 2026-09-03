# Unit M-lloyds — report

Both reds are closed. `npm run check` exits `0` with no `tsc` diagnostic in any of the three
projects, and `npm test` exits `0` with the vendored `policy` sweep green at 111 passed. The whole
gate chain is green, each gate read bare. No off-limits file moved: `package.json`,
`tsconfig.json`, `.oxlintrc.json`, `vite.config.ts`, `configs/**`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, and `tests/config.test.ts` all report clean under `git status --porcelain`.
The lockfile pair is exactly as found. Nothing committed, staged, stashed, restored, or reset.

## Acceptance

1. **`npm run check` exits `0`; `npm test` exits `0` with the policy sweep green** — met.
2. **Every gate green, read bare; no assertion added to silence a type** — met. The diff adds no
   `as`, no `!`, and no suppression comment; every narrowing is a guard or a widened declaration.

## The baseline the brief quoted was one project's, not the tree's

`npm run check` chains `check:app:core && check:app:browser && vue-tsc -p tsconfig.json`, so it
stops at the first failing project. The visit's 396 is `configs/app/tsconfig.core.json` alone;
`check:app:browser` and the root project never ran. I measured each project separately against the
committed baseline, restoring the two files I had already edited from `HEAD` for the reading and
copying my versions back afterwards.

| Project                              | Before | After |
| ------------------------------------ | -----: | ----: |
| `configs/app/tsconfig.core.json`     |    396 |     0 |
| `configs/app/tsconfig.browser.json`  |    144 |     0 |
| `tsconfig.json` (root)               |    445 |     0 |
| `npm run check` (chain exit)         |    `2` |   `0` |

The root project is the union of the other two, so 445 is the tree's real error population and 396
was the first stop on the way to it.

### Before, by code

`configs/app/tsconfig.core.json` — 396:

```text
283 TS2375   103 TS2379   4 TS2532   2 TS2305   1 TS2769   1 TS2741   1 TS2412   1 TS2322
```

`configs/app/tsconfig.browser.json` — 144:

```text
105 TS2379   12 TS1484   11 TS2375   3 TS2741   3 TS2532   3 TS2345
  2 TS2305    2 TS18048    1 TS2769   1 TS2412   1 TS2322
```

`tsconfig.json` root — 445:

```text
294 TS2375   118 TS2379   12 TS1484   7 TS2532   3 TS2741   3 TS2345
  2 TS2322     2 TS2305     2 TS18048   1 TS2769   1 TS2412
```

### After, by code

Every project: no `error TS` line. `grep -cE 'error TS[0-9]+'` returns `0` on each captured run.

## The flags, repaired at the type

The dominant `exactOptionalPropertyTypes` class split into two shapes, and each took a different
repair.

**A declaration that could no longer state its own documented contract.** Where the code already
materializes a present-`undefined` key, the flag was reporting a true fact about a declaration that
denied it. `createPatch` returns `{ zip: parseNumber(value) }` and its TSDoc states "a cleared or
non-numeric input patches the field to `undefined`"; `helpers.test.ts` pins it with
`expect(createPatch('zip', '')).toEqual({ zip: undefined })`; `Schedule.update` merges that patch
onto the stored record. So `BuildingInput = Partial<BuildingRecord>` was wrong, and so was
`BuildingRecord`. Widened, with the reason recorded in each TSDoc:

| Declaration                                | Change                                                        |
| ------------------------------------------ | ------------------------------------------------------------- |
| `BuildingLimits` (`app/core/types.ts`)     | each leaf `?: number \| undefined`                            |
| `BuildingRecord` (`app/core/types.ts`)     | every optional field `\| undefined`                           |
| `BuildingInput` (`app/core/types.ts`)      | mapped over `BuildingRecord` with `\| undefined` per field    |
| `TTLCacheOptions.clock`, `LocatorOptions.clock` | `\| undefined` (both read `?? readEpoch`)                |
| `RaterOptions.sink / reason / clock`       | `\| undefined` (read `?? readEpoch` / `=== undefined`)        |
| `TransportOptions.timeout / cache / fetch` | `\| undefined` (read `??` / `=== undefined`)                  |
| `EvaluationStoreOptions.year / clock / sink` | `\| undefined` (read `??`, forwarded to `RaterOptions`)     |
| `RaterError.context`                       | `\| undefined` (the constructor assigns the parameter through) |
| `recordToWorksheet`'s `buckets` / `lines`  | `\| undefined` (read `?? {}` / `?? []`)                       |
| `Transport.#cache`                         | `\| undefined`                                                |
| `GuideEligibility.buckets`, `GuideRates.tables`, `GuideCaps.schedule` | `\| undefined` — Vue passes `undefined` for an omitted prop |
| `RenderOptions.props / application / slots` | `\| undefined` (read `?? null` / `=== undefined`)            |
| `SingleExpectation` (`tests/app/core/setup.ts`) | every optional field `\| undefined` — the table writes `undefined` to document "no rate here" |

`SingleExpectation` alone closed 282 of the core project's errors: the corpus table states an
unrated coverage by writing `windRate: undefined`, and the `actual` row it compares against is
assembled straight from `wind?.amount`.

**A shape the target really does forbid.** Where the receiver treats absence as the absent key,
the repair drops the key rather than widening. `makeLineResult({ amount: undefined })` cannot
produce a `LineResult` under the flag, because `LineResult` states an unrated line by omitting
`amount`. New fixture `makeUnratedLine` in `tests/app/core/setup.ts` returns the base minus that
key. The same reading fixed `windSubject`'s no-wind-gate case (`const { wind: gateId, ...gateless }
= definition`), the `makeSubject({ zone: undefined })` / `{ region: undefined }` cases (the base
fixture never sets either, so the override was a no-op and is gone), the `makeDisplayRow` message
case, and `createTestDatabase`'s `version` (now spread in only when present, matching
`createBuilding`'s own omission idiom).

**A derivation that changed meaning under the flag.** `FinalBuilding.limits` was
`Required<BuildingLimits>`. `Required` strips the `?` but leaves a written `| undefined` in place,
so widening `BuildingLimits` would have let an unset leaf reach a rater. Proved it directly before
relying on it:

```text
$ npx tsc --ignoreConfig --noEmit --strict --exactOptionalPropertyTypes ... tmp/probe/req.ts
tmp/probe/req.ts(2,46): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
```

`FinalBuilding.limits` now names a written-out `FinalLimits` interface with all three leaves
required, and the TSDoc records why it is not derived. Nothing else used `Required<>`.

**The redundant emitter option rebuild.** Eight constructors built `{ on: options.on, error:
options.error }` for `new Emitter(...)`. Every one of those option interfaces is already a
structural superset of `EmitterOptions<TMap>`, so each now passes `options` straight through:
`Schedule`, `Locator`, `ApplicationController`, `AuditStore`, `InspectionStore`, `LocationStore`,
`ScheduleStore`, `SettingsStore`. `compileCarrier` likewise passes `{ ...deps, labels: FIELD_LABELS }`
instead of naming each dependency.

**`noUncheckedIndexedAccess`, guarded, never asserted.**

| Site                                             | Guard                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------ |
| `GuideRates.distinct`                            | `part !== undefined && !seen.includes(part)`                        |
| `GuideRates.build`                               | `const [sample] = keys; if (sample === undefined) return {}` — the caller already filters empty sources |
| `GuideCaps.matrices`                             | `const [leading] = entries; if (leading === undefined) continue` — replaces the equivalent `entries.length === 0` check |
| `CarrierGuidesModal` initial selection           | `CARRIER_ORDER` typed `readonly [CarrierName, ...CarrierName[]]`    |
| `compilers.test.ts` malformed-rating case        | `const [first] = ...lines; if (first === undefined) throw`          |
| `helpers.test.ts` × 4 positional record reads    | new `readRecord(records, index)` fixture, throwing on a miss        |
| `ApplicationController.test.ts` added building   | `const [added] = ...; if (added === undefined) throw`               |

`CARRIER_ORDER`'s non-empty tuple annotation keeps the `CarrierName` element check the plain
`readonly CarrierName[]` gave, and adds the never-empty fact. Proved the indexed read and the
`map` / `some` calls all hold under the annotation before using it (`tmp/probe/tuple.ts`, exit `0`).

**`verbatimModuleSyntax`.** Twelve type-only imports across `AuditPanel.vue`, `CarrierResults.vue`,
`SchedulePanel.vue`, `GuideCaps.vue`, `GuideEligibility.vue`, and `GuideRates.vue`. `AuditPanel` and
`SchedulePanel` split `describeComparison` (a value) from `Premise` (a type).

**`noUnusedLocals`.** Four imports in `compilers.ts` became unused when the two interfaces moved to
`types.ts`; removed with the move.

## The database surface

Read from `node_modules/@orkestrel/database/dist/src/core/index.d.ts` at `0.0.12`, not from the
guide.

| Before (`0.0.5`)                                    | After (`0.0.12`)                                              |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `AggregateFunction`                                  | `AggregateOperation` (`'count' \| 'sum' \| 'average' \| 'minimum' \| 'maximum'`) |
| `Criteria`                                           | `QueryInput`                                                    |
| `RecordingAggregate.criteria`                        | `RecordingAggregate.input`                                      |
| `records(table, criteria)`                           | `records(table, input: QueryInput)`                             |
| `aggregate(table, operation, column, criteria)`      | `aggregate(table, operation: AggregateOperation, column, input: QueryInput)` |
| no `insert`                                          | `insert(table, key, row)` — rejects a duplicate key with a `CONFLICT` `DatabaseError` |
| `count(table, criteria)`, `RECORDING_COUNT`, `countCalls` | removed                                                    |

**Why `count` went rather than being retyped.** `0.0.12`'s `StorageInterface` declares
`records?`, `aggregate?`, `stream?`, `migrate?`, `metadata?`, and `stamp?` — there is no native
`count` hook. `TableInterface.count` derives its answer, and the guide confirms it
(`guides/database.md`: "`count()` uses the same contract-valid candidate semantics"). A `count`
member on the recording driver would therefore be a member no engine calls, under a doc comment
claiming it is "the native count hook". `grep -rn 'createRecordingDriver\|RECORDING_COUNT\|
countCalls' app tests` returns nothing outside `tests/setup.ts`, so nothing consumed it.

Two more drivers needed the same `insert`: `gateDriver` and `failBootDriver` in
`tests/app/browser/setup.ts`, both real memory-driver wrappers. `gateDriver` gates `insert` on the
same counter as `write`, so its documented "only writes are gated" stays true; nothing in lloyds
calls `Table.add`, so no gated count moved.

## The placement policy

`npm run test:policy`: `1 failed | 110 passed` before, `111 passed` after. Exit `1` → `0`.

| Rule       | Path                                                | Move                                                                 |
| ---------- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| `data`     | `app/browser/main.ts:12`                             | the `root` binding is gone; the entry now runs `createApp(App).mount('#app')` |
| `constant` | `app/core/raters/carriers/{as040,as207,as300,as550,oldrepublic}/constants.ts` | each `*_DEFINITION` wrapped in `Object.freeze<CarrierDefinition>({ … })` |
| `type`     | `app/core/raters/compilers.ts:32,39`                 | `CompileCarrierDeps` and `DistributedNotices` moved to `app/core/raters/types.ts` |
| `export`   | `app/core/raters/helpers.ts:502`                     | `emptyWorksheet` exported                                             |
| `mirror`   | the five carrier test files                          | each renamed to `constants.test.ts` beside its carrier folder         |

**Importers.** `CompileCarrierDeps` and `DistributedNotices` had exactly one consumer each,
`compilers.ts` itself, which now imports them from `./types.js`; the `raters/index.ts` barrel
re-exports `./types.js` and `./compilers.js` with `export *`, so the public surface is unchanged.
`emptyWorksheet` reaches the barrel the same way and gains a `describe` in
`tests/app/core/raters/helpers.test.ts` covering identity, the unsuccessful zero-sum shell, and the
empty evidence collections. The five renamed test files are byte-identical to their originals
(`cmp` against `git show HEAD:<old path>` for each), and nothing referenced them by name:
`grep -rn 'AS040.test\|AS207.test\|AS300.test\|AS550.test\|OldRepublic.test' app tests guides
package.json` returns nothing.

**Why `Object.freeze` needed its type argument.** The plain `Object.freeze({ … })` form drops the
annotation's contextual typing, so nested literals widen and the definition stops matching
`CarrierDefinition`:

```text
app/core/raters/carriers/as550/constants.ts(539,14): error TS2322: …
  The types of 'projection.zone.derivation' are incompatible between these types.
    Type 'string' is not assignable to type '"county-membership"'.
```

`Object.freeze<CarrierDefinition>({ … })` restores the contextual type and returns
`Readonly<CarrierDefinition>`. Proved the form before applying it (`tmp/probe/freeze.ts`, exit `0`).

**Why the mirror rows took a rename rather than a split.** Extracting each carrier definition into
an `AS040.ts` module would trade the `mirror` violation for a `data` one: `AS040.ts` is not a
data-kind file, and `inspectPolicyVariables` reports any module data outside `DATA_SOURCE_FILES`.
The test's subject is the carrier definition, which lives in `constants.ts`, so the test's name
follows it.

## The one product-code shape change, for a ruling

`app/browser/main.ts` could keep neither the `root` binding nor a local mount function: `main.ts`
is not a data-kind file, so a module variable reports `data`, and it is not a function-kind file, so
both a `function` declaration and a `const mount = () => …` report `function`. The entry can hold
only imports and expression statements. Vue's `mount` accepts `Element | string` and performs the
same `#app` lookup, reporting a missing target instead of failing silently. `index.html` ships
`<div id="app">`, so the rendered result is identical; the difference is a warning in a
configuration the build cannot produce. `dist/app/browser/assets/index-*.js` contains the selector
after the build.

## The gate chain

Each gate run bare, in order, on the final tree, after one mutating `npm run lint` (already clean)
and one `npm run format` as the converge step.

| Gate                   | Exit | Summary                                                                     |
| ---------------------- | ---- | ---------------------------------------------------------------------------- |
| `npm run format:check` | `0`  | `All matched files use the correct format.` — 214 files                     |
| `npm run lint:check`   | `0`  | no diagnostics                                                               |
| `npm run check`        | `0`  | no `tsc` diagnostic in any of the three projects                            |
| `npm run build`        | `0`  | `✓ built in 2.04s`                                                           |
| `npm test`             | `0`  | app:core 23 files / 484; app:browser 24 files / 247; policy 111; config 46  |

`npx scaffold audit` still exits `0` with the two lines the visit recorded, unchanged: the
`tests/setup.ts` / `tests/setupBrowser.ts` proof request, and the `typescript` major-7 line. `0 of
41 planned paths drifted from the plan.`

The build's chunk-size advisory over the 1,385.66 kB bundle is a notice at `BUILD_EXIT=0` and
predates this unit.

**Behaviour evidence.** `app:browser` passes 247 tests, exactly its pre-unit count, so no browser
behaviour moved. `app:core` goes 481 → 484, the three added `emptyWorksheet` assertions and nothing
else; every existing carrier, corpus, schedule, and helper test passes against the rewritten
declarations. `test:config` stays at 46.

## Findings recorded, not closed

Two sit outside this unit's scope and are recorded against the capability that owns them.

- **`Schedule.update` and the required trio.** The widened `BuildingInput` made visible that
  `createPatch('location', '')` returns `{ location: undefined }`, which the old spread would have
  written into a record whose `location` is required. No shipped path reaches it —
  `BuildingTable.apply` routes `location` and `number` to `renumber`, never to `createPatch` — but
  the merge now states the invariant (`location: patch.location ?? existing.location`, likewise
  `number`) so the produced value is a `BuildingRecord`. Whether `createPatch` should carry those
  two cases at all belongs to the browser edit-commit capability, not here.
- **`tests/setup.ts` and `tests/setupBrowser.ts` carry no proof.** `scaffold audit` asks for
  `tests/setup.test.ts` and `tests/setupBrowser.test.ts`. Unchanged by this unit and still open;
  the visit already recorded it as lloyds'.

## Evidence

`git status --porcelain`:

```text
 M app/browser/components/AuditPanel.vue
 M app/browser/components/CarrierResults.vue
 M app/browser/components/SchedulePanel.vue
 M app/browser/components/guides/GuideCaps.vue
 M app/browser/components/guides/GuideEligibility.vue
 M app/browser/components/guides/GuideRates.vue
 M app/browser/controllers/ApplicationController.ts
 M app/browser/main.ts
 M app/browser/services/Transport.ts
 M app/browser/stores/AuditStore.ts
 M app/browser/stores/InspectionStore.ts
 M app/browser/stores/LocationStore.ts
 M app/browser/stores/ScheduleStore.ts
 M app/browser/stores/SettingsStore.ts
 M app/browser/types.ts
 M app/core/buildings/Schedule.ts
 M app/core/locations/Locator.ts
 M app/core/locations/types.ts
 M app/core/raters/carriers/as040/constants.ts
 M app/core/raters/carriers/as207/constants.ts
 M app/core/raters/carriers/as300/constants.ts
 M app/core/raters/carriers/as550/constants.ts
 M app/core/raters/carriers/oldrepublic/constants.ts
 M app/core/raters/compilers.ts
 M app/core/raters/constants.ts
 M app/core/raters/errors.ts
 M app/core/raters/helpers.ts
 M app/core/raters/types.ts
 M app/core/types.ts
D  package-lock.json
 M tests/app/browser/controllers/ApplicationController.test.ts
 M tests/app/browser/setup.ts
 D tests/app/core/raters/carriers/as040/AS040.test.ts
 D tests/app/core/raters/carriers/as207/AS207.test.ts
 D tests/app/core/raters/carriers/as300/AS300.test.ts
 D tests/app/core/raters/carriers/as550/AS550.test.ts
 D tests/app/core/raters/carriers/oldrepublic/OldRepublic.test.ts
 M tests/app/core/raters/compilers.test.ts
 M tests/app/core/raters/helpers.test.ts
 M tests/app/core/setup.ts
 M tests/setup.ts
 M tests/setupBrowser.ts
?? package-lock.json
?? tests/app/core/raters/carriers/as040/constants.test.ts
?? tests/app/core/raters/carriers/as207/constants.test.ts
?? tests/app/core/raters/carriers/as300/constants.test.ts
?? tests/app/core/raters/carriers/as550/constants.test.ts
?? tests/app/core/raters/carriers/oldrepublic/constants.test.ts
```

The `D`/`??` pairs under `tests/app/core/raters/carriers/` are the five renames, done with `mv` so
nothing is staged. `D  package-lock.json` and `?? package-lock.json` are the user's pair, untouched:
`sha256 03049a33480a90170e3a704fe43f0dbcd93ff94c7af090e297c7d5202f11d32e`.

`git diff --stat` (excluding the lockfile):

```text
 app/browser/components/AuditPanel.vue              |   3 +-
 app/browser/components/CarrierResults.vue          |   2 +-
 app/browser/components/SchedulePanel.vue           |   3 +-
 app/browser/components/guides/GuideCaps.vue        |  13 +-
 app/browser/components/guides/GuideEligibility.vue |   4 +-
 app/browser/components/guides/GuideRates.vue       |  18 +--
 app/browser/controllers/ApplicationController.ts   |   2 +-
 app/browser/main.ts                                |   6 +-
 app/browser/services/Transport.ts                  |   2 +-
 app/browser/stores/AuditStore.ts                   |   2 +-
 app/browser/stores/InspectionStore.ts              |   2 +-
 app/browser/stores/LocationStore.ts                |   2 +-
 app/browser/stores/ScheduleStore.ts                |   2 +-
 app/browser/stores/SettingsStore.ts                |   2 +-
 app/browser/types.ts                               |  12 +-
 app/core/buildings/Schedule.ts                     |  18 ++-
 app/core/locations/Locator.ts                      |   2 +-
 app/core/locations/types.ts                        |   4 +-
 app/core/raters/carriers/as040/constants.ts        |   6 +-
 app/core/raters/carriers/as207/constants.ts        |   6 +-
 app/core/raters/carriers/as300/constants.ts        |   6 +-
 app/core/raters/carriers/as550/constants.ts        |   6 +-
 app/core/raters/carriers/oldrepublic/constants.ts  |   6 +-
 app/core/raters/compilers.ts                       |  38 ++----
 app/core/raters/constants.ts                       |   6 +-
 app/core/raters/errors.ts                          |   2 +-
 app/core/raters/helpers.ts                         |   6 +-
 app/core/raters/types.ts                           |  29 ++++-
 app/core/types.ts                                  |  70 ++++++++---
 .../controllers/ApplicationController.test.ts      |   4 +-
 tests/app/browser/setup.ts                         |  12 +-
 tests/app/core/raters/carriers/as040/AS040.test.ts | 128 -------------------
 tests/app/core/raters/carriers/as207/AS207.test.ts | 103 ---------------
 tests/app/core/raters/carriers/as300/AS300.test.ts | 139 ---------------------
 tests/app/core/raters/carriers/as550/AS550.test.ts | 115 -----------------
 .../carriers/oldrepublic/OldRepublic.test.ts       | 131 -------------------
 tests/app/core/raters/compilers.test.ts            |   4 +-
 tests/app/core/raters/helpers.test.ts              |  64 +++++++---
 tests/app/core/setup.ts                            |  63 ++++++++--
 tests/setup.ts                                     |  76 +++++------
 tests/setupBrowser.ts                              |   5 +-
 41 files changed, 330 insertions(+), 794 deletions(-)
```

Gate captures live under `lloyds/tmp/`: `base-{core,browser,root}.txt` (the committed baseline
readings), `check3.txt`, `fmt2.txt`, `lint3.txt`, `build1.txt`, `test1.txt`, `policy-before.txt`,
`policy-after.txt`, `audit-after.txt`. The three throwaway `tsc` probes under `tmp/probe/` were
swept after they answered.

## Deviation state

No deviation. Nothing in the assignment required a repair that changes a rating result or a
rendered behaviour, no `0.0.12` replacement was missing, and no red sat inside a vendored file. The
`main.ts` mount form and the recording driver's dropped `count` hook are recorded earlier for a
ruling, not as blockers.
