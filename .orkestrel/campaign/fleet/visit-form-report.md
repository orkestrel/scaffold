# Unit VISIT-form — report

Unit complete. The `setup:` advisory is gone, the `setup` project is registered and reached from
`test`, and every gate closes green. No deviation.

## The advisory as taken

`npx --no-install scaffold audit`, run first, at `/home/user/orkestrel/form`:

```text
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

```text
48 of 126 planned paths drifted from the plan. Audit compared bytes at 101, existence at 19, and nothing at 6. The plan does not own 7 further paths beneath its groups.
```

The advisory names one module, `tests/setup.ts`, so the proof work list is one file:
`tests/setup.test.ts`.

## Proof files and what each asserts

`/home/user/orkestrel/form/tests/setup.test.ts` (new, 346 lines, 13 cases in 4 blocks). Every case
takes one behavioral contract of the module's exports and derives its expectation by a route
`tests/setup.ts` does not share: the package's own `matchesField`, `auditSchema`, `serializeForm`,
`RULE_MESSAGES`, and `FIELD_CONTROLS` declarations, plus four module-scope measurement helpers
(`readList`, `collectStrings`/`measureLongest`, `countText`, `countLeaves`) that sum the produced
fixtures where the builders derive their sizes by subtracting a reserved overhead.

Module-level second-route note: `tests/setup.ts` is host-independent, so the whole module is
provable in the `setup` project's Node environment. No half is deferred to another project.

### answer and change tables

- **marks every falsy answer as answered and every blank string as unanswered** — `ANSWER_CASES`
  carries distinct values, both outcomes, the falsy-but-answered membership (`[]`, `false`, `0`)
  and the refused membership (`''`, a whitespace-only string, absence). A table that dropped the
  falsy-answered rows still passes the consuming sweep in `tests/src/core/helpers.test.ts:667`, so
  this is membership the consumer cannot check.
- **covers every presence and content difference over names both records can carry** — every
  expected name in `CHANGED_CASES` is a key of at least one record and appears once; the table
  covers an unchanged row, a current-only row, an opened-only row, and a list-content row.

### control fixtures

- **leaves length alone to refuse an oversized string on every listed field** — `STRING_FIELDS`
  lists each control once, and its `select` row declares no choices yet accepts a `STRING_LIMIT`
  string, so membership cannot be what refuses the oversized value the consumer sweeps. Also pins
  that at least one row accepts the boundary string, so the sweep is not vacuous for every row.
- **pairs every control with a sound field and a value that control accepts** — for every control
  in `FIELD_CONTROLS`, `MATRIX_FIELDS` keys the matching field, `auditSchema` reports no fault on
  it, and `matchesField` accepts `MATRIX_VALUES` for it. `evaluateField` never checks value shape,
  so a mismatched matrix value produces no error and the consumer's inert cells pass regardless.
- **sweeps every rule the package declares against a row for every control** — `MATRIX_RULES`
  matches the keys of `RULE_MESSAGES` without duplicates, and `RULE_APPLICABILITY` declares a row
  for every control in `FIELD_CONTROLS`. The consumer's own pair count at
  `tests/src/core/helpers.test.ts:1423` is derived from `MATRIX_RULES`, so a rule dropped from that
  list shrinks the swept matrix and the count still passes.

### budget fixtures

- **produces exactly the requested cardinality of distinct entries in a sound schema** —
  `createFieldBudgetSchema`, `createGroupBudgetSchema`, and `createChoiceBudgetSchema` each produce
  the requested count of distinct entries and an otherwise fault-free schema.
- **places the requested length at one site per case and leaves each schema otherwise sound** —
  `createNameBudgetCases(40)` and `createStringBudgetCases(40)` give every case a distinct label and
  a distinct serialized shape, put the longest retained string at exactly 40, and leave
  `auditSchema` empty. The consumer filters faults to one substring, so an unrelated fault in a case
  schema is invisible there.
- **retains exactly the requested code units while clamping each string to the ceiling** —
  `createTextBudgetSchema` measures 40000, `TEXT_LIMIT`, and `TEXT_LIMIT + 1` exactly, and no single
  produced string exceeds `STRING_LIMIT`.
- **charges a metadata key its spelling and a declared rule nothing** —
  `createTextPopulationSchema` shifts its total one for one with the key length, and the `rule`
  variant retains the same text while declaring a rule.
- **scales metadata leaves one for one above a reserved overhead and clamps below it** —
  `createNodeBudgetSchema` adds one leaf per unit above its reserved overhead, clamps to zero below
  it rather than producing a negative length, and carries the `custom` validator the reservation
  counts.
- **adds one leaf for the extra key and none for a longer key spelling** —
  `createNodePopulationSchema` adds exactly one leaf for `extra` and none for a longer key.
- **selects every offered choice and sizes each entry to the requested length** —
  `createCheckboxLimit` offers the requested distinct choices, its value selects every one in order,
  `matchesField` accepts the pair, and the sized form gives every entry exactly the requested length.

### custom validator fixtures

- **answers from a script that clamps to its last entry and restarts per validator** —
  `createSequenceValidator` returns each scripted answer in order, clamps to the last after
  exhaustion, gives each construction an independent counter, and answers `true` from an empty
  script. `passValidation` returns `true`.

## Mutation control

One control for the one proof file. `expect(countText(createTextBudgetSchema(TEXT_LIMIT)))` had its
expectation changed from `TEXT_LIMIT` to `TEXT_LIMIT - 1` — the reading a builder reserving one code
unit too many would produce.

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`

