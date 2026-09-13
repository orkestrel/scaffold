## Audit verdict — U-fix-5, subjective lane

Lane held: **subjective** (design fit, naming, guide voice, product coherence), `reviewer` on Opus 5, read-only, native. I wrote no part of the subject. Objective matters I could not settle in this lane are referred, not ruled.

Evidence opened: `/home/user/scaffold/tmp/units/u-fix-5-audit-brief.md`, `tmp/evidence/u-fix-5.diff.txt`, `tmp/evidence/u-fix-5.diffstat.txt`, `tmp/evidence/u-fix-5.status.txt` (empty), `.orkestrel/campaign/u-fix-5-brief.md`, `u-fix-5b-brief.md`, `u-fix-5-report.md`, `u-fix-5-integrate-report.md`, `u-fix-4-brief.md`, `u-fix-4-audit-verdict.md`, `evidence/linux-gate/{devengines-floor,devengines-interval,npm-boundary-readings,path-prepend,node-index-floor,remedy-control}.log.txt`, `devengines-interval.sh`, `dist-chain-compare-4.log.txt`, `final6.status.txt`, and the shipped `guides/scaffold.md`, `README.md`, `ROADMAP.md`, `src/core/constants.ts`, `host.json`, `package.json`, `src/core/compilers.ts`.

---

### 1. Item A landed exactly — CONFIRMED

`tmp/evidence/u-fix-5.diff.txt:100-114` is the single `guides/scaffold.md` hunk, `@@ -1457,11 +1457,11 @@`. Each replacement matches `u-fix-5-brief.md` item A across its wrap, read against the tree at `guides/scaffold.md:1460-1464`:

- `:1460-1461` reads "A generated workspace on Node 22.18.0 or later therefore meets an npm that ignores the record only under an npm other than the bundled one." — item A.1 verbatim.
- `:1461-1462` reads "Run a generated workspace on npm 11.6.0 or later: every release from 10.9.0 up to 11.6.0 refuses it, and 11.6.0 installs it." — item A.2 verbatim.
- `:1463-1465` reads "Raise it with the `npm install --global npm@11.6.0` command before the first install; that command installs an npm that reports 11.6.0." — item A.3 verbatim.

Attacked: the removed line `-later. A generated workspace therefore meets…` begins with the tail of the preceding sentence, so a rewrap there could have altered "Every Node release at 22.18.0 or later bundles an npm at 10.9.0 or later." The added line preserves "later. A generated workspace on Node 22.18.0…" — that sentence is unchanged. No other line of the paragraph appears in the hunk, and the hunk's line tally is unchanged at eleven-to-eleven with the added text accounting for every insertion. My own sweep for the dropped phrases (`or a later release`, `first release that installs`, `only where a developer`, `in place of the bundled`) over every `*.md` file returns hits only under `.orkestrel/campaign/`, never in a shipped file.

### 2. Every sentence of the guide paragraph is carried by its amended source — CONFIRMED

One row per sentence of `guides/scaffold.md:1451-1466`, keyed by its opening words. Entry numbers are `u-fix-4-brief.md` § Sentences as amended by `u-fix-4-audit-verdict.md` § Amended sentence set.

