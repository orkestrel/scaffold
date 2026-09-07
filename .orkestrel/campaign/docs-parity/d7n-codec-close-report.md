# Report — `d7n-codec-close`

## Item 1 — the `Shape` idiom

No `## Surface`, guard, or constants table in `guides/codec.md` carries an `interface` or `type`
row: every table row is `Kind: function`. `grep -n '^| interface \|| type '` against
`guides/codec.md` returns nothing, matching the brief's own "(none)" listing for every subsection.
No hunk.

## Item 2 — member references

`{@link ...}` tags in `src/core/constants.ts`, `helpers.ts`, and `validators.ts` all name a bare
function (`{@link decodeBase64}`), never `Owner#member` or `#member`. `npm run docs` reports
`rows read: 1, disagreements found: 0`. No hunk.

## Item 3 — the drop-in's canon

The shared region (`const root = new URL(...)` through the manifest loop's closing brace) in
`tests/guides.test.ts` diverged from the pilot in ways the brief's supplied hunk named: the
`extracts a non-empty documented surface` case had gained a second assertion and a renamed title,
`/Interface$/u` carried a flag the pilot's two occurrences do not, `documents an example for every
Surface function` had gained a `names.length` guard, the shared methods-examples `for` loop and
the pilot's plain `imports only real exports in every \`\`\`ts fence` case had been replaced by a
package-written `imports only real exports through published specifiers` case using
`extractSourceLines`, `links only to test files that exist` had gained a `guide.tests().length`
guard, and an extra `lists every test file the repository carries` case had been appended with no
Ruling 20 exception covering it. All of these are reverted to the pilot's exact text. Confirmed
after the edit: `diff` of the extracted regions against `/home/user/fleet/abort/tests/guides.test.ts`
prints only the one permitted insertion, `derives the exact package export keys from the same face
map`, the file-scope case Ruling 20 allows after the pilot's README case and before the manifest
loop.

The `specification` binding, used only inside `describe('flagship fences', ...)`, moved out of the
shared region into that `describe` body, so the shared region no longer carries a
package-specific-use binding (`extractSourceLines` became unused and was dropped from the
`@orkestrel/guide` import list as a result).

Header line 2 and the `INTERNAL` doc block converged on the pilot's current wording: line 2 now
reads `this repo's own \`guides/README.md\` manifest. The constants that follow are this` and the
`INTERNAL` block reads `the assertion that follows it fails when a name here stops being stranded`
(no `below`). The pilot's header and `INTERNAL` sentence changed on disk mid-unit (Ruling 13's
amendment landing in its own closing unit); the edit here tracks that updated text rather than the
brief's originally quoted wording, since the brief's own criterion is "line 2 equals the pilot's."

Hunk: see `git diff tests/guides.test.ts` in the checkout; the full patch is reproduced below.

```diff
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
index 9493668..c956752 100644
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -1,8 +1,10 @@
-// The guides-parity gate: @orkestrel/guide's checks run against this repository's own
-// `guides/README.md` manifest, and every flagship fence in `guides/codec.md` is transcribed here
-// and asserted against what its comments claim. Name resolution is not a behavioural proof, so a
-// fence documenting a value the code contradicts is exactly what the transcriptions catch. Change
-// a fence, change its transcription.
+// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file. Every flagship fence
+// in `guides/codec.md` is transcribed at the end of this file and asserted against what
+// its comments claim: name resolution is not a behavioural proof, so a fence documenting a
+// value the code contradicts is exactly what the transcriptions catch. Change a fence,
+// change its transcription.
 
 import { readFileSync } from 'node:fs'
 import { describe, expect, it } from 'vitest'
@@ -12,7 +14,6 @@ import {
 	createSource,
 	createSourceManager,
 	extractFenceImports,
-	extractSourceLines,
 	findDrift,
 	findMissing,
 	findMissingSymbols,
@@ -64,8 +65,8 @@ const MODULES = Object.freeze({ '@orkestrel/codec': 'src/core' })
  * The alphabet and its reverse lookup are module data the codings read, not public API:
  * publishing an alphabet invites hand-rolling the coding it belongs to, which is the one thing
  * this package exists to remove. Naming them here is what makes the omission intentional rather
- * than forgotten, and the assertion below fails when a name here stops being stranded, so the
- * list cannot rot.
+ * than forgotten, and the assertion that follows it fails when a name here stops being stranded,
+ * so the list cannot rot.
  */
 const INTERNAL: readonly string[] = Object.freeze([
 	'const BASE64_ALPHABET',
@@ -87,7 +88,6 @@ const manifest = parseManifest(
 	'guides',
 )
 const sources = createSourceManager({ files, modules: MODULES })
-const specification = requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`)
 const own = requireValue(
 	manifest.find((entry) => entry.spec === GUIDE_SPEC),
 	`Missing manifest row: ${GUIDE_SPEC}`,
@@ -167,8 +167,7 @@ for (const entry of manifest) {
 			expect(findUnlisted(guide.fences(), FENCE_LANGUAGES)).toEqual([])
 		})
 
