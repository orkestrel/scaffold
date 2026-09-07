# Verify brief — U10 database-readers (database)

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `npm install` (it restores the registry copies over the installed head starts), `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/fleet/database`, in this order

1. `grep -rn "from 'typescript'\|from \"typescript\"\|require('typescript')" tests src configs` (expected: no line)
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run test:setup`
6. `npm run test:guides`
7. `npm test`
8. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). A red Vitest row that names a plain test timeout is re-run alone once with `npx vitest run --config vite.config.ts --no-cache --project <project> <file>` and both readings are reported; any other red row is reported as it stands. Do not re-run anything else.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`, where step 1 decides the line only when it prints a line. Return it as your final message and write it to `/home/user/fleet/database/tmp/units/ts6-u10-verify-report.md`. No process diary.
