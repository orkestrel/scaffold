# Report — d7n-csv-verify (csv gate sweep)

Lane held: verifier csv

## 1. `git rev-parse --short HEAD && git status --short`

Exit: 0

```
715aed6
 M guides/csv.md
 M src/core/constants.ts
 M tests/guides.test.ts
```

## 2. Installed guide version

`node -p "require('./node_modules/@orkestrel/guide/package.json').version"` → `0.0.18`. Exit: 0.
Matches the brief's recorded head-start state (registry serves `0.0.17`, `package.json` declares `^0.0.17`).

## 3. `npm run format:check`

Exit: 0

```
Checking formatting...
All matched files use the correct format.
Finished in 4335ms on 48 files using 4 threads.
```

## 4. `npm run lint:check`

Exit: 1 (FAIL)

```
src/core/constants.ts:6:50: error eslint(no-irregular-whitespace): Unexpected irregular whitespace help: Try to remove the irregular whitespace
```

`src/core/constants.ts` line 6 is a doc comment naming the UTF-8 byte-order-mark character literal
(`'M-oM-;M-?'` in `cat -A` form — the literal BOM bytes embedded in the doc-comment string). Oxlint's
`no-irregular-whitespace` rule flags that embedded character. This is a modified file per `git
status`, so it is part of the working tree under verification.

## 5. `npm run check`

Exit: 0

```
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
```
No diagnostics reported by either `tsc` invocation.

## 6. `npm run build`

Exit: 0

```
dist/src/core/index.js  55.82 kB │ gzip: 16.13 kB │ map: 84.74 kB
dist/src/core/index.cjs  57.62 kB │ gzip: 16.38 kB │ map: 85.07 kB
✓ built in 351ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
API Extractor logged an informational notice: bundled TypeScript 5.9.3 is older than the project's
TypeScript 6.0.3. Non-fatal; build exited 0.

## 7. `npm run docs`

Exit: 0

```
rows read: 1, disagreements found: 0
```
Matches the brief's expected shape (non-zero rows read, zero disagreements).

## 8. `PATH=/opt/npm11/bin:$PATH npm test`

Exit: 1 (FAIL) — chain is `test:src && test:policy && test:config && test:setup && test:guides`; it
stopped at `test:config`, so `test:setup` and `test:guides` did not run.

Per-project totals as read:

- `test:src` (project `src:core`): Test Files 7 passed (7); Tests 239 passed (239). Duration 1.01s.
- `test:policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91). Duration 772ms.
- `test:config`: Test Files 1 failed (1); Tests 1 failed | 171 passed | 1 skipped (173). Duration 4.96s.
  Failing test: `tests/config.test.ts > configuration helpers > rolls one face into a single
  declaration and rewrites its core specifier`, at `tests/config.test.ts:2370:55`:

  ```
  AssertionError: expected false to be true // Object.is equality
  - Expected
  + Received
  - true
  + false
   ❯ tests/config.test.ts:2370:55
      expect(after.every((entry) => before.has(entry))).toBe(true)
  ```
  The assertion compares a directory listing of `orkestrel-declarations-*` scratch entries before and
  after an operation; this reads as a filesystem-scratch-tree timing sensitivity in a whole-suite
  run, per the brief's standing condition. Reported as read; not investigated or fixed. The
  Orchestrator re-runs `tests/config.test.ts` alone to confirm.
- `test:setup`: not run (chain stopped before it).
- `test:guides`: not run (chain stopped before it).

## 9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`

Script is present (`package.json:66`). Exit: 0.

```
Test Files  1 passed (1)
     Tests  9 passed (9)
  Duration  15.55s
```

## Anomalies

- `npm test` stopped at `test:config` on a directory-listing assertion that reads as scratch-tree
  timing sensitivity; `test:setup` and `test:guides` were not reached and carry no reading here.
- API Extractor's TypeScript-version notice during `npm run build` is informational and did not
  affect the exit code.

GATES: RED npm run lint:check, npm test

