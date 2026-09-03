## Per-claim verdicts

1. **CONFIRMED.** The dispositions at `/home/user/scaffold/tmp/units/conform/conform-worker-report.md:27-47` match the repairs verified under claim 2. Fleet-F1 and fleet-F2 remain valid noops.

2. **CONFIRMED.** The operative repairs are present: `createThread` and `Dispatch` at `src/server/factories.ts:41` and `src/server/index.ts:5`; scratch and fixture helpers at `tests/setupServer.ts:22-32`; foreign-thread qualification at `src/server/types.ts:41-45`; condition gates at `tests/src/server/helpers.test.ts:239-241,275-277,727-729`; fence transcriptions at `tests/guides.test.ts:199-257`; emitter options at `src/server/types.ts:85-87`; fixed defaults at `src/core/types.ts:55-59` and `src/server/types.ts:68-73`; and the required guide changes throughout `guides/worker.md`.

3. **REFUTED.** Sweeps over `src`, `tests`, `guides/worker.md`, `guides/README.md`, and `README.md` found no old API use for `\bspawnThread\b`, its case-insensitive inflections, `` `dispatch`|\bdispatch\(|import.*\bdispatch\b ``, or `\bQueueExecution\b`. The case-insensitive `dispatches|dispatched|dispatching` hits at `src/server/Dispatch.ts:10`, `src/server/types.ts:34`, `tests/src/server/helpers.test.ts:52,537`, and `guides/worker.md:225,320` are permitted English senses. The report records neither that inflection sweep nor a `QueueExecution` sweep; its recorded patterns at `/home/user/scaffold/tmp/units/conform/conform-worker-report.md:63-67` therefore do not satisfy the claim. Add the missing patterns, paths, and per-hit rulings to the report.

4. **REFUTED.** Worker-obj-10 explicitly has no failing-first proof at `/home/user/scaffold/tmp/units/conform/conform-worker-report.md:139-144`. Other controls also fail outside their named regression: `obj7-control-red.txt:10-56` reports `3 failed | 7 passed (10)`, including `postRun` cases, and `obj8-control-red-3.txt:8-56` reports `3 failed | 45 passed (48)`, including timeout and foreign-thread cases. This conflicts with `/home/user/scaffold/.claude/rules/tests.md:40-41`. Supply isolated controls that redden the named tests, and either provide a valid instrument for worker-obj-10 or record that row as stopped.

5. **REFUTED.** Method and Surface parity holds at `src/core/types.ts:90-118` and `guides/worker.md:108-139`, but the required `AGENTS §` sweep is not empty. Hits remain in touched files, including `tests/src/core/Worker.test.ts:33`, `tests/guides.test.ts:3`, `src/server/helpers.ts:8,10`, `src/server/types.ts:16,79`, and `guides/worker.md:20,127,155`. Remove these citations and make the surrounding prose self-contained.

6. **CONFIRMED.** `/home/user/scaffold/tmp/units/conform/conform-worker-report.md:277-296` names the removed `spawnThread` and `dispatch` exports, their replacements, and the `QueueExecution` to `QueueContext` signature change. The fleet sweep `from ['"]@orkestrel/worker(?:/server)?['"]` found no consumer outside this package.

7. **CONFIRMED.** Current `git status --short` and `git diff --name-only HEAD` contain only Owned paths. The sweep `export\s*\{[^}]*\b(?:spawnThread|dispatch)\b|(?:spawnThread|dispatch)\s+as\s+|@deprecated|compatib|shim` found no compatibility surface.

8. **CONFIRMED for the source conjunct; NOT-EVIDENCED for the gate run.** Diff sweeps found no `.skip(`, `.only(`, `.todo(`, test retry, framework timeout increase, TODO, or debugger. Domain `retries`, per-job `timeout`, and `waitForCondition` budgets are permitted senses. The report names every required gate at `/home/user/scaffold/tmp/units/conform/conform-worker-report.md:264-271`, but the supplied logs do not record process exit status. The Orchestrator’s landing run settles this part.

9. **CONFIRMED.** Sweeps over the diff and current Owned tree found no TODO, FIXME, skipped test, commented-out implementation, or debugger. The `console.log` additions at `guides/worker.md:78-80` and `src/server/Dispatch.ts:50` are executable examples, not debug residue. The disposition table matches the diff.

## Findings outside the claims

O1. `tests/guides.test.ts:200` assigns `isNumber` inside a `describe` callback, violating `/home/user/scaffold/.claude/rules/architecture.md:161-163`. Added nested callback assignments also occur at `tests/setupServer.test.ts:89,136,151` and `tests/src/server/factories.test.ts:153-159,185,212`. Import `isNumber` from `@orkestrel/contract`, use recorder handlers for inert callbacks, and extract closure-bearing callback factories to module scope.

O2. `src/server/factories.ts:104-106` claims to list the optional `createNodeWorker` keys but omits the added `on` and `error` keys. Add those keys to the public `@param options` description.

O3. The report contains pointers that do not carry their stated evidence. Examples include `/home/user/scaffold/tmp/units/conform/conform-worker-report.md:84-88` pointing at `src/server/types.ts:46-51` for remarks found at `:41-45`, and report lines `150-156` pointing at `src/server/types.ts:96-97` for fields found at `:86-87`. Refresh the report’s evidence pointers.

## Referrals to the Orchestrator

R1. Will the landing run record actual process exit statuses for `format:check`, `lint:check`, `check`, `build`, and `test` to settle claim 8?

R2. Does the campaign inventory name a consumer outside `/home/user/fleet` that needs the breaking edits?

R3. For worker-obj-10, will the Orchestrator supply a valid deterministic instrument or return the row as stopped?

FAIL 3, 4, 5