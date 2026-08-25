# Unit VISIT-table — report

`implementer` on Claude Opus 5. Working tree at `/home/user/orkestrel/table`. Nothing committed.

## The advisory as taken

`npx --no-install scaffold audit`, run first, before any edit:

```text
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 126 planned paths drifted from the plan. Audit compared bytes at 101, existence at 19, and nothing at 6. The plan does not own 7 further paths beneath its groups.
```

One module reported, so one proof file: `tests/setup.test.ts`. The `dependencies` advisory is the
fleet-wide one the brief excludes; it still reports at exit, unchanged.

## Touched files

| File                    | Change                                                                       |
| ----------------------- | ---------------------------------------------------------------------------- |
| `tests/setup.test.ts`   | New. Proves the exported behavior of `tests/setup.ts` the workspace consumes |
| `package.json`          | `test:setup` written by `repair --groups manifest`; `test` chain adopted     |
| `vite.config.ts`        | `setup` project registered by the full `repair`                              |
| `package-lock.json`     | The scaffold ^0.0.52 re-pin that arrived with the dispatch                   |
| Vendored orchestration  | 49 paths rewritten by the full `repair`; none edited by hand                 |

Diffstat over the files this unit reasoned about:

```text
 package-lock.json | 423 +++++++++++++++++++++++-------------------------------
 package.json      |   7 +-
 vite.config.ts    |  13 +-
 tests/setup.test.ts | 208 +++++++++++++++++++ (new, untracked)
```

`tests/setup.ts` is untouched. The full `repair` also rewrote the vendored `.agents/`, `.claude/`,
`.codex/`, and `CLAUDE.md` paths and created the missing skill, template, and transport files; those
are the tool's writes, not hand edits.

## The proof file and what each case asserts

`tests/setup.test.ts`, one `describe` block, one case per behavioral contract. Every expectation is
a declared fixture or an independently measured property; no case re-runs a production assertion
that a consuming suite already owns.

| Case                                                                                              | Contract                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orders text by embedded number where a plain lexical order disagrees                              | `compareTextNaturally` sorts `item2` before `item10`, which the array's own default sort reverses; a number cell is stringified and still compared numerically; an absent cell reads as empty text |
| orders text by its length and reads an absent cell as empty text                                  | `compareTextByLength` sorts short before long, measures a number cell by its rendered length, and reads an absent cell as empty text                            |
| admits a case-folded substring under contains and refuses every other operator                    | `matchTextLoosely` folds case on both sides, admits the empty needle against an absent cell, and refuses `equals` and `between` outright                        |
| binds every admissibility vector to a declared column and spans both outcomes per operator        | Every vector's `column` equals the fixture schema's column of that key and matches its `filter.column`; the vectors' cell kinds are exactly the schema's; each operator carries an admitted and a refused vector |
| declares a fresh schema keyed on one of its columns and spanning every cell kind                  | `createTableSchema` keys on a declared column, uses distinct column keys and distinct choice values, spans every cell kind, and returns a new value each call    |
| builds fresh rows under declared columns, spanning a complete and an incomplete row               | `createTableRows` writes no undeclared column key, gives every row a defined and distinct identity, carries a complete row and an incomplete one, and returns a new value each call |
| opens the fixture over the shared schema and rows and forwards caller options                     | `createTableFixture` opens the shared schema and rows; replacement rows win; an option record without `rows` keeps the shared population and its other options still reach the table |
| reports a table error code and reports nothing for a success or a foreign throw                   | `readTableError` returns the code for a table error, `undefined` for a success, and `undefined` for a throw the package did not raise                           |
| drives a currently valid call at every destroyed-write entry                                      | Against a live table every `readDestroyedWrites` entry reports no error, so a consumer reading `DESTROYED` at a position is not reading a call refused for another reason; the population is the same length after teardown |
| builds the exact column and choice populations it is asked for                                    | `createColumnBudgetSchema` and `createChoiceBudgetSchema` produce the requested population with distinct keys and values and a first column carrying the schema key |
| chunks the text budget under the string limit and moves it by the requested delta                 | `createTextBudgetSchema` holds only strings, none over `STRING_LIMIT`, totalling within one `STRING_LIMIT` of `TEXT_LIMIT`, and the delta raises the total by exactly the requested amount |
| holds the node budget under the node limit and moves it by the requested delta                    | `createNodeBudgetSchema` keeps the metadata array itself under `NODE_LIMIT`, so the fault at one more counts the whole schema, and the delta adds exactly that many entries |

Two contracts are named in the file as belonging to the consuming suites rather than to this proof,
so the reader does not look for them here: whether `admitsFilter` agrees with each vector's
`admitted` flag (`tests/src/core/tables/FilterManager.test.ts`), and where the text and node budget
faults actually fire (`tests/src/core/helpers.test.ts`, `tests/src/core/parsers.test.ts`).

