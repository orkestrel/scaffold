## Lane held

Subjective lane — design fit, naming, guide voice, product coherence — as the dispatch names it. The `orkestrel-falsify` verdict shape. I ran no command that writes; my tools were reads and content searches only, so every reading below is a file citation from the supplied portfolio.

## Finding

`guides/scaffold.md:1460-1461` ships a universal the retained reading does not cover, so claim 1 and claim 11 are BROKEN and the upload holds. Everything else in the rewrite rests on its named source.

## Claim 1 — every sentence of the guide paragraph is carried by its source: BROKEN

One row per sentence of the paragraph at `guides/scaffold.md:1451-1466`, in shipped order.

| Sentence as shipped | Entry | Source and exact reading | Verdict |
| --- | --- | --- | --- |
| "Every generated manifest declares the toolchain it is gated on." | 1 | `src/core/compilers.ts:580-581` — `devEngines: WORKSPACE_DEV_ENGINES` and `engines: { node: blueprint.engines }` sit in the manifest every compile emits | CONFIRMED |
| "The `engines.node` field carries the blueprint's `engines` value, which defaults to the `>=22.18.0` range." | 2 | `src/core/constants.ts:480` `MINIMUM_NODE_VERSION = '22.18.0'`, `:489` `DEFAULT_ENGINES = \`>=${MINIMUM_NODE_VERSION}\``, `compilers.ts:581` | CONFIRMED |
| "The `devEngines.packageManager` record names npm at the `>=11.6.0` range with its `onFail` key set to the `error` value, and no blueprint field varies that record." | 3 | `src/core/constants.ts:483,503-509` — frozen `{ name: 'npm', version: '>=11.6.0', onFail: 'error' }`, no blueprint input reaches it; `compilers.ts:580` | CONFIRMED |
| "An npm at 10.9.0 or later reads that record." | 4 | `devengines-floor.log.txt:9-10` (10.9.0, 10.9.3 `refused=yes code=EBADDEVENGINES`); `npm-boundary-readings.log.txt:40-41` (10.9.7, 11.5.0 `refused=yes`), `:48-50` (11.5.0, 11.6.0, 12.0.2 `refused=yes` under the control record) — the threshold is read from both sides | CONFIRMED |
| "Such an npm earlier than 11.6.0 refuses the `npm install` command in a generated workspace with the `EBADDEVENGINES` code, before resolving the dependency graph." | 5 | Guard refusals measured at 10.9.0 and 10.9.3 (`devengines-floor.log.txt:9-10`), 10.9.7 and 11.5.0 (`npm-boundary-readings.log.txt:40-41`); `crash=no` beside each `refused=yes` carries "before resolving the dependency graph". The interval is bracketed at both ends and inside; I attacked the interior and could not break it — a release between 10.9.7 and 11.5.0 cannot have stopped reading the record without one of those readings showing it. Referral R-1 records the interior's evidence gap | CONFIRMED |
| "npm 10.9.7 refuses an `npm run` command in such a workspace with the same code." | 6 | `path-prepend.log.txt:6-9` — `EBADDEVENGINES`, `exit=1`, ambient npm 10.9.7 (`:1`). Stated of 10.9.7 alone. Observation O-1 records that the fixture manifest is hand-written (`path-prepend.sh:12-16`) rather than produced by `scaffold new`, carrying a record identical in content to `constants.ts:503-509` | CONFIRMED |
| "The releases measured earlier than 10.9.0, npm 10.5.0 and npm 10.8.3, ignore the record and fail inside dependency resolution instead." | 7 | `devengines-floor.log.txt:7-8` — guard manifest, `refused=no crash=yes` for exactly those releases; the sentence names them and labels itself "measured" | CONFIRMED |
| "Every Node release at 22.18.0 or later bundles an npm at 10.9.0 or later." | 8 | `node-index-floor.log.txt:1-2` — index read 2026-09-13, lowest bundled npm 10.9.0 at v23.3.0 across the counted releases | CONFIRMED |
| "A generated workspace therefore meets an npm that ignores the record only where a developer installed such an npm in place of the bundled npm." | 8 | **BROKEN.** The source's population is releases at or after v22.18.0 (`node-index-floor.log.txt:1`). The sentence quantifies over every generated workspace, and the package ships no gate that narrows a workspace to that population: `engines.node` is declared but unenforced — `ROADMAP.md:382-383` records `engines.npm` and `engine-strict` "measured and rejected because the crash fires before engine validation" — and `WORKSPACE_DEV_ENGINES` declares only `packageManager`, no runtime (`constants.ts:503-509`). So a generated workspace on a Node line earlier than 22.18.0 is reachable, its bundled npm is outside every retained reading, and the word "only" claims that case away. The failing state: a developer runs `npm install` in a generated workspace under a Node release earlier than 22.18.0 whose bundled npm is earlier than 10.9.0; they meet an npm that ignores the record having installed nothing | BROKEN |
| "Run a generated workspace on npm 11.6.0 or later, because 11.6.0 is the first release that installs a generated workspace." | 9 | The instruction half is carried (`npm-boundary-readings.log.txt:16,29-31` — 11.6.0, 11.6.2, 12.0.2 clean). "the first release" is not: `npm-bisect.sh:9` walked minors 11.1.0 through 11.6.0, and `npm-boundary-readings.log.txt:15-16` reads 11.5.0 crash and 11.6.0 clean, so no reading covers a release between them | UNRESOLVED |
| "Read the ambient version with the `npm --version` command." | 10 | `remedy-control.log.txt:1` reads the ambient version | CONFIRMED |
| "Raise it with the `npm install --global npm@11.6.0` command, or a later release, before the first install; that command installs an npm that reports 11.6.0." | 10 | `remedy-control.log.txt:3-5` — `added 1 package`, `exit=0`, "installed npm self-reports: 11.6.0"; ambient 10.9.7 at `:1` | CONFIRMED |
| "The npm readings come from a Linux host on Node 22.22.2, on 2026-09-13, and the bundled versions come from the Node release index read that day." | 11 | `devengines-floor.log.txt:1` and `remedy-control.log.txt:1` ("on node v22.22.2"); `node-index-floor.log.txt:1` (index read 2026-09-13) | CONFIRMED |

