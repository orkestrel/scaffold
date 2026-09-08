# Report — `d7n-toolbox-converge-fix` (toolbox's fix round on the audit's findings)

Wall clock: 2026-09-08T02:19:47Z (first instrument on disk) to 2026-09-08T02:31Z. Baseline `d4c724d`,
clean on arrival. Instruments in `tmp/d7n-toolbox-converge-fix/`: `render-shapes.mjs` (the Ruling 25
cell renderer), `probe-types.mjs` (the checker's declared type per shape value), `shape-cells.tsv`
(the rendered cells), `t6-comments.py` (the `//` comment rewrites).

## Item 1 — the lowercase `note` (T1)

`guides/toolbox.md` Contract invariant 7, at `:314` after the round's inserts:

```diff
-neither given constructs a manager over `@orkestrel/workspace`'s in-memory default. note the deliberate `store` divergence from invariant 6: the workspace tool's `store` only backs
+neither given constructs a manager over `@orkestrel/workspace`'s in-memory default. The `store` slot deliberately diverges from invariant 6: the workspace tool's `store` only backs
```

The fence comments, at `:950` and `:987`:

```diff
-// note: `valid` is a strict guard verdict (`.is`), not a normalizing parse — the opposite of
+// Note: `valid` is a strict guard verdict (`.is`), not a normalizing parse — the opposite of
-// note: by default `args` is parsed and validated against the advertised schema before the
+// Note: by default `args` is parsed and validated against the advertised schema before the
```

`grep -rn 'note: ' src/` printed nothing, so no `@example` block carried a twin of either comment.

## Item 2 — the tallies (T2)

Both sentences are guide prose, not compared cells, so neither needed `--to guide`.

`guides/toolbox.md:79`, the `### Helpers` lead:

```diff
-… — the lenient-authoring synthesis path and the ancestry tags shared by both delegating tools.
+… — the lenient-authoring synthesis path and the ancestry tags `createAgentTool` and `createAgentFunction` share.
```

The named pair is the one the code carries: `tagAgent` is called in `createAgentFunction`
(`src/core/factories.ts:250`) and in `createAgentTool` (`:756`).

`guides/toolbox.md:346`, Contract invariant 23:

```diff
-… Both factories' inferred schemas surface sample-derived strings verbatim (property names, and enum entries when opted in), …
+… `createEndpointTool`'s and `createInferTool`'s inferred schemas surface sample-derived strings verbatim (property names, and enum entries when opted in), …
```

## Item 3 — the heading (T3)

```diff
-### Lifecycle classes
+### Resolvers
```

`grep -rn 'Lifecycle classes' guides/README.md README.md tests/ src/` printed nothing before the
rename, so no link or sentence named the old heading. The section's own prose names
`DatabaseResolver`, not the heading, and is unchanged.

## Item 4 — the `### Shapes` table (T4, Rulings 18 and 25)

The section now heads `Shape` under the constants sentence, placed between the section's prose and
the table:

```diff
 The shape values each `create*Tool` factory (and `createWorkflowDraftContract`) compiles into the lockstep guard / parser / JSON Schema outputs … the source of truth.
 
+A `Shape` cell holds the constant's declared type.
+
-| API                    | Kind  | Summary  |
+| API                    | Kind  | Shape    | Summary  |
```

Every cell in declaration order, as `render-shapes.mjs` emitted it and the guide now carries it:

```text
agentToolShape         ObjectShape<{ task, provider?, tools?, system? }>
taskDraftShape         ObjectShape<{ id?, name?, description?, behavior?, retries?, timeout? }>
phaseDraftShape        ObjectShape<{ id?, name?, description?, tasks, concurrency?, bail? }>
workflowDraftShape     ObjectShape<{ id?, name?, description?, phases, bail? }>
stepShape              ObjectShape<{ name }>
workflowStepsShape     ObjectShape<{ name?, steps }>
workspaceToolShape     UnionShape<[{ operation: 'read', path }, { operation: 'list' }, { operation: 'has', path }, { operation: 'search', query, regex?, sensitive?, limit? }, { operation: 'replace', query, replacement, regex?, sensitive?, limit? }, { operation: 'write', path, content }, { operation: 'splice', path, content, fromLine, fromColumn, toLine, toColumn }, { operation: 'prepend', path, content }, { operation: 'append', path, content }, { operation: 'move', from, to }, { operation: 'remove', path }, { operation: 'workspaces' }, { operation: 'switch', id }]>
describeToolShape      ObjectShape<{ name }>
promptToolShape        ObjectShape<{ to, schema }>
answerToolShape        UnionShape<[{ operation: 'pending' }, { operation: 'answer', id, values }]>
databaseToolShape      UnionShape<[{ operation: 'create', id, tables, driver?, primary?, indexes?, version? }, { operation: 'tables', id }, { operation: 'get', id, table, key }, { operation: 'records', id, table, query? }, { operation: 'count', id, table, query? }, { operation: 'aggregate', id, table, function, column, query? }, { operation: 'add', id, table, row }, { operation: 'set', id, table, row }, { operation: 'update', id, table, key, changes }, { operation: 'remove', id, table, key }, { operation: 'destroy', id }]>
columnPrimitiveShape   LiteralShape<'string' \| 'integer' \| 'number' \| 'boolean'>
columnSpecShape        UnionShape<[columnPrimitiveShape, { primitive, optional? }]>
tableSpecShape         ObjectShape<Record<never, never>, ObjectShape<{ columns }>>
keyShape               UnionShape<[ArrayShape<UnionShape<[StringShape, NumberShape]>>, StringShape, NumberShape]>
rowShape               ObjectShape<Record<never, never>, JSONShape>
rowsShape              UnionShape<[ArrayShape<rowShape>, rowShape]>
conditionShape         ObjectShape<{ column, operator, values, connector? }>
orderShape             ObjectShape<{ column, direction }>
queryShape             ObjectShape<{ conditions?, order?, limit?, offset? }>
relationToolShape      UnionShape<[{ operation: 'load', manager?, model, key, include? }, { operation: 'find', manager?, model, include?, limit?, offset?, sort?, direction? }, { operation: 'link', manager?, model, key, relation, target }, { operation: 'unlink', manager?, model, key, relation, target }, { operation: 'links', manager?, model, key, relation }]>
singleKeyShape         UnionShape<[StringShape, NumberShape]>
includeShape           OptionalShape<ArrayShape<StringShape>>
managerShape           OptionalShape<StringShape>
inferToolShape         ObjectShape<{ samples, format?, enum?, candidates? }>
```

No `API`, `Kind`, or `Summary` cell moved: every replaced row differs from its predecessor only by
the inserted third field.

### The form chosen per shape kind, and where each generic name comes from

The outer generic names are read from
`node_modules/@orkestrel/contract/dist/src/core/index.d.ts`:

```text
155  arrayShape<S extends ContractShape>(items, options?): ArrayShape<S>
230  booleanShape(options?): BooleanShape
2010 integerShape(options?): NumberShape
3546 jsonShape(options?): JSONShape
3689 literalShape<const T extends readonly LiteralValue[]>(values, options?): LiteralShape<Readonly<T>>
4056 numberShape(options?): NumberShape
4142 objectShape<P, const A extends boolean | ContractShape = false>(properties, options?): ObjectShape<P, A>
4272 optionalShape<S extends ContractShape>(inner): OptionalShape<S>
5214 recordShape<S extends ContractShape>(values, options?): ObjectShape<Record<never, never>, S>
6031 stringShape(options?): StringShape
6215 unionShape<V extends readonly ContractShape[]>(...variants): UnionShape<Readonly<V>>
```

`probe-types.mjs` then read the checker's own `typeToString` for each export and every outer generic
head matched the rendered cell — `ObjectShape<…>`, `UnionShape<readonly […]>`, `LiteralShape<readonly
[…]>`, `ObjectShape<Record<never, never>, …>`, `OptionalShape<…>`.

- `objectShape(...)` holds `ObjectShape<{ members }>`, the property record in bare-member form, in
  declaration order, `?` on an optional property. Ruling 25's stated form.
- `stringShape()`, `numberShape()`, `integerShape()`, `booleanShape()`, `jsonShape()` hold
  `StringShape`, `NumberShape`, `NumberShape`, `BooleanShape`, `JSONShape`.
- `literalShape([...])` holds `LiteralShape<'a' \| 'b'>` with the literals, arms escaped as `\|`.
  Ruling 25's stated form.
- `arrayShape(x)` holds `ArrayShape<X>`; `optionalShape(x)` holds `OptionalShape<X>`.
- `recordShape(x)` holds `ObjectShape<Record<never, never>, X>`, the declared type the `recordShape`
  signature returns rather than a rewritten one.
- `unionShape(...)` holds `UnionShape<[Member, Member]>`. **Decisions I took on the arm form,** which
  the brief left to me:
  - An arm that is a reference to another exported shape value is named by that value
    (`UnionShape<[columnPrimitiveShape, …]>`, `UnionShape<[ArrayShape<rowShape>, rowShape]>`). The
    named row spells the arm, which is Ruling 12's reason for keeping a member's type out of a cell.
  - An arm that is an inline object shape holds its bare-member record.
  - Any other inline arm holds its declared type (`StringShape`, `ArrayShape<StringShape>`).
  - **A discriminant property inside an arm spells its literal** (`{ operation: 'read', path }`),
    every other property staying bare. The trigger is a property whose shape is a single-value
    `literalShape`. Without it `workspaceToolShape`'s `'read'`, `'has'`, and `'remove'` arms all
    read `{ operation, path }` and a reader cannot tell them apart. It also matches the converged fleet form already in this guide:
    the `WorkspaceOperation` row at `:208` spells each arm's `operation` literal and leaves the rest
    bare, and the rendered `workspaceToolShape` cell now names the same arms in the same order.

Optionality is read from the checker, not from the syntax, because `relationToolShape`'s arms reach
`manager` and `include` through the named `managerShape` and `includeShape` values; a purely
syntactic pass renders those bare and is wrong.

## Item 5 — `createTerminalRoutes`'s `Shape` cell and the mixed table's sentences (T5, Rulings 20, 21, and 26)

The signature is read from `src/server/factories.ts:31-34`:

```ts
export function createTerminalRoutes(
	manager: TerminalManagerInterface,
	options?: TerminalRoutesOptions,
): readonly TerminalRoute[] {
```

```diff
-| `createTerminalRoutes`  | function  |                                                                          | Builds the GET SSE stream and POST answer routes …
+| `createTerminalRoutes`  | function  | `(manager: TerminalManagerInterface, options?: TerminalRoutesOptions) => readonly TerminalRoute[]` | Builds the GET SSE stream and POST answer routes …
```

The `### Server routes` convention text:

```diff
-… escaped as `\|`. In a constants row a `Shape` cell holds the constant's declared type.
+… escaped as `\|`. A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to. A `Shape` cell holds the constant's declared type.
```

## Item 6 — the section comments (T6)

Every `//` comment the brief names lowered its all-caps emphasis with the sentence's contrast intact,
dropped its counts, and converted a prose `+` standing for `and`. The hunks:

`src/core/types.ts`

```diff
-// the SOURCE OF TRUTH and the implementation conforms to them, never the reverse. The
+// the source of truth and the implementation conforms to them, never the reverse. The
-// WorkflowToolResult, and adapter options are OWNED here and consume the current
+// WorkflowToolResult, and adapter options are owned here and consume the current
-// === Draft family (the workflow tool's LENIENT authoring surface — id/name optional)
+// === Draft family (the workflow tool's lenient authoring surface — id/name optional)
-// A DRAFT mirrors the `WorkflowDefinition` family (`@orkestrel/workflow`) EXACTLY except `id`
-// and `name` are OPTIONAL at all three levels, so a small model can omit the six identity
-// strings. It is NOT a runtime form — `createWorkflowDraftContract` validates it (a provided
-// id/name still has `minLength: 1`, so an explicitly-empty `id: ''` is REJECTED, not "absent"),
-// and `completeDraft` synthesizes any MISSING id positionally + defaults a missing name to its
-// id, yielding a strict `WorkflowDefinition` that is THEN re-validated against the strict
-// contract before running (soundness preserved). `behavior` stays optional (a plain name string),
-// mirroring the definition family.
+// A draft mirrors the `WorkflowDefinition` family (`@orkestrel/workflow`) exactly except `id`
+// and `name` are optional at the workflow, phase, and task levels, so a small model can omit
+// every identity string. It is not a runtime form — `createWorkflowDraftContract` validates it
+// (a provided id/name still has `minLength: 1`, so an explicitly-empty `id: ''` is rejected,
+// not "absent"), and `completeDraft` synthesizes any missing id positionally and defaults a
+// missing name to its id, yielding a strict `WorkflowDefinition` that is then re-validated
+// against the strict contract before running (soundness preserved). `behavior` stays optional (a
+// plain name string), mirroring the definition family.
```

The `at all three levels` count takes the member names the `workflowDraftShape` summary already uses,
and `the six identity strings` becomes `every identity string`.

`src/core/helpers.ts`

```diff
-// === Draft completion + flat-steps expansion (the tool's LENIENT authoring surfaces)
+// === Draft completion and flat-steps expansion (the tool's lenient authoring surfaces)
-// Pure, deterministic synthesis that turns a WIDENED authoring form into a strict
-// `WorkflowDefinition` (`@orkestrel/workflow`). They auto-fill only OMITTED identity (a provided
-// id/name is preserved verbatim; an explicitly-empty `id: ''` is rejected UPSTREAM by the draft
-// contract, never reached here), so a small model can author a complete tree without emitting
-// the six required `id`/`name` strings. The factory re-validates the result against the STRICT
+// Pure, deterministic synthesis that turns a widened authoring form into a strict
+// `WorkflowDefinition` (`@orkestrel/workflow`). They auto-fill only omitted identity (a provided
+// id/name is preserved verbatim; an explicitly-empty `id: ''` is rejected upstream by the draft
+// contract, never reached here), so a small model can author a complete tree without emitting an
+// `id` or a `name` anywhere in it. The factory re-validates the result against the strict
```

`src/core/shapers.ts`

```diff
-// Toolbox shapes — the shape VALUE each `create*Tool` factory (factories.ts) compiles into
-// the lockstep guard + parser + JSON Schema outputs. `agentToolShape` MUST agree
+// Toolbox shapes — the shape value each `create*Tool` factory (factories.ts) compiles into
+// the lockstep guard, parser, and JSON Schema outputs. `agentToolShape` must agree
```

`src/core/factories.ts`

```diff
-			// Branch on the owned args snapshot's SHAPE (no ambient context — a tool handler gets only
-			// `args`): empty ⇒ the wrapped definition; a `steps` array ⇒ the FLAT form, parsed +
-			// expanded; otherwise the nested DRAFT form, parsed + completed. A parse failure leaves
-			// `target` undefined ⇒ the strict gate below throws `TOOL`.
+			// Branch on the owned args snapshot's shape (no ambient context — a tool handler gets only
+			// `args`): empty ⇒ the wrapped definition; a `steps` array ⇒ the flat form, parsed and
+			// expanded; otherwise the nested draft form, parsed and completed. A parse failure leaves
+			// `target` undefined ⇒ the strict gate that follows throws `TOOL`.
-			// The SOUNDNESS gate: whatever authoring form produced `target`, it must satisfy the
-			// STRICT canonical contract before it runs — the leniency never reaches the runner.
+			// The soundness gate: whatever authoring form produced `target`, it must satisfy the
+			// strict canonical contract before it runs — the leniency never reaches the runner.
-			// Registry ops act on the MANAGER, not a workspace — handle them first.
+			// Registry ops act on the manager, not a workspace — handle them first.
-			// Edit / read ops target the ACTIVE workspace. A WRITING op auto-creates and activates a
-			// default workspace when none is active (the no-active ergonomic seam) — while a pure-READ
+			// Edit and read ops target the active workspace. A writing op auto-creates and activates a
+			// default workspace when none is active (the no-active ergonomic seam) — while a pure-read
-	// The definition is stored as ONE OPAQUE JSON column (`rawShape`), so the row infers FLAT —
+	// The definition is stored as one opaque JSON column (`rawShape`), so the row infers flat —
```

The `below` pointer sat on a line already being rewritten and `.claude/rules/writing.md` § Code
tokens, references, and links bans it, so it became `that follows`.

`src/core/errors.ts`

```diff
-// malformed-call and resolution guards, so this package mints ONE typed error, `ToolboxError`,
-// mirroring `WorkflowError`'s exact shape (`code` + optional `context`) for the same reason: a
-// thrown, machine-readable, code-bearing error after AGENTS' “narrow untrusted input with guards”
-// boundary rejects a call, never a `{ error }` return. `ToolboxError` is this package's general
-// TOOL-CALL error — not scoped to agent delegation alone — so every package-owned `TOOL` misuse
-// shares it rather than minting one error class per tool.
+// malformed-call and resolution guards, so this package mints one typed error, `ToolboxError`,
+// mirroring `WorkflowError`'s exact shape (`code` and an optional `context`) for the same reason:
+// a thrown, machine-readable, code-bearing error after AGENTS' “narrow untrusted input with
+// guards” boundary rejects a call, never a `{ error }` return. `ToolboxError` is this package's
+// general tool-call error — not scoped to agent delegation alone — so every package-owned `TOOL`
+// misuse shares it rather than minting one error class per tool.
```

### The residual emphasis the ruling grep found, and the decision on it

The sweep the item mandates found all-caps emphasis in further `//` section comments the brief did
not name — `src/core/types.ts` and `src/server/types.ts`. Both are `//` comments under `src/**`,
which the Scope grants, and both carry the same defect the item exists to close, so I closed them
rather than leaving the ruling grep reporting a defect this round owns. `src/server/types.ts` also
carried a count on the line being rewritten, so it names its members.

```diff
-// Server-package types — the structural route contract this barrel returns, kept LOCAL (never
-// imports `@orkestrel/router`) so a consumer mounts the two returned routes against ANY router
-// that accepts this shape; these types are the source of truth.
+// Server-package types — the structural route contract this barrel returns, kept local (never
+// imports `@orkestrel/router`) so a consumer mounts the returned GET and POST routes against any
+// router that accepts this shape; these types are the source of truth.
-// === Flat-steps family (the workflow tool's ADVERTISED authoring surface — the simplest form)
+// === Flat-steps family (the workflow tool's advertised authoring surface — the simplest form)
-// `createInferTool` and `createEndpointTool` bridge an EXISTING API/DB surface into an
+// `createInferTool` and `createEndpointTool` bridge an existing API/DB surface into an
-// `createInferTool` is a STANDALONE utility tool a model calls directly to learn a JSON Schema
-// from example values; `createEndpointTool` wraps one CONCRETE endpoint (`EndpointDefinition`) —
-// its `parameters` are inferred ONCE at construction from `samples` and advertised to steer the
-// model, and by DEFAULT the tool's `execute` ENFORCES that same advertised schema against the
+// `createInferTool` is a standalone utility tool a model calls directly to learn a JSON Schema
+// from example values; `createEndpointTool` wraps one concrete endpoint (`EndpointDefinition`) —
+// its `parameters` are inferred once at construction from `samples` and advertised to steer the
+// model, and by default the tool's `execute` enforces that same advertised schema against the
```

### The ruled sweep

Pattern `\b[A-Z]{3,}\b`. Paths `src`, `guides/toolbox.md`, `README.md`.

```text
grep -rnE '\b[A-Z]{3,}\b' src guides/toolbox.md README.md
```

`guides/toolbox.md` and `README.md` carry no emphasis hit. Their whole token set, taken with
`grep -rnoE '\b[A-Z]{3,}\b' guides/toolbox.md README.md | awk -F: '{print $3}' | sort -u`:

```text
ABANDONED AGENTS ANSWER API DATABASE DEADLOCK DELETE DEPTH DSL ESM EXPIRE GET HEAD HTTP JSON JWT
LICENSE LLM MCP MIT OPTIONS PATCH POST PUT README RELATION SSE TARGET TOOL TRANSITION URL
```

Ruled by category:

- **Acronyms.** `API`, `DSL`, `ESM`, `HTTP`, `JSON`, `JWT`, `LLM`, `MCP`, `SSE`, `TTL`, `URL`.
- **HTTP vocabulary.** `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`. `OPTIONS` also
  appears as a code literal inside `TerminalRouteMethod`'s union.
- **Error codes.** This package's own `TOOL`, `DEPTH`, `DEADLOCK`, `EXPIRE`, `ANSWER`, `DATABASE`,
  `RELATION`; `@orkestrel/form`'s `ABANDONED`; `@orkestrel/terminal`'s `TARGET`, `LIMIT`, `CANCEL`,
  `DRIVER`, `DESTROYED`, `TRANSITION`; `@orkestrel/workspace`'s `MISSING`, `MODALITY`, `PATTERN`,
  `RANGE`.
- **Filenames and licence identifiers.** `AGENTS` (the `AGENTS.md` file), `README`, `LICENSE`, `MIT`.
- **Code literals in data strings.** `WHERE` at `src/core/shapers.ts:485` is the SQL keyword inside an
  advertised field `description`.

The whole remainder, after the sweep, is emphasis inside model-facing string literals — the prompt
text each tool advertises to a small model. The Scope forbids a code token move, and a string literal
is a code token, so none was touched:

```text
src/core/shapers.ts:156:CONCURRENTLY      src/core/constants.ts:380:ONE
src/core/shapers.ts:191:SEQUENTIALLY      src/core/constants.ts:395:SERIALIZED
src/core/constants.ts:49:ONE              src/core/constants.ts:395:ALWAYS
src/core/constants.ts:152:SIMPLEST        src/core/constants.ts:472:ONE
src/core/constants.ts:154:REGISTERED      src/core/constants.ts:481:FLAT
src/core/constants.ts:154:NOT             src/core/constants.ts:534:STRICT
src/core/constants.ts:160:ADVANCED        src/core/constants.ts:535:NOT
src/core/constants.ts:210:ONE             src/core/constants.ts:536:SAME
src/core/constants.ts:211:ACTIVE          src/core/constants.ts:537:NORMALIZES
src/core/constants.ts:283:BLOCK           src/core/constants.ts:336:ONE
                                          src/core/constants.ts:539:EMPTY
```

## Item 7 — the test infrastructure openers (T7)

```diff
-/** Records one `generate` / `stream` call made on a {@link ScriptedProvider}. */
+/** Represents one recorded `generate` or `stream` call on a {@link ScriptedProvider}. */
-/**
- * Exposes a scripted {@link ProviderInterface} plus its `started` call count and recorded
- * `calls`, the minimal shape a {@link ScriptedProvider} fixture exposes.
- */
+/**
+ * Represents the minimal shape a {@link ScriptedProvider} fixture exposes — a scripted
+ * {@link ProviderInterface} plus its `started` call count and recorded `calls`.
+ */
```

## Item 8 — propagation

```text
npx oxfmt --config .oxfmtrc.json --write guides/toolbox.md README.md tests/setup.ts tests/guides.test.ts src/core/types.ts src/core/helpers.ts src/core/shapers.ts src/core/errors.ts src/core/factories.ts
  → Finished in 738ms on 9 files using 4 threads                                                exit 0
npx oxfmt --config .oxfmtrc.json --write src/server/types.ts src/core/types.ts                  exit 0

PATH=/opt/npm11/bin:$PATH npm run docs
  → rows read: 1, disagreements found: 0                                                        exit 0
PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
  → rows read: 1, disagreements found: 0, written: 0, reported: 0                               exit 0
PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
  → rows read: 1, disagreements found: 0, written: 0, reported: 0                               exit 0
```

## Acceptance criteria

### 1. Owned files only, and no code token moved

```text
git status --short
 M guides/toolbox.md
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/shapers.ts
 M src/core/types.ts
 M src/server/types.ts
 M tests/setup.ts

git diff -U0 -- src tests/setup.ts | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'
  → no output                                                                                   exit 1
```

`README.md` and `tests/guides.test.ts` are owned and needed no edit. Instruments live in
`tmp/d7n-toolbox-converge-fix/`, which the tree ignores.

`git diff --stat`:

```text
 guides/toolbox.md     | 90 ++++++++++++++++++++++++++-------------------------
 src/core/errors.ts    | 12 +++----
 src/core/factories.ts | 20 ++++++------
 src/core/helpers.ts   | 12 +++----
 src/core/shapers.ts   |  4 +--
 src/core/types.ts     | 34 +++++++++----------
 src/server/types.ts   |  6 ++--
 tests/setup.ts        |  6 ++--
 8 files changed, 93 insertions(+), 91 deletions(-)
```

`git diff -U0 -- guides/toolbox.md | grep -E '^@@'` names every hunk, and each is an item's site:

```text
@@ -47 +47 @@      item 3, the heading
@@ -79 +79 @@      item 2, the `### Helpers` lead
@@ -117,27 +117,29 @@  item 4, the `### Shapes` table
@@ -234 +236 @@    item 5, the `### Server routes` convention text
@@ -236,10 +238,10 @@  item 5, the table
@@ -312 +314 @@    item 1, Contract invariant 7
@@ -344 +346 @@    item 2, Contract invariant 23
@@ -948 +950 @@    item 1, the infer fence comment
@@ -985 +987 @@    item 1, the endpoint fence comment
```

### 2. Format, lint, typecheck

```text
npx oxfmt --config .oxfmtrc.json --check guides/toolbox.md README.md tests/guides.test.ts tests/setup.ts src
  → All matched files use the correct format.
  → Finished in 760ms on 22 files using 4 threads                                               exit 0

npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts tests/setup.ts src
  → no output                                                                                   exit 0

PATH=/opt/npm11/bin:$PATH npm run check
  → tsc --noEmit --project tsconfig.json, check:src:core, check:src:server; no diagnostics       exit 0
```

### 3. The seed at zero

Recorded under Item 8: `npm run docs` at `rows read: 1, disagreements found: 0`, and both write
directions at `written: 0`.

### 4. The greps

```text
grep -n '. note ' guides/toolbox.md                                     → no output   exit 1
grep -n '// note:' guides/toolbox.md                                    → no output   exit 1
grep -nE '\bboth delegating tools\b|^Both factories' guides/toolbox.md  → no output   exit 1
grep -c '^### Resolvers' guides/toolbox.md                              → 1
grep -c 'Lifecycle classes' guides/toolbox.md                           → 0
grep -c "A `Shape` cell holds the constant's declared type." guides/toolbox.md  → 3
grep -c 'In a constants row' guides/toolbox.md                          → 0
grep -c "A function row's `Shape` cell holds its signature" guides/toolbox.md   → 1
grep -nE '^\| `[^`]+` +\| (function|const) +\| +\| ' guides/toolbox.md  → no output   exit 1
grep -nE 'the six (required|identity)' src/core/types.ts src/core/helpers.ts    → no output   exit 1
grep -n '^ \* Records one\|^ \* Exposes' tests/setup.ts                 → no output   exit 1
```

The constants sentence sits on `### Shapes`, `### Constants`, and `### Server routes`; the
function-row sentence sits on `### Server routes` alone.

### 5. Tests

```text
PATH=/opt/npm11/bin:$PATH npm run test:guides
  → Test Files  1 passed (1); Tests  31 passed (31); Duration 931ms                             exit 0
npm run test:policy
  → Test Files  1 passed (1); Tests  90 passed | 1 skipped (91); Duration 629ms                 exit 0
npm run test:setup
  → Test Files  2 passed (2); Tests  17 passed (17); Duration 388ms                             exit 0
```

Observation, not a criterion:

```text
PATH=/opt/npm11/bin:$PATH npm run test:src:core
  → Test Files  9 passed (9); Tests  420 passed (420); Duration 1.73s                           exit 0
```

## Decisions I took and recorded

- **The union arm form, the named-arm form, and the discriminant literal**, under Item 4. The brief
  left the union and literal cell forms to me.
- **`recordShape`'s cell** holds `ObjectShape<Record<never, never>, X>`, the declared type its
  signature returns. The alternative was a rewritten record form, which no reading of "its declared
  type" supports.
- **Optionality is read from the checker**, so an arm reaching an optional member through a named
  shape value (`relationToolShape`'s `manager`, `include`) still renders `?`.
- **A prose `+` standing for `and` on a line already being rewritten became `and`.** The converge
  round applied that rule to every prose surface it swept and left `//` section comments unswept.
  Arithmetic inside a code span was not touched.
- **A `below` pointer on a rewritten line became `that follows`**, at `src/core/factories.ts:489`.
- **The residual emphasis in the unnamed `//` section comments was closed**, under Item 6.
- **Emphasis inside model-facing string literals stayed.** It is data the tools advertise, and the
  Scope bars a code token move.

## Deviation state

None. No gate outside the owned files went red, every `Shape` cell was expressible in Ruling 25's
form, and no residual disagreement survived — `--to guide` had nothing to clear because the round
touched no compared cell.

## Observations for the Orchestrator, outside this round's scope

- `//` section comments under `src/**` were never swept for the substitution table's judged rows. A
  temporal or `currently`-sense hit remains at `src/core/shapers.ts:61` ("the editing primitives now
  owned by `@orkestrel/workspace`") and `src/core/types.ts:28` ("consume the current
  `@orkestrel/workflow` contracts"). `policy/no-banned-term` leaves those rows unmatched by design,
  so no gate reports them.
- `guides/toolbox.md:244`, the `TerminalRoutesOptions` summary, reads "the shared route,
  authorization, keepalive, timer, and body-limit configuration both routes read". The members are
  named in the section prose rather than in the cell, which is a compared cell and so would move the
  doc block.
- `tests/setup.ts:161-167` carries all-caps emphasis in a `//` section comment. The Scope grants that
  file's doc blocks only.
