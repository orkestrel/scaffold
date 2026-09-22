# F6 FOUNDATION — audit verdict (Orchestrator reconciliation, 2026-09-22)

Subject: the worktree `/home/user/veneer-f6` over `07fc3c3`, audited from `f6-audit-claims.md`.

## Round 1 lanes

| Lane       | Role       | Engine                | Transport                                   | Terminal line |
| ---------- | ---------- | --------------------- | ------------------------------------------- | ------------- |
| Objective  | `analyst`  | GPT-6 Astra           | `codex exec`, thread `01a0ca6c-3993-75d3-8c98-974bd5328763` | FAIL 1, 3, 4, 5, 6, 7, 8, 9, 11, 12 |
| Subjective | `reviewer` | Opus 5 (`opus` alias) | native subagent                             | FAIL 5, 9, 11; outside the claims: F1 to F4 |
| Mechanical | `checker`  | Sonnet                | native subagent                             | FAIL 9 |

Every lane ran; the checker read the gate log before it completed, and the completed log closes its
gate claim. The `opus` alias served `claude-opus-5`.

## Per-claim ruling

1. CONFIRMED: the islands hold and restoration is exact; the analyst's BROKEN is the claim's proof location (the colour proof lives in `theme.test.ts` because the browser project loads no stylesheet). Claims text corrected here.
2. CONFIRMED (all).
3. CONFIRMED with the grep clause corrected: the twin, plugin, import, and proofs are gone; the remaining `rtl` hits are Bootstrap's artifact (F5b's) and `dir="rtl"` physical proofs; the guide's remaining twin sentence around line 364 → fix round.
4. CONFIRMED (reviewer) / BROKEN (analyst) on coverage: the `.disabled`-present-before-first-click case is missing → fix round.
5. BROKEN (all): the adoption is not done; the `isAppError` rationale is false (Contract's `isInstance`/`instanceOf` match) → fix round, with `@orkestrel/contract` moved to `dependencies` per the tenet.
6. CONFIRMED on substance; the layer-order sentence sits under § Showcase and the engine paragraph names no B-COLLAPSE → fix round (reviewer F3: move the sentence into § Styles).
7. CONFIRMED on substance: § Table classes is the right home for the caption class (the claim's § Helper classes was wrong); reviewer F1 (`SHOWCASE_CONTROL`) and F2 (the `dl` remark and locals) → fix round.
8. CONFIRMED: the guide states the direction the sweep proves; the claim's wording was backwards. The sweep's gap (an orphan partial passes) is recorded against scaffold's policy instrument, outside this campaign.
9. BROKEN: `test:setup:browser exit=1` on `tests/setupBrowser.test.ts:697`, a third consumer of the removed contract → fix round (mode-based reading).
10. CONFIRMED.
11. BROKEN: counts at the important-utility paragraph and the engine paragraph → fix round.
12. CONFIRMED for `ColorMode`; the duplicate-primitive clause is claim 5's adoption.

Findings carried into the fix round: analyst 3, 4, 5, 6, 8, 11; reviewer F1, F2, F3, F4 (name the actor in the § Compatibility row after checking `scanOracleObligation`), claim 9's two sites, and the order-dependent section case around line 540.

## Round 2

The fix round runs on `opus` in the same worktree from `units/f6-brief-2.md`; its report is
`units/f6-report-2.md`, its evidence `units/f6-fix.diff`, its gate log `units/f6-fix-gates.log.txt`,
and its objective auditor `analyst` on Astra (`units/f6-fix-audit-analyst-verdict.md`).

ROUND-2 OUTCOME: pending
