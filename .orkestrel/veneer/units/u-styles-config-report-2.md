# Unit U-styles-config — successor brief 2 report

## Diff

### `configs/src/vite.styles.config.ts`

```diff
-// The root supplies the alias table, the disabled public directory, and the resolved
-// Playwright provider once for the workspace; the fields a styles build differs in are
-// replaced by assignment because `mergeOverride` cannot remove the browser output boundary,
-// which refuses this output directory.
+// The root supplies the alias table, the disabled public directory, and the resolved
+// Playwright provider once for the workspace. The fields a styles build differs in are
+// replaced by assignment rather than merged: the `mergeOverride` helper keeps a base plugin
+// no override names, so the browser environment boundary would stay, and it concatenates
+// every other array, so the setup files and the include list would double.
 export default defineConfig({
 	...browser,
 	plugins: [
@@
 		include: ['tests/src/styles/**/*.test.ts'],
-		exclude: [],
 		setupFiles: [
```

### `tests/setupStyles.ts`

```diff
 /**
  * Locates the installed Bootstrap stylesheet the compatibility oracle reads.
  *
  * @remarks
- * This module is loaded by the Node `setup` project and the browser `src:styles` project,
- * imports no stylesheet, and takes no `node:fs` import; the styles project loads the built cascade
- * through its `setupFiles`. The Node proof reads the file itself and hands the text to
- * {@link extractBootstrapVariables}.
+ * This module is loaded by the Node `setup` project and the browser `src:styles` project,
+ * imports no stylesheet, and takes no `node:fs` import; the styles project loads the built
+ * cascade through its `setupFiles` array. The Node proof reads the file itself and hands the text
+ * to {@link extractBootstrapVariables}.
  */
 export const BOOTSTRAP_CASCADE_PATH = 'node_modules/bootstrap/dist/css/bootstrap.css'
@@
  * @remarks
- * The text arrives as an argument because this module imports no stylesheet: the Node `setup`
- * project and the browser `src:styles` project load it, and the styles project loads the built
- * cascade through its `setupFiles`. Keeping the reader pure also lets a case drive it with a
- * written stylesheet and a control that must report nothing.
+ * The text arrives as an argument because this module must load in Node and in the browser
+ * alike: the Node `setup` project and the browser `src:styles` project both load it, and only
+ * the styles project loads the built cascade, through its `setupFiles` array. Keeping the
+ * reader pure also lets a case drive it with a written stylesheet and a control that must
+ * report nothing.
```

## Gate results

- `npm run format:check`: `All matched files use the correct format. Finished in 755ms on 80 files
  using 16 threads.`
- `npm run lint:check`: no output, exit 0.
- `npm run check:src:styles`: no output, exit 0.
- `npm run test:src:styles`: `Test Files 7 passed (7)`, `Tests 40 passed (40)`.
- `npm run test:setup`: `Test Files 3 passed (3)`, `Tests 84 passed (84)`.

## `git status --porcelain` (tracked rows)

```
 M configs/src/vite.styles.config.ts
 M package.json
 M tests/setupStyles.ts
```

`package.json` carries the prior unit's uncommitted change; this unit did not touch it.

## Deviations

None. Every edit matched the brief's three texts and the `exclude: [],` deletion; no other line
changed in either owned file.
