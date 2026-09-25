# J-FIXTURES round 2 audit — claims

Subject: J-FIXTURES round 2 in `/home/user/veneer-jf` (uncommitted over Veneer `6882751`), briefed by
`j-fixtures-brief-2.md` (carrying J1 to J3 of `jf-audit-verdict.md`), written by `opus` on Opus 5.5, and reported in
`j-fixtures-report-2.md`. The diff is `jf-2.diff` (the whole change over `6882751`), the status `jf-2-status.txt`, and
the logs and scripts `jf-instruments/` (this round's carry the `jf-2-` prefix). All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A unit report's prose is not a claim subject. Each claim is
falsifiable; rule every one.

1. **Refusal runs.** Removing the duplicate refusal and removing the foreign refusal each redden a `requireMatch` case
   (`jf-2-mutation-duplicate.log.txt`, `jf-2-mutation-foreign.log.txt`), each assertion distinguishes its mutation, and
   each restore is byte-identical.
2. **Order.** The added case passes an SVG element then a `div`, asserts the duplicate refusal, and alone reddens when
   the HTML check runs first (`jf-2-mutation-order.log.txt`); its title states what it proves.
3. **Table home.** The shared message table is the exported `SAMPLE_MESSAGES` constant in `tests/setupBrowser.ts`, with
   TSDoc, in the export-list case, imported by the test file; no data table remains inside the test's `describe`
   callback; the constant's name follows the value-level naming rules.
4. **Unchanged surface.** `git diff 6882751` touches only `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`;
   every lookup's messages equal `6882751`'s; the diff adds no `any`, `as`, non-null assertion, suppression, or nested
   function declaration.
