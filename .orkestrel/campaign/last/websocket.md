# Last changes: websocket

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `4f59e55`, merge base with `origin/main` `d36bac4`, layer L2, declared version 0.0.10, registry version 0.0.10.

## Commits since origin/main

```text
5480432 2026-08-28 Update every dependency to the published latest
7cbfde2 2026-08-28 Adopt the catalog and guide mirrors for the wave
276a08e 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
6bdb626 2026-09-01 Adopt the renamed guide helpers in the parity test
1f06c29 2026-09-02 Type the websocket refusals and drop the unused message types
abcf675 2026-09-02 Name the websocket refusals by fault and place the coercers and guards
ce8a22a 2026-09-02 Point the README at the guide the package ships
4f59e55 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md            |  17 +--
 README.md                              |   2 +-
 package.json                           |   6 +-
 src/server/NodeWebSocket.ts            |  63 ++++++----
 src/server/constants.ts                |  44 +++----
 src/server/errors.ts                   |  78 ++++++++++++
 src/server/factories.ts                |   3 +-
 src/server/helpers.ts                  | 230 ++++-------------------------------
 src/server/index.ts                    |   3 +
 src/server/parsers.ts                  | 134 +++++++++++++++++++++
 src/server/types.ts                    |  56 ++++-----
 src/server/validators.ts               |  74 ++++++++++++
 tests/guides.test.ts                   |  22 ++--
 tests/src/server/NodeWebSocket.test.ts |  58 +++++++--
 tests/src/server/helpers.test.ts       | 478 ++++---------------------------------------------------------------------
 tests/src/server/parsers.test.ts       | 415 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 tests/src/server/validators.test.ts    |  58 +++++++++
 17 files changed, 964 insertions(+), 777 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/server/constants.ts b/src/server/constants.ts
index 38916c4..d11340c 100644
--- a/src/server/constants.ts
+++ b/src/server/constants.ts
@@ -7,7 +7,7 @@ import type { WebSocketReadyState } from './types.js'
 // `NodeWebSocket` wrapper read them by name rather than re-spelling the bit values.
 
 /**
- * The RFC 6455 GUID concatenated to a client's `Sec-WebSocket-Key` before the SHA-1
+ * Names the RFC 6455 GUID concatenated to a client's `Sec-WebSocket-Key` before the SHA-1
  * hash that yields the `Sec-WebSocket-Accept` response value.
  *
  * @remarks
@@ -16,65 +16,65 @@ import type { WebSocketReadyState } from './types.js'
  */
 export const WEBSOCKET_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
 
-/** The WebSocket protocol version this wrapper speaks (`Sec-WebSocket-Version: 13`). */
+/** Names the WebSocket protocol version this wrapper speaks (`Sec-WebSocket-Version: 13`). */
 export const WEBSOCKET_VERSION = '13'
 
-/** Text frame opcode — a UTF-8 payload (RFC 6455 §5.6). */
+/** Names the text frame opcode — a UTF-8 payload (RFC 6455 §5.6). */
 export const WEBSOCKET_OPCODE_TEXT = 0x01
 
-/** Binary frame opcode — a raw byte payload (RFC 6455 §5.6). */
+/** Names the binary frame opcode — a raw byte payload (RFC 6455 §5.6). */
 export const WEBSOCKET_OPCODE_BINARY = 0x02
 
-/** Continuation frame opcode — the next fragment of an open data message (RFC 6455 §5.4). */
+/** Names the continuation frame opcode — the next fragment of an open data message (RFC 6455 §5.4). */
 export const WEBSOCKET_OPCODE_CONTINUATION = 0x00
 
-/** Close frame opcode — a control frame ending the connection (RFC 6455 §5.5.1). */
+/** Names the close frame opcode — a control frame ending the connection (RFC 6455 §5.5.1). */
 export const WEBSOCKET_OPCODE_CLOSE = 0x08
 
-/** Ping frame opcode — a control frame the peer must answer with a pong (RFC 6455 §5.5.2). */
+/** Names the ping frame opcode — a control frame the peer must answer with a pong (RFC 6455 §5.5.2). */
 export const WEBSOCKET_OPCODE_PING = 0x09
 
-/** Pong frame opcode — a control frame answering a ping (RFC 6455 §5.5.3). */
+/** Names the pong frame opcode — a control frame answering a ping (RFC 6455 §5.5.3). */
 export const WEBSOCKET_OPCODE_PONG = 0x0a
 
-/** Ready state for a connecting WebSocket (before the handshake completes). */
+/** Names the ready state for a connecting WebSocket (before the handshake completes). */
 export const WEBSOCKET_READY_CONNECTING: WebSocketReadyState = 0
 
-/** Ready state for an open WebSocket (the handshake completed; frames flow). */
+/** Names the ready state for an open WebSocket (the handshake completed; frames flow). */
 export const WEBSOCKET_READY_OPEN: WebSocketReadyState = 1
 
-/** Ready state for a closing WebSocket (a close frame was sent or received). */
+/** Names the ready state for a closing WebSocket (a close frame was sent or received). */
 export const WEBSOCKET_READY_CLOSING: WebSocketReadyState = 2
 
-/** Ready state for a closed WebSocket (the socket ended). */
+/** Names the ready state for a closed WebSocket (the socket ended). */
 export const WEBSOCKET_READY_CLOSED: WebSocketReadyState = 3
 
-/** Normal-closure status code (RFC 6455 §7.4.1) — the default `close` code. */
+/** Names the normal-closure status code (RFC 6455 §7.4.1) — the default `close` code. */
 export const WEBSOCKET_CLOSE_NORMAL = 1000
 
-/** Protocol-error status code (RFC 6455 §7.4.1) — a framing/state rule was violated. */
+/** Names the protocol-error status code (RFC 6455 §7.4.1) — a framing/state rule was violated. */
 export const WEBSOCKET_CLOSE_PROTOCOL = 1002
 
-/** Unsupported-data status code (RFC 6455 §7.4.1) — the endpoint received a data type it cannot accept (e.g. binary on a text-only endpoint). */
+/** Names the unsupported-data status code (RFC 6455 §7.4.1) — the endpoint received a data type it cannot accept (e.g. binary on a text-only endpoint). */
 export const WEBSOCKET_CLOSE_UNSUPPORTED = 1003
 
-/** Invalid-frame-payload-data status code (RFC 6455 §7.4.1) — e.g. non-UTF-8 text or an unparseable close reason. */
+/** Names the invalid-frame-payload-data status code (RFC 6455 §7.4.1) — e.g. non-UTF-8 text or an unparseable close reason. */
 export const WEBSOCKET_CLOSE_INVALID = 1007
 
-/** Message-too-big status code (RFC 6455 §7.4.1) — a reassembled message exceeded the payload cap. */
+/** Names the message-too-big status code (RFC 6455 §7.4.1) — a reassembled message exceeded the payload cap. */
 export const WEBSOCKET_CLOSE_TOOBIG = 1009
 
-/** The default maximum inbound single-frame length AND reassembled-message total byte count (100 MiB — the `ws` package default). */
+/** Names the default maximum inbound single-frame length AND reassembled-message total byte count (100 MiB — the `ws` package default). */
 export const WEBSOCKET_MAX_PAYLOAD = 104_857_600
 
-/** The default close-handshake timeout in milliseconds — how long `close()` waits for the peer's echo before tearing the socket down. */
+/** Names the default close-handshake timeout in milliseconds — how long `close()` waits for the peer's echo before tearing the socket down. */
 export const WEBSOCKET_CLOSE_TIMEOUT_MS = 30_000
 
-/** The post-`#fail` flush grace in milliseconds — how long a validation-breach close frame is given to flush through the socket's write buffer before the hard `destroy()` fallback fires (the normal path destroys sooner, on the `end()` flush callback). */
+/** Names the post-`#fail` flush grace in milliseconds — how long a validation-breach close frame is given to flush through the socket's write buffer before the hard `destroy()` fallback fires (the normal path destroys sooner, on the `end()` flush callback). */
 export const WEBSOCKET_FAIL_TIMEOUT_MS = 1_000
 
