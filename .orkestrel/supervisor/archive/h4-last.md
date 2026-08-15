# H4 unit report

Implemented `GET /history` and closed all six H3 carriers. No design deviations.

## Touched files and diffstat

```text
 app/core/constants.ts                       |  12 +++
 app/core/helpers.ts                         |  14 ++++
 app/core/parsers.ts                         |  92 +++++++++++++++++++++-
 app/core/types.ts                           |  28 ++++++-
 app/core/validators.ts                      |  18 ++++-
 app/server/ApplicationHandlers.ts           |  19 +++++
 app/server/ApplicationRoutes.ts             |   6 ++
 app/server/SupervisorApplication.ts         |  49 ++++++++++++
 app/server/types.ts                         |   4 +
 src/core/errors.ts                          |   2 +-
 src/core/stores/DatabaseSupervisorStore.ts  |   5 +-
 src/core/stores/MemorySupervisorStore.ts    |   5 +-
 src/core/types.ts                           |   4 +-
 tests/app/core/helpers.test.ts              |  11 +++
 tests/app/core/parsers.test.ts              |  27 +++++++
 tests/app/core/validators.test.ts           |  16 +++-
 tests/app/server/ApplicationRoutes.test.ts  | 118 +++++++++++++++++++++++++++-
 tests/app/server/ApplicationServer.test.ts  | 105 +++++++++++++++++++++++++
 tests/setupServer.ts                        |   3 +-
 tests/src/core/errors.test.ts               |   4 +-
 tests/src/core/helpers.test.ts              |   3 +
 tests/src/server/stores/integration.test.ts |  65 ++++++++++++++-
 22 files changed, 591 insertions(+), 19 deletions(-)
```

## Required diffs

```diff
diff --git a/app/core/types.ts b/app/core/types.ts
index b2d998f..0d69c1a 100644
--- a/app/core/types.ts
+++ b/app/core/types.ts
@@ -7,7 +7,7 @@ import type {
 } from '@orkestrel/agent'
 import type { PromptType, PromptValue } from '@orkestrel/terminal'
 import type { WorkflowDefinition, WorkflowSnapshot, WorkflowStatus } from '@orkestrel/workflow'
-import type { Observation, UnitSnapshot } from '@src/core'
+import type { Observation, RunCursor, UnitSnapshot } from '@src/core'
 import type { ApplicationError } from './errors.js'
 
 /** A rejected application boundary. */
@@ -112,6 +112,32 @@ export interface ApplicationRoster {
 	readonly executors: readonly Executor[]
 }
 
+/** A terminal workflow status eligible for completed history. */
+export type HistoryStatus = 'completed' | 'failed' | 'skipped' | 'stopped'
+
+/** One completed workflow joined with its supervisor release instant. */
+export interface HistoryRun {
+	readonly id: string
+	readonly name: string
+	readonly status: HistoryStatus
+	readonly created: number
+	readonly updated: number
+	readonly released: number
+}
+
+/** One decoded and bounded completed-history request. */
+export interface HistoryQuery {
+	readonly cursor?: RunCursor
+	readonly limit: number
+	readonly prefix?: string
+}
+
+/** One completed-history response page with an opaque continuation token. */
+export interface HistoryPage {
+	readonly runs: readonly HistoryRun[]
+	readonly cursor?: string
+}
+
 /** The authenticated human session view safe to return to its browser owner. */
 export interface ApplicationSession {
 	readonly user: string
diff --git a/app/server/ApplicationHandlers.ts b/app/server/ApplicationHandlers.ts
index a86e922..a27295b 100644
--- a/app/server/ApplicationHandlers.ts
+++ b/app/server/ApplicationHandlers.ts
@@ -8,6 +8,7 @@ import type { ProviderInterface as AgentProviderInterface } from '@orkestrel/age
 import type { RouteContext } from '@orkestrel/router'
 import {
 	APPLICATION_COMMAND_STATUS,
+	APP_HISTORY_PATH,
 	APP_NAME,
 	APP_SESSION_PATH,
 	APP_WORKFLOW_INSPECT_PATH,
@@ -22,6 +23,7 @@ import {
 	inferenceFailureFrame,
 	isInferenceVendor,
 	parseInferenceRequest,
+	parseHistoryQuery,
 	parseApplicationSessionInput,
 	resolveLiveFrameEvent,
 	resolveApplicationUserPrincipal,
@@ -68,6 +70,23 @@ export class ApplicationHandlers {
 		return renderApplicationJSON({ name: APP_NAME, status: 'ok' })
 	}
 
+	async history(
+		request: Request,
+		context: RouteContext<typeof APP_HISTORY_PATH, ApplicationState>,
+	): Promise<Response> {
+		try {
+			const result = await this.#application.history(
+				requireApplicationPrincipal(context.state),
+				parseHistoryQuery(new URL(request.url).searchParams),
+			)
+			return result.success
+				? renderApplicationJSON(result.value)
+				: renderApplicationError(result.error)
+		} catch (error) {
+			return renderApplicationError(error)
+		}
+	}
+
 	session(
 		_request: Request,
 		context: RouteContext<typeof APP_SESSION_PATH, ApplicationState>,
diff --git a/app/server/ApplicationRoutes.ts b/app/server/ApplicationRoutes.ts
index b51f271..d49265f 100644
--- a/app/server/ApplicationRoutes.ts
+++ b/app/server/ApplicationRoutes.ts
@@ -4,6 +4,7 @@ import { createDispatcher, type DispatcherInterface } from '@orkestrel/router'
 import { createMCPRoutes } from '@orkestrel/mcp/server'
 import {
 	APP_HEALTH_PATH,
+	APP_HISTORY_PATH,
 	APP_ROSTER_LIVE_PATH,
 	APP_ROSTER_PATH,
 	APP_SESSION_PATH,
@@ -33,6 +34,11 @@ export class ApplicationRoutes {
 			path: APP_HEALTH_PATH,
 			handler: handlers.health.bind(handlers),
 		})
+		dispatcher.add({
+			method: 'GET',
+			path: APP_HISTORY_PATH,
+			handler: handlers.history.bind(handlers),
+		})
 		dispatcher.add({
 			method: 'GET',
 			path: APP_ROSTER_PATH,
```

