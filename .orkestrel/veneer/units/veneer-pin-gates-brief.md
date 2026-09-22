# Unit VENEER-PIN-GATES — Independent gate evidence for veneer re-pinned to @orkestrel/test 0.0.19 (F3)

## Role and engine

`verifier` on Sonnet, a native Claude subagent. Perform the runs directly and spawn nothing.

## Objective

Report exit-code truth for the acceptance gate chain of `/home/user/veneer` on branch
`claude/inspiring-allen-t4qzv1` (HEAD `4a58ee2`) with the working tree carrying the F3 re-pin of
`@orkestrel/test` to `^0.0.19`, and the per-project test reading that the chained `npm test` script
hides behind its first failure.

## Context

**Evidence.** `git status --short` in `/home/user/veneer` prints ` M package-lock.json` and
` M package.json` and nothing else. `package.json` line 99 reads `"@orkestrel/test": "^0.0.19"`;
`package-lock.json` resolves `node_modules/@orkestrel/test` to version `0.0.19` from
`https://registry.npmjs.org/@orkestrel/test/-/test-0.0.19.tgz`. `node_modules/.orkestrel-lock.sha256`
equals `sha256sum package-lock.json` (`dad47038…543e7`). The retained baseline reading at
`/home/user/scaffold/.orkestrel/veneer/units/veneer-baseline-2.log.txt` (taken 2026-09-22 against
HEAD `a04fb7c` with the Test tip tarball) recorded `format:check` 0, `lint:check` 0, `check` 0,
`build` 0, `test` 1, the test chain stopping inside `test:src` on two `src:browser` cases.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md`;
`/home/user/scaffold/.claude/rules/workspace.md`; skill: none; guide: `/home/user/veneer/guides/veneer.md`
(read for orientation only; nothing here edits it).

**Installed primitives.** `@orkestrel/test` 0.0.19 under `/home/user/veneer/node_modules/@orkestrel/test`.
Not relevant to a read-only gate run beyond confirming its presence.

**Host.** Linux, bash, Node 22. The host `npm` on `PATH` is 10.9.7 and veneer's `devEngines` demands
npm `>=11.6.0` with `onFail: error`, so every `npm` invocation in this unit runs with npm 11.19.1
prepended to `PATH`:
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(confirm with `npm --version` → `11.19.1` before the first gate). Playwright Chromium 141 at
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (the environment already carries this). Network is
available. Foreground commands are capped at 10 minutes each; the full `npm test` chain took under
15 s to its first failure at baseline and the build under 10 s, so no single command approaches
the cap, but run each command as its own call rather than one chained call.

**Measurements.** Baseline exit codes as in Evidence. The two `src:browser` failures at baseline
were `tests/src/browser/Button.test.ts` "dispatches the completed state once as a bubbling
non-cancelable event" (`expect(event?.target).toBe(host)` received `null`) and
`tests/src/browser/helpers.test.ts` "dispatches the supplied type and detail synchronously through
the parent" (`expect(event.target).toBe(host)` received `null`).

**Control identifiers.** none.

**Standing conditions.** The dirty `package.json` and `package-lock.json` are the subject of this
unit; read them as expected and do not touch them. The two `src:browser` cases named under
Measurements are a known host-dependent failure on Chromium 141 (carrier: roadmap unit F4
HOST-OBSERVATIONS); report them exactly as they read and diagnose nothing. Because `npm test`
chains its sub-scripts with `&&`, a red `test:src` stops the chain, so the per-project commands
listed under Commands run each remaining project on its own to give a complete reading.

## Unknowns

Whether any project past `test:src` is red on this tree; the per-project commands report that.

## Scope

**Owned.** none (read-only unit).

**Shared (report-only).** none.

**Off-limits.** every file in `/home/user/veneer` and `/home/user/scaffold`; no edit, no install,
no `git` command other than `git status --porcelain` and `git rev-parse HEAD`.

**What asserts the state this change ends.** not applicable (no change).

**Tools and limits.** Bash, Read, Grep, Glob. No fix, no edit, no install other than what the named
scripts perform themselves (`build` writes `dist/`, which is allowed).

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Commands, in order

Run each from `/home/user/veneer` with the npm 11 `PATH` prefix set.

1. `git rev-parse HEAD && git status --porcelain`
2. `npm --version`
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run build`
7. `npm run test:src:core`
8. `npm run test:src:browser`
9. `npm run test:src:styles`
10. `npm run test:app`
11. `npm run test:journey`
12. `npm run test:policy`
13. `npm run test:config`
14. `npm run test:setup`
15. `npm run test:setup:browser`
16. `npm run test:conformance`
17. `npm run test:guides`
18. `git status --porcelain` (after every gate; report any path beyond the two dirty manifests)

## Output

The Gate Report: per command, PASS or FAIL with the exit code and on FAIL the exact failing excerpt
with the file and line it points to and the test's title; for each vitest project the
`Test Files` and `Tests` summary lines verbatim; the overall verdict; anomalies one line each.
Nothing else.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — if `npm --version` does not print `11.19.1` or if any command hangs past 8 minutes.
Decide, record, and carry on from nothing else: every other outcome is a reading to report.

## Acceptance criteria

1. Every command in the list ran and has a recorded exit code.
2. The final `git status --porcelain` lists only ` M package-lock.json` and ` M package.json`.

**Observations, not criteria.** The whole-suite readings themselves; the Orchestrator rules on them.

## Review evidence

The Gate Report is the evidence.
