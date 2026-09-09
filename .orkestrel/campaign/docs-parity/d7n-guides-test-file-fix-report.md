# Guides test-file entry correction

## Outcome

Implemented the accepted direct-entry design in canonical scaffold. `tests/guides.test.ts` now owns native argument validation, explicit Guide rewrites, unresolved-drift reporting, public Vitest startup and the unchanged worker assertions. Default invocation starts only the guides project. The worker branch reads no direction and writes nothing.

Removed the untracked `scripts/guides.ts` candidate. Removed `GUIDES_ENTRY_PATH` and its host membership. Manifest generation now points `test:guides` at `GUIDES_TEST_PATH`. Kept the released Vitest command as the accepted predecessor. Kept the exact `scripts/docs.ts` retirement metadata unchanged.

Retargeted the real-command fixture to copy the actual test file. Its synthetic guides project collects `tests/fixture.test.ts`. The child process removes the inherited `VITEST` variable so it exercises native mode, matching a direct npm invocation. The guide-direction control now requires full summary and titled-fence replacement.

## Touched paths

- `.claude/rules/documentation.md`
- `guides/scaffold.md`
- `package.json` (`test:guides` only in this unit)
- `src/core/compilers.ts`
- `src/core/constants.ts`
- `tests/distribution.test.ts`
- `tests/guides.test.ts`
- `tests/src/core/compilers.test.ts`
- `tests/src/core/helpers.test.ts`
- `tests/src/server/helpers.test.ts`
- `tmp/units/d7n-guides-test-file-fix-report.md`

The removed `scripts/guides.ts` was an untracked predecessor candidate, so Git records its absence without a deletion diff.

## Permanent regression

Command before and after:

```text
node ./node_modules/vitest/vitest.mjs run tests/src/core/compilers.test.ts --config vite.config.ts --no-cache --reporter=verbose --project src:core -t "runs the package-owned guides proof only when selected"
```

Red: exit 1. Vitest reported `Test Files 1 failed (1)` and `Tests 1 failed | 108 skipped (109)`. The assertion at `tests/src/core/compilers.test.ts:1807` expected the planned host artifact paths not to contain `scripts/guides.ts` and received that retired path.

Green: exit 0. Vitest reported `Test Files 1 passed (1)` and `Tests 1 passed | 108 skipped (109)`.

## Scoped validation

- Real-command fixture: `node ./node_modules/vitest/vitest.mjs run tests/src/core/compilers.test.ts --config vite.config.ts --no-cache --reporter=verbose --project src:core -t "the guides entry"` exited 0. Vitest reported `Test Files 1 passed (1)` and `Tests 11 passed | 98 skipped (109)`.
- Direct package proof: `npm run test:guides` exited 0. Vitest reported `Test Files 1 passed (1)` and `Tests 20 passed (20)`.
- Core source typecheck: `npm run check:src:core` exited 0.
- Scoped Oxlint over the owned TypeScript paths exited 0 with warnings denied.
- Scoped Oxfmt check over the owned paths exited 0.
- `git diff --check` exited 0.
- Stale-reference search found only root-owned generated `host.json` entries and negative regression assertions for `scripts/guides.ts`.

## Deviations and root work

The required Probe call did not run its case. The MCP transport returned: `Legacy protocol 2025-11-25 cannot represent a stream result`. The permanent regression and real-command process fixture supply the executable proof for this unit. Do not reopen dependency or transport work in this correction.

Root must regenerate `host.json`, run the product-tree gate chain, inspect any generated snapshots, and obtain independent acceptance. No package install, dependency edit, lockfile edit, commit or push ran in this unit.
