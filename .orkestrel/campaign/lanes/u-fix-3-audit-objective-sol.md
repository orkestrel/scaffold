## Numbered verdicts

1. **BROKEN** — The guide exceeds the retained readings. [The added sentence](/home/user/scaffold/tmp/evidence/u-fix-3.diff.txt:106) says any npm older than 10.9.0 fails inside dependency resolution. [The host evidence](/home/user/scaffold/.orkestrel/campaign/evidence/linux-gate/devengines-floor.log.txt:7) measures that outcome only for npm 10.5.0 and 10.8.3. The refusal from npm 10.9.0 onward, the `EBADDEVENGINES` code, the 11.6.0 floor, and the supported-Node bundle statement hold. Replace the generic older-npm sentence with the measured npm releases or use a possibility claim.

2. **CONFIRMED** — The placement and remedies held. [The actual diff](/home/user/scaffold/tmp/evidence/u-fix-3.diff.txt:93) leaves the toolchain paragraph after the artifact list and before the declaration-rollup paragraph. [The guide](/home/user/scaffold/guides/scaffold.md:1400) still places the first artifact bullet immediately after “except the manifest.” [The paragraph](/home/user/scaffold/guides/scaffold.md:1461) retains the `npm --version` command and the `npm install --global npm@11.6.0` command.

3. **BROKEN** — The version and noun sweep fails in the edited ROADMAP population. [The successor row](/home/user/scaffold/ROADMAP.md:428) retains the bare backticked `0.0.65` version. The added [R-4 clause](/home/user/scaffold/tmp/evidence/u-fix-3.diff.txt:82) puts the `setsid` tool before “or” and the `timeout` tool before “changes,” without the required nouns. The added evidence-path tokens at [line 57](/home/user/scaffold/tmp/evidence/u-fix-3.diff.txt:57) and [line 70](/home/user/scaffold/tmp/evidence/u-fix-3.diff.txt:70) also end in punctuation without a noun. The prose versions in the README, guide paragraph, and published doc block are unbackticked; the possessive sweep is empty; the `SetupPanel` component and `OllamaProvider.test.ts` file corrections hold. De-backtick 0.0.65 and add the missing tool and file nouns.

4. **BROKEN** — The README voice, floor, bounded refusal, remedy, and Node-pin isolation hold, but [the older-npm sentence](/home/user/scaffold/tmp/evidence/u-fix-3.diff.txt:15) again generalizes the dependency-resolution failure beyond npm 10.5.0 and 10.8.3. [The pin control](/home/user/scaffold/.orkestrel/campaign/evidence/linux-gate/readme-pin-control.log.txt:2) fails after changing line 12 and passes after restoring Node 22.18.0, so the fix did not capture the pin. Narrow the older-npm sentence to the measured releases or state that an older npm can meet that failure.

5. **CONFIRMED** — [The ROADMAP diff](/home/user/scaffold/tmp/evidence/u-fix-3.diff.txt:26) contains the prescribed noun corrections, crash evidence, proof-row facts, and R-4 clause. The crash row names npm 10.5.0, 10.8.3, 10.9.0, and 10.9.3 with the retained evidence path. The proof row states the 10.9.0 reading boundary, the older measured behavior, the supported-Node bundle fact, and the date. No other ROADMAP hunk appears.

6. **CONFIRMED** — The `WORKSPACE_DEV_ENGINES` constant summary is byte-identical between commits 981aa66 and 5e29646. [The actual diff](/home/user/scaffold/tmp/evidence/u-fix-3.diff.txt:140) changes only the `@remarks` block, limits refusal to npm releases that read the record, and names 10.9.0. The guide summary row is unchanged, and [the host run](/home/user/scaffold/.orkestrel/campaign/evidence/linux-gate/final4.status.txt:11) records the `test:guides` gate at exit 0.

7. **BROKEN** — The digest is correct, but the same-commit statement is a brief defect. The guide’s SHA-256 digest is `0d02927071269ea825e2b2eee0089fbe8e641bde004cd2eccb893339b60b43e6`, matching [the host inventory](/home/user/scaffold/host.json:697). Git history shows the integration brief was added in commit 981aa66, while the integration report and code landed in commit 5e29646. [The integration criterion](/home/user/scaffold/.orkestrel/campaign/u-fix-3-integrate-brief.md:24) required the code, unit report, and integration report—not the integration brief—in one commit, and that requirement holds. Correct the claim to name the integration report rather than the pair; no shipped fix is needed.

8. **CONFIRMED** — The supplied diff is byte-identical to Git’s diff for the carrier paths and names only [the documented carrier set](/home/user/scaffold/tmp/evidence/u-fix-3.diffstat.txt). The source diff changes only the doc block in the constants file. [The retained material comparison](/home/user/scaffold/.orkestrel/campaign/evidence/linux-gate/dist-chain-compare.log.txt:3) reports only the earlier doc-block wording in the `dist/src` tree and no change in the `dist/bin` tree; commit 981aa66 adds no non-campaign change over that predecessor state. [The final build](/home/user/scaffold/.orkestrel/campaign/evidence/linux-gate/final-verify4.log.txt:1) regenerated the tip output, whose core JavaScript and declaration files contain the revised block.

9. **CONFIRMED** — [The authoritative status file](/home/user/scaffold/.orkestrel/campaign/evidence/linux-gate/final4.status.txt:1) records exit 0 for every row, including the release-mode distribution gate and literal `prepublishOnly` command. [The full log](/home/user/scaffold/.orkestrel/campaign/evidence/linux-gate/final-verify4.log.txt:307) records the distribution suite passing and the literal command completing.

10. **BROKEN** — The emitted manifest is coherent with the documented floor: a runtime probe read the `engines.node` field as `>=22.18.0` and the `devEngines.packageManager` record as npm `>=11.6.0` with the `error` value; changing the blueprint’s Node range changed only the Node field. Supported bundled npm releases meet the documented refusal. However, the shipped [README sentence](/home/user/scaffold/README.md:63) and [guide sentence](/home/user/scaffold/guides/scaffold.md:1457) claim the dependency-resolution failure for the whole pre-10.9.0 range, while retained evidence measures npm 10.5.0 and 10.8.3 only. The guide is copied byte-for-byte into the distributed host. This overclaim holds the upload.

## Findings outside the claims

None.

## Attacked and held

- Moving the toolchain paragraph did not disturb either adjacent section or remove either diagnostic command.
- The README edit did not capture the Node-floor parser; its negative control still fails.
- The published summary and guide parity row remained byte-identical.
- Campaign-record exclusions did not conceal another product-file change.
- The generated manifest varies the Node range while keeping the npm record fixed.
- The Linux evidence supports the refusal from npm 10.9.0 through 11.5.0 and successful installation from npm 11.6.0.

## Unknown observations

- Windows and macOS diagnostic codes remain unmeasured. Both shipped prose carriers identify the readings as Linux evidence.
- The retained evidence gives no dependency-resolution result for npm releases older than 10.5.0. That gap is the boundary violated by claims 1, 4, and 10.

VERDICT: FAIL 1, 3, 4, 7, 10; outside the claims: none