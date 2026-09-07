# Brief — P.2 `d7n-program-converge` (program under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/program` from the committed baseline `f2ca5ee` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.13`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/program.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/program/guides/program.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-program-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/program.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/program.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/program.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/program.md type Decision: guide absent source "Identifies a final authority outcome, derived from global eligibility."
guides/program.md type Status: guide absent source "Identifies the presentation and tally status derived from eligibility, conditions, and rating success."
guides/program.md type ProgramEffect: guide absent source "Identifies a post-qualification program determination effect."
guides/program.md type ProgramErrorCode: guide absent source "Identifies a coded `ProgramError` programmer-error code."
guides/program.md interface ProgramInput: guide absent source "Describes the optional fields accepted by `buildProgramDefinition`."
guides/program.md interface NoticeInput: guide absent source "Describes the optional fields accepted by `buildNotice`."
guides/program.md interface AggregateInput: guide absent source "Describes the optional fields accepted by `buildAggregateDefinition`."
guides/program.md interface Notice: guide absent source "Describes an authored, unconditional program notice."
guides/program.md interface Determination: guide absent source "Describes one resolved notice or authority-limit outcome."
guides/program.md interface AggregateDefinition: guide absent source "Describes batch aggregate fields, an optional partition field, and optional gates."
guides/program.md interface AggregateProjection: guide absent source "Describes one subject's private aggregate working projection."
guides/program.md interface AggregateGroup: guide absent source "Describes one batch aggregate partition."
guides/program.md interface Tally: guide absent source "Describes a status tally — a count plus summed aggregate fields."
guides/program.md interface ProgramDefinition: guide absent source "Describes a pure authored program definition."
guides/program.md interface ProgramResult: guide absent source "Describes one subject's complete program outcome."
guides/program.md interface AggregateResult: guide absent source "Describes a batch program outcome across every subject."
guides/program.md interface ProgramValidationResult: guide absent source "Describes semantic definition validation."
guides/program.md type ProgramEventMap: guide absent source "Describes the push observation surface of a `ProgramInterface`."
guides/program.md interface ProgramOptions: guide absent source "Describes the options for `createProgram` / the `Program` constructor."
guides/program.md interface ProgramInterface: guide absent source "Defines one compiled program that composes one qualifier and one rater over a shared reason engine."
guides/program.md type ProgramManagerEventMap: guide absent source "Describes the push observation surface of a `ProgramManagerInterface`."
guides/program.md interface ProgramManagerOptions: guide absent source "Describes the options for `createProgramManager` / the `ProgramManager` constructor."
guides/program.md interface ProgramManagerInterface: guide absent source "Defines an ordered manager over compiled programs, sharing one qualifier and rater."
guides/program.md const DEFAULT_PROGRAM_VALIDATE: guide "`true` — validate a definition at construction." source "Names the default definition validation policy for `createProgram` / `ProgramManager.add`."
guides/program.md const STATUSES: guide "Every `Status` literal, in tally order." source "Lists every `Status` literal — the source the union and its guard derive from."
guides/program.md const ELIGIBILITY_DECISIONS: guide "Deterministic decision for each global eligibility." source "Maps each global eligibility to its deterministic authority decision."
guides/program.md const AGGREGATE_KEY: guide "`'aggregate'` — private aggregate context key." source "Names the reserved working-subject key a batch's aggregate projection is written under."
guides/program.md const OUTCOME_KEY: guide "`'outcome'` — private authority context key." source "Names the reserved working-subject key the authority's outcome projection is written under."
guides/program.md class ProgramError: guide "Coded programmer error with optional context and cause." source "Reports a coded programmer error thrown by the program layer."
guides/program.md function isProgramError: guide "Narrow a caught value to `ProgramError`." source "Determines whether a caught value is a `ProgramError`."
guides/program.md const isDecision: guide absent source "Determines whether a value is a `Decision` literal."
guides/program.md const isStatus: guide absent source "Determines whether a value is a `Status` literal."
guides/program.md const isProgramEffect: guide absent source "Determines whether a value is a `ProgramEffect` literal."
guides/program.md function isNotice: guide absent source "Determines whether a value is an exact `Notice` record."
guides/program.md function isAggregateDefinition: guide absent source "Determines whether a value is an exact `AggregateDefinition` record."
guides/program.md function isProgramDefinition: guide absent source "Determines whether a value is an exact `ProgramDefinition` record."
guides/program.md function isProgramSums: guide absent source "Determines whether a value is an open program sums record."
guides/program.md const isDetermination: guide absent source "Determines whether a value is an open result-side `Determination`."
guides/program.md const isAggregateGroup: guide absent source "Determines whether a value is an open result-side `AggregateGroup`."
guides/program.md const isTally: guide absent source "Determines whether a value is an open result-side `Tally`."
guides/program.md function isTallies: guide absent source "Determines whether a value is a total open status-tally record."
guides/program.md const isProgramResult: guide absent source "Determines whether a value is an open `ProgramResult`."
guides/program.md const isAggregateResult: guide absent source "Determines whether a value is an open `AggregateResult`."
guides/program.md const isProgramValidationResult: guide absent source "Determines whether a value is an open `ProgramValidationResult`."
guides/program.md function selectProgramLines: guide "Select rating-line ids from scoped qualification eligibility." source "Selects the rating lines a subject may be rated on from scoped eligibility."
guides/program.md function deriveStatus: guide "Derive final status from a program definition's rating policy plus qualification and rating evidence." source "Derives the final program `Status` from a definition's rating policy and qualification/rating evidence."
guides/program.md function decideEligibility: guide "Map global eligibility to its deterministic decision." source "Maps a global `Eligibility` to its deterministic authority `Decision`."
guides/program.md function buildNoticeDeterminations: guide "Resolve authored notices into applied determinations." source "Resolves authored `Notice` values into unconditionally-applied `notice` `Determination` values."
guides/program.md function buildLimitDeterminations: guide "Convert a logical result's applied rules (authority or aggregate gates) into `limit` determinations, with rich premises." source "Converts a logical result's applied rules into `limit` `Determination` values."
guides/program.md function buildProgramResult: guide "Assemble a program result before or after rating." source "Assembles a `ProgramResult` from its qualification, rating, and determination parts — before or after authority."
guides/program.md function buildOutcomeProjection: guide "Build the private authority projection." source "Builds the private authority outcome projection from an assembled program result."
guides/program.md function buildQualificationSubject: guide "Add aggregate context to a private subject copy." source "Adds optional aggregate context to a private subject copy for qualification."
guides/program.md function findMissingScopes: guide "Find authored scopes absent from the rating definition." source "Returns authored scopes (qualification ruling scopes or notice scopes) that name no rating line on the program."
guides/program.md function hasReservedKey: guide "Detect `aggregate` or `outcome` on a caller subject." source "Determines whether a caller subject already carries a reserved program key."
guides/program.md function assertProgramSubject: guide "Assert a subject record and reserved-key safety." source "Asserts a value is a valid program `Subject`, narrowing it in place."
guides/program.md function assertProgramDefinition: guide "Assert always-on construction invariants — missing scope references and duplicate rating-line or notice ids — regardless of `options.validate`." source "Asserts a program definition's always-on construction invariants — missing scope references and duplicate rating-line or notice ids."
guides/program.md function validateProgramDefinition: guide "Validate nested definitions, references, authority, and aggregate policy." source "Validates a program definition's shape, references, and nested definitions."
guides/program.md function formatGroupKey: guide "Coerce a subject's partition-key field to its `String`-coerced group key." source "Coerces a subject's partition-key field to its group-key string."
guides/program.md function sumFields: guide "Fold one subject's finite aggregate field values into a fresh sums record." source "Folds one subject's finite aggregate field values into a sums record."
guides/program.md function aggregateSums: guide "Sum configured fields across subjects." source "Sums aggregate fields across a batch of subjects."
guides/program.md function aggregateGroups: guide "Partition subjects and sum fields per key." source "Partitions a batch of subjects by a field, summing aggregate fields per key."
guides/program.md function buildAggregateProjection: guide "Build one subject's overall and optional group aggregate context." source "Builds one subject's overall and optional group aggregate projection."
guides/program.md function buildAggregateRecord: guide "Build the reserved aggregate-gate subject." source "Builds the reserved-key record a batch aggregate-gate definition runs against."
guides/program.md function buildEmptySums: guide "Build a zero record for configured fields." source "Builds a zero-sum record for a set of aggregate fields."
guides/program.md function buildEmptyTallies: guide "Build complete zero tallies in status order." source "Builds complete zero status tallies in `STATUSES` order."
guides/program.md function completeTallies: guide "Fill missing statuses in a partial tally record." source "Completes a partial status tally record with zero entries for every missing `Status`."
guides/program.md function tallySubject: guide "Add one subject and its fields to the result-status tally." source "Adds one subject's aggregate contribution to a status tally record."
guides/program.md function buildAggregateResult: guide "Assemble one batch result, folding an optional aggregate-gate evaluation's `trace`/`errors` in and requiring it error-free for `success`." source "Assembles one batch `AggregateResult` from its per-subject and aggregate parts."
guides/program.md function buildProgramDefinition: guide "Build a fresh `ProgramDefinition`, copying every collection and omitting absent optional keys." source "Builds a fresh `ProgramDefinition`."
guides/program.md function buildNotice: guide "Build a fresh `Notice`, omitting an absent scope." source "Builds a fresh `Notice`."
guides/program.md function buildAggregateDefinition: guide "Build a fresh `AggregateDefinition`, copying the fields and omitting absent optional keys." source "Builds a fresh `AggregateDefinition`."
guides/program.md function createProgram: guide absent source "Creates one compiled program over a qualifier and rater."
guides/program.md function createProgramManager: guide absent source "Creates one ordered manager over compiled programs."
guides/program.md class Program: guide "Compiles one definition over a qualifier and rater; executes single subjects or aggregate-aware batches." source "Composes one qualifier and one rater over a shared reason engine and executes single subjects or aggregate-aware batches."
guides/program.md class ProgramManager: guide "Ordered manager of compiled programs sharing one qualifier and one rater." source "Manages compiled `ProgramInterface` programs in order, sharing one qualifier, rater, and reason engine across every program it compiles."
guides/program.md ProgramInterface.execute: guide absent source "Executes a subject list as one aggregate-aware batch."
guides/program.md ProgramInterface.validate: guide absent source "Validates this program's definition and every nested definition."
guides/program.md ProgramInterface.destroy: guide absent source "Destroys this program, idempotently."
guides/program.md ProgramManagerInterface.has: guide absent source "Reports whether an id names a compiled program."
guides/program.md ProgramManagerInterface.program: guide absent source "Looks one compiled program up by id."
guides/program.md ProgramManagerInterface.programs: guide absent source "Returns every compiled program, in insertion order."
guides/program.md ProgramManagerInterface.add: guide absent source "Compiles one definition and appends it to the collection."
guides/program.md ProgramManagerInterface.remove: guide absent source "Removes every listed id, destroying each removed program."
guides/program.md ProgramManagerInterface.destroy: guide absent source "Destroys this manager, idempotently."
guides/program.md pitch: readme absent tagline "A synchronous, deterministic program engine. A pure, JSON-serializable `ProgramDefinition` composes one published `QualificationDefinition` from `@orkestrel/qualifier` with an OPTIONAL `RatingDefinition` from `@orkestrel/rater`, plus optional notices, authority, and batch aggregate policy. `Program` executes the workflow in one direction: qualify the subject, stop on a terminal qualification, select the eligible rating lines, rate only those lines, derive status, then evaluate optional authority. Qualification decides whether rating happens — a globally ineligible, referred, or failed subject never reaches the rater, and scoped ineligibility removes only the matching line before the first rating call. Omitting `rating` authors a first-class ELIGIBILITY-ONLY program — the rater is never invoked, an eligible subject resolves to `'eligible'` (or `'conditional'` under an applied condition), and status is never `'unrated'`; an authored rating with zero lines still yields `'unrated'`, unchanged. `Program` performs NO reasoning arithmetic. It owns orchestration and business outcomes — notices, authority, status, decisions, and batch aggregates — while delegating eligibility to `Qualifier`, amounts and worksheets to `Rater`, and logical or quantitative mechanics to the shared `@orkestrel/reason` engine behind them. The rater always receives the original subject; qualification and aggregate working projections stay private to orchestration. Every output is a fresh `ProgramResult` or `AggregateResult` carrying the nested qualification and rating evidence, program determinations, trace, errors, status, and optional decision. `Program` either receives injected qualifier, rater, and engine instances (never destroyed by `Program`) or creates and OWNS one shared quantitative-plus-logical engine (`bail: false`), destroyed in `destroy()`. Every `execute` call fires through `Program`'s typed `emitter`. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 85
exit 1
```

## Facts for program (taken 2026-09-07T21:28Z by facts.sh)

- Checkout `/home/user/fleet/program`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `f2ca5ee`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 12 | summary 12 | banned 0 | tests/setup.ts(12) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                       | Source                    | Tests                                 |
    8:| ------- | -------------------------- | ------------------------- | ------------------------------------- |
    9:| Program | [`program.md`](program.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                      |
    14:| ---------- | -------------------------- |
    15:| `src/core` | [`program.md`](program.md) |
- Guide `guides/program.md`: 1063 lines. Headings:
    1:# Program
    32:## Surface
    125:### Types
    160:### Constants
    177:### Errors
    205:### Validators
    271:### Helpers
    370:### Factories
    389:### Entities
    398:## Methods
    400:#### `ProgramInterface`
    421:#### `ProgramManagerInterface`
    449:## Contract
    451:### Execution order
    481:### Qualification is terminal
    497:### Scoped eligibility
    515:### Conditions
    523:### Rating failures
    537:### Notices
    547:### Authority
    568:### Aggregate execution
    591:### Aggregate projection
    606:### Reserved keys
    612:### Status
    623:### Decision
    635:### Success
    650:### Ownership
    681:### Events
    697:### Validation
    731:## Patterns
    733:### Globally ineligible
    745:### Eligibility-only
    761:### Rating-only
    777:### Scoped exclusion
    812:### Scoped referral
    823:### Conditions
    833:### Notices
    843:### Authority
    865:### Aggregate qualification
    895:### Aggregate gates
    912:### Shared dependencies
    940:### Observing
    956:## Tests
    964:### Program cases
    996:### No-rate and original-subject proofs
    1006:### Batch and manager cases
    1014:### Shared-engine ownership
    1020:### Public parity
    1027:### Gates
    1042:## Practices
- Table headers in `guides/program.md` (a header row is the row before a `| ---` row):
    127: | Type                      | Kind      | Shape                                                                                                                                          |
    162: | API                        | Kind  | Summary                                             |
    179: | API              | Kind     | Summary                                                 |
    194: | Code         | Meaning                                                                                                        |
    222: | API                         | Kind     | Narrows to                         |
    281: | API                         | Kind     | Summary                                                                                                                                         |
    372: | API                    | Kind     | Builds…                                |
    391: | API              | Kind  | Summary                                                                                                  |
    405: | Method     | Returns                              | Behavior                                                                       |
    425: | Method     | Returns                         | Behavior                                                                                                         |
    501: | Scoped result | Rating behavior | Program status                                             |
    627: | Eligibility  | Decision    |
- Rows of any `### Entities` table (the Kind cell):
    393:  `Program`        | class
    394:  `ProgramManager` | class
