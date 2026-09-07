# Brief — `d7n-process-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/process` from the committed tip `20b5f3f` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `9fd4adc5a1b3…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-process-close/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   (none)
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   188:| `ProcessCommand`          | interface | `{ file, arguments, environment?, input?, isolated? }`                                        
   189:| `ProcessExit`             | interface | `{ code, signal, drained }`                                                                   
   190:| `SpawnInput`              | interface | `{ file, arguments, verbatim }`                                                               
   191:| `ExecutableOptions`       | interface | `{ workspace?, environment? }`                                                                
   193:| `ProcessOptions`          | interface | `{ on?, error?, command, workspace, grace?, drain?, evidence?, backlog?, delivery?, writable?,
   196:| `SessionOptions`          | interface | `{ on?, error?, command, workspace, grace?, drain?, evidence?, delivery?, signal? }`          
   198:| `ExecuteResult`           | interface | `{ command, stdout, stderr, code, signal, failed, expired, aborted, truncated }`              
   199:| `ExecuteInput`            | interface | `{ command, stdout, stderr, code, signal, expired, aborted, truncated, limit, cause? }`       
   200:| `ExecuteOptions`          | interface | `{ workspace?, environment?, input?, timeout?, grace?, signal?, strict?, limit? }`            
   201:| `ExecuteSyncOptions`      | interface | `{ workspace?, environment?, input?, timeout?, strict?, limit? }`                             
   202:| `DetachOptions`           | interface | `{ workspace? }`                                                                              
   204:| `ProcessManagerOptions`   | interface | `{ on?, error? }`                                                                             
   207:| `ProcessErrorContext`     | interface | `{ id?, command?, code?, signal?, value? }`                                                   
   208:| `ProcessErrorOptions`     | interface | `{ code, context?, cause?, result? }`                                                         
   223:| `SupervisorFace`        | interface | `{ chunk, fault, relieve?, close, terminal, teardown }` | Represents the composing face's callba
   Interface rows spelling a member's type:
   (none)
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   90: GUARD TABLE WITHOUT Shape under 'Guards' (Ruling 20: heads Shape with the narrowed type, under the guard sentence)
   168: CONSTANTS TABLE WITHOUT Shape under 'Constants' (Ruling 18: heads Shape with the declared type, under the constants sentence)
   Extended interfaces (Ruling 21: the cell names the parent before `plus` and the added members after; the table's sentence gains "An extended interface's name comes before `plus`, with the members it adds after."):
   (none)
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/process.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
10c10
< const sources = createSourceManager({ files, modules: MODULES })
---
> const sourceManager = createSourceManager({ files, modules: MODULES })
15a16,27
> // The published faces in one table. `SOURCES`, the refusal rows, and the live population rows
> // all read it, so a face's scope and its export key have one place to be stated.
> const FACES = Object.freeze(
> 	Object.entries(MODULES).map(([specifier, module]) => ({ specifier, module })),
> )
> const SOURCES = new Map(
> 	FACES.map((face): [string, ReturnType<typeof createSource>] => [
> 		face.specifier,
> 		requireValue(sourceManager.source(face.specifier), `Unmapped specifier: ${face.specifier}`),
> 	]),
> )
> 
65a78,182
> describe('public package faces', () => {
> 	// Each literal refusal list is independent of the live Source that the assertion reads. A
> 	// widened `module` can therefore leak a neighbouring face without changing its expectation.
> 	for (const face of FACES) {
> 		const refusal = requireValue(
> 			REFUSALS[face.specifier],
> 			`Missing refusal list: ${face.specifier}`,
> 		)
> 		const { foreign, shared } = refusal
> 		const neighbour = requireValue(
> 			FACES.find((candidate) => candidate.specifier !== face.specifier),
> 			`Missing neighbouring face: ${face.specifier}`,
> 		)
> 		const neighbouring = requireValue(
> 			SOURCES.get(neighbour.specifier),
> 			`Unmapped neighbouring specifier: ${neighbour.specifier}`,
> 		)
> 		const neighbouringNames = neighbouring.surface().map((symbol) => symbol.name)
> 
> 		it(`keeps the refusal list aligned with the neighbouring face for ${face.specifier}`, () => {
> 			expect([...foreign].sort()).toEqual(
> 				neighbouringNames.filter((name) => !shared.includes(name)).sort(),
> 			)
> 		})
> 
> 		it(`publishes none of a neighbouring face's names on ${face.specifier}`, () => {
> 			const source = requireValue(SOURCES.get(face.specifier), 'Unmapped specifier')
> 			const published = source.surface().map((symbol) => symbol.name)
> 			expect(foreign.length).toBeGreaterThan(0)
> 			expect(foreign.filter((name) => published.includes(name))).toEqual([])
> 			expect(
> 				shared.filter((name) => !published.includes(name) || !neighbouringNames.includes(name)),
> 			).toEqual([])
> 		})
> 	}
> 
> 	it('derives the exact package export keys from the same face map', () => {
> 		const parsed: unknown = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'))
> 		if (typeof parsed !== 'object' || parsed === null) {
> 			throw new Error('The package manifest is not a record')
> 		}
> 		const exports: unknown = Object.getOwnPropertyDescriptor(parsed, 'exports')?.value
> 		if (typeof exports !== 'object' || exports === null) {
> 			throw new Error('The package manifest declares no object exports')
> 		}
> 		const expected = FACES.map((face) =>
> 			face.specifier === ROOT ? '.' : `.${face.specifier.slice(ROOT.length)}`,
> 		)
> 		expect(Object.keys(exports).sort()).toEqual(expected.concat('./package.json').sort())
> 	})
> })
> 
> // Faces declaring the same class, where only the core barrel re-exports it: the server face
> // strands `Process`, and reading them as one scope hides that. The fixture rows are the
> // instrument's negative control; the live rows cannot play that part, because a union of
> // internally complete barrels is itself internally complete.
> const FIXTURE_FILES: Readonly<Record<string, string>> = Object.freeze({
> 	'core/index.ts': "export * from './Process.js'\n",
> 	'core/Process.ts': 'export class Process {}\n',
> 	'server/index.ts': "export * from './ProcessManager.js'\n",
> 	'server/ProcessManager.ts': 'export class ProcessManager {}\n',
> 	'server/Process.ts': 'export class Process {}\n',
```
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): 1,3c1,3;< // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against;< // this repo's own `guides/README.md` manifest. The constants that follow are this;< // package's own, as is the executed section that closes the file.;---;> // The guides-parity gate: @orkestrel/guide's checks run against this repository's own;> // `guides/README.md` manifest, and every flagship fence in `guides/process.md` is transcribed;> // here and asserted against what its comments claim. Name resolution is not a behavioural. The `INTERNAL` block carries the pilot's sentence (1 = yes): 0
   Lines naming a budget or the `findDrift` call: 476:			for (const drift of findDrift(guide, source)) {
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
   1244: ### Collect output in one call -> fence at 1246
   1253: ### Stream a long-running child and cancel it -> fence at 1255
   1275: ### Close a byte session cooperatively -> fence at 1277
   1301: ### Supervise a fleet by id -> fence at 1303
5. **Propagation.** `npx oxfmt --write guides/process.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   55: | API | Kind | Summary |
   65: | API | Kind | Summary |
   78: | API | Kind | Summary |
   90: | API | Kind | Summary |
   98: | API | Kind | Summary |
   110: | API | Kind | Summary |
   129: | API | Kind | Summary |
   141: | API | Kind | Summary |
   155: | API | Kind | Summary |
   168: | API | Kind | Value | Summary |
   186: | API | Kind | Shape | Summary |
   220: | API | Kind | Shape | Summary |
   257: | Method | Returns | Summary |
   271: | Method | Returns | Summary |
   284: | Method | Returns | Summary |
   299: | Method | Returns | Summary |
   312: | Method | Returns | Summary |
   1432: | Name | Ruling |

## Scope

Owned: `guides/process.md`, `tests/guides.test.ts`, the doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read (no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/process.md` and `grep -n '…' guides/process.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/process.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-process-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
