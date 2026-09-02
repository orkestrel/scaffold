# Last changes: middleware

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `917ccd9`, merge base with `origin/main` `d31d22e`, layer L2, declared version 0.0.18, registry version 0.0.18.

## Commits since origin/main

```text
4b2491b 2026-08-28 Update every dependency to the published latest
7a3a66c 2026-08-28 Adopt the catalog and guide mirrors for the wave
5655cab 2026-08-28 Apply the verified src-audit fixes
c242d60 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
6152c80 2026-09-01 Close the referral probes' static fallback and asset cache findings
1ef4a18 2026-09-01 Adopt the renamed guide helpers in the parity test
453f794 2026-09-02 Reshape the session and multipart contracts
ec186e4 2026-09-02 Inject the session rebuild step and name the snapshot's state
ea723c4 2026-09-02 Index the database store's new proofs and pin the refused row's survival
aa8646a 2026-09-02 Adopt the server package's computeClientKey and Connection
2928f84 2026-09-02 Point the README at the guide the package ships
917ccd9 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                        |  17 ++--
 README.md                                          |   2 +-
 package.json                                       |  10 +--
 src/core/Session.ts                                |  36 ++++++--
 src/core/constants.ts                              |  59 ++++++-------
 src/core/factories.ts                              |  77 +++++++++-------
 src/core/helpers.ts                                | 293 +++++++++++++++++++++----------------------------------------
 src/core/index.ts                                  |   1 +
 src/core/middlewares.ts                            |  70 ++++++---------
 src/core/shapers.ts                                |   8 +-
 src/core/stores/DatabaseSessionStore.ts            |  63 +++++++------
 src/core/stores/MemorySessionStore.ts              |  61 +++++--------
 src/core/types.ts                                  | 241 +++++++++++++++++++++++++++++++-------------------
 src/core/validators.ts                             | 108 +++++++++++++++++++++++
 src/server/MultipartParser.ts                      | 235 ++++++++++++++++++++++++++-----------------------
 src/server/constants.ts                            |  69 +++++++++------
 src/server/errors.ts                               |  62 ++++++-------
 src/server/helpers.ts                              | 269 ++++++++++++++++++++++++--------------------------------
 src/server/index.ts                                |   1 +
 src/server/middlewares.ts                          |  92 +++++++++----------
 src/server/parsers.ts                              |  71 +++++++++++++++
 src/server/types.ts                                | 143 +++++++++++++++++-------------
 tests/guides.test.ts                               |  22 ++---
 tests/setup.test.ts                                |  17 ++++
 tests/setup.ts                                     |  21 +++++
 tests/src/core/Session.test.ts                     |  36 +++++---
 tests/src/core/factories.test.ts                   |  72 ++++++++++++---
 tests/src/core/helpers.test.ts                     | 191 +++++++++++++++++++++-------------------
 tests/src/core/middlewares.test.ts                 | 110 ++++++++++-------------
 tests/src/core/stores/DatabaseSessionStore.test.ts | 138 +++++++++++++++++++++++++----
 tests/src/core/stores/MemorySessionStore.test.ts   | 123 +++++++++++++-------------
 tests/src/server/helpers.test.ts                   | 148 +++++++++++++++++++++----------
 tests/src/server/middlewares.test.ts               | 164 +++++++++++++++++++++++++++++++++-
 33 files changed, 1804 insertions(+), 1226 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 01b47bb..ab04479 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,17 +1,10 @@
 import type { Encoding } from '@orkestrel/server'
 
-// ============================================================================
-//  @orkestrel/middleware — battery defaults (AGENTS §5 constants file).
-//  Every default named in PROPOSAL.md §4 and the salvaged spec sheet.
-//  Frozen where the value is a record/array so a consumer can read but never
-//  mutate the shared default.
-// ============================================================================
-
-/** Default minimum buffered body size (bytes) `createCompression` will compress. */
+/** Holds the default minimum buffered body size (bytes) `createCompression` will compress. */
 export const DEFAULT_COMPRESSION_THRESHOLD = 1024
 
 /**
- * Default content-codings `createCompression` offers, in preference order —
+ * Lists the default content-codings `createCompression` offers, in preference order —
  * intersected at construction with what the runtime's `CompressionStream`
  * actually supports.
  *
@@ -24,41 +17,41 @@ export const DEFAULT_COMPRESSION_THRESHOLD = 1024
  */
 export const DEFAULT_COMPRESSION_ENCODINGS: readonly Encoding[] = Object.freeze(['gzip', 'deflate'])
 
-/** Default `X-Frame-Options` value `createSecurity` sets. */
+/** Holds the default `X-Frame-Options` value `createSecurity` sets. */
 export const DEFAULT_FRAME_OPTIONS = 'DENY'
 
 /**
- * Default `Content-Security-Policy` value `createSecurity` sets — a custom
+ * Holds the default `Content-Security-Policy` value `createSecurity` sets — a custom
  * `csp` option REPLACES this wholesale, never merges.
  */
 export const DEFAULT_CSP =
 	"default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'"
 
-/** Default `Referrer-Policy` value `createSecurity` sets. */
+/** Holds the default `Referrer-Policy` value `createSecurity` sets. */
 export const DEFAULT_REFERRER_POLICY = 'strict-origin-when-cross-origin'
 
-/** Default `Permissions-Policy` value `createSecurity` sets. */
+/** Holds the default `Permissions-Policy` value `createSecurity` sets. */
 export const DEFAULT_PERMISSIONS_POLICY = 'camera=(), microphone=(), geolocation=()'
 
-/** Default `Cross-Origin-Opener-Policy` value `createSecurity` sets. */
+/** Holds the default `Cross-Origin-Opener-Policy` value `createSecurity` sets. */
 export const DEFAULT_COOP = 'same-origin'
 
-/** Default `Cross-Origin-Resource-Policy` value `createSecurity` sets. */
+/** Holds the default `Cross-Origin-Resource-Policy` value `createSecurity` sets. */
 export const DEFAULT_CORP = 'same-origin'
 
-/** Default `Origin-Agent-Cluster` value `createSecurity` sets. */
+/** Holds the default `Origin-Agent-Cluster` value `createSecurity` sets. */
 export const DEFAULT_CLUSTER = '?1'
 
-/** Value `createSecurity` sets for `Cross-Origin-Embedder-Policy` when `coep: true`. */
+/** Holds the value `createSecurity` sets for `Cross-Origin-Embedder-Policy` when `coep: true`. */
 export const DEFAULT_COEP = 'require-corp'
 
-/** Value `createSecurity` sets for `Strict-Transport-Security` when `hsts: true`. */
+/** Holds the value `createSecurity` sets for `Strict-Transport-Security` when `hsts: true`. */
 export const DEFAULT_HSTS = 'max-age=31536000; includeSubDomains'
 
-/** Default header `createSecurity` mints/echoes a request identifier into. */
+/** Names the default header `createSecurity` mints/echoes a request identifier into. */
 export const DEFAULT_IDENTIFIER_HEADER = 'x-request-id'
 
-/** Default methods `createCors` advertises on a preflight response. */
+/** Lists the default methods `createCors` advertises on a preflight response. */
 export const DEFAULT_CORS_METHODS: readonly string[] = Object.freeze([
 	'GET',
 	'POST',
@@ -68,46 +61,46 @@ export const DEFAULT_CORS_METHODS: readonly string[] = Object.freeze([
 	'OPTIONS',
 ])
 
-/** Default headers `createCors` advertises on a preflight response. */
+/** Lists the default headers `createCors` advertises on a preflight response. */
 export const DEFAULT_CORS_HEADERS: readonly string[] = Object.freeze([
 	'Content-Type',
 	'Authorization',
 ])
 
-/** Default response status `createDeadline` returns when its deadline fires first. */
+/** Holds the default response status `createDeadline` returns when its deadline fires first. */
 export const DEFAULT_DEADLINE_STATUS = 503
 
-/** Default header `createBearer` reads the token from. */
+/** Names the default header `createBearer` reads the token from. */
 export const DEFAULT_BEARER_HEADER = 'authorization'
 
-/** Default scheme prefix `createBearer` strips before verification. */
+/** Names the default scheme prefix `createBearer` strips before verification. */
 export const DEFAULT_BEARER_SCHEME = 'Bearer'
 
-/** Default maximum number of distinct rate-limit keys `createLimiter` tracks before LRU eviction. */
+/** Holds the default maximum number of distinct rate-limit keys `createLimiter` tracks before LRU eviction. */
 export const DEFAULT_LIMITER_CAPACITY = 10_000
 
-/** Default maximum number of distinct session ids `createMemorySessionStore` tracks before LRU (by last write) eviction. */
+/** Holds the default maximum number of distinct session ids `createMemorySessionStore` tracks before LRU (by last write) eviction. */
 export const DEFAULT_SESSION_CAPACITY = 10_000
 
-/** Default 429 body message `createLimiter` sends when a key is over budget. */
+/** Holds the default 429 body message `createLimiter` sends when a key is over budget. */
 export const DEFAULT_LIMITER_MESSAGE = 'rate limit exceeded'
 
-/** Default cookie name `createCookieTransport` writes the signed session id under. */
+/** Names the default cookie `createCookieTransport` writes the signed session id under. */
 export const DEFAULT_SESSION_COOKIE = 'session'
 
-/** Default header `createHeaderTransport` carries the session id in. */
+/** Names the default header `createHeaderTransport` carries the session id in. */
 export const DEFAULT_SESSION_HEADER = 'session-id'
 
-/** Default signed-cookie name `createCSRF` writes the CSRF token under. */
+/** Names the default signed cookie `createCSRF` writes the CSRF token under. */
 export const DEFAULT_CSRF_COOKIE = 'csrf'
 
-/** Default header `createCSRF` reads a mutating request's submitted token from. */
+/** Names the default header `createCSRF` reads a mutating request's submitted token from. */
 export const DEFAULT_CSRF_HEADER = 'x-csrf-token'
 
-/** Default body field `createCSRF` falls back to reading a mutating request's submitted token from. */
+/** Names the default body field `createCSRF` falls back to reading a mutating request's submitted token from. */
 export const DEFAULT_CSRF_FIELD = '_csrf'
 
-/** Default methods `createCSRF` treats as safe (mint instead of verify). */
+/** Lists the default methods `createCSRF` treats as safe (mint instead of verify). */
 export const DEFAULT_CSRF_SAFE_METHODS: readonly string[] = Object.freeze([
 	'GET',
 	'HEAD',
diff --git a/src/core/index.ts b/src/core/index.ts
index c894407..c1371c9 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -1,6 +1,7 @@
 export * from './types.js'
 export * from './constants.js'
 export * from './helpers.js'
+export * from './validators.js'
 export * from './shapers.js'
 export * from './Session.js'
 export * from './stores/MemorySessionStore.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index 6343c38..d33fde3 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,25 +1,14 @@
 import type {
-	ConnectionInfo,
+	Connection,
 	CookieOptions,
 	Encoding,
 	MiddlewareContext,
 	TokenSecret,
 } from '@orkestrel/server'
 
-// ============================================================================
-//  @orkestrel/middleware — core type surface (AGENTS §5 source of truth).
-//  Every battery option bag, its state slice (when it stashes one), and the
-//  session/transport/store seams from PROPOSAL.md §4, adapted per the
-//  orchestrator's seam rulings (see the dispatch header). Peer types
-//  (`TokenSecret`, `CookieOptions`, `Encoding`, `MiddlewareContext`,
-//  `MiddlewareHandler`, `HTTPError`, …) are imported from `@orkestrel/server`
-//  and never redeclared here.
-// ============================================================================
-
 /**
- * Options for `createBoundary` — the outermost error-rendering battery.
+ * Configures `createBoundary` — the outermost error-rendering battery.
  *
- * @param options - See fields below
  * @remarks
  * - `expose` — when `true`, a non-`HTTPError` throw's `error.message` is
  *   surfaced in the 500 body instead of a generic message. Defaults to
@@ -33,7 +22,7 @@ export interface BoundaryOptions {
 }
 
 /**
- * One access-log-style entry `createTelemetry` records after a response
+ * Represents one access-log-style entry `createTelemetry` records after a response
  * settles — the access-log/timing seam's payload shape.
  *
  * @remarks
@@ -52,9 +41,8 @@ export interface TelemetryEntry {
 }
 
 /**
- * Options for `createTelemetry` — the request timing/access-log seam.
+ * Configures `createTelemetry` — the request timing/access-log seam.
  *
- * @param options - See fields below
  * @remarks
  * - `record` — invoked once per request with the settled {@link
  *   TelemetryEntry}; its own throw is swallowed so a broken sink can never
@@ -65,9 +53,8 @@ export interface TelemetryOptions {
 }
 
 /**
- * Options for `createCompression` — response-body compression.
+ * Configures `createCompression` — response-body compression.
  *
- * @param options - See fields below
  * @remarks
  * - `threshold` — the minimum buffered body size (bytes) worth compressing;
  *   defaults to {@link DEFAULT_COMPRESSION_THRESHOLD}.
@@ -85,7 +72,31 @@ export interface CompressionOptions {
 }
 
 /**
- * `createSecurity`'s `identifier` sub-option — request-id minting/echo
+ * Describes the already-resolved settings `compressResponse` runs its shared
+ * negotiate → skip → threshold → compress skeleton against — the shape each
+ * face's `createCompression` builds from its own option bag.
+ *
+ * @remarks
+ * - `threshold` — the minimum body size (bytes) worth compressing.
+ * - `filter` — the per-response opt-out predicate; absent allows every
+ *   response.
+ * - `encodings` — the codings offered, in preference order, already narrowed
+ *   to what this face can actually produce.
+ * - `compress` — the runtime's compression primitive for one negotiated
+ *   coding.
+ */
+export interface CompressResponseOptions {
+	readonly threshold: number
+	readonly filter?: (request: Request, response: Response) => boolean
+	readonly encodings: readonly Encoding[]
+	readonly compress: (
+		bytes: Uint8Array<ArrayBuffer>,
+		encoding: Exclude<Encoding, 'identity'>,
+	) => Promise<Uint8Array<ArrayBuffer>>
+}
+
+/**
+ * Describes `createSecurity`'s `identifier` sub-option — request-id minting/echo
  * policy, or `false` to disable the feature entirely.
  *
  * @remarks
@@ -96,9 +107,8 @@ export interface CompressionOptions {
 export type SecurityIdentifierOptions = { readonly trust?: boolean } | false
 
 /**
- * Options for `createSecurity` — the security-headers + request-id battery.
+ * Configures `createSecurity` — the security-headers + request-id battery.
  *
- * @param options - See fields below
  * @remarks
  * Every header option is `string | false` (a custom value replaces the
  * default wholesale, `false` omits the header) unless noted; unset uses the
@@ -132,9 +142,8 @@ export interface SecurityOptions {
 }
 
 /**
- * Options for `createCors` — Cross-Origin Resource Sharing.
+ * Configures `createCors` — Cross-Origin Resource Sharing.
  *
- * @param options - See fields below
  * @remarks
  * - `origin` — the allowed origin(s): `'*'` (default), a single origin
  *   string, or an allow-list `readonly string[]` (reflects the request
@@ -150,9 +159,8 @@ export interface CorsOptions {
 }
 
 /**
- * Options for `createDeadline` — the application-level per-request deadline.
+ * Configures `createDeadline` — the application-level per-request deadline.
  *
- * @param options - See fields below
  * @remarks
  * - `ms` — the deadline in milliseconds, armed via `@orkestrel/timeout` and
  *   linked to the request's `signal` via `@orkestrel/abort`'s `linkSignal`.
@@ -165,9 +173,8 @@ export interface DeadlineOptions {
 }
 
 /**
- * Options for `createForwarded` — the trusted-proxy client-IP resolver.
+ * Configures `createForwarded` — the trusted-proxy client-IP resolver.
  *
- * @param options - See fields below
  * @remarks
  * Construction requires EXACTLY ONE of the two forms (a `TypeError` guards
  * both-set and neither-set):
@@ -180,9 +187,8 @@ export type ForwardedOptions =
 	| { readonly trusted: readonly string[] }
 
 /**
- * Options for `createETag` — dynamic response ETag + conditional GET.
+ * Configures `createETag` — dynamic response ETag + conditional GET.
  *
- * @param options - See fields below
  * @remarks
  * - `weak` — mint a weak `W/"…"` ETag (default `true`) or a strong `"…"` one
  *   (`false`).
@@ -192,9 +198,8 @@ export interface ETagOptions {
 }
 
 /**
- * Options for `createBearer` — bearer-token authentication.
+ * Configures `createBearer` — bearer-token authentication.
  *
- * @param options - See fields below
  * @remarks
  * - `secret` — the {@link TokenSecret} `verifyToken` checks the extracted
  *   token against (rotation-aware).
@@ -211,10 +216,9 @@ export interface BearerOptions {
 }
 
 /**
- * Options for `createLimiter` — fixed-window rate limiting.
+ * Configures `createLimiter` — fixed-window rate limiting.
  *
  * @typeParam TState - The consumer's opaque per-request state type `key` reads
- * @param options - See fields below
  * @remarks
  * - `max` — the number of requests admitted per key per `window`.
  * - `window` — the window length in milliseconds.
@@ -244,7 +248,7 @@ export interface LimiterOptions<TState = unknown> {
 }
 
 /**
- * The bearer-authentication state slice `createBearer` stashes on
+ * Describes the bearer-authentication state slice `createBearer` stashes on
  * `context.state` once a token verifies.
  *
  * @remarks
@@ -257,7 +261,7 @@ export interface BearerState {
 }
 
 /**
- * The request-identifier state slice `createSecurity` stashes when its
+ * Describes the request-identifier state slice `createSecurity` stashes when its
  * `identifier` option is enabled.
  */
 export interface IdentifierState {
@@ -265,55 +269,62 @@ export interface IdentifierState {
 }
 
 /**
- * The connection-facts state slice `createLimiter`'s default key derivation
+ * Describes the connection-facts state slice `createLimiter`'s default key derivation
  * falls back to when neither {@link BearerState} nor {@link ClientState} is
  * present — the raw socket peer surfaced on `context.state` by the server's
  * `state` option.
  */
 export interface ConnectionState {
-	readonly connection?: ConnectionInfo
+	readonly connection?: Connection
 }
 
 /**
- * The resolved client connection facts `createForwarded` stashes.
+ * Describes the resolved client connection facts `createForwarded` stashes.
  *
  * @remarks
  * `ip` is the first untrusted address walking `X-Forwarded-For` /
  * `Forwarded` right-to-left past the configured trusted hops, falling back
  * to the socket peer when no proxy hop qualifies.
  */
-export interface ClientInfo {
+export interface Client {
 	readonly ip?: string
 }
 
 /**
- * The client-facts state slice `createForwarded` stashes.
+ * Describes the client-facts state slice `createForwarded` stashes.
  */
 export interface ClientState {
-	readonly client?: ClientInfo
+	readonly client?: Client
 }
 
 /**
- * A server-managed session's public surface — an id and its mutable data bag.
+ * Represents a server-managed session's public surface — an id, its live state, and the
+ * mutators that write it.
  *
  * @remarks
- * `data` is a live `Map` a handler reads/writes directly; `createSession`
- * persists it to the configured {@link SessionStoreInterface} on the way out.
+ * `state` is a `ReadonlyMap` view a handler reads directly: TypeScript
+ * refuses a write through it, and `set`, `delete`, and `clear` are the write
+ * path. `createSession` persists the state to the configured
+ * {@link SessionStoreInterface} on the way out. `clear` empties the state
+ * without ending the session — `SessionControlInterface.destroy` does that.
  */
 export interface SessionInterface {
 	readonly id: string
-	readonly data: Map<string, unknown>
+	readonly state: ReadonlyMap<string, unknown>
+	set(key: string, value: unknown): void
+	delete(key: string): boolean
+	clear(): void
 }
 
 /**
- * The mid-handler control handle `createSession` stashes alongside the
+ * Describes the mid-handler control handle `createSession` stashes alongside the
  * session itself — the OWASP anti-fixation / logout primitives.
  *
  * @remarks
  * `regenerate` and `destroy` record intent SYNCHRONOUSLY when called; the
  * store I/O and transport write happen after the handler's `next()` returns
  * (`destroy` supersedes a prior `regenerate`). `regenerate` mints a new id,
- * carries the session's `data` over, and invalidates the old id.
+ * carries the session's `state` over, and invalidates the old id.
  */
 export interface SessionControlInterface {
 	regenerate(): void
@@ -321,7 +332,7 @@ export interface SessionControlInterface {
 }
 
 /**
- * The session state slice `createSession` stashes.
+ * Describes the session state slice `createSession` stashes.
  *
  * @remarks
  * `session` is present whenever a request resolves or mints a session;
@@ -333,7 +344,7 @@ export interface SessionState {
 }
 
 /**
- * The body state slice `createBody` stashes.
+ * Describes the body state slice `createBody` stashes.
  *
  * @remarks
  * `body` holds the same defined value the cached `context.body()` resolved
@@ -345,36 +356,98 @@ export interface BodyState {
 }
 
 /**
- * The pluggable session persistence seam `createSession`'s `store` option
- * implements — a point-access store (AGENTS §5) keyed by session id.
+ * Describes the pluggable session persistence seam `createSession`'s `store` option
+ * implements — a point-access store keyed by session id.
  *
- * @typeParam S - The session data payload type
+ * @typeParam S - The stored session entity type
  * @remarks
  * Every primitive is async and takes a trailing `now` clock reading (the
  * same seam `createSession`'s `clock` option feeds) so a store can apply its
  * own idle/absolute expiry against the caller's injected time rather than
- * its own wall clock. `delete` of an absent id is a no-op, never throws.
- */
-export interface SessionStoreInterface<S> {
+ * its own wall clock. `set` reads the id from the session it is handed —
+ * a stored value carries its own id, so no separate id is passed. `delete` of
+ * an absent id is a no-op, never throws.
+ *
+ * `get` must resolve a value satisfying {@link isSession} — an `id` string,
+ * a `state` `Map` view, and the mutators — or `undefined`. `createSession`
+ * dereferences the resolved value's `id` and `state` without re-checking
+ * them, so a store that resolves an off-shape value corrupts the battery's
+ * own state rather than being refused at the seam. The shipped
+ * `DatabaseSessionStore` enforces this with the caller-supplied guard it is
+ * constructed with.
+ */
+export interface SessionStoreInterface<S extends SessionInterface> {
 	get(id: string, now: number): Promise<S | undefined>
-	set(id: string, session: S, now: number): Promise<void>
+	set(session: S, now: number): Promise<void>
 	delete(id: string): Promise<void>
 }
 
 /**
- * One persisted session row — an opaque snapshot column plus the store-owned
+ * Describes the idle and absolute-lifetime thresholds a session store enforces —
+ * `sessionExpired`'s limits argument and both shipped stores' construction
+ * options.
+ *
+ * @remarks
+ * - `ttl` — the idle timeout in milliseconds; absent means no idle expiry.
+ * - `lifetime` — the absolute lifetime in milliseconds from the first `set`;
+ *   absent means no absolute expiry.
+ */
+export interface SessionLimits {
+	readonly ttl?: number | undefined
+	readonly lifetime?: number | undefined
+}
+
+/**
+ * Describes the per-session instants a store stamps and `sessionExpired` measures
+ * against.
+ *
+ * @remarks
+ * - `seen` — the instant of the most recent live read or write.
+ * - `created` — the instant of the first `set`, preserved across every
+ *   later re-`set` of the same id.
+ */
+export interface SessionCursors {
+	readonly seen: number
+	readonly created: number
+}
+
+/**
+ * Represents one persisted session row — an opaque snapshot column plus the store-owned
  * idle/absolute-lifetime cursors, the shape a {@link DatabaseSessionStore}'s
  * backing table holds.
  */
-export interface SessionRow {
+export interface SessionRow extends SessionCursors {
 	readonly id: string
 	readonly session: unknown
-	readonly lastSeen: number
-	readonly createdAt: number
 }
 
 /**
- * The transport seam `createSession`'s `transport` option implements — how a
+ * Represents one in-process session entry — the payload {@link MemorySessionStore} holds
+ * against an id, alongside the same cursors a persisted row carries.
+ *
+ * @typeParam S - The stored session entity type
+ */
+export interface SessionEntry<S extends SessionInterface> extends SessionCursors {
+	readonly session: S
+}
+
+/**
+ * Represents a session's serializable projection — the value `snapshotSession` produces
+ * and a durable store's `set` writes.
+ *
+ * @remarks
+ * `state` is the wire member a persisted row carries, built on a
+ * null-prototype record so a session key literally named `__proto__`
+ * round-trips as an own enumerable property. It holds the same entries the
+ * entity's own `state` view publishes.
+ */
+export interface SessionSnapshot {
+	readonly id: string
+	readonly state: Readonly<Record<string, unknown>>
+}
+
+/**
+ * Describes the transport seam `createSession`'s `transport` option implements — how a
  * session id travels to and from the client (a signed cookie, a header, …).
  *
  * @remarks
@@ -387,20 +460,19 @@ export interface SessionRow {
  * transport can resolve its own `Secure` attribute via `resolveSecure`
  * without re-deriving connection facts itself.
  */
-export interface SessionTransport {
+export interface SessionTransportInterface {
 	read(request: Request): string | undefined | Promise<string | undefined>
 	write(response: Response, id: string, encrypted: boolean): void | Promise<void>
 	clear(response: Response): void
 }
 
 /**
- * Options for `createSession` — the generic session battery.
+ * Configures `createSession` — the generic session battery.
  *
- * @typeParam S - The session data payload type `create` produces
+ * @typeParam S - The session entity type `create` produces
  * @typeParam TState - The consumer's opaque per-request state type `mint` reads
- * @param options - See fields below
  * @remarks
- * - `transport` — the {@link SessionTransport} (`createCookieTransport(...)`,
+ * - `transport` — the {@link SessionTransportInterface} (`createCookieTransport(...)`,
  *   `createHeaderTransport(...)`, or a custom one).
  * - `store` — the {@link SessionStoreInterface}; defaults to
  *   `createMemorySessionStore({ ttl, lifetime, capacity, evict })`.
@@ -417,14 +489,12 @@ export interface SessionTransport {
  *   defaults to `new Session(id)`.
  * - `mint` — decides whether to auto-mint a session when none resolves;
  *   defaults to always minting (auto-session).
- * - `require` — when `true`, a request that resolves no session and does not
+ * - `required` — when `true`, a request that resolves no session and does not
  *   mint one renders a 404 instead of proceeding sessionless. Defaults to `false`.
- * - `ends` — when `true`, a `DELETE` request carrying a valid session id
- *   deletes the session and short-circuits with `204`. Defaults to `false`.
  * - `clock` — the injected time source fed to the store; defaults to `Date.now`.
  */
-export interface SessionOptions<S, TState = unknown> {
-	readonly transport: SessionTransport
+export interface SessionOptions<S extends SessionInterface, TState = unknown> {
+	readonly transport: SessionTransportInterface
 	readonly store?: SessionStoreInterface<S>
 	readonly ttl?: number
 	readonly lifetime?: number
@@ -432,15 +502,13 @@ export interface SessionOptions<S, TState = unknown> {
 	readonly evict?: (id: string) => void
 	readonly create?: (id: string) => S
 	readonly mint?: (context: MiddlewareContext<TState>) => boolean | Promise<boolean>
-	readonly require?: boolean
-	readonly ends?: boolean
+	readonly required?: boolean
 	readonly clock?: () => number
 }
 
 /**
- * Options for `createCookieTransport` — the signed-cookie {@link SessionTransport}.
+ * Configures `createCookieTransport` — the signed-cookie {@link SessionTransportInterface}.
  *
- * @param options - See fields below
  * @remarks
  * - `name` — the cookie name; defaults to {@link DEFAULT_SESSION_COOKIE}.
  * - `secret` — the {@link TokenSecret} the session id is signed with (`signToken`).
@@ -454,9 +522,8 @@ export interface CookieTransportOptions {
 }
 
 /**
- * Options for `createHeaderTransport` — the bare-header {@link SessionTransport}.
+ * Configures `createHeaderTransport` — the bare-header {@link SessionTransportInterface}.
  *
- * @param options - See fields below
  * @remarks
  * - `header` — the header carrying the session id; defaults to
  *   {@link DEFAULT_SESSION_HEADER}.
@@ -466,9 +533,8 @@ export interface HeaderTransportOptions {
 }
 
 /**
- * Options for `createMemorySessionStore` — the default in-process {@link SessionStoreInterface}.
+ * Configures `createMemorySessionStore` — the default in-process {@link SessionStoreInterface}.
  *
- * @param options - See fields below
  * @remarks
  * - `ttl` — the idle timeout in milliseconds (lazy eviction on `get`).
  * - `lifetime` — the absolute lifetime in milliseconds from first `set`
@@ -482,15 +548,13 @@ export interface HeaderTransportOptions {
  *   sink only — it must never call back into the store (no re-entrant
  *   `get`/`set`); mutations during eviction are unsupported.
  */
-export interface MemorySessionStoreOptions {
-	readonly ttl?: number
-	readonly lifetime?: number
+export interface MemorySessionStoreOptions extends SessionLimits {
 	readonly capacity?: number
 	readonly evict?: (id: string) => void
 }
 
 /**
- * The CSRF state slice `createCSRF` stashes — the raw token a safe-method
+ * Describes the CSRF state slice `createCSRF` stashes — the raw token a safe-method
  * response exposes for a subsequent mutating request to submit back.
  */
 export interface CSRFState {
@@ -498,9 +562,8 @@ export interface CSRFState {
 }
 
 /**
- * Options for `createCSRF` — session-bound double-submit CSRF protection.
+ * Configures `createCSRF` — session-bound double-submit CSRF protection.
  *
- * @param options - See fields below
  * @remarks
  * - `secret` — the {@link TokenSecret} the CSRF token is signed with.
  * - `cookie` — the signed-cookie name; defaults to {@link DEFAULT_CSRF_COOKIE}.
@@ -521,7 +584,7 @@ export interface CSRFOptions {
 }
 
 /**
- * One staged multipart upload's public record — the shape the node-face
+ * Represents one staged multipart upload's public record — the shape the node-face
  * `createMultipart` battery (`@orkestrel/middleware/server`) produces per
  * uploaded file.
  *
@@ -529,7 +592,7 @@ export interface CSRFOptions {
  * Declared here rather than in the node-bound server surface so the
  * fetch/string-pure {@link MultipartState} slice — referenced by any
  * environment narrowing `context.state` — never depends on the node face.
- * The server's concrete `UploadedFileInterface` is structurally compatible
+ * The server's concrete `UploadedFile` is structurally compatible
  * with this shape.
  */
 export interface MultipartFile {
@@ -543,7 +606,7 @@ export interface MultipartFile {
 }
 
 /**
- * The parsed multipart request body `createMultipart` stashes — files keyed
+ * Describes the parsed multipart request body `createMultipart` stashes — files keyed
  * by their field name, plus every plain text field.
  */
 export interface MultipartBody {
@@ -552,7 +615,7 @@ export interface MultipartBody {
 }
 
 /**
- * The multipart state slice `createMultipart` stashes.
+ * Describes the multipart state slice `createMultipart` stashes.
  *
  * @remarks
  * Present only once `createMultipart` has fully parsed a multipart request.
diff --git a/src/server/constants.ts b/src/server/constants.ts
index 3d7b907..87d2031 100644
--- a/src/server/constants.ts
+++ b/src/server/constants.ts
@@ -1,52 +1,65 @@
-import type { MultipartReason } from './types.js'
-
-// ============================================================================
-//  @orkestrel/middleware/server — node-face defaults (AGENTS §5
-//  constants.ts). Not named in the original dispatch's owned-file list, but
-//  added per AGENTS §5 (constants are centralized, never inlined) — the
-//  natural completion of the pattern U1 already established on the core
-//  face. Documented as a builder latitude decision, not a deviation.
-// ============================================================================
-
-/** The HTTP status `createMultipart` renders for each {@link MultipartReason}. */
-export const MULTIPART_REASON_STATUS: Readonly<Record<MultipartReason, number>> = Object.freeze({
+import type { MultipartErrorCode, StaticOptions } from './types.js'
+import type { Encoding } from '@orkestrel/server'
+
+/** Holds the HTTP status `createMultipart` renders for each {@link MultipartErrorCode}. */
+export const MULTIPART_STATUS: Readonly<Record<MultipartErrorCode, number>> = Object.freeze({
 	limit: 413,
 	malformed: 400,
 	rejected: 415,
 })
 
-/** `createStatic`'s default directory-index filename. */
+/**
+ * Holds the `Symbol.for` brand {@link MultipartError} carries so
+ * {@link isMultipartError} recognizes an instance across duplicate copies of
+ * this package — a registry symbol rather than a module-local `Symbol()`,
+ * which would mint an unequal symbol per copy.
+ */
+export const MULTIPART_ERROR_BRAND: unique symbol = Symbol.for(
+	'@orkestrel/middleware.MultipartError',
+)
+
+/** Names `createStatic`'s default directory-index filename. */
 export const DEFAULT_STATIC_INDEX = 'index.html'
 
-/** `createStatic`'s `fallback: true` default excluded path prefix. */
+/** Names `createStatic`'s `fallback: true` default excluded path prefix. */
 export const DEFAULT_STATIC_FALLBACK_EXCLUDE = '/api'
 
-/** The MIME type served when a file extension has no known mapping. */
+/** Names `createStatic`'s default policy for a path carrying a dotfile segment. */
+export const DEFAULT_STATIC_DOTFILES: NonNullable<StaticOptions['dotfiles']> = 'ignore'
+
+/**
+ * Lists the content-codings the node face's `createCompression` offers — the two
+ * `node:zlib` guarantees on every Node runtime, so this face never
+ * feature-detects.
+ */
+export const NODE_COMPRESSION_ENCODINGS: readonly Encoding[] = Object.freeze(['gzip', 'deflate'])
+
+/** Names the MIME type served when a file extension has no known mapping. */
 export const DEFAULT_CONTENT_TYPE = 'application/octet-stream'
 
-/** `createMultipart`'s default per-file byte-size cap. */
-export const DEFAULT_MULTIPART_FILE = 10_485_760
+/** Holds `createMultipart`'s default per-file byte-size cap. */
+export const DEFAULT_MULTIPART_FILE_SIZE = 10_485_760
 
-/** `createMultipart`'s default maximum file-part count. */
-export const DEFAULT_MULTIPART_FILES = 10
+/** Holds `createMultipart`'s default maximum file-part count. */
+export const DEFAULT_MULTIPART_FILE_COUNT = 10
 
-/** `createMultipart`'s default per-field byte-size cap. */
-export const DEFAULT_MULTIPART_FIELD = 65_536
+/** Holds `createMultipart`'s default per-field byte-size cap. */
+export const DEFAULT_MULTIPART_FIELD_SIZE = 65_536
 
-/** `createMultipart`'s default maximum field-part count. */
-export const DEFAULT_MULTIPART_FIELDS = 100
+/** Holds `createMultipart`'s default maximum field-part count. */
+export const DEFAULT_MULTIPART_FIELD_COUNT = 100
 
-/** `createMultipart`'s default combined request-body byte-size cap. */
+/** Holds `createMultipart`'s default combined request-body byte-size cap. */
 export const DEFAULT_MULTIPART_TOTAL = 52_428_800
 
-/** The maximum bytes a single multipart part's header block may occupy before it is malformed. */
+/** Holds the maximum bytes a single multipart part's header block may occupy before it is malformed. */
 export const MULTIPART_MAX_HEADER_BLOCK = 16_384
 
-/** The maximum bytes scanned before the first multipart boundary is found before it is malformed. */
+/** Holds the maximum bytes scanned before the first multipart boundary is found before it is malformed. */
 export const MULTIPART_MAX_PREAMBLE = 65_536
 
 /**
- * Windows reserved device-name stems (CVE-2025-27210) — matched
+ * Lists the Windows reserved device-name stems (CVE-2025-27210) — matched
  * case-insensitively against the segment's stem (before its first `.`).
  */
 export const RESERVED_DEVICE_NAMES: ReadonlySet<string> = Object.freeze(
@@ -76,7 +89,7 @@ export const RESERVED_DEVICE_NAMES: ReadonlySet<string> = Object.freeze(
 	]),
 )
 
-/** File-extension (lowercase, with leading `.`) → MIME type lookup table for static serving. */
+/** Holds the file-extension (lowercase, with leading `.`) → MIME type lookup table for static serving. */
 export const EXTENSION_TYPES: Readonly<Record<string, string>> = Object.freeze({
 	'.html': 'text/html; charset=utf-8',
 	'.htm': 'text/html; charset=utf-8',
diff --git a/src/server/errors.ts b/src/server/errors.ts
index c2e0760..5bfd800 100644
--- a/src/server/errors.ts
+++ b/src/server/errors.ts
@@ -1,25 +1,20 @@
-import type { MultipartReason } from './types.js'
-import { MULTIPART_REASON_STATUS } from './constants.js'
-
-// ============================================================================
-//  @orkestrel/middleware/server — MultipartError (AGENTS §5 errors.ts).
-//  Modeled on the peer `@orkestrel/server` HTTPError class shape (status +
-//  message + optional context) — MultipartError additionally carries the
-//  `reason` axis createMultipart's caller narrows on, mapped to its HTTP
-//  status via {@link MULTIPART_REASON_STATUS}: 'limit' → 413, 'malformed' →
-//  400, 'rejected' → 415.
-// ============================================================================
+import type { MultipartErrorCode } from './types.js'
+import { HTTPError } from '@orkestrel/server'
+import { MULTIPART_ERROR_BRAND, MULTIPART_STATUS } from './constants.js'
 
 /**
- * An error `createMultipart` throws when a streamed multipart request fails
+ * Represents an error `createMultipart` throws when a streamed multipart request fails
  * a mid-stream limit, is structurally malformed, or has a file whose sniffed
  * bytes are rejected by the configured `allowed` MIME list.
  *
  * @remarks
- * Carries the HTTP `status` derived from `reason` (limit → 413, malformed →
- * 400, rejected → 415) and an optional `context` record. Rendered by
- * `createBoundary` like any other `HTTPError`-shaped throw. Narrow a caught
- * value with {@link isMultipartError}.
+ * Extends the peer `HTTPError`, which already publishes the `status`,
+ * `context`, and brand members every fleet error of this shape carries, and
+ * adds the machine-readable `code` axis a caller narrows on. `status` is
+ * derived from `code` through {@link MULTIPART_STATUS} (limit → 413, malformed →
+ * 400, rejected → 415), so `createBoundary` — or any other `isHTTPError`-aware
+ * renderer — maps it without knowing this face's error type. Narrow a caught
+ * value to the richer type with {@link isMultipartError}.
  *
  * @example
  * ```ts
