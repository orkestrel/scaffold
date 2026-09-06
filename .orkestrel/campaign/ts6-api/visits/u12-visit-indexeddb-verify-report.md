# Gate report — U12 fleet-visit-indexeddb (phase A)

Run from `/home/user/fleet/indexeddb`.

## 1. `git log --oneline -1` and `git status --short`

Exit: 0 / 0

```
8d8216b Align the lint script with the host's shape
```

`git status --short` printed no lines (clean tree).

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` (expected no line) and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

Exit: 0 / 1

```
package.json:85:		"vite-plugin-dts": "^5.1.0",
configs/src/vite.browser.config.ts:2:import dts from 'vite-plugin-dts'
configs/src/vite.browser.config.ts:5:// vite-plugin-dts rolls this face into one declaration, and the roll-up reaches
```

This step printed lines where none were expected.

`declarationRollup(` count: `0` (grep exit 1, no matches).

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"` (expected no line)

Exit: 1 (no match — matches the expectation, no line printed)

## 4. `npx scaffold audit --offline`

Exit: 1

```
┌────────────────────────────────────┬─────────┬───────┐
│ path                               │ group   │ drift │
├────────────────────────────────────┼─────────┼───────┤
│ vite.config.ts                     │ configs │ stale │
│ configs/src/vite.browser.config.ts │ configs │ stale │
│ configs/helpers.ts                 │ configs │ stale │
│ configs/policy.ts                  │ configs │ stale │
│ .oxlintrc.json                     │ configs │ stale │
│ tests/setupPolicy.ts               │ tests   │ stale │
│ tests/policy.test.ts               │ tests   │ stale │
│ tests/config.test.ts               │ tests   │ stale │
└────────────────────────────────────┴─────────┴───────┘
8 of 36 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 7.
```

## 5. `npm run format:check`

Exit: 0

```
Checking formatting...

All matched files use the correct format.
Finished in 2967ms on 53 files using 4 threads.
```

## 6. `npm run lint:check`

Exit: 0

```
> @orkestrel/indexeddb@0.0.10 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings or errors printed)

## 7. `npm run check`

Exit: 0

```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:browser
> tsc --noEmit -p configs/src/tsconfig.browser.json
```
(no diagnostics printed)

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`

Exit: 2

```
ls: cannot access 'dist/src/*/index.d.cts': No such file or directory
dist/src/browser/index.d.ts
```

## Anomalies

- Step 4 (`scaffold audit --offline`) exited 1 with 8 drifted paths; this is a red gate but outside the pair the terminal line is scoped to.

GATES: RED grep -rn "vite-plugin-dts" package.json configs/src