**Required change.** `guides/scaffold.md:1460-1461`. Wrong: the clause claims the only route to an ignoring npm is a deliberate install, over a population its source excluded. Why it matters: the sentence ships in the published guide and is vendored into every target through `host.json`, and a developer on an unsupported Node who meets the dependency-resolution crash reads it and hunts for an npm they never installed. Right: carry the premise's bound into the conclusion and name the referent, for example "A generated workspace on Node 22.18.0 or later therefore meets an npm that ignores the record only where a developer installed an npm earlier than 10.9.0 in place of the bundled npm." That adds no fact outside § Sentences — it restates entry 8's own premise inside entry 8's conclusion — and it matches the scoping the README already uses at `README.md:66`.

## Claim 2 — no sentence sits outside the set: CONFIRMED

Every sentence in the preceding table maps to an entry, and I found no shipped fact the set does not list. I attacked the three clauses that read like additions and each is inside its entry: "before resolving the dependency graph" is entry 5, "that command installs an npm that reports 11.6.0" is entry 10, and "in place of the bundled npm" is entry 8. The order of the shipped sentences matches the order of § Sentences.

## Claim 3 — the README paragraph is the named subset, each sentence carried: CONFIRMED

`README.md:61-69` states entry 5 with the `scaffold new` command as the opening subject (`:61-63`), entry 7 bounded to npm 10.5.0 and npm 10.8.3 (`:64-65`), entry 8 in the anchored form "No Node release the executable supports bundles an npm earlier than 10.9.0." (`:66`), entry 10 (`:66-68`), and entry 11 without the Node version (`:69`). Nothing else. The opening sentence's "npm floor of 11.6.0 in its `devEngines` record" is entry 3's field serving as entry 5's subject, so it is inside the set either way.

No sentence claims a failure of every release earlier than 10.9.0: the only two candidates name the measured releases (`:64`) or say "No Node release … bundles" (`:66`). The pin holds: `tests/guides.test.ts:111` runs `/Node (?<floor>\d+\.\d+\.\d+) or later/u` with `exec`, which takes the first match, and `README.md:12` is the only such phrase in the file — my own sweep of the whole README for `Node [0-9.]* or later` returns that line alone. `readme-pin-control.log.txt:2-12` is a real instrument: its negative control rewrites the floor to 22.12 and the assertion at `tests/guides.test.ts:110-112` fails, its positive control restores 22.18.0.

