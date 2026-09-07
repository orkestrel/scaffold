# Brief — P.1 `d7n-middleware-prep` (middleware's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/middleware` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b073558`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

middleware's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== middleware 2026-09-07T16:43:47Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
98:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 834ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### middleware (b073558, version 0.0.19, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 32 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setup.ts(19)
   tests/setupServer.ts(17)
   tests/src/server/parsers.test.ts(1)
   src/server/middlewares.ts(1)
   src/core/shapers.ts(1)
-- docs
   guides/middleware.md function isCompressionNegotiated: guide "Narrow a negotiated `Encoding` to one worth actually compressing with." source "Checks whether a negotiated `Accept-Encoding` outcome is worth acting on — `createCompression`'s negotiation-eligibility half of the skip list."
   guides/middleware.md function rebuildResponse: guide "Reconstruct a `Response` with a new body, copying status/headers (with overrides)." source "Rebuilds a `Response` around a replacement body while preserving its status/statusText — the buffered-response reconstruction shared by the compression and ETag batteries after they have consumed `response.arrayBuffer()`."
   guides/middleware.md function compressResponse: guide "The shared compression decision skeleton — eligibility, negotiation, buffer, compress." source "Runs the shared negotiate → skip → threshold → compress → header-set skeleton both faces' `createCompression` batteries compose — response-body compression over a caller-supplied set of feature-detected codings."
   guides/middleware.md function transferSessionState: guide "Copy one session's `state` onto another — the `regenerate()` state-carry." source "Copies every entry of one session's `state` into another — the regenerate state-carry `createSession`'s `control.regenerate()` applies."
   guides/middleware.md function sessionExpired: guide "Whether a session's idle/absolute-lifetime thresholds have elapsed as of `now`." source "Checks whether a session has aged past its idle timeout or absolute lifetime as of `now` — the pure expiry predicate `MemorySessionStore` delegates to."
   guides/middleware.md function snapshotSession: guide "Copy a session's `state` into a plain, serializable `{ id; state }` record." source "Snapshots a session's `state` into a plain, serializable record — the projection a durable store's `set` writes to disk."
   guides/middleware.md function validateSessionLimits: guide "Refuse a malformed `ttl`/`lifetime` — the construction gate both stores apply." source "Validates a store's idle and absolute-lifetime thresholds, throwing when either is present and malformed — the shared construction gate `MemorySessionStore` and `DatabaseSessionStore` both apply, so one malformed `ttl` is refused identically by whichever store receives it."
   guides/middleware.md function isPreflight: guide "Whether a request is a CORS preflight (`OPTIONS` + `Access-Control-Request-Method`)." source "Determines whether a request is a CORS PREFLIGHT — an `OPTIONS` request carrying an `Access-Control-Request-Method` header."
   guides/middleware.md function buildClient: guide "Build a `Client` from a resolved (or absent) client IP." source "Builds the `Client` slice `createForwarded` stashes, from the resolved client IP — a leaf shaping helper."
   guides/middleware.md function equalsConstantTime: guide "Constant-time string equality (avoids a timing oracle in the CSRF double-submit compare)." source "Compares two strings in constant time — `createCSRF`'s double-submit token comparison, avoiding a timing oracle on the submitted-vs-cookie match."
   guides/middleware.md function isSession: guide "Whether a value implements `SessionInterface`." source "Determines whether a value implements `SessionInterface` — a total structural guard: an `id` string, a `state` `Map`, and the `set`, `delete`, and `clear` mutators. Prototype-agnostic — accepts a plain object, a null-prototype object, AND a class instance (a real `Session`), since a restored/stored session is routinely a class instance, not a literal."
   guides/middleware.md function isSessionControl: guide "Whether a value implements `SessionControlInterface`." source "Determines whether a value implements `SessionControlInterface` — a total structural guard: callable `regenerate` and `destroy`."
   guides/middleware.md function isMultipartFile: guide "Whether a value implements `MultipartFile`." source "Determines whether a value is one staged `MultipartFile` record — a total structural guard checking every required field's shape."
   guides/middleware.md function isMultipartBody: guide "Whether a value implements `MultipartBody`." source "Determines whether a value implements `MultipartBody` — a total structural guard: `files` keyed by field name to arrays of `MultipartFile`, and a `fields` string record."
   guides/middleware.md function resolveStaticPath: guide "The traversal-safe request-path-to-filesystem-path resolver (exact algorithm order load-bearing)." source "Resolves a request pathname to an on-disk path UNDER `root`, or `undefined` when it cannot — the traversal guard, whose algorithm and order are exact: strip `prefix` on a segment boundary → `decodeURIComponent` (a malformed escape refuses, never throws) → reject a NUL byte → strip the leading path separator FIRST (so a leading `..` survives `normalize` as a genuine climbing segment) → `normalize` → refuse any Windows reserved- device-name segment (`isReservedDeviceName`) → `resolve` and require the result under `root`."
   guides/middleware.md function isUnderPath: guide "Segment-boundary under-path test shared by the traversal strip and the SPA `exclude` (URL containment)." source "Checks whether `pathname` is `prefix` itself or lies under it on a SEGMENT boundary — the shared under-path test `resolveStaticPath`'s prefix strip and `createStatic`'s SPA-fallback `exclude` both apply, so `exclude: '/api'` matches `/api` and `/api/x` but never `/apifoo`."
   guides/middleware.md function resolveStaticFallbackPath: guide "Resolve the fixed SPA shell path only for an eligible navigation miss." source "Resolves the fixed SPA shell path when a static-file miss is eligible for fallback."
   guides/middleware.md function isContainedPath: guide "Separator-correct FILESYSTEM containment test for `fs.realpath` output — `(child, parent)`, opposite order from `isUnderPath`." source "Checks whether `child` is `parent` itself or lies inside it on-disk — the FILESYSTEM containment predicate `createStatic` applies to `fs.realpath` output (never to a URL pathname — that is `isUnderPath`'s job)."
   guides/middleware.md function resolveContainedRealPath: guide "Canonicalize a candidate path and return it only when it lies inside an already-canonical root." source "Canonicalizes `candidate` and returns it only when it lies inside `rootReal` — the shared realpath-then-contain step `createStatic` applies to a directory index and to its SPA shell."
   guides/middleware.md function isReservedDeviceName: guide "Whether a path segment is a Windows reserved device name (CVE-2025-27210)." source "Checks whether a path segment is a Windows reserved device name (CVE-2025-27210)."
   guides/middleware.md function isDotfilePath: guide "Whether a relative path has a dotfile segment." source "Checks whether a relative path (already resolved under a static root) has any segment starting with `.` — a dotfile or dot-directory."
   guides/middleware.md function lookupContentType: guide "Resolve a `Content-Type` from a file's extension." source "Looks up the MIME type for a static file path by its extension."
   guides/middleware.md function computeFileETag: guide "Compute a weak file `ETag` from size + mtime (`W/\"<size>-<floor(mtimeMs)>\"`)." source "Computes a static file's weak ETag from its size and modification time."
   guides/middleware.md function detectMIME: guide "Sniff a MIME type from a file's leading magic bytes." source "Sniffs a MIME type from a file's leading bytes against a small magic-byte table (jpeg, png, gif87a/89a, webp, pdf, zip)."
   guides/middleware.md function matchesBytes: guide "Test one exact byte signature at a requested offset." source "Checks whether `bytes` contains `signature` at the requested offset."
   guides/middleware.md function compressNodeBytes: guide "Compress bytes with Node's guaranteed zlib gzip/deflate codecs." source "Compresses response bytes with Node's guaranteed zlib gzip/deflate codecs."
   guides/middleware.md function extractMultipartBoundary: guide "Extract the multipart boundary token from a `Content-Type` header." source "Extracts the `boundary` parameter from a `Content-Type` header, or `undefined` when the request is not `multipart/form-data`."
   guides/middleware.md function parsePartHeaders: guide "Parse one multipart part's raw header block into its field/filename/mime facts." source "Parses one multipart part's raw header block into its `name` (from `Content-Disposition`), optional `filename`, and optional `Content-Type`."
   guides/middleware.md function resolveMultipartLimits: guide "Resolve a `MultipartLimitsInput` into the effective `MultipartLimits`, one default per omitted leaf." source "Resolves `createMultipart`'s effective `MultipartLimits`, applying every documented default to an omitted leaf."
   guides/middleware.md function createUploadedFile: guide "Build a frozen `UploadedFile` record." source "Builds a frozen `UploadedFile` record."
   guides/middleware.md function streamFile: guide "Open a DOM `ReadableStream` over a path's or open `FileHandle`'s bytes (optional byte range), for a `Response` body." source "Adapts a `node:fs` read stream over a file path (or an already-open `FileHandle`) into a DOM-compatible `ReadableStream<Uint8Array>` — the single shared node↔web stream bridge every static-file and uploaded-file response body routes through."
   guides/middleware.md function streamUploadedFile: guide "Open a `ReadableStream` over a staged upload's on-disk bytes." source "Opens a staged/moved uploaded file as a web `ReadableStream`."
   guides/middleware.md function readUploadedFile: guide "Read a staged upload's on-disk bytes into one `Uint8Array`." source "Reads a staged/moved uploaded file's full contents into memory."
   guides/middleware.md function moveUploadedFile: guide "Relocate a staged upload's temp file (rename, with EXDEV copy+unlink fallback)." source "Moves a staged uploaded file to its final `destination`."
   guides/middleware.md function unlinkStagedFiles: guide "Best-effort unlink of every still-`'staged'` file in a `MultipartBody` (downstream-throw cleanup)." source "Attempts to unlink every still-`'staged'` file in a parsed `MultipartBody` — the fail-closed cleanup `createMultipart` runs when its downstream handler throws, mirroring `parseMultipartRequest`'s own cleanup pattern (a missing file is already gone; failures are swallowed)."
   guides/middleware.md function parseMultipartRequest: guide "Stream-parse a multipart request body into a `MultipartBody`, or `undefined`." source "Stream-parses a `multipart/form-data` request into its files and fields — the mid-stream state machine `createMultipart` drives."
   guides/middleware.md class Session: guide "The default session entity — `id` + a `state` view written through its mutators; implements `SessionInterface`." source "Represents a server-managed session's default entity — the `create` option's default value for `createSession`. It ships without a bare `create*` factory of its own, because the name `createSession` belongs to the battery; `createRestoredSession` rebuilds one from a stored snapshot."
   guides/middleware.md class MemorySessionStore: guide "The default in-process `SessionStoreInterface` — idle + absolute-lifetime eviction." source "Implements the default in-process `SessionStoreInterface` — a `Map`-backed store enforcing both an idle timeout and an absolute lifetime, with lazy (read-time) eviction, a bounded capacity, and no background timers."
   guides/middleware.md class DatabaseSessionStore: guide "A durable `SessionStoreInterface` over an `@orkestrel/database` table — same idle + absolute-lifetime contract as `MemorySessionStore`." source "Implements a durable `SessionStoreInterface` over an `@orkestrel/database` table — the same idle-timeout + absolute-lifetime contract as `MemorySessionStore`, backed by a caller-supplied `TableInterface` instead of an in-process `Map`."
   guides/middleware.md function createCookieTransport: guide "Build a signed-cookie `SessionTransportInterface`." source "Creates a signed-cookie `SessionTransportInterface` — the session id travels as a `signToken`-signed cookie value."
   guides/middleware.md function createHeaderTransport: guide "Build a bare-header `SessionTransportInterface`." source "Creates a bare-header `SessionTransportInterface` — the session id travels verbatim in a request/response header."
   guides/middleware.md function createMemorySessionStore: guide "Build a `MemorySessionStore` as a `SessionStoreInterface`." source "Creates the default in-process `SessionStoreInterface` — a `Map`-backed store enforcing an idle timeout and an absolute lifetime."
   guides/middleware.md function createDatabaseSessionStore: guide "Build a `DatabaseSessionStore` as a `SessionStoreInterface`, over a caller-opened `@orkestrel/database` table." source "Creates a `DatabaseSessionStore` as a `SessionStoreInterface` — the durable counterpart to `createMemorySessionStore`, over a caller-opened `@orkestrel/database` table (declare it with `sessionColumns`)."
   guides/middleware.md function createRestoredSession: guide "Rebuild a `Session` from an untrusted snapshot value, or `undefined` when malformed." source "Rebuilds a `Session` from an untrusted snapshot value — the inverse of `snapshotSession` and a durable store's `get` deserialization step."
   guides/middleware.md class MultipartError: guide "An `HTTPError` subclass `createMultipart` throws — adds the `code` axis." source "Represents an error `createMultipart` throws when a streamed multipart request fails a mid-stream limit, is structurally malformed, or has a file whose sniffed bytes are rejected by the configured `allowed` MIME list."
   guides/middleware.md function isMultipartError: guide "Narrow an unknown caught value to a `MultipartError`." source "Narrows an unknown caught value to a `MultipartError`."
   guides/middleware.md AssetSourceInterface.read: guide absent source "Reads one asset representation."
   guides/middleware.md SessionInterface.set: guide absent source absent
   guides/middleware.md SessionInterface.delete: guide absent source absent
   guides/middleware.md SessionInterface.clear: guide absent source absent
   guides/middleware.md SessionControlInterface.regenerate: guide absent source absent
   guides/middleware.md SessionControlInterface.destroy: guide absent source absent
   guides/middleware.md SessionStoreInterface.get: guide absent source absent
   guides/middleware.md SessionStoreInterface.set: guide absent source absent
   guides/middleware.md SessionStoreInterface.delete: guide absent source absent
   guides/middleware.md SessionTransportInterface.read: guide absent source absent
   guides/middleware.md SessionTransportInterface.write: guide absent source absent
   guides/middleware.md SessionTransportInterface.clear: guide absent source absent
   guides/middleware.md pitch: readme absent tagline "This package's ONE guide, covering both faces — one guide per package: the pure, fetch-native core (`@orkestrel/middleware`) — `create{Noun}(options) => MiddlewareHandler<TState>` battery factories (boundary, telemetry, compression, security headers, CORS, deadlines, trusted-proxy client facts, ETag, bearer auth, rate limiting, body parsing, sessions, CSRF) plus the session/transport/store seam — and the node-bound face (`@orkestrel/middleware/server`) — in-memory asset serving, static file serving, and streaming multipart uploads, plus a `node:zlib`-guaranteed compression sibling. Every battery is built over the frozen `@orkestrel/server` middleware seam (`MiddlewareHandler`, `MiddlewareContext`, `compose`) and substrate (cookies, WebCrypto tokens, negotiation, conditionals, security primitives) — this package never re-implements the seam, only composes it into policy, supplying mechanism rather than product policy. Source: `src/core`, `src/server`. Surfaced through the `@orkestrel/middleware` / `@orkestrel/middleware/server` barrels (aliased `@src/core` / `@src/server` inside this repo)."
   rows read: 1, disagreements found: 182
   exit 1
