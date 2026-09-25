LANE: eil-audit-3-reviewer

Lane held: **subjective**, on Opus 5.5. I read all evidence and ran nothing. Every rendered reading below cites the supplied probe log (`/home/user/scaffold/.orkestrel/veneer/units/eil-instruments/r3/eil-3-probe.log.txt`, "probe") or the mutation summary (`.../eil-instruments/r3/eil-3-mutations.log.txt`, "mutations").

## Per-claim verdicts

**1. Scope — CONFIRMED.**
- Every path in `/home/user/scaffold/.orkestrel/veneer/units/eil-3-status.txt:1-13` is granted by one of these briefs:
  - round 1 owned: `_dl`, `_blockquote`, `_figure`, and the dl, blockquote, figure, and quote tests;
  - round 2: `TypeSection.test.ts`;
  - round 3: `_quote.scss`, `_image.scss`, and their tests;
  - the common shared set: the guide, `setupStyles.ts`, and `constants.ts`.
- `_blockquote.scss` is absent from the status. Its text at `/home/user/veneer-eil/src/styles/elements/_blockquote.scss:1-8` matches the base that `eil-2.diff:65-73` reconstructs.

**2. Tag-only — CONFIRMED.**
- Each partial writes bare tag selectors only: `_dl.scss:2,7,12`, `_figure.scss:4,9`, `_blockquote.scss:2`.
- A sweep of the compiled `dist/src/styles/index.css` finds these tags followed by `:not`, `:has`, or a combinator nowhere except `.blockquote>:last-child`. That rule is scoped by the class, not by a tag.
- A utility class keeps the tag's default:
  - `dl.mb-0` stays a grid (probe:17).
  - `blockquote.mb-0` keeps its 4px bar and italics (probe:68).
  - `figure.text-center` and `figure.text-end` stay flex (probe:96, 105).
- Adjacent behaviour, correct by design: `figure.d-block` loses flex, because the utility names that one property.

**3. Bootstrap's patterns — BROKEN.**
- **Failing state:** the attributed quotation, `<figure><blockquote class="blockquote"><p>…</p></blockquote><figcaption class="blockquote-footer">Source</figcaption></figure>`, at 390 and 1280.
  - Veneer's `figure` is 63.14px tall; Bootstrap's is 51px (probe:78 against 82, and 87 against 91).
  - Veneer's footer is 3.86px shorter (17.14 against 21), so the line height explains none of the extra 12.14px.
  - The cause is 16px of the footer's end margin, which the flex `figure` (`_figure.scss:5-6`) encloses and Bootstrap's block figure lets collapse through.
- The claim's only exception is a line-height difference, so the figure box falsifies it.
- Content after the figure still lands where Bootstrap's does, less the line height (63.14 against 67). The difference shows only where the figure paints, for example a background utility.
- The other boxes hold:
  - `dl.row` columns, pairing, and gutter (probe:52-61);
  - `.blockquote` (probe:73-76);
  - the `.figure` pattern's caption at y=88 (probe:121-133).
  - The `.figure` width of 148.44 against 169.64 follows the caption's font size. I treat that as the same type-metric class as line height.
- Cells the probe did not capture:
  - `dl.row` at 390 (the probe ran 575, 576, and 1280);
  - the `.text-center` and `.text-end` attributed quotations at 1280;
  - a standalone `.blockquote` at 1280, which the attributed fixture at 1280 does cover (probe:88, 92).
- **Smallest correct fix** within Addendum 2, which retains the column layout: record the enclosure as a stated departure. Extend the Reason cell of the `figure { display }` row (`guides/veneer.md:9923`) to say the column encloses its last child's end margin. Also narrow claim 3's exception to match. The design alternative is in Referral B.

**4. Proofs — CONFIRMED.** Each mutation reddens the named proof, and the reading distinguishes it from the passing tree:
- `classless-grid`: `dl.test.ts:72` reads `block` against `grid` (mutations:1-5).
- `restored-gap`: the `.row` flex gains a 16px column gap and wraps the description, so `dd` top reads 29 against 0 (`dl.test.ts:42`). The 176px left edges and the `TEXT_DL_CASES` gap also fail (mutations:6-17).
- `no-term-padding`: the dl cases read `0px` against `16px` (`dl.test.ts:29`, mutations:18-23). The gutter reading of 12 is correctly unaffected.
- `classless-blockquote`: `blockquote.test.ts:33` reads 0px against 4px.
- `no-quote-resets`: `quote.test.ts:24` reads 4px against 0px. The border, the padding, and the font style each carry their own assertion, so dropping any one reset alone also reddens.
- `restored-figure-gap`: the footer reads 38 against 30 in all three holders, the caption space 16 against 8, and the gap `8px` against `normal`. The `d-block` holder stays green; that is correct, because a gap on a block box is inert.
- `no-caption-margin`: the caption space reads 0 against 8 in both holders.
- `no-figure-display`: `image.test.ts:75` reads width 320 against less than 320.
- `no-caption-reset`: `image.test.ts:97` reads 158 against 150 at a 0.05 tolerance.

