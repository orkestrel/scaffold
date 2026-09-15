# Check A13g — the ollama landing state (`@orkestrel/ollama`)

## Role and engine

`checker` on Sonnet, a native Claude subagent (Read, Grep, Glob only). Perform the verification
directly and spawn nothing. The objective lane (A13f, Astra) confirmed the mechanism end to end and
left three items, all now on record; this check confirms them mechanically before the Orchestrator
commits. Recorded deviation: no analyst re-run for a one-sentence TSDoc fix, a mirror copy, and the
Orchestrator's own replay evidence.

## Subject

`C:/Users/mikes/WebstormProjects/ollama` at `295fecb` plus the working tree (U13b–U13h, the
Orchestrator's one-sentence fix K13-fix, the `guides/agent.md` mirror refresh). Evidence under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`: `A13f-audit-analyst.md`,
`A13f-audit-checker.md`, `P17-live-controls.md` with its three logs, `K13-ollama-gates-orchestrator.log.txt`
(the `after-k13` gates: one `config` failure under load) and `tmp/units/K13-config-alone.log.txt`
(green alone), `K13-ollama-service-verbose.log.txt`, `K13-mirror-guides.log.txt`.

## Claims

1. The `expirePageAttempt` remark in `tests/setupServer.ts` no longer promises the inner CDP failure
   as the cause: it says the cause is the signal's abort reason and an inner CDP failure reaches the
   caller unchanged only when that command's own `timeout` fires first (A13f-O 5).
2. `ollama/guides/agent.md` is byte-identical to `C:/Users/mikes/WebstormProjects/agent/guides/agent.md`
   (the agent checkout at `148c237`), and its `:1022` sentence names the ollama service suite as
   the proof of the browser relay round trip (A13f-O 10, A13f-C 10).
3. P17 replays the three writer-only live controls with each pin reddening and the file restored
   (A13f-O 8): read the three logs.
4. The `after-k13` gates: format, lint, check, build exit 0; the `test` step's one failure is
   `config > rolls one face into a single declaration…`, which passed alone
   (`K13-config-alone.log.txt`: 172 passed, 1 skipped) — a load reading per
   `.agents/orchestration.md` § Writing concurrency rule 10; the service run is green (69).
5. `package.json` still declares `0.0.16` (no bump); the tree's tracked changes are the U13 chain's
   files plus `guides/agent.md`; `tests/service/page.test.ts` is untracked and to be added.

Return the verdict shape (one line per claim, `outside:`, one terminal `VERDICT:` line), nothing
else.
