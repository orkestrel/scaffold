# Unit VISIT-relation — report

`implementer` on Claude Opus 5. Objective met: the setup proof landed, `test:guides` and the
`test` chain carry their planned values, `repair` ran clean, and every gate closed green. Nothing
committed.

## The advisory as taken

`npx --no-install scaffold audit` at the start of the unit, in `/home/user/orkestrel/relation`:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The `setup:` advisory named one module, `tests/setup.ts`, so the work list is one proof file,
`tests/setup.test.ts`. The `dependencies:` row is the fleet-wide advisory the brief scopes out.

## Touched files

| File                  | Change                                                                     |
| --------------------- | -------------------------------------------------------------------------- |
| `tests/setup.test.ts` | New. The proof of the base setup module's exported test infrastructure.    |
| `package.json`        | `test:guides` adopted, `test:setup` written by `repair`, `test` chain adopted. |
| `vite.config.ts`      | `setup` project written by `repair` and registered between `config` and `guides`. |
| `package-lock.json`   | Arrived dirty from the `^0.0.52` re-pin; kept.                              |

```text
 package-lock.json   | 423 +++++++++++++++++++++++-------------------------------
 package.json        |   9 +-
 vite.config.ts      |  13 +-
 3 files changed, 200 insertions(+), 245 deletions(-)
 tests/setup.test.ts | 163 ++++ (new file)
```

`repair` also rewrote the `orchestration` and `docs` groups (vendored agent, skill, rule, and
bridge files). Those are `repair` output, untouched by hand.

## What the proof asserts

`tests/setup.test.ts` covers the exports of `tests/setup.ts` — `INTEGRATION_TABLES`,
`INTEGRATION_RELATIONS`, `isBrowserVuePath`, and `FaultDriver` — one case per behavioral
contract. Every expectation arrives by a route the module does not share: a column's contract is
read back through `compileGuard` from `@orkestrel/contract` rather than through the
`stringShape` / `integerShape` builders that declared it, and every driver assertion reads the
wrapped driver directly so nothing the wrapper holds itself can satisfy it.

`INTEGRATION_TABLES`:

- `admits the fixture row values the consuming suites write` — the compiled guard for each column
  accepts the exact value `tests/src/core/factories.test.ts` writes into it.
- `refuses a value of the wrong column type` — the `id` guard refuses a number, and the `age`
  guard refuses a string and a non-integer.
- `declares a schema a real driver opens and stores rows against` — the fixture map is converted
  to a real `TableSchema[]` through `shapeToColumnStorage`, a real memory driver opens it, and
  rows written against it read back.

`INTEGRATION_RELATIONS`:

- `declares the users to posts relation the consuming suites load` — the membership
  `factories.test.ts` relies on.
- `keys that relation on a posts column matching the users primary key` — the descriptor's `key`
  names a column that exists on the target table, and that column's storage matches the storage of
  the primary key it references. This is the invariant that breaks silently when the tables map is
  renamed without the relations map.

`isBrowserVuePath`:

