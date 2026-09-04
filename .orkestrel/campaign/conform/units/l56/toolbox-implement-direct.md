All rows landed, both fleet rows are `noop`, and the gate chain is green. Report written to `/home/user/scaffold/tmp/units/conform/conform-toolbox-report.md`.

# Unit conform-toolbox — report

Every row is `applied`. Both fleet rows are `noop` with the evidence read. No deviation.

## Consumer edits taken

Taken first, before any numbered row.

1. **terminal's `'terminal'` → `'target'` unmount reason** — `/home/user/fleet/toolbox/src/server/terminals/TerminalBridge.ts:132` now reads `if (result.error.reason === 'target') return Response.json(result, { status: 404 })`. The installed declaration confirms the union member: `node_modules/@orkestrel/terminal/dist/src/core/index.d.ts:1460` reads `readonly reason: 'target';`. Carried through toolbox-subj-1's rewrite of that file's TSDoc and toolbox-obj-7's move of its test. Three own-guide prose sites named the old reason and now read `'target'`: the POST-status sentence, Contract invariant 24, and the bridge `## Tests` bullet. Sweep `'terminal'` over `src`, `tests`, `guides/toolbox.md`, `README.md`: only the vendored `guides/terminal.md` mirror remains (off-limits).
2. **workspace's `MISSING` code** — `src/core/factories.ts` propagation note reads `` `WorkspaceError` raised by the live workspace (`MISSING` / `MODALITY` / `PATTERN` / `RANGE`) `` with the following line rewrapped as the report's diff shows; the `src/core/types.ts` splice `@remarks` ends ``a binary target throws `MODALITY`; a missing target throws `MISSING`.``
3. **workflow's status aliases and registry** — `src/core/types.ts` imports `LifecycleStatus`, `WorkflowFault`, `WorkflowFunction`, `WorkflowRegistry`, `WorkflowRunnerInterface`, `WorkflowStoreInterface` (sorted); the run's terminal status reads `readonly status: LifecycleStatus` under TSDoc naming `{@link LifecycleStatus}`; both option members read `readonly functions?: WorkflowRegistry`. `src/core/factories.ts` imports `WorkflowDefinition`, `WorkflowFunction`, `WorkflowRegistry`, `WorkflowRunnerInterface`, `TaskControllerInterface`; the return annotation reads `): WorkflowRegistry {` and the local `const functions: WorkflowRegistry =`. `tests/src/core/factories.test.ts` imports `WorkflowRegistry` and declares `const invalid: WorkflowRegistry = { leaf: () => 'leaf' }`. `tests/src/core/helpers.test.ts` reads `LifecycleStatus`. The guide's `createWorkflowFunctions` Surface row reads `WorkflowRegistry`. No guide fence changed, so no transcription changed. `createWorkflowFunctions` keeps its name.
4. **guide's `symbol.kind` → `symbol.keyword`** — `tests/guides.test.ts` reads `.filter((symbol) => symbol.keyword === 'function')`.
5. **relation's `RelationProps`/`ModelEventMap` and agent's `InstructionInterface.format`** — `noop`. Sweep `\bRelationProps\b|\bLoadedMap\b|\bModelEventMap\b|\bInstructionInterface\b|\.format\b` over the checkout excluding `node_modules`: every hit is in a vendored mirror (`guides/relation.md`, `guides/agent.md`), `LoadedMap` has no hit, and every `.format` hit is toolbox's own `EndpointToolOptions.format`.

## Rows

