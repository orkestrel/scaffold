# Campaign findings: fleet dependency update, scaffold conformance, and src audit

Registry and repository readings taken 2026-08-28.

## Bench routing

| Engine | State | Evidence |
| --- | --- | --- |
| Cursor Grok | Live | Bounded round trip returned `GROK-LIVE` |
| GPT-5.6 Sol | Dark | The `codex` binary does not resolve, and the `codex` MCP server reports `ENOENT` |
| `probe` MCP server | Dark | The server reports `CONNECTION_CLOSED` |

Sol being dark puts every adversarial lane on Opus 5, as `.agents/orchestration.md` § Engine
assignment requires. The `prove` tool is unavailable, so TypeScript claims fall back to the probe
instrument `.claude/rules/tests.md` § Probes names.

## Pre-existing defects found in `scaffold@main`

These predate this campaign. The dependency update surfaced them; it did not cause them.

### The published 0.0.59 artifact is behind `main`

`dist/src/core/index.js` on the registry writes `"@orkestrel/probe": "^0.0.10"` into a generated
workspace. `main` declares `^0.0.11`, and `BASE_DEV_DEPENDENCIES` derives that floor from scaffold's
own manifest, so every workspace generated from the published package receives a floor one release
behind.

`dist/host/claude/agents/orkestrel.md` on the registry carries a catalog table one release behind:
it has no `@orkestrel/codec` row and it names `lsp` `0.0.4`, `mcp` `0.0.26`, `probe` `0.0.10`,
`process` `0.0.7`, `scaffold` `0.0.58`, `sea` `0.0.12`, and `server` `0.0.16`. The `catalog` step of
`repair` and `overwrite` rewrites the marker-bounded table from the live registry, so a target that
runs either verb corrects the table in place; a target that only reads the vendored file does not.

Consequence: `scaffold` republishes on its own account.

### `host.json` records a stale digest

The committed `host.json` records `d61d8c80…` for `.claude/agents/orkestrel.md`, and the committed
file hashes to `0407d93b…`. Running `build:inventory` recomputes it correctly.

### The generated-manifest fixtures were red on `main`

`tests/src/core/fixtures/source-manifest.txt`, `app-only-toolchain.txt`, and
`setup-false-manifest.txt` recorded `@orkestrel/probe` at `^0.0.10` while the manifest declared
`^0.0.11`, so `npm test` was red on `main` before this campaign. Regenerating the three snapshots
moves that one pin and nothing else.

## Dependency update

Every external dependency was already at the registry latest except the rows below. typescript
holds at `^6.0.3` by the user's decision; the registry latest is 7.0.2 and the newest stable 6.x is
6.0.3.

| Declaration | From | To | Where |
| --- | --- | --- | --- |
| `@orkestrel/probe` | `^0.0.10` | `^0.0.11` | 40 repos, development |
| `@orkestrel/scaffold` | `^0.0.58` | `^0.0.59` | 40 repos, development |
| `@orkestrel/server` | `^0.0.16` | `^0.0.17` | `middleware` peer, `ollama` development |
| `oxlint` | `^1.77.0` | `^1.80.0` | `probe` peer |
| `typescript` | `^6.0.0` | `^6.0.3` | `probe` peer |
| `vitest` | `^4.1.0` | `^4.1.11` | `probe` peer, `test` peer |
| `@modelcontextprotocol/conformance` | `0.2.0-alpha.10` | `0.2.0-alpha.11` | `mcp` development |

`scaffold overwrite` cannot undo the typescript decision: `guides/scaffold.md` § Dependency floors
states that a newer major is never crossed for you, and that peer declarations are caller-owned and
never rewritten after creation.

## Gate results

The fleet gate chain is `format:check`, `lint:check`, `check`, `build`, `test`. Run 4-way parallel
across 49 repositories, then each red re-run alone.

| Repository | Parallel | Alone | Reading |
| --- | --- | --- | --- |
| `scaffold` | FAIL `check` | FAIL `test` | Install contention, then the pre-existing fixture drift |
| `database` | FAIL `test` | OK | Contention: a 60-second guide-fence compile budget |
| `process` | FAIL `test` | pending | |
| `probe` | FAIL `test` | pending | |
| `mcp` | FAIL `test` | pending | |

## Instruments

`distdiff.mjs` compares a built `dist/` against the published tarball of the same version, over every
non-`.map` file, by file set and by whitespace-normalized content. Controls: a material mutation to
`dist/src/core/index.js` reported `changed`; a whitespace-only mutation reported unmoved; the
unmutated tree reported unmoved.

`manifestdiff.mjs` compares the local `package.json` against the published tarball's and splits each
differing field into consumer-visible and development. Controls: `middleware` reported its
`peerDependencies` change; `abort` reported development movement only. An earlier form reported
`codec` and `sse` as consumer-visible because npm writes `"dependencies": {}` into a packed manifest
that declared none; the instrument now reads an absent key and an empty collection as one
declaration, and the `middleware` control still reports.

`recon.mjs` reports what `scaffold overwrite` would change in a target, from `scaffold audit --json`.
Control: a planted byte in `abort`'s `.editorconfig` reported `stale` drift on that path, and the
restored file reported aligned.
