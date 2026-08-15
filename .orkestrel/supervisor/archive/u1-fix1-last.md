## Exact edit

Only [ApplicationServer.test.ts](/workspace/supervisor/tests/app/server/ApplicationServer.test.ts:290) changed in this round; no server code changed.

```diff
+import { isRecord } from '@orkestrel/contract'
+
 			expect(stopped.status).toBe(200)
-			const ended = await readSSEMessage(reader)
+			let ended: Awaited<ReturnType<typeof readSSEMessage>> | undefined
+			for (let read = 0; read < 5; read += 1) {
+				const message = await readSSEMessage(reader)
+				expect(message).toMatchObject({
+					event: APP_ROSTER_EVENT,
+					data: { runs: expect.any(Array), executors: expect.any(Array) },
+				})
+				if (!isRecord(message.data) || !Array.isArray(message.data.runs)) {
+					throw new Error('expected complete roster SSE data')
+				}
+				if (message.data.runs.some((run) => isRecord(run) && run.id === 'w-one')) continue
+				ended = message
+				break
+			}
+			if (ended === undefined) throw new Error('w-one remained live after five roster frames')
 			expect(ended).toMatchObject({ event: APP_ROSTER_EVENT, data: { runs: [] } })
```

Sibling sites fixed: none. The other roster reads do not place a second workflow start between the asserted start and removal frames.

The drain cannot mask a real removal failure: it reads at most five valid roster messages and explicitly fails if every one still contains `w-one`.

## Gates

```text
git diff --check
exit 0

npm run lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
exit 0

npm run check:app:server
> tsc --noEmit -p configs/app/tsconfig.server.json
exit 0
```

Per the successor brief, `test:app:server` and the full suite remain for the Orchestrator’s acceptance run.