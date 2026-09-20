# U1-conform — successor report 2: the showcase drives the published cascade

The showcase now drives the published cascade: `mountShowcase` loads `src/styles/index.scss` ahead
of the app stylesheet, `_shell.scss` paints nothing, and the body in every paint-reading proof
resolves to the `elements` layer's tokens. The guide sentence, the `## Tests` link, the `it` title,
and the template-literal `require` reading are closed. Every gate in item 7 exits 0 except
`test:setup:browser`, which reds in `tests/setupBrowser.test.ts` — an off-limits file. That is
Deviation 1, with its exact patch supplied and not applied.

## Touched files

| File | Change |
| --- | --- |
| `tests/setupBrowser.ts` | `mountShowcase` loads `../src/styles/index.scss` before `../app/browser/styles/index.scss`, in the order `main.ts` loads them |
| `app/browser/styles/_shell.scss` | `@layer shell;` opens the file; the `body` rule is gone; the comment states what the shell owns |
| `app/browser/styles/index.scss` | Loads the partial with `@use`; no `sass:meta`, no `meta.load-css`, no order statement |
| `guides/veneer.md` | The `## Showcase` sentence claims what the tree does; `## Tests` links the `Showcase` proof beside the journey |
| `tests/guides.test.ts` | The `it` title names the guard the case executes |
| `tests/setupConformance.ts` | `extractStringArgument` reads the string an argument node carries; the dynamic `import` branch and the `require` branch both call it; the doc block names the reading |
| `tests/setupConformance.test.ts` | The direct case for `extractStringArgument`; the template-literal `require` case and its controls; the export set and the import list carry the helper |

## Diffstat

```text
 app/browser/styles/_shell.scss |  17 ++++++++++-------
 app/browser/styles/index.scss  |  12 +++---------
 guides/veneer.md               |   7 ++++---
 tests/guides.test.ts           |   2 +-
 tests/setupBrowser.ts          |   1 +
 tests/setupConformance.test.ts |  21 +++++++++++++++++++++
 tests/setupConformance.ts      |  35 ++++++++++++++++++++++-------------
```

## The diff per file

The baseline is the working tree the audit read, reconstructed from `d8b0e65` plus
`units/u1-conform-diff.patch.txt`.

