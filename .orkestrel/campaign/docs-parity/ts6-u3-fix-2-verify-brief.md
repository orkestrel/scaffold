# Verify brief — U3-fix-2 (scaffold), the whole U3 change

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/scaffold`, in this order

1. `node node_modules/typescript/bin/tsc --version`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build` (its `build:inventory` step regenerates `host.json`; that write is expected)
6. `npm test`
7. `cmp dist/src/server/index.d.ts /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/u1/scaffold-server/rollup.d.ts` (report the exit code; 0 is byte-identical)
8. `diff dist/src/core/index.d.ts /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/u1/scaffold-core/rollup.d.ts` (report the exit code and every hunk verbatim, with `<` lines named as the current build and `>` lines as U1's baseline; a non-zero exit is expected and is not a red gate)
9. `ls "$(node -p 'require("node:os").tmpdir()')" | grep -c "orkestrel-declarations-"` (report the number printed; the expected reading is 0)
10. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). A red Vitest row that names the Oxlint language server, an `initialize` deadline, or a plain test timeout is re-run alone once with `npx vitest run --config vite.config.ts --no-cache --project <project> <file>` and both readings are reported; any other red row is reported as it stands. Do not re-run anything else.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`, where steps 7, 8, and 9 never decide the line. Return it as your final message and write it to `/home/user/scaffold/tmp/units/ts6-u3-fix-2-verify-report.md`. No process diary.
