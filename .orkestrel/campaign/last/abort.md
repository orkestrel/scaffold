# Last changes: abort

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `968549c`, merge base with `origin/main` `1932075`, layer L1, declared version 0.0.8, registry version 0.0.8.

## Commits since origin/main

```text
02ee9ca 2026-08-28 Update every dependency to the published latest
526ed1d 2026-08-28 Adopt the catalog and guide mirrors for the wave
3d80cba 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
4bdbb7e 2026-09-01 Apply the verified src-audit fixes
46a7fb5 2026-09-01 Adopt the renamed guide helpers in the parity test
79e62a8 2026-09-02 Point the README at the guide the package ships
968549c 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md | 17 +++++++++--------
 README.md                   |  2 +-
 package.json                |  6 +++---
 src/core/Abort.ts           |  4 ++--
 src/core/factories.ts       |  4 ++--
 src/core/helpers.ts         |  4 ++--
 src/core/types.ts           | 16 +++++++++++++---
 src/core/validators.ts      |  6 +++---
 tests/guides.test.ts        | 22 +++++++++++-----------
 9 files changed, 46 insertions(+), 35 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/types.ts b/src/core/types.ts
index 79d0b31..af7182a 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,5 +1,5 @@
 /**
- * Options for `createAbort` and `Abort` construction.
+ * Represents the options for `createAbort` and `Abort` construction.
  *
  * @remarks
  * `id` labels the handle for tracing; when omitted or `undefined`, a UUID is
@@ -8,20 +8,30 @@
  */
 export interface AbortOptions {
 	readonly id?: string
-	/** A parent signal — the created abort's `signal` also fires when this aborts. */
+	/** Holds a parent signal — the created abort's `signal` also fires when this aborts. */
 	readonly signal?: AbortSignal
 }
 
 /**
- * A cancellation handle — a thin, traceable wrapper over a native
+ * Represents a cancellation handle — a thin, traceable wrapper over a native
  * `AbortController` whose `signal` can be linked to a parent signal.
  *
  * @remarks
  * The native `signal` is the complete interoperable observation surface.
  */
 export interface AbortInterface {
+	/** Holds the trace label for this handle — caller-supplied, or a generated UUID. */
 	readonly id: string
+	/** Holds the observable signal — the handle's own, or one linked to a parent signal. */
 	readonly signal: AbortSignal
+	/** Reports whether `signal` has aborted. */
 	readonly aborted: boolean
+	/**
+	 * Aborts the handle, firing `signal`. Aborting is idempotent — the first reason sticks.
+	 *
+	 * @param reason - The abort reason. A defined reason is kept verbatim (including a falsy
+	 *   `null`, `0`, `''`, or `false`); `undefined` defaults `signal.reason` to an `AbortError`
+	 *   `DOMException`.
+	 */
 	abort(reason?: unknown): void
 }
```
