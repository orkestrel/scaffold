# Unit U6 — report for successor brief 8: the rejected-press case

## Diff

```diff
--- a/tests/src/browser/helpers.test.ts
+++ b/tests/src/browser/helpers.test.ts
@@ describe('holdAccessible', () => {
-	it('leaves no marker for a direct protocol rejection and records the marker after a completed hold', async () => {
+	it('records the marker only after the press send resolves', async () => {
 		buildFixture('<button>Press delivery</button>')
 		const button = resolveAccessible('Press delivery')
 		const markers = createRecorder<[marked: boolean]>()
 		button.addEventListener('pointerdown', () => {
 			markers.handler(document.documentElement.hasAttribute(POINTER_HOLD))
 		})
 		await expect(
 			sendProtocol('Input.dispatchMouseEvent', {
 				type: 'mousePressed',
 				x: Number.NaN,
 				y: Number.NaN,
 				button: 'left',
 				buttons: 1,
 				clickCount: 1,
 			}),
 		).rejects.toThrow('Invalid parameters')
-		expect(document.documentElement.hasAttribute(POINTER_HOLD)).toBe(false)
 		await holdAccessible('Press delivery')
 		expect(markers.calls).toEqual([[false]])
 		expect(document.documentElement.hasAttribute(POINTER_HOLD)).toBe(true)
 		expect(button.matches(':active')).toBe(true)
 	})
```

The renamed case deletes the pre-hold `POINTER_HOLD` assertion that could not fail (only
`holdAccessible` writes the marker), keeps the direct protocol rejection as the case's first act,
keeps the `pointerdown` recorder and `expect(markers.calls).toEqual([[false]])` as the
discriminating reading, and keeps the assertions after the completed hold.

## Gates

1. `npx oxfmt --config .oxfmtrc.json --write tests/src/browser/helpers.test.ts` — exit 0.
   `Finished in 11ms on 1 files using 16 threads.`
2. `npm run format:check` — exit 0. `All matched files use the correct format.`
3. `npm run lint:check` — exit 0. No warnings reported.
4. `npm run check` — exit 0. `tsc --noEmit` across `tsconfig.json`, `configs/src/tsconfig.core.json`,
   `configs/src/tsconfig.browser.json`, and `configs/src/tsconfig.server.json` all completed with no
   diagnostics.
5. `npm run test:src:browser -- tests/src/browser/helpers.test.ts -t holdAccessible` — exit 0.
   `Test Files  1 passed (1)`, `Tests  8 passed | 289 skipped (297)`.

## Deviations

None.

## Acceptance

1. The case reads `POINTER_HOLD` only after `holdAccessible('Press delivery')` runs, and its name
   ("records the marker only after the press send resolves") says what it drives.
2. Every gate exited 0.
3. `git status --porcelain` lists six files: `guides/test.md`, `src/browser/constants.ts`,
   `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/setup.ts`,
   `tests/src/browser/helpers.test.ts` — all pre-existing U6 files, nothing else.
