Lane held: verifier brief

# Report — d7n-brief-verify

## Repository state
- `git rev-parse --short HEAD`: `3849b1d`
- `git status --short`: empty (clean tree)
- exit 0

## Installed guide version
- `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` → `0.0.18`, exit 0. Confirms the standing condition: the packed tip `0.0.18` is installed `--no-save` while `package.json` still declares `^0.0.17`.

## Commands, exit codes, last lines

**3. `npm run format:check`** — exit 0
```
All matched files use the correct format.
Finished in 3711ms on 54 files using 4 threads.
```

**4. `npm run lint:check`** — exit 0 (no warnings or errors reported)

**5. `npm run check`** — exit 0 (`tsc --noEmit --project tsconfig.json` and the `check:src`/`check:src:core` chain completed with no diagnostics)

**6. `npm run build`** — exit 0
```
dist/src/core/index.js  87.15 kB │ gzip: 24.29 kB │ map: 142.12 kB
dist/src/core/index.cjs  92.51 kB │ gzip: 24.77 kB │ map: 144.43 kB
✓ built in 272ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
Anomaly (non-fatal): API Extractor prints `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` No effect on exit code.

**7. `npm run docs`** — exit 0
```
rows read: 1, disagreements found: 0
```

**8. `PATH=/opt/npm11/bin:$PATH npm test`** — exit 0. Per-project totals:

| Vitest project | Test files | Tests |
| --- | --- | --- |
| `src:core` | 10 passed (10) | 281 passed (281) |
| `policy` | 1 passed (1) | 90 passed \| 1 skipped (91) |
| `config` | 1 passed (1) | 172 passed \| 1 skipped (173) |
| `setup` | 1 passed (1) | 27 passed (27) |
| `guides` | 1 passed (1) | 39 passed (39) |

The `config` project re-emits the same API Extractor TypeScript-version notice; no effect on exit code.

**9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`** — script present (`grep -n '"test:distribution"' package.json` line 63, exit 0). Ran it: exit 0.
```
Test Files  1 passed (1)
     Tests  9 passed (9)
  Duration  17.65s
```

## Anomalies
- API Extractor TypeScript-version notice (bundled 5.9.3 vs. project 6.0.3) appears in `npm run build` and the `config` Vitest project; informational only, no exit-code impact.
- No timing failures, flakes, or cache irregularities observed on this single run of any command.

Full report written to `/home/user/scaffold/tmp/units/d7n-brief-verify-report.md`.

GATES: GREEN
