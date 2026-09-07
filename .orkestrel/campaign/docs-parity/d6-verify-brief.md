# Verify brief — D6 scaffold-converge (scaffold)

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `npm install`, `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Standing conditions

- `node_modules/@orkestrel/guide` is a head start installed with `--no-save`; an empty result from step 2 means the head start is gone and is RED.
- The distribution project and the whole suite need npm 11 first on the path: `PATH=/opt/npm11/bin:$PATH`. Under the shell's default npm 10.9.7 the generated workspace's install crashes inside npm (`orchestrator-measurements.md` § M8), which is npm's defect and not this tree's. Report each exit code as read; a timing failure is re-run alone by the Orchestrator, never here.
- After D6, `npm run test:guides` is expected GREEN on every case, and `npm run docs` is expected to exit 0 printing its closing line alone.

## Commands, from `/home/user/scaffold`, in this order

1. `npm run docs; echo EXIT $?` (expected: exit 0, one closing line, no drift line, no pitch line)
2. `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -3`
3. `head -6 README.md; head -6 guides/scaffold.md` (expected: each opens with an H1 and a blockquote; report both blockquotes)
4. `npm run format:check`
5. `npm run lint:check`
6. `npm run check`
7. `npm run test:policy`
8. `npm run test:guides` (expected: exit 0, every case green; report the case list's totals)
9. `npm run test:src:core`
10. `npm run test:src:server`
11. `npm run test:config`
12. `npm run build`
13. `sha256sum host.json && npm run build:inventory && sha256sum host.json` (expected: the same digest before and after)
14. `PATH=/opt/npm11/bin:$PATH npm --version` (expected 11.x) then `PATH=/opt/npm11/bin:$PATH npm test` (the whole suite; expected exit 0; report the totals and the duration)
15. `git status --short`

For each: the exact command, its exit code, and its last lines. Do not re-run anything.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`. Return it as your final message and write it to `/home/user/scaffold/tmp/units/docs-d6-verify-report.md`. No process diary.
