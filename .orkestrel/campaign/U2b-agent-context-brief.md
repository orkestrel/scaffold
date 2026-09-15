# Unit U2b — `@orkestrel/agent`: pass the run's abort signal into every tool execution; adopt the tool contract — successor of U2

## Successor note

U2 (thread `01a0a37f-ad61-7123-860c-cd389eb570c7`) stopped before editing, correctly, because
`tests/setup.test.ts` — named in the Orchestrator's own migration measurement — was missing from
Owned. This successor adds it to Owned, records U2's baseline (`npm.cmd run check` exit 2 with 5
errors in the three files below; `npm.cmd run test:src:core` exit 0, 753 tests across 23 files),
and folds in U2's resolved unknown as a decision: **pass `abort.signal`**, the per-run abort
handle's signal (`Agent.ts:205-206` binds the parent bounds to it; `:765` folds the parents with
`AbortSignal.any`), so a direct `agent.abort()` and a stream abort reach handlers as well as the
timeout, budget, and external signal. Everything else is unchanged.

## Role and engine

`sol` route on GPT-6 Astra (objective implementer; Astra stands in the Sol seat), reached as a
`workspace-write` `codex exec` rooted at `C:/Users/mikes/WebstormProjects/agent`. You are the
bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. You are the sole writer in this checkout.

## Objective

Make the agent's tool dispatch carry a `ToolContext` whose `signal` is the run's bound abort
signal on both the authority and the no-authority branch, adopt the tool contract landed by unit
U1 (installed in this checkout as a tarball), and make `guides/agent.md` name each placement and
the project that proves it without claiming a proof that does not exist.

## Context

**Evidence.**

- The tool contract now installed under `node_modules/@orkestrel/tool` (U1's tarball; the U0
  receipt at `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/u0-receipt.md` records the
  install and that `dist/src/core/index.d.ts` contains `ToolContext`): `ToolContext { signal:
  AbortSignal; caller?: unknown }`; `ToolCall { id; name; arguments }` (no `caller`);
  `ToolInterface.execute(args, context: ToolContext)`; `ToolManagerInterface.execute(call | calls,
  context?: ToolContext)` minting a signal when `context` is omitted and refusing entry on an
  already-aborted signal with a `ToolFailure`; `ToolDefinition { name; title?; description?;
  parameters?; annotations? }`; `ToolError` with `isToolError`. Read the installed declaration
  first; it is authoritative over this summary. U1's report:
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/U1-tool-contract-report.md`.
- The dispatch path, read by the Orchestrator 2026-09-15: `src/core/Agent.ts:542` `const results
  = await this.#authorize(tools, result.tools)`; `#authorize` at `:669-704` calls
  `tools.execute(calls)` when no authority is configured and `tools.execute(allowed)` otherwise;
  neither passes a context. The run's bound signal is the one `AbortSignal.any` folds from the
  external `signal`, the `timeout`, and the `budget` (G1 item 4: `Agent.ts:202-206, 404, 753-765`).
- `src/core/providers/RelayProvider.ts:84-129` `body()` projects `message.calls` to `{ id, name,
  arguments }` for the wire; its class comment at `:16` says "The `ToolCall.caller` member never
  crosses the hop". `ToolCall` no longer has that member, so the comment is stale; the projection
  itself stays (it is the JSON snapshot).
- Tests that pin the dispatch: `tests/src/core/Agent.test.ts:367-388, 391-413, 418-445,
  1505-1543, 1605-1642, 3365-3399` and `tests/src/core/integration.test.ts:285-329` (G1 item 7).
  `tests/setup.ts` holds `createScriptedProvider`.
- Guide passages on placement (G1 item 8, G4 item 6): `guides/agent.md` `# Agent` lede, `## Surface`,
  `### The relay` (`:414-416`), `### Relaying a browser provider through your own server`
  (`:1093-1095`), `## Contract` item 2. No test anywhere composes `createAgent(createRelayProvider
  (...), { tools })` in a browser page (G4 Unknowns); the campaign's Chromium receipts live in the
  `mcp` checkout's distribution proof (plan ruling R5), not here.
