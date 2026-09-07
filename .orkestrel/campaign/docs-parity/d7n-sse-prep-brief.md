# Brief — P.1 `d7n-sse-prep` (sse's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/sse` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `c298a4f`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

sse's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== sse 2026-09-07T14:51:47Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
76:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 840ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### sse (c298a4f, version 0.0.6, guide range ^0.0.17, head start 0.0.18)
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
   tests/setup.ts(5)
-- docs
   guides/sse.md interface SSEEvent: guide absent source "Represents one dispatched Server-Sent Event - the value a blank line flushes from an `SSEParserInterface`."
   guides/sse.md interface SSEParserInterface: guide absent source "Represents a stateful Server-Sent-Events (SSE) stream parser: feed it string chunks, get back the complete events dispatched so far. A trailing partial line / in-progress event is buffered until the rest arrives."
   guides/sse.md interface SSEParserOptions: guide absent source "Configures `import('./factories.js').createSSEParser` / the `import('./SSEParser.js').SSEParser` constructor."
   guides/sse.md type SSEErrorCode: guide absent source "Names the machine-readable codes carried by an `import('./errors.js').SSEError`."
   guides/sse.md const NUL: guide "The NUL byte (`U+0000`) — an `id:` field containing it is voided per spec and never surfaced." source "Names the null byte (`U+0000`). The SSE spec voids an `id:` field whose value contains it, so an `id` carrying a NUL is never surfaced. Spelled as a codepoint so the wire content is unambiguous in source."
   guides/sse.md const BOM: guide "The byte-order mark (`U+FEFF`) — stripped from the first non-empty chunk of a stream; ordinary content on later ones." source "Names the byte-order mark (`U+FEFF`), stripped from the first non-empty chunk of an SSE stream (a leading mark on later chunks is ordinary content). Spelled as a codepoint so the wire content is unambiguous in source."
   guides/sse.md class SSEError: guide "Carries an `SSEErrorCode` + optional `context`." source "Represents an error thrown by the SSE parser."
   guides/sse.md function isSSEError: guide "Narrow a caught value to an `SSEError`." source "Narrows an unknown caught value to an `SSEError`."
   guides/sse.md function createSSEParser: guide absent source "Creates a Server-Sent-Events (SSE) stream parser - a stateful handle that turns string chunks into the complete events dispatched so far."
   guides/sse.md class SSEParser: guide "The stateful SSE stream parser — implements `SSEParserInterface`, reassembles events across chunks." source "Represents a stateful Server-Sent-Events (SSE) stream parser - feed it string chunks, get back the complete events dispatched so far."
   guides/sse.md SSEParserInterface.parse: guide absent source "Appends `chunk`, then returns every event a blank line has DISPATCHED (its `data:` fields concatenated with `\\n`, plus the last `event:` / `id:` / `retry:`); an in-progress event and a trailing partial line are retained for the next call."
   guides/sse.md SSEParserInterface.flush: guide absent source "Treats any remaining buffered partial line as if it had been terminated, then dispatches the in-progress event if its data buffer is non-empty. A convenience beyond the WHATWG algorithm, which discards an unterminated final event at EOF - without calling `flush()`, that spec-faithful discard is this parser's default behavior."
   guides/sse.md SSEParserInterface.clear: guide absent source "Drops any buffered partial line, in-progress event, and persisted id/retry, leaving the parser ready for a fresh stream."
   guides/sse.md pitch: readme absent tagline "A stateful Server-Sent-Events (SSE) stream parser: feed it string chunks, get back the complete events dispatched so far. SSE is a UTF-8 text stream of events separated by a blank line; within an event each `field: value` line accumulates onto an in-progress event — multiple `data:` lines concatenate with `\\n`, `event:` / `id:` / `retry:` are last-wins — and a blank line DISPATCHES the accumulated event, but only when its data buffer is non-empty. A trailing partial line or in-progress event split across chunk boundaries is buffered until the rest arrives. The `id` / `retry` fields are also persisted as sticky connection state (WHATWG last-event-id semantics) — surfaced through the `id` / `retry` getters, dropped only by `clear()`. An optional `limit` bounds total buffered characters, throwing a typed `SSEError('OVERFLOW')` instead of growing unbounded; `flush()` forces out any trailing unterminated event at end-of-stream. A pure functional primitive — no Emitter, no server / HTTP / agent coupling; it never throws on malformed input, only `SSEError('OVERFLOW')` when a configured `limit` is exceeded. Source: `src/core`. Surfaced through the `@src/core` barrel."
   rows read: 1, disagreements found: 14
   exit 1
