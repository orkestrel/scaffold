# Contract republish wave: release ledger

Each row carries the package's bump ruling and its evidence: the rebuilt dist compared with the published tarball, and the runtime dependency set compared with the published manifest (taken 2026-09-29 after the 0.0.78 overwrite sweep). The round column names where the package landed.

## Round 0

| Package | Published | Ruling | Evidence | Round |
| --- | --- | --- | --- | --- |
| `@orkestrel/scaffold` | 0.0.79 | bump | dist moved: the setup:browser global setup, the generated-chain write, and the scoped roll-up proof | 0: 0.0.79; then 3: 0.0.80 on the wave re-pins |
| `@orkestrel/probe` | 0.0.18 | bump | dist moved: the oxlint peer is dropped | 0: 0.0.18; then 5: 0.0.19 on the wave re-pins |

## Wave

| Package | Layer | Before | Ruling | Evidence | Round |
| --- | --- | --- | --- | --- | --- |
| `@orkestrel/abort` | L1 | 0.0.11 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.12 |
| `@orkestrel/agent` | L5 | 0.0.24 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 5: 0.0.25 |
| `@orkestrel/brief` | L4 | 0.0.9 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 4: 0.0.10 |
| `@orkestrel/browser` | L3 | 0.0.17 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.18 |
| `@orkestrel/budget` | L1 | 0.0.11 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.12 |
| `@orkestrel/codec` | L1 | 0.0.4 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.5 |
| `@orkestrel/console` | L2 | 0.0.14 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.15 |
| `@orkestrel/contract` | L0 | 0.0.18 | no bump | dist same; ranges same | pending |
| `@orkestrel/csv` | L1 | 0.0.8 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.9 |
| `@orkestrel/database` | L2 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.16 |
| `@orkestrel/emitter` | L1 | 0.0.10 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.11 |
| `@orkestrel/form` | L2 | 0.0.7 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.8 |
| `@orkestrel/guide` | L3 | 0.0.20 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.21 |
| `@orkestrel/html` | L1 | 0.0.10 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.11 |
| `@orkestrel/indexeddb` | L1 | 0.0.12 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.13 |
| `@orkestrel/interpret` | L3 | 0.0.14 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.15 |
| `@orkestrel/lsp` | L3 | 0.0.9 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.10 |
| `@orkestrel/markdown` | L2 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.16 |
| `@orkestrel/mcp` | L4 | 0.0.32 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 4: 0.0.33 |
| `@orkestrel/middleware` | L4 | 0.0.21 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 4: 0.0.22 |
| `@orkestrel/msg` | L1 | 0.0.11 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.12 |
| `@orkestrel/ndjson` | L1 | 0.0.10 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.11 |
| `@orkestrel/ollama` | L6 | 0.0.18 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/pool` | L2 | 0.0.12 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.13 |
| `@orkestrel/process` | L2 | 0.0.13 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.14 |
| `@orkestrel/program` | L4 | 0.0.14 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 4: 0.0.15 |
| `@orkestrel/qualifier` | L3 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.16 |
| `@orkestrel/queue` | L3 | 0.0.14 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.15 |
| `@orkestrel/rater` | L3 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.16 |
| `@orkestrel/reason` | L2 | 0.0.11 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.12 |
| `@orkestrel/relation` | L3 | 0.0.13 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.14 |
| `@orkestrel/router` | L2 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.16 |
| `@orkestrel/sea` | L3 | 0.0.17 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.18 |
| `@orkestrel/server` | L3 | 0.0.20 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.21 |
| `@orkestrel/sqlite` | L1 | 0.0.12 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.13 |
| `@orkestrel/sse` | L1 | 0.0.8 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.9 |
| `@orkestrel/table` | L2 | 0.0.6 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.7 |
| `@orkestrel/template` | L2 | 0.0.8 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.9 |
| `@orkestrel/terminal` | L3 | 0.0.16 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.17 |
| `@orkestrel/test` | L1 | 0.0.24 | no bump | dist same; ranges same | 1: no bump, overwrite pushed |
| `@orkestrel/timeout` | L1 | 0.0.11 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 1: 0.0.12 |
| `@orkestrel/tool` | L2 | 0.0.16 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.17 |
| `@orkestrel/toolbox` | L6 | 0.0.15 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | pending |
| `@orkestrel/websocket` | L2 | 0.0.13 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 2: 0.0.14 |
| `@orkestrel/worker` | L4 | 0.0.13 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 once queue published on it, with database, emitter, pool, and queue | 4: 0.0.14 |
| `@orkestrel/workflow` | L4 | 0.0.19 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 4: 0.0.20 |
| `@orkestrel/workspace` | L3 | 0.0.9 | bump | dist same; ranges @orkestrel/contract ^0.0.17 -> ^0.0.18 | 3: 0.0.10 |

## Standing readings

- `@orkestrel/worker` kept `@orkestrel/contract` at `^0.0.17` until `@orkestrel/queue` published on contract 0.0.18 in L3; its L4 release 0.0.14 re-pins it to `^0.0.18`.
- `@orkestrel/timeout` 0.0.12's release commit lists the development re-pin as its moved ranges; its runtime change is contract `^0.0.17` to `^0.0.18`, as this ledger records.
- `@orkestrel/supervisor` is out of the wave by the user's ruling.
