# Closure brief — contract, sqlite, indexeddb: the fix rounds under `checker`, the whole chain under `verifier`

## Lanes

Per package, two lanes, blind, clean contexts: a **checker** (`checker`, Sonnet) over the package's fix round, and a **verifier** (`verifier`, Sonnet) over the package's whole chain. The dispatch names the package and the lane.

## Evidence per package (under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`)

- contract: `d7n-contract-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/contract` at its tip `6e9942a`; the audit's verdict `d7n-contract-audit-verdict.md` (items C1 to C8).
- sqlite: `d7n-sqlite-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/sqlite` at its tip `691d024`; the verdict `d7n-single-face-audit-verdict.md` (items S1 to S5).
- indexeddb: `d7n-indexeddb-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/indexeddb` at its tip `5d29c45`; the same verdict (items I1 to I5).
- Rulings 9 to 17 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts` for the drop-in's canonical text (Ruling 13; contract's `30_000` budget is a recorded standing condition until the closing sweep).

## Checker claims (per package, rule only the named package)

1. Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file).
2. The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries.
3. Each named correction is present as the audit's finding asked — contract: the pin in the pilot's guard-and-continue form, the guard table's narrowed types, every interface row's `Shape` cell in Ruling 12's idiom with no `…`, the cloner interfaces' distinct descriptions, the `isArray` remark on `isArray`, the counts and all-caps gone, the `tests/setup.ts` subject, the titled fence's claims executed; sqlite: the hoisted `examples` binding matching the pilot, the `Shape` column under Ruling 15's sentence with `path` and `connected` in `SQLiteDatabaseInterface`'s cell, the `node:sqlite` link, the `{@link}` cross-references, the all-caps gone; indexeddb: the `Shape` column under Ruling 15's sentence and the member-list prose deleted, the two remarks no longer restating their descriptions, the opening prose, the grown factory example on both sides with its transcription case extended, the all-caps gone.

## Verifier commands (per package, from its checkout, each exit code read from `$?`; `npm test` under `PATH=/opt/npm11/bin:$PATH`)

1. `git rev-parse --short HEAD && git status --short`
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` (the head start `0.0.18`; `package.json` declares `^0.0.17` — the recorded state, not a defect)
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run build`
7. `npm run docs` — expected exit 0 and `rows read: 1, disagreements found: 0`
8. `PATH=/opt/npm11/bin:$PATH npm test` — every project's totals (indexeddb's browser suite runs under Chromium; report a timing red with its reading, the Orchestrator re-runs it alone)
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` if the manifest declares it, else record that it is absent

## Output

Checker: per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker <package>`. Verifier: per command the exit code and last lines verbatim; totals per project; terminal `GATES: GREEN` when commands 3 through 8 exit 0 (and 9 where present) else `GATES: RED <commands>`; open with `Lane held: verifier <package>`. No process diary. Perform the assignment directly and spawn nothing. The verifier fixes nothing, edits nothing, installs nothing.
