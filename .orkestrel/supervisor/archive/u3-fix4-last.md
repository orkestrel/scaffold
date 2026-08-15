```diff
diff --git a/tests/app/browser/integration/RosterManager.test.ts b/tests/app/browser/integration/RosterManager.test.ts
index 4a695e7..2624bd2 100644
--- a/tests/app/browser/integration/RosterManager.test.ts
+++ b/tests/app/browser/integration/RosterManager.test.ts
@@ -33,32 +33,32 @@
 		const client = new ApplicationRosterClient(seam.origin, `supervisor-session=${session.value}`)
 		attached = new RosterManager(client, () => undefined)
-		const initial = client.next()
+		const workflow = 'roster-manager-integration'
 		attached.start()
 
-		expect(await initial).toEqual(attached.snapshot)
+		await expect.poll(() => attached?.snapshot !== undefined).toBe(true)
+		expect(attached.snapshot?.executors).toEqual(
+			expect.arrayContaining([
+				expect.objectContaining({ name: 'function' }),
+				expect.objectContaining({ name: 'agent' }),
+				expect.objectContaining({ name: 'human' }),
+			]),
+		)
+		expect(attached.snapshot?.runs.some((run) => run.id === workflow)).toBe(false)
 		expect(attached.live).toBe(true)
 		expect(attached.fault).toBeUndefined()
 
-		const workflow = 'roster-manager-integration'
-		const changed = client.next()
 		const started = await startApplicationWorkflow(seam.origin, seam.token, workflow)
 		try {
 			expect(started.status).toBe(202)
 			await started.body?.cancel()
-			const published = await changed
-
-			expect(published.runs).toEqual(
-				expect.arrayContaining([
-					expect.objectContaining({
-						id: workflow,
-						paused: false,
-						created: expect.any(Number),
-						updated: expect.any(Number),
-					}),
-				]),
-			)
-			expect(attached.snapshot).toEqual(published)
+			await expect
+				.poll(() => attached?.snapshot?.runs.some((run) => run.id === workflow))
+				.toBe(true)
+			const active = attached.snapshot?.runs.find((run) => run.id === workflow)
+			if (active === undefined) throw new Error('manager retained no started roster entry')
+			expect(active).toMatchObject({ id: workflow, paused: false })
+			expect(active.created).toBeLessThanOrEqual(active.updated)
 			expect(attached.live).toBe(true)
 			expect(attached.fault).toBeUndefined()
@@ -68,5 +68,16 @@
 			})
 			await stopped.body?.cancel()
 		}
+
+		await expect
+			.poll(() => ({
+				active: attached?.snapshot?.runs.some((run) => run.id === workflow),
+				departed: attached?.departed.some((run) => run.id === workflow),
+			}))
+			.toEqual({ active: false, departed: true })
+		const departed = attached.departed.find((run) => run.id === workflow)
+		if (departed === undefined) throw new Error('manager retained no departed roster entry')
+		expect(departed).toMatchObject({ id: workflow, paused: false })
+		expect(departed.created).toBeLessThanOrEqual(departed.updated)
 	})
 })
```

```text
 M app/browser/constants.ts
 M app/browser/controllers/Operator.ts
 M app/browser/factories.ts
 M app/browser/index.ts
 M app/browser/stores/MemoryOperatorStore.ts
 M app/browser/stores/StorageOperatorStore.ts
 M app/browser/types.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/integration/RosterManager.test.ts
 M tests/setupBrowser.ts
 M tests/setupBrowserServer.ts
?? app/browser/stores/MemoryOperatorPointer.ts
?? app/browser/stores/StorageOperatorPointer.ts
```