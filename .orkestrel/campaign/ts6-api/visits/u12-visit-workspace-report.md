# Unit report — U12 fleet-visit-workspace (phase A, before the releases)

## Step 1 — preflight

Command: `git status --short`
Exit: 0
Output: `D  tests/distribution.test.ts` (matches expectation exactly).

Command: `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts`
Exit: 0
Output: `1` (matches expectation exactly).

## Step 2 — package.json

Removed the `"vite-plugin-dts": "^5.1.0",` row from `devDependencies`. No other row touched.

## Step 3 — configs/src/vite.core.config.ts

This checkout carries one face, `core`. Replaced the `vite-plugin-dts` `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` shape with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, imported `declarationRollup` from `'../helpers.js'` beside the existing `environmentBoundary`/`outputBoundary` imports, and removed the `import dts from 'vite-plugin-dts'` line. The seed matched the installed head start's `vites.src.core` template in `node_modules/@orkestrel/scaffold/dist/src/core/index.js` (around line 1125) byte for byte. Nothing else in the file changed.

## Step 4 — repair, audit

Command: `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`
Exit: 0
Output (whole):
```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
vite.config.ts replaced (1 line added).
configs/helpers.ts replaced (300 lines added).
configs/policy.ts replaced (677 lines added).
.oxlintrc.json replaced (69 lines added).
tests/setupPolicy.ts replaced (912 lines removed).
tests/policy.test.ts replaced (142 lines removed).
tests/config.test.ts replaced (751 lines added).
8 written, 27 unchanged, 0 removed in ..
```

Paths `repair` wrote (all vendored files or the regenerated proof, none of them this brief's hand-edited files):
- `vite.config.ts`
- `configs/helpers.ts`
- `configs/policy.ts`
- `.oxlintrc.json`
- `tests/setupPolicy.ts`
- `tests/policy.test.ts`
- `tests/config.test.ts`
- `tests/distribution.test.ts` (the absent proof; regenerated as the parser-shaped test, confirmed untracked new content with no `typescript` specifier in its first 20 lines)

Command: `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`
Exit: 0
Output (whole):
```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```
No drift reported anywhere, including in files this brief does not own.

## Step 5 — fast gates

Command: `npm run format:check`
Exit: 0
Last lines: `All matched files use the correct format.` / `Finished in 4691ms on 49 files using 4 threads.`

Command: `npm run lint:check`
Exit: 0
Output: no findings (empty body after the invocation line).

Command: `npm run check`
Exit: 0
Ran `tsc --noEmit --project tsconfig.json`, `check:src`, `check:src:core` (`tsc --noEmit -p configs/src/tsconfig.core.json`) — all silent, exit 0.

## Step 6 — build

Command: `npm run build`
Exit: 0
Last lines:
```
vite v8.2.2 building client environment for production...
✓ 12 modules transformed.
dist/src/core/index.js  25.31 kB │ gzip: 6.56 kB │ map: 46.19 kB
✓ 12 modules transformed.
dist/src/core/index.cjs  26.75 kB │ gzip: 6.76 kB │ map: 46.63 kB
✓ built in 404ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
The API Extractor version note is an informational warning from the rollup step, not a failure; exit code is 0.

Command: `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`
Output:
```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

Command: `head -5` of each `index.d.ts`
`dist/src/core/index.d.ts`:
```
import type { DriverInterface } from '@orkestrel/database';
import type { EmitterErrorHandler } from '@orkestrel/emitter';
import type { EmitterInterface } from '@orkestrel/emitter';
import type { TableInterface } from '@orkestrel/database';
```
(fourth distinct import line shown; file begins with rolled-up type imports as expected).

## Step 7 — distribution test under npm 11

Command: `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
`npm --version` under that `PATH`: `11.19.1`
Exit: 0
Last lines:
```
Test Files  1 passed (1)
     Tests  9 passed (9)
  Start at  00:59:20
  Duration  21.05s
```

## Step 8 — final tree state

Command: `git status --short`
```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.core.config.ts
 M package.json
 M tests/config.test.ts
D  tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
?? tests/distribution.test.ts
```
(The paired `D`/`??` on `tests/distribution.test.ts` is git's rename-less view of the earlier `git rm` plus `repair`'s regeneration of that path as new content; no other untracked file exists.)

Command: `git diff --stat`
```
 .oxlintrc.json                  |   69 +++
 configs/helpers.ts              |  304 ++++++++++-
 configs/policy.ts               |  731 +++++++++++++++++++++++++-
 configs/src/vite.core.config.ts |   17 +-
 package.json                    |    1 -
 tests/config.test.ts            |  783 +++++++++++++++++++++++++++-
 tests/policy.test.ts            |  202 ++------
 tests/setupPolicy.ts            | 1078 +++------------------------------------
 vite.config.ts                  |    7 +-
 9 files changed, 1963 insertions(+), 1229 deletions(-)
```

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (exit 1, empty output); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` (one face, one call).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` reports `0 of 34 planned paths drifted from the plan`.
3. PASS — `format:check`, `lint:check`, and `check` all exited 0.
4. PASS — `build` exited 0 and emitted `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts` for the sole face, so the unchanged exports map resolves both conditions.
5. PASS — `test:distribution` under npm 11 (`11.19.1`) exited 0, 9 of 9 tests passed.

## Deviations

- The host's command classifier refused `npx scaffold ...`, so `repair` and `audit` ran as `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`, the installed head start's own binary file `npx scaffold` resolves to (as the brief's Context section anticipates and pre-authorizes).
- No other deviation. The face list in the brief's Context left the enumerated faces blank (`` `` ``); the checkout carries exactly one face, `core`, confirmed by `ls configs/src/` before editing, so all face-scoped steps ran against `core` alone.
