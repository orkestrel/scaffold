# Report — P.4 `d7n-reason-verify` (reason's whole chain under the guide head start)

Lane held: verifier reason

## Command 1 — `git rev-parse --short HEAD && git status --short`

Exit 0.

```
7bcc7f5
```

`git status --short` produced no output: the working tree is clean. The brief's standing condition states the tree carries the closing unit's uncommitted edits; the tree read clean at verification time instead. Recorded as an anomaly, not corrected.

## Command 2 — installed guide version

Exit 0.

```
0.0.18
```

Matches the brief's recorded head-start state (packed tip `0.0.18`, `package.json` declares `^0.0.17`).

## Command 3 — `npm run format:check`

Exit 0.

```
Checking formatting...

All matched files use the correct format.
Finished in 3565ms on 80 files using 4 threads.
```

## Command 4 — `npm run lint:check`

Exit 0. No warnings or errors reported.

## Command 5 — `npm run check`

Exit 0. No diagnostics emitted (`tsc --noEmit --project tsconfig.json` then `tsc --noEmit -p configs/src/tsconfig.core.json`).

## Command 6 — `npm run build`

Exit 0.

```
✓ 27 modules transformed.
dist/src/core/index.js  240.97 kB │ gzip: 51.52 kB │ map: 384.23 kB
✓ built in 731ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

The `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine` line is an informational API Extractor notice; build still exited 0.

## Command 7 — `npm run docs`

Exit 0.

```
rows read: 1, disagreements found: 0
```

Matches the expected shape.

## Command 8 — `PATH=/opt/npm11/bin:$PATH npm test`

Exit 0. Per-project totals:

- `src:core` — Test Files 23 passed (23); Tests 1203 passed (1203).
- `policy` — Test Files 1 passed (1); Tests 90 passed | 1 skipped (91).
- `config` — Test Files 1 passed (1); Tests 172 passed | 1 skipped (173).
- `setup` — Test Files 1 passed (1); Tests 26 passed (26).
- `guides` — Test Files 1 passed (1); Tests 97 passed (97).

## Command 9 — `test:distribution`

Present in `package.json` at line 66. Ran `PATH=/opt/npm11/bin:$PATH npm run test:distribution`.

Exit 0.

```
Test Files  1 passed (1)
     Tests  9 passed (9)
  Duration  13.95s
```

## Anomalies

- The working tree read clean (`git status --short` empty) at verification time, where the brief's standing condition expected uncommitted edits from the closing unit. No other divergence from the brief observed.

Report written to `/home/user/scaffold/tmp/units/d7n-reason-verify-report.md`.

GATES: GREEN