## Acceptance evidence

| Criterion | Evidence |
|---|---|
| Endpoint contract | Real dispatcher test proves terminal released rows, named-grant filtering before paging, `limit`, `prefix`, opaque cursor round-trip, `no-store`, unauthenticated refusal, and malformed query `PROTOCOL`/400. |
| Authentication | Listener proof added for bearer and cookie session access without CSRF, plus unauthenticated refusal. Awaiting Orchestrator execution. |
| Restart | Real SQLite application-A create/application-B list-and-inspect listener proof added. Awaiting Orchestrator execution. |
| Six carriers | All closed with permanent tests; details below. |
| Static gates | Format, lint, comprehensive typecheck/environment isolation, and build passed. |
| Listener-free tests | App core, src core, SQLite store integration, real dispatcher, and application composition passed. |

Commands and tails:

```text
npm run test:app:core
Test Files  4 passed (4)
Tests       99 passed (99)

npm run test:src:core
Test Files  14 passed (14)
Tests       176 passed (176)

npx vitest run --config vite.config.ts --no-cache --reporter=dot \
  --project src:server tests/src/server/stores/integration.test.ts
Test Files  1 passed (1)
Tests       24 passed (24)

npx vitest run --config vite.config.ts --no-cache --reporter=dot \
  --project app:server \
  tests/app/server/ApplicationRoutes.test.ts \
  tests/app/server/SupervisorApplication.test.ts
Test Files  2 passed (2)
Tests       3 passed (3)

npm run format:check
All matched files use the correct format.

npm run lint:check
exit 0

npm run check
check:src:core, check:src:server, check:app:core,
check:app:browser, and check:app:server all exit 0

npm run build
src/core, src/server, app/browser, and app/server built successfully
```

The whole `npm run test:src` gate was attempted twice and consistently reported:

```text
Test Files  4 failed | 17 passed (21)
Tests       20 failed | 225 passed (245)
```

