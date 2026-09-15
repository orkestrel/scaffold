<!-- A6-C — checker (Sonnet, native), mechanical lane on U6b, blind. Retained from the completion notification, 2026-09-15 (171 s, 43 tool uses). Abridged. -->

MECHANICAL lane — Audit A6, unit U6b.

1. CONFIRMED — every `.execute(`/`execute:` site in `src/**` and `tests/**` examined; the fifteen `tests/setup.test.ts` call sites pass `CONTEXT`; `tests/setupServer.ts:491, 509, 537` declare single-parameter handlers; `tests/guides.test.ts:40` is `GuideCommand.execute`; no handler reads a `ToolContext` as a caller value.
2. BROKEN — `src/core/OllamaProvider.ts:81-88` `body()` maps `ToolDefinition` to `{ type: 'function', function: { name, description?, parameters? } }` and drops `title` and `annotations`; no mention of either in `OllamaProvider.ts` or `guides/ollama.md`, so the silence is undocumented.
3. UNRESOLVED — whether a migrated fixture should have become a cancellation proof is a judgment; mechanically, `CONTEXT` is a never-aborted signal and no assertion reads it (signature-only migration). Referred to the reviewer.
4. BROKEN — only the three expected files changed and no manifest or lockfile; but `guides/tool.md` is stale against the tool checkout's current tip (454 vs 448 lines; the `isToolError` table under `### ToolError`; the `toolToDefinition` summary wording; the `errors.test.ts` Tests bullet). `guides/agent.md` matches. Criterion 3 not met on the current tip.
5. CONFIRMED — `guides/ollama.md` names no handler signature, `ToolCall.caller`, or placement the landed contracts contradict.
6. UNRESOLVED — ship judgment; contingent on 4.

Re-dispatchable instruction: byte-copy `guides/tool.md` from the tool checkout's current tip; re-run `cmp` and `npm run test:guides`.

VERDICT: FAIL 2, 3, 4, 6; outside the claims: none

<!-- Orchestrator: claim 4 is the same landing-order fact as A3 claim 7 (U1d moved tool's guide after U6b copied it). Claim 2 is a real documentation gap carried into U6c together with the mirror refresh. -->
