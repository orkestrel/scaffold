# Gate report — lloyds at `5a4f6eb` (verifier, Sonnet, 2026-09-03)

| Gate                   | Exit | Summary                                                                  |
| ---------------------- | ---- | ------------------------------------------------------------------------ |
| `npm run format:check` | 0    | 220 files, all correctly formatted                                       |
| `npm run lint:check`   | 0    | no diagnostic                                                            |
| `npm run check`        | 0    | app core, app browser, root clean                                        |
| `npm run build`        | 0    | chunk-size advisory only                                                 |
| `npm test`             | 0    | app:core 484; app:browser 287 passed 1 skipped; policy 111; config 46; setup 41 |

Capture runs, each alone: `light-1280` 17 passed; `dark-1280` 17 passed; `light-390` 17 passed;
`dark-390` 17 passed. `git status --porcelain` shows the user's lockfile pair and nothing else.
The `Failed to mount app` warning at the start of every browser run predates the campaign and
belongs to a component test's own expected path.
