Lane held: verifier guide

1. `git rev-parse --short HEAD && git status --short` — exit 0
```
c25c689
 M README.md
 M guides/guide.md
```

2. `npm run format:check` — exit 0
```
Checking formatting...
All matched files use the correct format.
Finished in 3061ms on 81 files using 4 threads.
```

3. `npm run lint:check` — exit 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no further output; clean)

4. `npm run build && npm run docs` — exit 0 (build) / exit 0 (docs)
```
✓ built in 822ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
> node --experimental-strip-types scripts/docs.ts
rows read: 1, disagreements found: 0
```
Matches brief's expected `rows read: 1, disagreements found: 0`. Anomaly (non-blocking, not a failure): API Extractor prints `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` during `build`.

5. `npm run test:guides` — exit 0
```
 Test Files  1 passed (1)
      Tests  54 passed (54)
```

6. `npm run test:policy` — exit 0
```
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
```

Per-project totals: guides — 54 passed (54); policy — 90 passed, 1 skipped (91).

Anomalies: `npm run build` emits an API Extractor compiler-version mismatch notice (bundled TypeScript 5.9.3 vs project TypeScript 6.0.3); it did not affect the exit code or the docs command's expected output.

GATES: GREEN