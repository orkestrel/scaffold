# Unit FLOATING-CASES report

## Red reading

`npx vitest run --config vite.config.ts --no-cache --project setup tests/setupStyles.test.ts`
failed one case, matching the brief's Evidence exactly:

```
FAIL  |setup| tests/setupStyles.test.ts > floating label case table > binds every floating
selector to the inventory, to its condition, and each declaration to the tokens its row names
for that property
AssertionError: expected { …(2) } to deeply equal { …(2) }

- Expected
+ Received
     "padding": [
       "--vn-space-8",
       "--vn-space-6",
     ],
+     "transition": [
+       "--vn-motion-feedback",
+       "--vn-motion-feedback",
+     ],
    },
    "selector": ".form-floating > label",
```

Full log: `tmp/units/fc-red.log.txt` (exit=1).

## Item 1: before and after

Before, in `tests/setupStyles.ts`, the `.form-floating > label` entry's `reads`:

```ts
reads: Object.freeze({
	padding: Object.freeze(['--vn-space-8', '--vn-space-6']),
	color: Object.freeze(['--bs-body-color-rgb']),
	border: Object.freeze(['--bs-border-width']),
}),
```

After:

```ts
reads: Object.freeze({
	padding: Object.freeze(['--vn-space-8', '--vn-space-6']),
	color: Object.freeze(['--bs-body-color-rgb']),
	border: Object.freeze(['--bs-border-width']),
	transition: Object.freeze(['--vn-motion-feedback', '--vn-motion-feedback']),
}),
```

## Gate table

| Gate | Command | Log | Exit |
| --- | --- | --- | --- |
| Typecheck | `npm run check` | `tmp/units/fc-check.log.txt` | 0 |
| Lint | `npm run lint:check` | `tmp/units/fc-lint.log.txt` | 0 |
| Format check | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check tests/setupStyles.ts` | `tmp/units/fc-oxfmt.log.txt` | 0 |
| Setup tests | `npm run test:setup` | `tmp/units/fc-test.log.txt` | 0 (357 passed) |

## Delta

See `tmp/units/fc-delta.diff` (against the backup `tmp/units/setupStyles.ts.bak`):

```diff
--- tmp/units/setupStyles.ts.bak
+++ tests/setupStyles.ts
@@ -7225,6 +7225,7 @@
 			padding: Object.freeze(['--vn-space-8', '--vn-space-6']),
 			color: Object.freeze(['--bs-body-color-rgb']),
 			border: Object.freeze(['--bs-border-width']),
+			transition: Object.freeze(['--vn-motion-feedback', '--vn-motion-feedback']),
 		}),
 	}),
 	Object.freeze({
```
