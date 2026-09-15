<!-- verifier on Claude Sonnet, native, read-only with Bash, on the ollama checkout at 2178171 with the daemon warm; returned 2026-09-14 after 62 s; retained verbatim from the returned message. A final rerun follows the last ollama commit and names the service project explicitly. -->

# Gate report — `@orkestrel/ollama` at `2178171`

Checkout: `C:/Users/mikes/WebstormProjects/ollama`. `git status --porcelain` before the chain: empty (clean). `curl` to `http://127.0.0.1:11434/api/tags`: `200`. Installed `@orkestrel/agent` version: `0.0.21`; `grep -c UPSTREAM_RELAY_STATUS node_modules/@orkestrel/agent/dist/src/core/index.d.ts`: `1`.

| Command | Exit code |
|---|---|
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 |

All five gates passed. No non-zero exit, so no failure excerpt to report. The `build` step emitted the standing API Extractor notice, which the brief names as not a failure.

## Per-project test counts (`npm test`)

- `src:core`: Test Files 4 passed (4); Tests 99 passed (99)
- `setup`: Test Files 3 passed (3); Tests 96 passed (96)
- `policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `guides`: Test Files 1 passed (1); Tests 32 passed (32)
- `conformance`: Test Files 1 passed (1); Tests 17 passed (17)

`service` project: not run. The `npm test` script does not include `test:service`; that project runs only under `npm run test:service`, invoked separately in `prepublishOnly`. The brief's command chain names `npm test` exactly, so no `service` reading exists for this run. The daemon check above (`200`) confirms the daemon was warm, but the `service` suite itself was not exercised by the named chain.

## Post-chain status

`git status --porcelain` after the chain: empty (clean).

GATES: GREEN
