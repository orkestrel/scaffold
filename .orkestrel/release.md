# Contract republish wave: release ledger

Each row carries the package's bump ruling and its evidence: the rebuilt dist compared with the published tarball, and the runtime dependency set compared with the published manifest (taken 2026-09-29 after the 0.0.78 overwrite sweep). The round column names where the package landed.

## Round 0

| Package | Published | Ruling | Evidence | Round |
| --- | --- | --- | --- | --- |
| `@orkestrel/scaffold` | 0.0.79 | bump | dist moved: the setup:browser global setup, the generated-chain write, and the scoped roll-up proof | 0 |
| `@orkestrel/probe` | 0.0.18 | bump | dist moved: the oxlint peer is dropped | 0 |

## Wave

| Package | Layer | Before | Ruling | Evidence | Round |
| --- | --- | --- | --- | --- | --- |
| `@orkestrel/abort` | L1 | 0.0.11 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.12 |
| `@orkestrel/agent` | L5 | 0.0.24 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/brief` | L4 | 0.0.9 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/browser` | L3 | 0.0.17 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/budget` | L1 | 0.0.11 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.12 |
| `@orkestrel/codec` | L1 | 0.0.4 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.5 |
| `@orkestrel/console` | L2 | 0.0.14 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.15 |
| `@orkestrel/contract` | L0 | 0.0.18 | no bump | dist same; ranges same | pending |
| `@orkestrel/csv` | L1 | 0.0.8 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.9 |
| `@orkestrel/database` | L2 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.16 |
| `@orkestrel/emitter` | L1 | 0.0.10 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.11 |
| `@orkestrel/form` | L2 | 0.0.7 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.8 |
| `@orkestrel/guide` | L3 | 0.0.20 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/html` | L1 | 0.0.10 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.11 |
| `@orkestrel/indexeddb` | L1 | 0.0.12 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.13 |
| `@orkestrel/interpret` | L3 | 0.0.14 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/lsp` | L3 | 0.0.9 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/markdown` | L2 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.16 |
| `@orkestrel/mcp` | L4 | 0.0.32 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/middleware` | L4 | 0.0.21 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/msg` | L1 | 0.0.11 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.12 |
| `@orkestrel/ndjson` | L1 | 0.0.10 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.11 |
| `@orkestrel/ollama` | L6 | 0.0.18 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/pool` | L2 | 0.0.12 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.13 |
| `@orkestrel/process` | L2 | 0.0.13 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.14 |
| `@orkestrel/program` | L4 | 0.0.14 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/qualifier` | L3 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/queue` | L3 | 0.0.14 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/rater` | L3 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/reason` | L2 | 0.0.11 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.12 |
| `@orkestrel/relation` | L3 | 0.0.13 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/router` | L2 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.16 |
| `@orkestrel/sea` | L3 | 0.0.17 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/server` | L3 | 0.0.20 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/sqlite` | L1 | 0.0.12 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.13 |
| `@orkestrel/sse` | L1 | 0.0.8 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.9 |
| `@orkestrel/table` | L2 | 0.0.6 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.7 |
| `@orkestrel/template` | L2 | 0.0.8 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.9 |
| `@orkestrel/terminal` | L3 | 0.0.16 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/test` | L1 | 0.0.24 | no bump | dist same; ranges same | 1: no bump, overwrite pushed |
| `@orkestrel/timeout` | L1 | 0.0.11 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.12 |
| `@orkestrel/tool` | L2 | 0.0.16 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.17 |
| `@orkestrel/toolbox` | L6 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/websocket` | L2 | 0.0.13 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.14 |
| `@orkestrel/worker` | L4 | 0.0.13 | no bump | dist same; ranges same | pending |
| `@orkestrel/workflow` | L4 | 0.0.19 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/workspace` | L3 | 0.0.9 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |

## Standing readings

- `@orkestrel/worker` keeps `@orkestrel/contract` at `^0.0.17` until `@orkestrel/queue` publishes on contract 0.0.18 in L3; its L4 visit re-pins it.
- `@orkestrel/timeout` 0.0.12's release commit lists the development re-pin as its moved ranges; its runtime change is contract `^0.0.17` to `^0.0.18`, as this ledger records.
- `@orkestrel/supervisor` is out of the wave by the user's ruling.
