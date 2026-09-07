# Report — `d7n-websocket-converge`

Wall clock: 2026-09-07T15:56:31Z to 2026-09-07T16:10:33Z (14 minutes 2 seconds), from `date -u` before the first read to `date -u` after the final acceptance run. Baseline `4472093`, checkout `/home/user/fleet/websocket`.

## Touched files

| File | Change |
| --- | --- |
| `guides/websocket.md` | The tagline as one noun phrase, the displaced sentences folded into a new opening paragraph, `### Entities` renamed `### Classes`, the `## Methods` header `Behavior` renamed `Summary`, every `Summary` cell written from its doc block by the seed, the all-caps mode emphasis lowercased, § Tests naming the equality gate |
| `README.md` | The tagline as the blockquote under the H1, the opening paragraph rewritten as onboarding alone, the `## Usage` fence's mode comment lowercased |
| `src/server/types.ts` | Description rewrites on the type and interface blocks, and new doc blocks on the `NodeWebSocketInterface` call-signature members |
| `src/server/constants.ts` | Ruling 7 splits on the over-long constant descriptions |
| `src/server/errors.ts` | Description rewrites on `WebSocketError` and `isWebSocketError`, with the repeated remark sentence pruned |
| `src/server/factories.ts` | Description rewrite on `createNodeWebSocket`, its remark reworded, and the titled `@example` written by `--to source` |
| `src/server/helpers.ts` | Description rewrites carrying the incomplete-buffer answer and dropping an all-caps word from a compared cell |
| `src/server/parsers.ts` | Description rewrites carrying the `undefined` contract, with the repeated remark clause pruned |
| `src/server/NodeWebSocket.ts` | Description rewrite distinguishing the class from its interface |
| `tests/guides.test.ts` | The equality case, the population pin, the README case, `README.md` in `ROOT_FILES`, the `GUIDE_SPEC` constant, the `findDrift` import |

```text
 README.md                   |  15 +++--
 guides/websocket.md         | 141 ++++++++++++++++++++++----------------------
 src/server/NodeWebSocket.ts |   5 +-
 src/server/constants.ts     |  43 +++++++++++---
 src/server/errors.ts        |  17 +++---
 src/server/factories.ts     |  27 ++++-----
 src/server/helpers.ts       |  23 ++++----
 src/server/parsers.ts       |  20 ++++---
 src/server/types.ts         |  63 +++++++++++++++++---
 tests/guides.test.ts        |  75 ++++++++++++++++++++++-
 10 files changed, 294 insertions(+), 135 deletions(-)
```

## Criterion 1 — red first, on the unconverged tree

`npm run test:guides` after the three cases landed and before any convergence: `Tests 3 failed | 22 passed (25)`, exit 1. The failing cases and their first lines, verbatim:

`pairs at least one example title across the guide and the source`

```text
AssertionError: expected [ Array(1) ] to deeply equal []
+ [
+   "guides/websocket.md pairs: guide [\"Surface\",\"Errors\",\"Accept an upgrade and echo messages (server mode)\",\"Stream-decode frames across chunk boundaries\",\"Encode a frame to the wire (server unmasked, client masked)\",\"Compute the handshake accept token\",\"Keep a connection alive, and tear it down on demand\"] source []",
+ ]
```

`opens the README with the guide tagline`

```text
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:117:20
    117|  expect(pitch).not.toBeUndefined()
```

`WebSocket > keeps every compared summary and example equal to its source`

```text
AssertionError: expected [ …(46) ] to deeply equal []
+   "guides/websocket.md function createNodeWebSocket: guide \"A server-native WebSocket over a raw upgraded `node:stream` Duplex — server mode when a `key` is given, else client mode.\" source \"Creates a server-native WebSocket over a raw upgraded `node:stream` Duplex socket.\"",
+   "guides/websocket.md class NodeWebSocket: guide \"The WebSocket — the handshake, frame dispatch (text + continuation reassembly), auto-pong, close, and an owned `emitter`.\" source \"Represents a server-native WebSocket over a raw upgraded `node:stream` Duplex — the lean wrapper around the RFC 6455 wire protocol.\"",
+   … the worklist the brief embeds, plus the four `NodeWebSocketInterface.<member>: guide absent source absent` lines
```

## Criterion 2 — the headers and the class rows

`awk` over `guides/websocket.md`, printing the row before each `| ---` row:

