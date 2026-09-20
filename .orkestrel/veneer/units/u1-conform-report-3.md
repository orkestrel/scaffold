# U1-conform — successor report 3: the cascade readers name the sheets they walk

`readCascadeSheet` and `collectLayer` take the stylesheets they walk, and the document's own sheets
are the default. Every production caller in `tests/src/styles/**` is unchanged and passes. The cases
that fixture a probe cascade name their sheets, so the page's published cascade no longer decides
their reading, and a new case proves the default selects that published cascade. `mountShowcase`
stays where it is. Every gate in item 3 exits 0 on managed Chromium and on Edge.

One assertion the brief told me to keep had to change to stay true: Deviation 1 carries it.

## Touched files

| File | Change |
| --- | --- |
| `tests/setupBrowser.ts` | `readCascadeSheet` and `collectLayer` take a `sheets` parameter defaulting to `document.styleSheets`; the doc blocks name the default and the fixturing caller |
| `tests/setupBrowser.test.ts` | The probe-cascade cases pass their sheets; a case proves the default; the `readRules` control in the refusal case reads the population it actually walks |

## Diffstat

```text
 tests/setupBrowser.test.ts | 53 ++++++++++++++++++++++++++++++++++++----------
 tests/setupBrowser.ts      | 30 ++++++++++++++++++--------
 2 files changed, 63 insertions(+), 20 deletions(-)
```

## The two signatures as declared

```ts
export function readCascadeSheet(
	sheets: Iterable<CSSStyleSheet> = document.styleSheets,
): CSSStyleSheet | undefined

export function collectLayer(
	name: string,
	sheets: Iterable<CSSStyleSheet> = document.styleSheets,
): readonly CSSRule[]
```

`collectLayer` still throws `The document loaded no Veneer cascade` where `readCascadeSheet(sheets)`
returns nothing. Nothing new is exported: the export-set assertion in `tests/setupBrowser.test.ts`
is unchanged and passes.

## The diff per file

The baseline is the working tree at `d8b0e65` plus U1-conform, the manifest step, and brief 2, all
uncommitted. `tests/setupBrowser.ts`'s `mountShowcase` hunk is brief 2's work, carried in the diff
because the file was already modified; this unit did not touch it.

```diff
diff --git a/tests/setupBrowser.ts b/tests/setupBrowser.ts
index 1f03355..1138d77 100644
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@ -28,10 +28,11 @@ export async function mountShowcase(): Promise<{
 	readonly host: HTMLElement
 	cleanup(): void
 }> {
+	await import('../src/styles/index.scss')
 	await import('../app/browser/styles/index.scss')
-	const { createShowcase } = await import('../app/browser/index.js')
+	const { Showcase } = await import('../app/browser/index.js')
 	const host = mount(build('div'))
-	const showcase = createShowcase(host)
+	const showcase = new Showcase(host)
 	return {
 		host,
 		cleanup() {
@@ -264,8 +265,11 @@ export function matchesPaintedColor(first: string, second: string): boolean {
 /**
  * Reads the stylesheet the shipped cascade was loaded into.
  *
- * @returns The first stylesheet declaring a layer block named `theme`, or `undefined` when the
- *   document has loaded no such sheet.
+ * @param sheets - The stylesheets to walk. The document's own sheets are the default, and a caller
+ *   that fixtures a sheet passes it instead, so the reading is about the sheets the caller named
+ *   rather than about whatever else the shared page has loaded.
+ * @returns The first stylesheet in `sheets` declaring a layer block named `theme`, or `undefined`
+ *   when none of them declares one.
  *
  * @remarks
  * The installed `readRules` export walks every stylesheet the document loaded and reports one flat
@@ -277,8 +281,10 @@ export function matchesPaintedColor(first: string, second: string): boolean {
  *
  * A sheet whose rules the document cannot read is skipped rather than ending the walk.
  */
-export function readCascadeSheet(): CSSStyleSheet | undefined {
-	for (const sheet of Array.from(document.styleSheets)) {
+export function readCascadeSheet(
+	sheets: Iterable<CSSStyleSheet> = document.styleSheets,
+): CSSStyleSheet | undefined {
+	for (const sheet of sheets) {
 		let rules: readonly CSSRule[]
 		try {
 			rules = Array.from(sheet.cssRules)
@@ -353,9 +359,12 @@ export function collectScopeProperties(
  * Collects the rules one named layer of the shipped cascade holds.
  *
  * @param name - The layer's name.
+ * @param sheets - The stylesheets {@link readCascadeSheet} resolves the cascade from. The
+ *   document's own sheets are the default, and a caller that fixtures a cascade passes its sheet
+ *   instead.
  * @returns Every rule inside the layer's block, nested rules included, in cascade order. A layer
  *   the cascade names in its order statement and never fills returns no rules.
- * @throws An `Error` when the document has loaded no Veneer cascade, so an empty reading is never
+ * @throws An `Error` when `sheets` carries no Veneer cascade, so an empty reading is never
  *   mistaken for an empty layer.
  *
  * @remarks
@@ -365,8 +374,11 @@ export function collectScopeProperties(
  * {@link readCascadeSheet} and throws where there is none, so an unloaded cascade and an unfilled
  * layer stay apart.
  */
-export function collectLayer(name: string): readonly CSSRule[] {
-	const sheet = requireValue(readCascadeSheet(), 'The document loaded no Veneer cascade')
+export function collectLayer(
+	name: string,
+	sheets: Iterable<CSSStyleSheet> = document.styleSheets,
+): readonly CSSRule[] {
+	const sheet = requireValue(readCascadeSheet(sheets), 'The document loaded no Veneer cascade')
 	return collectNestedRules(sheet.cssRules).flatMap((rule) =>
 		rule instanceof CSSLayerBlockRule && rule.name === name
 			? collectNestedRules(rule.cssRules)
```

