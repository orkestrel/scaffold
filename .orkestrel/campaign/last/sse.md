# Last changes: sse

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `b639721`, merge base with `origin/main` `5583c49`, layer L0, declared version 0.0.5, registry version 0.0.5.

## Commits since origin/main

```text
fa79aaf 2026-08-28 Update every dependency to the published latest
afcfad9 2026-08-28 Adopt the catalog and guide mirrors for the wave
f0a4b5c 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
f290058 2026-09-01 Apply the verified src-audit fixes
098e309 2026-09-01 Adopt the renamed guide helpers in the parity test
c6d84e1 2026-09-02 Apply the breaking rows in sse
9b183c2 2026-09-02 Point the README at the guide the package ships
b639721 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md      | 17 +++++++++--------
 README.md                        |  6 +++---
 package.json                     |  6 +++---
 src/core/SSEParser.ts            | 24 ++++++++++++------------
 src/core/constants.ts            |  6 +++---
 src/core/errors.ts               | 32 +++++++++++++++++++++++++++-----
 src/core/factories.ts            |  6 +++---
 src/core/types.ts                | 38 +++++++++++++++++++-------------------
 tests/guides.test.ts             | 22 +++++++++++-----------
 tests/src/core/SSEParser.test.ts | 40 ++++++++++++++++++++--------------------
 tests/src/core/factories.test.ts |  4 ++--
 11 files changed, 112 insertions(+), 89 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index cfaa15f..fa47501 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,13 +1,13 @@
 /**
- * The NUL byte (`U+0000`). The SSE spec voids an `id:` field whose value contains
+ * Names the null byte (`U+0000`). The SSE spec voids an `id:` field whose value contains
  * it, so an `id` carrying a NUL is never surfaced. Spelled as a codepoint so the
  * wire content is unambiguous in source.
  */
 export const NUL = String.fromCharCode(0)
 
 /**
- * The byte-order mark (`U+FEFF`), stripped from the very first chunk of an SSE
- * stream (a leading BOM on later chunks is ordinary content). Spelled as a
+ * Names the byte-order mark (`U+FEFF`), stripped from the very first chunk of an SSE
+ * stream (a leading mark on later chunks is ordinary content). Spelled as a
  * codepoint so the wire content is unambiguous in source.
  */
 export const BOM = String.fromCharCode(0xfeff)
diff --git a/src/core/errors.ts b/src/core/errors.ts
index d0f0c77..01731d2 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -7,21 +7,43 @@ import type { SSEErrorCode } from './types.js'
 // throws.
 
 /**
- * An error thrown by the SSE parser.
+ * Represents an error thrown by the SSE parser.
  *
  * @remarks
  * Thrown for: a `parse(chunk)` call whose resulting buffered total (un-consumed
  * line buffer + accumulated per-event field lengths + the incoming chunk) would
  * exceed a configured {@link import('./types.js').SSEParserOptions.limit}
  * (`OVERFLOW`). The parser's state is left UNCHANGED by the throwing call - the
- * chunk is not appended - so a consumer may `reset()` and continue. `context`
+ * chunk is not appended - so a consumer may `clear()` and continue. `context`
  * carries at least `{ limit, size }`: the configured limit and the size the
  * buffer would have reached.
+ *
+ * @example
+ * ```ts
+ * import { isSSEError, SSEParser } from '@src/core'
+ *
+ * const parser = new SSEParser({ limit: 10 })
+ * try {
+ * 	parser.parse('x'.repeat(20))
+ * } catch (error) {
+ * 	if (isSSEError(error) && error.code === 'OVERFLOW') {
+ * 		error.context // { limit: 10, size: 20 }
+ * 		parser.clear()
+ * 	}
+ * }
+ * ```
  */
 export class SSEError extends Error {
 	readonly code: SSEErrorCode
 	readonly context?: Readonly<Record<string, unknown>>
 
+	/**
+	 * Creates an SSE error carrying a machine-readable code.
+	 *
+	 * @param code - The machine-readable {@link import('./types.js').SSEErrorCode} a `catch` branches on
+	 * @param message - The human-readable description, carried as the `Error` message
+	 * @param context - Extra diagnostic detail; omitted leaves `context` `undefined`. An `'OVERFLOW'` carries at least `{ limit, size }`
+	 */
 	constructor(code: SSEErrorCode, message: string, context?: Readonly<Record<string, unknown>>) {
 		super(message)
 		this.name = 'SSEError'
@@ -31,10 +53,10 @@ export class SSEError extends Error {
 }
 
 /**
- * Narrow an unknown caught value to an {@link SSEError}.
+ * Narrows an unknown caught value to an {@link SSEError}.
  *
  * @param value - The value to test (typically a `catch` binding)
- * @returns `true` when `value` is an {@link SSEError}
+ * @returns True if `value` is an {@link SSEError}; false otherwise
  *
  * @example
  * ```ts
