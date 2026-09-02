# Gate reports — fix round, test and form (verifier workflow, Sonnet, 2026-09-02)

## `test` at `ce89721`

| Gate                   | Exit | Summary                                                                 |
| ---------------------- | ---- | ----------------------------------------------------------------------- |
| `npm run format:check` | 0    | 59 files, all correctly formatted                                       |
| `npm run lint:check`   | 0    | no violation                                                            |
| `npm run check`        | 0    | root, core, browser, server clean                                       |
| `npm run build`        | 0    | core, browser, server built; API Extractor TypeScript-version advisory |
| `npm test`             | 0    | src 476 passed 9 skipped; policy 111; config 46; setup 24; guides 38 passed 1 skipped |

Tree clean.

## `form` at `8ef0785`

| Gate                   | Exit | Summary                                          |
| ---------------------- | ---- | ------------------------------------------------ |
| `npm run format:check` | 0    | 48 files, all correctly formatted                |
| `npm run lint:check`   | 0    | no violation                                     |
| `npm run check`        | 0    | root and scoped projects clean                   |
| `npm run build`        | 0    | `src:core` built, declarations generated         |
| `npm test`             | 0    | src:core 173; policy 111; config 46; setup 13; guides 48 |

Tree clean.
