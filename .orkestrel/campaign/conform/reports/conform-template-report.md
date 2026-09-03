# Unit conform-template — report

`/home/user/scaffold/tmp/units/followon/template-setup-brief.md` and `template-setup-report.md` are
the pair that landed `template-obj-5` and `fleet-F1` and supersede their earlier disposition below.

Every row of the brief landed: `template-obj-5` and `fleet-F1` through the `template-setup` unit,
and every other row `applied` except `fleet-F2`, which is `noop`. The gate chain is green at the
tree this report describes, and `scaffold audit --offline` reports no drift.

This unit resumed the predecessor's uncommitted work under the brief's § Successor note. It
verified each row against the tree, applied nothing that the tree already carried, and re-ran the
gates itself. No row needed a fresh edit: the tree carried every row's repair, including
`template-obj-5` and `fleet-F1`, landed by the `template-setup` unit under the Orchestrator's
ruling.

## Rows

| Row               | Disposition | Evidence                                                                                                                        |
| ----------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| template-obj-1    | applied     | `src/core/templates/Template.ts`, `src/core/templates/TemplateManager.ts`, mirrored tests under `tests/src/core/templates/`; barrel and factory rows repointed |
| template-obj-2    | applied     | `tests/src/core/helpers.test.ts:198,200,234,236` read `performance.now()`; the `Date.now` sweep is empty                       |
| template-obj-3    | applied     | `tests/guides.test.ts:192-301` transcribes each value-claiming fence; `guides/template.md:228` corrected to `['name']`         |
| template-obj-4    | applied     | `tests/src/core/helpers.test.ts:170` pins the host literal `'-0'`, with no call to `formatValue`                               |
| template-obj-5    | applied     | Folded into fleet-F1 by the Orchestrator's ruling of 14:52 UTC: the helper is gone and `tests/setup.test.ts` is the export-free proof; the `setup` project and the `test:setup` script stay because `tests/setup.ts` is `setupFiles[0]` of every project, and the proof plus the axis is the audit-clean shape that runs the guard — an uncovered `tests/setup.ts` with no axis is audit-clean too, but the fleet keeps the shape that runs the guard. |
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

This unit wrote no source file. The tree carries the predecessor's edits for every row but
`template-obj-5`/`fleet-F1`, which this unit verified row by row; the `template-setup` unit wrote
the setup pair below, and this unit's successor implementer wrote nothing in the checkout. The
changed set, one line each, matching `/home/user/work/evidence/conform-template.status` entry for
entry:

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
- `tests/setup.test.ts` — written by the `template-setup` unit as the export-free proof, pinning `Object.keys(setup)` to `[]`.
- `tests/setup.ts` — written by the `template-setup` unit: header comment states the rule without a section number; `isBrowserVuePath` and its doc comment removed.
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
| template-obj-5   | `npm run test:setup`                                                             | `template-obj-5-control-red.txt` — 1 failed, planted `export const planted = 1` in `tests/setup.ts` | `template-obj-5-green.txt` — 1 passed, plant removed |

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
| `interpolat` (case-insensitive; covers the `-s`, `-ed`, `-ing` inflections)                | `src`, `tests`, `README.md`, `guides/README.md`, `guides/template.md` | `src/core/helpers.ts:149`, `guides/template.md:248`, `tests/src/core/helpers.test.ts:17` — every hit is the permitted sense "bare interpolation"; the foreign symbol name is gone |
| `array overload declared first`                                                            | the same population                                               | empty                                                                                                      |
| `overrides for \`fill\` / \`validate\``                                                    | the same population                                               | empty                                                                                                      |
| `catalog metadata for`                                                                     | the same population                                               | empty                                                                                                      |
| `'\./Template\.js'\|'\./TemplateManager\.js'\|src/core/Template\.ts\|src/core/TemplateManager\.ts\|tests/src/core/Template\.test\.ts\|tests/src/core/TemplateManager\.test\.ts` | `src`, `tests`, `README.md`, `guides/README.md`, `guides/template.md` | one hit, `src/core/templates/TemplateManager.ts:18` — the same-folder sibling import the row keeps          |
| `isBrowserVuePath` (case-insensitive)                                                       | `src`, `tests`, `README.md`, `guides/README.md`, `guides/template.md` | empty                                                                                                      |

## Gates

Every command ran from `/home/user/fleet/template` on 2026-09-03 against the landed tree, with
`node_modules` staged with the fleet closure. Each capture sits under
`/home/user/work/evidence/template-proofs/gate-<script>-landed.txt`, one plain command per call, read
bare with no pipeline stage after it. These captures overwrite the first fix-round run's partial
set, which stopped on `check` before the closure was re-staged.