```diff
diff --git a/tests/setupBrowser.test.ts b/tests/setupBrowser.test.ts
index 226bff3..1bf76c2 100644
--- a/tests/setupBrowser.test.ts
+++ b/tests/setupBrowser.test.ts
@@ -189,11 +189,15 @@ describe('browser setup', () => {
 	})
 
 	it('selects the sheet carrying the theme layer, where the installed rule walk names no sheet', () => {
-		specimens.load('.vn-probe-plain { color: rgb(7, 8, 9) }')
+		const plain = specimens.load('.vn-probe-plain { color: rgb(7, 8, 9) }')
 		const element = specimens.load(PROBE_CASCADE)
-		expect(readCascadeSheet()).toBe(element.sheet)
+		const sheets = [
+			requireValue(plain.sheet, 'The plain fixture parsed to no sheet'),
+			requireValue(element.sheet, 'The probe cascade parsed to no sheet'),
+		]
+		expect(readCascadeSheet(sheets)).toBe(element.sheet)
 		const selectors = collectNestedRules(
-			requireValue(readCascadeSheet(), 'The document loaded no probe cascade').cssRules,
+			requireValue(readCascadeSheet(sheets), 'The named sheets carry no probe cascade').cssRules,
 		).flatMap((rule) => (rule instanceof CSSStyleRule ? [rule.selectorText] : []))
 		expect(selectors).not.toContain('.vn-probe-plain')
 		expect(
@@ -201,13 +205,39 @@ describe('browser setup', () => {
 		).toContain('.vn-probe-plain')
 	})
 
-	it('reports no sheet when the document has loaded no theme layer, and refuses a layer read there', () => {
-		specimens.load('.vn-probe-plain { color: rgb(7, 8, 9) }')
-		expect(readCascadeSheet()).toBeUndefined()
-		expect(() => collectLayer('elements')).toThrow('The document loaded no Veneer cascade')
+	it('walks the document by default, selecting the published cascade over a sheet a case fixtured', async () => {
+		const mounted = await mountShowcase()
+		try {
+			const element = specimens.load(PROBE_CASCADE)
+			const selected = requireValue(readCascadeSheet(), 'The document loaded no Veneer cascade')
+			expect(selected).not.toBe(element.sheet)
+			expect(
+				collectNestedRules(selected.cssRules).flatMap((rule) =>
+					rule instanceof CSSLayerBlockRule ? [rule.name] : [],
+				),
+			).toContain('theme')
+			expect(
+				collectLayer('elements').flatMap((rule) =>
+					rule instanceof CSSStyleRule ? [rule.selectorText] : [],
+				),
+			).not.toContain('.vn-probe-leaf')
+		} finally {
+			mounted.cleanup()
+		}
+	})
+
+	it('reports no sheet where no named sheet declares a theme layer, and refuses a layer read there', () => {
+		const plain = specimens.load('.vn-probe-plain { color: rgb(7, 8, 9) }')
+		const sheet = requireValue(plain.sheet, 'The plain fixture parsed to no sheet')
+		specimens.load(PROBE_CASCADE)
+		expect(readCascadeSheet([sheet])).toBeUndefined()
+		expect(() => collectLayer('elements', [sheet])).toThrow('The document loaded no Veneer cascade')
+		// The installed walk takes no sheets, so it reads the whole page: the cascade loaded beside
+		// the named sheet fills an `elements` layer there, and the walk reports that layer for a
+		// reading the named sheet supports no rules for.
 		expect(
 			readRules().filter((rule) => rule instanceof CSSLayerBlockRule && rule.name === 'elements'),
-		).toEqual([])
+		).not.toEqual([])
 	})
 
 	it('reports a grouping rule before the rules it holds, where the installed walk reports by level', () => {
@@ -241,13 +271,14 @@ describe('browser setup', () => {
 	})
 
 	it('reads every rule of the named layer block, and reports nothing for a layer the cascade never fills', () => {
-		specimens.load(PROBE_CASCADE)
+		const element = specimens.load(PROBE_CASCADE)
+		const sheets = [requireValue(element.sheet, 'The probe cascade parsed to no sheet')]
 		expect(
-			collectLayer('elements').flatMap((rule) =>
+			collectLayer('elements', sheets).flatMap((rule) =>
 				rule instanceof CSSStyleRule ? [rule.selectorText] : [],
 			),
 		).toEqual(['.vn-probe-leaf'])
-		expect(collectLayer('components')).toEqual([])
+		expect(collectLayer('components', sheets)).toEqual([])
 	})
 
 	it('unions the custom properties a split scope declares, where the installed rule lookup reads one rule', () => {
```

