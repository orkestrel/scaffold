# Audit rounds 2 and 3 — TIP (`tp`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the TIP unit's rounds 2 and 3 (`opus` on Opus 5.5 in `/home/user/veneer-tp` from `2a3f223`),
claims file `tp-audit-2-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`tp-audit-2-objective-verdict.md`, thread
`01a0d145-dd55-79a0-98aa-41fa28cd4489`, journal `tmp/codex/tp-audit-2-analyst.jsonl`, an engine that did
not write the unit), and the checker on Sonnet (`tp-audit-2-checker-verdict.md`, claims 1, 7, and 8,
workflow `wf_0f46e8c4-c68`). The subjective lane is not run, as `tp-audit-verdict.md` records. The
Orchestrator's apply check: `git apply --check tp-shared-3.patch` on a fresh `git archive 2a3f223`
extract, exit 0.

## Per-claim rulings

1. **CONFIRMED** by both lanes; the apply sub-clause is settled by the objective lane's run and the
   Orchestrator's.
2. **CONFIRMED** (objective lane), each box mutation distinguished by a retune assertion.
3. **CONFIRMED** (objective lane).
4. **BROKEN (objective lane), in part.** The binding case holds for the geometry it derives, and its
   dropped-property run reds it. The claim's universal clause, "no arrow property the release records
   escapes the table", was the Orchestrator's and is false: the inventory records `display`,
   `position`, `content`, and `border-style` on arrow selectors, and the binding filters them out by
   design. The product repeats the overstatement once: the `TIP_ARROW_PROPERTIES` remarks say "A
   reading of every property on the arrow". Carrier: P9.
5. **CONFIRMED** (objective lane).
6. **CONFIRMED** (objective lane).
7. **CONFIRMED** by both lanes.
8. **BROKEN (objective lane).** The syntax law holds. Two added sentences are false: the
   `POPOVER_SPECIMENS` TSDoc says "one per explicit placement", where the untitled specimen adds a
   second bottom placement; and the § Popover classes paragraph says the plugin "sets the `fade` class
   and the `show` class" without the animation condition the compatibility row carries. The round-2
   report writes the format and lint commands as "over every changed file" rather than as run. The
   checker's CONFIRMED reading is discarded for those sites: the objective lane's citations resolve
   (`tp-shared-3.patch` in the `POPOVER_SPECIMENS` TSDoc and the § Popover classes paragraph;
   `b-modal-tp-report-2.md` in the gate table). Carriers: P7 and P8 for the product; the round-4 report
   writes each command as it ran.

## Findings outside the claims, ruled

- **report-counts (objective lane): ruled in for the report only.** "Both rows" in the round-2 report
  and "one hunk" in the round-3 report tally a growable set. The reports are the rounds' record, not
  product; recorded here, and the round-4 report states no such tally. No product carrier.

## Carrier

Round 4 on the same `opus` subagent carries P7 to P9 (`b-modal-tp-brief-4.md`). It is a prose-only
micro-round: its audit runs the checker alone, because no code, assertion, or specimen changes and the
objective lane ruled the code in this round.

VERDICT: FAIL 4, 8; outside the claims: report-counts
