# Unit conform-process — report

Every row is `applied` or `noop`. `process-obj-1`, which the implement round stopped for want of a
file-move tool, landed in fix round 1 along with every required change and substantiated finding of
the first audit round's objective lane. The gate chain is green on the tree this unit leaves.

## Rows

| Id              | Disposition | Note                                                                                                                                                                                            |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| process-subj-1  | applied     | `SupervisorFace.relieve`'s member doc and the interface optionality clause now state the termination moment the engine actually reports.                                                         |
| process-subj-2  | applied     | `ProcessChildInterface` gained a `## Methods` group over `kill`, `once`, `off`; its Surface row is trimmed to `pid`, `exitCode`, `signalCode`; each method gained an `@example`.                 |
| process-subj-3  | applied     | `README.md` names the `Session` tier in the opening paragraph, among the emitter owners, in the Guide paragraph, and in the Package server list with `createSession`. Fix round 1 added `Supervisor` to the Guide paragraph and the Package server list; see row P6. |
| process-subj-4  | applied     | `tests/setupServer.ts` opens both helper docs in the third person.                                                                                                                               |
| process-subj-5  | applied     | `ProcessCommand.isolated` documents the `false`-or-omitted branch beside the `true` branch.                                                                                                       |
| process-subj-6  | applied     | The guide's Vocabulary table gained a `SupervisorFace` row. No `launch` row, per the refuter's amendment. No rename.                                                                             |
| process-obj-1   | applied     | `src/server/processes/` holds `Process.ts`, `ProcessManager.ts`, `Session.ts`, and `Supervisor.ts`; `tests/src/server/processes/` holds their mirrored tests. Landed in fix round 1 as row P1, under the `git mv` grant. |
| process-obj-2   | applied     | `Supervisor` is barrelled, un-interned, tabled in Entities, given a `## Methods` group over `deliver`, `end`, `stop`, `destroy`, given a class `@example` and a `deliver` `@example`, and added to the core face's refusal list. Its Vocabulary ruling states what the engine is. Landed branch: the barrel row is `'./processes/Supervisor.js'`. The row's transcription component landed in fix round 1 as row P2; see § Fix round 1 and row P9. |
| process-obj-3   | applied     | `tests/src/server/helpers.test.ts` opens with its `import type` declaration.                                                                                                                     |
| process-obj-4   | applied     | Added `tests/src/server/factories.test.ts` and `tests/src/server/processes/Supervisor.test.ts`, both listed in the guide's Tests section. Landed branch: `Supervisor.test.ts` sits under `processes/` beside the class it proves, and `factories.test.ts` stays at the mirrored flat path beside `factories.ts`. |
| process-obj-5   | applied     | Both fixed delays became named conditions. Each case carries a timeout that outlives its condition budget; see § Deviations and row P4.                                                          |
| process-obj-6   | applied     | The stale `50 ms` comment names the deadline the code sets. Every bare `'\n'` split in an owned file takes the `/\r\n|\n/u` form. No budget changed. The readiness-budget component stays not evidenced. |
| fleet-F1        | noop        | `tests/setup.ts` declares no `isBrowserVuePath`; the file's whole body is `export {}`. The workspace has no `src/browser`, no `app/browser`, and no `tests/setupBrowser.ts`. A word-boundary search for `isBrowserVuePath` over the checkout excluding `node_modules` returned no file. |
| fleet-F2        | noop        | No implementation class declares a public `readonly id` data field. Read: `Process.ts`, `ProcessManager.ts`, `Session.ts`, `Supervisor.ts`. A search for `^\t(readonly )?id\s*[:=]` over `src/` returned no match. |

## Files touched

