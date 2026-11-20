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

## Standing readings

- The release commits carry each chain and test reading; each L1 release commit was pushed after its tarball served on 2026-11-20.
