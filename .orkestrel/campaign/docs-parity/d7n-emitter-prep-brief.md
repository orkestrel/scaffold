# Brief — P.1 `d7n-emitter-prep` (emitter's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/emitter` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `e9f41d9`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

emitter's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== emitter 2026-09-07T15:03:15Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
77:		"@orkestrel/guide": "^0.0.17",
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
### emitter (e9f41d9, version 0.0.9, guide range ^0.0.17, head start 0.0.18)
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
   src/core/Emitter.ts(2)
-- docs
   guides/emitter.md function createEmitter: guide "Create an `EmitterInterface<TMap>`, optionally with initial `on` hooks." source "Creates a typed event emitter — the foundational observable primitive."
   guides/emitter.md function extractKeys: guide "Extract an object's own enumerable keys, typed as its key union." source "Extracts the own enumerable keys of a mapped object, typed as its key union."
   guides/emitter.md class Emitter: guide "The typed synchronous emitter; entities own one as `#emitter`." source "Implements a typed synchronous event emitter — the foundational observable primitive of the codebase. Stateful entities OWN one as a `#emitter` field and expose it through `readonly emitter`; they never inherit from it."
   guides/emitter.md type EventMap: guide absent source "Maps each event name to the argument tuple its listeners receive."
   guides/emitter.md type EmitterHandler: guide absent source "Represents a listener for one event's argument tuple."
   guides/emitter.md type EmitterErrorHandler: guide absent source "Represents the emitter's OWN listener-error handler — invoked when a listener throws during `emit`, with the caught error and the (stringified) event name."
   guides/emitter.md type EmitterHooks: guide absent source "Declares the initial event listeners for an emitter — the reserved `on` option: a partial map of event name to its handler, wired at construction."
   guides/emitter.md interface EmitterOptions: guide absent source "Configures `createEmitter` and the `Emitter` constructor."
   guides/emitter.md interface EmitterInterface: guide absent source "Represents a typed synchronous event emitter — the foundational observable primitive. Entities OWN one as `#emitter` and expose `readonly emitter`; they never inherit from it."
   guides/emitter.md EmitterInterface.on: guide absent source "Registers a listener for an event. Does nothing after `destroy()`."
   guides/emitter.md EmitterInterface.once: guide absent source "Registers a listener that removes itself after its first call. Does nothing after `destroy()`."
   guides/emitter.md EmitterInterface.off: guide absent source "Removes a listener registered for an event, including one registered through `once`."
   guides/emitter.md EmitterInterface.emit: guide absent source "Invokes an event's listeners synchronously, in registration order. Does nothing after `destroy()`."
   guides/emitter.md EmitterInterface.count: guide absent source "Returns the live listener count."
   guides/emitter.md EmitterInterface.clear: guide absent source "Drops registered listeners, leaving the emitter usable and `destroyed` unchanged."
   guides/emitter.md EmitterInterface.destroy: guide absent source "Tears down the emitter: drops every listener and sets `destroyed` to `true`. Idempotent."
   guides/emitter.md pitch: readme absent tagline "The foundational observable primitive: a typed, synchronous event emitter. Every stateful entity in the codebase — a queue, a database table, an agent — that has lifecycle transitions or observable operations owns one `Emitter<TMap>` as a `#emitter` field and exposes it through a `readonly emitter` property; consumers subscribe through `entity.emitter.on(...)`. Composition, never inheritance: an entity threads its event map and an optional error handler into the emitter and otherwise forgets it exists. It is deliberately small. There is no scheduler — `emit` fires listeners in the current tick, in registration order. There is no listener cap, no `max`-listeners warning, and no `console` output. `on` returns `void`, not an `Unsubscribe`. What it does carry is the one invariant a fan-out primitive can't omit: a throwing listener is isolated so it can never take down its siblings or the emit loop. Source: `src/core`. Surfaced through the `@src/core` barrel."
   rows read: 1, disagreements found: 17
   exit 1
