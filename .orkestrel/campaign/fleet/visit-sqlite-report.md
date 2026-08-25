# Unit VISIT-sqlite — report

## Advisory taken at start

```
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts,
tests/setupServer.ts. Add tests/setup.test.ts, tests/setupServer.test.ts, each covering the
module of the same name. The proof's subject is behavior only this workspace can assert, so
scaffold does not write it.
```

Plus a `scripts:` advisory on `test:guides` (adopted) and a fleet-wide `dependencies: typescript
declares major 6` advisory (out of scope per the brief).

## Deviation — `tests/setup.ts` carries no export

**Expected.** One proof file per reported module: `tests/setup.test.ts` covering
`tests/setup.ts`.

**Found.** `tests/setup.ts` is six lines of comment only:

```ts
// Base test setup — environment-agnostic helpers loaded first by every
// Vitest project (`setupFiles[0]`). Keep this file free of `node:*` and of
// `document` / `window`: node-only helpers live in `setupServer.ts`.
//
// The fleet-wide `captureError` helper lives in `@orkestrel/test`. What remains
// here is what is specific to this package.
```

`grep -n "export" tests/setup.ts` returns no match. There is no exported behavior for a proof to
assert.

**Done / not done.** `tests/setupServer.test.ts` is written, proving `sqliteErrorCode`, and the
target's gates are green including the `setup` project it registers. `tests/setup.test.ts` is
not written; writing one would produce a census with no asserted contract, which the brief's
fixed proof shape refuses. `npx --no-install scaffold audit` therefore still reports the
`setup:` advisory for `tests/setup.ts` alone at exit — acceptance criterion 1 is not met for
that one module.

**Hypothesis.** `tests/setup.ts` is a placeholder awaiting its first host-independent helper; the
advisory closes when that helper lands and needs a proof of its own.

## Proof file

`tests/setupServer.test.ts` — proves `sqliteErrorCode(action)` from `tests/setupServer.ts`
against a real `SQLiteError` imported from `@src/server` (no stub of the module under test):

- Returns the thrown `SQLiteError`'s own `code`, asserted against an independently declared
  `'CONSTRAINT'` literal rather than a value the helper itself produced.
- Returns `'NOT_SQLITE_ERROR'` for a thrown `TypeError` (a real non-`SQLiteError` throw).
- Returns `'NO_THROW'` when `action` does not throw.

The module is Node-only server test infrastructure with no browser or service half, so the
comment in the proof states the contract is proven in full rather than split across projects.

## Mutation control

One control per proof file, run and restored:

- `tests/setupServer.test.ts`: changed the `NOT_SQLITE_ERROR` case's expectation to `'CONSTRAINT'`
  in place, ran `npm run test:setup`, and read the failing line:

  ```
  FAIL  |setup| tests/setupServer.test.ts > sqliteErrorCode > returns NOT_SQLITE_ERROR for a
  thrown value that is not a SQLiteError
  AssertionError: expected 'NOT_SQLITE_ERROR' to be 'CONSTRAINT'
   ❯ tests/setupServer.test.ts:25:5
  ```

  Restored the file from a backup copy and reran `npm run test:setup`: `3 passed (3)`.

## Visit order taken

1. Wrote `tests/setupServer.test.ts` (no `tests/setup.test.ts`; see deviation).
2. `npm pkg set "scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot --project guides"` — adopted the planned value.
3. `npx --no-install scaffold repair --groups manifest` — wrote `test:setup` (the `configs` group
   blocked as the brief predicted, because the declared `test` chain did not invoke the `setup`
   project).
4. `npm pkg set "scripts.test=npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides"` — adopted the planned `test` chain, `test:setup` between `test:config` and `test:guides`.
5. `npx --no-install scaffold repair` (full, clean) — wrote `vite.config.ts` (added the `setup`
   project, `11` lines) plus the orchestration-group paths the plan already owns; the drift table
   at exit names only the seven foreign `orkestrel-human-journey`/`codex` paths the Orchestrator
   removes at commit, left alone here.
