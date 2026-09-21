# CL6 audit — claims

Subject: unit CL6 in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the base
`c1c81a4` (the CL5c landing), written by `sol` on Astra under
`.orkestrel/veneer/units/cl6-brief.md` with `units/cl6-brief-2.md` and `units/cl6-brief-3.md`
above it. Reports: `units/cl6-report.md`, the run that stopped before implementation, and
`units/cl6-report-2.md`, the run that completed. Terrain: `units/cl6-scout-report.md`. Scope read:
`units/cl6-scope-read-report.md`. The hover binding rests on `units/cl6-hover-mechanism.md` and
its instrument `units/cl6-hover-probe.mjs`.

Evidence: the rendered diff `units/cl6-diff.patch.txt` and status `tmp/audit/cl6-status.txt`, the
live tree, and the built `dist/src/styles/index.css`.

**Scope of this audit.** Implementation only: correctness, rule compliance, test sufficiency,
scope honesty. Report no wording or prose finding. **The guide's compatibility rows are the one
exception and are in scope as a contract rather than as prose**, because the conformance run
reads them: judge them on whether they are the rows the deciding function requires and whether
their facts are true of the code, never on their wording.

**The first run stopped correctly and wrote nothing.** Its brief required it to find the hover
mechanism in the calibration record before binding a hover value, and the record does not state
one. The Orchestrator resolved it by measurement and brief 3 carried the answer.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding
only after the last claim, with a site and a one-line failure scenario, saying whether it forces
another round.

1. Every selector the inventory records under the key ships, and none is excluded. The partial
   emits the coloured link classes for each role and the emphasis class at rest, hover, and
   focus; the opacity utilities and their hover twins; the underline offset utilities and their
   twins; the underline colour classes; and the underline opacity utilities and their twins. The
   report states no inventory selector is excluded, which is the accounting this family exists to
   produce.

2. The presence scan genuinely guards them. Removing one shipped selector from the built cascade
   reddened the conformance run with a message naming that component and selector, and restoring
   it passed (report-only red-then-green). A permanent case also asserts the omitted-selector
   finding.

3. The anchor's colours are bound to the calibration record, by the measured mechanism rather
   than by a copied number. The base takes the record's rest expression, a primary-over-body-text
   mix at seventy percent in light and eighty in dark; the hover base takes a twenty-percent
   black mix of that base in **both** modes, replacing the white mix the dark theme carried. The
   unit reports each retuned reading matching the record's serialization in each mode
   (report-only readings).

4. The blast radius was measured before and after, and nothing outside the owned set moved. The
   readings cover the two Veneer base tokens, their Bootstrap aliases, the two channel triplets
   and their aliases, the anchor at rest and hover, and the link-styled button's resolved rest,
   hover, and active colours, in both modes. Every other root token reading is reported
   unchanged. The button's partial is untouched, because it reads the tokens through variables;
   only its proof's two authorized assertions moved.

5. The opacity variable is now live, and that behaviour has its own proof. The anchor reads
   Bootstrap's link-opacity variable with an opaque fallback and nothing in Veneer assigned it
   before this unit; the opacity utilities are the assignments. The proof reads the same anchor
   opaque, applies an opacity utility, reads the expected alpha at rest and hover, removes the
   class, and reads opaque again, in both modes.

6. The key is listed with the rows the deciding function requires. Its inventory properties are
   non-empty, so it is not admitted by the empty-properties branch; the guide carries a shipped
   selector row and a shipped variable row for each of the two properties, and the listed value
   in `tests/conformance.test.ts` carries the key.

7. The role classes read Veneer's role tokens in every state rather than Bootstrap's literal
   channel triplets, and that departure is recorded in the compatibility row and bound by proofs
   exercising rest, hover, focus, and token overrides.

8. The shared-block sweep reports no shared block, and no mixin was needed. The underline colour
   and opacity assignments stay inline because they do not share a complete declaration block and
   the styles rule does not move a pattern confined to one partial.

9. The showcase section extends the shared base rather than repeating it, renders every declared
   specimen, and destroys, with the showcase and barrel proofs carrying it.

10. `[mechanical]` Scope, law, and gates. `tmp/audit/cl6-status.txt` lists only files the three
    briefs own. **One path needs a ruling rather than a check:** `tests/setupConformance.test.ts`
    appears in the status, and the scope read had found that only the listed value moves and that
    this file's cases run against synthetic rows for other components. The unit reports that the
    real-ledger case in that file also reads the compatibility table, that its full chain failed
    there, and that brief 1 grants the file where the key's rows move a population, so its
    expected set gained the key. **Rule whether that is within the grant and whether the scope
    read was wrong**, naming the case and what it reads. `src/styles/components/_button.scss`,
    `src/styles/_mixins.scss`, `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`,
    `configs/**`, and the vendored files are absent from the diff. The added lines carry no `any`,
    no type assertion outside `as const`, no non-null assertion, no suppression comment, no
    `public`/`private`/`protected`, no parameter property, no default export, no skipped case, and
    no case named for a control; no plant residue remains. Every gate exits 0 on managed Chromium
    and Edge, and the independent verifier's chain is green with the status identical before and
    after.
