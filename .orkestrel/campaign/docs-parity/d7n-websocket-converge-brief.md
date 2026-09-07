# Brief — P.2 `d7n-websocket-converge` (websocket under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/websocket` from the committed baseline `4472093` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.12`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/websocket.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/websocket/guides/websocket.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-websocket-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/websocket.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/websocket.md` and `README.md`; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/websocket.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/websocket.md function createNodeWebSocket: guide "A server-native WebSocket over a raw upgraded `node:stream` Duplex — server mode when a `key` is given, else client mode." source "Creates a server-native WebSocket over a raw upgraded `node:stream` Duplex socket."
guides/websocket.md class NodeWebSocket: guide "The WebSocket — the handshake, frame dispatch (text + continuation reassembly), auto-pong, close, and an owned `emitter`." source "Represents a server-native WebSocket over a raw upgraded `node:stream` Duplex — the lean wrapper around the RFC 6455 wire protocol."
guides/websocket.md class WebSocketError: guide "A refused caller-supplied value, carrying a machine-readable `code` and an optional `context`." source "Represents an error thrown by the WebSocket wrapper for a refused caller-supplied value."
guides/websocket.md function isWebSocketError: guide "Whether a caught value is a `WebSocketError`, narrowing it so a `catch` can branch on `error.code`." source "Checks whether a value is a `WebSocketError`."
guides/websocket.md function computeWebSocketAccept: guide "The `Sec-WebSocket-Accept` token, the base64 SHA-1 of the key plus `WEBSOCKET_GUID`." source "Computes the `Sec-WebSocket-Accept` response value for an RFC 6455 upgrade."
guides/websocket.md function isWebSocketKey: guide "Whether a value is the canonical base64 encoding of a 16-byte `Sec-WebSocket-Key`." source "Checks whether a value is a canonical RFC 6455 `Sec-WebSocket-Key`."
guides/websocket.md function isWebSocketProtocol: guide "Whether a value is one valid HTTP-token WebSocket subprotocol (no separators or header injection)." source "Checks whether a value is one valid WebSocket subprotocol token."
guides/websocket.md function parseWebSocketFrame: guide "One frame decoded off a buffer; `undefined` when the buffer is incomplete, so the caller accumulates." source "Decodes a single RFC 6455 frame from the front of a buffer."
guides/websocket.md function measureWebSocketFrame: guide "A frame's declared payload length off the buffer without buffering the payload; `undefined` until the length field itself is complete." source "Reads the declared payload length off the front of a buffer, without buffering or reading the payload itself."
guides/websocket.md function matchesWebSocketCanonical: guide "Whether the next frame uses the shortest valid length encoding; `undefined` until its length prefix is complete." source "Checks whether the next frame uses the shortest valid RFC 6455 payload-length encoding."
guides/websocket.md function parseUTF8: guide "The bytes decoded as strict UTF-8; `undefined` when the sequence is malformed." source "Decodes a byte sequence as strict UTF-8, or signals it is malformed."
guides/websocket.md function isCloseCode: guide "Whether a numeric value is a valid RFC 6455 close status code to receive (extended with the IANA-registered `1012`–`1014` interop codes)." source "Checks whether a numeric value is a valid RFC 6455 close status code to RECEIVE (§7.4.1)."
guides/websocket.md function encodeWebSocketFrame: guide "One frame as wire bytes, the inverse of `parseWebSocketFrame`; unmasked by default, optionally masked." source "Encodes a single RFC 6455 frame to its wire bytes — the inverse of `parseWebSocketFrame`."
guides/websocket.md const WEBSOCKET_GUID: guide "The RFC 6455 §1.3 accept GUID concatenated to the key before the hash." source "Names the RFC 6455 GUID concatenated to a client's `Sec-WebSocket-Key` before the SHA-1 hash that yields the `Sec-WebSocket-Accept` response value."
guides/websocket.md const WEBSOCKET_VERSION: guide "The supported protocol version (`'13'`)." source "Names the WebSocket protocol version this wrapper speaks (`Sec-WebSocket-Version: 13`)."
guides/websocket.md const WEBSOCKET_OPCODE_TEXT: guide "Text frame opcode (`0x01`)." source "Names the text frame opcode — a UTF-8 payload (RFC 6455 §5.6)."
guides/websocket.md const WEBSOCKET_OPCODE_BINARY: guide "Binary frame opcode (`0x02`)." source "Names the binary frame opcode — a raw byte payload (RFC 6455 §5.6)."
guides/websocket.md const WEBSOCKET_OPCODE_CONTINUATION: guide "Continuation frame opcode (`0x00`)." source "Names the continuation frame opcode — the next fragment of an open data message (RFC 6455 §5.4)."
guides/websocket.md const WEBSOCKET_OPCODE_CLOSE: guide "Close frame opcode (`0x08`)." source "Names the close frame opcode — a control frame ending the connection (RFC 6455 §5.5.1)."
guides/websocket.md const WEBSOCKET_OPCODE_PING: guide "Ping frame opcode (`0x09`)." source "Names the ping frame opcode — a control frame the peer must answer with a pong (RFC 6455 §5.5.2)."
guides/websocket.md const WEBSOCKET_OPCODE_PONG: guide "Pong frame opcode (`0x0a`)." source "Names the pong frame opcode — a control frame answering a ping (RFC 6455 §5.5.3)."
guides/websocket.md const WEBSOCKET_READY_CONNECTING: guide "Ready state `0` (connecting)." source "Names the ready state for a connecting WebSocket (before the handshake completes)."
guides/websocket.md const WEBSOCKET_READY_OPEN: guide "Ready state `1` (open)." source "Names the ready state for an open WebSocket (the handshake completed; frames flow)."
guides/websocket.md const WEBSOCKET_READY_CLOSING: guide "Ready state `2` (closing)." source "Names the ready state for a closing WebSocket (a close frame was sent or received)."
guides/websocket.md const WEBSOCKET_READY_CLOSED: guide "Ready state `3` (closed)." source "Names the ready state for a closed WebSocket (the socket ended)."
guides/websocket.md const WEBSOCKET_CLOSE_NORMAL: guide "The normal-closure status code (`1000`) — the default `close` code." source "Names the normal-closure status code (RFC 6455 §7.4.1) — the default `close` code."
guides/websocket.md const WEBSOCKET_CLOSE_PROTOCOL: guide "Protocol-error status code (`1002`) — a framing/state rule was violated." source "Names the protocol-error status code (RFC 6455 §7.4.1) — a framing/state rule was violated."
guides/websocket.md const WEBSOCKET_CLOSE_UNSUPPORTED: guide "Unsupported-data status code (`1003`) — the endpoint received a data type it cannot accept." source "Names the unsupported-data status code (RFC 6455 §7.4.1) — the endpoint received a data type it cannot accept, for example binary on a text-only endpoint."
guides/websocket.md const WEBSOCKET_CLOSE_INVALID: guide "Invalid-frame-payload-data status code (`1007`) — for example non-UTF-8 text or an unparseable close reason." source "Names the invalid-frame-payload-data status code (RFC 6455 §7.4.1) — for example non-UTF-8 text or an unparseable close reason."
guides/websocket.md const WEBSOCKET_CLOSE_TOO_BIG: guide "Message-too-big status code (`1009`) — a reassembled message exceeded the payload cap." source "Names the message-too-big status code (RFC 6455 §7.4.1) — a reassembled message exceeded the payload cap."
guides/websocket.md const WEBSOCKET_MAX_PAYLOAD: guide "The default maximum inbound single-frame length AND reassembled-message total byte count (100 MiB)." source "Names the default maximum inbound single-frame length AND reassembled-message total byte count (100 MiB — the `ws` package default)."
guides/websocket.md const WEBSOCKET_CLOSE_TIMEOUT_MS: guide "The default close-handshake timeout in milliseconds — how long `close()` waits for the peer's echo." source "Names the default close-handshake timeout in milliseconds — how long `close()` waits for the peer's echo before tearing the socket down."
guides/websocket.md const WEBSOCKET_CONTROL_MAX_LENGTH: guide "The maximum control-frame payload length in bytes (RFC 6455 §5.5)." source "Names the maximum control-frame payload length in bytes (RFC 6455 §5.5)."
guides/websocket.md const WEBSOCKET_CLOSE_REASON_MAX_LENGTH: guide "The maximum UTF-8 close-reason length after its two-byte status code (`123`)." source "Names the maximum UTF-8 close-reason length after the two-byte status code."
guides/websocket.md const WEBSOCKET_FAIL_TIMEOUT_MS: guide "The post-`#fail` flush grace in milliseconds before the hard-teardown fallback destroys the socket." source "Names the post-`#fail` flush grace in milliseconds — how long a validation-breach close frame is given to flush through the socket's write buffer before the hard `destroy()` fallback fires (the normal path destroys sooner, on the `end()` flush callback)."
guides/websocket.md type WebSocketReadyState: guide "The four browser-compatible ready-state values (`0` | `1` | `2` | `3`)." source "Represents a WebSocket ready state — the four browser-compatible lifecycle values."
guides/websocket.md interface WebSocketFrame: guide "A parsed frame — `fin` / `opcode` / `payload` / `consumed` / `masked` / `rsv`." source "Represents a parsed RFC 6455 frame — the structured result of decoding one frame off the wire."
guides/websocket.md interface WebSocketEncodeOptions: guide "`encodeWebSocketFrame` masking control — `masked` and an optional explicit `mask`." source "Represents the options for `encodeWebSocketFrame` — how a frame is masked on the wire."
guides/websocket.md type WebSocketErrorCode: guide "The subject a `WebSocketError` names as refused — `OPTION` / `LIMIT` / `CLOSE` / `FRAME`." source "Represents the subject an `import('./errors.js').WebSocketError` names as refused."
guides/websocket.md type NodeWebSocketEventMap: guide "The event map — `open` / `message` / `close` / `error` / `ping` / `pong`." source "Represents the event map of a `NodeWebSocketInterface`."
guides/websocket.md interface NodeWebSocketOptions: guide "Options for `createNodeWebSocket` (`socket` / `key` / `head` / `protocol` / `on` / `error` / `payload` / `timeout` / `signal`)." source "Represents the options for `createNodeWebSocket`."
guides/websocket.md interface NodeWebSocketInterface: guide "The wrapper contract — the `emitter` and `readyState` data members plus `send` / `ping` / `close` / `destroy`." source "Represents a server-native WebSocket over a raw upgraded socket — the behavioral contract."
guides/websocket.md NodeWebSocketInterface.send: guide absent source absent
guides/websocket.md NodeWebSocketInterface.ping: guide absent source absent
guides/websocket.md NodeWebSocketInterface.close: guide absent source absent
guides/websocket.md NodeWebSocketInterface.destroy: guide absent source absent
guides/websocket.md pitch: readme absent tagline "The server-native bidirectional transport: a lean, typed wrapper over a raw upgraded `node:stream` Duplex socket that speaks only the RFC 6455 WebSocket wire protocol — zero npm dependencies (`node:crypto` for the one handshake hash, nothing else). After an HTTP server hands you an upgraded socket, this wrapper turns that raw byte stream into a typed, observable connection: it owns the upgrade handshake, the masked/unmasked frame codec, ping/pong, and the close handshake, and surfaces messages through an owned `emitter`. What it deliberately is not: it has no knowledge of MCP, JSON-RPC, reconnection, heartbeats, or any message schema. Those belong to a message transport built one layer up — this is only the wire. Its codec and boundary guards are pure exported functions, pinned against RFC 6455's worked byte vectors and malformed-input cases; the `NodeWebSocket` class is the thin stateful driver that runs them over a socket. Keeping the codec pure and the wrapper minimal is the same lean-native-wrapper discipline: a small typed surface over native power, the hard parts exported as testable units. Source: `src/server`. Surfaced through the `@src/server` barrel."
rows read: 1, disagreements found: 47
exit 1
```

## Facts for websocket (taken 2026-09-07T15:55Z by facts.sh)

- Checkout `/home/user/fleet/websocket`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `4472093`, status: clean
- `package.json`: version `0.0.12`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 13 | summary 13 | banned 0 | tests/setupServer.ts(9) tests/setup.ts(4) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept   | Spec                           | Source                        | Tests                                     |
    9:| --------- | ------------------------------ | ----------------------------- | ----------------------------------------- |
    10:| WebSocket | [`websocket.md`](websocket.md) | [`src/server`](../src/server) | [`tests/src/server`](../tests/src/server) |
    14:| Directory    | Guide                          |
    15:| ------------ | ------------------------------ |
    16:| `src/server` | [`websocket.md`](websocket.md) |
- Guide `guides/websocket.md`: 264 lines. Headings:
    1:# WebSocket
    7:## Surface
    37:### Factories
    43:### Entities
    49:### Errors
    56:### Codec helpers
    70:### Constants
    97:### Types
    111:## Methods
    115:#### `NodeWebSocketInterface`
    124:## Contract
    137:## Errors
    172:## Patterns
    174:### Accept an upgrade and echo messages (server mode)
    197:### Stream-decode frames across chunk boundaries
    214:### Encode a frame to the wire (server unmasked, client masked)
    223:### Compute the handshake accept token
    231:### Keep a connection alive, and tear it down on demand
    246:### Practices
    253:## Tests
    261:## See also
- Table headers in `guides/websocket.md` (a header row is the row before a `| ---` row):
    39: | API                   | Kind     | Summary                                                                                                                   |
    45: | API             | Kind  | Summary                                                                                                                   |
    51: | API                | Kind     | Summary                                                                                             |
    58: | API                         | Kind     | Summary                                                                                                                                   |
    72: | API                                 | Kind  | Summary                                                                                                      |
    99: | API                      | Kind      | Summary                                                                                                                         |
    117: | Method    | Returns | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
    141: | Code     | Raised when                                                                                                                                                                           |
- Rows of any `### Entities` table (the Kind cell):
    47:  `NodeWebSocket` | class
