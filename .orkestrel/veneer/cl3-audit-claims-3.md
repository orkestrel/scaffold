# CL3 audit — claims (round 3, the fix round under brief 5)

Subject: the whole CL3 change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
over the base `9f5ffda`, after the round-3 fix `sol` on Astra ran under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-brief-5.md` (over briefs 4,
3, and 2, in force beneath it). Rounds 1 and 2 are in
`.orkestrel/veneer/cl3-audit-verdict.md`; the round-3 report is `units/cl3-report-4.md`.
Evidence: the rendered diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-diff-3.patch.txt`
(tracked changes plus a no-index rendering of every new file) and status
`tmp/audit/cl3-status-3.txt`, round 2's `units/cl3-diff-2.patch.txt` for comparison, the live
tree, and the built `dist/src/styles/index.css`. Audits cover implementation only. Rule on every
claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence; a report-only claim (a
red-then-green run, a capture reading) is recorded as report-only; add an implementation-defect
finding only after the last claim, with a site and a one-line failure scenario, saying whether it
forces another round.

1. Finding 1 closed (analyst 7 of round 2). `src/styles/_mixins.scss` defines the argument-free
   mixin `script-text` beside `code-text`, emitting `position: relative`, `font-size: 75%`,
   `line-height: 0`, and `vertical-align: baseline`; `_sub.scss` and `_sup.scss` include it and
   keep only their own logical offsets (`inset-block-end: -0.25em` and
   `inset-block-start: -0.5em`); neither partial declares a shared property twice. The resolved
   readings of `sub` and `sup` are unchanged before and after on both receipts (report-only
   capture; the live values are checkable against `TEXT_SUB_CASES` and `TEXT_SUP_CASES` in
   `tests/setupStyles.ts`), and no proof or expectation was edited.

2. Finding 2 closed (reviewer 7 of round 2). `src/styles/elements/_body.scss` no longer declares
   `text-size-adjust`; `src/styles/elements/_html.scss` still declares it on the root, and the
   built cascade carries each of the three spellings (`text-size-adjust`,
   `-webkit-text-size-adjust`, `-moz-text-size-adjust`) once, resolved under the `html` selector
   and none under `body` (the report records 2 before and 1 after per spelling, read with a
   declaration-level pattern because the built file is minified onto one line and the brief's
   line-count grep cannot distinguish them: an honest correction of the brief's check, recorded).
   The body proof's readings are unchanged and it was not edited.

3. The sweep is recorded and complete. The report names its population (every partial under
   `src/styles/elements/`, listed), its pairing (every distinct unordered pair, no self-pairs),
   and its instrument (`units/cl3-r4-sweep.mjs`: compiles each partial with source maps and
   compares identical property, value, and importance declarations within a selector block,
   including nonadjacent ones, excluding declarations a mixin already supplies). It found two
   shared blocks beyond the named finding and extracted each into `src/styles/_mixins.scss` as an
   argument-free mixin: `code-surface` (`background-color: var(--vn-surface-code)` and
   `border-radius: var(--vn-radius-small)`, included by `_code.scss` and `_kbd.scss`) and
   `list-space` (`margin: 0` and `padding-inline-start: calc(var(--vn-space-8) * 2)`, included by
   `_ol.scss` and `_ul.scss`). After extraction the instrument returns an empty result, and the
   pre-extraction findings show it detects the blocks it reports removed (report-only runs). No
   two partials under `src/styles/elements/` now share a block of two or more identical
   declarations.

4. No reading moved and no proof was touched. The capture comparison
   (`units/cl3-r4-readings.mjs` over the rebuilt shipped stylesheet in real browsers) reports
   every enumerated computed property of `sub`, `sup`, `code`, `kbd`, `ol`, and `ul` equal before
   the script extraction, after it, and after the sweep, in both modes on both receipts
   (report-only; the recorded values include the code and keyboard surfaces
   `oklab(0.208 -0.00310889 -0.0418848 / 0.12)` light and
   `oklab(0.929 -0.00325318 -0.0125864 / 0.12)` dark, their `4px` radii, the lists' `0px` margins
   and `32px` inline-start padding, and the `decimal` and `disc` markers). No file under
   `tests/` appears in the round-3 diff.

5. `[mechanical]` Scope, law, and gates. `tmp/audit/cl3-status-3.txt` lists the same seventeen
   modified and forty-four untracked paths as round 2, and nothing else; the round-3 diff differs
   from round 2's only in brief 5's owned files (`src/styles/_mixins.scss` and the partials
   `_sub.scss`, `_sup.scss`, `_body.scss`, `_code.scss`, `_kbd.scss`, `_ol.scss`, `_ul.scss`);
   every other file, `tests/**` and `app/**` and `guides/veneer.md` and `_tokens.scss` and
   `src/core/**` included, is byte-identical between the two rounds. The added lines carry no
   `any`, no type assertion outside `as const`, no non-null assertion, no suppression comment, no
   `public`/`private`/`protected`, no parameter property, no default export, no skipped case, and
   no case named for a control; `_mixins.scss` still emits no top-level CSS; the layer order line
   in `_tokens.scss` is unchanged and the built cascade's layer order is unchanged;
   `git diff --check` is clean. Every gate in brief 5's item 3 exits 0 on managed Chromium and
   Edge, and the independent verifier's chain (including `npm test`, the journeys, and
   `scaffold audit`) is green with the status identical before and after.
