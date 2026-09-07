# Verify brief — D2 guide-render after D2-fix (guide)

Successor of `d2-verify-brief.md`: step 1 names the locator and step 2 the renamed constant.

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `npm install`, `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/fleet/guide`, in this order

1. `grep -n "export function render\|export function replace\|export function locateComment" src/core/helpers.ts` (expected: the three renderers, the four replacers, and the locator, one line each)
2. `grep -rn "\bWIDTH\b" src guides/guide.md` (expected: no output — every site reads `WRAP_WIDTH`; the pipeline exits 1 and that is GREEN)
3. `grep -rn "node:fs\|writeFile\|readFile\|from 'typescript'\|from 'vite'\|from \"vite\"" src` (expected: no line beyond the two pre-existing TSDoc mentions at `src/core/sources/Source.ts` and `src/core/types.ts`; any `import` line is RED)
4. `npm run format:check`
5. `npm run lint:check`
6. `npm run check`
7. `npm run build`
8. `npm test`
9. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). A red Vitest row that names a plain test timeout is re-run alone once with `npx vitest run --config vite.config.ts --no-cache --project <project> <file>` and both readings are reported; any other red row is reported as it stands. Do not re-run anything else.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`. Return it as your final message and write it to `/home/user/fleet/guide/tmp/units/docs-d2-verify-2-report.md`. No process diary.
