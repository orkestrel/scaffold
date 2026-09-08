# Report — `d7n-server-converge-fix` (server's fix round on the audit's findings)

Every item landed. `npm run docs` reads `rows read: 1, disagreements found: 0` and both write
directions read `written: 0`; every scoped gate exits 0; `git status --short` lists owned files
only. One scope conflict is carried rather than written: acceptance criterion 4's all-caps grep
still reports `tests/setupServer.ts:232`, a line the brief's off-limits list withholds. Its exact
patch is under § Shared and off-limits patches.

## Items

### Item 1 — the Constants sentence (SV1, Ruling 20)

`guides/server.md:69`:

```diff
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. A `Shape` cell holds the constant's declared type.
+A `Shape` cell holds the constant's declared type.
```

The `### Types` sentence at `:144` is untouched.

### Item 2 — the titled pair on the entry (SV2, Rulings 9, 14, 17, 23)

`src/server/factories.ts`: `createNegotiator`'s block lost the title and returned to a
negotiation-only example of its own; `createServer`'s block took the title
`Quickstart: dispatcher, middleware, lifecycle` and the guide fence's body, generated from
`guides/server.md` so the pair is equal by construction.

```diff
-* @example Substrate direct use — tokens, cookies, negotiation
+* @example
  * ```ts
- * import type { MiddlewareContext } from '@orkestrel/server'
- * import {
- * 	createNegotiator,
- * 	decodeTokenPayload,
- * 	decompressRequestBody,
- * 	readSignedCookie,
- * 	signToken,
- * 	verifyToken,
- * 	writeSignedCookie,
- * } from '@orkestrel/server'
+ * import type { MiddlewareContext } from '@src/server'
+ * import { createNegotiator } from '@src/server'
```

The negotiator block keeps its `negotiate`, `encoding`, `language`, and `format` lines and drops
the cookie, token, and decompression lines that belong to the guide's substrate fence.

```diff
-* @example
+* @example Quickstart: dispatcher, middleware, lifecycle
  * ```ts
- * import { createServer } from '@src/server'
+ * import type { MiddlewareHandler } from '@orkestrel/server'
+ * import { createServer } from '@orkestrel/server'
  * import { createDispatcher } from '@orkestrel/router'
```

Ruling 14 applied to the difference: the block demonstrated connection-derived state
(`state: (connection) => ({ ip: connection.ip })`) and the fence demonstrated a typed `State`,
middleware, and `destroy()`. Nothing was deleted from either side. The fence gained the connection
fact, so `guides/server.md:437` and `:451` read:

```diff
 interface State {
 	readonly requestId: string
+	readonly ip: string | undefined
 }
@@
-	state: () => ({ requestId: crypto.randomUUID() }),
+	state: (connection) => ({ requestId: crypto.randomUUID(), ip: connection.ip }),
```

The executed transcription in `tests/guides.test.ts` took the same two lines, so the case that
transcribes the Quickstart stays true.

### Item 3 — all-caps (SV3)

Lowered, keeping each sentence's contrast: `src/server/constants.ts:96` (`NOT` → `never`);
`src/server/types.ts` at the drain and boundary list (`AND`, `FORCED`, `INNER`), the
`UpgradeHandler` block (`FIRST`, `CLAIMS`, `THROWS`, `NONE`, `CLAIMED`, `TRACKED`), and the
`ServerInterface` remark (`EPHEMERAL`); `tests/setupServer.ts:181` (`KEEPS` → `keeps`).

```diff
- * XML / SVG / WASM / a few document formats) — NOT already-compressed
+ * XML / SVG / WASM / a few document formats) — never already-compressed
```

```diff
- * order, the FIRST to return `true` CLAIMS (owns) the socket and stops the
- * fan-out; a handler that THROWS is treated as declined (the throw surfaces
- * on the `error` event) and the fan-out continues; if NONE claim it, the
+ * order, the first to return `true` claims (owns) the socket and stops the
+ * fan-out; a handler that throws is treated as declined (the throw surfaces
+ * on the `error` event) and the fan-out continues; if none claim it, the
```

