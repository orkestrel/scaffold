I'll read the brief first, then gather the evidence it asks for.The brief is a read-only retention map. Next I’ll load the debrief skill, retention rules, and recovery records so the table can name every source and destination.I’ll inventory the named recovery trees next and read the reports that say which files already have carriers.Existing retention reports and the release tree should name which files already have carriers. I’ll read those next.I’ll read the successor reports and list what’s already in the campaign folder versus what still lives only under `tmp`.Effective successors in `recovery-current.md` are R-B brief11/report11, capture-recipe brief3/report3, and the parent final-control/cold-host/variant reports. Historical failed attempts remain on disk and are not those successors. `.orkestrel/campaign/recovery-units/` does not exist yet. This lane wrote nothing.

## Input limits

- Capture-recipe full gate: `tmp/units/capture-recipe-gates-report.md:3-11` records native `prepublishOnly` exit `0`, duration `267.883s`, session `46473`. The verifier returned terminal excerpts only. No on-disk full log. No `capture-recipe-gates-evidence/` tree.
- Original writer report `tmp/units/r-a-2-report.md` was never written (`r-a-2-recovered-report.md:2`, `:167`).
- Capture copy destination `tmp/capture-retained/r-b-final-capture` is absent. The instrument exists and was syntax-checked, not run (`r-b-capture-retention-report.md:7-9`). Source PNG exists: `tmp/recovery/roughnotes/tmp/capture/states/navigation--light-390.png`. Journey text reads `capturing: true` (`tmp/journeys/light-390.txt:3`). Final run log: `176 passed`, `65.93s`, start `12:18:31` (`r-b-final-capture.log.txt:1126-1129`). `inventory.json` is produced only when the copy runs (`retain-r-b-capture.ps1:171-174`).
- Glob listing of PNG files returned empty; existence is from a direct read, not an inventory.
- Byte identity of campaign copies versus `tmp/` launch copies was not hashed.
- Product source and dependency trees were not absorbed, per the brief.
- `tmp/recovery/roughnotes/.orkestrel/roughnotes/` exists as the consumer campaign record. It was not absorbed file-by-file and is not R-A2/R-B successor evidence.

## Path rewrite after a `tmp/` sweep

Launch copies use the same `tmp/units/` basename in three checkouts. After sweep, those relative pointers break unless rewritten to the unit directory below.

- Canonical briefs: `tmp/units/r-b-brief-11.md`, `tmp/units/capture-recipe-brief-3.md`
- Recovery reports: `tmp/recovery/roughnotes/tmp/units/r-b-report-11.md` (report text still says `tmp/units/…`)
- Release reports: `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-report-3.md` (absolute `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/…` at `:6`)
- `r-a-2-check-brief.md:8` still names `C:/Users/mikes/WebstormProjects/roughnotes` and missing `tmp/units/r-a-2-report.md`
- `r-b-report.md:5` replays `tmp/audit/r-a-2-recovered.patch`

Identical basenames that collide unless nested: `actual.diff`, `status.txt`, `r-b-brief-6.md`, `r-b-brief-7.md`, `r-a-2-runtime-evidence.txt`.

## Successor versus historical

| Stream | Effective | Historical / rejected |
| --- | --- | --- |
| R-A2 source proof | `r-a-2-recovered-report.md` plus `r-a-2-recovery-closure.md` / `r-a-2-recovery-gates.md` | Missing original `r-a-2-report.md`; checker `CHECK: FAIL 4 7` (`r-a-2-check-recovery-report.md`) |
| R-B source | `r-b-brief-11.md` + recovery `r-b-report-11.md` | Original freeze `r-b-report.md`; `r-b-report-9.md`; `r-b-report-10.md` capture not clean (`:3`) |
| R-B audit | Later parent reports supersede pending claims | `r-b-objective-report.md` `R-B OBJECTIVE: FAIL`; `r-b-subjective-report.md` `UNRESOLVED` |
| Capture-theme | Design verdict + report11 recorder red/green | Lanes `UNRESOLVED` only for unmeasured timing (`r-b-capture-theme-design-verdict.md:5`) |
| Recipe | `capture-recipe-brief-3.md` + report3 + `capture-recipe-successor-ruling.md` | Report1 historical; report2 rejected (`capture-recipe-audit-verdict.md:3`) |
| Variant probe | `r-b-variant-tool-5.json` receipt | `r-b-variant-tool.json` through `-4.json` `no receipt` (`r-b-variant-probe-report.md:9`) |
| Cold host | `ad83c352edd440a8b906a46a6c1c6470` logs | `6fd3e1d6…` / `5e9b2228…` earlier runs not cold proof (`r-b-cold-host-report.md:14`) |
| Controls | `*-20260918-1151*.log.txt` under `r-b-controls/` | Earlier `114537631` / `114820407` reds (`r-b-final-controls-report.md:16`) |

