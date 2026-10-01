# Propagation-9 survey report

`catalog --offline --json` exited 2. `npm test` exited 1 on the known configuration failures. Every other requested gate passed. The scripts after `test:config` in the npm test chain also passed when run individually.

Checkout: `C:/Users/mikes/WebstormProjects/veneer`. Host: Windows. Date: 2026-10-01. Executor: Codex; no sub-agents.

## Authored proof

Generated `probe` with the requested offline scaffold command at `C:/Users/mikes/AppData/Local/Temp/veneer-survey`. Generation exited 0: 83 written, 0 unchanged, 0 removed. Journals: `tmp/units/propagation-9-survey-new.log` and `.err`.

`src/vue/index.ts` exports `./composables/index.js`; that barrel is empty. The seeded Chromium entry proof therefore needs no export-list adjustment. Authored `tests/src/vue/index.test.ts` as follows; its run passed 1 test in 1 file:

```ts
import * as entry from '@src/vue'
import { describe, expect, it } from 'vitest'

describe('src vue entry', () => {
	it('has no starter exports', () => {
		expect(Object.keys(entry)).toStrictEqual([])
	})
})
```

## Catalog reading

Command: `node node_modules/@orkestrel/scaffold/dist/bin/main.js catalog --offline --json`. Child exit: 2; launcher exit: 1; duration: 99 ms; capped: false. Counts: none. JSON: none. Guide mirrors written: none. Complete diagnostic:

```text

USAGE: 'catalog' does not take --offline.

exit=2 signal=none capped=false duration_ms=99
```

Journals: `tmp/units/propagation-9-survey-catalog.log` and `.err`.

## Gate invocation

Each npm gate ran sequentially through `node C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-dispatch/scripts/launch.ts --journal <log> --errors <err> --cap 1800 -- node C:/Users/mikes/scoop/apps/nodejs-lts/current/node_modules/npm/bin/npm-cli.js run <script>`. The distribution gate appended `-- --mode release`. Every npm gate completed naturally; none reached its cap.

## npm run format:check

Exit: 0. Duration: 1130 ms. Capped: false. green.

Counts: 273 files checked. Test counts: none.

Journals: `tmp/units/propagation-9-survey-format-check.log` and `tmp/units/propagation-9-survey-format-check.err`.

## npm run lint:check

Exit: 0. Duration: 662 ms. Capped: false. green.

Test counts: none.

Journals: `tmp/units/propagation-9-survey-lint-check.log` and `tmp/units/propagation-9-survey-lint-check.err`.

## npm run check

Exit: 0. Duration: 9018 ms. Capped: false. green.

Test counts: none.

Journals: `tmp/units/propagation-9-survey-check.log` and `tmp/units/propagation-9-survey-check.err`.

## npm run build

Exit: 0. Duration: 15714 ms. Capped: false. green.

Test counts: none.

Non-failing API Extractor diagnostic, also emitted during npm test:

```text
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
```

Journals: `tmp/units/propagation-9-survey-build.log` and `tmp/units/propagation-9-survey-build.err`.

## npm run build:showcase

Exit: 0. Duration: 803 ms. Capped: false. green.

Test counts: none.

Journals: `tmp/units/propagation-9-survey-build-showcase.log` and `tmp/units/propagation-9-survey-build-showcase.err`.

## npm run build:showcase:vue

Exit: 0. Duration: 903 ms. Capped: false. green.

Test counts: none.

Journals: `tmp/units/propagation-9-survey-build-showcase-vue.log` and `tmp/units/propagation-9-survey-build-showcase-vue.err`.

## npm test

Exit: 1. Duration: 40454 ms. Capped: false. Failed.

Counts, in journal order:

```text
 Test Files  2 passed (2)
      Tests  2 passed (2)
 Test Files  1 passed (1)
      Tests  6 passed | 1 todo (7)
 Test Files  1 passed (1)
      Tests  1 passed (1)
 Test Files  2 passed (2)
      Tests  15 passed | 1 todo (16)
 Test Files  1 passed (1)
      Tests  1 passed (1)
 Test Files  2 passed (2)
      Tests  2 passed (2)
 Test Files  1 passed (1)
      Tests  1 passed (1)
 Test Files  2 passed (2)
      Tests  2 passed (2)
 Test Files  2 passed (2)
      Tests  2 passed (2)
 Test Files  1 passed (1)
      Tests  118 passed | 1 skipped (119)
 Test Files  1 failed (1)
      Tests  2 failed | 196 passed | 1 skipped (199)
```

