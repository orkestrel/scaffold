# Report — `d7n-tool-converge`

Wall clock: 2026-09-07T15:24:58Z (first command) to 2026-09-07T15:36:25Z (last command).

Every acceptance criterion is met. No deviation. `npm run docs` exits 0 at `rows read: 1,
disagreements found: 0`, and `--to guide` and `--to source` each read `written: 0`.

## 1. Red-first on the unconverged tree

`npm run test:guides` after the gate cases landed and before any convergence — exit 1,
`Tests 3 failed | 27 passed (30)`. The failures, first lines verbatim:

```text
FAIL |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/tool.md pairs: guide [\"Anatomy of a tool\",\"The registry\",\"Calls and results\"] source []",

FAIL |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:107:20   expect(pitch).not.toBeUndefined()

FAIL |guides| tests/guides.test.ts > Tool > keeps every compared summary and example equal to its source
AssertionError: expected [ …(22) ] to deeply equal []
+   "guides/tool.md interface ToolDefinition: guide absent source \"Describes a tool as advertised to a caller.\"",
+   "guides/tool.md interface ToolCall: guide absent source \"Describes a call issued by a caller.\"",
+   "guides/tool.md interface ToolSuccess: guide absent source \"Reports the successful outcome of executing a `ToolCall`.\"",
+   … the remaining rows of the seed worklist
```

The equality case's worklist matched the brief's seed worklist line for line, minus the `pitch`
row the case does not read.

Each case, at its final line in `tests/guides.test.ts`: `findDrift` imported at `:13`;
`GUIDE_SPEC` at `:31`; `ROOT_FILES` gaining `README.md` at `:45`; the pin at `:72`; the README
case at `:101`; the equality case at `:181`, inside the manifest loop's `describe(entry.concept)`
block. The pin is scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`),
with no local predicate, and its failure line names both title sets. The README case guards each
side with `not.toBeUndefined()` before `toBe`.

## 2. Tables

Every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`,
`Signature`, `Returns` (header rows, `guides/tool.md`): `:44` Contracts `| Name | Kind | Shape |
Summary |`; `:63` Validators, `:71` Helpers, `:80` Factories `| Name | Kind | Signature | Summary
|`; `:91` Classes `| Name | Kind | Summary |`; `:121` and `:127` Methods `| Method | Returns |
Summary |`.

- `Behavior` was renamed `Summary` in Validators, Helpers, Factories, and each Methods table.
- `Shape / Purpose` in Contracts split into `Shape` and a new last column `Summary`.
- `### Classes` (`:85`) is new, before the `### \`Tool\`` (`:96`) and `### \`ToolManager\``
  (`:106`) sections, so its rows carry the summaries the H3 headings cannot. Both H3-documented
  classes carry a row. No `### Entities` heading exists in this guide.

### Rows whose literal stayed in `Shape`

Every Contracts row. `ToolDefinition` `{ name, description?, parameters? }`; `ToolCall`
`{ id, name, arguments, caller? }`; `ToolSuccess` `{ id, name, success: true, value }`;
`ToolFailure` `{ id, name, success: false, error }`; `ToolOptions`
`{ name, description?, summary?, parameters?, execute }`; `ToolResult` the alias value
`ToolSuccess \| ToolFailure`.

`ToolInterface` and `ToolManagerInterface` carried prose rather than a literal in the old
`Shape / Purpose` cell; each gained the members-in-braces literal the convention states —
`{ name, description?, parameters?, summary?, execute }` and
`{ count, add, tool, tools, definitions, execute, remove, clear }`.

The `Shape` idiom's convention sentence sits under the section intro at `:41`, worded against the
rows that remain: "A `Shape` cell holds an interface's members in braces, and a type alias's
value." The `See [\`## Methods\`](#methods)` pointer the interface cells carried moved below
the table (`:55`), where it also states that the readonly `count` of `ToolManagerInterface` is a
Surface member with no method row.

## 3. Doc blocks rewritten by hand, then propagated

Ruling 6's direction: each block below carried less than its guide cell, so the block moved first
and `--to guide` carried it across.

- `src/core/types.ts:19` `ToolCall` — "Describes a call issued by a caller." became "Describes one
  request to run a named tool.", taking the cell's "one request to run a named tool".
- `src/core/types.ts:89` `ToolInterface.execute` — "Runs the tool's handler." became "Runs the
  tool's handler with the caller-supplied arguments and any consumer-asserted caller context.",
  taking the cell's arguments and caller-context clause.
- `src/core/types.ts:161` `ToolManagerInterface.tool` — the description stands; the cell's "the
  exact registered instance" landed on `@returns`, which now reads "The exact registered instance
  when found, otherwise `undefined`".
- `src/core/types.ts:171` `ToolManagerInterface.definitions` — Ruling 7's split. The reference
  paragraph ("The projected `description` is the tool's `summary` when one was authored …") became
  `@remarks`, every sentence kept, so the description is "Lists the definitions advertised to a
  caller."
