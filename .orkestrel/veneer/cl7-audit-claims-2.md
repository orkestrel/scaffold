# CL7 audit — claims (round 2, the fix round under brief 3)

Subject: the whole CL7 change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
over the base `c8f53f8` (the CL6 landing), after the fix round `sol` ran under
`.orkestrel/veneer/units/cl7-brief-3.md` (over briefs 2 and 1, in force beneath it). Round 1's
verdict is `.orkestrel/veneer/cl7-audit-verdict.md`; the fix report is `units/cl7-report-2.md`.
Evidence: the rendered diff `units/cl7-diff-2.patch.txt` and status `tmp/audit/cl7-status-2.txt`,
round 1's `units/cl7-diff.patch.txt` for a diff-to-diff reading, the live tree, and the built
`dist/src/styles/index.css`.

**Scope of this round.** Implementation only: correctness, rule compliance, test sufficiency,
scope honesty. Report no wording or prose finding; the guide's compatibility rows stay in scope
as a contract, judged on their facts being true of the code. Round 1's rulings carry unchanged
and are not reopened.

**What this round is.** Round 1 accepted the unit on all four lanes and sent back two findings no
lane had forced: a silent-failure path where the cap loop is bound to the ramp while the token
set is not, and a direction axis in the container proof that cannot fail. This round rules on
those two and on nothing round 1 settled.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding
only after the last claim, with a site and a one-line failure scenario, saying whether it forces
another round.

1. The ramp and the container token set are now asserted equal. The styles setup proof compiles
   the actual ramp, excludes the zero boundary, and compares the remaining names against the
   container token keys as sets, so a member missing from either side reddens. The assertion
   reads the real ramp rather than a restated list.

2. That assertion is proved to fail on the path the finding named. Adding a ramp member without
   its container token reddened it with the unmatched member named, and removing that exact
   addition returned it green (report-only red-then-green). The mixins file is byte-identical to
   its pre-control state, with a digest recorded.

3. The direction axis is gone and every reading it wrapped is retained. The container proof
   replaces the direction-parameterized suite with an ordinary one and removes the direction
   attributes; every assertion, expected value, variant, boundary visit, gutter override,
   navigation reading, and cap-retuning case remains, and no reading changed.

4. The saving is measured, not asserted. The container proof's case count and both engines'
   durations are reported before and after, on runs that each exit 0 (report-only readings).

5. Nothing round 1 settled moved. The partial, the tokens, the registry leaves, the guide's
   compatibility rows, the listed value, the section, and every other proof are as round 1
   accepted them, and the shared-block sweep still reports nothing shared over a population that
   includes the mixins file.

6. `[mechanical]` Scope, law, and gates. `tmp/audit/cl7-status-2.txt` is identical to round 1's
   status: the same paths, no addition and no removal. The round-2 diff differs from round 1's
   only in `tests/setupStyles.test.ts` and `tests/src/styles/components/container.test.ts`.
   `src/styles/_mixins.scss` is absent from the status, so the ramp plant left nothing behind.
   `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, and the
   vendored files are absent from both. The added lines carry no `any`, no type assertion outside
   `as const`, no non-null assertion, no suppression comment, no
   `public`/`private`/`protected`, no parameter property, no default export, no skipped case, and
   no case named for a control. Every gate exits 0 on managed Chromium and Edge, and the
   independent verifier's chain is green with the status identical before and after.
