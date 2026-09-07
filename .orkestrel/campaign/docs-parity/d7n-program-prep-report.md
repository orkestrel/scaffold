# Report — P.1 `d7n-program-prep`

Wall clock: 2026-09-07T21:17:13Z (first command) to 2026-09-07T21:20:20Z (last command).

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `9 written, 27 unchanged, 0 removed in ..`

`git status --short` after:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches P21's expected list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Three hunks, each an exact copy of the reference shape at `/home/user/fleet/abort/tests/guides.test.ts` outside this package's own constants.

**Methods loop** (before → after):

```
- const members = source.methods(group.interface)
- const entity = group.interface.replace(/Interface$/, '')
+ const members = source.methods(group.interface).map((method) => method.name)
+ const documented = group.methods.map((method) => method.name)
+ const entity = group.interface.replace(/Interface$/, '')
...
- expect(findMissing(members, group.methods)).toEqual([])
+ expect(findMissing(members, documented)).toEqual([])
...
- expect(findMissing(group.methods, members)).toEqual([])
+ expect(findMissing(documented, members)).toEqual([])
...
- entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+ entity === group.interface
+     ? []
+     : findMissing(
+             source.methods(entity).map((method) => method.name),
+             documented,
+         )
```

`group.methods.length` assertion (`documents at least one method`) is unchanged.

**Examples case** (`documents an example for every Surface function`):

```
- expect(findUnexampled(names, fences, source.examples())).toEqual([])
+ expect(
+     findUnexampled(
+         names,
+         fences,
+         source.examples().map((example) => example.name),
+     ),
+ ).toEqual([])
```

**Examples loop** (`${group.interface} examples`):

```
- for (const group of guide.methods()) {
-     const entity = group.interface.replace(/Interface$/, '')
-     describe(`${group.interface} examples`, () => {
-         it('documents an example for every method', () => {
-             const fences = ...
-             const examples =
-                 entity === group.interface
-                     ? source.examples(group.interface)
-                     : source.examples(group.interface).concat(source.examples(entity))
-             expect(findUnexampled(group.methods, fences, examples)).toEqual([])
-         })
-     })
- }
+ for (const group of guide.methods()) {
+     const entity = group.interface.replace(/Interface$/, '')
+     const documented = group.methods.map((method) => method.name)
+     const examples =
+         entity === group.interface
+             ? source.examples(group.interface).map((example) => example.name)
+             : source
+                     .examples(group.interface)
+                     .map((example) => example.name)
+                     .concat(source.examples(entity).map((example) => example.name))
+     describe(`${group.interface} examples`, () => {
+         it('documents an example for every method', () => {
+             const fences = ...
+             expect(findUnexampled(documented, fences, examples)).toEqual([])
+         })
+     })
+ }
```

No other change to the suite. The `findMissing` call over the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)` and the `names`/`surface` pair (`imports only real exports in every \`\`\`ts fence`, `resolves every relative link` uses no `findMissing`) needed no edit; they already carry string arrays.

## Item 3 — voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 printed 12 `policy/no-malformed-summary` diagnostics, all in `tests/setup.ts` (no `policy/no-banned-term` diagnostic). Each before/after:

- `tests/setup.ts:689` — `policy/no-malformed-summary`
  `Build a distinctly-identified program over the standard qualification and rating pair.` → `Builds a distinctly-identified program over the standard qualification and rating pair.`
- `tests/setup.ts:972` (block description opening line, reported at 972) — `policy/no-malformed-summary`
  `Create a reason engine registering ONLY the quantitative reasoner — used to` → `Creates a reason engine registering ONLY the quantitative reasoner — used to` (rest of paragraph unchanged)
- `tests/setup.ts:981` (block description opening line, reported at 981) — `policy/no-malformed-summary`
  `Build a logical definition with a single premise-less rule.` → `Builds a logical definition with a single premise-less rule.` (the `@remarks` paragraph below is untouched)
- `tests/setup.ts:1023` — `policy/no-malformed-summary`
  `An eligibility-only definition (no \`rating\`) reusing the standard qualification.` → `Reuses the standard qualification for an eligibility-only definition with no \`rating\`.`
- `tests/setup.ts:1030` — `policy/no-malformed-summary`
  `An eligibility-only definition reusing the conditional qualification.` → `Reuses the conditional qualification for an eligibility-only definition.`
- `tests/setup.ts:1037` — `policy/no-malformed-summary`
  `An eligibility-only definition reusing the referral qualification.` → `Reuses the referral qualification for an eligibility-only definition.`
- `tests/setup.ts:1044` — `policy/no-malformed-summary`
  `An eligibility-only definition with a clean authority.` → `Adds a clean authority to an eligibility-only definition.`
- `tests/setup.ts:1053` — `policy/no-malformed-summary`
  `An eligibility-only definition with a notice scoped to a non-existent rating line.` → `Scopes a notice to a non-existent rating line in an eligibility-only definition.`
- `tests/setup.ts:1066` — `policy/no-malformed-summary`
  `A program failing qualification (referral) with a clean authority attached.` → `Attaches a clean authority to a program failing qualification (referral).`
- `tests/setup.ts:1109` — `policy/no-malformed-summary`
  `Build \`count\` distinct eligible/ineligible-alternating batch subjects.` → `Builds \`count\` distinct eligible/ineligible-alternating batch subjects.`
- `tests/setup.ts:1119` — `policy/no-malformed-summary`
  `Batch subjects sharing the same \`id\`, distinguished by \`licensed\`.` → `Shares one \`id\` across batch subjects distinguished by \`licensed\`.`
- `tests/setup.ts:1125` — `policy/no-malformed-summary`
  `Build a subject carrying its own \`__proto__\` / \`constructor\` OWN keys through JSON parsing.` → `Builds a subject carrying its own \`__proto__\` / \`constructor\` OWN keys through JSON parsing.`

Every code token, symbol name, and assertion value is unchanged.

Re-running oxlint after the edits: no output, exit 0.

`npm run test:policy` (the prose sweep over `guides/**` and `README.md`): `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)` — no hit named in `guides/**` or `README.md`, so no further edit was needed there. No diagnostic sat in an off-limits file.

## Item 4 — the bump

`package.json`: `"version": "0.0.12"` → `"version": "0.0.13"`. `package-lock.json` untouched.

## Ran `npm run format`

`oxfmt --config .oxfmtrc.json --write .` — `Finished in 2365ms on 49 files using 4 threads.` `git status --short` after showed no path beyond the ones already listed here.

## Criteria

1. `git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 repair list plus `tests/guides.test.ts` (item 2) plus `tests/setup.ts` (item 3's 12 diagnostics, listed above with their sending diagnostic). Nothing else.

2. `npm run format:check` — `All matched files use the correct format.` exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings .` — no output, exit 0.
   `npm run check` — `tsc --noEmit --project tsconfig.json && npm run check:src` then `check:src:core` — no diagnostic, exit 0.

3. `npm run test:guides` — `Test Files 1 passed (1)`, `Tests 26 passed (26)`, exit 0.
   `npm run test:policy` — `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, exit 0.
   `npm run test:config` — `Test Files 1 passed (1)`, `Tests 172 passed | 1 skipped (173)`, exit 0.

4. `npm run docs` — exit 1 (expected). Verbatim worklist:

```
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
```

exit 1.

## Deviations

None. No `repair` write fell outside the P21 list, every before-text in item 2 matched verbatim, no voice diagnostic named an off-limits file, `test:policy` reddened on no file outside scope, and every gate other than `docs` read green.
