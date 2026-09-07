# Report — P.2 `d7n-process-converge`

Wall clock: 2026-09-07T20:47:56Z to 2026-09-07T21:07:21Z. Sole writer in `/home/user/fleet/process`
from `720d8ee`. No deviation: no stop condition fired.

## Criterion 1 — red-first on the unconverged tree

Command: `npm run test:guides` (npm 11, after the three gate cases landed and before any guide,
README, or doc-block edit). Reading: `Tests 3 failed | 114 passed | 1 skipped (118)`.

The pin, `pairs at least one example title across the guide and the source`:

```
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/process.md pairs: guide [\"Surface\",\"Byte sessions\",\"The terminal moment\",\"Standard input\",\"Termination\",\"Command resolution\",\"The child environment\",\"The child environment\",\"One-shot runs\",\"The result family\",\"Output bounds\",\"Output bounds\",\"Detached spawns\",\"The keyed registry\",\"Errors\",\"Errors\",\"Errors\",\"Observing\",\"Collect output in one call\",\"Stream a long-running child and cancel it\",\"Close a byte session cooperatively\",\"Supervise a fleet by id\",\"Build a bounded stop of your own\",\"Build a bounded stop of your own\",\"Build a bounded stop of your own\",\"Tests\"] source []",
```

The README case, `opens the README with the guide tagline`:

```
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:294:20
    294|  expect(pitch).not.toBeUndefined()
```

The equality case, `Process > keeps every compared summary and example equal to its source`:

```
AssertionError: expected [ …(96) ] to deeply equal []
+   "guides/process.md function createProcess: guide \"Spawn one supervised child and return its `ProcessInterface`.\" source \"Creates one supervised child process.\"",
```

The full log is retained at `/home/user/fleet/process/tmp/d7n-process-converge/red-first.log.txt`.

After convergence the same command reads `Tests 117 passed | 1 skipped (118)`, exit 0.

## Criterion 2 — headers, the class rows, and the `Shape` column

`Behavior` renamed to `Summary` in each `## Methods` table: `ProcessInterface`, `SessionInterface`,
`ProcessManagerInterface`, `ProcessChildInterface`, `Supervisor`.

