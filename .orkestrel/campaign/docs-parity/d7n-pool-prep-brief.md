# Brief — P.1 `d7n-pool-prep` (pool's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/pool` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `dd48e2d`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

pool's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== pool 2026-09-07T15:33:19Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
76:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 943ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### pool (dd48e2d, version 0.0.10, guide range ^0.0.17, head start 0.0.18)
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
   guides/pool.md function createPool: guide "Construct a distinct `PoolInterface` from resource lifecycle hooks." source "Creates a resource pool with optional bounded capacity, unique ownership, and FIFO settlement."
   guides/pool.md class Pool: guide "The unique-record FIFO lifecycle engine." source "Represents a capacity-aware resource pool whose opaque ownership records preserve FIFO settlement, cancellation, exact lease release, and deterministic teardown under concurrent hooks."
   guides/pool.md class PoolError: guide "A coded failure retaining a hostile-safe cause and structured context." source "Represents a stable, machine-readable pool failure with the original cause and structured context."
   guides/pool.md function isPoolError: guide "Total guard for `PoolError`, including hostile proxy inputs." source "Tests whether an unknown value is a `PoolError`, returning `false` for hostile proxies."
   guides/pool.md function isPoolMax: guide "Accept only positive safe integers as explicit pool maxima." source "Tests whether a value is a valid finite pool maximum."
   guides/pool.md function isPoolSignal: guide "Total native `AbortSignal` guard for the acquire boundary." source "Tests whether a value is a native `AbortSignal`, returning `false` for hostile proxies."
   guides/pool.md type PoolCode: guide "`invalid`, `destroyed`, `create`, or `cleanup`." source "Names the machine-readable failure codes produced by `PoolError`."
   guides/pool.md interface PoolContext: guide "Rejected input or distinct aggregate destroy-hook failures." source "Represents the structured context attached to a `PoolError`."
   guides/pool.md interface PoolErrorOptions: guide "Code, optional cause, and optional context for `PoolError`." source "Represents the construction options for `PoolError`."
   guides/pool.md type PoolEventMap: guide "`create`, `acquire`, `release`, and `destroy` lifecycle signals." source "Represents the observable resource lifecycle events emitted by a `PoolInterface`."
   guides/pool.md interface PoolToken: guide "A unique lease with readonly `value` and idempotent `release()`." source "Represents a unique lease over one pool-owned resource record."
   guides/pool.md interface PoolOptions: guide "Create, destroy, validation, capacity, and emitter options." source "Represents the resource lifecycle options for `Pool` and `createPool`."
   guides/pool.md interface PoolInterface: guide "Count/emitter properties plus `acquire`, `clear`, and `destroy`." source "Represents a FIFO resource pool with optional bounded capacity and deterministic teardown."
   guides/pool.md PoolInterface.acquire: guide absent source "Queues and leases one resource in FIFO settlement order."
   guides/pool.md PoolInterface.clear: guide absent source "Destroys the records that are idle at this call's synchronous snapshot."
   guides/pool.md PoolInterface.destroy: guide absent source "Tears down the pool permanently and returns its stable completion barrier."
   guides/pool.md PoolToken.release: guide absent source "Gives this exact lease back once; subsequent calls are no-ops."
   guides/pool.md pitch: readme absent tagline "A typed resource pool with optional bounded capacity, unique ownership, FIFO settlement, validated reuse, caller-owned cancellation, explicit cleanup failures, and a stable event-driven teardown barrier. It has no warm floor, eviction timer, acquire timeout, or polling loop."
   rows read: 1, disagreements found: 18
   exit 1
-- check
   tests/guides.test.ts(102,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(105,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(109,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(124,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(139,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 7 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  7 failed | 18 passed (25)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 2 | summary 2 | banned 0 | tests/setup.ts(2) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for pool (taken 2026-09-07T15:36Z by facts.sh)

- Checkout `/home/user/fleet/pool`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `dd48e2d`, status: clean
- `package.json`: version `0.0.10`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: no
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 2 | summary 2 | banned 0 | tests/setup.ts(2) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                 | Source                    | Tests                                 |
    8:| ------- | -------------------- | ------------------------- | ------------------------------------- |
    9:| Pool    | [`pool.md`](pool.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                |
    14:| ---------- | -------------------- |
    15:| `src/core` | [`pool.md`](pool.md) |
- Guide `guides/pool.md`: 261 lines. Headings:
    1:# Pool
    8:## Surface
    32:### Factories
    38:### Entities
    45:### Guards
    53:### Types
    71:## Methods
    76:#### `PoolInterface`
    84:#### `PoolToken`
    92:## Contract
    94:### Capacity and FIFO
    123:### Cancellation
    136:### Release and cleanup
    152:### Destruction
    165:### Errors
    180:## Observing
    210:## Patterns
    212:### Validate public boundaries
    225:### Always release and explicitly tear down
    242:## Tests
    257:## See also
- Table headers in `guides/pool.md` (a header row is the row before a `| ---` row):
    34: | API          | Kind     | Summary                                                             |
    40: | API         | Kind  | Summary                                                                |
    47: | API            | Kind     | Summary                                                      |
    55: | API                | Kind      | Summary                                                          |
    78: | Method    | Returns                 | Behavior                                                                                  |
    88: | Method    | Returns | Behavior                                                                                                              |
    169: | Code        | Owner                                                                    |
    187: | Event     | Emission point                                                                                                                                                      |
- Rows of any `### Entities` table (the Kind cell):
    42:  `Pool`      | class
    43:  `PoolError` | class
- H1 blockquote (`guides/pool.md`):
    3: > A typed resource pool with optional bounded capacity, unique ownership, FIFO settlement,
    4: > validated reuse, caller-owned cancellation, explicit cleanup failures, and a stable
    5: > event-driven teardown barrier. It has no warm floor, eviction timer, acquire timeout, or
    6: > polling loop.
- Opening prose after the blockquote (first two lines):
    8: ## Surface
    10: `createPool` constructs the interface-oriented form; `Pool` exposes the same contract as a
- README (`README.md`) first lines:
    # @orkestrel/pool
    
    A typed **resource pool** with optional bounded capacity: idle reuse + FIFO
    waiting. `acquire` leases a resource — reusing a validated idle one, growing up
    to `max` when one is set, growing without bound when it is not, or parking on a
    FIFO waiter list until a `release` frees one — and the returned token's
    `release()` returns it for reuse (or hands it straight to the next waiter).
    The FIFO handoff is validated, so a resource that goes bad while leased is
    never handed to the next lessee, and a parked `acquire` given an `AbortSignal`
    rejects and de-queues itself when the signal fires — no leaked waiter. The
    pool is observable (a typed `emitter` surfaces `create` / `acquire` /
    `release` / `destroy`) and deliberately de-bloated — no warm-floor, no
- `## Patterns` fences, each with its nearest preceding heading:
    14: fence under "## Surface"
    101: fence under "### Capacity and FIFO"
    111: fence under "### Capacity and FIFO"
    197: fence under "## Observing"
    214: fence under "### Validate public boundaries"
    227: fence under "### Always release and explicitly tear down"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:38:export function createPool<T>(options: PoolOptions<T>): PoolInterface<T> {
    src/core/Pool.ts:28:export class Pool<T> implements PoolInterface<T> {
    src/core/errors.ts:18:export class PoolError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/validators.ts:2
    src/core/factories.ts:1
    src/core/Pool.ts:1
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    20:} from '@orkestrel/guide'
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
- `## Tests` paragraph naming checks: 242:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.10"` → `"version": "0.0.11"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-pool-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
