# Brief — P.2 `d7n-tool-converge` (tool under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/tool` from the committed baseline `f6987c3` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.14`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/tool.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/tool/guides/tool.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-tool-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/tool.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with `npm run docs -- --to source` and record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/tool.md interface ToolDefinition: guide absent source "Describes a tool as advertised to a caller."
guides/tool.md interface ToolCall: guide absent source "Describes a call issued by a caller."
guides/tool.md interface ToolSuccess: guide absent source "Reports the successful outcome of executing a `ToolCall`."
guides/tool.md interface ToolFailure: guide absent source "Reports the failed outcome of executing a `ToolCall`."
guides/tool.md interface ToolOptions: guide absent source "Configures an executable tool."
guides/tool.md interface ToolInterface: guide absent source "Represents an executable tool: its advertised definition plus its local handler."
guides/tool.md interface ToolManagerInterface: guide absent source "Represents a registry of executable tools with per-call error isolation."
guides/tool.md type ToolResult: guide absent source "Represents the outcome of executing a `ToolCall`."
guides/tool.md function isToolCall: guide absent source "Determines whether an unknown value is structurally a `ToolCall`."
guides/tool.md function toolToDefinition: guide absent source "Projects a tool onto the plain definition advertised to a caller."
guides/tool.md function createTool: guide absent source "Creates an executable tool."
guides/tool.md function createToolManager: guide absent source "Creates an empty tool registry."
guides/tool.md class Tool: guide absent source "Binds an executable tool definition to a handler."
guides/tool.md class ToolManager: guide absent source "Represents an insertion-ordered tool registry with per-call error isolation."
guides/tool.md ToolInterface.execute: guide absent source "Runs the tool's handler."
guides/tool.md ToolManagerInterface.add: guide absent source "Registers one tool."
guides/tool.md ToolManagerInterface.tool: guide absent source "Finds one registered tool by name."
guides/tool.md ToolManagerInterface.tools: guide absent source "Lists the registered tools in insertion order."
guides/tool.md ToolManagerInterface.definitions: guide absent source "Lists the definitions advertised to a caller. The projected `description` is the tool's `summary` when one was authored, advertised in place of the full description. The full text stays on the tool for direct lookup."
guides/tool.md ToolManagerInterface.execute: guide absent source "Executes one call with error isolation."
guides/tool.md ToolManagerInterface.remove: guide absent source "Removes one registered tool."
guides/tool.md ToolManagerInterface.clear: guide absent source "Removes every registered tool."
guides/tool.md pitch: readme absent tagline "The tool runtime for the `@orkestrel` line. A tool is a callable function described by a JSON Schema — a `name`, an optional description, an optional parameter schema, and the handler that runs it. That is the whole idea: a tool is an API call whose shape is data, so whoever calls it can discover it, present it, and invoke it without knowing anything about the code behind it. `Tool` binds the advertised definition to its handler; `ToolManager` keeps tools by name in insertion order, advertises their definitions, and executes calls with per-call error isolation; `ToolCall` and `ToolResult` are the correlated pair that travels between a caller and the registry. Source: `src/core`. Published through `@orkestrel/tool`. Anyone can call a tool. Nothing here is model-specific — `tools.execute(call)` is an ordinary async call returning an ordinary result, and plain application code may drive it directly. The shape exists because callers that work from descriptions need the description and the handler to travel together: an agent loop choosing which function to invoke, an MCP bridge exposing local capability to a remote client, a backend dispatching a named operation. `@orkestrel/agent` and `@orkestrel/mcp` are two such callers; ready-made tools ship in `@orkestrel/toolbox`. Mechanism only. This runtime advertises, dispatches, and contains failure. It transports nothing, validates no arguments against a tool's schema, authorizes no call, and ships no concrete tools. Optional caller context is consumer-asserted and forwarded without verification. Each trust decision belongs to the invoking consumer, to a policy layer, or to the tool itself. Progress reporting belongs there too: it is a property of the invoking consumer's execution context, one layer up — the @orkestrel/mcp package's execution context carries a progress reporter — never of the tool contract itself."
rows read: 1, disagreements found: 23
exit 1
```

## Facts for tool (taken 2026-09-07T15:24Z by facts.sh)

- Checkout `/home/user/fleet/tool`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `f6987c3`, status: clean
- `package.json`: version `0.0.14`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 1 | summary 1 | banned 0 | tests/setup.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    9:| Concept | Spec                 | Source                    | Tests                                 |
    10:| ------- | -------------------- | ------------------------- | ------------------------------------- |
    11:| Tool    | [`tool.md`](tool.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    15:| Directory  | Guide                |
    16:| ---------- | -------------------- |
    17:| `src/core` | [`tool.md`](tool.md) |
- Guide `guides/tool.md`: 283 lines. Headings:
    1:# Tool
    34:## Surface
    36:### Contracts
    52:### Validators
    60:### Helpers
    68:### Factories
    78:### `Tool`
    88:### `ToolManager`
    97:## Methods
    101:#### `ToolInterface`
    107:#### `ToolManagerInterface`
    119:## Anatomy of a tool
    160:## The registry
    195:## Calls and results
    254:## Callers
    271:## Tests
    279:## See also
- Table headers in `guides/tool.md` (a header row is the row before a `| ---` row):
    41: | Name                   | Kind      | Shape / Purpose                                                                                                                     |
    56: | Name         | Kind     | Signature                               | Behavior                                                                                                                                                              |
    64: | Name               | Kind     | Signature                                 | Behavior                                                                                                                                  |
    73: | Name                | Kind     | Signature                                 | Behavior                                                                  |
    103: | Method    | Returns                       | Behavior                                                                                    |
    109: | Method        | Returns                                        | Behavior                                                                                        |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/tool.md`):
    3: > **The tool runtime for the `@orkestrel` line.** A tool is a callable function described by a
    4: > JSON Schema — a `name`, an optional description, an optional parameter schema, and the handler
    5: > that runs it. That is the whole idea: a tool is an API call whose shape is data, so whoever
    6: > calls it can discover it, present it, and invoke it without knowing anything about the code
    7: > behind it. `Tool` binds the advertised definition to its handler; `ToolManager` keeps tools by
    8: > name in insertion order, advertises their definitions, and executes calls with per-call error
    9: > isolation; `ToolCall` and `ToolResult` are the correlated pair that travels between a caller
    10: > and the registry. Source: [`src/core`](../src/core). Published through `@orkestrel/tool`.
    11: >
    12: > **Anyone can call a tool.** Nothing here is model-specific — `tools.execute(call)` is an
    13: > ordinary async call returning an ordinary result, and plain application code may drive it
    14: > directly. The shape exists because callers that work from descriptions need the description
    15: > and the handler to travel together: an agent loop choosing which function to invoke, an MCP
    16: > bridge exposing local capability to a remote client, a backend dispatching a named operation.
    17: > `@orkestrel/agent` and `@orkestrel/mcp` are two such callers; ready-made tools ship in
    18: > `@orkestrel/toolbox`.
    19: >
    20: > **Mechanism only.** This runtime advertises, dispatches, and contains failure. It transports
    21: > nothing, validates no arguments against a tool's schema, authorizes no call, and ships no
    22: > concrete tools. Optional caller context is consumer-asserted and forwarded without
    23: > verification. Each trust decision belongs to the invoking consumer, to a policy layer, or to
    24: > the tool itself. Progress reporting belongs there too: it is a property of the invoking
    25: > consumer's execution context, one layer up — the @orkestrel/mcp package's execution context
    26: > carries a progress reporter — never of the tool contract itself.
