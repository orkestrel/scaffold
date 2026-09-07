# Brief — P.1 `d7n-ndjson-prep` (ndjson's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/ndjson` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `6b93105`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

ndjson's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== ndjson 2026-09-07T15:13:43Z tarball sha256 85031b9260758fe3
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
### ndjson (6b93105, version 0.0.9, guide range ^0.0.17, head start 0.0.18)
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
   tests/setup.ts(4)
   tests/src/core/NDJSONParser.test.ts(1)
-- docs
   guides/ndjson.md interface NDJSONParserInterface: guide absent source "Represents a stateful NDJSON (newline-delimited JSON) stream parser: feed it string chunks, get back the complete records decoded so far. A trailing partial line is buffered until the rest arrives."
   guides/ndjson.md function createNDJSONParser: guide absent source "Creates an NDJSON (newline-delimited JSON) stream parser - a stateful handle that turns string chunks into the complete records decoded so far."
   guides/ndjson.md class NDJSONParser: guide "The stateful NDJSON stream parser — implements `NDJSONParserInterface`, reassembles records split across chunks." source "Decodes an NDJSON (newline-delimited JSON) stream statefully — feed the handle string chunks, get back the complete records decoded so far."
   guides/ndjson.md NDJSONParserInterface.parse: guide absent source "Appends `chunk`, then returns every COMPLETE `\\n`-terminated line parsed to a record (malformed / non-record lines are skipped); a trailing partial line is retained for the next call."
   guides/ndjson.md NDJSONParserInterface.clear: guide absent source "Drops any buffered partial line, leaving the handle ready for a fresh stream."
   guides/ndjson.md pitch: readme absent tagline "A stateful newline-delimited-JSON (NDJSON) stream parser: feed it string chunks, get back the complete records parsed so far. `parse(chunk)` appends `chunk` to an internal buffer and splits it on `\\n` — every line before the last is `\\n`-terminated, hence complete, and is parsed to a record; the final segment is the trailing partial line and is held back for the next call, so a line split across chunk boundaries is reassembled the moment its closing `\\n` arrives. Each trimmed line is filtered: a blank / whitespace-only line (including one whose only content was a CRLF's trailing `\\r`) is skipped, malformed JSON is silently skipped (never thrown), and a non-record value (an array, a primitive, `null`) is dropped — only plain records come back. A never-terminated line is never emitted, even when the buffered text already happens to be valid JSON. `clear()` drops the buffered partial line so a handle can be reused for a fresh stream. A self-contained primitive — no Emitter, no server / HTTP / agent coupling; `parse` never throws on malformed, blank, or non-record input. Pair it with a streaming `TextDecoder` when reading a byte stream: the decoder handles partial characters, the parser handles partial lines. A line that is never terminated by a newline stays in the buffer until its newline arrives — the parser has no size limit, so a caller fronting an untrusted or unbounded upstream must enforce its own byte cap before feeding chunks in. Source: `src/core`. Surfaced through the `@src/core` barrel."
   rows read: 1, disagreements found: 6
   exit 1
