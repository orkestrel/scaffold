# Brief — P.2 `d7n-middleware-converge` (middleware under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/middleware` from the committed baseline `b9d08b6` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.20`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/middleware.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/middleware/guides/middleware.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-middleware-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/middleware.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/middleware.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/middleware.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/middleware.md function createBoundary: guide "The outermost error-rendering battery — maps a downstream throw to a `Response`." source "Creates the outermost error-rendering battery — catches a downstream throw and renders it as a `Response`."
guides/middleware.md function createTelemetry: guide "The access-log/timing seam — records one `TelemetryEntry` per settled request." source "Creates the access-log/timing seam — records one `TelemetryEntry` per request after the response settles."
guides/middleware.md function createCompression: guide "Response-body compression over feature-detected `CompressionStream` codings." source "Creates the response-body compression battery — negotiates and compresses a buffered response body over the runtime's feature-detected `CompressionStream` codings."
guides/middleware.md function createSecurity: guide "Security headers + request-identifier minting/echo battery." source "Creates the security-headers + request-identifier battery."
guides/middleware.md function createCors: guide "Cross-Origin Resource Sharing — preflight answering + reflect/wildcard." source "Creates the Cross-Origin Resource Sharing battery."
guides/middleware.md function createDeadline: guide "The application-level per-request deadline, linked to `request.signal`." source "Creates the application-level per-request deadline battery."
guides/middleware.md function createForwarded: guide "The trusted-proxy `X-Forwarded-For` resolver — explicit proxy trust config." source "Creates the trusted-proxy client-IP resolver battery."
guides/middleware.md function createETag: guide "Dynamic response `ETag` + conditional `GET` (RFC 7232)." source "Creates the dynamic response `ETag` + conditional GET battery."
guides/middleware.md function createBearer: guide "Bearer-token authentication through `verifyToken`." source "Creates the bearer-token authentication battery."
guides/middleware.md function createLimiter: guide "Fixed-window rate limiting with check-before-consume exactness." source "Creates the fixed-window rate-limiting battery."
guides/middleware.md function createBody: guide "Eagerly drives the cached `context.body()` so its throws surface early." source "Creates the body-driving battery — eagerly awaits the cached `context.body()` so its throws (or a malformed-JSON `undefined`) surface before the handler runs, and stashes the resolved value onto `BodyState.body`."
guides/middleware.md function createSession: guide "The generic session battery — resolve/mint/persist + regenerate/destroy." source "Creates the generic session battery — resolves, mints, and persists a session across the request, with a mid-handler `regenerate`/`destroy` control handle."
guides/middleware.md function createCSRF: guide "Session-bound double-submit CSRF protection." source "Creates the session-bound double-submit CSRF protection battery."
guides/middleware.md function only: guide "Scope a battery to run ONLY on a set of exact pathnames." source "Scopes a battery to run ONLY on a set of exact pathnames — elsewhere it steps aside through `next()`."
guides/middleware.md function except: guide "Scope a battery to run everywhere EXCEPT a set of exact pathnames." source "Scopes a battery to run everywhere EXCEPT a set of exact pathnames — there it steps aside through `next()`."
guides/middleware.md function createAssets: guide "Serve validated in-memory identity/Brotli assets with shared ETags." source "Serves validated in-memory assets with identity/Brotli negotiation."
guides/middleware.md function createStatic: guide "Serve static files from `options.root` over `node:fs`, with Range/ETag/SPA fallback." source "Serves static files from `options.root` over `node:fs` — the node-bound static-file battery."
guides/middleware.md function createMultipart: guide "Stream-parse `multipart/form-data` into `context.state.multipart`." source "Parses a streamed `multipart/form-data` request body and stashes its `MultipartBody` on `context.state.multipart` — the node-bound streaming multipart battery."
guides/middleware.md interface BoundaryOptions: guide absent source "Configures `createBoundary` — the outermost error-rendering battery."
guides/middleware.md interface TelemetryEntry: guide absent source "Represents one access-log-style entry `createTelemetry` records after a response settles — the access-log/timing seam's payload shape."
guides/middleware.md interface TelemetryOptions: guide absent source "Configures `createTelemetry` — the request timing/access-log seam."
guides/middleware.md interface CompressionOptions: guide absent source "Configures `createCompression` — response-body compression."
guides/middleware.md interface CompressResponseOptions: guide absent source "Describes the already-resolved settings `compressResponse` runs its shared negotiate → skip → threshold → compress skeleton against — the shape each face's `createCompression` builds from its own option bag."
guides/middleware.md type SecurityIdentifierOptions: guide absent source "Describes `createSecurity`'s `identifier` sub-option — request-id minting/echo policy, or `false` to disable the feature entirely."
guides/middleware.md interface SecurityOptions: guide absent source "Configures `createSecurity` — the security-headers + request-id battery."
guides/middleware.md interface CorsOptions: guide absent source "Configures `createCors` — Cross-Origin Resource Sharing."
guides/middleware.md interface DeadlineOptions: guide absent source "Configures `createDeadline` — the application-level per-request deadline."
guides/middleware.md type ForwardedOptions: guide absent source "Configures `createForwarded` — the trusted-proxy client-IP resolver."
guides/middleware.md interface ETagOptions: guide absent source "Configures `createETag` — dynamic response ETag + conditional GET."
guides/middleware.md interface BearerOptions: guide absent source "Configures `createBearer` — bearer-token authentication."
guides/middleware.md interface LimiterOptions: guide absent source "Configures `createLimiter` — fixed-window rate limiting."
guides/middleware.md interface BearerState: guide absent source "Describes the bearer-authentication state slice `createBearer` stashes on `context.state` once a token verifies."
guides/middleware.md interface IdentifierState: guide absent source "Describes the request-identifier state slice `createSecurity` stashes when its `identifier` option is enabled."
guides/middleware.md interface Client: guide absent source "Describes the resolved client connection facts `createForwarded` stashes."
guides/middleware.md interface ClientState: guide absent source "Describes the client-facts state slice `createForwarded` stashes."
guides/middleware.md interface ConnectionState: guide absent source "Describes the connection-facts state slice `createLimiter`'s default key derivation falls back to when neither `BearerState` nor `ClientState` is present — the raw socket peer surfaced on `context.state` by the server's `state` option."
guides/middleware.md interface SessionInterface: guide absent source "Represents a server-managed session's public surface — an id, its live state, and the mutators that write it."
guides/middleware.md interface SessionControlInterface: guide absent source "Describes the mid-handler control handle `createSession` stashes alongside the session itself — the OWASP anti-fixation / logout primitives."
guides/middleware.md interface SessionState: guide absent source "Describes the session state slice `createSession` stashes."
guides/middleware.md interface BodyState: guide absent source "Describes the body state slice `createBody` stashes."
guides/middleware.md interface SessionStoreInterface: guide absent source "Describes the pluggable session persistence seam `createSession`'s `store` option implements — a point-access store keyed by session id."
guides/middleware.md interface SessionTransportInterface: guide absent source "Describes the transport seam `createSession`'s `transport` option implements — how a session id travels to and from the client (a signed cookie, a header, …)."
guides/middleware.md interface SessionOptions: guide absent source "Configures `createSession` — the generic session battery."
guides/middleware.md interface CookieTransportOptions: guide absent source "Configures `createCookieTransport` — the signed-cookie `SessionTransportInterface`."
guides/middleware.md interface HeaderTransportOptions: guide absent source "Configures `createHeaderTransport` — the bare-header `SessionTransportInterface`."
guides/middleware.md interface MemorySessionStoreOptions: guide absent source "Configures `createMemorySessionStore` — the default in-process `SessionStoreInterface`."
guides/middleware.md interface SessionLimits: guide absent source "Describes the idle and absolute-lifetime thresholds a session store enforces — `sessionExpired`'s limits argument and both shipped stores' construction options."
guides/middleware.md interface SessionCursors: guide absent source "Describes the per-session instants a store stamps and `sessionExpired` measures against."
guides/middleware.md interface SessionRow: guide absent source "Represents one persisted session row — an opaque snapshot column plus the store-owned idle/absolute-lifetime cursors, the shape a `DatabaseSessionStore`'s backing table holds."
guides/middleware.md interface SessionEntry: guide absent source "Represents one in-process session entry — the payload `MemorySessionStore` holds against an id, alongside the same cursors a persisted row carries."
guides/middleware.md interface SessionSnapshot: guide absent source "Represents a session's serializable projection — the value `snapshotSession` produces and a durable store's `set` writes."
guides/middleware.md type SessionRestoreFunction: guide absent source "Rebuilds a session entity from an untrusted stored snapshot, or resolves `undefined` when the value is malformed."
guides/middleware.md interface CSRFState: guide absent source "Describes the CSRF state slice `createCSRF` stashes — the raw token a safe-method response exposes for a subsequent mutating request to submit back."
guides/middleware.md interface CSRFOptions: guide absent source "Configures `createCSRF` — session-bound double-submit CSRF protection."
guides/middleware.md interface MultipartFile: guide absent source "Represents one staged multipart upload's public record — the shape the node-face `createMultipart` battery (`@orkestrel/middleware/server`) produces per uploaded file."
guides/middleware.md interface MultipartBody: guide absent source "Describes the parsed multipart request body `createMultipart` stashes — files keyed by their field name, plus every plain text field."
guides/middleware.md interface MultipartState: guide absent source "Describes the multipart state slice `createMultipart` stashes."
guides/middleware.md interface Asset: guide absent source "Describes one in-memory asset representation returned by an `AssetSourceInterface`."
guides/middleware.md interface AssetSourceInterface: guide absent source "Reads in-memory assets by decoded, browser-build-relative path."
guides/middleware.md interface AssetOptions: guide absent source "Configures `createAssets` — in-memory identity/Brotli asset serving."
guides/middleware.md interface StaticOptions: guide absent source "Configures `createStatic` — node `fs`-backed static file serving."
guides/middleware.md interface MultipartLimitsInput: guide absent source "Describes the caller's partial `MultipartLimits` — `createMultipart`'s `limits` option, with every member optional."
guides/middleware.md interface MultipartLimits: guide absent source "Describes the per-category size/count caps `createMultipart` enforces MID-STREAM — the effective limits, every documented default already applied."
guides/middleware.md interface MultipartOptions: guide absent source "Configures `createMultipart` — node `fs`/`os`/`crypto`-backed streaming multipart upload parsing."
guides/middleware.md interface NodeCompressionOptions: guide absent source "Configures the node face's `createCompression` — `node:zlib`-backed response compression."
guides/middleware.md type MultipartErrorCode: guide absent source "Names the reason `createMultipart` rejected a request — the machine-readable code `MultipartError` carries and maps onto its HTTP status: `'limit'` → 413, `'malformed'` → 400, `'rejected'` → 415."
guides/middleware.md type UploadStatus: guide absent source "Names the lifecycle stage of one staged upload's temp file."
guides/middleware.md interface UploadedFile: guide absent source "Describes one uploaded file's post-parse record — the node-bound, richer sibling of the pure core's `MultipartFile` (identical fields, `status` narrowed to `UploadStatus`). Structurally assignable into `MultipartFile` so a `createMultipart`-built `MultipartBody` satisfies the shared core shape."
guides/middleware.md interface PartHeaders: guide absent source "Describes one multipart part's parsed header block — `parsePartHeaders`'s return shape."
guides/middleware.md interface ByteRange: guide absent source "Describes one inclusive byte range over a file — `streamFile`'s optional `range` argument and the shape `createStatic` builds for a satisfiable `Range` request."
guides/middleware.md const DEFAULT_COMPRESSION_THRESHOLD: guide "Default minimum buffered body size (bytes) worth compressing (`1024`)." source "Holds the default minimum buffered body size (bytes) `createCompression` will compress."
guides/middleware.md const DEFAULT_COMPRESSION_ENCODINGS: guide "Default codings offered, in preference order (`['gzip', 'deflate']`)." source "Lists the default content-codings `createCompression` offers, in preference order — intersected at construction with what the runtime's `CompressionStream` actually supports."
guides/middleware.md const DEFAULT_FRAME_OPTIONS: guide "Default `X-Frame-Options` value (`'DENY'`)." source "Holds the default `X-Frame-Options` value `createSecurity` sets."
guides/middleware.md const DEFAULT_CSP: guide "Default `Content-Security-Policy` value." source "Holds the default `Content-Security-Policy` value `createSecurity` sets — a custom `csp` option REPLACES this wholesale, never merges."
guides/middleware.md const DEFAULT_REFERRER_POLICY: guide "Default `Referrer-Policy` value (`'strict-origin-when-cross-origin'`)." source "Holds the default `Referrer-Policy` value `createSecurity` sets."
guides/middleware.md const DEFAULT_PERMISSIONS_POLICY: guide "Default `Permissions-Policy` value." source "Holds the default `Permissions-Policy` value `createSecurity` sets."
guides/middleware.md const DEFAULT_COOP: guide "Default `Cross-Origin-Opener-Policy` value (`'same-origin'`)." source "Holds the default `Cross-Origin-Opener-Policy` value `createSecurity` sets."
guides/middleware.md const DEFAULT_CORP: guide "Default `Cross-Origin-Resource-Policy` value (`'same-origin'`)." source "Holds the default `Cross-Origin-Resource-Policy` value `createSecurity` sets."
guides/middleware.md const DEFAULT_CLUSTER: guide "Default `Origin-Agent-Cluster` value (`'?1'`)." source "Holds the default `Origin-Agent-Cluster` value `createSecurity` sets."
guides/middleware.md const DEFAULT_COEP: guide "The `coep: true` opt-in value (`'require-corp'`)." source "Holds the value `createSecurity` sets for `Cross-Origin-Embedder-Policy` when `coep: true`."
guides/middleware.md const DEFAULT_HSTS: guide "The `hsts: true` opt-in value (`'max-age=31536000; includeSubDomains'`)." source "Holds the value `createSecurity` sets for `Strict-Transport-Security` when `hsts: true`."
guides/middleware.md const DEFAULT_IDENTIFIER_HEADER: guide "The request-identifier header name (`'x-request-id'`)." source "Names the default header `createSecurity` mints/echoes a request identifier into."
guides/middleware.md const DEFAULT_CORS_METHODS: guide "Default preflight-advertised methods." source "Lists the default methods `createCors` advertises on a preflight response."
guides/middleware.md const DEFAULT_CORS_HEADERS: guide "Default preflight-advertised headers." source "Lists the default headers `createCors` advertises on a preflight response."
guides/middleware.md const DEFAULT_DEADLINE_STATUS: guide "Default status returned when a deadline fires first (`503`)." source "Holds the default response status `createDeadline` returns when its deadline fires first."
guides/middleware.md const DEFAULT_BEARER_HEADER: guide "Default bearer-token header (`'authorization'`)." source "Names the default header `createBearer` reads the token from."
guides/middleware.md const DEFAULT_BEARER_SCHEME: guide "Default bearer scheme prefix (`'Bearer'`)." source "Names the default scheme prefix `createBearer` strips before verification."
guides/middleware.md const DEFAULT_LIMITER_CAPACITY: guide "Default max distinct rate-limit keys tracked (`10_000`)." source "Holds the default maximum number of distinct rate-limit keys `createLimiter` tracks before LRU eviction."
guides/middleware.md const DEFAULT_LIMITER_MESSAGE: guide "Default 429 body message." source "Holds the default 429 body message `createLimiter` sends when a key is over budget."
guides/middleware.md const DEFAULT_SESSION_CAPACITY: guide "Default max distinct session ids `createMemorySessionStore` tracks (`10_000`)." source "Holds the default maximum number of distinct session ids `createMemorySessionStore` tracks before LRU (by last write) eviction."
guides/middleware.md const DEFAULT_SESSION_COOKIE: guide "Default session cookie name (`'session'`)." source "Names the default cookie `createCookieTransport` writes the signed session id under."
guides/middleware.md const DEFAULT_SESSION_HEADER: guide "Default session header name (`'session-id'`)." source "Names the default header `createHeaderTransport` carries the session id in."
guides/middleware.md const DEFAULT_CSRF_COOKIE: guide "Default CSRF cookie name (`'csrf'`)." source "Names the default signed cookie `createCSRF` writes the CSRF token under."
guides/middleware.md const DEFAULT_CSRF_HEADER: guide "Default CSRF submission header (`'x-csrf-token'`)." source "Names the default header `createCSRF` reads a mutating request's submitted token from."
guides/middleware.md const DEFAULT_CSRF_FIELD: guide "Default CSRF submission body field (`'_csrf'`)." source "Names the default body field `createCSRF` falls back to reading a mutating request's submitted token from."
guides/middleware.md const DEFAULT_CSRF_SAFE_METHODS: guide "Methods that mint instead of verify (`['GET', 'HEAD', 'OPTIONS']`)." source "Lists the default methods `createCSRF` treats as safe (mint instead of verify)."
guides/middleware.md const MULTIPART_STATUS: guide "`MultipartErrorCode` → HTTP status map (`limit`→413, `malformed`→400, `rejected`→415)." source "Holds the HTTP status `createMultipart` renders for each `MultipartErrorCode`."
guides/middleware.md const MULTIPART_ERROR_BRAND: guide "The registry symbol `MultipartError` carries so `isMultipartError` recognizes it." source "Holds the `Symbol.for` brand `MultipartError` carries so `isMultipartError` recognizes an instance across duplicate copies of this package — a registry symbol rather than a module-local `Symbol()`, which would mint an unequal symbol per copy."
guides/middleware.md const NODE_COMPRESSION_ENCODINGS: guide "The codings the node face's `createCompression` offers (`['gzip', 'deflate']`)." source "Lists the content-codings the node face's `createCompression` offers — the two `node:zlib` guarantees on every Node runtime, so this face never feature-detects."
guides/middleware.md const DEFAULT_STATIC_INDEX: guide "Default directory-index filename (`'index.html'`)." source "Names `createStatic`'s default directory-index filename."
guides/middleware.md const DEFAULT_STATIC_FALLBACK_EXCLUDE: guide "Default SPA-fallback excluded prefix (`'/api'`)." source "Names `createStatic`'s `fallback: true` default excluded path prefix."
guides/middleware.md const DEFAULT_STATIC_DOTFILES: guide "Default dotfile-segment policy (`'ignore'`)." source "Names `createStatic`'s default policy for a path carrying a dotfile segment."
guides/middleware.md const DEFAULT_CONTENT_TYPE: guide "Fallback `Content-Type` for an unmapped extension." source "Names the MIME type served when a file extension has no known mapping."
guides/middleware.md const DEFAULT_MULTIPART_FILE_SIZE: guide "Default max size (bytes) of one uploaded file (`10_485_760`)." source "Holds `createMultipart`'s default per-file byte-size cap."
guides/middleware.md const DEFAULT_MULTIPART_FILE_COUNT: guide "Default max number of file parts (`10`)." source "Holds `createMultipart`'s default maximum file-part count."
guides/middleware.md const DEFAULT_MULTIPART_FIELD_SIZE: guide "Default max size (bytes) of one text field (`65_536`)." source "Holds `createMultipart`'s default per-field byte-size cap."
guides/middleware.md const DEFAULT_MULTIPART_FIELD_COUNT: guide "Default max number of text field parts (`100`)." source "Holds `createMultipart`'s default maximum field-part count."
guides/middleware.md const DEFAULT_MULTIPART_TOTAL: guide "Default max combined request body size (bytes) (`52_428_800`)." source "Holds `createMultipart`'s default combined request-body byte-size cap."
guides/middleware.md const MULTIPART_MAX_HEADER_BLOCK: guide "Max bytes a single multipart part header block may occupy (`16_384`)." source "Holds the maximum bytes a single multipart part's header block may occupy before it is malformed."
guides/middleware.md const MULTIPART_MAX_PREAMBLE: guide "Max bytes scanned before the first boundary before rejecting as malformed (`65_536`)." source "Holds the maximum bytes scanned before the first multipart boundary is found before it is malformed."
guides/middleware.md const RESERVED_DEVICE_NAMES: guide "The Windows reserved-device-name set the static traversal guard refuses." source "Lists the Windows reserved device-name stems (CVE-2025-27210) — matched case-insensitively against the segment's stem (before its first `.`)."
guides/middleware.md const EXTENSION_TYPES: guide "The file-extension → `Content-Type` lookup table `lookupContentType` uses." source "Holds the file-extension (lowercase, with leading `.`) → MIME type lookup table for static serving."
guides/middleware.md const sessionColumns: guide "The `@orkestrel/database` column shape for a `SessionRow` table — pass to `createDatabase({ tables: { sessions: sessionColumns } })`." source "Holds the `@orkestrel/database` column shape for a `SessionRow` table. Pass it as-is to `createDatabase({ tables: { sessions: sessionColumns } })` so an app declaring a durable session table never hand-writes the shape."
guides/middleware.md function resolveKey: guide "Derive a rate-limit bucket key: bearer token, then client IP, then connection IP." source "Derives `createLimiter`'s default rate-limit bucket key from a request's resolved identity facts."
guides/middleware.md function resolveOptInHeader: guide "Resolve `createSecurity`'s `coep`/`hsts` opt-in header value." source "Resolves an opt-in, value-bearing security header — `string | boolean` (default OFF, `true` uses the secure default), the shape `createSecurity`'s `coep`/`hsts` options use, distinct from the plain value-or-`false` shape `resolveSecurityHeader` (the peer substrate) handles."
guides/middleware.md function buildRetryAfter: guide "Build the `Retry-After` header value (whole seconds to reset, min 1)." source "Builds the `Retry-After` header value — whole seconds until a window reset, floored at a minimum of `1`."
guides/middleware.md function buildRateLimitField: guide "Build the draft `RateLimit` structured header field." source "Builds the draft `RateLimit` structured header field — emitted only when `createLimiter`'s `policy` option is `true`."
guides/middleware.md function buildRateLimitPolicyField: guide "Build the draft `RateLimit-Policy` structured header field." source "Builds the draft `RateLimit-Policy` structured header field — emitted only when `createLimiter`'s `policy` option is `true`."
guides/middleware.md function matchesTrustedEntry: guide "Whether a client address matches one trusted CIDR/exact-match roster entry." source "Checks whether a candidate address is a bare (non-CIDR) trusted-hop match — an exact string match, or a simple prefix-CIDR match for IPv4 (`/8`–`/32`). An IPv6 entry matches by exact string only — there is no IPv6 CIDR support."
guides/middleware.md function resolveForwardedFor: guide "Walk `X-Forwarded-For` right-to-left past trusted hops to the client IP." source "Walks `X-Forwarded-For` right-to-left and resolves the first UNTRUSTED hop address — `createForwarded`'s core algorithm."
guides/middleware.md function detectEncodings: guide "Feature-detect which candidate `Encoding`s the runtime's `CompressionStream` supports." source "Feature-detects which of `candidates` the runtime's `CompressionStream` actually supports — `createCompression`'s construction-time intersection."
guides/middleware.md function compressBytes: guide "Compress bytes with the host-independent runtime's `CompressionStream` primitive." source "Compresses bytes with the host-independent `CompressionStream` primitive."
guides/middleware.md function isBufferingIneligible: guide "Whether a response must pass through untouched (HEAD, 204/304, SSE, already-encoded)." source "Checks whether a response is eligible for the compression/ETag buffering pipeline — the shared cheap-skip predicate both batteries apply before ever touching `response.arrayBuffer()`."
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
```

## Facts for middleware (taken 2026-09-07T20:58Z by facts.sh)

- Checkout `/home/user/fleet/middleware`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b9d08b6`, status: clean
- `package.json`: version `0.0.20`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    src/server/middlewares.ts:470:export function createCompression<TState>(
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
    99:			const members = source.methods(group.interface).map((method) => method.name)
    107:					expect(findMissing(members, documented)).toEqual([])
    110:					expect(findMissing(documented, members)).toEqual([])
    116:							: findMissing(
    117:									source.methods(entity).map((method) => method.name),
    135:				findUnexampled(
    138:					source.examples().map((example) => example.name),
    143:		for (const group of guide.methods()) {
    148:					? source.examples(group.interface).map((example) => example.name)
    152:							.concat(source.examples(entity).map((example) => example.name))
    159:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    171:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 827:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-middleware-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/middleware.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/middleware.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-middleware-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
