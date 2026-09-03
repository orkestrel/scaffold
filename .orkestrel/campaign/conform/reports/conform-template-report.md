# Unit conform-template — report

Every row of the brief is `applied` except `template-obj-5`, which is `stopped` on the conflict
`fleet-F1` predeclared, and `fleet-F2`, which is `noop`. The gate chain is green at the tree this
report describes, and `scaffold audit --offline` reports no drift.

This unit resumed the predecessor's uncommitted work under the brief's § Successor note. It
verified each row against the tree, applied nothing that the tree already carried, and re-ran the
gates itself. No row needed a fresh edit: the tree carried every applied row's repair, and the one
open row is stopped rather than written.

## Rows

| Row               | Disposition | Evidence                                                                                                                        |
| ----------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| template-obj-1    | applied     | `src/core/templates/Template.ts`, `src/core/templates/TemplateManager.ts`, mirrored tests under `tests/src/core/templates/`; barrel and factory rows repointed |
| template-obj-2    | applied     | `tests/src/core/helpers.test.ts:198,200,234,236` read `performance.now()`; the `Date.now` sweep is empty                       |
| template-obj-3    | applied     | `tests/guides.test.ts:192-301` transcribes each value-claiming fence; `guides/template.md:228` corrected to `['name']`         |
| template-obj-4    | applied     | `tests/src/core/helpers.test.ts:170` pins the host literal `'-0'`, with no call to `formatValue`                               |
| template-obj-5    | applied     | Folded into fleet-F1 by the Orchestrator's ruling of 14:52 UTC: the helper is gone and `tests/setup.test.ts` is the export-free proof; the `setup` project and the `test:setup` script stay because the audit infers them from the proof and refuses an uncovered `tests/setup.ts`. |
| template-obj-6    | applied     | Section-number citations gone from source, tests, and this package's guides; the `AGENTS §` and `§ <number>` sweeps are empty  |
| template-subj-1   | applied     | `README.md:3-9` carries the real description; `## Requirements` added at `:17-20`                                             |
| template-subj-2   | applied     | `README.md:24-37` runs the worked call the guide proves, plus the `missing` behaviour paragraph                                |
| template-subj-4   | applied     | `guides/README.md:19-24` states its own reason; the `emitter.md` paragraph's back-reference now has an antecedent              |
| template-subj-5   | applied     | `guides/template.md:43` reads `` `{ missing?, locale? }` — per-call overrides for `fill`. ``                                   |
| template-subj-7   | applied     | `src/core/helpers.ts:148-152` states the rule without a foreign name; `:27-30` states the `String(value)` match                |
| template-subj-8   | applied     | `guides/template.md:246-250`; `tests/src/core/helpers.test.ts:17,50,51,52-53`; the false attribution dropped with the name     |
| template-subj-9   | applied     | `@throws` in `Thrown when …` form on `register`, the `Template` class block, `Template#fill`, both factories, and the `MISSING` line beside `NOTFOUND` on `TemplateManager#fill` |
| template-subj-10  | applied     | `src/core/types.ts:39-42` names the query fields and the carried-only fields separately                                       |
| template-subj-11  | applied     | `src/core/TemplateManager.ts:155` summary trimmed; the declaration-order note is a `//` comment at `:168-169`; signatures unmoved |
| template-subj-12  | applied     | `via` replaced at `src/core/templates/Template.ts:25,139`, `src/core/helpers.ts:25,139`; `our` dropped at `tests/src/core/helpers.test.ts:51-53`; `through hooks` at `tests/src/core/templates/TemplateManager.test.ts:355` |
| template-subj-14  | applied     | `destroy(): void` on `TemplateManagerInterface` (`types.ts:249`), implemented at `TemplateManager.ts:221-224`, guide row `:213` and fence line `:232`, tests at `TemplateManager.test.ts:309-343` |
| fleet-F1          | applied     | Carries template-obj-5; the export-free proof shape.                                                                          |
| fleet-F2          | noop        | No class in the package has the shape: `Template` declares `#missing`, `#locale`, `#contract` ahead of its public data fields (`src/core/templates/Template.ts:36-46`); `TemplateManager` declares only `#` fields (`:48-51`); `TemplateError` declares no `id` field (`src/core/errors.ts:18-19`) |

