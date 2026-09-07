# Report — `d7n-websocket-converge-fix`

`implementer` on Claude Opus 5, in `/home/user/fleet/websocket` from `f28272b`. 2026-09-07, 20:46 to 21:02 UTC (16 minutes). W1, W2, W3, W5, W6, W7, W8, W9 landed. **W4 is blocked** and did not land: the rename reaches `tests/setupServer.test.ts`, which the brief lists off-limits, and the description half cannot land without the rename. Evidence and the ready patch are under § W4.

## Touched files

| File | Change |
| --- | --- |
| `guides/websocket.md` | Shape column and convention sentence on `### Constants` and `### Types`; the dependency sentence; the count; the Patterns fence's construction hook; every regenerated `Summary` cell |
| `src/server/constants.ts` | Each description paragraph names its literal, with the reference material moved to `@remarks` |
| `src/server/types.ts` | Four descriptions stop listing members; all-caps emphasis to plain wording |
| `src/server/NodeWebSocket.ts` | All-caps emphasis to plain wording |
| `src/server/factories.ts` | The titled `@example` regenerated from the extended fence |
| `src/server/errors.ts`, `src/server/helpers.ts`, `src/server/parsers.ts` | All-caps emphasis to plain wording |
| `tests/guides.test.ts` | The drop-in's hoist, header line, and `INTERNAL` sentence; the Patterns-fence transcription |

```text
 guides/websocket.md         |  77 +++++++++++++-----------
 src/server/NodeWebSocket.ts |  33 +++++-----
 src/server/constants.ts     | 142 +++++++++++++++++++++++++++++++++++---------
 src/server/errors.ts        |   2 +-
 src/server/factories.ts     |   3 +-
 src/server/helpers.ts       |   2 +-
 src/server/parsers.ts       |   2 +-
 src/server/types.ts         |  33 +++++-----
 tests/guides.test.ts        |  43 ++++++++------
 9 files changed, 216 insertions(+), 121 deletions(-)
```

## W1 — the drop-in

The mapped `examples` binding moved to the examples loop's scope beside `documented`:

```diff
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
 			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface).map((example) => example.name)
-							: source
-									.examples(group.interface)
-									.map((example) => example.name)
-									.concat(source.examples(entity).map((example) => example.name))
 					expect(findUnexampled(documented, fences, examples)).toEqual([])
```

The `INTERNAL` sentence now reads the pilot's: "and the assertion that follows it fails when a name here stops being stranded, so the list cannot rot." Line 2 already read "The constants that follow are this package's own" and is unchanged.

Ancillary decision, recorded: the header's fourth and fifth lines ("The flagship-fence transcriptions at the end of the file assert the values each fence's comments claim: change a fence, change the transcription beside it.") are gone, because Ruling 13 makes the drop-in the pilot's text byte for byte outside the constants and the pilot's header carries three lines. The directive was not dropped — "Change a fence, change the transcription beside it." now closes this package's own flagship-fence comment, where the pilot also carries it.

Diff against the pilot from `for (const entry of manifest) {` on: identical through the loop's closing `}`; the remainder is this package's own flagship-fence block (an appended case).

```text
$ diff -u tmp/d7n-websocket-converge-fix/pilot-tail.txt tmp/d7n-websocket-converge-fix/ws-tail.txt
@@ -146,67 +146,92 @@   # the first hunk starts at the EXECUTED-half comment; nothing earlier differs
```

## W2 — the constants' literals (Ruling 18)

Every description paragraph in `src/server/constants.ts` names its literal, and the reference material moved to `@remarks` (Ruling 7). The brief's named sentences landed verbatim: `Names the text frame opcode, 0x01.`, `Names the connecting ready state, 0.`, `Names the normal-closure status code, 1000.`, `Names the supported protocol version, '13'.`, `Names the maximum UTF-8 close-reason length after the two-byte status code, 123.` The siblings follow the same idiom, including the GUID, the remaining opcodes, ready states, and close codes, the payload cap, the control-frame cap, and the two timeouts.

```diff
-/** Names the text frame opcode — a UTF-8 payload (RFC 6455 §5.6). */
+/**
+ * Names the text frame opcode, 0x01.
+ *
+ * @remarks
+ * A UTF-8 payload (RFC 6455 §5.6).
+ */
 export const WEBSOCKET_OPCODE_TEXT = 0x01
```

The `### Constants` table heads `Shape` between `Kind` and `Summary` under "A `Shape` cell holds the constant's declared type.", matching database, browser, and table.

Two decisions, recorded:

