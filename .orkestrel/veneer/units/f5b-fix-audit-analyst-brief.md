# Audit lane — `analyst` on GPT-6 Astra, objective lane, F5b ACCOUNTING-LEDGER fix rounds 2 and 3

## Role and lane

`analyst` route on GPT-6 Astra (`gpt-6-astra`), reached through `codex exec --sandbox read-only`
rooted at `/home/user/veneer-f5b`. You hold the **objective** lane over the F5b fix round (brief 2)
and the ledger's move (brief 3), both written by `opus` from `.orkestrel/veneer/units/f5b-brief-2.md`
and `f5b-brief-3.md`; you are the engine that did not write them. Perform the audit directly and
spawn nothing. Bound: rule within 25 minutes.

## Subject and evidence

The worktree carries the F5b unit's first-round writes, the two granted `_button.scss` edits, the
fix round's writes, and the ledger move, all uncommitted over `07fc3c3` (the two ledger files are
untracked). `.orkestrel/veneer/units/f5b-fix.diff` is the whole diff against `07fc3c3` with
the untracked files included as additions, and `f5b-fix-status.txt` the status; the reports
`.orkestrel/veneer/units/f5b-report-2.md` and `f5b-report-3.md` name the files each round
touched, the measurements, the ancillary choices, and the claims flagged unverified; the round-1
verdicts `.orkestrel/veneer/units/f5b-audit-{analyst,reviewer,checker}-verdict.md` are where
the findings came from. The gate chain over this tree is being written to
`.orkestrel/veneer/units/f5b-fix-gates.log.txt` (a symbolic link), complete when its last
line reads `=== gates done`; read it last.

Standing conditions at launch: the sandbox runs no Vitest project, so a claim about a proof is ruled
on the mutation named and whether the assertions distinguish it, and a claim that needs an executed
run is `UNRESOLVED` with the exact settling command named; `npm run check` is allowed. The release
source is `/home/user/veneer-f5b/node_modules/bootstrap/dist/css/bootstrap.css` and
`node_modules/bootstrap/scss/`.

## Claims

1. **The comparison visits emitted sites.** `indexRecordingKeys` builds the inventory's selector
   index once; `attributeSelector(selector, layer, recording, shipped)` answers by layer, then by
   inventory membership, then by class prefix, stops on a membership hit under a withheld key, and
   refuses (naming the selector) a layer answering to a withheld component while a shipped component
   records that selector; `collectAdditions` matches an emitted site as `(selector, condition)` and
   inspects an added selector's custom properties; `Addition.condition` exists and `readAdditions`
   reads a `Condition` column and refuses a table without one. Name, for each of the three mutations
   the report records, which plant it reddens and why the assertion distinguishes it.
2. **The gates run the scanners the plants exercise.** The `cascade ledger` gates in
   `tests/conformance.test.ts` read `scanLedgerDrift` and `scanShippedDeferrals`; the plants in
   `tests/setupServer.test.ts` drive the same two functions; emptying `scanLedgerDrift`'s filters
   leaves the conformance gate green on a drift-free tree while the setup plant reddens.
3. **An empty value is a value.** `collectValueGaps` folds `''` into `undefined` on neither side;
   `EMPTY_CELL` is `(empty)`; `describeValueCell` writes it and `readValueCell` reads it back;
   `classifyDeparture('invert(1)', '')` answers `declared`; the two `--bs-btn-close-filter` rows read
   `declared` with an `(empty)` Veneer cell; the `reboot | :root` addition's reason cites the
   release's `scroll-behavior: smooth` under `prefers-reduced-motion: no-preference`
   (`bootstrap.css` around lines 190 to 194).
4. **The tag reader reports selected tags.** `collectElementTags` closes nothing;
   `collectMandatedRelatives(selected)` and `ELEMENT_RELATIVES` (`details`, `li`, `option`) carry the
   content-model relatives; the conformance case asserts the selected set equals the `ELEMENT_TAGS`
   tag column less those relatives and that the reader returns exactly the declared set; the
   retained plant reads `['dl', 'summary']` from a cascade with every `dt` rule removed.
