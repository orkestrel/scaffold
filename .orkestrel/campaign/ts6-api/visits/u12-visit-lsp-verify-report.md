# Verify report — U12 fleet-visit-lsp (phase A), the independent cheap gates

## 1. `git log --oneline -1` / `git status --short`

Exit 0 for both.

```
9973533 Re-pin the development ranges to the released fleet
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` / `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

`vite-plugin-dts` grep: exit 1, no line printed.

`declarationRollup(` grep: exit 0.

```
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1, no line printed.

## 4. `npx scaffold audit --offline`

Exit 0.

```
0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.
```

## 5. `npm run format:check`

Exit 0.

```
Checking formatting...

All matched files use the correct format.
Finished in 2900ms on 64 files using 4 threads.
```

## 6. `npm run lint:check`

Exit 1 (expected standing condition).

```
tests/setupConformance.ts:37:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
```

The red confines itself to `tests/setupConformance.ts` (U11's importer), matching the expected standing condition. No other file is named.

## 7. `npm run check`

Exit 0.

```
> @orkestrel/lsp@0.0.6 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/lsp@0.0.6 check:src
> npm run check:src:core && npm run check:src:server

> @orkestrel/lsp@0.0.6 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json

> @orkestrel/lsp@0.0.6 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
```

## 8. `ls dist/src/*/index.d.ts`, `ls dist/src/*/index.d.cts`

Exports map conditions per face (from `package.json`):

- `.` (core): `import` and `require`, both with `types`.
- `./server`: `import` and `require`, both with `types`.

Both faces carry a `require` condition, so both `.d.ts` and `.d.cts` are expected for each.

```
dist/src/core/index.d.ts
dist/src/server/index.d.ts
```

```
dist/src/core/index.d.cts
dist/src/server/index.d.cts
```

Both listings exit 0 and match the exports map.

GATES: GREEN
