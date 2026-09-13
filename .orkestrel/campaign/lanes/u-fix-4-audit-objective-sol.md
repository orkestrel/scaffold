## Numbered verdicts

### 1. BROKEN

The guide contains sentences whose stated ranges exceed their retained sources.

| Guide sentence | § Sentences entry | Ruling and exact reading |
|---|---:|---|
| “Every generated manifest declares the toolchain it is gated on.” | 1 | CONFIRMED — `src/core/compilers.ts:580-581` emits the `devEngines` and `engines` fields. |
| “The `engines.node` field carries the blueprint's `engines` value, which defaults to the `>=22.18.0` range.” | 2 | CONFIRMED — `src/core/constants.ts:479-489` defines 22.18.0 and derives the range; `src/core/compilers.ts:581` emits `blueprint.engines`. |
| “The `devEngines.packageManager` record names npm at the `>=11.6.0` range with its `onFail` key set to the `error` value, and no blueprint field varies that record.” | 3 | CONFIRMED — `src/core/constants.ts:482-483,503-509` defines the record; `src/core/compilers.ts:580` emits that constant directly. |
| “An npm at 10.9.0 or later reads that record.” | 4 | BROKEN — the `devengines-floor.log.txt` file lines 9-10 proves 10.9.0 and 10.9.3. The `npm-boundary-readings.log.txt` file lines 40-42 directly proves ambient 10.9.7, 11.5.0, and 11.6.0. Its 11.1.0 through 11.4.0 rows at lines 11-15 report only an unguarded `edgesOut` crash, not that those npm releases read the record. The open-ended range exceeds the source. |
| “Such an npm earlier than 11.6.0 refuses the `npm install` command in a generated workspace with the `EBADDEVENGINES` code, before resolving the dependency graph.” | 5 | BROKEN — the direct guard readings cover 10.9.0, 10.9.3, ambient 10.9.7, and 11.5.0. The retained source does not establish the universal range as written. |
| “npm 10.9.7 refuses an `npm run` command in such a workspace with the same code.” | 6 | CONFIRMED — the `path-prepend.log.txt` file lines 6-9 reports `EBADDEVENGINES` and exit 1 under ambient npm 10.9.7. |
| “The releases measured earlier than 10.9.0, npm 10.5.0 and npm 10.8.3, ignore the record and fail inside dependency resolution instead.” | 7 | CONFIRMED — the `devengines-floor.log.txt` file lines 7-8 reports no refusal and a crash for the guard; lines 12-13 reports the plain-manifest crash. |
| “Every Node release at 22.18.0 or later bundles an npm at 10.9.0 or later.” | 8 | CONFIRMED — the `node-index-floor.log.txt` file lines 1-7 records the 2026-09-13 index reading and a lowest bundled npm of 10.9.0. |
| “A generated workspace therefore meets an npm that ignores the record only where a developer installed such an npm in place of the bundled npm.” | 8 | BROKEN — the Node index proves the bundled-version floor. It contains no reading about who supplied another npm or how that executable replaced the bundled command. |
| “Run a generated workspace on npm 11.6.0 or later, because 11.6.0 is the first release that installs a generated workspace.” | 9 | BROKEN — the `npm-boundary-readings.log.txt` file lines 21-31 samples releases and lines 36-42 directly contrasts 11.5.0 with 11.6.0. It does not exhaust every npm release earlier than 11.6.0, so it cannot carry “the first release” as written. |
| “Read the ambient version with the `npm --version` command.” | 10 | CONFIRMED — the `remedy-control.log.txt` file line 1 records ambient npm 10.9.7. |
| “Raise it with the `npm install --global npm@11.6.0` command, or a later release, before the first install; that command installs an npm that reports 11.6.0.” | 10 | BROKEN — the `remedy-control.log.txt` file lines 3-5 proves the exact 11.6.0 command and self-report. It does not test the “or a later release” alternative. |
| “The npm readings come from a Linux host on Node 22.22.2, on 2026-09-13, and the bundled versions come from the Node release index read that day.” | 11 | CONFIRMED — the bound is stated in `tmp/codex/u-fix-4-audit-brief.md`; the `devengines-floor.log.txt` file line 1 records Node 22.22.2, and the `node-index-floor.log.txt` file line 1 records the index date. |

Smallest fix: narrow sentences 4 and 5 to the directly measured npm releases; remove the actor claim from the second sentence carrying entry 8; replace “first release” with the measured boundary; and remove “or a later release” unless another retained control proves that alternative. Apply the same corrections to every shipped carrier and rebuild `dist/src`.

### 2. CONFIRMED

Every sentence at `guides/scaffold.md:1451-1466` maps to an entry in `.orkestrel/campaign/u-fix-4-brief.md` § Sentences. The claim 1 matrix accounts for every sentence. The paragraph ends before the declaration-rollup paragraph at line 1468. No extra sentence sits outside the closed set.

### 3. BROKEN

The README has the required subset and structure, but “each sentence carried” fails.

The actual additions appear in the `tmp/evidence/u-fix-4.diff.txt` file lines 14-21. `README.md:62-63` repeats the unsupported universal npm range from guide sentence 5. `README.md:67-68` repeats the unproved “or a later release” remedy.

The remaining clauses hold:

- `README.md:61` opens with the `scaffold new` command.
- `README.md:64-65` limits the earlier-npm failure to 10.5.0 and 10.8.3.
- `README.md:66` uses the anchored Node form.
- The only `Node <version> or later` match is `README.md:12`.
- `tests/guides.test.ts:93-112` reads the first matching README floor and compares it with `package.json`.
- `README.md:69` states the Linux and date bound.

