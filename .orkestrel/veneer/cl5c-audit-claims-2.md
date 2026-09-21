# CL5c audit — claims (round 2, the fix round under brief 4)

Subject: the whole CL5c change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
over the base `4f817db` (the CL5b landing), after the fix round `opus` ran under
`.orkestrel/veneer/units/cl5c-brief-4.md` (over briefs 3, 2, and 1, in force beneath it). Round
1's verdict is `.orkestrel/veneer/cl5c-audit-verdict.md`; the fix report is
`units/cl5c-report-3.md`. Evidence: the rendered diff `units/cl5c-diff-2.patch.txt` and status
`tmp/audit/cl5c-status-2.txt`, round 1's `units/cl5c-diff.patch.txt` for a diff-to-diff reading,
the live tree, and the built `dist/src/styles/index.css`.

**Scope of this round.** Implementation only: correctness, rule compliance, test sufficiency,
scope honesty. Rule on no guide row and report no prose finding of any kind. Round 1's rulings
carry unchanged and are not reopened, including every claim it confirmed and the two findings it
assigned elsewhere.

**What this round is.** Round 1 accepted the unit on all four lanes and sent back two findings
the lanes had not forced: a public retune seam with no guard, and a shared row type carrying one
section's name. This round rules on those two and on nothing round 1 settled.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding
only after the last claim, with a site and a one-line failure scenario, saying whether it forces
another round.

1. The mark tokens are now read as retune points. `tests/setupStyles.ts` gains a table pairing
   each painting property with the token the shared treatment reads it from and a colour neither
   system keyword resolves to. `tests/src/styles/components/type.test.ts` gains a case mounting
   one host that declares both tokens and reading both properties from the bare tag and from the
   span carrying the class, requiring each side to equal the retuned pair. Both sides are read
   because one mixin serves both.

2. That case is proved to fail on the edit the finding named. Inlining the system colour keywords
   into the shared mixin reddened exactly that case, reporting the system colours' resolved
   values against the retuned pair, with no other case moving; restoring the token references
   returned the suite green (report-only red-then-green). The plant is gone and the mixin reads
   as briefs 1 to 3 left it.

3. The setup proof carries the new table the way it carries its siblings: the export-name set,
   the property-to-token rows, the freeze loop, and a disjointness assertion against the paint
   the default mark table carries. **The unit added that last assertion beyond what brief 4
   named**, matching the invariant it had already established for the heading and display retune
   tables, so the mark rows' discriminating property is not left unasserted.

4. The shared row type no longer carries one section's name. It is now named for the markup field
   the base renders, beside the button section's own row type, whose row carries a tag, classes,
   and attributes instead. The rename reaches the interface declaration in `app/browser/types.ts`,
   the type import and the three specimen table annotations in `app/browser/constants.ts`, the
   import and the specimens parameter in `app/browser/sections/SpecimenSection.ts`, and the
   comment naming the barrel's type exports in `tests/app/browser/index.test.ts`. The old name
   appears nowhere under `app/browser/` or in that proof. The rename is type-level: no
   assertion's meaning changes, and the guide never named the type.

5. Nothing round 1 settled moved. The two extractions, the mark mixin and its two consumers, the
   two registry leaves, the two tokens, the shared section base and its proof, the three
   subclasses, the caption reading, the figure residue reading, the retune disjointness
   assertion, and the split colour case are as round 1 accepted them.

6. `[mechanical]` Scope, law, and gates. `tmp/audit/cl5c-status-2.txt` differs from round 1's
   status by exactly one added path, `app/browser/constants.ts`, which carries the three specimen
   table annotations the rename must follow. **That addition is the Orchestrator's defect, not
   the unit's:** brief 4's criterion 2 required the annotations to follow the rename while its
   criterion 4 required the status to gain no path, and those two cannot both hold. The unit
   closed criterion 2, changed nothing else in that file, and recorded the conflict. The
   round-2 diff differs from round 1's only in that file, `app/browser/types.ts`,
   `app/browser/sections/SpecimenSection.ts`, `tests/app/browser/index.test.ts`,
   `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and
   `tests/src/styles/components/type.test.ts`. `guides/veneer.md`, `tests/setupConformance.ts`,
   `tests/fixtures/**`, `package.json`, `configs/**`, the vendored files, and every partial
   outside the two the mark ruling touches are absent from both. The added lines carry no `any`,
   no type assertion outside `as const` and the one type argument round 1 accepted, no non-null
   assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property,
   no default export, no skipped case, and no case named for a control; no plant residue remains.
   Every gate exits 0 on managed Chromium and Edge, and the independent verifier's chain is green
   with the status identical before and after.
