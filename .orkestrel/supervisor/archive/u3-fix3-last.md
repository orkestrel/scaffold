```diff
diff --git a/tests/app/browser/integration/RosterManager.test.ts b/tests/app/browser/integration/RosterManager.test.ts
index 4a695e7..0e702e4 100644
--- a/tests/app/browser/integration/RosterManager.test.ts
+++ b/tests/app/browser/integration/RosterManager.test.ts
@@ -36,7 +36,9 @@
 		const initial = client.next()
 		attached.start()
 
-		expect(await initial).toEqual(attached.snapshot)
+		const received = await initial
+		await expect.poll(() => attached?.snapshot).toEqual(received)
+		expect(received).toEqual(attached.snapshot)
@@ -47,6 +49,7 @@
 			await started.body?.cancel()
 			const published = await changed
+			await expect.poll(() => attached?.snapshot).toEqual(published)
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
?? app/browser/stores/MemoryOperatorPointer.ts
?? app/browser/stores/StorageOperatorPointer.ts
```