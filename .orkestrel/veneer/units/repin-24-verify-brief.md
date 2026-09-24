# Unit REPIN-24-VERIFY — gate evidence for Veneer `a39480d` before its `main` push

## Role and engine

`verifier` on Sonnet, a native Claude subagent. Run the commands directly and spawn nothing.

## Objective

Report the exit code and the failure excerpts of each gate below, run on Veneer's session branch at `a39480d`.

## Context

**Evidence.** `/home/user/veneer` on branch `claude/inspiring-allen-t4qzv1` at `a39480d`: the re-pin of `@orkestrel/test`
to `^0.0.24` (`867b63f`), the RP landing (`e9fdd30`), and one roadmap row (`a39480d`). The Orchestrator's tracked runs on
this tree already read `format:check`, `lint:check`, `check`, `test:setup` (319 passed), `test:setup:browser` (83),
`test:guides`, and every journey variant with `CAPTURE=1` and unset (252 of 252 each)
(`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/veneer-repin-0.0.24.log.txt` and
`veneer-repin-journey-2.log.txt`).

**Law.** `/home/user/scaffold/AGENTS.md` § Work process (the gate order); `.agents/orchestration.md` § Permission floor.
Skill: none. Guide: none.

**Host.** Linux, bash, working path `/home/user/veneer`. Put npm 11 first on the path for every command:
`export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH` and
`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. npm 10 refuses this package (`EBADDEVENGINES`). Chromium 141 is the
browser. Two other units run browser tests in `/home/user/veneer-apc` and `/home/user/veneer-apt`; a timeout under that
load is an observation to report, not a verdict.

**Standing conditions.** `test:src:browser` is red on Chromium 141 at the engine session's `e42b5fa` and every later
`main`: 56 failed of 799, in `Tooltip.test.ts` (48), `sanitizers/NativeSanitizer.test.ts` (6), `validators.test.ts` (1),
and `Placement.test.ts` (1), because Chromium 141 has no `Element.setHTML`. The engine session's J-SANITIZER carries
the fix. Report this project's failures by file against that list.

## Unknowns

None.

## Scope

Read-only. Write logs only under `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/repin-24-verify/`.
Edit no file, fix nothing, commit nothing, install nothing, and run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Run no mutating `format` or `lint` script.

## Execution

Run each command from `/home/user/veneer`, in this order, each to its own log with the exit code appended, and continue
past a failure: `npm run build`, `npm run test:src:core`, `npm run test:src:browser`, `npm run test:src:styles`,
`npm run test:app`, `npm run test:policy`, `npm run test:config`, `npm run test:conformance`. Then confirm
`git -C /home/user/veneer status --short` is empty and `git log -1 --format=%h` is `a39480d`.

## Output

Return a table: gate, exit code, passed and failed counts, log path. Then, for each failing gate, each failing test's
file and title with its first error line, and for `test:src:browser` whether every failure sits in the standing list.
No process diary.

## Deviation contract

Stop and report if the head is not `a39480d` or the tree is dirty before the first command.

## Acceptance criteria

1. Every command in Execution ran and its exit code is reported with its log path.
2. Every failure is quoted with its file, title, and first error line.

## Review evidence

The logs.
