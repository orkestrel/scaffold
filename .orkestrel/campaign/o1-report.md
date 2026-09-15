# Unit O1 report — move `@orkestrel/ollama` from a server face to a core face

## Changes

- `src/server/**` → `src/core/**` — whole directory move (`mv`), no source logic edits (grep for
  `node:`/`process.`/`Buffer` in `src/` returned nothing before and after).
- `tests/src/server/**` → `tests/src/core/**` — whole directory move.
- `configs/src/tsconfig.server.json` → `configs/src/tsconfig.core.json` — `lib: ["ESNext",
  "WebWorker"]`, `types: []`, `rootDir`/`outDir`/`include` under `src/core` and `dist/src/core`,
  matching the `agent` checkout's `configs/src/tsconfig.core.json` form.
- `configs/src/vite.server.config.ts` → `configs/src/vite.core.config.ts` — rewritten to the
  `agent` reference form: `srcCore`/`resolveWorkspacePath` import, `outputBoundary('dist/src/core')`
  and `environmentBoundary('src/core')` plugins, `declarationRollup` with `types: ['node']` (no
  `rewrite`), `build.lib.entry` at `src/core/index.ts`, `outDir: 'dist/src/core'`. Dropped
  `rewriteCoreSpecifier` (a core face has no core specifier to rewrite).
- `vite.config.ts` — dropped the `environmentBoundary`/`outputBoundary` import (no longer used at
  root); renamed the exported `srcServer` to `srcCore` with the reference body (label `src:core`,
  colour `magenta`, `include: ['tests/src/core/**/*.test.ts']`, `setupFiles: ['./tests/setup.ts']`,
  no `plugins`/`lib`/`outDir`/`target`/`platform`); updated the `projects` list. `conformance`,
  `service`, `distribution`, `policy`, `config`, `setup`, `guides`, `probe` left unchanged.
- `tsconfig.json` — `paths` now `"@src/core": ["./src/core/index.ts"]` and
  `"@orkestrel/ollama": ["./src/core/index.ts"]`.
- `package.json` — `main`/`module`/`types`/both `exports["."]` branches point at
  `dist/src/core/index.*`; `check:src` → `check:src:core` (→ `tsconfig.core.json`); `test:src` and
  `test:src:core` → `--project src:core`; `build:src` → `build:src:core` (→
  `vite.core.config.ts`, copies `dist/src/core/index.d.ts` to `.d.cts`). No dependency, version, or
  description change.
- `guides/ollama.md`, `guides/README.md`, `README.md` — every `src/server` / `tests/src/server`
  path string rewritten to `src/core` / `tests/src/core`; the `src:server` project-label prose (a
  different token, colon not slash) left untouched, per the transformation's scope. Reflowed the
  two `guides/README.md` tables to the narrower column widths oxfmt requires after the shorter path
  strings.
- Rewrote `'@src/server'` to `'@src/core'` in every authored test file that imported it:
  `tests/conformance.test.ts`, `tests/guides.test.ts` (also its `MODULES` map value
  `'src/server'` → `'src/core'`), `tests/setupService.ts`, `tests/service/*.test.ts` (6 files),
  and the moved `tests/src/core/*.test.ts` (6 files). `tests/config.test.ts` left untouched — its
  two `'@src/server'` literals are a vendored negative-control fixture, off-limits.

## Scoped validation

- `npm run format:check` — exit 0, "All matched files use the correct format." (68 files).
- `npm run lint:check` — exit 0, no output.
- `npm run check` — exit 0 (root `tsc` plus `check:src:core` under `tsconfig.core.json`).
- `npm run build` — exit 0; emits `dist/src/core/index.js`, `index.cjs`, `index.d.ts`, `index.d.cts`;
  `dist/src/` contains only `core` after the clean.
- `npm test` — exit 0. `src:core` 6 files / 98 tests; `setup` 3 files / 91 tests; `policy` 1 file /
  90 passed + 1 skipped (91); `config` 1 file / 172 passed + 1 skipped (173); `guides` 1 file / 22
  tests; `conformance` 1 file / 17 tests — every count matches the baseline exactly.

## Observations

