# Gate report — `test` after the visit's overwrite (verifier, Sonnet, 2026-09-02)

Tree: floors raised by the overwrite, install and format run. Every gate read bare, run alone.

| Gate                   | Exit | Summary                                                                 |
| ---------------------- | ---- | ----------------------------------------------------------------------- |
| `npm run format:check` | 0    | 59 files, all correctly formatted                                       |
| `npm run lint:check`   | 0    | no diagnostic                                                           |
| `npm run check`        | 0    | root, core, browser, server projects clean                              |
| `npm run build`        | 0    | core, browser, server built; API Extractor TypeScript-version advisory |
| `npm test`             | 0    | src 455 passed 9 skipped; policy 111; config 46; setup 24; guides 38 passed 1 skipped |

The `[Unhandled error]` and `[Unhandled rejection]` lines come from `tests/src/browser/factories.test.ts`
dispatching `error` and `unhandledrejection` events deliberately; 0 failed.

Status after the run: `.claude/agents/orkestrel.md`, `guides/probe.md`, `package-lock.json`,
`package.json` modified by the overwrite and install; the gates added nothing. Committed as
"Apply the scaffold 0.0.59 overwrite".