The closing sweep then surfaced hits the brief's site list did not name. Two of them fall inside
criterion 4's own grep: `src/server/types.ts:130` (`FIRST`), which this unit owns and lowered, and
`tests/setupServer.ts:232` (`CLAIMED`), which the off-limits list withholds. The remaining emphasis
inside `src/server/types.ts` doc blocks was lowered in the same pass — `INTO`, `SECONDS`, `ALWAYS`,
`REJECTS`, `OMITTED`, `PRODUCE`, `PER`, `TYPE`, `SINGLE-LINE` (the `event` and `id` member lines),
`OVER`, `SAFE NO-OP`, `CHUNKS`, `ONE`, `INCLUSIVE`, `ABSENT`, `TOTAL`, `DECOMPRESSED`,
`ON THE WIRE`, `INDEPENDENT`, `UNCAPPED` — because that file is the one this unit's items and gates
already scope. `npm run docs` read zero afterwards, so no description paragraph moved.

**The closing sweep, ruled.** Pattern `\b[A-Z]{3,}\b`, paths `src`, `tests/setupServer.ts`,
`guides/server.md`, `grep -rnE` (before: 271 matching lines, after: 242).

Permitted, and left as data:

- Acronyms and format names — `HTTP`, `HTTPS`, `JSON`, `HMAC`, `SHA`, `SSE`, `TCP`, `TLS`, `URL`, `API`, `RFC`, `UTF`, `ASCII`, `XML`, `SVG`, `WASM`, `DOM`, `CORS`, `CSRF`, `TOCTOU`, `CRLF`, `OOM`.
- HTTP method and header vocabulary — `GET`, `OPTIONS`, and the `DENY` / `SAMEORIGIN` header values.
- Error codes — `EADDRINUSE`, `EAFNOSUPPORT`.
- Code literals the prose quotes — `'STATUS'` and `'NEXT'`, the `ServerErrorCode` arms, in `src/server/errors.ts`, `src/server/types.ts`, `src/server/Server.ts`, and the guide's rows at `:137`, `:166`, `:260`, `:357`.
- Repository filenames and a placeholder — `README`, `AGENTS`, and the `PORT` placeholder in `http://127.0.0.1:PORT`.

`guides/server.md`, `src/server/types.ts`, `src/server/factories.ts`, and `src/server/constants.ts`
doc blocks now carry only permitted hits. Not permitted, and not written — each is carried rather
than fixed, for the reason under the table:

| Location | Kind | Emphasis left |
| --- | --- | --- |
| `src/server/helpers.ts` | doc blocks (`:133`, `:136`, `:139`, `:246` to `:250`, `:380`, `:412` to `:416`, `:569` to `:572`, `:614`, `:686`, `:806`, `:807`, `:972`, `:974`, `:1089`, `:1164`, `:1262`, `:1309`, `:1313`) and `//` module comments (`:29`, `:120`, `:125`, `:399`, `:400`, `:402`, `:557`, `:828`, `:1191`, `:1193`) | `FIRST`, `PADDED`, `TOTAL`, `OFF`, `THROW`, `MATCH`, `COVERED`, `IGNORED`, `THROWS`, `KEPT`, `DESCENDING`, `STABLE`, `EXACT`, `NOT`, `WEAK`, `SECURITY`, `NEVER`, `FOUR`, `ONE`, `ABORTS`, `BEFORE`, `ONLY`, `RETURNING`, `SIGNED`, `SAME`, `ANY`, `RETIRED` |
| `src/server/errors.ts` | `//` module comments (`:3`, `:6`, `:10`, `:21`) | `OTHER`, `NOT`, `DIFFERENT`, `CALLER` |
| `src/server/Stream.ts` | doc blocks (`:12`, `:24`) and a `//` comment (`:122`) | `OVER`, `SAFE`, `CONSUMER` |
| `src/server/Negotiator.ts` | doc block (`:76`) | `UNMODIFIED` |
| `src/server/constants.ts` | `//` module comments (`:4`, `:8`) | `THIS`, `OUT` |
| `src/server/Server.ts` | `//` comments outside the three item 4 names (`:259`, `:260`, `:273`, `:359`, `:360`, `:455`, `:462`, `:484`, `:492`, `:493`, `:513`) | `FIRST`, `CAN`, `OWN`, `CLAIMS`, `DECLINED`, `IDLE`, `BOTH`, `BEFORE`, `LAST`, `AFTER`, `OWNS` |
| `tests/setupServer.ts` | doc block (`:232`) | `CLAIMED` |

