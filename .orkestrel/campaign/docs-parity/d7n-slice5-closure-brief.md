# Closure brief — table, router, template: the fix rounds under `checker`, the whole chain under `verifier`

## Lanes

Per package, two lanes, blind, clean contexts: a **checker** (`checker`, Sonnet) over the package's fix round, and a **verifier** (`verifier`, Sonnet) over the package's whole chain. The dispatch names the package and the lane. websocket closes in a later dispatch when its fix round lands.

## Evidence per package (under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`)

- table: `d7n-table-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/table` at its tip `a7612eb`; the verdict `d7n-slice5-audit-verdict.md` (items T1, T2).
- router: `d7n-router-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/router` at its tip `699ec66`; the same verdict (items R1 to R4).
- template: `d7n-template-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/template` at its tip `e65daa8`; the same verdict (items P1 to P3).
- Rulings 9 to 19 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts` for the drop-in's canonical text (Ruling 13 and its amendment).

## Checker claims (per package, rule only the named package)

1. Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file).
2. The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries.
3. Each named correction is present as the audit's finding asked — table: the drop-in matching the pilot from `describe(` on (`documented` and `examples` at loop scope, the amended header and `INTERNAL` sentence), the `Shape` column under Ruling 15's sentence on every table carrying an interface or type row, a constants table heading `Shape` with literals named in descriptions (Ruling 18); router: the hoisted `examples` binding and the drop-in's two sentences, the `Shape` idiom (Ruling 15's wording, bare names, `plus`, no `…`, no `+` or `/`), the titled pair on `createRouter` under a Ruling 9 heading above the `## Surface` fence with `createListener`'s block untitled, every `{@link import('./x.js').Name}` restored in the description paragraphs with the cells reading the bare name; template: the convention sentence between `### Types` and its table in Ruling 15's wording, `TemplateManagerEventMap` as `{ register, remove, clear }` (Ruling 19), the constants table heading `Shape`, the all-caps gone from the blocks, the titled fence extended to show `find` and `has` on both sides with its executed case extended (Ruling 14).

## Verifier commands (per package, from its checkout, each exit code read from `$?`; `npm test` under `PATH=/opt/npm11/bin:$PATH`)

1. `git rev-parse --short HEAD && git status --short`
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` (the head start `0.0.18`; `package.json` declares `^0.0.17` — the recorded state, not a defect)
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run build`
7. `npm run docs` — expected exit 0 and `rows read: 1, disagreements found: 0`
8. `PATH=/opt/npm11/bin:$PATH npm test` — every project's totals (router's browser suite runs under Chromium; report a timing red with its reading, the Orchestrator re-runs it alone)
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` if the manifest declares it, else record that it is absent

## Output

Checker: per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker <package>`. Verifier: per command the exit code and last lines verbatim; totals per project; terminal `GATES: GREEN` when commands 3 through 8 exit 0 (and 9 where present) else `GATES: RED <commands>`; open with `Lane held: verifier <package>`. No process diary. Perform the assignment directly and spawn nothing. The verifier fixes nothing, edits nothing, installs nothing.
