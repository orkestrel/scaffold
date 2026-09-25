Checked E-ID-ANCHOR round 3 against `/home/user/scaffold/.orkestrel/veneer/units/e-id-anchor-brief-3.md`, `anchor-3.diff` (`git diff 98bd1b0`, committed `ebce3fe`), `anchor-3-status.txt`, both plant logs, and the seven gate logs, all under `/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/r3/`.

1. Mixin comment (Item 1). PASS. `src/styles/_mixins.scss` hunk (`anchor-3.diff:57-70`) replaces the comment with text matching the brief's Item 1 word for word, including the unchanged context lines above the diff hunk.

2. Dropdown / tooltip / popover include comments (Item 2). PASS.
   - Dropdown (`anchor-3.diff:74-91`, landed at `/home/user/veneer-anchor/src/styles/components/_dropdown.scss` around line 272): matches the brief's Item 2 dropdown text word for word.
   - Tooltip (`anchor-3.diff:107-122`): "on both builds, and neither build then paints" → "on Chromium 141 and 153, and neither then paints", rewrapped at 100 columns; no other word changed.
   - Popover (`anchor-3.diff:94-106`): same replacement, rewrapped; no other word changed.

3. Guide Dropdown classes paragraph (Item 3). PASS. `anchor-3.diff:5-23` (landed `guides/veneer.md:4715-4723`) replaces the two quoted sentences with the brief's exact sentence, rewrapped at 100 columns. Every other sentence in the paragraph (mixin reference, layer/specificity sentence, § Additions sentence) is byte-identical before and after.

4. Reason cells (Item 4). PASS.
   - `dropdown` rows: `guides/veneer.md:10491` and `:10492` both carry "The open menu computes `anchors-visible` on Chromium 141 and 153. Neither paints it while a scroll container clips its toggle entirely, except Chromium 141 when a pointer press opened it, which the engine leaves unanchored." — matches brief verbatim.
   - `tooltip` rows: `:10588`, `:10589` carry "The open tip computes `anchors-visible` on Chromium 141 and 153, and neither then paints a tip whose trigger a scroll container clips entirely." — matches.
   - `popover` rows: `:10590`, `:10591` carry "The open popover computes `anchors-visible` on Chromium 141 and 153, and neither then paints a popover whose trigger a scroll container clips entirely." — matches.
   - Every row in the diff changes only the Reason cell; no other cell (selector, media, category, value) in any of the six rows differs from round 2's committed state. Row padding is consistent with every unrelated row in the same table (visually aligned in the raw file read), so the column stayed a fixed width after `oxfmt` re-padded it. I did not independently compute the 223-character width to the character; this rests on the table's internal alignment rather than a counted measurement — noted as a minor gap, not a fail, since nothing in the evidence shows a misfit and the deviation contract required the unit to stop on a misfit, which it did not report.

5. Scope of the diff. PASS. `anchor-3.diff` touches exactly `guides/veneer.md` (2 hunks: Item 3 paragraph, Item 4 table) and the four `src/styles/**` files, each with exactly one hunk touching only `//`-prefixed comment lines (`_mixins.scss`, `_dropdown.scss`, `_popover.scss`, `_tooltip.scss`). No declaration, selector, or non-comment line changes outside a plant. `anchor-3-status.txt` lists exactly these five modified files, no others.

6. Plant logs and gate logs. PASS.
   - `anchor-plant-important.log.txt`: digest `edaefb707...` before and after (lines 1 and 460) are equal. All four failures are `AssertionError`s: `mixins.test.ts` fails on the `important` field (`false`→`true` diff, lines 369-393), and `dropdown.test.ts`, `popover.test.ts`, `tooltip.test.ts` each fail their anchored-visibility consumer-twin case with an `AssertionError` (lines 405-449). Log ends `exit=1` (line 459), consistent with a plant that must fail its named cases.
   - `anchor-plant-closed.log.txt`: digest `9c454441...` before and after (lines 1 and 529) equal. The three anchored-visibility cases the brief names (`dropdown.test.ts:77`, `popover.test.ts:72`, `tooltip.test.ts:164`) each fail with an `AssertionError` (lines 422-436, 464-478, 506-520); additional selector-shape failures also appear but do not contradict the brief's "each of the three... fails" claim. Log ends `exit=1` (line 528).
   - Gate logs: `anchor-format.log.txt`, `anchor-lint.log.txt`, `anchor-typecheck.log.txt`, `anchor-test-styles.log.txt`, `anchor-test-conformance.log.txt`, `anchor-test-guides.log.txt`, `anchor-test-policy.log.txt` each end `exit=0` (confirmed by grep across all seven).

No referrals: every check resolved on evidence in the diff, status, and logs. The one soft gap is the 223-character column-width count in Item 4, which I did not verify by exact character count; the raw file's table alignment is consistent with the other unaffected rows, and nothing in the evidence flags a misfit, so I record it as an observation rather than an UNRESOLVED item.

CHECK: PASS

The Orchestrator's measurement of the column gap the checker left open: each of the six changed rows
(`guides/veneer.md` lines 10491, 10492, and 10588 to 10591 at `ebce3fe`) is 714 characters, the same as the unchanged
rows 10493 and 10592 beside them, so the table's column widths did not move and each Reason cell fits its column.
