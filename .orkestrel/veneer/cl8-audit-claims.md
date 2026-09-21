# CL8 audit — claims

Subject: unit CL8 in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the base
`a9172df` (the CL7 landing), written by `sol` on Astra under
`.orkestrel/veneer/units/cl8-brief.md` with `units/cl8-brief-2.md` and `units/cl8-brief-3.md` above
it. Reports: `units/cl8-report.md` and `units/cl8-report-2.md`, each a stop, and
`units/cl8-report-3.md`, the run that finished. Terrain: `units/cl8-scout-report.md`, which the
briefs supersede where they differ. Scope read: `units/cl8-scope-read-report.md`.

Evidence: the rendered diff `units/cl8-diff.patch.txt` and status `tmp/audit/cl8-status.txt`, the
live tree, and the built `dist/src/styles/index.css`.

**Scope of this audit.** Implementation only: correctness, rule compliance, test sufficiency, scope
honesty. Report no wording or prose finding. The guide's compatibility and deferral rows are the one
exception and are in scope as a contract, because the conformance run reads them: judge them on
whether they are the rows the deciding functions require and whether their facts are true of the
code, never on their wording.

**The unit stopped twice, both times correctly, and both scope gaps were the Orchestrator's.** Brief
1 told the unit to follow the container partial's gutter-alias pattern and then made that partial
off-limits, so the standing shared-block sweep fired on a duplication the unit could not fix inside
its scope. Brief 1 also made the conformance setup proof off-limits, dropping a grant CL7 held, and
that proof enumerates every component carrying guide rows as a literal set. Neither stop is a defect
in the unit's work. Do not rule on them as such; rule on what shipped.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding only
after the last claim, with a site and a one-line failure scenario, saying whether it forces another
round.

1. Every grid selector the inventory records under `row`, `col`, and `offset` ships, at the
   condition it is recorded under, and nothing extra ships. The withheld families — every
   `.row-gap-*` name and the three `.col-form-label*` names — are absent from the built cascade.

2. Every shipped grid declaration carries the value the inventory records, once the logical-property
   ruling and the gutter-alias ruling are applied. The Orchestrator compiled `src/styles/index.scss`
   unminified and compared every recorded declaration of the three keys against the emitted one: no
   recorded selector is absent, and the values agree except `.offset-{bp}-0`, where the record has
   an unitless `0` and the source emits `0%`. Rule whether that difference is computed-equivalent
   and whether anything else differs.

3. The keys are listed, and every withheld name is deferred with an owner. The guide carries a
   shipped selector row per family for each key and the row key's two variable rows; the deferral
   table carries a row per withheld name, the `.row-gap-*` names to `CL8b` and the
   `.col-form-label*` names to `Forms`; the listed value carries all three keys; and the presence
   scan passes with no deferred name emitted.

4. The extraction preserved the container exactly. The blocks the sweep named were moved to
   `src/styles/_mixins.scss` as `alias-gutters` and `pad-gutters`, each with two callers, and the
   container's emitted declarations are unchanged. **Rule this on the substitution itself, not only
   on the unit's instrument**: read the mixin bodies and the call sites and say whether the emitted
   declaration sequence can differ. The unit's comparison instrument, its negative controls, and its
   whole-cascade byte comparison are report-only corroboration.

5. The shared-block sweep reports nothing shared, over a population that includes `_mixins.scss` and
   every partial under `src/styles/`. Neither extracted mixin has one caller.

6. The generated vocabulary is bound to its sources, so a later addition reddens rather than
   shipping unproved. The setup proof asserts the grid tables' breakpoint infixes against the
   compiled ramp, the column steps and the row-column counts against the inventory, and the whole
   generated selector set against the inventory minus the withheld families. **Rule whether each
   binding reads its real source rather than a restated copy, and whether it fails in both
   directions.** This is the finding CL7's audit carried into this unit.

7. The proof reads the browser rather than the rule's text, at and around the boundary each
   breakpoint variant activates. It reads the row's negative margins and its child's padding at the
   default gutter and after canonical and alias overrides, a numbered column's used width against
   its share of the row, an offset's resolved inline start margin, and the row-column count's effect
   on its children. The cascade collision between a count and a numbered column is read rather than
   assumed.

8. That reading is falsifiable. Changing the row's inline margin factor reddened a boundary case
   with the expected and received values named, and restoring the exact bytes returned it green,
   with the partial's digest recorded identical (report-only red-then-green).

9. The partial adds no token and drives every generated family with a loop over a shared list. The
   unconditioned and breakpoint-scoped variants come from one loop over the ramp with an empty
   infix at the zero boundary, and the offset's zero member exists only in its breakpoint form, as
   the inventory records.

10. The showcase section extends the existing layout section rather than adding one, and the three
    findings CL7's audit carried are closed: the showcase wiring's ordering, the layout copy
    constant's annotation, and the setup proof's import-list and exports-assertion ordering.

11. `[mechanical]` Scope, law, and gates. `tmp/audit/cl8-status.txt` lists only files the three
    briefs own, including `src/styles/components/_container.scss` and `src/styles/_mixins.scss`,
    which brief 2 granted, and `tests/setupConformance.test.ts`, which brief 3 granted for one
    assertion. `tests/setupConformance.ts`, `tests/src/styles/components/container.test.ts`,
    `tests/fixtures/**`, `package.json`, `configs/**`, and the vendored files are absent. The change
    to the conformance proof adds only the three keys to one component set. The added lines carry no
    `any`, no type assertion outside `as const`, no non-null assertion, no suppression comment, no
    `public`/`private`/`protected`, no parameter property, no default export, no skipped case, and
    no case named for a control. Every gate exits 0 on managed Chromium, and the styles,
    browser-setup, and app-browser projects exit 0 on Edge, with the independent verifier's chain
    green and the status identical before and after.