-- check
   tests/guides.test.ts(107,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(110,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(114,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(129,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(144,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 4 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  4 failed | 32 passed (36)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 5 | summary 5 | banned 0 | tests/setup.ts(5) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for sse (taken 2026-09-07T14:52Z by facts.sh)

- Checkout `/home/user/fleet/sse`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `c298a4f`, status: clean
- `package.json`: version `0.0.6`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 5 | summary 5 | banned 0 | tests/setup.ts(5) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec               | Source                    | Tests                                 |
    8:| ------- | ------------------ | ------------------------- | ------------------------------------- |
    9:| SSE     | [`sse.md`](sse.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide              |
    14:| ---------- | ------------------ |
    15:| `src/core` | [`sse.md`](sse.md) |
- Guide `guides/sse.md`: 173 lines. Headings:
    1:# SSE
    21:## Surface
    37:### Types
    52:### Constants
    66:### Errors
    86:### Factories
    101:### Entities
    107:## Methods
    114:#### `SSEParserInterface`
- Table headers in `guides/sse.md` (a header row is the row before a `| ---` row):
    39: | Type                 | Kind      | Shape                                                                                                                         |
    54: | API   | Kind  | Summary                                                                                                               |
    68: | API          | Kind     | Summary                                         |
    88: | API               | Kind     | Builds…                                                |
    103: | API         | Kind  | Summary                                                                                             |
    116: | Method  | Returns               | Behavior                                                                                                                                                                                                                                                 |
- Rows of any `### Entities` table (the Kind cell):
    105:  `SSEParser` | class
- H1 blockquote (`guides/sse.md`):
    3: > A stateful Server-Sent-Events (SSE) stream parser: feed it string chunks, get
    4: > back the complete events dispatched so far. SSE is a UTF-8 text stream of
    5: > events separated by a blank line; within an event each `field: value` line
    6: > accumulates onto an in-progress event — multiple `data:` lines concatenate
    7: > with `\n`, `event:` / `id:` / `retry:` are last-wins — and a blank line
    8: > DISPATCHES the accumulated event, but only when its data buffer is
    9: > non-empty. A trailing partial line or in-progress event split across chunk
    10: > boundaries is buffered until the rest arrives. The `id` / `retry` fields are
    11: > also persisted as sticky connection state (WHATWG last-event-id semantics) —
    12: > surfaced through the `id` / `retry` getters, dropped only by `clear()`. An
    13: > optional `limit` bounds total buffered characters, throwing a typed
    14: > `SSEError('OVERFLOW')` instead of growing unbounded; `flush()` forces out any
    15: > trailing unterminated event at end-of-stream. A pure functional primitive —
    16: > no Emitter, no server / HTTP / agent coupling; it never throws on malformed
    17: > input, only `SSEError('OVERFLOW')` when a configured `limit` is exceeded.
    18: > Source: [`src/core`](../src/core). Surfaced through the `@src/core`
    19: > barrel.
- Opening prose after the blockquote (first two lines):
    21: ## Surface
    23: Create a parser and feed it chunks as they arrive; each `parse(chunk)`
- README (`README.md`) first lines:
    # @orkestrel/sse
    
    A typed Server-Sent Events parser — incremental, spec-compliant parsing of
    event-stream chunks into typed events with `data`, `event`, `id`, and `retry`
    fields. Feed it string chunks as they arrive; a blank line dispatches the
    accumulated event, and a partial line or in-progress event split across
    chunk boundaries is buffered until the rest arrives. The `id` / `retry`
    fields also persist as sticky connection state — surfaced through the `id` /
    `retry` getters for reconnection — and an optional `limit` bounds total
    buffered characters. A pure functional primitive — no Emitter, no events, no
    server / HTTP / agent coupling; it never throws on malformed input, only a
    typed `SSEError('OVERFLOW')` when a configured `limit` is exceeded. Part of
- `## Patterns` fences, each with its nearest preceding heading:
    27: fence under "## Surface"
    46: fence under "### Types"
    59: fence under "### Constants"
    73: fence under "### Errors"
    92: fence under "### Factories"
    122: fence under "#### `SSEParserInterface`"
    137: fence under "#### `SSEParserInterface`"
    149: fence under "#### `SSEParserInterface`"
    164: fence under "#### `SSEParserInterface`"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:40:export function createSSEParser(options?: SSEParserOptions): SSEParserInterface {
    src/core/SSEParser.ts:64:export class SSEParser implements SSEParserInterface {
    src/core/errors.ts:36:export class SSEError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/factories.ts:1
    src/core/SSEParser.ts:1
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    21:} from '@orkestrel/guide'
    45:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    54:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    99:		for (const group of guide.methods()) {
    100:			const members = source.methods(group.interface)
    107:					expect(findMissing(members, group.methods)).toEqual([])
    110:					expect(findMissing(group.methods, members)).toEqual([])
    114:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    129:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    132:		for (const group of guide.methods()) {
    142:							? source.examples(group.interface)
    143:							: source.examples(group.interface).concat(source.examples(entity))
    144:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    156:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks:  — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.6"` → `"version": "0.0.7"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-sse-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
