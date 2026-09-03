# Unit conform-csv — report

Every numbered row is `applied`. The fleet rows `fleet-F1` and `fleet-F2` are `noop` with the paths
read. Fix round 1 closed the objective lane's findings F1 and F2. Fix round 2 closed claim 4 by
re-taking every control alone and reading the counts bare, closed this unit's half of claim 8 by
re-running the gate chain, and adopted the lane's referrals R-A, R-B, and R-D; R-C is referred to a
successor unit with the evidence that blocks it here. The gate chain is green on this unit's own
run: `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test` 0. No deviation stopped the
unit.

## Rows

| Id          | Disposition | Note                                                                                                                                                                                                                          |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| csv-obj-1   | applied     | `README.md` Requirements now reads `- Dual ESM and CommonJS builds from one entry point`. No subpath clause copied; csv publishes only `.`.                                                                                    |
| csv-obj-2   | applied     | `README.md` Requirements now reads `- Node.js >= 22.12.0`, matching `engines.node`. The manifest is unchanged.                                                                                                                 |
| csv-obj-3   | applied     | `#carry` and its comment moved to after `export()`, so it is the class's last member. The call site `csv.#carry(...)` in `map` is unchanged. The comment moved verbatim in round 1; fix round 2 changed its causal `since` to `because` under referral R-B. |
| csv-obj-4   | applied     | `src/core/CSV.ts` opens with the `import type` block, then the `@orkestrel/contract` value import, then `./errors.js`, `./parsers.js`, and `./shapers.js`.                                                                                        |
| csv-obj-5   | applied     | `src/core/shapers.ts` opens with the `ContractShape` and `./types.js` type imports, then the `@orkestrel/contract` value block, then `./inferers.js`.                                                                                        |
| csv-obj-6   | applied     | The `Guarding an adopted table` fence returns `createCSV(candidate)`; the now-unreferenced `import type { CSVTable }` line is deleted.                                                                                        |
| csv-obj-7   | applied     | `helpers.test.ts` and `inferers.test.ts` import `'../../setup.js'`. Sweep for an extensionless setup import over `tests/` is empty.                                                                                           |
| csv-obj-8   | applied     | The local `captureError` is deleted and `@orkestrel/test`'s is imported in `helpers.test.ts`; every open-coded `let caught: unknown; try …` block in `parsers.test.ts`, `CSV.test.ts`, and `factories.test.ts` routes through it. Nothing re-exported from `tests/setup.ts`. |
| csv-obj-9   | applied     | The local `isRecord` is deleted and `@orkestrel/contract`'s imported. Every call site stayed green under the stricter guard, as the refuter predicted — no assertion was adjusted.                                        |
| csv-obj-10  | applied     | `describe('assertAndNarrow usage sanity')` deleted in full. Nothing added to `tests/setup.test.ts`; the `assertAndNarrow` import stays, still used by the file's other cases.                                                  |
| csv-obj-11  | applied     | Every `deriveShapes` case and the `CSV — export` integer case compile the derived shape with `createContract` and read a value the wrong branch refuses. Mutation proof recorded following.                               |
| csv-obj-12  | applied     | `describe('flagship fences')` added below the parity loop in `tests/guides.test.ts`, covering every claim the row names. The presence guards and the executed assertions are proven falsifiable independently, following.                                                            |
| csv-obj-13  | applied     | `assertValidSeparators`, `advancePosition`, and `isBreakChar` gained describes in `helpers.test.ts`. No `isCSVError` case added there, per the refuter's strike.                                                  |
| csv-obj-14  | applied     | `scanBreak`, `scanComment`, `scanUnquoted`, `scanQuoted`, `scanField`, `scanRecord`, `readRecords`, `deriveHeader`, and `buildRow` moved verbatim from `parsers.test.ts` into `helpers.test.ts` with `START`, the `@src/core` names they need, and `buildQuotedField` / `buildMixedNewlineCSV`. Counts recorded following. |
| csv-subj-1  | applied     | The guide tagline reads `A types-first RFC 4180 CSV parser and renderer`. `guides/csv.md` § Helpers left unchanged.                                                                                                           |
| csv-subj-2  | applied     | `guides/README.md` states the runtime dependency as `^0.0.15`, matching `package.json`.                                                                                                                                        |
| csv-subj-4  | applied     | Documentation only; `src/core/CSV.ts` `export()` is untouched. `ExportOptions.key` is restated as the primary-key column, and the `TableExport` remark states what `@orkestrel/database` actually declares. Fix round 1 extended the same repair to the remaining attributions this row did not name. |
| csv-subj-5  | applied     | BREAKING. `BlankPolicy` deleted, `ParseOptions.blanks` is `boolean`, the default is `true`, and the branch reads `!resolved.blanks`. Failing-first evidence recorded following.                                               |
| csv-subj-6  | applied     | Every stale `AGENTS §N` / `AGENTS section N` / bare `§N` citation removed across `src/**`, `tests/**`, `guides/csv.md`, `guides/README.md`, and `README.md`, including the split and bare-link forms. The `AGENTS.md` link bullet in each of `guides/csv.md` and `guides/README.md` deleted, and the `guides/README.md` `## See also` section with it. |
| csv-subj-7  | applied     | The count removed from `validators.ts` TSDoc, `guides/csv.md` Validators table, and the `validators.test.ts` case name; `helpers.ts` names `resolveParseOptions` and `resolveRenderOptions` instead of counting them.          |
| csv-subj-10 | applied     | The `### CSV` parenthetical and the `## Methods` preamble's second and third sentences cut. `npm run test:guides` exits 0.                                                                                                     |
| csv-subj-11 | applied     | Every `## Tests` row displays `tests/src/core/<name>.test.ts`; every href is unchanged.                                                                                                                                        |
| csv-subj-14 | applied     | `README.md` binds `remaining`. `guides/csv.md` § Parse and query keeps `adults`, where the data carries an `age` column.                                                                                                       |
| csv-subj-15 | applied     | The Streaming boundary section states the limit without naming a version.                                                                                                                                                      |
| fleet-F1    | noop        | `tests/setup.ts` declares no `isBrowserVuePath`; a grep over `tests/` and `src/` returns nothing. The workspace has no browser environment: `src/browser`, `app/browser`, and `tests/setupBrowser.ts` are all absent.          |
| fleet-F2    | noop        | No class declares a public `readonly id: string`. `src/` declares `CSV` (`src/core/CSV.ts:38`, whose only field is `#result`) and `CSVError` (`src/core/errors.ts:21`, whose fields are `code`, `line`, `column`, `offset`, and `context`). A grep for `readonly id` over `src/` returns nothing. |

