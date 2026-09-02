# Last changes: contract

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `7de1ef2`, merge base with `origin/main` `c13cfae`, layer L0, declared version 0.0.15, registry version 0.0.15.

## Commits since origin/main

```text
fafcb17 2026-08-28 Update every dependency to the published latest
a8dec07 2026-08-28 Adopt the catalog and guide mirrors for the wave
a6f30db 2026-08-28 Apply the verified src-audit fixes
20e3efd 2026-09-01 Merge origin/main at 0.0.15 into the campaign branch
038a15a 2026-09-01 Adopt the renamed guide helpers in the parity test
d24e79c 2026-09-02 Apply the breaking rows in contract
5b0ed57 2026-09-02 Close the contract unit's audit findings
2c15840 2026-09-02 Merge origin/main at c13cfae into the campaign branch
7ffbdcc 2026-09-02 Point the README at the guide the package ships
7de1ef2 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md             |   17 +-
 README.md                               |    2 +-
 package.json                            |    4 +-
 src/core/ContractCompiler.ts            |   60 ++--
 src/core/JSONCloner.ts                  |   42 ++-
 src/core/SampleInferer.ts               |  247 ++++++++++++++++
 src/core/SchemaCloner.ts                |   68 +++--
 src/core/SchemaShaper.ts                |  331 ++++++++++++++++++++++
 src/core/ShapeCloner.ts                 |  237 ++++++++++------
 src/core/ShapeValidator.ts              |  293 +++++++++----------
 src/core/ValueInferer.ts                |  254 +++++++++++++++++
 src/core/cloners.ts                     |   11 +-
 src/core/combinators.ts                 |  189 +++++++++----
 src/core/compilers.ts                   |   74 +----
 src/core/constants.ts                   |  241 +++++++++-------
 src/core/errors.ts                      |   50 ++--
 src/core/factories.ts                   |   59 ++++
 src/core/helpers.ts                     |  631 +++++++++++++++++++++++++++++++----------
 src/core/index.ts                       |    1 +
 src/core/inferers.ts                    | 1085 ++++-------------------------------------------------------------------
 src/core/parsers.ts                     |   43 ++-
 src/core/shapers.ts                     |  562 +++----------------------------------
 src/core/types.ts                       |  340 +++++++++++++---------
 src/core/validators.ts                  |  366 ++++++++++++++++++------
 tests/guides.test.ts                    |   28 +-
 tests/setup.ts                          |   11 +-
 tests/src/core/ContractCompiler.test.ts |    4 +-
 tests/src/core/ShapeCloner.test.ts      |   46 ++-
 tests/src/core/ShapeValidator.test.ts   |  152 +++++-----
 tests/src/core/cloners.test.ts          |    2 +-
 tests/src/core/compilers.test.ts        |  358 ++++++++++++------------
 tests/src/core/helpers.test.ts          |  203 ++++++++------
 tests/src/core/inferers.test.ts         |  445 ++++++++++++++---------------
 tests/src/core/integration.test.ts      |   23 +-
 tests/src/core/shapers.test.ts          |   33 +--
 35 files changed, 3351 insertions(+), 3161 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

The surface diff is 63695 bytes, past the 60000-byte cap; read it with `git -C /home/user/fleet/contract diff c13cfae..7de1ef2 -- 'src/**/types.ts' 'src/**/index.ts' 'src/**/constants.ts' 'src/**/errors.ts'`. Per-file stat:

```text
 src/core/constants.ts | 241 ++++++++++++++++++++++++++++++++++++++--------------------------
 src/core/errors.ts    |  50 +++++++-------
 src/core/index.ts     |   1 +
 src/core/types.ts     | 340 +++++++++++++++++++++++++++++++++++++++++++++++++++++++-----------------------------------
 4 files changed, 378 insertions(+), 254 deletions(-)
```
