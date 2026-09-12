# Service proof fixture correction

## Outcome

Corrected only the successor brief's test fixtures. Product behavior, release files, the planted regression, and unrelated assertions remain unchanged.

## Changed sites

- `tests/src/core/validators.test.ts` now imports the existing `buildBlueprint` fixture used by the provisioner guard case.
- `tests/src/server/Materializer.test.ts` gives the vendor-generation case the existing `WORKSPACE_ROOT` raw host. The written-path assertion now requires membership of `SERVICE_SCRIPT_PATH` without claiming exclusive orchestration output.
- `tests/src/bin/CLI.test.ts` expects drift for absent, empty-file, and directory observations against `createFleet`. Each observation requires a missing orchestration finding as its exit witness. The wrong-case foreign record no longer invents `ownership`.
- `tmp/units/d7n-service-script-fixture-correction-report.md` records this correction.

## Exact fixture delta

```text
validators.test.ts
  import buildBlueprint from the existing setup fixture module

Materializer.test.ts vendor-generation case
  host: empty scratch directory -> WORKSPACE_ROOT
  written: exact service-only list -> contains SERVICE_SCRIPT_PATH

CLI.test.ts focused cases
  absent exit: EXIT_CLEAN -> EXIT_DRIFT
  empty-file exit: EXIT_CLEAN -> EXIT_DRIFT
  directory exit: EXIT_CLEAN -> EXIT_DRIFT
  absent, empty-file, directory: require group orchestration with drift missing
  wrong-case foreign expectation: remove ownership
```

## Scoped static checks

```text
node_modules/.bin/oxfmt.cmd --check tests/src/core/validators.test.ts tests/src/server/Materializer.test.ts tests/src/bin/CLI.test.ts
exit 0

node_modules/.bin/oxlint.cmd --deny-warnings tests/src/core/validators.test.ts tests/src/server/Materializer.test.ts tests/src/bin/CLI.test.ts
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

No behavioral test ran in this correction phase. No green result is inferred.

## Root settling commands

```text
npm run test:src:core -- tests/src/core/factories.test.ts tests/src/core/validators.test.ts tests/src/core/parsers.test.ts tests/src/core/compilers.test.ts
npm run test:src:server -- tests/src/server/Materializer.test.ts
npm run build
npm run test:src:bin -- tests/src/bin/CLI.test.ts
```

The root-owned release edits, guide parity, prove receipt, and ordered acceptance gates remain outstanding.

## Deviations

No scope or contract deviation is known.
