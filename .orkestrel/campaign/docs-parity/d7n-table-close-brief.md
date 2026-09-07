# Brief — `d7n-table-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/table` from the committed tip `a7612eb` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363f4b9…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-table-close/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   (none)
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   78:| `ColumnChoice` | interface | `{ value, label, help? }`                                  | Represents one value a `choice` column offers
   79:| `ColumnBase`   | interface | `{ key, label?, help?, hidden?, meta? }`                   | Describes what every column carries, whatever
   80:| `TextColumn`   | interface | `{ cell, key, label?, help?, hidden?, meta? }`             | Represents a column of text, compared lexical
   81:| `NumberColumn` | interface | `{ cell, key, label?, help?, hidden?, meta? }`             | Represents a column of numbers, compared by m
   82:| `FlagColumn`   | interface | `{ cell, key, label?, help?, hidden?, meta? }`             | Represents a column of yes-or-no answers, com
   83:| `ChoiceColumn` | interface | `{ cell, choices, key, label?, help?, hidden?, meta? }`    | Represents a column drawn from a declared lis
   85:| `TableSchema`  | interface | `{ name?, label?, help?, key, columns }`                   | Holds everything a table declares about itsel
   95:| `TableTerm`      | interface | `{ column }`                                                              | Represents one entry of a le
   97:| `TableOrder`     | interface | `{ column, direction }`                                                   | Represents one column's plac
   99:| `ContainsFilter` | interface | `{ column, operator, text }`                                              | Keeps the rows whose cell ho
   100:| `BetweenFilter`  | interface | `{ column, operator, minimum, maximum }`                                  | Keeps the rows whose cell f
   101:| `EqualsFilter`   | interface | `{ column, operator, value }`                                             | Keeps the rows whose cell h
   117:| `TableOptions`               | interface | `{ on?, error?, rows?, comparators?, matchers?, limit? }`                                  
   Interface rows spelling a member's type:
   (none)
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   165: GUARD TABLE WITHOUT Shape under 'Guards' (Ruling 20: heads Shape with the narrowed type, under the guard sentence)
   Extended interfaces (Ruling 21: the cell names the parent before `plus` and the added members after; the table's sentence gains "An extended interface's name comes before `plus`, with the members it adds after."):
   src/core/types.ts:106:export interface TextColumn extends ColumnBase {
   src/core/types.ts:111:export interface NumberColumn extends ColumnBase {
   src/core/types.ts:116:export interface FlagColumn extends ColumnBase {
   src/core/types.ts:127:export interface ChoiceColumn extends ColumnBase {
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/table.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
1c1
< const root = new URL('../', import.meta.url)
---
> const root = resolveRoot(import.meta)
15,18c15
< 
< it('manifest lists at least one guide', () => {
< 	expect(manifest.length).toBeGreaterThan(0)
< })
---
> const readme = createGuide(requireValue(files['README.md'], 'Missing file: README.md'))
56c53
< 	const pitch = createGuide(requireValue(files['README.md'], 'Missing file: README.md')).tagline()
---
> 	const pitch = readme.tagline()
63a61,84
> })
> 
> it('imports only real exports in every root README ```ts fence', () => {
> 	const fences = readme.fences().filter((fence) => fence.language === EXAMPLE_LANGUAGE)
> 	for (const fence of fences) {
> 		for (const { specifier, names } of extractFenceImports(fence.code)) {
> 			const imported = sources.source(specifier)
> 			if (imported === undefined) continue
> 			const surface = imported.surface().map((symbol) => symbol.name)
> 			expect(findMissing(names, surface)).toEqual([])
> 		}
> 	}
> })
> 
> it('parses manifest rows that point at real files', () => {
> 	expect(manifest.length).toBeGreaterThan(0)
> 	for (const entry of manifest) {
> 		expect(files[entry.spec]).toBeDefined()
> 		const modules = typeof entry.source === 'string' ? [entry.source] : entry.source
> 		for (const module of modules) {
> 			expect(Object.keys(files).some((path) => path.startsWith(`${module}/`))).toBe(true)
> 		}
> 		expect(Object.keys(files).some((path) => path.startsWith(`${entry.tests}/`))).toBe(true)
> 	}
```
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): 3c3;< // package's own, as is the executed section that closes the file.;---;> // package's own, and are the only part a sibling package changes.. The `INTERNAL` block carries the pilot's sentence (1 = yes): 1
   Lines naming a budget or the `findDrift` call: 254:			for (const drift of findDrift(guide, source)) {
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
   276: ### text -> fence at 278
   289: ### number -> fence at 291
   300: ### flag -> fence at 302
   312: ### choice -> fence at 314
5. **Propagation.** `npx oxfmt --write guides/table.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   72: | API | Kind | Shape | Summary |
   93: | API | Kind | Shape | Summary |
   112: | API | Kind | Shape | Summary |
   150: | API | Kind | Shape | Summary |
   165: | API | Kind | Summary |
   205: | API | Kind | Summary |
   229: | API | Kind | Summary |
   249: | API | Kind | Summary |
   1144: | Constant | Value | Unit | Bounds |
   1243: | Method | Returns | Summary |
   1250: | Method | Returns | Summary |
   1261: | Method | Returns | Summary |
   1270: | Method | Returns | Summary |
   1279: | Method | Returns | Summary |
   1287: | Method | Returns | Summary |
   1295: | Method | Returns | Summary |

## Scope

Owned: `guides/table.md`, `tests/guides.test.ts`, the doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read (no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/table.md` and `grep -n '…' guides/table.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/table.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-table-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
