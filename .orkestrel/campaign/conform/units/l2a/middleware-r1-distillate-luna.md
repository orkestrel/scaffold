## Question

For every row, map the current tree, touching diff, old-form sweep, report reading, and proof reading.

## Evidence

### Per-row evidence

1. **middleware-obj-1**
   - **Site now:** `src/core/stores/DatabaseSessionStore.ts:9-11`: `TableInterface` type import, `Session` type import, then `helpers.js` value import. `src/server/middlewares.ts:9-11`: `MiddlewareHandler` type import precedes `@src/core` value import. The former test import no longer exists in `tests/src/server/helpers.test.ts`; it moved to `tests/src/server/parsers.test.ts:1`.
   - **Diff:** `conform-middleware.diff:499` (`@@ -1,13 +1,14 @@`), `:709` (`@@ -7,11 +7,11 @@`), and `:2928` (`@@ -23,11 +24,7 @@`). The operative type-import moves are present in `+` lines.
   - **Old form sweep:** ordered-import sweep over `src/**` and `tests/**`: no type import follows a value import.
   - **Report:** `conform-middleware-report.md:18` says “Type imports precede value imports in all three named files.” The cited current lines match.
   - **Proof:** Placement row; the report records the ordered-import sweep, with no behavioral control required.

2. **middleware-obj-2**
   - **Site now:** `tests/setupServer.ts:219-222` and `:263-266` use returned-object shorthand `destroy()` methods. `tests/src/core/stores/DatabaseSessionStore.test.ts:24-34` has `restore` and `isAuthorized` at module scope; constructor calls are inlined at `:39-82`. `tests/src/core/middlewares.test.ts:549-560` registers and removes `unhandled.handler`.
   - **Diff:** `conform-middleware.diff:1377` (`@@ -161,17 +211,15 @@`), `:1410` (`@@ -209,12 +257,14 @@`), `:2346` (`@@ -9,50 +9,81 @@`), `:2455` (`@@ -136,13 +167,6 @@`), `:2469` (`@@ -153,10 +177,6 @@`), `:2079` (`@@ -556,9 +544,10 @@`), and `:2093` (`@@ -566,9 +555,9 @@`). The operative repairs are present. The additional `compress` repair is at `:1752` (`@@ -480,26 +355,22 @@`).
   - **Old form sweep:** `function destroy`, `const build =`, and `const onUnhandled =` across `tests/**`: no hit. `const restore` and `const isAuthorized` occur only at module scope, `tests/src/core/stores/DatabaseSessionStore.test.ts:24` and `:32`.
   - **Report:** `conform-middleware-report.md:19` says “`tests/setupServer.ts` returns object-literal shorthand `destroy()` methods ... `restore` ... / `isAuthorized` ... at module scope ... `createRecorder<[unknown]>()` ...”. The cited current sites match.
   - **Proof:** The report names `/home/user/work/evidence/middleware-proofs/obj-2-3-4-src-after.txt`, whose summary is “Test Files 11 passed (11)” and “Tests 434 passed | 1 skipped (435)”; `obj-2-compress-after.txt` records “Test Files 7 passed (7)” and “Tests 270 passed (270)”. No failing-first count is recorded for this row.

3. **middleware-obj-3**
   - **Site now:** `tests/src/core/validators.test.ts:1-4` mirrors `src/core/validators.ts`; `tests/src/server/parsers.test.ts:1-4` mirrors `src/server/parsers.ts`; `tests/src/server/MultipartParser.test.ts:1-6` imports the interned class relatively. The moved assertions no longer occur in the two `helpers.test.ts` files. Guide rows are at `guides/middleware.md:833-838`, `:862-868`, and `:870-873`.
   - **Diff:** New-file hunks `conform-middleware.diff:2500` (`@@ -0,0 +1,148 @@`), `:2654` (`@@ -0,0 +1,247 @@`), and `:3874` (`@@ -0,0 +1,708 @@`); assertion-removal hunks `:1644` (`@@ -299,107 +275,6 @@`) and `:2968` (`@@ -335,663 +333,25 @@`). The new mirrored tests and guide rows are present.
   - **Old form sweep:** guard imports/assertions in `tests/src/core/helpers.test.ts` and `parseMultipartRequest` imports/assertions in `tests/src/server/helpers.test.ts`: no stale hit.
   - **Report:** `conform-middleware-report.md:20` says the three files exist, the assertions moved, and the guide rows name them. The current files and rows match.
   - **Proof:** `obj-2-3-4-src-after.txt` records “Test Files 11 passed (11)” and “Tests 434 passed | 1 skipped (435)”. No failing-first count is recorded.

