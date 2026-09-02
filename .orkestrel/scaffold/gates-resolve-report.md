# Gate report — `test` at `c98f3ba` after the resolver fix (verifier, Sonnet, 2026-09-02)

| Gate                   | Exit | Summary                                                                 |
| ---------------------- | ---- | ----------------------------------------------------------------------- |
| `npm run format:check` | 0    | 59 files, all correctly formatted                                       |
| `npm run lint:check`   | 0    | no diagnostic                                                           |
| `npm run check`        | 0    | root, core, browser, server projects clean                              |
| `npm run build`        | 0    | core, browser, server built; API Extractor TypeScript-version advisory |
| `npm test`             | 0    | src 468 passed 9 skipped; policy 111; config 46; setup 24; guides 38 passed 1 skipped |

The `src` count rose from 455 to 468 with the resolver cases. A Vite port retry ("Port 63315 is
in use, trying another one") had no effect on the outcome. `git status --porcelain` empty.