- H1 blockquote (`guides/program.md`):
    3: > A synchronous, deterministic **program engine**. A pure,
    4: > JSON-serializable `ProgramDefinition` composes one published
    5: > `QualificationDefinition` from `@orkestrel/qualifier` with an OPTIONAL
    6: > `RatingDefinition` from `@orkestrel/rater`, plus optional notices, authority, and
    7: > batch aggregate policy. `Program` executes the workflow in one direction: qualify
    8: > the subject, stop on a terminal qualification, select the eligible rating lines,
    9: > rate only those lines, derive status, then evaluate optional authority.
    10: > Qualification decides whether rating happens — a globally ineligible, referred, or
    11: > failed subject never reaches the rater, and scoped ineligibility removes only the
    12: > matching line before the first rating call. Omitting `rating` authors a
    13: > first-class ELIGIBILITY-ONLY program — the rater is never invoked, an eligible
    14: > subject resolves to `'eligible'` (or `'conditional'` under an applied condition),
    15: > and status is never `'unrated'`; an authored rating with zero lines still yields
    16: > `'unrated'`, unchanged.
    17: >
    18: > `Program` performs NO reasoning arithmetic. It owns orchestration and business
    19: > outcomes — notices, authority, status, decisions, and batch aggregates — while
    20: > delegating eligibility to `Qualifier`, amounts and worksheets to `Rater`, and
    21: > logical or quantitative mechanics to the shared `@orkestrel/reason` engine behind
    22: > them. The rater always receives the original subject; qualification and aggregate
    23: > working projections stay private to orchestration. Every output is a fresh
    24: > `ProgramResult` or `AggregateResult` carrying the nested qualification and rating
    25: > evidence, program determinations, trace, errors, status, and optional decision.
    26: > `Program` either receives injected qualifier, rater, and engine instances (never
    27: > destroyed by `Program`) or creates and OWNS one shared quantitative-plus-logical
    28: > engine (`bail: false`), destroyed in `destroy()`. Every `execute` call fires through
    29: > `Program`'s typed `emitter`. Source: [`src/core`](../src/core).
    30: > Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    32: ## Surface
    34: Create a program, execute one subject, and inspect the nested results:
