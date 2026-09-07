# Gate report — U12 fleet-visit-router (phase A), independent cheap gates

Run from `/home/user/fleet/router`.

## 1. `git log --oneline -1` / `git status --short`

Exit 0 / exit 0.

```
8280b39 Align the lint script with the host's shape
```

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.browser.config.ts
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

Dirty working tree — expected state per the campaign's uncommitted changes.

## 2. `grep -rn "vite-plugin-dts" package.json configs/src`

Exit 1 (no line printed — expected). `grep -c "declarationRollup(" configs/src/vite.*.config.ts`, exit 0:

```
configs/src/vite.browser.config.ts:1
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1 (no line printed — expected).

## 4. `npx scaffold audit --offline`

Exit 0. `npx` resolved without refusal; no fallback invocation needed.

```
0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

## 5. `npm run format:check`

Exit 0.

```
Checking formatting...
All matched files use the correct format.
Finished in 2852ms on 73 files using 4 threads.
```

## 6. `npm run lint:check`

Exit 0.

```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no further output)

## 7. `npm run check`

Exit 0. Runs `tsc --noEmit --project tsconfig.json` then `check:src:core`, `check:src:browser`, `check:src:server`, each `tsc --noEmit` against its scoped config. No diagnostics printed by any stage.

## 8. Distribution listing

`ls dist/src/*/index.d.ts`, exit 0:

```
dist/src/browser/index.d.ts
dist/src/core/index.d.ts
dist/src/server/index.d.ts
```

`ls dist/src/*/index.d.cts`, exit 0:

```
dist/src/core/index.d.cts
dist/src/server/index.d.cts
```

`package.json` exports map, per face:
- `.` (core): `import` and `require` conditions — carries `.d.cts`, present.
- `./browser`: `import` only, no `require` condition — ships ES alone, no `.d.cts`, correctly absent.
- `./server`: `import` and `require` conditions — carries `.d.cts`, present.

All three faces' `.d.ts` files are present, and `.d.cts` presence matches each face's `require`-condition status exactly.

## Anomalies

None observed.

## Overall verdict

GREEN — every gate that ran passed, and steps 2 and 3 printed no line.

GATES: GREEN
