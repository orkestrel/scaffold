# Verify brief — U5-fix (scaffold), the gates that read the changed files

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/scaffold`, in this order

1. `npm run format:check`
2. `npm run lint:check`
3. `npm run check`
4. `npm run test:setup`
5. `npm run test:guides`
6. `npm run test:src:core`
7. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). Report a red row as it stands with the case name and the assertion; do not re-run anything. The whole chain ran green over U5's tree in `u5-verify-report.md`, and the fix changed three test files, so this brief names the gates that read them.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`. Return it as your final message and write it to `/home/user/scaffold/tmp/units/ts6-u5-fix-verify-report.md`. No process diary.
