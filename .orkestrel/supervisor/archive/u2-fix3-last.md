Diffs:

```diff
diff --git a/app/browser/types.ts b/app/browser/types.ts
@@
 	ApplicationCommandStatus,
 	ApplicationRoster,
+	ApplicationRun,
@@
 export interface RosterManagerInterface {
 	readonly snapshot: ApplicationRoster | undefined
+	/**
+	 * Runs absent from the latest snapshot, carrying their last-seen state newest departure first.
+	 *
+	 * @remarks
+	 * A newly adopted session and {@link RosterManagerInterface.clear} reset this memory. Retry and
+	 * abort preserve it, while an id that reappears in a later snapshot leaves the collection.
+	 */
+	readonly departed: readonly ApplicationRun[]
 	readonly live: boolean
-	/** The last non-authentication stream failure, cleared by the next start or snapshot. */
+	/** The last non-authentication stream failure, cleared by the next start, retry, snapshot, or clear. */
 	readonly fault: BrowserApplicationError | undefined
```

```diff
diff --git a/app/browser/controllers/RosterManager.ts b/app/browser/controllers/RosterManager.ts
@@
-import type { ApplicationRoster } from '@app/core'
+import type { ApplicationRoster, ApplicationRun } from '@app/core'
@@
 	readonly #snapshot = shallowRef<ApplicationRoster | undefined>(undefined)
+	readonly #departed = shallowRef<readonly ApplicationRun[]>(Object.freeze([]))
 	readonly #live = ref(false)
 	readonly #fault = shallowRef<BrowserApplicationError | undefined>(undefined)
 	#controller: AbortController | undefined
 	#task: Promise<void> | undefined
+	#destroying: Promise<void> | undefined
@@
+	get departed(): readonly ApplicationRun[] {
+		return this.#departed.value
+	}
+
@@
 	clear(): void {
 		this.#snapshot.value = undefined
+		this.#departed.value = Object.freeze([])
 		this.#fault.value = undefined
 	}
 
-	async destroy(): Promise<void> {
-		if (!this.#destroyed) {
-			this.#destroyed = true
-			this.abort()
-			this.clear()
-		}
+	destroy(): Promise<void> {
+		const destroying = this.#destroying
+		if (destroying !== undefined) return destroying
+		this.#destroyed = true
+		this.abort()
+		this.clear()
 		const task = this.#task
 		this.#task = undefined
-		if (task !== undefined) await task
+		this.#destroying = task ?? Promise.resolve()
+		return this.#destroying
 	}
@@
-		if (session) this.#expired = false
+		if (session) {
+			this.#expired = false
+			this.#snapshot.value = undefined
+			this.#departed.value = Object.freeze([])
+		}
@@
-				this.#snapshot.value = freezeDeep(structuredClone(snapshot))
-				this.#fault.value = undefined
+				this.#retain(snapshot)
@@
+	#retain(snapshot: ApplicationRoster): void {
+		const retained = freezeDeep(structuredClone(snapshot))
+		const active = new Set(retained.runs.map((run) => run.id))
+		const previous = this.#snapshot.value
+		const departed =
+			previous === undefined ? [] : previous.runs.filter((run) => !active.has(run.id))
+		this.#departed.value = freezeDeep([
+			...departed,
+			...this.#departed.value.filter((run) => !active.has(run.id)),
+		])
+		this.#snapshot.value = retained
+		this.#fault.value = undefined
+	}
+
@@
-		this.#fault.value = undefined
 		if (this.#expired) return
```

`git status --porcelain`:

```text
 M app/browser/controllers/RosterManager.ts
 M app/browser/factories.ts
 M app/browser/types.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/controllers/RosterManager.test.ts
 M tests/setupBrowser.ts
```

Per-item proof pointers:

1. `createRosterManager` was deleted from [factories.ts](/workspace/supervisor/app/browser/factories.ts:22); tests construct `RosterManager` directly at [RosterManager.test.ts:60](/workspace/supervisor/tests/app/browser/controllers/RosterManager.test.ts:60).
2. `departed` contract: [types.ts:495](/workspace/supervisor/app/browser/types.ts:495); reconciliation: [RosterManager.ts:121](/workspace/supervisor/app/browser/controllers/RosterManager.ts:121); ordering/re-entry and reset-door proofs: [RosterManager.test.ts:81](/workspace/supervisor/tests/app/browser/controllers/RosterManager.test.ts:81) and [RosterManager.test.ts:105](/workspace/supervisor/tests/app/browser/controllers/RosterManager.test.ts:105).
3. Session adoption clears roster memory in [RosterManager.ts:82](/workspace/supervisor/app/browser/controllers/RosterManager.ts:82); reader-A expiry/read­er-B failure proof: [Operator.test.ts:188](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:188).
4. Corrected `fault` TSDoc: [types.ts:508](/workspace/supervisor/app/browser/types.ts:508).
5. Shared wait and roster fixtures: [setupBrowser.ts:75](/workspace/supervisor/tests/setupBrowser.ts:75), [setupBrowser.ts:389](/workspace/supervisor/tests/setupBrowser.ts:389), and [setupBrowser.ts:549](/workspace/supervisor/tests/setupBrowser.ts:549). Local duplicate helpers, fixture, proxy, and duplicate setup import were removed.
6. Non-`AUTH` zero-expiry proof: [RosterManager.test.ts:141](/workspace/supervisor/tests/app/browser/controllers/RosterManager.test.ts:141); synchronous throw: [RosterManager.test.ts:199](/workspace/supervisor/tests/app/browser/controllers/RosterManager.test.ts:199); concurrent joined destroy: [RosterManager.test.ts:216](/workspace/supervisor/tests/app/browser/controllers/RosterManager.test.ts:216); distinct same-session `AUTH` outcomes with one crossing: [Operator.test.ts:215](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:215).
7. The unreachable `AUTH`-path fault assignment was deleted at [RosterManager.ts:135](/workspace/supervisor/app/browser/controllers/RosterManager.ts:135). Every reachable entry has already cleared `fault`; a non-`AUTH` fault terminates that loop.

Static gates passed: `format:check`, `lint:check`, `check`, and `build`.

Expected guide parity red: 23 undocumented declarations:

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
type RosterExpiryHandler
class RosterManager
interface RosterManagerInterface
type RosterSnapshotHandler
class RosterViewer
interface RosterViewerInterface
interface RosterViewerOptions
interface ViewerInterface
function allowsWorkflow
function isApplicationRun
function resolveLiveFrameEvent
```

The three expected phantom method rows remain `LiveViewerInterface.destroy`, `ClientInterface.roster`, and `Client.roster`. Guide result: 300 passed, 4 expected failures.

Deviations: none.