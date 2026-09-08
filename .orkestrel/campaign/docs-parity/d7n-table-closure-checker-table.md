Lane held: checker table

## Claim 1 — Every item landed as stated; scope honesty

PASS. `d7n-table-close.status.txt` lists only `guides/table.md` and `tests/guides.test.ts` modified, matching the brief's Scope row (no `src/**` touched, since item 2's "Sites: none" held). `d7n-table-close.diff.txt` matches item 1 (convention-sentence addition, `plus`-form rewrite of `TextColumn`/`NumberColumn`/`FlagColumn`/`ChoiceColumn`, guard-table `Shape` column), item 3 (header line, import line, `root` line), and item 4 (four fence lead-ins) exactly as the brief's own generated facts specified. No unlisted file or hunk appears.

## Claim 2 — Citations match the tree; no count in prose

PASS. Independently re-ran the two grep checks the report cites for acceptance criterion 2: `grep -n '| interface *| `{[^`]*:' guides/table.md` and `grep -n '…' guides/table.md` both return no matches, confirming the report's stated readings. The report's prose carries no count of a growable set — the numerals present are durations, wall-clock times, and exit codes, all permitted forms; "line 117 in the brief's list" is a locator, not a count.

## Claim 3 — The `Shape` idiom

PASS for the rows this unit edited. `/home/user/fleet/table/src/core/types.ts:106,111,116,127` confirm `TextColumn`, `NumberColumn`, `FlagColumn` each add only `cell` over `ColumnBase`, and `ChoiceColumn` adds `cell, choices` — matching the guide's `ColumnBase plus { cell }` / `ColumnBase plus { cell, choices }` cells exactly (`/home/user/fleet/table/guides/table.md:80-83`). The guard table now heads `Shape` with the guard sentence (`table.md:165-175`), each cell holding the narrowed type. The constants table's sentence and cells are unchanged and already conform (Ruling 18). No `## Surface` table has a `Shapers`/shape-value population, so Ruling 25 does not apply to this package — no violation to find there.

## Claim 4 — The drop-in's canon

FAIL. Directly comparing `/home/user/fleet/table/tests/guides.test.ts` against the pilot `/home/user/fleet/abort/tests/guides.test.ts` in the named region (`const root = ` through the manifest loop's closing brace) shows more than "an appended package-specific case":

- Pilot (`abort/tests/guides.test.ts:62-64`) carries a standalone `it('manifest lists at least one guide', …)` case immediately after `own`. Table has no such case at that position.
- Table instead folds `expect(manifest.length).toBeGreaterThan(0)` into a case absent from the pilot, `it('parses manifest rows that point at real files', …)` (`table/tests/guides.test.ts:171-181`).
- Table adds `it('imports only real exports in every root README \`\`\`ts fence', …)` (`table/tests/guides.test.ts:159-169`), which the pilot does not carry at all.
- Table introduces a `const readme = createGuide(…)` binding (`table/tests/guides.test.ts:111`) and its `opens the README with the guide tagline` case reads `readme.tagline()` (`table/tests/guides.test.ts:149`); the pilot's equivalent case computes the same value inline with no such binding (`abort/tests/guides.test.ts:101-105`).

These are structural differences in the shared region, not one appended package-specific case. The report's own text concedes the comparison is against "the pilot's current (**unconverged**) file" and asserts the differences "already matched the target shape a prior refine pass on this tip had landed" — that assertion is the writer's own unverified claim about a shape not present in the actual pilot file I read, so it is UNRESOLVED, not CONFIRMED. This divergence predates this unit's own diff (which correctly limited itself to the header line, the import line, and the `root` line), so it is not a defect introduced by `d7n-table-close`, but claim 4 asks about the region's current state, which does not hold.

## Claim 5 — Lead-ins, sibling-fence headings, retired terms, README fences

FAIL on the README sub-clause. Confirmed by full-file read of `guides/table.md`:
- Lead-ins for `### text`, `### number`, `### flag`, `### choice` are present exactly as the diff states (`table.md:280,295,308,322`).
- `grep -n '| interface *| `{[^`]*:'` and `grep -n '…'` both return no matches (see claim 2), so no `Shape` cell holds a member's type or an ellipsis.
- `grep -i 'entit'` over `guides/table.md` returns no match, so no heading carries the retired term `entities`.
- The only heading created under Ruling 9's "titled heading" rule in this guide is `### Open a table`, and it has no sibling fence, so Ruling 22's sibling-fence-gets-its-own-heading clause has no case to apply to here.
- README fences: `/home/user/fleet/table/README.md:13-17` (`## Install`) sits directly under its heading, matching the pilot. But `/home/user/fleet/table/README.md:24-28` (`## Usage`) does **not** — a lead-in sentence ("Declare the columns, hold the rows, and read the ones to draw:") sits between the heading and the fence, whereas the pilot's `## Usage` fence sits directly under its heading with no intervening sentence (`/home/user/fleet/abort/README.md:23-25`). This is the exact pattern Ruling 24 names as wrong ("Relation's fix round added two README lead-ins on such a criterion; the Orchestrator removed them before landing"). This predates the closing diff (README.md is untouched by it) and Ruling 24 also states the closing brief's own sweep runs over `guides/<pkg>.md` alone, so this is not a defect this unit was scoped to fix — but the claim asks about current tree state, which fails.

## Findings outside the claims

- Claim 4's and claim 5's README failures are pre-existing tree state, not introduced by `d7n-table-close`'s own diff; a successor unit (either table's own or a cross-package reconciliation with the pilot) must close them, and reconciling table's test-file shape against the pilot's actual bytes needs the Orchestrator's decision about which side is authoritative, since Ruling 20 requires the pilot to converge first.

VERDICT: FAIL <4, 5>
