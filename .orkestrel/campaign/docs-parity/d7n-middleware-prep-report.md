# Report — P.1 `d7n-middleware-prep` (middleware)

Every item is done and every acceptance criterion reads green, with `docs` red as the brief expects. `/home/user/fleet/middleware` is left dirty and uncommitted at branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b073558`.

## Resumed run: the partial hunks

The terminated run had already written the repair's vendored files, the drop-in's adaptation, and the `docs` script row. Nothing was discarded and nothing needed correcting.

- **Kept — the repair's own paths.** `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entries), and the untracked `scripts/docs.ts`. `git status --short` listed the P21 set exactly, so `repair` was not re-run. Each vendored file was compared byte for byte against the extracted tip and is identical:

```text
$ for f in configs/helpers.ts configs/policy.ts tests/config.test.ts tests/policy.test.ts tests/setupPolicy.ts scripts/docs.ts; do cmp -s "$TIP/$f" "$f" && echo "SAME $f" || echo "DIFF $f"; done
SAME configs/helpers.ts
SAME configs/policy.ts
SAME tests/config.test.ts
SAME tests/policy.test.ts
SAME tests/setupPolicy.ts
SAME scripts/docs.ts
```

- **Kept — `tests/guides.test.ts`.** The partial adaptation is item 2's edits and only those, and its adapted regions are byte-identical to the pilot at `/home/user/fleet/abort/tests/guides.test.ts`.
- **Not started, done in this run.** The voice sites (item 3) and the version bump (item 4). The prior run's own `oxlint` capture (`tmp/d7n-middleware-prep/oxlint-before.log.txt`) is byte-identical to the reading this run took before editing, so no voice site had been touched.

## Item 1 — `repair --offline`

Not re-run: the status already carried the P21 list. The prior run's summary line, retained at `tmp/d7n-middleware-prep/repair.log.txt`:

```text
0 of 40 planned paths drifted from the plan. Audit compared bytes at 26, existence at 5, and nothing at 9.
tsconfig.json replaced (2 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 32 unchanged, 0 removed in ..
```

`git status --short` as this unit leaves it:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M src/core/shapers.ts
 M src/server/middlewares.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/src/server/parsers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

The P21 list, plus `tests/guides.test.ts` (item 2), plus the files item 3 edited (`tests/setup.ts`, `tests/setupServer.ts`, `tests/src/server/parsers.test.ts`, `src/core/shapers.ts`, `src/server/middlewares.ts`), and nothing else. `tmp/` is ignored by this repository's `.gitignore` file, so this unit's instruments do not appear.

## Item 2 — the drop-in's adaptation

The hunk, verbatim from `git diff tests/guides.test.ts`:

```diff
@@ -96,21 +96,27 @@ for (const entry of manifest) {
 		})
 
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
@@ -125,22 +131,32 @@ for (const entry of manifest) {
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
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

The `group.methods.length` assertion stays. The already-string `findMissing` calls — `statement.names` against `face.surface().map((symbol) => symbol.name)`, and `names` against `surface` — are untouched. No other change to the suite.

`diff -u /home/user/fleet/abort/tests/guides.test.ts tests/guides.test.ts` reports the adapted regions identical to the pilot. It also reports what this package's committed drop-in does not carry at all, which is recorded as an observation later in this report.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` printed the diagnostics retained at `tmp/d7n-middleware-prep/lint-before.txt` before the edits, and printed nothing after (`tmp/d7n-middleware-prep/lint-after.txt` is empty, exit 0). Every edit is doc-block or comment prose. No code token moved, nothing was renamed, and no assertion's value changed — confirmed by filtering the diff of `tests/setup.ts` and `tests/setupServer.ts` for a changed line outside a comment, which returned nothing.

The files edited and the diagnostic that sent each there:

