# Unit U2d — `@orkestrel/agent` finish round after audit A2b — successor of U2c

## Successor note

U2c closed every A2 carrier (`U2c-agent-fix-report.md`; Orchestrator gates all exit 0). Audit A2b
(`A2b-audit-reviewer.md`, `A2b-audit-checker.md`) confirmed claims 2–8 and broke claim 1 on one
interleaving plus a lede sentence. This unit carries both, verbatim from the reviewer.

## Role and engine

`sol` route on GPT-6 Astra, `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/agent`. Sole writer; the tree carries U2b and U2c's edits. Law,
host, standing conditions, scope, tools and limits as in
`C:/Users/mikes/WebstormProjects/agent/tmp/codex/U2c-agent-fix-brief.md`. The installed
`@orkestrel/tool` is now the accepted U1d tarball (`ToolErrorContext` present, count 3): re-run
`npm.cmd run check` first and report; the contract shape is unchanged.

## Carriers

1. **A2b claim 1 — consumer code between the guard and the dispatch.** With an `authority`, the
   `deny` emits inside `#authorize` (and `evaluate` itself) run synchronously after the pre-dispatch
   guard and before `tools.execute(allowed, { signal })`, so a `deny` listener that aborts the run
   makes the manager refuse the allowed call and its abort text lands as a tool message. Hoist the
   authority evaluation pass — including its `deny` emits, in call order — above the guard, so the
   guard is the last statement before the assistant tool-call turn is appended and the dispatch;
   pass the computed `{ allowed, denials }` into the dispatch. Constraints: every denied call still
   emits exactly one `deny` in call order and costs no tool run; an abort during dispatch still
   awaits the running handler and records its real result (`Agent.test.ts` `waits for a tool that
   ignores its signal before settling a cancelled run` stays green); the no-authority branch is
   unchanged. Pin: authority configured, one denied and one allowed call in a turn, a `deny`
   listener that aborts the run — assert no `tool` chunk, no assistant-with-calls message, no tool
   message, `partial: true`, and the allowed tool's handler never entered. Record red-then-green.
2. **A2b F1 — the lede.** `guides/agent.md:15` must list the budget among the run signal's sources
   again and split the destinations: the signal folds an agent abort, a stream abort, an external
   signal, a `timeout`, and the `budget` through `AbortSignal.any` and bounds the provider; a
   handler's `context.signal` is that same signal; the budget is charged during provider streaming
   and between turns, before tool dispatch, so exhaustion ends the run without dispatching rather
   than inside a handler. Keep `guides/agent.md:983` (invariant 5) and `:1244` consistent with it.

## Output

Touched files; `git diff --stat main`; `git status --porcelain`; the new test title with the exact
command and red-then-green counts; acceptance commands with exit codes and counts; deviation state.

## Acceptance criteria

1. `npm.cmd run lint:check` exit 0; `npm.cmd run check` exit 0.
2. `npm.cmd run test:src:core` exit 0 with the new test; the ignoring-handler test unchanged and green.
3. `npm.cmd run test:guides` exit 0; `guides/tool.md` byte-identical to the tool checkout's tip.
4. `npm.cmd run test:policy`, `test:config`, `test:setup`, `format:check` exit 0; `git diff --check` exit 0.
