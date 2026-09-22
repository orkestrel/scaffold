# CL10 audit claims — the icon-link, ratio, and vertical-rule keys

The subject is the CL10 diff over the CL9 landing `5e011a3`, in the Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`. Every claim below is numbered once for the whole round.
Every lane of this round rules on this file and no other claim list.

Rule on each claim as **CONFIRMED**, **REFUTED**, or **UNPROVEN**, with the evidence that decides it.

**Before confirming any claim about a proof, name the mutation that would make that proof fail, and
say whether the proof's assertions distinguish that mutation from the passing case.** A proof that
cannot fail reads exactly like one that can. Where you cannot name such a mutation, the claim is
UNPROVEN rather than CONFIRMED.

Cite every site by its symbol — the case title, the export name, the selector — and give a line
number only as "currently around N". The tree moves under a landing.

## The keys

1. `src/styles/components/_icon-link.scss`, `_ratio.scss`, and `_vr.scss` each emit every family the
   record carries for their key, in the components layer, with the logical-property substitutions the
   campaign's standing ruling fixes, and emit nothing beyond them.
2. The ratio partial derives each named aspect from a loop over an aspect list, so a name added to
   that list emits its own box and no name is written out by hand.
3. The ratio partial writes its division bare rather than copying `_grid.scss`'s eight-decimal
   rounding, and the authored values match the record's ten-decimal precision.
4. No token was added. `src/styles/_tokens.scss` and `src/core/constants.ts` are untouched, and the
   vertical rule reads the `--bs-border-width` alias the token file already declares.
5. Nothing was deferred: no row was added to the guide's `### Deferred selectors` table, and every
   selector the record carries under the three keys is in the built cascade.

## The accounting

6. The selector prefix in `collectGridVocabulary` admits the three keys' families and refuses a
   longer name that merely begins with one of those words.
7. The case `collects the helper prefixes and their preference condition without admitting longer
   names` is a permanent control on claim 6, and it would fail if the prefix boundary were loosened.
8. The `as const` key tuple in the case `binds the built class-family selector and media-condition
   multiset to the inventory minus deferrals` carries all three keys, and that comparison catches an
   EXTRA emitted selector under these prefixes. It is the only assertion in this workspace that
   catches an extra one at all.
9. The three keys were added to the enumeration in `tests/conformance.test.ts` and to the
   enumeration in `tests/setupConformance.test.ts`, each in the position those lists require.
10. The presence scan admits all three keys: the icon-link and vertical-rule keys on selector rows
    alone because their properties objects are empty, and the ratio key on its selector rows plus a
    shipped variable row for `--bs-aspect-ratio`.

## The proofs

11. The case `binds every named ratio to the inventory, to its own name, and to the scale the family
    carries` compiles the ratio partial with Sass and compares the AUTHORED values against
    `RATIO_CASES`, which is what makes the precision ruling provable — the built cascade shortens
    every percentage to six significant digits and cannot distinguish an eight-decimal source from a
    ten-decimal one.
12. That case's eight-decimal `.not.toEqual` control actually separates the two scales rather than
    passing vacuously.
13. The case `carries the official icon-link classes and the undefined icon class in the mounted
    markup` asserts that no cascade selector IS `.bi` and that every selector mentioning `.bi` names
    a Veneer class beside it. Assess whether its equality against an ordered list of three selectors
    is order-dependent on the cascade walk, and whether that is a defect.
14. The case `reads the icon transition from the motion tokens and collapses it under reduced motion`
    drives the real preference through `stageMedia({ motion: false })` and reads `0.15s → 0s →
    0.15s`, and its motion-factor retune is set where the token is declared.
15. The case `gates the collapsed transition on the preference condition in the shipped cascade`
    reads the gated rule's own declarations, so a collapse written through a different property would
    report there even where the resolved duration agreed.
16. The case `shifts the icon on hover and on keyboard focus only while the hover class is present`
    reads the PAINTED offset rather than the computed transform string, because Chrome serializes a
    translate on an outermost `svg` element with its translation zeroed. Verify that claim about the
    serialization, and verify the proof would fail if the shift distance changed.
17. That case's `--bs-icon-link-transform` block-axis retune separates the published property from
    its fallback rather than rescaling the same shift.
18. Each proof carries a control that separates this key's treatment from what the element rules
    already give every anchor, every icon, and every box.

## The showcase and the scope

19. The showcase specimens use shipped classes only and declare no inline style, so the journey
    proof's inline-style assertion stays green without that off-limits file being touched.
20. No new showcase section was added, so neither application-side enumerating assertion needed to
    grow; verify that the tree's grouping actually supports that decision.
21. `git status --porcelain --untracked-files=all` lists only files the CL10 brief owns. Nothing
    off-limits was touched: `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`,
    `configs/**`, `src/styles/_tokens.scss`, `src/core/constants.ts`.
22. The shared-block sweep reports nothing for the three new partials, so no fix reaches another
    partial.

## The report's own corrections

23. The report's § 0 refutes the brief's premise that the reduced-motion preference cannot be driven
    in this harness. Rule on whether the refutation is correct, and on whether the unit was right to
    proceed rather than stop.
24. The report states the terrain record's prediction — that a grid-copied rounding scale would
    redden the vocabulary comparison — does not hold, because the build shortens both scales to the
    same six significant digits. Rule on that correction.
25. Scope honesty: rule on whether the report's account of what shipped matches the diff, including
    its claim that nothing was deferred and that the guide's 182 changed lines are mostly a
    formatter reflow.

## Evidence

- The diff: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-diff.patch`
- The status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-status.txt`
- The unit's report: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl10-report.md`
- The brief it ran: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl10-brief.md`
- The terrain record: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl10-terrain.md`
- The checkout: `C:/Users/mikes/WebstormProjects/veneer`