- A `Shape` cell for an unannotated constant holds `number` or `string`, not the literal type. Ruling 18 bars a `Value` column and routes the literal through the description paragraph, so a cell spelling `1` would restore the column the ruling removes. The annotated ready states hold `WebSocketReadyState`.
- The payload cap, the close-handshake timeout, and the flush grace name their literals as grouped numerals (104,857,600 bytes (100 MiB); 30,000 milliseconds; 1,000 milliseconds). The underscore form reached the guide as `104\_857\_600`, because `replaceCell` escapes an underscore for Markdown.

## W3 — the `Shape` column (Ruling 15)

`### Types` heads `Shape` between `Kind` and `Summary`, under Ruling 15's fleet-wide wording. The cells:

| Type | Shape |
| --- | --- |
| `WebSocketReadyState` | `` `0 \| 1 \| 2 \| 3` `` |
| `WebSocketFrame` | `` `{ fin, opcode, payload, consumed, masked, rsv }` `` |
| `WebSocketEncodeOptions` | `` `{ masked?, mask? }` `` |
| `WebSocketErrorCode` | `` `'OPTION' \| 'LIMIT' \| 'CLOSE' \| 'FRAME'` `` |
| `NodeWebSocketEventMap` | `` `{ open, message, close, error, ping, pong }` `` (Ruling 19) |
| `NodeWebSocketOptions` | `` `{ socket, key?, head?, protocol?, on?, error?, payload?, timeout?, signal? }` `` |
| `NodeWebSocketInterface` | `` `{ emitter, readyState } plus send, ping, close, destroy` `` |

Four descriptions stopped listing what the cell now carries, and each states what the type represents:

```diff
- * Represents a WebSocket ready state — the browser-compatible `0` connecting, `1` open,
- * `2` closing, and `3` closed.
+ * Represents a WebSocket ready state — the stage a connection has reached between the
+ * handshake and the socket's end.
```

```diff
- * Represents the subject a `WebSocketError` names as refused — `OPTION`, `LIMIT`,
- * `CLOSE`, or `FRAME`.
+ * Represents the subject a `WebSocketError` names as refused.
```

```diff
- * Represents the event map a {@link NodeWebSocketInterface} emitter carries — `open`,
- * `message`, `close`, `error`, `ping`, and `pong`.
+ * Represents the event map a {@link NodeWebSocketInterface} emitter carries.
```

```diff
  * Represents the behavioral contract a server-native WebSocket exposes over a raw
- * upgraded socket — the `emitter` and `readyState` data members plus `send`, `ping`,
- * `close`, and `destroy`.
+ * upgraded socket.
```

`NodeWebSocketOptions`, `WebSocketFrame`, and `WebSocketEncodeOptions` kept their descriptions: each states what the type represents rather than listing its members. No guide-body prose listed members, so none was deleted.

## W4 — the `frame` helper: BLOCKED, not landed

Expected: rename `tests/setupServer.ts`'s exported `frame` to `encodeTestFrame`, update the call sites under `tests/src/**`, and give the declaration the description "Encodes one RFC 6455 frame for tests, optionally clearing FIN for fragmentation cases."

Found: the rename reaches `tests/setupServer.test.ts`, which is outside the granted set and inside "Off-limits: everything else". That file imports the helper and calls it:

```text
$ grep -n 'frame' tests/setupServer.test.ts
17:	frame,
99:		expect(frame(WEBSOCKET_OPCODE_TEXT, payload, { masked: false }).equals(baseline)).toBe(true)
101:			frame(WEBSOCKET_OPCODE_TEXT, payload, { masked: false, fin: true }).equals(baseline),
108:		const unfinished = frame(WEBSOCKET_OPCODE_BINARY, payload, { masked: false, fin: false })
```

The description half cannot land alone either. Applying the brief's sentence to the declaration while it is still named `frame` reddens lint:

```text
$ npx oxlint --config .oxlintrc.json --deny-warnings tests src/server
tests/setupServer.ts:102:1: error policy(no-malformed-summary): State what the symbol does without naming frame in the first sentence.
lint exit=1
```

Probe proving the rename is the precondition, not the sentence — the same description under each name, at `tmp/d7n-websocket-converge-fix/probe.ts`:

```text
$ npx oxlint --config .oxlintrc.json --deny-warnings tmp/d7n-websocket-converge-fix/probe.ts
tmp/d7n-websocket-converge-fix/probe.ts:6:1: error policy(no-malformed-summary): State what the symbol does without naming frame in the first sentence.
```

Line 2 is `export function encodeTestFrame` and passes; line 7 is `export function frame` and fails.

