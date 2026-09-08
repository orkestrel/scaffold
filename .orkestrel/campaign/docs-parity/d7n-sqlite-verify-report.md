# Report — `d7n-sqlite-verify` (sqlite whole chain under the guide head start)

Lane held: verifier sqlite

## 1. `git rev-parse --short HEAD && git status --short`

Exit: 0

```
691d024
 M guides/sqlite.md
 M tests/guides.test.ts
```

## 2. Installed `@orkestrel/guide` version

Exit: 0

```
0.0.18
```

## 3. `npm run format:check`

Exit: 0

```
Checking formatting...

All matched files use the correct format.
Finished in 1849ms on 44 files using 4 threads.
```

## 4. `npm run lint:check`

Exit: 0

```
> @orkestrel/sqlite@0.0.11 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .

(no findings)
```

## 5. `npm run check`

Exit: 0

```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
(clean)
```

## 6. `npm run build`

Exit: 0

```
dist/src/server/index.js  11.97 kB │ gzip: 4.19 kB │ map: 22.25 kB
dist/src/server/index.cjs  12.33 kB │ gzip: 4.28 kB │ map: 22.30 kB
✓ built in 156ms
Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
```

Anomaly (non-blocking, informational only): API Extractor printed
`*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.`

## 7. `npm run docs`

Exit: 0

```
rows read: 1, disagreements found: 0
```

## 8. `PATH=/opt/npm11/bin:$PATH npm test`

Exit: 0

Per-project totals:

- `test:src` (project `src:server`): Test Files 4 passed (4); Tests 53 passed (53)
- `test:policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `test:config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `test:setup`: Test Files 2 passed (2); Tests 9 passed (9)
- `test:guides`: Test Files 1 passed (1); Tests 36 passed (36)

Same API Extractor version-mismatch notice repeated during `test:config` (non-blocking, informational).

## 9. `test:distribution`

`grep -n '"test:distribution"' package.json` found the script at line 66, so it was run.

Exit: 0

```
PATH=/opt/npm11/bin:$PATH npm run test:distribution
Test Files  1 passed (1)
Tests  9 passed (9)
```

## Anomalies

- API Extractor logs a TypeScript version-mismatch informational notice (bundled 5.9.3 vs. project 6.0.3) during `npm run build` and during `test:config`'s `docs`-driven analysis path. It does not affect exit codes or reported counts.
- `git status --short` shows uncommitted edits to `guides/sqlite.md` and `tests/guides.test.ts`, matching the brief's stated closing-unit state under verification.

GATES: GREEN
