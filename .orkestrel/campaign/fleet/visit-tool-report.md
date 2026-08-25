# Unit VISIT-tool report

## Advisory as taken

`npx --no-install scaffold audit`, run first, reported:

```
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the
declared value unchanged or replace it with the planned value: "test:guides" declares
"vitest run --config vite.config.ts --reporter=dot --project guides"; planned
"vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add
tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so
scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

`tests/setup.ts` was the only reported module: `createToolCall` and `isBrowserVuePath`.

## Proof file

`tests/setup.test.ts` (new), collected by the `setup` project:

- `describe('createToolCall')`
  - `defaults the arguments record to empty and the id to call` — asserts the object `createToolCall('echo')` returns against a hand-built expectation, proving the defaulting contract.
  - `carries the supplied arguments and correlation id through unchanged` — asserts the same call with all three parameters supplied returns them unchanged.
- `describe('isBrowserVuePath')`
  - `accepts a repository-relative path under app/browser/ under either separator family` — proves `app/browser/...` and `app\browser\...` both resolve `true`, deriving the expected value by an independent segment-split check (not the module's own replace-then-`startsWith` route) before asserting the module's return.
  - `refuses a sibling application path and a prefix lookalike` — proves `app/server/...` (sibling) and `app/browserish/...` (prefix lookalike) both resolve `false`.

## Mutation controls

One control per proof file (one proof file total):

- `tests/setup.test.ts`: changed the `defaults the arguments record to empty and the id to call`
  case's expectation from `arguments: {}` to `arguments: { broken: true }`. Re-run:
  `FAIL |setup| tests/setup.test.ts > createToolCall > defaults the arguments record to empty and
  the id to call` — `AssertionError: expected { id: 'call', name: 'echo', …(1) } to deeply equal {
  id: 'call', name: 'echo', …(1) }`. Restored; the project reports `4 passed (4)` again.

## test:guides adopted

Set through `npm pkg set` to the planned value:
`vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`.

## test chain forced by the blocked configs group

`npx --no-install scaffold repair --groups manifest` wrote `test:setup`:
`vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`. Adopted the `test`
chain through `npm pkg set`, inserting `test:setup` between `test:config` and `test:guides`:
`npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run
test:guides`.

## Retained differing values

The full `npx --no-install scaffold repair` run reported no other retained differing script value;
the only remaining table rows are the seven foreign `orkestrel-human-journey`/`codex.md`/
`claude.toml` paths named in the brief as the Orchestrator's to remove at commit, left untouched.
`vite.config.ts` was regenerated (11 lines added) as part of the same repair, per the brief's owned
files.

## Gate closing lines

- `npm run format:check` → `All matched files use the correct format.` (137 files)
- `npm run lint:check` → clean exit, no diagnostics printed.
- `npm run check` → clean exit (`tsc --noEmit` for the root and `configs/src/tsconfig.core.json`
  projects, no diagnostics).
- `npm run build` → `dist/src/core/index.js` and `.cjs` built; `Copied: dist/src/core/index.d.ts to
  dist/src/core/index.d.cts`.
- `npm test` → `test:src` 48 passed (4 files), `test:policy` 93 passed (1 file), `test:config` 46
  passed (1 file), `test:setup` 4 passed (1 file), `test:guides` 23 passed (1 file).

## Post-state audit

`npx --no-install scaffold audit` after the visit reports no `setup:` advisory and no `scripts:`
advisory. The remaining lines are the out-of-scope `dependencies: typescript declares major 6`
advisory and the seven foreign paths named above.

## Deviations

None. No git commit was made.
