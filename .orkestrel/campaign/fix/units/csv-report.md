# Unit breaking-csv — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s16-03** — applied: Deleted the exported renderTSV delegate from src/core/helpers.ts with its TSDoc. Removed its guides/csv.md Surface row, the '### Rendering to TSV' pattern fence, the intro clause naming it as renderCSV's TSV sibling, the RFC-dialects sentence that called it, and the '## Tests' mention; rewrote the README.md sentence to name the tab delimiter instead. Deleted its two tests and added one renderCSV assertion proving the dialect the prose still claims: renderCSV({columns:['a','b'],rows:[{a:1,b:2}]},{delimiter:'\t'}) === 'a\tb\r\n1\t2'. The Orchestrator's ruling (delete the fence) governed over the finding's alternative (replace the fence with a renderCSV call).
- **s16-05** — applied: ParseOptions.comment is now `readonly comment?: string`; DEFAULT_PARSE_OPTIONS declares no comment member and is typed Required<Omit<ParseOptions, 'comment'>>; a new ResolvedParseOptions = Required<Omit<ParseOptions, 'comment'>> & Pick<ParseOptions, 'comment'> in types.ts (mirroring ResolvedRenderOptions) replaces Required<ParseOptions> on resolveParseOptions and on scanComment, scanUnquoted, scanQuoted, scanField, scanRecord, deriveHeader, and buildRow. scanComment now tests `options.comment === undefined`. The empty-string INVALID_OPTION throw is unchanged. Guide: added the ResolvedParseOptions Types row, retyped every affected Helpers signature, and reworded the scanComment behavior cell.
- **s16-01 (guide mirror)** — applied: The three coercer Behavior cells no longer carry the naming justification. The parseReal cell states that @orkestrel/contract exports no parseReal and names parseNumber as the nearest equivalent, with the measured value ('007.5' reads as 7.5). The parseInteger and parseBoolean cells state the measured difference from contract's same-named coercers ('007' reads as 7; '1' reads as true).
- **s16-01 (principal, breaking)** — applied: Moved coerceInteger, coerceReal, and coerceBoolean out of src/core/helpers.ts into src/core/parsers.ts as parseInteger, parseReal, and parseBoolean; deleted the three naming @remarks; retargeted inferers.ts (import and the coerceInferred {@link} targets and dispatch); dropped the now-unused BOOLEAN_TRUE/BOOLEAN_FALSE/INTEGER_PATTERN/REAL_PATTERN imports from helpers.ts and added them to parsers.ts. The describe blocks already sat in tests/src/core/parsers.test.ts, which is where the code now lives, so they stayed beside it and were renamed. Guide rows moved from the Helpers table to the Parsers table with both intros rewritten. Barrel unchanged: it star-exports helpers.ts and parsers.ts already.

## Symbols moved

- renderTSV — removed (src/core/helpers.ts)
- coerceInteger → parseInteger (src/core/helpers.ts → src/core/parsers.ts)
- coerceReal → parseReal (src/core/helpers.ts → src/core/parsers.ts)
- coerceBoolean → parseBoolean (src/core/helpers.ts → src/core/parsers.ts)
- ResolvedParseOptions — added (src/core/types.ts)
- ParseOptions.comment — `string | false` → `string`
- DEFAULT_PARSE_OPTIONS — `Required<ParseOptions>` → `Required<Omit<ParseOptions, 'comment'>>`, `comment` member removed
- resolveParseOptions — return `Required<ParseOptions>` → `ResolvedParseOptions`
- scanComment, scanUnquoted, scanQuoted, scanField, scanRecord, deriveHeader, buildRow — `options` parameter `Required<ParseOptions>` → `ResolvedParseOptions`

## Files touched

- /home/user/fleet/csv/src/core/types.ts
- /home/user/fleet/csv/src/core/constants.ts
- /home/user/fleet/csv/src/core/helpers.ts
- /home/user/fleet/csv/src/core/parsers.ts
- /home/user/fleet/csv/src/core/inferers.ts
- /home/user/fleet/csv/tests/src/core/helpers.test.ts
- /home/user/fleet/csv/tests/src/core/parsers.test.ts
- /home/user/fleet/csv/guides/csv.md
- /home/user/fleet/csv/README.md

