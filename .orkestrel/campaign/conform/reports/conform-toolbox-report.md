# Unit conform-toolbox — report

Every row is `applied`. Both fleet rows are `noop` with the evidence read. No deviation.

## Consumer edits taken

Taken first, before any numbered row.

1. **terminal's `'terminal'` → `'target'` unmount reason** — `src/server/terminals/TerminalBridge.ts:132` now reads
   `if (result.error.reason === 'target') return Response.json(result, { status: 404 })`. The installed
   declaration confirms the union member: `node_modules/@orkestrel/terminal/dist/src/core/index.d.ts:1460`
   reads `readonly reason: 'target';`. Carried through the row toolbox-subj-1 rewrite of that file's TSDoc, and
   through the row toolbox-obj-7 move of its test. Three own-guide prose sites named the old reason and now read
   `'target'`: `guides/toolbox.md` POST-status sentence, Contract invariant 24, and the
   `TerminalBridge.test.ts` bullet of `## Tests`. Sweep `'terminal'` over `src`, `tests`, `guides/toolbox.md`,
   `README.md`: only the vendored `guides/terminal.md` mirror remains (off-limits, refreshed at the wave).
2. **workspace's `MISSING` code** — `src/core/factories.ts` propagation note now reads
   `` `WorkspaceError` raised by the live workspace (`MISSING` / `MODALITY` / `PATTERN` / `RANGE`) `` with the
   following line rewrapped as the report's diff shows; `src/core/types.ts` splice `@remarks` now ends
   ``a binary target throws `MODALITY`; a missing target throws `MISSING`.``
3. **workflow's status aliases and registry** — `src/core/types.ts` imports `LifecycleStatus`, `WorkflowFault`,
   `WorkflowFunction`, `WorkflowRegistry`, `WorkflowRunnerInterface`, `WorkflowStoreInterface` (sorted); the run's
   terminal status reads `readonly status: LifecycleStatus` under TSDoc naming `{@link LifecycleStatus}`; both
   `readonly functions?: WorkflowRegistry`. `src/core/factories.ts` imports `WorkflowDefinition`,
   `WorkflowFunction`, `WorkflowRegistry`, `WorkflowRunnerInterface`, `TaskControllerInterface`; the return
   annotation reads `): WorkflowRegistry {` and the local reads `const functions: WorkflowRegistry =`.
   `tests/src/core/factories.test.ts` imports `WorkflowDefinition`, `WorkflowFunction`, `WorkflowRegistry` and
   declares `const invalid: WorkflowRegistry = { leaf: () => 'leaf' }`. `tests/src/core/helpers.test.ts` imports
   `LifecycleStatus` and declares `const statuses: readonly LifecycleStatus[]`. The `guides/toolbox.md`
   `createWorkflowFunctions` Surface row reads `WorkflowRegistry`. No guide fence changed, so no transcription in
   `tests/guides.test.ts` changed. `createWorkflowFunctions` keeps its name at every call site.
4. **guide's `symbol.kind` → `symbol.keyword`** — `tests/guides.test.ts` reads
   `.filter((symbol) => symbol.keyword === 'function')`.
5. **relation's `RelationProps` → `LoadedMap`, `ModelEventMap` arity, agent's `InstructionInterface.format` →
   `override`** — `noop`. Whole-word sweep
   `\bRelationProps\b|\bLoadedMap\b|\bModelEventMap\b|\bInstructionInterface\b|\.format\b` over
   `/home/user/fleet/toolbox` excluding `node_modules`: every `RelationProps` / `ModelEventMap` /
   `InstructionInterface` hit is in the vendored `guides/relation.md` or `guides/agent.md` mirror (off-limits);
   `LoadedMap` has no hit at all; every `.format` hit is toolbox's own `EndpointToolOptions.format`
   (`src/core/factories.ts` twice, `tests/src/core/factories.test.ts` once, `guides/toolbox.md` invariant 23).

## Rows

