# Last changes: server

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `4b53210`, merge base with `origin/main` `abcf771`, layer L3, declared version 0.0.17, registry version 0.0.17.

## Commits since origin/main

```text
418e431 2026-08-28 Update every dependency to the published latest
691a010 2026-08-28 Adopt the catalog and guide mirrors for the wave
a7faf13 2026-08-28 Apply the verified src-audit fixes
2541bd3 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
ba377d4 2026-09-01 Adopt the renamed guide helpers in the parity test
b32615d 2026-09-02 Give the SSE stream a class, type the server refusal, and name the helpers by what they compute
522ed4c 2026-09-02 Spell the server error code STATUS and name the coding selection resolveCoding
bb68ef5 2026-09-02 Point the README at the guide the package ships
de721d9 2026-09-02 Migrate the TSDoc voice to the third person
4b53210 2026-09-02 Give the negotiator's format method its first sentence
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md         |   2 +-
 README.md                           |   4 +-
 package.json                        |   2 +-
 src/server/Negotiator.ts            |  17 ++-
 src/server/Server.ts                |  31 +++---
 src/server/Stream.ts                | 136 ++++++++++++++++++++++++
 src/server/constants.ts             |  78 +++++++-------
 src/server/errors.ts                |  96 ++++++++++++++---
 src/server/factories.ts             |  41 ++++++--
 src/server/helpers.ts               | 434 ++++++++++++++++++++++++++++------------------------------------------------
 src/server/index.ts                 |   1 +
 src/server/types.ts                 | 225 +++++++++++++++++++++++++--------------
 tests/guides.test.ts                |  22 ++--
 tests/setup.ts                      |   2 +-
 tests/setupServer.ts                |  10 +-
 tests/src/server/Negotiator.test.ts |  33 +++++-
 tests/src/server/Server.test.ts     |  28 +++--
 tests/src/server/Stream.test.ts     | 114 ++++++++++++++++++++
 tests/src/server/errors.test.ts     |  49 ++++++++-
 tests/src/server/factories.test.ts  |  51 +++++++--
 tests/src/server/helpers.test.ts    | 178 ++++++++++---------------------
 21 files changed, 968 insertions(+), 586 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/server/constants.ts b/src/server/constants.ts
index 1daa576..d2c6f32 100644
--- a/src/server/constants.ts
+++ b/src/server/constants.ts
@@ -1,18 +1,21 @@
 import type { Encoding } from './types.js'
 
-// The substrate's tunable defaults (AGENTS §5 constants file) — only the
-// constants with a real consumer inside THIS package (AGENTS §21: build
-// against a concrete consumer, not speculatively). Frozen so a consumer can
-// read but never mutate the shared default. Middleware-package-only defaults
-// (rate limiting, CSRF, sessions, static serving, multipart — Appendix A of
-// the proposal) stay OUT of this file; they belong to that package's own
-// `constants.ts`.
+// The substrate's tunable defaults — only the constants with a real consumer
+// inside THIS package (`AGENTS.md` § Design laws: a capability arrives with
+// its first real consumer, never speculatively). Each is frozen or declared
+// readonly, so a consumer reads but never mutates the shared default. The
+// defaults only `@orkestrel/middleware` needs (rate limiting, CSRF, sessions,
+// static serving, multipart) stay OUT of this file; they belong to that
+// package's own `constants.ts`.
 
-/** Default graceful-stop deadline (ms) the server gives in-flight requests on `stop()`. */
+/**
+ * Names the default graceful-stop deadline (ms) the server gives in-flight
+ * requests on `stop()`.
+ */
 export const DEFAULT_DRAIN_MS = 10_000
 
 /**
- * The `Symbol.for`-keyed brand `HTTPError` carries so `isHTTPError` recognizes
+ * Names the `Symbol.for`-keyed brand `HTTPError` carries so `isHTTPError` recognizes
  * an instance thrown by ANOTHER copy of this package (the dual-package
  * hazard — a version-skewed or workspace-linked duplicate install), where
  * `instanceof` alone fails because the two copies' `HTTPError` constructors
@@ -26,11 +29,11 @@ export const DEFAULT_DRAIN_MS = 10_000
  */
 export const HTTP_ERROR_BRAND = Symbol.for('@orkestrel/server.HTTPError')
 
-/** Default maximum request body size (bytes) `readBody` accepts before a 413. */
+/** Names the default maximum request body size (bytes) `readBody` accepts before a 413. */
 export const DEFAULT_BODY_LIMIT = 1_048_576
 
 /**
- * Default maximum DECOMPRESSED request body size (bytes) — the zip-bomb cap
+ * Names the default maximum DECOMPRESSED request body size (bytes) — the zip-bomb cap
  * the body pipeline's byte-counting `TransformStream` enforces when
  * transparently decompressing a `Content-Encoding` request body.
  *
@@ -48,15 +51,16 @@ export const DEFAULT_BODY_LIMIT = 1_048_576
 export const DEFAULT_DECOMPRESSED_LIMIT = 16_777_216
 
 /**
- * The SSE response headers the `openStream` seam always sets.
+ * Holds the SSE response headers a `Stream` always sets on its response.
  *
  * @remarks
  * `text/event-stream` is the media type browsers dispatch as SSE; `no-cache`
  * keeps a proxy from caching the stream; `keep-alive` holds the connection
  * open; `X-Accel-Buffering: no` opts a buffering reverse proxy (nginx) out so
  * events flush promptly rather than batching. Frozen so a consumer can read
- * but never mutate the shared default; `openStream` merges any
- * {@link import('./types.js').StreamOptions.headers} UNDER these.
+ * but never mutate the shared default; a `Stream` merges any
+ * {@link import('./types.js').StreamOptions.headers} OVER these, so a caller
+ * repeating one of these exact keys replaces its value.
  */
 export const SSE_HEADERS: Readonly<Record<string, string>> = Object.freeze({
 	'Content-Type': 'text/event-stream; charset=utf-8',
@@ -66,17 +70,16 @@ export const SSE_HEADERS: Readonly<Record<string, string>> = Object.freeze({
 })
 
 /**
- * The strict charset `isValidRequestId` requires an incoming `X-Request-ID`
+ * Defines the strict charset `isValidRequestId` requires an incoming `X-Request-ID`
  * to match — `^[A-Za-z0-9_-]{1,200}$` — so a CRLF / log-injection / oversized
  * / control-char-bearing incoming id is REJECTED (a fresh id is minted
- * instead) rather than ever riding into a response header or `context.state`
- * (AGENTS §14 totality). Frozen so a consumer can read but never mutate the
- * shared default.
+ * instead) rather than ever riding into a response header or `context.state`.
+ * Frozen so a consumer can read but never mutate the shared default.
  */
 export const REQUEST_ID_PATTERN: Readonly<RegExp> = Object.freeze(/^[A-Za-z0-9_-]{1,200}$/)
 
 /**
- * The set of bare `Content-Type`s `isCompressibleType` treats as
+ * Holds the set of bare `Content-Type`s `isCompressibleType` treats as
  * COMPRESSIBLE, beyond the `text/*` prefix + structured-suffix (`+json` /
  * `+xml`) rules that helper also applies.
  *
@@ -84,26 +87,29 @@ export const REQUEST_ID_PATTERN: Readonly<RegExp> = Object.freeze(/^[A-Za-z0-9_-
  * The text-shaped application types worth compressing (JSON / JavaScript /
  * XML / SVG / WASM / a few document formats) — NOT already-compressed
  * binaries (`image/png`, `image/jpeg`, `video/*`, `application/zip`, a font's
- * `woff2`), which gzip/deflate would only bloat. Frozen so a consumer reads
- * but never mutates the shared default.
+ * `woff2`), which gzip/deflate would only bloat. The declared `ReadonlySet`
+ * withholds `add` / `delete` / `clear` from the shared default, so a consumer
+ * reads it without reaching a mutator.
  */