Every restore is recorded byte-identical.

**5. The caption reset — CONFIRMED.**
- The fixture is the real showcase markup, `app/browser/helpers.ts:23`: `figure.figure.w-100 > div.ratio + figcaption.figure-caption`.
- Bootstrap places the caption at y=150, and Veneer with the reset also places it at y=150 (probe:145, 149).
- Without the reset, the caption reads 158 (mutations:63-66).
- Mutation: drop `_image.scss:26`. The assertion at `image.test.ts:97` separates 8px from the 0.05 tolerance.
- The reset is needed because the tag-only `figcaption { margin-top }` (`_figure.scss:10`) has no Bootstrap counterpart.
- With `.figure-img`, the reset does not move the caption, because the margins collapse to 8px either way (probe:122-123).

**6. Records — CONFIRMED.**
- The `dd` `margin-bottom` row is tokenized to `var(--vn-space-4)` (`guides/veneer.md:9262`). This matches `_dl.scss:14`.
- The `margin-left` row is gone, correctly: `0` equals the release's value.
- These addition rows match the shipped declarations:
  - `dt { grid-column }`, `dt { padding-right }`, and `dd { grid-column }` (`guides/veneer.md:9898-9900`);
  - the `figcaption` Reason (`guides/veneer.md:9925`);
  - `.blockquote { padding-left, border-left, font-style }` and `.figure-caption { margin-top }` (`guides/veneer.md:10029-10032`), matching `_quote.scss:4-7` and `_image.scss:26`.
- The Reasons are accurate and in the house voice. "The inline-end padding" for `padding-right` follows the existing precedent at `guides/veneer.md:9902`, "inline-start rule" for `border-left`.
- The conformance log shows `Tests 26 passed (26)` (`eil-3-test-conformance.log.txt:10-11`), and `eil-3-gates.log.txt:6` shows exit 0.

**7. Law — BROKEN.**
- **Title:** `it('lays the figure class pattern out as the release does', …)` at `/home/user/veneer-eil/tests/src/styles/components/image.test.ts:75`.
- **What is wrong:** the title names the reference that specified the test ("as the release does"), not what the test proves. The law requires titles to name what their assertions prove (`e-id-common.md:14`).
- The test never loads Bootstrap. It asserts fixed readings:
  - the caption sits 8px under the image;
  - the figure is narrower than its 320px container;
  - the image is at the figure's top-left;
  - the caption spans the figure's width and ends at its bottom.
- The title therefore claims a parity the assertions do not measure.
- **Why it matters:** a reader takes a green run as Bootstrap parity.
- **What right looks like:** retitle it to `shrinks the figure to its content and spaces the caption 8px under the image`. The comment at `image.test.ts:73-74` already carries the Bootstrap framing.
- The rest of the claim holds:
  - no `any`, `as`, `!`, suppression, nested declaration, or hidden helper;
  - every other added or retitled title states its property;
  - the added prose states no count. "Two-column" and "first column" name grid tracks, which are fixed values.

## Findings outside the claims

None.

## Attacked and held

- **Tag-only under non-utility classes.** `dl.row` overrides the term padding only through the gutter padding of `.row > *` (probe:40, 12px). `grid-column` is inert under flex. Neither needs a class-aware selector.
- **Bare multi-term grid.** A shared description pairs with the nearest preceding term, and adjacent terms stack tight, as Bootstrap's reboot does (probe:2-8).
- **Leading `figcaption`.** It takes 8px at the top of the figure. This follows from the tag-only default, and the report records it.
- **Adjacent phrasing, not ruled a defect.** The title at `dl.test.ts:42`, "lays a horizontal description list out beside its terms", makes the list the object where the descriptions are meant.

## Referrals (to the Orchestrator)

- **A. The E-ID-FLOW collision has no carrier.**
  - Addendum 2 keeps `figure` flex and also restores `figure { margin: 0 0 1rem }`.
  - A flex container never lets a child's margin collapse through it. The attributed quotation's footer margin (16px) will therefore add to the figure margin: 32px against Bootstrap's 16px.
  - The report states this under "no carrier assigned". It needs a named carrier before the E-ID-FLOW brief is written.
- **B. The flex display may no longer earn its place.**
  - With the gap gone, a flex `figure` differs from block flow only in two ways: it blockifies inline children (`svg`, `video`, inline anchors), and it suppresses margin collapse.
  - `figure.test.ts:60`, the `d-block` holder, shows block flow giving the same 8px caption space.
  - Rule whether that blockifying is worth the Claim 3 height difference and the collision in Referral A. This is a design ruling above the unit.
- **C. The button rule contradicts Addendum 2.**
  - The rule `button:not([class], [data-bs-target])` (`guides/veneer.md:3155`; the verdict's house rule cites it as the model) removes the default whenever any class appears.
  - Addendum 2 rules that shape out. No unit carries the conflict, and it is outside E-ID-LAYOUT's scope.

VERDICT: FAIL 3, 7; outside the claims: none
