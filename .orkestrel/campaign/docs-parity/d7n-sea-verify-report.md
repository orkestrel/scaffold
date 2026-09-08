Lane held: verifier sea

# Gate report — sea

## 1. `git rev-parse --short HEAD && git status --short`
Exit: 0
```
76cfbe2
```
`git status --short` produced no output (clean tree).

## 2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
Exit: 0
```
0.0.18
```
Matches the brief's recorded head-start state (`package.json` declares `^0.0.17`; the registry serves `0.0.17`; the packed tip `0.0.18` is installed `--no-save`).

## 3. `npm run format:check`
Exit: 0
```
Checking formatting...
All matched files use the correct format.
Finished in 2947ms on 53 files using 4 threads.
```

## 4. `npm run lint:check`
Exit: 0
```
> @orkestrel/sea@0.0.15 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```
No warnings or errors reported.

## 5. `npm run check`
Exit: 0
```
> @orkestrel/sea@0.0.15 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
```

## 6. `npm run build`
Exit: 0
```
dist/src/server/index.js  96.09 kB │ gzip: 26.46 kB │ map: 182.47 kB
dist/src/server/index.cjs  100.04 kB │ gzip: 26.82 kB │ map: 185.10 kB
✓ built in 271ms
Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
```
Anomaly: API Extractor reports `The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine (5.9.3); consider upgrading API Extractor.` This is a warning, not a failure; the command exits 0.

## 7. `npm run docs`
Exit: 0
```
rows read: 1, disagreements found: 0
```
Matches the expected shape (exit 0, one line, non-zero rows read, zero disagreements).

## 8. `PATH=/opt/npm11/bin:$PATH npm test`
Exit: 0

Per-project totals:
- `src:server`: Test Files 7 passed (7); Tests 190 passed (190)
- `policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `setup`: Test Files 2 passed (2); Tests 23 passed (23)
- `guides`: Test Files 1 passed (1); Tests 37 passed (37)
- `integration`: Test Files 1 passed (1); Tests 4 passed (4)

Anomaly: the `config` project's stdout repeats the same API Extractor version warning seen in command 6 (`TypeScript 6.0.3 ... newer than the bundled compiler engine 5.9.3`), during `tests/config.test.ts > configuration helpers > rolls one face into a single declaration and rewrites its core specifier`. This is stdout noise from the same underlying tool version mismatch, not a test failure; all tests in that project passed.

## 9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
`grep -n '"test:distribution"' package.json` confirms the script is declared (line 68). Ran it.
Exit: 0
```
 Test Files  1 passed (1)
      Tests  9 passed (9)
```

## Anomalies

- API Extractor version-mismatch warning (bundled TypeScript 5.9.3 vs. project TypeScript 6.0.3) surfaces during both `npm run build` (command 6) and the `config` Vitest project inside `npm test` (command 8). It is a tool-version notice, not an error; every gate it appears in still exits 0.

GATES: GREEN
