## Question

For every conform-process row, compare the current tree, unit diff, and writer report.

## Evidence

### process-subj-1

- **Site now.** `src/server/types.ts:93-94` says `relieve` is optional because a face without output backpressure has nothing to release; `:101-103` says it reports termination beginning and releases output backpressure. Context confirms the surrounding `terminal` and `close` members.
- **Diff at the site.** `@@ -72,14 +91,14 @@`; added line: `* because a face that never pauses the child's output holds no backpressure to release.` The member repair is present at `@@ -59,6 +71,13 @@`: `Reports that a termination began, so a face holding output backpressure releases it.`
- **Old form sweep.** Pattern `\b(pending standard-input write can proceed|only a face carrying a standard-input channel)\b`, case-insensitive, over `src`, `tests`, `guides/process.md`, `guides/README.md`, and `README.md`, excluding `node_modules`: no hit.
- **Report reading.** The report says: “`SupervisorFace.relieve`'s member doc and the interface optionality clause now state the termination moment the engine actually reports.” This matches `src/server/types.ts:93-103` and the call at `src/server/processes/Supervisor.ts:486-487`.
- **Proof reading.** Documentation row; the report records its general TSDoc sweep. The targeted sweep agrees.

### process-subj-2

- **Site now.** `src/server/types.ts:49`, `:63`, and `:82` retain `kill`, `once`, and `off` signatures, each with an example. `guides/process.md:211` contains only `pid`, `exitCode`, and `signalCode` in the Surface row. `guides/process.md:286-296` contains the matching `ProcessChildInterface` table.
- **Diff at the site.** Guide hunk `@@ -270,6 +283,32 @@`; added rows are `kill`, `once`, and `off`. Type hunks `@@ -39,6 +39,12`, `@@ -47,6 +53,12`, and `@@ -59,6 +71,13` add the three examples. The operative repair is present.
- **Old form sweep.** Pattern `` `ProcessChildInterface`.*kill.*once.*off `` and the former Surface wording, case-insensitive, over the required paths: no former combined Surface row hit. The method names remain intentionally as API members.
- **Report reading.** The report says: “`ProcessChildInterface` gained a `## Methods` group over `kill`, `once`, `off`; its Surface row is trimmed to `pid`, `exitCode`, `signalCode`; each method gained an `@example`.” This matches `guides/process.md:211` and `:286-296`.
- **Proof reading.** Control `process-subj-2-control-red.txt` exists. It records `npm run test:guides` and `Tests 1 failed | 111 passed | 1 skipped (113)`, with `once` as the missing example. Green control `fix1-P2-green.txt` records `Tests 114 passed | 1 skipped (115)`. The report's sweep and the tree agree.

### process-subj-3

- **Site now.** `README.md:8-11` describes `Session`; `:17-18` names `Process`, `Session`, and `ProcessManager` as emitter owners; `:64-70` names `Session`, `Supervisor`, and `createSession`.
- **Diff at the site.** Hunk `@@ -5,13 +5,17` adds the `Session` tier. Hunk `@@ -57,18 +61,20` adds `Session` and `Supervisor` to the Guide and Package prose. The repair text is present.
- **Old form sweep.** The old condition was omission rather than removable text. Pattern `\b(Session|session)\b`, case-insensitive, over `README.md`: hits at `:8`, `:17`, `:64`, and `:75-76`; no stale omission remains.
- **Report reading.** The report says: “`README.md` names the `Session` tier in the opening paragraph, among the emitter owners, in the Guide paragraph, and in the Package server list with `createSession`.” The cited content is present at the current lines above.
- **Proof reading.** Documentation row; the report records the README omission as its baseline sweep. The current sweep agrees.

### process-subj-4

