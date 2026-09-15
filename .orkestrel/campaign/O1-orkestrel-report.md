# Unit O1 — orkestrel reconciler report (retained from the completion notification, 2026-09-15)

Role `orkestrel` on Sonnet, read-only, evidence supplied by the Orchestrator (manifests and
`npm view` readings from 2026-09-15).

## Map

- `@orkestrel/tool` 0.0.14 (manifest = registry). Runtime: contract ^0.0.17. L1. `src/core` only. Guide `guides/tool.md`.
- `@orkestrel/agent` 0.0.22 (manifest = registry; catalog row stale at 0.0.21). Runtime: abort, budget, contract, database, emitter, queue, timeout, tool, workflow, workspace. L5. `src/core` only. Guide `guides/agent.md`.
- `@orkestrel/mcp` 0.0.30. Runtime: codec, contract, emitter, process, sse, tool, websocket. Peers: router ^0.0.14, server ^0.0.19. L4. `src/core`, `src/browser`, `src/server`. Guide `guides/mcp.md`.
- `@orkestrel/browser` 0.0.16. Runtime: contract, emitter, html, websocket. L3. `src/core`, `src/server`. Guide `guides/browser.md`.
- `@orkestrel/ollama` 0.0.16 (catalog row stale at 0.0.15). Runtime: agent ^0.0.22, budget, contract, ndjson, tool. L6. `src/core` only. Guide `guides/ollama.md`.
- `@orkestrel/html` 0.0.9. Runtime: contract. L1. `src/core` only. Guide `guides/html.md`.
- `@orkestrel/markdown` 0.0.14. Runtime: contract, html. L2. `src/core` only. Guide `guides/markdown.md`.

## Work order

(a) Published consumers (catalog):
- tool ^0.0.14 → agent L5, mcp L4, ollama L6, probe L5, toolbox L6.
- mcp ^0.0.30 → probe L5.
- agent → ollama L6, toolbox L6.
- browser → no in-fleet consumer.
- html ^0.0.9 → browser L3, markdown L2.
- markdown ^0.0.14 → guide L3.

(b) Dependency-first publish order if every campaign package bumps a runtime surface:
1. tool (L1); html (L1) in the same round.
2. markdown (L2) after html.
3. browser (L3) after html.
4. mcp (L4) after tool.
5. agent (L5) after tool; probe (L5) after tool and mcp.
6. ollama (L6) and toolbox (L6) after agent and tool.
`guide` (L3) republishes after markdown only on a runtime bump of markdown.

(c) Re-pin obligations per runtime bump:
- tool → agent, mcp, ollama, probe, toolbox.
- mcp → probe.
- agent → ollama, toolbox.
- browser → none.
- html → browser, markdown (then guide if markdown bumps on that account).
- supervisor unaffected.
- A devDependencies-only change obliges nothing unless the rebuilt `dist/` differs materially.

(d) Disagreeing pins: mcp dev guide ^0.0.18 vs agent/ollama dev guide ^0.0.19 is a development
disagreement across separate toolchains, not a runtime duplicate; obliges no cascade. No runtime
range disagreement visible.

## Unknowns

- Whether the planned changes touch `dependencies` (settled by the design brief and the diff).
- Whether browser, html, markdown are in scope this round (settled by the design brief).
- Whether probe's and toolbox's gates pass against agent 0.0.22 / ollama 0.0.16; `scaffold catalog` regeneration would show other stale rows.
- Whether html's single `.` export hides an environment split (settled by reading `html/src/*/index.ts`; G3 covers it).
