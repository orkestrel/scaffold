# Brief — P.2 `d7n-ndjson-converge` (ndjson under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/ndjson` from the committed baseline `8d03eaa` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.10`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/ndjson.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/ndjson/guides/ndjson.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-ndjson-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/ndjson.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with `npm run docs -- --to source` and record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/ndjson.md interface NDJSONParserInterface: guide absent source "Represents a stateful NDJSON (newline-delimited JSON) stream parser: feed it string chunks, get back the complete records decoded so far. A trailing partial line is buffered until the rest arrives."
guides/ndjson.md function createNDJSONParser: guide absent source "Creates an NDJSON (newline-delimited JSON) stream parser - a stateful handle that turns string chunks into the complete records decoded so far."
guides/ndjson.md class NDJSONParser: guide "The stateful NDJSON stream parser — implements `NDJSONParserInterface`, reassembles records split across chunks." source "Decodes an NDJSON (newline-delimited JSON) stream statefully — feed the handle string chunks, get back the complete records decoded so far."
guides/ndjson.md NDJSONParserInterface.parse: guide absent source "Appends `chunk`, then returns every COMPLETE `\\n`-terminated line parsed to a record (malformed / non-record lines are skipped); a trailing partial line is retained for the next call."
guides/ndjson.md NDJSONParserInterface.clear: guide absent source "Drops any buffered partial line, leaving the handle ready for a fresh stream."
guides/ndjson.md pitch: readme absent tagline "A stateful newline-delimited-JSON (NDJSON) stream parser: feed it string chunks, get back the complete records parsed so far. `parse(chunk)` appends `chunk` to an internal buffer and splits it on `\\n` — every line before the last is `\\n`-terminated, hence complete, and is parsed to a record; the final segment is the trailing partial line and is held back for the next call, so a line split across chunk boundaries is reassembled the moment its closing `\\n` arrives. Each trimmed line is filtered: a blank / whitespace-only line (including one whose only content was a CRLF's trailing `\\r`) is skipped, malformed JSON is silently skipped (never thrown), and a non-record value (an array, a primitive, `null`) is dropped — only plain records come back. A never-terminated line is never emitted, even when the buffered text already happens to be valid JSON. `clear()` drops the buffered partial line so a handle can be reused for a fresh stream. A self-contained primitive — no Emitter, no server / HTTP / agent coupling; `parse` never throws on malformed, blank, or non-record input. Pair it with a streaming `TextDecoder` when reading a byte stream: the decoder handles partial characters, the parser handles partial lines. A line that is never terminated by a newline stays in the buffer until its newline arrives — the parser has no size limit, so a caller fronting an untrusted or unbounded upstream must enforce its own byte cap before feeding chunks in. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 6
exit 1
```

## Facts for ndjson (taken 2026-09-07T15:27Z by facts.sh)

- Checkout `/home/user/fleet/ndjson`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `8d03eaa`, status: clean
- `package.json`: version `0.0.10`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    97:			const members = source.methods(group.interface).map((method) => method.name)
    105:					expect(findMissing(members, documented)).toEqual([])
    108:					expect(findMissing(documented, members)).toEqual([])
    114:							: findMissing(
    115:									source.methods(entity).map((method) => method.name),
    133:				findUnexampled(
    136:					source.examples().map((example) => example.name),
    141:		for (const group of guide.methods()) {
    152:							? source.examples(group.interface).map((example) => example.name)
    155:									.concat(source.examples(entity))
    157:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    169:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks:  — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/ndjson.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/ndjson.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-ndjson-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