- **Site now.** `tests/setupServer.ts:5-7` begins “Resolves the self-contained child-process fixture entrypoint”; `:14-18` begins “Builds a command that drives the child fixture in one of its behavior modes.”
- **Diff at the site.** Hunk `@@ -2,7 +2,7` adds `Resolves`; hunk `@@ -11,7 +11,7` adds `Builds`. The exact repair text is present.
- **Old form sweep.** Patterns `\bResolve the self-contained child-process fixture entrypoint\b` and `\bBuild a command that drives the child fixture in one of its behavior modes\b`, case-insensitive, over the required paths: no hit.
- **Report reading.** The report says: “`tests/setupServer.ts` opens both helper docs in the third person.” This matches `tests/setupServer.ts:5` and `:14`.
- **Proof reading.** Documentation row; the report records a package-wide imperative-opener sweep. The targeted sweep agrees.

### process-subj-5

- **Site now.** `src/core/types.ts:47` documents both branches: `true` excludes the parent environment; `false` or omission layers overrides over it. Context at `:32-39` gives the same environment semantics.
- **Diff at the site.** Hunk `@@ -43,7 +43,7 @@`; the exact replacement sentence is present.
- **Old form sweep.** Pattern `If \`true\`, exclude the parent environment; on POSIX this leaves no \`PATH\`, while Windows libuv still injects a host set.`, case-insensitive, over the required paths: no hit.
- **Report reading.** The report says: “`ProcessCommand.isolated` documents the `false`-or-omitted branch beside the `true` branch.” This matches `src/core/types.ts:47`.
- **Proof reading.** Documentation row; the report records the general text sweep. The targeted sweep agrees.

### process-subj-6

- **Site now.** `guides/process.md:1438` rules on `Supervisor`; `:1439` rules on `SupervisorFace`. No `launch` Vocabulary row exists. `src/server/types.ts:96` declares `SupervisorFace`; `src/core/types.ts:776` retains `launch`.
- **Diff at the site.** Vocabulary hunk `@@ -1383,25 +1422,26 @@`; the added `SupervisorFace` row is present at `guides/process.md:1439`. The operative repair intentionally adds no `launch` row.
- **Old form sweep.** Pattern `^| \`launch\`` in the Vocabulary section: no hit. Pattern for the former stranded Supervisor wording, case-insensitive, over the required paths: no hit.
- **Report reading.** The report says: “The guide's Vocabulary table gained a `SupervisorFace` row. No `launch` row, per the refuter's amendment. No rename.” The current guide and source match that reading.
- **Proof reading.** Naming/documentation row; the report records no-rename and Vocabulary changes. The targeted sweep agrees.

### process-obj-1

- **Site now.** The former flat files no longer exist. `src/server/processes/Process.ts:43`, `ProcessManager.ts:43`, `Session.ts:38`, and `Supervisor.ts:76` hold the four classes. `src/server/index.ts:5-8` exports the four nested modules. `src/server/factories.ts:9-11` imports the three factory classes from `./processes/`.
- **Diff at the site.** Rename metadata records `src/server/Process.ts -> src/server/processes/Process.ts`, the corresponding manager, session, and supervisor moves, and the test moves. Import hunks include `@@ -5,8 +5,8 @@`, `@@ -1,7 +1,7 @@`, `@@ -12,7 +12,7 @@`, `@@ -23,7 +23,7 @@`, and `@@ -2,6 +2,7 @@`. The operative move and relative-import repairs are present; pure renames have no added content lines.
- **Old form sweep.** Pattern `server/(Process|ProcessManager|Session|Supervisor)(\.test)?\.ts`, word-boundary and case-insensitive variants, over the required paths: two synthetic hits remain at `tests/guides.test.ts:306-307` inside `FIXTURE_FILES`; no real flat source or test path remains. Pattern `\./(Process|ProcessManager|Session|Supervisor)\.js`: three intentional sibling imports remain under `src/server/processes/:10`, `:5`, and `:12`; no stale root import remains.
- **Report reading.** The report says: “`src/server/processes/` holds `Process.ts`, `ProcessManager.ts`, `Session.ts`, and `Supervisor.ts`; `tests/src/server/processes/` holds their mirrored tests.” This matches the current Glob results and status.
- **Proof reading.** Placement row; the report records `npm run check` exit 0, `npm run test:policy` with 111 passed, `npm run test:guides` with 112 passed and 1 skipped, and `npm run test:src:server` with 193 passed and 8 skipped. The path sweep agrees.

