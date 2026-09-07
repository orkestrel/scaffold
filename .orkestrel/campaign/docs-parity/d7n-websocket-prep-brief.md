# Brief — P.1 `d7n-websocket-prep` (websocket's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/websocket` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `2c75bbd`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

websocket's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== websocket 2026-09-07T15:33:25Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
78:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 934ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### websocket (2c75bbd, version 0.0.11, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 30 unchanged, 0 removed in ..
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
   tests/setupServer.ts(9)
   tests/setup.ts(4)
-- docs
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
-- check
   tests/guides.test.ts(111,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(114,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(118,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(133,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(148,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  5 failed | 17 passed (22)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 13 | summary 13 | banned 0 | tests/setupServer.ts(9) tests/setup.ts(4) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for websocket (taken 2026-09-07T15:38Z by facts.sh)

- Checkout `/home/user/fleet/websocket`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `2c75bbd`, status: clean
- `package.json`: version `0.0.11`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    104:			const members = source.methods(group.interface)
    111:					expect(findMissing(members, group.methods)).toEqual([])
    114:					expect(findMissing(group.methods, members)).toEqual([])
    118:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    133:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    136:		for (const group of guide.methods()) {
    146:							? source.examples(group.interface)
    147:							: source.examples(group.interface).concat(source.examples(entity))
    148:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    160:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 253:## Tests — 1 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.11"` → `"version": "0.0.12"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-websocket-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
