Lane held: checker test

**Claim 1 — every item the fix brief names landed as the brief states it, and nothing else changed.**

PASS.

- Item 1 (convention sentence above every table, worded per table): confirmed at `/home/user/fleet/test/guides/test.md:106-109` (core Types, above table at `:111`), `:133-135` (residual paragraph left under core Types table, matching the pilot shape at `/home/user/fleet/abort/guides/abort.md:60` above / `:67` below), `:232-233` (browser Types, above table at `:235`), `:597-599` (server Types, above table at `:601`, with the extension clause added for `UpgradeOptions`).
- Item 2 (Constants header renamed to `Shape` with convention sentence): confirmed at `:139-141` (core) and `:249-251` (browser); `Signature` survives only in Validators/Helpers/Factories tables as the report states.
- Item 3 (§ Tests names the titled fence): confirmed at `:2931-2937`: `the titled `Own a temporary directory` fence against the `@example` block of that title`.
- Scope honesty: `d7n-test-converge-fix.status.txt` reads ` M guides/test.md` only — no other file touched, matching the report's own claim.

**Claim 2 — the comparator's reading (234 rows before/after, no row missing/added, every changed cell under the renamed `Signature` header) is consistent with the diff.**

PASS.

- The report's JSON lists 11 changed cells, all `col: "Signature"`, `is: "(column absent)"`: 2 rows from core Constants (`STATECHART_ATTRIBUTES`, `STATECHART_STATUSES`, confirmed as the table's complete row set at `guides/test.md:143-144`) plus 9 rows from browser Constants (`ACCESSIBLE_ROLES` through `IMPLICIT_ROLES`, confirmed as the table's complete row set at `:253-261`). 2 + 9 = 11, matching the JSON array exactly, and no other table's rows appear (server Constants already carried `Shape` before the change, per item 2, so it is absent from the list, correctly).
- `rowsBefore`/`rowsAfter` both 234 with empty `missing`/`added` arrays.

**Claim 3 — the report's citations match the tree the unit left and it states no count in prose.**

FAIL on the second half; citations are accurate.

- Citations checked against the tree all resolve: `:106-109`/`:111`, `:133-135`, `:139-141`, `:232-233`/`:235`, `:249-251`, `:597-599`/`:601`, `:614`/`:616`, `:2930-2933`, and the pilot citation `/home/user/fleet/abort/guides/abort.md:60`/`:67` — all confirmed against the actual files.
- The report states counts in prose, contrary to its own closing line ("No count in prose") and the brief's Output requirement:
  - `d7n-test-converge-fix-report.md:12`: "gained **the two idioms** that table uses"
  - `d7n-test-converge-fix-report.md:232`: "**The two edit instruments** and the corroboration instrument live in the session scratchpad"
  - `d7n-test-converge-fix-report.md:241`: "**the three Types sentences** therefore differ by design rather than by drift"
  
  Each numbers a set that can grow (idioms a table uses, edit instruments in the scratchpad, Types convention sentences across the guide's tables), which `AGENTS.md` § Writing bars: "Name the members, or write the sentence without the number."

**Findings outside the claims**

None additional; the count violations above are already scoped to claim 3.

VERDICT: FAIL 3
