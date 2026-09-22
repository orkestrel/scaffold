# Audit verdict — T1 TEST-SCOPED and T2 TEST-FORCED-COLORS in `@orkestrel/test`, landed at `73e4069` (2026-09-22)

Claims: `t1-t2-audit-claims.md`. Evidence: `units/t1-t2-audit-evidence.md`, the diff
`units/t1-t2.diff.txt`, and the gate log `units/t1-t2-gates.log.txt`. Lanes, blind, on that one
claims file: `checker` on Sonnet (`units/t1-t2-audit-checker-report.md`), `reviewer` on Opus 5,
subjective (`units/t1-t2-audit-reviewer-report.md`), and `analyst` on GPT-6 Astra, objective
(`units/t1-t2-audit-analyst-report.md`, thread `01a0c9b0-f516-7720-8320-8ddbd86632ae`). The
Orchestrator's engine wrote the unit, so the objective lane on Astra is the auditor that did not
write it.

## Rulings per claim

| Claim | Checker | Reviewer | Analyst | Ruling and carrier |
| --- | --- | --- | --- | --- |
| 1 scoped resolver unchanged | referred | CONFIRMED | CONFIRMED | Held. |
| 2 hold drive unchanged | referred | CONFIRMED | CONFIRMED | Held; the reviewer's F4 (no scroll for an off-viewport target) is fixed in the landed tree: `driveHold` scrolls a wholly off-viewport target with `scrollIntoView` and refuses one still unreachable, proved by the below-the-fold case. |
| 3 traversal loop unchanged | referred | CONFIRMED | CONFIRMED | Held; the reviewer's R1 strengthened the changing-resolver proof, whose threshold ran red on the first chain (`t1-t2-gates-2`) and green after the fix (`t1-t2-gates-3`). |
| 4 scoped verbs leave a twin alone | referred | CONFIRMED | CONFIRMED | Held. |
| 5 refusals before input | referred | CONFIRMED | CONFIRMED | Held. |
| 6 forced axis staged like motion | referred | CONFIRMED | CONFIRMED | Held; the reviewer's F3 (one word across key, local, and doc) is fixed: the option is `forced` and the pre-call reading is `active`. |
| 7 marker semantics unchanged | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 8 no export duplicated | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 9 documented to parity | CONFIRMED | BROKEN | BROKEN | BROKEN on § Patterns: the scoped composition had no recipe there. Fixed in the landed tree: the hold recipe's paragraph names `holdAccessibleWithin`, `resolveAccessibleWithin`, `driveHold`, and `traverseAccessibleWithin` with `driveTraversal`. The reviewer's F2 (`isReachable` attribution) and F5 (composition documented in one direction) are fixed in the same guide. |
| 10 names fit the vocabulary | referred | CONFIRMED | CONFIRMED | Held. |
| 11 scope honest | CONFIRMED | UNRESOLVED | CONFIRMED | Held on the analyst's live `git status --porcelain` reading, which matched the supplied status. |
| 12 prose holds | CONFIRMED | CONFIRMED | CONFIRMED | Held. |

## Findings outside the claims

- Reviewer F2, F3, F4, F5 and R1 — substantiated and closed as recorded in the rulings for claims
  2, 3, 6, and 9.
- Reviewer R2 (the runtime half of F4) — settled by the below-the-fold hold case, which runs the
  press on a scrolled target.
- Reviewer R3 — settled by the analyst's live status reading.

## Attacked and held

Merging hidden and absent controls into one scoped refusal; rollback restoring the immediately
preceding readings while release restores the first stage's; the `forced` key over `colors` and
`contrast`; overlapping holds and media scopes excluded by contract.

## Deviations

The lanes ran in sequence on the Codex bench's one-lane rule; each stayed blind. The reviewer holds
no shell and referred every runtime statement; the analyst read the supplied host gate log rather
than executing browser mutations. The fixes landed as Orchestrator edits, and the gate chain re-ran
green before the landing.

VERDICT: FAIL 9; outside the claims: F2, F3, F4, F5, R1, R2, R3 — all carried and closed in `73e4069`