4. **middleware-obj-4**
   - **Site now:** `tests/setup.ts:27`, `:270`, `:299`, `:322`, and `:363` export the consolidated helpers. `tests/setup.test.ts:231`, `:239`, `:247`, `:266`, and `:286` test them. `tests/src/core/helpers.test.ts:1-27` imports shared helpers and declares no local `buildContext` or `decompress`. `tests/src/core/middlewares.test.ts:35-47` imports shared helpers. `tests/src/core/stores/DatabaseSessionStore.test.ts:12` imports `buildStore`. The local `SECRET` declarations are absent.
   - **Diff:** `conform-middleware.diff:949` (`@@ -1,22 +1,34 @@`), `:1051` (`@@ -203,7 +214,7 @@`), `:1060` (`@@ -247,3 +258,113 @@`), `:833` (`@@ -1,16 +1,21 @@`), `:856` (`@@ -222,3 +227,88 @@`), `:1593` (`@@ -1,4 +1,3 @@`), `:1609` (`@@ -25,31 +21,11 @@`), `:2012` (`@@ -6,11 +6,10 @@`), `:2047` (`@@ -170,21 +171,8 @@`), and `:2346` (`@@ -9,50 +9,81 @@`). The operative shared-helper exports and setup proofs are present.
   - **Old form sweep:** local `buildContext`, local `decompress`, local `SECRET`, and local declarations of `createTestTransport`, `buildStore`, and `compressibleBody`: no hit.
   - **Report:** `conform-middleware-report.md:21` says the helpers are exported and tested from setup files, with local declarations removed. The cited current sites match.
   - **Proof:** `obj-4-setup-after.txt` records “Test Files 2 passed (2)” and “Tests 35 passed (35)”; `obj-2-3-4-src-after.txt` records “Tests 434 passed | 1 skipped (435)”. No failing-first count is recorded.

5. **middleware-obj-5**
   - **Site now:** `src/server/types.ts:199-213` declares `ByteRange`; `src/server/helpers.ts:524` documents it and `:532-535` uses `range?: ByteRange`. The guide Surface row is `guides/middleware.md:125`.
   - **Diff:** `conform-middleware.diff:586` (`@@ -1,10 +1,10 @@`), `:673` (`@@ -532,7 +531,7 @@`), `:785` (`@@ -196,28 +196,20 @@`), and `:90` (`@@ -69,59 +69,60 @@`). The `ByteRange` declaration, import, signature, and guide row are present.
   - **Old form sweep:** `range?: { readonly start: number; readonly end: number }` across `src/**` and guides: no hit.
   - **Report:** `conform-middleware-report.md:22` says `ByteRange` is declared, imported, used, and documented. The cited current lines match.
   - **Proof:** Placement row; `guides-after.txt` records “Test Files 1 passed (1)” and “Tests 38 passed (38)”.

6. **middleware-obj-6**
   - **Site now:** `src/server/types.ts:179-181` retains `UploadedFile`; the `UploadedFileInput` declaration is absent. `src/server/helpers.ts:465` reads `createUploadedFile(input: UploadedFile): UploadedFile`. The guide has no `UploadedFileInput` row.
   - **Diff:** `conform-middleware.diff:789` (`@@ -196,28 +196,20 @@`) removes the type block; `:622` (`@@ -462,7 +462,7 @@`) changes the factory parameter; `:90` (`@@ -69,59 +69,60 @@`) removes the guide row. The operative replacement is present.
   - **Old form sweep:** case-insensitive `uploadedfileinputs?` across `src`, `tests`, `guides/middleware.md`, `guides/README.md`, and `README.md`: no hit.
   - **Report:** `conform-middleware-report.md:23` says “BREAKING” and records deletion of `UploadedFileInput`, the new factory signature, and an empty sweep. The cited current lines match.
   - **Proof:** Placement/naming row; `guides-after.txt` records “Tests 38 passed (38)”.