```diff
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@ -28,6 +28,7 @@
 	readonly host: HTMLElement
 	cleanup(): void
 }> {
+	await import('../src/styles/index.scss')
 	await import('../app/browser/styles/index.scss')
 	const { Showcase } = await import('../app/browser/index.js')
 	const host = mount(build('div'))
--- a/app/browser/styles/index.scss
+++ b/app/browser/styles/index.scss
@@ -1,9 +1,3 @@
-@use 'sass:meta';
-
-// The shell's own layer, declared here because Sass refuses a layer statement placed before a
-// `@use` rule and the order has to reach the document ahead of the rules it orders. Veneer's
-// published cascade declares its own order, and `shell` is outside it, so the shell's rules sort
-// after every published layer.
-@layer shell;
-
-@include meta.load-css('shell');
+// The shell's sole compilation barrel. `_shell.scss` opens with the app's own cascade-layer order,
+// so the order statement reaches the document ahead of the block it orders.
+@use 'shell';
--- a/app/browser/styles/_shell.scss
+++ b/app/browser/styles/_shell.scss
@@ -1,7 +1,13 @@
+@layer shell;
+
 @layer shell {
-	// The showcase is framework-free, so this file is the whole document shell. The engine removes
-	// the color-mode attribute for light, so the shell fixes the document's scheme in that state and
-	// paints the page from the system surface the scheme selects.
+	// The showcase is framework-free, so this file is the whole document shell, and the shell owns
+	// the document's color scheme in each mode. The published cascade declares `color-scheme` under
+	// the theme attribute alone, and the color-mode engine removes that attribute for light, so
+	// these rules carry the scheme through the state the removal leaves behind. Every paint stays
+	// with the published cascade: `shell` sits outside its order statement and therefore sorts after
+	// every published layer, so a paint rule here would override the `elements` layer the showcase
+	// exists to prove.
 	:root {
 		color-scheme: light;
 	}
@@ -9,9 +15,4 @@
 	:root[data-bs-theme='dark'] {
 		color-scheme: dark;
 	}
-
-	body {
-		background-color: Canvas;
-		color: CanvasText;
-	}
 }
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -56,7 +56,7 @@
 		expect(report.pitch).toEqual([])
 	})
 
-	it('executes the scheme-validation example verdicts', () => {
+	it('executes the color-mode guard example verdicts', () => {
 		expect(isColorModeState('dark')).toBe(true)
 		expect(isColorModeState('auto')).toBe(false)
 	})
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -375,8 +375,8 @@
 workspace implementation surface and is outside this guide's published API tables.
 
 Scaffold mandates the Vue toolchain for an `app/browser` environment, and this shell declares no
-component in it: the shell is framework-free by design, so the published CSS and engine are proved
-with no framework between them and what the showcase renders.
+component in it: the shell is framework-free by design, so the showcase drives the published
+cascade and the published engine with no framework between them and what renders.
 
 The styles entry declares the cascade order `theme, reset, base, elements, components, utilities`,
 every `--vn-*` token, every `--bs-*` root alias Bootstrap 5.3.8 declares, and the document and body
@@ -393,7 +393,8 @@
 The browser proofs cover the controller and the guard; see
 [controller behavior](../tests/src/browser/ColorMode.test.ts) and
 [mode validation](../tests/src/browser/validators.test.ts).
-The application proof drives the shell through its interface; see
+The application proofs drive the shell through its interface; see
+[showcase mounting and destruction](../tests/app/browser/Showcase.test.ts) and
 [showcase journeys](../tests/app/browser/integration.test.ts).
 The style proofs bind the cascade to the registry and to the calibration; see
 [token parity and values](../tests/src/styles/tokens.test.ts),
--- a/tests/setupConformance.ts
+++ b/tests/setupConformance.ts
@@ -13,6 +13,7 @@
 import { fileURLToPath } from 'node:url'
 import { BOOTSTRAP_CASCADE_PATH } from './setupStyles.js'
 import { compile } from 'sass'
+import type { ESTree } from 'vite'
 import { parseSync, Visitor } from 'vite'
 
 /** Names the Bootstrap release this package tracks, pinned exactly in `package.json`. */
@@ -97,10 +98,25 @@
 }
 
 /**
+ * Extracts the string a call argument carries as a literal.
+ * @param node - An argument node, such as an `import(...)` source or a `require(...)` argument.
+ * @returns The string for a string literal or for a template literal with no substitution, and
+ * `undefined` for every other node, a substituted template literal and an identifier included.
+ */
+export function extractStringArgument(node: ESTree.Argument): string | undefined {
+	if (node.type === 'Literal' && typeof node.value === 'string') return node.value
+	if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
+		const cooked = node.quasis[0]?.value.cooked
+		if (cooked !== undefined && cooked !== null) return cooked
+	}
+	return undefined
+}
+
+/**
  * Extracts literal import and re-export specifiers through Vite's parser.
  * @param text - A JavaScript, TypeScript, or declaration module.
- * @returns The module specifiers in source order, including type imports, dynamic imports, and
- * `require(...)` call arguments.
+ * @returns The module specifiers in source order, including type imports, and the literal argument
+ * of a dynamic import and of a `require(...)` call, each read through {@link extractStringArgument}.
  */
 export function extractSpecifiers(text: string): readonly string[] {
 	const parsed = parseSync('module.ts', text)
@@ -118,12 +134,8 @@
 			specifiers.push(node.source.value)
 		},
 		ImportExpression(node) {
-			if (node.source.type === 'Literal' && typeof node.source.value === 'string')
-				specifiers.push(node.source.value)
-			else if (node.source.type === 'TemplateLiteral' && node.source.expressions.length === 0) {
-				const value = node.source.quasis[0]?.value.cooked
-				if (value !== undefined && value !== null) specifiers.push(value)
-			}
+			const specifier = extractStringArgument(node.source)
+			if (specifier !== undefined) specifiers.push(specifier)
 		},
 		TSImportType(node) {
 			specifiers.push(node.source.value)
@@ -134,12 +146,9 @@
 		CallExpression(node) {
 			if (node.callee.type !== 'Identifier' || node.callee.name !== 'require') return
 			const argument = node.arguments[0]
-			if (
-				argument !== undefined &&
-				argument.type === 'Literal' &&
-				typeof argument.value === 'string'
-			)
-				specifiers.push(argument.value)
+			if (argument === undefined) return
+			const specifier = extractStringArgument(argument)
+			if (specifier !== undefined) specifiers.push(specifier)
 		},
 	}).visit(parsed.program)
 	return specifiers
--- a/tests/setupConformance.test.ts
+++ b/tests/setupConformance.test.ts
@@ -5,6 +5,7 @@
 import { resolve } from 'node:path'
 import { createScratch } from '@orkestrel/test/server'
 import { describe, expect, it } from 'vitest'
+import { parseSync, Visitor } from 'vite'
 import * as setup from './setupConformance.js'
 import {
 	BOOTSTRAP_BUNDLE_DIGEST,
@@ -17,6 +18,7 @@
 	collectImportClosure,
 	computeArtifactDigest,
 	extractSpecifiers,
+	extractStringArgument,
 	readBootstrapCascade,
 	readManifestMember,
 	scanEscapingImport,
@@ -37,6 +39,7 @@
 			'collectImportClosure',
 			'computeArtifactDigest',
 			'extractSpecifiers',
+			'extractStringArgument',
 			'readBootstrapCascade',
 			'readManifestMember',
 			'scanEscapingImport',
@@ -102,6 +105,21 @@
 		)
 	})
 
+	it('reads a call argument written as a literal and refuses every other argument node', () => {
+		const parsed = parseSync(
+			'module.ts',
+			'require("vue"); require(`bootstrap`); require(`${name}`); require(name)',
+		)
+		const readings: Array<string | undefined> = []
+		new Visitor({
+			CallExpression(node) {
+				const argument = node.arguments[0]
+				if (argument !== undefined) readings.push(extractStringArgument(argument))
+			},
+		}).visit(parsed.program)
+		expect(readings).toEqual(['vue', 'bootstrap', undefined, undefined])
+	})
+
 	it('extracts imports and re-exports while rejecting comments and strings as module edges', () => {
 		expect(
 			extractSpecifiers(
@@ -119,6 +137,9 @@
 		expect(extractSpecifiers('// import "vue"\nconst text = "import(\'bootstrap\')"')).toEqual([])
 		expect(extractSpecifiers('import(`./literal.js`)')).toEqual(['./literal.js'])
 		expect(extractSpecifiers('const dependency = require("vue")')).toEqual(['vue'])
+		expect(extractSpecifiers('require(`bootstrap`)')).toEqual(['bootstrap'])
+		expect(extractSpecifiers('require(`${name}`)')).toEqual([])
+		expect(extractSpecifiers('require(name)')).toEqual([])
 		expect(() => extractSpecifiers('import {')).toThrow('Expected `}` but found `EOF`')
 	})
```

