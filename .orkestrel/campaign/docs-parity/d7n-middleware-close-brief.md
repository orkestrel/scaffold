# Brief — `d7n-middleware-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/middleware` from the committed tip `6576d98` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38cfd9c…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-middleware-close/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   (none)
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   79:| `BoundaryOptions`           | interface | `{ expose?, report? }`                                                                       
   80:| `TelemetryEntry`            | interface | `{ method, pathname, status, duration }`                                                     
   81:| `TelemetryOptions`          | interface | `{ record }`                                                                                 
   82:| `CompressionOptions`        | interface | `{ threshold?, encodings?, filter? }`                                                        
   83:| `CompressResponseOptions`   | interface | `{ threshold, filter?, encodings, compress }`                                                
   85:| `SecurityOptions`           | interface | `{ frame?, csp?, referrer?, permissions?, coop?, corp?, cluster?, coep?, hsts?, identifier? }
   86:| `CorsOptions`               | interface | `{ origin?, methods?, headers? }`                                                            
   87:| `DeadlineOptions`           | interface | `{ ms, status? }`                                                                            
   89:| `ETagOptions`               | interface | `{ weak? }`                                                                                  
   90:| `BearerOptions`             | interface | `{ secret, header?, scheme? }`                                                               
   91:| `LimiterOptions`            | interface | `{ max, window, capacity?, key?, message?, clock?, policy?, evict? }`                        
   92:| `BearerState`               | interface | `{ token? }`                                                                                 
   93:| `IdentifierState`           | interface | `{ identifier? }`                                                                            
   94:| `Client`                    | interface | `{ ip? }`                                                                                    
   95:| `ClientState`               | interface | `{ client? }`                                                                                
   96:| `ConnectionState`           | interface | `{ connection? }`                                                                            
   99:| `SessionState`              | interface | `{ session?, control? }`                                                                     
   100:| `BodyState`                 | interface | `{ body? }`                                                                                 
   103:| `SessionOptions`            | interface | `{ transport, store?, ttl?, lifetime?, capacity?, evict?, create?, mint?, required?, clock? 
   104:| `CookieTransportOptions`    | interface | `{ name?, secret, cookie? }`                                                                
   105:| `HeaderTransportOptions`    | interface | `{ header? }`                                                                               
   106:| `MemorySessionStoreOptions` | interface | `{ ttl?, lifetime?, capacity?, evict? }`                                                    
   107:| `SessionLimits`             | interface | `{ ttl?, lifetime? }`                                                                       
   108:| `SessionCursors`            | interface | `{ seen, created }`                                                                         
   110:| `SessionEntry`              | interface | `{ session, seen, created }`                                                                
   111:| `SessionSnapshot`           | interface | `{ id, state }`                                                                             
   113:| `CSRFState`                 | interface | `{ csrf? }`                                                                                 
   114:| `CSRFOptions`               | interface | `{ secret, cookie?, header?, field?, safe? }`                                               
   115:| `MultipartFile`             | interface | `{ field, name, size, mime, validated, status, path }`                                      
   117:| `MultipartState`            | interface | `{ multipart? }`                                                                            
   118:| `Asset`                     | interface | `{ body, encoding? }`                                                                       
   120:| `AssetOptions`              | interface | `{ source }`                                                                                
   121:| `StaticOptions`             | interface | `{ root, prefix?, index?, dotfiles?, cache?, etag?, fallback? }`                            
   122:| `MultipartLimitsInput`      | interface | `{ file?, field?, total? }`                                                                 
   123:| `MultipartLimits`           | interface | `{ file, field, total }`                                                                    
   124:| `MultipartOptions`          | interface | `{ limits?, allowed?, directory? }`                                                         
   125:| `NodeCompressionOptions`    | interface | `{ threshold?, filter? }`                                                                   
   128:| `UploadedFile`              | interface | `{ field, name, size, mime, validated, status, path }`                                      
   129:| `PartHeaders`               | interface | `{ name, filename, mime }`                                                                  
   130:| `ByteRange`                 | interface | `{ start, end }`                                                                            
   Interface rows spelling a member's type:
   (none)
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   183: CONSTANTS TABLE WITHOUT Shape under 'Shapers' (Ruling 18: heads Shape with the declared type, under the constants sentence)
   216: GUARD TABLE WITHOUT Shape under 'Validators — core' (Ruling 20: heads Shape with the narrowed type, under the guard sentence)
   Extended interfaces (Ruling 21: the cell names the parent before `plus` and the added members after; the table's sentence gains "An extended interface's name comes before `plus`, with the members it adds after."):
   src/server/types.ts:179:export interface UploadedFile extends Omit<MultipartFile, 'status'> {
   src/core/types.ts:454:export interface SessionRow extends SessionCursors {
   src/core/types.ts:612:export interface MemorySessionStoreOptions extends SessionLimits {
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/middleware.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
(no difference)
```
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): 3c3;< // package's own, as is the executed section that closes the file.;---;> // package's own, and are the only part a sibling package changes.. The `INTERNAL` block carries the pilot's sentence (1 = yes): 1
   Lines naming a budget or the `findDrift` call: 187:			for (const drift of findDrift(guide, source)) {
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
   27: ### Mount a battery -> fence at 29
   578: ### Canonical onion — behind `@orkestrel/server` -> fence at 580
   600: ### Body: eager cache drive -> fence at 602
   616: ### Session: control handle, header transport, injected store -> fence at 618
   641: ### Session store seam — direct calls -> fence at 643
   687: ### Session transport seam — direct calls -> fence at 689
   700: ### CSRF: session-bound double-submit -> fence at 702
   714: ### Multipart: node face, sniffed-type allow-list -> fence at 716
   734: ### Multipart limits — direct resolution -> fence at 736
   744: ### Assets: in-memory source -> fence at 746
   772: ### Static: SPA fallback -> fence at 774
5. **Propagation.** `npx oxfmt --write guides/middleware.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   46: | API | Kind | Summary |
   66: | API | Kind | Summary |
   77: | Type | Kind | Shape | Summary |
   136: | API | Kind | Shape | Summary |
   183: | API | Kind | Summary |
   189: | API | Kind | Summary |
   216: | API | Kind | Summary |
   225: | API | Kind | Summary |
   251: | API | Kind | Summary |
   257: | API | Kind | Summary |
   271: | API | Kind | Summary |
   281: | API | Kind | Summary |
   300: | Method | Returns | Summary |
   310: | Method | Returns | Summary |
   323: | Method | Returns | Summary |
   336: | Method | Returns | Summary |
   348: | Method | Returns | Summary |

## Scope

Owned: `guides/middleware.md`, `tests/guides.test.ts`, the doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read (no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/middleware.md` and `grep -n '…' guides/middleware.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/middleware.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-middleware-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
