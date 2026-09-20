# Unit U1-conform — report 6

Rewrapped the `@returns` tag of `extractSpecifiers` in `tests/setupConformance.ts` across three
lines so no line exceeds 100 columns. Words are unchanged.

## Diff

```diff
diff --git a/tests/setupConformance.ts b/tests/setupConformance.ts
index 4fafa73..8cb457f 100644
--- a/tests/setupConformance.ts
+++ b/tests/setupConformance.ts
@@ -119,8 +119,9 @@ export function extractStringArgument(node: ESTree.Argument): string | undefined {
  * the visitor as the expression it wraps.
  * @param text - A JavaScript, TypeScript, or declaration module.
- * @returns The module specifiers in source order, including type imports, and the literal argument
- * of a dynamic import and of a `require(...)` call, each read through {@link extractStringArgument}.
+ * @returns The module specifiers in source order, including type imports, and the literal
+ * argument of a dynamic import and of a `require(...)` call, each read through
+ * {@link extractStringArgument}.
  */
 export function extractSpecifiers(text: string): readonly string[] {
```

Note: the working tree already carries U1-conform and briefs 2 to 5 uncommitted (renames,
new helpers, and other files), so `git diff -- tests/setupConformance.ts` below shows the full
accumulated diff for that file; the hunk above isolates this brief's own change.

## `awk` reading

```
$ awk 'length > 100' tests/setupConformance.ts
```

Printed nothing.

## Command results

- `npm run format:check` — "All matched files use the correct format." Exit 0.
- `npm run lint:check` — no findings printed. Exit 0.
- `npm run test:setup` — "Test Files 3 passed (3)", "Tests 84 passed (84)". Exit 0.

## `git status --porcelain` (tracked rows only)

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

Matches report 5's tracked rows exactly. No new tracked rows.

## Deviations

None. Only the two-line `@returns` tag changed, rewrapped to three lines.
