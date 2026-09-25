# Unit E-ID-ANCHOR round 3 report

## Evidence re-readings (at `98bd1b0`, before edits)

- `src/styles/_mixins.scss` mixin comment (lines 644-652): matched the brief's quoted "both builds"
  form exactly.
- `src/styles/components/_dropdown.scss` include comment (lines 272-276): matched.
- `src/styles/components/_tooltip.scss` include comment (lines 71-75) and `_popover.scss` (lines
  76-80): both contained "on both builds, and neither build then paints", matching the brief.
- `guides/veneer.md` line 4718 contained the two quoted sentences verbatim.
- `guides/veneer.md` § Tokens › § Additions: the two `dropdown` rows sat at lines 10491-10492, the
  two `tooltip` rows at 10588-10589, the two `popover` rows at 10590-10591, each pair sharing the
  Reason text the brief quoted. Reason column cell width was 223 characters (225 with the table's
  padding spaces).

No reading differed from the brief. Proceeded with all Items.

## Items — before and after

### Item 1 — mixin comment (`src/styles/_mixins.scss`)

Before:
```
// Emits `position-visibility: anchors-visible` on the open popover state of the `$class` class, so
// an overlay the engine promotes to the top layer computes that value while it is open and the
// initial value while it is closed. The initial value is `anchors-visible` on Chromium 153 and
// `always` on Chromium 141, so the open overlay computes the same value on both builds. Under that
// value neither build paints a tooltip or a popover whose trigger a scroll container clips entirely.
// Chromium 153 does not paint a dropdown menu whose toggle a scroll container clips entirely, and
// Chromium 141 paints it, because the engine does not anchor the menu there. Each caller writes the
// rule in the `components` layer and declares nothing important, so a class of your own in a later
// layer, or in none, overrides it without a specificity contest.
```
After: the exact text of Item 1.

### Item 2 — include comments

`_dropdown.scss`: replaced with the exact text of Item 2's dropdown block.

`_tooltip.scss` and `_popover.scss`: replaced "on both builds, and neither build then paints" with
"on Chromium 141 and 153, and neither then paints" and re-wrapped each comment (tab-prefixed lines
stayed at or under 100 columns counting the tab as one column).

### Item 3 — guide paragraph (`guides/veneer.md`, around line 4718)

Before (the two quoted sentences): "Under that value Chromium 153 does not paint an open menu whose
toggle a scroll container clips entirely. Chromium 141 still paints that menu, because the engine
does not anchor the menu there."

After: "Under that value neither Chromium 141 nor Chromium 153 paints an open menu whose toggle a
scroll container clips entirely, except Chromium 141 when a pointer press on the toggle opened the
menu, because the engine does not anchor that menu there." The whole paragraph (lines 4715-4724) was
re-wrapped at 100 columns; no other word changed.

### Item 4 — Additions table Reason cells

- Both `dropdown` rows (around lines 10491-10492): Reason replaced with "The open menu computes
  `anchors-visible` on Chromium 141 and 153. Neither paints it while a scroll container clips its
  toggle entirely, except Chromium 141 when a pointer press opened it, which the engine leaves
  unanchored."
- Both `tooltip` rows (around lines 10588-10589): Reason replaced with "The open tip computes
  `anchors-visible` on Chromium 141 and 153, and neither then paints a tip whose trigger a scroll
  container clips entirely."
- Both `popover` rows (around lines 10590-10591): Reason replaced with "The open popover computes
  `anchors-visible` on Chromium 141 and 153, and neither then paints a popover whose trigger a
  scroll container clips entirely."

