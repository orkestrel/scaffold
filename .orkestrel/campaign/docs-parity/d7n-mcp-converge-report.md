# Report — P.2 `d7n-mcp-converge`

Every criterion reads as the brief expected. No deviation. One reader defect met and reported.

Checkout `/home/user/fleet/mcp`, branch `claude/orkestrel-npm-audit-deps-14ibta`, baseline tip
`a844c0c` (clean at start). Wall clock, first command to last: 2026-09-07T21:16:28Z to
2026-09-07T21:47:40Z.

## Criterion 1 — red-first on the unconverged tree

Command: `npm run test:guides` after the gate cases landed and before any convergence.
`Test Files 1 failed (1) | Tests 3 failed | 160 passed (163)`. Each failing case's first lines,
verbatim:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/mcp.md pairs: guide [\"Protocol\",\"Protocol\",\"Surface\",\"Narrow a message to its JSON-RPC arm\", … ,\"Declared packaging limits\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:187:20
    187|  expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > MCP > keeps every compared summary and example equal to its source
AssertionError: expected [ …(457) ] to deeply equal []
+   "guides/mcp.md class MCPServer: guide absent source \"Dispatches JSON-RPC 2.0 requests over a live `ToolManagerInterface`, with NO transport coupling.\"",
+   "guides/mcp.md function createMCPServer: guide \"Create an `MCPServerInterface` exposing tools plus optional signed MRTR input and event-driven subscription mechanisms over JSON-RPC 2.0.\" source \"Creates a transport-agnostic Model Context Protocol server — exposes a live `ToolManagerInterface` and an optional `MCPResourceManagerInterface`, `MCPPromptManagerInterface`, and `MCPCompletionInterface` over JSON-RPC 2.0.\"",
```

Same command after convergence: `Test Files 1 passed (1) | Tests 163 passed (163)`, exit 0.

## Criterion 2 — the headers and the class rows

Every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, or
`Returns`. No `Signature` header and no `Value` header survives; `grep -c '| Signature '` reads 0.

- `Behavior` → `Summary` in every `## Methods` table: the header rows at the baseline's lines 3201,
  3220, 3272, 3285, 3298, 3317, 3344, 3361, 3395, 3411, 3428, 3438, 3453, 3500, 3559, 3656, 3677,
  3706, and 3734.
- Every Constants table went `Constant | Kind | Value` → `Constant | Kind | Shape | Summary`, with
  the convention sentence "A `Shape` cell holds the constant's declared type." above it (core,
  HTTP transport, stdio transport, browser transport; the WebSocket face declares none and keeps
  its prose note).
- Every Types table went `Type | Kind | Shape` → `Type | Kind | Shape | Summary`, with Ruling 15's
  fleet wording above it (core, HTTP, WebSocket, stdio, browser).
- `### Entities` → `### Classes` at the core face and `#### Entities` → `#### Classes` at the HTTP,
  WebSocket, stdio, and browser faces. Every `Kind` cell in each of those tables reads `class`; no
  mixed table exists. The prose anchor `[Core § Entities](#entities)` became
  `[Core § Classes](#classes)`, and one body sentence naming "the `MCPLegacy` Entities row" now
  names the Classes row.
- Every class the barrel exports carries a row; no class is documented under its own H3.

Hand-rebuild comparison against the baseline, as the brief requires
(`tmp/d7n-mcp-converge/cells.py` over `git show HEAD:guides/mcp.md` and the tree):

```text
rows in baseline: 464
rows now: 464
keys only in baseline: every class key under an Entities heading
keys only now: the same keys under the Classes heading
non-Summary, non-Shape/Value mismatches: 0
```

The first column and the `Kind` and `Returns` cells of all 464 rows are byte-identical to the
baseline.

## Criterion 3 — the cells, the blocks, and the Shape idiom

`npm run docs -- --to guide` on the retabled tree: `rows read: 1, disagreements found: 458,
written: 451, reported: 7`. A later pass after the doc-block work wrote 14 more, then 1, then 0.

### Rows whose literal stayed in `Shape`

Every constant declared without a type annotation keeps its literal type in `Shape`, because that
literal *is* its declared type: `MCP_META_VERSION`, `MCP_META_CAPABILITIES`, `MCP_META_CLIENT`,
`MCP_META_SERVER`, `MCP_META_SUBSCRIPTION`, `MCP_EXTENSION_TASKS`, `MCP_SENTINEL_PREFIX`,
`MCP_SENTINEL_SUFFIX`, `MCP_PARAM_PREFIX`, `MCP_HEADER_ANNOTATION`, `MCP_LOOKUP_PAGES`,
`MCP_HEADER_MISMATCH`, `MCP_MISSING_CAPABILITY`, `MCP_UNSUPPORTED_VERSION`,
`DEFAULT_MCP_CACHE_TTL`, `JSONRPC_PARSE_ERROR`, `JSONRPC_INVALID_REQUEST`,
`JSONRPC_METHOD_NOT_FOUND`, `JSONRPC_INVALID_PARAMS`, `JSONRPC_INTERNAL_ERROR`,
`JSONRPC_SERVER_ERROR`, `DEFAULT_MCP_CLIENT_NAME`, `DEFAULT_MCP_CLIENT_VERSION`,
`DEFAULT_MCP_REQUEST_TIMEOUT`, `DEFAULT_MCP_SUBSCRIPTION_CAPACITY`, `MCP_SESSION_HEADER`,
`MCP_PROTOCOL_VERSION_HEADER`, `MCP_METHOD_HEADER`, `MCP_NAME_HEADER`,
`MCP_WEBSOCKET_SUBPROTOCOL`, `SSE_BUFFERING_HEADER`, `SSE_BUFFERING_DISABLED`,
`DEFAULT_MCP_PATH`, `DEFAULT_MCP_KEEPALIVE_INTERVAL`, `SSE_KEEPALIVE_COMMENT`,
`DEFAULT_MCP_SESSION_CAPACITY`, `DEFAULT_MCP_SESSION_TTL`, `DEFAULT_MCP_DELIVERY`,
`DEFAULT_MCP_SERVER_NAME`, `DEFAULT_MCP_SERVER_VERSION`.

### Rows whose literal moved into the doc block (Ruling 18)

Where the constant carries an annotation, `Shape` holds the annotation and the description
paragraph gained the literal:

| Constant                             | `Shape`                       | Literal added to the description |
| ------------------------------------ | ----------------------------- | -------------------------------- |
| `MCP_HANDSHAKE_VERSION`              | `MCPLegacyVersion`            | `'2025-11-25'`                   |
| `MCP_FALLBACK_VERSION`               | `MCPLegacyVersion`            | `'2025-06-18'`                   |
| `MCP_MODERN_VERSION`                 | `MCPModernVersion`            | `'2026-07-28'`                   |
| `SUPPORTED_MODERN_PROTOCOL_VERSIONS` | `readonly MCPModernVersion[]` | `2026-07-28`                     |
| `SUPPORTED_LEGACY_PROTOCOL_VERSIONS` | `readonly MCPLegacyVersion[]` | `2025-11-25` and `2025-06-18`    |

`SUPPORTED_MCP_VERSIONS` (`readonly MCPVersion[]`), `EMPTY_MCP_ARGUMENTS`
(`Readonly<Record<string, unknown>>`), and `DEFAULT_MCP_LIMITS`
(`Readonly<{ message, metadata, keys, state, content, subscriptions, depth }>`) needed no literal:
the `MCPVersion` row spells the union, and the other blocks' `@remarks` already carry the values.

### Blocks rewritten by hand

Each was rewritten because the retired cell carried a fact the block lacked, or because its
description was noun-first and had to read verb-first:

- `src/core/types.ts`: `JSONRPCId` (gained a remark that `null` is not an id),
  `MCPResourceTemplate` (the `uriTemplate` is published as a string and never parsed or expanded),
  `MCPPaginationParams` (the cursor is opaque and the manager mints it), `MCPPaginationResult` (an
  absent `nextCursor` means the final page), `MCPResourceReadParams` (verb-first, plus the concrete
  `uri` and the continuation carriers), `MCPPromptGetParams` (verb-first, plus string argument
  values by contract), `MCPCompletionParams` (verb-first),
  `MCPResourceTemplateReference` (the `uri` may itself be a template, forwarded verbatim),
  `MCPCompletionResult` (the 100-value cap and `hasMore`), `MCPElicitURL` (the client must declare
  `elicitation.url`), and `MCPResourceManagerInterface` (owns no template engine).
- `src/server/types.ts`: `MCPSessionInterface` and `StdioServerInterface` gained a doc block per
  member — `id`, `attach`, `detach`, `push`, `replay`, `start`, and `stop` — because each read
  `source absent` against a documented `## Methods` row. The interface `@remarks` bullets those
  member blocks now repeat were pruned, and what only the interface can say was kept.
- `src/core/constants.ts`: the five version constants in the preceding table.

### The `Shape` idiom (Ruling 12, worded per Ruling 15)

Every `Shape` cell was recomputed from the declaration rather than edited: an interface's data
members as bare names in braces with `?` on an optional one, its call-signature members after
`plus`, and a type alias's own literal with a union's arms escaped as `\|`. A literal discriminant
is kept as a literal (`{ jsonrpc: '2.0', method, id, params? }`, `{ status: 'working' }`), matching
the fleet's converged tables. A member typed as an arrow function counts as a call-signature member,
so `MCPTransportInterface` reads `{} plus send, listen, closed, close`. No cell spells a named
member's type; a sweep of every `Shape` cell reports the three index signatures as the only
`name: type` pairs left, which the following ancillary decisions cover.

## Criterion 4 — the titled pair

The titled block is `createMCPServer`'s in `src/core/factories.ts` — the primary factory, the block
whose example the guide's flagship fence demonstrates. Its title is
`Expose a tool registry over MCP`, the flattened text of the H3 whose first fence demonstrates it.
Uniqueness, heading-scoped: `grep -n '^#\+ Expose a tool registry over MCP' guides/mcp.md` reports
one line. Fence body read first: it carries no three-backtick run and no doc-comment terminator, so
it qualifies. The heading is a `## Patterns` H3 already worded as a demonstration, so Ruling 9's
deeper heading was not needed and no fence moved.

Ruling 14: the block demonstrated more than the fence (the `request` event subscription and a
direct `handle` round trip with its exact reply), and the fence demonstrated more than the block (a
described `search` tool and the transport pump). The fence was extended to carry both, deleting
nothing: it registers the fence's `search` tool and the block's `add` tool, subscribes to `request`,
runs the transport pump, and closes with the direct `handle` round trip. The claimed reply string
is measured rather than authored — `node tmp/d7n-mcp-converge/probe-example2.mjs` against
`dist/src/core/index.js` returned:

```text
{"jsonrpc":"2.0","id":1,"result":{"tools":[{"name":"search","inputSchema":{"type":"object"},"description":"Search the docs"},{"name":"add","inputSchema":{"type":"object"}}],"resultType":"complete","ttlMs":60000,"cacheScope":"private","_meta":{"io.modelcontextprotocol/serverInfo":{"name":"docs","version":"1.0.0"}}}}
```

The block was titled first, and `npm run docs` then read `rows read: 1, disagreements found: 1` —
the example pair alone. `npm run docs -- --to source` after that:
`rows read: 1, disagreements found: 1, written: 1, reported: 0`. Every other block stays untitled.

## Criterion 5 — the tagline, the opening prose, and the pitch

The H1 blockquote is now one noun phrase in plain text and code spans, with no link and no bold:

```text
> The Model Context Protocol layer: a typed JSON-RPC 2.0 client/server pair with pluggable
> HTTP, WebSocket, stdio, and browser transports.
```

The displaced sentences — the Ingress/Egress paragraph, the dispatch-core paragraph, the wire-layer
paragraph with its transport list, the mechanism-not-policy paragraph, and the Observable paragraph
— fold into the guide's opening prose directly after the blockquote and before `## Protocol`, as
ordinary prose. None of them restates the tagline's clauses; the tagline's own sentence was removed
from the body when it became the blockquote.

`README.md` gained the same blockquote under its H1 with the same line breaks. Its opening
paragraph was rewritten to the onboarding it alone carries and no longer restates the tagline's
clauses:

```text
Bridge the `@orkestrel/tool` registry to MCP: `createMCPServer` exposes a live
`ToolManagerInterface` to any MCP client, and `createMCPClient` drives a remote MCP server
and surfaces its tools as local `ToolInterface`s. No agent runtime is required. The dispatch
core in `src/core` speaks JSON-RPC 2.0 and nothing else; each transport lives one layer out,
in `src/server` for Node and `src/browser` for the page, and each is mechanism rather than
policy. Part of the `@orkestrel` line.
```

One further README line changed: "The SAME `MCPClient` drives …" → "The same `MCPClient` drives …".

## Criterion 6 — the seed at zero

```text
$ npm run docs                       rows read: 1, disagreements found: 0                                 EXIT 0
$ npm run docs -- --to guide         rows read: 1, disagreements found: 0, written: 0, reported: 0        EXIT 0
$ npm run docs -- --to source        rows read: 1, disagreements found: 0, written: 0, reported: 0        EXIT 0
```

## Criterion 7 — the gates

```text
$ npx oxfmt --config .oxfmtrc.json --check <owned paths>    All matched files use the correct format.   EXIT 0
$ npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>                                  EXIT 0
$ npm run check                                                                                          EXIT 0
$ npm run test:guides       Test Files 1 passed (1);  Tests 163 passed (163)                            EXIT 0
$ npm run test:policy       Test Files 1 passed (1);  Tests 90 passed | 1 skipped (91)                  EXIT 0
$ npm run test:src:core     Test Files 17 passed (17); Tests 909 passed (909)      (observation)        EXIT 0
```

The scoped lint reddened once during the unit, on my own file: the canonical file-scope `own`
binding shadowed a local `own` inside this package's public-face loop
(`tests/guides.test.ts:295:9: warning eslint(no-shadow)`). The canonical binding keeps its name and
the package's local one was renamed to `published`, which is the package-owned side of the file.

## Criterion 8 — the working tree

`git status --short` lists 34 files, all owned: `README.md`, `guides/mcp.md`,
`tests/guides.test.ts`, and the `src/**` files whose doc blocks moved. `git diff -U0 -- src` filtered
to lines that are neither a `*` continuation nor a block opener returns nothing, so no `src/**` code
line changed. Diffstat: `34 files changed, 1756 insertions(+), 1562 deletions(-)`.

## The voice sweeps

- All-caps emphasis: the sweep run reported `lines changed: 385` for `guides/mcp.md`,
  `lines changed: 1` for `README.md`, and `lines changed: 496` across the `src/**` files. The sweep masks fenced code, inline code spans, `{@link}` targets, and
  link destinations, so only prose changed, and it keeps genuine initialisms and the RFC 2119
  keywords (`MUST`, `MAY`, `SHOULD`, and a `NOT` following one of them). Sentence-initial position
  is read from the previous prose line's ending, so a wrapped continuation line is not capitalized.
- Counts in prose: corrected in `guides/mcp.md` (for example, "the other two targets"
  → "a prompt or a resource target"; "the two doors" → "`start` and `stop`"; "Two interfaces over
  one entity because two parties hold it" → "A second interface over one entity because the
  executor and the owner hold it") and in the doc blocks the caps sweep had already rewritten. Quantities that are values — durations, byte bounds, example counts of principals or
  consumers, measured conformance numbers — were left as values.
- Neither sweep introduced a count or an all-caps emphasis.

## § Tests

`guides/mcp.md` § Tests gained one row naming the equality gate descriptively, with no SQ/MQ/EQ/RQ
identifier:

```text
- [The equality gate: every `Summary` cell against its declaration's description paragraph, the titled `Expose a tool registry over MCP` fence against the `@example` block of that title (pinned so the titled pair cannot be retired silently), and the README pitch against this guide's tagline](../tests/guides.test.ts)
```

## The drop-in's canonical text

`tests/guides.test.ts` carries the pilot's text byte for byte outside this package's constants and
its own executed proofs: the header's canonical three lines with Ruling 13's amendment ("The
constants that follow are this package's own"), the `INTERNAL` doc block reading "the assertion that
follows it fails when a name here stops being stranded", the pin in the guard-and-continue form with
the both-sides failure line and no local type predicate, the README case with its two
`not.toBeUndefined()` guards before `toBe`, and the equality case directly after the methods loop and
before the examples case, which is named `documents an example for every Surface function`.
`diff` against `/home/user/fleet/abort/tests/guides.test.ts` over the pin-plus-README region and
over the equality case reports no difference; the `INTERNAL` block likewise. `GUIDE_SPEC` is
declared once and is the only spelling of the spec path in the file (`grep -n "guides/mcp.md'"`
returns the declaration alone, at line 68); `README.md` was already in `ROOT_FILES`.

Following router's precedent, the header's canonical sentence is extended on its own line with what
is true of this file — the public-face import refusals and their stranded control, what a spawned
stdio child receives, and how the composed stdio server answers a legacy `initialize` — because
this package's proofs are not confined to its constants and the bare canonical claim would be false
here.

## Reader defect met

**An H3 heading containing a backticked symbol registers that symbol as an H3-documented entity, and
a table row after it loses its `Summary`.** The seed line that produced it:

```text
guides/mcp.md class MCPServer: guide absent source "Dispatches JSON-RPC 2.0 requests over a live `ToolManagerInterface`, with NO transport coupling."
```

The row existed and carried the exact text; `createGuide(...).surface()` returned
`{ name: 'MCPServer', keyword: 'class' }` with no `summary`. Bisecting the guide's prefix located
the shadowing line: `### Bind an \`MCPServer\` / \`MCPClient\` to any duplex transport`, a
`## Patterns`-style heading that documents no entity. The minimal reproduction, run against the
installed `@orkestrel/guide@0.0.18`:

```js
// heading BEFORE the table → the row's summary is dropped
createGuide('# T\n\n> tag\n\n## Surface\n\n### Bind an `MCPServer` / `MCPClient` to any duplex transport\n\nprose\n\n### Classes\n\n| API | Kind | Summary |\n| --- | --- | --- |\n| `MCPServer` | class | Row summary. |\n').surface()
// → [{"name":"MCPServer","keyword":"class"}]

// the same heading AFTER the table → the summary survives
// → [{"name":"MCPServer","keyword":"class","summary":"Row summary."}]

// the same heading with the symbols swapped → only the FIRST backticked symbol is taken
// '### Bind an `MCPClient` / `MCPServer` …' → [{"name":"MCPClient","keyword":"class"},{"name":"MCPServer","keyword":"class","summary":"Row summary."}]
```

The reader takes the first backticked identifier in any H3 as an entity documented under that
heading, whatever the heading's wording, and an entity registered before a table row wins. A guide
whose Surface tables sit after its pattern sections therefore cannot document a class whose name
appears first inside any pattern heading.

Fixed in this checkout by rewording the heading to
`### Bind a server or a client to any duplex transport`, which carries no backticked identifier and
still names the demonstration. The matching `describe` title in `tests/guides.test.ts` was updated
with it. The alternative — moving every Surface table ahead of the pattern sections — would
move every pattern section relative to the tables and change the guide's teaching order, so it
was not taken.

No seed defect was met. `replaceCell`, `replaceSummary`, and `replaceExample` each wrote exactly the
cells and blocks their run reported, and `p16`-style comparison of every non-`Summary` cell after
the writes and the formatter reports no disturbed cell.

## Ancillary decisions recorded

- **A Constants table drops `Value` and heads `Shape`.** The brief permits `Value` beside `Summary`
  and separately requires a constant's declared type to head `Shape`. Ruling 18 and every converged
  sibling (`websocket`, `template`) settle it as `Kind | Shape | Summary` with no `Value` column, so
  this guide takes that shape and the literals ride in the descriptions.
- **An index signature keeps its own spelling.** `MCPResult`, `MCPLegacyResult`, and
  `MCPTaskNotificationParams` read `[key: string]` inside their braces. It has no bare member name
  to stand for, and its presence is what tells a reader the record is open.
- **A call-only interface reads `{} plus …`.** `MCPTransportInterface`, `MCPProgressInterface`,
  `MCPMethodManagerInterface`, `MCPStreamControllerInterface`, `MCPTextStreamControllerInterface`,
  `MCPTaskClientInterface`, and `ScopeServerInterface` declare no data member, and the empty braces
  say so rather than being omitted.
- **A member typed as an arrow function is a call-signature member**, so it sits after `plus` even
  though it is declared property-style.
- **The equality-gate row in § Tests names the titled fence by its title**, matching the pilot's
  `:156`.

## Deviation state

None. Every gate the brief names exits 0, `npm run docs` reads a non-zero `rows read` at zero
disagreements in both write directions, and the working tree holds owned files alone. Nothing was
committed, installed, or discarded; no `git checkout`, `restore`, `stash`, `reset`, or `clean` ran.
Instruments are under `/home/user/fleet/mcp/tmp/d7n-mcp-converge/` — `shape.py`, `consts.py`,
`tables.py`, `blocks.py`, `worksheet.py`, `sweep.py`, `counts.py`, `counts2.py`, `docedits.py`,
`typeedits.py`, `titled.py`, `cells.py`, the `probe*.mjs` reader probes, and the gate logs.