### process-obj-2

- **Site now.** `src/server/index.ts:8` exports `Supervisor`. `tests/guides.test.ts:110-112` lists `Supervisor` in the core-face refusal list; `:200-201` leaves both `INTERNALS` arrays empty. `guides/process.md:76` adds the Entity row, `:298-310` adds the Methods table, and `:1438` gives the Vocabulary ruling.
- **Diff at the site.** Barrel hunk `@@ -2,6 +2,7 @@` adds `export * from './processes/Supervisor.js'`. Guide hunks `@@ -66,15 +66,16`, `@@ -202,29 +203,41`, `@@ -270,6 +283,32`, and `@@ -1383,25 +1422,26` add the documented surface. Supervisor hunk `@@ -53,6 +53,25` adds the class example; `@@ -231,6 +250,29` adds the `deliver` example. The operative repair is present.
- **Old form sweep.** Patterns `` `Supervisor`.*stays out of the barrel ``, `class Supervisor.*stranded`, `which no consumer holds`, and `no consumer can construct one`, case-insensitive, over the required paths: no hit.
- **Report reading.** The report says: “`Supervisor` is barrelled, un-interned, tabled in Entities, given a `## Methods` group over `deliver`, `end`, `stop`, `destroy`, given a class `@example` and a `deliver` `@example`, and added to the core face's refusal list.” Each item is present at the current lines above.
- **Proof reading.** Control `process-obj-2-control-red.txt` exists and records `Tests 4 failed | 108 passed | 1 skipped (113)` when the barrel row was removed. Green control `fix1-P2-green.txt` records `npm run test:guides` with `Tests 114 passed | 1 skipped (115)`, after the transcription repair. The report and tree agree.

### process-obj-3

- **Site now.** `tests/src/server/helpers.test.ts:1` contains `import type { ProcessChildInterface } from '@src/server'`, before all value imports at `:2-13`.
- **Diff at the site.** Hunk `@@ -1,9 +1,9 @@`; the type import is added at line 1 and removed from line 6. The repair is present.
- **Old form sweep.** Pattern `^import (value imports)\n...^import type` cannot be represented by a single line search; the direct import-order inspection finds no type import after value imports in the touched test. `^import type` finds the declaration at `tests/src/server/helpers.test.ts:1`.
- **Report reading.** The report says: “`tests/src/server/helpers.test.ts` opens with its `import type` declaration.” This matches line 1.
- **Proof reading.** Syntax/placement row; no behavioural proof is required by the row. The report's `format:check` and server-suite readings support the change.

### process-obj-4

- **Site now.** `src/server/factories.ts:30`, `:51`, and `:68` define the three factories. `src/server/processes/Supervisor.ts:76` defines the class. `tests/src/server/factories.test.ts` and `tests/src/server/processes/Supervisor.test.ts` exist. `guides/process.md:1522-1534` lists both tests.
- **Diff at the site.** New-test hunks are `@@ -0,0 +1,207 @@` and `@@ -0,0 +1,214 @@`. The guide hunk `@@ -1477,8 +1519,20 @@` adds both test links. The operative tests and paths are present.
- **Old form sweep.** Pattern for the former missing test paths, `tests/src/server/(factories|Supervisor)\.test\.ts`, over the required paths: no stale missing-path reference; both current paths exist.
- **Report reading.** The report says: “Added `tests/src/server/factories.test.ts` and `tests/src/server/processes/Supervisor.test.ts`, both listed in the guide's Tests section.” This matches the tree.
- **Proof reading.** Controls exist:
  - `process-obj-4-supervisor-control-red.txt`: `Tests 1 failed | 4 passed (5)`, failing when `relieve` moved after termination.
  - `process-obj-4-factories-control-red.txt`: `Tests 1 failed | 6 passed (7)`, failing when backlog validation moved after spawn.
  - `process-obj-4-green.txt`: `Tests 12 passed (12)`.
  The report records the commands as `npx vitest run … --project src:server … Supervisor.test.ts` and `npx vitest run … --project src:server … factories.test.ts`; the exact elided command arguments are not recorded in the report or control files.

