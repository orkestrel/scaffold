## Touched files + diffstat

```text
app/browser/controllers/HistoryManager.ts                 +140
app/browser/controllers/Operator.ts                       +31  -1
app/browser/index.ts                                      +2
app/browser/seeders.ts                                    +7   -3
app/browser/services/Client.ts                            +14  -4
app/browser/services/ClientHistory.ts                     +43
app/browser/types.ts                                      +87  -1
app/server/ApplicationHandlers.ts                         +1   -1
tests/app/browser/controllers/HistoryManager.test.ts      +173
tests/app/browser/controllers/Operator.test.ts            +104 -16
tests/app/browser/services/Client.test.ts                  +4
tests/app/browser/services/ClientHistory.test.ts           +44
tests/app/server/ApplicationHandlers.test.ts              +38
tests/setupBrowser.ts                                     +73  -5

14 files changed, 761 insertions(+), 31 deletions(-)
```

## Full `app/browser/types.ts` diff

```diff
diff --git a/app/browser/types.ts b/app/browser/types.ts
index ef09609..be04ea9 100644
--- a/app/browser/types.ts
+++ b/app/browser/types.ts
@@ -8,6 +8,8 @@ import type {
 } from '@orkestrel/workflow'
 import type {
 	ApplicationCommandStatus,
+	HistoryPage,
+	HistoryRun,
 	ApplicationRoster,
 	ApplicationRun,
 	ApplicationSession,
@@ -414,6 +416,24 @@ export interface FeedManagerInterface {
 	clear(): void
 }
 
+/** Query values sent unchanged through the browser's completed-history transport. */
+export interface HistoryOptions {
+	/** Maximum completed runs requested from the server. */
+	readonly limit: number
+	/** Opaque continuation token returned by the preceding page. */
+	readonly cursor?: string
+	/** Optional case-sensitive run-id prefix. */
+	readonly prefix?: string
+}
+
+/** The durable run tail and the server's fact that it has reached its terminal end. */
+export interface ClientTail {
+	/** Durable observation frames in replay order. */
+	readonly frames: readonly ObserveFrame[]
+	/** Whether the persisted workflow snapshot was terminal when the tail was read. */
+	readonly terminal: boolean
+}
+
 /**
  * Send one application command and require its shared acknowledgement status.
  *
@@ -485,6 +505,68 @@ export interface ClientRosterInterface {
 	watch(signal: AbortSignal): AsyncIterable<ApplicationRoster>
 }
 
+/** Completed-history transport grouped beneath the browser client. */
+export interface ClientHistoryInterface {
+	/**
+	 * Read one completed-history page.
+	 *
+	 * @param options - Wire query values, including an opaque cursor when continuing
+	 * @returns The guarded completed-run page or typed browser boundary failure
+	 */
+	read(options: HistoryOptions): Promise<Result<HistoryPage, BrowserApplicationError>>
+}
+
+/** The five rendered conditions derived from completed-history facts. */
+export type HistoryState = 'empty' | 'error' | 'ideal' | 'loading' | 'partial'
+
+/**
+ * The browser's loaded completed-history pages and explicit commands.
+ *
+ * @remarks
+ * The manager retains rows after a continuation failure and derives `partial` from those rows plus
+ * `fault`. A first-page failure has no rows and therefore derives `error`. Cursor presence alone
+ * admits continuation; row count never participates. The roster baseline captured with a successful
+ * first page and the roster's current snapshot derive `changed`, so roster activity never mutates
+ * loaded history.
+ */
+export interface HistoryManagerInterface {
+	/** Loaded completed runs in server page order. */
+	readonly runs: readonly HistoryRun[]
+	/** Opaque continuation token, or `undefined` when the server reported no older page. */
+	readonly cursor: string | undefined
+	/** Active case-sensitive run-id prefix. */
+	readonly prefix: string | undefined
+	/** Whether one first-page or continuation read is in flight. */
+	readonly loading: boolean
+	/** The five-way surface state derived from the retained facts. */
+	readonly state: HistoryState
+	/** Whether the live roster has transitioned since the successful first-page read. */
+	readonly changed: boolean
+	/** Last page refusal, retained beside rows after a continuation failure. */
+	readonly fault: BrowserApplicationError | undefined
+	/**
+	 * Load a fresh first page and replace the active prefix.
+	 *
+	 * @param prefix - Optional case-sensitive run-id prefix; omission clears the filter
+	 * @returns Nothing; refusals are retained in {@link HistoryManagerInterface.fault}
+	 */
+	load(prefix?: string): Promise<void>
+	/**
+	 * Load the next page only while the server supplied a cursor.
+	 *
+	 * @returns Nothing; a missing cursor or an in-flight read is a no-op
+	 */
+	older(): Promise<void>
+	/**
+	 * Retry the failed first page or continuation without changing its query.
+	 *
+	 * @returns Nothing; a manager without a fault or with a read in flight is untouched
+	 */
+	retry(): Promise<void>
+	/** Reset every session-lived history fact and invalidate an outstanding read. */
+	clear(): void
+}
+
 /**
  * Receive the one session-expiry refusal produced by a roster subscription.
  *
@@ -642,6 +724,7 @@ export interface ClientUnitManagerInterface {
  * ```
  */
 export interface ClientInterface {
+	readonly history: ClientHistoryInterface
 	readonly roster: ClientRosterInterface
 	readonly units: ClientUnitManagerInterface
 	/**
@@ -727,7 +810,7 @@ export interface ClientInterface {
 	 * @param workflow - The authorized workflow id
 	 * @returns The retained observation frames, oldest first
 	 */
-	tail(workflow: string): Promise<Result<readonly ObserveFrame[], BrowserApplicationError>>
+	tail(workflow: string): Promise<Result<ClientTail, BrowserApplicationError>>
 	/**
 	 * Release the session-bound token held for this page.
 	 *
@@ -769,6 +852,7 @@ export interface ClientInterface {
 export interface OperatorInterface {
 	readonly stack: StackManagerInterface
 	readonly feed: FeedManagerInterface
+	readonly history: HistoryManagerInterface
 	readonly roster: RosterManagerInterface
 	readonly client: ClientInterface
 	/**
@@ -798,6 +882,8 @@ export interface OperatorInterface {
 	readonly selection: string | undefined
 	/** Whether a live subscription is currently attached. */
 	readonly live: boolean
+	/** Whether the durable tail was complete when the open run was loaded. */
+	readonly terminal: boolean
 	/**
 	 * Whether the open workflow's durable state is gone while its last read rows remain.
```

## Per-criterion proofs

1. Client history transport

- `ClientHistory.test.ts` proves exact `limit`/`cursor`/`prefix` names and opaque cursor round-trip.
- `Client.test.ts` proves history refusals use the established client fault path.
- The response guard requires exact completed-run fields, terminal status, and optional non-empty cursor.
- `npm run check` passed, including both browser and server scoped projects.
- Runtime browser proof is awaiting a listener-capable host:

```text
npm run test:app:browser
Error: listen EPERM: operation not permitted 127.0.0.1:63315
Test Files  no tests
Tests       no tests
```

2. History manager

`HistoryManager.test.ts` covers:

- all five derived states;
- short page with cursor continuing;
- full page without cursor ending;
- prefix submission and clearing resetting rows/cursor;
- first-page and continuation retry behavior;
- roster-change derivation without row mutation;
- session clear.

The manager uses `APP_HISTORY_COUNT`, never page fullness, and invalidates stale reads by generation.

3. Operator and terminal carrier

- `Operator.test.ts` proves adoption/login/logout clearing, the reactive manager seam, and `AUTH` propagation.
- It also proves `terminal: true` reaches `operator.terminal`, replays frames, and prevents a live subscription.
- `ApplicationHandlers.test.ts` proves the granted wire shape `{ tail, terminal }`.
- Server execution reached 153 passing tests, but the new proof stopped at the sandbox listener boundary:

```text
npm run test:app:server
Test Files  7 failed | 15 passed
Tests       62 failed | 153 passed
Error: listen EPERM: operation not permitted 127.0.0.1
```

4. Static and listener-free gates

```text
npm run format:check
All matched files use the correct format.

npm run lint:check
exit 0

npm run check
exit 0
check:src:core, check:src:server,
check:app:core, check:app:browser, check:app:server all passed

npm run build
exit 0
src core/server and app browser/server builds passed

npm run test:app:core
4 files passed; 100 tests passed

npm run test:src:core
14 files passed; 178 tests passed

npm run test:policy
1 file passed; 17 tests passed
```

`npm run test:src` reached 231 passing tests but had 20 unrelated provider-fixture failures/timeouts; fixture subprocesses returned exit code 64 in this sandbox.

## Parity delta

`npm run test:guides` reported 296 passed and 8 failed. H5 adds exactly these seven undocumented exports:

```text
ClientHistory
ClientHistoryInterface
ClientTail
HistoryManager
HistoryManagerInterface
HistoryOptions
HistoryState
```

The guide must also document:

- `ClientInterface.history`;
- `ClientInterface.tail` returning frames plus terminal completion;
- `HistoryManagerInterface` surface and `load`/`older`/`retry`/`clear`;
- `OperatorInterface.history`;
- `OperatorInterface.terminal`.

The parity run also reports 68 pre-existing missing exports plus the existing store/application/phantom-method rows from H3/H4/U work. Guides remained off-limits.

## Suites awaiting the Orchestrator

```text
npm run test:app:browser
npm run test:app:browser:integration
npm run test:app:server
npm run test:src
```

The first three require loopback listeners. `test:src` requires the provider fixture subprocess environment unavailable here. `npm run test:guides` awaits the documented U7 parity update.

## `git status --porcelain`

```text
 M app/browser/controllers/Operator.ts
 M app/browser/index.ts
 M app/browser/seeders.ts
 M app/browser/services/Client.ts
 M app/browser/types.ts
 M app/server/ApplicationHandlers.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/services/Client.test.ts
 M tests/app/server/ApplicationHandlers.test.ts
 M tests/setupBrowser.ts
?? app/browser/controllers/HistoryManager.ts
?? app/browser/services/ClientHistory.ts
?? tests/app/browser/controllers/HistoryManager.test.ts
?? tests/app/browser/services/ClientHistory.test.ts
```

## Deviations

None after the explicit grant and correction. `app/server/types.ts` was not changed. `app/browser/index.ts` and `seeders.ts` were updated as required barrel and `ClientInterface` consumers.