## Mutation control

One control for the one proof file. The natural-order expectation in `tests/setup.test.ts` was
replaced with the plain lexical order the same array sorts to — a mutation of the case's own
expectation, not of `tests/setup.ts`.

Command: `npm run test:setup`.

Before the restore, `Tests  1 failed | 11 passed (12)`, failing at:

```text
 FAIL  |setup| tests/setup.test.ts > root test setup > orders text by embedded number where a plain lexical order disagrees
AssertionError: expected [ Array(4) ] to strictly equal [ Array(4) ]
 ❯ tests/setup.test.ts:24:50
```

After the restore, the same command reports `Tests  12 passed (12)`. No other case moved, so the
case fails for the contract it names and nothing wider.

## The visit

1. **Proof written.** `tests/setup.test.ts`. Re-running `scaffold audit` at this point dropped the
   `setup:` advisory and raised the two the brief predicted:

   ```text
   scripts: The manifest at . does not declare a planned script: test:setup. Add this exact script line to package.json: "test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup",
   projects: the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it.
   ```

2. **`test:guides` adopted.** No adoption was needed. The declared value was already the planned
   value byte for byte, `--no-cache` included:
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`. No `scripts:`
   advisory named it, before or after. `package.json` is unchanged on that line.

3. **`npx --no-install scaffold repair --groups manifest`** — `1 written, 1 unchanged`. It wrote
   `test:setup` with the planned value.

4. **`test` chain adopted** through `npm pkg set`, placing `test:setup` between `test:config` and
   `test:guides` as the installed compiler emits it:
   `npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides`.

5. **`npx --no-install scaffold repair`** — `49 written, 78 unchanged, 0 removed`. It added the
   `setup` project to `vite.config.ts` and registered it in the projects array. A second full
   `repair` reported `0 written, 127 unchanged, 0 removed`, so the visit converged.

6. **`npm run format`** — `Finished in 2753ms on 158 files`.

### Retained differing values

None. `repair` named no retained differing script value at either invocation. The only script the
manifest gained is `test:setup`, and the only script this unit set by hand is the `test` chain.

### Foreign paths

Untouched, as instructed. `repair` removed nothing (`0 removed`), and the exit audit still counts
them: `The plan does not own 7 further paths beneath its groups.`

## Gate evidence

Each run read bare, in order, at the final tree.

| Gate                  | Closing line                                                                    |
| --------------------- | -------------------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 2961ms on 158 files using 4 threads.` |
| `npm run lint:check`  | no diagnostics, `EXIT=0`                                                        |
| `npm run check`       | no diagnostics, `EXIT=0`                                                        |
| `npm run build`       | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`, `EXIT=0`       |
| `npm test`            | `EXIT=0`                                                                        |

`npm test` per project:

```text
> test:src      Test Files  15 passed (15)   Tests  95 passed (95)
> test:policy   Test Files   1 passed (1)    Tests  93 passed (93)
> test:config   Test Files   1 passed (1)    Tests  46 passed (46)
> test:setup    Test Files   1 passed (1)    Tests  12 passed (12)
> test:guides   Test Files   1 passed (1)    Tests  81 passed (81)
```

## Acceptance criteria

1. **`scaffold audit` reports no `setup:` advisory at exit.** Met. The exit audit reports only
   `dependencies: typescript declares major 6, while the registry serves major 7.` and
   `0 of 126 planned paths drifted from the plan.`
2. **Every gate closes green, each read bare.** Met; see the preceding table.
3. **One mutation-control failing line per proof file, restored.** Met; one proof file, one control,
   restored and re-run green.

## Observations

- `repair --groups manifest` appends a missing script to the end of the `scripts` object, so
  `test:setup` sits after `prepack` rather than beside the other `test:*` keys. `scaffold audit`
  does not compare `package.json` byte for byte, so this is clean at exit and a second `repair` does
  not move it. Left exactly as the tool wrote it; reordering is the Orchestrator's call.
- `readTableError` reports a throw the package did not raise as `undefined`, identical to a success.
  The proof pins that and names it in a comment, because a consumer reading `toBeUndefined()` is
  asserting the absence of a table error rather than the absence of an error. Deliberate, given the
  `isTableError` guard — recorded, not changed.
- A table freezes the schema and rows it holds, so `toStrictEqual` against a freshly declared value
  fails with no visual difference. The fixture case uses `toEqual` and says why in a comment.
- The `probe` project carried the measurements behind these assertions. `tmp/probe/` was removed
  before the gates and no probe entered the tree.

## Deviation state

None. No stop condition fired. Every reported module was provable under the fixed shape, and no gate
failed.
