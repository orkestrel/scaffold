# Verify brief — D5 scaffold-seed with D5-fix (scaffold)

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `npm install`, `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Standing conditions

- D4 landed the equality gate red-first: `npm run test:guides` is red on its two new cases until D6 converges. That reading is GREEN for this brief's purpose.
- `node_modules/@orkestrel/guide` is a head start installed with `--no-save`; an empty result from step 3 means the head start is gone and is RED.
- `npm run test:distribution` runs for about 70 seconds. Report its exit code as read; a timing failure is re-run alone by the Orchestrator, never here.

## Commands, from `/home/user/scaffold`, in this order

1. `grep -n "scripts/docs.ts" src/core/constants.ts src/core/compilers.ts package.json host.json` (expected: the `HOST_PATHS` row, the emission, the manifest script, the staged entry)
2. `grep -n "^import" scripts/docs.ts` (expected: `@orkestrel/guide` and `node:` specifiers only; any other specifier is RED)
3. `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -5`
4. `npm run format:check`
5. `npm run lint:check`
6. `npm run check`
7. `npm run test:src:core`
7a. `npm run test:src:server` (the vendored-imports allowlist green with the seed present)
7b. `npm run test:config`
8. `npm run test:src:core -- --reporter=verbose 2>&1 | grep -c "the documentation seed"` (the seed's cases live in `tests/src/core/compilers.test.ts` per the D5 report; expected: a count of the listed case lines, and step 7 carries the exit code)
9. `npm run test:policy`
10. `npm run build`
11. `sha256sum host.json && npm run build:inventory && sha256sum host.json` (expected: the same digest before and after)
11a. `node dist/bin/main.js audit --groups configs --offline; echo EXIT $?` (expected: exit 0, `tsconfig.json` aligned; the online run adds registry-floor findings against `package.json` that predate this round)
11b. `grep -n "cannot depend on itself" .claude/rules/workspace.md; grep -c "@orkestrel/scaffold" tsconfig.json` (expected: nothing from the first, `2` from the second)
12. `npm run test:guides` (expected RED on exactly the two cases `keeps every compared summary and example equal to its source` and `opens the README with the guide tagline`, every other case green; report the failing case names and the last lines; that reading is GREEN, and any other red case is RED)
13. `npm run test:distribution`
14. `node --experimental-strip-types scripts/docs.ts > tmp/units/docs-d5-verify-seed-run.txt 2>&1; echo EXIT $?` (expected: exit 1; report the first 5 and the last 5 lines of the file; this is an observation, GREEN at exit 1)
15. `node --experimental-strip-types scripts/docs.ts --to nowhere; echo EXIT $?` (expected: one usage line and exit 2)
16. `git status --short`

For each: the exact command, its exit code, and its last lines. Do not re-run anything.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`, reading steps 12, 14, and 15 as stated and numbering the added steps as they appear. Return it as your final message and write it to `/home/user/scaffold/tmp/units/docs-d5-verify-report.md`. No process diary.
