# Unit VISIT-timeout — report

## Advisory taken at start

`npx --no-install scaffold audit` reported:

```
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

Plus a foreign/orchestration drift table (out of scope per brief: the Orchestrator removes the
retired `orkestrel-human-journey` paths, `.claude/agents/codex.md`, and `.codex/agents/claude.toml`
at commit). The `dependencies: typescript declares major 6` advisory is fleet-wide and out of
scope.

The `setup:` advisory named exactly one reported module: `tests/setup.ts`.

## Proof file

`tests/setup.test.ts` proves `isBrowserVuePath` from `tests/setup.ts`:

- **Accepts** a repository-relative browser application path under each separator family
  (`/`, `\`, and mixed), deriving the expected membership by a second route — splitting the path
  on either separator and checking the leading two segments equal `['app', 'browser']` — rather
  than re-deriving through the module's own `startsWith` check.
- **Refuses** a sibling application path (`app/server/routes.ts`), a prefix lookalike
  (`app/browserish/Component.vue`), and an unrelated environment path (`src/browser/index.ts`),
  by the same second-route segment check.

## Mutation control

One control per proof file (one proof file total).

- File: `tests/setup.test.ts`. Mutation: flipped the accepting case's expectation from
  `toBe(true)` to `toBe(false)`. Failing line:

  ```
  FAIL  |setup| tests/setup.test.ts > isBrowserVuePath > accepts a repository-relative browser application path under each separator family
  AssertionError: expected true to be false // Object.is equality
   ❯ tests/setup.test.ts:16:35
  ```

- Restored, confirmed green: `Test Files  1 passed (1)`, `Tests  2 passed (2)`.

## `test:guides` adopted

Set through `npm pkg set` to the planned value:
`vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`.

## Visit order and repair

1. `npx --no-install scaffold repair --groups manifest` wrote `test:setup`:
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`.
2. Adopted the `test` chain through `npm pkg set`, placing `test:setup` between `test:config` and
   `test:guides`:
   `npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides`.
3. Full `npx --no-install scaffold repair` ran clean: `0 of 126 planned paths drifted from the
   plan`, `49 written, 78 unchanged, 0 removed`. `vite.config.ts` gained 11 lines (the `setup`
   Vitest project registration). Only the seven foreign orchestration paths remained flagged —
   left alone per the brief.
4. `npm run format` ran after repair: `Finished in 4155ms on 138 files using 4 threads.`

**Retained differing values repair named beyond `test:guides` / the `test` chain:** none — the
post-repair `scaffold audit` reported no further `scripts:` advisory.

## Gates, each read bare

- `npm run format:check` → `All matched files use the correct format.`
- `npm run lint:check` → clean exit, no output.
- `npm run check` → `tsc --noEmit --project tsconfig.json && npm run check:src` then
  `check:src:core` (`tsc --noEmit -p configs/src/tsconfig.core.json`), no output, clean exit.
- `npm run build` → `build:src:core` succeeded: `dist/src/core/index.js`, `dist/src/core/index.cjs`,
  declarations bundled, `✓ built in 3.55s`.
- `npm test` → `test:src` 4 files/61 tests passed; `test:policy` 1 file/93 tests passed;
  `test:config` 1 file/46 tests passed; `test:setup` 1 file/2 tests passed; `test:guides` 1
  file/18 tests passed.

## Final `scaffold audit`

No `setup:` advisory. Remaining lines: `dependencies: typescript declares major 6` (fleet-wide,
out of scope) and the seven foreign orchestration paths (Orchestrator's to remove at commit).

## Scope note

`package.json` and `package-lock.json` arrived dirty from the pre-dispatch 0.0.52 re-pin, kept
unchanged in content by this unit beyond the `test:guides`/`test` script edits. Every other
modified/untracked path is a `repair`-regenerated vendored file under the brief's owned scope
(`vite.config.ts` and files `repair` regenerates). No file under `src/**`, `guides/**`,
`tests/setup*.ts`, or any other test file was touched.
