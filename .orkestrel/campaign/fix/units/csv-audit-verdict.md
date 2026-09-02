# Audit verdict — unit breaking-csv

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Round 1 subject: commit `f73364d` (`units/csv.diff`,
`units/csv-report.md`).

## Round 1

| Claim | Objective lane | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name; `ResolvedParseOptions` in `types.ts` | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled forms (`renderTSV` gone with rows, fence, prose; `comment` loses `false`; `ResolvedParseOptions` on every scan leaf plus `deriveHeader`/`buildRow`; coercers moved to `parsers.ts` as `parse*`) | CONFIRMED, with the default change pinned by an executed assertion | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows, fences, executed assertions | — | BROKEN: the Parsers table and parser TSDoc compare against `@orkestrel/contract`'s `parseInteger`/`parseNumber`/`parseBoolean` with no executed assertion | — | upheld; fix round adds the assertions |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | — | quoted | GREEN (228 src, 111 policy, 46 config, 15 setup, 18 guides) | stands |
| 8 nothing hidden (the parsers ↔ inferers cycle disclosed; § Kind purity bans only a downward edge into the leaf pair) | CONFIRMED | — | — | stands |

Findings outside the claims (objective lane), ruled: the `DEFAULT_PARSE_OPTIONS` row's missing
`comment` exception → fix round; the helpers test header's false mirror claim → fix round corrects
the comment, the mirror drift itself carried to the next change; referral to run
`npm run test:distribution` for csv after the registry restore and before any publish, because
the parsers ↔ inferers cycle's module-init behavior is proved only by that project → recorded
for the W-END handoff.

Terminal lines: objective PASS; checker `FAIL 5`; verifier GREEN. Fix round `csv-fixup` (builder)
carries claim 5 and the two prose findings; round 2 follows.