Every `//` comment in that table is outside the scope sentence, which grants the doc blocks under
`src/**` and the `//` comments item 4 names in `src/server/Server.ts` and no other `//` comment. The
doc blocks in that table — `src/server/helpers.ts`, `src/server/Stream.ts`,
`src/server/Negotiator.ts` — are inside the scope sentence but outside every gate this brief names:
criterion 2's format list and criterion 4's grep both stop at `guides/server.md`,
`tests/guides.test.ts`, `src/server/types.ts`, `src/server/constants.ts`, `src/server/factories.ts`,
`src/server/Server.ts`, and `tests/setupServer.ts`. Rewriting prose in a file no gate here reads,
and that no item names, is a successor unit's work rather than this one's, and the residue is
recorded so that unit has its list.

### Item 4 — pointers (SV4)

`src/server/types.ts:561` drops the pointer for the fact:

```diff
- *   handler that owns a long-lived socket closes it from here, so the drain
- *   below settles instead of running out the deadline.
+ *   handler that owns a long-lived socket closes it from here, so the drain
+ *   settles instead of running out the deadline.
```

`src/server/Server.ts` names each referent:

```diff
-		// no manual removal needed (the same per-run lifecycle as the handler above).
+		// no manual removal needed (the same per-run lifecycle as the request
+		// handler `createHTTPServer` takes).
@@
-		// independent clock; the wake-park below resolves on the last finish OR
-		// the deadline, event-driven, never a busy-loop.
+		// independent clock; the wake-park inside `#drainPending` resolves on the
+		// last finish or the deadline, event-driven, never a busy-loop.
@@
-		// Hoisted above the inner try (not block-scoped inside it) so the catch
-		// below can attach real request context to the `error` emit / `report`
+		// Hoisted out of the inner try (not block-scoped inside it) so that try's
+		// catch can attach real request context to the `error` emit / `report`
```

`THIS` at `:214` and `NOT` at `:226` sit inside two of those three comments, so both were lowered
with the pointer they carry.

### Item 5 — the pair's phases (SV5)

`guides/server.md:299` onward:

```diff
-   lifecycle in nested phases of the same boundary. The innermost phase
-   covers only `buildRequest`: a malformed request (for example, an unparsable `Host`)
-   answers a plain `400`, with no `error` emit, no `report` call, and no
-   `response` emit, since nothing downstream ever ran and no parsed `Request`
+   lifecycle in an inner phase and an outer phase of the same boundary. The
+   inner phase covers only `buildRequest`: a malformed request (for example,
+   an unparsable `Host`) answers a plain `400`, with no `error` emit, no
+   `report` call, and no `response` emit, because nothing downstream ever ran
```

The paragraph was rewrapped to absorb the shift. The causal `since` went with it, which
`.claude/rules/writing.md` § Substitutions bans; that is an ancillary decision, recorded.

### Item 6 — the executed fences' presence guard (SV6)

`tests/guides.test.ts` gained `carries the fence lines the transcriptions copy` inside
`describe('guide fences')`, the pilot's case name and shape, reading a new `guideText` binding at
the top of that block. It binds the `negotiate`, `encoding`, and `language` calls,
`await verifyToken('bad.token', 'secret')`, the `decompressRequestBody` line, and the Quickstart's
`const port = await server.start()` and `await server.stop()` lines.

**Red first.** The guard was falsified by planting one documented byte in the guide — the
`negotiator.encoding` line's `// 'gzip'` comment rewritten to `// 'deflate'` — through
`tmp/d7n-server-converge-fix/plant-guard.py`:

```text
PATH=/opt/npm11/bin:$PATH npm run test:guides                       exit 1
 FAIL  |guides| tests/guides.test.ts > guide fences > carries the fence lines the transcriptions copy
 Test Files  1 failed (1)
      Tests  1 failed | 36 passed (37)
```

The plant was removed by the same instrument's `restore` mode; `grep -c "deflate']) // 'deflate'"`
over `guides/server.md` reads 0 and the same command then read:

```text
PATH=/opt/npm11/bin:$PATH npm run test:guides                       exit 0
 Test Files  1 passed (1)
      Tests  37 passed (37)
```

### Item 7 — the content-coding description (SV7)

`src/server/types.ts:202`:

```diff
- * Represents a content-coding the substrate compresses / decompresses with. The listed
- * codings are the `Content-Encoding` and `Accept-Encoding` token vocabulary the substrate
- * understands.
+ * Represents a content-coding the substrate compresses or decompresses with. Its
+ * members are the `Content-Encoding` and `Accept-Encoding` token vocabulary the
+ * substrate understands.
```

`npm run docs -- --to guide` carried it into the `Encoding` row and reported
`rows read: 1, disagreements found: 1, written: 1, reported: 0`, exit 0. No line ends in a hyphen,
so Ruling 22's compared-form hazard does not arise.

