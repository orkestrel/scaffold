## Touched files

- [app/browser/types.ts](/workspace/supervisor/app/browser/types.ts)
- [app/browser/controllers/RosterManager.ts](/workspace/supervisor/app/browser/controllers/RosterManager.ts)
- [app/browser/controllers/Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts)
- [app/browser/factories.ts](/workspace/supervisor/app/browser/factories.ts)
- [app/browser/index.ts](/workspace/supervisor/app/browser/index.ts)
- [tests/app/browser/controllers/RosterManager.test.ts](/workspace/supervisor/tests/app/browser/controllers/RosterManager.test.ts)
- [tests/app/browser/controllers/Operator.test.ts](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts)
- [tests/app/browser/integration/RosterManager.test.ts](/workspace/supervisor/tests/app/browser/integration/RosterManager.test.ts)
- [tests/app/browser/integration/setup.ts](/workspace/supervisor/tests/app/browser/integration/setup.ts)

Diffstat: **9 files changed, 822 insertions, 11 deletions**.

## `app/browser/types.ts` diff

```diff
@@ -473,6 +473,63 @@ export interface ClientRosterInterface {
 	watch(signal: AbortSignal): AsyncIterable<ApplicationRoster>
 }
 
+/**
+ * Receive the one session-expiry refusal produced by a roster subscription.
+ *
+ * @param failure - The typed `AUTH` refusal that ended the roster stream
+ * @returns Nothing; the composition root owns the resulting session transition
+ */
+export type RosterExpiryHandler = (failure: BrowserApplicationError) => void
+
+/**
+ * The browser's independently lived roster state.
+ *
+ * @remarks
+ * The manager retains the last complete snapshot when its stream fails, so consumers derive a
+ * partial state from `snapshot` plus `fault` instead of storing a second status label. `live`
+ * independently states whether the one owned consumption loop is attached. An `AUTH` refusal is
+ * not a roster fault: it crosses {@link RosterExpiryHandler} once so the composition root can
+ * return to login while retaining its open-workflow memory.
+ */
+export interface RosterManagerInterface {
+	/** The last complete authorized roster, or `undefined` before one arrives or after clear. */
+	readonly snapshot: ApplicationRoster | undefined
+	/** Whether the owned roster subscription is currently attached. */
+	readonly live: boolean
+	/** The last non-authentication stream failure, cleared by the next start or snapshot. */
+	readonly fault: BrowserApplicationError | undefined
+	/**
+	 * Begin or restart the roster subscription for a newly adopted session.
+	 *
+	 * @returns Nothing; consumption continues in the owned asynchronous loop
+	 */
+	start(): void
+	/**
+	 * Retry a failed roster subscription without discarding its last good snapshot.
+	 *
+	 * @returns Nothing; a manager without a roster fault remains untouched
+	 */
+	retry(): void
+	/**
+	 * Abort the current subscription while preserving its retained facts.
+	 *
+	 * @returns Nothing; the live fact clears synchronously
+	 */
+	abort(): void
+	/**
+	 * Reset the retained snapshot and fault without destroying the manager.
+	 *
+	 * @returns Nothing
+	 */
+	clear(): void
+	/**
+	 * Permanently release the current subscription and settle its consumption loop.
+	 *
+	 * @returns A promise that resolves once the owned loop has settled
+	 */
+	destroy(): Promise<void>
+}
+
@@ -657,8 +714,8 @@ export interface ClientInterface {
- * The composition root the interface injects: one session, one stack, one feed, one transport, one
- * selection.
+ * The composition root the interface injects: one session, one roster, one stack, one feed, one
+ * transport, and one selection.
@@ -686,6 +743,7 @@ export interface ClientInterface {
 export interface OperatorInterface {
 	readonly stack: StackManagerInterface
 	readonly feed: FeedManagerInterface
+	readonly roster: RosterManagerInterface
 	readonly client: ClientInterface
```

## Acceptance proof pointers

1. Real composed-server current/update proof: [RosterManager.test.ts:19](/workspace/supervisor/tests/app/browser/integration/RosterManager.test.ts:19), using [setup.ts:56](/workspace/supervisor/tests/app/browser/integration/setup.ts:56).
2. Workflow replacements do not restart roster consumption: [Operator.test.ts:187](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:187).
3. Logout aborts and clears; login restarts: same test at line 187.
4. Last-good retention, failure, and explicit retry: [RosterManager.test.ts:154](/workspace/supervisor/tests/app/browser/controllers/RosterManager.test.ts:154); graceful server loss: [line 178](/workspace/supervisor/tests/app/browser/controllers/RosterManager.test.ts:178).
5. Idempotent `AUTH` mapping: [RosterManager.test.ts:195](/workspace/supervisor/tests/app/browser/controllers/RosterManager.test.ts:195); retained Operator view: [Operator.test.ts:216](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:216).
6. Added-diff scan found no timers, polling, `Date.now`, skips, TODOs, or suppressions.
7. Gate evidence follows.

## Gates

- `format:check`, `lint:check`, `check`, `build`: **exit 0**.
  - Formatting: `All matched files use the correct format.`
  - All core/browser/server scoped typechecks completed.
  - Browser build: 129 modules.
  - Server build: 145 modules.
- Host-independent focused manager suite: **exit 0**, `1 passed`, `5 passed`.
- `test:app:browser`: **exit 1 before discovery**:
  - `listen EPERM: operation not permitted 127.0.0.1:63315`
  - `Test Files no tests`
- `test:app:browser:integration`: **exit 1 before discovery**:
  - `listen EPERM: operation not permitted 127.0.0.1`
- Full `npm test`: **exit 1** before reaching app tests:
  - `16 passed`, `4 failed`; `212 passed`, `20 failed`
  - Failures are confined to untouched `src:server` provider/executor fixture tests, showing absent fixture output, exit 64, and timeouts.

## `git status --porcelain`

```text
 M app/browser/controllers/Operator.ts
 M app/browser/factories.ts
 M app/browser/index.ts
 M app/browser/types.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/integration/setup.ts
?? app/browser/controllers/RosterManager.ts
?? tests/app/browser/controllers/RosterManager.test.ts
?? tests/app/browser/integration/RosterManager.test.ts
```

## Deviations

No U1 surface gap or implementation deviation.

The landed U1 contract forced two departures from the original design text:

- Roster snapshots retain rich run entries `{ id, status, paused, created, updated }`, not bare IDs.
- U1 had already landed the `client.roster` sub-entity and guarded generic `LiveStream`; U2 extended and consumed those surfaces instead of replacing `Client.roster()` or generalizing the stream again.