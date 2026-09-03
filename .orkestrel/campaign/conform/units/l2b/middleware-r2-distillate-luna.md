I’ll use the brief’s required source set and repository rules, then return only its named sections. All checks will remain read-only.## Question
For each conformance row, compare the current tree, its diff, old-form sweeps, report readings, and recorded proofs.

## Evidence

### Per-row evidence

1. **middleware-obj-1**
   - **Site now:** Type imports precede value imports in `src/core/stores/DatabaseSessionStore.ts:1-11` (`:10` is `Session`; `:11` begins the value import), `src/server/middlewares.ts:1-11` (`:10` is `MiddlewareHandler`; `:11` begins values), and `tests/src/server/parsers.test.ts:1-2` (the moved `MultipartPartInput` import). The old `helpers.test.ts:48` site no longer exists because its assertions moved.
   - **Diff:** `@@ -1,13 +1,14 @@`, `@@ -1,10 +1,10 @@`, and `@@ -1,16 +1,17 @@`; the repaired type-import text is present in added lines.
   - **Old form sweep:** `^import (type )?` over `src/**` and `tests/**`, excluding `node_modules`: no inversion.
   - **Report:** `applied`; “Type imports precede value imports in all three named files.” (`conform-middleware-report.md:18`). The current lines match.
   - **Proof:** Placement sweep recorded; no behavioural control required.

2. **middleware-obj-2**
   - **Site now:** `destroy()` shorthand methods are at `tests/setupServer.ts:219-222` and `:263-266`; `restore` and `isAuthorized` are module-scope declarations at `tests/src/core/stores/DatabaseSessionStore.test.ts:24-28` and `:32-33`; the listener uses `unhandled.handler` at `tests/src/core/middlewares.test.ts:547-559`; compression uses the shared `compressBytes` at `tests/src/core/helpers.test.ts:358-371`.
   - **Diff:** `@@ -161,17 +161,15 @@`, `@@ -209,12 +257,14 @@`, `@@ -542,9 +553,10 @@`, and the compression hunk `@@ -512,11 +499,16 @@`; repaired text is present.
   - **Old form sweep:** nested `function destroy`, nested `const build`, nested `const onUnhandled`, and nested `const compress` over `tests/**`: no hit.
   - **Report:** `applied`; it records the extra compression-site repair under the row (`conform-middleware-report.md:19`, `:219-238`). The current tree matches.
   - **Proof:** `obj-2-control-red.txt:30` — `1 failed | 16 skipped (17)`; `obj-2-control-green.txt:7` — `1 passed | 16 skipped (17)`. The extra compression placement has green evidence at `obj-2-compress-after.txt:10` — `270 passed`.

3. **middleware-obj-3**
   - **Site now:** `tests/src/core/validators.test.ts:1-148`, `tests/src/server/parsers.test.ts:1-708`, and `tests/src/server/MultipartParser.test.ts:1-247` exist. The former guard and parser assertions are absent from the two `helpers.test.ts` files.
   - **Diff:** new-file hunks `@@ -0,0 +1,148 @@`, `@@ -0,0 +1,708 @@`, and `@@ -0,0 +1,247 @@`; each required test population is present.
   - **Old form sweep:** guard imports/describes in `tests/src/core/helpers.test.ts` and `parseMultipartRequest` imports/assertions in `tests/src/server/helpers.test.ts`: no hit.
   - **Report:** `applied`; it names all three new files and the guide rows (`conform-middleware-report.md:20`). Current guide rows are `guides/middleware.md:835-871`.
   - **Proof:** validators: `obj-3-validators-control-red.txt:50` — `2 failed | 12 passed (14)`; green: `obj-3-validators-green.txt:7` — `14 passed (14)`. Parsers: `obj-3-parsers-control-red.txt:640` — `35 failed | 1 passed (36)`; green: `obj-3-parsers-green.txt:10` — `36 passed (36)`. Multipart parser: `obj-3-multipart-control-red.txt:30` — `1 failed | 7 passed (8)`; green: `obj-3-multipart-green.txt:10` — `8 passed (8)`.

