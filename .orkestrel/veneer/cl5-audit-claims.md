# CL5 audit — claims

Subject: unit CL5 in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the base
`5240e36` (the CL4b landing), written by `opus` on native Opus 5 under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5-brief.md` with
`units/cl5-brief-2.md` above it. Its report is `units/cl5-report.md`. Terrain:
`units/cl5-scout-report.md`. Scope read: `units/cl5-scope-read-report.md`.

Evidence: the rendered diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5-diff.patch.txt`
(tracked changes plus a no-index rendering of every new file) and the status
`tmp/audit/cl5-status.txt`, the live tree, and the built `dist/src/styles/index.css`.

Audits cover implementation only: correctness, rule compliance, test sufficiency, scope honesty.
Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding
only after the last claim, with a site and a one-line failure scenario, saying whether it forces
another round.

1. Every key this unit owns ships and joins the listed set. Four new partials under
   `src/styles/components/` — `_type.scss`, `_list.scss`, `_quote.scss`, `_image.scss` — each
   wrap their rules in `@layer components` and are loaded from `src/styles/index.scss` after the
   button partial. Between them they emit every selector the pinned inventory records under
   `h1` through `h6`, `display`, `lead`, `small`, `mark`, `initialism`, `list-unstyled`,
   `list-inline`, `blockquote`, `img`, and `figure`. Each key has a `selector` row with Status
   `shipped` in the guide's compatibility table, and `tests/conformance.test.ts`'s `listed` value
   carries all of them. No variable row was added for any of them, which
   `collectShippedComponents` permits because each key's projected properties list is empty.

2. The presence scan genuinely guards them. Removing one shipped block reddens the conformance
   run with a message naming that selector, and restoring it passes (report-only red-then-green).
   The minifier writes the quotation footer's pseudo-element in its legacy single-colon form, and
   the scan reads that as the double-colon form through the canonicalization CL4 landed, so the
   shipped cascade satisfies the inventory selector rather than evading it.

3. The heading twins are proved by comparison, not by agreement. Each `.h1` through `.h6` reads
   the size token its own tag reads, and `tests/src/styles/components/type.test.ts` reads the tag
   and the class in the same case and asserts the pair equal, so a divergence reddens. A further
   case retunes one size token and one display token on a host and reads the retuned values back
   through both the tag and the class, which establishes that each level reads the token its own
   level names rather than a literal that happens to match.

4. The heading twin reproduces its tag's whole block, and the unit ruled that deliberately.
   Bootstrap's `.h1` and its `h1` tag agree on weight and end margin; Veneer's tag carries a
   different weight and no margin, so a class shipping Bootstrap's pair would disagree with its
   own tag on one page. The class therefore ships the tag's block, and a guide row records which
   values that moves.

5. Every value this unit ships is retained from Bootstrap's own line, and none is bound to the
   calibration record, because that record measures tag families only and carries no row for any
   class this unit ships. Where Bootstrap writes a physical-axis property the partial writes its
   logical twin, and where Bootstrap writes a length a token already carries exactly, the partial
   writes the token.

6. The three departure rows rest on readings the unit took. The heading row records the tag
   treatment at every viewport against Bootstrap's capped sizes and fluid narrower sizes, its
   different weight, and its zero margin. The display row records that the value is unchanged and
   the condition is gone. The image row records the logical properties against Bootstrap's
   physical ones. Each row's numbers come from the built cascade read in the browser, not from
   the source.

7. The markup control obligation carried from CL4b is closed. `ContentSection`'s proof gains a
   literal markup list beside the literal name list it already carried, and the two new section
   proofs carry the same pair from the start. A plant changing three specimens' markup without
   changing any element name or specimen name reddens all three section proofs, and restoring it
   passes (report-only red-then-green).

8. The shared-block sweep ran over the component folder and found nothing to extract. Its
   population is the five partials under `src/styles/components/`, its pairs are all ten, and its
   result is empty. The instrument was itself controlled: planting a second shared declaration
   across two partials made the sweep report that pair, and removing it returned the empty
   result. `src/styles/_mixins.scss` was granted for this and is unchanged, because no block
   shared by two of this unit's partials exists.

9. The showcase carries the two new sections. `TypeSection` and `MediaSection` each implement the
   section contract, are constructed and destroyed by the shell in order, render every row of
   their own specimen table, and reach the barrel through one re-export line each. The specimen
   type was reused rather than added, because it fits.

10. `[mechanical]` Scope, law, and gates. `tmp/audit/cl5-status.txt` lists only files the two
    briefs own, with one declared exception the unit reported: `tests/app/browser/index.test.ts`,
    which asserts the app barrel's exact runtime key set and which the two new sections make
    false, appears in neither brief's Owned nor Off-limits list. The unit's whole edit there is
    the added names. `src/styles/elements/**`, `src/styles/_reset.scss`, `_tokens.scss`,
    `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, and the
    vendored files are absent from the diff, and `src/styles/_mixins.scss` is unchanged. The
    added lines carry no `any`, no type assertion outside `as const`, no non-null assertion, no
    suppression comment, no `public`/`private`/`protected`, no parameter property, no default
    export, no skipped case, and no case named for a control; no plant residue remains. Every
    gate exits 0 on managed Chromium and Edge, and the independent verifier's chain is green with
    the status identical before and after.
