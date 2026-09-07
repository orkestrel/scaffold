# Closure brief — reason, console, markdown, pool: the fix rounds under `checker`, the whole chain under `verifier`

## Lanes

Per package, two lanes, blind, clean contexts: a **checker** (`checker`, Sonnet) over the package's fix round, and a **verifier** (`verifier`, Sonnet) over the package's whole chain. The dispatch names the package and the lane.

## Evidence per package (under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`)

- reason: `d7n-reason-converge-fix-brief.md`, `-report.md` (a resumed run over a partial tree; the report opens with its ruling on the partial hunks), `.diff.txt`, `.status.txt`; `/home/user/fleet/reason` at its tip; the verdict `d7n-reason-audit-verdict.md` (items R1 to R7).
- console: `d7n-console-converge-fix-brief.md`, `-report.md` (resumed), `.diff.txt`, `.status.txt`; `/home/user/fleet/console` at its tip; the verdict `d7n-slice6-audit-verdict.md` (items C1 to C7).
- markdown: `d7n-markdown-converge-fix-brief.md`, `-report.md` (resumed), `.diff.txt`, `.status.txt`; `/home/user/fleet/markdown` at its tip; the same verdict (items M1 to M6).
- pool: `d7n-pool-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/pool` at its tip; the same verdict (items P1, P2).
- Rulings 9 to 19 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts` for the drop-in's canonical text (Ruling 13 and its amendment; reason's `findDrift` at loop scope is a recorded standing condition until the closing sweep).

## Checker claims (per package, rule only the named package)

1. Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file; a resumed unit's diff is the whole fix, its predecessor's hunks included).
2. The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries.
3. Each named correction is present as the audit's finding asked — reason: the counts gone from the compared prose, the all-caps gone from the blocks and the guide's fence comments, the drop-in's header and `INTERNAL` sentence and hoist comment and `drifts`/`drift` naming and the test title, the `set` row without `…`, the manager `remove` rows readable, the `Shape` idiom under Ruling 15, the brand sentence in the `### Classes` intro; console: the hoisted `examples` binding, every `{@link import('./x.js').Name}` restored in the description paragraphs with the cells reading the bare name, the `Shape` column under Ruling 15, the fence comment naming the captures, the `failureing` typo, the drop-in's two sentences, the opening prose; markdown: the `Shape` idiom above `### Types` and `### Shapers`, the dropped clauses in their blocks' remarks, the all-caps and the count and `below` gone, the em dash in every description, the drop-in's two sentences, each overload's description true to its signature, the titled pair unchanged on the class (Ruling 17); pool: the `Shape` column under Ruling 15 with the member-list prose deleted, `isPoolSignal`'s acquire-boundary clause.

## Verifier commands (per package, from its checkout, each exit code read from `$?`; `npm test` under `PATH=/opt/npm11/bin:$PATH`)

1. `git rev-parse --short HEAD && git status --short`
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` (the head start `0.0.18`; `package.json` declares `^0.0.17` — the recorded state, not a defect)
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run build`
7. `npm run docs` — expected exit 0 and `rows read: 1, disagreements found: 0`
8. `PATH=/opt/npm11/bin:$PATH npm test` — every project's totals (console's browser suite runs under Chromium; markdown's `parsers.test.ts` carries a 1000 ms case — report a timing red with its reading, the Orchestrator re-runs it alone)
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` if the manifest declares it, else record that it is absent

## Output

Checker: per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker <package>`. Verifier: per command the exit code and last lines verbatim; totals per project; terminal `GATES: GREEN` when commands 3 through 8 exit 0 (and 9 where present) else `GATES: RED <commands>`; open with `Lane held: verifier <package>`. No process diary. Perform the assignment directly and spawn nothing. The verifier fixes nothing, edits nothing, installs nothing.