-/** The maximum control-frame payload length in bytes (RFC 6455 §5.5). */
+/** Names the maximum control-frame payload length in bytes (RFC 6455 §5.5). */
 export const WEBSOCKET_CONTROL_MAXLEN = 125
 
-/** The maximum UTF-8 close-reason length after the two-byte status code. */
+/** Names the maximum UTF-8 close-reason length after the two-byte status code. */
 export const WEBSOCKET_CLOSE_REASON_MAXLEN = WEBSOCKET_CONTROL_MAXLEN - 2
diff --git a/src/server/errors.ts b/src/server/errors.ts
new file mode 100644
index 0000000..8bd3ab3
--- /dev/null
+++ b/src/server/errors.ts
@@ -0,0 +1,78 @@
+import type { WebSocketErrorCode } from './types.js'
+
+// Errors for the WebSocket wrapper. A single `WebSocketError` carries a
+// machine-readable `code` naming the subject that was refused, so a `catch` branches
+// on `error.code` rather than parsing a message. Every refusal is a caller-supplied
+// value the RFC 6455 wire protocol cannot carry — a malformed option, an over-cap
+// control payload, an unsendable close code, an unrepresentable frame header — and
+// each throws before it writes a byte: an OPTION before the wrapper assumes ownership
+// of the socket, a LIMIT and a CLOSE without writing a frame or moving `readyState`,
+// and a FRAME out of the pure encoder, which touches no socket. A PEER's protocol
+// violation is not an error: it closes the connection with the matching
+// `WEBSOCKET_CLOSE_*` status code instead (AGENTS §12).
+
+/**
+ * Represents an error thrown by the WebSocket wrapper for a refused caller-supplied value.
+ *
+ * @remarks
+ * Carries a {@link WebSocketErrorCode} and an optional `context` record holding the
+ * refused value under a key naming it: an `'OPTION'` carries the offending option
+ * (`payload`, `timeout`, `key`, or `protocol`), a `'LIMIT'` carries `size` and the
+ * `limit` it exceeded, a `'CLOSE'` carries the refused close `code`, and a `'FRAME'`
+ * carries `opcode` or the mask's `size`. Narrow a caught value with
+ * {@link isWebSocketError}.
+ *
+ * @example
+ * ```ts
+ * import { createNodeWebSocket, isWebSocketError } from '@src/server'
+ *
+ * try {
+ * 	createNodeWebSocket({ socket, key: 'not-base64' })
+ * } catch (error) {
+ * 	if (isWebSocketError(error) && error.code === 'OPTION') socket.destroy()
+ * }
+ * ```
+ */
+export class WebSocketError extends Error {
+	readonly code: WebSocketErrorCode
+	readonly context?: Readonly<Record<string, unknown>>
+
+	/**
+	 * Creates a WebSocket error carrying a machine-readable code.
+	 *
+	 * @param code - The machine-readable {@link WebSocketErrorCode} a `catch` branches on
+	 * @param message - The human-readable description, carried as the `Error` message
+	 * @param context - The refused value keyed by name; omitted leaves `context` `undefined`
+	 */
+	constructor(
+		code: WebSocketErrorCode,
+		message: string,
+		context?: Readonly<Record<string, unknown>>,
+	) {
+		super(message)
+		this.name = 'WebSocketError'
+		this.code = code
+		if (context !== undefined) this.context = context
+	}
+}
+
+/**
+ * Checks whether a value is a {@link WebSocketError}.
+ *
+ * @param value - The value to test (typically a `catch` binding)
+ * @returns True if `value` is a `WebSocketError`; false otherwise
+ *
+ * @example
+ * ```ts
+ * import { isWebSocketError } from '@src/server'
+ *
+ * try {
+ * 	ws.close(1000.5)
+ * } catch (error) {
+ * 	if (isWebSocketError(error) && error.code === 'CLOSE') ws.close()
+ * }
+ * ```
+ */
+export function isWebSocketError(value: unknown): value is WebSocketError {
+	return value instanceof WebSocketError
+}
diff --git a/src/server/index.ts b/src/server/index.ts
index d8c5e8a..78abdd3 100644
--- a/src/server/index.ts
+++ b/src/server/index.ts
@@ -1,5 +1,8 @@
 export * from './types.js'
 export * from './constants.js'
