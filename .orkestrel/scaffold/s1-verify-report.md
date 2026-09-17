# Unit S1 — gate report

## `npm run format:check`
Exit code: 0
```
npm notice run oxfmt --config .oxfmtrc.json --check .
Checking formatting...

All matched files use the correct format.
Finished in 4072ms on 224 files using 16 threads.
```

## `npm run lint:check`
Exit code: 0
```
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```

## `npm run check`
Exit code: 0
```
npm notice run tsc --noEmit --project tsconfig.json && npm run check:src
npm notice run check:src:core -> tsc --noEmit -p configs/src/tsconfig.core.json
npm notice run check:src:server -> tsc --noEmit -p configs/src/tsconfig.server.json
npm notice run check:src:bin -> tsc --noEmit -p configs/src/tsconfig.bin.json
```
(no diagnostics emitted by any project)

## `npm run build`
Exit code: 0
```
dist/src/server/index.cjs  193.11 kB | gzip: 48.45 kB | map: 302.87 kB
✓ built in 219ms
dist/bin/main.js  87.29 kB | gzip: 22.65 kB | map: 159.32 kB
✓ built in 29ms
build-host: staged 172 file(s) into dist/host
build-inventory: staged 172 file(s) into host.json
```
Two unrelated API Extractor notices printed ("bundled TypeScript version 5.9.3 ... newer 6.0.3")
during the build; these are informational, not failures.

## `npm test`
Exit code: 0

Per-project test counts:
- `src:core`: Test Files 9 passed (9); Tests 415 passed (415)
- `src:server`: Test Files 5 passed (5); Tests 466 passed | 7 skipped (473)
- `src:bin`: Test Files 3 passed (3); Tests 257 passed (257)
- `policy`: Test Files 1 passed (1); Tests 102 passed (102)
- `config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `setup`: Test Files 3 passed (3); Tests 118 passed | 3 skipped (121)
- `guides`: Test Files 1 passed (1); Tests 23 passed (23)

## `git status --short`
```
 M configs/src/vite.bin.config.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M src/core/compilers.ts
 M src/core/templates.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/templates.test.ts
 M vite.config.ts
?? .orkestrel/scaffold/
```
Note: this status reflects the tree after `npm run build` regenerated `host.json`. The files
listed as modified at session start (`src/bin/errors.ts`, `src/bin/helpers.ts`,
`src/core/compilers.ts`, `src/core/errors.ts`, `src/server/Upstream.ts`,
`src/server/WriteTransaction.ts`, `src/server/helpers.ts`, `tests/distribution.test.ts`) no longer
all appear modified in this run's status — the build/tests appear to have settled `host.json` and
possibly other generated state; report is exact output only, no diagnosis performed (fix nothing,
per brief).

## `git diff --stat host.json`
```
(empty output — no diff against host.json after the build)
```

GATES: GREEN
