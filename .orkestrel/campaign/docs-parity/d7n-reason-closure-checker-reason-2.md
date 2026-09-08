Lines 1–3 match byte for byte. This confirms Claim 4's basis independently (already covered by prior checker's PASS and unaffected by this diff, since `tests/guides.test.ts` was not touched per the status file).

All evidence checked directly against the tree. Final verdict below.

Lane held: checker reason

**Claim 1 — scope honesty: PASS.** `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-reason-close-2.status.txt:1` lists only ` M guides/reason.md`, matching the brief's Scope (`guides/reason.md`, `tests/guides.test.ts` owned; the unit needed to touch only the first). The diff (`d7n-reason-close-2.diff.txt`) touches only the `### Validators` table region (lines 224–273 of `guides/reason.md`), exactly item 1's target (Ruling 20's guard-table `Shape` column) — nothing else moved, including the untouched `### Constants` and `### Types` tables that already carry `Shape`.

**Claim 2 — report citations and no count in prose: PASS.** `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-reason-close-2-report.md`'s quoted diff (each `isX` → narrowed-type mapping, for example `isNumberRecord` → `` `Readonly<Record<string, number>>` ``, `isDefinitionBuilder` → `` `DefinitionBuilderInterface` ``) matches `d7n-reason-close-2.diff.txt` line for line. A grep of the report for count language (`twice`, `once`, `two`, `three`) returns no match; the report's tool-output quotes (`git status --short`, `oxfmt`, `oxlint`, `npm run docs`, `npm run test:guides`) are measurements reported with the runs that produced them, exempt from the ban.

**Claim 3 — the Ruling-named findings closed in the tree: PASS.** Verified directly against `/home/user/fleet/reason/guides/reason.md`:
- The `### Validators` table (lines 221–272) now heads `| API | Kind | Shape | Summary |` with the guard sentence "In a guard table a `Shape` cell holds the type the guard narrows to." (line 225) alone between the prose and the table — no doubled interface sentence, per Ruling 27's strike. Every row's `Shape` cell is populated (grep of the table shows no empty cell), and each holds the narrowed type read from `src/core/validators.ts`'s own `Guard<X>` / `value is X` annotations, matching Ruling 20.
- No table in the guide carries an empty `Shape` cell: `### Constants` (lines 281–305) and `### Types` (lines 307–406) are the only other tables carrying the column, and both are fully populated with declared/widened types (`boolean`, `number`, `unique symbol`) and literals folded into the description ("Default: `true`."), per Rulings 18 and 21. Tables of pure function or class rows with no data-member, guard, constant, or shape-value population (`### Entity factories`, `### Orchestrator & reasoners`, `### Operators`, `### Classes`, `### Value factories`, `### Helpers`, `### Errors`) carry no `Shape` column, consistent with Ruling 20's mixed-table carve-out — no ruling in the read set mandates the column on an all-function or all-class table that isn't a dedicated guard table.
- No `### Shapers`/`### Shapes` table exists in this guide (Ruling 25 is inert here).
- The fence sweep from the brief (`awk` over headings/blanks/fences) already read clean in the prior report and the fence set is unchanged by this diff; independently, every fence heading in the table of contents (`### Quantitative scoring` through `### Practices`) is followed by prose before its fence per direct inspection of lines 600–1123.
- `README.md`'s `## Install` (line 15) and `## Usage` (line 26) fences sit directly under their headings (verified by direct read), per Ruling 24.
- `tests/guides.test.ts` lines 1–3 are byte-identical between `/home/user/fleet/reason/tests/guides.test.ts` and `/home/user/fleet/abort/tests/guides.test.ts` (verified by direct read of both), and the file is otherwise untouched by this unit's diff (status shows only `guides/reason.md` modified), so the manifest-loop region's equality stands unchanged from the prior checker's Claim 4 PASS.

**Findings outside the claims:** none.

VERDICT: PASS