## Item 1: the red before and the green after

The baseline red, before any edit:

```text
$ npm run test:setup:browser
 FAIL  tests/setupBrowser.test.ts:191 > selects the sheet carrying the theme layer, …
 FAIL  tests/setupBrowser.test.ts:204 > reports no sheet when the document has loaded no theme layer, …
        expected CSSStyleSheet{} to be undefined
 FAIL  tests/setupBrowser.test.ts:243 > reads every rule of the named layer block, …
        AssertionError: expected [ 'html', 'body' ] to deeply equal [ '.vn-probe-leaf' ]
 Test Files  1 failed (1)
      Tests  3 failed | 15 passed (18)
```

`[ 'html', 'body' ]` is the published cascade's own `elements` layer, read because the selection
walked the document rather than the sheet the case fixtured. After the parameter and the named
sheets:

```text
$ npm run test:setup:browser
 Test Files  1 passed (1)
      Tests  19 passed (19)
```

## Item 2: the default-proving case is falsifiable

The added case is `walks the document by default, selecting the published cascade over a sheet a
case fixtured`. It mounts the showcase itself rather than resting on an earlier case's mount, loads
the probe cascade afterwards, and asserts that the no-argument reading selects a sheet that is not
the probe, that the selected sheet declares a `theme` layer block, and that the no-argument
`collectLayer('elements')` reading carries no probe rule.

A plant confirmed it binds to the default rather than passing on the page's arrangement. Both
defaults were changed to `[]` in `tests/setupBrowser.ts` — a file this unit owns, so the plant
touched nothing outside it — and only the new case reddened:

```text
$ sed -i 's|= document.styleSheets,|= [],|g' tests/setupBrowser.ts
$ npm run test:setup:browser
 FAIL  tests/setupBrowser.test.ts:208 > walks the document by default, selecting the published cascade over a sheet a case fixtured
 Error: The document loaded no Veneer cascade
 ❯ tests/setupBrowser.test.ts:212:20
 Test Files  1 failed (1)
      Tests  1 failed | 18 passed (19)
```

