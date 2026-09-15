# Unit U4 — `@orkestrel/mcp` browser face: `createPageServer`, the WebMCP bridge `createModelContext`, the IDL-faithful double, and the parity matrix

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs.

## Objective

Make a web page a native MCP server and a WebMCP tool provider with the packages' own parts: a
`createPageServer` factory that hosts an `MCPServer` in the calling page and hands back its
connected client; a feature-detected `createModelContext` bridge that publishes a
`ToolManagerInterface`'s tools to `document.modelContext` and adopts registered tools as
`@orkestrel/tool` `Tool` instances; an IDL-faithful test double of the WebMCP surface; Playwright
proofs in real Chromium; and the guide's `## WebMCP parity` matrix with the shipping-status row.

## Context

**Evidence.**

- Rulings R7, R9, R10, R12 and exit criteria X6, X9, X10, X11, X13 in
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md`. The two design lanes:
  `D1-design-planner.md` § 3 (the shapes and the wrapper-test argument) and
  `D1b-design-astra.md` § Constraints 3 and § 6 (the honesty constraints: absence returns
  `undefined`; the bridge borrows and never disconnects; refresh and destruction serialize; no
  polyfill; feature absence never becomes a passing integration claim).
- The WebMCP surface, verbatim WebIDL and samples:
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/G5c-webmcp-idl.md` § 1–2 (global
  `document.modelContext`; `registerTool(tool, { exposedTo?, signal? })` → `Promise<undefined>`;
  `getTools({ fromOrigins? })` → `Promise<sequence<RegisteredTool>>`; `executeTool(tool,
  inputObject?, { signal? })` → `Promise<DOMString>` in the IDL while the README sample returns `{
  content: [...] }` — a recorded contradiction; `ontoolchange`/`toolchange`; `ModelContextTool {
  name, title?, description, inputSchema?, execute, annotations? }`; `ToolAnnotations {
  readOnlyHint, untrustedContentHint, consequentialHint }`; `RegisteredTool { name, title?,
  description, inputSchema?, window, origin, annotations? }`; `ToolExecuteCallback(inputObject, {
  signal })` → `Promise<any>`). Status (§ 7, chromestatus JSON, 2026-08-12): `Proposed`, `flag:
  false`, `origintrial: false`. Research context: `G5-webmcp-distillate.md`.
- The browser face today, read by the Orchestrator 2026-09-15 (`src/browser/factories.ts`,
  `src/browser/types.ts`): `createMessagePortTransport({ port })`; `createScopeServer(options,
  scope = globalThis)` builds `createMCPServer({ tools, identity })`, binds the scope transport,
  and binds a `MessagePortTransport` for every port-bearing message that `options.accept(event)`
  admits; `ScopeServerInterface { stop() }`; `ScopeServerOptions { tools; name?; version?; accept? }`.
  The in-page pair is proven in `tests/src/browser/factories.test.ts:459-482` (`connect →
  tools/list → tools/call(add)` over a real `MessageChannel`, with `bindServer`,
  `createDuplexClientTransport`, `createMCPClient`, `bindClient`). `MessagePortTransport`'s own
  doc warns not to interleave an `await` between construction and binding
  (`src/browser/transports/MessagePortTransport.ts:26-29`).