-		it('extracts non-empty barrel and documented surfaces', () => {
-			expect(source.surface().length).toBeGreaterThan(0)
+		it('extracts a non-empty documented surface', () => {
 			expect(guide.surface().length).toBeGreaterThan(0)
 		})
 		it('re-exports every direct declaration that is not named internal', () => {
@@ -196,7 +195,7 @@ for (const entry of manifest) {
 		for (const group of guide.methods()) {
 			const members = source.methods(group.interface).map((method) => method.name)
 			const documented = group.methods.map((method) => method.name)
-			const entity = group.interface.replace(/Interface$/u, '')
+			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
@@ -247,7 +246,6 @@ for (const entry of manifest) {
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(names.length).toBeGreaterThan(0)
 			expect(
 				findUnexampled(
 					names,
@@ -257,39 +255,37 @@ for (const entry of manifest) {
 			).toEqual([])
 		})
 
-		// The membership rule is `extractFenceImports`'s own grammar read off Guide's comment-aware source
-		// projection: a mapped specifier's bindings compare against that face's barrel surface, a
-		// repository alias and an unmapped true subpath of the root are refused because a public
-		// guide example must import through a published specifier, and a foreign package stays
-		// external and is compared against no face.
-		it('imports only real exports through published specifiers in every ts fence', () => {
-			const refused: string[] = []
-			const missing: string[] = []
-			for (const fence of guide.fences().filter((row) => row.language === EXAMPLE_LANGUAGE)) {
-				const projected = extractSourceLines(fence.code)
-					.map((line) => line.code)
-					.join('\n')
-				for (const statement of extractFenceImports(projected)) {
-					const specifier = statement.specifier
-					if (specifier.startsWith('@src/') || specifier.startsWith('@app/')) {
-						refused.push(specifier)
-						continue
-					}
-					const face = sources.source(specifier)
-					if (face === undefined) {
-						if (specifier === ROOT || specifier.startsWith(`${ROOT}/`)) refused.push(specifier)
-						continue
-					}
-					missing.push(
-						...findMissing(
-							statement.names,
-							face.surface().map((symbol) => symbol.name),
-						),
-					)
+		for (const group of guide.methods()) {
+			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
+			describe(`${group.interface} examples`, () => {
+				it('documents an example for every method', () => {
+					const fences = guide
+						.fences()
+						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
+						.map((fence) => fence.code)
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
+				})
+			})
+		}
+
+		it('imports only real exports in every ```ts fence', () => {
+			const fences = guide.fences().filter((fence) => fence.language === EXAMPLE_LANGUAGE)
+			for (const fence of fences) {
+				for (const { specifier, names } of extractFenceImports(fence.code)) {
+					const imported = sources.source(specifier)
+					if (imported === undefined) continue
+					const surface = imported.surface().map((symbol) => symbol.name)
+					expect(findMissing(names, surface)).toEqual([])
 				}
 			}
-			expect(refused).toEqual([])
-			expect(missing).toEqual([])
 		})
 
 		it('resolves every relative link', () => {
@@ -305,19 +301,8 @@ for (const entry of manifest) {
 				.tests()
 				.map((href) => resolveLink(entry.spec, href))
 				.filter((path) => !source.exists(path))
-			expect(guide.tests().length).toBeGreaterThan(0)
 			expect(missing).toEqual([])
 		})
-		// The Tests section is an inventory of what this package proves, so a proof that exists and
-		// is not listed is the defect. Listing is asserted as membership against the real test tree,
-		// because a count passes while the tree grows a file the section never gained.
-		it('lists every test file the repository carries', () => {
-			const listed = guide.tests().map((href) => resolveLink(entry.spec, href))
-			const present = Object.keys(files).filter((path) => path.endsWith('.test.ts'))
-
-			expect(present.length).toBeGreaterThan(0)
-			expect(present.filter((path) => !listed.includes(path))).toEqual([])
-		})
 	})
 }
 
@@ -327,6 +312,8 @@ for (const entry of manifest) {
 // value its comment claims.
 
 describe('flagship fences', () => {
+	const specification = requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`)
+
 	it('carries the sections the charter fixes', () => {
 		const sections = createGuide(specification).sections()
```

## Item 4 — propagation

`npx oxfmt --write guides/codec.md tests/guides.test.ts` ran; only `tests/guides.test.ts` needed a
write (`guides/codec.md` was already formatted). `npm run docs` and both write directions ran
afterward with no drift.

## Acceptance criteria

1. `git status --short`: `M tests/guides.test.ts` — the sole owned file touched.
2. Every `Shape`-carrying table check: no such table exists in `guides/codec.md`; both `grep`
   commands print nothing.
3. `diff` of the shared region (`const root = ...` through the manifest loop's closing brace)
   against `/home/user/fleet/abort/tests/guides.test.ts`'s same region prints only the one
   permitted addition, the `derives the exact package export keys from the same face map` case;
   header line 2 equals the pilot's current line 2 verbatim.
4. `npx oxfmt --check guides/codec.md tests/guides.test.ts`:
   ```
   Checking formatting...

   All matched files use the correct format.
   Finished in 724ms on 2 files using 4 threads.
   ```
   exit 0. `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`: no output,
   exit 0.
5. `npm run docs`:
   ```
   rows read: 1, disagreements found: 0
   ```
   `npm run docs -- --to guide` and `-- --to source`:
   ```
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```
6. `npm run test:guides`:
   ```
   Test Files  1 passed (1)
        Tests  27 passed (27)
     Duration  483ms (transform 145ms, setup 172ms, import 110ms, tests 73ms, environment 0ms)
   ```
   `npm run test:policy`:
   ```
   Test Files  1 passed (1)
        Tests  90 passed | 1 skipped (91)
     Duration  609ms (transform 203ms, setup 178ms, import 109ms, tests 190ms, environment 0ms)
   ```

## Deviation note

`/home/user/fleet/abort/tests/guides.test.ts` (the pilot) changed on disk mid-unit — its header
comment and `INTERNAL` doc-block sentence moved to Ruling 13's amended wording (`that follow`
rather than `below`; the constants sentence dropped "and are the only part a sibling package
changes" for "as is the executed section that closes the file"). This unit's edit tracks that
updated pilot text rather than the wording the brief originally quoted, per the brief's own
criterion ("line 2 equals the pilot's"). Re-verified the shared region against the updated pilot
file: unchanged outside the header, so no other edit was needed on that account. No other deviation
occurred.
