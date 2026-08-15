Only three test files were touched in this round; no server or browser source changed.

### Diff 1 — parked-read settlement

```diff
diff --git a/tests/app/server/ApplicationHandlers.test.ts b/tests/app/server/ApplicationHandlers.test.ts
@@
 			const parked = reader.read()
 			await harness.server.destroy()
-			await expect(parked).resolves.toEqual({ done: true, value: undefined })
+			const [settled] = await Promise.allSettled([parked])
+			if (settled === undefined) throw new Error('expected parked roster read settlement')
+			const clean =
+				settled.status === 'fulfilled' && settled.value.done && settled.value.value === undefined
+			const terminated =
+				settled.status === 'rejected' &&
+				settled.reason instanceof TypeError &&
+				settled.reason.message === 'terminated'
+			expect(clean || terminated).toBe(true)
 			expect(harness.broker.roster.count).toBe(0)
 			expect(getEventListeners(captured.signal, 'abort')).toHaveLength(captured.listeners)
```

### Diff 2 — stateful SSE reading

```diff
diff --git a/tests/app/setup.ts b/tests/app/setup.ts
@@
-/** Read through one SSE response until a complete event block arrives. */
-export async function readSSEEvent(
-	reader: ReadableStreamDefaultReader<Uint8Array>,
-): Promise<string> {
-	const decoder = new TextDecoder()
-	let text = ''
-	while (!text.includes('\n\n')) {
-		const chunk = await reader.read()
-		if (chunk.done) break
-		text += decoder.decode(chunk.value, { stream: true })
+/** Stateful event reader retaining every complete or partial SSE block from one response body. */
+export class SSEReader {
+	readonly #reader: ReadableStreamDefaultReader<Uint8Array>
+	readonly #decoder = new TextDecoder()
+	#buffer = ''
+
+	constructor(body: ReadableStream<Uint8Array>) {
+		this.#reader = body.getReader()
+	}
+
+	/** Cancel the owned response-body reader. */
+	cancel(): Promise<void> {
+		return this.#reader.cancel()
+	}
+
+	/** Read and decode the next complete SSE event block. */
+	async read(): Promise<string> {
+		while (!this.#buffer.includes('\n\n')) {
+			const chunk = await this.#reader.read()
+			if (chunk.done) break
+			this.#buffer += this.#decoder.decode(chunk.value, { stream: true })
+		}
+		const separator = this.#buffer.indexOf('\n\n')
+		if (separator < 0) {
+			const remainder = this.#buffer
+			this.#buffer = ''
+			return remainder
+		}
+		const block = this.#buffer.slice(0, separator)
+		this.#buffer = this.#buffer.slice(separator + 2)
+		return block
 	}
-	return text
 }
@@
-export async function readSSEMessage(
-	reader: ReadableStreamDefaultReader<Uint8Array>,
-): Promise<TestSSEMessage> {
-	const block = await readSSEEvent(reader)
+export async function readSSEMessage(reader: SSEReader): Promise<TestSSEMessage> {
+	const block = await reader.read()

diff --git a/tests/app/server/ApplicationServer.test.ts b/tests/app/server/ApplicationServer.test.ts
@@
 	InertAgentProvider,
+	SSEReader,
 	createApplicationEnvironment,
 	createApplicationWorkflow,
-	readSSEEvent,
 	readSSEMessage,
@@
-			const reader = live.body?.getReader()
-			if (reader === undefined) throw new Error('expected roster SSE response body')
+			const body = live.body
+			if (body === null) throw new Error('expected roster SSE response body')
+			const reader = new SSEReader(body)
@@
-			const reader = live.body?.getReader()
-			if (reader === undefined) throw new Error('expected SSE response body')
-			const event = await readSSEEvent(reader)
+			const body = live.body
+			if (body === null) throw new Error('expected SSE response body')
+			const reader = new SSEReader(body)
+			const event = await reader.read()
```

### `git status --porcelain`

```text
 M app/browser/helpers.ts
 M app/browser/seeders.ts
 M app/browser/services/Client.ts
 M app/browser/services/ClientRoster.ts
 M app/browser/types.ts
 M app/browser/validators.ts
 M app/core/helpers.ts
 M app/core/types.ts
 M app/server/ApplicationHandlers.ts
 M app/server/ApplicationRoutes.ts
 M app/server/RosterBroker.ts
 M app/server/RosterViewer.ts
 M app/server/SupervisorApplication.ts
 M app/server/index.ts
 M app/server/types.ts
 M tests/app/browser/ApplicationView.test.ts
 M tests/app/browser/components/CommandBar.test.ts
 M tests/app/browser/services/ClientRoster.test.ts
 M tests/app/browser/services/LiveStream.test.ts
 M tests/app/browser/validators.test.ts
 M tests/app/core/helpers.test.ts
 M tests/app/server/ApplicationHandlers.test.ts
 M tests/app/server/ApplicationServer.test.ts
 M tests/app/server/RosterBroker.test.ts
 M tests/app/server/RosterViewer.test.ts
 M tests/app/server/SupervisorApplication.test.ts
 M tests/app/setup.ts
 M tests/setupBrowser.ts
?? app/server/ApplicationRosterHandlers.ts
```

- Finding 1 binds because the parked read must settle as either clean EOF or Undici’s verified `TypeError: terminated`, while viewer count and abort-listener cleanup remain unconditional assertions.
- Finding 2 binds because each response now owns one buffered reader that returns only the first complete SSE block and retains the remainder for the next ordered read.

Static gates: `format:check`, `lint:check`, `check`, and `git diff --check` passed.

Deviations: none.