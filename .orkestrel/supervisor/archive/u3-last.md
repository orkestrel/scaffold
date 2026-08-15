## Touched files + diffstat

- `app/browser/controllers/Operator.ts`
- `app/browser/stores/MemoryOperatorStore.ts`
- `app/browser/stores/StorageOperatorStore.ts`
- `app/browser/types.ts`
- `tests/app/browser/controllers/Operator.test.ts`
- `tests/app/browser/integration/integration.test.ts`
- `tests/app/browser/stores/MemoryOperatorStore.test.ts`
- `tests/app/browser/stores/StorageOperatorStore.test.ts`

```text
8 files changed, 326 insertions(+), 14 deletions(-)
```

## `app/browser/types.ts` diff

```diff
@@ -295,6 +295,17 @@
 export type FeedRegister = FeedEntry['register']

+/** Why an authenticated reload fell back from its remembered run to the run rail. */
+export type RestoreReason = 'gone' | 'refused'
+
+/** One transient explanation for a remembered run that could not be restored. */
+export interface RestoreNotice {
+	/** The workflow id the browser attempted to restore. */
+	readonly workflow: string
+	/** Whether the server reported no durable run or refused the restore for another reason. */
+	readonly reason: RestoreReason
+}
+
@@ -801,6 +812,15 @@ export interface OperatorInterface {
 	readonly ended: boolean
 	/** The last unrecovered failure the interface is showing, cleared by the next success. */
 	readonly fault: BrowserApplicationError | undefined
+	/**
+	 * Consume the pending reload fallback explanation, if one has not already been read.
+	 *
+	 * @returns The one pending notice, or `undefined` when none remains
+	 * @remarks
+	 * A successful authenticated restore leaves no notice. A refused restore leaves exactly one so
+	 * the shell can copy it into its own rendered status and a later render cannot repeat it.
+	 */
+	consume(): RestoreNotice | undefined
@@ -808,8 +828,9 @@
-	 * transport's token, so an identified reader can issue commands immediately. Called once as the
-	 * interface starts, before anything decides which view to render.
+	 * transport's token, then restores the store's last-open workflow through
+	 * {@link OperatorInterface.open}. Called once as the interface starts, before anything decides
+	 * which view to render.
@@ -820,7 +841,8 @@
-	 * any previous session, so the credential the interface holds is always the one just proven.
+	 * any previous session and re-opens the retained workflow or reload pointer, so the credential
+	 * the interface holds is always the one just proven.
@@ -905,6 +927,25 @@ export interface OperatorStoreInterface {
+	/**
+	 * Load the workflow id most recently opened through this store.
+	 *
+	 * @returns The remembered workflow id, or `undefined` when no resume pointer is retained
+	 */
+	load?(): Promise<string | undefined>
+	/**
+	 * Save the workflow id most recently opened through this store.
+	 *
+	 * @param workflow - The opened workflow id
+	 * @returns Nothing after the pointer is stored or optional persistence declines it
+	 */
+	save?(workflow: string): Promise<void>
+	/**
+	 * Remove the retained resume pointer without removing an addressed view.
+	 *
+	 * @returns Nothing after the pointer is absent
+	 */
+	remove?(): Promise<void>
```

## `git status --porcelain`

```text
 M app/browser/controllers/Operator.ts
 M app/browser/stores/MemoryOperatorStore.ts
 M app/browser/stores/StorageOperatorStore.ts
 M app/browser/types.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/integration/integration.test.ts
 M tests/app/browser/stores/MemoryOperatorStore.test.ts
 M tests/app/browser/stores/StorageOperatorStore.test.ts
```

## Per-criterion proof pointers

1. Reload restores the ordinary inspect/tail/watch path, selection, and feed: [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:153), [integration.test.ts](/workspace/supervisor/tests/app/browser/integration/integration.test.ts:95).
2. Gone/refused restore clears the pointer and exposes one consumable reason: [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:336), [Operator.test.ts](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:328), [integration.test.ts](/workspace/supervisor/tests/app/browser/integration/integration.test.ts:140).
3. Logout clears pointer; subsequent login remains on the rail: [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:193), [Operator.test.ts](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:356), [integration.test.ts](/workspace/supervisor/tests/app/browser/integration/integration.test.ts:109).
4. AUTH expiry retains the pointer, including page reload before re-login: [Operator.test.ts](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:249), [integration.test.ts](/workspace/supervisor/tests/app/browser/integration/integration.test.ts:167).
5. Storage and memory pointer round-trips: [StorageOperatorStore.test.ts](/workspace/supervisor/tests/app/browser/stores/StorageOperatorStore.test.ts:32), [MemoryOperatorStore.test.ts](/workspace/supervisor/tests/app/browser/stores/MemoryOperatorStore.test.ts:22).
6. No polling/timers added. `lint:check`, `format:check`, full `check`, and both app builds passed. Browser execution was unavailable in this sandbox because Vitest could not bind `127.0.0.1` (`EPERM`); the Orchestrator’s acceptance run owns browser/integration execution.

Baseline facts verified: the store previously persisted per-workflow `View` values containing `id`, optional `selection`, and `collapsed`; successful `identify()` set the session, cleared its fault, started the roster, then returned without selecting a view.

Persistence shape: raw last-open workflow id at the singleton `VIEW_PREFIX` key, alongside unchanged per-workflow `View` records at `${VIEW_PREFIX}${id}`.

Deviations: none.