4. **middleware-obj-4**
   - **Site now:** Shared exports are `TEST_SECRET` at `tests/setup.ts:27`, `decompress` at `:270`, `compressibleBody` at `:299`, `createTestTransport` at `:322`, and `buildStore` at `:363`. Their proofs are in `tests/setup.test.ts:231-302`; local duplicates and `buildContext` are gone.
   - **Diff:** setup hunk `@@ -247,3 +258,113 @@` and setup-test hunk `@@ -222,3 +227,88 @@`; all requested exports and describe blocks are added.
   - **Old form sweep:** `buildContext|const SECRET|local decompress|local createTestTransport|local buildStore|local compressibleBody`: no obsolete local declaration; fixture literals `SECRET=hidden` remain at `tests/setupServer.ts:145` and related assertions only.
   - **Report:** `applied`; it records all five shared helpers and setup tests (`conform-middleware-report.md:21`). Current exports and proofs match.
   - **Proof:** `obj-4-control-red.txt:30` — `1 failed | 17 skipped (19)`; green: `obj-4-control-green.txt:7` — `2 passed | 17 skipped (19)`; setup project: `obj-4-setup-after.txt:10` — `31 passed`.

5. **middleware-obj-5**
   - **Site now:** `ByteRange` is declared at `src/server/types.ts:200-212`; `streamFile` uses `range?: ByteRange` at `src/server/helpers.ts:532-535`; the guide row is `guides/middleware.md:125`.
   - **Diff:** `src/server/types.ts` hunk `@@ -196,8 +196,8 @@`; helpers hunk `@@ -532,7 +531,7 @@`; the `ByteRange` declaration and parameter replacement are present.
   - **Old form sweep:** inline `range?: { readonly start... }` over `src/**`: no hit.
   - **Report:** `applied`; it reports `ByteRange` at `src/server/types.ts:210` and the guide row (`conform-middleware-report.md:22`). Current lines match.
   - **Proof:** placement sweep and `guides-after.txt:10` — `38 passed`.

6. **middleware-obj-6**
   - **Site now:** `UploadedFile` remains at `src/server/types.ts:179-180`; `UploadedFileInput` is absent. `createUploadedFile(input: UploadedFile)` is at `src/server/helpers.ts:465`; its guide row is gone.
   - **Diff:** type deletion hunk `@@ -196,28 +196,20 @@` and helper hunk `@@ -462,7 +462,7 @@`; the new parameter type is present.
   - **Old form sweep:** `uploadedfileinputs?` case-insensitive over `src`, `tests`, both named guides, and `README.md`: no hit.
   - **Report:** `applied`, breaking; “`UploadedFileInput` is deleted” (`conform-middleware-report.md:23`). Current tree matches.
   - **Proof:** placement sweep recorded; no behavioural control required.

7. **middleware-obj-7**
   - **Site now:** `resolveSecondDevicePath` is exported at `tests/setupServer.ts:56`; the runtime probe is collected at `tests/src/server/helpers.test.ts:46`; `it.runIf(secondDevice !== undefined)` is at `:550`; the `EXDEV` remark is at `src/server/helpers.ts:607-608`.
   - **Diff:** setup hunk `@@ -21,6 +22,55 @@`; helper-test hunk `@@ -1183,8 +543,41 @@`; `it.todo` is replaced by the runtime-gated test.
   - **Old form sweep:** `it\.todo` over the package excluding `node_modules`: no hit.
   - **Report:** `applied`; it says the host has a second device and the case passed (`conform-middleware-report.md:24`). Current proof `obj-7-exdev-skipreading.txt:62` shows the EXDEV case passed.
   - **Proof:** before: `obj-7-exdev-before.txt:30` — `1 failed | 163 passed | 1 skipped (165)`; after: `obj-7-exdev-after.txt:10` — `164 passed | 1 skipped (165)`.