| File | Diagnostics |
| ---- | ----------- |
| `tests/setup.ts` | `policy(no-malformed-summary)` at lines 23, 26, 29, 46, 79, 82, 101, 111, 142, 149, 180, 207, 214, 242, 288, 303, 309, 343, 349 |
| `tests/setupServer.ts` | `policy(no-malformed-summary)` at lines 19, 22, 25, 74, 80, 105, 117, 173, 182, 226, 233, 313, 319, 375, 386, 440, 470 |
| `src/core/shapers.ts` | `policy(no-malformed-summary)` at line 3: "State what the symbol does without naming sessionColumns in the first sentence." |
| `src/server/middlewares.ts` | `policy(no-malformed-summary)` at line 440: "State what the symbol does without naming createCompression in the first sentence." |
| `tests/src/server/parsers.test.ts` | `policy(no-banned-term)` at line 279: "Replace robust in this comment: the measured property." |

`npm run test:policy` exits 0, so its `prose` rule names no line in `guides/**` or `README.md`. No diagnostic landed in an off-limits file, and nothing under `guides/**`, `README.md`, or `src/**` outside a doc block was touched.

Line numbers are the committed tree's, as the linter reported them before the edits.

### `tests/setup.ts` — every hit is `policy(no-malformed-summary)`: "Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether."

`tests/setup.ts:23` `TEST_BODY_LIMIT`

```text
before /** The default request-body byte cap the test harness's {@link createTestContext} applies. */
after  /** Limits a test request's body to the default byte cap the test harness's {@link createTestContext} applies. */
```

`tests/setup.ts:26` `TEST_SECRET`

```text
before /** The signing secret every bearer, CSRF, and cookie-transport scenario shares. */
after  /** Signs every bearer, CSRF, and cookie-transport scenario — the secret each one shares. */
```

`tests/setup.ts:29` `buildRequest`

```text
before  * Build a `Request` for a test — a tiny, centralized request builder so
after   * Builds a `Request` for a test — a tiny, centralized request builder so
```

`tests/setup.ts:46` `createTestContext`

```text
before  * Build a {@link MiddlewareContext} over a `Request` — `url`/`method` derived
after   * Builds a {@link MiddlewareContext} over a `Request` — `url`/`method` derived
```

`tests/setup.ts:79` `ECHO_MARKER`

```text
before /** The marker body {@link createEchoTerminal}'s default `Response` carries, for chain-reached assertions. */
after  /** Marks {@link createEchoTerminal}'s default `Response` body, for chain-reached assertions. */
```

`tests/setup.ts:82` `createEchoTerminal`

```text
before  * Build a terminal handler for {@link runChain} that returns a fixed marker
after   * Builds a terminal handler for {@link runChain} that returns a fixed marker
```

`tests/setup.ts:101` `RecordingTerminalInterface`

```text
before /** A terminal handler that also RECORDS every request/context it was reached with — for asserting the chain reached the terminal, and with what. */
after  /** Records every request/context this terminal handler was reached with — for asserting the chain reached the terminal, and with what. */
```

`tests/setup.ts:111` `createRecordingTerminal`

```text
before  * Build a {@link RecordingTerminalInterface} — a real terminal handler, not a
after   * Builds a {@link RecordingTerminalInterface} — a real terminal handler, not a
```

`tests/setup.ts:142` `RecordingNextInterface`

```text
before /** A recording {@link NextFunction} — a real downstream continuation that records each call's substituted `request` before answering with a fixed `Response`. */
after  /** Records each call's substituted `request` before answering with a fixed `Response` — a recording {@link NextFunction}, a real downstream continuation. */
```

`tests/setup.ts:149` `createRecordingNext`

```text
before  * Build a {@link RecordingNextInterface} — a real `NextFunction` recorder for
after   * Builds a {@link RecordingNextInterface} — a real `NextFunction` recorder for
```

`tests/setup.ts:180` `runChain`

```text
before  * Run an ordered middleware chain around a `terminal` handler against one
after   * Runs an ordered middleware chain around a `terminal` handler against one
```

`tests/setup.ts:207` `ManualClockInterface`

```text
before /** A manually-advanced clock for limiter/session determinism, so no suite sleeps on the wall clock. */
after  /** Advances a clock by hand for limiter/session determinism, so no suite sleeps on the wall clock. */
```

`tests/setup.ts:214` `createManualClock`

```text
before  * Build a {@link ManualClockInterface} — an injectable `() => number` time
after   * Builds a {@link ManualClockInterface} — an injectable `() => number` time
```

`tests/setup.ts:242` `buildSession`

```text
before  * Build a {@link Session} carrying one optional state entry — the scenario
after   * Builds a {@link Session} carrying one optional state entry — the scenario
```