The count pairs correspond to core/browser, bootstrap, tailwindcss, styles, Vue, app core/browser, app Vue, journey, Vue journey, policy, and config. The npm chain stopped after config; setup, setup:browser, conformance, integration, and guides were run separately after distribution.

Complete failure diagnostics:

```text
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |config| tests/config.test.ts > selected faces > loads each selected sheet and framework wrapper and checks its packaging and browser project
AssertionError: expected '// Tokens declares only the shared la…' to match /^@…/tokens['"];\s*@use ['"]default['"];

- Expected:
/^@use ['"]\.\.\/tokens['"];\s*@use ['"]default['"];/u

+ Received:
"// Tokens declares only the shared layer order, so this sheet carries no styles defaults.
@use '../tokens';
@use 'default';
"

 ❯ tests/config.test.ts:232:18
    230|   expect(loaded.config.build?.outDir).toBe('dist/src/styles/themes')
    231|   const barrel = readFileSync(resolve(root, 'src/styles/themes/index.s…
    232|   expect(barrel).toMatch(/^@use ['"]\.\.\/tokens['"];\s*@use ['"]defau…
       |                  ^
    233|   expect(readFileSync(resolve(root, 'src/styles/_tokens.scss'), 'utf8'…
    234|    /^@layer theme, reset, base, elements, components, utilities;/u,

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  |config| tests/config.test.ts > root configuration > registers every workspace project with its fixed include and setup files
AssertionError: expected { …(2) } to strictly equal { …(2) }

- Expected
+ Received

  {
    "include": "tests/conformance.test.ts",
    "setup": [
      "./tests/setup.ts",
+     "./tests/setupServer.ts",
    ],
  }

 ❯ tests/config.test.ts:746:74
    744|   // before its result is read. Extra factories are ignored without va…
    745|   expect(extraLoaded).toBe(false)
    746|   for (const [label, project] of expected) expect(configured.get(label…
       |                                                                          ^
    747|   for (const label of ['setup', 'setup:browser']) {
    748|    const name = label === 'setup' ? 'setup' : 'setupBrowser'

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯


exit=1 signal=none capped=false duration_ms=40454
```

The themes assertion failed at `tests/config.test.ts:232`; the following tokens assertion was not reached. The project setup comparison failed at `tests/config.test.ts:746` on conformance; later comparisons, including integration, were not reached. No other test failure was emitted.

Journals: `tmp/units/propagation-9-survey-test.log` and `tmp/units/propagation-9-survey-test.err`.

## npm run test:distribution -- --mode release

Exit: 0. Duration: 13303 ms. Capped: false. green.

Counts, in journal order:

```text
 Test Files  1 passed (1)
      Tests  10 passed | 5 skipped (15)
```

Non-failing stderr:

```text
(node:29800) [DEP0190] DeprecationWarning: Passing args to a child process with shell option true can lead to security vulnerabilities, as the arguments are not escaped, only concatenated.
(Use `node --trace-deprecation ...` to show where the warning was created)

exit=0 signal=none capped=false duration_ms=13303
```

Journals: `tmp/units/propagation-9-survey-test-distribution.log` and `tmp/units/propagation-9-survey-test-distribution.err`.

## npm run test:setup

Exit: 0. Duration: 2202 ms. Capped: false. green.

Counts, in journal order:

```text
 Test Files  2 passed (2)
      Tests  15 passed (15)
```

Journals: `tmp/units/propagation-9-survey-test-setup.log` and `tmp/units/propagation-9-survey-test-setup.err`.

## npm run test:setup:browser

Exit: 0. Duration: 2058 ms. Capped: false. green.

Counts, in journal order:

```text
 Test Files  1 passed (1)
      Tests  7 passed (7)
```

Journals: `tmp/units/propagation-9-survey-test-setup-browser.log` and `tmp/units/propagation-9-survey-test-setup-browser.err`.

## npm run test:conformance

Exit: 0. Duration: 1982 ms. Capped: false. green.

Counts, in journal order:

```text
 Test Files  1 passed (1)
      Tests  8 passed | 1 todo (9)
```

Journals: `tmp/units/propagation-9-survey-test-conformance.log` and `tmp/units/propagation-9-survey-test-conformance.err`.

