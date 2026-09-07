# Brief — `d7n-database-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/database` from the committed tip `5ee7268` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363f4b9…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-database-close/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   (none)
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   256:| `Condition`                | interface | `{ column, operator, values, connector }`                                                    
   258:| `Order`                    | interface | `{ column, direction }`                                                                      
   259:| `QueryInput`               | interface | `{ conditions?, order?, limit?, offset? }`                                                   
   261:| `OperationOptions`         | interface | `{ signal? }`                                                                                
   265:| `ConformanceFinding`       | interface | `{ check, message, context }`                                                                
   274:| `ColumnSchema`             | interface | `{ name, storage, optional, nullable }`                                                      
   275:| `TableSchema`              | interface | `{ name, primary, columns, indexes }`                                                        
   277:| `Migration`                | interface | `{ from, to, steps }`                                                                        
   278:| `MigrationInput`           | interface | `{ plan, metadata? }`                                                                        
   280:| `DriverMetadata`           | interface | `{ version, schema }`                                                                        
   282:| `DatabaseOptions`          | interface | `{ on?, error?, driver, tables, primary?, indexes?, name?, generator?, version? }`           
   284:| `SQLiteDriverOptions`      | interface | `{ path?, readonly?, timeout?, references?, pragmas? }`                                      
   285:| `QueryPlan`                | interface | `{ index?, range? }`                                                                         
   286:| `TableDefinition`          | interface | `{ primary, columns, schema }`                                                               
   Interface rows spelling a member's type:
   (none)
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   (none)
   Extended interfaces (Ruling 21: the cell names the parent before `plus` and the added members after; the table's sentence gains "An extended interface's name comes before `plus`, with the members it adds after."):
   src/core/types.ts:461:export interface DriverInterface extends StorageInterface {
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/database.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
1a2
> const ROOT = fileURLToPath(root)
15a17,32
> const entryDirectories = Array.from(
> 	new Set(manifest.flatMap((entry) => normalizeDirectories(entry.source))),
> ).sort()
> const entryPaths = entryDirectories.map((directory) => `${directory}/index.ts`)
> const entrySurfaces = deriveEntrySurfaces(join(ROOT, 'tsconfig.json'), entryPaths)
> 
> function surfaceForDirectory(directory: string): readonly SurfaceSymbol[] | undefined {
> 	return entrySurfaces.get(`${directory}/index.ts`)
> }
> 
> function requireDirectorySurface(directory: string): readonly SurfaceSymbol[] {
> 	const surface = surfaceForDirectory(directory)
> 	if (surface === undefined) throw new Error(`Missing compiler surface for '${directory}'`)
> 	return surface
> }
> 
65a83,540
> // Every case below writes a real TypeScript project to disk and runs the compiler
> // over it, so the block's cost is seconds rather than milliseconds and the default
> // per-test budget cannot hold it under a full-suite run. The timeout states that
> // cost once for the block rather than inflating a unit test's.
> describe('compiler entry surfaces', () => {
> 	it('resolves every supported keyword through nested barrels in stable order', () => {
> 		const project = tempTypeScriptProject({
> 			'src/definitions.ts': [
> 				'export type Value = string',
> 				'export interface Shape { readonly value: string }',
> 				'export class Alpha {}',
> 				'export function Callable(): void {}',
> 				'export const Beta = 1',
> 				'export interface Merged { readonly value: string }',
> 				'export class Merged {}',
> 			].join('\n'),
> 			'src/middle.ts': "export * from './definitions.js'",
> 			'src/index.ts': "export * from './middle.js'",
> 			'dist/index.ts': 'export class DistributionOnly {}',
> 		})
> 		try {
> 			const surfaces = deriveEntrySurfaces(project.config, ['src/index.ts'])
> 			expect(surfaces.get('src/index.ts')).toEqual([
> 				{ name: 'Alpha', keyword: 'class' },
> 				{ name: 'Beta', keyword: 'const' },
> 				{ name: 'Callable', keyword: 'function' },
> 				{ name: 'Merged', keyword: 'class' },
> 				{ name: 'Merged', keyword: 'interface' },
> 				{ name: 'Shape', keyword: 'interface' },
> 				{ name: 'Value', keyword: 'type' },
> 			])
> 		} finally {
> 			project.scratch.destroy()
> 		}
> 	})
> 
> 	it('tracks add, remove, rename, and keyword changes at the entry', () => {
> 		const project = tempTypeScriptProject({
> 			'src/index.ts': "export * from './extra.js'",
> 			'src/extra.ts': 'export const Added = 1',
> 		})
> 		try {
> 			expect(deriveEntrySurfaces(project.config, ['src/index.ts']).get('src/index.ts')).toEqual([
> 				{ name: 'Added', keyword: 'const' },
> 			])
> 			project.scratch.write('src/extra.ts', 'export class Renamed {}')
> 			expect(deriveEntrySurfaces(project.config, ['src/index.ts']).get('src/index.ts')).toEqual([
> 				{ name: 'Renamed', keyword: 'class' },
> 			])
> 			project.scratch.write('src/extra.ts', 'export function Renamed(): void {}')
> 			expect(deriveEntrySurfaces(project.config, ['src/index.ts']).get('src/index.ts')).toEqual([
> 				{ name: 'Renamed', keyword: 'function' },
> 			])
> 			project.scratch.write('src/index.ts', 'export const Local = true')
> 			project.scratch.remove('src/extra.ts')
> 			expect(deriveEntrySurfaces(project.config, ['src/index.ts']).get('src/index.ts')).toEqual([
> 				{ name: 'Local', keyword: 'const' },
> 			])
> 		} finally {
> 			project.scratch.destroy()
```
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): 2,3c2,3;< // this repo's own `guides/README.md` manifest. The constants that follow are this;< // package's own, as is the executed section that closes the file.;---;> // this repo's own `guides/README.md` manifest — one row (Database) spanning the;> // core/browser/server faces as a multi-dir `GuideModule` (`.claude/rules/documentation.md`. The `INTERNAL` block carries the pilot's sentence (1 = yes): 1
   Lines naming a budget or the `findDrift` call: 721:			for (const drift of findDrift(guide, source)) {
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
   37: ### Create a database -> fence at 39
   896: ### Declaring tables in options -> fence at 898
   965: ### Keyed CRUD -> fence at 967
   1155: ### Coercion through the contract -> fence at 1157
   1182: ### Fluent queries -> fence at 1184
   1422: ### Transactions -> fence at 1424
   1944: ### Introspection & seeding -> fence at 1946
   2077: ### Persistence with the JSON driver -> fence at 2079
   2248: ### Persistence with the SQLite driver -> fence at 2250
   2312: ### Persistence with the IndexedDB driver -> fence at 2314
5. **All-caps emphasis in `@remarks` bodies and comments (the fix report's carried finding 1).** Lower the emphasis at every site `d7n-database-converge-fix-report.md` § Carried findings lists — `src/browser/drivers/IndexedDBDriver.ts:84, 89, 93, 99, 131, 132, 413, 417, 463, 665, 708, 713`; `src/browser/helpers.ts:11, 26, 33, 87, 101, 105, 107, 109, 129, 153, 172, 260, 264, 267`; `src/core/Table.ts:49, 52, 66, 206, 324, 395, 438, 466, 478`; `src/core/constants.ts:20`; `src/core/drivers/MemoryDriver.ts:34, 122`; `src/core/helpers.ts:133, 220, 224, 225, 233, 235, 236, 242, 264, 352, 777, 1117, 1118, 1124, 1138, 1139, 1143, 1198, 1838`; `src/core/types.ts:84, 208, 210, 212, 249, 442, 599, 804, 821, 982`; `src/server/compilers.ts:108, 121, 123, 128, 129, 133, 134, 160, 161, 168, 214, 252, 315, 428`; `src/server/drivers/JSONDriver.ts:588, 780`; `src/server/drivers/SQLiteDriver.ts:246, 249, 314` — to the word each sentence carries, keeping the contrast (the retained `instruments/d7/units/database/d7n-database-converge-fix/lower-emphasis.sed` shows the fix round's replacements); SQL keywords, error codes, `BINARY`, `WAL`, acronyms, and any other data token stay. No code token moves. Close with `grep -nE '\b[A-Z]{3,}\b' src/**/*.ts` (globstar) ruled hit by hit; state the pattern, the paths, and the permitted hits in the report.
6. **`above` as a pointer (the fix report's carried finding 2).** `guides/database.md:298` "stay in the Surface rows above" reads `preceding` (`.claude/rules/writing.md` § Code tokens, references, and links).
7. **Propagation.** `npx oxfmt --write guides/database.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   74: | API | Kind | Summary |
   95: | API | Kind | Summary |
   113: | API | Kind | Summary |
   143: | API | Kind | Summary |
   156: | API | Kind | Summary |
   187: | API | Kind | Summary |
   197: | API | Kind | Summary |
   206: | API | Kind | Summary |
   216: | API | Kind | Summary |
   237: | Constant | Kind | Shape | Summary |
   249: | Type | Kind | Shape | Summary |
   315: | Method | Returns | Summary |
   345: | Method | Returns | Summary |
   370: | Method | Returns | Summary |
   385: | Method | Returns | Summary |
   394: | Method | Returns | Summary |
   412: | Method | Returns | Summary |
   438: | Method | Returns | Summary |
   453: | Method | Returns | Summary |

## Scope

Owned: `guides/database.md`, `tests/guides.test.ts`, the doc blocks and comments under `src/**` (items 1, 2, and 5; no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/database.md` and `grep -n '…' guides/database.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/database.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-database-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
