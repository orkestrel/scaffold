Lane held: checker reason

## Claim 1 — Every item the fix brief names landed in the diff as stated, and nothing else changed (scope honesty against the status file)

**PASS.**

- `d7n-reason-converge-fix.status.txt` lists only owned files: `guides/reason.md`, `tests/guides.test.ts`, and files under `src/core/**` (`Reason.ts`, `builders/**`, `constants.ts`, `factories.ts`, `helpers.ts`, `operators/**`, `parsers.ts`, `reasoners/**`, `types.ts`, `validators.ts`) — matches the brief's owned scope exactly; no off-limits file (`README.md`, `package.json`, `tests/src/**`, `tests/setup*.ts`) appears.
- R1–R7 hunks are present in `d7n-reason-converge-fix.diff.txt` as the report describes.
- The diff also carries wording beyond the round's newly named items (for example `src/core/validators.ts:789-790,2443-2444` "the two entities can never match each other's" → "neither entity can ever match the other's"; `:393` "the three +5% / +5% / +15% multipliers"; `:1798`, `:2289` "three …" phrases). The claim's own parenthetical covers this: "a resumed unit's diff is the whole fix, its predecessor's hunks included," and the report's "resumed run's partial hunks" table names exactly which inherited hunks it re-touched, leaving the rest as the terminated predecessor produced. No file outside the owned set carries such a hunk.

## Claim 2 — The report's citations match the tree the unit left; no count in prose; the pin described only in the file's own words

**PASS.**

- Grep against `/home/user/fleet/reason` reproduces the report's stated grep results verbatim: the count pattern `\b(four|five|three|two) (reasoning|factor|definition|verb|operators|constants)` over `guides/reason.md src/core/*.ts tests/guides.test.ts` returns nothing; the `Shape`-cell type-literal pattern and the bare `…` pattern each return nothing in a `Shape` cell (the two `…` hits at `guides/reason.md:907,1092` are the reported non-`Shape` occurrences — a sequence continuation and an `is…` name pattern).
- `tests/guides.test.ts:1-3` in `/home/user/fleet/reason` reads "The consumer-side guides-parity drop-in: … The constants below are this package's own, and are the only part a sibling package changes," byte-identical to `/home/user/fleet/abort/tests/guides.test.ts:1-3` — the pilot itself has not yet moved to Ruling 13's amended "that follows" wording, so matching the pilot's current "below" text is correct; the amendment records that conversion as the closing sweep's work, not this round's.
- Numbers the report states are durations reported with their own run (`5192 ms`, `862 ms`, `4.78 s`) or raw test-runner output quoted as evidence, both permitted forms; no count in the report's own prose describes a growable set.

## Claim 3 — Each named correction is present as the audit's finding asked

**PASS.**

- Counts: `types.ts:214`'s `Source` description now reads "a static, field, lookup, or range factor source"; `Reasoning`'s Summary at `guides/reason.md:309` reads "Names the reasoning strategies"; all confirmed absent by the grep above.
- All-caps: sweeping `guides/reason.md` and every `src/core/*.ts` file for `\b[A-Z]{3,}\b` returns only real tokens — error codes (`MISSING`, `INVALID`, `MISMATCH`, `DESTROYED`, `TARGET`, `OPERATOR`, `FAILED`), `JSON`/`NaN`/`API`/`AGENTS`/`README`/`DOC ↔ SOURCE`, the `NYC` example datum, and the `AND` inside `LogicalReasoner.ts:126`'s warning string (a kept code token). No decorative emphasis word remains.
- Drop-in: `tests/guides.test.ts` header and `INTERNAL` sentence match the pilot; the hoist comment reads "5192 ms measured on this guide, 2026-09-07" with no row count and "the preceding readers"; the collection is `drifts`/`drift`; the title reads "§ Quantitative scoring — the operators driven directly" — all confirmed in `d7n-reason-converge-fix.diff.txt:2452-2503`.
- `set` row: `guides/reason.md:1017` reads "Setting `id` or removing `id` throws `MISMATCH`," no `…`.
- Manager `remove` rows: `guides/reason.md:463,478,492,507,522,537,550,574` each read as one parse naming their own noun (groups/factors/rules/equations/facts/inferences/variables/non-id fields).
- `Shape` idiom: the convention sentence at `guides/reason.md:305` is Ruling 15's wording verbatim; every interface row's cell holds bare names with `?` and `plus`, confirmed across the diff's `### Types` hunk.
- Brand sentence: `guides/reason.md:91` closes the `### Classes` intro naming `DEFINITION_BUILDER_BRAND`, `SUBJECT_BUILDER_BRAND`, `isDefinitionBuilder`, and `isSubjectBuilder`.

## Findings outside the claims

None that change a ruling. The inherited wording changes noted under claim 1 (`validators.ts` "neither entity can ever match the other's," the `three`/`two` phrases at `:393`, `:1798`, `:2289`, `:945`) are undisclosed by exact site in the report's Items section, but the claim's own scope test — file-level scope honesty against the status file, with predecessor hunks in bounds — covers them; no off-limits file or unrelated behavior moved.

VERDICT: PASS
