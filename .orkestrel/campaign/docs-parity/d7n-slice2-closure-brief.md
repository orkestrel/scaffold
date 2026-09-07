# Closure brief — slice 2 (budget, csv, emitter): the fix rounds under `checker`, the whole chain under `verifier`

## Lanes

Per package, two lanes, blind, clean contexts: a **checker** (`checker`, Sonnet) over the package's fix round, and a **verifier** (`verifier`, Sonnet) over the package's whole chain. The dispatch names the package and the lane.

## Evidence per package (under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`)

- budget: `d7n-budget-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/budget` at its tip `d3147bb`.
- csv: `d7n-csv-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/csv` at its tip `715aed6`.
- emitter: `d7n-emitter-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/emitter` at its tip `286586f`.
- The audit's verdict: `d7n-slice2-audit-verdict.md`; Rulings 9 to 15 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts` for the drop-in's canonical text (Ruling 13).

## Checker claims (per package, rule only the named package)

1. Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file).
2. The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries.
3. Each named correction is present as the audit's finding asked — budget: the opening paragraph no longer re-teaches `consume`, `GUIDE_SPEC` at the former literal, the `Shape` idiom (Ruling 12) in the convention sentence and every row, the See-also link text; csv: the hoisted `examples` binding matching the pilot byte for byte, `RowResult`'s description true to `buildRow`, the em dash in every description that broke a clause with ` - ` or `->`, § Surface's lead-in, the README naming the calls, the `Shape` idiom; emitter: the hoisted `examples` binding matching the pilot, `GUIDE_SPEC`, the `Emitter` class row naming the interface it implements, the `Shape` idiom.

## Verifier commands (per package, from its checkout, each exit code read from `$?`; `npm test` under `PATH=/opt/npm11/bin:$PATH`)

1. `git rev-parse --short HEAD && git status --short`
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` (the head start `0.0.18`; `package.json` declares `^0.0.17` — the recorded state, not a defect)
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run build`
7. `npm run docs` — expected exit 0 and `rows read: 1, disagreements found: 0`
8. `PATH=/opt/npm11/bin:$PATH npm test` — every project's totals
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` if the manifest declares it, else record that it is absent

## Output

Checker: per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker <package>`. Verifier: per command the exit code and last lines verbatim; totals per project; terminal `GATES: GREEN` when commands 3 through 8 exit 0 (and 9 where present) else `GATES: RED <commands>`; open with `Lane held: verifier <package>`. No process diary. Perform the assignment directly and spawn nothing. The verifier fixes nothing, edits nothing, installs nothing.