| Sentence (opening words) | Entry | Source and exact reading | Verdict |
| --- | --- | --- | --- |
| "Every generated manifest declares the toolchain…" | 1 | `src/core/compilers.ts:580-581` — `devEngines: WORKSPACE_DEV_ENGINES` and `engines: { node: blueprint.engines }` sit in the unconditional manifest body, outside every spread guard | CONFIRMED |
| "The `engines.node` field carries the blueprint's `engines` value…" | 2 | `compilers.ts:581`; `src/core/constants.ts:480,489` — `MINIMUM_NODE_VERSION = '22.18.0'`, `DEFAULT_ENGINES = \`>=${MINIMUM_NODE_VERSION}\`` | CONFIRMED |
| "The `devEngines.packageManager` record names npm at the `>=11.6.0` range…" | 3 | `constants.ts:483,502-507` — frozen `{ name: 'npm', version: '>=11.6.0', onFail: 'error' }`; `compilers.ts:580` takes no blueprint input | CONFIRMED |
| "An npm at 10.9.0 or later reads that record." | 4 | `devengines-floor.log.txt:9-10` (10.9.0, 10.9.3 `refused=yes code=EBADDEVENGINES`), `npm-boundary-readings.log.txt:40-41,48-50`, `devengines-interval.log.txt:19-34` (every release from 10.9.1 through 11.5.2 `refused=yes`). Coverage: every release the campaign names from 10.9.0 through 12.0.2 | CONFIRMED |
| "Such an npm earlier than 11.6.0 refuses the `npm install` command … with the `EBADDEVENGINES` code, before resolving the dependency graph." | 5 | `devengines-interval.sh:25` fixes `refused` as `grep -q EBADDEVENGINES i.log`, so every `refused=yes` row in `devengines-interval.log.txt:19-34` is a reading of that code, and `devengines-floor.log.txt:9-10` prints the code column directly. The code is therefore carried at every release in the interval, not only at its ends | CONFIRMED |
| "npm 10.9.7 refuses an `npm run` command…" | 6 | `path-prepend.log.txt:1,6-9` — ambient 10.9.7, "ambient npm, nested run", `npm error code EBADDEVENGINES`, `exit=1`. Claimed of that release alone | CONFIRMED |
| "The releases measured earlier than 10.9.0, npm 10.5.0 and npm 10.8.3, ignore the record and fail inside dependency resolution instead." | 7 | `devengines-floor.log.txt:7-8,12-13` — both `refused=no crash=yes`. The sentence self-bounds to "the releases measured" | CONFIRMED |
| "Every Node release at 22.18.0 or later bundles an npm at 10.9.0 or later." | 8 | `node-index-floor.log.txt:1-2` — index read 2026-09-13, lowest bundled npm 10.9.0 at v23.3.0 across every release at or after v22.18.0 | CONFIRMED |
| "A generated workspace on Node 22.18.0 or later therefore meets an npm that ignores the record only under an npm other than the bundled one." | 8, amended | `node-index-floor.log.txt:1-2` plus the preceding row. Population bounded to Node 22.18.0 or later, exactly as the amendment prescribes; no actor named | CONFIRMED |
| "Run a generated workspace on npm 11.6.0 or later: every release from 10.9.0 up to 11.6.0 refuses it, and 11.6.0 installs it." | 9, amended | refusal half as the entry 5 row; install half from `npm-boundary-readings.log.txt:42` — `11.6.0 guard exit=0 refused=no crash=no added 69 packages`. Stated as the measured reading rather than as "the first release" | CONFIRMED, with referral R-1 on the interval's membership rule |
| "Read the ambient version with the `npm --version` command." | 10 | `remedy-control.log.txt:1` and `path-prepend.log.txt:1,12,17` — the command run and its self-report read | CONFIRMED |
| "Raise it with the `npm install --global npm@11.6.0` command before the first install; that command installs an npm that reports 11.6.0." | 10, amended | `remedy-control.log.txt:3-5` — `added 1 package in 3s`, `exit=0`, "installed npm self-reports: 11.6.0". The untested alternative is gone | CONFIRMED |
| "The npm readings come from a Linux host on Node 22.22.2, on 2026-09-13, and the bundled versions come from the Node release index read that day." | 11, the bound | Node and date from `devengines-floor.log.txt:1`, `devengines-interval.log.txt:1`, `node-index-floor.log.txt:1`. The host name has no reading in the retained set — see F-3; corroborated by `devengines-interval.sh:9` and `path-prepend.log.txt:16` writing into the scratchpad of session `488431e0-a918-55f9-9e40-378c151c8130`, this session, whose platform is Linux | CONFIRMED on the corroboration; gap recorded as F-3 |

