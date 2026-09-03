## Question

For each `conform-scaffold` row, compare the current tree, unit diff, and report readings.

## Evidence

### Per-row entries

- **scaffold-subj-1**
  - **Site now:** Brief `guides/scaffold.md:1509`; current `:1511` reads “the upstream reader emits `release`, `mirror`, `file`, `error`,” with `:1510` before and `:1512` after.
  - **Diff:** `@@ -1504,10 +1505,13 @@`; the `+` lines contain the exact replacement with `file`.
  - **Old form sweep:** Case-insensitive `upstream reader emits release/mirror/error/destroy` over `src`, `tests`, `guides/scaffold.md`, `guides/README.md`, and `README.md`: no old-form hit.
  - **Report:** `conform-scaffold-report.md:15-26` says `applied`: “`guides/scaffold.md` names `file` in the upstream reader's event list, in `UpstreamEventMap` order.” The current site matches.
  - **Proof reading:** Documentation sweep. The report's combined old-form sweep records no stale edited sentence; the independent exact sweep agrees.

- **scaffold-subj-2**
  - **Site now:** Brief `guides/scaffold.md:1507`; current `:1508` says “The compiler, the materializer, and the upstream reader each publish an emitter; `WriteTransaction` publishes none…” Current `:1512-1514` qualifies post-construction errors and constructor refusals.
  - **Diff:** `@@ -1504,10 +1505,13 @@`; both operative replacement sentences are present in `+` lines.
  - **Old form sweep:** Case-insensitive `Every entity publishes an emitter` and `Errors are emitted immediately before they are thrown`: no hit across the required paths.
  - **Report:** `conform-scaffold-report.md:15-26` says `applied`: “`guides/scaffold.md` replaces the universal emitter claim and qualifies the error-emission claim.” The current site matches.
  - **Proof reading:** Documentation sweep. The report records the old-form hits as outside the edited surfaces; the exact sweep agrees.

- **scaffold-subj-3**
  - **Site now:** `README.md:72` reads “Not everything is owned that way,” with `:71` preceding it and `:73` retaining the `tests/distribution.test.ts` clause.
  - **Diff:** `@@ -69,7 +69,7 @@`; the `+` line contains the operative replacement.
  - **Old form sweep:** Case-insensitive `\b(two)\b.*\bpaths?\b.*\bowned\b` over the required paths: no hit.
  - **Report:** `conform-scaffold-report.md:15-26` says `applied`: “`README.md:72` count deleted; both count sweeps ruled.” The report's five permitted number-word hits are at `README.md:6`, `:40`, `:61`, `:74`, and `:95`; the current wording remains consistent.
  - **Proof reading:** Documentation sweep. The report and independent sweep agree that the removed count is absent.

- **scaffold-subj-4**
  - **Site now:** Current guide rows are `guides/scaffold.md:226` (`isFloorPath`), `:227` (`isRetainedPath`), `:389` (`listCanonPaths`), and `:401` (`pruneEmptiedDirectories`). Each uses the imperative form, with neighboring rows at `:225`, `:390`, and `:402`.
  - **Diff:** `@@ -222,8 +223,8 @@`, `@@ -385,7 +386,7 @@`, and `@@ -397,7 +398,7 @@`; all four operative summaries appear in `+` lines.
  - **Old form sweep:** Case-insensitive exact-summary sweep over the required paths: hits remain only in TSDoc at `src/core/helpers.ts:251`, `src/server/helpers.ts:834`, and `src/server/helpers.ts:878`. No old summary remains in the guide, `README.md`, `guides/README.md`, or tests.
  - **Report:** `conform-scaffold-report.md:15-26` says `applied`: “Four Surface summaries rewritten to the table's imperative form, column alignment preserved.” The current rows match.
  - **Proof reading:** Documentation sweep. The report's broader sweep names seven unrelated hits; the exact sweep finds three source TSDoc hits and no stale Surface-row text.

