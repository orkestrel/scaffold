1. **BROKEN** — Item 3 specifies insertion after the mixed-input assertion (`reboot-153-brief-2.md:56`). The added assertion instead follows the `auto` assertion (`tests/setupBrowser.test.ts:2013`, `tests/setupBrowser.test.ts:2017`). Move the added block before the `auto` assertion. Its contents are correct, and this ordering discrepancy does not weaken the proof. Whitespace-normalized comparisons confirmed the exact prose replacements and no unrelated word changes.

2. **CONFIRMED** — Attacks using nonzero widths, a solid style, an absent style longhand, and unrelated entries produced the documented results (`tests/setupBrowser.ts:1863`, `tests/setupBrowser.ts:1875`). The form reader normalizes before comparing (`tests/setupBrowser.ts:2061`). The guide sentence (`guides/veneer.md:10771`) states a normalization rule without asserting what Chromium 153 computes. This agrees with [CSS UI Level 4](https://www.w3.org/TR/css-ui-4/#outline-style) and [CSS Backgrounds Level 3](https://www.w3.org/TR/css-backgrounds-3/#border-width). `hidden` is a border style, not a legal outline style; `auto`, solid widths, and widths lacking a style remain unchanged. Neither replacement requires an unrecorded browser-build behavior.

3. **CONFIRMED** — Executing the extracted implementation and case assertions in memory passed with the intact mapping. Each individual removal raised `AssertionError`; this was a Node execution, not a Vitest rerun. The assertions distinguish these mutations:

   | Mapping removed | Received instead of expected `0px` | Distinguishing assertion |
   |---|---|---|
   | `outline-width` | `3px` | `tests/setupBrowser.test.ts:2003` |
   | `border-top-width` | `1px` | `tests/setupBrowser.test.ts:2034` |
   | `border-right-width` | `2px` | `tests/setupBrowser.test.ts:2036` |
   | `border-bottom-width` | `4px` | `tests/setupBrowser.test.ts:2038` |
   | `border-left-width` | `2px` | `tests/setupBrowser.test.ts:2009` |

   The recorded browser failures corroborate the added coverage: `r153-instruments/r2/r153-mutation-border-top-width.log.txt:34`, `r153-instruments/r2/r153-mutation-border-right-width.log.txt:34`, and `r153-instruments/r2/r153-mutation-border-bottom-width.log.txt:35`. The pre-existing zero-valued border-right input correctly remains insufficient by itself.

4. **NOT-EVIDENCED** — The captured fixture supports the measured Chromium behavior (`r153-instruments/probe/probe-141.log.txt:1`). Its predicate distinguishes a zeroed solid width and a nonzero `none` width (`r153-instruments/probe/probe.mjs:12`); replaying those mutations returned false. Normalization also preserved the captured button and anchor readings. However, the probe neither invokes `readFormDifferences` nor captures its states and cascades, and it omits `border-bottom-width` (`r153-instruments/probe/probe.mjs:6`). It therefore does not establish “every Chromium 141 reading.” Supply raw-versus-normalized identity captures at `tests/setupBrowser.ts:2061` across the claimed population, or restrict the claim to the captured fixture.

5. **CONFIRMED** — Each gate log ends with `exit=0`: `r153-instruments/r2/r153-check.log.txt:30`, `r153-instruments/r2/r153-lint.log.txt:6`, `r153-instruments/r2/r153-oxfmt-check.log.txt:5`, `r153-instruments/r2/r153-vitest-full.log.txt:36`, `r153-instruments/r2/r153-test-guides.log.txt:16`, and `r153-instruments/r2/r153-test-policy.log.txt:16`. The terminal-line check rejected the recorded mutation failure as its negative control. This confirms the recorded exits, not broader behavioral coverage.

VERDICT: FAIL 1, 4; outside the claims: none