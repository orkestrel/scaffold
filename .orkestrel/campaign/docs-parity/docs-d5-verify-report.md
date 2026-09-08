Lane held: verifier

# Gate report — D5 scaffold-seed verify (docs-parity)

## 1. `grep -n "scripts/docs.ts" src/core/constants.ts src/core/compilers.ts package.json host.json`
Exit 0. Matches found in all four files: `HOST_PATHS` row (`src/core/constants.ts:140`), the emission logic (`src/core/compilers.ts:351,1594,1600`), the manifest script (`package.json:81`), and the staged entry (`host.json:706-707`).

## 2. `grep -n "^import" scripts/docs.ts`
Exit 0. Imports are `@orkestrel/guide` (type-only) and `node:fs`, `node:path`, `node:process`. No other specifier.

## 3. `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -5`
Exit 0. Non-empty; the head start package is present. Matches include `locateComment`, `findDrift`, and `tagline` references at lines 154, 826, 915, 928, 930.

## 4. `npm run format:check`
Exit 0. "All matched files use the correct format." (223 files).

## 5. `npm run lint:check`
Exit 0. No output; clean.

## 6. `npm run check`
Exit 0. `tsc --noEmit` for root, `src/core`, `src/server`, and `src/bin` projects all clean.

## 7. `npm run test:src:core`
Exit 0. Test Files 9 passed (9); Tests 397 passed (397).

## 7a. `npm run test:src:server`
Exit 0. Test Files 5 passed (5); Tests 432 passed (432).

## 7b. `npm run test:config`
Exit 0. Test Files 1 passed (1); Tests 172 passed | 1 skipped (173).

## 8. `npm run test:src:core -- --reporter=verbose 2>&1 | grep -c "the documentation seed"`
Count: 9. Step 7's exit code (0) carries this reading.

## 9. `npm run test:policy`
Exit 0. Test Files 1 passed (1); Tests 91 passed (91).

## 10. `npm run build`
Exit 0. `clean`, `build:src:core`, `build:src:server`, `build:src:bin`, `build:host` (122 files staged), `build:inventory` (122 files staged) all completed.

## 11. `sha256sum host.json && npm run build:inventory && sha256sum host.json`
Both digests: `8f4e1b6214c701cd23c3d1fd0607f4fed0a7cc06de434bf767d8b446a3d8c1e9`. Same before and after. Exit 0.

## 11a. `node dist/bin/main.js audit --groups configs --offline; echo EXIT $?`
Output: "0 of 17 planned paths drifted from the plan. Audit compared bytes at 16, existence at 1, and nothing at 0." EXIT 0.

## 11b. `grep -n "cannot depend on itself" .claude/rules/workspace.md; grep -c "@orkestrel/scaffold" tsconfig.json`
First grep: no output (nothing found), as expected. Second grep: `2`, as expected.

## 12. `npm run test:guides`
Exit 1. Test Files 1 failed (1); Tests 2 failed | 17 passed (19).
Failing cases, exactly the two named as expected:
- `guides > keeps every compared summary and example equal to its source` — `AssertionError: expected [ Array(1) ] to deeply equal []`, at `tests/guides.test.ts:175`.
- `guides > opens the README with the guide tagline` — `AssertionError: expected undefined not to be undefined`, at `tests/guides.test.ts:187`.
Every other case in the file (17) passed. Per the standing conditions, this reading is GREEN.

## 13. `npm run test:distribution`
Exit 1. Test Files 1 failed (1); Tests 2 failed | 3 passed (5).
Failing cases:
- `installed package consumer > stages exactly the declared vendored host inventory` — `AssertionError: expected false to be true`, at `tests/distribution.test.ts:293`.
- `installed package consumer > installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]` — `AssertionError: expected 1 to be +0`, at `tests/distribution.test.ts:908`.
The brief names no expected-red reading for this step (unlike step 12), and the standing conditions cover only a timing failure, re-run alone by the Orchestrator, not an assertion failure. This exit code is read as RED.

## 14. `node --experimental-strip-types scripts/docs.ts > tmp/units/docs-d5-verify-seed-run.txt 2>&1; echo EXIT $?`
EXIT 1, as expected (observation, GREEN at exit 1).
First 5 lines: drift rows for `type Artifact`, `type BuildFormat`, `type CatalogEntry`, `type CompileStage`, `type CompilerEventMap`, each in `guides/scaffold.md`.
Last 5 lines: drift rows for `WriteTransaction.remove`, `WriteTransaction.commit`, `WriteTransaction.discard`, the README pitch/tagline mismatch line, and the summary `rows read: 1, disagreements found: 316`.

## 15. `node --experimental-strip-types scripts/docs.ts --to nowhere; echo EXIT $?`
One usage line: `usage: npm run docs [-- --to guide|--to source]`. EXIT 2, as expected.

## 16. `git status --short`
```
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M guides/scaffold.md
 M host.json
 M package.json
 M src/core/Compiler.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M tests/guides.test.ts
 M tests/setupServer.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

GATES: RED npm run test:distribution
