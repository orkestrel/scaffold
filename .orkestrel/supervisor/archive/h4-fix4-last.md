## Touched files and diffstat

- App core: [constants.ts](/workspace/supervisor/app/core/constants.ts), [parsers.ts](/workspace/supervisor/app/core/parsers.ts), [types.ts](/workspace/supervisor/app/core/types.ts), [validators.ts](/workspace/supervisor/app/core/validators.ts)
- App server: [ApplicationPersistence.ts](/workspace/supervisor/app/server/ApplicationPersistence.ts), [SupervisorApplication.ts](/workspace/supervisor/app/server/SupervisorApplication.ts), [types.ts](/workspace/supervisor/app/server/types.ts)
- Supervisor core: [constants.ts](/workspace/supervisor/src/core/constants.ts), [errors.ts](/workspace/supervisor/src/core/errors.ts), [factories.ts](/workspace/supervisor/src/core/factories.ts), [helpers.ts](/workspace/supervisor/src/core/helpers.ts), [DatabaseSupervisorStore.ts](/workspace/supervisor/src/core/stores/DatabaseSupervisorStore.ts), [MemorySupervisorStore.ts](/workspace/supervisor/src/core/stores/MemorySupervisorStore.ts)
- Tests: [app/core/parsers.test.ts](/workspace/supervisor/tests/app/core/parsers.test.ts), [app/core/validators.test.ts](/workspace/supervisor/tests/app/core/validators.test.ts), [ApplicationPersistence.test.ts](/workspace/supervisor/tests/app/server/ApplicationPersistence.test.ts), [ApplicationRoutes.test.ts](/workspace/supervisor/tests/app/server/ApplicationRoutes.test.ts), [setupServer.ts](/workspace/supervisor/tests/setupServer.ts), [errors.test.ts](/workspace/supervisor/tests/src/core/errors.test.ts), [server/integration.test.ts](/workspace/supervisor/tests/src/server/integration.test.ts), [stores/integration.test.ts](/workspace/supervisor/tests/src/server/stores/integration.test.ts), [setupServer.test.ts](/workspace/supervisor/tests/src/server/setupServer.test.ts)
- Guide: [supervisor.md](/workspace/supervisor/guides/src/supervisor.md)

Combined diffstat: **23 files, 256 insertions, 117 deletions**.

## Item closure

| Item | Closure |
|---|---|
| 1. Saturation | `computeRunUpdated` refuses caller event stamps at `Number.MAX_SAFE_INTEGER`; both stores compute before mutation. Tests cover both backends, the beyond-safe-integer guard, near-boundary fresh ordering, and sibling continuation. |
| 2. Schema source | Added exported `SUPERVISOR_COLUMNS` and `SUPERVISOR_INDEXES`; both factories and `ApplicationPersistence` compose them. Snapshot ids now require `min: 1`; database name is `${APP_NAME}-application`. |
| 3. Guide truth | Guide now documents both factory routes, caller-declared composition, and the one-database/one-lane application spine. |
| 4. Constants | Renamed to `APP_HISTORY_COUNT`, `APP_HISTORY_MAXIMUM`, and `APP_HISTORY_INPUT`. The limit error interpolates the exported maximum and has a direct proof. |
| 5. Terminal set | `TerminalStatus` derives from `WorkflowStatus`; `isTerminalWorkflowStatus` narrows through workflow’s `WORKFLOW_STATUSES` and installed `isTerminalStatus`. |
| 6. Recorder | `RecoveryStep` again contains only its four recovery boundaries. `SupervisorStoreOperation` owns `intent \| list`; the recorder proof moved beside the harness. |
| 7. Short pages | `HistoryPage` states that cursor presence alone signals continuation. The route proof observes `{ runs: [], cursor }` after terminal filtering. |
| 8. Closure | `DatabaseInterface.close()` awaits its driver’s `close()`; SQLite closes and clears its handle. After `ApplicationPersistence.destroy()`, direct driver access rejects with `CLOSED`; no second driver field is needed. |
| 9. Small truths | Removed the three-view count and standardized the error as `Run options are invalid`. |

