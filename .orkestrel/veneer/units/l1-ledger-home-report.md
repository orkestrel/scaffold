# Unit L1 LEDGER-HOME — report

## Outcome

Done. The cascade ledger reads from `guides/veneer.md` § Departures and § Additions, the
`guides/ledger/` directory no longer exists, and every reader, proof, map entry, and
cross-reference points at the guide. All named gates exit 0.

## Row counts

`grep -c '^| \`'`, before over the two files at `ed4a8ec` and after over the guide's two sections
(`sed -n` between `### Departures`, `### Additions`, and `### Outside the ledger`):

| Population | Before | After |
| ---------- | ------ | ----- |
| Departures | 844    | 844   |
| Additions  | 157    | 157   |

The rows are byte for byte the rows the files carried. `diff` of the departure rows extracted from
`git show HEAD:guides/ledger/departures.md` against the rows extracted from the guide's § Departures
reports no difference, and the same `diff` over the addition rows reports no difference.

## Touched files

| File                       | Change                                                                                                                       |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `guides/veneer.md`         | `### The ledger` replaced by `### Departures` and `### Additions` under `## Tokens`, before `### Outside the ledger`; the cross-references restored |
| `guides/ledger/departures.md` | Deleted; its `### Departures` subsection is the guide's                                                                     |
| `guides/ledger/additions.md`  | Deleted; its `### Additions` subsection is the guide's                                                                      |
| `guides/README.md`         | The `ledger` directory paragraph under § By concept removed                                                                  |
| `tests/setupServer.ts`     | `readDepartures` and `readAdditions` default to `guides/veneer.md` and walk `Tokens`; `LEDGER_GUIDE` opens with `## Tokens`; both `@param path` lines name the guide |
| `tests/setupServer.test.ts` | The plants write and select `Tokens`, and the missing-subsection refusal names `Tokens / Additions`                         |
| `tests/guides.test.ts`     | The inventory pattern narrowed from `guides/**/*.md` to `guides/*.md`                                                        |

## Restored cross-references

| Site                                    | Before                                          | After                     |
| --------------------------------------- | ----------------------------------------------- | ------------------------- |
| `### Button states and bindings`, last sentence | `[`ledger/departures.md`](ledger/departures.md)` | `§ Departures`            |
| `### Bootstrap variables Veneer retains`, first paragraph | `[`ledger/departures.md`](ledger/departures.md)` | `§ Departures`            |
| `### Outside the ledger`, third paragraph | `neither ledger file`                           | `neither table here`      |

The pointer section's prose was deleted rather than folded: the § Departures introduction already
states the reader, the proof that reddens, and the refresh command, and the § Additions introduction
already states its own reader and proof, so restating them would have been the repetition the
obligation forbids.

## Gate exits

Every run used `PATH` with npm 11.19.1 ahead of it, from `/home/user/veneer-ledger`.

| Command                                           | Exit | Result                            |
| ------------------------------------------------- | ---- | --------------------------------- |
| `npm run format:check`                            | 0    | 209 files correct                 |
| `npm run lint:check`                              | 0    | no diagnostic                     |
| `npm run check`                                   | 0    | root, src core/browser/styles, app browser |
| `npm run test:setup`                              | 0    | 3 files, 160 tests passed         |
| `npm run build:src && npm run test:conformance`   | 0    | 1 file, 17 tests passed           |
| `npm run test:guides`                             | 0    | 1 file, 18 tests passed           |
| `npm run test:policy`                             | 0    | 1 file, 109 passed, 1 skipped     |

`npm run test:setup` first exited 1 on a worktree with no `dist/`: seven failures, each
`ENOENT ... dist/src/styles/index.css` from `readBuiltCascade`. `npm run build:src` exited 0 and the
rerun exited 0. That failure is the worktree's missing build output, not the change.

## The gate reads the moved rows

The conformance gate was proved able to fail against the guide's own tables before it was trusted
green. Planting one wrong value in the guide's § Departures `blockquote` table — `var(--vn-size-5)`
rewritten to `var(--vn-size-4)` on the `.blockquote` `font-size` row — took
`npm run test:conformance` to exit 1 with two failures, `names no departure the compiled cascade no
longer carries` at `tests/conformance.test.ts:170` among them. Restoring the cell took the same
command back to exit 0 over 17 passing tests, and a `diff` of the restored rows against
`git show HEAD:guides/ledger/departures.md` reports no difference. The mutation the gate
distinguishes is therefore a single changed cell in the moved tables, which is what a reader
pointed at the wrong section or the wrong subsection would not catch.

## Status

`git status --porcelain`:

