# Last changes: timeout

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `53117b7`, merge base with `origin/main` `6037444`, layer L1, declared version 0.0.8, registry version 0.0.8.

## Commits since origin/main

```text
5875069 2026-08-28 Update every dependency to the published latest
9a9bae9 2026-08-28 Adopt the catalog and guide mirrors for the wave
ff07fdf 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
e09ebb1 2026-09-01 Adopt the renamed guide helpers in the parity test
6f6b729 2026-09-02 Point the README at the guide the package ships
53117b7 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md | 17 +++++++++--------
 README.md                   |  2 +-
 package.json                |  6 +++---
 src/core/Timeout.ts         |  2 +-
 src/core/constants.ts       |  2 +-
 src/core/factories.ts       |  2 +-
 src/core/helpers.ts         |  2 +-
 src/core/types.ts           | 22 +++++++++++-----------
 src/core/validators.ts      |  8 ++++----
 tests/guides.test.ts        | 22 +++++++++++-----------
 10 files changed, 43 insertions(+), 42 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index d6e9c4b..1c4cdf5 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,5 +1,5 @@
 /**
- * Largest timeout duration accepted by the package, in milliseconds.
+ * Names the largest timeout duration accepted by the package, in milliseconds.
  *
  * @example
  * ```ts
diff --git a/src/core/types.ts b/src/core/types.ts
index 6f718dd..682c54b 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,5 +1,5 @@
 /**
- * Options for constructing a timeout deadline.
+ * Represents the options for constructing a timeout deadline.
  *
  * @remarks
  * `ms` is an integer from `0` through `2_147_483_647`, inclusive. `id`
@@ -13,16 +13,16 @@
  * ```
  */
 export interface TimeoutOptions {
-	/** Trace label for the timeout; omission generates a random UUID. */
+	/** Holds the trace label for the timeout; omission generates a random UUID. */
 	readonly id?: string
-	/** Integer deadline in milliseconds, inclusive from `0` through `2_147_483_647`. */
+	/** Holds the integer deadline in milliseconds, inclusive from `0` through `2_147_483_647`. */
 	readonly ms: number
-	/** Native parent signal whose abort clears an armed timeout. */
+	/** Holds the native parent signal whose abort clears an armed timeout. */
 	readonly signal?: AbortSignal
 }
 
 /**
- * A controllable deadline exposing a native `AbortSignal` that aborts on expiry.
+ * Represents a controllable deadline exposing a native `AbortSignal` that aborts on expiry.
  *
  * @example
  * ```ts
@@ -32,22 +32,22 @@ export interface TimeoutOptions {
  * ```
  */
 export interface TimeoutInterface {
-	/** Trace label supplied at construction or generated as a random UUID. */
+	/** Holds the trace label supplied at construction or generated as a random UUID. */
 	readonly id: string
-	/** Validated integer deadline in milliseconds. */
+	/** Holds the validated integer deadline in milliseconds. */
 	readonly ms: number
-	/** Native signal that aborts once when the current deadline expires. */
+	/** Holds the native signal that aborts once when the current deadline expires. */
 	readonly signal: AbortSignal
-	/** Whether the owned signal has aborted, derived directly from that signal. */
+	/** Reports whether the owned signal has aborted, derived directly from that signal. */
 	readonly expired: boolean
 	/**
-	 * Arm or re-arm the deadline.
+	 * Arms or re-arms the deadline.
 	 *
 	 * @returns Nothing
 	 */
 	start(): void
 	/**
-	 * Cancel an armed deadline without aborting its signal and reset expiry state.
+	 * Cancels an armed deadline without aborting its signal and resets expiry state.
 	 *
 	 * @returns Nothing
 	 */
```
