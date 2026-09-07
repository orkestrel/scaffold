from pathlib import Path

def edit(path, pairs):
    p = Path(path)
    text = p.read_text(encoding='utf8')
    for old, new in pairs:
        assert old in text, (path, old[:70])
        assert text.count(old) == 1, (path, 'not unique', old[:70])
        text = text.replace(old, new, 1)
    p.write_text(text, encoding='utf8')

# The literals read as grouped numerals, so a guide cell carries no Markdown escape.
edit('src/server/constants.ts', [
(""" * message's total byte count, 104_857_600 bytes (100 MiB).""",
 """ * message's total byte count, 104,857,600 bytes (100 MiB)."""),
(""" * Names the default close-handshake timeout, 30_000 milliseconds — how long `close` waits""",
 """ * Names the default close-handshake timeout, 30,000 milliseconds — how long `close` waits"""),
(""" * Names the flush grace, 1_000 milliseconds, a validation-breach close frame is given""",
 """ * Names the flush grace, 1,000 milliseconds, a validation-breach close frame is given"""),
])

# W4 (the description half): the helper encodes one frame, not a reassembled message.
edit('tests/setupServer.ts', [
("""/** Encodes one wire message for tests, optionally clearing FIN for fragmentation cases. */""",
 """/** Encodes one RFC 6455 frame for tests, optionally clearing FIN for fragmentation cases. */"""),
])

# W8: the executed case follows the fence it transcribes.
edit('tests/guides.test.ts', [
("""import { readInventory } from '@orkestrel/test/server'""",
 """import { readInventory } from '@orkestrel/test/server'"""),
("""	it('the Patterns fence echoes through an `emitter` listener attached after construction', async () => {
		const [server, client] = duplexPair()
		const collector = readClientFrames(client)

		const ws = createNodeWebSocket({ socket: server, key: FENCE_KEY })
		ws.emitter.on('message', (text) => ws.send(`echo: ${text}`))
		await flushSocket()

		client.write(encodeWebSocketFrame(WEBSOCKET_OPCODE_TEXT, 'pattern', { masked: true }))
		await flushSocket()

		expect(collector.frames.map((frame) => frame.payload.toString('utf-8'))).toEqual([
			'echo: pattern',
		])
		ws.destroy()
	})""",
 """	it('the Patterns fence echoes from its construction hook and hands the same message to a second observer', async () => {
		const [server, client] = duplexPair()
		const collector = readClientFrames(client)
		const observed = createRecorder<readonly [message: string]>()

		const ws = createNodeWebSocket({
			socket: server,
			key: FENCE_KEY,
			on: { message: (text) => ws.send(`echo: ${text}`) }, // wired before the first frame arrives
		})
		ws.emitter.on('message', observed.handler) // a second observer of the same event
		await flushSocket()

		client.write(encodeWebSocketFrame(WEBSOCKET_OPCODE_TEXT, 'pattern', { masked: true }))
		await flushSocket()

		// One echo, not two: the fence's later listener observes the message and the
		// construction hook is what answers it.
		expect(collector.frames.map((frame) => frame.payload.toString('utf-8'))).toEqual([
			'echo: pattern',
		])
		expect(observed.calls).toEqual([['pattern']])
		ws.destroy()
	})"""),
("""import { requireValue } from '@orkestrel/test'""",
 """import { createRecorder, requireValue } from '@orkestrel/test'"""),
])
print('w8 ok')
