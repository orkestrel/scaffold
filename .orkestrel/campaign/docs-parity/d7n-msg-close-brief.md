# Brief — `d7n-msg-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/msg` from the committed tip `8da702f` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363f4b9…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-msg-close/` inside this checkout.


## Resumed over a partial tree (the Orchestrator, 2026-09-08T01:25Z)

A predecessor unit on this brief died mid-work (HTTP 429) after editing the files `git status --short` in `/home/user/fleet/msg` lists; it wrote no report. Read `git diff` first and rule each hunk against the items: keep a hunk an item asks for, correct one that is wrong, and discard none silently; record the rulings in the report under "The predecessor's hunks". The "status lines: 0" fact in § Role and engine described the tree before that predecessor ran.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   (none)
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   53:| `MSGDirectoryEntry`   | interface | `{ category, name, previousProperty, nextProperty, childProperty, startBlock, sizeBlock, children? 
   54:| `MSGMutableFieldData` | interface | `{ category, attachments?, recipients?, innerMSGContent?, innerMSGContentFields?, dataId?, contentL
   55:| `MSGNameIdEntry`      | interface | `{ useName, name?, propertySet?, propertyLid? }`                                                   
   56:| `MSGBurnerEntry`      | interface | `{ name, category, length, binaryProvider?, children? }`                                           
   57:| `MSGBurnerLiteEntry`  | interface | `{ entry, left, right, child, firstSector, mini, red }`                                            
   59:| `MSGAttachment`       | interface | `{ name, bytes }`                                                                                  
   62:| `MIMEHeader`          | interface | `{ value, params }`                                                                                
   63:| `MIMEPart`            | interface | `{ headers, body, parts }`                                                                         
   64:| `EmailAttachment`     | interface | `{ name, mimeType, bytes }`                                                                        
   65:| `EmailMessage`        | interface | `{ from, to, cc, subject, date, text, html, attachments }`                                         
   66:| `EmailChain`          | interface | `{ format, messages }`                                                                             
   67:| `EmailInput`          | interface | `{ bytes, name?, mime? }`                                                                          
   69:| `MSGOptions`          | interface | `{ encoding? }`                                                                                    
   70:| `MSGInterface`        | interface | `{ options, chain, fields, attachment, burn }`                                                     
   Interface rows spelling a member's type:
   54:| `MSGMutableFieldData` | interface | `{ category, attachments?, recipients?, innerMSGContent?, innerMSGContentFields?, dataId?, contentL
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   40: SENTENCE OFF CANON: A `Shape` cell holds a type alias's value, and an interface's members in braces; it stays empty where an interface carries more members than a cell can list. `M
   Extended interfaces (Ruling 21: the cell names the parent before `plus` and the added members after; the table's sentence gains "An extended interface's name comes before `plus`, with the members it adds after."):
   (none)
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/msg.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
(no difference)
```
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): 1,3c1,3;< // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against;< // this repo's own `guides/README.md` manifest. The constants that follow are this;< // package's own, as is the executed section that closes the file.;---;> // The guides-parity gate: `@orkestrel/guide`'s checks run against this repository's own;> // `guides/README.md` manifest, and every flagship fence in `guides/msg.md` is transcribed;> // here and asserted against what its comments claim. Name resolution is not a behavioural. The `INTERNAL` block carries the pilot's sentence (1 = yes): 0
   Lines naming a budget or the `findDrift` call: 228:			for (const drift of findDrift(guide, source)) {
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
   366: #### Parse an email file and read its format -> fence at 368
5. **Propagation.** `npx oxfmt --write guides/msg.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   44: | Type | Kind | Shape | Summary |
   76: | Constant | Kind | Value | Summary |
   383: | Method | Returns | Summary |
   390: | Method | Returns | Summary |

## Scope

Owned: `guides/msg.md`, `tests/guides.test.ts`, the doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read (no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/msg.md` and `grep -n '…' guides/msg.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/msg.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-msg-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
