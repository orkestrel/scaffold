## Population found and where each moved

Re-ran the search over every `tests/**/*.test.ts` file for a module-level `const` declaration whose initializer is an array or object literal of data. The Orchestrator's list matched exactly except for the additions noted below.

Moved to `tests/setupBrowser.ts`, exported and frozen:
- `tests/src/browser/helpers.test.ts`: `VARIANTS`, `IMPLICIT_ROLE_CASES`, `FIELD_ROLE_CASES`.
- `tests/src/browser/factories.test.ts`: `STATES`. Its `VARIANTS` carried the same rows as `helpers.test.ts`'s `VARIANTS`, so both files now import the one export from `setupBrowser.ts`.

Moved to `tests/setupServer.ts`, exported and frozen:
- `tests/src/server/helpers.test.ts`: `TEMPORARY_VARIABLES`, `FOREIGN_ROOT_SPELLINGS`, and `HOST_PROBES` (its own TSDoc names it "a case matrix rather than test registration", the exact phrase `.claude/rules/tests.md` uses — the Orchestrator's evidence list missed this one).

Moved to `tests/setup.ts`, exported and frozen:
- `tests/distribution.test.ts`: `PING`, `MODULE_EXTENSIONS`, `DECLARATION_EXTENSIONS`, `RESOLUTIONS`, `FORMATS`, plus `RUNTIME_CONDITIONS`, `BUNDLER_CONDITIONS`, and `DECLARATION_CONDITIONS` (the Orchestrator's evidence list missed these three condition tables; they are pure string-array config data in the same domain as `RESOLUTIONS`). The `Resolution` interface and `Format` type that type `RESOLUTIONS` moved with it, since the constant's declared type has to live where the constant does; both stay exported and are still used locally in `tests/distribution.test.ts` for `selectDrivers` and its neighbors.
- `tests/guides.test.ts`: `FENCE_LANGUAGES`, `MODULES`, `INTERNAL` (the last two were missed by the Orchestrator's list).

Found but excluded from the population, reported rather than moved:
- `tests/src/browser/factories.test.ts`: `DISCLOSURE_SCENARIOS`, `MISMATCHED_SCENARIOS`, `MIXED_SCENARIOS`, `EMPTY_SCENARIOS`.
- `tests/src/core/helpers.test.ts`: `DISCLOSURE_SCENARIOS`, `MISMATCHED_SCENARIOS`, `REFUSED_SCENARIO`, `REFUSAL`.

Each of these scenario tables holds `arrange`/`act`/`assert` functions (or, for `REFUSAL`, a thrown fixture) bound to a class and functions the same test file defines locally (`Disclosure`, `arrangeDisclosure`, `actOnDisclosure`, `assertDisclosure`, `buildDisclosure` in `core/helpers.test.ts`; the browser-verb equivalents in `factories.test.ts`). Moving the data without the behavior it calls is impossible, and moving the behavior is outside "the edits" section's scope (declarations, not functions or classes). These read as test-local scenario fixtures rather than portable data tables.

For `IMPLICIT_ROLE_CASES` and `FIELD_ROLE_CASES`, the existing "expectations are written out rather than read back" comment moved into the setup module's TSDoc rather than staying in the test file, per the brief.

## Gate results

- `npx oxfmt --write tests/setup.ts tests/setupBrowser.ts tests/setupServer.ts tests/distribution.test.ts tests/guides.test.ts tests/src/browser/helpers.test.ts tests/src/browser/factories.test.ts tests/src/server/helpers.test.ts` — reformatted `tests/setupBrowser.ts` on the first pass; clean on rerun.
- `npm run format:check` — `All matched files use the correct format.` (60 files)
- `npm run lint:check` — clean, no output (0 errors after fixing a `no-malformed-summary` violation on each moved TSDoc opening and an unused `BUNDLER_CONDITIONS` import).
- `npm run check` — `tsc --noEmit --project tsconfig.json && npm run check:src` (core, browser, server projects) — 0 errors. Fixed by giving `Object.freeze` an explicit tuple type argument for `FORMATS` and `HOST_PROBES`'s nested tuples, since a bare `Object.freeze([...])` call infers `readonly string[]` rather than the declared tuple type.
- `npm run test:setup` — `Test Files 2 passed (2)`, `Tests 21 passed (21)` (covers `tests/setup.test.ts` and `tests/setupServer.test.ts`; neither enumerates its module's exports by a list that needed extending).
- `npm run test:setup:browser` — `Test Files 1 passed (1)`, `Tests 6 passed (6)` (covers `tests/setupBrowser.test.ts`).
- `npm run test:src` (runs `src:core`, `src:browser`, `src:server`, the projects the moved tables serve) — `Test Files 7 passed (7)`, `Tests 661 passed | 2 expected fail | 8 skipped (671)`. The console `[Unhandled error] Error: Boom` / `Error: Ignored` lines are `factories.test.ts`'s own fixture assertions dispatching synthetic `ErrorEvent`s, not failures.
- `npm run test:guides` — red, for a cause outside these edits: `Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/user/test-tm/dist/src/server/index.js'`. `tests/guides.test.ts` imports `readInventory` from `@orkestrel/test/server`, which resolves through the package's exports map to `dist/src/server/index.js`, and this checkout has no `dist/` built. This is a build-artifact prerequisite, not a defect in the moved `FENCE_LANGUAGES`/`MODULES`/`INTERNAL` exports; `builder`'s permission floor bars running `build` here. Flagging per the deviation contract rather than working around it.

## Status

`git status --porcelain` in `/home/user/test-tm`:
```
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/setupBrowser.ts
 M tests/setupServer.ts
 M tests/src/browser/factories.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/server/helpers.test.ts
```

All within owned scope; no off-limits file touched.

## Deviation

`npm run test:guides` is red for the missing `dist/` build, outside these edits' cause. Recommend a `build` step (which `builder`'s permission floor bars here) before re-running that gate, or confirming the checkout is expected to carry no `dist/` at this point in the campaign.
