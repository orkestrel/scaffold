# Audit round 1 — OFFCANVAS (`oc`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the OFFCANVAS unit's round 1 (`opus` on Opus 5.5 in `/home/user/veneer-oc` from `2a3f223`),
claims file `oc-audit-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`oc-audit-objective-verdict.md`, thread
`01a0d137-cf34-72f2-9800-703f103033ac`, journal `tmp/codex/oc-audit-analyst.jsonl`, an engine that did
not write the unit), the subjective lane, `reviewer` on Opus 5.5 (`oc-audit-subjective-verdict.md`),
and the checker on Sonnet (`oc-audit-checker-verdict.md`, claims 1, 7, and 9), the last two through
workflow `wf_cad9283d-28a`. The Orchestrator's apply check ran on a fresh `git archive 2a3f223` extract
in its scratchpad: `git apply --check oc-shared.patch` exit 0.

## Per-claim rulings

1. **CONFIRMED** by every lane.
2. **CONFIRMED** by every lane that ruled it.
3. **CONFIRMED for the cascade; the shape carried.** The subjective lane broke "the only way": the
   release writes the panel once through a down-walk that emits unwrapped at its open end, and the
   tree repeats that walk in the table, modal, and offcanvas partials. The emitted cascade is correct.
   Carrier: RAMP-DOWN (`rd`), added by the MODAL verdict, which retires the `$panel` and `$nested` maps
   with the modal and table sites; the partial keeps its shape in round 2.
4. **BROKEN (objective lane; the subjective lane's R2 names the same hole).** The refined priority case
   compares each sheet's set of priorities for a selector and property, so a priority swapped between
   the conditions of one pair (`.offcanvas-sm { background-color }` important below the boundary and
   normal above it) passes; an executed probe with the repository's `SheetReader` reproduced the pass.
   The old case's false positive is real, and the refinement is strictly stronger for single-priority
   pairs. Keying the comparison by condition needs the reader in `tests/setupServer.ts`, which the
   B-CROSS LEDGER unit (`cl`) owns with its `readConditions` reader. Carriers: LEDGER, for the
   condition-keyed priority comparison with the swap as its negative control; O-a, for the case title
   that says "every declaration" of a per-pair set comparison.
5. **BROKEN (objective lane).** The failing-first section run removes the exports the Offcanvas proof
   imports, so it records a suite failure without collecting the proof's cases; and the R19 matrix maps
   the `showing` and `hiding` rules to `show-rule-dropped`, which leaves both rules in place. The
   subjective lane's R3 adds that `oc-cascade-probe.cjs.txt` has no negative control. Carrier: O-b.
6. **CONFIRMED** by the subjective lane.
7. **CONFIRMED** by every lane that ruled it.
8. **BROKEN (both lanes).** (a) The Offcanvas `plugin` row omits the release's load and resize
   behaviour, the dismiss trigger, the focus returned to a visible trigger, the other open panel hidden
   before a toggle, the defaults, and the transition completion, and it lists `hidePrevented` after
   `hidden` where it fires in place of `hide` for a static backdrop or the `Escape` key under
   `keyboard: false`. (b) The `### Navbar classes` paragraph credits the flags for unfixing and showing
   the panel, where the bar's higher-specificity rule does it and only the width, height, border, and
   transform flags beat the later placement rules. (c) The stacking sentence says any rung retune keeps
   the panel over its backdrop; a retune that sets the base rung at or below the backdrop rung does not.
   (d) "the large step" and "the large breakpoint" name one concept. (e) The subjective lane's R1: the
   sentence that a background utility does not paint the inline panel has no executed reading, and
   under cascade layers an important component declaration beats an important utility, where the
   release's later utility wins at equal specificity. Carrier: O-c.
9. **BROKEN (both lanes).** The `offcanvas.test.ts` comments leave a file token without its noun and
   drop an article. Carrier: O-c. The report's counts and its blanket claim about token nouns are the
   round's record, not product; recorded here. No carrier.

## Findings outside the claims, ruled

- **F1 (subjective lane): BROKEN.** The `_navbar.scss` comment says the offcanvas rules ship ahead of the
  panel's own partial, which this unit makes false. The comment is a file the unit's result makes false,
  so round 2 owns that comment alone. Carrier: O-c.
- **report-counts (objective lane).** Recorded under claim 9. No carrier.

## Re-baseline

- **LEDGER (`cl`) gains** the condition-keyed priority comparison in `tests/conformance.test.ts`'s
  priority case over a condition-aware `SheetReader` reading, with the `.offcanvas-sm` priority swap as
  its negative control; OFFCANVAS's set comparison stands until then.

## Carrier

Round 2 on the same `opus` subagent carries O-a to O-c (`b-modal-oc-brief-2.md`). Its audit runs the
objective lane on Astra and the checker; the subjective lane is not run for round 2, because O-a and O-c
adopt the lanes' wording and the checker verifies the letters, while O-b and the O-c utility reading
close on retained runs.

VERDICT: FAIL 4, 5, 8, 9; outside the claims: F1
