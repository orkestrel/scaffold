# Report — P.1 `d7n-server-prep` (server's prep)

Server's checkout carries the repair's vendored delta, the adapted drop-in, the voice fixes, the two
prose-sweep lines, and the bump. Every acceptance criterion reads as the brief expects: the scoped
gates exit 0 and `docs` reads `rows read: 1, disagreements found: 101` at exit 1.

## The resumed run's partial hunks

The interrupted run had already landed every item. Each hunk was ruled against the brief and kept;
nothing was corrected and nothing was discarded.

- **Kept, the repair's vendored set.** `configs/helpers.ts`, `configs/policy.ts`, `tests/config.test.ts`,
  `tests/policy.test.ts`, `tests/setupPolicy.ts`, and the untracked `scripts/docs.ts` are byte-identical
  to the scaffold tip's `dist/host` copies (`cmp -s` against
  `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/host/<path>`
  reports `SAME` for each), so they are `repair`'s own output rather than a hand edit. The merge-managed
  three carry exactly the expected rows: `.oxlintrc.json` gains `policy/no-malformed-summary` and
  `policy/no-banned-term`, `package.json` gains the `docs` script row, `tsconfig.json` gains the
  own-specifier `paths` entry.
- **Kept, the drop-in's adaptation.** `tests/guides.test.ts` matches the brief's site list and the pilot's
  shape; `diff -u /home/user/fleet/abort/tests/guides.test.ts /home/user/fleet/server/tests/guides.test.ts`
  reports no difference inside the adapted region (lines 102-166), and its remaining hunks are this
  package's own constants, imports, and fence transcriptions.
- **Kept, the voice sites.** The doc-block and comment rewrites in `tests/setupServer.ts`,
  `src/server/types.ts`, `src/server/helpers.ts`, `src/server/errors.ts`, `src/server/Server.ts`, and
  `tests/src/server/Server.test.ts` cover exactly the sites P20 read, and `oxlint` exits 0.
- **Kept, the guide's two swept lines and the bump.** `guides/server.md` line 298 and line 396 are the
  sweep's two named lines and the only guide edits; `package.json` reads `"version": "0.0.19"`.

`repair` was not re-run. The interrupted run left its own logs under `tmp/d7n-server-prep/`, so its
`repair` summary line and its pre-fix `oxlint` reading are both on disk and are quoted under items 1
and 3. A fresh read-only `node <tip>/dist/bin/main.js audit --offline` confirms the repair is
complete in the tree this unit leaves: `0 of 36 planned paths drifted from the plan. Audit compared
bytes at 24, existence at 5, and nothing at 7.` (exit 0).

## Item 1 — `repair --offline`

Not re-run, per the dispatch. The interrupted run captured its output at
`/home/user/fleet/server/tmp/d7n-server-prep/repair.log.txt`, whose last line is the summary and whose
write list matches P21's:

```text
0 of 36 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 7.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 28 unchanged, 0 removed in ..
```

`git status --short` is the P21 list exactly, plus the files items 2, 3, and 4 own:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/server.md
 M package.json
 M src/server/Server.ts
 M src/server/errors.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/src/server/Server.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

