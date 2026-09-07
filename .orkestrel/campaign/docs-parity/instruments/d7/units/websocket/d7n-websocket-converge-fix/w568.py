from pathlib import Path

p = Path('guides/websocket.md')
text = p.read_text(encoding='utf8')

def sub(old, new):
    global text
    assert old in text, old[:80]
    assert text.count(old) == 1, ('not unique', old[:80])
    text = text.replace(old, new, 1)

# W6: the dependency sentence
sub(
"""into a typed, observable connection, and it reaches for no third-party package to do it: [`node:crypto`](https://nodejs.org/api/crypto.html) supplies the one handshake hash and `@orkestrel/emitter` the typed emitter.""",
"""into a typed, observable connection, and its only runtime dependency is `@orkestrel/emitter`, which supplies the typed emitter; [`node:crypto`](https://nodejs.org/api/crypto.html) supplies the one handshake hash.""",
)

# W5: the count
sub(
"""Two error channels stay distinct: an underlying socket fault""",
"""The error channels stay distinct: an underlying socket fault""",
)

# W8 (Ruling 14): the titled fence carries the construction hook the block demonstrated,
# and the later observer keeps the fence's own demonstration without doubling the echo.
sub(
"""	const ws = createNodeWebSocket({
		socket,
		key,
		head, // any bytes already buffered after the upgrade headers
	})
	ws.emitter.on('message', (text) => ws.send(`echo: ${text}`))
	ws.emitter.on('close', (code, reason) => log('closed', code, reason))
})""",
"""	const ws = createNodeWebSocket({
		socket,
		key,
		head, // any bytes already buffered after the upgrade headers
		on: { message: (text) => ws.send(`echo: ${text}`) }, // wired before the first frame arrives
	})
	ws.emitter.on('message', (text) => log('echoed', text)) // a second observer of the same event
	ws.emitter.on('close', (code, reason) => log('closed', code, reason))
})""",
)

p.write_text(text, encoding='utf8')
print('w568 ok')
