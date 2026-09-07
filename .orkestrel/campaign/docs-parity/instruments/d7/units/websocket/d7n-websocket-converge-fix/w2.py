from pathlib import Path

path = Path('src/server/constants.ts')
text = path.read_text(encoding='utf8')

blocks = [
(
"""/**
 * Names the RFC 6455 GUID concatenated to a client's `Sec-WebSocket-Key` before the
 * accept hash.
 *
 * @remarks
 * The base64-encoded SHA-1 of that concatenation is the `Sec-WebSocket-Accept` response
 * value. A fixed, spec-mandated constant (RFC 6455 §4.2.2) — read only by
 * {@link computeWebSocketAccept}.
 */""",
"""/**
 * Names the accept GUID concatenated to a client's `Sec-WebSocket-Key` before the accept
 * hash, '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'.
 *
 * @remarks
 * The base64-encoded SHA-1 of that concatenation is the `Sec-WebSocket-Accept` response
 * value. A fixed, spec-mandated constant (RFC 6455 §4.2.2) — read only by
 * {@link computeWebSocketAccept}.
 */""",
),
(
"""/** Names the WebSocket protocol version this wrapper speaks (`Sec-WebSocket-Version: 13`). */""",
"""/**
 * Names the supported protocol version, '13'.
 *
 * @remarks
 * The value this wrapper speaks, carried by the `Sec-WebSocket-Version` handshake header.
 */""",
),
(
"""/** Names the text frame opcode — a UTF-8 payload (RFC 6455 §5.6). */""",
"""/**
 * Names the text frame opcode, 0x01.
 *
 * @remarks
 * A UTF-8 payload (RFC 6455 §5.6).
 */""",
),
(
"""/** Names the binary frame opcode — a raw byte payload (RFC 6455 §5.6). */""",
"""/**
 * Names the binary frame opcode, 0x02.
 *
 * @remarks
 * A raw byte payload (RFC 6455 §5.6).
 */""",
),
(
"""/** Names the continuation frame opcode — the next fragment of an open data message (RFC 6455 §5.4). */""",
"""/**
 * Names the continuation frame opcode, 0x00.
 *
 * @remarks
 * The next fragment of an open data message (RFC 6455 §5.4).
 */""",
),
(
"""/** Names the close frame opcode — a control frame ending the connection (RFC 6455 §5.5.1). */""",
"""/**
 * Names the close frame opcode, 0x08.
 *
 * @remarks
 * A control frame ending the connection (RFC 6455 §5.5.1).
 */""",
),
(
"""/** Names the ping frame opcode — a control frame the peer must answer with a pong (RFC 6455 §5.5.2). */""",
"""/**
 * Names the ping frame opcode, 0x09.
 *
 * @remarks
 * A control frame the peer must answer with a pong (RFC 6455 §5.5.2).
 */""",
),
(
"""/** Names the pong frame opcode — a control frame answering a ping (RFC 6455 §5.5.3). */""",
"""/**
 * Names the pong frame opcode, 0x0a.
 *
 * @remarks
 * A control frame answering a ping (RFC 6455 §5.5.3).
 */""",
),
(
"""/** Names the ready state for a connecting WebSocket (before the handshake completes). */""",
"""/**
 * Names the connecting ready state, 0.
 *
 * @remarks
 * The state a WebSocket holds before its handshake completes.
 */""",
),
(
"""/** Names the ready state for an open WebSocket (the handshake completed; frames flow). */""",
"""/**
 * Names the open ready state, 1.
 *
 * @remarks
 * The state a WebSocket holds after the handshake completes and while frames flow.
 */""",
),
(
"""/** Names the ready state for a closing WebSocket (a close frame was sent or received). */""",
"""/**
 * Names the closing ready state, 2.
 *
 * @remarks
 * The state a WebSocket holds after a close frame is sent or received.
 */""",
),
(
"""/** Names the ready state for a closed WebSocket (the socket ended). */""",
"""/**
 * Names the closed ready state, 3.
 *
 * @remarks
 * The state a WebSocket holds after the socket ends.
 */""",
),
(
"""/** Names the normal-closure status code (RFC 6455 §7.4.1) — the default `close` code. */""",
"""/**
 * Names the normal-closure status code, 1000.
 *
 * @remarks
 * The default `close` code (RFC 6455 §7.4.1).
 */""",
),
(
"""/** Names the protocol-error status code (RFC 6455 §7.4.1) — a framing/state rule was violated. */""",
"""/**
 * Names the protocol-error status code, 1002.
 *
 * @remarks
 * Sent when a framing or state rule was violated (RFC 6455 §7.4.1).
 */""",
),
(
"""/**
 * Names the unsupported-data status code (RFC 6455 §7.4.1) — the endpoint received a data
 * type it cannot accept.
 *
 * @remarks
 * For example binary on a text-only endpoint.
 */""",
"""/**
 * Names the unsupported-data status code, 1003.
 *
 * @remarks
 * Sent when the endpoint received a data type it cannot accept (RFC 6455 §7.4.1), for
 * example binary on a text-only endpoint.
 */""",
),
(
"""/** Names the invalid-frame-payload-data status code (RFC 6455 §7.4.1) — for example non-UTF-8 text or an unparseable close reason. */""",
"""/**
 * Names the invalid-frame-payload-data status code, 1007.
 *
 * @remarks
 * Sent for non-UTF-8 text or an unparseable close reason (RFC 6455 §7.4.1).
 */""",
),
(
"""/** Names the message-too-big status code (RFC 6455 §7.4.1) — a reassembled message exceeded the payload cap. */""",
"""/**
 * Names the message-too-big status code, 1009.
 *
 * @remarks
 * Sent when a reassembled message exceeded the payload cap (RFC 6455 §7.4.1).
 */""",
),
(
"""/**
 * Names the default cap on both an inbound frame's declared length and a reassembled
 * message's total byte count (100 MiB).
 *
 * @remarks
 * The same value the `ws` package defaults to. Either breach closes
 * {@link WEBSOCKET_CLOSE_TOO_BIG}.
 */""",
"""/**
 * Names the default cap on both an inbound frame's declared length and a reassembled
 * message's total byte count, 104_857_600 bytes (100 MiB).
 *
 * @remarks
 * The same value the `ws` package defaults to. Either breach closes
 * {@link WEBSOCKET_CLOSE_TOO_BIG}.
 */""",
),
(
"""/**
 * Names the default close-handshake timeout in milliseconds — how long `close` waits for
 * the peer's echo.
 *
 * @remarks
 * After it expires the wrapper tears the socket down, so a silent peer cannot leak the
 * handle open.
 */""",
"""/**
 * Names the default close-handshake timeout, 30_000 milliseconds — how long `close` waits
 * for the peer's echo.
 *
 * @remarks
 * After it expires the wrapper tears the socket down, so a silent peer cannot leak the
 * handle open.
 */""",
),
(
"""/**
 * Names the flush grace in milliseconds a validation-breach close frame is given before
 * the hard teardown fallback destroys the socket.
 *
 * @remarks
 * Armed after `#fail` writes the close frame, so the frame drains through the socket's
 * write buffer rather than being discarded. The normal path destroys sooner, on the
 * `end()` flush callback.
 */""",
"""/**
 * Names the flush grace, 1_000 milliseconds, a validation-breach close frame is given
 * before the hard teardown fallback destroys the socket.
 *
 * @remarks
 * Armed after `#fail` writes the close frame, so the frame drains through the socket's
 * write buffer rather than being discarded. The normal path destroys sooner, on the
 * `end()` flush callback.
 */""",
),
(
"""/** Names the maximum control-frame payload length in bytes (RFC 6455 §5.5). */""",
"""/**
 * Names the maximum control-frame payload length, 125 bytes.
 *
 * @remarks
 * The cap RFC 6455 §5.5 sets on every control frame's payload.
 */""",
),
(
"""/** Names the maximum UTF-8 close-reason length after the two-byte status code. */""",
"""/**
 * Names the maximum UTF-8 close-reason length after the two-byte status code, 123.
 *
 * @remarks
 * What is left of {@link WEBSOCKET_CONTROL_MAX_LENGTH} after the close frame's status
 * code.
 */""",
),
]

for old, new in blocks:
    assert old in text, old[:60]
    assert text.count(old) == 1, old[:60]
    text = text.replace(old, new, 1)

path.write_text(text, encoding='utf8')
print('w2 ok')
