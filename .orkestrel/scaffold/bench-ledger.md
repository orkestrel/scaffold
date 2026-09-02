# Bench ledger — skills campaign, 2026-09-02

| Bench       | Probe                                                                                     | Result                                                                                                                                 | Routing                                                              |
| ----------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Cursor Grok | `tmp/cursor/probe.sh` — versioned entry `2026.08.25-3e8eec8`, model `cursor-grok-4.6-high` | Round-tripped `OK`, exit 0                                                                                                             | Live. Absorption lanes and the objective design lane run here.       |
| Codex Sol   | `tmp/codex/probe.sh` — `codex exec --sandbox read-only --model gpt-5.6-sol`                | HTTP 400 `The 'gpt-5.6-sol' model is not supported when using Codex with a ChatGPT account.` CLI `codex-cli 0.152.1`, auth valid, exit 1 | Dark. Same refusal as 2026-08-26. Not re-probed again this campaign. |

Substitution recorded: the user's standing ruling (2026-08-26) routes the objective lane to Cursor
Grok when Sol is dark, with Opus verdicts outranking Grok's on conflict. `.agents/orchestration.md`
§ Engine assignment would otherwise have Opus run every lane; this campaign follows the user's
ruling and names the engine on every lane in the routing ledger.

Grok concurrency: one lane at a time per bench. Absorption slices launch sequentially.
