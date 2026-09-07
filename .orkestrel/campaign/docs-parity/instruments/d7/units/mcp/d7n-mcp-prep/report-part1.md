# Report — P.1 `d7n-mcp-prep`

Every item landed and every criterion reads as the brief expected. No deviation.

Checkout `/home/user/fleet/mcp`, branch `claude/orkestrel-npm-audit-deps-14ibta`, baseline tip
`9096437` (clean at start). Wall clock, first command to last: 2026-09-07T16:44:53Z to
2026-09-07T16:59:23Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

```text
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
tsconfig.json replaced (3 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 40 unchanged, 0 removed in ..
EXIT 0
```

`git status --short` directly after, the P21 list exactly:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

The vendored set is byte-identical to the tip's `dist/host` copies after this unit's `npm run format`
(`cmp` over `configs/policy.ts`, `configs/helpers.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`: same). `package.json` carries the `docs` script row; `tsconfig.json` carries
the own-specifier `paths` entries.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

```diff
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
index 618f4bb..dc8150c 100644
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -358,7 +358,7 @@ describe('public package faces', () => {
 			extractFenceImports("import { createMCPRoutes /* server face */ } from '@orkestrel/mcp'"),
 		).toEqual([{ specifier: '@orkestrel/mcp', names: [] }])
 		// Inside the brace, carrying its own `}`, and outside it in positions the raw
-		// reading admits only as whitespace: the whole statement is lost, not just the binding.
+		// reading admits only as whitespace: the whole statement is lost, not the binding alone.
 		for (const fence of [
 			"import { createMCPRoutes /* } */ } from '@orkestrel/mcp'",
 			"import /* server face */ { createMCPRoutes } from '@orkestrel/mcp'",
@@ -620,21 +620,27 @@ for (const entry of manifest) {
 		})
 
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@ -649,22 +655,32 @@ for (const entry of manifest) {
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
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
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```