-- check
   tests/guides.test.ts(104,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(107,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(111,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(126,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(141,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 4 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  4 failed | 24 passed (28)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 5 | summary 4 | banned 1 | tests/setup.ts(4) tests/src/core/NDJSONParser.test.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for ndjson (taken 2026-09-07T15:14Z by facts.sh)

- Checkout `/home/user/fleet/ndjson`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `6b93105`, status: clean
- `package.json`: version `0.0.9`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 5 | summary 4 | banned 1 | tests/setup.ts(4) tests/src/core/NDJSONParser.test.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                     | Source                    | Tests                                 |
    8:| ------- | ------------------------ | ------------------------- | ------------------------------------- |
    9:| NDJSON  | [`ndjson.md`](ndjson.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                    |
    14:| ---------- | ------------------------ |
    15:| `src/core` | [`ndjson.md`](ndjson.md) |
- Guide `guides/ndjson.md`: 95 lines. Headings:
    1:# NDJSON
    27:## Surface
    42:### Types
    56:### Factories
    69:### Entities
    75:## Methods
    80:#### `NDJSONParserInterface`
- Table headers in `guides/ndjson.md` (a header row is the row before a `| ---` row):
    44: | Type                    | Kind      | Shape                                                                                                         |
    58: | API                  | Kind     | Builds…                                                      |
    71: | API            | Kind  | Summary                                                                                                          |
    82: | Method  | Returns                              | Behavior                                                                                                                                                                                                                                                          |
- Rows of any `### Entities` table (the Kind cell):
    73:  `NDJSONParser` | class
- H1 blockquote (`guides/ndjson.md`):
    3: > A stateful newline-delimited-JSON (NDJSON) stream parser: feed it string
    4: > chunks, get back the complete records parsed so far. `parse(chunk)` appends
    5: > `chunk` to an internal buffer and splits it on `\n` — every line _before_
    6: > the last is `\n`-terminated, hence complete, and is parsed to a record;
    7: > the final segment is the trailing partial line and is held back for the
    8: > next call, so a line split across chunk boundaries is reassembled the
    9: > moment its closing `\n` arrives. Each trimmed line is filtered: a blank /
    10: > whitespace-only line (including one whose only content was a CRLF's
    11: > trailing `\r`) is skipped, malformed JSON is silently skipped (never
    12: > thrown), and a non-record value (an array, a primitive, `null`) is
    13: > dropped — only plain records come back. A never-terminated line is never
    14: > emitted, even when the buffered text already happens to be valid JSON.
    15: > `clear()` drops the buffered partial line so a handle can be reused for a
    16: > fresh stream. A self-contained primitive — no Emitter, no server / HTTP /
    17: > agent coupling; `parse` never throws on malformed, blank, or non-record
    18: > input. Pair it with a streaming `TextDecoder` when reading a byte stream:
    19: > the decoder handles partial characters, the parser handles partial lines.
    20: > A line that is never terminated by a newline stays in the buffer until its
    21: > newline arrives — the parser has no size limit, so a caller fronting an
    22: > untrusted or unbounded upstream must enforce its own byte cap before
    23: > feeding chunks in.
    24: > Source: [`src/core`](../src/core). Surfaced through the `@src/core`
    25: > barrel.
- Opening prose after the blockquote (first two lines):
    27: ## Surface
    29: Create a parser and feed it chunks as they arrive; each `parse(chunk)`
- README (`README.md`) first lines:
    # @orkestrel/ndjson
    
    A minimal streaming NDJSON (newline-delimited JSON) parser — feed it string
    chunks as they arrive; each complete `\n`-terminated line is decoded to a
    record, and a partial line split across a chunk boundary is buffered until
    the rest arrives. `parse` never throws on malformed or blank input: a
    malformed line and a blank line are silently skipped, and a well-formed but
    non-object JSON value (a string, number, array, `null`) is dropped, so
    `parse()` only ever returns plain records. `clear()` drops any buffered
    partial line so the same parser instance can be reused for a fresh stream.
    
    ## Install
- `## Patterns` fences, each with its nearest preceding heading:
    33: fence under "## Surface"
    48: fence under "### Types"
    62: fence under "### Factories"
    87: fence under "#### `NDJSONParserInterface`"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/NDJSONParser.ts:28:export class NDJSONParser implements NDJSONParserInterface {
    src/core/factories.ts:20:export function createNDJSONParser(): NDJSONParserInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/NDJSONParser.ts:1
    src/core/factories.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    22:} from '@orkestrel/guide'
    45:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    51:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    96:		for (const group of guide.methods()) {
    97:			const members = source.methods(group.interface)
    104:					expect(findMissing(members, group.methods)).toEqual([])
    107:					expect(findMissing(group.methods, members)).toEqual([])
    111:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    126:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    129:		for (const group of guide.methods()) {
    139:							? source.examples(group.interface)
    140:							: source.examples(group.interface).concat(source.examples(entity))
    141:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    153:					expect(findMissing(names, surface)).toEqual([])
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
4. **The bump.** `package.json` `"version": "0.0.9"` → `"version": "0.0.10"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-ndjson-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
