# Last changes: emitter

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `fdb2e36`, merge base with `origin/main` `d7f26d9`, layer L1, declared version 0.0.8, registry version 0.0.8.

## Commits since origin/main

```text
db1925c 2026-08-28 Update every dependency to the published latest
01f0928 2026-08-28 Adopt the catalog and guide mirrors for the wave
0ae9ae0 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
a91211b 2026-09-01 Apply the verified src-audit fixes
3f59367 2026-09-01 Adopt the renamed guide helpers in the parity test
22e4b0b 2026-09-02 Point the README at the guide the package ships
fdb2e36 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md | 17 +++++++++--------
 README.md                   |  2 +-
 package.json                |  6 +++---
 src/core/Emitter.ts         | 24 ++++++++++++------------
 src/core/factories.ts       |  6 +++---
 src/core/helpers.ts         |  2 +-
 src/core/types.ts           | 70 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++-------------
 tests/guides.test.ts        | 22 +++++++++++-----------
 8 files changed, 97 insertions(+), 52 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/types.ts b/src/core/types.ts
index d7a131b..fb771c9 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,12 +1,12 @@
-/** An event map — each event name maps to the argument tuple its listeners receive. */
+/** Maps each event name to the argument tuple its listeners receive. */
 export type EventMap = Record<string, readonly unknown[]>
 
-/** A listener for one event's argument tuple. */
+/** Represents a listener for one event's argument tuple. */
 export type EmitterHandler<TArgs extends readonly unknown[]> = (...args: TArgs) => void
 
 /**
- * The emitter's OWN listener-error handler (AGENTS §13) — invoked when a listener
- * throws during `emit`, with the caught error and the (stringified) event name.
+ * Represents the emitter's OWN listener-error handler — invoked when a listener throws during
+ * `emit`, with the caught error and the (stringified) event name.
  *
  * @remarks
  * This is machinery, NOT a domain event: a throwing listener is isolated by the
@@ -18,36 +18,80 @@ export type EmitterHandler<TArgs extends readonly unknown[]> = (...args: TArgs)
 export type EmitterErrorHandler = (error: unknown, event: string) => void
 
 /**
- * Initial event listeners for an emitter — the reserved `on` option (AGENTS §8):
- * a partial map of event name to its handler, wired at construction.
+ * Declares the initial event listeners for an emitter — the reserved `on` option: a partial map
+ * of event name to its handler, wired at construction.
  */
 export type EmitterHooks<TMap extends EventMap> = {
 	readonly [K in keyof TMap]?: EmitterHandler<TMap[K]>
 }
 
-/** Options for `createEmitter` / the `Emitter` constructor. */
+/** Configures `createEmitter` and the `Emitter` constructor. */
 export interface EmitterOptions<TMap extends EventMap> {
 	readonly on?: EmitterHooks<TMap>
 	/**
-	 * The emitter's listener-error handler (AGENTS §13) — a throw from ANY listener
-	 * during `emit` is routed here (with the error + the event name) instead of being
-	 * rethrown. Omit it and a listener throw is swallowed silently.
+	 * Holds the emitter's listener-error handler — a throw from ANY listener during `emit` is
+	 * routed here (with the error + the event name) instead of being rethrown. Omit it
+	 * and a listener throw is swallowed silently.
 	 */
 	readonly error?: EmitterErrorHandler
 }
 
 /**
- * A typed synchronous event emitter — the foundational observable primitive
- * (AGENTS §13). Entities OWN one as `#emitter` and expose `readonly emitter`;
- * they never inherit from it.
+ * Represents a typed synchronous event emitter — the foundational observable primitive.
+ * Entities OWN one as `#emitter` and expose `readonly emitter`; they never
+ * inherit from it.
  */
 export interface EmitterInterface<TMap extends EventMap> {
+	/** Reports the teardown state: true after `destroy()`; false otherwise. */
 	readonly destroyed: boolean
+	/**
+	 * Registers a listener for an event. Does nothing after `destroy()`.
+	 *
+	 * @param event - The event to listen for.
+	 * @param handler - The listener invoked with the event's argument tuple.
+	 */
 	on<K extends keyof TMap>(event: K, handler: EmitterHandler<TMap[K]>): void
+	/**
+	 * Registers a listener that removes itself after its first call. Does nothing after
+	 * `destroy()`.
+	 *
+	 * @param event - The event to listen for.
+	 * @param handler - The listener invoked with the event's argument tuple, once.
+	 */
 	once<K extends keyof TMap>(event: K, handler: EmitterHandler<TMap[K]>): void
+	/**
+	 * Removes a listener registered for an event, including one registered through `once`.
+	 *
+	 * @param event - The event to unregister from.
+	 * @param handler - The original handler passed to `on` or `once`, never a `once` wrapper.
+	 */
 	off<K extends keyof TMap>(event: K, handler: EmitterHandler<TMap[K]>): void
+	/**
+	 * Invokes an event's listeners synchronously, in registration order. Does nothing after
+	 * `destroy()`.
+	 *
+	 * @remarks
+	 * Every listener runs: a throw is isolated and routed to {@link EmitterOptions.error},
+	 * never rethrown. The listeners are snapshotted before the loop, so one registered
+	 * during this call does not run in it.
+	 *
+	 * @param event - The event to fire.
+	 * @param args - The argument tuple the event's listeners receive.
+	 */
 	emit<K extends keyof TMap>(event: K, ...args: TMap[K]): void
+	/**
+	 * Returns the live listener count.
+	 *
+	 * @param event - The event to count listeners for. Omit to count across every event.
+	 * @returns The number of registered listeners.
+	 */
 	count(event?: keyof TMap): number
+	/**
+	 * Drops registered listeners, leaving the emitter usable and `destroyed` unchanged.
+	 *
+	 * @param event - The event to clear. Omit to clear every event.
+	 */
 	clear(event?: keyof TMap): void
+	/** Tears down the emitter: drops every listener and sets `destroyed` to `true`. Idempotent. */
 	destroy(): void
 }
```