- The tool contract landed by U1 and adopted by U3 (installed under `node_modules/@orkestrel/tool`
  as the U1 tarball; report at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/
  U1-tool-contract-report.md`): `ToolContext { signal; caller? }`, `ToolDefinition { name; title?;
  description?; parameters?; annotations?: { pure?; untrusted?; consequential? } }`,
  `ToolInterface.execute(args, context)`, `ToolManagerInterface.execute(call | calls, context?)`.
  Read the installed declaration first.
- U3's landed core (chain U3 → U3c; report at `.orkestrel/campaign/U3-mcp-core-report.md`, diff at
  `A3-diff.patch.txt`; the Orchestrator's gates all exit 0, `U3c-mcp-gates-orchestrator.log.txt`):
  the client's wrapped tool is built with the bound-method form `execute: this.#execute.bind(this,
  name)` and forwards `context.signal` into `call(name, args, { signal })`; it carries `title` and
  the inverse-projected annotations (`readOnlyHint → pure`, `destructiveHint → consequential`); the
  server's default execution passes `{ signal, caller }` as the `ToolContext` and a custom
  `execution` handler receives `caller` in `MCPExecutionContext`; `tools/list` advertises `title`
  and the mapped hints from each definition; the wire annotation shape is this package's own
  declared wire type with a validator; `guides/mcp.md` documents cancellation, the metadata loss
  (`summary`), and an executed explicit-refresh example. Test titles to reuse as patterns:
  `forwards a wrapped tool context signal to the server and preserves the connection after abort`,
  `carries title and inverse-projected annotations while advertising the authored summary`,
  `refreshes a mixed registry by adding and replacing remote tools, refusing collisions, and
  retaining failed snapshots`. Read the landed `src/core/types.ts`, `src/core/helpers.ts`
  (projection helpers), and `src/core/MCPClient.ts` before designing the bridge's projection: reuse
  the exported projection helpers for the MCP direction and add the WebMCP direction beside them.
- Vitest projects (`vite.config.ts`): `src:browser` is Playwright Chromium headless over
  `tests/src/browser/**` with `tests/setupBrowser.ts`; `src:core` and the rest are Node.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; scaffold's
`.claude/rules/{names,typescript,architecture,patterns,tests,workspace,documentation,browser,writing,quality}.md`;
skill `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-harden-package/SKILL.md`
(capability lane) with `references/centralization.md` and `references/hardening.md`; guide
`guides/mcp.md`; the tool guide (post-U1) `guides/tool.md` in this checkout (refreshed by U3).

**Host.** Windows 11, Git Bash. `npm run <script>` works in your Bash tool. Playwright Chromium is
installed for this checkout (the `src:browser` project runs today). No network is needed. Do not
run tree-wide `format`, `lint --fix`, or `build`; scoped `npx oxfmt --config .oxfmtrc.json --write
<owned files>` is permitted.

**Measurements.** Before editing, run `npm run check` and `npm run test:src:browser` and record
both readings (expected green after U3).

**Control identifiers.** R7, R9, R10, R12, X6, X9, X10, X11, X13; name tests for what they prove.

**Standing conditions.** `node_modules/@orkestrel/tool` is the U1 tarball installed `--no-save`;
the declared range stays `^0.0.14` until landing. `tmp/` is git-ignored. Do not bump `version`.
Add no package. Do not edit any file `scaffold repair` restores (`tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `configs/**`, `.claude/**`, `AGENTS.md`,
`CLAUDE.md`, `.oxlintrc.json`, `.oxfmtrc.json`, `tsconfig.json`, `vite.config.ts`, `.gitignore`,
`.gitattributes`, `scripts/**`).

## Unknowns

- Whether the Chromium Playwright launches for this suite expose a `document.modelContext` (the
  chromestatus record says no browser ships it): the first browser test asserts the reading and
  reports it; the bridge's real-host tests run only when it exists, and the double covers the rest.

## Scope

**Owned.** `guides/tool.md` (byte copy from `C:/Users/mikes/WebstormProjects/tool/guides/tool.md`
at its current tip — the tool guide moved after U3c copied it; refresh first and `cmp`),
`src/browser/types.ts`, `src/browser/factories.ts`, `src/browser/constants.ts`,
`src/browser/helpers.ts` (new, if a pure projection helper is needed), `src/browser/validators.ts`
(new, if a guard is needed), `src/browser/index.ts`, `src/browser/contexts/ModelContext.ts` (new;
the class, if the bridge is a class), `tests/src/browser/**`, `tests/setupBrowser.ts`,
`tests/fixtures/modelContext.ts` (new; the IDL double), `tests/guides.test.ts`, `guides/mcp.md`,
`README.md` (tagline only).

**Shared (report-only).** `src/core/**` (U3 owns it; return an exact patch if a core change is
unavoidable).

**Off-limits.** Standing-conditions files; `package.json`, `package-lock.json`; `src/server/**`;
other guide mirrors; `dist/**`.

**What asserts the state this change ends.** `tests/src/browser/factories.test.ts` (the pair
scenario stays and gains the factory form); `guides/mcp.md` `### Browser transport` and
`## Declared conformance gaps`; the transcriptions in `tests/guides.test.ts`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash (scoped runs only). No installs, no git
mutations, no network.

## Execution

A native subagent: perform the assignment directly and spawn nothing. TTTDD: types first, then
the tests that pin each behaviour (browser project), then the implementation, then the guide.

## The surface to land (exact names; shapes are yours to complete under the rules)

```ts
export interface PageServerOptions {
	readonly tools: ToolManagerInterface
	readonly name?: string
	readonly version?: string
	// client-side options the pair needs, grouped under `client` if more than one
}
export interface PageServerInterface {
	/** Holds the client already bound to the server this page hosts. */
	readonly client: MCPClientInterface
	/** Closes both ports, unbinds both sides, and disconnects the client. */
	destroy(): void
}
export function createPageServer(options: PageServerOptions): PageServerInterface