8. **middleware-subj-1**
   - **Site now:** The listed guide and test comments retain their substance without numbered AGENTS citations. Examples: `guides/middleware.md:3-16`, `guides/README.md:3-4`, `tests/setup.ts:5-20`, and `tests/setupServer.ts:10-16`. The AGENTS link is retained at `guides/middleware.md:880` and `guides/README.md:44`.
   - **Diff:** guide hunks `@@ -1,7 +1,7 @@`, `@@ -13,7 +13,7 @@`, and `@@ -862,12 +877,9 @@`; setup comment hunks remove the citations.
   - **Old form sweep:** `AGENTS §[0-9]+|§[0-9]+` over `tests/**`, `guides/README.md`, and `README.md`: no hit. Remaining guide references are internal `Contract §...`; `src/server/helpers.ts:56` retains external `RFC 9110 §9.3.2`.
   - **Report:** `applied` (`conform-middleware-report.md:25`). Current sweep agrees.
   - **Proof:** `guides-after.txt:10` — `38 passed`.

9. **middleware-subj-2**
   - **Site now:** `guides/middleware.md:360` is “The ordering doctrine”; `:406` is “The security acceptance bar, as documented behavior”; `:403`, `:517`, `:817`, and `:857` use the guide’s own terminology.
   - **Diff:** hunk headers `@@ -371,7 +372,7 @@`, `@@ -398,10 +399,11 @@`, `@@ -512,7 +514,7 @@`, and `@@ -849,12 +853,23 @@`; amended text is present.
   - **Old form sweep:** `PROPOSAL|PROPOSAL §|§5|§6 below|§6 invariants` over the package: no prohibited proposal reference.
   - **Report:** `applied`; it records the six rewritten references (`conform-middleware-report.md:26`). Current lines match.
   - **Proof:** documentation sweep and `guides-after.txt:10` — `38 passed`.

10. **middleware-subj-3**
    - **Site now:** `guides/middleware.md:3-8` has the factory enumeration without `thirteen`.
    - **Diff:** hunk `@@ -1,7 +1,7 @@`; the added line omits the word.
    - **Old form sweep:** `\bthirteen\b` over `guides/middleware.md`: no hit.
    - **Report:** `applied` (`conform-middleware-report.md:27`). Current tree agrees.
    - **Proof:** documentation sweep; no behavioural control required.

11. **middleware-subj-4**
    - **Site now:** `guides/README.md:34-40` names all local mirrors; `guides/middleware.md:882` reads “Its mirrored guide is [`server.md`](server.md).”
    - **Diff:** guide hunks `@@ -31,11 +31,14 @@` and `@@ -862,12 +877,9 @@`; mirror names and link are present.
    - **Old form sweep:** `not mirrored here|own repository|guide lives in its own repository` over the two guides: no hit. `Glob guides/*.md` returns `abort.md`, `budget.md`, `contract.md`, `database.md`, `guide.md`, `middleware.md`, `probe.md`, `router.md`, `scaffold.md`, `server.md`, `test.md`, and `timeout.md`.
    - **Report:** `applied` (`conform-middleware-report.md:28`). Current sweep agrees.
    - **Proof:** `guides-after.txt:10` — `38 passed`.

12. **middleware-subj-5**
    - **Site now:** `README.md:19` reads `Node.js >= 22.12.0`; manifest `package.json:122-124` remains the source of truth.
    - **Diff:** README hunk `@@ -16,11 +16,11 @@`; the replacement is present.
    - **Old form sweep:** `Node.js >= 24` over `README.md`: no hit.
    - **Report:** `applied` (`conform-middleware-report.md:29`). Current line matches.
    - **Proof:** documentation sweep; no behavioural control required.

13. **middleware-subj-6**
    - **Site now:** `README.md:22-23` reads “Dual ESM and CommonJS entries: the core (`.`) and the node face (`./server`), which carries the node-bound batteries”.
    - **Diff:** README hunk `@@ -16,11 +16,11 @@`; the amended two-entry wording is present.
    - **Old form sweep:** `ESM core.*CJS node face|CJS node face` over `README.md`: no hit.
    - **Report:** `applied` (`conform-middleware-report.md:30`). Current line matches.
    - **Proof:** documentation sweep; no behavioural control required.