## Item 1: the body readings, before and after

A throwaway probe mounted the showcase through `mountShowcase` in the `app:browser` project, applied
`light-1280` and `dark-1280` through the control the journey uses, and read `document.body`'s
`background-color` and `color`. It threw its reading so the runner printed it. The file was
`tests/app/browser/paint.test.ts`; it is deleted, and `git status --porcelain` confirms it left
nothing behind.

Before, the system colors the shell's `body` rule named:

```text
READINGS light=[rgb(255, 255, 255) | rgb(0, 0, 0)] dark=[rgb(18, 18, 18) | rgb(255, 255, 255)]
```

After, the `elements` layer's token paint:

```text
READINGS light=[rgb(255, 255, 255) | oklch(0.208 0.042 265.755)] dark=[oklch(0.21 0.013 256) | oklch(0.929 0.013 255.508)]
```

Each reading is the token the cascade declares. `--vn-surface-body-base` is
`var(--vn-palette-white-base)` in light and `oklch(0.21 0.013 256)` in dark; `--vn-text-body-base`
is `oklch(0.208 0.042 265.755)` in light and `oklch(0.929 0.013 255.508)` in dark. The light
background reads the same in both columns because the white palette token and the system `Canvas`
paint the same color in headless Chromium; the colour column separates them, and the dark column
separates both.

