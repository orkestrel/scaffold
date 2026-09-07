# Brief — P.4 `d7n-ndjson-verify` (ndjson's whole chain under the guide head start)

## Role and engine

`verifier` on Sonnet. Runs the commands below in `/home/user/fleet/ndjson` exactly as written, reads each exit code, and reports; fixes nothing, edits nothing, installs nothing. Performs the assignment directly and spawns nothing.

## Standing conditions

- `node_modules/@orkestrel/guide` is the packed tip `0.0.18` installed `--no-save` (the registry serves `0.0.17`); record `node -p "require('/home/user/fleet/ndjson/node_modules/@orkestrel/guide/package.json').version"` first. `package.json` declares `^0.0.17`; that is the recorded head-start state, not a defect.
- `npm test` runs under `PATH=/opt/npm11/bin:$PATH`.
- Every command runs from `/home/user/fleet/ndjson`; each exit code is read from `$?` after the command. A timing failure in a whole-suite run is reported as read, with the failing file named; the Orchestrator re-runs it alone.

## Commands, in order, each with its exit code and last lines

1. `git rev-parse --short HEAD && git status --short`
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run build`
7. `npm run docs` — expected exit 0 and one line `rows read: <non-zero>, disagreements found: 0`
8. `PATH=/opt/npm11/bin:$PATH npm test` — every project's totals
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` if the manifest declares that script (`grep -n '"test:distribution"' package.json`); otherwise record that it is absent

## Output

`/home/user/scaffold/tmp/units/d7n-ndjson-verify-report.md`: per command the exit code and its last lines verbatim; totals per Vitest project; the installed guide version; anomalies. Terminal line: `GATES: GREEN` when commands 3 through 8 exit 0 (and 9 where present), else `GATES: RED <commands>`.