Note, in contrast with the guide: this file states entry 8 scoped and makes no "only" claim. The README is the correct form of the fact the guide overclaims.

## Claim 4 — the doc block states its subset and moved no summary: CONFIRMED

`src/core/constants.ts:495-499` states entry 3, entry 4, entry 5's refusal with no error code ("refuses an install in a generated workspace rather than resolving its dependency graph"), and entry 7 narrowed to the exact wording the claim names: "An npm that does not read the record fails inside dependency resolution instead." The trailing `DEFAULT_ENGINES` cross-reference at `:500-501` is baseline text carrying no npm claim.

The description paragraph is byte-identical: it is a context line in the diff (`tmp/evidence/u-fix-4.diff.txt:149`, hunk `@@ -492,11 +492,11 @@` opening at the `@remarks` prose) and `dist-chain-compare-3.log.txt:7-44` shows the emitted change confined to the `@remarks` lines. The parity row is unchanged and still matches: `guides/scaffold.md:168` reads "Holds the `devEngines` record every generated manifest carries.", equal to `constants.ts:492`. `test:guides` exit 0 at `final5.status.txt:11`.

This block is the most defensible of the shipped carriers — it claims nothing about bundled npm at all, which is what makes the guide's version of entry 8 stand out.

## Claim 5 — the forms hold in every edited region: CONFIRMED

I swept the edited regions myself rather than reading the unit's readings.

- Versions in running prose are plain numerals. My search for `` `[0-9][0-9.]*` `` over `guides/scaffold.md` returns no hit inside 1451-1466, and no hit anywhere in `README.md`.
- Every backticked token is followed by its noun: the `engines.node` field, the `devEngines.packageManager` record, the `>=22.18.0` range, the `>=11.6.0` range, the `error` value, the `EBADDEVENGINES` code, the `npm install` command, the `npm run` command, the `npm --version` command, the `npm install --global npm@11.6.0` command, and in the ROADMAP rows the `@npmcli/arborist` package, the `setsid` command, the `timeout` command, the `tests/src/server/helpers.test.ts` file, the `…devengines-floor.log.txt` file.
- `earlier` and `later` are the only direction words. My case-insensitive sweep for `below|above|older|newer|beneath` over `README.md` returns nothing at all, and over `guides/scaffold.md` returns hits only outside the paragraph, each in a non-version sense (path containment at 1089, 1299, 1301, 1324, 1449, 1866; an earlier package release at 1127, 1166; a major at 1200, 1234, 1235) — except `:232`, recorded as finding F-3.
- No sentence-initial `It`: the pre-edit "It refuses each nested `npm run` command…" is gone (`tmp/evidence/u-fix-4.diff.txt:100-101`).
- No count: the earlier-release sentence names npm 10.5.0 and npm 10.8.3 as members and states no number, in the guide and the README both.
- No term from the substitution table: my sweep for `simply|easy|easier|just|via|currently|utilize|leverage|performant|robust|allows you to|should|e.g.|i.e.|etc.` over `README.md` returns nothing, and over `guides/scaffold.md` returns nothing in the edited range.

The `such an npm` anaphora is recorded as finding F-1 and does not break this claim: the named rule fixes `this`, `these`, and `it`, not `such`, so the brief's scope guard keeps it out of the required set.

## Claim 6 — placement is unchanged: CONFIRMED

`guides/scaffold.md:1401` ends "except the manifest." and `:1403` is the artifact list's first bullet. The paragraph opens at `:1451`, after the list's last bullet at `:1448-1449`, and the declaration-rollup paragraph follows at `:1468`.

## Claim 7 — item D landed exactly its token edits: CONFIRMED

`tmp/evidence/u-fix-4.diff.txt:25-84` carries the ROADMAP hunks and nothing else in that file: "the `@npmcli/arborist` package" (`:40`), "the 0.0.65 fix audit" with the backticks dropped (`:68`), "a host lacking the `setsid` command or the `timeout` command" (`:78-79`), "the pinned case in the `tests/src/server/helpers.test.ts` file asserts" (`:80-81`), "read from the `…devengines-floor.log.txt` file" at both occurrences (`:43-44`, `:58-59`), and "when the ambient one is earlier than the floor" in the proof row (`:53`). Every remaining changed line inside those hunks is a re-wrap of the edited sentence, with no other wording moved. I attacked the second hunk clause by clause against its pre-image and found no substantive edit riding along.

