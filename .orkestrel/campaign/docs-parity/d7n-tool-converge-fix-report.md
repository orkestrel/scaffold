# Report — `d7n-tool-converge-fix`

All items landed; every acceptance criterion passed. No deviation.

## Items

### 1. The examples binding (claim 15) — `tests/guides.test.ts`

The mapped `examples` ternary now sits beside `documented` at the loop's own scope.

```diff
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
 			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface).map((example) => example.name)
-							: source
-									.examples(group.interface)
-									.map((example) => example.name)
-									.concat(source.examples(entity).map((example) => example.name))
 					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

The block is byte-identical to the pilot's. Run: a Python comparison of the `for (const group of guide.methods()) {` block that opens with `const entity`, sliced from `/home/user/fleet/abort/tests/guides.test.ts` and `/home/user/fleet/tool/tests/guides.test.ts`, printed `True`. A `diff` of the two files filtered to lines carrying `examples`, `documented`, or `entity` returns only the two flagship-fence comment lines, which are each package's own prose.

### 2. The README's restatement (claim 20) — `README.md`

The onboarding paragraph now carries only what the tagline does not.

```diff
 Build a tool with the `createTool` function, register it in a registry from the
 `createToolManager` function, hand `definitions()` to whatever chooses the call, and pass the
-call you get back to `execute`. One bad tool never takes down the run: a handler that throws
-comes back as an error result correlated to its call. Nothing here is model-specific — an agent
-loop, an MCP bridge, and plain application code are all callers.
+call you get back to `execute`. Nothing here is model-specific — an agent loop, an MCP bridge,
+and plain application code are all callers.
```

The dropped sentence restated the tagline's `executes calls with per-call error isolation` and `the correlated ToolCall and ToolResult pair`. What remains is how to build, register, advertise, and call, in the shape `/home/user/fleet/timeout/README.md:7-11` takes. `Part of the @orkestrel line.` stays dropped, because the tagline names the line. The rewrap holds every line at or under the 100-column `printWidth` the `.oxfmtrc.json` file sets. The tagline itself is untouched, and `test:guides` still pairs the pitch with it.

### 3. `count` (F7) — `guides/tool.md`

```diff
 `ToolInterface` and `ToolManagerInterface` list every member they declare or inherit. The
 call-signature members of each are documented under [Methods](#methods); the readonly `count` of
-`ToolManagerInterface` is a Surface member with no method row.
+`ToolManagerInterface` reports how many tools are registered and is a Surface member with no
+method row.
```

The sentence now carries what `count` reports, in the wording the declaration's own doc comment at `src/core/types.ts:141` carries.

### 4. Descriptions restating remarks (F8, objective F4) — `src/core/**`

Each description paragraph is unchanged, so no `Summary` cell moved.

`src/core/helpers.ts`, `toolToDefinition`: the description keeps `carrying the parameter schema by reference`; the remark keeps only the consequence.

```diff
  * The projection is a fresh object carrying `name`, then `description` only when the
  * tool authored a summary or a description, then `parameters` only when the tool
  * authored a schema. The full `description` stays on the tool for direct lookup, and
- * the schema is never cloned, so the definition is never a live handle on the tool's
- * handler.
+ * the definition is never a live handle on the tool's handler.
```

`src/core/types.ts`, `ToolManagerInterface`: the description keeps `with per-call error isolation`; the remark keeps the batch fact the description does not carry.

```diff
  * results, and a call whose `id` or `name` accessor throws when read makes `execute`
- * reject instead. Batch execution preserves input order and isolates each such call.
+ * reject instead. Batch execution preserves input order.
```

`src/core/factories.ts`, `createToolManager`: the `@returns` tag is narrowed to what the factory returns.

```diff
- * @returns A registry that advertises definitions and executes calls with per-call
- * error isolation
+ * @returns A registry bound to no tools
```

The facts leaving the remarks survive in guide prose: `never cloned` at `guides/tool.md:103`, `live handle` at `:216`, the batch isolation behaviour at `:137-140`.

## Acceptance criteria

### 1. Format, lint, typecheck

`npx oxfmt --config .oxfmtrc.json --check guides/tool.md README.md src/core tests/guides.test.ts` — exit 0.

```text
All matched files use the correct format.
Finished in 973ms on 10 files using 4 threads.
```

`npx oxlint --config .oxlintrc.json --deny-warnings guides/tool.md README.md src/core tests/guides.test.ts` — exit 0, no output.

`npm run check` — exit 0.

```text
> @orkestrel/tool@0.0.14 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

### 2. Docs and the suites

`npm run docs` — exit 0.

```text
rows read: 1, disagreements found: 0
```

`npm run docs -- --to guide` — exit 0.

```text
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

`npm run docs -- --to source` — exit 0.

```text
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

`npm run test:guides` — exit 0.

```text
 Test Files  1 passed (1)
      Tests  30 passed (30)
   Duration  772ms (transform 191ms, setup 44ms, import 373ms, tests 94ms, environment 0ms)
```

`npm run test:policy` — exit 0.

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.18s (transform 530ms, setup 31ms, import 540ms, tests 380ms, environment 0ms)
```

`npm run test:src:core` — exit 0.

```text
 Test Files  5 passed (5)
      Tests  54 passed (54)
   Duration  1.15s (transform 571ms, setup 95ms, import 837ms, tests 128ms, environment 1ms)
```

A baseline `npm run docs` before any edit also read `rows read: 1, disagreements found: 0`, so the run never left zero.

### 3. Status

`git status --short` — owned files only.

```text
 M README.md
 M guides/tool.md
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

`git diff --stat`:

```text
 README.md             |  5 ++---
 guides/tool.md        |  3 ++-
 src/core/factories.ts |  3 +--
 src/core/helpers.ts   |  3 +--
 src/core/types.ts     |  2 +-
 tests/guides.test.ts  | 14 +++++++-------
 6 files changed, 14 insertions(+), 16 deletions(-)
```

## Observations

- `test:guides` reports `Tests 30 passed (30)` where the slice 4a audit quoted `27 passed (27)`. The added cases are the flagship-fence cases already in the tree at this unit's baseline; this unit added no case.
- The pin the file carries is the guard-plus-membership loop at `tests/guides.test.ts:82-86`: a `continue` on `fence.title === undefined`, a `headings.push`, and a `titled.has(fence.title)` membership test feeding `paired`. This unit did not touch it.

## Deviation

None. No correction needed a file outside the owned set, and `docs` never left zero.