## Guide prose diff

```diff
-primary-keyed `children` table as defence in depth. `createDatabaseSupervisorPersistence` declares
-`leases`, `units`, `briefs`, and `children` once and returns named `supervisor` and `brief` stores
-over that database. The singular `createDatabaseSupervisorStore` remains the two-table choice for
-consumers that never use briefs.
+primary-keyed `children` table as defence in depth. `SUPERVISOR_COLUMNS` and `SUPERVISOR_INDEXES`
+declare the `leases`, `runs`, and `units` schema once. `createDatabaseSupervisorStore` and
+`createDatabaseSupervisorPersistence` are two supported routes over those constants; a
+caller-declared database is the third, composing the same exported constants beside its own tables
+and indexes. The combined factory adds `briefs` and `children` and returns named `supervisor` and
+`brief` stores over that database.
```

```diff
+The durable application spine is one database and one lane: every supervisor, snapshot, and session
+read, every write, and shutdown itself is admitted through that lane.
```

## Proofs

| Criterion | Command and tail |
|---|---|
| Saturation red | `npx vitest run tests/src/server/stores/integration.test.ts` — exit 1; `2 failed \| 24 passed`; both stores incorrectly returned success. |
| Saturation green | Same command — exit 0; `1 passed`, `25 passed`. The count changed because the recorder assertion was rehomed as required. |
| Consolidated regressions | Nine listener-free files — `9 passed`, `144 passed`. |
| Core suite | `npm run test:src:core` — `14 passed`, `176 passed`. |
| App-core suite | `npm run test:app:core` — `4 passed`, `100 passed`. |
| Policy | `npm run test:policy` — `1 passed`, `17 passed`. |
| Static gates | `format:check`, `lint:check`, and full `check` all exited 0. |
| Build | `npm run build` exited 0; core, server, browser app, and server app built. |
| Schema sweep | Supervisor shape declarations occur only in `src/core/constants.ts`; the two factory sites and application persistence consume the exported constants. |
| Stale vocabulary | Tree-wide search found no old history constants/type/guard, old run-list message, or three-view wording. |
| Driver closure | Installed database source shows `await this.#driver.close()`; SQLite calls `this.#database?.close()` and clears the handle. The persistence regression passed. |

`npm run test:guides` remains at the inherited `8 failed | 296 passed`. Undocumented exports move from 65 at `33d8b19` to 67: exact parity delta **+2**, solely `SUPERVISOR_COLUMNS` and `SUPERVISOR_INDEXES`; the five vocabulary renames are one-for-one.

`npm run test:src` was rerun: the unchanged baseline provider-fixture block remains `20 failed | 227 passed` across the same four provider suites recorded by the previous H4 report. No affected supervisor, persistence, history, or recorder test failed.

## Awaiting the Orchestrator

Loopback-listener execution:

- `tests/app/server/ApplicationServer.test.ts`
- `npm run test:app:server`
- `npm run test:app`

## Git status

```text
 M app/core/constants.ts
 M app/core/parsers.ts
 M app/core/types.ts
 M app/core/validators.ts
 M app/server/ApplicationPersistence.ts
 M app/server/SupervisorApplication.ts
 M app/server/types.ts
 M guides/src/supervisor.md
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/stores/DatabaseSupervisorStore.ts
 M src/core/stores/MemorySupervisorStore.ts
 M tests/app/core/parsers.test.ts
 M tests/app/core/validators.test.ts
 M tests/app/server/ApplicationPersistence.test.ts
 M tests/app/server/ApplicationRoutes.test.ts
 M tests/setupServer.ts
 M tests/src/core/errors.test.ts
 M tests/src/server/integration.test.ts
 M tests/src/server/stores/integration.test.ts
?? tests/src/server/setupServer.test.ts
```

Implementation deviations: none. Verification exceptions are the inherited provider-fixture and guide-parity baselines plus the listener suites reserved for the Orchestrator.