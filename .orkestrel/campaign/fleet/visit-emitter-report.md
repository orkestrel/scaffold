# Unit VISIT-emitter — report

## Advisory taken at start

```
scripts: The manifest at . declares a planned script with a differing value: test:guides.
  Keep the declared value unchanged or replace it with the planned value:
  "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides";
  planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts.
  Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace
  can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

Only `tests/setup.ts` was named for a proof; its only export is `isBrowserVuePath`.

## Proof file

`tests/setup.test.ts` proves `isBrowserVuePath` exported from `tests/setup.ts`:

- accepts a repository-relative browser Vue path with the forward-slash and backslash separator
  families (`app/browser/component.vue`, `app\browser\component.vue`);
- refuses a sibling environment (`app/server/component.vue`) and a prefix lookalike that shares
  the `app/browser` prefix without the trailing separator (`app/browserish/component.vue`).

The module's `afterEach(vi.restoreAllMocks)` hook is a side effect, not an export, so it carries
no separate case under the fixed proof shape.

## Mutation control

One control per proof file, run and restored:

- `tests/setup.test.ts`: changed the first accepting case's input from
  `'app/browser/component.vue'` to `'app/server/component.vue'`. The case failed at
  `tests/setup.test.ts:6:56` — `AssertionError: expected false to be true`. Reverted, then
  reran the `setup` project green (2 passed).

## Visit order followed

1. Wrote `tests/setup.test.ts`.
2. Adopted the planned `test:guides` value through `npm pkg set`:
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`.
3. Ran `npx --no-install scaffold repair`; it blocked the `configs` group because the declared
   `test` chain did not invoke the `setup` project (`test:setup` was not yet declared).
4. Ran `npx --no-install scaffold repair --groups manifest`, which wrote `test:setup`:
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`.
5. Adopted the `test` chain through `npm pkg set`, placing `test:setup` between `test:config` and
   `test:guides`:
   `npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides`.
6. Ran the full `npx --no-install scaffold repair` clean. It regenerated `vite.config.ts` (added
   a `setup` project, `include: ['tests/setup*.test.ts']`, `environment: 'node'`,
   `browser: { enabled: false }`) and 48 further orchestration/agent files carrying the re-pin's
   downstream doc/skill/agent drift, unrelated to this unit's owned files. It reported the
   `.agents/skills/orkestrel-human-journey/**`, `.claude/agents/codex.md`,
   `.claude/skills/orkestrel-human-journey/SKILL.md`, and `.codex/agents/claude.toml` paths as
   `foreign`, per the standing condition, and left them alone. No retained differing script value
   beyond `test:guides` and the `test` chain was named.
7. Ran `npm run format`.

## Post-visit audit

`npx --no-install scaffold audit` reports no `setup:` advisory. The only remaining advisory is
`dependencies: typescript declares major 6, while the registry serves major 7`, named fleet-wide
and out of scope. The path table lists only the same `foreign` paths under the retired
`orkestrel-human-journey` name plus `.claude/agents/codex.md` and `.codex/agents/claude.toml`,
left alone per the standing condition.

## Gates, each read bare

- `npm run format:check` — `All matched files use the correct format. Finished in 6169ms on 135
  files using 4 threads.`
- `npm run lint:check` — exit clean, no output beyond the script header.
- `npm run check` — `tsc --noEmit --project tsconfig.json && npm run check:src` and
  `tsc --noEmit -p configs/src/tsconfig.core.json` both exit clean, no diagnostics.
- `npm run build` — `dist/src/core/index.js` and `dist/src/core/index.cjs` built; declaration
  files bundled; `dist/src/core/index.d.cts` copied.
- `npm test` — `test:src` 3 files / 42 tests passed, `test:policy` 1 file / 93 tests passed,
  `test:config` 1 file / 46 tests passed, `test:setup` 1 file / 2 tests passed, `test:guides` 1
  file / 18 tests passed.

## Scope note

`package.json` and `package-lock.json` arrived dirty from the 0.0.52 re-pin per the brief; this
unit's own edits to `package.json` are the `test:guides` value and the `test` chain. No commit was
made.