-export const COMPRESSIBLE_TYPES: ReadonlySet<string> = new Set([
-	'application/json',
-	'application/javascript',
-	'application/xml',
-	'application/xhtml+xml',
-	'application/rss+xml',
-	'application/atom+xml',
-	'application/ld+json',
-	'application/manifest+json',
-	'application/vnd.api+json',
-	'application/wasm',
-	'image/svg+xml',
-	'application/pdf',
-])
+export const COMPRESSIBLE_TYPES: ReadonlySet<string> = Object.freeze(
+	new Set([
+		'application/json',
+		'application/javascript',
+		'application/xml',
+		'application/xhtml+xml',
+		'application/rss+xml',
+		'application/atom+xml',
+		'application/ld+json',
+		'application/manifest+json',
+		'application/vnd.api+json',
+		'application/wasm',
+		'image/svg+xml',
+		'application/pdf',
+	]),
+)
 
 /**
- * The default {@link Encoding} content-codings the substrate offers, in
+ * Lists the default {@link Encoding} content-codings the substrate offers, in
  * PREFERENCE order — `gzip` / `deflate`.
  *
  * @remarks
diff --git a/src/server/errors.ts b/src/server/errors.ts
index 0d6375c..b205b1d 100644
--- a/src/server/errors.ts
+++ b/src/server/errors.ts
@@ -1,10 +1,10 @@
-// AGENTS §12: a handler signals a client-facing fault by throwing an
-// `HTTPError` carrying the HTTP `status` to send; the server's error boundary
-// (§5.3 of the proposal) turns it into a response of that status. Any OTHER
-// throw is a programmer/runtime error → a 500 (its message hidden unless
-// `expose`). The machine-readable field here is the numeric `status` (plus an
-// optional `context` bag) — `MultipartError` is NOT ported here: it moves to
-// the future `@orkestrel/middleware` package with its owner (`createMultipart`).
+// A handler signals a client-facing fault by throwing an `HTTPError` carrying
+// the HTTP `status` to send; the server's error boundary turns it into a
+// response of that status. Any OTHER throw is a programmer/runtime error → a
+// 500 (its message hidden unless `expose`). The machine-readable field here is
+// the numeric `status` (plus an optional `context` bag) — `MultipartError` is
+// NOT declared here: it belongs to `@orkestrel/middleware` with its owner
+// (`createMultipart`).
 //
 // Dual-package hazard: `instanceof HTTPError` fails when the thrown value was
 // constructed by a DIFFERENT copy of this package (version skew, a linked
@@ -16,12 +16,19 @@
 // fields the server's boundary reads off a recognized error (`status`,
 // `message`) — so a foreign-copy instance the guard accepts can never crash
 // the boundary that trusts it.
+//
+// `ServerError` is the other half of the vocabulary and never reaches that
+// boundary: it reports a lifecycle call the CALLER programmed wrong, so it
+// keys on a `ServerErrorCode` rather than a `status`, and `isServerError`
+// narrows it with a plain `instanceof`. No error boundary consumes it across
+// package copies, so it carries no cross-copy brand.
 
+import type { ServerErrorCode } from './types.js'
 import { isNumber, isString } from '@orkestrel/contract'
 import { HTTP_ERROR_BRAND } from './constants.js'
 
 /**
- * An error a handler (or middleware) throws to produce an HTTP response of a
+ * Represents an error a handler (or middleware) throws to produce an HTTP response of a
  * specific status.
  *
  * @remarks
@@ -48,7 +55,7 @@ import { HTTP_ERROR_BRAND } from './constants.js'
 export class HTTPError extends Error {
 	readonly status: number
 	readonly context?: Readonly<Record<string, unknown>>
-	// The cross-copy brand (AGENTS §12 / dual-package hazard) — `isHTTPError`
+	// The cross-copy brand (the dual-package hazard) — `isHTTPError`
 	// reads it structurally when `instanceof` fails across package copies.
 	// Not a public field to set by hand: the constructor is the only writer.
 	readonly [HTTP_ERROR_BRAND] = true
@@ -62,7 +69,7 @@ export class HTTPError extends Error {
 }
 
 /**
- * The {@link HTTPError} thrown when a request body exceeds the body
+ * Represents the {@link HTTPError} thrown when a request body exceeds the body
  * pipeline's size limit — a `413 Content Too Large`.
  *
  * @remarks
@@ -90,11 +97,11 @@ export class ContentTooLargeError extends HTTPError {
 }
 
 /**
- * Narrow an unknown caught value to an {@link HTTPError} (including its
+ * Narrows an unknown caught value to an {@link HTTPError} (including its
  * subclasses, e.g. {@link ContentTooLargeError}).
  *
  * @param value - The value to test (typically a `catch` binding)
- * @returns `true` when `value` is an {@link HTTPError}
+ * @returns True if `value` is an {@link HTTPError}; false otherwise
  *
  * @remarks
  * Tries `instanceof` first, then falls back to a total structural check for
@@ -124,3 +131,68 @@ export function isHTTPError(value: unknown): value is HTTPError {
 	if (!('status' in value) || !('message' in value)) return false
 	return isNumber(value.status) && isString(value.message)
 }
+
+/**
+ * Represents the error the `Server` raises when a lifecycle call cannot run from the
+ * status the entity is in.
+ *
+ * @remarks
+ * Carries a machine-readable {@link ServerErrorCode} and an optional `context`
+ * record naming the offending facts. This is a PROGRAMMER error — the caller
+ * asked for a transition the status machine forbids — so it never reaches the
+ * request error boundary and never carries an HTTP `status`; throw an
+ * {@link HTTPError} for a client-facing fault instead. Narrow a caught value
+ * with {@link isServerError}.
+ *
+ * @example
+ * ```ts
+ * import { ServerError } from '@src/server'
+ *
+ * const error = new ServerError('STATUS', "server cannot start from 'listening'", {
+ * 	status: 'listening',
+ * })
+ * error.code // 'STATUS'
+ * ```
+ */
+export class ServerError extends Error {
+	readonly code: ServerErrorCode
+	readonly context?: Readonly<Record<string, unknown>>
+
+	constructor(code: ServerErrorCode, message: string, context?: Readonly<Record<string, unknown>>) {
+		super(message)
+		this.name = 'ServerError'
+		this.code = code
+		if (context !== undefined) this.context = context
+	}
+}
+
+/**
+ * Narrows an unknown caught value to a {@link ServerError}.
+ *
+ * @param value - The value to test (typically a `catch` binding)
+ * @returns True if `value` is a {@link ServerError}; false otherwise
+ *
+ * @remarks
+ * Recognizes an instance built by THIS copy of the package. A `ServerError`
+ * is raised by a `Server` to the caller that just invoked it, so both sides
+ * hold the same copy and the cross-copy brand {@link isHTTPError} needs has no
+ * consumer here.
+ *
+ * @example
+ * ```ts
+ * import { createServer, isServerError } from '@src/server'
+ * import { createDispatcher } from '@orkestrel/router'
+ *
+ * const server = createServer({ dispatcher: createDispatcher(), state: () => ({}) })
+ * await server.start()
+ * try {
+ * 	await server.start()
+ * } catch (error) {
+ * 	if (isServerError(error)) console.log(error.code) // 'STATUS'
+ * }
+ * await server.stop()
+ * ```
+ */
+export function isServerError(value: unknown): value is ServerError {
+	return value instanceof ServerError
+}
diff --git a/src/server/index.ts b/src/server/index.ts
index 4734cd8..db02045 100644
--- a/src/server/index.ts
+++ b/src/server/index.ts
@@ -5,3 +5,4 @@ export * from './helpers.js'
 export * from './factories.js'
 export * from './Negotiator.js'
 export * from './Server.js'