## Source-to-retained-path table

Proposed dest for rows without a campaign carrier: `.orkestrel/campaign/recovery-units/<unit>/`. Status `already retained` only where the campaign file exists.

### Orientation (already in campaign)

| Source path | Source role | Retained path | Dependency reason | Status |
| --- | --- | --- | --- | --- |
| `.orkestrel/campaign/recovery-current.md` | recovery source-of-truth | same | supersedes live writer status | already retained |
| `.orkestrel/campaign/design-verdict.md` | governing design | same | campaign exit criterion | already retained |
| `.orkestrel/campaign/r-b-review-map.md` | freeze map | same | original R-B freeze terrain | already retained |
| `.orkestrel/campaign/capture-recipe-successor-ruling.md` | parent ruling | same | names brief3/report3 as effective | already retained |

### R-A2

| Source path | Source role | Retained path | Dependency reason | Status |
| --- | --- | --- | --- | --- |
| `.orkestrel/campaign/r-a-brief.md` | original brief | same | prescription predecessor | already retained |
| `.orkestrel/campaign/r-a-brief-2.md` | effective R-A2 brief | same | recovered report `:4` | already retained |
| `.orkestrel/campaign/r-a-audit-verdict.md` | audit prescription | same | findings carried | already retained |
| `.orkestrel/campaign/r-a-audit-claims.md` | shared claims | same | audit reproduction | already retained |
| `.orkestrel/campaign/r-a-audit-objective-brief.md` | objective brief | same | audit pair | already retained |
| `.orkestrel/campaign/r-a-audit-subjective-brief.md` | subjective brief | same | audit pair | already retained |
| `.orkestrel/campaign/r-a-audit-objective-report.md` | objective report | same | audit pair | already retained |
| `.orkestrel/campaign/r-a-audit-subjective-report.md` | subjective report | same | audit pair | already retained |
| `.orkestrel/campaign/r-a-audit-reproduction/probe-1.test.ts.txt` | claim-5 instrument | same | recovered report `:197` still names it | already retained |
| `.orkestrel/campaign/r-a-audit-reproduction/probe-1-readings.txt` | probe reading | same | reproduction | already retained |
| `.orkestrel/campaign/r-a-audit-reproduction/probe-2.test.ts.txt` | probe | same | reproduction | already retained |
| `.orkestrel/campaign/r-a-audit-reproduction/probe-2-readings.txt` | reading | same | reproduction | already retained |
| `.orkestrel/campaign/r-a-audit-reproduction/probe-3.test.ts.txt` | probe | same | reproduction | already retained |
| `.orkestrel/campaign/r-a-audit-reproduction/mutations.sh` | mutation script | same | reproduction | already retained |
| `.orkestrel/campaign/r-a-audit-reproduction/mutations-summary.txt` | mutation record | same | reproduction | already retained |
| `.orkestrel/campaign/r-a-2-recovered-report.md` | reconstructed writer report | same | substitutes missing `r-a-2-report.md` | already retained |
| `.orkestrel/campaign/r-a-2-recovery-closure.md` | independent replay | same | scoped greens + Contact probe | already retained |
| `.orkestrel/campaign/r-a-2-recovery-gates.md` | full-chain reading | same | `GATES: RED` on format/conformance | already retained |
| `.orkestrel/campaign/r-a-2-recovery-verify-brief.md` | verifier brief | same | gates dispatch | already retained |
| `tmp/units/r-a-2-recovery-verify-brief.md` | launch copy | `.orkestrel/campaign/r-a-2-recovery-verify-brief.md` | same basename as campaign | already retained (campaign carrier) |
| `.orkestrel/campaign/r-a-2-check-brief.md` | original checker brief | same | rewrite Roughnotes path | already retained |
| `.orkestrel/campaign/r-a-2-verify-brief.md` | original verifier brief | same | historical | already retained |
| `.orkestrel/campaign/r-a-2-check-recovery-report.md` | recovered checker | same | `CHECK: FAIL 4 7` | already retained |
| `.orkestrel/campaign/r-a-2-closure-instrument-brief.md` | Contact probe brief | same | predecessor | already retained |
| `.orkestrel/campaign/r-a-2-closure-instrument-brief-2.md` | successor brief | same | predecessor | already retained |
| `.orkestrel/campaign/r-a-2-closure-instrument-brief-3.md` | effective instrument brief | same | closure `:13` | already retained |
| `.orkestrel/campaign/r-a-2-closure-verify-brief.md` | probe verifier brief | same | closure | already retained |
| `tmp/units/r-a-2-closure-instrument-brief.md` | launch copy | campaign counterpart | basename collision | already retained (campaign carrier) |
| `tmp/units/r-a-2-closure-instrument-brief-2.md` | launch copy | campaign counterpart | basename collision | already retained (campaign carrier) |
| `tmp/units/r-a-2-closure-instrument-brief-3.md` | launch copy | campaign counterpart | basename collision | already retained (campaign carrier) |
| `tmp/units/r-a-2-closure-verify-brief.md` | launch copy | campaign counterpart | basename collision | already retained (campaign carrier) |
| `.orkestrel/campaign/r-a-2-recovery-probe/recovery.test.ts.txt` | Contact probe | same | closure `:15` | already retained |
| `.orkestrel/campaign/r-a-2-recovery-probe/vite.config.ts.txt` | probe config | same | probe | already retained |
| `.orkestrel/campaign/r-a-2-recovery-probe/setup.ts.txt` | probe setup | same | probe | already retained |
| `.orkestrel/campaign/r-a-2-recovery-probe/result-page.log.txt` | probe log | same | exit0, `:15` | already retained |
| `.orkestrel/campaign/r-a-2-runtime-evidence.txt` | Bootstrap excerpt | same | checker item 7 | already retained |
| `tmp/audit/r-a-2-runtime-evidence.txt` | launch copy | campaign file | same basename | already retained (campaign carrier) |
| `tmp/audit/r-a-2-recovered.patch` | source patch | `.orkestrel/campaign/recovery-units/r-a-2/r-a-2-recovered.patch` | R-B freeze replay (`r-b-report.md:5`); `git apply --check` vs `86a9ef6` | existing |
| `tmp/audit/r-a-2-recovered-status.txt` | patch status | `.orkestrel/campaign/recovery-units/r-a-2/r-a-2-recovered-status.txt` | owned-file set | existing |
| `tmp/units/r-a-2-report.md` | original writer report | — | recovered report `:167` | **missing** |

