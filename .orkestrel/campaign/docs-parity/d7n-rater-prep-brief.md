# Brief — P.1 `d7n-rater-prep` (rater's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/rater` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `9162d8a`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

rater's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== rater 2026-09-07T16:42:46Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
79:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 861ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### rater (9162d8a, version 0.0.13, guide range ^0.0.17, head start 0.0.18)
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
   tests/setup.ts(15)
-- docs
   guides/rater.md type Stage: guide absent source "Names a worksheet derivation step stage."
   guides/rater.md type RaterErrorCode: guide absent source "Names a coded `RaterError` programmer-error code."
   guides/rater.md type TotalHandler: guide absent source "Represents a pure total port over resolved lines."
   guides/rater.md interface LineDefinition: guide absent source "Represents one rateable line — a quantitative definition joined to display metadata."
   guides/rater.md interface RatingDefinition: guide absent source "Represents a pure authored rating — a named, ordered set of lines."
   guides/rater.md interface Evidence: guide absent source "Represents a checked-evidence row rendered into a display-neutral sentence."
   guides/rater.md interface WorksheetFactor: guide absent source "Represents a resolved quantitative factor, joined to its authored metadata."
   guides/rater.md interface WorksheetGroup: guide absent source "Represents a resolved quantitative group, joined to its authored metadata."
   guides/rater.md interface Step: guide absent source "Represents a display-neutral worksheet derivation step."
   guides/rater.md interface Worksheet: guide absent source "Represents a quantitative definition joined to its result — the rating audit trail."
   guides/rater.md interface LineResult: guide absent source "Represents one line's rating outcome."
   guides/rater.md interface RatingResult: guide absent source "Represents a rated outcome across every line of one `rate` call."
   guides/rater.md type RaterEventMap: guide absent source "Represents the push observation surface of a `RaterInterface`."
   guides/rater.md interface RaterOptions: guide absent source "Configures `createRater` and the `Rater` constructor."
   guides/rater.md interface RaterInterface: guide absent source "Represents the rating orchestrator over the shared quantitative reasoning engine."
   guides/rater.md class RaterError: guide "Carries a `RaterErrorCode` (`DEFINITION` / `MISMATCH` / `DESTROYED`) + optional `context`." source "Represents a coded programmer error thrown by the rating layer."
   guides/rater.md function isRaterError: guide "Narrow a caught value to a `RaterError`." source "Narrows a caught value to a `RaterError`."
   guides/rater.md const isStage: guide absent source "Determines whether a value is a `Stage` literal."
   guides/rater.md function isLineDefinition: guide absent source "Determines whether a value is an exact `LineDefinition` record."
   guides/rater.md function isRatingDefinition: guide absent source "Determines whether a value is an exact `RatingDefinition` record."
   guides/rater.md function isEvidence: guide absent source "Determines whether a value is an open result-side `Evidence` object."
   guides/rater.md function isWorksheetFactor: guide absent source "Determines whether a value is an open `WorksheetFactor` result object."
   guides/rater.md function isWorksheetGroup: guide absent source "Determines whether a value is an open `WorksheetGroup` result object."
   guides/rater.md function isStep: guide absent source "Determines whether a value is an open `Step` result object."
   guides/rater.md function isWorksheet: guide absent source "Determines whether a value is an open `Worksheet` result object."
   guides/rater.md function isLineResult: guide absent source "Determines whether a value is an open `LineResult` object."
   guides/rater.md function isRatingResult: guide absent source "Determines whether a value is an open `RatingResult` object."
   guides/rater.md function buildLineDefinition: guide "Build a `LineDefinition` from id / name / rate (`overrides` merged over the defaults)." source "Builds a `LineDefinition`."
   guides/rater.md function buildRatingDefinition: guide "Build a `RatingDefinition` from id / name / lines (`overrides` merged over the defaults)." source "Builds a `RatingDefinition`."
   guides/rater.md function buildEvidence: guide "Build an `Evidence` row from an evaluated `Check`." source "Builds an `Evidence` row from an evaluated `Check`."
   guides/rater.md function buildEvidenceRows: guide "Build one evidence row per authored check of a quantitative factor, joined to its result." source "Builds one evidence row per authored check of a quantitative factor, joined to that check's evaluated result."
   guides/rater.md function buildWorksheetFactor: guide "Join one authored quantitative factor to its evaluated `FactorResult`." source "Joins one authored quantitative factor to its evaluated `FactorResult`."
   guides/rater.md function buildWorksheetGroup: guide "Join one authored quantitative group to its evaluated `GroupResult`." source "Joins one authored quantitative group to its evaluated `GroupResult`."
   guides/rater.md function buildWorksheetStep: guide "Build one display-neutral `Step` row." source "Builds one display-neutral `Step` row."
   guides/rater.md function buildWorksheetSteps: guide "Build the ordered `Step` rows for a resolved `Worksheet`." source "Builds the ordered `Step` rows for a resolved `Worksheet`."
   guides/rater.md function buildWorksheet: guide "Join a `QuantitativeDefinition` and its `QuantitativeResult` into a `Worksheet` — the rating audit trail." source "Joins a `QuantitativeDefinition` and its `QuantitativeResult` into a `Worksheet` — the rating audit trail."
   guides/rater.md function buildLineResult: guide "Build a rated `LineResult` from a line's evaluated `QuantitativeResult`." source "Builds a rated `LineResult` from a line's evaluated `QuantitativeResult`."
   guides/rater.md function sumAmounts: guide "Sum defined line amounts." source "Sums defined line amounts."
   guides/rater.md function createRater: guide absent source "Creates a rating orchestrator."
   guides/rater.md class Rater: guide "The rating orchestrator — owns (or receives) the shared quantitative reasoning engine and projects results into the rating domain vocabulary." source "Orchestrates rating — owns (or receives) the shared quantitative reasoning engine and projects results into the rating domain vocabulary."
   guides/rater.md RaterInterface.rate: guide absent source absent
   guides/rater.md RaterInterface.destroy: guide absent source absent
   guides/rater.md pitch: readme absent tagline "A typed quantitative rating layer over `@orkestrel/reason`'s shared engine: authored lines — each a plain reason `QuantitativeDefinition` joined to display metadata — are rated against a subject (a plain data record) to produce a `LineResult` per line (an `amount` plus its `Worksheet` audit trail) and one `RatingResult` (every line's outcome plus a derived `total`). The caller decides WHICH lines to rate for a subject — `Rater` only rates the lines it is given and reports what each one resolved to; it performs NO evaluation arithmetic of its own. Rating never mutates its inputs: every result is a fresh object. `Rater` either receives an injected `ReasonInterface` (never destroyed by `Rater`) or builds and OWNS its own quantitative-only engine (`bail: false`), destroyed in `destroy()`. An injected engine MUST be able to dispatch a quantitative definition — one it cannot dispatch surfaces the engine's own error, never wrapped by this package. Every `rate` call fires once through `Rater`'s typed `emitter`. Source: `src/core`. Surfaced through the `@src/core` barrel."
   rows read: 1, disagreements found: 43
   exit 1
