# Unit REBOOT-153 round 2 — report

## Evidence re-readings

Re-taken at `4574c58` before editing; each matched the brief exactly.

- `tests/setupBrowser.ts`, `normalizeLineWidths` doc block (line 1863 before edit): "A line style of
  `none` or `hidden` paints no line whatever its width. Chromium 141 computes such a width at `0px`
  and Chromium 153 at its declared length, so a reading compared across builds reads the width as it
  paints. Every other entry, and a width whose style longhand the reading lacks, is returned
  unchanged."
- `guides/veneer.md` (line 10771 before edit): "It reads an outline or border width whose line style
  paints no line at `0px`, because Chromium 141 computes such a width at `0px` and Chromium 153 at
  its declared length."
- `tests/setupBrowser.test.ts`, `describe('normalizeLineWidths')`, held one case with two `expect`
  calls before editing.

## Items — before and after

**Item 1** (doc block remarks paragraph, `tests/setupBrowser.ts`):
- Before: "A line style of `none` or `hidden` paints no line whatever its width. Chromium 141
  computes such a width at `0px` and Chromium 153 at its declared length, so a reading compared
  across builds reads the width as it paints. Every other entry, and a width whose style longhand
  the reading lacks, is returned unchanged."
- After: "A line style of `none` or `hidden` paints no line whatever its width, so a reading compared
  across builds takes such a width at `0px`, whatever length a build computes it at. Every other
  entry, and a width whose style longhand the reading lacks, is returned unchanged." Rewrapped at
  120 columns.

**Item 2** (guide sentence and its paragraph, `guides/veneer.md`):
- Before: "It reads an outline or border width whose line style paints no line at `0px`, because
  Chromium 141 computes such a width at `0px` and Chromium 153 at its declared length."
- After: "It reads an outline or border width whose line style paints no line at `0px`, whatever
  length a build computes it at, because such a width paints nothing." The containing paragraph
  (from "The button reboot rules sit in the ledger..." through "...where the release writes no
  `:disabled` rule for the class.") was rewrapped at 100 columns; no other word changed.

**Item 3** (`describe('normalizeLineWidths')` case, `tests/setupBrowser.test.ts`):
- Before: two `expect` calls.
- After: a third `expect` added after the first, exercising `border-top-width`, `border-right-width`,
  and `border-bottom-width` together with `outline-width`, each behind a `none` or `hidden` style,
  asserting every width normalizes to `'0px'`.

## Mutation table

| Longhand removed from `LINE_STYLES` | Log | `AssertionError` line |
| --- | --- | --- |
| `border-top-width` | `tmp/units/r2/r153-mutation-border-top-width.log.txt` | `AssertionError: expected { 'outline-style': 'none', …(9) } to deeply equal { 'outline-style': 'none', …(9) }` (diff shows `"border-top-width": "1px"` received vs. `"0px"` expected) |
| `border-right-width` | `tmp/units/r2/r153-mutation-border-right-width.log.txt` | Same `AssertionError` shape; diff shows `"border-right-width": "2px"` received vs. `"0px"` expected |
| `border-bottom-width` | `tmp/units/r2/r153-mutation-border-bottom-width.log.txt` | Same `AssertionError` shape; diff shows `"border-bottom-width": "4px"` received vs. `"0px"` expected |

Each mutation was applied alone, run, confirmed failing, then `LINE_STYLES` was restored and
verified byte-identical to the pre-mutation file with `diff` (all three: `IDENTICAL`) plus a
`git diff --stat tests/setupBrowser.ts` producing no output, logged beside each mutation's log.

## Gate table

| Gate | Log | exit |
| --- | --- | --- |
| `npm run check` | `tmp/units/r2/r153-check.log.txt` | 0 |
| `npm run lint:check` | `tmp/units/r2/r153-lint.log.txt` | 0 |
| `oxfmt --check` (owned files) | `tmp/units/r2/r153-oxfmt-check.log.txt` | 0 |
| `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` | `tmp/units/r2/r153-vitest-full.log.txt` | 0 (101 passed) |
| `npm run test:guides` | `tmp/units/r2/r153-test-guides.log.txt` | 0 (26 passed) |
| `npm run test:policy` | `tmp/units/r2/r153-test-policy.log.txt` | 0 (109 passed, 1 skipped) |

## Artifacts

- Diff: `/home/user/veneer-r153/tmp/units/r2/r153-2.diff` (`git diff 4574c58`) — touches
  `guides/veneer.md`, `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts` only.
- Status: `/home/user/veneer-r153/tmp/units/r2/r153-2-status.txt` — `M guides/veneer.md`,
  `M tests/setupBrowser.test.ts`, `M tests/setupBrowser.ts`.
- Report: `/home/user/veneer-r153/tmp/units/r2/r153-report-2.md`.

No deviation occurred. Every Evidence reading matched, every mutation produced an `AssertionError`,
and every gate exits 0.