Ran `./node_modules/.bin/oxfmt --config .oxfmtrc.json` over `guides/veneer.md` and the four styles
files; the table re-padded to a consistent 225-character Reason cell (223 characters plus the
table's two padding spaces) across all changed rows.

## Plant table

| Plant | Case | Log line (excerpt) | `AssertionError` | Mixin digest before | Mixin digest after |
| --- | --- | --- | --- | --- | --- |
| `important` | mixins `position-visibility` case, `important` field | `tests/src/styles/mixins.test.ts:287` `toEqual` diff shows `important: false` → `true` for the dropdown/popover/tooltip anchored rules | yes (`AssertionError`) | `abe6a891c6aeb16fb521e14c299d992de7ff1c176d1eb0402dd82e679076f09c` | `abe6a891c6aeb16fb521e14c299d992de7ff1c176d1eb0402dd82e679076f09c` |
| `important` | dropdown anchored-visibility case | `tests/src/styles/components/dropdown.test.ts:99` expected `'always'`, received `'anchors-visible'` | yes (`AssertionError`) | (same, above) | (same, above) |
| `important` | popover anchored-visibility case | `tests/src/styles/components/popover.test.ts:94` expected `'always'`, received `'anchors-visible'` | yes (`AssertionError`) | (same, above) | (same, above) |
| `important` | tooltip anchored-visibility case | `tests/src/styles/components/tooltip.test.ts:186` expected `'always'`, received `'anchors-visible'` | yes (`AssertionError`) | (same, above) | (same, above) |
| `closed` | dropdown anchored-visibility case | `tests/src/styles/components/dropdown.test.ts:99` (initial-value assertion under the flipped selector) | yes (`AssertionError`) | `9c4544411a2a91e101b9743474f5c96e48b597f77d53713a88281fa336da6285` | `abe6a891c6aeb16fb521e14c299d992de7ff1c176d1eb0402dd82e679076f09c` |
| `closed` | popover anchored-visibility case | `tests/src/styles/components/popover.test.ts:90` | yes (`AssertionError`) | (same, above) | (same, above) |
| `closed` | tooltip anchored-visibility case | `tests/src/styles/components/tooltip.test.ts:182` | yes (`AssertionError`) | (same, above) | (same, above) |

Full logs: `tmp/units/r3/anchor-plant-important.log.txt` (4 test files failed, 116 passed / 4 failed
of 120) and `tmp/units/r3/anchor-plant-closed.log.txt` (4 test files failed, 113 passed / 7 failed of
120, including a selector-list mismatch on the tooltip alongside the three anchored-visibility
cases). The mixin's declaration was restored byte-identically after each plant; the digest after
each plant equals the digest before that plant's edit (`abe6a891c6aeb16fb521e14c299d992de7ff1c176d1eb0402dd82e679076f09c`).

## Gate table

| Gate | Log | Exit |
| --- | --- | --- |
| `npm run format:check` | `tmp/units/r3/anchor-format.log.txt` | 0 |
| `npm run lint:check` | `tmp/units/r3/anchor-lint.log.txt` | 0 |
| `npm run check` | `tmp/units/r3/anchor-typecheck.log.txt` | 0 |
| `npm run test:src:styles` | `tmp/units/r3/anchor-test-styles.log.txt` | 0 (115 files, 1533 tests passed) |
| `npm run test:conformance` | `tmp/units/r3/anchor-test-conformance.log.txt` | 0 (45 tests passed) |
| `npm run test:guides` | `tmp/units/r3/anchor-test-guides.log.txt` | 0 (26 tests passed) |
| `npm run test:policy` | `tmp/units/r3/anchor-test-policy.log.txt` | 0 (109 passed, 1 skipped) |

## Artifacts

- `tmp/units/r3/anchor-3.diff` — `git diff 98bd1b0`, 121 lines, touching `guides/veneer.md`,
  `src/styles/_mixins.scss`, `src/styles/components/_dropdown.scss`,
  `src/styles/components/_popover.scss`, `src/styles/components/_tooltip.scss`.
- `tmp/units/r3/anchor-3-status.txt` — `git status --porcelain=v1`, showing the same 5 modified files
  and nothing else.

## Deviations

None. Every Evidence reading matched, every Reason cell fit its column after Item 4 and after
`oxfmt`, both plants failed every case they named with an `AssertionError`, and every gate read
green.
