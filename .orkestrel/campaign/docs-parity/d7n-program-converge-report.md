# Report — P.2 `d7n-program-converge` (program under the equality gate)

Wall clock: 2026-09-07T21:29:54Z (first command) to 2026-09-07T21:45:48Z (last command).

Checkout `/home/user/fleet/program`, baseline `f2ca5ee`. Owned files only were written.

## Criterion 1 — red-first on the unconverged tree

The gate cases landed first, against the baseline guide and README. Command:
`PATH=/opt/npm11/bin:$PATH npm run test:guides` — exit 1, `Tests  3 failed | 26 passed (29)`.
Log retained at `/home/user/fleet/program/tmp/d7n-program-converge/red-first-test-guides.log.txt`.

The failing cases, verbatim from that run:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/program.md pairs: guide [\"Surface\",\"Surface\",\"Surface\",\"Errors\",\"Validators\",\"Helpers\",\"Helpers\",\"Helpers\",\"Factories\",\"ProgramInterface\",\"ProgramManagerInterface\",\"Qualification is terminal\",\"Aggregate projection\",\"Events\",\"Globally ineligible\",\"Eligibility-only\",\"Rating-only\",\"Scoped exclusion\",\"Scoped referral\",\"Conditions\",\"Notices\",\"Authority\",\"Aggregate qualification\",\"Aggregate gates\",\"Shared dependencies\",\"Observing\",\"Gates\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined

 FAIL  |guides| tests/guides.test.ts > Program > keeps every compared summary and example equal to its source
AssertionError: expected [ …(84) ] to deeply equal []
+   "guides/program.md type Decision: guide absent source \"Identifies a final authority outcome, derived from global eligibility.\"",
+   "guides/program.md interface ProgramInput: guide absent source \"Describes the optional fields accepted by `buildProgramDefinition`.\"",
+   "guides/program.md ProgramInterface.execute: guide absent source \"Executes a subject list as one aggregate-aware batch.\"",
```

The equality worklist the case collected is the seed's own, minus the `pitch` row: `findDrift`
compares 84 keys where `npm run docs` reported 85 disagreements on the same tree, because the
pitch pair is the seed's and not the reader's. That is a population difference, not a defect.

`tests/guides.test.ts` now carries: the equality case inside the manifest loop's
`describe(entry.concept)` block, directly after the methods loop and before the examples case;
the file-scope population pin naming both title sets; the file-scope README case with its two
`not.toBeUndefined()` guards before `toBe`; `README.md` in `ROOT_FILES`; and a `GUIDE_SPEC`
constant the pin, the README case, and the flagship section all read.

Drop-in canonicity, Rulings 13, 13-amended, and 20:
`diff <(sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts) <(sed -n '57,268p' tests/guides.test.ts)`
exits 0 — from `const root = new URL('../', import.meta.url)` through the manifest loop's closing
brace the bytes are the pilot's, `/Interface$/` with no flag included. The header line now reads
"The constants that follow are this package's own"; the `INTERNAL` block now reads "the assertion
that follows it fails when a name here stops being stranded". `CORE_GUIDE` was renamed
`GUIDE_SPEC`. The package's own `describe('flagship fences')` section stays, appended after the
loop.

## Criterion 2 — headers and class rows

Every `## Surface` and `## Methods` table now heads `Summary` beside only `Kind`, `Shape`,
`Signature`, `Value`, or `Returns`, with the guide's own first-column header untouched (Ruling 10).
Header moves:

| Table | Before | After |
| --- | --- | --- |
| `### Types` | `Type \| Kind \| Shape` | `Type \| Kind \| Shape \| Summary` |
| `### Constants` | `API \| Kind \| Summary` | `API \| Kind \| Shape \| Summary` |
| `### Validators` | `API \| Kind \| Narrows to` | `API \| Kind \| Shape \| Summary` |
| `### Factories` | `API \| Kind \| Builds…` | `API \| Kind \| Summary` |
| `#### ProgramInterface` | `Method \| Returns \| Behavior` | `Method \| Returns \| Summary` |
| `#### ProgramManagerInterface` | `Method \| Returns \| Behavior` | `Method \| Returns \| Summary` |

`### Entities` became `### Classes` (Rulings 5 and 16: every row's `Kind` is `class` — `Program`
and `ProgramManager`). No class is documented under its own H3, so no row was added. `ProgramError`
stays in the mixed `### Errors` table, which keeps its heading and takes no `Shape` column
(Ruling 20's mixed-table clause).

Convention sentences, one per table that carries the column, between that table's heading and the
table (Rulings 15 and 20):

- `### Types` and `### Validators` carry the base sentence verbatim; `### Validators` adds the
  guard sentence on the same line, the landed fleet form (`interpret/guides/interpret.md:227`,
  `brief/guides/brief.md:233`).
- `### Constants` carries the constants sentence alone, the template's form
  (`template/guides/template.md:59`).

## Criterion 3 — cells, `Shape` idiom, and the blocks rewritten

`npm run docs -- --to guide` → `rows read: 1, disagreements found: 84, written: 84, reported: 0`,
then `npx oxfmt --config .oxfmtrc.json --write guides/program.md README.md`, then `npm run docs`
→ `rows read: 1, disagreements found: 0`, exit 0.

Doc blocks rewritten by hand before the propagation, each because the cell carried information the
block lacked or the block's prose was false:

| Declaration | File | Change |
| --- | --- | --- |
| `DEFAULT_PROGRAM_VALIDATE` | `src/core/constants.ts` | Names its literal `true` (Ruling 18) |
| `STATUSES` | `src/core/constants.ts` | Gains "in tally order", the fact the cell carried |
| `AGGREGATE_KEY` | `src/core/constants.ts` | Names its literal `'aggregate'` (Ruling 18) |
| `OUTCOME_KEY` | `src/core/constants.ts` | Names its literal `'outcome'` (Ruling 18) |
| `ProgramError` | `src/core/errors.ts` | Gains the code, context, and cause the cell carried |
| `createProgram` | `src/core/factories.ts` | States the contract it returns, `{@link ProgramInterface}` |
| `createProgramManager` | `src/core/factories.ts` | States the contract it returns, `{@link ProgramManagerInterface}` |
| `Program` | `src/core/programs/Program.ts` | Gains "compiling one authored definition", the fact the cell carried |
| `buildNotice` | `src/core/helpers.ts` | New `@remarks`: an absent `scope` is omitted, not stored `undefined` (Ruling 7) |
| `buildAggregateDefinition` | `src/core/helpers.ts` | New `@remarks`: `fields` is copied fresh, an absent `partition` or `gates` omitted (Ruling 7) |

Rows whose literal stayed in `Shape` while the em-dash clause left for the doc block: `Decision`,
`Status`, `ProgramEffect`, `ProgramErrorCode`, `ProgramInput`, `NoticeInput`, `AggregateInput`,
`Notice`, `Determination`, `AggregateDefinition`, `AggregateProjection`, `AggregateGroup`, `Tally`,
`ProgramDefinition`, `ProgramResult`, `AggregateResult`, `ProgramValidationResult`,
`ProgramOptions`, `ProgramManagerOptions`.

Rows whose `Shape` was rewritten to the Ruling 12 idiom:

- `ProgramInterface`: `` `id` / `name` / `definition` / `emitter` + `execute` / `validate` / `destroy` `` →
  `` `{ id, name, definition, emitter } plus execute, validate, destroy` ``.
- `ProgramManagerInterface`: `` `emitter` / `count` + `has` / … `` →
  `` `{ emitter, count } plus has, program, programs, add, remove, destroy` ``.
- `ProgramEventMap` and `ProgramManagerEventMap` (Ruling 19, an alias over an object of tuples):
  `` `qualify(result)` · `rate(result)` · … `` → `` `{ qualify, rate, determine, decide, execute, aggregate, destroy }` ``,
  and `` `add(id)` · `remove(id)` · `destroy()` `` → `` `{ add, remove, destroy }` ``. The payload
  types stay in the declaration.
- Every `### Validators` row: the prose cell (`Exact `Notice`.`, `Open string-to-number sums
  record.`) became the narrowed type alone (`` `Notice` ``, `` `Readonly<Record<string, number>>` ``),
  and the exact-versus-open posture now reads in the `Summary` the doc block supplies.
- Every `### Constants` row gained the declared type: `` `true` ``,
  `` `readonly ['ineligible', 'referral', 'conditional', 'unrated', 'eligible']` ``,
  `` `Readonly<Record<Eligibility, Decision>>` ``, `` `'aggregate'` ``, `` `'outcome'` ``.

Ruling 7 landings in the guide's prose, each a fact no compared block can hold:

- `#### ProgramInterface`: the `execute` overload set. The compared cell carries the array form's
  block, so the paragraph above the table now states that the single-subject form returns one
  `ProgramResult` through the same call.
- `#### ProgramManagerInterface`: the `remove` overload set. The paragraph above the table now
  states that one id returns a `boolean` and no argument removes every program and returns `void`.

Remark sentences the descriptions now repeat, pruned from the guide's prose under `### Constants`:
the `ELIGIBILITY_DECISIONS` mapping sentence and the `STATUSES` membership sentence.

### Prose the code falsified

- `### Constants` claimed "Every constant is `Object.freeze`d." Only `STATUSES` and
  `ELIGIBILITY_DECISIONS` call `Object.freeze` (`src/core/constants.ts:14,23`);
  `DEFAULT_PROGRAM_VALIDATE`, `AGGREGATE_KEY`, and `OUTCOME_KEY` are primitives. Rewritten to that.
- `buildProgramResult`'s cell read "before or after rating". The helper is called before authority
  (`src/core/programs/Program.ts:346`) and again after it (`:369`). The source description's
  "before or after authority" is the true one and is what the cell now carries.
- `selectProgramLines`'s cell read "Select rating-line ids". It returns
  `readonly LineDefinition[]` (`src/core/helpers.ts`), not ids. The source description's "the
  rating lines a subject may be rated on" is what the cell now carries.
- `buildProgramDefinition`'s cell read "copying every collection". Its `@remarks` records that
  `qualification`, `rating`, `authority`, and `aggregate` are stored by reference. The cell now
  carries the block's "Builds a fresh `ProgramDefinition`." and the remark keeps the detail.

### Hand-rebuild comparison against the baseline

Every table was rebuilt by hand, so every non-`Summary` cell was compared against
`git show HEAD:guides/program.md`. Instrument and output retained at
`/home/user/fleet/program/tmp/d7n-program-converge/cells.py` and `cell-comparison.txt`; the split
is on a pipe not preceded by a backslash. Reading:

```text
rows before: 109
rows after:  109
keys only before: []
keys only after:  []
non-Summary cell differences: 44
```

Every one of those 44 differences sits at column index 2 — the `Shape` column this brief and
Rulings 12, 15, 18, 19, and 20 name. No first-column cell, no `Kind` cell, no `Returns` cell, and
no `| Code | Meaning |` cell moved, and no row was lost or gained.

## Criterion 4 — the titled pair

The pair is `createProgram`'s `@example` (`src/core/factories.ts:25`) and the `## Surface`
`### Factories` fence, under the new heading `#### Compile a program and a manager`.

- Ruling 3 names the primary factory's block; the facts block lists `createProgram` first.
- Ruling 9 applies: the fence sat under the structural heading `### Factories`, so a heading one
  level deeper was added directly above the fence and worded as the demonstration it shows. The
  structural heading stays and no fence moved.
- Heading uniqueness, heading-scoped: `grep -c '^#\+ Compile a program and a manager'
  guides/program.md` → `1`.
- Fence bodies read for disqualifiers: the `### Factories` fence carries no three-backtick run and
  no doc-comment terminator, so it qualifies.
- The other eligible fence was the `## Surface` quick-start fence, whose nearest heading is also
  structural. Decided against it and recorded here: its exact text is bound by the flagship
  transcription's presence guards (`tests/guides.test.ts`, `carries the Surface fence lines the
  transcription copies`), and titling it under Ruling 9 would insert a new H3 section into
  `## Surface` rather than a deeper heading. The `### Factories` fence is also the tighter match to
  the block it pairs with.
- Ruling 14: the block demonstrated `program.execute(...)` and `program.destroy()`, which the fence
  lacked; the fence demonstrated `createProgramManager`, which the block lacked. The fence was
  extended with the execution and teardown lines and nothing was deleted from either side, so
  `--to source` carried the union into the block.

Runs, in the brief's order. The block was titled first, with the summaries already at zero:

```text
$ npm run docs                      rows read: 1, disagreements found: 1   (the pair alone)
$ npm run docs -- --to source       rows read: 1, disagreements found: 1, written: 1, reported: 0
$ npx oxfmt --config .oxfmtrc.json --write src/core/factories.ts
$ npm run docs                      rows read: 1, disagreements found: 0   exit 0
```

`written: 1` — no other block was touched, and `grep -rn '@example [^ ]' src --include=*.ts`
returns that one line, so every other block stays untitled.

## Criterion 5 — the tagline, the pitch, and the opening prose

The H1 blockquote is now one noun phrase in plain text and code spans, with no link and no bold,
and `README.md` carries the same text under its H1 with the same line breaks:

```text
> The program composition layer: a pure, JSON-serializable `ProgramDefinition`
> that composes one qualification with an optional rating, plus notices,
> authority, and batch aggregate policy, and a `Program` that executes them in
> one direction — qualify, select, rate, derive status, then authorize.
```

The guide gained an opening prose section after the blockquote, where it had none, carrying the
displaced sentences: qualification deciding whether rating happens and the terminal-qualification
rule; the eligibility-only paragraph; the rater receiving the original subject while the
qualification and aggregate projections stay private; `Program` performing no reasoning arithmetic
and delegating to `Qualifier`, `Rater`, and the shared `@orkestrel/reason` engine; the fresh
`ProgramResult` or `AggregateResult`; injected versus owned dependencies and `bail: false`; the
typed `emitter`; and the `Source:` and barrel lines. The prose splits after the execution rule
rather than running as a single paragraph — an ancillary decision, recorded here.

The README's opening paragraph is onboarding the README alone carries and restates no tagline
clause: how to build, compile, and call; that execution never mutates its inputs; that injected
qualifier, rater, and reason instances stay caller-owned while a standalone program owns the engine
it creates; the sibling-package links; environment-agnosticism; and the `@orkestrel` line.

Voice sweeps over the prose owned here. Corrected all-caps emphasis in `guides/program.md`:
`FIRST` (the array-overload sentence and each destroyed-flag bullet), `BEFORE` (line
selection), `SUCCEEDED` (the decision gate), `NEVER` and `AUTHORED` (the status list), `AND` (the
aggregate success rule), and `NO` and `ANY` (the validation list). The tagline's `OPTIONAL`,
`ELIGIBILITY-ONLY`, `NO`, and `OWNS` went with the rewrite. Corrected in the doc blocks rewritten
here: `ORIGINAL`, `ONE`, `REENTRANCY-SAFE`, and `BEFORE` in the `Program` class remarks, and `OWNS`
in `createProgram`'s remarks; each extended comment line was rewrapped to its block's width.
The omitted-rating sentence under `### Execution order` named list items by position ("step 6",
"step 7"), which `AGENTS.md` § Writing bans; it now names line selection and rating instead. Sweeps for a count in
prose and for `above`/`below` pointers over `guides/program.md` and `README.md` returned nothing
outside the singular determiner `one` and the reason `'above'` operator inside two fences.

## Criterion 6 — the seed

```text
$ npm run docs                      rows read: 1, disagreements found: 0                    exit 0
$ npm run docs -- --to guide        rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source       rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates

Every command run as `PATH=/opt/npm11/bin:$PATH npm run …` where it is an npm script.

| Command | Reading |
| --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check <owned paths>` | exit 0, "All matched files use the correct format." |
| `npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>` | exit 0 |
| `npm run check` | exit 0 |
| `npm run test:guides` | exit 0, `Tests  29 passed (29)` |
| `npm run test:policy` | exit 0, `Tests  90 passed`, `1 skipped (91)` |
| `npm run test:src:core` (observation) | exit 0, `Test Files  6 passed (6)`, `Tests  216 passed (216)` |

The scoped `oxlint` path list is the owned `.ts` files alone, because that command reads no
Markdown and exits 1 on a Markdown-only list; the prose sweep in `test:policy` gates the guide and
the README.

## Criterion 8 — status

```text
 M README.md
 M guides/program.md
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/programs/Program.ts
 M tests/guides.test.ts
```

Owned files only. Diffstat: `8 files changed, 305 insertions(+), 189 deletions(-)`.
`package.json`, the lockfile, every vendored file, `tests/setup*.ts`, `tests/src/**`, and
`guides/README.md` are untouched. Instruments sit in `/home/user/fleet/program/tmp/d7n-program-converge/`,
which git ignores.

## Reader and seed defects met

None. Every seed run behaved as the brief describes, and no reader returned a shape the brief does
not describe. Three readings worth carrying, none of them a defect:

- The seed writes into a `Summary` cell that a hand-built table left empty: the Types, Constants,
  and Validators tables were rebuilt with an empty final cell per row and `--to guide` filled all
  84 in one pass, `reported: 0`. The router finding about a refused empty cell fires only where the
  source block is absent, which is not this package's case.
- `npm run docs` reported 85 disagreements at baseline where `findDrift` reported 84. The extra row
  is `pitch: readme absent tagline …`, which the seed compares and the reader does not. A brief
  that quotes a `docs` count as the equality case's expected count will be off by that row on every
  package.
- `{@link}` tags survived intact in every description paragraph and rendered as their target's code
  token in the cell (`{@link ProgramError}` → `` `ProgramError` ``, `{@link Status}` →
  `` `Status` ``). No tag was flattened by `--to source`, which touched one file.

## Ancillary decisions

- **The `| Code | Meaning |` table under `### Errors` keeps its header.** It sits inside
  `## Surface` but its rows key no declaration: it carries no `Kind` column, so
  `extractRowSymbol` returns `undefined` for every row and no cell in it is ever compared. Its
  first column names error codes rather than exports, and `Meaning` is in neither trigger set the
  brief names (`Behavior`, `Purpose`, `Describes`, `Builds`). Converged siblings keep the same
  shape: `websocket/guides/websocket.md:148` heads `Raised when`, `pool/guides/pool.md:175` heads
  `Owner`, `workspace/guides/workspace.md` heads `Raised by`. Renaming it `Summary` would
  declare a compared column where nothing is compared.
- **`Status`'s `Shape` keeps the resolved union arms** rather than the alias's written
  `(typeof STATUSES)[number]`. The brief's instruction for a table gaining `Summary` is that the
  type literal stays and the em-dash clause leaves, so the literal was left as the guide wrote it;
  `STATUSES`'s own `Shape` cell carries the same arms as its declared tuple type, so the derivation
  is still visible in the table beside it.
- **`DEFAULT_PROGRAM_VALIDATE`, `AGGREGATE_KEY`, and `OUTCOME_KEY` name their literal in both the
  `Shape` cell and the description.** For a constant with no type annotation the declared type is
  the literal, so Ruling 18's "name it in the description" and Ruling 12's constants sentence land
  the same text twice. Ruling 18 is explicit that the block stays the reference for a doc-block
  reader who has no `Shape` column, so both were written.
- **The guide's opening prose splits after the execution rule** rather than running as a single
  paragraph.
- **The `## Tests` section names the equality gate descriptively** and now links
  `tests/guides.test.ts`, which it did not before; the titled fence is named by its title,
  `Compile a program and a manager`, the pilot's form. No SQ/MQ/EQ/RQ identifier was written.

## Deviation state

No deviation. No cell was unlocatable after the header changes, no titled body exceeded what the
block can hold, no test outside `tests/guides.test.ts` reddened, no vendored file needed an edit,
no reader returned an undescribed shape, and no residual disagreement survived a doc-block rewrite.
No lint control was planted; the Orchestrator's reading is unobstructed. No red-first plant needed
reversing beyond the gate cases themselves, which are now green.
