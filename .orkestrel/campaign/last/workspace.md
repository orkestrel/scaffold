# Last changes: workspace

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `555706b`, merge base with `origin/main` `65f0c79`, layer L3, declared version 0.0.6, registry version 0.0.6.

## Commits since origin/main

```text
c7547a0 2026-08-28 Update every dependency to the published latest
cfdcaf2 2026-08-28 Adopt the catalog and guide mirrors for the wave
d2bb203 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
8004391 2026-09-01 Apply the verified src-audit fixes
a883d9d 2026-09-01 Adopt the renamed guide helpers in the parity test
54de910 2026-09-02 Name the binary content member base64 and the decoded-size helper
e564c2d 2026-09-02 Pin each empty-batch form in its own case and point the README at the guide
555706b 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                                     | 17 +++++----
 README.md                                                       |  2 +-
 package.json                                                    |  6 +--
 src/core/constants.ts                                           |  2 +-
 src/core/errors.ts                                              |  8 ++--
 src/core/factories.ts                                           | 20 +++++-----
 src/core/helpers.ts                                             | 98 +++++++++++++------------------------------------
 src/core/index.ts                                               |  1 +
 src/core/types.ts                                               | 52 ++++++++++++++------------
 src/core/validators.ts                                          | 42 +++++++++++++++++++++
 src/core/workspaces/Workspace.ts                                | 29 ++++++++-------
 src/core/workspaces/WorkspaceManager.ts                         |  8 ++--
 src/core/workspaces/stores/DatabaseWorkspaceStore.ts            |  6 +--
 src/core/workspaces/stores/MemoryWorkspaceStore.ts              |  2 +-
 tests/guides.test.ts                                            | 22 +++++------
 tests/setup.test.ts                                             |  2 +-
 tests/src/core/factories.test.ts                                |  2 +-
 tests/src/core/helpers.test.ts                                  | 88 ++++++--------------------------------------
 tests/src/core/validators.test.ts                               | 71 +++++++++++++++++++++++++++++++++++
 tests/src/core/workspaces/Workspace.test.ts                     | 80 +++++++++++++++++++++++++++++++++++++---
 tests/src/core/workspaces/WorkspaceManager.test.ts              | 25 +++++++++++--
 tests/src/core/workspaces/stores/DatabaseWorkspaceStore.test.ts |  4 +-
 22 files changed, 341 insertions(+), 246 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index b60b930..f4727aa 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,5 +1,5 @@
 /**
- * File extensions mapped to language tags for text content.
+ * Maps file extensions to language tags for text content.
  *
  * Unknown extensions intentionally fall back to `text` in
  * {@link import('./helpers.js').inferLanguage}.
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 285b25d..560f278 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,12 +1,12 @@
 import type { WorkspaceErrorCode } from './types.js'
 
-/** An invalid workspace edit or search operation. */
+/** Reports an invalid workspace edit or search operation. */
 export class WorkspaceError extends Error {
 	readonly code: WorkspaceErrorCode
 	readonly context?: Readonly<Record<string, unknown>>
 
 	/**
-	 * Create a workspace error.
+	 * Creates a workspace error.
 	 *
 	 * @param code - The machine-readable failure code
 	 * @param message - The human-readable failure message
@@ -25,10 +25,10 @@ export class WorkspaceError extends Error {
 }
 
 /**
- * Narrow a caught value to a {@link WorkspaceError}.
+ * Narrows a caught value to a {@link WorkspaceError}.
  *
  * @param value - The caught value
- * @returns Whether the value is a workspace error
+ * @returns True if the value is a workspace error; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/core/index.ts b/src/core/index.ts
index b15a8e7..7ed14dd 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -2,6 +2,7 @@ export * from './types.js'
 export * from './constants.js'
 export * from './errors.js'
 export * from './helpers.js'
+export * from './validators.js'
 export * from './factories.js'
 export * from './workspaces/Workspace.js'
 export * from './workspaces/WorkspaceManager.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index d144084..4c33586 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,26 +1,27 @@
 import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
 
-/** The binary MIME labels supported by a binary {@link FileContent} arm. */
+/** Names the MIME labels a binary {@link FileContent} arm supports. */
 export type BinaryMIME = 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp'
 
 /**
- * The immutable content of a file: either text with a language tag or base64 data with a MIME.
+ * Holds a file's immutable content: either text with a language tag or a base64 string with a
+ * MIME.
  */
 export type FileContent =
 	| { readonly text: string; readonly language: string }
-	| { readonly data: string; readonly mime: BinaryMIME }
+	| { readonly base64: string; readonly mime: BinaryMIME }
 
-/** The edit state of an immutable file value. */
+/** Names the edit state of an immutable file value. */
 export type FileState = 'created' | 'modified'
 
-/** The caller-supplied data used to create an immutable file. */
+/** Carries the caller-supplied values used to create an immutable file. */
 export interface FileInput {
 	readonly path: string
 	readonly content: FileContent
 	readonly state?: FileState
 }
 
-/** An immutable path-addressed file with derived byte and line counts. */
+/** Represents an immutable path-addressed file with derived byte and line counts. */
 export interface FileInterface {
 	readonly path: string
 	readonly content: FileContent
@@ -29,26 +30,26 @@ export interface FileInterface {
 	readonly lines: number
 }
 
-/** A 1-based caret position inside text. */
+/** Locates a 1-based caret inside text. */
 export interface Position {
 	readonly line: number
 	readonly column: number
 }
 
-/** A half-open text span whose start is inclusive and end is exclusive. */
+/** Represents a half-open text span whose start is inclusive and end is exclusive. */
 export interface Range {
 	readonly start: Position
 	readonly end: Position
 }
 
-/** The content and clamped span returned by a ranged read. */
+/** Carries the content and clamped span returned by a ranged read. */
 export interface ReadResult {
 	readonly content: string
 	readonly range: Range
 }
 
 /**
- * Search and replacement behavior.
+ * Configures search and replacement behavior.
  *
  * @remarks
  * `regex` treats the query as regular-expression source, `sensitive` controls case sensitivity,
@@ -60,7 +61,7 @@ export interface SearchOptions {
 	readonly limit?: number
 }
 
-/** One 1-based search hit and the full line that contains it. */
+/** Reports one 1-based search hit and the full line that contains it. */
 export interface SearchMatch {
 	readonly path: string
 	readonly line: number
@@ -69,13 +70,13 @@ export interface SearchMatch {
 	readonly content: string
 }
 
-/** The tallies produced by a replacement operation. */
+/** Carries the tallies produced by a replacement operation. */
 export interface ReplaceResult {
 	readonly occurrences: number
 	readonly files: number
 }
 
-/** Events emitted after workspace mutations complete. */
+/** Names the events emitted after workspace mutations complete. */
 export type WorkspaceEventMap = {
 	readonly write: readonly [file: FileInterface]
 	readonly remove: readonly [path: string]
@@ -84,7 +85,7 @@ export type WorkspaceEventMap = {
 }
 
 /**
- * Workspace construction options.
+ * Configures a workspace at construction.
  *
  * @remarks
  * `id` supplies the registry key, `on` supplies initial event listeners, `error` receives isolated
@@ -97,30 +98,30 @@ export interface WorkspaceOptions {
 	readonly seed?: Iterable<FileInterface>
 }
 
-/** A JSON-serializable workspace snapshot. */
+/** Represents a workspace's stored state in JSON-serializable form. */
 export interface WorkspaceSnapshot {
 	readonly id: string
 	readonly files: readonly FileInterface[]
 }
 
-/** The asynchronous point-access persistence contract for workspace snapshots. */
+/** Persists workspace snapshots through an asynchronous point-access contract. */
 export interface WorkspaceStoreInterface {
 	/**
-	 * Resolve a snapshot.
+	 * Resolves a snapshot.
 	 *
 	 * @param id - The workspace identifier
 	 * @returns The snapshot, or `undefined` when absent
 	 */
 	get(id: string): Promise<WorkspaceSnapshot | undefined>
 	/**
-	 * Insert or replace a snapshot under its own identifier.
+	 * Inserts or replaces a snapshot under its own identifier.
 	 *
 	 * @param snapshot - The snapshot to persist
 	 * @returns A promise that resolves when persistence completes
 	 */
 	set(snapshot: WorkspaceSnapshot): Promise<void>
 	/**
-	 * Delete a snapshot when present.
+	 * Deletes a snapshot when present.
 	 *
 	 * @param id - The workspace identifier
 	 * @returns A promise that resolves when deletion completes
@@ -128,16 +129,16 @@ export interface WorkspaceStoreInterface {
 	delete(id: string): Promise<void>
 }
 
-/** The database row used to persist one opaque workspace snapshot. */
+/** Represents the database row used to persist one opaque workspace snapshot. */
 export interface WorkspaceSnapshotRow {
 	readonly id: string
 	readonly snapshot: unknown
 }
 
-/** The machine-readable failure codes raised by the workspace edit surface. */
+/** Names the machine-readable failure codes raised by the workspace edit surface. */
 export type WorkspaceErrorCode = 'MODALITY' | 'PATTERN' | 'RANGE'
 
-/** A mutable path-keyed editing surface over immutable file values. */
+/** Represents a mutable path-keyed editing surface over immutable file values. */
 export interface WorkspaceInterface {
 	readonly id: string
 	readonly emitter: EmitterInterface<WorkspaceEventMap>
@@ -168,7 +169,7 @@ export interface WorkspaceInterface {
 }
 
 /**
- * Workspace-manager construction options.
+ * Configures a workspace registry at construction.
  *
  * `on` and `error` become defaults for created workspaces; `store` supplies optional durability.
  */
@@ -178,7 +179,10 @@ export interface WorkspaceManagerOptions {
 	readonly store?: WorkspaceStoreInterface
 }
 
-/** An insertion-ordered workspace registry with an active selection and optional durability. */
+/**
+ * Represents an insertion-ordered workspace registry with an active selection and optional
+ * durability.
+ */
 export interface WorkspaceManagerInterface {
 	readonly count: number
 	readonly active: WorkspaceInterface | undefined
```
