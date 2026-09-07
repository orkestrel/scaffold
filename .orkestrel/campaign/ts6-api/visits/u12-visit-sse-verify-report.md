# Verify report — U12 fleet-visit-sse (phase A), the independent cheap gates

## 1. `git log --oneline -1` and `git status --short`

Exit: 0

```
0415a34 Align the lint script with the host's shape
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

The working tree carries staged and unstaged changes, including a staged deletion of `tests/distribution.test.ts` paired with an untracked replacement at the same path. This matches the expected dirty state for an in-progress unit.

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

Exit (first grep): 1 (no match, as expected)
Exit (second grep): 0

```
(no lines)
```

```
1
```

No line prints for the `vite-plugin-dts` search, so this step does not decide the terminal line.

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit: 1 (no match, as expected)

```
(no lines)
```

No line prints, so this step does not decide the terminal line.

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
Finished in 2642ms on 37 files using 4 threads.
```

## 6. `npm run lint:check`

Exit: 0

```
> @orkestrel/sse@0.0.6 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .

(no findings)
```

## 7. `npm run check`

Exit: 0

```
> @orkestrel/sse@0.0.6 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/sse@0.0.6 check:src
> npm run check:src:core

> @orkestrel/sse@0.0.6 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts`

Exit (both): 0

```
dist/src/core/index.d.ts
```

```
dist/src/core/index.d.cts
```

The package declares one face, `core`, in its `exports` map:

```json
{
  ".": {
    "import": { "types": "./dist/src/core/index.d.ts", "default": "./dist/src/core/index.js" },
    "require": { "types": "./dist/src/core/index.d.cts", "default": "./dist/src/core/index.cjs" }
  },
  "./package.json": "./package.json"
}
```

The `core` face carries both `import` and `require` conditions, so both `index.d.ts` and `index.d.cts` are expected for that face and both are present.

## Overall

All gates passed. Steps 2 and 3 printed no line, so neither decides the terminal line.

GATES: GREEN
