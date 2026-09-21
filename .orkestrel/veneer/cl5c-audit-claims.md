# CL5c audit — claims

Subject: unit CL5c in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the
base `4f817db` (the CL5b landing), written by `opus` on native Opus 5 under
`.orkestrel/veneer/units/cl5c-brief.md` with `units/cl5c-brief-2.md` and `units/cl5c-brief-3.md`
above it. Reports: `units/cl5c-report.md` (the run that stopped on the mark ruling) and
`units/cl5c-report-2.md` (the run that closed it). Scope read:
`units/cl5c-scope-read-report.md`. The mark ruling's evidence is
`units/cl5-twin-measurement.md`.

Evidence: the rendered diff `units/cl5c-diff.patch.txt` and status `tmp/audit/cl5c-status.txt`,
the live tree, and the built `dist/src/styles/index.css`.

**Scope of this audit.** Implementation only: correctness, rule compliance, test sufficiency,
scope honesty. Rule on no guide row and report no prose finding of any kind; the guide is outside
this audit entirely and this unit did not touch it.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding
only after the last claim, with a site and a one-line failure scenario, saying whether it forces
another round.

1. One implementation carries the specimen section behaviour. A base under
   `app/browser/sections/` creates the region, sets its label from its copy, appends the lead
   paragraph, appends one container per specimen row, and removes the region on destruction. The
   three specimen sections each reduce to a constructor passing their own copy object and
   specimen table to it. Each remains its own constructible export, which the barrel proof's
   pinned key set and each section proof's by-name construction require. The button section is
   untouched, because it owns engines, mounts through a private pair, applies a grid class, and
   releases those engines before removing its region.

2. Every existing case in the three section proofs and the showcase proof passes with no
   expectation edited, and those four files are absent from the diff except where the barrel's
   key set grew. The showcase still constructs and destroys the same regions in the same order.

3. The base is itself proved. A proof constructs it directly with a specimen table no shipped
   constant carries, so the shared behaviour is pinned independently of its three subclasses.

4. The mark twin renders alike because both sides read one mixin. `src/styles/_mixins.scss` gains
   one mixin emitting the inline-axis padding and the two mark tokens; `src/styles/elements/_mark.scss`
   and `src/styles/components/_type.scss` each include it and declare nothing else of their own
   for that selector. The built cascade emits the same three declarations for the tag and for the
   class.

5. The two tokens are registered and mode-independent. `src/core/constants.ts` gains exactly two
   leaves, a mark leaf beside the text group's highlight leaf and one beside the surface group's,
   and the registry path law fixes their names. `src/styles/_tokens.scss` declares them at the
   root scope carrying the CSS system colours. `tests/src/styles/tokens.test.ts` passes unedited,
   so the root partition equals the registry and has one author.

6. The tag's rendered paint did not move. Its case table and its proof are byte-identical to
   `4f817db`, so the table is the reading taken before the change and the run is the reading
   after: the block-axis padding, the inline-axis padding, the colour, and the background all
   resolve as they did (report-only run).

7. The comparison is falsifiable and reads the element the user agent's rule does not reach. The
   case mounts the bare tag and a span carrying the class in one host, pins the span's readings
   against its own table, then asserts the span's readings equal the tag's. A span is used
   deliberately, because a class on a mark element would agree with its tag whether or not the
   class painted anything. Two plants were run: one moved the class's padding and the table pin
   caught it; one moved the tag's padding, where the class still matched its own table and only
   the comparison caught the divergence (report-only red-then-green).

8. The mark treatment does not trip the standing sweep. `npm run test:setup` reports no shared
   written declaration block, because each partial's mark block holds one include and no written
   declaration (report-only run). The previous run measured the opposite when the treatment was
   written into both partials directly, which is why the mixin exists.

9. The caption pair is reported rather than bound, and the figure residue is read. Both caption
   values were measured in both modes and do not resolve alike, so the existing assertion
   recording the difference stands unedited. The classed figure's case now reads the residual
   direction and gap beside the display, so a later change giving that class a flex or grid
   display reddens the reading that records the residue it would re-arm.

10. The retune tables' invariant is asserted and proved to fire. The case that freezes the
    component case tables now asserts every retune value is disjoint from every size the default
    tables carry. Setting one retune row to its own default reddened that case while the whole
    styles project stayed green, which is the silent disarm the assertion exists to catch
    (report-only red-then-green).

11. The colour control has its own case. The agreement case keeps size, line, weight, margin, and
    the inherited-colour equality on one host; a separate table-driven case mounts the painted
    host alone and reads colour alone, taking the shape the element proof one directory over
    already uses.

12. `[mechanical]` Scope, law, and gates. `tmp/audit/cl5c-status.txt` lists only files the three
    briefs own. `guides/veneer.md` is absent from the diff, and the unit reports that no gate
    required a row. `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`,
    `configs/**`, the vendored files, and every partial outside the two the mark ruling touches
    are absent. The added lines carry no `any`, no type assertion outside `as const`, no non-null
    assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property,
    no default export, no skipped case, and no case named for a control; no plant residue
    remains. Every gate exits 0 on managed Chromium and Edge, and the independent verifier's
    chain is green with the status identical before and after.
