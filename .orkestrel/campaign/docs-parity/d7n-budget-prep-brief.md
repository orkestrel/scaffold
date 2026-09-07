# Brief — P.1 `d7n-budget-prep` (budget's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/budget` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `5008f15`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

budget's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== budget 2026-09-07T15:03:11Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
78:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 978ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### budget (5008f15, version 0.0.9, guide range ^0.0.17, head start 0.0.18)
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
   tests/setup.ts(2)
-- docs
   guides/budget.md function createBudget: guide "Create a `BudgetInterface<T>` for `max` with a `consumer`, optionally a trace `id` and a parent `signal`." source "Creates a cumulative budget whose native signal aborts at its ceiling."
   guides/budget.md function createTokenConsumer: guide "Create a unary consumer that charges one selected `TokenUsage` field." source "Creates a validated token consumer for one selected usage field."
   guides/budget.md function createTokenBudget: guide "Create a `BudgetInterface<TokenUsage>` charging a chosen `scope` field (`completion` default / `total` / `prompt`)." source "Creates a token budget charging one validated usage field per provider call."
   guides/budget.md function isBudgetAmount: guide "Guard a finite nonnegative numeric budget amount." source "Determines whether a value is a valid budget amount."
   guides/budget.md function isBudgetSignal: guide "Guard a genuine native `AbortSignal` without throwing on hostile input." source "Determines whether a value is a genuine native `AbortSignal`."
   guides/budget.md function isTokenScope: guide "Guard a supported `TokenScope` field selector." source "Determines whether a value selects a supported token usage field."
   guides/budget.md function isTokenUsage: guide "Guard three finite nonnegative token counts without throwing." source "Determines whether a value is readable token usage with valid numeric fields."
   guides/budget.md function validateBudgetOptions: guide "Validate once-read budget options and return a fresh copy omitting absent optional keys." source "Validates and normalizes budget construction options."
   guides/budget.md function validateTokenBudgetOptions: guide "Validate once-read token-budget options and return a fresh copy omitting absent optional keys." source "Validates and normalizes token-budget construction options."
   guides/budget.md class Budget: guide "A cumulative consumption tally whose `signal` fires when `consumed` reaches the `max` ceiling." source "Represents a cumulative cost handle whose native `AbortSignal` aborts at its ceiling."
   guides/budget.md interface BudgetOptions: guide absent source "Represents the options for constructing a cumulative budget."
   guides/budget.md interface TokenBudgetOptions: guide absent source "Represents the options for constructing a token budget."
   guides/budget.md interface BudgetInterface: guide absent source "Represents a cumulative cost handle whose native signal aborts at its ceiling."
   guides/budget.md type TokenScope: guide absent source "Names the token-usage field selected as the charge for a token budget."
   guides/budget.md interface TokenUsage: guide absent source "Represents the canonical finite nonnegative token counts reported for one provider call."
   guides/budget.md BudgetInterface.start: guide absent source "Re-arms a fresh signal without resetting the cumulative tally."
   guides/budget.md BudgetInterface.consume: guide absent source "Validates and atomically adds the charge extracted from a domain value."
   guides/budget.md BudgetInterface.clear: guide absent source "Resets the tally and re-arms a fresh signal."
   guides/budget.md pitch: readme absent tagline "The cost primitive: a cumulative consumption tally against a ceiling that exposes an `AbortSignal` firing the moment the budget is exhausted. You charge a `Budget<T>` as work spends — `consume(value)` adds to a running `consumed` total — and race its `signal` against that work to cap how much it may burn (tokens, bytes, calls). When `consumed` crosses `max`, `signal` aborts; fold it into a loop's bound so the loop stops generating after the budget is spent. This is the substrate's third bounding signal, a peer to a cancellation signal (fires on `abort()`) and a deadline signal (fires on expiry). All three are plain `AbortSignal`s by design, so an agent loop combines them into one bound with `AbortSignal.any([abort, timeout, budget])` and reacts to whichever trips first — cancel, deadline, or cost. A budget deliberately carries no Emitter, clock, or I/O: its native signal is the complete observation boundary. It is a functional counter with a signal bolted to its ceiling — nothing more, so the surface stays small. Source: `src/core`. Surfaced through the `@src/core` barrel."
   rows read: 1, disagreements found: 19
   exit 1
