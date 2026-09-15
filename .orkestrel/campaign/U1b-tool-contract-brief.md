# Unit U1b — `@orkestrel/tool`: execution context, contract-derived parameters, advertising vocabulary — successor of U1

## Successor note (what changed from U1 and why)

U1 (thread `01a0a360-29cf-7001-b147-a40c10f03c4e`) stopped before editing, correctly under U1's
deviation contract, because U1's Evidence described every contract `Fault` as carrying `expected`
while the installed declaration is a union whose `variant` and `oneOf` arms carry none. This
successor describes the union as installed, folds in the two Unknowns U1 resolved (the projection
is `schemaToParameters(contract.schema)`; `ToolError` extends `Error`), records U1's baseline, and
narrows the stop clause to a missing primitive. The contract to land, the scope, and the
acceptance criteria are unchanged.

## Role and engine

`sol` route on GPT-6 Astra (the objective implementer; Astra stands in the Sol seat for this
campaign), reached as a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/tool`. You are the bench engine reading this brief inside your
own CLI: perform the assignment directly and spawn nothing. You are the sole writer in this
checkout.

## Objective

Land the tool contract the campaign's plan of record fixes (rulings R1, R2, R3 in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md`): a `ToolContext` carrying a
required `AbortSignal` to every handler, `ToolCall` reduced to plain JSON, an optional `contract`
that derives `parameters` and validates arguments before the handler runs, a `ToolError` with a
guard, and `title` and `annotations` on `ToolDefinition` — with tests, the guide, and parity green.

## Context

**Evidence.**

- The current contract, read by the Orchestrator 2026-09-15 (`cat src/core/types.ts`, 215 lines):
  `ToolDefinition { name, description?, parameters? }`; `ToolCall { id, name, arguments, caller? }`;
  `ToolInterface extends ToolDefinition { summary?; execute(args, caller?) }`; `ToolOptions { name,
  description?, summary?, parameters?, execute(args, caller?) }`; `ToolManagerInterface { count; add;
  tool; tools; definitions; execute(call) | execute(calls); remove; clear }`. `Tool.execute` forwards
  `caller` only when defined (`src/core/tools/Tool.ts`); `ToolManager.#run` builds `ToolFailure`
  for a missing tool and for a thrown handler (`src/core/tools/ToolManager.ts`); `toolToDefinition`
  substitutes `summary` for `description` (`src/core/helpers.ts`); `isToolCall` checks `id`, `name`,
  `arguments` (`src/core/validators.ts`); the barrel is `types, helpers, validators, factories,
  tools/Tool, tools/ToolManager` (`src/core/index.ts`). There is no `src/core/errors.ts` and no
  `src/core/constants.ts`.
