# Report — `d7n-websocket-prep`

Wall clock: 2026-09-07T15:49:19Z to 2026-09-07T15:52:52Z.

## Item 1 — `repair --offline`

Command: `node <scaffold-tip>/dist/bin/main.js repair --offline`

Summary line: `9 written, 30 unchanged, 0 removed in ..`

`git status --short` after:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Hunk:

```diff
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -101,21 +101,27 @@ for (const entry of manifest) {
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
@@ -130,11 +136,18 @@ for (const entry of manifest) {
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
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
@@ -143,9 +156,12 @@ for (const entry of manifest) {
 						.map((fence) => fence.code)
 					const examples =
 						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+							? source.examples(group.interface).map((example) => example.name)
+							: source
+									.examples(group.interface)
+									.map((example) => example.name)
+									.concat(source.examples(entity).map((example) => example.name))
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

No other change to the suite.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1, before fixes, named the following diagnostics, all in `tests/setup.ts` and `tests/setupServer.ts` (both in scope: under `tests/**`).

`tests/setup.ts` (`policy/no-malformed-summary`, four sites):

- line 13, before `Build a deterministic, BMP-safe, guaranteed-valid-UTF-8 string of \`length\` code points, sampling each from \`rng\` while avoiding the surrogate range.` after `Builds a deterministic, BMP-safe, guaranteed-valid-UTF-8 string of \`length\` code points, sampling each from \`rng\` while avoiding the surrogate range.`
- line 52, before `Open a \`WebSocket\` to \`url\` and resolve after it reaches the \`open\` state.` after `Opens a \`WebSocket\` to \`url\` and resolves after it reaches the \`open\` state.`
- line 68, before `Resolve with the next \`message\` event received on \`ws\`.` after `Resolves with the next \`message\` event received on \`ws\`.`
- line 88, before `Resolve with the next \`close\` event received on \`ws\`.` after `Resolves with the next \`close\` event received on \`ws\`.`

`tests/setupServer.ts` (`policy/no-malformed-summary`, nine diagnostics across eight sites):

- line 50, before `Create a real, cross-wired in-memory Duplex pair without harness error sinks.` after `Creates a real, cross-wired in-memory Duplex pair without harness error sinks.`
- line 57, before `Wait for frame writes to propagate across a {@link duplexPair}.` after `Waits for frame writes to propagate across a {@link duplexPair}.`
- line 69, before `The live echo fixture: the URL clients dial, the sockets it holds, and its teardown.` after `Represents the live echo fixture: the URL clients dial, the sockets it holds, and its teardown.`
- line 76, before `Build deterministic pseudo-random bytes from a seeded generator.` after `Builds deterministic pseudo-random bytes from a seeded generator.`
- line 83, before `Build the frame-payload corpus that spans every RFC 6455 length form: …` after `Builds the frame-payload corpus that spans every RFC 6455 length form: …`
- line 102 (two diagnostics: open-with-verb, and the exported symbol's own name `frame` appearing in the first sentence), before `Encode one test frame, optionally clearing FIN for fragmentation cases.` after `Encodes one wire message for tests, optionally clearing FIN for fragmentation cases.`
- line 115, before `Collect frames written to a pair's client endpoint after stripping the HTTP upgrade response. The returned array grows as complete frames arrive.` after `Collects frames written to a pair's client endpoint after stripping the HTTP upgrade response. The returned array grows as complete frames arrive.`
- line 169, before `Start a real loopback \`node:http\` server that upgrades every WebSocket request to a server-mode \`createNodeWebSocket\` and echoes each text frame back as \`echo: <text>\`.` after `Starts a real loopback \`node:http\` server that upgrades every WebSocket request to a server-mode \`createNodeWebSocket\` and echoes each text frame back as \`echo: <text>\`.`

No `policy/no-banned-term` diagnostic was printed. `npx oxlint --config .oxlintrc.json --deny-warnings .` after the fixes exits 0 with no output.

`npm run test:policy` after the fixes: `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, exit 0 — its `prose` rule named no line in `guides/**` or `README.md`, so no substitution-table row applied there.

No code token moved, nothing renamed, and no assertion value changed.

## Item 4 — the bump

`package.json` `"version": "0.0.11"` → `"version": "0.0.12"`. `package-lock.json` untouched.

## Acceptance criteria

1. `git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tsconfig.json
?? scripts/docs.ts
```

Equals the P21 repair list plus `tests/guides.test.ts` (item 2) and `tests/setup.ts` + `tests/setupServer.ts` (item 3, diagnostics listed preceding). `package.json` is already in the repair list (the `docs` script row) and also carries the version bump.

2. `npm run format:check` → `All matched files use the correct format.` exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings .` → no output, exit 0.
   `npm run check` → `tsc --noEmit --project tsconfig.json && npm run check:src` → `check:src:server` → `tsc --noEmit -p configs/src/tsconfig.server.json`, no diagnostics, exit 0.

3. `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 22 passed (22)`, exit 0.
   `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, exit 0.
   `npm run test:config` → `Test Files 1 passed (1)`, `Tests 172 passed | 1 skipped (173)`, exit 0.

4. `npm run docs` reads `rows read: 1, disagreements found: 47` and exits 1 (expected — the converge unit's worklist). Full output:

```
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
```

No deviation occurred: `repair` wrote only the P21 paths, every voice diagnostic named a `tests/**` file already in scope, `test:policy` reported no red file outside scope, and every gate other than `docs` reads green.
