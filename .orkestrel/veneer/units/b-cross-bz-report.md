# Unit BACKGROUND-SIZE (`bz`) report

## Diff

```diff
diff --git a/tests/src/styles/components/accordion.test.ts b/tests/src/styles/components/accordion.test.ts
index 8266e35..6d5a76a 100644
--- a/tests/src/styles/components/accordion.test.ts
+++ b/tests/src/styles/components/accordion.test.ts
@@ -107,7 +107,12 @@ describe('accordion classes', () => {
 		expect(readStyle(button, 'flex-shrink', '::after')).toBe('0')
 		expect(readPixels(button, 'height', '::after')).toBe(20)
 		expect(readStyle(button, 'background-repeat', '::after')).toBe('no-repeat')
-		expect(readStyle(button, 'background-size', '::after')).toBe('20px')
+		// A one-value `background-size` serializes as that one value on one build and as
+		// `<length> auto` on another (D45), so the width is read from the leading term and the
+		// second term, where a build writes one, is asserted `auto` rather than compared by string.
+		const [chevronSize, chevronHeight] = readStyle(button, 'background-size', '::after').split(' ')
+		expect(chevronSize).toBe('20px')
+		expect(chevronHeight === undefined || chevronHeight === 'auto').toBe(true)
 		// The chevron's automatic start margin takes the row's free space, so it resolves to a
 		// positive length on a button whose label is shorter than the row.
 		expect(readPixels(button, 'margin-left', '::after')).toBeGreaterThan(0)
diff --git a/tests/src/styles/components/navbar.test.ts b/tests/src/styles/components/navbar.test.ts
index c1183a5..6a4f24a 100644
--- a/tests/src/styles/components/navbar.test.ts
+++ b/tests/src/styles/components/navbar.test.ts
@@ -60,7 +60,12 @@ describe('navbar classes', () => {
 		expect(readPixels(icon, 'height')).toBe(30)
 		expect(readStyle(icon, 'vertical-align')).toBe('middle')
 		expect(readStyle(icon, 'background-repeat')).toBe('no-repeat')
-		expect(readStyle(icon, 'background-size')).toBe('100%')
+		// A one-value `background-size` serializes as that one value on one build and as
+		// `<length> auto` on another (D45), so the width is read from the leading term and the
+		// second term, where a build writes one, is asserted `auto` rather than compared by string.
+		const [iconSize, iconHeight] = readStyle(icon, 'background-size').split(' ')
+		expect(iconSize).toBe('100%')
+		expect(iconHeight === undefined || iconHeight === 'auto').toBe(true)
 		// The layer reading answers for the names no resolved style reaches on its own: a state rule
 		// the partial stopped writing resolves to the resting treatment and reads normal, so the
 		// selectors are held against the rules the shipped cascade carries.
```

Full diff retained at `tmp/units/bz.diff`.

## Red run

With `chevronSize` in `accordion.test.ts` written to `'21px'` and `iconSize` in `navbar.test.ts`
written to `'101%'`, `npx vitest run --config configs/src/vite.styles.config.ts --no-cache
--reporter=dot tests/src/styles/components/accordion.test.ts
tests/src/styles/components/navbar.test.ts` exits with 2 failed test files. The output, retained at
`bz-instruments/bz-red.log.txt`:

```text
FAIL  |[object Object] (chromium)| tests/src/styles/components/accordion.test.ts:87:2 > accordion classes > lays each button out as a full-width row with its chevron at the end, and zeroes the header margin
AssertionError: expected '20px' to be '21px' // Object.is equality

 FAIL  |[object Object] (chromium)| tests/src/styles/components/navbar.test.ts:46:2 > navbar classes > lays the bar out as a wrapping row, writes no rule for the light class, and every shipped selector reaches the components layer
AssertionError: expected '100%' to be '101%' // Object.is equality

 Test Files  2 failed (2)
      Tests  2 failed | 68 passed (70)
```

Both files were restored to the correct expected values (`'20px'` and `'100%'`) after this run, and
the green re-run below confirms the restoration.

## Gates

Each command ran with `PATH` prefixed by the worktree's `npm11` bin directory and
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, in `/home/user/veneer-bz`.

1. `npm run build:src` — exit 0. Built `dist/src/core`, `dist/src/browser`, and `dist/src/styles`
   without error. Log: `bz-instruments/bz-build.log.txt`.
2. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
   tests/src/styles/components/accordion.test.ts tests/src/styles/components/navbar.test.ts` —
   exit 0. `Test Files 2 passed (2)`, `Tests 70 passed (70)`. Log: `bz-instruments/bz-green2.log.txt`
   (the initial pass before the red proof is `bz-instruments/bz-green.log.txt`).
3. `npx oxfmt --check tests/src/styles/components/accordion.test.ts
   tests/src/styles/components/navbar.test.ts` — exit 0. `All matched files use the correct
   format.` Log: `bz-instruments/bz-fmt.log.txt`.
4. `npm run lint:check` — exit 0. `oxlint --config .oxlintrc.json --deny-warnings .` reported no
   output, meaning no violation. Log: `bz-instruments/bz-lint.log.txt`.
5. `npm run check` — exit 0. Every `tsc --noEmit` project (`tsconfig.json`,
   `configs/src/tsconfig.core.json`, `configs/src/tsconfig.browser.json`,
   `configs/src/tsconfig.styles.json`) and `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`
   completed with no diagnostic. Log: `bz-instruments/bz-check.log.txt`.

## Scope

The change touches only the two owned files: `tests/src/styles/components/accordion.test.ts` and
`tests/src/styles/components/navbar.test.ts`. `git status --porcelain`, retained at
`bz-instruments/bz-status.txt`, lists exactly those two paths as modified.

## Review evidence

`tmp/units/bz.diff`, `bz-instruments/bz-status.txt`, `bz-instruments/bz-report.md`, and
`bz-instruments/bz-red.log.txt`.
