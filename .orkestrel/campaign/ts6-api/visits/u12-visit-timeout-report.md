# Unit report — U12 fleet-visit-timeout (phase A, before the releases)

## Deviations

None. The host refused no `npx scaffold` invocation directly (the brief pre-specified running the
installed head start's own binary), and that substitution was followed as instructed:
`node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`. This checkout has
one face, `core`; the browser and server shapes in the Context did not apply.

## Steps

### 1. Preconditions

```
$ git status --short
 D tests/distribution.test.ts
$ grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts
1
```

Exit 0 for both. Matched the brief's expectation.

### 2. Removed `vite-plugin-dts` from `package.json`

Removed the single `"vite-plugin-dts": "^5.1.0",` row from `devDependencies`. No other row touched.

### 3. Rewrote `configs/src/vite.core.config.ts`

Replaced the `vite-plugin-dts` import and the `dts({ tsconfigPath, bundleTypes: { extractorConfig:
{ compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call with
`declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types:
['node'] })`, imported from `'../helpers.js'` beside `environmentBoundary` and `outputBoundary`.
No other line in the file changed.

### 4. `repair` and `audit`

```
$ node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
vite.config.ts replaced (1 line added).
configs/helpers.ts replaced (300 lines added).
configs/policy.ts replaced (677 lines added).
.oxlintrc.json replaced (69 lines added).
tests/setupPolicy.ts replaced (912 lines removed).
tests/policy.test.ts replaced (142 lines removed).
tests/config.test.ts replaced (751 lines added).
8 written, 27 unchanged, 0 removed in ..
EXIT:0
```

Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`,
`.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`tests/distribution.test.ts` (the absent proof, written back as the parser-shaped proof).

```
$ node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
EXIT:0
```

No drift.

### 5. Fast gates

```
$ npm run format:check
All matched files use the correct format.
Finished in 7061ms on 40 files using 4 threads.
EXIT:0

$ npm run lint:check
(no output)
EXIT:0

$ npm run check
tsc --noEmit --project tsconfig.json && npm run check:src
  check:src:core → tsc --noEmit -p configs/src/tsconfig.core.json
EXIT:0
```

### 6. Build

```
$ npm run build
✓ 8 modules transformed. dist/src/core/index.js  7.57 kB
✓ 8 modules transformed. dist/src/core/index.cjs  8.05 kB
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
EXIT:0

$ ls dist/src/*/index.d.ts dist/src/*/index.d.cts
dist/src/core/index.d.cts
dist/src/core/index.d.ts

$ head -5 dist/src/core/index.d.ts
/**
 * Creates a controllable deadline whose native signal aborts on expiry.
 *
 * @remarks
 * `options.ms` must be an integer from `0` through `2_147_483_647`, inclusive.

$ head -5 dist/src/core/index.d.cts
/**
 * Creates a controllable deadline whose native signal aborts on expiry.
 *
 * @remarks
 * `options.ms` must be an integer from `0` through `2_147_483_647`, inclusive.
```

Both files present for the sole `core` face; content matches.

### 7. Distribution proof under npm 11

```
$ PATH=/opt/npm11/bin:$PATH npm --version
11.19.1
$ PATH=/opt/npm11/bin:$PATH npm run test:distribution
 Test Files  1 passed (1)
      Tests  9 passed (9)
EXIT:0
```

### 8. Final tree state

```
$ git status --short
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

$ git diff --stat
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

`package-lock.json`, `configs/browsers.ts`, `.oxfmtrc.json`, and the `@orkestrel/scaffold` /
`@orkestrel/probe` ranges are untouched, matching scope.

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no
   match); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` (one call for
   the sole `core` face).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier import (the file's
   sole `typescript` reference is a runtime `require.resolve('typescript/bin/tsc')` call, not a
   specifier); `audit --offline` reports no drift.
3. PASS — `format:check`, `lint:check`, and `check` each exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exits 0 (9 tests passed).

## Deviation contract

No deviation triggers occurred: the sole face carried the exact `dts(` shape the Context names,
`repair` and `audit` reported drift in no unowned file, no gate failed in a file outside the owned
set, and the build emitted `index.d.ts` for the face.
