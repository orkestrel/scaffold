# Report — packument-refusal

## git status --short

```
 M tests/setupServer.test.ts
 M tests/setupServer.ts
?? .orkestrel/campaign/ts6-api/
```

## git diff -- tests/setupServer.ts tests/setupServer.test.ts

```diff
diff --git a/tests/setupServer.test.ts b/tests/setupServer.test.ts
index 9063e907..44fce1a0 100644
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -518,6 +518,12 @@ describe('the upstream fixtures', () => {
 		})
 	})
 
+	it('refuses to publish an unnamed version', () => {
+		expect(() => buildPackument('')).toThrow(
+			'A packument publishes at least one version, and every version is named',
+		)
+	})
+
 	it('lists every organization package under the access map the registry serves', () => {
 		expect(
 			JSON.parse(buildOrganization(['@orkestrel/router', '@orkestrel/emitter'])),
diff --git a/tests/setupServer.ts b/tests/setupServer.ts
index b4fd5668..cf239236 100644
--- a/tests/setupServer.ts
+++ b/tests/setupServer.ts
@@ -1657,6 +1657,7 @@ export const UPSTREAM_ENDPOINT_CASES: readonly TestEndpointCase[] = [
  * a packument that declares none.
  * @returns The response body, as the abbreviated packument form the registry
  * serves for `application/vnd.npm.install-v1+json`.
+ * @throws Error - When the version is empty; a packument names every version it publishes.
  *
  * @remarks
  * Written here as literal registry JSON rather than derived from anything the
@@ -1668,6 +1669,9 @@ export const UPSTREAM_ENDPOINT_CASES: readonly TestEndpointCase[] = [
  * and a reader that reads the wrong one is caught.
  */
 export function buildPackument(version: string, edges?: TestPackumentEdges): string {
+	if (version.length === 0) {
+		throw new Error('A packument publishes at least one version, and every version is named')
+	}
 	return JSON.stringify({
 		'dist-tags': { latest: version },
 		name: '@orkestrel/sample',
```

## Commands

### `npx oxfmt --config .oxfmtrc.json --check tests/setupServer.ts tests/setupServer.test.ts`

Exit code: 0

```
Checking formatting...

All matched files use the correct format.
Finished in 5ms on 2 files using 4 threads.
```

### `npx oxlint --config .oxlintrc.json --deny-warnings tests/setupServer.ts tests/setupServer.test.ts`

Exit code: 0 (no output)

### `npm run test:setup`

Exit code: 0

```
 RUN  v4.1.11 /home/user/scaffold

······································································

 Test Files  2 passed (2)
      Tests  70 passed (70)
   Start at  22:29:15
   Duration  1.22s (transform 989ms, setup 829ms, import 386ms, tests 362ms, environment 0ms)
```
