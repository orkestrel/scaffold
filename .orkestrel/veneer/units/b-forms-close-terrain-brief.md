# Terrain brief — B-FORMS-CLOSE (Cursor Grok, read-only)

Route `grok` on Cursor Grok (`grok-4.7-high`), `--mode=ask`, read-only, rooted at `/home/user/veneer`
(the session branch tip `53628aa`, Veneer `main`). Perform the reading directly and spawn nothing.
Capture `git status --porcelain` before and after; any change is a deviation. Return evidence with
`file:line` pointers and no raw file dumps, no decisions, no design, no edits.

## Question

Where does every obligation of B-FORMS-CLOSE live in the tree at `53628aa`, and what does each site
say today? The obligations are the `B-FORMS-CLOSE` rows of `ROADMAP.md` § Carriers (grep
`B-FORMS-CLOSE` in `/home/user/veneer/ROADMAP.md`).

## Evidence sought, per obligation

1. **Validation tooltip specimens** (`valid-tooltip`, `invalid-tooltip`): the rules the cascade
   ships for them (`src/styles/components/_validation.scss` and `_input-group.scss`), the
   specimens and scenarios the showcase registers for the validation and input-group regions
   (`app/browser/constants.ts`, `tests/setup.ts` `CASCADE_KEYS`, `tests/app/browser/integration.test.ts`
   portfolio cases), how an existing element frame declares its region and how a wrapper keeping
   overflow is written elsewhere (search `overflow` in `app/browser/constants.ts` and the
   `FRAMES.element` calls), and the guide's § Validation classes and § Input group classes sentences
   that mention tooltips.
2. **`INPUT_GROUP_ROUNDING`**: its declaration and doc block in `tests/setupStyles.ts`, every
   consumer (`scene.load` calls in `tests/src/styles/components/input-group.test.ts` and any other
   file), the inventory rows naming it (`tests/setupStyles.test.ts`, `tests/setup*.test.ts`), and
   the § Input group classes sentences on the consumer radius, the "carry no radius" claim, the
   "floating wrapper is a plain box" claim, and the input-group focus case's "outer column"
   comment in `tests/app/browser/integration.test.ts`.
3. **Cascade-key prose**: the `CASCADE_KEYS` doc block in `tests/setup.ts` and the journey's rest
   case title in `tests/app/browser/integration.test.ts` that enumerate the keys; quote the
   enumerations' current members.
4. **The validated color control's width**: the rule in `src/styles/components/_validation.scss`
   carrying the `3rem` literal for `.form-control-color.is-valid` and `.is-invalid`, the
   `.form-control-color` width in `src/styles/components/_form-control.scss` (`--vn-space-24`), the
   validation proof case reading that width in `tests/src/styles/components/validation.test.ts`,
   the `VALIDATION_CASES` rows for it in `tests/setupStyles.ts`, and the guide ledger rows
   (`#### is-valid`, `#### is-invalid`) for the width.
5. **`FORM_RANGE_CASES`**: the table and its remark in `tests/setupStyles.ts`, the Node case that
   binds it in `tests/setupStyles.test.ts` (quote the comparison), and the `INPUT_GROUP_CASES` and
   `FORM_CONTROL_CASES` shape it must take (`reads` map keyed by property, the interface name and
   members).
6. **The literal-declaration reading**: which gate reads a declaration the release does not write
   on a shipped selector — search `tests/setupServer.ts` for `collectAdditions`, `readAdditions`,
   `describeAddition`, and `scanLedgerDrift`, and `tests/conformance.test.ts` for the cases that
   call them; state whether an added property on a shipped `.form-control` rule would be reported
   as an addition, a departure, or nothing, citing the reader's comparison.
7. **Forced colours (D37)**: the `focus-ring` mixin in `src/styles/_mixins.scss`, its `@media
   (forced-colors: active)` branch, every partial that includes it, and the `:focus` rules of
   `_form-control.scss`, `_form-select.scss`, `_form-range.scss`, and `_form-check.scss` that write
   `outline: 0` with a `box-shadow` ring; the proofs that stage forced colours (search
   `forced-colors` and `stageMedia` under `tests/src/styles/components/`), and D37's text in
   `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` (`## D37`).
8. **The `FORM_RANGE_CASES` remark and the input-group remark** sentences about the `reads` map
   (quote each).

## Output

Return `Question`, `Evidence` (grouped by obligation, each fact with `file:line`), `Distillate`
(the smallest map the design brief needs: per obligation, the files a writing unit must own and
the assertions its result makes false), `Unknowns` (every input row not reached), `Journal`
(the journal path and the session id from its `init` event), and `Deviation`.