## Claim 8 — `host.json` follows the vendored guide edit and the landing is one commit: NOT-EVIDENCED

The digest clause holds: `host.json` carries `1896dedd931d927a42a8d520db7797ef4673fd99f7c0f0e6c4f673e5b9659929` for `guides/scaffold.md` (`tmp/evidence/u-fix-4.diff.txt:133`), and `test:config` — the case that recomputes the inventory digests — exits 0 after `build` in the same chain (`final5.status.txt:1,9`), which is a mechanism rather than a transcription.

The commit clause is not evidenced. The portfolio contains no `git show --name-only 5e72554` output; its only support is `u-fix-4-integrate-report.md:19` ("This report, the unit report, the code, and `host.json` land in one commit"), which is the writer's own report, and my tool set carries no shell. Settling command: `git -C /home/user/scaffold show --name-only --format=%H 5e72554`.

## Claim 9 — nothing outside the carriers moved: CONFIRMED

`tmp/evidence/u-fix-4.diffstat.txt:1-6` names `README.md`, `ROADMAP.md`, `guides/scaffold.md`, `host.json`, and `src/core/constants.ts`, and no other path; `tmp/evidence/u-fix-4.status.txt` is empty, so nothing is left uncommitted. `dist-chain-compare-3.log.txt:46-47` reads `dist/bin` `diff exit=0 lines=0`, and `:4-45` shows the `dist/src` difference confined to the reworded `@remarks` block in `index.cjs`, `index.d.cts`, and `index.d.ts`, sourcemaps excluded.

## Claim 10 — the authoritative host run is green: CONFIRMED

`final5.status.txt:1-13` reads `exit=0` on every row, including `test:config`, `test:guides`, release-mode `distribution`, and the literal `prepublishOnly`. I attacked the status file against its log: `final-verify5.log.txt` carries no `exit=[1-9]` line, and its only `failed` strings are `:144` and `:455`, both the expected output of the malformed-config fixture ("failed to load config from …/malformed/vite.config.ts").

## Claim 11 — the package is coherent to ship: BROKEN

The break is the same sentence as claim 1's, surfacing as a disagreement between shipped surfaces rather than against a source. `guides/scaffold.md:1460-1461` states the bundled-npm consequence unbounded ("only where a developer installed such an npm"), `README.md:66` states the same fact bounded to supported Node ("No Node release the executable supports bundles an npm earlier than 10.9.0."), and `src/core/constants.ts:495-499` declines the fact entirely. A developer reading the guide and the README gets two different scopes for one claim, and the wider one is the one the reading does not cover. One carrier, one fix: the required change under claim 1 closes this claim too.

Everything else in this claim agrees. The emitted record (`constants.ts:503-509`) is the `>=11.6.0` range with `onFail` `error` that the guide, the README, and the doc block each name; the refusal a developer meets is `EBADDEVENGINES` in `devengines-floor.log.txt:9-10` and `path-prepend.log.txt:7`, which is what the guide and the README print; the remedy the guide and the README give is the one `remedy-control.log.txt:3-5` ran to exit 0.

## Findings outside the claims

- **F-1. `guides/scaffold.md:1460-1461` — `such an npm` changes referent inside one paragraph.** The paragraph establishes "Such an npm" as "an npm at 10.9.0 or later" (`:1455`), then reuses the same phrase for its opposite, "an npm that ignores the record" (`:1461`). The nearer antecedent is correct, so the sentence is not wrong, but a reader who carries the earlier referent forward reads the remedy backwards. `.claude/rules/writing.md` § Sentence and paragraph order names `this`, `these`, and `it` rather than `such`, so the brief's scope guard makes this a recorded finding and not a required change. The claim 1 prescription writes the noun out and closes it in passing.
- **F-2. Brief defect, no shipped byte — `tmp/units/u-fix-4-audit-brief.md:36-37` mis-describes its own source.** § Already established reads "`npm-boundary-readings.log.txt` (10.9.7 and 11.0.0 through 11.5.0 refuse with the record …)". Those rows are plain-manifest crash readings: `npm-matrix.sh:10-13` and `npm-bisect.sh:11-14` write a `package.json` carrying `devDependencies` and no `devEngines` block, and the log records them as `edgesOut_crash=yes` (`npm-boundary-readings.log.txt:2-5,11-16`). Guard-manifest refusals exist for 10.9.0, 10.9.3, 10.9.7, and 11.5.0 only. The subject sentence survives this (claim 1, entry 5 row); the brief's statement of its own evidence does not.
- **F-3. `guides/scaffold.md:232` — `above` used as a version direction, pre-existing.** The `matchesEngines` Summary cell reads "Tests whether a declared engines floor is at or above the supported minimum." That is the direction word the campaign replaced with `earlier` and `later` everywhere it edited. It sits outside every region this unit owns, and the parity contract ties the cell to the export's description paragraph, so repairing it moves `src/` and re-emits `dist/src`. Carried to the next scope against the guide-voice capability, per `AGENTS.md` § Completion; it is not a required change for this upload.

