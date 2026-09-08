# Report — `d7n-database-close-2`

## Deviation, resolved in place

Item 2's brief described `tests/guides.test.ts` as carrying two `for (const entry of manifest)`
loops (a pilot loop about lines 112-258, a package-own second loop about lines 643-821), citing
`documents every barrel export` / `documents only barrel exports` at lines 135-140 as the first
loop's content the second loop's `documents every published entry export` / `documents only real
exports` replaced.

Found: at the committed tip `232d2a1`, `tests/guides.test.ts` carries exactly one
`for (const entry of manifest)` loop, at line 643. `git log --all -p -- tests/guides.test.ts | grep
'documents every barrel export'` returns nothing across this repository's history; those names and
line numbers belong to the pilot's own file, `/home/user/fleet/abort/tests/guides.test.ts:133-140`,
not to a second loop here. The single loop already carried `documents every published entry
export` / `documents only real entry exports` in place of the pilot's `documents every barrel
export` / `documents only barrel exports`, and was missing the pilot's `re-exports only direct
declarations` case outright.

I ran the question rather than reasoning about it: a throwaway probe
(`tmp/d7n-database-close-2/probe.mjs`, swept before finishing — `tmp/` is gitignored) computed
`source.surface()` (the pilot's barrel-based population, three directories combined) against the
manifest loop's compiler-derived `surface` variable. Both read 135 symbols with zero difference
either direction, and both matched `guide.surface()` exactly, confirmed again inline in
`tests/guides.test.ts` under a temporary `it('PROBE ...')` case removed before the final diff. The
two populations are the same set computed two ways, so `documents every published entry export` /
`documents only real entry exports` are the duplicate Ruling 20 names, not an addition; they read no
population the pilot's cases do not.

Applied Ruling 20 as the closing brief directs: struck the duplicate pair, restored the pilot's
`re-exports only direct declarations` / `documents every barrel export` / `documents only barrel
exports` in the pilot's position (byte-identical to
`/home/user/fleet/abort/tests/guides.test.ts:129-137`), and moved the package's two genuinely
additive cases — `compiles every TypeScript fence against the published entry specifiers` (drives
the real TypeScript compiler over the fences; the pilot's `imports only real exports` case is a
name-existence check, a different population) and `keeps table, query, and transaction
implementations internal` (a population outside barrel/entry-export comparison entirely) — to sit
appended after every pilot case, per Ruling 20's "appended after the pilot's cases." The pilot's own
region (the standalone `it`s and the `describe('compiler entry surfaces', ...)` block above line
643) was not touched.

## Changes

- `/home/user/fleet/database/src/core/constants.ts`: `DEFAULT_PRIMARY`'s and
  `MAX_PATTERN_LENGTH`'s doc-block description sentences now name their literals (`'id'`, `1024
  characters`), per Ruling 18.
- `/home/user/fleet/database/guides/database.md`: the `DEFAULT_PRIMARY` and `MAX_PATTERN_LENGTH`
  Constants rows' `Shape` cells changed from the literal (`'id'`, `1024`) to the declared type
  (`string`, `number`), per Ruling 21; their `Summary` cells carry the widened doc-block sentences
  through `npm run docs -- --to guide` (0 written; the cells already matched byte for byte).
- `/home/user/fleet/database/tests/guides.test.ts`: in the single manifest loop, struck `documents
  every published entry export` / `documents only real entry exports` as duplicates of the pilot's
  barrel-based population; restored the pilot's `re-exports only direct declarations`, `documents
  every barrel export`, `documents only barrel exports` in the pilot's position; moved `compiles
  every TypeScript fence against the published entry specifiers` and `keeps table, query, and
  transaction implementations internal` to the end of the `describe` block, after every pilot case.

## Item 1 hunk

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
@@ -3,7 +3,7 @@ import type { ColumnSchema, TableSchema } from './types.js'
 // Database constants — frozen plain data.

 /**
- * Supplies the primary-key column assumed when {@link PrimaryMap} does not name one.
+ * Supplies the primary-key column, `'id'`, assumed when {@link PrimaryMap} does not name one.
  *
  * @remarks
  * `id` is the convention IndexedDB (`keyPath: 'id'`) and SQL (`id` / rowid) both
@@ -12,7 +12,8 @@ import type { ColumnSchema, TableSchema } from './types.js'
 export const DEFAULT_PRIMARY = 'id'

 /**
- * Sets the longest `LIKE` / `GLOB` pattern the wildcard matcher accepts before rejecting it.
+ * Sets the longest `LIKE` / `GLOB` pattern the wildcard matcher accepts, 1024 characters, before
+ * rejecting it.
  *
  * @remarks
  * A `LIKE` / `GLOB` pattern is a caller-supplied operand, so

diff --git a/guides/database.md b/guides/database.md
@@ -238,8 +238,8 @@ A `Shape` cell holds the constant's declared type.

 | Constant                   | Kind  | Shape                    | Summary                                                                                                       |
 | -------------------------- | ----- | ------------------------ | ------------------------------------------------------------------------------------------------------------- |
-| `DEFAULT_PRIMARY`          | const | `'id'`                   | Supplies the primary-key column assumed when `PrimaryMap` does not name one.                                  |
-| `MAX_PATTERN_LENGTH`       | const | `1024`                   | Sets the longest `LIKE` / `GLOB` pattern the wildcard matcher accepts before rejecting it.                    |
+| `DEFAULT_PRIMARY`          | const | `string`                 | Supplies the primary-key column, `'id'`, assumed when `PrimaryMap` does not name one.                         |
+| `MAX_PATTERN_LENGTH`       | const | `number`                 | Sets the longest `LIKE` / `GLOB` pattern the wildcard matcher accepts, 1024 characters, before rejecting it.  |
 | `CONFORMANCE_USERS_SCHEMA` | const | `TableSchema`            | Describes the `users` table the driver-conformance battery opens — keyed by the default `id` primary column.  |
```

