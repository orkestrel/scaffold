# Unit test-setup-browser — report

## Unknown's reading

No Node project loads `tests/setupBrowser.ts`. In the repaired `vite.config.ts`: `setup` excludes
`tests/setupBrowser.test.ts` and its `setupFiles` never lists `tests/setupBrowser.ts`; `srcCore`,
`srcServer`, `policy`, `config`, `guides`, `distribution`, and `probe` never list it either. Only
`srcBrowser` and `setupBrowser` — both browser projects (`browser.enabled: true`) — register it as
a setup file. The other two importers of `./setupBrowser.js` under `tests/` are
`tests/src/browser/helpers.test.ts` and `tests/src/browser/factories.test.ts`, both collected by
the browser-enabled `srcBrowser` project. `tests/config.test.ts` and `tests/policy.test.ts` only
reference the filename as a string (a fixture expectation and a stem-derivation case), never
import the module. The guard was safe to remove.

## Diff per file

### `tests/setupBrowser.ts`

- Changed the `render` import from a type-only import plus a conditional dynamic `import('@src/browser')` to a direct value import at module scope.
- Deleted the `typeof document !== 'undefined'` guard and its explaining comment about the `setup` project running this file in Node.
- Deleted the `if (!render) throw new Error('buildFixture requires a DOM host')` refusal branch in `buildFixture`.
- Deleted the `@throws` TSDoc tag on `buildFixture`.
- Kept every exported name and signature (`buildFixture`, `buildStylesheet`, `resetFixtures`) and the fixture registry unchanged.

### `tests/setupBrowser.test.ts`

- Replaced the header comment describing a Node `setup` project and a DOM-refusal proof with one describing the `setup:browser` browser project.
- Replaced the `buildFixture > refuses to run outside a DOM host` case (asserting a throw) with two real-DOM cases: `renders markup into an attached container reachable by querySelector` and `records the container so resetFixtures removes it`.
- Added a `buildStylesheet` describe block with two cases: `attaches a style element to document.head` and `records the style element so resetFixtures removes it`.
- Kept the `resetFixtures` describe block's two existing cases unchanged.

Full diffs:

```diff
diff --git a/tests/setupBrowser.ts b/tests/setupBrowser.ts
index 6f973c5..3dd2e99 100644
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@ -1,34 +1,21 @@
-import type { render as RenderFunction } from '@src/browser'
+import { render } from '@src/browser'

 // Every fixture a test builds is recorded here so one call takes them all back out of the document.
 // A browser test file shares one page, so a container left behind is a resolver ambiguity in the
 // next test rather than a leak nobody notices.
 const fixtures: Element[] = []

-// `@src/browser` re-exports `src/browser/helpers.ts`, which imports `vitest/browser` at module
-// scope; that import throws unconditionally outside Browser Mode. The `setup` project runs this
-// file in Node, where `document` is undefined, so the load below never runs there and this module
-// never reaches `vitest/browser`. A browser project registers this file as a setup file, where
-// Vitest awaits a setup file's top-level evaluation — including a top-level `await` — before
-// running any test in that file, so `render` is resolved before `buildFixture` is ever called.
-let render: typeof RenderFunction | undefined
-if (typeof document !== 'undefined') {
-	;({ render } = await import('@src/browser'))
-}
-
 /**
  * Renders fixture markup into a recorded container attached to the document.
  *
  * @param markup - The fixture markup to render.
  * @returns The attached container.
- * @throws When no DOM host provided `render`, which only a browser project's setup does.
  * @example
  * ```ts
  * const container = buildFixture('<button type="button">Save</button>')
  * ```
  */
 export function buildFixture(markup: string): HTMLDivElement {
-	if (!render) throw new Error('buildFixture requires a DOM host')
 	const container = render(markup)
 	fixtures.push(container)
 	return container
diff --git a/tests/setupBrowser.test.ts b/tests/setupBrowser.test.ts
index 987b26d..0624b5e 100644
--- a/tests/setupBrowser.test.ts
+++ b/tests/setupBrowser.test.ts
@@ -1,13 +1,8 @@
 import { describe, expect, it } from 'vitest'
-import { buildFixture, resetFixtures } from './setupBrowser.js'
+import { buildFixture, buildStylesheet, resetFixtures } from './setupBrowser.js'

-// This proof runs in the `setup` project, which is Node with the browser disabled. `buildFixture`
-// rendering markup through `render`, and `buildStylesheet` touching `document.head`, both need a
-// real DOM, so their DOM-driving behavior is proven where a DOM exists: the browser suites that
-// consume them, chiefly tests/src/browser/helpers.test.ts and every fixture built through them
-// across tests/src/browser/**. What this module carries that needs no host at all: `resetFixtures`
-// walking an empty record without touching the DOM, and `buildFixture` refusing to run at all
-// where no DOM host resolved `render` — both proven below.
+// This proof runs in the `setup:browser` project, a browser project where a real DOM exists, so
+// every case here drives that DOM directly rather than proving a Node fallback.
 describe('resetFixtures', () => {
 	it('returns without touching the DOM when no fixture was built', () => {
 		expect(() => resetFixtures()).not.toThrow()
@@ -20,7 +15,33 @@ describe('resetFixtures', () => {
 })

 describe('buildFixture', () => {
-	it('refuses to run outside a DOM host', () => {
-		expect(() => buildFixture('<p>Ready</p>')).toThrow('buildFixture requires a DOM host')
+	it('renders markup into an attached container reachable by querySelector', () => {
+		const container = buildFixture('<p data-testid="ready">Ready</p>')
+		expect(document.body.contains(container)).toBe(true)
+		expect(document.querySelector('[data-testid="ready"]')?.textContent).toBe('Ready')
+		resetFixtures()
+	})
+
+	it('records the container so resetFixtures removes it', () => {
+		const container = buildFixture('<p data-testid="tracked">Tracked</p>')
+		resetFixtures()
+		expect(document.body.contains(container)).toBe(false)
+		expect(document.querySelector('[data-testid="tracked"]')).toBeNull()
+	})
+})
+
+describe('buildStylesheet', () => {
+	it('attaches a style element to document.head', () => {
+		const sheet = buildStylesheet('.card { color: red }')
+		expect(document.head.contains(sheet)).toBe(true)
+		expect(sheet.tagName).toBe('STYLE')
+		expect(sheet.textContent).toBe('.card { color: red }')
+		resetFixtures()
+	})
+
+	it('records the style element so resetFixtures removes it', () => {
+		const sheet = buildStylesheet('.badge { color: blue }')
+		resetFixtures()
+		expect(document.head.contains(sheet)).toBe(false)
 	})
 })
```

