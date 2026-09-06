# Verify brief — U12 fleet-visit-html (phase A), the independent cheap gates

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `npm install` (it restores the registry copy over the installed head start), `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit; never publish.

## Commands, from `/home/user/fleet/html`, in this order

1. `git log --oneline -1` and `git status --short`
2. `grep -rn "vite-plugin-dts" package.json configs/src` (expected no line) and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`
3. `head -20 tests/distribution.test.ts | grep -n "typescript"` (expected no line)
4. `npx scaffold audit --offline`
5. `npm run format:check`
6. `npm run lint:check`
7. `npm run check`
8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`

For each: the exact command, its exit code, and its last lines. Report a red result as it stands; do not re-run anything. 

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`, where step 2 and step 3 decide the line when they print a line. Return it as your final message and write it to `/home/user/fleet/html/tmp/units/ts6-u12-visit-verify-report.md`. No process diary.
