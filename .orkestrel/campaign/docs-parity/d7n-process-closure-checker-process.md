Lane held: checker process

**Claim 1 — PASS.** `git status --short` (`d7n-process-converge-fix.status.txt`) lists exactly the six files the fix brief owns: `guides/process.md`, `src/core/constants.ts`, `src/core/types.ts`, `src/server/processes/ProcessManager.ts`, `tests/guides.test.ts`, `tests/src/server/processes/Supervisor.test.ts`. The diff confirms every `src/**` hunk touches only `/** … */` doc-comment text (no code token moves) — `src/core/constants.ts`, `src/core/types.ts`, `src/server/processes/ProcessManager.ts` in `d7n-process-converge-fix.diff.txt`. Nothing outside the owned/granted set changed.

**Claim 2 — FAIL.** The citations do match the tree (verified directly against `/home/user/fleet/process` files, not just the report's say-so), but the report states a count in prose in violation of the claim's own second clause:
- `d7n-process-converge-fix-report.md:8-9`: `"Diffstat: 6 files changed, 252 insertions(+), 233 deletions(-)."` — a files/insertions/deletions count stated in prose with no run quoted beside it (the report's own citation for it is a *different* command, `git diff -U0 -- src/`, which proves comment-only status, not the diffstat numbers).
- `d7n-process-converge-fix-report.md:22` (Item 1): `"gone with the two lines that carried it"` — a count of lines, unnamed, with no run cited.

`AGENTS.md` § Writing bars stating a count outright and permits a number only as a duration, size, limit, version, date, exit code, or a measurement quoted with the run that produced it; neither instance meets that bar.

**Claim 3 — PASS**, verified independently against the tip of `/home/user/fleet/process` (not the report's assertions):
- Header lines 1-3 of `tests/guides.test.ts` are byte-identical to `/home/user/fleet/abort/tests/guides.test.ts:1-3`.
- The region `const root = ` through the manifest loop's closing brace (`tests/guides.test.ts:131-604`) matches the pilot's corresponding region (`abort/tests/guides.test.ts:47-258`) structurally line-for-line with only appended package-owned material (`FACES`/`SOURCES`/`REFUSALS`/`describe('public package faces')`/`FIXTURE_FILES`/`POPULATIONS` after the README case; `documents at least one Surface function`, `documents at least one method group`, `imports through a published specifier in every ts fence` appended inside the loop's `describe` after the pilot's cases); no pilot line was deleted or altered. `sources` (not `sourceManager`) at line 140; `/Interface$/` with no `u` flag at lines 447 and 508.
- `tests/src/server/processes/Supervisor.test.ts:114`: `"barely past the race"` present.
- `guides/process.md`: `"Two moments"` absent (grep, no matches); `"below\b"` absent from both `guides/process.md` and `Supervisor.test.ts` (grep, no matches).
- `src/server/processes/ProcessManager.ts:15-16` (`"Launches supervised children under caller-chosen ids…"`) and `src/core/types.ts:730` (`"Represents a keyed registry of live supervised child processes."`) carry distinct descriptions; `src/core/types.ts:813-814` and `src/core/constants.ts` (`PROCESS_ERROR_CODES` doc) name the arms `spawn`, `timeout`, `input`, `duplicate`, `protocol`, `invalid`.
- Guards table (`guides/process.md:93`) heads `Shape` with `ProcessError`, preceded by `"In a guard table a Shape cell holds the type the guard narrows to."` (line 91). Constants table (`guides/process.md:173`) heads `Shape` with declared types, preceded by `"A Shape cell holds the constant's declared type."` (line 171); every row (175-179 and beyond) names its literal in the `Summary` cell.
- `guides/process.md:13-14`: opening clause replaced with the `detach` `@remarks` fact, distinct from the tagline's `"fire-and-forget"`.
- `guides/process.md:1036`: `"`execute` and `executeSync` share the rest…"` names both at the `both` sentence.
- Lead-in sentences precede every fence under a heading (`guides/process.md:1252`, `1263`, `1287`, `1315`), and a full scan of every `` ``` `` fence in the file (grep with context) shows no other fence sitting directly under a heading with only a blank line between.

**Findings outside the claims**
- The two count-in-prose instances above are the only writing-rule violations found in the report; no other prose count was found on inspection.
- No off-limits file (`README.md`, `guides/README.md`, `package.json`, `package-lock.json`, `tests/setup*.ts`, other `tests/src/**`) appears in the diff or status output.

VERDICT: FAIL 2
