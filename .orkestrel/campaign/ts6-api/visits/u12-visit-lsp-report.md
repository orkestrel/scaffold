# Unit report — U12 fleet-visit-lsp (phase A, before the releases)

## Step 1 — preflight

- `git status --short` → `D  tests/distribution.test.ts` alone. Exit 0. Matched expectation.
- `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`. Exit 0. Matched expectation.

## Step 2 — package.json

Removed the `"vite-plugin-dts": "^5.1.0",` row from `devDependencies`. No other row touched.

## Step 3 — face configs

Rewrote `configs/src/vite.core.config.ts`: removed the `vite-plugin-dts` import, replaced the
`dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: {
compilerOptions: { types: ['node'] } } } } } })` call with `declarationRollup({ project:
resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, imported from
`'../helpers.js'` beside `environmentBoundary` and `outputBoundary`. Nothing else in the file
changed.

Rewrote `configs/src/vite.server.config.ts`: removed the `vite-plugin-dts` import and the inline
`beforeWriteFile` rewrite plus its comment, replaced the `dts({ tsconfigPath, bundleTypes: true,
beforeWriteFile })` call with `declarationRollup({ project:
resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier })`,
imported `declarationRollup` and `rewriteCoreSpecifier` from `'../helpers.js'`, and replaced the
old three-line comment with the seed's own two-line comment above `export default`. Nothing else
in the file changed.

## Step 4 — repair and audit

`node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0:

```
0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.
vite.config.ts replaced (1 line added).
configs/helpers.ts replaced (300 lines added).
configs/policy.ts replaced (677 lines added).
.oxlintrc.json replaced (69 lines added).
tests/setupPolicy.ts replaced (912 lines removed).
tests/policy.test.ts replaced (142 lines removed).
tests/config.test.ts replaced (751 lines added).
8 written, 33 unchanged, 0 removed in ..
```

Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`,
`.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and
`tests/distribution.test.ts` (the absent path it recreated, per the brief's Context).

`node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0:

```
0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.
```

No drift reported in any file.

## Step 5 — fast gates

- `npm run format:check` — exit 0. Last lines: `All matched files use the correct format.` /
  `Finished in 3438ms on 64 files using 4 threads.`
- `npm run lint:check` — exit 1 (expected standing condition per brief). Last line:
  `tests/setupConformance.ts:37:1: error eslint(no-restricted-imports): 'typescript' import is
  restricted from being used by a pattern. help: the in-process compiler API is not a surface the
  fleet uses`. `tests/setupConformance.ts` is U11's off-limits file; no other lint error reported.
- `npm run check` — exit 0. Last lines show `check:src:core` and `check:src:server` each running
  `tsc --noEmit` with no output (clean).

## Step 6 — build

`npm run build` — exit 0. Both `clean`, `build:src:core`, and `build:src:server` completed; each
face's `vite build` succeeded and its `copy` step produced the `.d.cts` sibling.

```
$ ls dist/src/*/index.d.ts dist/src/*/index.d.cts
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
import type { Guard } from '@orkestrel/contract';
```

`head -5 dist/src/server/index.d.ts`:

```
import type { EmitterErrorHandler } from '@orkestrel/emitter';
import type { EmitterHooks } from '@orkestrel/emitter';
import type { EmitterInterface } from '@orkestrel/emitter';
import type { LSPTransportEventMap } from '@orkestrel/lsp';
import type { LSPTransportInterface } from '@orkestrel/lsp';
```

The server face's declarations quote `@orkestrel/lsp`, confirming `rewriteCoreSpecifier` ran on
the roll-up as expected.

## Step 7 — distribution proof

`PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0:

```
 Test Files  1 passed (1)
      Tests  11 passed (11)
   Start at  01:03:22
   Duration  19.54s (transform 166ms, setup 43ms, import 2.18s, tests 17.13s, environment 0ms)
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
D  tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
?? tests/distribution.test.ts
```

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

The `D`/`??` pair on `tests/distribution.test.ts` is the same file: the Orchestrator's pre-launch
`git rm` staged the deletion, and `repair` wrote the parser-shaped proof back as an untracked file
at the same path.

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (exit 1, no
   match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reported `1` for each face.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier. `audit --offline`
   reported no drift.
3. FAIL (expected standing condition) — `format:check` exit 0, `check` exit 0, `lint:check` exit 1
   solely on `tests/setupConformance.ts` (U11's off-limits file, restricted `typescript` import),
   per the brief's Context. No other file failed any of the three gates.
4. PASS — `build` exit 0; `dist/src/core/index.d.ts`, `dist/src/core/index.d.cts`,
   `dist/src/server/index.d.ts`, `dist/src/server/index.d.cts` all present.
5. PASS — `test:distribution` under npm 11 exit 0, 11 of 11 tests passed.

## Deviations

None. `lint:check` reddening on `tests/setupConformance.ts` is the standing condition the brief
names in its Context, not a deviation; no other file failed a gate, and no face's config, `repair`,
or `audit` reported anything the Deviation contract requires stopping on.
