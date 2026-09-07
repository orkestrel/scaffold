# Gate report — U12 fleet-visit-worker (phase A), independent cheap gates

Run from `/home/user/fleet/worker`.

## 1. `git log --oneline -1` and `git status --short`

Exit: 0 (both)

```
68d6ab6 Align the lint script with the host's shape
```

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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

Exit: 1 (no line — expected), 0

```
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit: 1 (no line — expected). No output.

## 4. `npx scaffold audit --offline`

Exit: 0

```
0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
```

## 5. `npm run format:check`

Exit: 0

```
Checking formatting...
All matched files use the correct format.
Finished in 3316ms on 72 files using 4 threads.
```

## 6. `npm run lint:check`

Exit: 0

```
> @orkestrel/worker@0.0.11 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 7. `npm run check`

Exit: 0

```
> @orkestrel/worker@0.0.11 check
> tsc --noEmit --project tsconfig.json && npm run check:src
> @orkestrel/worker@0.0.11 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
> @orkestrel/worker@0.0.11 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
```

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts` where `exports` carries `require`

Exit: 0 (both)

ESM declarations:
```
dist/src/core/index.d.ts
dist/src/server/index.d.ts
```

`package.json` exports map: both faces (`.` and `./server`) carry both `import` and `require` conditions — neither is browser-only ES.

CommonJS declarations (both faces require them):
```
dist/src/core/index.d.cts
dist/src/server/index.d.cts
```

## Anomalies

None.

GATES: GREEN