- H1 blockquote (`guides/websocket.md`):
    3: > The server-native bidirectional transport: a lean, typed wrapper over a raw upgraded [`node:stream`](https://nodejs.org/api/stream.html) Duplex socket that speaks **only** the [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455) WebSocket wire protocol — zero npm dependencies (`node:crypto` for the one handshake hash, nothing else). After an HTTP server hands you an upgraded socket, this wrapper turns that raw byte stream into a typed, observable connection: it owns the upgrade handshake, the masked/unmasked frame codec, ping/pong, and the close handshake, and surfaces messages through an owned `emitter`.
    4: >
    5: > What it deliberately is **not**: it has no knowledge of MCP, JSON-RPC, reconnection, heartbeats, or any message schema. Those belong to a _message_ transport built one layer up — this is only the wire. Its codec and boundary guards are pure exported functions, pinned against RFC 6455's worked byte vectors and malformed-input cases; the [`NodeWebSocket`](#nodewebsocketinterface) class is the thin stateful driver that runs them over a socket. Keeping the codec pure and the wrapper minimal is the same lean-native-wrapper discipline: a small typed surface over native power, the hard parts exported as testable units. Source: [`src/server`](../src/server). Surfaced through the `@src/server` barrel.
- Opening prose after the blockquote (first two lines):
    7: ## Surface
    9: ```ts
- README (`README.md`) first lines:
    # @orkestrel/websocket
    
    A dependency-light RFC 6455 WebSocket for Node — native handshake and framing
    over duplex streams, with a typed emitter surface. Part of the `@orkestrel`
    line. Its sole runtime dependency is `@orkestrel/emitter`, used for the typed
    `emitter` every connection exposes.
    
    ## Install
    
    ```sh
    npm install @orkestrel/websocket
    ```
- `## Patterns` fences, each with its nearest preceding heading:
    9: fence under "## Surface"
    152: fence under "## Errors"
    178: fence under "### Accept an upgrade and echo messages (server mode)"
    199: fence under "### Stream-decode frames across chunk boundaries"
    216: fence under "### Encode a frame to the wire (server unmasked, client masked)"
    225: fence under "### Compute the handshake accept token"
    233: fence under "### Keep a connection alive, and tear it down on demand"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/server/NodeWebSocket.ts:78:export class NodeWebSocket implements NodeWebSocketInterface {
    src/server/factories.ts:41:export function createNodeWebSocket(options: NodeWebSocketOptions): NodeWebSocketInterface {
    src/server/errors.ts:36:export class WebSocketError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/NodeWebSocket.ts:1
    src/server/factories.ts:1
    src/server/helpers.ts:5
    src/server/parsers.ts:2
    src/server/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    21:} from '@orkestrel/guide'
    52:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    58:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    103:		for (const group of guide.methods()) {
    104:			const members = source.methods(group.interface).map((method) => method.name)
    112:					expect(findMissing(members, documented)).toEqual([])
    115:					expect(findMissing(documented, members)).toEqual([])
    121:							: findMissing(
    122:									source.methods(entity).map((method) => method.name),
    140:				findUnexampled(
    143:					source.examples().map((example) => example.name),
    148:		for (const group of guide.methods()) {
    159:							? source.examples(group.interface).map((example) => example.name)
    163:									.concat(source.examples(entity).map((example) => example.name))
    164:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    176:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 253:## Tests — 1 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/websocket.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/websocket.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-websocket-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
