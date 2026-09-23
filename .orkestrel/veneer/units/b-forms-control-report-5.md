# Unit B-FORMS-CONTROL, round 5 — report

## Edits applied

1. `tests/app/browser/integration.test.ts`, plain-select focus case — inserted comment and
   `preceding` block before the `traverseAccessible` call:

   ```ts
   // Tab traversal is what earns `:focus-visible`, which is the state the ring reader measures.
   // The traversal starts from the `Range` specimen's control rather than from the document's own
   // start: a walk from the start crosses the `Form control date` specimen, whose control keeps
   // focus on itself while Tab steps through its date fields, and the installed `driveTraversal`
   // walk stops at the first element it reaches twice.
   const preceding = requireValue(
       readSpecimen(mounted.host, 'Range').querySelector<HTMLElement>('.form-range'),
       'The "Range" specimen renders no .form-range',
   )
   preceding.focus()
   const reached = await traverseAccessible(readName(control))
   ```

2. `tests/app/browser/integration.test.ts`, input-group button focus case — rewrapped comment now
   reads: "...The reading below uses the button's own border width, which is the width the group's
   pull-back is written in." and inserted the `preceding` block before the `traverseAccessible`
   call:

   ```ts
   // The traversal starts from the `Input group addons` specimen's control rather than from the
   // document's own start, for the reason the plain-select case states.
   const preceding = requireValue(
       readSpecimen(mounted.host, 'Input group addons').querySelector<HTMLElement>('.form-control'),
       'The "Input group addons" specimen renders no .form-control',
   )
   preceding.focus()
   const reached = await traverseAccessible(readName(control))
   ```

3. `tests/src/styles/components/input-group.test.ts` — comment now reads: "The same control
   outside a group is no flex item; it takes the full width the `.form-control` rule gives it." and
   the assertion now reads `expect(bare.getBoundingClientRect().width).toBe(600)`.

4. `guides/veneer.md` § Input group classes — sentence now reads: "Every child after the first
   pulls back by `--bs-border-width`, so two neighbours paint one line, where each neighbour's
   border is one `--bs-border-width` wide; a control's own border is the one the `.form-control`
   rule ships, so the seam paints one line, and the group squares each corner a neighbour touches
   while the group's outer corners keep the child's own radius." (rewrapped to stay under 100
   columns).

## Gate table

| Command | Exit | Reading |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` (owned files) | 0 | All matched files use the correct format. |
| `npx oxlint --config .oxlintrc.json --deny-warnings` (owned TypeScript files) | 0 | No output, no findings. |
| `npm run check` | 0 | `tsc`, `check:src:core`, `check:src:browser`, `check:src:styles`, `check:app:browser` all clean. |
| `npm run build:src` | 0 | Core, browser, and styles bundles built with no errors. |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/input-group.test.ts` | 0 | 1 file, 19 tests passed. |
| `npm run test:guides` | 0 | 1 file, 18 tests passed. |
| `CAPTURE=1 npm run test:journey -- --project 'journey:light-1280*'` | 0 | 1 file, 38 tests passed (115.06s tests). |
| `CAPTURE=1 npm run test:journey -- --project 'journey:dark-1280*'` | 0 | 1 file, 38 tests passed (118.51s tests). |
| `CAPTURE=1 npm run test:journey -- --project 'journey:light-390*'` | 0 | 1 file, 38 tests passed (98.37s tests). |
| `CAPTURE=1 npm run test:journey -- --project 'journey:dark-390*'` | 0 | 1 file, 38 tests passed (103.81s tests). |

Frame listing under `tmp/capture/states/` after the four runs:

```
form-select-base-focus--dark-1280.png
form-select-base-focus--dark-390.png
form-select-base-focus--light-1280.png
form-select-base-focus--light-390.png
input-group-button-focus--dark-1280.png
input-group-button-focus--dark-390.png
input-group-button-focus--light-1280.png
input-group-button-focus--light-390.png
```

All eight named frames (two frames × four variants) exist.

## Status and diff output

```text
$ git status --porcelain
 M guides/veneer.md
 M tests/app/browser/integration.test.ts
 M tests/src/styles/components/input-group.test.ts

$ git diff f82de43 --stat
 guides/veneer.md                                |  8 ++++----
 tests/app/browser/integration.test.ts           | 20 ++++++++++++++++++--
 tests/src/styles/components/input-group.test.ts |  5 +++--
 3 files changed, 25 insertions(+), 8 deletions(-)
```

Full diff against `f82de43` (matches § Edits exactly, no other lines touched):

```diff
diff --git a/guides/veneer.md b/guides/veneer.md
index fd6c016..6d6414f 100644
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -1302,10 +1302,10 @@ group; each element's own rules ship from `src/styles/components/_validation.scs
 § Validation classes describes.
 
 Every child after the first pulls back by `--bs-border-width`, so two neighbours paint one line,
