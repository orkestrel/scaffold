# Closure brief — test: the fix round under `checker`, the whole chain under `verifier`

## Lanes

Two lanes, blind, clean contexts: a **checker** (`checker`, Sonnet) over the fix round, and a **verifier** (`verifier`, Sonnet) over the whole chain of `/home/user/fleet/test`.

## Evidence (under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`)

`d7n-test-converge-fix-brief.md`, `d7n-test-converge-fix-report.md`, `d7n-test-converge-fix.diff.txt`, `.status.txt`; the audit's verdict `d7n-test-audit-verdict.md`; the tree `/home/user/fleet/test` at its branch tip; the comparator `instruments/d7/pass/cells/compare-cells.mjs` and its readings in the report.

## Checker claims

1. Every item the fix brief names landed as the brief states it — the convention sentence above every table carrying `Shape`, worded against that table's rows; the core and browser Constants columns headed `Shape`; § Tests naming the titled `Own a temporary directory` fence — and nothing else changed (scope honesty against the status file: `guides/test.md` alone).
2. The comparator's reading in the report (rows 234 before and after, no row missing or added, every changed cell under the renamed `Signature` header) is consistent with the diff.
3. The report's citations match the tree the unit left and it states no count in prose.

## Verifier commands (from `/home/user/fleet/test`, each exit code read from `$?`)

1. `git rev-parse --short HEAD && git status --short`
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` (the head start `0.0.18`; `package.json` declares `^0.0.17` — recorded, not a defect)
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run build`
7. `npm run docs` — expected exit 0 and `rows read: 1, disagreements found: 0`
8. `PATH=/opt/npm11/bin:$PATH npm test` — every project's totals; a timing failure is reported as read with the file named
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` if the manifest declares it, else record that it is absent

## Output

Checker: per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT:` line; open with `Lane held: checker test`. Verifier: per command the exit code and last lines verbatim; totals per project; terminal `GATES: GREEN` when commands 3 through 8 exit 0 (and 9 where present) else `GATES: RED <commands>`; open with `Lane held: verifier test`. No process diary. Perform the assignment directly and spawn nothing. The verifier fixes nothing, edits nothing, installs nothing.
