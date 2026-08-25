# Unit VISIT-template report

## Advisory taken at start

```
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the
declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run
--config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config
vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add
tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert,
so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

Plus the `manifest` drift table naming the retired `orkestrel-human-journey` paths and
`.claude/agents/codex.md` / `.codex/agents/claude.toml`, all `foreign`. The `dependencies` advisory
and the foreign paths are out of scope per the brief.

## Proof file

`tests/setup.test.ts` proves the sole export of `tests/setup.ts`, `isBrowserVuePath`:

- One accepting case: a real browser path under both the forward-slash and backslash separator
  families (`app/browser/components/Widget.vue`, `app\browser\components\Widget.vue`).
- One refusing case: a sibling environment (`app/server/...`) and a prefix lookalike
  (`app/browserish/...`).

Mutation control: flipped the first accepting assertion's expectation from `true` to `false`,
re-ran `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`, and
observed the failing line:

```
FAIL  |setup| tests/setup.test.ts > isBrowserVuePath > accepts a browser Vue SFC path under every
separator family
AssertionError: expected true to be false // Object.is equality
 ❯ tests/setup.test.ts:6:65
```

Restored the file to its proving state before continuing.

## test:guides adoption

`npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot
--project guides'` — adopted the planned value carrying `--no-cache`.

## Repair sequence

`npx --no-install scaffold repair` first run blocked the `configs` group: the manifest did not
reach the `setup` Vitest project from `test` or `prepublishOnly`, and named `test:setup` as
already declared once written.

Ran `npx --no-install scaffold repair --groups manifest` — wrote `test:setup:
"vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"`.

Adopted the planned `test` chain, placing `test:setup` between `test:config` and `test:guides`,
through `npm pkg set 'scripts.test=npm run test:src && npm run test:policy && npm run test:config
&& npm run test:setup && npm run test:guides'`.

Ran the full `npx --no-install scaffold repair` clean: `49 written, 78 unchanged, 0 removed`,
including `vite.config.ts` (11 lines added — registers the `setup` project) and the fleet's
vendored `orchestration`-group files (`CLAUDE.md`, `.agents/orchestration.md`, agent role files
under `.claude/agents/` and `.codex/agents/`, and skill files). No differing script values were
retained beyond the adopted `test:guides` value and the `test` chain.

Ran `npm run format` after repair: `Finished in 6575ms on 140 files using 4 threads.`

## Gates, each read bare

- `npm run format:check` — `All matched files use the correct format. Finished in 4320ms on 140
  files using 4 threads.`
- `npm run lint:check` — exit 0, no output beyond the command echo.
- `npm run check` — exit 0 (`tsc --noEmit --project tsconfig.json` then
  `tsc --noEmit -p configs/src/tsconfig.core.json`, both silent/clean).
- `npm run build` — exit 0; `dist/src/core/index.js` and `.cjs` built, declaration files
  generated. A build-time notice reports the bundled API Extractor's TypeScript engine (5.9.3) is
  older than the project's declared TypeScript (6.0.3) — the fleet-wide advisory named out of
  scope.
- `npm test` — exit 0:
  - `test:src` — `4 passed (4)`, `116 passed (116)`.
  - `test:policy` — `1 passed (1)`, `93 passed (93)`.
  - `test:config` — `1 passed (1)`, `46 passed (46)`.
  - `test:setup` — `1 passed (1)`, `2 passed (2)`.
  - `test:guides` — `1 passed (1)`, `23 passed (23)`.

## Audit at exit

`npx --no-install scaffold audit` reports no `setup:` advisory and no `scripts:` advisory. Only the
out-of-scope `dependencies: typescript declares major 6` advisory and the `foreign`-marked retired
`orkestrel-human-journey` paths plus `.claude/agents/codex.md` and `.codex/agents/claude.toml`
remain, left alone per the brief's standing conditions.

No git state changes; no commit made.
