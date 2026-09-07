from pathlib import Path

def edit(path, pairs):
    p = Path(path)
    text = p.read_text(encoding='utf8')
    for old, new in pairs:
        assert old in text, (path, old[:70])
        assert text.count(old) == 1, (path, 'not unique', old[:70])
        text = text.replace(old, new, 1)
    p.write_text(text, encoding='utf8')

# --- W3 + W7: src/server/types.ts
edit('src/server/types.ts', [
# header comment all-caps
("""// `node:stream` Duplex socket that speaks ONLY the RFC 6455 wire protocol. It""",
 """// `node:stream` Duplex socket that speaks only the RFC 6455 wire protocol. It"""),
("""// wrapper has NO knowledge of MCP, JSON-RPC, or any message schema (that is the""",
 """// wrapper has no knowledge of MCP, JSON-RPC, or any message schema (that is the"""),
# WebSocketReadyState description: the arms move to the Shape cell
(""" * Represents a WebSocket ready state — the browser-compatible `0` connecting, `1` open,
 * `2` closing, and `3` closed.
 *
 * @remarks
 * The same numbering the DOM `WebSocket.readyState` uses, so the wrapper reads like the
 * platform API. The named `WEBSOCKET_READY_*` constants spell each value.""",
 """ * Represents a WebSocket ready state — the stage a connection has reached between the
 * handshake and the socket's end.
 *
 * @remarks
 * The same numbering the DOM `WebSocket.readyState` uses, so the wrapper reads like the
 * platform API. The named `WEBSOCKET_READY_*` constants spell each value."""),
# WebSocketFrame remarks all-caps
(""" * (client→server frames MUST be masked, RFC 6455 §5.1); `rsv` is the three reserved""",
 """ * (client→server frames must be masked, RFC 6455 §5.1); `rsv` is the three reserved"""),
# WebSocketEncodeOptions remarks all-caps
(""" * `masked` toggles the mask bit (server→client frames are NOT masked, the default;
 * client→server frames MUST be, RFC 6455 §5.3). `mask` supplies an explicit 4-byte""",
 """ * `masked` toggles the mask bit (server→client frames are not masked, the default;
 * client→server frames must be, RFC 6455 §5.3). `mask` supplies an explicit 4-byte"""),
# WebSocketErrorCode description: the arms move to the Shape cell
(""" * Represents the subject a `WebSocketError` names as refused — `OPTION`, `LIMIT`,
 * `CLOSE`, or `FRAME`.""",
 """ * Represents the subject a `WebSocketError` names as refused."""),
# NodeWebSocketEventMap description: the members move to the Shape cell
(""" * Represents the event map a {@link NodeWebSocketInterface} emitter carries — `open`,
 * `message`, `close`, `error`, `ping`, and `pong`.""",
 """ * Represents the event map a {@link NodeWebSocketInterface} emitter carries."""),
(""" * the underlying socket faulted (a DOMAIN event and then terminates the wrapper).""",
 """ * the underlying socket faulted (a domain event, and then terminates the wrapper)."""),
# NodeWebSocketOptions remarks all-caps
(""" * upgrade). `key` is the client's `Sec-WebSocket-Key`: present it to run in SERVER
 * mode — the wrapper writes the `101 Switching Protocols` handshake and sends UNMASKED
 * frames; omit it for CLIENT mode — no handshake is written and frames are MASKED (RFC""",
 """ * upgrade). `key` is the client's `Sec-WebSocket-Key`: present it to run in server
 * mode — the wrapper writes the `101 Switching Protocols` handshake and sends unmasked
 * frames; omit it for client mode — no handshake is written and frames are masked (RFC"""),
(""" * both a single inbound frame's declared length AND the total bytes of a reassembled""",
 """ * both a single inbound frame's declared length and the total bytes of a reassembled"""),
# NodeWebSocketInterface description: the members move to the Shape cell
(""" * Represents the behavioral contract a server-native WebSocket exposes over a raw
 * upgraded socket — the `emitter` and `readyState` data members plus `send`, `ping`,
 * `close`, and `destroy`.""",
 """ * Represents the behavioral contract a server-native WebSocket exposes over a raw
 * upgraded socket."""),
])

