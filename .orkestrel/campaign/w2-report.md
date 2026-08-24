## Moved helpers

`tests/setupServer.ts` exports:

- `readFixtureServer(scratch: ScratchInterface): number`
- `waitForFixtureServer(scratch: ScratchInterface): Promise<number>`
- `killFixtureServer(scratch: ScratchInterface): void`
- `isProcessLive(id: number): boolean`
- `readSignalEnding(signal: NodeJS.Signals, program: string): Promise<{ readonly code: number | null; readonly signal: string | null }>`

`readHostEnding` and `readInputRefusal` remain local to `LintStage.test.ts`.

Direct proofs cover `WORKSPACE_ROOT`, live and dead process readings, fixture announcement/read/kill behavior, and signal endings.

## Wait conversions

Mapped polling sites converted to `waitForCondition`:

- `main.test.ts`: `waitForArming`
- `main.test.ts`: `waitForArmed`
- `Probe.test.ts`: boot dependency appearance
- `RuntimeStage.test.ts`: generated specification marker
- `RuntimeStage.test.ts`: blocked-unlink marker
- `LintStage.test.ts`: admitted progress document
- `setupServer.ts`: fixture-server announcement

Mapped settling waits retained:

- `LintStage.test.ts`: concurrent inspection refusal
- `LintStage.test.ts`: signalled-server inspection refusal
- `LintStage.test.ts`: `EPIPE` inspection refusal

Mapped unmatched waits retained:

- `main.test.ts`: protocol request writes
- `TypeStage.test.ts`: dependency rewrite
- `ProbeServer.test.ts`: standard-input delivery readings
- `Probe.test.ts`: queued-expiry settling
- `Probe.test.ts`: stalled-lint watchdog
- `LintStage.test.ts`: killed-server teardown
- `LintStage.test.ts`: teardown during warming
- `LintStage.test.ts`: close-event settling

Unmapped waits introduced by earlier units remain unchanged in `TypeStage.test.ts` and `Probe.test.ts`.

## Setup project

`vite.config.ts` now defines the `setup` factory with:

- Label: `setup`
- Include: `tests/setup*.test.ts`
- Setup file: `./tests/setup.ts`
- Environment: Node with browser disabled
- Registration in the default project list

`package.json` now defines:

```text
test:setup = vitest run --config vite.config.ts --no-cache --reporter=dot --project setup
```

The default `test` chain invokes `test:setup` after `test:config`. The release wave must re-check this scaffold-owned `vite.config.ts` and `package.json` region.

## Test evidence

Red-first command:

```text
npm run test:setup
Test Files  1 failed | 1 passed (2)
Tests       2 failed | 1 passed (3)
```

The missing helper exports caused the failures.

Local non-spawning and reachable proofs:

```text
npx vitest run tests/setup.test.ts --config vite.config.ts --no-cache --reporter=dot --project setup
Test Files  1 passed (1)
Tests       1 passed (1)
```

```text
npx vitest run tests/setupServer.test.ts --config vite.config.ts --no-cache --reporter=dot --project setup -t "waits for, reads, and kills"
Test Files  1 passed (1)
Tests       1 passed | 1 skipped (2)
```

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project config -t "root configuration"
Test Files  1 passed (1)
Tests       8 passed | 36 skipped (44)
```

## Host observations

Run these commands on the Orchestrator host:

```text
npm run test:setup
```

Expected: `tests/setup.test.ts` and `tests/setupServer.test.ts` pass. In the sandbox, the signal child announced readiness but never exited after delivery, so the full command timed out with `1 failed | 2 passed`.

```text
npm run test:config
```

Expected: the complete config project passes. In the sandbox, configuration assertions passed, then the nested Oxlint proof failed with `spawnSync /opt/node22/bin/node EPERM`; the reading was `1 failed | 43 passed`.

```text
npm run test:src:server
npm run test:src:bin
```

Expected: the consuming `LintStage`, `RuntimeStage`, `Probe`, and bin suites remain green after the pure helper moves and wait conversions.

## Gate tails

```text
oxfmt: exit 0
All matched files use the correct format.
Finished in 16ms on 9 files using 4 threads.

oxlint: exit 0

npx tsc --noEmit --project tsconfig.json: exit 0

npm run check:src:server: exit 0
tsc --noEmit -p configs/src/tsconfig.server.json

npm run check:src:bin: exit 0
tsc --noEmit -p configs/src/tsconfig.bin.json

git diff --check: exit 0
```

## Git diff

```text
 package.json                                 |  3 +-
 tests/setupServer.ts                         | 79 ++++++++++++++++++++++++++++
 tests/src/bin/main.test.ts                   | 54 +++++++------------
 tests/src/server/Probe.test.ts               | 20 +++----
 tests/src/server/stages/LintStage.test.ts    | 52 +++++-------------
 tests/src/server/stages/RuntimeStage.test.ts | 24 +++++----
 vite.config.ts                               | 17 +++++-
 7 files changed, 154 insertions(+), 95 deletions(-)
```

The stat excludes the untracked setup proof files.

```text
 M package.json
 M tests/setupServer.ts
 M tests/src/bin/main.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/stages/LintStage.test.ts
 M tests/src/server/stages/RuntimeStage.test.ts
 M vite.config.ts
?? tests/setup.test.ts
?? tests/setupServer.test.ts
```

Deviations: none. No commit was created.