## H4 fix report

### Root cause

`SupervisorApplication.#available()` concurrently read workflow snapshots and supervisor retained state with `Promise.all()`. In the persistent application these are separate database wrappers sharing one SQLite driver, so their overlapping schema selection caused the snapshot query to run against the supervisor schema and fail with `Table 'snapshots' is not in the schema`.

### Failing-first evidence

- Red: `npx vitest run --project app:server tests/app/server/ApplicationRuntime.test.ts`
  - Exit 1; isolated regression: 1 failed.
  - `ApplicationError: Workflow retained-state read failed`
  - Cause: `DatabaseError: Table 'snapshots' is not in the schema`
- Green after serializing the reads: same command, exit 0; 1 passed.
- Temporary `.only` isolation was removed.

### Diff delta

- [SupervisorApplication.ts](/workspace/supervisor/app/server/SupervisorApplication.ts:332): snapshot and supervisor reads now execute sequentially.
- [ApplicationRuntime.test.ts](/workspace/supervisor/tests/app/server/ApplicationRuntime.test.ts:112): added a listener-free fresh-SQLite first-start regression.
- Fix-round delta: 2 files, 28 insertions, 5 deletions.
- Total uncommitted H4 tree: 23 files, 619 insertions, 23 deletions.
- No successor changes to `app/core/types.ts`, routes, handlers, carriers, or parity scope.

### Listener-free verification

Green:

- `npm run test:src:core` — 14 files, 176 tests.
- `npm run test:app:core` — 4 files, 99 tests.
- Store integration — 1 file, 24 tests.
- Application routes and supervisor seam — 2 files, 3 tests.
- Fresh SQLite regression — 1 test.
- `npm run format:check`
- `npm run lint:check`
- `npm run check`
- `npm run build`
- `git diff --check`

I cannot report the aggregate `npm run test:src` green: it remains at 20 failures in four unchanged provider/CLI-fixture suites, the same unrelated failure family observed before this fix round. The affected core and real database-store suites are green.

### Awaiting Orchestrator

- `tests/app/server/ApplicationServer.test.ts`, especially `discovers and inspects completed SQLite history after an application restart`.
- The listener-containing `npm run test:app:server` and aggregate `npm run test:app` acceptance runs.

### Working tree

```text
 M app/core/constants.ts
 M app/core/helpers.ts
 M app/core/parsers.ts
 M app/core/types.ts
 M app/core/validators.ts
 M app/server/ApplicationHandlers.ts
 M app/server/ApplicationRoutes.ts
 M app/server/SupervisorApplication.ts
 M app/server/types.ts
 M src/core/errors.ts
 M src/core/stores/DatabaseSupervisorStore.ts
 M src/core/stores/MemorySupervisorStore.ts
 M src/core/types.ts
 M tests/app/core/helpers.test.ts
 M tests/app/core/parsers.test.ts
 M tests/app/core/validators.test.ts
 M tests/app/server/ApplicationRoutes.test.ts
 M tests/app/server/ApplicationRuntime.test.ts
 M tests/app/server/ApplicationServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/errors.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/stores/integration.test.ts
?? database
```

The pre-existing untracked `database` artifact was left untouched. No implementation deviation; no commit was created.