+export * from './Stream.js'
diff --git a/src/server/types.ts b/src/server/types.ts
index c5446be..bdd05ad 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -1,24 +1,24 @@
 // ============================================================================
-//  The middleware seam + substrate — type definitions (the §5 source of
-//  truth). Two families, both `readonly` per AGENTS §11, both fetch/string-
-//  pure (no `node:*`, no DOM):
+//  The middleware seam + substrate — type definitions, the source of truth for
+//  this half of the package. Two families, both `readonly` (`AGENTS.md`
+//  § Non-negotiable rules), both fetch/string-pure (no `node:*`, no DOM):
 //
 //    1. The middleware seam — {@link MiddlewareContext}, {@link NextFunction},
-//       {@link MiddlewareHandler} — the frozen contract `compose` (U3) wires
-//       together and the future `@orkestrel/middleware` package peer-depends
-//       on. {@link ConnectionInfo} is the adapter-injected per-request fact
+//       {@link MiddlewareHandler} — the frozen contract `compose` wires
+//       together and the `@orkestrel/middleware` package peer-depends on.
+//       {@link Connection} is the adapter-injected per-request fact
 //       slice a consumer's `state` function turns into its `TState`.
 //    2. The shared substrate's data shapes — cookies ({@link CookieOptions}),
 //       tokens ({@link TokenSecret} / {@link TokenOptions}), negotiation
 //       ({@link AcceptEntry} / {@link Encoding} / {@link FormatHandlerMap} /
 //       {@link NegotiatorInterface}), conditional requests ({@link RangeSpec}),
 //       SSE ({@link SSEMessage} / {@link StreamOptions} / {@link
