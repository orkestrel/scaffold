# Brief — `d7n-contract-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/contract` from the committed tip `6e9942a` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363f4b9…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-contract-close/` inside this checkout.


## Resumed over a partial tree (the Orchestrator, 2026-09-08T01:25Z)

A predecessor unit on this brief died mid-work (HTTP 429) after editing the files `git status --short` in `/home/user/fleet/contract` lists; it wrote no report. Read `git diff` first and rule each hunk against the items: keep a hunk an item asks for, correct one that is wrong, and discard none silently; record the rulings in the report under "The predecessor's hunks". The "status lines: 0" fact in § Role and engine described the tree before that predecessor ran.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   207: | `JSONPrimitive`       | type      | Represents a primitive JSON value — the flat leaf of any JSON document.                        
   208: | `JSONRecord`          | type      | Represents a readonly string-keyed JSON object record.                                           
   209: | `JSONValue`           | type      | Represents a recursive JSON value — primitives, arrays, and object records.                    
   210: | `JSONSchemaType`      | type      | Lists the seven standard JSON Schema `type` names.                                               
   211: | `JSONSchema`          | interface | Represents a JSON Schema fragment — the supported keyword vocabulary the contract compiler emit
   212: | `SchemaFormat`        | type      | Lists the closed set of string formats `stringToFormat` recognizes.                              
   358: | `ContractCode`         | type      | Names the machine-readable category carried by a `ContractError`.        |
   360: | `ContractErrorContext` | interface | Represents the optional structured details carried by a `ContractError`. |
   361: | `ContractErrorOptions` | interface | Represents the construction options for a `ContractError`.               |
   374: | `JSONClonerInterface`   | interface | Settles one exact JSON snapshot of a retained source, then replays it.    |
   376: | `SchemaClonerInterface` | interface | Settles one JSON Schema snapshot of a retained schema, then replays it.   |
   378: | `ShapeClonerInterface`  | interface | Settles one contract-shape snapshot of a retained shape, then replays it. |
   518: | `ShapeValidatorInterface`   | interface | Validates one retained contract-shape source on demand.                                    
   525: | `ContractInterface`         | interface | Represents a compiled contract — the lockstep outputs derived from one shape.            
   527: | `ContractCompilerInterface` | interface | Owns one contract shape's compiled artifacts plus their bundle, lazily.                    
   528: | `RandomFunction`            | type      | Represents a deterministic random source returning a value in `[0, 1)`.                    
   529: | `AuditorFunction`           | type      | Represents a compiled strict-domain diagnostic — the shape of `compileAuditor` bound to o
   530: | `ReporterFunction`          | type      | Represents a compiled coercive-domain diagnostic — the shape of `compileReporter` bound t
   531: | `SeederFunction`            | type      | Represents a compiled seed-data source — the shape of `compileGenerator` bound to one sha
   597: | `ValueToSchemaOptions` | interface | Groups the options for `valueToSchema` / `samplesToSchema`.                                     
   598: | `ValueToSchemaLimits`  | interface | Holds the per-walk budgets `ValueToSchemaOptions` groups under `limits`.                        
   599: | `SampleMemo`           | interface | Holds the per-walk memo the multi-sample walk behind `samplesToSchema` owns, keyed by the ORDERE
   646: | `Fault`               | type      | Represents a single structured parse-failure diagnostic — one entry of an `ContractInterface.ex
   647: | `ExtraFault`          | interface | Represents a key present on a value that its closed object shape does not declare.               
   648: | `AuditFault`          | type      | Covers every fault an audit reports — the parse faults plus undeclared keys.                   
   649: | `FaultKind`           | type      | Names the kind of value a `Fault` expected — the shape-projected counterpart of a `ContractShap
   650: | `FaultConstraint`     | type      | Names the refinement a `Fault` of reason `'constraint'` violates.                                
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   301:| `Failure`                | interface | `{ success, error }`                                                                           
   303:| `GuardShapeRead`         | interface | `{ guards, names, optional, vocabulary }`                                                      
   304:| `BoundsRead`             | interface | `{ min?, max? }`                                                                               
   306:| `StringGuardOptions`     | interface | `{ min?, max?, pattern? }`                                                                     
   319:| `ReadValueOptions`       | interface | `{ subject?, code?, context? }`                                                                
   320:| `ContainOptions`         | interface | `{ code?, context? }`                                                                          
   321:| `ShapeProperty`          | interface | `{ key, child }`                                                                               
   322:| `Success`                | interface | `{ success, value }`                                                                           
   483:| `StringShape`         | interface | `{ category, min?, max?, pattern?, description? }`                                                
   484:| `NumberShape`         | interface | `{ category, min?, max?, integer?, description? }`                                                
   485:| `BooleanShape`        | interface | `{ category, description? }`                                                                      
   486:| `NullShape`           | interface | `{ category, description? }`                                                                      
   487:| `LiteralShape`        | interface | `{ category, values, description? }`                                                              
   488:| `ArrayShape`          | interface | `{ category, items, min?, max?, description? }`                                                   
   489:| `ObjectShape`         | interface | `{ category, properties, additionalProperties?, description? }`                                   
   490:| `UnionShape`          | interface | `{ category, variants, mode?, description? }`                                                     
   491:| `OptionalShape`       | interface | `{ category, inner }`                                                                             
   492:| `NullableShape`       | interface | `{ category, inner }`                                                                             
   493:| `JSONShape`           | interface | `{ category, description? }`                                                                      
   494:| `RawShape`            | interface | `{ category, schema }`                                                                            
   501:| `StringShapeOptions`  | interface | `{ min?, max?, pattern?, description? }`                                                          
   502:| `NumberShapeOptions`  | interface | `{ min?, max?, integer?, description? }`                                                          
   503:| `BooleanShapeOptions` | interface | `{ description? }`                                                                                
   504:| `NullShapeOptions`    | interface | `{ description? }`                                                                                
   505:| `JSONShapeOptions`    | interface | `{ description? }`                                                                                
   506:| `LiteralShapeOptions` | interface | `{ description? }`                                                                                
   507:| `ArrayShapeOptions`   | interface | `{ min?, max?, description? }`                                                                    
   508:| `ObjectShapeOptions`  | interface | `{ additionalProperties?, description? }`                                                         
   509:| `RecordShapeOptions`  | interface | `{ description? }`                                                                                
   Interface rows spelling a member's type:
   (none)
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   (none)
   Extended interfaces (Ruling 21: the cell names the parent before `plus` and the added members after; the table's sentence gains "An extended interface's name comes before `plus`, with the members it adds after."):
   (none)
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/contract.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
134a135,138
> 		// `findDrift` measured 5.6 s on this guide alone on an idle host — it takes one
> 		// source lookup per compared row, over every line this package declares — so the
> 		// default 5-second budget cannot hold it. This budget clears that reading with room
> 		// for a contended host, and the cost is the reader's rather than this package's.
143c147
< 		})
---
> 		}, 30_000)
```
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): 2,3c2,3;< // this repo's own `guides/README.md` manifest. The constants that follow are this;< // package's own, as is the executed section that closes the file.;---;> // this repo's own `guides/README.md` manifest. The constants below are this;> // package's own, and are the only part a sibling package changes.. The `INTERNAL` block carries the pilot's sentence (1 = yes): 1
   Lines naming a budget or the `findDrift` call: 205:			for (const drift of findDrift(guide, source)) {;211:		}, 30_000)
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
   798: ### Narrowing `unknown` -> fence at 800
   875: ### Guards narrow, parsers coerce -> fence at 877
   928: ### Declaring a shape -> fence at 930
5. **Propagation.** `npx oxfmt --write guides/contract.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   198: | API | Kind | Summary |
   216: | Constant | Kind | Summary |
   299: | Type | Kind | Shape | Summary |
   333: | API | Kind | Summary |
   355: | API | Kind | Summary |
   371: | API | Kind | Summary |
   386: | API | Kind | Summary |
   480: | Type | Kind | Shape | Summary |
   515: | API | Kind | Summary |
   583: | API | Kind | Summary |
   634: | API | Kind | Summary |
   707: | Method | Returns | Summary |
   713: | Method | Returns | Summary |
   719: | Method | Returns | Summary |
   734: | Method | Returns | Summary |
   754: | Method | Returns | Summary |

## Scope

Owned: `guides/contract.md`, `tests/guides.test.ts`, the doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read (no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/contract.md` and `grep -n '…' guides/contract.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/contract.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-contract-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
