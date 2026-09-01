# U3j brief — the read-count sentence with its condition, and three prose corrections (fix round after the U3i audit)

## Role and engine

`builder` on Sonnet, native Claude subagent, the sole serial writer in `/home/user/contract`. Perform the assignment directly and spawn nothing. Every edit is specified as exact text; make no other change and take no design decision.

## Objective

Land the U3i audit's adopted findings (`u3i-audit-subjective.md`: claim 1, findings A, B, and C), each reproduced by the Orchestrator (`readcount-cases-u3final.out`: declared pattern 2 reads, supplied 0, min-only or max-only 1).

## Context

- Repository `/home/user/contract`, branch `claude/method-memoization-contracts-yus26p`, HEAD 163490f; eight files are already modified (the U3 tree, U3i included) and stay so — never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, and never commit.
- Read `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/writing.md` before editing. Skill: none.
- Run every command from `/home/user/contract` with an explicit `cd /home/user/contract &&` prefix.
- Prettier does not reflow comments: keep every comment and TSDoc line within the width its neighbours use (about 80 columns).

## Scope

Owned: `src/core/helpers.ts` (item 1 lines only), `guides/contract.md` (items 2 and 4 sentences only), `tests/src/core/helpers.test.ts` (item 3 title only), `tests/setup.ts` (item 5 words only). Off-limits: every other line and file. Allowed tools: Read, Grep, Glob, Edit, Bash for the commands in § Acceptance criteria. No tree-wide `format` or `lint --fix`.

## Edits

1. `src/core/helpers.ts` lines 1930 to 1933 (the `createStringFaults` TSDoc). Replace

   ```
    * names the pattern that decided the match. Left to rebuild, the helper asks
    * the shape's `pattern` accessor twice per call: once for the presence test
    * that decides whether a pattern was declared at all, and once for the rebuild
    * that both decides the match and names the `limit`.
   ```

   with

   ```
    * names the pattern that decided the match. Left to rebuild, the helper asks
    * the shape's `pattern` accessor once for the presence test that decides
    * whether a pattern was declared at all, and once more for the rebuild that
    * decides the match and names the `limit` when one was.
   ```

2. `guides/contract.md` line 598 (the `createStringFaults` row). Replace the sentence `Left to rebuild, the helper asks the shape's \`pattern\` accessor twice per call: once for the presence test that decides whether a pattern was declared at all, and once for the rebuild that both decides the match and names the \`limit\`.` with `Left to rebuild, the helper asks the shape's \`pattern\` accessor once for the presence test that decides whether a pattern was declared at all, and once more for the rebuild that decides the match and names the \`limit\` when one was.` Change nothing else in the row; re-align the table only if `format:check` demands it, with `npx oxfmt --config .oxfmtrc.json guides/contract.md`.

3. `tests/src/core/helpers.test.ts` line 3249: rename the test from `applies the supplied pattern instead of re-reading the shape` to `applies the supplied pattern rather than the shape's own to decide the match`. Its body is unchanged.

4. `guides/contract.md` line 256 (the membership paragraph). Replace `and no exported class contributes any, so an export that changes the population is derived by the test instead of copied into this paragraph. A count stated here drifted` with `and no exported class contributes any. A count stated here drifted`.

5. `tests/setup.ts` line 788: replace ` * functions were exported and nobody's assertion noticed.` with ` * functions were exported and no assertion failed.`

## Acceptance criteria (cheap first)

1. `npm run format:check` exits 0.
2. `cd /home/user/contract && npm run lint:check` exits 0.
3. `cd /home/user/contract && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts` reports `235 passed (235)`.
4. `cd /home/user/contract && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides` reports `65 passed (65)`.
5. `grep -c "twice per call" /home/user/contract/src/core/helpers.ts /home/user/contract/guides/contract.md` reports 0 in each (the test title at `helpers.test.ts:3288` keeps its "twice per call", bounded to a declared pattern).

## Output

Write `/home/user/scaffold/tmp/units/u3j-report.md` with: each item done or not done with its file:line; the exact `Tests` lines of criteria 3 and 4; any deviation; and a `Flagged:` line naming any claim of yours you could not verify.

## Deviation contract

A conflict with an item's exact text (the target text is absent, or a criterion fails after the edit) stops the unit: report expected, found, exact evidence, done or not done, and at most one hypothesis.