No sentence sits outside the set: every shipped sentence maps to an entry, with entry 8 and entry 10 each split for one idea per sentence, and the paragraph's order follows § Sentences.

Attacked and held: whether "every release from 10.9.0 up to 11.6.0" reads inclusively against "and 11.6.0 installs it" — the second clause disambiguates the first in the same sentence. Whether "Raise it" can attach to "the `npm --version` command" rather than to "the ambient version" — the parallel "Read X with the A command / Raise it with the B command" fixes the referent, and raising a command carries no sense. Whether the amended entry 4 and entry 5 universals over "10.9.0 or later" reach unmeasured future releases — they do, inherently for any floor statement, and the amendment fixed this wording last round; I report the coverage rather than reopening it.

### 3. Item B landed exactly and the pin holds — CONFIRMED

`tmp/evidence/u-fix-5.diff.txt:1-11` is the single `README.md` hunk, `@@ -65,7 +65,7 @@`, one line changed: "command, or a later release, before the first install." becomes "command before the first install." Nothing else in § Notes moved. The tree reads `README.md:67-68` "Raise it with the `npm install --global npm@11.6.0` command before the first install."

My sweep of `README.md` for `or later` returns `:12` ("The executable needs Node 22.18.0 or later.") and `:62` ("An npm at 10.9.0 or later and earlier than 11.6.0"). The `Node <version> or later` phrase the pin in `tests/guides.test.ts` anchors on exists only at `:12`. `test:guides` exits 0 at `final6.status.txt:11`.

### 4. Item D landed exactly — CONFIRMED

`tmp/evidence/u-fix-5.diff.txt:136-149` is the single `src/core/constants.ts` hunk, `@@ -495,8 +495,7 @@`. The release-free universal is gone; the tree reads `constants.ts:495-501` with `:498` ending at "…rather than resolving its dependency graph." Every other line of the block appears as unchanged context: `:495-497` and `:499-501`. The description paragraph at `:492` sits outside the hunk, so "Holds the `devEngines` record every generated manifest carries." is byte-identical. `guides/scaffold.md:168` carries that same sentence as its `WORKSPACE_DEV_ENGINES` `Summary` cell, and the guide diff's only hunk is at `:1457`, so the parity row is byte-identical. My sweep for "does not read the record" and "fails inside dependency resolution" over the tree returns hits only under `.orkestrel/campaign/`.

Attacked: whether the deletion left the block incoherent by removing what an ignoring npm does. It does not — `:496-498` reads "An npm at 10.9.0 or later reads the `devEngines` record. Such an npm earlier than the floor refuses an install…", so "Such an npm" resolves inside the block and the block now claims only what a source carries.

### 5. Item C landed the token rule across the named rows — BROKEN

Holding clauses: `from 10.9.0 on` is gone (`ROADMAP.md:389` reads "An npm at 10.9.0 or later reads"); `beneath the floor` is gone (`:386`, `:454` read "earlier than the floor"); the `matchesEngines` row is present at `:431-434`, verbatim as item C prescribes, and my sweep returns that token once; no line outside the named rows changed, since every ROADMAP hunk in the diff lies inside `:371-458`; and `earlier` and `later` are the only direction words there, the sole sweep hit at `:431` being the quoted cell text "at or above the supported minimum", which is the row's own subject and exempt as quoted data.

Broken clause: "every backticked token is followed by its noun" is false, and one site is a subject miss rather than a claim overreach.