- README (`README.md`) first lines:
    # @orkestrel/program
    
    A **program composition layer** over
    [`@orkestrel/qualifier`](https://github.com/orkestrel/qualifier) and
    [`@orkestrel/rater`](https://github.com/orkestrel/rater): a pure,
    JSON-serializable `ProgramDefinition` composes one qualification with an optional
    rating, plus optional notices, authority, and batch aggregate policy. `Program` executes
    the workflow in one direction — qualify the subject, stop on terminal
    qualification, select eligible rating lines, rate only those lines, derive status,
    then evaluate optional authority — returning a nested `ProgramResult` (or
    `AggregateResult` for batch `execute`). Globally ineligible or referred subjects
    never reach the rater. Execution never mutates its inputs — every result is a
- `## Patterns` fences, each with its nearest preceding heading:
    36: fence under "## Surface"
    96: fence under "## Surface"
    113: fence under "## Surface"
    184: fence under "### Errors"
    244: fence under "### Validators"
    314: fence under "### Helpers"
    333: fence under "### Helpers"
    358: fence under "### Helpers"
    380: fence under "### Factories"
    411: fence under "#### `ProgramInterface`"
    434: fence under "#### `ProgramManagerInterface`"
    486: fence under "### Qualification is terminal"
    596: fence under "### Aggregate projection"
    685: fence under "### Events"
    735: fence under "### Globally ineligible"
    747: fence under "### Eligibility-only"
    763: fence under "### Rating-only"
    779: fence under "### Scoped exclusion"
    814: fence under "### Scoped referral"
    825: fence under "### Conditions"
    835: fence under "### Notices"
    845: fence under "### Authority"
    867: fence under "### Aggregate qualification"
    897: fence under "### Aggregate gates"
    914: fence under "### Shared dependencies"
    942: fence under "### Observing"
    1031: fence under "### Gates"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:35:export function createProgram(
    src/core/factories.ts:62:export function createProgramManager(options?: ProgramManagerOptions): ProgramManagerInterface {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/programs/Program.ts:73:export class Program implements ProgramInterface {
    src/core/programs/ProgramManager.ts:37:export class ProgramManager implements ProgramManagerInterface {
    src/core/errors.ts:23:export class ProgramError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/programs/Program.ts:5
    src/core/programs/ProgramManager.ts:10
    src/core/validators.ts:14
    src/core/factories.ts:2
    src/core/helpers.ts:27
    src/core/types.ts:12
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    30:} from '@orkestrel/guide'
    54:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    60:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    105:		for (const group of guide.methods()) {
    106:			const members = source.methods(group.interface).map((method) => method.name)
    114:					expect(findMissing(members, documented)).toEqual([])
    117:					expect(findMissing(documented, members)).toEqual([])
    123:							: findMissing(
    124:									source.methods(entity).map((method) => method.name),
    142:				findUnexampled(
    145:					source.examples().map((example) => example.name),
    150:		for (const group of guide.methods()) {
    155:					? source.examples(group.interface).map((example) => example.name)
    159:							.concat(source.examples(entity).map((example) => example.name))
    166:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    178:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 956:## Tests — 1 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-program-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/program.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/program.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-program-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