-- check
   tests/guides.test.ts(102,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(105,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(109,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(124,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(139,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  5 failed | 21 passed (26)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 39ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) } ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) } ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 2 | summary 2 | banned 0 | tests/setup.ts(2) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+23,	+     "message": "prose carries no banned term: simply (delete)",	+     "path": "guides/budget.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for budget (taken 2026-09-07T15:03Z by facts.sh)

- Checkout `/home/user/fleet/budget`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `5008f15`, status: clean
- `package.json`: version `0.0.9`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 2 | summary 2 | banned 0 | tests/setup.ts(2) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                     | Source                    | Tests                                 |
    8:| ------- | ------------------------ | ------------------------- | ------------------------------------- |
    9:| Budget  | [`budget.md`](budget.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                    |
    14:| ---------- | ------------------------ |
    15:| `src/core` | [`budget.md`](budget.md) |
- Guide `guides/budget.md`: 191 lines. Headings:
    1:# Budget
    9:## Surface
    27:### Factories
    35:### Validators
    44:### Helpers
    51:### Entities
    57:### Types
    69:## Methods
    73:#### `BudgetInterface`
    83:## Contract
    101:## Patterns
    103:### Race work against the ceiling
    121:### A token budget folded into an agent loop's bound
    142:### Re-arm per request, spend across the session
    157:### Reuse a handle with `clear()`
    172:### Practices
    180:## Tests
    188:## See also
- Table headers in `guides/budget.md` (a header row is the row before a `| ---` row):
    29: | API                   | Kind     | Summary                                                                                                             |
    37: | API              | Kind     | Summary                                                                 |
    46: | API                          | Kind     | Summary                                                                                        |
    53: | API      | Kind  | Summary                                                                                        |
    59: | Type                 | Kind      | Shape                                                                                                                                |
    77: | Method    | Returns | Behavior                                                                                                                       |
- Rows of any `### Entities` table (the Kind cell):
    55:  `Budget` | class
- H1 blockquote (`guides/budget.md`):
    3: > The cost primitive: a cumulative consumption tally against a ceiling that exposes an `AbortSignal` firing the moment the budget is **exhausted**. You charge a `Budget<T>` as work spends — `consume(value)` adds to a running `consumed` total — and race its `signal` against that work to cap how much it may burn (tokens, bytes, calls). When `consumed` crosses `max`, `signal` aborts; fold it into a loop's bound so the loop stops generating after the budget is spent.
    4: >
    5: > This is the substrate's third bounding signal, a peer to a cancellation signal (fires on `abort()`) and a deadline signal (fires on expiry). All three are plain `AbortSignal`s by design, so an agent loop combines them into one bound with `AbortSignal.any([abort, timeout, budget])` and reacts to whichever trips first — cancel, deadline, or cost. A budget deliberately carries no Emitter, clock, or I/O: its native signal is the complete observation boundary. It is a functional counter with a signal bolted to its ceiling — nothing more, so the surface stays small.
    6: >
    7: > Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    9: ## Surface
    11: Create a cost handle, `start()` it, and race its `signal` against work; `consume(value)` to charge the tally as work spends:
- README (`README.md`) first lines:
    # @orkestrel/budget
    
    A typed spending budget — a cumulative consumption tally against a ceiling
    that exposes an `AbortSignal` firing the moment the budget is **exhausted**.
    Charge a `Budget<T>` as work spends — `consume(value)` adds to a running
    `consumed` total — and race its `signal` against that work to cap how much it
    may burn (tokens, bytes, calls). A convenience `createTokenBudget` factory
    wraps the canonical LLM cost unit (`TokenUsage`) so callers don't have to
    write their own consumer. Deliberately small: a pure, functional counter
    with a signal bolted to its ceiling, no Emitter, no clock, no I/O of its own.
    Part of the `@orkestrel` line.
    
- `## Patterns` fences, each with its nearest preceding heading:
    13: fence under "## Surface"
    107: fence under "### Race work against the ceiling"
    125: fence under "### A token budget folded into an agent loop's bound"
    146: fence under "### Re-arm per request, spend across the session"
    161: fence under "### Reuse a handle with `clear()`"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/Budget.ts:30:export class Budget<T> implements BudgetInterface<T> {
    src/core/factories.ts:29:export function createBudget<T>(options: BudgetOptions<T>): BudgetInterface<T> {
    src/core/factories.ts:47:export function createTokenConsumer(scope: TokenScope): BudgetOptions<TokenUsage>['consumer'] {
    src/core/factories.ts:118:export function createTokenBudget(options: TokenBudgetOptions): BudgetInterface<TokenUsage> {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/Budget.ts:1
    src/core/validators.ts:4
    src/core/factories.ts:3
    src/core/helpers.ts:2
    src/core/types.ts:5
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    43:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    49:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    94:		for (const group of guide.methods()) {
    95:			const members = source.methods(group.interface)
    102:					expect(findMissing(members, group.methods)).toEqual([])
    105:					expect(findMissing(group.methods, members)).toEqual([])
    109:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    124:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    127:		for (const group of guide.methods()) {
    137:							? source.examples(group.interface)
    138:							: source.examples(group.interface).concat(source.examples(entity))
    139:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    151:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 180:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.9"` → `"version": "0.0.10"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-budget-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
