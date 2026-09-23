# Unit B-FORMS-CLOSE-TABLES (`bft`), round 2 — report

Writer: `opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bft`, building
on round 1's uncommitted writes. Nothing was committed, installed, or discarded.

## Outcome

All acceptance criteria pass. The faulted sentences carry the audit's text. The helper's TSDoc
is corrected (F1). `renderRuleKey` is the one home of the rule key format (F2). The R9 exclusion is
pinned by a planted in-memory case (referral b). The filter it pins is extracted as
`filterComparableBlocks`, because the planted case and the range Node case would otherwise
duplicate it.

## Touched files (round 2 only)

- `tests/setupServer.ts`: adds the `renderRuleKey` and `filterComparableBlocks` exports with
  TSDoc. Routes `collectDeclarationReads` through `renderRuleKey`. Rewrites that helper's summary,
  `@param blocks`, `@returns`, and `@remarks` (F1, 7c).
- `tests/setupServer.test.ts`: adds a proof for each export and lists both in the exports case.
  Rewords the merge comment (7d).
- `tests/setupStyles.ts`: fixes the `FORM_RANGE_CASES` sentence to name "the `condition` field"
  (7a).
- `tests/setupStyles.test.ts`: routes the `keyed`, `cased`, and loop keys of the range and
  text-control Node cases through `renderRuleKey`. Routes the range case's filter through
  `filterComparableBlocks` and shortens its comment to point at the planted case. Adds the planted
  case (R9). Drops the unused `normalizeMediaCondition` import.
- `tests/src/styles/components/form-range.test.ts`: changes the comment to "the `findRule` helper
  returns the first rule", rewrapped (7b).
- `tests/src/styles/components/input-group.test.ts`: rewrites the comment's first sentence to the
  audit's text and rewraps it. The following sentence is unchanged (7e).

## Diff summary

The per-file round-2 delta, from `diff` against a snapshot of the owned test files taken before any
round-2 edit:

```text
tests/setupServer.ts                            66 added 13 removed
tests/setupServer.test.ts                       45 added  2 removed
tests/setupStyles.ts                             1 added  1 removed
tests/setupStyles.test.ts                       42 added 27 removed
tests/src/styles/components/form-range.test.ts   3 added  2 removed
tests/src/styles/components/input-group.test.ts  4 added  4 removed
```

`git diff --stat` against `d02bd46` (rounds 1 and 2 together):

```text
 tests/conformance.test.ts                       |  33 ++++-
 tests/setupServer.test.ts                       |  73 ++++++++++
 tests/setupServer.ts                            |  89 ++++++++++++
 tests/setupStyles.test.ts                       | 154 ++++++++++-----------
 tests/setupStyles.ts                            | 174 +++++++++++++++++-------
 tests/src/styles/components/form-range.test.ts  |  20 ++-
 tests/src/styles/components/input-group.test.ts |  35 +++--
 7 files changed, 425 insertions(+), 153 deletions(-)
```

`git status --short`:

```text
 M tests/conformance.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/components/form-range.test.ts
 M tests/src/styles/components/input-group.test.ts
```

Round 2 did not touch `tests/conformance.test.ts`. Its entry is round 1's change.

## Exports added

```ts
export function renderRuleKey(rule: Pick<CascadeBlock, 'selector' | 'condition'>): string
export function filterComparableBlocks(
	blocks: readonly CascadeBlock[],
	prefix: string,
	rules: ReadonlyArray<Pick<CascadeBlock, 'condition'>>,
): readonly CascadeBlock[]
```

The `renderRuleKey` export's `@remarks` names it as the lookup contract of the
`collectDeclarationReads` helper. The `filterComparableBlocks` export keeps each block whose
selector opens with `prefix` and whose normalized condition is one a recorded rule sits under.

## Criteria

1. **The faulted sentences.** Each site holds the exact text the brief gives (read back after the
   edit). The input-group and setupServer comments are rewrapped at 100 columns.
2. **The helper's TSDoc.** The summary reads "Collects the custom properties each declaration of a
   compiled cascade reads, keyed by selector and condition." The `@returns` opens with the
   brief's sentence, and the rest of the tag is unchanged apart from rewrapping.
3. **`renderRuleKey`.** `grep -n "condition === undefined ?" tests/setupServer.ts tests/setupStyles.test.ts`
   returns the `renderRuleKey` body (around line 1388) and the floating case's off-limits
   expressions (around lines 2717 and 2723), and nothing else. The helper and the range and
   text-control Node cases (`keyed`, `cased`, and loop key) all call `renderRuleKey`. It is
   tested, and the exports case lists it.
4. **The planted case.** The case "leaves a range rule under a condition no range rule records out
   of the compared keys and compares one under a recorded condition" is in `tests/setupStyles.test.ts`,
   after the range Node case. It checks the following:
   - The forced-colors plant reaches the reader. This check stops the next assertion from passing
     only because the plant never reached the blocks.
   - The filtered keys still equal the inventory's keyed range rules.
   - With the reduced-motion plant, the keys equal the keyed rules plus
     `.form-range:focus @media (prefers-reduced-motion: reduce)`.
