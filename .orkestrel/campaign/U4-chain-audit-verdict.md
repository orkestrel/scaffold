# Audit verdict record — the `@orkestrel/mcp` browser-face chain (U4 … U4k), 2026-09-15

`.agents/orchestration.md` § Execution loop: a round that runs fewer lanes than its brief names records the deviation in its verdict file with that round's own reason. This file is that record for the whole chain; the per-lane verdicts sit beside it as `A4*-audit-{analyst,reviewer,checker}.md`.

| Round | Subject | Lanes run | Lanes not run | Reason |
| --- | --- | --- | --- | --- |
| A4 | U4 → U4c (the page server and the WebMCP bridge) | analyst (Astra), reviewer (Opus), checker | — | full design-and-implementation audit |
| A4b | U4d fix round | analyst (Astra), checker | reviewer | a fix round over the objective lane's own findings (hang after destroy, snapshot at queue time, reconciliation); the Orchestrator judged the design-fit reading deferred to the chain-closing round — a deviation, not a rule |
| A4c | U4f fix round | analyst (Astra), checker | reviewer | same reason as A4b |
| A4d | U4g fix round | analyst (Astra), checker | reviewer | same reason as A4b |
| A4e | U4h fix round | analyst (Astra), checker | reviewer | same reason as A4b |
| A4f | U4i (the mechanism change: followed changes reconcile against the live manager) | analyst, reviewer, checker | — | the chain-closing round; the reviewer read the whole shape for the first time since A4 (its R6) |
| A4g | U4j (coalescing order, prose) | analyst, reviewer, checker | — | closing round |
| A4h | U4k (prune in `finally`, the failure-path pin, prose precision) | analyst (Astra: `FAIL 1, 2, 7, 8`), checker (`PASS`) | reviewer | the subject is the objective lane's own findings plus prose the reviewer prescribed verbatim; the Orchestrator accepted the residual design-fit reading on the checker's mechanical confirmation. The analyst's FAIL routed: claim 2 to the Orchestrator's probe P18 (reproduced), claims 1 and 7 to U4l, claim 8 follows them |
| A4i | U4l (the publication failure-path pin; the host records as relationships) | analyst (Astra: `PASS`, chain closed), reviewer (Opus: `PASS`; R10 required, R11–R13 recommended, all accepted), checker (`PASS`) | — | the chain-closing round after A4h reopened it; every lane ran. The reviewer's throwing-accessor referral is dropped on the objective lane's reading (installed `objectOf` contains the read, so the pair fails with its message rather than erroring) |
| A4j | U4m (the file header, one binding, one test name, one comment sentence — prose the reviewer prescribed verbatim) | checker (`FAIL 6`: the gate readings were the writer's self-report; closed by the Orchestrator's gates `after-u4m`, every step exit 0) | analyst, reviewer | no behaviour changes and no source file moves; the objective lane closed the chain at A4i and the subjective lane wrote the sentences U4m lands; the Orchestrator's gates `after-u4m` are the acceptance evidence |

The chain landed at mcp `7959f08` on `b9ff0b9` (27 paths) on 2026-09-15.

The Orchestrator's probes closed every unexecuted vector the read-only objective lane named: P9 (A4), P11 (A4b), P12 (A4c), P13 and P13b (A4d), P14 (A4f), P16 (A4g), P18 (A4h).
