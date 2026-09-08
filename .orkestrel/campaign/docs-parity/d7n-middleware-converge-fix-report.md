# Report — `d7n-middleware-converge-fix`

`implementer` on Claude Opus 5, sole writer in `/home/user/fleet/middleware` from `6576d98`.
Wall clock 2026-09-08T02:57:43Z to 2026-09-08T03:15:06Z. Nothing committed, nothing installed, no
discard-class git command run. Instruments under `tmp/d7n-middleware-converge-fix/`; the runtime
probe under `tmp/probe/` is deleted.

Read against criterion 4: `grep -c 'SessionCursors plus' guides/middleware.md` reads **2**, not the
1 the criterion states. Item 4's clause "every other `extends` interface in `src/**` is ruled the
same way" reaches `SessionEntry`, which the close brief's `^export interface \w+ extends` sweep
missed because it is declared `export interface SessionEntry<S extends SessionInterface> extends
SessionCursors`. `SessionRow` and `SessionEntry` both name `SessionCursors` before `plus`, so the
line-count criterion cannot read 1 while Ruling 21 binds both rows. Every other criterion reads as
written. The Orchestrator rules.

## Per item

### 1 — `isBufferingIneligible` (MF1)

`src/core/helpers.ts:274-284`. The description stated the opposite of `@returns`.

```diff
- * Checks whether a response is eligible for the compression/ETag buffering pipeline
+ * Checks whether a response must skip the compression and ETag buffering pipeline
   * — the shared cheap-skip predicate both batteries apply before ever touching
- * `response.arrayBuffer()`.
+ * `response.arrayBuffer()`, true for a `HEAD` request, a `204`/`304` or
+ * otherwise bodyless response, an `event-stream` response, and a response
+ * already carrying the header the caller is about to set.
   *
   * @remarks
- * Skips a `HEAD` request, a `204`/`304` or otherwise bodyless response, an
- * `event-stream` response (SSE — buffering would hang the connection), and a
- * response that already carries the header the caller is about to set
- * (`skipHeader`, for example `Content-Encoding` for compression, `ETag` for the
- * ETag battery).
+ * Buffering an `event-stream` response would hang the connection, so SSE skips
+ * whatever its size. `skipHeader` is the header whose presence already answers
+ * the question — `Content-Encoding` for compression, `ETag` for the ETag
+ * battery.
```

Ancillary decision: the description now names the skip cases, because the guide reader never sees
`@remarks`, and `@remarks` keeps only the SSE rationale and the concrete `skipHeader` values the
description does not carry. `@returns` ("True if the response must be left untouched") is unchanged
and agrees.

The guide row at `guides/middleware.md:204` carries the wording after `--to guide`:

```text
| `isBufferingIneligible` | function | Checks whether a response must skip the compression and ETag buffering pipeline — the shared cheap-skip predicate both batteries apply before ever touching `response.arrayBuffer()`, true for a `HEAD` request, a `204`/`304` or otherwise bodyless response, an `event-stream` response, and a response already carrying the header the caller is about to set. |
```

The criterion's phrase present in that cell is `must skip`.

### 2 — the line-end hyphen (MF2, Ruling 22)

`grep -rnE '[a-z]-$' src --include=*.ts` on the baseline named three lines; all three are rewrapped.

```diff
  src/server/helpers.ts (description paragraph, the guide-compared one)
- * genuine climbing segment) → `normalize` → refuse any Windows reserved-
- * device-name segment ({@link isReservedDeviceName}) → `resolve` and require
- * the result under `root`.
+ * genuine climbing segment) → `normalize` → refuse any Windows
+ * reserved-device-name segment ({@link isReservedDeviceName}) → `resolve` and
+ * require the result under `root`.

  src/server/types.ts (`StaticOptions` @remarks)
- *   it whatever `dotfiles` is set to, because this path is operator-
- *   configured rather than request-derived.
+ *   it whatever `dotfiles` is set to, because this path is
+ *   operator-configured rather than request-derived.

  src/core/types.ts (`BearerOptions` @remarks)
- * - `scheme` — the scheme prefix stripped before verification (case-
- *   insensitive); defaults to {@link DEFAULT_BEARER_SCHEME}. An empty string
- *   means the whole header value is the raw token.
+ * - `scheme` — the scheme prefix stripped before verification
+ *   (case-insensitive); defaults to {@link DEFAULT_BEARER_SCHEME}. An empty
+ *   string means the whole header value is the raw token.
```