| Row           | Disposition | Evidence                                                                                                                                                                              |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| toolbox-obj-1 | applied     | `relationKeyShape` and its TSDoc deleted from `src/core/shapers.ts`; the `'load'` arm reads `key: keyShape`; the `keyShape` TSDoc names the database tool and the relation tool; the guide's `relationKeyShape` Surface row deleted and the `keyShape` row reworded. Sweep `\brelationKeyShape\b` over `src`, `tests`, `guides/toolbox.md`, `guides/README.md`, `README.md`: empty. |
| toolbox-obj-2 | applied     | `resolveLimit` added to `src/core/helpers.ts` with a full TSDoc block carrying an `@example`; `clampQuery` and both relation-tool arms route through it. Failing-first below.            |
| toolbox-obj-3 | applied     | `describe('flagship fences')` added to `tests/guides.test.ts` transcribing the ancestry-tag, draft-completion, `expandInclude`, `clampQuery`, and endpoint-bridge fences. Failing-first below. |
| toolbox-obj-4 | applied     | `thrownOf` deleted from `tests/src/core/factories.test.ts`; `captureError` added to the existing `@orkestrel/test` import; every call site now reads `captureError(`. `rejectionOf` kept local per the refuter's amendment (no `tests/setup.test.ts` proof was added for it, so it was not moved). Failing-first below. |
| toolbox-obj-5 | applied     | `TestTimerInterface` and `createTestTimer` moved from `tests/setupServer.ts` to `tests/setup.ts`; `createFakeTimer` deleted from `tests/src/core/factories.test.ts` and its bindings renamed `fake` → `timer`; `tests/src/server/terminals/TerminalBridge.test.ts` and `tests/src/server/terminals/TerminalConnection.test.ts` import `createTestTimer` from `../../../setup.js` and keep `readAvailable` from `../../../setupServer.js`; both `createTestTimer` proofs moved from `tests/setupServer.test.ts` to `tests/setup.test.ts`. Failing-first below. |
| toolbox-obj-6 | applied     | `tests/src/core/validators.test.ts` created with the `isWorkflowLineage`, `isAgentFunction`, `isColumnPrimitive`, `isColumnSpec`, and `isDatabaseDefinition` describes; the mixed `workflow lineage helpers` block in `tests/src/core/helpers.test.ts` was split so only the lineage-construction assertions stay; the guide gained a `tests/src/core/validators.test.ts` bullet and the helpers bullet lost the validator clauses. Failing-first below. |
| toolbox-obj-7 | applied     | `tests/src/server/factories.test.ts` moved with `git mv` to `tests/src/server/terminals/TerminalBridge.test.ts` (rename recorded as `RM` in `git status`), keeping `findRoute` and `createTextForm`; a new `tests/src/server/factories.test.ts` holds only the two-route case; the guide's `## Tests` list gained a `TerminalBridge.test.ts` bullet and the factories bullet was trimmed to the factory's own contract. Failing-first below. |
| toolbox-obj-8 | applied     | The timing lines are gone; the loop collects each `await tool.execute(args)` result and asserts every result deep-equal to the first, which is deep-equal to `args`. Renamed to `many executes with identical args return identical results`; the `(v8)` prefix dropped. No `bench()` was added. Failing-first below. |
| toolbox-subj-1 | applied    | `export * from './terminals/TerminalBridge.js'` deleted from `src/server/index.ts`; `'class TerminalBridge'` added to `INTERNAL` in `tests/guides.test.ts`; the class TSDoc lost its `@example` and gained the `TerminalConnection` intern sentence; `TerminalBridgeOptions` renamed `TerminalRoutesOptions` at its declaration, its own doc block, the `TerminalToken` doc that links it, and the import sites in `src/server/factories.ts` and `src/server/terminals/TerminalBridge.ts` (declaration and constructor parameter); the guide lost the `TerminalBridge` Lifecycle row, its `#### TerminalBridge` method table, and its composition fence, the lifecycle paragraph names `DatabaseResolver` alone, and the Surface row reads `TerminalRoutesOptions`. Sweep below. |
| toolbox-subj-2 | applied    | `databaseToolCode` → `inferDatabaseCode` and `relationToolCode` → `inferRelationCode` at their declarations, the `{@link inferTerminalCode}` cross-references kept, the `src/core/factories.ts` import list and its three call sites and the `{@link ...databaseToolCode}` reference, the two guide Surface rows, both invariant-18 references, the guide's standalone-helpers fence (import list and both call lines), and the `tests/src/core/helpers.test.ts` import list, describe title, and four case titles. Sweep below. |
| toolbox-subj-3 | applied    | The version numeral is gone from `guides/toolbox.md:5` (`to @orkestrel/workflow, whose runner owns`), invariant 4 (`the workflow runner's native bracket lookup`), invariant 6 (`The runner owns`), invariant 8 (`` (`@orkestrel/agent`) ``), and invariant 23 (both `@orkestrel/contract` citations). Sweep below. |
| toolbox-subj-4 | applied    | Every `AGENTS §N` citation replaced by the rule's name: `tests/setup.ts` (three sites) and `tests/src/core/helpers.test.ts` read `AGENTS' no-mocks rule`; `tests/src/server/terminals/TerminalBridge.test.ts` (the moved `tests/src/server/factories.test.ts` header) reads the same; `tests/src/core/shapers.test.ts` header reads `AGENTS' narrow-untrusted-input-with-guards rule`; both store tests read `AGENTS' Stores rule`. Sweep below. Ancillary decision recorded under § Deviations for the four `it()` titles. |
| toolbox-subj-5 | applied    | `src/core/constants.ts` `DATABASE_TOOL_NAME` doc rewritten in the present tense with its `@remarks` deleted, `DATABASE_TOOL_SUMMARY` / `DATABASE_TOOL_DESCRIPTION` / `DATABASE_TOOL_LIMIT` docs name `createDatabaseTool` instead of an upcoming tool, and the `Net-new:` prefix is gone; `src/core/factories.ts:998` reads `the DEFAULT store the database and relation tools persist their DatabaseDefinition configs through`; the section comments read `// === Database definition stores`, `// === Database tool`, `// === Relation tool`, `// === Database-tool operation leaves`, `// === Database tool shape`, and `// === Relation tool shape (createRelationTool call args)` with its body kept. Sweep below. |
| toolbox-subj-6 | applied    | `EndpointDefinition.invoke` renamed `execute` in `src/core/types.ts`, with its `@remarks`, the `EndpointHandler` doc, the `createEndpointTool` doc and `@example`, both call sites in `src/core/factories.ts`, both guide Surface rows, the invariant-23 prose, the guide's endpoint-bridge fence and its trailing NOTE, and every endpoint case in `tests/src/core/factories.test.ts` (properties and the test titles that named the member). Sweep below. |
| toolbox-subj-7 | applied    | `ColumnKind` → `ColumnPrimitive` and the member `type` → `primitive`, with `isColumnKind` → `isColumnPrimitive`, `compileColumnKind` → `compileColumnPrimitive`, `columnKindShape` → `columnPrimitiveShape`, the reads in `src/core/compilers.ts` and `src/core/validators.ts`, the model-facing text and worked example in `src/core/constants.ts`, the guide's Guards / Compilers / Shapes / Types rows, invariant 16, the DSL fences, and every fixture in `tests/setup.ts`, `tests/setup.test.ts`, both store tests, `tests/src/core/compilers.test.ts`, `tests/src/core/shapers.test.ts`, `tests/src/core/factories.test.ts`, and `tests/src/core/validators.test.ts`. Landed after toolbox-obj-6 created the validators test. Sweep below. |
| toolbox-subj-8 | applied    | Every named tally deleted, member lists kept: guide Surface rows for `createWorkspaceTool` and `createDatabaseTool`, the `workspaceToolShape` / `databaseToolShape` / `relationToolShape` shape rows, the `DATABASE_TOOL_DESCRIPTION` and `RELATION_TOOL_DESCRIPTION` constant rows, the `WorkspaceOperation` type row, invariant 14 (both tools' operations spelled out), invariant 16 (bounded to the named primitives), and the two `## Tests` bullets the refuter added; in source, `src/core/factories.ts` reads `the operation-discriminated union` and `src/core/constants.ts:226` names `AGENT_TOOL_SUMMARY` / `WORKFLOW_TOOL_SUMMARY` / `WORKSPACE_TOOL_SUMMARY`. Three further sites of the same class that the sweep found are recorded under § Sweeps. |
| toolbox-subj-9 | applied    | `guides/toolbox.md` invariant 23 reads `so treat sample data intended for schema inference as untrusted content whenever the resulting schema will be advertised to other agents.`; the test comment now reads `this abort is a no-op` at `tests/src/server/terminals/TerminalBridge.test.ts:866` (the site moved with toolbox-obj-7) and its lead-in `Since` became `Because`. Sweep below. |
| toolbox-subj-11 | applied   | `src/core/types.ts` `EndpointToolOptions.validate` states the mechanism (`when the endpoint's own handler validates its arguments, or when samples under-describe the real contract and the normalizing coercion would corrupt a call`); the `src/core/factories.ts` framing reads `the raw-passthrough opt-out`; the guide reads `disables that enforcement:` with the trailing compatibility clause deleted; the `src/core/types.ts` section comment names `schemaToShape` without dating it. The option and its branch are kept, per the refuter's ruling. |
| toolbox-subj-12 | applied   | `isColumnSpec`, `isColumnPrimitive`, and `isDatabaseDefinition` in `src/core/validators.ts` and `compileColumn` and `compileColumnPrimitive` in `src/core/compilers.ts` each carry `@param` and `@returns`, the guards in the fixed `True if …; false otherwise` form, using the renamed identifiers from toolbox-subj-7. |

## Fleet rows

| Row      | Disposition | Evidence                                                                                                                                                                                                                    |
| -------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fleet-F1 | noop        | `grep -rn "isBrowserVuePath" src tests vite.config.ts` exits 1 — the helper does not exist in this workspace, and the workspace has no browser environment (`ls src` returns `core` and `server`; there is no `app/`, no `tests/setupBrowser.ts`). Nothing to delete; `tests/setup.ts` keeps its other exports and its `setup` project axis is untouched. |
| fleet-F2 | noop        | Classes read: `src/core/databases/DatabaseResolver.ts`, `src/core/stores/MemoryDefinitionStore.ts`, `src/core/stores/DatabaseDefinitionStore.ts`, `src/server/terminals/TerminalBridge.ts`, `src/server/terminals/TerminalConnection.ts`, `src/core/errors.ts` (`ToolboxError`). Every one of them opens with `#` fields; none declares a public `readonly id: string` data field, and `ToolboxError` declares `readonly code` with no `#` fields at all. No `JSON.stringify` question arose. |

## Files touched

- `src/core/types.ts` — workflow status/registry aliases, `MISSING` splice remark, `ColumnPrimitive` and its `{ primitive, optional }` spec, `EndpointDefinition.execute`, the endpoint section comment and the `validate` rationale.
- `src/core/constants.ts` — present-tense database-tool docs, the `Net-new:` prefix removed, the summary tally replaced by the named constants, the model-facing column DSL now `"primitive"`.
- `src/core/factories.ts` — `resolveLimit` routing in both relation arms, `inferDatabaseCode` / `inferRelationCode`, `definition.execute`, the `MISSING` propagation note, the raw-passthrough framing, campaign labels stripped, the workspace union tally deleted.
- `src/core/helpers.ts` — `resolveLimit` added and consumed by `clampQuery`; `inferDatabaseCode` / `inferRelationCode` renamed; the section label stripped.
- `src/core/shapers.ts` — `relationKeyShape` deleted and its arm re-pointed at `keyShape`; `columnPrimitiveShape` and its `primitive` member; campaign labels stripped.
- `src/core/validators.ts` — `isColumnPrimitive` and the `primitive` read; complete TSDoc on the three guards.
- `src/core/compilers.ts` — `compileColumnPrimitive` and the `primitive` read; complete TSDoc on both leaves; the module comment names its leaves instead of counting them.
- `src/server/index.ts` — the `TerminalBridge` barrel row deleted.
- `src/server/types.ts` — `TerminalRoutesOptions` and its doc.
- `src/server/factories.ts` — the renamed options type.
- `src/server/terminals/TerminalBridge.ts` — the `'target'` unmount reason, the intern TSDoc, the renamed options type.
- `guides/toolbox.md` — every row above that names the guide.
- `tests/guides.test.ts` — `symbol.keyword`, `'class TerminalBridge'` interned, the `flagship fences` block.
- `tests/setup.ts` — `TestTimerInterface` / `createTestTimer` moved in, `primitive` fixtures, the rule-name citations.
- `tests/setup.test.ts` — both timer proofs moved in, `primitive` fixtures.
- `tests/setupServer.ts` — the timer fixture removed, `readAvailable` kept.
- `tests/setupServer.test.ts` — the timer proofs removed, the `readAvailable` proofs kept.
- `tests/src/core/validators.test.ts` — new; the guard describes.
- `tests/src/core/helpers.test.ts` — guard describes removed, `resolveLimit` describe added, renamed helpers, `LifecycleStatus`, the rule-name citation.
- `tests/src/core/factories.test.ts` — `captureError`, `createTestTimer`, `WorkflowRegistry`, `execute` endpoint definitions and titles, the rewritten identical-results case, `primitive` fixture.
- `tests/src/core/compilers.test.ts`, `tests/src/core/shapers.test.ts`, `tests/src/core/stores/*.test.ts` — renamed identifiers, `primitive` fixtures, rule-name citations.
- `tests/src/server/factories.test.ts` — rewritten to the factory's own contract alone.
- `tests/src/server/terminals/TerminalBridge.test.ts` — the moved bridge suite, re-pointed imports, new header, the `should` comment.
- `tests/src/server/terminals/TerminalConnection.test.ts` — `createTestTimer` re-pointed at `tests/setup.ts`.

Diffstat (`git diff --stat HEAD` after `git add -N` on both untracked files):
`27 files changed, 1630 insertions(+), 1511 deletions(-)`.

## Failing-first proofs

Each control ran in this unit's own exec; every runner file sits under `/home/user/work/evidence/toolbox-proofs/`.

| Row           | Command                                                                                                                    | Red                                                        | Green                                  |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------- |
| toolbox-obj-2 | `npm --prefix /home/user/fleet/toolbox run test:src:core`                                                                    | exit 1, `5 failed \| 414 passed (419)`, `TypeError: resolveLimit is not a function` (`toolbox-obj-2-red.txt`) — test written before the helper | exit 0, `419 passed (419)` (`toolbox-obj-2-green.txt`) |
| toolbox-obj-3 | `npx vitest run … --project guides` through `npm run test:guides`                                                            | exit 1, `1 failed \| 27 passed (28)`, `flagship fences > the clampQuery fence probes one row past the effective limit it claims` under a planted `limit + 2` in `clampQuery` (`toolbox-obj-3-red.txt`) | exit 0, `28 passed (28)` (`toolbox-obj-3-green.txt`) |
| toolbox-obj-4 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts`        | exit 1, `4 failed`, `ReferenceError: captureError is not defined` with the shared import removed (`toolbox-obj-4-red.txt`) | exit 0, `201 passed (201)` under the row's own command (`toolbox-obj-4-green.txt`, fix round 1) |
| toolbox-obj-5 | `npm --prefix /home/user/fleet/toolbox run test:setup`                                                                       | exit 1, `1 failed \| 16 passed (17)`, `setup > createTestTimer arms deadlines …` under a planted `armed` getter returning `0` (`toolbox-obj-5-red.txt`) | exit 0, `17 passed (17)` (`toolbox-obj-5-green.txt`) |
| toolbox-obj-6 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/validators.test.ts`       | exit 1, `3 failed \| 10 passed (13)` under a planted `isColumnKind` missing its `'boolean'` arm (`toolbox-obj-6-red.txt`) | exit 0, `13 passed (13)` under the row's own command (`toolbox-obj-6-green.txt`, fix round 1, replacing the earlier `src:core`-wide reading) |
| toolbox-obj-7 | `npm --prefix /home/user/fleet/toolbox run test:src:server`                                                                  | exit 1, `3 failed \| 34 passed (37)`, all three in `tests/src/server/terminals/TerminalBridge.test.ts`, under a planted `402` in the bridge's GET token gate (`toolbox-obj-7-red.txt`) | exit 0, `37 passed (37)` (`toolbox-obj-7-green.txt`) |
| toolbox-obj-8 | `npx vitest run … --project src:core tests/src/core/factories.test.ts -t "many executes with identical args return identical results"` | exit 1, `1 failed \| 199 skipped (200)` under a planted extra key in `createEndpointTool`'s validating branch (`toolbox-obj-8-red.txt`) — the deleted `elapsed < 1000` assertion passes for that same defect | exit 0, `1 passed \| 200 skipped (201)` under the row's own command (`toolbox-obj-8-green.txt`, fix round 1) |

Every planted line was undone by editing it back; the final gate run below is the state on disk.

## Sweeps

Run from `/home/user/fleet/toolbox` over `src`, `tests`, `guides/toolbox.md`, `guides/README.md`, and `README.md`
(the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`,
`configs/**`, `scripts/**`, and every `guides/<dependency>.md` mirror are outside those paths or excluded).

- Old names, word boundary — `\b(relationKeyShape|databaseToolCode|relationToolCode|ColumnKind|isColumnKind|compileColumnKind|columnKindShape|TerminalBridgeOptions|createFakeTimer|thrownOf|WorkflowFunctions|TaskStatus|PhaseStatus|WorkflowStatus)\b`: empty (exit 1).
- Old names, inflections — the same alternation with `(s|es|ed|ing)?` and `-i`: empty (exit 1).
- Endpoint member — `symbol\.kind|\.invoke\(|invoke:`: empty (exit 1). The word `invoke` survives only as ordinary prose in `src/core/shapers.ts` (`The registered behavior name to invoke`), `src/core/types.ts` (`the workflow function names that invoke them`, `one operation an agent invokes`), and the `TerminalBridge.test.ts` header (`invoked DIRECTLY`).
- AGENTS section numbers — `AGENTS §`: empty (exit 1).
- `should`, case-insensitive: three hits, all the local control identifier `shouldThrow` in `tests/src/server/terminals/TerminalBridge.test.ts` (`:387`, `:390`, `:418`), which `.claude/rules/writing.md` § Substitutions exempts as a literal code identifier.
- Count numerals — `\b[0-9]+ (elements|members|rules|rows|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections|constants|passes|categories|operations|arms|tools)\b`: empty.
- Count words — `\b(one|two|three|four|five|six|seven|eight|nine|ten)\b`, case-insensitive, over `guides/toolbox.md` and `src`. Every remaining hit is ruled permitted: a sentence that names its members (`the two TerminalRoute records (GET SSE form stream, POST …)`, `ACCEPTS three forms — empty args, a steps array, …`, `the two REGISTRY arms — workspaces …, switch …`, `reaches all three` after naming `.is` / `.parse` / `.explain`, `Expiry has TWO sources and one code: …`, `exactly two records (GET then POST)`); a fixed structural arity (`optional at all three levels (workflow / phase / task)`, `the six required id/name strings`, `its four flat caret integers`, `a two-arg handler shape`, `a worked two-field example`); a limit reported as a value (`root plus eight nested workflows is allowed; a ninth … is rejected`, against `MAX_WORKFLOW_CHAIN` `8`); or fictional sample text (`Summarize the attached notes in three bullet points.`).
  Three hits were genuine counts of the same class the row deletes, and were fixed under toolbox-subj-8: `guides/toolbox.md:5` (`All three tools additionally advertise` → `The workflow, workspace, and agent tools additionally advertise`), the `createDescribeTool` Surface row (`the other three tools' lean summary` → the same three named), and the Compilers section lead plus its mirror comment in `src/core/compilers.ts` (`the two leaves it maps with` → `the compileColumn / compileColumnPrimitive leaves it maps with`).
- Structural sweep after implementation: `lint:check` exits 0 with `--deny-warnings`, which is what proves no stale import, no unused contract symbol, and no shadowed binding; `resolveLimit` is exported from `src/core/helpers.ts`, reaches the barrel through `src/core/index.ts`, and carries its own describe in `tests/src/core/helpers.test.ts`.

## Gates

Run in order from `/home/user/fleet/toolbox` after every planted line was undone. Output files under
`/home/user/work/evidence/toolbox-proofs/`.

| Gate                 | Exit | File                          |
| -------------------- | ---- | ----------------------------- |
| `npm run format:check` | 0  | `gate-format-check-final.txt` |
| `npm run lint:check`   | 0  | `gate-lint-check-final.txt`   |
| `npm run check`        | 0  | `gate-check-final.txt`        |
| `npm run build`        | 0  | `gate-build-final.txt`        |
| `npm test`             | 0  | `gate-test-final.txt` — `456 passed` (src), `111 passed` (policy), `46 passed` (config), `17 passed` (setup), `28 passed` (guides) |

`git status --short` lists 27 entries, every one under Owned: `guides/toolbox.md`, `src/**`, and `tests/**`
outside the vendored set. The two additions are `tests/src/core/validators.test.ts` and the rewritten
`tests/src/server/factories.test.ts`; the rename `tests/src/server/factories.test.ts →
tests/src/server/terminals/TerminalBridge.test.ts` is recorded as `RM`.

**Observation, not a criterion.** The `npm test` reading was taken inside this unit's own exec with its harness
resident and a sibling unit running in `/home/user/fleet/ollama`. No test failed on timing. The deciding run is
the Orchestrator's after this unit exits.

Evidence files regenerated last with `node /home/user/scaffold/tmp/work/evidence.mjs toolbox`:
`/home/user/work/evidence/conform-toolbox.diff` (4621 lines) and `/home/user/work/evidence/conform-toolbox.status`
(27 entries).

## Breaking

No package in the fleet closure declares `@orkestrel/toolbox` (`grep` over `/home/user/fleet/*/package.json`
returns only toolbox's own `name` field), so no in-fleet consumer needs an edit and no consumer-side patch is
carried. An external consumer of `@orkestrel/toolbox` 0.0.11 meets these published-surface breaks, each earning
the version bump:

- `relationKeyShape` is removed from the core barrel. Replace it with `keyShape`, which is the same shape.
- `ColumnKind` is renamed `ColumnPrimitive`, `isColumnKind` → `isColumnPrimitive`, `compileColumnKind` →
  `compileColumnPrimitive`, `columnKindShape` → `columnPrimitiveShape`, and the `ColumnSpec` object form's member
  `type` → `primitive`. This also moves the model-facing wire: the database tool's `'create'` operation now takes
  `{ "primitive": "string", "optional": true }` where it took `{ "type": … }`.
- `databaseToolCode` → `inferDatabaseCode` and `relationToolCode` → `inferRelationCode`.
- `EndpointDefinition.invoke` → `execute`. A consumer authoring an endpoint record renames that property.
- `TerminalBridgeOptions` → `TerminalRoutesOptions` on the `/server` barrel, and `TerminalBridge` is no longer
  exported there. Construct the routes with `createTerminalRoutes(manager, options)`.

## Shared-file patches

None. No row required an edit outside `/home/user/fleet/toolbox`, and no vendored file in this checkout was
touched. The vendored dependency guide mirrors (`guides/terminal.md`, `guides/workspace.md`, `guides/workflow.md`,
`guides/agent.md`, `guides/queue.md`, `guides/guide.md`, `guides/contract.md`, `guides/database.md`) still carry
their upstream wording and refresh at the wave, as the addendum directs.

## Deviations

None. No row's repair contradicted a rule, collided with an existing name, required a file outside Owned, or
required a consumer edit to keep this package's gates green.

Ancillary questions decided and carried on from, per the deviation contract:

1. **The possessive rule name inside a single-quoted test title.** toolbox-subj-4's operative form writes
   `AGENTS' export-and-test-reusable-logic law`, and four of its sites are `it('…')` titles where the apostrophe
   closes the string — `oxfmt --check` reported `Expected ',' or ')' but found 'export'` at
   `tests/src/core/shapers.test.ts:25`. Those four titles read `the export-and-test-reusable-logic law in AGENTS`
   instead. Every citation in a comment keeps the possessive form the row names.
2. **Where the `resolveLimit` example lives.** Per the refuter's amendment the guide gained a Surface row and no
   fence; the worked example is the `@example` block on the helper's TSDoc, which is what
   `findUnexampled(names, fences, source.examples())` reads.
3. **Guide table alignment.** `oxfmt` formats Markdown in this repository, so it re-flowed the tables the renamed
   symbols widened. `guides/toolbox.md` was formatted with a scoped
   `npx oxfmt --config .oxfmtrc.json --write guides/toolbox.md tests/guides.test.ts tests/src/core/factories.test.ts`
   rather than a tree-wide `npm run format`.
4. **Two guide sentences beyond the letter of their row.** Invariant 16's `via compileColumn / compileColumnKind`
   became `through …` while toolbox-subj-7 and toolbox-subj-8 were already rewriting that sentence, and invariant
   14's `retrievable via createDescribeTool` became `through` in the sentence toolbox-subj-8 rewrote.
   `.claude/rules/writing.md` § Substitutions bans `via`; neither edit touched a sentence no row reached.
5. **New case names.** Every case added to `tests/guides.test.ts`, `tests/src/core/validators.test.ts`, and
   `tests/src/core/helpers.test.ts` is named for what it proves, not for the row that specified it.
6. **`rejectionOf` placement.** Kept local in `tests/src/core/factories.test.ts`, per toolbox-obj-4's amendment:
   moving it to `tests/setup.ts` would owe a `tests/setup.test.ts` proof, and that proof was not in this row's
   scope.

## Fix round 1

Objective lane: `/home/user/scaffold/.orkestrel/campaign/conform/units/l56/toolbox-objective-r1.md`. Grok checker:
`/home/user/scaffold/.orkestrel/campaign/conform/units/l56/toolbox-r1-checker-grok.result.md`. Both named the
same `0.0.7's` numeral at `src/core/factories.ts:1452`.

- **toolbox-subj-3 / checker referral** — `src/core/factories.ts:1452`: `` `@orkestrel/contract` 0.0.7's `explain`
  mirrors the normalizing `` → `` `@orkestrel/contract`'s `explain` mirrors the normalizing ``, rewrapped by
  `npx oxfmt --config .oxfmtrc.json src/core/factories.ts` (no other line in the file changed under this fix
  round; `diff` against the pre-fix1 `factories.ts` shows the `find` and `links` hunks are the prior unit's
  `resolveLimit` adoption, unchanged by this round, and the sole new hunk is `:1452`).
  Sweep `0\.0\.[0-9]` over `src`, `tests` (minus the vendored set), `guides/toolbox.md`, `guides/README.md`, and
  `README.md`: one hit, `tests/src/core/factories.test.ts:3147` `` known contract 0.0.6 output ``, ruled
  **permitted** — the title names a fixed fixture value the test asserts a `deep-equal` against, not a claim
  dated by the installed dependency's release.
- **toolbox-subj-8** — `tests/src/core/shapers.test.ts:263` `` describe('workspaceToolShape — the 13-op
  discriminated union', ... `` → `` describe('workspaceToolShape — the operation-discriminated union', ... ``;
  `:382` `` databaseToolShape — the 11-op discriminated union `` → `` databaseToolShape — the
  operation-discriminated union ``; `:583` `` relationToolShape — the 5-op discriminated union `` →
  `` relationToolShape — the operation-discriminated union ``. The report's recorded tally pattern at `:130`
  gains `[0-9]+-(op|arm|operation|element|member|tool)s?\b`; re-run over `src`, `tests` (minus the vendored
  set), `guides/toolbox.md`, `guides/README.md`, and `README.md`: empty.
- **Missing greens** — `toolbox-obj-4-green.txt` now reports `201 passed (201)` under
  `--project src:core tests/src/core/factories.test.ts`; `toolbox-obj-6-green.txt` now reports `13 passed (13)`
  under `--project src:core tests/src/core/validators.test.ts` (replacing the earlier `src:core`-wide, wrong-file
  reading); `toolbox-obj-8-green.txt` now reports `1 passed | 200 skipped (201)` under
  `--project src:core tests/src/core/factories.test.ts -t "many executes with identical args return identical
  results"`. Proof-table rows updated above.
- **R1** — `tests/src/server/terminals/TerminalBridge.test.ts`: every bare `const fake = createTestTimer()` at
  `:68`, `:225`, `:289`, `:384` → `const timer = createTestTimer()`, and every `fake.`-prefixed reference in
  those blocks (`fake.timer`, `fake.fire(`, `fake.armed`) → the `timer.`-prefixed form, applied with a
  word-boundary `sed` pass so the unrelated `churn` bindings and `timer:` property keys are untouched.
  `grep -n '\bfake\b' tests/src/server/terminals/TerminalBridge.test.ts` returns nothing.
- **R2** — Ruling adopted: a factory-level guard for the negative-`limit` regression `toolbox-obj-2`'s finder
  originally reported. Added `it('a negative \`limit\` option floors the effective limit at 0 for find and
  links', ...)` in `tests/src/core/factories.test.ts` after the `:2898-2907` `` a small `limit` option `` case:
  seeds the same three accounts plus one linked rep, constructs
  `createRelationTool({ managers: { shop: manager }, limit: -1 })`, executes `'find'` on `accounts` with
  `include: []`, and executes `'links'` on that account/relation the way the file's nearest `'links'` case does.
  Plant, run, and restore at `src/core/factories.ts:1371`: `const effective = resolveLimit(call.limit, cap)` →
  `const effective = Math.min(call.limit ?? cap, cap)`.
  **Deviation, decided and carried on.** The brief's own predicted red — `count` off by one under the plant —
  does not occur: with `effective = -1` the `'find'` case's own probe query requests `limit: effective + 1 = 0`,
  and the real `@orkestrel/database` in-memory driver treats `limit: 0` as literally zero rows
  (`node_modules/@orkestrel/database/dist/src/core/index.js:702-703`, `result.slice(offset, offset)`), so
  `rows` is already empty before the buggy `slice(0, -1)` runs and `count` reads `0` under both the buggy and
  the fixed code — the plant produced `1 passed`, not a failure. `count`, `truncated` both read identically
  under the buggy and fixed forms for this shape (structurally: a request of `effective + 1 <= 0` always
  yields `0` rows on both branches). `result.limit` is the only field that differs (`0` fixed, `-1` buggy), so
  the case additionally asserts `expect(isRecord(found) ? found.limit : undefined).toBe(0)`. Under the plant
  this reports `AssertionError: expected -1 to be +0` (`toolbox-obj-2-factory-red.txt`); restored, it passes
  (`toolbox-obj-2-factory-green.txt`). This stays within the brief's stated purpose (a factory-level guard
  against the regression `toolbox-obj-2` found) and its ancillary-decision grant (case title, deviation
  contract) rather than a stop, because neither of the contract's named stop conditions fires: the site at
  `:1371` reads exactly as the brief quotes it, and the case was written from the file's existing fixtures.
  `links` is unaffected by this plant (it routes through `resolveLimit(undefined, cap)` at `:1391`, which the
  prior unit already adopted and this brief does not touch); its assertion (`count === 0`) documents the same
  floor for that operation without exercising a live regression.
- **R4** — `src/core/shapers.ts:404`: `description: 'Column name to its type.'` → `description: 'Column name
  to its primitive or its { primitive, optional } spec.'`, reformatted onto its own line by
  `npx oxfmt --config .oxfmtrc.json src/core/shapers.ts`.
- **O2** — this report's `:49` now reads "every call site now reads `captureError(`".
- **O1** — order sentence corrected: the `-final` gate captures were written after `gate-test-final.txt`
  (`npm test` ran before `format:check`, `lint:check`, `check`, and `build` in that landing chain); this fix
  round's own chain ran in the `AGENTS.md` order — `format:check`, `lint:check`, `check` — each capture ending
  `exit=<code>` as its last line: `gate-format-check-fix1.txt` (`exit=0`, after one `oxfmt --write` convergence
  on `src/core/shapers.ts`), `gate-lint-check-fix1.txt` (`exit=0`), `gate-check-fix1.txt` (`exit=0`).

`git status --short` still lists the same 27 paths (no new file). `npm run format:check`, `npm run lint:check`,
and `npm run check` each exit `0`; the scoped vitest runs above each exit `0`.