## Fix round 2

The objective lane returned FAIL on claim 4 and SPLIT on claim 8, and referred R-A, R-B, R-C, and
R-D outside the claims. The checker lane returned PASS with no finding of its own. This section
names each item and what closed it.

### Claim 4 (failing-first evidence) — CLOSED by re-taking every control

The lane confirmed the decidable half and could not decide the counts, because every count was this
writer quoting its own first-round runs and the lane has no exec tool. Fix round 2 re-applied each
control alone, read the count bare, restored the source, and re-read it green. Every command ran on
2026-09-03 from `/home/user/fleet/csv`.

| Row        | Control                                                                                                                    | Command                                                                          | Reading                          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------- |
| —          | baseline, no control applied                                                                                               | `npm run test:src:core -- tests/src/core/shapers.test.ts tests/src/core/CSV.test.ts` | `46 passed (46)`                 |
| csv-obj-11 | `deriveShapes` assigns `columnTypeShape('text')` to every column unconditionally                                            | the same command                                                                  | `5 failed \| 41 passed (46)`     |
| csv-obj-11 | the empty-column branch of `deriveShapes` assigns `columnTypeShape('integer')`                                              | `npm run test:src:core -- tests/src/core/shapers.test.ts`                          | `1 failed \| 17 passed (18)`     |
| —          | source restored                                                                                                            | `npm run test:src:core -- tests/src/core/shapers.test.ts tests/src/core/CSV.test.ts` | `46 passed (46)`                 |
| csv-obj-13 | the CR/LF/BOM set emptied in `assertValidSeparators`, `advancePosition` stops shifting `column`, `isBreakChar` drops `'\r'` | `npm run test:src:core -- tests/src/core/helpers.test.ts`                          | `13 failed \| 123 passed (136)`  |
| csv-obj-13 | the length and equality checks deleted from `assertValidSeparators`                                                        | the same command                                                                  | `8 failed \| 128 passed (136)`   |
| csv-obj-13 | `assertValidSeparators` always throws and `isBreakChar` also accepts `'a'`, `''`, `'\t'`                                    | the same command                                                                  | `84 failed \| 52 passed (136)`   |
| —          | source restored                                                                                                            | the same command                                                                  | `136 passed (136)`               |
| csv-obj-12 | `guides/csv.md:364` reduce comment edited from `// 60` to `// 61`                                                           | `npm run test:guides`                                                             | `1 failed \| 30 passed (31)`     |
| csv-obj-12 | `coerceInferred`'s `'integer'` branch returns the raw string                                                               | `npm run test:guides`                                                             | `4 failed \| 27 passed (31)`     |
| F2         | `src/core/CSV.ts:194` default changed to `this.#result.table.columns[1]`                                                    | `npm run test:guides`                                                             | `1 failed \| 30 passed (31)`     |
| F2         | `guides/csv.md:412` rebound to `const exported = csv.export()`                                                              | `npm run test:guides`                                                             | `1 failed \| 30 passed (31)`     |
| F2         | `README.md:86` comment shortened to drop `'id'`                                                                             | `npm run test:guides`                                                             | `1 failed \| 30 passed (31)`     |
| —          | guide, README, and source restored                                                                                         | `npm run test:guides`                                                             | `31 passed (31)`                 |
| csv-subj-5 | the `blanks` case reverted to the string literals `'keep'` and `'skip'`                                                     | `npm run check`                                                                   | exit 2, `error TS2322` at each site |

