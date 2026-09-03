# Gate report — terrain at `7a27ee8` after the fix round (verifier, Sonnet, 2026-09-02)

| Gate                   | Exit | Summary                                                                 |
| ---------------------- | ---- | ----------------------------------------------------------------------- |
| `npm run format:check` | 0    | 216 files, all correctly formatted                                      |
| `npm run lint:check`   | 0    | no finding                                                              |
| `npm run check`        | 0    | root, app core, app browser (`vue-tsc`) clean                           |
| `npm run build`        | 0    | 215 modules, chunk-size advisory only                                   |
| `npm test`             | 0    | app (core and browser, 71 files) 953 passed 1 skipped in 52.44 s; policy 111; config 46 |

`git status --porcelain` shows the user's lockfile pair and nothing else. The capture runs are
outside `npm test` and are proved by the re-film after the layer's height fix.