Every journey assertion keeps its meaning and its pass: the light and dark readings differ, and
toggling back to light returns the first reading.

## Item 3: the emitted CSS head

The entry compiled with the installed `sass`, into `tmp/`, which was then removed:

```text
$ node node_modules/sass/sass.js app/browser/styles/index.scss tmp/probe-css/shell.css --no-source-map
@layer shell;
@layer shell {
  :root {
    color-scheme: light;
  }
  :root[data-bs-theme=dark] {
    color-scheme: dark;
  }
}
```

The order statement precedes the block, which is the audit's referral.

The served bundle is a second reading, and it agrees. `npm run build` minifies the app stylesheet
with lightningcss, which drops an order statement it can express as source order. What reaches
`dist/app/browser/assets/index-BsLnrzvD.css` is `@layer theme{…}`, `@layer reset,base;`,
`@layer elements{…}`, `@layer components,utilities;`, `@layer shell{…}` — the published order
followed by `shell`, so `shell` still sorts last. The bundle's only `body` rule is the token one,
inside `elements`:

```text
body{background-color:var(--vn-surface-body-base);color:var(--vn-text-body-base);font-family:var(--vn-font-sans);font-size:var(--vn-size-2);font-weight:var(--vn-weight-body);line-height:var(--vn-line-body)}
```

No `body` rule occurs inside `@layer shell{…}`.

## Item 4: the sentence as written

```text
Scaffold mandates the Vue toolchain for an `app/browser` environment, and this shell declares no
component in it: the shell is framework-free by design, so the showcase drives the published
cascade and the published engine with no framework between them and what renders.
```

`main.ts` loads `../../src/styles/index.scss` and `./styles/index.scss` and constructs `Showcase`,
which constructs the published `ColorMode`. `mountShowcase` loads the same pair in the same order.
No Vue component stands between either page and what renders.

## Item 6: the red and the green

The case added first, alone, at `tests/setupConformance.test.ts:122`:

```text
$ npm run test:setup
AssertionError: expected [] to deeply equal [ 'bootstrap' ]
- Expected
+ Received
- [
-   "bootstrap",
- ]
+ []
 ❯ tests/setupConformance.test.ts:122:53
 Test Files  1 failed | 2 passed (3)
      Tests  1 failed | 82 passed (83)
```

After `extractStringArgument` took over both branches, and with the direct helper case and the
controls for a substituted template literal and for an identifier added:

```text
$ npm run test:setup
 Test Files  3 passed (3)
      Tests  84 passed (84)
```

## Item 7: the gates

Run in `C:/Users/mikes/WebstormProjects/veneer` on Windows under Git Bash, on 2026-09-20.

### Managed Chromium and Node

```text
$ npm run format:check
All matched files use the correct format.
Finished in 755ms on 80 files using 16 threads.          exit=0

$ npm run lint:check
oxlint --config .oxlintrc.json --deny-warnings .
exit=0 (no diagnostics printed)

$ npm run check
vue-tsc --noEmit -p configs/app/tsconfig.browser.json
exit=0

$ npm run build
dist/app/browser/assets/index-BsLnrzvD.css  31.59 kB | gzip: 4.07 kB
dist/app/browser/assets/index-D2JnOl_e.js    2.31 kB | gzip: 0.96 kB
✓ built in 300ms                                          exit=0

$ npm run test:setup
 Test Files  3 passed (3)
      Tests  84 passed (84)                               exit=0

$ npm run test:conformance
 Test Files  1 passed (1)
      Tests  6 passed (6)                                 exit=0

$ npm run test:app
 Test Files  2 passed (2)
      Tests  3 passed (3)                                 exit=0

$ npm run test:journey
 Test Files  4 passed (4)
      Tests  32 passed | 4 skipped (36)                   exit=0

$ npm run test:setup:browser
 Test Files  1 failed (1)
      Tests  3 failed | 15 passed (18)                    exit=1

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  18 passed (18)                               exit=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)                 exit=0
```