+export * from './errors.js'
 export * from './helpers.js'
+export * from './parsers.js'
+export * from './validators.js'
 export * from './factories.js'
 export * from './NodeWebSocket.js'
diff --git a/src/server/types.ts b/src/server/types.ts
index 2bed9b5..f8243e0 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -18,7 +18,7 @@ import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkes
 // === Ready state
 
 /**
- * A WebSocket ready state — the four browser-compatible lifecycle values.
+ * Represents a WebSocket ready state — the four browser-compatible lifecycle values.
  *
  * @remarks
  * `0` connecting, `1` open, `2` closing, `3` closed — the same numbering the DOM
@@ -27,13 +27,10 @@ import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkes
  */
 export type WebSocketReadyState = 0 | 1 | 2 | 3
 
-/** A WebSocket close status code (RFC 6455 §7.4) — e.g. `WEBSOCKET_CLOSE_NORMAL` (1000). */
-export type WebSocketCloseCode = number
-
 // === Frame
 
 /**
- * A parsed RFC 6455 frame — the structured result of decoding one frame off the wire.
+ * Represents a parsed RFC 6455 frame — the structured result of decoding one frame off the wire.
  *
  * @remarks
  * `fin` is the final-fragment bit (false for a continued fragment); `opcode`
@@ -56,7 +53,7 @@ export interface WebSocketFrame {
 }
 
 /**
- * Options for {@link encodeWebSocketFrame} — how a frame is masked on the wire.
+ * Represents the options for {@link encodeWebSocketFrame} — how a frame is masked on the wire.
  *
  * @remarks
  * `masked` toggles the mask bit (server→client frames are NOT masked, the default;
@@ -69,36 +66,34 @@ export interface WebSocketEncodeOptions {
 	readonly mask?: Buffer
 }
 
-// === Message + close
-
-/** A decoded text message received from, or to send to, a WebSocket peer. */
-export interface WebSocketMessage {
-	readonly data: string
-}
+// === Errors
 
 /**
- * The metadata of a closed WebSocket — why the connection ended.
+ * Represents the subject an {@link import('./errors.js').WebSocketError} names as refused.
  *
  * @remarks
- * `code` is the RFC 6455 close status code (undefined when the peer closed with no
- * payload); `reason` is the optional UTF-8 reason text (undefined when empty).
+ * `OPTION` — a {@link NodeWebSocketOptions} member was refused at construction
+ * (`payload`, `timeout`, `key`, `protocol`, or a `protocol` given without a server
+ * `key`). `LIMIT` — an outbound control-frame payload exceeded its RFC 6455 §5.5 cap
+ * (`ping` data past `WEBSOCKET_CONTROL_MAXLEN`, a `close` reason past
+ * `WEBSOCKET_CLOSE_REASON_MAXLEN`). `CLOSE` — a close status code `isCloseCode` refuses
+ * was passed to `close`. `FRAME` — an `encodeWebSocketFrame` frame-header argument was
+ * refused (an opcode outside the four-bit wire field, a mask that is not 4 bytes, or a
+ * mask supplied without `masked: true`).
  */