Ancillary decision: the item scopes the rewrap to a description-paragraph hit, and only the
`resolveStaticPath` hit is one. The other two sit in `@remarks`, outside every comparison; Ruling
22's first sentence binds a hand-wrapped doc block whatever the tag, so both are rewrapped too.

`grep -rnE '[a-z]-$' src --include=*.ts` after: prints nothing.
`grep -c 'reserved- ' guides/middleware.md` after: `0`.

### 3 — the lead-in under `### Mount a battery` (MF3, Ruling 21)

```diff
  ### Mount a battery

+ The fence composes an error boundary and the security battery over `compose`, then answers with the request identifier `createSecurity` stashed on `context.state`.
+
  ```ts
```

The intro sentence above the heading ("A battery closes over its guarded options and returns a
`MiddlewareHandler<TState>`, which composes with the others over the shipped seam.") stands.

### 4 — the extended interfaces (MF4, Ruling 21)

The Types convention sentence gained the clause:

```diff
- ... and a type alias's own type literal with a union's arms escaped as `\|`.
+ ... and a type alias's own type literal with a union's arms escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after.
```

`grep -rn 'extends' src --include=*.ts` names four extended interfaces, and every one is ruled:

| Declaration                                                     | Cell before                                            | Cell after                                     |
| --------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| `MemorySessionStoreOptions extends SessionLimits` (`core/types.ts:612`) | `{ ttl?, lifetime?, capacity?, evict? }`               | `SessionLimits plus { capacity?, evict? }`     |
| `SessionRow extends SessionCursors` (`core/types.ts:454`)        | `{ id, session, seen, created }`                       | `SessionCursors plus { id, session }`          |
| `SessionEntry<S> extends SessionCursors` (`core/types.ts:465`)   | `{ session, seen, created }`                           | `SessionCursors plus { session }`              |
| `UploadedFile extends Omit<MultipartFile, 'status'>` (`server/types.ts:179`) | `{ field, name, size, mime, validated, status, path }` | `Omit<MultipartFile, 'status'> plus { status }` |

Ancillary ruling on `UploadedFile`: the parent is a mapped type rather than a bare name, so the cell
names the parent exactly as the declaration writes it and puts the one member the interface adds
after `plus`. The flattened cell listed inherited members as if declared, which Ruling 21 refuses.

Ancillary ruling on the close brief's "interface rows whose braces carry no `plus`" list: every
interface in `src/**` that declares a call-signature member already carries `plus`. The declarations
with call-signature members are `AssetSourceInterface`, `SessionInterface`, `SessionControlInterface`,
`SessionStoreInterface`, and `SessionTransportInterface`, read with
`awk '/^export interface /{...} /^\t[a-zA-Z#[]/ && /\(/ && !/^\t(readonly )?[a-zA-Z]+\??:/' src/core/types.ts src/server/types.ts`.
No row moved.

### 5 — the Shapers table (MF5, Ruling 25)

```diff
  ### Shapers

+ A `Shape` cell holds the constant's declared type.
+
- | API              | Kind  | Summary |
- | `sessionColumns` | const | Holds the `@orkestrel/database` column shape … |
+ | API              | Kind  | Shape                            | Summary |
+ | `sessionColumns` | const | `{ id, session, seen, created }` | Holds the `@orkestrel/database` column shape … |
```

Ancillary ruling on the cell: `sessionColumns` is a record of shape values
(`{ id: stringShape(), session: jsonShape(), seen: integerShape({ min: 0 }), created: integerShape({ min: 0 }) }`),
not an `objectShape(...)` value, so its declared type is an object type literal. Ruling 25 imports
Ruling 19's bare-member form for the property record inside `ObjectShape<…>`, and the same form
applies to a plain record of shapes: the cell holds the member names in declaration order. The
emitted structural type (`{ id: StringShape; session: JSONShape; seen: NumberShape; created: NumberShape }`)
is not written into the cell.

### 6 — the drop-in header and region (MF6, Rulings 13 and 21)

```diff
- // package's own, and are the only part a sibling package changes.
+ // package's own, as is the executed section that closes the file.
```

```text
$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
(no output; exit 0)
```

The region from `const root = ` through the manifest loop's closing brace is byte-identical to the
pilot's, checked by extracting both regions and comparing them: `identical`. Nothing in that region
was edited.

### 7 — the executed section (MF7, Ruling 20)

Appended after the manifest loop, in the pilot's form: the `// The EXECUTED half.` comment block,
`describe('flagship fences')`, the titled-fence transcription, and the presence guard
`carries the fence lines the transcriptions copy`. Imports added beside the pilot's:
`compose` from `@orkestrel/server`, `IdentifierState` and `createBoundary`/`createSecurity` from
`@src/core`, `buildRequest`/`createTestContext` from `./setup.js`.

**The executed case.** `answers with the request identifier the composed security battery stamped`
transcribes the titled `### Mount a battery` fence, drives it over one real `Request`, and asserts:

```ts
expect(response.status).toBe(200)
expect(stamped).not.toBeNull()
await expect(response.json()).resolves.toEqual({ identifier: stamped })
expect(response.headers.get('strict-transport-security')).toBe('max-age=31536000; includeSubDomains')
```

**The probe behind it.** `tmp/probe/mount.test.ts`, run through `npm run test:probe`, drove the
fence verbatim and printed the response before anything was asserted. Control drawn from outside the
population — `expect(response.status).toBe(599)`:

```text
 × |probe| tmp/probe/mount.test.ts > mount a battery fence > reports what the composition returns
   → expected 200 to be 599 // Object.is equality
 Test Files  1 failed (1)
      Tests  1 failed (1)
```

Readings the run printed:

```text
STATUS 200
HEADERS "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-frame-options": "DENY",
        "x-request-id": "38a80f8d-9fec-419b-8c42-a14d777c8d89"
BODY {"identifier":"38a80f8d-9fec-419b-8c42-a14d777c8d89"}
```

The control was then replaced by the assertions the case now carries, and the same command reported
`Test Files 1 passed (1) / Tests 1 passed (1)`. The probe is deleted; the assertions live in
`tests/guides.test.ts`.

Ancillary decision on what the transcription asserts: the fence carries no comment claiming a value,
so the case asserts what the fence builds — that the chain reaches the handler and the handler reads
the identifier `createSecurity` stashed. The response header is bound beside the body, because a
stashed identifier the response never carries would satisfy the body assertion alone. The
transcription imports through `@src/core` where the fence imports through `@orkestrel/middleware`,
the form `/home/user/fleet/server/tests/guides.test.ts` uses for the same reason.

**The `## Contract` survey.** The population the item names is "a claim the acceptance bar states as
behaviour, that a guide fence demonstrates, and that no suite under `tests/src/**` already asserts".
It is empty: every acceptance-bar claim a fence demonstrates already has a gate, so each was left to
it.

| Bar claim                    | Fence demonstrating it                       | Gate already asserting it                                                                             |
| ---------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 14 CORS `Vary` and `null`    | Canonical onion — fetch-native               | `tests/src/core/middlewares.test.ts:419,428,437`                                                       |
| 15 headers, id, `csp`, nosniff | Mount a battery; Canonical onion            | `tests/src/core/middlewares.test.ts:335,347,380`                                                       |
| 16 bearer totality           | Canonical onion                              | `tests/src/core/middlewares.test.ts:797,806,816,827`                                                   |
| 17 limiter keys and LRU      | Canonical onion                              | `tests/src/core/middlewares.test.ts:861,898,925,954,1012`                                              |
| 18 body maps its outcomes    | Body: eager cache drive                      | `tests/src/core/middlewares.test.ts:1112,1146,1161,1174`                                               |
| 19 session stores and control | Session fences; store seam fences            | `tests/src/core/middlewares.test.ts:1255,1292,1368,1391,1422,1480`; `tests/src/core/stores/*.test.ts`  |
| 20 CSRF session binding      | CSRF: session-bound double-submit            | `tests/src/core/middlewares.test.ts:1646,1684`                                                          |
| 21 static handle and traversal | Static: SPA fallback                       | `tests/src/server/middlewares.test.ts:369,395,488,567,845`                                             |
| 22 assets decode, cache, Brotli | Assets: in-memory source                  | `tests/src/server/middlewares.test.ts:73,92,180,216`                                                    |
| 23 multipart sniffing and limits | Multipart: node face                     | `tests/src/server/parsers.test.ts`; `tests/src/server/middlewares.test.ts:934,954,988,1004,1061`        |
| 24 boundary exposure and report | Mount a battery                           | `tests/src/core/middlewares.test.ts:70,80,89`                                                           |
| 25 `only`/`except` matching  | no fence uses `only()` or `except()`         | `tests/src/core/middlewares.test.ts:1932-2012`                                                          |

Two acceptance-bar readings carry no gate I could find and no fence demonstrates either, so both sit
outside this unit's population and outside its owned files (`tests/src/**` is off-limits). Recorded
for the Orchestrator, not fixed here:

- Claim 16's "empty-rotation input" — `grep -n "secret: \[\]" tests/src/**/*.test.ts` prints nothing,
  so no case drives `createBearer({ secret: [] })`.
- Claim 17's "same-socket requests with different XFF values still share one bucket" without
  `createForwarded` mounted — the limiter cases drive `ClientState` and `ConnectionState`, never an
  `x-forwarded-for` header with the limiter alone.

### 8 — all-caps emphasis and the count (MF8)

Every site the item names is lowered, and the `ForwardedOptions` count is replaced by the forms it
counted:

```diff
  src/core/types.ts (`ForwardedOptions`)
