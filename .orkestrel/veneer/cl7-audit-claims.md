# CL7 audit — claims

Subject: unit CL7 in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the base
`c8f53f8` (the CL6 landing), written by `sol` on Astra under
`.orkestrel/veneer/units/cl7-brief.md` with `units/cl7-brief-2.md` above it. Report:
`units/cl7-report.md`. Terrain: `units/cl7-scout-report.md`. Rulings: `units/cl7-rulings.md`.
Scope read: `units/cl7-scope-read-report.md`.

Evidence: the rendered diff `units/cl7-diff.patch.txt` and status `tmp/audit/cl7-status.txt`, the
live tree, and the built `dist/src/styles/index.css`.

**Scope of this audit.** Implementation only: correctness, rule compliance, test sufficiency,
scope honesty. Report no wording or prose finding. **The guide's compatibility rows are the one
exception and are in scope as a contract**, because the conformance run reads them: judge them on
whether they are the rows the deciding function requires and whether their facts are true of the
code, never on their wording.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding
only after the last claim, with a site and a one-line failure scenario, saying whether it forces
another round.

1. Every selector the inventory records under the key ships, and none is excluded. The partial
   emits the fluid shell as one grouped rule, the breakpoint caps from a loop over the ramp that
   skips the zero boundary and accumulates the named variants, and the navigation combinators as
   one grouped rule. The fluid variant never receives a cap.

2. The presence scan guards them, proved against the tree. Omitting one navigation combinator
   from the built cascade reddened the conformance run with a message naming that component and
   selector, and restoring it passed (report-only red-then-green). A retained case also removes
   that selector from a cascade copy and asserts the diagnostic.

3. The navigation combinators ship rather than being excluded, which was the Orchestrator's
   ruling. They emit self-contained layout on the container, and the rule matches nothing until a
   consumer brings navigation markup. The unit reports that the navigation class is referenced and
   not defined, listed as a bound for the guide's owner.

4. The widths and the gutter take tokens with registry leaves, and the ramp is unchanged. Five
   container tokens carry the payload widths and two carry the gutter, each with a leaf under the
   registry whose value the path law fixes. No ramp member changed, and the caps read their own
   container token through the loop rather than a literal.

5. The blast radius was measured and nothing moved. The space scale's twelfth member, which
   carries the gutter's value by coincidence, has exactly two consumers: its registry entry and
   the density-rescaling assertion. Both read identically before and after, at both density
   factors, and the density proof needed no edit (report-only runs). No partial reads that member
   through a variable.

6. The container's width is read rather than assumed, at and around every boundary. The proof
   drives the viewport through the existing case table and visitor and reads the resolved maximum
   width and the used width below, at, and above each boundary, in both directions, on both
   engines. Each named variant stays fluid until its own boundary and then takes the subsequent
   caps; the fluid variant stays fluid throughout.

7. That width reading is itself falsifiable. Changing one container token by a single pixel
   reddened the boundary case with a message naming the expected and received widths, and
   restoring it passed (report-only red-then-green). This is a second, independent control beside
   the presence scan's.

8. The key is listed with the rows the deciding function requires. Its inventory properties are
   non-empty, so it is not admitted by the empty-properties branch; the guide carries a shipped
   selector row and a shipped variable row for each gutter property, and the listed value carries
   the key. The gutter proof reads resolved defaults, canonical overrides, and direct overrides,
   with the inline padding computed from the gutter and the block property adding none.

9. The shared-block sweep reports no shared block and no mixin was needed, over a population that
   includes the mixins file itself.

10. The showcase section extends the shared base rather than repeating it, rendering capped and
    fluid containers, the responsive variants, and navigation parents containing each variant.

11. `[mechanical]` Scope, law, and gates. `tmp/audit/cl7-status.txt` lists only files the two
    briefs own. `src/styles/_mixins.scss` is absent from the diff, so the grant brief 2 made for a
    shared block went unused. `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`,
    `configs/**`, the vendored files, and every partial outside the new one are absent. The added
    lines carry no `any`, no type assertion outside `as const`, no non-null assertion, no
    suppression comment, no `public`/`private`/`protected`, no parameter property, no default
    export, no skipped case, and no case named for a control; no plant residue remains. Every
    gate exits 0 on managed Chromium and Edge, and the independent verifier's chain is green with
    the status identical before and after.