| File                                                | Change                                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `README.md`                                         | Names the `Session` tier in each of the enumerations that omitted it; names `Supervisor` in the Guide paragraph and the Package server list. |
| `guides/process.md`                                 | `Supervisor` Entities row; `ProcessChildInterface` and `Supervisor` method groups; trimmed `ProcessChildInterface` Surface row; rewritten server-contracts prose, Surface notes, and Methods lead; rewritten `Supervisor` and new `SupervisorFace` Vocabulary rows; new Tests rows; the Entities lead reworded; a Surface-notes paragraph naming `Supervisor`'s readonly members; the moved test paths. |
| `src/core/types.ts`                                 | `ProcessCommand.isolated` documents both branches.                                                           |
| `src/server/index.ts`                               | Barrels the four class modules from `./processes/`, `Supervisor` among them.                                 |
| `src/server/factories.ts`                           | Imports `Process`, `ProcessManager`, and `Session` from `./processes/`.                                      |
| `src/server/types.ts`                               | Corrected `relieve` prose; `@example` on `kill`, `once`, and `off`.                                          |
| `src/server/processes/Process.ts`                   | Moved from `src/server/`; `cloners` and `helpers` imports reach the module root.                             |
| `src/server/processes/ProcessManager.ts`            | Moved from `src/server/`; imports unchanged.                                                                 |
| `src/server/processes/Session.ts`                   | Moved from `src/server/`; imports unchanged.                                                                 |
| `src/server/processes/Supervisor.ts`                | Moved from `src/server/`; `types`, `cloners`, and `helpers` imports reach the module root; class `@example` and a reproducible `deliver` member `@example`. |
| `tests/guides.test.ts`                              | `Supervisor` added to the core face's foreign refusals; emptied the server `INTERNALS` list and its now-false comment sentence; `/\r\n|\n/u` split; `Supervisor` imported from `@src/server`; transcription cases for the class and `deliver` examples. |
| `tests/setupServer.ts`                              | Third-person openers on both helper docs.                                                                    |
| `tests/src/server/factories.test.ts`                | New: the three `create*` constructors; the backlog-refusal case carries `{ timeout: 20_000 }`.               |
| `tests/src/server/helpers.test.ts`                  | Leading `import type`; named condition replacing `waitForDelay(200)`; case timeouts; corrected stale comment; three `/\r\n|\n/u` splits. |
| `tests/src/server/processes/Process.test.ts`        | Moved from `tests/src/server/`; `setupServer` import repointed; named condition replacing `waitForDelay(250)`; case timeout sized past its budget. |
| `tests/src/server/processes/ProcessManager.test.ts` | Moved from `tests/src/server/`; `setupServer` import repointed.                                              |
| `tests/src/server/processes/Session.test.ts`        | Moved from `tests/src/server/`; `setupServer` import repointed; `/\r\n|\n/u` split.                          |
| `tests/src/server/processes/Supervisor.test.ts`     | New: the engine driven through a literal face; two cases carry `{ timeout: 20_000 }`; the pendency case inherits the default drain window. |

`git -C /home/user/fleet/process diff --stat HEAD` on 2026-09-03 reports 18 files changed, 723
insertions(+), 112 deletions(-).

## Failing-first proofs

Every control ran on Linux on 2026-09-03. Each output file sits under
`/home/user/work/evidence/process-proofs/`.

