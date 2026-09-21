# CL5b audit — claims (round 2, the fix round under brief 3)

Subject: the whole CL5b change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
over the base `ea82419` (the CL5 landing), after the fix round `sol` ran under
`.orkestrel/veneer/units/cl5b-brief-3.md` (over briefs 2 and 1, in force beneath it). Round 1's
verdict is `.orkestrel/veneer/cl5b-audit-verdict.md`; the fix report is `units/cl5b-report-2.md`.
Evidence: the rendered diff `units/cl5b-diff-2.patch.txt` and status `tmp/audit/cl5b-status-2.txt`,
round 1's `units/cl5b-diff.patch.txt` for a diff-to-diff reading, and the live tree.

**Scope of this round.** Implementation only: correctness, rule compliance, test sufficiency,
scope honesty. Rule on no guide row and report no prose finding of any kind. Round 1's rulings
carry unchanged and are not reopened, including every claim it confirmed and the two findings it
recorded as correct rather than carried.

**What this round is.** Round 1 accepted the unit and sent back four findings that narrowed the
gate it ships, all in one function. This round rules on whether that gate now catches what it
missed, and on nothing else that round 1 settled.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding
only after the last claim, with a site and a one-line failure scenario, saying whether it forces
another round.

1. An interpolated property name now enters its block. The declaration reader admits an
   interpolation inside a custom property name, inside an ordinary one, and as the whole name, so
   a block whose declarations carry interpolated properties is no longer recorded as empty and
   dropped. The bodies that were invisible in round 1 are the role-each mixin's and the aliased
   loop's in `src/styles/_mixins.scss`.

2. That closure is proved against the tree, not just against a case. A block of
   interpolated-property declarations planted inside a loop in two partials the extractions never
   touched reddened the tree-is-clean case, and the diagnostic named both files and the
   interpolated declarations; removing it returned the suite green and restored both files byte
   for byte (report-only red-then-green). Neither planted file appears in the diff, and a search
   for the planted names across the source and test trees returns nothing, covering this round's
   plant and round 1's.

3. Whitespace inside an interpolation is folded the way whitespace outside one is, so two
   spellings of one interpolation compare equal, while whitespace inside a quoted string is
   preserved. A case pins both halves.

4. The parenthesis counter cannot go negative, so one unmatched closing parenthesis can no longer
   disable block detection for the rest of a file. The unit added no artificial malformed-source
   case and recorded the change as an observation, which is what the brief permitted.

5. The reported paths use forward slashes on every host. The discovery step normalizes the
   relative path before it reaches the file list or a block diagnostic, and the discovery case
   pins literal forward-slash paths in both.

6. The three fixable findings were red before the change and green after. The same focused
   command over the sweep's cases failed on exactly the path, interpolated-property, and
   interpolation-whitespace cases before the implementation changed, and passed afterwards
   (report-only red-then-green).

7. Nothing round 1 settled moved. The sweep's population and result are unchanged at 48 partials,
   1128 pairs, and no shared block. The two-declaration threshold and the exclusion of same-file
   duplication are unchanged, which round 1 ruled correct. The two extractions, the fixture move,
   and the cascade are untouched: the rebuilt stylesheet matches round 1's digest, and the four
   proofs that read the extracted declarations pass with no expectation edited.

8. `[mechanical]` Scope, law, and gates. `tmp/audit/cl5b-status-2.txt` is identical to round 1's
   status: the same paths, no addition and no removal. The round-2 diff differs from round 1's
   only in `tests/setupConformance.ts` and `tests/setupConformance.test.ts`. `package.json` and
   the lockfile are absent from both, no import of an undeclared package was added, and
   `guides/veneer.md`, `src/styles/_tokens.scss`, `_reset.scss`, `tests/fixtures/**`, `configs/**`,
   the vendored files, and every partial outside the four the extractions touch are absent. The
   added lines carry no `any`, no type assertion outside `as const`, no non-null assertion, no
   suppression comment, no `public`/`private`/`protected`, no parameter property, no default
   export, no skipped case, and no case named for a control; no plant residue remains. Every gate
   exits 0 on managed Chromium and Edge, and the independent verifier's chain is green with the
   status identical before and after.
