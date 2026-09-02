# Unit toolbox-fixup — carry the upstream renames through the guide prose

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`guides/toolbox.md` in `@orkestrel/toolbox` at commit `e5b868a` names only symbols the package
and its staged dependencies export, spells one causal construction one way on the lines the unit
rewrote, and describes `TerminalBridge` the way its TSDoc does.

## Context

**Findings and rulings.** The audit lanes on `e5b868a` found, all in `guides/toolbox.md`:

1. Line 310, contract row 5: "An omitted task `run` is the native JSON-`null` no-op." The task
   member is `behavior` (`src/core/types.ts:57`, `src/core/shapers.ts` `taskDraftShape.behavior`).
   Ruling: "An omitted task `behavior` is the native JSON-`null` no-op."
2. Line 982, See also: "the `openStream` SSE primitive `createTerminalRoutes`'s GET route is built
   over." The staged `@orkestrel/server` exports `createStream` and no `openStream`
   (`node_modules/@orkestrel/server/dist/src/server/index.d.ts:391`), and
   `src/server/terminals/TerminalBridge.ts:14` imports `createStream`. Ruling: `openStream` →
   `createStream` in that sentence, nothing else in it.
3. Line 332, contract row 15: "since it joins nothing forward" on a line the unit rewrote to land
   `normalizeQuery`, three rows from the `because` it landed at row 20. `.claude/rules/writing.md`
   § Substitutions fixes causal `since` → `because`. Ruling: "because it joins nothing forward".
   The two causal `since` at line 348 (contract row 23) stay for the voice wave; do not touch them.
4. Line 53, the `TerminalBridge` Surface row: "Own the shared terminal-route options and bound
   GET/POST handlers projected by `createTerminalRoutes`." The class TSDoc
   (`src/server/terminals/TerminalBridge.ts:21-22`) reads "Bridges a terminal manager onto the
   wire — owns the shared route options, the token gate, and the bound GET stream and POST answer
   handlers." Ruling: restate the row from the TSDoc in the row's imperative voice: "Bridge a
   terminal manager onto the wire, owning the shared route options, the token gate, and the bound
   GET stream and POST answer handlers that `createTerminalRoutes` projects." Keep the table
   aligned; run the formatter to converge.

Recorded, no change: `createTerminalRoutes`, `TERMINAL_ROUTES_PATH`, and `TERMINAL_KEEPALIVE_MS`
stay beside `TerminalBridge` (the factory returns routes; the ruling stands); the vendored
`guides/server.md` mirror spells `openStream` and refreshes at the re-pin; the `run` → `behavior`
adoption on `TaskDraft` and the unknown-terminal `ToolboxError` context (`known` → `count`) are
recorded in the breaking radius by the Orchestrator.

**Law.** `AGENTS.md`; `.claude/rules/writing.md`; `.claude/rules/documentation.md` § Parity.
Read the copies under `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the
checkout's `.claude/rules/` differs.

**Host.** Linux, bash. Repository `/home/user/fleet/toolbox` at commit `e5b868a`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed
with the closure staged. Do not run `npm install`. `test:distribution` is outside `npm test`.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `guides/toolbox.md` at the four sites named.

**Off-limits.** Every other file: `src/**`, `tests/**`, `README.md`, `package.json`,
`package-lock.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `.claude/**`, `configs/**`,
every vendored guide mirror, every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge the table; then the non-mutating chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the four edits, then
sweep `guides/toolbox.md` for `openStream`, "task `run`", and `\bsince\b` (expect the two hits at
line 348 only), then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: each finding closed with the line changed (old text → new text), or stopped
with the deviation; the sweep result with the command and its output; each gate command with its
exit code and an excerpt for any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a named line does not carry the quoted text, or when a gate fails for a cause
you cannot attribute after the re-run.

## Acceptance criteria

1. `grep -n 'openStream' guides/toolbox.md` returns nothing.
2. `grep -n 'task `run`' guides/toolbox.md` returns nothing, and line 310 names `behavior`.
3. `grep -n -i '\bsince\b' guides/toolbox.md` returns only the line 348 hits.
4. The `TerminalBridge` row carries the ruled sentence.
5. `git status --short` lists `guides/toolbox.md` alone.
6. The gate chain exits 0 at every step (observation for the timing-sensitive `npm test`; the
   Orchestrator's landing chain is the authoritative run).