Each control names its own line. The csv-obj-11 unconditional-`'text'` control was re-run under
`--reporter=verbose` to read every failing name, and § Failing-first evidence records each name it
reported. The csv-obj-11 empty-column control reddens
`deriveShapes > derives text for a column with no non-empty cells` at `shapers.test.ts:103`. The F2
controls redden `guides.test.ts:272` (the executed assertion, `expected 'name' to be 'id'`), `:273`
(the guide presence guard), and `:274` (the README presence guard) respectively, so the executed
assertion and each presence guard are independently falsifiable.

The readings the first round could not state as measured are measured here. The csv-obj-12 counts
are read against the fix-round total of `(31)` rather than derived from `(30)`. The csv-subj-5
control reads at its post-move location: csv-obj-14 moved the `blanks` case from
`tests/src/core/parsers.test.ts` into `tests/src/core/helpers.test.ts`, so the diagnostics now land
at `tests/src/core/helpers.test.ts(784,44)`, `(787,47)`, and `(792,54)`, each reading
`Type 'string' is not assignable to type 'boolean | undefined'`. The column offsets are the ones the
first round recorded; the file and the lines are not, and the first round's row named the pre-move
file. `npm run check` exits 0 with the case restored.

Restoration is proven from the tree rather than from the edits: `src/core/inferers.ts` carries no
diff at all, the diffstat reads
the same `20 files changed, 877 insertions(+), 714 deletions(-)` as the first round, and the whole
gate chain is green under § Gates.

### Claim 8 (gate evidence) — CLOSED for this unit's half by a re-run

The lane decided the half it could and left the gate half NOT-EVIDENCED. § Gates records the
re-run's exit code and reading for each command. The deciding run still belongs to one independent
`verifier` after this unit exits.

### R-A — `via` in published TSDoc — CLOSED by edit

The lane's defect: `src/core/validators.ts:19` read `Each row is validated via …`, and
`.claude/rules/writing.md` § Substitutions replaces `via` with `through`. The sentence ships inside
`dist/src/core/index.d.ts`, and this unit re-flowed that exact block when csv-subj-6 removed its
`AGENTS section 14` citation.

Adopted verbatim: the line reads `Each row is validated through` and no other word changed. No
reflow followed, because the replacement leaves the line inside the block's own width; the wrap the
first round produced is still correct.

### R-B — causal `since` in the moved comment — CLOSED by edit

The lane's defect: `src/core/CSV.ts:207` read `since the source parse is not repeated`, and the same
rule replaces causal `since` with `because`. Adopted verbatim: the line reads
`because the source parse is not repeated`. csv-obj-3 required a verbatim move, so the comment is
now that move plus this one-word swap, and the row's note records it.

### R-C — the second `isRecord` site — REFERRED, no tree change

`tests/distribution.test.ts:159` declares a local
`function isRecord(value: unknown): value is Readonly<Record<string, unknown>>`. The lane's own
prescription is a separate unit with the release gate re-run, and the measurement behind that
prescription holds here: `package.json:56` composes `test` from `test:src`, `test:policy`,
`test:config`, `test:setup`, and `test:guides`, so no gate this unit runs collects the
`distribution` project. Only `prepublishOnly` (`package.json:65`) reaches it, through
`test:distribution -- --mode release`, and that proof packs the package and installs the tarball
into a generated consumer. The brief forbids this unit to install. Swapping the declaration without
that gate would ship an unproven narrowing change: the local guard returns
`Readonly<Record<string, unknown>>` and refuses an array, while `@orkestrel/contract`'s `isRecord`
returns `Record<string, unknown>` and additionally refuses a `Date`, a `Map`, and a class instance
(`node_modules/@orkestrel/contract/dist/src/core/index.d.ts:3120-3128`, quoted in the brief's
csv-obj-9 evidence), so the substitution changes both the narrowed type every downstream read sees
and the values the walkers admit.

Recorded for the Orchestrator: give it its own unit, owning `tests/distribution.test.ts`, with
`npm run test:distribution` as the gate.

### R-D — one imprecise line in the report — CLOSED by edit

The lane's defect: the first round's § Files touched summarised `tests/src/core/parsers.test.ts` as
carrying the `blanks` case, which csv-obj-14 had moved into `tests/src/core/helpers.test.ts`. The
§ Rows table was accurate. § Files touched in this report names each file's real content, and
§ Claim 4 records the control's post-move coordinates.

## Fix round 1

