---
paths:
  - 'src/**/*'
  - 'app/**/*'
  - 'tests/**/*'
  - 'configs/**/*'
  - 'demo/**/*'
  - 'package.json'
  - 'tsconfig.json'
  - 'vite.config.ts'
---

# Workspace, environments, builds, and scripts

Use only the surfaces a project needs, but preserve this dependency model.

## Surfaces

| Path           | Purpose                                            |
| -------------- | -------------------------------------------------- |
| `src/core/`    | Published host-independent library                 |
| `src/browser/` | Published browser-only library                     |
| `src/server/`  | Published Node-only library                        |
| `src/styles/`  | Optional SCSS bundle producing `index.css`         |
| `app/core/`    | Shared application logic with an `index.ts` barrel |
| `app/browser/` | Browser app; `main.ts` entry, not a barrel         |
| `app/server/`  | Node server app; `main.ts` entry                   |
| `tests/`       | Mirrors source/application surfaces                |
| `configs/`     | Thin target wrappers around root configs           |

- Browser/server import core; core imports neither.
- Application surfaces import library surfaces.
- Typical browser-app domains: `components/`, `pages/`, `composables.ts`, `controllers/`, `services/`, `stores/`.
- Typical server-app domains: `handlers/`, `middlewares.ts`, `routes.ts`.
- `src/styles/index.ts` is a side-effect entry importing `./index.scss`.

## Aliases

| Alias          | Target                 |
| -------------- | ---------------------- |
| `@src/core`    | `src/core/index.ts`    |
| `@src/browser` | `src/browser/index.ts` |
| `@src/server`  | `src/server/index.ts`  |
| `@src/styles`  | `src/styles/index.ts`  |
| `@app/core`    | `app/core/index.ts`    |
| `@app/browser` | `app/browser/index.ts` |
| `@app/server`  | `app/server/index.ts`  |

Define aliases in `tsconfig.json` first. `vite.config.ts` derives from `compilerOptions.paths`; keep both aligned.

## Configuration authority

- `tsconfig.json`: shared compiler options, all-tree types, and path aliases.
- `vite.config.ts`: shared builds, test projects, environment loading/mapping, and aliases.
- `*/types.ts`: public API contracts.
- `configs/src/`, `configs/app/`, and optional `configs/bin/`: thin per-target wrappers. Shared logic remains in root configs.

Environment rules:

- `vite.config.ts` owns environment loading/mapping.
- Add shared variables there first.
- Prefer a minimal plain set such as `APP_NAME`, `APP_API_PATH`, `APP_HOST`, `APP_PORT`.
- Expose extra browser runtime values only for a concrete need.

## Build outputs

| Output             | Content                       | Format         |
| ------------------ | ----------------------------- | -------------- |
| `dist/src/core`    | Core library                  | CJS            |
| `dist/src/browser` | Browser library               | ES             |
| `dist/src/server`  | Server library                | CJS            |
| `dist/src/styles`  | Compiled `index.css`          | ES wrapper     |
| `dist/app/browser` | Browser application           | target-defined |
| `dist/app/server`  | Server application            | CJS            |
| `dist/showcase`    | Single-file `index.html` demo | self-contained |

- Library declarations are emitted by `tsc` through `configs/src/tsconfig.{core,browser,server}.json`, chained after each Vite build.
- Styles ship CSS, not declarations.
- Optional `appShowcase` uses `configs/app/vite.showcase.config.ts` and `vite-plugin-singlefile` to create a minified file-URL-safe `dist/showcase/index.html`.
- The showcase is outside the default build.
- Use Oxc for showcase JS minification and Lightning CSS for CSS.
- Inject a `build-id` meta stamp so rebuilt `file://` demos cache-bust.

## Test project matrix

`vite.config.ts` defines one Vitest project per surface × environment:

| Project       | Files                  | Environment         | Setup                                           |
| ------------- | ---------------------- | ------------------- | ----------------------------------------------- |
| `src:core`    | `tests/src/core/**`    | Node                | `setup.ts`                                      |
| `src:browser` | `tests/src/browser/**` | Playwright Chromium | `setup.ts`, `setupBrowser.ts`                   |
| `src:server`  | `tests/src/server/**`  | Node                | `setup.ts`, `setupServer.ts`                    |
| `src:styles`  | `tests/src/styles/**`  | Playwright Chromium | `setup.ts`, `setupBrowser.ts`, `setupStyles.ts` |
| `app:core`    | `tests/app/core/**`    | Node                | `setup.ts`                                      |
| `app:browser` | `tests/app/browser/**` | Playwright Chromium | `setup.ts`, `setupBrowser.ts`                   |
| `app:server`  | `tests/app/server/**`  | Node                | `setup.ts`, `setupServer.ts`                    |

