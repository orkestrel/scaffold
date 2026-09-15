# Unit G6 — reuse sweep: campaign code against the installed `@orkestrel/test` and `@orkestrel/contract` surfaces

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached as the Cursor CLI in print mode. You are the
bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. This lane is READ-ONLY. No web is needed. Every path is absolute.

## Objective

Return, with `file:line` pointers, every place in the campaign's diffs where code re-implements,
near-duplicates, or hand-rolls what an installed export of `@orkestrel/test` or
`@orkestrel/contract` already does — so the Orchestrator can route each one to the export instead.

## Context

The rule the code must obey (read first):

- `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md` § "Shared test infrastructure"
  (from "`@orkestrel/test` owns the helpers every workspace repeats" through "### Scratch").
- `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/patterns.md` lines 10–25 and 118–130
  (reuse the originating package; `@orkestrel/contract` guards, parsers, combinators, outcomes,
  `attempt`, shape DSL).
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § "Non-negotiable rules" — the `ALWAYS
  inspect the exact declared and installed @orkestrel/* capabilities` line.

The surfaces (read the whole `## Surface` section of each; these guides are the mirrors of the
installed versions — test 0.0.14, contract 0.0.17 — in every campaign checkout):

- `C:/Users/mikes/WebstormProjects/scaffold/guides/test.md` § Surface (`### Core`, `### Browser`,
  `### Server`) and § Patterns.
- `C:/Users/mikes/WebstormProjects/scaffold/guides/contract.md` § Surface.

Confirm the installed declaration where a guide row is ambiguous:
`C:/Users/mikes/WebstormProjects/mcp/node_modules/@orkestrel/test/dist/src/{core,browser,server}/index.d.ts`,
`C:/Users/mikes/WebstormProjects/mcp/node_modules/@orkestrel/contract/dist/src/core/index.d.ts`.

The subject (read every line of each diff; each is `git diff` output, and the last one ends with
the full text of the added files):

1. `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/G6/tool.diff` — `@orkestrel/tool`, the
   contract change (`ToolContext`, `ToolCall`, `contract` option, `ToolError`).
2. `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/G6/agent.diff` — `@orkestrel/agent`
   adopting it.
3. `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/G6/mcp-core.diff` — `@orkestrel/mcp` core
   adopting it.
4. `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/G6/ollama.diff` — `@orkestrel/ollama`
   adopting it.
5. `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/G6/mcp-browser.diff` — the in-flight
   browser face of `@orkestrel/mcp` (`createPageServer`, `createModelContext`, fixtures, browser
   tests). One duplicate is already known: `tests/setupBrowser.ts` declares `waitForCondition`
   although `@orkestrel/test` exports `waitForCondition(description, condition, options?)`. Report
   it in the table anyway, with every call site, so the row is complete.

Where a diff hunk is too narrow to judge a helper, open the file in its checkout
(`C:/Users/mikes/WebstormProjects/{tool,agent,mcp,ollama}/`) and read the surrounding declaration.

## What to look for (each is a row)

- A helper, fixture, or guard declared in the diff whose job an installed export does: waits
  (`waitForCondition`, `waitForEvent`, `waitForAbort`, `waitForDelay`, `retryUntil`), recorders
  (`createRecorder`, `createRecorders`), signals (`createSignal`), teardown (`createTeardown`),
  collectors (`collect`, `collectStream`, `decodeJSONLines`), narrowing (`requireValue`,
  `readProperty`, `invokeUnchecked`, `captureError`), JSON (`roundTripJSON`), hostile inputs
  (`createHostileValues`), scratch and loopback (`createScratch`, `createLoopback`), and every
  `@orkestrel/contract` guard, combinator, parser, `attempt`, or shape builder.
- A polling loop, an inline `setTimeout` promise, a hand-built deferred (`Promise.withResolvers`
  or `new Promise` with captured resolvers) used to observe an abort or an event, a hand-written
  `typeof`/`in` narrowing where a contract guard exists, a local `isRecord`/`isString`/`isArray`
  or similar.
- A helper in a test file that belongs in a `tests/setup*.ts` module (the rule's placement law).

Judge by semantics, not by name: a local function with a different name that does what an export
does is a row; a same-named function with different semantics is a row marked `name only`.

## Return shape (and nothing else)

```
Question: <one sentence>

Rows:
| # | Checkout | Location (`file:line`) | What the code does | Installed export it duplicates (package, entry, signature) | Verdict: duplicate / near-duplicate / name only / no export fits | Call sites (`file:line`) |

Clean: <for each diff, the helpers you examined and found no export for, one line each with `file:line`>

Rule text that steered a re-implementation: <quote any rule or guide sentence that describes an
export's algorithm without naming the export, with `file:line`; else "none">

Unknowns: <what you could not decide and what would settle it>
```