### R-B briefs (canonical `tmp/units`)

| Source path | Source role | Retained path | Dependency reason | Status |
| --- | --- | --- | --- | --- |
| `.orkestrel/campaign/r-b-brief.md` | original brief | same | original checkout path is Roughnotes | already retained |
| `.orkestrel/campaign/r-b-brief-2.md` | successor brief | same | through freeze | already retained |
| `.orkestrel/campaign/r-b-brief-3.md` | successor brief | same | through freeze | already retained |
| `.orkestrel/campaign/r-b-brief-4.md` | successor brief | same | through freeze | already retained |
| `.orkestrel/campaign/r-b-brief-5.md` | successor brief | same | through freeze | already retained |
| `tmp/units/r-b-brief-2.md` through `r-b-brief-5.md` | launch copies | campaign counterparts | basename collision | already retained (campaign carrier) |
| `tmp/units/r-b-brief-6.md` | menu-proof brief | `.orkestrel/campaign/recovery-evidence/r-b-menu/r-b-brief-6.md` | menu instrument | already retained |
| `tmp/units/r-b-brief-7.md` | cold-config brief | `.orkestrel/campaign/recovery-evidence/r-b-cold/r-b-brief-7.md` | cold entry | already retained |
| `tmp/units/r-b-brief-8.md` | reduced-motion brief | `.orkestrel/campaign/recovery-units/r-b-brief-8/r-b-brief-8.md` | predecessor of controls | existing |
| `tmp/units/r-b-brief-9.md` | primitive-inventory brief | `.orkestrel/campaign/recovery-units/r-b-brief-9/r-b-brief-9.md` | report9 | existing |
| `tmp/units/r-b-brief-10.md` | animation/navigation brief | `.orkestrel/campaign/recovery-units/r-b-brief-10/r-b-brief-10.md` | report10; capture not clean | existing |
| `tmp/units/r-b-brief-11.md` | **effective** adapter/recorder brief | `.orkestrel/campaign/recovery-units/r-b-brief-11/r-b-brief-11.md` | `recovery-current.md:9` | existing |
| `.orkestrel/campaign/r-b-check-brief.md` | original checker | same | historical | already retained |
| `.orkestrel/campaign/r-b-verify-brief.md` | original verifier | same | historical | already retained |

### R-B freeze reports and diffs (recovery `tmp/units`)

