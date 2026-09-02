# Last changes: test

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `5aff09d`, merge base with `origin/main` `95fcf3a`, layer L0, declared version 0.0.11, registry version 0.0.11.

## Commits since origin/main

```text
9f88f5b 2026-08-28 Update every dependency to the published latest
7994f42 2026-08-28 Adopt the catalog and guide mirrors for the wave
440b54f 2026-08-28 Apply the verified src-audit fixes
2f94b93 2026-09-01 Apply the breaking rows in test
30f6211 2026-09-01 Rename resolveColor to parseCSSColor
4b86f16 2026-09-01 Close the test unit's audit findings
cced24a 2026-09-01 Adopt the renamed guide helpers in the parity test
5aff09d 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md         |  17 +++----
 package.json                        |   6 +--
 src/browser/constants.ts            |  19 ++++----
 src/browser/factories.ts            |   2 +-
 src/browser/helpers.ts              |  81 ++++++++++++++++-----------------
 src/browser/types.ts                |  74 +++++++++++++++---------------
 src/core/factories.ts               |  25 ++--------
 src/core/helpers.ts                 | 104 ++++++++++++++++++++++++++++++------------
 src/core/types.ts                   |  92 ++++++++++++++++++++++++++++---------
 src/server/constants.ts             |   6 +--
 src/server/factories.ts             |  62 ++++++++-----------------
 src/server/helpers.ts               |  92 ++++++++++++++++++++++---------------
 src/server/types.ts                 |  57 ++++++++++++-----------
 tests/guides.test.ts                |  14 +++---
 tests/src/browser/factories.test.ts |  14 +++---
 tests/src/browser/helpers.test.ts   | 188 +++++++++++++++++++++++++++++++++++++++-------------------------------------
 tests/src/core/helpers.test.ts      |  92 ++++++++++++++++++++++++++++++++++++-
 tests/src/server/helpers.test.ts    |  87 +++++++++++++++++++++++++++++++++++
 18 files changed, 648 insertions(+), 384 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/browser/constants.ts b/src/browser/constants.ts
index b8a064e..c50c6da 100644
--- a/src/browser/constants.ts
+++ b/src/browser/constants.ts
@@ -1,7 +1,7 @@
 import type { Color } from './types.js'
 
 /**
- * The interactive ARIA roles a bare accessible name is searched across.
+ * Names the interactive ARIA roles a bare accessible name is searched across.
  *
  * @remarks
  * A person names a control, not a role, so the one-argument resolver searches every role a control
@@ -28,7 +28,7 @@ export const ACCESSIBLE_ROLES: readonly string[] = Object.freeze([
 ])
 
 /**
- * The page a browser paints an unstyled document onto.
+ * Names the color a browser paints an unstyled document with.
  *
  * @remarks
  * This is the floor a backdrop walk ends on wherever the caller wants the browser's own canvas
@@ -38,8 +38,8 @@ export const ACCESSIBLE_ROLES: readonly string[] = Object.freeze([
 export const CANVAS_COLOR: Color = Object.freeze([255, 255, 255, 1])
 
 /**
- * The attribute marking the runner's tester pane, and the rule that sizes it, while a frame is
- * staged.
+ * Names the attribute marking the runner's tester pane, and the rule that sizes it, while a frame
+ * is staged.
  *
  * @remarks
  * `stagePane` writes it onto the pane and onto the stylesheet it appends, and `releasePane` finds
@@ -49,7 +49,7 @@ export const CANVAS_COLOR: Color = Object.freeze([255, 255, 255, 1])
 export const CAPTURE_PANE = 'data-capture-pane'
 
 /**
- * The roles whose accessible name is the text a reader can see inside them.
+ * Names the roles whose accessible name is the text a reader can see inside them.
  *
  * @remarks
  * `readName` reads an element in this list from its own rendered text, after every `aria-hidden`
@@ -69,7 +69,7 @@ export const CONTENT_ROLES: readonly string[] = Object.freeze([
 ])
 
 /**
- * The role each `input` type carries.
+ * Names the role each `input` type carries.
  *
  * @remarks
  * Membership is the contract. The map answers for `button`, `checkbox`, `email`, `number`,
@@ -94,7 +94,7 @@ export const FIELD_ROLES: Readonly<Record<string, string>> = Object.freeze({
 })
 
 /**
- * What sequential keyboard navigation can reach, before disabled and unrendered elements go.
+ * Names what sequential keyboard navigation can reach, before disabled and unrendered elements go.
  *
  * @remarks
  * `describeFocus` queries this selector and then drops what a browser drops: an element the
@@ -106,7 +106,7 @@ export const FOCUSABLE_SELECTOR =
 	'a[href], area[href], button, input, select, summary, textarea, [tabindex]'
 
 /**
- * The role a `th` carries for the header axis its `scope` names.
+ * Names the role a `th` carries for the header axis its `scope` names.
  *
  * @remarks
  * A header cell heads a column or a row, and this map answers for the `col` and `row` scopes that
@@ -119,7 +119,8 @@ export const HEADER_ROLES: Readonly<Record<string, string>> = Object.freeze({
 })
 
 /**
- * The role each listed tag carries in the accessibility tree when it declares none of its own.
+ * Names the role each listed tag carries in the accessibility tree when it declares none of its
+ * own.
  *
  * @remarks
  * Membership is the contract. The map answers for the sectioning elements `ARTICLE`, `ASIDE`,
diff --git a/src/browser/types.ts b/src/browser/types.ts
index a7e6826..10c8838 100644
--- a/src/browser/types.ts
+++ b/src/browser/types.ts
@@ -1,5 +1,5 @@
 /**
- * One rendered color as straight sRGB channels and its alpha.
+ * Represents one rendered color as straight sRGB channels and its alpha.
  *
  * @remarks
  * The channels run 0–255 and the alpha runs 0–1, which is the shape a computed `rgb()` value already
@@ -9,7 +9,7 @@
 export type Color = readonly [red: number, green: number, blue: number, alpha: number]
 
 /**
- * Options for one built element.
+ * Configures one built element.
  *
  * @remarks
  * `classes` is written the way a `class` attribute is written — one space-separated string — so a
@@ -18,70 +18,70 @@ export type Color = readonly [red: number, green: number, blue: number, alpha: n
  * with it.
  */
 export interface ElementOptions {
-	/** The class list, space-separated, exactly as a `class` attribute writes it. */
+	/** Holds the class list, space-separated, exactly as a `class` attribute writes it. */
 	readonly classes?: string
-	/** The text the element carries, set as text rather than parsed as markup. */
+	/** Holds the text the element carries, set as text rather than parsed as markup. */
 	readonly text?: string
-	/** Every attribute to set, keyed by attribute name. */
+	/** Holds every attribute to set, keyed by attribute name. */
 	readonly attributes?: Readonly<Record<string, string>>
 }
 
-/** Options for one captured frame. */
+/** Configures one captured frame. */
 export interface FrameOptions {
-	/** The frame's path, relative to the calling test file. */
+	/** Holds the frame's path, relative to the calling test file. */
 	readonly path: string
-	/** The viewport width in CSS pixels the frame is shot at. */
+	/** Holds the viewport width in CSS pixels the frame is shot at. */
 	readonly width: number
-	/** The viewport height in CSS pixels the frame is shot at. */
+	/** Holds the viewport height in CSS pixels the frame is shot at. */
 	readonly height: number
-	/** The element to shoot. Omit it to shoot the whole page. */
+	/** Holds the element to shoot. Omit it to shoot the whole page. */
 	readonly element?: Element | undefined
 }
 
-/** One theme-and-viewport pair a capture run renders. */
+/** Represents one theme-and-viewport pair a capture run renders. */
 export interface CaptureVariant {
-	/** The variant's name, which is the second half of every filename the run writes. */
+	/** Holds the variant's name, which is the second half of every filename the run writes. */
 	readonly name: string
-	/** The viewport width in pixels. */
+	/** Holds the viewport width in pixels. */
 	readonly width: number
-	/** The viewport height in pixels. */
+	/** Holds the viewport height in pixels. */
 	readonly height: number
 	/**
-	 * The document change this variant needs before the viewport is resized — a theme attribute, a
-	 * density class, a language direction. Omit it when the variant is a viewport alone.
+	 * Holds the document change this variant needs before the viewport is resized — a theme
+	 * attribute, a density class, a language direction. Omit it when the variant is a viewport alone.
 	 */
 	readonly apply?: () => void
 }
 
-/** Options for a capture portfolio. */
+/** Configures a capture portfolio. */
 export interface PortfolioOptions {
 	/**
-	 * Every state name the journeys place, declared once. `place` refuses a name absent from this
-	 * list, so the registry and the disk cannot drift apart.
+	 * Lists every state name the journeys place, declared once. `place` refuses a name absent from
+	 * this list, so the registry and the disk cannot drift apart.
 	 */
 	readonly states: readonly string[]
-	/** Every variant the portfolio can be rendered in. One run renders exactly one of them. */
+	/** Lists every variant the portfolio can be rendered in. One run renders exactly one of them. */
 	readonly variants: readonly CaptureVariant[]
-	/** The name of the variant this run renders. Creation throws when no variant carries it. */
+	/** Holds the name of the variant this run renders. Creation throws when no variant carries it. */
 	readonly variant: string
-	/** The directory each written file is placed in, relative to the calling test file. */
+	/** Holds the directory each written file is placed in, relative to the calling test file. */
 	readonly directory: string
 	/**
-	 * Whether this run writes files. An ordinary run leaves it unset, so `place` resizes nothing,
-	 * writes nothing, and records nothing.
+	 * Determines whether this run writes files. An ordinary run leaves it unset, so `place` resizes
+	 * nothing, writes nothing, and records nothing.
 	 */
 	readonly enabled?: boolean
 }
 
-/** The registry of capture states one run places, and the files it wrote placing them. */
+/** Holds the registry of capture states one run places, and the files it wrote placing them. */
 export interface PortfolioInterface {
-	/** The name of the variant this run renders. */
+	/** Holds the name of the variant this run renders. */
 	readonly variant: string
-	/** Every state placed so far, in placement order. */
-	readonly states: readonly string[]
-	/** Every path written so far, in write order. */
+	/** Lists every state placed so far, in placement order. */
+	readonly placements: readonly string[]
+	/** Lists every path written so far, in write order. */
 	readonly paths: readonly string[]
-	/** The registry expanded across every variant: the filenames a complete portfolio holds. */
+	/** Lists the filenames a complete portfolio holds: the registry expanded across every variant. */
 	readonly files: readonly string[]
 	/**
 	 * Places one registered state: applies the variant, stages the pane, and writes the verified
@@ -96,18 +96,18 @@ export interface PortfolioInterface {
 	place(state: string, element?: Element): Promise<string | undefined>
 }
 
-/** One scripted step a journal recorded, and what the surface did about it. */
+/** Represents one scripted step a journal recorded, and what the surface did about it. */
 export interface JournalStep {
-	/** What the run did, as one verb. */
+	/** Names what the run did, as one verb. */
 	readonly action: string
-	/** The exact thing it did it to. */
+	/** Names the exact thing it did it to. */
 	readonly trigger: string
-	/** What was observed on the surface after the step landed. */
+	/** Holds what was observed on the surface after the step landed. */
 	readonly result: string
 }
 
 /**
- * The record of one scenario: every step it took and everything the page said while it ran.
+ * Records one scenario: every step it took and everything the page said while it ran.
  *
  * @remarks
  * Recording is off until {@link JournalInterface.start} arms it, so a suite that never starts a
@@ -116,9 +116,9 @@ export interface JournalStep {
  * journal that swallowed what it read would hide exactly the diagnostics it exists to keep.
  */
 export interface JournalInterface {
-	/** Every step recorded since the journal started, in the order it was taken; a snapshot. */
+	/** Lists every step recorded since the journal started, in the order it was taken; a snapshot. */
 	readonly steps: readonly JournalStep[]
-	/** Every console line and uncaught failure the page emitted since it started; a snapshot. */
+	/** Lists every console line and uncaught failure the page emitted since it started; a snapshot. */
 	readonly output: readonly string[]
 	/**
 	 * Starts a fresh recording, dropping whatever the previous scenario left.
diff --git a/src/core/types.ts b/src/core/types.ts
index 048baee..7dd4159 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -4,11 +4,11 @@
  * @typeParam TArgs - The argument tuple the recorded handler accepts.
  */
 export interface RecorderInterface<TArgs extends readonly unknown[]> {
-	/** Every recorded call, oldest first, each entry the arguments of one call. */
+	/** Lists every recorded call, oldest first, each entry the arguments of one call. */
 	readonly calls: readonly TArgs[]
-	/** How many calls have been recorded. */
+	/** Reports how many calls have been recorded. */
 	readonly count: number
-	/** The callback to hand to the code under test. */
+	/** Holds the callback to hand to the code under test. */
 	readonly handler: (...args: TArgs) => void
 	/** Discards the recorded calls and keeps the recorder usable. */
 	clear(): void
@@ -40,21 +40,71 @@ export type RecorderMap<
 	TName extends keyof TMap,
 > = { readonly [K in TName]: RecorderInterface<TMap[K]> }
 
-/** A real abort signal and controller instrumented with its live abort-listener tally. */
+/**
+ * Represents one operation that produced a value.
+ *
+ * @typeParam T - The produced value type.
+ */
+export interface Success<T> {
+	/** Holds the discriminant that names the produced arm. */
+	readonly success: true
+	/** Holds the value the operation produced. */
+	readonly value: T
+}
+
+/**
+ * Represents one operation that raised a failure instead of producing a value.
+ *
+ * @typeParam E - The failure type.
+ */
+export interface Failure<E> {
+	/** Holds the discriminant that names the failed arm. */
+	readonly success: false
+	/** Holds the failure the operation raised. */
+	readonly error: E
+}
+
+/**
+ * Represents the outcome of one operation: the value it produced, or the failure it raised.
+ *
+ * @typeParam T - The produced value type.
+ * @typeParam E - The failure type. Defaults to `Error`.
+ * @remarks `success` is the discriminant, so a caller narrows on it before reading `value` or
+ * `error`. This package declares no runtime dependency, so this is the one outcome contract its own
+ * members read rather than an anonymous union written at each call site.
+ */
+export type Result<T, E = Error> = Success<T> | Failure<E>
+
+/** Holds a real abort signal and controller instrumented with its live abort-listener tally. */
 export interface SignalInterface {
-	/** The controller that owns the signal. */
+	/** Holds the controller that owns the signal. */
 	readonly controller: AbortController
-	/** The instrumented signal. */
+	/** Holds the signal to hand to the code under test. */
 	readonly signal: AbortSignal
-	/** The live abort-listener tally. */
+	/** Reports the live abort-listener tally. */
 	readonly count: number
 }
 
-/** A numbered resource factory with records of every creation and destruction. */
+/**
+ * Represents one abort listener an instrumented signal installed, as its tally holds it.
+ *
+ * @remarks The members are the listener the caller supplied, the listener installed in its place,
+ * the capture flag the pair was registered under, and the controller that removes the scope
+ * subscription installed beside it, which is `undefined` where no other signal scopes the
+ * registration.
+ */
+export type SignalRegistration = readonly [
+	listener: EventListener | EventListenerObject,
+	installed: EventListener | EventListenerObject,
+	capture: boolean,
+	cleanup: AbortController | undefined,
+]
+
+/** Represents a numbered resource factory with records of every creation and destruction. */
 export interface ResourceFactoryInterface {
-	/** The ids returned by `create`, in order. */
+	/** Records the ids returned by `create`, in order. */
 	readonly created: RecorderInterface<readonly [id: number]>
-	/** The ids passed to `destroy`, in order. */
+	/** Records the ids passed to `destroy`, in order. */
 	readonly destroyed: RecorderInterface<readonly [id: number]>
 	/**
 	 * Creates a numbered resource.
@@ -70,12 +120,12 @@ export interface ResourceFactoryInterface {
 	destroy(id: number): void
 }
 
-/** The work one teardown entry performs when the list is destroyed. */
+/** Represents the work one teardown entry performs when the list is destroyed. */
 export type TeardownHandler = () => void | Promise<void>
 
-/** The cleanup a test adds as it goes and runs once, newest first, when it is done. */
+/** Represents the cleanup a test adds as it goes and runs once, newest first, when it is done. */
 export interface TeardownInterface {
-	/** How many handlers are registered. */
+	/** Reports how many handlers are registered. */
 	readonly count: number
 	/**
 	 * Registers a handler to run when the list is destroyed.
@@ -104,17 +154,17 @@ export interface TeardownInterface {
  * consumers do not agree on one. Each states its own numbers in its `@remarks`.
  */
 export interface WaitOptions {
-	/** The elapsed-time limit in milliseconds. */
+	/** Holds the elapsed-time limit in milliseconds. */
 	readonly budget?: number
-	/** The delay between readings in milliseconds. */
+	/** Holds the delay between readings in milliseconds. */
 	readonly interval?: number
-	/** The signal that aborts the wait. */
+	/** Holds the signal that aborts the wait. */
 	readonly signal?: AbortSignal
 }
 
 /** Configures a bounded retry. */
 export interface RetryOptions extends WaitOptions {
-	/** The maximum number of producer calls. When omitted, only the time budget bounds the retry. */
+	/** Caps the number of producer calls. When omitted, only the time budget bounds the retry. */
 	readonly attempts?: number
 }
 
@@ -129,7 +179,7 @@ export type EventSubscriber<TArgs extends readonly unknown[]> = (
 	listener: (...args: TArgs) => void,
 ) => (() => void) | void
 
-/** Any value JSON can represent, so a round trip through JSON preserves the type. */
+/** Covers any value JSON can represent, so a round trip through JSON preserves the type. */
 export type JSONValue =
 	| string
 	| number
@@ -139,8 +189,8 @@ export type JSONValue =
 	| { readonly [key: string]: JSONValue }
 
 /**
- * The JSON-safe projection of a type: every member JSON preserves, mapped to itself, and every
- * member it does not, mapped to `never`.
+ * Represents the JSON-safe projection of a type: every member JSON preserves, mapped to itself, and
+ * every member it does not, mapped to `never`.
  *
  * @typeParam T - The type to project.
  * @remarks Intersect a parameter with this rather than constraining it to `JSONValue`. A `JSONValue`
@@ -184,7 +234,7 @@ export type JSONSafe<T> = unknown extends T
 					: never
 
 /**
- * Any value the host `Headers` constructor accepts.
+ * Covers any value the host `Headers` constructor accepts.
  *
  * @remarks Derived from the host constructor rather than named from a single library, so the type
  * resolves in every project against that project's own `Headers` declaration. The record,
diff --git a/src/server/constants.ts b/src/server/constants.ts
index 5d507ab..d0f5bc3 100644
--- a/src/server/constants.ts
+++ b/src/server/constants.ts
@@ -1,15 +1,15 @@
 /**
- * The attempts `removeTree` makes before rethrowing a retryable removal error.
+ * Caps the attempts `removeTree` makes before rethrowing a retryable removal error.
  */
 export const REMOVE_TREE_MAX_ATTEMPTS = 10
 
 /**
- * The synchronous delay, in milliseconds, `removeTree` waits between attempts.
+ * Names the synchronous delay, in milliseconds, `removeTree` waits between attempts.
  */
 export const REMOVE_TREE_RETRY_DELAY_MS = 100
 
 /**
- * The error codes `removeTree` retries; every other code rethrows immediately.
+ * Names the error codes `removeTree` retries; every other code rethrows immediately.
  */
 export const REMOVE_TREE_RETRYABLE_CODES: readonly string[] = Object.freeze([
 	'EBUSY',
diff --git a/src/server/types.ts b/src/server/types.ts
index d567fbc..98f7b98 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -1,8 +1,8 @@
 import type { WaitOptions } from '@src/core'
 
-/** A temporary directory a test owns, writes into, reads back, and removes when it is done. */
+/** Holds a temporary directory a test owns, writes into, reads back, and removes when it is done. */
 export interface ScratchInterface {
-	/** The absolute path of the allocated directory. */
+	/** Holds the absolute path of the allocated directory. */
 	readonly path: string
 	/**
 	 * Writes a file, creating each parent directory that does not exist.
@@ -29,7 +29,8 @@ export interface ScratchInterface {
 	 * Reports whether a path exists without following its final symbolic link.
 	 *
 	 * @param target - A relative or absolute path contained by the scratch directory.
-	 * @returns True when the entry exists, including a symbolic link whose target is missing.
+	 * @returns True if the entry exists, including a symbolic link whose target is
+	 * missing; false otherwise.
 	 * @throws When the path escapes the scratch directory or its root is a symbolic link or file.
 	 */
 	has(target: string): boolean
@@ -86,45 +87,45 @@ export interface ScratchInterface {
 	destroy(): void
 }
 
-/** The fields that together identify one allocated directory on its host. */
+/** Represents the fields that together identify one allocated directory on its host. */
 export interface ScratchIdentity {
-	/** The identifier of the device holding the directory. */
+	/** Holds the identifier of the device holding the directory. */
 	readonly device: number
-	/** The number of the directory's index node on that device. */
+	/** Holds the number of the directory's index node on that device. */
 	readonly inode: number
-	/** The directory's creation time in milliseconds. */
+	/** Holds the directory's creation time in milliseconds. */
 	readonly birth: number
 }
 
-/** Options for allocating a scratch directory. */
+/** Configures a scratch directory allocation. */
 export interface ScratchOptions {
 	/**
-	 * The existing directory in which to create the allocation. Defaults to the host temporary
+	 * Names the existing directory in which to create the allocation. Defaults to the host temporary
 	 * directory. Allocation throws when this path is missing, a symbolic link, or not a directory.
 	 */
 	readonly parent?: string
 	/**
-	 * The name fragment that starts the generated directory name. Allocation throws when this value
-	 * contains `/` or `\`. Both are refused on every host, so the rule does not vary by host. A
+	 * Holds the name fragment that starts the generated directory name. Allocation throws when this
+	 * value contains `/` or `\`. Both are refused on every host, so the rule does not vary by host. A
 	 * fragment carrying no separator is one path segment and cannot steer the allocation, so
 	 * `release-0..2-` allocates.
 	 */
 	readonly prefix?: string
 	/**
-	 * Files to write on allocation, keyed by path below the scratch directory. Allocation removes its
-	 * directory and rethrows when a key escapes or the host refuses a write.
+	 * Holds the files to write on allocation, keyed by path below the scratch directory. Allocation
+	 * removes its directory and rethrows when a key escapes or the host refuses a write.
 	 */
 	readonly files?: Readonly<Record<string, string>>
 }
 
-/** A server a test owns, listening on an ephemeral loopback port until the test releases it. */
+/** Holds a server a test owns, listening on an ephemeral loopback port until the test releases it. */
 export interface LoopbackInterface {
 	/**
-	 * The `http` origin for the assigned port, without a trailing slash. A TLS server answers on the
-	 * same port under `https`.
+	 * Names the `http` origin for the assigned port, without a trailing slash. A TLS server answers
+	 * on the same port under `https`.
 	 */
 	readonly url: string
-	/** The ephemeral port the host assigned. */
+	/** Holds the ephemeral port the host assigned. */
 	readonly port: number
 	/**
 	 * Drops every live connection on a server that carries `closeAllConnections`, stops listening, and
@@ -135,10 +136,11 @@ export interface LoopbackInterface {
 	destroy(): Promise<void>
 }
 
-/** A name-keyed cookie store a test drives one origin with, filled from real responses. */
+/** Holds a name-keyed cookie store a test drives one origin with, filled from real responses. */
 export interface CookieJarInterface {
 	/**
-	 * The `Cookie` request header naming every stored cookie, or `undefined` while the jar holds none.
+	 * Reports the `Cookie` request header naming every stored cookie, or `undefined` while the jar
+	 * holds none.
 	 */
 	readonly header: string | undefined
 	/**
@@ -160,35 +162,36 @@ export interface CookieJarInterface {
 	capture(response: Response): readonly string[]
 }
 
-/** Options for reading a source inventory. */
+/** Configures a source inventory read. */
 export interface InventoryOptions {
-	/** The file extensions to include, each written with its leading dot. */
+	/** Lists the file extensions to include, each written with its leading dot. */
 	readonly extensions?: readonly string[]
 	/**
-	 * The root-relative path keys to exclude. A key excludes itself and every key below it, matched
-	 * on whole segments, so `excluded` drops `excluded/file.ts` and keeps `excluded-other/file.ts`.
+	 * Lists the root-relative path keys to exclude. A key excludes itself and every key below it,
+	 * matched on whole segments, so `excluded` drops `excluded/file.ts` and keeps
+	 * `excluded-other/file.ts`.
 	 */
 	readonly exclude?: readonly string[]
 }
 
 /**
- * Options for driving a client upgrade request.
+ * Configures a client upgrade request.
  *
  * @remarks The time bounds and abort signal bound the wait for the server's answer, so a server
  * that accepts the connection and never answers ends the call rather than parking it.
  */
 export interface UpgradeOptions extends WaitOptions {
-	/** The request path, written with its leading slash. Defaults to `/`. */
+	/** Names the request path, written with its leading slash. Defaults to `/`. */
 	readonly path?: string
 	/**
-	 * The subprotocol tokens the request offers. They are sent as one comma-separated
+	 * Lists the subprotocol tokens the request offers. They are sent as one comma-separated
 	 * `Sec-WebSocket-Protocol` field, and an empty or omitted list sends no field at all.
 	 */
 	readonly protocols?: readonly string[]
 }
 
 /**
- * What one server did with a client upgrade request.
+ * Represents what one server did with a client upgrade request.
  *
  * @remarks `claimed` is the discriminant. The claimed arm carries `protocol`, the subprotocol the
  * server selected, which is `undefined` when it selected none; a claimed upgrade produced no plain
```
