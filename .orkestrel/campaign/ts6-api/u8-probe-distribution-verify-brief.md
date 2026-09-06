# Verify brief — U8 probe-gates, the release-mode distribution proof (probe)

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit; never publish.

## Context

Probe's U7 landed as `d24de2e`; its `format:check`, `lint:check`, `check`, `build`, and `npm test` ran green in `u7-fix-f-verify-report.md` apart from one timing row the Orchestrator re-ran green alone, and `u7-fix-g-verify-report.md` re-proved the guide gates. The release-mode proof has not run over the landed tree. Scaffold's own proof passes under npm 11 (`/opt/npm11/bin`) and fails under npm 10 on a materialized install, a host condition; run probe's under npm 11 and report the npm version the run used.

## Commands, from `/home/user/fleet/probe`, in this order

1. `git log --oneline -1` and `git status --short`
2. `PATH=/opt/npm11/bin:$PATH npm --version`
3. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
4. `PATH=/opt/npm11/bin:$PATH npm pack --dry-run 2>&1 | tail -25` (the packed file list; report it whole)
5. `git status --short` (expected unchanged from step 1)

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). Report a red row as it stands with the case name and the assertion; do not re-run anything.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`. Return it as your final message and write it to `/home/user/fleet/probe/tmp/units/ts6-u8-probe-distribution-verify-report.md`. No process diary.
