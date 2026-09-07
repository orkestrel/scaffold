# Brief — `d7n-form-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/form` from the committed tip `6483f42` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363f4b9…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-form-close/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   (none)
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   56:| `FormSchema`    | interface | `{ name?, label?, help?, groups?, fields }`                                                              
   57:| `FormGroup`     | interface | `{ name, label, help? }`                                                                                 
   59:| `FieldBase`     | interface | `{ name, label?, help?, group?, hidden?, disabled?, locked?, rule?, meta? }`                             
   61:| `FieldChoice`   | interface | `{ value, label, help?, disabled? }`                                                                     
   62:| `TextField`     | interface | `{ control, default?, placeholder? }`                                                                    
   63:| `EditorField`   | interface | `{ control, default?, placeholder? }`                                                                    
   64:| `PasswordField` | interface | `{ control, mask? }`                                                                                     
   65:| `NumberField`   | interface | `{ control, default?, placeholder? }`                                                                    
   66:| `DateField`     | interface | `{ control, default? }`                                                                                  
   67:| `TimeField`     | interface | `{ control, default? }`                                                                                  
   68:| `DatetimeField` | interface | `{ control, default? }`                                                                                  
   69:| `ColorField`    | interface | `{ control, default? }`                                                                                  
   70:| `ConfirmField`  | interface | `{ control, default? }`                                                                                  
   71:| `SelectField`   | interface | `{ control, choices, default?, open? }`                                                                  
   72:| `CheckboxField` | interface | `{ control, choices, default? }`                                                                         
   73:| `FileField`     | interface | `{ control, accept?, multiple? }`                                                                        
   87:| `FieldRule`         | interface | `{ required?, minimum?, maximum?, step?, pattern?, email?, url?, integer?, alphanumeric?, custom? }` 
   90:| `FieldError`        | interface | `{ field, message, rule? }`                                                                          
   91:| `EvaluationOptions` | interface | `{ messages?, disabled? }`                                                                           
   106:| `FormOptions`   | interface | `{ on?, error?, values?, messages? }`                                                                   
   Interface rows spelling a member's type:
   (none)
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   (none)
   Extended interfaces (Ruling 21: the cell names the parent before `plus` and the added members after; the table's sentence gains "An extended interface's name comes before `plus`, with the members it adds after."):
   src/core/types.ts:206:export interface TextField extends FieldBase {
   src/core/types.ts:213:export interface EditorField extends FieldBase {
   src/core/types.ts:226:export interface PasswordField extends FieldBase {
   src/core/types.ts:232:export interface NumberField extends FieldBase {
   src/core/types.ts:239:export interface DateField extends FieldBase {
   src/core/types.ts:245:export interface TimeField extends FieldBase {
   src/core/types.ts:251:export interface DatetimeField extends FieldBase {
   src/core/types.ts:257:export interface ColorField extends FieldBase {
   src/core/types.ts:263:export interface ConfirmField extends FieldBase {
   src/core/types.ts:275:export interface SelectField extends FieldBase {
   src/core/types.ts:289:export interface CheckboxField extends FieldBase {
   src/core/types.ts:302:export interface FileField extends FieldBase {
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/form.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
14a15,27
> const readme = createGuide(requireValue(files['README.md'], 'Missing file: README.md'))
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
```
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): 3c3;< // package's own, as is the executed section that closes the file.;---;> // package's own, and are the only part a sibling package changes.. The `INTERNAL` block carries the pilot's sentence (1 = yes): 1
   Lines naming a budget or the `findDrift` call: 254:			for (const drift of findDrift(guide, source)) {
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
   26: ### Open a form, answer it, and settle it -> fence at 28
   264: ### text -> fence at 266
   278: ### editor -> fence at 280
   324: ### date -> fence at 326
   337: ### time -> fence at 339
   351: ### datetime -> fence at 353
   364: ### color -> fence at 366
   377: ### confirm -> fence at 379
5. **Propagation.** `npx oxfmt --write guides/form.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   54: | API | Kind | Shape | Summary |
   83: | API | Kind | Shape | Summary |
   101: | API | Kind | Shape | Summary |
   131: | API | Kind | Shape | Summary |
   165: | API | Kind | Shape | Summary |
   184: | API | Kind | Summary |
   209: | API | Kind | Summary |
   221: | API | Kind | Summary |
   772: | Constant | Value | Unit | Bounds |
   1548: | Method | Returns | Summary |

## Scope

Owned: `guides/form.md`, `tests/guides.test.ts`, the doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read (no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/form.md` and `grep -n '…' guides/form.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/form.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-form-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
