# AP-TYPE round 4 report — three comment lines and two report errata

Successor to `ap-type-report-3.md`. The round-3 audit held every claim and found L1 to L5 outside
them; this unit closes L1 to L5.

## Edits

- **L1.** `tests/setupStyles.ts`, `FLUID_SIZE_CASES` `@remarks`: replaced "and the 2.25rem row sits
  under a 20px root" with "and the 2.25rem row resolves against a 20px root". Rewrapped the
  paragraph by hand to 100 columns.
- **L2.** `guides/veneer.md` § Font utilities (the paragraph opening at the line that read "The
  partial writes every entry through the `utility` mixin", around line 6185): replaced "The
  partial writes every entry through the `utility` mixin" with "The `_font.scss` partial writes
  every entry through the `utility` mixin". Rewrapped the paragraph by hand to 100 columns. The
  identical opening sentence in § Spacing utilities and § Text utilities stays unchanged.
- **L3.** `src/styles/utilities/_font.scss`, the comment ahead of the `breakpoint-each` walk:
  replaced "None of the release's font entries is responsive, so the walk" with "None of the
  release's font entries takes a breakpoint infix, so the walk". Rewrapped the comment by hand to
  100 columns.

## Errata to the round-3 report

- "`ap-type-report-3.md` § Failing-first: the mode/density and unlayered-priority cases in
  `font.test.ts` read the `.fs-3` size relationally, so they read a size this unit changes; their
  assertions stay true under every supplied mutation."
- "`ap-type-report-3.md` § Formatting: the edited guide paragraphs are rewrapped by hand to 100
  columns."

## Gates

| Gate | Command | Exit | Log |
| --- | --- | --- | --- |
| Format | `npm run format:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-4/apt-4-format.log.txt` |
| Lint | `npm run lint:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-4/apt-4-lint.log.txt` |
| Typecheck | `npm run check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-4/apt-4-check.log.txt` |
| Guides test | `npm run test:guides` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-4/apt-4-test-guides.log.txt` |
| Styles build | `npm run build:src:styles` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-4/apt-4-build-styles.log.txt` |
| CSS parity | `cmp dist/src/styles/index.css tmp/units/apt-3-index.css` | 0 | (ran inline; recorded here) |

## Diff scope

`/home/user/scaffold/.orkestrel/veneer/units/apt-4.diff` (`git diff 712ae72` over the three owned files) touches only
`guides/veneer.md`, `src/styles/utilities/_font.scss`, and `tests/setupStyles.ts`. Compared
section-by-section against the round-3 combined diffs (`apt-3.diff` and `apt-shared-3.patch`), the
delta from round 3 is exactly the L1, L2, and L3 edits above — no other line in any of the three
files changed. `/home/user/scaffold/.orkestrel/veneer/units/apt-4-status.txt` (`git status --short`) is unchanged in shape from
round 3: the same files show modified, nothing new is untracked.