```text
42: | API | Kind | Summary |          (### Factories)
48: | API | Kind | Summary |          (### Classes)
54: | API | Kind | Summary |          (### Errors)
61: | API | Kind | Summary |          (### Codec helpers)
75: | API | Kind | Summary |          (### Constants)
102: | API | Kind | Summary |         (### Types)
120: | Method | Returns | Summary |   (## Methods)
144: | Code | Raised when |           (the `## Errors` H2 section, outside `## Surface` and `## Methods`)
```

Every `## Surface` and `## Methods` table heads `Summary` beside `Kind` or `Returns`, with the guide's own first-column header kept. The only header text changed is the `## Methods` `Behavior` column, renamed `Summary`.

`### Entities` carried one row whose `Kind` is `class` (`NodeWebSocket`), so the heading became `### Classes`. `### Errors` is mixed (`WebSocketError` class, `isWebSocketError` function) and keeps its heading. No class is documented under its own H3 in this guide, so no `### Classes` table was added and no H3 section moved; `#### \`NodeWebSocketInterface\`` is a `## Methods` heading, not a class section.

The guide carries no `Shape` column, so no `Shape` idiom sentence was owed and no row kept a type literal in `Shape`.

## Criterion 3 — the doc blocks, then `--to guide`

Rewritten by hand, and why:

| Declaration | Reason |
| --- | --- |
| `createNodeWebSocket` | The cell carried the mode selection the description lacked; folded in as the contract the factory returns, and the remark reworded to keep only the handshake and masking consequences |
| `NodeWebSocket` | Its description was near-identical to `NodeWebSocketInterface`'s; rewritten as what the class implements and drives |
| `WebSocketError` | The cell's `code` and `context` moved into the description; the remark's first sentence, which the description now repeats, was pruned into the reference list that follows it |
| `isWebSocketError` | The cell's narrowing purpose folded in |
| `measureWebSocketFrame`, `matchesWebSocketCanonical`, `parseWebSocketFrame`, `parseUTF8` | The `undefined` answer is contract, not mechanism, and a `Summary` column omitting it reads as though each always returns a value; folded in, and the remark clause each description now repeats was pruned |
| `isCloseCode` | Its description carried the all-caps `RECEIVE`, which a compared cell would have carried into the guide |
| `WEBSOCKET_GUID`, `WEBSOCKET_CLOSE_UNSUPPORTED`, `WEBSOCKET_MAX_PAYLOAD`, `WEBSOCKET_CLOSE_TIMEOUT_MS`, `WEBSOCKET_FAIL_TIMEOUT_MS` | Ruling 7 splits: the reference clause moved to a new `@remarks`, every sentence kept. `WEBSOCKET_MAX_PAYLOAD` also carried the all-caps `AND`, and `WEBSOCKET_FAIL_TIMEOUT_MS` leaned on the private `#fail` field in text a public cell would carry |
| `WebSocketReadyState` | Its description carried "the four … values", a count; rewritten to name the members, with the remark's now-repeated list pruned |
| `WebSocketErrorCode` | Its description linked `{@link import('./errors.js').WebSocketError}`, which the comparator renders as that whole expression in a code span; written as the plain `WebSocketError` token, with the union's members named |
| `NodeWebSocketEventMap`, `NodeWebSocketOptions`, `NodeWebSocketInterface` | Each read as a bare "the options for X" or repeated a sibling's sentence; rewritten so a table scanner can tell the rows apart |
| `NodeWebSocketInterface.send` / `.ping` / `.close` / `.destroy` | The members carried no doc block, so `## Methods` compared nothing against nothing. Each gained a description, a `@remarks`, its `@param` rows, and its `@throws`. `destroy` states the lifecycle verb the vocabulary fixes, replacing the guide cell's "Abort immediately" |

Taken from source unchanged, because the information the cell carried already sat in the block's `@remarks` and is reference rather than contract: `computeWebSocketAccept`, `isWebSocketKey`, `isWebSocketProtocol`, `encodeWebSocketFrame`, `WebSocketFrame`, `WebSocketEncodeOptions`, `WEBSOCKET_VERSION`, every `WEBSOCKET_OPCODE_*`, every `WEBSOCKET_READY_*`, `WEBSOCKET_CLOSE_NORMAL`, `WEBSOCKET_CLOSE_PROTOCOL`, `WEBSOCKET_CLOSE_INVALID`, `WEBSOCKET_CLOSE_TOO_BIG`, `WEBSOCKET_CONTROL_MAX_LENGTH`, `WEBSOCKET_CLOSE_REASON_MAX_LENGTH`.

```text
$ npm run docs -- --to guide
wrote guides/websocket.md
… Accept an upgrade and echo messages (server mode): …; the guide fence owns an example
rows read: 1, disagreements found: 47, written: 46, reported: 1
$ npx oxfmt --write guides/websocket.md README.md          exit 0
$ npm run docs                                             exit 1: rows read: 1, disagreements found: 1  (the example pair alone)
```

