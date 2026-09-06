# Verify brief — U7-fix-g (probe), the guide after the cost rows

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/fleet/probe`, in this order

1. `npm run format:check`
2. `npm run lint:check`
3. `npm run test:guides`
4. `npm run test:policy`
5. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). Report a red row as it stands with the case name and the assertion; do not re-run anything. The gate chain's `check`, `build`, and `npm test` ran green over this tree apart from the guide's prose in `u7-fix-f-verify-report.md`, and fix-g changed prose only, so this brief names the gates that read the guide.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`. Return it as your final message and write it to `/home/user/fleet/probe/tmp/units/ts6-u7-fix-g-verify-report.md`. No process diary.