### Item 8 — the dead binding (SV8)

`guides/server.md:646`:

```diff
-const value = await readSignedCookie(
+await readSignedCookie(
```

The twin no longer exists: item 2 returned `createNegotiator`'s block to a negotiation-only
example, so the cookie lines left `src/server/factories.ts` in the same edit and the pair reads
zero. Recorded decision: the binding was dropped rather than kept with a trailing comment, because
every multi-line call in that fence — `negotiator.format`, the gzip `Response` — already stands
without one, and a comment claiming a return value here would be an unexecuted behavioural claim
the transcriptions do not cover.

### Item 9 — the closing items (SV9, Rulings 13, 20, 21)

The drop-in header's third line took the pilot's text:

```diff
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
```

Fence lead-ins, one complete sentence between each heading and its fence:

- `### Quickstart: dispatcher, middleware, lifecycle` — "`createServer` takes a dispatcher and a per-request state factory, `use` mounts middleware around the dispatch, and `start`, `stop`, and `destroy` run the lifecycle."
- `### SSE route` — "A route returns the stream's `response` at once and pumps events into the handle afterwards; a `write` that reports `false` is backpressure `drain` waits out."
- `### Upgrade attach` — "An upgrade handler returns `true` to claim the socket, which ends the fan-out and leaves the connection with that handler."
- `### Substrate direct use — tokens, cookies, negotiation` — "Each substrate helper stands on its own, so a caller reaches negotiation, signed cookies, tokens, and capped decompression without a `Server`."

### Item 10 — propagation

`npx oxfmt --config .oxfmtrc.json --write` over the seven owned paths, then `npm run docs` at zero
and both write directions at `written: 0`. Readings are under § Criteria.

## Criteria

Every command ran from `/home/user/fleet/server`.

**Criterion 1.** `git status --short`

```text
 M guides/server.md
 M src/server/Server.ts
 M src/server/constants.ts
 M src/server/factories.ts
 M src/server/types.ts
 M tests/guides.test.ts
 M tests/setupServer.ts
```

Owned files only. `git diff -U0 -- src` changes comment lines alone: the count of changed lines
that are not a `*`, `//`, or `/**` line is 0. Instruments and logs sit under
`tmp/d7n-server-converge-fix/`, which git ignores.

**Criterion 2.**

```text
npx oxfmt --config .oxfmtrc.json --check guides/server.md tests/guides.test.ts src/server/types.ts src/server/constants.ts src/server/factories.ts src/server/Server.ts tests/setupServer.ts
  All matched files use the correct format.
  Finished in 612ms on 7 files using 4 threads.                                        exit 0

npx oxlint --config .oxlintrc.json --deny-warnings tests src                           exit 0  (no output)

PATH=/opt/npm11/bin:$PATH npm run check
  > tsc --noEmit -p configs/src/tsconfig.server.json                                   exit 0
```

**Criterion 3.**

```text
PATH=/opt/npm11/bin:$PATH npm run docs                 rows read: 1, disagreements found: 0                        exit 0
PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide   rows read: 1, disagreements found: 0, written: 0, reported: 0 exit 0
PATH=/opt/npm11/bin:$PATH npm run docs -- --to source  rows read: 1, disagreements found: 0, written: 0, reported: 0 exit 0
```

**Criterion 4.**

```text
sed -n 69p guides/server.md
  A `Shape` cell holds the constant's declared type.

grep -n '@example Quickstart' src/server/factories.ts
  46: * @example Quickstart: dispatcher, middleware, lifecycle
grep -c '@example ' src/server/factories.ts
  1

diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
  (no output)                                                                          exit 0

grep -nE '\b(NOT|AND|FORCED|INNER|FIRST|CLAIMS|THROWS|NONE|CLAIMED|TRACKED|EPHEMERAL|KEEPS)\b' src/server/constants.ts src/server/types.ts tests/setupServer.ts
  tests/setupServer.ts:232: * registered handler CLAIMED the socket, and an ordinary HTTP response or a

grep -nw 'below\|above' src/server/types.ts src/server/Server.ts guides/server.md
  (no output)                                                                          exit 1

grep -n 'innermost' guides/server.md
  (no output)                                                                          exit 1

awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/server.md
  (no output)
```

