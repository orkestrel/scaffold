## Question

For every row in `conform-scaffold`, what the tree carries now, what the diff changed, and whether the report matches.

## Evidence

### `scaffold-subj-1`

- **Site now:** Brief `guides/scaffold.md:1508-1509`; current text is at `guides/scaffold.md:1510-1514`:
  - `1510`: “The compiler, the materializer, and the upstream reader each publish an emitter…”
  - `1512-1514`: “the upstream reader emits `release`, `mirror`, `file`, `error`, and `destroy`.”
  - `src/server/types.ts:303-309` declares the same event order. `src/server/Upstream.ts:465-467` emits `file`.
- **Diff:** `@@ -1504,10 +1507,13 @@`. The operative replacement is present in `guides/scaffold.md:1513`.
- **Old-form sweep:** Pattern `(?i)the upstream reader emit(s|ted|ting)?|reader emit(s|ted|ting)? \`release\``, over `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, and `README.md`: no old sentence. The corrected sentence is the only related hit at `guides/scaffold.md:1513`.
- **Report:** `conform-scaffold-report.md:10` says `applied` and records that the guide names `file` in event order. The content matches. Its later sweep cites `guides/scaffold.md:1511`, but the corrected event text is now at `:1513`.
- **Proof:** Documentation row; the report records the sweep, not a behavioral control.

### `scaffold-subj-2`

- **Site now:** `guides/scaffold.md:1510-1516` states that `WriteTransaction` publishes no emitter, identifies the three emitting entities, includes `file`, and qualifies constructor errors. `WriteTransaction` exposes only `target`, `expectations`, and `open` at `src/server/WriteTransaction.ts:211-224`. Its constructor can throw before emitter creation at `src/core/Compiler.ts:99-110`.
- **Diff:** `@@ -1504,10 +1507,13 @@`. Both operative sentences are present.
- **Old-form sweep:** Case-insensitive exact sweep for `Every entity publishes an emitter` and `Errors are emitted immediately before they are thrown`, with `-s`, `-ed`, and `-ing` variants, over the required paths: no hit.
- **Report:** `conform-scaffold-report.md:11` says `applied` and records replacement of the universal emitter and error-emission claims. It matches the tree.
- **Proof:** Documentation row; the report records the required sweep.

### `scaffold-subj-3`

- **Site now:** Brief `README.md:72`; current sentence is at `README.md:74`: “Not everything is owned that way…”. The surrounding sentence continues through `README.md:76`.
- **Diff:** `@@ -69,7 +71,7 @@`. The operative text is present.
- **Old-form sweep:** Exact case-insensitive pattern `Two paths are not owned that way` over the required paths: no hit. Related `owned that way` hits are `README.md:74` and unrelated `tests/setupServer.ts:1690`.
- **Report:** `conform-scaffold-report.md:12` says `applied` and records that the count was deleted. The content matches, but the table’s `README.md:72` pointer is stale; the sentence is at `:74`.
- **Proof:** Documentation row. The report records the word and numeral count sweeps over `README.md`; its recorded result agrees with the targeted old-form sweep.

### `scaffold-subj-4`

- **Site now:** The four summaries are imperative:
  - `guides/scaffold.md:227`: “Test whether a destination's floor bytes survive a live overlay.”
  - `guides/scaffold.md:228`: “Test whether another surface owns a target's present bytes at a path.”
  - `guides/scaffold.md:390`: “List the canon paths a target holds, filtered to a plan's groups.”
  - `guides/scaffold.md:402`: “Remove every directory one set of deletions emptied.”
  Neighboring rows use the same table form at `guides/scaffold.md:225-226`, `:389`, and `:401`.
- **Diff:** `@@ -222,8 +224,8 @@`, `@@ -385,7 +387,7 @@`, and `@@ -397,7 +399,7 @@`. All four operative replacements are present.
- **Old-form sweep:** Exact old summary phrases over the required paths: no guide hit. Related TSDoc inflections remain correctly at `src/core/helpers.ts:172`, `:251`, and `src/server/helpers.ts:834`, `:878`; they are doc blocks, not Surface rows.
- **Report:** `conform-scaffold-report.md:13` says `applied` and records four Surface summaries rewritten with alignment preserved. It matches. Later report pointers are one line early: current rows are `227`, `228`, `390`, and `402`.
- **Proof:** Documentation row; the report’s sweep agrees with the exact guide-row sweep.

### `scaffold-subj-6`

- **Site now:** `matchesDriftReachability` has an example at `src/core/helpers.ts:660-681`. The compiler examples are at `src/core/compilers.ts:1364-1371`, `:1436-1443`, and `:1489-1498`. Each imports from `@orkestrel/scaffold` and answers with a returned value.
- **Diff:** `src/core/helpers.ts`: `@@ -656,6 +656,29 @@`. `src/core/compilers.ts`: `@@ -1360,6 +1360,15 @@`, `@@ -1423,6 +1432,15 @@`, and `@@ -1467,6 +1485,17 @@`. All four fences are present.
- **Old-form sweep:** No renamed or removed symbol applies; no old example form was found in the required paths.
- **Report:** `conform-scaffold-report.md:14` says `applied` and records four driven examples. The content matches. A later report sentence cites `src/core/helpers.ts:788-809`, but the current helper example is at `:660-681`.
- **Proof:** `npm run test:distribution`.
  - Red control `/home/user/work/evidence/scaffold-proofs/subj6-red-control.txt:55`: `Tests 2 failed | 3 passed (5)`.
  - Green reading `/home/user/work/evidence/scaffold-proofs/subj6-distribution.txt:33`: `Tests 1 failed | 4 passed (5)`. The remaining failure is the registry-dependent case; the new claims are driven and answered.

### `scaffold-subj-7`

- **Site now:** `guides/scaffold.md:16-19` names the licence, harness permission file, session-start hooks, policy register and plugin, configuration leaf and proof, root dotfiles, and guide mirrors. `README.md:11-13` carries the parallel description. `HOST_PATHS` is declared at `src/core/constants.ts:131-152`.
- **Diff:** Guide hunk `@@ -13,8 +13,10 @@`; README hunk `@@ -8,14 +8,16 @@`. The operative wording is present.
- **Old-form sweep:** Exact old phrases `the toolchain, the policy proofs, the bench scripts` and `its toolchain, its policy proofs` over the required paths: no hit. The new `licence` wording appears at `guides/scaffold.md:16` and `src/core/constants.ts:116`.
- **Report:** `conform-scaffold-report.md:15` says `applied` and records that both prose sites name the set. The content matches. Its `README.md:10` pointer is stale; the list begins at `README.md:11`.
- **Proof:** Documentation row; the report’s recorded sweep agrees on removal of the old wording.

### `scaffold-obj-1`

- **Site now:** `package.json:65` is `oxlint --config .oxlintrc.json --fix .`; `package.json:73` retains `--deny-warnings` for `lint:check`. This matches `.claude/rules/workspace.md:215-226`.
- **Diff:** `@@ -62,7 +62,7 @@`. The operative value is present.
- **Old-form sweep:** Exact old `lint` value with `--deny-warnings` over `package.json`: no hit. `--deny-warnings` remains at `src/core/compilers.ts:287` and generated-manifest fixtures for `lint:check`.
- **Report:** `conform-scaffold-report.md:16` says `applied` and records the corrected value. It matches.
- **Proof:** Placement/configuration row; the report records the string correction.

### `scaffold-obj-2`

- **Site now:** `src/core/factories.ts:44-72` still implements default filling, omission of `description`, cloning, parsing, and `INVALID` refusal. The mirrored proof exists at `tests/src/core/factories.test.ts:1-113`, covering defaults, supplied values, ownership, name preservation, and refusal.
- **Diff:** `tests/src/core/factories.test.ts` is added with `@@ -0,0 +1,114 @@`; the test is present in the evidence diff.
- **Old-form sweep:** No removed or renamed name applies.
- **Report:** `conform-scaffold-report.md:17` says `applied` and records the mirrored proof plus planted-body controls. It matches.
- **Proof:** `npm run test:src:core`.
  - Red control `/home/user/work/evidence/scaffold-proofs/obj2-red-control.txt:56`: `Tests 2 failed | 386 passed (388)`.
  - Green control `/home/user/work/evidence/scaffold-proofs/obj2-green.txt:18`: `Tests 388 passed (388)`.

### `scaffold-obj-3`

- **Site now:** `supportsMode` is imported at `tests/src/server/WriteTransaction.test.ts:18` and `tests/src/server/helpers.test.ts:91`. The three mode cases use `it.skipIf(!supportsMode())` at `WriteTransaction.test.ts:206`, `:227`, and `helpers.test.ts:1582`. The licensed platform skips remain at `WriteTransaction.test.ts:281` and `helpers.test.ts:596`.
- **Diff:** Import hunk `@@ -15,7 +15,7 @@`; mode hunks `@@ -200,10 +200,10 @@`, `@@ -221,10 +221,10 @@`, and `@@ -1575,9 +1575,11 @@`. All replacements are present.
- **Old-form sweep:** `process.platform === 'win32'` remains only at the licensed link/race cases (`tests/src/server/WriteTransaction.test.ts:281`, `tests/src/server/helpers.test.ts:596`), plus unrelated platform selection in `tests/distribution.test.ts:13`, `:21` and `src/core/templates.ts:1075`, `:1080`. No old predicate remains at the three mode sites.
- **Report:** `conform-scaffold-report.md:18-20` says `applied` and records the three probe-based skips. It matches.
- **Proof:** `npm run test:src:server`.
  - Red control `/home/user/work/evidence/scaffold-proofs/obj3-red-control.txt:64`: `Tests 3 failed | 428 passed (431)`.
  - Green control `/home/user/work/evidence/scaffold-proofs/obj3-green.txt:11`: `Tests 431 passed (431)`.

### `scaffold-obj-4`

- **Site now:** `src/server/types.ts:355-357` still declares `ReadAllowance { remaining: number }`. Its deliberate-mutability explanation remains at `src/server/types.ts:347-354`.
- **Diff:** No hunk touches this site.
- **Old-form sweep:** No rename or removal applies.
- **Report:** `conform-scaffold-report.md:21-30` records `noop` because the exemption remains. It matches the tree and the row’s stated conditional repair.
- **Proof:** No behavioral proof applies.

### `scaffold-obj-5`

- **Site now:** `src/bin/helpers.ts:565-568` documents lone-CR folding, and `:577` uses `replace(/\r\n|\r|\n/gu, ' ')`. The unit assertions are at `tests/src/bin/helpers.test.ts:537-540` and `tests/src/bin/CLI.test.ts:427-434`.
- **Diff:** `src/bin/helpers.ts` has `@@ -562,6 +562,9 @@` and `@@ -571,7 +574,7 @@`; CLI has `@@ -424,6 +424,16 @@`; helper test has `@@ -537,6 +537,7 @@`. The replacement and assertions are present.
- **Old-form sweep:** `split(/\r?\n/).join(' ')` has no hit in the required paths. The new assertion appears at `tests/src/bin/helpers.test.ts:540`.
- **Report:** `conform-scaffold-report.md:22` says `applied` and records the lone-CR implementation and red-first helper/CLI proofs. It matches.
- **Proof:** `npm run test:src:bin`.
  - Red control `/home/user/work/evidence/scaffold-proofs/obj5-red-control.txt:78`: `Tests 2 failed | 243 passed (245)`.
  - Green control `/home/user/work/evidence/scaffold-proofs/obj5-green.txt:43`: `Tests 245 passed (245)`.

### `fleet-F1`

- **Site now:** `isBrowserVuePath` has no hit in `tests/setup.ts` or the required workspace paths. There is no `tests/setup.test.ts`; `src/` contains only `bin`, `core`, and `server`. `package.json` has no `setup` project or `test:setup` script.
- **Diff:** No hunk applies.
- **Old-form sweep:** `isBrowserVuePath` over `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, and `README.md`: no hit.
- **Report:** `conform-scaffold-report.md:22-35` records `noop` because the helper, setup proof, and browser environment are absent. It matches.
- **Proof:** No behavioral proof applies.

