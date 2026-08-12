# Fleet registry

Session ledger for the fleet-wide scaffold-overwrite campaign. Live state verified against the npm
registry and the GitHub repository list on 2026-08-11. Versions here are evidence, not memory —
re-verify before acting on any of them.

## Verification basis

- npm: `npm search @orkestrel --json --searchlimit=250`, then `registry.npmjs.org/<pkg>/latest` per
  package for dependency edges. 41 published packages.
- GitHub: `list_repos` for the `orkestrel` org. 43 repositories.
- Local checkout: `/home/user/scaffold` at `25af21c` (`v0.0.24`), branch
  `claude/orkestrel-fleet-orchestration-cv30e8`, clean, no `dist/`.

## Roster: published versions and runtime `@orkestrel/*` edges

| Package      | npm latest | Runtime deps                                                                                              |
| ------------ | ---------- | --------------------------------------------------------------------------------------------------------- |
| `abort`      | 0.0.5      | `contract`                                                                                                |
| `agent`      | 0.0.14     | `abort`, `budget`, `contract`, `database`, `emitter`, `queue`, `timeout`, `tool`, `workflow`, `workspace` |
| `browser`    | 0.0.8      | `contract`, `emitter`, `html`, `websocket`                                                                |
| `budget`     | 0.0.5      | `contract`                                                                                                |
| `console`    | 0.0.4      | `contract`, `emitter`                                                                                     |
| `contract`   | 0.0.10     | —                                                                                                         |
| `csv`        | 0.0.2      | `contract`                                                                                                |
| `database`   | 0.0.7      | `contract`, `emitter`, `indexeddb`, `sqlite`                                                              |
| `emitter`    | 0.0.5      | `contract`                                                                                                |
| `guide`      | 0.0.9      | `contract`, `markdown`                                                                                    |
| `html`       | 0.0.2      | `contract`                                                                                                |
| `indexeddb`  | 0.0.6      | `contract`                                                                                                |
| `interpret`  | 0.0.7      | `contract`, `emitter`, `reason`, `template`                                                               |
| `markdown`   | 0.0.7      | `contract`, `html`                                                                                        |
| `mcp`        | 0.0.13     | `contract`, `emitter`, `sse`, `tool`, `websocket`                                                         |
| `middleware` | 0.0.9      | `abort`, `budget`, `contract`, `timeout`                                                                  |
| `msg`        | 0.0.5      | —                                                                                                         |
| `ndjson`     | 0.0.5      | `contract`                                                                                                |
| `ollama`     | 0.0.8      | `agent`, `budget`, `contract`, `ndjson`, `timeout`, `tool`                                                |
| `pool`       | 0.0.6      | `emitter`                                                                                                 |
| `program`    | 0.0.6      | `contract`, `emitter`, `qualifier`, `rater`, `reason`                                                     |
| `qualifier`  | 0.0.7      | `contract`, `emitter`, `reason`                                                                           |
| `queue`      | 0.0.7      | `abort`, `contract`, `database`, `emitter`, `timeout`                                                     |
| `rater`      | 0.0.8      | `contract`, `emitter`, `reason`                                                                           |
| `reason`     | 0.0.4      | `contract`, `emitter`                                                                                     |
| `relation`   | 0.0.7      | `contract`, `database`, `emitter`                                                                         |
| `router`     | 0.0.8      | `abort`, `contract`, `emitter`                                                                            |
| `scaffold`   | 0.0.24     | `console`, `contract`, `emitter`, `markdown`, `template`                                                  |
| `sea`        | 0.0.5      | `contract`, `emitter`                                                                                     |
| `server`     | 0.0.10     | `abort`, `contract`, `emitter`, `router`, `timeout`                                                       |
| `sqlite`     | 0.0.6      | `contract`                                                                                                |
| `sse`        | 0.0.4      | —                                                                                                         |
| `template`   | 0.0.2      | `contract`, `emitter`                                                                                     |
| `terminal`   | 0.0.5      | `console`, `contract`, `database`, `emitter`, `sse`                                                       |
| `timeout`    | 0.0.5      | `contract`                                                                                                |
| `tool`       | 0.0.9      | `contract`                                                                                                |
| `toolbox`    | 0.0.3      | `agent`, `contract`, `database`, `relation`, `server`, `terminal`, `tool`, `workflow`, `workspace`        |
| `websocket`  | 0.0.7      | `emitter`                                                                                                 |
| `worker`     | 0.0.6      | `contract`, `database`, `emitter`, `pool`, `queue`                                                        |
| `workflow`   | 0.0.10     | `abort`, `budget`, `contract`, `database`, `emitter`, `queue`, `timeout`                                  |
| `workspace`  | 0.0.3      | `contract`, `database`, `emitter`                                                                         |

Peer edges, additional to the runtime edges above: `middleware` peers on `server` and `database`;
`mcp` peers on `router` and `server`. Every package except `scaffold` devDepends on `guide` and
`scaffold`; `scaffold` devDepends on `guide` and `html`.

## Publish layers

Topological over runtime edges. Every package in a layer is independent of its siblings.

| Layer | Packages                                                                                                                         |
| ----- | -------------------------------------------------------------------------------------------------------------------------------- |
| L0    | `contract`, `msg`, `sse`                                                                                                         |
| L1    | `abort`, `budget`, `csv`, `emitter`, `html`, `indexeddb`, `ndjson`, `sqlite`, `timeout`, `tool`                                  |
| L2    | `console`, `database`, `markdown`, `middleware`, `pool`, `reason`, `router`, `sea`, `template`, `websocket`                      |
| L3    | `browser`, `guide`, `interpret`, `mcp`, `qualifier`, `queue`, `rater`, `relation`, `scaffold`, `server`, `terminal`, `workspace` |
| L4    | `program`, `worker`, `workflow`                                                                                                  |
| L5    | `agent`                                                                                                                          |
| L6    | `ollama`, `toolbox`                                                                                                              |

No runtime cycles. The only cycle is at the tooling layer: `scaffold` (L3) is a devDependency of
every package below it. It is resolved by building each package against the already-published
`scaffold`, never against an unpublished one.

## Repositories without a published package

- `orkestrel/supervisor` — private, has a guide mirror at `guides/supervisor.md`, no npm package.
- `orkestrel/brief` — private, no guide mirror, no npm package.

## Decisions

| Date       | Decision                                            | Basis                                                        |
| ---------- | --------------------------------------------------- | ------------------------------------------------------------ |
| 2026-08-11 | Campaign proceeds in publish-layer order, L0 first. | Pin law forces a dependent re-publish cascade on every bump. |

## Push state

| Repo       | Branch                                        | Position                                  | Gates                |
| ---------- | --------------------------------------------- | ----------------------------------------- | -------------------- |
| `scaffold` | `claude/orkestrel-fleet-orchestration-cv30e8` | `25af21c`, level with `main` and `origin` | not run this session |