`test:setup:browser` is Deviation 1.

### Edge

```text
$ PLAYWRIGHT_CHANNEL=msedge npm run test:app
 Test Files  2 passed (2)
      Tests  3 passed (3)                                 exit=0

$ PLAYWRIGHT_CHANNEL=msedge npm run test:journey
 Test Files  4 passed (4)
      Tests  32 passed | 4 skipped (36)                   exit=0
```

### Observations outside item 7

The suites the brief does not name were run read-only to bound the change's reach. Each exits 0.

```text
$ npm run test:src
 Test Files  4 passed (4)
      Tests  17 passed (17)                               exit=0

$ npm run test:src:styles
 Test Files  7 passed (7)
      Tests  40 passed (40)                               exit=0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  173 passed | 1 skipped (174)                 exit=0
```

## Acceptance criteria

1. Met except for one clause, which Deviation 1 carries. `mountShowcase` loads
   `../src/styles/index.scss` before `../app/browser/styles/index.scss`; `_shell.scss` carries no
   `body` rule and opens with `@layer shell;`; `index.scss` loads the partial with `@use` and names
   no `sass:meta`; the emitted CSS opens with the order statement. The served page and the journey
   paint `body` from the `elements` layer, shown by the after readings and by the built bundle's
   only `body` rule. `tests/app/browser/Showcase.test.ts` reads no paint — it asserts the accessible
   name, the pressed state, and the attribute — so the clause is inert for that proof.
2. Met. The `## Showcase` sentence names what `main.ts` and `mountShowcase` load and what
   `_shell.scss` no longer paints; `## Tests` links `tests/app/browser/Showcase.test.ts` beside the
   journey; the `it` title names `isColorModeState` as the color-mode guard. `test:guides` exits 0.
3. Met. The template-literal `require` extracts `['bootstrap']`; the case ran red before the change
   and green after, with both runs recorded; the substituted template literal and the identifier
   each extract nothing, asserted through `extractSpecifiers` and again directly against
   `extractStringArgument`.
4. Not met. Every gate exits 0 on managed Chromium except `test:setup:browser`, and the two named
   ones exit 0 on Edge. Deviation 1 carries the failure and its patch.
5. Met. `git status --porcelain` is byte-identical to `units/u1-conform-status.txt`. The report sits
   under `tmp/`, which git ignores, and every instrument this unit wrote there is removed.

## Deviations

### 1. `test:setup:browser` reds in an off-limits file

**Expected.** `npm run test:setup:browser` exits 0 after item 1.

**Found.** It exits 1. The cases that fail are `selects the sheet carrying the theme layer, where
the installed rule walk names no sheet` (`tests/setupBrowser.test.ts:191`), `reports no sheet when
the document has loaded no theme layer, and refuses a layer read there` (line 204), and `reads every
rule of the named layer block, and reports nothing for a layer the cascade never fills` (line 243).

```text
$ npm run test:setup:browser
 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts:191:2 > browser setup > selects the sheet carrying the theme layer, where the installed rule walk names no sheet
 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts:204:2 > browser setup > reports no sheet when the document has loaded no theme layer, and refuses a layer read there
 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts:243:2 > browser setup > reads every rule of the named layer block, and reports nothing for a layer the cascade never fills
 Test Files  1 failed (1)
      Tests  3 failed | 15 passed (18)
```