-where each neighbour's border is one `--bs-border-width` wide; a control whose border the browser
-still draws paints two columns at its seam until the `form-control` key ships its border, and
-the group squares each corner a neighbour touches while the group's outer corners keep the child's
-own radius. Feedback and tooltip elements are the children left in place, so neither pulls back nor
+where each neighbour's border is one `--bs-border-width` wide; a control's own border is the one
+the `.form-control` rule ships, so the seam paints one line, and the group squares each corner a
+neighbour touches while the group's outer corners keep the child's own radius. Feedback and
+tooltip elements are the children left in place, so neither pulls back nor
 loses a corner: feedback wraps onto a line of its own under the row, and a tooltip is positioned
 absolutely below the group (`position: absolute; top: 100%`), so it takes no part in the wrap. A
 group carrying the `has-validation` class ends with its feedback, so the squaring counts one child
diff --git a/tests/app/browser/integration.test.ts b/tests/app/browser/integration.test.ts
index e0d9234..fdc672d 100644
--- a/tests/app/browser/integration.test.ts
+++ b/tests/app/browser/integration.test.ts
@@ -1008,6 +1008,15 @@ describe('journey', () => {
 			'The "Form select disabled" specimen renders no .form-select',
 		)
 		// Tab traversal is what earns `:focus-visible`, which is the state the ring reader measures.
+		// The traversal starts from the `Range` specimen's control rather than from the document's own
+		// start: a walk from the start crosses the `Form control date` specimen, whose control keeps
+		// focus on itself while Tab steps through its date fields, and the installed `driveTraversal`
+		// walk stops at the first element it reaches twice.
+		const preceding = requireValue(
+			readSpecimen(mounted.host, 'Range').querySelector<HTMLElement>('.form-range'),
+			'The "Range" specimen renders no .form-range',
+		)
+		preceding.focus()
 		const reached = await traverseAccessible(readName(control))
 		expect(reached).toBe(control)
 		expect(control.matches(':focus-visible')).toBe(true)
@@ -1414,8 +1423,8 @@ describe('journey', () => {
 		// At rest the button sits one step above the control on the group's stacking levels. It
 		// pulls its leading border back by one border width over the control's trailing border, so
 		// the button's leading border paints over the outer column of that border until the control
-		// is lifted past it. The reading below uses the button's own border width, because the
-		// control's border is the browser's own until the `form-control` key ships its border.
+		// is lifted past it. The reading below uses the button's own border width, which is the
+		// width the group's pull-back is written in.
 		expect(readStyle(control, 'z-index')).toBe('auto')
 		expect(readStyle(button, 'z-index')).toBe('2')
 		expect(button.getBoundingClientRect().left).toBeCloseTo(
@@ -1423,6 +1432,13 @@ describe('journey', () => {
 				Number.parseFloat(readStyle(button, 'border-left-width')),
 			1,
 		)
+		// The traversal starts from the `Input group addons` specimen's control rather than from the
+		// document's own start, for the reason the plain-select case states.
+		const preceding = requireValue(
+			readSpecimen(mounted.host, 'Input group addons').querySelector<HTMLElement>('.form-control'),
+			'The "Input group addons" specimen renders no .form-control',
+		)
+		preceding.focus()
 		const reached = await traverseAccessible(readName(control))
 		expect(reached).toBe(control)
 		expect(control.matches(':focus-visible')).toBe(true)
diff --git a/tests/src/styles/components/input-group.test.ts b/tests/src/styles/components/input-group.test.ts
index 60974b4..d54fd74 100644
--- a/tests/src/styles/components/input-group.test.ts
+++ b/tests/src/styles/components/input-group.test.ts
@@ -59,9 +59,10 @@ describe('input group layout', () => {
 		// Every child shares one line and one height, which `stretch` decides.
 		const heights = new Set(row.map((box) => Math.round(box.height)))
 		expect(heights.size).toBe(1)
-		// The same control outside a group is no flex item and keeps its own intrinsic width.
+		// The same control outside a group is no flex item; it takes the full width the
+		// `.form-control` rule gives it.
 		expect(readStyle(bare, 'position')).toBe('static')
-		expect(bare.getBoundingClientRect().width).toBeLessThan(600)
+		expect(bare.getBoundingClientRect().width).toBe(600)
 	})
 
 	it('lets a select and a floating wrapper take the free space the way a control does', () => {
```

## Deviations

None. Every edit under § Edits applied as written, every gate exited 0, and every named frame
exists under `tmp/capture/states/`.

## Claims flagged as unverified

None. Every gate command was run in this session and its exit code and reading recorded above.
