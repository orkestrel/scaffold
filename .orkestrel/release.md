# Release record

Each round lists its packages in publish order: the layer, the version it replaced, the version the registry serves, the bump ruling with its evidence, and the `gitHead` the registry records. A row's ruling is the visit's (`.agents/skills/orkestrel-publish/scripts/wave.ts --visit`).

## 2026-10-04: the eager browse server and the contract-0.0.19 wave

The round shipped `@orkestrel/pool` 0.0.14 and the eager `browse` server in `@orkestrel/browser` 0.0.23, then moved every runtime consumer of pool and of the database chain to `@orkestrel/contract` `^0.0.19` (the user's ruling of 2026-10-04, "Contract wave first"), in the catalog's layer order regenerated before sequencing. `@orkestrel/supervisor` is excluded by the user's standing rule and stays on its prior ranges.

| Code | Layer | Package | From | To | Ruling | `gitHead` |
| --- | --- | --- | --- | --- | --- | --- |
| 1 (pre-round) | L2 | `@orkestrel/pool` | 0.0.13 | 0.0.14 | bump: dist moved (floor, `watch`, token `destroy`, `restarts`), contract `^0.0.19` | `5a3a631` |
| 2 | L1 | `@orkestrel/indexeddb` | 0.0.13 | 0.0.14 | bump: contract range moved; dist same | `b6fae46` |
| 2 | L1 | `@orkestrel/sqlite` | 0.0.13 | 0.0.14 | bump: contract range moved; dist same | `e456876` |
| 3 | L2 | `@orkestrel/database` | 0.0.16 | 0.0.17 | bump: contract, indexeddb, sqlite ranges moved; dist same | `14fd5b6` |
| 3 | L5 | `@orkestrel/browser` | 0.0.22 | 0.0.23 | bump: dist moved (the eager server), `@orkestrel/pool` `^0.0.14` added | `242f380` |
| 4 | L3 | `@orkestrel/queue` | 0.0.15 | 0.0.16 | bump: ranges moved; dist same | `b182c1e` |
| 4 | L3 | `@orkestrel/relation` | 0.0.14 | 0.0.15 | bump: ranges moved; dist same | `aec669d` |
| 4 | L3 | `@orkestrel/terminal` | 0.0.17 | 0.0.18 | bump: ranges moved; dist same | `bf3c7e8` |
| 4 | L3 | `@orkestrel/workspace` | 0.0.10 | 0.0.11 | bump: ranges moved; dist same | `ed74aaf` |
| 5 | L4 | `@orkestrel/worker` | 0.0.14 | 0.0.15 | bump: dist moved (forwards pool's `min`, `restarts`, `watch`), pool `^0.0.14`, contract `^0.0.19` | `a055007` |
| 5 | L5 | `@orkestrel/probe` | 0.0.19 | 0.0.20 | bump: contract, mcp, queue, tool ranges moved; dist same | `dee8845` |
| 5 | L3 | `@orkestrel/scaffold` | 0.0.90 | 0.0.91 | bump: generated workspaces pin browser `^0.0.23`, `BROWSE_UPSTREAM` adds pool, catalog regenerated; published ahead of its layer because consumers' audits read its browser pin | `9c6f2dbc2` |
| 6 | L4 | `@orkestrel/workflow` | 0.0.20 | 0.0.21 | bump: contract, database, queue ranges moved; dist same | `62e0718` |
| 7 | L5 | `@orkestrel/agent` | 0.0.25 | 0.0.26 | bump: six ranges moved; dist same (the first code for it was refused with `EOTP`) | `3a4e970` |
| 8 | L6 | `@orkestrel/toolbox` | 0.0.16 | 0.0.17 | bump: ranges moved; dist same | `2f535df` |

The code column counts the user's one-time codes in order; code 1 here is pool's, published before the wave. Every row was confirmed against the registry by `gitHead`.

Release-chain notes:

- `@orkestrel/browser`'s `prepublishOnly` runs `test:distribution -- --mode release`, which needs a Linux `/proc` table and filesystem FIFOs; on Windows the default mode ran (14 passed, 9 host-bound skips), the standard 0.0.22 shipped on. One full `test:service` run failed the synthesized-orphan case once (a 5 s window over a detached sweep and Edge's exit under load); 5 of 5 alone and the next full run (182) passed.
- `@orkestrel/scaffold` 0.0.91's catalog carries the versions published through code 4; the later rows refresh at its next release.
- `@orkestrel/ollama` 0.0.21 is held for one repair (the user's ruling, 2026-10-04): its live store tasks on `qwen3.5:2b-q4_K_M` passed 2 of 3 runs under both browser 0.0.22 and 0.0.23 in an A/B (`ollama/tmp/ab-store.json`), and `attemptStoreTask` opened every attempt in the browser's shared default context, so attempts 2 and 3 ran on shifted references (`e13`, `e25`) and never recovered. The repair isolates a fresh context per attempt; ollama publishes on the next code after its chain is green.