A later pass sharpened `send` and `ping` after reading their written cells, and re-ran the same direction: `rows read: 1, disagreements found: 2, written: 2, reported: 0`, then `oxfmt --write` and `docs` at 0.

No cell was rebuilt by hand, so no row was split on a pipe. The non-`Summary` comparison against the baseline (`git show HEAD:guides/websocket.md`), splitting each row on a pipe not preceded by a backslash and matching rows by first cell and column width:

```text
$ node <scratchpad>/cells.mjs <baseline> guides/websocket.md
rows after: 58, rows compared: 58, unmatched rows: 0, non-Summary cells mismatched: 0
```

Every table row in the tree matched a baseline row, and every cell outside the `Summary` column is byte-identical. The `## Methods` header row's second-column rename is the sanctioned header change and is the only header text that moved.

No source line outside a comment changed:

```text
$ git diff -U0 -- src/ | grep -E '^[+-]' | grep -v '^[+-][+-]' | grep -vE '^[+-]\s*(\*|//|/\*\*)' | grep -vE '^[+-]\s*$'
(no output)
```

## Criterion 4 — the titled pair

Titled block: the `@example` of `createNodeWebSocket` in `src/server/factories.ts` — the primary factory, and the first `create*` the facts block lists. Title: `Accept an upgrade and echo messages (server mode)`.

Two fences were eligible, and this is the ancillary decision the deviation contract leaves to me. The `## Surface` fence also demonstrates `createNodeWebSocket`, but its nearest heading is the structural `## Surface`, so titling from it would have required a new H3 inserted above the surface tables. The `## Patterns` fence under `### Accept an upgrade and echo messages (server mode)` demonstrates the same factory under a heading already worded as the demonstration, so it carries the title and the document gains no heading and moves no fence.

Uniqueness, heading-scoped:

```text
$ grep -n '^#\+ Accept an upgrade and echo messages (server mode)' guides/websocket.md
177:### Accept an upgrade and echo messages (server mode)
```

Fence bodies read before choosing: the chosen fence opens at `guides/websocket.md:181` and closes at `:198`, and its body carries neither a three-backtick run nor the doc-comment terminator — `sed -n '182,197p' guides/websocket.md | grep -c '```\|\*/'` reads `0` on the tree this unit leaves. Every other `@example` block stays untitled.

The title was added by hand first, then `--to guide` ran, and `--to source` ran last, after `npm run docs` read the summaries at zero:

```text
$ npm run docs -- --to source
wrote src/server/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
$ npx oxfmt --write src/server/factories.ts    exit 0
```

The write carried the fence body in, so the block's example now imports through `@orkestrel/websocket` and drops the `on:` construction hook the guide's fence does not show — the pilot's shape.

## Criterion 5 — the tagline, the opening prose, the pitch

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold, and `README.md` carries the same text with the same line breaks under its own H1:

```text
> The server-native bidirectional transport: a lean, typed wrapper over a raw upgraded
> `node:stream` Duplex socket that speaks only the RFC 6455 wire protocol, owning the
> handshake, the masked and unmasked frame codec, ping and pong, and the close handshake,
> and surfacing every message on an owned `emitter`.
```

The guide gained an opening paragraph after the blockquote carrying the displaced sentences, which restates none of the tagline's clauses: the upgraded-socket entry, the dependency claim, the schema-agnostic boundary, the pure-codec split, the discipline sentence, and the `Source:` line with its `../src/server` and `@src/server` references. Every link the old blockquote carried moved into it — `node:stream`, RFC 6455, the `NodeWebSocket` anchor, `src/server` — and `node:crypto` gained one.

One prose claim changed on the facts. The old blockquote claimed "zero npm dependencies (`node:crypto` for the one handshake hash, nothing else)", and `package.json` declares `@orkestrel/emitter` as a runtime dependency, which the README's own paragraph already said. The pitch and the tagline are now one text, so the two could not both stand. The opening paragraph states the checkable claim instead: "it reaches for no third-party package to do it: `node:crypto` supplies the one handshake hash and `@orkestrel/emitter` the typed emitter."

The README's opening paragraph keeps the onboarding it alone carries, rewritten so it restates no tagline clause:

```text
Take the socket a `node:http` upgrade handler gives you, pass it to the
`createNodeWebSocket` function, and read every message off the returned handle's
`emitter`. Its sole runtime dependency is `@orkestrel/emitter`, which supplies that
typed emitter. Part of the `@orkestrel` line.
```