## Gates, final lines

`npm run format:check`:
```text
All matched files use the correct format.
Finished in 1124ms on 60 files using 16 threads.
```

`npm run lint:check`: exit 0, no output beyond the two invocation lines (`oxlint --config .oxlintrc.json --deny-warnings .`).

`npm run check`: exit 0 (`tsc --noEmit` over the root project, `check:src:core`, `check:src:browser`, `check:src:server` all clean).

`npm run test:setup:browser` (Chromium):
```text
Test Files  1 passed (1)
     Tests  6 passed (6)
```

`PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` (Edge):
```text
Test Files  1 passed (1)
     Tests  6 passed (6)
```

`npm run test:setup`:
```text
Test Files  2 passed (2)
     Tests  21 passed (21)
```

`npm run test:src:browser`:
```text
Test Files  2 passed (2)
     Tests  349 passed | 2 expected fail (351)
```
(The two "expected fail" entries are pre-existing intentional negative-path assertions in
`tests/src/browser/factories.test.ts` around simulated `window` error events — unrelated to
`tests/setupBrowser.ts`/`tests/setupBrowser.test.ts` and unchanged by this unit.)

`npm test` (whole chain): exit 0.
```text
test:src      → Test Files 7 passed (7); Tests 612 passed | 2 expected fail | 9 skipped (623)
test:policy   → Test Files 1 passed (1); Tests 109 passed | 1 skipped (110)
test:config   → Test Files 1 passed (1); Tests 173 passed | 1 skipped (174)
test:setup    → Test Files 2 passed (2); Tests 21 passed (21)
test:setup:browser → Test Files 1 passed (1); Tests 6 passed (6)
test:guides   → Test Files 1 passed (1); Tests 50 passed | 1 skipped (51)
```

## Deviations

None. The unknown resolved to "no Node loader remains," so the guard and refusal branch were
removed as the brief instructed.

## Review evidence

`git status --porcelain` at return:
```text
 M .claude/agents/orkestrel.md
 M configs/browsers.ts
 M guides/scaffold.md
 M package-lock.json
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupPolicy.ts
 M vite.config.ts
```
Every entry besides `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` was already modified
in the working tree before this unit ran (the Orchestrator's scaffold 0.0.76 re-pin and repaired
planned paths named in the brief's Context); this unit touched only the two owned files.

`git diff` over the two owned files is reproduced in full under § Diff per file.
