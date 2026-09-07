Lane held: checker template

**Claim 1 — Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file).**
PASS. `.orkestrel/campaign/docs-parity/d7n-template-converge-fix.status.txt` lists exactly seven modified files (`guides/template.md`, `src/core/constants.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/templates/Template.ts`, `src/core/templates/TemplateManager.ts`, `tests/guides.test.ts`), matching `d7n-template-converge-fix.diff.txt` file-for-file. All seven sit inside the brief's owned scope (`guides/template.md`, doc blocks under `src/core/**`, `tests/guides.test.ts`); none of the off-limits files (`README.md`, vendored files, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`) appear. Direct reads of `/home/user/fleet/template/src/core/constants.ts`, `helpers.ts`, `templates/Template.ts`, `templates/TemplateManager.ts`, and `factories.ts` show only doc-comment prose changed — no code token moved.

**Claim 2 — The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries.**
PASS. Every file:line and content citation in `d7n-template-converge-fix-report.md` was corroborated directly against `/home/user/fleet/template` (guide `### Types`/`### Constants` tables at `guides/template.md:34-66`, the all-caps sweep result, `TemplateManager.ts:128-130`, `types.ts:271`, `Template.ts:140`, `helpers.ts:55-64`, `factories.ts:1-40`, `tests/guides.test.ts:338-356`). No sentence in the report states a count of a growable set; the numbers present (`7m47s`, `581ms`, `594ms`, exit codes, the diffstat's git-generated `79 insertions(+), 48 deletions(-)`, `34 passed (34)`, `90 passed | 1 skipped (91)`) are durations, exit codes, or measurements quoted verbatim with the command that produced them. The report does not discuss the head-start pin from the brief's Role and engine section, so nothing in it risks restating the pin outside the file's own words.

**Claim 3 — Each named correction is present as the audit's finding asked (template).**
PASS.
- Convention sentence in Ruling 15's exact wording, between `### Types` and its table: confirmed at `/home/user/fleet/template/guides/template.md:34-38` — the sentence text matches `rulings.md:62` verbatim.
- `TemplateManagerEventMap` cell reads `{ register, remove, clear }` (Ruling 19): confirmed at `guides/template.md:42`, matching `rulings.md:82`.
- `### Constants` table heads `Shape` with the Ruling 18/12 constants sentence: confirmed at `guides/template.md:59-66`, sentence text matches `rulings.md:78`.
- All-caps gone from the blocks: confirmed by an independent `grep -nE '\b[A-Z]{3,}\b'` sweep of `/home/user/fleet/template/src/core` — every surviving hit is a real token (`MISSING`, `NOTFOUND`, `INVALID`, `CONFLICT`, `JSON`, `UUID`, `BCP-47`), none of `FIRST`, `RAW`, `ANY`, `WITHOUT`, `EVERY`, `AND` (decorative caps) remain.
- Titled fence extended to show `find` and `has` on both sides (Ruling 14) with the executed case extended: confirmed at `guides/template.md:73-84`, `src/core/factories.ts:20-38`, and `tests/guides.test.ts:338-356` — the fence and the `@example` block carry the same seeded-registry/`find`/`has` demonstration, and the test's assertions extend rather than replace the original `fill` assertion.

**Findings outside the claims:** none.

VERDICT: PASS