-- check
   tests/guides.test.ts(106,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(109,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(113,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(128,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(143,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 17 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  17 failed | 21 passed (38)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 39 | summary 38 | banned 1 | tests/setup.ts(19) tests/setupServer.ts(17) tests/src/server/parsers.test.ts(1) src/server/middlewares.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for middleware (taken 2026-09-07T16:44Z by facts.sh)

- Checkout `/home/user/fleet/middleware`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b073558`, status: clean
- `package.json`: version `0.0.19`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 39 | summary 38 | banned 1 | tests/setup.ts(19) tests/setupServer.ts(17) tests/src/server/parsers.test.ts(1) src/server/middlewares.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept    | Spec                             | Source                                                   | Tests                                                                            |
    9:| ---------- | -------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
    10:| Middleware | [`middleware.md`](middleware.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/server`](../tests/src/server) |
    14:| Directory    | Guide                            |
    15:| ------------ | -------------------------------- |
    16:| `src/core`   | [`middleware.md`](middleware.md) |
    17:| `src/server` | [`middleware.md`](middleware.md) |
- Guide `guides/middleware.md`: 887 lines. Headings:
    1:# Middleware
    21:## Surface
    41:### Middlewares — core
    61:### Middlewares — node
    70:### Types
    127:### Constants
    174:### Shapers
    180:### Helpers — core
    205:### Validators — core
    216:### Helpers — node
    242:### Parsers — node
    248:### Entities
    262:### Factories
    272:### Errors
    279:## Methods
    287:#### `AssetSourceInterface`
    297:#### `SessionInterface`
    309:#### `SessionControlInterface`
    321:#### `SessionStoreInterface`
    335:#### `SessionTransportInterface`
    347:## Contract
    360:### The ordering doctrine
    406:### The security acceptance bar, as documented behavior
    513:## Patterns
    515:### Canonical onion — fetch-native runtime
    571:### Canonical onion — behind `@orkestrel/server`
    593:### Body: eager cache drive
    609:### Session: control handle, header transport, injected store
    634:### Session store seam — direct calls
    647:### Session store seam — durable database-backed store
    680:### Session transport seam — direct calls
    693:### CSRF: session-bound double-submit
    707:### Multipart: node face, sniffed-type allow-list
    727:### Multipart limits — direct resolution
    737:### Assets: in-memory source
    765:### Static: SPA fallback
    787:### Seam adaptations — read before wiring sessions or multipart
    808:### Practices
    827:## Tests
    878:## See also
- Table headers in `guides/middleware.md` (a header row is the row before a `| ---` row):
    43: | API                 | Kind     | Summary                                                                          |
    63: | API                 | Kind     | Summary                                                                              |
    72: | Type                        | Kind      | Shape                                                                                                                       |
    129: | API                               | Kind  | Summary                                                                                |
    176: | API              | Kind  | Summary                                                                                                                               |
    182: | API                         | Kind     | Summary                                                                                   |
    209: | API                | Kind     | Summary                                               |
    218: | API                         | Kind     | Summary                                                                                                                        |
    244: | API                     | Kind     | Summary                                                                       |
    250: | API                    | Kind  | Summary                                                                                                                                 |
    264: | API                          | Kind     | Summary                                                                                                        |
    274: | API                | Kind     | Summary                                                                  |
    293: | Method | Returns              | Behavior                                                       |
    303: | Method   | Returns   | Behavior                                                         |
    316: | Method       | Returns | Behavior                                                                |
    329: | Method   | Returns                   | Behavior                                                           |
    341: | Method  | Returns                               | Behavior                                                                                       |
- Rows of any `### Entities` table (the Kind cell):
    252:  `Session`              | class
    253:  `MemorySessionStore`   | class
    254:  `DatabaseSessionStore` | class
- H1 blockquote (`guides/middleware.md`):
    3: > This package's ONE guide, covering both faces — one guide per
    4: > package: the pure, fetch-native core (`@orkestrel/middleware`) —
    5: > `create{Noun}(options) => MiddlewareHandler<TState>` battery factories
    6: > (boundary, telemetry, compression, security headers, CORS, deadlines,
    7: > trusted-proxy client facts, ETag, bearer auth, rate limiting, body
    8: > parsing, sessions, CSRF) plus the session/transport/store seam — and the
    9: > node-bound face (`@orkestrel/middleware/server`) — in-memory asset serving,
    10: > static file serving, and streaming multipart uploads, plus a
    11: > `node:zlib`-guaranteed compression
    12: > sibling. Every battery is built over the frozen `@orkestrel/server`
    13: > middleware seam (`MiddlewareHandler`, `MiddlewareContext`, `compose`) and
    14: > substrate (cookies, WebCrypto tokens, negotiation, conditionals, security
    15: > primitives) — this package never re-implements the seam, only composes it
    16: > into policy, supplying mechanism rather than product policy. Source:
    17: > [`src/core`](../src/core), [`src/server`](../src/server). Surfaced
    18: > through the `@orkestrel/middleware` / `@orkestrel/middleware/server`
    19: > barrels (aliased `@src/core` / `@src/server` inside this repo).
- Opening prose after the blockquote (first two lines):
    21: ## Surface
    23: Mount a battery over the shipped seam — it closes over its guarded options
- README (`README.md`) first lines:
    # @orkestrel/middleware
    
    Batteries for the `@orkestrel/server` middleware seam — the frozen
    `MiddlewareHandler<TState>` / `compose` contract and its substrate ship
    policy-free; this package supplies the policies the server deliberately does
    not: boundary rendering, telemetry, compression, security headers, CORS,
    deadlines, trusted-proxy client facts, ETag, bearer auth, rate limiting, body
    parsing, sessions, CSRF, static files, and multipart uploads — each a typed
    `options => MiddlewareHandler<TState>` factory over the shipped seam.
    
    ## Install
    
- `## Patterns` fences, each with its nearest preceding heading:
    26: fence under "## Surface"
    520: fence under "### Canonical onion — fetch-native runtime"
    573: fence under "### Canonical onion — behind `@orkestrel/server`"
    595: fence under "### Body: eager cache drive"
    611: fence under "### Session: control handle, header transport, injected store"
    636: fence under "### Session store seam — direct calls"
    655: fence under "### Session store seam — durable database-backed store"
    682: fence under "### Session transport seam — direct calls"
    695: fence under "### CSRF: session-bound double-submit"
    709: fence under "### Multipart: node face, sniffed-type allow-list"
    729: fence under "### Multipart limits — direct resolution"
    739: fence under "### Assets: in-memory source"
    767: fence under "### Static: SPA fallback"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/helpers.ts:465:export function createUploadedFile(input: UploadedFile): UploadedFile {
    src/server/middlewares.ts:85:export function createAssets<TState>(options: AssetOptions): MiddlewareHandler<TState> {
    src/server/middlewares.ts:198:export function createStatic<TState>(options: StaticOptions): MiddlewareHandler<TState> {
    src/server/middlewares.ts:418:export function createMultipart<TState extends MultipartState>(
    src/server/middlewares.ts:469:export function createCompression<TState>(
    src/core/factories.ts:33:export function createCookieTransport(options: CookieTransportOptions): SessionTransportInterface {
    src/core/factories.ts:71:export function createHeaderTransport(options?: HeaderTransportOptions): SessionTransportInterface {
    src/core/factories.ts:106:export function createMemorySessionStore<S extends SessionInterface>(
    src/core/factories.ts:136:export function createDatabaseSessionStore<S extends SessionInterface = Session>(
    src/core/factories.ts:157:export function createRestoredSession(value: unknown): Session | undefined {
    src/core/middlewares.ts:104:export function createBoundary<TState>(options?: BoundaryOptions): MiddlewareHandler<TState> {
    src/core/middlewares.ts:149:export function createTelemetry<TState>(options: TelemetryOptions): MiddlewareHandler<TState> {
    src/core/middlewares.ts:185:export function createCompression<TState>(options?: CompressionOptions): MiddlewareHandler<TState> {
    src/core/middlewares.ts:222:export function createSecurity<TState extends IdentifierState>(
    src/core/middlewares.ts:322:export function createCors<TState>(options?: CorsOptions): MiddlewareHandler<TState> {
    src/core/middlewares.ts:372:export function createDeadline<TState>(options: DeadlineOptions): MiddlewareHandler<TState> {
    src/core/middlewares.ts:429:export function createForwarded<TState extends ClientState & ConnectionState>(
    src/core/middlewares.ts:468:export function createETag<TState>(options?: ETagOptions): MiddlewareHandler<TState> {
    src/core/middlewares.ts:506:export function createBearer<TState extends BearerState>(
    src/core/middlewares.ts:550:export function createLimiter<TState extends BearerState & ClientState & ConnectionState>(
    src/core/middlewares.ts:650:export function createBody<TState extends BodyState = BodyState>(): MiddlewareHandler<TState> {
    src/core/middlewares.ts:681:export function createSession<
    src/core/middlewares.ts:798:export function createCSRF<TState extends CSRFState & SessionState & ConnectionState>(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/MultipartParser.ts:16:export class MultipartParser {
    src/server/errors.ts:26:export class MultipartError extends HTTPError {
    src/core/stores/MemorySessionStore.ts:41:export class MemorySessionStore<S extends SessionInterface> implements SessionStoreInterface<S> {
    src/core/stores/DatabaseSessionStore.ts:49:export class DatabaseSessionStore<
    src/core/Session.ts:21:export class Session implements SessionInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/helpers.ts:21
    src/server/middlewares.ts:4
    src/server/parsers.ts:1
    src/server/errors.ts:2
    src/core/shapers.ts:1
    src/core/stores/MemorySessionStore.ts:1
    src/core/stores/DatabaseSessionStore.ts:1
    src/core/validators.ts:4
    src/core/factories.ts:5
    src/core/helpers.ts:20
    src/core/middlewares.ts:15
    src/core/Session.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    47:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    53:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    98:		for (const group of guide.methods()) {
    99:			const members = source.methods(group.interface)
    106:					expect(findMissing(members, group.methods)).toEqual([])
    109:					expect(findMissing(group.methods, members)).toEqual([])
    113:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    128:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    131:		for (const group of guide.methods()) {
    141:							? source.examples(group.interface)
    142:							: source.examples(group.interface).concat(source.examples(entity))
    143:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    155:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 827:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.19"` → `"version": "0.0.20"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-middleware-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
