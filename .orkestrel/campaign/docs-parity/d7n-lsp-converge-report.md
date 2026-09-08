# Report — `d7n-lsp-converge`

Wall clock: 2026-09-07T21:41:14Z (first command, the checkout's baseline reading) to
2026-09-07T21:50:16Z (last `git status --short`).

Touched files, one line each:

- `/home/user/fleet/lsp/guides/lsp.md` — `Summary` headers, the `Shape` column and its convention
  sentences under new `### Stdio transport`, `### Client`, `### Framing, timing, and errors`,
  `### JSON-RPC and initialization`, `### Documents and diagnostics`, `### Guards`, and
  `### Constants` headings; the noun-phrase tagline with the displaced sentences below it; the
  `### Create a client and inspect a document` heading over the titled fence; a new `## Tests`
  section; every `Summary` cell written from its doc block.
- `/home/user/fleet/lsp/README.md` — the guide's blockquote under the H1 with the same line breaks,
  and an onboarding paragraph that restates none of the tagline's clauses.
- `/home/user/fleet/lsp/src/core/types.ts` — description paragraphs for the three
  `LSPTransportInterface` members, and the `LSPOpenOptions` description.
- `/home/user/fleet/lsp/src/core/constants.ts` — each code constant's literal named in its
  description.
- `/home/user/fleet/lsp/src/core/helpers.ts` — `waitForDeadline`'s description and the remark it
  would have repeated.
- `/home/user/fleet/lsp/src/core/factories.ts` — `createLSPClient`'s `@example` titled, then
  extended by `--to source`.
- `/home/user/fleet/lsp/tests/guides.test.ts` — the pilot's canonical drop-in text plus the three
  gate cases.

Diffstat:

```text
 README.md             |  21 ++--
 guides/lsp.md         | 303 +++++++++++++++++++++++++++++---------------------
 src/core/constants.ts |  20 ++--
 src/core/factories.ts |  19 +++-
 src/core/helpers.ts   |   7 +-
 src/core/types.ts     |  24 +++-
 tests/guides.test.ts  | 154 ++++++++++++++++++-------
 7 files changed, 354 insertions(+), 194 deletions(-)
```

## Criterion 1 — red-first, on the unconverged tree

`npm run test:guides` after the gate cases landed and before any convergence:
`Test Files 1 failed (1)` / `Tests 3 failed | 27 passed (30)`.

Failing case names and their first lines, verbatim:

- `pairs at least one example title across the guide and the source`

  ```text
  AssertionError: expected [ Array(1) ] to deeply equal []
  +   "guides/lsp.md pairs: guide [\"Client lifecycle\",\"Transport seam\",\"Stdio client transport\",\"Framing state\",\"Framing state\",\"Validation\",\"Validation\",\"Validation\"] source []",
  ```

- `opens the README with the guide tagline`

  ```text
  AssertionError: expected undefined not to be undefined
  ```

- `Package > keeps every compared summary and example equal to its source`

  ```text
  AssertionError: expected [ …(107) ] to deeply equal []
  ```

  My reading of that run's output was tail-truncated at the collected list's head, so the head was
  re-derived from the committed baseline read-only after convergence
  (`tmp/d7n-lsp-converge/redfirst.mjs`, which builds the same `findDrift` list from `git show
  HEAD:` objects). It reports `collected: 107`, matching the assertion's `…(107)`, and opens:

  ```text
  guides/lsp.md class StdioClientTransport: guide absent source "Streams Language Server Protocol bytes between a client and a child process over stdio."
  guides/lsp.md function createStdioClientTransport: guide absent source "Creates a byte transport over a Language Server Protocol child process."
  guides/lsp.md interface StdioClientTransportInterface: guide absent source "Defines the stdio transport's own surface beyond the byte transport it carries."
  guides/lsp.md interface StdioClientTransportOptions: guide absent source "Configures a Language Server Protocol child process reached over its standard streams."
  ```

No lint control was planted; the Orchestrator takes that reading after this unit exits. No plant of
any kind was made, so nothing needed reversing.

## Criterion 2 — headers and class rows

`tmp/d7n-lsp-converge/columns.mjs` renamed each table's final compared header and inserted the
`Shape` column, splitting on a pipe not preceded by a backslash: `rows rewritten: 100, unmapped
non-class rows: 0`. Both `## Methods` tables took `Summary` beside `Method` and `Signature`; the
seven `## Surface` tables took `Summary` beside `Export`, `Kind`, and `Shape`. No first-column
header text moved (Ruling 10).

`### Classes`: nothing to do. The guide carries no `### Entities` table and documents no class under
its own H3 — `StdioClientTransport`, `LSPClient`, and `LSPError` each already carry a Surface row —
so Ruling 5's trigger does not fire here.

Baseline comparison after the hand rebuild, and again after `--to guide` and the scoped format
(`tmp/d7n-lsp-converge/cells.mjs` against `git show HEAD:guides/lsp.md`), both runs identical:

```text
rows compared: 107, non-Summary cells compared: 214, mismatched: 0, missing after: 0, Shape cells filled: 87
```

## Criterion 3 — the blocks rewritten by hand, then `--to guide`

Blocks rewritten before propagation, each because the guide cell carried what the description
lacked or because the block carried no description at all:

- `LSPTransportInterface.start`, `.send`, `.close` (`src/core/types.ts`) — the members carried no
  doc block, which the seed reported as `guide absent source absent`. Each gained the guide cell's
  own sentence as its description, with `@param`, `@returns`, and a `@remarks` carrying the
  obligations the interface's own remarks state.
- `LSPOpenOptions` — `Configures a document inspection.` became `Configures a document inspection
  with the signal that bounds its diagnostics wait.`, keeping the guide cell's fact.
- `waitForDeadline` — `Waits for a deadline to elapse.` became `Waits for a deadline to elapse
  without holding the host event loop open.`, and the `@remarks` sentence the description now
  repeated was pruned to `The deadline is armed with \`AbortSignal.timeout\`.` (Ruling 7).
- `LSP_TIMEOUT`, `JSONRPC_PARSE_ERROR`, `JSONRPC_INVALID_REQUEST`, `JSONRPC_METHOD_NOT_FOUND`,
  `JSONRPC_INVALID_PARAMS`, `JSONRPC_INTERNAL_ERROR`, `LSP_REQUEST_CANCELLED`,
  `LSP_CONTENT_MODIFIED`, `LSP_SERVER_CANCELLED`, `LSP_REQUEST_FAILED` — each description now names
  its literal (Ruling 18), so the `Shape` cell can hold the declared type alone. `LSP_CONTENT_LIMIT`
  and `LSP_HEADER_LIMIT` already named theirs as `64 MiB` and `64 KiB`.

Rows whose literal stayed in `Shape` rather than moving into a description, all under Ruling 21's
"the type the constant is declared or widened to": `LSP_METHODS`
(`Readonly<Record<string, string>>`), `LSP_ENCODINGS` (`readonly string[]`), `LSP_ERROR_CODES`
(`readonly LSPErrorCode[]`), `LSP_DIAGNOSTIC_SEVERITIES` (`readonly LSPDiagnosticSeverity[]`),
`LSP_DIAGNOSTIC_TAGS` (`readonly LSPDiagnosticTag[]`), `LSP_SYNC_KINDS`
(`readonly LSPTextDocumentSyncKind[]`), `LSP_CAPABILITIES` (`LSPClientCapabilities`), and every
numeric code constant (`number`). Each of those names a population or an advertisement rather than a
single literal a reader needs, so no description gained a value list.

Facts a cell carried that no compared block can hold, landed in the `Shape` column rather than in
prose beside the table (Ruling 15, and Ruling 7's readonly-data-member clause):
`StdioClientTransportInterface`'s `pid` (`LSPTransportInterface plus { pid }`, Ruling 21's extended
form), `LSPClientInterface`'s `emitter`, `capabilities`, and `encoding`
(`{ emitter, capabilities, encoding } plus start, open, close, destroy`), `LSPTransportInterface`'s
`emitter` (`{ emitter } plus start, send, close`), `LSPClientOptions`' and
`StdioClientTransportOptions`' option members, and the event names of `LSPClientEventMap` and
`LSPTransportEventMap` (`{ notification, exit, error }`, `{ chunk, exit, error }` — Ruling 19). No
sentence was added to the guide body for any of them.

Convention sentences, one per table carrying the column, between that table's heading and the table
(Ruling 20): the canonical interface-and-alias sentence under each of the five entity tables, with
Ruling 21's extended-interface sentence appended under `### Stdio transport`, Ruling 15's guard
sentence appended under `### Guards`, and the constants sentence alone under `### Constants`.

`npm run docs -- --to guide`: `rows read: 1, disagreements found: 102, written: 101, reported: 1`.
The one reported line is the titled example (`the guide fence owns an example`), which `--to source`
owns. Then `npx oxfmt --config .oxfmtrc.json --write guides/lsp.md README.md`, exit 0.

The failure clauses the two widest Methods cells carried (`LSPClientInterface.start` and `.close`)
did not travel into the guide: they live in each member's `@throws` tag, and the guide's
`## Client lifecycle` and `## Transport seam` prose already state every coded refusal they named.
`LSPClientInterface.destroy`'s cell likewise narrowed to the block's description, with the drained
work and the destroyed emitter kept in the block's `@returns` and `@remarks`.

## Criterion 4 — the titled pair

The pair is `createLSPClient`'s block in `src/core/factories.ts` and the `## Client lifecycle`
fence that demonstrates it, titled `Create a client and inspect a document` (Ruling 9's heading
added directly above the fence's lead-in sentence, the `## Client lifecycle` heading unmoved, the
fence unmoved).

`grep -n '^#\+ Create a client and inspect a document' guides/lsp.md` → `45:` alone, so the heading
text occurs once heading-scoped. Fence bodies read before choosing: the `## Client lifecycle` fence
carries no three-backtick run and no `*/`, so it qualifies; the `## Stdio client transport` fence
was the other eligible body and also qualifies.

Ancillary decisions, recorded:

- The facts block lists `createStdioClientTransport` first because `grep` walked `src/server` before
  `src/core`, so "the first `create*` the facts block lists" and "the primary factory" disagree
  here. The title went on `createLSPClient`, the package's primary factory and the declaration the
  guide's flagship fence demonstrates.
- The new heading sits at `###` under `## Client lifecycle`, one level deeper, and the existing
  lead-in sentence was extended to name what the fence demonstrates (Ruling 21's fence lead-in).

Ruling 14: the fence demonstrated more than the block (the `open`, `close`, and `destroy` calls the
block stopped short of), so the block was extended and nothing was deleted from either side.

Run order and readings, the block titled first:

- `npm run docs` after titling: `rows read: 1, disagreements found: 102` — every cell now read, none
  `guide absent`, the pitch already agreeing.
- `npm run docs -- --to guide`: recorded under criterion 3.
- `npm run docs` after the write: `rows read: 1, disagreements found: 1` — the example pair alone.
- `npm run docs -- --to source`: `rows read: 1, disagreements found: 1, written: 1, reported: 0`,
  `wrote src/core/factories.ts`.

## Criterion 5 — the tagline, the pitch, and the displaced sentences

The blockquote, now one noun phrase in plain text and code spans, no link and no bold, identical in
`guides/lsp.md` and `README.md` down to its line breaks:

```text
> A typed Language Server Protocol client over an injected byte transport: a host-independent core
> carrying the base-protocol framing codec, the JSON-RPC and protocol guards, and an `LSPClient`
> that completes the initialize handshake, owns opened document URIs, and selects pull or push
> diagnostics from the server's own capabilities, beside a server environment whose
> `StdioClientTransport` carries those bytes over a language server run as a child process.
```

The guide's opening prose after the blockquote, carrying the sentences the blockquote displaced and
restating none of its clauses (the guide had no opening prose before this unit):

```text
Source: [`src/core`](../src/core) and [`src/server`](../src/server). Published through
`@orkestrel/lsp` and `@orkestrel/lsp/server`.
```

The README's opening paragraph, keeping the onboarding it alone carries — the entry function, the
one seam, and the stdio transport's bounded termination window — and restating none of the
tagline's clauses:

```text
Create a client with the `createLSPClient` function, hand it a transport, and
call `start()` before you open a document. The client reaches its peer only
through the transport it is handed, so any implementation of
`LSPTransportInterface` drives the same client, and the stdio transport ends the
child's whole tree inside a bounded termination window. Part of the `@orkestrel`
line.
```

The guide gained a `## Tests` section, which it had none of, naming each suite that proves it and
the equality gate's checks descriptively: every `Summary` cell against its declaration's description
paragraph, the titled `Create a client and inspect a document` fence against the `@example` block of
that title, and the README pitch against the guide's tagline. No SQ, MQ, EQ, or RQ identifier
appears in it.

Voice sweep over the prose this unit owns: `git diff` of `guides/lsp.md`, `README.md`, and `src/**`
against the substitution table, case-insensitively and across inflections, returned no hit. One
count entered the `## Tests` section as I drafted it ("byte carriage in both directions") and was
recast to "byte carriage into the child and out of it" before the section shipped. The guide's
pre-existing `both` at `guides/lsp.md:118` names its members in the same sentence and stays.

## Criterion 6 — the seed at zero

```text
$ npm run docs                        rows read: 1, disagreements found: 0            exit 0
$ npm run docs -- --to guide          rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source         rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/lsp.md README.md src/core/types.ts src/core/constants.ts src/core/helpers.ts src/core/factories.ts tests/guides.test.ts
All matched files use the correct format.                                             exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings src/core/types.ts src/core/constants.ts src/core/helpers.ts src/core/factories.ts tests/guides.test.ts
(no output)                                                                           exit 0
$ npm run check                       tsconfig.json, configs/src/tsconfig.core.json, configs/src/tsconfig.server.json, no diagnostics   exit 0
$ npm run test:guides                 Test Files 1 passed (1) / Tests 30 passed (30)   exit 0
$ npm run test:policy                 Test Files 1 passed (1) / Tests 90 passed | 1 skipped (91)   exit 0
```

`test:guides` and `test:policy` were re-run after the last README edit; both readings above are from
that final run. Observation, not a criterion: `npm run test:src:core` read
`Test Files 5 passed (5) / Tests 139 passed (139)`, exit 0.

The drop-in's canonical text was checked against the pilot rather than asserted:
`diff` of `/home/user/fleet/abort/tests/guides.test.ts` and `/home/user/fleet/lsp/tests/guides.test.ts`
over the range `const root = new URL('../', import.meta.url)` through the manifest loop's closing
brace reported no difference, as did the header's first three lines and the `INTERNAL` doc block.

## Criterion 8 — scope

```text
 M README.md
 M guides/lsp.md
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only. The unit's instruments sit in `tmp/d7n-lsp-converge/` inside this checkout
(`columns.mjs`, `cells.mjs`, `redfirst.mjs`, `guide-baseline.md`), which git ignores.

## Reader and seed defects met

None. Every reader returned the shape the brief describes, `replaceCell` disturbed no non-`Summary`
cell across 214 comparisons, and no residual disagreement survived a doc-block rewrite under the P16
comparator. The `{@link}` sites this guide carries (`LSP_DIAGNOSTIC_SEVERITIES`,
`LSP_DIAGNOSTIC_TAGS`, `LSP_SYNC_KINDS`, `LSP_ERROR_CODES`, `LSPError`) each converged as their
target's code token on the first `--to guide` pass and stayed equal on the following `docs` read.

## Decisions taken as ancillary, and observations

- The `## Surface` section's seven tables shared one heading with no heading between them, which
  Ruling 20 admits by placing the sentence once before the first. Instead the section gained seven
  H3 headings — the fleet's converged form in browser, console, brief, and process — so each table
  carries its own heading, its own lead-in sentence, and its own convention sentence, and the guard
  and constants tables take their own second sentences. `### Guards` and `### Constants` are the
  names Ruling 20 fixes.
- `LSPServerCapabilities`' `Shape` cell holds `{ positionEncoding?, textDocumentSync?,
  diagnosticProvider? }`. Its index signature has no bare-name form in Ruling 12's idiom; the
  description paragraph names the extension capabilities and the block's `@remarks` names the index
  signature itself.
- `isLSPError` sits in `### Framing, timing, and errors` among non-guards, so it takes no `Shape`
  cell (Ruling 20's mixed-table rule). Every row of `### Guards` takes the type it narrows to.
- The two executed describes moved from above the manifest loop to the end of the file, so the
  canonical header's sentence "as is the executed section that closes the file" is true of this
  copy; both now read the guide through `GUIDE_SPEC` rather than a repeated literal path.
- `ROOT_FILES` took the pilot's doc comment along with `README.md`, since the pilot's wording
  ("Root-level files these checks read") describes this package's use of it exactly.
- Observation for the closing sweep, not acted on: the fences under `## Transport seam`,
  `## Stdio client transport`, `## Framing state`, and `## Validation` are introduced by a paragraph
  rather than by a sentence naming the fence, which Ruling 21 assigns to that sweep.

## Deviation state

No deviation. Nothing in the deviation contract fired: every cell the seed located after the headers
changed, the titled body fitted its block, no test outside `tests/guides.test.ts` went red, no
vendored file needed an edit, and no reader returned an undescribed shape.