The all-caps grep is the one criterion that does not read clean, and its single line is the
off-limits `tests/setupServer.ts:232`. The patch follows under § Shared and off-limits patches.
The drop-in's region also equals the pilot's:
`diff <(sed -n 47,258p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 56,267p tests/guides.test.ts)`
prints nothing, exit 0.

**Criterion 5.**

```text
PATH=/opt/npm11/bin:$PATH npm run test:guides
  Test Files  1 passed (1)
       Tests  37 passed (37)
    Duration  630ms                                                                    exit 0

PATH=/opt/npm11/bin:$PATH npm run test:policy
  Test Files  1 passed (1)
       Tests  90 passed | 1 skipped (91)
    Duration  633ms                                                                    exit 0
```

The 37 includes the new `carries the fence lines the transcriptions copy` case; the run before this
unit's edit carried 36.

`npm run test:setup` also ran, because `tests/setupServer.ts` carries one of this unit's edits:
`Test Files 2 passed (2)`, `Tests 14 passed (14)`, exit 0.

Observation, not a criterion:

```text
PATH=/opt/npm11/bin:$PATH npm run test:src:server
  Test Files  7 passed (7)
       Tests  263 passed | 1 skipped (264)
    Duration  13.79s                                                                   exit 0
```

No timing red to report.

## Shared and off-limits patches

`tests/setupServer.ts` — the brief's scope grants the doc block at `:181` for one word and withholds
every other line, so this line was left for serial integration. It is the last unpermitted hit in
criterion 4's grep.

```diff
--- a/tests/setupServer.ts
+++ b/tests/setupServer.ts
@@ -229,7 +229,7 @@
 /**
  * Drives a raw `node:http` protocol-upgrade request against a running server —
  * the real-socket probe the server face's upgrade-seam tests use (no
  * mocks). Resolves after the outcome is known: a `101` upgrade response means a
- * registered handler CLAIMED the socket, and an ordinary HTTP response or a
+ * registered handler claimed the socket, and an ordinary HTTP response or a
  * connection error from a destroyed socket means none did.
```

## Ancillary decisions

- The dead binding at `guides/server.md:646` was dropped rather than commented, for the reason under item 8.
- The untitled `createNegotiator` example imports through `@src/server`, matching `createStream`'s untitled block in the same file; the titled `createServer` block imports through `@orkestrel/server` because it must equal the guide fence byte for byte.
- Ruling 14's merge put the connection fact inside the Quickstart's state factory rather than beside it, because `state` is one option key and a second factory line would not compile.
- The rewrapped boundary paragraph replaced its causal `since` with `because`.
- The three `//` comments item 4 names in `src/server/Server.ts` were treated as whole comments, so `THIS` and `NOT` inside them were lowered with the pointers.

## Observations carried

- `const port = await server.start()` in the Quickstart fence binds a value the fence never reads, the same shape SV8 raised for `const value`. The audit did not name it and this unit's items do not reach it; the executed transcription does assert on `port`. It belongs to a successor unit with the emphasis residue in § Item 3.
- `src/server/helpers.ts:1452` (`// fetch/string-pure lives above in this same file`) is a `below`/`above` pointer in a `//` module comment outside this unit's scope. `src/server/constants.ts:50` uses `below` comparatively (`far below an OOM`), a permitted sense.

## Deviation state

No deviation stop. No gate outside the owned files went red and no pair failed to hold. One
acceptance criterion — criterion 4's all-caps grep — cannot read clean from inside this unit's
scope, because the line it reports is on the off-limits list; the patch is returned rather than
written.

## Instruments

Under `/home/user/fleet/server/tmp/d7n-server-converge-fix/`: `edit-guide.py`,
`edit-factories.py`, `edit-voice.py`, `edit-types-caps.py`, `edit-tests.py`, `plant-guard.py`,
`allcaps-before.txt`, `allcaps-after.txt`.

## Diffstat

```text
 guides/server.md        | 39 ++++++++++++++++++---------
 src/server/Server.ts    | 15 ++++++-----
 src/server/constants.ts |  2 +-
 src/server/factories.ts | 58 ++++++++++++++++------------------------
 src/server/types.ts     | 70 ++++++++++++++++++++++++-------------------------
 tests/guides.test.ts    | 31 ++++++++++++++++++++--
 tests/setupServer.ts    |  2 +-
 7 files changed, 123 insertions(+), 94 deletions(-)
```

## Wall clock

First edit 2026-09-08T01:45Z to last command 2026-09-08T01:53Z, with the preceding reading of the
brief, the bound rules, the rulings, and the pilot from about 2026-09-08T01:30Z.