| Command                                                | Exit code | Reading                                                                                                    | Capture                          |
| ------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `npm --prefix /home/user/fleet/template run format:check` | 0         | `All matched files use the correct format.` over 44 files                                                  | `gate-format-check-landed.txt`    |
| `npm --prefix /home/user/fleet/template run lint:check`   | 0         | no output                                                                                                  | `gate-lint-check-landed.txt`      |
| `npm --prefix /home/user/fleet/template run check`        | 0         | root `tsc` then `check:src:core`, both clean                                                               | `gate-check-landed.txt`           |
| `npm --prefix /home/user/fleet/template run build`        | 0         | `dist/src/core/index.js` and `index.cjs` emitted, declarations bundled, `index.d.cts` copied                | `gate-build-landed.txt`           |
| `npm --prefix /home/user/fleet/template test`             | 0         | `src:core` 128 passed, `policy` 111 passed, `config` 46 passed, `setup` 1 passed, `guides` 31 passed        | `gate-test-landed.txt`            |
| `npx scaffold audit --offline`                            | 0         | `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.` | `audit-landed.txt`                |

No gate produced a failure excerpt. The predecessor's `gate-test.txt` (14:40 UTC, `setup 2 passed`)
predates the `template-setup` unit's landing of the export-free proof, which reduced the `setup`
project to 1 test; it is superseded by `gate-test-landed.txt`.

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

### template-obj-5 and fleet-F1 — closed under § Ruling

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

**Exact evidence.** The subject is landed in the tree: `tests/setup.ts:1-5` carries only the header
comment, `isBrowserVuePath` and its doc comment are gone; `tests/setup.test.ts:1-13` is the
export-free proof, pinning `Object.keys(setup)` to `[]`; `vite.config.ts:75-84` still exports the
`setup` project and `vite.config.ts:133` still lists `setup` among the projects; `package.json:52`
still chains `&& npm run test:setup` and `package.json:66` still declares `test:setup`. `npm run
test:setup` reads `1 passed` in this unit's landed-tree gate run
(`/home/user/work/evidence/template-proofs/gate-test-landed.txt:57`).

**Done or not done.** Done. The `template-setup` unit landed both rows; this unit made no edit.

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

Orchestrator's ruling (audit round 2): the row-3 control planted its export in `tests/setup.ts`, a
file this unit's status lists, because the proof's subject is that file's own export set and no
other file can redden it; the plant's removal is verified by the diff, and the plant rule's
exception for a proof over the planted file's own surface carries to scaffold's L3 unit.

### No other deviation

Every other row's repair was already in the tree, contradicted no rule, collided with no name, and
required no file outside Owned.

## Ruling on template-obj-5 and fleet-F1

The Orchestrator ruled on 2026-09-03 at 14:52 UTC that the installed scaffold's plan infers the
`setup` Vitest project and the `test:setup` script from the presence of a `tests/` module named
`setup*.test.ts` (`node_modules/@orkestrel/scaffold/dist/bin/main.js:1266-1270`) — the ruling that
closed `fleet-F1`'s own emitter at 13:04 UTC, after that unit deleted the proof and kept the module,
where the `setup` axis is declared. This unit's measurement at § Deviations shows that with the
proof deleted, the plan infers neither the `setup` project nor the `test:setup` script, so an
uncovered `tests/setup.ts` with no axis is audit-clean too. The ruling rests on the structural
reason alone: `tests/setup.ts` stays as `setupFiles[0]` of every project, so the export-free proof
is what guards that loading it first contributes nothing, and the axis the plan infers from the
proof's presence is the mechanism that runs the guard. Two shapes are audit-clean — the proof
deleted with no axis, and the proof plus the axis that runs the guard — and the fleet keeps the one
that runs the guard. `template-obj-5` therefore folds into `fleet-F1` with the axis kept: `isBrowserVuePath` and its doc
comment are gone from `tests/setup.ts`, `tests/setup.test.ts` is rewritten as the export-free proof
that pins `Object.keys(setup)` to `[]`, and the `setup` project and `test:setup` script stay
untouched because the audit derives them from the proof rather than from the deleted helper. Unit
`template-setup` lands this ruling and re-runs `npm run test:setup`, `format:check`, `lint:check`,
`check`, `build`, `test`, and `npx scaffold audit --offline`, all green.

## Acceptance criteria

1. `npm run format:check` — exit 0.
2. `npm run lint:check` — exit 0.
3. `npm run check` — exit 0.
4. `npm run build` — exit 0.
5. `npm test` — exit 0.
6. Every row is `applied` or `noop`; every old-name sweep reads empty.
7. `git status --short` lists only Owned files: `README.md`, `guides/README.md`,
   `guides/template.md`, `src/core/constants.ts`, `src/core/errors.ts`, `src/core/factories.ts`,
   `src/core/helpers.ts`, `src/core/index.ts`, `src/core/types.ts`, `tests/guides.test.ts`,
   `tests/setup.test.ts`, `tests/setup.ts`, `tests/src/core/helpers.test.ts`, and the four `R`/`RM`
   rename entries for the moved classes and their mirrored tests.

## Review evidence

- `/home/user/work/evidence/conform-template.diff` — `git diff HEAD`, 933 lines.
- `/home/user/work/evidence/conform-template.status` — `git status --short`, 17 entries.
- `/home/user/work/evidence/template-proofs/` — the failing-first controls named in § Failing-first proofs.

## Fix round 1

