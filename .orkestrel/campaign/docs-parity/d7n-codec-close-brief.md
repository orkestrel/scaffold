# Brief — `d7n-codec-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/codec` from the committed tip `da68b6a` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363f4b9…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-codec-close/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   (none)
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   (none)
   Interface rows spelling a member's type:
   (none)
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   (none)
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/codec.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
10a11
> const specification = requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`)
65a67,81
> it('derives the exact package export keys from the same face map', () => {
> 	const parsed: unknown = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'))
> 	if (typeof parsed !== 'object' || parsed === null) {
> 		throw new Error('The package manifest is not a record')
> 	}
> 	const exported: unknown = Object.getOwnPropertyDescriptor(parsed, 'exports')?.value
> 	if (typeof exported !== 'object' || exported === null) {
> 		throw new Error('The package manifest declares no object exports')
> 	}
> 	const expected = Object.keys(MODULES).map((specifier) =>
> 		specifier === ROOT ? '.' : `.${specifier.slice(ROOT.length)}`,
> 	)
> 	expect(Object.keys(exported).sort()).toEqual(expected.concat('./package.json').sort())
> })
> 
75c91,92
< 		it('extracts a non-empty documented surface', () => {
---
> 		it('extracts non-empty barrel and documented surfaces', () => {
> 			expect(source.surface().length).toBeGreaterThan(0)
103c120
< 			const entity = group.interface.replace(/Interface$/, '')
---
> 			const entity = group.interface.replace(/Interface$/u, '')
153a171
> 			expect(names.length).toBeGreaterThan(0)
163,191c181,209
< 		for (const group of guide.methods()) {
< 			const entity = group.interface.replace(/Interface$/, '')
< 			const documented = group.methods.map((method) => method.name)
< 			const examples =
< 				entity === group.interface
< 					? source.examples(group.interface).map((example) => example.name)
< 					: source
< 							.examples(group.interface)
< 							.map((example) => example.name)
< 							.concat(source.examples(entity).map((example) => example.name))
< 			describe(`${group.interface} examples`, () => {
< 				it('documents an example for every method', () => {
< 					const fences = guide
< 						.fences()
< 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
< 						.map((fence) => fence.code)
< 					expect(findUnexampled(documented, fences, examples)).toEqual([])
< 				})
< 			})
< 		}
< 
< 		it('imports only real exports in every ```ts fence', () => {
< 			const fences = guide.fences().filter((fence) => fence.language === EXAMPLE_LANGUAGE)
< 			for (const fence of fences) {
< 				for (const { specifier, names } of extractFenceImports(fence.code)) {
< 					const imported = sources.source(specifier)
< 					if (imported === undefined) continue
< 					const surface = imported.surface().map((symbol) => symbol.name)
< 					expect(findMissing(names, surface)).toEqual([])
---
> 		// The membership rule is `extractFenceImports`'s own grammar read off Guide's comment-aware source
> 		// projection: a mapped specifier's bindings compare against that face's barrel surface, a
> 		// repository alias and an unmapped true subpath of the root are refused because a public
> 		// guide example must import through a published specifier, and a foreign package stays
> 		// external and is compared against no face.
> 		it('imports only real exports through published specifiers in every ts fence', () => {
> 			const refused: string[] = []
> 			const missing: string[] = []
> 			for (const fence of guide.fences().filter((row) => row.language === EXAMPLE_LANGUAGE)) {
> 				const projected = extractSourceLines(fence.code)
> 					.map((line) => line.code)
> 					.join('\n')
> 				for (const statement of extractFenceImports(projected)) {
> 					const specifier = statement.specifier
> 					if (specifier.startsWith('@src/') || specifier.startsWith('@app/')) {
> 						refused.push(specifier)
> 						continue
> 					}
> 					const face = sources.source(specifier)
> 					if (face === undefined) {
```
   Header: 1c1;< // this repo's own `guides/README.md` manifest. The constants below are this;---;> // `guides/README.md` manifest, and every flagship fence in `guides/codec.md` is transcribed here;INTERNAL sentence present: 0
   Lines naming a budget or the `findDrift` call: 233:			for (const drift of findDrift(guide, source)) {
4. **Propagation.** `npx oxfmt --write guides/codec.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   66: | Name | Kind | Signature | Summary |
   93: | Name | Kind | Signature | Summary |
   109: | Name | Kind | Signature | Summary |

## Scope

Owned: `guides/codec.md`, `tests/guides.test.ts`, the doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read (no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/codec.md` and `grep -n '…' guides/codec.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/codec.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-codec-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