| Source path | Source role | Retained path | Dependency reason | Status |
| --- | --- | --- | --- | --- |
| `tmp/recovery/roughnotes/tmp/units/r-b-report.md` | original freeze report | `.orkestrel/campaign/recovery-units/r-b-original/r-b-report.md` | inherited R-A2 replay; hashes in `r-b-frozen-hashes.txt` | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-actual.diff` | original diff | `.orkestrel/campaign/recovery-units/r-b-original/r-b-actual.diff` | freeze | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-shared.diff` | original shared diff | same dest dir | freeze | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-new-setup-proof.diff` | original setup proof | same dest dir | freeze | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-status.txt` | original status | same dest dir | freeze | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-diffstat.txt` | original diffstat | same dest dir | freeze | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-frozen-hashes.txt` | original hashes | same dest dir | freeze | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-report-9.md` | inventory successor | `.orkestrel/campaign/recovery-units/r-b-9/r-b-report-9.md` | R-B-C1 closed | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-actual-9.diff` | freeze diff | same dest dir | report9 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-shared-9.diff` | shared diff | same dest dir | report9 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-new-setup-proof-9.diff` | setup proof | same dest dir | report9 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-status-9.txt` | status | same dest dir | report9 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-diffstat-9.txt` | diffstat | same dest dir | report9 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-frozen-hashes-9.tsv` | hashes | same dest dir | report9 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-match-fates-9.tsv` | inventory fates | same dest dir | report9 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-changed-9.txt` | changed set | same dest dir | report9 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-inventory-9-red.log.txt` | inventory red | same dest dir | report9 `:17` | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-inventory-9-green.log.txt` | inventory green | same dest dir | report9 `:17` | existing |
| `tmp/recovery/roughnotes/tmp/probe/r-b-inventory-9.ps1` | inventory instrument | `.orkestrel/campaign/recovery-units/r-b-9/r-b-inventory-9.ps1` | report9 command | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-report-10.md` | animation/navigation; capture unclean | `.orkestrel/campaign/recovery-units/r-b-10/r-b-report-10.md` | `recovery-current.md:14` | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-actual-10.diff` | freeze diff | same dest dir | report10 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-shared-10.diff` | shared diff | same dest dir | report10 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-new-setup-proof-10.diff` | setup proof | same dest dir | report10 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-status-10.txt` | status | same dest dir | report10 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-diffstat-10.txt` | diffstat | same dest dir | report10 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-frozen-hashes-10.tsv` | hashes | same dest dir | report10 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-baseline-hashes-10.json` | baseline hashes | same dest dir | report10 | existing |
| `tmp/recovery/roughnotes/tmp/units/animation-adoption-10-red.log.txt` | adoption red | same dest dir | report10 `:13` | existing |
| `tmp/recovery/roughnotes/tmp/units/theme-10-green.log.txt` | theme green | same dest dir | report10 `:14` | existing |
| `tmp/recovery/roughnotes/tmp/units/navigation-capture-10-red.log.txt` | membership red | same dest dir | report10 `:15` | existing |
| `tmp/recovery/roughnotes/tmp/units/navigation-capture-10-after.log.txt` | membership after | same dest dir | report10 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-report-11.md` | **effective** freeze report | `.orkestrel/campaign/recovery-units/r-b-11/r-b-report-11.md` | recorder red/green | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-actual-11.diff` | freeze diff | same dest dir | report11 `:41` | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-shared-11.diff` | shared diff | same dest dir | report11 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-new-setup-proof-11.diff` | setup proof | same dest dir | report11 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-status-11.txt` | status | same dest dir | report11 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-diffstat-11.txt` | diffstat | same dest dir | report11 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-frozen-hashes-11.tsv` | hashes | same dest dir | report11 | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-baseline-hashes-11.json` | baseline hashes | same dest dir | report11 | existing |
| `tmp/recovery/roughnotes/tmp/units/async-capture-rejection-11-red.log.txt` | recorder red | same dest dir | exit1, `1 failed\|43 passed`, `48.52s` (`:19`) | existing |
| `tmp/recovery/roughnotes/tmp/units/async-capture-rejection-11-green.log.txt` | recorder green | same dest dir | exit0, `44 passed`, `49.38s` (`:20`) | existing |
| `tmp/recovery/roughnotes/tmp/units/setup-generated-11-normal.log.txt` | generated setup | same dest dir | report11 `:26` | existing |
| `tmp/recovery/roughnotes/tmp/units/setup-generated-11-reduced.log.txt` | reduced setup | same dest dir | report11 `:27` | existing |

### R-B gates

| Source path | Source role | Retained path | Dependency reason | Status |
| --- | --- | --- | --- | --- |
| `tmp/units/r-b-gates-brief.md` | verifier brief | `.orkestrel/campaign/recovery-units/r-b-gates/r-b-gates-brief.md` | ordinary gates; CAPTURE unset | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-gates-report.md` | gate report | `.orkestrel/campaign/recovery-units/r-b-gates/r-b-gates-report.md` | `GREEN`, native exit `0` (`:5`) | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-gates-evidence/preflight.log.txt` | log | same dest dir | report `:38` | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-gates-evidence/format-check.log.txt` | log | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-gates-evidence/lint-check.log.txt` | log | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-gates-evidence/check.log.txt` | log | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-gates-evidence/build.log.txt` | log | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-gates-evidence/test.log.txt` | log | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-gates-evidence/final-status.log.txt` | status snapshot | same dest dir | no source drift (`:5`) | existing |

### R-B parent proofs already in campaign, with unretained instruments/logs

| Source path | Source role | Retained path | Dependency reason | Status |
| --- | --- | --- | --- | --- |
| `.orkestrel/campaign/r-b-final-controls-report.md` | parent controls report | same | `recovery-current.md:15` | already retained |
| `tmp/units/r-b-final-controls-brief.md` | original brief | `.orkestrel/campaign/recovery-units/r-b-controls/r-b-final-controls-brief.md` | predecessor | existing |
| `tmp/units/r-b-final-controls-brief-2.md` | successor brief | same dest dir | predecessor | existing |
| `tmp/units/r-b-final-controls-brief-3.md` | successor brief | same dest dir | predecessor | existing |
| `tmp/units/r-b-final-controls-brief-4.md` | **effective** brief | same dest dir | report `:1` | existing |
| `tmp/units/r-b-final-controls-report-2.md` | historical report | same dest dir | earlier parent logs | existing |
| `tmp/units/r-b-final-controls-report-3.md` | historical report | same dest dir | earlier | existing |
| `tmp/units/r-b-final-controls-report-4.md` | runner report | same dest dir | beside parent report | existing |
| `tmp/units/r-b-final-controls-parent.log.txt` | historical parent log | same dest dir | preserve (`report.md:16`) | existing |
| `tmp/units/r-b-final-controls-parent-2.log.txt` | historical parent log | same dest dir | preserve | existing |
| `tmp/units/r-b-final-controls-parent-3.log.txt` | **effective** parent log | same dest dir | report `:1` | existing |
| `tmp/probe/run-r-b-final-controls.ps1` | runner | same dest dir | report `:1` | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/content-continuation-red-20260918-114537631.log.txt` | historical red | `.orkestrel/campaign/recovery-units/r-b-controls/logs/` | earlier matcher failure | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/content-continuation-red-20260918-114820407.log.txt` | historical red | same dest dir | earlier | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/content-continuation-red-20260918-115053035.log.txt` | effective red | same dest dir | report table | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/content-continuation-green-20260918-115053038.log.txt` | effective green | same dest dir | report table | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/sign-in-refusal-red-20260918-115109399.log.txt` | effective red | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/sign-in-refusal-green-20260918-115109400.log.txt` | effective green | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/menu-opened-state-red-20260918-115122585.log.txt` | effective red | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/menu-opened-state-green-20260918-115122586.log.txt` | effective green | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/menu-hidden-state-red-20260918-115139984.log.txt` | effective red | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/menu-hidden-state-green-20260918-115139985.log.txt` | effective green | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/menu-opened-state-reduced-red-20260918-115158559.log.txt` | effective red | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/menu-opened-state-reduced-green-20260918-115158560.log.txt` | effective green | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/menu-hidden-state-reduced-red-20260918-115214919.log.txt` | effective red | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-controls/menu-hidden-state-reduced-green-20260918-115214920.log.txt` | effective green | same dest dir | report | existing |
| `.orkestrel/campaign/r-b-cold-host-report.md` | parent cold report | same | `recovery-current.md:16` | already retained |
| `tmp/units/r-b-cold-host-brief.md` | original brief | `.orkestrel/campaign/recovery-units/r-b-cold-host/r-b-cold-host-brief.md` | predecessor | existing |
| `tmp/units/r-b-cold-host-brief-2.md` | successor | same dest dir | predecessor | existing |
| `tmp/units/r-b-cold-host-brief-3.md` | successor | same dest dir | predecessor | existing |
| `tmp/units/r-b-cold-host-brief-4.md` | **effective** brief | same dest dir | report `:1` | existing |
| `tmp/units/r-b-cold-host-report-2.md` | historical | same dest dir | earlier | existing |
| `tmp/units/r-b-cold-host-report-3.md` | historical | same dest dir | earlier | existing |
| `tmp/units/r-b-cold-host-report-4.md` | runner report | same dest dir | beside parent | existing |
| `tmp/units/r-b-cold-host-parent.log.txt` | historical parent log | same dest dir | preserve | existing |
| `tmp/units/r-b-cold-host-parent-2.log.txt` | historical parent log | same dest dir | preserve | existing |
| `tmp/units/r-b-cold-host-parent-3.log.txt` | **effective** parent log | same dest dir | report `:1` | existing |
| `tmp/probe/run-r-b-cold-host.ps1` | historical runner | same dest dir | predecessor | existing |
| `tmp/probe/run-r-b-cold-host-2.ps1` | **effective** runner | same dest dir | report `:1` | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-cold-host/journey-light-1280-ad83c352edd440a8b906a46a6c1c6470.log.txt` | effective journey | `.orkestrel/campaign/recovery-units/r-b-cold-host/logs/` | report `:9` | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-cold-host/journey-dark-1280-ad83c352edd440a8b906a46a6c1c6470.log.txt` | effective journey | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-cold-host/journey-light-390-ad83c352edd440a8b906a46a6c1c6470.log.txt` | effective journey | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-cold-host/journey-dark-390-ad83c352edd440a8b906a46a6c1c6470.log.txt` | effective journey | same dest dir | report | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-cold-host/outer-only-control-ad83c352edd440a8b906a46a6c1c6470.log.txt` | effective negative | same dest dir | report `:3` | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-cold-host/app-browser-6fd3e1d6b4384dd6a5123b43c0fb3fba.log.txt` | earlier app-browser | same dest dir | report `:12`; not cold proof | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-cold-host/journey-*-6fd3e1d6b4384dd6a5123b43c0fb3fba.log.txt` | earlier journeys | same dest dir | historical | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-cold-host/journey-light-1280-5e9b2228621144058b37115c56ab5a35.log.txt` | earlier | same dest dir | historical | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-cold-host/outer-only-control-5e9b2228621144058b37115c56ab5a35.log.txt` | earlier negative | same dest dir | historical | existing |
| `tmp/recovery/roughnotes/tmp/probe/r-b-final-host/cache-paths.ts` | cold instrument | `.orkestrel/campaign/recovery-units/r-b-cold-host/r-b-final-host/` | copy `.ts` as `.txt` if campaign-committed | existing |
| `tmp/recovery/roughnotes/tmp/probe/r-b-final-host/journey-cold.config.ts` | config | same dest dir | instrument | existing |
| `tmp/recovery/roughnotes/tmp/probe/r-b-final-host/journey-cold-2.config.ts` | config | same dest dir | instrument | existing |
| `tmp/recovery/roughnotes/tmp/probe/r-b-final-host/app-browser-cold.config.ts` | config | same dest dir | instrument | existing |
| `tmp/recovery/roughnotes/tmp/probe/r-b-final-host/setup-reduced.config.ts` | config | same dest dir | reduced motion | existing |
| `tmp/recovery/roughnotes/tmp/probe/r-b-setup/vite.config.ts` | diagnostic host | `.orkestrel/campaign/recovery-units/r-b-setup/` | report.md diagnostic | existing |
| `tmp/recovery/roughnotes/tmp/probe/r-b-setup/vite.reduced.config.ts` | reduced diagnostic | same dest dir | historical Vue plugin host | existing |
| `tmp/recovery/roughnotes/tmp/probe/r-b-setup/vite.generated.reduced.config.ts` | generated reduced | same dest dir | report11 `:27` | existing |
| `tmp/recovery/roughnotes/tmp/probe/r-b-setup/tsconfig.json` | scoped tsconfig | same dest dir | report11 `:31` | existing |
| `.orkestrel/campaign/r-b-variant-probe-report.md` | receipt report | same | `recovery-current.md:17` | already retained |
| `tmp/probe/r-b-variant-tool-5.json` | **effective** prove case | `.orkestrel/campaign/recovery-units/r-b-variant/r-b-variant-tool-5.json` | receipt `probe:fdb88225…` (`:7`) | existing |
| `tmp/probe/r-b-variant-tool.json` | historical no-receipt | same dest dir | report `:9` | existing |
| `tmp/probe/r-b-variant-tool-2.json` | historical | same dest dir | report | existing |
| `tmp/probe/r-b-variant-tool-3.json` | historical | same dest dir | report | existing |
| `tmp/probe/r-b-variant-tool-4.json` | historical | same dest dir | report | existing |