- `ROADMAP.md:458` — "…to the `MINIMUM_NODE_VERSION` constant in `src/core/constants.ts`." The `src/core/constants.ts` token ends the sentence with no noun. This is inside the 0.0.65 successor row item C names, and item C's rule names exactly this class: "a path ending in `.ts` or `.md` or `.txt` takes 'file'". The unit neither nouned it (`u-fix-5-report.md:47-59` lists every token it nouned, and this is not among them) nor reported it as unruled (`:65` names only `src:server` and `scripts/ollama.sh`, both closed by U-fix-5b). **Why it matters:** the round's own acceptance rests on the unit having applied a stated rule exhaustively inside a bounded region; a missed instance the unit did not report means the region was not swept, so the region's other unruled tokens carry no assurance either. **Right looks like:** `ROADMAP.md:458` reads "…constant in the `src/core/constants.ts` file." — nothing else on the line changes.
- `ROADMAP.md:431` — the added row writes "the `matchesEngines` summary cell in `guides/scaffold.md` reads", a `.md` path with no noun, against item C's own token rule. The unit landed the row verbatim as item C dictates, so the subject is correct and the prescription contradicts itself. Brief defect, recorded under F-4. **Right looks like:** the row reads "in the `guides/scaffold.md` file".
- The claim's universal also reaches token classes item C's rule does not name, and the unit correctly left each alone: the version literals at `:394` (`22.18.0`), `:420` (`24.0.0`, `24.3.x`), `:423` (`24.4.0`), the range at `:419-420` (`^22.18.0 || >=24.4.0`), the `.json` paths at `:397-398` and `:457`, the build pin at `:409` (`target: 'node22'`), the path-and-line citations at `:411-412`, and the quoted words at `:448-450` (`host`, `host npm`, `ambient`) and `:432` (`earlier`, `later`). Brief defect: the claim is wider than the prescription it audits.

`ROADMAP.md` is neither in `package.json`'s `files` array (`dist/src`, `dist/bin`, `dist/host`, `README.md`) nor among `host.json`'s vendored storage paths, so no broken clause here names a shipped byte.

### 6. `host.json` follows the vendored guide edit and the landing is one commit — NOT-EVIDENCED on the one-commit clause

The vendoring half is CONFIRMED. `tmp/evidence/u-fix-5.diff.txt:116-135` changes exactly the `guides/scaffold.md` inventory row's digest to `3f26b6d6649a7fb5882c02d674c5c10386706e87a5305b863a0d2028a2bf5043` plus the root digest, and nothing else in `host.json`. `host.json` carries `guides/scaffold.md` as a vendored storage path, so the guide edit obliges that row. A mechanism that can disagree confirms it: `final6.status.txt:9` reads `test:config exit=0` after `final6.status.txt:1` `build exit=0`, and `u-fix-5-integrate-report.md:13-14` states the inventory case read the regenerated digest.

The one-commit clause is not evidenced by this portfolio. Its only support is `u-fix-5-integrate-report.md:17-18` and the audit brief's § Already established, both written by the unit that performed the landing. My lane has no git reading and no tool that can take one, so I rule it NOT-EVIDENCED rather than CONFIRMED. Settling command: `git show --name-only e158702` and `git log --oneline 0834f2a..e158702`.

### 7. Nothing outside the carriers moved — CONFIRMED

`tmp/evidence/u-fix-5.diffstat.txt:1-6` names `README.md`, `ROADMAP.md`, `guides/scaffold.md`, `host.json`, and `src/core/constants.ts`, and no other path. `tmp/evidence/u-fix-5.status.txt` is empty, so the tree is clean at the tip.

`dist-chain-compare-4.log.txt:4-29` compares a fresh `0834f2a` build against the checkout's `dist/src`, maps excluded and whitespace ignored per the contract, and every difference is the shortened doc block in `index.cjs`, `index.d.cts`, `index.d.ts`, and `index.js` — the same removed pair of lines in each. `:30-31` reads `dist/bin` `diff exit=0 lines=0`.

Noted: the diff was taken with campaign records excluded, so the commit also carries `.orkestrel/campaign/` files by design; claim 7 is about the product surface and holds there.

### 8. The authoritative host run is green — CONFIRMED

`final6.status.txt:1-13` reads `exit=0` on every row: `build`, `format:check`, `lint:check`, `check`, `test:src:core`, `test:src:server`, `test:src:bin`, `test:policy`, `test:config`, `test:setup`, `test:guides`, `distribution(release)`, and `prepublishOnly(literal)`. No row reports anything else.

