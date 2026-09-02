# Gate report — scaffold after the process 0.0.9 re-pin (verifier, Sonnet, 2026-09-02)

Tree at `a1b4bac` or later. Every gate read bare, run alone.

| Gate                   | Exit | Summary                                                                      |
| ---------------------- | ---- | ---------------------------------------------------------------------------- |
| `npm run format:check` | 0    | 218 files, all correctly formatted                                           |
| `npm run lint:check`   | 0    | no diagnostic                                                                |
| `npm run check`        | 0    | root, core, server, bin projects clean                                       |
| `npm run build`        | 0    | src built; 121 files staged into `dist/host` and `host.json`                 |
| `npm test`             | 0    | src:core 373; src:server 425 passed 6 skipped; src:bin 209; policy 111; config 46; guides 17 |

Longest project: `src:bin` at 32.16 s. The build left `host.json` modified: the catalog agent
file and the contract and process guide mirrors are vendored bytes, so their refresh moves the
inventory. Committed with this report.
