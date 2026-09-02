# Last changes: lsp

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `262012f`, merge base with `origin/main` `6004e54`, layer L3, declared version 0.0.5, registry version 0.0.5.

## Commits since origin/main

```text
1ad56c6 2026-08-28 Update every dependency to the published latest
952abd4 2026-08-28 Re-pin @orkestrel/process to ^0.0.9
53f39c6 2026-08-28 Refresh the process guide mirror for the 0.0.9 release
6c0c602 2026-08-28 Adopt the catalog and guide mirrors for the wave
53e1072 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
6fda9c1 2026-09-01 Apply the verified src-audit fixes
262012f 2026-09-01 Adopt the renamed guide helpers in the parity test
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md |   2 +-
 package.json                |   4 +--
 src/core/LSPClient.ts       |  46 +++++++++++-------------
 src/core/constants.ts       |  32 +++++++++++++++++
 src/core/errors.ts          |  14 ++++----
 src/core/factories.ts       |   2 +-
 src/core/types.ts           |  45 ++++++++++++++---------
 src/core/validators.ts      | 163 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++---
 src/server/factories.ts     |   2 +-
 tests/guides.test.ts        |  22 ++++++------
 10 files changed, 262 insertions(+), 70 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 1ca288d..0cd01a3 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -16,6 +16,38 @@ export const LSP_METHODS = Object.freeze({
 /** Lists the position encodings named by Language Server Protocol 3.18. */
 export const LSP_ENCODINGS = Object.freeze(['utf-8', 'utf-16', 'utf-32'] as const)
 
+/**
+ * Lists the machine-readable failure categories an {@link LSPError} carries, in declaration order.
+ *
+ * @remarks
+ * One list feeds the {@link LSPErrorCode} union and the `isLSPError` guard, so a category cannot be
+ * constructed by one and refused by the other. Adding a category here reaches both at once.
+ *
+ * @example
+ * ```ts
+ * LSP_ERROR_CODES // ['spawn', 'framing', 'protocol', 'duplicate', 'server', 'timeout', 'aborted', 'closed']
+ * ```
+ */
+export const LSP_ERROR_CODES = Object.freeze([
+	'spawn',
+	'framing',
+	'protocol',
+	'duplicate',
+	'server',
+	'timeout',
+	'aborted',
+	'closed',
+] as const)
+
+/** Lists the diagnostic severities named by the Language Server Protocol, from error to hint. */
+export const LSP_DIAGNOSTIC_SEVERITIES = Object.freeze([1, 2, 3, 4] as const)
+
+/** Lists the diagnostic tags named by the Language Server Protocol. */
+export const LSP_DIAGNOSTIC_TAGS = Object.freeze([1, 2] as const)
+
+/** Lists the text synchronization modes named by the Language Server Protocol. */
+export const LSP_SYNC_KINDS = Object.freeze([0, 1, 2] as const)
+
 /**
  * Describes the capabilities this client advertises in its initialize request.
  *
diff --git a/src/core/errors.ts b/src/core/errors.ts
index f17d93e..53b5f3a 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,5 +1,6 @@
 import type { LSPErrorCode, LSPErrorContext, LSPErrorOptions } from './types.js'
 import { holds, isError } from '@orkestrel/contract'
+import { LSP_ERROR_CODES } from './constants.js'
 
 /** Reports a package failure with a stable machine-readable category. */
 export class LSPError extends Error {
@@ -25,6 +26,10 @@ export class LSPError extends Error {
 /**
  * Checks whether an unknown value is a branded package error.
  *
+ * @remarks
+ * The accepted categories are read from {@link LSP_ERROR_CODES}, so the guard and the
+ * {@link LSPErrorCode} union cannot disagree about which codes this package declares.
+ *
  * @param value - The value to inspect.
  * @returns True if the value is an LSP error; false otherwise.
  *
@@ -42,14 +47,7 @@ export function isLSPError(value: unknown): value is LSPError {
 		return (
 			value.name === 'LSPError' &&
 			Object.getOwnPropertyDescriptor(value, Symbol.for('@orkestrel/lsp.error'))?.value === true &&
-			(code === 'spawn' ||
-				code === 'framing' ||
-				code === 'protocol' ||
-				code === 'duplicate' ||
-				code === 'server' ||
-				code === 'timeout' ||
-				code === 'aborted' ||
-				code === 'closed')
+			LSP_ERROR_CODES.some((declared) => declared === code)
 		)
 	})
 }
diff --git a/src/core/types.ts b/src/core/types.ts
index 6fdce90..4ec555a 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,4 +1,10 @@
 import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
+import type {
+	LSP_DIAGNOSTIC_SEVERITIES,
+	LSP_DIAGNOSTIC_TAGS,
+	LSP_ERROR_CODES,
+	LSP_SYNC_KINDS,
+} from './constants.js'
 
 /** Identifies a JSON-RPC request and its matching response. */
 export type JSONRPCId = string | number
@@ -82,11 +88,11 @@ export interface LSPTextDocumentItem {
 	readonly text: string
 }
 
-/** Identifies the standard severity assigned to a diagnostic. */
-export type LSPDiagnosticSeverity = 1 | 2 | 3 | 4
+/** Identifies the standard severity assigned to a diagnostic, derived from {@link LSP_DIAGNOSTIC_SEVERITIES}. */
+export type LSPDiagnosticSeverity = (typeof LSP_DIAGNOSTIC_SEVERITIES)[number]
 
-/** Identifies a standard tag assigned to a diagnostic. */
-export type LSPDiagnosticTag = 1 | 2
+/** Identifies a standard tag assigned to a diagnostic, derived from {@link LSP_DIAGNOSTIC_TAGS}. */
+export type LSPDiagnosticTag = (typeof LSP_DIAGNOSTIC_TAGS)[number]
 
 /** Describes the external resource that explains a diagnostic code. */
 export interface LSPCodeDescription {
@@ -138,8 +144,8 @@ export type LSPDocumentDiagnosticReport =
 /** Identifies a position encoding selected by a language server. */
 export type LSPPositionEncoding = string
 
-/** Identifies the text synchronization mode selected by a language server. */
-export type LSPTextDocumentSyncKind = 0 | 1 | 2
+/** Identifies the text synchronization mode selected by a language server, derived from {@link LSP_SYNC_KINDS}. */
+export type LSPTextDocumentSyncKind = (typeof LSP_SYNC_KINDS)[number]
 
 /** Describes the text synchronization features selected by a language server. */
 export interface LSPTextDocumentSyncOptions {
@@ -253,6 +259,21 @@ export type LSPClientLifecycle =
 	| { readonly phase: 'destroying'; readonly promise: Promise<void>; readonly generation?: number }
 	| { readonly phase: 'destroyed' }
 
+/**
+ * Describes one settlement record a client holds for an operation awaiting its outcome.
+ *
+ * @remarks
+ * A request entry and a diagnostics publication entry carry the same members, so one record type
+ * describes both. `signal` and `abort` are the pair the client removes when the entry
+ * settles, so a settled operation leaves no listener on the signal that bounded it.
+ */
+export interface LSPPending<T> {
+	readonly resolve: (value: T) => void
+	readonly reject: (reason?: unknown) => void
+	readonly signal: AbortSignal
+	readonly abort: () => void
+}
+
 /** Maps client event names to their listener arguments. */
 export type LSPClientEventMap = {
 	readonly notification: readonly [message: JSONRPCNotification]
@@ -329,16 +350,8 @@ export interface LSPClientInterface {
 	destroy(): Promise<void>
 }
 
-/** Identifies a stable package failure category. */
-export type LSPErrorCode =
-	| 'spawn'
-	| 'framing'
-	| 'protocol'
-	| 'duplicate'
-	| 'server'
-	| 'timeout'
-	| 'aborted'
-	| 'closed'
+/** Identifies a stable package failure category, derived from {@link LSP_ERROR_CODES}. */
+export type LSPErrorCode = (typeof LSP_ERROR_CODES)[number]
 
 /** Describes structured details attached to an {@link LSPError}. */
 export interface LSPErrorContext {
```
