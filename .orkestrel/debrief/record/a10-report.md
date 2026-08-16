# A10 report (Sol implementer + Orchestrator integration; landed at 4f67735)

Sol (session 01a00766-a04a-7e42-9b57-540e9015e218, journal tmp/codex/a10.log, 447k tokens):
grouped ApplicationPolicy.agent{model,timeout,keep}; APP_AGENT_MODEL/TIMEOUT/KEEP parsers
with typed CONFIG refusals; runtime passes all three (keep→keepAlive); contract-first red
(TS2741/TS2339 at the flat consumers); static gates green (check, build, lint, app:core
117, guides 374, scoped format). Honest deviation: the codex sandbox denied localhost
(EPERM binds; daemon unreachable), so its dynamic proofs could not run; its ::1:11434
tarpit design also failed here on EAFNOSUPPORT (no IPv6). Chosen default 360_000ms from
the censored >120s loaded-cold bound.

Orchestrator integration (network real):

- agent.url endpoint knob: APP_AGENT_URL, parseApplicationURL (absolute http/https,
  bounded APP_AGENT_URL_INPUT=2048, trimmed; absence undefined via hoisted-narrowed
  spread under exactOptionalPropertyTypes), runtime conditional url pass-through, guide
  rows + paragraph. First consumer: the deadline proof; genuine deployment capability.
- Deadline proof made portable: ephemeral 127.0.0.1 tarpit aimed via APP_AGENT_URL; wire
  asserts model + keep_alive; task settles failed at the 2s configured deadline within
  [1750,5000)ms; APP_LIMIT raised for the 25ms polling (default limit refused ~200 polls
  as 'rate limit exceeded'). 5/5 green through the real built server.
- Cold measurement run idle-host: daemon fully restarted, one real run:'agent' workflow
  under defaults completed in 11,939ms (snapshot timestamps); warm <1s; corroborates
  Sol's 12,897ms /api/chat observation; E1's >120s stays the loaded censored bound.
  OLLAMA_TIMEOUT TSDoc rewritten with the full measurement set.
- A stray NUL byte in an edited fixture string repaired binary-safe; parseApplicationURL
  @example added for the parity example rule; tree-wide format converged (setupBrowser
  reflow).

Final gates: app:core 117/117, app:server 218/218 (22 files), guides parity 374/374,
tree-wide format:check clean, scoped oxlint clean, check green.

Process lesson carried: network-dependent proofs never route into a bench sandbox; the
brief's environment claim was the Orchestrator's unverified assumption.