```text
 M guides/README.md
D  guides/ledger/additions.md
D  guides/ledger/departures.md
 M guides/veneer.md
 M tests/guides.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
```

`git diff --stat HEAD`:

```text
 guides/README.md            |    8 -
 guides/ledger/additions.md  |  178 -------
 guides/ledger/departures.md |  994 ------------------------------------
 guides/veneer.md            | 1181 ++++++++++++++++++++++++++++++++++++++++++-
 tests/guides.test.ts        |    2 +-
 tests/setupServer.test.ts   |    8 +-
 tests/setupServer.ts        |   14 +-
 7 files changed, 1178 insertions(+), 1207 deletions(-)
```

Owned files only. `ls guides/` prints `README.md`, `guide.md`, `scaffold.md`, `veneer.md`.
`grep -rn 'guides/ledger\|ledger/departures\|ledger/additions\|## Cascade' guides tests` exits 1 and
prints nothing.

## `ROADMAP.md` patch (shared, report-only)

Apply to § Records, replacing the first bullet:

```diff
-- Read the machine-read record from `guides/veneer.md` and the ledger beside it: § Compatibility,
-  § Deferred selectors, and § Outside the ledger in the guide, and the departure and addition
-  tables in `guides/ledger/departures.md` and `guides/ledger/additions.md`. Those sections are the
-  definition of done.
+- Read the machine-read record from `guides/veneer.md`: § Compatibility, § Deferred selectors,
+  § Departures, § Additions, and § Outside the ledger. Those sections are the definition of done.
```

## Deviations

None. No obligation was blocked, and the policy sweep accepts the guide with the tables inside it
(`npm run test:policy` exits 0), so the deviation contract's stop condition never fired.

Ancillary choices settled inside the unit, per the deviation contract:

- § Departures precedes § Additions, as the contract names.
- The pointer section's prose folds to nothing, because each fact already sits in the introduction
  the obligation names.

## Observations outside the criteria

- `guides/README.md` no longer names the ledger anywhere. The obligation is to remove the paragraph,
  so nothing replaced it, and the map's § Tokens sentence still describes that section as the token
  reference alone. A one-clause extension of that sentence naming the departure and addition tables
  would keep the map complete; it is the Orchestrator's ruling, not this unit's.
- `ROADMAP.md` line 264, the landed F5b row, records "the ledger's home settled at `guides/ledger/`
  by the vendored policy sweep". That reads as a historical record of what F5b did, and this change
  makes it false as a statement of the ledger's home. `ROADMAP.md` is off-limits to this unit and the brief
  asks only for the § Records patch, so no patch for it is supplied here.
- Narrowing `tests/guides.test.ts` to `guides/*.md` changes no behaviour today: with
  `guides/ledger/` deleted, `guides/**/*.md` matches the same files. The narrowed pattern
  states the law rather than enforcing a difference, and a proof that it refuses a nested guide does
  not exist in this package.

## Claims flagged unverified

- The whole-suite `npm test` was not run. Only the gates the brief names ran, each scoped as listed.
- `npm run test:setup:browser`, `npm run test:src`, `npm run test:app`, `npm run test:journey`, and
  `npm run test:config` were not run. None reads the ledger tables by any reference this unit found,
  but that is a grep result rather than a run.
- Other worktrees' gate chains ran beside these runs. Each reading here is from this worktree's own
  scoped command, so contention could affect a duration but not an exit code that came back 0.

## Round 2

The coordinator ruled on the README observation: the map's § Tokens sentence names the ledger
tables. That sentence in `guides/README.md` § By concept reads:

> Its § Tokens is the reference for what that face declares: every `--vn-*` token the cascade
> carries, its value and its source, the `--bs-*` alias it answers, and the departure and addition
> tables the `cascade ledger` gates in [`tests/conformance.test.ts`](../tests/conformance.test.ts)
> read.

The clause extends that sentence's closing list rather than adding a sentence: the conjunction
before the alias item became a comma, and the departure and addition tables joined as the list's
last item. No other sentence changed, and the paragraph rewrapped at the file's own width.

| Command                | Exit | Result                        |
| ---------------------- | ---- | ----------------------------- |
| `npm run format:check` | 0    | 209 files correct             |
| `npm run test:guides`  | 0    | 1 file, 18 tests passed       |
| `npm run test:policy`  | 0    | 1 file, 109 passed, 1 skipped |

`git status --porcelain`:

```text
 M guides/README.md
D  guides/ledger/additions.md
D  guides/ledger/departures.md
 M guides/veneer.md
 M tests/guides.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
```

Owned files only. The observation that opened this round is closed; no observation remains open.
