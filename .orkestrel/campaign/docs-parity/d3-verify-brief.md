# Verify brief — D3 scaffold-policy (scaffold)

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `npm install`, `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/scaffold`, in this order

1. `grep -n "no-imperative-summary\|no-banned-term" .oxlintrc.json configs/policy.ts tests/setupPolicy.ts` (expected: the two top-level wiring lines, the two register rows, the two wiring-rule entries)
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run test:config`
6. `npm run test:policy`
7. `npm run build`
8. `sha256sum host.json && npm run build:inventory && sha256sum host.json` (expected: the same digest before and after; a changed digest is RED)
9. `npm test`
10. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
11. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs /home/user/scaffold src app configs tests scripts | tail -2` (expected: `FLAGGED 0`)
12. `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold | tail -1` (expected: `HITS 0`)
13. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). A red Vitest row that names a plain test timeout is re-run alone once with `npx vitest run --config vite.config.ts --no-cache --project <project> <file>` and both readings are reported; any other red row is reported as it stands. Do not re-run anything else.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`. Return it as your final message and write it to `/home/user/scaffold/tmp/units/docs-d3-verify-report.md`. No process diary.
