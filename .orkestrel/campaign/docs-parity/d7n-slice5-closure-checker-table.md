Lane held: checker table

**Claim 1** — Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file). **PASS**
Evidence: `.status.txt` lists exactly `M guides/table.md`, `M src/core/types.ts`, `M tests/guides.test.ts` — the three files the brief's Scope section owns (`guides/table.md`, doc blocks under `src/core/**`, `tests/guides.test.ts`), nothing off-limits (`README.md`, `package.json`, `tests/src/**`, `tests/setup*.ts`) appears touched. The diff's three file sections match the status exactly. Item 1's hoist (`documented`/`examples` moved above `describe`, `d7n-table-converge-fix.diff.txt:284-294`) and Item 2's `Shape` columns (`d7n-table-converge-fix.diff.txt:23-150`) both land as the brief describes; the `/Interface$/u` → `/Interface$/` change is part of matching the pilot byte-for-byte per item 1, not an unscoped edit.

**Claim 2** — The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries. **FAIL**
Evidence: `d7n-table-converge-fix-report.md:96` prints `… 609 lines` inside the `diff` code fence — a truncation the report writer authored, not verbatim shell output (a real `diff` invocation never emits an elided line-count summary). `d7n-table-converge-fix-report.md:120` similarly writes `111a159,182   (two package-owned cases added)`, where `(two package-owned cases added)` is the writer's own annotation stating a count (`two`), not the tool's raw output. Both are counts stated in prose the report authored, which `AGENTS.md` § Writing bars ("NEVER state a count") and which this claim's own text ("the report states no count in prose") directly asks the checker to rule on. The pin quotation itself (`"The constants below are this"`, `d7n-table-converge-fix-report.md:128`) does match the pilot file's actual text (`/home/user/fleet/abort/tests/guides.test.ts:2`) word for word, so that half of the claim holds, but the count violations fail the claim as a whole.

**Claim 3** (table's portion only) — Each named correction is present as the audit's finding asked. **PASS**
Evidence:
- Drop-in matches the pilot from `describe(` on, with `documented`/`examples` at loop scope: `d7n-table-converge-fix.diff.txt:284-294` hoists both bindings above the `describe` call, matching the pilot's `:209-218` shape.
- Amended header: `d7n-table-converge-fix.diff.txt:249-251` reads "The constants that follow are this package's own", matching Ruling 13's amendment (not the pilot's stale "below").
- `INTERNAL` sentence: `d7n-table-converge-fix.diff.txt:264-267` reads "the assertion that follows it fails when a name here stops being stranded", matching Ruling 13.
- `Shape` column under Ruling 15's exact convention sentence on every table carrying an interface or type row: `d7n-table-converge-fix.diff.txt:23, 56, 98` each insert "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." verbatim, over "The document itself", "The lens", and "The table" sections.
- Constants table heads `Shape` with literals named in descriptions (Ruling 18): `d7n-table-converge-fix.diff.txt:140-150` adds the `Shape` column with declared types (`number`, `readonly ColumnCell[]`), and the literal values (`256`, `1024`, etc.) remain in the description column, satisfying Ruling 18's "no `Value` column, literal in the description" requirement.

**Findings outside the claims**: none identified beyond the count violations already ruled under claim 2.

VERDICT: FAIL 2
