# B-FORMS-RANGE rounds 4 and 5 — audit claims

Subject: the fix rounds `opus` wrote in `/home/user/veneer-bfr` from
`/home/user/veneer-bfr/tmp/units/b-forms-range-brief-4.md` and `b-forms-range-brief-5.md` over the
round-3 verdicts (`/home/user/veneer-bfr/tmp/units/bfr-audit-analyst-verdict.md`, `FAIL 3, 4, 5, 6,
7, 9`; `bfr-audit-reviewer-verdict.md`, `FAIL 3, 5, 7, 9; F1 to F7`; `bfr-audit-checker-verdict.md`).
Evidence: `/home/user/scaffold/tmp/audit/bfr-fix-5.diff` (the whole diff against `3a9202a`, untracked
files as additions; the earlier rounds' writes are inside it), `bfr-fix-5-status.txt`, and the rounds'
reports `/home/user/scaffold/tmp/audit/bfr-report-4.md` and `bfr-report-5.md`. The frames sit under
`/home/user/veneer-bfr/tmp/capture/states/`. The design is
`/home/user/veneer-bfr/tmp/units/b-forms-design-verdict.md` (ruling 10: the focus shadow binds like
`_button.scss`) and the family record `b-passive-family.md` (ruling 4: the tokenizing ceiling;
`--vn-palette-blue` resolves to `#0d6efd`, `--vn-color-primary-base` to an `oklch()` role colour).
Rule each claim CONFIRMED, BROKEN, or UNRESOLVED with `file:line`; rule a claim about a proof on the
mutation named and whether the assertions distinguish it from the passing case.

1. **The thumb reads the palette entry** (family ruling 4; round 5). In
   `src/styles/components/_form-range.scss` the resting thumb's `background-color` reads
   `var(--vn-palette-blue)` and the held tint `color-mix(in srgb, var(--vn-palette-blue) 30%,
   var(--vn-palette-white-base))`; `FORM_RANGE_CASES` in `tests/setupStyles.ts` records
   `--vn-palette-blue` in the four thumb entries' `reads`; the four `form-range` `background-color`
   rows in `guides/ledger/departures.md` carry the rewritten Veneer cell, `tokenized`; § Form range
   classes states the retune consequence; the fill case in
   `tests/src/styles/components/form-range.test.ts` reads the resting thumb rule's declared value
   through `readRules` by exact `selectorText` and binds it to `var(--vn-palette-blue)`, with the
   role token dropped from its mode loop. The mutation "the role token restored in the resting thumb
   rule" reddens the WebKit part-rule case (`FORM_RANGE_CASES` meeting the planted declaration) and
   the fill case (`2 failed | 4 passed (6)`); the partial is byte-identical after the revert (SHA-256
   `79066b69…35a8`).
2. **The compiled-cascade binding keys by selector and condition** (round-3 reviewer R1; round 4).
   The moved binding case in `tests/setupStyles.test.ts` keys its written map by selector where the
   condition is absent and by `` `${selector} ${condition}` `` otherwise, on both sides, comparing
   against the recorded rules rather than the distinct selectors; the mutation "the
   `::-moz-range-thumb` reduced-motion twin dropped from the partial" reddens it (`2 failed | 69
   passed (71)` with the sweep baseline), where the selector-only key passed.
3. **The guide states the evidence it has** (round-3 analyst 6; reviewer F1, F4, F7, R3). The
   `form-range` § Compatibility row names the host's resolved geometry and the thumb and track
   declarations as what `form-range.test.ts` proves; the evidence paragraph carries no tally, states
   the held-thumb drive limit, the ring's open rendered evidence, and the uncompared contrast; the
   easing and ring-width bullets carry their resolved clauses; the `FORM_RANGE_KEYS` doc block and
   the journey comment give the blank-frame reason for the page frame; § Tests links the range proof.
4. **One term for the state** (round-3 reviewer F3). `disabled` names the class state in
   `app/browser/constants.ts` (the paragraph and `Disabled range value`), the guide,
   `FormRangeSection.test.ts`, the journey case, `tests/setupStyles.test.ts`, and `FORM_RANGE_MARKUP`;
   `unavailable` survives only where `form-range.test.ts` names an unobtainable reading; the
   accessible names stay distinct.
5. **The moved cases and the mutation readings** (round-3 reviewer F5, F6; analyst 3). The two range
   cases sit at the end of `describe('styles setup')` with the markup case retitled `carries the
   classed pair, the disabled control, and the bare control in the range markup`; "the preceding
   declaration" replaces the cross-reference; the round-4 mutation table records red and green for
   the appearance, height, focus-shadow, transition, and Gecko mutations with the commands named.
6. **The portfolio** (round-3 analyst 4, reviewer R2). Every `range*` frame and artifact exists for
   the four variants, `range-focus--dark-390.png` and `range-focus--dark-1280.png` included, each
   capture run `26 passed (26)`.
7. **Scope is honest.** The status lists the RANGE unit's paths and nothing else; `tests/setupServer.ts`,
   `src/styles/_tokens.scss`, `src/styles/_theme.scss`, `src/styles/_mixins.scss`,
   `src/styles/elements/_fieldset.scss`, and the vendored files are untouched; no `tmp/probe/` file
   remains.
8. **Gates.** `format:check`, `lint:check`, `check`, `build:src` exit 0; `test:src:styles`
   `422 passed`; `test:conformance` `17 passed`; `test:guides` `18 passed`; `test:app` `28 passed`
   (round 4); `test:setup` red on the sweep case alone (closed by B-SWEEP-2 on the session branch).
   UNRESOLVED until the Orchestrator's independent chain; rule `npm run check` yourself where the
   sandbox allows it.
