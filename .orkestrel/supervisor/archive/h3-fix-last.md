## Touched files

- `src/core`: `errors.ts`, `helpers.ts`, `parsers.ts`, both supervisor stores, `types.ts`, `validators.ts`
- Tests: `tests/setupServer.ts`, core error/helper/parser tests, server store integration test

```text
 src/core/errors.ts                          | 31 +++++++++++
 src/core/helpers.ts                         | 51 ++++++++++++++++-
 src/core/parsers.ts                         |  9 ++-
 src/core/stores/DatabaseSupervisorStore.ts  | 58 +++++++++++---------
 src/core/stores/MemorySupervisorStore.ts    | 68 ++++++++++-------------
 src/core/types.ts                           | 37 +++++++++----
 src/core/validators.ts                      |  3 +-
 tests/setupServer.ts                        |  3 +-
 tests/src/core/errors.test.ts               | 19 +++++++
 tests/src/core/helpers.test.ts              | 26 ++++++++-
 tests/src/core/parsers.test.ts              |  5 +-
 tests/src/server/stores/integration.test.ts | 85 ++++++++++++++++++++++++++++-
 12 files changed, 301 insertions(+), 94 deletions(-)
```

## Full `types.ts` prose diff

```diff
diff --git a/src/core/types.ts b/src/core/types.ts
index 97f8127..7da3ba3 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -109,7 +109,14 @@ export interface RunSnapshot {
 	readonly units: readonly UnitSnapshot[]
 }
 
-/** One catalog entry for a supervised run. */
+/**
+ * One catalog entry for a supervised run.
+ *
+ * @remarks
+ * Catalog order follows the instants stamped by supervisor operations. A unit write contributes
+ * its supervisor-stamped `updated` instant, so a skewed stamp can skew order; in particular, a
+ * future-skewed stamp is not capped to local wall time.
+ */
 export interface RunRecord {
 	/** The run id. */
 	readonly id: string
@@ -122,12 +129,14 @@ export interface RunRecord {
 }
 
 /**
- * The stable continuation boundary for a run-catalog traversal.
+ * The continuation boundary for one run-catalog traversal.
  *
  * @remarks
- * `until` is the first page's inclusive watermark. `updated` and `id` identify that page's
- * last record and form the exclusive descending continuation boundary. Every later page keeps
- * the same `until`, so records changed above the watermark remain invisible to that traversal.
+ * `until` is the first page's inclusive watermark. `updated` and `id` identify that page's last
+ * record and form the exclusive descending continuation boundary. An unchanged catalog never
+ * duplicates or skips a record. A record mutated above `until` leaves the traversal and may appear
+ * at the top of the next fresh page absent a later mutation; filter membership follows its current
+ * mutable record rather than an historical version.
  */
 export interface RunCursor {
 	readonly until: number
@@ -139,9 +148,10 @@ export interface RunCursor {
  * Optional filters and continuation state for a run-catalog page.
  *
  * @remarks
- * `cursor` continues one stable traversal. `limit` defaults to `RUN_LIMIT`. `prefix` matches a
+ * `cursor` continues one traversal. `limit` defaults to `RUN_LIMIT`. `prefix` matches a
  * case-sensitive run-id prefix. `runs` restricts results to the supplied candidate ids without
- * importing authorization policy. `released: true` selects released history records only.
+ * importing authorization policy. `released: true` selects released records, `false` selects held
+ * records, and absence selects both.
  */
 export interface RunListOptions {
 	readonly cursor?: RunCursor
@@ -155,8 +165,10 @@ export interface RunListOptions {
  * One owned immutable run-catalog page.
  *
  * @remarks
- * `cursor` is present only when another page exists. Its `(updated, id)` pair is exclusive and
- * its `until` watermark remains fixed for the complete traversal.
+ * `cursor` is present only when another page exists. Its `(updated, id)` pair is exclusive and its
+ * `until` watermark remains fixed for the traversal. This guarantee covers serialized reads on one
+ * store instance. A sibling instance sharing the same database may write between pages, and such a
+ * record can surface when its ordering instant remains within the watermark.
  */
 export interface RunPage {
 	readonly runs: readonly RunRecord[]
@@ -722,11 +734,14 @@ export interface SupervisorStoreInterface {
 	 */
 	get(id: string): Promise<RunSnapshot | undefined>
 	/**
-	 * List the newest catalog records under a stable first-page watermark.
+	 * List the newest catalog records under a first-page watermark.
 	 *
 	 * @remarks
 	 * Records descend by `(updated, id)`. A continuation cursor keeps its original inclusive
-	 * `until` watermark and resumes strictly below its exclusive `(updated, id)` boundary.
+	 * `until` watermark and resumes strictly below its exclusive `(updated, id)` boundary. Across
+	 * this instance's serialized reads, an unchanged catalog never duplicates or skips a record;
+	 * mutation can move a record out of the traversal and onto a fresh first page. A sibling store
+	 * instance sharing the database may write between pages and surface a record within `until`.
 	 *
 	 * @param options - Optional continuation, limit, prefix, candidate, and release filters
 	 * @returns One frozen owned page and an optional exclusive continuation cursor
```