## Referrals — outside my lane, no verdict from me

- **R-1. Interpolation inside a bracketed interval.** `guides/scaffold.md:1455-1456` and `README.md:62-63` claim the refusal of every npm at 10.9.0 or later and earlier than 11.6.0. Guard readings exist at 10.9.0, 10.9.3, 10.9.7, and 11.5.0; releases between 11.0.0 and 11.4.0 carry plain-manifest crash readings only (F-2). Whether a bracketed interval with a measured interior point counts as carried, or needs the interior releases run under the guard, is evidence sufficiency. To the objective lane, or to the Orchestrator if that lane did not run.
- **R-2. The boundary claim's granularity.** `guides/scaffold.md:1461-1462` calls 11.6.0 "the first release that installs a generated workspace" while `npm-bisect.sh:9` walked minors. Settling commands: `npm view 'npm@>=11.5.0 <11.6.0' version` to enumerate the gap, then `npm-bisect.sh` re-run over whatever it names. Same addressee as R-1. Ruling it needs a registry read I cannot take.

## Attacked and held

- Every sentence of the guide paragraph against its named source, one row each, reading the retained log rather than the unit's transcription of it.
- The set's closure in both directions: no shipped sentence outside § Sentences, and no § Sentences entry silently dropped from the carrier the brief assigns it to.
- The forms, re-swept by my own searches over `README.md` and `guides/scaffold.md` rather than accepted from `u-fix-4-report.md` § Criteria.
- The `npm run` reading's fixture, by reading `path-prepend.sh` rather than its log alone (O-1).
- The range readings' manifests, by reading `npm-matrix.sh` and `npm-bisect.sh` rather than their log alone — this is what produced F-2.
- The README pin's instrument, including its negative control, rather than the claim that the pin holds.
- `final5.status.txt` against `final-verify5.log.txt`, to check the status rows against the run that wrote them.
- The doc block's description paragraph and its parity row at `guides/scaffold.md:168`, for a silent summary move.
- Whether `README.md` or `ROADMAP.md` is a vendored path needing its own digest: neither appears as a `storage` entry in `host.json`, so `guides/scaffold.md` is the only vendored carrier this change touched, and its digest moved.

## Unknown observations

- **O-1. The `npm run` reading's workspace.** `path-prepend.sh:12-16` writes a hand-built manifest carrying `devEngines.packageManager` identical in content to `constants.ts:503-509`, not a workspace produced by `scaffold new`, while `guides/scaffold.md:1457` says "in such a workspace", which reads as the generated workspace. Settling command: `node dist/bin/main.js new <target>` under ambient npm 10.9.7, then `npm run <script>` in the target, and read the code and exit status. I did not break the sentence on this: the record is the whole mechanism and it is identical, and `final5.status.txt:12` shows the release-mode distribution proof driving `npm run` chains in a real generated workspace under ambient 10.9.7.
- **O-2. The Node lines earlier than 22.18.0.** No retained reading covers the npm each bundles; `node-index-floor.log.txt` reports per-major lowest npm for v22 through v26 only. Settling command: the same `nodejs.org/dist/index.json` read restricted to releases earlier than v22.18.0. Claim 1's break does not depend on the answer — the sentence's scope exceeds its source's population either way — but the answer decides whether the shipped sentence is merely unsourced or also false.

Claim 8 is NOT-EVIDENCED and claim 1's "first release that installs" row is UNRESOLVED; neither is a PASS, and each names the command that settles it.

VERDICT: FAIL 1, 11; outside the claims: F-1, F-2, F-3