- **scaffold-subj-6**
  - **Site now:** `matchesDriftReachability` has its example at `src/core/helpers.ts:660-680`, with the export at `:683`. The compiler examples are at `src/core/compilers.ts:1364-1371`, `:1436-1443`, and `:1489-1498`, with exports at `:1373`, `:1445`, and `:1500`.
  - **Diff:** Hunk headers are `@@ -656,6 +656,29 @@`, `@@ -1360,6 +1360,15 @@`, `@@ -1423,6 +1432,15 @@`, and `@@ -1467,6 +1485,17 @@`; all four examples are present in `+` lines. `SERVICE_SCRIPT_PATH` confirms `scripts/service.sh` at `src/core/constants.ts:301`.
  - **Old form sweep:** No renamed or removed symbol; no old-form sweep applies.
  - **Report:** `conform-scaffold-report.md:15-26` says `applied`: “Four `@example` fences added; each new claim driven and answered by `test:distribution`.” The current blocks match.
  - **Proof reading:** `subj6-red-control.txt` contains `matchesDriftReachability('birth', aligned) // false answered true` and reports `Tests 1 failed | 4 passed (5)`. `subj6-distribution.txt` reports `Tests 1 failed | 4 passed (5)`; the remaining failure is the network installation case, and the new example mismatch is absent.

- **scaffold-subj-7**
  - **Site now:** `guides/scaffold.md:16-18` names the licence, harness permission file, bench scripts, policy register, root dotfiles, and guide mirrors. `README.md:11-13` names the corresponding set.
  - **Diff:** Guide hunk `@@ -13,8 +13,9 @@`; README hunk `@@ -8,10 +8,10 @@`. The operative set descriptions appear in `+` lines.
  - **Old form sweep:** Case-insensitive old appositives over the required paths: no hit.
  - **Report:** `conform-scaffold-report.md:15-26` says `applied`: “`guides/scaffold.md:16` and `README.md:10` name the set `HOST_PATHS` holds.” The current text matches.
  - **Proof reading:** Documentation sweep. The report and independent sweep agree.

- **scaffold-obj-1**
  - **Site now:** `package.json:65` is `"lint": "oxlint --config .oxlintrc.json --fix ."`. `:73` retains the separate `lint:check` command with `--deny-warnings`.
  - **Diff:** `@@ -62,7 +62,7 @@`; the exact operative command is in the `+` line.
  - **Old form sweep:** `--fix --deny-warnings` over `src`, `tests`, `guides/scaffold.md`, `guides/README.md`, and `README.md`: no hit. Broader `--deny-warnings` hits are the generated `lint:check` declarations at `src/core/compilers.ts:287`, `tests/src/core/fixtures/source-manifest.txt:44`, and `tests/src/core/fixtures/setup-false-manifest.txt:44`.
  - **Report:** `conform-scaffold-report.md:15-26` says `applied`: “`package.json:65` `lint` is `oxlint --config .oxlintrc.json --fix .`.” The current manifest matches.
  - **Proof reading:** Placement/naming sweep; no behavioral control is required.

- **scaffold-obj-2**
  - **Site now:** `src/core/factories.ts:44-69` still contains the factory and clone-before-parse behavior. The new mirrored proof is `tests/src/core/factories.test.ts`, with `describe` blocks at `:11`, `:48`, `:71`, and `:91`.
  - **Diff:** `@@ -0,0 +1,114 @@`; the new test file is present.
  - **Old form sweep:** No renamed or removed symbol; no old-form sweep applies.
  - **Report:** `conform-scaffold-report.md:15-26` says `applied`: “`tests/src/core/factories.test.ts` added; three planted-body controls read red, restored green.” The file and controls exist.
  - **Proof reading:** `obj2-red-control.txt` reports `Tests 2 failed | 386 passed (388)`. `obj2-green.txt` reports `Tests 388 passed (388)`.
  - **Repair gap:** The operative repair requests an off-shape `src: ['browser', 'nowhere']` value through an `unknown` record. The current refusal tests at `:92-105` cover an oversized `keywords` list and an empty name instead. The report's narrower file-existence reading matches, but its `applied` disposition does not establish that requested off-shape case.

