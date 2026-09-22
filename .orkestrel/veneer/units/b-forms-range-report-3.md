# Unit B-FORMS-RANGE-3 report — reverse the `flush-box` extraction (D15)

## Diffs

`src/styles/_mixins.scss`:

```diff
-// Fills the line and carries no padding of its own. The pair is what a block-level control and a
-// full-width caption both reset, and `scanStyleBlocks` refuses two partials whose rules write it
-// out twice.
-@mixin flush-box {
-	width: 100%;
-	padding: 0;
-}
-
 @mixin border-reset {
 	border-color: inherit;
 	border-style: solid;
 	border-width: 0;
 }
```

`src/styles/elements/_fieldset.scss`:

```diff
 	legend {
 		float: left;
-		@include flush-box;
+		width: 100%;
+		padding: 0;
 		margin-bottom: var(--vn-space-4);
 		line-height: inherit;
 		font-size: calc(var(--vn-size-6) * 0.85 + 0.3vw);
 	}
```

`src/styles/components/_form-range.scss`:

```diff
 	.form-range {
-		@include flush-box;
+		width: 100%;
 		height: var(--vn-space-12);
+		padding: 0;
 		appearance: none;
 		background-color: transparent;
 	}
```

Both partials keep `@use '../mixins' as *;`: `_fieldset.scss` still reads `box-reset`, and
`_form-range.scss` still reads `transition`.

## Compiled cascade

From `dist/src/styles/index.css` after `npm run build:src`:

```css
legend{float:left;width:100%;margin-bottom:var(--vn-space-4);line-height:inherit;font-size:calc(var(--vn-size-6) * .85 + .3vw);padding:0}
```

```css
.form-range{width:100%;height:var(--vn-space-12);appearance:none;background-color:#0000;padding:0}
```

Both rules carry `width: 100%` and `padding: 0`. Vite's minifier reorders `padding` to the end of
each declaration list; the property set and values are unchanged from the pre-extraction cascade.

`grep -c flush-box src/styles/_mixins.scss` prints `0`. `grep -rn flush-box src/` finds no
occurrence anywhere in `src/`.

## Gate exits

- `npx oxfmt src/styles/_mixins.scss src/styles/elements/_fieldset.scss src/styles/components/_form-range.scss` — exit 0 (3 files, no rewrites needed).
- `npm run format:check` — exit 0 (215 files, "All matched files use the correct format").
- `npm run lint:check` — exit 0 (no output, no warnings).
- `npm run build:src` — exit 0 (`dist/src/browser/index.js`, `dist/src/styles/index.css` built).
- `npm run test:src:styles` — exit 0 (59 test files, 422 tests, all passed).

## Observation (not a criterion)

- `npm run test:setup` — exit 0 at the command level, 1 failed test file (`tests/setupStyles.test.ts`),
  1 failed / 161 passed. The failure is `styles setup > carries no shared written declaration block
  across style partials`: `scanStyleBlocks` reports `legend` (`elements/_fieldset.scss` line 9) and
  `.form-range` (`components/_form-range.scss` line 15) sharing `width: 100%` and `padding: 0` again.
  This is the expected reading the brief names: the sweep reddens on the shared block until
  B-SWEEP's recalibration lands at integration.

## `git status --porcelain`

```
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/ledger/departures.md
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/FormRangeSection.ts
?? src/styles/components/_form-range.scss
?? tests/app/browser/sections/FormRangeSection.test.ts
?? tests/src/styles/components/form-range.test.ts
```

This lists only the RANGE and RANGE-2 files (`src/styles/_mixins.scss` and
`src/styles/elements/_fieldset.scss`, the two files this unit edited, are not modified relative to
their pre-extraction state and so do not appear — the reversal restored their exact prior content).
Nothing new appears beyond the RANGE/RANGE-2 set.

## Deviation

None. The reverse patch applied exactly as the brief specified, at the positions named.