### `fleet-F2`

- **Site now:** No implementation class declares a public `readonly id: string` field. The relevant class files named by the report contain `#` fields instead.
- **Diff:** No hunk applies.
- **Old-form sweep:** `readonly id: string` over `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, and `README.md`: no hit.
- **Report:** `conform-scaffold-report.md:40-45` records `noop` because the triggering class shape is absent. It matches.
- **Proof:** No behavioral proof applies.

### Across the unit

#### Scope

From `/home/user/work/evidence/conform-scaffold.status:1-23`:

- `README.md`, `guides/scaffold.md`, `package.json`, `src/bin/helpers.ts`, `src/core/compilers.ts`, `src/core/helpers.ts`, `tests/guides.test.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/bin/helpers.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/server/WriteTransaction.test.ts`, and `tests/src/server/helpers.test.ts`: `owned`.
- `.orkestrel/campaign/conform/briefs/conform-scaffold-fix1-brief.md`, the campaign reports, and the campaign unit files: `off-scope` campaign metadata. These paths are outside the brief’s Owned and Shared rows and are not explicitly listed under Off-limits.
- `host.json`: `off-scope` by omission. It is outside the brief’s listed Owned, Shared, and Off-limits paths, although the report claims generated inventory regeneration makes it required.

The evidence diff also contains no-Where hunks for:

- `host.json`: `@@ -682,7 +682,7 @@` and `@@ -772,5 +772,5 @@`; added lines are the changed entry and root digests.
- `tests/guides.test.ts`: `@@ -3,12 +3,12 @@`, `@@ -99,7 +99,7 @@`, `@@ -109,7 +7,7 @@`, and `@@ -185,7 +185,7 @@`; additions include `fenceImports` and `missingSymbols`.
- `tests/src/bin/CLI.test.ts`: `@@ -424,6 +424,16 @@`; first added line is the lone-CR diagnostic case.
- `tests/src/bin/helpers.test.ts`: `@@ -537,6 +537,7 @@`; first added line is the lone-CR assertion.
- `tests/src/core/factories.test.ts`: `@@ -0,0 +1,114 @@`; first added line is the import block.
- `tests/src/server/WriteTransaction.test.ts`: `@@ -15,7 +15,7 @@`, `@@ -200,10 +200,10 @@`, and `@@ -221,10 +221,10 @@`; additions import `supportsMode` and replace the two predicates.
- `tests/src/server/helpers.test.ts`: `@@ -88,7 +88,7 @@` and `@@ -1575,9 +1575,11 @@`; additions import `supportsMode` and replace the mode predicate.

The `.orkestrel/**` hunks are campaign-file additions or report amendments, including `@@ -0,0 +1,22 @@` for the fix brief, `@@ -0,0 +1,277 @@` for the MCP report, `@@ -0,0 +1,250 @@` for the program report, two modified report hunks at `@@ -165,6,1 @@` and `@@ -324,3 +325,13 @@`, `@@ -0,0 +1,197 @@` for the server report, and the corresponding MCP, scaffold, objective, checker, server, and program unit hunks. They are outside the unit’s declared file scope.

#### Residue

Tree sweep pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`, over `src` and `tests` while excluding `setupPolicy.ts`, `policy.test.ts`, `config.test.ts`, and `distribution.test.ts`, returned:

- `src/core/compilers.ts:283`
- `src/core/types.ts:60`
- `src/core/templates.ts:1092`, `:1732`, `:1965`
- `src/server/types.ts:316`, `:317`, `:320`, `:330`, `:334`
- `src/server/Upstream.ts:96`, `:108`, `:163`, `:168`, `:764`, `:771`, `:778`, `:787`, `:788`, `:797`, `:801`, `:808`, `:815`, `:826`
- `src/server/constants.ts:103`, `:127`
- `src/server/validators.ts:208`, `:446`, `:462`, `:463`
- `tests/src/server/WriteTransaction.test.ts:262`, `:280`
- `tests/src/core/fixtures/source-manifest.txt:40`
- `tests/src/core/fixtures/setup-false-manifest.txt:40`
- `tests/src/core/compilers.test.ts:1132`
- `tests/setupServer.ts:167`, `:362`, `:364`, `:652`, `:654`, `:658`, `:660`
- `tests/src/server/Upstream.test.ts:704`, `:1471`, `:1477`
- `tests/src/core/templates.test.ts:247`, `:1091`
- `tests/src/bin/main.test.ts:137`, `:160`, `:192`

The relevant added skip lines are the probe-based replacements at `tests/src/server/WriteTransaction.test.ts:206`, `:227`, and `tests/src/server/helpers.test.ts:1582`; they are not new skips.

#### Parity

No diff-touched source file is a `types.ts` file or a class implementation file. Therefore no interface call-signature/member comparison applies.

The guide additions contain these backticked identifiers:

- `HOST_PATHS` — exported through `src/core/index.ts:1-10`.
- `isFloorPath`, `isRetainedPath`, `matchesDriftReachability` — exported through `src/core/index.ts:4-9`.
- `listCanonPaths`, `pruneEmptiedDirectories` — exported through `src/server/index.ts:1-7`.
- `WriteTransaction` — exported through `src/server/index.ts:5`.
- `compile`, `audit`, `block`, `error`, `destroy`, `write`, `remove`, `finish`, `release`, `mirror`, and `file` — event keys, not standalone barrel exports; their declarations are represented by the event-map contracts and class emitters.

#### Gates

The report’s `§ Gates` table at `conform-scaffold-report.md:185-198` records:

```text
npm run format:check — exit 0
npm run lint:check — exit 0
npm run check — exit 2
npm run check:src — exit 0
npm run build — exit 0
npm test — exit 1
```

The report attributes `check` to two `tests/guides.test.ts` imports and `npm test` to three guide-project failures caused by the staged `@orkestrel/guide` names.

#### Breaking

The report states at `conform-scaffold-report.md:274-285`:

> No published symbol was renamed or removed, so no consumer edit is obliged.

It separately records that `guides/scaffold.md` is a `HOST_PATHS` member and that `host.json` was regenerated. No published-symbol old-name sweep applies. The `tests/guides.test.ts` dependency rename is recorded under Shared-file patches at `conform-scaffold-report.md:290-311`, not as a published scaffold-symbol break.

#### Writing sweep

For the unit-owned added prose in `guides/**`, `README.md`, source doc comments, and test titles/comments, pattern:

```text
(?i)\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b
```

and count pattern:

```text
\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b
```

returned no hits in the unit-owned added prose.

## Distillate

- `scaffold-subj-1`: site now `guides/scaffold.md:1510-1514` | diff present yes | old form hits 0 | report matches yes for content, no for stale `:1511` pointer
- `scaffold-subj-2`: site now `guides/scaffold.md:1510-1516` | diff present yes | old form hits 0 | report matches yes
- `scaffold-subj-3`: site now `README.md:74-76` | diff present yes | old form hits 0 | report matches yes for content, no for stale `:72` pointer
- `scaffold-subj-4`: sites now `guides/scaffold.md:227`, `:228`, `:390`, `:402` | diff present yes | old form hits 0 | report matches yes for content, no for later stale pointers
- `scaffold-subj-6`: sites now `src/core/helpers.ts:660-681`, `src/core/compilers.ts:1364-1371`, `:1436-1443`, `:1489-1498` | diff present yes | old form hits 0 | report matches yes for claims, no for one stale helper pointer
- `scaffold-subj-7`: sites now `guides/scaffold.md:16-19`, `README.md:11-13` | diff present yes | old form hits 0 | report matches yes for content, no for stale `README.md:10`
- `scaffold-obj-1`: site now `package.json:65` | diff present yes | old form hits 0 | report matches yes
- `scaffold-obj-2`: site now `tests/src/core/factories.test.ts:1-113` | diff present yes | old form hits 0 | report matches yes
- `scaffold-obj-3`: sites now `WriteTransaction.test.ts:206`, `:227`, `helpers.test.ts:1582` | diff present yes | old form hits 0 at target sites | report matches yes
- `scaffold-obj-4`: site now `src/server/types.ts:355-357` | diff present no | old form hits 0 | report matches yes
- `scaffold-obj-5`: sites now `src/bin/helpers.ts:565-577`, helper test `:537-540`, CLI test `:427-434` | diff present yes | old form hits 0 | report matches yes
- `fleet-F1`: helper absent | diff present no | old form hits 0 | report matches yes
- `fleet-F2`: triggering public field absent | diff present no | old form hits 0 | report matches yes

Scope tags:

- `owned`: README, guide, package manifest, source files, and tests listed in the status evidence.
- `off-scope`: every `.orkestrel/campaign/**` path in the status evidence.
- `off-scope`: `host.json`, because the brief does not classify it.

Residue:

- Relevant added residue is limited to the three required `it.skipIf(!supportsMode())` replacements.
- The tree residue sweep hits are listed above.
- No unit-owned added prose hit the required writing patterns.

Writing hits: none in the unit-owned added prose.

Parity:

| Entity class/type touched by diff | Interface members | Guide Methods rows | Readonly data / Surface row |
| --- | --- | --- | --- |
| None | Not applicable | Not applicable | Not applicable |

## Unknowns

- The full `conform-scaffold.diff` could not be read as one file because the read tool capped its output; targeted hunk searches and relevant ranges were readable.
- The gates were not independently rerun because the requested mode is read-only.
- The full semantic membership of prose categories such as “policy register and plugin” was not independently adjudicated against every `HOST_PATHS` entry; the current text and constant list were both read.

## Journal

Leave this line for the driver.

## Deviation

- The status evidence contains `.orkestrel/campaign/**` files outside the brief’s declared Owned and Shared scopes.
- `host.json` is modified although it is absent from the brief’s Owned, Shared, and Off-limits lists.
- The report’s later line references for the corrected upstream sentence, Surface rows, helper example, and README sentence do not all match current line numbers.
- The report records `npm run check` exit `2` and `npm test` exit `1`; those readings were not independently rerun in read-only mode.