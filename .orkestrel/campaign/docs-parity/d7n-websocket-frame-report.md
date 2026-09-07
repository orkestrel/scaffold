# Report — `d7n-websocket-frame`

## Item 1 — rename the declaration and its description

`tests/setupServer.ts`:

```diff
-/** Options for {@link frame}, adding explicit FIN control to the public encoder. */
+/** Options for {@link encodeTestFrame}, adding explicit FIN control to the public encoder. */
 export interface TestFrameOptions {
 	readonly masked?: boolean
 	readonly fin?: boolean

-/** Encodes one wire message for tests, optionally clearing FIN for fragmentation cases. */
-export function frame(
+/** Encodes one RFC 6455 frame for tests, optionally clearing FIN for fragmentation cases. */
+export function encodeTestFrame(
 	opcode: number,
 	payload: Buffer | string,
 	options?: TestFrameOptions,
 ): Buffer {
```

## Item 2 — update every import and call site under `tests/**`

`tests/setupServer.test.ts` (import plus every call site in `describe('frame', …)`):

```diff
 import {
 	createEchoServer,
 	duplexPair,
 	flushSocket,
-	frame,
+	encodeTestFrame,
 	randomBuffer,
 	readClientFrames,
 } from './setupServer.js'
@@
-		expect(frame(WEBSOCKET_OPCODE_TEXT, payload, { masked: false }).equals(baseline)).toBe(true)
 		expect(
-			frame(WEBSOCKET_OPCODE_TEXT, payload, { masked: false, fin: true }).equals(baseline),
+			encodeTestFrame(WEBSOCKET_OPCODE_TEXT, payload, { masked: false }).equals(baseline),
+		).toBe(true)
+		expect(
+			encodeTestFrame(WEBSOCKET_OPCODE_TEXT, payload, { masked: false, fin: true }).equals(
+				baseline,
+			),
 		).toBe(true)
-		const unfinished = frame(WEBSOCKET_OPCODE_BINARY, payload, { masked: false, fin: false })
+		const unfinished = encodeTestFrame(WEBSOCKET_OPCODE_BINARY, payload, {
+			masked: false,
+			fin: false,
+		})
```

`tests/src/server/parsers.test.ts` (import plus every truncation-matrix call):

```diff
-import { buildCorpus, frame, randomBuffer } from '../../setupServer.js'
+import { buildCorpus, encodeTestFrame, randomBuffer } from '../../setupServer.js'
@@
-			frame(WEBSOCKET_OPCODE_TEXT, randomBuffer(rng, 5)), // 7-bit form, unmasked
-			frame(WEBSOCKET_OPCODE_TEXT, randomBuffer(rng, 5), { masked: true }), // 7-bit form, masked
-			frame(WEBSOCKET_OPCODE_BINARY, randomBuffer(rng, 126)), // 126 + 16-bit form, unmasked
-			frame(WEBSOCKET_OPCODE_BINARY, randomBuffer(rng, 126), { masked: true }), // 126 + 16-bit, masked
-			frame(WEBSOCKET_OPCODE_BINARY, randomBuffer(rng, 65_536)), // 127 + 64-bit form, unmasked
-			frame(WEBSOCKET_OPCODE_BINARY, randomBuffer(rng, 65_536), { masked: true }), // 127 + 64-bit, masked
+			encodeTestFrame(WEBSOCKET_OPCODE_TEXT, randomBuffer(rng, 5)), // 7-bit form, unmasked
+			encodeTestFrame(WEBSOCKET_OPCODE_TEXT, randomBuffer(rng, 5), { masked: true }), // 7-bit form, masked
+			encodeTestFrame(WEBSOCKET_OPCODE_BINARY, randomBuffer(rng, 126)), // 126 + 16-bit form, unmasked
+			encodeTestFrame(WEBSOCKET_OPCODE_BINARY, randomBuffer(rng, 126), { masked: true }), // 126 + 16-bit, masked
+			encodeTestFrame(WEBSOCKET_OPCODE_BINARY, randomBuffer(rng, 65_536)), // 127 + 64-bit form, unmasked
+			encodeTestFrame(WEBSOCKET_OPCODE_BINARY, randomBuffer(rng, 65_536), { masked: true }), // 127 + 64-bit, masked
```

`tests/src/server/NodeWebSocket.test.ts` (import plus every call site across the receiving,
breach-matrix, and stream-reassembly describes — one representative hunk; the same
`frame(` → `encodeTestFrame(` substitution ran at every remaining call site the earlier
`grep -rn '\bframe(' tests` listing named):

```diff
 import {
 	duplexPair,
 	flushSocket,
-	frame,
+	encodeTestFrame,
 	randomBuffer,
 	readClientFrames,
 } from '../../setupServer.js'
@@
-		const first = frame(WEBSOCKET_OPCODE_TEXT, 'Hel', { masked: true, fin: false })
-		const second = frame(WEBSOCKET_OPCODE_CONTINUATION, 'lo!', { masked: true })
+		const first = encodeTestFrame(WEBSOCKET_OPCODE_TEXT, 'Hel', { masked: true, fin: false })
+		const second = encodeTestFrame(WEBSOCKET_OPCODE_CONTINUATION, 'lo!', { masked: true })
```

`tests/src/server/factories.test.ts` and `tests/src/server/helpers.test.ts` import neither
`frame` nor `encodeTestFrame`, so item 2 touched neither. `tests/guides.test.ts` uses `frame`
only as a local callback parameter name in `.map((frame) => frame.payload…)`, never as the
imported helper, so it stays unchanged and outside scope.

## Item 3 — format the touched files

```
$ npx oxfmt --write tests/setupServer.ts tests/setupServer.test.ts tests/src/server/parsers.test.ts tests/src/server/NodeWebSocket.test.ts
Finished in 22ms on 4 files using 4 threads.
```

(One follow-up pass after correcting the `parsers.test.ts` import line — see Acceptance
criterion 2.)

## Acceptance criteria

1. `git status --short`:

```
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/server/NodeWebSocket.test.ts
 M tests/src/server/parsers.test.ts
```

Owned files only.

2. `grep -rn '\bframe(' tests --include=*.ts` printed nothing on the first pass except one
   surviving import-list occurrence in `tests/src/server/parsers.test.ts` (`import { buildCorpus, frame, randomBuffer } …` sat on one line, so the multi-line `\tframe,` substitution missed it). Corrected that import line directly and re-formatted; the criterion command then printed nothing:

```
$ grep -rn '\bframe(' tests --include=*.ts
(no output)
$ grep -c 'encodeTestFrame' tests/setupServer.ts
2
```

3. Format and lint:

```
$ npx oxfmt --check tests/setupServer.ts tests/setupServer.test.ts tests/src/server/parsers.test.ts tests/src/server/NodeWebSocket.test.ts
Checking formatting...
All matched files use the correct format.
Finished in 6ms on 4 files using 4 threads.

$ npx oxlint --config .oxlintrc.json --deny-warnings tests
(no output, exit 0)

$ npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.server.json
(no output, exit 0)
```

4. Test suites:

```
$ PATH=/opt/npm11/bin:$PATH npm run test:setup
 Test Files  3 passed (3)
      Tests  21 passed (21)
   Duration  608ms

$ npm run test:src:server
 Test Files  4 passed (4)
      Tests  120 passed (120)
   Duration  727ms
```

Both suites finished green under load; no timing red to report.

## Deviations

None. The rename reached only the owned files, and every gate the brief names stayed green.