-- check
   tests/guides.test.ts(124,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(127,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(131,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(146,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(161,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  5 failed | 21 passed (26)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 15 | summary 15 | banned 0 | tests/setup.ts(15) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for rater (taken 2026-09-07T16:43Z by facts.sh)

- Checkout `/home/user/fleet/rater`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `9162d8a`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 15 | summary 15 | banned 0 | tests/setup.ts(15) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                   | Source                    | Tests                                 |
    8:| ------- | ---------------------- | ------------------------- | ------------------------------------- |
    9:| Rater   | [`rater.md`](rater.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                  |
    14:| ---------- | ---------------------- |
    15:| `src/core` | [`rater.md`](rater.md) |
- Guide `guides/rater.md`: 294 lines. Headings:
    1:# Rater
    17:## Surface
    62:### Types
    82:### Errors
    99:### Validators
    137:### Helpers
    238:### Factories
    254:### Entities
    260:## Methods
    267:#### `RaterInterface`
- Table headers in `guides/rater.md` (a header row is the row before a `| ---` row):
    64: | Type               | Kind      | Shape                                                                                                                                                           |
    84: | API            | Kind     | Summary                                                                                    |
    111: | API                  | Kind     | Checks                                                                                                                                                                      | Leaves unchecked and why                                                                                                         |
    142: | API                     | Kind     | Summary                                                                                                   |
    240: | API           | Kind     | Builds…                                                                   |
    256: | API     | Kind  | Summary                                                                                                                                       |
    274: | Method    | Returns        | Behavior                                                                                        |
- Rows of any `### Entities` table (the Kind cell):
    258:  `Rater` | class
- H1 blockquote (`guides/rater.md`):
    3: > A typed quantitative rating layer over `@orkestrel/reason`'s shared engine: authored
    4: > **lines** — each a plain reason `QuantitativeDefinition` joined to display metadata —
    5: > are rated against a **subject** (a plain data record) to produce a `LineResult` per
    6: > line (an `amount` plus its `Worksheet` audit trail) and one `RatingResult` (every
    7: > line's outcome plus a derived `total`). The caller decides WHICH lines to rate for a
    8: > subject — `Rater` only rates the lines it is given and reports what each one resolved
    9: > to; it performs NO evaluation arithmetic of its own. Rating never mutates its inputs:
    10: > every result is a fresh object. `Rater` either receives an injected `ReasonInterface`
    11: > (never destroyed by `Rater`) or builds and OWNS its own quantitative-only engine
    12: > (`bail: false`), destroyed in `destroy()`. An injected engine MUST be able to dispatch
    13: > a quantitative definition — one it cannot dispatch surfaces the engine's own error,
    14: > never wrapped by this package. Every `rate` call fires once through `Rater`'s typed
    15: > `emitter`. Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    17: ## Surface
    19: Create a rater, rate one subject against a list of lines (or a full rating
- README (`README.md`) first lines:
    # @orkestrel/rater
    
    A typed **quantitative rating layer** over [`@orkestrel/reason`](https://github.com/orkestrel/reason):
    authored **lines** — each a plain reason `QuantitativeDefinition` joined to display
    metadata — are rated against a **subject** (a plain data record) to produce a
    `LineResult` per line (an `amount` plus its `Worksheet` audit trail) and one
    `RatingResult` (every line's outcome plus a derived `total`). The caller decides
    which lines to rate; `Rater` only evaluates what it is given. Rating never mutates
    its inputs — every result is a fresh object. Environment-agnostic — no I/O, no
    browser or server assumptions. Part of the `@orkestrel` line.
    
    ## Install
- `## Patterns` fences, each with its nearest preceding heading:
    22: fence under "## Surface"
    89: fence under "### Errors"
    124: fence under "### Validators"
    159: fence under "### Helpers"
    176: fence under "### Helpers"
    190: fence under "### Helpers"
    247: fence under "### Factories"
    279: fence under "#### `RaterInterface`"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:18:export function createRater(options?: RaterOptions): RaterInterface {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/Rater.ts:47:export class Rater implements RaterInterface {
    src/core/errors.ts:18:export class RaterError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/validators.ts:10
    src/core/factories.ts:1
    src/core/helpers.ts:11
    src/core/Rater.ts:1
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    65:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    71:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    116:		for (const group of guide.methods()) {
    117:			const members = source.methods(group.interface)
    124:					expect(findMissing(members, group.methods)).toEqual([])
    127:					expect(findMissing(group.methods, members)).toEqual([])
    131:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    146:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    149:		for (const group of guide.methods()) {
    159:							? source.examples(group.interface)
    160:							: source.examples(group.interface).concat(source.examples(entity))
    161:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    173:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks:  — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.13"` → `"version": "0.0.14"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-rater-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
