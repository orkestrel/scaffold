# NAV (`nv`) audit round 1 — `checker` on Sonnet verdict (claims 1, 5, 6, 8)

**Claim 1 — CONFIRMED.** `nv-status.txt:1-5` shows exactly the modified `CardSection.test.ts` and the four new files; `nv-shared.patch` carries hunks against exactly the thirteen shared files the claim lists; no off-limits file.

**Claim 5 — CONFIRMED (structural), UNRESOLVED on the journey clause.** The `tests/setup.ts` hunk adds the seven `CASCADE_KEYS` rows and the three `DRIVEN_KEYS` rows with the `CaptureSubject` members; the `integration.test.ts` hunk uses `FRAMES.place` for the two hover scenarios and `FRAMES.page('nav-base-focus', link)` for the focus scenario; no `CaptureState` member. The journey reading rests on the report alone (lines ~111-115).

**Claim 6 — CONFIRMED (structural), UNRESOLVED on the measurement clause.** `nv.diff` defines `NAV_SELECTORS`, `NAV_MARKUP`, `NAV_LENGTH_CASES`, `NAV_COLOR_CASES`, and `NAV_ROW_CASES`; `tests/setupStyles.test.ts`'s `nav case tables` binds them against `oracle.components.nav` and the `Navbar` deferral rows; the guide hunk carries the `#### nav` departure rows and the forced-colours addition row; `tests/conformance.test.ts` and `tests/setupServer.test.ts` gain `'nav'`. That the ledger equals the executed `test:conformance` reading rests on the report alone.

**Claim 8 — CONFIRMED.** No `any`, `as`, `!`, suppression, mock, or nested function beyond an inline callback in the owned files or the shared hunks; the prose carries no banned term and states no count of a growable set; code tokens are followed by a noun or fall under the permitted CSS and Sass exception; the report pairs each command with its exit and reading. Finding outside the claims: the report's file line counts, diffstat counts, vitest pass counts, and the per-mutation "Failed of 59" counts, listed per the claim's instruction (mostly run measurements the rule permits).

VERDICT: FAIL 5, 6; outside the claims: none
