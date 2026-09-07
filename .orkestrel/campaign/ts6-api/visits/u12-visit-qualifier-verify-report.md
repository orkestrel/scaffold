# Gate report — U12 fleet-visit-qualifier (phase A)

## 1. `git log --oneline -1` / `git status --short`

Exit 0 / 0.

```
e359508 Align the lint script with the host's shape
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` / `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

First command: exit 1, no line printed (expected).
Second command: exit 0, count `1`.

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1, no line printed (expected).

## 4. `npx scaffold audit --offline`

Exit 0.

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## 5. `npm run format:check`

Exit 0.

```
Checking formatting...

All matched files use the correct format.
Finished in 3131ms on 43 files using 4 threads.
```

## 6. `npm run lint:check`

Exit 0. No warnings or errors printed.

## 7. `npm run check`

Exit 0. `tsc --noEmit --project tsconfig.json` and `tsc --noEmit -p configs/src/tsconfig.core.json` both completed with no diagnostics printed.

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts` where `require` applies

- `ls dist/src/*/index.d.ts`: exit 0 → `dist/src/core/index.d.ts`
- `ls dist/src/*/index.d.cts`: exit 0 → `dist/src/core/index.d.cts`

`package.json`'s `exports["."]` map carries one face, `core`, with both `import` and `require`
conditions. The `require` condition names `./dist/src/core/index.d.cts`, which exists, matching
the listing.

## Terminal line

GATES: GREEN