Voice sweep over the prose I own, case-insensitive and across inflections. The all-caps emphasis `SERVER` and `CLIENT` was lowercased at the `## Surface` fence comment, the narrowing paragraph after it, the `## Contract` item on the `key` decision, and the README's `## Usage` fence copy. § Tests dropped "two cross-wired `PassThrough`s" for "a cross-wired `PassThrough` at each end". Ruled permitted and left: `both directions` and `reconciles both`, each in a sentence naming its members; `two-byte`, `four-bit`, `16-byte`, `100 MiB`, `2 MB`, and the length-form boundaries, each a measurement; `DOC ↔ SOURCE`, which the accepted abort pilot also carries; `OPTION` / `LIMIT` / `CLOSE` / `FRAME` and `RST`, which are literal values. The substitution-table sweep over `guides/websocket.md`, `README.md`, `src/server/*.ts`, and `tests/guides.test.ts` returned one hit, `once: true` in `NodeWebSocket.ts:196`, a literal code identifier and exempt.

No rewritten sentence borrows a sibling export's name as its product noun. The `createNodeWebSocket` remark previously named `createSQLiteDatabase` and `createIndexedDBDatabase`, exports of packages this one does not depend on, alongside "an MCP transport (the later chunk) is built ON it"; the reworded remark keeps the boundary claim in plain words and drops the roadmap phrase and the all-caps.

## Criterion 6 — the seed at zero

```text
$ npm run docs                       exit 0    rows read: 1, disagreements found: 0
$ npm run docs -- --to guide         exit 0    rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source        exit 0    rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

```text
$ npx oxfmt --check README.md guides/websocket.md tests/guides.test.ts src/server/*.ts     exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings README.md guides/websocket.md tests/guides.test.ts src/server/*.ts   exit 0
$ npm run check                      exit 0
$ npm run test:guides                exit 0    Tests 25 passed (25)
$ npm run test:policy                exit 0    Tests 90 passed | 1 skipped (91)
```

The three cases that read red now read green inside that 25.

Observation, not a criterion: `npm run test:src:server`, the package's narrowest unit script, exits 0 at `Tests 120 passed (120)`.

## Criterion 8 — status

```text
$ git status --short
 M README.md
 M guides/websocket.md
 M src/server/NodeWebSocket.ts
 M src/server/constants.ts
 M src/server/errors.ts
 M src/server/factories.ts
 M src/server/helpers.ts
 M src/server/parsers.ts
 M src/server/types.ts
 M tests/guides.test.ts
```

Owned files only. `package.json`, `package-lock.json`, `guides/README.md`, `tests/setup*.ts`, `tests/src/**`, and every vendored file are untouched. No lint control was planted.

## Reader and seed defects met

None that stopped the unit. Two readings worth carrying to the pass, each with the seed line that produced it:

- **A `## Methods` row reports `guide absent source absent` when the guide's column is misnamed and the member carries no doc block, and names neither cause.** The seed line was `guides/websocket.md NodeWebSocketInterface.send: guide absent source absent`, and both halves had separate causes: the table headed `Behavior` rather than `Summary`, and `NodeWebSocketInterface`'s call-signature members in `types.ts` carried no doc blocks at all. `findDrift` documents that a pair where neither side carries text is drift, so this is the reader behaving as declared rather than a defect — but a converge unit reading that line alone cannot tell a missing column from a missing block, and on this package it was both.
- **A `{@link}` whose target is an import-type expression compares as that whole expression.** The seed line was `guides/websocket.md type WebSocketErrorCode: … source "Represents the subject an \`import('./errors.js').WebSocketError\` names as refused."`, from `{@link import('./errors.js').WebSocketError}` in `types.ts`. The comparator renders a link as its target's code token, correctly, so the import expression would have landed verbatim in the published `Summary` cell. Any package whose `types.ts` links a declaration it cannot import carries the same shape.

The vendored voice rule reads only top-level exported statements (`programToPolicyDocs` in `configs/policy.ts` skips anything that is not an `Export*` statement), so the new `NodeWebSocketInterface` member blocks are outside it. Each was still written verb-first, because its description paragraph is what the `## Methods` cell carries.

## Deviation state

No deviation. Nothing in the stop list was met: every cell the seed located was written, the titled body fit its block, no test outside `tests/guides.test.ts` went red, no vendored file needed an edit, every reader returned the shape the brief describes, and no residual disagreement stood after the rewrites.

Ancillary decisions recorded in full: which of the two eligible fences carries the title (§ Criterion 4), where each displaced tagline sentence sits (§ Criterion 5), which doc blocks were taken from source unchanged (§ Criterion 3), and the dependency claim the pitch could no longer carry (§ Criterion 5).