## Acceptance proofs

1. Honest watermark law:

   - The shared memory/SQLite matrix now proves unchanged traversal completeness, released-unseen removal from continuation plus fresh-page promotion, and reacquired-unseen removal from a `released:true` traversal.
   - Final command:

```text
./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot \
  --project src:server tests/src/server/stores/integration.test.ts

Test Files  1 passed (1)
Tests       22 passed (22)
```

2. `released:false`:

   - The initial core regression was red: `1 failed | 173 passed`.
   - It now selects only held records while composing with `prefix` and `runs`; absence still returns both and `true` returns released records.

```text
npm run test:src:core

Test Files  14 passed (14)
Tests       176 passed (176)
```

3. Empty run IDs:

   - Initial shared integration proof was red: `2 failed | 20 passed`.
   - Both stores now return the identical `STORE` failure, message `Run id must be a non-empty string`, before mutation; the catalog remains empty.
   - Final catalog matrix: `22 passed (22)`.

4. Shared catalog engine and conformance:

   - Exported leaf tests cover `computeRunUpdated` and `computeRunUntil`, including watermark retention and uncapped future-skewed stamps.
   - Both stores use shared `createRunIdError`, `createRunListError`, and `createRunRecordError`.
   - Projection chosen and recorded as `recordsToRunPage`.
   - Default limit now lives only in the projection.
   - `RecoveryStep` is restored to `intent | effect | reconcile | recover`; `list` delegates without recording.

```text
./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot \
  --project src:server tests/src/server/integration.test.ts

Test Files  1 passed (1)
Tests       6 passed (6)
```

5. Static gates:

```text
npm run format:check
All matched files use the correct format.

npm run lint:check
exit 0

npm run check
check:src:core    passed
check:src:server  passed
check:app:core    passed
check:app:browser passed
check:app:server  passed

git diff --check
exit 0
```

## Exact guides-parity delta

H3 baseline and this fix round both report:

```text
7 failed | 297 passed
```

The failure count is unchanged. Within the existing `documents every source export` failure:

- Removed: `function createRunPage`
- Added: `function computeRunUntil`, `function computeRunUpdated`, `function createRunIdError`, `function createRunListError`, `function createRunRecordError`, `function recordsToRunPage`
- Net missing-export payload change: `+5`
- The three existing missing-`list` method failures and three pre-existing phantom-method failures are unchanged.

## `git status --porcelain`

```text
 M src/core/errors.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/stores/DatabaseSupervisorStore.ts
 M src/core/stores/MemorySupervisorStore.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/setupServer.ts
 M tests/src/core/errors.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/parsers.test.ts
 M tests/src/server/stores/integration.test.ts
```

Deviations: none. No commits, pushes, installs, off-limits edits, or subagents.