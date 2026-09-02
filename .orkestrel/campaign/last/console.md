# Last changes: console

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `ed4e280`, merge base with `origin/main` `85959fd`, layer L2, declared version 0.0.11, registry version 0.0.11.

## Commits since origin/main

```text
33f830d 2026-08-28 Update every dependency to the published latest
ba45168 2026-08-28 Adopt the catalog and guide mirrors for the wave
f988806 2026-08-28 Apply the verified src-audit fixes
6908714 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
a96051e 2026-09-01 Adopt the renamed guide helpers in the parity test
a35c93f 2026-09-02 Drop the pass-through console factories and rename the status verbs
77ab53f 2026-09-02 Name the classes the console options serve and the capture's restore path
5a75c04 2026-09-02 Point the README at the guide the package ships
ed4e280 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md          |  17 +--
 README.md                            |  20 +--
 package.json                         |   6 +-
 src/browser/constants.ts             |  24 ++--
 src/browser/factories.ts             |  50 +++----
 src/browser/helpers.ts               |  26 ++--
 src/browser/types.ts                 |  20 +--
 src/core/ANSIRenderer.ts             |  12 +-
 src/core/Capture.ts                  |  75 +++++-----
 src/core/Logger.ts                   |  22 +--
 src/core/LoggerManager.ts            |  14 +-
 src/core/Progress.ts                 |  40 +++---
 src/core/Reporter.ts                 |  14 +-
 src/core/Retention.ts                |  66 +++++++++
 src/core/Spinner.ts                  |  44 +++---
 src/core/Styler.ts                   |  37 ++---
 src/core/constants.ts                | 135 +++++++++--------
 src/core/errors.ts                   |   8 +-
 src/core/factories.ts                | 343 ++++++++++++--------------------------------
 src/core/helpers.ts                  | 220 +++++++++++-----------------
 src/core/index.ts                    |   1 +
 src/core/types.ts                    | 589 +++++++++++++++++++++++++++++++++++++++++----------------------------------
 src/server/ProcessCapture.ts         | 111 +++++++-------
 src/server/constants.ts              |  25 ++--
 src/server/factories.ts              |  45 +++---
 src/server/helpers.ts                |  78 +++-------
 src/server/index.ts                  |   1 +
 src/server/types.ts                  | 114 ++++++++-------
 src/server/validators.ts             |  48 +++++++
 tests/guides.test.ts                 |  22 +--
 tests/src/browser/factories.test.ts  |  14 +-
 tests/src/core/Capture.test.ts       |  14 +-
 tests/src/core/Logger.test.ts        |  22 ++-
 tests/src/core/LoggerManager.test.ts |  24 +---
 tests/src/core/Progress.test.ts      |  54 +++----
 tests/src/core/Reporter.test.ts      |  20 +--
 tests/src/core/Retention.test.ts     | 109 ++++++++++++++
 tests/src/core/Spinner.test.ts       |  79 ++++------
 tests/src/core/factories.test.ts     | 157 ++++++--------------
 tests/src/core/helpers.test.ts       |  47 ++++++
 tests/src/server/factories.test.ts   |  10 +-
 tests/src/server/helpers.test.ts     | 107 +++-----------
 tests/src/server/validators.test.ts  |  75 ++++++++++
 43 files changed, 1433 insertions(+), 1526 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

The surface diff is 130598 bytes, past the 60000-byte cap; read it with `git -C /home/user/fleet/console diff 85959fd..ed4e280 -- 'src/**/types.ts' 'src/**/index.ts' 'src/**/constants.ts' 'src/**/errors.ts'`. Per-file stat:

```text
 src/browser/constants.ts |  24 ++--
 src/browser/types.ts     |  20 +--
 src/core/constants.ts    | 135 ++++++++++----------
 src/core/errors.ts       |   8 +-
 src/core/index.ts        |   1 +
 src/core/types.ts        | 589 ++++++++++++++++++++++++++++++++++++++++++++++++---------------------------------------
 src/server/constants.ts  |  25 ++--
 src/server/index.ts      |   1 +
 src/server/types.ts      | 114 +++++++++--------
 9 files changed, 488 insertions(+), 429 deletions(-)
```