# --- W7: src/server/NodeWebSocket.ts
edit('src/server/NodeWebSocket.ts', [
(""" * Created by `createNodeWebSocket`. When given a client `key` it runs in SERVER mode —
 * it writes the `101 Switching Protocols` handshake (`computeWebSocketAccept(key)`) and
 * emits `open`; given no key it runs in CLIENT mode (no handshake, frames masked). It""",
 """ * Created by `createNodeWebSocket`. When given a client `key` it runs in server mode —
 * it writes the `101 Switching Protocols` handshake (`computeWebSocketAccept(key)`) and
 * emits `open`; given no key it runs in client mode (no handshake, frames masked). It"""),
(""" * re-parsing the remainder): a TEXT frame — reassembling continuation fragments across
 * `fin: false` frames — decodes to UTF-8 and emits `message`; a PING is auto-answered
 * with a PONG and emits `ping`; a PONG emits `pong`; a CLOSE is echoed and ends the""",
 """ * re-parsing the remainder): a text frame — reassembling continuation fragments across
 * `fin: false` frames — decodes to UTF-8 and emits `message`; a ping is auto-answered
 * with a pong and emits `ping`; a pong emits `pong`; a close frame is echoed and ends the"""),
("""	 * `key` selects the mode: present runs SERVER mode and writes the `101 Switching
	 * Protocols` handshake, omitted runs CLIENT mode and masks every outgoing frame.""",
 """	 * `key` selects the mode: present runs server mode and writes the `101 Switching
	 * Protocols` handshake, omitted runs client mode and masks every outgoing frame."""),
("""		// CLOSE frame or an RFC violation routes through `#fail`/`#close` -> `#finish`),
		// which flushes the close frame GRACEFULLY through `#socket.end()`. In that case skip""",
 """		// close frame or an RFC violation routes through `#fail`/`#close` -> `#finish`),
		// which flushes the close frame gracefully through `#socket.end()`. In that case skip"""),
("""		// `#finish` no-ops after the state is already CLOSED (for example after `#fail` armed""",
 """		// `#finish` no-ops after the state is already closed (for example after `#fail` armed"""),
("""	// Handle a validated CLOSE frame: decode it (which itself may `#fail` on an invalid
	// code/reason), then — if still OPEN — echo the peer's payload verbatim and end.""",
 """	// Handle a validated close frame: decode it (which itself may `#fail` on an invalid
	// code/reason), then — if the socket is still open — echo the peer's payload verbatim
	// and end."""),
("""	// emitting AFTER the terminal `close` event), write the close frame, then flush + half""",
 """	// emitting after the terminal `close` event), write the close frame, then flush + half"""),
("""	// finishing. The hard-teardown fallback is armed AFTER `#finish` so `#finish`'s""",
 """	// finishing. The hard-teardown fallback is armed after `#finish` so `#finish`'s"""),
("""	// Transition to CLOSED one time only (idempotent), clear the close-handshake timer, and emit""",
 """	// Transition to the closed state one time only (idempotent), clear the close-handshake timer, and emit"""),
("""	// preflights canonical encoding and the declared payload cap on EACH iteration, so""",
 """	// preflights canonical encoding and the declared payload cap on each iteration, so"""),
])

# --- W7: src/server/errors.ts and helpers.ts and parsers.ts
edit('src/server/errors.ts', [
("""// and a FRAME out of the pure encoder, which touches no socket. A PEER's protocol""",
 """// and a FRAME out of the pure encoder, which touches no socket. A peer's protocol"""),
])
edit('src/server/helpers.ts', [
(""" * client frames are unmasked (the default); pass `masked: true` to encode a CLIENT""",
 """ * client frames are unmasked (the default); pass `masked: true` to encode a client"""),
])
edit('src/server/parsers.ts', [
(""" * against the key when the mask bit is set (client→server frames MUST be masked, RFC""",
 """ * against the key when the mask bit is set (client→server frames must be masked, RFC"""),
])

# --- the constants header comment's count
edit('src/server/constants.ts', [
("""// supported protocol version, the frame opcodes, the four ready states, and the""",
 """// supported protocol version, the frame opcodes, the ready states, and the"""),
])
print('w3w7 ok')
