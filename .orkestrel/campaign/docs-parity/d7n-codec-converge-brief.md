# Brief — P.2 `d7n-codec-converge` (codec under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/codec` from the committed baseline `583338c` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.3`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/codec.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/codec/guides/codec.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-codec-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.
- **codec's README** duplicates the guide's Surface tables (`README.md:9-23` and `:28-41`, which the gate never reads); a copy drifts the moment a cell is rewritten, so the README keeps its blockquote and onboarding and replaces each copied table with one sentence linking the guide's section (`[Codings](guides/codec.md#codings)` and its siblings), the shape scaffold's own README took in D5.
- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/codec.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with `npm run docs -- --to source` and record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/codec.md function encodeBase64: guide absent source "Encodes a byte sequence as standard padded Base64."
guides/codec.md function decodeBase64: guide absent source "Decodes canonical standard Base64 text into its bytes."
guides/codec.md function isBase64: guide absent source "Checks whether a value is canonical standard Base64 text."
guides/codec.md function encodeBase64URL: guide absent source "Encodes a byte sequence as unpadded base64url."
guides/codec.md function decodeBase64URL: guide absent source "Decodes canonical base64url text into its bytes."
guides/codec.md function isBase64URL: guide absent source "Checks whether a value is canonical base64url text."
guides/codec.md function encodeHex: guide absent source "Encodes a byte sequence as lowercase hex."
guides/codec.md function decodeHex: guide absent source "Decodes canonical lowercase hex text into its bytes."
guides/codec.md function isHex: guide absent source "Checks whether a value is canonical lowercase hex text."
guides/codec.md function measureBase64: guide absent source "Measures the byte length canonical standard Base64 text decodes to."
guides/codec.md function measureBase64URL: guide absent source "Measures the byte length canonical base64url text decodes to."
guides/codec.md function measureHex: guide absent source "Measures the byte length canonical lowercase hex text decodes to."
guides/codec.md function measureUTF8: guide absent source "Measures the UTF-8 byte length text encodes to."
guides/codec.md function encodeUTF8: guide absent source "Encodes text as UTF-8 bytes."
guides/codec.md function decodeUTF8: guide absent source "Decodes UTF-8 bytes into their text."
guides/codec.md function isUTF8: guide absent source "Checks whether a value is bytes that decode as strict UTF-8."
guides/codec.md function encodeLatin1: guide absent source "Encodes text as ISO/IEC 8859-1 bytes."
guides/codec.md function decodeLatin1: guide absent source "Decodes ISO/IEC 8859-1 bytes into their text."
guides/codec.md function isLatin1: guide absent source "Checks whether a value is text ISO/IEC 8859-1 can encode."
guides/codec.md function encodeWindows1252: guide absent source "Encodes text as Windows-1252 bytes."
guides/codec.md function decodeWindows1252: guide absent source "Decodes Windows-1252 bytes into their text."
guides/codec.md function isWindows1252: guide absent source "Checks whether a value is bytes that decode as Windows-1252."
guides/codec.md function encodeUTF16LE: guide absent source "Encodes text as little-endian UTF-16 bytes."
guides/codec.md function decodeUTF16LE: guide absent source "Decodes little-endian UTF-16 bytes into their text."
guides/codec.md function isUTF16LE: guide absent source "Checks whether a value is bytes that decode as UTF-16LE."
rows read: 1, disagreements found: 25
exit 1
```

## Facts for codec (taken 2026-09-07T15:02Z by facts.sh)

- Checkout `/home/user/fleet/codec`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `583338c`, status: clean
- `package.json`: version `0.0.3`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: no
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 26 | summary 26 | banned 0 | tests/setup.ts(26) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                   | Source                    | Tests                                 |
    8:| ------- | ---------------------- | ------------------------- | ------------------------------------- |
    9:| Codec   | [`codec.md`](codec.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                  |
    14:| ---------- | ---------------------- |
    15:| `src/core` | [`codec.md`](codec.md) |
- Guide `guides/codec.md`: 492 lines. Headings:
    1:# Codec
    18:## The families
    57:## Surface
    59:### Codings
    78:### Measures
    100:### Charsets
    124:## The laws
    176:### The charset doors
    202:### The BOM stance
    211:### Where this package parts from WHATWG
    228:## Membership
    263:## Declared non-goals
    272:## Patterns
    274:### Encode and decode a byte sequence
    285:### Reach the url face
    297:### Meet the canonical refusals
    312:### Ask a value whether a decoder would take it
    324:### Drive both laws
    341:### Read the hex face
    355:### Encode and decode through a charset
    392:### Measure without producing the bytes
    413:## Tests
    485:## See also
- Table headers in `guides/codec.md` (a header row is the row before a `| ---` row):
    66: | Name              | Kind     | Signature                                                | Behavior                                                                                                                                                              |
    93: | Name               | Kind     | Signature                               | Behavior                                                                                                                                                        |
    109: | Name                | Kind     | Signature                                                | Behavior                                                                                                                                                                               |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/codec.md`):
    3: > The fleet's byte-to-text codings, as sound `encode` / `decode` / guard triples over `string` and
    4: > `Uint8Array` — RFC 4648 Base64, base64url, and hex, beside the UTF-8, ISO-8859-1, Windows-1252,
    5: > and UTF-16LE charsets — and a `measure*` that answers a coding's byte-side size question without
    6: > producing those bytes. Zero runtime dependencies, no error type, no options, no class. Source:
    7: > [`src/core`](../src/core). Published through `@orkestrel/codec`.
