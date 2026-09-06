# Unit report — U12 fleet-visit-abort (phase A, before the releases)

## Step 1 — preflight

- `git status --short` — exit 0, empty output (clean).
- `node -e "console.log(require('@orkestrel/scaffold/package.json').version)"` — exit 0, printed `0.0.63` (the head-start version, `package.json` still pins `^0.0.63`).

## Step 2 — package.json

Removed the `vite-plugin-dts` row (`"vite-plugin-dts": "^5.1.0",`) from `devDependencies`. No other row touched.

## Step 3 — configs/src/vite.core.config.ts

Rewrote the only face this checkout owns, `core`. Replaced:

```ts
import dts from 'vite-plugin-dts'
...
dts({
	tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.core.json'),
	bundleTypes: {
		extractorConfig: {
			compiler: {
				overrideTsconfig: {
					compilerOptions: { types: ['node'] },
				},
			},
		},
	},
}),
```

with:

```ts
import { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'
...
declarationRollup({
	project: resolveWorkspacePath('configs/src/tsconfig.core.json'),
	types: ['node'],
}),
```

matching the `vites.src.core` seed in scaffold's `templates.ts` byte for byte (checked against `node_modules/@orkestrel/scaffold/dist/src/core/index.js`, the compiled seed). Nothing else in the file changed.

## Step 4 — repair and audit

`rm tests/distribution.test.ts` — exit 0.

`npx scaffold repair --offline` — exit 0:

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

Paths `repair` wrote (8 total): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts` (regenerated after the deletion; not itemized with a diff line in the summary above because it was newly written rather than a byte-diffed replace, but it appears in `git status --short` as `M tests/distribution.test.ts`).

`npx scaffold audit --offline` — exit 0:

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

No drift reported.

## Step 5 — fast gates

- `npm run format:check` — exit 0. Last lines: `All matched files use the correct format.` / `Finished in 2997ms on 39 files using 4 threads.`
- `npm run lint:check` — exit 0, no output beyond the command echo.
- `npm run check` — exit 0 (`tsc --noEmit --project tsconfig.json && npm run check:src` → `check:src:core` → `tsc --noEmit -p configs/src/tsconfig.core.json`), no diagnostics.

## Step 6 — build

`npm run build` — exit 0. `clean` then `build:src:core`:

```
✓ 7 modules transformed.
dist/src/core/index.js  8.13 kB │ gzip: 2.64 kB │ map: 11.43 kB
✓ 7 modules transformed.
dist/src/core/index.cjs  8.60 kB │ gzip: 2.72 kB │ map: 11.59 kB
✓ built in 143ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

The API Extractor version notice comes from `declarationRollup`'s own internal use of `@microsoft/api-extractor` (confirmed in `configs/helpers.ts`), not from `vite-plugin-dts`, which is fully removed.

`ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:

```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

`head -5 dist/src/core/index.d.ts`:

```
/**
 * Represents a cancellation handle — a thin, traceable wrapper over a native
 * `AbortController` whose exposed `signal` can be linked to a parent signal.
 *
 * @remarks
```

## Step 7 — distribution proof

`PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0:

```
Test Files  1 passed (1)
     Tests  9 passed (9)
  Duration  14.98s
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
 tests/distribution.test.ts      |  281 ++++++----
 tests/policy.test.ts            |  202 ++------
 tests/setupPolicy.ts            | 1078 +++------------------------------------
 vite.config.ts                  |    7 +-
 10 files changed, 2158 insertions(+), 1315 deletions(-)
```

`package-lock.json`, `configs/policy.ts` guard files (owned by `repair`, not by this unit's own edits), `@orkestrel/scaffold` and `@orkestrel/probe` ranges are untouched by this unit's own edits; the `repair` run refreshed several vendored files as expected and reported above.

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (grep exit 1). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reported `1` (one call for the one face this checkout owns, `core`).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier. `npx scaffold audit --offline` reported `0 of 34 planned paths drifted`.
3. PASS — `format:check`, `lint:check`, and `check` each exited 0.
4. PASS — `build` exited 0 and emitted `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exited 0 (9 tests passed).

## Deviations

None. The face set for this checkout is `core` only (the brief's face list was empty after `core`), so only `configs/src/vite.core.config.ts` was rewritten. `repair` refreshed vendored files and guide-mirrored test files (`configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `vite.config.ts`, `tests/distribution.test.ts`) as the brief anticipated; `audit --offline` confirms no drift remains in any of them.