- Installed `@orkestrel/contract` 0.0.17 declarations
  (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts`), read by U1 and the Orchestrator:
  `compileSchema(shape: ContractShape): JSONSchema` at line 979; `createContract(shape)` at
  1505–1507 returning a `ContractInterface` whose members include `schema: JSONSchema` (line 1376),
  `parse(value): T | undefined`, `audit(value): readonly AuditFault[]`, and `explain(value):
  readonly Fault[]` (1413–1422); `schemaToParameters(schema: JSONSchema): Readonly<Record<string,
  unknown>> | undefined` at 5831, with the example at 5825–5828 composing it with a contract's
  `schema`. **Decision (U1's resolved unknown): derive `parameters` as
  `schemaToParameters(createContract(shape).schema)`.**
- `Fault` is a union discriminated by `reason` (declared near lines 1700–1746): every arm carries
  `path: FieldPath`; the `constraint` arm carries `expected`, `constraint`, `limit`, and `received`
  (example at line 1500); the `variant` arm carries `variants: number` (line 1738); the `oneOf` arm
  carries `matched: number` (line 1742); other arms exist. Read the whole union before writing the
  message builder, and build the message from the members the arm actually carries.
- `ContractError` (line 1297) has `code: ContractCode` whose union (1109–1135) does not include
  tool codes. **Decision (U1's resolved unknown): `ToolError extends Error`** with its own `code`
  and optional `context`, per `typescript.md` § Errors and outcomes.
- Scripts (`package.json`): `lint:check`, `check` (root `tsc` then `check:src:core`), `format:check`,
  `test:src:core`, `test:policy`, `test:config`, `test:setup`, `test:guides`
  (`node --experimental-strip-types tests/guides.test.ts`), `test:probe` (project `probe` over
  `tmp/probe/**`), `build`. Tests live under `tests/src/core/{factories,helpers,validators}.test.ts`
  and `tests/src/core/tools/{Tool,ToolManager}.test.ts`; `tests/setup.ts` (20 lines) is shared
  infrastructure; `tests/guides.test.ts` (249 lines) is the authored parity proof.
- U1's baseline on the clean tree (thread above, 2026-09-15): `npm.cmd run lint:check` exit 0;
  `npm.cmd run check` exit 0; `npm.cmd run test:src:core` exit 0, 54 tests across 5 files. The tree
  is unchanged since (`git status --porcelain` empty).
- The only code consumer of `ToolCall.caller` in the fleet is `mcp/src/core/MCPServer.ts:794`
  (`buildToolCall(request, options.caller, args)`), per request — a later unit moves it to the
  context. `agent` reads no `caller`.
- Design record: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md` (rulings
  R1–R4, exit criteria X1–X3), `D1-design-planner.md` § 1, `D1b-design-astra.md` § Constraints 1
  (keep failure behaviour distinct by entry point; an already-aborted signal prevents handler
  entry; signals stay out of definitions and serialization).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (every non-negotiable and design law
binds: no `any`, no assertions, no mocks, no new npm package, `readonly` members, single-word
members, `undefined` for absence); the rule files under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`:
`names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`,
`writing.md`, `quality.md`; the skill
`C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-harden-package/SKILL.md` with its
`references/contract.md` and `references/centralization.md`; the governing guide `guides/tool.md`
(311 lines) and the mirrors `guides/contract.md`, `guides/guide.md`, `guides/test.md` in this
checkout. This checkout's `AGENTS.md` is a pointer: it holds no `.claude/rules/` directory and
says to resolve every rule path against scaffold, so read the scaffold paths named here (the
sibling checkout is readable from this exec).

**Host.** Windows 11. The exec's shell is PowerShell with script execution disabled: write every
npm invocation as `npm.cmd run <script>`. Sandbox `workspace-write` rooted at this checkout: writes
under it and the system temporary directory only; network denied; `.git` read-only (no `checkout`,
`stash`, `add`, `commit`; `git status`/`git diff` work and may warn about `~/.config/git/ignore`,
which is not a defect). The `prove` MCP tool is blocked here: use `expectTypeOf` assertions
typechecked by `npm.cmd run check`. Vitest worker forks run.

**Measurements.** See U1's baseline above; re-run the three commands only if the tree is dirty
when you start.

**Control identifiers.** R1–R4 and X1–X3 are control labels. A test is named for what it proves,
never for a control label.

**Standing conditions.** `tmp/` is git-ignored. Do not bump `version` in `package.json`. Do not add
`@orkestrel/emitter` or any other package (ruling R4 excludes the registry emitter pending the
user's authorization). Do not edit any file `scaffold repair` restores: `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `configs/**`, `.claude/**`, `.agents/**`,
`AGENTS.md`, `CLAUDE.md`, `.oxlintrc.json`, `.oxfmtrc.json`, `tsconfig.json`, `vite.config.ts`,
`.gitignore`, `.gitattributes`, `scripts/**`, `.mcp.json`, `.codex/**`, `.cursor/**`.

## Unknowns

none — both of U1's were resolved and are recorded as decisions above.

## Scope

**Owned.** `src/core/types.ts`, `src/core/errors.ts` (new), `src/core/tools/Tool.ts`,
`src/core/tools/ToolManager.ts`, `src/core/factories.ts`, `src/core/helpers.ts`,
`src/core/validators.ts`, `src/core/index.ts`, `tests/src/core/**`, `tests/setup.ts`,
`tests/guides.test.ts`, `guides/tool.md`, `README.md` (its pitch equals the guide's tagline; change
only if the tagline changes).

**Shared (report-only).** none.

**Off-limits.** Every file the Standing conditions list, `package.json`, `package-lock.json`,
`guides/*.md` other than `tool.md` (mirrors), `dist/**`.

**What asserts the state this change ends.** Every test under `tests/src/core/**` that calls
`execute(args, caller)` or builds a `ToolCall` with `caller`; `tests/guides.test.ts` fences that
transcribe `createTool`/`createToolManager` examples; every fence in `guides/tool.md` showing a
handler signature. Derive the list by running `npm.cmd run test:src:core` and
`npm.cmd run test:guides` after the type change: the failures are the list.

**Tools and limits.** Read, write, and run under this checkout. Scoped formatting of owned files
with `npx.cmd oxfmt --config .oxfmtrc.json --write <owned files>` is permitted; tree-wide `format`,
`lint --fix`, and `build` are not. No installs, no git mutations, no network.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing. Follow TTTDD: types first, then the tests that pin each new behaviour, then the
implementation, then the guide.

## The contract to land (exact)

In `src/core/types.ts`:

```ts
export interface ToolContext {
	/** Aborts when the caller stops waiting for this call. */
	readonly signal: AbortSignal
	/** Carries consumer-asserted caller identity, forwarded without verification. */
	readonly caller?: unknown
}

export interface ToolAnnotations {
	/** Reports that the tool changes no state its caller can observe. */
	readonly pure?: boolean
	/** Reports that the tool's value can carry content the tool did not author. */
	readonly untrusted?: boolean
	/** Reports that running the tool has a consequence a caller must confirm. */
	readonly consequential?: boolean
}

