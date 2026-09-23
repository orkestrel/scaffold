1. CONFIRMED — every `{@link}` in the four functions' comments is followed by a noun: `src/browser/helpers.ts:2948-2949` (`{@link clipsOverflow} helper reports`), `:2957` (`{@link readClipMargin} helper reads`), `:3024` (`{@link readClipEdge} helper measures`), `:3060` (`{@link readClipEdge} helper measures`).

2. CONFIRMED — `src/browser/helpers.ts:3016-3018`: "@returns True if the element's computed `overflow-y` value is other than the `visible` keyword or its computed `contain` value carries paint containment (the `paint` keyword, the `content` keyword, or the `strict` keyword); false otherwise."

3. CONFIRMED — `tests/src/browser/helpers.test.ts:2911`: "// The frames stack: 300 rows of the contained frame and 200 of the scroll container." No count of the frames themselves appears; the diff (`/home/user/scaffold/.orkestrel/veneer/units/t4-7.diff:98-99`) shows the prior "two frames" wording removed, and the retained numbers (300, 200) count rows per frame, not frames.

4. CONFIRMED — `t4-7.diff` touches only comment lines (`*`-prefixed TSDoc lines and one `//` line) across `src/browser/helpers.ts` and `tests/src/browser/helpers.test.ts`; no executable line changes. `t4-r7-gates.log.txt` records `=== format:check exit=0` (line 11), `=== lint:check exit=0` (line 16), `=== check exit=0` (line 37), `=== test:guides exit=0` (line 52).

No findings outside the claims within the four functions' documentation comments (`readClipEdge`, `readClipMargin`, `clipsOverflow`, `measureContent` at `src/browser/helpers.ts:2944-3081`).

VERDICT: PASS