### 9. The package is coherent to ship — CONFIRMED

The emitted record, `constants.ts:502-507`, is `{ name: 'npm', version: '>=11.6.0', onFail: 'error' }`. Each shipped carrier describes that record and the refusal a developer meets in the same terms and the same vocabulary:

- `README.md:61-63` — "declares an npm floor of 11.6.0 in its `devEngines` record. An npm at 10.9.0 or later and earlier than 11.6.0 refuses the `npm install` command there with the `EBADDEVENGINES` code, before resolving the dependency graph."
- `guides/scaffold.md:1453-1456` — the same floor, the same code, the same boundary.
- `constants.ts:495-498` — the same floor and refusal, without the host-varying code, as `u-fix-4-brief.md` item C prescribes.
- The remedy sentence is now identical in intent and command across `README.md:67-68` and `guides/scaffold.md:1463-1465`, and both drop the alternative no control ran.
- `README.md:66` "No Node release the executable supports bundles an npm earlier than 10.9.0." agrees with `node-index-floor.log.txt:2` and with `README.md:12`'s declared Node floor.

Attacked and ruled retained: `guides/scaffold.md:232`, the `matchesEngines` summary cell, reads "at or above the supported minimum" while the same guide's toolchain paragraph now uses `earlier` and `later`. That cell ships in `dist/host` and its source paragraph ships in `dist/src`. `u-fix-4-audit-verdict.md:49-51` ruled it pre-existing and out of 0.0.65, and `ROADMAP.md:431-434` carries it as a successor's row with the repair named. It is a recorded deferral, not a disagreement about any npm fact, so it does not break this claim. The drift reaches further than that row records — see F-1.

---

## Findings outside the claims

**F-1. The shipped guide's direction vocabulary drifts beyond the cell the ROADMAP row defers.** `guides/scaffold.md:1166` reads "pinned to the older release", `:1200` "A newer major is never crossed for you", `:1234` "a floor below the newest release that major serves", `:1235` "a newer major the registry publishes", and `:232` "at or above the supported minimum". Each is a version direction, and `.claude/rules/writing.md` § Code tokens, references, and links fixes `earlier` and `later` for a version range and refuses `above` and `below`. `ROADMAP.md:431-434` defers only `:232`. Why it matters: the deferral record is narrower than the drift, so the successor release will repair the cell and leave the rest, and the guide keeps two vocabularies for one concept against `AGENTS.md` § Design laws, one concept one term. Right looks like: `ROADMAP.md:431-434` names the whole sweep — the `matchesEngines` cell plus the `guides/scaffold.md:1166,1200,1234,1235` direction words — as the row's subject, in a successor unit. This changes no shipped byte of 0.0.65. The `beneath` hits at `:1089`, `:1299`, `:1301`, `:1324`, `:1449`, and `:1866` are path containment rather than version direction and are permitted; `:1127` "older planned finding" is an artifact's age rather than a version and is permitted.

**F-2. The guide paragraph now states the refusal interval twice.** `guides/scaffold.md:1454-1456` states the refusal and its code, and `:1461-1462` restates it as "every release from 10.9.0 up to 11.6.0 refuses it", whose only fact not already in the paragraph is "11.6.0 installs it". The replaced sentence carried a causal clause instead of a restatement. Observation only, and no change is required in this round: the wording is `u-fix-4-audit-verdict.md:26`'s verbatim prescription and this round's bound is exactness, which claim 1 confirms. Recorded so a successor can weigh it against ISO 24495-1 "and nothing else" rather than rediscover it.

