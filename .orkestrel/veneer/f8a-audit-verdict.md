# F8a PROFILES — audit verdict (round 1 reconciliation)

Claims: `units/f8a-audit-claims.md`. Lanes: `analyst` on GPT-6 Astra
(`units/f8a-audit-analyst-verdict.md`, thread `01a0cacf-7498-76a3-bf8e-521dfe4b8390`,
`VERDICT: FAIL 3, 5, 6; outside the claims: F-INFRA`) and `reviewer` on Opus
(`units/f8a-audit-reviewer-verdict.md`, `VERDICT: FAIL 3, 8` with seven findings outside the claims).
No `checker` ran: the mechanical criteria (paths, the status, the gate log) were ruled by both lanes
from the retained diff and log. Gate chain `units/f8a-gates.log.txt`: green on every gate, the
Tailwind project included (the reviewer read the log mid-run, so its claim 8 is settled by the
finished log).

1. CONFIRMED by both lanes.
2. CONFIRMED by both lanes.
3. BROKEN (analyst): the profiles proof cannot tell a `tailwind` profile that lost a composable import
   from one that kept them; the reviewer's F6 is the same finding. The reviewer's falsified conjunct
   (which file carries the planted sheet) is the claims text's own error. → fix round, obligation 1.
4. CONFIRMED by both lanes; the reviewer's F1 (`CASCADE_PREFIX` duplicates `TOKEN_PREFIX`) → fix
   round, obligation 5.
5. BROKEN (analyst): the standalone case requires the minifier's `--lightningcss-` namespace; the
   reviewer would keep the pin with a comment. Ruled with the analyst: permit, never require, and
   name it in the comment → fix round, obligation 2.
6. BROKEN (analyst): the layer descriptions omit the conditional emission and the generated
   `properties` layer; the reviewer's F2, F3, F4, F5, F7 land on the same section → fix round,
   obligations 3 and 5. F5's executed consumer recipe is carried by F8b.
7. CONFIRMED by both lanes.
8. CONFIRMED (the finished log).

Outside the claims: F-INFRA (analyst; module-scope helpers in the proof file) → fix round,
obligation 4. Referrals R1 (ruled: `source(none)` on the utilities import is what silences the scan)
and R3 (the trailing cascade import compiles: F8b's consumer-profile proof settles it).

## Round 2

The fix round runs on `opus` in the same worktree from `units/f8a-brief-2.md`; its auditor is
`analyst` on Astra.

ROUND-2 OUTCOME: `analyst` on Astra ruled `VERDICT: FAIL 1, 3, 5; outside the claims: F-DISPATCH`
(`units/f8a-fix-audit-analyst-verdict.md`): the control case reads theme variables across the whole
sheet, the guide's empty-emission sentence overreaches the bare import (preflight emits `theme` and
`base` regardless), and the directive reader misses single-quoted directives. F-DISPATCH is the
Orchestrator's: the launcher named a claims file never staged. Round 3 (`units/f8a-brief-3.md`)
carries the three findings; its launch stages one claims file. The round-2 chain is green on every
gate, `test:src:tailwind` included (`units/f8a-fix-gates.log.txt`).

## Round 3

ROUND-3 OUTCOME: pending
