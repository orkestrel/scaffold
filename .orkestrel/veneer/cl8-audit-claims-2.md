# CL8 audit — claims (round 2, the fix round under brief 4)

Subject: the whole CL8 change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
over the base `a9172df` (the CL7 landing), after the fix round `sol` ran under
`.orkestrel/veneer/units/cl8-brief-4.md` (over briefs 3, 2, and 1, in force beneath it). Round 1's
verdict is `.orkestrel/veneer/cl8-audit-verdict.md`; the fix report is `units/cl8-report-4.md`.
Evidence: the rendered diff `tmp/audit/cl8-diff-2.patch` and status `tmp/audit/cl8-status-2.txt`,
round 1's `tmp/audit/cl8-diff.patch` for a diff-to-diff reading, the live tree, and the built
`dist/src/styles/index.css`.

**Scope of this round.** Implementation only: correctness, rule compliance, test sufficiency, scope
honesty. Report no wording or prose finding; the guide's compatibility and deferral rows stay in
scope as a contract, judged on their facts being true of the code. **Round 1's rulings carry
unchanged and are not reopened** — the accounting, the percentage arithmetic, the extraction, the
partial, the guide rows, the deferral rows, and the conformance listing were accepted there.

**What this round is.** Round 1 accepted the implementation and forced a round on two findings: no
assertion read what the partial actually emits, proved by a lane appending a step to the offset list
and watching that selector ship while both binding operands still agreed; and an assertion that
re-derived its expectation with the construction's own expression, so it could not fail. Three
non-forcing findings rode along. This round rules on those and on nothing round 1 settled.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding only
after the last claim, with a site and a one-line failure scenario, saying whether it forces another
round.

1. The emitted vocabulary is now bound to the record. A retained assertion compares the built
   cascade's grid selector and media-condition multiset against the inventory's, minus the guide's
   actual deferrals. **Rule whether each operand is real**: the cascade read through the existing
   reader rather than a restated fixture, the record read from the pinned inventory, and the
   deferrals read through `readDeferrals` rather than a literal list. Rule whether the comparison is
   a multiset rather than a set, so a duplicate or a lost duplicate is visible.

2. It reddens in both directions, proved against the tree. Removing a recorded selector from the
   built cascade reddened it naming that selector at its condition; appending an unrecorded grid
   selector reddened it naming that selector; each restoration returned it green, with the cascade's
   digest recorded identical (report-only red-then-green). **Rule whether the plant's site makes the
   control meaningful**: the plant is in the built artifact rather than the source, so say whether
   that leaves the source-to-cascade step unproved and whether round 1's own attack already covers
   it.

3. The assertion that could not fail is now falsifiable. The breakpoint readings are written as
   literal rows rather than re-derived from the construction, and narrowing the construction
   reddened the literal assertion with the dropped readings named, restoring returning it green and
   the setup module's digest identical (report-only red-then-green).

4. The three non-forcing findings are closed. Both consumers of the zero-boundary row now identify
   it by its boundary, and its name array is compared against the compiled ramp's own zero keys
   rather than filtered out of the comparison. One exported function owns the ramp compilation, is
   called by both cases, and is named in the exports assertion. The showcase assertion addresses the
   navigation specimen by name rather than by position. **Rule whether the zero-row binding would
   catch a second zero-boundary entry**, which is the failure the finding named.

5. Nothing round 1 accepted moved. The partial, the extraction, the mixins, the guide's
   compatibility and deferral rows, the conformance listing, and the granted conformance-proof
   assertion are as round 1 accepted them; the diff-to-diff delta is confined to the test files this
   round owns.

6. `[mechanical]` Scope, law, and gates. `tmp/audit/cl8-status-2.txt` is identical to round 1's
   status: the same paths, no addition and no removal. The round-2 diff differs from round 1's only
   in `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/components/grid.test.ts`,
   and `tests/app/browser/sections/LayoutSection.test.ts`. `src/styles/components/_grid.scss`,
   `src/styles/_mixins.scss`, `src/styles/components/_container.scss`, `guides/veneer.md`,
   `tests/conformance.test.ts`, and `tests/setupConformance.test.ts` are byte-identical across the
   rounds. `tests/setupConformance.ts`, `tests/src/styles/components/container.test.ts`,
   `tests/fixtures/**`, `package.json`, `configs/**`, and the vendored files are absent from both.
   The added lines carry no `any`, no type assertion outside `as const`, no non-null assertion, no
   suppression comment, no `public`/`private`/`protected`, no parameter property, no default export,
   no skipped case, and no case named for a control. Every gate exits 0 on managed Chromium, the
   styles, browser-setup, and app-browser projects exit 0 on Edge, and the independent verifier's
   chain is green with the status identical before and after.
