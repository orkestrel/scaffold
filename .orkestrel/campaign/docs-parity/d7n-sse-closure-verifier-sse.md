GATES: RED npm test

## Report — d7n-sse-verify

**Lane held: verifier sse**

### git rev-parse --short HEAD && git status --short
Exit 0. HEAD `7778cff`. `git status --short` produced no output — the working tree is clean, not carrying the closing unit's uncommitted edits the brief describes as the state under verification. Recorded as read; this contradicts the brief's standing condition.

### node -p installed guide version
Exit 0. `0.0.18`.

### npm run format:check
Exit 0.
```
Checking formatting...
All matched files use the correct format.
Finished in 2807ms on 38 files using 4 threads.
```

### npm run lint:check
Exit 0. No output beyond the script header.

### npm run check
Exit 0.
```
> tsc --noEmit -p configs/src/tsconfig.core.json
```

### npm run build
Exit 0.
```
dist/src/core/index.js  12.29 kB │ gzip: 4.38 kB │ map: 21.42 kB
dist/src/core/index.cjs  12.46 kB │ gzip: 4.45 kB │ map: 21.42 kB
✓ built in 91ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

### npm run docs
Exit 0.
```
rows read: 1, disagreements found: 0
```
Matches the brief's expected shape (non-zero rows read, zero disagreements).

### PATH=/opt/npm11/bin:$PATH npm test
Exit 1. Chain is `test:src && test:policy && test:config && test:setup && test:guides`; it stopped after `test:config` failed, so `test:setup` and `test:guides` did not run.

- `test:src` (project `src:core`): 2 files passed, 120 tests passed.
- `test:policy`: 1 file passed, 90 passed | 1 skipped (91).
- `test:config`: 1 file **failed**, 1 failed | 171 passed | 1 skipped (173).
  ```
  FAIL  |config| tests/config.test.ts > configuration helpers > rolls one face into a single declaration and rewrites its core specifier
  AssertionError: expected false to be true // Object.is equality
  - true
  + false
   ❯ tests/config.test.ts:2370:55
      2368|      entry.startsWith('orkestrel-declarations-'),
      2369|     )
      2370|     expect(after.every((entry) => before.has(entry))).toBe(true)
  ```
  Owning file: `/home/user/fleet/sse/tests/config.test.ts:2370`. The assertion checks that no new `orkestrel-declarations-*` scratch entry survives the face-rolling operation; something under test left a leftover scratch entry. Not run to a second iteration here (fixes nothing).
- `test:setup`, `test:guides`: not run (chain aborted at `test:config`).

### PATH=/opt/npm11/bin:$PATH npm run test:distribution
Exit 0. Project `distribution`: 1 file passed, 9 tests passed.

## Anomalies
- The working tree at `/home/user/fleet/sse` was clean (`git status --short` empty) at HEAD `7778cff`, not carrying uncommitted edits as the brief's standing condition states.
- `npm test` failing at `test:config` prevented `test:setup` and `test:guides` from running at all in that invocation; their pass/fail status is unknown from this run.
- API Extractor printed a compiler-version mismatch notice (bundled TypeScript 5.9.3 vs. project TypeScript 6.0.3) during `npm run build` and during `test:config`; it did not affect either exit code.

## Overall verdict
Not GREEN. First place to look: `/home/user/fleet/sse/tests/config.test.ts:2370` (the `test:config` project), which failed inside `npm test` and blocked `test:setup` and `test:guides` from running.

GATES: RED npm test