The objective lane returned FAIL on claims 4 and 8 and named F1 and F2 outside the claims. The
checker lane returned PASS with no finding of its own. This section names each item and what closed
it.

### F1 — the remaining `@orkestrel/database` attributions — CLOSED by edit

The lane's defect: csv-subj-4 corrected the `TableExport` interop claim and left the file's header,
the `ColumnType` remark, the `Columns` remark, and the guide's matching Types-table rows still
naming types `@orkestrel/database` does not declare. Those remarks ship inside
`dist/src/core/index.d.ts`, so they reach every consumer. The rule is
`.claude/rules/documentation.md` § Parity: falsify a prose claim the way you falsify a code claim,
and re-read the prose last against what shipped.

What I measured before editing, against `/home/user/fleet/database/src`:

- A grep for `ColumnType|\bColumns\b|TableExport` returns no match. Those names do not exist there.
- `ColumnMap = Readonly<Record<string, ContractShape>>` is declared at
  `/home/user/fleet/database/src/core/types.ts:438`.
- `TableDefinition { primary, columns, schema }` is declared at `:570`.
- `ColumnStorage = 'text' | 'integer' | 'real' | 'boolean' | 'json' | 'blob'` is declared at `:254`
  — the same literal set csv declares as `ColumnType`.

The edits:

| Site                              | Now reads                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `src/core/types.ts:5-6` (header)  | `its `TableDefinition` shape` in place of `its `TableExport` shape`; the block rewrapped to keep the comment width |
| `src/core/types.ts:161-164`       | `the same literal set `@orkestrel/database` declares as `ColumnStorage` (never imported)`                         |
| `src/core/types.ts:168-176`       | `Structurally identical to `@orkestrel/database`'s `ColumnMap` (never imported)`, and the `round-trips through `import` on either package` clause deleted |
| `guides/csv.md:59` (`ColumnType`) | `a portable column storage type; the same literal set `@orkestrel/database` declares as `ColumnStorage`.`         |
| `guides/csv.md:60` (`Columns`)    | `a table's declared columns, structurally identical to `@orkestrel/database`'s `ColumnMap`.`                      |

Departure from the lane's wording, recorded: the lane prescribed writing that no
`@orkestrel/database` type of the name `ColumnType` exists. That is true, and it is also incomplete
— the sibling declares the same literal set as `ColumnStorage`, which the lane's own grep pattern
could not reach. I wrote the measured name instead, which is the form the lane prescribes for
`Columns`/`ColumnMap` on the line beneath. No type and no runtime behaviour changed.

Sweep proving the old form is gone, over `src`, `tests`, `guides`, and `README.md` outside
`node_modules`:

| Pattern                                                                          | Result                                                                                                     |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| ``database`'s `(ColumnType\|Columns\|TableExport)``                               | empty                                                                                                      |
| `member-for-member`                                                              | empty                                                                                                      |
| `re-imports losslessly`                                                          | empty                                                                                                      |
| `round-trips through`                                                            | both hits are csv's own JSON round-trip — `guides/csv.md:306`, `tests/src/core/CSV.test.ts:148`            |
| `@orkestrel/database` over `src/` and `guides/csv.md`                            | every surviving hit names `ColumnStorage`, `ColumnMap`, or `TableDefinition`, or makes no type claim: `src/core/types.ts:5,163,173,287`, `src/core/factories.ts:40`, `src/core/CSV.ts:168`, `guides/csv.md:59,60,66,304,308` |

### F2 — the ungated `table.key` claim — CLOSED by a new executed case

The lane's defect: `guides/csv.md:412` and `README.md:86` claim values csv-obj-12's enumeration did
not reach, so nothing reports the day either goes false. The rule is `.claude/rules/tests.md`
§ Cross-cutting proofs, with `.claude/rules/documentation.md` § Parity on a substring guard not
being a behavioural proof.

Adopted verbatim from the lane's prescription, added to `describe('flagship fences')` in
`tests/guides.test.ts` between the strict-error case and the contract case, which is where the
guide's own § Exporting a portable schema section sits:

```ts
it('keys the export fence at its first column', () => {
	const csv = createCSV('id,name\n1,Ada\n2,Grace', { infer: true })

	expect(csv.export().key).toBe('id')
	expect(guideText).toContain('const table = csv.export()')
	expect(readmeText).toContain("table.key // 'id'")
})
```

Its failing-first proof is re-taken in fix round 2 and recorded there.

## Files touched

