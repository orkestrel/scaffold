Claim 3 audit — LEDGER-RETUNE, checker

1. CONFIRMED. Sampled every distinct row-shape across the 450 pairs in `lret-drift-members.txt` (`/home/user/scaffold/.orkestrel/veneer/units/lret-instruments/lret-drift-members.txt`) against `/home/user/veneer-lret/guides/veneer.md`:
   - `btn | .btn | --bs-btn-font-size | tokenized -> retuned` (drift line 2) matches guide line 7628: `| `btn` | `.btn` | `--bs-btn-font-size` | — | `1rem` | `var(--vn-size-2)` | retuned |`.
   - `table | .table-primary | --bs-table-border-color | aliased -> retuned` (drift line 269) matches guide line 9712: same row, `retuned`.
   - `theme | :root | --bs-primary | tokenized -> retuned` (drift line 306) matches guide line 9920: same row, `retuned`.
   - `accordion | .accordion | --bs-accordion-btn-padding-y` (claim-3 row, unchanged `tokenized`) matches guide line 7580: `tokenized`.
   The final conformance gate (`/home/user/scaffold/.orkestrel/veneer/units/lret-instruments/lret-conformance.log.txt`) independently corroborates full-population correctness: `Test Files 1 passed (1)`, `Tests 33 passed (33)`, `exit=0`, run 2026 via `npm run test:conformance` — this gate's `classifyValueGaps` function reddens on any row/difference mismatch across the entire ledger, so its exit 0 covers every one of the 450 pairs, not only the samples read directly.

2. CONFIRMED. No `| declared |` cell exists in `/home/user/veneer-lret/guides/veneer.md` (grep for `declared` returns only unrelated prose senses: `ParserMap` description, "declared attributes/option/value" prose in the Vocabulary/Departures narrative sections, none inside a `Departure`-column table cell — checked lines 58, 83, 801-814, 1814, 3187-3454, 3902-7900+ range, all prose, no table row). `tests/setupServer.ts` has no `declared` member of the `Departure` union — line 154 defines `export type Departure = 'tokenized' | 'aliased' | 'restated' | 'fallback' | 'retuned' | 'dropped'`, and the other `declared` hits there (lines 2207-2216, 2867-2868, 2895+) are an unrelated local variable name in `collectDeclarationReads`/`readCascadeBlocks`, a permitted sense. `tests/setupServer.test.ts` line 2094/2096 and line 3087 use `declared` only as a fixture/assertion proving that value is invalid and `isDeparture('declared')` is `false` — permitted sense (asserting exclusion, not asserting presence). `tests/conformance.test.ts`: no hits at all (grep returned no files found).

3. CONFIRMED. Guide line 7628 `.btn` `--bs-btn-font-size` reads `retuned`. Guide line 7580 `.accordion` `--bs-accordion-btn-padding-y` reads `tokenized`. Guide lines 9920 and 10037 `theme` `--bs-primary` read `retuned` (both `:root` and `[data-bs-theme=light]` sites).

4. CONFIRMED. `tests/setupServer.ts` line 154: `export type Departure = 'tokenized' | 'aliased' | 'restated' | 'fallback' | 'retuned' | 'dropped'`. Guide § Departures legend (lines 7561-7569, `/home/user/veneer-lret/guides/veneer.md`) names exactly: `retuned` (line 7562), `dropped` (line 7563), `tokenized`, `aliased`, `fallback`, `restated` (line 7564-7566) — six members, matching the union exactly, no extra and none missing.

VERDICT: PASS