- Design record: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md` (R1, R5,
  R6, X1, X8), `D1b-design-astra.md` § Constraints 4 ("Agent must pass the signal through the
  authority and no-authority branches").

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; scaffold's
`.claude/rules/{names,typescript,architecture,patterns,tests,documentation,writing,quality}.md`;
skill `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-harden-package/SKILL.md`
(structural lane) with `references/centralization.md`; guide `guides/agent.md`; the tool guide
mirror `guides/tool.md` in this checkout is STALE (it describes the pre-U1 contract) — read
`C:/Users/mikes/WebstormProjects/tool/guides/tool.md` for the landed contract; the mirror is
refreshed by a byte copy in this unit (Owned). This checkout's `AGENTS.md` is a pointer to scaffold;
it holds no `.claude/rules/`.

**Host.** Windows 11. The exec's shell is PowerShell with script execution disabled: write every
npm invocation as `npm.cmd run <script>`. Sandbox `workspace-write` rooted here; network denied;
`.git` read-only (no index-locking git commands; `git status`/`git diff` work). The `prove` MCP tool
is blocked here; use `expectTypeOf` typechecked by `npm.cmd run check`. Vitest forks run.

**Measurements.** The Orchestrator typechecked this checkout against the installed U1 tarball on
2026-09-15 (`npm run check`, exit 2): `src/**` compiles unchanged; the red set is
`tests/setup.test.ts(336,21)` and `(342,21)` (`Expected 2 arguments, but got 1` — a handler
called with one argument), `tests/src/core/integration.test.ts(125,31)` (`'caller' does not exist
in type 'Partial<ToolCall>'`), `tests/src/core/providers/RelayProvider.test.ts(158,31)` and
`(171,43)` (`caller` on `ToolCall`). That `src/**` compiles unchanged is the hazard: an old handler
typed `(args, caller?: unknown)` accepts a `ToolContext` as its "caller", so examine every
second-argument use in `src/**` and `tests/**` by reading, not by the compiler. Take your own
baseline of `npm.cmd run test:src:core` before editing and record it.

**Control identifiers.** R1, R5, R6, X1, X8 are control labels; name tests for what they prove.

**Standing conditions.** `node_modules/@orkestrel/tool` is the U1 tarball installed `--no-save`
(the declared range in `package.json` still reads `^0.0.14`; leave it — the Orchestrator re-pins at
landing). `tmp/` is git-ignored. Do not bump `version`. Do not add any package. Do not edit any
file `scaffold repair` restores (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`, `configs/**`, `.claude/**`, `AGENTS.md`, `CLAUDE.md`, `.oxlintrc.json`,
`.oxfmtrc.json`, `tsconfig.json`, `vite.config.ts`, `.gitignore`, `.gitattributes`, `scripts/**`).

## Unknowns

none — U2 resolved the signal question (see the successor note): pass `abort.signal`.

## Scope

**Owned.** `src/core/Agent.ts`, `src/core/types.ts` (TSDoc only, and any type the signal passing
needs), `src/core/providers/RelayProvider.ts` (comments and any `caller` handling),
`src/core/helpers.ts` (if a helper builds a `ToolCall`), `src/core/validators.ts` (if a guard reads
`caller`), `tests/src/core/**`, `tests/setup.ts`, `tests/setup.test.ts` (its handler calls at
lines 336 and 342 are part of the migration set), `tests/guides.test.ts`, `guides/agent.md`,
`guides/tool.md` (byte copy from `C:/Users/mikes/WebstormProjects/tool/guides/tool.md`),
`README.md` (only if the tagline changes).

**Shared (report-only).** none.

**Off-limits.** Everything in Standing conditions; `package.json`, `package-lock.json`; every other
guide mirror; `dist/**`.

**What asserts the state this change ends.** The files the baseline typecheck names; every test
building a `ToolCall` with `caller` or a tool whose handler reads a second `caller` argument;
`guides/agent.md` fences showing a tool handler signature; the transcriptions in
`tests/guides.test.ts` beside them.

**Tools and limits.** Read, write, run under this checkout; scoped `npx.cmd oxfmt --config
.oxfmtrc.json --write <owned files>`; no tree-wide `format`, `lint --fix`, `build`; no installs; no
git mutations; no network.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## The change (exact)

- `#authorize`: on both branches call `tools.execute(calls, { signal })` / `tools.execute(allowed,
  { signal })` where `signal` is the run's bound abort signal. Denied calls are never entered
  (unchanged).
- Every tool authored in `src/**` or `tests/**` takes `(args, context)`; every test that reads a
  second `caller` argument moves to `context.caller` only where the test's claim is about caller
  identity (the agent itself never sets `caller`; a test may pass a context through a manager it
  drives directly).
- `RelayProvider`: update the class comment; keep the `{ id, name, arguments }` projection.
- `guides/agent.md`: (a) the Node-alone placement names the `src:core` project and the test title
  that proves the tool loop there; (b) the page-alone and page-to-Node relay placements name the
  `@orkestrel/mcp` distribution proof by path and title as the receipt, once it exists (plan unit
  U5) — write the sentence so it names that proof as where the receipt lives, without asserting it
  already passed; (c) the relay section states which half runs where; (d) a passage stating that a
  tool's handler receives `context.signal` and that the agent's abort, deadline, and budget reach
  it, with an executed fence and its transcription.
- New tests: abort during a tool's execution is observed INSIDE the handler through
  `context.signal` (the handler resolves on the abort event; the run settles `partial: true` as
  today); a deadline firing during execution likewise; a handler that ignores its signal still
  settles the run exactly as today (the pin that cooperative cancellation forces nothing).

## Output

Final message: touched files with one-line summaries; `git diff --stat`; `git status
--porcelain`; the baseline red typecheck's error count and file list; for each new behaviour the
test title; the acceptance commands with exit codes and counts; the Unknown resolved with the line;
deviation state. No process diary.

## Deviation contract

Stop and report on: an installed tool declaration that differs from the Evidence summary on a
member this change uses; a vendored or off-limits file that must change to go green; a rule
forbidding a named member. Decide, record, carry on for test placement, fence wording, and
message text.

## Acceptance criteria

1. `npm.cmd run lint:check` exit 0; `npm.cmd run check` exit 0 (from the recorded red baseline).
2. `npm.cmd run test:src:core` exit 0, including the three new tests named above and every pinned
   dispatch test.
3. `npm.cmd run test:guides` exit 0 with the new placement and cancellation passages and their
   transcriptions; `guides/tool.md` byte-identical to `C:/Users/mikes/WebstormProjects/tool/guides/tool.md`
   (compare with `cmp`).
4. `npm.cmd run test:policy`, `test:config`, `test:setup` exit 0.
5. `npm.cmd run format:check` exit 0.

**Observations, not criteria.** `npm.cmd test` as a whole: report the reading.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` after you exit.