7. **middleware-obj-7**
   - **Site now:** `tests/src/server/helpers.test.ts:550-574` uses `it.runIf(secondDevice !== undefined)` and creates the target under the probed device. `tests/setupServer.ts:56-70` defines `resolveSecondDevicePath`. `src/server/helpers.ts:603-608` documents the host-dependent proof condition.
   - **Diff:** `conform-middleware.diff:682` (`@@ -604,7 +603,9 @@`), `:3662` (`@@ -1183,8 +543,41 @@`), and `:1270`/`:1297` add the probe. The `it.todo` deletion and runtime-gated proof are present.
   - **Old form sweep:** `it\.todo\(` across the package: no hit.
   - **Report:** `conform-middleware-report.md:24` says the todo is gone, the probe is used, and the host case ran. The cited current lines match.
   - **Proof:** `/home/user/work/evidence/middleware-proofs/obj-7-exdev-before.txt` records “1 failed | 163 passed | 1 skipped (165)” for the EXDEV case. `obj-7-exdev-after.txt` records “Test Files 4 passed (4)” and “Tests 164 passed | 1 skipped (165)”. `obj-7-exdev-skipreading.txt` records “Test Files 1 passed (1)” and “Tests 79 passed | 1 skipped (80)”, including the passing EXDEV case.

8. **middleware-subj-1**
   - **Site now:** `guides/middleware.md:3-17` uses “one guide per package” and “supplying mechanism rather than product policy”; `:880` links to `AGENTS.md`. `guides/README.md:3-4` and `:44` contain no section-number citation. The listed test headers and comments use plain descriptions, including `tests/setup.ts:14`, `:30`, `:49`, `:112`, `:150`, `:216`; `tests/setupServer.ts:10`, `:122`, `:184`, `:322`, `:388`; and the five listed test headers.
   - **Diff:** Guide and test hunks at `conform-middleware.diff:24`, `:33`, `:57`, `:67`, `:199`, `:208`, `:226`, `:381`, `:949`, `:1178`, `:1270`, `:1491`, `:1509`, `:1589`, `:2012`, `:2342`, and `:2484`. The replacement text is present.
   - **Old form sweep:** `AGENTS\s*§` and the listed bare AGENTS section forms across `src`, `tests`, guides, and README: no hit. The remaining `Contract §3–4`, `§7`, `§9`, and `§17` are guide-internal references; `RFC 9110 §9.3.2` remains as an external specification reference.
   - **Report:** `conform-middleware-report.md:25` says no forbidden section citations remain and the AGENTS link is present. The cited current lines match.
   - **Proof:** Documentation row; `guides-after.txt` records “Tests 38 passed (38)”.

9. **middleware-subj-2**
   - **Site now:** `guides/middleware.md:360` is `### The ordering doctrine`; `:406` is `### The security acceptance bar, as documented behavior`; `:403` names “the security acceptance bar's CSRF item”; `:517` says “The full ordering doctrine”; `:817` uses `(Contract §17)`; `:857` names “the security acceptance bar's invariants”.
   - **Diff:** Hunk headers `conform-middleware.diff:235`, `:251`, `:266`, `:275`, `:293`, and `:302`. The amended replacements are present.
   - **Old form sweep:** case-insensitive `PROPOSAL` across the package: no hit.
   - **Report:** `conform-middleware-report.md:26` lists the six replacements and says no `PROPOSAL` remains. The cited current lines match.
   - **Proof:** Documentation row; `guides-after.txt` records “Tests 38 passed (38)”.

