# B-FORMS-VALIDATION — audit claims

Subject: the B-FORMS-VALIDATION unit's uncommitted writes in `/home/user/veneer-bfv` over `3a9202a`,
written by `opus` from `/home/user/veneer-bfv/tmp/units/b-forms-validation-brief.md` under the
design `/home/user/veneer-bfv/tmp/units/b-forms-design-verdict.md` and the family record
`/home/user/veneer-bfv/tmp/units/b-passive-family.md`. Evidence: `/home/user/scaffold/tmp/audit/bfv.diff`
(the whole diff, untracked files included as additions), `bfv-status.txt`, and the unit's report
`bfv-report.md`. The capture frames sit under `/home/user/veneer-bfv/tmp/capture/states/`. Every lane
rules each claim CONFIRMED, BROKEN, or UNRESOLVED with `file:line` evidence; a claim about a proof is
ruled on the mutation named and whether the assertions distinguish it.

1. **The partial.** `src/styles/components/_validation.scss` opens `@layer components` after
   `@use '../tokens'`, emits every selector the inventory (`tests/fixtures/oracle/inventory.json`)
   records under `was-validated`, `is-valid`, and `is-invalid` plus the feedback and tooltip rules
   the release mixin emits, once from a loop over the state list, with every declaration and
   condition the compiled release carries; each departure from the release's value is one the
   report's per-value table rules (a `--vn-*` token where one carries the value, `--bs-*` globals
   byte for byte, literals where no token applies); no `--vn-*` token was added.
2. **The icons and the theme scope.** `$icons` in `src/styles/_tokens.scss` carries nine keys with
   the release's escaped data URIs and a comment naming the release variable each came from; `$dark`
   and `$assets` are unchanged; obligation 2's theme-scope removal is NOT done (report D1) because
   `tests/src/styles/tokens.test.ts` pins `BOOTSTRAP_DARK_VARIABLES`; rule whether the four-file patch
   the report carries is the right fix, and whether the guide paragraph `Bootstrap also retunes …` in
   § Bootstrap variables Veneer retains stays true as written while the removal is deferred.
3. **The ladder.** `attributeSelector` in `tests/setupServer.ts` prefers, among the shipped keys that
   record a selector, the key whose name is the longest class token the selector carries, falling
   back to recording order; its `@remarks` states the rule; the plant `attributes a selector two
   shipped keys record to the more specific key` in `tests/setupServer.test.ts` was red against the
   old reader (`expected 'form' to be 'form-control'`) and is green now; reverting the reader to
   recording order alone fails the plant.
4. **The proof.** `tests/src/styles/components/validation.test.ts` reads the border and text colours
   against `readToken` of the aliases in light and inside a dark island, the icon `background-image`
   against `FORM_ICON_CASES`, the focus shadow's width against `--vn-focus-width` beside `readRing`,
   `.was-validated` over a required empty and a filled control, the feedback `display` toggle, the
   tooltip's position and stacking, the check label colour, the input-group `z-index`, and the
   token, override, factor, and mode readings; the four mutations the report names (a swapped icon
   key, the `0.25rem` literal, a swapped border alias, a dropped feedback selector) each redden the
   cases the report lists; the check-box border reading stages `appearance: none` (report D3) —
   rule whether that staging reads the shipped condition or masks a defect while the check partial
   is not shipped.
5. **The showcase and the registry.** `ValidationSection.ts` renders nine specimens from
   `VALIDATION_SPECIMENS`; `CASCADE_KEYS` gains nine rest scenarios; `VALIDATION_KEYS` (the
   `BUTTON_KEYS` shape) carries `valid-control-focus` and `invalid-control-focus`, spread last into
   `CAPTURE_KEYS`; `tests/setup.test.ts` line asserting the concatenation was rewritten to four
   spreads (report D4); the journey case `paints a validation focus ring on each validated control`
   drives each focus and places its frame with `FRAMES.page`; `CaptureSubject` gains the nine names;
   `CAPTURE=1 npm run test:journey` wrote the frames the report lists.
6. **The tooltips.** The `Valid tooltip` and `Invalid tooltip` specimens are withdrawn (report D2:
   an unpositioned tooltip extends the document and the capture pane never settles, `8894 over a
   8863 pane`); their rules are read in the proof; rule whether the evidence holds and whether
   B-FORMS-GROUP (which ships `.input-group { position: relative }`) is the right carrier.
7. **The accounting.** `listed` in `tests/conformance.test.ts` gains the three keys at sorted
   positions; § Compatibility gains six rows (a selector and a variable row per key; the variable
   row obliged by `--bs-form-select-bg-icon` in each key's inventory `properties`);
   `guides/ledger/departures.md` gains the sixteen departure rows the report lists (focus shadows
   `tokenized`, `calc` flattening `declared`); no addition row; no deferral row struck (none names a
   validation selector); `npm run test:conformance` is green (`17 passed`).
8. **The guide.** `### Validation classes` sits in barrel order after the `vr` section; the § Files
   row names the partial and its proof; the prose follows `writing.md` (no counts, no `should`,
   sentence-case headings, no `guides/ledger/` path in prose).
9. **Scope is honest.** The status lists only the owned and shared files the brief names;
   `_theme.scss`, `theme.test.ts`, `tokens.test.ts`, `_mixins.scss`, and the vendored files are
   untouched; no `tmp/probe/` remains; the report's D5 (`git checkout-index -f -- tests/setupStyles.ts`
   run once) discarded nothing beyond the unit's own append — rule from the diff whether
   `tests/setupStyles.ts` carries only appended content.
10. **Gates.** `format:check`, `lint:check`, `check`, `build:src`, `test:setup` (`162 passed`),
    `test:src:styles` (`433 passed`), `test:app`, `test:conformance`, `test:guides`, `test:policy`
    are green per the report; `test:journey` is red under load (`8 failed | 96 passed`) in Button
    cases this unit did not write (timeouts and `Interactive target "Primary" is not reachable
    through forward Tab traversal`, a traversal that skips alternate specimens) — UNRESOLVED
    pending the Orchestrator's deciding run; rule objectively whether the nine added focusable
    specimens can push the traversal cases past 15 s on an idle host, from the number of stops
    each case walks.