All 20 failures are pre-existing provider-fixture/subprocess cases outside H4: empty or frameless Claude/Codex/Cursor fixture output and three timeouts. The H4-owned `src:core` and SQLite store suites remain fully green.

## Carrier closure table

| Carrier | Closure evidence |
|---|---|
| 1. Top of fresh page | Both release and reacquire mutation proofs now perform unfiltered `list({ limit: 1 })` assertions and observe the mutated record at the top. |
| 2. Sibling duplicate | Real two-driver SQLite probe returns `target` on page one, advances it through a fresh sibling store with a low instance watermark, proves a fresh page sees the higher stamp, then proves the original cursor returns only `older`. Result: no duplicate; `record.updated + 1` places the returned record above the exclusive boundary. `RunPage` now documents this. |
| 3. `computeRunUpdated` branches | Leaf tests cover first acquisition (`record === undefined`), `instant`, `record.updated + 1`, watermark, and supplied-event branches. |
| 4. Error rename | `createRunListError` renamed atomically to `createRunOptionsError` across both stores and tests; no old references remain. |
| 5. Release throws | Both memory and database `release` implementations document their exact `STORE` throw boundaries. |
| 6. Recording recovery boundary | `RecordingSupervisorStore.list` records the new `list` recovery step; a permanent test calls it and observes exactly `[['list']]`. |

## Suites awaiting the Orchestrator

Loopback-listener execution was intentionally not attempted:

```text
tests/app/server/ApplicationServer.test.ts
```

H4 additions in that suite prove:

- bearer and human-session `GET /history`;
- safe GET without CSRF;
- `no-store`;
- unauthenticated and invalid-query refusal;
- real SQLite application-A completion followed by application-B history discovery and persisted inspection.

Acceptance command:

```text
npm run test:app:server
```

This also executes the existing listener-driven `ApplicationHandlers.test.ts` suite.

## Exact parity delta

Guides were off-limits. `npm run test:guides` reports `8 failed | 296 passed`.

Current undocumented source exports: 58.

```text
APP_HISTORY_PATH
APP_ROSTER_EVENT
APP_ROSTER_LIVE_PATH
ApplicationRosterHandlers
ApplicationRosterPumpHandler
ApplicationRun
ClientRequestHandler
ClientRoster
ClientRosterInterface
ENDED_TONE
HISTORY_CURSOR_INPUT
HISTORY_LIMIT
HISTORY_LIMIT_MAXIMUM
HistoryPage
HistoryQuery
HistoryRun
HistoryStatus
LiveStreamEventHandler
LiveStreamOptions
MemoryOperatorPointer
OperatorPointerInterface
POINTER_KEY
RUN_LIMIT
RestoreNotice
RestoreReason
RosterBroker
RosterBrokerInterface
RosterExpiryHandler
RosterManager
RosterManagerInterface
RosterSnapshotHandler
RosterViewer
RosterViewerInterface
RosterViewerOptions
RunCursor
RunListOptions
RunPage
RunRecord
StorageOperatorPointer
ViewerInterface
allowsWorkflow
compareRunRecords
computeRunUntil
computeRunUpdated
createRunIdError
createRunOptionsError
createRunRecordError
formatHistoryCursor
isApplicationRun
isHistoryStatus
isRunCursor
isRunListOptions
isRunRecord
parseHistoryCursor
parseHistoryQuery
parseRunListOptions
recordsToRunPage
resolveLiveFrameEvent
```

Method parity:

```text
Missing list:
- SupervisorStoreInterface
- MemorySupervisorStore
- DatabaseSupervisorStore

Missing history:
- ApplicationInterface

Phantom destroy:
- LiveViewerInterface

Phantom roster:
- ClientInterface
- Client
```

H4’s direct parity contribution is the four history constants, four history types, four history functions, `ApplicationInterface.history`, and the carrier-renamed `createRunOptionsError`. Remaining rows predate H4 and remain assigned to U7.

## Git status

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
 M tests/app/server/ApplicationServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/errors.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/stores/integration.test.ts
```

## Deviations

No implementation or design deviations. Verification exceptions are the intentionally deferred loopback listener suite and the unrelated provider-fixture failures in the whole `test:src` run.