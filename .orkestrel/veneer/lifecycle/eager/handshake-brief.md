# Unit handshake — `@orkestrel/mcp` 0.0.36: one `handshake` hook

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in `C:\Users\mikes\WebstormProjects\mcp` on `main` at `61fbe94`. Make one commit; never push, publish, or install. Perform the assignment yourself and spawn nothing.

## Authority, in order

1. `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\eager\design.md` (the design of record and the Orchestrator's rulings on its last attack).
2. `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\eager\revision-3.md`: § `@orkestrel/mcp` 0.0.36 and § Units › U1 (owned files, acceptance cases a to h, run commands). Its attack, `revision-3-attack.md` finding 1, is the reason for the HTTP rule below.
3. The MCP specification lifecycle facts in `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\eager\clients.md`; this checkout's `AGENTS.md` and rules.

## Assignment

Implement U1 exactly as the design states, with this correction from the attack:

- The HTTP session middleware decides whether to mint a session from the `initialize` dispatch outcome, recorded in `context.state` beside `session` by the post handler, never from the response body. A 200 answer to a client that accepts `text/event-stream` is framed as one SSE `data:` event (`src/server/handlers.ts:74`, `:209-214`, `src/server/helpers.ts:96-100`), so reading the body as JSON finds no result. Add twins of case h with an SSE-accepting client, with and without a hook; each fails under a body-as-JSON reading.
- Without a hook, every byte of every answer equals 0.0.35's; prove it with the existing suite unchanged plus case d.
- The design's guide work asks for "the fetched HTTP quote" of the Streamable HTTP session text: cite it from the specification when you can fetch it; when you cannot, write the guide row from the behavior the code shows and mark the citation `NOT-EVIDENCED` in your report rather than inventing a quote.

## Gates

After the commit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src`, `npm run test:guides`, `npm run test:policy`, `npm run test:config`, `npm run build`, `npm test`; then `git diff --check`. The final `git status --porcelain` is empty. Never raise a budget.

## Output

Write `tmp/codex/handshake-report.md` and return it as your final message: each acceptance case's red and green command and counts, the conformance citations, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only when the hook cannot hold without changing a contract the design does not name, and report: expected, found, evidence, and one hypothesis.
