# Gate report — `test` at `ba6303a` after the fix round (verifier, Sonnet, 2026-09-02)

| Gate                   | Exit | Summary                                                                 |
| ---------------------- | ---- | ----------------------------------------------------------------------- |
| `npm run format:check` | 0    | 59 files, all correctly formatted                                       |
| `npm run lint:check`   | 0    | no diagnostic                                                           |
| `npm run check`        | 0    | root, core, browser, server projects clean                              |
| `npm run build`        | 0    | core, browser, server built; API Extractor TypeScript-version advisory |
| `npm test`             | 0    | src 470 passed 9 skipped; policy 111; config 46; setup 24; guides 38 passed 1 skipped |

The `src` count rose from 468 to 470 with the build-refusal cases. `git status --porcelain` empty.
