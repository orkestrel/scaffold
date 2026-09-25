# ER-MECH audit — verdict (2026-09-25)

The Orchestrator's reconciliation of the ER-MECH audit on `erm-audit-claims.md`. Three lanes ran blind to each other:
the objective lane, `analyst` on GPT-6 Astra (`erm-audit-objective-verdict.md`; journal
`tmp/codex/erm-audit-analyst.jsonl`, thread `01a0d681-f372-7093-b7f5-5da880d521d8`); the subjective lane, `reviewer` on
Opus 5.5 (`erm-audit-subjective-verdict.md`); and `checker` on Sonnet on claims 6, 7, and 8
(`erm-audit-checker-verdict.md`). The unit was written by `opus` on Opus 5.5; the objective lane ran on another engine.

## Claims

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Types and readers | BROKEN | BROKEN | — | BROKEN: `readReceipts` accepts command spans with no comma between them, and `readSupportedHosts` accepts a malformed Platform cell (`Linux`); the verdict requires both readers to refuse a malformed cell |
| 2 Reader proofs | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 3 Gates | CONFIRMED | CONFIRMED | — | CONFIRMED; no plant covers the npm floor or the refusal of a floor not in the `>=x.y.z` form (subjective R1), so round 2 adds both |
| 4 Live runtime | CONFIRMED | CONFIRMED | — | CONFIRMED; the build comparison shares Playwright's own `Browser.getVersion` read, so only the user-agent major check is independent of Playwright, a limit the case's comment must state |
| 5 Release-host case | BROKEN | BROKEN | — | BROKEN: the message names the host values and omits Date, Revision, and Commands, and no control shows a matching receipt making the case pass (subjective R2) |
| 6 The guide | BROKEN | BROKEN | CONFIRMED | BROKEN: "in any other mode it skips" is false once a receipt matches; "names every value the missing row needs" is false per claim 5; "is the record a sentence naming a browser build rests on" states as fact a relation no receipt or gate yet holds |
| 7 Reuse and law | CONFIRMED | BROKEN | CONFIRMED | BROKEN on case titles (subjective): the live `readRuntime` case's title says it reads npm's values; the refusal case also proves `BUILD_PATTERN`'s four-part rule without saying so; the floor case's title omits its range-form refusal |
| 8 Scope | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |

- Claim 5: the release-host case names what the run measured (the host values). Date, Revision, and Commands belong to
  the verifier's run that writes the row, not to the proof, and reading the revision would be a new capability; the
  message and the guide say "every host value the row needs", and a control proves a matching receipt passes.

## Findings outside the claims

- **Packed link expectation (objective), accepted.** The packed-CSS page case compares `.link-primary` against
  `--vn-color-primary-rgb`, while the shipped rule and the guide use `--vn-color-primary-emphasis` (AP-COLOR, P7). The
  case reads red at `873f715` (`erm-instruments/logs/erm-base-distribution.log.txt`); the distribution project is outside
  the landing chain, which is why no landing caught it. The fix compares against an independently resolved swatch of
  the emphasis token, and keeps the danger comparison.
- **F1 (subjective), accepted.** The § Tests sentence says the proofs "bind a release run to a receipt on the build it
  launched", which no release run does until the release-mode fix lands; it takes the conditioned form § Hosts uses.
- **F2 (subjective), accepted.** "the platform the user chooses" names the repository's maintainer as `user`, and
  `tests/setupServer.ts` writes a temporal `once`.
- **R3 (subjective), accepted.** No case drives `readRuntime`'s invalid-build refusal.
- **R4 (subjective), carried as a measurement.** Whether `npm run` enforces `engines.node`, which the § Hosts sentence
  implies; round 2 measures it and words the sentence to the reading.
- **R5 (subjective), carried.** The resolver sentence leaves out the platform-default channel in `configs/browsers.ts`;
  round 2 makes it complete.

## Carrier

ER-MECH round 2 (`er-mech-brief-2.md`), `opus` on Opus 5.5, carries every row and finding in this verdict. The release
mode reaches Veneer through the RELEASE-MODE units (`release-mode-design-verdict.md`), not through this unit.

## Ruling

FAIL. Round 2 runs, then a fix-round audit with both lanes.