**Evidence.** Those cases pass when no case calls `mountShowcase` ahead of them in the same file,
and fail when one does. Every run is a name filter over the unchanged file, so none edits anything:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser -t "theme layer"
 Test Files  1 passed (1)
      Tests  2 passed | 16 skipped (18)

$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser -t "named layer block"
 Test Files  1 passed (1)
      Tests  1 passed | 17 skipped (18)

$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser -t "s real content and cleans it up repeatedly"
 Test Files  1 passed (1)
      Tests  1 passed | 17 skipped (18)

$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser -t "s"
 Test Files  1 failed (1)
      Tests  3 failed | 15 passed (18)
```

**Hypothesis.** A browser test file shares one page, `mountShowcase` now loads the published cascade
into it through a dynamic import that arrives at the first mount and stays, and `readCascadeSheet`
selects the first sheet declaring a `theme` layer block — so after `mounts real content and cleans
it up repeatedly` runs at line 69, the sheet those cases fixture with `PROBE_CASCADE` is no longer
the one selected, and the document no longer lacks a `theme` layer.

**Done or not done.** Item 1 is done. The gate is red, and closing it needs
`tests/setupBrowser.test.ts`, which this brief lists off-limits. Not done.

**The patch, report-only and not applied.** It moves the cases that call `mountShowcase` to the end
of the `browser setup` block, so the cascade readers run against a document that has loaded no
Veneer cascade, and states that dependency in a comment rather than leaving it to declaration order.
It is unverified: verifying it means running the reordered file, and running it means editing the
off-limits file. What is verified is the premise the patch rests on — the preceding filtered runs.

```diff
--- a/tests/setupBrowser.test.ts
+++ b/tests/setupBrowser.test.ts
@@ -66,42 +66,6 @@
 		).toEqual([document])
 	})
 
-	it('mounts real content and cleans it up repeatedly', async () => {
-		const mounted = await mountShowcase()
-		try {
-			expect(mounted.host.isConnected).toBe(true)
-			expect(readPerception('Showcase')).toBe('Explore the color mode with the Dark mode control.')
-		} finally {
-			mounted.cleanup()
-		}
-		mounted.cleanup()
-		expect(mounted.host.isConnected).toBe(false)
-		expect(readRefusal('button', 'Dark mode')).toBe(
-			'No interactive element has the accessible name "Dark mode"',
-		)
-	})
-
-	it('drives dark and light variants and leaves the requested mode applied on repetition', async () => {
-		const mounted = await mountShowcase()
-		try {
-			await applyTheme('dark-1280')
-			expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark')
-			expect(resolveAccessible('button', 'Dark mode').getAttribute('aria-pressed')).toBe('true')
-			await applyTheme('dark-390')
-			expect(resolveAccessible('button', 'Dark mode').getAttribute('aria-pressed')).toBe('true')
-			await applyTheme('light-390')
-			expect(document.documentElement.hasAttribute('data-bs-theme')).toBe(false)
-			expect(resolveAccessible('button', 'Dark mode').getAttribute('aria-pressed')).toBe('false')
-			await applyTheme('light-1280')
-			expect(document.documentElement.hasAttribute('data-bs-theme')).toBe(false)
-			await expect(applyTheme('sepia-390')).rejects.toThrow(
-				'Unsupported color-mode variant: sepia-390',
-			)
-		} finally {
-			mounted.cleanup()
-		}
-	})
-
 	it('attaches a specimen the case can address, and takes it out again on request', () => {
 		const container = specimens.mount('<div id="probe" class="marker"></div>')
 		const probe = container.querySelector('#probe')
@@ -265,4 +229,42 @@
 			),
 		).toEqual(['--vn-probe-one'])
 	})