5. **Fixtures live in the setup module.** `LEDGER_GUIDE`, `LEDGER_CASCADE`, `LEDGER_INVENTORY`
   (typed `OracleInventory`), and `LEDGER_SHIPPED` are exported from `tests/setupServer.ts` and
   inventoried in the export case; `LEDGER_INVENTORY` records `.caption-top` under `table` and
   `LEDGER_CASCADE` carries the `@media print` override, the `.caption-top` rule, and a custom
   property on the added selector; `LEDGER_GUIDE` opens with `## Cascade`.
6. **The reviewer's findings are closed as ruled.** The deferral plant
   `names a deferred selector the built cascade ships whatever its combinator spacing` reddens
   without `normalizeComplexSelector`; the departures file's legend states `dropped`, `declared`, and
   the empty-against-recorded rule, and its introduction states the comparison is textual naming
   `transparent` against `rgba(0, 0, 0, 0)` and `87.5%` against `0.875em`; `collectDepartures` is
   `collectLedger`, `CascadeAddition` is `Addition`, `collectCascadeAdditions` is `collectAdditions`
   (`grep -rn 'collectDepartures\|CascadeAddition' tests guides` prints nothing); every
   per-component heading is written `#### \`key\``; `collectValueGaps` refuses a second claim on one
   `selector | condition | property` site and `refuses one emitted declaration two shipped components
   both claim` reddens without the throw; the refresh command
   `npm run build:src && npm run test:conformance` is stated; the § Files row for
   `tests/setupServer.ts` names the tag reader.
7. **The corrected reasons are true.** The `reboot | :root` reason (claim 3) and the
   `table | .table > :not(caption) > * > *` `border-color` and `vertical-align` reasons (the release
   sets them on `.table` and its row groups, `bootstrap.css` around lines 1876 to 1894, not on each
   cell) match the release text.
8. **The 32 added addition reasons are true.** Each added row in `guides/ledger/additions.md` (the
   `button { transition }` row under `prefers-reduced-motion: reduce`, the `button:focus-visible`
   selector row and the `outline` and `box-shadow` rows under `forced-colors: active` for each `.btn`
   focus-visible selector, and the twelve `.btn` custom-property rows under the same query) names a
   site the release records for no rule of that selector, and its reason reads true against
   `src/styles/_mixins.scss` (the `transition` and `focus-ring` mixins),
   `src/styles/components/_button.scss` (the forced-colors rebind, around lines 212 to 227), and the
   release. Rule each distinct reason text on its own site, not on the text alone; name any row whose
   site contradicts its reason.
9. **The ledger's home.** `guides/ledger/departures.md` and `guides/ledger/additions.md` carry the
   moved sections' rows byte-for-byte under an H1, a tagline, `## Cascade`, and the `### Departures`
   or `### Additions` heading; `guides/veneer.md` § Tokens keeps `### Outside the ledger`, gains
   `### The ledger` naming both files, and holds no table row under a per-component heading; the
   three repointed cross-references the report names read true; `readDepartures` and `readAdditions`
   default to the nested paths and walk `Cascade`; `tests/guides.test.ts` inventories `guides/**/*.md`
   so link parity covers the nested files; `guides/README.md` names both files in § By concept; the
   departures file's planted-row control (the report's `var(--vn-size-4)` plant) would redden the
   `cascade ledger` gate through `scanLedgerDrift`'s two filters (rule from the code path).
10. **Scope is honest.** The status lists the first run's ten files plus `guides/README.md`,
    `tests/guides.test.ts`, and the untracked `guides/ledger/` directory, and nothing else;
    `src/styles/**` carries only the first run's writes and the two grants;
    `tests/fixtures/oracle/inventory.json` carries only the first run's writes; `tmp/probe/` is
    absent.
11. **The gate chain is green** (UNRESOLVED if the log lacks `=== gates done` when you read it).

## What you can execute

Read-only in the worktree: `grep`, `sed -n`, `cat`, `ls`, `git diff`, `git show 07fc3c3:<path>`, and
`node -e` that writes nothing, with npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`).
`npm run check` is allowed. No Vitest project runs here. Never edit the worktree.

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts with `file:line`, findings
outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