- `accepts a browser application path in either separator family` — real browser paths written
  with `/` and with `\`.
- `refuses a sibling environment, a prefix lookalike, and an unanchored match` — `app/server/`,
  `app/core/`, `app/browserkit/` in each separator family, `src/app/browser/`, and
  `app/browser.vue`.

`FaultDriver`:

- `forwards every operation other than delete to the wrapped driver` — `insert`, `write`, `read`,
  `keys`, `scan`, `snapshot`, `clear`, and the restore thunk, each verified through the wrapped
  driver rather than through the wrapper.
- `forwards each delete before the configured one and removes the row` — deletes under the
  threshold return `true` and the rows are gone from the wrapped driver.
- `fails the configured delete and every later one, leaving the targeted rows` — the configured
  delete and each one after it fail with `FaultDriver delete failure`, and the rows they targeted
  survive.

One behavior worth naming for the record: `FaultDriver.delete` throws **synchronously** rather
than returning a rejected promise, so the proof asserts it with `expect(() => …).toThrow(…)`.
`tests/src/core/Model.test.ts` meets the same fault as a rejection because the database awaits the
call inside its own async stack. The proof carries that distinction as a comment beside the
assertion.

The proof file declares no `describe`, `it`, or `expect` inside `tests/setup.ts`; the module was
not edited. The `setup` project runs in Node with the browser disabled, and `tests/setup.ts` is
host-independent, so no browser or service split applies here.

## Mutation control

One control for the one proof file. The input was mutated, not the expectation, so the case had to
read the module's real behavior to fail.

- **Mutation.** `tests/setup.test.ts` line 153, `new FaultDriver(inner, 2)` → `new FaultDriver(inner, 4)`,
  moving the fault threshold past every delete the case performs.
- **Failing line.** `tests/setup.test.ts:158:47` — `AssertionError: expected [Function] to throw an error`,
  in `FaultDriver > fails the configured delete and every later one, leaving the targeted rows`.
- **Run.** `npm run test:setup` reported `Tests  1 failed | 9 passed (10)`.
- **Restored.** `new FaultDriver(inner, 2)` put back; `npm run test:setup` reported
  `Tests  10 passed (10)`.

## The visit

Order as the brief fixes it.

1. Proof written.
2. `npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'`.
3. `npx --no-install scaffold repair --groups manifest` → `1 written, 1 unchanged, 0 removed in ..`,
   which wrote `test:setup`.
4. `npm pkg set 'scripts.test=npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides'`.
   The order was read from the installed scaffold's compiler at
   `node_modules/@orkestrel/scaffold/dist/src/core/index.js:4290-4299`, which places `test:setup`
   after `test:config` and before `test:guides`.
5. `npx --no-install scaffold repair` → `49 written, 78 unchanged, 0 removed in ..`. The `configs`
   group was not blocked; `vite.config.ts` gained the `setup` project.
6. `npm run format` → `Finished in 3026ms on 140 files using 4 threads.`

**Retained differing values `repair` named: none.** The clean `repair` reported no retained
script value. The only advisory left is the fleet-wide `dependencies: typescript declares major 6`.

## Gates

Each read bare, in order.

| Gate                  | Closing line                                                            |
| --------------------- | ----------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 5155ms on 140 files using 4 threads.` |
| `npm run lint:check`   | No diagnostics printed; exit code `0`.                                  |
| `npm run check`        | `tsc --noEmit -p configs/src/tsconfig.core.json` produced no diagnostics; exit code `0`. |
| `npm run build`        | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`; exit code `0`. |
| `npm test`             | Every project passed; exit code `0`.                                    |

`npm test` per project:

```text
> test:src      Test Files  4 passed (4)   Tests  40 passed (40)
> test:policy   Test Files  1 passed (1)   Tests  93 passed (93)
> test:config   Test Files  1 passed (1)   Tests  46 passed (46)
> test:setup    Test Files  1 passed (1)   Tests  10 passed (10)
> test:guides   Test Files  1 passed (1)   Tests  23 passed (23)
```

`oxlint` prints nothing on a clean run under this configuration. Exit code `0` was read directly
from both `npm run lint:check` and a bare `npx oxlint --config .oxlintrc.json --deny-warnings .`.

## Acceptance criteria

1. **Met.** `npx --no-install scaffold audit` at exit reports no `setup:` advisory and no
   `scripts:` advisory. The remaining advisory line is
   `dependencies: typescript declares major 6, while the registry serves major 7.`, which the brief
   scopes out.
2. **Met.** Every gate closed green, each read bare, as tabulated earlier.
3. **Met.** One mutation-control failing line reported, restored, and re-run green.

## Deviation state

None. No stop-and-report condition arose.

## Left alone, as briefed

The foreign paths remain for the Orchestrator to remove at commit: the four
`.agents/skills/orkestrel-human-journey/**` files, `.claude/skills/orkestrel-human-journey/SKILL.md`,
`.claude/agents/codex.md`, and `.codex/agents/claude.toml`. The `typescript` major advisory is
untouched. No git state was changed and nothing was committed.
