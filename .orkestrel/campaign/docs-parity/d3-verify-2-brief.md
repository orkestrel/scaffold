# Verify brief — D3 scaffold-policy after D3-fix (scaffold)

Successor of `d3-verify-brief.md`: the rule id is `policy/no-malformed-summary` after the fix round (`d3-audit-verdict.md` F8), the exclusion greps of `d3-fix-brief.md` criterion 1 join the chain, and the distribution row's deciding run stays the Orchestrator's.

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `npm install`, `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/scaffold`, in this order

1. `grep -n "no-malformed-summary\|no-banned-term" .oxlintrc.json configs/policy.ts tests/setupPolicy.ts` (expected: the two top-level wiring lines, the two register rows, the two wiring-rule entries)
2. `grep -rn "no-imperative-summary" --include=*.ts --include=*.json --include=*.md . | grep -v "node_modules\|^./tmp\|^./dist\|^./.orkestrel"` (expected: no output; the pipeline exits 1 because the last grep matches nothing, and that is GREEN)
3. `grep -rn "in every sense\|POLICY_PROSE_ROOTS\|vendored mirror\|stop list\|stop-set\|the voice rules" configs tests/*.ts .claude/rules guides/scaffold.md .oxlintrc.json` (expected: no output, exit 1, GREEN)
4. `grep -n "readPolicyGuide" tests/setupPolicy.ts tests/policy.test.ts` (expected: the declaration, the two predicate bodies, the import, and the case)
5. `npm run format:check`
6. `npm run lint:check`
7. `npm run check`
8. `npm run test:config`
9. `npm run test:policy`
10. `npm run build`
11. `sha256sum host.json && npm run build:inventory && sha256sum host.json` (expected: the same digest before and after; a changed digest is RED)
12. `npm test`
13. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
14. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs /home/user/scaffold src app configs tests scripts | tail -2` (expected: `FLAGGED 0`)
15. `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold | tail -1` (expected: `HITS 0`)
16. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). A red Vitest row that names a plain test timeout is re-run alone once with `npx vitest run --config vite.config.ts --no-cache --project <project> <file>` and both readings are reported; any other red row is reported as it stands, the distribution row included — the Orchestrator takes its deciding run. Do not re-run anything else.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`. Return it as your final message and write it to `/home/user/scaffold/tmp/units/docs-d3-verify-2-report.md`. No process diary.
