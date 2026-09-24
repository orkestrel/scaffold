Both round-3 findings map to claim 3 sub-clauses, confirming what round-3's report addresses. Now finalizing the verdict.

Per the report, mutation log claim: "the value `none` splits into one layer with no pixel lengths, so it reads 0 either way" — this matches the RING_SHADOW_CASES row `{shadow: 'none', reach: 0}` at line 1939, present already (not deleted), confirming the branch removal is safe. Also verified claim 1's `RING_SHADOW_CASES` still contains this `none` row and the code no longer special-cases `'none'` (confirmed at `computeRingReach` — the shown implementation at lines 1861-1875 has no `shadow === 'none'` check, only splits and processes generically). Good — this evidence also supports claim 1's "the `none` branch is gone" though claim 1 is outside this checker's scope (claims 3 and 4 only).

## Verdict

**Claim 3 — The rename and the TSDoc: CONFIRMED**

- Frames path: both occurrences of the outline capture directory use `tmp/capture/outline/${state}` (`/home/user/scaffold/.orkestrel/veneer/units/ff-3.diff:1459` list-group case, `:1459` region — correction, list-group at diff line 826, skip-link at diff line 1459), never `tmp/capture/guard`.
- Local name: both sites name the local `FrameManager` instance `outlineFrames` (`ff-3.diff:827` list-group, `ff-3.diff:1460` skip-link), never `guard` or `guardFrames`.
- `SHOWCASE_KEYS` TSDoc: the added text at `ff-3.diff:1820-1825` reads "A focus frame shot on a padded wrapper around its lifted specimen holds the ring painted outside the focused element's box, and the journey case that shoots each focus frame states the placement it uses" — it no longer asserts every focus frame universally uses a padded wrapper; it restricts the claim to the case that converted, matching round 2's SETUP-FOCUS-UNIVERSAL finding.
- Mutation to falsify: reverting either rename to `guard`/`tmp/capture/guard`, or reverting the TSDoc to the unqualified universal claim, is exactly what round 2's subjective and objective lanes flagged and round 3's diff reverses; the sites named are the only two occurrences in the diff (confirmed by the `outlineFrames|guard` grep sweep over the full diff), so the claim's assertion covers every site the round touched.

**Claim 4 — Scope and law: CONFIRMED**

- `ff-3-status.txt:1-3` lists exactly `tests/app/browser/integration.test.ts`, `tests/setup.ts`, `tests/setup.test.ts` — the three files the brief (`/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-brief.md:71-72`) owns, and no other file.
- Swept the full `ff-3.diff` (2028 lines) for every added line: no `any` (zero matches for `\bany\b`), no `as` beyond `as const` (two occurrences, both `] as const)` tuple-literal const assertions at `ff-3.diff:824` and `:1457`), no non-null assertion (`![a-zA-Z0-9_\])]!\.` pattern: zero matches), no `@ts-`/`eslint-disable` suppression (zero matches), no `vi.mock`/`jest.mock` (zero matches), and no nested function declaration (`^\+\s*function\s` at any indentation beyond column 0: zero matches; the only inline function is the anonymous `mouseover` callback passed directly to `addEventListener` at `ff-3.diff:1312-1320`, the permitted callback exception).

**Counts the report states**

- 1277 insertions and 323 deletions across the three owned files (`b-focus-frame-report-3.md:35`).
- 305 of 305 for `npm run test:setup` (`b-focus-frame-report-3.md:12, 26`).
- 2 passed, 45 skipped (47 total) for the filtered journey run (`b-focus-frame-report-3.md:27`).
- 1 test failing out of 305 for each of the two named mutations (`b-focus-frame-report-3.md:8-9`).
- 1 test failing, 46 skipped for the list-group control run (`b-focus-frame-report-3.md:13`).

Findings outside the claims: none.

VERDICT: PASS
