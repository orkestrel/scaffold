# Verify brief — U6 scaffold-seeds (scaffold), after the Orchestrator's install

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file except the one planted line step 4 names, which step 4 also removes; never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/scaffold`, in this order

1. `node node_modules/typescript/bin/tsc --version`
2. `npm run format:check`
3. `npm run lint:check`
4. The restriction's control, over a file the unit did not touch: `sed -i "1i import ts from 'typescript'" src/core/helpers.ts`, then `npm run lint:check` (expected red, naming `src/core/helpers.ts` and the restricted-import message), then `sed -i '1d' src/core/helpers.ts`, then `git diff --stat -- src/core/helpers.ts` (expected empty). Report all four outputs. If the plant does not redden `lint:check`, report that as the control's failure; remove the plant regardless.
5. `npm run check`
6. `npm run build` (its `build:inventory` step regenerates `host.json`; that write is expected)
7. `npm test`
8. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
9. `grep -rn "vite-plugin-dts" src tests configs guides package.json ROADMAP.md PROPOSAL.md` (report every line; the expected reading is no line)
10. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). A red Vitest row that names the Oxlint language server, an `initialize` deadline, or a plain test timeout is re-run alone once with `npx vitest run --config vite.config.ts --no-cache --project <project> <file>` and both readings are reported; any other red row is reported as it stands. Do not re-run anything else.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`, where step 4 decides the line only when the plant fails to redden or the plant remains, and step 9 only when it prints a line. Return it as your final message and write it to `/home/user/scaffold/tmp/units/ts6-u6-verify-report.md`. No process diary.
