# Unit J-ENGINE-ORKESTREL-2 — the installed `@orkestrel/*` candidates against the engine's mechanisms

## Role and engine

`orkestrel` on Sonnet, reached as a native Claude subagent (read-only). The executor that opens this brief is that subagent.

## Objective

A capability and defect map of every `@orkestrel/*` package installed under `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/` against the mechanisms the J-ENGINE design round must place — a typed event surface with a cancelable pre-change event, entity lifecycle with `destroy`, abort-linked cleanup, a timer with an abort deadline, a sanitizer for tooltip and popover content, a template filler, guards over DOM values, and the waits and recorders the browser proofs use — with the exact export, its declared signature, the declaration pointer, what the engine would gain, what the export lacks for that job, and each package's runtime cost, so the design round rules each candidate in or out on evidence.

## Context

**Evidence.** `cat C:/Users/mikes/WebstormProjects/veneer/package.json` declares `"@orkestrel/contract": "^0.0.17"` under `dependencies` and `@orkestrel/guide` `^0.0.20`, `@orkestrel/html` `^0.0.10`, `@orkestrel/markdown` `^0.0.15`, `@orkestrel/probe` `^0.0.16`, `@orkestrel/scaffold` `^0.0.77`, `@orkestrel/test` `^0.0.20` under `devDependencies`. `ls C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/` lists `abort codec console contract database emitter guide html indexeddb lsp markdown mcp probe process queue router scaffold server sqlite sse template test timeout tool websocket` (2026-09-23, after `npm ci --ignore-scripts` from the committed lockfile). The earlier reading `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/j-engine-orkestrel-report.md` grouped the exports by concern and left several declarations unread; this unit reads the declarations it left unread and answers the sharper question.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (ALWAYS inspect the exact declared and installed `@orkestrel/*` capabilities before implementing overlapping logic; NEVER add an npm package unless the user explicitly requests it); `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/patterns.md` § Declared ecosystem capabilities and § Stateful emitters; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Ecosystem reuse; skill: none; guide: `C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md` § Surface; the catalog in `C:/Users/mikes/WebstormProjects/scaffold/.claude/agents/orkestrel.md` for layers and runtime edges (discovery data, not live state).

**Installed primitives.** The subject of this unit. Read each package's `package.json` (`exports`, `dependencies`, `sideEffects`) and its `dist/src/core/index.d.ts` (or `.d.cts`) and `dist/src/browser/index.d.ts` where present.

**Host.** Windows 11; read-only; `C:/Users/mikes/WebstormProjects/veneer` at `746d3e9`; the scaffold checkout `C:/Users/mikes/WebstormProjects/scaffold` holds the catalog role file and the package guides under `guides/` where present (`ls C:/Users/mikes/WebstormProjects/scaffold/guides`).

**Measurements.** None beyond the evidence row.

**Control identifiers.** None.

**Standing conditions.** The catalog embedded in the role file is not live state; the installed declarations are. The engine ships to browsers through `dist/src/browser/index.js` with every `@orkestrel/*` import left external (`vite.config.ts` `srcBrowser`), so a candidate's own runtime dependency tree reaches the consumer.

## Unknowns

- Whether `@orkestrel/emitter`'s `Emitter` can carry a cancelable event (a listener that stops the emitting entity's change) or only isolated notification: read the `emit` return type and the doc block, and report what it declares.
- Whether `@orkestrel/timeout` and `@orkestrel/abort` are host-independent (no `node:` import in their `dist/src/core/*.js` and no DOM requirement): report the `exports` map and any host import you find in the declaration or the built entry.
- Whether `@orkestrel/test/browser` publishes a wait over animations or transitions (`waitForAnimations` or a sibling), a wait over an event, and a recorder the engine proofs can use: report the exact names and signatures.

## Scope

**Owned.** None (read-only).

**Shared (report-only).** None.

**Off-limits.** Every file; `tmp/` and lockfiles are not read.

**What asserts the state this change ends.** None.

**Tools and limits.** Read, Grep, Glob. No edits, no commands, no report file: the final message is the map.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `Map` shape as the final message: one section per candidate in this order — `contract`, `emitter`, `abort`, `timeout`, `queue`, `html`, `template`, `test` — then one line each for every other installed package stating why it is outside the engine's concerns. Each candidate section carries a table with one row per mechanism it could serve: mechanism, export and declared signature, declaration pointer (`file:line`), what the engine gains, what the export lacks for that job (as the declaration states it, never inferred), and the package's runtime dependency edges and its `exports` map entries. Close with a list of mechanisms no installed package serves, and a list of declarations the bound stopped you from reading. Separate a fact you read from an inference on the line that carries it. No recommendation, no design.

## Deviation contract

Stop and report on a declaration file that cannot be read. Decide, record, and carry on from how to file an export that fits two mechanisms.

## Acceptance criteria

1. Every candidate section names its declaration entry and its `exports` map.
2. Every export named resolves in the declaration file cited, with the line.
3. Each of the three Unknowns is answered from a declaration or marked unread.

**Observations, not criteria.** None.

## Review evidence

The map; the Orchestrator verifies a sample of pointers against the declarations.
