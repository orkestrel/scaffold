# Gate report — U12 fleet-visit-template (phase A), independent cheap gates

Working directory: `/home/user/fleet/template`

## 1. `git log --oneline -1` and `git status --short`

Exit code: 0

```
ac4908c Align the lint script with the host's shape
---
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

`grep -rn "vite-plugin-dts"`: exit code 1, no line (expected).

`grep -c "declarationRollup("`: exit code 0, last line:

```
1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit code: 1, no line (expected).

## 4. `npx scaffold audit --offline`

Exit code: 0

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## 5. `npm run format:check`

Exit code: 0

```
Checking formatting...

All matched files use the correct format.
Finished in 2830ms on 44 files using 4 threads.
```

## 6. `npm run lint:check`

Exit code: 0

```
> @orkestrel/template@0.0.6 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 7. `npm run check`

Exit code: 0

```
> @orkestrel/template@0.0.6 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. Declaration file listing

`ls dist/src/*/index.d.ts`: exit code 0

```
dist/src/core/index.d.ts
```

`ls dist/src/*/index.d.cts`: exit code 0

```
dist/src/core/index.d.cts
```

`package.json`'s `exports` map carries one face, `core` (the `.` entry), with both an `import` condition (`types`: `./dist/src/core/index.d.ts`) and a `require` condition (`types`: `./dist/src/core/index.d.cts`). The `require` condition's presence obliges the `.d.cts` file, and it exists.

## Anomalies

`git status --short` shows `tests/distribution.test.ts` as both staged-deleted (`D`) and untracked (`??`) — a working-tree state matching the brief's expected dirty baseline (a deleted-then-recreated file), read as expected per orchestration.md § Permission floor.

GATES: GREEN
