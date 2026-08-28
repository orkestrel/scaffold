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

## Probe gate verdict (2026-08-28, control run)

The full `npm test` in `probe` is red on pristine `main` at `a40ca19` in this container: 13 failures in `tests/src/bin/main.test.ts`, 213 passing, measured by `/home/user/work/probe-control2.sh` with output at `/home/user/work/probe-control2.log`. The campaign branch's red therefore predates the dependency update. The failures are container-environment failures (LSP arm deadlines under this host), not campaign regressions. The scoped `npm run test:src:server` passes 177/177 on the same checkout.

## Src-audit verification round (2026-08-28)

The audit lanes s12-s18 returned 273 findings over 26 packages (parse: `/home/user/work/groupprep.mjs`); the original lanes ruled 258 CONFIRMED and 15 EXEMPT. Slices s01-s11 are not yet dispatched. Every returned finding is being re-ruled from primary evidence before any fix lands: workflow `wf_2ce5d3a7-015` runs a blind objective lane and a blind subjective lane per package group (group files under `src-audit/groups/`, lane brief `src-audit/verify-brief.md`), a fleet-wide TSDoc-convention lane (`src-audit/g16-tsdoc-brief.md`), and a judge on every lane disagreement. Verdict vocabulary: DRIFT, DRIFT-RESHAPE, EXCEPTION, INVALID.

Bench ledger for the round: the `codex` CLI is absent from PATH (`command not found`, probed 2026-08-28), so the Sol bench is dark and every lane runs on Claude Opus 5 as a separate clean-context subagent, per the engine-assignment table in `.agents/orchestration.md`. The Cursor Grok bench round-tripped earlier in the campaign and holds no lane here because verification is judgment-bearing work.

The mcp conformance re-record closed its server half green and stopped on a clean deviation: the client driver `tests/conformanceClient.ts` omits object-typed schema arguments, so the runner's `json-schema-2020-12-preservation` scenario cannot arm. Successor unit `mcp-client-rerecord` (brief in `src-audit/`) owns the driver change and the client baseline re-measurement.

## Process refactor coordination (2026-08-28)

The user is refactoring `process` in a different session and removing the `Retention` class
(superfluous); a release follows. Prepared here, measured on 2026-08-28 against the fleet
checkouts and the registry at `process@0.0.8`:

- Runtime dependents that re-pin and republish: `lsp`, `mcp`, `sea` (each pins `^0.0.8`), and
  `scaffold` (runtime `dependencies` too). `probe` follows transitively (it pins `lsp` and `mcp`,
  not `process`), and nothing runtime-depends on `probe`, so the cascade closes there. No package
  declares `process` in `devDependencies`, `peerDependencies`, or `optionalDependencies`.
- `Retention` removal costs dependents no code: `grep -rn Retention` over `src/` and `tests/` of
  `lsp`, `mcp`, `sea`, `scaffold`, and `probe` returns nothing. The `Retention` hits in `console`
  and `contract` are unrelated symbols of their own. The only dependent-side carriers are the
  vendored `guides/process.md` mirrors in `lsp`, `mcp`, and `sea`, which still document
  `Retention` and must be refreshed from the refactored guide during the wave (the published
  package ships only `dist/src`, so the mirror refresh follows the `orkestrel-publish` wave
  procedure).
- `/home/user/work/process-repin.sh <new-version>` stages the re-pin and lockfile regeneration
  for the direct dependents once the release is on the registry.
- Freeze: no fix unit dispatches into `/home/user/fleet/process` while the refactor session owns
  that tree, and the process rows in the g05 verification verdicts are advisory input for the
  refactor rather than fix work here. The s13 process findings (ProcessChild interface naming,
  snapshotCommand cloners placement, SupervisorFace type extraction, ProcessError @example,
  undocumented signal members) were handed to the user for that session.

## Process 0.0.9 re-pin evidence (2026-08-28)

`@orkestrel/process@0.0.9` reached the registry with no `Retention` in its published
declarations (verified against the unpacked tarball). The re-pin to `^0.0.9` landed in `lsp`,
`mcp`, `sea`, and `scaffold` with regenerated lockfiles, and `/home/user/work/repin-gates.sh`
ran the full gate chain in each — `format:check`, `lint:check`, `check`, `build`, `test` — with
every repo green (`/home/user/work/repin-gates.log`: `lsp OK`, `mcp OK`, `sea OK`,
`scaffold OK`). The scaffold run also closes the re-gate owed after the fixture repair. The
`guides/process.md` mirrors in `lsp`, `mcp`, and `sea` are refreshed from the process
repository's main after the release and carry no `Retention` section. The process campaign
branch carries a merge of that main; its own gate run is recorded beside this entry when it
completes. The wave remainder is release work: bump and publish `lsp`, `mcp`, `sea` in layer
order, `scaffold` on its own account, then re-pin `lsp` and `mcp` in `probe` and publish
`probe` last.