export interface ModelContextOptions {
	readonly document?: Document
	readonly on?: EmitterHooks<ModelContextEventMap>
	readonly error?: EmitterErrorHandler
}
export interface ModelContextEventMap {
	readonly change: readonly []
}
export interface ModelContextPublishOptions {
	/** Origins the registration is exposed to; mirrors WebMCP `exposedTo`. */
	readonly origins?: readonly string[]
}
export interface ModelContextAdoptOptions {
	/** Origins whose tools are read; mirrors WebMCP `fromOrigins`. */
	readonly origins?: readonly string[]
}
export interface ModelContextInterface {
	readonly emitter: EmitterInterface<ModelContextEventMap>
	/** Registers every tool the manager holds now; a later change needs another publish. */
	publish(tools: ToolManagerInterface, options?: ModelContextPublishOptions): Promise<void>
	/** Reads the document's registered tools as executable tools. */
	adopt(options?: ModelContextAdoptOptions): Promise<readonly ToolInterface[]>
	/** Aborts every registration this handle made and releases the emitter. */
	destroy(): void
}
export function createModelContext(options?: ModelContextOptions): ModelContextInterface | undefined
```

- `createPageServer`: `new MessageChannel()`; `bindServer(createMCPServer({ tools, identity }),
  createMessagePortTransport({ port: port1 }))`; client over `port2` through
  `createDuplexClientTransport` + `createMCPClient` + `bindClient`; no `await` between transport
  construction and binding; `destroy` is idempotent and tears down in the order the transport doc
  requires. The returned `client` is NOT yet connected (connection is the consumer's `await
  client.connect()`), unless you find that binding requires it — decide, record, and document.
- `createModelContext`: returns `undefined` when `(options?.document ?? globalThis.document)`
  carries no `modelContext` (feature detection at construction; `document` typed as the DOM
  `Document`; the `src/browser` environment compiles with the DOM lib and the WebMCP members are
  not in TypeScript's DOM lib — declare the WebMCP surface as this package's own wire types in
  `src/browser/types.ts` with the IDL's exact member names, and narrow the document's member with a
  guard in `validators.ts`; never `as`). `publish` calls `registerTool(tool, { exposedTo?, signal })`
  per tool with `tool.name`, `tool.title`, `tool.description ?? tool.summary ?? ''` (record the
  choice), `inputSchema: tool.parameters`, `annotations` projected `pure → readOnlyHint`,
  `untrusted → untrustedContentHint`, `consequential → consequentialHint`, and `execute(input, {
  signal })` that runs `tools.execute({ id, name, arguments: input }, { signal })` and returns the
  result's `value` or throws the failure's `error` (record the shape you return, given the IDL's
  `Promise<DOMString>` against the README's content array: return the value unchanged and document
  the contradiction; do not normalize). A second `publish` re-registers only names not already
  registered by this handle and aborts registrations whose names are gone (state what it does in
  TSDoc). `adopt` maps each `RegisteredTool` to a `Tool` whose `execute(args, context)` calls
  `executeTool(registered, args, { signal: context.signal })`, carrying `title`, `description`,
  `parameters: inputSchema`, and the inverse annotation projection. `change` is emitted on the
  registry's `toolchange`. `destroy` aborts every retained controller, removes the listener, and
  calls `emitter.destroy()` last.
- `tests/fixtures/modelContext.ts`: an in-memory implementation of the IDL in G5c § 1 member for
  member — `registerTool`, `getTools`, `executeTool`, `toolchange` dispatch through an
  `EventTarget` — and nothing beyond it. It is a protocol-faithful boundary stub of a FOREIGN
  surface (`tests.md` § Test contract permits it); it never stands in for this package's code.
- Guide: `### Browser transport` documents `createPageServer` beside `createScopeServer` and
  `createModelContext`; a new `## WebMCP parity` section carries the matrix from
  `D1-design-planner.md` § 6 with every row ending implement, retain, or exclude and citing its
  source, updated to the rulings in `plan.md` (R4 excluded pending authorization; R8, R12 excluded;
  the `readOnlyHint`/`destructiveHint`/`untrustedContentHint`/`consequentialHint` projections
  named); `## Declared conformance gaps` gains the `document.modelContext` row: proven against the
  IDL double only; chromestatus `Proposed`, no flag, no origin trial, 2026-08-12; native
  integration unproven. Server-initiated requests keep the guide's existing "modern-protocol
  non-goal" wording.

