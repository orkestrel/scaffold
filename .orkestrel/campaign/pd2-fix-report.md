## PD2-FIX report

Helper: `guardStage<T>(stage: Stage, operation: Promise<T>): Promise<T>` in [helpers.ts](/home/user/orkestrel/probe/src/server/helpers.ts:537). It preserves `ProbeError` identity and wraps other failures as `instrument` / `malformed` with the original `cause`. No reusable type emerged, so `src/server/types.ts` is unchanged.

Retargeted sites:

- [RuntimeStage.ts](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:124): `inspect`; `destroy` at line 130.
- [TypeStage.ts](/home/user/orkestrel/probe/src/server/stages/TypeStage.ts:103): `inspect`; `resolve` at line 121; `destroy` at line 127.
- [LintStage.ts](/home/user/orkestrel/probe/src/server/stages/LintStage.ts:88): `inspect`; `destroy` at line 94.

The runtime workspace-configuration exception remains in [RuntimeStage.ts](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:590).

Direct tests are in [helpers.test.ts](/home/user/orkestrel/probe/tests/src/server/helpers.test.ts:114). An observation run supplied the expected message, classification, context, cause identity, and pass-through identity. Removing the pass-through branch made its named test fail; restoring it returned the test to green.

Gate tails:

```text
oxfmt: All matched files use the correct format.
exit 0

oxlint: no diagnostics
exit 0

tsc --noEmit -p configs/src/tsconfig.server.json
exit 0

Test Files  1 passed (1)
Tests       34 passed (34)
exit 0

git diff --check
exit 0
```

The stage suites were not run in the child-spawn-restricted sandbox. Host observation commands:

```text
npx vitest run tests/src/server/stages/RuntimeStage.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:server
npx vitest run tests/src/server/stages/TypeStage.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:server
npx vitest run tests/src/server/stages/LintStage.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:server
```

Each stage-test diff matches the supplied PD2 baseline exactly; none was edited by this unit.

`git diff --stat`:

```text
 src/server/helpers.ts                        | 28 +++++++++
 src/server/stages/LintStage.ts               | 21 ++++---
 src/server/stages/RuntimeStage.ts            | 94 ++++++++++++++++++++--------
 src/server/stages/TypeStage.ts               | 55 +++++++++-------
 tests/src/server/helpers.test.ts             | 33 +++++++++-
 tests/src/server/stages/LintStage.test.ts    | 16 +++--
 tests/src/server/stages/RuntimeStage.test.ts | 51 ++++++++++++++-
 tests/src/server/stages/TypeStage.test.ts    | 51 +++++++++++++++
 8 files changed, 286 insertions(+), 63 deletions(-)
```

`git status --porcelain`:

```text
 M src/server/helpers.ts
 M src/server/stages/LintStage.ts
 M src/server/stages/RuntimeStage.ts
 M src/server/stages/TypeStage.ts
 M tests/src/server/helpers.test.ts
 M tests/src/server/stages/LintStage.test.ts
 M tests/src/server/stages/RuntimeStage.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

Deviations: none.