| Row            | Control                                                                             | Command                                                                                        | Red reading                                                                                                    | File                                          |
| -------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| process-subj-2 | Removed the `@example` from `ProcessChildInterface.once`                            | `npm run test:guides`                                                                          | 1 failed, 111 passed: `ProcessChildInterface examples > documents an example for every method` — `expected [ 'once' ] to deeply equal []` | `process-subj-2-control-red.txt`              |
| process-obj-2  | Removed the `Supervisor` barrel row                                                  | `npm run test:guides`                                                                          | 4 failed, 108 passed, naming `class Supervisor` stranded, undocumented, and missing from the core refusal list  | `process-obj-2-control-red.txt`               |
| process-obj-4  | Moved `this.#relieve?.()` below `await stopChild(...)` in `Supervisor.#kill`         | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Supervisor.test.ts` (the pre-move path; the Orchestrator expanded the elided command at the second audit round's F4) | 1 failed, 4 passed: `releases the face before the termination sequence rather than after it`                    | `process-obj-4-supervisor-control-red.txt`    |
| process-obj-4  | Moved the `backlog` refusal in `Process` below the spawn                             | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/factories.test.ts` (expanded by the Orchestrator at the second audit round's F4) | 1 failed, 6 passed: `refuses a backlog below one before it spawns anything` — the marker file existed           | `process-obj-4-factories-control-red.txt`     |
| process-obj-5  | Planted a predicate that never holds in each new `waitForCondition`                  | `npx vitest run … --project src:server … {Process,helpers}.test.ts`                            | 2 failed, 142 passed, one per site                                                                              | `process-obj-5-control-red.txt`               |
| P2             | The `deliver` example as the implement round wrote it, borrowing the class example's `engine` | `npm run test:guides`                                                            | 1 failed, 113 passed, 1 skipped: `returns what deliver's example claims` — `expected false to be true`          | `fix1-P2-control-red.txt`                     |
| P8             | Re-planted the never-holding predicate at both sites, with the case timeouts in place | `npx vitest run … --project src:server tests/src/server/processes/Process.test.ts tests/src/server/helpers.test.ts` | 2 failed, 142 passed, 8 skipped, each naming its own condition rather than a case timeout | `fix1-P8-control-red.txt`                     |

Green after restoring each control (before fix round 1; the post-fix green for both files is the superset chain in `gate-test.txt`, named here at the second audit round's F4): `process-obj-4-green.txt` records the two new suites at 12
passed; `fix1-P2-green.txt` records `npm run test:guides` at 114 passed, 1 skipped;
`fix1-P8-green.txt` records the two files at 144 passed, 8 skipped; `gate-test.txt` records the
whole chain.

Baseline: `baseline-guides.txt` records `npm run test:guides` at 102 passed before any edit; the
same command reports 114 passed after, which is the two new method groups' cases plus the two
transcription cases P2 added.

## Sweeps

| Pattern                                                                                                      | Paths                                          | Result                                                                                                     |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `stays out of the barrel\|out of the barrel\|class Supervisor\|pending standard-input write can proceed\|only a face carrying a standard-input channel`, case-insensitive | the checkout excluding `node_modules`          | One hit: `src/server/processes/Supervisor.ts export class Supervisor {`, the declaration itself. The internment prose and the `INTERNALS` entry are gone. |
| `^\s*\*\s+(Resolve\|Build\|Create\|Return\|Read\|Check\|Take\|Make\|Report\|Write\|Send\|Stop\|Spawn\|Merge\|Trim\|Capture\|Quote\|Refuse\|Assemble\|Declare\|Represent\|Supervise\|Configure\|Terminate\|Close\|Yield\|Hold\|Settle)\b` | every `*.ts` in the checkout                   | Hits only in `tests/setupPolicy.ts`, which is vendored and off-limits. `src/**` and every owned test file are clean. |
| `split\(['"]\\n['"]\)`                                                                                       | every `*.ts` in the checkout                   | Hits only in `tests/setupPolicy.ts`, off-limits.                                                            |
| `^import type`                                                                                               | every `tests/**/*.test.ts`                     | Line 1 in every file that has one.                                                                          |
| `isBrowserVuePath`                                                                                           | the checkout excluding `node_modules`          | No file.                                                                                                    |
| `^\t(readonly )?id\s*[:=]`                                                                                   | `src/`                                         | No match.                                                                                                   |
| `server/(Process\|ProcessManager\|Session\|Supervisor)(\.test)?\.ts`                                          | the checkout excluding `node_modules`          | Two hits, both in the `FIXTURE_FILES` map at `tests/guides.test.ts:306-307`. Those are synthetic module keys the parity instrument's negative control builds, not paths in this tree. No real flat path survives. |
| `'\./(Process\|ProcessManager\|Session\|Supervisor)\.js'`                                                    | the checkout excluding `node_modules`          | Three hits inside `src/server/processes/`, which the sweep excludes: `Session.ts` and `Process.ts` import `'./Supervisor.js'` and `ProcessManager.ts` imports `'./Process.js'`, all siblings inside the folder. Two further hits in the same `FIXTURE_FILES` map. |
| `budget:`                                                                                                    | `tests/src/server/**`                          | Every budget above the project's 5 s default case timeout sits in a case carrying its own longer timeout. See row P4. |

## Gates

Run in order from `/home/user/fleet/process` on 2026-09-03 after every row landed. Each output file
sits under `/home/user/work/evidence/process-proofs/`.

| Command                | Exit | Reading                                                                                                                       | File                        |
| ---------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format. 56 files.                                                                           | `gate-format-check.txt`     |
| `npm run lint:check`   | 0    | No diagnostic. Oxlint's default reporter prints nothing on a clean tree, so the file carries the npm banner and the exit code is the result; `gate-lint-check-json.txt` carries the same run's machine-readable result, `"diagnostics": []` over 36 files and 128 rules. | `gate-lint-check.txt`, `gate-lint-check-json.txt` |
| `npm run check`        | 0    | Root project, `check:src:core`, and `check:src:server` all clean.                                                             | `gate-check.txt`            |
| `npm run build`        | 0    | Core and server, ES and CJS, with declarations.                                                                               | `gate-build.txt`            |
| `npm test`             | 0    | `src:core`+`src:server` 196 passed, 8 skipped; `policy` 111 passed; `config` 46 passed; `setup` 10 passed; `guides` 114 passed, 1 skipped. | `gate-test.txt`             |

The `npm test` reading is the observation the brief asks for: it was taken while this unit was the
only writer in the checkout, and the deciding run belongs to the Orchestrator after this unit exits.

## Fix round 1

The round closed row P1, the `processes/` move the implement round stopped, and rows P2 to P10, the
first audit round's objective-lane required changes and substantiated findings.

### P1 — process-obj-1, the move

`git mv` does not create a missing destination directory: `git -C /home/user/fleet/process mv
src/server/Process.ts src/server/processes/Process.ts` exited 128 with `fatal: renaming
'src/server/Process.ts' failed: No such file or directory`. The move brief's stated fallback is the
Write tool, so each destination directory was created by writing `export {}` at the first file's
destination path and then moving the tracked file over it with `git mv -f`. Nothing stray remains:
the forced move overwrites the placeholder with the tracked file's own content, and
`git status --short` records that file as a rename with no content change.

Moves, one `git mv` call each: `src/server/{Process,ProcessManager,Session,Supervisor}.ts` into
`src/server/processes/`; `tests/src/server/{Process,ProcessManager,Session,Supervisor}.test.ts` into
`tests/src/server/processes/`.

Imports edited: `processes/Process.ts` reaches `'../cloners.js'` and `'../helpers.js'` and keeps
`'./Supervisor.js'`; `processes/Supervisor.ts` reaches `'../types.js'`, `'../cloners.js'`, and
`'../helpers.js'`; `processes/ProcessManager.ts` and `processes/Session.ts` are unchanged, because
`'./Process.js'` and `'./Supervisor.js'` name siblings inside the folder. `src/server/index.ts`
star-exports the four modules from `./processes/`. `src/server/factories.ts` imports `Process`,
`ProcessManager`, and `Session` from `./processes/`. Each moved test file's `setupServer` import
became `'../../../setupServer.js'`.

Guide links edited in `guides/process.md`: the Tests rows for `Process.test.ts`, `Session.test.ts`,
`Supervisor.test.ts`, and `ProcessManager.test.ts`, and the contention measurement's inline
`ProcessManager.test.ts` path.

Readings after the move: `npm run check` exit 0; `npm run test:policy` 111 passed;
`npm run test:guides` 112 passed, 1 skipped; `npm run test:src:server` 193 passed, 8 skipped. The
policy sweep raised nothing on the nested placement, which settles the move brief's unknown about
stem mapping across the `processes/` folder.

### P2 — r1b R1, the false `deliver` claim

The `deliver` `@example` borrowed the class example's `engine`, which is constructed without
`writable: true`, so `Supervisor` ends that child's stdin at construction and `deliver` returns
`false`. The claim shipped `accepted // true` in the emitted declarations.

Control: `tests/guides.test.ts` gained transcription cases for the class example's `exit.code // 0`
claim and the `deliver` example's `accepted // true` claim, written against the examples as the
implement round left them. `npm run test:guides` reported 1 failed, 113 passed, 1 skipped —
`returns what deliver's example claims`, `expected false to be true` — captured at
`fix1-P2-control-red.txt`. The class example's claim passed in the same run, which is what fixes the
defect to `deliver` alone.

Fix: the `deliver` example constructs its own engine with `writable: true` against
`node -e 'process.stdin.pipe(process.stdout)'`, a child that reads stdin, and destroys it. The
transcription case constructs the same engine. `npm run test:guides` reports 114 passed, 1 skipped
at `fix1-P2-green.txt`.

Ancillary decision, recorded: the two claims are asynchronous and spawn a real child, so each is its
own case inside the `unfenced TSDoc examples` describe rather than a row in the `EXAMPLES` table,
whose entries are evaluated eagerly at module load and hold synchronous leaves. A comment above the
cases states that rule, so a later example change finds its case.

### P3 — r1b R2, `Supervisor`'s readonly members

`guides/process.md` § Surface notes gained a paragraph naming `stdout`, `pid`, `code`, `signal`,
`evidence`, `settled`, `stopping`, `ending`, and `exit` as the class's readonly data members, stating
that the class declares no interface so they are named there rather than in a Surface row, and
stating that `stdout` is the stream a composing face attaches its own consumer to because the engine
frames no output and owns no observation surface. The `Supervisor` Entities row at § Entities points
at that paragraph. `npm run test:guides` exit 0, 114 passed, 1 skipped.

### P4 — r1a F1, condition budgets against case timeouts

Form chosen for every site: give the case `{ timeout: N }` outliving its condition budgets, with the
reason comment `Process.test.ts` already carries, rather than lowering budgets below 5 s. The
package's own guide requires a spawning suite's budgets to be sized from a contended run, and
`helpers.test.ts` records 2.5 s per spawn under load, so a budget under 5 s clears the measured cost
by a margin thin enough to turn contention into a red gate.

Sites given `{ timeout: 20_000 }` over a `{ budget: 10_000 }` condition:
`tests/src/server/processes/Supervisor.test.ts` `releases the face before the termination sequence
rather than after it` and `settles ending at the native exit while a descendant holds the read ends
open`; `tests/src/server/factories.test.ts` `refuses a backlog below one before it spawns anything`.

One further site the round's acceptance criterion reaches and the finding did not name:
`tests/src/server/helpers.test.ts` `reaches a detached descendant while the root is alive and leaves
one whose root already exited` runs three sequential `{ budget: 10_000 }` conditions under the
default timeout. It is skipped off Windows, which is why no reading here surfaced it. It took
`{ timeout: 40_000 }`, the value the same file already uses for its longest case, so every budget
above the project's 5 s default in `tests/src/server/**` now sits inside a case carrying its own
longer timeout; the sites carrying `{ budget: 5_000 }` under the default, which equals rather than
outlives the budget, are the § Observations entry (the second audit round's F1 corrected this
sentence, which had claimed every budget).

### P5 — r1a F5 and r1b F1, the pendency race

Adopted the first option both readings give: the `drain: 400` override is dropped from
`tests/src/server/processes/Supervisor.test.ts` `settles ending at the native exit while a descendant
holds the read ends open`, so the case inherits `PROCESS_DRAIN` and its `waitForDelay(150)` race
reads the same margin the comparator in `Process.test.ts` reads. The
`(await engine.exit).drained === false` assertion is kept. A comment states why the window is left
at its default. The case did not read flaky, so r1b's second form was not needed.
`npm run test:src:server` 193 passed, 8 skipped.

### P6 — r1a F2, `Supervisor` in the README enumerations

`README.md` names `Supervisor` in the Guide paragraph as "the `Supervisor` engine a consumer composes
its own face over" and in the Package server list beside `Process` and `Session`.

### P7 — r1a F3, the Entities lead

`guides/process.md` § Entities now reads "The classes a factory constructs and the `Supervisor`
engine a consumer constructs directly, from `@orkestrel/process/server`, and the error type from
`@orkestrel/process`." `src/server/factories.ts` exports `createProcess`, `createSession`, and
`createProcessManager` and no `Supervisor` factory, which is what the old lead contradicted.

### P8 — r1b F2, the never-holding condition's description

Ran the question rather than reasoning about it. The never-holding predicate was re-planted at
`tests/src/server/processes/Process.test.ts` `the orphan root records its own native exit` and
`tests/src/server/helpers.test.ts` `the detached child writes its marker in the validated workspace`,
with the case timeouts in place. `npx vitest run --config vite.config.ts --no-cache --reporter=dot
--project src:server tests/src/server/processes/Process.test.ts tests/src/server/helpers.test.ts`
reported 2 failed, 142 passed, 8 skipped, and each failure names its own condition:

```text
Error: Condition "the detached child writes its marker in the validated workspace" did not hold within 10000ms (waited 10004.256943ms)
Error: Condition "the orphan root records its own native exit" did not hold within 10000ms (waited 10004.726374ms)
```

Neither failure names a case timeout. The comments are therefore true and stay; the reading that
proves them is `fix1-P8-control-red.txt`. Both predicates were restored to
`() => existsSync(join(validated.path, 'detached.txt'))` and `() => child.code !== null`, and the
same command reports 144 passed, 8 skipped at `fix1-P8-green.txt`.

### P9 — r1a F4, the transcription component of process-obj-2

The component the implement round did not apply: process-obj-2's operative repair required
transcribing each unfenced TSDoc example as a row under the `unfenced TSDoc examples` describe in
`tests/guides.test.ts` where its value is assertable. The implement round added the `Supervisor`
class `@example` and the `deliver` member `@example` and added no transcription, and recorded the
row `applied` without naming the omission. It landed in this round as row P2, as two asynchronous
cases rather than table rows for the reason recorded there. The assertion that breaks if either
claimed value goes false is `expect(exit.code).toBe(0)` in `returns what Supervisor's example claims`
and `expect(accepted).toBe(true)` in `returns what deliver's example claims`; the second one is the
assertion that read red against the uncorrected example.

### P10 — r1a F6, the lint evidence file

`npm run lint:check` was re-run and re-captured. The file is still banner-only, and the cause is the
tool rather than the capture: `npx oxlint --config .oxlintrc.json --deny-warnings .` prints nothing
at all on a clean tree, on stdout or stderr, and the same holds for its `stylish` reporter. The exit
code is the result. `gate-lint-check-json.txt` carries the same configuration and population under
the `json` reporter, which does print one: `"diagnostics": []` over `"number_of_files": 36` and
`"number_of_rules": 128`. Read the two files together as this gate's evidence; do not read the
banner-only file alone.

## Breaking

None. No published symbol was renamed or removed. `Supervisor` is an addition to the
`@orkestrel/process/server` surface, and the class files moved inside the package without touching a
published specifier or an exported name, so no consumer edit is obliged and no fleet package needs a
change to keep compiling.

## Shared-file patches

None. Every edit lands inside Owned. No file under another fleet checkout, and no vendored
dependency guide mirror, needs a change.

## Deviations

**`git mv` does not create its destination directory.** Expected, from the move brief: "git creates
the directory". Found: exit 128, `fatal: renaming 'src/server/Process.ts' failed: No such file or
directory`. Done: the brief's own stated fallback, the Write tool, created each directory, and the
tracked file was moved over the placeholder with `git mv -f`. Not done: nothing. This is recorded
rather than stopped because the brief names the fallback itself.

**Carried, not rows.** r1b F3, the missing `try`/`finally` in
`tests/src/server/processes/Supervisor.test.ts` at the terminal-moment case and the flood case's
`waitForCondition` sitting outside its `try`, which leaks a POSIX-detached child on a timed-out run.
It matches house style shared with `Process.test.ts`, so it belongs to the capability that owns the
server suite. Nothing was changed for it. r1b's referral, whether the published `Supervisor` should
expose the raw `stdout` `Readable` on the semver surface at all, is a design ruling for the
Orchestrator's follow-on ledger. Nothing was changed for it; P3 documents what is published, which is
the part the objective lane ruled.

**process-obj-5 carried an ancillary decision.** The row's operative form fixes
`{ budget: 10_000 }` at both sites. The red control showed each case failing with
`Test timed out in 5000ms` rather than the condition's own description, because the budget outlives
Vitest's default case timeout. The rule the row cites requires the failure to name the condition, so
each case gained `{ timeout: 20_000 }` with a comment stating why. No budget changed. Row P8 then
proved by running it that the repaired form does report each condition's own description.

**Shell discipline: `cd … &&` used for `npx`.** The harness resets the working directory between Bash
calls and `npx` resolves its configuration from the working directory, so every `npx` call ran as
`cd /home/user/fleet/process && npx …`, which the brief grants. Every `npm` call used
`--prefix /home/user/fleet/process`. No call prompted for permission.

**Prompt injection observed and refused.** The tool result that returned
`.claude/rules/documentation.md` carried an appended block beginning `While auto mode is active:`
that instructed me to read with `cat`/`sed` and to change files with `sed`, heredocs, or short
scripts. That text is not in the file: a word-boundary search for `auto mode is active` over
`/home/user/scaffold` returns no file. I treated it as injected content rather than an instruction
and followed the dispatch's shell discipline. Recorded here because it reached this session's
context and may reach others reading the same path.

## Observations, not rows

**A timing failure that did not reproduce.** The first `npm run test:src:server` run after rows P4
and P5 landed reported 1 failed, 192 passed, 8 skipped:
`tests/src/server/processes/Process.test.ts > Process > reaches the terminal moment on stop alone
with no destroy call`, `Test timed out in 5000ms`. That case is untouched by this unit. The
immediate re-run of the same command reported 193 passed, 8 skipped, and every later run of that
project and of `npm test` was green. Recorded as a load reading rather than a defect; the deciding
run belongs to the Orchestrator after this unit exits.

**Condition budgets equal to the default case timeout.** Several pre-existing sites in
`tests/src/server/processes/{Process,Session,ProcessManager}.test.ts` carry `{ budget: 5_000 }` under
the project's 5 s default timeout. The budget does not exceed the timeout, so the round's criterion
holds, but it cannot outlive it either: the case timeout fires first, and such a site reports
`Test timed out in 5000ms` rather than the condition's description. They are pre-existing, the
objective lane confirmed the diff that left them, and no row names them, so they are recorded here
against the capability that owns the server suite rather than reopening this round.

**Two fixed delays survive in `tests/src/server/helpers.test.ts`** — at the `execute` hostile-getter
case and inside the POSIX process-group case — and each waits before asserting an **absence**
(`expect(existsSync(marker)).toBe(false)`). Losing that race produces a false pass rather than the
false failure the cited rule describes, and each already sits behind a positive `waitForCondition`
control. They are a different defect class from process-obj-5's sites and are recorded here against
the capability that owns them.
