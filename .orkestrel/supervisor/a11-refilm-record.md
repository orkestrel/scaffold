# A11 four-lane re-film — every E1 finding closed on film

Protocol: E1's lanes on E1's models — qwen3.5:2b (ollama, daemon cold-restarted before the
run), haiku (claude CLI via ANTHROPIC_MODEL), Luna (codex CLI via the temporary config line,
reverted and verified Sol-default after), composer (cursor CLI default). Real built server at
6780987, real browser, real keystrokes. 13 frames under the session scratchpad (e1r-*).

Closures, each an assertion that E1's film could not have passed:
- A6 (viewer freshness): the awaited terminal signal was the OPEN viewer's own `Run
  finished` badge — E1's script had to trust the rail because the header lagged forever.
  Held on all four lanes.
- A10 (deadline policy): the qwen lane ran against a genuinely cold daemon under the new
  360s default and finished on film; the former fixed 120s constant no longer exists.
- A7 (settlement voice): `Completed:` stated on the card for every lane whose executor
  emits a settlement record — haiku, luna, composer. Measured fact recorded: the ollama
  agent lane's arc emits activity records only, no settlement observation, so its outcome
  reaches the reader through the activity card and the task tier; the card assertion is
  scoped to the lanes that carry the card.
- A9 (transcript disclosure): a labelled collapsed row disclosed to its verbatim frame on
  each CLI lane (haiku, luna, composer).
- A8 (failed launch): a second server aimed at a dead endpoint through APP_AGENT_URL; the
  workflow completed around the fast-failed task and the viewer rendered "failed, and this
  run continued past it" beside the completed verdict.
- History listed all four completed runs.

First attempt's lesson: the film initially asserted `Completed:` unconditionally and timed
out on the qwen lane; the feed probe that diagnosed it produced the agent-lane finding
above. Recorded against the settlement-card capability: whether the agent executor should
emit a settlement observation like the CLI executors do is a design question for a later
change, not a defect in either surface.

## Exit criterion walk (a-plan.md, ten items)

1. Middleware 0.0.12 published or deferral recorded — OPEN, the user checkpoint. The
   package is prepared green at cdb3234; publish awaits the user's ready signal.
2. Pins and lock resolve the complete fleet, no invalid peers — CLOSED (A2 arc; middleware
   deliberately held at ^0.0.9 per the recorded range-peer ruling; A2b follows the publish).
3. Five compile-break migrations, no as/suppression/shim — CLOSED (A2-A4, audited).
4. @orkestrel/test adoption, hand-rolls deleted, scratch exclusion recorded — CLOSED (A5).
5. Cold agent run completes past the former boundary — CLOSED: the boundary is no longer a
   fixed constant (policy, measured 360s default); the cold run completed under it on film;
   the loaded >120s case is preserved as the calibration floor in the constant's TSDoc.
6. Settlement cards state real outcomes; "result is not available" gone — CLOSED (A7,
   audited, filmed x3).
7. Self-completing open run converges; Run finished renders — CLOSED (A6, audited, filmed x4).
8. Transcript compact by default, verbatim on demand — CLOSED (A9, audited, filmed x3).
9. Failed launch named where the reader looks — CLOSED (A8, audited, filmed).
10. Gates green both repos from one independent verifier; portfolio frames for the fix
    states; four-lane re-film — CLOSED (verifier GATES GREEN at 6780987 + middleware
    cdb3234; portfolio states settled/failed/mixed/disclosed/finished registered; this
    record is the re-film).

Nine of ten closed on evidence. The campaign accepts when item 1 resolves — the publish at
the user's signal, or the user's recorded deferral.