- **scaffold-obj-3**
  - **Site now:** `supportsMode` is imported at `tests/src/server/WriteTransaction.test.ts:18` and used at `:206` and `:227`; it is imported at `tests/src/server/helpers.test.ts:91` and used at `:1582`. The platform skips at `WriteTransaction.test.ts:281` and `helpers.test.ts:596` remain.
  - **Diff:** Hunk headers are `@@ -15,7 +15,7 @@`, `@@ -200,10 +200,10 @@`, `@@ -221,10 +221,10 @@`, `@@ -88,7 +88,7 @@`, and `@@ -1575,9 +1575,11 @@`; all three mode predicates use `!supportsMode()`.
  - **Old form sweep:** `process.platform === 'win32'` over the required paths finds only the permitted link and race cases at `tests/src/server/WriteTransaction.test.ts:281` and `tests/src/server/helpers.test.ts:596`.
  - **Report:** `conform-scaffold-report.md:15-26` says `applied`: “Three skips read `supportsMode` from `@orkestrel/test/server`; control proves the cases execute.” The current sites match.
  - **Proof reading:** `obj3-red-control.txt` reports `Tests 3 failed | 428 passed (431)`. `obj3-green.txt` reports `Tests 431 passed (431)`.

- **scaffold-obj-4**
  - **Site now:** `src/server/types.ts:355-357` still declares `export interface ReadAllowance { remaining: number }`; its deliberate-mutability remarks remain at `:347-354`.
  - **Diff:** No hunk touches this site.
  - **Old form sweep:** No removed or renamed form; no sweep applies.
  - **Report:** `conform-scaffold-report.md:15-26` says `noop`: “The row directs no edit while the exemption stands, and the Orchestrator has not overturned it.” The report pointer and current tree agree.

- **scaffold-obj-5**
  - **Site now:** `src/bin/helpers.ts:576-577` exports `sanitizeLine` and uses `replace(/\r\n|\r|\n/gu, ' ')`; the added rationale is at `:564-568`. The helper proof is at `tests/src/bin/helpers.test.ts:540`, and the CLI proof is at `tests/src/bin/CLI.test.ts:427-434`.
  - **Diff:** Hunk headers are `@@ -562,6 +562,9 @@`, `@@ -571,7 +574,7 @@`, `@@ -424,6 +424,16 @@`, and `@@ -537,6 +537,7 @@`; the replacement and both assertions are present.
  - **Old form sweep:** `stripControls(strip(line)).split(/\r?\n/).join(' ')` over the required paths: no hit.
  - **Report:** `conform-scaffold-report.md:15-26` says `applied`: “`sanitizeLine` folds a lone `\r`; helpers and CLI proofs read red first.” The current implementation and tests match.
  - **Proof reading:** `obj5-red-control.txt` reports `Tests 2 failed | 243 passed (245)`. `obj5-green.txt` reports `Tests 245 passed (245)`.

- **fleet-F1**
  - **Site now:** `tests/setup.ts` has no `isBrowserVuePath`; `tests/setup.test.ts` does not exist. `src/` contains `bin`, `core`, and `server`, with no browser environment.
  - **Diff:** No hunk applies.
  - **Old form sweep:** `isBrowserVuePath` over `src`, `tests`, `guides/scaffold.md`, `guides/README.md`, and `README.md`: no hit.
  - **Report:** `conform-scaffold-report.md:22-26` says `noop`: “`tests/setup.ts` declares no `isBrowserVuePath` and no `tests/setup.test.ts` exists.” The current tree matches.

- **fleet-F2**
  - **Site now:** No `readonly id: string` data field appears under `src`. The implementation class blocks named by the report use `#` fields rather than public data fields.
  - **Diff:** No hunk applies.
  - **Old form sweep:** Word-boundary `readonly id: string` over `src`, `tests`, `guides/scaffold.md`, `guides/README.md`, and `README.md`: no hit.
  - **Report:** `conform-scaffold-report.md:22-26` says `noop`: “No implementation class declares a public `readonly id: string` data field.” The current tree matches.

### Scope

`conform-scaffold.status:1-16` tags these paths:

- **Owned:** `README.md`, `guides/scaffold.md`, `package.json`, `src/bin/helpers.ts`, `src/core/compilers.ts`, `src/core/helpers.ts`, `tests/guides.test.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/bin/helpers.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/server/WriteTransaction.test.ts`, and `tests/src/server/helpers.test.ts`.
- **Shared/report-only:** no status path matches the brief's defined Shared category.
- **Off-limits:** no status path is explicitly listed as Off-limits.
- **Scope-unlisted:** `.orkestrel/campaign/conform/ledgers/followons.md`, `.orkestrel/campaign/conform/reports/conform-scaffold-report.md`, `.orkestrel/campaign/conform/units/l3/scaffold-implement-direct.md`, and `host.json`. The brief does not classify these paths as Owned, Shared, or Off-limits.

