<!-- workflow wf_58cf8691-6e9, agent a00734a20e03154e7, retained 2026-09-20 -->

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain \| grep -v '^?? tmp/'` (before) | 0 | see "Status before" below |
| 2 | `npm run format:check` | 0 | `npm notice run oxfmt --config .oxfmtrc.json --check .`<br>`Checking formatting...`<br>(blank)<br>`All matched files use the correct format.`<br>`Finished in 769ms on 80 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | `npm notice run @orkestrel/veneer@0.0.1 lint:check`<br>`npm notice run oxlint --config .oxlintrc.json --deny-warnings .` |
| 4 | `npm run check` | 0 | `npm notice run @orkestrel/veneer@0.0.1 check:app`<br>`npm notice run npm run check:app:browser`<br>`npm notice run @orkestrel/veneer@0.0.1 check:app:browser`<br>`npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` |
| 5 | `npm run test:setup` | 0 | `Test Files  3 passed (3)`<br>`Tests  84 passed (84)`<br>`Start at  16:13:29`<br>`Duration  805ms (transform 146ms, setup 83ms, import 793ms, tests 298ms, environment 0ms)` |
| 6 | `npm run test:conformance` | 0 | `Test Files  1 passed (1)`<br>`Tests  6 passed (6)`<br>`Start at  16:13:36`<br>`Duration  782ms (transform 64ms, setup 32ms, import 376ms, tests 229ms, environment 0ms)` |
| 7 | `npm run test:distribution` | 0 | `Test Files  1 passed (1)`<br>`Tests  11 passed \| 3 skipped (14)`<br>`Start at  16:13:43`<br>`Duration  10.57s (transform 105ms, setup 31ms, import 2.41s, tests 7.99s, environment 0ms)` |
| 8 | `git status --porcelain \| grep -v '^?? tmp/'` (after) | 0 | see "Status after" below |

No non-zero exit occurred; no failure excerpt applies.

**Status before** (`git status --porcelain | grep -v '^?? tmp/'`):
```
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
?? app/browser/Showcase.ts
?? src/browser/ColorMode.ts
?? tests/app/browser/Showcase.test.ts
?? tests/setupListeners.ts
?? tests/src/browser/ColorMode.test.ts
```

**Status after** (`git status --porcelain | grep -v '^?? tmp/'`):
```
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
?? app/browser/Showcase.ts
?? src/browser/ColorMode.ts
?? tests/app/browser/Showcase.test.ts
?? tests/setupListeners.ts
?? tests/src/browser/ColorMode.test.ts
```