## Tests changed

- /home/user/fleet/csv/tests/src/core/helpers.test.ts — dropped the renderTSV import and its describe block (two tests); added `renders tab-separated text for a tab delimiter` inside the renderCSV describe; corrected the file-header comment
- /home/user/fleet/csv/tests/src/core/parsers.test.ts — renamed the coerceInteger/coerceReal/coerceBoolean imports and describes to parseInteger/parseReal/parseBoolean; rewrote `returns undefined when comment is disabled` as `returns undefined when no comment marker is configured`, calling resolveParseOptions() with no comment

## Gates

- `npm run format:check` → exit 0 — Checking formatting... All matched files use the correct format. Finished in 1910ms on 47 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no output
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics
- `npm run build` → exit 0 — 12 modules transformed; dist/src/core/index.js 54.77 kB, dist/src/core/index.cjs 56.57 kB; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — src:core 7 files / 228 tests passed; policy 111 passed; config 46 passed; setup 15 passed; guides 18 passed

## Diff stat

```text
README.md                      |   2 +-
 guides/csv.md                  | 131 +++++++++++++++++++---------------
 src/core/constants.ts          |  11 ++--
 src/core/helpers.ts            | 133 +++++------------------------------
 src/core/inferers.ts           |  27 +++++----
 src/core/parsers.ts            | 100 +++++++++++++++++++++++++++++--
 src/core/types.ts              |  16 ++++-
 tests/src/core/helpers.test.ts |  19 ++----
 tests/src/core/parsers.test.ts |  52 ++++++++--------
 9 files changed, 238 insertions(+), 253 deletions(-)
```