### process-obj-5

- **Site now.** `tests/src/server/helpers.test.ts:1691-1706` waits for the named detached-marker condition with `{ budget: 10_000 }`; `tests/src/server/processes/Process.test.ts:764-768` waits for the named native-exit condition with the same budget. Both cases have `{ timeout: 20_000 }` at `helpers.test.ts:1691` and `Process.test.ts:750`.
- **Diff at the site.** Helper hunk `@@ -1694,7 +1700,11 @@` replaces `waitForDelay(200)`. Process hunk `@@ -743,33 +743,43 @@` replaces `waitForDelay(250)`. The exact named-condition repairs are present.
- **Old form sweep.** Pattern `waitForDelay\(200\)|waitForDelay\(250\)` over the required paths finds only unrelated uses at `tests/src/server/helpers.test.ts:1261`, `:1654`, `tests/src/server/processes/Process.test.ts:1005`, and `tests/src/server/processes/Session.test.ts:342`; neither repaired target site remains. The former target paths have zero stale hits.
- **Report reading.** The report says: “Both fixed delays became named conditions. Each case carries a timeout that outlives its condition budget.” This matches the current tests.
- **Proof reading.** `process-obj-5-control-red.txt` exists and records `Tests 2 failed | 142 passed | 8 skipped (152)`, with both named conditions failing after the predicates were planted false. `fix1-P8-green.txt` records `Tests 144 passed | 8 skipped (152)`. The report's readings match; its expanded P8 command is `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/processes/Process.test.ts tests/src/server/helpers.test.ts`.

### process-obj-6

- **Site now.** `tests/src/server/helpers.test.ts:1295-1296` says the root deadline “can be shorter” than Node bootstrap; `:1334` uses `.split(/\r\n|\n/u)`. The other required splits are at `:639-640`, `tests/src/server/processes/Session.test.ts:518`, and `tests/guides.test.ts:847`.
- **Diff at the site.** Hunk `@@ -1288,8 +1292,8 @@` changes the stale comment. Hunk `@@ -1327,7 +1331,7 @@` changes the streamed split. Hunk `@@ -632,8 +636,8 @@` changes the rooted and orphaned splits. Session hunk `@@ -512,7 +512,10 @@` and guide-test hunk `@@ -841,7 +841,11 @@` add the same line-ending form. The operative repairs are present.
- **Old form sweep.** Pattern `\.split\(['"]\n['"]\)` over `src`, `tests`, and the two README/guide files, excluding vendored files: no hit. The former `50 ms` comment is also absent.
- **Report reading.** The report says: “The stale `50 ms` comment names the deadline the code sets. Every bare `'\n'` split in an owned file takes the `/\r\n|\n/u` form. No budget changed. The readiness-budget component stays not evidenced.” The current tree supports the comment and split claims. The readiness-budget limitation remains.
- **Proof reading.** Mixed placement/documentation row; no row-specific failing-first control file exists. The report explicitly records the readiness-budget component as not evidenced.

### fleet-F1