10. **middleware-subj-3**
    - **Site now:** `guides/middleware.md:4-8` enumerates the factories without the word `thirteen`.
    - **Diff:** `conform-middleware.diff:57` (`@@ -1,7 +1,7 @@`). The `+` lines delete only the count and adjust spacing.
    - **Old form sweep:** `\bthirteen\b` across the package: no hit.
    - **Report:** `conform-middleware-report.md:27` says the word is gone and the enumeration is unchanged. The current tagline matches.
    - **Proof:** Documentation row; `guides-after.txt` records “Tests 38 passed (38)”.

11. **middleware-subj-4**
    - **Site now:** `guides/README.md:34-40` names every local mirror; `guides/middleware.md:882` says “Its mirrored guide is [`server.md`](server.md).”
    - **Diff:** `conform-middleware.diff:33` (`@@ -31,11 +31,14 @@`) and `:381` (`@@ -862,12 +877,9 @@`). The mirror list and relative link are present.
    - **Old form sweep:** `not mirrored here`, `own repository`, and `Its guide lives in its own repository`: no hit. Every named mirror path exists under `guides/`.
    - **Report:** `conform-middleware-report.md:28` says the dependency paragraph names all mirrors and the server guide uses the local link. The cited current lines match.
    - **Proof:** Documentation row; `guides-after.txt` records “Tests 38 passed (38)”.

12. **middleware-subj-5**
    - **Site now:** `README.md:19` reads `- Node.js >= 22.12.0`; `package.json:122-124` remains the matching engine declaration.
    - **Diff:** `conform-middleware.diff:5` (`@@ -16,11 +16,11 @@`). The exact replacement appears in a `+` line.
    - **Old form sweep:** `Node\.js >= 24` across the package: no hit.
    - **Report:** `conform-middleware-report.md:29` says the README matches the manifest and the manifest is untouched. The cited current lines match.
    - **Proof:** Documentation row; no behavioral control required.

13. **middleware-subj-6**
    - **Site now:** `README.md:22-23` reads “Dual ESM and CommonJS entries: the core (`.`) and the node face (`./server`), which carries the node-bound batteries”.
    - **Diff:** `conform-middleware.diff:5` (`@@ -16,11 +16,11 @@`). The amended two-entry wording is present.
    - **Old form sweep:** `ESM core`, `CJS node face`, and the old “for the node-bound batteries” wording: no stale hit.
    - **Report:** `conform-middleware-report.md:30` records the amended wording and says the three-name finder list was not adopted. The current README matches.
    - **Proof:** Documentation row; no behavioral control required.

14. **middleware-subj-7**
    - **Site now:** `guides/middleware.md:207` says “Each guard in the following table is total”; `:284-285` says “stay Surface rows in the preceding section”; `src/server/middlewares.ts:239` says “a handle opened later in this function”. The other two pointer sites were removed by rows 9 and 11.
    - **Diff:** `conform-middleware.diff:208` (`@@ -203,7 +204,7 @@`), `:217` (`@@ -281,7 +282,7 @@`), and `:731` (`@@ -236,9 +236,10 @@`). The added source comment repair is present.
    - **Old form sweep:** pointer-specific `above|below` hits: no hit. Raw permitted hits remain at `guides/middleware.md:373`, `:824`; `src/core/helpers.ts:397`; `tests/src/core/helpers.test.ts:358`, `:381`, `:460`, `:497`; `tests/src/core/middlewares.test.ts:1936`; `tests/src/core/stores/DatabaseSessionStore.test.ts:23`; `tests/setup.test.ts:302`; `tests/src/server/MultipartParser.test.ts:110`; `tests/src/core/stores/MemorySessionStore.test.ts:130`; `tests/src/server/middlewares.test.ts:1159`, `:1182`; `tests/guides.test.ts:2`, `:40`; and vendored policy text at `tests/setupPolicy.ts:2098` and `tests/policy.test.ts:544`.
    - **Report:** `conform-middleware-report.md:31` says only the onion-position and numeric-comparison uses remain. Its narrower sweep agrees for the guide/source population; the broader test sweep also finds permitted prose uses.
    - **Proof:** Documentation row; `guides-after.txt` records “Tests 38 passed (38)”.