- Opening prose after the blockquote (first two lines):
    28: `Tool` and `ToolManager` carry the runtime. A `Tool` is inert — a definition plus a handler, with
    29: no lifecycle and no failure handling of its own. A `ToolManager` is the live surface a caller
- README (`README.md`) first lines:
    # @orkestrel/tool
    
    The tool runtime for the `@orkestrel` line.
    
    A tool is a callable function described by a JSON Schema: a name, an optional description, an
    optional parameter schema, and the handler that runs it. That is the whole idea — a tool is an
    API call whose shape is data, so whoever calls it can discover it, present it, and invoke it
    without knowing anything about the code behind it. This package ships that shape and the
    registry around it: definitions to advertise, calls to dispatch, results to correlate, and
    per-call error isolation so one bad tool never takes down the run.
    
    Nothing here is model-specific. An agent loop, an MCP bridge, and plain application code are all
- `## Patterns` fences, each with its nearest preceding heading:
    124: fence under "## Anatomy of a tool"
    165: fence under "## The registry"
    200: fence under "## Calls and results"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:22:export function createTool(options: ToolOptions): ToolInterface {
    src/core/factories.ts:45:export function createToolManager(): ToolManagerInterface {
    src/core/tools/Tool.ts:26:export class Tool implements ToolInterface {
    src/core/tools/ToolManager.ts:35:export class ToolManager implements ToolManagerInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/validators.ts:1
    src/core/factories.ts:2
    src/core/helpers.ts:1
    src/core/tools/Tool.ts:1
    src/core/tools/ToolManager.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    20:} from '@orkestrel/guide'
    42:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    48:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    93:		for (const group of guide.methods()) {
    94:			const members = source.methods(group.interface).map((method) => method.name)
    102:					expect(findMissing(members, documented)).toEqual([])
    105:					expect(findMissing(documented, members)).toEqual([])
    111:							: findMissing(
    112:									source.methods(entity).map((method) => method.name),
    130:				findUnexampled(
    133:					source.examples().map((example) => example.name),
    138:		for (const group of guide.methods()) {
    149:							? source.examples(group.interface).map((example) => example.name)
    153:									.concat(source.examples(entity).map((example) => example.name))
    154:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    166:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 271:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/tool.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/tool.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-tool-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
