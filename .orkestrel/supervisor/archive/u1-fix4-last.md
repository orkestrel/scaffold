All four items are implemented.

### `app/core/types.ts`

```diff
diff --git a/app/core/types.ts b/app/core/types.ts
index 1d07517..b2d998f 100644
--- a/app/core/types.ts
+++ b/app/core/types.ts
@@ -197,22 +197,36 @@ export interface GapFrame {
 /** One application live-view frame, discriminated by its source. */
 export type LiveFrame = ObserveFrame | TranscriptFrame | TerminalFrame | GapFrame
 
+/**
+ * One single-consumer asynchronous view over an owned event subscription.
+ *
+ * @typeParam T - The event value yielded by the subscription
+ */
+export interface ViewerInterface<T> {
+	/**
+	 * The subscribed event stream.
+	 *
+	 * @remarks
+	 * One consumer at a time; a second concurrent `next()` rejects.
+	 */
+	readonly events: AsyncIterable<T>
+	/**
+	 * Discard retained events, settle a parked consumer as done, and release the subscription.
+	 *
+	 * @returns Nothing
+	 */
+	destroy(): void
+}
+
 /** A subscribed, event-parked view of one authorized workflow. */
-export interface LiveViewerInterface {
+export interface LiveViewerInterface extends ViewerInterface<LiveFrame> {
 	readonly workflow: string
-	readonly events: AsyncIterable<LiveFrame>
 	/** End the viewer after every already-admitted frame has been consumed. */
 	close(): void
-	/** Discard the queued frames, settle a parked consumer as done, and return the viewer's frame registration to its creator. */
-	destroy(): void
 }
 
 /** A subscribed, coalescing view of complete authorized roster snapshots. */
-export interface RosterViewerInterface {
-	readonly events: AsyncIterable<ApplicationRoster>
-	/** Discard the pending snapshot, settle a parked consumer as done, and release the viewer. */
-	destroy(): void
-}
+export interface RosterViewerInterface extends ViewerInterface<ApplicationRoster> {}
```

### `app/server/LiveViewer.ts`

```diff
diff --git a/app/server/LiveViewer.ts b/app/server/LiveViewer.ts
index 2f7c997..867a5cf 100644
--- a/app/server/LiveViewer.ts
+++ b/app/server/LiveViewer.ts
@@ -83,6 +83,9 @@ export class LiveViewer implements LiveViewerInterface {
 			this.destroy()
 			return Promise.resolve({ done: true, value: undefined })
 		}
+		if (this.#waiting !== undefined) {
+			throw new TypeError('Live viewer already has a pending read')
+		}
 		this.#waiting = Promise.withResolvers<IteratorResult<LiveFrame>>()
 		return this.#waiting.promise
 	}
```

### `app/browser/types.ts`

```diff
diff --git a/app/browser/types.ts b/app/browser/types.ts
index 8de4af0..2f0570a 100644
--- a/app/browser/types.ts
+++ b/app/browser/types.ts
@@ -428,17 +428,17 @@ export type ClientCommandHandler = (
 export type ClientAbsenceHandler = (status: number, code: string | undefined) => boolean
 
 /**
- * Read one guarded value through the owning client's generic request boundary.
+ * Send one guarded application request through the owning client's generic transport boundary.
  *
  * @typeParam T - The guarded response value
- * @param path - The shared GET route
- * @param method - The fixed read method
+ * @param path - The shared application route
+ * @param method - The HTTP method accepted by the client boundary
  * @param guard - The exact response guard
  * @returns The guarded value or typed browser boundary failure
  */
-export type ClientRosterReadHandler = <T>(
+export type ClientRequestHandler = <T>(
 	path: string,
-	method: 'GET',
+	method: 'DELETE' | 'GET' | 'POST',
 	guard: Guard<T>,
 ) => Promise<Result<T, BrowserApplicationError>>
```

### `git status --porcelain`

```text
 M app/browser/services/ClientRoster.ts
 M app/browser/types.ts
 M app/core/types.ts
 M app/server/ApplicationHandlers.ts
 M app/server/LiveViewer.ts
 M app/server/types.ts
 M tests/app/browser/services/ClientRoster.test.ts
 M tests/app/server/LiveViewer.test.ts
 M tests/app/server/SupervisorApplication.test.ts
```

### Per-item proof

1. Two-sided lifecycle counts and pause/resume roster snapshots are asserted in [SupervisorApplication.test.ts](/workspace/supervisor/tests/app/server/SupervisorApplication.test.ts:53) and [SupervisorApplication.test.ts](/workspace/supervisor/tests/app/server/SupervisorApplication.test.ts:85).

2. The shared contract and single-consumer obligation are in [types.ts](/workspace/supervisor/app/core/types.ts:200); both pump forms consume it in [ApplicationHandlers.ts](/workspace/supervisor/app/server/ApplicationHandlers.ts:291) and [server types.ts](/workspace/supervisor/app/server/types.ts:131).

3. `LiveViewer` rejects an overlapping parked read in [LiveViewer.ts](/workspace/supervisor/app/server/LiveViewer.ts:86), with both promises settling on destruction in [LiveViewer.test.ts](/workspace/supervisor/tests/app/server/LiveViewer.test.ts:73).

4. The generic seam is [ClientRequestHandler](/workspace/supervisor/app/browser/types.ts:430), with its exact method union and the roster’s explicit `GET` call in [ClientRoster.ts](/workspace/supervisor/app/browser/services/ClientRoster.ts:17).

### Exact parity set

`test:guides`: 300 passed, 4 failed as expected.

Missing exports:

```text
const APP_ROSTER_EVENT
const APP_ROSTER_LIVE_PATH
class ApplicationRosterHandlers
type ApplicationRosterPumpHandler
interface ApplicationRun
type ClientRequestHandler
class ClientRoster
interface ClientRosterInterface
type LiveStreamEventHandler
interface LiveStreamOptions
class RosterBroker
interface RosterBrokerInterface
type RosterSnapshotHandler
class RosterViewer
interface RosterViewerInterface
interface RosterViewerOptions
interface ViewerInterface
function allowsWorkflow
function isApplicationRun
function resolveLiveFrameEvent
```

Phantom guide methods:

```text
LiveViewerInterface: destroy
ClientInterface: roster
Client: roster
```

Static gates `format:check`, `lint:check`, `check`, and `build` passed. Focused server proofs passed: 2 files, 6 tests.

Deviation: the brief expected one listener for every workflow event immediately after start. The installed workflow persistence observer already owns `start`, `complete`, `fail`, `skip`, and `stop`, so their verified totals are two; `pause` and `resume` are one. All seven fall to zero after release, and deleting any application subscription fails the two-sided test.