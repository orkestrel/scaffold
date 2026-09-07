# Report — `d7n-ndjson-converge-fix`

Every item landed. Every acceptance criterion is green. No deviation.

## Per item

### 1. The drop-in (claim 15, Ruling 13)

`tests/guides.test.ts`. The `INTERNAL` doc block takes the pilot's corrected wording, and `documented` and the mapped `examples` move to the examples loop's own scope above its `describe`, each side mapped then concatenated.

```diff
- * intentional rather than forgotten — and the second assertion below fails when a name
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
@@
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
@@
 						.map((fence) => fence.code)
-					const documented = group.methods.map((method) => method.name)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface).map((example) => example.name)
-							: source
-									.examples(group.interface)
-									.concat(source.examples(entity))
-									.map((example) => example.name)
 					expect(findUnexampled(documented, fences, examples)).toEqual([])
```

Byte equality against the pilot, over the region running from the constants' doc comments through the manifest loop's close:

```text
$ sed -n '26,258p' abort/tests/guides.test.ts > a.txt
$ sed -n '29,261p' ndjson/tests/guides.test.ts > n.txt
$ diff a.txt n.txt
6c6
< const GUIDE_SPEC = 'guides/abort.md'
---
> const GUIDE_SPEC = 'guides/ndjson.md'
8c8
< const MODULES = Object.freeze({ '@orkestrel/abort': 'src/core', '@src/core': 'src/core' })
---
> const MODULES = Object.freeze({ '@orkestrel/ndjson': 'src/core', '@src/core': 'src/core' })
```

The only remaining difference is the two constant values. See § Boundary applied for what I read as "this package's constants" and what I left alone outside that region.

### 2. `## Tests` and `## See also` (claim 22, objective 5)

`guides/ndjson.md`, appended in the pilot's shape.

```diff
+## Tests
+
+- [`tests/guides.test.ts`](../tests/guides.test.ts) — the `## Surface` ↔ `src/core` bijection (value and type exports), the `NDJSONParserInterface` ↔ `NDJSONParser` method bijection, and the equality gate: every `Summary` cell against its declaration's description paragraph, the titled `Create a parser` fence against the `@example` block of that title (pinned so the titled pair cannot be retired silently), and the README pitch against this guide's tagline. It also runs the flagship fences and asserts the values their comments claim.
+- [`tests/src/core/NDJSONParser.test.ts`](../tests/src/core/NDJSONParser.test.ts) — that `parse` returns the same records however a stream is cut into chunks, skipping malformed, blank, and non-record lines, withholding a line the stream never terminates, and never throwing on any input.
+- [`tests/policy.test.ts`](../tests/policy.test.ts) — repository coding law: source placement, exports, readonly contracts, syntax, and the prose this guide is written in.
+- [`tests/config.test.ts`](../tests/config.test.ts) — the root configuration's aliases and projects, the policy Oxlint plugin's rules against its rule tester, and the configuration helpers.
+
+## See also
+
+- [`AGENTS.md`](../AGENTS.md) — the pointer to the `@orkestrel/scaffold` coding contract this package is written to.
+- [`README.md`](README.md) — the guides index.
```

The `resolves every relative link` and `links only to test files that exist` cases pass over the added links, so every path resolves.

### 3. The titled example's heading (claim 22, Ruling 9)

`#### Create a parser` sits directly above the fence under `### Factories`, and the block is retitled to that text.

```diff
+#### Create a parser
+
 ```ts
```

```diff
- * @example Factories
+ * @example Create a parser
```

Heading-scoped occurrence:

```text
$ grep -c "^#\{1,6\} Create a parser$" guides/ndjson.md
1
```

The prose at `guides/ndjson.md:25` opens with the words "Create a parser" as a sentence, not as a heading, so the heading-scoped match stays single.

### 4. The demonstration (N-1, Ruling 14)

Both sides carry the buffering demonstration, with the spaced em dash the brief names.

```diff
  * parser.parse('{"a":1}\n{"b":2}\n') // [{ a: 1 }, { b: 2 }]
