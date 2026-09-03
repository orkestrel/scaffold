# Gate report — terrain at `44dc238` on scaffold 0.0.60 and test 0.0.12 (verifier, Sonnet, 2026-09-03)

| Gate                   | Exit | Summary                                                                   |
| ---------------------- | ---- | ------------------------------------------------------------------------- |
| `npm run format:check` | 0    | 219 files, all correctly formatted                                        |
| `npm run lint:check`   | 0    | no finding                                                                |
| `npm run check`        | 0    | root, app core, app browser (`vue-tsc`) clean                             |
| `npm run build`        | 0    | 219 modules, chunk-size advisory only                                     |
| `npm test`             | 0    | app 974 passed 1 skipped in 58.38 s; policy 111; config 46; setup 43      |

`git status --porcelain` shows the user's `package-lock.json` change (now `MM`) and nothing else.
