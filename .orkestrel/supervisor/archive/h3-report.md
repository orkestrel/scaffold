# H3 report

Implemented the transactional run catalog from baseline `086573c`.

## Touched files and diffstat

- [types.ts](/workspace/supervisor/src/core/types.ts)
- [constants.ts](/workspace/supervisor/src/core/constants.ts)
- [factories.ts](/workspace/supervisor/src/core/factories.ts)
- [helpers.ts](/workspace/supervisor/src/core/helpers.ts)
- [parsers.ts](/workspace/supervisor/src/core/parsers.ts)
- [validators.ts](/workspace/supervisor/src/core/validators.ts)
- [index.ts](/workspace/supervisor/src/core/index.ts)
- [MemorySupervisorStore.ts](/workspace/supervisor/src/core/stores/MemorySupervisorStore.ts)
- [DatabaseSupervisorStore.ts](/workspace/supervisor/src/core/stores/DatabaseSupervisorStore.ts)
- [setupServer.ts](/workspace/supervisor/tests/setupServer.ts)
- [app setup.ts](/workspace/supervisor/tests/app/setup.ts)
- [helpers.test.ts](/workspace/supervisor/tests/src/core/helpers.test.ts)
- [parsers.test.ts](/workspace/supervisor/tests/src/core/parsers.test.ts)
- [validators.test.ts](/workspace/supervisor/tests/src/core/validators.test.ts)
- [DatabaseSupervisorStore.test.ts](/workspace/supervisor/tests/src/core/stores/DatabaseSupervisorStore.test.ts)
- [integration.test.ts](/workspace/supervisor/tests/src/server/stores/integration.test.ts)

Combined diffstat, including untracked files:

```text
16 files changed, 771 insertions(+), 17 deletions(-)
```

## Full `src/core/types.ts` diff

```diff
diff --git a/src/core/types.ts b/src/core/types.ts
index 8ee3bf1..97f8127 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -109,6 +109,60 @@ export interface RunSnapshot {
 	readonly units: readonly UnitSnapshot[]
 }
 
+/** One catalog entry for a supervised run. */
+export interface RunRecord {
+	/** The run id. */
+	readonly id: string
+	/** The instant the run was first acquired, preserved across every takeover. */
+	readonly created: number
+	/** The latest catalog-ordering instant. */
+	readonly updated: number
+	/** The latest release instant, absent while the run is held or was reacquired. */
+	readonly released?: number
+}
+
+/**
+ * The stable continuation boundary for a run-catalog traversal.
+ *
+ * @remarks
+ * `until` is the first page's inclusive watermark. `updated` and `id` identify that page's
+ * last record and form the exclusive descending continuation boundary. Every later page keeps
+ * the same `until`, so records changed above the watermark remain invisible to that traversal.
+ */
+export interface RunCursor {
+	readonly until: number
+	readonly updated: number
+	readonly id: string
+}
+
+/**
+ * Optional filters and continuation state for a run-catalog page.
+ *
+ * @remarks
+ * `cursor` continues one stable traversal. `limit` defaults to `RUN_LIMIT`. `prefix` matches a
+ * case-sensitive run-id prefix. `runs` restricts results to the supplied candidate ids without
+ * importing authorization policy. `released: true` selects released history records only.
+ */
+export interface RunListOptions {
+	readonly cursor?: RunCursor
+	readonly limit?: number
+	readonly prefix?: string
+	readonly runs?: readonly string[]
+	readonly released?: boolean
+}
+
+/**
+ * One owned immutable run-catalog page.
+ *
+ * @remarks
+ * `cursor` is present only when another page exists. Its `(updated, id)` pair is exclusive and
+ * its `until` watermark remains fixed for the complete traversal.
+ */
+export interface RunPage {
+	readonly runs: readonly RunRecord[]
+	readonly cursor?: RunCursor
+}
+
 /** The fields carried by every immutable observation. */
 export interface ObservationRecord {
@@ -667,6 +721,18 @@ export interface SupervisorStoreInterface {
 	 */
 	get(id: string): Promise<RunSnapshot | undefined>
+	/**
+	 * List the newest catalog records under a stable first-page watermark.
+	 *
+	 * @remarks
+	 * Records descend by `(updated, id)`. A continuation cursor keeps its original inclusive
+	 * `until` watermark and resumes strictly below its exclusive `(updated, id)` boundary.
+	 *
+	 * @param options - Optional continuation, limit, prefix, candidate, and release filters
+	 * @returns One frozen owned page and an optional exclusive continuation cursor
+	 * @throws SupervisorError `STORE` when the limit, cursor, or persisted catalog is invalid
+	 */
+	list(options?: RunListOptions): Promise<RunPage>
 	/**
 	 * Write a unit row after rechecking its lease in one transaction.
@@ -735,7 +801,7 @@ export interface BriefStoreInterface {
 	retire(id: string): Promise<Result<Brief, SupervisorError>>
 }
 
-/** The standalone supervisor and brief stores composed over one four-table database. */
+/** The standalone supervisor and brief stores composed over one five-table database. */
 export type DatabaseSupervisorPersistence = {
 	readonly supervisor: SupervisorStoreInterface
```

