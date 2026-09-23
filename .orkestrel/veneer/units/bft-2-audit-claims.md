# B-FORMS-CLOSE-TABLES (`bft`), round 2 — audit claims

## Subject

Round 2 of B-FORMS-CLOSE-TABLES in `/home/user/veneer-bft` (a worktree detached at `d02bd46`,
holding rounds 1 and 2 uncommitted), written by `opus` on Opus 5.5 from
`/home/user/veneer-bft/tmp/units/bft-brief-2.md` (retained as
`/home/user/scaffold/.orkestrel/veneer/units/b-forms-close-tables-brief-2.md`), carrying round 1's
audit findings (`bft-audit-verdict.md`: claim 7's five sentences, F1, F2, referral b). Round 1's
claims 1 to 6 and 9 held and are not re-run; this round's claims are the fix's. **Review evidence.**
`/home/user/scaffold/.orkestrel/veneer/units/bft-2.diff` (the whole diff against `d02bd46`, rounds
1 and 2), `bft-2-status.txt`, the round-2 report `b-forms-close-tables-report-2.md` (its "Diff
summary" table gives the round-2 delta per file), the round-2 brief, and round 1's records
(`bft.diff`, `b-forms-close-tables-report.md`, `bft-audit-verdict.md`).

## What the round decides

Whether B-FORMS-CLOSE-TABLES lands on the session branch as one commit (rounds 1 and 2 together)
after `e0c901a`, with the guide paragraph landed as the Orchestrator's integration edit.

## Already established — do not re-run

Round 1's confirmed claims; the standing ruling that a CSS property, value, or function token is
its own noun and a backticked test title is quoted data; the objective lane's sandbox runs no
Vitest project and no browser (`npm run check` and `node -e` that write nothing are allowed).

## Unknowns

- Whether `filterComparableBlocks`'s `startsWith` prefix admits a selector such as
  `.form-range-wide` (none exists in the cascade; the writer flags it): the lanes rule whether the
  inherited prefix test is a defect or a recorded limit.
- Whether the empty-condition assertion (`'.form-range '`) in the `renderRuleKey` proof pins a
  value no reader produces and belongs there.

## The threshold

`CONFIRMED` requires naming the attack that failed; a claim about a proof names the mutation and
says whether the assertions distinguish it. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The delta is the brief.** Round 2 touches only `tests/setupServer.ts`,
   `tests/setupServer.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
   `tests/src/styles/components/form-range.test.ts`, and
   `tests/src/styles/components/input-group.test.ts`; `tests/conformance.test.ts` carries only
   round 1's change; the floating case's key expressions and `FORM_FLOATING_CASES` are untouched;
   the status lists the seven round-1 files and nothing else.
2. **The five sentences carry the lanes' text.** The `condition` field sentence in the
   `FORM_RANGE_CASES` remark, the `findRule` helper sentence in `form-range.test.ts`, the
   `{@link readCascadeBlocks}` helper sentence in the `collectDeclarationReads` TSDoc, the "Rules
   under one key merge" sentence in `tests/setupServer.test.ts`, and the input-group corner
   comment's first sentence read exactly as `b-forms-close-tables-brief-2.md` criterion 1 gives
   them, rewrapped only.
3. **The helper's TSDoc is true.** `collectDeclarationReads`'s summary reads "Collects the custom
   properties each declaration of a compiled cascade reads, keyed by selector and condition." and
   its `@returns` opens with the brief's sentence; every sentence of its TSDoc is true of the
   implementation (one entry per selector and condition; blocks sharing a key merge; a later
   declaration replaces an earlier read; a property reading no custom property is absent).
4. **`renderRuleKey` is the one home.** `tests/setupServer.ts` exports
   `renderRuleKey(rule: Pick<CascadeBlock, 'selector' | 'condition'>): string` with a TSDoc naming
   it as the lookup contract of `collectDeclarationReads`; the helper and the range and
   text-control Node cases' `keyed`, `cased`, and loop keys route through it; the only remaining
   `condition === undefined ?` expressions are the helper's body and the floating case's; its proof
   covers a rule under no condition and a rule under one; the exports case lists it. Mutation:
   rendering the conditioned key without the space reddens the proof.
5. **The R9 exclusion is pinned.** `filterComparableBlocks(blocks, prefix, rules)` in
   `tests/setupServer.ts` keeps each block whose selector opens with `prefix` and whose normalized
   condition one recorded rule sits under; the range Node case's filter routes through it; its
   proof covers both width notations of a condition; the planted case in
   `tests/setupStyles.test.ts` appends a `.form-range:focus` rule under `@media (forced-colors:
   active)` to the real expanded cascade in memory, asserts the plant reached the reader, asserts
   the filtered keys still equal the inventory's keyed range rules, then appends the same rule
   under `@media (prefers-reduced-motion: reduce)` and asserts the keys gain
   `.form-range:focus @media (prefers-reduced-motion: reduce)`. Mutation: deleting the
   `conditions.has` clause reddens the first equality (the writer's mutation run: 1 failed).
6. **Prose law.** Every comment and TSDoc round 2 adds or changes follows `writing.md`: no count,
   no banned term, a code token followed by a noun (a CSS token counts as its own noun), one idea
   per sentence, and the `@example` on `renderRuleKey` uses fictional descriptive data.
7. **Law and scope.** Across the round-2 delta: no `any`, `as` (other than `as const`), `!`, or
   suppression; no nested function beyond a callback passed directly; readonly parameters and
   returns; no helper whose job an installed `@orkestrel/test` or `@orkestrel/contract` export
   does; the off-limits files untouched. Run `npm run check` from the worktree and report its exit
   code as evidence here (the objective lane).
