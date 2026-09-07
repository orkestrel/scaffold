# Unit report — U12 fleet-visit-tool (phase A, before the releases)

## Steps

### 1. Preflight

`git status --short` — exit 0:

```
D  tests/distribution.test.ts
```

Matches expectation.

`grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` — exit 0, output `1`. Matches expectation.

### 2. `package.json`

Removed the `"vite-plugin-dts": "^5.1.0",` row from `devDependencies`. No other row touched.

### 3. `configs/src/vite.core.config.ts`

This checkout has one face, `core` (`configs/src/vite.core.config.ts`; no `browser` or `server` face exists in this checkout). Replaced the `import dts from 'vite-plugin-dts'` import and the `dts({ tsconfigPath, bundleTypes: { extractorConfig: ... } })` call with:

```ts
import { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'
...
declarationRollup({
	project: resolveWorkspacePath('configs/src/tsconfig.core.json'),
	types: ['node'],
}),
```

matching the `vites.src.core` seed in the installed head start's `dist/src/core/index.js`. Nothing else in the file changed.

### 4. `repair` and `audit`

`node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0:

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

Paths `repair` wrote (from `git status --short` after the run): `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `vite.config.ts`, and `tests/distribution.test.ts` (the regenerated proof, previously deleted — 8 paths total).

`node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0:

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

No drift.

### 5. Fast gates

`npm run format:check` — exit 0, last lines:

```
All matched files use the correct format.
Finished in 6261ms on 41 files using 4 threads.
```

`npm run lint:check` — exit 0, no output.

`npm run check` — exit 0, last lines:

```
> @orkestrel/tool@0.0.13 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

### 6. Build

`npm run build` — exit 0, last lines:

```
> @orkestrel/tool@0.0.13 copy
> node -e "..." dist/src/core/index.d.ts dist/src/core/index.d.cts

Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

`ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:

```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

`head -5` of each:

```
== dist/src/core/index.d.ts ==
import type { Failure } from '@orkestrel/contract';
import type { Success } from '@orkestrel/contract';

/**
 * Creates an executable tool.
== dist/src/core/index.d.cts ==
import type { Failure } from '@orkestrel/contract';
import type { Success } from '@orkestrel/contract';

/**
 * Creates an executable tool.
```

### 7. Distribution proof

`PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0, last lines:

```
 Test Files  1 passed (1)
      Tests  9 passed (9)
   Duration  24.07s (transform 149ms, setup 29ms, import 2.24s, tests 21.58s, environment 0ms)
```

### 8. Final status

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

`package-lock.json` was not touched. `@orkestrel/scaffold` and `@orkestrel/probe` ranges were not touched.

## Acceptance criteria

1. **PASS.** `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `configs/src/vite.core.config.ts:1` — one call for the one face this checkout has.
2. **PASS.** `head -20 tests/distribution.test.ts` names no `typescript` specifier. `audit --offline` reports `0 of 34 planned paths drifted`.
3. **PASS.** `format:check`, `lint:check`, and `check` each exit 0.
4. **PASS.** `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts` for the `core` face (the only face in this checkout).
5. **PASS.** `test:distribution` under npm 11 exits 0 (9 tests passed).

## Deviations

None. The host's command classifier refused `npx scaffold ...` for `repair` and `audit`; per the brief's Context, ran the identical installed binary directly as `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline` instead, which is the same file `npx scaffold` resolves to.

This checkout carries only the `core` face (no `browser` or `server` face), so only `configs/src/vite.core.config.ts` needed the `dts` to `declarationRollup` rewrite.
