# Brief — P.1 `d7n-server-prep` (server's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/server` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b228dfc`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

server's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== server 2026-09-07T16:42:49Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
82:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 902ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### server (b228dfc, version 0.0.18, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 28 unchanged, 0 removed in ..
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
   tests/setupServer.ts(8)
   src/server/types.ts(6)
   src/server/helpers.ts(4)
   src/server/errors.ts(2)
   src/server/Server.ts(2)
   tests/src/server/Server.test.ts(1)
-- docs
   guides/server.md function computeClientKey: guide "Collapse a client IP into its rate-limit bucket key (IPv6 `/64`, IPv4 unchanged)." source "Collapses a client IP into its rate-limit BUCKET key — an IPv6 address to its `/64` network, an IPv4 (or IPv4-mapped) address unchanged."
   guides/server.md function serializeEvent: guide "Serialize one `SSEMessage` to the SSE wire." source "Serializes one `SSEMessage` to the SSE wire."
   guides/server.md function isDangerousKey: guide "Whether a key is a prototype-pollution vector (`__proto__`/`constructor`/`prototype`)." source "Checks whether a key is a PROTOTYPE-POLLUTION vector — `__proto__`, `constructor`, or `prototype` — the three keys that, assigned onto a normal object, can reach and mutate `Object.prototype`."
   guides/server.md function scrubPrototype: guide "Recursively strip prototype-pollution keys from a parsed value in place." source "Strips the prototype-pollution keys from a parsed value IN PLACE, recursively."
   guides/server.md function collectRequestBody: guide "Collect a `Request` body into one `Uint8Array`, enforcing a size limit." source "Collects a `Request` body into a single `Uint8Array`, enforcing a size limit."
   guides/server.md function parseEncoding: guide "Parse a raw `Content-Encoding` header into a decompressible `Encoding`." source "Parses a raw `Content-Encoding` header value into a decompressible `Encoding` — the boundary `readBody` coerces through to decide whether a request body needs transparent decompression."
   guides/server.md function decompressRequestBody: guide "Transparently decompress a collected body, capping decompressed output (the zip-bomb defense)." source "Decompresses an already-collected, `gzip`/`deflate`-encoded byte sequence transparently through `DecompressionStream`, capping the DECOMPRESSED output — the zip-bomb defense."
   guides/server.md function readBody: guide "Collect + decode a `Request` body — the pipeline behind `context.body()`; an empty body and a malformed `application/json` body both decode to `undefined`." source "Collects + decodes a `Request` body — the shared body-collection pipeline surfaced to middleware and handlers as the middleware context's cached `body()`."
   guides/server.md function isHTTPError: guide "Narrow an unknown caught value to an `HTTPError` (including subclasses) — recognized across package copies through a structural brand fallback." source "Narrows an unknown caught value to an `HTTPError` (including its subclasses, e.g. `ContentTooLargeError`)."
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
   guides/server.md type Encoding: guide absent source "Represents a content-coding the substrate compresses / decompresses with — the `Content-Encoding` / `Accept-Encoding` token vocabulary it understands."
   guides/server.md type FormatHandlerMap: guide absent source "Represents a map of media type → handler for `NegotiatorInterface.format` — the content-negotiation dispatch table."
   guides/server.md interface NegotiatorInterface: guide absent source "Represents content negotiation over the weighted `Accept` family — a reusable, cross-middleware machine (not itself a middleware)."
   guides/server.md interface SSEMessage: guide absent source "Represents one Server-Sent Event to serialize to the wire."
   guides/server.md interface StreamOptions: guide absent source "Options for a `StreamInterface` — how `createStream` opens the streaming response."
   guides/server.md interface StreamInterface: guide absent source "Represents a handle to write Server-Sent Events to an open, fetch-standard streaming `Response` — the generic streaming surface `createStream` returns over a `ReadableStream`."
   guides/server.md type RangeSpec: guide absent source "Represents the parsed outcome of an HTTP `Range` request header."
   guides/server.md interface BodyOptions: guide absent source "Options for `readBody` — how the shared body-collection pipeline caps and decompresses a request body."
   guides/server.md type ServerStatus: guide absent source "Represents the `Server`'s lifecycle state."
   guides/server.md type ServerErrorCode: guide absent source "Represents the machine-readable category a `import('./errors.js').ServerError` carries."
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
-- check
   tests/guides.test.ts(110,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(113,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(117,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(132,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(147,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 13 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  13 failed | 20 passed (33)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 68ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(1) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(1) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 23 | summary 9 | banned 14 | tests/setupServer.ts(8) src/server/types.ts(6) src/server/helpers.ts(4) src/server/errors.ts(2) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+298,	+     "message": "prose carries no banned term: e.g. (for example)",	+     "path": "guides/server.md"
+396,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/server.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for server (taken 2026-09-07T16:43Z by facts.sh)

- Checkout `/home/user/fleet/server`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b228dfc`, status: clean
- `package.json`: version `0.0.18`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    103:			const members = source.methods(group.interface)
    110:					expect(findMissing(members, group.methods)).toEqual([])
    113:					expect(findMissing(group.methods, members)).toEqual([])
    117:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    132:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    135:		for (const group of guide.methods()) {
    145:							? source.examples(group.interface)
    146:							: source.examples(group.interface).concat(source.examples(entity))
    147:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    159:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 671:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.18"` → `"version": "0.0.19"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-server-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