The file was restored from a copy taken before the plant, and the restored file reads
`sheets: Iterable<CSSStyleSheet> = document.styleSheets,` at both declarations:

```text
$ grep -n "Iterable<CSSStyleSheet>" tests/setupBrowser.ts
285:	sheets: Iterable<CSSStyleSheet> = document.styleSheets,
379:	sheets: Iterable<CSSStyleSheet> = document.styleSheets,
$ npm run test:setup:browser
 Test Files  1 passed (1)
      Tests  19 passed (19)
```

The copy was taken and removed under the system temporary directory, outside this checkout.

## Item 3: the gates

Run in `C:/Users/mikes/WebstormProjects/veneer` on Windows under Git Bash, on 2026-09-20.

### Managed Chromium and Node

```text
$ npm run format:check
All matched files use the correct format.
Finished in 752ms on 80 files using 16 threads.          exit=0

$ npm run lint:check
oxlint --config .oxlintrc.json --deny-warnings .
exit=0 (no diagnostics printed)

$ npm run check
tsc --noEmit -p configs/src/tsconfig.core.json
tsc --noEmit -p configs/src/tsconfig.browser.json
tsc --noEmit -p configs/src/tsconfig.styles.json
vue-tsc --noEmit -p configs/app/tsconfig.browser.json
exit=0

$ npm run build
dist/app/browser/assets/index-BsLnrzvD.css  31.59 kB | gzip: 4.07 kB
dist/app/browser/assets/index-D2JnOl_e.js    2.31 kB | gzip: 0.96 kB
✓ built in 296ms                                          exit=0

$ npm run test:setup:browser
 Test Files  1 passed (1)
      Tests  19 passed (19)                               exit=0

$ npm run test:src:styles
 Test Files  7 passed (7)
      Tests  40 passed (40)                               exit=0

$ npm run test:src
 Test Files  4 passed (4)
      Tests  17 passed (17)                               exit=0

$ npm run test:app
 Test Files  2 passed (2)
      Tests  3 passed (3)                                 exit=0

$ npm run test:journey
 Test Files  4 passed (4)
      Tests  32 passed | 4 skipped (36)                   exit=0

$ npm run test:setup
 Test Files  3 passed (3)
      Tests  84 passed (84)                               exit=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)                 exit=0
```

### Edge

```text
$ PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser
 Test Files  1 passed (1)
      Tests  19 passed (19)                               exit=0

$ PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles
 Test Files  7 passed (7)
      Tests  40 passed (40)                               exit=0
```

The `dist/app/browser/assets/index-BsLnrzvD.css` digest is report 2's, so the build's output is
unmoved by this unit — it touches no file the build reads.

## `git status --porcelain`, tracked rows

```text
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

The untracked rows are report 2's unchanged: `app/browser/Showcase.ts`, `src/browser/ColorMode.ts`,
`tests/app/browser/Showcase.test.ts`, `tests/setupListeners.ts`,
`tests/src/browser/ColorMode.test.ts`.

This list is report 2's tracked rows plus `M tests/setupBrowser.test.ts`, which this brief owns and
item 2 directs. Nothing else moved. The report sits under `tmp/`, which git ignores.

## Acceptance criteria

1. Met. `readCascadeSheet(sheets = document.styleSheets)` and
   `collectLayer(name, sheets = document.styleSheets)` accept the sheets they walk. Every production
   caller — `tests/src/styles/index.test.ts:8,24,29` and `tests/src/styles/tokens.test.ts:31,51` —
   is unchanged, and `test:src:styles` exits 0 on managed Chromium and on Edge.
2. Met. `npm run test:setup:browser` exits 0 on managed Chromium and on Edge. The two
   `mountShowcase` cases are where they were, at their original positions in the `browser setup`
   block. The probe-cascade cases name their sheets, so their reading does not depend on what else
   the page carries. The default is asserted by the added case, which reddens when the default is
   removed.
3. Met. Every gate in item 3 exits 0, each recorded with its final lines.
4. Met with one added row, which the brief's own item 2 requires: `M tests/setupBrowser.test.ts`.
   Deviation 2 records it.

## Deviations

### 1. The refusal case's `readRules` control had to be inverted to stay true

**Expected.** Item 2 says to keep the `readRules()` assertions as they are.

**Found.** Keeping the one in `reports no sheet …` leaves `test:setup:browser` red after the
parameter change:

```text
$ npm run test:setup:browser
 FAIL  tests/setupBrowser.test.ts:229 > reports no sheet where no named sheet declares a theme layer, and refuses a layer read there
 AssertionError: expected [ CSSLayerBlockRule{}, …(1) ] to deeply equal []
 ❯ tests/setupBrowser.test.ts:236:4
 Test Files  1 failed (1)
      Tests  1 failed | 18 passed (19)
