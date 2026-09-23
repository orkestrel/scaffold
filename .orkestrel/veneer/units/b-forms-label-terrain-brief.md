# Terrain brief — B-FORMS-LABEL (Cursor Grok, read-only)

Route `grok` on Cursor Grok (`grok-4.7-high`), `--mode=ask`, read-only, rooted at `/home/user/veneer`
(the session branch tip `e0c901a`, Veneer `main`). Perform the reading directly and spawn nothing.
Capture `git status --porcelain` before and after; any change is a deviation. Return evidence with
`file:line` pointers and no raw file dumps, no decisions, no design, no edits.

## Question

What must a unit that ships the `form` key touch in the tree at `e0c901a`, and what does each site
say today? The `form` key is the union key of the forms family in
`tests/fixtures/oracle/inventory.json` (`components.form`, 195 selectors). The selectors it alone
records are `.form-label` (`margin-bottom`), `.form-text` (`margin-top`, `font-size`, `color`), and
`.form-switch` (`padding-left`); the `.col-form-label`, `.col-form-label-lg`, and
`.col-form-label-sm` selectors are recorded under the `col` key only and sit in the guide's
`### Deferred selectors` table with owner Forms. Bootstrap's source for them is
`node_modules/bootstrap/scss/forms/_labels.scss` and `_form-text.scss`.

## Evidence sought

1. **How a forms key ships today.** For the `form-floating` key (the smallest sibling): the partial
   `src/styles/components/_form-floating.scss` (its header comment, layer, token reads), its line in
   `src/styles/index.scss`, its proof `tests/src/styles/components/form-floating.test.ts` (case
   titles), its table in `tests/setupStyles.ts` (`FORM_FLOATING_CASES`, its interface if any, its
   `reads` shape) and the Node case binding it in `tests/setupStyles.test.ts`, its section
   `app/browser/sections/FormFloatingSection.ts`, the section's registration in
   `app/browser/Showcase.ts` and `app/browser/index.ts`, its copy and specimens in
   `app/browser/constants.ts` (`FORM_FLOATING_COPY`, `FORM_FLOATING_SPECIMENS`), its section proof
   `tests/app/browser/sections/FormFloatingSection.test.ts`, its `CaptureSubject` members and
   capture registry rows in `tests/setup.ts`, its rows in `tests/app/browser/index.test.ts` and the
   showcase proof, and its guide section `### Form floating classes` in `guides/veneer.md` (the
   anatomy: the paragraphs, the ledger tables `#### form-floating` and the departure cells).
2. **Where the shipped keys are listed.** Every site that enumerates shipped keys or forms keys:
   `tests/conformance.test.ts` (around lines 100 to 120 and 265 to 295), `tests/setupServer.ts`
   (the shipped-key reader and the attribution ladder's membership step, `attributeSelector`, with
   the longest-class-token preference the family verdict's ruling 2 landed), `tests/setupServer.test.ts`
   (around line 1343), and any `listed` literal or key list in `tests/setup.ts` or the journey.
3. **The switch row under `form`.** `guides/veneer.md` around line 1022 ("switch row's own inset
   only under the umbrella `form` key, and it ships here") and the `_form-check.scss` rule
   `.form-switch` (line 113): how the ledger attributes `.form-switch` today (which key's table
   carries it, which departure cell), and what the attribution ladder would do once `form` is
   shipped (cite the membership step's code).
4. **The `col` key's label rows.** How `.col-form-label*` are handled: the deferral rows in
   `### Deferred selectors` (lines 1652 to 1654), the deferral reader (`readDeferrals`,
   `scanShippedDeferrals` in `tests/setupServer.ts` and `tests/conformance.test.ts`), whether the
   `col` key is shipped, and where the Layout guide section records the `col` key's rows.
5. **The `FORM_FLOATING_CASES` reads shape.** Quote the table's `reads` and the comparison the
   Node case and `form-floating.test.ts` make (this unit gives it the per-property map the range
   table receives from B-FORMS-CLOSE-TABLES; cite `FormControlCase` in `tests/setupStyles.ts` as the
   shape).
6. **Tokens the label rules would read.** In `src/styles/_tokens.scss` and `_theme.scss`: the
   space tokens for `0.5rem` and `0.25rem` (`--vn-space-*` names and values), the size token for
   `0.875em` if one exists (`--vn-size-*`), `--bs-secondary-color`, and the `$input-*` variables the
   `input-text` mixin reads (`src/styles/_mixins.scss` lines 49 to 70), because `.col-form-label`
   pads by `$input-padding-y + $input-border-width` and reads `$input-line-height`.
7. **Guide sections the key touches.** `### Deferred selectors`, the forms sections' order in the
   guide, `## Showcase` (the region paragraph) and `## Tests` (the stem table) rows a new section
   and its scenarios would join.

## Output

Return `Question`, `Evidence` (grouped by item, each fact with `file:line`), `Distillate` (the
smallest map the design brief needs: the files a writing unit must own, the assertions its result
makes false, and the attribution consequence of shipping `form`), `Unknowns` (every input row not
reached), `Journal` (the journal path and the session id from its `init` event), and `Deviation`.
