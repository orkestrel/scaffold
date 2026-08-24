## Mechanism

- [RuntimeStage.ts](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:94): optional resident runner slot; identity-checked rejection clearing at line 581; close-then-warm replacement and success-only counter reset at line 566; fresh recovery warm at line 552.
- [RuntimeStage.ts](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:264): synchronous and asynchronous configuration failures become `workspace/malformed` with `vite.config.ts` context. The shared public fault door starts at line 122.
- [TypeStage.ts](/home/user/orkestrel/probe/src/server/stages/TypeStage.ts:102): `inspect`, `resolve`, and `destroy` route through the shared instrument fault door at line 221.
- [LintStage.ts](/home/user/orkestrel/probe/src/server/stages/LintStage.ts:86): `inspect` and `destroy` route through the shared instrument fault door at line 128.
- Pins cover runtime specification refusal and rewarm recovery in [RuntimeStage.test.ts](/home/user/orkestrel/probe/tests/src/server/stages/RuntimeStage.test.ts:89), a disposed real TypeScript service in [TypeStage.test.ts](/home/user/orkestrel/probe/tests/src/server/stages/TypeStage.test.ts:27), and a real lint-server spawn fault in [LintStage.test.ts](/home/user/orkestrel/probe/tests/src/server/stages/LintStage.test.ts:791).

## Pin receipts

Runtime rewarm:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/stages/RuntimeStage.test.ts -t "recycles the resident runner after 64 written specifications"
Red: exit 1; raw warm failure failed isProbeError.
Green: exit 0; Tests 1 passed | 36 skipped; Duration 10.62s.
```

Runtime door:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/stages/RuntimeStage.test.ts -t "translates a real Vitest specification-construction fault"
Red: exit 1 with the public door removed; isProbeError was false.
Green: exit 0; Tests 1 passed | 36 skipped; Duration 1.46s.
```

Type door:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/stages/TypeStage.test.ts -t "translates a real disposed language-service fault"
Red: exit 1 with the public door removed; isProbeError was false.
Green: exit 0; Tests 1 passed | 21 skipped; Duration 1.37s.
```

Lint door:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/stages/LintStage.test.ts -t "settles teardown when the language server cannot spawn"
Red: exit 1 before the door implementation; isProbeError was false.
Green: exit 0; Tests 1 passed | 22 skipped; Duration 1.46s.
```

## Gate tails

```text
npx oxfmt --config .oxfmtrc.json --check <owned files>
All matched files use the correct format.
Finished in 17ms on 6 files using 4 threads.
```

```text
npx oxlint --config .oxlintrc.json --deny-warnings <owned files>
exit 0; no output
```

```text
npm run check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
exit 0
```

```text
git diff --check
exit 0; no output
```

## Git diff --stat

```text
 src/server/stages/LintStage.ts               |  36 ++++++---
 src/server/stages/RuntimeStage.ts            | 107 ++++++++++++++++++++-------
 src/server/stages/TypeStage.ts               |  71 ++++++++++++------
 tests/src/server/stages/LintStage.test.ts    |  16 +++-
 tests/src/server/stages/RuntimeStage.test.ts |  51 ++++++++++++-
 tests/src/server/stages/TypeStage.test.ts    |  51 +++++++++++++
 6 files changed, 268 insertions(+), 64 deletions(-)
```

## Git status --porcelain

```text
 M src/server/stages/LintStage.ts
 M src/server/stages/RuntimeStage.ts
 M src/server/stages/TypeStage.ts
 M tests/src/server/stages/LintStage.test.ts
 M tests/src/server/stages/RuntimeStage.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

Deviations: none.