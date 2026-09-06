# Verify brief — U6-fix (scaffold), the gates that read the changed files, with the new guard's control

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file except the one planted line step 3 names and removes; never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/scaffold`, in this order

1. `npm run format:check`
2. `npm run lint:check`
3. The extended guard's control, over a `tests/` file the unit did not touch: `sed -i "1i import type { Node } from 'typescript'" tests/setup.ts`, then `npm run lint:check` (expected red, naming `tests/setup.ts` and the message "the in-process compiler API is not a surface the fleet uses"), then `sed -i '1d' tests/setup.ts`, then `git diff --stat -- tests/setup.ts` (expected empty). Report all four outputs. If the plant does not redden `lint:check`, report that as the control's failure; remove the plant regardless.
4. `npm run check`
5. `npm run build` (its `build:inventory` step regenerates `host.json`; that write is expected because the vendored `.oxlintrc.json` and `guides/scaffold.md` moved again)
6. `npm run test:src:core`
7. `npm run test:policy`
8. `npm run test:config`
9. `npm run test:guides`
10. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). Report a red row as it stands with the case name and the assertion; do not re-run anything.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`, where step 3 decides the line only when the plant fails to redden or the plant remains. Return it as your final message and write it to `/home/user/scaffold/tmp/units/ts6-u6-fix-verify-report.md`. No process diary.