15. **middleware-subj-8**
    - **Site now:** `guides/middleware.md:600-607` keeps the `BodyState` requirement without migration language; `:735` is `Multipart processing reports no progress.`; `src/core/middlewares.ts:640-641` no longer names `createBodyParser`.
    - **Diff:** `conform-middleware.diff:302` (`@@ -598,11 +600,11 @@`), `:319` (`@@ -730,8 +732,7 @@`), and `:467` (`@@ -638,8 +638,7 @@`). The requirement-preserving wording is present.
    - **Old form sweep:** `createbodyparser` across the package: no hit.
    - **Report:** `conform-middleware-report.md:32` records the restated `BodyState` requirement, the shortened multipart note, and removal of the deleted symbol. The cited current lines match.
    - **Proof:** Documentation row; `guides-after.txt` records “Tests 38 passed (38)”.

16. **middleware-subj-9**
    - **Site now:** The listed source sites use `through`: `src/core/types.ts:165-166`, `:460`; `src/core/helpers.ts:395`, `:398`; `src/core/middlewares.ts:861`, `:886`; `src/server/parsers.ts:12`; `src/server/middlewares.ts:452`; `src/server/helpers.ts:518`; and guide rows `guides/middleware.md:53`, `:416`, `:496`. The listed test titles/comments also use replacements.
    - **Diff:** Source and guide hunks at `conform-middleware.diff:536`, `:547`, `:573`, `:425`, `:441`, `:454`, `:458`, `:477`, `:486`, `:754`; test rewrites at `:2012`, `:2219`, `:2300`, `:3823`, and `:3857`. The replacement text is present.
    - **Old form sweep:** case-insensitive `\bvia\b` across `src/**`, `tests/**`, `guides/middleware.md`, `guides/README.md`, and `README.md`: no hit.
    - **Report:** `conform-middleware-report.md:33` says the source, guide, and test populations are all closed. The current sweep agrees.
    - **Proof:** Documentation/writing row; no behavioral control required.

17. **middleware-subj-10**
    - **Site now:** `src/core/helpers.ts:283`, `src/core/middlewares.ts:365`, `src/server/middlewares.ts:183`, and `src/server/helpers.ts:513`, `:522` use `for example`; `tests/src/server/helpers.test.ts:525` also uses `for example`.
    - **Diff:** Hunk headers `conform-middleware.diff:425`, `:458`, `:722`, `:640`, and `:3653`. The replacement text is present.
    - **Old form sweep:** `e\.g\.|i\.e\.` case-insensitively across the package: no hit.
    - **Report:** `conform-middleware-report.md:34` records zero abbreviation hits and the added test-title replacement. The current sweep agrees.
    - **Proof:** Documentation/writing row; no behavioral control required.

18. **middleware-subj-11**
    - **Site now:** `src/server/helpers.ts:508` omits `simply`; `src/core/types.ts:226` and `guides/middleware.md:424` say `not only insertion`; `guides/middleware.md:375` says `is another throw the boundary maps cleanly`.
    - **Diff:** Hunk headers `conform-middleware.diff:640`, `:547`, `:242`, and `:251`. The operative replacements are present.
    - **Old form sweep:** case-insensitive `\bsimply\b|\beasy\b|\beasier\b|\bjust\b` across the package: no hit.
    - **Report:** `conform-middleware-report.md:35` records zero banned-sense hits and the guide replacement. The current sweep agrees.
    - **Proof:** Documentation/writing row; no behavioral control required.

19. **middleware-subj-12**
    - **Site now:** `src/core/helpers.ts:289` reads “the response must be left untouched”; `tests/setupServer.ts:184` says “still served normally”; `tests/src/server/helpers.test.ts:525` uses “for example” and contains no `should`.
    - **Diff:** `conform-middleware.diff:425` (`@@ -280,13 +280,13 @@`), `:1362` (`@@ -131,10 +181,10 @@`), and `:3653` (`@@ -1162,7 +522,7 @@`). The replacement text is present.
    - **Old form sweep:** word-boundary `\bshould\b` across the package: no hit; `shouldMint` is not a word-boundary hit.
    - **Report:** `conform-middleware-report.md:36` records zero hits and names the two added-site repairs. The current sweep agrees.
    - **Proof:** Documentation/writing row; no behavioral control required.

