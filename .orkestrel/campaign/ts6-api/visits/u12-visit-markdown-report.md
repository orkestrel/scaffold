# Unit report — U12 fleet-visit-markdown (phase A, before the releases)

## Step 1 — preflight

Command: `git status --short`
Exit: 0
Output: `D  tests/distribution.test.ts` (matches expected)

Command: `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts`
Exit: 0
Output: `1` (matches expected)

## Step 2 — package.json

Removed the `"vite-plugin-dts": "^5.1.0",` row from `devDependencies`. No other row touched.

## Step 3 — face config rewrite

This checkout has one face, `core`. Rewrote `configs/src/vite.core.config.ts`: replaced the
`vite-plugin-dts` import and its `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler:
{ overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call with
`import { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'` and
`declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types:
['node'] })`, matching the seed at `vites.src.core` in scaffold's `src/core/templates.ts`
(extracted from the installed head start's `dist/src/core/index.js.map` sourcesContent, lines
546-578). Nothing else in the file changed.

## Step 4 — repair and audit

Command: `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`
Exit: 0
Output:
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

`repair` reported 7 named refreshed vendored files and wrote an 8th path it did not name in the
console summary: `tests/distribution.test.ts`, confirmed present afterward by `git status --short`
showing it as `?? tests/distribution.test.ts` alongside the still-staged `D` from before the run,
and by its content (parser-shaped, no `typescript` specifier in its first 20 lines).

Paths `repair` wrote:
- `vite.config.ts`
- `configs/helpers.ts`
- `configs/policy.ts`
- `.oxlintrc.json`
- `tests/setupPolicy.ts`
- `tests/policy.test.ts`
- `tests/config.test.ts`
- `tests/distribution.test.ts`

Command: `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`
Exit: 0
Output:
```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## Step 5 — fast gates

Command: `npm run format:check`
Exit: 0
Last lines: `All matched files use the correct format.` / `Finished in 3785ms on 47 files using 4 threads.`

Command: `npm run lint:check`
Exit: 0
Output: (none beyond the invocation line; no findings)

Command: `npm run check`
Exit: 0
Last line: `tsc --noEmit -p configs/src/tsconfig.core.json` completed with no diagnostics printed.

## Step 6 — build

Command: `npm run build`
Exit: 0
Last lines:
```
✓ built in 559ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
(The API Extractor version notice is informational; the build still exited 0 and emitted both
files.)

Command: `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`
Output:
```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

Command: `head -5 dist/src/core/index.d.ts` and `head -5 dist/src/core/index.d.cts`
Both print identical first lines:
```
import { BooleanShape } from '@orkestrel/contract';
import type { CommentNode } from '@orkestrel/html';
import type { ContractInterface } from '@orkestrel/contract';
import type { DoctypeNode } from '@orkestrel/html';
import type { ElementNode } from '@orkestrel/html';
```

## Step 7 — distribution proof under npm 11

Command: `PATH=/opt/npm11/bin:$PATH npm --version` → `11.19.1`

Command: `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Exit: 0
Last lines:
```
Test Files  1 passed (1)
     Tests  9 passed (9)
  Duration  14.92s
```

## Step 8 — final tree state

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
(The `D`/`??` pair on `tests/distribution.test.ts` is the pre-existing staged deletion from before
this unit launched, next to the unstaged file `repair` wrote back at that path; no `git add` or
commit ran.)

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

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no
   match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1`, one call for
   the checkout's single face, `core`.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier (the specifier
   appears only at line 33, outside the first 20 lines). `audit --offline` reports `0 of 34 planned
   paths drifted from the plan`.
3. PASS — `format:check`, `lint:check`, and `check` each exited 0.
4. PASS — `build` exited 0 and emitted `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exited 0 (9 tests passed).

## Deviations

None. The host's command classifier refusal of `npx scaffold ...` was already anticipated in the
brief's Context and Steps, so the `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command>
--offline` form was used throughout as instructed, not as a substitution.

`repair`'s console summary named 7 of the 8 paths it wrote; `tests/distribution.test.ts` was the
8th, identified from the file count (`8 written`) reconciled against `git status --short` and the
file's content. This is noted for completeness, not as a deviation from the brief's instructions.