@@ -28,37 +23,32 @@ import { MULTIPART_REASON_STATUS } from './constants.js'
  * throw new MultipartError('limit', 'too many files')
  * ```
  */
-export class MultipartError extends Error {
-	readonly status: number
-	readonly reason: MultipartReason
-	readonly context?: Readonly<Record<string, unknown>>
+export class MultipartError extends HTTPError {
+	readonly code: MultipartErrorCode
+	readonly [MULTIPART_ERROR_BRAND] = true
 
 	constructor(
-		reason: MultipartReason,
+		code: MultipartErrorCode,
 		message: string,
 		context?: Readonly<Record<string, unknown>>,
 	) {
-		super(message)
-		this.status = MULTIPART_REASON_STATUS[reason]
-		this.reason = reason
-		if (context !== undefined) this.context = context
-		Object.defineProperty(this, Symbol.for('@orkestrel/middleware.MultipartError'), {
-			value: true,
-		})
+		super(MULTIPART_STATUS[code], message, context)
+		this.name = 'MultipartError'
+		this.code = code
 	}
 }
 
 /**
- * Narrow an unknown caught value to a {@link MultipartError}.
+ * Narrows an unknown caught value to a {@link MultipartError}.
  *
  * @remarks
  * Structural, not `instanceof` — tests that `value` is a non-null object
- * carrying the module-scope brand, a numeric `status`, and a `reason` in the
- * parser's set of reason strings (`'limit' | 'malformed' | 'rejected'`).
+ * carrying {@link MULTIPART_ERROR_BRAND}, a numeric `status`, and a `code`
+ * in the parser's {@link MultipartErrorCode} set (`'limit' | 'malformed' | 'rejected'`).
  * Total: never throws, returns `false` for any off-shape input.
  *
  * @param value - The value to test (typically a `catch` binding)
- * @returns `true` when `value` is a {@link MultipartError}
+ * @returns True if `value` is a {@link MultipartError}; false otherwise
  *
  * @example
  * ```ts