14. **middleware-subj-7**
    - **Site now:** `guides/middleware.md:207` says “following table”; `:284-285` says “preceding section”; `src/server/middlewares.ts:239` says “a single `fstat` on a handle opened later in this function”. The removed `:402` and `:870` pointers are absent.
    - **Diff:** guide hunks `@@ -203,7 +204,7 @@`, `@@ -280,13 +280,13 @@`, and `@@ -398,10 +399,11 @@`; source hunk `@@ -236,9 +236,10 @@`; repaired text is present.
    - **Old form sweep:** pointer-specific `\b(above|below)\b` hits: no prohibited pointer remains. Allowed domain/numeric hits remain at `guides/middleware.md:373`, `:382`, `:824`, and `src/core/helpers.ts:394`, `:397`.
    - **Report:** `applied` (`conform-middleware-report.md:31`), but its sweep summary omits current hits at `:382` and `src/core/helpers.ts:394`; the cited repaired lines themselves match.
    - **Proof:** documentation sweep and `guides-after.txt:10` — `38 passed`.

15. **middleware-subj-8**
    - **Site now:** `guides/middleware.md:601-607` preserves the `BodyState` requirement without migration language; `:735` is “Multipart processing reports no progress.”; `src/core/middlewares.ts:640-641` has no `createBodyParser` reference.
    - **Diff:** guide hunks `@@ -598,11 +600,11 @@`, `@@ -730,8 +732,7 @@`; source hunk `@@ -638,8 +637,7 @@`; operative text is present.
    - **Old form sweep:** `createbodyparser|migrates with|needs no change|would join` over the package: no hit.
    - **Report:** `applied` (`conform-middleware-report.md:32`). Current tree matches.
    - **Proof:** documentation sweep; no behavioural control required.

16. **middleware-subj-9**
    - **Site now:** All named source and guide sites use `through` or another permitted form; test prose is also repaired, including `tests/src/core/middlewares.test.ts:59`, `tests/src/server/helpers.test.ts:525`, and the listed test titles/comments.
    - **Diff:** source hunks `@@ -19,14 +19,14 @@`, `@@ -280,13 +280,13 @@`, `@@ -858,7 +857,7 @@`; test hunks include the listed title/comment replacements.
    - **Old form sweep:** `\bvia\b` case-insensitive over `src/**`, `tests/**`, `guides/middleware.md`, `guides/README.md`, and `README.md`: no hit.
    - **Report:** `applied` (`conform-middleware-report.md:33`). Current sweep agrees.
    - **Proof:** documentation sweep; no behavioural control required.

17. **middleware-subj-10**
    - **Site now:** The five source TSDoc sites use `for example`; `tests/src/server/helpers.test.ts:525` also uses “for example”.
    - **Diff:** source hunk `@@ -362,7 +362,7 @@` and helper hunks `@@ -281,7 +281,7 @@`, `@@ -505,24 +505,23 @@`; test hunk `@@ -1162,7 +522,7 @@`.
    - **Old form sweep:** `e\.g\.|i\.e\.` case-insensitive over the required package paths: no hit.
    - **Report:** `applied` (`conform-middleware-report.md:34`). Current sweep agrees.
    - **Proof:** documentation sweep; no behavioural control required.

18. **middleware-subj-11**
    - **Site now:** `src/server/helpers.ts:508`, `src/core/types.ts:226`, `guides/middleware.md:374`, and `:424` use the repaired wording.
    - **Diff:** helper/type/guide hunks include the replacements; `guides/middleware.md:375` reads “is another throw the boundary maps cleanly”.
    - **Old form sweep:** `\bsimply\b|\beasy\b|\beasier\b|\bjust\b` case-insensitive over `src`, `tests`, both guides, and `README.md`: no hit.
    - **Report:** `applied` (`conform-middleware-report.md:35`). Current sweep agrees.
    - **Proof:** documentation sweep; no behavioural control required.

