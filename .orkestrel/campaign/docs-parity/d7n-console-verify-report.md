Lane held: verifier console

# Gate report — `console` under the `@orkestrel/guide` head start

## 1. `git rev-parse --short HEAD && git status --short`

Exit 0.

```
36ae1b6
```

`git status --short` produced no output: the working tree is clean. No uncommitted edits are present, contrary to the brief's stated standing condition; recorded as read.

## 2. Installed guide version

Exit 0.

```
0.0.18
```

`node_modules/@orkestrel/guide` reports version `0.0.18`, matching the packed-tip head start named in the brief.

## 3. `npm run format:check`

Exit 0.

```
Checking formatting...
All matched files use the correct format.
Finished in 3284ms on 84 files using 4 threads.
```

## 4. `npm run lint:check`

Exit 0.

```
> @orkestrel/console@0.0.13 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 5. `npm run check`

Exit 0. `tsc --noEmit` for the root project, then `check:src:core`, `check:src:browser`, and `check:src:server` each completed with no diagnostics printed.

## 6. `npm run build`

Exit 0. Core, browser, and server builds all completed (`dist/src/core`, `dist/src/browser`, `dist/src/server`), each with its declaration file copied to `.d.cts`. Last lines:

```
> @orkestrel/console@0.0.13 copy
> node -e "..." dist/src/server/index.d.ts dist/src/server/index.d.cts

Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
```

Anomaly (non-fatal, repeated across all three build steps): `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.`

## 7. `npm run docs`

Exit 0.

```
rows read: 1, disagreements found: 0
```

Matches the expected shape: exit 0, one line, non-zero rows read, zero disagreements.

## 8. `PATH=/opt/npm11/bin:$PATH npm test`

Exit 0. Per-project totals:

- `test:src` (`src:core`, `src:browser`, `src:server`) — Test Files 17 passed (17); Tests 638 passed (638).
- `test:policy` — Test Files 1 passed (1); Tests 90 passed | 1 skipped (91).
- `test:config` — Test Files 1 passed (1); Tests 172 passed | 1 skipped (173).
- `test:setup` — Test Files 3 passed (3); Tests 29 passed (29).
- `test:guides` — Test Files 1 passed (1); Tests 94 passed (94).

Anomaly (non-fatal): `test:config` printed the API Extractor version-mismatch notice twice, matching the `npm run build` anomaly.

## 9. `test:distribution`

Present in `package.json` line 88 (`grep -n '"test:distribution"' package.json`). Ran `PATH=/opt/npm11/bin:$PATH npm run test:distribution`.

Exit 0.

```
Test Files  1 passed (1)
     Tests  11 passed | 4 skipped (15)
  Duration  18.07s
```

## Anomalies

- `git status --short` returned empty: the brief's standing condition states the working tree "carries the closing unit's uncommitted edits," but the tree is clean at `36ae1b6`. Recorded as read; not investigated or fixed per role scope.
- API Extractor's bundled TypeScript (5.9.3) vs. project TypeScript (6.0.3) mismatch notice appears during `npm run build` (three times) and during `test:config` (twice). It is an informational notice, not a failure; no command's exit code was affected.

GATES: GREEN