-//       StreamInterface}), and the body pipeline ({@link BodyOptions}) — the
-//       future-middleware fuel `helpers.ts` (U2) implements against.
+//       StreamInterface}), and the body pipeline ({@link BodyOptions}) — what
+//       `helpers.ts` implements against and middleware builds on.
 // ============================================================================
 
 /**
- * The composition context — plain data, one per request, shared by every
+ * Represents the composition context — plain data, one per request, shared by every
  * middleware AND (as `state`) by the route handlers behind the dispatcher.
  *
  * @typeParam TState - The consumer's opaque per-request state type
@@ -52,7 +52,7 @@ export interface MiddlewareContext<TState> {
 }
 
 /**
- * The downstream continuation a {@link MiddlewareHandler} invokes to run the
+ * Represents the downstream continuation a {@link MiddlewareHandler} invokes to run the
  * rest of the onion.
  *
  * @remarks
@@ -68,7 +68,7 @@ export interface MiddlewareContext<TState> {
 export type NextFunction = (request?: Request) => Promise<Response>
 
 /**
- * One link in the middleware onion — runs around the rest of the chain.
+ * Represents one link in the middleware onion — runs around the rest of the chain.
  *
  * @typeParam TState - The consumer's opaque per-request state type
  *
@@ -94,7 +94,7 @@ export type MiddlewareHandler<TState> = (
 ) => Response | Promise<Response>
 
 /**
- * The per-request connection facts the server face injects — the ONLY data
+ * Represents the per-request connection facts the server face injects — the ONLY data
  * that genuinely exists solely on the socket, surfaced so middleware and a
  * consumer's `state` factory stay core-pure.
  *
@@ -105,13 +105,13 @@ export type MiddlewareHandler<TState> = (
  * - `encrypted` — whether the connection is TLS, for an auto-`Secure` cookie
  *   decision ({@link CookieOptions.secure} left `undefined`).
  */
