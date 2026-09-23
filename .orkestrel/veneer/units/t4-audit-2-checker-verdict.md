Verdict — checker, claims 4 and 5 (T4 TEST-CLIP, round 2)

**Claim 4 (the guide).** CONFIRMED.

- Row order: `readClipMargin` row sits directly before the `clipsOverflow` row, both before `measureContent` — `/home/user/test/guides/test.md:360-362`, matching `t4-2.diff:9-11`.
- § Capture sentence present at `/home/user/test/guides/test.md:621-626`: "An ancestor that clips its overflow (the `clipsOverflow` helper: an `overflow-y` value other than the `visible` keyword, or a paint containment) caps a descendant's edge at that ancestor's own bottom edge, expanded by the `overflow-clip-margin` length the `readClipMargin` helper reads where the clip is the `clip` keyword or a paint containment …" Every named token is followed by a noun: `clipsOverflow` helper, `visible` keyword, `overflow-clip-margin` length, `readClipMargin` helper, `clip` keyword — matching `t4-2.diff:18-24`.
- § Pattern closing sentence present at `/home/user/test/guides/test.md:3426-3428`: "… except inside a frame that clips its overflow, where a viewport-bound child ends at the frame's edge (the `clipsOverflow` helper names the frames that count, and the `readClipMargin` helper the margin a `clip` frame shows past its edge)." Both tokens now carry a trailing noun (`helper`), correcting the round-1 checker's referral (`t4-audit-checker-verdict.md:11`) about the same sentence lacking one — matching `t4-2.diff:31-35`.
- Guides project reads green: `t4-2-gates.log.txt:51-64` (`Test Files 1 passed (1)`, `Tests 51 passed (51)`, `test:guides exit=0`).

**Claim 5 (law and scope).** CONFIRMED.

- File set: `t4-2-status.txt:1-4` lists exactly `guides/test.md`, `src/browser/helpers.ts`, `tests/setupBrowser.ts`, `tests/src/browser/helpers.test.ts` modified — the four owned files named in `t4-test-clip-brief-2.md:18`, nothing else.
- No `any`, `as` assertion, suppression comment, mock, or nested function declaration beyond the stated exceptions: `t4-2.diff:47-99` (new `readClipMargin`/`clipsOverflow`, plain expressions and a regex literal), `t4-2.diff:104-137` (modified `measureContent`, a `for` loop body with no nested function declaration), `t4-2.diff:140-182` (frozen table literals in `tests/setupBrowser.ts`, `Object.freeze` at the outer array and at every element), `t4-2.diff:187-296` (test additions: real DOM fixtures built through `buildFixture`, no mocks or spies, the iteration loops are plain `for` statements inside `it()` callbacks, not nested function declarations). None found.
- No inline case matrix remains in the test file: the matrices moved to `tests/setupBrowser.ts` as `CLIP_CASES` and `CLIP_MARGIN_CASES` (`t4-2.diff:148-182`), and `tests/src/browser/helpers.test.ts` only imports and iterates them (`t4-2.diff:212-218, 226-242`), closing the round-1 checker's carried finding.
- No banned term (`.claude/rules/writing.md` substitution table) and no count of a growable set in the TSDoc (`t4-2.diff:47-99`) or the guide prose (`t4-2.diff:13-35`): none present on inspection of the added text.
- Gates, all in `t4-2-gates.log.txt`: `npm run format:check` exit 0 (line 12), `npm run lint:check` exit 0 (line 17), `npm run check` exit 0 (line 38), scoped browser run exit 0 (line 49, `Tests 7 passed | 336 skipped (343)`), `test:guides` exit 0 (line 64).

Findings outside the claims: none found within the read evidence (`t4-2.diff`, `t4-2-status.txt`, `t4-test-clip-brief-2.md`, `t4-2-gates.log.txt`, and the corresponding files in `/home/user/test`).

Note, not a ruling on claims 4 or 5: `readClipMargin` and `clipsOverflow` have no direct hit in `src/browser/index.ts` by name (`grep` for either identifier there returns none); the barrel re-exports `helpers.ts` through a wildcard `export *`, so both are reachable through the barrel, consistent with round-1 claim 2's "exported through the browser barrel," which this round's brief carries as an Orchestrator ruling taken as given rather than a claim 4 or 5 subject. Flagging only for completeness.

VERDICT: PASS
