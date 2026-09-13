# U-fix-5 adversarial audit report

## Numbered verdicts

### 1. CONFIRMED — Item A landed exactly

Evidence: `tmp/evidence/u-fix-5.diff.txt`.

The diff contains each prescribed replacement verbatim across its wrap:

- `only under an npm other than the bundled one`
- `every release from 10.9.0 up to 11.6.0 refuses it, and 11.6.0 installs it`
- `command before the first install; that command installs an npm that reports 11.6.0`

No other sentence in the generated-workspace toolchain paragraph changed.

### 2. BROKEN — The retained sources do not carry every sentence

The source aliases in this table resolve under `.orkestrel/campaign/evidence/linux-gate/`.

| Sentence | Exact reading | Source ruling |
| --- | --- | --- |
| S1 | “Every generated manifest declares the toolchain it is gated on.” | CONFIRMED — `src/core/compilers.ts:580-581` emits `devEngines` and `engines`. |
| S2 | “The `engines.node` field carries the blueprint's `engines` value, which defaults to the `>=22.18.0` range.” | CONFIRMED — `src/core/compilers.ts:581`, `src/core/constants.ts:480,489`, and `src/core/factories.ts:61` carry the field, minimum, range, and default. |
| S3 | “The `devEngines.packageManager` record names npm at the `>=11.6.0` range with its `onFail` key set to the `error` value, and no blueprint field varies that record.” | CONFIRMED — `src/core/constants.ts:483,502-507` defines the frozen record, and `src/core/compilers.ts:580` emits it directly. |
| S4 | “An npm at 10.9.0 or later reads that record.” | BROKEN — `devengines-floor.log.txt`, `devengines-interval.log.txt`, and `npm-boundary-readings.log.txt` cover named releases. They do not carry the unbounded “or later” population. |
| S5 | “Such an npm earlier than 11.6.0 refuses the `npm install` command in a generated workspace with the `EBADDEVENGINES` code, before resolving the dependency graph.” | BROKEN — `devengines-interval.sh` hard-codes its release population. Neither its script nor `devengines-interval.log.txt` retains the registry enumeration proving that population exhaustive. |
| S6 | “npm 10.9.7 refuses an `npm run` command in such a workspace with the same code.” | CONFIRMED — `path-prepend.log.txt` reads ambient npm 10.9.7, `EBADDEVENGINES`, and `exit=1` for the nested run. |
| S7 | “The releases measured earlier than 10.9.0, npm 10.5.0 and npm 10.8.3, ignore the record and fail inside dependency resolution instead.” | CONFIRMED — `devengines-floor.log.txt` reads `refused=no crash=yes` for those named releases. |
| S8 | “Every Node release at 22.18.0 or later bundles an npm at 10.9.0 or later.” | CONFIRMED — `node-index-floor.log.txt` reports the minimum as npm 10.9.0 at Node 23.3.0 across the indexed release population read on 2026-09-13. |
| S9 | “A generated workspace on Node 22.18.0 or later therefore meets an npm that ignores the record only under an npm other than the bundled one.” | BROKEN — `node-index-floor.log.txt` carries the bundled floor, but the consequence also depends on S4’s uncarried universal that every npm at 10.9.0 or later reads the record. |
| S10 | “Run a generated workspace on npm 11.6.0 or later: every release from 10.9.0 up to 11.6.0 refuses it, and 11.6.0 installs it.” | BROKEN — the refusal rows hold for every hard-coded version, and `npm-boundary-readings.log.txt` reads 11.6.0 as clean. No retained registry-population reading proves that the hard-coded interval contains every served release. |
| S11 | “Read the ambient version with the `npm --version` command.” | CONFIRMED — `remedy-control.log.txt` reads `ambient npm 10.9.7`; the audit host independently returned `10.9.7`. |
| S12 | “Raise it with the `npm install --global npm@11.6.0` command before the first install; that command installs an npm that reports 11.6.0.” | CONFIRMED — `remedy-control.log.txt` reads `exit=0` and `installed npm self-reports: 11.6.0`. No untested alternative remains in the sentence. |
| S13 | “The npm readings come from a Linux host on Node 22.22.2, on 2026-09-13, and the bundled versions come from the Node release index read that day.” | CONFIRMED — the retained logs identify Linux, Node 22.22.2, and 2026-09-13; `node-index-floor.log.txt` identifies the index and read date. |

The exact settling measurement for S4, S5, S9, and S10 is a retained `npm view npm versions --json` reading filtered to the relevant interval, compared with the driven version set under a planted omitted-release control. Every derived release must then run against the emitted record.

### 3. CONFIRMED — Item B landed exactly and the pin holds

Evidence: `tmp/evidence/u-fix-5.diff.txt`, `README.md:12,61-69`, and `.orkestrel/campaign/evidence/linux-gate/final-verify6.log.txt`.

The diff removes only `, or a later release`. The repository-wide README scan returns the `Node 22.18.0 or later` phrase only at line 12 and returns no `or a later release` match. The authoritative `test:guides` row reads `exit=0`.

### 4. CONFIRMED — Item D landed exactly