## Item 2 hunk

```diff
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
@@ -659,14 +659,6 @@ for (const entry of manifest) {
 		it('extracts a non-empty documented surface', () => {
 			expect(guide.surface().length).toBeGreaterThan(0)
 		})
-
-		it('documents every published entry export', () => {
-			expect(findMissingSymbols(surface, guide.surface())).toEqual([])
-		})
-		it('documents only real entry exports', () => {
-			expect(findMissingSymbols(guide.surface(), surface)).toEqual([])
-		})
-
 		it('re-exports every direct declaration that is not named internal', () => {
 			const stranded = findMissingSymbols(source.exports(), source.surface())
 			expect(stranded.filter((key) => !INTERNAL.includes(key))).toEqual([])
@@ -675,6 +667,15 @@ for (const entry of manifest) {
 			const stranded = findMissingSymbols(source.exports(), source.surface())
 			expect(INTERNAL.filter((key) => !stranded.includes(key))).toEqual([])
 		})
+		it('re-exports only direct declarations', () => {
+			expect(findMissingSymbols(source.surface(), source.exports())).toEqual([])
+		})
+		it('documents every barrel export', () => {
+			expect(findMissingSymbols(source.surface(), guide.surface())).toEqual([])
+		})
+		it('documents only barrel exports', () => {
+			expect(findMissingSymbols(guide.surface(), source.surface())).toEqual([])
+		})

 		it('exposes no hidden module-scope declarations', () => {
 			expect(source.hidden().map(computeSymbolKey)).toEqual([])
@@ -743,19 +744,6 @@ for (const entry of manifest) {
 			).toEqual([])
 		})

-		it('compiles every TypeScript fence against the published entry specifiers', () => {
-			expect(() =>
-				checkGuideFences(
-					join(ROOT, 'tsconfig.json'),
-					requireValue(files[entry.spec], `Missing file: ${entry.spec}`),
-					guide
-						.fences()
-						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
-						.map((fence) => fence.code),
-				),
-			).not.toThrow()
-		}, 60_000)
-
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
 			const documented = group.methods.map((method) => method.name)
@@ -789,19 +777,6 @@ for (const entry of manifest) {
 			}
 		})

-		it('keeps table, query, and transaction implementations internal', () => {
-			const names = surface.map((symbol) => symbol.name)
-			expect(names).not.toContain('Table')
-			expect(names).not.toContain('Query')
-			expect(names).not.toContain('DatabaseTransaction')
-			expect(names).not.toContain('ScopedIterator')
-			expect(names).not.toContain('TransactionScope')
-			expect(names).toContain('TableInterface')
-			expect(names).toContain('QueryInterface')
-			expect(source.methods('TableInterface').map((method) => method.name)).toContain('count')
-			expect(source.methods('QueryInterface').map((method) => method.name)).toContain('count')
-		})
-
 		it('resolves every relative link', () => {
 			const broken = guide
 				.links()
@@ -817,5 +792,31 @@ for (const entry of manifest) {
 				.filter((path) => !source.exists(path))
 			expect(missing).toEqual([])
 		})
+
+		it('compiles every TypeScript fence against the published entry specifiers', () => {
+			expect(() =>
+				checkGuideFences(
+					join(ROOT, 'tsconfig.json'),
+					requireValue(files[entry.spec], `Missing file: ${entry.spec}`),
+					guide
+						.fences()
+						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
+						.map((fence) => fence.code),
+				),
+			).not.toThrow()
+		}, 60_000)
+
+		it('keeps table, query, and transaction implementations internal', () => {
+			const names = surface.map((symbol) => symbol.name)
+			expect(names).not.toContain('Table')
+			expect(names).not.toContain('Query')
+			expect(names).not.toContain('DatabaseTransaction')
+			expect(names).not.toContain('ScopedIterator')
+			expect(names).not.toContain('TransactionScope')
+			expect(names).toContain('TableInterface')
+			expect(names).toContain('QueryInterface')
+			expect(source.methods('TableInterface').map((method) => method.name)).toContain('count')
+			expect(source.methods('QueryInterface').map((method) => method.name)).toContain('count')
+		})
 	})
 }
```

