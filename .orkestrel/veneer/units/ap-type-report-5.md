# AP-TYPE round 5 report — the partial sentences, the infix term, and the report

Successor to `ap-type-report-4.md`. The round-4 audit held every claim and found N1 to N4 outside
them; this unit closes N1 to N4 under the seam ruling's invariant.

## Edits

- **N1.** Every "The partial" and "This partial" sentence in `guides/veneer.md` was read against
  its nearest preceding partial path. Where the description belonged to an earlier-named partial
  rather than the nearest one, the sentence now names the described partial:
  - § Navbar classes: named `_navbar.scss`.
  - § Float utilities: named `_float.scss`.
  - § Shadow utilities: named `_shadow.scss`.
  - § Flex utilities: named `_flex.scss`.
  - § Text utilities: named `_text.scss` (the sentence N1 in the round-4 audit already found
    broken).
  - § Interaction utilities: named `_interaction.scss`, in both its prose sentence and its
    departure bullet.
  Each edited paragraph was rewrapped by hand to 100 columns.
- **N2.** `src/styles/utilities/_font.scss`'s cap-block comment now names what the release writes
  at each breakpoint infix instead of calling it "responsive": "after the utilities it writes at
  each breakpoint infix". `tests/setupStyles.ts`'s `FONT_ENTRY_CASES` TSDoc now reads "No font
  entry takes a breakpoint infix" in place of "No font entry is responsive". Both comments were
  rewrapped by hand to 100 columns.

## Partial-sentence table

| Section | Nearest preceding partial path | Result |
| --- | --- | --- |
| Button-check self-reference (§ Form check classes) | `_button.scss` (named in the same sentence) | Holds |
| Validation classes | `_validation.scss` | Holds |
| Navbar classes | `_button.scss` (no navbar path was named nearby) | Edit: named `_navbar.scss` |
| Float utilities | `_clearfix.scss` | Edit: named `_float.scss` |
| Object fit utilities | `_object-fit.scss` | Holds |
| Opacity utilities | `_opacity.scss` | Holds |
| Overflow utilities | `_overflow.scss` | Holds |
| Shadow utilities | `_tokens.scss` | Edit: named `_shadow.scss` |
| Position utilities | `_position.scss` (utilities) | Holds |
| Border utilities | `_border.scss` | Holds |
| Flex utilities | `_stacks.scss` | Edit: named `_flex.scss` |
| Spacing utilities | `_spacing.scss` | Holds |
| Gap utilities (both sentences) | `_gap.scss` | Holds |
| Text utilities | `_text-truncation.scss` | Edit: named `_text.scss` |
| Background utilities (both sentences) | `_background.scss` | Holds |
| Interaction utilities (prose sentence) | `_spacing.scss` | Edit: named `_interaction.scss` |
| Interaction utilities (departure bullet) | `_spacing.scss` | Edit: named `_interaction.scss` |

The navbar case has no literal `.scss` path stated in its own paragraph; the section calls it "its
own partial" throughout. The nearest literal path stated earlier in the narrative names a
different partial (`_button.scss`), so the sentence was read against that path and found false;
`_navbar.scss` is the path the Files section (`guides/veneer.md:2950`) already gives that
partial.

## Restated erratum

`ap-type-report-4.md`'s Failing-first erratum, restated with the cases' titles, their
`font.test.ts` locations, and the mutation logs it rests on: the "reads no mode or density
factor, so a dark island and a doubled factor leave every value" case
(`tests/src/styles/utilities/font.test.ts:274`) and the "keeps its priority over a later unlayered
consumer rule" case (`:331`) both read the `.fs-3` size relationally, so both read a size L1
changes. Both cases pass on the baseline and under every mutation logged under
`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/`: `apt-2-baseline-proofs.log.txt`
and each of `apt-2-mutation-literal.log.txt`, `apt-2-mutation-literal-cap.log.txt`,
`apt-2-mutation-cap.log.txt`, `apt-2-mutation-xxl.log.txt`, `apt-2-mutation-xxl-cap.log.txt`,
`apt-2-mutation-guard.log.txt`, and `apt-2-mutation-important.log.txt`. None of those supplied
mutations touches the property either case reads, so the two cases cannot tell the supplied
mutations apart, and their assertions stay true under every one of them.

## Gates

| Gate | Command | Exit | Log |
| --- | --- | --- | --- |
| Format | `npm run format:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-5/apt-5-format.log.txt` |
| Lint | `npm run lint:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-5/apt-5-lint.log.txt` |
| Typecheck | `npm run check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-5/apt-5-check.log.txt` |
| Guides test | `npm run test:guides` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-5/apt-5-test-guides.log.txt` |
| Styles build | `npm run build:src:styles` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-5/apt-5-build-styles.log.txt` |
| CSS parity | `cmp dist/src/styles/index.css tmp/units/apt-3-index.css` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-5/apt-5-cmp.log.txt` |

## Diff scope

`/home/user/scaffold/.orkestrel/veneer/units/apt-5.diff` (`git diff 712ae72` over the owned files) touches only `guides/veneer.md`,
`src/styles/utilities/_font.scss`, and `tests/setupStyles.ts`. Compared against the retained
round-4 diff (`/home/user/scaffold/.orkestrel/veneer/units/apt-4.diff`) hunk by hunk, the delta
from round 4 is exactly the edits named above, in each of the three files; every other hunk in
each file is unchanged apart from the line-number shift the new lines cause.
`/home/user/scaffold/.orkestrel/veneer/units/apt-5-status.txt` (`git status --short`) lists the same modified files as round 4, plus
no new untracked files.
