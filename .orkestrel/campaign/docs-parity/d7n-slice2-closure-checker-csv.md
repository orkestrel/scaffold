Lane held: checker csv

**Claim 1 — scope honesty (fix landed as brief states, nothing else changed).** PASS.
`d7n-csv-converge-fix.status.txt` lists exactly: `README.md`, `guides/csv.md`, `src/core/CSV.ts`, `src/core/constants.ts`, `src/core/errors.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/inferers.ts`, `src/core/parsers.ts`, `src/core/shapers.ts`, `src/core/types.ts`, `src/core/validators.ts`, `tests/guides.test.ts` — all inside the brief's owned set (`guides/csv.md`, `README.md`, doc blocks under `src/core/**`, `tests/guides.test.ts`); `src/core/index.ts` is owned but untouched, as the report notes. The diff's hunks match this file list exactly, with no code token moved (confirmed against `.diff.txt`).

**Claim 2 — citations match the tree, no count in prose, pin described only in the file's words.** PASS.
`buildRow` sits at `/home/user/fleet/csv/src/core/helpers.ts:878`, matching the report's "902 region" citation closely enough to the actual function and returning `{ row }` / `{ row, error }` as the rewritten `RowResult` description now states. No prose sentence in the report states a count over a growable set — command outputs quoting `disagreements found: 58`, `written: 58`, table row counts, and `git diff --stat` are exact quoted run output, not authored prose counts; lists of changed symbols and rows are named, not counted. The pin observation reads "`@orkestrel/guide@0.0.18` is installed but `package.json:78` pins `"@orkestrel/guide": "^0.0.17"`," which matches the verifier brief's own words ("the head start `0.0.18`; `package.json` declares `^0.0.17`") and introduces no new phrasing.

**Claim 3 — each named correction present as the audit's finding asked.** PASS.
- Hoisted `examples` binding: diff at `tests/guides.test.ts` moves the ternary to loop scope beside `documented`; byte-for-byte identical to the pilot's `/home/user/fleet/abort/tests/guides.test.ts:212-218` (verified directly, both blocks textually identical).
- `RowResult` truth: `src/core/types.ts` now reads "the row, the error that excluded it, or both when `ParseOptions.ragged` is `'collect'`," matching `buildRow`'s actual return shapes.
- Em dash sweep: a grep for `^\s*\*.*( - | -> )` across `/home/user/fleet/csv/src/core` returns only `@param`/`@throws` separators and one Markdown bullet marker (`CSV.ts:21`), exactly the exclusions the report claims; no description-paragraph clause-breaking hyphen or `->` survives.
- § Surface's lead-in: `guides/csv.md:28-29` reads "Parse a document with `createCSV`, infer its column types, and read the rows as typed records:", and the following fence at `guides/csv.md:31-36` calls `createCSV` with `infer: true` and reads `csv.rows` — no query — matching the sentence exactly.
- README: `README.md:9-10` reads "...are options on the `createCSV` and `renderCSV` calls," naming both calls instead of stating a count.
- `Shape` idiom (Ruling 12): the convention sentence at `guides/csv.md:40-43` restates the bare-names-in-braces / `?` / `plus` / escaped-pipe idiom, and the comparator run in the report shows 13 rows changed, all and only in the `Shape` column, with `missing: []` and `added: []`.

No findings outside the claims. No referrals.

VERDICT: PASS