19. **middleware-subj-12**
    - **Site now:** `src/core/helpers.ts:289` reads “must be left untouched”; the added test prose is repaired at `tests/setupServer.ts:134` and `tests/src/server/helpers.test.ts:617`.
    - **Diff:** helper hunk `@@ -281,7 +281,7 @@`; test hunks include the two additions.
    - **Old form sweep:** `\bshould\b` case-insensitive over the required package paths: no hit.
    - **Report:** `applied` (`conform-middleware-report.md:36`). Current sweep agrees.
    - **Proof:** documentation sweep; no behavioural control required.

20. **middleware-subj-13**
    - **Site now:** `src/server/helpers.ts:516-519` consistently names `source`: “When `source` is a `FileHandle`” and “a `FileHandle` passed as `source`”; the signature is `source` at `:533`.
    - **Diff:** helper hunk `@@ -505,24 +505,23 @@`; both replacements are present.
    - **Old form sweep:** `When \`path\` is a FileHandle|handle passed here` over `src/server/helpers.ts`: no hit.
    - **Report:** `applied`, breaking (`conform-middleware-report.md:37`, `:181-183`). Current lines match.
    - **Proof:** documentation sweep; no behavioural control required.

21. **middleware-subj-14**
    - **Site now:** `extractMultipartBoundary` is at `src/server/helpers.ts:375`, imported/called at `src/server/parsers.ts:4,56`, documented at `guides/middleware.md:232`, and imported/tested at `tests/src/server/helpers.test.ts:14,336-354`.
    - **Diff:** helper hunk `@@ -368,11 +368,11 @@`, parser hunk `@@ -1,7 +1,7 @@`, and test hunk `@@ -1,16,1 +1,17 @@`; the amended qualified name is present.
    - **Old form sweep:** `\bmultipartBoundary\b` case-sensitive over the required package paths: no hit. Case-insensitive inflection sweep `multipartboundar(y|ies|ied|ying)` hits only the new qualified name at `src/server/helpers.ts:371-375`, `src/server/parsers.ts:4,56`, `tests/src/server/helpers.test.ts:14,336,338,340,344,348,352-354`, and `guides/middleware.md:232`.
    - **Report:** `applied`, breaking (`conform-middleware-report.md:38`, `:187-201`). Current tree matches.
    - **Proof:** placement/naming sweep; no behavioural control required.

22. **middleware-subj-17**
    - **Site now:** `SessionRestoreFunction` is declared at `src/core/types.ts:457`, imported by `DatabaseSessionStore.ts:4`, and used at `:54` and `:61`; the guide row is `guides/middleware.md:107`.
    - **Diff:** type hunk `@@ -446,6 +446,16 @@` and store hunk `@@ -50,14 +51,14 @@`; the named alias and both uses are present.
    - **Old form sweep:** duplicate inline `(value: unknown) => SessionInterface | undefined` declarations in `DatabaseSessionStore.ts`: no hit.
    - **Report:** `applied` (`conform-middleware-report.md:39`). Current lines match.
    - **Proof:** placement sweep and `guides-after.txt:10` — `38 passed`.

23. **fleet-F1**
    - **Site now:** `isBrowserVuePath` is absent from `tests/setup.ts` and `tests/setup.test.ts`; no `src/browser`, `app/browser`, or `tests/setupBrowser.ts` exists.
    - **Diff:** no F1-specific hunk; disposition is correctly `noop`.
    - **Old form sweep:** `isbrowservuepaths?` case-insensitive over the package excluding `node_modules`: no hit.
    - **Report:** `noop` with the no-browser evidence (`conform-middleware-report.md:40`).
    - **Proof:** setup project evidence: `obj-7-setupserver-after.txt:10` — `35 passed`.

