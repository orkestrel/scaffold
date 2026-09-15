# Unit A1 (successor) — `AgentProvider`: the host-independent provider base in `@orkestrel/agent` core

This brief supersedes `tmp/units/a1-brief.md` after its first run stopped on a deviation. Apply
every section of that file exactly as written, except the sections restated here, which replace
their originals. Read that file first, then this one.

## What changed and why

The first run stopped correctly: `tmp/units/a1-report.md` shows that the original § "Shapes and
contracts" required each wire shape's `Infer` to **equal** its domain type, while the domain types
admit non-JSON values — `ToolCall.arguments: Readonly<Record<string, unknown>>`
(`node_modules/@orkestrel/tool/dist/src/core/index.d.ts:126`), `ToolDefinition.parameters`
(`:143`), and `ProviderStreamOptions.schema` (`src/core/types.ts:121`) — so a JSON-only shape can
only be narrower. The Orchestrator rules: **the wire shapes are JSON projections of the domain
types, strictly narrower by design, and the proof is assignability, not equality.** Nothing else in
the original brief changes. The `prove` MCP tool is unavailable inside this exec (its approval
policy blocks it, as the report records); use `expectTypeOf` assertions in the test files, which
the root `npm run check` typechecks.

## Shapes and contracts (replaces the original section)

Declare one `ContractShape` per wire body in `src/core/shapers.ts` with the `*Shape` form the
contract guide fixes, and compile each once with `createContract` in `src/core/contracts.ts`:

- a message shape: `id` string, `role` as `literalShape` over the `MessageRole` union, `content`
  string, optional `calls` as an array of `{ id: string, name: string, arguments: recordShape(jsonShape()) }`,
  optional `images` as an array of strings; `ToolCall.caller` is not in the shape and never
  crosses a wire — say so in the shape's TSDoc;
- a provider-request shape: `messages` (the message shape), optional `tools` as an array of
  `{ name: string, description?: string, parameters?: recordShape(jsonShape()) }`, optional
  `options` as `{ think?: boolean, schema?: recordShape(jsonShape()) }`;
- a provider-result shape: `content` string, optional `thinking` string, optional `tools` (the
  tool-call shape), optional `usage` as `{ prompt, completion, total }` numbers;
- a relay-frame shape: a `unionShape` over the four `RelayFrame` arms discriminated on `channel`.

Prove, in `tests/src/core/shapers.test.ts` with `expectTypeOf`, that each shape's `Infer` is
**assignable to** its domain type (`toMatchTypeOf` / `toExtend`, whichever the installed Vitest
exposes): `Infer<typeof messageShape>` to `Message`, the request shape to `ProviderRequest`, the
result shape to `ProviderResult`, the frame shape to `RelayFrame`. State in the shape's TSDoc that
the wire is strictly narrower than the domain type: a domain value carrying a non-JSON
`arguments`, `parameters`, or `schema` member, or a `caller`, is a valid domain value that the
wire refuses or drops.

Prove the round trip in `tests/src/core/contracts.test.ts`: `contract.is(value)` on a valid value;
`parseJSONAs(JSON.stringify(value), contract.is)` returning a deep-equal value;
`contract.explain(malformed)` naming the path of a malformed field; and the asymmetry — a message
whose `calls[0].arguments` holds a function value is refused by the compiled message contract.

Repair `isMessage` (`src/core/validators.ts`) as the **domain** guard: `role` narrows to the
`MessageRole` union and `images` elements must be strings, with a failing test first for the
arbitrary-role and non-string-image cases. `isMessage` keeps admitting a non-JSON `arguments`
record, because the domain type does; the compiled message contract is the **wire** guard. Prove
the relation between them: every fixture the wire contract accepts is accepted by `isMessage`, and
the function-valued-`arguments` fixture is accepted by `isMessage` and refused by the wire contract.

## Acceptance criteria (replaces items 3 and 5 of the original; the rest stand)

3. Every declaration in § Contract exists in `src/core/types.ts` with the stated members and is
   exported from the barrel; `AgentProvider`, `ProviderError`, `isProviderError`,
   `buildProviderResult`, `readText`, `readChunks`, the shapes, and the compiled contracts are
   exported from the barrel; each shape's `Infer` is proven assignable to its domain type by an
   `expectTypeOf` assertion that `npm run check` typechecks.
5. `isMessage` rejects `{ id: '1', role: 'other', content: '' }` and
   `{ id: '1', role: 'user', content: '', images: [1] }` and accepts a message whose
   `calls[0].arguments` holds a function value; the compiled message contract refuses that last
   fixture; red-then-green recorded for the two rejections.

## Output (replaces the original path)

Write the report to `tmp/units/a1-report-2.md` and return the same text as your final message.
Leave `tmp/units/a1-report.md` untouched; it is the record of the first run.