-export interface WebSocketClose {
-	readonly code: number | undefined
-	readonly reason: string | undefined
-}
+export type WebSocketErrorCode = 'OPTION' | 'LIMIT' | 'CLOSE' | 'FRAME'
 
 // === Events
 
 /**
- * The event map of a {@link NodeWebSocketInterface} (AGENTS §13).
+ * Represents the event map of a {@link NodeWebSocketInterface} (AGENTS §13).
  *
  * @remarks
  * `open` — the handshake completed and the socket is ready. `message` — a text frame
- * arrived (its decoded UTF-8 string). `close` — the connection ended (its
- * {@link WebSocketClose} metadata). `error` — the underlying socket faulted (a DOMAIN
- * event and then terminates the wrapper). `ping` / `pong` — a control frame arrived
- * (a ping is auto-answered with a pong).
+ * arrived (its decoded UTF-8 string). `close` — the connection ended, carrying the
+ * labeled `[code, reason]` tuple (each `undefined` when the peer sent none). `error` —
+ * the underlying socket faulted (a DOMAIN event and then terminates the wrapper).
+ * `ping` / `pong` — a control frame arrived (a ping is auto-answered with a pong).
  * Listener isolation is the emitter's (AGENTS §13): a listener throw is routed to the
  * emitter's `error` handler (the `error` option), never onto this map, so a buggy observer
  * never breaks the socket.
@@ -115,7 +110,7 @@ export type NodeWebSocketEventMap = {
 // === Options
 
 /**
- * Options for `createNodeWebSocket`.
+ * Represents the options for `createNodeWebSocket`.
  *
  * @remarks
  * `socket` is the upgraded `node:stream` Duplex (the raw TCP stream after the HTTP
@@ -133,7 +128,8 @@ export type NodeWebSocketEventMap = {
  * is the external cancellation seam — on abort the socket destroys; composes with the
  * line's `@orkestrel/abort` and `@orkestrel/timeout` primitives, which expose native
  * `AbortSignal`s. An already-aborted signal tears the socket down immediately after
- * construction.
+ * construction. A refused member throws an `OPTION`-coded `WebSocketError` before the
+ * wrapper writes to or assumes ownership of the `socket`.
  */
 export interface NodeWebSocketOptions {
 	readonly socket: Duplex
@@ -141,7 +137,7 @@ export interface NodeWebSocketOptions {
 	readonly head?: Buffer
 	readonly protocol?: string
 	readonly on?: EmitterHooks<NodeWebSocketEventMap>
-	/** The emitter's listener-error handler (AGENTS §13) — a listener throw routes here, not to a domain event. */
+	/** Holds the emitter's listener-error handler (AGENTS §13) — a listener throw routes here, not to a domain event. */
 	readonly error?: EmitterErrorHandler
 	readonly payload?: number
 	readonly timeout?: number
@@ -151,7 +147,7 @@ export interface NodeWebSocketOptions {
 // === Wrapper
 
 /**
- * A server-native WebSocket over a raw upgraded socket — the behavioral contract.
+ * Represents a server-native WebSocket over a raw upgraded socket — the behavioral contract.
  *
  * @remarks
  * Created by `createNodeWebSocket`. In server mode it writes the RFC 6455 handshake
@@ -163,6 +159,10 @@ export interface NodeWebSocketOptions {
  * reason); `destroy` tears the socket down immediately. `readyState` tracks the
  * lifecycle. It owns a typed `emitter` (AGENTS §13) and never throws on a faulty
  * listener — the emitter routes it to its `error` handler (the `error` option).
+ * `ping` throws a `LIMIT`-coded `WebSocketError` when its UTF-8 payload exceeds
+ * `WEBSOCKET_CONTROL_MAXLEN`; `close` throws a `CLOSE`-coded one for a status code
+ * `isCloseCode` refuses and a `LIMIT`-coded one for a reason past
+ * `WEBSOCKET_CLOSE_REASON_MAXLEN`, in each case without changing `readyState`.
  */
 export interface NodeWebSocketInterface {
 	readonly emitter: EmitterInterface<NodeWebSocketEventMap>
```
