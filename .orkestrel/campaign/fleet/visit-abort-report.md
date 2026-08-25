# Unit VISIT-abort — report

## Advisory taken

`npx --no-install scaffold audit`, at start, reported:

```
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep
the declared value unchanged or replace it with the planned value: "test:guides" declares
"vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run
--config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add
tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert,
so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The `dependencies` advisory is fleet-wide and out of scope per the brief. The manifest-drift table
listed only foreign paths under the retired `orkestrel-human-journey` name plus
`.claude/agents/codex.md` and `.codex/agents/claude.toml`, left alone per the brief.

## Proof file

`tests/setup.test.ts` covers the sole export of `tests/setup.ts`, `isBrowserVuePath`:

- one accepting case asserting `true` on `app/browser/components/Widget.vue` (forward-slash
  separator) and `app\browser\components\Widget.vue` (backslash separator);
- one refusing case asserting `false` on the sibling environment path
  `app/server/components/Widget.vue` and the prefix lookalike `app/browserish/components/Widget.vue`.

No production behavior beyond the exported contract is re-proven; expected values are the
literal booleans the path membership requires, derived independently of the module's own logic.

## Mutation control

Per-file control: changed the sibling-path expectation in the refusing case from `false` to
`true`, ran `npm run test:setup`, observed the failure, then restored it.

Failing line observed:

```
FAIL  |setup| tests/setup.test.ts > isBrowserVuePath > refuses a sibling environment path and a
prefix lookalike
AssertionError: expected false to be true // Object.is equality
 ❯ tests/setup.test.ts:11:64
```

Restored; `npm run test:setup` reads `Tests  2 passed (2)` afterward.

## `test:guides` adoption

`npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot
--project guides'` — adopts the planned value carrying `--no-cache`.

## `repair` visit

1. `npx --no-install scaffold repair --groups manifest` wrote `test:setup` (blocked `configs`
   group, as expected): `1 written, 1 unchanged, 0 removed`.
2. `npm pkg get scripts.test:setup` confirmed the written value:
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`.
3. Adopted the planned `test` chain, placing `test:setup` between `test:config` and
   `test:guides`, through `npm pkg set`:
   `npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm
   run test:guides`.
4. Full `npx --no-install scaffold repair` then ran clean: `49 written, 78 unchanged, 0 removed`,
   including `vite.config.ts` (11 lines added — the `setup` project). No retained differing
   script values were named; the closing manifest table listed only the foreign
   `orkestrel-human-journey` paths and `.claude/agents/codex.md` /
   `.codex/agents/claude.toml`, left alone per the brief.
5. `npm run format` ran clean afterward (137 files).

## Gates, each read bare

- `npm run format:check`: `All matched files use the correct format. Finished in 4882ms on 137
  files using 4 threads.`
- `npm run lint:check`: exits with no output, no violations.
- `npm run check`: `tsc --noEmit` for the root config and `check:src:core` both exit clean, no
  diagnostics.
- `npm run build`: `build:src:core` builds `dist/src/core/index.js` and `index.cjs`, `✓ built in
  2.33s`.
- `npm test`: every project passes —
  `src:core` `Tests 51 passed (51)`, `policy` `Tests 93 passed (93)`, `config` `Tests 46 passed
  (46)`, `setup` `Tests 2 passed (2)`, `guides` `Tests 18 passed (18)`.

## Post-audit

`npx --no-install scaffold audit` at exit reports no `setup:` advisory. Remaining lines are the
out-of-scope `dependencies: typescript declares major 6` advisory and the unchanged foreign-path
table.

## Deviations

None.
