# Gate report — U12 fleet-visit-sqlite (phase A), independent cheap gates

Ran from `/home/user/fleet/sqlite`.

## 1. `git log --oneline -1` and `git status --short`

Exit 0.

```
fcb01c7 Align the lint script with the host's shape
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

`grep -rn "vite-plugin-dts"`: exit 1, no line printed (expected).

`grep -c "declarationRollup("`: exit 0, count `1` (`configs/src/vite.server.config.ts` is the only `vite.*.config.ts` file present).

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1, no line printed (expected).

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
Finished in 4011ms on 43 files using 4 threads.
```

## 6. `npm run lint:check`

Exit 0. No warnings or errors printed.

## 7. `npm run check`

Exit 0.

```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
```

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts` where `exports` carries a `require` condition

`package.json`'s `exports` map has one face, `.` (the server face), with both `import` and `require` conditions, so it carries a `require` condition and must ship a `.d.cts` file.

`ls dist/src/*/index.d.ts`: exit 0.

```
dist/src/server/index.d.ts
```

`ls dist/src/*/index.d.cts`: exit 0.

```
dist/src/server/index.d.cts
```

## GATES: GREEN
