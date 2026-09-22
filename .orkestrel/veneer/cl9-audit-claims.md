# CL9 audit — claims

Subject: unit CL9 in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the base
`8c70787` (the CL8b landing), written by `sol` on Astra under
`.orkestrel/veneer/units/cl9-brief.md`. Report: `units/cl9-report.md`. Terrain:
`units/cl9-terrain.md`, measured rather than scouted and **the single home for this key's
measurements** — the brief restates none of them. Scope read: `units/cl9-scope-read-report.md`.

Evidence: the rendered diff `units/cl9-diff.patch.txt` and status `tmp/audit/cl9-status.txt`, the
live tree, the built `dist/src/styles/index.css`, the pinned record, and the installed Bootstrap
distribution.

**Scope of this audit.** Implementation only: correctness, rule compliance, test sufficiency, scope
honesty. Report no wording or prose finding. The guide's compatibility, variable, and departure rows
are the one exception and are in scope as a contract, because the conformance run reads them.

**Every `file:line` you cite must exist in the file you name.** Confirm the file is long enough to
have the line and that the line says what you claim.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding only
after the last claim, with a site and a one-line failure scenario, saying whether it forces another
round.

1. Every selector the record carries under this key ships, at its condition, with nothing extra, and
   nothing is deferred. The base table with its cells and sections, the compact and bordered and
   borderless variants, the striped rows and striped columns, the active and hover states, the
   contextual roles, the group divider, the caption class, and the responsive wrappers unconditioned
   and at every breakpoint. **Rule the count both ways** against the record.

2. The key is listed with the rows the deciding functions require: a selector row per family and a
   shipped variable row for every custom property the record carries, since the properties object is
   not empty. The key joins both enumerations and the emitted-vocabulary comparison.

3. **The downward equivalence is arithmetic and correct.** The comparison's normalizer maps a
   recorded maximum-width boundary to an exclusive boundary two hundredths higher, so the record's
   fractional boundaries compare equal to the mixin's whole ones, and an upward condition stays
   upward. **Rule the arithmetic against the record's own boundaries**, and rule whether an opposite
   direction at the same number still compares unequal — that is the property the equivalence must
   not lose.

4. That equivalence is proved in both directions and on its boundary. A recorded selector removed
   from the built cascade reddened the comparison; an unrecorded selector under this key's prefix
   added to it reddened it; and a condition whose boundary is shifted off the equivalence reddened it,
   distinguishing the shifted boundary from the equivalent one. Each restoration returned green with
   a digest (report-only red-then-green).

5. **The selector normalization the unit extended is shared, so rule its blast radius.** The
   normalizer that now equates a top-level even-child selector with its equivalent expression lives
   in the styles setup module, and the conformance setup module imports it — so the change reaches
   every key's presence scan, not only this key's comparison. Rule whether the equivalence is correct
   in general rather than only for the selector that motivated it, whether it preserves quoted and
   escaped text, whether it leaves other expressions distinct, and whether any other key's reading
   moved.

6. The proof reads the browser rather than the rule's text. The cell padding, the alignment, and the
   border behaviour are read on the base table and on each variant that changes them; the striped,
   active, and hover paints are read at the state they apply to, including hover activation and state
   precedence; and the contextual roles' colours and their text contrast are read in both themes.

7. **The responsive wrapper is read on both sides of its boundary, which is the reading this unit
   exists to get right.** Real viewport visits below, at, and above each breakpoint read the computed
   overflow and attempt horizontal scrolling. The breakpoint wrappers scroll only below their
   boundaries and the unconditioned wrapper scrolls at every width.

8. The custom properties' layering is read rather than assumed. Text resolves state over type over
   base, the inset shadow resolves state over type over accent background, and the base background
   is a separate paint layer, each distinguished by sentinel values. The state token mutation is made
   where its alias resolves and restored afterwards.

9. The departures are recorded rather than hidden. Physical properties become logical ones; the
   contextual colours derive from Veneer's role tokens rather than the record's fixed values, with
   browser controls restoring the record's inputs and comparing within one channel; runtime mixing
   may retain fractional channels where the record rounds. The cell-level border and alignment
   repairs over Veneer's element rules are named, with the browser proving each. **Rule whether each
   departure's facts are true of the code**, and whether any departure ships unrecorded.

10. The partial drives its generated families from loops and adds no token. The contextual roles come
    from a role list and the responsive wrappers from the ramp through the unchanged downward mixin.
    The existing state token already carried the recorded stripe factor, so no token or registry edit
    was needed, and neither file appears in the status.

11. The shared-block sweep reports nothing shared, and no cross-partial extraction was needed.

12. `[mechanical]` Scope, law, and gates. `tmp/audit/cl9-status.txt` lists only files the brief owns,
    including the new partial, its proof, the new showcase section, its proof, and the section's
    registration in the showcase and the application barrel with their proofs.
    `tests/setupConformance.ts`, `src/styles/_tokens.scss`, `src/core/constants.ts`,
    `tests/fixtures/**`, `package.json`, `configs/**`, every other partial and proof, and the
    vendored files are absent. The added lines carry no `any`, no type assertion outside `as const`,
    no non-null assertion, no suppression comment, no `public`/`private`/`protected`, no parameter
    property, no default export, no skipped case, and no case named for a control. Every gate exits 0
    on managed Chromium, the styles, browser-setup, and app-browser projects exit 0 on Edge, and the
    independent verifier's chain is green with the status identical before and after.
