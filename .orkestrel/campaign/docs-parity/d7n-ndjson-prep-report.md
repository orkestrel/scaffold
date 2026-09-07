# Report — `d7n-ndjson-prep`

Wall clock: 2026-09-07T15:22:30Z (first command) to 2026-09-07T15:25:13Z (last command).

## Item 1 — `repair --offline`

Command: `node <tip>/dist/bin/main.js repair --offline`

Summary line: `9 written, 27 unchanged, 0 removed in ..`

`git status --short` after:

```
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

Matches the P21 list exactly.

## Item 2 — drop-in's adaptation (`tests/guides.test.ts`)

Hunk:

```diff
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ methods loop
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
@@ examples case
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
@@ examples loop
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
+					const documented = group.methods.map((method) => method.name)
 					const examples =
 						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+							? source.examples(group.interface).map((example) => example.name)
+							: source
+									.examples(group.interface)
+									.concat(source.examples(entity))
+									.map((example) => example.name)
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
```

No other change to the suite. The import-walk `findMissing` call (`statement.names` against
`face.surface().map((symbol) => symbol.name)`) and the `names`/`surface` call at the end of the
file were already string-to-string and were left unchanged.

## Item 3 — voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1, before any fix:

```
tests/setup.ts:30:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setup.ts:43:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setup.ts:43:1: error policy(no-malformed-summary): State what the symbol does without naming chunkings in the first sentence.
tests/setup.ts:68:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/src/core/NDJSONParser.test.ts:497:37: error policy(no-banned-term): Replace just in this comment: delete.
```

Per-diagnostic fix:

`tests/setup.ts:30` (`no-malformed-summary`, verb-`s` opener) — `feedAll`:

```diff
-/**
- * Feed every chunk in `chunks` to `parser.parse(...)` in order and flatten the
- * decoded records into a single array.
- */
+/**
+ * Feeds every chunk in `chunks` to `parser.parse(...)` in order and flattens
+ * the decoded records into a single array.
+ */
```

`tests/setup.ts:43` (`no-malformed-summary`, verb-`s` opener and self-name `chunkings` in the
first sentence) — `chunkings`:

```diff
-/**
- * Partition `stream` into a fixed set of chunkings for partition-invariance
- * testing: one chunking per fixed size in `sizes` (default `{1,2,3,5,7,13,len}`)
- * plus every two-way single-cut split (`stream.slice(0, cut)` /
- * `stream.slice(cut)` for every `cut` from `0` to `stream.length`).
- */
+/**
+ * Builds a fixed set of partitions of `stream` for partition-invariance
+ * testing: one partition per fixed size in `sizes` (default
+ * `{1,2,3,5,7,13,len}`) plus every two-way single-cut split
+ * (`stream.slice(0, cut)` / `stream.slice(cut)` for every `cut` from `0` to
+ * `stream.length`).
+ */
```

`tests/setup.ts:68` (`no-malformed-summary`, verb-`s` opener) — `partition`:

```diff
-/**
- * Split `stream` into a random sequence of non-empty chunks driven by `rng`
- * (for example the `seededRandom` function from `@orkestrel/contract`) — every
- * call consumes at least one character, so it always terminates.
- */
+/**
+ * Splits `stream` into a random sequence of non-empty chunks driven by `rng`
+ * (for example the `seededRandom` function from `@orkestrel/contract`) — every
+ * call consumes at least one character, so it always terminates.
+ */
```

`tests/src/core/NDJSONParser.test.ts:497` (`no-banned-term`, `just` deleted per substitution
table):

```diff
-		expect(first).toEqual([{ a: 1 }]) // still just its own record
+		expect(first).toEqual([{ a: 1 }]) // still its own record
```

`npx oxlint --config .oxlintrc.json --deny-warnings .` after these edits: no output, exit 0.

`npm run test:policy` after item 1 (before item 3's edits, prose sweep over `guides/**` and
`README.md`) already read clean — no line in `guides/**` or `README.md` failed the `prose` rule, so
no substitution-table edit was needed in either file. Confirmed again after item 3: `Test Files 1
passed (1)`, `Tests 90 passed | 1 skipped (91)`.

No diagnostic named a file outside scope.

## Item 4 — the bump

```diff
-	"version": "0.0.9",
+	"version": "0.0.10",
```

`package-lock.json` was not touched.

## Criteria

1. `git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/src/core/NDJSONParser.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is the P21 repair list plus `tests/guides.test.ts` (item 2), `tests/setup.ts` and
`tests/src/core/NDJSONParser.test.ts` (item 3, diagnostics above), and `package.json` (version),
and nothing else.

2. Gates:

- `npm run format:check` → `All matched files use the correct format.` — exit 0.
- `npx oxlint --config .oxlintrc.json --deny-warnings .` → no output — exit 0.
- `npm run check` → `tsc --noEmit --project tsconfig.json && npm run check:src` then
  `check:src:core` → `tsc --noEmit -p configs/src/tsconfig.core.json`, no diagnostics — exit 0.

3. Tests:

- `npm run test:guides` → `Test Files  1 passed (1)` / `Tests  28 passed (28)` — exit 0.
- `npm run test:policy` → `Test Files  1 passed (1)` / `Tests  90 passed | 1 skipped (91)` — exit 0.
- `npm run test:config` → `Test Files  1 passed (1)` / `Tests  172 passed | 1 skipped (173)` — exit
  0.

4. `npm run docs`:

```
guides/ndjson.md interface NDJSONParserInterface: guide absent source "Represents a stateful NDJSON (newline-delimited JSON) stream parser: feed it string chunks, get back the complete records decoded so far. A trailing partial line is buffered until the rest arrives."
guides/ndjson.md function createNDJSONParser: guide absent source "Creates an NDJSON (newline-delimited JSON) stream parser - a stateful handle that turns string chunks into the complete records decoded so far."
guides/ndjson.md class NDJSONParser: guide "The stateful NDJSON stream parser — implements `NDJSONParserInterface`, reassembles records split across chunks." source "Decodes an NDJSON (newline-delimited JSON) stream statefully — feed the handle string chunks, get back the complete records decoded so far."
guides/ndjson.md NDJSONParserInterface.parse: guide absent source "Appends `chunk`, then returns every COMPLETE `\n`-terminated line parsed to a record (malformed / non-record lines are skipped); a trailing partial line is retained for the next call."
guides/ndjson.md NDJSONParserInterface.clear: guide absent source "Drops any buffered partial line, leaving the handle ready for a fresh stream."
guides/ndjson.md pitch: readme absent tagline "A stateful newline-delimited-JSON (NDJSON) stream parser: feed it string chunks, get back the complete records parsed so far. `parse(chunk)` appends `chunk` to an internal buffer and splits it on `\n` — every line before the last is `\n`-terminated, hence complete, and is parsed to a record; the final segment is the trailing partial line and is held back for the next call, so a line split across chunk boundaries is reassembled the moment its closing `\n` arrives. Each trimmed line is filtered: a blank / whitespace-only line (including one whose only content was a CRLF's trailing `\r`) is skipped, malformed JSON is silently skipped (never thrown), and a non-record value (an array, a primitive, `null`) is dropped — only plain records come back. A never-terminated line is never emitted, even when the buffered text already happens to be valid JSON. `clear()` drops the buffered partial line so a handle can be reused for a fresh stream. A self-contained primitive — no Emitter, no server / HTTP / agent coupling; `parse` never throws on malformed, blank, or non-record input. Pair it with a streaming `TextDecoder` when reading a byte stream: the decoder handles partial characters, the parser handles partial lines. A line that is never terminated by a newline stays in the buffer until its newline arrives — the parser has no size limit, so a caller fronting an untrusted or unbounded upstream must enforce its own byte cap before feeding chunks in. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 6
```

Exit 1, as expected — this is the converge unit's worklist.

## Ancillary decisions

- Rewrote the `chunkings` doc block's opener as "Builds a fixed set of partitions of `stream`
  for partition-invariance testing" to satisfy both the verb-`s` requirement and the ban on
  naming `chunkings` in the first sentence, without naming the symbol `chunkings` itself; every
  fact the paragraph carried (the fixed sizes, the default, the two-way single-cut split) is kept.
- Wrapped the two `findUnexampled`/`findMissing` calls whose new argument no longer fits one line
  across multiple lines; `npm run format` (`oxfmt`) reformatted the file to its house style
  afterward, and `format:check` confirms the result is already formatter-clean.

No deviation occurred.
