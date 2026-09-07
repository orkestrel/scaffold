# Closure brief — slice 1 (codec, msg, sse): the fix rounds under `checker`, the whole chain under `verifier`

## Lanes

Per package, two lanes, blind, clean contexts: a **checker** (`checker`, Sonnet) over the package's fix round, and a **verifier** (`verifier`, Sonnet) over the package's whole chain. The dispatch names the package and the lane.

## Evidence per package (under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`)

- codec: `d7n-codec-converge-fix-brief.md`, `d7n-codec-converge-fix-report.md`, `d7n-codec-converge-fix.diff.txt`, `.status.txt`; the tree `/home/user/fleet/codec` at its branch tip (the fix commit `1effa58` after the re-repair).
- msg: `d7n-msg-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/msg` at its tip (`0526a0f` and later).
- sse: `d7n-sse-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `/home/user/fleet/sse` at its tip (`be726e0`).
- The audit's verdict: `d7n-slice1-audit-verdict.md`; rulings 9 to 12 in `rulings.md`.

## Checker claims (per package, rule only the named package)

1. Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file).
2. The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries.
3. The `## Tests` section (sse), the descriptive heading over the demonstrating fence and the retitled `@example` (msg, sse), the restored cross-file links (sse), the hoisted `examples` binding matching the pilot's `/home/user/fleet/abort/tests/guides.test.ts:206-235` (sse), the `chunkings` wording (sse), the `MSGSourceInterface` `Shape` row as bare members (msg), the guide's counts and the README skeleton (codec) — each present as the audit's finding asked.

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
