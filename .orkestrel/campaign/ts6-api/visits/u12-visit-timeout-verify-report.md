# Gate report — U12 fleet-visit-timeout (phase A), the independent cheap gates

Checkout: `/home/user/fleet/timeout`

## Step 1 — `git log --oneline -1` and `git status --short`

Exit 0.

```
d96438e Re-pin the development ranges to the released fleet
```

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

## Step 2 — `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

`vite-plugin-dts` grep: exit 1, no line printed (expected: no line — matches expectation).

`declarationRollup(` count: `configs/src/vite.core.config.ts:1` — exit 0.

## Step 3 — `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1, no line printed (expected: no line — matches expectation).

## Step 4 — `npx scaffold audit --offline`

Exit 0.

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## Step 5 — `npm run format:check`

Exit 0.

```
Checking formatting...
All matched files use the correct format.
Finished in 2422ms on 40 files using 4 threads.
```

## Step 6 — `npm run lint:check`

Exit 0. No output beyond the command header.

## Step 7 — `npm run check`

Exit 0.

```
> tsc --noEmit -p configs/src/tsconfig.core.json
```

(runs `tsc --noEmit --project tsconfig.json` then `check:src:core`; both completed with no diagnostics.)

## Step 8 — `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts` where `exports` carries a `require` condition

`ls dist/src/*/index.d.ts`: exit 0 — `dist/src/core/index.d.ts`.

`package.json` `exports["."]` map:

```json
{
  "import": { "types": "./dist/src/core/index.d.ts", "default": "./dist/src/core/index.js" },
  "require": { "types": "./dist/src/core/index.d.cts", "default": "./dist/src/core/index.cjs" }
}
```

One face, `core`, carrying both `import` and `require` conditions. `ls dist/src/*/index.d.cts`: exit 0 — `dist/src/core/index.d.cts`. Present as required.

## Anomalies

None observed.

GATES: GREEN