`tests/setup.ts:288` `compressibleBody`

```text
before  * Build a body of `length` highly compressible bytes.
after   * Builds a body of `length` highly compressible bytes.
```

`tests/setup.ts:303` `RecordingTransportInterface`

```text
before /** A {@link SessionTransportInterface} that records every `write` and `clear` it was driven with. */
after  /** Records every `write` and `clear` a {@link SessionTransportInterface} was driven with. */
```

`tests/setup.ts:309` `createTestTransport`

```text
before  * Build a {@link RecordingTransportInterface} — a real header-backed session
after   * Builds a {@link RecordingTransportInterface} — a real header-backed session
```

`tests/setup.ts:343` `SessionStoreFixtureInterface`

```text
before /** A real in-memory database table paired with the {@link SessionStoreInterface} built over it. */
after  /** Pairs a real in-memory database table with the {@link SessionStoreInterface} built over it. */
```

`tests/setup.ts:349` `buildStore`

```text
before  * Build a durable session store over a real in-memory database table — the
after   * Builds a durable session store over a real in-memory database table — the
```


### `tests/setupServer.ts` — every hit is `policy(no-malformed-summary)`: "Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether."

`tests/setupServer.ts:19` `PNG_MAGIC`

```text
before /** A real PNG magic-byte header (8 bytes) — the shortest genuine PNG signature. */
after  /** Carries a real PNG magic-byte header (8 bytes) — the shortest genuine PNG signature. */
```

`tests/setupServer.ts:22` `JPEG_MAGIC`

```text
before /** A real JPEG magic-byte header (3 bytes) — the shortest genuine JPEG signature. */
after  /** Carries a real JPEG magic-byte header (3 bytes) — the shortest genuine JPEG signature. */
```

`tests/setupServer.ts:25` `SECOND_DEVICE_CANDIDATES`

```text
before  * The directories a second-filesystem probe reads, in the order it reads them.
after   * Lists the directories a second-filesystem probe reads, in the order it reads them.
```

`tests/setupServer.ts:74` `AssetSourceFixtureInterface`

```text
before /** A map-backed in-memory asset source with a readonly record of requested keys. */
after  /** Pairs a map-backed in-memory asset source with a readonly record of requested keys. */
```

`tests/setupServer.ts:80` `createAssetSource`

```text
before  * Build an inert in-memory asset source for `createAssets` tests.
after   * Builds an inert in-memory asset source for `createAssets` tests.
```

`tests/setupServer.ts:105` `StaticFixtureInterface`

```text
before /** A scratch-backed static fixture tree — the seeded directory plus its known file paths, ready for `createStatic` tests. */
after  /** Holds a scratch-backed static fixture tree — the seeded directory plus its known file paths, ready for `createStatic` tests. */
```

`tests/setupServer.ts:117` `buildStaticFixture`

```text
before  * Build a real scratch-directory static-file fixture: nested directories, an
after   * Builds a real scratch-directory static-file fixture: nested directories, an
```

`tests/setupServer.ts:173` `SymlinkFixtureInterface`

```text
before /** A scratch-backed fixture with a symlink INSIDE root pointing IN-root, and one pointing OUTSIDE root — for `createStatic`'s symlink-escape matrix. */
after  /** Holds a scratch-backed fixture with a symlink INSIDE root pointing IN-root, and one pointing OUTSIDE root — for `createStatic`'s symlink-escape matrix. */
```

`tests/setupServer.ts:182` `buildSymlinkFixture`

```text
before  * Build a real scratch-directory fixture with two symlinks: one inside the
after   * Builds a real scratch-directory fixture with two symlinks: one inside the
```

`tests/setupServer.ts:226` `DirectoryIndexFixtureInterface`

```text
before /** A scratch-backed fixture with a subdirectory whose `index.html` is a symlink pointing OUTSIDE root — for `createStatic`'s directory-index symlink-escape case. */
after  /** Holds a scratch-backed fixture with a subdirectory whose `index.html` is a symlink pointing OUTSIDE root — for `createStatic`'s directory-index symlink-escape case. */
```

`tests/setupServer.ts:233` `buildDirectoryIndexFixture`