Setup assets:

- `tests/setup.css` declares cascade-layer order before `@import 'tailwindcss'` and its `@source`.
- Browser setup wires `setup.css`.
- Styles setup loads `setup.css` and the compiled cascade.

Scope with `test:src`, `test:src:core`, `test:app`, `test:app:server`, and equivalent scripts.

## Typechecking and environment isolation

`npm run check` is one comprehensive root pass:

```text
vue-tsc --noEmit --project tsconfig.json
```

It checks the whole tree—source, app, tests, configs, and root Vite config—and provides IDE parity. It does **not** call scoped checks. Lint remains a separate complementary gate.

The on-demand `check:<scope>` family mirrors test projects and proves environment isolation:

- `check:src` → `check:src:{core,browser,server,styles}`.
- `check:app` → `check:app:{core,browser,server}`.
- Run one granular scope or the aggregate needed for the change.

Use plain `tsc` for every pure-TS scope. Use `vue-tsc` only for the whole-tree pass and `check:app:browser`, where `.vue` internals must be checked. Plain `tsc` sees the Vue shim but not SFC template/`<script setup>` internals.

| Scope                        | `lib`                             | `types`           | Permitted host globals                              |
| ---------------------------- | --------------------------------- | ----------------- | --------------------------------------------------- |
| `src:core`, `app:core`       | `["ESNext"]`                      | `[]`              | None: no DOM, Node, host crypto, console, or timers |
| `src:browser`, `app:browser` | `["ESNext","DOM","DOM.Iterable"]` | default           | DOM; no Node                                        |
| `src:server`, `app:server`   | `["ESNext"]`                      | `["node"]`        | Node; no DOM                                        |
| `src:styles`                 | `["ESNext"]`                      | `["vite/client"]` | Vite SCSS module declaration only                   |

Strict core is load-bearing. A host-dependent helper belongs in its host surface; for example, a `generateId` using host `crypto` belongs in server, not core.

Build/check config alignment:

- `configs/src/tsconfig.{core,browser,server}.json` serves emit and scoped checking.
- `configs/src/tsconfig.styles.json` is check-only.
- `configs/app/tsconfig.core.json` is check-only.
- `configs/app/tsconfig.{browser,server}.json` is check-only.
- Root `tsconfig.json` keeps all libs/types for IDE and comprehensive checking; scoped configs tighten each environment.

## Script intent

| Script                  | Contract                                                          |
| ----------------------- | ----------------------------------------------------------------- |
| `dev`                   | Browser development entry                                         |
| `build`                 | Build configured library/application targets                      |
| `serve` / `serve:build` | Run built server / build then run                                 |
| `showcase`              | Showcase dev server                                               |
| `build:showcase`        | Build `dist/showcase`                                             |
| `show`                  | Build and copy showcase to `demo/showcase.html`                   |
| `lint`                  | `oxlint --config .oxlintrc.json --fix .`; separate from typecheck |
| `check`                 | Comprehensive root `vue-tsc` pass                                 |
| `check:<scope>`         | On-demand environment-isolation pass                              |
| `format`                | Format all files                                                  |
| `clean`                 | Remove `dist/`                                                    |
| `copy <from> <to>`      | Copy while creating parent directories                            |
| `tmp:txt`               | Rename non-Markdown files in `tmp/` to `.txt`                     |
| `prepublishOnly`        | Full `format → lint → check → build → test` sequence              |

Run `show` only **after** formatting. The committed `demo/showcase.html` is generated/minified; formatting after generation would expand its inlined bundle.

## Tooling

- Typechecker: `vue-tsc` only where Vue SFCs are checked; `tsc` elsewhere.
- Linter: Oxlint with `.oxlintrc.json`, independent from typechecking.
- Formatter: Oxfmt with `.oxfmtrc.json`.
- Bundler: Vite.
- Tests: Vitest; `@vitest/browser-playwright` for browser projects.
- Node build target: Node 24 for core/server.
- Browser framework: Vue 3 when present.
