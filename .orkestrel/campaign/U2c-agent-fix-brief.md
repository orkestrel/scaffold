# Unit U2c — `@orkestrel/agent` fix round after audit A2 — successor of U2b

## Successor note

U2b landed the adoption (`U2-agent-context-report.md`); the Orchestrator's gates are green
(`U2b-agent-gates-orchestrator.log.txt`) and the tool mirror is byte-identical. Audit A2
(`A2-audit-reviewer.md`, `A2-audit-analyst.md`, `A2-audit-checker.md`) broke claims 1 (budget
wording), 4 (stale comments), and 9 (ship), and substantiated six findings. This unit carries every
retained finding and one Orchestrator ruling on where the pre-dispatch guard sits.

## Role and engine

`sol` route on GPT-6 Astra, reached as a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/agent`. Perform the assignment directly and spawn nothing. Sole
writer. The tree carries U2b's uncommitted edits; build on them.

## Context

**Law, Host, Standing conditions, Tools and limits.** As in
`C:/Users/mikes/WebstormProjects/agent/tmp/codex/U2b-agent-context-brief.md`. `npm.cmd run
<script>`; no `prove`; no installs; no git mutations; no version bump; no new package; no edits
to the `scaffold repair` set. The installed `@orkestrel/tool` is the U1c tarball (`ToolContext`
count 8; unchanged shape).

**Scope.** U2b's Owned plus `src/core/shapers.ts` (its comments only — the shapes and contracts
themselves stay as they are).

**Evidence.** The three A2 verdicts under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`.
Line references are to the U2b tree. The installed budget aborts synchronously inside `consume`
(`node_modules/@orkestrel/budget/dist/src/core/index.js:380`); the installed manager refuses an
already-aborted call before entry (`node_modules/@orkestrel/tool/dist/src/core/index.js:233-242`).

## Carriers (close every one)

1. **F1 — a signal already aborted before the tool block.** Today the loop dispatches with an
   aborted signal, the manager refuses every call, and a synthetic `role: 'tool'` message carrying
   `String(reason)` (a bare DOMException text for a budget trip) lands in the conversation as if a
   tool had failed (`Agent.test.ts:972` and `:1701` exercise it and cannot see it). **Orchestrator
   ruling:** guard before the assistant tool-call turn is appended — immediately before the
   `messages.add({ role: 'assistant', …, calls })` at `Agent.ts:536`, `if (abort.signal.aborted)`
   set the same partial state the turn-top guard at `:426` sets and `break`, so a run aborted
   before dispatch appends neither an assistant turn carrying calls nor tool messages, emits no
   `tool` chunk, and settles `partial: true` with the streamed content still in the result. Read
   the signal only there; an abort that fires during dispatch still awaits the running handler and
   records its real result (`Agent.test.ts:1603` stays green). Tests: a budget-exhausting turn
   carrying a tool call emits no `tool` chunk, appends no assistant-with-calls and no tool message,
   settles partial; the same for an external abort raised in a `usage` listener; both branches
   (authority present and absent). State the resulting conversation shape in `guides/agent.md`.
2. **Claim 1 wording.** In the guide and the TSDoc: the agent's abort, deadline, and external
   signal reach a handler that is running; the budget is charged between turns and aborts before
   dispatch, so it ends the run without dispatching (carrier 1), never inside a handler.
3. **Claim 4 — stale comments.** `src/core/providers/RelayProvider.ts:80` `@returns` (drop "with
   caller context omitted"); `src/core/shapers.ts:20, 34, 49, 75, 95` rewritten to the
   execution-context vocabulary (there is no `ToolCall.caller` member to refuse or drop; the wire
   shape carries `id`, `name`, `arguments`, and the guard refuses any extra member).
4. **F2 — placeholder parameters.** Revert every guide fence and every test handler that reads
   neither parameter to the shortest form (`execute: () => …` or `(args) => …`); keep `(_args,
   context)` only where the context is read. The tool mirror's own sentence — handlers may omit
   unused parameters — governs.
5. **F3 — the placement assertion.** In `tests/guides.test.ts`, read
   `tests/src/core/integration.test.ts` and assert the title the guide quotes appears in it; keep
   the `toContain` presence guard beside it.
6. **F4 — no caller identity.** Assert `context.caller === undefined` inside an agent-dispatched
   handler on the authority branch and on the no-authority branch.
7. **F5, F6 — guide structure.** Remove the `### Provider and tool execution` heading; move the
   placement receipts under `## Tests`; point the lede at the precise anchor; replace "(campaign
   unit U5)" with the durable fact: the page and relay receipts are planned in the `@orkestrel/mcp`
   distribution proof and are not recorded here as passed.
8. **Analyst vectors (`A2-audit-analyst.md` item 8).** `delivers the run deadline inside an
   authorized tool handler`: assert the handler's `context.signal` is the same object the scripted
   provider received as its `signal` argument (record both; `toBe`). `waits for a tool that ignores
   its signal…`: keep, and add the assertion that the handler's `context.signal` aborted while it
   waited. Item 6: the Node placement integration case asserts that the second provider request's
   messages carry the tool result content.

## Output

Final message: touched files; `git diff --stat main`; `git status --porcelain`; for carriers 1,
5, 6, 8 the test titles and exact commands with red-then-green counts where a defect is fixed;
acceptance commands with exit codes and counts; deviation state. No process diary.

## Deviation contract

Stop only when an installed declaration differs from the Evidence on a member you use, an
off-limits file must change, or a rule forbids a named member. Decide, record, carry on for
wording and test placement.

## Acceptance criteria

1. `npm.cmd run lint:check` exit 0; `npm.cmd run check` exit 0.
2. `npm.cmd run test:src:core` exit 0 with the tests carriers 1, 6, 8 name.
3. `npm.cmd run test:guides` exit 0; `guides/tool.md` still byte-identical to the tool checkout's.
4. `npm.cmd run test:policy`, `test:config`, `test:setup` exit 0.
5. `npm.cmd run format:check` exit 0; `git diff --check` exit 0.

**Observations, not criteria.** `npm.cmd test` as a whole.
