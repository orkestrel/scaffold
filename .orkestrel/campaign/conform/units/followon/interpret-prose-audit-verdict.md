# Audit verdict: unit interpret-prose

Subject: the follow-on unit in `/home/user/fleet/interpret` on the landed tip `b2cd68e` (brief `briefs/followon/interpret-prose-brief.md`, fix brief `briefs/followon/interpret-prose-fix1-brief.md`, report `units/followon/interpret-prose-report.md`, results `units/followon/interpret-prose-result.md` and `units/followon/interpret-prose-fix1-result.md`), a `builder` on Claude Sonnet in both rounds: `via`, `e.g.`, and the `design §N` and `ledger N` citations leave the tests; the `scoreTemplate` fence declares `template: Template` in place of `as const`, with its transcription; every sentence tallying the pipeline's stages as "five" in the tests, the guide, `src`, and the README names the stages or drops the number.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/followon/interpret-prose-checker-luna.result.md`, `briefs/followon/interpret-prose-audit-brief.md`), after fix round 1 | FAIL 9 on the report's counts, ruled |

Objective and subjective lanes: not run, by the round's design — a prose-only follow-on with no behaviour change, checked mechanically. The Sol bench is dark this session. Fix round 1 widened the tally sweep to the `src` and README sites the first brief kept off-limits; the checker ran after it on the whole unit.

## Rulings

- Claim 9: the counts the checker names — `Tests 95 passed (95)` at `report.md:47`, the audit's summary line at `:98`, and `conform-interpret.status 18 entries` at `:153` — are runner and instrument tallies quoted beside the command that produced them, which `AGENTS.md` § Writing permits as a value reported with the run. The report's authored prose states no count. The middleware-prose verdict carries the same ruling.
- Round 1 deleted the citation parentheticals rather than restating a fact, per the brief's deviation contract, because an unresolvable citation's fact cannot be stated without inventing it.

## Structural claims

The gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/interpret`, recorded in `units/land-followon.log`, and the landing commit named in the state table.

## Terminal

PASS (checker's claim-9 refutation ruled a permitted measurement), pending the deciding run at landing.
