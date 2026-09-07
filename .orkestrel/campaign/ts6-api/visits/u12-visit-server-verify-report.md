# Gate report — U12 fleet-visit-server (phase A)

## 1. `git log --oneline -1` and `git status --short`

Exit 0, exit 0.

```
fdb197c Align the lint script with the host's shape
```

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
 M vite.config.ts
?? tests/distribution.test.ts
```

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

First grep: exit 1, no line (expected no line — met).
Second grep: exit 0, count `1`.

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1, no line (expected no line — met).

## 4. `npx scaffold audit --offline`

Exit 0.

```
0 of 35 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 7.
```

## 5. `npm run format:check`

Exit 0.

```
Checking formatting...

All matched files use the correct format.
Finished in 3256ms on 53 files using 4 threads.
```

## 6. `npm run lint:check`

Exit 0. No warnings or errors printed.

## 7. `npm run check`

Exit 0. `tsc --noEmit --project tsconfig.json`, `check:src`, and `check:src:server` all completed with no diagnostics printed.

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts`

`ls dist/src/*/index.d.ts`: exit 0.

```
dist/src/server/index.d.ts
```

`ls dist/src/*/index.d.cts`: exit 0.

```
dist/src/server/index.d.cts
```

`package.json`'s `exports` map for `"."` carries both an `import` condition (`types`: `./dist/src/server/index.d.ts`) and a `require` condition (`types`: `./dist/src/server/index.d.cts`), so the server face is expected to ship both `.d.ts` and `.d.cts`, and both are present.

## Anomalies

`git status --short` shows `tests/distribution.test.ts` as both staged-deleted (`D `) and untracked (`??`) — the working tree carries an uncommitted deletion and a new unstaged file at the same path. This is the pre-existing dirty state, not something this run caused.

GATES: GREEN
