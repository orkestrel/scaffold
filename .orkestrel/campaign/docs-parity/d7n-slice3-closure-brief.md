# Closure brief — slice 3 (html, ndjson): the fix rounds under `checker`, the whole chain under `verifier`

## Lanes

Per package, two lanes, blind, clean contexts: a **checker** (`checker`, Sonnet) over the package's fix round, and a **verifier** (`verifier`, Sonnet) over the package's whole chain. The dispatch names the package and the lane.

## Evidence per package (under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`)

- html: `d7n-html-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/html` at its tip `1121b5c`.
- ndjson: `d7n-ndjson-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/ndjson` at its tip `7ce1e46`.
- The audit's verdict: `d7n-slice3-audit-verdict.md`; Rulings 9 to 15 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts` for the drop-in's canonical text (Ruling 13).

## Checker claims (per package, rule only the named package)

1. Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file).
2. The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries.
3. Each named correction is present as the audit's finding asked — html: the counts and all-caps gone from the guide and the doc blocks, `HTML.ts`'s `distill` bullet rewrapped and true to the code's order, the opening prose no longer restating the tagline, `HTMLInterface`'s row naming every operation the interface declares, the `Shape` idiom (Ruling 12) in the convention sentence and every row, the drop-in matching the pilot byte for byte outside its constants (the examples case's name, the equality case's position); ndjson: the drop-in matching the pilot, `## Tests` and `## See also` in the pilot's shape, the descriptive heading over the demonstrating fence (Ruling 9), the restored demonstration lines in the block and the fence (Ruling 14), the buffer caveat under the Methods table, `chunkings`'s wording, the `{@link}` cross-references in `factories.ts` and `NDJSONParser.ts`.

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
