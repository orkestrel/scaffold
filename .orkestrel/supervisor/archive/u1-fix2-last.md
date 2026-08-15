All nine fix-round items are complete.

### Touched files and diffstat

28 files changed: 381 insertions, 160 deletions. This includes the untracked 59-line `ApplicationRosterHandlers.ts`.

```text
app/browser/helpers.ts
app/browser/seeders.ts
app/browser/services/Client.ts
app/browser/services/ClientRoster.ts
app/browser/types.ts
app/browser/validators.ts
app/core/helpers.ts
app/core/types.ts
app/server/ApplicationHandlers.ts
app/server/ApplicationRosterHandlers.ts
app/server/ApplicationRoutes.ts
app/server/RosterBroker.ts
app/server/RosterViewer.ts
app/server/SupervisorApplication.ts
app/server/index.ts
app/server/types.ts
tests/app/browser/ApplicationView.test.ts
tests/app/browser/components/CommandBar.test.ts
tests/app/browser/services/ClientRoster.test.ts
tests/app/browser/services/LiveStream.test.ts
tests/app/browser/validators.test.ts
tests/app/core/helpers.test.ts
tests/app/server/ApplicationHandlers.test.ts
tests/app/server/ApplicationServer.test.ts
tests/app/server/RosterBroker.test.ts
tests/app/server/RosterViewer.test.ts
tests/app/server/SupervisorApplication.test.ts
tests/setupBrowser.ts
```

### Required type diffs

```diff
diff --git a/app/core/types.ts b/app/core/types.ts
index 7a5c26b..1d07517 100644
--- a/app/core/types.ts
+++ b/app/core/types.ts
@@ -6,7 +6,7 @@ import type {
 	ProviderStreamOptions,
 } from '@orkestrel/agent'
 import type { PromptType, PromptValue } from '@orkestrel/terminal'
-import type { WorkflowDefinition, WorkflowSnapshot } from '@orkestrel/workflow'
+import type { WorkflowDefinition, WorkflowSnapshot, WorkflowStatus } from '@orkestrel/workflow'
 import type { Observation, UnitSnapshot } from '@src/core'
 import type { ApplicationError } from './errors.js'
 
@@ -100,9 +100,9 @@ export interface Executor {
 /** One live workflow projected for roster discovery without another inspection request. */
 export interface ApplicationRun {
 	readonly id: string
-	readonly status: WorkflowSnapshot['status']
+	readonly status: WorkflowStatus
 	readonly paused: boolean
-	readonly started: number
+	readonly created: number
 	readonly updated: number
 }
 
@@ -210,8 +210,6 @@ export interface LiveViewerInterface {
 /** A subscribed, coalescing view of complete authorized roster snapshots. */
 export interface RosterViewerInterface {
 	readonly events: AsyncIterable<ApplicationRoster>
-	/** End the viewer after its already-admitted snapshot has been consumed. */
-	close(): void
 	/** Discard the pending snapshot, settle a parked consumer as done, and release the viewer. */
 	destroy(): void
 }
diff --git a/app/server/types.ts b/app/server/types.ts
index 003a9f5..dbedfe4 100644
--- a/app/server/types.ts
+++ b/app/server/types.ts
@@ -31,7 +31,7 @@ import type {
 	PromptValue,
 	Ticket,
 } from '@orkestrel/terminal'
-import type { ConnectionInfo, ServerStatus } from '@orkestrel/server'
+import type { ConnectionInfo, ServerStatus, StreamInterface } from '@orkestrel/server'
 import type {
 	ClientInfo,
 	SessionControlInterface,
@@ -118,6 +118,22 @@ export interface ApplicationHandlersOptions {
 	readonly policy: ApplicationPolicy
 }
 
+/**
+ * Pump one roster viewer through an opened response stream.
+ *
+ * @param viewer - The grant-filtered roster viewer
+ * @param stream - The opened response stream
+ * @param signal - The request cancellation signal
+ * @param event - The fixed roster event name
+ * @returns Completion after the viewer and stream have been released
+ */
+export type ApplicationRosterPumpHandler = (
+	viewer: RosterViewerInterface,
+	stream: StreamInterface,
+	signal: AbortSignal,
+	event: string,
+) => Promise<void>
+
 /** Request-owned context shared by middleware and route handlers. */
 export interface ApplicationState {
 	readonly connection?: ConnectionInfo
@@ -431,21 +447,39 @@ export type LiveFrameHandler = (frame: LiveFrame) => void
  * @param roster - The complete application roster offered for grant filtering
  * @returns Nothing
  */
-export type RosterFrameHandler = (roster: ApplicationRoster) => void
+export type RosterSnapshotHandler = (roster: ApplicationRoster) => void
 
 /** Construction collaborators for one grant-filtered roster viewer. */
 export interface RosterViewerOptions {
 	readonly grants: readonly string[]
 	readonly roster: ApplicationRoster
-	readonly attach: (viewer: RosterViewerInterface, offer: RosterFrameHandler) => void
+	readonly attach: (viewer: RosterViewerInterface, offer: RosterSnapshotHandler) => void
 	readonly release: (viewer: RosterViewerInterface) => void
 }
 
 /** Complete-state roster fan-out with one pending snapshot per viewer. */
 export interface RosterBrokerInterface {
+	/** The number of currently attached roster viewers. */
 	readonly count: number
+	/**
+	 * Open one complete roster view filtered by copied workflow grants.
+	 *
+	 * @param grants - Exact workflow ids or the wildcard grant
+	 * @returns The attached coalescing viewer
+	 */
 	watch(grants: readonly string[]): RosterViewerInterface
+	/**
+	 * Offer one complete process roster to every attached viewer.
+	 *
+	 * @param roster - The latest complete application roster
+	 * @returns Nothing
+	 */
 	publish(roster: ApplicationRoster): void
+	/**
+	 * Release every attached roster viewer.
+	 *
+	 * @returns Nothing
+	 */
 	destroy(): void
 }
```