Diff hunks whose files have no row `Where`:

- `.orkestrel/campaign/conform/ledgers/followons.md @@ -61,3 +61,4 @@` — first `+` line records the scaffold follow-on.
- `.orkestrel/campaign/conform/reports/conform-scaffold-report.md @@ -0,0 +1,326 @@` — first `+` line is `# Unit conform-scaffold — report`.
- `.orkestrel/campaign/conform/units/l3/scaffold-implement-direct.md @@ -0,0 +1,230 @@` — first `+` line is `# Unit conform-scaffold — report`.
- `host.json @@ -682,7 +682,7 @@` — first `+` line changes the guide digest.
- `host.json @@ -772,5 +772,5 @@` — first `+` line changes the inventory digest.
- `tests/guides.test.ts @@ -3,12 +3,12 @@` — first `+` line imports `fenceImports`.
- `tests/guides.test.ts @@ -99,7 +99,7 @@` — first `+` line calls `missingSymbols`.
- `tests/guides.test.ts @@ -109,7 +109,7 @@` — first `+` line calls `missingSymbols`.
- `tests/guides.test.ts @@ -185,7 +185,7 @@` — first `+` line calls `fenceImports`.

### Residue

The diff `+`-line sweep for `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` returned no hits.

The same tree sweep over `src` and `tests`, excluding the vendored policy, configuration, and distribution files, returned:

- `src/core/compilers.ts:283`
- `src/core/types.ts:60`
- `src/core/templates.ts:1092`, `:1732`, `:1965`
- `src/server/types.ts:316`, `:317`, `:320`, `:330`, `:334`
- `src/server/Upstream.ts:96`, `:108`, `:163`, `:168`, `:764`, `:771`, `:778`, `:787`, `:788`, `:797`, `:801`, `:808`, `:815`, `:826`
- `src/server/constants.ts:103`, `:127`
- `src/server/validators.ts:208`, `:446`, `:462`, `:463`
- `tests/src/core/fixtures/source-manifest.txt:40`
- `tests/src/core/fixtures/setup-false-manifest.txt:40`
- `tests/src/core/compilers.test.ts:1132`
- `tests/src/server/Upstream.test.ts:704`, `:1471`, `:1477`
- `tests/src/core/templates.test.ts:247`, `:1091`
- `tests/src/bin/main.test.ts:137`, `:160`, `:192`
- `tests/src/server/WriteTransaction.test.ts:262`, `:280`
- `tests/setupServer.ts:167`, `:362`, `:364`, `:652`, `:654`, `:658`, `:660`

These are existing timeout, retry, skip, and console-related behavior or fixtures; none was added by this diff.

### Parity

No diff hunk touches `src/**/types.ts` or an implementation class file, so the class/interface parity table is empty.

Backticked identifiers added to guide prose or guide tables:

| Identifier | Barrel reading |
| --- | --- |
| `HOST_PATHS` | Exported through `src/core/index.ts:2` via `constants.ts` |
| `isFloorPath` | Exported through `src/core/index.ts:8` via `helpers.ts` |
| `isRetainedPath` | Exported through `src/core/index.ts:8` via `helpers.ts` |
| `listCanonPaths` | Exported through `src/server/index.ts:4` via `helpers.ts` |
| `pruneEmptiedDirectories` | Exported through `src/server/index.ts:4` via `helpers.ts` |
| `WriteTransaction` | Exported through `src/server/index.ts:5` |
| `compile`, `audit`, `block`, `error`, `destroy` | Event members of exported `CompilerEventMap` at `src/core/types.ts:575` |
| `write`, `remove`, `finish`, `error`, `destroy` | Event members of exported `MaterializerEventMap` at `src/server/types.ts:32` |
| `release`, `mirror`, `file`, `error`, `destroy` | Event members of exported `UpstreamEventMap` at `src/server/types.ts:303` |

The guide's `## Methods` tables remain aligned with the existing interfaces at `guides/scaffold.md:424-470`. No readonly data-property Surface row changed.

