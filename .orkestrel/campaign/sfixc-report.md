# SFIX-C report

The owned expectations are aligned. The generated source-workspace manifest differs from its prior
golden only at the `oxfmt`, `oxlint`, `vite`, and `vitest` ranges. The scoped core and CLI proofs
pass. The full core and bin project readings remain unclosed because the sandbox denies the child
processes, loopback listener, and nested git process those projects drive.

## Files touched

- `tests/src/core/compilers.test.ts` carries the generated-manifest digest.
- `tests/src/core/fixtures/setup-false-manifest.txt` carries the generated manifest's four aligned
  toolchain ranges.
- `tests/src/bin/CLI.test.ts` carries the missing-dependency diagnostic's `vite` and `vitest`
  ranges.
- `tmp/codex/sfixc-report.md` is this report.

## Changed expectations

- The generated source-workspace manifest digest moved from
  `b96f5ba814a45d8b683eaf2d5b6e062827fa388cfcc78895e57c76fc72d5b99b` to
  `985b411df26f45c51548e15fc11017b0566c0df4992e435c47c2e2fa8146c750`. The manifest's only byte
  changes are the four range changes listed next.
- The fixture's `oxfmt` range moved from `^0.62.0` to `^0.64.0` because
  `BASE_DEV_DEPENDENCIES` and `package.json` declare `^0.64.0`.
- The fixture's `oxlint` range moved from `^1.77.0` to `^1.79.0` because
  `BASE_DEV_DEPENDENCIES` and `package.json` declare `^1.79.0`.
- The fixture's `vite` range moved from `~8.2.0` to `~8.2.1` because
  `BASE_DEV_DEPENDENCIES` and `package.json` declare `~8.2.1`.
- The fixture's `vitest` range moved from `^4.1.10` to `^4.1.11` because
  `BASE_DEV_DEPENDENCIES` and `package.json` declare `^4.1.11`.
- The CLI missing-dependency message's `vite` range moved from `~8.2.0` to `~8.2.1`, and its
  `vitest` range moved from `^4.1.10` to `^4.1.11`. The diagnostic reports the planned values from
  `BASE_DEV_DEPENDENCIES`.

No other expectation moved. The CLI assertion that a range-only overwrite retains
`"vite": "~8.2.0"` remains unchanged because that fixture deliberately starts with the older
target value and the test proves an unrelated range is not rewritten.

The red baseline made the manifest comparison explicit:

```text
$ npx vitest run --config vite.config.ts --project src:core
exit code: 1
Test Files  2 failed | 6 passed (8)
Tests       8 failed | 307 passed (315)
```

The owned failures were the old digest and the fixture. The fixture diff named only these changes:

```text
- "oxfmt": "^0.62.0"
+ "oxfmt": "^0.64.0"
- "oxlint": "^1.77.0"
+ "oxlint": "^1.79.0"
- "vite": "~8.2.0"
+ "vite": "~8.2.1"
- "vitest": "^4.1.10"
+ "vitest": "^4.1.11"
```

After the expectation updates, the explicit fixture equality passes. This proves no other generated
manifest byte moved.

## Digest ruling

The digest catches generated-manifest changes outside the per-range comparison, including scripts,
exports, fields, ordering, and formatting. It reports only that some byte moved, so it does not name
the changed field. The explicit manifest fixture later in the same test file covers the same default
source-workspace manifest and produces an actionable diff. The digest assertion does not earn its
place beside that fixture. Remove the digest assertion in a separate unit and retain the explicit
fixture expectation. This unit records the ruling and does not act on it.

## Acceptance evidence

### Expectation accounting

```text
$ git diff --check
exit code: 0
```

The owned core test file passes:

```text
$ npx vitest run --config vite.config.ts --project src:core tests/src/core/compilers.test.ts
exit code: 0
Test Files  1 passed (1)
Tests       71 passed (71)
```

The changed CLI diagnostic test passes:

```text
$ npx vitest run --config vite.config.ts --project src:bin tests/src/bin/CLI.test.ts -t 'reports every missing planned dependency in stable order'
exit code: 0
Test Files  1 passed (1)
Tests       1 passed | 102 skipped (103)
```

### Lint

```text
$ npm run lint:check
exit code: 0
> oxlint --config .oxlintrc.json --deny-warnings .
```

The command reports no test totals.

### Type checks

```text
$ npm run check
exit code: 0
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
> tsc --noEmit -p configs/src/tsconfig.bin.json
```

The command reports no test totals.

### Core project

```text
$ npx vitest run --config vite.config.ts --project src:core
exit code: 1
Test Files  1 failed | 7 passed (8)
Tests       6 failed | 309 passed (315)
```

Every owned expectation passes. The remaining failures are sandbox-denied child-process readings in
`tests/src/core/templates.test.ts`, each reporting `spawnSync /opt/node22/bin/node EPERM`.

### Bin project

```text
$ npx vitest run --config vite.config.ts --project src:bin
exit code: 1
Test Files  2 failed | 1 passed (3)
Tests       15 failed | 153 passed (168)
```

The changed CLI expectation passes in its focused run. The full project is a denied observation:
loopback fixtures report `listen EPERM: operation not permitted 127.0.0.1`, the nested git reading
reports that its real temporary repository is not a git repository, and the child-pipe proof receives
no bytes.

## Observations

Run the core project on the host with this exact command:

```text
npx vitest run --config vite.config.ts --project src:core
```

The sandbox reading exits `1` with `6 failed | 309 passed (315)` because every remaining failure
spawns a child process that the sandbox denies.

Run the bin project on the host with this exact command:

```text
npx vitest run --config vite.config.ts --project src:bin
```

The sandbox reading exits `1` with `15 failed | 153 passed (168)` because the project reaches the
brief's stated loopback-listener, nested-process, nested-git, and child-pipe limits.

## Unclosed work

The owned source and expectation work is closed. The sandbox cannot produce the required exit code
`0` for the full core or bin project. The Orchestrator must run the exact host commands in
Observations to close those acceptance readings.