20. **middleware-subj-13**
    - **Site now:** `src/server/helpers.ts:516` says “When `source` is a `FileHandle`”; `:519` says “a `FileHandle` passed as `source`”; the signature at `:532-535` names `source`.
    - **Diff:** `conform-middleware.diff:640` (`@@ -494,24 +505,23 @@`). Both exact replacements appear in `+` lines.
    - **Old form sweep:** `When \`path\` is a \`FileHandle\`` and `a handle passed here`: no hit.
    - **Report:** `conform-middleware-report.md:37` says both remarks now name the signature parameter. The cited current lines match.
    - **Proof:** Documentation row; no behavioral control required.

21. **middleware-subj-14**
    - **Site now:** `src/server/helpers.ts:371-375` declares and exemplifies `extractMultipartBoundary`; `src/server/parsers.ts:4`, `:56`, `guides/middleware.md:232`, and `tests/src/server/helpers.test.ts:14`, `:336-354` use the new name.
    - **Diff:** `conform-middleware.diff:607` (`@@ -368,11 +368,11 @@`), `:758` (`@@ -1,7 +1,7 @@`), `:776` (`@@ -53,7 +53,7 @@`), `:207` (`@@ -228,7 +229,7 @@`), and `:2906`/`:2928` move the test import and assertions. The amended `extractMultipartBoundary` text is present.
    - **Old form sweep:** case-sensitive `\bmultipartBoundary\b`: no hit. Case-insensitive `multipartboundar(y|ies|ied|ying)` hits only the new `extractMultipartBoundary` name at `src/server/helpers.ts:371`, `:372`, `:375`; `tests/src/server/helpers.test.ts:14`, `:336`, `:338`, `:340`, `:344`, `:348`, `:352`, `:353`, `:354`; `src/server/parsers.ts:4`, `:56`; and `guides/middleware.md:232`.
    - **Report:** `conform-middleware-report.md:38` marks this breaking rename and records the new call sites and sweeps. The cited current lines match.
    - **Proof:** Naming row; no behavioral control required.

22. **middleware-subj-17**
    - **Site now:** `src/core/types.ts:457` declares `SessionRestoreFunction`; `src/core/stores/DatabaseSessionStore.ts:54` and `:61` use it; `guides/middleware.md:107` documents it.
    - **Diff:** `conform-middleware.diff:556` (`@@ -446,6 +446,16 @@`) adds the alias; `:515` (`@@ -50,14 +51,14 @@`) replaces both inline types; `:90` (`@@ -69,59 +69,60 @@`) adds the guide row. The exact alias and usage are present.
    - **Old form sweep:** inline `(value: unknown) => SessionInterface | undefined` in `DatabaseSessionStore.ts`: no hit; the only declaration is the named alias.
    - **Report:** `conform-middleware-report.md:39` records the prescribed alias, both usages, and guide row. The cited current lines match.
    - **Proof:** Placement row; `guides-after.txt` records “Tests 38 passed (38)”.

### Fleet rows

- **fleet-F1:** `tests/setup.ts` and `tests/setup.test.ts` contain no `isBrowserVuePath`; no `src/browser`, `app/browser`, or `tests/setupBrowser.ts` path exists. The report’s `noop` at `conform-middleware-report.md:40` matches. `test:setup` control records “Test Files 2 passed (2)” and “Tests 35 passed (35)” in `obj-7-setupserver-after.txt`; no edit is needed.
- **fleet-F2:** `src/core/Session.ts:22` has `readonly #id: string`, `:30` has the first getter `get id(): string`, and the constructor assigns it at `:26`. `SessionInterface.id` remains at `src/core/types.ts:312`. The report’s `applied` entry at `conform-middleware-report.md:41` matches. `JSON.stringify` finds only request-body and distribution-proof uses, not a `Session` instance. No other implementation class has a public `id` field ahead of private fields.