## Output

Final message: touched files with one-line summaries; `git diff --stat`; `git status
--porcelain`; the two baseline readings; for each behaviour the test title that pins it; the
acceptance commands with exit codes and counts; the Unknown's reading (does Chromium expose
`document.modelContext` here); any shared-file patch verbatim; deviation state. No process diary.

## Deviation contract

Stop and report on: a `src/core` change you cannot express as a patch; an off-limits or vendored
file that must change; a rule forbidding a named member; the installed tool declaration differing
from the Evidence on a member you use. Decide, record, carry on for the returned-value shape of
`execute` under the IDL contradiction, the description fallback, the `publish` re-registration
semantics, test placement, and fence wording.

## Acceptance criteria

1. `npm run lint:check` exit 0; `npm run check` exit 0 (root and the scoped `check:src:browser`).
2. The browser barrel exports `createPageServer`, `PageServerInterface`, `PageServerOptions`,
   `createModelContext`, `ModelContextInterface`, `ModelContextOptions`, `ModelContextEventMap`,
   `ModelContextPublishOptions`, `ModelContextAdoptOptions`, and the WebMCP wire types (pinned by
   `expectTypeOf` in a browser test).
3. `npm run test:src:browser` exit 0 in real Chromium with tests, each named for what it proves:
   `createPageServer` completing `connect`, `tools/list`, and `tools/call` with a `fetch` counter
   reading zero for the whole scenario and a positive control (one deliberate `fetch` to a data
   URL or the page's own origin) proving the counter counts; `destroy` idempotent and leaving
   `client.connected` false; an abort through a `ToolContext.signal` passed to the wrapped MCP
   tool cancelling an in-flight `tools/call` observed at the server (the server-side handler sees
   its `context.signal` abort); `createModelContext` returning `undefined` on a document without
   the member; with the double installed on a document: `publish` registering each tool with the
   projected annotations, a registered tool's `execute` running the manager's tool and returning
   its value, a failure surfacing as a rejection, `signal` from `executeTool` reaching the tool's
   `context.signal`, `adopt` returning `Tool` instances that execute through `executeTool` with the
   agent-side signal forwarded, `toolchange` emitting `change`, `destroy` unregistering everything
   this handle registered and nothing registered by another handle; the first test records
   whether the real Chromium exposes `document.modelContext` (expected `false`) and the real-host
   tests run only when it does.
4. `npm run test:src:core` and `npm run test:integration` exit 0 (unchanged by this unit).
5. `npm run test:guides` exit 0 with the new sections and transcriptions; `guides/tool.md`
   byte-identical to the tool checkout's current tip (`cmp` exit 0).
6. `npm run test:policy`, `test:config`, `test:setup` exit 0.
7. `npm run format:check` exit 0.

**Observations, not criteria.** `npm test` as a whole: report the reading.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` after you exit.