- `npm run scaffold -- audit` — exit 0: `dependencies: typescript declares major 6, while the
  registry serves major 7.` / `dependencies: vitest declares major 4, while the registry serves
  major 5.` / `0 of 35 planned paths drifted from the plan. Audit compared bytes at 23, existence at
  5, and nothing at 7.` Both dependency notices predate this unit and are unrelated to the move.
- The API Extractor TypeScript-version notice printed during `check` and `build`, as the brief's
  standing condition names, and did not fail either gate.
- `test:service` was not run — no Ollama daemon reachable, as the brief states, and it is not this
  unit's criterion.

## Deviation report

None. The transformation proceeded exactly as specified; the only judgment call — reflowing the two
`guides/README.md` markdown tables to the narrower widths oxfmt's `format:check` required after the
path strings shortened — was an ordering/wording decision inside path-adjacent prose formatting,
which the deviation contract leaves to the executor to decide, record, and carry on from.

## Status

`git status --porcelain`:

```
 M README.md
 D configs/src/tsconfig.server.json
 D configs/src/vite.server.config.ts
 M guides/README.md
 M guides/ollama.md
 M package.json
 D src/server/OllamaProvider.ts
 D src/server/constants.ts
 D src/server/errors.ts
 D src/server/factories.ts
 D src/server/helpers.ts
 D src/server/index.ts
 D src/server/parsers.ts
 D src/server/types.ts
 M tests/conformance.test.ts
 M tests/guides.test.ts
 M tests/service/OllamaProvider.test.ts
 M tests/service/compaction.test.ts
 M tests/service/conversation.test.ts
 M tests/service/factories.test.ts
 M tests/service/scopes.test.ts
 M tests/service/tools.test.ts
 M tests/service/transport.test.ts
 M tests/setupService.ts
 D tests/src/server/OllamaProvider.test.ts
 D tests/src/server/errors.test.ts
 D tests/src/server/factories.test.ts
 D tests/src/server/helpers.test.ts
 D tests/src/server/integration.test.ts
 D tests/src/server/parsers.test.ts
 M tsconfig.json
 M vite.config.ts
?? configs/src/tsconfig.core.json
?? configs/src/vite.core.config.ts
?? src/core/
?? tests/src/core/
```

`git diff --stat`:

```
 README.md                               |   2 +-
 configs/src/tsconfig.server.json        |  18 -
 configs/src/vite.server.config.ts       |  16 -
 guides/README.md                        |  12 +-
 guides/ollama.md                        |  20 +-
 package.json                            |  26 +-
 src/server/OllamaProvider.ts            | 444 -----------------
 src/server/constants.ts                 |  36 --
 src/server/errors.ts                    |  58 ---
 src/server/factories.ts                 |  81 ---
 src/server/helpers.ts                   | 223 ---------
 src/server/index.ts                     |   7 -
 src/server/parsers.ts                   |  28 --
 src/server/types.ts                     | 160 ------
 tests/conformance.test.ts               |   2 +-
 tests/guides.test.ts                    |   4 +-
 tests/service/OllamaProvider.test.ts    |   2 +-
 tests/service/compaction.test.ts        |   2 +-
 tests/service/conversation.test.ts      |   2 +-
 tests/service/factories.test.ts         |   2 +-
 tests/service/scopes.test.ts            |   2 +-
 tests/service/tools.test.ts             |   2 +-
 tests/service/transport.test.ts         |   2 +-
 tests/setupService.ts                   |   2 +-
 tests/src/server/OllamaProvider.test.ts | 808 ------------------------------
 tests/src/server/errors.test.ts         |  34 --
 tests/src/server/factories.test.ts      |  86 ----
 tests/src/server/helpers.test.ts        | 218 --------
 tests/src/server/integration.test.ts    | 859 --------------------------------
 tests/src/server/parsers.test.ts        |  24 -
 tsconfig.json                           |   4 +-
 vite.config.ts                          |  30 +-
 32 files changed, 50 insertions(+), 3166 deletions(-)
```

(`git diff --stat` omits new untracked files — `src/core/`, `tests/src/core/`,
`configs/src/tsconfig.core.json`, `configs/src/vite.core.config.ts` — because they carry no
history against `HEAD` to diff; their content is the unchanged move of the deleted `*/server`
paths, confirmed above by `mv` and by the passing gate chain.)