### `git status --porcelain`

```text
 M app/browser/helpers.ts
 M app/browser/seeders.ts
 M app/browser/services/Client.ts
 M app/browser/services/ClientRoster.ts
 M app/browser/types.ts
 M app/browser/validators.ts
 M app/core/helpers.ts
 M app/core/types.ts
 M app/server/ApplicationHandlers.ts
 M app/server/ApplicationRoutes.ts
 M app/server/RosterBroker.ts
 M app/server/RosterViewer.ts
 M app/server/SupervisorApplication.ts
 M app/server/index.ts
 M app/server/types.ts
 M tests/app/browser/ApplicationView.test.ts
 M tests/app/browser/components/CommandBar.test.ts
 M tests/app/browser/services/ClientRoster.test.ts
 M tests/app/browser/services/LiveStream.test.ts
 M tests/app/browser/validators.test.ts
 M tests/app/core/helpers.test.ts
 M tests/app/server/ApplicationHandlers.test.ts
 M tests/app/server/ApplicationServer.test.ts
 M tests/app/server/RosterBroker.test.ts
 M tests/app/server/RosterViewer.test.ts
 M tests/app/server/SupervisorApplication.test.ts
 M tests/setupBrowser.ts
?? app/server/ApplicationRosterHandlers.ts
```

### Per-item proof

1. Lifecycle events attach and detach symmetrically in [SupervisorApplication.ts](/workspace/supervisor/app/server/SupervisorApplication.ts:339); the one-run `[] → pending → running` wire proof is in [ApplicationServer.test.ts](/workspace/supervisor/tests/app/server/ApplicationServer.test.ts:235).

2. The shared predicate is [allowsWorkflow](/workspace/supervisor/app/core/helpers.ts:14), used by both projections, with allowed and denied named-grant divergence proofs in [SupervisorApplication.test.ts](/workspace/supervisor/tests/app/server/SupervisorApplication.test.ts:77).

3. Concurrent reads are explicitly refused in [RosterViewer.ts](/workspace/supervisor/app/server/RosterViewer.ts:50); both-promise settlement and real-server parked-reader cleanup are proven in [RosterViewer.test.ts](/workspace/supervisor/tests/app/server/RosterViewer.test.ts:8) and [ApplicationHandlers.test.ts](/workspace/supervisor/tests/app/server/ApplicationHandlers.test.ts:200).

4. Renames, ecosystem status, `created`, and completed TSDoc are centralized in [core types](/workspace/supervisor/app/core/types.ts:100), [server types](/workspace/supervisor/app/server/types.ts:121), and [browser types](/workspace/supervisor/app/browser/types.ts:430); nested roster handlers and corrected route order are in [ApplicationRosterHandlers.ts](/workspace/supervisor/app/server/ApplicationRosterHandlers.ts:16) and [ApplicationRoutes.ts](/workspace/supervisor/app/server/ApplicationRoutes.ts:5).

5. `RosterViewer.close()` is removed from the contract and implementation; destruction is the sole termination path in [RosterViewer.ts](/workspace/supervisor/app/server/RosterViewer.ts:29).

6. `ClientRoster.read()` now owns its path and guard in [ClientRoster.ts](/workspace/supervisor/app/browser/services/ClientRoster.ts:17), receiving the generic request seam directly from [Client.ts](/workspace/supervisor/app/browser/services/Client.ts:51).

7. `#pump` receives an explicit event name or resolver in [ApplicationHandlers.ts](/workspace/supervisor/app/server/ApplicationHandlers.ts:290); the shared resolver is in [core helpers](/workspace/supervisor/app/core/helpers.ts:18).

8. The real-server unauthenticated `/roster/live` 401 JSON refusal proof is in [ApplicationServer.test.ts](/workspace/supervisor/tests/app/server/ApplicationServer.test.ts:203).

9. The silent-server timeout explanation is recorded beside the drain loop in [ApplicationServer.test.ts](/workspace/supervisor/tests/app/server/ApplicationServer.test.ts:320).

### Item 3 ruling

Refuse concurrent reads: async-iterator consumers are serial by contract here, so rejecting a second parked read exposes misuse immediately without retaining or orphaning another waiter.

### Gates

- `lint`, `format`, `format:check`, `lint:check`, `check`, and `build`: passed.
- `test:app:core`: 4 files, 79 tests passed.
- Focused `app:server`: 4 files, 5 tests passed.
- `test:policy`: 1 file, 17 tests passed.
- `test:guides`: expected guide-parity red only—301 passed, 3 failed. Missing exports are `APP_ROSTER_EVENT`, `APP_ROSTER_LIVE_PATH`, `ApplicationRosterHandlers`, `ApplicationRosterPumpHandler`, `ApplicationRun`, `ClientRoster`, `ClientRosterInterface`, `ClientRosterReadHandler`, `LiveStreamEventHandler`, `LiveStreamOptions`, `RosterBroker`, `RosterBrokerInterface`, `RosterSnapshotHandler`, `RosterViewer`, `RosterViewerInterface`, `RosterViewerOptions`, `allowsWorkflow`, `isApplicationRun`, and `resolveLiveFrameEvent`; the other two failures are the existing phantom `roster` method rows for `ClientInterface` and `Client`.
- `git diff --check`: passed.
- Loopback-dependent full app-server, browser, and complete chains remain reserved for Orchestrator acceptance as specified.

Deviations: none.