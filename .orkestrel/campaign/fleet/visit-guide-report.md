# Unit VISIT-guide report

## Advisory as taken

`npx --no-install scaffold audit`, run first, reported:

```
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep
the declared value unchanged or replace it with the planned value: "test:guides" declares
"vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run
--config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts,
tests/setupServer.ts. Add tests/setup.test.ts, tests/setupServer.test.ts, each covering the
module of the same name. The proof's subject is behavior only this workspace can assert, so
scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

Plus a drift table naming `orchestration`-group `docs` files stale or missing and the
`orkestrel-human-journey`/`.claude/agents/codex.md`/`.codex/agents/claude.toml` paths foreign —
left alone, per the brief.

## Proof files

`tests/setup.test.ts` proves `tests/setup.ts`:

- `TEST_SEED` — two independent `seededRandom(TEST_SEED)` calls agree across draws (the
  determinism contract every seeded suite relies on), and differ from a neighboring seed.
- `requireTable` — returns the leading table with header and row cell text checked against
  literal substrings of the source markdown (a second route from the parse itself), and throws
  `expected a table block` both on a non-table leading block and on an empty document.
- `isBrowserVuePath` — accepts `app/browser/...` under both `/` and `\` separator families,
  refuses a sibling (`app/server/...`) and two prefix lookalikes (`app/browserish/...`,
  `appbrowser/...`).

`tests/setupServer.test.ts` proves `tests/setupServer.ts`:

- `requireText` — reads a present key from a real inventory built by `readInventory` scanning a
  real `createScratch` directory (the file Node actually wrote and scanned, not a hand-built
  record), and throws `Missing file: missing/widget.md` naming the relative path when the key is
  absent.

## Mutation controls

- `tests/setup.test.ts:53` — mutated `['app/browser/components/Widget.vue', true]` to `false`;
  `isBrowserVuePath` case `app/browser/components/Widget.vue -> false` failed
  (`expected true to be false`); restored, `test:setup` green.
- `tests/setupServer.test.ts:18` — mutated the expected read to `'# Widget mutated\n'`; `reads a
  present file from a real inventory built by scanning real files on disk` failed (`expected '#
  Widget\n' to be '# Widget mutated\n'`); restored, `test:setup` green.

## Retained differing values `repair` named

None beyond what the visit order directed. The first `--groups manifest` repair wrote
`test:setup` cleanly (`1 written, 1 unchanged, 0 removed`); the full `repair` then wrote
`vite.config.ts` (project registration for `setup`) and unrelated `orchestration`-group files
already stale before this dispatch, leaving only the off-limits foreign paths drifted.

## Gates, each read bare

- `npm run format:check` — `All matched files use the correct format.`
- `npm run lint:check` — clean exit, no output.
- `npm run check` — `tsc --noEmit --project tsconfig.json && npm run check:src` then
  `check:src:core`, clean exit, no output.
- `npm run build` — `build:src:core` built `dist/src/core/index.js` and `.cjs`, copy step
  reported `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`.
- `npm test` — `test:src` 337 passed, `test:policy` 93 passed, `test:config` 46 passed,
  `test:setup` 12 passed, `test:guides` 27 passed.

## Exit audit

`npx --no-install scaffold audit` at exit reports no `setup:` advisory. Remaining advisories: the
fleet-wide `dependencies: typescript declares major 6` (out of scope per the brief) and the
off-limits foreign/orchestration drift rows (the Orchestrator's to resolve at commit).

No commit made.
