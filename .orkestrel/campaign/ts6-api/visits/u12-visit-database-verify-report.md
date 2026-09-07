# Gate report — U12 fleet-visit-database (phase A)

## 1. `git log --oneline -1` and `git status --short`

Exit 0.

```
dd0114b Align the lint script with the host's shape
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

First command: exit 1, no line (expected).

Second command: exit 0.

```
configs/src/vite.browser.config.ts:1
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1, no line (expected).

## 4. `npx scaffold audit --offline`

Exit 0.

```
0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

## 5. `npm run format:check`

Exit 0.

```
Checking formatting...

All matched files use the correct format.
Finished in 4846ms on 99 files using 4 threads.
```

## 6. `npm run lint:check`

Exit 1 (standing condition per brief — expected red on `tests/setupServer.ts` and `tests/setupServer.test.ts` alone).

```
tests/setupServer.test.ts:1:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
tests/setupServer.test.ts:10:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
tests/setupServer.ts:10:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
tests/setupServer.ts:16:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
```

No file outside `tests/setupServer.ts` and `tests/setupServer.test.ts` appears in the failure. Per the brief, this red does not decide the terminal line.

## 7. `npm run check`

Exit 0.

```
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.browser.json
> tsc --noEmit -p configs/src/tsconfig.server.json
```

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts` where `package.json`'s `exports` map carries a `require` condition

`ls dist/src/*/index.d.ts` — exit 0:

```
dist/src/browser/index.d.ts
dist/src/core/index.d.ts
dist/src/server/index.d.ts
```

`ls dist/src/*/index.d.cts` — exit 0:

```
dist/src/core/index.d.cts
dist/src/server/index.d.cts
```

`package.json` `exports` conditions per face:

- `.` (core): `import` and `require`, both with `types`. Ships `index.d.ts` and `index.d.cts`.
- `./browser`: `import` only, no `require`. Ships `index.d.ts` alone, no `.d.cts` — correct for an ES-only browser face.
- `./server`: `import` and `require`, both with `types`. Ships `index.d.ts` and `index.d.cts`.

The `.d.cts` listing matches exactly the faces that carry a `require` condition.

## Anomalies

- `tests/distribution.test.ts` shows both `D ` (staged deletion) and `??` (untracked) in `git status --short`, meaning a new untracked file with that name sits over a staged deletion of the tracked one. This is the working-tree state as found; no gate command was affected.

GATES: GREEN
