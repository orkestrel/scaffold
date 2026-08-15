# E1 — real scenarios on the cheapest models, filmed. 2026-08-15

The user's instruction: run real-world scenarios with the lowest models — Qwen on ollama, Haiku
for Claude, Luna for codex, Composer for cursor — and film how the redesigned supervisor works
and looks with them. All four lanes ran real workflows through the real dist server and the real
UI, filmed end to end.

## Routing and mechanics (all verified at source before filming)

- The app server wires all four executors unconditionally: `run:'agent'` → `AgentExecutor` over
  ollama (`APP_MODEL`); `run:'claude'|'codex'|'cursor'` → `WorkspaceProviderExecutor` over the
  real provider CLIs. The task payload is the prompt (provider lanes JSON-stringify it).
- Model routing: Qwen via `APP_MODEL=qwen3.5:2b-q4_K_M`; Haiku via `ANTHROPIC_MODEL=haiku` in
  the server env (the provider omits `--model`, and the CLI reads the env — confirmed
  `claude-haiku-4-5` in the stream metadata, $0.033/run); Composer is the cursor CLI's own
  default ("Composer 2.5 Fast" in its init frame); Luna required a temporary top-level
  `model = "gpt-5.6-luna"` in `~/.codex/config.toml`, reverted immediately after the films and
  re-probed (SOL-DEFAULT round-trip green). The codex lane also requires its workspace inside a
  trusted/git directory — the film ran `APP_WORKSPACE` under the supervisor checkout's
  gitignored `tmp/`.
- All four lanes probed live through their exact provider spawn shapes before filming.

## What the films show working

- Runs started via the API appear in the rail live, unprompted, no typed ids — the redesign's
  central promise, now under four real models in one session.
- The feed streams a real model's answer token by token as activity records (Qwen on film,
  word by word, ending in its 43/43 progress bar).
- Self-completed runs depart to "Last seen · completed" in the rail; History closes with all
  four runs listed; the signature readout tracks 4→0 live truthfully.
- Fourteen frames: {qwen,haiku,luna,composer} × {live,open,done} + history-all-four, plus
  e1-terminal-truth.png (the finding frame), delivered to the user.

## Findings (each recorded against the capability that owns it, for the next change)

1. **Cold-load race (agent lane).** A first `agent` task against an unloaded ollama model dies
   at the client's 120s cap while the CPU load takes longer; ollama logs 499
   ("client connection closed before llama-server finished loading"). The service project's own
   setup warms the model for exactly this reason; the runtime path has no warmup and no
   load-aware timeout. Owner: AgentExecutor/ollama client timeout policy.
2. **Failed launch is silent to the operator.** After finding 1's failure, the run showed
   `running` with an empty feed and no fault voice for 5+ minutes. Owner: unit-failure
   propagation to the live viewer.
3. **The open viewer's header lags terminal.** After self-completion the rail says
   "Last seen · completed" while the open viewer's Status/phase facts still say `running` and
   the `Run finished` badge never renders — two surfaces disagreeing on one screen. The fixture
   suites always pumped an explicit terminal frame, so every test stayed green. Owner: the live
   viewer's snapshot refresh on self-completion. (Filmed: e1-terminal-truth.png.)
4. **Raw provider stream in the transcript register.** The claude/codex/cursor stream-json
   frames render as unformatted JSON walls between the clean activity cards (system summaries,
   usage/cost metadata, thinking deltas). Owner: transcript register rendering; same class as
   the Address raw-JSON finding U8 recorded.
5. **Settlement misses the provider result.** The settlement card reads "This attempt ended,
   but its result is not available" while the result text sits in the raw stream directly above
   it (claude and cursor lanes both). Owner: settlement result extraction per provider shape.

Findings 1–5 are outside the redesign's fixed exit criterion (recorded here per the completion
law, not reopened into it). Each is a candidate unit for the next campaign the user directs.
