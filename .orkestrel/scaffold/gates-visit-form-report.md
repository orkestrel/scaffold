# Gate report — `form` after the visit's overwrite (verifier, Sonnet, 2026-09-02)

Tree: floors raised by the overwrite, contract range restored to `^0.0.13`, install and format
run. Every gate read bare, run alone.

| Gate                   | Exit | Summary                                                                 |
| ---------------------- | ---- | ----------------------------------------------------------------------- |
| `npm run format:check` | 0    | 48 files, all correctly formatted                                       |
| `npm run lint:check`   | 0    | no diagnostic                                                           |
| `npm run check`        | 0    | `tsc --noEmit` project-wide and `check:src:core` clean                  |
| `npm run build`        | 0    | `src:core` built, declarations bundled, `.d.cts` copied                 |
| `npm test`             | 0    | src:core 173; policy 111; config 46; setup 13; guides 48; 0 skipped     |

Status after the run: `.claude/agents/orkestrel.md`, `guides/contract.md`, `guides/probe.md`,
`package-lock.json`, `package.json` modified by the overwrite and install; the gates added
nothing. Committed as "Apply the scaffold 0.0.59 overwrite".
