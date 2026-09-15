<!-- A13g — checker (Sonnet, native), the ollama landing state. Retained from the completion notification, 2026-09-15 (71 s, 22 tool uses). -->

1. CONFIRMED — `tests/setupServer.ts:1166-1174` reads "carrying the signal's abort reason as the cause; an inner CDP failure reaches the caller unchanged only when that command's own `timeout` fires before the allowance does."
2. CONFIRMED — `ollama/guides/agent.md` and `agent/guides/agent.md` both total 1,567 lines; the `:1022` sentence is identical, naming the ollama service suite as the proof.
3. CONFIRMED — `P17-live-controls.md` records the three controls reddening and the file restored (`2f7a869f2ede373e`).
4. CONFIRMED — the `after-k13` gates: format, lint, check, build exit 0; `test` failed at `config > rolls one face…` (171 passed, 1 failed) and that suite passed alone (172 passed, 1 skipped); the service run 13 files / 69 passed.
5. UNRESOLVED (partial) — `package.json` declares `0.0.16` (no bump) — CONFIRMED; the tree's tracked-change set had no supplied `git status` (the lane carries no git).

outside: none.

VERDICT: UNRESOLVED 5

<!-- Orchestrator: claim 5's tree state read by the Orchestrator at the landing — the seven U13 files plus `guides/agent.md` and the untracked page proof, added by explicit pathspec; committed on 295fecb. -->