Menu/cold entry already under `.orkestrel/campaign/recovery-evidence/r-b-menu/` and `r-b-cold/` (briefs, `.ts.txt` sources, result logs, `run-r-b-cold-entry-control.ps1`, `r-b-cold-entry-control.md`, `native-stderr-control-instruments.md`). Live recovery copies of those instruments remain at `tmp/recovery/roughnotes/tmp/probe/r-b-menu/` and `tmp/probe/r-b-cold/`. Cache folders stay excluded.

### R-B audit and capture-theme

| Source path | Source role | Retained path | Dependency reason | Status |
| --- | --- | --- | --- | --- |
| `tmp/audit/r-b-audit-claims.md` | shared claims | `.orkestrel/campaign/recovery-units/r-b-audit/r-b-audit-claims.md` | original R-B audit | existing |
| `tmp/audit/r-b-objective-brief.md` | objective brief | same dest dir | pairs with campaign report | existing |
| `tmp/audit/r-b-subjective-brief.md` | subjective brief | same dest dir | pairs with campaign report | existing |
| `.orkestrel/campaign/r-b-objective-report.md` | objective report | same | `R-B OBJECTIVE: FAIL`; later closed by report10 | already retained |
| `.orkestrel/campaign/r-b-subjective-report.md` | subjective report | same | `UNRESOLVED`; later evidence supersedes | already retained |
| `.orkestrel/campaign/r-b-animation-audit.mjs` | animation instrument | same | objective report `:12` | already retained |
| `tmp/audit/r-b-capture-theme-design.md` | design subject | `.orkestrel/campaign/recovery-units/r-b-capture-theme/` | verdict `:9` | existing |
| `tmp/audit/r-b-capture-theme-objective-brief.md` | lane brief | same dest dir | verdict `:9` | existing |
| `tmp/audit/r-b-capture-theme-subjective-brief.md` | lane brief | same dest dir | verdict `:9` | existing |
| `.orkestrel/campaign/r-b-capture-theme-objective-report.md` | lane report | same | retain before sweep (`verdict.md:9`) | already retained |
| `.orkestrel/campaign/r-b-capture-theme-subjective-report.md` | lane report | same | retain before sweep | already retained |
| `.orkestrel/campaign/r-b-capture-theme-design-verdict.md` | parent ruling | same | conditions report11 | already retained |

