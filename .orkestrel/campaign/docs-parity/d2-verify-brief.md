# Verify brief — D2 guide-render (guide)

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `npm install`, `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/fleet/guide`, in this order

1. `grep -n "export function render\|export function replace" src/core/helpers.ts` (expected: the renderers and the replacers, one line each)
2. `grep -rn "node:fs\|writeFile\|readFile\|from 'typescript'\|from 'vite'\|from \"vite\"" src` (expected: no line)
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run build`
7. `npm test`
8. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). A red Vitest row that names a plain test timeout is re-run alone once with `npx vitest run --config vite.config.ts --no-cache --project <project> <file>` and both readings are reported; any other red row is reported as it stands. Do not re-run anything else.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`, where step 2 decides the line only when it prints a line and step 1 only when it prints nothing. Return it as your final message and write it to `/home/user/fleet/guide/tmp/units/docs-d2-verify-report.md`. No process diary.
