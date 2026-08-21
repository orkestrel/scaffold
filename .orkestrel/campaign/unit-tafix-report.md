## Deviation

None. Both bounds the brief set for fix 2 held (`tests/src/browser/helpers.test.ts:1009-1019` and `:1028-1045` stayed green through the change), and no criterion was unreachable.

## Touched files

| File | Change |
| --- | --- |
| `C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts` | `readName` falls through on a blank image `alt`; `contrast` refuses a floor-omitted stack the canvas would show through; `traverseAccessible` counts `FOCUSABLE_SELECTOR`; TSDoc on `readName`, `readBackdrop`, `contrast` restated |
| `C:/Users/mikes/WebstormProjects/test/src/core/types.ts` | `WaitOptions` property TSDoc drops the `1000`/`10` defaults; a `@remarks` states where a default lives |
| `C:/Users/mikes/WebstormProjects/test/src/server/helpers.ts` | `destroyScratch` `@remarks` states the retry-everything policy, its width against `REMOVE_TREE_RETRYABLE_CODES`, and the residual; `removeTree` names `destroyScratch`'s case |
| `C:/Users/mikes/WebstormProjects/test/guides/test.md` | `destroy()` paragraph rewritten; server `WaitOptions` sentence added; strictness paragraph and the `readName`, `contrast`, `createLink` test enumerations corrected |
| `C:/Users/mikes/WebstormProjects/test/tests/src/browser/helpers.test.ts` | `alt`-over-`title`, blank-`alt`-to-`title`, and translucent-only refusal cases |
| `C:/Users/mikes/WebstormProjects/test/tests/src/server/helpers.test.ts` | file-source refusal pins `code === 'EPERM'` through `captureError` |

`tests/guides.test.ts` was not touched; no fence moved.

## Diffstat

The checkout was dirty at baseline (campaign work in flight), so `git diff` cannot isolate this unit. The pre-unit copies were reconstructed by inverting each edit, then diffed; the rebuild reports a mismatch on any hunk it cannot locate exactly once and reported none. Trees: `…/scratchpad/before` and `…/scratchpad/after`.

```
 guides/test.md                    | 42 ++++++++++------
 src/browser/helpers.ts            | 57 ++++++++++++++--------
 src/core/types.ts                 | 12 +++--
 src/server/helpers.ts             | 13 ++++-
 tests/src/browser/helpers.test.ts | 23 ++++++++-
 tests/src/server/helpers.test.ts  |  8 ++-
 6 files changed, 113 insertions(+), 42 deletions(-)
```

## Diff

```diff
diff --git a/src/browser/helpers.ts b/src/browser/helpers.ts
@@ -377,11 +377,9 @@ export async function traverseAccessible(name: string): Promise&lt;HTMLElement&gt; {
 	// revisits an element, because that is one full cycle of the tab order. And the target is
 	// re-resolved on every step, because a framework may replace the node between resolution and
 	// focus arrival: the person's target is the role and name, never one node.
-	const cap =
-		document.querySelectorAll&lt;HTMLElement&gt;('a[href], button, input, select, textarea, [tabindex]')
-			.length *
-			3 +
-		10
+	// The bound is counted off `FOCUSABLE_SELECTOR`, the one population this environment reads
+	// sequential navigation from, so a tag the selector gains is a tag this traversal budgets for.
+	const cap = document.querySelectorAll&lt;HTMLElement&gt;(FOCUSABLE_SELECTOR).length * 3 + 10
 	const visited = new Set&lt;Element&gt;()
 	const trail: string[] = []
 	for (let attempt = 0; attempt &lt; cap; attempt += 1) {
@@ -592,6 +590,11 @@ export function readRole(element: Element): string | undefined {
  * no text to read. An `aria-labelledby` naming several ids joins their texts in the order the
  * attribute lists them, and an id nothing answers for is skipped rather than fatal.
  *
+ * Each step answers only when it has something to say, so a step that carries nothing hands the
+ * element to the next one. An image whose `alt` is absent or blank is the case that shows it:
+ * `&lt;img title="Chart"&gt;` is named `Chart` rather than the empty string its own `alt` step would
+ * have returned, and an image carrying both keeps answering `alt`.
+ *
  * @example
  * ```ts
  * readName(requireValue(container.querySelector('button'))) // 'Save changes'
