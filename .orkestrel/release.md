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

## Standing readings

- The release commits carry each chain and test reading; each L1 release commit was pushed after its tarball served on 2026-11-20.
