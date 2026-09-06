# Unit report — U12 fleet-visit-contract (phase A, before the releases)

## Step 1 — preflight

- `git status --short` → exit 0, no output (clean).
- `node -e "console.log(require('@orkestrel/scaffold/package.json').version)"` → exit 0, printed `0.0.63`, matching the pinned `^0.0.63` range. Confirmed the head start carries the `declarationRollup` helper by reading `node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` (function present at line 634) before editing.

## Step 2 — package.json

Removed the `vite-plugin-dts` row (`"vite-plugin-dts": "^5.1.0",`) from `devDependencies`. No other row touched.

## Step 3 — configs/src/vite.core.config.ts

This checkout's only face is `core`. Rewrote the file's import and plugin call to the seed shape from scaffold's `src/core/templates.ts` (`vites.src.core`, read from the compiled `node_modules/@orkestrel/scaffold/dist/src/core/index.js` at line 1123 since the template source lives in scaffold's own repo, not published as a readable `.ts` in this install):

- `import dts from 'vite-plugin-dts'` removed; `declarationRollup` added to the existing `../helpers.js` import alongside `environmentBoundary` and `outputBoundary`.
- `dts({ tsconfigPath: ..., bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` replaced with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, keeping the same `types: ['node']` the prior seed passed.
- Nothing else in the file changed.

## Step 4 — proof regeneration

- `rm tests/distribution.test.ts` → exit 0.
- `npx scaffold repair --offline` → exit 0:

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

Paths `repair` wrote (beyond regenerating `tests/distribution.test.ts`, which the deletion made absent): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`. No guide mirror files were listed in `repair`'s output.

- `npx scaffold audit --offline` → exit 0:

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

No drift reported anywhere, including the owned and the repair-refreshed files.

## Step 5 — fast gates

- `npm run format:check` → exit 0. Last lines: `All matched files use the correct format.` / `Finished in 4047ms on 70 files using 4 threads.`
- `npm run lint:check` → exit 0, no output.
- `npm run check` → exit 0. Ran `tsc --noEmit --project tsconfig.json`, then `check:src` → `check:src:core` → `tsc --noEmit -p configs/src/tsconfig.core.json`, all silent/zero-exit.

## Step 6 — build

`npm run build` → exit 0. Ran `clean`, then `build:src:core`:

```
vite v8.2.2 building client environment for production...
transforming...
✓ 22 modules transformed.
dist/src/core/index.js  393.31 kB │ gzip: 89.73 kB │ map: 756.22 kB
transforming...
✓ 22 modules transformed.
dist/src/core/index.cjs  398.79 kB │ gzip: 90.44 kB │ map: 756.23 kB
✓ built in 1.19s
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

The API Extractor version notice is informational; the build still exited 0 and produced both declaration files.

- `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` → exit 0: `dist/src/core/index.d.cts`, `dist/src/core/index.d.ts`.
- `head -5 dist/src/core/index.d.ts`:

```
/**
 * Collects one more member into a vocabulary that grows as a walk proceeds.
 *
 * @param members - The vocabulary to extend
 * @param value - The value to admit
```

## Step 7 — distribution proof

`PATH=/opt/npm11/bin:$PATH npm run test:distribution` (npm 11.19.1) → exit 0:

```
 RUN  v4.1.11 /home/user/fleet/contract
·········
 Test Files  1 passed (1)
      Tests  9 passed (9)
   Start at  22:32:40
   Duration  14.75s (transform 919ms, setup 952ms, import 1.84s, tests 11.77s, environment 0ms)
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
 M tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
```

`git diff --stat`:

```
 .oxlintrc.json                  |   69 +++
 configs/helpers.ts              |  304 ++++++++++-
 configs/policy.ts               |  731 +++++++++++++++++++++++++-
 configs/src/vite.core.config.ts |   17 +-
 package.json                    |    1 -
 tests/config.test.ts            |  783 +++++++++++++++++++++++++++-
 tests/distribution.test.ts      |  356 ++++++++-----
 tests/policy.test.ts            |  202 ++------
 tests/setupPolicy.ts            | 1078 +++------------------------------------
 vite.config.ts                  |    7 +-
 10 files changed, 2193 insertions(+), 1355 deletions(-)
```

`package-lock.json`, `configs/browsers.ts`, `tests/**` beyond `distribution.test.ts`, `src/**`, and the `@orkestrel/scaffold`/`@orkestrel/probe` ranges are untouched. The vendored files listed above changed only through `npx scaffold repair --offline`, never through a direct edit.

## Acceptance criteria

1. **PASS** — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (exit 1, no match); `grep -c "declarationRollup(" configs/src/vite.core.config.ts` reported `1` (one call for the one face, `core`).
2. **PASS** — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `npx scaffold audit --offline` reported no drift.
3. **PASS** — `format:check`, `lint:check`, and `check` all exited 0.
4. **PASS** — `build` exited 0 and emitted `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts` for the `core` face.
5. **PASS** — `test:distribution` under npm 11 exited 0 (9 tests passed).

## Deviations

None. The face named in the brief (`core`) matched the checkout's actual sole face under `configs/src/`. The `dts(` shape found in `configs/src/vite.core.config.ts` matched the Context's description exactly before the rewrite. `repair` and `audit` reported no drift in any file. No gate failed. The build emitted `index.d.ts` for the face.
