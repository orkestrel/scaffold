Lane held: checker indexeddb

## Claim 1 — Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file)

**PASS.** `d7n-indexeddb-converge-fix.status.txt` lists exactly four modified files (`guides/indexeddb.md`, `src/browser/IndexedDBTransaction.ts`, `src/browser/errors.ts`, `src/browser/factories.ts`), and `d7n-indexeddb-converge-fix.diff.txt` touches only those four files. Every hunk maps to a named brief item:
- I1 (`guides/indexeddb.md:87-110`, diff lines 30-95): `Shape` column added, member-list prose deleted, verified against `/home/user/fleet/indexeddb/src/browser/types.ts` — every `Shape` cell (`IndexDefinition` through `IndexedDBTransactionStoreInterface`) matches the interfaces' actual readonly members and call signatures.
- I2 (`src/browser/IndexedDBTransaction.ts:15`, `src/browser/errors.ts:16`): remark openers rewritten, no code token moved.
- I3 (`guides/indexeddb.md:8`): opening sentence recast, drops the repeated `await` proposition.
- I4 (`guides/indexeddb.md:258-274`, `src/browser/factories.ts:21-37`): factory fence and `@example` both grown identically with the `byAge` index demonstration.
- I5 (diff lines 191-212): three ` AND `/` NEW ` all-caps instances fixed (`close AND delete`, `the NEW position`, `a miss AND a non-record value`); `grep -n ' AND \| NEW ' guides/indexeddb.md` confirms none remain.
- Ruling 16 heading `### Stores, indexes, cursors, transactions` untouched, confirmed absent from the diff.

No off-limits file (`README.md`, `package.json`, `tests/src/**`, `tests/setup*.ts`) appears in the diff.

## Claim 2 — The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries

**FAIL.** The report states a count in prose at `d7n-indexeddb-converge-fix-report.md:197-198`: "The brief names `:327` and `:348`; the criterion's own pattern ` AND \| NEW ` also matched Contract item 7, so all three landed." This names how many pattern matches were fixed ("three") instead of naming the three occurrences (the diff shows exactly three: `close AND delete` → `closes and deletes`, `NEW position` → `its new position`, `a miss AND a non-record value` → `a miss and a non-record value`). `AGENTS.md` § Writing: "**NEVER state a count.** ... Name the members, or write the sentence without the number." This is not a diffstat or command output (which the "measurement reported with the run" exemption covers); it is an authored summary sentence with a count word. Every other citation checked (line numbers, quoted diffs, remark text) matches the tree at `/home/user/fleet/indexeddb` accurately. The "pin" claim is not applicable to this package's report (no mention of the pin/guard-and-continue idiom), so that clause is vacuously satisfied — the count violation alone fails this claim.

## Claim 3 — Each named correction is present as the audit's finding asked (indexeddb)

**PASS.**
- The `Shape` column under Ruling 15's convention sentence: present verbatim at `guides/indexeddb.md:87` ("A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`."), matching Ruling 15's quoted wording exactly; the member-list prose ("Its readonly data members are …", "The data-only shapes carry these members …") is gone — `grep -n 'readonly data members are\|data-only shapes carry' guides/indexeddb.md` returns nothing.
- The two remarks no longer restating their descriptions: `IndexedDBTransaction.ts:15` drops "and typed, scope-bound store access"; `errors.ts:16` opens with "The `code` is an {@link IndexedDBErrorCode} …" instead of repeating the description's opener. Verified against the live files.
- The opening prose: `guides/indexeddb.md:8` reads "Its job is to type IndexedDB's event-driven, callback-shaped, structurally-untyped surface." — the repeated `await` clause is gone.
- The grown factory example on both sides: `guides/indexeddb.md:258-274` and `src/browser/factories.ts:21-37` both carry the identical extended fence (schema with `byAge` index, `age: 36`, and the index-backed read). Its transcription case: `grep -n "supportsIndexedDB" tests/guides.test.ts` and a listing of every `it('carries the … transcription copies'` case in `tests/guides.test.ts` confirm no case asserts this specific fence (the "Surface fence" case asserts different lines from the `## Surface` section) — so there was nothing to extend, and the report correctly discloses this gap as a finding outside scope rather than silently omitting it.
- All-caps gone: confirmed by claim 1's grep.

## Findings outside the claims

- The report's "Findings outside this unit's scope" section (residual `BEFORE`/`SAME`/`WITHOUT`/`ABNORMAL`/`NOT` emphasis, and the unguarded `Feature-detecting` fence) is accurate and properly scoped as future work, not a defect in this unit.
- The report's cross-reference to "Contract item 7" inside the indexeddb report is confusing (mixing packages in one sentence) but does not itself change the scope-honesty verdict for indexeddb; it compounds the count violation in claim 2 rather than being a separate defect.

VERDICT: FAIL 2