### Across the unit

- **Scope:** Every status path is `[owned]`: `README.md`, `guides/README.md`, `guides/middleware.md`, `src/core/Session.ts`, `src/core/helpers.ts`, `src/core/middlewares.ts`, `src/core/stores/DatabaseSessionStore.ts`, `src/core/types.ts`, `src/server/helpers.ts`, `src/server/middlewares.ts`, `src/server/parsers.ts`, `src/server/types.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src/core/Session.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/middlewares.test.ts`, `tests/src/core/stores/DatabaseSessionStore.test.ts`, `tests/src/core/stores/MemorySessionStore.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/server/MultipartParser.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/server/middlewares.test.ts`, and `tests/src/server/parsers.test.ts`. No `[shared]` or `[off-limits]` status path appears.
- **Unscoped diff hunks:** None. Every diff file is named by at least one row’s `Where`; therefore no `file @@ hunk` remains outside row-named files.
- **Diff residue sweep:** Pattern `^\+.*(\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger)` over `conform-middleware.diff`: `conform-middleware.diff:44` (`+set: ... timeout.md`) and `:542` (`+ * - \`ms\` — ... @orkestrel/timeout ...`). No skip, only, todo, retry, TODO, FIXME, console, or debugger addition occurs.
- **Tree residue sweep:** Pattern `(\.skip\(|\.only\(|\.todo\(|\bretry\b|\btimeout\b|TODO|FIXME|console\.|debugger)` over `src/**` and `tests/**`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, hits:
  - `src/server/helpers.ts:207` — `console.js`
  - `src/core/middlewares.ts:146`, `:382-384`, `:617` — example `console.log`, timeout code, retry-after header
  - `src/core/helpers.ts:528` — timeout documentation
  - `src/core/stores/DatabaseSessionStore.ts:15` — timeout documentation
  - `src/core/stores/MemorySessionStore.ts:13`, `:95` — timeout documentation
  - `src/core/factories.ts:90` — timeout documentation
  - `src/core/types.ts:165`, `:391`, `:489`, `:549` — timeout documentation
  - `src/server/errors.ts:60` — example `console.log`
  - `tests/src/core/middlewares.test.ts:878` — `retry-after`
  - `tests/src/server/helpers.test.ts:238` — `console.js`
  - `tests/src/server/middlewares.test.ts:395`, `:1321` — `console.js`, `retry-after`
- **Parity:** `SessionInterface` at `src/core/types.ts:311-316` declares readonly `id`, readonly `state`, and methods `set`, `delete`, `clear`; `guides/middleware.md:299-307` lists `set`, `delete`, `clear`, while `guides/middleware.md:91` carries `id` and `state` in Surface. `SessionControlInterface` at `:329-331` declares `regenerate`, `destroy`; the guide lists both at `:310-317`. `SessionStoreInterface` at `:379-382` declares `get`, `set`, `delete`; the guide lists all at `:322-333`. `SessionTransportInterface` at `:473-476` declares `read`, `write`, `clear`; the guide lists all at `:334-344`. `AssetSourceInterface.read` at `src/server/types.ts:32` matches the guide row at `guides/middleware.md:294`.
  - Added guide-sentence identifiers resolve as follows: local exports `createBearer`, `createSession`, `createCSRF`, `createBody`, `BodyState`, `SessionRestoreFunction`, `streamFile`, `moveUploadedFile`, and `parseMultipartRequest` are exported by `src/core/index.ts` or `src/server/index.ts`; peer identifiers `MiddlewareHandler`, `MiddlewareContext`, `compose`, `verifyToken`, `@orkestrel/server`, `@orkestrel/contract`, `@orkestrel/budget`, `@orkestrel/abort`, and `@orkestrel/timeout` are intentionally peer-package references; `AGENTS.md`, `server.md`, and `README.md` are file links; `TState`, `SomeState`, `body`, `source`, and `range` are type, placeholder, property, or parameter tokens rather than barrel exports.
