from pathlib import Path
import re

p = Path('guides/websocket.md')
lines = p.read_text(encoding='utf8').split('\n')

CONSTANT_SHAPES = {
    'WEBSOCKET_GUID': '`string`',
    'WEBSOCKET_VERSION': '`string`',
    'WEBSOCKET_OPCODE_TEXT': '`number`',
    'WEBSOCKET_OPCODE_BINARY': '`number`',
    'WEBSOCKET_OPCODE_CONTINUATION': '`number`',
    'WEBSOCKET_OPCODE_CLOSE': '`number`',
    'WEBSOCKET_OPCODE_PING': '`number`',
    'WEBSOCKET_OPCODE_PONG': '`number`',
    'WEBSOCKET_READY_CONNECTING': '`WebSocketReadyState`',
    'WEBSOCKET_READY_OPEN': '`WebSocketReadyState`',
    'WEBSOCKET_READY_CLOSING': '`WebSocketReadyState`',
    'WEBSOCKET_READY_CLOSED': '`WebSocketReadyState`',
    'WEBSOCKET_CLOSE_NORMAL': '`number`',
    'WEBSOCKET_CLOSE_PROTOCOL': '`number`',
    'WEBSOCKET_CLOSE_UNSUPPORTED': '`number`',
    'WEBSOCKET_CLOSE_INVALID': '`number`',
    'WEBSOCKET_CLOSE_TOO_BIG': '`number`',
    'WEBSOCKET_MAX_PAYLOAD': '`number`',
    'WEBSOCKET_CLOSE_TIMEOUT_MS': '`number`',
    'WEBSOCKET_CONTROL_MAX_LENGTH': '`number`',
    'WEBSOCKET_CLOSE_REASON_MAX_LENGTH': '`number`',
    'WEBSOCKET_FAIL_TIMEOUT_MS': '`number`',
}

TYPE_SHAPES = {
    'WebSocketReadyState': r'`0 \| 1 \| 2 \| 3`',
    'WebSocketFrame': '`{ fin, opcode, payload, consumed, masked, rsv }`',
    'WebSocketEncodeOptions': '`{ masked?, mask? }`',
    'WebSocketErrorCode': r"`'OPTION' \| 'LIMIT' \| 'CLOSE' \| 'FRAME'`",
    'NodeWebSocketEventMap': '`{ open, message, close, error, ping, pong }`',
    'NodeWebSocketOptions': '`{ socket, key?, head?, protocol?, on?, error?, payload?, timeout?, signal? }`',
    'NodeWebSocketInterface': '`{ emitter, readyState } plus send, ping, close, destroy`',
}

CONSTANTS_SENTENCE = 'A `Shape` cell holds the constant\'s declared type.'
TYPES_SENTENCE = (
    "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an "
    "optional member and `plus` introducing its call-signature members, and a type alias's own "
    "type literal with a union's arms escaped as `\\|`."
)


def split_row(line):
    assert line.startswith('|') and line.endswith('|'), line
    return [cell.strip() for cell in line[1:-1].split('|')]


def render(rows):
    widths = [max(len(row[index]) for row in rows) for index in range(len(rows[0]))]
    out = []
    for position, row in enumerate(rows):
        cells = [row[index].ljust(widths[index]) for index in range(len(row))]
        out.append('| ' + ' | '.join(cells) + ' |')
        if position == 0:
            out.append('| ' + ' | '.join('-' * widths[index] for index in range(len(row))) + ' |')
    return out


def rebuild(heading, shapes, sentence):
    start = lines.index(heading)
    first = next(index for index in range(start, len(lines)) if lines[index].startswith('|'))
    last = first
    while last + 1 < len(lines) and lines[last + 1].startswith('|'):
        last += 1
    table = [split_row(line) for line in lines[first:last + 1]]
    header, body = table[0], table[2:]
    assert header[-1] == 'Summary', header
    rows = [header[:2] + ['Shape'] + header[2:]]
    for row in body:
        name = row[0].strip('`')
        assert name in shapes, name
        rows.append(row[:2] + [shapes[name]] + row[2:])
    lines[first:last + 1] = render(rows)
    lines.insert(first, '')
    lines.insert(first, sentence)


rebuild('### Types', TYPE_SHAPES, TYPES_SENTENCE)
rebuild('### Constants', CONSTANT_SHAPES, CONSTANTS_SENTENCE)

p.write_text('\n'.join(lines), encoding='utf8')
print('shape ok')
