<!-- A2b-C — checker (Sonnet, native), mechanical lane on U2c, blind. Retained from the completion notification, 2026-09-15 (157 s, 19 tool uses). Abridged. -->

Claim 3 (no stale `caller` prose) — CONFIRMED (`RelayProvider.ts:80` `@returns` reads "The validated wire request"; `shapers.ts` remarks at lines 20, 34, 49, 75, 95 rewritten; repository grep for `ToolCall\.caller|caller context` returns nothing).
Claim 4 (placeholders gone) — CONFIRMED (every remaining `(_args, context)` reads `context`; no `(_args)`, `(_args, _context)`, or `(args, _context)` survives).
Claim 6 (guide structure) — CONFIRMED (no `### Provider and tool execution`; `### Placement proofs` at `guides/agent.md:1545` under `## Tests`; lede at `:17` points at `#placement-proofs`; no campaign label; receipts stated as not recorded as passed at `:1550-1551`).
Claim 8 (nothing regressed) — UNRESOLVED: scope and rule conformance hold; the brief said the `guides/tool.md` mirror is "untouched by this round" while U2c's report says it refreshed it by byte copy; the current copy is byte-identical to tool's tip (455 lines each). Referral on whether the re-touch was in scope (it was: `guides/tool.md` is in U2b's Owned, which U2c inherits).
Acceptance criteria 1–5 — UNRESOLVED on the writer's report alone (settled by the Orchestrator's gate run, all exit 0).

Terminal: A2b MECHANICAL — claims 3, 4, 6 CONFIRMED; claim 8 UNRESOLVED (referred).
