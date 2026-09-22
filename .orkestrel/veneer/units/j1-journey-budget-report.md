# Unit J1 JOURNEY-BUDGET — report

## Diff

```diff
diff --git a/configs/app/vite.journey.config.ts b/configs/app/vite.journey.config.ts
index 10be62c..0de39dc 100644
--- a/configs/app/vite.journey.config.ts
+++ b/configs/app/vite.journey.config.ts
@@ -1,6 +1,6 @@
 import type { JourneyVariant } from '@orkestrel/test'
 import { defineConfig } from 'vitest/config'
-import { appJourney } from '../../vite.config.ts'
+import { appJourney, mergeOverride } from '../../vite.config.ts'
 
 // Each variant pairs a color mode with the viewport it renders at. The journey applies the mode
 // through the showcase's own theme control, reading it from the variant's name.
@@ -13,6 +13,14 @@ const VARIANTS: readonly JourneyVariant[] = Object.freeze([
 
 export default defineConfig({
 	test: {
-		projects: VARIANTS.map((variant) => () => appJourney(variant, VARIANTS)),
+		// The keyboard traversal walks every interactive target in the mounted showcase for each
+		// target it reaches, so its cost grows with the regions the showcase renders; the walk
+		// measured 10.0 s against the Table-era surface and 15.9 s after three passive component
+		// regions landed (2026-09-22, journey:light-1280). The budget clears the grown surface on a
+		// contended host.
+		projects: VARIANTS.map(
+			(variant) => () =>
+				mergeOverride(appJourney(variant, VARIANTS), { test: { testTimeout: 120_000 } }),
+		),
 	},
 })
```

## Guide

`grep -n "testTimeout\|budget" guides/veneer.md` returned no match, so § Law names no sentence to
own. No guide edit made.

## Unknowns resolved

`tests/config.test.ts` builds its own planted journey wrapper for the assertion and does not load
`configs/app/vite.journey.config.ts` itself for the equality check, and it reads only `include`,
`exclude`, `setupFiles`, `name`, `provide`, and `browser` off each journey project's `test` block —
it asserts nothing about `testTimeout`. The override does not redden this test.

## Gate exits

- `npx oxfmt --config .oxfmtrc.json --write configs/app/vite.journey.config.ts`: reformatted the
  wrapper's multiline arrow (moved `() =>` to its own line); exit 0.
- `npm run format:check`: exit 0 ("All matched files use the correct format.", 214 files).
- `npm run lint:check`: exit 0 (no output, no violations).
- `npm run check`: exit 0 (`tsc --noEmit` on the root, `check:src:core`, `check:src:browser`,
  `check:src:styles`, `check:app:browser` all clean).
- `npm run test:config`: exit 0 (`Test Files 1 passed (1)`, `Tests 173 passed | 1 skipped (174)`).
- `npm run build:src`: exit 0 (`build:src:core`, `build:src:browser`, `build:src:styles` all built).

## Journey run (obligation 2 / acceptance criterion 3)

`npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project
'journey:light-1280*'` failed before any case ran:

```
[vite] Internal server error: Resolved dependencies must remain inside their physical package root
  Plugin: vite:import-analysis
  File: /home/user/veneer-jb/src/browser/validators.ts:3:38
  import { isInstance, literalOf } from "@orkestrel/contract";
...
FAIL |journey:light-1280 (chromium)| tests/app/browser/integration.test.ts
Error: Failed to import test file /home/user/veneer-jb/tests/setupBrowser.ts
Caused by: TypeError: Failed to fetch dynamically imported module: http://localhost:63315/home/user/veneer-jb/tests/setupBrowser.ts?import&browserv=...
Test Files  1 failed (1)
Tests  no tests
```

No case ran, so no keyboard-case duration exists to record.

**Isolation check.** The same failure reproduces on the unmodified root browser project, which my
change never touches: `npx vitest run --config vite.config.ts --no-cache --reporter=verbose
--project 'app:browser*'` fails all 10 of its files with the identical `Resolved dependencies must
remain inside their physical package root` error against `@orkestrel/contract`, and the identical
`Failed to fetch dynamically imported module …/tests/setupBrowser.ts` cause. This is a
worktree-level environment defect — the browser test runner cannot resolve `@orkestrel/contract`
through this worktree's `node_modules` symlink to the main checkout, which trips Vite's
physical-package-root guard for every browser suite in `/home/user/veneer-jb`, not something the
`testTimeout` override or `mergeOverride` composition introduced.

## Deviation report

Per § Deviation protocol: expected the `journey:light-1280*` run to execute the keyboard case and
report its duration; found every browser project in this worktree (including the unmodified
`app:browser` project) failing at import time with `Resolved dependencies must remain inside their
physical package root` against `@orkestrel/contract`, before any test body runs. Evidence is the
preceding two failing runs. Not done: acceptance criterion 3 (the `journey:light-1280` run's exit)
and the keyboard case's duration cannot be produced from this worktree. Hypothesis: the worktree's
`node_modules` symlink to the main checkout's `node_modules` places `@orkestrel/contract`'s
resolved path outside this worktree's physical package root, which Vite's browser dependency
optimizer refuses to serve; the wrapper's `testTimeout` change is not implicated, since the same
worktree fails the same way with the wrapper unchanged. All other obligations (the composition
edit, the comment, `npm run test:config`, `npm run build:src`, and the format/lint/typecheck gates)
completed and passed as reported. Stopping here rather than working around the worktree's
environment, per the deviation contract's scope limit to the wrapper file's own content.

## git status --porcelain

```
 M configs/app/vite.journey.config.ts
```