- * Construction requires EXACTLY ONE of the two forms (a `TypeError` guards
- * both-set and neither-set):
+ * Construction requires either `proxies` or `trusted`, never both and never
+ * neither (a `TypeError` guards each):
```

Sites lowered, each keeping its contrast in words: `core/types.ts` (`SYNCHRONOUSLY` → `synchronously`
beside "after the handler's `next()` returns"; `RETURNED` → `returned` beside "on the way out";
`CONSTRUCTION`; `OFF`/`OFF`/`ON` by default; two `DEFAULT` memory-store references),
`core/middlewares.ts` (`MUST sit OUTSIDE` → `Mount this battery outside`; `SAME awaited call`),
`core/helpers.ts` (`EXACT`, `CONSECUTIVE`, `COUNT`, `BELOW`, `OWN`),
`core/stores/MemorySessionStore.ts` (`EVEN IF`, and its causal `since` → `because`),
`core/stores/DatabaseSessionStore.ts` (`LEAVES`),
`server/types.ts` (`BOUNDED`, `MUST`, `REQUIRED.` recast as "the required directory", `SAME`,
`SNIFFED` twice, `METADATA ONLY`, `AND`),
`server/parsers.ts` (`NEVER`, `METADATA ONLY`, `OR`, `AND`, `iff its SNIFFED` → `exactly when its
sniffed`, `ONCE`),
`server/middlewares.ts` (`CANONICAL`, `INSIDE`, `SAME`, `DOWNSTREAM`),
`server/helpers.ts` (`SAME`, `OPPOSITE`, `STEM`, `PULL-driven` → `Pull-driven`).

Criterion grep:

```text
$ grep -rnE '\b(EXACTLY|SYNCHRONOUSLY|RETURNED|OUTSIDE)\b' src
(no output; exit 1)
```

Ruled sweep, `grep -rhoE '\b[A-Z]{3,}\b' src guides/middleware.md README.md | sort | uniq -c`, every
remaining hit and why it stays:

| Hits                                                                                                                                    | Ruling                            |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `GET`, `HEAD`, `OPTIONS`, `POST`, `PUT`, `PATCH`, `DELETE`                                                                              | HTTP method tokens                |
| `HTTP`, `MIME`, `URL`, `API`, `JSON`, `DOM`, `TLS`, `ESM`, `MIT`, `POSIX`, `RFC`, `CVE`, `SPA`, `SSE`, `CORS`, `CSRF`, `CIDR`, `XFF`, `LRU`, `CRLF`, `XOR`, `TOCTOU`, `OWASP`, `WHATWG`, `BREACH` | acronyms, `BREACH` the attack name |
| `DENY`, `SAMEORIGIN`                                                                                                                    | header values                     |
| `NUL`, `CON`, `PRN`, `AUX`                                                                                                              | Windows reserved device names     |
| `EXDEV`, `ENOENT`                                                                                                                       | Node error codes                  |
| `README`, `LICENSE`, `AGENTS`                                                                                                           | filenames                         |
| `INTERNAL`                                                                                                                              | the drop-in's own constant        |

### 9 — the unnamed literals (MF9, Ruling 18)

```diff
- /** Holds the default `Permissions-Policy` value `createSecurity` sets. */
+ /** Holds `'camera=(), microphone=(), geolocation=()'`, the default `Permissions-Policy` value `createSecurity` sets. */

