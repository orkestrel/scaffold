## Output

**O-1 sentence** (`/home/user/scaffold/tmp/units/conform/conform-probe-report.md`):

Before: "The entry runs on import and ends the process it is loaded into, so its reporter cannot be called from a test. No refusal this package can construct carries a lone carriage return to it either: every construction-time message is built from a fixed string and a package name, and `describeUnknown` is reached only on the arming path, which never reaches this reporter."

After: "The reporter is reachable only as a spawned entry, and no refusal this package can construct carries a lone carriage return to it: every construction-time message is built from a fixed string and a package name, and `describeUnknown` is reached only on the arming path, which never reaches this reporter."

**Assertion** (`tests/setupServer.test.ts:35`):

Before: `expect(fixture.program.split('const message = JSON.parse(').length - 1).toBe(1)`

After: `expect(fixture.program.split('JSON.parse(buffer.subarray(').length - 1).toBe(1)`

**Control command**: `npm run test:setup`
- Red: 1 test file failed, 1 test failed, at `tests/setupServer.test.ts:35`, `AssertionError: expected 2 to be 1` — `/home/user/work/evidence/probe-proofs/probe-obj-3-parser-planted-red.txt`
- Green: 2 test files passed, 9 tests passed — `/home/user/work/evidence/probe-proofs/probe-obj-3-parser-green.txt`

**`git diff --stat -- tests/setupServer.ts`**: `1 file changed, 248 insertions(+), 31 deletions(-)` before the plant and identical `1 file changed, 248 insertions(+), 31 deletions(-)` after the restore.

**`git status --short`** (in `/home/user/fleet/probe`):
```
 M guides/probe.md
 M src/bin/main.ts
 M src/server/Probe.ts
 M src/server/helpers.ts
 M src/server/stages/LintStage.ts
 M src/server/stages/RuntimeStage.ts
 M src/server/stages/TypeStage.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/bin/main.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/helpers.test.ts
 M tests/src/server/stages/LintStage.test.ts
 M tests/src/server/stages/RuntimeStage.test.ts
```
(14 paths, unchanged from before this round)

**Exit codes**: `npm run format:check` 0; `npm run lint:check` 0; `npm run check` 0; `npm run test:setup` 0.