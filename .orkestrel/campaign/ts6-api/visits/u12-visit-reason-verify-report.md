# Gate report — U12 fleet-visit-reason (phase A)

Run from `/home/user/fleet/reason`.

## 1. `git log --oneline -1` and `git status --short`

PASS (exit 0, informational).

```
a9fb0e0 Align the lint script with the host's shape
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

Anomaly: `tests/distribution.test.ts` shows both a staged deletion (`D `) and an untracked copy
(`??`) at the same path, meaning the working tree carries a replacement file over a staged
deletion. This is the expected dirty state for this unit and not a gate failure.

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

PASS. First `grep` prints no line (exit 1, expected no match). Second `grep -c` reports `1`.

```
(no output)
1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

PASS. No line printed (exit 1, expected no match).

## 4. `npx scaffold audit --offline`

PASS (exit 0).

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## 5. `npm run format:check`

PASS (exit 0).

```
Checking formatting...
All matched files use the correct format.
Finished in 2915ms on 79 files using 4 threads.
```

## 6. `npm run lint:check`

PASS (exit 0).

```
> @orkestrel/reason@0.0.9 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 7. `npm run check`

PASS (exit 0).

```
> @orkestrel/reason@0.0.9 check
> tsc --noEmit --project tsconfig.json && npm run check:src
> @orkestrel/reason@0.0.9 check:src
> npm run check:src:core
> @orkestrel/reason@0.0.9 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts` where `exports` carries a `require` condition

PASS. `package.json` `exports["."]` carries both `import` and `require` conditions for the single
`core` face, so both listings are expected to report a file.

```
dist/src/core/index.d.ts
dist/src/core/index.d.cts
```

`exports` map:

```json
{
  ".": {
    "import": { "types": "./dist/src/core/index.d.ts", "default": "./dist/src/core/index.js" },
    "require": { "types": "./dist/src/core/index.d.cts", "default": "./dist/src/core/index.cjs" }
  },
  "./package.json": "./package.json"
}
```

## Overall verdict

GREEN. Every gate passed.

## Anomalies

- Working tree carries a staged deletion and an untracked replacement at the same path,
  `tests/distribution.test.ts`; not a gate failure, noted for the record.

GATES: GREEN
