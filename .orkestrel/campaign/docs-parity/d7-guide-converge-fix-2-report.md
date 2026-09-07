# Report — U2-fix-2 `d7-guide-converge-fix-2`

## Item 1 — `replaceExample` description, `@remarks`, `@returns` (`src/core/helpers.ts`)

```diff
@@ -2769,8 +2769,9 @@ export function replaceSummary(
  * Replaces the body of one titled `@example` tag in a doc block's raw text and returns the whole
  * block back. The tag carrying `example`'s title takes a fence of its language and its code;
  * every other tag, the description paragraph, the block's indentation, and its continuation
- * markers all survive. A text that is no doc block, a title no tag carries, and code the emitted
- * three-backtick fence cannot enclose each return `undefined`.
+ * markers all survive. A text that is no doc block, a title no tag carries, and a language or
+ * code the emitted three-backtick fence cannot enclose or the doc block cannot hold each return
+ * `undefined`.
  *
  * @remarks
  * A miss returns `undefined`, the one meaning `undefined` carries in every replacer here, so a
@@ -2782,7 +2783,9 @@ export function replaceSummary(
  * cannot enclose: the fence is three backticks, {@link maskFences} ends a body at the first line
  * opening a run at least as long, and {@link collectExamples} reads to the first such run
  * whatever column it sits at, so writing that body would truncate it and turn a following
- * `@`-line into a tag. Refusing keeps the rewrite total over the bodies it can spell.
+ * `@`-line into a tag. A language or code carrying the doc-comment terminator is a body the
+ * block itself cannot hold: the terminator closes the block where it lands and the file stops
+ * parsing there. Refusing keeps the rewrite total over the bodies it can spell.
  *
  * A tag already carrying that language and code returns byte for byte. {@link maskFences} keeps
  * the current body's own lines out of the tag search, so a fenced body carrying a tag-shaped line
@@ -2792,8 +2795,8 @@ export function replaceSummary(
  * @param comment - One complete genuine JSDoc span's raw text, as it sits in the file
  * @param example - The block whose language and code the tag's body takes
  * @returns The block's raw text with that body replaced, or `undefined` for a text that is no
- * doc block, for a title no `@example` tag carries, and for code the emitted fence cannot
- * enclose or the doc block cannot hold — a body carrying the doc-comment terminator
+ * doc block, for a title no `@example` tag carries, and for a language or code the emitted
+ * fence cannot enclose or the doc block cannot hold — a body carrying the doc-comment terminator
  *
  * @example
  * ```ts
```

## Item 2 — Guard reads the fence line, plus new test case (`src/core/helpers.ts`, `tests/src/core/helpers.test.ts`)

Recorded red first: `npx vitest run tests/src/core/helpers.test.ts -t "returns undefined for a
language the fence line cannot carry"` failed with `AssertionError: expected '...' to be undefined`
before the guard change. After the guard change the same command reports `Test Files 1 passed (1)`,
`Tests 1 passed | 414 skipped (415)`.

```diff
@@ -2803,8 +2806,8 @@ export function replaceSummary(
  */
 export function replaceExample(comment: string, example: SourceExample): string | undefined {
 	if (!/^[ \t]*\/\*\*/.test(comment)) return undefined
-	if (example.code.includes('```')) return undefined
-	if (example.code.includes('*/')) return undefined
+	const spelled = [example.language ?? '', ...example.code.split('\n')]
+	if (spelled.some((line) => line.includes('```') || line.includes('*/'))) return undefined
 	const content = unwrapComment(comment)
 	const masked = maskFences(content.join('\n')).split('\n')
 	const title = example.title ?? ''
```

```diff
@@ -4021,6 +4021,17 @@ describe('replaceExample', () => {
 		expect(replaceExample(TAGGED, example)).toBeUndefined()
 	})
 