Done: nothing. `tests/setupServer.ts` is unmodified and `git status --short` does not list it. The brief's criterion `grep -rn '\bframe(' tests` still prints 33 sites, the baseline count.

Hypothesis: the brief scoped the call sites from `tests/src/**` and did not reach the sibling proof file `tests/setupServer.test.ts`.

The whole rename is prepared and validated in `/home/user/fleet/websocket/tmp/d7n-websocket-converge-fix/rename/`, one file per source path, formatted with the repository's own `oxfmt` (`tests__setupServer.ts`, `tests__setupServer.test.ts`, `tests__src__server__parsers.test.ts`, `tests__src__server__NodeWebSocket.test.ts`). Its content:

- `tests/setupServer.ts`: `{@link frame}` → `{@link encodeTestFrame}` in `TestFrameOptions`; the declaration's doc paragraph → "Encodes one RFC 6455 frame for tests, optionally clearing FIN for fragmentation cases."; `export function frame(` → `export function encodeTestFrame(`.
- `tests/setupServer.test.ts`, `tests/src/server/parsers.test.ts`, `tests/src/server/NodeWebSocket.test.ts`: the import member and every call site.
- `oxfmt` rewrapped three call sites in `tests/setupServer.test.ts` that the longer name pushes past the line width; no other formatting moved.
- The import member keeps its old position in the list; `.oxlintrc.json` configures no sort rule, so re-sorting `encodeTestFrame` above `flushSocket` is style, not a gate.

A successor unit needs `tests/setupServer.test.ts` granted for the rename and that block alone.

## W5 — the count

```diff
-6. **Observable, and a faulty listener can never sink the socket.** … Two error channels stay distinct: an underlying socket fault emits the map's domain `error` event …
+6. **Observable, and a faulty listener can never sink the socket.** … The error channels stay distinct: an underlying socket fault emits the map's domain `error` event …
```

The sentence already names both channels: the domain `error` event and the emitter's own `error` handler.

## W6 — the dependency sentence

```diff
-… into a typed, observable connection, and it reaches for no third-party package to do it: [`node:crypto`](…) supplies the one handshake hash and `@orkestrel/emitter` the typed emitter.
+… into a typed, observable connection, and its only runtime dependency is `@orkestrel/emitter`, which supplies the typed emitter; [`node:crypto`](…) supplies the one handshake hash.
```

## W7 — all-caps in the blocks

Emphasis became plain wording; every real token stayed (`FIN`, the `'OPTION'`, `'LIMIT'`, `'CLOSE'`, and `'FRAME'` codes, `RFC`, `UTF-8`, `GUID`, `MCP`, `JSON-RPC`, `DOM`, `WEBSOCKET_*`). `NodeWebSocket.ts`: `SERVER`, `CLIENT`, `TEXT`, `PING`, `PONG`, `CLOSE frame`, `GRACEFULLY`, `CLOSED`, `OPEN`, `AFTER`, `EACH`. `types.ts`: `ONLY`, `NO`, `MUST`, `NOT`, `DOMAIN`, `SERVER`, `UNMASKED`, `CLIENT`, `MASKED`, `AND`. `errors.ts`: `PEER`. `helpers.ts`: `CLIENT`. `parsers.ts`: `MUST`.

```diff
- * upgrade). `key` is the client's `Sec-WebSocket-Key`: present it to run in SERVER
- * mode — the wrapper writes the `101 Switching Protocols` handshake and sends UNMASKED
- * frames; omit it for CLIENT mode — no handshake is written and frames are MASKED (RFC
+ * upgrade). `key` is the client's `Sec-WebSocket-Key`: present it to run in server
+ * mode — the wrapper writes the `101 Switching Protocols` handshake and sends unmasked
+ * frames; omit it for client mode — no handshake is written and frames are masked (RFC
```

The sweep covered every comment under `src/server/**`, not the doc blocks alone: the file-leading comments of `types.ts` and `errors.ts` carried the same emphasis. Recorded as an ancillary decision; no code token moved. In the same pass the `constants.ts` header lost a count ("the four ready states" → "the ready states"), and `tests/guides.test.ts` lost one in the comment above `FENCE_KEY` ("the two server-mode fences read" → "each server-mode fence reads").

## W8 — the titled pair (Ruling 14)

The guide fence under `### Accept an upgrade and echo messages (server mode)` regained the construction hook the converge round deleted, and `npm run docs -- --to source` carried the extended fence into `createNodeWebSocket`'s `@example`:

```diff
 	const ws = createNodeWebSocket({
 		socket,
 		key,
 		head, // any bytes already buffered after the upgrade headers
+		on: { message: (text) => ws.send(`echo: ${text}`) }, // wired before the first frame arrives
 	})
-	ws.emitter.on('message', (text) => ws.send(`echo: ${text}`))
+	ws.emitter.on('message', (text) => log('echoed', text)) // a second observer of the same event
 	ws.emitter.on('close', (code, reason) => log('closed', code, reason))
 })
```

Decision, recorded: the later listener observes instead of echoing. Both sides now carry both demonstrations — the construction hook the block had and the post-construction observer the fence had, neither deleted — and had the later listener kept `ws.send`, the fence would document two echo frames for one inbound message. The executed transcription proves the fence as it now reads, and it is what would break if the fence went back to two senders:

```ts
	it('the Patterns fence echoes from its construction hook and hands the same message to a second observer', async () => {
		const observed = createRecorder<readonly [message: string]>()
		const ws = createNodeWebSocket({
			socket: server,
			key: FENCE_KEY,
			on: { message: (text) => ws.send(`echo: ${text}`) }, // wired before the first frame arrives
		})
		ws.emitter.on('message', observed.handler) // a second observer of the same event
		…
		// One echo, not two: the fence's later listener observes the message and the
		// construction hook is what answers it.
		expect(collector.frames.map((frame) => frame.payload.toString('utf-8'))).toEqual(['echo: pattern'])
		expect(observed.calls).toEqual([['pattern']])
```

## W9 — propagation

`npx oxfmt --write` over every touched TypeScript file, then `--to guide`, then `--to source`. `replaceCell` re-renders a table it writes without padding, so the `### Constants` and `### Types` tables were re-padded to the file's own column style afterwards; the compared form trims cell whitespace, and both write directions report `written: 0` over the padded text.

## Criteria

1. `git status --short` — owned files only.

```text
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

2. Format, lint, typecheck — each exit 0.

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/websocket.md src/server/{constants,types,NodeWebSocket,errors,helpers,parsers,factories}.ts tests/guides.test.ts
All matched files use the correct format.
Finished in 444ms on 9 files using 4 threads.

$ npx oxlint --config .oxlintrc.json --deny-warnings tests src/server
(no output)  exit 0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.server.json
exit 0
```

3. `npm run docs` at zero, both directions at `written: 0`.

```text
$ npm run docs
rows read: 1, disagreements found: 0
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

4. The guide greps.

```text
$ grep -nE '0x01|1000|1002|1003|1007|1009|123' guides/websocket.md
81:| `WEBSOCKET_OPCODE_TEXT`             | const | `number`              | Names the text frame opcode, 0x01. …
91:| `WEBSOCKET_CLOSE_NORMAL`            | const | `number`              | Names the normal-closure status code, 1000. …
92:| `WEBSOCKET_CLOSE_PROTOCOL`          | const | `number`              | Names the protocol-error status code, 1002. …
93:| `WEBSOCKET_CLOSE_UNSUPPORTED`       | const | `number`              | Names the unsupported-data status code, 1003. …
94:| `WEBSOCKET_CLOSE_INVALID`           | const | `number`              | Names the invalid-frame-payload-data status code, 1007. …
95:| `WEBSOCKET_CLOSE_TOO_BIG`           | const | `number`              | Names the message-too-big status code, 1009. …
99:| `WEBSOCKET_CLOSE_REASON_MAX_LENGTH` | const | `number`              | Names the maximum UTF-8 close-reason length after the two-byte status code, 123. …

$ grep -n '| interface *| `{[^`]*:' guides/websocket.md
(no output)  exit 1

$ grep -n 'Two error channels\|third-party' guides/websocket.md
(no output)  exit 1

$ grep -rn '\bframe(' tests --include=*.ts | wc -l
33          # W4 blocked; the baseline count, unchanged
```

The convention sentences sit under their headings and above their tables: Ruling 15's wording under `### Types`, "A `Shape` cell holds the constant's declared type." under `### Constants`. The drop-in diff against the pilot is the appended flagship-fence block alone.

5. Suites — each exit 0.

```text
$ npm run test:guides
 Test Files  1 passed (1)   Tests  25 passed (25)    Duration  686ms
$ npm run test:policy
 Test Files  1 passed (1)   Tests  90 passed | 1 skipped (91)   Duration  767ms
$ npm run test:src:server
 Test Files  4 passed (4)   Tests  120 passed (120)   Duration  1.08s
```

No timing red. The host stayed quiet enough for every suite to finish under 2 seconds.

## Deviation state

One deviation: W4, reported under its own heading. Every other item landed. The instruments are under `/home/user/fleet/websocket/tmp/d7n-websocket-converge-fix/`: the edit scripts (`w1.py`, `w2.py`, `w3w7.py`, `w568.py`, `shape.py`, `w8.py`, `pad.py`), the pilot comparison (`pilot-tail.txt`, `ws-tail.txt`), the lint probe (`probe.ts`), and the prepared rename (`rename.py`, `rename/`).