### Capture portfolio (PNG out of git; durable is instrument/metadata)

| Source path | Source role | Retained path | Dependency reason | Status |
| --- | --- | --- | --- | --- |
| `tmp/units/r-b-capture-retention-brief.md` | original dest `.orkestrel/…/r-b-final-capture` | `.orkestrel/campaign/recovery-units/r-b-capture/r-b-capture-retention-brief.md` | superseded dest | existing |
| `tmp/units/r-b-capture-retention-brief-2.md` | **effective** dest `tmp/capture-retained/…` | same dest dir | `:3` | existing |
| `tmp/units/r-b-capture-retention-report.md` | instrument report | same dest dir | syntax clean; copy not run | existing |
| `tmp/probe/retain-r-b-capture.ps1` | copy instrument | same dest dir | generates `inventory.json` | existing |
| `tmp/recovery/roughnotes/tmp/units/r-b-final-capture.log.txt` | capture run log | durable metadata (campaign unit or retained dest readme) | `176 passed` / `65.93s` | existing; copy dest absent |
| `tmp/recovery/roughnotes/tmp/journeys/light-1280.txt` | variant record | durable metadata | `capturing: true` required by instrument | existing |
| `tmp/recovery/roughnotes/tmp/journeys/dark-1280.txt` | variant record | durable metadata | same | existing |
| `tmp/recovery/roughnotes/tmp/journeys/light-390.txt` | variant record | durable metadata | `:3` `capturing: true` | existing |
| `tmp/recovery/roughnotes/tmp/journeys/dark-390.txt` | variant record | durable metadata | same | existing |
| `tmp/recovery/roughnotes/tmp/capture/states/*.png` | PNG portfolio | `tmp/capture-retained/r-b-final-capture/` only | excluded from campaign git | source exists; dest **missing** (copy not run) |
| `tmp/capture-retained/r-b-final-capture/inventory.json` | generated inventory | campaign metadata after copy | instrument `:171` | **missing** |