## `git status --porcelain`

```text
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/index.ts
 M src/core/stores/DatabaseSupervisorStore.ts
 M src/core/stores/MemorySupervisorStore.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/app/setup.ts
 M tests/setupServer.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/stores/DatabaseSupervisorStore.test.ts
 M tests/src/core/validators.test.ts
 M tests/src/server/stores/integration.test.ts
?? src/core/parsers.ts
?? tests/src/core/parsers.test.ts
```

## Acceptance evidence

1. Full shared proof matrix: [integration.test.ts](/workspace/supervisor/tests/src/server/stores/integration.test.ts:17) runs the same catalog specification against memory and real SQLite. It covers empty, one/multi-page, ties, exact order, exclusive cursors, prefix/candidates/released filters, ownership, freezing, invalid input, takeover, renew, set, and release/reacquire.

2. Default and history behavior: default limit and mixed live/released results are proved at [integration.test.ts](/workspace/supervisor/tests/src/server/stores/integration.test.ts:67) and [integration.test.ts](/workspace/supervisor/tests/src/server/stores/integration.test.ts:157).

3. Watermark law: traversal mutation and fresh-page visibility are proved at [integration.test.ts](/workspace/supervisor/tests/src/server/stores/integration.test.ts:174).

4. Transactionality: the real SQLite trigger failure at [integration.test.ts](/workspace/supervisor/tests/src/server/stores/integration.test.ts:220) proves a catalog-write failure rolls the preceding unit write back.

5. Gates:

```text
npm run format:check  PASS
npm run lint:check    PASS
npm run check         PASS, including every app project
npm run test:src:core PASS — 14 files, 174 tests
catalog integration   PASS — 1 file, 22 tests
```

`app/server/LiveBroker.ts` and `app/server/types.ts` remain untouched and compile successfully.

## Guides-parity delta

Baseline:

```text
4 failed | 300 passed
```

After H3:

```text
7 failed | 297 passed
```

Exact H3 delta:

- Existing `documents every source export` failure gained:
  `RUN_LIMIT`, `RunCursor`, `RunListOptions`, `RunPage`, `RunRecord`,
  `compareRunRecords`, `createRunPage`, `isRunCursor`, `isRunListOptions`,
  `isRunRecord`, and `parseRunListOptions`.
- Three new expected failures report missing `list` documentation for:
  `SupervisorStoreInterface`, `MemorySupervisorStore`, and `DatabaseSupervisorStore`.

## Deviation

The exact `npm run test:src` full chain remains red:

```text
20 failed | 221 passed
```

All 20 failures are outside H3 in unchanged provider-fixture suites under `ProviderExecutor`, `ClaudeProvider`, `CodexProvider`, and `CursorProvider`. Their spawned fixtures return empty streams or time out. Running unchanged `ClaudeProvider.test.ts` alone reproduces two failures. No H3 catalog test fails, and these off-limits provider files were not modified.