-- check
   tests/guides.test.ts(103,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(106,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(110,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(125,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(140,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  5 failed | 15 passed (20)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 41ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(1) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(1) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 2 | summary 0 | banned 2 | src/core/Emitter.ts(2) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+55,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "README.md"
+91,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/emitter.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for emitter (taken 2026-09-07T15:03Z by facts.sh)

- Checkout `/home/user/fleet/emitter`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `e9f41d9`, status: clean
- `package.json`: version `0.0.9`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 2 | summary 0 | banned 2 | src/core/Emitter.ts(2) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                       | Source                    | Tests                                 |
    8:| ------- | -------------------------- | ------------------------- | ------------------------------------- |
    9:| Emitter | [`emitter.md`](emitter.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                      |
    14:| ---------- | -------------------------- |
    15:| `src/core` | [`emitter.md`](emitter.md) |
- Guide `guides/emitter.md`: 218 lines. Headings:
    1:# Emitter
    7:## Surface
    36:### Factories
    42:### Helpers
    48:### Entities
    54:### Types
    67:## Methods
    71:#### `EmitterInterface`
    85:## Contract
    99:## Patterns
    101:### Standalone emitter
    118:### Own an emitter
    174:### Manage listeners
    200:### Practices
    208:## Tests
    215:## See also
- Table headers in `guides/emitter.md` (a header row is the row before a `| ---` row):
    38: | API             | Kind     | Summary                                                                 |
    44: | API           | Kind     | Summary                                                          |
    50: | API       | Kind  | Summary                                                        |
    56: | Type                  | Kind      | Shape                                                                                                       |
    75: | Method    | Returns  | Behavior                                                                                                      |
- Rows of any `### Entities` table (the Kind cell):
    52:  `Emitter` | class
- H1 blockquote (`guides/emitter.md`):
    3: > The foundational observable primitive: a typed, **synchronous** event emitter. Every stateful entity in the codebase — a queue, a database table, an agent — that has lifecycle transitions or observable operations **owns** one `Emitter<TMap>` as a `#emitter` field and exposes it through a `readonly emitter` property; consumers subscribe through `entity.emitter.on(...)`. Composition, never inheritance: an entity threads its event map and an optional error handler into the emitter and otherwise forgets it exists.
    4: >
    5: > It is deliberately small. There is no scheduler — `emit` fires listeners in the current tick, in registration order. There is no listener cap, no `max`-listeners warning, and no `console` output. `on` returns `void`, not an `Unsubscribe`. What it _does_ carry is the one invariant a fan-out primitive can't omit: a throwing listener is isolated so it can never take down its siblings or the emit loop. Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    7: ## Surface
    9: Create a standalone emitter, subscribe, and fire events synchronously:
- README (`README.md`) first lines:
    # @orkestrel/emitter
    
    A typed, **synchronous** event emitter — the foundational observable
    primitive that stateful entities (a queue, a database table, an agent) own to
    expose their lifecycle transitions and observable operations. Deliberately
    small: no scheduler (listeners fire in the current tick, in registration
    order), no listener cap, no `console` output. What it does carry is the one
    invariant a fan-out primitive can't omit — a throwing listener is isolated so
    it can never take down its siblings or the emit loop; the throw routes to an
    optional `error` handler instead of being rethrown. Part of the `@orkestrel`
    line.
    
- `## Patterns` fences, each with its nearest preceding heading:
    11: fence under "## Surface"
    103: fence under "### Standalone emitter"
    122: fence under "### Own an emitter"
    178: fence under "### Manage listeners"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:29:export function createEmitter<TMap extends EventMap>(
    src/core/Emitter.ts:49:export class Emitter<TMap extends EventMap> implements EmitterInterface<TMap> {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/factories.ts:1
    src/core/helpers.ts:1
    src/core/Emitter.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    3:// `EXAMPLE_LANGUAGE`, `MODULES`, `INTERNAL`, and `ROOT_FILES` constants are this
    20:} from '@orkestrel/guide'
    44:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    50:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    95:		for (const group of guide.methods()) {
    96:			const members = source.methods(group.interface)
    103:					expect(findMissing(members, group.methods)).toEqual([])
    106:					expect(findMissing(group.methods, members)).toEqual([])
    110:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    125:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    128:		for (const group of guide.methods()) {
    138:							? source.examples(group.interface)
    139:							: source.examples(group.interface).concat(source.examples(entity))
    140:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    152:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 208:## Tests — 0 lines naming a check or a code

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

`/home/user/scaffold/tmp/units/d7n-emitter-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
