# Gate report — U12 fleet-visit-sea (phase A)

## 1. `git log --oneline -1` / `git status --short`
Exit: 0 / 0
```
679c811 Align the lint script with the host's shape
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` / `grep -c "declarationRollup(" configs/src/vite.*.config.ts`
Exit: 1 (no match, expected) / 0
```
(no line printed for vite-plugin-dts)
1
```
Only `configs/src/vite.server.config.ts` matches the `vite.*.config.ts` glob; it contains one `declarationRollup(` call.

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`
Exit: 1 (no match, expected)
```
(no line printed)
```

## 4. `npx scaffold audit --offline`
Exit: 0
```
integration: integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.
0 of 36 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 8.
```

## 5. `npm run format:check`
Exit: 0
```
Checking formatting...
All matched files use the correct format.
Finished in 2916ms on 52 files using 4 threads.
```

## 6. `npm run lint:check`
Exit: 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
(no warnings)
```

## 7. `npm run check`
Exit: 0
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.server.json
```

## 8. `ls dist/src/*/index.d.ts`, `ls dist/src/*/index.d.cts`
Exit: 0 / 0
```
dist/src/server/index.d.ts
---
dist/src/server/index.d.cts
```
`package.json` exports map for `.` carries one face, `server`, with both `import` (ESM, `types`/`default`) and `require` (CommonJS, `types`/`default`) conditions, so the `.d.cts` file is expected and present.

## Anomalies
- `git status --short` shows `tests/distribution.test.ts` as both staged-deleted (`D`) and untracked (`??`) — an unstaged recreation over a staged deletion. Read as the expected dirty state per orchestration instructions; not a gate failure.

GATES: GREEN
