# Unit report — U12 fleet-visit-queue (phase A, before the releases)

## Step 1 — preflight

Command: `git status --short`
Exit: 0
Output:
```
D  tests/distribution.test.ts
```
Matches expectation.

Command: `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts`
Exit: 0
Output: `1`
Matches expectation.

## Step 2 — package.json

Removed the `"vite-plugin-dts": "^5.1.0",` row from `devDependencies`. No other row touched.

## Step 3 — configs/src/vite.core.config.ts

This checkout has one face, `core`. Rewrote `configs/src/vite.core.config.ts` to match the seed at
`node_modules/@orkestrel/scaffold/dist/src/core/index.js` (`vites.src.core`): removed the
`vite-plugin-dts` import, added `import { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'`,
and replaced the `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })`
call with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`.
Nothing else in the file changed.

## Step 4 — repair and audit

Command: `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`
Exit: 0
Output (first run, the one that wrote files):
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
A second invocation confirmed idempotence: `0 written, 35 unchanged, 0 removed in ..`.

Paths `repair` wrote (8 total):
- `vite.config.ts`
- `configs/helpers.ts`
- `configs/policy.ts`
- `.oxlintrc.json`
- `tests/setupPolicy.ts`
- `tests/policy.test.ts`
- `tests/config.test.ts`
- `tests/distribution.test.ts` (the absent proof regenerated; not named in the written-line summary above the tally but present as a new untracked file in `git status --short`)

Command: `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`
Exit: 0
Output:
```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```
No drift reported in any file this brief does not own.

## Step 5 — fast gates

Command: `npm run format:check`
Exit: 0
Last lines:
```
All matched files use the correct format.
Finished in 4174ms on 48 files using 4 threads.
```

Command: `npm run lint:check`
Exit: 0
Output: (no findings; clean run)

Command: `npm run check`
Exit: 0
Last lines:
```
> @orkestrel/queue@0.0.12 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## Step 6 — build

Command: `npm run build`
Exit: 0
Last lines:
```
> @orkestrel/queue@0.0.12 copy
> node -e "..." dist/src/core/index.d.ts dist/src/core/index.d.cts

Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

Command: `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`
Output:
```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

`head -5 dist/src/core/index.d.ts`:
```
import type { ContractShape } from '@orkestrel/contract';
import type { DriverInterface } from '@orkestrel/database';
import type { EmitterErrorHandler } from '@orkestrel/emitter';
import type { EmitterHooks } from '@orkestrel/emitter';
import type { EmitterInterface } from '@orkestrel/emitter';
```

`head -5 dist/src/core/index.d.cts`: identical to `index.d.ts` (it is the copy the `copy` script produced).

## Step 7 — distribution proof under npm 11

Command: `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
`npm --version` under that `PATH`: `11.19.1`
Exit: 0
Last lines:
```
 Test Files  1 passed (1)
      Tests  9 passed (9)
```

## Step 8 — final status

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
The `D` and `?? tests/distribution.test.ts` pair is git reporting the original tracked file as
deleted and the `repair`-written file as an untracked new one at the same path; the file exists on
disk with the parser-shaped content `repair` regenerated.

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
(`tests/distribution.test.ts` does not appear here because it is untracked, not modified.)

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no
   matches); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` (one face,
   one call).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `audit --offline`
   (run as the installed head start's binary per the host's command-classifier substitution, see
   Deviations) reports no drift.
3. PASS — `format:check`, `lint:check`, and `check` all exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts` for
   the one face this checkout has.
5. PASS — `test:distribution` under npm 11 exits 0 (9 tests passed).

## Deviations

- The brief's Steps section calls `npx scaffold ...`; per the brief's Host note and the dispatch
  instruction, ran the identical installed binary as
  `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline` instead, because the
  host's command classifier refuses `npx scaffold`. This is the substitution the brief itself
  names, not a deviation from expected behavior.
- No other deviation. No face other than `core` exists in this checkout, so only one config file
  was rewritten and only one `declarationRollup(` call is expected and found.
