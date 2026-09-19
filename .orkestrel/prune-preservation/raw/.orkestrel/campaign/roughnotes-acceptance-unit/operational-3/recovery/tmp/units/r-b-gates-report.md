Read this operational translation from its document directory. Commands name retained inputs but keep the historical working-root requirements of the [raw execution record](../../../../recovery/tmp/units/r-b-gates-report.md). Do not execute acceptance mutations from this retained folder. Historical image and portfolio tokens identify retained inventory carriers; image measurements and inspection statements describe the original PNGs.

# Gate report: r-b-gates

## Result

GREEN. The ordered acceptance sweep completed with native exit `0` for every dispatched command. No source or dependency drift appeared in the final status snapshot.

## Context

The recovery checkout is on `recovery/journey-20260918`. The frozen source report exists at `../../../../recovery/tmp/units/r-b-report-11.md`. `CAPTURE` was unset, so this sweep created no capture portfolio.

Installed packages:

| Package | Version |
| --- | --- |
| `@orkestrel/scaffold` | `0.0.75` |
| `@orkestrel/test` | `0.0.18` |

## Gates

| Command | Native exit | Duration |
| --- | --- | --- |
| `npm.cmd run format:check` | `0` | `1912 ms` |
| `npm.cmd run lint:check` | `0` | `684 ms` |
| `npm.cmd run check` | `0` | `7430 ms` |
| `npm.cmd run build` | `0` | `5215 ms` |
| `npm.cmd test` | `0` | `143225 ms` |

No gate failed. The test chain completed its `app`, `journey`, `policy`, `config`, `setup`, `setup:browser`, and `conformance` scripts.

## Status

The final status matches the inherited dirty source/configuration set from before the sweep. The existing modified and deleted paths remain unchanged, and `tests/setupBrowser.test.ts` remains the inherited untracked path. The build regenerated its allowed ignored output.

## Evidence

Complete logs and snapshots are in `../../../../recovery/tmp/units/r-b-gates-evidence`:

- `../../../../recovery/tmp/units/r-b-gates-evidence/preflight.log.txt`
- `../../../../recovery/tmp/units/r-b-gates-evidence/format-check.log.txt`
- `../../../../recovery/tmp/units/r-b-gates-evidence/lint-check.log.txt`
- `../../../../recovery/tmp/units/r-b-gates-evidence/check.log.txt`
- `../../../../recovery/tmp/units/r-b-gates-evidence/build.log.txt`
- `../../../../recovery/tmp/units/r-b-gates-evidence/test.log.txt`
- `../../../../recovery/tmp/units/r-b-gates-evidence/final-status.log.txt`

## Anomalies

The build and browser-test steps emitted Sass deprecation warnings from Bootstrap and Vite plugin-timing notices. They did not change the native exit status. PowerShell also rendered npm notice output as `NativeCommandError` records when stderr was merged into the retained log; each command's captured native exit is `0`.

Registry restoration and the capture portfolio remain parent-owned obligations. This verifier made no source, dependency, publication, or capture change.
