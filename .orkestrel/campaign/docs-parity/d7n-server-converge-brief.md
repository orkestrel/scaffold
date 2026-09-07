# Brief — P.2 `d7n-server-converge` (server under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/server` from the committed baseline `543ba65` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.19`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/server.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/server/guides/server.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-server-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/server.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/server.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/server.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/server.md function createNegotiator: guide "Create a `NegotiatorInterface` — the content-negotiation machine." source "Creates a `NegotiatorInterface` — the reusable content-negotiation machine over the weighted `Accept` family."
guides/server.md function createServer: guide "Create a `ServerInterface<TState>` over a consumed `DispatcherInterface`." source "Creates a `ServerInterface` — the node face's HTTP server facade over a consumed `@orkestrel/router` dispatcher."
guides/server.md function createStream: guide "Create a `StreamInterface` — an open Server-Sent-Events stream." source "Creates a `StreamInterface` — a generic Server-Sent-Events stream whose `response` is a fetch-standard streaming `Response` a route returns."
guides/server.md const DEFAULT_DRAIN_MS: guide "Default graceful-stop deadline (ms) `stop()` gives in-flight requests and claimed upgraded sockets." source "Names the default graceful-stop deadline (ms) the server gives in-flight requests on `stop()`."
guides/server.md const DEFAULT_BODY_LIMIT: guide "Default maximum request body size (bytes) `readBody` accepts before a 413." source "Names the default maximum request body size (bytes) `readBody` accepts before a 413."
guides/server.md const DEFAULT_DECOMPRESSED_LIMIT: guide "Default maximum DECOMPRESSED body size (bytes) — the zip-bomb cap." source "Names the default maximum DECOMPRESSED request body size (bytes) — the zip-bomb cap the body pipeline's byte-counting `TransformStream` enforces when transparently decompressing a `Content-Encoding` request body."
guides/server.md const SSE_HEADERS: guide "The SSE response headers a `Stream` merges under any caller `headers` — a caller repeating one of these keys replaces its value." source "Holds the SSE response headers a `Stream` always sets on its response."
guides/server.md const REQUEST_ID_PATTERN: guide "The strict charset `isValidRequestId` requires an `X-Request-ID` to match." source "Defines the strict charset `isValidRequestId` requires an incoming `X-Request-ID` to match — `^[A-Za-z0-9_-]{1,200}$` — so a CRLF / log-injection / oversized / control-char-bearing incoming id is REJECTED (a fresh id is minted instead) rather than ever riding into a response header or `context.state`. Frozen so a consumer can read but never mutate the shared default."
guides/server.md const COMPRESSIBLE_TYPES: guide "The bare `Content-Type`s `isCompressibleType` treats as compressible." source "Holds the set of bare `Content-Type`s `isCompressibleType` treats as COMPRESSIBLE, beyond the `text/*` prefix + structured-suffix (`+json` / `+xml`) rules that helper also applies."
guides/server.md const HTTP_ERROR_BRAND: guide "The `Symbol.for`-interned brand `HTTPError` carries so `isHTTPError` recognizes an instance across package copies. Not a field to set by hand." source "Names the `Symbol.for`-keyed brand `HTTPError` carries so `isHTTPError` recognizes an instance thrown by ANOTHER copy of this package (the dual-package hazard — a version-skewed or workspace-linked duplicate install), where `instanceof` alone fails because the two copies' `HTTPError` constructors are distinct objects."
guides/server.md const DEFAULT_ENCODINGS: guide "The default `Encoding` content-codings the substrate offers, in preference order." source "Lists the default `Encoding` content-codings the substrate offers, in PREFERENCE order — `gzip` / `deflate`."
guides/server.md function compose: guide "Compose an ordered middleware chain around a `terminal` handler (the frozen seam)." source "Composes an ordered chain of `MiddlewareHandler`s around a `terminal` handler into one request handler — the frozen middleware seam."
guides/server.md function wrapMiddleware: guide "Wrap one middleware layer around its downstream handler while enforcing the one-call `next` invariant." source "Wraps one middleware layer around its downstream handler."
guides/server.md function parseCookies: guide "Parse a raw `Cookie:` header into a `name → value` lookup." source "Parses a raw `Cookie:` request header into a `name → value` lookup."
guides/server.md function isCookieName: guide "Whether a string is a valid RFC 6265 cookie name (no whitespace)." source "Checks whether a string is a valid RFC 6265 cookie NAME — a non-empty run of cookie-token chars with NO surrounding (or interior) whitespace."
guides/server.md function decodeCookieValue: guide "Decode a cookie value, falling back to raw text on malformed escapes." source "Decodes a cookie value with `decodeURIComponent`, falling back to the raw text when the value is not valid percent-encoding."
guides/server.md function isCookieAttribute: guide "Whether a string is safe to interpolate as a `Domain`/`Path` attribute value." source "Checks whether a string is safe to interpolate as a `Set-Cookie` attribute VALUE (a `Domain` / `Path`) — the guard `serializeCookie` screens those two attributes with before emitting them."
guides/server.md function serializeCookie: guide "Serialize a cookie into a `Set-Cookie` header value with its attributes." source "Serializes a cookie into a `Set-Cookie` header value — `name=value` plus its attributes."
guides/server.md function resolveSecure: guide "Resolve a cookie's effective `Secure` flag from its setting + the TLS fact." source "Resolves a cookie's effective `Secure` flag from its `CookieOptions` `secure` setting and whether the request arrived over TLS."
guides/server.md function writeSignedCookie: guide "Write a SIGNED cookie (`signToken` + `Set-Cookie`)." source "Writes a SIGNED cookie — HMAC-signs `value` with `signToken` and appends it as a `Set-Cookie` (the inverse of `readSignedCookie`)."
guides/server.md function readSignedCookie: guide "Read + verify a SIGNED cookie off a request — total, returns `undefined` on any failure." source "Reads + verifies a SIGNED cookie off a request — TOTAL, returning the embedded value or `undefined` (the inverse of `writeSignedCookie`)."
guides/server.md function clearCookie: guide "Clear a cookie by setting an immediately-expiring `Set-Cookie`." source "Clears a cookie — appends a `Set-Cookie` that expires it immediately (`Max-Age=0`)."
guides/server.md function signToken: guide "Sign a value into a stateless, HMAC-SHA256 token." source "Signs a value into a stateless, HMAC-SHA256 token — `<payload>.<signature>`."
guides/server.md function verifyToken: guide "Verify a stateless token and return its embedded value — total, never throws." source "Verifies a stateless token and returns its embedded value — TOTAL, never throws."
guides/server.md function decodeTokenPayload: guide "Decode + narrow a signed token's payload, honoring its expiry." source "Decodes + narrows a signed token's base64url JSON payload, honoring its expiry — the shared decode step `verifyToken` applies after a signature match."
guides/server.md function normalizeSecret: guide "Normalize a `TokenSecret` to a concrete list of usable secrets." source "Normalizes a `TokenSecret` to a concrete list of USABLE secrets — backs both `signToken` and `verifyToken`."
guides/server.md function parseAcceptHeader: guide "Parse a weighted `Accept`-family header into its q-sorted entries." source "Parses a weighted `Accept` / `Accept-Encoding` / `Accept-Language` header into its q-sorted entries."
guides/server.md function computeCodingQuality: guide "The client's quality for one content-coding from parsed `Accept-Encoding` entries." source "Computes the client's quality (q) for one content-coding from the parsed `Accept-Encoding` entries — the scoring leaf `resolveCoding` runs over each offered coding."
guides/server.md function resolveCoding: guide "Pick the highest-scoring offered coding from parsed entries — the leaf both encoding doors run." source "Picks the highest-scoring content-coding the server offers against already parsed `Accept-Encoding` entries."
guides/server.md function negotiateEncoding: guide "Select the best content-coding for a raw `Accept-Encoding` header." source "Selects the best content-coding for a raw `Accept-Encoding` header from the codings the server offers."
guides/server.md function matchMediaType: guide "Rank + quality of one candidate media type against parsed `Accept` entries." source "Reports the rank + quality of one `candidate` media type against the parsed `Accept` entries — the generic media-type primitive the `Negotiator`'s `negotiate` uses to score each `available` candidate."
guides/server.md function computeLanguageQuality: guide "The client's quality for one candidate language from parsed `Accept-Language` entries." source "Computes the client's quality for one `candidate` language from the parsed `Accept-Language` entries — the scoring leaf the `Negotiator`'s `language` axis runs over each offered tag."
guides/server.md function isCompressibleType: guide "Whether a `Content-Type` is worth compressing." source "Checks whether a `Content-Type` is worth compressing."
guides/server.md function computeBodyETag: guide "Compute a content `ETag` over a fully-buffered response body by using WebCrypto." source "Computes a CONTENT `ETag` over a fully-buffered response body by using WebCrypto."
guides/server.md function unwrapETag: guide "Strip the weak indicator (`W/`) from an entity-tag." source "Strips the WEAK indicator (`W/`) from an entity-tag, returning its opaque comparison body — the reduction `matchesETag` applies to both sides before the RFC 7232 §2.3.2 weak comparison."
guides/server.md function matchesETag: guide "Whether a request's `If-None-Match` matches a resource's current `ETag` (RFC 7232 weak comparison)." source "Checks whether a request's `If-None-Match` header matches a resource's current `ETag` — the RFC 7232 §2.3.2 WEAK comparison."
guides/server.md function parseRange: guide "Parse an HTTP `Range` header against a known resource size — total." source "Parses an HTTP `Range` request header against a known resource `size` — TOTAL, returning a `RangeSpec` or `undefined`."
guides/server.md function resolveOrigin: guide "Resolve the `Access-Control-Allow-Origin` value for a request." source "Resolves the `Access-Control-Allow-Origin` value for a request."
guides/server.md function mergeVary: guide "Merge a `Vary` value into an existing `Vary` header without duplication." source "Merges a `Vary` value into an existing `Vary` header without duplication."
guides/server.md function resolveSecurityHeader: guide "Resolve one opt-out, value-bearing security header." source "Resolves one opt-out, value-bearing security header."
guides/server.md function isValidRequestId: guide "Whether a client-supplied `X-Request-ID` is safe to echo back." source "Checks whether a client-supplied `X-Request-ID` is SAFE to echo into a response header + `context.state`."
guides/server.md function computeIPv6Network: guide "Compute the `/64` network of a full IPv6 address, or `undefined`." source "Computes the `/64` network of a full IPv6 address, or `undefined` when the input is not a plain IPv6 address to collapse."
guides/server.md function computeClientKey: guide "Collapse a client IP into its rate-limit bucket key (IPv6 `/64`, IPv4 unchanged)." source "Collapses a client IP into its rate-limit BUCKET key — an IPv6 address to its `/64` network, an IPv4 (or IPv4-mapped) address unchanged."
guides/server.md function serializeEvent: guide "Serialize one `SSEMessage` to the SSE wire." source "Serializes one `SSEMessage` to the SSE wire."
guides/server.md function isDangerousKey: guide "Whether a key is a prototype-pollution vector (`__proto__`/`constructor`/`prototype`)." source "Checks whether a key is a PROTOTYPE-POLLUTION vector — `__proto__`, `constructor`, or `prototype` — the three keys that, assigned onto a normal object, can reach and mutate `Object.prototype`."
guides/server.md function scrubPrototype: guide "Recursively strip prototype-pollution keys from a parsed value in place." source "Strips the prototype-pollution keys from a parsed value IN PLACE, recursively."
guides/server.md function collectRequestBody: guide "Collect a `Request` body into one `Uint8Array`, enforcing a size limit." source "Collects a `Request` body into a single `Uint8Array`, enforcing a size limit."
guides/server.md function parseEncoding: guide "Parse a raw `Content-Encoding` header into a decompressible `Encoding`." source "Parses a raw `Content-Encoding` header value into a decompressible `Encoding` — the boundary `readBody` coerces through to decide whether a request body needs transparent decompression."
guides/server.md function decompressRequestBody: guide "Transparently decompress a collected body, capping decompressed output (the zip-bomb defense)." source "Decompresses an already-collected, `gzip`/`deflate`-encoded byte sequence transparently through `DecompressionStream`, capping the DECOMPRESSED output — the zip-bomb defense."
guides/server.md function readBody: guide "Collect + decode a `Request` body — the pipeline behind `context.body()`; an empty body and a malformed `application/json` body both decode to `undefined`." source "Collects + decodes a `Request` body — the shared body-collection pipeline surfaced to middleware and handlers as the middleware context's cached `body()`."
guides/server.md function isHTTPError: guide "Narrow an unknown caught value to an `HTTPError` (including subclasses) — recognized across package copies through a structural brand fallback." source "Narrows an unknown caught value to an `HTTPError` (including its subclasses, for example `ContentTooLargeError`)."
guides/server.md function isServerError: guide "Narrow an unknown caught value to a `ServerError` — the code-bearing refusal of a call the caller programmed." source "Narrows an unknown caught value to a `ServerError`."
guides/server.md function isAddressInfo: guide "Whether a `node:net` address is the structured `AddressInfo` shape." source "Checks whether a `node:net` `server.address()` return is the structured `AddressInfo` (carrying a numeric `port`) rather than a pipe `string` or `null` — the total, never-throwing narrow `discoverPort` and the `Server`'s own port resolution read the bound port through."
guides/server.md function probePort: guide "Bind and close one throwaway TCP server to resolve an available port." source "Binds and closes a throwaway TCP server to resolve one available port."
guides/server.md function discoverPort: guide "Find a free TCP port — try a `preferred` one first, else an ephemeral port." source "Finds a FREE TCP port — binds a throwaway `node:net` server, reads the OS-assigned port, closes it, and resolves that port."
guides/server.md class HTTPError: guide "An error a handler throws to produce an HTTP response of a specific status." source "Represents an error a handler (or middleware) throws to produce an HTTP response of a specific status."
guides/server.md class ContentTooLargeError: guide "The `HTTPError` (413) thrown when a request body exceeds its size limit." source "Represents the `HTTPError` thrown when a request body exceeds the body pipeline's size limit — a `413 Content Too Large`."
guides/server.md class ServerError: guide "The code-bearing error raised when a caller programmed a call the entity refuses — `'STATUS'` or `'NEXT'`." source "Represents the error this package raises when a caller programmed a call the entity refuses."
guides/server.md class Negotiator: guide "The content-negotiation machine over the weighted `Accept` family; implements `NegotiatorInterface`." source "Represents the content-negotiation machine over the weighted `Accept` family — a reusable, cross-middleware ENTITY (not a middleware). Implements exactly `NegotiatorInterface`."
guides/server.md class Server: guide "The `node:http` lifecycle entity composing the middleware onion around a consumed dispatcher; implements `ServerInterface`." source "Represents the HTTP server facade — an observable `node:http` lifecycle composing this module's own middleware onion around a consumed `@orkestrel/router` dispatcher."
guides/server.md class Stream: guide "The Server-Sent-Events handle over a streaming `Response`; implements `StreamInterface`." source "Represents the Server-Sent-Events handle over an open, fetch-standard streaming `Response`. Implements exactly `StreamInterface`."
guides/server.md interface MiddlewareContext: guide absent source "Represents the composition context — plain data, one per request, shared by every middleware AND (as `state`) by the route handlers behind the dispatcher."
guides/server.md type NextFunction: guide absent source "Represents the downstream continuation a `MiddlewareHandler` invokes to run the rest of the onion."
guides/server.md type MiddlewareHandler: guide absent source "Represents one link in the middleware onion — runs around the rest of the chain."
guides/server.md interface Connection: guide absent source "Represents the per-request connection facts the server face injects — the ONLY data that genuinely exists solely on the socket, surfaced so middleware and a consumer's `state` factory stay core-pure."
guides/server.md type TokenSecret: guide absent source "Represents a secret (or rotation list) for signing + verifying a stateless, HMAC-signed token."
guides/server.md interface TokenOptions: guide absent source "Options for `signToken` — how a stateless, HMAC-signed token is minted."
guides/server.md interface CookieOptions: guide absent source "Represents the `Set-Cookie` attributes for `serializeCookie` (and any signed-cookie transport built over it)."
guides/server.md interface AcceptEntry: guide absent source "Represents one parsed entry of a weighted `Accept` / `Accept-Encoding` / `Accept-Language` header — a value and its quality weight, the element type `parseAcceptHeader` returns (sorted by `q` descending)."
guides/server.md interface MediaMatch: guide absent source "Rates one candidate media type against a parsed `Accept` header — the quality and specificity `matchMediaType` reports for the best matching `AcceptEntry`."
guides/server.md type Encoding: guide absent source "Represents a content-coding the substrate compresses / decompresses with. The listed codings are the `Content-Encoding` and `Accept-Encoding` token vocabulary the substrate understands."
guides/server.md type FormatHandlerMap: guide absent source "Represents a map of media type → handler for `NegotiatorInterface.format` — the content-negotiation dispatch table."
guides/server.md interface NegotiatorInterface: guide absent source "Represents content negotiation over the weighted `Accept` family — a reusable, cross-middleware machine (not itself a middleware)."
guides/server.md interface SSEMessage: guide absent source "Represents one Server-Sent Event to serialize to the wire."
guides/server.md interface StreamOptions: guide absent source "Options for a `StreamInterface` — how `createStream` opens the streaming response."
guides/server.md interface StreamInterface: guide absent source "Represents a handle to write Server-Sent Events to an open, fetch-standard streaming `Response` — the generic streaming surface `createStream` returns over a `ReadableStream`."
guides/server.md type RangeSpec: guide absent source "Represents the parsed outcome of an HTTP `Range` request header."
guides/server.md interface BodyOptions: guide absent source "Options for `readBody` — how the shared body-collection pipeline caps and decompresses a request body."
guides/server.md type ServerStatus: guide absent source "Represents the `Server`'s lifecycle state."
guides/server.md type ServerErrorCode: guide absent source "Represents the machine-readable category a `ServerError` carries."
guides/server.md interface RequestLine: guide absent source "Identifies the request a server-level fault came from — its method and its parsed URL."
guides/server.md interface ResponseRecord: guide absent source "Records one finished request — the payload `ServerEventMap.response` carries."
guides/server.md type ServerEventMap: guide absent source "Represents the `Server`'s observable lifecycle events."
guides/server.md type UpgradeHandler: guide absent source "Represents a raw `node:http` protocol-upgrade claimant — registered through `ServerInterface.upgrade`."
guides/server.md type ConnectionStateFunction: guide absent source "Derives a consumer's per-request `TState` from the adapter-injected `Connection` — `ServerOptions.state`, invoked once per request before the middleware onion runs."
guides/server.md interface ServerOptions: guide absent source "Options for `createServer`."
guides/server.md interface ServerInterface: guide absent source "Represents the HTTP server facade — an observable `node:http` lifecycle that composes a middleware onion (this module's own middleware seam) around a consumed `@orkestrel/router` `DispatcherInterface`."
guides/server.md NegotiatorInterface.negotiate: guide absent source "Picks the best `available` value for a weighted `Accept`-style `header` — the generic media-type primitive (`encoding` / `language` build on it)."
guides/server.md NegotiatorInterface.encoding: guide absent source "Picks the best `available` content-coding for an `Accept-Encoding` header — the coding axis of the same q-value parser (a bare `*` wildcard ⇒ the first `available`)."
guides/server.md NegotiatorInterface.language: guide absent source "Picks the best `available` language for an `Accept-Language` header — `negotiate` with a language-prefix match (`en` accepts `en-US`) and a bare `*` wildcard."
guides/server.md NegotiatorInterface.format: guide absent source "Dispatches to the handler whose media type the client most prefers — reads the request `Accept`, negotiates against `handlers`' keys, and invokes the winner; `406` when none is acceptable."
guides/server.md StreamInterface.write: guide absent source "Serializes + enqueues one `SSEMessage` to the wire."
guides/server.md StreamInterface.comment: guide absent source "Writes a `: text` SSE comment line — a keep-alive a conforming parser ignores."
guides/server.md StreamInterface.drain: guide absent source "Parks until the process-local stream queue has capacity again."
guides/server.md StreamInterface.end: guide absent source "Ends the stream, completing the response (a no-op once already `closed`)."
guides/server.md ServerInterface.use: guide absent source "Appends one middleware, or an array of them in order, to the onion."
guides/server.md ServerInterface.upgrade: guide absent source "Registers a protocol-upgrade claimant that runs in registration order."
guides/server.md ServerInterface.start: guide absent source "Binds the configured listener and resolves its actually-bound port."
guides/server.md ServerInterface.stop: guide absent source "Stops gracefully: refuses new connections, fires the stop signal, drains, closes."
guides/server.md ServerInterface.destroy: guide absent source "Tears down for good: force-closes the listener and every socket, then the emitter."
guides/server.md pitch: readme absent tagline "This package's ONE guide, covering its single published surface: the middleware seam (`compose`, `MiddlewareContext`/`NextFunction`/`MiddlewareHandler`), the `HTTPError` vocabulary, the shared substrate (cookies, WebCrypto tokens, content negotiation through `Negotiator`, ETag/Range, security primitives, SSE, and the body pipeline), and the deliberately node-bound `Server` lifecycle entity binding `node:http` through `@orkestrel/router`'s adapter helpers, the upgrade seam, connection-fact injection, and `discoverPort`. The server consumes `@orkestrel/router` — routing, matching, and dispatch are that package's, never re-implemented here — mechanism, not product policy. Source: `src/server`. Surfaced through the `@orkestrel/server` barrel (aliased `@src/server` inside this repo)."
rows read: 1, disagreements found: 101
exit 1
```

## Facts for server (taken 2026-09-07T20:58Z by facts.sh)

- Checkout `/home/user/fleet/server`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `543ba65`, status: clean
- `package.json`: version `0.0.19`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 23 | summary 9 | banned 14 | tests/setupServer.ts(8) src/server/types.ts(6) src/server/helpers.ts(4) src/server/errors.ts(2) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept | Spec                     | Source                        | Tests                                     |
    9:| ------- | ------------------------ | ----------------------------- | ----------------------------------------- |
    10:| Server  | [`server.md`](server.md) | [`src/server`](../src/server) | [`tests/src/server`](../tests/src/server) |
    14:| Directory    | Guide                    |
    15:| ------------ | ------------------------ |
    16:| `src/server` | [`server.md`](server.md) |
- Guide `guides/server.md`: 726 lines. Headings:
    1:# Server
    15:## Surface
    58:### Factories
    66:### Constants
    79:### Helpers
    128:### Entities
    139:### Types
    177:## Methods
    185:#### `NegotiatorInterface`
    204:#### `StreamInterface`
    225:#### `ServerInterface`
    243:## Contract
    421:## Patterns
    423:### Quickstart: dispatcher, middleware, lifecycle
    453:### Middleware ordering idiom
    485:### Typed state slices
    505:### SSE route
    524:### Graceful shutdown
    565:### Bounded startup and socket caps
    587:### Upgrade attach
    602:### Substrate direct use — tokens, cookies, negotiation
    647:### Practices
    671:## Tests
    713:## See also
- Table headers in `guides/server.md` (a header row is the row before a `| ---` row):
    60: | API                | Kind     | Summary                                                                   |
    68: | API                          | Kind  | Summary                                                                                                                                        |
    81: | API                      | Kind     | Summary                                                                                                                                                     |
    130: | API                    | Kind  | Summary                                                                                                                     |
    141: | Type                      | Kind      | Shape                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
    197: | Method      | Returns                 | Behavior                                                                    |
    218: | Method    | Returns         | Behavior                                                                                                                                   |
    235: | Method    | Returns           | Behavior                                                                                                                       |
- Rows of any `### Entities` table (the Kind cell):
    132:  `HTTPError`            | class
    133:  `ContentTooLargeError` | class
    134:  `ServerError`          | class
    135:  `Negotiator`           | class
    136:  `Server`               | class
    137:  `Stream`               | class
