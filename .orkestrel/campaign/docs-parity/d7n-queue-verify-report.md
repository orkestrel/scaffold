# Report — d7n-queue-verify

Lane held: verifier queue

## 1. `git rev-parse --short HEAD && git status --short`

Exit: 0

```
1ae3fa1
```

(no untracked/modified files reported by `git status --short`)

## 2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`

Exit: 0

```
0.0.18
```

Confirms the packed head-start tip is installed, matching the standing condition (registry serves `0.0.17`; `package.json` declares `^0.0.17`).

## 3. `npm run format:check`

Exit: 0

```
Checking formatting...

All matched files use the correct format.
Finished in 2845ms on 49 files using 4 threads.
```

## 4. `npm run lint:check`

Exit: 0

```
> @orkestrel/queue@0.0.13 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .

```

(no warnings/errors reported)

## 5. `npm run check`

Exit: 0

```
> @orkestrel/queue@0.0.13 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json

```

(tsc completed with no diagnostics)

## 6. `npm run build`

Exit: 0

```
dist/src/core/index.js  36.11 kB │ gzip: 9.04 kB │ map: 67.25 kB
dist/src/core/index.cjs  36.87 kB │ gzip: 9.17 kB │ map: 67.50 kB

✓ built in 193ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

Anomaly: API Extractor prints `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` — informational, exit code unaffected.

## 7. `npm run docs`

Exit: 0

```
rows read: 1, disagreements found: 0
```

Matches expected exit 0 and the `rows read: <non-zero>, disagreements found: 0` line.

## 8. `PATH=/opt/npm11/bin:$PATH npm test`

Exit: 0

Per-project totals:

- `test:src` (project `src:core`) — Test Files 6 passed (6); Tests 151 passed (151)
- `test:policy` (project `policy`) — Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `test:config` (project `config`) — Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `test:setup` (project `setup`) — Test Files 1 passed (1); Tests 7 passed (7)
- `test:guides` (project `guides`) — Test Files 1 passed (1); Tests 29 passed (29)

Anomaly: the `config` project prints the same API Extractor TypeScript-version notice twice during its test run — informational, exit code unaffected.

## 9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`

`grep -n '"test:distribution"' package.json` confirms the script is declared (line 68), so the command was run.

Exit: 0

```
Test Files  1 passed (1)
      Tests  9 passed (9)
   Duration  14.79s
```

## Anomalies

- API Extractor's TypeScript-6.0.3-newer-than-bundled-compiler notice appears during `npm run build` and during the `config` project's tests. Informational only; every gate exit code is `0`.

GATES: GREEN