+ * parser.parse('{"c":3}') // [] — buffered until its trailing newline arrives
+ * parser.parse('\n') // [{ c: 3 }]
```

```diff
 parser.parse('{"a":1}\n{"b":2}\n') // [{ a: 1 }, { b: 2 }]
+parser.parse('{"c":3}') // [] — buffered until its trailing newline arrives
+parser.parse('\n') // [{ c: 3 }]
```

The fence grew, so its executed case and its presence guard grew with it. `tests/guides.test.ts` states that each transcription is "paired with a presence guard binding that fence's whole body", and leaving the guard at the shorter body would have made that sentence false and left the restored demonstration unproven.

```diff
-	it('returns the Factories fence values from one chunk carrying two lines', () => {
-		expect(createNDJSONParser().parse('{"a":1}\n{"b":2}\n')).toEqual([{ a: 1 }, { b: 2 }])
+	it('returns the Factories fence values, holding the unterminated line for its newline', () => {
+		const parser = createNDJSONParser()
+
+		expect(parser.parse('{"a":1}\n{"b":2}\n')).toEqual([{ a: 1 }, { b: 2 }])
+		expect(parser.parse('{"c":3}')).toEqual([])
+		expect(parser.parse('\n')).toEqual([{ c: 3 }])
 	})
@@
-			'const parser = createNDJSONParser()\nparser.parse(\'{"a":1}\\n{"b":2}\\n\') // [{ a: 1 }, { b: 2 }]',
+			'const parser = createNDJSONParser()\nparser.parse(\'{"a":1}\\n{"b":2}\\n\') // [{ a: 1 }, { b: 2 }]\nparser.parse(\'{"c":3}\') // [] — buffered until its trailing newline arrives\nparser.parse(\'\\n\') // [{ c: 3 }]',
```

Failing first, over the same assertion against the baseline guide and the fixed guide:

```text
$ node -e "<extended guard string> against git show HEAD:guides/ndjson.md and the working copy"
baseline guide contains extended guard: false
fixed guide contains extended guard: true
```

Read that as the honest split it is. The presence half was red at the baseline and is green now. The executed half was never red: `parse` already buffered an unterminated line, and what was missing was the demonstration of it, which is what N-1 names.

### 5. The buffer caveat (N-2)

`guides/ndjson.md`, directly under the `## Methods` table and above its fence, in the brief's words.

```diff
+`parse` holds an unterminated line indefinitely and the buffer has no size
+limit, so a caller fronting an untrusted upstream enforces its own byte cap.
```

It sits outside the compared column, and `npm run docs` stays at zero disagreements.

### 6. `chunkings` (N-3, objective 3)

`tests/setup.ts`, the `chunkings` block, in sse's wording.

```diff
- * Builds a fixed set of partitions of `stream` for partition-invariance
- * testing: one partition per fixed size in `sizes` (default
+ * Splits `stream` into a fixed set of chunk sequences for chunking-invariance
+ * testing: one sequence per fixed size in `sizes` (default
```

The product noun is the chunk sequence, the opener is verb-first and does not name `chunkings`, and the voice rule stays green under `oxlint --deny-warnings`. I took sse's sentence and substituted "chunking-invariance" for its "partition-invariance", because the brief also requires `partition` to be the sole owner of "partition", and "chunking invariance" is the term `tests/src/core/NDJSONParser.test.ts:513` already uses for the property. Standalone "partition" now appears only at the `partition` export:

```text
$ grep -n "partition" tests/setup.ts
6:// line-terminator constants and corpus-partitioning helpers for chunk-boundary
7:// invariance testing. Seeded-fuzz partitioning uses @orkestrel/contract's
28:// ── NDJSONParser corpus-partitioning helpers (generic, environment-agnostic) ─
74:export function partition(stream: string, rng: () => number): readonly string[] {
```

Lines 6, 7, and 28 carry "partitioning" as a section-level gerund over all the file's helpers, and they sit outside the `chunkings` block the brief scopes me to. See § Observations.

### 7. Links in descriptions (objective 2)

```diff
- * `NDJSONParserInterface` — a fresh `NDJSONParser` holding the buffer, so a caller
- * holds the published contract rather than the class.
+ * {@link NDJSONParserInterface} — a fresh {@link NDJSONParser} holding the buffer,
+ * so a caller holds the published contract rather than the class.
```

```diff
- * `NDJSONParserInterface` over a private buffer the instance owns — each `parse` call
- * returns the records completed so far and reassembles a record split across chunk
- * boundaries.
+ * {@link NDJSONParserInterface} over a private buffer the instance owns — each `parse`
+ * call returns the records completed so far and reassembles a record split across
+ * chunk boundaries.
```

The compared form is unchanged: `findDrift` renders a `{@link}` as its target's code token, and `npm run docs` reports zero disagreements with the guide cells untouched. `src/core/types.ts` needed no such edit; its remaining code spans name members (`parse`, `clear`) and a parameter (`chunk`), not declarations.

### 8. Gates

Covered under § Acceptance criteria.

## Acceptance criteria

### 1. Format, lint, and typecheck

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/ndjson.md README.md src/core tests/setup.ts tests/guides.test.ts
All matched files use the correct format.
Finished in 492ms on 8 files using 4 threads.
oxfmt exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings src/core tests/setup.ts tests/guides.test.ts
oxlint exit=0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
check exit=0
```

### 2. Docs and the scoped suites

```text
$ npm run docs
rows read: 1, disagreements found: 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  31 passed (31)
guides exit=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
policy exit=0

$ npm run test:src:core
 Test Files  2 passed (2)
      Tests  70 passed (70)
src:core exit=0
```

The skipped policy case is the baseline's own skip; it is unrelated to this unit's files.

### 3. Status lists the owned files only

```text
$ git status --short
 M guides/ndjson.md
 M src/core/NDJSONParser.ts
 M src/core/factories.ts
 M tests/guides.test.ts
 M tests/setup.ts
```

`README.md` is owned and unchanged: nothing in the items reached it.

## Diffstat

```text
 guides/ndjson.md         | 19 +++++++++++++++++++
 src/core/NDJSONParser.ts |  6 +++---
 src/core/factories.ts    |  8 +++++---
 tests/guides.test.ts     | 28 ++++++++++++++++------------
 tests/setup.ts           |  4 ++--
 5 files changed, 45 insertions(+), 20 deletions(-)
```

## Whole suite

Reported as my own reading, not as a criterion:

```text
$ npm test
npm-test exit=0
```

Every project passed: `src:core`, `policy`, `config`, `setup`, `guides`.

## Boundary applied

The brief's "the file matches the pilot byte for byte outside this package's constants" cannot be read literally, because `feed`, the `@src/core` imports, and the `flagship fences` block are not constants and cannot be the pilot's. I read the shared drop-in as the region from the constants' doc comments through the manifest loop's close, and the package's own material as the file header comment, the constant values, the imports the executed half needs, and everything from `feed` onward. Under that boundary the region is byte-identical to the pilot apart from `GUIDE_SPEC` and `MODULES`.

I left ndjson's file header at its own text rather than taking the pilot's. Two things decided it. The slice-3 subjective lane enumerated the drop-in's divergences in F-1 having read abort, html, and ndjson side by side, and named the case name, the equality case's placement, and the bindings — never a header; html's header is its own text and was not flagged. And every package in the fleet carries a header written about its own file, so converging one package's header to the pilot's would state something false here: ndjson's package-specific material is not only its constants. Rule this if you want the header inside the drop-in; it is a one-line change.

## Observations

These are reported against the capability that owns them, not acted on.

- **`tests/setup.ts` lines 6, 7, and 28 keep "partitioning" as a section gerund.** They sit outside the `chunkings` block my scope names. If `partition` is to own the term outright, those lines carry the remainder.
- **The restored lines use a spaced em dash where the surrounding fences use a hyphen.** The brief specified the em dash and the wider fleet writes fence comments that way (`guides/test.md`), but the Surface, Types, Methods, and README fences in this package still write ` - `. The package is internally inconsistent on that character until one unit converges all of them, which would move every presence guard.
- **`tests/src/core/factories.test.ts` has no `## Tests` row.** The brief enumerated the rows to add and did not name it, so I added exactly the rows named. The pilot lists its own `factories.test.ts`.
