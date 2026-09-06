# Unit report — U12 fleet-visit-msg (phase A, before the releases)

## Steps

### 1. `git status --short` and `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts`

Exit 0. `git status --short` printed `D  tests/distribution.test.ts` alone, matching expectation.
`grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` printed `1`, matching expectation.

### 2. Remove `vite-plugin-dts` from `package.json`

Removed the `"vite-plugin-dts": "^5.1.0",` row from `devDependencies`. No other row touched.

### 3. Rewrite `configs/src/vite.core.config.ts`

This checkout has one face, `core`. Replaced the `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call and its `vite-plugin-dts` import with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, imported from `'../helpers.js'` beside `environmentBoundary` and `outputBoundary`. Nothing else in the file changed.

### 4. `repair --offline` then `audit --offline`

Command: `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`
Exit 0. Output:
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

Paths `repair` wrote (report lists 7 named replacements plus the absent `tests/distribution.test.ts` it wrote back, totaling the reported 8 written):
- `vite.config.ts`
- `configs/helpers.ts`
- `configs/policy.ts`
- `.oxlintrc.json`
- `tests/setupPolicy.ts`
- `tests/policy.test.ts`
- `tests/config.test.ts`
- `tests/distribution.test.ts` (written back because it was absent)

Command: `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`
Exit 0. Output:
```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```
No drift reported.

### 5. `format:check`, `lint:check`, `check`

- `npm run format:check` — exit 0. Last line: `Finished in 2643ms on 46 files using 4 threads.`
- `npm run lint:check` — exit 0. No output beyond the command echo.
- `npm run check` — exit 0. Last line: `> tsc --noEmit -p configs/src/tsconfig.core.json` (no diagnostics printed).

### 6. `build`

`npm run build` — exit 0. Last lines:
```
> vite build --config configs/src/vite.core.config.ts && npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts
...
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

`ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

`head -5 dist/src/core/index.d.ts` and `head -5 dist/src/core/index.d.cts` both open identically:
```
/**
 * Reconstitutes a valid CFB (Compound Binary File) from a flat list of
 * {@link MSGBurnerEntry} descriptors — root storage at index 0, its
 * children reachable through `children` indices.
 *
```

### 7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`

`npm --version` under that `PATH` reported `11.19.1`. Exit 0. Last lines:
```
 Test Files  1 passed (1)
      Tests  9 passed (9)
   Start at  23:29:59
   Duration  15.50s (transform 184ms, setup 42ms, import 1.96s, tests 13.08s, environment 0ms)
```

### 8. `git status --short` and `git diff --stat`

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
`tests/distribution.test.ts` shows split as `D` (the staged removal made before this unit launched) plus `??` (the untracked file `repair` wrote back at the same path); it is not double-counted in `--stat` because the staged deletion and the untracked new file are the same content restored by `repair`.

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (exit 1, no matches); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reported `1` for the sole `core` face.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `audit --offline` reported no drift (`0 of 34 planned paths drifted`).
3. PASS — `format:check`, `lint:check`, and `check` all exited 0.
4. PASS — `build` exited 0 and emitted `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exited 0 (9 tests passed).

## Deviations

- The host's command classifier refused `npx scaffold ...`, so `repair` and `audit` ran as `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`, per the brief's stated substitution.
- No other deviations. The single face in this checkout is `core`; no `browser` or `server` config exists to rewrite.