```text
before  * Build a real scratch-directory fixture with a subdirectory whose
after   * Builds a real scratch-directory fixture with a subdirectory whose
```

`tests/setupServer.ts:313` `CancelTrackingRequestInterface`

```text
before /** A `Request` carrying a real multipart body over a single-chunk stream, with an observable `cancelled` flag. */
after  /** Pairs a `Request` carrying a real multipart body over a single-chunk stream with an observable `cancelled` flag. */
```

`tests/setupServer.ts:319` `buildCancelTrackingMultipartRequest`

```text
before  * Build a multipart `Request` whose body is a CHUNKED, pull-driven
after   * Builds a multipart `Request` whose body is a CHUNKED, pull-driven
```

`tests/setupServer.ts:375` `MultipartPartInput`

```text
before /** One part of a real `multipart/form-data` body — either a text field or a file. */
after  /** Names one part of a real `multipart/form-data` body — either a text field or a file. */
```

`tests/setupServer.ts:386` `buildMultipartBody`

```text
before  * Compose a real `multipart/form-data` request body from a list of parts —
after   * Composes a real `multipart/form-data` request body from a list of parts —
```

`tests/setupServer.ts:440` `buildChunkedStream`

```text
before  * Build a `ReadableStream` that feeds `bytes` in fixed-size chunks.
after   * Builds a `ReadableStream` that feeds `bytes` in fixed-size chunks.
```

`tests/setupServer.ts:470` `buildMultipartRequest`

```text
before  * Build a `Request` carrying a real multipart body — composes
after   * Builds a `Request` carrying a real multipart body — composes
```


### `src/core/shapers.ts:3` `sessionColumns` — the first sentence named the symbol

The sentence boundary moved before the code span that carried the name; every fact stays.

```diff
 /**
  * Holds the `@orkestrel/database` column shape for a
- * {@link import('./types.js').SessionRow} table — pass as-is to
+ * {@link import('./types.js').SessionRow} table. Pass it as-is to
  * `createDatabase({ tables: { sessions: sessionColumns } })` so an app
  * declaring a durable session table never hand-writes the shape.
```

### `src/server/middlewares.ts:440` `createCompression` (node face) — the first sentence named the symbol

The sibling clause moved into a second sentence, keeping the availability fact, the entry-point fact, and the unambiguous-name reason.

```diff
 /**
- * Compresses response bodies through `node:zlib` — the node-bound sibling of
- * the core face's `CompressionStream`-feature-detected `createCompression`,
- * guaranteed available on any Node runtime rather than dependent on the
- * WHATWG `CompressionStream` global. Ships as a SEPARATE package entry point
- * (`@orkestrel/middleware/server`) from the core face's `createCompression`,
- * so the shared name is unambiguous per consumer import path.
+ * Compresses response bodies through `node:zlib`, guaranteed available on any
+ * Node runtime rather than dependent on the WHATWG `CompressionStream`
+ * global. This battery is the node-bound sibling of the core face's
+ * `CompressionStream`-feature-detected `createCompression`, and ships as a
+ * SEPARATE package entry point (`@orkestrel/middleware/server`) from the core
+ * face's `createCompression`, so the shared name is unambiguous per consumer
+ * import path.
```

### `tests/src/server/parsers.test.ts:279` — the banned term `robust`

The substitution table's row replaces the effort adjective with the property the comment means. The assertion and every value around it are unchanged.

```diff
 		// Deliberately far larger than the cap ever lets through, so
-		// a passing "rejected before the source was exhausted" assertion is
-		// robust rather than tightly coupled to the exact chunk arithmetic.
+		// a passing "rejected before the source was exhausted" assertion holds
+		// for any chunk size rather than coupling to the exact chunk arithmetic.
```

### Ancillary wording decided here

The verb each rewritten opener takes is this unit's choice, recorded so the converge unit reads one vocabulary: `Builds` for a factory or fixture builder, `Records` for a recorder, `Holds` and `Carries` and `Lists` and `Pairs` and `Names` for a constant, an interface, or a type alias that states a shape, `Limits`, `Signs`, `Marks`, `Runs`, `Advances`, and `Composes` where the declaration's own action names itself.

## Item 4 — the bump