**F-3. No host reading backs the shipped "Linux host" clause.** `guides/scaffold.md:1465` and `README.md:69` state the readings come from a Linux host. My sweep of `.orkestrel/campaign/evidence/linux-gate/` for `uname|Linux|linux` returns no match, so no retained log records the host; `u-fix-4-audit-verdict.md:37` describes Grok's mark on that sentence as "a literal-line miss" citing "the log's `uname` reading", and that reading does not exist. `ROADMAP.md:380-381` states the campaign folder is pruned at acceptance, so after the prune the shipped host claim has no reading behind it and `.claude/rules/portability.md` § Claims requires the host and date behind a reading. Right looks like: the commit that retains the evidence records the host reading in its message, per the promotion rule in `.agents/orchestration.md` § Every dispatch is a file before it is a launch, or a retained log gains a `uname -sr` line. The claim itself is true on this host, which is why this is a record defect rather than a false sentence.

**F-4. Brief defects in the prescription and in the audit brief.** `u-fix-5-brief.md:77` forbids the phrase `Node <version> or later` "anywhere in the file" while `:155` requires `grep -c 'Node [0-9.]* or later' README.md` to read 1; the unit read the pair correctly and `u-fix-5-report.md:14` records the reconciliation, so no harm landed. `u-fix-5-brief.md:104-107` prescribes a row verbatim that breaks the token rule the same item states at `:97-99`. The audit brief's review-evidence list at `tmp/units/u-fix-5-audit-brief.md:13-21` omits `.orkestrel/campaign/u-fix-5b-brief.md`, which carries part of the prescription claim 5 is judged against; I found it on disk and ruled against it, and it prescribes exactly the two edits `u-fix-5-report.md:68-84` reports.

## Referral to the objective lane

**R-1. The interval instrument's population is a literal list, not a registry enumeration.** `devengines-interval.sh:2-3` states the script runs "every npm release the registry serves from 10.9.0 up to 11.6.0", and `:12` fixes the population as a hardcoded `VERSIONS` string. The union of that list with `devengines-floor.log.txt:9-10` and `npm-boundary-readings.log.txt:22-28,41` covers 10.9.0 through 10.9.9, 11.0.0, 11.1.0, 11.2.0, 11.3.0, 11.4.0, 11.4.1, 11.4.2, 11.5.0, 11.5.1, and 11.5.2. The shipped universal at `guides/scaffold.md:1461-1462` rests on that membership rule, so any patch release the registry serves inside the interval and outside the list is unmeasured. This is instrument coverage and population truth, which belongs to the objective lane; I rule nothing on it. Settling command: `npm view npm versions --json`, filtered to `>=10.9.0 <11.6.0`, compared against the union of rows in those three logs.

## Attacked and held

The exactness of every item A, B, and D replacement across its wraps, including the sentence boundary the item A.1 rewrap sits on. The absence of every dropped phrase from every shipped file, swept repository-wide rather than per file. Every sentence of the guide paragraph against its named log, including whether the `EBADDEVENGINES` code is carried at each release in the interval rather than only at its ends, which `devengines-interval.sh:25` settles. Whether the doc-block deletion left a gap a reader would misread. Whether the `WORKSPACE_DEV_ENGINES` parity row at `guides/scaffold.md:168` moved with the block. Whether any ROADMAP line outside the named rows changed. Whether a direction word survived inside those rows. Whether `README.md`'s pin anchor still sits alone at `:12`. Whether the `matchesEngines` deferral is a recorded exclusion or an unrecorded defect. Whether `dist/bin` moved.

## Unknown observations

- The one-commit landing, claim 6: `git show --name-only e158702` and `git log --oneline 0834f2a..e158702`. My lane holds no git reading.
- The `host.json` digest as a byte fact: `sha256sum guides/scaffold.md` against the `guides/scaffold.md` row in `host.json`. Corroborated here by `test:config exit=0` after `build` rather than computed.
- The checkout's `dist/` currency at the moment `dist-chain-compare-4.log.txt` ran: `bash .orkestrel/campaign/evidence/linux-gate/dist-chain-compare.sh 0834f2a` after a fresh `npm run build`. The reading rests on `final6.status.txt:1` preceding it with an empty working tree afterwards.

VERDICT: FAIL 5, 6; outside the claims: F-1, F-2, F-3, F-4, R-1