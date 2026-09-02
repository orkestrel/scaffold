# Last changes: pool

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `fe2c9f1`, merge base with `origin/main` `a3555a0`, layer L2, declared version 0.0.9, registry version 0.0.9.

## Commits since origin/main

```text
e344e9f 2026-08-28 Update every dependency to the published latest
ea304d5 2026-08-28 Adopt the catalog and guide mirrors for the wave
c8fa833 2026-09-01 Apply the verified src-audit fixes
dc9e986 2026-09-01 Adopt the renamed guide helpers in the parity test
0c94a11 2026-09-02 Point the README at the guide the package ships
fe2c9f1 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md | 17 +++++++++--------
 README.md                   |  2 +-
 package.json                |  4 ++--
 src/core/Pool.ts            | 32 +++++++++++++++++++-------------
 src/core/errors.ts          | 13 +++++++------
 src/core/factories.ts       |  5 +++--
 src/core/types.ts           | 53 ++++++++++++++++++++++++++++-------------------------
 src/core/validators.ts      |  8 ++++----
 tests/guides.test.ts        | 22 +++++++++++-----------
 9 files changed, 84 insertions(+), 72 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 6b9dc82..1b006ac 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,7 +1,8 @@
 import type { PoolErrorOptions } from './types.js'
 
 /**
- * A stable, machine-readable pool failure with the original cause and structured context.
+ * Represents a stable, machine-readable pool failure with the original cause and structured
+ * context.
  *
  * @example
  * ```ts
@@ -15,13 +16,13 @@ import type { PoolErrorOptions } from './types.js'
  * ```
  */
 export class PoolError extends Error {
-	/** Stable machine-readable failure category. */
+	/** Holds the stable machine-readable failure category. */
 	readonly code
-	/** Optional structured input or aggregate-cleanup details. */
+	/** Holds optional structured input or aggregate destroy-hook failure details. */
 	readonly context
 
 	/**
-	 * Create a pool failure without coercing a hostile thrown value.
+	 * Creates a pool failure without coercing a hostile thrown value.
 	 *
 	 * @param options - Stable code plus optional cause and structured context
 	 */
@@ -47,10 +48,10 @@ export class PoolError extends Error {
 }
 
 /**
- * Test whether an unknown value is a {@link PoolError}, returning `false` for hostile proxies.
+ * Tests whether an unknown value is a {@link PoolError}, returning `false` for hostile proxies.
  *
  * @param value - The unknown boundary value
- * @returns Whether the value is a real `PoolError` instance
+ * @returns True if the value is a real `PoolError` instance; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/core/types.ts b/src/core/types.ts
index 5011e69..547988c 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,48 +1,48 @@
 import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
 
-/** Machine-readable failure codes produced by {@link PoolError}. */
+/** Names the machine-readable failure codes produced by {@link PoolError}. */
 export type PoolCode = 'invalid' | 'destroyed' | 'create' | 'cleanup'
 
-/** Structured context attached to a {@link PoolError}. */
+/** Represents the structured context attached to a {@link PoolError}. */
 export interface PoolContext {
-	/** The rejected public input, when the failure is an input-validation error. */
+	/** Holds the rejected public input, when the failure is an input-validation error. */
 	readonly value?: unknown
-	/** Distinct cleanup failures collected by `clear()` or `destroy()`. */
+	/** Holds distinct destroy-hook failures collected by `clear()` or `destroy()`. */
 	readonly failures?: readonly unknown[]
 }
 
-/** Construction options for {@link PoolError}. */
+/** Represents the construction options for {@link PoolError}. */
 export interface PoolErrorOptions {
-	/** The stable machine-readable failure category. */
+	/** Holds the stable machine-readable failure category. */
 	readonly code: PoolCode
-	/** The original thrown value, retained without unsafe string coercion. */
+	/** Holds the original thrown value, retained without unsafe string coercion. */
 	readonly cause?: unknown
-	/** Optional structured failure details. */
+	/** Holds optional structured failure details. */
 	readonly context?: PoolContext
 }
 
-/** Observable resource lifecycle events emitted by a {@link PoolInterface}. */
+/** Represents the observable resource lifecycle events emitted by a {@link PoolInterface}. */
 export type PoolEventMap = {
-	/** A created resource entered pool ownership. */
+	/** Signals that a created resource entered pool ownership. */
 	readonly create: readonly []
-	/** A token settled successfully and its exact resource became leased. */
+	/** Signals that a token settled successfully and its exact resource became leased. */
 	readonly acquire: readonly []
-	/** A released resource became immediately idle. */
+	/** Signals that a released resource became immediately idle. */
 	readonly release: readonly []
-	/** A resource cleanup hook completed or was attempted when absent. */
+	/** Signals that a resource destroy hook completed or was attempted when absent. */
 	readonly destroy: readonly []
 }
 
-/** A unique lease over one pool-owned resource record. */
+/** Represents a unique lease over one pool-owned resource record. */
 export interface PoolToken<T> {
-	/** The leased value. Duplicate values still belong to independent records. */
+	/** Holds the leased value. Duplicate values still belong to independent records. */
 	readonly value: T
-	/** Return this exact lease once; subsequent calls are no-ops. */
+	/** Gives this exact lease back once; subsequent calls are no-ops. */
 	release(): void
 }
 
 /**
- * Resource lifecycle options for {@link Pool} and `createPool`.
+ * Represents the resource lifecycle options for {@link Pool} and `createPool`.
  *
  * @remarks
  * `create` lazily produces resources. `destroy` tears down a claimed resource.
@@ -59,31 +59,34 @@ export interface PoolOptions<T> {
 	readonly max?: number
 }
 
-/** A FIFO resource pool with optional bounded capacity and deterministic teardown. */
+/** Represents a FIFO resource pool with optional bounded capacity and deterministic teardown. */
 export interface PoolInterface<T> {
-	/** The typed synchronous lifecycle observation surface. */
+	/** Holds the typed synchronous lifecycle observation surface. */
 	readonly emitter: EmitterInterface<PoolEventMap>
-	/** All owned records, including records validating or destroying. */
+	/** Counts all owned records, including records validating or destroying. */
 	readonly size: number
-	/** Records immediately available without validation work. */
+	/** Counts the records immediately available without validation work. */
 	readonly idle: number
-	/** Records represented by unsettled released-once lease tokens. */
+	/** Counts the records represented by unsettled released-once lease tokens. */
 	readonly active: number
 	/**
-	 * Queue and lease one resource in FIFO settlement order.
+	 * Queues and leases one resource in FIFO settlement order.
 	 *
 	 * @param signal - Optional native cancellation signal
 	 * @returns A promise for the unique resource lease
+	 * @throws {@link PoolError} Thrown when `signal` is present and is not a native `AbortSignal`,
+	 * with `code: 'invalid'`. This throw is synchronous rather than a rejected promise, so a caller
+	 * that handles failures with `.catch()` alone misses it.
 	 */
 	acquire(signal?: AbortSignal): Promise<PoolToken<T>>
 	/**
-	 * Destroy the records that are idle at this call's synchronous snapshot.
+	 * Destroys the records that are idle at this call's synchronous snapshot.
 	 *
 	 * @returns A promise that settles after every snapshot cleanup attempt
 	 */
 	clear(): Promise<void>
 	/**
-	 * Permanently tear down the pool and return its stable completion barrier.
+	 * Tears down the pool permanently and returns its stable completion barrier.
 	 *
 	 * @returns The exact promise shared by every destroy call
 	 */
```