- /** Holds the default 429 body message `createLimiter` sends when a key is over budget. */
+ /** Holds `'rate limit exceeded'`, the default 429 body message `createLimiter` sends when a key is over budget. */

  /**
- * Holds the default `Content-Security-Policy` value `createSecurity` sets — a custom
+ * Holds `"default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'"`,
+ * the default `Content-Security-Policy` value `createSecurity` sets — a custom
   * `csp` option replaces this wholesale, never merges.
   */
```

Ancillary ruling on `DEFAULT_CSP`: a default policy string is the fact a reader needs, and Ruling 18
grants no length exemption, so its description names the literal like every sibling default. The
`Shape` cell stays `string`, the declared type, per Ruling 21.

### 10 — the README (MF10)

```diff
  Each battery is a typed `options => MiddlewareHandler<TState>` factory that composes with
- the others through the frozen `@orkestrel/server` seam — mount boundary, telemetry,
- compression, security headers, CORS, rate limiting, sessions (with `MemorySessionStore` or
- `DatabaseSessionStore` over `@orkestrel/database`), CSRF, static files, and multipart uploads
- in any combination, scoped with `only()` / `except()` where needed.
+ the others through the frozen `@orkestrel/server` seam, in any combination, scoped with
+ `only()` and `except()` where needed.
```

The blockquote pitch above already enumerates the batteries, and the guide carries the store detail.
The README's `## Install` and `## Usage` fences keep their bare position under their headings, per
Ruling 24.

