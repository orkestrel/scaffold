<!-- A4g — checker (Sonnet, native), mechanical lane over A4g-u4j-only.patch.txt and the U4j report, with the chain walk. Retained from the completion notification, 2026-09-15 (217 s, 33 tool uses). -->

MECHANICAL lane (checker, Sonnet, native Read/Grep/Glob).

1. CONFIRMED. `publish` clears the mark unconditionally when it queues (`src/browser/ModelContext.ts:168`); `#sync` clears it only for its own manager, at entry (`:262-266`). The three new pins are in the delta and the Orchestrator's gate logs show `test:src:browser` at `163 passed | 2 skipped (165)`; `P14-a4f-probe.md` reproduced the same scenarios BROKEN under the pre-U4j code, so the red→green transition is corroborated across lanes. V1d is the pre-existing, still-green pin.
2. UNRESOLVED — referral. The order is one rule (`#sync` reconciles then prunes, `:273-276`, matching `#publish`, `:285-287`); the failure-path consequence is stated in the `#prune` comment (`:366-369`). Whether it needs its own pin is the judgment the claim asks; the report states the fixture cannot force `registerTool` to reject.
3. CONFIRMED. Pin at `tests/src/browser/ModelContext.test.ts:376-393`; stated in `guides/mcp.md:4096-4098`, the class remark (`ModelContext.ts:48-51`), and the `publish` TSDoc; `describeWebMCPTool` is the diagnostic.
4. CONFIRMED. `ModelContext.ts:65-66` names the manager; the helpers-table introduction is one sentence (`guides/mcp.md:3278-3279`); no ragged line remains; the follow paragraph carries the publication-order rule (`:4074-4077`); the reconcile paragraph carries the prune order (`:4112-4114`).
5. UNRESOLVED — referral. `#pendingManager` (`:124`) and every call site updated; `#prune`'s comment opens "Prunes …" (`:364`). The rule citation extends a private-method allowance to a private field; a naming-shape judgment for the subjective lane.
6. CONFIRMED. Four files; `collide3-mcp-after-u4j.txt` `collisions: none`.
7. CONFIRMED. `P14-a4f-probe.md` Controls 1 and 2 reproduce the writers' readings, run by the Orchestrator.
8. CONFIRMED — chain closed. A4f-checker's two open items close through P14 Control 2 and the A4d-O claim 7 ruling; every earlier round's vectors close through a named successor (A4 → P9 → U4c/U4d/U4f; A4b → P11 → U4f; A4c → P12 → U4g; A4d → P13/P13b → U4h; A4f → P14 → U4j). The MessagePort recorder follow-up is recorded as nonblocking.
9. CONFIRMED. Every item A4f named as blocking 0.0.31 is closed on this tree; every gate and test project exit 0.

outside: none beyond claims 2 and 5's referred judgment questions.

VERDICT: FAIL 2, 5
