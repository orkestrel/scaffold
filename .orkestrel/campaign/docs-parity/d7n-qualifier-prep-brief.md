# Brief — P.1 `d7n-qualifier-prep` (qualifier's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/qualifier` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `9a50a88`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

qualifier's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== qualifier 2026-09-07T16:42:42Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
78:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 1s
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### qualifier (9a50a88, version 0.0.13, guide range ^0.0.17, head start 0.0.18)
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
   guides/qualifier.md type QualificationContext: guide absent source "Represents the internal projection record stored under `QUALIFICATION_KEY`."
   guides/qualifier.md interface RulingInput: guide absent source "Carries the optional fields `createRuling` accepts."
   guides/qualifier.md interface QualificationInput: guide absent source "Carries the optional fields `createQualificationDefinition` accepts."
   guides/qualifier.md interface Ruling: guide absent source "Represents an authored consequence for one rule in one logical pass."
   guides/qualifier.md interface Premise: guide absent source "Represents display-neutral evidence for one condition, in one of two authoring modes. A CHECKED premise carries `field` and `comparison`; a DESCRIBED premise carries neither and renders from `description` instead. The checked form renders only when `field` and `comparison` are BOTH present, and `description` then goes unused; a premise missing either half of the checked pair renders as described instead. `met` is three-state: `true` (met), `false` (not met), or absent (not evaluated, rendered as unknown)."
   guides/qualifier.md interface Finding: guide absent source "Represents one resolved ruling."
   guides/qualifier.md interface Derivation: guide absent source "Represents one quantitative pass's audit result."
   guides/qualifier.md interface QualificationDefinition: guide absent source "Represents a pure authored qualification definition."
   guides/qualifier.md interface QualificationResult: guide absent source "Represents one subject's complete qualification outcome."
   guides/qualifier.md type QualifierErrorCode: guide absent source "Represents a coded `QualifierError` programmer-error code."
   guides/qualifier.md interface QualifierErrorContext: guide absent source "Represents the structured payload a `QualifierError` carries."
   guides/qualifier.md type QualifierEventMap: guide absent source "Represents the push observation surface of a `QualifierInterface`."
   guides/qualifier.md interface QualifierOptions: guide absent source "Carries the options for `createQualifier` / the `Qualifier` constructor."
   guides/qualifier.md interface QualifierInterface: guide absent source "Owns or borrows one reason engine and returns eligibility."
   guides/qualifier.md const DEFAULT_QUALIFIER_VALIDATE: guide "`true` — validate authored definitions before qualification." source "Holds the default definition validation policy for `createQualifier` / `Qualifier.qualify`."
   guides/qualifier.md const QUALIFICATION_KEY: guide "`'qualification'` — the reserved internal projection namespace." source "Names the reserved internal projection namespace a pass's working projection is written under."
   guides/qualifier.md const ELIGIBILITY_PRECEDENCE: guide "Severity order: `ineligible`, `referral`, `eligible`." source "Lists the eligibility severities in order — most to least severe."
   guides/qualifier.md const EFFECT_ELIGIBILITIES: guide "Eligibility impact by `QualificationEffect`; `condition` remains eligible." source "Maps each `QualificationEffect` to its eligibility impact; `condition` remains eligible."
   guides/qualifier.md class QualifierError: guide "Carries a `QualifierErrorCode` and an optional context record." source "Represents a coded programmer error thrown by the qualifier layer."
   guides/qualifier.md function isQualifierError: guide "Safely narrows a caught value to `QualifierError`." source "Narrows a caught value to a `QualifierError`."
   guides/qualifier.md const isEligibility: guide absent source "Determines whether a value is an `Eligibility` literal."
   guides/qualifier.md const isQualificationEffect: guide absent source "Determines whether a value is a `QualificationEffect` literal."
   guides/qualifier.md function isEligibilityRecord: guide absent source "Determines whether a value is an open string-keyed record of `Eligibility` values."
   guides/qualifier.md function isPremise: guide absent source "Determines whether a value is an open result-side `Premise`."
   guides/qualifier.md function isFinding: guide absent source "Determines whether a value is an open result-side `Finding`."
   guides/qualifier.md function isDerivation: guide absent source "Determines whether a value is an open result-side `Derivation`."
   guides/qualifier.md function isQualificationResult: guide absent source "Determines whether a value is an open `QualificationResult` returned by a qualifier."
   guides/qualifier.md function isRuling: guide absent source "Determines whether a value is an exact `Ruling` record."
   guides/qualifier.md function isQualificationPass: guide absent source "Determines whether a value is a `QualificationPass` (a quantitative or logical definition)."
   guides/qualifier.md function isQualificationDefinition: guide absent source "Determines whether a value is an exact `QualificationDefinition` record."
   guides/qualifier.md function interpolateMessage: guide "Interpolate `{{dotted.path}}` tokens against a subject." source "Interpolates `{{dotted.path}}` tokens in a message template against a subject."
   guides/qualifier.md function renderComparison: guide "Render one comparison as a display-neutral phrase." source "Renders a `Premise` comparison as a display-neutral verb phrase."
   guides/qualifier.md function renderValue: guide "Render scalar and structured expected values." source "Renders a structured or scalar expected value display-neutrally."
   guides/qualifier.md function renderPremise: guide "Render one premise as a sentence." source "Renders one `Premise` into a display-neutral sentence."
   guides/qualifier.md function checkToPremise: guide "Join an authored `Check` and evaluated `CheckResult`." source "Builds a `Premise` from an authored `Check` and its evaluated `CheckResult`."
   guides/qualifier.md function ruleToPremises: guide "Re-evaluate one rule's atoms into rich premise evidence." source "Builds rich premises for one fired `Rule` by walking its premise atoms and re-evaluating each against the working subject."
   guides/qualifier.md function findRule: guide "Locate one authored rule by id." source "Locates an authored `Rule` by id."
   guides/qualifier.md function reasonResultToProjection: guide "Project one reason result into the internal qualification namespace." source "Projects one reason result into the internal qualification namespace."
   guides/qualifier.md function quantitativeResultToDerivation: guide "Project a quantitative result into a `Derivation`." source "Projects a quantitative result into a `Derivation` audit record."
   guides/qualifier.md function qualificationToRecord: guide "Wrap a `QualificationContext` under `QUALIFICATION_KEY`." source "Wraps a `QualificationContext` under `QUALIFICATION_KEY`."
   guides/qualifier.md function mergeQualificationContext: guide "Copy-on-write merge one pass projection into the context." source "Merges one pass projection into the context, copy-on-write."
   guides/qualifier.md function rulingToFinding: guide "Join a ruling, rule result, subject, and evaluator into a finding." source "Joins a ruling, its logical rule result, the pass, the pre-projection subject, and an evaluator into a `Finding`."
   guides/qualifier.md function deriveFindingEligibility: guide "Derive eligibility from applied findings." source "Derives global eligibility from applied, unscoped findings."
   guides/qualifier.md function combineEligibilities: guide "Return the most severe eligibility in a list." source "Returns the most severe `Eligibility` in a list."
   guides/qualifier.md function deriveScopeEligibilities: guide "Derive one eligibility per finding scope." source "Derives one eligibility per finding scope."
   guides/qualifier.md function describeMissingReferences: guide "Describe each ruling whose pass or rule does not exist." source "Describes each ruling whose pass or rule does not exist or whose pass is not logical, and each pass id shadowing the reserved `QUALIFICATION_KEY`."
   guides/qualifier.md function hasReservedKey: guide "Whether a subject already owns `QUALIFICATION_KEY`." source "Determines whether a subject already owns the reserved `QUALIFICATION_KEY`."
   guides/qualifier.md function assertSubject: guide "Narrow and reject malformed or reserved-key subjects." source "Asserts a value is a valid qualification `Subject`, narrowing it in place."
   guides/qualifier.md function mapEngineError: guide "Map an engine throw to a typed `QualifierError`." source "Maps an engine throw caught while running one pass to a typed `QualifierError`."
   guides/qualifier.md function describeEmptyLogicalPasses: guide "Describe each logical pass carrying no rulings." source "Describes each logical pass carrying no rulings."
   guides/qualifier.md function describeUnreadDerivations: guide "Describe each quantitative pass never read by a later pass." source "Describes each quantitative pass never read by a later pass."
   guides/qualifier.md function createQualifier: guide absent source "Creates one qualifier over a reason engine."
   guides/qualifier.md function createQualificationDefinition: guide absent source "Creates a `QualificationDefinition`."
   guides/qualifier.md function createRuling: guide absent source "Creates a `Ruling` — one authored consequence for one rule in one pass."
   guides/qualifier.md class Qualifier: guide "Owns or borrows one reason engine, validates definitions, runs ordered passes, and returns eligibility." source "Runs ordered passes over one reason engine and returns eligibility."
   guides/qualifier.md QualifierInterface.qualify: guide absent source "Qualifies one subject against one authored definition."
   guides/qualifier.md QualifierInterface.validate: guide absent source "Validates one authored definition semantically, without running it."
   guides/qualifier.md QualifierInterface.destroy: guide absent source "Destroys this qualifier, idempotently."
   guides/qualifier.md pitch: readme absent tagline "A synchronous, deterministic eligibility engine. Pure, JSON-serializable `QualificationDefinition`s contain ordered `passes` (`quantitative` derivations and `logical` rulings) and are evaluated against subjects through one injected `@orkestrel/reason` engine. The result is a fresh `QualificationResult` with global `eligibility`, optional scoped eligibility, evidence-rich `findings`, quantitative `derivations`, a trace, and accumulated errors. `Qualifier` stops at eligibility — it reports whether and where a subject may proceed, never calculates line amounts, builds worksheets, totals rates, emits notices, decides authority, or aggregates a batch. Qualification never mutates its inputs: every result is a fresh object. The internal working projection under `QUALIFICATION_KEY` is discarded after each call and must never be forwarded to a downstream consumer. A failed qualification, a global `ineligible`, and a global `referral` are terminal — a caller that runs qualification ahead of a downstream step stops there. A scoped restriction removes only that named scope from what the caller selects next, so an excluded scope is never evaluated merely to discard its outcome. `Qualifier` either receives an injected `ReasonInterface` (never destroyed by `Qualifier`) or builds and OWNS its own engine (`bail: false`), destroyed in `destroy()`. An injected engine MUST be able to dispatch both quantitative and logical definitions — one it cannot dispatch surfaces `QualifierError('ENGINE')` wrapping the engine's throw. Every `qualify` call fires through `Qualifier`'s typed `emitter`. Source: `src/core`. Surfaced through the `@src/core` barrel."
   rows read: 1, disagreements found: 63
   exit 1
