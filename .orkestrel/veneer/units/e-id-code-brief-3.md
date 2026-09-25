# Unit E-ID-CODE round 3 — withdraw the contextual rules

Successor to `e-id-code-brief-2.md`; the earlier briefs stay in force for every section this brief does not restate.
What changed: `/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md` § Addendum 2 withdraws `pre code`,
`a > code`, and `kbd kbd` under the semantic-tags tenet; the border-width hook and the `samp` corner stand.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-eic`, which holds rounds 1 and 2. Read
`tmp/units/eic-report.md` and `tmp/units/eic-report-2.md` first.

## Objective

No contextual code rule ships, the positional law and its proof read as at `ca83afb`, and the hook, the corner, and
the Content specimens stand.

## Scope

As rounds 1 and 2.

## Execution

Perform the assignment directly and spawn nothing.

1. Remove the `pre code`, `a > code`, and `kbd kbd` rules and the proofs that pin them; remove `RELEASE_TAG_PAIRS`
   with its export-list entry and pin; restore `tests/src/styles/index.test.ts` and the guide's positional-law
   paragraph to their `ca83afb` text.
2. Restore the `pre code`, `a > code`, and `kbd kbd` Excluded rows, their reason citing the semantic-tags tenet, and
   remove the addition rows that recorded their declarations.
3. Keep the Content specimens: each shows the tag's own treatment in its context. Update `ContentSection.test.ts` only
   if a pinned element name changes.
4. Keep the border-width hook in `_pre.scss` and `_kbd.scss`, the `samp` corner, and the `code-surface` parameter, with
   their proofs and mutations.
5. Re-run the owned files, then `npm run test:src:styles`, `npm run test:setup`, `npm run test:conformance`,
   `npm run test:guides`, and the Content section command from round 2.

## Output

Write `tmp/units/eic-report-3.md` and return the same text: the changes, the gate table with log paths, the
shared-file hunks, `tmp/units/eic-3.diff` (`git diff ca83afb`), and `tmp/units/eic-3-status.txt`. State no count.

## Acceptance criteria

The common criteria; `git diff ca83afb -- tests/src/styles/index.test.ts` is empty; no rule in the owned partials has
a descendant or child combinator between two tags.
