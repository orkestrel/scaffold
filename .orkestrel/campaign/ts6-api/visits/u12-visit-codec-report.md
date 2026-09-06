# Unit report — U12 fleet-visit-codec (phase A, before the releases)

## Step 1 — preflight

- `git status --short`: exit 0, clean (no output).
- `node -e "console.log(require('@orkestrel/scaffold/package.json').version)"`: exit 0, printed `0.0.63`.
- Confirmed the installed head start carries `declarationRollup`: `grep -rn "declarationRollup" node_modules/@orkestrel/scaffold/dist/` matched `import { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'` and the `declarationRollup({` call sites inside `dist/src/core/index.js`.

## Step 2 — package.json

Removed the `vite-plugin-dts` row from `devDependencies` (was `"vite-plugin-dts": "^5.1.0",` between `vite` and `vitest`). No other row touched.

## Step 3 — configs/src/vite.core.config.ts

Rewrote the `core` face (the checkout's only face) to match `vites.src.core` in scaffold's `src/core/templates.ts` (approximately lines 547-578): replaced `import dts from 'vite-plugin-dts'` with `declarationRollup` added to the existing `../helpers.js` import, and replaced the `dts({ tsconfigPath: …, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`. The `types: ['node']` value is unchanged from the original `dts` call. Nothing else in the file changed.

## Step 4 — repair and audit

`rm tests/distribution.test.ts`: exit 0.

`npx scaffold repair --offline`: exit 0. Full output:

```
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
vite.config.ts replaced (1 line added).
configs/helpers.ts replaced (300 lines added).
configs/policy.ts replaced (677 lines added).
.oxlintrc.json replaced (69 lines added).
tests/setupPolicy.ts replaced (912 lines removed).
tests/policy.test.ts replaced (142 lines removed).
tests/config.test.ts replaced (751 lines added).
8 written, 27 unchanged, 0 removed in .
```

Paths `repair` wrote (8, per the log): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts` (the deleted file, regenerated because it was absent). All are vendored files or the distribution proof the brief names as `repair`-regenerated; none is edited by hand in this unit.

`npx scaffold audit --offline`: exit 0. Full output:

```
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

No drift reported anywhere, in an owned file or otherwise. The `setup` line is a pre-existing informational finding about `tests/setup.ts` coverage, unrelated to this unit's scope; it is not drift and names no file this brief owns or touches.

## Step 5 — fast gates

- `npm run format:check`: exit 0. Last lines: `All matched files use the correct format.` / `Finished in 4001ms on 32 files using 4 threads.`
- `npm run lint:check`: exit 0. No output beyond the script invocation line (no warnings, no errors).
- `npm run check`: exit 0. Ran `tsc --noEmit --project tsconfig.json`, then `check:src` → `check:src:core` → `tsc --noEmit -p configs/src/tsconfig.core.json`, all silent (clean).

## Step 6 — build

`npm run build`: exit 0. Ran `clean` then `build:src` → `build:src:core`: `vite build --config configs/src/vite.core.config.ts` then the `copy` script duplicating the `.d.ts` to `.d.cts`. Last lines:

```
dist/src/core/index.cjs  29.17 kB │ gzip: 7.10 kB │ map: 48.44 kB

✓ built in 227ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

> @orkestrel/codec@0.0.2 copy
> node -e "..." dist/src/core/index.d.ts dist/src/core/index.d.cts

Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

`ls dist/src/*/index.d.ts dist/src/*/index.d.cts`: printed `dist/src/core/index.d.cts` and `dist/src/core/index.d.ts` — both present, one face.

`head -5 dist/src/core/index.d.ts` and `head -5 dist/src/core/index.d.cts`: identical opening lines, both begin:

```
/**
 * Decodes canonical standard Base64 text into its bytes.
 *
 * @remarks
 * Accepts only the RFC 4648 §4 form {@link encodeBase64} produces: the standard alphabet, a length
```

## Step 7 — distribution proof under npm 11

`PATH=/opt/npm11/bin:$PATH npm --version`: `11.19.1`.

`PATH=/opt/npm11/bin:$PATH npm run test:distribution`: exit 0. Last lines:

```
 RUN  v4.1.11 /home/user/fleet/codec

·········

 Test Files  1 passed (1)
      Tests  9 passed (9)
   Start at  22:31:39
   Duration  14.89s (transform 365ms, setup 310ms, import 1.47s, tests 12.93s, environment 0ms)
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

`package-lock.json`, `configs/browsers.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, and every other off-limits path are untouched.

## Acceptance criteria

1. PASS. `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for the checkout's one face (`vite.core.config.ts`).
2. PASS. `head -20 tests/distribution.test.ts` names no `typescript` specifier. `npx scaffold audit --offline` reports `0 of 34 planned paths drifted`.
3. PASS. `format:check`, `lint:check`, and `check` each exit 0.
4. PASS. `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`, the checkout's only face.
5. PASS. `test:distribution` under npm 11 (`11.19.1`) exits 0 with 9 of 9 tests passed.

## Deviations

None. The face table named in the brief's Context (`core` only, per this checkout's `configs/src/vite.<face>.config.ts` glob) matched what `configs/src` actually contains, the rewritten config carries the `declarationRollup(` shape the Context states, `repair` and `audit` reported no drift in any owned or off-limits file, and every gate in Steps 5-7 exited 0 on its first run.
