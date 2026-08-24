## Gate found

Baseline: `0ada6bf` (`Seal the emitted project factories to zero parameters`).

[CLI.ts](/home/user/scaffold/src/bin/CLI.ts:335) called `#assertTarget` before `Materializer.declare`. The writing-mode target questions included the scripts advisory, so absent scripts raised `TARGET` before [`replaceManifestScripts`](/home/user/scaffold/src/core/compilers.ts:1773) could append them. The compiler already correctly refuses customized values at [compilers.ts](/home/user/scaffold/src/core/compilers.ts:1783) and appends absent scripts at [compilers.ts](/home/user/scaffold/src/core/compilers.ts:1923).

## Fix

- [CLI.ts](/home/user/scaffold/src/bin/CLI.ts:1366) excludes scripts from writing preflight while retaining the non-blocking audit question.
- Repair and overwrite append terminal audit questions after writing at [CLI.ts](/home/user/scaffold/src/bin/CLI.ts:362) and [CLI.ts](/home/user/scaffold/src/bin/CLI.ts:497).
- [CLI.ts](/home/user/scaffold/src/bin/CLI.ts:1394) reports absent scripts after a customized region is refused.
- The real-verb HTML pin at [CLI.test.ts](/home/user/scaffold/tests/src/bin/CLI.test.ts:1738) proves append behavior, original-byte recovery, custom-script survival, key-order survival, and a clean follow-up audit.
- Fixture records at [CLI.test.ts](/home/user/scaffold/tests/src/bin/CLI.test.ts:1744) and [CLI.test.ts](/home/user/scaffold/tests/src/bin/CLI.test.ts:1829) now admit the script keys they delete, removing the baseline TS7053 diagnostics without assertions or suppressions.
- [scaffold.md](/home/user/scaffold/guides/scaffold.md:608) documents the audit/write boundary. `host.json` was regenerated.

## Red and green records

Red:

```text
npm run test:probe -- -t "reaches the writer and reports a customized region without blocking the verb"

expected EXIT 0, received EXIT 1
Test Files  1 failed | 2 skipped (3)
Tests       1 failed | 5 skipped (6)
exit 1
```

Green after the fix:

```text
npm run test:probe -- -t "reaches the writer and reports a customized region without blocking the verb"

Test Files  1 passed | 2 skipped (3)
Tests       1 passed | 5 skipped (6)
exit 0
```

The append-specific real-verb probe also passed:

```text
npm run test:probe -- -t "appends absent writable scripts through the real verb"

Test Files  1 passed | 2 skipped (3)
Tests       1 passed | 5 skipped (6)
exit 0
```

The temporary probes were removed after promotion into `CLI.test.ts`.

## Flipped pins

- [“reports a customized writable region after repair reaches it”](/home/user/scaffold/tests/src/bin/CLI.test.ts:1823) now expects repair to reach the writer, leave the customized manifest region byte-identical, and return its scripts advisory instead of a preflight `TARGET` refusal.
- [“repairs other paths while a customized script region stays reported”](/home/user/scaffold/tests/src/bin/CLI.test.ts:3368) now proves that region refusal preserves the manifest while other selected paths are repaired. Its follow-up audit still reports the unresolved non-blocking scripts question.

## Gate tails

```text
npx oxfmt --config .oxfmtrc.json --check ...
All matched files use the correct format.
exit 0

npx oxlint --config .oxlintrc.json --deny-warnings ...
exit 0

npx tsc --noEmit
exit 0

npm run check:src:core
exit 0

npm run check:src:bin
exit 0

SD2 core pins
Test Files  1 passed (1)
Tests       13 passed | 78 skipped (91)
exit 0

npm run test:guides
Test Files  1 passed (1)
Tests       17 passed (17)
exit 0

npm run build:inventory
build-inventory: staged 108 file(s) into host.json
exit 0

git diff --check
exit 0
```

## Deviations

The promoted listener-backed CLI suite could not collect under the sandbox:

```text
Error: listen EPERM: operation not permitted 127.0.0.1
exit 1
```

`npm run test:config` verified `host-inventory: entries=108`, then failed on sandbox restrictions:

```text
Error: listen EPERM: operation not permitted 0.0.0.0:24678
Error: spawnSync /opt/node22/bin/node EPERM
Tests  1 failed | 43 passed (44)
exit 1
```

The requested probe instrument was unavailable because its MCP call required approval while approval policy was `never`. The real-verb temporary probes supplied the red/green evidence instead.

HEAD advanced outside this unit to `5636a6a`. No commit was created by this unit.

## `git diff --stat`

```text
 guides/scaffold.md        | 25 ++++++++++----------
 host.json                 |  4 ++--
 src/bin/CLI.ts            | 52 ++++++++++++++++++++++++++----------------
 tests/src/bin/CLI.test.ts | 58 ++++++++++++++++++++++++++++-------------------
 4 files changed, 82 insertions(+), 57 deletions(-)
```

## `git status --porcelain`

```text
 M guides/scaffold.md
 M host.json
 M src/bin/CLI.ts
 M tests/src/bin/CLI.test.ts
```