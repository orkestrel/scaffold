I'll read the brief in full first, then follow it exactly and stay read-only.I'll read the example landing message and the four package reports next, then draft from those sections only.The reports are in. I’ll pull the writing rule and any unit-brief row text that’s too terse to draft from the summaries alone.## worker

```
Conform worker to the fleet rules: Dispatch, QueueContext, fences

`spawnThread` leaves for `createThread`, and `dispatch` leaves for `Dispatch` (each breaking, no fleet consumer). The `QueueExecution` type is the `QueueContext` type on the `WorkerHandler` parameter and the `ServeWorkerOptions.handler` parameter (breaking for a caller that names the type, no fleet consumer). The `createThread` factory lives in the `factories.ts` module with a runnable `@example` block; the `Dispatch` class is barrelled and carries the wrapper's `@remarks` block; the `NodeWorker.#create` method constructs `Thread` and `Dispatch` directly, so the `NodeWorker.ts` file never imports `factories.ts`; the `helpers.ts` module holds the `isReply` helper alone. The `NodeWorkerOptions` interface carries the `on` and `error` members matching `WorkerOptions`; a dispatch marks a thread dead for a `NodeThread` this package produced through `createThread` or a `createNodeWorker` pool, and a foreign implementation owns flipping its own `alive`; the `workerData` option mirrors the `node:worker_threads` `Worker` constructor option and must be structured-cloneable. The `tempDatabasePath` helper returns `{ path, scratch }` and the caller destroys the scratch; the `buildFixtureURL` helper is the shared fixture locator; abort specs wait through `waitForCondition` from `@orkestrel/test` and assert the replacement job reports a different `threadId`; spin deadlines read `performance.now()`. The Threads, NodeWorker, Persistence, and CPU-parallel fences execute from `tests/guides.test.ts`; the Threads fence exercises `createThread`, `Dispatch`, and `isReply`. Documented defaults use the `Default:` form; `Reply` is the public reply half of the wire protocol; introducing sentences precede the guide tables; the `AGENTS §` citations, the `via` sites, the counts, the continuity claims, and the positional pointers leave the package's prose.

AUDIT-PARAGRAPH

```

Sources: `conform-worker-report.md:5-22`, `:24-231`, `:286-303`; final form `:328-345`, `:401-405`, `:413-423`, `:441-483`

## workflow

```
Conform workflow to the fleet rules: LifecycleStatus, executed fences

`WorkflowHooks`, `PhaseHooks`, and `TaskHooks` leave (each breaking, no fleet consumer). `PHASE_STATUSES` and `WORKFLOW_STATUSES` leave, `TASK_STATUSES` is `LIFECYCLE_STATUSES`, and `TERMINAL_TASK_STATUSES` is `TERMINAL_STATUSES` (each breaking, no fleet consumer). `TaskStatus`, `PhaseStatus`, and `WorkflowStatus` leave and every position is `LifecycleStatus`, and `WorkflowFunctions` is `WorkflowRegistry` (each breaking, reaches the `@orkestrel/toolbox` package); the `functions` option key stays. `RunnerValue` and `RunnerFailure` leave, and the `#values` field stores `Success` and the `#failure` field stores `Failure` (each breaking, no fleet consumer). The `Runner.#dispatch` method takes the `QueueContext` type. The `RunHolder` class is barrelled; `Controller` and `TaskController` declare `#` fields then getters; batch `remove` reports true only when every id was removed; option positions take `EmitterHooks` directly; `scanSnapshotContext` and `hasWorkflowHandlers` carry complete TSDoc. Tests read `Promise.withResolvers` in place of `createGate` and `TestGateInterface`; interval pairs read `performance.now()`; the `Collection.test.ts` file drives a live `Collection`; the `buildTasks` and `buildCollection` factories live in the `setup.ts` module. The opening-runner, positional-collection, contract, append, and derivation fences execute from `tests/guides.test.ts`; `WorkflowPersistence` and `Workflow` carry runnable `@example` blocks. Surface rows in the Factories, Environment-backend, Errors, and Helpers-and-guards tables are noun phrases; `guides/README.md` carries paragraphs for `queue.md`, `test.md`, `scaffold.md`, and `probe.md`; the `§` citations, the `via` sites, the `currently` and temporal `now` sites, the `e.g.` abbreviations, the counts, and the positional pointers leave the package's prose.

AUDIT-PARAGRAPH

```

Sources: `conform-workflow-report.md:5-17`, `:19-45`, `:138-148`; final form `:212-237`, `:241-385`, `:401-416`, `:431-444`, `:450-465`

## brief

```
Conform brief to the fleet rules: the named builders, executed fences

`task` is `buildTask`, `reference` is `buildReference`, `manifest` is `buildManifest`, `outcome` is `buildOutcome`, `given` is `buildGiven`, `example` is `buildExample`, `citation` is `buildCitation`, `gap` is `buildGap`, `risk` is `buildRisk`, `output` is `buildOutput`, `proof` is `buildProof`, `brief` is `buildBrief`, and `gateDefinition` is `buildGateDefinition` (each breaking, no fleet consumer). `deriveStatement` returns `string | undefined` (breaking, no fleet consumer). Colliding setup fixtures are `buildReadyTask`, `buildReadyManifest`, and `buildReadyBrief`. The `buildExample` helper takes `output`; the `assertBrief` helper takes `value`; `BriefCompiler.gate` and `BriefManager.add` take `brief`. Documented defaults use the `Default:` form; the `validators.ts` guards carry `@param value` and a fixed-form boolean `@returns`. The `INTERPRETATION_MEMBERS` constant drops `'complete'`; the `#blockage` method reads `!entry.applied`; shape descriptors read `category`. The flagship fences execute from `tests/guides.test.ts` and pin the documented builder values. The reasons-idiom claim leaves; the `BLANK_PATTERN` row matches `/^ +$/`; document pointers, temporal `once`, dating `new`, and `should` leave the package's prose.

AUDIT-PARAGRAPH

```

Sources: `conform-brief-report.md:5-57`, `:59-280`, `:334-369`; final form `:408-422`, `:472-492`, `:623-648`, `:717-724`

## probe

```
Conform probe to the fleet rules: buildRevisionPath, derived state

`createRevisionFile` leaves for `buildRevisionPath` (breaking, no fleet consumer). The `Probe.#destroy` method releases the emitter in a `finally`; `Probe`, `TypeStage`, `LintStage`, and `RuntimeStage` derive destruction from `#closing`. The `main.ts` entry splits a reported message on `/\r\n|\n/u`; live-process sites read `isRunning` from `@orkestrel/test/server`; the `createLintFixture` helper is the shared Oxlint fixture; `readHostEnding` lives in `setupServer.ts` beside `readChildEnding` and `describeEnding`. Admitted-document, killed-child, unanswered-initialize, and closed-record waits use `waitForCondition`, and the unspawnable-child `waitForDelay(250)` stands; `probeRefusedTargets` is exported with its own proof. The `RuntimeStage` `@remarks` and the guide state the exact-match overlay and the workspace miss report; the receipt paragraph names the `tests/guides.test.ts` file as the gate that re-runs the claim; the `LintStageInterface` table lists the `inspect` method alone; the Teardown entry states that `destroy` releases the emitter's listeners.

AUDIT-PARAGRAPH

```

Sources: `conform-probe-report.md:6-38`, `:40-57`, `:191-199`, `:209-269`; final form `:293-360`

## Unknowns

None.