- `src/core/factories.ts:6` `createTool` and `:39` `createToolManager` — Ruling 7's factory clause.
  Each now states the contract it returns: "… returned as a `ToolInterface` so a call site holds
  the published contract rather than the `Tool` class." and "Creates an empty registry that
  advertises definitions and executes calls with per-call error isolation, returned as a
  `ToolManagerInterface` so a caller holds the published contract rather than the `ToolManager`
  class."
- `src/core/validators.ts:5` `isToolCall` — the description took the cell's totality claim
  ("… staying total for malformed and adversarial input"), and the `@remarks` sentence the
  description now repeats ("Adversarial values return `false`.") was pruned; the remaining remark
  opens "The accepted shape is …" rather than restating "total guard".
- `src/core/helpers.ts:4` `toolToDefinition` — the description took the cell's summary preference
  and by-reference schema; the `@remarks` clauses those repeat were pruned, keeping "The full
  `description` stays on the tool for direct lookup, and the schema is never cloned …".

### The rows the guide's own prose now carries

The `add`, `execute`, and `remove` cells describe the single-value overload, because the source
side compares the single-value overload's block. The batch overloads' behaviour moved to guide prose
under the `ToolManagerInterface` table (`guides/tool.md:137`): "`add`, `execute`, and `remove`
each take one value or a readonly batch of them. A batch `add` registers every tool, later
entries winning over earlier ones with the same name; a batch `execute` answers in input order
with one result per call; a batch `remove` reports `true` only when every named tool was
present." Ancillary decision recorded: that fact went to the guide rather than to a duplicate
`@remarks` on the single-value overload, because the interface-level `@remarks` on
`ToolManagerInterface` already states the overwrite and batch-order rules for a reader of the
declaration.

### The seed runs

```text
$ npm run docs                       rows read: 1, disagreements found: 21   (exit 1, after the headers moved; every cell now reads — no `absent` on the summary side)
$ npm run docs -- --to guide         rows read: 1, disagreements found: 21, written: 20, reported: 1
                                     the one reported row is the pitch: "the README pitch is authored by hand"
$ npx oxfmt --config .oxfmtrc.json --write guides/tool.md    exit 0
```

A later `--to guide`, after the `ToolInterface.execute` and `both`-clause edits, read
`written: 1, reported: 0`.

## 4. The titled pair

Pair: the `@example Anatomy of a tool` block of `createTool` in `src/core/factories.ts:13`
against the first fence under the `## Anatomy of a tool` heading in `guides/tool.md:142`.
`createTool` is the primary factory — the first `create*` the facts block lists — and that fence
is the one demonstrating it.

Eligibility read before titling, on this tree:

```text
$ grep -n '^#\+ Anatomy of a tool' guides/tool.md          142:## Anatomy of a tool     (the only heading of that text)
$ the fence body under it                                  no ``` run, no doc-comment terminator
```

Neither other fence was needed: "The registry" (`:183`) demonstrates
`Tool` and `createToolManager`, "Calls and results" (`:218`) demonstrates `isToolCall`; each stays untitled.

The runs, in the brief's order:

```text
$ npm run docs                       rows read: 1, disagreements found: 2   (after titling: the Anatomy pair and the pitch)
$ npm run docs -- --to source        rows read: 1, disagreements found: 2, written: 1, reported: 1
                                     wrote src/core/factories.ts; the reported row is the pitch
```

`grep -rn '@example \S' src/` on the tree I leave names exactly `src/core/factories.ts:13`. Every
other `@example` block stays untitled.

## 5. The tagline, the pitch, and the displaced prose

The blockquote is one noun phrase in plain text and code spans, no link and no bold, at
`guides/tool.md:3` and `README.md:3` with the same line breaks:

```text
> The tool runtime for the `@orkestrel` line: a `Tool` binding an advertised JSON Schema
> definition to its handler, a `ToolManager` registry that advertises those definitions and
> executes calls with per-call error isolation, and the correlated `ToolCall` and `ToolResult`
> pair that travels between a caller and the registry.
```

Guide sentences displaced from the blockquote into the opening prose, none restating a tagline
clause:

- The "A tool is a callable function described by a JSON Schema …" paragraph and its "That is the
  whole idea …" sentence, now the paragraph opening the guide after the blockquote.
- "Tools stay in the map by name in insertion order." (`:16`) — added to the existing
  `Tool`-and-`ToolManager` paragraph, because "keeps tools by name in insertion order" left the tagline.
- The "**Anyone can call a tool.**" paragraph and the "**Mechanism only.**" paragraph, whole. In
  the "**Mechanism only.**" paragraph, the bare `@orkestrel/mcp` became the `@orkestrel/mcp` code
  span.
- "Source: [`src/core`](../src/core). Published through `@orkestrel/tool`." now stands as its own
  line at `:34`.
- `guides/tool.md:77` "the constructor-free way to reach both classes" became "… to reach `Tool`
  and `ToolManager`", because `both` there tallied a set the sentence did not name.

README sentences changed (`README.md:8`): the opening paragraph became the onboarding it alone
carries — "Build a tool with the `createTool` function, register it in a registry from the
`createToolManager` function, hand `definitions()` to whatever chooses the call, and pass the call
you get back to `execute`. One bad tool never takes down the run: a handler that throws comes back
as an error result correlated to its call. Nothing here is model-specific — an agent loop, an MCP
bridge, and plain application code are all callers." The old opening paragraph's definition of a
tool moved to the guide's opening prose; its closing "This package ships that shape and the
registry around it …" sentence restated the tagline and was dropped; a drafted "Part of the
`@orkestrel` line." was removed for the same reason. Every later README section — Install,
Example, the handler paragraph, the toolbox line, the guide link, Requirements, License — is
unchanged.

## 6. § Tests

`guides/tool.md:296` gains one bullet, the checks named descriptively with no SQ/MQ/EQ/RQ
identifier: the `## Surface` ↔ `src/core` bijection, the interface ↔ class method bijections,
and the equality gate — "every `Summary` cell against its declaration's description paragraph, the
titled `Anatomy of a tool` fence against the `@example` block of that title (pinned so the titled
pair cannot be retired silently), and the README pitch against this guide's tagline", plus the
flagship fences. The module-test bullets are unchanged.

