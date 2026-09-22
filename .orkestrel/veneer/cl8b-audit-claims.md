# CL8b audit — claims

Subject: unit CL8b in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the base
`d2c5bb3` (the CL8 landing), written by `sol` on Astra under
`.orkestrel/veneer/units/cl8b-brief.md` with `units/cl8b-brief-2.md` above it. Reports:
`units/cl8b-report.md`, a stop, and `units/cl8b-report-2.md`, the run that finished. Terrain and
rulings: `units/cl8b-rulings.md`, measured rather than scouted. Scope read:
`units/cl8b-scope-read-report.md`.

Evidence: the rendered diff `units/cl8b-diff.patch.txt` and status `tmp/audit/cl8b-status.txt`, the
live tree, and the built `dist/src/styles/index.css`.

**Scope of this audit.** Implementation only: correctness, rule compliance, test sufficiency, scope
honesty. Report no wording or prose finding. The guide's compatibility and deferral rows are the one
exception and are in scope as a contract, because the conformance run reads them.

**The unit stopped once, correctly, on a false fact in its brief.** Brief 1 said the recorded `row`
component does not carry the gap entries. It carries all of them, and this campaign had already
measured that and recorded it correctly in its own plan before the brief asserted the opposite. The
unit read the record, refused to adjust the comparison to fit the premise, and stopped. That is not a
defect in its work; do not rule on it as one. The rule it earned is in
`.agents/orchestration.md` § Check the brief before you send it at scaffold `3b2c0712`.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding only
after the last claim, with a site and a one-line failure scenario, saying whether it forces another
round.

1. Every selector the record carries under `g`, `gx`, `gy`, and `row-gap` ships, at its condition, in
   the grouping the record carries, with nothing extra. The gutter steps emit two rules per step, the
   combined class grouped with the horizontal-only class in one and the vertical-only class in the
   other, which is Bootstrap's own shape and what the multiset comparison requires. The row-gap steps
   emit their own rules.

2. The `row` key now closes. Its deferral rows are gone and every `.row-gap-*` selector the record
   carries is present in the built cascade, so the presence scan requires each and finds each. **Rule
   whether anything other than deleting those rows and shipping those selectors was needed**, and
   whether a deferral row remains for any name still withheld.

3. The step scale is the unit's own and carries no density factor. Six step tokens hold the values the
   record sets, each with a registry leaf, distinct from the gutter axis tokens. **Rule the
   consequence the ruling rests on**: that a utility and the default it overrides now resolve to the
   same length at any density factor, where reading the space scale would have made them disagree.

4. The important priority matches the record. The row-gap rules carry it and the gutter
   custom-property rules do not, which is the asymmetry Bootstrap's own distribution carries. **Rule
   this against the record and the installed distribution, not against the report.**

5. The emitted-vocabulary proof is extended correctly, and the correction the stop forced is the right
   one. The collector's prefix admits the three gutter prefixes and needs nothing for the row-gap
   prefix, which the row alternative already admits. The recorded key tuple names the three gutter
   keys and **not** `row-gap`, because the `row` key already carries those selectors and naming both
   would count each twice against a cascade emitting each once. **Rule whether that is true of the
   record**, and whether the tuple as written now matches the cascade in both directions.

6. That extension reddens in both directions, proved against the tree. A recorded selector removed
   from the built cascade reddened it; an unrecorded selector under one of the new prefixes added to
   it reddened it; each restoration returned it green with a digest recorded (report-only
   red-then-green).

7. The proof reads the browser rather than the rule's text. The step utilities are read through their
   effect — a row's resolved margins and its child's resolved padding for the gutter axes, and the
   resolved row gap for the gap steps — at and around the boundary each breakpoint variant activates.
   The density independence is read rather than asserted: retuning the density factor leaves these
   readings unchanged. A control on one emitted value reddened a reading and restored green
   (report-only).

8. The step list and the infixes are bound to their sources, so a later addition reddens rather than
   shipping unproved: the steps against the record, the infixes against the compiled ramp's non-zero
   names.

9. The partial's placement and the scale's shape follow the tree rather than inventing a convention.
   The partial sits in a utilities folder under the utilities cascade layer the token file already
   declares, loaded after the component partials, and drives every family from one loop over the ramp
   with an empty infix at the zero boundary. It adds no mixin and the shared-block sweep reports
   nothing shared.

10. `[mechanical]` Scope, law, and gates. `tmp/audit/cl8b-status.txt` lists only files the two briefs
    own, including the new partial and its proof at the paths the unit chose and reported.
    `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, every other
    partial and proof, and the vendored files are absent. The added lines carry no `any`, no type
    assertion outside `as const`, no non-null assertion, no suppression comment, no
    `public`/`private`/`protected`, no parameter property, no default export, no skipped case, and no
    case named for a control. Every gate exits 0 on managed Chromium, and the styles, browser-setup,
    and app-browser projects exit 0 on Edge, with the independent verifier's chain green and the
    status identical before and after.
