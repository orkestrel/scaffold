# Brief — P.1 `d7n-program-prep` (program's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/program` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `901a7a1`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

program's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== program 2026-09-07T16:43:49Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
88:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 799ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### program (901a7a1, version 0.0.12, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 27 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setup.ts(12)
-- docs
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
-- check
   tests/guides.test.ts(113,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(116,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(120,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(135,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(150,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 9 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  9 failed | 17 passed (26)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 12 | summary 12 | banned 0 | tests/setup.ts(12) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for program (taken 2026-09-07T16:44Z by facts.sh)

- Checkout `/home/user/fleet/program`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `901a7a1`, status: clean
- `package.json`: version `0.0.12`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    106:			const members = source.methods(group.interface)
    113:					expect(findMissing(members, group.methods)).toEqual([])
    116:					expect(findMissing(group.methods, members)).toEqual([])
    120:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    135:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    138:		for (const group of guide.methods()) {
    148:							? source.examples(group.interface)
    149:							: source.examples(group.interface).concat(source.examples(entity))
    150:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    162:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 956:## Tests — 1 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.12"` → `"version": "0.0.13"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-program-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