@@ -67,16 +57,16 @@ export class MultipartError extends Error {
  * try {
  * 	await parse(request)
  * } catch (error) {
- * 	if (isMultipartError(error)) console.log(error.status, error.reason)
+ * 	if (isMultipartError(error)) console.log(error.status, error.code)
  * }
  * ```
  */
 export function isMultipartError(value: unknown): value is MultipartError {
 	if (typeof value !== 'object' || value === null) return false
-	if (!(Symbol.for('@orkestrel/middleware.MultipartError') in value)) return false
-	if (!('status' in value) || !('reason' in value)) return false
+	if (!(MULTIPART_ERROR_BRAND in value)) return false
+	if (!('status' in value) || !('code' in value)) return false
 	if (typeof value.status !== 'number') return false
-	if (value.reason !== 'limit' && value.reason !== 'malformed' && value.reason !== 'rejected')
+	if (value.code !== 'limit' && value.code !== 'malformed' && value.code !== 'rejected')
 		return false
 	return true
 }
diff --git a/src/server/index.ts b/src/server/index.ts
index 753bc71..0b2e5dc 100644
--- a/src/server/index.ts
+++ b/src/server/index.ts
@@ -2,4 +2,5 @@ export * from './types.js'
 export * from './constants.js'
 export * from './errors.js'
 export * from './helpers.js'
+export * from './parsers.js'
 export * from './middlewares.js'
diff --git a/src/server/types.ts b/src/server/types.ts
index e4baf1a..910c32a 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -1,15 +1,7 @@
 import type { MultipartFile } from '@src/core'
 
-// ============================================================================
-//  @orkestrel/middleware/server — node-face type surface (AGENTS §5 source of
-//  truth). Options and source values for in-memory assets, filesystem static
-//  files, and multipart uploads. The request-time multipart state slice
-//  (`MultipartState`) and parsed `MultipartBody`/`MultipartFile` shapes are
-//  OWNED by the pure core face and re-exported from the server barrel.
-// ============================================================================
-
 /**
- * One in-memory asset representation returned by an {@link AssetSourceInterface}.
+ * Describes one in-memory asset representation returned by an {@link AssetSourceInterface}.
  *
  * @remarks
  * - `body` — the representation bytes. `createAssets` copies them before use.
@@ -22,15 +14,17 @@ export interface Asset {
 }
 
 /**
- * Read in-memory assets by decoded, browser-build-relative path.
+ * Reads in-memory assets by decoded, browser-build-relative path.
  *
  * @remarks
  * A successful result is cached by `createAssets`; later source changes do
  * not alter that path's response. A miss may be read again on a later request.
+ * `read` therefore owes a BOUNDED key set: that cache retains every
+ * successful result for the factory's lifetime and evicts nothing.
  */
 export interface AssetSourceInterface {
 	/**
-	 * Read one asset representation.
+	 * Reads one asset representation.
 	 *
 	 * @param path - The validated relative asset path
 	 * @returns The asset, or `undefined` when the path is absent
@@ -39,35 +33,44 @@ export interface AssetSourceInterface {
 }
 
 /**
- * Options for `createAssets` — in-memory identity/Brotli asset serving.
+ * Configures `createAssets` — in-memory identity/Brotli asset serving.
  *
- * @param options - See fields below
  * @remarks
- * - `source` — the required in-memory asset reader.
+ * - `source` — the required in-memory asset reader. It MUST answer a bounded
+ *   key set and return `undefined` for every key outside it, because
+ *   `createAssets` retains every successful result for the factory's lifetime
+ *   and evicts nothing. A `source` that synthesizes a representation for an
+ *   arbitrary key therefore grows that cache without limit under request
+ *   pressure.
  */
 export interface AssetOptions {
 	readonly source: AssetSourceInterface
 }
 
 /**
- * Options for `createStatic` — node `fs`-backed static file serving.
+ * Configures `createStatic` — node `fs`-backed static file serving.
  *
- * @param options - See fields below
  * @remarks
  * - `root` — the directory every request resolves under, resolved once at
  *   construction. REQUIRED.
  * - `prefix` — a URL path prefix stripped (on a segment boundary) before
  *   resolving under `root`.
- * - `index` — the filename served for a directory hit; defaults to
- *   {@link DEFAULT_STATIC_INDEX}.
+ * - `index` — the filename served for a directory hit and by the SPA
+ *   fallback; defaults to {@link DEFAULT_STATIC_INDEX}. The fallback serves
+ *   it whatever `dotfiles` is set to, because this path is operator-
+ *   configured rather than request-derived.
  * - `dotfiles` — the policy for a path with a dotfile segment: `'ignore'`
- *   (default, falls through to `next()`), `'deny'` (403), or `'allow'`
- *   (serves it).
+ *   (falls through to `next()`), `'deny'` (403), or `'allow'` (serves it);
+ *   defaults to {@link DEFAULT_STATIC_DOTFILES}.
  * - `cache` — `Cache-Control: max-age=<cache>` in seconds, when set.
  * - `etag` — whether to compute and honor a weak file `ETag`; defaults to `true`.
  * - `fallback` — SPA fallback: `false` (default, off), `true` (on, excluding
  *   {@link DEFAULT_STATIC_FALLBACK_EXCLUDE}), or `{ exclude }` for a custom
- *   excluded prefix.
+ *   excluded prefix. An eligible `GET` or `HEAD` navigation miss answers with
+ *   `index` through the SAME handle-`fstat` header block a directly requested
+ *   file answers through, so `cache`, `etag`, conditional revalidation,
+ *   `HEAD`, and ranges are identical on both routes; `index` reaches the
+ *   client through this route whatever `dotfiles` is set to.
  */
 export interface StaticOptions {
 	readonly root: string
@@ -80,35 +83,50 @@ export interface StaticOptions {
 }
 
 /**
- * Per-category size/count caps `createMultipart` enforces MID-STREAM.
+ * Describes the caller's partial {@link MultipartLimits} — `createMultipart`'s `limits`
+ * option, with every member optional.
  *
  * @remarks
- * - `file` — the maximum size in bytes of one uploaded file; defaults to
- *   {@link DEFAULT_MULTIPART_FILE}.
- * - `files` — the maximum number of file parts; defaults to
- *   {@link DEFAULT_MULTIPART_FILES}.
- * - `field` — the maximum size in bytes of one text field; defaults to
- *   {@link DEFAULT_MULTIPART_FIELD}.
- * - `fields` — the maximum number of text field parts; defaults to
- *   {@link DEFAULT_MULTIPART_FIELDS}.
+ * `resolveMultipartLimits` applies each documented default to an omitted leaf,
+ * so a caller states only the caps it wants to move.
+ * - `file` — the per-file caps: `size` in bytes, `count` of file parts.
+ * - `field` — the per-field caps: `size` in bytes, `count` of text field parts.
+ * - `total` — the maximum combined byte size of the whole request body.
+ */
+export interface MultipartLimitsInput {
+	readonly file?: { readonly size?: number; readonly count?: number }
+	readonly field?: { readonly size?: number; readonly count?: number }
+	readonly total?: number
+}
+
+/**
+ * Describes the per-category size/count caps `createMultipart` enforces MID-STREAM — the
+ * effective limits, every documented default already applied.
+ *
+ * @remarks
+ * - `file.size` — the maximum size in bytes of one uploaded file; defaults to
+ *   {@link DEFAULT_MULTIPART_FILE_SIZE}.
+ * - `file.count` — the maximum number of file parts; defaults to
+ *   {@link DEFAULT_MULTIPART_FILE_COUNT}.
+ * - `field.size` — the maximum size in bytes of one text field; defaults to
+ *   {@link DEFAULT_MULTIPART_FIELD_SIZE}.
+ * - `field.count` — the maximum number of text field parts; defaults to
+ *   {@link DEFAULT_MULTIPART_FIELD_COUNT}.
  * - `total` — the maximum combined byte size of the whole request body;
  *   defaults to {@link DEFAULT_MULTIPART_TOTAL}.
  */
 export interface MultipartLimits {
-	readonly file?: number
-	readonly files?: number
-	readonly field?: number
-	readonly fields?: number
-	readonly total?: number
+	readonly file: { readonly size: number; readonly count: number }
+	readonly field: { readonly size: number; readonly count: number }
+	readonly total: number
 }
 
 /**
- * Options for `createMultipart` — node `fs`/`os`/`crypto`-backed streaming
+ * Configures `createMultipart` — node `fs`/`os`/`crypto`-backed streaming
  * multipart upload parsing.
  *
- * @param options - See fields below
  * @remarks
- * - `limits` — see {@link MultipartLimits}.
+ * - `limits` — see {@link MultipartLimitsInput}.
  * - `allowed` — a MIME allow-list validated against SNIFFED (not merely
  *   declared) bytes; an empty array allows nothing. Omitted ⇒ no type
  *   rejection.
@@ -116,20 +134,20 @@ export interface MultipartLimits {
  *   `os.tmpdir()`.
  */
 export interface MultipartOptions {
-	readonly limits?: MultipartLimits
+	readonly limits?: MultipartLimitsInput
 	readonly allowed?: readonly string[]
 	readonly directory?: string
 }
 
 /**
- * Why `createMultipart` rejected a request — the axis {@link MultipartError}
- * maps onto its HTTP status: `'limit'` → 413, `'malformed'` → 400,
- * `'rejected'` → 415.
+ * Names the reason `createMultipart` rejected a request — the machine-readable code
+ * {@link MultipartError} carries and maps onto its HTTP status: `'limit'` →
+ * 413, `'malformed'` → 400, `'rejected'` → 415.
  */
-export type MultipartReason = 'limit' | 'malformed' | 'rejected'
+export type MultipartErrorCode = 'limit' | 'malformed' | 'rejected'
 
 /**
- * The lifecycle stage of one staged upload's temp file.
+ * Names the lifecycle stage of one staged upload's temp file.
  *
  * @remarks
  * `'staged'` — written to the configured temp directory under a random name,
@@ -138,7 +156,7 @@ export type MultipartReason = 'limit' | 'malformed' | 'rejected'
 export type UploadStatus = 'staged' | 'moved'
 
 /**
- * One uploaded file's post-parse record — the node-bound, richer sibling of
+ * Describes one uploaded file's post-parse record — the node-bound, richer sibling of
  * the pure core's {@link MultipartFile} (identical fields, `status` narrowed
  * to {@link UploadStatus}). Structurally assignable into {@link MultipartFile}
  * so a `createMultipart`-built {@link MultipartBody} satisfies the shared
@@ -149,40 +167,45 @@ export type UploadStatus = 'staged' | 'moved'
  * - `name` — the client-declared filename (METADATA ONLY — never used to
  *   build a filesystem path).
  * - `size` — the file's byte size.
- * - `mime` — the SNIFFED (magic-byte-detected) MIME type.
- * - `validated` — `true` when the sniffed type matches the declared
- *   `Content-Type`.
+ * - `mime` — the SNIFFED (magic-byte-detected) MIME type when a signature
+ *   matches; otherwise the part's declared `Content-Type`; otherwise
+ *   {@link DEFAULT_CONTENT_TYPE}. Read `validated` to tell which.
+ * - `validated` — `true` when a signature matched AND the sniffed type equals
+ *   the declared `Content-Type`, so `mime` is the sniffed fact. `false` means
+ *   `mime` may be the client-declared value.
  * - `status` — see {@link UploadStatus}.
  * - `path` — the file's current on-disk path.
  */
-export interface UploadedFileInterface extends Omit<MultipartFile, 'status'> {
+export interface UploadedFile extends Omit<MultipartFile, 'status'> {
 	readonly status: UploadStatus
 }
 
 /**
- * One multipart part's parsed header block — `parsePartHeaders`'s return
+ * Describes one multipart part's parsed header block — `parsePartHeaders`'s return
  * shape.
  *
  * @remarks
  * - `name` — the `Content-Disposition` `name` parameter, or `undefined` when absent.
  * - `filename` — the `Content-Disposition` `filename` parameter, or `undefined` when absent.
- * - `contentType` — the part's declared `Content-Type` header value, or `undefined` when absent.
+ * - `mime` — the part's declared `Content-Type` header value, or `undefined` when absent.
  */
 export interface PartHeaders {
 	readonly name: string | undefined
 	readonly filename: string | undefined
-	readonly contentType: string | undefined
+	readonly mime: string | undefined
 }
 
 /**
- * The full field set `createUploadedFile` needs to build an
- * {@link UploadedFileInterface} record.
+ * Describes the full field set `createUploadedFile` needs to build an
+ * {@link UploadedFile} record.
  *
  * @remarks
  * - `field` — the multipart field name the file was submitted under.
  * - `name` — the client-declared filename (metadata only).
  * - `size` — the file's byte size.
- * - `mime` — the sniffed MIME type.
+ * - `mime` — the SNIFFED (magic-byte-detected) MIME type when a signature
+ *   matches; otherwise the part's declared `Content-Type`; otherwise
+ *   {@link DEFAULT_CONTENT_TYPE}.
  * - `validated` — `true` when the sniffed type matches the declared `Content-Type`.
  * - `status` — see {@link UploadStatus}.
  * - `path` — the file's current on-disk path.
@@ -198,17 +221,17 @@ export interface UploadedFileInput {
 }
 
 /**
- * Options for the node face's `createCompression` — `node:zlib`-backed
+ * Configures the node face's `createCompression` — `node:zlib`-backed
  * response compression.
  *
- * @param options - See fields below
  * @remarks
  * - `threshold` — the minimum buffered body size (bytes) worth compressing;
  *   defaults to {@link DEFAULT_COMPRESSION_THRESHOLD}.
  * - `filter` — an additional predicate a response must pass before
- *   compression is attempted; defaults to always-allow. `encodings` is fixed
- *   to `['gzip', 'deflate']` and is not configurable (see the peer `Encoding`
- *   type limitation documented on `createCompression`).
+ *   compression is attempted; defaults to always-allow. The offered codings
+ *   are fixed to {@link NODE_COMPRESSION_ENCODINGS} and are not configurable
+ *   (see the peer `Encoding` type limitation documented on
+ *   `createCompression`).
  */
 export interface NodeCompressionOptions {
 	readonly threshold?: number
```
