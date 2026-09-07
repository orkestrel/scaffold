# Brief — P.1 `d7n-timeout-prep` (timeout's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/timeout` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `12ad4f1`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

timeout's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== timeout 2026-09-07T15:15:25Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
77:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 846ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### timeout (12ad4f1, version 0.0.9, guide range ^0.0.17, head start 0.0.18)
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
-- docs
   guides/timeout.md function createTimeout: guide "Create a `TimeoutInterface` deadline handle from `TimeoutOptions`." source "Creates a controllable deadline whose native signal aborts on expiry."
   guides/timeout.md class Timeout: guide "The controllable `setTimeout` wrapper; implements `TimeoutInterface` exactly." source "Represents a controllable deadline whose native `AbortSignal` aborts when it expires."
   guides/timeout.md const MAX_TIMEOUT_MS: guide "Largest accepted duration: `2_147_483_647` milliseconds." source "Names the largest timeout duration accepted by the package, in milliseconds."
   guides/timeout.md function isTimeoutDuration: guide "Total validator for an integer in the inclusive timeout range." source "Determines whether a value is an accepted timeout duration."
   guides/timeout.md function isTimeoutSignal: guide "Total native-brand validator for a genuine `AbortSignal`." source "Determines whether a value is a genuine native `AbortSignal`."
   guides/timeout.md function validateTimeoutOptions: guide "Validate once-read timeout options and return a fresh copy omitting absent option keys." source "Validates and normalizes timeout construction options."
   guides/timeout.md interface TimeoutOptions: guide absent source "Represents the options for constructing a timeout deadline."
   guides/timeout.md interface TimeoutInterface: guide absent source "Represents a controllable deadline exposing a native `AbortSignal` that aborts on expiry."
   guides/timeout.md TimeoutInterface.start: guide absent source "Arms or re-arms the deadline."
   guides/timeout.md TimeoutInterface.clear: guide absent source "Cancels an armed deadline without aborting its signal and resets expiry state."
   guides/timeout.md pitch: readme absent tagline "A controllable `setTimeout` wrapper that exposes an `AbortSignal` which fires on expiry, for racing work against a deadline. A `Timeout` carries a trace `id`, a deadline `ms`, and `start()` / `clear()` controls — arm the deadline, then race its `signal` against work to bound how long that work may run. The time-bound half of the substrate's time-and-cancellation pair. Deliberately thin: it is not a scheduler, not a debounce/throttle, not a retry policy — one `setTimeout` made re-armable, clearable, and parent-linkable. Its native `AbortSignal` is the complete observation surface; there is no separate event map. `start()` arms the deadline, `clear()` cancels it without firing, and calling `start()` again after an expiry swaps in a fresh signal, so a handle is reusable across deadlines without re-construction. Source: `src/core`. Surfaced through the `@src/core` barrel."
   rows read: 1, disagreements found: 11
   exit 1
-- check
   tests/guides.test.ts(106,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(109,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(113,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(128,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(143,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
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
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 0 | summary 0 | banned 0 | .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for timeout (taken 2026-09-07T15:15Z by facts.sh)

- Checkout `/home/user/fleet/timeout`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `12ad4f1`, status: clean
- `package.json`: version `0.0.9`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 0 | summary 0 | banned 0 | 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                       | Source                    | Tests                                 |
    8:| ------- | -------------------------- | ------------------------- | ------------------------------------- |
    9:| Timeout | [`timeout.md`](timeout.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                      |
    14:| ---------- | -------------------------- |
    15:| `src/core` | [`timeout.md`](timeout.md) |
- Guide `guides/timeout.md`: 236 lines. Headings:
    1:# Timeout
    16:## Surface
    46:### Factories
    52:### Entities
    58:### Constants
    64:### Validators
    71:### Helpers
    77:### Types
    89:## Methods
    96:#### `TimeoutInterface`
    106:## Contract
    141:## Patterns
    143:### Race work against a deadline
    160:### Link a parent signal
    185:### Reuse a handle across deadlines
    198:### Practices
    211:## Tests
    227:## See also
- Table headers in `guides/timeout.md` (a header row is the row before a `| ---` row):
    48: | API             | Kind     | Summary                                                            |
    54: | API       | Kind  | Summary                                                                       |
    60: | API              | Kind  | Summary                                                  |
    66: | API                 | Kind     | Summary                                                        |
    73: | API                      | Kind     | Summary                                                                                 |
    79: | Type               | Kind      | Shape                                                                                                |
    101: | Method  | Returns | Behavior                                                                                           |
- Rows of any `### Entities` table (the Kind cell):
    56:  `Timeout` | class
- H1 blockquote (`guides/timeout.md`):
    3: > A controllable `setTimeout` wrapper that exposes an `AbortSignal` which fires
    4: > on expiry, for racing work against a deadline. A `Timeout` carries a trace
    5: > `id`, a deadline `ms`, and `start()` / `clear()` controls — arm the deadline,
    6: > then race its `signal` against work to bound how long that work may run. The
    7: > time-bound half of the substrate's time-and-cancellation pair. Deliberately
    8: > thin: it is not a scheduler, not a debounce/throttle, not a retry policy —
    9: > one `setTimeout` made re-armable, clearable, and parent-linkable. Its native
    10: > `AbortSignal` is the complete observation surface; there is no separate event
    11: > map. `start()` arms the deadline, `clear()` cancels it without firing, and
    12: > calling `start()` again after an expiry swaps in a fresh signal, so a handle
    13: > is reusable across deadlines without re-construction. Source:
    14: > [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    16: ## Surface
    18: Create a deadline handle, arm it, and hand its `signal` to deadline-aware
- README (`README.md`) first lines:
    # @orkestrel/timeout
    
    A typed, **controllable** `setTimeout` wrapper — a deadline handle that
    exposes an `AbortSignal` which fires on expiry, for racing against work.
    Deliberately small: `start()` arms the deadline, `clear()` cancels it without
    firing, and calling `start()` again after expiry reuses the handle for a
    fresh deadline without re-construction. An optional parent `signal` links in
    without inheriting `AbortSignal.any` semantics — a parent abort during the
    timing window _clears_ the timeout (it never expires) rather than firing it.
    Part of the `@orkestrel` line.
    
    ## Install
- `## Patterns` fences, each with its nearest preceding heading:
    21: fence under "## Surface"
    145: fence under "### Race work against a deadline"
    166: fence under "### Link a parent signal"
    187: fence under "### Reuse a handle across deadlines"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:35:export function createTimeout(options: TimeoutOptions): TimeoutInterface {
    src/core/Timeout.ts:29:export class Timeout implements TimeoutInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/validators.ts:2
    src/core/factories.ts:1
    src/core/helpers.ts:1
    src/core/constants.ts:1
    src/core/Timeout.ts:1
    src/core/types.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    21:} from '@orkestrel/guide'
    44:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    53:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    98:		for (const group of guide.methods()) {
    99:			const members = source.methods(group.interface)
    106:					expect(findMissing(members, group.methods)).toEqual([])
    109:					expect(findMissing(group.methods, members)).toEqual([])
    113:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    128:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    131:		for (const group of guide.methods()) {
    141:							? source.examples(group.interface)
    142:							: source.examples(group.interface).concat(source.examples(entity))
    143:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    155:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 211:## Tests — 0 lines naming a check or a code

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

`/home/user/scaffold/tmp/units/d7n-timeout-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
