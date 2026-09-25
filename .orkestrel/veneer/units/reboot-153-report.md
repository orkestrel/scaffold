# Unit REBOOT-153 report

## Evidence re-readings

All matched the brief's Evidence, at `6052e25`, before editing:

- `tests/setupBrowser.ts` exports `readFormDifferences` (line 1958). Inside it, `readings.set` stored
  `Object.fromEntries(Array.from(getComputedStyle(element)).filter(…).map((longhand) => [longhand, readStyle(element, longhand)]))`
  at lines 2020-2027. The shape matched exactly.
- `tests/setupBrowser.test.ts` listed `'readFormDifferences'` in its export-list case (line 965) and
  held `describe('readFormDifferences')` (line 1872).
- `guides/veneer.md` line 10768 held the paragraph ending "once under this package's cascade and
  once under the release's stylesheet, and the button form must resolve apart from its counterpart
  on the same longhands, at the same button values, under both."

No reading differed. Work proceeded.

## Red

Command:

```
npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts -t normalizeLineWidths
```

Against a stub `normalizeLineWidths` that returned its input unchanged: 1 failed, 100 skipped
(101). `AssertionError: expected { 'outline-style': 'none', …(9) } to deeply equal { 'outline-style':
'none', …(9) }`, differing on `border-left-width` (`2px` received vs. `0px` expected) and
`outline-width` (`3px` received vs. `0px` expected). Full log at `/home/user/veneer-r153/tmp/units/r153-red.log.txt`.

## Green

Same command after applying Items 1, 2, and 4: 1 passed, 100 skipped (101). Log at
`/home/user/veneer-r153/tmp/units/r153-green.log.txt`.

## Gate table

| Gate | Command | Exit | Log |
| --- | --- | --- | --- |
| Typecheck | `npm run check` | 0 | `r153-check.log.txt` |
| Lint | `npm run lint:check` | 0 | `r153-lint.log.txt` |
| Format check | `oxfmt --config .oxfmtrc.json --check tests/setupBrowser.ts tests/setupBrowser.test.ts guides/veneer.md` | 0 | `r153-oxfmt.log.txt` |
| `setup:browser` suite | `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` | 0 (101 passed) | `r153-vitest-setupbrowser.log.txt` |
| Styles build | `npm run build:src:styles` | 0 | `r153-build-styles.log.txt` |
| Styles suite (carousel, dropdown, list-group, nav, button) | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache ...` | 0 (160 passed) | `r153-vitest-styles.log.txt` |
| Guides | `npm run test:guides` | 0 (26 passed) | `r153-test-guides.log.txt` |
| Policy | `npm run test:policy` | 0 (109 passed, 1 skipped) | `r153-test-policy.log.txt` |

All logs live under `/home/user/veneer-r153/tmp/units/`.

## Deviations

None. Item 1's code required no additional narrowing beyond the brief's specified code; `check` and
`lint:check` passed on the exact code the brief wrote.

## Files changed

- `/home/user/veneer-r153/tests/setupBrowser.ts` — added `LINE_STYLES` and `normalizeLineWidths`
  beside `readDuration`, and routed the `readings.set` object through `normalizeLineWidths` in
  `readFormDifferences`.
- `/home/user/veneer-r153/tests/setupBrowser.test.ts` — added `normalizeLineWidths` to the import
  list and the export-list case (along with `LINE_STYLES`), and added
  `describe('normalizeLineWidths')` with the case the brief specifies.
- `/home/user/veneer-r153/guides/veneer.md` — inserted the new sentence after "under both." and
  re-wrapped the affected paragraph span (lines 10767-10774) at 100 columns.

## Artifacts

- `/home/user/veneer-r153/tmp/units/r153.diff` — `git diff 6052e25`, 155 lines across the three
  files above.
- `/home/user/veneer-r153/tmp/units/r153-status.txt` — `git status --short`, showing the same three
  modified files, nothing else.
- Backups of the three owned files as they stood at `6052e25`: `r153-setupBrowser.ts.bak`,
  `r153-setupBrowser.test.ts.bak`, `r153-veneer.md.bak`, all under `tmp/units/`.
- `/home/user/veneer-r153/tmp/units/r153-report.md` — this same report, written to disk.