- H1 blockquote (`guides/server.md`):
    3: > This package's ONE guide, covering its single published surface: the middleware seam (`compose`,
    4: > `MiddlewareContext`/`NextFunction`/`MiddlewareHandler`), the `HTTPError`
    5: > vocabulary, the shared substrate (cookies, WebCrypto tokens, content
    6: > negotiation through `Negotiator`, ETag/Range, security primitives, SSE, and the
    7: > body pipeline), and the deliberately node-bound `Server` lifecycle entity
    8: > binding `node:http` through `@orkestrel/router`'s adapter helpers, the upgrade
    9: > seam, connection-fact injection, and `discoverPort`. The server
    10: > **consumes** `@orkestrel/router` — routing, matching, and dispatch are that
    11: > package's, never re-implemented here — mechanism, not product policy. Source:
    12: > [`src/server`](../src/server). Surfaced through the
    13: > `@orkestrel/server` barrel (aliased `@src/server` inside this repo).
- Opening prose after the blockquote (first two lines):
    15: ## Surface
    17: Bring your own `@orkestrel/router` dispatcher, mount middleware, and start:
- README (`README.md`) first lines:
    # @orkestrel/server
    
    A typed HTTP server for the `@orkestrel` line — composes an `@orkestrel/router`
    dispatcher behind a managed lifecycle (start/stop/drain/destroy) over a node
    adapter seam, with a middleware onion, response observability, and a shared
    substrate for cookies, tokens, content negotiation, and SSE. Built to sit
    beside `@orkestrel/router` (routing, matching, and dispatch), `@orkestrel/contract`
    (validation), `@orkestrel/emitter` (observable lifecycle), and `@orkestrel/abort`
    (cancellation). Part of the `@orkestrel` line.
    
    ## Install
    
