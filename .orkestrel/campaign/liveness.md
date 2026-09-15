# Bench liveness — campaign start 2026-09-15

Probes run by the Orchestrator from `C:/Users/mikes/WebstormProjects/scaffold`, read-only, bounded.

| Bench  | CLI                                   | Round trip                                                                                                   | Verdict |
| ------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------- |
| Codex  | `codex --version` → `codex-cli 0.153.4` | `codex exec --json --sandbox read-only --model gpt-6-astra` returned `READY`; thread `01a0a324-febf-71f0-aec5-8ef97759bd58` | live    |
| Cursor | `agent.cmd --version` → `2026.09.10-fd3934a`; versioned entry `$LOCALAPPDATA/cursor-agent/versions/2026.09.10-fd3934a` | `-p --trust --mode=ask --model cursor-grok-4.6-high` returned `READY` in 5.8 s; session `20670c46-739c-44bc-9813-261f665b81d3` | live    |

Second Cursor probe (session `e4755d32-51a0-410d-9c9e-73a3bd38773f`): a lane launched from the
scaffold checkout reads a sibling checkout by absolute path, and the lane holds `WebSearch` and
`WebFetch`. The research lane therefore stays on Grok.

## Routing decisions recorded at start

- The objective lane and the objective implementer run on `gpt-6-astra`, not `gpt-5.6-sol`. The
  user asked for GPT 6 Astra by name in this session, and the 2026-08-26 probe recorded in memory
  shows `gpt-5.6-sol` refused on this account. Every `analyst` and `sol` launch carries
  `--model gpt-6-astra`; the transport contract's pinned model id is superseded for this campaign
  by that instruction.
- Grok lanes launch one at a time (Bench laws rule "One lane at a time per bench"). The five
  absorption lanes queue in the order G1, G2, G3, G4, G5.
- The Orchestrator authored the Grok briefs and launches each lane from the role-form
  `tmp/cursor/run.sh`. The `grok` driver's drafting step was not dispatched: the entry, model, and
  journal form were resolved by the session-start probes, and the briefs needed the Orchestrator's
  exact scope. The bench engine, not the driver, still does every reading.
- `codex exec` stderr carries `rmcp` transport errors for the `probe` MCP server the sandbox cannot
  reach. They are not a bench fault; the answer still arrives in `--output-last-message`.
