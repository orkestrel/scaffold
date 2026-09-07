# Gate report — U12 fleet-visit-tool (phase A)

## 1. `git log --oneline -1` and `git status --short`

Exit: 0

```
799d3c4 Align the lint script with the host's shape
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

First grep: exit 1, no line printed (expected).

Second grep (only `configs/src/vite.core.config.ts` matches the glob):

```
configs/src/vite.core.config.ts:1
```

Exit: 0

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit: 1, no line printed (expected).

## 4. `npx scaffold audit --offline`

Exit: 0

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## 5. `npm run format:check`

Exit: 0

```
Checking formatting...
All matched files use the correct format.
Finished in 3620ms on 41 files using 4 threads.
```

## 6. `npm run lint:check`

Exit: 0

```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no findings printed)

## 7. `npm run check`

Exit: 0

```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts`

`ls dist/src/*/index.d.ts` exit 0:

```
dist/src/core/index.d.ts
```

`package.json`'s `exports` map carries one face, `.` (core), with both `import` and `require` conditions, so a `.d.cts` file is expected for that face.

`ls dist/src/*/index.d.cts` exit 0:

```
dist/src/core/index.d.cts
```

## Anomalies

- `git status --short` shows `tests/distribution.test.ts` as both staged-deleted (`D `) and untracked (`??`), a pre-existing working-tree state per the brief's dispatch, not something this run altered.

GATES: GREEN