Status at return (writer's reading): `M README.md |  M guides/csv.md |  M src/core/constants.ts |  M src/core/helpers.ts |  M src/core/inferers.ts |  M src/core/parsers.ts |  M src/core/types.ts |  M tests/src/core/helpers.test.ts |  M tests/src/core/parsers.test.ts |  | No off-limits file appears. HEAD is unchanged at bee06cc; nothing was staged, committed, installed, or fetched.`
Built `dist/` moves: true

## Observations

- Removed-name sweep, word-boundary (`grep -rnw`) over `src`, `tests`, `guides`, `README.md`: renderTSV 0 hits, coerceInteger 0, coerceReal 0, coerceBoolean 0. Plain-text sweep over the same paths: `Required<ParseOptions>` 0 hits, and `comment: false` / `string | false` / "`comment` is `false`" 0 hits. Repo-wide (excluding node_modules, .git, dist) the four names return 0. Every hit that existed before the change was classified and rewritten; none was left as a permitted sense.
- New-name presence: parseInteger, parseReal, and parseBoolean each appear in src (parsers.ts, inferers.ts), in tests/src/core/parsers.test.ts, and in the guide's Parsers table with a TSDoc @example each; ResolvedParseOptions appears in types.ts, constants.ts, helpers.ts and the guide's Types table.
- Built-artifact proof of the new parsers.ts <-> inferers.ts cycle: an out-of-tree probe imported both published entry points (dist/src/core/index.js as ESM and dist/src/core/index.cjs through createRequire) and drove every symbol on the cycle. Both report parseInteger('007') undefined, parseInteger('42') 42, parseReal('3.14') 3.14, parseBoolean('1') undefined, inferRows([{a:'1'},{a:'2'}],['a']) [{a:1},{a:2}], parseCSV('a\n1\n2',{infer:true}).table {columns:['a'],rows:[{a:1},{a:2}]}, renderCSV with a tab delimiter 'a\tb\r\n1\t2', parseCSV('#skip\na\n1',{comment:'#'}) skipping the comment line, and parseCSV('#skip\na\n1') with no comment option treating it as data. The same probe reads the removed names as absent (renderTSV false, coerceInteger false), which is its negative control: a module that failed to load would throw on the first read, and a rename that had not taken would report those two as present.
- Contract-difference claims in the new TSDoc and guide cells were measured, not inferred: against the installed @orkestrel/contract, parseInteger('007') returns 7, parseInteger('9999999999999999999') returns 10000000000000000000, parseNumber('007.5') returns 7.5, parseBoolean('1') returns true, and parseReal is undefined (the package exports no such symbol).
- src:core moved from 229 to 228 tests: the two renderTSV tests were deleted with the symbol and one renderCSV tab-delimiter test was added.
- Out of scope, for the next change: tests/src/core/parsers.test.ts still holds the describes for the helpers.ts tokenizer leaves (scanBreak through buildRow, readRecords), which the tests mirror rule places in helpers.test.ts. This drift predates the unit and no assigned row names it.
- Out of scope, for the next change: README.md links `guides/src/csv.md`, but the file is `guides/csv.md`. The guides link-parity test covers `guides/**` only, so no gate sees it.
- Out of scope, for the next change: `via` appears in guides/csv.md and in helpers.ts, inferers.ts, shapers.ts, and validators.ts; `.claude/rules/writing.md` replaces it with `through`. A partial sweep inside the cells I touched would have split the package's wording, so every instance is left as it was.
- s16-07 stays open for the dedicated TSDoc wave. I rewrote the first sentence into the third person only in the blocks this unit touched: inferColumnType, coerceInferred, inferRows, and the three new parse* coercers.
- `npm run test:distribution` was not run: it sits outside `npm test` and the brief excludes it as a criterion while dependency tarballs are staged. `node /home/user/work/verify-stage.mjs csv` reports all five staged packages (contract, guide, html, markdown, test) as the installed copies.

## Deviations

- Recorded and carried on: deriveHeader and buildRow also declared `options: Required<ParseOptions>` and are not in the s16-05 edit list. Once resolveParseOptions returns ResolvedParseOptions, its result is no longer assignable to Required<ParseOptions>, so `npm run check` fails until they change too. Both now take ResolvedParseOptions, and their guide signatures follow.
- Recorded and carried on: the s16-01 ruling deletes the three naming @remarks, and the s16-01 guide-mirror ruling requires the parseReal cell to name parseNumber and state that @orkestrel/contract exports no parseReal. I deleted every sentence that justified the `coerce*` name form and replaced it with an @remarks stating the measured behavioural difference from the contract primitive, mirrored in the guide cells. `.claude/rules/patterns.md` § Declared ecosystem capabilities requires that difference to be established and kept, so removing every mention would have made the docs weaker than the rule allows.
- Recorded and carried on: the move creates an import cycle between src/core/parsers.ts and src/core/inferers.ts. inferers.ts consumes the flat coercers that now live in parsers.ts, and parseCSV consumes inferRows from inferers.ts, so the edge cannot be avoided while the coercers sit in the kind file the centralized-file table assigns them. No rule in AGENTS.md or .claude/rules/* refuses a cycle outside the helpers/validators leaf pair, and neither oxlint nor tests/setupPolicy.ts carries a cycle check. Both edges are read inside function bodies rather than at module initialization; I rewrote both file-header comments to state the direction and proved both published entry points load and drive it (see observations). helpers.ts's own header comment claimed inferers.ts, shapers.ts, and CSV.ts import from it, which stopped being true when the coercers left, so it now names parsers.ts as its only consumer.
- Recorded and carried on: the s16-03 finding text asked for the '### Rendering to TSV' fence to be replaced with a renderCSV call, while the Orchestrator's ruling deletes the fence with the row and the prose. I followed the ruling. The capability stays documented in the RFC-dialects paragraph, and the new renderCSV tab-delimiter test is the executed assertion that paragraph's claim now rests on, per .claude/rules/documentation.md § Parity.
- Recorded and carried on: `npm run format` (oxfmt) reformats markdown tables, so removing the long coercer rows re-padded every remaining row of the Helpers and Inferers tables in guides/csv.md. That is formatter output rather than an authored edit and is why the guide diff is wider than the rows changed. I also reflowed the guide's opening paragraph, whose line ran to 118 characters after the renderTSV clause was cut.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/csv.diff`,
`tmp/units/breaking/csv.status`.
