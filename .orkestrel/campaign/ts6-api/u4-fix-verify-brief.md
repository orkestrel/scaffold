# Verify brief — U4-fix (scaffold), the whole U4 change, with the retained instruments run independently

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
8. `bash .orkestrel/campaign/ts6-api/instruments/u4/regenerate.sh` (report every line it prints; the expected reading is `repair exit=0`, `cmp exit=0`, and `0` compiler names)
9. `bash .orkestrel/campaign/ts6-api/instruments/u4/proof.sh` (report every line it prints; the expected reading is `baseline exit=0` with every test passed, and each plant reporting lines naming it with `vitest exit=1`; then quote the first `TS2741` line of each of `<scratchpad>/u4/logs/extra.log.txt` and `<scratchpad>/u4/logs/undeclared.log.txt`, where `<scratchpad>` is `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad`)
10. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). A red Vitest row that names the Oxlint language server, an `initialize` deadline, or a plain test timeout is re-run alone once with `npx vitest run --config vite.config.ts --no-cache --project <project> <file>` and both readings are reported; any other red row is reported as it stands. Do not re-run anything else. Steps 8 and 9 write under the scratchpad alone; their scripts state that.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`, where steps 8 and 9 decide the line only when a reading differs from the expected one stated beside it. Return it as your final message and write it to `/home/user/scaffold/tmp/units/ts6-u4-fix-verify-report.md`. No process diary.