- `README.md` — dual-build and Node floor in Requirements; the usage fence binds `remaining`.
- `guides/README.md` — dependency range corrected to `^0.0.15`; index citation and the `## See also` section removed.
- `guides/csv.md` — tagline, `BlankPolicy` row, citation sweep, the `ColumnType` count, the `ColumnType` and `Columns` attributions, the `### CSV` and `## Methods` prose, the interop passage, the streaming limit, the adopted-table fence, and the `## Tests` display paths and subjects.
- `src/core/CSV.ts` — type imports first; `#carry` moved to the class's last member, and its comment reads `because` (R-B).
- `src/core/constants.ts` — `blanks` defaults to `true`; citation removed.
- `src/core/errors.ts` — citation removed.
- `src/core/factories.ts` — citation removed.
- `src/core/helpers.ts` — the blank-line branch reads the boolean; `resolveParseOptions` and `resolveRenderOptions` are named rather than counted; citations removed.
- `src/core/shapers.ts` — type imports first; citation removed.
- `src/core/types.ts` — `BlankPolicy` deleted, `blanks` is `boolean`, the header and the `ColumnType`, `Columns`, `ExportOptions.key`, and `TableExport` remarks restated on what `@orkestrel/database` declares, citation removed.
- `src/core/validators.ts` — the `ColumnType` count removed from published TSDoc; citations removed; `validated through` (R-A).
- `tests/guides.test.ts` — `ROOT_FILES` now carries `README.md`; `CORE_GUIDE` and `PACKAGE_README` added; `describe('flagship fences')` appended below the parity loop, including the export-key case.
- `tests/setup.ts` — citation removed from the `assertAndNarrow` doc block.
- `tests/src/core/CSV.test.ts` — local `isRecord` deleted, `captureError` adopted, the integer-shape case now compiles the shape.
- `tests/src/core/factories.test.ts` — its open-coded catches route through `captureError`.
- `tests/src/core/helpers.test.ts` — local `captureError` deleted, setup import extension fixed, the setup-helper describe deleted, the `assertValidSeparators` / `advancePosition` / `isBreakChar` describes added, the tokenizer and table-builder describes received, and the received `blanks` case takes the boolean under the name `keeps a wholly empty line as a record when blanks is true, and drops it when false`.
- `tests/src/core/inferers.test.ts` — setup import extension fixed.
- `tests/src/core/parsers.test.ts` — the moved describes and their now-unused imports removed; its open-coded catches route through `captureError`. `MAX_ERRORS` and `assertAndNarrow` stay imported, still used by the retained `parseCSV` describe.
- `tests/src/core/shapers.test.ts` — `deriveShapes` cases assert compiled contracts; citations removed.
- `tests/src/core/validators.test.ts` — case renamed off the count; citation removed.

Diffstat (`git diff --stat HEAD`, 2026-09-03): 20 files changed, 877 insertions(+), 714 deletions(-).

## Failing-first evidence

Fix round 2 re-took every control alone and read each count bare; its table is the authoritative
record and this section states what each control proves.

**csv-subj-5.** `npm run check` with the `blanks` case on the string literals: exit 2, with an
`error TS2322` at `tests/src/core/helpers.test.ts(784,44)`, `(787,47)`, and `(792,54)`, each reading
`Type 'string' is not assignable to type 'boolean | undefined'`. With the boolean restored:
`npm run check` exit 0.

**csv-obj-11.** Names read from the fix round 2 run itself, under `--reporter=verbose`. The
unconditional-`'text'` control reddens exactly
`CSV — export > infers an integer shape for whole-number numeric cells` (`CSV.test.ts:183`),
`deriveShapes > derives an inferred type for an all-string column` (`shapers.test.ts:110`),
`derives integer/real for an all-number column` (`:117`),
`derives boolean for an all-boolean column` (`:127`), and `derives json for a mixed column`
(`:134`). The empty-column control reddens `deriveShapes > derives text for a column with no
non-empty cells` (`:103`) alone, so the branch each case names is the branch it reads.

**csv-obj-13.** Counts re-measured in fix round 2; the names are the first round's record, and the
re-measured counts match it row for row. The CR/LF/BOM control reddens
`assertValidSeparators > throws INVALID_OPTION for CR, LF, or a byte-order-mark in either position`,
each `advancePosition` case, and `isBreakChar > reports true for CR and LF`. The length-and-equality
control reddens the multi-character delimiter, multi-character quote, and same-character cases. The
always-throws control reddens
`assertValidSeparators > returns without throwing for a valid delimiter and quote pair` and
`isBreakChar > reports false for a letter, an empty string, and a tab`.

The always-throws control was reached in the first round after an `isBreakChar` mutation returning
`true` for every input wedged the tokenizer loop and killed the Vitest worker with an out-of-memory
abort. That reading is a broken harness rather than evidence, and it was discarded and replaced with
the narrower mutation, which fix round 2 re-ran to the same count.

**csv-obj-12.** Counts re-measured in fix round 2, and the `// 60` control's own failing line read
from that run at `guides.test.ts:238`; the remaining names are the first round's record. The `// 60`
control reddens
`flagship fences > folds the reduce fence to its documented total` alone. The `coerceInferred`
control reddens `parses the Surface fence into inferred rows`, `reads the parse-and-query fence
table`, `returns the documented values from the tokenizer-leaf fence`, and
`parses the README usage fence into inferred rows`; every presence guard stayed green. The pair
proves the presence guards and the executed assertions fail independently.

