# Unit process-tests — the server suite's cleanup and timing rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/process`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of process, from the landed tip.

## Objective

Close the audit findings the conformance rounds recorded against process's server test suite: every spawning case releases its engine and its descendant on every exit path, and every case's timeout outlives the condition budgets it awaits.

## Context

**Law.** `AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md`; `.claude/rules/portability.md` (processes). Never use a mock, spy, fake, or fake clock.

**Evidence.** Round-2 objective lane F2 and F3, round-2 checker F-SUP-CLEANUP, round-1b objective F3 (`units/l2a/process-objective-r1b.md`, `units/l2a/process-objective-r2.md`, `tmp/cursor/process-r2-checker-luna.result.md` retained under `units/l2a/`). The leak is real: at 16:20 UTC two `tests/src/server/fixtures/child.mjs late` fixtures spawned by the suite had been orphaned for 92 minutes (parent pid 1, ignoring SIGTERM), and the Orchestrator ended them with SIGKILL.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/process run <script>`, `npm --prefix /home/user/fleet/process test`, `cd /home/user/fleet/process && npx vitest run …` with output captured under `/home/user/work/evidence/process-proofs/`, `git -C /home/user/fleet/process status --short`, `git -C /home/user/fleet/process diff`, `node /home/user/scaffold/tmp/work/evidence.mjs process`, `cd /home/user/fleet/process && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `tests/src/server/processes/Supervisor.test.ts`, `tests/src/server/processes/Process.test.ts`, `tests/src/server/helpers.test.ts`, `tests/guides.test.ts`, `/home/user/work/evidence/process-proofs/**`.

**Off-limits.** Everything else, `src/**` included.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. **F-SUP-CLEANUP and r1b F3.** In `Supervisor.test.ts` (the cases at `:52-86` and `:100-148` on the tip, and every other case that spawns), move each awaited condition budget inside a `try` whose `finally` always awaits `engine.destroy()`; where the case records a descendant pid, keep it optional, end the descendant conditionally in the same `finally`, and assert nothing inside the `finally`. Apply the same shape to the orphan case's condition and to `Process.test.ts` where it shares the house style. Prove the row: before the edit, plant a failing assertion inside one spawning case, run the file, and read the process table for the fixture that survives (`ps -eo pid,ppid,args` is not in the granted forms, so capture `npm --prefix … run test:server` output only and read the case's own cleanup log); after the edit, the same plant leaves no fixture. Record both runs.
2. **F2.** `tests/src/server/helpers.test.ts:608-609` claims the case outlives the condition budgets while its `{ timeout: 40_000 }` at `:612` can expire before the third sequential 10 s condition: reword the comment to claim only that the case outlives each condition budget, or raise the timeout to 60 s; choose the reading the case's conditions justify and record it.
3. **F3.** The two spawning cases at `tests/guides.test.ts:1299-1335` run in the `guides` project under the 5 s default: give both `{ timeout: 20_000 }` with the reason comment `tests/src/server/processes/Supervisor.test.ts:52-53` uses.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs process`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/process-tests-report.md`: per row `applied`, the proof runs with their files, each gate with its exit code, the audit line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when a case cannot release its engine without a change under `src/**`, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. No spawning case awaits a condition outside a `try` whose `finally` destroys the engine.
2. The comment or timeout at `helpers.test.ts:608-612` is consistent with the conditions the case awaits.
3. The two guides cases carry the 20 s timeout with the reason comment.
4. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.

## Review evidence

`/home/user/work/evidence/conform-process.diff` and `.status` after the unit; the report; the proof captures.
