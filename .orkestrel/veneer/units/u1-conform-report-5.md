# Unit U1-conform — report 5: four prose edits

Superseded `u1-conform-brief-4.md`'s remainder per `u1-conform-brief-5.md`.
All four prose findings from the third audit verdict are closed.

## Diff per file

### `tests/setupConformance.ts`

```diff
 /**
  * Extracts literal import and re-export specifiers through Vite's parser.
+ * Parses with the `preserveParens` option disabled, so a parenthesized argument or callee reaches
+ * the visitor as the expression it wraps.
  * @param text - A JavaScript, TypeScript, or declaration module.
  * @returns The module specifiers in source order, including type imports, and the literal argument
  * of a dynamic import and of a `require(...)` call, each read through {@link extractStringArgument}.
- * Parses with `preserveParens` disabled, so a parenthesized argument or callee reaches the visitor
- * as the expression it wraps.
  */
 export function extractSpecifiers(text: string): readonly string[] {
```

### `tests/setupConformance.test.ts`

```diff
-	it('extracts imports and re-exports while rejecting comments and strings as module edges', () => {
+	it('extracts imports and re-exports, parenthesized or not, while rejecting comments and strings as module edges', () => {
```

### `tests/setupBrowser.ts`

```diff
- * @throws An `Error` when the document has loaded no Veneer cascade, so an empty reading is never
- *   mistaken for an empty layer.
+ * @throws An `Error` when `sheets` carries no Veneer cascade, so an empty reading is never mistaken
+ *   for an empty layer.
```

(This block was already at brief 4's baseline reading "when `sheets` carries no Veneer cascade, so
an empty reading is never mistaken for an empty layer" across two lines with a different wrap point;
the effective change from the audited state is dropping the parenthetical `reading \`The named
sheets carry no Veneer cascade\`` clause from the `@throws` line, per item 2.)

```diff
-	const sheet = requireValue(readCascadeSheet(sheets), 'The named sheets carry no Veneer cascade')
+	const sheet = requireValue(readCascadeSheet(sheets), 'The sheets carry no Veneer cascade')
```

### `tests/setupBrowser.test.ts`

```diff
-		expect(() => collectLayer('elements', [sheet])).toThrow(
-			'The named sheets carry no Veneer cascade',
-		)
+		expect(() => collectLayer('elements', [sheet])).toThrow('The sheets carry no Veneer cascade')
```

The trailing multi-line `toThrow(...)` call collapsed to one line because the shorter string now
fits the formatter's line width; `npm run format:check` required this shape.

## Grep of item 2 (`named sheets`)

```
$ grep -rn "named sheets" tests/
tests/setupBrowser.test.ts:200:			requireValue(readCascadeSheet(sheets), 'The named sheets carry no probe cascade').cssRules,
```

The one remaining hit is a different `requireValue` message belonging to a caller naming its own
sheets (`probe cascade`, not the `collectLayer` throw text), off-limits per the brief.

## Gate results

`npm run format:check`

```
All matched files use the correct format.
Finished in 759ms on 80 files using 16 threads.
```

`npm run lint:check`

```
(no output; exit 0)
```

`npm run test:setup`

```
 Test Files  3 passed (3)
      Tests  84 passed (84)
   Duration  810ms (transform 157ms, setup 81ms, import 826ms, tests 296ms, environment 0ms)
```

`npm run test:setup:browser`

```
 Test Files  1 passed (1)
      Tests  19 passed (19)
   Duration  4.23s (transform 0ms, setup 54ms, import 10ms, tests 486ms, environment 0ms)
```

## `git status --porcelain` (tracked rows)

```
 D app/browser/factories.ts
 M app/browser/index.html
 M app/browser/index.ts
 M app/browser/main.ts
 D app/browser/showcases/Showcase.ts
 M app/browser/styles/_shell.scss
 M app/browser/styles/index.scss
 M guides/veneer.md
 M package-lock.json
 M package.json
 D src/browser/color-mode/ColorMode.ts
 M src/browser/constants.ts
 D src/browser/factories.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/app/browser/index.test.ts
 D tests/app/browser/showcases/Showcase.test.ts
 M tests/conformance.test.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 D tests/src/browser/color-mode/ColorMode.test.ts
 D tests/src/browser/factories.test.ts
 D tests/src/browser/fixtures/constants.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
```

Matches report 4's tracked rows exactly; no new tracked path appeared and none disappeared.

## Deviations

None. All four edits landed as items 1 to 3 state; the one formatting collapse in
`tests/setupBrowser.test.ts` (multi-line `toThrow` to single-line) was required by
`npm run format:check` on the shortened string and touches no other line.