24. **fleet-F2**
    - **Site now:** `Session` has `readonly #id` at `src/core/Session.ts:22`, assigns it at `:26`, and exposes `get id()` at `:30`; `SessionInterface.id` remains at `src/core/types.ts:312`.
    - **Diff:** class hunk `@@ -1,4 +1,3 @@` plus the class-field/getter addition; the getter is present.
    - **Old form sweep:** public `readonly id` ahead of private fields over implementation classes: no hit. No `JSON.stringify` of a `Session` instance occurs in tests or guide fences.
    - **Report:** `applied` (`conform-middleware-report.md:41`). Current tree matches.
    - **Proof:** `policy-after.txt:10` — `111 passed`.

### Across the unit

- **Scope:** The status artifact contains only owned paths: `README.md`, `guides/README.md`, `guides/middleware.md`, `src/core/Session.ts`, `src/core/helpers.ts`, `src/core/middlewares.ts`, `src/core/stores/DatabaseSessionStore.ts`, `src/core/types.ts`, `src/server/helpers.ts`, `src/server/middlewares.ts`, `src/server/parsers.ts`, `src/server/types.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src/core/Session.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/middlewares.test.ts`, `tests/src/core/stores/DatabaseSessionStore.test.ts`, `tests/src/core/stores/MemorySessionStore.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/server/MultipartParser.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/server/middlewares.test.ts`, and `tests/src/server/parsers.test.ts`. No shared or off-limits path appears.
- **Supporting hunks whose files are not literal `Where` paths:** `tests/setupServer.test.ts` — `@@ -8,11 +8,14 @@` first addition `import { tmpdir }...`; `@@ -285,3 +290,63 @@` first addition `describe('buildChunkedStream'...)`; new test files — one new-file hunk each, beginning with their import lines.
- **Residue in diff `+` lines:** `conform-middleware.diff:44` contains the dependency path `timeout.md`; `:542` contains `@orkestrel/timeout`. No added `skip`, `only`, `todo`, retry, TODO, FIXME, console, or debugger residue.
- **Residue in tree:** The requested sweep over `src/**` and `tests/**` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts` finds only legitimate timeout/retry/console text: `src/core/middlewares.ts:43,146,382-387,402,617`; `src/core/helpers.ts:52,57,528`; `src/core/types.ts:165,233,391,489,549`; `src/core/stores/DatabaseSessionStore.ts:15`; `src/core/stores/MemorySessionStore.ts:13,95`; `src/core/factories.ts:90`; `src/server/helpers.ts:207`; `src/server/errors.ts:60`; `tests/src/core/middlewares.test.ts:861,876`; `tests/src/server/helpers.test.ts:238`; `tests/src/server/middlewares.test.ts:395,1321`.
- **Parity:** Core barrel `src/core/index.ts:1-10` exports `SessionRestoreFunction` and `Session`; server barrel `src/server/index.ts:1-6` exports `ByteRange`, `UploadedFile`, and `extractMultipartBoundary` through their source barrels. `MultipartParser` remains intentionally unbarrelled and is listed in `tests/guides.test.ts:43`.
  - `SessionInterface` members: `id`, `state`, `set`, `delete`, `clear` at `src/core/types.ts:312-317`; guide surface at `guides/middleware.md:94` and method rows at `:304-307`.
  - `SessionControlInterface` members: `regenerate`, `destroy` at `src/core/types.ts:330-331`; guide method rows at `guides/middleware.md:315-318`.
  - `SessionStoreInterface` members: `get`, `set`, `delete` at `src/core/types.ts:378-380`; guide method rows at `guides/middleware.md:326-333`.
  - `SessionTransportInterface` members: `read`, `write`, `clear` at `src/core/types.ts:...`; guide method rows at `guides/middleware.md:338-343`.
  - Readonly data properties: `SessionInterface.id/state` (`src/core/types.ts:312-313`, guide `:94`); `SessionSnapshot.id/state` (`:445-446`, guide `:106`); `UploadedFile` inherited fields plus `status` (`src/server/types.ts:179-180`, guide `:123`); `ByteRange.start/end` (`:210-212`, guide `:125`).
  - Added guide API identifiers resolve through the core or server barrel: `SessionRestoreFunction`, `ByteRange`, `extractMultipartBoundary`, and all listed public surface names. `verifyToken`, `MiddlewareHandler`, `MiddlewareContext`, `compose`, `FileHandle`, `fstat`, `AGENTS.md`, `server.md`, `options.directory`, `source`, `range`, `start`, and `end` are peer, platform, file, parameter, or prose tokens rather than middleware-barrel exports. `MultipartParser` is the intentional non-export.
- **Gates quoted from the report:** `npm --prefix /home/user/fleet/middleware run format:check` — exit `0`; `npm --prefix /home/user/fleet/middleware run lint:check` — exit `0`; `npm --prefix /home/user/fleet/middleware run check` — exit `0`; `npm --prefix /home/user/fleet/middleware run build` — exit `0`; `npm --prefix /home/user/fleet/middleware test` — exit `0` (`conform-middleware-report.md:80-99`). The same report later records `check` exit `2` and test failures in its fix-round deviation (`:388-410`).
- **Breaking:** The report names `UploadedFileInput` removal and `multipartBoundary` → `extractMultipartBoundary` rename (`conform-middleware-report.md:156-203`). A word-boundary sweep over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding middleware, vendored guide mirrors, and `node_modules`, finds no old-name hit.

## Distillate

- `middleware-obj-1: site now moved/ordered correctly | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-2: nested declarations removed and shared compressor used | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-3: mirrored validator/parser/internal-parser tests present | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-4: helpers centralized and setup-tested | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-5: ByteRange named and documented | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-6: UploadedFileInput removed | diff present yes | old form hits 0 | report matches yes`
- `middleware-obj-7: EXDEV proof is runtime-device gated | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-1: AGENTS section citations removed | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-2: PROPOSAL references removed | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-3: thirteen removed | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-4: local guide mirrors named | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-5: README engine aligned | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-6: README dual-format claim corrected | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-7: pointer wording corrected | diff present yes | old form hits 0 | report matches no — report omitted current allowed sweep hits`
- `middleware-subj-8: migration/speculative prose removed while requirement retained | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-9: via removed | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-10: e.g./i.e. removed | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-11: banned merely-sense terms removed | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-12: should removed | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-13: streamFile parameter references corrected | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-14: multipartBoundary renamed | diff present yes | old form hits 0 | report matches yes`
- `middleware-subj-17: SessionRestoreFunction centralized | diff present yes | old form hits 0 | report matches yes`
- `fleet-F1: browser helper absent, correctly noop | diff present no | old form hits 0 | report matches yes`
- `fleet-F2: Session id moved behind private field/getter | diff present yes | old form hits 0 | report matches yes`

Scope tags: every status path is `owned`; no `shared` or `off-limits` path appears.

Residue: no added prohibited residue. Tree hits are limited to legitimate timeout, retry, and console examples listed above.

Writing sweep: added prose hits `now` at `conform-middleware.diff:2400,2532`; added comment code token ``new`` at `:3797`. No count-pattern hit.

Parity: public method and readonly-property mappings are listed above; new public names are barrelled, while `MultipartParser` remains intentionally internal.

## Unknowns

- The independent landing gate run was not available to this read-only lane. The report contains conflicting gate readings: its § Gates table records exit `0`, while its later deviation records `check` exit `2` and test failures.
- The report’s `middleware-subj-7` sweep is incomplete: it omits allowed current hits at `guides/middleware.md:382` and `src/core/helpers.ts:394`.
- No separate failing-first control is recorded for every individual helper hoist in `middleware-obj-2`; the recorded control directly proves the `destroy()` fixture repair and the extra compressor placement.

## Journal

Leave this line for the driver.

## Deviation

No file was created, edited, or deleted. The status artifact shows only owned paths. No off-limits file, `package-lock.json`, or `node_modules` path appears.