## Acceptance criteria

1. `git status --short` in `/home/user/fleet/database`:
   ```
    M guides/database.md
    M src/core/constants.ts
    M tests/guides.test.ts
   ```
   Owned files only; the throwaway probe under `tmp/d7n-database-close-2/` is gitignored (`tmp` in
   `.gitignore:11`) and was removed before this report, so no residue.

2. Empty-`Shape`-cell sweep:
   ```
   $ grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/database.md
   ```
   prints nothing.
   Fence-lead-in sweep:
   ```
   $ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/database.md
   ```
   prints nothing.
   Drop-in header diff:
   ```
   $ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
   ```
   prints nothing.

3. ```
   $ npx oxfmt --config .oxfmtrc.json --check guides/database.md tests/guides.test.ts
   Checking formatting...
   All matched files use the correct format.
   Finished in 921ms on 2 files using 4 threads.

   $ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
   (no output, exit 0)
   ```

4. ```
   $ PATH=/opt/npm11/bin:$PATH npm run docs
   > @orkestrel/database@0.0.14 docs
   > node --experimental-strip-types scripts/docs.ts
   rows read: 1, disagreements found: 0

   $ node --experimental-strip-types scripts/docs.ts --to guide
   rows read: 1, disagreements found: 0, written: 0, reported: 0

   $ node --experimental-strip-types scripts/docs.ts --to source
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```

5. ```
   $ PATH=/opt/npm11/bin:$PATH npm run test:guides
   > @orkestrel/database@0.0.14 test:guides
   > vitest run --config vite.config.ts --no-cache --reporter=dot --project guides
    Test Files  1 passed (1)
         Tests  88 passed (88)
     Duration  30.38s
   ```

No off-limits file was touched. No code token moved; every hunk sits inside a doc-block description
sentence, a guide table cell, or a test case's presence/position within its owning `describe` block.

---

Orchestrator's annotation (2026-09-08): after this unit landed, the owner's `57eb898` on `origin/main` was merged into the branch as `cdbf66a`; the lockfile conflicted, and the Orchestrator regenerated `package-lock.json` from the merged manifest with `npm install --package-lock-only` (root `0.0.14`, guide `0.0.17` as the registry serves) rather than editing it by hand; `npm run docs` read zero and the scoped gates green on the merged tree; the closure's verifier runs the whole chain over it.
