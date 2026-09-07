# Verify report — U12 fleet-visit-websocket (phase A)

## 1. `git log --oneline -1` and `git status --short`
Exit: 0
```
7c6c550 Align the lint script with the host's shape
---
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
`vite-plugin-dts` grep: exit 1, no line printed (expected).
`declarationRollup(` count: only one file matches the glob (`configs/src/vite.server.config.ts`), so `grep -c` printed the bare count with no filename prefix: `1`.

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`
Exit: 1, no line printed (expected).

## 4. `npx scaffold audit --offline`
Exit: 0
```
integration: integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.
0 of 37 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 9.
```

## 5. `npm run format:check`
Exit: 0
```
Checking formatting...
All matched files use the correct format.
Finished in 6150ms on 47 files using 4 threads.
```

## 6. `npm run lint:check`
Exit: 0 (no diagnostics printed)

## 7. `npm run check`
Exit: 0
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
```
(No diagnostics from either `tsc` invocation.)

## 8. `ls dist/src/*/index.d.ts` and `ls dist/src/*/index.d.cts` where `require` condition exists
`ls dist/src/*/index.d.ts`: `dist/src/server/index.d.ts`
`package.json` `exports["."]` carries both `import` and `require` conditions for the single `server` face, so `.d.cts` is expected.
`ls dist/src/*/index.d.cts`: `dist/src/server/index.d.cts`

GATES: GREEN
