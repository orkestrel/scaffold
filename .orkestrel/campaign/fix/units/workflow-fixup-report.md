# Report — unit workflow-fixup (builder, Sonnet)

Every finding closed, one recorded correction. 1: `locateSnapshotContext` → `scanSnapshotContext`
at `src/core/helpers.ts:908`, `src/core/cloners.ts:4,33`, `tests/src/core/validators.test.ts`, the
guide row, barrel example, and call example. 2: `src/core/types.ts:906` `functions?.[behavior]`.
3: `src/core/phases/Phase.ts:164` "for its `behavior`". 4: `tests/src/core/helpers.test.ts:688`
`expect('behavior' in snapshot).toBe(false)` — plant: `taskDefinitionToSnapshot` emitted
`behavior` unconditionally for one line; red 1 failed | 159 passed (`expected true to be false`
at `:688`); plant restored; green 160 passed; `git diff --stat src/core/helpers.ts` afterwards
carries only the rename. 5: `'captured-behaviors'`, `'Captured behaviors'`, `noBehavior`,
`emptyBehavior`. 6: one paragraph under "Persisting & restoring" naming the `run`-keyed
pre-release snapshot, the `RESTORE` `WorkflowError` refusal, and the key rewrite, worded as "the
release that renames `run` to `behavior`". 7: `ControllerInterface` and `TaskControllerInterface`
at the layer summary, the `RunnerHandler` row, the Patterns substrate paragraph, and the handle
section heading and opening; `Phase` and `Task` tier nouns stay, recorded. 8:
`createWorkflowTree(definition, captured)` reading `captured.bail`, call sites at
`src/core/factories.ts:127`, `src/core/WorkflowManager.ts:203`, `src/core/WorkflowRunner.ts:227`,
the `@example`, and `tests/src/core/factories.test.ts`. 9: `RunHolder` out of `src/core/index.ts`,
`'class RunHolder'` in `INTERNAL`, relative import in its test, class row removed from the
substrate table, the `RunHolderInterface` Types row and Methods table kept; the parity test
(`RunHolderInterface examples > documents an example for every method`) requires the `hold`
`@example`, so it stays with a relative import while the class-level example is deleted. 10:
`#idleCallback` the detector, `#idle` the boundary; `tests/src/browser/IdleScheduler.test.ts:10`
comment updated. 11: every consumer-handler fence in the guide names its handler `compile`; the
`const run = runner.execute(jobs)` noun stays. 12: the retained `hold` example reads
`createRunner<TaskInterface, void>({ handler: () => undefined })`.

Sweeps: `locateSnapshotContext` no hit; `locate*` survives only as the English verb
(`guides/workflow.md:229`, `src/core/helpers.ts:907`, `tests/src/core/validators.test.ts:423`,
and the vendored `tests/setupPolicy.ts:353`); the removed-field pattern returns no hit;
`.run`/`'run'`/`run:` survive only as the `RuleTester` API in `tests/config.test.ts`, a generic
key in the vendored policy fixture, and the negative assertion at
`tests/src/core/stores/MemoryWorkflowStore.test.ts:223`.

Gates: lint 0 and format 0 to converge; format:check 0, lint:check 0, check 0, build 0, test 0
(src 861; policy 111; config 46; setup 27; guides 88). `git status --short`: the eighteen owned
files.
