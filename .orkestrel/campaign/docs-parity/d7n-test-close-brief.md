# Brief — `d7n-test-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/test` from the committed tip `ac44bd4` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363f4b9…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-test-close/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   (none)
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   113:| `WaitOptions`              | interface | `{ budget?, interval?, signal? }`                                                            
   119:| `Success`                  | interface | `{ success: true, value }`                                                                   
   120:| `Failure`                  | interface | `{ success: false, error }`                                                                  
   122:| `SignalInterface`          | interface | `{ controller, signal, count }`                                                              
   130:| `StateTransition`          | interface | `{ name, from, event, to }`                                                                  
   238:| `ElementOptions`     | interface | `{ classes?, text?, attributes? }`                   | Configures one built element: its class list
   239:| `FrameOptions`       | interface | `{ path, width, height, element? }`                  | Configures one captured frame: where it is w
   240:| `FrameReading`       | interface | `{ width, height, floor }`                           | Represents one written frame read back from 
   241:| `CaptureVariant`     | interface | `{ name, width, height, apply? }`                    | Represents one theme-and-viewport pair a cap
   242:| `PortfolioOptions`   | interface | `{ states, variants, variant, directory, enabled? }` | Configures a capture portfolio: the state re
   244:| `JournalStep`        | interface | `{ action, trigger, result }`                        | Represents one scripted step a journal recor
   604:| `ScratchIdentity`    | interface | `{ device, inode, birth }`                                                                    | Rep
   605:| `ScratchOptions`     | interface | `{ parent?: string, prefix?: string, files?: Readonly<Record<string, string>> }`              | Con
   608:| `InventoryOptions`   | interface | `{ extensions?: readonly string[], exclude?: readonly string[] }`                             | Con
   Interface rows spelling a member's type:
   119:| `Success`                  | interface | `{ success: true, value }`                                                                   
   120:| `Failure`                  | interface | `{ success: false, error }`                                                                  
   605:| `ScratchOptions`     | interface | `{ parent?: string, prefix?: string, files?: Readonly<Record<string, string>> }`              | Con
   608:| `InventoryOptions`   | interface | `{ extensions?: readonly string[], exclude?: readonly string[] }`                             | Con
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   106: SENTENCE OFF CANON: A `Shape` cell holds an interface's `readonly` data members in braces and its call-signature members after `plus`, an extended interface's name before `plus` wi
   232: SENTENCE OFF CANON: A `Shape` cell holds an interface's `readonly` data members in braces and its call-signature members after `plus`, and a type alias's own type.
   597: SENTENCE OFF CANON: A `Shape` cell holds an interface's `readonly` data members in braces and its call-signature members after `plus`, an extended interface's name before `plus` wi
   154: GUARD TABLE WITHOUT Shape under 'Validators' (Ruling 20: heads Shape with the narrowed type, under the guard sentence)
   Extended interfaces (Ruling 21: the cell names the parent before `plus` and the added members after; the table's sentence gains "An extended interface's name comes before `plus`, with the members it adds after."):
   src/server/types.ts:185:export interface UpgradeOptions extends WaitOptions {
   src/core/types.ts:181:export interface RetryOptions extends WaitOptions {
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/test.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
1,212d0
< const root = new URL('../', import.meta.url)
< const files: Record<string, string> = {
< 	...readInventory(root, ['src', 'guides', 'tests'], { extensions: ['.ts', '.md'] }),
< }
< for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
< const manifest = parseManifest(
< 	requireValue(files['guides/README.md'], 'Missing file: guides/README.md'),
< 	'guides',
< )
< const sources = createSourceManager({ files, modules: MODULES })
< const own = requireValue(
< 	manifest.find((entry) => entry.spec === GUIDE_SPEC),
< 	`Missing manifest row: ${GUIDE_SPEC}`,
< )
< 
< it('manifest lists at least one guide', () => {
< 	expect(manifest.length).toBeGreaterThan(0)
< })
< 
< // The example half of the equality case is silent over an empty population: with no
< // title on both sides `findDrift` compares no pair and the case passes on the summaries
< // alone. This pins the population this repository's own guide contributes, so removing
< // every `@example` title reddens the suite instead of quietly retiring half the gate.
< // The failure names both title sets, because a pin reporting only its own emptiness
< // leaves the reader to work out which side dropped the title.
< it('pairs at least one example title across the guide and the source', () => {
< 	const guide = createGuide(requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`))
< 	const source = createSource({ files, module: own.source })
< 	const declared = source
< 		.examples()
< 		.map((example) => example.title)
< 		.filter((title) => title !== undefined)
< 	const titled = new Set(declared)
< 	const headings: string[] = []
< 	const paired: string[] = []
< 	for (const fence of guide.fences()) {
< 		if (fence.title === undefined) continue
< 		headings.push(fence.title)
< 		if (titled.has(fence.title)) paired.push(fence.title)
< 	}
< 	const unpaired =
< 		paired.length > 0
< 			? []
< 			: [
< 					`${GUIDE_SPEC} pairs: guide ${JSON.stringify(headings)} source ${JSON.stringify(declared)}`,
< 				]
< 	expect(unpaired).toEqual([])
< })
< 
< // The README's pitch and the guide's tagline are one text, each read as the blockquote
< // under its file's H1. `README.md` is outside the concept index, so the reader is
< // applied to it directly rather than through a manifest row. Each side is guarded
< // against `undefined` first, so a file that lost its blockquote reports that rather
< // than reporting two absences as agreement.
< it('opens the README with the guide tagline', () => {
< 	const pitch = createGuide(requireValue(files['README.md'], 'Missing file: README.md')).tagline()
< 	const tagline = createGuide(
< 		requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`),
< 	).tagline()
< 
< 	expect(pitch).not.toBeUndefined()
< 	expect(tagline).not.toBeUndefined()
< 	expect(pitch).toBe(tagline)
< })
< 
< for (const entry of manifest) {
< 	const guide = createGuide(requireValue(files[entry.spec], `Missing file: ${entry.spec}`))
< 	const source = createSource({ files, module: entry.source })
< 
< 	describe(`${entry.concept}`, () => {
< 		it('uses only listed fence languages', () => {
< 			expect(findUnlisted(guide.fences(), FENCE_LANGUAGES)).toEqual([])
< 		})
< 
< 		it('extracts a non-empty documented surface', () => {
< 			expect(guide.surface().length).toBeGreaterThan(0)
< 		})
< 		it('re-exports every direct declaration that is not named internal', () => {
< 			const stranded = findMissingSymbols(source.exports(), source.surface())
```
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): 1,3c1,3;< // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against;< // this repo's own `guides/README.md` manifest. The constants that follow are this;< // package's own, as is the executed section that closes the file.;---;> import type { Duplex } from 'node:stream';> import type { EventSourceInterface, StateScenario } from '@src/core';> import { afterEach, describe, expect, it } from 'vitest'. The `INTERNAL` block carries the pilot's sentence (1 = yes): 0
   Lines naming a budget or the `findDrift` call: 344:				for (const drift of findDrift(guide, source)) {
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
   52: ## Install -> fence at 54
   1586: ### Narrow without `!` or `as` -> fence at 1588
   1649: ### Drain an async source -> fence at 1651
   1747: ### Copy a JSON value -> fence at 1749
   1983: ### Own a temporary directory -> fence at 1985
   2098: ### Answer a real request on a loopback port -> fence at 2100
5. **Propagation.** `npx oxfmt --write guides/test.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   111: | Type | Kind | Shape | Summary |
   141: | API | Kind | Shape | Summary |
   154: | API | Kind | Signature | Summary |
   170: | API | Kind | Signature | Summary |
   200: | API | Kind | Signature | Summary |
   235: | Type | Kind | Shape | Summary |
   251: | API | Kind | Shape | Summary |
   265: | API | Kind | Signature | Summary |
   328: | API | Kind | Signature | Summary |
   601: | Type | Kind | Shape | Summary |
   616: | API | Kind | Shape | Summary |
   624: | API | Kind | Signature | Summary |
   741: | API | Kind | Signature | Summary |
   774: | Method | Returns | Summary |
   780: | Method | Returns | Summary |
   786: | Method | Returns | Summary |
   793: | Method | Returns | Summary |
   800: | Method | Returns | Summary |
   808: | Method | Returns | Summary |
   814: | Method | Returns | Summary |
   821: | Method | Returns | Summary |
   827: | Method | Returns | Summary |
   835: | Method | Returns | Summary |

## Scope

Owned: `guides/test.md`, `tests/guides.test.ts`, the doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read (no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/test.md` and `grep -n '…' guides/test.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/test.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-test-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
