Lane held: verifier console

# Gate report — `console` under the `@orkestrel/guide` head start

## 1. `git rev-parse --short HEAD && git status --short`

Exit 0. `HEAD` is `36ae1b6`. `git status --short` produced no output — the working tree is clean, contrary to the brief's stated standing condition that it "carries the closing unit's uncommitted edits." Recorded as read.

## 2. Installed guide version

Exit 0. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` returns `0.0.18`, matching the packed-tip head start named in the brief (`package.json` declares `^0.0.17`).

## 3. `npm run format:check`

Exit 0. `All matched files use the correct format.` (84 files, 4 threads).

## 4. `npm run lint:check`

Exit 0. No diagnostics printed.

## 5. `npm run check`

Exit 0. Root `tsc --noEmit`, then `check:src:core`, `check:src:browser`, `check:src:server` all completed with no diagnostics.

## 6. `npm run build`

Exit 0. Core, browser, and server builds all completed; each `.d.ts` was copied to `.d.cts`. Non-fatal anomaly: API Extractor prints `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` in each of the three build steps.

## 7. `npm run docs`

Exit 0. Output: `rows read: 1, disagreements found: 0` — matches the expected shape (non-zero rows read, zero disagreements).

## 8. `PATH=/opt/npm11/bin:$PATH npm test`

Exit 0. Per-project totals:

- `test:src` (`src:core`, `src:browser`, `src:server`) — Test Files 17 passed (17); Tests 638 passed (638).
- `test:policy` — Test Files 1 passed (1); Tests 90 passed | 1 skipped (91).
- `test:config` — Test Files 1 passed (1); Tests 172 passed | 1 skipped (173).
- `test:setup` — Test Files 3 passed (3); Tests 29 passed (29).
- `test:guides` — Test Files 1 passed (1); Tests 94 passed (94).

Non-fatal anomaly: `test:config` repeats the same API Extractor version-mismatch notice seen in `npm run build`.

## 9. `test:distribution`

Script present in `package.json:88`. Ran `PATH=/opt/npm11/bin:$PATH npm run test:distribution`. Exit 0. Test Files 1 passed (1); Tests 11 passed | 4 skipped (15).

## Anomalies

- Working tree clean (no uncommitted edits) despite the brief's standing condition stating otherwise — recorded as read, not investigated further per role scope.
- API Extractor TypeScript-version-mismatch notice (bundled 5.9.3 vs. project 6.0.3) appears repeatedly during `npm run build` and `test:config` — informational, no exit code affected.

Report written to `/home/user/scaffold/tmp/units/d7n-console-verify-report.md`.

GATES: GREEN
