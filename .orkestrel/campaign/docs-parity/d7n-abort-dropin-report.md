# Report — `d7n-abort-dropin`

## Hunks

```diff
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -36,7 +36,7 @@ const MODULES = Object.freeze({ '@orkestrel/abort': 'src/core', '@src/core': 'sr
  *
  * A class that one-class-per-file evicted from its single consumer cannot become a
  * local, so it stays exported without being public. Naming it here is what makes that
- * intentional rather than forgotten — and the second assertion below fails when a name
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
  * here stops being stranded, so the list cannot rot.
  */
 const INTERNAL: readonly string[] = Object.freeze([])
@@ -170,24 +170,6 @@ for (const entry of manifest) {
 			})
 		}
 
-		// The equality gate: a `Summary` cell against its export's description paragraph, a
-		// titled fence against the `@example` of that title. `findDrift` owns the comparison
-		// and names both sides; converge the two sides with `npm run docs`, never by
-		// weakening this assertion. `findDrift` pairs an example only where a title is
-		// present on both sides, so an untitled `@example` block is outside this case. Each
-		// collected line is the spec, the key, and each side's text or `absent` — the same
-		// worklist `npm run docs` prints, so a failure here is read the way that command's
-		// output is.
-		it('keeps every compared summary and example equal to its source', () => {
-			const disagreeing: string[] = []
-			for (const drift of findDrift(guide, source)) {
-				const left = drift.guide === undefined ? 'absent' : JSON.stringify(drift.guide)
-				const right = drift.source === undefined ? 'absent' : JSON.stringify(drift.source)
-				disagreeing.push(`${entry.spec} ${drift.key}: guide ${left} source ${right}`)
-			}
-			expect(disagreeing).toEqual([])
-		})
-
 		it('documents an example for every Surface function', () => {
 			const fences = guide
 				.fences()
@@ -227,6 +209,24 @@ for (const entry of manifest) {
 			})
 		}
 
+		// The equality gate: a `Summary` cell against its export's description paragraph, a
+		// titled fence against the `@example` of that title. `findDrift` owns the comparison
+		// and names both sides; converge the two sides with `npm run docs`, never by
+		// weakening this assertion. `findDrift` pairs an example only where a title is
+		// present on both sides, so an untitled `@example` block is outside this case. Each
+		// collected line is the spec, the key, and each side's text or `absent` — the same
+		// worklist `npm run docs` prints, so a failure here is read the way that command's
+		// output is.
+		it('keeps every compared summary and example equal to its source', () => {
+			const disagreeing: string[] = []
+			for (const drift of findDrift(guide, source)) {
+				const left = drift.guide === undefined ? 'absent' : JSON.stringify(drift.guide)
+				const right = drift.source === undefined ? 'absent' : JSON.stringify(drift.source)
+				disagreeing.push(`${entry.spec} ${drift.key}: guide ${left} source ${right}`)
+			}
+			expect(disagreeing).toEqual([])
+		})
+
 		it('imports only real exports in every ```ts fence', () => {
 			const fences = guide.fences().filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 			for (const fence of fences) {
```

## Acceptance criteria

### 1. `npx oxfmt --check tests/guides.test.ts`

```
Checking formatting...

All matched files use the correct format.
Finished in 83ms on 1 files using 4 threads.
```

Exit 0.

### 1. `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`

No output. Exit 0.

### 1. `npm run check`

```
> @orkestrel/abort@0.0.10 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/abort@0.0.10 check:src
> npm run check:src:core

> @orkestrel/abort@0.0.10 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

Exit 0.

### 2. `npm run test:guides`

```
> @orkestrel/abort@0.0.10 test:guides
> vitest run --config vite.config.ts --no-cache --reporter=dot --project guides

 RUN  v4.1.11 /home/user/fleet/abort

·························

 Test Files  1 passed (1)
      Tests  25 passed (25)
   Start at  16:11:23
   Duration  1.36s (transform 312ms, setup 29ms, import 827ms, tests 124ms, environment 0ms)
```

Exit 0.

### 3. `git status --short`

```
 M tests/guides.test.ts
```

## Correction

The equality case `keeps every compared summary and example equal to its source`, with its leading
comment, moves back to its baseline position: directly after the methods loop's closing `}` and
before `documents an example for every Surface function`. Item 1 (the `INTERNAL` doc-block wording)
stands unchanged.

### Hunk

```diff
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
index 85b2b17..fca197d 100644
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -36,7 +36,7 @@ const MODULES = Object.freeze({ '@orkestrel/abort': 'src/core', '@src/core': 'sr
  *
  * A class that one-class-per-file evicted from its single consumer cannot become a
  * local, so it stays exported without being public. Naming it here is what makes that
- * intentional rather than forgotten — and the second assertion below fails when a name
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
  * here stops being stranded, so the list cannot rot.
  */
 const INTERNAL: readonly string[] = Object.freeze([])
```

### Runs

`npm run format` — ran `oxfmt --config .oxfmtrc.json --write . tests/guides.test.ts`, finished on
40 files, no failure reported.

`npx oxfmt --check tests/guides.test.ts`:

```
Checking formatting...

All matched files use the correct format.
Finished in 15ms on 1 files using 4 threads.
```

Exit 0.

`npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`: no output. Exit 0.

`npm run check`:

```
> @orkestrel/abort@0.0.10 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/abort@0.0.10 check:src
> npm run check:src:core

> @orkestrel/abort@0.0.10 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

Exit 0.

`npm run test:guides`:

```
> @orkestrel/abort@0.0.10 test:guides
> vitest run --config vite.config.ts --no-cache --reporter=dot --project guides

 RUN  v4.1.11 /home/user/fleet/abort

·························

 Test Files  1 passed (1)
      Tests  25 passed (25)
   Start at  16:13:20
   Duration  1.65s (transform 309ms, setup 40ms, import 868ms, tests 206ms, environment 0ms)
```

Exit 0.

`git diff --stat`:

```
 tests/guides.test.ts | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