The repair-owned rows are `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`,
`tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, and the
untracked `scripts/docs.ts`. The merge-managed hunks:

```diff
--- a/.oxlintrc.json
+++ b/.oxlintrc.json
-		"policy/no-keyword-privacy": "error"
+		"policy/no-keyword-privacy": "error",
+		"policy/no-malformed-summary": "error",
+		"policy/no-banned-term": "error"
--- a/package.json
+++ b/package.json
-		"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"
+		"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup",
+		"docs": "node --experimental-strip-types scripts/docs.ts"
--- a/tsconfig.json
+++ b/tsconfig.json
-			"@src/server": ["./src/server/index.ts"]
+			"@src/server": ["./src/server/index.ts"],
+			"@orkestrel/server": ["./src/server/index.ts"]
```

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

```diff
@@ -100,21 +100,27 @@ for (const entry of manifest) {
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@ -129,22 +135,32 @@ for (const entry of manifest) {
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

The `group.methods.length` assertion stays (line 108). The string-argument `findMissing` calls stay: the
import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, and `names`
against `surface`. No other change to the suite.

## Item 3 — the voice sites

Every site is a doc block or a comment. No code token moved, nothing was renamed, and no assertion's
value changed. The interrupted run captured the pre-fix reading at
`/home/user/fleet/server/tmp/d7n-server-prep/lint1.log.txt`, which is the worklist the tables that
follow close, and its post-fix reading `lint2.log.txt` is empty:

```text
src/server/types.ts:260:2: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/types.ts:269:2: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/types.ts:287:2: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/types.ts:532:1: error policy(no-banned-term): Replace just in this comment: delete.
src/server/types.ts:532:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/types.ts:201:1: error policy(no-malformed-summary): State what the symbol does without naming Encoding in the first sentence.
tests/src/server/Server.test.ts:651:3: error policy(no-banned-term): Replace just in this comment: delete.
src/server/helpers.ts:123:1: error policy(no-banned-term): Replace just in this comment: delete.
src/server/helpers.ts:705:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/helpers.ts:758:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/helpers.ts:1492:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/Server.ts:31:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/Server.ts:273:2: error policy(no-banned-term): Replace e.g. in this comment: for example.
tests/setupServer.ts:13:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:16:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:22:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:55:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:67:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:112:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:170:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:180:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
src/server/errors.ts:103:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/errors.ts:175:1: error policy(no-banned-term): Replace just in this comment: delete.
```

A diagnostic reports a doc block at the block's opening line; the tables that follow cite the edited
line in the tree this unit leaves, so the two positions differ by the block's leading lines.

### `tests/setupServer.ts` — `policy/no-malformed-summary` at each site

| Line | Before | After |
| ---- | ------ | ----- |
| 13 | `The workspace root, anchored from this setup file's own location.` | `Holds the workspace root, anchored from this setup file's own location.` |
| 16 | `The outcome of a raw `upgradeRequest` probe: whether a handler claimed the socket.` | `Reports the outcome of a raw `upgradeRequest` probe: whether a handler claimed the socket.` |
| 23 | `Send a raw, hand-written HTTP request over a bare `node:net` socket and resolve with whatever bytes come back` | `Sends a raw, hand-written HTTP request over a bare `node:net` socket and resolves with whatever bytes come back` |
| 55 | `A real HTTP response socket whose readable side starts paused.` | `Represents a real HTTP response socket whose readable side starts paused.` |
| 68 | `Open a real HTTP request over TCP while parking the response reader.` | `Opens a real HTTP request over TCP while parking the response reader.` |
| 113 | `Probe whether a real TCP connection is dropped before it can carry data.` | `Probes whether a real TCP connection is dropped before it can carry data.` |
| 170 | `A client-side upgraded connection deliberately left open` | `Represents a client-side upgraded connection deliberately left open` |
| 181 | `Complete a real protocol upgrade and KEEP the socket open` | `Completes a real protocol upgrade and KEEPS the socket open` |

### `src/server/types.ts` — one `policy/no-malformed-summary`, the rest `policy/no-banned-term`

| Line | Diagnostic | Before | After |
| ---- | ---------- | ------ | ----- |
| 201 | `no-malformed-summary` | `Represents a content-coding the substrate compresses / decompresses with — the `Content-Encoding` / `Accept-Encoding` token vocabulary it understands.` | `Represents a content-coding the substrate compresses / decompresses with. The listed codings are the `Content-Encoding` and `Accept-Encoding` token vocabulary the substrate understands.` |
| 265 | `no-banned-term` (`e.g.`) | `(e.g. `text/html, application/json;q=0.9`)` | `(for example `text/html, application/json;q=0.9`)` |
| 275 | `no-banned-term` (`e.g.`) | `(e.g. `gzip;q=1.0, deflate;q=0.8`)` | `(for example `gzip;q=1.0, deflate;q=0.8`)` |
| 293 | `no-banned-term` (`e.g.`) | `(e.g. `en-US, en;q=0.8, fr;q=0.5`)` | `(for example `en-US, en;q=0.8, fr;q=0.5`)` |
| 549 | `no-banned-term` (`just`) | ``stop()` began (status just moved to `'stopping'`).` | ``stop()` began (status moved to `'stopping'`).` |
| 560 | `no-banned-term` (`e.g.`) | `(a plain `400`, e.g. a malformed `Host` header)` | `(a plain `400`, for example a malformed `Host` header)` |

The `Encoding` rewrite splits the em-dash clause into a second sentence so the first sentence keeps its
third-person opener and stops naming the symbol through `Content-Encoding`; every fact the paragraph
carried is retained. That paragraph is a `Summary` source side, so its worklist row moved with it and
is quoted in the `docs` output.

### `src/server/helpers.ts` — `policy/no-banned-term` at each site

| Line | Term | Before | After |
| ---- | ---- | ------ | ----- |
| 123 | `just` | `so a cookie is just a `signToken` value in a `Set-Cookie`` | `so a cookie is a `signToken` value in a `Set-Cookie`` |
| 720 | `e.g.` | `to score (e.g. `'text/html'`)` | `to score (for example `'text/html'`)` |
| 769 | `e.g.` | `to score (e.g. `'en-US'`)` | `to score (for example `'en-US'`)` |
| 1504 | `e.g.` | ``preferred` port (e.g. a permission fault).` | `` `preferred` port (for example, a permission fault).`` |

### `src/server/errors.ts` — `policy/no-banned-term` at each site

| Line | Term | Before | After |
| ---- | ---- | ------ | ----- |
| 105 | `e.g.` | `(including its subclasses, e.g. {@link ContentTooLargeError}).` | `(including its subclasses, for example {@link ContentTooLargeError}).` |
| 183 | `just` | `to the caller that just invoked it` | `to the caller that invoked it directly` |

### `src/server/Server.ts` — `policy/no-banned-term` (`e.g.`) at each site

| Line | Before | After |
| ---- | ------ | ----- |
| 64 | `a throw (e.g. a malformed `Host` header) to a silent `400`` | `a throw (for example, a malformed `Host` header) to a silent `400`` |
| 273 | `A throw there (e.g. a malformed `Host` header) maps to a silent `400`, never `error`.` | `A throw there (for example, a malformed `Host` header) maps to a silent `400`, never `error`.` |

### `tests/src/server/Server.test.ts` — `policy/no-banned-term` (`just`)

| Line | Before | After |
| ---- | ------ | ----- |
| 651 | `the cut reached the wire, not just the server's own bookkeeping.` | `the cut reached the wire, not only the server's own bookkeeping.` |

### `guides/server.md` — the prose sweep's two lines

| Line | Term | Before | After |
| ---- | ---- | ------ | ----- |
| 298 | `e.g.` | `a malformed request (e.g. an unparsable `Host`)` | `a malformed request (for example, an unparsable `Host`)` |
| 396 | `just` | `across package copies, not just `instanceof`.` | `across package copies, not only `instanceof`.` |

No other sentence in `guides/**` and no line of `README.md` was touched. No diagnostic named an
off-limits file.

Ancillary wording decided here and recorded: `the caller that just invoked it` became `the caller that
invoked it directly`, because the sentence's point is the direct call relation that puts both sides in
the same package copy; `not just `instanceof`` became `not only `instanceof``; `status just moved to
`'stopping'`` dropped the term outright.

## Item 4 — the bump

```diff
--- a/package.json
+++ b/package.json
-	"version": "0.0.18",
+	"version": "0.0.19",
```

`package-lock.json` is untouched.

## Criteria

**1. Status list.** `git status --short` reads the list quoted under item 1: the P21 repair list, plus
`tests/guides.test.ts`, plus the item 3 files (`guides/server.md`, `src/server/Server.ts`,
`src/server/errors.ts`, `src/server/helpers.ts`, `src/server/types.ts`, `tests/setupServer.ts`,
`tests/src/server/Server.test.ts`), and nothing else. Each item 3 file and its diagnostics are named
in the preceding tables.

**2. `npm run format:check`, `oxlint`, `npm run check`.**

```text
$ npm run format:check
All matched files use the correct format.
Finished in 4907ms on 54 files using 4 threads.
EXIT=0

$ npx oxlint --config .oxlintrc.json --deny-warnings .
EXIT=0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.server.json
EXIT=0
```

`oxlint` prints nothing on a clean run here, so the instrument was proved able to fail first: a
throwaway `tmp/d7n-server-prep/control.ts` carrying `/** A thing that just holds a value, e.g. a
number. */` reported

```text
tmp/d7n-server-prep/control.ts:1:1: error policy(no-banned-term): Replace just in this comment: delete.
tmp/d7n-server-prep/control.ts:1:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
tmp/d7n-server-prep/control.ts:1:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
EXIT=1
```

That control file sits under the ignored `tmp/` directory, is not a path any item touched, and was
removed after the reading.

**3. The suites.**

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  33 passed (33)
   Duration  570ms (transform 148ms, setup 29ms, import 299ms, tests 105ms, environment 0ms)
EXIT=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  494ms (transform 162ms, setup 25ms, import 160ms, tests 187ms, environment 0ms)
EXIT=0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
   Duration  4.95s (transform 427ms, setup 39ms, import 918ms, tests 3.86s, environment 0ms)
EXIT=0
```

**4. `npm run docs`.** Exit 1, `rows read: 1, disagreements found: 101`. The full output follows
verbatim.

## The `docs` worklist, verbatim

```text
> node --experimental-strip-types scripts/docs.ts

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
```

## Observation, outside this unit's items

One worklist row reads differently from P21's expected output, with no edit behind it. P21 read
`type ServerErrorCode: guide absent source "Represents the machine-readable category a
`import('./errors.js').ServerError` carries."`; this checkout reads `... a `ServerError` carries.`.
The source is untouched — `src/server/types.ts:484-495` still declares
`{@link import('./errors.js').ServerError}` and carries no hunk in this unit's diff — so the two
readings differ in how the reader rendered that `{@link}` target, not in what the source says. The
installed reader here is `@orkestrel/guide@0.0.18`. The converge unit meets this row either way.

## Wall clock

First command 2026-09-07T20:25:18Z, last command 2026-09-07T20:31:45Z, in this resumed run. The interrupted first run's
own elapsed time is not recoverable from the tree it left.

## Deviation state

No deviation. `repair` wrote no path outside the P21 list (the `audit --offline` reading above), every
before-text was found verbatim, no voice diagnostic named an off-limits file, `test:policy` reds on
nothing, and every gate but `docs` reads green — `docs` reads red as the brief expects, carrying the
converge unit's worklist.
