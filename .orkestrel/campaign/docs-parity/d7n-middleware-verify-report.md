# Report — d7n-middleware-verify

Lane held: verifier middleware

Commands run from `/home/user/fleet/middleware`, each read from `$?`.

## 1. `git rev-parse --short HEAD && git status --short`

Exit 0.

```
5747e3f
```

`git status --short` produced no output (clean tree).

## 2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`

Exit 0.

```
0.0.18
```

Matches the brief's recorded standing condition: the packed tip `0.0.18` is installed while the registry serves `0.0.17` and `package.json` declares `^0.0.17`.

## 3. `npm run format:check`

Exit 0.

```
Checking formatting...
All matched files use the correct format.
Finished in 6565ms on 70 files using 4 threads.
```

## 4. `npm run lint:check`

Exit 0.

```
> oxlint --config .oxlintrc.json --deny-warnings .
```

No warnings or errors reported.

## 5. `npm run check`

Exit 0.

```
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
```

No diagnostics emitted by any project.

## 6. `npm run build`

Exit 0.

```
dist/src/core/index.js  73.70 kB │ gzip: 19.56 kB │ map: 113.74 kB
dist/src/core/index.cjs  78.50 kB │ gzip: 19.98 kB │ map: 115.62 kB
✓ built in 625ms
dist/src/server/index.js  53.46 kB │ gzip: 16.44 kB │ map: 84.05 kB
dist/src/server/index.cjs  55.72 kB │ gzip: 16.67 kB │ map: 84.95 kB
✓ built in 425ms
Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
```

API Extractor logged its standing notice that the bundled TypeScript version (5.9.3) is older than the project's installed TypeScript (6.0.3); this is advisory only and did not change the exit code.

## 7. `npm run docs`

Exit 0, matching the expected shape.

```
rows read: 1, disagreements found: 0
```

## 8. `PATH=/opt/npm11/bin:$PATH npm test`

Exit 0. Per-project totals:

| Project     | Test files  | Tests                    |
| ----------- | ----------- | ------------------------ |
| src (core+server) | 11 passed | 432 passed \| 1 skipped (433) |
| policy      | 1 passed    | 90 passed \| 1 skipped (91) |
| config      | 1 passed    | 172 passed \| 1 skipped (173) |
| setup       | 2 passed    | 36 passed (36)            |
| guides      | 1 passed    | 43 passed (43)             |

## 9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`

Script is present (`grep -n '"test:distribution"' package.json` matched line 84). Exit 0.

```
Test Files  1 passed (1)
     Tests  11 passed (11)
```

## Installed guide version

`0.0.18` (packed tip, `--no-save`; registry serves `0.0.17`, `package.json` declares `^0.0.17`).

## Anomalies

None observed. All commands ran clean on the first attempt; no reruns or flakes.

GATES: GREEN