Failing line, with the mutation in place:

```text
 ❯ tests/setup.test.ts:277:57
AssertionError: expected 1048576 to be 1048575 // Object.is equality
      Tests  1 failed | 12 passed (13)
```

Restored, and the assertion now sits at `tests/setup.test.ts:279` after the formatter ran. The same
command reports `Tests  13 passed (13)`.

## The visit

`test:guides` needed no adoption. The declared value already equals the planned one the installed
`@orkestrel/scaffold@0.0.52` compiler emits, `--no-cache` included:

```text
"vitest run --config vite.config.ts --no-cache --reporter=dot --project guides"
```

Order run: proof written → `test:guides` compared and left alone → `npx --no-install scaffold repair
--groups manifest` wrote `test:setup` → the planned `test` chain adopted through `npm pkg set`, with
`test:setup` between `test:config` and `test:guides` → full `npx --no-install scaffold repair` →
`npm run format` → the gates.

`repair --groups manifest`:

```text
0 of 1 planned path drifted from the plan. Audit compared bytes at 0, existence at 0, and nothing at 1.
1 written, 1 unchanged, 0 removed in ..
```

Full `repair`:

```text
0 of 126 planned paths drifted from the plan. Audit compared bytes at 115, existence at 5, and nothing at 6. The plan does not own 7 further paths beneath its groups.
49 written, 78 unchanged, 0 removed in ..
```

**Retained differing values `repair` named: none.** Neither run reported a retained script value.
The full run wrote `vite.config.ts` (the `setup` project plus its entry in the `projects` list) and
the vendored `docs` and `orchestration` files, and it wrote nothing over the `test` chain or
`test:guides`.

## Gates

Each read bare, at `/home/user/orkestrel/form`.

| Gate                   | Closing line                                                          |
| ---------------------- | --------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` — 146 files, exit 0       |
| `npm run lint:check`   | no diagnostic, exit 0 (`oxlint` prints nothing on a clean run)        |
| `npm run check`        | `tsc --noEmit -p configs/src/tsconfig.core.json`, no output, exit 0   |
| `npm run build`        | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`, exit 0 |
| `npm test`             | exit 0; per project: `test:src` 173, `test:policy` 93, `test:config` 46, `test:setup` 13, `test:guides` 48 |

Exit audit, `npx --no-install scaffold audit`:

```text
dependencies: typescript declares major 6, while the registry serves major 7.
```

```text
0 of 126 planned paths drifted from the plan. Audit compared bytes at 115, existence at 5, and nothing at 6. The plan does not own 7 further paths beneath its groups.
```

No `setup:` advisory. The `typescript` major advisory is the fleet-wide one the brief scoped out.
The seven remaining rows are the foreign paths the brief reserves for the Orchestrator: the four
retired `orkestrel-human-journey` files under `.agents/skills/`, the one under `.claude/skills/`,
`.claude/agents/codex.md`, and `.codex/agents/claude.toml`. Left alone.

## Touched files

| File                                       | Change                                                              |
| ------------------------------------------ | ------------------------------------------------------------------- |
| `tests/setup.test.ts`                      | New. The setup proof, 13 cases over the module's exported contracts |
| `package.json`                             | `test:setup` written by `repair`; `test` chain adopted              |
| `vite.config.ts`                           | `setup` project written by `repair` and added to `projects`         |
| vendored `docs` and `orchestration` paths  | Rewritten by the full `repair`, byte-for-byte from the plan         |
| `package-lock.json`                        | Arrived dirty from the pre-dispatch 0.0.52 re-pin; untouched by me  |

Diffstat over tracked files:

```text
 37 files changed, 574 insertions(+), 672 deletions(-)
```

Untracked additions from `repair`: `.agents/skills/orkestrel-debrief/references/retention.md`,
`.agents/skills/orkestrel-prove-journey/`, `.agents/skills/orkestrel-publish/`,
`.agents/templates/`, `.agents/transports/`, `.claude/skills/orkestrel-prove-journey/`,
`.claude/skills/orkestrel-publish/`, plus `tests/setup.test.ts`.

No commit, no git state change. Two throwaway probes under `tmp/probe/` settled which
`STRING_FIELDS` rows accept a boundary string, the budget builders' measured totals, and the node
builders' leaf scaling; both are deleted and `tmp/` now holds only this unit's brief and report.

## Shared-file patches

None. Every file written is owned by the unit or regenerated by `repair`.

## Deviation state

None. Every reported module was provable under the fixed shape, and no gate failed.
