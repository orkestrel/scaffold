# Closure brief — websocket: the fix round under `checker`, the whole chain under `verifier`

## Lanes

Two lanes, blind, clean contexts: a **checker** (`checker`, Sonnet) over websocket's fix round, and a **verifier** (`verifier`, Sonnet) over its whole chain.

## Evidence (under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`)

- `d7n-websocket-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt` (the fix round, landed as `3f9e229`; its W4 stopped at the grant's edge); `d7n-websocket-frame-brief.md`, `-report.md`, `.diff.txt`, `.status.txt` (the W4 successor, landed as `d8ff4ee`: the `frame` helper renamed `encodeTestFrame` at its declaration and every call site under `tests/**`); `/home/user/fleet/websocket` at its tip `d8ff4ee`; the verdict `d7n-slice5-audit-verdict.md` (items W1 to W8); Rulings 9 to 19 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts`.

## Checker claims

1. Every item the fix brief names landed in the fix round's diff as the brief states it, W4 excepted, and W4 landed whole in the successor's diff; nothing else changed in either (scope honesty against each status file; the successor's grant is `tests/setupServer.ts`, `tests/setupServer.test.ts`, and the call sites under `tests/src/**`).
2. The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries.
3. Each named correction is present as the audit's finding asked: the hoisted `examples` binding and the drop-in's two sentences; every constant's literal named in its description and read in its cell, the constants table heading `Shape` (Ruling 18); the `Shape` column under Ruling 15's sentence on `### Types`; `encodeTestFrame` with its frame-naming description and no remaining `frame(` call; "The error channels stay distinct"; the dependency sentence; the all-caps gone from `NodeWebSocket.ts` and `types.ts`; the `on:` hook restored on both sides of the titled pair (Ruling 14).

## Verifier commands (from `/home/user/fleet/websocket`, each exit code read from `$?`; `npm test` under `PATH=/opt/npm11/bin:$PATH`)

1. `git rev-parse --short HEAD && git status --short`
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` (the head start `0.0.18`; `package.json` declares `^0.0.17` — the recorded state, not a defect)
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run build`
7. `npm run docs` — expected exit 0 and `rows read: 1, disagreements found: 0`
8. `PATH=/opt/npm11/bin:$PATH npm test` — every project's totals (report a timing red with its reading, the Orchestrator re-runs it alone)
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` if the manifest declares it, else record that it is absent

## Output

Checker: per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker websocket`. Verifier: per command the exit code and last lines verbatim; totals per project; terminal `GATES: GREEN` when commands 3 through 8 exit 0 (and 9 where present) else `GATES: RED <commands>`; open with `Lane held: verifier websocket`. No process diary. Perform the assignment directly and spawn nothing. The verifier fixes nothing, edits nothing, installs nothing.
