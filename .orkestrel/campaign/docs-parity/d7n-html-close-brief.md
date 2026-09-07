# Brief — `d7n-html-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/html` from the committed tip `1121b5c` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363f4b9…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-html-close/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   (none)
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   20:| `HTMLAttribute`       | interface | `{ name, value? }`                                                                                 
   21:| `HTMLStartTag`        | interface | `{ name, attributes, slashed, next }`                                                              
   22:| `HTMLTag`             | interface | `{ name, attributes, closing, next }`                                                              
   23:| `ElementNode`         | interface | `{ category, name, attributes, children }`                                                         
   24:| `TextNode`            | interface | `{ category, value }`                                                                              
   25:| `CommentNode`         | interface | `{ category, value }`                                                                              
   26:| `DoctypeNode`         | interface | `{ category, name, public?, system? }`                                                             
   27:| `HTMLDocument`        | interface | `{ category, children }`                                                                           
   29:| `HTMLSpan`            | interface | `{ start, end }`                                                                                   
   31:| `HTMLOpenPosition`    | interface | `{ overflow, position }`                                                                           
   35:| `HTMLRawText`         | interface | `{ node, span, next, closed }`                                                                     
   40:| `HTMLSanitizeOptions` | interface | `{ elements?, attributes?, schemes?, comments? }`                                                  
   41:| `HTMLDistillOptions`  | interface | `{ base?, elements?, boilerplate? }`                                                               
   Interface rows spelling a member's type:
   (none)
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   16: SENTENCE OFF CANON: A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member, and its call-signature members after `plus`; a type al
   48: CONSTANTS TABLE WITHOUT Shape under 'Constants' (Ruling 18: heads Shape with the declared type, under the constants sentence)
   140: CONSTANTS TABLE WITHOUT Shape under 'Shapers' (Ruling 18: heads Shape with the declared type, under the constants sentence)
   Extended interfaces (Ruling 21: the cell names the parent before `plus` and the added members after; the table's sentence gains "An extended interface's name comes before `plus`, with the members it adds after."):
   (none)
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/html.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
(no difference)
```
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): 2,3c2,3;< // this repo's own `guides/README.md` manifest. The constants that follow are this;< // package's own, as is the executed section that closes the file.;---;> // this repo's own `guides/README.md` manifest. The constants below are this;> // package's own, and are the only part a sibling package changes.. The `INTERNAL` block carries the pilot's sentence (1 = yes): 1
   Lines naming a budget or the `findDrift` call: 231:			for (const drift of findDrift(guide, source)) {
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
   352: ### Parse, then query -> fence at 354
   369: ### Adopt a document that came from somewhere else -> fence at 371
   384: ### Rewrite with `map`, count with `reduce`, project with `fold` -> fence at 386
   410: ### Stream the top level, shallow and backpressured -> fence at 412
   427: ### Sanitize, and watch the floor hold -> fence at 429
   469: ### Distill a page down to its content -> fence at 471
   499: ### Work on a bare node, with no handle at all -> fence at 501
   550: ### Scan by hand, one piece at a time -> fence at 552
   594: ### Escape, resolve, and inspect -> fence at 596
   628: ### Ask a name or an element a question -> fence at 630
   654: ### Prove the roundtrip laws -> fence at 656
5. **Propagation.** `npx oxfmt --write guides/html.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   18: | Name | Kind | Shape | Summary |
   48: | Name | Kind | Value | Summary |
   74: | Name | Kind | Signature | Summary |
   89: | Name | Kind | Signature | Summary |
   98: | Name | Kind | Signature | Summary |
   140: | Name | Kind | Summary |
   151: | Name | Kind | Signature | Summary |
   160: | Name | Kind | Summary |
   174: | Method | Returns | Summary |

## Scope

Owned: `guides/html.md`, `tests/guides.test.ts`, the doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read (no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/html.md` and `grep -n '…' guides/html.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/html.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-html-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