@@ -43,7 +65,7 @@ export class SSEError extends Error {
  * try {
  * 	parser.parse(chunk)
  * } catch (error) {
- * 	if (isSSEError(error) && error.code === 'OVERFLOW') parser.reset()
+ * 	if (isSSEError(error) && error.code === 'OVERFLOW') parser.clear()
  * }
  * ```
  */
diff --git a/src/core/types.ts b/src/core/types.ts
index 1c2282c..1b99aa9 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,5 +1,5 @@
 /**
- * One dispatched Server-Sent Event - the value a blank line flushes from an
+ * Represents one dispatched Server-Sent Event - the value a blank line flushes from an
  * {@link SSEParserInterface}.
  *
  * @remarks
@@ -15,18 +15,18 @@
  *   field's value was an integer (a non-integer `retry:` is ignored).
  */
 export interface SSEEvent {
-	/** The event's concatenated data - each `data:` field joined by `\n`, no trailing newline. */
+	/** Holds the event's concatenated data - each `data:` field joined by `\n`, no trailing newline. */
 	readonly data: string
-	/** The event type - the last `event:` field's value, if any. */
+	/** Holds the event type - the last `event:` field's value, if any. */
 	readonly event?: string
-	/** The last-event-id - the last `id:` field's value, if any. */
+	/** Holds the last-event-id - the last `id:` field's value, if any. */
 	readonly id?: string
-	/** The reconnection time in ms - the `retry:` field, present only when it was an integer. */
+	/** Holds the reconnection time in ms - the `retry:` field, present only when it was an integer. */
 	readonly retry?: number
 }
 
 /**
- * Machine-readable codes carried by an {@link import('./errors.js').SSEError}.
+ * Names the machine-readable codes carried by an {@link import('./errors.js').SSEError}.
  *
  * @remarks
  * `'OVERFLOW'` - a `parse(chunk)` call would push the buffered total over a
@@ -35,7 +35,7 @@ export interface SSEEvent {
 export type SSEErrorCode = 'OVERFLOW'
 
 /**
- * Options for {@link import('./factories.js').createSSEParser} / the
+ * Configures {@link import('./factories.js').createSSEParser} / the
  * {@link import('./SSEParser.js').SSEParser} constructor.
  *
  * @remarks
@@ -52,13 +52,13 @@ export interface SSEParserOptions {
 }
 
 /**
- * A stateful Server-Sent-Events (SSE) stream parser: feed it string chunks, get
+ * Represents a stateful Server-Sent-Events (SSE) stream parser: feed it string chunks, get
  * back the complete events dispatched so far. A trailing partial line / in-progress
  * event is buffered until the rest arrives.
  */
 export interface SSEParserInterface {
 	/**
-	 * Append `chunk`, then return every event a blank line has DISPATCHED (its `data:`
+	 * Appends `chunk`, then returns every event a blank line has DISPATCHED (its `data:`
 	 * fields concatenated with `\n`, plus the last `event:` / `id:` / `retry:`); an
 	 * in-progress event and a trailing partial line are retained for the next call.
 	 *
@@ -67,8 +67,8 @@ export interface SSEParserInterface {
 	 */
 	parse(chunk: string): readonly SSEEvent[]
 	/**
-	 * Treat any remaining buffered partial line as if it had been terminated, then
-	 * dispatch the in-progress event if its data buffer is non-empty. A convenience
+	 * Treats any remaining buffered partial line as if it had been terminated, then
+	 * dispatches the in-progress event if its data buffer is non-empty. A convenience
 	 * beyond the WHATWG algorithm, which discards an unterminated final event at EOF
 	 * - without calling `flush()`, that spec-faithful discard is this parser's
 	 * default behavior.
@@ -76,15 +76,15 @@ export interface SSEParserInterface {
 	 * @returns The dispatched event as a single-element array, or `[]` when there was
 	 * nothing to dispatch.
 	 */
-	flush(): SSEEvent[]
-	/** The persisted last-event-id (WHATWG last-event-id): set by each valid `id:`
+	flush(): readonly SSEEvent[]
+	/** Holds the persisted last-event-id (WHATWG last-event-id): set by each valid `id:`
 	 * field and NOT cleared when an event dispatches; `undefined` until the first
-	 * valid `id:` field arrives, or after `reset()`. */
+	 * valid `id:` field arrives, or after `clear()`. */
 	readonly id: string | undefined
-	/** The last valid `retry:` reconnection time seen, in ms; `undefined` until the
-	 * first valid `retry:` field arrives, or after `reset()`. */
+	/** Holds the last valid `retry:` reconnection time seen, in ms; `undefined` until the
+	 * first valid `retry:` field arrives, or after `clear()`. */
 	readonly retry: number | undefined
-	/** Drop any buffered partial line, in-progress event, and persisted id/retry -
-	 * reset for a fresh stream. */
-	reset(): void
+	/** Drops any buffered partial line, in-progress event, and persisted id/retry,
+	 * leaving the parser ready for a fresh stream. */
+	clear(): void
 }
```
