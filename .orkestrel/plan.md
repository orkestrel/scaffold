# Contract republish wave

Goal: every published `@orkestrel` package except `@orkestrel/supervisor` serves a registry version whose runtime and development `@orkestrel` ranges name the newest registry releases, with `@orkestrel/contract` at `^0.0.18` throughout, and each package's gates green against the artifact it ships.

Exit criterion: `wave.ts --plan` lists no package whose registry manifest names a range older than the registry serves, and `.orkestrel/release.md` rules every package as published or as no bump with its evidence.

## Round 0, on their own account

| Package | From | To | Why |
| --- | --- | --- | --- |
| `@orkestrel/scaffold` | 0.0.78 | 0.0.79 | The `setup:browser` project takes the global setup, `overwrite` writes the planned `test:setup:browser` script, and the vendored config proof reads only its own scratch directory |
| `@orkestrel/probe` | 0.0.17 | 0.0.18 | The `oxlint` peer is dropped, so the package installs into an empty project |

## Layers

Read from the catalog table in `.claude/agents/orkestrel.md`, regenerated with `scaffold catalog` before the wave starts.

| Layer | Packages |
| --- | --- |
| L0 | `contract` (0.0.18 published) |
| L1 | `abort`, `budget`, `codec`, `csv`, `emitter`, `html`, `indexeddb`, `msg`, `ndjson`, `sqlite`, `sse`, `test`, `timeout` |
| L2 | `console`, `database`, `form`, `markdown`, `pool`, `process`, `reason`, `router`, `table`, `template`, `tool`, `websocket` |
| L3 | `browser`, `guide`, `interpret`, `lsp`, `qualifier`, `queue`, `rater`, `relation`, `scaffold`, `sea`, `server`, `terminal`, `workspace` |
| L4 | `brief`, `mcp`, `middleware`, `program`, `worker`, `workflow` |
| L5 | `agent`, `probe` |
| L6 | `ollama`, `toolbox` |

## Per package

1. Visit through the format step: re-pin every `@orkestrel` range to the registry, commit, overwrite with the newest scaffold, prove the audit, install, sweep, format.
2. Rule the bump from the comparison and the runtime range reading.
3. Bump from the registry version, install, sweep the self-pins, and run `prepublishOnly` to green.
4. Commit the release and push before the layer's window.

## Per layer

Upload the layer's prepared packages, confirm each version on the registry, refresh the registry reading, then prepare the next layer. After L6, re-pin the development ranges that moved during the wave (`scaffold`, `probe`, `guide`, `test`) in every package and commit without a bump.

## Carried

- `mcp` takes the `inject('server')` fix for `tests/setupBrowser.test.ts` in its L4 visit, after scaffold 0.0.79 gives `setup:browser` the global setup.
- `worker` re-pins `@orkestrel/contract` to `^0.0.18` in its L4 visit, after `queue` publishes on contract 0.0.18 in L3.