+
+	// These cases run last because `mountShowcase` loads the published cascade into the page the
+	// whole file shares, and the cascade readers above assert on a document that carries no `theme`
+	// layer of Veneer's own.
+	it('mounts real content and cleans it up repeatedly', async () => {
+		const mounted = await mountShowcase()
+		try {
+			expect(mounted.host.isConnected).toBe(true)
+			expect(readPerception('Showcase')).toBe('Explore the color mode with the Dark mode control.')
+		} finally {
+			mounted.cleanup()
+		}
+		mounted.cleanup()
+		expect(mounted.host.isConnected).toBe(false)
+		expect(readRefusal('button', 'Dark mode')).toBe(
+			'No interactive element has the accessible name "Dark mode"',
+		)
+	})
+
+	it('drives dark and light variants and leaves the requested mode applied on repetition', async () => {
+		const mounted = await mountShowcase()
+		try {
+			await applyTheme('dark-1280')
+			expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark')
+			expect(resolveAccessible('button', 'Dark mode').getAttribute('aria-pressed')).toBe('true')
+			await applyTheme('dark-390')
+			expect(resolveAccessible('button', 'Dark mode').getAttribute('aria-pressed')).toBe('true')
+			await applyTheme('light-390')
+			expect(document.documentElement.hasAttribute('data-bs-theme')).toBe(false)
+			expect(resolveAccessible('button', 'Dark mode').getAttribute('aria-pressed')).toBe('false')
+			await applyTheme('light-1280')
+			expect(document.documentElement.hasAttribute('data-bs-theme')).toBe(false)
+			await expect(applyTheme('sepia-390')).rejects.toThrow(
+				'Unsupported color-mode variant: sepia-390',
+			)
+		} finally {
+			mounted.cleanup()
+		}
+	})
 })
```

A reordering keeps every assertion, but it leaves the readers' premise implicit in case order, and
a case added above them later reddens them again with no signal. The durable alternative is a
successor unit owning `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` together, which can
give `readCascadeSheet` and `collectLayer` an explicit sheet argument so a reader names the sheet it
walks instead of selecting the first that matches. That is a contract change and is outside this
brief.

### 2. The shared reading became an exported helper

Item 6 permits a shared helper and requires it exported and cased. `extractStringArgument` is that
helper: it reads a `Literal` string and a substitution-free `TemplateLiteral`, and answers
`undefined` for anything else. It carries a direct case in `tests/setupConformance.test.ts` that
parses a module of `require` calls covering a string literal, a bare template literal, a substituted
template literal, and an identifier, and asserts the readings
`['vue', 'bootstrap', undefined, undefined]`. The export-set assertion and the import list carry the
name. The name follows the `extract*` prefix, which `.claude/rules/names.md` fixes as extracting
structure. `npm run test:policy` exits 0, so the name collides with no fleet surface.

Ancillary: decided and carried on.

### 3. The direct helper case imports the parser

That case needs real argument nodes, so it imports `parseSync` and `Visitor` from `vite` — the same
parser `extractSpecifiers` uses — rather than hand-building an AST node, which would need a type
assertion this project bars. The nodes it reads are the parser's own.

Ancillary: decided and carried on.

### 4. The readings array takes the `Array<T>` form

`const readings: (string | undefined)[]` failed `lint:check`:

```text
tests/setupConformance.test.ts:113:19: error typescript(array-type): Array type using 'T[]' is forbidden for non-simple types. Use 'Array<T>' instead.
```

It is `Array<string | undefined>`, and `lint:check` then exits 0.

Ancillary: decided and carried on.

### 5. The `it` title names the guard as the color-mode guard

Item 5 asks for a title naming `isColorModeState`. The title is `executes the color-mode guard
example verdicts`: it names the axis by its current term and matches the guide, which calls that
same export the guard under `## Tests`. Nothing else in `tests/guides.test.ts` changed.

Ancillary: decided and carried on.

### 6. lightningcss rewrites the served order statement

The deviation contract names an emitted order that contradicts the `index.scss` comment. The comment
is about what `_shell.scss` emits, and the `sass` compilation confirms it. The minified app bundle
drops the bare `@layer shell;` statement, because in that bundle `shell` is defined after every
published layer and source order already expresses it. The resulting cascade order is unchanged, so
there is no contradiction to stop on.

Recorded, no action.