### Gates

The report's `## Gates` table at `conform-scaffold-report.md:200-208` states:

| Command | Reported exit |
| --- | --- |
| `npm run format:check` | `0` |
| `npm run lint:check` | `0` |
| `npm run check` | `2` |
| `npm run check:src` | `0` |
| `npm run build` | `0` |
| `npm test` | `1` |

The named proof files support the scoped readings. The report's `check` and `npm test` readings are stale against the current `tests/guides.test.ts`, which now uses `fenceImports` at `:6`, `:188` and `missingSymbols` at `:8`, `:102`, and `:112`. No fresh clean gate receipts were supplied for those updated files.

### Breaking

The report states at `conform-scaffold-report.md:270`: “No published symbol was renamed or removed, so no consumer edit is obliged.”

The shared `tests/guides.test.ts` patch renames dependency helpers, not published scaffold symbols. No published old-name sweep across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src` applies.

The report also records that `guides/scaffold.md` is a `HOST_PATHS` member and that `host.json` changed at `conform-scaffold-report.md:272-280`.

### Writing sweep

The diff-added prose sweep over `guides/**`, `README.md`, source doc comments, and test titles/comments used:

- `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`
- `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`

No hits occurred in diff-added prose. The existing `guides/README.md:34` occurrence of `` `new` `` is a code token outside the diff.

## Distillate

- `scaffold-subj-1`: site now corrected | diff present yes | old form hits 0 | report matches yes
- `scaffold-subj-2`: site now corrected | diff present yes | old form hits 0 | report matches yes
- `scaffold-subj-3`: site now corrected | diff present yes | old form hits 0 | report matches yes
- `scaffold-subj-4`: Surface rows corrected; TSDoc phrases remain | diff present yes | old form hits 3 | report matches yes
- `scaffold-subj-6`: four examples present | diff present yes | old form hits 0 | report matches yes
- `scaffold-subj-7`: set descriptions corrected | diff present yes | old form hits 0 | report matches yes
- `scaffold-obj-1`: lint command corrected | diff present yes | old form hits 0 | report matches yes
- `scaffold-obj-2`: mirrored test present but requested off-shape case absent | diff present yes | old form hits 0 | report matches no
- `scaffold-obj-3`: three mode skips probe capability | diff present yes | old form hits 2 permitted | report matches yes
- `scaffold-obj-4`: exemption unchanged | diff present no | old form hits 0 | report matches yes
- `scaffold-obj-5`: lone carriage return folded | diff present yes | old form hits 0 | report matches yes
- `fleet-F1`: helper and browser axis absent | diff present no | old form hits 0 | report matches yes
- `fleet-F2`: public `id` field absent | diff present no | old form hits 0 | report matches yes

Scope tags: Owned paths are the package source, tests, guides, README, and manifest listed above. The campaign records and `host.json` are scope-unlisted. No explicit Off-limits path appears in the supplied status.

Residue: no matching additions in diff `+` lines. Existing tree hits are listed in the Residue block above.

Writing hits: none in diff-added prose. Count-pattern hits: none in diff-added prose.

Parity: no changed interface or class entity; every added public guide identifier resolves through the appropriate barrel, and event labels resolve as members of exported event maps.

## Unknowns

- A fresh post-patch `npm run check` and `npm test` result is unavailable. The report's gate table still records the pre-patch failures, while its later integration note claims green reruns without supplying matching receipts.
- The current factory proof does not show the operative off-shape `src: ['browser', 'nowhere']` case requested by `scaffold-obj-2`.
- A live `git status --short` reading was not independently obtained; the supplied status file was used for containment.
- `host.json` and the `.orkestrel` campaign paths are not classified by the brief's Scope rows.

## Journal

Leave this line for the driver.

## Deviation

No file was changed by this read-only lane.

The supplied status contains scope-unlisted campaign records and `host.json`; `host.json` is outside the brief's Owned and Off-limits lists.

The report's gate table does not match the current `tests/guides.test.ts` after the helper rename. Fresh clean gate evidence remains unavailable.

`scaffold-obj-2` is marked applied in the report, but its requested off-shape input assertion is absent from `tests/src/core/factories.test.ts`.