@@ -623,7 +626,10 @@ export function readName(element: Element): string {
 			if (FIELD_ROLES[element.type] === 'button') return element.value
 		}
 	}
-	if (element instanceof HTMLImageElement) return element.alt
+	if (element instanceof HTMLImageElement) {
+		const alternative = element.alt.trim()
+		if (alternative.length &gt; 0) return alternative
+	}
 	const role = readRole(element)
 	if (role !== undefined &amp;&amp; CONTENT_ROLES.includes(role)) {
 		const text = readText(element)
@@ -962,8 +968,11 @@ export function measureContrast(front: Color, back: Color): number {
  * {@link CANVAS_COLOR} for the page a browser paints behind an unstyled document, or the color of
  * the surface a fragment is really rendered into.
  *
- * When no layer paints, the floor is returned by identity. That is what lets `contrast` tell an
- * unpainted stack from one that genuinely resolves to the floor's own color.
+ * When no layer paints, the floor is returned by identity. Wherever the walk reaches no opaque
+ * layer at all the floor is part of the answer, and a caller that must tell such a stack from one
+ * the layers themselves resolve reads the same element over a second floor: the two readings agree
+ * exactly when an opaque layer ended the walk. {@link contrast} takes that second reading, and
+ * refuses a stack the assumed canvas would otherwise show through.
  *
  * @example
  * ```ts
@@ -985,11 +994,11 @@ export function readBackdrop(element: Element, floor: Color): Color {
  * Measures the WCAG 2.x contrast ratio between an element's computed text and background colors.
  *
  * @param element - The element whose rendered text contrast to measure.
- * @param floor - The opaque color the backdrop walk ends on. Omit it to refuse an unpainted stack
- * instead of assuming one.
+ * @param floor - The opaque color the backdrop walk ends on. Omit it to refuse a stack the floor
+ * would show through instead of assuming one.
  * @returns The relative-luminance contrast ratio.
  * @throws Thrown when the element exposes no computed foreground color, and — with `floor` omitted
- * — when nothing from the element upwards paints a background.
+ * — when the walk from the element upwards reaches no opaque layer.
  *
  * @remarks
  * A transparent or translucent background resolves through the element's ancestors: every painted
@@ -998,11 +1007,13 @@ export function readBackdrop(element: Element, floor: Color): Color {
  * full-strength paint. A translucent foreground then resolves against that effective background
  * before luminance is measured.
  *
- * With `floor` omitted, at least one element from the target upwards must paint: the measurement
- * throws rather than assuming a white canvas when nothing in the chain declares a background color.
- * Supply a floor wherever the caller knows what the stack sits on — a fragment mounted into a
- * painted host, or a document whose canvas is {@link CANVAS_COLOR} — and the composite is taken
- * over it rather than refused.
+ * With `floor` omitted, the walk from the target upwards must reach a fully opaque layer: the
+ * measurement throws rather than assuming a white canvas wherever that canvas would still be part
+ * of the answer. A chain that declares no background color at all and a chain painting only
+ * translucent layers are refused alike, because the number either one produces is as much a report
+ * of the assumption as of the page. Supply a floor wherever the caller knows what the stack sits on
+ * — a fragment mounted into a painted host, or a document whose canvas is {@link CANVAS_COLOR} —
+ * and the composite is taken over it rather than refused.
  *
  * The element itself must expose a computed foreground color either way. A detached element exposes
  * none, and the measurement throws rather than guessing one.
@@ -1018,10 +1029,16 @@ export function contrast(element: Element, floor?: Color): number {
 	const foreground = parseColor(getComputedStyle(element).color)
 	if (foreground === undefined) throw new Error('Computed foreground color is unavailable')
 	const backdrop = readBackdrop(element, floor ?? CANVAS_COLOR)
-	// `readBackdrop` hands its floor straight back when no layer painted, so identity with the
-	// floor this call supplied is the unpainted stack rather than a coincidence of channel values.
-	if (floor === undefined &amp;&amp; backdrop === CANVAS_COLOR) {
-		throw new Error('Computed background color is unavailable')
+	if (floor === undefined) {
+		// A walk that ends on an opaque layer answers the same color whatever floor it was handed, so
+		// a second walk onto the canvas's opposite is what separates a backdrop this stack really
+		// paints from one the assumed canvas is still showing through: any part of the floor left
+		// visible moves every channel between the two readings. One reading catches the stack that
+		// paints nothing and the stack whose every layer is translucent.
+		const probed = readBackdrop(element, [0, 0, 0, 1])
+		if (probed.some((channel, index) =&gt; channel !== backdrop[index])) {
+			throw new Error('Computed background color is unavailable')
+		}
 	}
 	return measureContrast(blendColor(foreground, backdrop), backdrop)
 }
diff --git a/src/core/types.ts b/src/core/types.ts
@@ -40,11 +40,17 @@ export interface TeardownInterface {
 	destroy(): Promise&lt;void&gt;
 }
 
-/** Configures a bounded asynchronous wait. */
+/**
+ * Configures a bounded asynchronous wait.
+ *
+ * @remarks
+ * A default belongs to the function that reads these bounds rather than to the shape, because the
+ * consumers do not agree on one. Each states its own numbers in its `@remarks`.
+ */
 export interface WaitOptions {
-	/** The elapsed-time limit in milliseconds. Default: `1000`. */
+	/** The elapsed-time limit in milliseconds. */
 	readonly budget?: number
-	/** The delay between readings in milliseconds. Default: `10`. */
+	/** The delay between readings in milliseconds. */
 	readonly interval?: number
 	/** The signal that aborts the wait. */
 	readonly signal?: AbortSignal
diff --git a/src/server/helpers.ts b/src/server/helpers.ts
@@ -110,7 +110,8 @@ export function createLink(path: string, source: string): void {
  * `rmSync` `maxRetries`/`retryDelay` options do not cover this error class on that host: probed
  * against a real held directory, they neither delay nor retry before rethrowing, so the retry
  * is implemented here with a synchronous sleep instead. Ten attempts 100ms apart bound the wait
- * at roughly one second.
+ * at roughly one second. A hold that outlasts that second is {@link destroyScratch}'s case, which
+ * retries every refusal inside a caller's budget rather than the codes named here.
  */
 export function removeTree(path: string): void {
 	for (let attempt = 1; ; attempt++) {
@@ -354,6 +355,16 @@ export async function waitForSocketClose(socket: Socket, options?: WaitOptions):
  * rather than exactly once. {@link ScratchInterface.destroy} stays synchronous and is unchanged; this
  * is the bounded retry around it. A directory nothing releases still fails, with the host's own
  * refusal as the `cause`.
+ *
+ * Every refusal is retried, deliberately, and that is wider than {@link removeTree}'s policy: that
+ * one retries the codes {@link REMOVE_TREE_RETRYABLE_CODES} names and rethrows the rest at once.
+ * The hold this waits out is not classifiable across hosts — Windows reports a working-directory
+ * hold as `EPERM`, POSIX hosts and network filesystems report their own — so a code list here would
+ * be a list of the hosts it had been run on. The residual is the cost of that: a fault no wait can
+ * clear, such as a path removed from under the allocation or a permission the process never had,
+ * spends the whole budget before it surfaces, and it surfaces wrapped in the exhaustion error with
+ * the host's refusal as `cause` rather than by identity. Pass a shorter `budget` or a `signal`
+ * wherever a caller must bound that cost.
  */
 export async function destroyScratch(
 	scratch: ScratchInterface,
diff --git a/guides/test.md b/guides/test.md
@@ -367,6 +367,11 @@ shared by every directory on one filesystem, an index node is reused once its di
 and a creation time repeats within the host's timestamp resolution. It is exported so a fixture that
 manages its own directory can make the same check rather than trusting a path.
 
+`waitForSocketClose` and `destroyScratch` are the bounded waits on this entry, and both take the
+core entry's `WaitOptions`. Import that type from `@orkestrel/test` beside the helpers themselves
+from `@orkestrel/test/server`: the shape has one home, and this entry names it in a signature rather
+than re-exporting it.
+
 `createLink` is the link mechanism `ScratchInterface.link` calls, and
@@ -1266,20 +1271,25 @@ outside.has('made') // true — destroy unlinks `gate` and leaves what it pointe
 outside.destroy()
 ```
 
-`destroy()` is synchronous and attempts the removal once, which is enough wherever the test process
-is the only thing that touched the directory. It is not enough on Windows after a child process that
-had the allocation as its working directory exits: the host holds the directory for a short interval
-afterwards and refuses the removal with `EPERM`. Reach for `destroyScratch` there. It retries
-`destroy()` inside a budget, defaults to waiting up to `10000` milliseconds at a `25` millisecond
-interval, and hands the host's own last refusal back as the exhaustion error's `cause` when the
-directory is never released.
+`destroy()` is synchronous, and it already outlasts the short `EPERM` a Windows host reports for a
+directory a just-exited child held as its working directory: `removeTree` retries that removal ten
+times 100 milliseconds apart, which bounds the blocking wait at roughly a second. Nothing extra is
+needed for a child the test has already reaped.
+
+Reach for `destroyScratch` where the hold outlasts that second — a holder still running, a host
+still flushing, a network filesystem taking its time. It retries `destroy()` inside a budget that
+defaults to `10000` milliseconds at a `25` millisecond interval, awaits between attempts instead of
+blocking the thread, takes a `signal` that ends the wait early, and hands the host's own last
+refusal back as the exhaustion error's `cause` when the directory is never released. Every refusal
+is retried, not a named list of codes, so a fault no wait can clear costs the whole budget before it
+surfaces.
 
 ```ts
 import { createScratch, destroyScratch } from '@orkestrel/test/server'
 
 const workspace = createScratch({ prefix: 'build-' })
 
-// A child process ran with `workspace.path` as its working directory, and the test has killed it.
+// The child that had `workspace.path` as its working directory is still shutting down.
 await destroyScratch(workspace) // resolves as soon as the host lets the directory go
 ```
@@ -1435,8 +1445,9 @@ what shows through it. A translucent foreground then resolves against that effec
 before luminance is measured.
 
 The `floor` parameter is the opaque color that walk ends on, and omitting it is deliberately strict.
-Omit it and a stack where nothing from the element upwards paints is refused, because assuming a
-white canvas turns "this surface declares no background" into a number that reads like a
+Omit it and every stack the floor would still show through is refused — the one where nothing from
+the element upwards paints, and the one whose painted layers are all translucent — because assuming
+a white canvas turns "this surface declares no background" into a number that reads like a
 measurement. Supply it and the same stack composites onto it instead. Supply `CANVAS_COLOR` for a
@@ -1637,7 +1648,8 @@ Each entry names the rules its file proves. The test names carry the cases.
   at once, and exactly the input types `FIELD_ROLES` carries against one it leaves out; `readName`
   takes an `aria-labelledby` list joined in order past an id nothing answers for, an `aria-hidden`
   glyph dropped from a content role's text, `aria-label` over inner text, a form control's own
-  labels, a button input named by its value, an image named by its alternative text, and the fall
+  labels, a button input named by its value, an image named by its alternative text over a `title`
+  it also carries, an image carrying no alternative text named by that `title` instead, and the fall
   through to `title` and then to an empty string; `readStates` takes every declared state in one
@@ -1649,8 +1661,9 @@ Each entry names the rules its file proves. The test names carry the cases.
   `contrast` takes a translucent surface composited onto the opaque layer beneath it, a fully opaque
   stack over two different ancestors as the control from outside that population, a stack where
-  nothing paints, a detached element whose computed foreground does not exist, and the same
-  unpainted and translucent stacks measured against a supplied floor instead of refused. The color
+  nothing paints and one whose every painted layer is translucent, a detached element whose computed
+  foreground does not exist, and the same unpainted and translucent stacks measured against a
+  supplied floor instead of refused. The color
   leaves beneath it take their own inputs: `parseColor` across the legacy and modern syntaxes, a
@@ -1696,7 +1709,8 @@ Each entry names the rules its file proves. The test names carry the cases.
   absolute source, a relative source resolved against the link's own directory against a decoy one
   level up, a dangling link, the host's `EEXIST` on an occupied path, and — where the host makes no
-  symbolic link — a file source refused with nothing left behind. `removeTree` takes a live process
+  symbolic link — a file source refused with the host's own `EPERM` and nothing left behind.
+  `removeTree` takes a live process
   holding the tree as its working directory, and the two hosts split rather than branching at
diff --git a/tests/src/browser/helpers.test.ts b/tests/src/browser/helpers.test.ts
@@ -698,13 +698,22 @@ describe('readName', () =&gt; {
 		expect(readName(requireValue(container.querySelector('input')))).toBe('Send')
 	})
 
-	it('names an image by its alternative text', () =&gt; {
+	it('names an image by its alternative text, over a title it also carries', () =&gt; {
 		const container = buildFixture(
-			'&lt;img alt="Chart" src="data:image/gif;base64,R0lGODlhAQABAAAAACw="&gt;',
+			'&lt;img alt="Chart" title="Quarterly figures" src="data:image/gif;base64,R0lGODlhAQABAAAAACw="&gt;',
 		)
 		expect(readName(requireValue(container.querySelector('img')))).toBe('Chart')
 	})
 
+	it('carries an image with no alternative text on down the chain to its title', () =&gt; {
+		const container = buildFixture(
+			'&lt;img alt="" title="Chart" src="data:image/gif;base64,R0lGODlhAQABAAAAACw="&gt;' +
+				'&lt;img id="untitled" alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACw="&gt;',
+		)
+		expect(readName(requireValue(container.querySelector('img')))).toBe('Chart')
+		expect(readName(requireValue(container.querySelector('#untitled')))).toBe('')
+	})
+
 	it('falls through to title, and to an empty string when nothing names it', () =&gt; {
@@ -1025,6 +1034,16 @@ describe('contrast', () =&gt; {
 		)
 	})
 
+	it('refuses a stack whose painted layers are all translucent, because the canvas shows through', () =&gt; {
+		const container = buildFixture(
+			'&lt;div style="background: rgba(255, 255, 255, 0.5)"&gt;' +
+				'&lt;p style="color: #000"&gt;Ready&lt;/p&gt;&lt;/div&gt;',
+		)
+		expect(() =&gt; contrast(requireValue(container.querySelector('p')))).toThrow(
+			'Computed background color is unavailable',
+		)
+	})
+
 	it('measures the same unpainted stack against a supplied floor instead of refusing it', () =&gt; {
diff --git a/tests/src/server/helpers.test.ts b/tests/src/server/helpers.test.ts
@@ -17,7 +17,7 @@ import { connect, createServer as createNetServer } from 'node:net'
 import { pathToFileURL } from 'node:url'
-import { createRecorder, requireValue } from '@src/core'
+import { captureError, createRecorder, requireValue } from '@src/core'
 import {
 	createLink,
@@ -233,7 +233,11 @@ describe('createLink', () =&gt; {
 			try {
 				writeFileSync(source, 'source')
 
-				expect(() =&gt; createLink(path, source)).toThrow(Error)
+				// The `code` is what pins the rethrow: a fresh error written here would satisfy
+				// `toThrow(Error)` just as well, and the caller would lose the host's own refusal.
+				const refusal = captureError(() =&gt; createLink(path, source))
+				expect(refusal).toBeInstanceOf(Error)
+				expect(refusal).toHaveProperty('code', 'EPERM')
 
 				expect(lstatSync(path, { throwIfNoEntry: false })).toBeUndefined()
 				expect(readdirSync(root)).toStrictEqual(['source.txt'])
```

## Criterion 1 — `git status --porcelain`

Identical before and after; nothing added beyond the standing entries. Both runs printed:

```
 M guides/test.md
D  package-lock.json
 M package.json
 M src/browser/constants.ts
 M src/browser/factories.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/factories.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/guides.test.ts
 M tests/setupServer.ts
 M tests/src/browser/factories.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/factories.test.ts
 M tests/src/server/helpers.test.ts
?? package-lock.json
```

exit 0 both times.

## Criterion 2 — scoped format and lint

`npx.cmd oxfmt --config .oxfmtrc.json --check src/browser/helpers.ts src/core/types.ts src/server/helpers.ts guides/test.md tests/src/browser/helpers.test.ts tests/src/server/helpers.test.ts tests/guides.test.ts`

```
Checking formatting...

All matched files use the correct format.
Finished in 621ms on 7 files using 16 threads.
FMT_EXIT:0
```

`npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/browser/helpers.ts src/core/types.ts src/server/helpers.ts tests/src/browser/helpers.test.ts tests/src/server/helpers.test.ts tests/guides.test.ts`

```
LINT_EXIT:0
```

(no diagnostics printed; `guides/test.md` is excluded from the lint invocation because oxlint takes no Markdown)

## Criterion 3 — typecheck

`npx.cmd tsc --noEmit --project tsconfig.json`

```
TSC_EXIT:0
```

## Criterion 4 — failing-first pairs

### Fixes 1 and 2, red

`npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser`

```
 FAIL  |src:browser (chromium)| tests/src/browser/helpers.test.ts:708:2 &gt; readName &gt; carries an image with no alternative text on down the chain to its title
AssertionError: expected '' to be 'Chart' // Object.is equality
 ❯ tests/src/browser/helpers.test.ts:713:65

 FAIL  |src:browser (chromium)| tests/src/browser/helpers.test.ts:1037:2 &gt; contrast &gt; refuses a stack whose painted layers are all translucent, because the canvas shows through
AssertionError: expected [Function] to throw an error
- Expected:
null
+ Received:
undefined
 ❯ tests/src/browser/helpers.test.ts:1042:69

 Test Files  1 failed | 1 passed (2)
      Tests  2 failed | 130 passed (132)

EXIT:1
```

### Fixes 1 and 2, green

Same command after the source change:

```
 Test Files  2 passed (2)
      Tests  132 passed (132)

EXIT:0
```

### Fix 8, red against the probe

Probe: in `src/browser`… no — in `C:/Users/mikes/WebstormProjects/test/src/server/helpers.ts:97`, `throw error` was temporarily replaced by `throw new Error('Link source is a file')`, substituting a fresh error for the rethrown host refusal.

`npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server -t "refuses a source that exists as a file"`

```
 × |src:server| tests/src/server/helpers.test.ts &gt; createLink &gt; refuses a source that exists as a file and leaves the link path empty 8ms
   → expected Error: Link source is a file to have property "code" with value 'EPERM'

AssertionError: expected Error: Link source is a file to have property "code" with value 'EPERM'
- Expected:
"EPERM"
+ Received:
undefined
 ❯ tests/src/server/helpers.test.ts:240:21
    238|     const refusal = captureError(() =&gt; createLink(path, source))
    239|     expect(refusal).toBeInstanceOf(Error)
    240|     expect(refusal).toHaveProperty('code', 'EPERM')

 Test Files  1 failed | 1 skipped (2)
      Tests  1 failed | 115 skipped (116)

EXIT:1
```

The old assertion's blindness is recorded in the same output: the failure is on line 240, so line 239's `toBeInstanceOf(Error)` — the property the replaced `toThrow(Error)` asserted — passed against the fresh error.

### Fix 8, plant removed and green

Plant removal verified by searching the file's diff for the planted string: `git diff -- src/server/helpers.ts | grep -E "^[+-]" | grep -i "Link source is a file"` returned nothing (`PLANT_HITS:1`, grep's no-match status).

```
 ✓ |src:server| tests/src/server/helpers.test.ts &gt; createLink &gt; refuses a source that exists as a file and leaves the link path empty 4ms

 Test Files  1 passed | 1 skipped (2)
      Tests  1 passed | 115 skipped (116)

EXIT:0
```

This host runs that case rather than skipping it: `FILE_LINKS` is false and `DIRECTORY_LINKS` is true here.

## Criterion 5 — the four projects, final tree

`npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project &lt;name&gt;`

```
=== src:core
 Test Files  2 passed (2)
      Tests  67 passed (67)
EXIT:0
=== src:server
 Test Files  2 passed (2)
      Tests  107 passed | 9 skipped (116)
EXIT:0
=== src:browser
 Test Files  2 passed (2)
      Tests  132 passed (132)
EXIT:0
=== guides
 Test Files  1 passed (1)
      Tests  13 passed (13)
EXIT:0
```

The `src:server` skips are the host-capability guards (`FILE_LINKS`), unchanged from the pre-unit baseline, which also read `107 passed | 9 skipped (116)`.

## Shared-file patch, report-only

`src/browser/constants.ts` is not an owned file. Fix 3 gives `FOCUSABLE_SELECTOR` a second reader, and the constant's `@remarks` names only `describeFocus`. Exact patch:

```diff
--- a/src/browser/constants.ts
+++ b/src/browser/constants.ts
@@
  * `describeFocus` queries this selector and then drops what a browser drops: an element the
  * accessibility tree does not present, a disabled control, and one removed from the sequence by
- * `tabindex="-1"`.
+ * `tabindex="-1"`. `traverseAccessible` counts the same population to bound its walk, so this is
+ * the one list either one reads.
  */
```

The guide's constants row (`guides/test.md:164`) stays true as written and needs no change.

## Decisions recorded under the deviation contract

- **Fix 2 derivation.** `readBackdrop`'s public signature is unchanged and no export was added. `contrast` derives the termination privately by reading the same element over the canvas's opposite floor: the two readings agree exactly when an opaque layer ended the walk. A non-exported module helper was refused because every function in `src/browser/helpers.ts` is exported, and a duplicate ancestor walk was refused as duplication.
- **Fix 1 trims.** The image branch returns `element.alt.trim()` and falls through on a blank one, matching the neighbouring `aria-label` and `title` steps, which both trim before testing for content.
- **Fix 5 second half.** `removeTree`'s `@remarks` gained one sentence naming `destroyScratch`'s case, closing the finding's "neither names the other's policy" half. The prescribed text lives on `destroyScratch`.
- **Guide passages beyond those named.** The `readName` and `createLink` test enumerations and the "Measure what a reader sees" strictness paragraph were corrected, because the new tests and the new refusal make each incomplete or false as written. Line wrapping in the Tests-section bullets was left as the edits produced it; `oxfmt --check` accepts it and rewrapping cascades through the rest of the bullet.