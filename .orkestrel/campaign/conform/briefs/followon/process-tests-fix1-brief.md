# Unit process-tests fix round 1 — three more cases whose cleanup skips the primary child

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/process`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 checker's refutation of claim 1: the condition waits at `tests/src/server/processes/Process.test.ts:886-905`, `:927-969`, and `:1002-1019` sit in cases whose `finally` blocks do not destroy the primary child. Every spawning case in that file ends with a `finally` that awaits the child's `destroy()`. Claims 5 and 9 are ruled in the verdict file (the `planted` hit is in the vendored `tests/policy.test.ts`, outside the population; the reason comments in `tests/guides.test.ts` are the unit's own row 3).

## Context

**Law.** `/home/user/scaffold/.claude/rules/tests.md`; the process-tests brief (`/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/process-tests-brief.md`) whose row 1 this round completes.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/process run <script>`, `npm --prefix /home/user/fleet/process test`, `cd /home/user/fleet/process && npx vitest run …` with output captured under `/home/user/work/evidence/process-proofs/`, `cd /home/user/fleet/process && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/process status --short`, `git -C /home/user/fleet/process diff`, `node /home/user/scaffold/tmp/work/evidence.mjs process`, `cd /home/user/fleet/process && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `tests/src/server/processes/Process.test.ts`, `/home/user/scaffold/tmp/units/followon/process-tests-report.md`.

**Off-limits.** Everything else.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command. Never use a mock, spy, fake, or fake clock.

## Rows

1. Read every `waitForCondition` call site in `Process.test.ts` and the `finally` of the case it sits in; for each case whose `finally` does not await the primary child's `destroy()` (the three the checker named and any other), add `await child.destroy()` (the case's own child binding) to the `finally`, keeping an existing descendant kill and asserting nothing inside the `finally`.
2. Run `cd /home/user/fleet/process && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/processes/Process.test.ts > /home/user/work/evidence/process-proofs/fix1-process-test.txt 2>&1` and read it green.
3. Record the row in the report under a `## Fix round 1` section with the cases changed by title.

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each, then `cd /home/user/fleet/process && npx scaffold audit --offline`, then `node /home/user/scaffold/tmp/work/evidence.mjs process`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Return the `## Fix round 1` section with each gate command and its exit code and the audit's summary line as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a case has no child binding a `finally` can reach, or when a gate reddens.

## Acceptance criteria

1. Every `waitForCondition` in `Process.test.ts` sits in a case whose `finally` awaits the primary child's `destroy()`.
2. The file's run reads green in `fix1-process-test.txt`; every gate exits 0; the audit prints its single zero-drift line.
