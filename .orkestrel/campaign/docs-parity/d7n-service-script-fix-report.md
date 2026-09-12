# Service provisioner ownership implementation

## Outcome

Implemented the accepted `Blueprint.provisioner` design. Target reading now plans an existing exact-case physical `scripts/service.sh` as birth-owned without reconstructing vendor inventory. Vacant-target materialization refuses a selected retention-only provisioner before writing. Vendor-backed generation and selected plans that omit the service artifact retain their prior behavior.

The planted regression remains in place. This implementation phase did not run it or any other behavioral test, as dispatched.

## Owned paths changed

- `src/core/types.ts`
- `src/core/factories.ts`
- `src/core/validators.ts`
- `src/core/compilers.ts`
- `src/core/constants.ts`
- `src/bin/CLI.ts`
- `src/server/types.ts`
- `src/server/Materializer.ts`
- `tests/setup.ts`
- `tests/src/core/factories.test.ts`
- `tests/src/core/validators.test.ts`
- `tests/src/core/parsers.test.ts`
- `tests/src/core/compilers.test.ts`
- `tests/src/bin/CLI.test.ts`
- `tests/src/server/Materializer.test.ts`
- `guides/scaffold.md`
- `tmp/units/d7n-service-script-fix-report.md`

No shared or off-limits path changed.

## Requirement mapping

| Requirement | Owning site |
| --- | --- |
| Required readonly contract field | `src/core/types.ts` |
| Default false and supplied boolean | `src/core/factories.ts`, `tests/src/core/factories.test.ts` |
| Exact closed-record boolean validation | `src/core/validators.ts`, `tests/setup.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/parsers.test.ts` |
| Exact-case physical contained target reading | `src/bin/CLI.ts`, `tests/src/bin/CLI.test.ts` |
| Vendor-backed generation or observed-path retention | `src/core/compilers.ts`, `tests/src/core/compilers.test.ts` |
| Vacant-target retention refusal before writes | `src/server/types.ts`, `src/server/Materializer.ts`, `tests/src/server/Materializer.test.ts` |
| Selected-group and vendor-generation controls | `tests/src/server/Materializer.test.ts` |
| Edited and empty bytes, absence, casing, directory, and real-link controls | `tests/src/bin/CLI.test.ts` |
| Public contract and ownership parity | `src/core/constants.ts`, `guides/scaffold.md` |
| Unrelated tracked script removal | unchanged planted CLI regression and existing removal coverage |

## Red evidence supplied by root

```text
npm run test:src:bin -- tests/src/bin/CLI.test.ts -t "preserves the existing provisioner through target-reading audit and overwrite"

Test Files  1 failed (1)
Tests       1 failed | 135 skipped (136)
action.exit.txt: 1
```

The failure reached the composite assertion. It reported `scripts/service.sh` as foreign and removed, with final provisioner bytes absent.

## Scoped static validation

```text
node_modules/.bin/oxfmt.cmd --check guides/scaffold.md src/bin/CLI.ts src/core/compilers.ts src/core/constants.ts src/core/factories.ts src/core/types.ts src/core/validators.ts src/server/Materializer.ts src/server/types.ts tests/setup.ts tests/src/bin/CLI.test.ts tests/src/core/compilers.test.ts tests/src/core/factories.test.ts tests/src/core/parsers.test.ts tests/src/core/validators.test.ts tests/src/server/Materializer.test.ts
exit 0

node_modules/.bin/oxlint.cmd --deny-warnings src/bin/CLI.ts src/core/compilers.ts src/core/constants.ts src/core/factories.ts src/core/types.ts src/core/validators.ts src/server/Materializer.ts src/server/types.ts tests/setup.ts tests/src/bin/CLI.test.ts tests/src/core/compilers.test.ts tests/src/core/factories.test.ts tests/src/core/parsers.test.ts tests/src/core/validators.test.ts tests/src/server/Materializer.test.ts
exit 0

node_modules/.bin/tsc.cmd --noEmit -p configs/src/tsconfig.core.json
exit 0

node_modules/.bin/tsc.cmd --noEmit -p configs/src/tsconfig.server.json
exit 0

node_modules/.bin/tsc.cmd --noEmit -p configs/src/tsconfig.bin.json
exit 0

git diff --check
exit 0
```

## Actual diffstat

```text
guides/scaffold.md                    |  57 ++++---
src/bin/CLI.ts                        |   8 +-
src/core/compilers.ts                 |  13 +-
src/core/constants.ts                 |   2 +-
src/core/factories.ts                 |   1 +
src/core/types.ts                     |  25 +--
src/core/validators.ts                |   1 +
src/server/Materializer.ts            |  16 +-
src/server/types.ts                   |   4 +
tests/setup.ts                        |  13 +-
tests/src/bin/CLI.test.ts             | 303 +++++++++++++++++++++++++++++++++-
tests/src/core/compilers.test.ts      |  22 ++-
tests/src/core/factories.test.ts      |   5 +-
tests/src/core/parsers.test.ts        |   7 +
tests/src/core/validators.test.ts     |  15 ++
tests/src/server/Materializer.test.ts |  72 ++++++++
16 files changed, 516 insertions(+), 48 deletions(-)
```

The CLI test diff includes the previously planted regression.

## Root settling commands

```text
npm run test:src:bin -- tests/src/bin/CLI.test.ts -t "preserves the existing provisioner through target-reading audit and overwrite"
npm run test:src:core -- tests/src/core/factories.test.ts tests/src/core/validators.test.ts tests/src/core/parsers.test.ts tests/src/core/compilers.test.ts
npm run test:src:server -- tests/src/server/Materializer.test.ts
npm run test:src:bin -- tests/src/bin/CLI.test.ts
npm run test:guides
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
```

Root also owns the registered prove claim/control and final registry pins and release bump.

## Deviations and unknowns

No implementation deviation is known. Behavioral green evidence, guide parity, the prove receipt, and the ordered acceptance gates remain with root by dispatch.
