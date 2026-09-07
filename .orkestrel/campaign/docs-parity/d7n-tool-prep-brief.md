# Brief — P.1 `d7n-tool-prep` (tool's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/tool` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `80b4082`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

tool's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== tool 2026-09-07T15:15:27Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
76:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 855ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### tool (80b4082, version 0.0.13, guide range ^0.0.17, head start 0.0.18)
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
   tests/setup.ts(1)
-- docs
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
-- check
   tests/guides.test.ts(101,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(104,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(108,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(123,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(138,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 9 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  9 failed | 18 passed (27)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 1 | summary 1 | banned 0 | tests/setup.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for tool (taken 2026-09-07T15:15Z by facts.sh)

- Checkout `/home/user/fleet/tool`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `80b4082`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    94:			const members = source.methods(group.interface)
    101:					expect(findMissing(members, group.methods)).toEqual([])
    104:					expect(findMissing(group.methods, members)).toEqual([])
    108:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    123:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    126:		for (const group of guide.methods()) {
    136:							? source.examples(group.interface)
    137:							: source.examples(group.interface).concat(source.examples(entity))
    138:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    150:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 271:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.13"` → `"version": "0.0.14"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-tool-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