**F2, the export-key case.** Its controls redden `guides.test.ts:272`, `:273`, and `:274` one at a
time, recorded under fix round 2.

## Test counts across the move (csv-obj-14)

Per-file, `npx vitest run --project src:core <file>`:

| File                             | Before | After |
| -------------------------------- | ------ | ----- |
| `tests/src/core/CSV.test.ts`     | 28     | 28    |
| `tests/src/core/factories.test.ts` | 9    | 9     |
| `tests/src/core/helpers.test.ts` | 76     | 136   |
| `tests/src/core/inferers.test.ts` | 11    | 11    |
| `tests/src/core/parsers.test.ts` | 80     | 28    |
| `tests/src/core/shapers.test.ts` | 18     | 18    |
| `tests/src/core/validators.test.ts` | 9   | 9     |

`src:core` totals 231 before and 239 after. The arithmetic closes: the deleted setup-helper describe
(csv-obj-10) subtracts its case, the `assertValidSeparators` / `advancePosition` / `isBreakChar`
describes (csv-obj-13) add theirs, and every moved case lands intact. The fix rounds add nothing to
`src:core`; F2's case lands in the `guides` project, which reads 30 at the end of the first round
and 31 at the end of this one.

## Sweeps

Each pattern ran over `src`, `tests`, `guides`, and `README.md`, excluding the vendored mirrors
`guides/{guide,contract,probe,scaffold,test}.md` and the vendored test set
`tests/{setupPolicy.ts,policy.test.ts,config.test.ts}`.

| Pattern                                       | Result                                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `agents[[:space:]]*(§\|section)` case-insensitive | empty                                                                                                    |
| `§[0-9]`                                      | empty                                                                                                        |
| `(AGENTS$` with one line of trailing context  | empty                                                                                                        |
| `blankpolic` case-insensitive, also over `configs` and `vite.config.ts` | empty                                                                               |
| `blanks.*'(keep\|skip)'`                      | empty                                                                                                        |
| `from '[./]*setup'` over `tests`              | empty                                                                                                        |
| `as CSVTable`                                 | empty                                                                                                        |
| `zero-dependency, types-first`                | empty                                                                                                        |
| `v1 boundary`                                 | empty                                                                                                        |
| `\.\./\.\./tests`                             | empty                                                                                                        |
| `function captureError\|function isRecord\|let caught: unknown` over `src` and `tests` | one hit, `tests/distribution.test.ts:159` — outside every row; see § Findings |
| `\bsix\b` case-insensitive                    | one hit, `tests/src/core/factories.test.ts:93` — the fixture string `'thirty-six'`, not a count               |
| `sanity`                                      | empty                                                                                                        |
| `const adults`                                | one hit, `guides/csv.md:339` — the fence csv-subj-14 rules out, whose data carries an `age` column            |

The first fix round's own sweeps are recorded under § Fix round 1, F1. Fix round 2 ran one further
sweep, `\bvia\b|\bsince\b` case-insensitive, over `src`, `tests` outside `tests/setupPolicy.ts`,
`README.md`, `guides/README.md`, and `guides/csv.md`; its surviving hits are recorded under
§ Findings outside the rows.

## Gates

Run in order from `/home/user/fleet/csv` on 2026-09-03, after fix round 2's edits and after the last
control was restored, each read bare and each invoked as
`npm --prefix /home/user/fleet/csv run <script>`.

