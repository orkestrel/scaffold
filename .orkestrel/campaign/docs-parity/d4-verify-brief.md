# Verify brief — D4 scaffold-gate (scaffold)

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `npm install`, `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/scaffold`, in this order

1. `grep -n "findDrift\|tagline" tests/guides.test.ts` (expected: the import and the two cases)
2. `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -5` (expected: lines; an empty result means the head start is gone and is RED)
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run test:policy`
7. `npm run build`
8. `sha256sum host.json && npm run build:inventory && sha256sum host.json` (expected: the same digest before and after)
9. `npm run test:guides` (expected RED on exactly the two cases `keeps every compared summary and example equal to its source` and `opens the README with the guide tagline`, every other case green; report the failing case names and the last lines; that reading is GREEN for this brief's purpose, and any other red case is RED)
10. `git status --short`

For each: the exact command, its exit code, and its last lines. Do not re-run anything.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`, reading step 9 as stated. Return it as your final message and write it to `/home/user/scaffold/tmp/units/docs-d4-verify-report.md`. No process diary.
