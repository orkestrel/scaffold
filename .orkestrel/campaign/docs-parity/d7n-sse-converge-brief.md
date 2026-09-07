# Brief — P.2 `d7n-sse-converge` (sse under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/sse` from the committed baseline `71ee295` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.7`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/sse.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/sse/guides/sse.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-sse-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/sse.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with `npm run docs -- --to source` and record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
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
```

## Facts for sse (taken 2026-09-07T14:59Z by facts.sh)

- Checkout `/home/user/fleet/sse`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `71ee295`, status: clean
- `package.json`: version `0.0.7`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    100:			const members = source.methods(group.interface).map((method) => method.name)
    108:					expect(findMissing(members, documented)).toEqual([])
    111:					expect(findMissing(documented, members)).toEqual([])
    117:							: findMissing(
    118:									source.methods(entity).map((method) => method.name),
    136:				findUnexampled(
    139:					source.examples().map((example) => example.name),
    144:		for (const group of guide.methods()) {
    155:							? source.examples(group.interface).map((example) => example.name)
    159:									.concat(source.examples(entity).map((example) => example.name))
    160:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    172:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks:  — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/sse.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/sse.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-sse-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