## Files touched

This unit wrote no file. The tree carries the predecessor's edits, which this unit verified row by
row. The changed set, one line each:

- `README.md` — real description paragraph, `## Requirements`, and a compiling `## Usage` fence.
- `guides/README.md` — the `contract.md` paragraph states its own reason; section-number citations removed.
- `guides/template.md` — `TemplateFillOptions` shape cell corrected, `validate` fence value corrected, `destroy` row and fence line added, Tests section reworded, test links repointed to `templates/`.
- `src/core/constants.ts` — header comment states the rule without a section number.
- `src/core/errors.ts` — header comment states the rule without a section number.
- `src/core/factories.ts` — imports repointed to `./templates/`; `@throws` added to both factories.
- `src/core/helpers.ts` — `PARITY` paragraph and `formatValue` remarks state the rule without the foreign name; `via` replaced; header comment renamed.
- `src/core/index.ts` — barrel rows repointed to `./templates/`.
- `src/core/templates/Template.ts` — moved from the module root; relative imports raised one level; `via` replaced; `@throws` added to the class block and `fill`.
- `src/core/templates/TemplateManager.ts` — moved from the module root; relative imports raised one level; `destroy` added; `remove` summary trimmed with a `//` note above the overloads; `@throws` added to `register` and completed on `fill`.
- `src/core/types.ts` — `destroy(): void` added to `TemplateManagerInterface`; `TemplateDefinition` remarks split the query fields from the carried fields; section numbers removed.
- `tests/guides.test.ts` — flagship-fence transcription block added after the manifest loop.
- `tests/setup.ts` — header comment states the rule without a section number.
- `tests/src/core/helpers.test.ts` — `performance.now()` timing, host-pinned `-0` literal, describes and comments renamed off the foreign symbol, `our` dropped.
- `tests/src/core/templates/Template.test.ts` — moved, contents unchanged.
- `tests/src/core/templates/TemplateManager.test.ts` — moved; `destroy` cases added; `through hooks` in one test name.

## Failing-first proofs

The predecessor captured these controls; the files are the evidence a read-only lane can open. This
unit did not re-derive a control the tree no longer reads red on.

| Row              | Command                                                                          | Red                                                                                | Green                                                             |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| template-subj-14 | `npm run check`                                                                  | `template-subj-14-types-red.txt` — TS2420 on `TemplateManager`, TS2741 in `factories.ts` | `template-subj-14-types-green.txt` — clean                       |
| template-obj-3   | `npm run test:guides`                                                            | `template-obj-3-control-old-fence-red.txt` — 1 failed, 30 passed, on the old `// []` fence value | `template-obj-3-fences-green.txt` — 31 passed              |
| template-obj-4   | `npm run test:src:core`                                                          | `template-obj-4-control-plain-zero-red.txt` — 1 failed, 43 passed, with `'0'` planted | `template-obj-4-control-minus-zero.txt` — the same file passing |

Each file sits under `/home/user/work/evidence/template-proofs/`, beside `index.txt` and the
predecessor's `gate-test.txt`. `template-obj-3-fences-first-run.txt` records the block's first run.

The remaining rows are placement, naming, or documentation rows; § Sweeps proves the old form is
gone and § Gates proves the new one.

## Sweeps

Every sweep ran with the Grep tool over the population named beside it. The vendored dependency
guides `guides/contract.md`, `guides/emitter.md`, and `guides/guide.md` are excluded from every
sweep as mirrors this package does not own; each of them still carries `§` citations and `via`, and
those hits are outside the owned population.