### 11 — the closing items (MF11, Rulings 13, 20, 21, 25, 26, 28)

- **The `Shape` idiom where a table lacked it.** The `### Shapers` constants table (item 5) and the
  `### Validators — core` guard table. The guard table gained
  "In a guard table a `Shape` cell holds the type the guard narrows to." between its existing
  totality sentence and the table, and each row holds the type its predicate narrows to, read from
  `src/core/validators.ts`: `isSession` → `SessionInterface`, `isSessionControl` →
  `SessionControlInterface`, `isMultipartFile` → `MultipartFile`, `isMultipartBody` →
  `MultipartBody`. No interface sentence sits in front of it, so Ruling 27's strike has nothing to
  remove.
- **Rulings 26 and 28 are inert here.** Both bind a function or class row *in a table that carries
  `Shape`*. After this unit the tables carrying `Shape` are `### Types` (interface and type rows),
  `### Constants` and `### Shapers` (const rows), and `### Validators — core` (guard rows, which
  Ruling 26 sends to the narrowed type, matching Ruling 20). `### Helpers — core`, `### Helpers —
  node`, `### Parsers — node`, `### Factories`, `### Classes`, and `### Errors` carry no `Shape`
  column and no interface or type-alias row, so neither ruling fires and no empty cell exists:
  `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/middleware.md` prints nothing.
- **`#` links.** `grep -rn '{@link [A-Za-z]*#' src --include=*.ts` prints nothing and
  `grep -n '](#' guides/middleware.md README.md` prints nothing, so the close brief's empty site list
  holds and no cell needed a re-read.
- **A lead-in before every fence directly under a heading.** Ten headings took one, beyond item 3's:
  `Canonical onion — behind @orkestrel/server`, `Body: eager cache drive`,
  `Session: control handle, header transport, injected store`, `Session store seam — direct calls`,
  `Session transport seam — direct calls`, `CSRF: session-bound double-submit`,
  `Multipart: node face, sniffed-type allow-list`, `Multipart limits — direct resolution`,
  `Assets: in-memory source`, `Static: SPA fallback`. Every fence in the guide is now introduced by
  a complete sentence; the two that were already introduced by a colon-terminated sentence
  (`Canonical onion — fetch-native runtime` and the durable-store fence) are unchanged.

### 12 — propagation

```text
$ npx oxfmt --config .oxfmtrc.json --write guides/middleware.md README.md tests/guides.test.ts src
Finished in 654ms on 22 files using 4 threads.

$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

The intermediate `--to guide` that carried the five moved descriptions reported
`rows read: 1, disagreements found: 5, written: 5, reported: 0` and rewrote `guides/middleware.md`.

## The standing condition — the node-face `createCompression` row

`guides/middleware.md:73` is outside `findDrift`'s comparison, because the reader keys the surface by
name and the core-face row at `:52` takes the key. Read by hand, collapsing the block's newlines the
way the comparison does, the node-face row already equals its declaration's description paragraph in
`src/server/middlewares.ts`:

```text
block: Compresses response bodies through `node:zlib`, guaranteed on any Node runtime rather than dependent on the WHATWG `CompressionStream` global. This battery is the node-bound sibling of the core face's feature-detected `createCompression`, and it ships from a separate package entry point (`@orkestrel/middleware/server`) so the shared name is unambiguous per consumer import path.
cell : (identical)
EQUAL
```

No convergence was needed, and no byte of that row or block moved in this unit.

## Criteria

**1. Owned files only, and no code line in `src`.**

```text
$ git status --short
 M README.md
 M guides/middleware.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/middlewares.ts
 M src/core/stores/DatabaseSessionStore.ts
 M src/core/stores/MemorySessionStore.ts
 M src/core/types.ts
 M src/server/helpers.ts
 M src/server/middlewares.ts
 M src/server/parsers.ts
 M src/server/types.ts
 M tests/guides.test.ts

