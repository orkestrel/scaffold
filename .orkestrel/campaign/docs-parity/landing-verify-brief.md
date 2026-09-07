# Verify brief — the joint landing of D4, D5, D6, and D6b (scaffold)

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `npm install`, `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Standing conditions

- This is the authoritative sweep before the joint commit: the manifest's whole gate chain, under npm 11 first on the path (`PATH=/opt/npm11/bin:$PATH`; under the shell's default npm 10.9.7 the generated workspace's install crashes inside npm, `orchestrator-measurements.md` § M8).
- `node_modules/@orkestrel/guide` is a head start installed with `--no-save`; an empty result from step 2 is RED.
- The distribution proof's packed-install case (`installs the packed scaffold and passes one generated core/server workspace through prepublish`) is red by dependency order until `@orkestrel/guide` publishes the readers and scaffold re-pins (`plan.md` § Re-baseline after D6-fix-2 returned); that one case is GREEN for this brief's purpose, and any other red case in that project is RED.

## Commands, from `/home/user/scaffold`, in this order

1. `npm run docs; echo EXIT $?` (expected: exit 0 and the closing line alone)
2. `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -3`
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run build`
7. `sha256sum host.json && npm run build:inventory && sha256sum host.json` (expected: the same digest before and after)
8. `PATH=/opt/npm11/bin:$PATH npm --version` (expected 11.x) then `PATH=/opt/npm11/bin:$PATH npm test` (expected exit 0; report each project's totals and the duration)
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (expected: red on exactly the packed-install case; report every case's reading)
10. `node dist/bin/main.js audit --groups configs --offline; echo EXIT $?` (expected: exit 0)
11. `git status --short`

For each: the exact command, its exit code, and its last lines. Do not re-run anything.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`, reading step 9 as stated. Return it as your final message and write it to `/home/user/scaffold/tmp/units/docs-landing-verify-report.md`. No process diary.