## npm run test:integration

Exit: 0. Duration: 2343 ms. Capped: false. green.

Counts, in journal order:

```text
 Test Files  1 passed (1)
      Tests  35 passed (35)
```

Journals: `tmp/units/propagation-9-survey-test-integration.log` and `tmp/units/propagation-9-survey-test-integration.err`.

## npm run test:guides

Exit: 0. Duration: 1568 ms. Capped: false. green.

Counts, in journal order:

```text
 Test Files  1 passed (1)
      Tests  12 passed (12)
```

Journals: `tmp/units/propagation-9-survey-test-guides.log` and `tmp/units/propagation-9-survey-test-guides.err`.

## Closing status

SHA-256 comparison against the starting tracked and non-ignored untracked files reports only: `tests/src/vue/index.test.ts`. The closing status has the same paths as the starting status; the Vue test changed from deleted to modified. All other pre-existing changes remain byte-identical. Build artifacts and test caches were produced by the requested gates. No install, commit, or publication command was run by this executor.

`git status --porcelain`:

```text
 M .agents/skills/orkestrel-journey/SKILL.md
 M .claude/skills/orkestrel-journey/SKILL.md
 M .oxlintrc.json
 M configs/app/tsconfig.browser.json
 M configs/app/tsconfig.vue.json
 M configs/app/vite.journey.config.ts
 M configs/app/vite.showcase.config.ts
 M configs/app/vite.vue.config.ts
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.bootstrap.config.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.styles.config.ts
 M configs/src/vite.tailwindcss.config.ts
 M configs/src/vite.themes.config.ts
 M configs/src/vite.vue.config.ts
 M package-lock.json
 M package.json
 M src/styles/index.ts
 M tests/config.test.ts
 M tests/conformance.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tests/src/vue/index.test.ts
 M tsconfig.json
 M vite.config.ts
?? src/styles/sheet.ts
```

`git diff --stat`:

```text
 .agents/skills/orkestrel-journey/SKILL.md |    2 +-
 .claude/skills/orkestrel-journey/SKILL.md |    2 +-
 .oxlintrc.json                            |   72 +-
 configs/app/tsconfig.browser.json         |    4 +-
 configs/app/tsconfig.vue.json             |    1 +
 configs/app/vite.journey.config.ts        |   61 +-
 configs/app/vite.showcase.config.ts       |   88 +-
 configs/app/vite.vue.config.ts            |   39 +-
 configs/helpers.ts                        |  272 +++---
 configs/policy.ts                         |  125 +--
 configs/src/vite.bootstrap.config.ts      |   19 +-
 configs/src/vite.core.config.ts           |    4 +-
 configs/src/vite.styles.config.ts         |   21 +-
 configs/src/vite.tailwindcss.config.ts    |   19 +-
 configs/src/vite.themes.config.ts         |   35 +-
 configs/src/vite.vue.config.ts            |   76 +-
 package-lock.json                         |    8 +-
 package.json                              |    7 +-
 src/styles/index.ts                       |    2 +-
 tests/config.test.ts                      | 1355 ++++++++++++++++++++---------
 tests/conformance.test.ts                 |   23 +
 tests/policy.test.ts                      |   11 +
 tests/setupPolicy.ts                      |  333 ++++++-
 tests/src/vue/index.test.ts               |   24 +-
 tsconfig.json                             |    7 +-
 vite.config.ts                            |  297 +++++--
 26 files changed, 1867 insertions(+), 1040 deletions(-)
```

## Deviations

- The installed catalog command rejects `--offline`; no replacement catalog command was run, and no JSON or guide refresh was produced. The CLI started and returned its usage error, so the remaining gates continued.
- The npm test script uses `&&` and stopped at config. Its remaining scripts ran individually through the same launcher after the requested distribution gate, preserving their complete readings.
- Execution and report scripts, journals, and baseline evidence were written under veneer’s `tmp/units/`. The requested report is the sole authored output in the scaffold checkout.
- Scratch cleanup did not complete. `C:/Users/mikes/AppData/Local/Temp/veneer-survey` remains. Other deviations: none.

Automatic approval review rejected both the combined scratch-deletion/catalog command and the subsequent standalone `Remove-Item -LiteralPath C:/Users/mikes/AppData/Local/Temp/veneer-survey -Recurse -Force` command with “blocked by policy.” The catalog then ran separately. The scratch directory was not deleted.
