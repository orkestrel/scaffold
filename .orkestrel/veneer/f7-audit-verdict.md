# F7 CAPTURE — audit verdict (Orchestrator reconciliation, 2026-09-22)

Subject: the worktree `/home/user/veneer-f7` over `07fc3c3`, audited from `f7-audit-claims.md`.

## Round 1 lanes

| Lane       | Role       | Engine                | Transport                                   | Terminal line |
| ---------- | ---------- | --------------------- | ------------------------------------------- | ------------- |
| Objective  | `analyst`  | GPT-6 Astra           | `codex exec`, thread `01a0ca70-dea8-7dd0-be91-8688e953b08a` | FAIL 1, 3, 4, 8, 10, 11 |
| Subjective | `reviewer` | Opus 5 (`opus` alias) | native subagent                             | FAIL 1, 4, 8, 10, 11; outside the claims: F1 to F7 |
| Mechanical | `checker`  | Sonnet                | native subagent                             | FAIL 8 |

Every lane ran; the checker read the gate log before it completed, and the completed log closes its
gate claim. The `opus` alias served `claude-opus-5`.

## Per-claim ruling

1. NOT-EVIDENCED / UNRESOLVED: the grammar holds on the portfolio; the counterpart-stem alignment is derived from CL13's Bootstrap-portfolio rule, not measured (reviewer F1) → fix round obligation 5 states the Veneer rule and marks the pairing as verified by the appearance unit.
2. CONFIRMED (both): whole specimens with background.
3. CONFIRMED as written (reviewer) / BROKEN (analyst): control-rooted subjects' artifacts say "no reachable control" because `describeFocus` excludes its root (reviewer F6); the guide's per-frame pairing sentence is false for the Button scenarios (F3) → fix round obligation 1.
4. BROKEN (analyst): with capture off and frames on disk the guard reads nothing (it iterates the manager's placements) → fix round obligation 2; the claim's "local decoder is gone" clause was wrong (reviewer): `readFrame` gives size and floor only, so the sampler stays. Claims text corrected here.
5. CONFIRMED under the standing ruling (the caption specimen goes to a successor after F6 integrates).
6. CONFIRMED (both); the "hover and active mixes differ" sentence is unevidenced (reviewer) — an observation.
7. CONFIRMED (all).
8. CONFIRMED by the Orchestrator's own run: `CAPTURE=1 npm run test:journey` exit 0, 100 passed (`units/f7-capture-journey.log.txt`); the gate chain green on every gate.
9. CONFIRMED (all).
10. BROKEN (both): counts in comments → fix round obligation 6.
11. BROKEN: the registry types do not carry the grammar (analyst) and the guide's capture paragraphs are not one contract (reviewer F1, F2, F3) → fix round obligations 3 and 5.

Findings carried into the fix round: reviewer F4 (the proof that cannot fail), F5 (the duplicated law), F7 (`FrameManager.place`'s signature), and the referrals (the clip case's denominator, the dead assertion, `readSubject`'s double count). Finding 1 of the report (width-invariant pointer frames) is a registry ruling for the successor that adds the caption specimen: register the pointer scenarios at one width.

## Round 2

The fix round runs on `opus` in the same worktree from `units/f7-brief-2.md`; its report is
`units/f7-report-2.md`, its evidence `units/f7-fix.diff`, its gate log `units/f7-fix-gates.log.txt`,
and its objective auditor `analyst` on Astra (`units/f7-fix-audit-analyst-verdict.md`).

ROUND-2 OUTCOME: accepted 2026-09-22, landed on the session branch as `64e69f6` (cherry-pick of
`unit/f7` `57cd0e1`; the § Showcase paragraph merged F6's shell sentences with the fix round's actor
phrasing and its capture-registry paragraph). `analyst` on Astra ruled `VERDICT: FAIL 4; outside the
claims: none` on the fix round (`units/f7-fix-audit-analyst-verdict.md`): the tree assertions read the
whole artifact body. The Orchestrator wrote the two-line fix under `units/f7-brief-3.md`, took the host
control (`units/f7-claim4-control.sh`, log `units/f7-claim4-control.log.txt`: the tree half forced to
its fallback fails exactly the setup case and the journey case in every variant, the restored file
matches its digest and passes), and `analyst` on Astra ruled `VERDICT: PASS` on it
(`units/f7-fix-3-audit-analyst-verdict.md`). Every other fix-round claim CONFIRMED; the fix-round gate
chain is green on every gate (`units/f7-fix-gates.log.txt`).