5. **Format, lint, and typecheck.** Each command exited 0:
   - `npx oxfmt --config .oxfmtrc.json --check` over the owned test files: "All matched files use
     the correct format."
   - `npm run format:check`: "Finished in 5448ms on 287 files".
   - `npm run lint:check`: no diagnostics.
   - `npm run check`: the root, `src`, and `app` typechecks all ran.
6. **Tests.** Each command exited 0:
   - `npm run test:setup`: "Test Files 4 passed (4) / Tests 247 passed (247)".
   - `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/input-group.test.ts tests/src/styles/components/form-range.test.ts`:
     "Test Files 2 passed (2) / Tests 25 passed (25)".

Observations, not criteria. Each command exited 0:

- `npm run test:conformance`: "Tests 20 passed (20)".
- The whole styles project, run without the build step (`dist/` was already built, and round 2
  touches no `src/**`), with `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot`:
  "Test Files 75 passed (75) / Tests 739 passed (739)".

## Failing-first evidence

Both helper proofs used this command:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts`.
The planted case used the scoped command named in its entry.

- **`renderRuleKey` proof.** The test, the import, and the exports-list entry were written before
  the export existed. Red run: "Tests 2 failed | 93 passed (95)". The failures were
  `TypeError: renderRuleKey is not a function` in "renders a rule under no condition as its
  selector and a rule under one as the selector, a space, and the condition", and the exports case
  missing `renderRuleKey`. The same command after the export: "Tests 95 passed (95)".
- **`filterComparableBlocks` proof.** Same order. Red run: "Tests 2 failed | 94 passed (96)". The
  failures were `TypeError: filterComparableBlocks is not a function` in "keeps the blocks under
  the selector prefix whose condition a recorded rule sits under, in either width notation", and
  the exports case. After the export: "Tests 96 passed (96)".
- **Planted case.** The filter already existed from round 1, so the case's red run is the mutation
  the brief names. The mutation deleted `&& conditions.has(normalizeMediaCondition(block.condition))`
  from `filterComparableBlocks`. The file was copied aside and copied back, and `cmp` confirmed the
  restore.
  - Command:
    `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts -t "leaves a range rule under a condition"`.
  - Mutated: "Tests 1 failed | 105 skipped (106)". The failure is at the first key equality
    (around `tests/setupStyles.test.ts:1862`): "expected [ '.form-range', …(16) ] to deeply equal
    [ '.form-range', …(15) ]".
  - Restored: "Tests 1 passed | 105 skipped (106)".
  - The same mutation was also run across both files with
    `-t "range rule|keeps the blocks under the selector prefix"` and `--reporter=verbose`. The
    helper proof and the planted case fail, and the range Node case still passes ("Tests 2 failed
    | 1 passed | 199 skipped (202)"). This confirms referral b: before round 2, no case covered
    the exclusion.

## Decisions made under the deviation contract

- I extracted the filter as `filterComparableBlocks` in `tests/setupServer.ts`, beside
  `collectDeclarationReads`, because the planted case would otherwise duplicate the Node case's
  filter. The brief authorizes this extraction.
- `rules` is typed `ReadonlyArray<Pick<…>>` rather than `readonly Pick<…>[]`, because
  `lint:check` refuses the second form (`typescript(array-type)`).
- The `renderRuleKey` export carries an `@example`. Its `@remarks` states that only `undefined`
  renders the selector alone.
- The `collectDeclarationReads` `@remarks` gains one sentence naming the `renderRuleKey` helper as
  the source of every key. The rest of the remark is unchanged.
- The range Node case's exclusion comment is shortened to point at the planted case, because the
  full rationale moved to the `filterComparableBlocks` TSDoc.

## Weakest claims

- The planted case never failed before its fix, because the filter already existed. Its only red
  evidence is the mutation run.
- The assertion that an empty condition renders `'.form-range '` pins a value no reader produces.
  It exists to tell `=== undefined` apart from a truthiness check.
- `filterComparableBlocks` inherits the round-1 `startsWith` prefix test, so `.form-range` would
  also admit a selector such as `.form-range-wide`. The behavior is unchanged from round 1, and no
  such selector exists in the cascade.
- The name `filterComparableBlocks` is my choice. The reviewer lane might prefer another.

## Out-of-scope observation (no carrier yet)

The `@param blocks` tags of `collectValueGaps` (around line 2053) and `collectAdditions` (around
line 2172) in `tests/setupServer.ts` still read "as {@link readCascadeBlocks} reads them". That
text was already there at `d02bd46`, so it falls outside this round's findings. It has the same
fault the audit named at 7c. Round 2 left both tags as they were.

## Shared-file patches

None. `tests/conformance.test.ts`, `guides/veneer.md`, and `ROADMAP.md` are untouched.

## Deviation state

None. No site was missing, and no criterion needed a file outside the owned set.
