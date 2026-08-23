# Gate evidence — after W1

Run by an independent `verifier` at commit `dd1c1ff`, working tree clean, no writer live. A writer's
own report never establishes green; this is the authoritative reading for the checkpoint.

| Gate                   | Exit |
| ---------------------- | ---- |
| `npm run format:check`  | 0    |
| `npm run lint:check`    | 0    |
| `npm run check`         | 0    |
| `npm run build`         | 0    |
| `npm test`              | 0    |
| `npm run test:config`   | 0    |

Per-project counts from `npm test`: `src:core` 8 files and 327 tests; `src:server` 5 files and 408
tests; `src:bin` 3 files and 189 tests; `policy` 1 file and 93 tests; `config` 1 file and 44 tests;
`guides` 1 file and 14 tests.

The `config` project carried 43 tests at the campaign's baseline and carries 44 here, which is W1's
assertion. Under `--reporter=verbose` it reads `✓ |config| tests/config.test.ts > root
configuration > emits every project as a factory so the release mode reaches its proof`.

`lint:check` exits 0 tree-wide, and linting `.orkestrel/campaign/rehearsal/drive.mjs` directly with
the project's config under `--deny-warnings` also exits 0, so the instrument that broke the gate no
longer triggers `no-underscore-dangle`.

One expected `stderr` line appears in `src:core`, from the negative-path fixture in
`templates.test.ts` that refuses a non-object peer dependency declaration at config load. It is the
test's intended output.

No rerun was needed and no flake was observed.
