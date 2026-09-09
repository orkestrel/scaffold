# Scaffold Guide API adoption report

## Outcome

The bounded adoption is complete and frozen for root review. Scaffold now consumes the installed
`GuideCommand` class directly from `@orkestrel/guide/server`. The package-owned entry retains its
substantial assertions and executable examples without retaining local command mechanics or a
named registration wrapper.

## Touched paths

- `tests/guides.test.ts`
- `tests/src/core/compilers.test.ts`
- `guides/scaffold.md`
- `.claude/rules/documentation.md`
- `tmp/units/d7n-scaffold-api-rules-adopt-report.md`

The scoped working diff against checkpoint `bf579f857f628aaa5889443a9c5b669ef5a41f95` includes
accepted predecessor edits that were already dirty in these owned paths:

```text
.claude/rules/documentation.md   |  12 +-
guides/scaffold.md               |  81 ++---
tests/guides.test.ts             | 658 +++++++++++++++-----------------------
tests/src/core/compilers.test.ts | 670 +++++++++++++++++++++++++++------------
4 files changed, 769 insertions(+), 652 deletions(-)
```

## Direct consumer shape

`tests/guides.test.ts` imports `GuideCommand` from the installed public server entry. Its direct
construction passes the workspace URL, `PATTERNS`, `MODULES`, `FENCE_LANGUAGES`,
`EXAMPLE_LANGUAGE`, `readInventory` as `reader`, and `createVitest` as `runner`. Its anonymous
`execute` callback consumes the supplied `root`, `files`, `rows`, and `report` values. It creates no
`Parity`, parses no manifest, runs no second report, and wraps no command operation.

The README pitch remains a Scaffold-owned assertion. The callback reads `README.md` through
`createGuide`, selects `guides/scaffold.md` from the supplied rows, and compares their taglines. The
generic `report.pitch` population remains asserted separately.

The authored rules and guide now state that `GuideCommand` owns argument validation, rewriting,
reporting, and runner lifecycle. They state that the package entry owns its policy and assertions.

## Defect proof

The permanent structural test uses `readStatements`, the repository's TypeScript statement reader.
Its planted source proves that a named function declaration is detected while the direct anonymous
`execute` callback stays outside the prohibited population.

The exact command before removal was:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/compilers.test.ts -t "keeps the package-owned entry free of named local command functions"
```

The red run exited `1`:

```text
Test Files  1 failed (1)
Tests  1 failed | 113 skipped (114)
expected [ 'readWorkspaceInventory', ... ] to strictly equal []
```

The same command after removal exited `0`:

```text
Test Files  1 passed (1)
Tests  1 passed | 113 skipped (114)
```

The red reading named `readWorkspaceInventory`, `readShortName`, `selectPitch`,
`createScaffoldParity`, `reportFindings`, `matchesPassed`, `runGuides`, `raiseExit`, `formatError`,
`main`, and `registerGuides`. The green reading leaves no named function declaration in the entry.

## Preserved controls

The affected control file still drives the real child command through npm. It retains native
`VITEST=false` behavior, read-only default behavior, guide and source authority, summary/example
category separation, first-title and absent-language boundaries, whole-file writes, fresh-byte
assertions, pitch selection and omission, malformed argument refusal before runner startup,
accumulated overlapping changes, missing input refusal, empty-project refusal, unhandled runner
errors, runner test failures, cleanup, and exit precedence.

The added authored-entry control writes a minimal package-owned `tests/guides.test.ts` file into a
real scratch workspace and makes the real guides project load that file. Its passing assertion exits
`0`; its deliberately false assertion exits `1`. This control proves callback assertion
registration rather than project startup observation alone.

The canonical `npm run test:guides` command executes Scaffold's actual assertions through the real
Vitest runner and the installed Guide artifact.

## Scoped validation

The canonical native entry passed:

```text
npm run test:guides

Test Files  1 passed (1)
Tests  22 passed (22)
```

The affected core control file passed:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/compilers.test.ts

Test Files  1 passed (1)
Tests  115 passed (115)
```

The owned core TypeScript scope passed with exit `0` and no diagnostics:

```text
node node_modules/typescript/bin/tsc --noEmit -p configs/src/tsconfig.core.json
```

Scoped lint passed with exit `0` and no diagnostics:

```text
node_modules\.bin\oxlint.cmd --config .oxlintrc.json --deny-warnings tests\guides.test.ts tests\src\core\compilers.test.ts
```

Scoped formatting passed:

```text
node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --check tests\guides.test.ts tests\src\core\compilers.test.ts guides\scaffold.md .claude\rules\documentation.md

All matched files use the correct format.
```

The scoped `git diff --check` command exited `0`. The text-integrity search for `�|Â|Ã` over the
owned product paths exited `1` with no matches.

## Root needs and freeze

Root still owns the separate Astra actual-diff review, the reused objective review, tree-wide gates,
packing, and Git. No shared-file patch is returned. No dependency, package metadata, lockfile, Guide
mirror, host inventory, generated command, or deleted `scripts/docs.ts` state was changed by this
unit.

The source is frozen at the readings in this report. This report makes no acceptance or publication
claim.
