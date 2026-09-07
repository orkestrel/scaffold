# Verify brief — D3-pre voice-converge after its fix round (scaffold)

Successor of `docs-d3pre-verify-brief.md`: step 10 is restated as an inventory stability reading, because the first brief expected an empty diff against `HEAD` while the unit's own regeneration is itself uncommitted; every other step is unchanged.

## Role and engine

`verifier`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Fix nothing; never edit a source file; never run `npm install`, `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`; never commit.

## Commands, from `/home/user/scaffold`, in this order

1. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs /home/user/scaffold src app configs tests scripts | tail -2` (expected: a line ending `FLAGGED 0 NODOC 35`)
2. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs .orkestrel/campaign/docs-parity/instruments/p10 . | tail -2` (expected: `FLAGGED 3`, the control)
3. `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold | tail -3` (expected: `HITS 0`)
4. `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold .orkestrel/campaign/docs-parity/instruments/p9/control.md | grep -c 'control.md:3'` (expected: `3`)
5. `grep -rn -i -E '\b(should|simply|eas(y|ier|iest|ily)|just|currently|utiliz|leverag|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|sanity[ -]check|dumm(y|ies)|blacklist|whitelist|slave)\b' src configs tests scripts --include=*.ts | grep -E '^\S+:\s*(//|/?\*)'` (expected: no line)
6. `npm run format:check`
7. `npm run lint:check`
8. `npm run check`
9. `npm run build`
10. `sha256sum host.json && npm run build:inventory && sha256sum host.json` (expected: exit 0 and the same digest before and after, so the committed-to-be inventory is the regenerated one; a changed digest is RED)
11. `npm test`
12. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
13. `git status --short`

For each: the exact command, its exit code, and its last lines (the summary block for a Vitest run). A red Vitest row that names a plain test timeout is re-run alone once with `npx vitest run --config vite.config.ts --no-cache --project <project> <file>` and both readings are reported; any other red row is reported as it stands. Do not re-run anything else.

## Output

A gate report with every command, then one terminal line: `GATES: GREEN` or `GATES: RED <command>`. Return it as your final message and write it to `/home/user/scaffold/tmp/units/docs-d3pre-verify-2-report.md`. No process diary.
