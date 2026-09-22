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

ROUND-3 OUTCOME: `analyst` on Astra ruled `VERDICT: FAIL 5; outside the claims: none`
(`units/f8a-fix-3-audit-analyst-verdict.md`, thread `01a0cb00-c513-7e93-a062-22df82e6d597`): claims
1 to 4 CONFIRMED by independent compilation and by executing the readers (the scoped theme reading
distinguishes the relabelled block; the bounded emission statement matches the compiled profiles;
the directive reader accepts both quotation marks and refuses the unquoted and mismatched forms;
the status matches the declared changes). Claim 5 named the host chain, which the lane read mid-run,
so it is settled by the finished log rather than by the lane: the worktree chain
(`units/f8a-fix-3-gates.log.txt`) is green through `test:app` and reports three timeouts
(`test:journey` at 15 s, `test:policy` at 5 s, `test:setup` at 10.1 s) taken while seven sibling
units and a second chain ran on the container, which § Writing concurrency rule 10 makes a timing
reading rather than a defect. The unit landed on the session branch as `0783b2b` (the conflicts in
`guides/veneer.md` § Files and the `tests/setupBrowser.test.ts` inventory resolved by
`units/f8a-landing-resolve.py`); the deciding chain is `units/f8a-landing-gates.sh` over that
commit, recorded in § Landing when it finishes.

## Landing

The deciding chain `units/f8a-landing-gates.sh` over `0783b2b` (`units/f8a-landing-gates.log.txt`,
2026-09-22 21:32 to 21:47) is green on every gate except `test:journey`, whose four failures are
15 s timeouts in the keyboard, focus-ring, and pointer cases of the `light-1280` variant. The
re-run of `test:journey` alone at 21:50 (`units/f8a-landing-journey-rerun.log.txt`) failed sixteen
cases the same way, with the portfolio cases cascading from the frames the timed-out cases never
placed; the container's one-minute load average read 33.9 on 4 CPUs while eight units ran. The
diagnostic run of the `light-1280` variant with a 90 s case timeout under the same load
(`units/f8a-landing-journey-diagnostic.log.txt`) passed every case (`Tests 25 passed (25)`,
exit 0), which separates the timing reading from a regression: the cases hold and exceed the
configured 15 s under load. Roadmap fold 12 (`aca0423`) passed `format:check` and `test:guides`;
its `test:policy` run timed out at 5 s under the same load (`units/f8a-fold-12-gates.log.txt`).
The deciding re-run of `test:journey` and `test:policy` alone is armed to fire when the one-minute
load average falls under 8, per § Writing concurrency rule 10, and `main` fast-forwards when it is
green. The session branch carries `0783b2b` and `aca0423` and is pushed.

The armed re-run fired at 22:06 at a one-minute load of 7.3 and ran at 23 after the VALIDATION
audit lanes and the RANGE fix unit launched (`units/f8a-landing-deciding-rerun.log.txt`):
`test:policy` exit 0, which settles fold 12's policy gate; `test:journey` exit 1 with the same
15 s timeouts, one traversal reading that skipped alternate Button specimens, and the portfolio
cases cascading from the unplaced frames. A second re-run is armed for a one-minute load under 5.