$ git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'
(no output; exit 1)
```

**2. Format, lint, typecheck.**

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/middleware.md README.md tests/guides.test.ts src
All matched files use the correct format.
Finished in 840ms on 22 files using 4 threads.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src
exit 0

$ PATH=/opt/npm11/bin:$PATH npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
exit 0
```

**3. Docs at zero, both directions at `written: 0`.** Quoted under item 12.

**4. The greps.**

```text
$ grep -c 'must skip\|must be left untouched\|skips the' guides/middleware.md
1                       (the `isBufferingIneligible` row; the phrase is `must skip`)

$ grep -c 'reserved- ' guides/middleware.md
0

$ grep -c 'SessionLimits plus' guides/middleware.md
1

$ grep -c 'SessionCursors plus' guides/middleware.md
2                       (see the reading at the head of this report)

$ grep -c "describe('flagship fences'" tests/guides.test.ts
1

$ grep -rnE '\b(EXACTLY|SYNCHRONOUSLY|RETURNED|OUTSIDE)\b' src
(no output; exit 1)

$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
(no output; exit 0)

$ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/middleware.md
(no output)

$ grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/middleware.md
(no output; exit 1)
```

**5. Suites.**

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
 Test Files  1 passed (1)
      Tests  43 passed (43)
   Duration  867ms
exit 0

$ PATH=/opt/npm11/bin:$PATH npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  859ms
exit 0
```

Observations, taken inside this unit's own exec:

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:src:core
 Test Files  7 passed (7)
      Tests  268 passed (268)
   Duration  1.20s
exit 0

$ PATH=/opt/npm11/bin:$PATH npm run test:src:server
 Test Files  4 passed (4)
      Tests  164 passed | 1 skipped (165)
   Duration  980ms
exit 0
```

The guides suite before the executed section landed reported `1 failed | 42 passed (43)`, the
equality case red on the five moved descriptions; `--to guide` closed it.

## Diffstat

```text
 README.md                               |   6 +-
 guides/middleware.md                    | 150 +++++++++++++++++++-------------
 src/core/constants.ts                   |   7 +-
 src/core/helpers.ts                     |  25 +++---
 src/core/middlewares.ts                 |   4 +-
 src/core/stores/DatabaseSessionStore.ts |   2 +-
 src/core/stores/MemorySessionStore.ts   |   2 +-
 src/core/types.ts                       |  26 +++---
 src/server/helpers.ts                   |  14 +--
 src/server/middlewares.ts               |   8 +-
 src/server/parsers.ts                   |  10 +--
 src/server/types.ts                     |  22 ++---
 tests/guides.test.ts                    |  59 ++++++++++++-
 13 files changed, 209 insertions(+), 126 deletions(-)
```

`guides/middleware.md`'s line movement is larger than the cells that changed: `replaceCell`
re-renders a whole table, and the `### Helpers — core` and `### Helpers — node` tables re-padded
because the `isBufferingIneligible` and `resolveStaticPath` summaries changed length.

## Deviation state

No stop condition fired. No gate outside the owned files went red, `--to guide` cleared every
disagreement, and the item 7 probe confirmed the titled fence rather than falsifying it. The one
reading that departs from a criterion as written is `grep -c 'SessionCursors plus'`, stated at the
head of this report.

## Orchestrator annotation, 2026-09-08

The closure checker (`d7n-middleware-closure-checker-middleware.md`) found counts stated in prose at items 2, 4, 7, and 11 of this report; the tree is authoritative and the report stands as evidence with this note. The `grep -c 'SessionCursors plus'` reading of `2` is ruled correct (`SessionRow` and `SessionEntry` both extend `SessionCursors`).