Smallest fix: apply claim 1’s source-bounded wording to the README paragraph.

### 4. CONFIRMED

The doc block at `src/core/constants.ts:491-502` states entries 3 and 4, the code-free refusal from entry 5, and the narrowed entry 7 wording.

The actual change is confined to the remarks in the `tmp/evidence/u-fix-4.diff.txt` file lines 148-163. A byte comparison of the description paragraph between `8de1c3a` and `5e72554` returned exit 0; an appended-byte control returned exit 1. The same controlled comparison returned exit 0 for `guides/scaffold.md:168` and exit 1 for its altered control.

### 5. BROKEN

The final ROADMAP rows violate the claimed forms even though the requested token edits landed:

- `ROADMAP.md:374` uses the bare `vitest` token without a following noun.
- `ROADMAP.md:379` leaves the `npm-boundary-readings.log.txt` path without the `file` noun.
- `ROADMAP.md:383-385` leaves the `devEngines.packageManager`, `>=11.6.0`, `onFail`, `engines.npm`, and `engine-strict` tokens without their required nouns.
- `ROADMAP.md:387` uses “from 10.9.0 on” instead of the required `earlier` or `later` vocabulary.
- `ROADMAP.md:448` retains “beneath the floor.”
- `ROADMAP.md:441,449,451-452` leaves file and constant tokens without following nouns.

These bytes are visible as retained context in the `tmp/evidence/u-fix-4.diff.txt` file lines 41-61 and 82-84. The guide paragraph, README paragraph, and doc block hold the plain-version, pronoun, tally, and substitution-table requirements.

Smallest fix: audit every code token and version direction across the complete ROADMAP rows item D names, rather than only the changed phrases.

### 6. CONFIRMED

`guides/scaffold.md:1401-1403` places the artifact list immediately after “except the manifest.” The list ends at lines 1448-1449. The toolchain paragraph occupies lines 1451-1466, and the declaration-rollup paragraph starts at line 1468. The actual guide hunk in the `tmp/evidence/u-fix-4.diff.txt` file lines 89-123 changes only the toolchain paragraph.

### 7. CONFIRMED

The `tmp/evidence/u-fix-4.diff.txt` file lines 25-84 contains only item D’s ROADMAP replacements and their wrapping:

- the `@npmcli/arborist` package;
- the 0.0.65 fix audit;
- the `setsid` command or the `timeout` command;
- the `tests/src/server/helpers.test.ts` file;
- the `devengines-floor.log.txt` file at each occurrence;
- “earlier than the floor.”

No other ROADMAP hunk appears in the supplied diff.

### 8. CONFIRMED

The guide’s SHA-256 is `1896dedd931d927a42a8d520db7797ef4673fd99f7c0f0e6c4f673e5b9659929`, matching `host.json:697`. An appended-newline control produced `8b3dee405e1462ce36034d863706bb3ef30ca7ffe348d6aeb41f0c3c94de8a9f`.

`git show --name-only 5e72554` lists the README, ROADMAP, guide, source constant, `host.json`, unit report, integration report, and final verification evidence together. Its parent is `8de1c3a`.

The branch has later campaign-record commits, but `git diff 5e72554..HEAD` reports no change to the carriers, `dist/bin`, or `dist/src`.

### 9. CONFIRMED

The actual diff’s headers in `tmp/evidence/u-fix-4.diff.txt` name only `README.md`, `ROADMAP.md`, `guides/scaffold.md`, `host.json`, and `src/core/constants.ts`. The supplied status file has zero bytes.

The `dist-chain-compare-3.log.txt` file lines 4-45 reports only the rewritten remarks in the core emitted files, with maps and whitespace excluded. Lines 46-47 report `dist/bin` exit 0 with no differing lines.

### 10. CONFIRMED

Every row in the `final5.status.txt` file reports exit 0: build, format, lint, checking, source projects, policy, configuration, setup, guides, release-mode distribution, and the literal publish gate. The `final-verify5.log.txt` file ends with the same readings and `FINAL-VERIFY-DONE`.

### 11. BROKEN

The emitted record agrees with the 11.6.0 floor, and the measured refusal cases agree with that record. The package is not coherent to ship under this brief’s source rule because `guides/scaffold.md:1454-1465`, `README.md:62-68`, and the emitted remarks shown in the `dist-chain-compare-3.log.txt` file lines 14-44 make universal or actor-specific claims their retained sources do not carry.

Smallest fix: make the source-bounded prose corrections from claim 1, rebuild, and regenerate the inventory.

## Findings outside the claims

None.

## Attacked and held

- Claim 2 held against a sentence-by-sentence mapping and the paragraph boundary.
- Claim 4 held against byte comparisons with altered controls and the actual source diff.
- Claim 6 held against the list and paragraph boundary markers.
- Claim 7 held against every ROADMAP hunk in the supplied diff.
- Claim 8 held against a changed-byte hash control and the landing commit.
- Claim 9 held against the supplied diff headers and retained distribution comparison.
- Claim 10 held against the status ledger and full verification log.
- The adjacent factual readings held: npm 10.5.0 and 10.8.3 ignore the record and crash; npm 10.9.7 refuses the nested run; the Node index has no bundled npm earlier than 10.9.0 in the supported range; and the exact global-install command installs npm 11.6.0.

## Unknown observations

The retained evidence does not decide how every unmeasured npm release in the shipped ranges behaves. A direct-invocation matrix over each claimed release, recording its self-reported version, guarded install, plain install, refusal code, and crash state, would settle those wider claims. That unknown does not rescue the source-carriage claims: the sources are already narrower than the shipped text.

VERDICT: FAIL 1, 3, 5, 11; outside the claims: none