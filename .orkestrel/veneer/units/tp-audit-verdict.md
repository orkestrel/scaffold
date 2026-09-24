# Audit round 1 — TIP (`tp`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the TIP unit's round 1 (`opus` on Opus 5.5 in `/home/user/veneer-tp` from `2a3f223`), claims
file `tp-audit-claims.md`. Lanes that ran, blind to each other on that one file: the objective lane,
`analyst` on GPT-6 Astra (`tp-audit-objective-verdict.md`, thread
`01a0d123-802e-7e82-9907-755fac20fc43`, journal `tmp/codex/tp-audit-analyst.jsonl`, an engine that did
not write the unit), the subjective lane, `reviewer` on Opus 5.5 (`tp-audit-subjective-verdict.md`),
and the checker on Sonnet (`tp-audit-checker-verdict.md`, claims 1, 6, and 8), the last two through
workflow `wf_153d22e7-88b`. The Orchestrator's apply check ran on a fresh `git archive 2a3f223`
extract in its scratchpad: `git apply --check tp-shared.patch` exit 0.

## Per-claim rulings

1. **CONFIRMED.** Every lane held the scope clauses; the subjective lane and the checker left only the
   apply check unresolved, which the Orchestrator's run settles.
2. **CONFIRMED** by both lanes.
3. **BROKEN (both lanes).** Every executed mutation is logged and distinguished. The T-box and P-box
   mutations are named and never run, so under note 1 those cases are unevidenced. Carrier: P1. The
   report's "entries swapped" wording for runs that changed one entry is the round's record; the
   round-2 report names what each run changed.
4. **CONFIRMED** by both lanes; the `reset-text` name, shape, and dropped `left` fallback hold.
5. **BROKEN (both lanes).** (a) The empty-header decline rests on a false premise: the release keeps an
   empty header when the title is an empty element, and a developer can write one; M2 requires a
   specimen. (b) The popover headers are `h2` elements where the release template writes `h3`, and the
   accordion precedent the TSDoc cites writes the release's own level. (c) The arrow stand-in sentence
   names only the translate utility. Carriers: P2, P3, P4.
6. **BROKEN (objective lane).** `TIP_ARROW_PROPERTIES` is imported, exported, and frozen, and no
   assertion binds it to the inventory; a width-only list passes every setup case. Carrier: P5. The
   checker's and the subjective lane's CONFIRMED readings rest on the other tables.
7. **BROKEN (both lanes).** The guide's empty-header sentence and the Popover row's unqualified removal
   are false (claim 5a); the Tooltip row omits the `fade` and `show` classes, which the release sets, the
   `fade` class only when the tip is animated; the arrow sentence says the triangle paints the fill on
   the side toward the host, where it paints the border facing the tip and points at the host; the
   stand-in sentences omit the arrow's `position-absolute`, `start-50`, and `top-50` utilities; the
   popover arrow's triangles are named by position; "on each side of its host" describes a host the
   region never renders; the 390 width limit has no executed assertion; and the tooltip's and popover's
   arrow literals carry two different reasons for one decision. Carriers: P2, P4, P6.
8. **BROKEN.** The `reset-text` comment ends a clause on a bare token ("resolves `start`"), and the
   `_popover.scss` comment and `popover.test.ts` name the arrow's triangles by position. The checker's
   CONFIRMED reading of this claim is discarded: the lanes' cited sites resolve (`tp-shared.patch` in
   the `reset-text` comment, `_popover.scss` in the arrow comment). Carrier: P6. The report's temporal
   words, abbreviated commands, and tallies are the round's record, not product; recorded here, and the
   round-2 report records each executed command. No carrier.

## Findings outside the claims, ruled

- **report-counts (objective lane).** Recorded under claim 8. No carrier.
- **The popover fade referral (subjective lane): ruled in.** The outside-ledger sentence routes Elements'
  popover open-and-close asymmetry to J-ENGINE alone; the fade is the shared `.fade` rule that M5
  assigns to CROSS-FADE. The sentence names both: J-ENGINE opens and closes a popover, and CROSS-FADE
  ships the `.fade` rule. Carrier: P6.
- **The `visitBreakpoint` referral: dropped.** The installed `@orkestrel/test` exports no
  `visitBreakpoint`; the tree's copy is the only one.

## Carrier

Round 2 on the same `opus` subagent carries P1 to P6 (`b-modal-tp-brief-2.md`). Its audit runs the
objective lane on Astra and the checker; the subjective lane is not run for round 2, because P2 to P4
and P6 adopt the lanes' wording, the checker verifies the letters, and P1 and P5 close on retained red
runs.

VERDICT: FAIL 3, 5, 6, 7, 8; outside the claims: none
