# Brief — U3 `d7-guide-verify` (the whole gate chain over the guide checkout, registry scaffold restored)

## Role and engine

`verifier` on Sonnet. Runs the commands below in `/home/user/fleet/guide` exactly as written, reads each exit code, and reports; fixes nothing, edits nothing, installs nothing. Performs the assignment directly and spawns nothing.

## Standing conditions

- The Orchestrator has run `npm ci` before this dispatch, so `node_modules/@orkestrel/scaffold` is the registry's `0.0.63`; record `node -p "require('/home/user/fleet/guide/node_modules/@orkestrel/scaffold/package.json').version"` first.
- `npm test` and `npm run test:distribution` run under `PATH=/opt/npm11/bin:$PATH` (npm 11.19.1; the shell's npm 10.9.7 crashes on a bare `vitest` install).
- Every command runs from `/home/user/fleet/guide`; each exit code is read from `$?` after the command, never inferred from output.

## Commands, in order, each with its exit code and last lines

1. `git rev-parse --short HEAD && git status --short`
2. `node -p "require('./node_modules/@orkestrel/scaffold/package.json').version"`
3. `npm run format:check`
4. `npm run lint:check`
5. `npm run check`
6. `npm run build`
7. `npm run build && npm run docs` — expected exit 0 and one line `rows read: 1, disagreements found: 0`
8. `PATH=/opt/npm11/bin:$PATH npm test` — every project's totals
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
10. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — expected to report the vendored paths the head start wrote as drift against the registry `0.0.63` until scaffold publishes; record the list, exit code included; this reading gates nothing.

## Output

`/home/user/scaffold/tmp/units/d7-guide-verify-report.md`: per command the exit code and its last lines verbatim; totals per Vitest project; the installed scaffold version; anomalies. Terminal line: `GATES: GREEN` when commands 3 through 9 exit 0 (command 10 excluded), else `GATES: RED <commands>`.