6. `npm run format`.

## Retained differing values `repair` named

None beyond the two the brief names as adopted (`test:guides`, the `test` chain). The full
`repair` run's drift table lists no further `scripts:` entries; it lists only the seven foreign
orchestration paths, out of scope per the brief.

## Gates, each read bare

- `npm run format:check` → `All matched files use the correct format.` (`140` files)
- `npm run lint:check` → exits clean, no output.
- `npm run check` → `tsc --noEmit --project tsconfig.json && npm run check:src` chain exits clean
  through `check:src:server`.
- `npm run build` → `build:src:server` succeeds; `vite build` reports `✓ built in 3.94s`, declarations
  bundled, `.cjs` copy made.
- `npm test` → `test:src` `Test Files 4 passed (4)`, `Tests 51 passed (51)`; `test:policy` `1
  passed (1)`, `93 passed (93)`; `test:config` `1 passed (1)`, `46 passed (46)`; `test:setup`
  `1 passed (1)`, `3 passed (3)`; `test:guides` `1 passed (1)`, `23 passed (23)`.

## Acceptance criteria

1. **Not met.** `npx --no-install scaffold audit` still reports the `setup:` advisory for
   `tests/setup.ts` at exit, per the deviation above. It no longer reports `tests/setupServer.ts`.
2. **Met.** Every gate in the list closes green, each read bare (preceding section).
3. **Met.** One mutation-control failing line reported for `tests/setupServer.test.ts`, restored.
   No control for `tests/setup.test.ts` because that file was not written.

## Ruling adopted — the export-free module's proof

The Orchestrator accepted the deviation and ruled that `tests/setup.ts`'s emptiness is itself the
behavior the workspace relies on: every Vitest project loads it first as `setupFiles[0]`, and
loading it must add nothing, so a helper landing there by accident would leak into the host-free
`src:core`/`app:core` projects. `tests/setup.test.ts` proves that one case.

`tests/setup.test.ts` imports `tests/setup.ts` as a namespace and asserts `Object.keys(setup)`
equals `[]`, with a comment stating the module is deliberately export-free and that this case
pins the empty-load contract. `describe`, `it`, and `expect` stay in the proof file alone.

**Mutation control.** Changed the expectation to `['helper']`, ran `npm run test:setup`, and read
the failing line:

```
FAIL  |setup| tests/setup.test.ts > setup > adds no export
AssertionError: expected [] to deeply equal [ 'helper' ]
 ❯ tests/setup.test.ts:11:30
```

Restored the file from a backup copy and reran `npm run test:setup`: `Test Files 2 passed (2)`,
`Tests 4 passed (4)`.

**Audit re-run.** `npx --no-install scaffold audit` no longer reports a `setup:` advisory. The
remaining advisory is the fleet-wide `dependencies: typescript declares major 6`, out of scope
per the brief, and the drift table lists only the seven foreign `orkestrel-human-journey`/`codex`
paths the Orchestrator removes at commit.

**Gates touched by the new file, each read bare.**

- `npm run format:check` → `All matched files use the correct format.` (`141` files)
- `npm run lint:check` → exits clean, no output.
- `npm run check` → `tsc --noEmit --project tsconfig.json && npm run check:src` chain exits clean
  through `check:src:server`.
- `npm run test:setup` → `Test Files 2 passed (2)`, `Tests 4 passed (4)`.
- `npm test` (full) → `test:src` `4 passed (4)` files, `51 passed (51)` tests; `test:policy`
  `1 passed (1)`, `93 passed (93)`; `test:config` `1 passed (1)`, `46 passed (46)`; `test:setup`
  `2 passed (2)`, `4 passed (4)`; `test:guides` `1 passed (1)`, `23 passed (23)`.

Acceptance criterion 1 (`npx --no-install scaffold audit` reports no `setup:` advisory) is now met
in full. Criteria 2 and 3 remain met, extended to cover `tests/setup.test.ts`.
