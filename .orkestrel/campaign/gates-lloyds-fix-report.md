# Gate report — lloyds at `e508e8c` after the fix round (verifier, Sonnet, 2026-09-03)

| Gate                   | Exit | Summary                                                                  |
| ---------------------- | ---- | ------------------------------------------------------------------------ |
| `npm run format:check` | 0    | 220 files, all correctly formatted                                       |
| `npm run lint:check`   | 0    | no diagnostic                                                            |
| `npm run check`        | 0    | app core and app browser clean                                           |
| `npm run build`        | 0    | 208 modules; chunk-size advisory only                                    |
| `npm test`             | 0    | app:core 484; app:browser 300 passed 1 skipped; policy 111; config 46; setup 41 |

Capture runs, each alone: `light-1280` 19; `dark-1280` 19; `light-390` 19; `dark-390` 19, all
passed. `git status --porcelain` shows the user's lockfile pair and nothing else.