```diff
 {
 	"name": "@orkestrel/middleware",
-	"version": "0.0.19",
+	"version": "0.0.20",
```

`package-lock.json` is untouched, as the brief directs.

## Acceptance criteria

1. **Status.** Green. The listing is under item 1: the P21 list, `tests/guides.test.ts`, the item-3 files, and nothing else. Each item-3 file and its diagnostic are named in the item-3 table.

2. **`format:check`, `oxlint`, `check`.** All exit 0. `npm run format` ran before the check, as the brief directs.

```text
$ npm run format:check
All matched files use the correct format.
Finished in 2960ms on 70 files using 4 threads.
EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings .
(no output)
EXIT 0

$ npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:core && npm run check:src:server
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
EXIT 0
```

3. **`test:guides`, `test:policy`, `test:config`.** All exit 0. P21's failures were the record shapes alone, and the adapted drop-in closes them.

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  38 passed (38)
   Duration  735ms (transform 178ms, setup 265ms, import 146ms, tests 147ms, environment 0ms)
EXIT 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  653ms (transform 241ms, setup 242ms, import 88ms, tests 214ms, environment 0ms)
EXIT 0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
   Duration  4.34s (transform 492ms, setup 261ms, import 505ms, tests 3.44s, environment 0ms)
EXIT 0
```

`test:config` prints one stdout notice from API Extractor during "rolls one face into a single declaration and rewrites its core specifier": "Analysis will use the bundled TypeScript version 5.9.3" and "*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor." The case passes.

4. **`docs`.** Reads `rows read: 1, disagreements found: 182` and exits 1, as expected. The worklist follows verbatim.

## The `docs` worklist, verbatim

`npm run docs`, exit 1:

```text

> @orkestrel/middleware@0.0.20 docs
> node --experimental-strip-types scripts/docs.ts

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
```

One row carries text this unit changed, because item 3's rewrites sit on the source side of the comparison: `const sessionColumns`, whose source text now reads "Holds the `@orkestrel/database` column shape for a `SessionRow` table. Pass it as-is to …". The `src/server` face's `createCompression` rewrite reaches no row: the worklist reports `rows read: 1`, and the `function createCompression` row it prints carries the core face's description. The guide side of every row is the converge unit's.

## Observations

- **This package's committed drop-in is an older revision than the pilot's.** `diff -u /home/user/fleet/abort/tests/guides.test.ts tests/guides.test.ts` reports, beyond this package's constants, that `tests/guides.test.ts` here carries neither the `findDrift` equality case, nor the example-title pin, nor the README-pitch-against-tagline case, nor the flagship-fence block the pilot carries; it also does not import `findDrift`. Item 2 enumerates its edits and closes with "No other change to the suite", and adding the `findDrift` case would turn `test:guides` red on the same disagreements `docs` prints, against acceptance criterion 3. So the missing cases were left alone. Carrying them here is the converge unit's or a successor's call, and it lands only after the guide and the source agree.
- **The full `npm test` suite was not run.** It is not a criterion, the host is under load from sibling units, and every edit outside `tests/guides.test.ts` is comment prose that `check` already read. `test:guides`, `test:policy`, and `test:config` are the runs this unit took.
- **The `@orkestrel/guide` range stays `^0.0.17`** with `0.0.18` installed `--no-save`, as the standing conditions fix. `npm ls` reporting that package `invalid` against its range is expected and was not acted on.

## Deviations

None. No path outside the P21 list was written, every before-text was found verbatim, no voice diagnostic named an off-limits file, `test:policy` reds on nothing, and no gate other than `docs` reads red.

## Wall clock

2026-09-07T20:35Z to 2026-09-07T20:49Z, roughly 14 minutes. The opening reading is the first timestamp this run recorded (20:37:30Z); the status and diff reads that preceded it fall in the two minutes before.

## Retained instruments

Under `/home/user/fleet/middleware/tmp/d7n-middleware-prep/` (git-ignored, swept by the Orchestrator): `voice.py` (the exact-match rewriter that applied item 3), `lint-before.txt` and `lint-after.txt` (the `oxlint` readings either side of it), `docs.txt` (the worklist), `repair.log.txt` and `oxlint-before.log.txt` (the terminated run's captures), and `adapt.py` (the terminated run's item-2 rewriter).