- **Gates:** The report’s § Gates table at `conform-middleware-report.md:85-91` records:
  - `npm --prefix /home/user/fleet/middleware run format:check` — exit `0`
  - `npm --prefix /home/user/fleet/middleware run lint:check` — exit `0`
  - `npm --prefix /home/user/fleet/middleware run check` — exit `0`
  - `npm --prefix /home/user/fleet/middleware run build` — exit `0`
  - `npm --prefix /home/user/fleet/middleware test` — exit `0`
- **Breaking:** `UploadedFileInput` is removed and `multipartBoundary` is renamed. Word-boundary sweeps over fleet `*/src`, `*/tests`, scaffold `src`, and guide mirrors find no old-name hits. No fleet package declares `@orkestrel/middleware`; registry consumer edits are documented at `conform-middleware-report.md:165-202`.
- **Writing sweep:** Pattern `^\+.*\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` plus the growable-count pattern over added prose lines in `guides/**`, `README.md`, source doc comments, and test titles/comments: no hits after excluding code lines. The added prose uses `through`, `for example`, `preceding`, and `following`.

## Distillate

- `middleware-obj-1: site now type imports precede values | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-2: nested declarations removed and recorder has stable handler | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-3: mirrored validator/parser/parser-class tests exist | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-4: shared helpers live in setup files with setup proofs | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-5: ByteRange is named, used, and documented | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-6: UploadedFileInput removed; UploadedFile retained | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-7: runtime device probe gates a real EXDEV proof | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-1: AGENTS section citations removed; links retained | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-2: PROPOSAL references replaced with guide-local references | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-3: thirteen removed from tagline | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-4: dependency mirrors are named accurately | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-5: README engine matches package manifest | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-6: README describes dual-format core and server entries | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-7: pointer uses repaired; raw permitted above/below hits remain | diff present yes | old pointer hits 0 | report matches yes`
- `middleware-subj-8: migration/speculation residue removed while BodyState requirement remains | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-9: via replaced across source, guides, and tests | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-10: e.g./i.e. replaced | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-11: banned merely-sense words removed | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-12: should replaced with must or equivalent | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-13: streamFile documentation names source | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-14: multipartBoundary renamed to extractMultipartBoundary | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-17: SessionRestoreFunction centralizes the restore contract | diff present yes | old form hits 0 | report matches yes`
- `fleet-F1: absent browser helper remains absent | diff present no | old form hits 0 | report matches yes`
- `fleet-F2: Session id uses private storage and getter | diff present yes | old form hits 0 | report matches yes`

Scope tags: every status entry is `[owned]`; shared and off-limits sets have no entries.

Residue hits: diff additions contain only the two `timeout` path/documentation matches listed above. Tree hits are the runtime/documentation `console`, `timeout`, and `retry-after` matches listed above; no added skip, only, todo, TODO, FIXME, or debugger residue appears.

Writing hits: none in the scoped added prose.

Parity: `SessionInterface` → `id`, `state`; `set`, `delete`, `clear` match guide Surface and Methods. `SessionControlInterface` → `regenerate`, `destroy` match. `SessionStoreInterface` → `get`, `set`, `delete` match. `SessionTransportInterface` → `read`, `write`, `clear` match. `AssetSourceInterface` → `read` matches. Added local identifiers resolve through the core/server barrels; peer and file-reference tokens resolve to their declared peers or paths.

## Unknowns

- Failing-first command and count are not recorded for `middleware-obj-2`, `middleware-obj-3`, or `middleware-obj-4`; only post-repair controls are present.
- No separate control file is named for the non-EXDEV behavioral portions of `middleware-obj-7`; the EXDEV before/after and verbose server controls are present and matching.
- The report’s broader `above|below` sweep omits permitted test and vendored-policy prose hits listed in Evidence; the row-specific pointer sweep agrees.

## Journal

Leave this line for the driver.

## Deviation

No tree change was made. All named inputs, evidence files, control files, and status entries were reachable. No sweep required by the brief was unavailable.