# Service provisioner regression phase

## Touched paths

- `tests/src/bin/CLI.test.ts`
- `tmp/units/d7n-service-script-regression-report.md`

The named CLI case creates a vendorless target, confirms that the target starts without
`scripts/service.sh`, adds and commits an edited provisioner beside retired docs and custom scripts,
then drives target-reading audit and overwrite without the `--dirty` option. It collects the initial
foreign paths, removed paths, final provisioner bytes, overwrite terminal audit, and a fresh audit
before the composite assertion. Every parsed command result is held as `unknown` and narrowed with
the installed Contract guards before the test reads it.

## Settling command

```text
npm run test:src:bin -- tests/src/bin/CLI.test.ts -t "preserves the existing provisioner through target-reading audit and overwrite"
```

Root must run this command before production changes and retain its failing result. This phase did
not run the test.

## Scoped checks

```text
node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --check tests/src/bin/CLI.test.ts
exit 0

node_modules/.bin/oxlint.cmd --config .oxlintrc.json --deny-warnings tests/src/bin/CLI.test.ts
exit 0

node_modules/.bin/tsc.cmd --noEmit -p configs/src/tsconfig.bin.json
exit 0
```

## Setup uncertainty

The fixture's actual failing path remains unmeasured until root runs the settling command. The
expected failure is the composite assertion reporting `scripts/service.sh` as foreign and removed,
with the final provisioner bytes absent. No network, fixture-process, or git setup outcome is claimed
before that run.
