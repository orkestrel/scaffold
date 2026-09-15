<!-- verifier on Claude Sonnet, native, read-only with Bash, on the ollama checkout at f994872 with the daemon warm and the agent tarball from d84b1a2 installed --no-save; returned 2026-09-15 after 115 s; retained verbatim from the returned message -->

## Gate results — `@orkestrel/ollama` at commit `f994872`

| Command | Exit code |
|---|---|
| `git rev-parse --short HEAD` | 0 (`f994872`) |
| `git status --porcelain` (pre-chain) | 0, empty |
| `curl .../api/tags` | 0, HTTP `200` |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 |
| `npm run test:service` | 0 |

**`node_modules/@orkestrel/agent`**: installed version `0.0.21`; `UPSTREAM_RELAY_STATUS` count in `dist/src/core/index.d.ts` is `1` (present).

**Daemon reachability**: `curl` to `http://127.0.0.1:11434/api/tags` returned `200`.

### Per-project test counts

| Project | Test Files | Tests |
|---|---|---|
| `src:core` | 4 passed (4) | 99 passed (99) |
| `setup` | 3 passed (3) | 96 passed (96) |
| `policy` | 1 passed (1) | 90 passed \| 1 skipped (91) |
| `config` | 1 passed (1) | 172 passed \| 1 skipped (173) |
| `test:guides` | 1 passed (1) | 33 passed (33) |
| `conformance` | 1 passed (1) | 17 passed (17) |

**`service` project** (`npm run test:service`, outside `npm test`, run under `prepublishOnly`): Test Files `12 passed (12)`; Tests `61 passed (61)`.

### Failures

None. Every command exited `0`, so no failure excerpt applies.

### `git status --porcelain` after the chain

Empty (clean tree).

### Notices

The API Extractor notice appeared in the build output. Per the brief, this is not a failure.

`GATES: GREEN`
