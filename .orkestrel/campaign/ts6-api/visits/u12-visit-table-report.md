# Unit report — U12 fleet-visit-table (phase A, before the releases)

## Step 1 — preflight

`git status --short` (exit 0):

```
D  tests/distribution.test.ts
```

Matches the expected single staged deletion.

`grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` (exit 0):

```
1
```

Matches the expected head start.

## Step 2 — package.json

Removed the `vite-plugin-dts` row from `devDependencies`. No other row touched.

## Step 3 — configs/src/vite.core.config.ts

This checkout has one face, `core`. Rewrote `configs/src/vite.core.config.ts`: removed the
`vite-plugin-dts` import, replaced the `dts({ tsconfigPath, bundleTypes: { extractorConfig: {
compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call with
`declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types:
['node'] })`, imported from `'../helpers.js'` alongside `environmentBoundary` and
`outputBoundary`. No other line in the file changed.

## Step 4 — repair and audit

`node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` (exit 0):

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

Paths `repair` wrote (8): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`,
`.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and
`tests/distribution.test.ts` (the parser-shaped proof written back over the prior `git rm`
deletion; it does not appear in the printed replace list because it moved from absent to present
rather than from one content to another, but `git status --short` below shows it created).

`node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` (exit 0):

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

No drift reported.

## Step 5 — fast gates

`npm run format:check` (exit 0):

```
All matched files use the correct format.
Finished in 3676ms on 62 files using 4 threads.
```

`npm run lint:check` (exit 0): no output, clean run.

`npm run check` (exit 0):

```
tsc --noEmit --project tsconfig.json && npm run check:src
tsc --noEmit -p configs/src/tsconfig.core.json
```

## Step 6 — build

`npm run build` (exit 0):

```
dist/src/core/index.js  49.31 kB │ gzip: 11.18 kB │ map: 95.78 kB
dist/src/core/index.cjs  51.82 kB │ gzip: 11.38 kB │ map: 96.84 kB
✓ built in 439ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

The API Extractor version notice comes from `declarationRollup`'s own engine, not from the removed
`vite-plugin-dts`.

`ls dist/src/*/index.d.ts dist/src/*/index.d.cts` (exit 0):

```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

`head -5 dist/src/core/index.d.ts`:

```
import type { EmitterErrorHandler } from '@orkestrel/emitter';
import type { EmitterHooks } from '@orkestrel/emitter';
import type { EmitterInterface } from '@orkestrel/emitter';
import type { JSONRecord } from '@orkestrel/contract';
```

`head -5 dist/src/core/index.d.cts`: identical to `index.d.ts` above (the copy step duplicates the
file byte for byte).

## Step 7 — distribution proof

`PATH=/opt/npm11/bin:$PATH npm run test:distribution` (exit 0):

```
 Test Files  1 passed (1)
      Tests  9 passed (9)
   Duration  18.72s (transform 432ms, setup 414ms, import 1.74s, tests 16.31s, environment 0ms)
```

## Step 8 — final tree state

`git status --short`:

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

The `D`/`??` pair on `tests/distribution.test.ts` reflects the staged `git rm` the Orchestrator
ran before this unit launched, plus `repair` writing the new parser-shaped file back unstaged.

`git diff --stat`:

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

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1);
   `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports one call for the checkout's
   sole face, `core`.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `audit --offline`
   reports no drift.
3. PASS — `format:check`, `lint:check`, and `check` each exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exits 0 (9 tests passed).

## Deviations

None. This checkout carries only the `core` face, so steps naming `<face>` applied to `core`
alone. The host's command classifier refused `npx scaffold ...` as the brief anticipated; ran
`node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline` throughout, as
instructed.