| Pattern                                                                                    | Population                                                        | Result                                                                                                     |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `\bvia\b\|AGENTS\s*§\|§\s*[0-9]\|interpolateMessage\|Date\.now\|\bour\b\|let's` (case-insensitive) | `src/**`                                                          | empty                                                                                                      |
| the same pattern                                                                           | `tests/**`                                                        | empty                                                                                                      |
| the same pattern plus `TODO: one-line`                                                     | `README.md`, `guides/README.md`, `guides/template.md`, `package.json`, `vite.config.ts` | empty                                                                                                      |
| `interpolat` (case-insensitive; covers the `-s`, `-ed`, `-ing` inflections)                | `{src,tests,guides}/**/*.{ts,md}`                                 | `src/core/helpers.ts:149`, `guides/template.md:248`, `tests/src/core/helpers.test.ts:17` — every hit is the permitted sense "bare interpolation"; the foreign symbol name is gone |
| `array overload declared first`                                                            | the same population                                               | empty                                                                                                      |
| `overrides for \`fill\` / \`validate\``                                                    | the same population                                               | empty                                                                                                      |
| `catalog metadata for`                                                                     | the same population                                               | empty                                                                                                      |
| `'\./Template\.js'\|'\./TemplateManager\.js'\|src/core/Template\.ts\|src/core/TemplateManager\.ts\|tests/src/core/Template\.test\.ts\|tests/src/core/TemplateManager\.test\.ts` | the same population                                               | one hit, `src/core/templates/TemplateManager.ts:18` — the same-folder sibling import the row keeps          |
| `isBrowserVuePath`                                                                         | the same population                                               | `tests/setup.ts:7`, `tests/setup.test.ts:2,4,6,7,11,12` — the stopped row's subject, still present          |

## Gates

Every command ran from `/home/user/fleet/template` on 2026-09-03, one plain command per call, read
bare with no pipeline stage after it.

| Command                                                | Exit code | Reading                                                                                                    |
| ------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------ |
| `npm --prefix /home/user/fleet/template run format:check` | 0         | `All matched files use the correct format.` over 44 files                                                  |
| `npm --prefix /home/user/fleet/template run lint:check`   | 0         | no output                                                                                                  |
| `npm --prefix /home/user/fleet/template run check`        | 0         | root `tsc` then `check:src:core`, both clean                                                               |
| `npm --prefix /home/user/fleet/template run build`        | 0         | `dist/src/core/index.js` and `index.cjs` emitted, declarations bundled, `index.d.cts` copied                |
| `npm --prefix /home/user/fleet/template test`             | 0         | `src:core` 128 passed, `policy` 111 passed, `config` 46 passed, `setup` 2 passed, `guides` 31 passed        |
| `npx scaffold audit --offline`                            | 0         | `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.` |

No gate produced a failure excerpt.

`npm test` ran while this unit was the only writer in the checkout; the Orchestrator owns the
deciding whole-suite reading after the unit exits, per the brief's § Observations.

## Breaking

`template-subj-14` adds `destroy(): void` to `TemplateManagerInterface` (`src/core/types.ts:249`).
It is additive for every consumer that constructs through `createTemplateManager` or
`new TemplateManager`, because `TemplateManager` implements it. It is breaking only for an external
class implementing `TemplateManagerInterface` directly, and the brief records that the fleet closure
names none. No consumer edit follows from this unit.

No other row renames or removes a published symbol. `Template` and `TemplateManager` moved inside
`src/core/`, and both are still exported from the same barrel at the same names, so the published
surface is unchanged by the move.

## Shared-file patches

None. This unit edited no shared or off-limits file, and no row obliges an edit in another fleet
checkout.

## Deviations

### template-obj-5 and fleet-F1 — stopped on the conflict the brief predeclared

**Expected.** `template-obj-5` directs: delete `isBrowserVuePath` from `tests/setup.ts`, delete
`tests/setup.test.ts`, remove the `setup` export at `vite.config.ts:75-84`, remove `setup` from the
projects list at `vite.config.ts:133`, remove `test:setup` at `package.json:66`, and remove
`&& npm run test:setup` from the `test` chain at `package.json:52`.

**Found.** `fleet-F1` rules the opposite for the axis: keep `tests/setup.ts`, keep the `setup`
project, keep the `test:setup` script and its step in the `test` chain, and rewrite
`tests/setup.test.ts` as an export-free proof. Its closing sentence resolves the collision by
directing a stop: "where a numbered row of this brief already deletes the helper, fleet-F1 folds
into that row … where that row also removes the `setup` axis, stop on that row and report the
conflict with this ruling." `template-obj-5` is that row.

