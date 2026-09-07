# Gate report — U12 fleet-visit-terminal (phase A)

Working directory: `/home/user/fleet/terminal`

## 1. `git log --oneline -1` and `git status --short`

Exit 0.

```
a33b4c1 Align the lint script with the host's shape
---
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

Note: `tests/distribution.test.ts` shows both a staged deletion (`D `) and an untracked copy (`??`) at the same path — the working tree carries an unstaged replacement over a staged delete.

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

`grep -rn "vite-plugin-dts" package.json configs/src`: exit 1, no line printed (matches expected).

`grep -c "declarationRollup(" configs/src/vite.*.config.ts`:

```
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1, no line printed (matches expected).

## 4. `npx scaffold audit --offline`

Exit 0.

```
0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.
```

## 5. `npm run format:check`

Exit 0.

```
> @orkestrel/terminal@0.0.14 format:check
> oxfmt --config .oxfmtrc.json --check .

Checking formatting...

All matched files use the correct format.
Finished in 3687ms on 68 files using 4 threads.
```

## 6. `npm run lint:check`

Exit 0.

```
> @orkestrel/terminal@0.0.14 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 7. `npm run check`

Exit 0.

```
> @orkestrel/terminal@0.0.14 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/terminal@0.0.14 check:src
> npm run check:src:core && npm run check:src:server

> @orkestrel/terminal@0.0.14 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json

> @orkestrel/terminal@0.0.14 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
```

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts`

`package.json` `exports` map, conditions per face:

- `.` (core face): `import` (`.d.ts` / `.js`) and `require` (`.d.cts` / `.cjs`) — carries a `require` condition.
- `./server` (server face): `import` (`.d.ts` / `.js`) and `require` (`.d.cts` / `.cjs`) — carries a `require` condition.

`ls dist/src/*/index.d.ts`: exit 0.

```
dist/src/core/index.d.ts
dist/src/server/index.d.ts
```

Both faces carry a `require` condition, so `.d.cts` files are expected for both. `ls dist/src/*/index.d.cts`: exit 0.

```
dist/src/core/index.d.cts
dist/src/server/index.d.cts
```

## Anomalies

- `tests/distribution.test.ts` is a staged delete with an unstaged untracked replacement at the same path (step 1); this did not affect any gate's exit code.

GATES: GREEN
