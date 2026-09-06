# Unit report — U12 fleet-visit-browser (phase A, before the releases)

## Starting state (confirmed, not redone)

- `git status --short` at start showed `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, and `package.json` already modified (steps 2 and 3 already complete from the prior run), `tests/distribution.test.ts` as `D` (tracked) plus `??` (untracked regenerated copy already in place from the Orchestrator's `repair` run), and vendored files `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `vite.config.ts` already modified by that prior `repair`.
- `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`. PASS (head start present).
- Confirmed `configs/src/vite.core.config.ts` already imports and calls `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })` from `'../helpers.js'`, no `vite-plugin-dts` import.
- Confirmed `configs/src/vite.server.config.ts` already imports and calls `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier })` from `'../helpers.js'`, no `vite-plugin-dts` import, no inline `beforeWriteFile`.
- Confirmed `package.json` no longer carries the `vite-plugin-dts` row.

No manual edits were made to any owned file in this run — steps 2 and 3 were already satisfied by the prior run, per the brief's instruction to confirm rather than redo.

## Steps

### Step 4 — repair and audit

`node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`
Exit: `0`
Last lines:
```
0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.
0 written, 41 unchanged, 0 removed in ..
```
Paths `repair` wrote: none (`0 written` — `tests/distribution.test.ts` was already the regenerated untracked copy from the Orchestrator's prior `repair` run, and every other vendored path was already unchanged).

`node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`
Exit: `0`
Last lines:
```
0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.
```
No drift.

### Step 5 — fast gates

`npm run format:check` — exit `0`. Last lines:
```
Checking formatting...
All matched files use the correct format.
Finished in 3197ms on 135 files using 4 threads.
```

`npm run lint:check` — exit `0`. Output: no findings (empty body after the command echo).

`npm run check` — exit `0`. Ran `tsc --noEmit --project tsconfig.json`, `check:src:core`, and `check:src:server` in sequence, all clean.

### Step 6 — build

`npm run build` — exit `0`. Built `dist/src/core` (`index.js` 256.12 kB, `index.cjs` 272.28 kB) and `dist/src/server` (`index.js` 58.00 kB, `index.cjs` 61.14 kB), each followed by the `copy` script writing `index.d.cts` from `index.d.ts`. API Extractor logged its usual TypeScript-version-mismatch notice (bundled 5.9.3 vs. project 6.0.3) for each face; not an error.

`ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
dist/src/server/index.d.cts
dist/src/server/index.d.ts
```

`head -5 dist/src/core/index.d.ts`:
```
import type { EmitterErrorHandler } from '@orkestrel/emitter';
import type { EmitterHooks } from '@orkestrel/emitter';
import type { EmitterInterface } from '@orkestrel/emitter';

/** Holds the index-ordered base64 alphabet used to build {@link BASE64_LOOKUP}. */
```

`head -5 dist/src/server/index.d.ts`:
```
import type { BrowserContextInterface } from '@orkestrel/browser';
import type { BrowserContextOptions } from '@orkestrel/browser';
import { BrowserError } from '@orkestrel/browser';
import type { BrowserPageInterface } from '@orkestrel/browser';
import type { BrowserPageOptions } from '@orkestrel/browser';
```
The server face's declaration head shows the core specifier already rewritten onto `@orkestrel/browser`, confirming `rewriteCoreSpecifier` ran.

### Step 7 — distribution proof under npm 11

`PATH=/opt/npm11/bin:$PATH npm --version` → `11.19.1`.

`PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit `0`. Last lines:
```
 Test Files  1 passed (1)
      Tests  11 passed (11)
   Duration  20.32s
```

### Step 8 — final tree state

`git status --short`:
```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M package.json
 M tests/config.test.ts
D  tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
?? tests/distribution.test.ts
```
Identical to the starting state — this unit made no additional edits and `repair` wrote nothing new. `package-lock.json` untouched; `@orkestrel/scaffold` and `@orkestrel/probe` ranges untouched.

`git diff --stat`:
```
 .oxlintrc.json                    |   69 +++
 configs/helpers.ts                |  304 ++++++++++-
 configs/policy.ts                 |  731 ++++++++++++++++++++++++-
 configs/src/vite.core.config.ts   |   17 +-
 configs/src/vite.server.config.ts |   19 +-
 package.json                      |    1 -
 tests/config.test.ts              |  783 ++++++++++++++++++++++++++-
 tests/policy.test.ts              |  202 ++-----
 tests/setupPolicy.ts              | 1078 +++----------------------------------
 vite.config.ts                    |    7 +-
 10 files changed, 1969 insertions(+), 1242 deletions(-)
```

## Acceptance criteria

1. `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit `1`, no match); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for `vite.core.config.ts` and `1` for `vite.server.config.ts`. **PASS**
2. `head -20 tests/distribution.test.ts` names no `typescript` specifier (the specifier appears only at line 33, outside the first 20 lines); `audit --offline` reports `0 of 40 planned paths drifted`. **PASS**
3. `format:check`, `lint:check`, and `check` each exit `0`. **PASS**
4. `build` exits `0` and emits `dist/src/core/index.d.ts`, `dist/src/core/index.d.cts`, `dist/src/server/index.d.ts`, `dist/src/server/index.d.cts`. **PASS**
5. `test:distribution` under npm 11 exits `0` (11 tests passed). **PASS**

## Deviations

None. The prior run's state matched what the brief described (steps 2 and 3 already complete, `tests/distribution.test.ts` deleted and regenerated), `repair` and `audit` reported no drift, and every subsequent gate and the build passed without needing any correction.
