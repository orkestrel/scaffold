# Terrain brief — B-PASSIVE-CLOSE (Cursor Grok, read-only)

Route `grok` on Cursor Grok (`grok-4.7-high`), `--mode=ask`, read-only, rooted at `/home/user/veneer`
(the session branch tip `a4654a8`; B-FORMS-LABEL-CASCADE has not landed, so the forms sections and
the ledger tables of `guides/veneer.md` will move after this reading; cite every site by symbol or
heading and give a line only as approximate). Perform the reading directly and spawn nothing.
Capture `git status --porcelain` before and after; any change is a deviation. Return evidence with
`file:line` pointers and no raw file dumps, no decisions, no design, no edits.

## Question

What must the family-closing unit B-PASSIVE-CLOSE touch, and what does each site say today? Its
obligations are the rows of `ROADMAP.md` § Carriers whose carrier cell opens with `B-PASSIVE-CLOSE `
(the family close, not `B-PASSIVE-CLOSE-A` or `-B`), plus the row on the `FORM_CHECK_SPECIMENS` doc
block's bare `id` token. Read each row whole; the openings are:

- "The guide's § Showcase region paragraph enumerates the regions"
- "§ Customization's claim that every derived tier follows a `--vn-color-primary-base` retune"
- "The component-section sentences naming a barrel neighbour"
- "The per-family driven-key lists (`BUTTON_KEYS`, `PAGINATION_KEYS`, `VALIDATION_KEYS`, and the siblings)"
- "The guide's § Tests stem table omits the scenarios"
- "The reduced-motion query literal `'(prefers-reduced-motion: reduce)'` is repeated"
- "The guide-wide token-noun sweep"
- "The `FORM_CHECK_SPECIMENS` doc block in `app/browser/constants.ts` writes the bare `id` token"

## Evidence sought

1. **The § Showcase paragraph.** In `guides/veneer.md` under `## Showcase`, the paragraph that
   enumerates the regions: quote it, and list the regions `app/browser/Showcase.ts` constructs in
   order (the constructor list), naming each region the paragraph omits.
2. **§ Customization's retune claim.** The sentence claiming every derived tier follows a
   `--vn-color-primary-base` retune, and every rule in `src/styles/` that reads `--vn-palette-blue`
   or another palette entry instead of the role fill (grep `--vn-palette-blue` and
   `--vn-palette-` under `src/styles/`), each with its file and selector.
3. **Barrel-neighbour sentences.** Every guide sentence of the form "loads after the X" or "after
   the X" naming a barrel neighbour (grep `loads after` and `partial loads` in `guides/veneer.md`),
   each against the actual order of `src/styles/index.scss` (list the `@use` lines in order), and
   Bootstrap's own order in `node_modules/bootstrap/scss/bootstrap.scss`.
4. **Driven-key lists.** In `tests/setup.ts`: every `*_KEYS` constant, the `CAPTURE_KEYS` spread
   and its assertion in `tests/setup.test.ts`, and the `CASCADE_KEYS` registry's shape (its type,
   how rows are appended, the doc block), with the decision D20 text from
   `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`.
5. **The § Tests stem table.** Under `## Tests`, the stem table (its heading paragraph and every
   row) against the `CaptureSubject` union and `CASCADE_KEYS` in `tests/setup.ts`: list every
   registered scenario stem the table omits and every table row no registry row backs; and whether
   `tests/guides.test.ts` or `tests/guides/` holds any parity check over that table today.
6. **The reduced-motion literal.** Every occurrence of `prefers-reduced-motion` under `tests/`
   (grep), each with its file, the constant name if any (`MOTION`), and how the proof uses it;
   whether `tests/setupStyles.ts` or `tests/setupBrowser.ts` already exports a shared constant
   for it.
7. **The token-noun sweep.** In `guides/veneer.md`, a bounded sample of code tokens standing
   without a following noun outside the Range and Validation sections (grep for a backticked
   token followed by a space and a lowercase verb or a comma, such as `` ` is``, `` ` are``,
   `` ` reads``, `` `,``), reported as `line: token` for at most forty hits with the section each
   sits in, plus the link-text rule's hits (a link not introduced by `see`), so the unit can size
   the sweep; and the `FORM_CHECK_SPECIMENS` doc block in `app/browser/constants.ts` (quote the
   sentence with the bare `id` token) beside the `FORM_LABEL_SPECIMENS` block's corrected sentence.
8. **Files the unit makes false.** For each obligation, the tests or proofs that would go red:
   the showcase region proof (`tests/app/browser/Showcase.test.ts`), the registry proofs
   (`tests/setup.test.ts`), the guides parity proof (`tests/guides.test.ts`), and the policy sweep
   (`tests/setupPolicy.ts`, `tests/policy.test.ts` are vendored and off-limits: name what they
   read).

## Output

One distillate with a section per numbered item, each fact with a `file:line` pointer (line
approximate, symbol or heading named), contradictions between the guide and the code called out,
and a closing list of unresolved inputs. No design, no recommendation, no edits.
