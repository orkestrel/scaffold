# Verify brief — U5 generated-readers (scaffold)

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/scaffold`, in this order

1. `node node_modules/typescript/bin/tsc --version`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build` (its `build:inventory` step regenerates `host.json`; that write is expected)
6. `npm test`
7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
8. `grep -rn "from 'typescript'\|node:vm\|runInNewContext" src tests configs --include=*.ts` (report every line; the expected reading is no line)
9. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). A red Vitest row that names the Oxlint language server, an `initialize` deadline, or a plain test timeout is re-run alone once with `npx vitest run --config vite.config.ts --no-cache --project <project> <file>` and both readings are reported; any other red row is reported as it stands. Do not re-run anything else.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`, where step 8 decides the line only when it prints a line. Return it as your final message and write it to `/home/user/scaffold/tmp/units/ts6-u5-verify-report.md`. No process diary.
