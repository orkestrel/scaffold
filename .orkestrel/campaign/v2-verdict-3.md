<!-- verifier on Claude Sonnet, native, read-only with Bash, on the ollama checkout at e689e5b (the ollama side's tip) with the daemon warm and the agent tarball from d84b1a2 installed --no-save; returned 2026-09-15 after 111 s; retained verbatim from the returned message -->

| Command | Exit code |
|---|---|
| `git rev-parse --short HEAD` | 0 (`e689e5b`) |
| `git status --porcelain` (before) | 0 (empty) |
| `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:11434/api/tags` | 0 (`200`) |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 |
| `npm run test:service` | 0 |

Preflight facts: installed `@orkestrel/agent` version `0.0.21` (packed tarball, `--no-save`); `grep -c UPSTREAM_RELAY_STATUS node_modules/@orkestrel/agent/dist/src/core/index.d.ts` = `1`.

Per-project test counts, from `npm test` in script order:

- `src:core` — Test Files 4 passed (4); Tests 99 passed (99)
- `setup` — Test Files 3 passed (3); Tests 96 passed (96)
- `policy` — Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `config` — Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `guides` — Test Files 1 passed (1); Tests 34 passed (34)
- `conformance` — Test Files 1 passed (1); Tests 17 passed (17)

**`service` project** (`npm run test:service`, run separately, outside `npm test`): Test Files 12 passed (12); Tests 61 passed (61)

`npm run build` produced the expected API Extractor notice — not a failure, no other diagnostics.

No non-zero exits, so no failure excerpts to report.

`git status --porcelain` after the chain: empty (clean tree).

GATES: GREEN
