# Unit ts7-seven-fix-2 — round-3 fixes for stage 2 in scaffold (fully specified)

Successor of `tmp/units/ts7-seven-fix-brief.md` (report `tmp/units/ts7-seven-fix-report.md`). What changed: round 2 (`tmp/units/ts7-audit-scaffold-fix-{subjective,objective,checker}.md`) confirmed the added test, the builder, the rewraps, `host.json`, and the scope, and refuted two prose sentences the previous brief itself prescribed, one test name, one builder line, two test-sufficiency gaps, and one overstated clause. Every edit below is exact.

## Role and engine

`builder` on Sonnet, a native Claude Code subagent, the sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing. Another writer may be live in `/home/user/fleet/probe`, a disjoint checkout; never write there.

## Objective

The nine edits below land verbatim, the two added test rows run, and the gates are green.

## Context

**Law.** `AGENTS.md` § Writing and § Non-negotiable rules, `.claude/rules/writing.md`, `.claude/rules/tests.md`. Skill: none. Guide: `guides/scaffold.md`.

**Host.** Node v22.22.2, four CPUs. The working tree carries the previous unit's uncommitted edits in the same files; keep them. `guides/scaffold.md` is vendored: `npm run build` rebuilds `host.json` through `build:inventory`, so run `npm run build` after the guide edit and before `npm test`. Line numbers below were read at 13:20.

## Edits

1. `guides/scaffold.md:1155-1156` — replace "so a public declaration naming a lib type that compiler lacks fails the rollup until `@microsoft/api-extractor` bundles a later one." with "so a public declaration resolves only the lib types that compiler provides." Rewrap the paragraph at word boundaries to at most 100 columns if the replacement moves a line past it.
2. `guides/scaffold.md:1159-1160` — replace "That workspace's `audit` reports one non-blocking `dependencies` question, the crossed-major reading every foreign row earns:" with "That workspace's `audit` reports a non-blocking `dependencies` question, the crossed-major reading every foreign row earns:". Rewrap as in edit 1.
3. `tests/src/core/constants.test.ts:194` — replace "range. That range is a floor of the same form, so it answers to the same pattern." with "range. `APP_BROWSER_TYPESCRIPT_RANGE` is a floor of the same form, so it answers to the same pattern." Rewrap the comment lines to the file's existing comment width.
4. `tests/src/core/compilers.test.ts:1445` — rename the test to `sets the rollup's compiler folder override in every declaration-rolling face`. The comment above it stays.
5. `tests/setupServer.ts:1681-1687` — bind the list once. Replace
   ```ts
   	const [latest, ...rest] = typeof version === 'string' ? [version] : version
   	if (latest === undefined) throw new Error('A packument publishes at least one version')
   ```
   with
   ```ts
   	const published = typeof version === 'string' ? [version] : version
   	const latest = published[0]
   	if (latest === undefined) throw new Error('A packument publishes at least one version')
   ```
   and replace `[latest, ...rest].map((published) => [` with `published.map((entry) => [`, renaming the two uses of `published` inside that callback (`published,` as the key and `version: published,`) to `entry`.
6. `tests/setupServer.test.ts:521-540` — make the row discriminate the tag from the highest version: change the array to `['0.0.4', '0.0.8']`, the expected tag to `'dist-tags': { latest: '0.0.4' }`, and order the expected `versions` map `'0.0.4'` then `'0.0.8'`, each record as it is today.
7. `tests/setupServer.test.ts` — add one row after it: `it('refuses to publish no version at all', () => { expect(() => buildPackument([])).toThrow('A packument publishes at least one version') })`, formatted to the file's style.
8. `PROPOSAL.md:354-356` — replace "through its `unstable/ast` and `unstable/sync` entries, preview surfaces that 7.1 replaces, and `@orkestrel/guide`'s `Source`" with "through its `unstable/ast` and `unstable/sync` entries — preview surfaces carrying no stability promise, whose shape 7.1's different API can change — and `@orkestrel/guide`'s `Source`". Rewrap the paragraph to at most 100 columns.
9. Run `npm run format` to converge the edited files, then the gates.

## Scope

**Owned.** `guides/scaffold.md`, `PROPOSAL.md`, `tests/src/core/constants.test.ts`, `tests/src/core/compilers.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `host.json` (rebuilt by `npm run build`, never edited by hand). **Off-limits.** everything else, `.orkestrel/**`, `tmp/**` except your own report; no commit, no push, no publish, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Gates

`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, in that order, reading each exit code. Before edit 6 lands, run `npm run test:setup` with edits 5 and 7 in place and record its result; after edit 6, record it again.

## Output

A report at `/home/user/scaffold/tmp/units/ts7-seven-fix-2-report.md`: one row per edit naming the file and the line, each gate's command and exit code, the two `test:setup` readings, `git status --short`, deviations. Make your final message that report's text.

## Deviation contract

Stop and report on a gate red you cannot attribute to your own edit, on any need to edit a file outside the owned set, and on an edit whose "replace" text is absent at the cited line.

## Acceptance criteria

1. Every edit reads at its site as written here.
2. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test` exit 0.
3. `git status --short` lists only owned files and the previous unit's files.