### Capture-recipe

| Source path | Source role | Retained path | Dependency reason | Status |
| --- | --- | --- | --- | --- |
| `tmp/units/capture-recipe-brief.md` | original brief | `.orkestrel/campaign/recovery-units/capture-recipe-1/` | historical | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-report.md` | original report | same dest dir | historical | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence/actual.diff` | freeze | same dest dir | historical | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence/status.txt` | status | same dest dir | historical | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence/diffstat.txt` | diffstat | same dest dir | historical | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence/frozen-hashes.tsv` | hashes | same dest dir | historical | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence/format.log.txt` | scoped log | same dest dir | historical | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence/format-inventory.log.txt` | scoped log | same dest dir | historical | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence/generation` absent; `guides.log.txt`, `inventory.log.txt`, `imports.log.txt`, `policy.log.txt` | scoped logs | same dest dir | historical | existing |
| `tmp/units/capture-recipe-brief-2.md` | successor2 brief | `.orkestrel/campaign/recovery-units/capture-recipe-2/` | rejected example | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-report-2.md` | successor2 report | same dest dir | `audit-verdict.md:3` reject | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/actual.diff` | freeze | same dest dir | rejected | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/status.txt` | status | same dest dir | rejected | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/diffstat.txt` | diffstat | same dest dir | rejected | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/frozen-hashes.tsv` | hashes | same dest dir | rejected | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/generation.log.txt` | log | same dest dir | rejected | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/policy.log.txt` | log | same dest dir | rejected | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/imports.log.txt` | log | same dest dir | rejected | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/inventory.log.txt` | log | same dest dir | rejected | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/guides.log.txt` | log | same dest dir | rejected | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/format.log.txt` | log | same dest dir | rejected | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/directory.log.txt` | destination instrument | same dest dir | audit lanes | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/directory-check.mjs` | destination instrument | same dest dir | audit | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-2/directory-separator-reading.log.txt` | reading | same dest dir | audit | existing |
| `tmp/audit/capture-recipe-audit-claims.md` | shared claims | `.orkestrel/campaign/recovery-units/capture-recipe-audit/` | `verdict.md:7` | existing |
| `tmp/audit/capture-recipe-objective-brief.md` | lane brief | same dest dir | verdict | existing |
| `tmp/audit/capture-recipe-subjective-brief.md` | lane brief | same dest dir | verdict | existing |
| `.orkestrel/campaign/capture-recipe-audit-objective-report.md` | lane report | same | retain before sweep (`verdict.md:9`) | already retained |
| `.orkestrel/campaign/capture-recipe-audit-subjective-report.md` | lane report | same | retain before sweep | already retained |
| `.orkestrel/campaign/capture-recipe-audit-verdict.md` | parent ruling | same | rejects2, owns brief3 | already retained |
| `tmp/units/capture-recipe-brief-3.md` | **effective** brief | `.orkestrel/campaign/recovery-units/capture-recipe-3/` | successor-ruling `:7` | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-report-3.md` | **effective** report | same dest dir | rewrite absolute `tmp/units` paths (`:6`) | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-3/actual.diff` | freeze | same dest dir | report3 `:42` | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-3/status.txt` | status | same dest dir | skill/reference/`host.json` | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-3/diffstat.txt` | diffstat | same dest dir | report3 | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-3/frozen-hashes.tsv` | hashes | same dest dir | report3 | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-3/generation.log.txt` | inventory build | same dest dir | report3 `:30` | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-3/policy.log.txt` | scoped | same dest dir | report3 | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-3/imports.log.txt` | scoped | same dest dir | report3 | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-3/inventory.log.txt` | scoped | same dest dir | report3 | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-3/guides.log.txt` | scoped | same dest dir | report3 | existing |
| `tmp/release/scaffold-0.0.75/tmp/units/capture-recipe-evidence-3/format.log.txt` | scoped | same dest dir | report3 | existing |
| `tmp/units/capture-recipe-gates-brief.md` | full-gate brief | `.orkestrel/campaign/recovery-units/capture-recipe-gates/` | requested full log | existing |
| `tmp/units/capture-recipe-gates-report.md` | excerpt report | same dest dir | exit0; **no full log** (`:11`, `:27`) | existing |
| candidate `tmp/units/capture-recipe-gates-evidence/` | full transcript | — | brief `:33` owned path | **missing** |
| verifier session `46473` terminal | raw gate output | — | report `:7` | **missing** on disk |

### Consumer campaign folder in the recovery checkout

| Source path | Source role | Retained path | Dependency reason | Status |
| --- | --- | --- | --- | --- |
| `tmp/recovery/roughnotes/.orkestrel/roughnotes/` | consumer campaign record | `.orkestrel/campaign/recovery-units/roughnotes-campaign/` | in-scope existing tree; not R-A2/R-B successor evidence | existing; not absorbed file-by-file |

## Git status

This lane made no writes. Session-start snapshot: branch `main`, ahead of `origin/main`, dirty `.codex/config.toml` and `.orkestrel/campaign/rebaseline-2.md`, untracked campaign recovery files including the already-retained R-A2/R-B/recipe records above. `.orkestrel/campaign/recovery-units/` is absent. `tmp/` is workspace scratch and is not in that git listing.

## Unresolved / unreached

- Hasher comparison of campaign copies versus `tmp/` launch copies
- Full PNG membership list (binary glob empty; one frame read)
- Original Opus R-A2 writer journal (reconstruction only)
- Product source and install trees (excluded by brief)
- `tmp/recovery/roughnotes/.orkestrel/roughnotes/` file inventory
- Live `git status` after this message (no disk write of the comparison)
