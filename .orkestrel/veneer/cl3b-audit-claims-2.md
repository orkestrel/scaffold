# CL3b audit — claims (round 2, the fix round under brief 3)

Subject: the whole CL3b change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
over the base `9bb306e` (the CL3 landing), after the fix round `opus` on native Opus 5 ran under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3b-brief-3.md` (over briefs 2
and 1, in force beneath it). Round 1's verdict is `.orkestrel/veneer/cl3b-audit-verdict.md`; the
fix report is `units/cl3b-report-2.md`. Evidence: the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3b-diff-2.patch.txt` and status
`tmp/audit/cl3b-status-2.txt`, round 1's `units/cl3b-diff.patch.txt` for comparison, and the live
tree. Audits cover implementation only: correctness, rule compliance, test sufficiency, scope
honesty. Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence; a
report-only claim (a red-then-green run) is recorded as report-only; add an
implementation-defect finding only after the last claim, with a site and a one-line failure
scenario, saying whether it forces another round.

Round 1's rulings carry unchanged and are not reopened: every token, binding, and proof it
confirmed stands, and claim 4's necessity refutation is recorded there (the rename stands on the
name brief 1's instruction implies, not on a law that compels it; no code changed for it).

1. The finding is closed. `tests/src/styles/tokens.test.ts` imports `TEXT_MODES` from
   `tests/setupStyles.ts` in its existing named-import block, and all three case registrations
   read it: the code calibration case and the two content calibration cases. The pattern
   `it.each(['` matches nothing in the file, and no other inline mode matrix or expected-value
   table remains in it. `tests/setupStyles.ts` and `tests/setupStyles.test.ts` are unedited and
   absent from the round-2 delta, because `TEXT_MODES` was already exported and already listed in
   the setup inventory assertion.

2. The registrations still bind, and the frozen table narrows the type. Each of the three cases
   produced a light case and a dark case under the plant the unit ran, and each bound its planted
   value: the plant set one expected value wrong on both branches of each case's mode ternary and
   reddened all six registrations (`1 failed | 29 passed (30)` files, `6 failed | 156 passed
   (162)` tests), restored green at `30 passed (30)` and `162 passed (162)` (report-only).
   `TEXT_MODES` is a frozen `as const` tuple, so `mode` narrows to the two literals at each site
   and every `mode === 'light'` branch typechecks unchanged (`npm run check` exit 0).

3. The sweep is recorded and complete. The report names its population (every file under
   `tests/src/styles/**` plus the mixins fixture), its patterns, and a ruling per hit: every
   `.each(` registration in the suite reads a setup export, no `describe.each` or `test.each`
   exists, no loop or callback registers a matrix, the surviving mode literals are single-specimen
   selectors and the subject of the theme proof rather than matrices, and the local arrays are
   specimen handles, accumulators, a derived expectation, and two subject-selection lists of
   `TOKEN_NAMES` members that carry no expected values. The two lists are reported rather than
   edited, because relocating them needs `tests/setupStyles.ts`, which brief 3 puts off-limits,
   and because they register nothing.

4. Nothing else in the file moved by hand. The assertions, the expected values, and round 1's
   anchor proof stand as round 1 left them; the only other change in the file is the scoped
   formatter's reflow of the code-calibration case, which the standing clause grants and which
   the unit ran scoped to that one file.

5. `[mechanical]` Scope, law, and gates. `tmp/audit/cl3b-status-2.txt` lists the same eighteen
   modified paths as round 1 and nothing new; the round-2 diff differs from round 1's only in
   `tests/src/styles/tokens.test.ts`, and the other seventeen files carry byte-identical hunks in
   both. `tests/setupStyles.test.ts`, `tests/src/styles/integration.test.ts`,
   `tests/src/core/index.test.ts`, `tests/conformance.test.ts`, `src/styles/_theme.scss`,
   `src/styles/components/**`, `src/browser/**`, `app/**`, `tests/fixtures/**`, `package.json`,
   `configs/**`, and the vendored files are absent from the diff. The added lines carry no `any`,
   no type assertion outside `as const`, no non-null assertion, no suppression comment, no
   `public`/`private`/`protected`, no parameter property, no default export, no skipped case, and
   no case named for a control; no plant residue remains (the unit restored the file from a
   byte-exact copy rather than re-editing it, and ran no `git checkout`, `restore`, `stash`,
   `reset`, or `clean`). Every gate in brief 3's item 3 exits 0, and the independent verifier's
   full chain (including `npm test`, the journeys, the Edge runs, and `scaffold audit`) is green
   with the status identical before and after.
