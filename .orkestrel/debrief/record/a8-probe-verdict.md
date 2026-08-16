# A8 gating probe verdict — the 120s deadline settles the task

Probe: real built server (dist at 8d9c325+adc8d11), ollama daemon stopped, tarpit on
127.0.0.1:11434 accepting POST /api/chat and never answering, one run:'agent' workflow.
Timeline (probe task bpr14s6lj):
- [10s]-[110s]: workflow running, task running, attempts 1.
- [120s]: task 'failed', result {"success":false,"error":{"origin":"handler","message":
  "This operation was aborted"}}; workflow 'completed' (bail false). Delta from start
  ~120.5s — the @orkestrel/ollama default deadline (timeout: 120_000, constructed with no
  override at ApplicationRuntime.ts:162).
- Tarpit log: exactly one held POST /api/chat.
Control (earlier same session): warm daemon answers in <1s and settles success — the happy
path through the same executor is sound. Fast-fail control (pre-compaction probe):
daemon-down fails in ~30ms with message "fetch failed".

## Rulings

1. The E1 "run stuck running at the 120s abort" was the VIEWER's stale header, not the
   server: the server settles the task failed at the deadline. A6 (clean-end refresh +
   derived terminal) closed the viewer half; A7 closed the card voice half.
2. **Sol's gated core-diagnostics unit is STRUCK** — its premise (the timeout abort does
   not land as a failed task) is falsified by this probe. Recorded re-baseline: the unit's
   subject no longer exists; nothing else depended on it.
3. A8 is a browser voice unit only, exactly as plan ruling 5 held. Its ground truth: a
   failed agent attempt carries origin 'handler' and a message ("fetch failed" fast;
   "This operation was aborted" at deadline); the workflow itself completes when bail is
   false, so the run reads finished while its task reads failed — both must be voiced.
4. A10 keeps its subject: the deadline is real, constant, and unconfigurable today;
   ApplicationPolicy.agent{model,timeout,keep} is the surface that makes it a policy.