-export interface ConnectionInfo {
+export interface Connection {
 	readonly ip?: string
 	readonly encrypted: boolean
 }
 
 /**
- * A secret (or rotation list) for signing + verifying a stateless, HMAC-signed
+ * Represents a secret (or rotation list) for signing + verifying a stateless, HMAC-signed
  * token.
  *
  * @remarks
@@ -140,7 +140,7 @@ export interface TokenOptions {
 }
 
 /**
- * The `Set-Cookie` attributes for `serializeCookie` (and any signed-cookie
+ * Represents the `Set-Cookie` attributes for `serializeCookie` (and any signed-cookie
  * transport built over it).
  *
  * @param path - The `Path` directive; defaults to `'/'`.
@@ -152,7 +152,7 @@ export interface TokenOptions {
  *   suppresses it, and omitted/`undefined` (the default) derives it from the
  *   connection via {@link import('./helpers.js').resolveSecure} — `Secure` on
  *   a TLS connection, off over plaintext HTTP ({@link
- *   ConnectionInfo.encrypted}). A `sameSite: 'None'` cookie is ALWAYS
+ *   Connection.encrypted}). A `sameSite: 'None'` cookie is ALWAYS
  *   `Secure` regardless (the spec requires it).
  * @param sameSite - The `SameSite` directive; defaults to `'Lax'`.
  */
@@ -166,9 +166,9 @@ export interface CookieOptions {
 }
 
 /**
- * One parsed entry of a weighted `Accept` / `Accept-Encoding` / `Accept-Language`
- * header — a value and its quality weight, the element type `parseAcceptHeader`
- * returns (sorted by `q` descending).
+ * Represents one parsed entry of a weighted `Accept` / `Accept-Encoding` /
+ * `Accept-Language` header — a value and its quality weight, the element type
+ * `parseAcceptHeader` returns (sorted by `q` descending).
  *
  * @remarks
  * `value` is the lower-cased token (`text/html`, `gzip`, `en-us`, or a
@@ -183,22 +183,37 @@ export interface AcceptEntry {
 }
 
 /**
- * A content-coding the substrate compresses / decompresses with — the
+ * Rates one candidate media type against a parsed `Accept` header — the
+ * quality and specificity `matchMediaType` reports for the best matching
+ * {@link AcceptEntry}.
+ *
+ * @remarks
+ * `q` is the client's quality weight in `[0, 1]`. `rank` is the specificity of
+ * the entry that matched: `0` for an exact type, `1` for a subtype wildcard
+ * (`type/*`), `2` for the any-range (`* / *`). A lower `rank` wins, and a
+ * higher `q` breaks a rank tie.
+ */
+export interface MediaMatch {
+	readonly q: number
+	readonly rank: number
+}
+
+/**
+ * Represents a content-coding the substrate compresses / decompresses with — the
  * `Content-Encoding` / `Accept-Encoding` token vocabulary it understands.
  *
  * @remarks
  * `gzip` / `deflate` map to `CompressionStream` / `DecompressionStream`
  * (web-standard, no external codec); `identity` is the no-op "uncompressed"
  * coding. Brotli (`br`) has no `CompressionStream` implementation yet, so it
- * is deliberately OMITTED here — Brotli parity is the future middleware
- * package's node-entry decision (§3 of the proposal), not this core's. A
- * constrained set of external-spec literals, so it stays a union, not a
- * behavioral toggle (AGENTS §4.4).
+ * is deliberately OMITTED here — Brotli parity is the middleware package's
+ * node-entry decision, not this core's. A constrained set of external-spec
+ * literals, so it stays a union, not a behavioral toggle.
  */
 export type Encoding = 'gzip' | 'deflate' | 'identity'
 
 /**
- * A map of media type → handler for {@link NegotiatorInterface.format} — the
+ * Represents a map of media type → handler for {@link NegotiatorInterface.format} — the
  * content-negotiation dispatch table.
  *
  * @typeParam TState - The consumer's opaque per-request state type
@@ -221,7 +236,7 @@ export type FormatHandlerMap<TState> = Readonly<
 >
 
 /**
- * Content negotiation over the weighted `Accept` family — a reusable,
+ * Represents content negotiation over the weighted `Accept` family — a reusable,
  * cross-middleware machine (not itself a middleware).
  *
  * @remarks
@@ -243,7 +258,7 @@ export type FormatHandlerMap<TState> = Readonly<
  */
 export interface NegotiatorInterface {
 	/**
-	 * Pick the best `available` value for a weighted `Accept`-style `header` —
+	 * Picks the best `available` value for a weighted `Accept`-style `header` —
 	 * the generic media-type primitive (`encoding` / `language` build on it).
 	 *
 	 * @param header - The raw weighted header value (e.g. `text/html, application/json;q=0.9`)
@@ -252,7 +267,7 @@ export interface NegotiatorInterface {
 	 */
 	negotiate(header: string, available: readonly string[]): string | undefined
 	/**
-	 * Pick the best `available` content-coding for an `Accept-Encoding` header
+	 * Picks the best `available` content-coding for an `Accept-Encoding` header
 	 * — `negotiate` scoped to codings (a bare `*` wildcard ⇒ the first `available`).
 	 *
 	 * @param header - The raw `Accept-Encoding` header value (e.g. `gzip;q=1.0, deflate;q=0.8`)
@@ -261,7 +276,7 @@ export interface NegotiatorInterface {
 	 */
 	encoding(header: string, available: readonly Encoding[]): Encoding | undefined
 	/**
-	 * Pick the best `available` language for an `Accept-Language` header —
+	 * Picks the best `available` language for an `Accept-Language` header —
 	 * `negotiate` with a language-prefix match (`en` accepts `en-US`) and a
 	 * bare `*` wildcard.
 	 *
@@ -271,9 +286,9 @@ export interface NegotiatorInterface {
 	 */
 	language(header: string, available: readonly string[]): string | undefined
 	/**
-	 * Dispatch to the handler whose media type the client most prefers — read
-	 * the request `Accept`, negotiate against `handlers`' keys, and invoke the
-	 * winner; `406` when none is acceptable.
+	 * Dispatches to the handler whose media type the client most prefers —
+	 * reads the request `Accept`, negotiates against `handlers`' keys, and
+	 * invokes the winner; `406` when none is acceptable.
 	 *
 	 * @typeParam TState - The consumer's opaque per-request state type
 	 * @param request - The in-flight `Request`
@@ -289,7 +304,7 @@ export interface NegotiatorInterface {
 }
 
 /**
- * One Server-Sent Event to serialize to the wire.
+ * Represents one Server-Sent Event to serialize to the wire.
  *
  * @remarks
  * - `data` — the event payload (required). Serialized as one or more `data:`
@@ -303,21 +318,25 @@ export interface NegotiatorInterface {
  */
 export interface SSEMessage {
 	readonly data: string
-	/** Must be a SINGLE-LINE value — an embedded newline would corrupt the SSE wire format. */
+	/** Requires a SINGLE-LINE value — an embedded newline would corrupt the SSE wire format. */
 	readonly event?: string
-	/** Must be a SINGLE-LINE value — an embedded newline would corrupt the SSE wire format. */
+	/** Requires a SINGLE-LINE value — an embedded newline would corrupt the SSE wire format. */
 	readonly id?: string
 	readonly retry?: number
 }
 
 /**
- * Options for the `openStream` seam.
+ * Options for a {@link StreamInterface} — how `createStream` opens the
+ * streaming response.
  *
  * @param status - The HTTP status the streaming response is opened with;
  *   defaults to `200`.
- * @param headers - Extra response headers merged with the SSE headers the
- *   seam always sets ({@link SSE_HEADERS}) — a key the seam owns is never
- *   overridden.
+ * @param headers - Extra response headers merged OVER the SSE headers the
+ *   seam always sets ({@link SSE_HEADERS}), so a caller repeating one of those
+ *   keys replaces the seam's value. Repeating it under a different casing
+ *   appends instead, because `Headers` accumulates both spellings into one
+ *   comma-joined value — spell a key exactly as {@link SSE_HEADERS} spells it
+ *   when the intent is to replace it.
  */
 export interface StreamOptions {
 	readonly status?: number
@@ -325,8 +344,8 @@ export interface StreamOptions {
 }
 
 /**
- * A handle to write Server-Sent Events to an open, fetch-standard streaming
- * `Response` — the generic streaming surface `openStream` returns over a
+ * Represents a handle to write Server-Sent Events to an open, fetch-standard streaming
+ * `Response` — the generic streaming surface `createStream` returns over a
  * `ReadableStream`.
  *
  * @remarks
@@ -353,28 +372,28 @@ export interface StreamOptions {
  * until it receives the response.
  */
 export interface StreamInterface {
-	/** The streaming `Response` to return from the route handler. */
+	/** Holds the streaming `Response` to return from the route handler. */
 	readonly response: Response
-	/** Whether the underlying stream is done (ended, or the consumer disconnected). */
+	/** Reports whether the underlying stream is done (ended, or the consumer disconnected). */
 	readonly closed: boolean
 	/**
-	 * Serialize + enqueue one {@link SSEMessage} to the wire.
+	 * Serializes + enqueues one {@link SSEMessage} to the wire.
 	 *
 	 * @param message - The event to send (its `data` split on `\n` into `data:` lines)
-	 * @returns `true` when the process-local stream queue has capacity after
-	 *   accepting the event; `false` when the queue is full or the stream is
-	 *   closed. A `false` event was still accepted unless `closed` was already
+	 * @returns True if the process-local stream queue has capacity after
+	 *   accepting the event; false otherwise — the queue is full or the stream
+	 *   is closed. A `false` event was still accepted unless `closed` was already
 	 *   `true`; await {@link drain} before producing another event.
 	 */
 	write(message: SSEMessage): boolean
 	/**
-	 * Write a `: text` SSE comment line — a keep-alive a conforming parser ignores.
+	 * Writes a `: text` SSE comment line — a keep-alive a conforming parser ignores.
 	 *
 	 * @param text - The comment text (sent after the `: ` prefix)
 	 */
 	comment(text: string): void
 	/**
-	 * Park until the process-local stream queue has capacity again.
+	 * Parks until the process-local stream queue has capacity again.
 	 *
 	 * @returns A promise that resolves when a consumer pull restores positive
 	 *   desired size, or immediately when capacity is already available or the
@@ -382,12 +401,12 @@ export interface StreamInterface {
 	 *   not prove that a remote peer consumed the queued bytes.
 	 */
 	drain(): Promise<void>
-	/** End the stream, completing the response (a no-op once already `closed`). */
+	/** Ends the stream, completing the response (a no-op once already `closed`). */
 	end(): void
 }
 
 /**
- * The parsed outcome of an HTTP `Range` request header.
+ * Represents the parsed outcome of an HTTP `Range` request header.
  *
  * @remarks
  * A `Range: bytes=start-end` against a known resource `size` resolves to ONE
@@ -431,12 +450,11 @@ export interface BodyOptions {
 }
 
 // ============================================================================
-//  The node face — type definitions (the §5 source of truth). The `Server`
+//  The node face — type definitions, the source of truth for the `Server`
 //  entity's public surface: the status machine, its observable events, the
-//  upgrade seam, connection-fact-derived state, and `createServer`'s options
-//  (AGENTS §5). Everything here is genuinely node-bound (PROPOSAL §4) — the
-//  middleware seam + substrate types are declared above in this same file,
-//  never re-declared.
+//  upgrade seam, connection-fact-derived state, and `createServer`'s options.
+//  Everything here is genuinely node-bound — the middleware seam + substrate
+//  types are declared earlier in this same file, never re-declared.
 // ============================================================================
 
 import type { IncomingMessage } from 'node:http'
@@ -446,7 +464,7 @@ import type { DispatcherInterface } from '@orkestrel/router'
 import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
 
 /**
- * The `Server`'s lifecycle state (AGENTS §10 vocabulary).
+ * Represents the `Server`'s lifecycle state.
  *
  * @remarks
  * `idle` (never started, or a fresh instance) → `starting` (binding the
@@ -458,7 +476,53 @@ import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkes
 export type ServerStatus = 'idle' | 'starting' | 'listening' | 'stopping' | 'stopped'
 
 /**
- * The `Server`'s observable lifecycle events (AGENTS §13).
+ * Represents the machine-readable category a
+ * {@link import('./errors.js').ServerError} carries.
+ *
+ * @remarks
+ * A `ServerError` reports a lifecycle refusal the caller programmed, not a
+ * client-facing fault — {@link import('./errors.js').HTTPError} owns the
+ * latter and keys on `status` instead. The categories are disjoint, so a
+ * `catch` narrowed by {@link import('./errors.js').isServerError} reads `code`
+ * to tell them apart.
+ */
+export type ServerErrorCode =
+	/** Identifies a lifecycle call the current {@link ServerStatus} forbids. */
+	'STATUS'
+
+/**
+ * Identifies the request a server-level fault came from — its method and its
+ * parsed URL.
+ *
+ * @remarks
+ * Carried by {@link ServerEventMap.error}'s optional second element and by
+ * {@link ServerOptions.report}'s optional second parameter, and present only
+ * when the fault happened on the per-request path — an upgrade-handler throw
+ * or a listen failure has no fetch `Request` to derive it from.
+ */
+export interface RequestLine {
+	readonly method: string
+	readonly url: URL
+}
+
+/**
+ * Records one finished request — the payload {@link ServerEventMap.response}
+ * carries.
+ *
+ * @remarks
+ * `method` and `pathname` come from the parsed request, `status` is the status
+ * actually sent (on the success path or the outer-boundary error path), and
+ * `ms` is the elapsed time in whole milliseconds.
+ */
+export interface ResponseRecord {
+	readonly method: string
+	readonly pathname: string
+	readonly status: number
+	readonly ms: number
+}
+
+/**
+ * Represents the `Server`'s observable lifecycle events.
  *
  * @remarks
  * - `start` — `listen()` resolved; carries the actually-bound port (an
@@ -492,26 +556,25 @@ export type ServerEventMap = {
 	readonly start: readonly [port: number]
 	readonly request: readonly [method: string, pathname: string]
 	readonly upgrade: readonly [request: IncomingMessage, handled: boolean]
-	readonly error: readonly [error: unknown, request?: { method: string; url: URL }]
+	readonly error: readonly [error: unknown, request?: RequestLine]
 	readonly stop: readonly []
 	readonly drain: readonly [pending: number, upgraded: number]
-	readonly response: readonly [
-		event: { method: string; pathname: string; status: number; ms: number },
-	]
+	readonly response: readonly [event: ResponseRecord]
 }
 
 /**
- * A raw `node:http` protocol-upgrade claimant — registered via
+ * Represents a raw `node:http` protocol-upgrade claimant — registered via
  * {@link ServerInterface.upgrade}.
  *
  * @remarks
- * Fan-out semantics (verbatim, PROPOSAL §4): handlers run in registration
+ * Fan-out semantics: handlers run in registration
  * order, the FIRST to return `true` CLAIMS (owns) the socket and stops the
  * fan-out; a handler that THROWS is treated as declined (the throw surfaces
  * on the `error` event) and the fan-out continues; if NONE claim it, the
  * socket is destroyed so an unhandled upgrade never leaks a dangling
  * connection. `request` / `socket` / `head` are node's own raw values, handed
- * over verbatim — no assertion at this boundary (AGENTS §14).
+ * over verbatim — no assertion at this boundary (`AGENTS.md`
+ * § Non-negotiable rules).
  *
  * A CLAIMED socket is TRACKED until it closes. The handler still owns it —
  * the server only watches — but `stop()` now drains that socket like an
@@ -526,19 +589,19 @@ export type ServerEventMap = {
  * @param request - The raw `node:http` upgrade request
  * @param socket - The raw, now-detached `Duplex` connection
  * @param head - The first packet of the upgraded stream, if any
- * @returns `true` to CLAIM the socket (this handler now owns it), `false` to
- *   decline and let a later handler try
+ * @returns True if the handler CLAIMS the socket (this handler now owns
+ *   it); false otherwise, declining so a later handler can try
  */
 export type UpgradeHandler = (request: IncomingMessage, socket: Duplex, head: Buffer) => boolean
 
 /**
  * Derives a consumer's per-request `TState` from the adapter-injected
- * {@link ConnectionInfo} — `ServerOptions.state`, invoked once per request
+ * {@link Connection} — `ServerOptions.state`, invoked once per request
  * before the middleware onion runs.
  *
  * @typeParam TState - The consumer's opaque per-request state type
  */
-export type ConnectionStateFunction<TState> = (connection: ConnectionInfo) => TState
+export type ConnectionStateFunction<TState> = (connection: Connection) => TState
 
 /**
  * Options for `createServer`.
@@ -591,9 +654,9 @@ export type ConnectionStateFunction<TState> = (connection: ConnectionInfo) => TS
  *   to `maxHeadersCount` (`0` disables the limit), and `requests` maps to
  *   `maxRequestsPerSocket` (`0` disables the limit). Every present value must
  *   be a non-negative integer. Omitted leaves preserve node's defaults.
- * @param on - The reserved {@link EmitterHooks} for {@link ServerEventMap}
- *   (AGENTS §8), wiring initial lifecycle listeners at construction.
- * @param error - The emitter's listener-error handler (AGENTS §13) — a
+ * @param on - The reserved {@link EmitterHooks} for {@link ServerEventMap},
+ *   wiring initial lifecycle listeners at construction.
+ * @param error - The emitter's listener-error handler — a
  *   listener throw routes here, never to the domain `error` event.
  */
 export interface ServerOptions<TState> {
@@ -605,7 +668,7 @@ export interface ServerOptions<TState> {
 	readonly drain?: number
 	readonly limit?: number
 	readonly expose?: boolean
-	readonly report?: (error: unknown, request?: { method: string; url: URL }) => void
+	readonly report?: (error: unknown, request?: RequestLine) => void
 	readonly timeouts?: {
 		readonly start?: number
 		readonly request?: number
@@ -622,7 +685,7 @@ export interface ServerOptions<TState> {
 }
 
 /**
- * The HTTP server facade — an observable `node:http` lifecycle that composes
+ * Represents the HTTP server facade — an observable `node:http` lifecycle that composes
  * a middleware onion (this module's own middleware seam) around a consumed
  * `@orkestrel/router` {@link DispatcherInterface}.
  *
@@ -650,7 +713,7 @@ export interface ServerInterface<TState> {
 	readonly id: string
 	readonly status: ServerStatus
 	readonly port: number | undefined
-	/** The bound listener address, or `undefined` while no listener is active. */
+	/** Holds the bound listener address, or `undefined` while no listener is active. */
 	readonly address: AddressInfo | undefined
 	readonly dispatcher: DispatcherInterface<TState>
 	readonly emitter: EmitterInterface<ServerEventMap>
@@ -658,15 +721,21 @@ export interface ServerInterface<TState> {
 	use(middleware: ReadonlyArray<MiddlewareHandler<TState>>): void
 	upgrade(handler: UpgradeHandler): void
 	/**
-	 * Bind the configured listener and resolve its actually-bound port.
+	 * Binds the configured listener and resolves its actually-bound port.
 	 *
 	 * @param signal - Optional caller cancellation observed only while startup
 	 *   is pending; aborting after this method resolves does not stop the server.
 	 * @returns The actually-bound TCP port
+	 *
+	 * @remarks
+	 * Rejects with a {@link import('./errors.js').ServerError} of code
+	 * `'STATUS'` when the current {@link ServerStatus} is neither `'idle'` nor
+	 * `'stopped'`, carrying that status in its `context`. Narrow it with
+	 * {@link import('./errors.js').isServerError}.
 	 */
 	start(signal?: AbortSignal): Promise<number>
 	/**
-	 * Stop gracefully: refuse new connections, fire the stop signal, drain, close.
+	 * Stops gracefully: refuses new connections, fires the stop signal, drains, closes.
 	 *
 	 * @remarks
 	 * Drainable work is every in-flight request PLUS every upgraded socket a
@@ -681,7 +750,7 @@ export interface ServerInterface<TState> {
 	 */
 	stop(): Promise<void>
 	/**
-	 * Tear down for good: force-close the listener and every socket, then the emitter.
+	 * Tears down for good: force-closes the listener and every socket, then the emitter.
 	 *
 	 * @returns Resolves once nothing is left open; idempotent from any state
 	 */
```