- **Site now.** `tests/setup.ts` has no `isBrowserVuePath`; the report's reading that its body is `export {}` is consistent with the workspace. No `src/browser`, `app/browser`, or `tests/setupBrowser.ts` path exists.
- **Diff at the site.** No diff hunk touches this helper or setup test. The noop disposition is supported.
- **Old form sweep.** Pattern `\bisBrowserVuePath\b`, case-insensitive, over the required paths: no hit.
- **Report reading.** The report says: “`tests/setup.ts` declares no `isBrowserVuePath`; the file's whole body is `export {}`. The workspace has no `src/browser`, no `app/browser`, and no `tests/setupBrowser.ts`.” This matches the tree.
- **Proof reading.** No behavioural proof is required for a noop.

### fleet-F2

- **Site now.** `src/server/processes/Process.ts:43`, `ProcessManager.ts:43`, `Session.ts:38`, and `Supervisor.ts:76` define the implementation classes. None declares a public `readonly id` field or `get id()` accessor.
- **Diff at the site.** No diff hunk touches an `id` field or getter.
- **Old form sweep.** Pattern `^\s*(readonly )?id\s*[:=]` over `src`, plus `get id\(` over implementation classes: no match. `JSON.stringify` inspection found no serialization of a process-class instance in the package's own touched tests or guide.
- **Report reading.** The report says: “No implementation class declares a public `readonly id` data field.” This matches the class declarations.
- **Proof reading.** Noop row; the class and serialization checks agree.

### Across the unit

**Scope.** Every status entry is `owned` under the brief's Owned scope:

- `README.md`
- `guides/process.md`
- `src/core/types.ts`
- `src/server/factories.ts`
- `src/server/index.ts`
- `src/server/types.ts`
- `src/server/Process.ts -> src/server/processes/Process.ts`
- `src/server/ProcessManager.ts -> src/server/processes/ProcessManager.ts`
- `src/server/Session.ts -> src/server/processes/Session.ts`
- `src/server/Supervisor.ts -> src/server/processes/Supervisor.ts`
- `tests/guides.test.ts`
- `tests/setupServer.ts`
- `tests/src/server/helpers.test.ts`
- `tests/src/server/factories.test.ts`
- `tests/src/server/Process.test.ts -> tests/src/server/processes/Process.test.ts`
- `tests/src/server/ProcessManager.test.ts -> tests/src/server/processes/ProcessManager.test.ts`
- `tests/src/server/Session.test.ts -> tests/src/server/processes/Session.test.ts`
- `tests/src/server/processes/Supervisor.test.ts`

No status entry is `shared` or `off-limits`. No diff hunk has a file absent from the rows' file-level Where scopes.