- Opening prose after the blockquote (first two lines):
    9: A coding is a spec-named, stateless mapping with one canonical spelling per input, written as an
    10: `encode*` that produces only the canonical form, a `decode*` that accepts exactly that form and
- README (`README.md`) first lines:
    # Codec
    
    > The fleet's byte-to-text codings, as sound `encode` / `decode` / guard triples over `string` and
    > `Uint8Array` — RFC 4648 Base64, base64url, and hex, beside the UTF-8, ISO-8859-1, Windows-1252,
    > and UTF-16LE charsets — and a `measure*` that answers a coding's byte-side size question without
    > producing those bytes. Zero runtime dependencies, no error type, no options, no class. Source:
    > [`src/core`](src/core). Published through `@orkestrel/codec`.
    
    | Name               | Kind     | Signature                                                | Behavior                                                                                                                                                              |
    | ------------------ | -------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `encodeBase64`     | function | `(bytes: Uint8Array) => string`                          | `bytes` spelled in the RFC 4648 §4 alphabet (`+`, `/`) with `=` padding — the canonical form, and the only form `decodeBase64` accepts. Total: encoding cannot fail.  |
    | `decodeBase64`     | function | `(text: string) => Uint8Array<ArrayBuffer> \| undefined` | Exactly what `encodeBase64` writes, read back. Every other text — wrong alphabet, whitespace, wrong padding, a non-zero unused trailing bit — is `undefined`.         |
- `## Patterns` fences, each with its nearest preceding heading:
    276: fence under "### Encode and decode a byte sequence"
    287: fence under "### Reach the url face"
    299: fence under "### Meet the canonical refusals"
    314: fence under "### Ask a value whether a decoder would take it"
    326: fence under "### Drive both laws"
    343: fence under "### Read the hex face"
    357: fence under "### Encode and decode through a charset"
    394: fence under "### Measure without producing the bytes"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/validators.ts:7
    src/core/helpers.ts:18
- Drop-in sites (`tests/guides.test.ts`):
    23:} from '@orkestrel/guide'
    75:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    81:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    143:		for (const group of guide.methods()) {
    144:			const members = source.methods(group.interface).map((method) => method.name)
    152:					expect(findMissing(members, documented)).toEqual([])
    155:					expect(findMissing(documented, members)).toEqual([])
    161:							: findMissing(
    162:									source.methods(entity).map((method) => method.name),
    181:				findUnexampled(
    184:					source.examples().map((example) => example.name),
    213:						...findMissing(
- `## Tests` paragraph naming checks: 413:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/codec.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/codec.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-codec-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
