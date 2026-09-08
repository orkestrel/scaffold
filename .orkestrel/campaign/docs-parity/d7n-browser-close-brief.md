# Brief — `d7n-browser-close` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/browser` from the committed tip `1016f4d` (status lines: 0; the final guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363f4b9…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-browser-close/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67` and `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `src/**/types.ts` and `src/**/constants.ts` for every declaration the items name.

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Every `## Surface` table that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary`, under one convention sentence — exactly: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads `Shape` with the type each guard narrows to, under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." A constants table heads `Shape` with the constant's declared type under the sentence "A `Shape` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, `?` on an optional one, then `plus` and its call-signature members by name (`{ id, signal, aborted } plus abort`); a member's type never appears. Each type alias's cell: its own literal, `\|` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as `[Symbol.dispose]`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with `…`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without `Shape` that carry interface or type rows (line: row):
   (none)
   Interface rows whose braces carry no `plus` (read each declaration; where it has call-signature members, move them after `plus`):
   229:| `CDPClientOptions`            | interface | `{ transport, timeout?, on?, error? }`                                                    
   232:| `CDPTarget`                   | interface | `{ id, category, title, url }`                                                            
   234:| `CDPSendOptions`              | interface | `{ session?, timeout? }`                                                                  
   236:| `BrowserViewport`             | interface | `{ width, height, scale?, mobile?, touch?, landscape? }`                                  
   238:| `BrowserPageOptions`          | interface | `{ on?, error?, url?, viewport?, timeout? }`                                              
   239:| `BrowserNavigationOptions`    | interface | `{ condition?, timeout? }`                                                                
   240:| `BrowserActionOptions`        | interface | `{ timeout?, strict?, force?, trial? }`                                                   
   243:| `BrowserScreenshotOptions`    | interface | `{ path?, full?, format?, quality?, clip?, transparent?, animations?, caret?, scale?, mask
   244:| `BrowserContentResult`        | interface | `{ url, title, html, text }`                                                              
   245:| `BrowserScreenshotResult`     | interface | `{ bytes, path }`                                                                         
   248:| `BrowserCodegenOptions`       | interface | `{ on?, error? }`                                                                         
   250:| `BrowserCodegenScriptOptions` | interface | `{ language? }`                                                                           
   253:| `BrowserFrameInfo`            | interface | `{ id, parent, name, url }`                                                               
   255:| `BrowserSendOptions`          | interface | `{ timeout? }`                                                                            
   257:| `BrowserLayout`               | interface | `{ bounds, styles, text, paint, offset, scroll, client }`                                 
   258:| `BrowserNode`                 | interface | `{ document, frame, index, id, parent, category, name, value, attributes, text, input, che
   259:| `BrowserDocument`             | interface | `{ index, frame, url, title, nodes, scroll, width, height }`                              
   260:| `BrowserSnapshotInput`        | interface | `{ documents, styles }`                                                                   
   262:| `BrowserWalkOptions`          | interface | `{ root?, order? }`                                                                       
   265:| `BrowserSnapshotOptions`      | interface | `{ styles?, paint?, rects?, limit? }`                                                     
   267:| `BrowserNodeQuery`            | interface | `{ name?, text?, attributes?, frame?, visible?, clickable? }`                             
   445:| `BrowserDiscoveryResult`       | interface | `{ endpoint, browser }`                                                                  
   446:| `SystemBrowserOptions`         | interface | `{ env?, paths?, names?, stores?, engine? }`                                             
   448:| `BrowserProfileResult`         | interface | `{ path, temporary }`                                                                    
   449:| `BrowserCDPOptions`            | interface | `{ port?, host?, endpoint?, discover? }`                                                 
   451:| `BrowserOptions`               | interface | `{ on?, error?, headless?, executable?, profile?, cdp?, timeout?, viewport?, signal?, arg
   453:| `WebSocketCDPTransportOptions` | interface | `{ on?, error?, url, timeout? }`                                                         
   792:| `BrowserAXNode`                     | interface | `{ id, parent, children, backend, frame, ignored, role, name, description, value, pr
   794:| `BrowserAccessibilityOptions`       | interface | `{ root?, depth? }`                                                                 
   795:| `BrowserAccessibilitySnapshot`      | interface | `{ roots, nodes }`                                                                  
   796:| `BrowserActionabilityOptions`       | interface | `{ visible?, stable?, events?, enabled?, editable?, position? }`                    
   797:| `BrowserBindingCall`                | interface | `{ id, name, args, context }`                                                       
   799:| `BrowserChord`                      | interface | `{ modifiers, key }`                                                                
   802:| `BrowserConsoleMessage`             | interface | `{ level, text, values, timestamp, stack }`                                         
   804:| `BrowserContextOptions`             | interface | `{ on?, error?, proxy?, origins?, downloads?, emulation? }`                         
   805:| `BrowserCookie`                     | interface | `{ name, value, domain, path, expires, http, secure, site, partition }`             
   806:| `BrowserCookieFilter`               | interface | `{ name?, domain?, path? }`                                                         
   807:| `BrowserCookieInput`                | interface | `{ name, value, url?, domain?, path?, expires?, http?, secure?, site?, priority?, pa
   809:| `BrowserCookiePartition`            | interface | `{ site, ancestor? }`                                                               
   811:| `BrowserCoverageOptions`            | interface | `{ javascript?, css?, detailed? }`                                                  
   812:| `BrowserCoverageRange`              | interface | `{ start, end, count }`                                                             
   813:| `BrowserCoverageResult`             | interface | `{ scripts, styles }`                                                               
   814:| `BrowserCredentials`                | interface | `{ username, password }`                                                            
   820:| `BrowserDownloadOptions`            | interface | `{ path, named? }`                                                                  
   821:| `BrowserDownloadProgress`           | interface | `{ status, received, total, path? }`                                                
   822:| `BrowserDownloadStart`              | interface | `{ id, url, name, frame }`                                                          
   826:| `BrowserEmulationOptions`           | interface | `{ viewport?, user?, locale?, timezone?, geolocation?, media?, offline?, headers?, c
   828:| `BrowserFunctionCoverage`           | interface | `{ name, ranges, block }`                                                           
   829:| `BrowserGeolocation`                | interface | `{ latitude, longitude, accuracy? }`                                                
   830:| `BrowserHAR`                        | interface | `{ log }`                                                                           
   831:| `BrowserHARContent`                 | interface | `{ size, mimeType, text?, encoding? }`                                              
   833:| `BrowserHARCreator`                 | interface | `{ name, version }`                                                                 
   834:| `BrowserHAREntry`                   | interface | `{ startedDateTime, time, request, response, cache, timings }`                      
   835:| `BrowserHARLog`                     | interface | `{ version, creator, entries }`                                                     
   837:| `BrowserHAROptions`                 | interface | `{ path?, content? }`                                                               
   838:| `BrowserHARPending`                 | interface | `{ request, started, response }`                                                    
   839:| `BrowserHARPost`                    | interface | `{ mimeType, text }`                                                                
   840:| `BrowserHARReplayOptions`           | interface | `{ fallback? }`                                                                     
   841:| `BrowserHARRequest`                 | interface | `{ method, url, httpVersion, cookies, headers, queryString, postData?, headersSize, 
   842:| `BrowserHARResponse`                | interface | `{ status, statusText, httpVersion, cookies, headers, content, redirectURL, headersS
   843:| `BrowserHARTimings`                 | interface | `{ blocked, dns, connect, send, wait, receive, ssl }`                               
   844:| `BrowserHARValue`                   | interface | `{ name, value }`                                                                   
   846:| `BrowserInputOptions`               | interface | `{ delay? }`                                                                        
   847:| `BrowserKey`                        | interface | `{ key, code, text, number }`                                                       
   851:| `BrowserLocatorFilter`              | interface | `{ text?, exact?, visible? }`                                                       
   854:| `BrowserMargin`                     | interface | `{ top?, right?, bottom?, left? }`                                                  
   855:| `BrowserMedia`                      | interface | `{ output?, scheme?, contrast?, motion?, colors? }`                                 
   856:| `BrowserMetric`                     | interface | `{ name, value }`                                                                   
   860:| `BrowserNavigationResult`           | interface | `{ url, response, same }`                                                           
   861:| `BrowserNavigationWait`             | interface | `{ pattern, timer, resolve, reject }`                                               
   862:| `BrowserNavigationWaitOptions`      | interface | `{ timeout? }`                                                                      
   863:| `BrowserNavigationWatch`            | interface | `{ responses }`                                                                     
   867:| `BrowserPDFOptions`                 | interface | `{ path?, landscape?, background?, scale?, width?, height?, margin?, ranges?, header
   868:| `BrowserPDFResult`                  | interface | `{ bytes, path }`                                                                   
   869:| `BrowserPageError`                  | interface | `{ message, stack, timestamp }`                                                     
   874:| `BrowserPoint`                      | interface | `{ x, y }`                                                                          
   876:| `BrowserProfile`                    | interface | `{ start, end, nodes, samples, deltas }`                                            
   877:| `BrowserProfileFrame`               | interface | `{ function, script, url, line, column }`                                           
   878:| `BrowserProfileNode`                | interface | `{ id, frame, hit, children }`                                                      
   880:| `BrowserProxy`                      | interface | `{ server, bypass? }`                                                               
   881:| `BrowserQuad`                       | interface | `{ points, center }`                                                                
   882:| `BrowserQuery`                      | interface | `{ selector, value, name?, exact?, parent?, filter?, index? }`                      
   883:| `BrowserRequest`                    | interface | `{ id, loader, frame, url, method, headers, post, resource, timestamp, walltime, red
   884:| `BrowserRequestFailure`             | interface | `{ id, error, cancelled, blocked }`                                                 
   885:| `BrowserResponse`                   | interface | `{ id, loader, frame, url, status, phrase, headers, mime, protocol, address, port, c
   886:| `BrowserRoleOptions`                | interface | `{ name?, exact? }`                                                                 
   887:| `BrowserRouteContinueOptions`       | interface | `{ url?, method?, headers?, post? }`                                                
   888:| `BrowserRouteDefinition`            | interface | `{ query, handler }`                                                                
   889:| `BrowserRouteFulfillOptions`        | interface | `{ status?, phrase?, headers?, body? }`                                             
   892:| `BrowserRouteQuery`                 | interface | `{ url?, method?, resource? }`                                                      
   895:| `BrowserScriptCoverage`             | interface | `{ id, url, functions }`                                                            
   896:| `BrowserScriptEntry`                | interface | `{ source, binding }`                                                               
   898:| `BrowserSecurity`                   | interface | `{ protocol, issuer, from, to }`                                                    
   901:| `BrowserStackFrame`                 | interface | `{ url, function, line, column }`                                                   
   902:| `BrowserStorageEntry`               | interface | `{ name, value }`                                                                   
   904:| `BrowserStorageOptions`             | interface | `{ origins? }`                                                                      
   905:| `BrowserStorageOrigin`              | interface | `{ origin, local, session }`                                                        
   906:| `BrowserStorageState`               | interface | `{ cookies, origins }`                                                              
   907:| `BrowserStreamChunk`                | interface | `{ bytes, eof }`                                                                    
   908:| `BrowserStyleCoverage`              | interface | `{ id, ranges }`                                                                    
   910:| `BrowserTextOptions`                | interface | `{ exact? }`                                                                        
   911:| `BrowserTiming`                     | interface | `{ request, proxy, dns, connect, ssl, send, receive }`                              
   912:| `BrowserTimingRange`                | interface | `{ start, end }`                                                                    
   915:| `BrowserTracingOptions`             | interface | `{ path?, categories?, screenshots?, sampling? }`                                   
   916:| `BrowserTracingResult`              | interface | `{ bytes, path }`                                                                   
   920:| `BrowserUserAgent`                  | interface | `{ value, language?, platform? }`                                                   
   922:| `BrowserWebSocketFrame`             | interface | `{ opcode, data, masked, timestamp }`                                               
   Interface rows spelling a member's type:
   (none)
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
   464: CONSTANTS TABLE WITHOUT Shape under 'Extended constants' (Ruling 18: heads Shape with the declared type, under the constants sentence)
   Extended interfaces (Ruling 21: the cell names the parent before `plus` and the added members after; the table's sentence gains "An extended interface's name comes before `plus`, with the members it adds after."):
   src/core/types.ts:308:export interface BrowserClickOptions extends BrowserInputOptions {
   src/core/types.ts:320:export interface BrowserDragOptions extends BrowserInputOptions {
   src/core/types.ts:331:export interface BrowserPointerOptions extends BrowserActionOptions {
   src/core/types.ts:336:export interface BrowserLocatorClickOptions extends BrowserPointerOptions, BrowserClickOptions {}
   src/core/types.ts:339:export interface BrowserLocatorDragOptions extends BrowserPointerOptions, BrowserDragOptions {}
   src/core/types.ts:342:export interface BrowserLocatorTypeOptions extends BrowserActionOptions, BrowserInputOptions {}
   src/core/types.ts:355:export interface BrowserWaitOptions extends BrowserActionOptions {
   src/core/types.ts:730:export interface BrowserUploadOptions extends BrowserActionOptions {
   src/core/types.ts:1291:export interface BrowserHARCookie extends BrowserHARValue {
   src/core/types.ts:1928:export interface BrowserSnapshotInterface extends BrowserSnapshotInput {
   src/core/types.ts:2041:export interface BrowserPageInterface extends BrowserFrameInterface {
2. **Member references.** Doc blocks writing `{@link Owner#member}` or `{@link #member}`; the final readers compare them as `Owner#member` and `#member`, so a cell written by the earlier readers may read `member` alone. Run `npm run docs`; where a row disagrees on such a link, `npm run docs -- --to guide` then `npx oxfmt --write guides/browser.md`. Sites:
   (none)
3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts` from its `const root = ` line through the manifest loop's closing brace equals the pilot's same region byte for byte — `new URL('../', import.meta.url)`, `/Interface$/` with no flag, the pilot's comments, no per-case budget, `findDrift` called inside the `it` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's `describe` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the `INTERNAL` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
```text
(no difference)
```
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): 3c3;< // package's own, as is the executed section that closes the file.;---;> // package's own, and are the only part a sibling package changes.. The `INTERNAL` block carries the pilot's sentence (1 = yes): 1
   Lines naming a budget or the `findDrift` call: 193:			for (const drift of findDrift(guide, source)) {
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
   2067: ### Automate a page end-to-end -> fence at 2069
   2084: ### Record and replay interactions with codegen -> fence at 2086
5. **A comment the fix round could not reach (report-only patch, granted here).** `src/server/helpers.ts:330-331` reads `// Caller-supplied args come first so a script path (for example \`node <script>\`,` and `// as an early positional argv entry ahead of the CDP flags that follow —` (the fix report's § Off-limits patch: `FIRST` lowered, `below` replaced); no other byte of that file changes.
6. **Propagation.** `npx oxfmt --write guides/browser.md tests/guides.test.ts`; `npm run docs` at `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` at `written: 0`.

## Facts read on this tip

- `npm run docs` under the installed head start:
```text
rows read: 1, disagreements found: 0
exit 0
```
- Table headers:
   56: | API | Kind | Summary |
   63: | API | Kind | Summary |
   76: | Constant | Kind | Shape | Summary |
   130: | API | Kind | Summary |
   225: | Type | Kind | Shape | Summary |
   288: | API | Kind | Summary |
   296: | API | Kind | Summary |
   306: | Constant | Kind | Shape | Summary |
   361: | API | Kind | Summary |
   440: | Type | Kind | Shape | Summary |
   464: | API | Kind | Summary |
   476: | API | Kind | Summary |
   503: | API | Kind | Summary |
   790: | API | Kind | Shape | Summary |
   967: | Method | Returns | Summary |
   994: | Method | Returns | Summary |
   1021: | Method | Returns | Summary |
   1045: | Method | Returns | Summary |
   1091: | Method | Returns | Summary |
   1151: | Method | Returns | Summary |
   1202: | Method | Returns | Summary |
   1228: | Method | Returns | Summary |
   1246: | Method | Returns | Summary |
   1282: | Method | Returns | Summary |
   1310: | Method | Returns | Summary |
   1333: | Method | Returns | Summary |
   1349: | Method | Returns | Summary |
   1365: | Method | Returns | Summary |
   1387: | Method | Returns | Summary |
   1408: | Method | Returns | Summary |
   1421: | Method | Returns | Summary |
   1437: | Method | Returns | Summary |
   1453: | Method | Returns | Summary |
   1466: | Method | Returns | Summary |
   1483: | Method | Returns | Summary |
   1495: | Method | Returns | Summary |
   1516: | Method | Returns | Summary |
   1580: | Method | Returns | Summary |
   1603: | Method | Returns | Summary |
   1624: | Method | Returns | Summary |
   1646: | Method | Returns | Summary |
   1659: | Method | Returns | Summary |
   1675: | Method | Returns | Summary |
   1692: | Method | Returns | Summary |
   1713: | Method | Returns | Summary |
   1733: | Method | Returns | Summary |
   1753: | Method | Returns | Summary |
   1786: | Method | Returns | Summary |
   1802: | Method | Returns | Summary |
   1818: | Method | Returns | Summary |
   1836: | Method | Returns | Summary |

## Scope

Owned: `guides/browser.md`, `tests/guides.test.ts`, the doc blocks under `src/**` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read, and the two comment lines item 5 names in `src/server/helpers.ts` (no code token moves). Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and `src/**` code.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. Every table carrying `Shape` has its canonical sentence between its heading and the table; `grep -n '| interface *| `{[^`]*:' guides/browser.md` and `grep -n '…' guides/browser.md` print nothing in a `Shape` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. `npx oxfmt --check guides/browser.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
5. `npm run docs` at zero; both write directions at `written: 0`.
6. `npm run test:guides` exit 0 (the equality case under the default budget) and `npm run test:policy` exit 0; record the summaries.

## Output

`/home/user/scaffold/tmp/units/d7n-browser-close-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a `Shape` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement `--to guide` does not close. Decide ancillary matters and record them.