`### Entities` renamed `### Classes` (every row's `Kind` is `class`, Rulings 5 and 16). No class is
documented under its own H3 in this guide, so the table needed no added row. The cell clause the
equality write displaced — `Supervisor`'s pointer to Surface notes — landed in the table's intro
paragraph (Ruling 7's guide-prose landing).

`Shape` added between `Kind` and `Summary` in the `### Types` and `### Server contracts` tables
(Ruling 15: those tables carry interface and type-alias rows and their cells listed the members).
Each carries the fleet wording of the convention sentence above it. Every `Shape` cell was checked
against its declaration by `tmp/d7n-process-converge/check-shape.py`, which parses the members from
`src/core/types.ts` and `src/server/types.ts`: `cells checked: 23 mismatched: 0`, with
`ProcessErrorCode` reported as the one alias with no brace form — its cell is the declared literal
`(typeof PROCESS_ERROR_CODES)[number]`. `ProcessEventMap`, `SessionEventMap`, and
`ProcessManagerEventMap` take bare member names under Ruling 19.

`### Surface notes` lost the paragraph that only enumerated those members (Ruling 15) and keeps its
rulings: why `ending` and `exit` and a `SupervisorFace` member are data members, and the pointer to
`## Methods`. Its paragraph on `Supervisor`'s own readonly members stays: `Supervisor` declares no interface, so
no `Shape` cell can hold them.

Header row census after the change (`awk` over each row preceding a `| ---` row): every `## Surface`
and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Value`, or `Returns`. The body
tables (`Option`, `Host`, `Field`, `Subject`, `Code`, `Event map`, `Name`) are outside the rule and
untouched.

Non-`Summary` cell comparison against `git show HEAD:guides/process.md`, through
`tmp/d7n-process-converge/cells.py`:

```
rows before: 162, rows after: 162, non-Summary cells compared: 397, mismatched: 0, rows missing after: 0, rows added: 0
```

## Criterion 3 — the doc blocks, then the propagation

Blocks rewritten by hand, each because the guide cell carried information the whole block lacked
(description, `@remarks`, and every tag read first):

- `createProcess`, `createSession`, `createProcessManager` (`src/server/factories.ts`) — each now
  names the contract it returns and states the preference: "returns it as a {@link …Interface}, so a
  caller holds the published contract rather than the `…` class". `createProcessManager` keeps the
  cell's `empty`.
- `resolveExecutable` (`src/server/helpers.ts`) — the POSIX fact, which sat in no tag: "or to
  `undefined` on a POSIX host, which performs its own lookup".
- `createDuplicateError`, `createProtocolError`, `createInvalidError` (`src/core/errors.ts`) — each
  names the code it raises, which its prose did not.
- `Process` (`src/server/processes/Process.ts`) — the bounded backlog, which the block's `@remarks`
  did not state.
- `ProcessManagerInterface.stop` (`src/core/types.ts`) — rewritten to a sentence true of the whole
  overload set, because one description answers for every guide row carrying that name (see the seed
  defect that follows).

Blocks left as written, because the fact the cell carried was already in the block: the constants
(every cell was shorter than its block); `formatCommand` (`space-joined` in `@returns`),
`quoteArgument` (the doubled quote in `@remarks`), `buildSpawn` and `buildExecutableCandidates`
(`@returns`), `isFile` (`@remarks`), `killTree` (`@remarks`), `buildExecuteResult` (`@returns`),
`snapshotCommand` (`@remarks`), `executeSync` and `detach` (`@remarks`), every validator (each
refusal condition is its `@throws`), `Session`, `Supervisor`, `ProcessManager`, `ProcessError`,
`isProcessError` (the `total` reading is the Guards table's own intro sentence, beside the table),
and `ProcessManagerInterface.processes` and `launch` (`@returns` and `@throws`).

Propagation: `npm run docs -- --to guide` read
`rows read: 1, disagreements found: 97, written: 95, reported: 1` (the pitch reported, being
hand-authored), then `npx oxfmt --write guides/process.md`.

No literal stayed in a `Shape` cell: `Shape` is new here and holds member names alone. The literals
this guide keeps sit in the `### Constants` table's `Value` column, which the acceptance criterion
admits and which `tests/guides.test.ts` reads by position through
`/^\| `(\w+)` +\| const +\| ([^|]+?) +\|/gmu` in `documents the constant values its Surface table
prints`. That column stays; the Constants table already headed `Summary` and needed no header work.

Every `src/**` change is comment-only: `git diff -U0 -- src/` filtered to lines outside a block
comment returns nothing.

## Criterion 4 — the titled pair

The pair is the `createProcess` block (the first `create*` the facts block lists) and the fence under
the guide's new `### Supervise a child and read its lines` heading — the fence at the top of
`## Surface`, the first fence in the document that demonstrates `createProcess`. `## Surface` is a
structural heading, so Ruling 9's heading one level deeper sits above that fence.

Fence bodies read before the choice: the Surface fence carries no three-backtick run and no `*/`, so
it qualified and no later fence was needed. Heading-scoped uniqueness before the title landed:
`grep -n '^#\+ Supervise a child and read its lines' guides/process.md README.md` exited 1.

Ruling 14: the block demonstrated `grace: 5000` that the fence did not, so the fence gained
`grace: 5_000, // POSIX only: the window between SIGTERM and SIGKILL` before `--to source` carried
it across, and nothing was deleted from either side. The fence's transcription in
`tests/guides.test.ts` (`frames the Surface fence lines and resolves its exit`) gained the same
option, per that file's own header rule.

Runs, in the brief's order: the title landed by hand first; `npm run docs` then read
`rows read: 1, disagreements found: 1` naming the pair alone; `npm run docs -- --to source` read
`rows read: 1, disagreements found: 1, written: 1, reported: 0`; `npx oxfmt --write
src/server/factories.ts`. Every other `@example` stays untitled.

## Criterion 5 — the tagline, the pitch, and the displaced prose

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold:

```
> A typed child-process toolkit in tiers: the supervised `Process` with framed stdout lines and a
> writable stdin channel, the byte-oriented `Session`, the buffered `execute` and `executeSync`
> runs, the fire-and-forget `detach`, and the keyed `ProcessManager` registry, none of them spawning
> through a shell.
```

`README.md` carries that blockquote under its H1 with the same line breaks.

The guide gained an opening paragraph directly after the blockquote carrying the displaced
sentences, none of them restating a tagline clause: the bounded backlog, the `evidence` tail beside
the live `stderr` event, the typed lifecycle emitter and the terminal moment; the owned
`Uint8Array`, `end`, and `ending`; the `ExecuteResult` a buffered run settles with; the manager's
launch and stop by id and its own emitter; the batch-argument refusal and the metacharacter reading;
the published faces; and the `Source:` line, whose links left the blockquote and end that
paragraph.

The README's opening paragraph is now the onboarding it alone carries — create, read, stop, and when
to reach for `execute` or `ProcessManager` — ending on `Part of the `@orkestrel` line.` Its former
pitch, which duplicated the guide's Surface lists, is gone; `## Install`, `## Requirements`,
`## Usage`, `## Guide`, `## Package`, and `## License` are unchanged.

Ancillary decisions recorded here: the `The tiers divide by lifetime.` paragraph moved above the new
`###` heading so it introduces `## Surface` rather than sitting inside the demonstration
subsection — no fence moved; and the fence's own introducing sentence stayed with its fence, under
the new heading, rather than being split from it by the heading.

`## Tests` gained the equality gate named descriptively in its `tests/guides.test.ts` bullet: every
`Summary` cell against its declaration's description paragraph, the titled
`Supervise a child and read its lines` fence against the `@example` block of that title, and the
README pitch against the guide's tagline. No SQ/MQ/EQ/RQ identifier was used.

Voice sweep over the prose this unit owns, each hit corrected: `all three` (the
`ProcessChildInterface` members), `the same two verbs`, `two outcomes`, `rather than two the host
would resolve`, `the two surfaces` and `a third face` (Vocabulary rows), `Two endings` (a Vocabulary
row), `to both endings` (the `## Tests` Session bullet), and the pointer `Every refusal above`, which
became `Every preceding refusal`. Every remaining `both` names its members in its own sentence and
stays. No all-caps emphasis exists in `guides/process.md` or `README.md`
(`grep -nE '\b(NOT|ALSO|ALWAYS|NEVER|MUST|ONLY|EVERY)\b'` over both files returns nothing), and none
was introduced.

## Criterion 6 — the seed, in each direction

```
$ npm run docs                    rows read: 1, disagreements found: 0                        exit 0
$ npm run docs -- --to guide      rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source     rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

```
$ npx oxfmt --check guides/process.md README.md tests/guides.test.ts src/core/types.ts src/core/errors.ts src/server/factories.ts src/server/helpers.ts src/server/processes/Process.ts
All matched files use the correct format.                                                     exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings <the same .ts paths>                     exit 0 (no output)
$ npm run check                                                                               exit 0
$ npm run test:guides            Test Files 1 passed (1);  Tests 117 passed | 1 skipped (118)  exit 0
$ npm run test:policy            Test Files 1 passed (1);  Tests 90 passed | 1 skipped (91)    exit 0
$ npm run test:src:core          Test Files 1 passed (1);  Tests 3 passed (3)                  exit 0  (observation)
```

`npm run test:src:server` was not run: it starts real children and the host carries sibling units, so
its reading belongs to the Orchestrator after this unit exits.

## Criterion 8 — the tree

```
 M README.md
 M guides/process.md
 M src/core/errors.ts
 M src/core/types.ts
 M src/server/factories.ts
 M src/server/helpers.ts
 M src/server/processes/Process.ts
 M tests/guides.test.ts
```

Owned files only. Diffstat: 8 files changed, 299 insertions(+), 210 deletions(-). Instruments sit in
the git-ignored `tmp/d7n-process-converge/`: `guide-baseline.md`, `add-shape.py`, `cells.py`,
`check-shape.py`, `probe-manifest.mjs`, `probe-methods.mjs`, `red-first.log.txt`. No lint control was
planted and none needs reversing.

## Seed and reader defects met

**`--to guide` writes one row per key, so an overloaded member documented in more than one row
cannot converge through the seed.** `ProcessManagerInterface` documents `stop` in a row per return
type. The write reached one row and left the other, and the next `npm run docs` reported:

```
guides/process.md ProcessManagerInterface.stop: guide "With no argument, terminate every live child and await their exit." source "Terminates the named children, or every live child when a call names none, and awaits their exit."
```

The remaining row was written by hand. `findDrift` at
`node_modules/@orkestrel/guide/dist/src/core/index.js:2273` compares every guide row against the
one source entry its name resolves to, so both rows compare equal afterwards; the writer is what
stops at the first. Related reader behaviour worth the guide's attention: `source.methods(name)`
returns one entry per name, taken from the overload declared earliest, so a member's later overload
descriptions are never compared. Every row therefore had to carry a sentence true of the whole
overload set, which is why that earliest overload's description was rewritten; the per-signature
distinction lives in the `Returns` column and in the prose above the table (Ruling 7's overload-set
landing).

No other reader or seed defect appeared. `--to guide` disturbed no non-`Summary` cell (397 cells
compared, 0 mismatched), no cell went unlocated after the header changes, and no residual
disagreement survived the doc-block rewrites under the P16 comparator.

## Decisions the brief left to this unit

- **The `### Constants` table keeps its `Value` column.** The acceptance criterion admits `Value`,
  and `tests/guides.test.ts` reads that column by position in `documents the constant values its
  Surface table prints`, comparing each printed cell against the imported constant. Ruling 18, which
  drops the column in favour of `Shape`, is not named in this unit's dispatch, and taking it would
  redden an owned test the brief does not scope for that change. Recorded for the Orchestrator to
  rule on rather than taken silently.
- **The drop-in's header comment stays package-specific.** Ruling 13's canonical header sentence,
  "The constants that follow are this package's own, and are the only part a sibling package
  changes", is false of this file: it also carries every flagship-fence transcription. The existing
  header states that and carries no banned pointer. The `INTERNALS` doc block, inside this package's
  own constants block, already reads "the assertions over this table fail when a name here stops
  being stranded" — no `below` and no ordinal, so Ruling 13's first correction needed no edit here.
  The three gate cases match the pilot byte for byte: `diff` against
  `/home/user/fleet/abort/tests/guides.test.ts:66-94` (the pin), `:96-110` (the README case), and
  `:171-190` (the equality case) each exits 0, and the examples case is named `documents an example
  for every Surface function`.
- **The equality case sits directly after the methods loop**, before `documents at least one method
  group` and the examples case, per Ruling 13's second correction. The pin and the README case sit
  at file scope directly after `manifest lists at least one guide`, the pilot's position.
