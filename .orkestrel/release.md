# Release wave: contract 0.0.27, codec 0.0.13, scaffold 0.0.144

Each row: the package, its layer, the version it published, the bump ruling with its evidence, and the round it landed in.

| Package  | Layer | Version | Ruling                  | Round |
| -------- | ----- | ------- | ----------------------- | ----- |
| contract | L0    | 0.0.27  | published before the wave | 0     |
| codec    | L1    | 0.0.13  | published before the wave | 0     |
| abort | L1 | 0.0.20 | runtime contract ^0.0.27 moved; dist same | 1 |
| budget | L1 | 0.0.21 | runtime contract ^0.0.27 moved; dist same | 1 |
| emitter | L1 | 0.0.19 | runtime contract ^0.0.27 moved; dist same | 1 |
| html | L1 | 0.0.19 | runtime contract ^0.0.27 moved; dist same | 1 |
| indexeddb | L1 | 0.0.21 | runtime contract ^0.0.27 moved; dist same | 1 |
| jsonrpc | L1 | 0.0.6 | runtime contract ^0.0.27 moved; dist same | 1 |
| ndjson | L1 | 0.0.20 | runtime contract ^0.0.27 moved; dist same | 1 |
| sqlite | L1 | 0.0.21 | runtime contract ^0.0.27 moved; dist same | 1 |
| test | L1 | 0.0.45 | runtime contract ^0.0.27 moved; server declarations moved by the WebWorker rename | 1 |
| timeout | L1 | 0.0.20 | runtime contract ^0.0.27 moved; dist same | 1 |
| console | L2 | 0.0.23 | runtime contract ^0.0.27, emitter ^0.0.19 moved; dist same | 2 |
| csv | L2 | 0.0.17 | runtime codec ^0.0.13, contract ^0.0.27 moved; dist same | 2 |
| database | L2 | 0.0.29 | runtime contract ^0.0.27, emitter ^0.0.19, indexeddb ^0.0.21, sqlite ^0.0.21 moved; dist same | 2 |
| form | L2 | 0.0.21 | runtime contract ^0.0.27, emitter ^0.0.19 moved; dist same | 2 |
| markdown | L2 | 0.0.24 | runtime contract ^0.0.27, html ^0.0.19 moved; dist same | 2 |
| msg | L2 | 0.0.20 | runtime codec ^0.0.13, contract ^0.0.27 moved; dist same | 2 |
| pool | L2 | 0.0.24 | runtime contract ^0.0.27, emitter ^0.0.19 moved; dist same | 2 |
| process | L2 | 0.0.23 | runtime contract ^0.0.27, emitter ^0.0.19 moved; dist same | 2 |
| reason | L2 | 0.0.21 | runtime contract ^0.0.27, emitter ^0.0.19 moved; dist same | 2 |
| router | L2 | 0.0.25 | runtime abort ^0.0.20, contract ^0.0.27, emitter ^0.0.19 moved; dist same | 2 |
| sse | L2 | 0.0.17 | runtime codec ^0.0.13, contract ^0.0.27 moved; dist same | 2 |
| table | L2 | 0.0.20 | runtime contract ^0.0.27, emitter ^0.0.19 moved; dist same | 2 |
| template | L2 | 0.0.17 | runtime contract ^0.0.27, emitter ^0.0.19 moved; dist same | 2 |
| tool | L2 | 0.0.26 | runtime contract ^0.0.27, emitter ^0.0.19 moved; dist same | 2 |
| websocket | L2 | 0.0.22 | runtime contract ^0.0.27, emitter ^0.0.19 moved; dist same | 2 |
| guide | L3 | 0.0.34 | runtime contract ^0.0.27, markdown ^0.0.24 moved; dist same | 3 |
| interpret | L3 | 0.0.26 | runtime contract ^0.0.27, emitter ^0.0.19, reason ^0.0.21, template ^0.0.17 moved; dist same | 3 |
| lsp | L3 | 0.0.18 | runtime contract ^0.0.27, emitter ^0.0.19, jsonrpc ^0.0.6, process ^0.0.23 moved; dist same | 3 |
| qualifier | L3 | 0.0.25 | runtime contract ^0.0.27, emitter ^0.0.19, reason ^0.0.21 moved; dist same | 3 |
| queue | L3 | 0.0.26 | runtime abort ^0.0.20, contract ^0.0.27, emitter ^0.0.19, timeout ^0.0.20, database ^0.0.29 moved; dist same | 3 |
| rater | L3 | 0.0.25 | runtime contract ^0.0.27, emitter ^0.0.19, reason ^0.0.21 moved; dist same | 3 |
| relation | L3 | 0.0.27 | runtime contract ^0.0.27, emitter ^0.0.19, database ^0.0.29 moved; dist same | 3 |
| sea | L3 | 0.0.26 | runtime contract ^0.0.27, emitter ^0.0.19, process ^0.0.23 moved; dist same | 3 |
| server | L3 | 0.0.31 | runtime abort ^0.0.20, codec ^0.0.13, contract ^0.0.27, emitter ^0.0.19, timeout ^0.0.20, router ^0.0.25 moved; dist same | 3 |
| terminal | L3 | 0.0.29 | runtime contract ^0.0.27, emitter ^0.0.19, console ^0.0.23, database ^0.0.29, form ^0.0.21, sse ^0.0.17 moved; dist same | 3 |
| workspace | L3 | 0.0.22 | runtime contract ^0.0.27, emitter ^0.0.19, database ^0.0.29 moved; dist same | 3 |
| capture | L3 | 0.0.12 | runtime contract ^0.0.27, timeout ^0.0.20, process ^0.0.23 moved; dist same; development guide ^0.0.34 served in round 3 | 4 |
| brief | L4 | 0.0.21 | runtime contract ^0.0.27, emitter ^0.0.19, interpret ^0.0.26, reason ^0.0.21 moved; dist same | 4 |
| mcp | L4 | 0.0.46 | runtime codec ^0.0.13, contract ^0.0.27, emitter ^0.0.19, jsonrpc ^0.0.6, process ^0.0.23, sse ^0.0.17, tool ^0.0.26, websocket ^0.0.22 moved; dist same; distribution fixtures name the provider model agent 0.0.47 requires | 4 |
| middleware | L4 | 0.0.37 | runtime budget ^0.0.21, contract ^0.0.27, timeout ^0.0.20 moved; server declarations moved by the WebWorker rename | 4 |
| program | L4 | 0.0.24 | runtime contract ^0.0.27, emitter ^0.0.19, qualifier ^0.0.25, rater ^0.0.25, reason ^0.0.21 moved; dist same | 4 |
| worker | L4 | 0.0.26 | runtime contract ^0.0.27, emitter ^0.0.19, database ^0.0.29, pool ^0.0.24, queue ^0.0.26 moved; server declarations moved by the WebWorker rename | 4 |
| workflow | L4 | 0.0.32 | runtime abort ^0.0.20, budget ^0.0.21, contract ^0.0.27, emitter ^0.0.19, timeout ^0.0.20, database ^0.0.29, queue ^0.0.26 moved; dist same | 4 |
| browser | L5 | 0.0.36 | runtime codec ^0.0.13, contract ^0.0.27, emitter ^0.0.19, html ^0.0.19, markdown ^0.0.24, mcp ^0.0.46, pool ^0.0.24, process ^0.0.23, router ^0.0.25, server ^0.0.31, tool ^0.0.26, websocket ^0.0.22 moved; dist moved by the HAR creator stamp; five Linux-host distribution cases unread | 5 |
| probe | L5 | 0.0.33 | runtime contract ^0.0.27, emitter ^0.0.19, timeout ^0.0.20, lsp ^0.0.18, mcp ^0.0.46, pool ^0.0.24, process ^0.0.23, tool ^0.0.26 moved; dist moved by the server identity version | 5 |
| agent | L5 | 0.0.48 | runtime abort ^0.0.20, budget ^0.0.21, contract ^0.0.27, emitter ^0.0.19, ndjson ^0.0.20, timeout ^0.0.20, database ^0.0.29, queue ^0.0.26, tool ^0.0.26, workflow ^0.0.32, workspace ^0.0.22 moved; dist same; published from the `agent-release` clone | 6 |

## Standing readings

- The release commits carry each chain and test reading; each L1 release commit was pushed after its tarball served on 2026-11-20.
