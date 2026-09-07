# Unit report — U12 fleet-visit-sea (phase A, before the releases)

## Deviations

Host classifier substitution named in the brief itself: ran `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline` in place of `npx scaffold ...` throughout, per the brief's Context and Host line. No other deviation.

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` (only entry, as expected). `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`. Both match the brief's expectation. Exit 0.

2. Removed the `"vite-plugin-dts": "^5.1.0",` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.server.config.ts` (the sole face in this checkout) from the `dts({ tsconfigPath, bundleTypes: true, beforeWriteFile: ... })` shape to:

```ts
import { defineConfig, mergeConfig } from 'vite'
import { declarationRollup, rewriteCoreSpecifier } from '../helpers.js'
import { srcServer, resolveWorkspacePath } from '../../vite.config.ts'

// The roll-up reaches src/core through a specifier the tarball does not carry, so the rewrite
// externalizes core through the package's own published root export, on the final roll-up alone.
export default defineConfig(
	mergeConfig(srcServer(), {
		plugins: [
			declarationRollup({
				project: resolveWorkspacePath('configs/src/tsconfig.server.json'),
				rewrite: rewriteCoreSpecifier,
			}),
		],
	}),
)
```

The `vite-plugin-dts` import, the inline `beforeWriteFile` rewrite, and its comment are gone; nothing else in the file changed.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0:

```
integration: integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.
0 of 36 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 8.
vite.config.ts replaced (1 line added).
configs/helpers.ts replaced (300 lines added).
configs/policy.ts replaced (677 lines added).
.oxlintrc.json replaced (69 lines added).
tests/setupPolicy.ts replaced (912 lines removed).
tests/policy.test.ts replaced (142 lines removed).
tests/config.test.ts replaced (751 lines added).
8 written, 29 unchanged, 0 removed in ..
```

`repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts` (the eighth write, restoring the file `git status` showed as `D`; it is not named in the printed list because it is a create rather than a replace, but `git status --short` after this step shows it present as untracked).

`node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0:

```
integration: integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.
0 of 36 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 8.
```

No drift reported anywhere.

5. `npm run format:check` — exit 0, "All matched files use the correct format." (52 files).
   `npm run lint:check` — exit 0, no output (no violations).
   `npm run check` — exit 0: `tsc --noEmit --project tsconfig.json`, then `check:src` → `check:src:server` (`tsc --noEmit -p configs/src/tsconfig.server.json`), both clean.

6. `npm run build` — exit 0. Chain: `clean`, then `build:src:server` (`vite build --config configs/src/vite.server.config.ts && npm run copy dist/src/server/index.d.ts dist/src/server/index.d.cts`). Vite emitted `dist/src/server/index.js` and `dist/src/server/index.cjs`; the roll-up plugin emitted `dist/src/server/index.d.ts` and the `copy` script duplicated it to `dist/src/server/index.d.cts`.

   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` →
   ```
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```

   `head -5 dist/src/server/index.d.ts`:
   ```
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   import type { EmitterHooks } from '@orkestrel/emitter';
   import type { EmitterInterface } from '@orkestrel/emitter';

   /**
   ```

   `head -5 dist/src/server/index.d.cts` is byte-identical to the preceding.

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0:
   ```
    Test Files  1 passed (1)
         Tests  9 passed (9)
   ```

8. `git status --short`:
   ```
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M configs/src/vite.server.config.ts
    M package.json
    M tests/config.test.ts
   D  tests/distribution.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
   ?? tests/distribution.test.ts
    M vite.config.ts
   ```
   (`tests/distribution.test.ts` shows as both the staged deletion the Orchestrator made before launch and the untracked file `repair` wrote back; the net effect is the parser-shaped proof now present on disk in place of the compiler-shaped one.)

   `git diff --stat`:
   ```
    .oxlintrc.json                    |   69 +++
    configs/helpers.ts                |  304 ++++++++++-
    configs/policy.ts                 |  731 ++++++++++++++++++++++++-
    configs/src/vite.server.config.ts |   19 +-
    package.json                      |    1 -
    tests/config.test.ts              |  783 ++++++++++++++++++++++++++-
    tests/policy.test.ts              |  202 ++-----
    tests/setupPolicy.ts              | 1078 +++----------------------------------
    vite.config.ts                    |    7 +-
    9 files changed, 1965 insertions(+), 1229 deletions(-)
   ```

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, empty match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` (the sole `server` face).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier (the file's one `typescript/bin/tsc` reference sits at line 33, outside the head window). `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` reports `0 of 36 planned paths drifted`.
3. PASS — `format:check`, `lint:check`, and `check` all exit 0.
4. PASS — `build` exits 0 and emits `dist/src/server/index.d.ts` and `dist/src/server/index.d.cts` (this checkout's only face).
5. PASS — `test:distribution` under npm 11 exits 0, 9 of 9 tests passed.

## Repair-written paths

`vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` (8 written, 29 unchanged, 0 removed).
