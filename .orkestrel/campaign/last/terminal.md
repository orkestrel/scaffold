# Last changes: terminal

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `c0947ba`, merge base with `origin/main` `51bef97`, layer L3, declared version 0.0.13, registry version 0.0.13.

## Commits since origin/main

```text
8d7e61b 2026-08-28 Update every dependency to the published latest
d02653e 2026-08-28 Adopt the catalog and guide mirrors for the wave
bfaa5a1 2026-08-28 Apply the verified src-audit fixes
f9981fa 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
a3bdd89 2026-09-01 Adopt the renamed guide helpers in the parity test
01c6754 2026-09-02 Name the terminal renderers and return prompts from the manager
4ea17d7 2026-09-02 State the manager accessors' behavior and pin the undecoded-key path
c0947ba 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                               |  17 +--
 package.json                                              |   6 +-
 src/core/Prompt.ts                                        |  10 +-
 src/core/PromptClient.ts                                  |  12 +--
 src/core/TerminalManager.ts                               |  25 +++--
 src/core/constants.ts                                     |  58 +++++-----
 src/core/errors.ts                                        |  13 +--
 src/core/factories.ts                                     |  16 +--
 src/core/helpers.ts                                       | 311 +++++++++++++++++++++++++++---------------------------
 src/core/index.ts                                         |   4 +-
 src/core/{ => stores}/DatabaseTerminalStore.ts            |  26 ++---
 src/core/{ => stores}/MemoryTerminalStore.ts              |  14 +--
 src/core/types.ts                                         | 219 +++++++++++++++++++++++++++++---------
 src/core/validators.ts                                    |  12 +--
 src/server/Terminal.ts                                    | 189 +++++++++++++++++----------------
 src/server/constants.ts                                   |  36 +++----
 src/server/factories.ts                                   |   2 +-
 src/server/helpers.ts                                     |  82 +++++++-------
 src/server/types.ts                                       |   6 +-
 tests/guides.test.ts                                      |  22 ++--
 tests/setup.test.ts                                       |   6 +-
 tests/setup.ts                                            |   4 +-
 tests/src/core/PromptClient.test.ts                       |   4 +-
 tests/src/core/TerminalManager.test.ts                    |  19 +++-
 tests/src/core/factories.test.ts                          |   7 +-
 tests/src/core/helpers.test.ts                            |  72 ++++++++-----
 tests/src/core/{ => stores}/DatabaseTerminalStore.test.ts |   4 +-
 tests/src/core/{ => stores}/MemoryTerminalStore.test.ts   |   4 +-
 tests/src/server/helpers.test.ts                          |  38 +++----
 29 files changed, 696 insertions(+), 542 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 3330c3f..7cd47db 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -7,43 +7,43 @@ import { freezeStyle, STATUS_ICONS } from '@orkestrel/console'
 
 // === Control bytes (named, no raw control characters in source)
 
-/** Carriage return (`\r`, U+000D) — Enter on most terminals. */
+/** Names the carriage return byte (`\r`, U+000D) — Enter on most terminals. */
 export const RETURN = String.fromCharCode(13)
-/** Line feed (`\n`, U+000A) — Enter on some terminals / pasted input. */
+/** Names the line feed byte (`\n`, U+000A) — Enter on some terminals / pasted input. */
 export const NEWLINE = String.fromCharCode(10)
-/** Tab (`\t`, U+0009). */
+/** Names the tab byte (`\t`, U+0009). */
 export const TAB = String.fromCharCode(9)
-/** Escape (ESC, U+001B) — the lone byte, and the lead byte of every CSI / SS3 sequence. */
+/** Names the escape byte (ESC, U+001B) — the lone byte, and the lead byte of every CSI / SS3 sequence. */
 export const ESCAPE = String.fromCharCode(27)
-/** Backspace (BS, U+0008) — Ctrl+H / some terminals' Backspace. */
+/** Names the backspace byte (BS, U+0008) — Ctrl+H / some terminals' Backspace. */
 export const BACKSPACE = String.fromCharCode(8)
-/** Delete (DEL, U+007F) — the usual Backspace byte on a Unix TTY. */
+/** Names the delete byte (DEL, U+007F) — the usual Backspace byte on a Unix TTY. */
 export const DELETE = String.fromCharCode(127)
-/** Space (U+0020). */
+/** Names the space byte (U+0020). */
 export const SPACE = ' '
-/** Ctrl+C (ETX, U+0003) — interrupt / cancel. */
+/** Names the Ctrl+C byte (ETX, U+0003) — interrupt / cancel. */
 export const CTRL_C = String.fromCharCode(3)
-/** Ctrl+D (EOT, U+0004) — end-of-transmission / finish (the editor's commit key). */
+/** Names the Ctrl+D byte (EOT, U+0004) — end-of-transmission / finish (the editor's commit key). */
 export const CTRL_D = String.fromCharCode(4)
-/** Ctrl+U (NAK, U+0015) — clear the current line. */
+/** Names the Ctrl+U byte (NAK, U+0015) — clear the current line. */
 export const CTRL_U = String.fromCharCode(21)
-/** Ctrl+A (SOH, U+0001) — move to start of line. */
+/** Names the Ctrl+A byte (SOH, U+0001) — move to start of line. */
 export const CTRL_A = String.fromCharCode(1)
-/** Ctrl+E (ENQ, U+0005) — move to end of line. */
+/** Names the Ctrl+E byte (ENQ, U+0005) — move to end of line. */
 export const CTRL_E = String.fromCharCode(5)
 
 /**
- * The Control Sequence Introducer lead (`ESC[`) for the navigation keys — the prefix of the
+ * Names the Control Sequence Introducer lead (`ESC[`) for the navigation keys — the prefix of the
  * arrow / home / end / delete sequences {@link SEQUENCE_NAMES} is keyed by. Named `KEY_CSI`
  * (not `CSI`) so it never collides with the console module's SGR `CSI` (both barrel through
  * `@src/core`).
  */
 export const KEY_CSI = `${ESCAPE}[`
-/** The Single Shift Three lead (`ESCO`) — the alternate arrow-key prefix some terminals emit (`ESC O A`). */
+/** Names the Single Shift Three lead (`ESCO`) — the alternate arrow-key prefix some terminals emit (`ESC O A`). */
 export const KEY_SS3 = `${ESCAPE}O`
 
 /**
- * The exact escape SEQUENCE → canonical key NAME table {@link import('./helpers.js').parseKey}
+ * Holds the exact escape SEQUENCE → canonical key NAME table {@link import('./helpers.js').parseKey}
  * consults for the navigation / editing keys. Covers BOTH the CSI form (`ESC[A`…) and the SS3
  * form (`ESCOA`…) of the four arrows, plus the `home` / `end` / `delete` CSI sequences (with
  * their numeric-tilde variants). The source of truth for the multi-byte key decode; frozen.
@@ -73,7 +73,7 @@ export const SEQUENCE_NAMES: Readonly<Record<string, string>> = Object.freeze({
 })
 
 /**
- * The control BYTE (or CRLF pair) → key descriptor table {@link import('./helpers.js').parseKey}
+ * Holds the control BYTE (or CRLF pair) → key descriptor table {@link import('./helpers.js').parseKey}
  * consults for the one-byte keys and the two-byte CRLF Enter chunk. Each entry carries the
  * canonical `name` and whether it is a `ctrl` combination. The source of truth for that decode;
  * frozen.
@@ -105,13 +105,13 @@ export const CONTROL_NAMES: Readonly<
 
 // === Prompt defaults
 
-/** The default mask glyph {@link import('./helpers.js').createPasswordState} uses — `*`. */
+/** Names the default mask glyph {@link import('./helpers.js').createPasswordState} uses — `*`. */
 export const DEFAULT_MASK = '*'
 
 // === Prompt-view icons
 
 /**
- * The six default glyphs {@link DEFAULT_PROMPT_THEME} assembles its `icons` from. Read only when
+ * Holds the six default glyphs {@link DEFAULT_PROMPT_THEME} assembles its `icons` from. Read only when
  * the default theme is assembled; a view reads its resolved theme and never this constant. Frozen.
  *
  * @remarks
@@ -132,7 +132,7 @@ export const PROMPT_ICONS = Object.freeze({
 // === The default prompt theme
 
 /**
- * Every {@link import('./types.js').PromptRole}, in one frozen list — the role axis's source of
+ * Holds every {@link import('./types.js').PromptRole}, in one frozen list — the role axis's source of
  * truth. {@link import('./helpers.js').createPromptTheme} walks it to merge a partial theme, and
  * a consumer building a complete role map reads it rather than retyping every name.
  */
@@ -151,7 +151,7 @@ export const PROMPT_ROLES: readonly PromptRole[] = Object.freeze([
 ])
 
 /**
- * The {@link import('./types.js').PromptTheme} every prompt renders with unless its options supply
+ * Holds the {@link import('./types.js').PromptTheme} every prompt renders with unless its options supply
  * another — the glyph set assembled from {@link PROMPT_ICONS} plus the console
  * {@link import('@orkestrel/console').STATUS_ICONS} `success` / `error` marks, and the console
  * {@link import('@orkestrel/console').Style} each role is painted with. Deeply frozen through the
@@ -191,37 +191,37 @@ export const DEFAULT_PROMPT_THEME: PromptTheme = Object.freeze({
 	}),
 })
 
-// === Broker + SSE-bridge defaults (T-b)
+// === Broker + SSE-bridge defaults
 
-/** How long (ms) the {@link import('./types.js').PromptInterface} broker parks an unanswered prompt before it expires — 5 minutes. */
+/** Holds how long (ms) the {@link import('./types.js').PromptInterface} broker parks an unanswered prompt before it expires — 5 minutes. */
 export const DEFAULT_PROMPT_TIMEOUT_MS = 300_000
 
-/** How long (ms) the {@link import('./types.js').PromptClientInterface} waits before each reconnect attempt — 2 seconds. */
+/** Holds how long (ms) the {@link import('./types.js').PromptClientInterface} waits before each reconnect attempt — 2 seconds. */
 export const DEFAULT_RECONNECT_DELAY_MS = 2_000
 
 /**
- * The SSE `event:` names the broker emits and the {@link import('./types.js').PromptClientInterface}
+ * Holds the SSE `event:` names the broker emits and the {@link import('./types.js').PromptClientInterface}
  * dispatches on. Frozen; the source of truth for the wire event vocabulary.
  *
  * @remarks
  * - `pending` — a serialized {@link import('./types.js').PendingForm} to dispatch and answer.
  * - `expire` — an `{ id }` payload: the broker expired or released a parked prompt (the client drops it).
- * - `shutdown` — the broker is going away; the client disconnects (no auto-reconnect) but stays reusable.
+ * - `destroy` — the broker is going away; the client disconnects (no auto-reconnect) but stays reusable.
  */
 export const SSE_EVENTS = Object.freeze({
 	pending: 'pending',
 	expire: 'expire',
-	shutdown: 'shutdown',
+	destroy: 'destroy',
 })
 
-/** The auth-token request header the {@link import('./types.js').PromptClientInterface} sends. */
+/** Names the auth-token request header the {@link import('./types.js').PromptClientInterface} sends. */
 export const HEADER_TOKEN = 'x-orkestrel-token'
 
-/** The `Accept` header value that opens the broker's SSE stream. */
+/** Names the `Accept` header value that opens the broker's SSE stream. */
 export const ACCEPT_EVENT_STREAM = 'text/event-stream'
 
 /**
- * The maximum number of characters the {@link import('./types.js').PromptClientInterface} lets its
+ * Sets the maximum number of characters the {@link import('./types.js').PromptClientInterface} lets its
  * SSE parser buffer before treating the stream as hostile — 1 MiB, comfortably above any
  * legitimate prompt payload. Passed as the `limit` to `createSSEParser` so an unterminated
  * or oversized `data:` field cannot grow the buffer without bound (a memory-exhaustion guard).
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 00ad2e2..4d33927 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,11 +1,12 @@
 import type { TerminalErrorCode } from './types.js'
 
-// AGENTS §12: a real error type, not a sentinel. Callers branch on the machine-readable
+// `.claude/rules/typescript.md` § Errors and outcomes: a real error type, not a sentinel. Callers
+// branch on the machine-readable
 // `error.code` rather than parsing the message, and the guard narrows with `instanceof`,
 // mirroring the agents-module errors.
 
 /**
- * The error the terminal surfaces for its own refusals: parking on a destroyed or full broker, an
+ * Represents the error the terminal surfaces for its own refusals: parking on a destroyed or full broker, an
  * unusable driver stream, a manager routing fault, or a ctrl-c cancellation. A parked form's own
  * lifecycle failures reject through the form's `answer` with the form package's error, never with
  * this one.
@@ -16,9 +17,9 @@ import type { TerminalErrorCode } from './types.js'
  * a caught value with {@link isTerminalError} and branch on `error.code`.
  */
 export class TerminalError extends Error {
-	/** The machine-readable condition — see {@link TerminalErrorCode}. */
+	/** Holds the machine-readable condition — see {@link TerminalErrorCode}. */
 	readonly code: TerminalErrorCode
-	/** An optional context bag naming the offending values — see the class {@link TerminalError remarks}. */
+	/** Holds an optional context bag naming the offending values — see the class {@link TerminalError remarks}. */
 	readonly context?: Readonly<Record<string, unknown>>
 
 	constructor(
@@ -34,10 +35,10 @@ export class TerminalError extends Error {
 }
 
 /**
- * Narrow an unknown caught value to a {@link TerminalError}.
+ * Narrows an unknown caught value to a {@link TerminalError}.
  *
  * @param value - The value to test (typically a `catch` binding or a rejected prompt call)
- * @returns `true` when `value` is a {@link TerminalError}
+ * @returns True if `value` is a {@link TerminalError}; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/core/index.ts b/src/core/index.ts
index c6afac4..bceaef6 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -7,5 +7,5 @@ export * from './factories.js'
 export * from './Prompt.js'
 export * from './PromptClient.js'
 export * from './TerminalManager.js'
-export * from './MemoryTerminalStore.js'
-export * from './DatabaseTerminalStore.js'
+export * from './stores/MemoryTerminalStore.js'
+export * from './stores/DatabaseTerminalStore.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index 3660917..29e29f5 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,7 +1,7 @@
 import type { JSONRecord, Result } from '@orkestrel/contract'
 import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
-import type { FieldError, FormInterface, FormValues } from '@orkestrel/form'
-import type { Style } from '@orkestrel/console'
+import type { FieldChoice, FieldError, FormInterface, FormValues } from '@orkestrel/form'
+import type { Style, StylerInterface } from '@orkestrel/console'
 
 // The PURE, UNIVERSAL terminal core. `@orkestrel/form` owns every form concept — the schema, the
 // twelve controls, the rules, the values, and the settle-once `answer` promise — and this package
@@ -15,7 +15,7 @@ import type { Style } from '@orkestrel/console'
 // === Key decoding
 
 /**
- * One decoded keypress — the TTY-agnostic representation of a single key, the output of
+ * Represents one decoded keypress — the TTY-agnostic representation of a single key, the output of
  * {@link import('./helpers.js').parseKey}. A driver reads `name` and the modifier flags to decide
  * its transition; `sequence` is preserved so a printable character round-trips and an unknown
  * escape is never lost.
@@ -24,15 +24,15 @@ import type { Style } from '@orkestrel/console'
  * - `name` — the canonical key name: a control or navigation key (`return`, `backspace`, `tab`,
  *   `escape`, `up` / `down` / `left` / `right`, `space`, `home`, `end`, `delete`), a named ctrl
  *   combo (`c` with `ctrl` true for ctrl-c, likewise `d` / `u` / `a` / `e`), or the printable
- *   character itself (`'a'`, `'7'`, `'?'`). An unrecognized sequence yields `name: ''`; the decoder
- *   is total and never throws.
+ *   character itself (`'a'`, `'7'`, `'?'`). An unrecognized sequence carries NO `name` — absence,
+ *   never an empty string — and the decoder stays total and never throws.
  * - `sequence` — the exact input bytes as a string (a `Uint8Array` is decoded UTF-8). The driver
  *   writes this verbatim for a printable key.
  * - `ctrl` / `meta` / `shift` — the modifier flags. `ctrl` is true for a C0 control byte, `meta`
  *   for an ESC-prefixed (Alt) sequence, `shift` for an uppercase-letter printable.
  */
 export interface KeyEvent {
-	readonly name: string
+	readonly name?: string
 	readonly sequence: string
 	readonly ctrl: boolean
 	readonly meta: boolean
@@ -42,7 +42,7 @@ export interface KeyEvent {
 // === Presentation
 
 /**
- * One glyph slot a rendered field draws — the icon axis of a {@link PromptTheme}. A named value
+ * Names one glyph slot a rendered field draws — the icon axis of a {@link PromptTheme}. A named value
  * set, not a toggle, so it stays a union.
  *
  * @remarks
@@ -63,7 +63,7 @@ export type PromptIcon =
 	| 'error'
 
 /**
- * One styling slot a rendered field paints through — the semantic axis of a {@link PromptTheme}. A
+ * Names one styling slot a rendered field paints through — the semantic axis of a {@link PromptTheme}. A
  * role says what a fragment MEANS; the theme decides what that meaning looks like, so a consumer
  * re-maps styled output by naming roles rather than reimplementing a renderer.
  *
@@ -97,7 +97,7 @@ export type PromptRole =
 	| 'description'
 
 /**
- * A resolved PRESENTATION — the glyph for every {@link PromptIcon} and the console {@link Style}
+ * Represents a resolved PRESENTATION — the glyph for every {@link PromptIcon} and the console {@link Style}
  * for every {@link PromptRole}. Plain JSON data with no functions, so it crosses the wire with the
  * form it decorates. Built by {@link import('./helpers.js').createPromptTheme}.
  *
@@ -114,7 +114,7 @@ export interface PromptTheme {
 }
 
 /**
- * The PARTIAL {@link PromptTheme} an option bag carries — every icon and every role is optional,
+ * Represents the PARTIAL {@link PromptTheme} an option bag carries — every icon and every role is optional,
  * and {@link import('./helpers.js').createPromptTheme} merges what is supplied over
  * {@link import('./constants.js').DEFAULT_PROMPT_THEME} leaf by leaf. Supplying one icon or one
  * role leaves every other slot at its default.
@@ -124,17 +124,131 @@ export interface PromptThemeOptions {
 	readonly roles?: Readonly<Partial<Record<PromptRole, Style>>>
 }
 
+// === Reducer state
+
+/**
+ * Represents the immutable state a text field's reducer carries — built by
+ * {@link import('./helpers.js').createInputState}, rendered by
+ * {@link import('./helpers.js').renderInputView}, and advanced by
+ * {@link import('./helpers.js').inputReduce}.
+ *
+ * @remarks
+ * - `message` — the sanitized label the header renders.
+ * - `default` — the declared default a bare return submits.
+ * - `styler` — the console styler every role is painted through.
+ * - `theme` — the resolved {@link PromptTheme}.
+ * - `value` — the characters typed so far.
+ */
+export interface InputState {
+	readonly message: string
+	readonly default: string
+	readonly styler: StylerInterface
+	readonly theme: PromptTheme
+	readonly value: string
+}
+
+/**
+ * Represents the immutable state a password field's reducer carries — the text state with the mask glyph in
+ * place of a default, because a secret is never seeded from the schema.
+ *
+ * @remarks
+ * - `message` — the sanitized label the header renders.
+ * - `mask` — the glyph each typed character renders as.
+ * - `styler` / `theme` — the console styler and the resolved {@link PromptTheme}.
+ * - `value` — the characters typed so far, rendered only as the mask repeated.
+ */
+export interface PasswordState {
+	readonly message: string
+	readonly mask: string
+	readonly styler: StylerInterface
+	readonly theme: PromptTheme
+	readonly value: string
+}
+
+/**
+ * Represents the immutable state a confirm field's reducer carries. It holds no typed value, because the
+ * answer is the key itself.
+ *
+ * @remarks
+ * - `message` — the sanitized label the header renders.
+ * - `default` — the answer a bare return submits, and the letter the view capitalizes.
+ * - `styler` / `theme` — the console styler and the resolved {@link PromptTheme}.
+ */
+export interface ConfirmState {
+	readonly message: string
+	readonly default: boolean
+	readonly styler: StylerInterface
+	readonly theme: PromptTheme
+}
+
+/**
+ * Represents the immutable state a select field's reducer carries.
+ *
+ * @remarks
+ * - `message` — the sanitized label the header renders.
+ * - `choices` — the choices the list offers, in declared order.
+ * - `styler` / `theme` — the console styler and the resolved {@link PromptTheme}.
+ * - `focused` — the index the cursor sits on, pre-placed on the declared default.
+ */
+export interface SelectState {
+	readonly message: string
+	readonly choices: readonly FieldChoice[]
+	readonly styler: StylerInterface
+	readonly theme: PromptTheme
+	readonly focused: number
+}
+
+/**
+ * Represents the immutable state a checkbox field's reducer carries — the select state plus the ticked set.
+ *
+ * @remarks
+ * - `message` — the sanitized label the header renders.
+ * - `choices` — the choices the list offers, in declared order.
+ * - `styler` / `theme` — the console styler and the resolved {@link PromptTheme}.
+ * - `focused` — the index the cursor sits on.
+ * - `checked` — the ticked indices, in the order they were ticked; the reducer sorts them into
+ *   choice order when it submits.
+ */
+export interface CheckboxState {
+	readonly message: string
+	readonly choices: readonly FieldChoice[]
+	readonly styler: StylerInterface
+	readonly theme: PromptTheme
+	readonly focused: number
+	readonly checked: readonly number[]
+}
+
+/**
+ * Represents the immutable state an editor field's reducer carries — the committed lines and the line still
+ * being typed, kept apart so a return commits one without ending the field.
+ *
+ * @remarks
+ * - `message` — the sanitized label the header renders.
+ * - `default` — the text an empty finish falls back to.
+ * - `styler` / `theme` — the console styler and the resolved {@link PromptTheme}.
+ * - `lines` — the lines already committed with a return.
+ * - `current` — the line in progress.
+ */
+export interface EditorState {
+	readonly message: string
+	readonly default: string
+	readonly styler: StylerInterface
+	readonly theme: PromptTheme
+	readonly lines: readonly string[]
+	readonly current: string
+}
+
 // === Reducer output
 
 /**
- * Where one field's reducer stands after a key. `active`: keep asking, because the key was
+ * Names where one field's reducer stands after a key. `active`: keep asking, because the key was
  * consumed or the answer was refused. `submit`: the field resolved with its `value`. `cancel`: the
  * user aborted with ctrl-c. Names its axis, never `kind`.
  */
 export type PromptStatus = 'active' | 'submit' | 'cancel'
 
 /**
- * The result of one reducer step — the next `state`, the rendered `view`, the `status`, and, on
+ * Represents the result of one reducer step — the next `state`, the rendered `view`, the `status`, and, on
  * `submit`, the resolved `value`. The whole contract between a pure reducer and the impure driver:
  * the driver applies the next `state`, writes the `view`, and reads `value` on `submit`.
  *
@@ -159,7 +273,7 @@ export interface PromptStep<T, S> {
 // === Failure codes
 
 /**
- * The machine-readable condition carried by a {@link import('./errors.js').TerminalError} — the
+ * Names the machine-readable condition carried by a {@link import('./errors.js').TerminalError} — the
  * axis a `catch` branches on. Names its axis (the failure condition), never `kind`.
  *
  * @remarks
@@ -191,7 +305,7 @@ export type TerminalErrorCode =
 // === The interactive driver
 
 /**
- * The contract for asking a form of a human at a keyboard — one method, because a form is one
+ * Declares the contract for asking a form of a human at a keyboard — one method, because a form is one
  * question however many fields it holds. The server `Terminal` implements it against a real TTY;
  * a {@link PromptClientInterface} holds one to answer forms parked elsewhere.
  *
@@ -213,7 +327,7 @@ export interface TerminalInterface {
 // === The headless broker
 
 /**
- * The lifecycle status of a parked {@link PendingForm} — where the TICKET stands, which is not
+ * Names the lifecycle status of a parked {@link PendingForm} — where the TICKET stands, which is not
  * where the form stands. A ticket is `pending` until somebody answers it; the form it carries has
  * its own status, and the two are separate facts about separate entities.
  *
@@ -225,7 +339,7 @@ export interface TerminalInterface {
 export type PendingFormStatus = 'pending' | 'answered' | 'expired'
 
 /**
- * One form PARKED by the broker — an id-keyed, wire-safe record of a live form awaiting a remote
+ * Represents one form PARKED by the broker — an id-keyed, wire-safe record of a live form awaiting a remote
  * answer. The value a `pending` listener receives and the broker serializes over SSE to a
  * {@link PromptClientInterface}.
  *
@@ -251,18 +365,18 @@ export interface PendingForm {
 }
 
 /**
- * One injected timer — arms a deadline `callback` to fire after `ms`, returning a
- * {@link TimerCancel} that cancels it. The broker's timeout seam: the default wraps the host
+ * Represents one injected timer — arms a deadline `callback` to fire after `ms`, returning a
+ * {@link TimerCancelFunction} that cancels it. The broker's timeout seam: the default wraps the host
  * `setTimeout` and `clearTimeout`; a test injects a deterministic timer that captures the callback
  * and fires it on demand, with no real time and no global patching.
  */
-export type TimerHandler = (callback: () => void, ms: number) => TimerCancel
+export type TimerHandler = (callback: () => void, ms: number) => TimerCancelFunction
 
-/** Cancel a pending {@link TimerHandler} deadline — idempotent, safe to call after the timer fired. */
-export type TimerCancel = () => void
+/** Cancels a pending {@link TimerHandler} deadline — idempotent, safe to call after the timer fired. */
+export type TimerCancelFunction = () => void
 
 /**
- * One parked form's runtime state inside the broker — the live form, the wire-safe record the
+ * Represents one parked form's runtime state inside the broker — the live form, the wire-safe record the
  * broker exposes, and the cancel for its expiry timer.
  *
  * @remarks
@@ -271,14 +385,14 @@ export type TimerCancel = () => void
  * abandons it and settles the caller's promise through the form's own lifecycle. `pending` is the
  * wire record, whose `status` tracks the ticket.
  */
-export interface Parked {
+export interface ParkedForm {
 	readonly form: FormInterface
 	readonly pending: PendingForm
-	readonly cancel: TimerCancel
+	readonly cancel: TimerCancelFunction
 }
 
 /**
- * The broker's event map — lean, errors `unknown`, no listener-error event.
+ * Declares the broker's event map — lean, errors `unknown`, no listener-error event.
  *
  * @remarks
  * - `pending` — a form was parked; a transport forwards the wire record to remote clients.
@@ -292,7 +406,7 @@ export type PromptEventMap = {
 }
 
 /**
- * Options for {@link import('./factories.js').createPrompt} and every {@link PromptInterface}
+ * Configures {@link import('./factories.js').createPrompt} and every {@link PromptInterface}
  * broker, including one a {@link TerminalManagerInterface} mounts per endpoint.
  *
  * @remarks
@@ -316,7 +430,7 @@ export interface PromptOptions {
 }
 
 /**
- * The parking envelope — everything the broker needs about a park that the form itself does not
+ * Represents the parking envelope — everything the broker needs about a park that the form itself does not
  * say.
  *
  * @remarks
@@ -329,7 +443,7 @@ export interface ParkRequest {
 }
 
 /**
- * Why {@link PromptInterface.answer} refused. Names its axis with `reason`.
+ * Explains why {@link PromptInterface.answer} refused. Names its axis with `reason`.
  *
  * @remarks
  * - `unknown` — no form is parked under that id, or the one that was has already settled.
@@ -344,7 +458,7 @@ export type AnswerError =
 	| { readonly reason: 'rejected'; readonly errors: readonly FieldError[] }
 
 /**
- * The headless form BROKER — parks a live form until somebody elsewhere answers it. The headless
+ * Declares the headless form BROKER — parks a live form until somebody elsewhere answers it. The headless
  * arm of the local-TTY / headless / remote trio: there is no terminal here, so a transport forwards
  * each `pending` record to whoever can answer, and {@link answer} drives the parked form to
  * settlement.
@@ -389,14 +503,14 @@ export interface PromptInterface {
 // === The SSE bridge
 
 /**
- * A minimal `fetch` — the subset of the global `fetch` a {@link PromptClientInterface} uses: open
+ * Represents a minimal `fetch` — the subset of the global `fetch` a {@link PromptClientInterface} uses: open
  * the SSE stream, POST an answer. Injected so a test drives the client with a scripted `Response`
  * instead of a real network.
  */
 export type FetchHandler = (input: string, init?: FetchInit) => Promise<Response>
 
 /**
- * The request init a {@link PromptClientInterface} passes to its {@link FetchHandler} — the
+ * Represents the request init a {@link PromptClientInterface} passes to its {@link FetchHandler} — the
  * `RequestInit` fields it actually sets.
  */
 export interface FetchInit {
@@ -407,7 +521,7 @@ export interface FetchInit {
 }
 
 /**
- * The client's event map — lean, errors `unknown`, no listener-error event.
+ * Declares the client's event map — lean, errors `unknown`, no listener-error event.
  *
  * @remarks
  * - `connect` — the SSE stream opened.
@@ -425,7 +539,7 @@ export type PromptClientEventMap = {
 }
 
 /**
- * Options for {@link import('./factories.js').createPromptClient} and the
+ * Configures {@link import('./factories.js').createPromptClient} and the
  * {@link PromptClientInterface}.
  *
  * @remarks
@@ -456,7 +570,7 @@ export interface PromptClientOptions {
 }
 
 /**
- * The SSE form BRIDGE — the client-side counterpart to {@link PromptInterface}. It receives
+ * Declares the SSE form BRIDGE — the client-side counterpart to {@link PromptInterface}. It receives
  * serialized {@link PendingForm} records from a remote broker, rebuilds each schema locally, drives
  * it through a {@link TerminalInterface}, and POSTs the answer back, so a human at this machine
  * answers forms a broker parked elsewhere.
@@ -486,7 +600,7 @@ export interface PromptClientInterface {
 // === The terminal manager
 
 /**
- * The manager's event map — the name-attributed re-emission of every mounted broker's events, so a
+ * Declares the manager's event map — the name-attributed re-emission of every mounted broker's events, so a
  * caller subscribes once for ALL endpoints instead of once per broker.
  *
  * @remarks
@@ -501,7 +615,7 @@ export type TerminalManagerEventMap = {
 }
 
 /**
- * Options for {@link import('./factories.js').createTerminalManager} and the
+ * Configures {@link import('./factories.js').createTerminalManager} and the
  * {@link TerminalManagerInterface}.
  *
  * @remarks
@@ -520,31 +634,34 @@ export interface TerminalManagerOptions {
 }
 
 /**
- * Why a {@link TerminalManagerInterface.answer} call refused — an {@link AnswerError} from the
+ * Explains why a {@link TerminalManagerInterface.answer} call refused — an {@link AnswerError} from the
  * endpoint's own broker, or `terminal` when no endpoint is mounted under that name. One
  * discriminant, `reason`, across both.
  */
 export type TerminalAnswerError = AnswerError | { readonly reason: 'terminal' }
 
 /**
- * The multi-endpoint terminal MANAGER — a registry of named {@link PromptInterface} brokers, one
- * per endpoint, so several parties (agents, tools, humans) can ask forms of each other BY NAME,
- * attributed with a `from` → `to` edge on every parked record.
+ * Declares a registry of named {@link PromptInterface} brokers, one per endpoint, so several
+ * parties (agents, tools, humans) can ask forms of each other BY NAME, attributed with a
+ * `from` → `to` edge on every parked record.
  *
  * @remarks
  * - **Accessors.** `terminal(name)` looks up one endpoint's broker; `terminals()` lists every
- *   mounted endpoint name.
+ *   mounted broker, in insertion order. `terminals()` returns brokers, not keys; a name is an
+ *   argument the `terminal`, `add`, `ask`, `pending`, `answer`, `open`, `save`, and `remove`
+ *   methods take.
  * - **`add`** mints, or returns, the broker for `name`. Idempotent; it never clobbers a live
  *   endpoint.
- * - **`ask`** is the attributed convenience: it parks `form` from `from` to `to`, adding `to` if it
- *   is absent, and resolves with the settled values.
+ * - **`ask`** is the attributed convenience: it parks `form` from `from` to `to` and resolves with
+ *   the settled values. It never mounts `to` — an unmounted target rejects with a
+ *   {@link import('./errors.js').TerminalError} coded `TARGET`, so `add` the endpoint first.
  * - **`pending()`** lists every endpoint's parked records; `pending(to)` scopes to one endpoint.
  * - **`answer`** routes to the named endpoint's broker.
  * - **`open`** restores, or returns the live, broker for `name` from the `store`.
  * - **`save`** persists an endpoint's config snapshot; false when there is no store, or `name` is
  *   unknown.
- * - **Batch `remove`.** The array overload is declared FIRST: `remove(names)` removes each listed
- *   endpoint and reports whether any named terminal was removed; `remove(name)` removes one;
+ * - **Batch `remove`.** The array overload is declared FIRST: `remove(names)` removes every listed
+ *   endpoint and reports true only when all of them were mounted; `remove(name)` removes one;
  *   `remove()` removes every endpoint without destroying the manager.
  * - **`destroy`** tears down every broker, then the manager's own emitter.
  */
@@ -552,7 +669,7 @@ export interface TerminalManagerInterface {
 	readonly emitter: EmitterInterface<TerminalManagerEventMap>
 	readonly count: number
 	terminal(name: string): PromptInterface | undefined
-	terminals(): readonly string[]
+	terminals(): readonly PromptInterface[]
 	add(name: string, options?: PromptOptions): PromptInterface
 	ask(from: string, to: string, form: FormInterface): Promise<FormValues>
 	pending(): readonly PendingForm[]
@@ -569,10 +686,10 @@ export interface TerminalManagerInterface {
 // === Transport-neutral wire seam
 
 /**
- * One SSE-shaped wire frame — the `event` name, its already-stringified `data` payload, and an
+ * Represents one SSE-shaped wire frame — the `event` name, its already-stringified `data` payload, and an
  * optional `id`. The transport-neutral shape {@link import('./helpers.js').serializePending},
  * {@link import('./helpers.js').serializeExpire}, and
- * {@link import('./helpers.js').serializeShutdown} build, with no `http` dependency.
+ * {@link import('./helpers.js').serializeDestroy} build, with no `http` dependency.
  */
 export interface WireEvent {
 	readonly event: string
@@ -583,7 +700,7 @@ export interface WireEvent {
 // === Terminal store
 
 /**
- * One endpoint's persisted CONFIG snapshot — `id` is the endpoint name and `timeout` its configured
+ * Represents one endpoint's persisted CONFIG snapshot — `id` is the endpoint name and `timeout` its configured
  * default. Parked forms are process-bound and are never resurrected, so `open` always restores an
  * EMPTY broker.
  */
@@ -593,7 +710,7 @@ export interface TerminalSnapshot {
 }
 
 /**
- * One opaque persisted row — the shape a `TableInterface<TerminalSnapshotRow>`-backed store reads
+ * Represents one opaque persisted row — the shape a `TableInterface<TerminalSnapshotRow>`-backed store reads
  * and writes. `snapshot` is narrowed with {@link import('./validators.js').isTerminalSnapshot} on
  * read.
  */
@@ -603,7 +720,7 @@ export interface TerminalSnapshotRow {
 }
 
 /**
- * The point-access persistence seam for a {@link TerminalManagerInterface}'s endpoint configs.
+ * Declares the point-access persistence seam for a {@link TerminalManagerInterface}'s endpoint configs.
  * Every primitive is async; deleting an absent id is a no-op.
  */
 export interface TerminalStoreInterface {
diff --git a/src/server/constants.ts b/src/server/constants.ts
index b5e34d7..6d86fb4 100644
--- a/src/server/constants.ts
+++ b/src/server/constants.ts
@@ -7,59 +7,59 @@
 
 import type { FieldControl } from '@orkestrel/form'
 
-/** The Escape byte (ESC, U+001B) — the lead byte of every CSI cursor-control sequence below. */
+/** Names the Escape byte (ESC, U+001B) — the lead byte of every CSI cursor-control sequence below. */
 export const ESCAPE = String.fromCharCode(27)
 
-/** The Control Sequence Introducer (`ESC[`) — the prefix of every cursor / erase sequence. */
+/** Names the Control Sequence Introducer (`ESC[`) — the prefix of every cursor / erase sequence. */
 export const CSI = `${ESCAPE}[`
 
 /**
- * The cursor-UP sequence TEMPLATE (`ESC[{count}A`) — {@link import('./helpers.js').moveUp}
+ * Holds the cursor-UP sequence TEMPLATE (`ESC[{count}A`) — {@link import('./helpers.js').moveUp}
  * interpolates the `{count}` placeholder with the number of lines to climb. Kept as a template so
  * the count stays out of the constant.
  */
 export const CSI_UP = `${CSI}{count}A`
 
 /**
- * Hide the cursor (`ESC[?25l`) — written before the driver starts redrawing a prompt so the cursor
+ * Hides the cursor (`ESC[?25l`) — written before the driver starts redrawing a prompt so the cursor
  * does not flicker across the view during an in-place re-render; paired with {@link CURSOR_SHOW}.
  */
 export const CURSOR_HIDE = `${CSI}?25l`
 
-/** Show the cursor (`ESC[?25h`) — restores the cursor after a prompt resolves / cancels (the {@link CURSOR_HIDE} pair). */
+/** Shows the cursor (`ESC[?25h`) — restores the cursor after a prompt resolves / cancels (the {@link CURSOR_HIDE} pair). */
 export const CURSOR_SHOW = `${CSI}?25h`
 
 /**
- * Erase from the cursor down to the end of the screen (`ESC[J`) — wipes the WHOLE previous (possibly
+ * Erases from the cursor down to the end of the screen (`ESC[J`) — wipes the WHOLE previous (possibly
  * multi-line `select` / `checkbox`) view in one write before the new view is rendered, so a redraw
  * never leaves orphaned rows below.
  */
 export const CLEAR_DOWN = `${CSI}J`
 
-/** A carriage return (`\r`, U+000D) — returns the cursor to column 0 so a redraw starts at the line's left edge. */
+/** Names the carriage return byte (`\r`, U+000D) — returns the cursor to column 0 so a redraw starts at the line's left edge. */
 export const CARRIAGE_RETURN = String.fromCharCode(13)
 
-/** A line feed (`\n`, U+000A) — the line terminator the driver writes after the final committed prompt view. */
+/** Names the line feed byte (`\n`, U+000A) — the line terminator the driver writes after the final committed prompt view. */
 export const LINE_FEED = String.fromCharCode(10)
 
 /**
- * The numbered-list prompt the non-TTY {@link import('./Terminal.js').Terminal} `select` fallback
+ * Holds the numbered-list prompt the non-TTY {@link import('./Terminal.js').Terminal} `select` fallback
  * appends — a piped (non-terminal) stream cannot navigate with arrow keys, so the choices are
  * printed numbered and the user types one number on a single readline line.
  */
 export const FALLBACK_SELECT_HINT = 'Enter a number'
 
-/** The comma-separated multi-select hint the non-TTY `checkbox` fallback shows (the user types one or more numbers). */
+/** Holds the comma-separated multi-select hint the non-TTY `checkbox` fallback shows (the user types one or more numbers). */
 export const FALLBACK_CHECKBOX_HINT = 'Enter numbers separated by commas'
 
-/** The hint the non-TTY `editor` fallback shows — a piped stream has no ctrl-d, so end of input finishes the block. */
+/** Holds the hint the non-TTY `editor` fallback shows — a piped stream has no ctrl-d, so end of input finishes the block. */
 export const FALLBACK_EDITOR_HINT = '(end of input finishes)'
 
-/** The hint the non-TTY `confirm` fallback shows — a piped stream sends a whole line, so the answer is typed rather than pressed. */
+/** Holds the hint the non-TTY `confirm` fallback shows — a piped stream sends a whole line, so the answer is typed rather than pressed. */
 export const FALLBACK_CONFIRM_HINT = '(y/n)'
 
 /**
- * The format cue appended to a field's label for each control the walk reads as a line of text —
+ * Holds the format cue appended to a field's label for each control the walk reads as a line of text —
  * the terminal has no date picker, no color well, and no file chooser, so the accepted shape is
  * stated instead. A control with no entry needs none: `text` and `editor` accept any line,
  * `password` masks one, and `confirm`, `select`, and `checkbox` are answered by key rather than by
@@ -74,20 +74,20 @@ export const CONTROL_HINTS: Readonly<Partial<Record<FieldControl, string>>> = Ob
 	file: '(path)',
 })
 
-/** The instruction a `file` field with `multiple` shows before its entries — one path per line, and a blank line ends the list. */
+/** Holds the instruction a `file` field with `multiple` shows before its entries — one path per line, and a blank line ends the list. */
 export const FILE_HINT = 'One path per line, blank to finish'
 
-/** The lead on the line listing an open `select`'s offered values, which a typed answer may ignore. */
+/** Holds the lead on the line listing an open `select`'s offered values, which a typed answer may ignore. */
 export const SUGGESTION_LEAD = 'Suggestions'
 
-/** The lead on the line listing the choices a `select` or `checkbox` shows but refuses, so a reader sees why one is missing from the list below. */
+/** Holds the lead on the line listing the choices a `select` or `checkbox` shows but refuses, so a reader sees why one is missing from the list below. */
 export const UNAVAILABLE_LEAD = 'Unavailable'
 
-/** The mark on a locked field's line — the walk renders its value and moves on, because the form refuses an edit there. */
+/** Holds the mark on a locked field's line — the walk renders its value and moves on, because the form refuses an edit there. */
 export const LOCKED_MARK = '(locked)'
 
 /**
- * What a field is told when the walk read an answer the control cannot hold — a word typed into a
+ * States what a field is told when the walk read an answer the control cannot hold — a word typed into a
  * `number`, an off-list value typed into an open `select` whose choice is refused. The value binds
  * as absence and this message is invalidated onto the field, so the walk re-asks it with the reason
  * on screen.
diff --git a/src/server/types.ts b/src/server/types.ts
index 0aaf9f4..269484e 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -8,7 +8,7 @@
 import type { PromptThemeOptions } from '@src/core'
 
 /**
- * The minimal input-stream shape the driver reads — exactly the slice of a Node `tty.ReadStream` /
+ * Represents the minimal input-stream shape the driver reads — exactly the slice of a Node `tty.ReadStream` /
  * `process.stdin` it touches, and no more. A {@link TerminalOptions} `input` is narrowed to this
  * through {@link import('./helpers.js').isInputStream}, never an assertion, so a test drives a whole
  * form with a hand-built fake stream that emits scripted key chunks, never touches the real
@@ -36,7 +36,7 @@ export interface InputStreamInterface {
 }
 
 /**
- * The minimal output-stream shape the driver writes — exactly the slice of a Node `tty.WriteStream`
+ * Represents the minimal output-stream shape the driver writes — exactly the slice of a Node `tty.WriteStream`
  * / `process.stdout` it touches. A {@link TerminalOptions} `output` is narrowed to this through
  * {@link import('./helpers.js').isOutputStream}, never an assertion, so a test records every byte
  * the walk renders and asserts the rendered content with the ANSI stripped.
@@ -54,7 +54,7 @@ export interface OutputStreamInterface {
 }
 
 /**
- * Options for {@link import('./factories.js').createTerminal} — every member optional, so a bare
+ * Configures {@link import('./factories.js').createTerminal} — every member optional, so a bare
  * `createTerminal()` walks a form over the real `process.stdin` / `process.stdout` with the default
  * theme.
  *
```