export type ToolErrorCode = 'SCHEMA' | 'ARGUMENTS'
```

- `ToolDefinition { name; title?; description?; parameters?; annotations? }`.
- `ToolCall { id; name; arguments }` — `caller` removed.
- `ToolInterface extends ToolDefinition { summary?; execute(args, context: ToolContext):
  Promise<unknown> | unknown }` — `context` required.
- `ToolOptions { name; title?; description?; summary?; parameters?; contract?: ContractShape;
  annotations?; execute: (args, context: ToolContext) => Promise<unknown> | unknown }`.
- `ToolManagerInterface.execute(call: ToolCall, context?: ToolContext)` and
  `execute(calls: readonly ToolCall[], context?: ToolContext)`; the other members unchanged.
- `src/core/errors.ts`: `export class ToolError extends Error` with `readonly code: ToolErrorCode`
  and `readonly context?: Readonly<Record<string, unknown>>`; `src/core/validators.ts`:
  `isToolError`. Barrel row `./errors.js` added in the kind order `architecture.md` § Barrel
  exports shows.

Behaviour:

- `Tool` constructed with both `contract` and `parameters` throws `ToolError` code `SCHEMA`.
- With `contract`, `Tool.parameters` is derived once at construction as
  `schemaToParameters(createContract(shape).schema)` and exposed as the advertised record (when
  the projection returns `undefined`, `parameters` stays `undefined`); `Tool.execute` runs the
  contract's `explain` over `args` before the handler and, when it reports faults, throws
  `ToolError` code `ARGUMENTS` whose message names the first fault's `path` (joined with `.`) and
  its `reason`, and appends `expected` and `received` when that arm carries them; `context` carries
  the full faults array under `faults`.
- Without `contract`, `Tool.execute` validates nothing (the advertised `parameters` record is
  forwarded as before).
- `ToolManager.execute(call, context?)`: when `context` is omitted, mints one `AbortController`
  and passes `{ signal }`; when given, passes it through unchanged (a batch shares one context).
  If `context.signal.aborted` is already true when a call is about to run, the handler is never
  entered and the result is a `ToolFailure` whose `error` names the abort reason (`String` of the
  reason, or `aborted` when the reason is `undefined`). A handler that throws `ToolError` or any
  other value is contained as today. Batch order and per-call isolation are unchanged.
- `toolToDefinition` forwards `title` and `annotations` when present; the `summary` substitution
  for `description` stays.
- `isToolCall` no longer reads `caller`.

## Output

Deliver, as your final message, the report: touched files with one-line summaries; `git diff
--stat`; `git status --porcelain`; for each new behaviour the test title that pins it; the exact
commands run for acceptance with their exit codes and counts; and deviation state. No process
diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — only when a
cited PRIMITIVE is absent from the installed declaration (`compileSchema`, `createContract`,
`ContractInterface.schema`, `explain`, `schemaToParameters`), when a vendored or off-limits file
would have to change to make a gate green, or when a rule forbids a member this brief names. A
declaration detail you can read yourself — a union arm, a member's exact type, a line number that
moved — is yours to read and decide; record the decision in the report and carry on. Decide,
record, and carry on for where a test sits, how a fence is worded, and the exact error message
text.

## Acceptance criteria

1. `npm.cmd run lint:check` exit 0 and `npm.cmd run check` exit 0.
2. The barrel exports `ToolContext`, `ToolAnnotations`, `ToolErrorCode`, `ToolError`, and
   `isToolError`; `ToolCall` declares no `caller`; `ToolInterface.execute` and `ToolOptions.execute`
   take `context: ToolContext` as a required second parameter (pinned by `expectTypeOf` assertions
   in `tests/src/core/tools/Tool.test.ts`).
3. `npm.cmd run test:src:core` exit 0 with tests, each named for what it proves, covering: a
   handler observing `context.signal` abort mid-execute (real timer, `waitForDelay` from
   `@orkestrel/test`); an already-aborted signal returning a `ToolFailure` without entering the
   handler; a manager call with no context receiving a non-aborted signal; a batch sharing one
   context where one handler throws and the siblings settle in order; a contract tool refusing a
   wrong-typed argument with a `ToolFailure` naming the path and reason; a contract tool's
   derived `parameters` equal to `schemaToParameters(createContract(shape).schema)` computed in the
   test from the same shape (compare against the projection, never against the tool's own
   derivation); construction with both `contract` and `parameters` throwing `ToolError` code
   `SCHEMA` recognized by `isToolError`; `toolToDefinition` forwarding `title` and `annotations`
   and dropping `summary` into `description`.
4. `npm.cmd run test:guides` exit 0: every new export documented in `guides/tool.md` (Surface,
   Types, Methods tables per `documentation.md`), a runnable fence per new export whose comments
   state what it returns, and the transcription in `tests/guides.test.ts` updated beside each
   changed fence.
5. `npm.cmd run test:policy`, `npm.cmd run test:config`, and `npm.cmd run test:setup` exit 0.
6. `npm.cmd run format:check` exit 0 over the tree (format owned files with the scoped command).

**Observations, not criteria.** `npm.cmd test` as a whole: report its reading; the Orchestrator
takes the authoritative run after you exit.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` after you exit and supplies them
to the audit lanes together with your report.
