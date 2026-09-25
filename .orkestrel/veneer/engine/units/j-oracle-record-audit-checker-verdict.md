# J-ORACLE-RECORD audit — the checker job (grok on Cursor Grok, grok-4.7-high, ask mode), retained verbatim

Brief: `units/j-oracle-record-checker-brief.md` (launch copy `tmp/cursor/j-oracle-record-checker-brief.md`, swept); journal `tmp/cursor/j-oracle-record-checker.jsonl` (swept at acceptance); session id in the first line below.

---

<!-- Grok lane j-oracle-record-checker, session b555daed-f101-4b39-8a41-bf07bef40f38 -->

I'll read the brief and follow its instructions exactly.The brief limits this to claims 8 and 10. I'll read the claims, the subject files, and the worktree copies next.Claim 8 turns on the status paths and the diff. I'll search those next, then match the census table to `departures.json`.**Claim 8: CONFIRMED.**

Changed paths in `j-oracle-record-status.txt`:

- `tests/conformance.test.ts` (`j-oracle-record-status.txt:1`)
- `tests/fixtures/oracle/alert.json` (`j-oracle-record-status.txt:2`)
- `tests/fixtures/oracle/carousel.json` (`j-oracle-record-status.txt:3`)
- `tests/fixtures/oracle/collapse.json` (`j-oracle-record-status.txt:4`)
- `tests/fixtures/oracle/dropdown.json` (`j-oracle-record-status.txt:5`)
- `tests/fixtures/oracle/modal.json` (`j-oracle-record-status.txt:6`)
- `tests/fixtures/oracle/offcanvas.json` (`j-oracle-record-status.txt:7`)
- `tests/fixtures/oracle/popover.json` (`j-oracle-record-status.txt:8`)
- `tests/fixtures/oracle/scrollspy.json` (`j-oracle-record-status.txt:9`)
- `tests/fixtures/oracle/tab.json` (`j-oracle-record-status.txt:10`)
- `tests/fixtures/oracle/toast.json` (`j-oracle-record-status.txt:11`)
- `tests/fixtures/oracle/tooltip.json` (`j-oracle-record-status.txt:12`)
- `tests/setupServer.test.ts` (`j-oracle-record-status.txt:13`)
- `tests/setupServer.ts` (`j-oracle-record-status.txt:14`)

`isProofFile` and `scanOracleObligation` occur only as unchanged context (`j-oracle-record.diff:200`, `j-oracle-record.diff:229`). The diff headers are `tests/conformance.test.ts`, `tests/setupServer.test.ts`, and `tests/setupServer.ts` (`j-oracle-record.diff:1`, `j-oracle-record.diff:87`, `j-oracle-record.diff:713`). No `guides/` path is in the status file or the diff.

Each value export the diff adds to `setupServer.ts` is in the export list in `setupServer.test.ts:515-634`: `ORACLE_OMITTED_ATTRIBUTES`, `ORACLE_REFERENCE_ATTRIBUTES`, `PLUGIN_CONTROLS`, `PLUGIN_ORACLE_TIMEOUT`, `PLUGIN_SCENARIOS`, `PLUGIN_SETTLE_BUDGET`, `PLUGIN_SETTLE_INTERVAL`, `collectEngineDepartures`, `compileVeneerRuntime`, `driveOracleBrowser`, `drivePluginAction`, `filterAddedDepartures`, `inferPluginState`, `isPluginState`, `readBootstrapRuntime`, `readBuildOutput`, `readPluginFixture`, `readPluginState`, `recordPluginControl`, `recordPluginOracle`, `scanPluginFixture`, `scanPluginSteps`, `settlePluginState`.

**Claim 10: CONFIRMED.**

The census table (`j-oracle-record-report.md:70-86`) and `departures.json` agree on plugin, element, facet, name, and value. The table’s opening row is the empty set for collapse, alert, tab, and scrollspy; `departures.json` has no rows for those plugins, and `findings.json:12`, `findings.json:19`, `findings.json:26`, and `findings.json:33` record zero departures. Class cells use present/absent for the booleans `true`/`false` (`j-oracle-record.diff:890-892`; carousel `departures.json:173-180` with `j-oracle-record-report.md:74`; toast `departures.json:817-860` with `j-oracle-record-report.md:81-82`). Focus uses `—` where `name` is omitted (`departures.json:809-815`, `j-oracle-record-report.md:79`). Attribute cells use `(absent)` where that side’s key is omitted, and `` where the value is `""`.

No row is present on only one side, and no row differs on plugin, element, facet, name, or value.

VERDICT: PASS
