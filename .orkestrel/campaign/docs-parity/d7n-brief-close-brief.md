# Brief — `d7n-brief-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/brief` from the committed tip `db926ac` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38cfd9c…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-brief-close/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   (none)
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   104:| `Task`                   | interface | `{ operation, domain, statement }`                                                             
   105:| `Reference`              | interface | `{ path, note }`                                                                               
   106:| `Manifest`               | interface | `{ read, edit, locked, forbidden }`                                                            
   107:| `Outcome`                | interface | `{ rank, text, required }`                                                                     
   108:| `Given`                  | interface | `{ category, name, value }`                                                                    
   109:| `Example`                | interface | `{ input, output, note? }`                                                                     
   110:| `Citation`               | interface | `{ name, url, note }`                                                                          
   111:| `Gap`                    | interface | `{ field, question, blocking, candidates? }`                                                   
   112:| `Risk`                   | interface | `{ severity, text, mitigation }`                                                               
   113:| `Output`                 | interface | `{ format, sections?, include?, exclude? }`                                                    
   114:| `Proof`                  | interface | `{ text, command }`                                                                            
   115:| `Brief`                  | interface | `{ task, authority, manifest, outcomes, rules, invariants, givens, examples, assumptions, citat
   116:| `BriefInput`             | interface | `{ text?, interpretation?, task?, authority?, manifest?, outcomes?, rules?, invariants?, givens
   117:| `Briefing`               | interface | `{ interpretation?, brief?, questions, verdict?, stages, failures, digest }`                   
   118:| `Dispatch`               | interface | `{ prompt, authority, read, edit, locked, forbidden }`                                         
   119:| `InterpretStageRecord`   | interface | `{ stage, input, output?, error? }`                                                            
   120:| `DraftStageRecord`       | interface | `{ stage, input, output?, error? }`                                                            
   121:| `GateStageRecord`        | interface | `{ stage, input, output?, error? }`                                                            
   122:| `PinStageRecord`         | interface | `{ stage, input, output?, error? }`                                                            
   124:| `BriefStageFailure`      | interface | `{ stage, code, message }`                                                                     
   125:| `BriefRecord`            | interface | `{ id, brief, version, hash }`                                                                 
   127:| `BriefCompilerOptions`   | interface | `{ interpret?, reason?, actions?, domains?, on?, error? }`                                     
   130:| `BriefManagerOptions`    | interface | `{ briefs?, on?, error? }`                                                                     
   Interface rows spelling a member's type:
   (none)
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   142: CONSTANTS TABLE WITHOUT Shape under 'Constants' (Ruling 18: heads Shape with the declared type, under the constants sentence)
   235: CONSTANTS TABLE carries the interface sentence (Ruling 20: the constants sentence alone)
   310: CONSTANTS TABLE WITHOUT Shape under 'Shapers' (Ruling 18: heads Shape with the declared type, under the constants sentence)
   Extended interfaces (Ruling 21: the cell names the parent before `plus` and the added members after; the table's sentence gains "An extended interface's name comes before `plus`, with the members it adds after."):
   (none)
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/brief.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
19a20,26
> it('reads a real inventory covering the documented source', () => {
> 	expect(Object.keys(files)).toContain('src/core/index.ts')
> 	expect(Object.keys(files)).toContain(GUIDE_SPEC)
> 	// The instrument must be able to report absence, not only presence.
> 	expect(Object.keys(files)).not.toContain('src/core/absent.ts')
> })
> 
209a217,365
> 		})
> 
> 		// The non-vacuousness guards for this package's own populations: an extraction that
> 		// came back empty would satisfy every `toEqual([])` assertion in this block.
> 		it('extracts every named section and a non-empty comparable population', () => {
> 			expect(guide.sections()).toContain('Surface')
> 			expect(guide.sections()).toContain('Methods')
> 			expect(guide.sections()).toContain('Tests')
> 			expect(source.surface().length).toBeGreaterThan(0)
> 			expect(guide.methods().length).toBeGreaterThan(0)
> 			expect(
> 				guide.fences().filter((fence) => fence.language === EXAMPLE_LANGUAGE).length,
> 			).toBeGreaterThan(0)
> 			expect(guide.links().filter((href) => !isExternalLink(href)).length).toBeGreaterThan(0)
> 			expect(guide.tests().length).toBeGreaterThan(0)
> 		})
> 
> 		it('reports a symbol the barrel does not carry', () => {
> 			// The control for the surface comparison: a name outside the population it covers.
> 			expect(findMissingSymbols([{ name: 'Phantom', keyword: 'class' }], source.surface())).toEqual(
> 				['class Phantom'],
> 			)
> 			const [first] = source.surface()
> 			if (first === undefined) throw new Error('the barrel surface is empty')
> 			expect(
> 				findMissingSymbols(
> 					[{ name: first.name, keyword: first.keyword === 'const' ? 'class' : 'const' }],
> 					source.surface(),
> 				),
> 			).toHaveLength(1)
> 		})
> 
> 		it('reports a function no fence and no source example demonstrates', () => {
> 			// The control for the example check: a name nothing documents must come back unexampled.
> 			const fences = guide
> 				.fences()
> 				.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
> 				.map((fence) => fence.code)
> 			expect(
> 				findUnexampled(
> 					['neverDocumented'],
> 					fences,
> 					source.examples().map((example) => example.name),
> 				),
> 			).toEqual(['neverDocumented'])
> 		})
> 
> 		it('reads every member of a documented options interface off its own owner', () => {
> 			// The gap this closes: the surface comparison reads export NAMES and the methods
> 			// comparison reads call signatures, so a dead member of an options interface —
> 			// declared, documented as live, read by nothing — passes every other check here.
> 			const types = files['src/core/types.ts']
> 			if (types === undefined) throw new Error('src/core/types.ts is not in the inventory')
> 
> 			const options = guide
> 				.surface()
> 				.filter((symbol) => symbol.keyword === 'interface' && symbol.name.endsWith('Options'))
> 				.map((symbol) => symbol.name)
> 			expect(options.length).toBeGreaterThan(0)
> 
> 			// Scoped to the OWNING file, not the whole tree. Searching every source at once let
> 			// `BriefManagerOptions.on` be satisfied by `BriefCompiler`'s own `options.on`, so a member
> 			// could go dead in one class while its namesake stayed live in the other.
> 			// Coverage: this proves each member is read off an options parameter IN ITS OWNER, not
> 			// that the value read is honoured.
> 			const dead: string[] = []
> 			for (const name of options) {
> 				const owner = `src/core/${name.replace(/Options$/, '')}.ts`
> 				const body = files[owner]
> 				expect({ interface: name, owner, found: body !== undefined }).toEqual({
> 					interface: name,
```
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): 3c3;< // package's own, as is the executed section that closes the file.;---;> // package's own, and are the only part a sibling package changes.. The `INTERNAL` block carries the pilot's sentence (1 = yes): 1
   Lines naming a budget or the `findDrift` call: 241:			for (const drift of findDrift(guide, source)) {
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
   43: ### Compile and project a brief -> fence at 45
   1177: ### Storing briefs by their own identity -> fence at 1179
5. **Propagation.** `npx oxfmt --write guides/brief.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   96: | Type | Kind | Shape | Summary |
   142: | API | Kind | Summary |
   188: | API | Kind | Summary |
   235: | API | Kind | Shape | Summary |
   310: | API | Kind | Summary |
   377: | API | Kind | Summary |
   462: | API | Kind | Summary |
   575: | API | Kind | Summary |
   598: | API | Kind | Summary |
   636: | API | Kind | Summary |
   655: | Method | Returns | Summary |
   703: | Method | Returns | Summary |

## Scope

Owned: `guides/brief.md`, `tests/guides.test.ts`, the doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read (no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/brief.md` and `grep -n '…' guides/brief.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/brief.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-brief-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