## 7. Gates, over the owned paths

```text
$ npm run docs                                                     rows read: 1, disagreements found: 0        EXIT 0
$ npm run docs -- --to guide                 rows read: 1, disagreements found: 0, written: 0, reported: 0      EXIT 0
$ npm run docs -- --to source                rows read: 1, disagreements found: 0, written: 0, reported: 0      EXIT 0
$ npx oxfmt --config .oxfmtrc.json --check README.md guides/tool.md tests/guides.test.ts src/core     EXIT 0
$ npx oxlint --config .oxlintrc.json --deny-warnings README.md guides/tool.md tests/guides.test.ts src/core     EXIT 0 (no diagnostic)
$ npm run check                                                                                       EXIT 0
$ npm run test:guides                        Test Files 1 passed (1)   Tests 30 passed (30)            EXIT 0
$ npm run test:policy                        Test Files 1 passed (1)   Tests 90 passed | 1 skipped     EXIT 0
```

Observations, not criteria:

```text
$ npm run test:src:core                      Test Files 5 passed (5)   Tests 54 passed (54)            EXIT 0
$ npm run test:config                        Test Files 1 passed (1)   Tests 172 passed | 1 skipped    EXIT 0
$ npm run test:setup                         Test Files 1 passed (1)   Tests 2 passed (2)              EXIT 0
```

`test:guides` was run after the README edit; it is green, so the objective lane's M9 holds here.

## 8. Files touched

```text
$ git status --short
 M README.md
 M guides/tool.md
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts

$ git diff --stat
 README.md              |  21 ++++---
 guides/tool.md         | 148 ++++++++++++++++++++++++++++---------------------
 src/core/factories.ts  |  23 ++++++--
 src/core/helpers.ts    |  11 ++--
 src/core/types.ts      |   8 ++-
 src/core/validators.ts |   7 ++-
 tests/guides.test.ts   |  77 ++++++++++++++++++++++++-
 7 files changed, 203 insertions(+), 92 deletions(-)
```

Owned files only. `package.json`, `package-lock.json`, `guides/README.md`, `tests/setup*.ts`,
`tests/src/**`, and every vendored file are untouched. No `src/**` code outside doc blocks moved.
No lint control was planted, so the tree carries nothing to remove.

## Reader and seed defects met

None. The `0.0.18` readers located every `Summary` cell after the headers changed. Reading the
rendered tables back after each write, every `Name`, `Kind`, `Shape`, `Signature`, and `Returns`
cell carries the value it carried before, and `oxfmt --check` is clean over `guides/tool.md`.
`replaceExample` carried the titled body in on its first run. The only row either direction
refused is the pitch, which the seed reports by design:

```text
guides/tool.md pitch: readme absent tagline "…"; the README pitch is authored by hand
```

No residual disagreement needed the P16 comparator's terms to dismiss; the final reading is
`disagreements found: 0`.

## Ancillary decisions recorded

- The batch-overload facts sit in guide prose under the `ToolManagerInterface` methods table
  rather than in a duplicate `@remarks`, because the interface-level `@remarks` already carries
  them for a declaration reader.
- The `Shape` convention sentence sits at the end of the Contracts section intro (before the
  table), and the `## Methods` pointer sits after the table, matching the accepted pilot's order.
- The flagship-fences block's `files['guides/tool.md']` lookup now reads `files[GUIDE_SPEC]`, so
  the spec path has one home in the file.
- `### Classes` names the class files in its intro even though each H3 section repeats its own
  file link, matching `/home/user/fleet/guide/guides/guide.md:202-213`.
