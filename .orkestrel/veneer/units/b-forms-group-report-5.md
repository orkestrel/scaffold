# Unit B-FORMS-GROUP, round 4 — report

Rewrote the journey comment above the input group focus overlap reading in
`tests/app/browser/integration.test.ts` (around lines 1165-1169), replacing the round-3 spliced
run-on with the sentences the brief specifies. Nothing else changed.

## Diff

```diff
diff --git a/tests/app/browser/integration.test.ts b/tests/app/browser/integration.test.ts
--- a/tests/app/browser/integration.test.ts
+++ b/tests/app/browser/integration.test.ts
@@ -1162,11 +1162,11 @@
 			specimen.querySelector('.input-group > .btn'),
 			'The "Input group button" specimen renders no grouped button',
 		)
-		// At rest the button sits one step above the control on the group's stacking levels, and it
-		// pulls its own leading border back over the control's trailing border, so the button and
-		// it pulls back by one border width over the control's trailing border, so the button's
-		// leading border paints over the outer column of that border until the control is lifted
-		// past it.
+		// At rest the button sits one step above the control on the group's stacking levels. It
+		// pulls its leading border back by one border width over the control's trailing border, so
+		// the button's leading border paints over the outer column of that border until the control
+		// is lifted past it. The reading below uses the button's own border width, because the
+		// control's border is the browser's own until the `form-control` key ships its border.
 		expect(readStyle(control, 'z-index')).toBe('auto')
```

## Gate evidence

- `grep -c "so the button and it pulls" tests/app/browser/integration.test.ts` → `0`
- `grep -c "browser's own until the" tests/app/browser/integration.test.ts` → `1`
- `npx oxfmt --check tests/app/browser/integration.test.ts` → exit `0`
- `npm run check` → exit `0`
- `npm run test:app` → exit `0` (23 test files, 55 tests passed)

## Git status --short

```
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/veneer.md
 A src/styles/components/_input-group.scss
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 A tests/src/styles/components/input-group.test.ts
?? app/browser/sections/InputGroupSection.ts
?? tests/app/browser/sections/InputGroupSection.test.ts
```

All entries besides `tests/app/browser/integration.test.ts` predate this round and are untouched
by it.