Round 1's dispatch ran twice. The first run applied Claim 1 (dispositions), Claim 3 (sweeps), and
Claim 4 (the setup row's control) against a tree whose `node_modules/@orkestrel/guide` had been
replaced by a registry install at 15:35 UTC, then stopped at F1 (gates) when `npm run check` exited
2 on `tests/guides.test.ts` importing `computeSymbolKey`, `extractFenceImports`, and
`findMissingSymbols` — symbols the registry package does not carry. The Orchestrator re-staged the
fleet closure into `node_modules` at 16:21 UTC. This run:

- **Claim 1 (dispositions).** Verified against the tree: the opening paragraph's `stopped` sentence
  was still present, so it is struck and replaced; the § Deviation heading is retitled "closed under
  § Ruling"; the Exact-evidence block is rewritten for the landed state.
- **Claim 3 (sweeps).** The `isBrowserVuePath` sweep row still read "still present" against a tree
  where the helper is already gone; re-ran the sweep over `src/`, `tests/`, and `guides/` (Grep
  tool) and rewrote the row to `empty`. Every other sweep row was already current.
- **Claim 4 (setup row's control).** The row was missing from § Failing-first proofs; the first
  run's capture files (`template-obj-5-control-red.txt`, 1 failed; `template-obj-5-green.txt`, 1
  passed) were read and confirmed correct, and the row is added to the table.
- **F1 (gates).** Re-ran every gate against the re-staged closure, overwriting the stale
  `gate-check-landed.txt` (which had carried the pre-restage TS2305/TS2724 failures): `format:check`
  exit 0, `lint:check` exit 0, `check` exit 0, `build` exit 0, `test` exit 0 (`src:core` 128 passed,
  `policy` 111 passed, `config` 46 passed, `setup` 1 passed, `guides` 31 passed), `npx scaffold
  audit --offline` exit 0 (`0 of 34 planned paths drifted`). § Gates rewritten with capture file
  names and the note that the predecessor's `gate-test.txt` (14:40 UTC, `setup 2 passed`) predates
  the setup landing.
- **F2 (files touched).** Rewrote the section to name the `template-setup` unit as writer of
  `tests/setup.ts` and `tests/setup.test.ts`, and this unit's successor implementer as writer of
  nothing; added the missing `tests/setup.test.ts` line and corrected the `tests/setup.ts` line;
  matched the changed set to `conform-template.status` entry for entry (17 entries).
- **F3 (acceptance criteria).** Dropped the `isBrowserVuePath` exception from criterion 6; corrected
  criterion 7's enumeration to include `tests/setup.test.ts` and the correct rename count (four, not
  five).
- **R1 (ruling's rationale).** Rewrote § Ruling to state the `setupFiles[0]`/structural-file
  reasoning and the emitter's 13:04 UTC ruling, keeping the measurement at § Deviations as its
  evidence.
- **R2 (supersession).** Added the sentence at the head of the report naming
  `template-setup-brief.md` and `template-setup-report.md` as the pair that landed the two rows.

`node /home/user/scaffold/tmp/work/evidence.mjs template` re-ran, reporting the diff at 933 lines
and the status at 17 entries. `git -C /home/user/fleet/template diff -- tests/setup.ts` shows only
the landed header-comment and helper-removal hunk, confirming no plant remains from this round.

### Fix round 2

- **Claim 1 (setup rows' disposition).** § Deviations' "Done or not done" sentence read "Not done"
  against a tree where the `template-setup` unit had already landed both rows; replaced with "Done.
  The `template-setup` unit landed both rows; this unit made no edit." The Exact-evidence
  paragraph's `npm run test:setup` reading was `2 passed`, stale against the export-free proof;
  corrected to `1 passed`, citing `gate-test-landed.txt:57`.
- **Claim 3 (sweep population).** The three sweep rows for `interpolat`, the old-path-import
  pattern, and `isBrowserVuePath` named the population `{src,tests,guides}/**/*.{ts,md}`, which
  omits `README.md`; restated the population as `src`, `tests`, `README.md`, `guides/README.md`,
  `guides/template.md`, marked the `isBrowserVuePath` row case-insensitive, and re-ran each pattern
  with the Grep tool over that population, reading the same results the report already carried.
- **R1 (ruling's falsified clause).** § Ruling and the `template-obj-5` row cell stated that the
  audit refuses a `tests/setup.ts` that no proof covers, a clause this unit's own measurement at
  § Deviations falsifies: with the proof deleted, the plan infers neither the `setup` project nor
  the `test:setup` script, so an uncovered `tests/setup.ts` is audit-clean too. Struck the clause
  and restated the ruling on the structural reason alone — `tests/setup.ts` stays as
  `setupFiles[0]` of every project, the proof guards that loading it first contributes nothing, and
  the axis is the mechanism that runs the guard — naming both audit-clean shapes and that the fleet
  keeps the one that runs the guard.
- **R2 (plant's carrying exception).** Added the Orchestrator's ruling on the row-3 control's plant
  under § Deviations, naming `tests/setup.ts` as the planted file, the diff as the plant's removal
  evidence, and the plant rule's exception for a proof over its own planted file's surface as
  carrying to scaffold's L3 unit.
