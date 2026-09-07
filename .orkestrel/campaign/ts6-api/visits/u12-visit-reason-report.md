# Unit report — U12 fleet-visit-reason (phase A, before the releases)

## Step 1 — preflight

`git status --short` (exit 0):
```
D  tests/distribution.test.ts
```
Matches the expected sole entry.

`grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` (exit 0): `1`.

## Step 2 — package.json

Removed the `vite-plugin-dts` row from `devDependencies`. No other row touched.

## Step 3 — configs/src/vite.core.config.ts

This checkout carries one face, `core`. Replaced the `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call and its `vite-plugin-dts` import with:

```ts
import { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'
...
declarationRollup({
	project: resolveWorkspacePath('configs/src/tsconfig.core.json'),
	types: ['node'],
}),
```

Nothing else in the file changed.

## Step 4 — repair, audit

`node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` (exit 0), full output:
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

Paths `repair` wrote (8, matching the printed rows; `tests/distribution.test.ts` is the eighth — it was absent, so `repair` wrote it back without an explicit "replaced" line):
- `vite.config.ts`
- `configs/helpers.ts`
- `configs/policy.ts`
- `.oxlintrc.json`
- `tests/setupPolicy.ts`
- `tests/policy.test.ts`
- `tests/config.test.ts`
- `tests/distribution.test.ts`

`node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` (exit 0), full output:
```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```
No drift.

## Step 5 — fast gates

`npm run format:check` (exit 0), last lines:
```
Checking formatting...

All matched files use the correct format.
Finished in 3325ms on 79 files using 4 threads.
```

`npm run lint:check` (exit 0): no output beyond the invoked command line.

`npm run check` (exit 0), last lines:
```
> @orkestrel/reason@0.0.9 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## Step 6 — build

`npm run build` (exit 0), last lines:
```
✓ built in 948ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

> @orkestrel/reason@0.0.9 copy
> node -e "..." dist/src/core/index.d.ts dist/src/core/index.d.cts

Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
(The API Extractor version notice is unchanged pre-existing tool chatter, not a failure; exit code 0.)

`ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

`head -5 dist/src/core/index.d.ts`:
```
import type { EmitterErrorHandler } from '@orkestrel/emitter';
import type { EmitterHooks } from '@orkestrel/emitter';
import type { EmitterInterface } from '@orkestrel/emitter';
import type { FieldPath } from '@orkestrel/contract';
import type { Guard } from '@orkestrel/contract';
```

`head -5 dist/src/core/index.d.cts`: identical (the file is a copy).

## Step 7 — distribution proof under npm 11

`PATH=/opt/npm11/bin:$PATH npm run test:distribution` (exit 0), last lines:
```
 RUN  v4.1.11 /home/user/fleet/reason

·········

 Test Files  1 passed (1)
      Tests  9 passed (9)
   Start at  23:51:13
   Duration  15.65s (transform 571ms, setup 573ms, import 1.89s, tests 12.99s, environment 0ms)
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
The `D`/`??` pair on `tests/distribution.test.ts` reflects the Orchestrator's pre-launch `git rm` (staged deletion) followed by `repair` writing a new untracked file at the same path with the parser-shaped content; no manual action was taken on this file.

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

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` (one face, one call).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `audit --offline` reports no drift.
3. PASS — `format:check`, `lint:check`, and `check` all exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exits 0 (9 tests passed).

## Deviations

None. The host's command classifier refused `npx scaffold ...` as expected per the brief's Context; ran the installed head start's own binary, `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`, throughout, as instructed.