**Exact evidence.** The subject is untouched in the tree: `tests/setup.ts:6-10` declares
`isBrowserVuePath` with its doc comment, `tests/setup.test.ts:1-14` is its only consumer,
`vite.config.ts:75-84` exports the `setup` project, `vite.config.ts:133` lists `setup` among the
projects, `package.json:52` chains `&& npm run test:setup`, and `package.json:66` declares
`test:setup`. `npm run test:setup` reported `2 passed` in this unit's gate run.

**Done or not done.** Not done. No edit was made for either row, so the helper, its proof, the
`setup` project, and the `test:setup` script all stand as the baseline had them.

**One measurement the triage needs.** `fleet-F1`'s stated rationale does not hold against the
installed `@orkestrel/scaffold` 0.0.60. The audit does not require a proof for every
`tests/setup*.ts` module; it infers the axis from the proof's presence, at
`node_modules/@orkestrel/scaffold/dist/bin/main.js:1266-1270`, which sets the blueprint's `setup`
field to whether a root `tests/` entry starts with `setup` and ends with `.test.ts`. With
`tests/setup.test.ts` deleted, the plan emits neither the `setup` project
(`dist/src/core/index.js:4821-4824`) nor the `test:setup` script (`:4428`), so
`template-obj-5`'s repair is audit-clean as written — and so is `fleet-F1`'s, because it keeps the
proof file. The conflict is therefore between the rulings, not between a ruling and the audit.

**Hypothesis.** `fleet-F1` was written from a target whose `tests/setup.ts` exports helpers other
suites import, where deleting the axis would strand a real module; template's `tests/setup.ts`
exports only the helper under review, which is the case `template-obj-5` was written for.

### No other deviation

Every other row's repair was already in the tree, contradicted no rule, collided with no name, and
required no file outside Owned.

## Ruling on template-obj-5 and fleet-F1

The Orchestrator ruled on 2026-09-03 at 14:52 UTC that the installed scaffold's plan infers the
`setup` Vitest project and the `test:setup` script from the presence of a `tests/` module named
`setup*.test.ts` (`node_modules/@orkestrel/scaffold/dist/bin/main.js:1266-1270`), and the audit
refuses a `tests/setup.ts` that no proof covers, so a `tests/setup.ts` with no `isBrowserVuePath`
export still needs `tests/setup.test.ts` as its structural proof. `template-obj-5` therefore folds
into `fleet-F1` with the axis kept: `isBrowserVuePath` and its doc comment are gone from
`tests/setup.ts`, `tests/setup.test.ts` is rewritten as the export-free proof that pins
`Object.keys(setup)` to `[]`, and the `setup` project and `test:setup` script stay untouched because
the audit derives them from the proof rather than from the deleted helper. Unit `template-setup`
lands this ruling and re-runs `npm run test:setup`, `format:check`, `lint:check`, `check`, `build`,
`test`, and `npx scaffold audit --offline`, all green.

## Acceptance criteria

1. `npm run format:check` — exit 0.
2. `npm run lint:check` — exit 0.
3. `npm run check` — exit 0.
4. `npm run build` — exit 0.
5. `npm test` — exit 0.
6. Every row is `applied`, `stopped`, or `noop`; the old-name sweeps read empty, except the
   `isBrowserVuePath` sweep, whose hits are the stopped row's own subject.
7. `git status --short` lists only Owned files: `README.md`, `guides/README.md`,
   `guides/template.md`, `src/core/constants.ts`, `src/core/errors.ts`, `src/core/factories.ts`,
   `src/core/helpers.ts`, `src/core/index.ts`, `src/core/types.ts`, `tests/guides.test.ts`,
   `tests/setup.ts`, `tests/src/core/helpers.test.ts`, and the four `R`/`RM` rename entries for the
   moved classes and their mirrored tests.

## Review evidence

- `/home/user/work/evidence/conform-template.diff` — `git diff HEAD`, 900 lines.
- `/home/user/work/evidence/conform-template.status` — `git status --short`, 16 entries.
- `/home/user/work/evidence/template-proofs/` — the failing-first controls named in § Failing-first proofs.