- `## Patterns` fences, each with its nearest preceding heading:
    19: fence under "## Surface"
    425: fence under "### Quickstart: dispatcher, middleware, lifecycle"
    460: fence under "### Middleware ordering idiom"
    491: fence under "### Typed state slices"
    507: fence under "### SSE route"
    530: fence under "### Graceful shutdown"
    548: fence under "### Graceful shutdown"
    571: fence under "### Bounded startup and socket caps"
    589: fence under "### Upgrade attach"
    604: fence under "### Substrate direct use — tokens, cookies, negotiation"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/factories.ts:27:export function createNegotiator(): NegotiatorInterface {
    src/server/factories.ts:55:export function createServer<TState>(options: ServerOptions<TState>): ServerInterface<TState> {
    src/server/factories.ts:79:export function createStream(options?: StreamOptions): StreamInterface {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/Stream.ts:50:export class Stream implements StreamInterface {
    src/server/Negotiator.ts:29:export class Negotiator implements NegotiatorInterface {
    src/server/Server.ts:83:export class Server<TState> implements ServerInterface<TState> {
    src/server/errors.ts:59:export class HTTPError extends Error {
    src/server/errors.ts:96:export class ContentTooLargeError extends HTTPError {
    src/server/errors.ts:163:export class ServerError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/validators.ts:1
    src/server/factories.ts:3
    src/server/helpers.ts:39
    src/server/Stream.ts:1
    src/server/Negotiator.ts:1
    src/server/types.ts:3
    src/server/errors.ts:5
- Drop-in sites (`tests/guides.test.ts`):
    29:} from '@orkestrel/guide'
    51:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    57:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    102:		for (const group of guide.methods()) {
    103:			const members = source.methods(group.interface).map((method) => method.name)
    111:					expect(findMissing(members, documented)).toEqual([])
    114:					expect(findMissing(documented, members)).toEqual([])
    120:							: findMissing(
    121:									source.methods(entity).map((method) => method.name),
    139:				findUnexampled(
    142:					source.examples().map((example) => example.name),
    147:		for (const group of guide.methods()) {
    152:					? source.examples(group.interface).map((example) => example.name)
    156:							.concat(source.examples(entity).map((example) => example.name))
    163:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    175:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 671:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-server-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/server.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/server.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-server-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
