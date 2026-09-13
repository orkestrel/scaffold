## Per-claim verdicts

1. **CONFIRMED** — [u-fix-2.diff.txt](/home/user/scaffold/tmp/evidence/u-fix-2.diff.txt:114) shows the paragraph moved after the artifact list and before the declaration-rollup paragraph. A direct predecessor-to-subject comparison found no changed bullet content.

2. **BROKEN** — [scaffold.md](/home/user/scaffold/guides/scaffold.md:1454) claims every npm release beneath the floor refuses installation with the `EBADDEVENGINES` code. Against an emitted manifest, npm `10.5.0` release under Node `22.22.2` reached dependency resolution and returned the `ENOTCACHED` code; its nested script also ran successfully. The npm `10.9.7` release control rejected the identical manifest with the `EBADDEVENGINES` code. The upgrade command does satisfy the floor. Narrow the claim to enforcing npm releases or add a guard older supported releases honor.

3. **BROKEN** — The possessive sweep is empty, but [writing.md](/home/user/scaffold/.claude/rules/writing.md:48) also requires a noun after every code token. Violations include the `11.6.0` token followed by “in” in [README.md](/home/user/scaffold/README.md:61), the `11.6.0` token followed by “or” in [scaffold.md](/home/user/scaffold/guides/scaffold.md:1457), the `SetupPanel` token followed by “parks” in [ROADMAP.md](/home/user/scaffold/ROADMAP.md:297), and the `OllamaProvider.test.ts` token followed by “while” in [ROADMAP.md](/home/user/scaffold/ROADMAP.md:369). Add nouns such as “version,” “component,” and “file.”

4. **BROKEN** — [u-fix-2.diff.txt](/home/user/scaffold/tmp/evidence/u-fix-2.diff.txt:9) confirms placement under Notes, floor isolation, and absence of a competing Node-floor phrase. Its behavioral statement is false for the npm `10.5.0` release, which does not enforce the emitted `devEngines` record.

5. **CONFIRMED** — [u-fix-2.diff.txt](/home/user/scaffold/tmp/evidence/u-fix-2.diff.txt:181) contains only the comment substitution from the `resolveNpm` name to the `provisionNpm` name. No executable line changed.

6. **CONFIRMED** — [u-fix-2.diff.txt](/home/user/scaffold/tmp/evidence/u-fix-2.diff.txt:54) removes the prohibited counts and names the unready-loopback case. The retained scaffold gate log records that case failing in the server project, and [helpers.test.ts](/home/user/scaffold/tests/src/server/helpers.test.ts:225) carries the same name.

7. **CONFIRMED** — [u-fix-2.diff.txt](/home/user/scaffold/tmp/evidence/u-fix-2.diff.txt:32) adds the evidence path and pruning explanation. [npm-boundary-readings.log.txt](/home/user/scaffold/.orkestrel/campaign/evidence/linux-gate/npm-boundary-readings.log.txt:21) records every stated npm release. The possessive edits preserve the surrounding substance.

8. **BROKEN** — [ROADMAP.md](/home/user/scaffold/ROADMAP.md:422) carries the listed predecessor findings but drops R-4. The predecessor lane defines R-4 at [u-fix-audit-subjective-opus.md](/home/user/scaffold/.orkestrel/campaign/lanes/u-fix-audit-subjective-opus.md:134) as the effect of missing `setsid` or `timeout` tools on the asserted exit and message. The generic silent-drop clause cannot reconstruct that question. Add the explicit host-tool question.

9. **CONFIRMED** — [u-fix-2.diff.txt](/home/user/scaffold/tmp/evidence/u-fix-2.diff.txt:165) changes only the remarks block. The description paragraph is byte-identical to the predecessor, and the guide parity row remains unchanged.

10. **CONFIRMED** — The SHA-256 digest of [scaffold.md](/home/user/scaffold/guides/scaffold.md) is `688c06e8c2ff4d627beb1cea17576b1180c51f210e557b0d80ce24e660792f58`, matching [host.json](/home/user/scaffold/host.json:697). The integration brief and report assign regeneration to that unit.

11. **UNRESOLVED** — [u-fix-2.diff.txt](/home/user/scaffold/tmp/evidence/u-fix-2.diff.txt:1) confirms the source carrier list. [dist-chain-compare.log.txt](/home/user/scaffold/.orkestrel/campaign/evidence/linux-gate/dist-chain-compare.log.txt:1) finds only the remarks change after excluding source-map files and ignoring whitespace. Because shipped source maps changed but were excluded from comparison, the full `dist/src` claim remains undecided. Clean builds of each subject followed by a comparison that includes source-map semantics would settle it.

12. **CONFIRMED** — [final3.status.txt](/home/user/scaffold/.orkestrel/campaign/evidence/linux-gate/final3.status.txt) reports exit 0 for every gate. [u2-probe.log.txt](/home/user/scaffold/.orkestrel/campaign/evidence/linux-gate/u2-probe.log.txt:1) records npm `11.6.0` release with the passing suite and a skipped case. [distribution.test.ts](/home/user/scaffold/tests/distribution.test.ts:982) makes the provisioning case the version-dependent skip; the registry case would throw in release mode if unavailable.

13. **BROKEN** — The emitted record, README, and guide agree on the nominal floor, but they do not agree with the behavior a developer using npm `10.5.0` release meets. That release ignores the record instead of reporting the documented refusal. The package is not coherent to ship with the universal wording.

## Findings outside the claims

- **F-1 — Integration report committed after its code.** [orchestration.md](/home/user/scaffold/.agents/orchestration.md:427) requires the returned report in the same action that commits code. Commit `9a250bb` contains `host.json` but not the integration report; commit `0e02013` adds the report. [u-fix-2-integrate-report.md](/home/user/scaffold/.orkestrel/campaign/u-fix-2-integrate-report.md:21) confirms that sequence.

## Attacked and held

- The artifact-list order and content held against predecessor extraction.
- The npm `10.9.7` and `11.5.0` releases reject the emitted record, while the npm `11.6.0` release admits it.
- The README placement and Node-pin isolation held.
- The distribution-test edit remained comment-only.
- The gate-log case identity, npm-range evidence citation, TSDoc summary, guide digest, host gates, and provisioning skip held.
- The successor row carries every named item except R-4.

## Unknown observations

- Cross-host refusal behavior remains unmeasured. The npm `10.5.0` release counterexample already falsifies the unbounded wording on Linux.
- The README does not need the diagnostic version command to make its remedy actionable; this creates no separate finding.
- Exact source-map delta attribution remains unresolved.

VERDICT: FAIL 2, 3, 4, 8, 11, 13; outside the claims: F-1