| Row | Disposition | Evidence |
| --- | --- | --- |
| toolbox-obj-1 | applied | `relationKeyShape` and its TSDoc deleted from `src/core/shapers.ts`; `'load'` reads `key: keyShape`; the `keyShape` TSDoc names both tools; the guide's `relationKeyShape` row deleted and the `keyShape` row reworded. Sweep `\brelationKeyShape\b`: empty. |
| toolbox-obj-2 | applied | `resolveLimit` added to `src/core/helpers.ts` with a full TSDoc `@example`; `clampQuery` and both relation arms route through it. |
| toolbox-obj-3 | applied | `describe('flagship fences')` added to `tests/guides.test.ts` transcribing the ancestry-tag, draft-completion, `expandInclude`, `clampQuery`, and endpoint-bridge fences. |
| toolbox-obj-4 | applied | `thrownOf` deleted; `captureError` imported from `@orkestrel/test`; all 8 call sites converted. `rejectionOf` kept local per the refuter's amendment. |
| toolbox-obj-5 | applied | `TestTimerInterface`/`createTestTimer` moved to `tests/setup.ts`; `createFakeTimer` deleted and bindings renamed `fake` → `timer`; both server tests re-pointed; the timer proofs moved into `tests/setup.test.ts`. |
| toolbox-obj-6 | applied | `tests/src/core/validators.test.ts` created with the guard describes; the mixed lineage block split; the guide gained a validators bullet and the helpers bullet lost the validator clauses. |
| toolbox-obj-7 | applied | `git mv` to `tests/src/server/terminals/TerminalBridge.test.ts` (recorded `RM`); a new `tests/src/server/factories.test.ts` holds only the two-route case; guide `## Tests` split accordingly. |
| toolbox-obj-8 | applied | Timing lines deleted; the loop collects each result and asserts every one deep-equal to the first and to `args`; renamed, `(v8)` dropped; no `bench()` added. |
| toolbox-subj-1 | applied | Barrel row deleted, `'class TerminalBridge'` interned, class TSDoc replaced, `TerminalBridgeOptions` → `TerminalRoutesOptions` at declaration, doc, and every import site including the constructor parameter; guide Lifecycle row, method table, and fence deleted, lifecycle paragraph names `DatabaseResolver` alone. |
| toolbox-subj-2 | applied | `inferDatabaseCode` / `inferRelationCode` at declarations, imports, three call sites, the `{@link}` reference, two Surface rows, invariant 18, the guide fence, and the helpers test. |
| toolbox-subj-3 | applied | Version numeral deleted at guide line 5 and invariants 4, 6, 8, and 23. |
| toolbox-subj-4 | applied | Every `AGENTS §N` citation replaced by the rule's name across `tests/setup.ts`, both store tests, the shapers test, the helpers test, and the moved bridge test. |
| toolbox-subj-5 | applied | Present-tense constant docs, `@remarks` deleted, `Net-new:` removed, the store doc rewritten, and all six section comments reduced to their subject. |
| toolbox-subj-6 | applied | `EndpointDefinition.invoke` → `execute` with every doc, call site, guide row, invariant, fence, and test property and title. |
| toolbox-subj-7 | applied | `ColumnPrimitive` / `primitive` / `isColumnPrimitive` / `compileColumnPrimitive` / `columnPrimitiveShape` across source, model-facing constants, guide, and every fixture. |
| toolbox-subj-8 | applied | Every tally deleted with member lists kept, in the guide and in `src/core/factories.ts` and `src/core/constants.ts`. |
| toolbox-subj-9 | applied | Invariant 23 rewritten in the imperative; the test comment reads `this abort is a no-op`. |
| toolbox-subj-11 | applied | The mechanism stated in `types.ts`, `factories.ts`, and the guide; every compatibility framing deleted; the option and its branch kept. |
| toolbox-subj-12 | applied | `@param`/`@returns` added to the three guards and both compiler leaves, in the fixed boolean form, using the renamed identifiers. |

## Fleet rows

| Row | Disposition | Evidence |
| --- | --- | --- |
| fleet-F1 | noop | `grep -rn "isBrowserVuePath" src tests vite.config.ts` exits 1; the workspace has no browser environment (`src` holds `core` and `server`, there is no `app/` and no `tests/setupBrowser.ts`). |
| fleet-F2 | noop | Classes read: `DatabaseResolver`, `MemoryDefinitionStore`, `DatabaseDefinitionStore`, `TerminalBridge`, `TerminalConnection`, `ToolboxError`. Each opens with `#` fields; none declares a public `readonly id: string` data field. |

## Failing-first proofs

Runner output under `/home/user/work/evidence/toolbox-proofs/`. Each planted line was undone by editing it back; a final sweep for `planted`, `status: 402`, and `limit + 2` over `src` and `tests/setup.ts` is empty.

| Row | Command | Red | Green |
| --- | --- | --- | --- |
| toolbox-obj-2 | `npm --prefix /home/user/fleet/toolbox run test:src:core` | exit 1, `5 failed \| 414 passed (419)`, `TypeError: resolveLimit is not a function` — test written before the helper | exit 0, `419 passed (419)` |
| toolbox-obj-3 | `npm run test:guides` | exit 1, `1 failed \| 27 passed (28)` under a planted `limit + 2` in `clampQuery` | exit 0, `28 passed (28)` |
| toolbox-obj-4 | `npx vitest run … --project src:core tests/src/core/factories.test.ts` | exit 1, `4 failed`, `ReferenceError: captureError is not defined` with the shared import removed | exit 0 in the final gate |
| toolbox-obj-5 | `npm run test:setup` | exit 1, `1 failed \| 16 passed (17)` under a planted `armed` getter returning `0` | exit 0, `17 passed (17)` |
| toolbox-obj-6 | `npx vitest run … tests/src/core/validators.test.ts` | exit 1, `3 failed \| 10 passed (13)` under a planted `isColumnKind` missing `'boolean'` | exit 0, `419 passed (419)` |
| toolbox-obj-7 | `npm run test:src:server` | exit 1, `3 failed \| 34 passed (37)`, all in `TerminalBridge.test.ts`, under a planted `402` in the GET token gate | exit 0, `37 passed (37)` |
| toolbox-obj-8 | `npx vitest … -t "many executes with identical args return identical results"` | exit 1, `1 failed \| 199 skipped (200)` under a planted extra key in the validating branch — the deleted `elapsed < 1000` assertion passes for that same defect | exit 0 in the final gate |