Evidence: `tmp/evidence/u-fix-5.diff.txt`, `src/core/constants.ts:491-500`, and `guides/scaffold.md:168`.

The diff removes only:

> An npm that does not read the record fails inside dependency resolution instead.

The remaining block text matches `0834f2a` after that sentence is removed. The description remains exactly “Holds the `devEngines` record every generated manifest carries.” The parity row remains byte-identical.

### 5. BROKEN — Item C did not land the token rule across the named rows

Evidence: `tmp/evidence/u-fix-5.diff.txt` and `ROADMAP.md:431-458`.

The actual diff inserts:

> the `matchesEngines` summary cell in `guides/scaffold.md` reads

The `guides/scaffold.md` token ends in `.md` but is followed by `reads`, not the required `file` noun. The named successor row also retains:

- `package.json` followed by `to`, at line 457;
- `src/core/constants.ts` followed by a period, at line 458.

The smallest correction is:

- “in the `guides/scaffold.md` file reads”;
- “in the `package.json` file”;
- “in the `src/core/constants.ts` file.”

The row’s quoted “at or above the supported minimum” also disproves the claim’s literal statement that `earlier` and `later` are its only direction words. That clause is a brief defect rather than a product defect because the row deliberately records the existing summary cell verbatim.

The prescribed replacements, `matchesEngines` row, `earlier than the floor` phrase, and successor corrections otherwise landed. The actual diff changes no line outside the named rows.

### 6. CONFIRMED — `host.json` follows the guide edit and the landing is one commit

Evidence: `host.json:694-697`, `.orkestrel/campaign/evidence/linux-gate/final-verify6.log.txt`, and `git show e158702`.

`sha256sum guides/scaffold.md` reads:

```text
3f26b6d6649a7fb5882c02d674c5c10386706e87a5305b863a0d2028a2bf5043
```

The inventory entry carries the same digest. The `build` and `test:config` rows read `exit=0`. Commit `e158702` contains the source carriers, regenerated inventory, unit report, integration report, and verification evidence.

### 7. CONFIRMED — Nothing outside the carriers moved

Evidence: `tmp/evidence/u-fix-5.diff.txt`, `tmp/evidence/u-fix-5.diffstat.txt`, `tmp/evidence/u-fix-5.status.txt`, and `.orkestrel/campaign/evidence/linux-gate/dist-chain-compare-4.log.txt`.

A comparison between the supplied diff and `git diff 0834f2a e158702` over the carrier paths returned `exit=0`. A changed-input control returned `exit=1`. The supplied dispatch status is empty.

The carrier diff names:

- `README.md`
- `ROADMAP.md`
- `guides/scaffold.md`
- `host.json`
- `src/core/constants.ts`

The distribution comparison reads `dist/bin` with `diff exit=0 lines=0`. It reads only the deleted doc-block sentence across the non-map `dist/src/core` outputs.

### 8. CONFIRMED — The authoritative host run is green

Evidence: `.orkestrel/campaign/evidence/linux-gate/final6.status.txt` and `final-verify6.log.txt`.

The `build`, `format:check`, `lint:check`, `check`, `test:src:core`, `test:src:server`, `test:src:bin`, `test:policy`, `test:config`, `test:setup`, `test:guides`, release-mode distribution, and literal `prepublishOnly` rows each read `exit=0`.

### 9. BROKEN — The package is not evidenced coherently enough to ship

The emitted record and every driven release agree at the measured points. The README, guide, and published doc block nevertheless state the exhaustive interval and the `10.9.0 or later` universal. The retained sources do not prove the release population exhaustive and do not carry the unbounded later-version statement.

This is a shipped-source defect under the brief’s threshold: `README.md`, `guides/scaffold.md`, and `dist/src` exceed their retained evidence.

## Findings outside the claims

None.

## Attacked and held

- Claim 1 held against a sentence-by-sentence comparison of the prescribed item A text with the actual carrier diff.
- Claim 3 held against a whole-file README scan and the authoritative guide-test log.
- Claim 4 held against the base block, current block, description paragraph, parity row, and actual diff.
- Claim 6 held against an independent guide hash, the inventory entry, the build log, and the landing commit.
- Claim 7 held against an exact diff comparison with a failing changed-input control and the retained distribution comparison.
- Claim 8 held against every labeled command boundary in `final-verify6.log.txt`.
- The adjacent measured behavior holds: npm 10.5.0 and 10.8.3 ignore the record and crash; npm 10.9.7 refuses a nested run; every driven interval release refuses; npm 11.6.0 installs; the exact remedy installs npm 11.6.0.

## Unknown observations

- The truth of the unmeasured release-population universals remains unknown. The settling measurement is the registry-derived, negative-controlled interval run described under claim 2.
- The live checkout no longer matches the empty dispatch status: `git status --short` reports untracked `.orkestrel/campaign/evidence/linux-gate/npm-registry-interval.log.txt` and `.orkestrel/campaign/u-fix-6-brief.md`. They were not read or treated as evidence for the fixed `e158702` subject.

VERDICT: FAIL 2, 5, 9; outside the claims: none