+	it('returns undefined for a language the fence line cannot carry', () => {
+		const example: SourceExample = {
+			name: 'walk',
+			title: 'First',
+			code: 'walk()',
+			language: 'ts */',
+		}
+		expect(replaceExample(TAGGED, example)).toBeUndefined()
+		expect(replaceExample(TAGGED, { ...example, language: `ts ${'```'}` })).toBeUndefined()
+	})
+
 	it('replaces the untitled tag of a block whose tag carries no title', () => {
```

The comment above the guard names the fence line and the body together through item 1's `@remarks`
paragraph on the same doc block, which now reads "a language or code carrying the doc-comment
terminator is a body the block itself cannot hold" beside the description's "a language or code the
emitted three-backtick fence cannot enclose or the doc block cannot hold".

## Item 3 — Guide's refusal sentence (`guides/guide.md`)

```diff
@@ -629,9 +629,9 @@ to `WRAP_WIDTH`, because a doc block's own wrapping is not recoverable from its
 
 Every replacer reports a miss the same way. `undefined` means "not replaced", and it covers a key
 that reaches no row, a table carrying no `Summary` column, a title no fence or tag carries, a text
-that is no doc block, a summary carrying no word, and code the emitted three-backtick fence cannot
-enclose or the doc block cannot hold, a body carrying `*/`. A caller reports the key it could not
-place instead of writing a file it could not read back.
+that is no doc block, a summary carrying no word, and a language or code the emitted three-backtick
+fence cannot enclose or the doc block cannot hold — a body carrying `*/`. A caller reports the key
+it could not place instead of writing a file it could not read back.
```

## Item 4 — The cell

`npm run build && npm run docs -- --to guide && npm run format`: the seed reported
`rows read: 1, disagreements found: 1, written: 1, reported: 0` for the `replaceExample` cell (guide
table at `guides/guide.md:144`, matching the summary changed in item 1), rewriting only that row's
`Summary` cell content plus the table's shared column padding, and the `@remarks` sentence at
`guides/guide.md:629-633`. `npm run format` re-padded the two edited tables. `npm run build && npm
run docs` then exited 0 with `rows read: 1, disagreements found: 0`.

```diff
@@ -141,7 +141,7 @@ directly.
-| `replaceExample`        | function | `(comment: string, example: SourceExample) => string \| undefined`                                        | Replaces the body of one titled `@example` tag in a doc block's raw text and returns the whole block back. The tag carrying `example`'s title takes a fence of its language and its code; every other tag, the description paragraph, the block's indentation, and its continuation markers all survive. A text that is no doc block, a title no tag carries, and code the emitted three-backtick fence cannot enclose each return `undefined`.                                                                                                                                                                                                                     |
+| `replaceExample`        | function | `(comment: string, example: SourceExample) => string \| undefined`                                        | Replaces the body of one titled `@example` tag in a doc block's raw text and returns the whole block back. The tag carrying `example`'s title takes a fence of its language and its code; every other tag, the description paragraph, the block's indentation, and its continuation markers all survive. A text that is no doc block, a title no tag carries, and a language or code the emitted three-backtick fence cannot enclose or the doc block cannot hold each return `undefined`.                                                                                                                                                                          |
```

## Acceptance criteria

1. New case recorded red then green — evidence in item 2's paragraph earlier.
2. `git diff --stat`:
   ```
   guides/guide.md                |  8 ++++----
   src/core/helpers.ts            | 17 ++++++++++-------
   tests/src/core/helpers.test.ts | 11 +++++++++++
   3 files changed, 25 insertions(+), 11 deletions(-)
   ```
   Lists exactly the three owned files.
3. `npm run format:check`: `All matched files use the correct format.` exit 0.
   `npm run lint:check`: no output, exit 0.
   `npm run check`: `tsc --noEmit --project tsconfig.json && npm run check:src` then
   `check:src:core` ran with no diagnostics, exit 0.
4. `npm run test:src:core`: `Test Files 8 passed (8)`, `Tests 600 passed (600)`.
   `npm run test:guides`: `Test Files 1 passed (1)`, `Tests 54 passed (54)`.
   `npm run test:policy`: `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`.
   All exit 0.
5. `npm run build && npm run docs`: build succeeded (`vite build`, `api-extractor`-style copy step);
   `docs` reported `rows read: 1, disagreements found: 0`, exit 0.
   `npm run docs -- --to guide`: `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
   `npm run docs -- --to source`: `rows read: 1, disagreements found: 0, written: 0, reported: 0`.

No deviation.