## Sweeps

Run from `/home/user/fleet/toolbox` over `src`, `tests`, `guides/toolbox.md`, `guides/README.md`, `README.md`.

- Old names, word boundary — `\b(relationKeyShape|databaseToolCode|relationToolCode|ColumnKind|isColumnKind|compileColumnKind|columnKindShape|TerminalBridgeOptions|createFakeTimer|thrownOf|WorkflowFunctions|TaskStatus|PhaseStatus|WorkflowStatus)\b`: empty (exit 1).
- The same alternation with `(s|es|ed|ing)?` and `-i`: empty (exit 1).
- `symbol\.kind|\.invoke\(|invoke:`: empty (exit 1). `invoke` survives only as ordinary prose in three source comments and one test header.
- `AGENTS §`: empty (exit 1).
- `should`, case-insensitive: three hits, all the control identifier `shouldThrow` in the bridge test, exempt as a literal code identifier.
- Count numerals — `\b[0-9]+ (elements|members|…|operations|arms|tools)\b`: empty.
- Count words — `\b(one|two|…|ten)\b`, case-insensitive: every remaining hit is a sentence naming its members, a fixed structural arity, a limit reported as a value, or fictional sample text. Three genuine counts of the row's own class were found and fixed under toolbox-subj-8: `All three tools`, `the other three tools' lean summary`, and `the two leaves it maps with` (guide and its mirror comment in `src/core/compilers.ts`).

## Gates

| Gate | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 — `456` src, `111` policy, `46` config, `17` setup, `28` guides |

`git status --short` lists 27 entries, all under Owned. Diffstat: `27 files changed, 1630 insertions(+), 1511 deletions(-)`. Evidence regenerated with `node /home/user/scaffold/tmp/work/evidence.mjs toolbox` into `/home/user/work/evidence/conform-toolbox.diff` (4621 lines) and `/home/user/work/evidence/conform-toolbox.status` (27 entries).

**Observation, not a criterion.** The `npm test` reading was taken inside this unit's own exec with a sibling unit running in `/home/user/fleet/ollama`. No test failed on timing; the deciding run is yours after this unit exits.

## Breaking

No fleet package declares `@orkestrel/toolbox`, so no consumer-side patch is carried. External consumers of 0.0.11 meet: `relationKeyShape` removed (use `keyShape`); `ColumnKind` → `ColumnPrimitive`, `isColumnKind` → `isColumnPrimitive`, `compileColumnKind` → `compileColumnPrimitive`, `columnKindShape` → `columnPrimitiveShape`, and `ColumnSpec`'s member `type` → `primitive` — which also moves the model-facing wire, so `'create'` now takes `{ "primitive": "string", "optional": true }`; `databaseToolCode` → `inferDatabaseCode` and `relationToolCode` → `inferRelationCode`; `EndpointDefinition.invoke` → `execute`; `TerminalBridgeOptions` → `TerminalRoutesOptions` and `TerminalBridge` no longer exported from `/server`.

## Shared-file patches

None. No row required an edit outside `/home/user/fleet/toolbox`, and no vendored file was touched.

## Deviations

None. Ancillary questions decided and carried on from: the possessive rule name closes a single-quoted `it()` title, so four titles in `tests/src/core/shapers.test.ts` read `the export-and-test-reusable-logic law in AGENTS` while every comment keeps the possessive form; `resolveLimit`'s worked example lives in its TSDoc `@example` per the refuter's amendment; `oxfmt` formats Markdown here, so `guides/toolbox.md` was formatted with a scoped `npx oxfmt --write` on three owned files rather than a tree-wide `npm run format`; two `via` occurrences became `through` inside sentences a row was already rewriting; new cases are named for what they prove; `rejectionOf` stays local because moving it would owe a `tests/setup.test.ts` proof outside this row's scope.