-- check
   tests/guides.test.ts(111,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(114,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(118,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(133,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(148,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  5 failed | 16 passed (21)
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

## Facts for qualifier (taken 2026-09-07T16:43Z by facts.sh)

- Checkout `/home/user/fleet/qualifier`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `9a50a88`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 15 | summary 15 | banned 0 | tests/setup.ts(15) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept   | Spec                           | Source                    | Tests                                 |
    8:| --------- | ------------------------------ | ------------------------- | ------------------------------------- |
    9:| Qualifier | [`qualifier.md`](qualifier.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                          |
    14:| ---------- | ------------------------------ |
    15:| `src/core` | [`qualifier.md`](qualifier.md) |
- Guide `guides/qualifier.md`: 826 lines. Headings:
    1:# Qualifier
    30:## Surface
    68:### Types
    98:### Constants
    112:### Errors
    142:### Validators
    210:### Helpers
    337:### Factories
    367:### Entities
    373:## Methods
    375:#### `QualifierInterface`
    410:## Contract
    412:### Qualification order
    447:### Eligibility
    471:### Scopes
    497:### Validation
    522:## Patterns
    524:### Quantitative derivation before logical eligibility
    587:### Scoped exclusion
    621:### Conditions do not block downstream work
    640:### Referral blocks downstream work
    652:### Engine injection
    683:### Observing
    699:### Caller composition
    722:### Batch aggregates
    743:### Scoped eligibility drives selection
    791:## Tests
    814:## Practices
- Table headers in `guides/qualifier.md` (a header row is the row before a `| ---` row):
    70: | Type                      | Kind      | Shape                                                                                                                                                                                                             |
    100: | API                          | Kind  | Summary                                                                    |
    114: | API                | Kind     | Summary                                                        |
    153: | API                         | Kind     | Posture | Checks                                                                                           | Leaves unchecked and why                                                                                              |
    215: | API                              | Kind     | Summary                                                              |
    339: | API                             | Kind     | Builds                       |
    369: | API         | Kind  | Summary                                                                                                 |
    382: | Method     | Returns                  | Behavior                                                                                                   |
    451: | Effect        | Eligibility  |
- Rows of any `### Entities` table (the Kind cell):
    371:  `Qualifier` | class
- H1 blockquote (`guides/qualifier.md`):
    3: > A synchronous, deterministic **eligibility engine**.
    4: > Pure, JSON-serializable `QualificationDefinition`s contain ordered `passes`
    5: > (`quantitative` derivations and `logical` rulings) and are evaluated against
    6: > subjects through one injected `@orkestrel/reason` engine. The result is a fresh
    7: > `QualificationResult` with global `eligibility`, optional scoped eligibility,
    8: > evidence-rich `findings`, quantitative `derivations`, a trace, and accumulated
    9: > errors.
    10: >
    11: > `Qualifier` stops at eligibility — it reports whether and where a subject may
    12: > proceed, never calculates line amounts, builds worksheets, totals rates, emits
    13: > notices, decides authority, or aggregates a batch. Qualification never mutates
    14: > its inputs: every result is a fresh object. The internal working projection under
    15: > `QUALIFICATION_KEY` is discarded after each call and must never be forwarded to
    16: > a downstream consumer. A failed qualification, a global `ineligible`, and a
    17: > global `referral` are terminal — a caller that runs qualification ahead of a
    18: > downstream step stops there. A scoped restriction removes only that named scope
    19: > from what the caller selects next, so an excluded scope is never evaluated merely
    20: > to discard its outcome.
    21: >
    22: > `Qualifier` either receives an injected `ReasonInterface` (never destroyed by
    23: > `Qualifier`) or builds and OWNS its own engine (`bail: false`), destroyed in
    24: > `destroy()`. An injected engine MUST be able to dispatch both quantitative and
    25: > logical definitions — one it cannot dispatch surfaces `QualifierError('ENGINE')`
    26: > wrapping the engine's throw. Every `qualify` call fires through `Qualifier`'s
    27: > typed `emitter`. Source: [`src/core`](../src/core). Surfaced
    28: > through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    30: ## Surface
    32: Create a qualifier, author a definition, and qualify a subject:
- README (`README.md`) first lines:
    # @orkestrel/qualifier
    
    A typed **eligibility engine** over [`@orkestrel/reason`](https://github.com/orkestrel/reason):
    authored **passes** — quantitative derivations and logical rule gates — run in order
    against a **subject** (a plain data record) to produce **findings** (evidence-rich
    ruling outcomes), **derivations** (quantitative audit trails), and **eligibility**
    (global plus per-scope). The caller supplies the definition; `Qualifier` only
    evaluates what it is given. Qualification never mutates its inputs — every result is
    a fresh object. Environment-agnostic — no I/O, no browser or server assumptions.
    Part of the `@orkestrel` line.
    
    ## Install
- `## Patterns` fences, each with its nearest preceding heading:
    34: fence under "## Surface"
    126: fence under "### Errors"
    166: fence under "### Validators"
    245: fence under "### Helpers"
    310: fence under "### Helpers"
    345: fence under "### Factories"
    388: fence under "#### `QualifierInterface`"
    427: fence under "### Qualification order"
    433: fence under "### Qualification order"
    441: fence under "### Qualification order"
    463: fence under "### Eligibility"
    477: fence under "### Scopes"
    486: fence under "### Scopes"
    529: fence under "### Quantitative derivation before logical eligibility"
    592: fence under "### Scoped exclusion"
    614: fence under "### Scoped exclusion"
    623: fence under "### Conditions do not block downstream work"
    632: fence under "### Conditions do not block downstream work"
    642: fence under "### Referral blocks downstream work"
    660: fence under "### Engine injection"
    685: fence under "### Observing"
    704: fence under "### Caller composition"
    728: fence under "### Batch aggregates"
    749: fence under "### Scoped eligibility drives selection"
    774: fence under "### Scoped eligibility drives selection"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:36:export function createQualifier(options?: QualifierOptions): QualifierInterface {
    src/core/factories.ts:61:export function createQualificationDefinition(
    src/core/factories.ts:94:export function createRuling(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/Qualifier.ts:54:export class Qualifier implements QualifierInterface {
    src/core/errors.ts:18:export class QualifierError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/Qualifier.ts:4
    src/core/factories.ts:3
    src/core/helpers.ts:21
    src/core/types.ts:3
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    52:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    58:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    103:		for (const group of guide.methods()) {
    104:			const members = source.methods(group.interface)
    111:					expect(findMissing(members, group.methods)).toEqual([])
    114:					expect(findMissing(group.methods, members)).toEqual([])
    118:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    133:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    136:		for (const group of guide.methods()) {
    146:							? source.examples(group.interface)
    147:							: source.examples(group.interface).concat(source.examples(entity))
    148:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    160:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 791:## Tests — 0 lines naming a check or a code

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

`/home/user/scaffold/tmp/units/d7n-qualifier-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