```

That assertion reads `readRules()`, which takes no sheets and answers from the whole page. Its
premise was that the page carries no `elements` layer block. Brief 2's item 1 made that premise
false: `mountShowcase` loads the published cascade into the shared page, and the cascade fills an
`elements` layer. The assertion is therefore a statement about the page rather than about the
reader under test, and it is the same order dependence this brief exists to remove — it would red
again the next time anything loads a cascade earlier in the file.

**Decided.** The control's job is the contrast it names in the case title: the installed walk cannot
be scoped to a sheet, so it cannot tell an unloaded cascade from an unfilled layer. The case now
states that contrast directly and carries its own premise. It loads `PROBE_CASCADE` beside the plain
sheet, hands the readers the plain sheet alone, and asserts that the readers refuse while
`readRules()` reports the `elements` layer the case itself put on the page. The case no longer
depends on what any other case loaded, in either direction.

The title changed with it, from `reports no sheet when the document has loaded no theme layer …` to
`reports no sheet where no named sheet declares a theme layer …`, because the reader no longer walks
the document there.

**Done or not done.** Done, inside an owned file. The change is item 2's instruction to keep every
assertion's meaning, applied where keeping its text would have made it assert something else.

Recorded, carried on.

### 2. The status carries one row report 2 does not

**Expected.** Criterion 4 asks for report 2's tracked rows exactly.

**Found.** `M tests/setupBrowser.test.ts` is added. Report 2 listed that file off-limits and left it
clean; this brief owns it and item 2 requires editing it, so the row is the unit's own required
output rather than drift. No other row moved.

Recorded, carried on.

### 3. The parameter takes `Iterable<CSSStyleSheet>`

The deviation contract hands me the parameter's type. `Iterable<CSSStyleSheet>` is the reader's
honest contract and matches this file's neighbouring walker, `collectNestedRules(rules:
Iterable<CSSRule>)`. It also lets the default be `document.styleSheets` itself — a live
`StyleSheetList`, which is iterable and is not an array — rather than
`Array.from(document.styleSheets)`, so the no-argument call allocates nothing and the signature
states what the walk needs. The body's `Array.from` is gone with it: `for (const sheet of sheets)`
consumes the iterable directly.

The name is `sheets`, as the brief writes it. Every call site passes an array literal, which
satisfies `Iterable<CSSStyleSheet>`.

Ancillary: decided and carried on.

### 4. The throw's text and its `@throws` line differ in subject

Item 1 requires the error text unchanged, so `collectLayer` still throws `The document loaded no
Veneer cascade` even where the caller named its own sheets. The `@throws` line now reads `when
sheets carries no Veneer cascade`, which is what the function does. The message is the wider claim
of the two, and a caller that passes its own sheets reads it in the case that names it. Changing
the text would break `tests/src/styles/**` expectations and the case at
`tests/setupBrowser.test.ts` that asserts on it, which item 1 bars.

Recorded, no action.

### 5. The default-proving case mounts the showcase itself

The brief allows resting on an earlier `mountShowcase` call in the same file. The case calls
`mountShowcase` itself and cleans up in a `finally` block, so it carries its own premise. Resting on
declaration order is the failure mode this brief is closing, and a case that reads the page an
earlier case left would reintroduce it one door along.

Ancillary: decided and carried on.
