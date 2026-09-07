# Report — `d7n-console-converge-fix`

`implementer` on Claude Opus 5, `/home/user/fleet/console`, from `10b4f2c`. Resumed run:
2026-09-07 20:23Z to 20:43Z (the earlier terminated run's edits were already in the tree).

## Ruling on the partial hunks the terminated run left

The prior run had done item C2's source half only: `git diff` at resume carried
`src/browser/{constants,types}.ts`, `src/core/{Progress,Styler,constants,factories,helpers,types}.ts`,
`src/server/{constants,factories,helpers,types,validators}.ts` — link restorations, no other item.

- **Kept**: every restored `{@link import('./x.js').Name}` tag. Comparing the tag inventory of
  `f93a2f4` (pre-converge), `10b4f2c`, and the tree shows every tag the converge flattened is back,
  and no tag that pre-converge lacked was invented.
- **Kept with a recorded departure**: `{@link import('./types.js').BarOptions.fill}`,
  `{@link import('./types.js').BarOptions.empty}`, and
  `{@link import('./types.js').ReporterOptions.width}`. Pre-converge wrote the tag and the member as
  two spans — ``{@link import('./types.js').BarOptions}`.fill` `` — which the installed reader renders
  as two adjacent code spans in the cell. The member-inside-the-tag form renders as the single span
  `` `BarOptions.fill` `` the converged cell already carried. Kept on that evidence.
- **Corrected**: the wrapping. The prior run substituted each tag into the converged line and left
  lines up to 136 characters and ragged breaks (`renderBar`'s remarks broke after "never a second,").
  Every doc paragraph the diff touches is re-wrapped greedily at 100 columns with a `{@link …}` tag
  treated as one unbreakable token, which is the pre-converge convention for these files. Instrument:
  `tmp/d7n-console-converge-fix/rewrap.py`, scoped to paragraphs intersecting the diff.
- **Discarded**: nothing.

## Per item

- **C1 — the `examples` binding.** `tests/guides.test.ts`: the mapped ternary moves out of the `it`
  body to the examples loop's scope, directly after `const documented`. The block is now byte-equal to
  the pilot's `abort/tests/guides.test.ts:209-228` (checked by string comparison of the two blocks,
  `True`).
- **C2 — the links.** Source restoration kept as ruled earlier; `npm run docs -- --to guide` rewrote
  the cells the multi-line tags fed. `grep -c "import('" guides/console.md` reads `0`.
  Reading before: `rows read: 1, disagreements found: 5`. After every source edit and before the
  write: `disagreements found: 18`. After: `disagreements found: 0`.
- **C3 — the `Shape` column.** Every `## Surface` table carrying an `interface` or `type` row —
  Styling, Logging, Reporting, Capture, Errors, Animations, Browser sink, Server sink + process
  capture — now heads `Shape` between `Kind` and `Summary`, under Ruling 15's one convention sentence
  as its own paragraph above the table. The constants tables carry no interface or type row, so the
  ruling's trigger does not fire there and they are untouched. Cells are built from `src/**/types.ts`:
  an interface's data members as bare names with `?`, then `plus` its call-signature members
  (`{ emitter, active } plus start, stop, messages, clear, destroy`); a method-only interface takes
  `{} plus …`, the form the fleet already uses; an alias takes its own literal with `\|`.
  Descriptions that only listed members were rewritten in the source doc block and propagated:
  `SeparatorOptions`, `BoxOptions`, `TableOptions`, `TreeOptions`, `BarOptions`, `Theme`, `WriterSet`,
  `LogRecord`, `StepPosition`, `CapturedMessage`, `ProgressReport` in `src/core/types.ts`, and
  `StreamTargetInterface`, `CapturedChunk` in `src/server/types.ts`.
- **C4 — the fence comment.** `guides/console.md` reads
  `// The console capture and the process capture buffer through this one engine, so their retention semantics cannot drift apart.`
  No guard pinned that line, so the transcription case
  `carries the retention fence lines the transcription copies` now pins it. Red-first: with the old
  comment planted back, `npm run test:guides` reported
  `FAIL |guides| tests/guides.test.ts > flagship fences > carries the retention fence lines the transcription copies`,
  `Tests 1 failed | 93 passed (94)`. Control reversed; the same command reports `Tests 94 passed (94)`.
- **C5 — the typo.** `tests/src/core/helpers.test.ts:706` reads `a failing assertion`.
- **C6 — the drop-in's text.** The header already carried the amended wording ("The constants that
  follow are this package's own"); console's opening comment names its multi-dir row, so it is not
  line-for-line identical to the pilot's header, and the amended clause sits at `:3-4`. The `INTERNAL`
  block now reads "the assertion that follows it fails when a name here stops being stranded"
  (`tests/guides.test.ts:73`).
- **C7 — the opening prose.** The sentence restating the tagline's backend clause is gone; the
  paragraph opens at "ANSI / SGR escape codes are the default …" and is re-wrapped at 100 columns.
- **Propagation.** `npx oxfmt --config .oxfmtrc.json --write` over the owned paths; `--to guide` after
  the description edits; both write directions report `written: 0`.

## Criteria

1. `git status --short` — owned files only: `guides/console.md`, `tests/guides.test.ts`,
   `tests/src/core/helpers.test.ts`, and the `src/**` files whose doc blocks changed
   (`browser/constants.ts`, `browser/types.ts`, `core/Progress.ts`, `core/Styler.ts`,
   `core/constants.ts`, `core/factories.ts`, `core/helpers.ts`, `core/types.ts`,
   `server/constants.ts`, `server/factories.ts`, `server/helpers.ts`, `server/types.ts`,
   `server/validators.ts`). No code token moved: with comments stripped, every changed `src/**` file
   is identical to its `HEAD` copy (`files whose code (comments stripped) differs from HEAD: none`).
2. `npx oxfmt --config .oxfmtrc.json --check <owned paths>` → `All matched files use the correct format.`
   `npx oxlint --config .oxlintrc.json --deny-warnings --format=default <owned .ts paths>` →
   `Found 0 warnings and 0 errors.` / `Finished in 391ms on 15 files with 140 rules using 4 threads.`
   `npm run check` → exit 0 (`tsc --noEmit` for the root project and the core, browser, and server
   projects).
3. `npm run docs` → `rows read: 1, disagreements found: 0`.
   `npm run docs -- --to guide` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
   `npm run docs -- --to source` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
   `grep -c "import('" guides/console.md` → `0`.
4. The convention sentence appears once above each of the tables that carry `Shape`
   (`grep -n "A \`Shape\` cell holds" guides/console.md` lists `53, 78, 101, 140, 160, 172, 250, 278`
   — one per those tables).
   ``grep -n '| interface *| `{[^`]*:' guides/console.md`` prints nothing (exit 1).
   The examples block equals the pilot's (block-to-block string comparison, `True`).
   The drop-in's amended header clause and `INTERNAL` sentence match the amended pilot text.
5. `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 94 passed (94)`, `Duration 840ms`.
   `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`,
   `Duration 1.01s`.
   Observation, `npm run test:src:core` → `Test Files 11 passed (11)`, `Tests 451 passed (451)`,
   `Duration 1.76s`. No timing red under the sibling load.

## Diffstat

```
 guides/console.md              | 310 +++++++++++++++++++++--------------------
 src/browser/constants.ts       |   8 +-
 src/browser/types.ts           |  21 +--
 src/core/Progress.ts           |   5 +-
 src/core/Styler.ts             |   2 +-
 src/core/constants.ts          |  61 ++++----
 src/core/factories.ts          |  12 +-
 src/core/helpers.ts            |   7 +-
 src/core/types.ts              | 114 +++++++--------
 src/server/constants.ts        |  30 ++--
 src/server/factories.ts        |   2 +-
 src/server/helpers.ts          |  10 +-
 src/server/types.ts            |  33 ++---
 src/server/validators.ts       |   6 +-
 tests/guides.test.ts           |  19 +--
 tests/src/core/helpers.test.ts |   2 +-
 16 files changed, 335 insertions(+), 307 deletions(-)
```

## Ancillary decisions

- **An empty `Shape` cell for a class or function row.** Console's Surface tables are per-domain and
  mix kinds, unlike the fleet's dedicated `### Types` tables. Ruling 15 fires on the table, so the
  column lands, and a row with no member shape takes an empty cell. Ruling 15's guard-table and
  constants-table second sentences are not added, because console has neither table: its guards
  (`isConsoleError`, `isStreamTarget`, `isBufferEncoding`) sit in mixed tables and take the empty cell
  too, keeping one idiom per table.
- **`Color` spelled in full.** Its cell carries every arm rather than the elided `'black' \| … \|
  'default'` some fleet guides use for a long union, because the color vocabulary is what a reader
  comes to that row for and the row's `Summary` names the arms only by group.
- **An event-map alias's cell keeps its tuple labels** (`{ capture: [message: CapturedMessage]; start:
  []; stop: [] }`), dropping `readonly` — the shape `router`'s `NavigatorEventMap` cell uses.
- **Annotated option lists stay in their descriptions.** `LoggerOptions`, `LoggerManagerOptions`,
  `CaptureOptions`, `SpinnerOptions`, `ProgressOptions`, `ProcessCaptureOptions`, and `StylerOptions`
  gloss each member with the job it does, so those sentences carry more than the names the cell now
  holds. Ruling 15 deletes prose that only listed members; these are kept.
- **`ServerSinkInterface`'s cell reads `{ styled, columns } plus write`.** `write` is inherited from
  `SinkInterface`; the description carries the extension, and the cell states the whole contract in
  the one idiom.

## Deviation state

None. No gate outside the owned files went red, every `Shape` cell is expressible in Ruling 12's
idiom, and no restored link renders with its module part.

## Instruments

Under `/home/user/fleet/console/tmp/d7n-console-converge-fix/`: `rewrap.py` (the paragraph
re-wrapper), `shape.py` (the `Shape` column insert and its cell table), `doc.py` (doc-block reader),
`decls.txt` (the extracted declarations the cells were built from), `console.pre-oxfmt.md`, and the
prior run's `apply.py`, `pairs.py`, `restore.py`, `blocks.txt`, `blocks.json`.