| Command                | Exit | Reading                                                                                  |
| ---------------------- | ---- | ---------------------------------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` over 47 files                                |
| `npm run lint:check`   | 0    | no output                                                                                 |
| `npm run check`        | 0    | `tsc --noEmit` over the root project and `configs/src/tsconfig.core.json`                |
| `npm run build`        | 0    | `✓ built in 2.69s`, then `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` |
| `npm test`             | 0    | `src:core` 239, `policy` 111, `config` 46, `setup` 15, `guides` 31                       |

`npm run lint` and `npm run format` ran in the first round to converge, as the gate order
prescribes. Fix round 2 needed neither: `format:check` reports every matched file correct against
the edits as written.

Every reading here is this unit's own, taken inside its own exec. It is an observation, not a
criterion: the deciding run belongs to one independent `verifier` after the unit exits, which is
what the objective lane's claim 8 asks for.

## Breaking

`ParseOptions.blanks` changes from `BlankPolicy` to `boolean`, and the exported type `BlankPolicy` is
removed from the barrel.

- **Symbol.** `BlankPolicy` (removed) and `ParseOptions.blanks` (retyped).
- **Consumers.** None inside the fleet. `grep -ln '"@orkestrel/csv"' /home/user/fleet/*/package.json`
  returns `csv/package.json` alone, and that hit is csv's own `name` field.
- **Edit an external consumer needs.** Replace `blanks: 'keep'` with `blanks: true` and `blanks: 'skip'`
  with `blanks: false`; drop any `import type { BlankPolicy }` and annotate the value `boolean`.
  Behaviour is unchanged: `true` is the default and keeps a blank line as an empty row.

Neither fix round adds a breaking change. F1 edits comment prose inside published declarations, and
R-A edits one word of it, which moves `dist/src/core/index.d.ts` bytes without moving any type.
R-B edits a `//` comment, which the declaration file does not carry.

## Shared-file patches

None. No row required an edit outside Owned, and no other fleet checkout carries a symbol this unit
renamed or removed.

## Findings outside the rows

Recorded for the Orchestrator, not acted on, because no row and no lane prescription for this round
names them as work here.

1. `tests/distribution.test.ts:159` declares a local
   `function isRecord(value: unknown): value is Readonly<Record<string, unknown>>`. This is the shape
   csv-obj-9 repairs in `CSV.test.ts`, at a second site no row names. The objective lane's R-C
   prescribes its own unit, and § Fix round 2, R-C records the gate evidence that keeps it out of
   this one.
2. `via` and causal `since` survive at further sites in published and test prose, which R-A and R-B
   reach one site each. The sweep `\bvia\b|\bsince\b` case-insensitive covered `src`, `tests`
   outside `tests/setupPolicy.ts`, `README.md`, `guides/README.md`, and `guides/csv.md`, and no
   other path. `via`: `src/core/helpers.ts:685`, `:803`; `src/core/inferers.ts:66`, `:88`;
   `src/core/shapers.ts:32`, `:100`; `guides/csv.md:116`, `:137`, `:150`, `:219`, `:220`, `:259`;
   `tests/src/core/helpers.test.ts:336`, `:425`, `:850`; `tests/src/core/shapers.test.ts:7`;
   `tests/src/core/CSV.test.ts:24`, `:118`. Causal `since`: `src/core/parsers.ts:63`;
   `tests/distribution.test.ts:28`. Several sit in blocks this unit re-flowed or moved, which is the
   reasoning R-A gives for its own site, so a vocabulary sweep over the package is the successor
   unit that closes the class rather than its members one at a time.
3. `R3`, recorded in the first round and still open: the brief at
   `/home/user/scaffold/tmp/units/conform/conform-csv-brief.md:212` names the report path as
   `/home/user/fleet/csvRT_PATH`, an unsubstituted template token where `REPORT_PATH` belonged. The
   brief is off-limits to this unit, so this is report-only. This round's dispatch names the report
   path directly, which is the path this file was written to; correct the brief before the unit is
   re-dispatched from what the campaign kept.

The first round's findings on the `src/core/types.ts` header, on the `ColumnType` and `Columns`
remarks, and on the ungated `guides/csv.md:412` export fence are closed. The objective lane
substantiated them as F1 and F2, and § Fix round 1 records each repair.

Referrals R1 and R2, recorded in the first round, stand unchanged: R1, the `#carry` design question,
is the subjective lane's to rule on, and R2, whether `key` becomes `primary`, is a breaking decision
the refuter reserved for the Orchestrator.

## Ancillary decisions

Recorded rather than escalated, per the deviation contract.

1. **`requireValue` around every indexed shape lookup.** The brief's operative form for csv-obj-11
   and the CSV.test.ts case writes `createContract(columns.a)` directly. `tsconfig.json` sets
   `noUncheckedIndexedAccess`, so that expression is `ContractShape | undefined` and does not compile,
   and neither `!` nor `as` is available. Each site reads
   `createContract(requireValue(columns.a, 'no shape derived for column a'))`, using
   `@orkestrel/test`'s declared helper. The property the row names — an executed contract assertion
   that the wrong branch fails — is unchanged.
2. **`ROOT_FILES` now reads `['README.md']`.** csv-obj-12 needs the README text through the `files`
   inventory, and after csv-subj-6 deleted the `AGENTS.md` link bullets no manifest guide links that
   file. The brief calls the removal safe and optional; leaving a dead entry is residue the cleanup
   sweep bans.
3. **The `@src/core` import statements in `helpers.test.ts` merged into one sorted block.** The file
   opened with `import { isCSVError } from '@src/core'` above a separate block from the same
   specifier, and csv-obj-13 and csv-obj-14 add names to it.
4. **`createTableContract` dropped from the interop sentence.** csv-subj-4 directs a restatement of
   `guides/csv.md` § Database interop without dependency to what is true. The sentence claimed
   `CSVInterface.export` "(and the standalone `createTableContract` factory)" produce a `TableExport`;
   `createTableContract` returns `ContractInterface<Row>` (`src/core/factories.ts`). The restated
   sentence names `CSVInterface.export` alone rather than repeating a false claim inside a line the
   row rewrites.
5. **The `TableExport` row of the guide's Types table restated.** It read "mirroring
   `@orkestrel/database`'s `TableExport` member-for-member" — the exact claim csv-subj-4 forbids —
   and leaving it would have made the guide contradict the passage the row directs me to rewrite. It
   now reads "`columns` matches `@orkestrel/database`'s `ColumnMap` structurally". Fix round 1
   brought the `ColumnType` and `Columns` rows to the same standard under F1.
6. **The `## Tests` bullets for `helpers.test.ts` and `parsers.test.ts` rewritten.** csv-obj-14 moves
   describes between those files, so the guide's description of each was false the moment the
   move landed.
7. **Comment blocks rewrapped where a deleted citation left a ragged line**, in `src/core/errors.ts`,
   `src/core/constants.ts`, `src/core/shapers.ts`, `src/core/validators.ts`, and the tagline, Errors intro, Helpers intro,
   error-model, and streaming paragraphs of `guides/csv.md`. No wording changed beyond the citation removals the rows require.
   Fix round 1 rewrapped the `src/core/types.ts` header block on the same basis.
8. **The stale count in the `tests/guides.test.ts` header comment deleted.** It read "The four
   constants below are this package's own"; csv-obj-12 adds `CORE_GUIDE` and `PACKAGE_README`, and
   `AGENTS.md` § Writing deletes a count rather than correcting it.
9. **New describes placed by subject.** `assertValidSeparators` sits first, ahead of
   `resolveParseOptions` and `resolveRenderOptions`, which call it; `advancePosition` and `isBreakChar` head the moved tokenizer group, ahead of
   `scanBreak`.
10. **The export-key case placed by guide order.** F2's case sits between the strict-error case and
    the contract case in `describe('flagship fences')`, matching the order of § Exporting a portable
    schema and § Contract-backed row validation in `guides/csv.md`.
11. **Every fix round 2 command ran as `npm --prefix /home/user/fleet/csv run <script>`.** This
    round's shell starts in `/home/user/scaffold` and the dispatch bars a `cd … &&` chain, so the
    prefix flag is what puts each script in the subject checkout. Vitest reports
    `RUN v4.1.11 /home/user/fleet/csv` under every reading, which is the check that the root
    resolved.
12. **The diff evidence file was written with `git diff HEAD --output=<path>`.** The dispatch bars a
    heredoc and every scripted writer, and transcribing the diff by hand would make the evidence a
    retyping rather than the command's output. The `--output` flag is `git diff`'s own, so the file
    is the command's bytes. `/home/user/work/evidence/conform-csv.status` is 20 short lines and was
    written from the `git status --short` output read in the same round.

## Deviations

None is a stop: a wording departure in F1, R-C carried to a successor unit, and a location the first
round recorded wrongly.

**F1's `ColumnType` replacement wording.** The objective lane prescribed stating that no
`@orkestrel/database` type named `ColumnType` exists. I wrote the measured name instead — the
sibling declares the same literal set as `ColumnStorage` at
`/home/user/fleet/database/src/core/types.ts:254`, which the lane's grep pattern
(`ColumnType|\bColumns\b|TableExport`) could not reach. The lane's sentence is true and incomplete;
the form I wrote is the one the lane itself prescribes for `Columns`/`ColumnMap` on the adjacent
line. Recorded here rather than escalated, per the deviation contract's ancillary clause.

**R-C not applied.** The lane names the defect and prescribes a separate unit for it, and this
round's dispatch bars widening the unit. The repair's own gate, `npm run test:distribution`, packs
and installs, which this unit is forbidden to run, so applying the swap here would land an unproven
narrowing change in the file that drives the release gate. § Fix round 2, R-C records the
measurement; § Findings outside the rows carries it forward.

**The csv-subj-5 control's recorded location was wrong in the first round.** Expected, from
report round 1: the control reddens `tests/src/core/parsers.test.ts(310,44)`, `(313,47)`,
`(318,54)`. Found, on re-running it: `npm run check` exits 2 with the same column offsets at
`tests/src/core/helpers.test.ts(784,44)`, `(787,47)`, `(792,54)`, because csv-obj-14 moved the
`blanks` case into the helpers mirror inside the same round. Done: the control is re-taken and the
row restated. Not done: nothing. Hypothesis: the first round recorded the control at the coordinates
it held when the control ran, before the move landed, and did not re-read it afterwards.

No row's repair contradicted a rule, collided with an existing name, required a file outside Owned,
or required a consumer edit to keep this package's gates green.

## Evidence files

- `/home/user/work/evidence/conform-csv.diff` — `git diff HEAD --output=…`, taken 2026-09-03. No
  untracked file was created in either fix round, so `git add -N` had nothing to stage.
- `/home/user/work/evidence/conform-csv.status` — `git status --short`, 20 lines, every path under
  Owned.
