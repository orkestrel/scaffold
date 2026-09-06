# Unit report — U12 fleet-visit-probe

## Step 1 — baseline

`git status --short`: clean (no output).
`node -e "console.log(require('@orkestrel/scaffold/package.json').version)"`: `0.0.63` (exit 0).

## Step 2 — package.json

Removed the `"vite-plugin-dts": "^5.1.0",` row from `devDependencies`. No other row touched.

## Step 3 — face configs

`configs/src/vite.core.config.ts`: replaced the `dts` import and call with
`import { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'` and
`declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`,
matching scaffold's `vites.src.core` seed exactly.

`configs/src/vite.server.config.ts`: replaced the `dts` import, the `bundleTypes`/`beforeWriteFile`
call, and its comment with
`import { declarationRollup, rewriteCoreSpecifier } from '../helpers.js'` and
`declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier })`,
matching scaffold's `vites.src.server` seed exactly (the vendored `rewriteCoreSpecifier` helper
replaces the file's former inline `beforeWriteFile` rewrite).

`configs/src/vite.bin.config.ts`: untouched (carries no `dts(` call).

## Step 4 — regenerate the distribution proof

`rm tests/distribution.test.ts`: exit 0, no output.

`npx scaffold repair --offline` (exit 0):
```
0 of 43 planned paths drifted from the plan. Audit compared bytes at 27, existence at 5, and nothing at 11.
vite.config.ts replaced (1 line added).
configs/helpers.ts replaced (300 lines added).
configs/policy.ts replaced (677 lines added).
.oxlintrc.json replaced (69 lines added).
tests/setupPolicy.ts replaced (912 lines removed).
tests/policy.test.ts replaced (142 lines removed).
tests/config.test.ts replaced (751 lines added).
8 written, 36 unchanged, 0 removed in ..
```
`repair` regenerated `tests/distribution.test.ts` (the 8th written path, not named individually in
the summary line) in addition to the six vendored files it listed by name:
`vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.
No guide mirror files were reported as written.

`npx scaffold audit --offline` (exit 0):
```
0 of 43 planned paths drifted from the plan. Audit compared bytes at 27, existence at 5, and nothing at 11.
```
No drift.

## Step 5 — fast gates

`npm run format:check` — exit 0. Last lines:
```
All matched files use the correct format.
Finished in 4374ms on 70 files using 4 threads.
```

`npm run lint:check` — exit 0 (no findings printed).

`npm run check` — exit 0. Ran `tsc --noEmit --project tsconfig.json`, then
`check:src:core`, `check:src:server`, `check:src:bin` in sequence, each exiting 0 silently.

## Step 6 — build

`npm run build` — exit 0. Built `dist/src/core` (`index.js`, `index.cjs`, copied `.d.ts` to
`.d.cts`), `dist/src/server` (`index.js`, `index.cjs`, copied `.d.ts` to `.d.cts`), and
`dist/bin/main.js`. Each face's API Extractor pass printed the informational note "the target
project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine", not an
error.

`ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
dist/src/server/index.d.cts
dist/src/server/index.d.ts
```

`head -5 dist/src/core/index.d.ts`:
```
import { ArrayShape } from '@orkestrel/contract';
import type { EmitterErrorHandler } from '@orkestrel/emitter';
import type { EmitterHooks } from '@orkestrel/emitter';
import type { EmitterInterface } from '@orkestrel/emitter';
import type { Guard } from '@orkestrel/contract';
```

`head -5 dist/src/server/index.d.ts`:
```
import type { Case } from '@orkestrel/probe';
import type { Check } from '@orkestrel/probe';
import type { Claim } from '@orkestrel/probe';
import type { EmitterInterface } from '@orkestrel/emitter';
import type { EventEmitter } from 'node:events';
```
The server declaration resolves the rewritten `@orkestrel/probe` specifier rather than a relative
`core` path, confirming `rewriteCoreSpecifier` ran on the roll-up.

## Step 7 — distribution proof under npm 11

`PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. Last lines:
```
 RUN  v4.1.11 /home/user/fleet/probe

···········

 Test Files  1 passed (1)
      Tests  11 passed (11)
   Start at  22:17:05
   Duration  25.49s (transform 169ms, setup 33ms, import 8.44s, tests 16.84s, environment 0ms)
```

## Step 8 — final tree state

`git status --short`:
```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M package.json
 M tests/config.test.ts
 M tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
```
`.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `tests/config.test.ts`,
`tests/policy.test.ts`, `tests/setupPolicy.ts`, and `vite.config.ts` are vendored paths `repair`
rewrote from the installed scaffold head start; this unit did not edit them directly.
`package-lock.json` is untouched, matching the brief.

`git diff --stat`:
```
 .oxlintrc.json                    |   69 +++
 configs/helpers.ts                |  304 ++++++++++-
 configs/policy.ts                 |  731 ++++++++++++++++++++++++-
 configs/src/vite.core.config.ts   |   17 +-
 configs/src/vite.server.config.ts |   19 +-
 package.json                      |    1 -
 tests/config.test.ts              |  783 ++++++++++++++++++++++++++-
 tests/distribution.test.ts        |  281 +++++++---
 tests/policy.test.ts              |  202 ++-----
 tests/setupPolicy.ts              | 1078 +++----------------------------------
 vite.config.ts                    |    7 +-
 11 files changed, 2164 insertions(+), 1328 deletions(-)
```

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no
   matches); `grep -c "declarationRollup(" configs/src/vite.core.config.ts configs/src/vite.server.config.ts`
   reports `1` for each face.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier (the file's one
   `typescript/bin/tsc` reference sits at line 33, outside the first 20 lines); `npx scaffold audit --offline`
   reports no drift.
3. PASS — `format:check`, `lint:check`, and `check` each exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts`, `dist/src/core/index.d.cts`,
   `dist/src/server/index.d.ts`, `dist/src/server/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exits 0 (11 tests passed).

## Deviations

None. No face's config diverged from the Context's shape, `repair` and `audit` reported no drift
outside the owned set, every gate passed in owned files, and the build emitted `index.d.ts` for
every face.