**Residue in added diff lines.** Pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` over diff `+` lines found only these timeout-related additions:

- `tests/src/server/factories.test.ts:101` — case timeout.
- `tests/src/server/helpers.test.ts:609`, `:612`, `:1690-1691` — comments and case timeouts.
- `tests/src/server/processes/Process.test.ts:747`, `:750` — comment and case timeout.
- `tests/src/server/processes/Supervisor.test.ts:53`, `:56`, `:97`, `:100`, `:106` — comments, case timeouts, and a timeout reference.

No added `.skip(`, `.only(`, `.todo(`, `retry`, `TODO`, `FIXME`, `console.`, or `debugger` hit exists.

The same sweep over `src` and `tests`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, finds these pre-existing or added hits:

- `src/core/types.ts:592`, `:619`, `:641`, `:653-654`, `:670-672`, `:683-684`
- `src/server/helpers.ts:491`, `:657`, `:662`, `:670`, `:676`, `:687`, `:697`, `:704`, `:713`, `:723`, `:727`, `:834-840`, `:851`, `:868`, `:876`, `:881`, `:994`, `:998`, `:1036-1038`, `:1045`, `:1059`, `:1065`, `:1068`, `:1088`
- `src/core/errors.ts:125`, `:140`
- `src/core/constants.ts:42`
- `tests/src/server/helpers.test.ts:609`, `:612`, `:1001`, `:1004`, `:1031`, `:1037`, `:1051`, `:1055`, `:1070`, `:1076`, `:1273`, `:1277-1278`, `:1287`, `:1290`, `:1323`, `:1587`, `:1690-1691`
- `tests/src/server/processes/Process.test.ts:339`, `:747`, `:750`
- `tests/src/server/factories.test.ts:100-101`
- `tests/src/server/processes/Supervisor.test.ts:53`, `:56`, `:97`, `:100`, `:106`
- `tests/src/server/processes/ProcessManager.test.ts:161`, `:164`
- `tests/src/server/processes/Session.test.ts:342`
- `tests/src/server/fixtures/child.mjs:20`, `:24`, `:107`
- `tests/guides.test.ts:565-566`, `:597`, `:668`, `:673`, `:729`, `:774`, `:1201`, `:1205`

**Parity.**

| Entity | Interface call-signature members | Guide Methods rows | Readonly data and guide surface |
|---|---|---|---|
| `ProcessCommand` | None; `src/core/types.ts:41-47` | None | `file`, `arguments`, `environment`, `input`, `isolated`; guide Surface row `guides/process.md:180` |
| `ProcessChildInterface` | `kill` `src/server/types.ts:49`; `once` `:63`; `off` `:82` | `guides/process.md:286-296` | `pid`, `exitCode`, `signalCode`; Surface row `:211` |
| `SupervisorFace` | None; all members are function-valued properties | None | `chunk`, `fault`, `relieve`, `close`, `terminal`, `teardown`; Surface row `:212` and notes `:220-224` |
| `ProcessInterface` | `send` `src/core/types.ts:295`; `stop` `:312`; `destroy` `:327` | `guides/process.md:242-254` | Surface members are listed at `guides/process.md:217-218` |
| `SessionInterface` | `write` `src/core/types.ts:511`; `end` `:532`; `stop` `:547`; `destroy` `:562` | `guides/process.md:256-269` | Surface members are listed at `guides/process.md:218-219` |
| `ProcessManagerInterface` | `process` `src/core/types.ts:752`; `processes` `:758`; `launch` `:776`; `stop` overloads `:783`, `:790`, `:796`; `destroy` `:808` | `guides/process.md:271-284` | `emitter`, `count`; Surface notes `guides/process.md:218-219` |
| `Supervisor` | Class methods `deliver`, `end`, `stop`, `destroy` at `src/server/processes/Supervisor.ts:277`, `:315`, `:332`, `:346` | `guides/process.md:298-310` | `stdout`, `pid`, `code`, `signal`, `evidence`, `settled`, `stopping`, `ending`, `exit`; notes `guides/process.md:226-233` |
| `Process` | Implements `ProcessInterface`; class at `src/server/processes/Process.ts:43` | `guides/process.md:242-254` | Interface Surface row and notes |
| `Session` | Implements `SessionInterface`; class at `src/server/processes/Session.ts:38` | `guides/process.md:256-269` | Interface Surface row and notes |
| `ProcessManager` | Implements `ProcessManagerInterface`; class at `src/server/processes/ProcessManager.ts:43` | `guides/process.md:271-284` | Interface Surface row and notes |

Every added public guide export token resolves through the correct barrel: core declarations through `src/core/index.ts:1-3`; server declarations and classes through `src/server/index.ts:1-8`. `Supervisor`, `SupervisorFace`, `ProcessChildInterface`, `createSession`, `Process`, `Session`, `ProcessManager`, `execute`, `executeSync`, and `detach` are documented or exported at their appropriate surface. `EmitterHooks`, `ChildProcess`, `Face`, and `{Entity}Interface` are explanatory or dependency identifiers, not process exports.

**Gates.** The report's § Gates records:

- `npm run format:check` — exit `0`
- `npm run lint:check` — exit `0`
- `npm run check` — exit `0`
- `npm run build` — exit `0`
- `npm test` — exit `0`

The corresponding evidence files exist. `gate-lint-check-json.txt` records `"diagnostics": []`. The build evidence includes an API Extractor compiler-version warning but exit `0`.

**Breaking.** The report records: “None. No published symbol was renamed or removed.” The tree adds `Supervisor` and moves implementation files without changing published specifiers. No consumer-side sweep is required.

**Writing sweep.** Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`, case-insensitive, over added prose lines in `guides/**`, `README.md`, source doc comments, and test titles/comments found:

- `guides/process.md:1435` — “send new work”
- `src/server/processes/Supervisor.ts:61` — `new Supervisor`
- `src/server/processes/Supervisor.ts:258` — `new Supervisor`
- `src/server/processes/Supervisor.ts:272` — `new TextEncoder`
- `tests/src/server/processes/Supervisor.test.ts:105` — “just past”

These are the complete hits. The count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` finds no added hit.

## Distillate

- `process-subj-1`: `src/server/types.ts:93,102` | diff present yes | old form hits 0 | report matches yes
- `process-subj-2`: `guides/process.md:211,286-296`; examples at `src/server/types.ts:45-82` | diff present yes | old form hits 0 | report matches yes
- `process-subj-3`: `README.md:8-18,64-76` | diff present yes | stale omission hits 0 | report matches yes
- `process-subj-4`: `tests/setupServer.ts:5,14` | diff present yes | old form hits 0 | report matches yes
- `process-subj-5`: `src/core/types.ts:47` | diff present yes | old form hits 0 | report matches yes
- `process-subj-6`: `guides/process.md:1438-1439` | diff present yes | old form hits 0; no `launch` Vocabulary row | report matches yes
- `process-obj-1`: `src/server/processes/{Process,ProcessManager,Session,Supervisor}.ts`; mirrored tests | diff present yes | stale real path hits 0; 2 synthetic fixture hits | report matches yes
- `process-obj-2`: `src/server/index.ts:8`, `guides/process.md:76,298-310,1438`, `tests/guides.test.ts:110,200` | diff present yes | old stranded-form hits 0 | report matches yes
- `process-obj-3`: `tests/src/server/helpers.test.ts:1` | diff present yes | stale ordering hits 0 | report matches yes
- `process-obj-4`: `tests/src/server/factories.test.ts`, `tests/src/server/processes/Supervisor.test.ts` | diff present yes | missing-test path hits 0 | report matches yes
- `process-obj-5`: `helpers.test.ts:1700`, `Process.test.ts:765` | diff present yes | stale target waits 0; 4 unrelated `waitForDelay(200)` hits | report matches yes
- `process-obj-6`: `helpers.test.ts:1295,1334`, `Session.test.ts:518`, `tests/guides.test.ts:847` | diff present yes | bare split hits 0 | report matches yes
- `fleet-F1`: no helper or browser environment | diff present no | `isBrowserVuePath` hits 0 | report matches yes
- `fleet-F2`: no public `id` field shape | diff present no | public-id hits 0 | report matches yes

Scope tags: every status path is `owned`; shared paths: none; off-limits paths: none.

Residue: no added skip, only, todo, retry, TODO, FIXME, console, or debugger hit; timeout-related additions are listed under Evidence.

Writing hits: `guides/process.md:1435`, `src/server/processes/Supervisor.ts:61,258,272`, and `tests/src/server/processes/Supervisor.test.ts:105`; count-pattern hits: none.

## Unknowns

- The exact expanded Vitest command for the `process-obj-4` red controls is not recorded; the report retains `npx vitest run …`.
- `process-obj-6` readiness-budget adequacy has no measurement or control file; the report records it as not evidenced.
- The independent landing gate run was not performed here because the brief requires this lane to remain read-only; the supplied gate files record the writer's run.

## Journal

<!-- Driver-owned line. -->

## Deviation

No unexpected tree change is present. The current `git status --short` exactly matches `/home/user/work/evidence/conform-process.status`, and `git diff --check` exits `0`. All requested evidence files were readable. No required sweep was unreachable.