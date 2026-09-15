<!-- D4-S2 — builder (Sonnet, native), supervisor guide relocation. Retained from the completion notification, 2026-09-15 (50 s, 12 tool uses). -->

`git status --porcelain`: `M README.md`, `M guides/README.md`, `D guides/src/{agent,budget,contract,database,emitter,guide,mcp,middleware,ollama,router,scaffold,sea,server,sse,supervisor,terminal,tool,workflow}.md`, `M tests/guides.test.ts`, `?? guides/supervisor.md`.

Link table: `](../../tests/...)` (65 links) → `](../tests/...)` exists; `](../../AGENTS.md)` → `](../AGENTS.md)` exists; `](../README.md)` → `](./README.md)` exists; `](./mcp.md)` unchanged, exists. No link left unresolved; every rewritten target verified with `test -e` from `guides/`.

`QUOTING` (`tests/guides.test.ts:172`): `Object.freeze(['README.md', 'guides/supervisor.md'])`. Pitch inserted under the README H1, equal to the guide's tagline ("A fenced record for external work launched by a workflow: one durable row per attempt, one renewable owner epoch, and one honest answer when a process disappears between launch and identity commit."). Stale `guides/src/*.md` mirrors deleted and the directory removed. No gate run in the checkout (the ERESOLVE ruling). Deviation: none.
