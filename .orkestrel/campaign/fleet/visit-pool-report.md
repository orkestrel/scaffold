# Unit VISIT-pool report

## Advisory as taken

`npx --no-install scaffold audit`, run first:

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

Plus the drift table: 48 of 126 planned paths drifted (`docs`/`orchestration` group staleness
and the retired `orkestrel-human-journey` foreign paths plus `.claude/agents/codex.md` and
`.codex/agents/claude.toml`), all resolved by `repair` except the named foreign paths, which are
the Orchestrator's to remove.

Only one `setup:` proof module was reported: `tests/setup.ts`, exporting `PoolEvent` and
`POOL_EVENTS`.

## Proof file

`tests/setup.test.ts` — proves `POOL_EVENTS` (the data table exported from `tests/setup.ts`):

- **is frozen** — `Object.isFrozen(POOL_EVENTS)` is `true`, so a consumer cannot mutate the
  shared table.
- **carries no duplicate event name** — `new Set(POOL_EVENTS).size` equals `POOL_EVENTS.length`.
- **covers exactly the lifecycle events a Pool emitter recorder must bind** — derived by a second
  route: a locally built `emittedPayloads` literal, typed against `PoolEventMap`'s emitted
  payload shape (`readonly []` per event) rather than against `PoolEvent` itself, whose keys are
  compared (sorted) against `POOL_EVENTS` (sorted). The comment in the proof states this second
  route explicitly, so the membership check does not read `POOL_EVENTS` back through the type it
  proves.

No `setupBrowser`, `setupServer`, or `setupService` module was reported, so no browser/service
split note was needed.

## Mutation control

One control per proof file:

`tests/setup.test.ts` — removed `destroy` from the `emittedPayloads` second-route literal. The
suite failed at `tests/setup.test.ts:23:35`:

```
FAIL  |setup| tests/setup.test.ts > POOL_EVENTS > covers exactly the lifecycle events a Pool
emitter recorder must bind, derived independently from the emitted payload shape
AssertionError: expected [ Array(4) ] to deeply equal [ 'acquire', 'create', 'release' ]
```

Restored `destroy: []`, re-ran `oxfmt --write` on the file to reformat after the manual edit
cycle, and confirmed `test:setup` green again (3 tests passed).

## Visit order taken

1. Wrote `tests/setup.test.ts`.
2. Adopted `test:guides` to the planned value carrying `--no-cache`:
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`.
3. Ran `npx --no-install scaffold repair`; it blocked the `configs` group because the `test`
   chain did not invoke the `setup` project (`test:setup` was already declared but unused).
4. Ran `npx --no-install scaffold repair --groups manifest`, which wrote nothing new (`test:setup`
   already present; 1 unchanged).
5. Adopted the `test` chain through `npm pkg set`, inserting `test:setup` between `test:config`
   and `test:guides`:
   `npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides`.
6. Ran the full `npx --no-install scaffold repair` clean: `vite.config.ts` regenerated to add the
   `setup` Vitest project (`include: ['tests/setup*.test.ts']`), plus 48 orchestration/docs-group
   files brought into plan compliance; the 7 foreign `orkestrel-human-journey` and `codex`/`claude`
   agent paths remain, left alone per the standing condition.
7. Ran `npm run format`, which reformatted only `tests/setup.test.ts` (the file this unit wrote).

## Retained differing values

`repair` reported no retained differing script values beyond `test:guides` and the `test` chain,
both of which this unit adopted. No other script was retained differing.

## Gates, each read bare

- `npm run format:check` → `All matched files use the correct format.` (135 files)
- `npm run lint:check` → clean exit, no output.
- `npm run check` → `tsc --noEmit --project tsconfig.json` then `check:src:core` clean exit, no
  output.
- `npm run build` → `✓ built in 1.73s`; declaration bundling and `.cjs`/`.d.cts` copy completed.
- `npm test` → `test:src` 41 passed (2 files), `test:policy` 93 passed, `test:config` 46 passed,
  `test:setup` 3 passed, `test:guides` 13 passed. All green.

## Final audit state

`npx --no-install scaffold audit` at exit reports no `setup:` advisory and no `scripts:`
advisory. Remaining advisories: `dependencies: typescript declares major 6` (fleet-wide, out of
scope per brief) and the 7 foreign orchestration paths (Orchestrator's to remove at commit).
